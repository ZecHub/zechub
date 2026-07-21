// Package preflight runs the environment checks that turn confusing runtime
// failures into clear, actionable guidance: is Docker installed and running,
// are the host ports free, is there enough disk for the chain state. It backs
// both a CLI check at startup and the dashboard's preflight banner.
package preflight

import (
	"context"
	"fmt"
	"net"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"time"

	"github.com/raycreatives/z3-launcher/internal/config"
	"github.com/raycreatives/z3-launcher/internal/disk"
	"github.com/raycreatives/z3-launcher/internal/dockerinstall"
)

// Status is the severity of a check.
type Status string

const (
	OK    Status = "ok"
	Warn  Status = "warn"
	Fail  Status = "fail"
	Fixed Status = "fixed" // auto-corrected by the launcher (e.g. port remap)
)

// Check is a single environment check result.
type Check struct {
	Name    string `json:"name"`
	Status  Status `json:"status"`
	Message string `json:"message"`
	Hint    string `json:"hint,omitempty"`
	// Original is the value before auto-correction (for the "expected vs actual"
	// port banner), when Status == Fixed. For ports this is the original port
	// number; for other checks it is empty.
	Original int `json:"original,omitempty"`
	// Actual is the value the launcher is using after auto-correction.
	Actual int `json:"actual,omitempty"`
}

// Report aggregates the checks. OK is false only when a hard requirement fails.
type Report struct {
	OK       bool    `json:"ok"`
	Checks   []Check `json:"checks"`
	Resolved Ports   `json:"resolved"`
}

// Ports carries the actual host ports the launcher will use (post
// auto-correction). This is the single source of truth for the endpoint panel
// and the spawned compose process.
type Ports struct {
	ZebraRPC     int `json:"zebraRpc"`
	ZebraHealth  int `json:"zebraHealth"`
	ZainoGRPC    int `json:"zainoGrpc"`
	ZainoJSONRPC int `json:"zainoJsonrpc"`
	ZalletRPC    int `json:"zalletRpc"`
}

// FromConfig projects a config.Ports into a preflight.Ports.
func FromConfig(p config.Ports) Ports {
	return Ports{
		ZebraRPC:     p.ZebraRPC,
		ZebraHealth:  p.ZebraHealth,
		ZainoGRPC:    p.ZainoGRPC,
		ZainoJSONRPC: p.ZainoJSONRPC,
		ZalletRPC:    p.ZalletRPC,
	}
}

// ToConfig projects a preflight.Ports back into a config.Ports.
func (p Ports) ToConfig() config.Ports {
	return config.Ports{
		ZebraRPC:     p.ZebraRPC,
		ZebraHealth:  p.ZebraHealth,
		ZainoGRPC:    p.ZainoGRPC,
		ZainoJSONRPC: p.ZainoJSONRPC,
		ZalletRPC:    p.ZalletRPC,
	}
}

// PortCheck names a host port to test.
type PortCheck struct {
	Name string
	Addr func(port int) string // builds the host:port from the current resolved port
}

// Checker holds the (injectable) probes and parameters.
type Checker struct {
	Docker       func(ctx context.Context) error
	PortFree     func(addr string) error
	Disk         func(path string) (disk.Usage, error)
	ZebraHealth  func(ctx context.Context, addr string) error
	Ports        []PortCheck
	DataDir      string
	MinFreeBytes uint64
	WithZallet   bool

	// DetectRuntime is injectable for tests; defaults to dockerinstall.DetectCurrentRuntime.
	DetectRuntime func() dockerinstall.RuntimeStatus

	// portMaxScan bounds how far we'll search for a free port when the default
	// is taken. Zero defaults to 20.
	portMaxScan int
}

// RecommendedFreeBytes returns the disk free-space we want for a network, per
// the Zebra system requirements (mainnet ~300 GB and growing; testnet ~10 GB;
// regtest is tiny). These are recommendations — a shortfall is a Warn, not a
// hard fail, since fast-start or a different data dir may apply.
func RecommendedFreeBytes(net config.Network) uint64 {
	switch net {
	case config.Mainnet:
		return 300 << 30
	case config.Testnet:
		return 10 << 30
	default: // regtest
		return 2 << 30
	}
}

// New builds a Checker with real probes from config. The disk recommendation
// scales with the target network (see RecommendedFreeBytes).
func New(cfg config.Config) *Checker {
	addr := func(p int) string { return fmt.Sprintf("127.0.0.1:%d", p) }
	checks := []PortCheck{
		{"zebra-rpc", func(p int) string { return addr(p) }},
		{"zebra-health", func(p int) string { return addr(p) }},
		{"zaino-grpc", func(p int) string { return addr(p) }},
		{"zaino-jsonrpc", func(p int) string { return addr(p) }},
	}
	if cfg.WithZallet {
		checks = append(checks, PortCheck{"zallet-rpc", func(p int) string { return addr(p) }})
	}
	return &Checker{
		Docker:   DockerInfo,
		PortFree: PortFree,
		Disk:     disk.Probe,
		Ports:    checks,
		DataDir:  cfg.DataDir,
		// Disk recommendation scales with the network: mainnet ~300 GB,
		// testnet ~10 GB, regtest tiny (per the Zebra system requirements).
		MinFreeBytes: RecommendedFreeBytes(cfg.Network),
		WithZallet:   cfg.WithZallet,
	}
	// ZebraHealth is set by the caller (main.go) against the resolved port
	// when it wants a soft "is Zebra responding?" check. By default we
	// skip it to avoid noisy "zebra not running yet" reports before the
	// user has clicked Start.
}

// Run executes all checks and assembles a Report, applying port auto-correction
// (plan §11.1) as it goes. A port reported in use is bumped to the next free
// port in a small reserved range above the default; the change is scoped to
// the returned Ports (and the Checks' Original/Actual fields for visibility).
//
// Zebra unreachable is reported as a Warn (the stack may still be coming up)
// rather than a Fail. The only hard-fail condition is Docker missing — every
// other check is either auto-corrected (Fixed) or a soft warning.
func (c *Checker) Run(ctx context.Context, current Ports) (Report, error) {
	resolved := current
	checks := []Check{c.checkDocker(ctx)}

	for _, p := range c.Ports {
		original, ok := portFromCurrent(p, current)
		if !ok {
			continue
		}
		actual, ch := c.allocatePort(p, original)
		if actual != original {
			resolved = setPort(resolved, p.Name, actual)
		}
		checks = append(checks, ch)
	}

	checks = append(checks, c.checkDisk())
	// Surface a broken Docker credential helper (a common Docker Desktop leftover
	// that makes every `docker pull` fail) — previously defined but never run.
	checks = append(checks, c.checkDockerCredentialHelper())

	// Optional Zebra-reachable probe. Only added when the caller wired one in;
	// this avoids noisy "zebra not running yet" reports on a cold start.
	if c.ZebraHealth != nil {
		checks = append(checks, c.checkZebra(ctx, resolved.ZebraHealth))
	}

	report := Report{OK: true, Checks: checks, Resolved: resolved}
	for _, ch := range checks {
		if ch.Status == Fail {
			report.OK = false
		}
	}
	return report, nil
}

func portFromCurrent(p PortCheck, current Ports) (int, bool) {
	switch p.Name {
	case "zebra-rpc":
		return current.ZebraRPC, true
	case "zebra-health":
		return current.ZebraHealth, true
	case "zaino-grpc":
		return current.ZainoGRPC, true
	case "zaino-jsonrpc":
		return current.ZainoJSONRPC, true
	case "zallet-rpc":
		return current.ZalletRPC, true
	}
	return 0, false
}

func setPort(p Ports, name string, v int) Ports {
	switch name {
	case "zebra-rpc":
		p.ZebraRPC = v
	case "zebra-health":
		p.ZebraHealth = v
	case "zaino-grpc":
		p.ZainoGRPC = v
	case "zaino-jsonrpc":
		p.ZainoJSONRPC = v
	case "zallet-rpc":
		p.ZalletRPC = v
	}
	return p
}

func (c *Checker) maxScan() int {
	if c.portMaxScan > 0 {
		return c.portMaxScan
	}
	return 20
}

// allocatePort picks the first free port in the range [original, original+maxScan].
// If the default is free, the check is OK. If the default is taken but a higher
// port in the same range is free, the check is Fixed and the resolved port is
// the higher one. If no port in the range is free, the check is Warn (the
// launcher will still attempt to bind and surface a real error from docker).
func (c *Checker) allocatePort(p PortCheck, original int) (int, Check) {
	if c.PortFree == nil {
		return original, Check{Name: "port:" + p.Name, Status: Warn, Message: "port check skipped"}
	}
	for offset := 0; offset < c.maxScan(); offset++ {
		candidate := original + offset
		if err := c.PortFree(p.Addr(candidate)); err == nil {
			if offset == 0 {
				return candidate, Check{
					Name:    "port:" + p.Name,
					Status:  OK,
					Message: fmt.Sprintf("%s (127.0.0.1:%d) is free", p.Name, candidate),
				}
			}
			return candidate, Check{
				Name:     "port:" + p.Name,
				Status:   Fixed,
				Message:  fmt.Sprintf("%s auto-corrected: 127.0.0.1:%d → 127.0.0.1:%d (default port in use)", p.Name, original, candidate),
				Hint:     "This is process-scoped; nothing else on the host depends on the port number.",
				Original: original,
				Actual:   candidate,
			}
		}
	}
	return original, Check{
		Name:    "port:" + p.Name,
		Status:  Warn,
		Message: fmt.Sprintf("%s (127.0.0.1:%d..%d) all in use", p.Name, original, original+c.maxScan()-1),
		Hint:    "Free a port in this range or change the corresponding env var (e.g. Z3_ZEBRA_HOST_RPC_PORT).",
	}
}

func (c *Checker) checkDocker(ctx context.Context) Check {
	if c.Docker == nil {
		return Check{Name: "docker", Status: Warn, Message: "Docker check skipped"}
	}
	if err := c.Docker(ctx); err != nil {
		rs := c.detectRuntime()

		// Colima is running but Docker daemon inside isn't ready yet (common
		// right after `colima start` — the VM is up but dockerd needs a few
		// more seconds). Report as Warn so it doesn't block the dashboard.
		if rs.Installed && rs.Running && rs.Startable {
			return Check{
				Name:    "docker",
				Status:  Warn,
				Message: fmt.Sprintf("Docker daemon is starting up (%s is running but Docker isn't responding yet)", rs.Runtime),
				Hint:    "Wait a few seconds and click Check Again — the daemon should be ready shortly.",
			}
		}

		// Colima is installed but the VM isn't running — offer to start it.
		if rs.Installed && !rs.Running && rs.Startable {
			return Check{
				Name:    "docker",
				Status:  Fail,
				Message: fmt.Sprintf("Docker daemon is not running (%s is installed but stopped)", rs.Runtime),
				Hint:    fmt.Sprintf("Run '%s' or use the dashboard's Start Runtime button.", rs.StartCmd),
			}
		}
		return Check{
			Name:    "docker",
			Status:  Fail,
			Message: "Docker is not available: " + err.Error(),
			Hint:    "Install Docker and make sure it's running: https://docs.docker.com/get-docker/",
		}
	}
	return Check{Name: "docker", Status: OK, Message: "Docker is installed and running"}
}

// detectRuntime is injectable for tests; defaults to the real detector.
func (c *Checker) detectRuntime() dockerinstall.RuntimeStatus {
	if c.DetectRuntime != nil {
		return c.DetectRuntime()
	}
	return dockerinstall.DetectCurrentRuntime()
}

// checkDockerCredentialHelper detects the macOS Docker Desktop "broken
// credential helper" failure: ~/.docker/config.json references a helper
// binary (e.g. docker-credential-desktop) that isn't on $PATH, which makes
// every `docker pull` fail with "error getting credentials". This is the
// root cause of the "Command accepted + nothing happens" symptom in the
// dashboard, and the user can fix it with a one-line config edit.
//
// The check parses the host's docker config (no auth material) and confirms
// every named helper is on $PATH. Missing entries are reported as Warn with
// an explicit fix instruction — not Fail, because the user can still pull
// public images, and the warning is shown next to the system check so the
// cause-and-effect is obvious.
func (c *Checker) checkDockerCredentialHelper() Check {
	cfgPath := dockerConfigPath()
	if cfgPath == "" {
		return Check{Name: "docker-credentials", Status: OK, Message: "no Docker config to inspect"}
	}
	// readMissingHelper returns (name, false) when a referenced helper is missing
	// and ("", true) when the config is healthy. Treat healthy as OK; only warn
	// when an actual (non-empty) helper name is missing — a config with no
	// credsStore/credHelpers (the common Colima case) must not warn.
	helper, healthy := readMissingHelper(cfgPath)
	if healthy || helper == "" {
		return Check{Name: "docker-credentials", Status: OK, Message: "Docker credential helpers are healthy"}
	}
	// Docker Desktop on macOS leaves a `credsStore: "desktop"` entry behind
	// after uninstall. The desktop helper obviously won't exist on systems
	// that don't have Docker Desktop, so call this out explicitly so the
	// user knows how to clean up the leftover config.
	hint := `Edit ` + cfgPath + ` and set "credsStore" (or the matching "credHelpers" entry) to an empty string, or install the helper on your PATH.`
	if helper == "desktop" || helper == "osxkeychain" {
		hint = `Edit ` + cfgPath + ` and remove the "credsStore": "` + helper + `" line — it's a leftover from Docker Desktop. The launcher doesn't need a credential helper to pull public images.`
	}
	return Check{
		Name:    "docker-credentials",
		Status:  Warn,
		Message: `Docker credential helper "` + helper + `" is referenced in ` + cfgPath + ` but not installed — pulls may fail with "error getting credentials".`,
		Hint:    hint,
	}
}

func (c *Checker) checkDisk() Check {
	if c.Disk == nil {
		return Check{Name: "disk", Status: Warn, Message: "disk check skipped"}
	}
	u, err := c.Disk(c.DataDir)
	if err != nil {
		return Check{Name: "disk", Status: Warn, Message: "could not read disk usage: " + err.Error()}
	}
	if u.FreeBytes < c.MinFreeBytes {
		return Check{
			Name:    "disk",
			Status:  Warn,
			Message: fmt.Sprintf("low disk: %.1f GiB free (recommend %.0f GiB)", gib(u.FreeBytes), gib(c.MinFreeBytes)),
			Hint:    "Free up space, use fast-start, or point --data-dir at a larger disk.",
		}
	}
	return Check{Name: "disk", Status: OK, Message: fmt.Sprintf("%.1f GiB free", gib(u.FreeBytes))}
}

// checkZebra is a soft "is Zebra responding?" probe. It is reported as Warn
// (not Fail) because a cold-start or a stack that's still syncing is a
// perfectly normal reason for the health endpoint to be unreachable. The
// only hard fail is Docker missing.
func (c *Checker) checkZebra(ctx context.Context, port int) Check {
	if port == 0 {
		return Check{Name: "zebra", Status: Warn, Message: "zebra port unresolved"}
	}
	addr := fmt.Sprintf("http://127.0.0.1:%d/ready", port)
	if err := c.ZebraHealth(ctx, addr); err != nil {
		return Check{
			Name:    "zebra",
			Status:  Warn,
			Message: "Zebra is not reachable on " + addr + ": " + err.Error(),
			Hint:    "Start the stack, or check the logs panel if it's already running.",
		}
	}
	return Check{Name: "zebra", Status: OK, Message: "Zebra is responding on " + addr}
}

func gib(b uint64) float64 { return float64(b) / (1 << 30) }

// DockerInfo returns nil if `docker info` succeeds (daemon reachable). It
// retries up to 3 times with a short delay to handle transient EOF errors
// that occur while the Docker daemon is still starting (common right after
// `colima start` on macOS).
func DockerInfo(ctx context.Context) error {
	var lastErr error
	for attempt := 0; attempt < 3; attempt++ {
		if attempt > 0 {
			select {
			case <-ctx.Done():
				return lastErr
			case <-time.After(2 * time.Second):
			}
		}
		tryCtx, cancel := context.WithTimeout(ctx, 8*time.Second)
		cmd := exec.CommandContext(tryCtx, "docker", "info", "--format", "{{.ServerVersion}}")
		if host := DockerHost(); host != "" {
			cmd.Env = append(os.Environ(), "DOCKER_HOST="+host)
		}
		out, err := cmd.CombinedOutput()
		cancel()
		if err == nil {
			return nil
		}
		msg := strings.TrimSpace(string(out))
		if msg == "" {
			msg = err.Error()
		}
		lastErr = fmt.Errorf("%s", msg)
		// Only retry on transient connection errors (EOF, connection refused)
		// — not on "docker not found" or other permanent failures.
		if !isTransientDockerError(msg) {
			return lastErr
		}
	}
	return lastErr
}

// isTransientDockerError reports whether the docker error message suggests a
// transient condition (daemon still starting) vs a permanent one (not installed).
func isTransientDockerError(msg string) bool {
	for _, substr := range []string{"EOF", "connection refused", "connection reset", "i/o timeout"} {
		if strings.Contains(msg, substr) {
			return true
		}
	}
	return false
}

// DockerHost returns a DOCKER_HOST value to pass to the docker CLI.
// It honors an explicit $DOCKER_HOST, otherwise probes the Colima default
// socket on macOS. Returns the empty string when nothing overrides the
// platform default (i.e. /var/run/docker.sock on Linux, the named pipe on
// Windows). Exported so the compose executor (and any other code that
// shells out to the docker CLI) can use the same resolution logic as
// the preflight check — without it, `docker compose up` would target a
// non-existent /var/run/docker.sock even though preflight reported Docker
// as healthy via the Colima socket.
// dockerHostOnce memoizes the resolved DOCKER_HOST so the hot path (every docker
// invocation, on the 2s status poll) does no per-call filesystem probing, and so
// resolution is sticky: all docker commands target one consistent daemon for the
// process lifetime instead of flipping between Colima/OrbStack/Docker-Desktop if
// a higher-priority socket appears or disappears mid-session.
var (
	dockerHostOnce  sync.Once
	dockerHostValue string
)

func DockerHost() string {
	dockerHostOnce.Do(func() {
		dockerHostValue, _ = resolveDockerHost(runtime.GOOS)
	})
	return dockerHostValue
}

// resolveDockerHost is the testable form of DockerHost. goos is injected
// so tests can simulate darwin without touching runtime.
func resolveDockerHost(goos string) (host string, socketPath string) {
	if v := os.Getenv("DOCKER_HOST"); v != "" {
		return v, ""
	}
	if goos == "darwin" {
		home, err := os.UserHomeDir()
		if err != nil {
			return "", ""
		}
		// Probe all known runtime sockets in priority order (Colima,
		// OrbStack, Docker Desktop, Rancher Desktop). The list is shared
		// with dockerinstall.DockerSocketPaths so every code path that
		// resolves the socket agrees.
		for _, rel := range dockerinstall.DockerSocketPaths {
			sock := filepath.Join(home, rel)
			if _, err := os.Stat(sock); err == nil {
				return "unix://" + sock, sock
			}
		}
	}
	return "", ""
}

// PortFree returns nil if a TCP listener can bind addr (i.e. it's free).
func PortFree(addr string) error {
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		return err
	}
	return ln.Close()
}

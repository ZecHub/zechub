// Package dockerinstall turns "Docker is missing" from a dead end into an
// assisted install. It detects the platform and the best available package
// manager, surfaces the exact official install command, and can run it — but
// only on explicit opt-in, because installing Docker modifies the system and
// needs root/admin. It never installs silently.
package dockerinstall

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"runtime"
	"strings"
	"time"
)

// Plan describes how to install Docker on the current platform.
type Plan struct {
	OS       string `json:"os"`
	Method   string `json:"method"`   // homebrew | get.docker.com | winget | manual
	Command  string `json:"command"`  // the shell command to run (empty => manual only)
	Manual   string `json:"manual"`   // docs URL for manual install
	Elevated bool   `json:"elevated"` // needs sudo/admin
	Note     string `json:"note,omitempty"`
}

// Automatic reports whether this plan can be executed by the launcher.
func (p Plan) Automatic() bool { return p.Command != "" }

const dockerDocs = "https://docs.docker.com/get-docker/"

// Detect returns the recommended install Plan for goos, using has(bin) to probe
// for available package managers (inject for tests).
func Detect(goos string, has func(bin string) bool) Plan {
	switch goos {
	case "darwin":
		if has("brew") {
			// HOMEBREW_NO_AUTO_UPDATE prevents brew from running a potentially
			// slow (and occasionally sudo-requiring) `brew update` before the
			// install. This is the most common cause of permission errors when
			// running from a non-interactive context (the dashboard).
			return Plan{
				OS:      goos,
				Method:  "homebrew",
				Command: "HOMEBREW_NO_AUTO_UPDATE=1 brew install colima docker",
				Manual:  dockerDocs,
				Note:    "After install, run 'colima start' once to launch the daemon. The launcher's preflight will detect ~/.colima/default/docker.sock automatically.",
			}
		}
		// No Homebrew: bootstrap it non-interactively, then install Colima.
		// NONINTERACTIVE=1 stops the installer waiting on an Enter prompt;
		// stdin is /dev/null so any sudo prompt fails fast instead of hanging.
		return Plan{
			OS:     goos,
			Method: "homebrew-bootstrap",
			Command: `NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" && ` +
				`eval "$(/opt/homebrew/bin/brew shellenv 2>/dev/null || /usr/local/bin/brew shellenv)" && ` +
				`brew install colima docker`,
			Manual: dockerDocs,
			Note:   "Installs Homebrew, then Colima (the macOS Docker runtime) and the docker CLI. If this needs an admin password it will stop — install Homebrew from brew.sh in a terminal, then click again. Run 'colima start' once afterwards.",
		}
	case "linux":
		return Plan{
			OS:       goos,
			Method:   "get.docker.com",
			Command:  "curl -fsSL https://get.docker.com | sudo sh",
			Manual:   dockerDocs,
			Elevated: true,
			Note:     "After install you may need: sudo usermod -aG docker $USER (then re-login).",
		}
	case "windows":
		if has("winget") {
			return Plan{
				OS:       goos,
				Method:   "winget",
				Command:  "winget install -e --id Docker.DockerDesktop",
				Manual:   dockerDocs,
				Elevated: true,
				Note:     "Docker Desktop on Windows requires WSL2.",
			}
		}
		return Plan{OS: goos, Method: "manual", Manual: dockerDocs,
			Note: "Install winget or download Docker Desktop (requires WSL2)."}
	default:
		return Plan{OS: goos, Method: "manual", Manual: dockerDocs}
	}
}

// DetectCurrent detects a Plan for the running platform.
func DetectCurrent() Plan {
	return Detect(runtime.GOOS, func(bin string) bool {
		_, err := exec.LookPath(bin)
		return err == nil
	})
}

// Run executes the install command. It is the caller's responsibility to obtain
// the user's consent before calling this — it modifies the system.
func (p Plan) Run(ctx context.Context) error {
	if !p.Automatic() {
		return fmt.Errorf("no automatic installer for %s; install manually: %s", p.OS, p.Manual)
	}
	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.CommandContext(ctx, "cmd", "/c", p.Command)
	} else {
		cmd = exec.CommandContext(ctx, "sh", "-c", p.Command)
	}
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("docker install (%s) failed: %w", p.Method, err)
	}
	return nil
}

// RunStream executes the install command, streaming combined stdout+stderr to
// emit line by line. Unlike Run it does NOT attach the process stdin — stdin is
// /dev/null — so a sudo password prompt fails fast instead of hanging a browser
// request forever. Callers should gate elevation with CanElevateNonInteractive
// before calling this on Linux.
func (p Plan) RunStream(ctx context.Context, emit func(line string)) error {
	if !p.Automatic() {
		return fmt.Errorf("no automatic installer for %s; install manually: %s", p.OS, p.Manual)
	}
	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.CommandContext(ctx, "cmd", "/c", p.Command)
	} else {
		cmd = exec.CommandContext(ctx, "sh", "-c", p.Command)
	}

	pr, pw := io.Pipe()
	cmd.Stdout = pw
	cmd.Stderr = pw
	cmd.Stdin = nil // /dev/null: never block on an interactive prompt

	if err := cmd.Start(); err != nil {
		return fmt.Errorf("start docker install (%s): %w", p.Method, err)
	}

	scanned := make(chan struct{})
	go func() {
		sc := bufio.NewScanner(pr)
		sc.Buffer(make([]byte, 0, 64*1024), 1<<20)
		for sc.Scan() {
			emit(sc.Text())
		}
		close(scanned)
	}()

	runErr := cmd.Wait()
	_ = pw.Close() // unblock the scanner with EOF
	<-scanned

	if runErr != nil {
		return fmt.Errorf("docker install (%s) failed: %w", p.Method, runErr)
	}
	return nil
}

// CanElevateNonInteractive reports whether root can be obtained without an
// interactive password (already root, or passwordless sudo). Used to decide
// whether a streamed Linux install can proceed without hanging on a prompt.
func CanElevateNonInteractive() bool {
	if runtime.GOOS == "windows" {
		return false
	}
	if os.Geteuid() == 0 {
		return true
	}
	return exec.Command("sudo", "-n", "true").Run() == nil
}

// Verify returns nil if the Docker daemon is reachable (`docker info` succeeds).
// It honors $DOCKER_HOST and auto-detects Colima's socket on macOS, matching
// the same resolution logic used by the preflight check and compose executor.
// It retries up to 3 times with a short delay to handle the transient EOF
// errors that occur while the Docker daemon is still starting inside Colima.
func Verify(ctx context.Context) error {
	host := resolveDockerHostForVerify()
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
		if host != "" {
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
		// Only retry on transient connection errors — not "docker not found".
		if !strings.Contains(msg, "EOF") && !strings.Contains(msg, "connection refused") &&
			!strings.Contains(msg, "connection reset") {
			return lastErr
		}
	}
	return lastErr
}

// resolveDockerHostForVerify returns the DOCKER_HOST to use, honoring an
// explicit env var or probing known runtime socket paths on macOS.
func resolveDockerHostForVerify() string {
	if v := os.Getenv("DOCKER_HOST"); v != "" {
		return v
	}
	if sock := findDockerSocket(); sock != "" {
		return "unix://" + sock
	}
	return ""
}

// findDockerSocket probes known socket paths for the running platform and
// returns the first one that exists. This keeps socket resolution in sync
// with the runtime detection above and with preflight.DockerHost().
func findDockerSocket() string {
	if runtime.GOOS != "darwin" {
		return "" // Linux/Windows use the platform default
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return ""
	}
	for _, rel := range DockerSocketPaths {
		sock := home + "/" + rel
		if _, err := os.Stat(sock); err == nil {
			return sock
		}
	}
	return ""
}

// DockerSocketPaths lists the known Docker socket locations on macOS, in
// probe order. Exported so preflight.resolveDockerHost can reuse the same
// list. Each path is relative to $HOME.
var DockerSocketPaths = []string{
	".colima/default/docker.sock",          // Colima
	".orbstack/run/docker.sock",            // OrbStack
	".docker/run/docker.sock",              // Docker Desktop (newer)
	".rd/docker.sock",                      // Rancher Desktop
	"Library/Containers/com.docker.docker/Data/docker.raw.sock", // Docker Desktop (legacy)
}

// ErrManualOnly indicates no automatic installer is available.
var ErrManualOnly = errors.New("manual Docker install required")

// RuntimeStatus describes the state of the Docker runtime on the host.
type RuntimeStatus struct {
	Runtime   string `json:"runtime"`   // e.g. "colima", "docker-desktop", "orbstack", "rancher-desktop", "native", "unknown"
	Installed bool   `json:"installed"` // runtime binary/app found
	Running   bool   `json:"running"`   // daemon is reachable
	Startable bool   `json:"startable"` // can be started from the app (no sudo needed)
	StartCmd  string `json:"startCmd"`  // human-readable command to start the runtime
}

// runtimeProbe defines how to detect and start a specific Docker runtime.
type runtimeProbe struct {
	name      string                         // e.g. "colima", "docker-desktop"
	detect    func() bool                    // is the runtime installed?
	running   func() bool                    // is the runtime currently active?
	startable bool                           // can be started without sudo from the browser?
	startCmd  string                         // human-readable start command
	start     func(ctx context.Context, emit func(string)) error // streaming start function (nil = not startable)
}

// darwinProbes lists macOS Docker runtimes in priority order. The first one
// whose detect() returns true wins. This keeps the codebase open to new
// runtimes without touching the caller.
var darwinProbes = []runtimeProbe{
	{
		name:      "colima",
		detect:    func() bool { return hasBin("colima") },
		running:   func() bool { return cmdOK("colima", "status") },
		startable: true,
		startCmd:  "colima start",
		start:     startColima,
	},
	{
		name:      "orbstack",
		detect:    func() bool { return hasBin("orbctl") || appExists("OrbStack") },
		running:   func() bool { return cmdOK("orbctl", "status") },
		startable: true,
		startCmd:  "open -a OrbStack",
		start:     func(ctx context.Context, emit func(string)) error { return startApp(ctx, emit, "OrbStack") },
	},
	{
		name:      "docker-desktop",
		detect:    func() bool { return appExists("Docker") },
		running:   func() bool { return dockerDaemonReachable() },
		startable: true,
		startCmd:  "open -a Docker",
		start:     func(ctx context.Context, emit func(string)) error { return startApp(ctx, emit, "Docker") },
	},
	{
		name:      "rancher-desktop",
		detect:    func() bool { return appExists("Rancher Desktop") },
		running:   func() bool { return dockerDaemonReachable() },
		startable: true,
		startCmd:  "open -a 'Rancher Desktop'",
		start:     func(ctx context.Context, emit func(string)) error { return startApp(ctx, emit, "Rancher Desktop") },
	},
}

// linuxProbes lists Linux Docker runtimes.
var linuxProbes = []runtimeProbe{
	{
		name:      "docker",
		detect:    func() bool { return hasBin("docker") },
		running:   dockerDaemonReachable,
		startable: false,
		startCmd:  "sudo systemctl start docker",
	},
	{
		name:      "podman",
		detect:    func() bool { return hasBin("podman") },
		running:   func() bool { return cmdOK("podman", "info") },
		startable: true,
		startCmd:  "podman machine start",
		start: func(ctx context.Context, emit func(string)) error {
			_, err := streamCmd(ctx, emit, "podman", "machine", "start")
			return err
		},
	},
}

// windowsProbes lists Windows Docker runtimes. Docker Desktop is by far the
// most common; Rancher Desktop is the main alternative.
var windowsProbes = []runtimeProbe{
	{
		name: "docker-desktop",
		detect: func() bool {
			return winAppExists(`Docker\Docker\Docker Desktop.exe`)
		},
		running:   dockerDaemonReachable,
		startable: true,
		startCmd:  `"C:\Program Files\Docker\Docker\Docker Desktop.exe"`,
		start: func(ctx context.Context, emit func(string)) error {
			return startWinApp(ctx, emit, "Docker Desktop", `C:\Program Files\Docker\Docker\Docker Desktop.exe`)
		},
	},
	{
		name: "rancher-desktop",
		detect: func() bool {
			return winAppExists(`Rancher Desktop\Rancher Desktop.exe`)
		},
		running:   dockerDaemonReachable,
		startable: true,
		startCmd:  `"C:\Program Files\Rancher Desktop\Rancher Desktop.exe"`,
		start: func(ctx context.Context, emit func(string)) error {
			return startWinApp(ctx, emit, "Rancher Desktop", `C:\Program Files\Rancher Desktop\Rancher Desktop.exe`)
		},
	},
	{
		name:      "podman",
		detect:    func() bool { return hasBin("podman") },
		running:   func() bool { return cmdOK("podman", "info") },
		startable: true,
		startCmd:  "podman machine start",
		start: func(ctx context.Context, emit func(string)) error {
			_, err := streamCmd(ctx, emit, "podman", "machine", "start")
			return err
		},
	},
}

// DetectRuntime probes for known Docker runtimes on the given OS.
func DetectRuntime(goos string) RuntimeStatus {
	var probes []runtimeProbe
	switch goos {
	case "darwin":
		probes = darwinProbes
	case "linux":
		probes = linuxProbes
	case "windows":
		probes = windowsProbes
	default:
		return RuntimeStatus{Runtime: "unknown"}
	}

	for _, p := range probes {
		if p.detect() {
			running := p.running()
			return RuntimeStatus{
				Runtime:   p.name,
				Installed: true,
				Running:   running,
				Startable: p.startable,
				StartCmd:  p.startCmd,
			}
		}
	}

	// Docker CLI exists but no recognized runtime manager.
	if hasBin("docker") {
		return RuntimeStatus{
			Runtime:   "docker",
			Installed: true,
			Running:   dockerDaemonReachable(),
			Startable: false,
			StartCmd:  "start your Docker daemon manually",
		}
	}

	return RuntimeStatus{Runtime: "unknown", Installed: false}
}

// DetectCurrentRuntime is the convenience form for the running platform.
func DetectCurrentRuntime() RuntimeStatus { return DetectRuntime(runtime.GOOS) }

// StartRuntimeStream starts the detected Docker runtime with streaming output.
// It looks up the runtime by name from the probe table and calls its start func.
func StartRuntimeStream(ctx context.Context, emit func(string)) error {
	rs := DetectCurrentRuntime()
	if !rs.Installed {
		return fmt.Errorf("no Docker runtime found; install one first")
	}
	if rs.Running {
		emit(rs.Runtime + " is already running.")
		return nil
	}
	if !rs.Startable {
		return fmt.Errorf("%s cannot be started from the app; run: %s", rs.Runtime, rs.StartCmd)
	}

	// Find the matching probe to get the start function.
	var probes []runtimeProbe
	switch runtime.GOOS {
	case "darwin":
		probes = darwinProbes
	case "linux":
		probes = linuxProbes
	case "windows":
		probes = windowsProbes
	}
	for _, p := range probes {
		if p.name == rs.Runtime && p.start != nil {
			return p.start(ctx, emit)
		}
	}
	return fmt.Errorf("no start function for runtime %q; run: %s", rs.Runtime, rs.StartCmd)
}

// --- Start functions for specific runtimes ---

// startColima starts Colima with automatic recovery for two common failure modes:
//
//  1. Stale VM: the Lima host-agent socket (ha.sock) is dead but the instance
//     directory remains (common after an unclean macOS shutdown). Recovery is
//     NON-DESTRUCTIVE: `colima stop -f` (tears down the dead host agent without
//     touching the VM disk) + `colima start`. We deliberately never run
//     `colima delete`, which would wipe the entire Docker VM — including the
//     user's other projects' containers and volumes.
//
//  2. Broken socket tunnel: Colima reports "already running" but the Docker
//     socket returns EOF on every connection (the socket forwarding inside the
//     VM got corrupted). Recovery: `colima restart`.
func startColima(ctx context.Context, emit func(string)) error {
	out, err := streamCmd(ctx, emit, "colima", "start")

	// Case 1: stale VM — ha.sock connection refused. Recover by stopping the
	// dead instance cleanly and retrying — NOT by deleting the VM (which would
	// destroy every container/volume the user has across all projects).
	if err != nil && colimaStaleVM(out) {
		emit("")
		emit("Detected stale Colima VM — stopping it cleanly and retrying (non-destructive)…")
		// `colima stop -f` may report "not running"; that is not fatal, so we
		// log and continue to the retry rather than aborting.
		if _, stopErr := streamCmd(ctx, emit, "colima", "stop", "-f"); stopErr != nil {
			emit("colima stop reported: " + stopErr.Error())
		}
		emit("")
		emit("Retrying colima start…")
		_, err = streamCmd(ctx, emit, "colima", "start")
		return err
	}

	// Case 2: "already running" but Docker socket is broken (EOF).
	// colima start exits 0 with a "already running" warning — check if the
	// Docker daemon is actually reachable. If not, restart Colima to rebuild
	// the socket tunnel.
	if err == nil && strings.Contains(out, "already running") {
		emit("")
		emit("Colima reports running — verifying Docker socket…")
		verifyCtx, cancel := context.WithTimeout(ctx, 8*time.Second)
		defer cancel()
		if verifyErr := Verify(verifyCtx); verifyErr != nil {
			emit("Docker socket is broken (EOF). Restarting Colima to rebuild the tunnel…")
			emit("")
			_, err = streamCmd(ctx, emit, "colima", "restart")
			return err
		}
	}

	return err
}

// startApp opens a macOS .app bundle and waits for the Docker daemon to become
// reachable (Docker Desktop, OrbStack, Rancher Desktop all work this way).
func startApp(ctx context.Context, emit func(string), appName string) error {
	emit(fmt.Sprintf("Opening %s.app…", appName))
	if _, err := streamCmd(ctx, emit, "open", "-a", appName); err != nil {
		return fmt.Errorf("open -a %s: %w", appName, err)
	}
	emit(fmt.Sprintf("Waiting for %s to start the Docker daemon…", appName))
	deadline := time.After(60 * time.Second)
	tick := time.NewTicker(2 * time.Second)
	defer tick.Stop()
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-deadline:
			return fmt.Errorf("%s opened but Docker daemon didn't start within 60 seconds", appName)
		case <-tick.C:
			if dockerDaemonReachable() {
				return nil
			}
			emit("  … waiting")
		}
	}
}

// --- Shared helpers ---

// streamCmd runs a command, streaming combined stdout/stderr to emit, and
// returns the full output plus any error.
func streamCmd(ctx context.Context, emit func(string), name string, args ...string) (string, error) {
	cmd := exec.CommandContext(ctx, name, args...)
	pr, pw := io.Pipe()
	cmd.Stdout = pw
	cmd.Stderr = pw
	cmd.Stdin = nil

	if err := cmd.Start(); err != nil {
		return "", fmt.Errorf("start %s: %w", name, err)
	}

	var buf strings.Builder
	scanned := make(chan struct{})
	go func() {
		sc := bufio.NewScanner(pr)
		sc.Buffer(make([]byte, 0, 64*1024), 1<<20)
		for sc.Scan() {
			line := sc.Text()
			buf.WriteString(line)
			buf.WriteByte('\n')
			emit(line)
		}
		close(scanned)
	}()

	runErr := cmd.Wait()
	_ = pw.Close()
	<-scanned

	if runErr != nil {
		return buf.String(), fmt.Errorf("%s %v failed: %w", name, args, runErr)
	}
	return buf.String(), nil
}

// colimaStaleVM detects the stale-VM error: the Lima host-agent socket
// (ha.sock) is gone but the instance directory still exists.
func colimaStaleVM(output string) bool {
	return strings.Contains(output, "ha.sock") && strings.Contains(output, "connection refused")
}

// cmdOK runs a command and returns true if it exits 0.
func cmdOK(name string, args ...string) bool {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	return exec.CommandContext(ctx, name, args...).Run() == nil
}

// dockerDaemonReachable checks `docker info` exit code.
func dockerDaemonReachable() bool {
	return cmdOK("docker", "info")
}

// hasBin reports whether bin is on PATH.
func hasBin(bin string) bool {
	_, err := exec.LookPath(bin)
	return err == nil
}

// appExists checks if a macOS .app bundle exists in /Applications.
func appExists(name string) bool {
	_, err := os.Stat("/Applications/" + name + ".app")
	return err == nil
}

// winAppExists checks if a Windows executable exists under "C:\Program Files".
func winAppExists(relPath string) bool {
	_, err := os.Stat(`C:\Program Files\` + relPath)
	return err == nil
}

// startWinApp launches a Windows executable and waits for the Docker daemon to
// become reachable (Docker Desktop and Rancher Desktop both work this way).
func startWinApp(ctx context.Context, emit func(string), name, exePath string) error {
	emit(fmt.Sprintf("Starting %s…", name))
	if _, err := streamCmd(ctx, emit, "cmd", "/c", "start", "", exePath); err != nil {
		return fmt.Errorf("start %s: %w", name, err)
	}
	emit(fmt.Sprintf("Waiting for %s to start the Docker daemon…", name))
	deadline := time.After(90 * time.Second) // Windows Docker Desktop can be slower
	tick := time.NewTicker(3 * time.Second)
	defer tick.Stop()
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-deadline:
			return fmt.Errorf("%s opened but Docker daemon didn't start within 90 seconds", name)
		case <-tick.C:
			if dockerDaemonReachable() {
				return nil
			}
			emit("  … waiting")
		}
	}
}

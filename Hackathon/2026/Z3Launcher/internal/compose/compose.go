// Package compose drives the vendored z3 docker compose project. It builds and
// executes `docker compose` commands through an injectable Runner so the
// command construction can be unit-tested without Docker present.
//
// The launcher deliberately shells out to `docker compose` for lifecycle
// (up/down/restart/stop) and status/logs, rather than depending on the Docker
// SDK. This keeps the dependency surface small and the orchestration logic
// trivially testable; health is read directly over the services' own RPCs.
package compose

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/creack/pty"
	"github.com/raycreatives/z3-launcher/internal/preflight"
)

// Runner executes a docker invocation with extra environment variables. The
// real implementation shells out to the docker CLI; tests provide a fake.
type Runner interface {
	Run(ctx context.Context, env map[string]string, args ...string) ([]byte, error)
}

// StreamRunner is an optional capability: a Runner that can stream output line
// by line as the command runs (rather than buffering until it exits). The exec
// runner implements it so the dashboard sees image pulls and errors live. When
// a Runner doesn't implement it, Compose falls back to buffered Run + post-hoc
// line emit, so tests and alternate runners keep working.
type StreamRunner interface {
	RunStream(ctx context.Context, env map[string]string, emit func(line string), args ...string) error
}

// Compose wraps a single docker compose project.
//
// Env is read on every docker invocation (status polls, log-follow, lifecycle)
// from multiple goroutines, and mutated at runtime by the Zallet toggle. A plain
// map read concurrently with a write is an unrecoverable Go fatal ("concurrent
// map read and map write"), so all access goes through SetEnv / envSnapshot
// under envMu. Do not range or write Compose.Env directly.
type Compose struct {
	ProjectName string
	File        string            // path to docker-compose.yml
	Env         map[string]string // environment passed to compose (renders ${VARS}); guard with envMu
	envMu       sync.RWMutex
	Runner      Runner

	// AllProfiles are every compose profile the project defines (e.g. zallet,
	// regtest). Down activates all of them so a teardown removes profile-gated
	// services (and frees their volumes) even when the current COMPOSE_PROFILES
	// doesn't include them — otherwise `down -v` leaves a running zallet holding
	// the wallet volume and the wipe silently fails. Empty = none (tests).
	AllProfiles []string

	// Activity, when set, receives each line of stdout/stderr produced by the
	// lifecycle commands (up/down/stop/restart) as it happens. This is what
	// lets the dashboard's live activity log show image pulls, container
	// creation, and errors (e.g. a bind-mount chown failure) in real time —
	// container logs alone don't cover the `up` phase. Nil disables teeing.
	Activity LineSink
}

// LineSink receives lifecycle command output line by line. It is satisfied by
// *logs.Activity; kept as an interface here to avoid a package import cycle.
type LineSink interface {
	Emit(line string)
}

// New constructs a Compose for the given project, file, and environment.
func New(project, file string, env map[string]string, r Runner) *Compose {
	return &Compose{ProjectName: project, File: file, Env: env, Runner: r}
}

// baseArgs returns the global flags that precede every subcommand. A fresh
// slice is returned each call so callers may append without aliasing.
func (c *Compose) baseArgs() []string {
	return []string{"compose", "-p", c.ProjectName, "-f", c.File}
}

// SetEnv sets a compose environment variable under the write lock. This is the
// only safe way to mutate the environment at runtime (e.g. the Zallet toggle
// flipping COMPOSE_PROFILES) while docker invocations are reading it.
func (c *Compose) SetEnv(key, val string) {
	c.envMu.Lock()
	defer c.envMu.Unlock()
	if c.Env == nil {
		c.Env = make(map[string]string)
	}
	c.Env[key] = val
}

// envSnapshot returns a copy of the environment taken under the read lock, so a
// concurrent SetEnv can never race a range over the live map.
func (c *Compose) envSnapshot() map[string]string {
	c.envMu.RLock()
	defer c.envMu.RUnlock()
	if c.Env == nil {
		return nil
	}
	cp := make(map[string]string, len(c.Env))
	for k, v := range c.Env {
		cp[k] = v
	}
	return cp
}

// runLifecycle executes a lifecycle command, teeing its output to the Activity
// sink (when set) so the dashboard's live log shows real progress. It prefers a
// StreamRunner for line-by-line output and falls back to buffered Run.
func (c *Compose) runLifecycle(ctx context.Context, args ...string) ([]byte, error) {
	env := c.envSnapshot()
	if c.Activity == nil {
		return c.Runner.Run(ctx, env, args...)
	}
	if sr, ok := c.Runner.(StreamRunner); ok {
		var buf bytes.Buffer
		err := sr.RunStream(ctx, env, func(line string) {
			c.Activity.Emit(line)
			buf.WriteString(line)
			buf.WriteByte('\n')
		}, args...)
		return buf.Bytes(), err
	}
	// Buffered fallback: emit the output once the command returns.
	out, err := c.Runner.Run(ctx, env, args...)
	for _, line := range strings.Split(strings.TrimRight(string(out), "\n"), "\n") {
		if line != "" {
			c.Activity.Emit(line)
		}
	}
	return out, err
}

// Up starts the given services (all if none named) in detached mode. The
// launcher uses this to bring Zebra up first, then Zaino once Zebra is ready.
func (c *Compose) Up(ctx context.Context, services ...string) ([]byte, error) {
	// --remove-orphans clears containers left by a previous run whose service was
	// since removed/renamed (e.g. a profile-gated zallet), so a fresh Up never
	// inherits a half-broken stack.
	args := append(c.baseArgs(), "up", "-d", "--remove-orphans")
	args = append(args, services...)
	return c.runLifecycle(ctx, args...)
}

// Recreate force-recreates the given services in detached mode. Unlike Up, it
// passes --force-recreate so a container is rebuilt even when compose's own diff
// detection wouldn't trip — the case that matters is swapping Zebra's cache
// bind-mount (the fast-start "attach" flow changes only the Z3_ZEBRA_CACHE_MOUNT
// env, and the running container must be rebuilt to pick up the new mount).
func (c *Compose) Recreate(ctx context.Context, services ...string) ([]byte, error) {
	args := append(c.baseArgs(), "up", "-d", "--force-recreate", "--remove-orphans")
	args = append(args, services...)
	return c.runLifecycle(ctx, args...)
}

// Run executes a one-shot service in the foreground and returns its combined
// output and exit status. Unlike Up (which detaches with -d and returns 0 as
// soon as the container is started, regardless of how it exits), Run waits for
// the container to finish and propagates its real exit code — which the launcher
// needs to tell "wallet freshly initialized" from "wallet already initialized".
// --rm cleans up the ephemeral container; --no-deps keeps it from dragging in
// the rest of the stack (the launcher has already brought Zebra up); -T avoids
// pseudo-TTY allocation in this headless context.
func (c *Compose) Run(ctx context.Context, service string) ([]byte, error) {
	args := append(c.baseArgs(), "run", "--rm", "--no-deps", "-T", service)
	return c.runLifecycle(ctx, args...)
}

// TTYRunner is an optional Runner capability: run a command attached to a
// pseudo-terminal and feed it a secret line when it prompts. This is required by
// `zallet import-mnemonic`, which reads the phrase via rpassword from /dev/tty —
// with no TTY it fails with ENXIO ("no such device or address"), and a plain
// stdin pipe is not read at all. The exec runner implements it.
type TTYRunner interface {
	RunTTY(ctx context.Context, env map[string]string, input []byte, args ...string) ([]byte, error)
}

// WalletVolumeExists reports whether the project's zallet-data named volume
// exists. It distinguishes "absent" (false, nil) from "can't tell — Docker
// unavailable" (false, err), so a reconcile can clear a stale marker only when
// it is certain the wallet volume is gone, never when Docker is merely down.
func (c *Compose) WalletVolumeExists(ctx context.Context) (bool, error) {
	out, err := c.Runner.Run(ctx, c.envSnapshot(), "volume", "inspect", c.ProjectName+"_zallet-data")
	if err == nil {
		return true, nil
	}
	if strings.Contains(strings.ToLower(string(out)), "no such volume") {
		return false, nil
	}
	return false, err
}

// RunWithStdinTTY runs a one-shot service over a PTY and supplies input as the
// answer to its terminal prompt (e.g. the recovery phrase for import-mnemonic).
// Note: NO `-T` — a TTY must be allocated. The secret is never teed to the
// activity feed and is scrubbed from the returned output. Falls back to a plain
// Run when the Runner can't allocate a TTY (tests).
func (c *Compose) RunWithStdinTTY(ctx context.Context, service string, input []byte) ([]byte, error) {
	args := append(c.baseArgs(), "run", "--rm", "--no-deps", service)
	if tr, ok := c.Runner.(TTYRunner); ok {
		return tr.RunTTY(ctx, c.envSnapshot(), input, args...)
	}
	return c.Runner.Run(ctx, c.envSnapshot(), args...)
}

// Down stops and removes the project's containers. When removeVolumes is true
// it also deletes named volumes — used by reset to wipe chain state.
func (c *Compose) Down(ctx context.Context, removeVolumes bool) ([]byte, error) {
	args := c.baseArgs()
	// Activate every profile so down tears down profile-gated services (zallet,
	// the regtest overlay) regardless of the current COMPOSE_PROFILES. Without
	// this a running zallet keeps holding the wallet volume and `down -v` can't
	// remove it — the wipe silently fails. --profile is a top-level flag, so it
	// must come before the `down` subcommand.
	for _, p := range c.AllProfiles {
		args = append(args, "--profile", p)
	}
	args = append(args, "down")
	if removeVolumes {
		args = append(args, "-v")
	}
	// --remove-orphans so reset clears every container the project ever spawned,
	// including one-shot services that a plain `down` leaves behind.
	args = append(args, "--remove-orphans")
	return c.runLifecycle(ctx, args...)
}

// Restart restarts the given services (all if none named).
func (c *Compose) Restart(ctx context.Context, services ...string) ([]byte, error) {
	args := append(c.baseArgs(), "restart")
	args = append(args, services...)
	return c.runLifecycle(ctx, args...)
}

// Stop stops the given services (all if none named) without removing them.
func (c *Compose) Stop(ctx context.Context, services ...string) ([]byte, error) {
	args := append(c.baseArgs(), "stop")
	args = append(args, services...)
	return c.runLifecycle(ctx, args...)
}

// PS returns `docker compose ps` output as JSON for status parsing.
func (c *Compose) PS(ctx context.Context) ([]byte, error) {
	args := append(c.baseArgs(), "ps", "--format", "json")
	return c.Runner.Run(ctx, c.envSnapshot(), args...)
}

// containerStatus is the subset of `docker compose ps --format json` the
// launcher needs: which compose service a container belongs to and its Docker
// state.
type containerStatus struct {
	Service string `json:"Service"`
	Name    string `json:"Name"`
	Image   string `json:"Image"`
	State   string `json:"State"` // running, exited, created, restarting, paused, dead
	Health  string `json:"Health"`
}

// Container describes one container in the project: its compose service, the
// concrete container name, Docker state, and the image it was created from.
// Used to detect a stale stack left by a previous launcher run.
type Container struct {
	Service string
	Name    string
	State   string
	Image   string
}

// ProjectContainers lists every container belonging to the project (running or
// not), via `docker compose ps -a --format json`. An empty slice means a clean
// slate; a non-empty slice at startup means a previous run left a stack behind.
func (c *Compose) ProjectContainers(ctx context.Context) ([]Container, error) {
	args := append(c.baseArgs(), "ps", "-a", "--format", "json")
	out, err := c.Runner.Run(ctx, c.envSnapshot(), args...)
	if err != nil {
		return nil, err
	}
	var cs []Container
	for _, s := range parsePSAll(out) {
		if s.Service == "" {
			continue
		}
		cs = append(cs, Container{Service: s.Service, Name: s.Name, State: s.State, Image: s.Image})
	}
	return cs, nil
}

// parsePSAll parses `docker compose ps -a --format json` (array or NDJSON) into
// the raw rows, tolerating malformed lines.
func parsePSAll(out []byte) []containerStatus {
	var rows []containerStatus
	trimmed := bytes.TrimSpace(out)
	if len(trimmed) == 0 {
		return rows
	}
	if trimmed[0] == '[' {
		if err := json.Unmarshal(trimmed, &rows); err == nil {
			return rows
		}
		rows = nil
	}
	for _, line := range bytes.Split(trimmed, []byte("\n")) {
		line = bytes.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		var s containerStatus
		if err := json.Unmarshal(line, &s); err != nil {
			continue
		}
		rows = append(rows, s)
	}
	return rows
}

// ContainerStates returns the Docker state of every container in the project,
// keyed by compose service name (e.g. "zebra" -> "running"). It runs
// `docker compose ps -a --format json` so stopped/exited containers are
// included too, which lets the caller tell "container exists but its RPC isn't
// answering yet" apart from "no container at all". A service with no container
// is simply absent from the returned map.
func (c *Compose) ContainerStates(ctx context.Context) (map[string]string, error) {
	args := append(c.baseArgs(), "ps", "-a", "--format", "json")
	out, err := c.Runner.Run(ctx, c.envSnapshot(), args...)
	if err != nil {
		return nil, err
	}
	return parsePSStates(out), nil
}

// parsePSStates parses `docker compose ps --format json` output into a
// service -> state map. Compose v2 emits newline-delimited JSON (one object
// per line); older builds emit a single JSON array. Both shapes are handled,
// and malformed lines are skipped rather than failing the whole probe.
func parsePSStates(out []byte) map[string]string {
	states := make(map[string]string)
	trimmed := bytes.TrimSpace(out)
	if len(trimmed) == 0 {
		return states
	}
	// Array form: [ {...}, {...} ].
	if trimmed[0] == '[' {
		var arr []containerStatus
		if err := json.Unmarshal(trimmed, &arr); err == nil {
			for _, s := range arr {
				if s.Service != "" {
					states[s.Service] = s.State
				}
			}
			return states
		}
	}
	// NDJSON form: one object per line.
	for _, line := range bytes.Split(trimmed, []byte("\n")) {
		line = bytes.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		var s containerStatus
		if err := json.Unmarshal(line, &s); err != nil {
			continue
		}
		if s.Service != "" {
			states[s.Service] = s.State
		}
	}
	return states
}

// Logs returns recent logs for a service (all services if service is empty).
// A tail <= 0 means "all lines".
func (c *Compose) Logs(ctx context.Context, service string, tail int) ([]byte, error) {
	args := append(c.baseArgs(), "logs", "--no-color")
	if tail > 0 {
		args = append(args, "--tail", strconv.Itoa(tail))
	}
	if service != "" {
		args = append(args, service)
	}
	return c.Runner.Run(ctx, c.envSnapshot(), args...)
}

// logsFollowArgs builds the args for a streaming `docker compose logs -f`. It
// is split out so the construction can be unit-tested; base must be a fresh
// slice (from baseArgs) to avoid aliasing.
func logsFollowArgs(base []string, service string) []string {
	args := append(append([]string{}, base...), "logs", "-f", "--no-color")
	if service != "" {
		args = append(args, service)
	}
	return args
}

// LogsFollow starts `docker compose logs -f` for a service (all if empty) and
// returns its stdout as a ReadCloser. Closing it terminates the underlying
// process. This is integration glue (it spawns docker); the line-scanning loop
// that consumes it lives in package logs and is tested there.
func (c *Compose) LogsFollow(ctx context.Context, service string) (io.ReadCloser, error) {
	cmd := exec.CommandContext(ctx, "docker", logsFollowArgs(c.baseArgs(), service)...)
	cmd.Env = dockerEnv(c.envSnapshot())
	cmd.Stderr = os.Stderr
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, err
	}
	if err := cmd.Start(); err != nil {
		return nil, fmt.Errorf("start docker compose logs: %w", err)
	}
	return &cmdReadCloser{ReadCloser: stdout, cmd: cmd}, nil
}

// cmdReadCloser ties a process's stdout to its lifecycle: closing it kills the
// process and reaps it.
type cmdReadCloser struct {
	io.ReadCloser
	cmd *exec.Cmd
}

func (c *cmdReadCloser) Close() error {
	err := c.ReadCloser.Close()
	if c.cmd.Process != nil {
		_ = c.cmd.Process.Kill()
	}
	_ = c.cmd.Wait()
	return err
}

// execRunner is the production Runner; it shells out to the docker CLI.
type execRunner struct {
	bin string
}

// NewExecRunner returns a Runner that invokes the docker CLI found on PATH.
func NewExecRunner() Runner {
	return &execRunner{bin: "docker"}
}

// Run executes `docker <args...>` with the process environment plus env, and
// returns combined stdout/stderr. On failure the output is wrapped into the
// error so callers can surface it. DOCKER_HOST is auto-resolved to match the
// preflight check, so Colima / $DOCKER_HOST overrides work for `docker compose`
// as well as `docker info`.
func (e *execRunner) Run(ctx context.Context, env map[string]string, args ...string) ([]byte, error) {
	cmd := exec.CommandContext(ctx, e.bin, args...)
	cmd.Env = dockerEnv(env)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return out, fmt.Errorf("docker %v failed: %w: %s", args, err, string(out))
	}
	return out, nil
}

// RunTTY runs `docker <args...>` attached to a pseudo-terminal and answers the
// program's prompt with input once it appears. This is how the recovery phrase
// reaches `zallet import-mnemonic`: it reads from /dev/tty via rpassword, so a
// real TTY must exist (otherwise ENXIO) and the answer must be written *after*
// the prompt and held until the process consumes it. The secret is scrubbed from
// the captured output before returning so it can't leak into a log or error.
func (e *execRunner) RunTTY(ctx context.Context, env map[string]string, input []byte, args ...string) ([]byte, error) {
	cmd := exec.CommandContext(ctx, e.bin, args...)
	cmd.Env = dockerEnv(env)
	ptmx, err := pty.Start(cmd)
	if err != nil {
		return nil, fmt.Errorf("allocate pty for docker %v: %w", args, err)
	}
	defer func() { _ = ptmx.Close() }()

	var (
		mu        sync.Mutex
		out       bytes.Buffer
		wroteOnce sync.Once
	)
	answer := append(append([]byte{}, input...), '\n')
	write := func() { wroteOnce.Do(func() { _, _ = ptmx.Write(answer) }) }

	readDone := make(chan struct{})
	go func() {
		defer close(readDone)
		buf := make([]byte, 4096)
		for {
			n, rerr := ptmx.Read(buf)
			if n > 0 {
				mu.Lock()
				out.Write(buf[:n])
				// Write the answer once the program has printed its prompt (and
				// thus disabled echo) so the secret isn't echoed back.
				prompted := bytes.Contains(out.Bytes(), []byte("mnemonic")) || bytes.Contains(out.Bytes(), []byte("Enter"))
				mu.Unlock()
				if prompted {
					write()
				}
			}
			if rerr != nil {
				return
			}
		}
	}()
	// Safety net: if the expected prompt never appears, write anyway so we don't
	// hang the process waiting on input forever.
	go func() {
		select {
		case <-time.After(8 * time.Second):
			write()
		case <-readDone:
		}
	}()

	werr := cmd.Wait()
	<-readDone

	mu.Lock()
	cleaned := bytes.ReplaceAll(out.Bytes(), input, []byte("‹phrase›"))
	mu.Unlock()
	if werr != nil {
		return cleaned, fmt.Errorf("docker %v failed: %w", args, werr)
	}
	return cleaned, nil
}

// RunStream executes `docker <args...>` and invokes emit for each line of
// combined stdout/stderr as it is produced, so the dashboard's activity log
// shows live progress (image pulls, container creation, errors). It satisfies
// StreamRunner. A non-zero exit is returned as an error after the output has
// been fully streamed, so the failing line (e.g. the chown error) is shown.
func (e *execRunner) RunStream(ctx context.Context, env map[string]string, emit func(line string), args ...string) error {
	cmd := exec.CommandContext(ctx, e.bin, args...)
	cmd.Env = dockerEnv(env)
	pr, pw := io.Pipe()
	cmd.Stdout = pw
	cmd.Stderr = pw

	if err := cmd.Start(); err != nil {
		_ = pw.Close()
		return fmt.Errorf("start docker %v: %w", args, err)
	}
	scanDone := make(chan struct{})
	go func() {
		sc := bufio.NewScanner(pr)
		sc.Buffer(make([]byte, 0, 64*1024), 1<<20)
		for sc.Scan() {
			emit(sc.Text())
		}
		close(scanDone)
	}()
	waitErr := cmd.Wait()
	_ = pw.Close() // unblock the scanner on EOF
	<-scanDone
	if waitErr != nil {
		return fmt.Errorf("docker %v failed: %w", args, waitErr)
	}
	return nil
}

// dockerEnv builds the process environment for a docker invocation: the current
// environment, the auto-resolved DOCKER_HOST (so Colima / $DOCKER_HOST overrides
// work), and the caller-supplied compose variables.
func dockerEnv(env map[string]string) []string {
	out := os.Environ()
	if host := preflight.DockerHost(); host != "" && os.Getenv("DOCKER_HOST") == "" {
		out = append(out, "DOCKER_HOST="+host)
	}
	for k, v := range env {
		out = append(out, k+"="+v)
	}
	return out
}

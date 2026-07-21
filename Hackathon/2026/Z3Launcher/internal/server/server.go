// Package server exposes the control plane over HTTP on 127.0.0.1: a REST API
// for status and lifecycle actions, plus Server-Sent Events streams for live
// telemetry and container logs. SSE (stdlib, no dependency) is used instead of
// WebSocket because the live data flows server -> browser only; control actions
// are REST POSTs.
//
// The server is schema-agnostic: StatusProvider returns an opaque JSON-able
// value (the aggregator's Snapshot in production), so the frozen telemetry
// schema lives in package telemetry, not here.
package server

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"net"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/raycreatives/z3-launcher/internal/installjob"
	"github.com/raycreatives/z3-launcher/internal/logs"
	"github.com/raycreatives/z3-launcher/internal/preflight"
)

// StatusProvider yields the current status payload (any JSON-serializable value).
type StatusProvider interface {
	Status(ctx context.Context) (any, error)
}

// StatusFunc adapts a function to a StatusProvider.
type StatusFunc func(ctx context.Context) (any, error)

// Status implements StatusProvider.
func (f StatusFunc) Status(ctx context.Context) (any, error) { return f(ctx) }

// Controller performs lifecycle actions. Start/Reset may return immediately and
// continue work in the background (the two-phase startup can take a while).
type Controller interface {
	Start(ctx context.Context) error
	Stop(ctx context.Context) error
	Restart(ctx context.Context) error
	Reset(ctx context.Context) error
	// Clear removes leftover containers while keeping all volumes (chain +
	// wallet data). It is the non-destructive fix for stale/exited containers,
	// distinct from the volume-wiping Reset.
	Clear(ctx context.Context) error
}

// LogSource yields a stream of container log output for a service (all if the
// name is empty). Closing the ReadCloser stops the stream.
type LogSource interface {
	Tail(ctx context.Context, service string) (io.ReadCloser, error)
}

// Inspector previews a fast-start snapshot directory (read-only). It backs the
// first-run wizard's "attach pre-synced state" step.
type Inspector interface {
	Inspect(ctx context.Context, path string) (any, error)
}

// InspectFunc adapts a function to an Inspector.
type InspectFunc func(ctx context.Context, path string) (any, error)

// Inspect implements Inspector.
func (f InspectFunc) Inspect(ctx context.Context, path string) (any, error) { return f(ctx, path) }

// Attacher attaches a pre-synced fast-start snapshot to the live stack: it
// validates the path and, if usable, remounts Zebra's cache onto it and
// re-sequences the node. It backs the dashboard's one-click "Attach & Restart".
// It must validate before mutating so a bad path leaves the running stack
// untouched, and may return after kicking off the (asynchronous) re-sequence.
type Attacher interface {
	Attach(ctx context.Context, path string) error
}

// AttachFunc adapts a function to an Attacher.
type AttachFunc func(ctx context.Context, path string) error

// Attach implements Attacher.
func (f AttachFunc) Attach(ctx context.Context, path string) error { return f(ctx, path) }

// PreflightProvider runs the environment checks and returns the resolved
// (post auto-correction) port set. It is the single source of truth for what
// host ports the stack will actually bind (plan §11.1).
type PreflightProvider interface {
	Preflight(ctx context.Context) (preflight.Report, error)
}

// PreflightFunc adapts a function to a PreflightProvider.
type PreflightFunc func(ctx context.Context) (preflight.Report, error)

// Preflight implements PreflightProvider.
func (f PreflightFunc) Preflight(ctx context.Context) (preflight.Report, error) { return f(ctx) }

// DockerInstaller surfaces the platform-specific Docker install plan (read-only)
// for the dashboard's "Install Docker" panel. The actual install runs via the
// streaming InstallRunner below.
type DockerInstaller interface {
	InspectInstaller() any
}

// InstallRunner streams a Docker install, emitting output lines as they happen.
// It is invoked by installjob under a background context, so a client closing
// the SSE stream never aborts a half-finished install. The dashboard button
// click is the user's consent to run it.
type InstallRunner func(ctx context.Context, emit func(line string)) error

// RegtestSeeder drives the regtest scenario seeder: mines blocks and funds
// accounts via the node's JSON-RPC.
type RegtestSeeder interface {
	Ping(ctx context.Context) error
	SeedN(ctx context.Context, n int) (any, any) // (SeedResult, error) but kept loose to avoid import cycle
}

// ClimaxRunner drives the live shielded-action climax (plan Z3-34).
type ClimaxRunner interface {
	Inspect(ctx context.Context) any
	Run(ctx context.Context) any
}

// RuntimeStarter starts the Docker runtime (e.g. Colima on macOS) when it is
// installed but not running. The dashboard's preflight banner shows a "Start
// Docker Runtime" button that triggers this.
type RuntimeStarter func(ctx context.Context, emit func(string)) error

// ZalletToggler enables or disables the optional Zallet service at runtime.
type ZalletToggler interface {
	ZalletEnabled() bool
	EnableZallet(ctx context.Context) error
	DisableZallet(ctx context.Context) error
}

// WalletProxy forwards JSON-RPC calls to the Zallet wallet service. The
// browser cannot reach Zallet directly (Docker network), so the backend acts
// as a proxy.
type WalletProxy interface {
	Call(ctx context.Context, method string, params []any) (json.RawMessage, error)
	CallRaw(ctx context.Context, method string, params json.RawMessage) (json.RawMessage, error)
	Ping(ctx context.Context) error
}

// Server wires the HTTP handlers.
type Server struct {
	status         StatusProvider
	ctrl           Controller
	logs           LogSource
	activity       *logs.Activity
	inspector      Inspector
	attacher       Attacher
	preflight      PreflightProvider
	installer      DockerInstaller
	installJob     *installjob.Job
	installRun     InstallRunner
	runtimeStart   RuntimeStarter
	runtimeJob     *installjob.Job
	seeder         RegtestSeeder
	climax         ClimaxRunner
	zalletToggle   ZalletToggler
	wallet         WalletProxy
	walletSetup    WalletSetup
	static         fs.FS
	mux            *http.ServeMux
	streamInterval time.Duration
	// allowRemote relaxes the loopback CSRF/DNS-rebinding guard when the operator
	// has deliberately bound a non-loopback -addr on a trusted network.
	allowRemote bool
}

// SetAllowRemote relaxes the same-origin guard, for when the operator binds a
// non-loopback address on a network they trust. Default (false) enforces the
// loopback-only protections.
func (s *Server) SetAllowRemote(v bool) { s.allowRemote = v }

// SetInspector enables the read-only fast-start inspect endpoint. Call before
// serving; the route is registered unconditionally and 503s until set.
func (s *Server) SetInspector(i Inspector) { s.inspector = i }

// SetAttacher enables the fast-start "attach" endpoint that remounts the live
// stack onto a pre-synced snapshot. Call before serving; the route is registered
// unconditionally and 503s until set.
func (s *Server) SetAttacher(a Attacher) { s.attacher = a }

// SetStatic enables serving the embedded SPA at /. Call before serving.
func (s *Server) SetStatic(assets fs.FS) { s.static = assets }

// SetPreflight enables the preflight endpoint. Call before serving.
func (s *Server) SetPreflight(p PreflightProvider) { s.preflight = p }

// SetInstaller enables the read-only Docker install-plan endpoint. Call before
// serving.
func (s *Server) SetInstaller(i DockerInstaller) { s.installer = i }

// SetInstallRunner enables the streaming Docker install: POST /api/install-docker
// starts it, GET /api/install-docker/stream watches the live output. Call before
// serving.
func (s *Server) SetInstallRunner(run InstallRunner) { s.installRun = run }

// SetRuntimeStarter enables the streaming Docker runtime start: POST
// /api/start-runtime kicks off e.g. `colima start`, GET /api/start-runtime/stream
// watches the output. Used when Docker is installed but the daemon isn't running.
func (s *Server) SetRuntimeStarter(rs RuntimeStarter) { s.runtimeStart = rs }

// SetSeeder enables the regtest seeder endpoint. Optional — only call when
// the launcher is running against a regtest overlay.
func (s *Server) SetSeeder(r RegtestSeeder) { s.seeder = r }

// SetClimax enables the climax runner endpoint.
func (s *Server) SetClimax(c ClimaxRunner) { s.climax = c }

// SetZalletToggler enables the runtime Zallet toggle endpoint.
func (s *Server) SetZalletToggler(z ZalletToggler) { s.zalletToggle = z }

// SetWallet enables the wallet RPC proxy endpoint.
func (s *Server) SetWallet(w WalletProxy) { s.wallet = w }

// WalletSeed is the one-time backup payload returned after creating a wallet:
// the 24 recovery words (the only thing that restores the funds) and the age
// recipient (public key) of the wallet's encryption identity.
type WalletSeed struct {
	Words     []string `json:"words"`
	Recipient string   `json:"recipient"`
}

// WalletSetup provisions the Zallet wallet — create a new one (returns the seed
// once for backup) or restore from a phrase — and reports whether one exists.
type WalletSetup interface {
	WalletProvisioned() bool
	CreateWallet(ctx context.Context) (WalletSeed, error)
	RestoreWallet(ctx context.Context, phrase string) error
}

// SetWalletSetup enables the wallet create/restore endpoints.
func (s *Server) SetWalletSetup(w WalletSetup) { s.walletSetup = w }

// New builds a Server. logs may be nil to disable the log endpoint. activity
// may be nil to disable the activity feed. A zero streamInterval defaults to 2s.
func New(status StatusProvider, ctrl Controller, logSrc LogSource, activity *logs.Activity, streamInterval time.Duration) *Server {
	if streamInterval <= 0 {
		streamInterval = 2 * time.Second
	}
	s := &Server{
		status:         status,
		ctrl:           ctrl,
		logs:           logSrc,
		activity:       activity,
		installJob:     installjob.New(),
		runtimeJob:     installjob.New(),
		mux:            http.NewServeMux(),
		streamInterval: streamInterval,
	}
	s.routes()
	return s
}

// Handler returns the HTTP handler (useful for tests and embedding), wrapped in
// the same-origin / DNS-rebinding guard.
func (s *Server) Handler() http.Handler { return s.guard(s.mux) }

// guard hardens the loopback control plane against CSRF and DNS-rebinding: a
// malicious page the operator visits must not be able to drive destructive POSTs
// (e.g. /api/reset wipes chain state) or the wallet RPC relay. Mutating requests
// must originate same-origin and the Host must be loopback; all mutating bodies
// are size-capped. When allowRemote is set (explicit non-loopback -addr on a
// trusted network) the origin checks are relaxed but the size cap remains.
func (s *Server) guard(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Only state-changing methods need CSRF protection; GET reads (status,
		// SSE, static) are served unguarded so the dashboard and tooling work.
		switch r.Method {
		case http.MethodPost, http.MethodPut, http.MethodPatch, http.MethodDelete:
		default:
			next.ServeHTTP(w, r)
			return
		}
		r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
		if !s.allowRemote {
			// Anti-DNS-rebinding: a destructive request must arrive on a loopback
			// Host and (if the header is present) from a same-origin context.
			if !hostIsLoopback(r.Host) {
				http.Error(w, "forbidden: non-loopback Host header", http.StatusForbidden)
				return
			}
			if o := r.Header.Get("Origin"); o != "" && !originIsLoopback(o) {
				http.Error(w, "forbidden: cross-origin request", http.StatusForbidden)
				return
			}
			if sfs := r.Header.Get("Sec-Fetch-Site"); sfs != "" && sfs != "same-origin" && sfs != "none" {
				http.Error(w, "forbidden: cross-site request", http.StatusForbidden)
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}

// hostIsLoopback reports whether an HTTP Host header refers to the loopback
// interface (localhost / 127.0.0.0/8 / ::1), defeating DNS-rebinding where a
// remote name resolves to 127.0.0.1.
func hostIsLoopback(host string) bool {
	h := host
	if hh, _, err := net.SplitHostPort(host); err == nil {
		h = hh
	}
	h = strings.TrimSuffix(strings.TrimPrefix(h, "["), "]")
	if h == "localhost" {
		return true
	}
	ip := net.ParseIP(h)
	return ip != nil && ip.IsLoopback()
}

func originIsLoopback(origin string) bool {
	u, err := url.Parse(origin)
	if err != nil {
		return false
	}
	return hostIsLoopback(u.Host)
}

func (s *Server) routes() {
	s.mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})
	s.mux.HandleFunc("GET /api/status", s.handleStatus)
	s.mux.HandleFunc("GET /api/stream", s.handleStream)
	s.mux.HandleFunc("GET /api/logs", s.handleLogs)
	s.mux.HandleFunc("GET /api/faststart/inspect", s.handleInspect)
	s.mux.HandleFunc("POST /api/faststart/attach", s.handleAttach)
	s.mux.HandleFunc("GET /api/preflight", s.handlePreflight)
	s.mux.HandleFunc("GET /api/install-docker", s.handleInstallInspect)
	s.mux.HandleFunc("POST /api/install-docker", s.handleInstallStart)
	s.mux.HandleFunc("GET /api/install-docker/stream", s.handleInstallStream)
	s.mux.HandleFunc("POST /api/start-runtime", s.handleRuntimeStart)
	s.mux.HandleFunc("GET /api/start-runtime/stream", s.handleRuntimeStream)
	s.mux.HandleFunc("GET /api/regtest/status", s.handleRegtestStatus)
	s.mux.HandleFunc("POST /api/regtest/seed", s.handleRegtestSeed)
	s.mux.HandleFunc("GET /api/climax/status", s.handleClimaxStatus)
	s.mux.HandleFunc("POST /api/climax", s.handleClimaxRun)
	s.mux.HandleFunc("GET /api/zallet/status", s.handleZalletStatus)
	s.mux.HandleFunc("POST /api/zallet/toggle", s.handleZalletToggle)
	s.mux.HandleFunc("GET /api/wallet/status", s.handleWalletStatus)
	s.mux.HandleFunc("POST /api/wallet/rpc", s.handleWalletRPC)
	s.mux.HandleFunc("POST /api/wallet/create", s.handleWalletCreate)
	s.mux.HandleFunc("POST /api/wallet/restore", s.handleWalletRestore)
	s.mux.HandleFunc("POST /api/start", s.action(func(ctx context.Context) error { return s.ctrl.Start(ctx) }))
	s.mux.HandleFunc("POST /api/stop", s.action(func(ctx context.Context) error { return s.ctrl.Stop(ctx) }))
	s.mux.HandleFunc("POST /api/restart", s.action(func(ctx context.Context) error { return s.ctrl.Restart(ctx) }))
	s.mux.HandleFunc("POST /api/clear", s.action(func(ctx context.Context) error { return s.ctrl.Clear(ctx) }))
	s.mux.HandleFunc("POST /api/reset", s.handleReset)

	// Catch-all: serve the embedded SPA. More specific /api and /healthz
	// patterns take precedence under Go 1.22+ ServeMux precedence rules.
	s.mux.HandleFunc("GET /", s.handleStatic)
}

func (s *Server) handleStatic(w http.ResponseWriter, r *http.Request) {
	if s.static == nil {
		writeJSON(w, http.StatusOK, map[string]string{
			"message": "Z3 Launcher API is running; build the web UI (make web) to serve the dashboard.",
		})
		return
	}
	http.FileServerFS(s.static).ServeHTTP(w, r)
}

func writeJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(v)
}

func (s *Server) handleStatus(w http.ResponseWriter, r *http.Request) {
	st, err := s.status.Status(r.Context())
	if err != nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, st)
}

// action wraps a lifecycle function into a handler that returns 202 Accepted on
// success or 500 with the error message on failure.
func (s *Server) action(fn func(ctx context.Context) error) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if s.ctrl == nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "no controller"})
			return
		}
		if err := fn(r.Context()); err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		writeJSON(w, http.StatusAccepted, map[string]string{"status": "accepted"})
	}
}

func sseHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
}

func (s *Server) handleStream(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	sseHeaders(w)

	_ = flusher
	ctx := r.Context()
	if s.writeStatusEvent(ctx, w) != nil { // initial event immediately
		return
	}

	t := time.NewTicker(s.streamInterval)
	defer t.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			// A write error (incl. a fired write deadline on a stalled client)
			// breaks the loop so the deferred cleanup runs and the connection is
			// released, instead of blocking on Flush forever and leaking the
			// goroutine while still paying for Collect every tick.
			if s.writeStatusEvent(ctx, w) != nil {
				return
			}
		}
	}
}

func (s *Server) writeStatusEvent(ctx context.Context, w http.ResponseWriter) error {
	rc := http.NewResponseController(w)
	_ = rc.SetWriteDeadline(time.Now().Add(10 * time.Second))
	st, err := s.status.Status(ctx)
	if err != nil {
		if _, werr := fmt.Fprintf(w, "event: error\ndata: %q\n\n", err.Error()); werr != nil {
			return werr
		}
		return rc.Flush()
	}
	b, _ := json.Marshal(st)
	if _, werr := fmt.Fprintf(w, "event: status\ndata: %s\n\n", b); werr != nil {
		return werr
	}
	return rc.Flush()
}

func (s *Server) handleInspect(w http.ResponseWriter, r *http.Request) {
	if s.inspector == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "fast-start inspect unavailable"})
		return
	}
	path := r.URL.Query().Get("path")
	if path == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "path query parameter required"})
		return
	}
	res, err := s.inspector.Inspect(r.Context(), path)
	if err != nil {
		writeJSON(w, http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, res)
}

// handleAttach remounts the live stack onto a pre-synced snapshot: it validates
// the posted path and, if usable, kicks off the (asynchronous) re-sequence onto
// it. The dashboard then watches the normal status stream show Zebra go
// "starting" → "ready" on the new state. Validation failures are 4xx and leave
// the running stack untouched.
func (s *Server) handleAttach(w http.ResponseWriter, r *http.Request) {
	if s.attacher == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "fast-start attach unavailable"})
		return
	}
	var body struct {
		Path string `json:"path"`
	}
	_ = json.NewDecoder(io.LimitReader(r.Body, 1<<16)).Decode(&body)
	if strings.TrimSpace(body.Path) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "path is required"})
		return
	}
	if err := s.attacher.Attach(r.Context(), body.Path); err != nil {
		// Inspect/validate errors mean the data won't work — a client problem.
		writeJSON(w, http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusAccepted, map[string]string{"status": "attaching"})
}

func (s *Server) handleLogs(w http.ResponseWriter, r *http.Request) {
	if _, ok := w.(http.Flusher); !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}

	service := r.URL.Query().Get("service")
	sseHeaders(w)

	// A write failure (incl. a fired write deadline on a stalled client) cancels
	// ctx so the underlying Stream returns instead of looping forever on a dead
	// connection — bounding the goroutine/connection leak to one write timeout.
	ctx, cancel := context.WithCancel(r.Context())
	defer cancel()
	respCtl := http.NewResponseController(w)
	emitLine := func(line string) {
		_ = respCtl.SetWriteDeadline(time.Now().Add(10 * time.Second))
		b, _ := json.Marshal(map[string]string{"service": service, "line": line})
		if _, err := fmt.Fprintf(w, "event: log\ndata: %s\n\n", b); err != nil {
			cancel()
			return
		}
		if err := respCtl.Flush(); err != nil {
			cancel()
		}
	}

	// When an activity feed is available, stream from it. The activity feed
	// merges lifecycle command output (docker compose up/down/stop/restart)
	// with container logs, so the dashboard shows the full picture: image
	// pulls, container creation, errors, and running container output.
	if s.activity != nil {
		s.activity.Stream(ctx, emitLine)
		return
	}

	// Fallback: stream container logs only (no lifecycle output).
	if s.logs == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "logs unavailable"})
		return
	}
	tail, err := s.logs.Tail(ctx, service)
	if err != nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": err.Error()})
		return
	}
	defer tail.Close()
	_ = logs.Stream(ctx, tail, emitLine)
}

// handlePreflight runs the environment checks and returns the report. The
// resolved port set is the single source of truth for what the stack will
// bind (plan §11.1).
func (s *Server) handlePreflight(w http.ResponseWriter, r *http.Request) {
	if s.preflight == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "preflight unavailable"})
		return
	}
	rep, err := s.preflight.Preflight(r.Context())
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, rep)
}

// handleInstallInspect returns the install plan for the current platform.
// The dashboard's "Install Docker for me" button shows the command before
// asking for confirmation.
func (s *Server) handleInstallInspect(w http.ResponseWriter, _ *http.Request) {
	if s.installer == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "installer unavailable"})
		return
	}
	writeJSON(w, http.StatusOK, s.installer.InspectInstaller())
}

// handleInstallStart kicks off the streaming Docker install. The POST itself is
// the user's consent (they clicked "Install Docker"). It returns immediately;
// the client then opens the stream to watch progress. Single-flight: a second
// start while one is running is a no-op (started:false) — the client just
// watches the existing run.
func (s *Server) handleInstallStart(w http.ResponseWriter, _ *http.Request) {
	if s.installRun == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "installer unavailable"})
		return
	}
	started := s.installJob.Start(func(ctx context.Context, emit func(string)) error {
		return s.installRun(ctx, emit)
	})
	state, _, _ := s.installJob.Status()
	writeJSON(w, http.StatusAccepted, map[string]any{"started": started, "state": string(state)})
}

// handleInstallStream is the SSE feed of install output: it replays everything
// buffered so far, streams live lines, and ends with a terminal "done" event
// carrying the final state and any error.
func (s *Server) handleInstallStream(w http.ResponseWriter, r *http.Request) {
	if s.installRun == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "installer unavailable"})
		return
	}
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	sseHeaders(w)

	sub := s.installJob.Subscribe()
	defer sub.Cancel()

	writeLog := func(line string) {
		b, _ := json.Marshal(map[string]string{"line": line})
		fmt.Fprintf(w, "event: log\ndata: %s\n\n", b)
		flusher.Flush()
	}
	for _, l := range sub.Replay {
		writeLog(l)
	}

	finish := func() {
		// drain any lines buffered between the last read and termination
		for {
			select {
			case l := <-sub.Lines:
				writeLog(l)
			default:
				state, _, errMsg := s.installJob.Status()
				b, _ := json.Marshal(map[string]string{"state": string(state), "error": errMsg})
				fmt.Fprintf(w, "event: done\ndata: %s\n\n", b)
				flusher.Flush()
				return
			}
		}
	}

	for {
		select {
		case <-r.Context().Done():
			return
		case l := <-sub.Lines:
			writeLog(l)
		case <-sub.Done:
			finish()
			return
		}
	}
}

// handleRuntimeStart kicks off the Docker runtime (e.g. `colima start`). The
// POST is the user's consent. Same single-flight pattern as install-docker.
func (s *Server) handleRuntimeStart(w http.ResponseWriter, _ *http.Request) {
	if s.runtimeStart == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "runtime starter unavailable"})
		return
	}
	started := s.runtimeJob.Start(func(ctx context.Context, emit func(string)) error {
		return s.runtimeStart(ctx, emit)
	})
	state, _, _ := s.runtimeJob.Status()
	writeJSON(w, http.StatusAccepted, map[string]any{"started": started, "state": string(state)})
}

// handleRuntimeStream is the SSE feed of runtime-start output: replay + live
// lines + terminal done event. Mirrors handleInstallStream.
func (s *Server) handleRuntimeStream(w http.ResponseWriter, r *http.Request) {
	if s.runtimeStart == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "runtime starter unavailable"})
		return
	}
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	sseHeaders(w)

	sub := s.runtimeJob.Subscribe()
	defer sub.Cancel()

	writeLog := func(line string) {
		b, _ := json.Marshal(map[string]string{"line": line})
		fmt.Fprintf(w, "event: log\ndata: %s\n\n", b)
		flusher.Flush()
	}
	for _, l := range sub.Replay {
		writeLog(l)
	}

	finish := func() {
		for {
			select {
			case l := <-sub.Lines:
				writeLog(l)
			default:
				state, _, errMsg := s.runtimeJob.Status()
				b, _ := json.Marshal(map[string]string{"state": string(state), "error": errMsg})
				fmt.Fprintf(w, "event: done\ndata: %s\n\n", b)
				flusher.Flush()
				return
			}
		}
	}

	for {
		select {
		case <-r.Context().Done():
			return
		case l := <-sub.Lines:
			writeLog(l)
		case <-sub.Done:
			finish()
			return
		}
	}
}

// handleRegtestStatus reports whether the regtest zcashd is reachable. The
// seeder is only meaningful on regtest; on mainnet/testnet the endpoint
// returns 503.
func (s *Server) handleRegtestStatus(w http.ResponseWriter, r *http.Request) {
	if s.seeder == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "regtest seeder not configured"})
		return
	}
	err := s.seeder.Ping(r.Context())
	if err != nil {
		writeJSON(w, http.StatusOK, map[string]any{"reachable": false, "error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"reachable": true})
}

// handleRegtestSeed mines blocks via the node's generate RPC. Accepts an
// optional JSON body {"blocks": N} to control how many blocks to mine;
// defaults to DefaultMineCount (110) when omitted.
func (s *Server) handleRegtestSeed(w http.ResponseWriter, r *http.Request) {
	if s.seeder == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "regtest seeder not configured"})
		return
	}
	var body struct {
		Blocks int `json:"blocks"`
	}
	// Ignore decode errors — body is optional; blocks defaults to 0 which
	// SeedN treats as DefaultMineCount.
	_ = json.NewDecoder(io.LimitReader(r.Body, 1<<16)).Decode(&body)
	if body.Blocks < 0 || body.Blocks > 10000 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "blocks must be between 0 and 10000"})
		return
	}
	// Detach from the request context: a client disconnect (tab close, proxy
	// timeout) must not SIGKILL an in-flight mine and leave a partial chain.
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Minute)
	defer cancel()
	res, err := s.seeder.SeedN(ctx, body.Blocks)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]any{"result": res, "error": errString(err)})
		return
	}
	writeJSON(w, http.StatusOK, res)
}

// errString coerces the loose-typed error slot (any) returned by the seeder
// adapter into a printable string. The server is decoupled from the regtest
// package's concrete error type, so it can't call .Error() directly.
func errString(e any) string {
	if e == nil {
		return ""
	}
	if s, ok := e.(string); ok {
		return s
	}
	if err, ok := e.(error); ok {
		return err.Error()
	}
	return fmt.Sprintf("%v", e)
}

// handleClimaxStatus reports the climax readiness (wallet binary, Zaino
// reachable). The dashboard uses this to enable/disable the "Run the demo"
// button.
func (s *Server) handleClimaxStatus(w http.ResponseWriter, r *http.Request) {
	if s.climax == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "climax runner not configured"})
		return
	}
	writeJSON(w, http.StatusOK, s.climax.Inspect(r.Context()))
}

// handleClimaxRun performs the live shielded action. Always returns a
// Result with a Mode that explains the outcome (shielded-action | fallback |
// no-wallet); the demo never hard-fails.
func (s *Server) handleClimaxRun(w http.ResponseWriter, r *http.Request) {
	if s.climax == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "climax runner not configured"})
		return
	}
	writeJSON(w, http.StatusOK, s.climax.Run(r.Context()))
}

// handleZalletStatus returns whether Zallet is enabled and running.
func (s *Server) handleZalletStatus(w http.ResponseWriter, _ *http.Request) {
	if s.zalletToggle == nil {
		writeJSON(w, http.StatusOK, map[string]any{"enabled": false, "available": false})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"enabled":   s.zalletToggle.ZalletEnabled(),
		"available": true,
	})
}

// handleZalletToggle enables or disables Zallet at runtime.
func (s *Server) handleZalletToggle(w http.ResponseWriter, r *http.Request) {
	if s.zalletToggle == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "zallet toggle not available"})
		return
	}
	var body struct {
		Enabled bool `json:"enabled"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}
	var err error
	if body.Enabled {
		err = s.zalletToggle.EnableZallet(r.Context())
	} else {
		err = s.zalletToggle.DisableZallet(r.Context())
	}
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"enabled": body.Enabled})
}

// handleWalletStatus reports whether the Zallet RPC is reachable and whether a
// wallet has been provisioned (so the dashboard knows to show the create/restore
// setup prompt vs the live wallet).
func (s *Server) handleWalletStatus(w http.ResponseWriter, r *http.Request) {
	provisioned := s.walletSetup != nil && s.walletSetup.WalletProvisioned()
	if s.wallet == nil {
		writeJSON(w, http.StatusOK, map[string]any{"reachable": false, "provisioned": provisioned, "message": "wallet proxy not configured"})
		return
	}
	if err := s.wallet.Ping(r.Context()); err != nil {
		writeJSON(w, http.StatusOK, map[string]any{"reachable": false, "provisioned": provisioned, "message": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"reachable": true, "provisioned": provisioned})
}

// handleWalletCreate provisions a new wallet and returns its 24 recovery words
// ONCE for backup. The words are never returned again. Runs on a detached
// context so a client disconnect can't abort provisioning mid-import.
func (s *Server) handleWalletCreate(w http.ResponseWriter, _ *http.Request) {
	if s.walletSetup == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "wallet setup not configured"})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()
	seed, err := s.walletSetup.CreateWallet(ctx)
	if err != nil {
		writeJSON(w, http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, seed)
}

// handleWalletRestore imports a user-supplied recovery phrase. The phrase is
// validated and never logged.
func (s *Server) handleWalletRestore(w http.ResponseWriter, r *http.Request) {
	if s.walletSetup == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "wallet setup not configured"})
		return
	}
	var body struct {
		Phrase string `json:"phrase"`
	}
	if err := json.NewDecoder(io.LimitReader(r.Body, 1<<16)).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()
	if err := s.walletSetup.RestoreWallet(ctx, body.Phrase); err != nil {
		writeJSON(w, http.StatusUnprocessableEntity, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "restored"})
}

// handleReset guards the destructive Reset (down -v wipes the wallet AND chain
// state) behind an explicit typed confirmation, so a stray click — or a request
// that slips past the CSRF guard — can't silently destroy a wallet.
func (s *Server) handleReset(w http.ResponseWriter, r *http.Request) {
	if s.ctrl == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "no controller"})
		return
	}
	var body struct {
		Confirm string `json:"confirm"`
	}
	_ = json.NewDecoder(io.LimitReader(r.Body, 1<<16)).Decode(&body)
	if body.Confirm != "RESET" {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": `reset is destructive: it deletes the wallet and all chain state. Back up your seed first, then send {"confirm":"RESET"}.`,
		})
		return
	}
	if err := s.ctrl.Reset(r.Context()); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	writeJSON(w, http.StatusAccepted, map[string]string{"status": "accepted"})
}

// handleWalletRPC is the generic JSON-RPC proxy to Zallet. The frontend sends
// {"method":"...", "params":...} and gets back the raw RPC result. Params can
// be an array (positional) or an object (named) — Zallet uses named params
// for some methods like z_getnewaccount.
func (s *Server) handleWalletRPC(w http.ResponseWriter, r *http.Request) {
	if s.wallet == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "wallet proxy not configured"})
		return
	}
	// Require a JSON content type. A cross-site "simple request" cannot set this
	// header without triggering a CORS preflight (which the same-origin guard
	// blocks), so this defends the wallet relay even if the guard is bypassed.
	if ct := r.Header.Get("Content-Type"); !strings.HasPrefix(ct, "application/json") {
		writeJSON(w, http.StatusUnsupportedMediaType, map[string]string{"error": "Content-Type must be application/json"})
		return
	}
	var raw json.RawMessage
	if err := json.NewDecoder(r.Body).Decode(&raw); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}
	var req struct {
		Method string          `json:"method"`
		Params json.RawMessage `json:"params"`
	}
	if err := json.Unmarshal(raw, &req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}
	if req.Method == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "method is required"})
		return
	}
	result, err := s.wallet.CallRaw(r.Context(), req.Method, req.Params)
	if err != nil {
		writeJSON(w, http.StatusOK, map[string]any{"result": nil, "error": map[string]string{"message": err.Error()}})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"result": json.RawMessage(result)})
}

// Command z3launcher is the one-command control plane for a local Z3 (Zebra +
// Zaino [+ Zallet]) Zcash backend.
//
// Goal: zero to a working, wallet-usable Zcash backend in one command — in
// minutes, not days. This phase wires configuration, the two-phase startup
// orchestration, and a REST + SSE control-plane server. The dashboard and
// fast-start arrive in later phases.
package main

import (
	"bufio"
	"context"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"strings"
	"sync"
	"sync/atomic"
	"syscall"
	"time"

	"github.com/raycreatives/z3-launcher/internal/aggregator"
	"github.com/raycreatives/z3-launcher/internal/climax"
	"github.com/raycreatives/z3-launcher/internal/compose"
	"github.com/raycreatives/z3-launcher/internal/config"
	"github.com/raycreatives/z3-launcher/internal/disk"
	"github.com/raycreatives/z3-launcher/internal/dockerinstall"
	"github.com/raycreatives/z3-launcher/internal/faststart"
	"github.com/raycreatives/z3-launcher/internal/launcher"
	"github.com/raycreatives/z3-launcher/internal/logs"
	"github.com/raycreatives/z3-launcher/internal/preflight"
	"github.com/raycreatives/z3-launcher/internal/regtest"
	"github.com/raycreatives/z3-launcher/internal/server"
	"github.com/raycreatives/z3-launcher/internal/zaino"
	"github.com/raycreatives/z3-launcher/internal/zallet"
	"github.com/raycreatives/z3-launcher/internal/wallet"
	"github.com/raycreatives/z3-launcher/internal/zebra"
	"github.com/raycreatives/z3-launcher/web"
)

type options struct {
	network         string
	dataDir         string
	composeFile     string
	regtestCompose  string
	addr            string
	faststart       string
	zebraStateMajor int
	up              bool
	serve           bool
	withZallet      bool
	installDocker   bool
	preflightOnly   bool
	noPreflight     bool
}

func main() {
	var opts options
	flag.StringVar(&opts.network, "network", "mainnet", "zcash network: mainnet, testnet, or regtest")
	flag.StringVar(&opts.dataDir, "data-dir", "", "host directory for chain state (default ~/.z3-launcher/data)")
	flag.StringVar(&opts.composeFile, "compose-file", "deploy/compose/docker-compose.yml", "path to the vendored z3 compose file")
	flag.StringVar(&opts.regtestCompose, "regtest-compose-file", "deploy/compose/docker-compose.regtest.yml", "regtest overlay compose file (adds rpc-router + zcashd)")
	flag.StringVar(&opts.addr, "addr", "127.0.0.1:8088", "control-plane listen address (127.0.0.1 only)")
	flag.StringVar(&opts.faststart, "faststart", "", "attach a pre-synced Zebra state dir (path to a cache root) to skip the cold sync")
	flag.IntVar(&opts.zebraStateMajor, "zebra-state-major", 0, "expected Zebra DB-format major version for fast-start validation (0 = unknown)")
	flag.BoolVar(&opts.up, "up", false, "start Zebra (the first stage of stack startup) and exit")
	flag.BoolVar(&opts.serve, "serve", false, "run the control-plane HTTP server")
	flag.BoolVar(&opts.withZallet, "with-zallet", false, "enable the optional Zallet RPC service (alpha; gated so failures never block the core flow)")
	flag.BoolVar(&opts.installDocker, "install-docker", false, "consent-gated: install Docker for the current platform (Linux: sudo; mac/Windows: refuses, shows manual guide)")
	flag.BoolVar(&opts.preflightOnly, "preflight", false, "run the preflight checks and exit")
	flag.BoolVar(&opts.noPreflight, "no-preflight", false, "skip preflight at startup (port auto-correction and Docker check)")
	flag.Parse()

	if err := run(opts); err != nil {
		log.Fatalf("z3launcher: %v", err)
	}
}

func run(opts options) error {
	cfg, err := resolveConfig(opts)
	if err != nil {
		return err
	}

	// Handle -install-docker before anything else: it's a top-level CLI action
	// that runs once and exits. It never silently escalates to root (plan
	// §11.2): macOS/Windows refuse and show the manual guide; Linux asks for
	// explicit y/N before invoking sudo.
	if opts.installDocker {
		return runInstallDocker()
	}

	// -preflight prints the preflight report and exits. Useful for
	// diagnostics and for CI to verify the host is ready.
	if opts.preflightOnly {
		return runPreflightOnly(cfg)
	}

	if opts.faststart != "" {
		if err := applyFastStart(&cfg, opts.faststart); err != nil {
			return err
		}
	}

	// Preflight runs by default (port auto-correction, Docker check,
	// low-disk warning). It mutates cfg.Ports to the resolved set when ports
	// are remapped; the dashboard and the spawned compose process both read
	// from cfg.Ports so the banner and the endpoints never disagree.
	if !opts.noPreflight {
		rep, err := runPreflight(&cfg)
		if err != nil {
			return err
		}
		if !rep.OK && !opts.serve {
			// Hard fail only when NOT in serve mode: Docker missing kills a
			// headless -up run. In -serve mode, the dashboard starts anyway so
			// the user can see the preflight status and install/start Docker
			// from the UI.
			for _, ch := range rep.Checks {
				if ch.Status == preflight.Fail {
					return fmt.Errorf("preflight failed: %s — %s", ch.Name, ch.Message)
				}
			}
		}
	}

	printEndpoints(cfg)

	composeFile := cfg.ComposeFile(opts.composeFile)
	c := compose.New(cfg.ProjectName, composeFile, cfg.EnvMap(), compose.NewExecRunner())
	// Every profile the project defines, so a teardown (down -v) removes the
	// profile-gated zallet + regtest-overlay services and frees their volumes.
	c.AllProfiles = []string{"zallet", "regtest"}
	zc := zebra.New(fmt.Sprintf("http://127.0.0.1:%d", cfg.Ports.ZebraRPC))
	stack := &launcher.Stack{
		Compose:      c,
		Ready:        zebraReadiness(zc),
		PollInterval: 5 * time.Second,
	}
	stack.WithZallet.Store(cfg.WithZallet)
	// Host marker proving the Zallet wallet was fully provisioned (keystore +
	// seed), namespaced per project so networks don't share it.
	stack.WalletMarker = filepath.Join(cfg.DataDir, ".zallet-provisioned-"+cfg.ProjectName)
	stack.IdentityFile = cfg.ZalletIdentityFile
	// Before a *provisioned* zallet starts, require its identity file to exist
	// (never regenerate — that would brick the encrypted wallet).
	stack.RequireIdentity = func() error { return wallet.IdentityUsable(cfg.ZalletIdentityFile) }

	switch {
	case opts.serve:
		return serve(opts.addr, cfg, zc, c, stack, repFromLast())
	case opts.up:
		// `up -d` returns as soon as the container starts; the time is dominated
		// by the one-time Zebra image pull on a first run, which over a slow link
		// can take many minutes. A tight cap would SIGKILL the pull mid-download,
		// so the budget is generous.
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Minute)
		defer cancel()
		fmt.Println("\nstarting Zebra (first run pulls the image; this can take several minutes) ...")
		if err := stack.StartZebra(ctx); err != nil {
			if ctx.Err() == context.DeadlineExceeded {
				return fmt.Errorf("timed out starting Zebra (still pulling the image on a slow link?): %w", err)
			}
			return err
		}
		fmt.Printf("Zebra starting. Watch http://127.0.0.1:%d/ready\n", cfg.Ports.ZebraHealth)
		return nil
	default:
		fmt.Println("\n(dry run — pass -serve to run the control plane, or -up to start Zebra)")
		return nil
	}
}

func resolveConfig(opts options) (config.Config, error) {
	net, err := config.ParseNetwork(opts.network)
	if err != nil {
		return config.Config{}, err
	}
	dataDir := opts.dataDir
	if dataDir == "" {
		dataDir, err = config.DefaultDataDir()
		if err != nil {
			return config.Config{}, err
		}
	}
	// Make the data dir absolute. Docker resolves a relative bind-mount source
	// against the compose-file directory, not the launcher's cwd — so a relative
	// -data-dir would create the identity in one place and mount it from another
	// (EISDIR / an undecryptable wallet).
	if abs, aerr := filepath.Abs(dataDir); aerr == nil {
		dataDir = abs
	}
	cfg := config.Default(dataDir)
	// Honor the documented per-image overrides. EnvMap re-exports cfg.Images and
	// exec dedups last, so an operator-set *_IMAGE in the environment would
	// otherwise be silently overridden by the pinned default — e.g. you couldn't
	// apply a security-patched node image without editing the source.
	for env, dst := range map[string]*string{
		"ZEBRA_IMAGE": &cfg.Images.Zebra, "ZAINO_IMAGE": &cfg.Images.Zaino,
		"ZALLET_IMAGE": &cfg.Images.Zallet, "ZCASHD_IMAGE": &cfg.Images.Zcashd,
	} {
		if v := os.Getenv(env); v != "" {
			*dst = v
		}
	}
	cfg.Network = net
	// Namespace the compose project per network so volumes/containers are
	// isolated — a Reset on one network can't wipe another's chain state.
	cfg.ProjectName = net.ProjectName()
	// Per-user Zallet encryption identity lives under the (gitignored) data dir,
	// namespaced per network — never the repo's committed placeholder key.
	cfg.ZalletIdentityFile = filepath.Join(dataDir, "zallet-identity-"+cfg.ProjectName+".txt")
	cfg.ZebraStateMajor = opts.zebraStateMajor
	cfg.WithZallet = opts.withZallet
	// The regtest compose overlay is opt-in: only set it if the file exists
	// (a vendored regtest overlay ships with the project; an absent one is
	// treated as "no regtest overlay available, use the default compose").
	if opts.regtestCompose != "" {
		if _, err := os.Stat(opts.regtestCompose); err == nil {
			cfg.RegtestComposeFile = opts.regtestCompose
		}
	}
	if err := cfg.Validate(); err != nil {
		return config.Config{}, err
	}
	return cfg, nil
}

// lastPreflightReport carries the most recent preflight result between phases
// of run(), so serve() can reuse it without re-running the checks. It is
// nil if preflight was skipped.
var lastPreflightReport *preflight.Report

func repFromLast() *preflight.Report { return lastPreflightReport }

// runPreflight executes the preflight checks against the current cfg and
// mutates cfg.Ports to the resolved (post auto-correction) set. The returned
// report is stashed in lastPreflightReport so serve() can reuse it.
func runPreflight(cfg *config.Config) (preflight.Report, error) {
	rep, err := preflight.New(*cfg).Run(context.Background(), preflight.FromConfig(cfg.Ports))
	if err != nil {
		return rep, err
	}
	// Apply resolved ports back to the config so everything downstream
	// (compose env, endpoint panel, zebra client) sees the same numbers. cfg is
	// a pointer so this write-through is visible to the caller — without it the
	// banner would advertise the bumped port while compose binds the busy one.
	cfg.Ports = rep.Resolved.ToConfig()
	lastPreflightReport = &rep
	printPreflightSummary(rep)
	return rep, nil
}

func runPreflightOnly(cfg config.Config) error {
	rep, err := preflight.New(cfg).Run(context.Background(), preflight.FromConfig(cfg.Ports))
	if err != nil {
		return err
	}
	printPreflightSummary(rep)
	if !rep.OK {
		return fmt.Errorf("preflight failed")
	}
	return nil
}

func printPreflightSummary(rep preflight.Report) {
	for _, ch := range rep.Checks {
		switch ch.Status {
		case preflight.OK:
			fmt.Printf("  ok    %s: %s\n", ch.Name, ch.Message)
		case preflight.Fixed:
			fmt.Printf("  fixed %s: %s\n", ch.Name, ch.Message)
		case preflight.Warn:
			fmt.Printf("  warn  %s: %s\n", ch.Name, ch.Message)
		case preflight.Fail:
			fmt.Printf("  FAIL  %s: %s\n", ch.Name, ch.Message)
		}
	}
}

// runInstallDocker is the consent-gated Docker installer (plan §11.2). The
// Confirm hook prints the command and waits for y/N; refusing exits cleanly
// without running anything.
func runInstallDocker() error {
	ins := preflight.NewInstaller()
	ins.Confirm = func(p dockerinstall.Plan) bool {
		fmt.Println()
		fmt.Println("z3launcher is about to install Docker.")
		fmt.Printf("  platform:  %s\n", p.OS)
		fmt.Printf("  method:    %s\n", p.Method)
		fmt.Printf("  command:   %s\n", p.Command)
		if p.Elevated {
			fmt.Println("  elevation: requires root / sudo")
		}
		if p.Note != "" {
			fmt.Printf("  note:      %s\n", p.Note)
		}
		fmt.Print("\nProceed? [y/N] ")
		reader := bufio.NewReader(os.Stdin)
		line, err := reader.ReadString('\n')
		if err != nil && err.Error() != "EOF" {
			fmt.Fprintf(os.Stderr, "read error: %v\n", err)
			return false
		}
		line = strings.TrimSpace(strings.ToLower(line))
		return line == "y" || line == "yes"
	}
	res, err := ins.Apply(context.Background())
	fmt.Printf("install-docker: %s\n", res.Message)
	return err
}

// applyFastStart inspects and validates a pre-synced snapshot and, if usable,
// points the Zebra cache mount at it so the stack reaches ready in minutes.
func applyFastStart(cfg *config.Config, source string) error {
	info, err := faststart.Inspect(source, cfg.Network.String())
	if err != nil {
		return fmt.Errorf("fast-start: %w", err)
	}
	res := faststart.Validate(info, cfg.ZebraStateMajor)
	fmt.Printf("fast-start: %s\n", res.Message)
	if !res.Usable {
		return fmt.Errorf("fast-start: snapshot not usable (%s); omit -faststart to cold-sync instead", info.FullVersion())
	}
	cfg.ZebraCacheDir = info.CacheRoot
	cfg.FastStartAttached = true
	fmt.Printf("fast-start: attaching %s state from %s\n", info.FullVersion(), info.CacheRoot)
	return nil
}

func printEndpoints(cfg config.Config) {
	fmt.Printf("z3launcher — network=%s data-dir=%s\n", cfg.Network, cfg.DataDir)
	fmt.Println("endpoints (once ready):")
	fmt.Printf("  Zebra   JSON-RPC  http://127.0.0.1:%d\n", cfg.Ports.ZebraRPC)
	fmt.Printf("  Zebra   health    http://127.0.0.1:%d/ready\n", cfg.Ports.ZebraHealth)
	fmt.Printf("  Zaino   gRPC      127.0.0.1:%d  (point a lightwallet here)\n", cfg.Ports.ZainoGRPC)
	fmt.Printf("  Zaino   JSON-RPC  http://127.0.0.1:%d\n", cfg.Ports.ZainoJSONRPC)
}

// zebraReadiness adapts the Zebra client into a launcher.ReadinessFunc. A probe
// error (connection refused, timeout, HTTP non-2xx) is surfaced so WaitReady can
// fail fast once a node proves persistently unreachable; a reachable-but-syncing
// node returns (false, nil) and is waited on indefinitely.
func zebraReadiness(zc *zebra.Client) launcher.ReadinessFunc {
	return func(ctx context.Context) (bool, error) {
		bi, err := zc.GetBlockchainInfo(ctx)
		if err != nil {
			return false, err
		}
		return bi.Ready(), nil
	}
}

// reconcileWalletState clears a stale provisioned-marker (and the orphaned
// encryption identity) at startup when the wallet's zallet-data volume is gone —
// e.g. the user ran `docker volume rm` or `down -v` out of band. Without this,
// WalletProvisioned() would keep reporting true and the next start would bring up
// a seedless, crash-looping zallet. Best-effort: if Docker is unreachable we
// can't tell, so we leave the marker untouched.
func reconcileWalletState(cfg config.Config, c *compose.Compose, stack *launcher.Stack) {
	if !stack.WalletProvisioned() {
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	exists, err := c.WalletVolumeExists(ctx)
	if err != nil {
		return // Docker unavailable — can't determine; don't touch the marker
	}
	if !exists {
		log.Printf("wallet marker present but the %s_zallet-data volume is gone — clearing stale wallet state", cfg.ProjectName)
		if stack.WalletMarker != "" {
			_ = os.Remove(stack.WalletMarker)
		}
		if cfg.ZalletIdentityFile != "" {
			_ = os.RemoveAll(cfg.ZalletIdentityFile)
		}
	}
}

func serve(addr string, cfg config.Config, zc *zebra.Client, c *compose.Compose, stack *launcher.Stack, preflightReport *preflight.Report) error {
	reconcileWalletState(cfg, c, stack)
	zn := zaino.New(
		fmt.Sprintf("http://127.0.0.1:%d", cfg.Ports.ZainoJSONRPC),
		fmt.Sprintf("127.0.0.1:%d", cfg.Ports.ZainoGRPC),
	)
	agg := &aggregator.Aggregator{
		Cfg:       cfg,
		Zebra:     zc,
		Zaino:     zn,
		DiskProbe: disk.Probe,
		// Ground the telemetry in real Docker container state so the dashboard
		// recognizes a stack that is already running (started by a previous
		// session or out-of-band) — buttons, service cards, and everything else
		// reading the snapshot reflect the truth, not just RPC reachability.
		Containers: func(ctx context.Context) (map[string]string, error) {
			// The error (Docker daemon unreachable) is surfaced via
			// Snapshot.DockerError rather than swallowed, so the dashboard can tell
			// "daemon down" from "nodes down".
			return c.ContainerStates(ctx)
		},
	}
	agg.WithZallet.Store(cfg.WithZallet)
	// Forward background-action failures (Start/Reset goroutines, plus
	// synchronous Stop/Restart failures) into the snapshot so the dashboard
	// can render them. Without this the user sees "Command accepted" and
	// nothing else when docker compose up fails partway.
	stack.OnActionError = func(name string, err error) {
		// An intentional client disconnect (context canceled) is not a real
		// failure — don't paint a misleading red banner for it.
		if errors.Is(err, context.Canceled) {
			return
		}
		agg.SetActionError(name, err.Error())
	}
	// Expose a one-call clear so the action handlers can wipe the error
	// after a successful follow-up (e.g. the user clicks Start again and
	// this time it works).
	clearActionError := func() { agg.ClearActionError() }
	status := server.StatusFunc(func(ctx context.Context) (any, error) {
		return agg.Collect(ctx), nil
	})

	// Activity broadcaster: the single feed that the dashboard's live activity
	// log streams from. It merges lifecycle command output (docker compose
	// up/down/stop/restart — image pulls, container creation, errors) with
	// container logs so the user sees the full picture.
	activity := logs.NewActivity(500)
	c.Activity = activity

	// Pipe container logs into the activity feed in the background. This
	// goroutine starts `docker compose logs -f` and re-opens it on failure
	// (e.g. before any container exists). The lifecycle output from compose
	// commands is already emitted via c.Activity; this adds the running
	// container output.
	// Root context cancelled on SIGINT/SIGTERM, so the log follower's docker
	// child is reaped and the HTTP server drains in-flight requests on Ctrl-C.
	rootCtx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	go pipeContainerLogs(rootCtx, c, activity)

	stackStarted := new(atomic.Bool)
	ctrl := &stackController{
		stack:    stack,
		clearFn:  clearActionError,
		started:  stackStarted,
		setMount: func(cacheRoot string) { c.SetEnv("Z3_ZEBRA_CACHE_MOUNT", cacheRoot) },
	}
	srv := server.New(status, ctrl, composeLogSource{c: c}, activity, 2*time.Second)
	srv.SetInspector(server.InspectFunc(func(_ context.Context, path string) (any, error) {
		info, err := faststart.Inspect(path, cfg.Network.String())
		if err != nil {
			return nil, err
		}
		return faststart.Validate(info, cfg.ZebraStateMajor), nil
	}))
	// SetAttacher backs the dashboard's one-click "Attach & Restart": validate the
	// snapshot (read-only), then, only if usable, remount Zebra's cache onto it and
	// re-sequence the live stack. Validation happens before any mutation so a bad
	// path is a clean 4xx that leaves the running stack untouched.
	srv.SetAttacher(server.AttachFunc(func(_ context.Context, path string) error {
		info, err := faststart.Inspect(path, cfg.Network.String())
		if err != nil {
			return err
		}
		if res := faststart.Validate(info, cfg.ZebraStateMajor); !res.Usable {
			return fmt.Errorf("snapshot not usable: %s", res.Message)
		}
		ctrl.Attach(info.CacheRoot)
		return nil
	}))

	// Preflight provider re-runs checks on demand (the dashboard's preflight
	// banner) using the **resolved** ports from startup, so any auto-correction
	// is reflected. It's also what powers the re-install flow after
	// install-docker succeeds.
	preflightChecker := preflight.New(cfg)
	srv.SetPreflight(server.PreflightFunc(func(ctx context.Context) (preflight.Report, error) {
		rep, err := preflightChecker.Run(ctx, preflight.FromConfig(cfg.Ports))
		if err != nil {
			return rep, err
		}
		// Until the stack has been brought up this session, any project containers
		// are leftovers from a previous run. Surface them (and any image drift) so
		// the dashboard can offer Reset instead of silently reusing a stale stack.
		if !stackStarted.Load() {
			if cs, cerr := c.ProjectContainers(ctx); cerr == nil && len(cs) > 0 {
				existing := make([]preflight.ExistingContainer, 0, len(cs))
				for _, k := range cs {
					existing = append(existing, preflight.ExistingContainer{Service: k.Service, Name: k.Name, State: k.State, Image: k.Image})
				}
				pinned := map[string]string{
					"zebra":  cfg.Images.Zebra,
					"zaino":  cfg.Images.Zaino,
					"zallet": cfg.Images.Zallet,
					"zcashd": cfg.Images.Zcashd,
				}
				if chk, ok := preflight.StaleStackCheck(existing, pinned); ok {
					rep.Checks = append(rep.Checks, chk)
				}
			}
		}
		return rep, nil
	}))
	// Installer: a single long-lived instance whose Confirm is the explicit
	// y/N prompt. The dashboard's "Install Docker for me" button triggers the
	// same flow after a confirm dialog. The Confirm gate runs *only* when the
	// user has explicitly opted in, so the server never auto-installs.
	ins := preflight.NewInstaller()
	ins.Confirm = confirmPrompt
	srv.SetInstaller(installerAdapter{ins: ins})
	// The dashboard's "Install Docker" button streams the install live (the
	// click is consent); the CLI -install-docker path keeps the y/N prompt.
	srv.SetInstallRunner(dockerInstallRunner())

	// Runtime starter: lets the dashboard start a stopped Docker runtime
	// (e.g. Colima on macOS) without the user opening a terminal. Always
	// wired when the runtime is installed and startable — the starter
	// re-detects the current state on each invocation so it works even
	// after a successful start (the job is single-flight and resets).
	if rs := dockerinstall.DetectCurrentRuntime(); rs.Installed && rs.Startable {
		srv.SetRuntimeStarter(runtimeStartRunner())
	}

	// Regtest seeder: only wired on regtest. Uses Zebra's JSON-RPC for mining
	// (generate + getblockcount). Wallet RPCs (getnewaddress, getbalance) are
	// not available on Zebra, so the seeder mines to the configured miner
	// address and degrades gracefully when wallet RPCs fail.
	if cfg.Network == config.Regtest {
		zebraURL := fmt.Sprintf("http://127.0.0.1:%d", cfg.Ports.ZebraRPC)
		seeder := regtest.New(zebraURL, nil)
		seeder.MinerAddress = "tmJymvcUCn1ctbghvTJpXBwHiMEB8P6wxNV"
		seeder.Logger = func(s string) { log.Print("regtest: ", s) }
		srv.SetSeeder(seederAdapter{s: seeder})
	}

	// Climax runner: on regtest, use direct RPC calls (no external wallet
	// binary needed). On mainnet/testnet, fall back to Zingo on PATH.
	if cfg.Network == config.Regtest {
		cl := climax.NewRegtest(
			fmt.Sprintf("http://127.0.0.1:%d", cfg.Ports.ZebraRPC),
			fmt.Sprintf("http://127.0.0.1:%d", cfg.Ports.ZalletRPC),
		)
		cl.ZalletUser = "z3launcher"
		cl.ZalletPassword = "z3launcher"
		srv.SetClimax(regtestClimaxAdapter{c: cl})
	} else {
		cl := climax.New(fmt.Sprintf("127.0.0.1:%d", cfg.Ports.ZainoGRPC))
		srv.SetClimax(climaxAdapter{c: cl})
	}

	// Zallet toggle: lets the dashboard enable/disable Zallet at runtime.
	zt := &zalletController{
		stack:   stack,
		compose: c,
		agg:     agg,
		cfg:     &cfg,
		zebra:   zc,
	}
	srv.SetZalletToggler(zt)
	srv.SetWalletSetup(zt)

	// Wallet proxy: always wired, Ping will fail gracefully if Zallet is off.
	walletClient := zallet.New(fmt.Sprintf("http://127.0.0.1:%d", cfg.Ports.ZalletRPC))
	walletClient.User = "z3launcher"
	walletClient.Password = "z3launcher"
	srv.SetWallet(walletClient)

	if assets, ok := web.Assets(); ok {
		srv.SetStatic(assets)
	}

	// The startup preflight report is also surfaced in the first /api/status
	// payload via the aggregator (preflight is part of the first frame the
	// dashboard sees). Print the human-readable summary once.
	if preflightReport != nil {
		printPreflightSummary(*preflightReport)
	}

	// The same-origin/DNS-rebinding guard is for the default loopback bind. If
	// the operator deliberately exposed a non-loopback address, relax it (their
	// stated trust) but warn loudly — the control plane has no auth.
	if !addrIsLoopback(addr) {
		srv.SetAllowRemote(true)
		fmt.Printf("\n⚠  WARNING: %s is not loopback. The control plane is UNAUTHENTICATED and its\n   same-origin guard is relaxed — only expose this on a network you fully trust.\n", addr)
	}

	httpSrv := &http.Server{
		Addr:              addr,
		Handler:           srv.Handler(),
		ReadHeaderTimeout: 5 * time.Second,
		IdleTimeout:       120 * time.Second,
	}
	fmt.Printf("\ncontrol plane listening on http://%s\n", addr)

	serveErr := make(chan error, 1)
	go func() { serveErr <- httpSrv.ListenAndServe() }()
	select {
	case err := <-serveErr:
		return err
	case <-rootCtx.Done():
		stop() // restore default handling so a second Ctrl-C force-quits
		fmt.Println("\nshutting down control plane…")
		shCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		return httpSrv.Shutdown(shCtx)
	}
}

// addrIsLoopback reports whether a listen address binds only the loopback
// interface. A bare ":8088" (all interfaces) and 0.0.0.0 are NOT loopback.
func addrIsLoopback(addr string) bool {
	host, _, err := net.SplitHostPort(addr)
	if err != nil {
		host = addr
	}
	if host == "" {
		return false
	}
	if host == "localhost" {
		return true
	}
	ip := net.ParseIP(host)
	return ip != nil && ip.IsLoopback()
}

// confirmPrompt is the CLI-side y/N prompt used both by `-install-docker` and
// (via the same Installer) by the dashboard's "Install Docker for me" button
// when triggered from a non-interactive session.
func confirmPrompt(p dockerinstall.Plan) bool {
	fmt.Println()
	fmt.Println("z3launcher is about to install Docker.")
	fmt.Printf("  platform:  %s\n", p.OS)
	fmt.Printf("  method:    %s\n", p.Method)
	fmt.Printf("  command:   %s\n", p.Command)
	if p.Elevated {
		fmt.Println("  elevation: requires root / sudo")
	}
	if p.Note != "" {
		fmt.Printf("  note:      %s\n", p.Note)
	}
	fmt.Print("\nProceed? [y/N] ")
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		return false
	}
	line = strings.TrimSpace(strings.ToLower(line))
	return line == "y" || line == "yes"
}

// installerAdapter bridges preflight.Installer to server.DockerInstaller (the
// read-only plan endpoint). The actual install streams via dockerInstallRunner.
type installerAdapter struct{ ins *preflight.Installer }

func (a installerAdapter) InspectInstaller() any { return a.ins.Inspect() }

// dockerInstallRunner returns a streaming install function for the dashboard's
// "Install Docker" button. It detects the platform, refuses to hang on a sudo
// prompt (Linux needs passwordless sudo or root), streams the command output,
// and verifies the daemon afterwards. The button click is the user's consent.
func dockerInstallRunner() server.InstallRunner {
	return func(ctx context.Context, emit func(string)) error {
		plan := dockerinstall.DetectCurrent()
		emit(fmt.Sprintf("Platform: %s · method: %s", plan.OS, plan.Method))

		if !plan.Automatic() {
			emit("No automatic installer for this platform.")
			if plan.Note != "" {
				emit(plan.Note)
			}
			emit("Manual install: " + plan.Manual)
			return fmt.Errorf("manual install required on %s", plan.OS)
		}

		// The Homebrew bootstrap script requires sudo to create /opt/homebrew
		// (Apple Silicon) or /usr/local (Intel). With stdin closed (browser
		// context), sudo can't prompt for a password and fails immediately.
		// Guide the user to install Homebrew in a terminal first.
		if plan.OS == "darwin" && plan.Method == "homebrew-bootstrap" {
			emit("Homebrew is not installed. The Homebrew installer needs admin access")
			emit("(sudo), which can't be entered from the browser.")
			emit("")
			emit("Open a terminal and run:")
			emit(`    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`)
			emit("    brew install colima docker")
			emit("    colima start")
			emit("")
			emit("Then come back to the dashboard and click Start.")
			return fmt.Errorf("Homebrew install requires a terminal (admin access needed)")
		}

		if plan.OS == "linux" && !dockerinstall.CanElevateNonInteractive() {
			emit("Docker install on Linux needs root, but the launcher can't enter a sudo")
			emit("password from the browser. Either restart the launcher with sudo and click")
			emit("again, or run this in a terminal:")
			emit("    " + plan.Command)
			return fmt.Errorf("needs root: passwordless sudo or running as root required")
		}

		emit("Running: " + plan.Command)
		emit("")
		if err := plan.RunStream(ctx, emit); err != nil {
			return err
		}

		emit("")
		emit("Install command finished. Checking the Docker daemon…")
		if err := dockerinstall.Verify(ctx); err != nil {
			// Docker was installed but the daemon isn't running yet.
			// Try to start the detected runtime automatically.
			rs := dockerinstall.DetectCurrentRuntime()
			if rs.Installed && rs.Startable && !rs.Running {
				emit("")
				emit(fmt.Sprintf("Starting %s…", rs.Runtime))
				if startErr := dockerinstall.StartRuntimeStream(ctx, emit); startErr != nil {
					emit(fmt.Sprintf("%s start failed: %s", rs.Runtime, startErr.Error()))
					emit(fmt.Sprintf("→ Try running '%s' in a terminal, then click Start.", rs.StartCmd))
					return nil
				}
				emit("")
				if err2 := dockerinstall.Verify(ctx); err2 != nil {
					emit(fmt.Sprintf("%s started but Docker daemon isn't reachable yet: %s", rs.Runtime, err2.Error()))
					emit("→ Wait a few seconds and click Check Again.")
					return nil
				}
				emit(fmt.Sprintf("✓ Docker is installed and %s is running.", rs.Runtime))
				return nil
			}

			emit("Docker is installed but the daemon isn't reachable yet: " + err.Error())
			if rs.StartCmd != "" {
				emit(fmt.Sprintf("→ Run '%s' to start the daemon, then click Start.", rs.StartCmd))
			}
			return nil
		}
		emit("✓ Docker is installed and running.")
		return nil
	}
}

// runtimeStartRunner returns a streaming function that starts the Docker
// runtime (e.g. Colima on macOS). The dashboard's "Start Docker Runtime"
// button triggers this; the click is the user's consent.
func runtimeStartRunner() server.RuntimeStarter {
	return func(ctx context.Context, emit func(string)) error {
		// Re-detect on every invocation so state is fresh.
		rs := dockerinstall.DetectCurrentRuntime()
		emit(fmt.Sprintf("Runtime: %s", rs.Runtime))
		emit(fmt.Sprintf("Command: %s", rs.StartCmd))
		emit("")

		if err := dockerinstall.StartRuntimeStream(ctx, emit); err != nil {
			return err
		}

		emit("")
		emit("Verifying Docker daemon…")
		if err := dockerinstall.Verify(ctx); err != nil {
			emit("Runtime started but Docker daemon isn't reachable yet: " + err.Error())
			emit("→ Wait a few seconds and click Check Again.")
			return nil
		}
		emit("✓ Docker runtime is running.")
		return nil
	}
}

// seederAdapter bridges regtest.Seeder to server.RegtestSeeder. The Seed
// method's (any, any) return shape matches the server interface so the
// server stays decoupled from the regtest package's concrete types.
type seederAdapter struct{ s *regtest.Seeder }

func (a seederAdapter) Ping(ctx context.Context) error { return a.s.Ping(ctx) }
func (a seederAdapter) SeedN(ctx context.Context, n int) (any, any) {
	res, err := a.s.SeedN(ctx, n)
	return res, err
}

// pipeContainerLogs follows `docker compose logs -f` in a background goroutine
// and tees each line into the activity feed. It reconnects with a short backoff
// when the follow exits (which happens e.g. when no containers exist yet, or
// when the user stops the stack). This is what gives the activity log its
// "running container output" component; lifecycle command output is emitted
// directly by the compose wrapper via c.Activity.
func pipeContainerLogs(ctx context.Context, c *compose.Compose, activity *logs.Activity) {
	const minBackoff, maxBackoff = 2 * time.Second, 30 * time.Second
	backoff := minBackoff
	for {
		if ctx.Err() != nil {
			return
		}
		start := time.Now()
		rc, err := c.LogsFollow(ctx, "")
		if err != nil {
			if !sleepCtx(ctx, backoff) {
				return
			}
			backoff = minDur(backoff*2, maxBackoff)
			continue
		}
		sc := bufio.NewScanner(rc)
		sc.Buffer(make([]byte, 0, 64*1024), 1<<20)
		for sc.Scan() {
			activity.Emit(sc.Text())
		}
		_ = sc.Err() // e.g. bufio.ErrTooLong on a >1MiB line — don't busy-spin on it
		_ = rc.Close()
		// A follow that ran a meaningful while (containers existed) resets the
		// backoff; an instant exit (no containers yet) escalates it so we don't
		// spawn a docker subprocess every 2s indefinitely before the first start.
		if time.Since(start) > 5*time.Second {
			backoff = minBackoff
		} else {
			backoff = minDur(backoff*2, maxBackoff)
		}
		if !sleepCtx(ctx, backoff) {
			return
		}
	}
}

// sleepCtx sleeps for d unless ctx is cancelled first; it returns false if
// cancelled (so callers can stop) and true if the full duration elapsed.
func sleepCtx(ctx context.Context, d time.Duration) bool {
	t := time.NewTimer(d)
	defer t.Stop()
	select {
	case <-ctx.Done():
		return false
	case <-t.C:
		return true
	}
}

func minDur(a, b time.Duration) time.Duration {
	if a < b {
		return a
	}
	return b
}

// climaxAdapter bridges climax.Runner to server.ClimaxRunner. Same
// decoupling rationale as seederAdapter.
type climaxAdapter struct{ c *climax.Runner }

func (a climaxAdapter) Inspect(ctx context.Context) any { return a.c.Inspect(ctx) }
func (a climaxAdapter) Run(ctx context.Context) any     { return a.c.Run(ctx) }

// regtestClimaxAdapter bridges climax.RegtestRunner to server.ClimaxRunner.
type regtestClimaxAdapter struct{ c *climax.RegtestRunner }

func (a regtestClimaxAdapter) Inspect(ctx context.Context) any { return a.c.Inspect(ctx) }
func (a regtestClimaxAdapter) Run(ctx context.Context) any     { return a.c.Run(ctx) }

// zalletController implements server.ZalletToggler. It enables/disables
// Zallet at runtime by starting/stopping the container and updating the
// aggregator + stack state so the dashboard reflects the change.
//
// When the system is not running yet the toggle only sets the flag so that
// the next Start includes Zallet. It never starts the container on its own
// (compose up zallet would pull in Zebra via depends_on, bootstrapping the
// whole stack unexpectedly).
type zalletController struct {
	stack   *launcher.Stack
	compose *compose.Compose
	agg     *aggregator.Aggregator
	cfg     *config.Config
	zebra   *zebra.Client // used to check if the system is already running
	mu      sync.Mutex    // serializes concurrent toggles (guards cfg.WithZallet)
}

func (z *zalletController) ZalletEnabled() bool { return z.stack.WithZallet.Load() }

// setEnabled flips the Zallet-enabled flag across the stack, aggregator, config,
// and the compose COMPOSE_PROFILES env (cfg first, since composeProfiles reads
// it). Caller holds z.mu.
func (z *zalletController) setEnabled(on bool) {
	z.cfg.WithZallet = on
	z.stack.WithZallet.Store(on)
	z.agg.WithZallet.Store(on)
	z.compose.SetEnv("COMPOSE_PROFILES", z.cfg.ComposeProfiles())
}

func (z *zalletController) EnableZallet(ctx context.Context) error {
	z.mu.Lock()
	defer z.mu.Unlock()
	z.setEnabled(true)
	// Start the container only if the system is running AND a wallet exists. With
	// no wallet yet, just flip the flag — the dashboard prompts the user to
	// create or restore one (we never silently generate a seed).
	if z.systemRunning(ctx) && z.stack.WalletProvisioned() {
		// Provisioned wallet: the identity must already exist. Do NOT regenerate
		// it (that would brick the encrypted wallet); fail clearly if it's gone.
		if err := wallet.IdentityUsable(z.cfg.ZalletIdentityFile); err != nil {
			return fmt.Errorf("enable zallet: %w", err)
		}
		if _, err := z.compose.Up(ctx, "zallet"); err != nil {
			return fmt.Errorf("enable zallet: %w", err)
		}
	}
	return nil
}

func (z *zalletController) DisableZallet(ctx context.Context) error {
	z.mu.Lock()
	defer z.mu.Unlock()
	if z.systemRunning(ctx) {
		if _, err := z.compose.Stop(ctx, "zallet"); err != nil {
			return fmt.Errorf("disable zallet: %w", err)
		}
	}
	z.setEnabled(false)
	return nil
}

// WalletProvisioned reports whether a Zallet wallet has been set up (so the
// dashboard knows whether to show the create/restore prompt).
func (z *zalletController) WalletProvisioned() bool { return z.stack.WalletProvisioned() }

// CreateWallet provisions a brand-new wallet: it ensures a private encryption
// identity, generates a 24-word seed, initializes the keystore, imports the
// seed, and starts the wallet. The seed words are returned ONCE for the user to
// back up — they are never persisted by the launcher.
func (z *zalletController) CreateWallet(ctx context.Context) (server.WalletSeed, error) {
	z.mu.Lock()
	defer z.mu.Unlock()
	if z.stack.WalletProvisioned() {
		return server.WalletSeed{}, fmt.Errorf("a wallet already exists — reset before creating a new one")
	}
	if !z.systemRunning(ctx) {
		return server.WalletSeed{}, fmt.Errorf("start the stack first: Zebra must be running to set up a wallet")
	}
	recipient, err := wallet.EnsureAgeIdentity(z.cfg.ZalletIdentityFile)
	if err != nil {
		return server.WalletSeed{}, fmt.Errorf("prepare encryption identity: %w", err)
	}
	phrase, err := wallet.GenerateMnemonic()
	if err != nil {
		return server.WalletSeed{}, err
	}
	if err := z.provisionSeed(ctx, phrase); err != nil {
		return server.WalletSeed{}, err
	}
	// The wallet now exists and its seed is `phrase`. Return the words to the
	// user FIRST — a container-start hiccup must never lose the only seed copy.
	seed := server.WalletSeed{Words: wallet.Words(phrase), Recipient: recipient}
	z.startWalletContainer(ctx) // best-effort; failures surface in wallet status
	return seed, nil
}

// RestoreWallet provisions a wallet from a user-supplied recovery phrase.
func (z *zalletController) RestoreWallet(ctx context.Context, phrase string) error {
	z.mu.Lock()
	defer z.mu.Unlock()
	if err := wallet.ValidateMnemonic(phrase); err != nil {
		return err
	}
	if z.stack.WalletProvisioned() {
		return fmt.Errorf("a wallet already exists — reset before restoring a different one")
	}
	if !z.systemRunning(ctx) {
		return fmt.Errorf("start the stack first: Zebra must be running to restore a wallet")
	}
	if _, err := wallet.EnsureAgeIdentity(z.cfg.ZalletIdentityFile); err != nil {
		return fmt.Errorf("prepare encryption identity: %w", err)
	}
	if err := z.provisionSeed(ctx, wallet.NormalizeMnemonic(phrase)); err != nil {
		return err
	}
	z.startWalletContainer(ctx) // best-effort
	return nil
}

// provisionSeed inits the keystore and imports the phrase, then marks the wallet
// provisioned. It deliberately does NOT start the container — that is best-effort
// and separate (startWalletContainer), so a container-start failure can never
// make us lose a freshly-imported seed. Caller holds z.mu. The phrase is never
// logged or written to disk by the launcher.
func (z *zalletController) provisionSeed(ctx context.Context, phrase string) error {
	if err := z.stack.InitWallet(ctx); err != nil {
		return err
	}
	// import-mnemonic reads the phrase from a terminal prompt, so it runs over a
	// PTY. The phrase is not appended to any error (it would echo the seed).
	if _, err := z.compose.RunWithStdinTTY(ctx, "zallet-import", []byte(phrase)); err != nil {
		return fmt.Errorf("import seed into wallet (the phrase was rejected or the wallet already has a seed): %w", err)
	}
	z.stack.MarkProvisioned()
	return nil
}

// startWalletContainer enables Zallet and brings its container up. Best-effort:
// the wallet already exists and (for create) its seed has been returned to the
// user, so a start failure must not fail the whole operation — it surfaces via
// wallet status and is retryable with Start/Restart.
func (z *zalletController) startWalletContainer(ctx context.Context) {
	z.setEnabled(true)
	if _, err := z.compose.Up(ctx, "zallet"); err != nil {
		log.Printf("wallet provisioned but the zallet container did not start (retry via Start): %v", err)
	}
}

func (z *zalletController) systemRunning(ctx context.Context) bool {
	if z.zebra == nil {
		return false
	}
	_, err := z.zebra.GetBlockchainInfo(ctx)
	return err == nil
}

// hasBinOnPath reports whether a binary is on the system PATH.
func hasBinOnPath(bin string) bool {
	_, err := exec.LookPath(bin)
	return err == nil
}

// composeLogSource adapts the compose wrapper to server.LogSource.
type composeLogSource struct{ c *compose.Compose }

func (l composeLogSource) Tail(ctx context.Context, service string) (io.ReadCloser, error) {
	return l.c.LogsFollow(ctx, service)
}

// stackController adapts launcher.Stack to server.Controller. Start/Reset run
// the long two-phase startup in the background so the HTTP request returns
// promptly. Errors from those background phases (and the synchronous Stop/
// Restart paths) are forwarded to the snapshot's lastActionError field via
// Stack.OnActionError so the dashboard can surface them.
type stackController struct {
	stack   *launcher.Stack
	clearFn func()
	// setMount points Zebra's cache bind-mount at a host path (the fast-start
	// "attach" flow). It mutates the live compose env (Z3_ZEBRA_CACHE_MOUNT) so
	// the subsequent force-recreate remounts onto the pre-synced snapshot. nil
	// disables runtime attach (tests).
	setMount func(cacheRoot string)
	// started flips true once the stack has actually been brought up in this
	// process (the first compose `up` succeeded), so the preflight "stale stack"
	// probe only flags containers that are genuine leftovers from a previous run.
	// It is set INSIDE the action after Zebra is up — never on a failed start —
	// so a start that errors immediately keeps stale detection active.
	started *atomic.Bool

	// mu serializes the *initiation* of lifecycle actions. A new action cancels
	// any in-flight one and waits for it to unwind before issuing its own docker
	// mutations, so `up` and `down -v` can never run concurrently against the
	// same project — yet Stop can still interrupt a multi-day sync (cancel-and-
	// replace, not a single-flight lock that would wedge until ready).
	mu     sync.Mutex
	cancel context.CancelFunc
	done   chan struct{}
}

// run cancels any in-flight action, waits for it to finish, then runs fn for
// this action. async=true detaches fn onto a goroutine (long startup paths) so
// the HTTP handler returns promptly; async=false runs it synchronously (quick
// Stop/Restart). On success the error banner is cleared; on failure it is
// attributed to name (a superseding cancel is not reported as a failure).
func (c *stackController) run(name string, async bool, fn func(ctx context.Context) error) {
	c.mu.Lock()
	if c.cancel != nil {
		c.cancel()
		<-c.done // the action goroutine never takes c.mu, so this can't deadlock
	}
	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan struct{})
	c.cancel, c.done = cancel, done
	c.mu.Unlock()

	work := func() {
		defer close(done)
		defer cancel()
		if err := fn(ctx); err != nil {
			if !errors.Is(err, context.Canceled) {
				log.Printf("%s: %v", name, err)
			}
			c.stack.ReportError(name, err)
			return
		}
		if c.clearFn != nil {
			c.clearFn()
		}
	}
	if async {
		go work()
	} else {
		work()
	}
}

func (c *stackController) Start(context.Context) error {
	c.run("start", true, func(ctx context.Context) error {
		if err := c.stack.StartZebra(ctx); err != nil {
			return err
		}
		if c.started != nil {
			c.started.Store(true) // our containers exist now — not leftovers
		}
		if err := c.stack.WaitReady(ctx); err != nil {
			return err
		}
		return c.stack.StartDependents(ctx)
	})
	return nil
}

func (c *stackController) Stop(context.Context) error {
	c.run("stop", false, func(ctx context.Context) error { return c.stack.Stop(ctx) })
	return nil
}

func (c *stackController) Restart(context.Context) error {
	c.run("restart", false, func(ctx context.Context) error { return c.stack.Restart(ctx) })
	return nil
}

// Clear is the safe cleanup for stale/exited leftovers: it removes the stack's
// containers and network (compose down) but keeps every volume, so chain state
// and the wallet survive and Start rebuilds fresh containers without a re-sync.
func (c *stackController) Clear(context.Context) error {
	c.run("clear", false, func(ctx context.Context) error { return c.stack.Down(ctx) })
	return nil
}

func (c *stackController) Reset(context.Context) error {
	c.run("reset", true, func(ctx context.Context) error {
		if err := c.stack.Reset(ctx); err != nil {
			return err
		}
		if c.started != nil {
			c.started.Store(true)
		}
		if err := c.stack.WaitReady(ctx); err != nil {
			return err
		}
		return c.stack.StartDependents(ctx)
	})
	return nil
}

// Attach points Zebra's cache at a pre-validated pre-synced snapshot and
// re-sequences the stack onto it live: swap the mount, force-recreate Zebra,
// wait until it's ready on the new state, then force-recreate the dependents so
// Zaino reads the same cache. Runs as a cancel-and-replace action like Start,
// so the dashboard shows the node going "starting" → "ready" during the swap.
// The caller (the attach handler) has already validated the snapshot is usable.
func (c *stackController) Attach(cacheRoot string) {
	c.run("attach", true, func(ctx context.Context) error {
		if c.setMount != nil {
			c.setMount(cacheRoot)
		}
		if err := c.stack.RecreateZebra(ctx); err != nil {
			return err
		}
		if c.started != nil {
			c.started.Store(true)
		}
		if err := c.stack.WaitReady(ctx); err != nil {
			return err
		}
		return c.stack.RecreateDependents(ctx)
	})
}

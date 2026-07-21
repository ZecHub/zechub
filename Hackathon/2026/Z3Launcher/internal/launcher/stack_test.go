package launcher

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"reflect"
	"sync"
	"testing"
	"time"
)

// recComposer records the sequence of compose operations it receives.
type recComposer struct {
	mu     sync.Mutex
	calls  []string
	upErr  error
	runOut []byte // output returned by Run (and embedded in runErr's context)
	runErr error  // error returned by Run (simulates a one-shot's non-zero exit)
	// states is what ContainerStates reports (service → Docker state). Empty by
	// default, so zebraAlive() reads "" for zebra and treats it as not-alive —
	// preserving the fail-fast behavior the readiness tests assert.
	states    map[string]string
	statesErr error
}

func (r *recComposer) add(s string) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.calls = append(r.calls, s)
}

func (r *recComposer) snapshot() []string {
	r.mu.Lock()
	defer r.mu.Unlock()
	return append([]string(nil), r.calls...)
}

func (r *recComposer) Up(_ context.Context, services ...string) ([]byte, error) {
	r.add("up:" + join(services))
	return nil, r.upErr
}
func (r *recComposer) Recreate(_ context.Context, services ...string) ([]byte, error) {
	r.add("recreate:" + join(services))
	return nil, r.upErr
}
func (r *recComposer) Run(_ context.Context, service string) ([]byte, error) {
	r.add("run:" + service)
	// Only zallet-init's result is configurable; zallet-mnemonic always succeeds
	// in the fake (the real one-shot exits 0 when run after a fresh init).
	if service == "zallet-init" {
		return r.runOut, r.runErr
	}
	return nil, nil
}
func (r *recComposer) Down(_ context.Context, removeVolumes bool) ([]byte, error) {
	if removeVolumes {
		r.add("down:-v")
	} else {
		r.add("down")
	}
	return nil, nil
}
func (r *recComposer) Restart(_ context.Context, services ...string) ([]byte, error) {
	r.add("restart:" + join(services))
	return nil, nil
}
func (r *recComposer) Stop(_ context.Context, services ...string) ([]byte, error) {
	r.add("stop:" + join(services))
	return nil, nil
}
func (r *recComposer) ContainerStates(_ context.Context) (map[string]string, error) {
	return r.states, r.statesErr
}

func join(s []string) string {
	out := ""
	for i, v := range s {
		if i > 0 {
			out += ","
		}
		out += v
	}
	return out
}

// readyAfter returns a ReadinessFunc that reports true on and after the nth call.
func readyAfter(n int) (ReadinessFunc, *int) {
	var calls int
	var mu sync.Mutex
	f := func(_ context.Context) (bool, error) {
		mu.Lock()
		defer mu.Unlock()
		calls++
		return calls >= n, nil
	}
	return f, &calls
}

func TestSequenceStartsDependentsOnlyAfterReady(t *testing.T) {
	c := &recComposer{}
	ready, _ := readyAfter(3)
	s := &Stack{Compose: c, Ready: ready, PollInterval: time.Millisecond}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := s.Sequence(ctx); err != nil {
		t.Fatalf("Sequence: %v", err)
	}

	want := []string{"up:zebra", "up:zaino"}
	if got := c.snapshot(); !reflect.DeepEqual(got, want) {
		t.Errorf("call order = %v, want %v", got, want)
	}
}

// provisionedMarker returns a path to an existing marker file so WalletProvisioned() is true.
func provisionedMarker(t *testing.T) string {
	t.Helper()
	p := filepath.Join(t.TempDir(), ".zallet-provisioned")
	if err := os.WriteFile(p, []byte("provisioned\n"), 0o600); err != nil {
		t.Fatal(err)
	}
	return p
}

func TestSequenceWithZalletProvisioned(t *testing.T) {
	c := &recComposer{}
	ready, _ := readyAfter(1)
	s := &Stack{Compose: c, Ready: ready, PollInterval: time.Millisecond, WalletMarker: provisionedMarker(t)}
	s.WithZallet.Store(true)

	if err := s.Sequence(context.Background()); err != nil {
		t.Fatal(err)
	}
	// Provisioning is explicit (create/restore), so Sequence just brings up the
	// stack: zebra, then zaino+zallet once Zebra is ready.
	want := []string{"up:zebra", "up:zaino,zallet"}
	if got := c.snapshot(); !reflect.DeepEqual(got, want) {
		t.Errorf("call order = %v, want %v", got, want)
	}
}

func TestSequenceWithZalletNotProvisionedSkipsZallet(t *testing.T) {
	c := &recComposer{}
	ready, _ := readyAfter(1)
	// WithZallet is on but no wallet marker → zallet must NOT be brought up (an
	// unprovisioned, seedless container would just crash-loop).
	s := &Stack{Compose: c, Ready: ready, PollInterval: time.Millisecond, WalletMarker: filepath.Join(t.TempDir(), "absent")}
	s.WithZallet.Store(true)

	if err := s.Sequence(context.Background()); err != nil {
		t.Fatal(err)
	}
	want := []string{"up:zebra", "up:zaino"}
	if got := c.snapshot(); !reflect.DeepEqual(got, want) {
		t.Errorf("call order = %v, want %v (zallet skipped until provisioned)", got, want)
	}
}

// The fast-start attach re-sequence must FORCE-recreate the cache-mounting
// services (so they pick up Zebra's swapped bind-mount), not plain-Up them.
func TestRecreatePathForcesRecreate(t *testing.T) {
	c := &recComposer{}
	s := &Stack{Compose: c}
	if err := s.RecreateZebra(context.Background()); err != nil {
		t.Fatal(err)
	}
	if err := s.RecreateDependents(context.Background()); err != nil {
		t.Fatal(err)
	}
	want := []string{"recreate:zebra", "recreate:zaino"}
	if got := c.snapshot(); !reflect.DeepEqual(got, want) {
		t.Errorf("attach calls = %v, want %v", got, want)
	}
}

// RecreateDependents shares the dependent-set + identity-guard logic with
// StartDependents, so a provisioned zallet is recreated alongside zaino.
func TestRecreateDependentsIncludesProvisionedZallet(t *testing.T) {
	c := &recComposer{}
	s := &Stack{Compose: c, WalletMarker: provisionedMarker(t)}
	s.WithZallet.Store(true)
	if err := s.RecreateDependents(context.Background()); err != nil {
		t.Fatal(err)
	}
	if got := c.snapshot(); !reflect.DeepEqual(got, []string{"recreate:zaino,zallet"}) {
		t.Errorf("calls = %v, want recreate:zaino,zallet", got)
	}
}

func TestInitWalletFresh(t *testing.T) {
	c := &recComposer{} // zallet-init succeeds
	s := &Stack{Compose: c}
	if err := s.InitWallet(context.Background()); err != nil {
		t.Fatal(err)
	}
	if got := c.snapshot(); !reflect.DeepEqual(got, []string{"run:zallet-init"}) {
		t.Errorf("calls = %v, want run:zallet-init", got)
	}
}

func TestInitWalletAlreadyInitialized(t *testing.T) {
	// init reporting "already initialized" is benign — treated as success.
	c := &recComposer{
		runOut: []byte("Error: Keystore age recipients already initialized"),
		runErr: errors.New("docker compose run failed: exit status 1"),
	}
	s := &Stack{Compose: c}
	if err := s.InitWallet(context.Background()); err != nil {
		t.Fatalf("already-initialized must be treated as success, got %v", err)
	}
}

func TestInitWalletRealErrorPropagates(t *testing.T) {
	c := &recComposer{runErr: errors.New("docker compose run failed: exit status 2: boom")}
	s := &Stack{Compose: c}
	if err := s.InitWallet(context.Background()); err == nil {
		t.Fatal("a non-'already initialized' init failure must propagate")
	}
}

func TestSequenceAbortsIfNeverReady(t *testing.T) {
	c := &recComposer{}
	neverReady := func(_ context.Context) (bool, error) { return false, nil }
	s := &Stack{Compose: c, Ready: neverReady, PollInterval: time.Millisecond}

	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Millisecond)
	defer cancel()
	err := s.Sequence(ctx)
	if !errors.Is(err, context.DeadlineExceeded) {
		t.Errorf("expected deadline exceeded, got %v", err)
	}
	// Dependents must NOT have been started.
	if got := c.snapshot(); !reflect.DeepEqual(got, []string{"up:zebra"}) {
		t.Errorf("dependents started despite Zebra never ready: %v", got)
	}
}

func TestWaitReadyPropagatesError(t *testing.T) {
	c := &recComposer{}
	boom := func(_ context.Context) (bool, error) { return false, errors.New("rpc down") }
	s := &Stack{Compose: c, Ready: boom, PollInterval: time.Millisecond}
	if err := s.WaitReady(context.Background()); err == nil {
		t.Errorf("expected readiness error to propagate")
	}
}

// While Zebra's RPC refuses connections during a long cold DB open but the
// container is alive ("running"), WaitReady must keep waiting — not declare it
// unreachable. It should only ever exit on ctx cancellation here, never with the
// probe-budget error.
func TestWaitReadyToleratesSlowOpenWhileZebraAlive(t *testing.T) {
	c := &recComposer{states: map[string]string{"zebra": "running"}}
	boom := func(_ context.Context) (bool, error) { return false, errors.New("connection refused") }
	s := &Stack{Compose: c, Ready: boom, PollInterval: time.Millisecond}
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Millisecond)
	defer cancel()
	// At 1ms poll the budget (24) is hit in ~24ms; if liveness weren't checked
	// the call would return the unreachable error well before the 60ms deadline.
	if err := s.WaitReady(ctx); !errors.Is(err, context.DeadlineExceeded) {
		t.Errorf("expected to keep waiting (ctx deadline) while zebra alive, got %v", err)
	}
}

// Once the Zebra container has exited, a probe that keeps erroring must trip the
// unreachable error (fail fast), not hang.
func TestWaitReadyFailsWhenZebraDead(t *testing.T) {
	c := &recComposer{states: map[string]string{"zebra": "exited"}}
	boom := func(_ context.Context) (bool, error) { return false, errors.New("connection refused") }
	s := &Stack{Compose: c, Ready: boom, PollInterval: time.Millisecond}
	err := s.WaitReady(context.Background())
	if err == nil || errors.Is(err, context.Canceled) || errors.Is(err, context.DeadlineExceeded) {
		t.Errorf("expected unreachable error for a dead zebra container, got %v", err)
	}
}

func TestResetWipesThenStartsZebra(t *testing.T) {
	c := &recComposer{}
	s := &Stack{Compose: c, Ready: func(context.Context) (bool, error) { return true, nil }}
	if err := s.Reset(context.Background()); err != nil {
		t.Fatal(err)
	}
	want := []string{"down:-v", "up:zebra"}
	if got := c.snapshot(); !reflect.DeepEqual(got, want) {
		t.Errorf("reset calls = %v, want %v", got, want)
	}
}

// Down (the safe stale-container cleanup) must run `down` WITHOUT -v so volumes
// — chain cache, indexer db, wallet keystore — survive. Contrast with Reset.
func TestDownKeepsVolumes(t *testing.T) {
	c := &recComposer{}
	s := &Stack{Compose: c}
	if err := s.Down(context.Background()); err != nil {
		t.Fatal(err)
	}
	if got := c.snapshot(); !reflect.DeepEqual(got, []string{"down"}) {
		t.Errorf("Down calls = %v, want [down] (no -v — volumes kept)", got)
	}
}

func TestStopAndRestart(t *testing.T) {
	c := &recComposer{}
	s := &Stack{Compose: c}
	if err := s.Stop(context.Background()); err != nil {
		t.Fatal(err)
	}
	if err := s.Restart(context.Background()); err != nil {
		t.Fatal(err)
	}
	want := []string{"stop:", "restart:"}
	if got := c.snapshot(); !reflect.DeepEqual(got, want) {
		t.Errorf("calls = %v, want %v", got, want)
	}
}

func TestWaitReadyNoCheckConfigured(t *testing.T) {
	s := &Stack{Compose: &recComposer{}}
	if err := s.WaitReady(context.Background()); err == nil {
		t.Errorf("expected error when no readiness check configured")
	}
}

func TestResetClearsWalletState(t *testing.T) {
	dir := t.TempDir()
	marker := filepath.Join(dir, "marker")
	identity := filepath.Join(dir, "identity.txt")
	for _, p := range []string{marker, identity} {
		if err := os.WriteFile(p, []byte("x"), 0o600); err != nil {
			t.Fatal(err)
		}
	}
	c := &recComposer{}
	s := &Stack{Compose: c, Ready: func(context.Context) (bool, error) { return true, nil }, WalletMarker: marker, IdentityFile: identity}
	if err := s.Reset(context.Background()); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(marker); !os.IsNotExist(err) {
		t.Error("Reset must remove the provisioned marker (down -v wiped the wallet)")
	}
	if _, err := os.Stat(identity); !os.IsNotExist(err) {
		t.Error("Reset must remove the orphaned encryption identity")
	}
}

func TestStartDependentsRequiresIdentityForProvisionedZallet(t *testing.T) {
	c := &recComposer{}
	s := &Stack{Compose: c, WalletMarker: provisionedMarker(t)}
	s.WithZallet.Store(true)
	s.RequireIdentity = func() error { return errors.New("identity missing") }
	if err := s.StartDependents(context.Background()); err == nil {
		t.Fatal("StartDependents must fail when the provisioned wallet's identity is missing")
	}
	for _, call := range c.snapshot() {
		if call == "up:zaino,zallet" {
			t.Error("zallet must NOT be brought up when its identity is missing (would EISDIR)")
		}
	}
}

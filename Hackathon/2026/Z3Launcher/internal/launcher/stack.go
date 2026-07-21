// Package launcher orchestrates the stack lifecycle on top of the compose
// wrapper. Its central job is the mandatory two-phase startup the z3 stack
// requires: bring Zebra up first, wait until it reports ready, then start Zaino
// (and optionally Zallet). Starting everything at once makes Zaino/Zallet
// crash-loop, so this sequencing is a correctness requirement, not a nicety.
package launcher

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"strings"
	"sync/atomic"
	"time"
)

// Composer is the subset of the compose wrapper the orchestrator needs. It is
// satisfied by *compose.Compose and faked in tests.
type Composer interface {
	Up(ctx context.Context, services ...string) ([]byte, error)
	// Recreate force-recreates services so they pick up a changed config (used by
	// the fast-start attach to remount Zebra's cache onto a pre-synced snapshot).
	Recreate(ctx context.Context, services ...string) ([]byte, error)
	Run(ctx context.Context, service string) ([]byte, error)
	Down(ctx context.Context, removeVolumes bool) ([]byte, error)
	Restart(ctx context.Context, services ...string) ([]byte, error)
	Stop(ctx context.Context, services ...string) ([]byte, error)
	// ContainerStates maps each service to its Docker state ("running",
	// "exited", "created", …). WaitReady uses it to tell a slow-but-booting
	// Zebra apart from a dead one.
	ContainerStates(ctx context.Context) (map[string]string, error)
}

// ReadinessFunc reports whether Zebra is ready for dependents to start. It
// should return (false, nil) for transient "not ready yet" conditions so the
// poller keeps waiting, and a non-nil error only for unrecoverable problems.
type ReadinessFunc func(ctx context.Context) (bool, error)

// Stack drives the lifecycle of the vendored z3 compose project.
type Stack struct {
	Compose Composer
	Ready   ReadinessFunc
	// WithZallet is toggled at runtime from the HTTP handler while dependents()
	// is read from the lifecycle goroutines, so it is atomic. Set it with
	// WithZallet.Store(...) rather than a struct-literal field.
	WithZallet   atomic.Bool
	PollInterval time.Duration

	// WalletMarker is a host file path written once the Zallet wallet has been
	// fully provisioned (keystore initialized AND seed imported). WalletProvisioned
	// stats it to gate whether the zallet container is brought up. Empty disables
	// the marker logic (used by tests).
	WalletMarker string

	// IdentityFile is the host path to the wallet's age encryption identity. Reset
	// removes it alongside the marker so the wiped wallet's orphaned key doesn't
	// linger (and can't desync). Empty leaves it untouched (tests).
	IdentityFile string

	// RequireIdentity, when set, is called before a *provisioned* zallet container
	// is started (StartDependents) to verify the encryption identity FILE exists.
	// It must NOT create one (regenerating a key would brick the existing wallet);
	// it returns a descriptive error if the identity is missing/invalid. nil skips
	// the check (tests).
	RequireIdentity func() error

	// OnActionError is called asynchronously from Start/Reset goroutines when
	// a background phase (e.g. docker compose up) fails. It is also called
	// synchronously by Stop/Restart when they return an error. May be nil. The
	// name is the action ("start"/"stop"/"restart"/"reset") for banner
	// attribution; the error is passed verbatim (already wrapped with context).
	OnActionError func(name string, err error)
}

// ReportError is a convenience used by stackController wrappers in main.go to
// forward errors to the snapshot's lastActionError field. Safe to call from
// any goroutine; if OnActionError is nil the call is a no-op.
func (s *Stack) ReportError(name string, err error) {
	if err == nil || s.OnActionError == nil {
		return
	}
	s.OnActionError(name, err)
}

func (s *Stack) poll() time.Duration {
	if s.PollInterval <= 0 {
		return 5 * time.Second
	}
	return s.PollInterval
}

func (s *Stack) dependents() []string {
	d := []string{"zaino"}
	// Zallet only joins the stack when the user enabled it AND a wallet has been
	// provisioned (created or restored through the explicit setup flow). An
	// unprovisioned zallet container has no seed and would just crash-loop.
	if s.WithZallet.Load() && s.WalletProvisioned() {
		d = append(d, "zallet")
	}
	return d
}

// StartZebra brings up only Zebra (phase one of startup).
func (s *Stack) StartZebra(ctx context.Context) error {
	if _, err := s.Compose.Up(ctx, "zebra"); err != nil {
		return fmt.Errorf("start zebra: %w", err)
	}
	return nil
}

// RecreateZebra force-recreates Zebra so it picks up a changed cache mount. Used
// by the fast-start attach flow to remount Zebra's cache onto a pre-synced
// snapshot while the stack is live (phase one of the re-sequence).
func (s *Stack) RecreateZebra(ctx context.Context) error {
	if _, err := s.Compose.Recreate(ctx, "zebra"); err != nil {
		return fmt.Errorf("recreate zebra: %w", err)
	}
	return nil
}

// StartDependents brings up Zaino (and Zallet, only when enabled AND a wallet is
// provisioned). Only call this once Zebra is ready. Wallet provisioning is no
// longer implicit here — it happens through the explicit create/restore flow so
// the user gets to back up their seed (and we never silently generate one).
func (s *Stack) StartDependents(ctx context.Context) error {
	return s.bringUpDependents(ctx, s.Compose.Up)
}

// RecreateDependents force-recreates the dependents so they pick up Zebra's new
// cache mount (the fast-start attach changes Z3_ZEBRA_CACHE_MOUNT, which Zaino
// also reads read-only). Phase two of the attach re-sequence; call once the
// freshly-mounted Zebra is ready.
func (s *Stack) RecreateDependents(ctx context.Context) error {
	return s.bringUpDependents(ctx, s.Compose.Recreate)
}

// bringUpDependents computes the dependent set (Zaino, plus Zallet when enabled
// and provisioned) and brings it up via the given launcher (Up or Recreate),
// running the zallet identity guard first so a missing key can't make Docker
// plant a directory at the bind-mount source and crash-loop with EISDIR.
func (s *Stack) bringUpDependents(ctx context.Context, up func(context.Context, ...string) ([]byte, error)) error {
	deps := s.dependents()
	if s.RequireIdentity != nil && containsService(deps, "zallet") {
		if err := s.RequireIdentity(); err != nil {
			return fmt.Errorf("start dependents: %w", err)
		}
	}
	if _, err := up(ctx, deps...); err != nil {
		return fmt.Errorf("start dependents: %w", err)
	}
	return nil
}

func containsService(services []string, name string) bool {
	for _, s := range services {
		if s == name {
			return true
		}
	}
	return false
}

// InitWallet runs Zallet's init-wallet-encryption one-shot, idempotently: a
// fresh wallet is initialized; an "already initialized" keystore is left intact
// (re-running would not be safe). The mnemonic is imported separately by the
// provisioner so the seed is never silently (re)generated.
func (s *Stack) InitWallet(ctx context.Context) error {
	out, err := s.Compose.Run(ctx, "zallet-init")
	if err != nil && !alreadyInitialized(out, err) {
		return fmt.Errorf("init wallet encryption: %w", err)
	}
	return nil
}

// WalletProvisioned reports whether the Zallet wallet has been fully provisioned
// (keystore + seed imported) — per the host marker written on a successful
// create/restore. Gates whether the zallet container is brought up.
func (s *Stack) WalletProvisioned() bool {
	if s.WalletMarker == "" {
		return false
	}
	_, err := os.Stat(s.WalletMarker)
	return err == nil
}

// MarkProvisioned records that the Zallet wallet is fully provisioned (called by
// the provisioner after a successful seed import). Best effort.
func (s *Stack) MarkProvisioned() {
	if s.WalletMarker == "" {
		return
	}
	_ = os.WriteFile(s.WalletMarker, []byte("provisioned\n"), 0o600)
}

// alreadyInitialized reports whether a zallet-init failure is the benign
// "wallet already exists" case rather than a real error. The combined output is
// checked, and the error string too (the exec runner embeds the output there),
// so the signal is found regardless of which Composer implementation is used.
func alreadyInitialized(out []byte, err error) bool {
	hay := strings.ToLower(string(out))
	if err != nil {
		hay += " " + strings.ToLower(err.Error())
	}
	return strings.Contains(hay, "already initialized")
}

// maxConsecutiveReadinessErrors bounds how long WaitReady tolerates a probe
// that keeps erroring (connection refused, dial timeout, HTTP non-2xx) while the
// Zebra container is NOT alive, before declaring the node unreachable. A node
// that is up but still syncing reports (false, nil) and is waited on
// indefinitely. A node whose RPC refuses connections is checked against the
// container's Docker state: while Zebra is still "running" (e.g. a multi-minute
// cold RocksDB open on a large testnet/mainnet cache), the budget is reset and
// the wait continues; only once the container has died does this bound apply, so
// a wrong port / crashed daemon still fails fast instead of leaking the
// goroutine and parking the dashboard at "starting". At the 5s default poll this
// is ~2 minutes.
const maxConsecutiveReadinessErrors = 24

// WaitReady polls Ready until it reports true or ctx is cancelled. The first
// check happens immediately, before any wait. A transient probe error is
// tolerated (the node may still be booting), but maxConsecutiveReadinessErrors
// in a row — with no successful probe in between — is treated as unreachable and
// returned as an error so the action fails fast instead of hanging forever.
func (s *Stack) WaitReady(ctx context.Context) error {
	if s.Ready == nil {
		return errors.New("no readiness check configured")
	}
	t := time.NewTicker(s.poll())
	defer t.Stop()
	consecutiveErrs := 0
	for {
		ready, err := s.Ready(ctx)
		if err != nil {
			if ctx.Err() != nil {
				return ctx.Err()
			}
			consecutiveErrs++
			if consecutiveErrs >= maxConsecutiveReadinessErrors {
				// Budget exhausted — but a Zebra that's still "running" is just
				// mid-boot (a synced testnet/mainnet cache is tens of GB and its
				// cold RocksDB open refuses RPC for many minutes). That's
				// progress, not failure: reset the budget and keep waiting. Only
				// a container that has actually died (or that compose can't
				// report) trips the unreachable error.
				if s.zebraAlive(ctx) {
					consecutiveErrs = 0
				} else {
					return fmt.Errorf("zebra unreachable after %d consecutive probes: %w", consecutiveErrs, err)
				}
			}
		} else {
			consecutiveErrs = 0
			if ready {
				return nil
			}
		}
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-t.C:
		}
	}
}

// zebraAlive reports whether the Zebra container is present and not exited/dead.
// WaitReady uses it to keep waiting through a slow cold RocksDB open (during
// which the RPC refuses connections for minutes) instead of giving up. A
// container that has exited — or that compose can't report on at all — is not
// alive, so a crashed daemon or wrong port still trips the unreachable error.
func (s *Stack) zebraAlive(ctx context.Context) bool {
	states, err := s.Compose.ContainerStates(ctx)
	if err != nil {
		return false
	}
	switch states["zebra"] {
	case "running", "created", "restarting":
		return true
	default:
		return false
	}
}

// Sequence performs the full two-phase startup: Zebra → wait ready → dependents.
func (s *Stack) Sequence(ctx context.Context) error {
	if err := s.StartZebra(ctx); err != nil {
		return err
	}
	if err := s.WaitReady(ctx); err != nil {
		return err
	}
	return s.StartDependents(ctx)
}

// Stop stops all services without removing containers or volumes.
func (s *Stack) Stop(ctx context.Context) error {
	_, err := s.Compose.Stop(ctx)
	return err
}

// Down removes the stack's containers and network while KEEPING every volume
// (chain cache, indexer database, wallet keystore + identity). This is the safe
// cleanup for stale or exited leftovers from a previous run — as opposed to
// Reset, which additionally wipes all volumes. A subsequent Start rebuilds fresh
// containers on top of the preserved data, so no re-sync is needed.
func (s *Stack) Down(ctx context.Context) error {
	_, err := s.Compose.Down(ctx, false)
	return err
}

// Restart restarts all services in place.
func (s *Stack) Restart(ctx context.Context) error {
	_, err := s.Compose.Restart(ctx)
	return err
}

// Reset wipes chain state (removes volumes) and brings Zebra back up. Callers
// typically follow with WaitReady + StartDependents (or a fresh Sequence) since
// a wiped node must resync before dependents can start.
func (s *Stack) Reset(ctx context.Context) error {
	if out, err := s.Compose.Down(ctx, true); err != nil {
		log.Printf("reset: down -v failed: %v\n%s", err, string(out))
		return fmt.Errorf("reset (down -v): %w", err)
	}
	// down -v wiped the zallet-data volume (keystore + seed). Converge the other
	// two pieces of host state on "empty" so they can't lie: clear the marker (so
	// WalletProvisioned() flips false and the next start skips the seedless
	// zallet AND the dashboard re-offers create/restore), and remove the now-
	// orphaned encryption identity (RemoveAll also clears a stray docker dir).
	if s.WalletMarker != "" {
		if err := os.Remove(s.WalletMarker); err != nil && !os.IsNotExist(err) {
			log.Printf("reset: clear wallet marker %s: %v", s.WalletMarker, err)
		} else {
			log.Printf("reset: cleared wallet marker %s", s.WalletMarker)
		}
	}
	if s.IdentityFile != "" {
		_ = os.RemoveAll(s.IdentityFile)
	}
	return s.StartZebra(ctx)
}

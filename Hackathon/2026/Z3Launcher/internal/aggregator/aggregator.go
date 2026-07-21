// Package aggregator combines the Zebra RPC, Zaino health probe, and disk usage
// into a single telemetry Snapshot — the payload the control plane serves over
// REST and pushes over SSE. It is the one place that knows how raw probe
// results map onto the frozen per-service schema and the surfaced endpoints.
package aggregator

import (
	"context"
	"sync"
	"sync/atomic"
	"time"

	"github.com/raycreatives/z3-launcher/internal/config"
	"github.com/raycreatives/z3-launcher/internal/disk"
	"github.com/raycreatives/z3-launcher/internal/endpoints"
	"github.com/raycreatives/z3-launcher/internal/telemetry"
	"github.com/raycreatives/z3-launcher/internal/zebra"
)

// Zebra is the subset of the Zebra client the aggregator needs.
type Zebra interface {
	GetBlockchainInfo(ctx context.Context) (*zebra.BlockchainInfo, error)
}

// Zaino is the subset of the Zaino client the aggregator needs.
type Zaino interface {
	Healthy(ctx context.Context) (bool, error)
}

// Aggregator collects telemetry from the stack.
type Aggregator struct {
	Cfg       config.Config
	Zebra     Zebra
	Zaino     Zaino
	DiskProbe func(path string) (disk.Usage, error)
	// WithZallet is flipped at runtime by the Zallet toggle while Collect reads
	// it, so it is atomic. Set it with WithZallet.Store(...), not a struct literal.
	WithZallet atomic.Bool

	// Containers, when set, returns the Docker state of each compose service
	// (service name -> docker state, e.g. "zebra" -> "running"). It grounds the
	// telemetry in real container presence so the dashboard knows the stack is
	// up even before the services' RPCs start answering — and stays correct when
	// a service is up but unreachable. Services with no container are simply
	// absent from the map. Nil disables container awareness (state is inferred
	// from RPC reachability alone, the legacy behavior). A non-nil error means
	// the Docker daemon itself is unreachable — surfaced as Snapshot.DockerError
	// so the dashboard can say "start the runtime" rather than blaming the nodes.
	Containers func(ctx context.Context) (map[string]string, error)

	// mu guards lastActionErr / lastActionAt. Background goroutines from
	// the launcher (Start, Reset) post errors here, and Collect reads them
	// into every snapshot it emits. The lastActionErr is cleared on the
	// next successful action; it is purely advisory.
	mu             sync.RWMutex
	lastActionErr  string
	lastActionAt   time.Time
	lastActionName string
}

// SetActionError records an action error. Safe from any goroutine. Pass an
// empty string to clear.
func (a *Aggregator) SetActionError(name string, msg string) {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.lastActionName = name
	a.lastActionAt = time.Now()
	a.lastActionErr = msg
}

// ClearActionError removes any previously-recorded action error. Called by
// the synchronous action success paths so the dashboard's red banner goes
// away on the next successful action.
func (a *Aggregator) ClearActionError() {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.lastActionErr = ""
	a.lastActionName = ""
	a.lastActionAt = time.Time{}
}

func (a *Aggregator) snapshotError() (name, msg string, at time.Time, hasErr bool) {
	a.mu.RLock()
	defer a.mu.RUnlock()
	if a.lastActionErr == "" {
		return "", "", time.Time{}, false
	}
	return a.lastActionName, a.lastActionErr, a.lastActionAt, true
}

// Snapshot is the full telemetry payload pushed to clients.
type Snapshot struct {
	Network   string              `json:"network"`
	Ready     bool                `json:"ready"`
	Services  []telemetry.Service `json:"services"`
	Endpoints endpoints.Surfaced  `json:"endpoints"`
	Timestamp time.Time           `json:"timestamp"`

	// LastActionError surfaces errors from background actions (Start/Reset)
	// that ran after the HTTP request returned 202 Accepted. The dashboard
	// uses this to show a red banner instead of "Command accepted" + nothing.
	// Fields are omitted when there is no error to keep the wire payload
	// quiet during normal operation.
	LastActionError string    `json:"lastActionError,omitempty"`
	LastActionName  string    `json:"lastActionName,omitempty"`
	LastActionAt    time.Time `json:"lastActionAt,omitempty"`

	// DockerError is set when the container-state probe failed because the Docker
	// daemon itself is unreachable (as opposed to a node being down). The
	// dashboard surfaces this distinctly so the user starts the runtime.
	DockerError string `json:"dockerError,omitempty"`
}

// Collect probes all sources and assembles a Snapshot. It never returns an
// error: unreachable services are reflected as states, not failures, so the
// dashboard keeps updating while the stack is coming up.
func (a *Aggregator) Collect(ctx context.Context) Snapshot {
	// Cap the whole snapshot at a few seconds so a node that accepts TCP but
	// stalls at the HTTP layer can't freeze /api/status and the SSE feed (whose
	// tick is shorter than the per-probe client timeouts). A stalled probe then
	// degrades to "unreachable/starting" within one tick instead of hanging.
	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	diskFree := a.diskFree()
	cstates, dockerErr := a.containerStates(ctx)

	zebraSvc, zebraReady := a.zebraService(ctx, diskFree, cstates)
	services := []telemetry.Service{zebraSvc, a.dependentService(ctx, "zaino", zebraReady, diskFree, cstates)}
	if a.WithZallet.Load() {
		services = append(services, a.dependentService(ctx, "zallet", zebraReady, diskFree, cstates))
	}

	snap := Snapshot{
		Network:   a.Cfg.Network.String(),
		Ready:     zebraReady,
		Services:  services,
		Endpoints: endpoints.Build(a.Cfg, zebraReady),
		Timestamp: time.Now(),
	}
	if dockerErr != nil {
		snap.DockerError = dockerErr.Error()
	}
	if name, msg, at, ok := a.snapshotError(); ok {
		snap.LastActionName = name
		snap.LastActionError = msg
		snap.LastActionAt = at
	}
	return snap
}

func (a *Aggregator) diskFree() uint64 {
	if a.DiskProbe == nil {
		return 0
	}
	u, err := a.DiskProbe(a.Cfg.DataDir)
	if err != nil {
		return 0
	}
	return u.FreeBytes
}

// containerStates returns the Docker container state map, or nil when no
// container probe is wired (e.g. in tests).
func (a *Aggregator) containerStates(ctx context.Context) (map[string]string, error) {
	if a.Containers == nil {
		return nil, nil
	}
	return a.Containers(ctx)
}

// applyContainer records container presence on a service from the probe map.
// It returns (up, known): up is true when the container is running; known is
// false when no container info is available (cstates nil), in which case the
// caller keeps its legacy RPC-only behavior. A service missing from a non-nil
// map is treated as "absent" (known, not up).
func applyContainer(svc *telemetry.Service, cstates map[string]string) (up, known bool) {
	if cstates == nil {
		return false, false
	}
	state, ok := cstates[svc.Service]
	if !ok {
		state = "absent"
	}
	svc.ContainerState = state
	svc.ContainerUp = state == "running"
	return svc.ContainerUp, true
}

// failingContainerState maps an abnormal Docker container state to a service
// state. A container that is restarting/dead/paused is crash-looping or wedged —
// distinct from a cleanly stopped/absent one — so the dashboard surfaces it as a
// failure (offering the user a diagnosis) rather than mislabeling it "stopped".
func failingContainerState(dockerState string) (telemetry.ServiceState, bool) {
	switch dockerState {
	case "restarting", "dead", "paused":
		return telemetry.StateUnreachable, true
	}
	return "", false
}

// zebraService builds Zebra's message and reports whether Zebra is ready
// (which gates the dependents and the endpoints). When Zebra's RPC isn't
// answering, the state is grounded in the container: a running container is
// still booting ("starting"), a stopped/absent one is "stopped". Without
// container info it falls back to "unreachable" (legacy behavior).
func (a *Aggregator) zebraService(ctx context.Context, diskFree uint64, cstates map[string]string) (telemetry.Service, bool) {
	svc := telemetry.Service{Service: "zebra", DiskFree: diskFree, State: telemetry.StateUnreachable}
	up, known := applyContainer(&svc, cstates)

	if a.Zebra != nil {
		if bi, err := a.Zebra.GetBlockchainInfo(ctx); err == nil {
			svc.Height = bi.Blocks
			svc.Tip = bi.EstimatedHeight
			svc.SyncPct = bi.SyncPct()
			if bi.Ready() {
				svc.State = telemetry.StateReady
				return svc, true
			}
			svc.State = telemetry.StateSyncing
			return svc, false
		}
	}

	// RPC not answering. Refine the state from the container when we know it.
	if known {
		switch {
		case up:
			svc.State = telemetry.StateStarting
		case mustFail(svc.ContainerState):
			svc.State = telemetry.StateUnreachable
		default:
			svc.State = telemetry.StateStopped
		}
	}
	return svc, false
}

// mustFail reports whether a container state is an abnormal/crash-looping one.
func mustFail(dockerState string) bool {
	_, bad := failingContainerState(dockerState)
	return bad
}

// dependentService builds a message for Zaino/Zallet. A container we know is
// not running reads "stopped"; until Zebra is ready a running (or unknown)
// container reads "starting" without being probed. Once Zebra is ready, Zaino
// is health-probed and Zallet falls back to "running" (supervised, not core).
func (a *Aggregator) dependentService(ctx context.Context, name string, zebraReady bool, diskFree uint64, cstates map[string]string) telemetry.Service {
	svc := telemetry.Service{Service: name, DiskFree: diskFree, State: telemetry.StateStarting}
	up, known := applyContainer(&svc, cstates)

	// Known-not-running wins over everything. Distinguish a crash-looping/wedged
	// container (restarting/dead/paused) from a cleanly stopped one so a failing
	// Zaino/Zallet isn't mislabeled "stopped" with a misleading Start button.
	if known && !up {
		if st, bad := failingContainerState(svc.ContainerState); bad {
			svc.State = st
		} else {
			svc.State = telemetry.StateStopped
		}
		return svc
	}
	if !zebraReady {
		svc.State = telemetry.StateStarting
		return svc
	}
	if name == "zaino" && a.Zaino != nil {
		if healthy, _ := a.Zaino.Healthy(ctx); healthy {
			svc.State = telemetry.StateRunning
		} else {
			svc.State = telemetry.StateUnreachable
		}
		return svc
	}
	svc.State = telemetry.StateRunning
	return svc
}

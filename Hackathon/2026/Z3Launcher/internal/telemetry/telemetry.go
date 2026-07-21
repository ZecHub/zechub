// Package telemetry defines the FROZEN backend<->frontend message schema for
// per-service status. These JSON field names are the dashboard contract
// (plan ticket Z3-10) — renaming them is a breaking change.
package telemetry

// ServiceState enumerates the lifecycle states a service can report.
type ServiceState string

// Service lifecycle states.
const (
	StateUnknown     ServiceState = "unknown"
	StateStopped     ServiceState = "stopped"
	StateStarting    ServiceState = "starting"
	StateSyncing     ServiceState = "syncing"
	StateReady       ServiceState = "ready"
	StateRunning     ServiceState = "running"
	StateUnreachable ServiceState = "unreachable"
)

// Service is the frozen per-service telemetry message:
// {service, state, syncPct, height, tip, diskFree}. The container* fields are
// additive (later than the original schema); older clients ignore them safely.
type Service struct {
	Service  string       `json:"service"`
	State    ServiceState `json:"state"`
	SyncPct  float64      `json:"syncPct"`
	Height   int64        `json:"height"`
	Tip      int64        `json:"tip"`
	DiskFree uint64       `json:"diskFree"`

	// ContainerUp reports whether this service's Docker container exists and is
	// running, independent of whether its RPC/health endpoint answers yet. It
	// is the dashboard's source of truth for "is the stack up": a container
	// that is up but still booting reads ContainerUp=true with State=starting,
	// so Stop/Restart stay enabled and Start stays disabled even before the
	// service's RPC comes online.
	ContainerUp bool `json:"containerUp"`

	// ContainerState is the raw Docker container state ("running", "exited",
	// "created", ...) or "absent" when no container exists. Advisory/diagnostic;
	// omitted when container state is unknown (no probe wired).
	ContainerState string `json:"containerState,omitempty"`
}

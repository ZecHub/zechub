package telemetry

import (
	"encoding/json"
	"sort"
	"testing"
)

// TestServiceSchemaFrozen guards the BE<->FE contract: the per-service message
// must serialize to exactly these keys. If this test fails, the dashboard
// contract changed — update both sides deliberately.
//
// containerUp is part of the contract (always present). containerState is
// additive/omitempty — it appears only when container state is known, so it is
// absent here and asserted separately in TestServiceContainerStateOmitEmpty.
func TestServiceSchemaFrozen(t *testing.T) {
	b, err := json.Marshal(Service{
		Service: "zebra", State: StateSyncing, SyncPct: 12.5,
		Height: 100, Tip: 200, DiskFree: 42,
	})
	if err != nil {
		t.Fatal(err)
	}
	var m map[string]any
	if err := json.Unmarshal(b, &m); err != nil {
		t.Fatal(err)
	}

	got := make([]string, 0, len(m))
	for k := range m {
		got = append(got, k)
	}
	sort.Strings(got)
	want := []string{"containerUp", "diskFree", "height", "service", "state", "syncPct", "tip"}
	if len(got) != len(want) {
		t.Fatalf("keys = %v, want %v", got, want)
	}
	for i := range want {
		if got[i] != want[i] {
			t.Errorf("keys = %v, want %v", got, want)
			break
		}
	}
	if m["state"] != "syncing" {
		t.Errorf("state serialized as %v, want \"syncing\"", m["state"])
	}
}

// TestServiceContainerStateOmitEmpty verifies containerState is omitted when
// empty (unknown) and present when set, so the field stays quiet on the wire
// during normal operation but surfaces real Docker state when probed.
func TestServiceContainerStateOmitEmpty(t *testing.T) {
	// Empty: containerState absent.
	b, _ := json.Marshal(Service{Service: "zebra", State: StateStopped})
	var m map[string]any
	if err := json.Unmarshal(b, &m); err != nil {
		t.Fatal(err)
	}
	if _, ok := m["containerState"]; ok {
		t.Errorf("containerState should be omitted when empty, got %v", m["containerState"])
	}

	// Set: containerState present with the raw Docker state.
	b, _ = json.Marshal(Service{Service: "zebra", State: StateStarting, ContainerUp: true, ContainerState: "running"})
	m = nil
	if err := json.Unmarshal(b, &m); err != nil {
		t.Fatal(err)
	}
	if m["containerState"] != "running" {
		t.Errorf("containerState = %v, want \"running\"", m["containerState"])
	}
	if m["containerUp"] != true {
		t.Errorf("containerUp = %v, want true", m["containerUp"])
	}
}

package aggregator

import (
	"context"
	"errors"
	"testing"

	"github.com/raycreatives/z3-launcher/internal/config"
	"github.com/raycreatives/z3-launcher/internal/disk"
	"github.com/raycreatives/z3-launcher/internal/telemetry"
	"github.com/raycreatives/z3-launcher/internal/zebra"
)

type fakeZebra struct {
	info *zebra.BlockchainInfo
	err  error
}

func (f fakeZebra) GetBlockchainInfo(context.Context) (*zebra.BlockchainInfo, error) {
	return f.info, f.err
}

type fakeZaino struct {
	healthy bool
	called  bool
}

func (f *fakeZaino) Healthy(context.Context) (bool, error) {
	f.called = true
	return f.healthy, nil
}

func boolPtr(b bool) *bool { return &b }

func fixedDisk(free uint64) func(string) (disk.Usage, error) {
	return func(p string) (disk.Usage, error) {
		return disk.Usage{Path: p, TotalBytes: free * 2, FreeBytes: free}, nil
	}
}

func svcByName(s Snapshot, name string) telemetry.Service {
	for _, sv := range s.Services {
		if sv.Service == name {
			return sv
		}
	}
	return telemetry.Service{}
}

func TestCollectReadyStack(t *testing.T) {
	z := &fakeZaino{healthy: true}
	a := &Aggregator{
		Cfg: config.Default("/data"),
		Zebra: fakeZebra{info: &zebra.BlockchainInfo{
			Blocks: 100, EstimatedHeight: 100,
			InitialBlockDownloadComplete: boolPtr(true),
		}},
		Zaino:     z,
		DiskProbe: fixedDisk(5000),
	}

	snap := a.Collect(context.Background())

	if !snap.Ready {
		t.Errorf("snapshot should be ready")
	}
	if !snap.Endpoints.Ready {
		t.Errorf("endpoints should be ready-gated true")
	}
	if zb := svcByName(snap, "zebra"); zb.State != telemetry.StateReady || zb.SyncPct != 100 {
		t.Errorf("zebra service = %+v", zb)
	}
	if zn := svcByName(snap, "zaino"); zn.State != telemetry.StateRunning {
		t.Errorf("zaino state = %q, want running", zn.State)
	}
	if !z.called {
		t.Errorf("Zaino health should be probed once Zebra is ready")
	}
	if zb := svcByName(snap, "zebra"); zb.DiskFree != 5000 {
		t.Errorf("diskFree = %d, want 5000", zb.DiskFree)
	}
}

func TestCollectSyncingDoesNotProbeZaino(t *testing.T) {
	z := &fakeZaino{healthy: true}
	a := &Aggregator{
		Cfg: config.Default("/data"),
		Zebra: fakeZebra{info: &zebra.BlockchainInfo{
			Blocks: 40, EstimatedHeight: 100,
			InitialBlockDownloadComplete: boolPtr(false),
		}},
		Zaino:     z,
		DiskProbe: fixedDisk(1),
	}

	snap := a.Collect(context.Background())

	if snap.Ready {
		t.Errorf("syncing stack should not be ready")
	}
	if zb := svcByName(snap, "zebra"); zb.State != telemetry.StateSyncing || zb.SyncPct != 40 {
		t.Errorf("zebra service = %+v, want syncing @40%%", zb)
	}
	if zn := svcByName(snap, "zaino"); zn.State != telemetry.StateStarting {
		t.Errorf("zaino state = %q, want starting", zn.State)
	}
	if z.called {
		t.Errorf("Zaino must NOT be probed while Zebra is still syncing")
	}
}

func TestCollectZebraUnreachable(t *testing.T) {
	a := &Aggregator{
		Cfg:       config.Default("/data"),
		Zebra:     fakeZebra{err: errors.New("connection refused")},
		Zaino:     &fakeZaino{},
		DiskProbe: fixedDisk(1),
	}
	snap := a.Collect(context.Background())
	if snap.Ready {
		t.Errorf("unreachable Zebra should not be ready")
	}
	if zb := svcByName(snap, "zebra"); zb.State != telemetry.StateUnreachable {
		t.Errorf("zebra state = %q, want unreachable", zb.State)
	}
}

// containerProbe returns a fixed service->state map, mimicking the wired
// `docker compose ps` probe.
func containerProbe(states map[string]string) func(context.Context) (map[string]string, error) {
	return func(context.Context) (map[string]string, error) { return states, nil }
}

// A container that is up but whose RPC isn't answering yet must read as
// "starting" with ContainerUp=true — not "unreachable" — so the dashboard
// recognizes the running stack and keeps Stop enabled.
func TestCollectZebraUpButRPCDown(t *testing.T) {
	a := &Aggregator{
		Cfg:        config.Default("/data"),
		Zebra:      fakeZebra{err: errors.New("connection refused")},
		Zaino:      &fakeZaino{},
		DiskProbe:  fixedDisk(1),
		Containers: containerProbe(map[string]string{"zebra": "running", "zaino": "running"}),
	}
	snap := a.Collect(context.Background())

	zb := svcByName(snap, "zebra")
	if zb.State != telemetry.StateStarting {
		t.Errorf("zebra state = %q, want starting (container up, RPC not answering)", zb.State)
	}
	if !zb.ContainerUp || zb.ContainerState != "running" {
		t.Errorf("zebra containerUp=%v state=%q, want true/running", zb.ContainerUp, zb.ContainerState)
	}
	// Zaino container is up but Zebra isn't ready: still starting, and up.
	zn := svcByName(snap, "zaino")
	if zn.State != telemetry.StateStarting || !zn.ContainerUp {
		t.Errorf("zaino = %+v, want starting & containerUp", zn)
	}
}

// A container that is absent/exited reads as "stopped" (not "unreachable"),
// so Start is enabled and Stop is disabled.
func TestCollectZebraStopped(t *testing.T) {
	a := &Aggregator{
		Cfg:        config.Default("/data"),
		Zebra:      fakeZebra{err: errors.New("connection refused")},
		Zaino:      &fakeZaino{},
		DiskProbe:  fixedDisk(1),
		Containers: containerProbe(map[string]string{}), // no containers
	}
	snap := a.Collect(context.Background())

	zb := svcByName(snap, "zebra")
	if zb.State != telemetry.StateStopped {
		t.Errorf("zebra state = %q, want stopped (no container)", zb.State)
	}
	if zb.ContainerUp || zb.ContainerState != "absent" {
		t.Errorf("zebra containerUp=%v state=%q, want false/absent", zb.ContainerUp, zb.ContainerState)
	}
	zn := svcByName(snap, "zaino")
	if zn.State != telemetry.StateStopped || zn.ContainerUp {
		t.Errorf("zaino = %+v, want stopped & not up", zn)
	}
}

// When the container probe confirms a running container, a ready Zebra still
// reports ready and carries ContainerUp=true.
func TestCollectReadyStackContainerUp(t *testing.T) {
	a := &Aggregator{
		Cfg: config.Default("/data"),
		Zebra: fakeZebra{info: &zebra.BlockchainInfo{
			Blocks: 100, EstimatedHeight: 100, InitialBlockDownloadComplete: boolPtr(true),
		}},
		Zaino:      &fakeZaino{healthy: true},
		DiskProbe:  fixedDisk(1),
		Containers: containerProbe(map[string]string{"zebra": "running", "zaino": "running"}),
	}
	snap := a.Collect(context.Background())
	zb := svcByName(snap, "zebra")
	if zb.State != telemetry.StateReady || !zb.ContainerUp {
		t.Errorf("zebra = %+v, want ready & containerUp", zb)
	}
}

func TestCollectWithZallet(t *testing.T) {
	a := &Aggregator{
		Cfg: config.Default("/data"),
		Zebra: fakeZebra{info: &zebra.BlockchainInfo{
			Blocks: 100, EstimatedHeight: 100, InitialBlockDownloadComplete: boolPtr(true),
		}},
		Zaino:     &fakeZaino{healthy: true},
		DiskProbe: fixedDisk(1),
	}
	a.WithZallet.Store(true)
	snap := a.Collect(context.Background())
	if zl := svcByName(snap, "zallet"); zl.State != telemetry.StateRunning {
		t.Errorf("zallet state = %q, want running", zl.State)
	}
	if len(snap.Services) != 3 {
		t.Errorf("expected 3 services with Zallet, got %d", len(snap.Services))
	}
}

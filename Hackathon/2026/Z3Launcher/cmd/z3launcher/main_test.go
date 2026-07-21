package main

import "testing"

// TestRunDryRun exercises config resolution and the print path without Docker.
func TestRunDryRun(t *testing.T) {
	bad := options{network: "not-a-network", dataDir: "/tmp/z3", composeFile: "x.yml"}
	if err := run(bad); err == nil {
		t.Errorf("expected error for invalid network")
	}

	// noPreflight keeps this unit test hermetic: it exercises config + the
	// print path, not Docker availability (preflight runs by default).
	ok := options{network: "testnet", dataDir: "/tmp/z3", composeFile: "x.yml", noPreflight: true}
	if err := run(ok); err != nil {
		t.Errorf("valid dry run failed: %v", err)
	}
}

func TestResolveConfig(t *testing.T) {
	cfg, err := resolveConfig(options{network: "regtest", dataDir: "/data"})
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Network.String() != "regtest" {
		t.Errorf("network = %q, want regtest", cfg.Network)
	}
	if cfg.DataDir != "/data" {
		t.Errorf("data dir = %q, want /data", cfg.DataDir)
	}
	if cfg.Ports.ZebraRPC != 18232 {
		t.Errorf("zebra rpc port = %d, want 18232", cfg.Ports.ZebraRPC)
	}
}

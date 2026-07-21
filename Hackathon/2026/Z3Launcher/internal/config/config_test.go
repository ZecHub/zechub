package config

import "testing"

func TestParseNetwork(t *testing.T) {
	cases := []struct {
		in      string
		want    Network
		wantErr bool
	}{
		{"mainnet", Mainnet, false},
		{"MAINNET", Mainnet, false},
		{"Main", Mainnet, false},
		{"", Mainnet, false}, // empty defaults to mainnet (Rule 1)
		{"  testnet  ", Testnet, false},
		{"test", Testnet, false},
		{"regtest", Regtest, false},
		{"reg", Regtest, false},
		{"REGTEST", Regtest, false},
		{"foonet", "", true},
		{"8232", "", true},
	}
	for _, tc := range cases {
		got, err := ParseNetwork(tc.in)
		if tc.wantErr {
			if err == nil {
				t.Errorf("ParseNetwork(%q): want error, got %q", tc.in, got)
			}
			continue
		}
		if err != nil {
			t.Errorf("ParseNetwork(%q): unexpected error %v", tc.in, err)
			continue
		}
		if got != tc.want {
			t.Errorf("ParseNetwork(%q) = %q, want %q", tc.in, got, tc.want)
		}
	}
}

func TestNetworkValid(t *testing.T) {
	for _, n := range []Network{Mainnet, Testnet, Regtest} {
		if !n.Valid() {
			t.Errorf("%q should be valid", n)
		}
	}
	if Network("bogus").Valid() {
		t.Errorf("bogus network should be invalid")
	}
}

func TestNetworkEnvName(t *testing.T) {
	cases := map[Network]string{
		Mainnet: "Mainnet",
		Testnet: "Testnet",
		Regtest: "Regtest",
	}
	for n, want := range cases {
		if got := n.EnvName(); got != want {
			t.Errorf("%q.EnvName() = %q, want %q", n, got, want)
		}
	}
}

func TestDefault(t *testing.T) {
	c := Default("/tmp/z3")
	if c.Network != Mainnet {
		t.Errorf("default network = %q, want mainnet", c.Network)
	}
	if c.ProjectName != "z3" {
		t.Errorf("default project = %q, want z3", c.ProjectName)
	}
	if c.DataDir != "/tmp/z3" {
		t.Errorf("default data dir = %q, want /tmp/z3", c.DataDir)
	}
	if c.Ports != DefaultPorts() {
		t.Errorf("default ports = %+v, want %+v", c.Ports, DefaultPorts())
	}
	if c.Ports.ZebraRPC != 18232 {
		t.Errorf("Zebra RPC host port = %d, want 18232 (not 8232)", c.Ports.ZebraRPC)
	}
	if c.ZebraCacheDir != "/tmp/z3/zebra" {
		t.Errorf("ZebraCacheDir = %q, want /tmp/z3/zebra", c.ZebraCacheDir)
	}
}

func TestValidate(t *testing.T) {
	valid := Default("/tmp/z3")
	if err := valid.Validate(); err != nil {
		t.Fatalf("valid config rejected: %v", err)
	}

	noDir := Default("")
	if err := noDir.Validate(); err == nil {
		t.Errorf("empty data dir should fail validation")
	}

	badPort := Default("/tmp/z3")
	badPort.Ports.ZainoGRPC = 70000
	if err := badPort.Validate(); err == nil {
		t.Errorf("out-of-range port should fail validation")
	}

	badNet := Default("/tmp/z3")
	badNet.Network = "bogus"
	if err := badNet.Validate(); err == nil {
		t.Errorf("invalid network should fail validation")
	}
}

func TestEnvMap(t *testing.T) {
	c := Default("/data/z3")
	c.Network = Testnet
	env := c.EnvMap()

	want := map[string]string{
		"NETWORK_NAME":              "Testnet",
		"Z3_ZEBRA_HOST_RPC_PORT":    "18232",
		"Z3_ZEBRA_HOST_HEALTH_PORT": "8080",
		"ZAINO_HOST_GRPC_PORT":      "8137",
		"ZAINO_HOST_JSONRPC_PORT":   "8237",
		"ZALLET_HOST_RPC_PORT":      "28232",
		"ZEBRA_IMAGE":               "zfnd/zebra:5.2.0",
		"Z3_DATA_DIR":               "/data/z3",
		"Z3_ZEBRA_CACHE_DIR":        "/data/z3/zebra",
		// Default (no fast-start): the named volume, so Zebra can chown it.
		"Z3_ZEBRA_CACHE_MOUNT": "zebra-cache",
	}
	for k, v := range want {
		if env[k] != v {
			t.Errorf("EnvMap[%q] = %q, want %q", k, env[k], v)
		}
	}
	for _, k := range []string{"ZAINO_IMAGE", "ZALLET_IMAGE", "ZCASHD_IMAGE"} {
		if env[k] == "" {
			t.Errorf("EnvMap missing %q", k)
		}
	}
}

// TestEnvMapFastStartOverride verifies the only path that bind-mounts a host
// directory is fast-start. Otherwise Zebra would fail its first-start chown
// on macOS (the host dir is owned by the macOS uid, not the container uid).
func TestEnvMapFastStartOverride(t *testing.T) {
	c := Default("/data/z3")
	c.FastStartAttached = true
	c.ZebraCacheDir = "/data/snapshots/v25/cache"
	if got := c.EnvMap()["Z3_ZEBRA_CACHE_MOUNT"]; got != "/data/snapshots/v25/cache" {
		t.Errorf("Z3_ZEBRA_CACHE_MOUNT = %q, want the host snapshot path", got)
	}
}

func TestNetworkProjectName(t *testing.T) {
	cases := map[Network]string{Mainnet: "z3", Testnet: "z3-testnet", Regtest: "z3-regtest"}
	for net, want := range cases {
		if got := net.ProjectName(); got != want {
			t.Errorf("%s.ProjectName() = %q, want %q", net, got, want)
		}
	}
}

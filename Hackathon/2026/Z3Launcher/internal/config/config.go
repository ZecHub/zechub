// Package config defines the launcher's runtime configuration: the target
// network, data directory, host port mappings, and pinned container image
// tags. It is the single source of truth that the compose orchestration and
// the HTTP server both read from.
package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// Network is the Zcash network the stack runs against.
type Network string

// Recognized networks.
const (
	Mainnet Network = "mainnet"
	Testnet Network = "testnet"
	Regtest Network = "regtest"
)

// ParseNetwork converts a user-supplied string into a Network, accepting any
// capitalization and a few common aliases. An empty string defaults to
// mainnet (Rule 1). It returns an error for unknown values.
func ParseNetwork(s string) (Network, error) {
	switch strings.ToLower(strings.TrimSpace(s)) {
	case "", "mainnet", "main":
		return Mainnet, nil
	case "testnet", "test":
		return Testnet, nil
	case "regtest", "reg":
		return Regtest, nil
	default:
		return "", fmt.Errorf("unknown network %q (want mainnet, testnet, or regtest)", s)
	}
}

// String implements fmt.Stringer.
func (n Network) String() string { return string(n) }

// Valid reports whether n is a recognized network.
func (n Network) Valid() bool {
	switch n {
	case Mainnet, Testnet, Regtest:
		return true
	default:
		return false
	}
}

// EnvName maps a Network to the z3 compose NETWORK_NAME value. z3 uses the
// capitalized Zcash network names (Mainnet, Testnet, Regtest).
func (n Network) EnvName() string {
	switch n {
	case Testnet:
		return "Testnet"
	case Regtest:
		return "Regtest"
	default:
		return "Mainnet"
	}
}

// ProjectName returns the docker compose project name for a network. Each
// network gets its own project so containers and named volumes are isolated:
// a Reset (down -v) launched on regtest can never wipe a multi-day mainnet sync,
// and `up --remove-orphans` on one network won't tear down another's services.
func (n Network) ProjectName() string {
	switch n {
	case Testnet:
		return "z3-testnet"
	case Regtest:
		return "z3-regtest"
	default:
		return "z3"
	}
}

// Ports holds the host-side port mappings exposed by the vendored z3 compose.
// These are the addresses a wallet or app connects to; Zebra's RPC is published
// on 18232 even on mainnet (the z3 stack maps host 18232 -> container 8232).
type Ports struct {
	ZebraRPC     int // Z3_ZEBRA_HOST_RPC_PORT
	ZebraHealth  int // Z3_ZEBRA_HOST_HEALTH_PORT (/ready, /healthy)
	ZainoGRPC    int // ZAINO_HOST_GRPC_PORT (lightwalletd-compatible)
	ZainoJSONRPC int // ZAINO_HOST_JSONRPC_PORT
	ZalletRPC    int // ZALLET_HOST_RPC_PORT
}

// DefaultPorts returns the z3 compose default host ports.
func DefaultPorts() Ports {
	return Ports{
		ZebraRPC:     18232,
		ZebraHealth:  8080,
		ZainoGRPC:    8137,
		ZainoJSONRPC: 8237,
		ZalletRPC:    28232,
	}
}

// Images holds the pinned container image references for the stack. Zebra's
// upstream z3 default is the moving tag zfnd/zebra:latest; we pin it here for
// reproducibility (see plan §3). Tags are verified against Docker Hub / the z3
// repo and overridable via the corresponding *_IMAGE env vars.
type Images struct {
	Zebra  string
	Zaino  string
	Zallet string
	Zcashd string
}

// DefaultImages returns pinned image tags. Zebra is pinned to the current
// stable release (zfnd/zebra:5.2.0) rather than :latest. The 5.x line carries
// NU6.2 consensus (mainnet activation height 3,364,600) and is the line being
// prepped for NU7 (expected end of July 2026); 5.2.0 also widens the local
// reorg window as defence-in-depth against consensus splits around an upgrade.
// Zallet moved registries at v0.1.0-alpha.4: images now publish under
// zodlinc/zallet (electriccoinco/zallet stopped at the NU6.2-incompatible
// alpha.3). alpha.4 parses NU6.2 so the wallet works on testnet/mainnet again;
// note it refuses wallet databases created by alpha.3 or earlier (Reset and
// re-create/restore when upgrading). The compose services run its
// `zallet-zaino` binary — the same embedded-indexer-over-validator-RPC
// architecture alpha.3 shipped (the image's new default `zallet` binary is the
// zebra-state backend, which would need direct access to Zebra's state DB).
func DefaultImages() Images {
	return Images{
		Zebra:  "zfnd/zebra:5.2.0",
		Zaino:  "zingodevops/zainod:0.4.1",
		Zallet: "zodlinc/zallet:v0.1.0-alpha.4",
		Zcashd: "zodlinc/zcashd:v6.12.1",
	}
}

// Config is the fully-resolved launcher configuration.
type Config struct {
	Network     Network
	DataDir     string // host directory for chain state
	ProjectName string // docker compose -p value
	Ports       Ports
	Images      Images

	// ZalletIdentityFile is the host path to the per-user age identity that
	// encrypts the Zallet wallet. The launcher generates a private one here on
	// first wallet setup instead of using the repo's committed placeholder key.
	// Empty falls back to the committed ./zallet/identity.txt (demo/regtest only).
	ZalletIdentityFile string

	// ZebraCacheDir is the host directory bind-mounted into Zebra's cache
	// (/home/zebra/.cache/zebra). Fast-start points this at a pre-synced
	// snapshot's cache root. Defaults to <DataDir>/zebra.
	ZebraCacheDir string
	// FastStartAttached is true when the launcher has validated a pre-synced
	// snapshot and pointed ZebraCacheDir at its cache root. EnvMap uses it
	// to choose between a host bind mount (fast-start) and the named volume
	// (the default), so the chown-on-first-start only happens against paths
	// Docker can chown.
	FastStartAttached bool
	// ZebraStateMajor is the DB-format major version the pinned Zebra image
	// expects, used to validate fast-start snapshots. 0 means unknown.
	ZebraStateMajor int

	// WithZallet enables supervision of the optional Zallet RPC service. It is
	// gated so a Zallet failure never blocks the core Zebra/Zaino flow.
	WithZallet bool
	// RegtestComposeFile overrides the compose file for regtest (the regtest
	// overlay adds an rpc-router and adjusts healthchecks; see plan §3).
	// Empty means use the main compose file for all networks.
	RegtestComposeFile string
	// ZcashdEnabled enables the regtest-only zcashd + rpc-router overlay.
	ZcashdEnabled bool
}

// Default returns a Config with mainnet defaults rooted at the given data dir.
func Default(dataDir string) Config {
	return Config{
		Network:       Mainnet,
		DataDir:       dataDir,
		ProjectName:   "z3",
		Ports:         DefaultPorts(),
		Images:        DefaultImages(),
		ZebraCacheDir: filepath.Join(dataDir, "zebra"),
	}
}

// DefaultDataDir returns the default host data directory under the user's home.
func DefaultDataDir() (string, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("resolve home dir: %w", err)
	}
	return filepath.Join(home, ".z3-launcher", "data"), nil
}

// Validate checks the configuration for obvious problems.
func (c Config) Validate() error {
	if !c.Network.Valid() {
		return fmt.Errorf("invalid network %q", c.Network)
	}
	if strings.TrimSpace(c.DataDir) == "" {
		return fmt.Errorf("data dir must not be empty")
	}
	if strings.TrimSpace(c.ProjectName) == "" {
		return fmt.Errorf("project name must not be empty")
	}
	if strings.TrimSpace(c.ZebraCacheDir) == "" {
		return fmt.Errorf("zebra cache dir must not be empty")
	}
	for name, p := range map[string]int{
		"zebra rpc":     c.Ports.ZebraRPC,
		"zebra health":  c.Ports.ZebraHealth,
		"zaino grpc":    c.Ports.ZainoGRPC,
		"zaino jsonrpc": c.Ports.ZainoJSONRPC,
		"zallet rpc":    c.Ports.ZalletRPC,
	} {
		if p < 1 || p > 65535 {
			return fmt.Errorf("%s port %d out of range 1-65535", name, p)
		}
	}
	return nil
}

// EnvMap renders the configuration as the environment variables consumed by
// the vendored z3 compose file. Keys match the z3 .env.example.
//
// Z3_ZEBRA_CACHE_MOUNT picks what gets bind-mounted into Zebra's cache path:
//   - Fast-start: a host path (e.g. /Users/.../snapshots/.../cache) so the
//     pre-synced state is visible inside the container.
//   - Otherwise: the named volume "zebra-cache", which Docker manages inside
//     the VM. A named volume avoids the "chown ... permission denied" error
//     that occurs when Zebra (a non-root user) tries to chown a host bind
//     mount on first start.
func (c Config) EnvMap() map[string]string {
	m := map[string]string{
		"NETWORK_NAME":              c.Network.EnvName(),
		"Z3_ZEBRA_HOST_RPC_PORT":    strconv.Itoa(c.Ports.ZebraRPC),
		"Z3_ZEBRA_HOST_HEALTH_PORT": strconv.Itoa(c.Ports.ZebraHealth),
		"ZAINO_HOST_GRPC_PORT":      strconv.Itoa(c.Ports.ZainoGRPC),
		"ZAINO_HOST_JSONRPC_PORT":   strconv.Itoa(c.Ports.ZainoJSONRPC),
		"ZALLET_HOST_RPC_PORT":      strconv.Itoa(c.Ports.ZalletRPC),
		"ZEBRA_IMAGE":               c.Images.Zebra,
		"ZAINO_IMAGE":               c.Images.Zaino,
		"ZALLET_IMAGE":              c.Images.Zallet,
		"ZCASHD_IMAGE":              c.Images.Zcashd,
		"Z3_DATA_DIR":               c.DataDir,
		"Z3_ZEBRA_CACHE_DIR":        c.ZebraCacheDir,
		"Z3_ZEBRA_CACHE_MOUNT":      c.zebraCacheMount(),
		"ZAINO_CONFIG_FILE":         c.zainoConfigFile(),
	}
	// Always emit COMPOSE_PROFILES (even empty) so the launcher's intent is
	// authoritative — an inherited shell COMPOSE_PROFILES can't leak in and start
	// profile-gated services the launcher believes are off. The runtime Zallet
	// toggle uses the same ComposeProfiles() builder, so the two can't diverge.
	m["COMPOSE_PROFILES"] = c.ComposeProfiles()
	m["ZALLET_CONFIG_FILE"] = c.zalletConfigFile()
	// Per-user age identity (absolute host path). Falls back to the committed
	// placeholder only when the launcher hasn't set one (e.g. legacy/regtest).
	if c.ZalletIdentityFile != "" {
		m["ZALLET_IDENTITY_FILE"] = c.ZalletIdentityFile
	} else {
		m["ZALLET_IDENTITY_FILE"] = "./zallet/identity.txt"
	}
	return m
}

// ComposeProfiles returns the docker compose profiles to activate for this
// config, joined (empty string when none). It is the single source of truth used
// by both EnvMap (startup) and the runtime Zallet toggle, so the two never emit
// different env shapes for the same logical state.
func (c Config) ComposeProfiles() string {
	var profiles []string
	if c.WithZallet {
		profiles = append(profiles, "zallet")
	}
	if c.ZcashdEnabled {
		profiles = append(profiles, "regtest")
	}
	return strings.Join(profiles, ",")
}

// zalletConfigFile returns the relative path to the Zallet TOML config for the
// current network. The path is relative to the compose file's directory.
func (c Config) zalletConfigFile() string {
	switch c.Network {
	case Testnet:
		return "./zallet/zallet.testnet.toml"
	case Regtest:
		return "./zallet/zallet.regtest.toml"
	default:
		return "./zallet/zallet.mainnet.toml"
	}
}

// zainoConfigFile returns the relative path to the Zaino TOML config for the
// current network. The path is relative to the compose file's directory.
func (c Config) zainoConfigFile() string {
	switch c.Network {
	case Testnet:
		return "./zaino/zainod.testnet.toml"
	case Regtest:
		return "./zaino/zainod.regtest.toml"
	default:
		return "./zaino/zainod.toml"
	}
}

// zebraCacheMount returns the volume spec for Zebra's cache: a host path when
// fast-start has attached a pre-synced snapshot, or the named volume otherwise.
func (c Config) zebraCacheMount() string {
	if c.FastStartAttached && c.ZebraCacheDir != "" {
		// applyFastStart has already validated the snapshot. Bind-mount its
		// cache root directly so the pre-synced state is visible inside the
		// container.
		return c.ZebraCacheDir
	}
	return "zebra-cache"
}

// ComposeFile returns the compose file to use for this network. The regtest
// overlay (when configured) adds an rpc-router + zcashd and adjusts Zebra's
// healthcheck; for mainnet/testnet we use the default compose file.
func (c Config) ComposeFile(defaultFile string) string {
	if c.Network == Regtest && c.RegtestComposeFile != "" {
		return c.RegtestComposeFile
	}
	return defaultFile
}

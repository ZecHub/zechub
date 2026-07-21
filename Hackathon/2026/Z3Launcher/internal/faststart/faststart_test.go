package faststart

import (
	"os"
	"path/filepath"
	"testing"
)

// makeState fabricates a Zebra-like state tree:
// <root>/state/<vdir>/<network>/version
func makeState(t *testing.T, root, vdir, network, version string) string {
	t.Helper()
	leaf := filepath.Join(root, "state", vdir, network)
	if err := os.MkdirAll(leaf, 0o755); err != nil {
		t.Fatal(err)
	}
	// Minimal RocksDB markers so the content probe treats this as a real state DB.
	for name, body := range map[string]string{"CURRENT": "MANIFEST-000001\n", "MANIFEST-000001": "x"} {
		if err := os.WriteFile(filepath.Join(leaf, name), []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
	}
	if version != "" {
		if err := os.WriteFile(filepath.Join(leaf, "version"), []byte(version+"\n"), 0o644); err != nil {
			t.Fatal(err)
		}
	}
	return leaf
}

func TestInspectCacheRoot(t *testing.T) {
	root := t.TempDir()
	leaf := makeState(t, root, "v25", "mainnet", "0.1")

	info, err := Inspect(root, "mainnet")
	if err != nil {
		t.Fatal(err)
	}
	if info.MajorVersion != 25 {
		t.Errorf("major = %d, want 25", info.MajorVersion)
	}
	if info.MinorPatch != "0.1" {
		t.Errorf("minorPatch = %q, want 0.1", info.MinorPatch)
	}
	if info.CacheRoot != filepath.Clean(root) {
		t.Errorf("cacheRoot = %q, want %q", info.CacheRoot, root)
	}
	if info.StatePath != leaf {
		t.Errorf("statePath = %q, want %q", info.StatePath, leaf)
	}
	if info.FullVersion() != "v25.0.1" {
		t.Errorf("fullVersion = %q, want v25.0.1", info.FullVersion())
	}
}

func TestInspectStateDirDirectly(t *testing.T) {
	root := t.TempDir()
	makeState(t, root, "v26", "mainnet", "")

	// Point directly at the state/ dir; cache root should still resolve to root.
	info, err := Inspect(filepath.Join(root, "state"), "mainnet")
	if err != nil {
		t.Fatal(err)
	}
	if info.CacheRoot != filepath.Clean(root) {
		t.Errorf("cacheRoot = %q, want %q", info.CacheRoot, root)
	}
	if info.MajorVersion != 26 {
		t.Errorf("major = %d, want 26", info.MajorVersion)
	}
}

func TestInspectPicksHighestMajor(t *testing.T) {
	root := t.TempDir()
	makeState(t, root, "v25", "mainnet", "")
	makeState(t, root, "v26", "mainnet", "")

	info, err := Inspect(root, "mainnet")
	if err != nil {
		t.Fatal(err)
	}
	if info.MajorVersion != 26 {
		t.Errorf("major = %d, want 26 (highest)", info.MajorVersion)
	}
}

func TestInspectWrongNetwork(t *testing.T) {
	root := t.TempDir()
	makeState(t, root, "v25", "mainnet", "")

	_, err := Inspect(root, "testnet")
	var nf *NotFoundError
	if err == nil || !asNotFound(err, &nf) {
		t.Errorf("expected NotFoundError for missing testnet, got %v", err)
	}
}

func TestInspectMissing(t *testing.T) {
	if _, err := Inspect(filepath.Join(t.TempDir(), "nope"), "mainnet"); err == nil {
		t.Errorf("expected error for missing path")
	}
}

func TestValidateUnknownExpected(t *testing.T) {
	r := Validate(StateInfo{MajorVersion: 25, Network: "mainnet"}, 0)
	if !r.Usable {
		t.Errorf("unknown expected major should still be usable (with caveat)")
	}
	if r.MajorChecked {
		t.Errorf("major should not be marked checked when expected is unknown")
	}
}

func TestValidateMatch(t *testing.T) {
	r := Validate(StateInfo{MajorVersion: 25, Network: "mainnet"}, 25)
	if !r.Usable || !r.MajorMatches {
		t.Errorf("matching major should be usable: %+v", r)
	}
}

func TestValidateMismatch(t *testing.T) {
	r := Validate(StateInfo{MajorVersion: 24, Network: "mainnet"}, 25)
	if r.Usable || r.MajorMatches {
		t.Errorf("mismatched major must not be usable: %+v", r)
	}
}

func TestParseMajor(t *testing.T) {
	cases := map[string]struct {
		want int
		ok   bool
	}{
		"v25": {25, true},
		"v1":  {1, true},
		"v0":  {0, false},
		"x25": {0, false},
		"v":   {0, false},
		"vab": {0, false},
		"":    {0, false},
	}
	for in, want := range cases {
		got, ok := parseMajor(in)
		if ok != want.ok || (ok && got != want.want) {
			t.Errorf("parseMajor(%q) = (%d,%v), want (%d,%v)", in, got, ok, want.want, want.ok)
		}
	}
}

// asNotFound reports whether err is a *NotFoundError.
func asNotFound(err error, target **NotFoundError) bool {
	nf, ok := err.(*NotFoundError)
	if ok {
		*target = nf
	}
	return ok
}

func TestInspectRejectsEmptyStateDir(t *testing.T) {
	root := t.TempDir()
	// A state/v25/mainnet dir with no RocksDB files (e.g. a half-finished rsync).
	if err := os.MkdirAll(filepath.Join(root, "state", "v25", "mainnet"), 0o755); err != nil {
		t.Fatal(err)
	}
	if _, err := Inspect(root, "mainnet"); err == nil {
		t.Fatal("expected an empty state dir (no CURRENT/MANIFEST) to be rejected")
	}
}

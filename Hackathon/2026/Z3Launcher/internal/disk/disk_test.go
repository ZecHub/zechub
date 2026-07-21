package disk

import (
	"os"
	"path/filepath"
	"testing"
)

func TestUsageMath(t *testing.T) {
	u := Usage{TotalBytes: 100, FreeBytes: 30}
	if u.UsedBytes() != 70 {
		t.Errorf("UsedBytes = %d, want 70", u.UsedBytes())
	}
	if u.FreePct() != 30 {
		t.Errorf("FreePct = %v, want 30", u.FreePct())
	}

	// Defensive: free > total must not underflow.
	weird := Usage{TotalBytes: 10, FreeBytes: 20}
	if weird.UsedBytes() != 0 {
		t.Errorf("UsedBytes underflow guard failed: %d", weird.UsedBytes())
	}

	// Zero total must not divide by zero.
	if (Usage{}).FreePct() != 0 {
		t.Errorf("FreePct of zero-total should be 0")
	}
}

func TestProbeRealFilesystem(t *testing.T) {
	u, err := Probe(os.TempDir())
	if err != nil {
		t.Fatalf("Probe(%q): %v", os.TempDir(), err)
	}
	if u.TotalBytes == 0 {
		t.Errorf("expected non-zero total bytes")
	}
	if u.FreeBytes == 0 {
		t.Errorf("expected non-zero free bytes")
	}
	if u.FreeBytes > u.TotalBytes {
		t.Errorf("free (%d) > total (%d)", u.FreeBytes, u.TotalBytes)
	}
	if p := u.FreePct(); p <= 0 || p > 100 {
		t.Errorf("FreePct out of range: %v", p)
	}
}

// TestProbeNonexistentPath walks up to an existing ancestor. This is the
// first-run case: ~/.z3-launcher/data hasn't been created yet, but we still
// want to know how much room is on the disk that will eventually hold it.
func TestProbeNonexistentPath(t *testing.T) {
	missing := filepath.Join(t.TempDir(), "nope", "does", "not", "exist")
	u, err := Probe(missing)
	if err != nil {
		t.Fatalf("Probe(%q) on missing path: %v (should walk up to existing ancestor)", missing, err)
	}
	if u.TotalBytes == 0 || u.FreeBytes == 0 {
		t.Errorf("expected non-zero usage on existing ancestor, got %+v", u)
	}
	if u.Path != missing {
		t.Errorf("Probe should report the originally-requested path in Usage.Path, got %q", u.Path)
	}
}

func TestExistingAncestor(t *testing.T) {
	tmp := t.TempDir()
	cases := []struct {
		in     string
		wantOK bool
	}{
		{tmp, true},                               // exists
		{filepath.Join(tmp, "missing"), true},     // parent exists
		{filepath.Join(tmp, "a", "b", "c"), true}, // walks up to tmp
	}
	for _, tc := range cases {
		got, err := existingAncestor(tc.in)
		if !tc.wantOK {
			if err == nil {
				t.Errorf("existingAncestor(%q) should have errored, got %q", tc.in, got)
			}
			continue
		}
		if err != nil {
			t.Errorf("existingAncestor(%q): %v", tc.in, err)
			continue
		}
		if got == "" {
			t.Errorf("existingAncestor(%q) returned empty path", tc.in)
		}
		// "tmp/a/b/c" → walks up to tmp.
		if tc.in != tmp && got != tmp {
			t.Errorf("existingAncestor(%q) = %q, want %q", tc.in, got, tmp)
		}
	}

	// A path that no real ancestor exists for is impossible on a well-formed
	// Unix filesystem (every path has "/" as an ancestor), so the error
	// branch is defensive — it shouldn't fire in practice. The path-walkup
	// test above covers the only realistic case.
}

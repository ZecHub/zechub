package wallet

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestGenerateMnemonic24Words(t *testing.T) {
	m, err := GenerateMnemonic()
	if err != nil {
		t.Fatal(err)
	}
	if n := len(strings.Fields(m)); n != 24 {
		t.Fatalf("want 24 words, got %d", n)
	}
	if err := ValidateMnemonic(m); err != nil {
		t.Fatalf("generated mnemonic should validate: %v", err)
	}
}

func TestValidateMnemonic(t *testing.T) {
	good, _ := GenerateMnemonic()
	if err := ValidateMnemonic("  " + strings.ToUpper(good) + "  \n"); err != nil {
		t.Errorf("normalized valid phrase should pass: %v", err)
	}
	if err := ValidateMnemonic("not a real seed phrase at all"); err == nil {
		t.Error("garbage phrase should fail")
	}
	if err := ValidateMnemonic(""); err == nil {
		t.Error("empty should fail")
	}
	// Valid wordlist words but bad checksum (24 'abandon' is invalid).
	if err := ValidateMnemonic(strings.Repeat("abandon ", 24)); err == nil {
		t.Error("bad-checksum phrase should fail")
	}
}

func TestEnsureAgeIdentity(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "id.txt")

	rec1, err := EnsureAgeIdentity(path)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.HasPrefix(rec1, "age1") {
		t.Errorf("recipient should be an age public key, got %q", rec1)
	}
	// Idempotent: a second call must NOT regenerate (would orphan the wallet).
	rec2, err := EnsureAgeIdentity(path)
	if err != nil {
		t.Fatal(err)
	}
	if rec1 != rec2 {
		t.Errorf("identity must be stable across calls: %q != %q", rec1, rec2)
	}
}

func TestEnsureAgeIdentityReplacesCommittedPlaceholder(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "id.txt")
	placeholder := "# Regtest-only age identity. No real value — ephemeral test chain.\nAGE-SECRET-KEY-1PLACEHOLDER\n"
	if err := writeFile(t, path, placeholder); err != nil {
		t.Fatal(err)
	}
	rec, err := EnsureAgeIdentity(path)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.HasPrefix(rec, "age1") {
		t.Errorf("placeholder should have been replaced with a real identity, got %q", rec)
	}
}

func TestEnsureAgeIdentityIsDirectorySafe(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "id.txt")
	// Simulate Docker planting a directory at the bind-mount source.
	if err := os.MkdirAll(path, 0o755); err != nil {
		t.Fatal(err)
	}
	rec, err := EnsureAgeIdentity(path)
	if err != nil {
		t.Fatalf("should heal a planted directory, got: %v", err)
	}
	if !strings.HasPrefix(rec, "age1") {
		t.Errorf("expected a real identity after healing, got %q", rec)
	}
	if fi, _ := os.Stat(path); fi == nil || fi.IsDir() {
		t.Error("identity path should now be a regular file")
	}
}

func TestIdentityUsable(t *testing.T) {
	dir := t.TempDir()
	miss := filepath.Join(dir, "missing.txt")
	if err := IdentityUsable(miss); err == nil {
		t.Error("missing identity must be reported unusable")
	}
	asDir := filepath.Join(dir, "asdir.txt")
	_ = os.MkdirAll(asDir, 0o755)
	if err := IdentityUsable(asDir); err == nil {
		t.Error("a directory identity must be reported unusable")
	}
	placeholder := filepath.Join(dir, "ph.txt")
	_ = os.WriteFile(placeholder, []byte("# No real value\nAGE-SECRET-KEY-1X\n"), 0o600)
	if err := IdentityUsable(placeholder); err == nil {
		t.Error("the committed placeholder must be reported unusable")
	}
	good := filepath.Join(dir, "good.txt")
	if _, err := EnsureAgeIdentity(good); err != nil {
		t.Fatal(err)
	}
	if err := IdentityUsable(good); err != nil {
		t.Errorf("a freshly-generated identity must be usable: %v", err)
	}
}

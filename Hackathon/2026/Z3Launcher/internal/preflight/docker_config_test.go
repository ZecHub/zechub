package preflight

import (
	"os"
	"path/filepath"
	"testing"
)

func TestReadMissingHelperEmpty(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.json")
	if err := os.WriteFile(path, []byte(""), 0o600); err != nil {
		t.Fatalf("write: %v", err)
	}
	_, ok := readMissingHelper(path)
	if !ok {
		t.Errorf("empty config should be healthy")
	}
}

func TestReadMissingHelperNoFile(t *testing.T) {
	_, ok := readMissingHelper("/nonexistent/config.json")
	if !ok {
		t.Errorf("missing config file should be treated as healthy (nothing to validate)")
	}
}

func TestReadMissingHelperNoCredentials(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.json")
	if err := os.WriteFile(path, []byte(`{"auths":{}}`), 0o600); err != nil {
		t.Fatalf("write: %v", err)
	}
	_, ok := readMissingHelper(path)
	if !ok {
		t.Errorf("config with no credHelpers should be healthy")
	}
}

func TestReadMissingHelperMissingBinary(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.json")
	// Reference a helper that we know won't exist on $PATH. The test runs
	// in a clean env, so "docker-credential-nonexistent-xyzzy" is safe.
	cfg := `{"credHelpers":{"https://index.docker.io/v1/":"nonexistent-xyzzy"}}`
	if err := os.WriteFile(path, []byte(cfg), 0o600); err != nil {
		t.Fatalf("write: %v", err)
	}
	name, ok := readMissingHelper(path)
	if ok {
		t.Errorf("missing helper should be flagged")
	}
	if name != "nonexistent-xyzzy" {
		t.Errorf("expected the missing helper name, got %q", name)
	}
}

func TestReadMissingHelperCredsStore(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.json")
	cfg := `{"credsStore":"another-nonexistent-xyzzy"}`
	if err := os.WriteFile(path, []byte(cfg), 0o600); err != nil {
		t.Fatalf("write: %v", err)
	}
	name, ok := readMissingHelper(path)
	if ok {
		t.Errorf("missing credsStore helper should be flagged")
	}
	if name != "another-nonexistent-xyzzy" {
		t.Errorf("expected the missing credsStore name, got %q", name)
	}
}

// TestReadMissingHelperEmptyCredsStore covers the Docker Desktop uninstall
// case: credsStore:"" is written to the config but the helper obviously
// doesn't exist. We must NOT flag this as a missing helper — it just
// means "no helper configured", which is healthy.
func TestReadMissingHelperEmptyCredsStore(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.json")
	cfg := `{"credsStore":""}`
	if err := os.WriteFile(path, []byte(cfg), 0o600); err != nil {
		t.Fatalf("write: %v", err)
	}
	_, ok := readMissingHelper(path)
	if !ok {
		t.Errorf("empty credsStore should be treated as healthy, not flagged as missing")
	}
}

// TestReadMissingHelperEmptyCredHelpersValue covers the case where a
// per-registry helper value is the empty string. Same as above.
func TestReadMissingHelperEmptyCredHelpersValue(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.json")
	cfg := `{"credHelpers":{"https://index.docker.io/v1/":""}}`
	if err := os.WriteFile(path, []byte(cfg), 0o600); err != nil {
		t.Fatalf("write: %v", err)
	}
	_, ok := readMissingHelper(path)
	if !ok {
		t.Errorf("empty credHelpers value should be treated as healthy")
	}
}

// TestCheckDockerCredentialHelperHealthy covers the common Colima case (the bug
// report): a config with no credsStore/credHelpers must report OK, not warn
// about a missing helper "".
func TestCheckDockerCredentialHelperHealthy(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "config.json"),
		[]byte(`{"auths":{},"currentContext":"colima"}`), 0o600); err != nil {
		t.Fatal(err)
	}
	t.Setenv("DOCKER_CONFIG", dir)
	got := (&Checker{}).checkDockerCredentialHelper()
	if got.Status != OK {
		t.Errorf("no-credential config: status = %q (%s), want ok", got.Status, got.Message)
	}
}

// TestCheckDockerCredentialHelperMissing confirms a genuinely-missing helper is
// still surfaced as a Warn with the real helper name (not "").
func TestCheckDockerCredentialHelperMissing(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "config.json"),
		[]byte(`{"credsStore":"nonexistent-xyzzy"}`), 0o600); err != nil {
		t.Fatal(err)
	}
	t.Setenv("DOCKER_CONFIG", dir)
	got := (&Checker{}).checkDockerCredentialHelper()
	if got.Status != Warn {
		t.Fatalf("missing helper: status = %q, want warn", got.Status)
	}
	if !contains(got.Message, "nonexistent-xyzzy") || contains(got.Message, `helper ""`) {
		t.Errorf("warn message should name the real helper: %s", got.Message)
	}
}

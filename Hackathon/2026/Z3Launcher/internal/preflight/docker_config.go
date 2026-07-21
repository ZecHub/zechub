//go:build !windows
// +build !windows

package preflight

import (
	"encoding/json"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

// dockerConfigPath returns the path to the user's docker config.json, or
// the empty string if it can't be determined. The DOCKER_CONFIG env var
// follows the official docker convention.
func dockerConfigPath() string {
	if v := os.Getenv("DOCKER_CONFIG"); v != "" {
		return filepath.Join(v, "config.json")
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return ""
	}
	return filepath.Join(home, ".docker", "config.json")
}

// dockerConfig is a minimal parse of ~/.docker/config.json. We only read
// the "credsStore" and "credHelpers" fields — the auth tokens in "auths"
// are skipped on purpose so we never have to handle the secret material.
type dockerConfig struct {
	CredsStore  string            `json:"credsStore"`
	CredHelpers map[string]string `json:"credHelpers"`
}

// readMissingHelper inspects the user's docker config and returns the name
// of any credential helper referenced in credHelpers or credsStore that
// isn't on $PATH. Returns ("", true) when the config is healthy and a
// helper name + false when something is missing.
//
// The function deliberately tolerates malformed config files (e.g. empty
// file) by treating them as "no helper" rather than failing the check —
// we only flag what's actually broken. Empty helper names are also
// ignored: they indicate stale Docker Desktop configs (e.g. credsStore:"")
// rather than a real missing binary.
func readMissingHelper(path string) (string, bool) {
	data, err := os.ReadFile(path)
	if err != nil {
		return "", true
	}
	if len(data) == 0 {
		return "", true
	}
	var cfg dockerConfig
	if err := json.Unmarshal(data, &cfg); err != nil {
		return "", true
	}

	// Prefer credHelpers (per-registry) — most specific first.
	names := make([]string, 0, 1+len(cfg.CredHelpers))
	if cfg.CredsStore != "" {
		names = append(names, cfg.CredsStore)
	}
	for _, n := range cfg.CredHelpers {
		names = append(names, n)
	}
	for _, n := range names {
		if !isRealHelperName(n) {
			// Stale/empty value (e.g. credsStore:"") — skip rather than
			// report a missing "no-name" helper, which is what produced
			// the unhelpful `Docker is missing credential helper ""` warning.
			continue
		}
		if !helperOnPath(n) {
			return n, false
		}
	}
	return "", true
}

// isRealHelperName reports whether n is a plausible credential helper
// identifier. We require at least one non-whitespace character; everything
// else (including empty strings, whitespace-only, and non-printable) is
// treated as stale config that should be ignored.
func isRealHelperName(n string) bool {
	n = strings.TrimSpace(n)
	return n != ""
}

// helperOnPath reports whether `name` (typically "docker-credential-<x>")
// resolves to an executable on the current $PATH. We use LookPath so the
// usual PATH semantics apply (including the user's homebrew bin dirs on
// macOS, which is where Docker Desktop's helper used to live).
func helperOnPath(name string) bool {
	if !strings.HasPrefix(name, "docker-credential-") {
		// Defensive: if someone hand-edits the config to a relative name,
		// prefix it the way docker does.
		name = "docker-credential-" + name
	}
	_, err := exec.LookPath(name)
	return err == nil
}

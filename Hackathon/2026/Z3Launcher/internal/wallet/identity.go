package wallet

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"filippo.io/age"
)

// committedPlaceholderMarker identifies the repo's shipped identity.txt, which
// is a shared, version-controlled "regtest-only, no real value" key. A wallet
// must never be encrypted with it, so EnsureAgeIdentity treats a file
// containing this marker as absent and regenerates a private one.
const committedPlaceholderMarker = "No real value"

// EnsureAgeIdentity returns the path to a per-user age identity, generating a
// fresh one at path if it does not exist or still contains the committed
// placeholder key. The identity is the encryption key for the Zallet wallet, so
// it lives outside the repo (under the launcher data dir), 0600, and is never
// committed. Returns the path and the age recipient (public key) for display.
//
// If a real, user-generated identity already exists it is left untouched —
// regenerating it would make an existing encrypted wallet undecryptable.
func EnsureAgeIdentity(path string) (recipient string, err error) {
	if existing, ok := readUsableIdentity(path); ok {
		return existing, nil
	}
	// Docker plants an (empty) directory at a bind-mount source that doesn't
	// exist. If a prior failed zallet start left one here, remove it before we
	// can write the identity file — otherwise os.Rename below fails forever.
	if fi, lerr := os.Lstat(path); lerr == nil && fi.IsDir() {
		if rerr := os.RemoveAll(path); rerr != nil {
			return "", fmt.Errorf("identity path %s is a directory (stray docker mount) and could not be removed: %w", path, rerr)
		}
	}

	id, err := age.GenerateX25519Identity()
	if err != nil {
		return "", fmt.Errorf("generate age identity: %w", err)
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o700); err != nil {
		return "", fmt.Errorf("create identity dir: %w", err)
	}
	content := fmt.Sprintf(
		"# Z3 Launcher per-user Zallet encryption identity — KEEP PRIVATE.\n"+
			"# This is the key that encrypts your wallet; back it up alongside your seed.\n"+
			"# public key: %s\n%s\n",
		id.Recipient().String(), id.String())
	// Write privately. Use O_EXCL semantics via a temp file + rename so a
	// concurrent start can't truncate an identity mid-write.
	tmp := path + ".tmp"
	if err := os.WriteFile(tmp, []byte(content), 0o600); err != nil {
		return "", fmt.Errorf("write identity: %w", err)
	}
	if err := os.Rename(tmp, path); err != nil {
		_ = os.Remove(tmp)
		return "", fmt.Errorf("install identity: %w", err)
	}
	return id.Recipient().String(), nil
}

// IdentityUsable verifies that path is a usable encryption identity FILE for an
// already-provisioned wallet, WITHOUT creating one. A provisioned wallet was
// encrypted with a specific key, so a missing/placeholder/directory identity is
// fatal (regenerating a new key would not decrypt the existing wallet) — callers
// must surface this rather than silently mint a mismatched key. Returns a clear
// error describing the problem, or nil if the identity is good.
func IdentityUsable(path string) error {
	fi, err := os.Lstat(path)
	if err != nil {
		return fmt.Errorf("wallet encryption identity is missing (%s); the wallet cannot be opened — reset and create a new wallet", path)
	}
	if fi.IsDir() {
		return fmt.Errorf("wallet encryption identity at %s is a directory (a stray docker mount); reset and create a new wallet", path)
	}
	if _, ok := readUsableIdentity(path); !ok {
		return fmt.Errorf("wallet encryption identity at %s is invalid or the committed placeholder; reset and create a new wallet", path)
	}
	return nil
}

// readUsableIdentity reports whether path already holds a private, non-placeholder
// age identity, and returns its recipient line if so.
func readUsableIdentity(path string) (recipient string, ok bool) {
	data, err := os.ReadFile(path)
	if err != nil {
		return "", false
	}
	text := string(data)
	if strings.Contains(text, committedPlaceholderMarker) {
		return "", false // the shipped placeholder — must be replaced
	}
	if !strings.Contains(text, "AGE-SECRET-KEY-1") {
		return "", false // not a usable age identity
	}
	for _, line := range strings.Split(text, "\n") {
		if strings.HasPrefix(line, "# public key:") {
			recipient = strings.TrimSpace(strings.TrimPrefix(line, "# public key:"))
		}
	}
	return recipient, true
}

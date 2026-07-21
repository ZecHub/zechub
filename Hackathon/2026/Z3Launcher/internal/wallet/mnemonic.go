// Package wallet provides the launcher-owned pieces of Zallet wallet
// provisioning that Zallet's own CLI cannot surface: generating a BIP-39
// mnemonic the user can actually back up, validating a phrase the user types to
// restore, and generating a per-user age encryption identity.
//
// Why the launcher owns the mnemonic: Zallet's `generate-mnemonic` stores the
// seed and prints only a fingerprint (never the words), and `export-mnemonic`
// emits an age-encrypted blob — neither lets a user write down their 24 words.
// So the launcher generates the mnemonic itself, shows it once for backup, then
// feeds it to Zallet via `import-mnemonic` (stdin). The same import path powers
// restore-from-seed.
package wallet

import (
	"fmt"
	"strings"

	bip39 "github.com/tyler-smith/go-bip39"
)

// mnemonicEntropyBits is 256 bits → a 24-word BIP-39 mnemonic, matching what
// Zallet's generate-mnemonic produces (Count::Words24).
const mnemonicEntropyBits = 256

// GenerateMnemonic returns a fresh 24-word BIP-39 English mnemonic. The words
// are the only backup that recovers the funds, so the caller must surface them
// to the user exactly once and never persist them.
func GenerateMnemonic() (string, error) {
	entropy, err := bip39.NewEntropy(mnemonicEntropyBits)
	if err != nil {
		return "", fmt.Errorf("generate entropy: %w", err)
	}
	m, err := bip39.NewMnemonic(entropy)
	if err != nil {
		return "", fmt.Errorf("derive mnemonic: %w", err)
	}
	return m, nil
}

// NormalizeMnemonic lowercases and collapses internal whitespace so a phrase a
// user pastes (extra spaces, newlines, capitalization) validates and imports
// consistently. It does not alter the words themselves.
func NormalizeMnemonic(phrase string) string {
	return strings.Join(strings.Fields(strings.ToLower(phrase)), " ")
}

// ValidateMnemonic reports whether phrase is a valid BIP-39 mnemonic (correct
// word count, all words in the wordlist, valid checksum). Used to reject a
// mistyped restore phrase before touching Zallet.
func ValidateMnemonic(phrase string) error {
	phrase = NormalizeMnemonic(phrase)
	if phrase == "" {
		return fmt.Errorf("mnemonic is empty")
	}
	n := len(strings.Fields(phrase))
	switch n {
	case 12, 15, 18, 21, 24:
	default:
		return fmt.Errorf("a recovery phrase has 12/15/18/21/24 words; got %d", n)
	}
	if !bip39.IsMnemonicValid(phrase) {
		return fmt.Errorf("invalid recovery phrase (a word is misspelled or the checksum is wrong)")
	}
	return nil
}

// Words splits a normalized phrase into its words, for the UI's reveal grid and
// the backup-confirmation quiz.
func Words(phrase string) []string {
	return strings.Fields(NormalizeMnemonic(phrase))
}

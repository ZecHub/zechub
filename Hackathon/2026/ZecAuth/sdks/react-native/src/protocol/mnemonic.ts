/**
 * BIP-39 mnemonic helpers (via `@scure/bip39`).
 *
 * A ZecAuth wallet's root secret is a standard BIP-39 mnemonic. The 64-byte BIP-39 seed
 * derived from it is fed to {@link deriveAuthKeyPair} as the ZIP-32 seed — so the same
 * recovery phrase deterministically reproduces the user's ZecAuth identity on any device.
 */
import {
  entropyToMnemonic,
  generateMnemonic as scureGenerate,
  mnemonicToEntropy,
  mnemonicToSeedSync,
  validateMnemonic as scureValidate,
} from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

export type MnemonicStrength = 128 | 160 | 192 | 224 | 256;

/** Generate a new BIP-39 mnemonic. 256 bits → 24 words (default), 128 → 12 words. */
export function generateMnemonic(strength: MnemonicStrength = 256): string {
  return scureGenerate(wordlist, strength);
}

/** Validate a BIP-39 mnemonic against the English wordlist + checksum. */
export function validateMnemonic(mnemonic: string): boolean {
  return scureValidate(normalizeMnemonic(mnemonic), wordlist);
}

/** Derive the 64-byte BIP-39 seed used as the ZecAuth ZIP-32 seed. */
export function mnemonicToSeed(mnemonic: string, passphrase = ""): Uint8Array {
  return mnemonicToSeedSync(normalizeMnemonic(mnemonic), passphrase);
}

/** Round-trip a mnemonic to entropy and back (e.g. to re-encode). */
export function mnemonicToEntropyBytes(mnemonic: string): Uint8Array {
  return mnemonicToEntropy(normalizeMnemonic(mnemonic), wordlist);
}

/** Encode raw entropy bytes (16/20/24/28/32 bytes) as a mnemonic. */
export function entropyToMnemonicWords(entropy: Uint8Array): string {
  return entropyToMnemonic(entropy, wordlist);
}

/** Lowercase + collapse whitespace so user input matches the canonical form. */
export function normalizeMnemonic(mnemonic: string): string {
  return mnemonic.trim().toLowerCase().replace(/\s+/g, " ");
}

/** The English BIP-39 wordlist, for autocomplete UIs. */
export { wordlist as bip39Wordlist };

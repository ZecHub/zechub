/**
 * @zecauth/react-native — Sign in with Zcash, for wallets.
 *
 * A self-contained, byte-compatible implementation of the ZecAuth protocol for React
 * Native (and any JS runtime): RedPallas signatures + ZIP-32 ad-hoc auth-key derivation,
 * challenge/transaction parsing, `zecauth://` deep links, BIP-39 mnemonics, secure
 * storage interfaces, and React hooks.
 *
 * Quick start:
 * ```ts
 * import { ZecAuthWallet, mnemonicToSeed, setRandomSource } from "@zecauth/react-native";
 * import { getRandomBytes } from "expo-crypto"; // or react-native-get-random-values
 *
 * setRandomSource(getRandomBytes);
 * const wallet = new ZecAuthWallet({ seed: mnemonicToSeed(mnemonic), network: "mainnet" });
 * const challenge = wallet.parseChallenge(scanned);
 * await wallet.submit(await wallet.approveAuth(challenge), challenge.callbackUrl!);
 * ```
 */

// ── Protocol + wallet ──
export * from "./protocol/index.js";

// ── Storage ──
export {
  WalletVault,
  SessionStore,
  type SecureStorage,
  type ZecAuthSession,
} from "./storage.js";

// ── React bindings ──
export * from "./react/index.js";

// ── Crypto (advanced / interop) ──
export {
  type AuthKeyPair,
  deriveAuthKeyPair,
  deriveAuthPubkey,
  signWithKeyPair,
  redpallasSign,
  redpallasVerify,
} from "./crypto/index.js";

/** Protocol + SDK version. */
export const ZECAUTH_VERSION = "0.1.0";

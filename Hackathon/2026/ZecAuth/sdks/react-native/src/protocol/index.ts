/** ZecAuth protocol layer: parsing, canonical messages, deep links, wallet, mnemonics. */
export { ZecAuthWallet, ZecAuthWalletError } from "./wallet.js";
export type { ZecAuthWalletOptions } from "./wallet.js";
export {
  parseChallenge,
  parseTransaction,
  buildChallengeMessage,
  buildTransactionMessage,
  detectPayload,
  ZecAuthParseError,
} from "./messages.js";
export { describeCapabilities } from "./capabilities.js";
export type { ParsedCapability, CapabilityId } from "./capabilities.js";
export { parseDeepLink, buildDeepLink, ZECAUTH_SCHEME } from "./deeplink.js";
export { ZecAuthRelay, disconnectSession } from "./relay.js";
export type {
  RelayStatus,
  RelaySessionRef,
  ZecAuthRelayOptions,
  WebSocketLike,
  WebSocketCtor,
} from "./relay.js";
export {
  generateMnemonic,
  validateMnemonic,
  mnemonicToSeed,
  mnemonicToEntropyBytes,
  entropyToMnemonicWords,
  normalizeMnemonic,
  bip39Wordlist,
  type MnemonicStrength,
} from "./mnemonic.js";
export {
  setRandomSource,
  randomBytes,
  hasRandomSource,
  type RandomSource,
} from "./random.js";
export type {
  Network,
  Scope,
  RequestedScopes,
  Disclosures,
  DisclosedBalance,
  DisclosedTx,
  ParsedChallenge,
  ParsedTransaction,
  SignedAuthResponse,
  SignedTransactionResponse,
  PayloadKind,
  ZecAuthDeepLink,
} from "./types.js";

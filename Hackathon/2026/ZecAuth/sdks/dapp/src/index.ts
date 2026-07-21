export { ZecAuth, ZecAuthError } from "./client.js";
export type {
  ZecAuthConfig,
  ZecAuthSession,
  TransactionParams,
  TransactionResult,
  ChallengeData,
  TxRequestData,
} from "./types.js";
export {
  CAPABILITIES,
  ALL_CAPABILITIES,
  isCapability,
  describeCapabilities,
  capabilitiesToScopes,
} from "./capabilities.js";
export type {
  Capability,
  CapabilityInfo,
  Scope,
  RequestedScopes,
  Disclosures,
  DisclosedBalance,
  DisclosedTx,
} from "./capabilities.js";

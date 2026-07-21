export type Network = "mainnet" | "testnet" | "regtest";

export type AddressType =
  | "p2pkh"      // transparent (t1..., tm...)
  | "p2sh"       // transparent script (t3..., t2...)
  | "sapling"    // shielded z-addr (zs..., ztestsapling...)
  | "orchard"    // orchard receiver (typically only inside unified addresses)
  | "unified";   // unified address (u1..., utest1...)

export interface ParsedAddress {
  /** Original address string as provided. */
  raw: string;
  type: AddressType;
  network: Network;
  /**
   * For p2pkh/p2sh, the 20-byte HASH160 of pubkey or script.
   * For Sapling, the raw decoded bytes.
   * For unified, undefined; see `receivers`.
   */
  hash?: Uint8Array;
  /** For unified addresses, the constituent receivers. */
  receivers?: ParsedAddress[];
}

/** Fields of a SIWZ message. Wire format modeled on EIP-4361 with "Network:" replacing "Chain ID:". */
export interface SiwzFields {
  /** RFC 4501 dnsauthority of the relying party. */
  domain: string;
  /** Zcash address the user is signing in with. */
  address: string;
  /** Optional human-readable assertion the user signs. */
  statement?: string;
  /** RFC 3986 URI of the resource being authorised. */
  uri: string;
  /** SIWZ message format version. Must be "1". */
  version: "1";
  network: Network;
  /** Random replay-prevention nonce (>= 8 alphanumeric chars). */
  nonce: string;
  /** ISO 8601 timestamp with timezone. */
  issuedAt: string;
  expirationTime?: string;
  notBefore?: string;
  requestId?: string;
  /** Optional list of RFC 3986 URIs the user authorises. */
  resources?: string[];
}

export interface VerifyResult {
  valid: boolean;
  address?: string;
  addressType?: AddressType;
  error?: SiwzErrorCode;
  errorMessage?: string;
}

export type SiwzErrorCode =
  | "INVALID_MESSAGE"
  | "INVALID_ADDRESS"
  | "INVALID_SIGNATURE"
  | "ADDRESS_MISMATCH"
  | "EXPIRED"
  | "NOT_YET_VALID"
  | "UNSUPPORTED_ADDRESS_TYPE"
  | "NETWORK_MISMATCH"
  | "NONCE_MISMATCH"
  | "DOMAIN_MISMATCH"
  | "VERIFIER_UNAVAILABLE"
  | "JWT_INVALID"
  | "JWT_AUDIENCE_MISMATCH"
  | "JWT_ISSUER_MISMATCH";

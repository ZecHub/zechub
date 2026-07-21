import { createHmac, timingSafeEqual } from "node:crypto";
import { SiwzMessage, verifyMessage } from "@siwz/core";
import type { CredentialsConfig } from "next-auth/providers/credentials";
import type { User } from "next-auth";
import { verifyNonceToken } from "./nonce.js";
import { defaultMemoEnvelope } from "./memo.js";

// Local mirror of @siwz/core's saplingVerifier callback shape so the emitted
// .d.ts stays self-contained under pnpm + bundler resolution.
type LocalAddressType = "p2pkh" | "p2sh" | "sapling" | "orchard" | "unified";
type LocalNetwork = "mainnet" | "testnet" | "regtest";
interface LocalParsedAddress {
  raw: string;
  type: LocalAddressType;
  network: LocalNetwork;
  hash?: Uint8Array;
  receivers?: LocalParsedAddress[];
}
export type SiwzSaplingVerifier = (args: {
  message: string;
  signature: Uint8Array;
  address: LocalParsedAddress;
}) => Promise<boolean>;

/** Credential payload posted by @siwz/react to NextAuth's credentials endpoint. */
export interface SiwzCredentials {
  /** The serialized SIWZ message exactly as it was signed. */
  message: string;
  /** Base64-encoded signature (Bitcoin/Zcash signmessage 65-byte format). */
  signature: string;
  /** The signed nonce token issued for this attempt. */
  nonceToken: string;
}

/** User object returned from NextAuth's authorize() on success. `id` is the Zcash address. */
export interface SiwzUser {
  id: string;
  name: string;
  /** Address type that signed (p2pkh, sapling, ...). */
  addressType: string;
  /** Zcash network the address belongs to. */
  network: string;
}

export interface SiwzProviderOptions {
  /** Domain embedded in the SIWZ challenge. Must match what the client uses. */
  expectedDomain: string;
  /** Shared secret for signing nonce tokens. Reuse NEXTAUTH_SECRET. */
  secret: string;
  /** Override the credentials provider ID. Default "siwz". */
  id?: string;
  /** ZIP 304 Sapling verifier. Required for z-addr sign-in. */
  saplingVerifier?: SiwzSaplingVerifier;
}

type SiwzCredentialFields = {
  message: { label: string; type: string };
  signature: { label: string; type: string };
  nonceToken: { label: string; type: string };
};

/**
 * NextAuth credentials provider for the SIWZ signed-message flow.
 * Returned as a typed `CredentialsConfig`, so consumers can pass it to
 * `CredentialsProvider(...)` (or Auth.js `Credentials(...)`) without `as any`.
 */
export function SiwzProvider(opts: SiwzProviderOptions): CredentialsConfig<SiwzCredentialFields> {
  if (!opts.expectedDomain) throw new Error("SiwzProvider: expectedDomain is required");
  if (!opts.secret || opts.secret.length < 16) {
    throw new Error("SiwzProvider: secret must be ≥ 16 characters");
  }

  return {
    id: opts.id ?? "siwz",
    name: "Sign in with Zcash",
    type: "credentials",
    credentials: {
      message:    { label: "Message",     type: "text" },
      signature:  { label: "Signature",   type: "text" },
      nonceToken: { label: "Nonce Token", type: "text" },
    },
    authorize: async (credentials) => {
      try {
        if (!credentials?.message || !credentials.signature || !credentials.nonceToken) return null;

        const nonceResult = verifyNonceToken(credentials.nonceToken, { secret: opts.secret });
        if (!nonceResult.ok) {
          console.warn(`[siwz] nonce rejected: ${nonceResult.error}`);
          return null;
        }

        const msg = SiwzMessage.parse(credentials.message);
        if (msg.nonce !== nonceResult.nonce) {
          console.warn("[siwz] message nonce does not match issued nonce");
          return null;
        }

        const result = await verifyMessage(msg, credentials.signature, {
          expectedDomain: opts.expectedDomain,
          expectedNonce: nonceResult.nonce,
          saplingVerifier: opts.saplingVerifier,
        });
        if (!result.valid) {
          console.warn(`[siwz] verifyMessage failed: ${result.error} – ${result.errorMessage}`);
          return null;
        }

        // Extras (addressType, network) come back attached to `user` at runtime;
        // consumers can augment the next-auth `User` interface to type them.
        return {
          id: msg.address,
          name: msg.address,
          addressType: result.addressType ?? "unknown",
          network: msg.network,
        } as User;
      } catch (err) {
        console.error("[siwz] authorize threw:", err);
        return null;
      }
    },
  };
}

export interface SiwzMemoProviderOptions {
  /** Shared secret. Must match the secret used by `pollMemoHandler`. */
  secret: string;
  /** Override provider id. Default: "memo". */
  id?: string;
  /** Override envelope verification. Default verifies HMAC-SHA256(secret, "memo::"+identity). */
  verifyEnvelope?: (identity: string, envelope: string, secret: string) => boolean | Promise<boolean>;
}

type MemoCredentialFields = {
  identity: { label: string; type: string };
  envelope: { label: string; type: string };
};

/** NextAuth credentials provider for the SIWZ memo-challenge flow.
 *  Pair with `pollMemoHandler` from `@siwz/next-auth/memo`. */
export function SiwzMemoProvider(opts: SiwzMemoProviderOptions): CredentialsConfig<MemoCredentialFields> {
  if (!opts.secret || opts.secret.length < 16) {
    throw new Error("SiwzMemoProvider: secret must be ≥ 16 characters");
  }
  const verify = opts.verifyEnvelope ?? defaultVerifyEnvelope;
  return {
    id: opts.id ?? "memo",
    name: "Sign in with Zcash",
    type: "credentials",
    credentials: {
      identity: { label: "Identity", type: "text" },
      envelope: { label: "Envelope", type: "text" },
    },
    authorize: async (credentials) => {
      if (!credentials?.identity || !credentials.envelope) return null;
      try {
        const ok = await verify(credentials.identity, credentials.envelope, opts.secret);
        if (!ok) return null;
        return { id: credentials.identity, name: credentials.identity } as User;
      } catch (err) {
        console.error("[siwz-memo] authorize threw:", err);
        return null;
      }
    },
  };
}

function defaultVerifyEnvelope(identity: string, envelope: string, secret: string): boolean {
  const expected = defaultMemoEnvelope(identity, secret);
  if (envelope.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(envelope, "hex"), Buffer.from(expected, "hex"));
}

export { issueNonce, verifyNonceToken } from "./nonce.js";
export type { NonceTokenOptions, IssuedNonce, VerifyNonceResult } from "./nonce.js";
export { defaultMemoEnvelope } from "./memo.js";
export type { JwtIssueConfig } from "./memo.js";
// Re-export JWT helpers so non-NextAuth backends only need this one package.
export { issueSiwzJwt, verifySiwzJwt } from "@siwz/core";
export type { SiwzJwtClaims, IssueSiwzJwtOpts, VerifySiwzJwtOpts } from "@siwz/core";

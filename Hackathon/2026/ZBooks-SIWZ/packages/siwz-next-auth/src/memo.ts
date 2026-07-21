// Next.js App Router route handlers for the memo-challenge sign-in flow.
// Pair with <MemoSignIn /> from @siwz/react.

import { createHmac } from "node:crypto";
import {
  issueMemoChallenge,
  issueSiwzJwt,
  parseAddress,
  verifyMemoChallenge,
  type MemoChallengeMode,
  type MemoExplorer,
  type MemoVerifyErrorCode,
  type Network,
  type RecentMemo,
  type RecentOutput,
  type SiwzJwtClaims,
} from "@siwz/core";
import {
  BlockchairExplorer,
  MultiExplorer,
  ThreeXplExplorer,
} from "@siwz/core/explorers";

// Re-export so consumers writing custom explorers don't have to dual-import.
export type {
  MemoChallengeMode,
  MemoExplorer,
  MemoVerifyErrorCode,
  RecentMemo,
  RecentOutput,
};

/** Free transparent default: 3xpl sandbox first, Blockchair public as fallback.
 *  Reads THREEXPL_API_KEY / BLOCKCHAIR_API_KEY for the paid tiers if present. */
function defaultTransparentExplorer(): MemoExplorer {
  return new MultiExplorer([
    new ThreeXplExplorer({ apiKey: process.env.THREEXPL_API_KEY }),
    new BlockchairExplorer({ apiKey: process.env.BLOCKCHAIR_API_KEY }),
  ]);
}

/** Default envelope: HMAC-SHA256(secret, "memo::" + identity), hex. */
export function defaultMemoEnvelope(identity: string, secret: string): string {
  return createHmac("sha256", secret).update(`memo::${identity}`).digest("hex");
}

export interface IssueMemoHandlerOptions {
  /** HMAC secret. Use process.env.NEXTAUTH_SECRET or equivalent. */
  secret: string;
  /** Treasury / service address. t1 for transparent-amount, zs/u1 for shielded-memo. */
  serviceAddress: string;
  network: Network;
  /** Force a mode. Default: auto-detect from serviceAddress type. */
  mode?: MemoChallengeMode;
  /** Base ZEC amount (string). Default: 0.000001 (transparent) / 0.000001 (shielded dust). */
  baseAmountZec?: string;
  /** ZIP 321 label shown by the wallet. Default: "Sign in". */
  label?: string;
  /** ZIP 321 message field. */
  message?: string;
  /** Challenge TTL. Default: 600 (10 minutes). */
  ttlSeconds?: number;
  /** Thread a UFVK or previous anonId through the issue body. */
  resolveIdentity?: (
    body: unknown,
    req: Request,
  ) => Promise<string | undefined> | string | undefined;
}

/** App Router POST handler that issues memo challenges. */
export function issueMemoHandler(
  opts: IssueMemoHandlerOptions,
): (req: Request) => Promise<Response> {
  if (!opts.secret || opts.secret.length < 16) {
    throw new Error("issueMemoHandler: secret must be ≥ 16 characters");
  }
  if (!opts.serviceAddress) {
    throw new Error("issueMemoHandler: serviceAddress is required");
  }
  try {
    parseAddress(opts.serviceAddress);
  } catch (err) {
    throw new Error(
      `issueMemoHandler: serviceAddress is not a valid Zcash address (${(err as Error).message})`,
    );
  }
  const ttlSeconds = opts.ttlSeconds ?? 600;
  return async (req: Request): Promise<Response> => {
    let body: unknown = {};
    try {
      body = await req.json();
    } catch {
      // Empty body is fine; identity stays undefined.
    }
    let identity: string | undefined;
    if (opts.resolveIdentity) {
      try {
        identity = await opts.resolveIdentity(body, req);
      } catch (err) {
        return jsonError(`resolveIdentity threw: ${(err as Error).message}`, 500);
      }
    }
    try {
      const challenge = await issueMemoChallenge({
        secret: opts.secret,
        serviceAddress: opts.serviceAddress,
        network: opts.network,
        mode: opts.mode,
        baseAmountZec: opts.baseAmountZec,
        identity,
        label: opts.label ?? "Sign in",
        message: opts.message,
        ttlSeconds,
      });
      return Response.json({
        mode: challenge.mode,
        uri: challenge.uri,
        amountZec: challenge.amountZec,
        amountZatoshi: challenge.amountZatoshi,
        memo: challenge.memo,
        serviceAddress: challenge.serviceAddress,
        token: challenge.token,
        expiresAt: challenge.expiresAt,
      });
    } catch (err) {
      return jsonError(`issueMemoChallenge failed: ${(err as Error).message}`, 500);
    }
  };
}

export interface JwtIssueConfig {
  /** Override the JWT signing secret. Defaults to PollMemoHandlerOptions.secret. */
  secret?: string;
  /** Seconds until the issued JWT expires. Default 3600 (1h). */
  ttlSeconds?: number;
  /** Issuer claim. Recommended for multi-app deployments. */
  issuer?: string;
  /** Audience claim. The backend(s) that will verify the JWT. */
  audience?: string | string[];
  /** Network the address belongs to. Default "mainnet". */
  network?: "mainnet" | "testnet" | "regtest";
  /** Extra claims to merge into the issued token. */
  extraClaims?: (identity: string) => Record<string, unknown>;
}

export interface PollMemoHandlerOptions {
  secret: string;
  /** Transparent observations. Default: free MultiExplorer (3xpl + Blockchair). */
  explorer?: MemoExplorer;
  /** Shielded observations. No default; required if your service address is shielded. */
  shieldedExplorer?: MemoExplorer;
  /** Recent outputs / memos scanned per poll. Default: 50. */
  scanLimit?: number;
  /** Override the envelope shape. Return `null` to omit. Default: defaultMemoEnvelope. */
  buildEnvelope?: (identity: string, secret: string) => string | null;
  /** When set, response also includes a signed JWT for non-NextAuth backends
   *  (Express, FastAPI via verification, Laravel via verification, etc).
   *  Pass `true` for defaults or an object for per-claim control. */
  jwt?: boolean | JwtIssueConfig;
}

/** App Router POST handler for memo-challenge polling.
 *  Returns 200 on match, 202 while waiting, 4xx for terminal errors. */
export function pollMemoHandler(
  opts: PollMemoHandlerOptions,
): (req: Request) => Promise<Response> {
  if (!opts.secret || opts.secret.length < 16) {
    throw new Error("pollMemoHandler: secret must be ≥ 16 characters");
  }
  if (opts.scanLimit !== undefined && (opts.scanLimit < 1 || !Number.isInteger(opts.scanLimit))) {
    throw new Error("pollMemoHandler: scanLimit must be a positive integer");
  }
  const scanLimit = opts.scanLimit ?? 50;
  const transparentExplorer = opts.explorer ?? defaultTransparentExplorer();
  const jwtCfg = opts.jwt === true ? {} : opts.jwt || null;

  async function maybeIssueJwt(
    identity: string,
    flow: "memo",
  ): Promise<string | null> {
    if (!jwtCfg) return null;
    const claims: SiwzJwtClaims = {
      sub: identity,
      flow,
      network: jwtCfg.network ?? "mainnet",
      ...(jwtCfg.issuer ? { iss: jwtCfg.issuer } : {}),
      ...(jwtCfg.audience ? { aud: jwtCfg.audience } : {}),
      ...(jwtCfg.extraClaims ? jwtCfg.extraClaims(identity) : {}),
    };
    return issueSiwzJwt(claims, {
      secret: jwtCfg.secret ?? opts.secret,
      ttlSeconds: jwtCfg.ttlSeconds,
    });
  }

  return async (req: Request): Promise<Response> => {
    let body: { token?: unknown };
    try {
      body = (await req.json()) as { token?: unknown };
    } catch {
      return jsonError("Invalid JSON body", 400);
    }
    const token = typeof body.token === "string" ? body.token : "";
    if (!token) return jsonError("token is required", 400);

    let recipient: string;
    let mode: "transparent-amount" | "shielded-memo";
    try {
      const [payloadPart, signaturePart] = token.split(".");
      if (!payloadPart || !signaturePart) throw new Error("malformed");
      const payload = JSON.parse(decodeBase64Url(payloadPart)) as { to?: string; m?: string };
      if (typeof payload.to !== "string") throw new Error("no recipient");
      recipient = payload.to;
      mode = payload.m === "sm" ? "shielded-memo" : "transparent-amount";
    } catch {
      return jsonError("malformed token", 400);
    }

    if (mode === "transparent-amount") {
      if (!transparentExplorer.getRecentOutputsToAddress) {
        return jsonError(
          "explorer does not implement getRecentOutputsToAddress",
          500,
        );
      }
      let outputs;
      try {
        outputs = await transparentExplorer.getRecentOutputsToAddress(recipient, scanLimit);
      } catch (err) {
        return jsonError(`Explorer lookup failed: ${(err as Error).message}`, 502);
      }
      for (const output of outputs) {
        const result = await verifyMemoChallenge({
          secret: opts.secret,
          token,
          observedAmountZatoshi: output.amountZatoshi,
          observedRecipient: output.address,
        });
        if (result.ok && result.identity) {
          const envelope = (opts.buildEnvelope ?? defaultMemoEnvelope)(
            result.identity,
            opts.secret,
          );
          const jwt = await maybeIssueJwt(result.identity, "memo");
          return Response.json({
            ok: true,
            mode,
            identity: result.identity,
            ...(envelope !== null ? { envelope } : {}),
            ...(jwt ? { jwt } : {}),
            txid: output.txid,
          });
        }
      }
      return Response.json({ ok: false, retryable: true }, { status: 202 });
    }

    if (!opts.shieldedExplorer?.getRecentMemosToAddress) {
      return jsonError(
        "shielded sign-in needs `shieldedExplorer` with getRecentMemosToAddress (e.g. apps/lightwallet-rpc)",
        500,
      );
    }
    let memos;
    try {
      memos = await opts.shieldedExplorer.getRecentMemosToAddress(recipient, scanLimit);
    } catch (err) {
      return jsonError(`Explorer lookup failed: ${(err as Error).message}`, 502);
    }
    for (const m of memos) {
      const result = await verifyMemoChallenge({
        secret: opts.secret,
        token,
        observedMemo: m.memo,
        observedRecipient: recipient,
      });
      if (result.ok && result.identity) {
        const envelope = (opts.buildEnvelope ?? defaultMemoEnvelope)(
          result.identity,
          opts.secret,
        );
        const jwt = await maybeIssueJwt(result.identity, "memo");
        return Response.json({
          ok: true,
          mode,
          identity: result.identity,
          ...(envelope !== null ? { envelope } : {}),
          ...(jwt ? { jwt } : {}),
          txid: m.txid,
        });
      }
    }
    return Response.json({ ok: false, retryable: true }, { status: 202 });
  };
}

function jsonError(error: string, status: number): Response {
  return Response.json({ ok: false, error }, { status });
}

function decodeBase64Url(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  if (typeof atob === "function") return atob(padded);
  return Buffer.from(padded, "base64").toString("utf8");
}

import { useCallback, useMemo, useState } from "react";
import { SiwzMessage, isZcashAddress } from "@siwz/core";
import {
  detectSnapEnvironment,
  snapConnect,
  type SnapIdentity,
  type SnapStatus,
} from "./snap.js";

// Locally mirror @siwz/core's Network so the emitted .d.ts is self-contained.
// Without this, consumers building under pnpm + Next.js
// "moduleResolution": "bundler" can lose the cross-package type and see it
// collapse to `undefined`. Keep in sync with @siwz/core/src/types.ts.
export type Network = "mainnet" | "testnet" | "regtest";

/** Linear states the sign-in flow walks through. */
export type SiwzStatus =
  | "addressEntry"
  | "fetchingNonce"
  | "awaitingSignature"
  | "verifying"
  | "success"
  | "error";

export interface UseSiwzOptions {
  /** The domain to embed in the message (e.g. window.location.host). */
  domain: string;
  /** The URI to embed (e.g. window.location.origin). */
  uri: string;
  /** Zcash network. Must match the address the user provides. */
  network: Network;
  /** Optional human-readable statement (shown verbatim inside the challenge). */
  statement?: string;
  /** How long the challenge is valid for, in seconds. Default 600 (10 min). */
  expirationSeconds?: number;
  /** Fetch a fresh, server-issued nonce. Never generate client-side. */
  getNonce: () => Promise<string>;
  /** Submit the (message, signature) pair to the server. Typically wraps NextAuth's signIn. */
  submit: (args: { message: string; signature: string }) => Promise<
    { ok: true } | { ok: false; error: string }
  >;
  /**
   * Optional MetaMask Zcash-Snap handler. Receives the Snap identity tuple;
   * typically forwarded to a separate NextAuth provider.
   */
  onSnapAuth?: (info: SnapIdentity) => Promise<{ ok: true } | { ok: false; error: string }>;
}

export interface UseSiwzReturn {
  status: SiwzStatus;
  address: string;
  setAddress: (addr: string) => void;
  signature: string;
  setSignature: (sig: string) => void;
  message: string | null;
  error: string | null;
  isAddressValid: boolean;
  /** Begin: validate address, request a nonce, build the SIWZ challenge string. */
  buildChallenge: () => Promise<void>;
  /** Submit the signature for verification. */
  submitSignature: () => Promise<void>;
  /** Reset back to address-entry. */
  reset: () => void;
  /** Connect to the Zcash Snap and authenticate via `onSnapAuth`. Returns true on success. */
  trySnapSignIn: (snapId?: string) => Promise<boolean>;
  snapStatus: SnapStatus | null;
}

export function useSiwz(opts: UseSiwzOptions): UseSiwzReturn {
  const [status, setStatus] = useState<SiwzStatus>("addressEntry");
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [snapStatus, setSnapStatus] = useState<SnapStatus | null>(null);

  const isAddressValid = useMemo(() => {
    if (!address) return false;
    try {
      return isZcashAddress(address);
    } catch {
      return false;
    }
  }, [address]);

  const reset = useCallback(() => {
    setStatus("addressEntry");
    setSignature("");
    setMessage(null);
    setError(null);
  }, []);

  const buildChallenge = useCallback(async () => {
    setError(null);
    if (!isAddressValid) {
      setError("Please enter a valid Zcash address");
      return;
    }
    setStatus("fetchingNonce");
    try {
      const nonce = await opts.getNonce();
      const issuedAt = new Date();
      const expirationTime = new Date(issuedAt.getTime() + (opts.expirationSeconds ?? 600) * 1000);
      const siwz = new SiwzMessage({
        domain: opts.domain,
        address: address.trim(),
        statement: opts.statement,
        uri: opts.uri,
        network: opts.network,
        nonce,
        issuedAt: issuedAt.toISOString(),
        expirationTime: expirationTime.toISOString(),
      });
      setMessage(siwz.toString());
      setStatus("awaitingSignature");
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }, [opts, address, isAddressValid]);

  const submitSignature = useCallback(async () => {
    setError(null);
    if (!message) {
      setError("No challenge built yet");
      return;
    }
    const sig = signature.trim();
    if (!sig) {
      setError("Paste the signature from your wallet first");
      return;
    }
    setStatus("verifying");
    try {
      const result = await opts.submit({ message, signature: sig });
      if (result.ok) {
        setStatus("success");
      } else {
        setError(result.error);
        setStatus("error");
      }
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }, [message, signature, opts]);

  const trySnapSignIn = useCallback(
    async (snapId?: string): Promise<boolean> => {
      setError(null);
      if (!opts.onSnapAuth) {
        setError("Snap sign-in not configured (missing onSnapAuth handler).");
        setStatus("error");
        return false;
      }
      setStatus("fetchingNonce");
      try {
        const identity = await snapConnect(snapId);
        setSnapStatus({ kind: "ready", snapId: identity.snapId, version: identity.snapVersion });
        // The Snap exposes no getAddress RPC, so display the seed fingerprint as the identity.
        setAddress(`snap:${identity.fingerprint.slice(0, 16)}`);
        setStatus("verifying");
        const submission = await opts.onSnapAuth(identity);
        if (!submission.ok) {
          setError(submission.error);
          setStatus("error");
          return false;
        }
        setStatus("success");
        return true;
      } catch (err) {
        const e = err as { code?: string; message?: string };
        setError(e.message ?? "Snap sign-in failed.");
        setStatus("error");
        return false;
      }
    },
    [opts],
  );

  return {
    status,
    address,
    setAddress,
    signature,
    setSignature,
    message,
    error,
    isAddressValid,
    buildChallenge,
    submitSignature,
    reset,
    trySnapSignIn,
    snapStatus,
  };
}

export type { SnapStatus, SnapIdentity };

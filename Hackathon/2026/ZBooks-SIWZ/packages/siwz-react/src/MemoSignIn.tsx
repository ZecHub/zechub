"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

/** Server response from the issue endpoint. Mirrors the shape SIWZ's reference
 *  endpoints (the ones in apps/demo, apps/zecwall, ZTest) return. Required
 *  fields are `uri` (encoded into the QR) and `token` (the HMAC-signed
 *  challenge token the poll endpoint validates against). */
export interface MemoChallengeData {
  uri: string;
  amountZec: string;
  amountZatoshi?: string;
  memo?: string;
  serviceAddress: string;
  serviceAddressType?: string;
  token: string;
  expiresAt?: string;
  mode?: "transparent-amount" | "shielded-memo";
  demoMode?: boolean;
}

/** Server response from the poll endpoint. `ok: true` + `identity` means the
 *  payment was matched on chain. `ok: false` + `retryable: true` (typically
 *  HTTP 202) means keep polling. Anything else terminates the flow. */
export interface MemoPollResult {
  ok: boolean;
  identity?: string;
  envelope?: string;
  txid?: string;
  mode?: string;
  retryable?: boolean;
  error?: string;
}

export interface MemoSignInProps {
  /** Endpoint that issues the memo challenge (POST). Default: "/api/auth/memo/issue". */
  issueEndpoint?: string;
  /** Endpoint that polls for completion (POST). Default: "/api/auth/memo/poll". */
  pollEndpoint?: string;
  /** Override the issue HTTP call entirely. Useful for custom auth or
   *  non-fetch transports. Takes precedence over `issueEndpoint`. */
  issueChallenge?: () => Promise<MemoChallengeData>;
  /** Override the poll HTTP call entirely. Takes precedence over `pollEndpoint`. */
  pollSignIn?: (token: string) => Promise<MemoPollResult>;
  /** Body to POST to the default issue endpoint. Forward `{ ufvk }` or
   *  `{ previousAnonId }` here for identity continuity across devices. */
  issueBody?: Record<string, unknown>;
  /** Called on successful sign-in. The consumer mints whatever session their
   *  auth layer expects (NextAuth `signIn`, custom JWT cookie, etc.). */
  onSuccess?: (result: {
    identity: string;
    envelope?: string;
    txid?: string;
    mode?: string;
  }) => void;
  /** Called on terminal failure (timeout, server error, network outage). */
  onError?: (error: string) => void;
  /** Button label when idle. Default: "Sign in with Zcash". */
  buttonLabel?: string;
  /** First poll delay in ms. Wallets take 1-3s to broadcast; the first poll
   *  rarely succeeds and we don't want to flood the endpoint. Default: 1500. */
  initialPollMs?: number;
  /** Steady-state poll interval in ms after the initial window. Default: 6000. */
  pollMs?: number;
  /** Total time after which the flow gives up and surfaces a timeout. Default: 180_000 (3 min). */
  timeoutMs?: number;
  /** Pixel width of the rendered QR. Default: 256. */
  qrSize?: number;
  /** Override classNames per slot. Slot names follow the default CSS. */
  classNames?: Partial<{
    root: string;
    button: string;
    challenge: string;
    qr: string;
    details: string;
    pending: string;
    error: string;
    success: string;
  }>;
}

type Status = "idle" | "issuing" | "awaiting" | "success" | "error";

const DEFAULT_ISSUE = "/api/auth/memo/issue";
const DEFAULT_POLL = "/api/auth/memo/poll";

async function postJson<T>(url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  const json = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    const err = (json as { error?: string }).error ?? `HTTP ${res.status}`;
    throw new Error(err);
  }
  return json;
}

/** Drop-in memo-challenge sign-in. The user scans a QR encoding a ZIP 321
 *  payment URI, the wallet pre-fills, the user confirms. This component shows
 *  the QR, polls the server until the payment is matched, then surfaces the
 *  identity to the consumer's `onSuccess` callback. Session minting (NextAuth
 *  `signIn`, cookie, JWT, etc.) is the consumer's job. */
export function MemoSignIn(props: MemoSignInProps) {
  const {
    issueEndpoint = DEFAULT_ISSUE,
    pollEndpoint = DEFAULT_POLL,
    issueChallenge,
    pollSignIn,
    issueBody,
    onSuccess,
    onError,
    buttonLabel = "Sign in with Zcash",
    initialPollMs = 1500,
    pollMs = 6000,
    timeoutMs = 180_000,
    qrSize = 256,
    classNames = {},
  } = props;

  const [status, setStatus] = useState<Status>("idle");
  const [challenge, setChallenge] = useState<MemoChallengeData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [identity, setIdentity] = useState<string | null>(null);
  const pollingRef = useRef(false);

  const reportError = useCallback(
    (msg: string) => {
      setError(msg);
      setStatus("error");
      onError?.(msg);
    },
    [onError],
  );

  const start = useCallback(async () => {
    setError(null);
    setIdentity(null);
    setStatus("issuing");
    try {
      const ch = issueChallenge
        ? await issueChallenge()
        : await postJson<MemoChallengeData>(issueEndpoint, issueBody);
      const dataUrl = await QRCode.toDataURL(ch.uri, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: qrSize,
      });
      setChallenge(ch);
      setQrDataUrl(dataUrl);
      setStatus("awaiting");
    } catch (e) {
      reportError((e as Error).message);
    }
  }, [issueChallenge, issueEndpoint, issueBody, qrSize, reportError]);

  useEffect(() => {
    if (status !== "awaiting" || !challenge) return;
    pollingRef.current = true;
    const startedAt = Date.now();
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = async () => {
      if (!pollingRef.current) return;
      try {
        const result = pollSignIn
          ? await pollSignIn(challenge.token)
          : await postJson<MemoPollResult>(pollEndpoint, { token: challenge.token });
        if (result.ok && result.identity) {
          pollingRef.current = false;
          setIdentity(result.identity);
          setStatus("success");
          onSuccess?.({
            identity: result.identity,
            envelope: result.envelope,
            txid: result.txid,
            mode: result.mode,
          });
          return;
        }
        // Non-retryable terminal error.
        if (!result.retryable && result.error) {
          pollingRef.current = false;
          reportError(result.error);
          return;
        }
      } catch (e) {
        // Transient network blip; keep polling unless the global timeout hits.
        console.warn("[siwz] poll error:", e);
      }
      if (Date.now() - startedAt > timeoutMs) {
        pollingRef.current = false;
        reportError("Sign-in timed out. Please try again.");
        return;
      }
      if (pollingRef.current) {
        const next = Date.now() - startedAt < 10_000 ? initialPollMs : pollMs;
        timer = setTimeout(tick, next);
      }
    };

    timer = setTimeout(tick, initialPollMs);
    return () => {
      pollingRef.current = false;
      if (timer) clearTimeout(timer);
    };
  }, [status, challenge, pollSignIn, pollEndpoint, onSuccess, reportError, initialPollMs, pollMs, timeoutMs]);

  const reset = () => {
    pollingRef.current = false;
    setStatus("idle");
    setChallenge(null);
    setQrDataUrl("");
    setError(null);
    setIdentity(null);
  };

  if (status === "idle" || status === "issuing") {
    return (
      <div className={classNames.root ?? "siwz-root"}>
        <button
          type="button"
          onClick={start}
          disabled={status === "issuing"}
          className={classNames.button ?? "siwz-button"}
        >
          {status === "issuing" ? "Preparing…" : buttonLabel}
        </button>
      </div>
    );
  }

  if (status === "success" && identity) {
    return (
      <div className={classNames.root ?? "siwz-root"}>
        <div className={classNames.success ?? "siwz-success"}>
          Signed in. Identity: <code>{identity}</code>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={classNames.root ?? "siwz-root"}>
        <div className={classNames.error ?? "siwz-error"}>{error ?? "Unknown error"}</div>
        <button
          type="button"
          onClick={reset}
          className={`${classNames.button ?? "siwz-button"} siwz-button--secondary`}
        >
          Try again
        </button>
      </div>
    );
  }

  // status === "awaiting"
  return (
    <div className={classNames.root ?? "siwz-root"}>
      <div className={classNames.challenge ?? "siwz-memo-challenge"}>
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrDataUrl}
            alt="Scan to sign in"
            className={classNames.qr ?? "siwz-memo-qr"}
            width={qrSize}
            height={qrSize}
          />
        ) : null}
        <div className={classNames.details ?? "siwz-memo-details"}>
          <div className="siwz-memo-line">
            <strong>Send</strong>{" "}
            <code>{challenge?.amountZec ?? ""} ZEC</code>
          </div>
          <div className="siwz-memo-line">
            <strong>To</strong>{" "}
            <code>{challenge?.serviceAddress ?? ""}</code>
          </div>
          {challenge?.memo ? (
            <div className="siwz-memo-line">
              <strong>Memo</strong> <code>{challenge.memo}</code>
            </div>
          ) : null}
          {challenge?.uri ? (
            <a className="siwz-memo-open" href={challenge.uri}>
              Open in wallet →
            </a>
          ) : null}
          {challenge?.demoMode ? (
            <div className="siwz-memo-demo">
              Demo mode: poll endpoint auto-matches without a real on-chain send.
            </div>
          ) : null}
          <div className={classNames.pending ?? "siwz-memo-pending"}>
            Waiting for payment…
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={reset}
        className={`${classNames.button ?? "siwz-button"} siwz-button--secondary`}
      >
        Cancel
      </button>
    </div>
  );
}

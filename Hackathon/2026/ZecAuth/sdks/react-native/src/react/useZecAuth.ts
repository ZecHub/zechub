/**
 * React hook that drives a ZecAuth request from a scanned/opened payload through
 * review → approve/deny → submit, exposing a small state machine the UI can render.
 *
 * `react` is an optional peer dependency; import this only from a React app.
 */
import { useCallback, useMemo, useState } from "react";
import type {
  ParsedChallenge,
  ParsedTransaction,
  SignedAuthResponse,
  SignedTransactionResponse,
} from "../protocol/types.js";
import type { ZecAuthWallet } from "../protocol/wallet.js";

export type RequestStatus =
  | "idle"
  | "resolving"
  | "reviewing"
  | "signing"
  | "submitting"
  | "success"
  | "error";

export interface ZecAuthRequestState {
  status: RequestStatus;
  /** Present when the payload is a sign-in challenge under review. */
  challenge?: ParsedChallenge;
  /** Present when the payload is a transaction request under review. */
  transaction?: ParsedTransaction;
  /** The signed response after a successful approve/deny. */
  result?: SignedAuthResponse | SignedTransactionResponse;
  error?: string;
}

export interface UseZecAuthRequest extends ZecAuthRequestState {
  /** "auth" | "transaction" | undefined, based on what's under review. */
  kind: "auth" | "transaction" | undefined;
  /**
   * Parse a scanned QR / deep link / raw JSON payload and move to review. Short links
   * (`?req=<url>`) pass through a "resolving" state while the payload is fetched.
   */
  open: (input: string) => void;
  /** Approve the request under review (signs and, if a callback exists, submits). */
  approve: () => Promise<void>;
  /** Deny the transaction request under review. */
  deny: () => Promise<void>;
  /** Reset back to idle. */
  reset: () => void;
}

/** Drive a single ZecAuth request lifecycle with the given wallet. */
export function useZecAuthRequest(wallet: ZecAuthWallet | null): UseZecAuthRequest {
  const [state, setState] = useState<ZecAuthRequestState>({ status: "idle" });

  const reset = useCallback(() => setState({ status: "idle" }), []);

  const open = useCallback(
    (input: string) => {
      if (!wallet) {
        setState({ status: "error", error: "Wallet is locked" });
        return;
      }

      const review = (
        kind: "auth" | "transaction" | null,
        payload: string,
        callbackUrl?: string,
      ) => {
        if (kind === "auth") {
          const challenge = wallet.parseChallenge(payload);
          if (callbackUrl && !challenge.callbackUrl) challenge.callbackUrl = callbackUrl;
          setState({ status: "reviewing", challenge });
        } else if (kind === "transaction") {
          const transaction = wallet.parseTransaction(payload);
          if (callbackUrl && !transaction.callbackUrl) transaction.callbackUrl = callbackUrl;
          setState({ status: "reviewing", transaction });
        } else {
          setState({ status: "error", error: "Not a ZecAuth request" });
        }
      };

      try {
        const link = wallet.parseLink(input);
        if (link?.requestUrl) {
          // Short link — fetch the full payload before review.
          setState({ status: "resolving" });
          wallet
            .fetchRequest(link.requestUrl)
            .then((r) => review(r.kind, r.payload, r.callbackUrl))
            .catch((e) => setState({ status: "error", error: errorMessage(e) }));
          return;
        }
        const payload = link?.payload ?? input;
        const kind = link?.kind ?? wallet.detect(payload);
        review(kind, payload, link?.callbackUrl);
      } catch (e) {
        setState({ status: "error", error: errorMessage(e) });
      }
    },
    [wallet],
  );

  const finish = useCallback(
    async (
      sign: () => Promise<SignedAuthResponse | SignedTransactionResponse>,
      callbackUrl?: string,
    ) => {
      if (!wallet) return;
      setState((s) => ({ ...s, status: "signing" }));
      try {
        const result = await sign();
        if (callbackUrl) {
          setState((s) => ({ ...s, status: "submitting", result }));
          await wallet.submit(result, callbackUrl);
        }
        setState((s) => ({ ...s, status: "success", result }));
      } catch (e) {
        setState((s) => ({ ...s, status: "error", error: errorMessage(e) }));
      }
    },
    [wallet],
  );

  const approve = useCallback(async () => {
    if (!wallet) return;
    if (state.challenge) {
      await finish(() => wallet.approveAuth(state.challenge!), state.challenge.callbackUrl);
    } else if (state.transaction) {
      await finish(
        () => wallet.approveTransaction(state.transaction!),
        state.transaction.callbackUrl,
      );
    }
  }, [wallet, state.challenge, state.transaction, finish]);

  const deny = useCallback(async () => {
    if (!wallet || !state.transaction) return;
    await finish(() => wallet.denyTransaction(state.transaction!), state.transaction.callbackUrl);
  }, [wallet, state.transaction, finish]);

  const kind = useMemo<"auth" | "transaction" | undefined>(
    () => (state.challenge ? "auth" : state.transaction ? "transaction" : undefined),
    [state.challenge, state.transaction],
  );

  return { ...state, kind, open, approve, deny, reset };
}

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

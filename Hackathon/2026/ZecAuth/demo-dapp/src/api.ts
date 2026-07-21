// Transport-only fallbacks.
//
// Auth and transactions go through the `@zecauth/dapp` SDK (see App.tsx). The SDK awaits the
// wallet over a WebSocket; these HTTP-poll helpers are a fallback the UI uses when that socket
// isn't available. Everything else (challenges, verification, sessions, payments) is the SDK.

import type { Disclosures } from "@zecauth/dapp";

/** A wallet's signed sign-in response, as POSTed to the dApp callback. */
export interface VerifyPayload {
  pubkey: string;
  signature: string;
  message: string;
  /** Capability ids the user approved / rejected in their wallet. */
  granted?: string[];
  denied?: string[];
  /** Capability disclosures the wallet attached (e.g. a shared receiving address). */
  disclosures?: Disclosures;
}

/** A wallet's signed transaction approval/denial. */
export interface TxApprovalPayload {
  pubkey: string;
  status: string;
  signature: string;
  message: string;
  txid?: string;
}

/** Poll the server for a wallet's sign-in response to the given nonce. */
export async function pollForResponse(nonce: string): Promise<VerifyPayload | null> {
  try {
    const res = await fetch(`/auth/callback/${nonce}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "completed" && data.response) {
      return data.response;
    }
    return null;
  } catch {
    return null;
  }
}

/** Poll the server for a wallet's approval of the given transaction request. */
export async function pollForTxResponse(requestId: string): Promise<TxApprovalPayload | null> {
  try {
    const res = await fetch(`/tx/callback/${requestId}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "completed" && data.response) {
      return data.response;
    }
    return null;
  } catch {
    return null;
  }
}

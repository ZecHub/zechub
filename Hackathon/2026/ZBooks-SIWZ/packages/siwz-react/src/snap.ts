/**
 * MetaMask Snap integration for Zcash, targeting the ChainSafe WebZjs Zcash Snap.
 * The Snap exposes no signMessage RPC, so auth here is permission-based: connecting
 * the Snap grants the dApp read access to a seed fingerprint and UFVK.
 */

export const DEFAULT_SNAP_ID = "npm:@chainsafe/webzjs-zcash-snap";

interface EthereumProvider {
  isMetaMask?: boolean;
  request: <T = unknown>(args: { method: string; params?: unknown }) => Promise<T>;
}

interface Eip6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface Eip6963ProviderDetail {
  info: Eip6963ProviderInfo;
  provider: EthereumProvider;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider & { providers?: EthereumProvider[] };
  }
}

/**
 * Find the MetaMask provider via EIP-6963, falling back to legacy
 * `window.ethereum` detection when no announce event arrives.
 */
export async function findMetaMaskProvider(): Promise<EthereumProvider | null> {
  if (typeof window === "undefined") return null;

  const found: EthereumProvider[] = [];
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<Eip6963ProviderDetail>).detail;
    if (!detail) return;
    if (detail.info.rdns === "io.metamask" || detail.info.name === "MetaMask") {
      found.push(detail.provider);
    }
  };
  window.addEventListener("eip6963:announceProvider", handler);
  window.dispatchEvent(new Event("eip6963:requestProvider"));
  await new Promise((r) => setTimeout(r, 150));
  window.removeEventListener("eip6963:announceProvider", handler);

  if (found.length > 0) return found[0] ?? null;

  const eth = window.ethereum;
  if (!eth) return null;
  if (eth.isMetaMask) return eth;
  if (eth.providers && Array.isArray(eth.providers)) {
    const mm = eth.providers.find((p) => p.isMetaMask);
    if (mm) return mm;
  }
  return null;
}

export type SnapStatus =
  | { kind: "no-metamask"; message: string }
  | { kind: "snap-not-installed"; message: string; snapId: string }
  | { kind: "ready"; snapId: string; version: string };

export async function detectSnapEnvironment(snapId: string = DEFAULT_SNAP_ID): Promise<SnapStatus> {
  if (typeof window === "undefined") {
    return { kind: "no-metamask", message: "MetaMask is not available in this environment." };
  }
  const mm = await findMetaMaskProvider();
  if (!mm) {
    return {
      kind: "no-metamask",
      message:
        "MetaMask wasn't found. If you have multiple Ethereum wallets installed (Phantom, Coinbase, Brave, …), one of them may be capturing window.ethereum — try pausing them or set MetaMask as default.",
    };
  }
  let snaps: Record<string, { version: string }> = {};
  try {
    snaps = await mm.request<Record<string, { version: string }>>({
      method: "wallet_getSnaps",
    });
  } catch (err) {
    const msg = (err as Error).message ?? "";
    if (/no corresponding handler|method not found|does not support/i.test(msg)) {
      return {
        kind: "no-metamask",
        message:
          "A wallet responded but it doesn't support the MetaMask Snaps API. Confirm MetaMask is the active provider in your browser's wallet picker.",
      };
    }
    return {
      kind: "snap-not-installed",
      message: "Couldn't query installed Snaps. Update MetaMask to the latest version.",
      snapId,
    };
  }
  const installed = snaps[snapId];
  if (!installed) {
    return {
      kind: "snap-not-installed",
      message: `The Zcash Snap isn't installed in this MetaMask yet. Click the button below to install and connect it.`,
      snapId,
    };
  }
  return { kind: "ready", snapId, version: installed.version };
}

export async function requestSnapInstall(snapId: string = DEFAULT_SNAP_ID): Promise<string> {
  const mm = await findMetaMaskProvider();
  if (!mm) throw new Error("MetaMask was not found in this browser.");
  const result = await mm.request<Record<string, { version: string }>>({
    method: "wallet_requestSnaps",
    params: { [snapId]: {} },
  });
  const v = result?.[snapId]?.version;
  if (!v) throw new Error("MetaMask declined to install the Snap.");
  return v;
}

async function invokeSnap<T = unknown>(snapId: string, method: string, params?: unknown): Promise<T> {
  const mm = await findMetaMaskProvider();
  if (!mm) throw new SnapInvokeError("no-metamask", "MetaMask was not found in this browser.");
  try {
    return await mm.request<T>({
      method: "wallet_invokeSnap",
      params: { snapId, request: { method, params } },
    });
  } catch (err) {
    const msg = (err as Error).message ?? String(err);
    if (/reject|denied|cancel/i.test(msg)) {
      throw new SnapInvokeError("user-rejected", "MetaMask request was cancelled.");
    }
    if (/method.*(not found|not supported|unsupported|no corresponding handler)/i.test(msg)) {
      throw new SnapInvokeError("method-unavailable", `The Snap doesn't expose ${method}.`);
    }
    throw new SnapInvokeError("snap-error", msg);
  }
}

export type SnapErrorCode = "no-metamask" | "user-rejected" | "snap-error" | "method-unavailable";

export class SnapInvokeError extends Error {
  readonly code: SnapErrorCode;
  constructor(code: SnapErrorCode, message: string) {
    super(message);
    this.name = "SnapInvokeError";
    this.code = code;
  }
}

/** Returns the connected account's stable per-seed identifier (no spend authority). */
export async function snapGetSeedFingerprint(snapId: string = DEFAULT_SNAP_ID): Promise<string> {
  const raw = await invokeSnap<unknown>(snapId, "getSeedFingerprint");
  return normaliseFingerprint(raw);
}

/** Returns the account's Unified Full Viewing Key (read-only, no spend authority). */
export async function snapGetViewingKey(snapId: string = DEFAULT_SNAP_ID): Promise<string> {
  const raw = await invokeSnap<unknown>(snapId, "getViewingKey");
  return normaliseString(raw, "getViewingKey");
}

export interface SnapIdentity {
  /** Stable per-seed identifier (hex string). */
  fingerprint: string;
  /** Unified Full Viewing Key. Read-only, no spend authority. */
  ufvk: string;
  /** The Snap ID this identity came from. */
  snapId: string;
  /** Installed Snap version (informational). */
  snapVersion: string;
}

/**
 * One-call sign-in helper: installs the Snap if needed, then fetches
 * the identity tuple required by the app.
 */
export async function snapConnect(snapId: string = DEFAULT_SNAP_ID): Promise<SnapIdentity> {
  let env = await detectSnapEnvironment(snapId);
  if (env.kind === "no-metamask") {
    throw new SnapInvokeError("no-metamask", env.message);
  }
  if (env.kind === "snap-not-installed") {
    await requestSnapInstall(env.snapId);
    env = await detectSnapEnvironment(snapId);
    if (env.kind !== "ready") {
      throw new SnapInvokeError("snap-error", env.kind === "snap-not-installed" ? env.message : "Snap install failed.");
    }
  }
  const [fingerprint, ufvk] = await Promise.all([
    snapGetSeedFingerprint(env.snapId),
    snapGetViewingKey(env.snapId),
  ]);
  return { fingerprint, ufvk, snapId: env.snapId, snapVersion: env.version };
}

function normaliseString(raw: unknown, method: string): string {
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object") {
    const r = raw as Record<string, unknown>;
    for (const key of ["value", "result", "data", "ufvk", "viewingKey"]) {
      if (typeof r[key] === "string") return r[key] as string;
    }
  }
  throw new SnapInvokeError("snap-error", `Snap.${method} returned an unexpected shape: ${JSON.stringify(raw)?.slice(0, 120)}`);
}

function normaliseFingerprint(raw: unknown): string {
  if (typeof raw === "string") return raw.startsWith("0x") ? raw.slice(2) : raw;
  if (Array.isArray(raw)) {
    return raw.map((b) => Number(b).toString(16).padStart(2, "0")).join("");
  }
  if (raw && typeof raw === "object") {
    const r = raw as Record<string, unknown>;
    for (const key of ["fingerprint", "value", "result", "data"]) {
      if (typeof r[key] === "string") return (r[key] as string).replace(/^0x/, "");
      if (Array.isArray(r[key])) {
        return (r[key] as number[]).map((b) => Number(b).toString(16).padStart(2, "0")).join("");
      }
    }
  }
  throw new SnapInvokeError("snap-error", `Snap.getSeedFingerprint returned an unexpected shape`);
}

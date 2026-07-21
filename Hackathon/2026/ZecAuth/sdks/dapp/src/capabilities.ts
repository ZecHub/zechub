/**
 * Capabilities — the high-level permissions a dApp declares when it integrates ZecAuth.
 *
 * A dApp tells the wallet, up front, *what it intends to do*. The wallet shows these to the
 * user on the connect screen so they can make an informed decision before signing in.
 *
 * Two capabilities cover the vast majority of apps:
 *
 *   - `"signin"`           — prove the user controls a Zcash wallet (identity only).
 *   - `"sign-transaction"` — ask the user to approve & sign transactions (payments).
 *
 * Capabilities are the developer-facing vocabulary. On the wire they are carried inside the
 * challenge as protocol `scopes` (see PROTOCOL.md §scopes / `zecauth-core::Scope`), so any
 * ZecAuth wallet understands them regardless of which SDK produced the challenge.
 */

/** A capability a dApp can request from the wallet. */
export type Capability =
  | "signin"
  | "sign-transaction"
  | "view-address"
  | "view-balance"
  | "view-incoming"
  | "view-history"
  | "view-full";

/** Protocol scope wire-format (mirrors `zecauth-core::Scope`). Carried inside the challenge. */
export interface Scope {
  type:
    | "auth"
    | "request_payment"
    | "view_balance"
    | "view_history"
    | "view_incoming"
    | "view_full"
    | "view_address"
    | "custom";
  params?: { max_amount?: string; name?: string; description?: string };
}

/** The set of scopes a dApp requests inside a challenge. */
export interface RequestedScopes {
  required?: Scope[];
  optional?: Scope[];
}

/**
 * Data a wallet may disclose to the dApp when a capability calls for it. Disclosures ride
 * alongside the signed auth response (relayed to the dApp); they are not part of the signed
 * message. The SDK surfaces them on the session.
 */
/** A point-in-time balance snapshot (ZEC decimal strings). */
export interface DisclosedBalance {
  totalZec: string;
  spendableZec: string;
}

/** A disclosed transaction row (point-in-time snapshot). */
export interface DisclosedTx {
  txid: string;
  /** Amount in ZEC (decimal string, always positive — see `direction`). */
  amountZec: string;
  direction: "in" | "out";
  minedHeight?: number;
  timestamp?: number;
  memo?: string;
}

/**
 * Data the wallet shared with the dApp — each field gated by a specific granted capability,
 * so you receive exactly the exposure the user approved and nothing more.
 */
export interface Disclosures {
  /** `view-address` — a receiving Unified Address. */
  address?: string;
  /** `view-balance` — a one-time balance snapshot. */
  balance?: DisclosedBalance;
  /** `view-incoming` — a one-time snapshot of received payments (verify a payment landed). */
  incomingPayments?: DisclosedTx[];
  /** `view-history` — a one-time snapshot of full transaction history. */
  transactions?: DisclosedTx[];
  /**
   * `view-full` — a read-only Unified Full Viewing Key (`uview…`). Import into a lightwalletd
   * scanner to watch balance / incoming payments ongoing; carries no spend authority.
   */
  viewingKey?: string;
}

/** Human-readable metadata for a capability — handy for rendering your own consent UI. */
export interface CapabilityInfo {
  id: Capability;
  /** Short label, e.g. "Sign in". */
  label: string;
  /** One-line explanation shown to the user. */
  description: string;
  /** The protocol scope this capability maps to. */
  scope: Scope["type"];
}

/** The canonical capability catalog. */
export const CAPABILITIES: Record<Capability, CapabilityInfo> = {
  signin: {
    id: "signin",
    label: "Sign in",
    description:
      "Prove you control this wallet. Shares only a per-app identity key — never your balance, history, or addresses.",
    scope: "auth",
  },
  "sign-transaction": {
    id: "sign-transaction",
    label: "Request payments",
    description:
      "Ask you to approve and sign transactions. You review and confirm every payment in your wallet.",
    scope: "request_payment",
  },
  "view-address": {
    id: "view-address",
    label: "Share your address",
    description:
      "Read one of your receiving addresses (a Unified Address) — e.g. so this app can pay or refund you. Reveals nothing about your balance or history.",
    scope: "view_address",
  },
  "view-balance": {
    id: "view-balance",
    label: "View balance",
    description: "See a one-time snapshot of the user's balance. No key, nothing ongoing.",
    scope: "view_balance",
  },
  "view-incoming": {
    id: "view-incoming",
    label: "View incoming payments",
    description:
      "See a one-time snapshot of the user's received payments — enough to verify a payment landed.",
    scope: "view_incoming",
  },
  "view-history": {
    id: "view-history",
    label: "View transaction history",
    description: "See a one-time snapshot of the user's full transaction history (sent + received).",
    scope: "view_history",
  },
  "view-full": {
    id: "view-full",
    label: "Full viewing key",
    description:
      "Get a read-only viewing key (UFVK) to watch balance and full history ongoing. Cannot spend. Most powerful — request only if you truly need ongoing visibility.",
    scope: "view_full",
  },
};

/** All known capability ids. */
export const ALL_CAPABILITIES: Capability[] = Object.keys(CAPABILITIES) as Capability[];

/** Type guard: is `value` a recognized capability id? */
export function isCapability(value: unknown): value is Capability {
  return typeof value === "string" && value in CAPABILITIES;
}

/** Resolve capability ids to their metadata (unknown ids are skipped). */
export function describeCapabilities(capabilities: Capability[]): CapabilityInfo[] {
  return capabilities.filter(isCapability).map((c) => CAPABILITIES[c]);
}

/**
 * Build the protocol `scopes` object from a list of declared capabilities.
 *
 * `signin` is always implied (every connection authenticates), so it is included even if
 * the caller omits it. Declared capabilities are placed in `required` — the dApp is telling
 * the wallet these are the things it needs to function.
 *
 * @param capabilities the capabilities the dApp declared
 * @param opts.maxAmount optional cap (in ZEC) the wallet should enforce per payment request
 */
export function capabilitiesToScopes(
  capabilities: Capability[],
  opts: { maxAmount?: string } = {},
): RequestedScopes {
  const ids = new Set<Capability>(capabilities.filter(isCapability));
  ids.add("signin"); // auth is always part of a connection

  const required: Scope[] = [];
  // Keep a stable, sensible order: auth first, then the rest.
  for (const id of ["signin", ...ALL_CAPABILITIES.filter((c) => c !== "signin")] as Capability[]) {
    if (!ids.has(id)) continue;
    if (id === "sign-transaction") {
      const params = opts.maxAmount ? { max_amount: opts.maxAmount } : undefined;
      required.push(params ? { type: "request_payment", params } : { type: "request_payment" });
    } else {
      required.push({ type: CAPABILITIES[id].scope });
    }
  }

  return { required };
}

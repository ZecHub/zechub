/**
 * Capabilities — the wallet-side, human-facing view of what a dApp is requesting.
 *
 * A dApp declares *capabilities* (`signin`, `sign-transaction`, …) through its SDK; on the
 * wire those travel inside the challenge as protocol `scopes`. This module turns the parsed
 * `scopes` back into a list the wallet can render on its connect screen — each item with a
 * label, a one-line description, whether it's required, and whether it's privacy-sensitive.
 *
 * The wallet UI maps `id` → an icon and shows `label` + `description`. Nothing here touches
 * keys or signing — capabilities are display metadata the user reviews before approving.
 */
import type { RequestedScopes, Scope } from "./types.js";

/** A human-facing capability id (the wallet maps this to an icon). */
export type CapabilityId =
  | "signin"
  | "sign-transaction"
  | "view-balance"
  | "view-history"
  | "view-incoming"
  | "view-full"
  | "view-address"
  | "custom";

/** A capability a dApp is requesting, ready to display in the wallet. */
export interface ParsedCapability {
  /** Stable id — the wallet maps this to an icon. */
  id: CapabilityId;
  /** Short label, e.g. "Sign in". */
  label: string;
  /** One-line explanation shown to the user. */
  description: string;
  /** True if the dApp marked this required (it won't connect without it). */
  required: boolean;
  /** True if granting it would disclose privacy-sensitive data (balance, history, address). */
  sensitive: boolean;
  /** For `sign-transaction`: the per-payment cap (in ZEC) the dApp set, if any. */
  maxAmount?: string;
}

/** Map a single protocol scope to a displayable capability. */
function scopeToCapability(scope: Scope, required: boolean): ParsedCapability {
  switch (scope.type) {
    case "auth":
      return {
        id: "signin",
        label: "Sign in",
        description:
          "Prove you control this wallet. Shares only a per-app identity — never your balance, history, or addresses.",
        required,
        sensitive: false,
      };
    case "request_payment": {
      const max = scope.params?.max_amount;
      return {
        id: "sign-transaction",
        label: "Request payments",
        description: max
          ? `Ask you to approve transactions up to ${max} ZEC each. You confirm every payment.`
          : "Ask you to approve and sign transactions. You confirm every payment.",
        required,
        sensitive: false,
        maxAmount: max,
      };
    }
    case "view_balance":
      return {
        id: "view-balance",
        label: "View balance",
        description: "Share a one-time snapshot of your balance. Nothing ongoing, no key.",
        required,
        sensitive: true,
      };
    case "view_history":
      return {
        id: "view-history",
        label: "View transaction history",
        description: "Share a one-time snapshot of your transactions (sent and received).",
        required,
        sensitive: true,
      };
    case "view_incoming":
      return {
        id: "view-incoming",
        label: "View incoming payments",
        description: "Share a one-time snapshot of payments you've received — so this app can verify a payment.",
        required,
        sensitive: true,
      };
    case "view_full":
      return {
        id: "view-full",
        label: "Full viewing key",
        description:
          "Share a read-only viewing key so this app can watch your balance and full history ongoing. It can never spend your funds.",
        required,
        sensitive: true,
      };
    case "view_address":
      return {
        id: "view-address",
        label: "View address",
        description: "Read your receiving address.",
        required,
        sensitive: true,
      };
    case "custom":
    default:
      return {
        id: "custom",
        label: scope.params?.name ?? "Custom permission",
        description: scope.params?.description ?? "A custom permission this app defined.",
        required,
        sensitive: true,
      };
  }
}

const SIGNIN: ParsedCapability = {
  id: "signin",
  label: "Sign in",
  description:
    "Prove you control this wallet. Shares only a per-app identity — never your balance, history, or addresses.",
  required: true,
  sensitive: false,
};

/**
 * Derive the human-facing capabilities a dApp is requesting from its scopes.
 *
 * Signing in (`auth`) is implicit in every connection, so the result always begins with the
 * `signin` capability — even when the challenge carries no scopes at all (older dApps, or a
 * plain sign-in). Duplicate scopes collapse to one entry; `required` wins over `optional`.
 */
export function describeCapabilities(scopes?: RequestedScopes): ParsedCapability[] {
  const byId = new Map<CapabilityId, ParsedCapability>();
  byId.set("signin", SIGNIN);

  const consume = (list: Scope[] | undefined, required: boolean) => {
    for (const scope of list ?? []) {
      const cap = scopeToCapability(scope, required);
      const existing = byId.get(cap.id);
      // Keep the strongest claim: a required entry supersedes an optional one.
      if (!existing || (required && !existing.required)) byId.set(cap.id, cap);
    }
  };

  consume(scopes?.required, true);
  consume(scopes?.optional, false);

  // Stable order: signin first, then declared order of appearance.
  const order: CapabilityId[] = [
    "signin",
    "sign-transaction",
    "view-address",
    "view-balance",
    "view-incoming",
    "view-history",
    "view-full",
    "custom",
  ];
  return [...byId.values()].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

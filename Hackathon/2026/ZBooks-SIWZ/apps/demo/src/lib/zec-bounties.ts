// Pulls bounty data from zechub.zone (zec-bounties' Express backend).
// Public API, no auth required.

const DEFAULT_API = "https://zechub.zone";

const API_BASE = (process.env.ZEC_BOUNTIES_API_URL ?? DEFAULT_API).replace(/\/$/, "");

export type ZecBountyStatus = "TO_DO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "CANCELLED";

export interface ZecBountyUser {
  id?: string;
  name?: string;
  email?: string | null;
  avatar?: string | null;
  // Legacy field. In current data this is often null or a testnet UA
  // (utest1...). Kept for compatibility; UA_address is now the primary.
  z_address?: string | null;
  // Modern field. Mainnet Unified Address (u1...). Populated for most
  // contributors even when z_address is null.
  UA_address?: string | null;
  role?: string | null;
}

export interface ZecBountyAssignment {
  id?: string;
  bountyId?: string;
  userId?: string;
  assignedAt?: string;
  user?: ZecBountyUser | null;
}

export interface ZecBounty {
  id: string;
  title: string;
  description: string;
  bountyAmount: number;
  dateCreated: string;
  timeToComplete?: string;
  status: ZecBountyStatus;
  isApproved: boolean;
  isPaid: boolean;
  paymentAuthorized?: boolean;
  paidAt?: string | null;
  categoryId?: string | null;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  // Legacy single-assignee field. Null when there are multiple assignees;
  // in that case the data is in `assignees[]`.
  assigneeUser?: ZecBountyUser | null;
  // Newer multi-assignee field. Always present in current API responses.
  assignees?: ZecBountyAssignment[];
  createdByUser?: ZecBountyUser | null;
}

/** Any usable Zcash address anywhere on this user (regardless of network). */
function userHasAnyAddress(user: ZecBountyUser | null | undefined): boolean {
  return !!(user?.UA_address || user?.z_address);
}

/** Resolve the assignee for payout purposes. Returns the single assignee user
 *  when there is exactly one, "multi" if there are more, or null if none.
 *  "Usable" means the user has any Zcash address on file (UA_address or
 *  z_address); the network match is checked separately by callers via
 *  pickAddressForNetwork. */
export function resolveAssignee(bounty: ZecBounty): ZecBountyUser | "multi" | null {
  if (userHasAnyAddress(bounty.assigneeUser)) return bounty.assigneeUser!;
  const list = bounty.assignees ?? [];
  if (list.length === 0) return bounty.assigneeUser ?? null;
  if (list.length > 1) return "multi";
  const only = list[0]?.user;
  return only ?? null;
}

/** Get the effective payout assignee. Accepts an optional override (a userId
 *  from `bounty.assignees[]`) so the treasurer can pick a payee for
 *  multi-assignee bounties from inside ZBooks. */
export function getEffectiveAssignee(
  bounty: ZecBounty,
  overrideUserId?: string,
): ZecBountyUser | null {
  if (overrideUserId) {
    const match = bounty.assignees?.find((a) => a.userId === overrideUserId);
    return match?.user ?? null;
  }
  const auto = resolveAssignee(bounty);
  return auto === "multi" || auto === null ? null : auto;
}

interface BountiesResponse {
  data: ZecBounty[];
  total?: number;
  page?: number;
  limit?: number;
}

export class ZecBountiesError extends Error {
  readonly status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ZecBountiesError";
    this.status = status;
  }
}

/** Fetch all bounties from zec-bounties, paging until exhausted. */
export async function fetchAllBounties(): Promise<ZecBounty[]> {
  const all: ZecBounty[] = [];
  let page = 1;
  const limit = 100;
  for (;;) {
    const res = await fetch(`${API_BASE}/api/bounties?page=${page}&limit=${limit}`, {
      headers: { accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new ZecBountiesError(`zec-bounties returned ${res.status}`, res.status);
    }
    const json = (await res.json()) as BountiesResponse;
    all.push(...(json.data ?? []));
    const total = json.total ?? all.length;
    if (all.length >= total || (json.data ?? []).length === 0) break;
    page += 1;
    // Safety: zec-bounties shouldn't have >5000 bounties; cap to avoid runaways.
    if (page > 50) break;
  }
  return all;
}

/** Payable statuses are IN_PROGRESS, IN_REVIEW, and DONE-without-isPaid (the
 *  most canonical "work approved, payment pending" state). TO_DO is too early;
 *  CANCELLED is out; DONE+isPaid means already paid upstream. Multi-assignee
 *  bounties are payable but need the treasurer to pick a payee first via the
 *  ImportClient UI, so this function excludes them; see `buildImportCandidates`
 *  which surfaces them with `pickableAssignees`. We do NOT gate on upstream
 *  `isApproved`: that flag is inconsistent. ZBooks's own M-of-N approval gate
 *  is the real authorisation, applied by the treasurer at payout time. */
export function filterPayableBounties(
  bounties: ZecBounty[],
  network: "mainnet" | "testnet" | "regtest",
): ZecBounty[] {
  return bounties.filter((b) => {
    if (b.status === "CANCELLED" || b.status === "TO_DO") return false;
    if (b.isPaid) return false;
    if (!(b.bountyAmount > 0)) return false;
    const assignee = resolveAssignee(b);
    if (assignee === null || assignee === "multi") return false;
    return !!pickAddressForNetwork(assignee, network);
  });
}

export type ZcashNetwork = "mainnet" | "testnet" | "regtest" | "unknown";

/** Return the address on this user that matches the target network. Prefers
 *  UA_address over the legacy z_address because most contributors on
 *  zec-bounties have their mainnet payout address in UA_address and either
 *  null or a testnet address in z_address. */
export function pickAddressForNetwork(
  user: ZecBountyUser | null | undefined,
  target: "mainnet" | "testnet" | "regtest",
): string | null {
  if (!user) return null;
  const candidates = [user.UA_address, user.z_address].filter(
    (s): s is string => typeof s === "string" && s.length > 0,
  );
  for (const addr of candidates) {
    if (detectAddressNetwork(addr) === target) return addr;
  }
  return null;
}

/** Detect network from a Zcash address prefix (UA, sapling, transparent). */
export function detectAddressNetwork(address: string): ZcashNetwork {
  if (!address) return "unknown";
  const a = address.trim();
  // Unified addresses
  if (a.startsWith("u1")) return "mainnet";
  if (a.startsWith("utest1")) return "testnet";
  if (a.startsWith("uregtest1")) return "regtest";
  // Sapling shielded
  if (a.startsWith("zs1")) return "mainnet";
  if (a.startsWith("ztestsapling1")) return "testnet";
  if (a.startsWith("zregtestsapling1")) return "regtest";
  // Transparent P2PKH / P2SH
  if (a.startsWith("t1") || a.startsWith("t3")) return "mainnet";
  if (a.startsWith("tm") || a.startsWith("t2")) return "testnet";
  return "unknown";
}

export type BountyBlockReason =
  | "payable"
  | "needs_assignee_pick"
  | "no_assignee"
  | "multi_assignee"
  | "no_address"
  | "amount_zero"
  | "in_progress"
  | "not_approved"
  | "cancelled"
  | "already_paid"
  | "address_unknown"
  | "network_mismatch";

/** One pickable payee on a multi-assignee bounty. The treasurer picks one. */
export interface PickableAssignee {
  userId: string;
  name: string;
  z_address: string;
  network: ZcashNetwork;
}

export interface BountyImportCandidate {
  bounty: ZecBounty;
  network: ZcashNetwork;
  payable: boolean;
  reason: BountyBlockReason;
  reasonLabel: string;
  /** The address ZBooks would actually pay when this bounty imports. Set on
   *  payable candidates (matches the target network, UA_address preferred).
   *  Undefined for blocked or pickable candidates. */
  payoutAddress?: string;
  /** Present when the bounty has multiple assignees with at least one having
   *  a z_address. The UI shows a picker; once a pick is made the bounty
   *  becomes payable in the treasurer's selection. */
  pickableAssignees?: PickableAssignee[];
}

/** Decorate every bounty with the reason it is or isn't importable. */
export function buildImportCandidates(
  bounties: ZecBounty[],
  zbooksNetwork: "mainnet" | "testnet" | "regtest",
): BountyImportCandidate[] {
  return bounties.map((bounty) => {
    const assignee = resolveAssignee(bounty);
    // Pick the address on the assignee that matches the target network,
    // preferring UA_address over z_address.
    const address =
      assignee && assignee !== "multi"
        ? pickAddressForNetwork(assignee, zbooksNetwork) ?? ""
        : "";
    // For display, report the network of whichever address the assignee has
    // (falls back to the wrong-network one so the label can explain).
    const anyAssigneeAddr =
      assignee && assignee !== "multi"
        ? assignee.UA_address || assignee.z_address || ""
        : "";
    const network: ZcashNetwork = address
      ? zbooksNetwork
      : anyAssigneeAddr
      ? detectAddressNetwork(anyAssigneeAddr)
      : "unknown";

    let reason: BountyBlockReason = "payable";
    let reasonLabel = "Ready to pay";
    let pickableAssignees: PickableAssignee[] | undefined;

    if (bounty.status === "CANCELLED") {
      reason = "cancelled";
      reasonLabel = "Cancelled upstream";
    } else if (bounty.status === "TO_DO") {
      reason = "in_progress";
      reasonLabel = "TO_DO upstream (not yet started)";
    } else if (bounty.isPaid) {
      reason = "already_paid";
      reasonLabel = "Already paid on zec-bounties";
    } else if (assignee === "multi") {
      // Multi-assignee: collect each assignee with a usable address on our
      // network. Prefers UA_address over z_address if either is present on
      // the nested user. Note: the /api/bounties response typically returns
      // only {id, name, avatar} inside assignees[].user, so this branch
      // usually yields no picks and falls back to multi_assignee. Kept
      // defensively in case the upstream API starts including addresses.
      const picks: PickableAssignee[] = [];
      for (const a of bounty.assignees ?? []) {
        if (!a.user || !a.userId) continue;
        const addr = pickAddressForNetwork(a.user, zbooksNetwork);
        if (!addr) continue;
        picks.push({
          userId: a.userId,
          name: a.user.name ?? a.userId.slice(0, 8),
          z_address: addr,
          network: zbooksNetwork,
        });
      }
      if (picks.length === 0) {
        reason = "multi_assignee";
        reasonLabel = `Multiple assignees, none resolvable to a ${zbooksNetwork} address (zec-bounties does not expose per-assignee addresses in this API response).`;
      } else {
        reason = "needs_assignee_pick";
        reasonLabel = `Multiple assignees (${bounty.assignees?.length ?? picks.length}). Pick a payee to import.`;
        pickableAssignees = picks;
      }
    } else if (assignee === null) {
      reason = "no_assignee";
      reasonLabel = "No assignee set";
    } else if (!userHasAnyAddress(assignee)) {
      reason = "no_address";
      reasonLabel = "Assignee has no address on file (neither UA_address nor z_address).";
    } else if (!address) {
      // Assignee has an address, just not on our target network.
      const nets = [assignee.UA_address, assignee.z_address]
        .filter((s): s is string => typeof s === "string" && !!s)
        .map(detectAddressNetwork)
        .filter((n) => n !== "unknown");
      const uniqNets = Array.from(new Set(nets));
      reason = uniqNets.length === 0 ? "address_unknown" : "network_mismatch";
      reasonLabel =
        uniqNets.length === 0
          ? "Address prefix not recognised"
          : `Assignee has ${uniqNets.join("/")} address(es); this ZBooks runs on ${zbooksNetwork}.`;
    } else if (!(bounty.bountyAmount > 0)) {
      reason = "amount_zero";
      reasonLabel = "Amount is zero";
    }

    return {
      bounty,
      network,
      payable: reason === "payable",
      reason,
      reasonLabel,
      ...(reason === "payable" && address ? { payoutAddress: address } : {}),
      ...(pickableAssignees ? { pickableAssignees } : {}),
    };
  });
}

/** Shape a bounty into the fields ZBooks's payout_items table needs. Pass
 *  `overrideAssigneeUserId` to pick a specific payee from a multi-assignee
 *  bounty (the userId must be present in `bounty.assignees[]`). The `network`
 *  arg controls which address on the assignee is used (UA_address preferred
 *  when it matches, falling back to z_address). */
export function bountyToPayoutLine(
  bounty: ZecBounty,
  network: "mainnet" | "testnet" | "regtest",
  overrideAssigneeUserId?: string,
): {
  label: string;
  address: string;
  amount_zec: number;
  memo: string;
  external_ref: string;
} {
  const assignee = getEffectiveAssignee(bounty, overrideAssigneeUserId);
  const address = pickAddressForNetwork(assignee, network);
  if (!address) {
    throw new Error(
      `bountyToPayoutLine: bounty ${bounty.id} has no resolvable assignee with a ${network} address`,
    );
  }
  return {
    label: assignee?.name ? `${assignee.name}: ${bounty.title}` : bounty.title,
    address,
    amount_zec: bounty.bountyAmount,
    memo: `zec-bounty: ${bounty.title}`.slice(0, 512),
    external_ref: `zec-bounties:${bounty.id}`,
  };
}

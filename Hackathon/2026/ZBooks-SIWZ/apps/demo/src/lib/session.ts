import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { ensureMember, getMember, type Role } from "./db";

// Resolves the signed-in user. Side-effect: first ever sign-in becomes admin.
export async function currentUser(): Promise<{ address: string; role: Role } | null> {
  const session = await getServerSession(authOptions);
  const address = session?.user?.address;
  if (!address) return null;
  const role = await ensureMember(address);
  return { address, role };
}

export async function requireRole(
  ...allowed: Role[]
): Promise<{ ok: true; address: string; role: Role } | { ok: false; status: 401 | 403 }> {
  const user = await currentUser();
  if (!user) return { ok: false, status: 401 };
  if (!allowed.includes(user.role)) return { ok: false, status: 403 };
  return { ok: true, ...user };
}

export function canTag(role: Role): boolean {
  return role === "admin" || role === "treasurer";
}

export function canManageKeys(role: Role): boolean {
  return role === "admin" || role === "treasurer";
}

export function canManageTeam(role: Role): boolean {
  return role === "admin";
}

// Viewers can browse payout runs, line items, approvals, and audit history.
// Only admins/treasurers can create runs, edit items, approve, or reveal the URI.
export function canSeePayouts(_role: Role): boolean {
  return true;
}

// Gate every write action on the payout surface (create, edit, delete, approve).
export function canManagePayouts(role: Role): boolean {
  return role === "admin" || role === "treasurer";
}

// Gate the ZIP 321 URI / QR reveal. Viewers must never see the URI because a
// treasurer could accidentally pay from their wallet if it renders on screen
// during a demo, and a viewer scanning would just lose their own funds.
export function canRevealPayoutURI(role: Role): boolean {
  return role === "admin" || role === "treasurer";
}

export { getMember };

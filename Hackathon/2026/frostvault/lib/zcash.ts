// Real shielded-transaction construction and broadcast is out of scope (see
// README) -- no wallet, including the Zcash Foundation's own tooling, has
// shipped that for FROST-signed Orchard spends yet. A vault's "receiving
// address" shown here is a deterministic placeholder derived from its id,
// not a real Orchard address derived from the group public key.

export function fakeReceivingAddress(vaultId: string): string {
  let h = 0;
  for (let i = 0; i < vaultId.length; i++) {
    h = (h * 31 + vaultId.charCodeAt(i)) >>> 0;
  }
  const chars = "023456789acdefghjklmnpqrstuvwxyz";
  let out = "";
  let x = h || 1;
  for (let i = 0; i < 76; i++) {
    x = (x * 1103515245 + 12345) >>> 0;
    out += chars[x % chars.length];
  }
  return `zs1${out}`;
}

export function formatZec(amount: string | number): string {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  if (Number.isNaN(n)) return "0.0000";
  return n.toFixed(4);
}

export function validateSendAmount(
  amount: string,
  balance: number,
): { valid: boolean; error?: string } {
  const n = parseFloat(amount);
  if (!amount || Number.isNaN(n)) return { valid: false, error: "Enter an amount" };
  if (n <= 0) return { valid: false, error: "Amount must be positive" };
  if (n > balance) return { valid: false, error: "Amount exceeds balance" };
  return { valid: true };
}

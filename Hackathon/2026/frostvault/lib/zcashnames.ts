import { ZNS } from "zcashname-sdk";

// Real ZNS (Zcash Name System) resolution via the official zcashname-sdk,
// hitting the live, CORS-enabled testnet indexer at
// https://light.zcash.me/zns-testnet -- genuinely real, not simulated.
// Verified directly against the API before wiring this in: as of writing,
// only 3 names are registered on testnet total ("testclaim", "zechariah",
// "edicksonjga"), which resolve for real. Everything else falls back to a
// small local table, clearly labeled by source in the UI so the two paths
// are never conflated.
const zns = new ZNS();

export const REAL_ZNS_EXAMPLES = ["testclaim.zcash", "zechariah.zcash"];

function fakeShieldedAddress(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
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

const FALLBACK_ZCASHNAMES: Record<string, string> = {
  alice: fakeShieldedAddress("alice"),
  bob: fakeShieldedAddress("bob"),
  carol: fakeShieldedAddress("carol"),
  dave: fakeShieldedAddress("dave"),
  eve: fakeShieldedAddress("eve"),
};

export const FALLBACK_ZCASHNAMES_LIST = Object.keys(FALLBACK_ZCASHNAMES).map((name) => `${name}.zcash`);

export function isZcashName(input: string): boolean {
  const trimmed = input.trim();
  if (!/\.(zcash|zec)$/i.test(trimmed)) return false;
  try {
    return zns.isValidName(zns.normalizeName(trimmed));
  } catch {
    return false;
  }
}

export type ResolveSource = "zns-testnet" | "fallback";

export interface ResolveResult {
  success: boolean;
  address?: string;
  source?: ResolveSource;
  error?: string;
}

export async function resolveZcashName(input: string): Promise<ResolveResult> {
  const trimmed = input.trim();
  let baseName: string;
  try {
    baseName = zns.normalizeName(trimmed);
  } catch {
    return { success: false, error: `"${trimmed}" isn't a valid name` };
  }

  try {
    const registration = await zns.resolveName(trimmed);
    if (registration) {
      return { success: true, address: registration.address, source: "zns-testnet" };
    }
  } catch {
    // Network/indexer issue -- fall through to the local fallback table
    // below rather than surfacing a raw network error for a demo.
  }

  const fallbackAddress = FALLBACK_ZCASHNAMES[baseName];
  if (fallbackAddress) {
    return { success: true, address: fallbackAddress, source: "fallback" };
  }

  return {
    success: false,
    error: `${baseName}.zcash isn't registered on ZNS testnet (try ${REAL_ZNS_EXAMPLES.join(" or ")}) or in the demo fallback list`,
  };
}

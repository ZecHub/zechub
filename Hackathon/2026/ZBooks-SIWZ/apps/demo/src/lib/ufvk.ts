// Shape-only UFVK validator. ZIP 316 full decoding (F4Jumble reversal +
// receiver parsing) is out of scope; lightwalletd does the real check at sync time.

const BECH32_ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

export type UfvkInspection =
  | { valid: true; network: "mainnet" | "testnet" }
  | { valid: false; reason: string };

export function inspectUfvk(raw: string): UfvkInspection {
  const s = raw.trim();
  if (s.length < 60) return { valid: false, reason: "UFVK is too short to be valid." };
  let network: "mainnet" | "testnet";
  if (s.startsWith("uview1")) network = "mainnet";
  else if (s.startsWith("uviewtest1")) network = "testnet";
  else return { valid: false, reason: "Expected a UFVK starting with 'uview…' or 'uviewtest…'." };

  const sep = s.lastIndexOf("1");
  const data = s.slice(sep + 1);
  for (const ch of data) {
    if (!BECH32_ALPHABET.includes(ch.toLowerCase())) {
      return { valid: false, reason: `Invalid bech32 character: "${ch}"` };
    }
  }
  return { valid: true, network };
}

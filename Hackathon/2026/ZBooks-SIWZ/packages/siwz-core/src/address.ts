import { base58checkDecode, base58checkEncode, bech32, bech32m, bytesEqual } from "./crypto.js";
import { SiwzError } from "./errors.js";
import type { Network, ParsedAddress } from "./types.js";

// Zcash uses 2-byte version prefixes (Zcash Protocol Spec §5.6.1.1).
const TRANSPARENT_VERSION = {
  mainnet: {
    p2pkh: new Uint8Array([0x1c, 0xb8]), // t1...
    p2sh:  new Uint8Array([0x1c, 0xbd]), // t3...
  },
  testnet: {
    p2pkh: new Uint8Array([0x1d, 0x25]), // tm...
    p2sh:  new Uint8Array([0x1c, 0xba]), // t2...
  },
  regtest: {
    p2pkh: new Uint8Array([0x1d, 0x25]),
    p2sh:  new Uint8Array([0x1c, 0xba]),
  },
} as const;

const SHIELDED_HRPS: Record<string, { type: "sapling" | "orchard" | "unified"; network: Network; encoding: "bech32" | "bech32m" }> = {
  // Sapling: bech32 (BIP-173)
  zs:               { type: "sapling", network: "mainnet", encoding: "bech32" },
  ztestsapling:     { type: "sapling", network: "testnet", encoding: "bech32" },
  zregtestsapling:  { type: "sapling", network: "regtest", encoding: "bech32" },
  // Unified: bech32m (BIP-350, ZIP-316)
  u:      { type: "unified", network: "mainnet", encoding: "bech32m" },
  utest:  { type: "unified", network: "testnet", encoding: "bech32m" },
  uregtest: { type: "unified", network: "regtest", encoding: "bech32m" },
};

/** Parse any Zcash address (transparent, Sapling, or unified). Throws SiwzError("INVALID_ADDRESS") on failure. */
export function parseAddress(raw: string): ParsedAddress {
  if (typeof raw !== "string" || raw.length < 5) {
    throw new SiwzError("INVALID_ADDRESS", "Address must be a non-empty string");
  }

  if (raw.startsWith("t")) return parseTransparent(raw);

  const sep = raw.lastIndexOf("1");
  if (sep <= 0) {
    throw new SiwzError("INVALID_ADDRESS", `Unrecognised address format: ${raw.slice(0, 10)}…`);
  }
  const hrp = raw.slice(0, sep).toLowerCase();
  const meta = SHIELDED_HRPS[hrp];
  if (!meta) {
    throw new SiwzError("INVALID_ADDRESS", `Unknown address prefix "${hrp}"`);
  }

  let words: number[];
  try {
    const codec = meta.encoding === "bech32m" ? bech32m : bech32;
    const decoded = codec.decode(raw.toLowerCase() as `${string}1${string}`, raw.length);
    if (decoded.prefix !== hrp) {
      throw new Error("HRP mismatch after decode");
    }
    words = decoded.words as unknown as number[];
  } catch (err) {
    throw new SiwzError("INVALID_ADDRESS", `Malformed ${meta.encoding} for ${hrp}: ${(err as Error).message}`);
  }

  const payload = new Uint8Array(bech32.fromWords(words));

  if (meta.type === "unified") {
    return {
      raw,
      type: "unified",
      network: meta.network,
      receivers: extractUnifiedReceivers(payload, meta.network),
    };
  }
  return {
    raw,
    type: "sapling",
    network: meta.network,
    hash: payload,
  };
}

function parseTransparent(raw: string): ParsedAddress {
  let decoded: Uint8Array;
  try {
    decoded = base58checkDecode(raw);
  } catch (err) {
    throw new SiwzError("INVALID_ADDRESS", `Invalid base58check t-address: ${(err as Error).message}`);
  }
  if (decoded.length !== 22) {
    throw new SiwzError("INVALID_ADDRESS", `Transparent address must decode to 22 bytes, got ${decoded.length}`);
  }
  const version = decoded.slice(0, 2);
  const hash = decoded.slice(2);

  for (const network of ["mainnet", "testnet", "regtest"] as const) {
    const versions = TRANSPARENT_VERSION[network];
    if (bytesEqual(version, versions.p2pkh)) {
      return { raw, type: "p2pkh", network, hash };
    }
    if (bytesEqual(version, versions.p2sh)) {
      return { raw, type: "p2sh", network, hash };
    }
  }
  throw new SiwzError(
    "INVALID_ADDRESS",
    `Unknown transparent version bytes 0x${version[0]!.toString(16)}${version[1]!.toString(16)}`,
  );
}

/** Re-encode a HASH160 + network into a P2PKH address. Inverse of `parseAddress(...).hash`. */
export function encodeP2pkh(hash20: Uint8Array, network: Network): string {
  if (hash20.length !== 20) throw new Error("hash must be 20 bytes");
  const version = TRANSPARENT_VERSION[network].p2pkh;
  const payload = new Uint8Array(22);
  payload.set(version, 0);
  payload.set(hash20, 2);
  return base58checkEncode(payload);
}

/** Receiver type tags from ZIP-316 §5.5. */
export const UA_RECEIVER_TYPES = {
  P2PKH:   0x00,
  P2SH:    0x01,
  SAPLING: 0x02,
  ORCHARD: 0x03,
} as const;

// We do not reverse ZIP-316 F4Jumble here (BLAKE2b-based permutation). The UA
// is surfaced as a single opaque entry; apps that need individual receivers
// should use a UA-aware library (e.g. WebZjs) and call parseAddress on each.
function extractUnifiedReceivers(payload: Uint8Array, network: Network): ParsedAddress[] {
  return [{
    raw: `unified-payload(${payload.length}b)`,
    type: "unified",
    network,
    hash: payload,
  }];
}

/** Non-throwing form of `parseAddress` for UI input validation. */
export function isZcashAddress(s: string): boolean {
  try {
    parseAddress(s);
    return true;
  } catch {
    return false;
  }
}

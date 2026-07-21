// Resolves the sender addresses of a transparent transaction by looking up
// each input's previous output via the ZEC data API (ZEC_API_URL).
// Used to prove that a challenge payment actually came from the claimed address.

const ZEC_API_URL = () => {
  const url = process.env.ZEC_API_URL;
  if (!url) throw new Error('ZEC_API_URL is not configured');
  return url;
};

interface DecodedVin {
  txid?: string;
  vout?: number;
  coinbase?: string;
}

interface DecodedVout {
  n: number;
  scriptPubKey?: { addresses?: string[] };
}

interface DecodedTx {
  txid: string;
  vin?: DecodedVin[];
  vout?: DecodedVout[];
}

function apiHeaders(): Record<string, string> {
  const h: Record<string, string> = {};
  if (process.env.API_SECRET_KEY) h['X-API-Key'] = process.env.API_SECRET_KEY;
  return h;
}

async function fetchTx(txid: string): Promise<DecodedTx | null> {
  try {
    const res = await fetch(`${ZEC_API_URL()}/api/tx/${txid}`, { headers: apiHeaders() });
    if (!res.ok) return null;
    const raw = (await res.json()) as { result?: DecodedTx; data?: DecodedTx } & DecodedTx;
    return raw.result ?? raw.data ?? raw;
  } catch {
    return null;
  }
}

// Zaino returns txids as raw bytes (internal byte order). Display order is reversed.
export function txidBufferToHex(buf: Buffer | Uint8Array): string {
  return Buffer.from(buf).reverse().toString('hex');
}

// Returns the set of transparent addresses that funded this transaction,
// resolved via each input's previous output. Returns null if the tx (or a
// prev tx) could not be fetched — callers must treat null as "unknown", not "no".
export async function getSenderAddresses(txid: string, maxInputs = 8): Promise<Set<string> | null> {
  const tx = await fetchTx(txid);
  if (!tx?.vin) return null;

  const senders = new Set<string>();
  const inputs = tx.vin.filter((v) => !v.coinbase && v.txid != null).slice(0, maxInputs);
  if (inputs.length === 0) return senders;

  const prevTxs = await Promise.all(inputs.map((v) => fetchTx(v.txid!)));
  for (let i = 0; i < inputs.length; i++) {
    const prev = prevTxs[i];
    if (!prev?.vout) return null;
    const out = prev.vout.find((o) => o.n === inputs[i].vout);
    for (const addr of out?.scriptPubKey?.addresses ?? []) senders.add(addr);
  }
  return senders;
}

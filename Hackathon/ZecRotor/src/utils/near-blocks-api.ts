// nearblocks-from-to.ts
export type Network = "mainnet" | "testnet";

export interface Options {
  network?: Network;                 // default: mainnet
  baseUrlOverride?: string;          // custom API base if you have one
  apiKey?: string;                   // NearBlocks Pro (optional)
  per_page?: number;                 // 1..250 (default 25)
  order?: "asc" | "desc";            // default "desc"
  cursor?: string;                   // for pagination
  after_date?: string;               // "YYYY-MM-DD"
  before_date?: string;              // "YYYY-MM-DD"
}

export interface FromToResult<TTxn = any> {
  cursor?: string;
  txns: TTxn[];
}

/**
 * Fetch transactions sent from `fromAccount` to `toAccount`.
 * This calls: /v1/account/{toAccount}/txns?from={fromAccount}&to={toAccount}...
 */
export async function fetchTxnsFromTo<TTxn = any>(
  toAccount: string,
  fromAccount: string,
  opts: Options = {}
): Promise<FromToResult<TTxn>> {
  const {
    network = "mainnet",
    baseUrlOverride,
    apiKey,
    per_page,
    order,
    cursor,
    after_date,
    before_date,
  } = opts;

  const base =
    baseUrlOverride ??
    (network === "mainnet"
      ? "https://api.nearblocks.io"
      : "https://api-testnet.nearblocks.io");

  const qs = new URLSearchParams({
    from: fromAccount,
    to: toAccount,
  });

  if (per_page) qs.set("per_page", String(per_page));
  if (order) qs.set("order", order);
  if (cursor) qs.set("cursor", cursor);
  if (after_date) qs.set("after_date", after_date);
  if (before_date) qs.set("before_date", before_date);

  const url = `${base}/v1/account/${encodeURIComponent(toAccount)}/txns?${qs.toString()}`;

  const headers: Record<string, string> = {};
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`NearBlocks ${res.status}: ${text || res.statusText}`);
  }

  const data = await res.json();
  // NearBlocks returns { txns: [...], cursor?: string }
  return { cursor: data?.cursor, txns: (data?.txns ?? []) as TTxn[] };
}

// Thin JSON-RPC client for zcashd (Bitcoin-Core-style RPC interface, since
// Zcash is a Bitcoin fork). Auth via ZCASHD_RPC_URL / ZCASHD_RPC_USER /
// ZCASHD_RPC_PASS, basic auth over HTTP.

export interface UnspentEntry {
  txid: string;
  vout: number;
  address: string;
  amount: number;
  confirmations: number;
  spendable: boolean;
}

interface RpcResponse<T> {
  result: T;
  error: { code: number; message: string } | null;
  id: string;
}

let rpcIdCounter = 0;

const call = async <T>(method: string, params: unknown[] = []): Promise<T> => {
  const url = process.env.ZCASHD_RPC_URL;
  const user = process.env.ZCASHD_RPC_USER;
  const pass = process.env.ZCASHD_RPC_PASS;
  if (!url) throw new Error("ZCASHD_RPC_URL is not configured");

  const auth = Buffer.from(`${user ?? ""}:${pass ?? ""}`).toString("base64");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      jsonrpc: "1.0",
      id: `bluff-${++rpcIdCounter}`,
      method,
      params,
    }),
  });

  if (!res.ok && res.status !== 500) {
    // zcashd returns 500 with a JSON error body for RPC-level errors —
    // only bail early on transport-level failures (auth, network, etc).
    throw new Error(`zcashd RPC HTTP error ${res.status}: ${await res.text()}`);
  }

  const body = (await res.json()) as RpcResponse<T>;
  if (body.error) {
    throw new Error(`zcashd RPC error (${method}): ${body.error.message}`);
  }
  return body.result;
};

export const getNewAddress = (): Promise<string> => call<string>("getnewaddress");

export const listUnspent = (
  addresses: string[],
  minconf = 0
): Promise<UnspentEntry[]> => call<UnspentEntry[]>("listunspent", [minconf, 9999999, addresses]);

// Minimum confirmations across all UTXOs currently sitting at `address`.
// Returns 0 if no funds have arrived yet.
export const getAddressConfirmations = async (address: string): Promise<number> => {
  const unspent = await listUnspent([address], 0);
  if (unspent.length === 0) return 0;
  return Math.min(...unspent.map((u) => u.confirmations));
};

export const sendMany = (amounts: Record<string, number>): Promise<string> =>
  call<string>("sendmany", ["", amounts]);

export const getTransaction = (txid: string): Promise<unknown> =>
  call("gettransaction", [txid]);

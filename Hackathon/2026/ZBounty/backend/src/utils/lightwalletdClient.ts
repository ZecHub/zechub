import { Buffer } from 'buffer';

const RPC_URL = 'http://159.65.93.142';
const RPC_USER = 'zcash';
const RPC_PASS = '062026';

const getAuthHeader = () => {
  return 'Basic ' + Buffer.from(`${RPC_USER}:${RPC_PASS}`).toString('base64');
};

/**
 * Make a JSON-RPC request to the Zcash node.
 */
async function rpcRequest(method: string, params: any[] = []): Promise<any> {
  const response = await fetch(RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader()
    },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id: 'zbounty',
      method,
      params
    })
  });

  if (!response.ok) {
    throw new Error(`RPC HTTP Error: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`RPC Error: Expected JSON but got ${contentType}. Content: ${text.substring(0, 100)}`);
  }

  const data = (await response.json()) as any;
  if (data.error) {
    throw new Error(`RPC Error: ${data.error.message || JSON.stringify(data.error)}`);
  }

  return data.result;
}

export function getClient() {
  // Kept for compatibility, though we don't return a gRPC client anymore.
  return { rpcRequest };
}

export async function getLightdInfo(): Promise<any> {
  // Use getinfo as equivalent to GetLightdInfo
  const info = await rpcRequest('getinfo');
  return {
    version: info.version,
    vendor: info.build || 'Zcash RPC Node',
    taddrSupport: true,
    chainName: info.testnet ? 'test' : 'main',
    blockHeight: info.blocks,
  };
}

export interface TaddressBalanceResult {
  balanceZat: number;
  balanceZec: number;
}

export async function getTaddressBalance(address: string): Promise<TaddressBalanceResult> {
  try {
    // getaddressbalance returns an object: { balance: <zatoshis>, received: <zatoshis> }
    const result = await rpcRequest('getaddressbalance', [{ addresses: [address] }]);
    
    const zatoshis = parseInt(result.balance || '0', 10);
    return {
      balanceZat: zatoshis,
      balanceZec: zatoshis / 1e8,
    };
  } catch (error: any) {
    // If it's a parse error (e.g., trying to parse a z-address), return 0 gracefully or throw
    console.error(`Error fetching balance for ${address}:`, error.message);
    throw error;
  }
}

/**
 * Convenience wrapper — accepts a single address string.
 * Returns ZEC balance as a number. Throws on RPC failure.
 */
export async function getAddressBalance(address: string): Promise<number> {
  const result = await getTaddressBalance(address);
  return result.balanceZec;
}

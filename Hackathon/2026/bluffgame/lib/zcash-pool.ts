// Business logic for the ZEC staking pool. In-memory only, mirroring the
// existing `games` Map pattern in server.ts — no database (see
// PROJECT-CONTEXT.md section 12 for the known limitation this carries).

import { getNewAddress, getAddressConfirmations, sendMany } from "./zcash-rpc.js";

interface DepositSlot {
  depositAddress: string;
  confirmed: boolean;
  payoutAddress?: string;
}

interface StakePool {
  gameId: string;
  stakeUsd: number;
  stakeZec: number;
  stakeZecReady: Promise<number>;
  createdAt: number;
  payoutTxid?: string;
  // Keyed by playerCode, not socket id — socket ids are ephemeral across
  // reconnects in this codebase, playerCode is the durable player identity.
  slots: Map<string, DepositSlot>;
}

const pools = new Map<string, StakePool>();

const round8 = (n: number) => Math.round(n * 1e8) / 1e8;

/* =====================================================================
   PRICE FEED
   ===================================================================== */

let priceCache: { usdPerZec: number; fetchedAt: number } | null = null;
const PRICE_CACHE_MS = 60_000;

export const getZecUsdPrice = async (): Promise<number> => {
  if (priceCache && Date.now() - priceCache.fetchedAt < PRICE_CACHE_MS) {
    return priceCache.usdPerZec;
  }

  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=usd"
  );
  if (!res.ok) throw new Error(`CoinGecko price fetch failed: ${res.status}`);

  const body = (await res.json()) as { zcash?: { usd?: number } };
  const usdPerZec = body.zcash?.usd;
  if (!usdPerZec) throw new Error("CoinGecko response missing zcash.usd price");

  priceCache = { usdPerZec, fetchedAt: Date.now() };
  return usdPerZec;
};

export const usdToZec = async (usd: number): Promise<number> => {
  const price = await getZecUsdPrice();
  return round8(usd / price);
};

/* =====================================================================
   POOL LIFECYCLE
   ===================================================================== */

export const createPool = (gameId: string, stakeUsd: number): Promise<number> => {
  // Register the pool synchronously (before the price-fetch await below) so
  // a fast-following join-game's addDepositSlot() can never race ahead of
  // this and find no pool yet — JS runs up to the first `await` in one tick.
  const pool: StakePool = {
    gameId,
    stakeUsd,
    stakeZec: 0,
    stakeZecReady: undefined as unknown as Promise<number>,
    createdAt: Date.now(),
    slots: new Map(),
  };
  pool.stakeZecReady = usdToZec(stakeUsd).then((stakeZec) => {
    pool.stakeZec = stakeZec;
    return stakeZec;
  });
  pools.set(gameId, pool);

  return pool.stakeZecReady;
};

export const getPool = (gameId: string): StakePool | undefined => pools.get(gameId);

export const addDepositSlot = async (
  gameId: string,
  playerCode: string
): Promise<{ address: string; stakeZec: number }> => {
  const pool = pools.get(gameId);
  if (!pool) throw new Error("No stake pool for this game");

  // Guards against a join-game that races ahead of the price fetch kicked
  // off by createPool — without this, an early caller would get stakeZec: 0.
  await pool.stakeZecReady;

  const address = await getNewAddress();
  pool.slots.set(playerCode, { depositAddress: address, confirmed: false });
  return { address, stakeZec: pool.stakeZec };
};

export const setPayoutAddress = (
  gameId: string,
  playerCode: string,
  address: string
): void => {
  const pool = pools.get(gameId);
  if (!pool) throw new Error("No stake pool for this game");

  const slot = pool.slots.get(playerCode);
  if (!slot) throw new Error("No deposit slot for this player");

  const trimmed = address.trim();
  if (!trimmed) throw new Error("Payout address cannot be empty");

  slot.payoutAddress = trimmed;
};

export const pollDeposits = async (
  gameId: string
): Promise<{ poolReady: boolean; confirmations: Record<string, boolean> }> => {
  const pool = pools.get(gameId);
  if (!pool || pool.slots.size === 0) {
    return { poolReady: false, confirmations: {} };
  }

  const requiredConf = Number(process.env.DEPOSIT_CONFIRMATIONS_REQUIRED ?? 1);
  const confirmations: Record<string, boolean> = {};
  let poolReady = true;

  for (const [playerCode, slot] of pool.slots) {
    if (!slot.confirmed) {
      const conf = await getAddressConfirmations(slot.depositAddress);
      if (conf >= requiredConf) slot.confirmed = true;
    }
    confirmations[playerCode] = slot.confirmed;
    if (!slot.confirmed) poolReady = false;
  }

  return { poolReady, confirmations };
};

export const payoutWinner = async (
  gameId: string,
  winnerPlayerCode: string
): Promise<string> => {
  const pool = pools.get(gameId);
  if (!pool) throw new Error("No stake pool for this game");

  // Idempotent: a crash-and-retry (or a duplicate checkWinner trigger)
  // must never double-pay.
  if (pool.payoutTxid) return pool.payoutTxid;

  const winnerSlot = pool.slots.get(winnerPlayerCode);
  if (!winnerSlot?.payoutAddress) {
    throw new Error("Winner has not set a payout address");
  }

  const feeAddress = process.env.PLATFORM_FEE_ADDRESS;
  if (!feeAddress) throw new Error("PLATFORM_FEE_ADDRESS is not configured");
  const feeBps = Number(process.env.PLATFORM_FEE_BPS ?? 500);

  const totalZec = round8(pool.stakeZec * pool.slots.size);
  const feeZec = round8((totalZec * feeBps) / 10_000);
  const winnerZec = round8(totalZec - feeZec);

  const txid = await sendMany({
    [winnerSlot.payoutAddress]: winnerZec,
    [feeAddress]: feeZec,
  });

  pool.payoutTxid = txid;
  return txid;
};

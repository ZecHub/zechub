'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Chain data response type (from /api/chain)
export interface ChainData {
  height: number;
  difficulty: number;
  pools: {
    transparent: number;
    sprout: number;
    sapling: number;
    orchard: number;
  };
}

export interface PriceData {
  timestamp: number | string;
  price: number;
}

export interface PoolsHistoryData {
  timestamp: number | string;
  sprout: number;
  sapling: number;
  orchard: number;
  transparent: number;
}

// Hook for fetching chain data (replaces useStatus)
export function useChainData(pollInterval = 30000) {
  const [data, setData] = useState<ChainData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchChainData = useCallback(async () => {
    try {
      const res = await fetch('/api/chain');
      if (!res.ok) throw new Error('Failed to fetch chain data');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChainData();
    const interval = setInterval(fetchChainData, pollInterval);
    return () => clearInterval(interval);
  }, [fetchChainData, pollInterval]);

  return { data, error, loading, refetch: fetchChainData };
}

// Legacy alias for backward compatibility during migration
export const useStatus = useChainData;

// Hook for fetching price history
export function usePrices(range: string = '1y') {
  const [data, setData] = useState<PriceData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const lastRangeRef = useRef(range);

  const fetchPrices = useCallback(async (forRange: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/prices?range=${forRange}`);
      if (!res.ok) throw new Error(`Failed to fetch prices: ${res.status}`);
      const json = await res.json();

      // Extract prices array from response
      let pricesArray: PriceData[] = [];
      if (Array.isArray(json)) {
        pricesArray = json;
      } else if (json.prices && Array.isArray(json.prices)) {
        pricesArray = json.prices;
      } else if (json.data && Array.isArray(json.data)) {
        pricesArray = json.data;
      } else {
        throw new Error('Invalid price data format');
      }


      // Normalize timestamps (convert date strings to unix ms)
      const normalized = pricesArray.map(p => ({
        timestamp: typeof p.timestamp === 'string'
          ? new Date(p.timestamp).getTime()
          : p.timestamp,
        price: p.price
      })).sort((a, b) => a.timestamp - b.timestamp); // Ensure sorted


      setData(normalized);
      setError(null);
    } catch (err) {
      console.error('[usePrices] Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear data and fetch when range changes
  useEffect(() => {
    if (range !== lastRangeRef.current) {
      setData(null); // Clear old data immediately
      lastRangeRef.current = range;
    }
    fetchPrices(range);
  }, [range, fetchPrices]);

  return { data, error, loading, refetch: () => fetchPrices(range) };
}

// Hook for current price from /api/price - polls every 60 seconds
export function useCurrentPrice(pollInterval = 60000) {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchPrice = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/price');
      if (!res.ok) throw new Error('Failed to fetch price');
      const json = await res.json();
      // Handle various response formats
      if (typeof json === 'number') {
        setPrice(json);
      } else if (json.priceUsd !== undefined) {
        setPrice(json.priceUsd);
      } else if (json.price !== undefined) {
        setPrice(json.price);
      } else if (json.usd !== undefined) {
        setPrice(json.usd);
      }
      setError(null);
      setLastFetch(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, pollInterval);
    return () => clearInterval(interval);
  }, [fetchPrice, pollInterval]);

  return { price, loading, error, lastFetch, refetch: fetchPrice };
}

// Extended API health data
export interface ApiHealthData {
  healthy: boolean | null;
  lastUpdate: Date | null;
  latency: number | null;
  blockHeight: number | null;
  priceUsd: number | null;
  shieldedPercent: number | null;
  totalShielded: number | null;
}

// Hook for API health status with extended stats
export function useApiHealth(pollInterval = 30000) {
  const [data, setData] = useState<ApiHealthData>({
    healthy: null,
    lastUpdate: null,
    latency: null,
    blockHeight: null,
    priceUsd: null,
    shieldedPercent: null,
    totalShielded: null,
  });

  const checkHealth = useCallback(async () => {
    const startTime = Date.now();
    try {
      const res = await fetch('/api/chain');
      const latency = Date.now() - startTime;

      if (res.ok) {
        const json = await res.json();
        const pools = json.pools || {};
        const totalShielded = (pools.sprout || 0) + (pools.sapling || 0) + (pools.orchard || 0);
        const totalSupply = (pools.transparent || 0) + totalShielded;
        const shieldedPercent = totalSupply > 0 ? (totalShielded / totalSupply) * 100 : 0;

        // Also fetch current price for the status
        let priceUsd = null;
        try {
          const priceRes = await fetch('/api/price');
          if (priceRes.ok) {
            const priceJson = await priceRes.json();
            priceUsd = priceJson.priceUsd ?? priceJson.price ?? priceJson.usd ?? null;
          }
        } catch {
          // Price fetch failed, that's ok
        }

        setData({
          healthy: true,
          lastUpdate: new Date(),
          latency,
          blockHeight: json.height || null,
          priceUsd,
          shieldedPercent,
          totalShielded,
        });
      } else {
        setData(prev => ({
          ...prev,
          healthy: false,
          latency,
        }));
      }
    } catch {
      setData(prev => ({
        ...prev,
        healthy: false,
        latency: null,
      }));
    }
  }, []);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, pollInterval);
    return () => clearInterval(interval);
  }, [checkHealth, pollInterval]);

  return { ...data, refetch: checkHealth };
}

// Legacy alias
export const useRpcHealth = useApiHealth;

// ── Mining / miner data ──────────────────────────────────────────────────────

export interface MinerEntry {
  address: string;
  tag: string | null;
  blockCount: number;
  totalReward: number;
  percentage: number;
  firstSeen?: string;
  lastSeen?: string;
}

export interface PoolEntry {
  tag: string;
  blockCount: number;
  totalReward: number;
  percentage: number;
}

export interface TimelineBucket {
  date: string;
  totalBlocks: number;
  totalReward: number;
}

function extractArray<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  const j = json as Record<string, unknown>;
  if (j && Array.isArray(j.data)) return j.data as T[];
  return [];
}

export function useMinerLeaderboard(range: string = '30d') {
  const [data, setData] = useState<MinerEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const lastRangeRef = useRef(range);

  const fetch_ = useCallback(async (r: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/miners?range=${r}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const raw = extractArray<Record<string, unknown>>(json);
      const totalBlocks = raw.reduce((s, item) => s + (Number(item.blocks ?? item.blockCount) || 0), 0);
      const normalized: MinerEntry[] = raw.map(item => ({
        address: String(item.address ?? ''),
        tag: String(item.pool ?? item.tag ?? '') || null,
        blockCount: Number(item.blocks ?? item.blockCount) || 0,
        totalReward: parseFloat(String(item.totalReward ?? '0')) || 0,
        percentage: totalBlocks > 0 ? ((Number(item.blocks ?? item.blockCount) || 0) / totalBlocks) * 100 : 0,
        firstSeen: String(item.firstBlock ?? item.firstSeen ?? '') || undefined,
        lastSeen: String(item.lastBlock ?? item.lastSeen ?? '') || undefined,
      }));
      setData(normalized);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load miner data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (range !== lastRangeRef.current) {
      setData(null);
      lastRangeRef.current = range;
    }
    fetch_(range);
  }, [range, fetch_]);

  return { data, error, loading, refetch: () => fetch_(range) };
}

export function useMinerPools(range: string = '30d') {
  const [data, setData] = useState<PoolEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const lastRangeRef = useRef(range);

  const fetch_ = useCallback(async (r: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/miners/pools?range=${r}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const raw = extractArray<Record<string, unknown>>(json);
      const normalized: PoolEntry[] = raw.map(item => ({
        tag: String(item.pool ?? item.tag ?? 'Unknown'),
        blockCount: Number(item.blocks ?? item.blockCount) || 0,
        totalReward: parseFloat(String(item.totalReward ?? '0')) || 0,
        percentage: Number(item.sharePct ?? item.percentage) || 0,
      }));
      setData(normalized);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load pool data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (range !== lastRangeRef.current) {
      setData(null);
      lastRangeRef.current = range;
    }
    fetch_(range);
  }, [range, fetch_]);

  return { data, error, loading, refetch: () => fetch_(range) };
}

export function useMinerTimeline(range: string = '90d') {
  const [data, setData] = useState<TimelineBucket[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const lastRangeRef = useRef(range);

  const fetch_ = useCallback(async (r: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/miners/timeline?range=${r}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // API returns { period, blocks, totalReward, miners } — aggregate, no per-pool breakdown
      const raw = extractArray<Record<string, unknown>>(json);
      const buckets: TimelineBucket[] = raw.map(item => ({
        date: String(item.period ?? item.date ?? item.timestamp ?? ''),
        totalBlocks: Number(item.blocks ?? item.blockCount) || 0,
        totalReward: parseFloat(String(item.totalReward ?? '0')) || 0,
      }));
      setData(buckets);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load timeline');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (range !== lastRangeRef.current) {
      setData(null);
      lastRangeRef.current = range;
    }
    fetch_(range);
  }, [range, fetch_]);

  return { data, error, loading, refetch: () => fetch_(range) };
}

// Hook for fetching pools history (for charts)
export function usePoolsHistory(range: string = '1y') {
  const [data, setData] = useState<PoolsHistoryData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const lastRangeRef = useRef(range);

  const fetchPools = useCallback(async (forRange: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pools?range=${forRange}`);

      if (!res.ok) {
        // Parse error message from response if available
        let errMsg = `Failed to fetch pools history: ${res.status}`;
        try {
          const errJson = await res.json();
          if (errJson.error) errMsg = errJson.error;
        } catch {
          // Ignore JSON parse errors
        }
        throw new Error(errMsg);
      }

      const json = await res.json();

      // Extract pools array from response
      let poolsArray: PoolsHistoryData[] = [];
      if (Array.isArray(json)) {
        poolsArray = json;
      } else if (json.pools && Array.isArray(json.pools)) {
        poolsArray = json.pools;
      } else if (json.data && Array.isArray(json.data)) {
        poolsArray = json.data;
      } else {
        throw new Error('Invalid pools data format');
      }


      // Normalize timestamps
      const normalized = poolsArray.map(p => ({
        timestamp: typeof p.timestamp === 'string'
          ? new Date(p.timestamp).getTime()
          : p.timestamp,
        sprout: p.sprout,
        sapling: p.sapling,
        orchard: p.orchard,
        transparent: p.transparent,
      })).sort((a, b) => a.timestamp - b.timestamp);

      setData(normalized);
      setError(null);
    } catch (err) {
      console.error('[usePoolsHistory] Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData(null); // Clear data on error so UI can show error state
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear data and fetch when range changes
  useEffect(() => {
    if (range !== lastRangeRef.current) {
      setData(null);
      setError(null);
      lastRangeRef.current = range;
    }
    fetchPools(range);
  }, [range, fetchPools]);

  return { data, error, loading, refetch: () => fetchPools(range) };
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface UseZcashBalanceResult {
  balance: number | null;
  balanceZat: number | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isCached: boolean;
  refresh: () => Promise<void>;
}

/**
 * Custom hook that polls the ZEC balance for a transparent address.
 *
 * @param address   - A Zcash mainnet t-address (t1.../t3...) or shielded z-address
 * @param pollMs    - Polling interval in milliseconds (default 20 000)
 * @param enabled   - Set to false to pause polling (e.g. when the tab is hidden)
 */
export function useZcashBalance(
  address: string | undefined | null,
  pollMs = 20_000,
  enabled = true
): UseZcashBalanceResult {
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceZat, setBalanceZat] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isCached, setIsCached] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/zcash/balance/${encodeURIComponent(address)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setBalance(data.balance);
      setBalanceZat(data.balanceZat ?? Math.round((data.balance ?? 0) * 1e8));
      setIsCached(!!data.cached);
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(e.message || "Failed to fetch balance");
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  // Initial fetch + polling
  useEffect(() => {
    if (!address || !enabled) {
      // Clear state when address is removed
      if (!address) {
        setBalance(null);
        setBalanceZat(null);
        setError(null);
        setLastUpdated(null);
      }
      return;
    }

    // Fetch immediately
    fetchBalance();

    // Set up polling
    intervalRef.current = setInterval(fetchBalance, pollMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [address, pollMs, enabled, fetchBalance]);

  return { balance, balanceZat, isLoading, error, lastUpdated, isCached, refresh: fetchBalance };
}

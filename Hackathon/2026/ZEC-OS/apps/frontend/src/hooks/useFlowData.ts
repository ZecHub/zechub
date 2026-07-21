'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  FlowDataPoint,
  FlowResponse,
  PrivacyWeatherData,
  FlowPressure,
} from '@/lib/privacy/types';
import {
  calculateShieldWindowScore,
  calculateCrowdActivity,
  calculatePoolGrowthTrend,
} from '@/lib/privacy/scoring';

// Use env var for mock data toggle (set MOCK_DATA=true|false in .env.local)
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_MOCK_DATA === 'true';

// API uses 1w/1m format, not 7d/30d
type FlowRange = '1d' | '3d' | '1w' | '1m' | '3m' | '6m' | '1y' | 'all';
type WeatherPeriod = '1d' | '1w' | '1m';

// ============================================
// API Response Types (what the API returns)
// ============================================

interface ApiFlowDataPoint {
  timestamp: string; // API uses 'timestamp' not 'date'
  date?: string; // Legacy fallback
  shielding: { sprout: number; sapling: number; orchard: number; total: number };
  deshielding: { sprout: number; sapling: number; orchard: number; total: number };
  net: { sprout: number; sapling: number; orchard: number; total: number };
  txCounts: { shielding: number; deshielding: number; mixed: number; total: number };
  operations: {
    sproutJoinsplits: number;
    saplingSpends: number;
    saplingOutputs: number;
    orchardActions: number;
    total: number;
  };
}

interface ApiFlowResponse {
  data: ApiFlowDataPoint[];
  count: number;
  range: string;
  totals: {
    shielding: number;
    deshielding: number;
    net: number;
    txCount: number;
    operations: number;
  };
}

// ============================================
// Transform API Response to Our Types
// ============================================

function transformApiResponse(apiResponse: ApiFlowResponse): FlowResponse {
  const data: FlowDataPoint[] = apiResponse.data.map((point) => {
    const shieldingVolume = point.shielding.total;
    const deshieldingVolume = point.deshielding.total;
    const totalVolume = shieldingVolume + deshieldingVolume;

    return {
      date: point.timestamp || point.date || '', // API uses 'timestamp'
      shielding: {
        volume: shieldingVolume,
        txCount: point.txCounts.shielding,
      },
      deshielding: {
        volume: deshieldingVolume,
        txCount: point.txCounts.deshielding,
      },
      netFlow: point.net.total,
      flowRatio: totalVolume > 0 ? shieldingVolume / totalVolume : 0.5,
      operations: point.operations,
    };
  });

  // Calculate summary from data
  const totalShielded = data.reduce((sum, d) => sum + d.shielding.volume, 0);
  const totalDeshielded = data.reduce((sum, d) => sum + d.deshielding.volume, 0);
  const avgFlowRatio = data.length > 0
    ? data.reduce((sum, d) => sum + d.flowRatio, 0) / data.length
    : 0.5;
  const avgDailyOps = data.length > 0
    ? data.reduce((sum, d) => sum + d.operations.total, 0) / data.length
    : 0;

  // Calculate shield score from recent data
  const recentFlows = data.slice(-7);
  const shieldWindow = calculateShieldWindowScore({
    flowRatio: avgFlowRatio,
    activityLevel: avgDailyOps / 4000, // ~4000 is baseline from real data
    poolGrowthTrend: recentFlows.length > 1 ? calculatePoolGrowthTrend(recentFlows) : 0,
    recentFlows,
  });

  return {
    data,
    summary: {
      period: apiResponse.range,
      totalShielded: Math.round(totalShielded),
      totalDeshielded: Math.round(totalDeshielded),
      avgFlowRatio: Math.round(avgFlowRatio * 1000) / 1000,
      avgDailyOps: Math.round(avgDailyOps),
      shieldScore: shieldWindow.score,
    },
  };
}

// ============================================
// Mock Data Generator (for development/testing)
// ============================================

function generateMockFlowData(range: FlowRange): FlowResponse {
  const now = new Date();
  const days: Record<FlowRange, number> = {
    '1d': 1,
    '3d': 3,
    '1w': 7,
    '1m': 30,
    '3m': 90,
    '6m': 180,
    '1y': 365,
    'all': 365,
  };

  const numDays = days[range];
  const data: FlowDataPoint[] = [];

  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const baseShielding = 10000 + Math.random() * 5000;
    const baseDeshielding = 8000 + Math.random() * 6000;

    const dayOfWeek = date.getDay();
    const weekdayMultiplier = (dayOfWeek > 0 && dayOfWeek < 6) ? 1.2 : 0.8;

    const shieldingVolume = Math.round(baseShielding * weekdayMultiplier * 100) / 100;
    const deshieldingVolume = Math.round(baseDeshielding * weekdayMultiplier * 100) / 100;
    const shieldingTxCount = Math.round(500 + Math.random() * 300);
    const deshieldingTxCount = Math.round(600 + Math.random() * 200);

    const saplingSpends = Math.round(150 + Math.random() * 100);
    const saplingOutputs = Math.round(350 + Math.random() * 150);
    const orchardActions = Math.round(2500 + Math.random() * 1500);
    const sproutJoinsplits = Math.round(Math.random() * 5);

    const totalVolume = shieldingVolume + deshieldingVolume;

    data.push({
      date: date.toISOString().split('T')[0],
      shielding: { volume: shieldingVolume, txCount: shieldingTxCount },
      deshielding: { volume: deshieldingVolume, txCount: deshieldingTxCount },
      netFlow: Math.round((shieldingVolume - deshieldingVolume) * 100) / 100,
      flowRatio: Math.round((shieldingVolume / totalVolume) * 1000) / 1000,
      operations: {
        sproutJoinsplits,
        saplingSpends,
        saplingOutputs,
        orchardActions,
        total: sproutJoinsplits + saplingSpends + saplingOutputs + orchardActions,
      },
    });
  }

  const totalShielded = data.reduce((sum, d) => sum + d.shielding.volume, 0);
  const totalDeshielded = data.reduce((sum, d) => sum + d.deshielding.volume, 0);
  const avgFlowRatio = data.reduce((sum, d) => sum + d.flowRatio, 0) / data.length;
  const avgDailyOps = data.reduce((sum, d) => sum + d.operations.total, 0) / data.length;

  const recentFlows = data.slice(-7);
  const shieldWindow = calculateShieldWindowScore({
    flowRatio: avgFlowRatio,
    activityLevel: avgDailyOps / 4000,
    poolGrowthTrend: calculatePoolGrowthTrend(recentFlows),
    recentFlows,
  });

  return {
    data,
    summary: {
      period: range,
      totalShielded: Math.round(totalShielded),
      totalDeshielded: Math.round(totalDeshielded),
      avgFlowRatio: Math.round(avgFlowRatio * 1000) / 1000,
      avgDailyOps: Math.round(avgDailyOps),
      shieldScore: shieldWindow.score,
    },
  };
}

// ============================================
// Flow Data Hook
// ============================================

interface UseFlowDataOptions {
  range?: FlowRange;
  pollInterval?: number;
}

interface UseFlowDataResult {
  data: FlowDataPoint[] | null;
  summary: FlowResponse['summary'] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFlowData(options: UseFlowDataOptions = {}): UseFlowDataResult {
  const { range = '1w', pollInterval = 0 } = options;

  const [data, setData] = useState<FlowDataPoint[] | null>(null);
  const [summary, setSummary] = useState<FlowResponse['summary'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const mockResponse = generateMockFlowData(range);
        setData(mockResponse.data);
        setSummary(mockResponse.summary);
      } else {
        const response = await fetch(`/api/flows?range=${range}`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const apiResult: ApiFlowResponse = await response.json();
        const transformed = transformApiResponse(apiResult);
        setData(transformed.data);
        setSummary(transformed.summary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch flow data');
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (pollInterval > 0) {
      const interval = setInterval(fetchData, pollInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, pollInterval]);

  return { data, summary, loading, error, refetch: fetchData };
}

// ============================================
// Privacy Weather Hook
// ============================================

interface UsePrivacyWeatherOptions {
  period?: WeatherPeriod;
  pollInterval?: number;
}

interface UsePrivacyWeatherResult {
  weather: PrivacyWeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePrivacyWeather(
  options: UsePrivacyWeatherOptions = {}
): UsePrivacyWeatherResult {
  const { period = '1d', pollInterval = 60000 } = options;

  // Map weather period to API range
  // '1d' uses 1w to get recent data (since API 1d is often empty), then we take the most recent day
  const range: FlowRange = period === '1d' ? '1w' : period;
  const { data, summary, loading, error, refetch } = useFlowData({ range, pollInterval });

  const [weather, setWeather] = useState<PrivacyWeatherData | null>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !summary) {
      setWeather(null);
      return;
    }

    // For 1d: use only the latest day
    // For 1w/1m: use averages across the period
    const latest = data[data.length - 1];
    const previous = data.length > 1 ? data[data.length - 2] : undefined;

    let shieldingVolume: number;
    let shieldingTxCount: number;
    let deshieldingVolume: number;
    let deshieldingTxCount: number;
    let netFlow: number;
    let flowRatio: number;
    let totalOps: number;

    if (period === '1d') {
      // Single day view - show just the latest day's values
      shieldingVolume = latest.shielding.volume;
      shieldingTxCount = latest.shielding.txCount;
      deshieldingVolume = latest.deshielding.volume;
      deshieldingTxCount = latest.deshielding.txCount;
      netFlow = latest.netFlow;
      flowRatio = latest.flowRatio;
      totalOps = latest.operations.total;
    } else {
      // Multi-day view - show period totals/averages
      shieldingVolume = data.reduce((sum, d) => sum + d.shielding.volume, 0);
      shieldingTxCount = data.reduce((sum, d) => sum + d.shielding.txCount, 0);
      deshieldingVolume = data.reduce((sum, d) => sum + d.deshielding.volume, 0);
      deshieldingTxCount = data.reduce((sum, d) => sum + d.deshielding.txCount, 0);
      netFlow = data.reduce((sum, d) => sum + d.netFlow, 0);
      const totalVol = shieldingVolume + deshieldingVolume;
      flowRatio = totalVol > 0 ? shieldingVolume / totalVol : 0.5;
      totalOps = data.reduce((sum, d) => sum + d.operations.total, 0);
    }

    // Calculate trends by comparing first half to second half of period
    const halfPoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, halfPoint);
    const secondHalf = data.slice(halfPoint);

    const firstShielding = firstHalf.reduce((sum, d) => sum + d.shielding.volume, 0) / (firstHalf.length || 1);
    const secondShielding = secondHalf.reduce((sum, d) => sum + d.shielding.volume, 0) / (secondHalf.length || 1);
    const firstDeshielding = firstHalf.reduce((sum, d) => sum + d.deshielding.volume, 0) / (firstHalf.length || 1);
    const secondDeshielding = secondHalf.reduce((sum, d) => sum + d.deshielding.volume, 0) / (secondHalf.length || 1);

    const shieldingTrendPct = period === '1d' && previous
      ? Math.round(((latest.shielding.volume - previous.shielding.volume) / previous.shielding.volume) * 100)
      : firstShielding > 0
      ? Math.round(((secondShielding - firstShielding) / firstShielding) * 100)
      : 0;

    const deshieldingTrendPct = period === '1d' && previous
      ? Math.round(((latest.deshielding.volume - previous.deshielding.volume) / previous.deshielding.volume) * 100)
      : firstDeshielding > 0
      ? Math.round(((secondDeshielding - firstDeshielding) / firstDeshielding) * 100)
      : 0;

    const shieldingPressure: FlowPressure = {
      volume: shieldingVolume,
      txCount: shieldingTxCount,
      trend: shieldingTrendPct > 5 ? 'rising' : shieldingTrendPct < -5 ? 'falling' : 'stable',
      trendPercent: shieldingTrendPct,
    };

    const deshieldingPressure: FlowPressure = {
      volume: deshieldingVolume,
      txCount: deshieldingTxCount,
      trend: deshieldingTrendPct > 5 ? 'rising' : deshieldingTrendPct < -5 ? 'falling' : 'stable',
      trendPercent: deshieldingTrendPct,
    };

    // Crowd activity: compare to baseline (4000 ops/day is typical)
    const dailyOpsAvg = period === '1d' ? totalOps : totalOps / data.length;
    const activityLevel = dailyOpsAvg / 4000;

    const firstOps = firstHalf.reduce((sum, d) => sum + d.operations.total, 0) / (firstHalf.length || 1);
    const secondOps = secondHalf.reduce((sum, d) => sum + d.operations.total, 0) / (secondHalf.length || 1);
    const opsTrendPct = period === '1d' && previous
      ? Math.round(((latest.operations.total - previous.operations.total) / previous.operations.total) * 100)
      : firstOps > 0
      ? Math.round(((secondOps - firstOps) / firstOps) * 100)
      : 0;

    const crowd = {
      totalOps,
      activityLevel,
      trend: opsTrendPct > 5 ? 'rising' as const : opsTrendPct < -5 ? 'falling' as const : 'stable' as const,
      trendPercent: Math.abs(opsTrendPct),
    };

    const shieldWindow = calculateShieldWindowScore({
      flowRatio,
      activityLevel,
      poolGrowthTrend: calculatePoolGrowthTrend(data),
      recentFlows: data,
    });

    setWeather({
      timestamp: new Date().toISOString(),
      period,
      shieldingPressure,
      deshieldingPressure,
      netFlow,
      flowRatio,
      crowd,
      shieldWindow,
    });
  }, [data, summary, period]);

  return { weather, loading, error, refetch };
}

export default useFlowData;

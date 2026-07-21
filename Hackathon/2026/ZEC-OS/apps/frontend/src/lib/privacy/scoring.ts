// Privacy Radar - Scoring System
// ===============================
// Calculates privacy scores from analysis results.
// All functions are pure with no side effects.

import {
  PrivacyScore,
  PrivacyGrade,
  AddressReuseAnalysis,
  TimingAnalysis,
  AmountAnalysis,
  PoolUsageAnalysis,
  LinkabilityAnalysis,
  RiskLevel,
  FlowDataPoint,
  ShieldWindow,
  WeatherCondition,
  CrowdActivity,
} from './types';

// ============================================
// Privacy Coach Scoring
// ============================================

const MAX_CATEGORY_SCORE = 25;
const MAX_TOTAL_SCORE = 100;

export function calculatePrivacyScore(
  addressReuse?: AddressReuseAnalysis[],
  timing?: TimingAnalysis,
  amounts?: AmountAnalysis,
  poolUsage?: PoolUsageAnalysis,
  linkability?: LinkabilityAnalysis
): PrivacyScore {
  // Calculate each category score (0-25, higher is better)
  const addressScore = calculateAddressScore(addressReuse);
  const timingScore = calculateTimingScore(timing);
  const amountScore = calculateAmountScore(amounts);
  const poolScore = calculatePoolScore(poolUsage);

  // Linkability affects overall but not shown as separate category
  const linkabilityPenalty = calculateLinkabilityPenalty(linkability);

  // Calculate overall (0-100)
  let overall = addressScore + timingScore + amountScore + poolScore;
  overall = Math.max(0, overall - linkabilityPenalty);
  overall = Math.min(MAX_TOTAL_SCORE, Math.max(0, Math.round(overall)));

  return {
    overall,
    grade: scoreToGrade(overall),
    breakdown: {
      addressReuse: addressScore,
      timing: timingScore,
      amounts: amountScore,
      poolChoice: poolScore,
    },
  };
}

function calculateAddressScore(analyses?: AddressReuseAnalysis[]): number {
  if (!analyses || analyses.length === 0) {
    return MAX_CATEGORY_SCORE; // No data = assume good
  }

  let score = MAX_CATEGORY_SCORE;

  for (const analysis of analyses) {
    switch (analysis.risk) {
      case 'high':
        score -= 10;
        break;
      case 'medium':
        score -= 5;
        break;
      case 'low':
        score -= 2;
        break;
    }

    // Extra penalty for send reuse
    if (analysis.sendCount > 1) {
      score -= 5 * (analysis.sendCount - 1);
    }
  }

  return Math.max(0, score);
}

function calculateTimingScore(timing?: TimingAnalysis): number {
  if (!timing) {
    return MAX_CATEGORY_SCORE;
  }

  switch (timing.risk) {
    case 'high':
      return 5;
    case 'medium':
      return 15;
    case 'low':
      return 22;
    case 'none':
    default:
      return MAX_CATEGORY_SCORE;
  }
}

function calculateAmountScore(amounts?: AmountAnalysis): number {
  if (!amounts) {
    return MAX_CATEGORY_SCORE;
  }

  let score = MAX_CATEGORY_SCORE;

  if (amounts.hasExactMatches) {
    score -= 15;
  }

  if (amounts.uniqueAmounts.length > 0) {
    score -= 5 * Math.min(amounts.uniqueAmounts.length, 2);
  }

  return Math.max(0, score);
}

function calculatePoolScore(poolUsage?: PoolUsageAnalysis): number {
  if (!poolUsage) {
    return MAX_CATEGORY_SCORE;
  }

  switch (poolUsage.preferredPool) {
    case 'orchard':
      return MAX_CATEGORY_SCORE;
    case 'sapling':
      return 22;
    case 'mixed':
      return 18;
    case 'sprout':
      return 8;
    case 'transparent':
      return 0;
    default:
      return MAX_CATEGORY_SCORE;
  }
}

function calculateLinkabilityPenalty(linkability?: LinkabilityAnalysis): number {
  if (!linkability) {
    return 0;
  }

  switch (linkability.risk) {
    case 'high':
      return 15;
    case 'medium':
      return 8;
    case 'low':
      return 3;
    default:
      return 0;
  }
}

function scoreToGrade(score: number): PrivacyGrade {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

// ============================================
// Privacy Weather Scoring (Shield Window)
// ============================================

export interface WeatherScoreInputs {
  flowRatio: number;           // 0-1, higher = more shielding
  activityLevel: number;       // Relative to baseline (1.0 = average)
  poolGrowthTrend: number;     // -1 to 1, positive = growing
  recentFlows: FlowDataPoint[];
}

export function calculateShieldWindowScore(inputs: WeatherScoreInputs): ShieldWindow {
  const {
    flowRatio,
    activityLevel,
    poolGrowthTrend,
  } = inputs;

  // Weights for each factor
  const FLOW_RATIO_WEIGHT = 35;
  const ACTIVITY_WEIGHT = 35;
  const POOL_GROWTH_WEIGHT = 20;
  const BASE_SCORE = 10; // Minimum baseline

  // Calculate component scores
  // Flow ratio: 0.5 = neutral, >0.5 = positive
  const flowScore = Math.min(1, Math.max(0, (flowRatio - 0.3) / 0.4)) * FLOW_RATIO_WEIGHT;

  // Activity: 1.0 = average, higher = better crowd cover
  const activityScore = Math.min(1, Math.max(0, activityLevel / 2)) * ACTIVITY_WEIGHT;

  // Pool growth: -1 to 1, positive is good
  const growthScore = Math.min(1, Math.max(0, (poolGrowthTrend + 1) / 2)) * POOL_GROWTH_WEIGHT;

  // Total score
  const score = Math.round(BASE_SCORE + flowScore + activityScore + growthScore);
  const clampedScore = Math.min(100, Math.max(0, score));

  // Determine condition and label
  let condition: WeatherCondition;
  let label: string;
  let reason: string;

  if (clampedScore >= 70) {
    condition = 'excellent';
    label = 'Excellent';
    reason = 'High activity and strong shielding momentum. Great time to shield!';
  } else if (clampedScore >= 50) {
    condition = 'good';
    label = 'Good';
    reason = 'Normal activity levels. Shielding conditions are favorable.';
  } else if (clampedScore >= 30) {
    condition = 'fair';
    label = 'Fair';
    reason = 'Below average activity. Consider waiting for more crowd cover.';
  } else {
    condition = 'poor';
    label = 'Wait';
    reason = 'Low activity or high deshielding. Better to wait for improved conditions.';
  }

  return {
    score: clampedScore,
    condition,
    label,
    reason,
  };
}

// ============================================
// Crowd Activity Calculation
// ============================================

export function calculateCrowdActivity(
  currentOps: number,
  avgOps: number,
  previousOps?: number
): CrowdActivity {
  const activityLevel = avgOps > 0 ? currentOps / avgOps : 1;

  let trend: CrowdActivity['trend'] = 'stable';
  let trendPercent = 0;

  if (previousOps !== undefined && previousOps > 0) {
    const change = (currentOps - previousOps) / previousOps;
    trendPercent = Math.round(change * 100);

    if (change > 0.05) {
      trend = 'rising';
    } else if (change < -0.05) {
      trend = 'falling';
    }
  }

  return {
    totalOps: currentOps,
    activityLevel: Math.round(activityLevel * 100) / 100,
    trend,
    trendPercent,
  };
}

// ============================================
// Pool Growth Trend Calculation
// ============================================

export function calculatePoolGrowthTrend(flows: FlowDataPoint[]): number {
  if (flows.length < 2) {
    return 0;
  }

  // Calculate net flows over the period
  const netFlows = flows.map(f => f.netFlow);

  // Simple linear regression slope
  const n = netFlows.length;
  const sumX = (n * (n - 1)) / 2;
  const sumY = netFlows.reduce((a, b) => a + b, 0);
  const sumXY = netFlows.reduce((sum, y, i) => sum + i * y, 0);
  const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

  // Normalize to -1 to 1 range
  const maxFlow = Math.max(...netFlows.map(Math.abs), 1);
  return Math.max(-1, Math.min(1, slope / maxFlow));
}

// ============================================
// Risk Level Helpers
// ============================================

export function riskToColor(risk: RiskLevel): string {
  switch (risk) {
    case 'high':
      return '#ff4444';
    case 'medium':
      return '#ffaa00';
    case 'low':
      return '#88cc00';
    case 'none':
    default:
      return '#00ff88';
  }
}

export function gradeToColor(grade: PrivacyGrade): string {
  switch (grade) {
    case 'A':
      return '#00ff88';
    case 'B':
      return '#88cc00';
    case 'C':
      return '#ffaa00';
    case 'D':
      return '#ff8800';
    case 'F':
      return '#ff4444';
  }
}

export function conditionToColor(condition: WeatherCondition): string {
  switch (condition) {
    case 'excellent':
      return '#00ff88';
    case 'good':
      return '#88cc00';
    case 'fair':
      return '#ffaa00';
    case 'poor':
      return '#ff4444';
  }
}

export function conditionToEmoji(condition: WeatherCondition): string {
  switch (condition) {
    case 'excellent':
      return '☀️';
    case 'good':
      return '🌤️';
    case 'fair':
      return '🌥️';
    case 'poor':
      return '🌧️';
  }
}

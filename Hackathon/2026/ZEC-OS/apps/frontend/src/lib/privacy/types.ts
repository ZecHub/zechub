// Privacy Radar - Type Definitions
// =================================

// ============================================
// Flow Data Types (from /api/flows)
// ============================================

export interface FlowDataPoint {
  date: string;
  shielding: {
    volume: number;
    txCount: number;
  };
  deshielding: {
    volume: number;
    txCount: number;
  };
  netFlow: number;
  flowRatio: number;
  operations: {
    sproutJoinsplits: number;
    saplingSpends: number;
    saplingOutputs: number;
    orchardActions: number;
    total: number;
  };
}

export interface FlowSummary {
  period: string;
  totalShielded: number;
  totalDeshielded: number;
  avgFlowRatio: number;
  avgDailyOps: number;
  shieldScore: number;
}

export interface FlowResponse {
  data: FlowDataPoint[];
  summary: FlowSummary;
}

// ============================================
// Privacy Weather Types
// ============================================

export type WeatherCondition = 'excellent' | 'good' | 'fair' | 'poor';

export interface ShieldWindow {
  score: number;              // 0-100
  condition: WeatherCondition;
  label: string;              // "Excellent", "Good", etc.
  reason: string;             // Human-readable explanation
}

export interface CrowdActivity {
  totalOps: number;
  activityLevel: number;      // Relative to baseline (1.0 = average)
  trend: 'rising' | 'falling' | 'stable';
  trendPercent: number;
}

export interface FlowPressure {
  volume: number;             // ZEC per period
  txCount: number;
  trend: 'rising' | 'falling' | 'stable';
  trendPercent: number;
}

export interface PrivacyWeatherData {
  timestamp: string;
  period: '1d' | '1w' | '1m';
  shieldingPressure: FlowPressure;
  deshieldingPressure: FlowPressure;
  netFlow: number;
  flowRatio: number;
  crowd: CrowdActivity;
  shieldWindow: ShieldWindow;
}

// ============================================
// Privacy Coach Types - Transaction Analysis
// ============================================

export interface TransactionInput {
  txid?: string;
  vout?: number;
  address?: string;
  value?: number;
  coinbase?: string;
}

export interface TransactionOutput {
  address?: string;
  value: number;
  scriptPubKey?: {
    type: string;
    addresses?: string[];
  };
}

export interface ShieldedActivity {
  sproutJoinsplits?: number;
  saplingSpends?: number;
  saplingOutputs?: number;
  orchardActions?: number;
  valueBalance?: number;
}

// Simplified transaction structure for analysis
export interface TransactionData {
  txid: string;
  blockhash?: string;
  blockheight?: number;
  blocktime?: number;
  confirmations?: number;
  size?: number;

  // Transparent I/O
  vin: TransactionInput[];
  vout: TransactionOutput[];

  // Shielded activity
  shielded?: ShieldedActivity;

  // Classification (if pre-computed)
  type?: 'coinbase' | 'transparent' | 'shielding' | 'deshielding' | 'mixed' | 'shielded';
}

// Address history for analysis
export interface AddressHistory {
  address: string;
  balance?: number;
  totalReceived?: number;
  totalSent?: number;
  txCount?: number;
  transactions: TransactionData[];
}

// ============================================
// Privacy Coach Types - Analysis Results
// ============================================

export type RiskLevel = 'none' | 'low' | 'medium' | 'high';
export type PrivacyGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface AddressReuseAnalysis {
  address: string;
  receiveCount: number;
  sendCount: number;
  totalUses: number;
  risk: RiskLevel;
  details: string;
}

export interface TimingAnalysis {
  pattern: 'immediate' | 'short' | 'delayed' | 'random';
  avgDelayBlocks: number;
  immediateShields: number;    // Count of shields within 10 blocks
  risk: RiskLevel;
  details: string;
}

export interface AmountAnalysis {
  hasRoundNumbers: boolean;
  roundNumberCount: number;
  hasExactMatches: boolean;    // Input ≈ output - fee
  exactMatchCount: number;
  uniqueAmounts: string[];     // Potentially fingerprintable amounts
  risk: RiskLevel;
  details: string;
}

export interface PoolUsageAnalysis {
  sproutUsage: number;
  saplingUsage: number;
  orchardUsage: number;
  preferredPool: 'sprout' | 'sapling' | 'orchard' | 'mixed' | 'transparent';
  risk: RiskLevel;
  details: string;
}

export interface LinkabilityAnalysis {
  linkedAddresses: string[];   // Addresses that appear linked
  linkageType: 'change' | 'timing' | 'amount' | 'multiple';
  confidence: 'low' | 'medium' | 'high';
  risk: RiskLevel;
  details: string;
}

// Composite analysis result
export interface PrivacyAnalysis {
  // Input summary
  inputType: 'transaction' | 'address' | 'history';
  inputSummary: string;

  // Individual analyses
  addressReuse?: AddressReuseAnalysis[];
  timing?: TimingAnalysis;
  amounts?: AmountAnalysis;
  poolUsage?: PoolUsageAnalysis;
  linkability?: LinkabilityAnalysis;

  // Aggregate scoring
  score: PrivacyScore;

  // Recommendations
  recommendations: Recommendation[];

  // Metadata
  analyzedAt: string;
}

export interface PrivacyScore {
  overall: number;            // 0-100
  grade: PrivacyGrade;
  breakdown: {
    addressReuse: number;     // 0-25
    timing: number;           // 0-25
    amounts: number;          // 0-25
    poolChoice: number;       // 0-25
  };
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: 'address' | 'timing' | 'amount' | 'pool' | 'general';
  title: string;
  description: string;
  action?: string;            // Actionable step
  learnMoreUrl?: string;
}

// ============================================
// Privacy Coach Input Types
// ============================================

export type CoachInputMode = 'transaction' | 'address' | 'history';

export interface CoachInput {
  mode: CoachInputMode;
  rawJson: string;
  parsed?: TransactionData | AddressHistory;
  parseError?: string;
}

// ============================================
// UI State Types
// ============================================

export interface PrivacyWeatherState {
  loading: boolean;
  error: string | null;
  data: PrivacyWeatherData | null;
  period: '1d' | '1w' | '1m';
}

export interface PrivacyCoachState {
  input: CoachInput;
  analysis: PrivacyAnalysis | null;
  analyzing: boolean;
  showTechnicalDetails: boolean;
}

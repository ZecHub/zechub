'use client';

import { useState, useCallback } from 'react';
import { TrustBadge } from './TrustBadge';
import {
  TransactionData,
  AddressHistory,
  PrivacyAnalysis,
  CoachInputMode,
  Recommendation,
} from '@/lib/privacy/types';
import {
  analyzeAddressReuse,
  analyzeAddressReuseFromTx,
  analyzeTimingPatterns,
  analyzeAmounts,
  analyzePoolUsage,
  analyzeLinkability,
  classifyTransaction,
} from '@/lib/privacy/analyzer';
import {
  generateRecommendations,
  getPositiveFeedback,
  PositiveFeedback,
} from '@/lib/privacy/recommendations';
import {
  calculatePrivacyScore,
  gradeToColor,
  riskToColor,
} from '@/lib/privacy/scoring';

// Sample data for testing
const SAMPLE_TX = `{
  "txid": "abc123def456...",
  "blockheight": 2500000,
  "blocktime": 1704067200,
  "vin": [
    { "address": "t1abc...", "value": 10.5 }
  ],
  "vout": [
    { "address": "t1xyz...", "value": 10.4995 }
  ],
  "shielded": {
    "saplingSpends": 0,
    "saplingOutputs": 0,
    "orchardActions": 0
  }
}`;

// Normalize different transaction JSON formats to our expected structure
// Handles: explorer format (inputs/outputs), API format (vin/vout), etc.
function normalizeTransactionData(parsed: Record<string, unknown>): TransactionData {
  // Handle txid
  const txid = (parsed.txid as string) || '';

  // Handle block info - explorer uses blockHeight (string), we use blockheight (number)
  const blockheight = parsed.blockheight !== undefined
    ? Number(parsed.blockheight)
    : parsed.blockHeight !== undefined
    ? Number(parsed.blockHeight)
    : undefined;

  // Handle timestamp - explorer uses timestamp, we use blocktime
  const blocktime = parsed.blocktime !== undefined
    ? Number(parsed.blocktime)
    : parsed.timestamp !== undefined
    ? Number(parsed.timestamp)
    : undefined;

  // Handle inputs - explorer uses 'inputs', we use 'vin'
  const rawInputs = (parsed.vin || parsed.inputs || []) as Array<Record<string, unknown>>;
  const vin = rawInputs.map((input) => ({
    txid: (input.txid || input.prevTxid) as string | undefined,
    vout: (input.vout || input.prevVout) as number | undefined,
    address: input.address as string | undefined,
    value: input.value as number | undefined,
    coinbase: input.coinbase as string | undefined,
  }));

  // Handle outputs - explorer uses 'outputs', we use 'vout'
  const rawOutputs = (parsed.vout || parsed.outputs || []) as Array<Record<string, unknown>>;
  const vout = rawOutputs.map((output) => ({
    address: output.address as string | undefined,
    value: (output.value || 0) as number,
    scriptPubKey: output.scriptPubKey as { type: string; addresses?: string[] } | undefined,
  }));

  // Handle shielded activity - can be nested (shielded.saplingSpends) or flat (shieldedSpends)
  const shieldedObj = parsed.shielded as Record<string, unknown> | undefined;
  const shielded = {
    sproutJoinsplits: shieldedObj?.sproutJoinsplits as number | undefined
      ?? parsed.sproutJoinsplits as number | undefined,
    saplingSpends: shieldedObj?.saplingSpends as number | undefined
      ?? parsed.saplingSpends as number | undefined
      ?? parsed.shieldedSpends as number | undefined,
    saplingOutputs: shieldedObj?.saplingOutputs as number | undefined
      ?? parsed.saplingOutputs as number | undefined
      ?? parsed.shieldedOutputs as number | undefined,
    orchardActions: shieldedObj?.orchardActions as number | undefined
      ?? parsed.orchardActions as number | undefined,
    valueBalance: shieldedObj?.valueBalance as number | undefined
      ?? parsed.valueBalanceSapling as number | undefined
      ?? parsed.valueBalance as number | undefined,
  };

  return {
    txid,
    blockhash: parsed.blockhash as string | undefined ?? parsed.blockHash as string | undefined,
    blockheight,
    blocktime,
    confirmations: parsed.confirmations as number | undefined,
    size: parsed.size as number | undefined,
    vin,
    vout,
    shielded,
  };
}

export function PrivacyCoach() {
  const [inputMode, setInputMode] = useState<CoachInputMode>('transaction');
  const [rawInput, setRawInput] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PrivacyAnalysis | null>(null);
  const [positiveFeedback, setPositiveFeedback] = useState<PositiveFeedback[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = useCallback(() => {
    setParseError(null);
    setAnalysis(null);
    setPositiveFeedback([]);

    if (!rawInput.trim()) {
      setParseError('Please paste your transaction or address data.');
      return;
    }

    setAnalyzing(true);

    // Simulate brief processing (all sync, but shows loading state)
    setTimeout(() => {
      try {
        const parsed = JSON.parse(rawInput);

        if (inputMode === 'transaction' || parsed.txid) {
          // Single transaction analysis - normalize different JSON formats
          const tx = normalizeTransactionData(parsed);
          tx.type = tx.type || classifyTransaction(tx);

          const addressReuse = analyzeAddressReuseFromTx(tx);
          const amounts = analyzeAmounts(tx);
          const poolUsage = analyzePoolUsage(tx);

          const score = calculatePrivacyScore(
            addressReuse,
            undefined,
            amounts,
            poolUsage,
            undefined
          );

          const recommendations = generateRecommendations(
            addressReuse,
            undefined,
            amounts,
            poolUsage,
            undefined,
            tx.type
          );

          const feedback = getPositiveFeedback(poolUsage, undefined, amounts);

          setAnalysis({
            inputType: 'transaction',
            inputSummary: `Transaction ${truncate(tx.txid, 16)} (${tx.type})`,
            addressReuse: addressReuse.length > 0 ? addressReuse : undefined,
            amounts,
            poolUsage,
            score,
            recommendations,
            analyzedAt: new Date().toISOString(),
          });
          setPositiveFeedback(feedback);

        } else if (inputMode === 'address' || inputMode === 'history' || parsed.address) {
          // Address history analysis
          const history = parsed as AddressHistory;

          if (!history.transactions || history.transactions.length === 0) {
            setParseError('No transactions found in the address history data.');
            setAnalyzing(false);
            return;
          }

          const addressReuse = analyzeAddressReuse(history);
          const timing = analyzeTimingPatterns(history);
          const poolUsage = analyzePoolUsage(history);
          const linkability = analyzeLinkability(history);

          // Analyze amounts from first few transactions
          const sampleTx = history.transactions[0];
          const amounts = sampleTx ? analyzeAmounts(sampleTx) : undefined;

          const score = calculatePrivacyScore(
            addressReuse,
            timing,
            amounts,
            poolUsage,
            linkability
          );

          const recommendations = generateRecommendations(
            addressReuse,
            timing,
            amounts,
            poolUsage,
            linkability
          );

          const feedback = getPositiveFeedback(poolUsage, timing, amounts);

          setAnalysis({
            inputType: 'history',
            inputSummary: `Address ${truncate(history.address, 16)} (${history.transactions.length} txs)`,
            addressReuse: addressReuse.length > 0 ? addressReuse : undefined,
            timing,
            amounts,
            poolUsage,
            linkability,
            score,
            recommendations,
            analyzedAt: new Date().toISOString(),
          });
          setPositiveFeedback(feedback);

        } else {
          setParseError('Could not determine data type. Please select the correct mode.');
        }
      } catch {
        setParseError('Invalid JSON. Please paste valid transaction or address data.');
      }

      setAnalyzing(false);
    }, 100);
  }, [rawInput, inputMode]);

  const handleClear = () => {
    setRawInput('');
    setParseError(null);
    setAnalysis(null);
    setPositiveFeedback([]);
  };

  const handleLoadSample = () => {
    setRawInput(SAMPLE_TX);
    setInputMode('transaction');
    setParseError(null);
    setAnalysis(null);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with Trust Badge */}
      <div className="p-3 border-b" style={{ borderColor: 'var(--border-window)' }}>
        <div className="flex items-center justify-between mb-2">
          <h2
            style={{
              color: 'var(--accent-gold)',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--font-size-title)',
            }}
          >
            Privacy Coach
          </h2>
          <TrustBadge compact />
        </div>
        <TrustBadge />
      </div>

      {/* Input Section */}
      <div className="p-3 border-b" style={{ borderColor: 'var(--border-window)' }}>
        {/* Mode Selection */}
        <div className="flex gap-2 mb-3">
          {(['transaction', 'address', 'history'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setInputMode(mode)}
              className="px-3 py-1 text-sm rounded"
              style={{
                background: inputMode === mode
                  ? 'var(--accent-gold)'
                  : 'var(--bg-window)',
                color: inputMode === mode
                  ? 'var(--bg-desktop)'
                  : 'var(--text-primary)',
                border: '1px solid var(--border-window)',
                fontSize: 'var(--font-size-icon)',
              }}
            >
              {mode === 'transaction' ? 'Transaction' :
               mode === 'address' ? 'Address' : 'History'}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder={`Paste your ${inputMode} JSON data here...\n\nGet this data from any block explorer, then paste it here for private analysis.`}
          className="w-full h-32 p-2 rounded resize-none"
          style={{
            background: 'var(--bg-desktop)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-window)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-icon)',
          }}
        />

        {parseError && (
          <p
            className="mt-2"
            style={{ color: '#ff4444', fontSize: 'var(--font-size-icon)' }}
          >
            {parseError}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !rawInput.trim()}
            className="px-4 py-2 rounded font-bold"
            style={{
              background: analyzing ? 'var(--text-muted)' : 'var(--accent-green)',
              color: 'var(--bg-desktop)',
              fontSize: 'var(--font-size-button)',
              opacity: !rawInput.trim() ? 0.5 : 1,
            }}
          >
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded"
            style={{
              background: 'var(--bg-window)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-window)',
              fontSize: 'var(--font-size-button)',
            }}
          >
            Clear
          </button>
          <button
            onClick={handleLoadSample}
            className="px-4 py-2 rounded"
            style={{
              background: 'var(--bg-window)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-window)',
              fontSize: 'var(--font-size-button)',
            }}
          >
            Load Sample
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-y-auto p-3">
        {analysis ? (
          <AnalysisResults analysis={analysis} positiveFeedback={positiveFeedback} />
        ) : (
          <div
            className="text-center py-8"
            style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-label)' }}
          >
            Paste your data above and click Analyze
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Analysis Results Component
// ============================================

interface AnalysisResultsProps {
  analysis: PrivacyAnalysis;
  positiveFeedback: PositiveFeedback[];
}

function AnalysisResults({ analysis, positiveFeedback }: AnalysisResultsProps) {
  return (
    <div className="space-y-4">
      {/* Score Header */}
      <div
        className="p-4 rounded text-center"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid var(--border-window)',
        }}
      >
        <p
          className="mb-2"
          style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-icon)' }}
        >
          {analysis.inputSummary}
        </p>
        <div className="flex items-center justify-center gap-4">
          <div>
            <span
              className="text-4xl font-bold"
              style={{ color: gradeToColor(analysis.score.grade) }}
            >
              {analysis.score.overall}
            </span>
            <span
              className="text-xl"
              style={{ color: 'var(--text-muted)' }}
            >
              /100
            </span>
          </div>
          <div
            className="text-6xl font-bold"
            style={{ color: gradeToColor(analysis.score.grade) }}
          >
            {analysis.score.grade}
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="flex justify-center gap-4 mt-4">
          {Object.entries(analysis.score.breakdown).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {value}/25
              </div>
              <div
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {formatBreakdownKey(key)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div>
          <h3
            className="mb-2 flex items-center gap-2"
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-label)',
            }}
          >
            <span>⚠️</span>
            <span>Recommendations</span>
          </h3>
          <div className="space-y-2">
            {analysis.recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Positive Feedback */}
      {positiveFeedback.length > 0 && (
        <div>
          <h3
            className="mb-2 flex items-center gap-2"
            style={{
              color: 'var(--accent-green)',
              fontSize: 'var(--font-size-label)',
            }}
          >
            <span>✓</span>
            <span>Doing Well</span>
          </h3>
          <div className="space-y-2">
            {positiveFeedback.map((fb, i) => (
              <div
                key={i}
                className="p-2 rounded"
                style={{
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid var(--accent-green)',
                }}
              >
                <div
                  className="font-bold"
                  style={{ color: 'var(--accent-green)', fontSize: 'var(--font-size-button)' }}
                >
                  {fb.title}
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-icon)' }}>
                  {fb.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Analysis Sections */}
      {analysis.addressReuse && analysis.addressReuse.length > 0 && (
        <AnalysisSection title="Address Usage">
          {analysis.addressReuse.map((ar, i) => (
            <div key={i} className="flex justify-between items-center py-1">
              <span style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-icon)' }}>
                {ar.address}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: riskToColor(ar.risk),
                  color: ar.risk === 'none' ? 'var(--bg-desktop)' : '#000',
                }}
              >
                {ar.totalUses} uses
              </span>
            </div>
          ))}
        </AnalysisSection>
      )}

      {analysis.timing && (
        <AnalysisSection title="Timing Analysis">
          <div style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-icon)' }}>
            <p>Pattern: <strong>{analysis.timing.pattern}</strong></p>
            <p>Avg delay: <strong>{analysis.timing.avgDelayBlocks} blocks</strong></p>
            <p className="mt-1" style={{ color: 'var(--text-muted)' }}>
              {analysis.timing.details}
            </p>
          </div>
        </AnalysisSection>
      )}

      {analysis.poolUsage && (
        <AnalysisSection title="Pool Usage">
          <div style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-icon)' }}>
            <p>Preferred pool: <strong>{analysis.poolUsage.preferredPool}</strong></p>
            <div className="flex gap-4 mt-2">
              <span>Sprout: {analysis.poolUsage.sproutUsage}</span>
              <span>Sapling: {analysis.poolUsage.saplingUsage}</span>
              <span>Orchard: {analysis.poolUsage.orchardUsage}</span>
            </div>
            <p className="mt-1" style={{ color: 'var(--text-muted)' }}>
              {analysis.poolUsage.details}
            </p>
          </div>
        </AnalysisSection>
      )}
    </div>
  );
}

// ============================================
// Helper Components
// ============================================

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const [expanded, setExpanded] = useState(false);
  const priorityColors = {
    high: '#ff4444',
    medium: '#ffaa00',
    low: '#88cc00',
  };

  return (
    <div
      className="p-3 rounded cursor-pointer"
      style={{
        background: 'rgba(0, 0, 0, 0.2)',
        borderLeft: `3px solid ${priorityColors[recommendation.priority]}`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div>
          <div
            className="font-bold"
            style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-button)' }}
          >
            {recommendation.title}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-icon)' }}>
            {recommendation.description}
          </div>
        </div>
        <span
          className="px-2 py-0.5 rounded text-xs uppercase"
          style={{
            background: priorityColors[recommendation.priority],
            color: recommendation.priority === 'low' ? '#000' : '#fff',
          }}
        >
          {recommendation.priority}
        </span>
      </div>

      {expanded && recommendation.action && (
        <div
          className="mt-2 pt-2"
          style={{ borderTop: '1px solid var(--border-window)' }}
        >
          <p style={{ color: 'var(--accent-green)', fontSize: 'var(--font-size-icon)' }}>
            <strong>Action:</strong> {recommendation.action}
          </p>
          {recommendation.learnMoreUrl && (
            <a
              href={recommendation.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline mt-1 inline-block"
              style={{ color: 'var(--text-secondary)' }}
              onClick={(e) => e.stopPropagation()}
            >
              Learn more →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function AnalysisSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="rounded overflow-hidden"
      style={{ border: '1px solid var(--border-window)' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-2 flex items-center justify-between"
        style={{ background: 'rgba(0, 0, 0, 0.2)' }}
      >
        <span
          style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-button)' }}
        >
          {title}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>
          {expanded ? '▼' : '▶'}
        </span>
      </button>
      {expanded && (
        <div className="p-2" style={{ background: 'var(--bg-desktop)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ============================================
// Utility Functions
// ============================================

function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return `${str.slice(0, len / 2)}...${str.slice(-len / 2 + 3)}`;
}

function formatBreakdownKey(key: string): string {
  const labels: Record<string, string> = {
    addressReuse: 'Address',
    timing: 'Timing',
    amounts: 'Amounts',
    poolChoice: 'Pool',
  };
  return labels[key] || key;
}

export default PrivacyCoach;

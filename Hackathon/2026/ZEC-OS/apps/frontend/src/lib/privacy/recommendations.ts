// Privacy Radar - Recommendation Engine
// ======================================
// Pure functions that generate actionable recommendations
// based on privacy analysis results.

import {
  Recommendation,
  AddressReuseAnalysis,
  TimingAnalysis,
  AmountAnalysis,
  PoolUsageAnalysis,
  LinkabilityAnalysis,
  TransactionData,
} from './types';

// ============================================
// Recommendation Definitions
// ============================================

const RECOMMENDATIONS: Record<string, Omit<Recommendation, 'id'>> = {
  // Address Reuse
  ADDRESS_REUSE_HIGH: {
    priority: 'high',
    category: 'address',
    title: 'Avoid address reuse',
    description: 'You have received multiple times to the same address. Each reuse creates linkability between transactions.',
    action: 'Generate a new address for every receive. Most wallets do this automatically.',
    learnMoreUrl: 'https://z.cash/technology/',
  },
  ADDRESS_REUSE_MEDIUM: {
    priority: 'medium',
    category: 'address',
    title: 'Consider fresh addresses',
    description: 'Some addresses have been reused. While not critical, fresh addresses improve privacy.',
    action: 'Use a new address for each transaction when possible.',
  },
  ADDRESS_SEND_REUSE: {
    priority: 'high',
    category: 'address',
    title: 'Sending from reused address',
    description: 'You have sent multiple times from the same address. This reveals your spending patterns publicly.',
    action: 'Shield your funds, then send from shielded. This breaks the linkage.',
  },

  // Timing
  TIMING_IMMEDIATE: {
    priority: 'high',
    category: 'timing',
    title: 'Delay shielding transactions',
    description: 'You shield funds immediately after receiving. This timing correlation can link your transparent and shielded activity.',
    action: 'Wait at least 10-20 blocks (25-50 minutes) before shielding. Randomize the delay.',
    learnMoreUrl: 'https://electriccoin.co/blog/',
  },
  TIMING_SHORT: {
    priority: 'medium',
    category: 'timing',
    title: 'Increase shielding delay',
    description: 'Your shielding happens relatively quickly after receiving. A longer delay improves privacy.',
    action: 'Consider waiting longer and varying your timing to avoid patterns.',
  },
  TIMING_GOOD: {
    priority: 'low',
    category: 'timing',
    title: 'Good timing practices',
    description: 'Your transaction timing shows reasonable separation. Keep it up!',
    action: 'Continue varying your timing to maintain good privacy.',
  },

  // Amounts
  AMOUNT_EXACT_MATCH: {
    priority: 'high',
    category: 'amount',
    title: 'Avoid exact amount matches',
    description: 'Your transaction has inputs and outputs with nearly identical amounts. This reveals linkage.',
    action: 'Add or subtract small amounts to break the correlation. Batch multiple operations.',
  },
  AMOUNT_FINGERPRINT: {
    priority: 'medium',
    category: 'amount',
    title: 'Avoid unique amounts',
    description: 'Your transaction uses very specific amounts that could be fingerprinted.',
    action: 'Round to common amounts when possible, or use shielded transactions.',
  },
  AMOUNT_ROUND_GOOD: {
    priority: 'low',
    category: 'amount',
    title: 'Round amounts detected',
    description: 'Using round amounts helps you blend in with common transaction patterns.',
  },

  // Pool Usage
  POOL_TRANSPARENT: {
    priority: 'high',
    category: 'pool',
    title: 'Start using shielded pools',
    description: 'Your transactions are fully transparent. You\'re not using Zcash\'s privacy features.',
    action: 'Shield your funds to Sapling or Orchard pools for transaction privacy.',
    learnMoreUrl: 'https://z.cash/technology/',
  },
  POOL_SPROUT: {
    priority: 'high',
    category: 'pool',
    title: 'Migrate from Sprout',
    description: 'You\'re using the deprecated Sprout pool. It has known limitations and smaller anonymity set.',
    action: 'Move your funds to Sapling or Orchard. Most wallets support automatic migration.',
  },
  POOL_SAPLING: {
    priority: 'low',
    category: 'pool',
    title: 'Consider Orchard',
    description: 'You\'re using Sapling, which is good. Orchard offers the newest privacy improvements.',
    action: 'When convenient, migrate to Orchard for the latest privacy features.',
  },
  POOL_ORCHARD: {
    priority: 'low',
    category: 'pool',
    title: 'Excellent pool choice',
    description: 'You\'re using Orchard, the most private pool with the latest cryptographic improvements.',
  },

  // Linkability
  LINKABILITY_HIGH: {
    priority: 'high',
    category: 'general',
    title: 'Address clustering detected',
    description: 'Multiple addresses appear linked through your transaction patterns. An observer could cluster them as belonging to the same entity.',
    action: 'Use shielded addresses to break the link between your transparent addresses.',
  },
  LINKABILITY_MEDIUM: {
    priority: 'medium',
    category: 'general',
    title: 'Potential address linkage',
    description: 'Some addresses may be linkable through co-occurrence. Consider improving address hygiene.',
    action: 'Avoid using multiple transparent addresses in the same transaction.',
  },

  // General Best Practices
  USE_UNIFIED_ADDRESSES: {
    priority: 'medium',
    category: 'general',
    title: 'Use Unified Addresses',
    description: 'Unified Addresses (UA) automatically route to the most private pool available.',
    action: 'Upgrade your wallet and share UAs instead of individual t/z-addresses.',
    learnMoreUrl: 'https://zips.z.cash/zip-0316',
  },
  BATCH_SHIELDING: {
    priority: 'medium',
    category: 'general',
    title: 'Batch your shielding',
    description: 'Multiple small shield operations create more metadata than one larger operation.',
    action: 'Accumulate transparent funds and shield in larger batches when activity is high.',
  },
  SHIELD_FIRST: {
    priority: 'medium',
    category: 'general',
    title: 'Shield before spending',
    description: 'For best privacy, shield incoming funds before making payments.',
    action: 'Receive to transparent, shield, then spend from shielded for maximum privacy.',
  },
};

// ============================================
// Recommendation Generation
// ============================================

export function generateRecommendations(
  addressReuse?: AddressReuseAnalysis[],
  timing?: TimingAnalysis,
  amounts?: AmountAnalysis,
  poolUsage?: PoolUsageAnalysis,
  linkability?: LinkabilityAnalysis,
  txType?: TransactionData['type']
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  let idCounter = 1;

  const addRec = (key: string) => {
    const rec = RECOMMENDATIONS[key];
    if (rec) {
      recommendations.push({
        ...rec,
        id: `rec-${idCounter++}`,
      });
    }
  };

  // Address reuse recommendations
  if (addressReuse && addressReuse.length > 0) {
    const highRisk = addressReuse.filter(a => a.risk === 'high');
    const sendReuse = addressReuse.filter(a => a.sendCount > 1);

    if (sendReuse.length > 0) {
      addRec('ADDRESS_SEND_REUSE');
    } else if (highRisk.length > 0) {
      addRec('ADDRESS_REUSE_HIGH');
    } else if (addressReuse.some(a => a.risk === 'medium')) {
      addRec('ADDRESS_REUSE_MEDIUM');
    }
  }

  // Timing recommendations
  if (timing) {
    if (timing.risk === 'high') {
      addRec('TIMING_IMMEDIATE');
    } else if (timing.risk === 'medium') {
      addRec('TIMING_SHORT');
    } else if (timing.pattern === 'random' || timing.pattern === 'delayed') {
      addRec('TIMING_GOOD');
    }
  }

  // Amount recommendations
  if (amounts) {
    if (amounts.hasExactMatches) {
      addRec('AMOUNT_EXACT_MATCH');
    } else if (amounts.uniqueAmounts.length > 0) {
      addRec('AMOUNT_FINGERPRINT');
    } else if (amounts.hasRoundNumbers) {
      addRec('AMOUNT_ROUND_GOOD');
    }
  }

  // Pool usage recommendations
  if (poolUsage) {
    switch (poolUsage.preferredPool) {
      case 'transparent':
        addRec('POOL_TRANSPARENT');
        addRec('USE_UNIFIED_ADDRESSES');
        break;
      case 'sprout':
        addRec('POOL_SPROUT');
        break;
      case 'sapling':
        addRec('POOL_SAPLING');
        break;
      case 'orchard':
        addRec('POOL_ORCHARD');
        break;
    }
  }

  // Linkability recommendations
  if (linkability) {
    if (linkability.risk === 'high') {
      addRec('LINKABILITY_HIGH');
    } else if (linkability.risk === 'medium') {
      addRec('LINKABILITY_MEDIUM');
    }
  }

  // Transaction-type specific recommendations
  if (txType === 'transparent') {
    // Already added POOL_TRANSPARENT above
    addRec('SHIELD_FIRST');
  } else if (txType === 'shielding') {
    addRec('BATCH_SHIELDING');
  }

  // Sort by priority
  const priorityOrder: Record<Recommendation['priority'], number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  return recommendations.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

// ============================================
// Positive Reinforcement
// ============================================

export interface PositiveFeedback {
  title: string;
  description: string;
}

export function getPositiveFeedback(
  poolUsage?: PoolUsageAnalysis,
  timing?: TimingAnalysis,
  amounts?: AmountAnalysis
): PositiveFeedback[] {
  const feedback: PositiveFeedback[] = [];

  if (poolUsage?.preferredPool === 'orchard') {
    feedback.push({
      title: 'Using Orchard pool',
      description: 'Excellent choice! Orchard provides the strongest privacy.',
    });
  } else if (poolUsage?.preferredPool === 'sapling') {
    feedback.push({
      title: 'Using shielded transactions',
      description: 'Good! Your transactions benefit from privacy features.',
    });
  }

  if (timing?.pattern === 'random' || timing?.pattern === 'delayed') {
    feedback.push({
      title: 'Good timing hygiene',
      description: 'Your transaction timing doesn\'t show obvious patterns.',
    });
  }

  if (amounts && !amounts.hasExactMatches && amounts.uniqueAmounts.length === 0) {
    feedback.push({
      title: 'No amount fingerprints',
      description: 'Your amounts don\'t stand out as fingerprintable.',
    });
  }

  return feedback;
}

// Privacy Radar - Analysis Functions
// ===================================
// IMPORTANT: All functions in this file are PURE.
// They make NO network requests and have NO side effects.
// This ensures Privacy Coach can operate in offline mode.

import {
  TransactionData,
  AddressHistory,
  AddressReuseAnalysis,
  TimingAnalysis,
  AmountAnalysis,
  PoolUsageAnalysis,
  LinkabilityAnalysis,
  RiskLevel,
} from './types';

// ============================================
// Address Reuse Analysis
// ============================================

export function analyzeAddressReuse(
  history: AddressHistory
): AddressReuseAnalysis[] {
  const addressUsage = new Map<string, { receives: number; sends: number }>();

  // Count receives and sends per address
  for (const tx of history.transactions) {
    // Count receives (outputs to addresses)
    for (const vout of tx.vout) {
      const addr = vout.address || vout.scriptPubKey?.addresses?.[0];
      if (addr) {
        const usage = addressUsage.get(addr) || { receives: 0, sends: 0 };
        usage.receives++;
        addressUsage.set(addr, usage);
      }
    }

    // Count sends (inputs from addresses)
    for (const vin of tx.vin) {
      if (vin.address) {
        const usage = addressUsage.get(vin.address) || { receives: 0, sends: 0 };
        usage.sends++;
        addressUsage.set(vin.address, usage);
      }
    }
  }

  // Analyze each address
  const results: AddressReuseAnalysis[] = [];

  for (const [address, usage] of addressUsage) {
    const totalUses = usage.receives + usage.sends;
    let risk: RiskLevel = 'none';
    let details = '';

    if (usage.sends > 1) {
      risk = 'high';
      details = `Address sent from ${usage.sends} times. Each send reveals the address publicly.`;
    } else if (usage.receives > 3) {
      risk = 'high';
      details = `Address received ${usage.receives} times. Multiple receives create linkability.`;
    } else if (usage.receives > 1) {
      risk = 'medium';
      details = `Address received ${usage.receives} times. Consider using fresh addresses.`;
    } else if (totalUses === 1) {
      risk = 'none';
      details = 'Address used only once. Good practice!';
    } else {
      risk = 'low';
      details = `Address used ${totalUses} times total.`;
    }

    results.push({
      address: truncateAddress(address),
      receiveCount: usage.receives,
      sendCount: usage.sends,
      totalUses,
      risk,
      details,
    });
  }

  // Sort by risk (high first)
  return results.sort((a, b) => riskOrder(b.risk) - riskOrder(a.risk));
}

export function analyzeAddressReuseFromTx(
  tx: TransactionData
): AddressReuseAnalysis[] {
  // For single transaction, we can only flag if same address appears multiple times
  const addressCounts = new Map<string, number>();

  for (const vout of tx.vout) {
    const addr = vout.address || vout.scriptPubKey?.addresses?.[0];
    if (addr) {
      addressCounts.set(addr, (addressCounts.get(addr) || 0) + 1);
    }
  }

  for (const vin of tx.vin) {
    if (vin.address) {
      addressCounts.set(vin.address, (addressCounts.get(vin.address) || 0) + 1);
    }
  }

  const results: AddressReuseAnalysis[] = [];

  for (const [address, count] of addressCounts) {
    if (count > 1) {
      results.push({
        address: truncateAddress(address),
        receiveCount: count,
        sendCount: 0,
        totalUses: count,
        risk: 'medium',
        details: `Address appears ${count} times in this transaction (likely change address).`,
      });
    }
  }

  return results;
}

// ============================================
// Timing Pattern Analysis
// ============================================

export function analyzeTimingPatterns(
  history: AddressHistory
): TimingAnalysis {
  const transactions = history.transactions
    .filter(tx => tx.blockheight)
    .sort((a, b) => (a.blockheight || 0) - (b.blockheight || 0));

  if (transactions.length < 2) {
    return {
      pattern: 'random',
      avgDelayBlocks: 0,
      immediateShields: 0,
      risk: 'none',
      details: 'Insufficient transaction history for timing analysis.',
    };
  }

  // Find receive → shield patterns
  const delays: number[] = [];
  let immediateShields = 0;

  for (let i = 0; i < transactions.length - 1; i++) {
    const current = transactions[i];
    const next = transactions[i + 1];

    // Check if current is a receive (has outputs to our addresses)
    // and next is a shielding tx
    const isReceive = current.vout.length > 0 && !current.shielded?.saplingSpends;
    const isShield = next.type === 'shielding' ||
      (next.shielded?.saplingOutputs || 0) > 0 ||
      (next.shielded?.orchardActions || 0) > 0;

    if (isReceive && isShield && current.blockheight && next.blockheight) {
      const delay = next.blockheight - current.blockheight;
      delays.push(delay);
      if (delay <= 10) {
        immediateShields++;
      }
    }
  }

  if (delays.length === 0) {
    return {
      pattern: 'random',
      avgDelayBlocks: 0,
      immediateShields: 0,
      risk: 'none',
      details: 'No receive-to-shield patterns detected.',
    };
  }

  const avgDelay = delays.reduce((a, b) => a + b, 0) / delays.length;
  const immediateRatio = immediateShields / delays.length;

  let pattern: TimingAnalysis['pattern'];
  let risk: RiskLevel;
  let details: string;

  if (avgDelay <= 10 || immediateRatio > 0.5) {
    pattern = 'immediate';
    risk = 'high';
    details = `${immediateShields} of ${delays.length} shields happened within 10 blocks of receiving. This creates timing correlation.`;
  } else if (avgDelay <= 50) {
    pattern = 'short';
    risk = 'medium';
    details = `Average delay of ${Math.round(avgDelay)} blocks before shielding. Consider waiting longer.`;
  } else if (avgDelay <= 200) {
    pattern = 'delayed';
    risk = 'low';
    details = `Average delay of ${Math.round(avgDelay)} blocks. Reasonable timing separation.`;
  } else {
    pattern = 'random';
    risk = 'none';
    details = `Average delay of ${Math.round(avgDelay)} blocks. Good timing hygiene!`;
  }

  return {
    pattern,
    avgDelayBlocks: Math.round(avgDelay),
    immediateShields,
    risk,
    details,
  };
}

// ============================================
// Amount Analysis
// ============================================

const ROUND_AMOUNTS = [0.1, 0.5, 1, 5, 10, 50, 100, 500, 1000];

export function analyzeAmounts(tx: TransactionData): AmountAnalysis {
  const outputs = tx.vout.map(v => v.value).filter(v => v > 0);
  const inputs = tx.vin
    .map(v => v.value)
    .filter((v): v is number => v !== undefined && v > 0);

  let roundNumberCount = 0;
  let exactMatchCount = 0;
  const uniqueAmounts: string[] = [];

  // Check for round numbers
  for (const amount of outputs) {
    if (isRoundNumber(amount)) {
      roundNumberCount++;
    }
  }

  // Check for exact matches (input ≈ output, suggesting direct transfer)
  for (const input of inputs) {
    for (const output of outputs) {
      // Allow for small fee difference (up to 0.001 ZEC)
      if (Math.abs(input - output) < 0.001) {
        exactMatchCount++;
      }
    }
  }

  // Check for unique/fingerprintable amounts (many decimal places)
  for (const amount of outputs) {
    const decimals = countDecimals(amount);
    if (decimals >= 6 && !isRoundNumber(amount)) {
      uniqueAmounts.push(amount.toFixed(8));
    }
  }

  const hasRoundNumbers = roundNumberCount > 0;
  const hasExactMatches = exactMatchCount > 0;

  let risk: RiskLevel = 'none';
  let details = '';

  if (hasExactMatches) {
    risk = 'high';
    details = `Found ${exactMatchCount} exact amount match(es) between inputs and outputs. This reveals transaction linkage.`;
  } else if (uniqueAmounts.length > 0) {
    risk = 'medium';
    details = `Found ${uniqueAmounts.length} highly specific amount(s) that could be fingerprinted.`;
  } else if (hasRoundNumbers) {
    risk = 'low';
    details = `Using ${roundNumberCount} round number amount(s). Round amounts are common and blend in.`;
  } else {
    details = 'Amount patterns look normal.';
  }

  return {
    hasRoundNumbers,
    roundNumberCount,
    hasExactMatches,
    exactMatchCount,
    uniqueAmounts,
    risk,
    details,
  };
}

// ============================================
// Pool Usage Analysis
// ============================================

export function analyzePoolUsage(
  txOrHistory: TransactionData | AddressHistory
): PoolUsageAnalysis {
  let sproutUsage = 0;
  let saplingUsage = 0;
  let orchardUsage = 0;

  const transactions = 'transactions' in txOrHistory
    ? txOrHistory.transactions
    : [txOrHistory];

  for (const tx of transactions) {
    if (tx.shielded) {
      sproutUsage += tx.shielded.sproutJoinsplits || 0;
      saplingUsage += (tx.shielded.saplingSpends || 0) + (tx.shielded.saplingOutputs || 0);
      orchardUsage += tx.shielded.orchardActions || 0;
    }
  }

  const total = sproutUsage + saplingUsage + orchardUsage;
  let preferredPool: PoolUsageAnalysis['preferredPool'];
  let risk: RiskLevel;
  let details: string;

  if (total === 0) {
    preferredPool = 'transparent';
    risk = 'high';
    details = 'No shielded pool usage detected. Transactions are fully transparent.';
  } else if (sproutUsage > saplingUsage && sproutUsage > orchardUsage) {
    preferredPool = 'sprout';
    risk = 'high';
    details = 'Using deprecated Sprout pool. Migrate to Sapling or Orchard for better privacy.';
  } else if (orchardUsage > saplingUsage) {
    preferredPool = 'orchard';
    risk = 'none';
    details = 'Primarily using Orchard pool. Excellent privacy choice!';
  } else if (saplingUsage > 0) {
    preferredPool = 'sapling';
    risk = 'low';
    details = 'Using Sapling pool. Consider Orchard for newest privacy features.';
  } else {
    preferredPool = 'mixed';
    risk = 'low';
    details = 'Using multiple shielded pools.';
  }

  return {
    sproutUsage,
    saplingUsage,
    orchardUsage,
    preferredPool,
    risk,
    details,
  };
}

// ============================================
// Linkability Analysis
// ============================================

export function analyzeLinkability(
  history: AddressHistory
): LinkabilityAnalysis {
  const linkedAddresses: string[] = [];
  let linkageType: LinkabilityAnalysis['linkageType'] = 'change';
  let confidence: LinkabilityAnalysis['confidence'] = 'low';
  let risk: RiskLevel = 'none';
  let details = 'No obvious linkability patterns detected.';

  // Look for change address patterns
  const addressSets: Set<string>[] = [];

  for (const tx of history.transactions) {
    const txAddresses = new Set<string>();

    for (const vin of tx.vin) {
      if (vin.address) txAddresses.add(vin.address);
    }
    for (const vout of tx.vout) {
      const addr = vout.address || vout.scriptPubKey?.addresses?.[0];
      if (addr) txAddresses.add(addr);
    }

    if (txAddresses.size > 0) {
      addressSets.push(txAddresses);
    }
  }

  // Find addresses that appear in multiple transactions together
  const coOccurrence = new Map<string, Set<string>>();

  for (const set of addressSets) {
    const addrs = Array.from(set);
    for (const addr of addrs) {
      if (!coOccurrence.has(addr)) {
        coOccurrence.set(addr, new Set());
      }
      for (const other of addrs) {
        if (other !== addr) {
          coOccurrence.get(addr)!.add(other);
        }
      }
    }
  }

  // Find strongly linked addresses (appear together multiple times)
  for (const [addr, linked] of coOccurrence) {
    if (linked.size >= 2) {
      linkedAddresses.push(truncateAddress(addr));
      if (linked.size >= 3) {
        confidence = 'high';
        risk = 'high';
      } else {
        confidence = 'medium';
        risk = 'medium';
      }
    }
  }

  if (linkedAddresses.length > 0) {
    linkageType = 'multiple';
    details = `Found ${linkedAddresses.length} addresses that appear linked through co-occurrence in transactions.`;
  }

  return {
    linkedAddresses: linkedAddresses.slice(0, 5), // Limit to 5
    linkageType,
    confidence,
    risk,
    details,
  };
}

// ============================================
// Helper Functions
// ============================================

function truncateAddress(addr: string): string {
  if (addr.length <= 16) return addr;
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
}

function riskOrder(risk: RiskLevel): number {
  const order: Record<RiskLevel, number> = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3,
  };
  return order[risk];
}

function isRoundNumber(amount: number): boolean {
  for (const round of ROUND_AMOUNTS) {
    if (Math.abs(amount - round) < 0.0001) return true;
    if (Math.abs(amount % round) < 0.0001) return true;
  }
  return false;
}

function countDecimals(num: number): number {
  const str = num.toString();
  const decimal = str.indexOf('.');
  if (decimal === -1) return 0;
  return str.length - decimal - 1;
}

// ============================================
// Transaction Classification
// ============================================

export function classifyTransaction(tx: TransactionData): TransactionData['type'] {
  // Check for coinbase
  if (tx.vin.some(v => v.coinbase)) {
    return 'coinbase';
  }

  const hasTransparentInputs = tx.vin.some(v => v.address || v.txid);
  const hasTransparentOutputs = tx.vout.some(v => v.value > 0);
  const hasShieldedSpends =
    (tx.shielded?.saplingSpends || 0) > 0 ||
    (tx.shielded?.orchardActions || 0) > 0 ||
    (tx.shielded?.sproutJoinsplits || 0) > 0;
  const hasShieldedOutputs =
    (tx.shielded?.saplingOutputs || 0) > 0 ||
    (tx.shielded?.orchardActions || 0) > 0 ||
    (tx.shielded?.sproutJoinsplits || 0) > 0;

  // Fully shielded (z→z only)
  if (!hasTransparentInputs && !hasTransparentOutputs && hasShieldedSpends && hasShieldedOutputs) {
    return 'shielded';
  }

  // Shielding (t→z)
  if (hasTransparentInputs && !hasTransparentOutputs && hasShieldedOutputs) {
    return 'shielding';
  }

  // Also shielding if transparent inputs fund shielded outputs
  if (hasTransparentInputs && hasShieldedOutputs && !hasShieldedSpends) {
    return 'shielding';
  }

  // Deshielding (z→t)
  if (!hasTransparentInputs && hasTransparentOutputs && hasShieldedSpends) {
    return 'deshielding';
  }

  // Also deshielding if shielded spends fund transparent outputs
  if (hasShieldedSpends && hasTransparentOutputs && !hasShieldedOutputs) {
    return 'deshielding';
  }

  // Mixed (has both t and z activity)
  if ((hasTransparentInputs || hasTransparentOutputs) && (hasShieldedSpends || hasShieldedOutputs)) {
    return 'mixed';
  }

  // Fully transparent
  return 'transparent';
}

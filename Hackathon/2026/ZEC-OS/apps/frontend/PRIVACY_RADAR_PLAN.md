# Privacy Radar - Implementation Plan

## Vision

Privacy as UX, not ideology. We're selling **privacy ergonomics** - making good privacy practices feel natural and integrated, not preachy. Users want things that work NOW, blended into the product.

**Core Principle:** This is NOT surveillance. We help users understand and improve their privacy posture using public blockchain data and client-side analysis.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRIVACY RADAR                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────┐      ┌────────────────────────┐         │
│  │    PRIVACY WEATHER     │      │    PRIVACY COACH       │         │
│  │    (Network Data)      │      │    (Offline Analysis)  │         │
│  │                        │      │                        │         │
│  │  • Flow metrics        │      │  • User pastes data    │         │
│  │  • Crowd activity      │      │  • 100% client-side    │         │
│  │  • Best-time-to-shield │      │  • Zero network calls  │         │
│  │  • Public aggregates   │      │  • Ephemeral always    │         │
│  └───────────┬────────────┘      └───────────┬────────────┘         │
│              │                               │                       │
│              ▼                               ▼                       │
│       /api/flows                    Browser JS Only                  │
│       /api/pools?deltas=true        (No fetch() for user data)       │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                      TRUST ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Privacy Weather: Server-computed aggregates (no individual data)    │
│  Privacy Coach:   Client-only sandbox (provably offline)             │
│                                                                      │
│  User can verify via DevTools → Network tab → zero requests          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Part 1: Privacy Weather

### 1.1 Components to Build

| Component | Location | Description |
|-----------|----------|-------------|
| `PrivacyWeather.tsx` | `src/components/apps/` | Main dashboard app |
| `FlowGauge.tsx` | `src/components/apps/privacy/` | Visual shielding/deshielding gauge |
| `CrowdMeter.tsx` | `src/components/apps/privacy/` | Activity level indicator |
| `ShieldWindow.tsx` | `src/components/apps/privacy/` | Best-time-to-shield indicator |
| `useFlowData.ts` | `src/hooks/` | Hook for /api/flows |

### 1.2 Metrics & Calculations

#### Shielding Pressure
```typescript
// High pressure = lots of ZEC moving into shielded pools
shieldingPressure = {
  volume: sum(shielding_tx_values),      // ZEC/hour or /day
  count: count(shielding_txs),
  trend: current_volume / avg_volume_7d,  // >1 = above average
}
```

#### Deshielding Pressure
```typescript
// High pressure = lots of ZEC exiting shielded pools
deshieldingPressure = {
  volume: sum(deshielding_tx_values),
  count: count(deshielding_txs),
  trend: current_volume / avg_volume_7d,
}
```

#### Net Flow & Flow Ratio
```typescript
netFlow = shielding.volume - deshielding.volume  // +ve = net inflow
flowRatio = shielding.volume / (shielding.volume + deshielding.volume)
// flowRatio > 0.5 = more shielding than deshielding
// flowRatio > 0.7 = strong shielding momentum
```

#### Crowd Size (Activity Proxy)
```typescript
// Not true anonymity set, but activity level indicator
crowdActivity = {
  saplingSpends: count,
  saplingOutputs: count,
  orchardActions: count,
  totalOps: sum(above),

  // Relative to baseline
  activityLevel: totalOps / avg_daily_ops_30d,
  // 1.0 = average, 2.0 = double normal activity
}
```

#### Best Time to Shield Score
```typescript
// Weighted combination (0-100 scale)
shieldScore = (
  (flowRatio * 35) +           // Higher ratio = more cover
  (activityLevel * 35) +       // More activity = better crowd
  (poolGrowthTrend * 20) +     // Growing pools = healthy
  (lowCongestion * 10)         // Lower fees bonus
)

// Thresholds
// 70+ = "Excellent" - high activity, strong shielding momentum
// 50-69 = "Good" - normal conditions
// 30-49 = "Fair" - below average activity
// <30 = "Wait" - low activity or high deshielding
```

### 1.3 UI/UX Design

**Weather Metaphors (optional, user-friendly framing):**
| Condition | Meaning | Visual |
|-----------|---------|--------|
| ☀️ Clear Skies | High shielding, good crowd | Green, sunny icon |
| 🌤️ Partly Cloudy | Normal activity | Yellow, mixed icon |
| 🌧️ Rainy | High deshielding pressure | Orange, rain icon |
| ⛈️ Stormy | Low activity, poor conditions | Red, storm icon |

**Dashboard Layout:**
```
┌─────────────────────────────────────────┐
│ PRIVACY WEATHER            [24h ▾] [?]  │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ INFLOW  │  │ OUTFLOW │  │  CROWD  │  │
│  │  ████   │  │  ██     │  │  █████  │  │
│  │ +2,450  │  │ -1,200  │  │  8,421  │  │
│  │  ZEC/h  │  │  ZEC/h  │  │  ops/h  │  │
│  │  ↑ 23%  │  │  ↓ 8%   │  │  ↑ 15%  │  │
│  └─────────┘  └─────────┘  └─────────┘  │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  SHIELD WINDOW: EXCELLENT (78)      ││
│  │  ━━━━━━━━━━━━━━━━━●━━━━━            ││
│  │  High activity + strong inflow      ││
│  └─────────────────────────────────────┘│
│                                         │
│  Net Flow: +1,250 ZEC/h (67% ratio)     │
│                                         │
└─────────────────────────────────────────┘
```

### 1.4 API Requirements

**New endpoint: `/api/flows`**
```typescript
// Request
GET /api/flows?range=7d&granularity=daily

// Response
{
  data: [{
    date: "2024-01-15",
    shielding: { volume: 12500.5, txCount: 847 },
    deshielding: { volume: 8200.3, txCount: 423 },
    netFlow: 4300.2,
    flowRatio: 0.604,
    operations: {
      sproutJoinsplits: 12,
      saplingSpends: 1523,
      saplingOutputs: 2847,
      orchardActions: 4521,
      total: 8903
    }
  }],
  summary: {
    period: "7d",
    avgFlowRatio: 0.58,
    avgDailyOps: 8500,
    shieldScore: 72
  }
}
```

---

## Part 2: Privacy Coach

### 2.1 Trust Model - CRITICAL

**The Problem:** Users must trust we're not logging their addresses/transactions.

**The Solution:** Complete client-side isolation with verifiable proof.

#### How It Works:

1. **Offline Sandbox Mode**
   - Privacy Coach component makes ZERO network requests
   - User pastes raw JSON data (tx details, address history)
   - All analysis happens in browser JavaScript
   - Data never leaves the browser tab

2. **Data Input Options**
   - Paste transaction JSON (from any block explorer)
   - Paste address + transaction list JSON
   - Import from file (JSON export)

3. **Verification Mechanism**
   ```
   ┌────────────────────────────────────────────────────┐
   │ 🔒 OFFLINE MODE ACTIVE                            │
   │                                                    │
   │ Your data stays in your browser.                  │
   │ We never see your addresses or transactions.      │
   │                                                    │
   │ Verify: Open DevTools → Network tab               │
   │ You'll see zero requests while using this tool.   │
   │                                                    │
   │ [Show Technical Details]                          │
   └────────────────────────────────────────────────────┘
   ```

4. **Technical Implementation**
   ```typescript
   // PrivacyCoach component is intentionally isolated
   // It imports NO hooks that make network requests
   // All analysis functions are pure, synchronous JS

   // Example: analyzeTransaction is pure function
   function analyzeTransaction(txJson: TransactionData): PrivacyReport {
     // Pure computation, no side effects, no fetch()
     return {
       riskFactors: [...],
       recommendations: [...],
       score: calculateScore(txJson)
     };
   }
   ```

5. **On-Screen Proof**
   - Lock icon always visible when in analysis mode
   - "Offline Analysis" badge
   - Expandable technical explanation
   - Link to source code (open source = auditable)

### 2.2 Analysis Algorithms

#### Address Reuse Detection
```typescript
interface AddressAnalysis {
  address: string;
  receiveCount: number;      // Times received to this address
  sendCount: number;         // Times sent from this address
  reuseRisk: 'none' | 'low' | 'medium' | 'high';
}

function checkAddressReuse(txHistory: Transaction[]): AddressAnalysis {
  const receiveCounts = countReceives(txHistory);
  const sendCounts = countSends(txHistory);

  // Risk levels
  // high: >3 receives OR >1 send from same address
  // medium: 2-3 receives
  // low: 1 receive, considering reuse
  // none: address only used once total
}
```

#### Timing Pattern Analysis
```typescript
interface TimingAnalysis {
  pattern: 'immediate' | 'delayed' | 'random';
  avgDelayBlocks: number;
  risk: 'low' | 'medium' | 'high';
  recommendation: string;
}

function analyzeTimingPatterns(txHistory: Transaction[]): TimingAnalysis {
  // Check time between:
  // - Receiving to t-addr → shielding
  // - Deshielding → spending from t-addr

  // Immediate (<10 blocks) = high correlation risk
  // Short delay (10-100 blocks) = medium risk
  // Random/long delay = lower risk
}
```

#### Amount Fingerprinting
```typescript
interface AmountAnalysis {
  hasRoundNumbers: boolean;      // 1.0, 10.0, 100.0 ZEC
  hasExactMatches: boolean;      // Input ≈ output - fee
  uniqueAmounts: number;         // Rare amounts that stand out
  risk: 'low' | 'medium' | 'high';
}

function analyzeAmounts(tx: Transaction): AmountAnalysis {
  // Round numbers are more common, blend in better
  // But exact-match amounts (in = out - fee) reveal linkage
  // Very unique amounts (e.g., 1.23456789) are fingerprintable
}
```

#### Linkability Score (Composite)
```typescript
interface PrivacyScore {
  overall: number;              // 0-100 (higher = more private)
  breakdown: {
    addressReuse: number;       // 0-25
    timing: number;             // 0-25
    amounts: number;            // 0-25
    poolChoice: number;         // 0-25
  };
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

function calculatePrivacyScore(analysis: FullAnalysis): PrivacyScore {
  // Weighted factors
  // Address reuse: -20 per reuse instance
  // Timing correlation: -15 for immediate shielding
  // Amount fingerprint: -10 for exact matches
  // Pool choice: -5 for Sprout, +5 for Orchard
}
```

### 2.3 Recommendations Engine

| Issue Detected | Recommendation | Priority |
|----------------|----------------|----------|
| Address reused >2x | "Generate a new address for each receive" | High |
| Immediate shielding | "Wait 10+ blocks before shielding for better privacy" | High |
| Exact amount match | "Add small amounts to break exact correlations" | Medium |
| Using Sprout pool | "Migrate to Sapling or Orchard for better privacy" | Medium |
| Single large shield | "Consider batching multiple shields together" | Medium |
| Transparent-only use | "Shield funds to gain privacy benefits" | Low |
| Pattern detected | "Your transactions show predictable timing. Randomize!" | High |

### 2.4 UI/UX Design

```
┌─────────────────────────────────────────────────────┐
│ PRIVACY COACH                    🔒 Offline Mode    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Paste your transaction data below for analysis.   │
│  Your data never leaves your browser.              │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ {                                             │ │
│  │   "txid": "abc123...",                        │ │
│  │   "vin": [...],                               │ │
│  │   "vout": [...]                               │ │
│  │ }                                             │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  [Analyze] [Clear] [Load Example]                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│ ANALYSIS RESULTS                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Privacy Score: 72/100 (B)                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━               │
│                                                     │
│  ⚠️  RECOMMENDATIONS                                │
│  ┌───────────────────────────────────────────────┐ │
│  │ 1. Avoid address reuse                        │ │
│  │    You've received to t1abc... 3 times.       │ │
│  │    → Generate new addresses for each receive  │ │
│  │                                               │ │
│  │ 2. Delay shielding                            │ │
│  │    You shielded within 2 blocks of receiving. │ │
│  │    → Wait 10+ blocks to reduce correlation    │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ✓ DOING WELL                                       │
│  • Using Orchard pool (+privacy)                   │
│  • No round-number amounts detected                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Part 3: Monetization Tiers

### Free Tier
| Feature | Included |
|---------|----------|
| Privacy Weather | Current snapshot only (24h) |
| Privacy Coach | Full analysis, ephemeral |
| Basic metrics | Flow ratio, crowd activity |

### Pro Tier ($X/month)
| Feature | Included |
|---------|----------|
| Historical Weather | 7d, 30d, 90d, 1y views |
| Alerts | "Shield window is excellent right now" |
| Privacy Score History | Track your score over time (client-stored) |
| Best-time-to-shield | Detailed windows with notifications |
| Advanced metrics | Trend analysis, predictions |
| Export reports | PDF privacy audit |

### Enterprise/API Tier
| Feature | Included |
|---------|----------|
| API access | Programmatic flow data |
| Aggregated research data | For funds, analysts |
| Custom time windows | Flexible granularity |
| Webhook notifications | Real-time alerts |
| Bulk analysis tools | Multiple addresses |
| White-label options | Custom branding |

---

## Part 4: Sources & Citations

### Academic Foundation

1. **Anonymity Set Theory**
   - "An Empirical Analysis of Anonymity in Zcash" - Kappos et al., 2018
   - Key insight: Larger active anonymity sets provide better privacy
   - URL: https://arxiv.org/abs/1805.03180

2. **Transaction Graph Analysis**
   - "Tracing Transactions Across Cryptocurrency Ledgers" - Meiklejohn et al.
   - Key insight: Timing and amount correlation are primary deanonymization vectors

3. **Zcash-Specific Research**
   - Zcash Foundation research papers
   - Electric Coin Company security analyses
   - URL: https://electriccoin.co/research/

### Best Practices Sources

4. **Address Reuse**
   - Bitcoin Wiki: Address Reuse
   - Zcash documentation on address hygiene
   - "Each address should only receive once for maximum privacy"

5. **Timing Attacks**
   - "Deanonymization in Bitcoin P2P Network"
   - Recommendation: Introduce random delays between receive and spend

6. **Unified Addresses (Zcash)**
   - ZIP-316: Unified Addresses
   - URL: https://zips.z.cash/zip-0316
   - Benefits: Auto-shielding, better UX, forward compatibility

---

## Part 5: Implementation Phases

### Phase 1: MVP (Privacy Weather)
**Goal:** Ship basic flow visualization with existing data

1. Create `useFlowData` hook (mock data initially)
2. Build `PrivacyWeather.tsx` component
3. Basic gauges: inflow, outflow, crowd activity
4. Simple "shield score" indicator
5. Integrate when `/api/flows` is ready

**Dependencies:** `/api/flows` endpoint from backend

### Phase 2: Privacy Coach Core
**Goal:** Client-side analysis working

1. Build isolated `PrivacyCoach.tsx` component
2. Implement analysis algorithms (pure functions)
3. Create recommendation engine
4. Design trust UI (offline indicators)
5. Test with sample transaction data

**Dependencies:** None (100% client-side)

### Phase 3: Polish & Integration
**Goal:** Production-ready UX

1. Weather metaphors and visual design
2. Responsive layouts
3. Help/explanation modals with citations
4. Desktop icons and app registry
5. Settings integration (enable/disable)

### Phase 4: Pro Features
**Goal:** Monetization layer

1. Historical data views (requires auth)
2. Alert system (browser notifications)
3. Client-side score history (localStorage)
4. Export functionality
5. Subscription gate UI

### Phase 5: Enterprise
**Goal:** B2B offering

1. API documentation
2. Rate limiting and auth
3. Aggregated data exports
4. Webhook system
5. Legal/compliance review for data licensing

---

## File Structure Addition

```
src/
├── components/
│   └── apps/
│       ├── privacy/
│       │   ├── PrivacyWeather.tsx    # Main weather dashboard
│       │   ├── PrivacyCoach.tsx      # Offline analysis tool
│       │   ├── FlowGauge.tsx         # Shielding/deshielding gauge
│       │   ├── CrowdMeter.tsx        # Activity indicator
│       │   ├── ShieldWindow.tsx      # Best-time indicator
│       │   └── TrustBadge.tsx        # Offline mode indicator
│       └── ...
├── hooks/
│   ├── useFlowData.ts               # /api/flows hook
│   └── ...
├── lib/
│   └── privacy/
│       ├── analyzer.ts              # Pure analysis functions
│       ├── recommendations.ts       # Recommendation engine
│       ├── scoring.ts               # Privacy score calculation
│       └── types.ts                 # TypeScript interfaces
└── ...
```

---

## Open Questions

1. **Granularity Toggle:** Should users be able to switch between hourly/daily views, or is this admin-only?

2. **Historical Depth:** How far back should free tier see? 24h? 7d?

3. **Coach Data Format:** What JSON format should users paste? Should we support multiple explorer formats?

4. **Notification System:** Browser notifications for Pro alerts, or in-app only?

5. **Score Persistence:** For Pro tier privacy score history, localStorage or optional account sync?

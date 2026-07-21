export interface ZcashEvent {
  height: number;
  date: string; // ISO date
  title: string;
  description: string;
  tag?: 'upgrade' | 'halving' | 'milestone';
}

export const ZCASH_HISTORY: ZcashEvent[] = [
  {
    height: 1,
    date: '2016-10-28',
    title: 'Zcash Genesis Block',
    description: 'The Zcash mainnet launched on the anniversary of the Bitcoin whitepaper. The first block was mined with a 12.5 ZEC subsidy and a unique "slow start" that ramped rewards over the first 20,000 blocks.',
    tag: 'milestone',
  },
  {
    height: 347500,
    date: '2018-06-26',
    title: 'Overwinter Activation (NU1)',
    description: 'The first Zcash network upgrade, introducing replay protection and transaction expiry. Laid the groundwork for future protocol improvements without disrupting existing users.',
    tag: 'upgrade',
  },
  {
    height: 419200,
    date: '2018-10-28',
    title: 'Sapling Activation (NU2)',
    description: 'The most significant cryptographic upgrade in Zcash history. Sapling reduced the time and memory needed to construct shielded transactions by 100× and enabled mobile shielded wallets for the first time.',
    tag: 'upgrade',
  },
  {
    height: 653600,
    date: '2019-12-11',
    title: 'Blossom Activation (NU3)',
    description: 'Block time halved from 150 to 75 seconds, doubling throughput while keeping the emission rate the same (per-block subsidy halved from 12.5 to 6.25 ZEC). Improved network responsiveness.',
    tag: 'upgrade',
  },
  {
    height: 903000,
    date: '2020-07-16',
    title: 'Heartwood Activation (NU4)',
    description: 'Enabled shielded coinbase — miners could now send block rewards directly to Sapling shielded addresses, improving miner privacy. Also added Flyclient support for light clients.',
    tag: 'upgrade',
  },
  {
    height: 1046400,
    date: '2020-11-18',
    title: 'Canopy Activation / Dev Fund',
    description: "The Founders' Reward (20% of mining subsidy to ECC and ZF) expired. Canopy activated ZIP 207, replacing it with the Zcash Development Fund — a 20% split among ECC, ZF, and a Major Grants fund through the second halving era.",
    tag: 'upgrade',
  },
  {
    height: 1687104,
    date: '2022-05-31',
    title: 'NU5 / Orchard Activation',
    description: 'Introduced the Orchard shielded pool (replacing Sprout for new notes), Unified Addresses (one address for all pool types), and the Halo 2 proving system — eliminating the trusted setup requirement for the first time.',
    tag: 'upgrade',
  },
  {
    height: 2726400,
    date: '2024-11-24',
    title: 'First ZEC Halving',
    description: 'The first true halving of the Zcash block subsidy — block reward dropped from 3.125 to 1.5625 ZEC (post-Blossom values). A significant milestone in ZEC\'s deflationary emission schedule toward the 21 million cap.',
    tag: 'halving',
  },
  {
    height: 3000000,
    date: '2025-01-18',
    title: 'Block 3,000,000',
    description: 'Zcash reached its 3 millionth block — roughly 8 years and 3 months after genesis. Each block since NU5 can carry Orchard actions, transparent transactions, and Sapling notes simultaneously via Unified Transactions.',
    tag: 'milestone',
  },
];

// Height → nearest event within a given radius (for Explorer banners)
export function nearestEvent(height: number, radius = 5): ZcashEvent | null {
  for (const event of ZCASH_HISTORY) {
    if (Math.abs(event.height - height) <= radius) return event;
  }
  return null;
}

// Rough block height from a unix timestamp (≥653600 era uses 75s blocks)
// Used as a starting point for date-based search; Explorer still needs to binary-search via API.
export function estimateHeightFromDate(unixMs: number): number {
  const BLOSSOM_HEIGHT = 653600;
  const BLOSSOM_TIME_S = 1576088800; // ~Dec 11 2019
  const unixS = unixMs / 1000;
  if (unixS < BLOSSOM_TIME_S) {
    // Pre-Blossom: ~150s blocks, genesis at ~1477692781
    const GENESIS_TIME_S = 1477692781;
    return Math.max(1, Math.round((unixS - GENESIS_TIME_S) / 150));
  }
  return BLOSSOM_HEIGHT + Math.round((unixS - BLOSSOM_TIME_S) / 75);
}

// Named block heights for Zcash mainnet. Source of truth for the
// wrapper's --birthday defaults and any UI that surfaces them.
// Mirrored verbatim in apps/lightwallet-rpc/src/zcash-blocks.mjs — change both together.

export const ZCASH_BLOCKS = {
  /** Sapling activation. Earliest height for a shielded note. */
  SAPLING_ACTIVATION: 419_200,
  /** NU5 activation. First Orchard-receiver block. */
  NU5_ACTIVATION: 1_687_104,
  /**
   * "Recent enough for any modern wallet" default. Used as the wallet
   * birthday when the user doesn't supply one. Bump occasionally as
   * the chain grows — every block before this is dead weight in scan time.
   */
  SAFE_RECENT_BIRTHDAY: 3_300_000,
} as const;

export type ZcashBlockName = keyof typeof ZCASH_BLOCKS;

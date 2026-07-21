// Mirror of packages/siwz-core/src/zcash-blocks.ts. Kept duplicated because
// the wrapper is plain Node ESM and doesn't depend on the built siwz-core.
// Change both together; the values must match.
export const ZCASH_BLOCKS = Object.freeze({
  SAPLING_ACTIVATION: 419_200,
  NU5_ACTIVATION: 1_687_104,
  SAFE_RECENT_BIRTHDAY: 3_300_000,
});

export const IRONWOOD_ACTIVATION_HEIGHT = 3_428_143;
export const ORCHARD_ACTIVATION_HEIGHT = 1_687_104;
export const TARGET_BLOCK_SECONDS = 75;
export const ACTIVATION_WINDOW_BLOCKS = 20;

export const ZATOSHI_PER_ZEC = 100_000_000;

export const ZECHUB_WIKI_URL = "https://zechub.wiki";
export const ZCASH_UPGRADE_URL = "https://z.cash/upgrade/";

export const WALLETS = [
  { slug: "zashi", name: "Zashi" },
  { slug: "ywallet", name: "YWallet" },
  { slug: "zingo", name: "Zingo PC" },
  { slug: "zallet", name: "Zallet" },
  { slug: "exchange", name: "On an exchange" },
] as const;

export type WalletSlug = (typeof WALLETS)[number]["slug"];

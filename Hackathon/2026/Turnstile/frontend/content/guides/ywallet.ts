import type { Guide } from "@/content/guides/types";

export const ywallet: Guide = {
  slug: "ywallet",
  name: "YWallet",
  kind: "mobile",
  summary:
    "YWallet gives you direct control over which pool your funds live in, and it can export a viewing key — so you can check your exposure with Turnstile before you touch anything.",
  canExportUfvk: true,
  ufvkNote:
    "More → Backup → Seed & Keys → toggle Show Sub Keys → copy the Unified Viewing Key. YWallet does not show a birthday height; leave the field blank and Turnstile scans from Orchard activation.",
  steps: [
    {
      title: "Export your viewing key and check first",
      body: "More → Backup → Seed & Keys, turn on Show Sub Keys, and copy the Unified Viewing Key. Paste it into Turnstile. Know the answer before you make any move.",
    },
    {
      title: "Know what YWallet's key can and cannot show",
      body: "YWallet builds its unified viewing key from Sapling and Orchard only — it carries no transparent component. Turnstile will report your transparent balance as not visible, which is the key's limit, not an empty pool. Check any transparent balance in the app itself.",
    },
    {
      title: "Update to the Ironwood-aware release",
      body: "Install the latest YWallet before the activation height, so the wallet knows how to construct a transaction that moves value out of Orchard.",
    },
    {
      title: "Move Orchard funds through the turnstile",
      body: "Send your Orchard balance to your own address using the wallet's pool controls. Orchard becomes spend-only at the activation height — nothing is frozen, and nothing is lost, but a wallet that is up to date makes this a single action.",
    },
    {
      title: "Re-check with Turnstile",
      body: "Paste the same viewing key again. Orchard should now read zero and your verdict should change. That round trip is the whole point of the tool.",
    },
  ],
  source: { label: "ZecHub wiki — YWallet", url: "https://zechub.wiki/using-zcash/ywallet" },
};

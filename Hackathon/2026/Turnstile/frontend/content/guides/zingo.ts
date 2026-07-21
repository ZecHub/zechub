import type { Guide } from "@/content/guides/types";

export const zingo: Guide = {
  slug: "zingo",
  name: "Zingo PC",
  kind: "desktop",
  summary:
    "Zingo is the wallet Turnstile itself is built on — it exports a unified full viewing key and its birthday in one place, which makes it the smoothest wallet to check and migrate.",
  canExportUfvk: true,
  ufvkNote:
    "Wallet → Wallet Seed Phrase / Viewing Key (Ctrl+S). The modal shows both the unified full viewing key and the birthday height. Copy the key, not the seed phrase.",
  steps: [
    {
      title: "Export your viewing key",
      body: "Open Wallet → Wallet Seed Phrase / Viewing Key. Copy the unified full viewing key and note the birthday height shown beside it. Never copy the seed phrase — Turnstile has no field for it.",
    },
    {
      title: "Check your exposure",
      body: "Paste the key and the birthday into Turnstile. The birthday makes the scan dramatically faster, because it starts at the block your wallet was created rather than at Orchard activation.",
      command: "turnstile-check --ufvk uview1... --birthday 3350000",
    },
    {
      title: "Update Zingo",
      body: "Install the release that understands the Ironwood activation. An out-of-date wallet cannot construct the transaction that moves value out of Orchard.",
    },
    {
      title: "Send your Orchard balance to yourself",
      body: "A self-send moves the value out of Orchard and into the new pool. The fee is 0.0001 ZEC. Your funds were never frozen — Orchard just stops accepting anything new.",
    },
    {
      title: "Re-check",
      body: "Run the scan again. Orchard should read zero.",
    },
  ],
  source: { label: "Zingo Labs", url: "https://zingolabs.org" },
};

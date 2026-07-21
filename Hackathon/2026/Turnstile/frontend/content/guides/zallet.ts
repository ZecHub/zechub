import type { Guide } from "@/content/guides/types";

export const zallet: Guide = {
  slug: "zallet",
  name: "Zallet",
  kind: "cli",
  summary:
    "If you are still on zcashd you are on the tightest clock of anyone: zcashd halts itself before the Orchard deadline, and its successor cannot export a viewing key. Export what you need while zcashd is still running.",
  canExportUfvk: false,
  ufvkNote:
    "Zallet has no viewing-key export. zcashd does — and zcashd stops before the activation height, so export your key from zcashd now, while you still can.",
  steps: [
    {
      title: "Export your viewing key from zcashd, today",
      body: "zcashd auto-halts at block 3,417,100 — roughly eleven thousand blocks before Orchard stops taking deposits. Once it stops, this command is gone and Zallet cannot replace it. Pass a unified address: pass a Sapling zs1… address instead and you get a Sapling-only key that is blind to Orchard.",
      command: 'zcash-cli z_exportviewingkey "<your unified address>"',
    },
    {
      title: "Check your exposure",
      body: "Paste the resulting uview1… key into Turnstile, or run the CLI locally so the key never leaves your machine.",
      command: "turnstile-check --ufvk uview1... --birthday <height>",
    },
    {
      title: "Migrate to Zallet before zcashd halts",
      body: "Follow the official zcashd-to-Zallet migration. Do this well before the halt height — a wallet you cannot start is a wallet you cannot spend from.",
    },
    {
      title: "Move Orchard funds out",
      body: "From Zallet, send your Orchard balance to your own unified address. Nothing is frozen and nothing is lost, but you want this done from a wallet that runs.",
    },
    {
      title: "Ask if anything looks wrong",
      body: "This is the most complex path of the five. If a balance does not match, stop and ask in the ZecHub Discord before moving funds again.",
    },
  ],
  source: { label: "Zcash network upgrades", url: "https://z.cash/upgrade/" },
};

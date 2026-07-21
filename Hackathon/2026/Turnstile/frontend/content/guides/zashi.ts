import type { Guide } from "@/content/guides/types";

export const zashi: Guide = {
  slug: "zashi",
  name: "Zashi",
  kind: "mobile",
  summary:
    "Zashi (now published as Zodl) shields to Orchard by default, so if you hold ZEC here it is almost certainly in the pool that stops taking deposits. It does not export a viewing key, so you check your balance inside the app rather than through Turnstile.",
  canExportUfvk: false,
  ufvkNote:
    "We could find no way to export a unified full viewing key from Zashi — no menu path, and no export capability in its source. If you know otherwise, tell us and we will correct this. Either way you do not need one: read your balance in the app using the steps below.",
  steps: [
    {
      title: "Update Zashi first",
      body: "Install the latest version from the App Store or Play Store. The Ironwood-aware release is what knows how to move funds through the turnstile — an old build may simply refuse to spend after the activation height.",
    },
    {
      title: "Open your balance breakdown",
      body: "On the home screen, tap your balance. Zashi shows what is shielded and what is transparent. Anything shielded in Zashi is Orchard — Zashi has never used Sapling for new funds.",
    },
    {
      title: "Shield any transparent balance",
      body: "If Zashi shows a transparent amount, tap Shield. Do this before the activation height: after it, shielding sends funds to the new pool instead, which is fine, but doing it now keeps your history in one place.",
    },
    {
      title: "Move Orchard funds through the turnstile",
      body: "When the Ironwood release lands, Zashi will prompt you to migrate. Accept it. Your funds are never frozen — Orchard becomes spend-only, so the migration is a normal shielded send that you could also do later. Earlier is simply calmer.",
    },
    {
      title: "Confirm the balance survived",
      body: "After migrating, check the balance matches what you started with, minus the 0.0001 ZEC fee. If it does not, do not panic and do not move funds again — ask in the ZecHub Discord first.",
    },
  ],
  source: { label: "ZecHub wiki — Zashi", url: "https://zechub.wiki/using-zcash/zashi" },
};

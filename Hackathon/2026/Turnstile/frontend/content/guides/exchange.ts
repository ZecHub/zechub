import type { Guide } from "@/content/guides/types";

export const exchange: Guide = {
  slug: "exchange",
  name: "On an exchange",
  kind: "custodial",
  summary:
    "If your ZEC sits on an exchange, it is not your key and not your problem to migrate — it is theirs. Your job is to find out whether they have done it, and to ask loudly if they have not.",
  canExportUfvk: false,
  ufvkNote:
    "An exchange holds the keys, so there is no viewing key for you to export and nothing for Turnstile to scan. Custodied ZEC cannot be checked with this tool — by design.",
  steps: [
    {
      title: "Understand what is actually at stake",
      body: "Exchange balances are the exchange's coins, tracked against your name. If they hold funds in Orchard and do not migrate, that is their operational problem — but a frozen withdrawal is still your problem.",
    },
    {
      title: "Ask them, in writing",
      body: "Open a support ticket asking whether they support the Ironwood network upgrade and whether ZEC withdrawals will be available through the activation. A dated written answer is worth more than a forum rumour.",
    },
    {
      title: "Consider self-custody",
      body: "The most durable answer to this question is to hold your own keys. Withdraw to a wallet you control — Zashi is the simplest, and it shields to Orchard automatically.",
    },
    {
      title: "Check the readiness board",
      body: "Turnstile tracks which exchanges have publicly confirmed support, with a source link and a date for each. If yours is missing, ask them and send us the answer.",
    },
  ],
  source: { label: "ZecHub wiki", url: "https://zechub.wiki" },
};

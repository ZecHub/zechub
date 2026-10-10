# Frequently Asked Questions

A list of the most common questions about Zcash. For troubleshooting the Zcash client, please see the [official troubleshooting guide](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Quick Navigation

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">What is Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">How can I acquire Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Difference from other cryptocurrencies?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Protocol governance?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Where is my transaction?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Is Zcash really private?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Common misconceptions</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd stopped working?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Move my wallet to Zallet?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">What is Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Which full node?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Look up a term?</a>
</div>

---

## What is Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash is a digital currency with fast, confidential transactions and low fees. Privacy is the central feature of Zcash. It pioneered the use of zero-knowledge proofs to encrypt all transactions.

Several wallets are available for instant, mobile, secure and private payments: [Wallets](/using-zcash/wallets)

</div>

## How can I acquire Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

You can buy ZEC on [custodial exchanges](/using-zcash/custodial-exchanges), [DEXs](/using-zcash/dex), or [centralized swap platforms](/using-zcash/centralized-swaps).

You can also purchase Zcash peer-to-peer or acquire it by mining.

</div>

## What is the difference between Zcash and other cryptocurrencies?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash is fundamentally more private than Bitcoin or Ethereum. It offers fast block times (75 seconds), low fees, and regular upgrades.

Users can choose between **Transparent** or **Shielded** transactions. For more information see [A Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## How is the Zcash protocol governed?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

The protocol is governed by the **Zcash Improvement Proposal (ZIP)** process. Anyone can submit a draft ZIP. Drafts are debated by the community and accepted or rejected by the ZIP editors:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Decisions are written into the specification and ratified on-chain when the network adopts them.

</div>

## Where is my Transaction?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

First read [our guide to block explorers](/guides/blockchain-explorers). Then check [Zcash Block Explorer](https://zcashblockexplorer.com).

Transactions expire after approximately 25 minutes (20 blocks) and funds are returned automatically.

**Common reasons a transaction may not appear:**

- Loss of connectivity
- Transaction fee too low
- Network overload
- Too many transparent inputs (size too large)

**Tips to succeed:**

- Use a stable connection
- Pay the standard fee (or higher for priority)
- Wait and retry later
- Use fewer inputs to keep the transaction small

</div>

## Is Zcash really Private?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Yes.** Zcash encrypts sender, amount, and recipient data for shielded transactions.

Zcash does **not**:

- Encrypt multisignature transactions (FROST integration pending)
- Protect against correlations with transparent transactions
- Hide IP addresses

Further reading: [A Shielded Ecosystem](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd stopped working, what do I run now?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd is retired. Version 6.20.0 shut itself down at block 3417100 on 18 July 2026, and it never supported Ironwood (NU6.3), so there is no later version to upgrade to.

Run the Z3 stack instead. Three programs split the job zcashd used to do alone:

- **[Zebra](/zcash-tech/zebra-full-node)** validates the chain
- **[Zaino](/zcash-tech/zaino)** indexes it and serves wallet data
- **[Zallet](/zcash-tech/zallet)** holds your funds

[Zakura](/zcash-tech/zakura-node) is an alternative full node. It also runs zcashd on top of itself, which helps if other software still expects the old interface.

Start with the [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## How do I move my zcashd wallet to Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migrates an existing `wallet.dat`, so you keep your funds and addresses.

Back up `wallet.dat` first, then follow the [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet). Keep that backup until you have confirmed your balance in Zallet.

The [Zallet quick reference](/using-zcash/zallet-quick-reference-guide) covers everyday commands once you are across.

</div>

## What is Ironwood, and do I need to do anything?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood is network upgrade NU6.3, live on mainnet since block 3,428,143 on 28 July 2026. It adds a shielded pool built on a corrected circuit and seals the older [Orchard](/using-zcash/shielded-pools) pool, so anyone can verify that no ZEC was forged.

**If you hold shielded funds, they may need to move.** Value leaves Orchard only through [the turnstile](/zcash-tech/the-turnstile), and wallets handle the move at different times and in different ways. Ask your wallet provider before moving anything by hand.

Read [Ironwood](/zcash-tech/ironwood) for what changed and why.

</div>

## Which full node should I run?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** is the direct replacement for zcashd and the node the migration guide assumes. Pick it unless you have a reason not to.

**[Zakura](/zcash-tech/zakura-node)** is a second implementation aimed at scale, with faster sync and native block pruning. Pick it if you need those, or if you depend on software that still speaks to zcashd.

Both validate the same chain, so this is an operational choice rather than a consensus one.

</div>

## Where do I look up a term from a release note?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

See the [Glossary](/glossary-and-faqs/glossary). It covers the node and wallet software, the shielded pools, and the ZIP numbers that turn up most often.

</div>

## A few common misconceptions

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Misconception</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Correct Answer</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Is Zcash a centralised coin?</td>
      <td className="py-4 px-5 text-foreground">No. A trademark agreement prevents the Zcash Foundation or ECC from acting against community consensus. Governance is proven decentralised (see [Messari report](https://messari.io/report/decentralizing-zcash)). Community polls, ZecHub, and Zcash Foundation A/V Club all enable broad participation.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Does Zcash have a backdoor?</td>
      <td className="py-4 px-5 text-foreground">No. Neither Zcash nor any cryptographic software we have built contains a backdoor, and never will.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Is Zcash controlled by a corporation?</td>
      <td className="py-4 px-5 text-foreground">Incorrect. While we partner with companies for research, Zcash remains committed to decentralisation. Multiple autonomous organisations work together toward self-custody and privacy rights.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash has limited privacy compared to other privacy coins</td>
      <td className="py-4 px-5 text-foreground">No. Monero/Grin-style privacy relies on decoys (which can be defeated). Zcash encrypts all shielded transaction data so every transaction in the pool is indistinguishable. See [Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Last updated:** October 2026
**Want to contribute?** [Edit this page on GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)

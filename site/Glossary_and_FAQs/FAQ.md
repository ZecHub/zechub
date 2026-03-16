# Frequently Asked Questions

A list of the most common questions about Zcash. For troubleshooting the Zcash client, please see the [official troubleshooting guide](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Quick Navigation
[What is Zcash?](#what-is-zcash) | [How to acquire Zcash?](#acquire) | [Difference from other cryptocurrencies?](#difference) | [Protocol governance?](#governance) | [Where is my transaction?](#transaction) | [Is Zcash really private?](#privacy) | [Common Misconceptions](#misconceptions)

---

## What is Zcash?

<div class="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash is a digital currency with fast, confidential transactions and low fees. Privacy is the central feature of Zcash. It pioneered the use of zero-knowledge proofs to encrypt all transactions.  

Several wallets are available for instant, mobile, secure and private payments: [Mobile Wallets](https://z.cash/wallets/)
</div>

## How can I acquire Zcash?

<div class="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
You can buy ZEC on cryptocurrency [exchanges](https://z.cash/exchanges).  
You can also purchase Zcash peer-to-peer or acquire it by mining.
</div>

## What is the difference between Zcash and other cryptocurrencies?

<div class="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash is fundamentally more private than Bitcoin or Ethereum. It offers fast block times (75 seconds), low fees, and regular upgrades.  

Users can choose between **Transparent** or **Shielded** transactions. For more information see [A Shielded Ecosystem](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## How is the Zcash protocol governed?

<div class="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
The protocol is governed by the **Zcash Improvement Proposal (ZIP)** process. Anyone can submit a draft ZIP. Drafts are debated by the community and accepted or rejected by the ZIP editors:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Decisions are written into the specification and ratified on-chain when the network adopts them.
</div>

## Where is my Transaction?

<div class="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
First read [our guide to block explorers](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Then check [Zcash Block Explorer](https://zcashblockexplorer.com).  

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

<div class="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Yes.** Zcash encrypts sender, amount, and recipient data for shielded transactions.  

Zcash does **not**:
- Encrypt multisignature transactions (FROST integration pending)
- Protect against correlations with transparent transactions
- Hide IP addresses

Further reading: [A Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## A few common misconceptions

<div class="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table class="w-full border-collapse">
    <thead>
      <tr class="border-b border-border bg-muted">
        <th class="py-4 px-6 text-left font-semibold text-foreground">Misconception</th>
        <th class="py-4 px-6 text-left font-semibold text-foreground">Correct Answer</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-border hover:bg-muted/50">
        <td class="py-4 px-6 font-medium text-foreground">Is Zcash a centralised coin?</td>
        <td class="py-4 px-6 text-foreground">No. A trademark agreement prevents the Zcash Foundation or ECC from acting against community consensus. Governance is proven decentralised (see [Messari report](https://messari.io/report/decentralizing-zcash)). Community polls, ZecHub, and Zcash Foundation A/V Club all enable broad participation.</td>
      </tr>
      <tr class="border-b border-border hover:bg-muted/50">
        <td class="py-4 px-6 font-medium text-foreground">Does Zcash have a backdoor?</td>
        <td class="py-4 px-6 text-foreground">No. Neither Zcash nor any cryptographic software we have built contains a backdoor, and never will.</td>
      </tr>
      <tr class="border-b border-border hover:bg-muted/50">
        <td class="py-4 px-6 font-medium text-foreground">Is Zcash controlled by a corporation?</td>
        <td class="py-4 px-6 text-foreground">Incorrect. While we partner with companies for research, Zcash remains committed to decentralisation. Multiple autonomous organisations work together toward self-custody and privacy rights.</td>
      </tr>
      <tr class="hover:bg-muted/50">
        <td class="py-4 px-6 font-medium text-foreground">Zcash has limited privacy compared to other privacy coins</td>
        <td class="py-4 px-6 text-foreground">No. Monero/Grin-style privacy relies on decoys (which can be defeated). Zcash encrypts all shielded transaction data so every transaction in the pool is indistinguishable. See [Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Last updated:** March 2026  
**Want to contribute?** [Edit this page on GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)

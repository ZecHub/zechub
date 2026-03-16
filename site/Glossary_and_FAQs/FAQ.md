# Frequently Asked Questions

A list of the most common questions about Zcash. For troubleshooting the Zcash client, please see the [official troubleshooting guide](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Quick Navigation
[What is Zcash?](#what-is-zcash) * [How to acquire Zcash?](#acquire) * [Difference from other cryptocurrencies?](#difference) * [Protocol governance?](#governance) * [Where is my transaction?](#transaction) * [Is Zcash really private?](#privacy) * [Common Misconceptions](#misconceptions)

---

## What is Zcash?

Zcash is a digital currency with fast, confidential transactions and low fees. Privacy is the central feature of Zcash. It pioneered the use of zero-knowledge proofs to encrypt all transactions.  

Several wallets are available for instant, mobile, secure & private payments: [Mobile Wallets](https://z.cash/wallets/)

## How can I acquire Zcash?

You can buy ZEC on cryptocurrency [exchanges](https://z.cash/exchanges).  
You can also purchase Zcash peer-to-peer or acquire it by mining.

## What is the difference between Zcash & other cryptocurrencies?

Zcash is fundamentally more private than Bitcoin or Ethereum. It offers fast block times (75 seconds), low fees, and regular upgrades.  

Users can choose between **Transparent** or **Shielded** transactions. For more information see [A Shielded Ecosystem](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).

## How is the Zcash protocol governed?

The protocol is governed by the **Zcash Improvement Proposal (ZIP)** process. Anyone can submit a draft ZIP. Drafts are debated by the community and accepted or rejected by the ZIP editors:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Decisions are written into the specification and ratified on-chain when the network adopts them.

## Where is my Transaction?

First read [our guide to block explorers](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Then check [Zcash Block Explorer](https://zcashblockexplorer.com).  

Transactions expire after ~25 minutes (20 blocks) and funds are returned automatically.  

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

## Is Zcash really Private?

**Yes.** Zcash encrypts sender, amount, and recipient data for shielded transactions.  

Zcash does **not**:
- Encrypt multisignature transactions (FROST integration pending)
- Protect against correlations with transparent transactions
- Hide IP addresses

Further reading: [A Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem)

---

## A few common misconceptions

| Misconception                          | Correct Answer |
|----------------------------------------|----------------|
| **Is Zcash a centralised coin?**       | No. A trademark agreement prevents the Zcash Foundation or ECC from acting against community consensus. Governance is proven decentralised (see [Messari report](https://messari.io/report/decentralizing-zcash)). Community polls, ZecHub, and Zcash Foundation A/V Club all enable broad participation. |
| **Does Zcash have a backdoor?**        | No. Neither Zcash nor any cryptographic software we’ve built contains a backdoor, and never will. |
| **Is Zcash controlled by a corporation?** | Incorrect. While we partner with companies for research, Zcash remains committed to decentralisation. Multiple autonomous organisations work together toward self-custody and privacy rights. |
| **Zcash has limited privacy compared to other privacy coins** | No. Monero/Grin-style privacy relies on decoys (which can be defeated). Zcash encrypts all shielded transaction data so every transaction in the pool is indistinguishable. See [“Not Private Enough?”](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/). |

---

**Last updated:** March 2026  
**Want to contribute?** [Edit this page on GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)

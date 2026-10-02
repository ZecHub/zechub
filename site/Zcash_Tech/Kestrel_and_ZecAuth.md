<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Kestrel_and_ZecAuth.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kestrel and ZecAuth: local fiat to self-custodial ZEC

This page explains a **proposed** Zcash stack for moving between African local currency and a wallet the user controls. It is based on Kuvarpay Limited's [ZCG application](https://github.com/ZcashCommunityGrants/zcashcommunitygrants/issues/421) and [forum post](https://forum.zcashcommunity.com/t/kestrel-zecauth-open-zcash-wallet-connectivity-with-african-fiat-on-off-ramps/57503) (September 2026). It is **not** a live mainnet product listing. As of this writing the grant is under ZCG review; repositories and store listings are deliverables, not shipped apps.

A prototype interaction is in this [short demo](https://youtube.com/shorts/04nGI3Zietk).

---

## TL;DR

* **Kestrel** is planned as an open-source, self-custodial Zcash **mobile wallet**. Creating a wallet, holding ZEC, sending, receiving, and shielding must work **without** KYC and **without** a KuvarSend account.
* **ZecAuth** is planned as a wallet-to-application authorization layer. Apps get **scoped permission**. They never receive the seed or spending keys.
* **KuvarSend** is existing African payments infrastructure (Kuvarpay). It handles local-currency collection, quotes, payouts, and **any KYC the fiat rail requires**.
* Intended user flows: **local currency → ZEC in Kestrel**, and **ZEC from Kestrel → local currency**.
* Architecture: `African payment rails ↔ KuvarSend ↔ ZecAuth ↔ Kestrel`.

---

## The problem it claims to solve

Buying or selling ZEC from many African markets often looks like:

**local currency → exchange or P2P → stablecoin or another crypto → ZEC → self-custodial wallet**

and the reverse on the way out. Extra hops mean extra fees, extra accounts, more custodial exposure, and more chance of a withdrawal or KYC wall.

The proposal compresses that to:

**local currency → ZEC in the user's wallet**  
**ZEC from the user's wallet → local currency**

using rails KuvarSend already connects to (bank transfer, mobile money, fintech wallets — which ones ship first is a product decision, not documented here).

---

## Three pieces, three jobs

| Piece | Job | Holds keys? | Does KYC? |
| --- | --- | --- | --- |
| **Kestrel** | Self-custodial wallet (create/restore, UA, sync, send/receive, shielding, Ironwood, PIN/biometrics) | Yes, on device (iOS Keychain / Android Keystore) | No |
| **ZecAuth** | Connect wallet to an app with scoped, expiring, revocable authorization | No | No |
| **KuvarSend** | Fiat in/out, quotes, liquidity, settlement, regulated compliance | No ZEC spending keys | Only for the fiat transaction, on KuvarSend |

If ZecAuth is doing its job, KuvarSend can request a payment or an address **without** ever seeing a seed.

ZecAuth (as specified in the grant) is supposed to include application/domain binding, nonces, expiry, callback validation, replay protection, revocation, and explicit wallet approval. Treat that list as the **design goal**, not as an audited protocol until the public spec and tests exist.

---

## On-ramp and off-ramp (intended)

**On-ramp**

1. User pays in local currency through a KuvarSend-supported rail.
2. KuvarSend handles the fiat side (and KYC if the corridor requires it).
3. ZecAuth connects KuvarSend to Kestrel without moving keys.
4. ZEC is delivered to an address the wallet controls.
5. Kestrel can offer **optional shielding**. Shielding improves *future* privacy; it does **not** erase an earlier transparent hop.

**Off-ramp**

1. User starts a payout in KuvarSend (method + quote).
2. Kestrel authorizes the ZEC send through ZecAuth.
3. KuvarSend settles local currency.

Kestrel must remain usable if the user never opens KuvarSend.

---

## What this is not

* **Not a ZecHub endorsement** of KuvarSend, Kestrel, or the grant.
* **Not** the same product as [0xramp](https://forum.zcashcommunity.com/t/introducing-0xramp-non-custodial-zec-local-fiat-pix-and-more-for-emerging-markets/57215) (Pix and other corridors; different team).
* **Not** a replacement for a full node. Light-client sync is planned via Zcash mobile SDKs and Zaino/lightwalletd infrastructure.
* **Not** production until public repos, tests, and (for mainnet fiat) at least one live corridor exist.

---

## Status (September 2026)

| Item | Status in the public record |
| --- | --- |
| ZCG application | [Issue #421](https://github.com/ZcashCommunityGrants/zcashcommunitygrants/issues/421), labeled ready for review |
| Amount requested | $12,000 over eight weeks (if approved) |
| Prototype | Wallet demo branded ZecWallet, to be renamed Kestrel; [YouTube short](https://youtube.com/shorts/04nGI3Zietk) |
| Public Kestrel / ZecAuth repos | Grant deliverables — not treated as shipped here |
| KuvarSend traction (applicant-reported) | 1,200+ registered users, 600+ txs, $30k+ volume at application time |

If you are writing about this stack later, re-check whether the spec, iOS/Android builds, and a mainnet corridor actually shipped.

---

## Related pages

* [Using ZEC in DeFi](/guides/using-zec-in-defi)
* [Centralized swap platforms](/using-zcash/centralizedswaps)
* [Wallets](/using-zcash/wallets)
* [Zaino](/zcash-tech/zaino)

## Sources

* [ZCG application #421](https://github.com/ZcashCommunityGrants/zcashcommunitygrants/issues/421)
* [Forum thread](https://forum.zcashcommunity.com/t/kestrel-zecauth-open-zcash-wallet-connectivity-with-african-fiat-on-off-ramps/57503)
* [Prototype demo](https://youtube.com/shorts/04nGI3Zietk)
* [KuvarSend traction page](https://kuvarsend.com/traction) (applicant-controlled)

**Last updated:** September 2026

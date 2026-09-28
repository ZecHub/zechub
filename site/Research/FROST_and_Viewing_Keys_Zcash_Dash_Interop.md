# FROST & Viewing Keys: Zcash/Dash Interop Research Brief

*Prepared for ZecHub · Revised 27 September 2026 · All claims sourced inline*

## Executive summary

ZecHub raised this question after adding shielded DASH as a wiki donation option: could Zcash-style viewing keys, or FROST threshold signatures, translate to Dash?

The research reframed it. Viewing keys are not an open question — Dash shipped the [Zcash Orchard shielded pool](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) into its Evolution chain, and Orchard's key hierarchy includes viewing keys by construction. Dash's own [roadmap](https://www.dash.org/roadmap/) positions them for auditor disclosure and Travel Rule compliance. That half is deployed, not hypothetical.

**FROST is where the genuine gap sits.** Dash already runs BLS threshold signatures through [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), but those serve network-level consensus — ChainLocks and InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) targets something different: threshold spend authorization over a single shielded account held by a small group of individual keyholders. The two are not interchangeable. And since ZIP 312 remains **Draft**, there is no reference implementation on either chain to port, so this would be novel work whichever side built it.

---

## Timeline: why this comparison is unusual right now

Two shielded-pool events happened within weeks of each other in mid-2026.

**Zcash moved off Orchard.** Researcher Taylor Hornby disclosed a circuit vulnerability in Orchard that could be exploited to inflate supply undetectably. Zcash responded by activating **Ironwood (NU6.3)** on **28 July 2026**, introducing a new shielded pool with a turnstile migration mechanism.

**Dash moved onto Orchard.** Dash announced the plan on [19 February 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *"We expect to be able to launch shielded transfers soon, naturally pending security audits and further code review."* Dash's [roadmap](https://www.dash.org/roadmap/) records Shielded Balances as **completed in July 2026** with Dash Platform **v4.0**, and Dash published [*"Shielded transactions are live on the Dash Evolution mainnet"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) on **4 August 2026**.

> **A note on ordering.** Some coverage placed Dash's mainnet activation on 17 July 2026, which would put it before Ironwood. That date appears to trace to press reporting of the announcement rather than to an activation. On Dash's own sources the feature completed in July and was announced live on 4 August — after Ironwood. The two chains crossed paths within a few weeks; the exact ordering depends on which milestone is counted, and this brief does not claim one.

Crucially, Dash did not inherit the bug. Their announcement is explicit: *"we implemented the version of Orchard without a known inflation bug. The previous version contained a bug which could be exploited to undetectably inflate Zcash's supply."*

So Dash now runs a patched fork of the cryptography Zcash itself has moved away from at the base layer, while Zcash's next-generation pool (Ironwood) and next-generation spend-authorization scheme (FROST) are respectively newly live and still Draft.

---

## Viewing keys: deployed, not a research gap

Dash's shielded pool is [Orchard](https://zips.z.cash/zip-0224), built on Halo 2 zk-SNARKs requiring no trusted setup. Orchard's key hierarchy has always included Full Viewing Keys and Incoming Viewing Keys as part of its design rather than as an add-on — so the capability arrived with the code, not as a port either chain had to negotiate.

Dash's roadmap states the intent directly:

> *"Unlike mandatory privacy systems that have faced exchange delistings and regulatory friction, Shielded Balances support selective disclosure via view keys — allowing users and businesses to share transaction details with auditors or comply with Travel Rule requirements when needed, without compromising privacy for everyday use."*

Two observations worth recording:

**Dash is positioning viewing keys around a more concrete production use case than Zcash's own tooling has reached.** Zcash's payment-disclosure tooling has remained largely experimental and opt-in across wallets. Dash is shipping view keys as a compliance feature with named use cases, on a chain that also offers roughly one-second deterministic settlement and about twenty-second wallet sync per its own announcement.

**The open item is compatibility drift, not capability.** Whether Dash's viewing-key implementation stays wire-compatible with Zcash's Orchard viewing-key format as both chains evolve independently is worth tracking. It is a monitoring question rather than a research project.

---

## Key derivation: Zcash and Dash compared

This section addresses the reviewer's question directly. The short answer is that the *shielded* key trees are near-identical because the code is shared — the meaningful differences are in how each chain **roots** that tree in its wallet key space, and in what else occupies that space.

### Zcash

Zcash uses [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032), which has status **Final**. Rather than placing shielded keys inside a single BIP 32 tree, ZIP 32 gives each shielded pool its own master key and its own path:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` is fixed at `32'` (0x80000020) per BIP 43, and `coin_type` follows SLIP 44, with all testnets sharing index `1`.

Within an Orchard account, the hierarchy is strictly one-directional — each level can derive everything below it and nothing above:

| Key | Can do | Derives |
|---|---|---|
| Spending key | Spend notes | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Authorize spends | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | See incoming **and** outgoing payments | IVK, OVK |
| Incoming Viewing Key | See incoming payments only | Diversified addresses |
| Outgoing Viewing Key | Recover outgoing payment details | — |
| Diversified address | Receive | — |

Orchard simplified this relative to Sapling: per the [Orchard Book](https://zcash.github.io/orchard/design/keys.html), the nullifier private key `nsk` was removed, `nk` became a field element rather than a curve point, and `ovk` is now derived from the full viewing key rather than held separately.

Above this sits [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) — Revision 0 Active, Revision 1 Withdrawn, Revision 2 Draft — which bundles per-pool keys into a **Unified Full Viewing Key** ("combines multiple Full Viewing Key… Items") and a **Unified Incoming Viewing Key**. The distinction a wallet developer must respect: a UFVK reveals both incoming and outgoing activity, a UIVK only incoming.

### Dash

Dash roots everything in a conventional BIP 32 tree, with SLIP 44 coin type `5'`, and adds two derivation extensions of its own.

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) inserts a **feature** level that partitions the key space by coin-specific function:

```
m / purpose' / coin_type' / feature' / *
```

with `purpose` fixed at `9'` (0x80000009) and `coin_type` at `5'` (0x80000005). The DIP's stated motivation is isolation — *"it may be desirable to maintain mixed funds in a path that is isolated from non-mixed funds."*

[DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) goes further, lifting BIP 32's 31-bit index limit so path components can carry full 256-bit values. That allows identity-derived paths such as:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

where the last two components are user identity hashes. Zcash has no analogue: ZIP 32 has no concept of deriving a key path from another party's identity.

### Where the two actually differ

**The shielded subtree is the same.** Dash's shielded keys are Orchard keys, because Dash's shielded pool is Orchard. A wallet developer moving between the two is working with the same spending-key-to-viewing-key structure.

**The rooting differs.** Zcash isolates each shielded pool under its own master key with purpose `32'`. Dash hangs the shielded feature off one unified tree under purpose `9'`, alongside every other feature. Zcash's separation is by cryptographic pool; Dash's is by product feature.

**Dash's key space contains something Zcash's does not: a separate BLS domain.** Masternode operator keys, voting keys and quorum keys used by LLMQs are BLS keys, not Schnorr-family keys, and live entirely outside the BIP 32 tree described above. This is precisely where Dash's existing threshold signing lives — and precisely why it does not compose with Orchard spend authorization, as the next section sets out.

**Identity-linked derivation is Dash-only.** DIP-0014's 256-bit paths exist to derive keys from relationships between identities. That is a Dash Platform concept with no Zcash equivalent, and it is the clearest case of the two derivation schemes having diverged on purpose rather than by accident.

*See Figure 1 for the two rooting schemes converging on a shared Orchard subtree.*

---

## FROST: the genuinely open question

Dash has a mature threshold-signature system in **BLS-based LLMQs** (Long-Living Masternode Quorums), used for ChainLocks, InstantSend, and Dash Platform validator consensus.

[ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312), status **Draft**, does something else. It thresholdises the Schnorr-based spend authorization signatures already defined by Sapling and Orchard — **RedJubjub** and **RedPallas** respectively — so that, in the ZIP's own framing, *"users and third-party services sharing custody of a wallet, or a group of people managing shared funds"* can require threshold approval such as 2-of-3 before a spend. It is categorised as a **Wallet** ZIP: it produces signatures compatible with existing spend authorization rather than changing consensus. It retains a Coordinator role, which the ZIP explicitly declines to remove, and it discusses both trusted-dealer key generation and distributed key generation.

The distinction that matters, and the reason these are not substitutes:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Signature scheme | BLS | Schnorr — RedJubjub / RedPallas |
| Who signs | A quorum of masternodes | A small group of individual keyholders |
| What is authorized | A network fact: a block lock, a transaction lock | A spend from one shielded account |
| Layer | Consensus | Wallet |
| Key space | Separate BLS domain | The Orchard/Sapling spend authorization key |
| Status | Deployed | Draft, no reference implementation |

Dash having BLS threshold signatures does **not** mean it has, or needs, FROST. But it does mean Dash's engineers have in-house familiarity with threshold signing, distributed key generation and quorum coordination — genuine transferable experience if they chose to build this.

*See Figure 2 for what each scheme actually signs over.*

### What FROST on Dash's Orchard fork would require, at a first pass

1. **A FROST DKG and signing ceremony over RedPallas**, Orchard's spend authorization scheme — a Schnorr variant over the Pallas curve. This is separate from, and not reducible to, Dash's existing BLS DKG for LLMQs.
2. **Wallet and UX support for multi-party signing of a single shielded account**, which is a different interaction pattern from masternode-quorum tooling and needs a Coordinator equivalent.
3. **A decision on layer.** Most likely wallet-level only, since ZIP 312 is scoped as a wallet scheme over existing primitives rather than a consensus change — but this needs confirming against Dash's Orchard fork specifically, not assumed from Zcash's scoping.

---

## Recommendation

**Viewing keys — document, don't research.** The capability is shipped on both chains. A short wiki note recording that Dash's shielded pool includes view keys, and linking Dash's roadmap, prevents ZecHub's audience assuming it is still hypothetical. Track wire-format compatibility as the two chains evolve.

**FROST — real opportunity, blocked upstream.** It depends on ZIP 312 reaching a reference implementation, or Dash choosing to build in parallel. ZecHub cannot accelerate it directly.

**The highest-value next step is a conversation, not more desk research.** The people who would build this are reachable. Shielded Labs is driving ZIP 312; Dash's engineering team has already engaged positively with the "borrowed from Zcash" framing around the Orchard integration. A cross-community thread connecting the two would surface more than another round of reading, and this brief has reached the limit of what public sources can settle.

---

## Figures

**Figure 1 — Key derivation rooting: Zcash ZIP 32 and Dash DIP-0009/0014, converging on a shared Orchard subtree.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figure 2 — What each threshold scheme signs over: a masternode quorum attesting to a network fact, against a keyholder group authorizing one shielded spend.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Sources

**Zcash — protocol**
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — status Final
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — status Draft
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Keys and addresses](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — key components, §5.6.4

**Dash — protocol and announcements**
- [Shielded transactions are live on the Dash Evolution mainnet](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 August 2026
- [Dash Is Adding Shielded Transactions to Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 February 2026
- [Dash Roadmap](https://www.dash.org/roadmap/) — Shielded Balances, completed July 2026, Platform v4.0; updated 12 September 2026
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Core documentation — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips repository](https://github.com/dashpay/dips)

**Contemporaneous reporting**
- [Dash launches Zcash's Orchard technology in privacy upgrade](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Brings Zcash Orchard Privacy to Evolution Chain for Shielded Transactions](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Sources checked 27 September 2026. Dash Platform and ZIP 312 are both moving; figures and statuses should be re-verified before republication.*

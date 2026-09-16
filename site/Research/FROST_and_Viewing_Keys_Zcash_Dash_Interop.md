FROST & Viewing Keys: Zcash/Dash Interop Research Brief
Prepared for ZecHub / ZEC Bounties — September 2026

Executive Summary
ZecHub flagged this as an area worth exploring after adding shielded DASH as a wiki donation option. The research turned up something more concrete than a hypothetical: Dash has already integrated Zcash's Orchard shielded-pool technology into its Evolution chain, live on mainnet since July 17, 2026 — and viewing keys came along with it. The genuinely open question isn't "could Zcash-style viewing keys work on Dash," it's "what would it take to bring FROST-based threshold spend authorization to Dash's new shielded pool," since that piece wasn't part of what Dash ported over, and Zcash hasn't shipped it either.

Background: why this question matters now
Two upgrades collided this summer in a way that makes this comparison unusually timely:

Zcash discovered a critical circuit vulnerability in Orchard (disclosed by researcher Taylor Hornby, May 29, 2026) and responded by activating Ironwood (NU6.3) on July 28, 2026 — a new shielded pool with a "turnstile" migration mechanism and formally verified circuit properties, effectively retiring Orchard as the network's active pool.
Dash, working from the open-source Orchard codebase, shipped its own Orchard-based shielded pool on its Evolution chain on July 17, 2026 — eleven days before Zcash's own move away from Orchard. Dash's team has stated publicly that they implemented a version without the inflation bug that prompted Ironwood, having built on the code before (or around) the point the flaw came to light.
So as of today, Dash is running a fork of the same cryptography Zcash itself just moved away from at the base layer — while Zcash's own next-generation shielded pool (Ironwood) and next-generation spend-authorization scheme (FROST, ZIP 312) are both still in early rollout or draft status. That timing gap is exactly where the interesting open questions sit.

Viewing keys: already live on Dash, not a research gap
This is the more settled half of the question. Dash's Orchard integration (Dash Platform v4.0.0, Evolution chain) inherited Orchard's native key hierarchy — which has always included Full Viewing Keys and Incoming Viewing Keys as part of its design, not as an add-on. Dash's own roadmap documentation confirms this is live and purpose-built for compliance use cases: "Shielded Balances support selective disclosure via view keys — allowing users and businesses to share transaction details with auditors or comply with Travel Rule requirements when needed, without compromising privacy for everyday use."

Practically, this means:

The cryptographic capability is not a port that Zcash and Dash would need to coordinate on — it came bundled with the Orchard code itself.
Dash is already positioning it explicitly around Travel Rule / auditor disclosure, which is arguably a more concrete production use case than Zcash's own viewing-key UX has reached in most wallets to date (Zcash's payment-disclosure tooling has remained largely experimental and opt-in since it was introduced).
Open item worth tracking, not researching from scratch: whether Dash's viewing-key implementation stays wire-compatible with Zcash's own Orchard viewing-key format as both chains evolve independently, or whether the two diverge over time (Dash has already diverged on other axes — see below).
FROST: the genuinely open question
Dash already has a mature threshold-signature system — BLS-based LLMQs (Long-Living Masternode Quorums), used for ChainLocks, InstantSend, and Dash Platform validator consensus. This is a different cryptographic scheme from FROST (Flexible Round-Optimized Schnorr Threshold signatures), which Zcash is drafting under ZIP 312 for a different purpose: threshold spend authorization over a single shielded note/account, controlled by a group of individual keyholders (e.g. a DAO treasury or a multisig personal wallet) — not network-level consensus signing by masternodes.

That distinction matters:

Dash's BLS/LLMQ infrastructure is about the network collectively attesting to something (a block, a lock). FROST as specified in ZIP 312 is about a small group of individual users jointly controlling one shielded account's spending key.
These solve different problems and aren't interchangeable. Dash having BLS threshold signatures already does not mean it has (or needs) FROST — but it does mean Dash's engineering team already has in-house familiarity with threshold-signing infrastructure generally, which is a genuine advantage if they wanted to build this.
Zcash itself has not shipped ZIP 312 yet (it remains Draft). So there is currently no reference implementation on either chain to port — this would be genuinely novel work on either side, not a translation exercise.
What FROST-based shielded multisig would take on Dash's Orchard fork, at a first pass:

A FROST-based distributed key generation (DKG) and signing ceremony compatible with Orchard's spend-authorization signature scheme (RedPallas, a variant of Schnorr over the Pallas curve) — separate from Dash's existing BLS DKG used for LLMQs.
Wallet/UX support for coordinating a multi-party signing session for a single shielded account, which is a different interaction pattern than Dash's existing masternode-quorum tooling.
A decision on whether this lives at the Evolution/wallet layer only, or needs any protocol-level accommodation — likely the former, since Zcash's own ZIP 312 is scoped as a spend-authorization scheme built on existing Orchard primitives rather than a consensus change.
Recommendation
Viewing keys: no further translation work needed — it's already shipped. Worth a short wiki note simply documenting that this exists and pointing to Dash's own roadmap page, so ZecHub's audience doesn't assume it's still hypothetical.
FROST: a real, currently-unclaimed opportunity, but one that depends on Zcash finishing ZIP 312 first, or Dash choosing to build a parallel implementation independently. Not something ZecHub can meaningfully accelerate directly today; worth flagging to Shielded Labs (who are driving ZIP 312) and to Dash's engineering team as a "here's a related effort" cross-reference, rather than treating it as ready-to-build.
Best next step: this is a good candidate for direct outreach — Dash's CTO Samuel Westrich has been publicly vocal about the Orchard integration and has engaged with the "borrowed from Zcash" framing positively. A short, friendly cross-community thread (Discord or forum) connecting Shielded Labs' ZIP 312 work with Dash's engineering team could surface faster than independent research would.
Sources
Dash: "Shielded transactions are live on the Dash Evolution mainnet," dash.org, Aug 4, 2026
Dash Roadmap, dash.org/roadmap (Shielded Balances / view keys section)
Cryptopolitan, "Dash launches Zcash's Orchard technology in privacy upgrade," Jul 18, 2026
HackerNoon, "Dash Brings Zcash Orchard Privacy to Evolution Chain for Shielded Transactions"
KuCoin, "Zcash Ironwood NU6.3 Goes Live," Aug 2026
CoinDesk, "Zcash Seals $1.7 Billion Shielded Pool as Ironwood Upgrade Activates," Jul 28, 2026
zips.z.cash/zip-0312 (FROST for Spend Authorization Multisignatures)
Dash Core docs — Masternode Quorums (LLMQ / BLS threshold signing)
Electric Coin Company, "Selective Disclosure & Shielded Viewing Keys," blog.z.cash

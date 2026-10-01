# Ten Years of Zcash

Zcash's genesis block was mined on **28 October 2016**. Ten years on, the
thing that launched that day is still recognisably itself — a chain where
you can hold and send money without publishing your balance to the world —
and almost every part of how it does that has been rebuilt at least once.

This page is the story of those ten years, told through the upgrades that
made them. For the interactive version, with each upgrade's ZIPs and a
privacy meter that tracks how the shielded pools evolved, see
[The Evolution of Privacy](https://zechub.wiki/zcash-evolution). For the
reference table of activation heights and branch ids, see
[Network Upgrades](../start-here/network-upgrades).

**Prefer to watch it?** [Ten Years of Zcash — 2016 to 2026](https://youtu.be/GAZ53ex3WH0)
covers the same ground in three minutes, one upgrade at a time.

## 2016: a chain that could keep a secret

[Sprout](../zcash-tech/sprout) was not an upgrade. It was the launch — the
first shielded pool, and the first time zero-knowledge proofs secured real
money on a public chain. A transaction could be valid without revealing who
sent it, who received it, or how much moved.

It cost something to get there. Sprout's proofs depended on a parameter
ceremony, and the security of the pool rested on the assumption that at
least one participant in that ceremony destroyed their piece of the secret.
Proving was slow, memory-hungry, and impractical on anything small. What
existed on day one was the idea, working, at a price.

## 2018: first the machinery, then the breakthrough

[Overwinter](../zcash-tech/overwinter) arrived in June 2018 at block
347,500 and added no privacy features at all. It added replay protection,
transaction versioning and expiry — the Network Upgrade Mechanism that made
every later change safe to deploy. It is the least visible upgrade in the
list and the one everything after it depends on.

Four months later, on Zcash's second anniversary,
[Sapling](../zcash-tech/sapling) activated at block 419,200 and changed what
shielded money was for. Proving times fell from minutes to seconds and
memory from gigabytes to megabytes. Shielded addresses became something a
phone could use, and then something a hardware wallet could hold. Privacy
stopped being a capability and started being a default worth choosing.

## 2019–2020: speed, fairness, and paying for the work

Three upgrades in thirteen months took the chain from working to durable.

[Blossom](../zcash-tech/blossom), December 2019 at block 653,600, halved
block target spacing to about 75 seconds — twice the throughput, with the
per-block reward halved and the halving interval doubled so total issuance
over time stayed exactly where it was.

[Heartwood](../zcash-tech/heartwood), July 2020 at block 903,000, let mining
rewards be paid directly to shielded addresses, and added FlyClient support
so light clients could verify the chain without downloading it. Miners no
longer had to start every coin's life in public.

[Canopy](../zcash-tech/canopy), November 2020 at block 1,046,400, landed
three things at once: the Development Fund, the first halving — the block
reward falling from 6.25 to 3.125 ZEC at that same block — and the closing
of the Sprout pool to new value. The original shielded pool stopped taking
deposits four years and three weeks after it opened.

## 2022: privacy without a ceremony

[NU5](../zcash-tech/nu5), May 2022 at block 1,687,104, is the upgrade that
retired Zcash's oldest compromise. The Orchard pool is built on Halo 2,
which needs **no trusted setup** — the assumption that someone, somewhere,
threw away a secret is simply gone from the security model.

NU5 also brought the version 5 transaction format and
[unified addresses](https://zips.z.cash/zip-0316): one address that a wallet
can resolve to whichever pool both sides support, so users stopped needing
to know which kind of address they were holding.

## 2024–2026: governance, a bug, and a new pool

[NU6](../zcash-tech/nu6), November 2024 at block 2,726,400, introduced the
Deferred Development Fund Lockbox and a new funding split.
[NU6.1](../zcash-tech/nu6-1), a year later at block 3,146,400, put decisions
about that funding in the hands of the community and coin holders.

Then the hardest stretch of the decade. A soundness flaw was found in the
Orchard circuit — the kind where invalid transactions could pass as valid —
and the response was to pause rather than to hope.
[NU6.2](../zcash-tech/nu6-2) activated on 3 June 2026 at block 3,364,600
with a corrected circuit.

[Ironwood](../zcash-tech/ironwood) followed on 28 July 2026 at block
3,428,143, introducing a new shielded pool and, with it, a public turnstile:
anyone can now audit that the supply entering and leaving the shielded pools
adds up, without seeing a single individual transaction. The old Orchard
pool became spend-only, so value flows out of it and not back in.

That is the trade Zcash keeps making, and it is worth naming on an
anniversary. The chain gives up a little of its own opacity — at the
aggregate level, where it buys verifiability — and gives up none of yours.

## What comes next

NU7 is the next upgrade, targeted for mainnet around 5 November 2026. Two
changes in it matter to ordinary users:

- **[ZIP 218](https://zips.z.cash/zip-0218)** cuts block target spacing from
  75 seconds to 25. Three times as many blocks, each carrying a third of the
  subsidy, so the issuance schedule and the halving dates do not move.
- **[ZIP 2003](https://zips.z.cash/zip-2003)** disallows version 4
  transactions, which has the effect of disabling spending from the Sprout
  pool, since the v5 format never supported it. The ZIP is explicit that it
  does not burn or unissue those funds.

Both are Draft at the time of writing, and activation is by block height
rather than by calendar date.

## Ten years, in one line

The launch proved private money could work. Sapling made it usable. Orchard
removed the last thing you had to take on trust. Ironwood made the supply
auditable without making anyone's balance public.

Everything else was scaffolding — and the scaffolding is why each of those
was possible without breaking the chain underneath.

---

*Dates and activation heights on this page are taken from ZecHub's
[Network Upgrades](../start-here/network-upgrades) index and the individual
upgrade pages linked above. Activation is triggered by block height, not by
the calendar; dates are UTC. Checked 29 September 2026.*

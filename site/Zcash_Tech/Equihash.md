<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Equihash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Equihash

> Equihash is the proof-of-work puzzle Zcash miners solve to produce blocks. Zcash has used it with the parameters n = 200 and k = 9 since the chain launched in October 2016.

What you'll take away: what puzzle an Equihash miner actually solves, why solving it takes a lot of memory while checking it takes almost none, where the solution sits in a block, how difficulty keeps blocks coming every 25 seconds, and how the 2018 debate about mining hardware ended.

Equihash is a memory-hard proof of work designed by Alex Biryukov and Dmitry Khovratovich of the University of Luxembourg and presented at the NDSS symposium in February 2016. It is built on the generalized birthday problem: from a long list of pseudorandom strings, find a small group of them whose XOR is zero. Zcash's developers added it to the testnet alpha in April 2016, replacing the SHA-256d proof of work used by Bitcoin. The [protocol specification](https://zips.z.cash/protocol/protocol.pdf) sums up the intent: Zcash "attempted to address the problem of mining centralization by use of the Equihash memory-hard proof-of-work algorithm."

Why this matters. Proof of work is what makes rewriting Zcash's history expensive. Every block must carry a valid Equihash solution, and nodes follow the valid chain with the most accumulated work. The choice of puzzle also decides what hardware can mine, which is why Equihash was at the center of one of the community's biggest debates.

## TL;DR

- **What it is:** a memory-hard proof of work based on the generalized birthday problem ([Biryukov and Khovratovich, 2016](https://www.ndss-symposium.org/wp-content/uploads/2017/09/equihash-asymmetric-proof-of-work-based-generalized-birthday-problem.pdf)).
- **Zcash's version:** n = 200 and k = 9 on Mainnet and Testnet. A solution is 512 positions in a list of 2,097,152 strings of 200 bits each, generated with BLAKE2b from the block header.
- **Asymmetric by design:** solvers from Zcash's 2016 miner challenge needed at least 144 MiB of RAM to find almost all solutions, and one run finds about 1.88 solutions on average. A node checks a solution by recomputing just 512 strings.
- **The block check:** the 1,344-byte solution goes into the block header, and the SHA-256d hash of the whole header must be at or below the target encoded in `nBits`.
- **Difficulty:** recalculated after every block. Since [NU7](./NU7.md) it aims for one block every 25 seconds and averages over the last 102 blocks.
- **ASICs:** Equihash mining hardware arrived in 2018. A community panel run by the Zcash Foundation then voted against making ASIC resistance a priority, and Zcash never changed its proof of work.
- **Looking ahead:** [Crosslink](./Crosslink_Protocol.md), a proposal from Shielded Labs, would add proof-of-stake finality but keep proof-of-work mining. It is not active on Mainnet.

## Visual analogy

Imagine you are dealt about two million cards, each printed with a random 200-symbol pattern that depends on the block you want to mine. Your job is to find 512 cards whose patterns cancel out completely when you stack them. The practical way is to work in rounds: pair up cards whose first 20 symbols match, then pair those pairs on the next 20 symbols, and so on, nine rounds in total. You need a very large table to spread the cards on, and that table is the memory. The person checking your answer needs no table at all: you hand over the 512 card numbers, they reprint just those cards, and they check that the patterns cancel and that the pairs were formed in the right order.

## How a miner finds a solution

The rules are in sections 7.7.1 and 5.4.1.11 of the [protocol specification](https://zips.z.cash/protocol/protocol.pdf).

1. **Take the header without the solution.** The input is the block version, the previous block hash, the Merkle root, the block commitments hash, the time, `nBits` and a 32-byte nonce.
2. **Generate the list.** BLAKE2b, personalized with `ZcashPoW` and the values of n and k, is applied to that input plus a counter. Each call gives 50 bytes, which is two 200-bit strings, so 1,048,576 calls produce the whole list of 2,097,152 strings.
3. **Search it.** Find 512 different positions in the list whose strings XOR to zero. Equihash adds rules called algorithm binding: inside the solution, every aligned group of 2, 4, 8 and so on up to 256 strings must already XOR to a value that starts with 20, 40, 60 and so on up to 160 zero bits, and the two halves of every group must be in a fixed order. The designers added these rules so that other methods can't cheaply produce many extra solutions from the same list, and so that one set of positions can't be submitted again in a different order.
4. **Pack it.** Each position is written as a 21-bit number. 512 times 21 bits is 1,344 bytes.
5. **Try the difficulty.** Put the solution into the header and hash the whole header with SHA-256d. If the result is at or below the target, the block passes the proof-of-work check. If not, change the nonce and start again. Each run finds about 1.88 valid solutions on average ([Openwall](https://www.openwall.com/articles/Zcash-Equihash-Analysis)), and each one gets its own try against the target.

## Where the solution sits in a block

A Zcash block header follows Bitcoin's layout, with an extra commitment field, a bigger nonce and the Equihash solution added (protocol specification, section 7.6).

| Field | Bytes | What it holds |
|---|---|---|
| `nVersion` | 4 | Block version, currently 4 |
| `hashPrevBlock` | 32 | SHA-256d hash of the previous block's header |
| `hashMerkleRoot` | 32 | Merkle root of the block's transactions |
| `hashBlockCommitments` | 32 | Since NU5, a hash of the chain history root and the root of the transactions' authorizing data ([ZIP 244](https://zips.z.cash/zip-0244)); earlier upgrades used the field for other roots |
| `nTime` | 4 | Timestamp, in Unix time |
| `nBits` | 4 | The target in compact form, the same format as Bitcoin |
| `nNonce` | 32 | Free field the miner changes between attempts (4 bytes in Bitcoin) |
| `solutionSize` | 3 | Always 1,344 |
| `solution` | 1,344 | The Equihash solution |

That is 1,487 bytes per header. The size field must use the shortest possible encoding. The specification explains why: otherwise a miner could test several encodings of the same solution against the target instead of one.

## Why solving needs memory and checking does not

- **Solving.** The round-by-round method (Wagner's algorithm) keeps the whole list, and the combinations it builds, in memory and sorts them in every round. An [analysis published by Openwall](https://www.openwall.com/articles/Zcash-Equihash-Analysis) in November 2016, funded by the Zcash company, found that the solvers submitted to Zcash's [open-source miner challenge](https://zodl.com/open-source-miner-winners/) needed at least 144 MiB to find almost all solutions efficiently, and that a version limited to 128 MiB could still find 97% of them.
- **Checking.** A node recomputes only the 512 strings named in the solution and checks the XOR and ordering rules. The Equihash paper calls verification "instant", since it needs only one hash per string in the solution: 512 for Zcash.
- **More memory is not more speed.** Above the minimum, extra memory helps only a little, mainly by letting a machine run several solver instances at once (Openwall).
- **A heuristic, not a proof.** Equihash's designers argued that using less memory costs much more computation. A [2017 note](https://doi.org/10.1145/3140649.3140652) by Leo Alcock and Ling Ren pointed out that no bound for this trade-off is known, said its findings expose no immediate threat, and concluded that Equihash should be treated as a heuristic scheme without formally proven security guarantees.

## Difficulty and block timing

Unlike Bitcoin, Zcash recalculates the target, and so the difficulty, after every block. The rule is based on DigiShield v3/v4, with simplifications (protocol specification, section 7.7.3):

1. Take the average target of the last 102 blocks (17 before NU7).
2. Measure how long those blocks took, using the median timestamp of 11 blocks at each end of the window rather than single timestamps.
3. Dampen the difference from the expected time: only a quarter of it counts.
4. Clamp the result to between 84% and 132% of the expected time. The new target can therefore be at most 16% below or 32% above the average target.
5. Scale the average target by the measured time over the expected time, never going past the easiest target the rules allow.

The expected time between blocks has changed twice:

| From | Target spacing | Averaging window |
|---|---|---|
| Launch, October 2016 | 150 seconds | 17 blocks (2,550 seconds) |
| [Blossom](./Blossom.md), block 653,600, December 2019 ([ZIP 208](https://zips.z.cash/zip-0208)) | 75 seconds | 17 blocks (1,275 seconds) |
| [NU7](./NU7.md), block 3,543,405, November 2026 ([ZIP 218](https://zips.z.cash/zip-0218)) | 25 seconds | 102 blocks (2,550 seconds) |

[ZIP 218](https://zips.z.cash/zip-0218) raised the window to 102 blocks so that difficulty is smoothed over 2,550 seconds of real time again, as it was at launch. It gives two reasons: not to make difficulty-manipulation attacks easier, and to reduce short-term swings in block times.

Other rules that matter to miners:

- **Timestamps:** a block's time must be later than the median time of the previous 11 blocks and no more than 90 minutes after it. Nodes also refuse blocks dated more than two hours ahead of their own clock.
- **Testnet only:** a Testnet block whose time is more than 450 seconds after the previous block's may be mined at minimum difficulty. Mainnet has no such rule.
- **The best chain:** each block counts as work in inverse proportion to its target, and nodes follow the valid chain with the most total work.

## Mining in practice

- **Pools** talk to miners with the Zcash version of the Stratum protocol, [ZIP 301](https://zips.z.cash/zip-0301). The pool fixes the first part of the 32-byte nonce for each connection, so miners don't repeat each other's work, and the miner varies the rest. The pool sends a target with `mining.set_target`, and the miner submits every solution that meets it with `mining.submit`. These submissions are the shares a pool counts when it pays miners.
- **Hashrate** is counted in solutions per second (Sol/s) and its multiples, such as kSol/s. It can't be compared with the hashes per second used for SHA-256 coins.
- **Hardware:** GPUs and CPUs can still run Equihash solvers, but they compete with Equihash ASICs on the same network. The [Zcash Mining Guide](/using-zcash/zcash-mining-guide) covers hardware, pools and profitability.

## ASICs and the 2018 debate

- **April 2016:** the Zcash Company's post [Why Equihash?](https://zodl.com/why-equihash/) said it thought cost-effective ASICs were unlikely "in the foreseeable future", and that it might change the proof of work again if it found a flaw in Equihash.
- **November 2016:** the [Openwall analysis](https://www.openwall.com/articles/Zcash-Equihash-Analysis) noted that Equihash is memory-hard but not sequential memory-hard, and expected custom mining hardware to appear "if/once there is sufficient perceived incentive".
- **May 2018:** Bitmain [announced](https://www.coindesk.com/markets/2018/05/03/bitmains-latest-crypto-asic-can-mine-zcash) the Antminer Z9 mini, an ASIC for Equihash, due to ship in June. The [Zcash Foundation](https://web.archive.org/web/20180624193812/https://z.cash.foundation/blog/statement-on-asics/) said it would research ASIC resistance and prepare a ZIP if it found that necessary. The Zcash Company [said](https://zodl.com/zcash-company-statement-on-asics/) it was not taking a technical position while it shipped Overwinter and Sapling, but would consider an upgrade that went through the ZIP process.
- **June 2018:** at Zcon0 in Montreal, a community governance panel run by the Zcash Foundation voted 45 to 19 against prioritizing ASIC resistance, and 38 to 26 for researching longer-term options ([CoinDesk](https://www.coindesk.com/tech/2018/06/28/zcash-votes-against-asic-resistance-in-boon-for-big-miners/)).
- **The outcome:** no change. The current protocol specification still sets n = 200 and k = 9. Other coins that had reused Zcash's parameters made their own choices: Bitcoin Gold, for example, [announced in June 2018](https://www.bitcoingold.org/equihash-btg-our-new-pow-algorithm/) that it would move to Equihash with n = 144 and k = 5.

## Equihash and Zcash's future

- **NU7 left the puzzle alone.** For miners it changed the block spacing, the averaging window, the block subsidy and how fees are split. The Equihash parameters stayed the same.
- **Crosslink keeps mining.** Shielded Labs' [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) says Zcash "remains a Proof-of-Work blockchain" under its design: miners still produce blocks, and finalizers backed by staked ZEC add a finality layer next to them. Crosslink is still a proposal. It would need a ZIP and strong community and coinholder support before it could be part of a network upgrade.

## Common mistakes

- **"Equihash is a hash function."** It is a proof-of-work puzzle. It uses BLAKE2b to build its list, and the final difficulty check uses SHA-256d.
- **"Equihash can't be mined with ASICs."** It can. Equihash ASICs have been sold since 2018.
- **"More RAM means more hashrate."** Only up to the amount a solver needs. After that, extra memory mostly lets you run more solver instances.
- **"Sol/s is the same as H/s."** No. Sol/s counts Equihash solutions, and one solver run finds about two of them.
- **"NU7 changed the mining algorithm."** No. The difficulty adjustment lowered the work per block to reach 25-second blocks, but miners solve the same puzzle.
- **"Crosslink will replace miners."** Not according to its designers. It adds finality on top of proof of work.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Proof of work (PoW) | A puzzle that is costly to solve and cheap to check, used to decide who adds the next block |
| Equihash | The memory-hard proof of work Zcash uses, with n = 200 and k = 9 |
| Generalized birthday problem | Finding several strings in a list whose XOR is zero; the math problem Equihash is built on |
| Wagner's algorithm | The round-by-round method for solving the generalized birthday problem |
| Algorithm binding | Extra Equihash rules that only accept solutions shaped like the round-by-round method's output |
| Nonce | A 32-byte header field the miner changes between attempts |
| Target | The number the header hash must not exceed; a lower target means higher difficulty |
| `nBits` | The compact encoding of the target stored in each block header |
| Block target spacing | The average time between blocks that the difficulty aims for: 25 seconds since NU7 |
| Sol/s | Solutions per second, the unit for Equihash hashrate |
| Stratum | The protocol pools and miners use to share work ([ZIP 301](https://zips.z.cash/zip-0301)) |
| ASIC | A chip built for one task, here for solving Equihash |

## FAQ

**Has Zcash ever changed its proof of work?** No. The parameters have been n = 200 and k = 9 since launch. Blossom and NU7 changed how often blocks arrive, not the puzzle.

**Why is a Zcash block header so much bigger than Bitcoin's?** Mostly because of the 1,344-byte Equihash solution, plus a 32-byte nonce instead of a 4-byte one.

**Why are Testnet blocks sometimes found with almost no work?** Testnet accepts a minimum-difficulty block when its time is more than 450 seconds after the previous block's. Mainnet does not.

**Can I mine Zcash with a graphics card?** You can run a GPU solver, but you compete with ASICs on the same network. Read the [Zcash Mining Guide](/using-zcash/zcash-mining-guide) and check profitability first.

**Does Equihash affect my privacy?** No. Proof of work secures block production. What a transaction reveals depends on the shielded pools and address types it uses; see [Who can see your Zcash payment](/start-here/who-can-see-your-zcash-payment).

## Test your understanding

1. How many list positions are in a Zcash Equihash solution, and why does that take 1,344 bytes?
2. Which two checks must a block's proof of work pass?
3. Why did NU7 raise the averaging window from 17 to 102 blocks?
4. What did the June 2018 community panel decide about ASIC resistance?

Answers: (1) 512 positions of 21 bits each, and 512 × 21 bits = 1,344 bytes; (2) the solution must be a valid Equihash solution, and the SHA-256d hash of the whole header must be at or below the target; (3) to smooth difficulty over 2,550 seconds of real time at 25-second spacing, so difficulty manipulation does not get easier and block times swing less; (4) it voted 45 to 19 against prioritizing ASIC resistance, and Zcash kept Equihash.

### Resources

[Equihash: Asymmetric Proof-of-Work Based on the Generalized Birthday Problem (NDSS 2016)](https://www.ndss-symposium.org/wp-content/uploads/2017/09/equihash-asymmetric-proof-of-work-based-generalized-birthday-problem.pdf), full version on the [Cryptology ePrint Archive](https://eprint.iacr.org/2015/946)

[Zcash Protocol Specification, sections 7.6 and 7.7](https://zips.z.cash/protocol/protocol.pdf)

[ZIP 301: Zcash Stratum Protocol](https://zips.z.cash/zip-0301)

[ZIP 208: Shorter Block Target Spacing](https://zips.z.cash/zip-0208)

[ZIP 218: 25-second Block Target Spacing](https://zips.z.cash/zip-0218)

[New Alpha Release: Equihash and Founders' Reward (April 2016)](https://zodl.com/new-alpha-release-equihash-and-founders-reward/)

[Why Equihash? (April 2016)](https://zodl.com/why-equihash/)

[An analysis of Zcash's use of the Equihash proof-of-work scheme (Openwall, November 2016)](https://www.openwall.com/articles/Zcash-Equihash-Analysis)

[Announcing the Winners of the Open Source Miner Challenge (December 2016)](https://zodl.com/open-source-miner-winners/)

[A Note on the Security of Equihash (2017)](https://doi.org/10.1145/3140649.3140652)

[Bitmain's Latest Crypto ASIC Can Mine Zcash (CoinDesk, May 2018)](https://www.coindesk.com/markets/2018/05/03/bitmains-latest-crypto-asic-can-mine-zcash)

[The Zcash Foundation's Role in the Zcash ASIC Resistance Debate (May 2018, archived)](https://web.archive.org/web/20180624193812/https://z.cash.foundation/blog/statement-on-asics/)

[Zcash Company Statement on ASICs (May 2018)](https://zodl.com/zcash-company-statement-on-asics/)

[Zcash Votes Against ASIC Resistance in Boon for Big Miners (CoinDesk, June 2018)](https://www.coindesk.com/tech/2018/06/28/zcash-votes-against-asic-resistance-in-boon-for-big-miners/)

[Crosslink FAQ (Shielded Labs)](https://shieldedlabs.net/crosslink-faq/)

## Related Pages

| Page | Why it is related |
|---|---|
| [Zcash Mining Guide](/using-zcash/zcash-mining-guide) | how to point mining hardware at a pool |
| [Zcash Mining Pools](/using-zcash/zcash-mining-pools) | pools that accept Equihash miners |
| [NU7](./NU7.md) | the upgrade that moved blocks to 25 seconds |
| [Blossom](./Blossom.md) | the upgrade that moved blocks from 150 to 75 seconds |
| [What 25-Second Blocks Actually Change](/research/what-25-second-blocks-actually-change) | the difficulty window and stale blocks after NU7 |
| [Crosslink Protocol](./Crosslink_Protocol.md) | the proposed finality layer that would sit next to proof of work |
| [Hash Functions](/zero-to-zero-knowledge/hash-functions) | BLAKE2b, SHA-256 and the other hash functions behind Zcash |

---

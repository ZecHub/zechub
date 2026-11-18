<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Network Sustainability Mechanism (NSM)

> The NSM has been part of Zcash consensus since [NU7](./NU7.md) activated at Mainnet block 3,543,405 on November 6, 2026. Fees are being set aside now; reissuance to miners starts at block 8,939,664 (projected around February 2031).

What you'll take away: what the Network Sustainability Mechanism does, how much of each block's fees it removes, where that ZEC goes, when and how fast it comes back as block rewards, and why the 21 million cap and the halving schedule are unchanged.

The Network Sustainability Mechanism (NSM) is a set of consensus rules that takes some ZEC out of circulation and pays it back to miners later, spread over many years. NU7 deployed two parts of it: [ZIP 235](https://zips.z.cash/zip-0235), which removes 60% of each block's transaction fees from circulation, and [ZIP 237](https://zips.z.cash/zip-0237), which reissues the removed ZEC on top of the normal block subsidy along a smooth curve. Both were activated by [ZIP 259](https://zips.z.cash/zip-0259).

Why this matters. Zcash pays for its security with new ZEC in every block, and that subsidy halves about every four years. Once it is small, miners have to live mostly on fees. The NSM is a first step toward that future: it saves part of today's fees and pays them out to future miners, without raising the supply cap and without changing the halving schedule people already rely on.

## TL;DR

- **Removal ([ZIP 235](https://zips.z.cash/zip-0235)):** in every block, 60% of the total transaction fees (rounded down, in the miner's favour) leave circulation. The miner keeps the other 40%.
- **The NSM Value Balance:** a public running total of ZEC removed from circulation and not yet reissued. It is consensus state, not a pool anyone can spend from.
- **The seed:** at NU7 the balance started at **368.58445520 ZEC**, the block rewards and fees that early miners left unclaimed before NU6.
- **Reissuance ([ZIP 237](https://zips.z.cash/zip-0237)):** from block **8,939,664**, each block adds a fixed fraction (0.00001375%) of the balance to the block subsidy. That pays out about half of the balance per four-year halving period.
- **What stays the same:** the halving schedule, and the 21 million ZEC cap as an upper bound. If the balance is ever zero, issuance is exactly the old schedule.

## Visual analogy

Think of a savings jar next to the till. Every time a block is mined, 60% of the tips (fees) go into the jar instead of the miner's pocket. Nobody can take money out of the jar by hand. From 2031 on, a small fixed share of whatever is in the jar is added to every block reward, so the jar empties slowly: about half of it every four years, the same rhythm as the halvings.

## How removal works (ZIP 235)

- The rule is per block, not per transaction. For a block with total fees `F` (in zatoshi), the removed amount is `floor(6 × F / 10)` and the miner may claim `F` minus that amount.
- Rounding is done once for the whole block and always in the miner's favour. Rounding per transaction would remove less than 60% in aggregate (two 1-zatoshi fees would each contribute 0).
- Example: a block whose transactions pay 50,000 zatoshi (0.0005 ZEC) in fees removes 30,000 zatoshi and pays the miner 20,000. A block with 15 zatoshi of fees removes 9 and pays the miner 6.
- No transaction field is needed. Every node computes the amount from the fees it already validates, and [ZIP 236](https://zips.z.cash/zip-0236) makes the coinbase transaction claim exactly what the miner is owed, so a miner can neither remove less nor claim more.
- Scale: ZIP 235 estimated, from pre-NU7 traffic, about 370 ZEC of fees a year, so roughly 222 ZEC a year removed. Fees are small next to the block subsidy today, which is why the authors expected little impact on miners.

## How reissuance works (ZIP 237)

- **The balance.** `NSMValueBalance` starts at 368.58445520 ZEC (36,858,445,520 zatoshi) at NU7 activation. Each block adds what ZIP 235 removed and subtracts what was reissued. A block that would make the balance negative is invalid.
- **Where the seed came from.** Before NU6, a coinbase transaction could claim less than the full block reward and fees. Over the chain's first 2,726,400 blocks, miners left 368.58445520 ZEC unclaimed: the scheduled subsidy to that height was 15,750,000 ZEC, and the issued supply was 15,749,631.41554480 ZEC. ZIP 237 puts that value into the NSM so it is paid out instead of lost.
- **No reissuance until block 8,939,664.** Between NU7 and that height the balance only grows.
- **The formula.** From block 8,939,664, each block's subsidy gets an extra `ceiling(0.0000001375 × NSMValueBalance)`, computed from the balance after the previous block. The fraction is `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000, with a post-NU7 halving interval of 5,040,000 blocks.
- **Why that fraction.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, so if nothing new is removed, about half of the balance is reissued in each halving period. It is an exponential decay applied only to the NSM balance, laid over the unchanged halving steps.
- **Worked example.** If the balance were still only the 368.58 ZEC seed at block 8,939,664, the first block would reissue 5,069 zatoshi (about 0.00005 ZEC), roughly 0.175 ZEC a day at 3,456 blocks a day. Real numbers will be higher by whatever fees are removed until then.
- **Why block 8,939,664.** ZIP 237 picks it by a fixed rule, independent of how much is actually removed: the first block after the third halving (block 6,132,390, projected around November 2028) at which the NSM fraction applied to all ZEC not yet scheduled for issuance would pay less than the normal block subsidy (0.26041666 ZEC in that period). The NU7 coinholder and community polls did not reach a shared majority on when reissuance should start, so ZIP 259 uses this crossover.

## What did not change

- **The halving schedule.** ZIP 237 keeps the four-year halving steps. The rejected alternative, [ZIP 234](https://zips.z.cash/zip-0234), would have replaced them with a smooth issuance curve; the August and September 2026 NU7 polls asked whether to preserve halvings or smooth issuance, and NU7 shipped the halving-preserving design.
- **The supply cap.** The Issued Supply plus the NSM Value Balance grows by exactly the scheduled block subsidy in each block, so issuance can never exceed the cap. In fact the cap fell slightly: ZIP 218's rounding of the post-NU7 subsidy lowered total issuance by about 0.50 ZEC, and the NSM does not reissue that shortfall.
- **Voluntary removal.** [ZIP 233](https://zips.z.cash/zip-0233), which would let anyone send ZEC into the NSM with an explicit transaction field, was not deployed in NU7. Today fees are the only source of removal. ZIP 237 allows later ZIPs to add more sources.
- **Privacy.** The balance and the extra subsidy are calculated from values that are already public, so the NSM reveals nothing new about transactions.

## Common mistakes

- **"60% of fees are burned."** Not permanently. Unlike a burn (Ethereum's EIP-1559 is the usual comparison), removed ZEC is tracked and reissued to future miners.
- **"The NSM prints extra ZEC."** No. It only reissues value that was removed or never claimed; total issuance stays under the existing cap.
- **"Reissuance has started."** Not yet. Until block 8,939,664 the balance only accumulates.
- **"The NSM is a fund someone controls."** No. It is a number in consensus state, and value leaves it only through the block subsidy formula.
- **"Halvings are gone."** No. That was ZIP 234's design, which NU7 did not deploy.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Network Sustainability Mechanism (NSM) | The consensus rules that remove ZEC from circulation and reissue it to miners later |
| NSM Value Balance | The public running total of ZEC removed from circulation (or never claimed) and not yet reissued |
| Removal from circulation | Taking ZEC out of the issued supply into the NSM Value Balance; since NU7 this is 60% of each block's fees |
| Reissuance | Paying ZEC from the NSM Value Balance back out as extra block subsidy, from block 8,939,664 |
| Issued Supply | All ZEC in the chain's value pools; it does not include the NSM Value Balance |
| Block subsidy | The new ZEC created in each block, shared between the miner and the development-fund streams |
| Halving interval | The number of blocks between halvings: 5,040,000 since NU7 (about four years at 25-second blocks) |

## FAQ

**How much is in the NSM today?** The 368.58445520 ZEC seed plus 60% of every block's fees since block 3,543,405. It is consensus state that every full node tracks.

**Who gets the reissued ZEC?** It is added to the block subsidy, so it is split the same way: the development-fund streams receive their fixed percentage of the total (scheduled plus reissued) subsidy and the miner gets the rest.

**When does reissuance start?** At block 8,939,664 on Mainnet, projected around February 2031 if blocks keep a 25-second average. On Testnet the height follows the same rule from Testnet's NU7 activation height.

**Will fees go up because of the NSM?** No. It changes where fees go, not how much a transaction pays.

**Can the 60/40 split change?** Only through a future ZIP and network upgrade. ZIP 235 says the split may be revisited if fees grow, for example once fees exceed the block subsidy.

## Test your understanding

1. A block's transactions pay 100,000 zatoshi in fees. How much does the miner keep?
2. Where did the NSM's starting balance come from?
3. About what share of the NSM balance is reissued per halving period if nothing new is removed?
4. Why doesn't reissuance push total issuance above 21 million ZEC?

Answers: (1) 40,000 zatoshi; 60,000 are removed; (2) block rewards and fees that coinbase transactions left unclaimed before NU6, 368.58445520 ZEC; (3) about half; (4) reissuance only pays out value that was removed or never claimed, so issued supply plus the NSM balance grows by exactly the scheduled subsidy each block.

### Resources

[ZIP 235: Remove 60% of Transaction Fees From Circulation](https://zips.z.cash/zip-0235)

[ZIP 237: Network Sustainability Mechanism: Halving-Preserving Issuance](https://zips.z.cash/zip-0237)

[ZIP 259: Deployment of the NU7 Network Upgrade](https://zips.z.cash/zip-0259)

[ZIP 234: Network Sustainability Mechanism: Issuance Smoothing (not deployed)](https://zips.z.cash/zip-0234)

[ZIP 233: Network Sustainability Mechanism: Removing Funds From Circulation (not deployed)](https://zips.z.cash/zip-0233)

[ZIP 236: Blocks should balance exactly](https://zips.z.cash/zip-0236)

## Related Pages

| Page | Why it is related |
|---|---|
| [NU7](./NU7.md) | the network upgrade that activated the NSM |
| [Zcash Monetary Policy](../start-here/zcash-monetary-policy) | the halving schedule and supply cap the NSM keeps |
| [What 25-Second Blocks Actually Change](../research/what-25-second-blocks-actually-change) | why the subsidy and halving interval changed at NU7 |
| [Development Fund](../start-here/development-fund) | how the block subsidy is split |
| [Transactions](../using-zcash/transactions) | how transaction fees are set |

---

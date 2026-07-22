# The turnstile

## TL;DR

- The turnstile is a public accounting rule that tracks how much value enters and leaves each shielded pool
- It lets anyone verify that a pool never pays out more than was put into it, even though the transactions inside are private
- This protects the ZEC supply from a hidden bug, because counterfeit coins cannot leave a pool without breaking the count
- It works without weakening privacy, since only pool totals are public, never individual transactions
- The turnstile is the reason the Orchard to Ironwood migration can prove the shielded supply is sound

<br/>

## Who is this for

- Anyone who wants to understand how Zcash keeps its private supply trustworthy
- Users following the Orchard to Ironwood migration and wondering how it proves the supply is real
- Newcomers curious how a private money system can still be audited

<br/>

## The challenge

Shielded Zcash hides amounts, senders, and receivers. That privacy is the point. But it raises a hard question: if nobody can see inside the shielded pool, how does anyone know the total amount of ZEC is correct? How do you audit money you cannot see?

If a bug ever let someone forge coins inside a shielded pool, the forgery would be hidden by the same privacy that protects honest users. Without a safeguard, that uncertainty would undermine confidence in the whole supply. The turnstile is the safeguard that solves this.

<br/>

## What the turnstile is

Think of each shielded pool as a room with a single counted doorway. Every time value enters the pool from outside, or leaves it to go elsewhere, it passes through the doorway and is tallied in public. The transactions inside the room stay private, but the running total at the door is visible to everyone.

The rule is simple: a pool can never let more value out than has gone in. Nodes reject any block that would push a pool's balance below zero. The amount believed to be inside a pool is known at all times, because it is just the total that entered minus the total that left. This public tally is the turnstile.

<br/>

## How it works

Zcash has several shielded pools over its history, such as Sprout, Sapling, and Orchard. Value moves between the transparent chain and these pools, and sometimes between the pools themselves. The turnstile watches those movements:

1. When ZEC moves into a shielded pool, the amount is added to that pool's public balance
2. When ZEC moves out of a pool, the amount is subtracted
3. The network rejects any block that would make a pool's balance go negative, meaning more has left than ever entered
4. Individual shielded transactions stay fully private, only the pool totals are public

The network tracks a balance for every value pool this way, including Sprout, Sapling, Orchard, the new Ironwood pool, and the transparent and lockbox balances. Because of this, even if the exact contents of a pool are hidden, the maximum that can ever come out is capped by what went in. No hidden inflation can escape into circulation.

<br/>

## Why it matters

The turnstile gives Zcash three things at once.

First, it compartmentalizes risk. A cryptographic bug in one pool is contained to that pool, because the turnstile stops forged value from crossing into the wider supply.

Second, it lets the community verify the supply in retrospect. If a bug is later discovered, the turnstile record shows whether more value ever left a pool than entered it. A clean record is strong evidence that no counterfeiting was exploited.

Third, it preserves privacy while doing all of this. Only pool-level totals are public. Your individual transactions remain shielded. Auditability and privacy coexist, which is unusual and is one of Zcash's quiet strengths.

<br/>

## The turnstile in action

The turnstile is not new, and it has been used at key moments in Zcash history.

When Zcash moved from the original Sprout pool toward the newer Sapling pool, the turnstile guarded the transition. The Sprout pool was later restricted so it could not receive new inflows, which encouraged users to migrate while the turnstile kept the accounting honest. Years later, the fact that no value ever improperly left Sprout stands as evidence that its early cryptography was never successfully exploited.

The same design now guards the move from Orchard to Ironwood. In 2026 a soundness bug was found and patched in the Orchard proving system. There is no evidence it was ever exploited, but because shielded activity is private, certainty was impossible. The response is to seal the old Orchard pool and have everyone migrate their funds through the turnstile into Ironwood, a fresh pool using the corrected protocol. Forcing funds through the turnstile means any hypothetical counterfeit coins left behind cannot follow, and once migration completes, anyone can confirm the shielded supply is sound.

<br/>

## Common misconceptions

- The turnstile does not reveal your transactions. It only tallies pool totals, not who sent what to whom
- It does not catch a counterfeiter by name. It caps how much can leave a pool, which is what protects the supply
- It is not a new invention for Ironwood. It has guarded every major shielded pool transition in Zcash history
- A public pool total does not weaken privacy. The privacy is in the transactions inside the pool, which stay hidden

<br/>

## Resources

1. [ZIP 209: Prohibit Out-of-Range Chain Value Pool Balances](https://zips.z.cash/zip-0209) - the consensus rule behind the turnstile
2. [ZIP 211: Disabling Addition of New Value to the Sprout Chain Value Pool](https://zips.z.cash/zip-0211) - how the Sprout pool was closed to new deposits
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - the upgrade that introduces the Ironwood pool and directs value across the turnstile
4. [Turnstile Enforcement Against Counterfeiting](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - the original explanation from Electric Coin Company

<br/>

## Related pages

- [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) - how Zcash shielded transactions keep details private
- [Halo](https://zechub.wiki/zcash-tech/halo) - the proof system behind the Orchard pool
- [Network Upgrades](https://zechub.wiki/start-here/network-upgrades) - how Zcash activates changes like new shielded pools

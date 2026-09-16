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

## How value balance is checked

The tally at the door is only trustworthy because every transaction is forced to prove it moved a truthful amount, even though the amount itself stays hidden. Each shielded transaction publishes one honest number: the net value it moves into or out of the pool, called its value balance. A positive value balance means funds left the pool to the transparent side, a negative one means funds entered. The private details stay sealed, but this single net figure is public, and it is what the turnstile adds up.

The clever part is how a transaction proves that public number is honest without revealing the private amounts behind it. The mechanism differs by pool, and this is the real machinery of the turnstile.

In the original Sprout pool, each transaction uses a JoinSplit. A JoinSplit spends two hidden notes and creates two new ones, and it carries two public fields: vpub_old, the value entering the shielded pool from the transparent side, and vpub_new, the value leaving the pool back to the transparent side. Every JoinSplit must balance on its own, and its zero knowledge proof guarantees the hidden inputs and hidden outputs add up correctly. Sprout's pool balance is simply the running total of all vpub_old minus all vpub_new across the chain. This is why Sprout is a useful example later: because vpub_old is the only way value can enter the pool, a single rule turning it off can seal the pool for good.

In Sapling, Orchard, and Ironwood, balance is proven a smarter way, using a binding signature. Instead of each transfer balancing alone, the whole transaction commits to each hidden amount using a value commitment. A value commitment is a sealed envelope for a number, built with a homomorphic Pedersen commitment, which has a special property: the envelopes can be added and subtracted without opening them. The network adds up all the input commitments, subtracts all the output commitments, and compares the result against the transaction's single declared net figure, its valueBalance field. Only a transaction whose hidden amounts genuinely match that public valueBalance can produce a valid binding signature over the combined commitments. If someone tried to move more value than they declared, the commitments would not add up, the binding signature would not verify, and the transaction would be rejected. Ironwood uses the same Orchard protocol, so it works the same way.

This is also what makes a cross-pool transfer safe to check. When funds move from one shielded pool to another, for example from Orchard into Ironwood, the transaction cannot hide the amounts from the accounting. Each pool has its own value balance that must be satisfied by its own proofs: the Orchard side must show a matching outflow through its binding signature, and the Ironwood side must show the corresponding inflow through its own. The value leaving one pool and the value entering the other are each proven independently, so a cross-pool move is really two turnstile crossings happening in one transaction, one out, one in, and both are tallied in public even though the underlying amounts stay private.

So the turnstile is not trust. Every transaction mathematically proves its own net effect, the network sums those proven net effects per pool, and a consensus rule (ZIP 209) rejects any block that would drive a pool's balance negative. Proof at the transaction level, enforcement at the chain level.

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

## One-way pool deprecation

The turnstile makes it possible to retire an old pool safely, in one direction only, without ever breaking the supply guarantee. The trick is to close the entrance while leaving the exit open.

Sprout is the clearest example. To deprecate it, ZIP 211 added a single consensus rule: from its activation height, the vpub_old field of every JoinSplit must be zero. Since vpub_old is the only way value can enter Sprout, forcing it to zero means no new value can ever go in again, while value can still flow out to the transparent side or onward to Sapling. The pool became one-way. It can only drain, never fill. The turnstile keeps counting the whole time, so the balance can fall as funds leave but can never rise, and it can never go negative.

The Orchard to Ironwood migration uses the same idea. At the NU6.3 upgrade, the Orchard pool is closed to new inflows, and wallets are directed to send Orchard funds across the turnstile into the new Ironwood pool. Orchard becomes a one-way pool that can only empty. Because every exit is a turnstile crossing that must be proven, any hypothetical counterfeit value left behind in Orchard cannot quietly follow the honest funds out. It is stuck in a pool that only drains and is watched at the door. Over time this drives the old pool toward empty and lets anyone confirm that the value which came out was never more than the value that honestly went in.

This is the deeper reason the turnstile matters beyond simple accounting. It is the mechanism that lets Zcash deprecate a shielded pool, whether to reduce complexity as with Sprout, or to recover from a discovered bug as with Orchard, while keeping a continuous, public, provable guarantee about the supply.

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
4. [Turnstile Enforcement Against Counterfeiting](https://web.archive.org/web/20260825/https://zodl.com//blog/turnstile-enforcement-against-counterfeiting/) - the original explanation from Electric Coin Company
5. [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) - see the sections on balance and binding signature for the full detail
6. [Value Pools, the Zebra Book](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - how a node tracks each pool's value balance

<br/>

## Related pages

- [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) - how Zcash shielded transactions keep details private
- [Halo](https://zechub.wiki/zcash-tech/halo) - the proof system behind the Orchard pool
- [Network Upgrades](https://zechub.wiki/start-here/network-upgrades) - how Zcash activates changes like new shielded pools

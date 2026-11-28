<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Orchard.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Orchard

> Orchard is the shielded payment protocol that NU5 introduced at block 1,687,104 (May 31, 2022 UTC). The Orchard pool was Zcash's primary shielded pool until NU6.3 (Ironwood) made it spend-only on July 28, 2026.

What you'll take away: how an Orchard transaction is put together, what changed compared with Sapling, and why "Orchard" now names both a protocol that is still in use and a pool that funds can only leave.

Orchard is Zcash's third shielded protocol, after [Sprout](../zcash-tech/sprout) and [Sapling](../zcash-tech/sapling). It is defined in [ZIP 224](https://zips.z.cash/zip-0224) and, in full detail, in the [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf). It activated with [NU5](../zcash-tech/nu5), together with the version 5 transaction format ([ZIP 225](https://zips.z.cash/zip-0225)) and unified addresses ([ZIP 316](https://zips.z.cash/zip-0316)). ZIP 224 credits Ying Tong Lai as its original author, with Daira-Emma Hopwood, Jack Grigg, Sean Bowe and Kris Nuttycombe as its owners. The reference implementation is the [`orchard`](https://github.com/zcash/orchard) Rust crate, and its proofs are made with [Halo](../zcash-tech/halo) 2.

Why this matters. ZIP 224 gives two reasons Zcash needed a new shielded protocol. Sprout and Sapling proofs rely on parameters from trusted setup ceremonies, and anyone who learned the secret behind those parameters could make fake proofs and counterfeit ZEC. Neither protocol works with the known efficient ways of building recursive proofs either, which Zcash wanted for scaling later. Orchard answers both: Halo 2 needs no trusted setup, and Orchard's curves were chosen so that recursion is possible in a future upgrade. On top of that, an Orchard transaction gives away less about its own shape than a Sapling one. The Orchard pool no longer takes new deposits, but the protocol carries on: the [Ironwood](../zcash-tech/ironwood) pool runs it with a corrected circuit.

## TL;DR

- Orchard activated with NU5 at block 1,687,104 (May 31, 2022 UTC). ZIP 224 lists what it changes relative to Sapling.
- An Orchard transaction holds a bundle of **actions**. Each action spends one note and creates one note, and either side can be a zero-value dummy. One Halo 2 proof covers the whole bundle.
- It replaces Sapling's Groth16 proofs and BLS12-381/Jubjub curves with Halo 2 and the Pallas/Vesta curve cycle, so there is no trusted setup.
- There is no standalone Orchard address. Orchard receivers live inside unified addresses (`u1…`).
- Since NU6.3 (July 28, 2026) the Orchard pool is spend-only. The Orchard protocol continues in the Ironwood pool, and a current wallet that pays an Orchard receiver sends the funds into Ironwood.

## Visual analogy

A Sapling transaction is like a post office with two counters, one for parcels going out and one for parcels coming in. Nobody can look inside the parcels, but anyone in the queue can count how many people used each counter. Orchard replaces the counters with a row of identical booths. In each booth you hand over one sealed parcel and take one away, and some of the parcels are empty on purpose. From outside you can count the booths, but you can't tell how many of the parcels were real.

## The protocol and the pool

Since NU6.3, the ZIPs use the name for two different things ([ZIP 229](https://zips.z.cash/zip-0229)):

| Term | What it means |
|---|---|
| Orchard protocol | The cryptographic design: the Pallas and Vesta curves, the Sinsemilla hash, the Action circuit, and how notes, note commitments, nullifiers, keys and note encryption work |
| Orchard pool | The value pool that NU5 created, with its own note commitment tree, anchors and chain value pool balance. Spend-only since NU6.3 |
| Ironwood pool | A second pool of the Orchard protocol, created by NU6.3, with its own tree and balance |

This page is about the protocol. For the state of the pool and the move to Ironwood, see [Ironwood](../zcash-tech/ironwood) and [Shielded Pools](../using-zcash/shielded-pools).

## How Orchard works

Orchard transactions are built from **action descriptions**. Each action is one spend paired with one output: it uses up one note and creates one. Either half can be a dummy, a note worth zero that only fills the slot. All the actions in a transaction together make up its Orchard bundle.

Sapling works differently. It has separate Spend and Output descriptions, so anyone can count the spends and outputs in a transaction. The [Orchard design notes](https://zcash.github.io/orchard/design/actions.html) explain the trade-off. Sprout's JoinSplits hid part of a transaction's shape but were bulky. Sapling's split made outputs much cheaper to create but showed the shape, so its transaction builder pads transactions to at least one spend and two outputs. Actions bring the shape-hiding back while still balancing value with Sapling-style value commitments. A wallet fills unused halves with dummies and can add whole dummy actions, so the number of actions doesn't reveal how many real spends and outputs a transaction has.

An Orchard bundle carries **one Halo 2 proof that covers every action in the bundle**, and nodes check it against the Orchard verifying key. Among other things, the proof shows that each real note being spent is in the note commitment tree. The Merkle path that proves this is a private input to the proof and is never published. Every action in a bundle uses the same **anchor**, a root of the Orchard note commitment tree from an earlier block.

Each action puts these fields on chain ([ZIP 225](https://zips.z.cash/zip-0225)):

| Field | Size | What it does |
|---|---|---|
| Value commitment (`cv`) | 32 bytes | Commits to the spent note's value minus the new note's value, so the bundle can be balanced without showing amounts |
| Nullifier (`nf`) | 32 bytes | Marks the spent note as used, without showing which note it was |
| Randomized verification key (`rk`) | 32 bytes | The key that the action's spend authorization signature is checked against |
| Note commitment (`cmx`) | 32 bytes | Commitment to the new note, added to the note commitment tree |
| Ephemeral key | 32 bytes | A one-time Pallas public key used to encrypt the new note |
| Note ciphertext (`encCiphertext`) | 580 bytes | The new note and its memo field, encrypted to the recipient |
| Outgoing ciphertext (`outCiphertext`) | 80 bytes | Lets the sender decrypt what they sent later, with their [outgoing viewing key](../zcash-tech/outgoing-view-keys) |

Outside the actions, the bundle has a flags byte that turns spends and outputs on or off for the whole bundle, the net value moving into or out of the pool (`valueBalanceOrchard`), the anchor, the proof, one 64-byte spend authorization signature per action, and one binding signature that ties the value commitments to `valueBalanceOrchard`. Each action takes 820 bytes, and the proof takes 2,720 bytes plus 2,272 bytes per action. ZIP 225 and the Action Descriptions section of the protocol specification have the exact layout.

## What changed from Sapling

ZIP 224 describes Orchard as following Sapling's design closely, with these differences:

| | Sapling | Orchard |
|---|---|---|
| Proving system | Groth16, with parameters from a multi-party ceremony | Halo 2 with PLONKish arithmetization, no trusted setup |
| Curves | BLS12-381, with Jubjub embedded in it | Pallas and Vesta, which form a cycle |
| Transaction parts | Separate Spend and Output descriptions | Actions, each one spend plus one output |
| Proofs | One per spend and one per output | One per bundle |
| Hash for note commitments and the tree | Bowe–Hopwood Pedersen hash | Sinsemilla |
| Nullifier function | BLAKE2s | Poseidon, plus a curve point |
| Signatures | RedJubjub | RedPallas |
| Diversifiers | Only some diversifiers give a valid address | Every diversifier gives a valid address |
| Address format | `zs…` Sapling addresses | No standalone address string; Orchard receivers live inside unified addresses (`u1…`) |
| ZIP 32 key derivation | Hardened and non-hardened | Hardened only |

A few of these need a word of explanation:

- **Pallas and Vesta.** The number of points on each curve equals the size of the other curve's base field, which is what makes the pair a cycle. Pallas is the "application curve" that Orchard's keys, notes and signatures use. Vesta is the "circuit curve" that Halo 2 proofs are computed over. ZIP 224 uses only half of the cycle. The full cycle, like Halo 2's support for recursive proofs, was left for future upgrades, and Orchard proofs are not recursive.
- **Sinsemilla.** A hash designed to be cheap inside Halo 2 circuits. Orchard uses it for note commitments, for the incoming viewing key and for the note commitment tree.
- **An infallible group hash.** Sapling derived address points with a hash that could fail, which is why only some diversifiers worked. Orchard hashes onto the curve with the "simplified SWU" method, which always succeeds, so every diversifier gives a valid address.

## Keys and addresses

Orchard's key tree looks a lot like Sapling's, with the simplifications listed in ZIP 224 and the [Orchard design notes on keys](https://zcash.github.io/orchard/design/keys.html):

- A spending key gives a **spend authorizing key** (for signing), a **nullifier deriving key** (`nk`) and a randomizer called `rivk`. The **full viewing key** is made of the spend validating key `ak`, `nk` and `rivk`.
- The **incoming viewing key** is a Sinsemilla commitment to `ak` and `nk`, and the **outgoing viewing key** is derived from the full viewing key instead of sitting beside it.
- Sapling's extra nullifier secret, `nsk`, is gone. It was a backstop in case the signature scheme was ever broken, but the designers note that Sapling proofs had to be built on the same device that creates the transaction, not on something small like a hardware wallet, so `nsk` was in practice kept about as safely as a full viewing key.
- Every diversifier gives a valid address, so one account can hand out as many unlinkable [diversified addresses](../zcash-tech/detecting-shielded-payments) as it likes.

ZIP 224 defines no Bech32 encoding for a single Orchard address, incoming viewing key or full viewing key. They only appear inside the unified encodings of ZIP 316, where the Orchard receiver has typecode `0x03`. Orchard spending keys are the exception and have a Bech32m encoding of their own. To see how the parts of a unified address fit together, see [Visualizing Zcash Addresses](../guides/visualizing-zcash-addresses).

[ZIP 32](https://zips.z.cash/zip-0032) derives Orchard keys from a seed with hardened steps only, along the path `m_Orchard / 32' / coin_type' / account'`. The coin type is the one registered in SLIP 44, which is 133 for Zcash; every testnet uses 1. ZIP 32 also defines an internal key for each account, so that change goes to an address the wallet never gives out.

## Notes, nullifiers and the commitment tree

An Orchard note records the recipient's address, the value, a value called rho, some randomness, and the randomness for its commitment. As for Sapling notes after [ZIP 212](https://zips.z.cash/zip-0212), the randomness is derived from a random seed.

Rho is set to the nullifier of the note spent in the same action. Nullifiers never repeat, so every new note gets a unique rho. This works because every output shares its action with a spend, even when that spend is a dummy. The [Orchard design notes on nullifiers](https://zcash.github.io/orchard/design/nullifiers.html) list resistance to attacks that get unspendable notes accepted among the properties the design aims for.

The nullifier is computed from `nk`, rho, the note's randomness and its commitment, using the Poseidon hash and a fixed curve point. Without `nk`, nobody can link a nullifier to the note it spends. Since `nk` is part of the full viewing key but not of the incoming viewing key, an incoming viewing key can see payments arrive but can't tell when they are spent.

Orchard keeps Sapling's tree shape: one global note commitment tree of fixed depth 32, with commitments appended in block order. A valid anchor is the root of the tree at a block boundary. The difference is that the tree is hashed with Sinsemilla ([Orchard design notes on the commitment tree](https://zcash.github.io/orchard/design/commitment-tree.html)).

## The turnstile at the edge of the pool

Value moves into or out of the Orchard pool only through the `valueBalanceOrchard` field. Together with the consensus rule that no pool's balance may go negative ([ZIP 209](https://zips.z.cash/zip-0209)), this forms a turnstile. ZIP 224 spells out the effect: a counterfeiting bug in Orchard stays inside the Orchard pool, and a counterfeiting bug in an older pool can't inflate Orchard. The price is that sending value from Orchard to anything that isn't Orchard shows the amount on chain, and ZIP 224 asks wallets to make that clear to their users. See [The turnstile](../zcash-tech/the-turnstile) for how pool balances are checked.

## Orchard today

The Orchard circuit was corrected by [NU6.2](../zcash-tech/nu6-2) in June 2026 ([ZIP 257](https://zips.z.cash/zip-0257)). At NU6.3, block 3,428,143 on July 28, 2026, the Orchard pool became spend-only ([ZIP 258](https://zips.z.cash/zip-0258), [ZIP 2006](https://zips.z.cash/zip-2006)):

- No transaction can increase the Orchard pool's balance.
- Each Orchard-pool action must send its output to the same receiver as the note it spends. You can move or rebalance your own funds, but you can't pay anyone else inside the pool.
- Coinbase transactions can't contain Orchard-pool actions.

The [Ironwood](../zcash-tech/ironwood) pool uses the Orchard protocol with the corrected circuit, version 6 transactions and quantum-recoverable notes ([ZIP 2005](https://zips.z.cash/zip-2005)). Unified addresses keep working: a receiver belongs to the Orchard protocol, not to a pool, and the same incoming viewing key finds notes in both pools. A wallet that supports NU6.3 sends any payment for an Orchard receiver into the Ironwood pool ([ZIP 326](https://zips.z.cash/zip-0326)).

There is no public evidence that the circuit bug was used to create ZEC, but that can't be proved from inside the Orchard pool. That is why Orchard value now leaves through [the turnstile](../zcash-tech/the-turnstile), where its total is counted.

## What Orchard does not do

- **Recursion.** Halo 2 and the Pallas/Vesta cycle support recursive proofs, but Orchard doesn't use them. ZIP 224 deliberately left recursion for later, rather than deploying a whole scaling design in one upgrade.
- **Other assets.** [Zcash Shielded Assets](../zcash-tech/zcash-shielded-assets) are specified as OrchardZSA, an extension of the Orchard protocol ([ZIP 226](https://zips.z.cash/zip-0226) and ZIP 227) whose notes also store an asset base. Both ZIPs are still drafts, and ordinary Orchard notes only carry ZEC.
- **Hiding pool crossings.** Moving value from Orchard into Ironwood, Sapling or a transparent address shows the amount, as described above.

## Common Mistakes

- **"Orchard is gone."** The Orchard pool is spend-only, but the Orchard protocol runs on in the Ironwood pool.
- **"Each action has its own proof."** One Halo 2 proof covers the whole bundle.
- **"Four actions means four payments."** Bundles are padded with dummy spends and outputs, so the count doesn't tell you how many real ones there are.
- **"Orchard has its own address format."** It doesn't. Orchard receivers only appear inside unified addresses.
- **"No trusted setup means no bugs."** Halo 2 removes the ceremony, but a proof is only as sound as the circuit behind it. The 2026 vulnerability was in the implementation of the Orchard circuit.
- **"Paying my old unified address puts funds into the closed pool."** A current wallet sends a payment for an Orchard receiver into the Ironwood pool.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Action | One spend and one output handled as a single unit; either side can be a dummy |
| Bundle | All the Orchard actions in a transaction, with one proof and one binding signature |
| Dummy note | A zero-value note that fills half of an action so the real shape of the transaction stays hidden |
| Nullifier | A unique tag published when a note is spent, so the same note can't be spent twice |
| Anchor | A root of the note commitment tree that a bundle's proof refers to |
| Pallas and Vesta | The pair of curves behind Orchard: Pallas for keys and notes, Vesta for proofs |
| Sinsemilla | A hash function that is cheap to compute inside Halo 2 circuits |
| Spend-only | A pool that funds can leave but cannot enter |

## FAQ

Can people still pay my unified address? Yes. Receivers belong to the Orchard protocol, so a wallet that supports NU6.3 sends a payment for your Orchard receiver into the Ironwood pool, and your wallet finds it with the same incoming viewing key. Keep your wallet up to date.

Is privacy affected when funds leave Orchard? Every move out of Orchard shows its amount on chain, wherever the funds go. That public amount is what the turnstile counts. Wallets that follow [ZIP 318](https://zips.z.cash/zip-0318) split a migration into notes of fixed denominations and send them across in separate transactions over time, which makes a whole balance harder to spot. The sender and the recipient stay hidden. See [The turnstile](../zcash-tech/the-turnstile) and [Viewing Keys](../zcash-tech/viewing-keys).

Why doesn't Orchard need a trusted setup? Groth16, which Sapling uses, needs a structured reference string: a set of parameters with a hidden secret inside, which a ceremony has to destroy. Halo 2 doesn't use one, so there is no such secret.

Is Orchard the same thing as Halo 2? No. Orchard is the shielded protocol: notes, keys, addresses and the rules for spending them. Halo 2 is the proving system Orchard uses to show that a transaction follows those rules.

Did Orchard replace Sapling? Not completely. Sapling is a separate pool that still works and still accepts funds. ZIP 224 asked wallets to move their users' funds into Orchard; since NU6.3 that role belongs to Ironwood.

## Test your understanding

A block explorer shows a transaction whose Orchard bundle has four actions. Did the sender pay four people?

<details>
<summary>Answer</summary>

Not necessarily. Each action pairs one possibly-dummy spend with one possibly-dummy output, and wallets pad bundles with dummy notes. Four actions could be a single payment plus change, with the rest as padding. One Halo 2 proof covers all four actions, and the amounts and recipients stay encrypted.
</details>

### Resources

- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 225: Version 5 Transaction Format](https://zips.z.cash/zip-0225)
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229), which defines "Orchard protocol", "Orchard pool" and "Ironwood pool"
- [ZIP 2006: Restricting Transfers into the Orchard Pool](https://zips.z.cash/zip-2006)
- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)
- [The Orchard Book (design notes)](https://zcash.github.io/orchard/)
- [The Halo 2 Book](https://zcash.github.io/halo2/)

### See also

- [Shielded Pools](../using-zcash/shielded-pools)
- [NU5](../zcash-tech/nu5)
- [Halo](../zcash-tech/halo)
- [Sapling](../zcash-tech/sapling)
- [NU6.2](../zcash-tech/nu6-2)
- [Ironwood](../zcash-tech/ironwood)
- [The turnstile](../zcash-tech/the-turnstile)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [Visualizing Zcash Addresses](../guides/visualizing-zcash-addresses)

---

## Related Pages

- [Sapling](./Sapling.md) — the shielded protocol Orchard was modelled on
- [NU5](./NU5.md) — the upgrade that activated Orchard
- [Halo](./Halo.md) — the proving system behind Orchard proofs
- [Ironwood](./Ironwood.md) — the pool that now runs the Orchard protocol
- [Detecting Shielded Payments](./Detecting_Shielded_Payments.md) — trial decryption and diversified addresses in practice

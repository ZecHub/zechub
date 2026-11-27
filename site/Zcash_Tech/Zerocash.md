<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zerocash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zerocash

> Zerocash is the 2014 research protocol that Zcash grew out of. Zcash launched in 2016 as an implementation of it, with security fixes made before launch, and every shielded pool since still follows its basic design: notes, note commitments and nullifiers, checked by zero-knowledge proofs.

What you'll take away: what Zerocoin and Zerocash were, how a Zerocash payment hides who paid whom and how much, why the original design needed a one-time setup, what Zcash changed before launch (including three problems found in 2016), and which parts of Zerocash still run in Zcash today.

Zerocash was published in 2014 by Eli Ben-Sasson, Alessandro Chiesa, Christina Garman, Matthew Green, Ian Miers, Eran Tromer and Madars Virza, and presented at the IEEE Symposium on Security and Privacy. It describes a decentralized anonymous payment (DAP) scheme: private payments on top of a Bitcoin-style ledger, where a transaction hides the payment's origin, destination and amount, and a zk-SNARK proves that the transaction follows the rules. The project then set out to develop the protocol into a full currency, Zcash. The [Zcash protocol specification](https://zips.z.cash/protocol/protocol.pdf) still opens by calling Zcash "an implementation of the Decentralized Anonymous Payment scheme Zerocash, with security fixes and improvements to performance and functionality."

Why this matters. Zerocash explains why Zcash works the way it does: why there is a tree of note commitments, why spending reveals a nullifier, why the first shielded pool needed a trusted setup, and why Zcash has had several shielded pools. It also shows a habit that started before launch: the team looked for flaws in the academic design and published the ones it found.

## TL;DR

- **Zerocoin (2013)** hid where a coin came from, but used fixed denominations and showed amounts. Its spend proofs were over 45 kB and took about 450 ms to verify.
- **Zerocash (2014)** used zk-SNARKs to hide the sender, the recipient and the amount, with payments of any size straight to an address. Its transactions were under 1 kB and took under 6 ms to verify.
- **How it works:** each note sits on the ledger only as a commitment in a Merkle tree. Spending reveals the note's serial number, which Zcash calls a nullifier, plus a proof that the note exists and the values balance. New notes are encrypted to their recipients on the ledger itself.
- **One-time setup:** Zerocash's zk-SNARK needed public parameters generated once. A corrupted setup would break soundness, so it could allow counterfeiting, but not anonymity.
- **Fixed before launch:** Zcash merged the paper's `Mint` and `Pour` operations into JoinSplit transfers, added a 512-byte memo, changed the note encryption, and fixed three problems found in 2016: the Faerie Gold attack, the InternalH collision and a gap in a security proof.
- **Today:** [Sprout](./Sprout.md), Zcash's Zerocash-based pool, has been frozen since [NU7](./NU7.md). [Sapling](./Sapling.md), Orchard and [Ironwood](./Ironwood.md) keep the same notes-and-nullifiers model with new circuits and proving systems.

## Visual analogy

The Zerocoin paper explains its idea with a shared bulletin board, and the picture works for Zerocash too. Each payment pins a sealed envelope to a public board: everyone can see that an envelope was added, but not what is inside or who it is for. To spend one, you show a ticket stub that only that envelope's owner could produce, plus a proof that "one of the envelopes on this board is mine, and the amounts add up", without pointing at which one. Everyone checks that the stub has never been used before. The money goes into new sealed envelopes for the people you pay, and a locked note pinned next to each tells its owner how to open it.

## From Zerocoin to Zerocash

**Zerocoin**, by Ian Miers, Christina Garman, Matthew Green and Aviel D. Rubin ([IEEE S&P 2013](https://www.ieee-security.org/TC/SP2013/papers/4977a397.pdf)), extended Bitcoin so that users could turn bitcoins into anonymous coins and back. A coin was a commitment to a secret serial number. To spend it, the owner revealed the serial number and proved, in zero knowledge, that the coin was somewhere in the public list of valid coins, using an RSA-based accumulator to keep that proof from growing with the list. The Zerocash paper sums up its limits:

- It was "a decentralized mix": people would wash their bitcoins through it now and then, and pay with ordinary bitcoins day to day.
- Coins had a fixed denomination, so it could not pay exact amounts or make change.
- There was no way to pay another user directly in anonymous coins.
- It hid where a payment came from, but not the amount.
- Spend proofs were larger than 45 kB and took 450 ms to verify.

**Zerocash** ([IEEE S&P 2014](http://zerocash-project.org/paper), [extended version](https://eprint.iacr.org/2014/349)) replaced those proofs with zk-SNARKs. Compared with Zerocoin, the authors reported spend transactions 97.7% smaller and verification 98.6% faster, along with payments of any amount, hidden amounts, and payments to a recipient's fixed address without the recipient having to take part. They tested it on a network of 1,000 nodes.

The ideas go back further. The Zcash specification credits Tomas Sander and Amnon Ta-Shma, whose 1999 paper "Auditable, Anonymous Electronic Cash" first used zero-knowledge proofs, Merkle trees of commitments and serial numbers in private digital money, and says that "to a large extent Zcash is a refinement" of it.

## How a Zerocash payment works

The paper builds its scheme in steps. In plain terms:

1. **Coins are commitments.** A coin, called a note in Zcash, records an owner's address key, a value and a secret value called ρ. Only a commitment to the note is published. It hides the owner, and when value moves from note to note, the amounts stay hidden too.
2. **All commitments go into one tree.** The commitments are leaves of a Merkle tree, and proofs refer to its root rather than to the whole list. The paper used a tree 64 levels deep.
3. **Spending reveals a serial number.** The owner computes the note's serial number from their secret key and ρ, publishes it, and attaches a zk-SNARK proving that the note is in the tree, that they hold its key, that the serial number is correct and that the values add up. Nodes reject any serial number they have seen before, which stops double spending. Zcash calls the serial number a nullifier.
4. **`Pour` moves value.** A `Pour` consumes notes and creates new ones of the same total value, two in and two out in the paper's main construction. It can also send part of the value to a public output, back to the base currency such as bitcoin. A separate `Mint` operation turned base-currency coins into notes, and the minted value was public.
5. **The ledger delivers the notes.** The secrets of each new note are encrypted to the recipient's key and published with the transaction. Recipients find their payments by scanning the ledger with their decryption key.
6. **Transactions can't be altered.** A one-time signature, tied to the spender's keys inside the proof, stops anyone from changing a transaction in flight, for example to redirect its public output.

The protocol specification keeps the old words in a footnote: in Zerocash, notes were called "coins" and nullifiers were called "serial numbers".

## The one-time setup

The zk-SNARKs Zerocash used needed public parameters made once, in advance. The paper is specific about what that trust covers: a corrupted setup would undermine the balance and non-malleability properties, so it could let someone create money, but "even if a powerful espionage agency were to corrupt the setup, anonymity will still be maintained." The authors suggested running the setup as a multi-party computation to reduce the trust needed. Zcash did that for its first pool in the 2016 Ceremony (see [Sprout](./Sprout.md)) and again for [Sapling](./Sapling.md). Orchard, added in NU5, uses [Halo](./Halo.md) 2, which needs no trusted setup.

## What Zcash changed before launch

Section 8 of the protocol specification lists how Zcash differs from the paper. The main changes, as they stood when Zcash launched with Sprout:

| Area | Zerocash paper | Zcash at launch (Sprout) |
|---|---|---|
| Where shielded operations live | `Mint` and `Pour` are new transaction types | Normal Bitcoin-style transactions carry JoinSplit transfers, so transparent and shielded value can move in one transaction |
| `Mint` and `Pour` | Separate operations, and only `Pour` has a proof | One JoinSplit transfer: a `Pour` that can also take transparent value, so no separate `Mint` is needed |
| Memo | None | A 512-byte memo field for each output note |
| Encrypting notes to recipients | ECIES, with the curve and options left open | Key agreement on Curve25519 plus the ChaCha20-Poly1305 cipher |
| Note commitment | Two nested commitments, with an inner hash cut to 128 bits | A single SHA-256 commitment |
| Where ρ comes from | Picked at random by the sender | Derived from a value tied to the transaction's own nullifiers |
| Commitment tree depth | 64 levels | 29 levels |
| Proof size | 288 bytes | 296 bytes, using standard point encodings |

### Three problems found in 2016

In April 2016, months before launch, the Zcash team [published](https://zodl.com/fixing-zcash-vulns/) three security problems it had found in the design while writing the specification:

- **Faerie Gold**, found by Zooko Wilcox and Brian Warner. Nothing forced a sender to choose a fresh ρ, so they could send several notes with the same ρ. All of them would look valid to the recipient, but only one could ever be spent, because they would share a nullifier. The name comes from legends of fairy gold that turns into leaves. Zcash fixed it by deriving each new note's ρ from a value that depends on the nullifiers the transaction spends, which are unique on any valid chain.
- **The InternalH collision**, found by Taylor Hornby. The paper's note commitment hashed the owner's key and ρ and cut the result to 128 bits, which made the commitment non-binding: with about 2^64 operations, an attacker could build a note that opens two ways and spend it twice. The team wrote that, had Zcash launched with it, the flaw "could have been exploited to counterfeit currency." Zcash replaced it with a single SHA-256 commitment. That gave up statistical hiding for Sprout notes, so the paper's "everlasting anonymity" does not apply to Sprout.
- **A gap in the security proof**, found by Daira-Emma Hopwood. The proof of the balance property needed one of the pseudorandom functions to be collision-resistant, which the paper did not require. It was not exploitable, because the function actually used is collision-resistant, and the proof can be repaired.

The specification also documents other details the paper's proofs did not account for, such as values cut to 254 and 253 bits, and explains how Zcash avoided them.

## What still runs in Zcash today

- **Sprout** was Zcash's implementation of Zerocash, from the genesis block on October 28, 2016. Since NU7 made version 4 transactions invalid on November 6, 2026, Sprout funds can no longer be spent. See [Recovering Funds](/using-zcash/recovering-funds).
- **Sapling** (2018) replaced JoinSplits with separate Spend and Output transfers whose values are checked with commitments outside the proof, and moved to Groth16 proofs. Its note commitments are statistically hiding again, so the specification says "everlasting anonymity" is supported for Sapling and Orchard notes under the same conditions as in Zerocash ("by the protocol, not necessarily by zcashd").
- **Orchard** (NU5, 2022) uses Action transfers, each with up to one input and one output, proved with Halo 2.
- **Ironwood** (2026) uses the same shielded protocol as Orchard, with the corrected circuit, and Orchard has been spend-only since it activated.
- **The constant:** in every one of these pools, value lives in notes, the ledger stores their commitments, spending reveals nullifiers, and a zero-knowledge proof shows the rules were followed.

Zerocoin went its own way: the coin now called Firo was built on it before moving to newer protocols. The [Lelantus](/zero-to-zero-knowledge/lelantus) page covers that branch.

## Common mistakes

- **"Zerocash and Zerocoin are the same thing."** No. Zerocoin (2013) only hid where a coin came from, with fixed denominations. Zerocash (2014) hid the sender, the recipient and the amount.
- **"Zerocash is a cryptocurrency."** It is a protocol, described in a paper. Zcash is the currency that implemented it.
- **"Zcash runs the paper exactly as written."** No. Zcash changed the transaction structure, the encryption and the note commitment, and fixed several problems before launch.
- **"The trusted setup could reveal who paid whom."** Not in this design. The paper shows that a corrupted setup threatens the money supply, not privacy.
- **"My ZEC is protected by Zerocash."** Not anymore. Sprout, the Zerocash-based pool, is frozen. Spendable shielded ZEC today sits in Sapling, Orchard or Ironwood.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Zerocoin | A 2013 protocol that hid where a fixed-value coin came from, but not amounts |
| Zerocash | The 2014 protocol that hid sender, recipient and amount using zk-SNARKs; Zcash's starting point |
| Decentralized anonymous payment (DAP) scheme | Zerocash's name for private payments on a public ledger with no trusted bank |
| zk-SNARK | A short zero-knowledge proof that anyone can check quickly |
| Note | A private record of value and its owner; Zerocash called it a coin |
| Note commitment | The public fingerprint of a note, stored in the commitment tree |
| Nullifier | The value revealed when a note is spent, so it can't be spent twice; Zerocash called it a serial number |
| `Mint` and `Pour` | Zerocash's operations to create notes from public coins and to move value between notes |
| JoinSplit | Zcash's version of `Pour`, used in the Sprout pool |
| Trusted setup | A one-time ceremony that creates the public parameters some zk-SNARKs need |
| Faerie Gold attack | Sending notes that look spendable but share a nullifier, so only one can be spent |
| Everlasting anonymity | Zerocash's term for statistical anonymity: privacy that doesn't rely on any problem staying hard to compute |

## FAQ

**Who invented Zerocash?** The seven authors of the 2014 paper, named at the top of this page. The protocol specification credits them as the inventors of Zerocash and lists them among the designers of the Zcash protocol.

**Did Zcash launch with the problems found in 2016?** No. They were fixed and published in April 2016, before the October 2016 launch.

**Is the 2014 paper still worth reading?** Yes, for the ideas. For how Zcash actually works, read the protocol specification, which also lists every difference from the paper.

**Can I still use Sprout?** No. Since NU7, Sprout funds can't be moved. See [Recovering Funds](/using-zcash/recovering-funds).

**Does Zcash still need a trusted setup?** Orchard and Ironwood use Halo 2, which doesn't. Sapling still relies on the parameters from its multi-party ceremony.

## Test your understanding

1. What could Zerocash hide that Zerocoin could not?
2. Why does spending a note reveal a nullifier?
3. What could a corrupted Zerocash setup do, and what could it not do?
4. How did Zcash stop the Faerie Gold attack?

Answers: (1) the payment's destination and amount, as well as its origin, with payments of any size; (2) so nodes can reject a second spend of the same note without learning which note was spent; (3) it could break the balance property and allow counterfeiting, but not reveal who paid whom; (4) by deriving each new note's ρ from a value tied to the transaction's own nullifiers, which are unique on a valid chain.

### Resources

[Zerocoin: Anonymous Distributed E-Cash from Bitcoin (IEEE S&P 2013)](https://www.ieee-security.org/TC/SP2013/papers/4977a397.pdf)

[Zerocash: Decentralized Anonymous Payments from Bitcoin (IEEE S&P 2014)](http://zerocash-project.org/paper), [extended version](https://eprint.iacr.org/2014/349)

[The Zerocash project's website](http://zerocash-project.org/)

[Zcash Protocol Specification, section 8: Differences from the Zerocash paper](https://zips.z.cash/protocol/protocol.pdf)

[Fixing Vulnerabilities in the Zcash Protocol (April 2016)](https://zodl.com/fixing-zcash-vulns/)

## Related Pages

| Page | Why it is related |
|---|---|
| [Sprout](./Sprout.md) | Zcash's first shielded pool, built on Zerocash, and the 2016 Ceremony |
| [Sapling](./Sapling.md) | the pool that replaced JoinSplits with Spend and Output transfers |
| [Halo](./Halo.md) | the proving system that removed the trusted setup |
| [ZKP & zk-SNARKs](./zk_SNARKS.md) | how zero-knowledge proofs work |
| [Ironwood](./Ironwood.md) | the newest pool, using Orchard's protocol |
| [Lelantus](/zero-to-zero-knowledge/lelantus) | where Zerocoin went: Firo and its later protocols |
| [Shielded Pools](/using-zcash/shielded-pools) | the pools you can use today |

---

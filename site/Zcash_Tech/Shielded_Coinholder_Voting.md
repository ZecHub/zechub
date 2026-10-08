<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Shielded Coinholder Voting

> In August 2026, Zcash ran a coinholder poll in which ballots stayed encrypted and only the final totals were revealed, using a shielded voting protocol built by Valar Group.

What you'll take away: how a vote can be weighted by how much ZEC you hold, kept private, and still counted correctly, all without anyone learning how you voted or how much you own.

Shielded coinholder voting lets Zcash holders vote on ecosystem questions using their shielded ZEC. Nobody learns what any individual voted or how much ZEC they hold, yet anyone can audit that the totals are correct. It runs on a dedicated voting chain built by Valar Group, separate from Zcash mainnet, so your real funds never move. For how Zcash makes decisions more broadly, see the [Zcash Funding and Governance overview](../zcash-community/zcash-governance). This page is only about the cryptographic voting protocol.

New to Zcash? Start with [What is ZEC and Zcash](../start-here/what-is-zec-and-zcash), [Shielded Pools](../using-zcash/shielded-pools), and [zk-SNARKs](../zcash-tech/zk-snarks), then come back here.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Why private voting is hard

A good coinholder vote wants four things at once, and the obvious ways to get them fight each other.

1. Weight by stake, so holding more ZEC carries more weight.
2. Privacy of choice, so no one learns how you voted.
3. Privacy of balance, so no one learns how much ZEC you hold.
4. A correct, auditable count that anyone can check.

To weight by stake you seem to need everyone's balance. To count ballots you seem to need to open them. Doing either the naive way leaks exactly the private information a [shielded pool](../using-zcash/shielded-pools) exists to protect, and earlier coin votes did leak balance information for this reason. Shielded voting resolves the tension with the same tools that power shielded payments: [zero-knowledge proofs](../zcash-tech/zk-snarks), nullifiers, and encryption.

## The intuition: a ballot box that counts itself

> A turnstile lets you count what passes through a bank vault without seeing inside. A shielded ballot box goes one step further: it adds up sealed votes without ever opening them.

Picture a ballot box with three unusual powers. It can add a sealed envelope to a running total without opening it. A group of officials, no single one holding the key, later reveal only the final totals. And before you may drop an envelope in, you quietly prove you held ZEC at a fixed past moment and have not already voted, without showing which coins are yours. Everything below is how that box is actually built.

## Eligibility and the snapshot

A voting round fixes a snapshot height, a single Zcash mainnet block, and your weight is your spendable shielded balance in the [Ironwood](../zcash-tech/ironwood) pool at that block. The rule is simply one Ironwood ZEC at the snapshot equals one vote. For the NU7 scope poll the snapshot was mainnet block 3,459,350, around August 24, 2026 at 19:00 UTC, with voting open until September 14, 2026 at 19:00 UTC. Transparent ZEC is handled separately by the older method, not by this protocol.

1. Your funds never move and are never locked. Eligibility is fixed at the snapshot, so you can spend or move ZEC immediately after without affecting your vote.
2. There is no registration step. A snapshot height is all that is needed, which keeps the process light and avoids revealing who intends to vote.

## Proving your balance without revealing it

When you vote, your wallet produces a zero-knowledge proof that at the snapshot you controlled some unspent shielded ZEC. It establishes a valid balance and its size to the private counting machinery, but reveals no notes and produces no transaction on Zcash mainnet.

That proof mints a voting credit on the voting chain equal to your snapshot balance, owned by a fresh voting key your wallet generates just for this round. Because the key is new and unconnected to your Zcash addresses, nothing on the voting chain can be traced back to your real notes. Your on-chain identity and your ballot are unlinkable by construction.

## Preventing double-voting, privately

To stop anyone voting twice with the same coins, the system must confirm the notes behind your balance were unspent at the snapshot. On mainnet this is done by revealing a note's nullifier, its unique spent-marker, which full nodes check for reuse. But revealing your nullifier here would link your ballot straight back to your notes.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

So the protocol proves the opposite privately. It builds a list of every nullifier already used as of the snapshot, and your wallet proves in zero knowledge that your note's nullifier is not in that list, showing the note was unspent without revealing which note it is.

One problem remains. Fetching the needed slice of that list from a server would reveal your nullifier to the server, and the full list is large, roughly 2 GB for Orchard-era data and far larger as Zcash grows. [Private Information Retrieval](../zcash-tech/private-information-retrieval) (PIR) solves both: your wallet fetches exactly the data it needs while cryptographically hiding which data it asked for. The result is checked against a published summary of the nullifier list, so a dishonest server cannot forge a fake result.

## Casting an encrypted ballot

For each question, your wallet does three things.

1. It encrypts your vote weight to the counting committee using homomorphic encryption, a kind of encryption whose ciphertexts can be added together without being decrypted. This is what lets the box total votes it cannot read.
2. It splits your vote into 16 separate shares, so that even a fully colluding committee would struggle to reassemble how much any one person voted with.
3. It submits those shares at randomized times through multiple servers, so an observer cannot tell the shares belong to the same voter by when they arrive.

Each share carries its own zero-knowledge proof that it is a legitimate piece of a valid ballot, so no one can add unbacked votes. Verified shares are homomorphically added to the encrypted running total for your chosen answer.

## Counting without opening any ballot

The count is run by a distributed election authority: at least 10 voting-chain validators, no single one of whom can decrypt anything. At the start of a round they jointly run a key-generation ceremony that produces an encryption key whose matching decryption key is split across all of them and never assembled in one place.

> No single official holds the key. The box only opens when two-thirds of them turn their keys together, and even then it reveals only the totals.

When the round closes, the encrypted totals already exist from the homomorphic addition above. Each validator publishes a partial decryption plus a proof it decrypted correctly. Once at least two-thirds have contributed, their parts combine into the final cleartext tally for each question, and nothing else is ever decrypted. Any full node can then check the combined correctness proof, so the public can verify the count without trusting the validators.

## Who runs it, and what they cannot do

The design separates two roles so no group has too much power.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

The coordinator multisig is a 2-of-5 group with representatives from Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), and Valar Group. It decides which questions reach the chain and attests to each round's encryption key, but it cannot see, alter, or block individual votes. Anyone who dislikes the questions can run their own voting chain, since the software is open and permissionless.

The validators are the at-least-10 nodes that hold the split decryption key and perform the threshold decryption. They cannot decrypt individual ballots or fabricate a false tally, because every decryption ships with a public correctness proof.

## What the quorum is for

Organizers set a participation threshold: the poll's results are treated as representative of coinholders only if at least 1,000,000 ZEC takes part in at least one question, abstentions included. The quorum decides no question and is not applied per question. It is a single check on the whole poll, so a result is taken seriously only when a substantial amount of ZEC shows up. Below that level, the outcome is not considered a meaningful signal.

## What this protocol does not protect against

Being clear about the edges is part of understanding the design.

1. It is a signal, not a binding decision. A coinholder poll measures sentiment weighted by stake and feeds into Zcash's normal [governance process](../zcash-community/zcash-governance) rather than replacing it.
2. It is coin-weighted, so influence follows holdings. Lower friction may raise turnout but does not change the concentration of ZEC.
3. The agenda is set by the coordinator multisig, which chooses which questions appear. It cannot touch votes, and anyone can run a competing chain, but agenda-setting is still a point of influence.
4. Counting needs validators online. Producing the tally requires at least two-thirds of them to cooperate, so a large outage or coordinated refusal could delay a result.
5. Balance privacy under full collusion is defense in depth, not a theorem. If the whole committee secretly reconstructed the key, the share-splitting and timed submission are what protect your balance, and the designers acknowledge these are weaker under collusion. Sophisticated traffic analysis is a residual risk.
6. More moving parts than the older design. PIR servers, submission servers, a fresh voting key, and multi-stage proofs are each a place where bugs or misconfiguration could appear. The system is open source and parts have been independently audited, which manages that risk rather than removing it.

What it does protect, strongly and verifiably, are the two things that matter most: your ballot cannot be linked to your identity, and only the final totals are ever revealed.

## Glossary

| Term | Plain-English meaning |
|---|---|
| Voting chain | A separate blockchain, built by Valar Group, that runs the vote; your Zcash notes never move onto it |
| Snapshot height | The mainnet block whose balances set voting weight (block 3,459,350 for the NU7 poll) |
| Nullifier | A note's unique spent-marker; revealing it would link a ballot to a note, so voting proves non-membership instead |
| Private Information Retrieval (PIR) | Fetching data from a server while hiding which data you requested |
| Homomorphic encryption | Encryption whose ciphertexts can be added together without being decrypted |
| Coordinator multisig | The 2-of-5 group that authorizes questions and the round key, but cannot see or change votes |
| Election authority | The 10 or more validators that jointly hold the split decryption key and reveal only the final tally |
| Threshold decryption | Recovering a result only when enough key-share holders, here two-thirds, cooperate |
| Quorum | The 1,000,000 ZEC minimum participation for the poll to be considered representative |

## FAQ

Do my coins move or get locked when I vote? No. Eligibility is measured at the snapshot block, so your ZEC stays put and spendable. Voting produces proofs on a separate chain, not a Zcash transaction.

Can anyone tell how I voted or how much I hold? No. Ballots are encrypted and only aggregate totals are decrypted. Your vote is unlinkable to your identity, and your balance is split into 16 timed shares to protect it even against a colluding committee.

What stops someone voting twice, or voting with coins they do not have? Each ballot carries zero-knowledge proofs that it is backed by a real, unspent snapshot balance, and a PIR-based non-membership proof shows the underlying note was not already spent, without revealing which note it is.

Who counts the votes? A distributed set of at least 10 validators, none of whom can decrypt anything alone. Two-thirds must cooperate to reveal the totals, and every decryption comes with a public correctness proof.

Is the result binding? It is a coinholder sentiment signal weighted by stake. It informs Zcash's normal governance rather than automatically enacting a change.

Can I run or audit this myself? Yes. The voting-chain software, the circuits, the PIR system, and a tally auditor are all published by Valar Group for anyone to inspect and run.

## Test your understanding

If every ballot is encrypted and every voter is anonymous, how can anyone be sure the published totals are correct and that nobody voted twice?

<details>
<summary>Answer</summary>

Three proofs do the work. Each ballot carries a zero-knowledge proof that it is backed by a real snapshot balance, so no unbacked votes are counted. A PIR-based non-membership proof shows the note behind it was unspent, preventing double-voting without revealing the note. And when validators decrypt the totals, each publishes a correctness proof, so any full node can confirm the final numbers were decrypted honestly from the encrypted ballots.
</details>

## Resources

- [NU7 Coinholder Vote announcement (Valar Group and Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - the forum post scoping the poll, snapshot height, and schedule
- [The Coinholder Voting Chain: technical design](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - the protocol write-up this page is based on
- [Valar Group shielded voting documentation](https://valargroup.gitbook.io/shielded-vote-docs) - the maintained reference for the voting chain
- [Valar Group voting code and audits (GitHub)](https://github.com/valargroup/vote-sdk) - the open-source implementation and its audits

## Related pages

- [Private Information Retrieval](../zcash-tech/private-information-retrieval) - the non-membership proof technique behind private double-vote prevention
- [Ironwood](../zcash-tech/ironwood) - the shielded pool whose balances set vote weight
- [zk-SNARKs](../zcash-tech/zk-snarks) - the proof system behind the balance and eligibility proofs
- [Shielded Pools](../using-zcash/shielded-pools) - what a shielded balance is and why it stays hidden
- [Zcash Funding and Governance overview](../zcash-community/zcash-governance) - how this sentiment signal feeds into Zcash's broader decision process
- [Shielded Labs](../zcash-organizations/shielded-labs) - one of the five members of the coordinator multisig

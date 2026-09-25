<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Shielded Coinholder Voting

> Shielded coinholder voting is live. It was used for the NU7 scope vote, which ran from August 25 to September 14, 2026 on a dedicated voting chain built by Valar Group.

What you'll take away: how a vote can be counted while every ballot stays encrypted, how your shielded balance becomes vote weight without being revealed, who decrypts the totals (and why no single party can), what the 1,000,000 ZEC participation quorum means, and what the system does not protect you against.

---

## 1. Why should you care?

A vote about the future of Zcash asks three things of every participant. Prove you hold ZEC, so your vote has weight. Keep your choice secret, so nobody can pressure, profile, or target you. And produce totals everyone can trust, so the result means something.

Ordinary voting systems force you to pick two. Public coin voting, the kind most crypto projects use, gives you eligibility and trustworthy totals but publishes your balance and your choice next to your address. A private ballot run by a single operator hides your choice but asks you to trust that operator with everything.

Shielded coinholder voting is the first Zcash governance system designed to deliver all three at once. Your eligibility comes from a zero-knowledge proof about your shielded balance. Your ballot is encrypted before it leaves your wallet and is never individually decrypted. The totals are produced by a group of independent validators who can only decrypt the final sums together, and anyone can check their work. You can participate in Zcash's biggest decisions without giving up the privacy that brought you to Zcash.

---

## 2. The setting: a small chain that exists only for voting

The system runs on a **dedicated voting chain**, a purpose-built blockchain that sits next to Zcash mainnet and records only voting data. Your ZEC never moves to this chain. It stays in your wallet, under your keys, on mainnet the whole time.

Two groups run the process, with deliberately limited power:

- **A coordinator multisig** decides which questions go on the ballot. It is configured with five organizations: Project Tachyon, Valar Group, the Zcash Foundation, Zodl, and Shielded Labs. A vote opens when at least two of them call for it. Ratifying a round writes the questions, the end date, and the snapshot height to the voting chain. This is the only stage where the coordinator exercises judgment over content.
- **An election authority** of at least ten validator nodes runs the chain and holds the decryption keys, split into shares so that no single validator can decrypt anything alone.

Everything about the chain is open. The code, the circuits, and the validator setup are public, anyone can run a validator or stand up their own voting chain, and published tallies can be audited by anyone. Wallets can read voting rounds from any chain they are configured to follow, so no one group owns the idea of a coinholder poll.

---

## 3. Step one: the snapshot fixes who may vote

Every voting round names a **snapshot height**, a Zcash mainnet block. For the NU7 vote that block was 3,459,350, reached around August 24, 2026.

The rule is simple: **1 ZEC held as spendable, shielded funds in the Ironwood pool at the snapshot block equals 1 vote**. ZEC in any other pool, or arriving after the snapshot, does not count for that round.

Because eligibility is measured at one fixed block, your funds are never locked. The moment the snapshot passes you are free to move, spend, or reshield your ZEC. Your voting weight for the round is already fixed by what you held at that height.

---

## 4. Step two: proving your balance without revealing it

Here is the first hard problem. To vote with weight, you must prove "I controlled this much unspent shielded ZEC at the snapshot." But the whole point of a shielded pool is that nobody, including the people running the vote, can see your notes, your balance, or your addresses. How do you prove a fact about data you refuse to show?

The wallet solves it with two cryptographic tools, run locally on your device:

- **A balance proof.** Your wallet produces a zero-knowledge proof that you own unspent notes at the snapshot height and that their values add up to your claimed voting weight. The proof convinces the voting chain that the claim is true without revealing the notes, the addresses, or even the amount itself as public data.
- **A private unspent check.** Proving you own notes is not enough; the system must also know they were unspent at the snapshot, which means checking that their nullifiers (each note's unique spend marker) are absent from the global nullifier set. That set holds tens of millions of entries, far too much for a phone to download, and asking a server "is my nullifier in your list?" would hand the server your nullifier. So the wallet uses **Private Information Retrieval (PIR)**: a technique that lets you fetch an answer from a database without the database learning what you asked. Think of phoning a library to check whether a book is on the shelf, in a way that leaves the librarian unable to tell which book you cared about. The PIR scheme used here has been audited by Zellic.

Once both proofs check out, the voting chain records a **Vote Authority Note (VAN)**: a commitment that binds your proven voting weight to a fresh **governance hotkey** your wallet generated for the occasion. From this point on, only the hotkey acts on the voting chain. Your Orchard or Ironwood spend key is used once, during this delegation step, and then stays out of the process entirely. The link between your real notes and your VAN exists only inside the zero-knowledge proof, which means your voting activity is unlinkable to your wallet's history.

![How a shielded balance becomes a private ballot: the snapshot fixes eligibility, a balance proof plus a PIR unspent check create a Vote Authority Note, the vote is split into sixteen encrypted shares delivered through independent submission servers, and the validators can only ever decrypt the combined totals](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/shielded-voting-flow.png)

---

## 5. Step three: a ballot that can be added up but never opened

When you cast a vote, your wallet encrypts your choice inside a **vote commitment**. The encryption used is **homomorphic**, which has a remarkable property: encrypted values can be added together while they are still encrypted. Picture every voter dropping a sealed, opaque ballot box onto a scale. Nobody can open any box, but the scale can still tell you the combined weight of all of them. The voting chain accumulates every voter's encrypted amount into an encrypted running total per answer choice, and at no point does any individual ballot need to be opened.

There is still a subtle leak to close. If your entire balance went on chain as one encrypted amount, patterns in timing or size could hint at who you are. So the wallet pseudo-randomly **splits your vote into sixteen encrypted shares**. Each share travels separately, at a randomized time, through one or more independent **submission servers**, which attach a proof that the share comes from a valid vote commitment and pass it to the chain. Because the shares arrive scattered across time and servers, no observer can reassemble "these sixteen shares were one voter" from the outside, and no single server sees enough to learn your total.

Each vote consumes your current VAN and issues a fresh one, so your remaining weight is ready for the next question on the ballot without any link between your answers.

---

## 6. Step four: totals that no one can decrypt alone

When the round closes, someone must decrypt the final totals. The design makes sure "someone" is never one party.

At the start of each round, the validators run a **distributed key generation** ceremony that produces a fresh decryption key for that round, split into shares. No validator ever possesses the whole key. To finish the count, at least **two thirds of the validators** must each publish a **partial decryption** of the accumulated totals, together with a proof that their partial decryption is correct. Combined, those partial decryptions reveal exactly one thing: the final tally per question and answer. The correctness proofs are combined as well, and every full node can verify the result. Individual ballots are never decrypted at all.

The only cleartext the system ever produces is the answer to "what did coinholders decide, in aggregate." Anyone can audit a published tally independently with the public tooling at [tally.valargroup.org](https://tally.valargroup.org).

![Who can see what in shielded coinholder voting: the voter sees everything, the wallet service can see a network address but not the vote, validators see only encrypted shares, and the public sees only the final totals](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/shielded-voting-visibility.png)

---

## 7. What the 1,000,000 ZEC quorum is for

For the NU7 vote, the organizers stated that they would consider the results **legitimate and representative of coinholders only if at least 1,000,000 ZEC participated in at least one question**.

The intuition is straightforward. A coin-weighted poll is a signal about what holders want, and a signal is only meaningful if enough holders showed up to send it. Without a participation floor, a question could technically "pass" on the votes of a tiny slice of the supply and still be presented as the will of coinholders. The quorum forces every claimed mandate to clear a fixed bar of economic participation before anyone treats it as representative.

The quorum is about participation, not approval. Each question still needs its own support among the votes cast; the floor only decides whether the round counts as a legitimate signal at all.

---

## 8. What the protocol does not protect against

Honest limits matter as much as guarantees. These come from the design documents and the voter FAQ, not from critics:

- **Your network connection.** Vote contents are private, but the wallet service or RPC provider you connect through can see your IP address, exactly as in ordinary wallet use. The official guidance is to use Tor, Nym, or a VPN if network-level privacy matters to you.
- **Your voting hotkey.** After delegation, the governance hotkey controls your vote. If that key (or the wallet that generated it) is compromised, an attacker can cast your vote. Your ZEC is never at risk from the hotkey, since it holds no spending power, but your ballot is.
- **Validator availability and collusion.** Producing a result requires at least two thirds of validators to publish correct partial decryptions. Outages or refusals can stall a tally, and the privacy of amounts ultimately rests on enough validators and submission servers not colluding to correlate shares.
- **Fixed operational parameters.** The sixteen-way share split and the validator thresholds are current design constants, chosen as tradeoffs between privacy and cost. They can be adjusted between rounds, but they are not guarantees tuned to every possible attacker.
- **The gap between holding and intending.** The protocol measures what you held at one block. It cannot tell borrowed ZEC from savings, or a long-term holder from someone who bought the day before the snapshot and sold the day after.
- **Binding force.** A coinholder vote is a signal that guides decisions, not an automatic protocol change. The NU7 poll settled scope questions alongside a concurrent Zcash Community Advisory Panel poll run by the Zcash Foundation, and the results feed the normal upgrade process rather than replacing it.
- **Audit coverage.** The PIR component has a public Zellic audit, and the vote chain replaces an earlier process that had its own public audit. As with any young cryptographic system, the full stack of circuits, key ceremonies, submission path, and wallet integrations continues to accumulate review.

---

## 9. The NU7 vote, as it happened

The first full use of the system was the NU7 scope vote:

- **Snapshot:** mainnet block 3,459,350 (around August 24, 2026). Spendable shielded ZEC in Ironwood at that block was eligible; funds could move immediately after.
- **Voting window:** August 25 to September 14, 2026, 19:00 UTC.
- **Questions:** how ZEC removed from circulation should return to future block rewards, when that reissuance should begin, when to disable old Sprout transactions, whether to shorten the block target spacing, and how to handle NU7 features not ready by the implementation deadline.
- **Wallets:** Vizor, Zodl, and Zkool supported voting, and Keystone hardware wallets worked through compatible wallets without funds leaving the device.
- **Running alongside:** the Zcash Foundation polled the Zcash Community Advisory Panel on the same questions over the same period, so the coinholder signal and the panel signal could be compared.

The same voting chain is designed to be reused. It is permissionless to configure a new round or stand up a new chain, and the retroactive grants program's coinholder polls are the natural next use.

---

## Glossary

- **Snapshot height** - the mainnet block that fixes eligibility. What you held there is your voting weight for the round.
- **Vote Authority Note (VAN)** - a private record on the voting chain that binds your proven weight to your voting hotkey. Each vote consumes one and issues a fresh one.
- **Governance hotkey** - a throwaway key your wallet creates for voting. It can cast ballots but can never spend your ZEC.
- **Balance proof** - a zero-knowledge proof that you owned unspent shielded notes of a given total value at the snapshot, revealing nothing about the notes themselves.
- **Nullifier** - a note's unique spend marker. A note is unspent if its nullifier has never appeared.
- **Private Information Retrieval (PIR)** - fetching an answer from a database without the database learning what you asked. Used to prove a nullifier is absent without revealing which nullifier you checked.
- **Homomorphic encryption** - encryption that allows values to be added while still encrypted, so totals can be computed without opening any ballot.
- **Share** - one of sixteen encrypted fragments of a single vote, submitted separately to protect amount privacy.
- **Submission server** - an independent helper that forwards your shares to the chain at randomized times, breaking timing links between them.
- **Election authority** - the validators of the voting chain, at least ten, who jointly hold each round's decryption key in shares.
- **Distributed key generation (DKG)** - the ceremony that creates a round's decryption key in pieces, so no validator ever holds the whole key.
- **Threshold decryption** - the rule that at least two thirds of validators must cooperate to produce the final tally, each publishing a provably correct partial decryption.
- **Coordinator multisig** - the group of ecosystem organizations that authorizes which questions go on the ballot.
- **Quorum** - the minimum participation (1,000,000 ZEC for the NU7 vote) required for the results to be treated as representative of coinholders.

---

## FAQ

**Can validators or anyone else see how much ZEC I voted with?**
No. Your amount stays encrypted the whole time, it is split into sixteen unlinkable shares, and only the combined totals per answer are ever decrypted.

**Do I have to lock or move my ZEC to vote?**
No. Eligibility is fixed at the snapshot block. Before the snapshot your ZEC must be spendable, shielded, and in the eligible pool; after the snapshot you can move it freely.

**My ZEC was in another pool at the snapshot. Can I still vote?**
Not in that round. Only ZEC held as spendable shielded funds in the eligible pool (Ironwood for the NU7 vote) at the snapshot counts. Future rounds announce their own snapshots, so there is always a next time.

**Can I vote from a hardware wallet?**
Yes. Keystone hardware wallets are supported through compatible voting wallets, and your funds stay under the Keystone's keys the whole time.

**Who decides what goes on the ballot?**
The coordinator multisig of ecosystem organizations ratifies each round's questions, end date, and snapshot. Its membership and threshold are parameters that can be adjusted between rounds based on community feedback.

**Can anyone run this system for a different poll?**
Yes. The chain, circuits, PIR server, and client libraries are open source, wallets can be configured to follow any voting chain, and anyone can run a validator, a self-hosted coordinator, or an independent audit of a published tally.

**Where can I verify a result myself?**
Published tallies can be audited through the public tooling at [tally.valargroup.org](https://tally.valargroup.org), and validator setup is documented at [setup.valargroup.org](https://setup.valargroup.org).

---

## Related pages

- [Zcash Funding & Governance Overview](/zcash-community/zcash-governance) - the broader governance landscape this voting system plugs into.
- [Coinholder-Directed Retroactive Grants](/zcash-organizations/coinholder-directed-retroactive-grants) - the grants program decided by coinholder polls.
- [Ironwood](/zcash-tech/ironwood) - the shielded pool whose balances were eligible in the NU7 vote.
- [Zakura Node](/zcash-tech/zakura-node) - the Valar Group and Project Tachyon full node, from the team that built the voting chain.
- [Private Information Retrieval](/zcash-tech/private-information-retrieval) - deeper background on the PIR technique used for unspent checks.
- [Valar Group](/zcash-organizations/valar-group) - the organization that designed and operates the voting chain.
- [zk-SNARKs](/zcash-tech/zk-snarks) - the proof family behind the balance and vote proofs.

## Additional resources

- [NU7 Coinholder Vote announcement](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - the official call for the NU7 vote: questions, dates, quorum, and audit links.
- [The Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - Valar Group's design post for the voting chain; the video companion covers the same ground.
- [Zakura voting FAQ](https://zakura.com/voting/) - the voter-facing FAQ: eligibility, wallets, hardware wallets, and privacy guidance.
- [ZCAP Poll Now Open: NU7](https://zfnd.org/zcap-poll-now-open-nu7/) - the Zcash Foundation's announcement of the concurrent advisory panel poll.
- [Valar Group shielded vote documentation](https://valargroup.gitbook.io/shielded-vote-docs/) - the wallet integration guide with the full protocol detail.
- [Vote chain tooling](https://setup.valargroup.org) and [tally auditing](https://tally.valargroup.org) - run a validator or verify a result yourself.

---

*Every factual claim on this page is drawn from the primary sources linked above: Valar Group's announcement, design post, and documentation, the Zakura voting FAQ, and the Zcash Foundation's poll announcement.*

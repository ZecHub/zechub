<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Project Tachyon

## TL;DR

- Tachyon is a proposed redesign of the way Zcash wallets find and spend shielded funds, meant to let the network grow to very large numbers of users
- Today a wallet has to try to decrypt a huge share of the blockchain to discover which payments are its own, and that is the main reason shielded syncing feels slow
- Tachyon replaces that with **oblivious synchronization**, so a wallet fetches what it needs without scanning everything and without telling a server which parts it wanted
- It also moves payment details out of the blockchain and into the payment request itself, which makes the protocol simpler but shifts responsibility onto wallets
- It is a proposal, first published in April 2025 and named as a candidate for NU7. It is **not shipped**, and it needs an engineering effort on the scale of the Sapling upgrade

<br/>

## Who is this for

- Anyone who has watched a shielded wallet sync and wondered why it takes so long
- Newcomers who keep seeing Tachyon mentioned next to NU7 and Zcash scaling
- Readers who want the idea first and the cryptography second

<br/>

## The problem Tachyon solves

Zcash hides who a payment is for. That is the whole point, and it creates an awkward problem: if nobody can tell who a payment belongs to, how does your own wallet find yours?

In Bitcoin this is easy. Addresses are public, so a wallet can ask a server "what was sent to this address?" and get an answer. A Zcash wallet cannot ask that question, because asking it would reveal exactly what the shielded pool is designed to hide.

So Zcash does something different. The sender encrypts the payment details and tucks them inside the transaction itself. Your wallet then works through transactions on the chain and tries to decrypt each one. Almost every attempt fails. The few that succeed are your payments. This is called **trial decryption**, and it is private, correct, and slow.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

The catch is what the work depends on. The effort your wallet spends is set by how big the chain is, not by how many payments you actually received. Someone who has never received a single payment does nearly as much work as someone who receives them daily. As Zcash grows, that gets worse for everybody. In the words of the proposal, it "simply does not scale."

<br/>

## What Tachyon changes

Tachyon attacks the problem at its root: it stops using the blockchain as the delivery channel for payment secrets.

Instead, the details you need travel with the payment request itself, out of band. A payment request, a URI, or a QR code carries the information that used to be encrypted into the transaction. Sean Bowe describes this as embracing **out-of-band payments** for the first time in a Zcash shielded protocol.

Once the chain is no longer carrying that information, your wallet no longer has a reason to search it, and the trial decryption problem disappears.

Your wallet still needs to know current chain state in order to spend, though. That is the second half of the design, **oblivious synchronization**: a way for a wallet to fetch the specific things it needs without revealing to the server which things it asked for.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## What it would mean for someone using a wallet

- **Syncing stops growing with the chain.** The time your wallet spends catching up would track your own activity rather than the size of Zcash.
- **Payments become more like handing someone a bill.** The payment request carries what the recipient needs, so the exchange between sender and recipient matters more than it does today.
- **Wallets carry more responsibility.** Because the chain no longer holds an encrypted copy of your payment details, losing your wallet data matters more. Backup and recovery move from being a protocol feature to something wallet software has to get right.
- **Some familiar pieces move or disappear.** Tachyon takes key diversification, viewing keys, and payment addresses out of the core protocol, leaving them to the wallet layer. This is one of the more consequential parts of the proposal and is still being worked through.

<br/>

## A closer look for technical readers

Tachyon is described as a reverse-compatible change to the Orchard protocol. It could be deployed either as an upgrade to the existing Orchard pool or as a separate shielded pool reached through a [turnstile](https://zechub.wiki/zcash-tech/the-turnstile), the same mechanism Zcash used for Ironwood. The choice affects deployment, not the design.

It keeps several things from Orchard: RedPallas key re-randomization, homomorphic value commitments and binding signatures, and the partitioned key structure that lets a device delegate proving without handing over spend authority.

The scaling work leans on **proof-carrying data**, a technique in which data travels alongside a proof of its own correctness, so that combining it with other proof-carrying data produces something that inherits and extends those proofs. This is what allows a large amount of verified work to be compressed into something small and quick to check. Halo, discovered by the team behind Zcash, is what made proof-carrying data practical enough to build on.

The third strand is **shielded transaction aggregates**, which changes how shielded state changes are communicated and has knock-on effects on how signing works.

<br/>

## Where the work stands

Tachyon is a **proposal, not a shipped feature**. It was published in April 2025, and a follow-up post in May 2025 worked through the consensus implications. It is named as a candidate for NU7, the next major upgrade after Ironwood, but NU7's contents are decided by a coinholder vote and nothing about Tachyon is settled.

The author's own framing is that this is an actionable plan rather than speculative research, but one that needs an engineering effort comparable to Sapling, with some harder questions deliberately left for later.

Related work is already visible. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), a full node released in July 2026, is a joint effort between Project Tachyon and the Valar Group and previews some of these network-level changes. [Private information retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) research aims at the same scanning bottleneck from a different angle.

<br/>

## Common misconceptions

- **Tachyon is not live.** No wallet uses it today, and no upgrade has activated it.
- **Tachyon is not the same as Ironwood.** Ironwood activated in July 2026 and dealt with the Orchard pool and the turnstile. Tachyon is a separate, later proposal about scaling.
- **Tachyon is not a privacy reduction.** The goal is to keep ledger indistinguishability while removing the scaling cost, not to trade privacy for speed.
- **zk-SNARK verification was never the bottleneck.** The proposal is explicit that the slow part is how wallets discover and coordinate state, not the cost of checking proofs.
- **"Targeted at NU7" is not a commitment.** What goes into NU7 is decided by a vote.

<br/>

## Glossary

| Term | Meaning |
|---|---|
| Trial decryption | Attempting to decrypt transactions one by one to find the ones addressed to you |
| In-band secret distribution | Putting the payment secret inside the transaction on the blockchain, as Zcash does today |
| Out-of-band payment | Passing the payment details directly between sender and recipient instead of through the chain |
| Oblivious synchronization | Fetching the chain data a wallet needs without revealing which data was requested |
| Proof-carrying data (PCD) | Data that travels with a proof of its own correctness, so proofs can be combined and compressed |
| Shielded transaction aggregate | Tachyon's way of bundling shielded state changes, changing how they are communicated and signed |
| Ledger indistinguishability | The property that shielded transactions cannot be told apart from one another |

<br/>

## FAQ

**Will this make my wallet sync faster?** That is the goal. Syncing time would follow your own activity instead of the size of the chain. Nothing has shipped, so there is no measured figure to quote yet.

**Do I need to do anything now?** No. Tachyon is a proposal. If it is adopted, it would arrive through a network upgrade with the usual notice.

**Does removing viewing keys mean losing the ability to share read access?** The proposal moves that capability out of the core protocol and into the wallet layer. What that looks like in practice is one of the open questions.

**Is my money at risk if Tachyon ships?** Deployment would use either an Orchard upgrade or a turnstile, both designed so that value moves under public accounting rules. The Ironwood page explains how a turnstile works.

<br/>

## Related pages

- [Private Information Retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) - another approach to the same wallet scanning bottleneck
- [Zakura Node](https://zechub.wiki/zcash-tech/zakura-node) - a node built partly out of Tachyon's engineering effort
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - the upgrade that activated in July 2026, often confused with Tachyon
- [The Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - the mechanism Tachyon could use if deployed as its own pool
- [Post-Quantum Security](https://zechub.wiki/zcash-tech/post-quantum-security) - where Tachyon sits alongside longer-term protocol work
- [How Zcash Is Organized](https://zechub.wiki/start-here/how-zcash-is-organized) - who is doing this work and how the ecosystem fits together

<br/>

## Resources

- [Tachyon: Scaling Zcash with Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 April 2025, the original proposal
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 May 2025, consensus and protocol implications, written for protocol developers
- [Sean Bowe's blog](https://seanbowe.com/blog/) - where the Tachyon series is published
- [tachyon.z.cash](https://tachyon.z.cash/) - project site

# Project Tachyon

## TL;DR

- Project Tachyon is a proposed upgrade that aims to let Zcash scale to far higher transaction volumes without weakening privacy
- It attacks the two things that make private chains slow to grow: heavy wallet syncing, and the ever growing amount of state that nodes must keep
- Its central idea is oblivious synchronization, letting a wallet learn its own status from an untrusted server that learns nothing in return
- Underneath sits a deeper tool called proof carrying data, which lets proofs be compressed and combined continuously
- It has been demonstrated on a test network with large speed gains, but it is not yet on mainnet, and it is planned to arrive with the NU7 upgrade after further optimization and auditing

<br/>

## Who is this for

- Anyone who has heard Tachyon named as the future of Zcash scaling and wants to understand what it actually is
- Readers curious how a fully private chain could ever reach the scale of a global payment network
- Those who want the concept first and the cryptography underneath it second

<br/>

## The problem Tachyon solves

Zcash's shielded transactions offer very strong privacy, but that privacy has a cost that grows with use. Two limits matter most.

The first is wallet syncing. Because the network hides who a transaction is for, a wallet cannot simply ask which transactions are mine. Instead it downloads large amounts of data and checks each item itself. As the chain grows, this scanning gets slower, which is why syncing a shielded wallet can feel sluggish.

The second is state growth. Every node has to keep track of a growing amount of data to validate new transactions. As adoption rises, that burden rises too, which pushes up the cost of running a node and quietly works against decentralization.

Together these create what researchers call a rising marginal cost of verification. The more the network is used, the more expensive it becomes to participate, which caps how far a private chain can scale. Tachyon is an attempt to remove that cap.

<br/>

## The core idea: oblivious synchronization

Tachyon's signature idea is oblivious synchronization. It flips the wallet problem around.

Instead of a wallet downloading and scanning everything to find its own funds, a remote service does the heavy work and hands the wallet a small proof that its funds are in a certain state, for example that they have not been spent. The trick is that the service performs this work without learning anything about the wallet. It does not discover which funds it is tracking or which transactions belong to whom.

This is possible because the markers involved, the values that would normally identify a note, are made to change over time in an unlinkable way. The server helps maintain a proof without ever seeing the stable identifiers that would let it follow a user. The wallet gets fast, near instant sync, and the server gains no knowledge in exchange. Privacy is preserved while the expensive part is moved off the user's device.

<br/>

## The engine underneath: proof carrying data

Oblivious synchronization is made possible by a deeper cryptographic tool called proof carrying data, often shortened to PCD.

A normal zero knowledge proof proves one statement once. Proof carrying data goes further: it lets each step of a computation carry a compact proof that everything up to that point was done correctly, and lets the next step build on it without redoing the work. Proofs can be continually compressed and combined across many steps, far beyond what a single traditional proof allows.

Tachyon uses this at both ends of its design. Before a transaction, PCD supports oblivious synchronization, letting the work of tracking state be compressed and outsourced. After a transaction, PCD lets block producers combine many shielded transactions together without needing the users to coordinate, which shrinks the size and verification cost of what goes on chain. The result is that adding more transactions no longer piles up cost in the same way, capacity scales outward rather than hitting a wall.

To achieve this, Tachyon introduces a new shielded protocol that uses proof carrying data throughout, with a simplified key structure, while keeping backward compatibility with the existing cryptography so today's ecosystem, including hardware wallets, still works.

<br/>

## A closer look for technical readers

Tachyon's key architectural move is to decouple the wallet payment protocol from the on chain shielded protocol. Historically these have been tightly bound, which is why user cost and validator cost both grew with the chain. By separating them, the wallet can rely on outsourced, privacy preserving proofs while the on chain protocol focuses on compact, aggregatable data.

Proof carrying data is the primitive that makes the split work. It generalizes recursive proof composition so that state can be carried forward as a continuously updated proof rather than as raw history. This is what lets validators prune data they would otherwise have to store, and lets transaction creators cap the amount of state validators must actively maintain. The reported effect is a shift of cost away from both users, who no longer scan the whole chain, and node operators, who no longer store unbounded state, toward a model where wallets carry proofs and nodes prune aggressively.

Because these techniques rest on modern proof systems in the Halo lineage, which need no trusted setup, they also avoid reintroducing the setup ceremonies that earlier Zcash designs required. The recursive proofs are handled by a software engine called Ragu, a Rust framework built by the Tachyon team that follows the original Halo construction, needs no trusted setup, and targets the same curves Zcash already uses, which keeps it compatible with the existing protocol.

<br/>

## Current status

Tachyon has moved from idea to demonstration, but it has not yet arrived.

The first test network carrying Tachyon went live in May 2026 and showed large gains. Block times were cut from about 75 seconds to about 25 seconds, an increase in confirmation speed of roughly 300 percent, while the number of shielded transactions per second roughly doubled, with a long term target of thousands of transactions per second. Community support has been strong, with Tachyon drawing near universal backing in community sentiment polls.

At the same time, the teams behind it have been clear that a working testnet is not a finished product. Tachyon is planned to arrive as part of NU7, a future network upgrade that is also expected to carry other features such as user issued shielded assets and a network sustainability mechanism. NU7 follows steps that have already happened, including the Ironwood pool upgrade and the retirement of the old zcashd node software. Before Tachyon can activate on mainnet, it is expected to undergo several rounds of optimization and auditing, and the formal verification and audit work is understood to be the main thing standing between the current testnet and a mainnet release. It is best understood as an advanced and well supported proposal in active development, not a feature users already have.

<br/>

## Honest limits

Tachyon's privacy guarantee is specific, and it is worth stating what it does not cover.

Oblivious synchronization ensures a sync service learns nothing about the wallets it serves. It does not by itself guarantee that such services will always be available, or that they cannot refuse service. If most wallets came to rely on only a few sync providers, those providers could become operational chokepoints, able to slow or withhold service even though they cannot see private data. Keeping sync services plural and easy to run is therefore part of realizing Tachyon's promise, in the same way that keeping many independent nodes matters for any decentralized network.

This is not a flaw in the cryptography, it is a reminder that privacy, availability, and decentralization are separate properties, and Tachyon's guarantee is squarely about privacy.

<br/>

## Common misconceptions

- Tachyon is not live yet, it has been shown on a testnet and is planned for a future upgrade
- It is not primarily a privacy feature, its main goal is scale, though it preserves privacy while achieving it, and improves it as a side effect
- Faster syncing is a consequence of oblivious synchronization, not a separate feature bolted on
- Tachyon does not remove the need for trust in availability, only in whether a server can see your data

<br/>

## Related pages

- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - the zero knowledge proofs Tachyon builds upon
- [Halo](https://zechub.wiki/zcash-tech/halo) - the trustless proof system in the lineage Tachyon uses
- [Post-Quantum Security](https://zechub.wiki/zcash-tech/post-quantum-security) - where Tachyon's quantum privacy side effect is discussed
- [Zakura Node](https://zechub.wiki/zcash-tech/zakura-node) - the node software being built to integrate this work

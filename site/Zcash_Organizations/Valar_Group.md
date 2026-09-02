<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visit website](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## Mission Statement

Valar Group is an independent engineering organization focused on scaling Zcash, strengthening coinholder governance, and improving the privacy, performance, and long-term resilience of the protocol.

Its work is concentrated on protocol-level infrastructure: private token-holder voting, high-performance full-node software, wallet-sync technology, and network upgrades that make shielded Zcash more usable at larger scale.

The organization aims to give ZEC holders a way to express preferences privately, give node operators faster and more capable software, and give wallets tools that preserve user privacy while reducing the cost of participating in the network.

## Background

Valar Group is led by Dev Ojha (ValarDragon), a cofounder of Osmosis and a member of the team that launched Cosmos. Over the past decade he has worked across zk-SNARKs, BFT consensus, and production DeFi systems.

The group’s public work in Zcash became prominent as the ecosystem shifted toward independent protocol teams after the 2026 reorganization of core development. Valar Group emerged as one of the organizations building the next generation of Zcash infrastructure alongside Project Tachyon, Shielded Labs, ZODL, and the Zcash Foundation.

A recurring theme in its work is that Zcash’s privacy properties should extend beyond payments. If holders are asked to vote on issuance, block times, or network-upgrade scope, they should be able to do so from shielded balances without revealing identities, balances, or individual votes. That requirement led Valar Group to design and ship a dedicated coinholder voting chain.

The same scaling and cryptography background also shaped its node and sync work. Faster blocks, lighter wallet synchronization, and a more capable full node are treated as prerequisites for private money that can be used at payment-network scale rather than only as a store of value.

## Vision

Valar Group’s public materials and project work point toward a Zcash network that can:

- Support private, auditable coinholder voting as a repeatable governance process.
- Scale proof-of-work payments without sacrificing shielded privacy.
- Reduce wallet and node bottlenecks through PIR, pruning, and faster block propagation.
- Increase implementation diversity by shipping an independent full-node stack.
- Contribute to post-quantum readiness and formally reviewed protocol upgrades.

The organization works as an independent contributor, not as a protocol owner. Protocol changes still move through ZIPs, implementation, review, and community signaling. Valar Group’s role is to design, implement, operate, and open-source the systems that make those processes practical.

## Strategic Areas

Valar Group’s work clusters around four areas.

### Private Coinholder Governance

Zcash does not use automatic on-chain protocol control. Coinholder polls are advisory signals that feed a broader rough-consensus process. Valar Group built the Tokenholder Voting Chain so those signals can be collected from shielded balances without exposing voter identity or individual vote size.

The current design uses:

- A dedicated Cosmos SDK application chain to orchestrate voting rounds.
- Snapshot proofs against spendable Ironwood notes.
- Homomorphic encryption of vote amounts.
- Private Information Retrieval for nullifier non-membership proofs.
- A coordinator multisig and a distributed election authority.

The goal is to replace earlier token-holder voting processes with a reusable, audited, wallet-integrable system that other organizations can operate and independently tally.

### Node Software and Network Scaling

Valar Group collaborates with Project Tachyon on Zakura, a Zcash full node built from the Zebra codebase. Zakura is positioned as a high-performance node for operators who need faster initial sync, pruning, snapshot bootstrapping, and a compatibility path for former `zcashd` users.

Related scaling work includes:

- Faster target block times, including 25-second block experiments on NU7 testnets.
- Improved peer-to-peer block propagation.
- Full-node features intended to keep Zcash usable as shielded activity grows.

### Wallet and Sync Infrastructure

Shielded wallets historically have to scan large amounts of chain data. Valar Group develops PIR systems so wallets can fetch the proofs they need without downloading full nullifier sets or revealing which notes they care about.

This work appears both in the voting stack and in broader wallet-sync research. The group has also contributed wallet-side reliability work, including multi-server transaction submission and server-selection improvements used in ZODL’s mobile stack.

### Protocol Upgrades and Ecosystem Coordination

Valar Group was one of the organizations that publicly committed to the Ironwood response after the Orchard circuit vulnerability. Ironwood introduced a new shielded pool, sealed the original Orchard pool behind a turnstile, and restored a path to independently verifying circulating supply. Valar Group worked with Project Tachyon, Shielded Labs, ZODL, and the Zcash Foundation on architecture, consensus-rule implementation, and ecosystem coordination.

The group also participates in NU7 scoping, testnet operation, and ZIP editing. Dev Ojha is listed as a ZIP editor.

## Current Initiatives

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote is Valar Group’s private governance protocol for Zcash. Holders vote with shielded balances without revealing individual amounts or linking votes to identities.

Key properties include:

- One online session to vote, rather than a multi-day commit/reveal process.
- A Keystone-compatible snapshot signature that delegates voting rights to a hotkey without putting funds at risk.
- Encrypted vote amounts using homomorphic ElGamal.
- PIR queries so nullifiers are not leaked during snapshot proofs.
- Vote splitting and delayed relay submission to reduce timing correlation.
- Publicly auditable tallies.

In August 2026, Valar Group and Project Tachyon used this stack for the NU7 coinholder vote. Eligibility required spendable shielded ZEC in Ironwood at mainnet height 3,459,350. Voting ran from August 25 through September 14, 2026, with a 1,000,000 ZEC participation threshold for the result to be treated as representative. Questions covered NSM issuance smoothing, reissuance timing, Sprout/v4 deprecation, 25-second block times, and NU7 scope/readiness.

Default-chain coordination uses a 2-of-5 multisig among Project Tachyon, Valar Group, the Zcash Foundation, ZODL, and Shielded Labs. A separate validator set holds per-round decryption-key shares. No single validator can recover individual votes; a threshold of validators is required to produce the final tally.

Public operator and auditor surfaces include:

- [Voting chain setup](https://setup.valargroup.org)
- [Tally auditor](https://tally.valargroup.org)
- [Coordinator UI](https://svote.valargroup.org/)
- [PIR server setup](https://setup-pir.valargroup.org)
- [Shielded Vote documentation](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura is a Zcash full node developed as a collaboration between Valar Group and Project Tachyon. It is derived from Zebra and adds faster sync, native pruning, snapshot bootstrapping, `zcashd` compatibility paths, and experimental high-performance P2P work.

The Zcash Foundation publicly welcomed the project, noting that Zebra was released under permissive licenses so independent teams could fork and improve it, and that several Zakura contributors had already contributed upstream to Zebra.

### Private Information Retrieval

Valar Group maintains PIR services and libraries for two related problems:

- Proving that a note was unspent at a snapshot height without revealing its nullifier.
- Reducing the data wallets must fetch in order to sync or vote.

This is a core dependency of Shielded Vote and a building block for faster private wallet UX.

### Ironwood and NU7 Engineering

Valar Group was part of the June 2026 joint commitment to Ironwood and contributed to consensus-rule implementation and client work around the new pool. It also operated NU7 testnet infrastructure, including join scripts and public nodes hosted under `nu7.valargroup.dev`.

### Open-Source Protocol Libraries

The `valargroup` GitHub organization publishes the voting and node stack as public repositories, including:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — application-specific chain for private on-chain voting
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — client-side shielded voting library, proofs, storage, and FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2 delegation and vote circuits
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR for nullifier non-membership proofs
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — wallet service-discovery configuration
- [`zebra`](https://github.com/valargroup/zebra) — Valar Group’s Zebra/Zakura development fork

## The Teams

Valar Group is led by **Dev Ojha** (ValarDragon). Public team pages associated with Zakura list the following Valar-affiliated engineers:

- **Dev Ojha** — Maintainer; leads Valar Group. Focus areas include token-holder voting, post-quantum work, Zakura, and PIR.
- **Roman Akhtariev** — Principal engineer. Previously a principal engineer at Osmosis; work includes PIR wallet sync, token-holder voting, and Zakura sync performance.
- **Evan Forbes** — Principal engineer. Former Celestia consensus lead and founding engineer; work includes faster block-time readiness and a QUIC P2P stack.
- **Adam Tucker** — Principal engineer. Former Osmosis engineer; work includes token-holder voting with Roman Akhtariev, wallet reliability, and Ironwood integration across the stack.

Zakura itself is maintained jointly with Project Tachyon, led by Sean Bowe. The two organizations collaborate closely but remain separate.

## Organizational Structure

Valar Group operates as an independent engineering organization. It is not part of the Zcash Foundation, ZODL, Shielded Labs, or Zcash Community Grants.

In the voting-chain design, Valar Group is one of five coordinator organizations. That role is a parameter of the voting system, not a claim of exclusive control over Zcash governance. Other teams can run validators, stand up alternative voting chains, or audit published tallies from the public tooling.

Additional information about legal entity type, board composition, and internal governance has not been published in the same detail as older Zcash organizations.

## Funding

Public forum statements from mid-2026 describe Valar Group and Project Tachyon as funded through private donations. Unlike ZODL’s disclosed venture round or Shielded Labs’ public donation announcements, Valar Group has not published a detailed donor list or grant schedule.

That funding model keeps the team independent of the historic Development Fund / block-reward path, but it also means less public visibility into budget size and funding sources.

## Role in the Zcash Ecosystem

Valar Group is one of the independent protocol organizations that formed around Zcash’s 2026 development landscape. In that landscape:

- The **Zcash Foundation** continues community stewardship and Zebra.
- **ZODL** focuses on wallet product and protocol continuation after the ECC split.
- **Shielded Labs** focuses on sustainability, security, and consensus research.
- **Project Tachyon** focuses on recursion, formal verification, and long-range scalability.
- **Valar Group** focuses on private coinholder voting, node performance, PIR, and the engineering required to operate those systems in production.

Its distinctive contribution is making shielded governance operational. The NU7 vote is the first major use of that stack: holders prove Ironwood balances, wallets such as Zodl and Vizor can integrate the flow, and anyone can audit the tally without learning how a particular holder voted.

The same team’s node and sync work is intended to support the other half of that picture. Private voting is less useful if wallets cannot sync, nodes cannot keep up, or upgrades cannot be implemented quickly. Valar Group treats governance, node software, and wallet infrastructure as one problem: make private Zcash usable at scale without concentrating operational power in a single organization.

## Resources

- [Valar Group website](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Vote documentation](https://valargroup.gitbook.io/shielded-vote-docs)
- [Voting chain setup](https://setup.valargroup.org)
- [Tally auditor](https://tally.valargroup.org)
- [Coordinator UI](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura about / team](https://zakura.com/about/)
- [NU7 coinholder vote forum thread](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Coinholder Voting Chain forum thread](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)




# Docs

This repository ships three things side by side: the SIWZ auth library, the ZBooks accounting and payouts app, and ZecWall as a minimal reference integration. The docs are split to match:

- **[`siwz/`](./siwz/)**: the auth primitive (protocol, integration, deployment, roadmap).
- **[`zbooks/`](./zbooks/)**: the accounting app (user guide and the payout system).
- **Cross-cutting** (at this level): security and the integrated system workflow.

## SIWZ

- [Why SIWZ exists](./siwz/why-siwz.md): the design essay on why memo-challenge beats signmessage on Zcash.
- [Architecture](./siwz/architecture.md): packages, layers, the explorer abstraction, deployment shapes. ([SVG diagram](./siwz/architecture.svg))
- [Roadmap](./siwz/roadmap.md): what is next, including ZIP 304, ZSA-as-identity, wallet-side callbacks, a hosted verifier.
- [Integration guide](./siwz/integration.md): pick a sign-in method (memo, signed message, snap), what to import for each, how to wire it.
- [Quickstart](./siwz/quickstart.md): add Sign in with Zcash to a Next.js app in about five minutes.
- [Specification](./siwz/spec.md): the on-wire SIWZ-classic message format and verification algorithm.
- [Memo-challenge](./siwz/memo-challenge.md): the Zcash-native sign-in flow that works with every shielded wallet via ZIP 321.
- [Wallet integration](./siwz/wallets.md): how users sign in from each major Zcash wallet, with a full feature matrix.
- [Shielded deployment](./siwz/shielded-deployment.md): shielded sign-in on a $3/mo VPS, end to end on mainnet.
- [Sapling (ZIP 304) verifier](./siwz/sapling-wasm.md): wiring up shielded SIWZ-classic sign-in.

## ZBooks

- [Architecture](./zbooks/architecture.md): the stack, data model, request flow, integration points, and where the deeper docs live. Start here for ZBooks internals.
- [ZBooks guide](./zbooks/guide.md): what every page does and how to use ZBooks as a viewer, treasurer, or admin (plus auditing a wallet for undocumented transactions).
- [ZBooks payouts](./zbooks/payouts.md): pay contributors in one non-custodial ZIP 321 batch, M-of-N approval gate, auto-reconciliation against the treasury viewing key. The "SIWZ in production" story.

## Cross-cutting

- [System workflow](./system-workflow.md): the whole system end to end, for a reviewer reading it cold.
- [Security model](./security.md): what is protected, what is not, and operational guidance. Covers both the SIWZ threat model and ZBooks application-layer hardening.

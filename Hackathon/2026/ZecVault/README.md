# ZecVault

> Private 2-of-3 shielded escrow for Zcash. A buyer, a seller, and a neutral arbiter hold FROST shares over one shielded Orchard address; any two of them settle the deal, and the public chain sees nothing but an ordinary shielded transaction.

**Track:** FROST
**Team:** Ridwan ([GitHub: Ridwannurudeen](https://github.com/Ridwannurudeen))
**Repository:** https://github.com/Ridwannurudeen/zecvault
**Demo video:** https://youtu.be/elSUBGYcma8

---

## Proven on Zcash mainnet

ZecVault settlements ran on Zcash **mainnet** with real ZEC, end to end from the browser: create escrow, fund, propose, two role approvals, then the app builds the PCZT, proves the Orchard bundle, runs the live 2-of-3 FROST signing ceremony, injects the aggregate signature, extracts the transaction, and broadcasts it to `zec.rocks:443`.

| Step | Amount | Txid | Mined height |
| --- | --- | --- | --- |
| Escrow funding (source to FROST address) | 0.01 ZEC | `4850cdfbeff6d6091c8088e55cb793c5a966897e38279122ca9c29867da0523f` | — |
| **2-of-3 FROST release** (Buyer + Seller) | 0.0049 ZEC | `b8778383da7cdb470ae3df7bfb10b9cbdfe750a9b762219ac16b00f22517c1a3` | 3405552 |
| **2-of-3 FROST release** (second run) | 0.0049 ZEC | `ca6ca101e30e91b0fdd08a3ffa8eb3f11c6af84c5f0ed2c5c225b2cfa1b24162` | 3406162 |
| **2-of-3 FROST refund** (Buyer + Arbiter, dispute path) | 0.0049 ZEC | `3cc6a185d505d6719ac777465c839933da131f7b2a7ccf2d8dde6be6a7700294` | 3406195 |

Open any txid on a public explorer: each one reads as an ordinary shielded Zcash transaction with no visible escrow, policy, party, or dispute-outcome metadata. That indistinguishability is the product.

The full path (including the dispute/refund flow) was also proven on testnet first; the testnet gate table is in the repository README.

## The problem it solves

Escrow between strangers normally leaks everything: who dealt with whom, for how much, who arbitrated, and how the dispute ended. On transparent chains that record is public forever. ZecVault gives three parties a shared shielded vault where the 2-of-3 policy is enforced by key distribution, disputes are resolved privately, and the only public artifact is proof that a shielded payment settled.

## How it works

- **Three roles, three outcomes.** Release = Buyer + Seller pay the seller. Refund = Buyer + Arbiter return funds to the buyer. Disputed release = Seller + Arbiter settle for the seller. The policy is enforced by who holds which FROST share; Zcash needs no smart contracts for this.
- **Rerandomized FROST on RedPallas (ZIP 312 style).** Each spend signature is produced by a 2-of-3 FROST ceremony using the spend's alpha randomizer, so the aggregate verifies exactly like a single-signer Orchard signature.
- **PCZT pipeline.** The engine builds the transaction with the PCZT flow: create, prove (Halo2), extract the shielded sighash and per-spend alpha, run the FROST ceremony over them, inject the aggregate signature, extract, and broadcast via the lightwalletd-compatible `CompactTxStreamer` path to `zec.rocks` (no local `zcashd`).
- **Five-screen web app.** Create, Fund, Decide, Approve (with a live signing trace of the ceremony), and a private Receipt that contrasts what the parties know with what the world sees.
- **Two small patches to the Zcash stack** (vendored at pinned revisions, applied by `scripts/setup-vendor.sh`): wiring `apply_orchard_signature` into `zcash-devtool`'s PCZT CLI and exposing the shielded sighash + alpha for external signing. Everything else is the upstream stack doing what it already does well.

## Honest limits

This is cryptographic shared-custody escrow, not trustless smart-contract escrow. The demo host co-locates the three share files and records role approvals; a valid settlement still requires two FROST shares. Key generation is trusted-dealer (DKG is future work), the arbiter is a trusted dispute resolver, and none of this is audited production custody. These limits are documented in the repository security model.

## Reproduce it

```bash
git clone https://github.com/Ridwannurudeen/zecvault && cd zecvault
./scripts/setup-vendor.sh   # clones the two upstream repos at pinned revs and applies the patches
cargo run -p zecvault-signer -- init-group --out-dir p0-testnet/frost-group --network testnet
ZECVAULT_ALLOW_UNAUTHENTICATED_LOCALHOST=1 cargo run -p zecvault-api
cd web && npm ci && npm run dev
```

License: Apache-2.0.

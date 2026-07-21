# Glasspane Rooms

> A private payout board for Zcash teams. Prove selected shielded payouts, memos, and totals without handing over a viewing key or exposing the rest of the treasury.

**Track:** Accounting
**Team:** qdee (X: [@0xqdee](https://x.com/0xqdee), GitHub: [dolepee](https://github.com/dolepee))
**Repository:** https://github.com/dolepee/glasspane
**Live:** https://glasspane-iota.vercel.app/
**Demo video:** https://youtu.be/am9CfcHKQSQ

---

## Proven on Zcash mainnet

Glasspane runs against real shielded Orchard payments on Zcash mainnet, not mocks. Two real payouts are disclosed and verified by the tool, and a deliberately tampered copy of a receipt is rejected:

- `66167cd3020eb329446e86d80ccd0494baa3959bf9a0e586dbdccd204b6dcfd0` recovers 0.001 ZEC, memo `glasspane first receipt` (block 3,361,512)
- `9571fcf98f0d7b47ff1dfccc46f7c83412698a44b1aed147ed333800c95fe078` recovers 0.0002 ZEC, memo `glasspane community support 01` (block 3,409,633)

Point the verifier at either receipt and it recovers the exact recipient, amount, and memo from the on-chain transaction. Tamper with the receipt and it fails closed with an explicit rejection.

## The problem it solves

Shielded Zcash payouts are private, which is the point. But teams, DAOs, and grant programs still need to prove specific payments: that a grantee was paid, that a community payout landed, that the books are honest. Today the only way to let someone verify a shielded payment is to hand over a viewing key, which exposes the entire wallet history and balance. That is wallet-wide surveillance just to prove one line.

Glasspane fixes that. A team publishes a room that proves only the payouts it chooses, and nothing else becomes visible.

## What it is

For each selected payout, a Glasspane receipt discloses one per-output Out Cipher Key (OCK). The verifier uses that OCK against the named Zcash transaction output and recovers, for that one output only:

- recipient address
- amount
- memo contents

The room total is aggregated from the verified outputs. Glasspane never discloses the seed, spending key, outgoing viewing key, unified full viewing key, other transactions, or the wallet balance. A viewing key is all-or-nothing surveillance; an OCK proves exactly one payment.

## How it uses the Zcash network

Zcash's Sapling and Orchard pools already publish, for every output, an `out_ciphertext` encrypted under a per-output Out Cipher Key derived from the sender's Outgoing Viewing Key. That is the protocol-level primitive for showing one party one specific payment without showing them the rest of the account. Glasspane packages it: it derives the per-output OCK for a chosen payout, and the verifier fetches the public transaction, checks the txid binding first, then recovers the output with that single key. Everything is verified against Zcash mainnet.

## What you can do

- Open the public rooms board and see selected payouts recovered from mainnet, with the tampered row rejected.
- Run the verifier in your browser (WebAssembly, fully in-page) against a receipt.
- Export a room to CSV for accounting.
- Build your own room from your own receipts with the self-serve builder.
- Reproduce everything from the command line.

## Try it

```bash
git clone https://github.com/dolepee/glasspane
cd glasspane
cargo run -p gp-room -- examples/rooms/zechub-demo/room.json --out verified-room.json
```

- Live board: https://glasspane-iota.vercel.app/room/zechub-demo
- Audit packet: https://glasspane-iota.vercel.app/audit

Built for ZecHub Hackathon 3.0, Accounting track. MIT licensed.

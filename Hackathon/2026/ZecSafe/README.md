# ZecSafe - ZecHub Hackathon 3.0 (FROST track)

**Lose one key. Not your ZEC.** ZecSafe is a FROST-native threshold authorization
and proof control plane for shielded Zcash. A recorded 2-of-3 FROST group
authorized a real shielded Zcash mainnet transaction while one signer was
unavailable, then exported a public proof bundle that judges can verify without a
wallet or secret material.

- **Track:** FROST
- **Team:** cyberrockng
- **Code:** https://github.com/cyberrockng/zecsafe
- **License:** MIT
- **Live site:** https://zecsafe.vercel.app/
- **Proof route:** https://zecsafe.vercel.app/proof
- **Demo video:** https://youtu.be/B16fPtEGfnY

## Verify it yourself in 60 seconds

```bash
git clone https://github.com/cyberrockng/zecsafe.git
cd zecsafe
make judge-proof-mainnet
make judge-proof-mainnet-tamper
```

Expected verdicts:

```text
VERDICT: VERIFIED RECORDED ZECSAFE PROOF
VERDICT: TAMPER DETECTION PASS
```

No wallet, funds, RPC endpoint, or secret files are required for the public
verifier.

## Mainnet evidence

The recorded run used Zcash mainnet and produced a confirmed transaction:

```text
Run ID: p0-023-20260712T145358Z
Network: main
Txid: 27d0e850202f3f2c37b7de0ded80bdaac1f9fef1fc663c7d6cf107fad55e8527
Recorded status: CONFIRMED
Recorded height: 3409837
Threshold: 2 of 3, with 1 participant unavailable
Proof bundle hash: sha256:e4684eb1df7bbf48fda46ce4353968640f664c306b097e868e3b2ba780351b8d
Submission commit: fdd0587715fb65014d83b9695c1a1b3e9dd261bc
```

Explorer:
https://mainnet.zcashexplorer.app/transactions/27d0e850202f3f2c37b7de0ded80bdaac1f9fef1fc663c7d6cf107fad55e8527

The chain does not expose a special FROST marker. Zcash validates the resulting
spend authorization normally. FROST provenance is shown by the recorded
ZecSafe/FROST signing session and artifact fingerprints, not by anything visible
on-chain.

## What it demonstrates

1. **Unavailable signer, threshold still works.** One participant is unavailable;
   the two available participants satisfy the 2-of-3 threshold.
2. **Binding Firewall.** ZecSafe compares the reviewed intent to PCZT semantics
   before FROST begins. A recipient mismatch blocks signing.
3. **Public proof.** `zecsafe-proof-v1` records a canonical bundle hash, public
   event log, JSON schema, tamper demo, and data-classification checks.

## How it uses Zcash

ZecSafe builds a reviewed intent, checks the prepared Orchard PCZT, signs the
PCZT-derived shielded SIGHASH with a real `redpallas-rerandomized` FROST
ceremony, completes the PCZT, extracts the txid before broadcast, and broadcasts
only after explicit human approval. The resulting transaction was accepted and
confirmed on Zcash mainnet.

## Try the demo

Production:

```text
https://zecsafe.vercel.app/
https://zecsafe.vercel.app/proof
```

Local:

```bash
git clone https://github.com/cyberrockng/zecsafe.git
cd zecsafe
npm start
```

Open `http://127.0.0.1:4173/`. The product landing page explains the project;
the `/proof` route replays the verified mainnet run, exposes mismatch mode, and
runs browser-side proof verification.

## Repository contents

- `src/` - static product UI, browser proof verifier, and presentation reducer.
- `scripts/` - proof generator/verifier, PCZT binding checks, FROST session
  verification, mainnet proof runner, tests, and screenshot capture.
- `fixtures/verified-mainnet-run/` - public proof bundle and public event log for
  the recorded mainnet run.
- `docs/` - demo script, submission plan, trust model, FROST integration notes,
  architecture, threat model, and proof specification.

## Rules compliance

| Rule | Status |
|---|---|
| Interact with Zcash mainnet | Done - confirmed mainnet transaction linked above |
| Working prototype | Done - deployed product site and proof route |
| Setup and usage docs | Done - README, DEMO, SUBMISSION, docs |
| Open-source license | MIT |
| Video demo | Done - YouTube demo linked above |
| Respect privacy and security | Public proof excludes secret material; limitations are explicit |

## Honest limits

ZecSafe is a recorded proof-of-concept, not production custody software. The demo
does not implement share repair, share refresh, group migration, replacement of
lost participants, independent signer-side SIGHASH recomputation, or a live
multi-custodian deployment. The three participants were run as separate
processes/configurations on one machine. The public proof is a redacted,
tamper-evident evidence bundle, not a zero-knowledge proof.

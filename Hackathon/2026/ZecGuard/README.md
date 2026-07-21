# ZecGuard

## Summary

ZecGuard is a local-first Zcash recovery readiness prototype. It helps a ZEC holder create an encrypted recovery package, split package access across trusted guardians, coordinate readiness through Zcash shielded memos, and run a reconstruction drill.

ZecGuard is not a deadman switch. It does not custody funds, upload recovery material, automatically release secrets, or move ZEC.

## Track

- Primary: FROST / Social Recovery
- Secondary: Infrastructure

## Links

- Repository: https://github.com/Lexiie/ZecGuard
- Demo video: https://cdn.jsdelivr.net/gh/Lexiie/ZecGuard@main/assets/demo.mp4
- Submission notes: https://github.com/Lexiie/ZecGuard/blob/main/HACKATHON_SUBMISSION.md
- Threat model: https://github.com/Lexiie/ZecGuard/blob/main/docs/threat-model.md
- Memo format: https://github.com/Lexiie/ZecGuard/blob/main/docs/memo-format.md

## MVP Flow

```text
Create -> Encrypt -> Split -> Send Memo -> Acknowledge -> Verify -> Reconstruct
```

Implemented capabilities:

- Create a recovery plan with demo-safe dummy material.
- Encrypt the recovery package locally with AES-GCM.
- Split the package encryption key into 2-of-3 guardian shares.
- Generate and parse `ZECGUARD:v0` memo payloads.
- Send invite memos through an optional local bridge or manual wallet fallback.
- Scan local bridge memo output for matching guardian ACKs.
- Track guardian readiness status.
- Reconstruct and decrypt with threshold shares.
- Verify decrypted package integrity against the package hash.

## Zcash Mainnet Interaction

ZecGuard uses Zcash shielded memos as the private coordination layer for guardian invites, ACKs, and package anchors. The demo video uses testnet framing and dummy recovery material for safety, but the protocol target is Zcash mainnet shielded memo coordination.

All ZecGuard memo payloads use this prefix:

```text
ZECGUARD:v0
```

Implemented message types:

- `GUARDIAN_INVITE`
- `GUARDIAN_ACK`
- `PACKAGE_ANCHOR`

Memos carry coordination data only: plan IDs, guardian IDs, statuses, package hashes, thresholds, notes, and reply hints. Plaintext recovery secrets and guardian shares are never sent through memos.

## Safety Boundaries

- Use dummy secrets only in the MVP.
- Do not enter a real seed phrase, spending key, viewing key, or high-value recovery material.
- Guardian shares are exported separately and are not sent through Zcash memos.
- The local bridge is optional; manual fallback remains usable.
- This is a hackathon prototype and has not received a production security review.

## Run Locally

```bash
git clone https://github.com/Lexiie/ZecGuard.git
cd ZecGuard
npm install
npm run dev:web
```

Open:

```text
http://localhost:3000
```

Optional local bridge:

```bash
npm run dev:bridge
```

Validation commands:

```bash
npm run typecheck
npm test
npm run build
```

## Demo Notes

The demo video shows the local readiness loop: create a plan, encrypt the package, split the key into guardian shares, send shielded memo coordination payloads, acknowledge readiness, and reconstruct with threshold shares. The video uses testnet framing and dummy material only.

# FrostVault

**ZecHub Hackathon 3.0 — FROST track**

A threshold-signed vault for shielded ZEC with social recovery, built on
Zcash Foundation's real `frost-core` / `frost-rerandomized` / `reddsa`
cryptography — not a simulation.

**Live demo:** _(add your Vercel link here)_
**Video demo:** _(add your recording link here)_

## Quick start (for judges)

```bash
./run.sh
```

One command, starts the real Rust FROST backend and the Next.js frontend
together (installs frontend deps on first run if needed). Open
http://localhost:3000. Requires Node.js and Rust/cargo installed; nothing
else. Ctrl-C stops both.

---

## What's real, and what isn't

This project intentionally draws a hard line, because it matters for a FROST
track submission:

**Real:**
- Distributed key generation (DKG) — `frost_core::keys::dkg::part1/2/3`, run
  for every participant. No party, including this app's backend, ever
  computes or holds the reassembled group private key.
- Threshold signing over `reddsa::frost::redpallas` — the same RedPallas
  ciphersuite Zcash uses for Orchard spend authorization — with real
  rerandomization (`frost-rerandomized`), matching Zcash's unlinkability
  requirement.
- Signature verification, independently re-checked against the rerandomized
  verifying key for every completed ceremony.
- Social recovery is a real demonstration of FROST's actual guarantee: any
  threshold-many of a vault's participants — not a specific one — can
  produce a fully valid signature. The recovery flow runs a genuine signing
  ceremony over a different participant subset than the vault's usual
  signers and shows it verifying against the same group key.
- ZcashName resolution — via the official
  [`zcashname-sdk`](https://github.com/zcashme/ZNS), hitting the live,
  CORS-enabled ZNS testnet indexer (`light.zcash.me/zns-testnet`) directly
  from the browser. Genuinely real, though ZNS testnet only has a handful of
  registered names right now (`testclaim.zcash`, `zechariah.zcash` both
  resolve for real as of writing); anything not registered falls back to a
  small local table, and the UI labels which path resolved a given name so
  the two are never conflated.

**Explicitly not real (and labeled as such in the UI):**
- Constructing and broadcasting an actual shielded Orchard transaction using
  the FROST signature as spend authorization. As of this submission, no
  wallet — including the Zcash Foundation's own tooling — has shipped this;
  their own ["State of FROST for
  Zcash"](https://zfnd.org/the-state-of-frost-for-zcash/) post says the next
  step is "for wallets to integrate FROST." Building that from scratch is a
  research-grade problem, not something a hackathon project can responsibly
  claim to solve. Transaction history in this app is an explicitly-labeled
  mocked ledger; the authorization signature behind each "send" is real, the
  on-chain settlement is a placeholder.
- A vault's "receiving address" is a deterministic placeholder (rendered as
  a real QR code, but encoding a placeholder value), not a real
  Orchard address derived from the group public key (that derivation is part
  of the same out-of-scope transaction-construction gap above).
- "Zcash Login" is a cosmetic local display name, not real wallet auth.

**One disclosed simplification in the real crypto path:** because this is a
single-operator hackathon demo with no separate participant devices, every
participant's DKG and signing computation runs inside one backend process,
and the resulting secret key shares are persisted server-side in SQLite. In
a real deployment, each participant would generate and keep their own key
share on their own device, and a coordinator would never see it. That's a
simplification of *where* the real math runs, not a simulation of the math
itself — see `backend/src/frost.rs` for the exact real API calls used.

---

## Architecture

Two real services:

```
frostvault/
├── backend/          Rust (axum) — real FROST DKG + threshold signing + SQLite
│   └── src/
│       ├── frost.rs      reddsa::frost::redpallas DKG + rerandomized signing
│       ├── ceremony.rs   ceremony orchestration (real crypto + phase polling)
│       ├── api.rs        HTTP routes
│       └── db.rs         SQLite schema
├── app/               Next.js 15 App Router — dashboard, create vault, send, recovery
├── components/         SigningProgress, BroadcastStep, ThresholdDial, CeremonyRail, etc.
├── lib/api/            typed client for the backend
└── lib/zcashnames.ts    real ZNS testnet resolution via zcashname-sdk, with a disclosed fallback
```

See `ARCHITECTURE.md` for the full technical writeup.

## Running it locally

`./run.sh` (see Quick start above) does this automatically. To run the two
processes manually instead:

```bash
# terminal 1 — real FROST backend
cd backend
cargo run
# listening on http://localhost:8080

# terminal 2 — frontend
npm install
npm run dev
# http://localhost:3000
```

The backend runs locally only for this submission (see `ARCHITECTURE.md` for
why). The Vercel deployment serves the UI; without a reachable backend it
shows a clear "start the local backend" banner instead of faking data.

### Verifying the crypto core directly

```bash
cd backend
cargo test
```

This runs an end-to-end DKG → threshold-sign → verify test, and a second
test that signs with a different participant subset than the first (the
recovery scenario) and confirms it still verifies against the same group
key.

## Demo Video

The hackathon demo video is built with [Remotion](https://remotion.dev) as
a standalone project at `../frostvault-demo-video` (sibling folder), not
inside this repo.

**Why code-driven video instead of a screen recording:** this build
environment had no browser/screenshot tooling available, so the video
recreates the real UI (same colors, `ThresholdDial`, `CeremonyRail`, etc.
ported into Remotion components) driven entirely by code rather than a
literal screen capture — every visual is frame-deterministic and reproduces
identically on every render.

- **Script + captions**: `frostvault-demo-video/src/script.ts` is the single
  source of truth for on-screen captions; `VOICEOVER_SCRIPT.md` in that
  project is the same text laid out for ElevenLabs narration (voice: Adam
  or Josh, `stability: 0.80`, `similarity_boost: 0.90` — see that file for
  why "Clarity" isn't a real ElevenLabs parameter).
- **6 scenes, 3:45 total**: Intro → Create Vault (real DKG) → Send (real ZNS
  resolution + signing) → Recovery (the flagship scene — a different
  participant subset signs and verifies) → How FROST Works → Closing.
- **Rendered and verified**: a silent (no-narration) cut has already been
  rendered end-to-end — 6750/6750 frames, 1920×1080 @ 30fps, confirming the
  whole pipeline works — before handing off the script for ElevenLabs
  narration.

To add narration and re-render:

```bash
cd ../frostvault-demo-video
# 1. Generate 01-intro.mp3 .. 06-closing.mp3 from VOICEOVER_SCRIPT.md via ElevenLabs
# 2. Drop them into public/audio/
# 3. Flip AUDIO_ENABLED = true in src/audio.ts
npx remotion studio                 # preview
npx remotion render src/index.ts FrostVaultDemo out/frostvault-demo.mp4 --codec=h264
```

## Submission

- Primary track: FROST
- Secondary: Zcash Login (cosmetic, see honesty section), Accounting (mocked
  ledger, see honesty section)

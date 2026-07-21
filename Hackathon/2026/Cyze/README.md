# CYZE — Coordinate Your ZCash Easily ❄️

**A desktop wallet and signing companion for threshold-controlled Zcash funds.**

Cyze puts a graphical interface on [ZF FROST](https://frost.zfnd.org/) threshold
signatures, built on the Zcash Foundation's
[frost-tools](https://github.com/ZcashFoundation/frost-tools). It lets a group of
people jointly control a Zcash wallet where **no single person ever holds the
full private key** — a configurable threshold (e.g. 2-of-3) must cooperate to
authorize any spend.

> ### ⚠️ Beta software — unaudited — use at your own risk
>
> Cyze is in **beta** and has **not been security-audited**. It depends on
> pre-release Zcash libraries (Orchard/PCZT for the Ironwood network upgrade).
> Do not use it to hold funds you cannot afford to lose. You are solely
> responsible for backing up your key shares and recovery code, and for any
> transaction you broadcast. **No warranty is provided.** Start on testnet, and
> if you use mainnet, use small amounts.

---

## What it does

- **Key ceremonies (DKG)** — create or join a distributed key generation
  ceremony. The private key is split into shares across participants and never
  exists in one place.
- **Threshold signing** — coordinate a signing session (the coordinator can also
  be a signer), or participate through an inbox with an explicit review/approve
  step before your signature share is produced.
- **Zcash wallet** — for RedPallas (Orchard) groups: sync from a lightwalletd
  server, view shielded balances, receive to a group address (with QR), and
  **send** — each spend is authorized by a live FROST signing ceremony among the
  group. Includes on-chain and local transaction/message history.
- **Server hosting** — run the `frostd` coordination server embedded
  (auto-generated, pinned self-signed TLS), expose it to off-LAN peers through a
  built-in **Cloudflare tunnel** (public HTTPS URL, no port-forwarding), or point
  at any external `frostd`.
- **Contacts & groups** — a per-group view with public key material, named
  participants, receive addresses, and share-repair guidance.

Supports both frost-tools ciphersuites: **Ed25519** (generic signing) and
**RedPallas** (re-randomized FROST for Zcash Orchard spend authorization).

## Security model

- Key shares and contacts live in an **envelope-encrypted keystore**: a random
  data key (XChaCha20-Poly1305) is wrapped under both your passphrase and a
  one-time **12-word BIP-39 recovery code** (Argon2id), so either can unlock, and
  changing one doesn't invalidate the other. The plaintext is byte-compatible
  with upstream `~/.config/frost/credentials.toml`, so an existing frost-client
  config imports in one step.
- The **recovery code is shown once** at setup behind an explicit
  acknowledgement and is never stored — it is your only way back in if you forget
  the passphrase. Back it up.
- All ceremony messages are **end-to-end encrypted** (Noise, via frost-client);
  `frostd` is an untrusted relay.
- Self-signed server certificates are **pinned explicitly** (trust-on-first-use
  with fingerprint display), never blanket-accepted. A Cloudflare tunnel presents
  a publicly valid certificate, so peers using its URL skip cert trust.
- Signers see the **exact message** (hex + UTF-8) and must approve before their
  round-2 signature share is computed. Round-1 commitments are
  message-independent, so nothing is at risk before approval.

## Getting started

On first launch you set a passphrase and a display name, and are shown a
one-time recovery code to back up. A typical first run:

1. **Setup** — start (or connect to) a `frostd` server, add contacts.
2. **New DKG** — run a key-generation ceremony with your group to create a
   shared wallet.
3. **Groups** — open the group; for a RedPallas group, its **Wallet** page shows
   the receive address and balance.
4. **Send** — enter a recipient and amount; the app runs a signing ceremony with
   the chosen threshold of members, then broadcasts the transaction.

**📖 [User Walkthrough & Testing Guide](docs/USER_GUIDE.md)** — a detailed,
step-by-step guide covering security setup, contacts, hosting/joining a server,
the DKG ceremony, building and approving transactions, and configuration. Follow
it in order to fully test and vet the application.

## Building

Prerequisites:

- Rust (1.92+), Node 18+
- Tauri Linux system deps:
  `sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev libdbus-1-dev librsvg2-dev libayatana-appindicator3-dev build-essential`

```sh
npm install
./scripts/build-sidecar.sh   # REQUIRED — see below
npm run tauri dev            # development
npm run tauri build          # native installers (AppImage/deb/…)
```

**`build-sidecar.sh` is not optional.** The app bundles two sidecar binaries, and
Tauri refuses to build unless both are present for your host's target triple:

- **`frostd`** — the coordination server, built from `frost-tools` at the pinned
  revision (`scripts/PINNED_REV`). It must match the `frost-client` dependency in
  `src-tauri/Cargo.toml` or client and server disagree on the wire format.
- **`cloudflared`** — downloaded from Cloudflare's releases, so the optional
  public-tunnel feature needs no separate install or PATH entry.

The script fetches both. Skip it and the build fails late with
`resource path 'binaries/cloudflared-<triple>' doesn't exist`. The binaries land
in `src-tauri/binaries/` (gitignored), so a fresh clone always needs this step.

Windows builds run natively (MSVC + Node) or via WSL2; build a Windows `frostd`
sidecar and target `nsis`/`msi`. To run two instances on one machine (e.g. to
play coordinator and participant), give the second its own data dir:

```sh
FROST_APP_DATA_DIR=/tmp/frost-app-2 npm run tauri dev
```

See [`docs/RELEASE.md`](docs/RELEASE.md) for packaging and sidecar details.

## Tests

The core crate is Tauri-free and fully testable headlessly:

```sh
cd src-tauri && cargo test -p frost-app-core
```

`tests/ceremony_e2e.rs` spawns a real `frostd` and runs complete 3-party DKG +
2-of-3 signing ceremonies over TLS for both ciphersuites, plus a rejection path;
keystore tests cover the envelope format and recovery code. A headless smoke test
drives the full Tauri command layer (`cargo test -p frost-app --test smoke`).

## Layout

- `src-tauri/core` — `frost-app-core`: keystore, frostd transport (pinned-cert
  TLS), DKG/signing ceremony engines, and the Zcash wallet/PCZT send path. No
  Tauri dependency.
- `src-tauri/src` — Tauri adapter: commands, event forwarding, sidecar lifecycle.
- `src/` — React + TypeScript frontend.
- `scripts/PINNED_REV` — the frost-tools revision used for both the
  `frost-client` library dependency and the `frostd` sidecar build (they must
  match for wire compatibility).

## License

See repository headers. Third-party components (`frostd`, `cloudflared`) are
redistributed under their own licenses.

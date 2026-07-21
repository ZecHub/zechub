# Steward — Run & Test Guide

Everything here runs today. Three layers: **prove it's correct** (automated), **see it** (the
visual demo across real browsers), and **move real testnet money** (one human captcha step).

---

## 0. Prove it's correct — automated (~1 min)

```sh
cargo test --workspace                                   # core, coordinator, guardian-wasm
cargo build --manifest-path crates/steward-signer/Cargo.toml   # the isolated PCZT crate compiles
./scripts/demo-lifecycle.sh                              # (needs the coordinator running — see below)
```
Proves: 2-of-3 keygen + re-randomized signing verifying against `rk`; repaired share is
byte-identical; a share sealed with a passphrase co-signs on-device (guardian-wasm); a full
ceremony over HTTP; and the dead-man's-switch gate (403 while Active).

---

## 1. See it — the visual demo

Steward is **one app** with two sections — **My vaults** (you as an owner) and **Vaults I
guard** (you as a guardian of someone else's vault). A real person is both, so both live under
one wordmark. *(The old split owner-console/guardian apps in `web/owner-console` and
`web/guardian` are superseded — kept for reference, but nothing below runs them.)*

**Quickest — one command** (boots the coordinator + the unified app; Ctrl+C stops all):
```sh
./scripts/dev.sh
#   Steward app     → http://localhost:5175   (My vaults · Vaults I guard)
#   Coordinator API → http://127.0.0.1:8080
```
First run builds the coordinator (fast) and, once, the signer (a few minutes — enables on-chain
addresses). Vaults persist in `./steward-coordinator-data/`.

<details><summary>Or run the two yourself (2 terminals)</summary>

> **Run your own relay?** The coordinator is your infrastructure — it holds **no secret
> shares** and persists only public vault config to `STEWARD_DATA_DIR` (so a restart never
> orphans a vault). See **[SELF-HOST.md](SELF-HOST.md)**.

```sh
# terminal 1 — the coordinator (127.0.0.1:8080)
cargo run -p steward-coordinator

# terminal 2 — the unified Steward app → http://localhost:5175
cd web/steward && npm install && npm run dev
```
</details>

### The dead-man's-switch (owner alone)
1. Open **http://localhost:5175** → **My vaults** → **Seal a new vault** (leave the fast demo
   cadence).
2. On the vault home, watch the **heartbeat pulse**. Don't touch it: it slows, thins, and
   **flatlines** as the switch trips, and the whole instrument drifts **ember → flare → char**
   (lit → guttering → gone cold). **Send heartbeat** resets it.

### The full ceremony across real browsers (owner + 2 guardians, one machine)
1. **Owner (this window)** → **My vaults** → create a vault → the **"Distribute guardian
   shares"** step shows a copyable enrollment link per guardian. Each link is same-origin now
   (`http://localhost:5175/#enroll=…`) and opens the **Vaults I guard** section.
2. **Guardian 1:** open enrollment link A in a **separate Incognito/Private window** (guardians
   share `localStorage` per origin, so each guardian needs its own window, distinct from the
   owner's) → the share is prefilled → set a passphrase → **Seal & enroll** → **Unlock** → it
   starts **watching**. *(You can import an exported backup here instead of pasting a share.)*
3. **Guardian 2:** open enrollment link B in **another** Incognito window → passphrase → Enroll
   → Unlock → watching.
4. **Owner** → open the vault → **Convene a release** (relay mode). For an *inheritance*
   release, first let the switch trip (short cadence, no heartbeats) — each guardian
   independently verifies the owner's signed heartbeat and refuses to arm until it has lapsed;
   a *recovery sweep* is owner-authorized and works anytime.
5. Both guardians see the request with **what they're signing** → tap **Approve & co-sign**.
   The quorum seal fills 0 → 1 → 2 and closes; the owner's Release screen shows the aggregated
   signature. *(Solo? Use "Simulate (no live guardians)" — the coordinator co-signs in-process.)*

---

## 2. Move real testnet money — the on-chain path (no node needed)

The wallet DB syncs from the **public** endpoint `testnet.zec.rocks:443`; the only human step is
the faucet captcha. **Deriving/funding/checking balance now happens IN the app** (My vaults →
your vault → the On-chain panel) — no CLI needed until the actual spend.

> **Prereq:** build the signer binary once so the coordinator can derive addresses:
> `cargo build --manifest-path crates/steward-signer/Cargo.toml`

**In the app (My vaults):**
1. **Seal a new vault** → pick **Testnet** (the network toggle). The vault home's **On-chain**
   panel shows the vault's **`utest1…` address**.
2. **Get testnet coins →** copies the address + opens Fauzec. Paste it there, solve the captcha,
   claim 1 TAZ. *(This captcha is the one unavoidable human step.)*
3. **Sync** → scans the public endpoint and shows the balance. Testnet is quick (~7–15s);
   a **mainnet** scan of the same window is denser and takes **~1.5–2 min** ("Scanning the
   chain…" the whole time) — that's real trial-decryption work, not a hang.

**Then spend it — in the app (one click):** on the vault home hit **Send a payment →**, enter a
recipient address + an amount, and **Send payment**. Behind that one button the coordinator builds
the transaction, your guardians co-sign the **real** sighash in their app (the quorum seal fills as
they do), it broadcasts, and the app shows the **txid** with an explorer link. Solo / no live
guardians? Use **Simulate**. This is the `POST /vault/:id/spend` protocol call — any Steward app
makes the identical call; the reference app just wraps it in a form.

<details><summary>Or drive the raw pipeline yourself (CLI, same result)</summary>

```sh
AK=$(curl -s localhost:8080/vault/<vault-id> | python3 -c 'import sys,json;print(json.load(sys.stdin)["group_ak_hex"])')
SIGNER="cargo run --manifest-path crates/steward-signer/Cargo.toml --"
UFVK=$($SIGNER derive-vault --ak $AK --network test --json | python3 -c 'import sys,json;print(json.load(sys.stdin)["ufvk"])')
$SIGNER sync --ufvk $UFVK --network test                                       # populate this CLI's per-vault WalletDb
$SIGNER build-pczt --ufvk $UFVK --to <recipient-ua> --amount-zat 10000 --network test  # construct + Halo2-prove the spend
$SIGNER sign-and-broadcast -i vault-proven.pczt --vault-id <vault-id> \
    --mode relay --to <recipient-ua> --amount "0.0001 ZEC" --network test --json   # co-sign + broadcast → {"txid": …}
```
Run `$SIGNER --help` for exact flags.
</details>

**Mainnet:** seal the vault as **Mainnet** (`u1…` address); the same **Send a payment** button, funded
with a few cents of real ZEC (no faucet). Start with a **tiny** amount for the first real send.

**Status:** derive → fund → sync is proven live (no-node sync reached the chain tip in ~7s), and the
whole spend path — build → guardians co-sign the real sighash → broadcast → txid — is wired end to
end; the funded broadcast is exercised with a real note on-chain.

### Mainnet (hackathon compliance)
The ZecHub rule wants one real **mainnet** tx. Same flow against a mainnet endpoint
(`zec.rocks:443`), funded with a few cents of real ZEC — the only thing that needs real money.

---

## Troubleshooting
- **"port 8080 already in use"** → a coordinator is still running: `pkill -f target/debug/steward-coordinator`, or run `cargo run -p steward-coordinator -- --port 8081`.
- **Guardian link opens the wrong guardian** → each guardian needs a separate browser window (localStorage is per-origin). Use Incognito for the second.
- **Faucet 1 TAZ / address / 24h** — if rate-limited, derive a fresh vault (new `ak` → new address).

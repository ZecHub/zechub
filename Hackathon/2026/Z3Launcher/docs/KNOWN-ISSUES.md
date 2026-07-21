# Known Issues

Every issue below was found by running the stack for real — syncing testnet to tip, mining regtest
blocks, killing containers mid-write — and each one is documented with its symptom, root cause,
current status, and the workaround the launcher already ships. None of them is hidden behind a happy
path: where an upstream alpha component is the blocker, the launcher is built so the fix is a
one-line environment variable change, not a code change.

| # | Issue | Scope | Status |
|---|-------|-------|--------|
| 1 | Zallet alpha.3 crash-loops on NU6.2 chains | testnet, mainnet | **Resolved** — pinned `zodlinc/zallet:v0.1.0-alpha.4`, verified live; upgrading requires a wallet reset |
| 2 | Zallet wallet cannot be funded on regtest | regtest | Still true on alpha.4 (re-verified); use testnet + faucet |
| 3 | Fast-start bind-mount is too slow on macOS | macOS Docker | Named-volume path documented and preferred |
| 4 | Cold RocksDB opens take minutes | testnet, mainnet | Handled — launcher waits on container liveness |
| 5 | Zallet alpha RPC quirks | all networks | Worked around in launcher and dashboard |

Related docs: [README](../README.md), [Architecture](ARCHITECTURE.md), [API](API.md),
[Operations](OPERATIONS.md) (snapshot capture and restore recipes).

---

## 1. Zallet v0.1.0-alpha.3 crash-loops on NU6.2 networks (testnet and mainnet) — RESOLVED

> **Resolved 2026-07-04.** The launcher now pins `zodlinc/zallet:v0.1.0-alpha.4` (Zallet's images
> moved registries — `electriccoinco/zallet` stopped at alpha.3) and runs its `zallet-zaino`
> binary, which keeps alpha.3's embedded-indexer-over-RPC architecture. Verified live on a
> tip-synced testnet node: zero restarts, zero parse errors, wallet create/accounts/receive all
> work, and new RPCs (`getwalletstatus`, `z_shieldcoinbase`) answer. **One breaking change to
> know:** alpha.4 refuses wallet databases created by alpha.3 or earlier — Reset, then re-create
> or restore from the seed phrase after upgrading. On regtest, Zallet (alpha.4+) also validates
> coinbase consensus branch IDs, so `zallet.regtest.toml`'s `regtest_nuparams` must exactly match
> Zebra's `activation_heights` (they now do; see the comment in that file).
> The section below is kept for the record.

**Symptom.** With the previously pinned `electriccoinco/zallet:v0.1.0-alpha.3` image, the `zallet` container
enters a restart loop on testnet and mainnet. The dashboard shows "Waiting for Zallet… not
connected". The container log ends with a deserialization error while parsing Zebra's
`getblockchaininfo` response:

```
unknown variant 'NU6.2', expected one of Genesis, ..., NU5, NU6, NU6.1, NU7
Failed to initialize zallet
```

Verified live on 2026-06-27 against a tip-synced testnet node (12 consecutive restarts observed).

**Root cause.** NU6.2 activated on 2026-06-03 (testnet height 4,052,000; mainnet height 3,364,600;
branch ID `0x5437f330`). Zallet talks to Zebra directly (`[indexer] validator_address =
"zebra:8232"` in every `deploy/compose/zallet/zallet.*.toml`) and parses `getblockchaininfo` with
the `zaino-fetch` crate bundled into the alpha.3 binary. That crate's `NetworkUpgrade` enum predates
NU6.2, so the parse fails and Zallet exits before serving RPC. This is not a launcher bug and not a
Zaino bug: the standalone `zingodevops/zainod:0.4.1` indexer already has the fix, which is why Zaino
runs fine on the same chain. Bumping `ZAINO_IMAGE` does nothing here — the broken enum is compiled
into Zallet itself.

**Resolution.** NU6.2 support landed in zaino 0.4.0 (2026-06-17), consumed by Zallet
v0.1.0-alpha.4 (2026-06-25, [github.com/zcash/zallet](https://github.com/zcash/zallet)). The
release was initially source-only; on 2026-07-02 official multi-arch Docker images were published
under **`zodlinc/zallet`** (not `electriccoinco/zallet`, which remains at alpha.3). The alpha.4
image ships three binary names — `zallet` (now the new zebra-state backend, which reads Zebra's
state database directly) and `zallet-zaino` / `zallet-zebra-state` — so the compose services pin
`entrypoint: ["zallet-zaino"]` to keep the same architecture alpha.3 used. The default pin lives
in `internal/config/config.go` (`DefaultImages`) and every Zallet service still honors the
`ZALLET_IMAGE` override.

---

## 2. The Zallet wallet cannot be funded on regtest

**Symptom.** Mining blocks to the wallet's own transparent receiver never produces a spendable
balance. Verified empirically: 110 coinbase blocks were mined via Zebra's `generate` RPC directly to
the wallet's own p2pkh receiver (extracted from its unified address with `z_listunifiedreceivers`).
Zallet synced to the tip and logged `poll_transparent: Fetching mined UTXOs`, but `z_listunspent`
and `z_gettotalbalance` both stayed at 0.

**Root cause.** Three constraints stack on top of each other:

1. Regtest coins only come from mining, and coinbase outputs are always transparent.
2. Transparent coinbase has 100-block maturity, and Zcash consensus additionally requires coinbase
   to be shielded before it can be spent onward (no transparent-to-transparent coinbase spend).
3. Zallet is a shielded-first alpha wallet: it does not surface transparent coinbase as spendable.
   `z_sendmany` from a coinbase-backed source returns `Insufficient balance (have 0, …)`, and the
   `ANY_TADDR` source returns "legacy account currently unsupported for spending" — the help text
   links the open upstream TODO (zcash/wallet#137).

The regtest seeder's "wallet RPCs not available — enable Zallet for funded accounts" message is the
same limitation from the other side: it was designed to fund addresses through a zcashd wallet,
which this stack does not run as a wallet.

**Status.** Not fixable in the launcher — this is consensus behavior plus an upstream alpha-wallet
gap. A zcashd-based funding bridge (zcashd can spend coinbase after shielding) was evaluated and
deferred as out of scope.

**Re-verified on alpha.4 (2026-07-04).** The alpha.4 upgrade looked promising — it adds
`z_shieldcoinbase` and its notes claim direct transparent-output detection while scanning — so the
experiment was repeated on the new image: fresh wallet, account created after the new
`-28: Wallet sync required` gate cleared, 110 blocks mined to the wallet's own p2pkh receiver
(both the diversifier-0 and diversifier-2 addresses were tried), plus a 100-block maturity
buffer. The wallet scanned every block to the tip (`getwalletstatus` wallet_tip == node_tip),
stayed up with zero restarts — but no transparent balance was ever credited, and
`z_shieldcoinbase <account-uuid|taddr> <ua>` fails with `Insufficient balance (have 0, need
10000)`. (Its `"*"` wildcard is explicitly unsupported in Zallet.) So the funding gap persists on
alpha.4; only the crash-loop (issue 1) is fixed.

**Workaround.** For any demo that needs a funded balance or a real send, use **testnet plus a
faucet**: the faucet delivers test-ZEC to the wallet's shielded address as an ordinary note, which
Zallet scans and spends reliably. With issue 1 resolved this path is now unlocked. Regtest remains
the right network for the instant-stack, create-wallet, and receive-address story.

---

## 3. Fast-start bind-mount attach is too slow on macOS Docker

**Symptom.** The dashboard's one-click "Attach & Restart" (`POST /api/faststart/attach`) completes
its validated mount swap and recreates Zebra, but on macOS the node never reaches ready: Zebra's RPC
times out while opening the database. The `-faststart <dir>` CLI flag exhibits the same
characteristic for long-running use on macOS.

**Root cause.** The attach path swaps `Z3_ZEBRA_CACHE_MOUNT` from the default named volume to a host
bind-mount of your snapshot directory, then force-recreates Zebra. The swap itself is verified and
correct (the snapshot is inspected and its RocksDB layout and format version validated first —
`internal/faststart`). The problem is I/O: on macOS Docker (Colima, virtiofs) a live RocksDB served
across the host file-sharing layer is an order of magnitude slower than a named volume, and Zebra's
cold open plus steady-state reads cannot keep up. On Linux, where a bind-mount is a native mount,
the attach path performs as designed.

**Status.** Working as designed on Linux; documented limitation on macOS. The validation logic
(state-version parsing, network match, RocksDB `CURRENT`/`MANIFEST` checks) is shared by both paths
and works everywhere — "Check Data" in the dashboard is always safe to run.

**Workaround.** On macOS, keep Zebra on the named volume and copy the snapshot *into* it once,
instead of serving it across the bind-mount forever. Stream it with tar (minutes; a plain `cp`
through the mount is roughly 10x slower):

```bash
tar cf - -C ~/z3-testnet-snapshot . | docker run -i --rm \
  -v z3-testnet_zebra-cache:/dst alpine sh -c "tar xf - -C /dst && chown -R 0:0 /dst"
```

The full capture-and-restore recipe, including why ownership is `0:0`, is in
[Operations](OPERATIONS.md).

---

## 4. Cold database opens take minutes; unclean shutdown makes it worse

**Symptom.** After a restart, a synced testnet node (a 9–28 GB RocksDB cache) sits with its RPC port
refusing connections for one to five minutes or more before answering. After an unclean kill (e.g.
`docker kill`, host crash), the open can exceed ten minutes.

**Root cause.** Opening a large RocksDB is CPU-bound, and the pinned `zfnd/zebra:5.2.0` image is a
debug-assertions build, which slows it further. An unclean shutdown leaves the write-ahead log
unflushed, forcing WAL recovery on the next open.

**Status.** Handled. The launcher's readiness wait (`internal/launcher/stack.go`, `WaitReady`) does
not treat a slow open as failure: when the probe error budget is exhausted, it checks actual
container liveness via `docker compose ps` (`zebraAlive`) and keeps waiting as long as the Zebra
container is `running`. Only a container that has genuinely died — crashed daemon, wrong port — trips
the "zebra unreachable" error (about a two-minute budget). This fixed a real bug where a slow open
aborted startup and Zaino never started.

**Workaround.** Keep opens fast by shutting down cleanly: Ctrl-C the launcher, then

```bash
docker compose -p z3-testnet -f deploy/compose/docker-compose.yml down   # no -v
```

The SIGTERM gives RocksDB time to flush, so the next open skips WAL recovery. Never `docker kill`
a healthy Zebra if you can avoid it.

---

## 5. Zallet alpha RPC quirks the launcher works around

Zallet is an alpha, and its RPC surface has sharp edges. Each one below was discovered empirically
against the live stack (alpha.3, re-checked on alpha.4 where noted) and is already absorbed by the
launcher or dashboard, but you will hit them if you script against the wallet RPC directly (see
[API](API.md)).

| Quirk | Behavior | How the launcher handles it |
|-------|----------|------------------------------|
| Fresh wallet has zero accounts | A newly created or restored wallet has a seed but no accounts, so receive/send do not work yet | The dashboard auto-creates account 0 ("Main") once via `z_getnewaccount` on first wallet open (`web/src/components/WalletDashboard.tsx`) |
| Account RPCs gated on initial sync (alpha.4) | Until the first wallet scan completes, `z_getnewaccount` fails with `-28: Wallet sync required` | The dashboard's auto-account retry loop rides the gate out; scripts should poll until `-28` clears (fast on regtest, minutes on a fresh testnet wallet) |
| `mnemonic_seedfp` is a stub | `getwalletinfo` returns a placeholder for `mnemonic_seedfp` (upstream TODO, still logged by alpha.4) rather than the real seed fingerprint | Nothing relies on it; per-account `seedfp` from `z_listaccounts` is used instead |
| `z_getnewaccount` needs a named param | Positional `[]` fails with "No more params"; `{}` fails with "missing field account_name" — you must send `{"account_name": "…"}` | The dashboard and the `/api/wallet/rpc` proxy pass named params through as-is |
| No `z_getbalanceforaccount` | The method returns "Method not found" (alpha.3 and alpha.4); `z_gettotalbalance` is wallet-wide only | Per-account balances are computed by aggregating `z_listunspent` (each note carries `account_uuid`, `pool`, `value`) |
| `z_shieldcoinbase` rejects `"*"` (alpha.4) | The zcashd-style wildcard from-address returns "the `"*"` wildcard (sweep all wallet t-addrs) is not supported by Zallet" — pass a wallet-owned t-addr or an account UUID | Callers scope the sweep explicitly; note it still finds nothing on regtest (issue 2) |
| `generate-mnemonic` is not idempotent | Every invocation silently stores a *new* seed (exit 0); a multi-seed wallet then fails `z_getnewaccount` with "Wallet has more than one seed; seedfp must be provided" | The launcher never chains it in compose `depends_on`; `EnsureZalletWallet` runs it at most once, gated on `init-wallet-encryption` reporting a freshly created wallet (init errors "already initialized" on re-run, which is the idempotency signal) |
| `z_sendmany` is async | It returns an operation id, not a txid; the fee param must be `null` (ZIP-317 auto) | Callers poll `z_getoperationstatus` for `success`/`failed` and read `result.txid` |

These are upstream alpha characteristics, not launcher defects. As Zallet stabilizes, the
workarounds shrink to nothing — the wallet integration is deliberately isolated behind the
`ZALLET_IMAGE` variable and the launcher-driven init sequence so newer images slot in without code
changes.

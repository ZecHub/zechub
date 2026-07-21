# Zcash regtest funding stack (zcashd)

A single-node regtest environment for testing a **shielded-only** wallet against
the Orchard pool: mine funds, shield them straight into your wallet's Orchard
unified address, then exercise your account-to-account send.

- **zcashd** — the node. Drives the chain, mines, and does the `t → Orchard`
  shielding your wallet can't do itself.
- **lightwalletd** — the gRPC endpoint your wallet syncs against (`:9067`).

## Prerequisites

- Docker Engine + Compose v2
- `jq` on the host (used by `fund.sh`)

## Quick start

```bash
cd support/zcash

make up                          # build + start (first build fetches ~1.7GB params)
make fund UA=<your-orchard-ua>   # mine to maturity + shield into your UA
make info                        # confirm height + Orchard pool value
```

`<your-orchard-ua>` is a regtest unified address **from your wallet's seed**
(a `uregtest1...` address with an Orchard receiver). The funds land at an
address your wallet controls, so after syncing it can spend them.

Wipe and start over:

```bash
make reset && make up
```

## Connect your wallet

```
server = 127.0.0.1:9067
```

lightwalletd here is plaintext (`--no-tls-very-insecure`). If your client
defaults to TLS, disable it for this endpoint or it won't connect.

Then run your actual test: sync, confirm the Orchard balance in account 0, and
send account 0 → account 1.

## How funding works

`fund.sh` mines past coinbase maturity (100 blocks), then:

```
z_shieldcoinbase "*" <UA> null 0 null "AllowRevealedSenders"
```

This sweeps every mature coinbase UTXO directly into the Orchard receiver of
your UA in one shielding transaction (no Sapling hop), waits for the operation
to succeed, and mines a few blocks to confirm it.

If your zcashd build rejects a unified address as the `z_shieldcoinbase`
destination, shield to a Sapling `zregtestsapling...` address first and then
`z_sendmany` that to your Orchard UA — but current zcashd accepts the UA
directly, so try the one-step path first.

## Handy commands

```bash
make cli ARGS="getblockcount"
make cli ARGS="getblockchaininfo"
make logs
```

## Notes

- Regtest only. The open RPC bind and `notsecure` password must never be used
  outside a local throwaway network.
- Orchard is active from block 1 (all upgrades through NU6.2 activated in
  `zcashd/zcash.conf`).
- If `generate` errors as disabled on your zcashd version, add
  `allowdeprecated=generate` to `zcashd/zcash.conf` and `make reset && make up`.

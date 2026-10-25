# The Zcash Devtool

[What is the zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

The Zcash Devtool is a platform for hacking on Zcash. It is built by developers, for developers, for testing & development of new Zcash functionality; and should not be considered production-ready. The command line API that this tool exposes can & will change at any time and without warning. DO NOT commit significant funds to the management of the zcash-devtool embedded wallet.

### Video tutorial of Zcash Devtool:
Kris Nuttycombe (@nuttycom) presented this tool during ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

For a step by step guide for how to get started using these tools, see [this walkthrough](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). It documents a full walkthrough of how to set up and use the zcash devtool tooling. It is intended to serve as a guide for how to get setup and how to add your own functionality to the tool.

## Quick start

The commands below were checked against zcash-devtool `main` (commit `5a26ee8`, August 2026). The tool changes without notice, so run `--help` on any command if something here no longer matches.

### Install

There are no prebuilt binaries. Install [Rust](https://rustup.rs), then build from source:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

The examples below call the built binary, `target/release/zcash-devtool`. `cargo run --release -- ...` works the same way.

### Create a testnet wallet

Start on testnet. Testnet coins (TAZ) have no value.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` is the wallet directory. It goes after `wallet` and before the subcommand.
- `-i` is an [age](https://age-encryption.org) identity file. The wallet's mnemonic phrase is encrypted to it, and the file is created if it doesn't exist. Keep it: `send`, `shield` and other spending commands need it to decrypt the seed.
- `-n` is the network: `test` or `main`.
- `-s` picks the light wallet server. The default, `zecrocks`, connects to the zec.rocks server for the chosen network.
- To restore an existing wallet, use `restore-mnemonic` in place of `init`. It prompts for the phrase.

`balance` lists each pool separately, including Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Run `zcash-devtool wallet -w ./my-wallet list-addresses` to see the wallet's unified address, and send it testnet funds from a [faucet](https://zechub.wiki/using-zcash/faucets).

For mainnet, pass `-n main` to `init`. Only use amounts you can afford to lose.

### Send and shield

Amounts are in zatoshis (1 ZEC = 100,000,000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` shows the transaction a `send` would build, without sending it. `list-tx` and `list-unspent` show the wallet's history and notes.

Any command that talks to a server also accepts `--connection tor`, which routes the connection through the built-in Tor client.

### Inspect addresses, keys and transactions

`inspect` decodes Zcash data offline: addresses, keys, and raw transactions. Add `--lookup` to fetch more information from the chain, such as a transaction by its ID.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Ironwood notes are sent to the same Orchard receiver in a unified address, so addresses did not change with NU6.3.

### Build transactions in steps with PCZTs

A PCZT (partially created Zcash transaction) splits building a transaction into separate steps: create, prove, sign, and send. Each step can run on a different machine, for example with a hardware signer such as Keystone. Each `pczt` command reads the PCZT from a file or stdin and writes it to a file (`--output`) or stdout, so the steps can be piped:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` lists the other steps, including `inspect`, `redact`, `combine`, `extract` and `shield`.

### Move funds from Orchard to Ironwood

Since NU6.3, Orchard funds can only move to the wallet's own addresses. The `migration` commands move them into Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` previews the note splits and the transfer schedule, and changes nothing.
- `commit` builds and pre-signs the first preparation transactions. Add `--external` to leave them unsigned for an external signer such as Keystone.
- `status` shows the migration's progress and the next step.
- `advance` proves the next transaction whose anchor is ready.

The migration commands are still being built. `advance` stops at the first transaction that is ready to broadcast, because broadcasting is not implemented in the tool yet. For everyday use, move funds with a wallet that supports Ironwood. See [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools).


**Security Warnings:**
DO NOT USE THIS IN PRODUCTION!!!
The app has not been written with security in mind. It does however have affordances such as encryption of the mnemonic seed phrases that should make it viable for small scale experimentation, at your own risk.

### Advanced (librustzcash tutorial )


[view video here](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)



## Zingolib
[![license](https://img.shields.io/github/license/zingolabs/zingolib)](LICENSE) [![coverage](https://img.shields.io/endpoint?url=https://zingolabs.org/zingolib/coverage/badge.json)](https://zingolabs.org/zingolib/coverage/)
This repo provides both a library for zingo-mobile, as well as an included cli application to interact with zcashd via lightwalletd.

# Security Vulnerability Disclosure

If you believe you have discovered a security issue, please contact us at:

zingodisclosure@proton.me

## Zingo CLI
`zingo-cli` is a command line lightwalletd-proxy client. To use it, see "compiling from source" below. Releases are currently only provisional, we will update the README as releases come out.

## Privacy
* While all the keys and transaction detection happens on the client, the server can learn what blocks contain your shielded transactions.
* The server also learns other metadata about you like your ip address etc...
* Also remember that t-addresses are publicly visible on the blockchain.
* Price information is retrieved from Gemini exchange.

### Note Management
Zingo-CLI does automatic note and utxo management, which means it doesn't allow you to manually select which address to send outgoing transactions from. It follows these principles:
* Defaults to sending shielded transactions, even if you're sending to a transparent address
* Can select funds from multiple shielded addresses in the same transaction
* Will automatically shield your sapling funds at the first opportunity
    * When sending an outgoing transaction to a shielded address, Zingo-CLI can decide to use the transaction to additionally shield your sapling funds (i.e., send your sapling funds to your own orchard address in the same transaction)
* Transparent funds are only spent via explicit shield operations

## Compiling from source

#### Pre-requisites
* Rust v1.90 or higher.
    * Run `rustup update` to get the latest version of Rust if you already have it installed
* Rustfmt
    * Run `rustup component add rustfmt` to add rustfmt
* Build Tools
    * Please install the build tools for your platform. On Ubuntu `sudo apt install build-essential gcc libsqlite3-dev`
* Protobuf Compiler
    * Please install the protobuf compiler for your platform. On Ubuntu `sudo apt install protobuf-compiler`
* cargo-make and cargo-nextest for reproducible local test runs
    * Run `cargo install cargo-make cargo-nextest`
```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
./target/release/zingo-cli --data-dir /path/to/data_directory/
```

This will launch the interactive prompt. Type `help` to get a list of commands.

## Testing

Use `makers run` or `cargo make run` to run the same default nextest shape used by PR CI inside a reproducible local container image:

```
makers run
```

The task builds the image if needed, symlinks the image-provided `lightwalletd`, `zcashd`, `zcash-cli`, and `zainod` into `test_binaries/bins`, then runs the workspace with the `ci` nextest profile, two retries, and the default filter `not test(slow)`. The image tag is derived from `.env.testing-artifacts`, `rust-toolchain.toml`, and `docker-ci`.

Extra nextest flags can be forwarded after the task name, and the default filter can be changed with `ZINGOLIB_NEXTEST_FILTER`.

```
makers run -p zingo-memo
ZINGOLIB_NEXTEST_FILTER='package(zingolib) & not test(slow)' makers run
makers rerun
```

To run the containerized test suite with all features enabled, pass `--all-features` through to nextest:

```
makers run --all-features
```

This still applies the default `not test(slow)` filter. To match `cargo nextest run --all-features` more closely, clear the default filter:

```
ZINGOLIB_NEXTEST_FILTER= makers run --all-features
```

Use `makers local-run` to run the same nextest command on the host.

## Notes:
* If you want to run your own server, please see [zingo lightwalletd](https://github.com/zingolabs/lightwalletd), and then run `./zingo-cli --server http://127.0.0.1:9067`
* The default log file is in `~/.zcash/zingo-wallet.debug.log`. A default wallet is stored in `~/.zcash/zingo-wallet.dat`
* If a server is not specified, the default indexer/lightwallet server is "https://zec.rocks:443".

## Running in non-interactive mode:
You can also run `zingo-cli` in non-interactive mode by passing the command you want to run as an argument. For example, `zingo-cli addresses` will list all wallet addresses and exit.
If you need to sync the wallet first before running the command, use --waitsync argument. This is useful for example for `zingo-cli balance`.
Run `zingo-cli help` to see a list of all commands.

## Options
Here are some CLI arguments you can pass to `zingo-cli`. Please run `zingo-cli --help` for the full list.

* `--data-dir`: uses the specified path as data directory. This is required when not using the `--regtest` option.
    * Example: `./zingo-cli --data-dir /path/to/data_directory/` will use the provided directory to store `zingo-wallet.dat` and logs. If the provided directory does not exist, it will create it.
* `--waitsync`: Wait for sync before running a command in non-interactive mode or entering the command prompt in interactive mode.
    * Example: `./zingo-cli --data-dir /path/to/data_directory/ --waitsync balance`
* `--server`: Connect to a custom zcash lightwalletd server.
    * Example: `./zingo-cli --data-dir /path/to/data_directory/ --server 127.0.0.1:9067`
* `--seed`: Restore a wallet from a seed phrase. Note that this will fail if there is an existing wallet. Delete (or move) any existing wallet to restore from the 24-word seed phrase
* `--birthday`: Specify wallet birthday when restoring from seed. This is the earliest block height where the wallet has a transaction.
    * Example: `./zingo-cli --data-dir /path/to/data_directory/ --seed "twenty four words seed phrase" --birthday 1234567`
* `--recover`: Attempt to recover the seed phrase from a corrupted wallet

## Regtest
Please see `zingo-cli/README.md` for details of running zingo-cli in regtest mode with a local network.

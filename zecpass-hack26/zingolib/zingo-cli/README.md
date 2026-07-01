# Zingo CLI

A command-line interface for the Zingo wallet.

## Building

To build the zingo-cli binary from the workspace:

```bash
cargo build --release -p zingo-cli
```

The binary will be available at `target/release/zingo-cli`.

## Running

By default, zingo-cli stores wallet data in a `wallets/` directory in the current working directory.

The `--chain` argument allows you to select which network to connect to. If not specified, it defaults to mainnet.

### Mainnet

To connect to mainnet (default):

```bash
# Uses default wallet location: ./wallets/
./target/release/zingo-cli

# Or explicitly specify mainnet:
./target/release/zingo-cli --chain mainnet

# Or specify a custom data directory:
./target/release/zingo-cli --data-dir /path/to/mainnet-wallet
```

### Testnet

To connect to testnet:

```bash
# Uses default wallet location: ./wallets/
./target/release/zingo-cli --chain testnet

# Or specify a custom data directory:
./target/release/zingo-cli --chain testnet --data-dir /path/to/testnet-wallet
```

### Regtest Mode

To run in regtest mode:
1. Build the zingo-cli binary.
2. Launch a validator, see details below for an example of launching zcashd and generating blocks with zcash-cli.
3. Launch an indexer/lightserver, see details below for an example of launching lightwalletd.
4. Create a wallet directory (data-dir) and run zingo-cli,
```bash
./target/release/zingo-cli --chain regtest --server 127.0.0.1:9067 --data-dir ~/tmp/regtest_temp
```

**Note:** The zcash_local_net crate will soon offer a binary for simplifying the process of launching and interacting with the local network.
https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net

#### Example: Launching a Local Network

1. Create a directory for zcashd with a `data` directory inside.
2. Add a `zcash.conf` config file to the main zcashd directory, see below for an example config.
3. Run zcashd:
```bash
zcashd --printtoconsole --conf=/home/user/tmp/zcashd_regtest/zcash.conf --datadir=/home/user/tmp/zcashd_regtest/data -debug=1
```
4. Create a directory for lightwalletd with a `data` and `logs` directory inside.
5. Create a `lwd.log` file inside the `logs` directory.
6. Add a `lightwalletd.yml` config file to the main lightwalletd directory, see below for an example config.
7. In a new command prompt, run lightwalletd:
```bash
lightwalletd --no-tls-very-insecure --data-dir /home/user/tmp/lwd_regtest/data/ --log-file /home/user/tmp/lwd_regtest/logs/lwd.log --zcash-conf-path /home/user/tmp/zcashd_regtest/zcash.conf --config /home/user/tmp/lwd_regtest/lightwalletd.yml
```
8. In a new command prompt, generate blocks:
```bash
zcash-cli -conf=/home/user/tmp/zcashd_regtest/zcash.conf generate 1
```

### Example: Zcashd Config File

```
### Blockchain Configuration
regtest=1
nuparams=5ba81b19:1 # Overwinter
nuparams=76b809bb:1 # Sapling
nuparams=2bb40e60:1 # Blossom
nuparams=f5b9230b:1 # Heartwood
nuparams=e9ff75a6:1 # Canopy
nuparams=c2d6d0b4:1 # NU5 (Orchard)
nuparams=c8e71055:1 # NU6
nuparams=4dec4df0:1 # NU6_1 https://zips.z.cash/zip-0255#nu6.1deployment

### MetaData Storage and Retrieval
# txindex:
# https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_conf_guide.html#miscellaneous-options
txindex=1
# insightexplorer:
# https://zcash.readthedocs.io/en/latest/rtd_pages/insight_explorer.html?highlight=insightexplorer#additional-getrawtransaction-fields
insightexplorer=1
experimentalfeatures=1
lightwalletd=1

### RPC Server Interface Options:
# https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_conf_guide.html#json-rpc-options
rpcuser=xxxxxx
rpcpassword=xxxxxx
rpcport=8232
rpcallowip=127.0.0.1

# Buried config option to allow non-canonical RPC-PORT:
# https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_conf_guide.html#zcash-conf-guide
listen=0

i-am-aware-zcashd-will-be-replaced-by-zebrad-and-zallet-in-2025=1

### Zcashd Help provides documentation of the following:
mineraddress=uregtest1zkuzfv5m3yhv2j4fmvq5rjurkxenxyq8r7h4daun2zkznrjaa8ra8asgdm8wwgwjvlwwrxx7347r8w0ee6dqyw4rufw4wg9djwcr6frzkezmdw6dud3wsm99eany5r8wgsctlxquu009nzd6hsme2tcsk0v3sgjvxa70er7h27z5epr67p5q767s2z5gt88paru56mxpm6pwz0cu35m
minetolocalwallet=0 # This is set to false so that we can mine to a wallet, other than the zcashd wallet.
```

### Example: Lightwalletd Config File

```
grpc-bind-addr: 127.0.0.1:9067
cache-size: 10
log-file: /home/user/tmp/lwd_regtest/logs/lwd.log
log-level: 10
zcash-conf-path: /home/user/tmp/zcashd_regtest/zcash.conf
```

## Exiting the CLI

To quit the Zingo CLI, use the `quit` command (not `exit`).

**Note:** Each network (mainnet, testnet, regtest) requires its own wallet data. If you get an error about wallet chain name mismatch, ensure you're using the correct data directory for your chosen network.

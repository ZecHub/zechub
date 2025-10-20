# Build as standalone server

```
cargo b --release --bin warp-rpc --features=rpc
./target/release/warp-rpc
```

# Configuration

Edit `Rocket.toml`

```
[default]
allow_backup = true
allow_send = true

yec = { db_path = "./yec.db", lwd_url = "https://lite.ycash.xyz:9067" }
zec = { db_path = "./zec.db", lwd_url = "https://mainnet.lightwalletd.com:9067" }
```


# RPC

TODO
```
set_lwd,
set_active,
new_account,
list_accounts,
sync,
rewind,
get_latest_height,
get_backup,
get_balance,
get_address,
get_tx_history,
pay,
```

## NodeJS

NodeJS bindings are incomplete/unsupported and maybe dropped at any time.

- Install `nj-cli` (one time)
- Edit `Cargo.toml`
- Build
- Use

Ex:
```
$ cargo install nj-cli
$ vim Cargo.toml
...
[lib]
#name = "warp_api_ffi"
crate-type = ["cdylib"]
...
$ nj-cli build --release -- --features=nodejs
$ node warp.js
```
# Instructions for setting up Zingolib CLI wallet with Zaino


## Z^3: (zebrad)(zaino)(zingo-cli)

* `zebrad    : zcash full node`
* `zaino     : zcash blockchain indexer`
* `zingo-cli : zcash command line zaino-proxy client (subset of Zingolib)`


## Big Picture

https://github.com/zingolabs/zaino/blob/dev/docs/live_system_architecture.pdf
```
\0/
 |
/ \

Zcash
User     => Installs/Compiles Zingolib
            Which gives access to zingo-cli
            They can send/recieve ZEC as needed   


         =>  zingo-cli connects to zaino either
             locally or via a secure channel online [Zcash user doesnt care how this works!]
             zaino allows access to either zebrad or zcashd



         => fully synced zebrad is source of truth (no more wallets here!)
```


## Installation

You will need to intall 3 things for this to work correctly.
I also recommending screen or something similar to help with screen management

`sudo apt install screen`


### zebrad
```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo install --git https://github.com/ZcashFoundation/zebra --tag v2.0.1 zebrad
```
 
*optional* (create a screen session for zebrad)
`screen -S zebra`

 `zebrad start`

note: this will need to fully sync! 

### zaino
```
git clone https://github.com/zingolabs/zaino.git
cd zaino
cargo build --release
PATH=$PATH:~/Desktop/zaino/target/release/
```

*optional* (create a screen session for zaino)

`screen -S zaino`

```
cd ~/zaino/zainod
nano zindexer.toml  => Adjust port to 8232 for mainnet
zainod --config zindexer.toml
```

### zingo-cli
```
git clone https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release --package zingo-cli
```
*optional* (create a screen session for zingo-cli)

`screen -S zingo`

`./zingo-cli --server http://127.0.0.1:8137 --data-dir /media/zebra5/zebra/.cache/lightwalletd`


note: this will need to fully sync, just like lightwalletd did. I recommend using an external drive to save time :)


## Running

If your running these in screens, screen -r will list each screen for you to move to as needed

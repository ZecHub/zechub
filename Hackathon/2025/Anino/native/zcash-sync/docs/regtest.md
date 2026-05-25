# Testing on regtest

## Requirements

1. zcashd
2. zcash-cli
3. lightwalletd

Then,
* Both apps should be accessible from your `PATH`
* Create a directory and `cd` to it.

## Zcashd

- Configuration `zcash.conf`:
```toml
regtest=1
nuparams=c2d6d0b4:1
txindex=1
insightexplorer=1
experimentalfeatures=1
rpcuser=user
rpcpassword=s!NWfgM!5X55
```
- Start zcashd
- Check status
- Create a new account
- Get a new address
- List addresses
- Mine 200 blocks
- Check balance
- Shield coinbase to our zaddr. Don't forget to update the example
- Check result
- Mine 10 block
- Check balance

Example
```sh
$ zcashd -datadir=$PWD --daemon
$ zcash-cli -datadir=$PWD getinfo
$ zcash-cli -datadir=$PWD z_getnewaccount
$ zcash-cli -datadir=$PWD z_getnewaddress
$ zcash-cli -datadir=$PWD listaddresses
$ zcash-cli -datadir=$PWD generate 200
$ zcash-cli -datadir=$PWD getbalance
$ zcash-cli -datadir=$PWD z_sendmany "ANY_TADDR" '[{"address": "zregtestsapling1flaha7huh4vzlj5zlh29xca2u8wf8ygh2vl4t2v4nlada39fc5hm4tl2dpdp6ewzjadvj9cewzh", "amount": 624.99999}]'
$ zcash-cli -datadir=$PWD z_getoperationresult
$ zcash-cli -datadir=$PWD generate 10
$ zcash-cli -datadir=$PWD z_gettotalbalance
```

zcash-cli -datadir=$PWD z_sendmany "ANY_TADDR" '[{"address": "zregtestsapling12qlzvqkla5ysscxx9l4dn69m7zwjggplap4gp3x9r0mnk868whgpxc03atkj83zh3xqgz0rguq0", "amount": 62.49999}]'

zcash-cli -datadir=$PWD z_sendmany "ANY_TADDR" '[{"address": "zregtestsapling1zdrds45f09kxhzq3ak2p6j6qj9a094tjp955f9nmk44ke5qm8xsrpncauxrx3efh76euq78nhyt", "amount": 624.99999}]'


## Lightwalletd

- Start lightwalletd

```sh
$ lightwalletd --no-tls-very-insecure --zcash-conf-path $PWD/zcash.conf --data-dir . --log-file /dev/stdout
```

## Test zcash-sync

From project directory,

`Rocket.toml` should have

```toml
zec = { db_path = "./zec.db", lwd_url = "http://127.0.0.1:9067" }
```

- Build
- Run
- Create account using the test seed phrase: `bleak regret excuse hold divide novel rain clutch once used another visual forward small tumble artefact jewel bundle kid wolf universe focus weekend melt`
- Sync
- Check balance: 624999000
- Check latest height
- Get UA address

```sh
$ cargo b --features rpc --bin warp-rpc
$ ../../target/debug/warp-rpc 
$ curl -X POST -H 'Content-Type: application/json' -d '{"coin": 0, "name": "test", "key": "bleak regret excuse hold divide novel rain clutch once used another visual forward small tumble artefact jewel bundle kid wolf universe focus weekend melt"}' http://localhost:8000/new_account
$ curl -X POST 'http://localhost:8000/sync?offset=0'
$ curl -X GET http://localhost:8000/balance
$ curl -X GET http://localhost:8000/latest_height
$ curl -X GET http://localhost:8000/unified_address?t=1\&s=1\&o=1
```

zcash-cli -datadir=$PWD z_sendmany "zregtestsapling1zdrds45f09kxhzq3ak2p6j6qj9a094tjp955f9nmk44ke5qm8xsrpncauxrx3efh76euq78nhyt" '[
{"address": "tmWXoSBwPoCjJCNZjw4P7heoVMcT2Ronrqq", "amount": 100},
{"address": "zregtestsapling1qzy9wafd2axnenul6t6wav76dys6s8uatsq778mpmdvmx4k9myqxsd9m73aqdgc7gwnv53wga4j", "amount": 100},
{"address": "uregtest1mzt5lx5s5u8kczlfr82av97kjckmfjfuq8y9849h6cl9chhdekxsm6r9dklracflqwplrnfzm5rucp5txfdm04z5myrde8y3y5rayev8", "amount": 100}
]' 1 0.00001 "AllowRevealedRecipients"




zcash-cli -datadir=$PWD z_sendmany "ANY_TADDR" '[{"address": "zregtestsapling1rlf8jpvk6qymgsn6pclkpnee0u77pajpz5g7955uzrxsefc837h326rkjag7rwuhn2cyympd8jh", "amount": 6.24999}]'
zcash-cli -datadir=$PWD z_sendmany "zregtestsapling1rlf8jpvk6qymgsn6pclkpnee0u77pajpz5g7955uzrxsefc837h326rkjag7rwuhn2cyympd8jh" '[{"address": "tmWXoSBwPoCjJCNZjw4P7heoVMcT2Ronrqq", "amount": 6.24997}]'
zcash-cli -datadir=$PWD z_sendmany "zregtestsapling1rlf8jpvk6qymgsn6pclkpnee0u77pajpz5g7955uzrxsefc837h326rkjag7rwuhn2cyympd8jh" '[{"address": "uregtest1mzt5lx5s5u8kczlfr82av97kjckmfjfuq8y9849h6cl9chhdekxsm6r9dklracflqwplrnfzm5rucp5txfdm04z5myrde8y3y5rayev8", "amount": 6.24997}]' 1 0.00001 "AllowRevealedAmounts"

## Addresses

- t
tmWXoSBwPoCjJCNZjw4P7heoVMcT2Ronrqq

- s
zregtestsapling1qzy9wafd2axnenul6t6wav76dys6s8uatsq778mpmdvmx4k9myqxsd9m73aqdgc7gwnv53wga4j

- o
uregtest1mzt5lx5s5u8kczlfr82av97kjckmfjfuq8y9849h6cl9chhdekxsm6r9dklracflqwplrnfzm5rucp5txfdm04z5myrde8y3y5rayev8

- ts
uregtest1yvucqfqnmq5ldc6fkvuudlsjhxg56hxph9ymmcnmpzpywd752ym8sr5l5d24wqn4enz3gakk6alf5hlpw2cjs3jjrcdae3nksrefyum5x400f9gs3ak9yllcr8czhrlnjufuuy7n5mh

- to
uregtest1wqgc0cm50a7a647qrdglgj62fl40q8njsrcfkt2mzlsmj979rdmsdwuysypc6ewxjxz0zc48kmm35jwx4q6c4fgqwkmmqyhwlep4n2hc0229vf6cahcnesr38y7gyzfx6pa8zg9jvv9

- so
uregtest1usu9eyxgqu48sa8lqug6ccjc7vcam3mt3a5t7jvyxj7pq5dgdtkjgkqzsyh9pfeav9970xddp2c9h5x44drwnz4f0zwc894k3vt380g6kfsg9j9fmnpljye9r56d94njsv40uaam392xvmky2v38dh3yhayz44z6xv402slujuhwy3mg

- tso
uregtest1mxy5wq2n0xw57nuxa4lqpl358zw4vzyfgadsn5jungttmqcv6nx6cpx465dtpzjzw0vprjle4j4nqqzxtkuzm93regvgg4xce0un5ec6tedquc469zjhtdpkxz04kunqqyasv4rwvcweh3ue0ku0payn29stl2pwcrghyzscrrju9ar57rn36wgz74nmynwcyw27rjd8yk477l97ez8

Ex:`utxo!(1, 100), sapling!(2, 160), orchard!(3, 70), orchard!(4, 50)`
```
zcash-cli -datadir=$PWD z_sendmany "zregtestsapling1flaha7huh4vzlj5zlh29xca2u8wf8ygh2vl4t2v4nlada39fc5hm4tl2dpdp6ewzjadvj9cewzh" '[{"address": "tmWXoSBwPoCjJCNZjw4P7heoVMcT2Ronrqq", "amount": 0.001}, {"address": "zregtestsapling1qzy9wafd2axnenul6t6wav76dys6s8uatsq778mpmdvmx4k9myqxsd9m73aqdgc7gwnv53wga4j", "amount": 0.0016}, {"address": "uregtest1mzt5lx5s5u8kczlfr82av97kjckmfjfuq8y9849h6cl9chhdekxsm6r9dklracflqwplrnfzm5rucp5txfdm04z5myrde8y3y5rayev8", "amount": 0.0007}]' 1 0.00001 "AllowRevealedRecipients"
zcash-cli -datadir=$PWD z_sendmany "zregtestsapling1flaha7huh4vzlj5zlh29xca2u8wf8ygh2vl4t2v4nlada39fc5hm4tl2dpdp6ewzjadvj9cewzh" '[{"address": "uregtest1mzt5lx5s5u8kczlfr82av97kjckmfjfuq8y9849h6cl9chhdekxsm6r9dklracflqwplrnfzm5rucp5txfdm04z5myrde8y3y5rayev8", "amount": 0.0005}]' 1 0.00001 "AllowRevealedRecipients"
```

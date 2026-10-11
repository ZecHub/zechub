<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Join the Crosslink Feature Net

## TL;DR

- The Feature Net is Shielded Labs' public test network for [Crosslink](/zcash-tech/crosslink-protocol), the proposed finality layer that adds staking next to Zcash's proof-of-work.
- It runs on a test coin, cTAZ. Nothing you do on it moves or risks mainnet ZEC.
- One desktop app is the node, the miner, the wallet and the finalizer. It mines cTAZ by default and has a faucet button.
- Staking, unstaking and withdrawing only work during a "Staking Day", one day in every three. Miss it and you wait for the next one.
- To stake, you paste a finalizer's identity and click an amount. This guide uses ZecHub's finalizer as the example.
- Two RPC calls show where you stand: `wallet_staking_positions` and `get_tfl_recency_status`.

*Tested with Feature Net version 14 on Windows 11 (version 10.0.26200.9550), from 8 to 10 October 2026. The software is a prototype and changes with every release. If what you see differs from this page, trust your own run and please open a PR.*

## What the Feature Net is

Crosslink is a proposal, not part of Zcash today. Shielded Labs' [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) says it "would need to go through the standard Zcash governance process" before it could reach mainnet. The [Crosslink Protocol](/zcash-tech/crosslink-protocol) page explains the design.

To try the design with real users, Shielded Labs runs what it calls [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "a series of incentivized testnets". Three roles exist on the network, and the desktop app can play all of them:

| Role | What it does |
|---|---|
| Miner | Produces proof-of-work blocks, as on Zcash today |
| Staker | Locks cTAZ in a delegation bond and points it at a finalizer |
| Finalizer | Votes to finalize blocks. Its voting power is the stake delegated to it |

The repository behind it opens with a disclaimer worth reading before you install anything: it "exists to prove ideas, not to demonstrate production engineering" and is "not production-ready code" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Run it on a machine where that is acceptable.

### What version 14 changed

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) came out on 1 October 2026. Its network starts as plain proof-of-work and turns Crosslink on in three steps ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), also shown on [ctaz.cash](https://ctaz.cash/v14)):

| Block | What happens |
|---|---|
| 20,736 | Staking opens |
| 34,560 | The first roster of finalizers is taken from the stakes on chain |
| 36,288 | BFT finality starts, and staking rewards with it |

Staking rewards begin at the last of those blocks. A bond made earlier earns nothing until then ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

The same release cut the active roster to the 12 finalizers with the most stake ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) and, in the words of its release notes, gave them a commission: "10% of all PoS Rewards in a block go to these commissions, while 90% is distributed to all staking bonds".

### cTAZ and real ZEC

cTAZ ("Crosslink TAZ") is the Feature Net's test coin. You stake cTAZ, never ZEC.

Real ZEC enters only at the end. Shielded Labs has [set aside 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) for the feature nets, and the [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) say it is paid out "on a pro rata basis based only on the amount of cTAZ each participant earned through mining or staking". Two consequences:

- **Faucet coins do not count.** cTAZ you were given, by the faucet or by anyone else, earns nothing by sitting in your wallet. Only block rewards from mining and staking count.
- **Payouts are claimed, not automatic.** Shielded Labs announces each round in the [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). For Round 2 it asked participants to send their wallet's viewing key and a mainnet address by 4 October 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). The network that version 14 runs on, the one this guide joins, was announced as Round 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Before you start

- **A computer you can leave running.** The release has builds for Windows, macOS, Ubuntu and Arch Linux. This guide was run on Windows, on a PC with an Intel Core i5-8350U processor.
- **A Staking Day.** Check when the next one opens before you plan anything. [Staker Space's dashboard](https://crosslink.staker.space/) counts down to it.
- **Nothing else.** No ZEC, no account and no sign-up.

## Step 1: Download the app and check the file

1. Open the [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) and scroll to **Assets**.
2. Download the file for your system. On Windows that is `zebrad_v14_win32.exe`.
3. Compare the file's SHA-256 with the digest GitHub shows beside that asset.

On Windows, in PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

The digest GitHub shows for that file is `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hex carries no case, so the capital letters above are fine. To let the shell compare instead of your eyes:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Know what this check is worth. The release carries no signature, so a matching hash tells you the download is complete and is the file GitHub is serving. It does not tell you who built it. [Verifying Zcash Releases](/guides/verifying-zcash-releases) explains the difference.

## Step 2: Start the node and let it sync

Start the app from a terminal, so that its startup messages stay on screen. Use an ordinary PowerShell window, not one opened with "Run as administrator": this is unsigned prototype software, and it does not need administrator rights.

```powershell
.\zebrad_v14_win32.exe
```

A window titled "Zcash Crosslink Visualizer" opens. The wallet is on the left, with **Your Wallet** and **Faucet Wallet** tabs, the chain is drawn in the middle, and finalizers are listed on the right. The terminal keeps printing the node's log. Leave both open while you use the network.

The release notes link a [video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

The app keeps its data in a cache folder: `%LOCALAPPDATA%\zebra` on Windows, `~/.cache/zebra` on Linux and `~/Library/Caches/zebra` on macOS, according to the release notes.

**Keep the secret to yourself.** That folder holds a file named `secret.seed`. The app creates it on first start ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) and derives your wallet and your finalizer identity from it ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). The app also has a **Copy Seed** button that puts the same secret on your clipboard. Whoever has either controls your wallet. Never paste them into a chat, a forum post or a screenshot.

### How to tell you are synced

The release notes say there is "no built-in monitoring for how close to the network tip you are synced". Version 14 does have some: the **Network Info** drop-down at the top of the window has rows for PoW Height, Wallet Sync and Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Compare your height with the one on [Staker Space](https://crosslink.staker.space/) or [ctaz.cash](https://ctaz.cash/).

The node also answers over RPC:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

The RPC port `127.0.0.1:8232` is open by default in this build and needs no password ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). It listens on your own machine only, and anything running on that machine can call it.

On this run the first sync, from block 0 to the tip at about block 28,400, took roughly 50 minutes.

**After a restart your balance reads zero for a while.** Each time the app starts, it rebuilds the wallet from `secret.seed` and scans the chain again from block 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Until the scan reaches your transactions, your balance and your stake show as 0. On this run they were back about 15 minutes after a restart. The faucet's wallet is rescanned the same way ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), and during the scan the Faucet Wallet tab showed a very large balance. Ignore both until Wallet Sync is complete.

## Step 3: Get some cTAZ

### Mine it

According to the release notes, the app starts CPU mining to your own wallet once it is synced. You do not have to switch anything on. Mined coins go to a transparent address of your own wallet ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Whether it finds a block is another matter. The notes warn that "you may be out-competed by others mining more quickly, so there is no guarantee of success". By default the built-in miner uses a single CPU thread ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

To use more threads, set an environment variable in the same PowerShell window before you start the app ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). This run used four:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

The variable lasts only as long as that window. With it set, Windows' processor counter showed the node using four to five processors' worth of time, in percent of one logical processor:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

The result: an Intel Core i5-8350U mining on four threads, from early on 8 October to the afternoon of 9 October, found no block.

### Or use the faucet

The app has a **Receive cTAZ** button at the bottom right. In the version 14 source, one press sends 0.5 cTAZ from the faucet's wallet to yours ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). The faucet is a single wallet that every copy of the app carries ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), and the **Faucet Wallet** tab shows its balance.

The button is switched off unless the faucet has more than 5.01 cTAZ in shielded coins ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). The tab counts the faucet's mined coins too, and those are shielded only in lots of exactly 10 cTAZ plus a fee ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), so the tab can show plenty while the button stays grey. On this run it stayed grey on 8 and 9 October, with "The faucet is mining more funds." when hovered, while the tab showed 14.74695 cTAZ.

**When the button is grey, ask your own node.** The node has a faucet request method, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), which does not apply the button's 5.01 cTAZ rule. Put your own address in place of `YOUR_ADDRESS` (it is the `address` field of `wallet_spendable_funds`, below):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

That reply means the request was queued, not that it was sent. On this run the faucet's 0.5 cTAZ was mined at block 33,306 and was spendable at block 33,322. Ask once: the faucet is shared, and a second request for the same address is refused while the first is pending ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Or ask another participant

Anyone on the network can send you cTAZ with the app's **Send** button. On this run another participant sent 31 cTAZ. It arrived as "Received" with the note "send from user wallet", which is the note the app's own Send attaches ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Ask in the [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), and give only your address.

Faucet coins and gifts are enough to learn staking. They do not count toward ZEC rewards.

### Check what you can spend

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

This was the reply once the faucet's 0.5 cTAZ had arrived, with the address shortened:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Amounts are in zatoshis: 100,000,000 make one cTAZ. Shielded coins need 3 confirmations before they count as spendable ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Coins from the faucet and from other participants land in `spendable_zats`. Mined coins are transparent, so they land in `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

One block after the second stake on this run, the rest of the balance showed under `pending_zats`. A few blocks later it was spendable again.

## Step 4: Stake to a finalizer

### Wait for a Staking Day

Staking, unstaking and withdrawing are only accepted while

```text
block height mod 10,368 < 3,456
```

which is a window of 3,456 blocks at the start of every 10,368. At the network's 25-second block target that is one day in every three ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). The first windows of version 14 open at blocks 20,736, 31,104, 41,472 and 51,840.

According to the release notes, the app announces the start and end of each Staking Day. On this run its block list showed a red "* STAKING DAY END *" line between blocks 34,559 and 34,560.

**The release notes say two things.** Their list of changes gives "~1 day for Staking Day and ~3 days for the Staking Cycle", which matches the code. Further down, a section carried over from Season 1 still says a Staking Day begins every 150 blocks and lasts 70. Go by the first. The end line above sits where the first rule closes the window (34,560 mod 10,368 = 3,456); under the second rule block 34,560 would fall inside a window.

### Pick a finalizer

A finalizer is named by its identity, a string that starts with `zfinv1`. ZecHub publishes the identity of the finalizer it runs in [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Copy an identity from a source you trust. According to the release notes, the app also lists finalizers in its right-hand panel, with a copy icon to the left of each.

After you stake, the wallet history and the RPC name the finalizer by a hex key instead of its identity. For ZecHub's finalizer that key is `2941ef23...266aae8f`.

Choose a finalizer you trust. The design has no automatic slashing, but it allows "a user-coordinated hard fork that burns all stake delegated to a named finalizer" ([Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

The choice also decides who votes. Every active bond earns its share of the staking reward. If its finalizer is among the 12 on the roster, a tenth of that share goes to the finalizer as commission. A bond pointed at a finalizer outside the 12 keeps its whole share, but that finalizer does not vote ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Stake

1. Copy the finalizer identity.
2. On the **Your Wallet** tab, press **Stake**.
3. Press **Paste Identity**. The line above the button changes to the first and last characters of the identity, `[zfinv1j6..YWyzp4YN]` for ZecHub's. Check it before you go on.
4. Click an amount. Amounts come in fixed steps, the smallest is 0.01 cTAZ, and only the amounts your balance covers are lit. With 0.5 cTAZ, +0.01 cTAZ and +0.1 cTAZ were.

**Nothing asks you to confirm, and nothing seems to happen.** On this run, in the tester's words: "I clicked it once and nothing happened, it just turned grey and lit up back." The stake had gone through. The wallet history showed "Staked @ 33334 to 2941ef23..266aae8f", the fee was 0.00015 cTAZ, and the wallet showed 0.010 cTAZ Staked. A second stake a few minutes later made a second bond, at block 33,348.

Each stake creates its own delegation bond. The fixed amounts and the Staking Day both exist for privacy: they make one person's stake harder to tell from another's.

## Step 5: Check your position

### Your bonds

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

This was the reply at block 36,490, two days after staking:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

The call takes no parameters. It returns your active bonds, grouped under the key of the finalizer each one backs, and the bonds that have finished unstaking and can be withdrawn. Each bond shows the amount staked (`initial_val`), its value now (`latest_val`), and the transaction and block height that created it. Rewards are added to the bond itself: by block 36,490 each bond of 1,000,000 zatoshis had grown to 1,003,451.

**The Edit Stake window shows each bond ten times too large.** On this run each 0.01 cTAZ bond read 0.100 cTAZ on its own row, and 0.1003536 cTAZ once rewards had started, while the totals above the rows (0.020 cTAZ, later 0.02007 cTAZ) agreed with the RPC. Go by the totals and the RPC.

The same window put a warning triangle next to the finalizer, before and after finality started. In the source, the triangle means your app does not count that finalizer as online, and an online one gets a Wi-Fi icon instead ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). The bonds earned rewards all the same.

### The finalizers

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

According to the release notes, this reports where your node is in the voting process and, for each finalizer, when your node last heard from it and how it has been voting.

Before block 36,288 every field is zero and the list is empty. This was the reply at block 33,354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

After finality starts, the list holds the finalizers on the roster. At block 36,490 it held 12, ZecHub's `2941ef23...` among them, which matches the roster limit of 12. This is the start of that reply, cut after the first entry:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

A few minutes later the app's right-hand panel showed "Finalizers (23)".

### On Linux and macOS

The [source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) gives the call in `curl` form. Change the method name for the other calls. This form was not run for this guide:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

On Linux, the release notes say you probably need `xclip` installed before copy and paste work in the app.

### One RPC name to watch

The version 14 release notes describe a staking call named `wallet_staking_action` that takes an object. The version 14 source code has no method of that name, and on this run the node answered:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

The staking method it registers is [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), which takes one string holding the request as JSON, with the finalizer given by its `zfinv1` identity ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). It was not tried for this guide.

## Unstake and withdraw

A bond cannot be undone the day it is made. It takes three Staking Days from start to finish: stake in one, unstake in a later one, withdraw in a third. The release notes add that one bond cannot take two staking actions in the same Staking Day.

*Not run for this guide. From the version 14 release notes:* to unstake, press **Edit Stake**, choose a bond from the Staked Bonds list and click the chain-link icon. To withdraw on a later Staking Day, press **Edit Stake**, choose a bond from the Withdrawable Bonds list and click the money icon. Moving a bond to a different finalizer, which the notes call retargeting, is allowed at any time.

## Where to watch the network

The [Crosslink tab on ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) collects the tools in one place, under a notice that reads "Staking on this network does not move ZEC":

- Hosted, with no node needed: [Staker Space](https://crosslink.staker.space/), a "live dashboard for the current cTAZ testnet" with the height, miners, solution rate, Staking Day countdown and finality, and [ctaz.cash](https://ctaz.cash/), with mining production, the finalizer roster, peers and staking-address name claims.
- On your own machine: `zcash-explorer`, whose `/live/crosslink` page shows activation, finality lag, the roster and staking positions, and `crosslink_indexer`, an SQLite index of a Crosslink node.

## Common mistakes

**Planning around the clock instead of the block height.** Staking Days are counted in blocks. Watch a dashboard's countdown, not the calendar.

**Staking in the last minutes of the window.** The rule is checked against the block that includes your transaction ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), so the stake has to be mined before the window closes, not just sent.

**Expecting to mine your stake.** A four-thread CPU miner on an Intel Core i5-8350U found no block between 8 and 9 October. Get your first cTAZ from the faucet or from another participant.

**Clicking again because nothing seemed to happen.** Every click on an amount is a new bond. Check the wallet history or `wallet_staking_positions` first.

**Panicking after a restart.** Your balance and stake read zero until the wallet has rescanned. Wait for Wallet Sync to finish.

**Treating cTAZ as play money, or the secret as harmless.** cTAZ is a test coin, but the cTAZ you earn decides your share of real ZEC. Guard `secret.seed` as you would a wallet.

**Reading old instructions.** The release notes carry text from earlier seasons next to the new rules. Where they disagree with what your node does, your node is right.

## Related pages

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - the design this network tests
- [Shielded Labs](/zcash-organizations/shielded-labs) - the team behind Crosslink
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - what a checksum does and does not prove
- [Zebra Full Node](/zcash-tech/zebra-full-node) - the node the Feature Net app is built on
- [Zcash Testnet](/using-zcash/testnet) - the ordinary Zcash test network, which is a different network

## Sources

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 October 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 April 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*The steps on this page were run with Feature Net version 14 on Windows 11 (version 10.0.26200.9550), from 8 to 10 October 2026. A statement that cites the release notes or the source code is taken from them. Anything marked "not run" was not tried.*

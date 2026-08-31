# MultiSig 演示

> **历史内容。此演练已无法再运行。**
>
> 下面的每一步都依赖 zcashd，而它已于 2026 年 7 月 18 日到达自动停止支持（End-of-Support）并停机。与本页一同提供的七个脚本通过 `zcash-cli` 驱动它，因此如今这些脚本都无法连接到正在运行的节点。
>
> 这些脚本无法机械式移植。它们基于原始交易和钱包 RPC（`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`），而 zcashd 在停机前就已弃用这些接口；Zallet 则用新的方法替代了它们，这些方法操作的是 PCZT 而不是原始交易 hex，并且目前仍处于 beta 阶段，许多 zcashd 方法尚未移植过去。
>
> 如今若要在 Zcash 上进行多方托管，请参阅 [FROST 与阈值托管](/zcash-tech/frost-threshold-custody)，其中包含与透明 multisig 的直接对比，以及可运行的 [Ywallet FROST 演示](/guides/frostdemo/ywallet-frost-demo)。如果要将现有节点迁移出 zcashd，请参阅 [迁移到 Zebra 和 Zallet 的指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。
>
> 保留此页面是为了作为透明 multisig 工作流程的历史记录。

此演示需要 zcashd，而它已于 2026 年 7 月 18 日停机，现已无法运行。下面的任何内容都无法在真实链上完成。

## 收集所需参与者的公钥

* https://github.com/iancoleman/bip39
* 如果使用 zcashd，你也可以创建一个 UA，并同样使用你的透明接收器。然后使用 `getPubkey.sh` 提取你的公钥。


## 创建 2 个 Multisig（3 选 2）t3 地址

运行 createMultiSig.sh 来生成你的 multisig 地址和赎回脚本。需要 3 个公钥

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 第 1 个 t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 用于找零地址的第 2 个 t3。 

#### 注意：在这个示例中，pubk1、pubk4 是同一个人，pubk2、pubk5 是同一个人，依此类推……

#### 注意 2：你的公钥顺序很重要！一定要注意这一点！！！


## 向 t3 地址注资

使用任意钱包/水龙头向该地址注资

## 创建 MultiSig 交易

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

其中，

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => 会帮助你找到所需信息

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## 签署 MultiSig 交易

打开 signMultiSigTX.sh，并将你的私钥添加到 pk1、pk2、... 变量中。
 

*** 我不建议把这些内容输入到你的终端中。 ***


如果你能访问自己所有的私钥，可以一次性全部使用以节省时间，
但在大多数现实世界的示例中，签名会由世界各地的人分别完成，因此每位所需参与者都需要签名，
然后把更新后的 raxTX “hex” 输出发回，供其他人继续签名，以完成整个签名流程。

创建第一笔交易的人会先用自己的私钥签名，然后把需要其他参与者签名的更新版 rawTX hex 发送出去。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

要签署这笔交易，三把私钥中至少需要有两把进行签名。如果你提供的公钥是使用 zcashd 的 T-address 导出的，你可以通过以下方式获取你的 T 地址私钥： 


`zcash-cli dumpprivkey "t-addr"`

该命令已随 zcashd 一同停用，如今不会返回任何内容；这里记录它只是为了说明这个演示当时是如何获取密钥的。


在这个演示中，我使用了 iancoleman 的 bip39 来快速分离出所需的私钥。


## 广播已签名交易

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 来源

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

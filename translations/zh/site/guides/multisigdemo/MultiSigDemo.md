# MultiSig 演示

> **历史内容。本演练已无法运行。**
>
> 以下每一步均依赖 zcashd，而它已于 2026 年 7 月 18 日自动停止支持。与本页面一同提供的七个脚本通过 `zcash-cli` 驱动它，因此如今没有任何脚本能够连接到正在运行的节点。
>
> 这些脚本无法通过机械方式移植。它们基于原始交易和钱包 RPC（`createrawtransaction`、`signrawtransaction`、`createmultisig`、`dumpprivkey`），而 zcashd 在停止前已弃用这些功能；Zallet 以操作 PCZT 而非原始交易十六进制数据的新方法取代了它们，并且仍处于 beta 阶段，许多 zcashd 方法尚未移植。
>
> 如需了解如今在 Zcash 上的多方托管，请参阅 [FROST 与门限托管](/zcash-tech/frost-threshold-custody)，其中包含与透明多重签名的直接比较，以及可用的 [Ywallet FROST 演示](/guides/frostdemo/ywallet-frost-demo)。如需将现有节点从 zcashd 迁移出去，请参阅 [迁移至 Zebra 和 Zallet 的指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。
>
> 本页面作为透明多重签名工作流程的历史记录予以保留。

此演示需要 zcashd，而它已于 2026 年 7 月 18 日停止运行。以下内容均无法在实时链上完成。

## 从所需人员处收集公钥

* https://github.com/iancoleman/bip39
* 如果使用 zcashd，你可以创建一个 UA，并同样使用你的透明接收地址。然后使用 `getPubkey.sh` 提取你的公钥。


## 创建 2x 多重签名（3 取 2）t3 地址

运行 createMultiSig.sh 以生成你的多重签名地址和赎回脚本。需要 3 个公钥

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 第 1 个 t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 用于找零地址的第 2 个 t3。 

#### 注意：在本示例中，pubk1、pubk4 属于同一个人，pubk2、pubk5 属于同一个人，依此类推……

#### 注意2：你的公钥的顺序很重要！务必注意这一点！！！


## 向 t3 地址注资

使用任意钱包/水龙头向该地址注资

## 创建多重签名交易

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

`./txDetails.sh txid`   => 将帮助你找到所需信息

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## 签署多重签名交易

打开 signMultiSigTX.sh，并在 pk1、pk2、……变量中添加你的私钥。
 

*** 我不建议在终端中输入这些内容。 ***


如果你可以访问所有私钥，可以一次全部使用它们以节省时间，
但在大多数现实示例中，签名将由世界各地的人员完成，因此每位所需参与者都需要签名，
然后发回更新后的 raxTX “hex” 输出，其他人将使用它进行签名，以完成签名流程。

无论谁创建第一笔交易，都会使用其私钥签名，并发出需要由其他参与者签名的更新后 rawTX hex。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

要签署此交易，三把私钥中至少需要两把对其签名。如果你提供的公钥是使用 zcashd 中的 T 地址导出的，你可以通过以下方式获取 T 地址的私钥：


`zcash-cli dumpprivkey "t-addr"`

该命令已随 zcashd 停止，现今不会返回任何内容；此处仅记录它以说明该演示如何获取密钥。


对于此演示，我使用了 iancoleman 的 bip39 来快速定位所需私钥。


## 广播已签署的交易

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 来源

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

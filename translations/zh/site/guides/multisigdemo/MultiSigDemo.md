# 多重签名演示

> **历史内容。本演练已无法运行。**
>
> 以下每一步都依赖于 zcashd，而它已于 2026 年 7 月 18 日达到自动停止支持服务的期限。随本页提供的七个脚本通过 `zcash-cli` 驱动它，因此如今它们都无法连接到正在运行的节点。
>
> 这些脚本无法通过机械方式迁移。它们建立在原始交易和钱包 RPC（`createrawtransaction`、`signrawtransaction`、`createmultisig`、`dumpprivkey`）之上，而 zcashd 在停止前已弃用这些功能；Zallet 以操作 PCZT 而非原始交易十六进制数据的新方法取代了它们，并且仍处于 beta 阶段，许多 zcashd 方法尚未迁移。
>
> 如今若要在 Zcash 上进行多方托管，请参阅 [FROST 与门限托管](/zcash-tech/frost-threshold-custody)，其中包含与透明多重签名的直接比较，以及 [Ywallet FROST 演示](/guides/frostdemo/ywallet-frost-demo)。如需将现有节点从 zcashd 迁移，请参阅[迁移至 Zebra 和 Zallet 的指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。
>
> 本页作为透明多重签名工作流程的历史记录予以保留。

此演示需要 zcashd，但它已于 2026 年 7 月 18 日停止运行，现已无法使用。以下内容均无法在实时链上完成。

## 从所需参与者处收集公钥

* https://github.com/iancoleman/bip39
* 如果使用 zcashd，你也可以创建一个 UA 并使用其中的透明接收地址。然后使用 `getPubkey.sh` 提取你的公钥。


## 创建 2 个多重签名（3 选 2）t3 地址

运行 createMultiSig.sh 以生成多重签名地址和赎回脚本。需要 3 个公钥

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 第 1 个 t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 用于找零地址的第 2 个 t3。 

#### 注意：在此示例中，pubk1、pubk4 属于同一人，pubk2、pubk5 属于同一人，依此类推……

#### 注意2：公钥的顺序很重要！请务必注意！！！


## 为 t3 地址注资

使用任意钱包/水龙头为该地址注资

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


如果你可以访问全部私钥，可以一次性全部使用以节省时间，
但在大多数实际案例中，签名将由世界各地的参与者完成，因此每位所需参与者都需要签名，
然后发回更新后的 raxTX“十六进制”输出，供其他人用于签名，以完成签名流程。

创建首笔交易的人将使用自己的私钥签名，并发送需要由其他参与者签名的更新后 rawTX 十六进制数据。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

要签署此交易，三个私钥中至少需要两个进行签名。如果你提供的公钥是使用 zcashd 的 T 地址导出的，你可以通过以下方式获取 T 地址的私钥：


`zcash-cli dumpprivkey "t-addr"`

该命令已随 zcashd 停止，今天不会返回任何内容；此处仅记录它，以说明该演示如何获取其密钥。


在本演示中，我使用 iancoleman 的 bip39 快速分离出所需私钥。


## 广播已签署的交易

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 来源

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

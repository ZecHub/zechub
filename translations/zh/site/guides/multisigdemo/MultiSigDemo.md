# MultiSig 演示

此演示需要 `zcashd` 

## 收集所需参与者的公钥

* https://github.com/iancoleman/bip39
* 如果使用 zcashd，你也可以创建一个 UA，并同时使用你的 transparent reciever。然后使用 `getPubkey.sh` 提取你的公钥。


## 创建 2x Multisig（3 选 2）t3 地址

运行 createMultiSig.sh 以生成你的 multisig 地址和 redeem script。需要 3 个公钥

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 第 1 个 t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 第 2 个 t3，用于找零地址。 

#### 注意：在此示例中，pubk1、pubk4 是同一个人，pubk2、pubk5 是同一个人，以此类推 ...

#### 注意2：你的公钥顺序很重要！务必注意这一点！！！


## 向 t3 地址注资

使用任意钱包/facuet 向该地址注资

## 创建 MultiSig 交易

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

其中，

```
        txid: 向你的新 t3 转入资金的那笔交易的交易 ID
   voutIndex: vout 中数值最大的输出索引
scriptPubKey: P2SH 锁定脚本包含另一个锁定脚本的哈希值（Script Hash），并由 HASH160 和 EQUAL 操作码包围。这是十六进制格式，可通过 getrawtransaction rpc 获取，查找 scriptPubKey
redeemScript: 创建 t3 时输出的 redeemScript 的十六进制值。所有想从该 t3 花费资金的人都需要它。
   oldAmount: 从上面的 txid 转入你的新 t3 的金额
       tAddy: 你想发送资金到的地址
      amount: 要发送到 tAddy 的 ZEC 数量
 changeTaddy: 找零地址（新的 t3，带有新的 redeemScript！）

```

`./txDetails.sh txid`   => 将帮助你找到所需信息

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## 对 MultiSig TX 进行签名

打开 signMultiSigTX.sh，并将你的私钥添加到 pk1、pk2、... 这些变量中。
 

*** 我不建议你把这些内容直接输入到终端中。 ***


如果你可以访问自己所有的私钥，可以一次性全部使用以节省时间，
但在大多数现实场景中，签名会由分布在世界各地的参与者完成，因此每位所需参与者都需要签名，
然后发回更新后的 raxTX “hex” 输出，供其他人继续签名以完成整个签名流程。

谁创建了第一笔交易，谁就会先用自己的私钥签名，然后把需要其他参与者签名的更新版 rawTX hex 发出去。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

要签署这笔交易，三把私钥中至少需要两把进行签名。如果你提供的公钥是使用 zcashd 的 T-address 导出的，你可以通过以下方式获取你的 T 地址私钥： 


`zcash-cli dumpprivkey "t-addr"`


在这个演示中，我使用了 iancoleman 的 bip39 来快速分离出所需的私钥。


## 广播已签名的 TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 来源

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

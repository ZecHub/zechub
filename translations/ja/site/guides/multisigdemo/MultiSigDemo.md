# マルチシグ・デモ

> **歴史的資料。このウォークスルーは現在は動作しません。**
>
> 以下のすべての手順はzcashdに依存していますが、zcashdは2026年7月18日に自動的なサポート終了停止に達しました。このページとともに提供されている7つのスクリプトは`zcash-cli`を介してzcashdを操作するため、現在はいずれも稼働中のノードに到達できません。
>
> これらのスクリプトを機械的に移植することはできません。これらは、zcashdが停止前に非推奨としたraw-transactionおよびwallet RPC（`createrawtransaction`、`signrawtransaction`、`createmultisig`、`dumpprivkey`）を基盤に構築されています。Zalletではこれらを、raw transaction hexではなくPCZTを操作する新しいメソッドに置き換えており、まだベータ版で、多くのzcashdメソッドは未移植です。
>
> 現在のZcashでの複数当事者カストディについては、透明マルチシグとの直接比較を含む[FROST & Threshold Custody](/zcash-tech/frost-threshold-custody)と、動作する[Ywallet FROST demo](/guides/frostdemo/ywallet-frost-demo)を参照してください。既存のノードをzcashdから移行するには、[ZebraおよびZalletへの移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)を参照してください。
>
> このページは、透明マルチシグのワークフローに関する歴史的記録として保存されています。

このデモにはzcashdが必要ですが、zcashdは2026年7月18日に停止し、現在は動作しません。以下の内容はいずれもライブチェーン上では完了できません。

## 必要な個人から公開鍵を収集する

* https://github.com/iancoleman/bip39
* zcashdを使用している場合は、UAを作成し、その透明レシーバーも使用できます。次に、`getPubkey.sh`を使用して公開鍵を抽出します。


## 2x マルチシグ（3つ中2つ）のt3アドレスを作成する

createMultiSig.shを実行して、マルチシグアドレスとredeem scriptを生成します。必要なのは3つの公開鍵です。

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1st t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2nd t3 for the change address. 

#### 注: この例ではpubk1、pubk4は同じ人物、pubk2、pubk5も同じ人物、以下同様です...

#### 注2: 公開鍵の順序は重要です！必ず注意してください！！！


## t3アドレスに資金を送る

任意のウォレット／faucetを使用してアドレスに資金を送ります。

## マルチシグトランザクションを作成する

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

各項目は以下のとおりです。

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

`./txDetails.sh txid`   => 必要な情報を見つけるのに役立ちます。

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## マルチシグTXに署名する

signMultiSigTX.shを開き、pk1、pk2、...変数に秘密鍵を追加します。
 

*** これらをターミナルに入力することはお勧めしません。 ***


すべての秘密鍵にアクセスできる場合は、時間を節約するために一度にすべて使用できます。
ただし、実世界の多くの例では署名は世界中の人々によって行われるため、必要な各参加者が署名し、
他の参加者が署名して署名手続きを完了するために使用する、更新されたraxTXの「hex」出力を送り返す必要があります。

最初のTXを作成した人が秘密鍵で署名し、他の参加者が署名する必要がある更新済みrawTX hexを送信します。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

このTXに署名するには、3つの秘密鍵のうち少なくとも2つで署名する必要があります。指定した公開鍵がzcashdのT-addressを使用してエクスポートされた場合、次のコマンドでTアドレスの秘密鍵を取得できます。 


`zcash-cli dumpprivkey "t-addr"`

このコマンドはzcashdとともに停止しており、現在は何も返しません。ここでは、このデモがどのように鍵を取得していたかを示すためだけに記録されています。


このデモでは、必要な秘密鍵を迅速に特定するため、iancolemanのbip39を使用しました。


## 署名済みTXをブロードキャストする

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 情報源

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

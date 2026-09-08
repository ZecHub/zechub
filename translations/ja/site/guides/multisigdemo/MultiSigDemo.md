# マルチシグデモ

> **歴史的資料。このウォークスルーはもはや動作しません。**
>
> 以下のすべての手順は zcashd に依存していますが、zcashd は2026年7月18日に自動的なサポート終了停止に達しました。このページに付属する7つのスクリプトは `zcash-cli` を通じて zcashd を操作するため、現在はいずれも稼働中のノードに到達できません。
>
> これらのスクリプトを機械的に移植することはできません。これらは zcashd が停止前に非推奨とした、生トランザクションおよびウォレットRPC（`createrawtransaction`、`signrawtransaction`、`createmultisig`、`dumpprivkey`）を基盤としています。Zallet はこれらを、生トランザクションの16進数ではなく PCZT を操作する新しいメソッドに置き換えています。また、Zallet は依然ベータ版であり、多くの zcashd メソッドはまだ移植されていません。
>
> 現在の Zcash における複数当事者カストディについては、透過型マルチシグとの直接比較を含む [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody) および [Ywallet FROST demo](/guides/ywallet-frost-demo) を参照してください。既存のノードを zcashd から移行するには、[Zebra および Zallet への移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet) を参照してください。
>
> このページは、透過型マルチシグのワークフローに関する歴史的記録として保持されています。

このデモには zcashd が必要ですが、zcashd は2026年7月18日に停止し、もはや動作しません。以下の内容はいずれもライブチェーン上では実行できません。

## 必要な個人から公開鍵を集める

* https://github.com/iancoleman/bip39
* zcashd を使用している場合は、UA を作成して透過型受信者も使用できます。その後、`getPubkey.sh` を使用して公開鍵を抽出します。


## 2x マルチシグ（3つ中2つ）の t3 アドレスを作成する

createMultiSig.sh を実行して、マルチシグアドレスとリディームスクリプトを生成します。必要なのは3つの公開鍵です。

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1つ目の t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 変更アドレス用の2つ目の t3。 

#### 注: この例では pubk1、pubk4 は同じ人物、pubk2、pubk5 も同じ人物、というようになります...

#### 注2: 公開鍵の順序は重要です！この点に注意してください！！！


## t3 アドレスに資金を送る

任意のウォレット／フォーセットを使用してアドレスに資金を送ります。

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



## マルチシグ TX に署名する

signMultiSigTX.sh を開き、pk1、pk2、... の変数に秘密鍵を追加します。
 

*** これらをターミナルに直接入力することは推奨しません。 ***


すべての秘密鍵にアクセスできる場合は、時間を節約するために一度にすべて使用できます。
しかし、実際の多くの例では、世界中の人々が署名を行うため、必要な各参加者が署名した後、他の参加者が署名に使用する更新済み raxTX の「16進数」出力を送り返し、署名プロセスを完了する必要があります。

最初の TX を作成した人は、自身の秘密鍵で署名し、他の参加者が署名する必要がある更新済み rawTX の16進数を送信します。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

この TX に署名するには、3つの秘密鍵のうち少なくとも2つで署名する必要があります。提供した公開鍵が zcashd の T アドレスを使用してエクスポートされたものである場合、次のコマンドで T アドレスの秘密鍵を取得できます。 


`zcash-cli dumpprivkey "t-addr"`

このコマンドは zcashd とともに停止し、現在は何も返しません。ここには、このデモでどのように鍵を取得していたかを示す目的でのみ記録しています。


このデモでは、必要な秘密鍵を迅速に特定するために iancoleman の bip39 を使用しました。


## 署名済み TX をブロードキャストする

`./sendMultiSignedTX.sh signedTXfromLastStep`



# ソース

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

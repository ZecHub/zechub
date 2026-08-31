# MultiSig デモ

> **歴史的資料です。この手順は現在は動作しません。**
>
> 以下のすべての手順は zcashd に依存しており、zcashd は 2026年7月18日に自動的な End-of-Support 停止に達しました。このページに同梱されている 7 つのスクリプトは `zcash-cli` を通じてそれを操作するため、現在ではどれも稼働中のノードに到達できません。
>
> これらのスクリプトは機械的に移植することはできません。これらは、生トランザクション hex ではなく PCZT を扱う新しいメソッドでそれらを置き換える Zallet に対し、停止前に zcashd が非推奨化した raw-transaction および wallet RPC（`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`）の上に構築されています。なお Zallet はまだベータ版であり、多くの zcashd メソッドはまだ移植されていません。
>
> 現在の Zcash における複数当事者カストディについては、透過的マルチシグとの直接比較を含む [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody) と、動作する [Ywallet FROST demo](/guides/frostdemo/ywallet-frost-demo) を参照してください。既存のノードを zcashd から移行するには、[Zebra と Zallet への移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet) を参照してください。
>
> このページは、透過的マルチシグのワークフローに関する歴史的記録として残されています。

このデモには zcashd が必要ですが、zcashd は 2026年7月18日に停止し、現在は動作しません。以下の内容はいずれもライブチェーンに対して完了できません。

## 必要な参加者から公開鍵を集める

* https://github.com/iancoleman/bip39
* zcashd を使っている場合は、UA を作成し、透過的な reciever も使えます。その後、`getPubkey.sh` を使って公開鍵を抽出してください。


## 2x マルチシグ（2 of 3）t3 アドレスを作成する

マルチシグアドレスと redeem script を生成するには createMultiSig.sh を実行します。必要なのは 3 つの公開鍵です

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1 つ目の t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # おつりアドレス用の 2 つ目の t3。 

#### 注: この例では pubk1 と pubk4 は同じ人物、pubk2 と pubk5 も同じ人物、以下同様です ...

#### 注2: 公開鍵の ORDER は重要です! ここは必ず注意してください!!!!


## t3 アドレスに資金を送る

任意のウォレット/facuet を使ってアドレスに資金を送ってください

## MultiSig トランザクションを作成する

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

各項目は次のとおりです。

```
        txid: あなたの新しい t3 に資金を送ったトランザクションの transaction ID
   voutIndex: 最大の値を持つ vout 内の出力のインデックス
scriptPubKey: P2SH ロッキングスクリプトは、HASH160 と EQUAL オペコードで囲まれた、別のロッキングスクリプトのハッシュ（Script Hash）を含みます。これは hex 形式で、getrawtransaction rpc で確認できます。scriptPubKey を探してください
redeemScript: t3 を作成したときに出力された redeemScript の hex 値。t3 から支出したいすべての人にこれが必要です。
   oldAmount: 上記の txid からあなたの新しい t3 に送られた金額
       tAddy: 資金の送信先アドレス
      amount: tAddy に送る ZEC の金額
 changeTaddy: おつりアドレス（新しい redeemScript を持つ新しい t3）

```

`./txDetails.sh txid`   => 必要な情報を見つけるのに役立ちます

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** これは署名に必要です! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX に署名する

signMultiSigTX.sh を開き、pk1、pk2、... 変数にあなたの秘密鍵を追加してください。
 

*** これらをターミナルに直接入力することはお勧めしません。 ***


すべての秘密鍵にアクセスできる場合は、時間短縮のため一度にすべて使うこともできますが、
実際の多くのケースでは、署名は世界中の人々によって行われるため、必要な各参加者が署名し、
その後、署名手順を完了するために他の人が使う更新済みの raxTX "hex" 出力を送り返す必要があります。

最初の tx を作成した人は、自分の秘密鍵で署名し、他の参加者が署名する必要のある更新済みの rawTX hex を送ります。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

この tx に署名するには、3 つの秘密鍵のうち少なくとも 2 つで署名する必要があります。渡した公開鍵が zcashd の T-address を使ってエクスポートされたものであれば、次の方法で T アドレスの秘密鍵を取得できます。 


`zcash-cli dumpprivkey "t-addr"`

このコマンドは zcashd とともに停止しており、現在は何も返しません。ここでは、このデモがどのように鍵を取得していたかを示すためにのみ記録しています。


このデモでは、必要な秘密鍵をすばやく切り出すために iancoleman の bip39 を使用しました。


## 署名済み TX をブロードキャストする

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 出典

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

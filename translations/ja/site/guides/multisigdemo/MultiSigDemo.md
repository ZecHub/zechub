# マルチシグデモ

> **歴史的な記録です。この手順はもう動作しません。**
>
> 以下のすべての手順は zcashd に依存していますが、zcashd は 2026年7月18日に自動サポート終了停止に達しました。このページに付属する7つのスクリプトは `zcash-cli` を通じて zcashd を操作するため、現在はいずれも稼働中のノードに接続できません。
>
> これらのスクリプトを機械的に移植することはできません。zcashd が非推奨としたロートランザクションおよびウォレットの RPC に基づいており、Zallet はそれらを、ロートランザクションの hex ではなく PCZT を扱う新しいメソッドに置き換えているためです。
>
> 現在の Zcash におけるマルチパーティ管理については、[FROST としきい値管理](/zcash-tech/frost-threshold-custody) および動作する [Ywallet FROST デモ](/guides/frostdemo/ywallet-frost-demo) を参照してください。既存のノードを zcashd から移行するには、[Zebra と Zallet への移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet) を参照してください。
>
> このページは透明な multisig ワークフローの歴史的記録として保存されています。

このデモには zcashd が必要です。

## 必要な人物から公開鍵を収集する

* https://github.com/iancoleman/bip39
* zcashd を使用している場合、UAを作成し、透明受信アドレスも使用できます。その後 `getPubkey.sh` を使って公開鍵を抽出します。

## 2xマルチシグ（3中の2）t3 アドレスの作成

createMultiSig.sh を実行してマルチシグアドレスとリダムスクリプトを生成します。必要なのは3つの公開鍵です。

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1つ目の t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 変更アドレス用の2つ目の t3.

#### ノート: この例では、pubk1,pubk4 は同じ人物、pubk2,pubk5 も同じ人物であり、同様に続きます...

#### ノート2: 公開鍵の順序が重要です！この点に注意してください!!!!

## t3 アドレスへの資金注入

任意のウォレット/ファウエットを使ってアドレスを充填してください。

## マルチシグトランザクションの作成

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

ここで、

```
        txid: あなたの新しいt3に資金を送信したトランザクションのID
   voutIndex: voutの中で最大値を持つ出力のインデックス
scriptPubKey: P2SHロックスクリプトは、他のロックスクリプト（スクリプトハッシュ）のハッシュを含んでおり、HASH160とEQUALオペコードで囲まれています。これはhex形式で、getrawtransaction RPC経由で取得できます。scriptPubKeyを探してください。
redeemScript: t3を作成時に出力されたリダムスクリプトのhex値。t3から資金を送るすべての人にとって必要です。
   oldAmount: 上記txidからあなたの新しいt3に送られた金額
       tAddy: 資金を送りたいアドレス
      amount: 送信するZECの量
 changeTaddy: 変更アドレス（新しいリダムスクリプトを持つ新しいt3）

```

`./txDetails.sh txid`   => 必要な情報を取得するために役立ちます

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** 署名に必要です！**

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```

## マルチシグトランザクションの署名

signMultiSigTX.sh を開き、pk1, pk2,... 変数に自分の秘密鍵を追加してください。

*** これらをターミナルにタイプすることをお勧めしません。***

すべての秘密鍵にアクセスできる場合、時間を節約するために一度にすべてを使用できますが、実際のケースでは世界中の人々が署名を行うため、必要な参加者全員がそれぞれ署名し、更新されたraxTX "hex"出力を他の人に送り返す必要があります。

最初のトランザクションを作成した人は、自分の秘密鍵で署名し、他の参加者が署名するために必要な更新されたrawTX hexを送信します。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

このトランザクションに署名するには、3つの秘密鍵のうち少なくとも2つが必要です。もし公開鍵がzcashdからTアドレスでエクスポートされた場合、Tアドレスの秘密鍵は以下のように取得できます：


`zcash-cli dumpprivkey "t-addr"`


このデモでは、iancolemanのbip39を使用して必要な秘密鍵を迅速に抽出しました。

## 署名済みトランザクションのブロードキャスト

`./sendMultiSignedTX.sh signedTXfromLastStep`



# 参考資料

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

# マルチシグデモ

> **歴史的資料。このウォークスルーは現在動作しません。**
>
> 以下のすべての手順はzcashdに依存していますが、zcashdは2026年7月18日に自動End-of-Support停止に達しました。このページに付属する7つのスクリプトは`zcash-cli`を通じて操作するため、現在はいずれも稼働中のノードに到達できません。
>
> これらのスクリプトを機械的に移植することはできません。これらは、停止前にzcashdが非推奨化した生トランザクションおよびウォレットRPC（`createrawtransaction`、`signrawtransaction`、`createmultisig`、`dumpprivkey`）に基づいています。Zalletはそれらを生トランザクションのhexではなくPCZTを操作する新しいメソッドに置き換えていますが、まだベータ版であり、多くのzcashdメソッドはまだ移植されていません。
>
> 現在のZcashでの複数当事者カストディについては、透明マルチシグとの直接比較を含む[FROSTとしきい値カストディ](/zcash-tech/frost-threshold-custody)および[Ywallet FROSTデモ](/guides/frostdemo/ywallet-frost-demo)を参照してください。既存のノードをzcashdから移行するには、[ZebraおよびZalletへの移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)を参照してください。
>
> このページは、透明マルチシグのワークフローに関する歴史的記録として保持されています。

このデモにはzcashdが必要ですが、zcashdは2026年7月18日に停止しており、現在は動作しません。以下の内容はいずれもライブチェーン上では完了できません。

## 必要な参加者から公開鍵を収集する

* https://github.com/iancoleman/bip39
* zcashdを使用する場合は、UAを作成し、透明レシーバーも使用できます。次に`getPubkey.sh`を使用して公開鍵を抽出します。


## 2x マルチシグ（3つ中2つ）のt3アドレスを作成する

createMultiSig.shを実行して、マルチシグアドレスとリディームスクリプトを生成します。必要なのは3つの公開鍵です

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1つ目のt3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 変更用アドレスの2つ目のt3。 

#### 注: この例では、pubk1とpubk4は同一人物、pubk2とpubk5は同一人物、以下同様です...

#### 注2: 公開鍵の順序は重要です！必ず注意してください!!!!


## t3アドレスに資金を入れる

任意のウォレット/フォーセットを使用してアドレスに資金を入れます

## マルチシグトランザクションを作成する

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

各項目は以下のとおりです。

```
        txid: 新しいt3に資金を送ったトランザクションのトランザクションID
   voutIndex: 最大値を持つvout内の出力のインデックス
scriptPubKey: P2SHロッキングスクリプトには、HASH160およびEQUALオペコードで囲まれた別のロッキングスクリプト（Script Hash）のハッシュが含まれます。これはhex形式で、getrawtransaction rpcから確認できます。scriptPubKeyを探してください
redeemScript: t3の作成時に出力されたredeemScriptのhex値です。t3から使用したいすべての人に必要です。
   oldAmount: 上記のtxidから新しいt3に送られた金額
       tAddy: 資金の送付先アドレス
      amount: tAddyに送るZECの金額
 changeTaddy: 変更アドレス（新しいredeemScriptを持つ新しいt3！）

```

`./txDetails.sh txid`   => 必要な情報の確認に役立ちます

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** これは署名に必要です！ **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## マルチシグTXに署名する

signMultiSigTX.shを開き、pk1、pk2、...変数に秘密鍵を追加してください。
 

*** これらをターミナルに入力することは推奨しません。 ***


すべての秘密鍵にアクセスできる場合は、時間を節約するために一度にすべて使用できます。
ただし、実世界のほとんどの例では、世界中の参加者によって署名が行われるため、必要な各参加者が署名し、
その後、他の参加者が署名の完了に使用する、更新されたraxTXの「hex」出力を送り返す必要があります。

最初のtxを作成した人が自分の秘密鍵で署名し、他の参加者が署名する必要がある更新済みrawTX hexを送信します。

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

このtxに署名するには、3つの秘密鍵のうち少なくとも2つで署名する必要があります。提供した公開鍵がzcashdのTアドレスを使用してエクスポートされたものであれば、以下でTアドレスの秘密鍵を取得できます。 


`zcash-cli dumpprivkey "t-addr"`

このコマンドはzcashdとともに停止し、現在は何も返しません。ここには、このデモがどのように鍵を取得していたかを示す目的でのみ記録されています。


このデモでは、必要な秘密鍵をすばやく特定するためにiancolemanのbip39を使用しました。


## 署名済みTXをブロードキャストする

`./sendMultiSignedTX.sh signedTXfromLastStep`



# ソース

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

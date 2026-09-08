<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# あなたの Zcash 支払いを見られるのは誰ですか？

## 要点

- Zcash には **2種類のアドレス** があります: transparent（`t`）と shielded（`z` または `u`）です。
- 公開される情報の量は、支払いがどの種類の間を移動するかによって変わります。
- 送信者、受信者、金額のすべてが隠されるのは、**shielded から shielded** への支払いだけです。
- shielded アドレスは単一のキーではありません。小さなキーの集合であり、**支出権限を渡さずに読み取り専用アクセスを渡す** ことができます。
- 一度共有した Viewing Key は**取り消せません**。

---

## 最初に理解すべきひとつのこと

ほとんどのブロックチェーンでは、選択の余地はありません。送ったものはすべて、誰が見ても、永久に公開されます。

その代わりに Zcash は、あなたに選択肢を与えます。その選択は2回行われます。**1回目は送金先のアドレスを選ぶとき、2回目は履歴を読むためのキーを誰に渡すか決めるときです。**

下の図はその両方を示しています。

![Zcash のキーの種類と、4つのトランザクション経路ごとにブロックエクスプローラーが見られる内容](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## 1つ目の選択: どのアドレスか

すべての Zcash 支払いは2つのアドレス間を移動し、それぞれが transparent または shielded です。つまり4つの経路があり、それぞれ漏れる情報量が異なります。

見た目よりも単純です。**transparent アドレスに触れたものは、すべて公開されます。** 最初から最後まで shielded pool の中に留まる支払いは、手数料以外何も明かしません。

これは特に取引所から出金するときに重要です。多くの取引所は transparent アドレスにしか送金できないため、その出金は公開されます。資金が到着したら、使う前に自分でシールドしてください。

エクスプローラーが正確に何を読み取るのかをより深く知りたい場合は、[ブロックエクスプローラーで見えるもの](/zcash-tech/what-a-block-explorer-can-see) を参照してください。

---

## 2つ目の選択: 誰にキーを渡すか

解除できないプライバシーは実用的ではありません。会計士、監査人、税務当局に何かを証明しなければならないこともあります。Zcash は、あなたにコントロールを手放させることなく、これに対応します。

**Spending key。** すべてを見られ、資金を動かせます。これはお金そのものです。これはあなたの手元に置き、いかなる理由でも誰とも共有しません。

**Full Viewing Key。** 読み取り専用です。入出金の動きと残高を表示できますが、1 zatoshi たりとも使えません。監査人や会計士に渡すのはこれです。

**Incoming Viewing Key。** さらに限定的で、着金する支払いだけを表示します。取引所や加盟店はこれを使ってあなたの入金が反映されたことを確認でき、その間も Spending key はインターネットに一切触れないハードウェア上に置いておけます。

順序が重要です。たまたま持っている一番広いキーではなく、目的を果たせる最も限定的なキーを渡してください。

---

## 初心者が見落としがちな点

**Viewing Key は取り消せません。** 「共有を取り消す」ボタンはありません。いったん誰かがそれを手にすると、そのアドレスが存在する限り読み続けられます。アクセスを止める必要があるなら、資金を新しいアドレスへ移すことになります。

**完全に shielded な支払いでも、手数料は公開されます。** 金額は隠されますが、手数料は隠されません。

**公開情報は永久に残ります。** チェーンが今日表示するものは、20年後にも表示されます。支払いを送った *後で* シールドする、ということはできません。

---

## 実践してみましょう

- [Zodl](https://zodl.com) や [Ywallet](https://ywallet.app/) のように、デフォルトでシールドするウォレットを使いましょう。
- 取引所から資金が届いたら、使う前にすぐシールドしましょう。
- 受取側が対応しているなら、shielded アドレスに支払いましょう。
- Viewing Key を共有する前に、求められている質問に答えるために必要な最小のキーはどれかを確認しましょう。

---

## リソース

- [Viewing Key の解説 (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [選択的開示と Viewing Key (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing keys](https://zips.z.cash/zip-0310)
- [Zcash の技術的な仕組み](https://z.cash/technology/)

## 関連ページ

- [Zcash の基本](/start-here/what-is-zec-and-zcash)
- [Zcash 新規ユーザーガイド](/start-here/new-user-guide)
- [ブロックエクスプローラーで見えるもの](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing keys](/zcash-tech/viewing-keys)
- [トランザクション](/using-zcash/transactions)

---

*この wiki ページに追記や修正提案をしたい場合は、[ZecHub GitHub リポジトリ](https://github.com/ZecHub/zechub) にアクセスして pull request を提出してください。*

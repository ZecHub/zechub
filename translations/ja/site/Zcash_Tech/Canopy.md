<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopyは、2020年11月18日（UTC）にブロック（Block）1,046,400でZcashメインネットにおいて稼働を開始しました。

このページで学べること：創業者報酬（Founders reward）の終了後もZcashがどのようにして自らの開発資金を確保し続けたのか、そしてCanopyがどのようにして、後のアップグレードでも土台となっている資金配分の仕組みを確立したのかを解説します。

CanopyはZcashの5番目のネットワークアップグレード（Network Upgrade）であり、Network Upgrade 4（NU4）とも呼ばれます。[ZIP 251](https://zips.z.cash/zip-0251)によってデプロイされ、2020年11月18日（UTC）にメインネットのブロック1,046,400で有効化されました。これはZcashの最初のブロック報酬の半減期（Halving）と同じタイミングです。Canopyは主にガバナンス（Governance）と金融政策に関するアップグレードでした。当初の創業者報酬を終了させ、新たなZcash Development Fundを開始しました。この基金はElectric Coin Company、Zcash Foundation、そして独立した助成金（Grant）受給者に資金を支払います。この基金の方針は、2019年に行われたコミュニティによる長期的なガバナンスプロセスから生まれました。

なぜ重要なのでしょうか。Zcashには背後に企業が存在しないため、ブロック報酬から自らの開発資金を賄っています。初期の数年間を支えた創業者報酬は、最初の半減期で終了する予定でした。Canopyはその後継であり、各ブロック報酬の一定割合をDevelopment Fundに振り向け、その受取人を定めました。このモデルはその後のアップグレードによって改良され、[NU6.1](../zcash-tech/nu6-1)に至っています。

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## 開発基金

Canopyは当初の創業者報酬を終了させ、Zcash Development Fundに置き換えました。この変更はZcashの最初の半減期と同じブロックで実施され、ブロック報酬は6.25 ZECから3.125 ZECに減少しました。つまりマイナー（Miner）にとっては、報酬が半分になったのと同じ日に、その小さくなった報酬の新たな一部が開発へと流れ始めたことになります。

この基金は、2020年11月の最初の半減期から2024年の2回目の半減期までの4年間運用されるよう設定されました。合意された方針は[ZIP 1014](https://zips.z.cash/zip-1014)としてまとめられました。実際に資金を動かすコンセンサス（Consensus）の仕組みは、ファンディングストリーム（Funding stream）メカニズムです。[ZIP 207](https://zips.z.cash/zip-0207)は、ブロック補助金の一部を定められた受取人に振り向けるための汎用的な方法を導入し、[ZIP 214](https://zips.z.cash/zip-0214)はDevelopment Fundの具体的なルールと受取人のアドレス（Address）を定めました。

## 資金の配分方法

Development Fundは各ブロック報酬の20パーセントを受け取ります。マイナーは残りの80パーセントを受け取ります。その20パーセントは、ZIP 1014に従って3つに分配されます。

1. 35パーセントはElectric Coin Companyの親組織であるBootstrap Projectへ。
2. 25パーセントはZcash Foundationへ。
3. 40パーセントはMajor Grantsへ。これは独立した活動に資金を提供するもので、Zcash Foundationによって運営されます。Major Grantsは後にZcash Community Grants（ZCG）となりました。

基金だけでなくブロック報酬全体に対する割合で見ると、これらの配分はElectric Coin Companyが7パーセント、Zcash Foundationが5パーセント、Major Grantsが8パーセントとなります。どちらの表現も同じ数字を示しています。

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sproutプール（Pool）の変更

Canopyは、最も古いシールドされた（Shielded）プールの廃止にも着手しました。SproutはZcashの最初のシールドされたプールであり、Canopyは[ZIP 211](https://zips.z.cash/zip-0211)を通じてその段階的な縮小を開始しました。

Canopyが有効化された時点から、Sproutプールには新たな価値を追加できなくなりました。技術的に言えば、すべてのJoinSplitのvpub_oldフィールドはゼロでなければなりません。Sproutにすでにある資金は引き続き引き出せるため、誰も資金を閉じ込められることはありませんが、このプールは今後縮小する一方です。これは、より新しいシールドされたプールを優先して、レガシーなSproutプールを最終的に廃止するための第一歩です。

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## 技術的な追加事項

資金に関する変更に加えて、Canopyには2つの小規模な技術的ZIPが含まれていました。[ZIP 212](https://zips.z.cash/zip-0212)は、受取人がSaplingのエフェメラルシークレットを導出する方法を変更し、ノート（Note）の平文から導出するようにしました。[ZIP 215](https://zips.z.cash/zip-0215)はEd25519署名（Signature）を検証するための明示的なルールを定め、どの署名が有効とみなされるかについて、すべてのノード（Node）が正確に合意できるようにしました。

## 要約

- Canopy（NU4）は、メインネットのブロック1,046,400（2020年11月18日 UTC）で有効化されました。これはZcashの最初の半減期と同じブロックで、ブロック報酬は6.25から3.125 ZECに減少しました。
- 創業者報酬を終了させ、Zcash Development Fundを創設しました。各ブロック報酬の20%を、2024年の2回目の半減期までの4年間受け取ります（ZIP 1014が方針、ZIP 207/214が仕組み）。
- 基金の20%は、35%がBootstrap（Electric Coin Company）、25%がZcash Foundation、40%がMajor Grants（後のZcash Community Grants）に配分されます。
- Sproutプールへの新たな価値の追加を停止しました（ZIP 211）。新規の預け入れはできませんが、引き出しは引き続き可能です。
- 2つの技術的ZIPも同時に導入されました：ZIP 212（Saplingのエフェメラルシークレットをノートの平文から導出）とZIP 215（Ed25519の明示的な検証ルール）。

## 基本的な説明

Zcashには背後に企業が存在しないため、ブロック報酬から自らの開発資金を賄っています。創業者報酬は初期の数年間をカバーし、最初の半減期で終了する予定だったため、その期限までに後継の仕組みを用意する必要がありました。Canopyがその後継です。ZIP 207はブロック補助金の一部を定められた受取人アドレスに振り向ける汎用的なファンディングストリームの仕組みを導入し、ZIP 214はDevelopment Fundの具体的なルールとアドレスを定めました。基金だけでなく報酬全体に対する割合で見ると、ECCが7%、Zcash Foundationが5%、Major Grantsが8%となり、同じ数字を2通りの方法で表しています。

Canopyはまた、Zcashの最も古いシールドされたプールであるSproutの廃止にも着手しました。有効化以降、すべてのJoinSplitのvpub_oldフィールドはゼロでなければならないため、価値はSproutから出ることはできても、再び入ることはありません。

## 視覚的なたとえ

Canopyは、スタートアップの創業者給与の段階が終わり、憲法がそれに取って代わる瞬間のようなものです。そのブロック以降、ネットワークが発行する1ドルごとに20セントが維持管理のために確保され、3つの部門に35/25/40の割合で分配されます。同時に、古い倉庫（Sprout）は新たな保管を受け付けなくなります。誰でも自分の品物を引き取ることはできますが、新しいものは何も入りません。

## 詳細解説

ファンディングストリームは信頼ではなくコンセンサスによって強制されます。ノードは、コインベースが定められた受取人に定められた割合を支払っていないブロックを拒否します。Canopyは意図的に半減期のブロックに合わせて実施されたため、マイナーにとっては報酬が半分になったのと同時に、その小さくなった報酬の新たな一部が開発へと流れ始めました。ZIP 212はSaplingのエフェメラルシークレットの導出方法を（ノートの平文から導出するように）変更し、ZIP 215はEd25519の明示的な受け入れルールを定めて、すべてのノードが署名を同一の方法で検証するようにしました。これらは小さな変更ですが、コンセンサスの曖昧さを種類ごと取り除くものでした。

## よくある誤解

- **Canopyを半減期そのものだと考えること。** 両者は同じ有効化ブロックを共有していましたが、別々の変更です。ZIP 251（Canopy）と発行スケジュールは別物です。
- **20%がマイナーの新しい取り分から差し引かれたと解釈すること。** マイナーは80%を受け取り、基金はブロック報酬の20%を受け取ります。
- **Sproutの資金が凍結または破棄されたと思い込むこと。** 引き出しは引き続き可能で、停止されたのは新規の預け入れだけです。
- **「基金の35/25/40」と「報酬の7/5/8」を異なる配分として扱うこと。** これらは異なる基準で測った同じ数字です。
- **Canopyを暗号技術のアップグレードと呼ぶこと。** これは主にガバナンスと金融政策に関するもので、技術的なZIPは小規模な調整にすぎませんでした。


## 用語集

| 用語 | わかりやすい意味 |
|---|---|
| Founders reward | 初期のZcash開発を支えた当初の資金モデルで、最初の半減期で終了する予定だったもの |
| Development Fund | Canopyが開発に振り向けた各ブロック報酬の20パーセントの取り分で、2回目の半減期まで運用されるもの |
| Block reward (subsidy) | 各ブロックがマイニング（Mining）されるたびに新たに生成され支払われるZEC |
| Halving | ブロック報酬が半分に削減される予定されたイベント |
| Funding stream | ブロック補助金の一部を定められた受取人アドレスに振り向けるコンセンサスの仕組み（ZIP 207） |
| Sprout pool | Zcashの最初のシールドされたプールで、Canopyによって新たな価値の受け入れが停止されたもの |

## よくある質問

Canopyによって私のZECやプライバシー（Privacy）は変わりますか？ いいえ。Canopyは開発資金の調達方法といくつかの技術的なルールに関するものです。残高やシールドされたトランザクション（Transaction）には影響しません。

Canopyはブロック報酬を削減しましたか？ CanopyはZcashの最初の半減期と同じブロックで有効化され、その半減期によって報酬は6.25 ZECから3.125 ZECに削減されました。半減期はZcashの金融政策の一部です。Canopyの役割は、その小さくなった報酬の一部をどのように使うかを決めることでした。

Development Fundは何のためのものですか？ Zcashを開発する人々に資金を提供するためのものです。資金はElectric Coin Company（Bootstrap Projectを通じて）、Zcash Foundation、そして独立した活動を支援するMajor Grantsに配分されます。

Sproutプールにある資金はまだ使えますか？ はい。Sproutにすでにある資金は引き続き引き出せます。ただし、Canopy以降は新たな価値を追加することはできません。

Development Fundは恒久的なものですか？ いいえ。2020年11月の最初の半減期から2024年の2回目の半減期までの4年間運用されるよう設定されており、再検討する前にコミュニティがその仕組みを見極める時間が設けられていました。

CanopyはNU6やNU6.1とどのような関係がありますか？ Canopyは3者への資金配分とファンディングストリームの仕組みを確立しました。NU6やNU6.1を含むその後のアップグレードは、この基盤の上に構築されたDevelopment Fundを見直し、再構成しました。

## 理解度チェック

CanopyはZcashの最初の半減期とまったく同じブロックで有効化されました。なぜこのタイミングが選ばれたのでしょうか。また、Canopyがなければ開発資金はどうなっていたでしょうか？

<details>
<summary>答え</summary>

当初の創業者報酬は最初の半減期で終了する予定でした。Canopyがなければ、半減期後の小さくなったブロック報酬はすべてマイナーに渡り、プロトコルレベルでの開発資金はなくなっていたでしょう。Canopyはまさにそのブロックで創業者報酬をDevelopment Fundに置き換えたため、資金調達は途切れることなく継続されました。
</details>

### 参考資料

[ZIP 251：Canopyネットワークアップグレードのデプロイ](https://zips.z.cash/zip-0251)

[ZIP 1014：ECC、ZF、Major Grantsのための開発基金の設立](https://zips.z.cash/zip-1014)

[ZIP 207：ファンディングストリーム](https://zips.z.cash/zip-0207)

[ZIP 214：Zcash開発基金のコンセンサスルール](https://zips.z.cash/zip-0214)

[ZIP 211：Sproutチェーン（Chain）バリュープールへの新たな価値の追加の無効化](https://zips.z.cash/zip-0211)

[Canopyネットワークアップグレード](https://z.cash/upgrade/canopy/)

### 関連項目

[Zcashネットワークアップグレード](../start-here/network-upgrades)

[開発基金](../start-here/development-fund)

[Zcashの金融政策](../start-here/zcash-monetary-policy)

[シールドされたプール](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcashのガバナンス](../zcash-community/zcash-governance)

---

## 関連ページ

- [Sprout](./Sprout.md) — Canopyが新規の預け入れを停止したプール
- [Heartwood](./Heartwood.md) — シリーズの前のアップグレード
- [NU5](./NU5.md) — Orchardを導入した次のアップグレード
- [NU6.1](./NU6_1.md) — 開発資金に関する最新の改良


シリーズ：[ネットワークアップグレード一覧](../start-here/network-upgrades) · 前へ：[Heartwood](../zcash-tech/heartwood) · 次へ：[NU5](../zcash-tech/nu5)

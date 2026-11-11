<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Canopy

> Canopyは、Zcashメインネットのブロック1,046,400で2020年11月18日（UTC）に稼働開始しました。

ここで学べること: 創設者報酬の終了後にZcashがどのように自らの開発資金を確保し続けたか、また後続のアップグレードの基盤となった資金配分をCanopyがどのように整えたかを学びます。

CanopyはZcashの5番目のネットワークアップグレード（network upgrade）であり、ネットワークアップグレード4（NU4）とも呼ばれます。これは[ZIP 251](https://zips.z.cash/zip-0251)によって展開され、Zcashの初めてのブロック報酬半減期と同時の2020年11月18日（UTC）、メインネットのブロック1,046,400で有効化されました。Canopyは主にガバナンス（governance）および金融面のアップグレードでした。これにより元の創設者報酬が終了し、Zcash開発基金（Development Fund）が開始されました。この基金はElectric Coin Company、Zcash Foundation、および独立した助成金（grant）受給者に支払われます。この基金の方針は、2019年にわたる長期的なコミュニティ・ガバナンスのプロセスから生まれました。

これが重要である理由。Zcashには背後に企業がないため、ブロック報酬から自らの開発資金を賄っています。初期の数年間を支えた創設者報酬は、最初の半減期に終了するよう設定されていました。Canopyはその代替となるものでした。各ブロック報酬の一定割合を開発基金に振り向け、受給者を定めました。このモデルは、[NU6.1](../zcash-tech/nu6-1)に至るまで後続のアップグレードによって改善されました。

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## 開発基金

Canopyは元の創設者報酬を終了し、Zcash開発基金に置き換えました。この変更は、ブロック報酬が6.25 ZECから3.125 ZECへ低下した、Zcashの最初の半減期と同じブロックで実施されました。そのためマイナー（miner）は、より少額となった報酬の新たな一部が開発へ流れ始めたその日に、報酬が半減しました。

この基金は、2020年11月の最初の半減期から2024年の2回目の半減期まで、4年間運用される予定でした。合意された方針は[ZIP 1014](https://zips.z.cash/zip-1014)として文書化されました。実際に資金を移動させるコンセンサス（consensus）の仕組みは資金ストリーム（funding stream）メカニズムです。[ZIP 207](https://zips.z.cash/zip-0207)は、ブロック補助金の一部を定義済みの受取人へ振り向ける一般的な方法を導入し、[ZIP 214](https://zips.z.cash/zip-0214)は開発基金に関する具体的なルールおよび受取アドレス（address）を定めました。

## 資金の配分方法

開発基金は、各ブロック報酬の20パーセントを受け取ります。マイナーは残りの80パーセントを受け取ります。この20パーセントは、ZIP 1014に従って3通りに配分されます。

1. Bootstrapプロジェクトへ35パーセント。この組織はElectric Coin Companyの親組織です。
2. Zcash Foundationへ25パーセント。
3. 独立した活動に資金を提供し、Zcash Foundationが管理するMajor Grantsへ40パーセント。Major Grantsは後にZcash Community Grants（ZCG）となりました。

基金だけでなくブロック報酬全体に対する割合で測ると、Electric Coin Companyは7パーセント、Zcash Foundationは5パーセント、Major Grantsは8パーセントとなります。どちらの説明でも数値は同じです。

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sproutプール（pool）の変更

Canopyは、最も古いシールドされた（shielded）プールの廃止も開始しました。SproutはZcashの最初のシールドされたプールであり、Canopyは[ZIP 211](https://zips.z.cash/zip-0211)を通じてその段階的な縮小を始めました。

Canopyが有効化された時点から、新たな価値をSproutプールへ追加することはできません。技術的には、すべてのJoinSplitのvpub_oldフィールドはゼロでなければなりません。すでにSproutにある資金は引き出せるため、誰も利用不能にはなりませんが、この先プールは縮小するだけです。これは、レガシーのSproutプールを、より新しいシールドされたプールへ移行して最終的に廃止するための第一歩です。

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## 技術的な追加事項

資金調達に関する変更に加え、Canopyには2つの小規模な技術的ZIPが含まれていました。[ZIP 212](https://zips.z.cash/zip-0212)は、受取人がSaplingの一時的な秘密情報を導出する方法を変更し、ノート（note）の平文から導出するようにしました。[ZIP 215](https://zips.z.cash/zip-0215)は、Ed25519署名（signature）を検証するための明示的なルールを定め、すべてのノード（node）がどの署名を有効と見なすかについて正確に合意できるようにしました。

## 用語集

| 用語 | 平易な説明 |
|---|---|
| Founders reward | 初期のZcash開発に支払われた元の資金調達モデルで、最初の半減期に終了する予定でした |
| Development Fund | Canopyが開発へ振り向けた各ブロック報酬の20パーセントで、2回目の半減期まで運用されました |
| Block reward (subsidy) | 各ブロックがマイニング（mining）される際に新たに作成され、支払われるZEC |
| Halving | ブロック報酬が半分に削減される予定されたイベントです |
| Funding stream | ブロック補助金の一部を定義済みの受取アドレスに振り向けるコンセンサスの仕組み（ZIP 207）です |
| Sprout pool | Zcashの元のシールドされたプールであり、Canopyが新たな価値の追加を停止しました |

## よくある質問

Canopyは私のZECやプライバシーを変更しますか？ いいえ。Canopyは、開発資金の調達方法と、いくつかの技術的ルールに関するものです。残高およびシールドされたトランザクション（transaction）には影響しません。

Canopyはブロック報酬を削減しましたか？ Canopyは、報酬を6.25 ZECから3.125 ZECへ削減したZcashの最初の半減期と同じブロックで有効化されました。半減期はZcashの金融政策の一部です。Canopyの役割は、その少額となった報酬の一部をどのように使うかを決めることでした。

開発基金は何のためのものですか？ Zcashを構築する人々に資金を提供します。資金はElectric Coin Company（Bootstrapプロジェクトを通じて）、Zcash Foundation、および独立した活動を支援するMajor Grantsへ送られます。

Sproutプール内の資金はまだ使用できますか？ はい。すでにSproutにある資金は引き出せます。ただし、Canopy以降、新たな価値をそこへ追加することはできません。

開発基金は恒久的なものですか？ いいえ。2020年11月の最初の半減期から2024年の2回目の半減期までの4年間運用されるように設定されており、再検討する前にコミュニティがその仕組みを確認する時間を設けていました。

CanopyはNU6およびNU6.1とどのような関係がありますか？ Canopyは、3方向の資金配分と資金ストリームの仕組みを整えました。NU6およびNU6.1を含む後続のアップグレードでは、その基盤の上に構築された開発基金が再検討され、再構成されました。

## 理解度チェック

CanopyはZcashの最初の半減期とまったく同じブロックで有効化されました。なぜこのタイミングが選ばれたのでしょうか。また、Canopyがなければ開発資金はどうなっていたでしょうか。

<details>
<summary>回答</summary>

元の創設者報酬は、最初の半減期に終了する予定でした。Canopyがなければ、半減期後のより少額なブロック報酬はすべてマイナーに送られ、開発のためのプロトコルレベルの資金はなくなっていたでしょう。Canopyは、まさにそのブロックで創設者報酬を開発基金へ置き換えたため、資金提供は中断なく継続しました。
</details>

### リソース

[ZIP 251: Canopyネットワークアップグレードの展開](https://zips.z.cash/zip-0251)

[ZIP 1014: ECC、ZF、およびMajor Grantsのための開発基金の設立](https://zips.z.cash/zip-1014)

[ZIP 207: 資金ストリーム](https://zips.z.cash/zip-0207)

[ZIP 214: Zcash開発基金のコンセンサスルール](https://zips.z.cash/zip-0214)

[ZIP 211: Sproutチェーン（chain）価値プールへの新たな価値追加の無効化](https://zips.z.cash/zip-0211)

[Canopyネットワークアップグレード](https://z.cash/upgrade/canopy/)

### 関連項目

[Zcashネットワークアップグレード](../start-here/network-upgrades)

[開発基金](../start-here/development-fund)

[Zcash金融政策](../start-here/zcash-monetary-policy)

[シールドされたプール](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcashガバナンス](../zcash-community/zcash-governance)

---

シリーズ: [ネットワークアップグレード索引](../start-here/network-upgrades) · 前へ: [Heartwood](../zcash-tech/heartwood) · 次へ: [NU5](../zcash-tech/nu5)

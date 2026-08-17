<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Canopy

> Canopy はブロック 1,046,400（2020年11月18日 UTC）で Zcash メインネット上で有効化されました。

ここで学べること: 創設者報酬が終了した後も Zcash がどのように自らの開発資金を確保し続けたのか、そして Canopy が後続のアップグレードでも土台として使われる資金配分をどのように整えたのか。

Canopy は Zcash における5回目のネットワークアップグレードで、Network Upgrade 4（NU4）とも呼ばれます。これは [ZIP 251](https://zips.z.cash/zip-0251) によって導入され、2020年11月18日（UTC）のメインネットのブロック 1,046,400 で有効化されました。これは Zcash における最初のブロック報酬半減とまったく同じタイミングでした。Canopy は主にガバナンスと通貨設計に関するアップグレードでした。これにより当初の創設者報酬は終了し、新たに Zcash Development Fund が開始されました。この基金は Electric Coin Company、Zcash Foundation、そして独立した助成金受給者に支払われます。この基金の方針は、2019年に行われた長期のコミュニティ・ガバナンス・プロセスから生まれました。

これが重要な理由。Zcash には背後に企業が存在しないため、ブロック報酬から自らの開発資金を賄っています。初期の数年間の開発費を支えた創設者報酬は、最初の半減時に終了する予定でした。Canopy はその置き換えでした。各ブロック報酬の一定割合を Development Fund に振り向け、その受け取り先を定めたのです。このモデルは後続のアップグレードでさらに洗練され、[NU6.1](../zcash-tech/nu6-1) にまで引き継がれています。

![Canopy 以前は創設者報酬が開発資金を賄っており、最初の半減時に終了する予定でした。Canopy 以後は Development Fund が各ブロック報酬の20パーセントを受け取り、2024年の2回目の半減まで続きます](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## 開発基金

Canopy は当初の創設者報酬を終了させ、それを Zcash Development Fund に置き換えました。この変更は、Zcash 最初の半減によってブロック報酬が 6.25 ZEC から 3.125 ZEC に下がるのと同じブロックで実施されました。つまりマイナーは、報酬が半分になるのと同じ日に、その小さくなった報酬の新たな一部が開発に流れ始めることになったのです。

この基金は4年間、2020年11月のこの最初の半減から2024年の2回目の半減まで継続するよう設定されました。合意された方針は [ZIP 1014](https://zips.z.cash/zip-1014) として文書化されています。実際に資金を動かすコンセンサス上の仕組みは funding stream メカニズムです。[ZIP 207](https://zips.z.cash/zip-0207) はブロック補助金の一部を定義済みの受取人に割り当てる一般的な方法を導入し、[ZIP 214](https://zips.z.cash/zip-0214) は Development Fund の具体的なルールと受取アドレスを定めました。

## 資金はどう分配されるか

Development Fund は各ブロック報酬の20パーセントを受け取ります。マイナーは残りの80パーセントを受け取ります。その20パーセントは、ZIP 1014 に従ってさらに3つに分配されます。

1. 35パーセントは Bootstrap Project（Electric Coin Company の親組織）へ。
2. 25パーセントは Zcash Foundation へ。
3. 40パーセントは Major Grants へ。これは独立した活動に資金を提供し、Zcash Foundation によって運営されます。Major Grants は後に Zcash Community Grants (ZCG) になりました。

基金全体ではなくブロック報酬全体に対して換算すると、これらの割合は Electric Coin Company に7パーセント、Zcash Foundation に5パーセント、Major Grants に8パーセントとなります。どちらの言い方でも、数字としては同じです。

![Development Fund は各ブロック報酬の20パーセントであり、その内訳は Bootstrap と Electric Coin Company に35パーセント、Zcash Foundation に25パーセント、Major Grants に40パーセントです](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Sprout プールの変更

Canopy はまた、最も古いシールド化プールの段階的な終了も開始しました。Sprout は Zcash 最初のシールド化プールであり、Canopy は [ZIP 211](https://zips.z.cash/zip-0211) を通じてその縮小を始めました。

Canopy が有効化された瞬間から、Sprout プールには新しい価値を追加できなくなりました。技術的には、すべての JoinSplit における vpub_old フィールドは 0 でなければなりません。すでに Sprout にある資金は引き出せるため、誰かが締め出されることはありませんが、この先このプールは縮小する一方になります。これは、従来の Sprout プールを最終的に新しいシールド化プールへ置き換えて廃止するための第一歩です。

![Canopy 以前は価値を Sprout プールに入れることも出すこともできました。Canopy 以後は新しい価値を入れることはできませんが、引き出しは引き続き可能です](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## 技術的な追加事項

資金面の変更に加えて、Canopy には2つの比較的小さな技術的 ZIP も含まれていました。[ZIP 212](https://zips.z.cash/zip-0212) は受取人が Sapling の ephemeral secret を導出する方法を変更し、それを note plaintext から導出するようにしました。[ZIP 215](https://zips.z.cash/zip-0215) は Ed25519 署名を検証するための明示的なルールを定め、すべてのノードがどの署名を有効とみなすかについて正確に一致するようにしました。

## 用語集

| 用語 | わかりやすい意味 |
|---|---|
| Founders reward | 初期の Zcash 開発費を支えた当初の資金モデルで、最初の半減時に終了する予定だったもの |
| Development Fund | Canopy が開発向けに振り向けた各ブロック報酬の20パーセント分で、2回目の半減まで続くもの |
| Block reward (subsidy) | 各ブロックが採掘されるたびに新たに作られ、支払われる ZEC |
| Halving | ブロック報酬が半分に減る予定されたイベント |
| Funding stream | ブロック補助金の一部を定義済みの受取アドレスへ振り向けるコンセンサス上の仕組み（ZIP 207） |
| Sprout pool | Zcash の当初のシールド化プールで、Canopy によって新しい価値の受け入れが停止されたもの |

## FAQ

Canopy は私の ZEC やプライバシーを変えますか？ いいえ。Canopy は開発資金の調達方法と、いくつかの技術的ルールに関するものです。あなたの残高やシールド化トランザクションには影響しません。

Canopy はブロック報酬を減らしましたか？ Canopy は Zcash 最初の半減と同じブロックで有効化され、その半減により報酬は 6.25 ZEC から 3.125 ZEC に減りました。半減は Zcash の通貨政策の一部です。Canopy の役割は、その小さくなった報酬の一部をどのように使うかを決めることでした。

Development Fund は何のためのものですか？ Zcash を構築する人々に資金を提供するためです。資金は Electric Coin Company（Bootstrap Project を通じて）、Zcash Foundation、そして独立した活動を支援する Major Grants に送られます。

Sprout プール内の資金はまだ使えますか？ はい。すでに Sprout にある資金は引き続き引き出せます。ただし Canopy 以後は新しい価値を追加することはできません。

Development Fund は恒久的なものですか？ いいえ。2020年11月の最初の半減から2024年の2回目の半減まで、4年間運用されるよう設定されていました。これによりコミュニティは、再検討する前にその仕組みがどのように機能するかを見る時間を得られました。

Canopy は NU6 や NU6.1 とどう関係していますか？ Canopy は3者への資金配分と funding stream の仕組みを整えました。その後の NU6 や NU6.1 を含むアップグレードは、その土台の上に構築された Development Fund を見直し、再構成しました。

## 理解度チェック

Canopy は Zcash 最初の半減とまったく同じブロックで有効化されました。なぜそのタイミングが選ばれたのでしょうか。また、Canopy がなければ開発資金はどうなっていたでしょうか？

<details>
<summary>答え</summary>

当初の創設者報酬は、最初の半減時に終了する予定でした。Canopy がなければ、半減後の小さくなったブロック報酬はすべてマイナーに渡り、プロトコルレベルの開発資金は一切残らないことになっていました。Canopy はまさにそのブロックで創設者報酬を Development Fund に置き換えたため、資金供給は途切れることなく継続しました。
</details>

### リソース

[ZIP 251: Canopy Network Upgrade の導入](https://zips.z.cash/zip-0251)

[ZIP 1014: ECC、ZF、Major Grants のための Dev Fund の設立](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Zcash Development Fund のコンセンサスルール](https://zips.z.cash/zip-0214)

[ZIP 211: Sprout Chain Value Pool への新しい価値の追加を無効化する](https://zips.z.cash/zip-0211)

[Canopy Network Upgrade](https://z.cash/upgrade/canopy/)

### あわせて読む

[Zcash Network Upgrades](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash Monetary Policy](../start-here/zcash-monetary-policy)

[Shielded Pools](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash Governance](../zcash-community/zcash-governance)

---

シリーズ: [Network Upgrades index](../start-here/network-upgrades) · 前: [Heartwood](../zcash-tech/heartwood) · 次: [NU5](../zcash-tech/nu5)

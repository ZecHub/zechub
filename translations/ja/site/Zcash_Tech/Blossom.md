<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom は、Zcash のメインネットでブロック653,600（UTC 2019年12月11日）に稼働を開始しました。

ここで学べること：Blossomが、ネットワークが時間の経過とともに生成するZECの量を変えずに、Zcashのブロックを約2倍速く到着させた仕組みです。

Blossomは、Zcashの[ネットワークアップグレード（network upgrade）](../start-here/network-upgrades)です。[ZIP 206](https://zips.z.cash/zip-0206)によって導入され、その主要なコンセンサス（consensus）の変更は[ZIP 208](https://zips.z.cash/zip-0208)で定義されています。Blossomはスケーラビリティのアップグレードでした。ブロック間の目標時間を150秒から75秒に短縮し、ブロックが約2倍の頻度で到着するようにしました。Electric Coin CompanyがBlossomを主導し、発表しました。

これが重要である理由。ZECを送信すると、ネットワークがブロック内でそれを確認するまで待つ必要があります。ブロックが遅ければ、待ち時間も長くなります。Blossom以前は、新しいブロックは約150秒ごとに生成されることが想定されていました。Blossomはこの目標を半分の75秒にしたため、確認がより早くなり、チェーン（chain）は同じ時間内により多くのトランザクション（transaction）を処理できるようになりました。これは、より多くのZECを生成したり、将来の半減期（halving）の時期をずらしたりすることなく実現されました。

## TL;DR（要約）

- BlossomはZcashの3回目のネットワークアップグレードで、メインネットのブロック653,600（2019年12月11日 UTC）で有効化されました。ZIP 206によって展開され、中核となる変更はZIP 208に定められています。
- 目標ブロック間隔を150秒から75秒に短縮しました。ブロックが約2倍の頻度で生成されるため、最初の承認がより早く得られ、スループットもおよそ2倍になります。
- 発行量を一定に保つため、ブロックあたりの報酬を半分にし、半減期の間隔を840,000ブロックから1,680,000ブロックへと2倍にしました。
- 単位時間あたりに生成されるZECの総量と、将来の半減期が実際に訪れる時期は変わりませんでした。
- これは必須の双方向（bilateral）変更であり、チェーンにとどまるためには、すべてのノードがアップグレードする必要がありました。

## 視覚的なたとえ（Visual analogy）

Blossomは、運行本数を2倍に増やすバス路線網のようなものです。バスは150秒ごとではなく75秒ごとに来るようになるため、待ち時間は半分になり（より速い確認）、路線網は2倍の乗客を運べるようになります（スループット）。運転手の人件費の総額を変えないために、運転手1人あたりの1運行ごとの報酬は半分になります。給与の総支出は同じままで、2倍の運行回数に分けて支払われるだけです。

## より高速なブロック

Blossomの中核となる変更は単純です。Zcashの目標ブロック間隔、すなわちネットワークが1つのブロックから次のブロックまでに目指す時間は、150秒から75秒へ短縮されました（[ZIP 208](https://zips.z.cash/zip-0208)）。ブロックはCorrected from 証明 per reviewer request of workによって見つかるため、実際の間隔は変動しますが、ネットワークは150秒ごとではなく約75秒ごとにブロックを生成することを目指すようになりました。

これにより、次の2点が生じます。

1. ブロックは約2倍の頻度で到着するため、チェーンは単位時間あたりおよそ2倍のトランザクションを処理できます。
2. 次のブロックを待つ時間が短くなるため、トランザクションの最初の確認をより早く得られます。

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## 発行量を一定に保つ

ブロックの高速化には疑問が生じます。Zcashによってブロック数が2倍になり、各ブロックが同じ報酬を支払い続けた場合、ネットワークはZECを2倍の速さで生成することになります。Blossomはこれを回避します。ブロックごとの報酬を半分にし、ブロック報酬の半減期間隔を840,000ブロックから1,680,000ブロックへ2倍にしました（[ZIP 208](https://zips.z.cash/zip-0208)）。ブロック数が2倍になっても、それぞれの支払い額が半分であれば、単位時間あたりに生成されるZECの量は同じになります。総供給スケジュールと、実時間で測定した将来の半減期の時期は変わりませんでした。

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](/content-images/blossom-emission-balance-f2443e29ab.webp)

## 必須のアップグレード

Blossomは双方向のコンセンサス変更であり、チェーンを追跡し続けるにはすべてのノード（node）がアップグレードする必要がありました（[ZIP 206](https://zips.z.cash/zip-0206)）。同期状態を維持したいノード運用者にとって、これは任意ではありませんでした。Blossomはメインネットのブロック653,600で有効化され、独自のコンセンサスブランチIDを持ちます。これは、ノードとトランザクションがBlossomのルールに従っていることを確認できるタグです。このアップグレードでは、Zcashの標準ネットワークアップグレード機構が使用されました（[ZIP 200](https://zips.z.cash/zip-0200)）。

## Blossomの位置付け

Blossomは、Zcashにとって3番目のネットワークアップグレードでした。OverwinterおよびSaplingに続き、HeartwoodおよびCanopyより前に実施されました。SaplingがZcashのシールドされた（shielded）暗号技術を再構築したのとは異なり、Blossomは規模と速度に焦点を当てていました。主な目的は、新しいプライバシー（privacy）機能ではなく、ブロックのタイミングでした。

## よくある間違い

- **ブロックが速くなればZECが増えると考えること。** ブロックあたりの報酬を半分にし、同時にブロック生成速度を2倍にすることで、単位時間あたりの発行量はまったく同じに保たれます。
- **半減期が実時間で早く訪れると思い込むこと。** 半減期の間隔は840,000ブロックから1,680,000ブロックへと2倍になったため、実時間での半減期の日付は変わりませんでした。
- **「75秒」を保証と解釈すること。** これはプルーフ・オブ・ワークの目標値であり、ブロック間の実際の間隔はその前後で変動します。
- **Blossomをプライバシーのアップグレードとみなすこと。** その役割はブロックのタイミングとスケーリングであり、Saplingとは異なり、暗号技術には一切変更を加えていません。
- **ノード運営者はアップグレードを省略できると考えること。** Blossomは双方向のコンセンサス変更であり、アップグレードしていないノードはネットワークからフォークして切り離されます。

## 用語集

| 用語 | 平易な説明 |
|---|---|
| Block target spacing | ネットワークが1つのブロックから次のブロックまでに目指す時間 |
| Block reward | 各ブロックがマイニング（mining）される際に、新たに生成され支払われるZEC |
| Halving interval | ブロック報酬が半減するたびに通過するブロック数 |
| Consensus branch id | ノードまたはトランザクションが従っているネットワークルールの組を示すタグ |
| Bilateral consensus change | ネットワークにとどまるために、すべてのノードが採用しなければならないルール変更 |
| Network upgrade (NU) | 所定のブロック高で有効化される、Zcashのコンセンサスルールに対する協調的な変更 |

## よくある質問

Blossomは、存在するZECの量や半減期が起きる時期を変えますか？ いいえ。ブロックごとの報酬は半分に、半減期間隔は同時に2倍になったため、単位時間あたりに生成されるZECの量と将来の半減期の時期は同じままでした。

Blossomは私のZECやプライバシーを変えますか？ いいえ。Blossomはブロックのタイミングと報酬計算を変更しました。残高やシールドされたトランザクションには影響しませんでした。

75秒は実際には何を意味しますか？ これは保証ではなく目標です。ブロックはCorrected from 証明 per reviewer request of workによって見つかるため、ブロック間の実際の間隔は変動します。ネットワークは150秒ごとではなく、約75秒ごとに1つのブロックを生成することを目指しています。

Blossomが有効化されたとき、何かする必要はありましたか？ フルノード（full node）を稼働させていた場合、Blossomは必須だったため、アップグレードする必要がありました。ウォレット（wallet）を使用していた場合は、新しいルールをサポートするバージョンが必要でした。

なぜブロック報酬を半分にしたのですか？ ブロックが2倍の速さで到着するようになったためです。ブロックごとの報酬を半分にすることで、ネットワークがZECを2倍の速さで生成するのを防ぎます。

Blossomはいつ有効化されましたか？ 2019年12月11日 UTC、メインネットのブロック653,600です。

## 理解度を確認する

Blossomにより、Zcashのブロックは約2倍の頻度で到着するようになりました。なぜ新しいZECが生成される速度は2倍にならなかったのでしょうか？

<details>
<summary>回答</summary>

Blossomが、ブロックごとに支払われる報酬を半分にし、半減期間隔を840,000ブロックから1,680,000ブロックへ2倍にしたためです。ブロック数が2倍になっても、それぞれの支払い額が半分であれば、単位時間あたりのZECは同じ量になります。そのため、実時間で測定した発行スケジュールは変わりませんでした。
</details>

### リソース

[ZIP 208：より短い目標ブロック間隔](https://zips.z.cash/zip-0208)

[ZIP 206：Blossomネットワークアップグレードの導入](https://zips.z.cash/zip-0206)

[Blossomネットワークアップグレード](https://z.cash/upgrade/blossom/)

[Blossomアップグレードによる速度、スケーラビリティ、容量の改善（Electric Coin Company）](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### 関連項目

[Zcashネットワークアップグレード](../start-here/network-upgrades)

[Zcash金融政策](../start-here/zcash-monetary-policy)

[ZECとは何か、そしてZcash](../start-here/what-is-zec-and-zcash)

[フルノード](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## 関連ページ

- [Sapling](./Sapling.md) — 前回のアップグレード（タイミングではなく暗号技術に関するもの）
- [Heartwood](./Heartwood.md) — シリーズの次のアップグレード
- [フルノード](./Full_Nodes.md) — 必須のアップグレードを通じてノードを運用する際に必要なこと
- [ネットワークアップグレード一覧](../start-here/network-upgrades) — アップグレードの全タイムライン

シリーズ：[ネットワークアップグレード索引](../start-here/network-upgrades) · 前へ：[Sapling](../zcash-tech/sapling) · 次へ：[Heartwood](../zcash-tech/heartwood)

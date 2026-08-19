<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="編集ページ"/>
</a>

# Sprout

> Zcashは2016年10月28日、Sproutシールドプールとともにローンチされました。

ここでわかること: SproutはZcashの出発点であり、プライベートで検証可能なお金が初めて実際のブロックチェーン上で稼働した場所です。

SproutはZcashネットワークの最初のローンチであり、後の[ネットワークアップグレード](../start-here/network-upgrades)ではありません。2016年10月28日のジェネシスブロックで稼働を開始しました。Sproutを定義する番号付きZIPは存在しません。ZIPプロセスは後のOverwinterから始まったため、Sproutは元のZcash Protocol Specificationと、その基盤となったZerocash構造によって説明されます。[Electric Coin Company](../zcash-organizations/electric-coin-company)（当時はZerocoin Electric Coin Company）は、Zooko Wilcoxの主導のもとでこれを構築し、リリースしました。Sproutは、実用的な初のzk-SNARKシールドトランザクションと最初のシールドプールを導入し、ネットワークが残高の整合性を確認し続けながら、送信者、受信者、金額を隠したままZECを送れるようにしました。この名前には、チームが成長を期待していた若く芽吹くチェーンという意味が込められていました。

なぜこれが重要なのか。それまでのすべてのパブリックブロックチェーンでは、あなたの支払いは公開されていました。誰が誰にいくら支払ったかを、誰でも見ることができたのです。Sproutは、それらの詳細を隠しながら、それでも不正が行われていないことを証明できる、初の実稼働パーミッションレスネットワークでした。これは、現金や他人には読めない銀行明細に期待するような、ごく普通の金融プライバシーにとって重要です。また、強力なオンチェーンプライバシーが、単なる論文上の設計を超えて、実際に機能することも証明しました。これを可能にしたtrusted-setup Ceremonyは、その後の暗号技術研究における参照点となり、Sproutに搭載された低速でメモリ負荷の高い証明システムこそが、2年後にチームがSaplingを構築する直接の動機となりました。

## 最初のシールドプール

Sproutは2種類のアドレスを作りました。透明アドレス（t-address）はBitcoinのように機能し、詳細は公開台帳上で見えます。シールドアドレス（z-address）は資金をSproutの[シールドプール](../using-zcash/shielded-pools)に送ります。そこでは送信者、受信者、金額が隠されたままになります。その仕組みが[zk-SNARKs](../zcash-tech/zk-snarks)です。これはゼロ知識証明であり、二重支払いがなく、残高の合計が一致していることを、詳細を一切明かさずにトランザクションが有効であると示せます。Sproutは、これが実際の暗号通貨で本番稼働した初めての事例でした。

![透明トランザクションは送信者・受信者・金額を公開する一方、Sproutのシールドトランザクションは3つすべてを隠しつつ検証可能なままです](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Ceremony

Sproutのzk-SNARKsには公開パラメータのセットが必要であり、それを安全に生成するには、Ceremonyと呼ばれる一度限りのセットアップが必要でした。離れた別々の場所にいた6人の参加者が、それぞれtoxic wasteと呼ばれる秘密の断片を生成しました。もし誰かがそれらすべての断片を再び集めることができれば、何もないところからZECを偽造できてしまいます。この設計は、そのリスクを単純なルールに変えました。少なくとも1人の参加者が自分の断片を破棄しさえすれば、完全な秘密は二度と再構築できず、偽造は不可能なままだというものです。公に名前が明かされている参加者には、Zooko Wilcox、Andrew Miller、Peter Van Valkenburgh、Peter Todd、そしてNCC GroupのDerek Hinchが含まれます。1人の参加者は匿名のままでいることを選びました。

![Ceremony: 6人の参加者が秘密の断片を生成し、その後toxic wasteを破棄して、公開されたSproutパラメータだけを残します](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## 起源

Sproutは、その後のあらゆる変更の土台です。Overwinterでネットワークアップグレードの仕組みが導入されたとき、元のルールにはconsensus branch id 0というラベルが付けられました。これは単に、まだどのアップグレードも適用されていないことを意味します。それ以降のすべて（Overwinter、Sapling、Blossom、Heartwood、Canopy、NU5、NU6、そしてその先）は、Sproutが始めたチェーンの上に成り立っています。ローンチは2016年8月に、10月28日のジェネシスに向けて発表され、Ceremonyはその前の数週間に実施され、ジェネシスブロックにハードコードされたタイムスタンプは2016年10月28日07:56 UTCとなっています。

![2016年8月の発表からパラメータCeremonyを経て、2016年10月28日のSproutローンチまでのタイムライン](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## 用語集

| 用語 | わかりやすい意味 |
|---|---|
| zk-SNARK | 送信者、受信者、金額を明かさずにトランザクションが有効であることを示すゼロ知識証明 |
| Shielded pool | 金額や当事者が隠されるZcashのプライベート側。Sproutプールはその最初のものでした |
| z-address and t-address | z-addressはシールドされており、詳細を非公開に保ちます。t-addressは透明で、公開台帳上に詳細を表示します |
| The Ceremony | Sproutの公開パラメータを生成し、その後toxic wasteを破棄した2016年のマルチパーティセットアップ |
| Toxic waste | Ceremonyで生成された秘密鍵の断片。ZECが偽造されないよう破棄される必要がありました |
| Consensus branch id 0 | Sproutのルールを表すラベル。ネットワークアップグレード前の基準状態を意味します |

## FAQ

Sproutは今の私のZECやプライバシーを変えますか？ いいえ。Sproutは歴史であり、あなたのZECが存在するチェーンを始動させたローンチです。現在のあなたのコインやプライバシーは、Sproutについて何かをする必要があるかどうかではなく、今使っているウォレットとシールドプールに依存します。

なぜSproutにはZIP番号がないのですか？ ZIPプロセスは後のOverwinterアップグレードから始まりました。Sproutは元のローンチであり、Zcash Protocol Specificationと、それが基づいていたZerocash構造によって説明されます。ZIP 200は、Sproutを後から振り返って、あらゆるアップグレード前の基準状態であるconsensus branch id 0として言及しているだけです。

Ceremonyの6人を信頼する必要があったのですか？ このセットアップは、そのうち1人だけが誠実であれば成立するよう設計されていました。各参加者は秘密の断片を保持しており、たった1人でも自分の断片を破棄すれば、完全な秘密は二度と再構築できず、誰もZECを偽造できません。5人の参加者は公に名前が明かされ、1人は匿名のままでした。

Sproutプールは今私のウォレットが使っているものですか？ おそらく違います。Sproutは最初のシールドプールでしたが、その後Saplingのようなアップグレードでより高速なシールド設計が導入され、現在ほとんどのウォレットは新しいプールを使っています。それでもSproutは、プライベートで検証可能なトランザクションが実際のネットワークで稼働できることを証明した取り組みとして重要です。

SproutはBitcoinと何が違ったのですか？ Bitcoinは、すべての支払いを金額やアドレスが見える公開台帳に記録します。Sproutは、送信者、受信者、金額を隠しながら、それでもネットワークがトランザクションの有効性を確認できるシールドトランザクションを追加しました。同時に透明アドレスも維持したため、両方の形式が同じチェーン上に共存しています。

## 理解度チェック

Sproutはしばしば、アクティベーション高度を持つネットワークアップグレードだと呼ばれます。なぜそれは完全には正しくないのでしょうか？

<details>
<summary>答え</summary>

Sproutは後のアップグレードではなく、Zcashの最初のローンチです。2016年10月28日のジェネシスブロック（ブロック0）から有効になっているため、特定のアクティベーション高度は存在しません。ネットワークアップグレードの仕組みは後から導入され、Sproutのルールを、あらゆるアップグレード前の基準状態であるconsensus branch id 0としてラベル付けしました。
</details>

### リソース

[ZIP 200: ネットワークアップグレードの仕組み](https://zips.z.cash/zip-0200)

[Zcashネットワークアップグレード](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sproutローンチ](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Ceremonyの設計](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### 関連項目

[シールドプール](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Zcashネットワークアップグレード](../start-here/network-upgrades)

[ZECとZcashとは何か](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

シリーズ: [ネットワークアップグレード索引](../start-here/network-upgrades) · 次へ: [Overwinter](../zcash-tech/overwinter)

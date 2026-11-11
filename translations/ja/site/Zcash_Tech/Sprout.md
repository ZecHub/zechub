<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Sprout

> Zcashは、Sproutのシールドされたプールとともに、2016年10月28日に開始されました。

> **警告:** NU7が有効化されると、Sproutプール内にまだあるZECは使用不能になります（メインネットの有効化ブロック高は3,543,405で、2026年11月5日を予定しています。[ZIP 259](https://zips.z.cash/zip-0259)を参照してください）。Sproutの資金を保有している場合は、[資金の復旧](../using-zcash/recovering-funds)を読み、先に移行してください。

ここで得られること: Sproutは、プライベートで検証可能な通貨が稼働中のブロックチェーン上で初めて動作した、Zcashの始まりです。

SproutはZcashネットワークの最初の開始であり、後の[ネットワークアップグレード](../start-here/network-upgrades)ではありません。2016年10月28日、ジェネシスブロックで稼働を開始しました。番号付きのZIPはSproutを定義していません。ZIPプロセスはOverwinterから後に始まったため、Sproutは当初のZcashプロトコル仕様と、その基盤となったZerocash構成によって説明されます。[Electric Coin Company](../zcash-organizations/electric-coin-company)（当時はZerocoin Electric Coin Company）は、Zooko Wilcoxの主導のもと、これを構築して提供しました。Sproutは、最初に実用的なzk-SNARKシールドされたトランザクションと当初のシールドされたプールを導入しました。これにより、人々は送信者、受信者、金額を隠したままZECを送信でき、ネットワークは残高の合計が一致することを検証できました。この名称は、チームが成長を期待した若く芽吹くチェーンを示していました。

これが重要な理由です。Sprout以前のすべての公開ブロックチェーンでは、あなたの支払いが公開されていました。誰でも、誰が誰にいくら支払ったかを見ることができました。Sproutは、これらの詳細を隠しながら、不正が行われていないことも証明できる最初の稼働中パーミッションレスネットワークでした。これは、現金や他人が読めない銀行明細書に期待するような、日常的な金融プライバシーにとって重要です。また、強力なオンチェーンプライバシーが、論文上の設計を超えて実際に機能することを示しました。これを可能にしたトラステッドセットアップのセレモニーは、後の暗号技術研究における参照点となりました。また、Sproutが搭載していた低速でメモリ負荷の高い証明システムこそが、2年後にチームがSaplingを構築する原動力となりました。

## 最初のシールドされたプール

Sproutは2種類のアドレスを作成しました。公開型アドレス（tアドレス）はBitcoinのように機能し、詳細は公開台帳に表示されます。シールドされたアドレス（zアドレス）は資金をSprout [シールドされたプール](../using-zcash/shielded-pools)に送ります。そこでは、送信者、受信者、金額が隠されたままになります。その仕組みは[zk-SNARKs](../zcash-tech/zk-snarks)です。これは、詳細を一切明かさずに、二重支払いがなく残高の合計が一致する有効なトランザクションであることを示せるゼロ知識proofです。Sproutは、これが稼働中の暗号資産で本番運用された最初の例でした。

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## セレモニー

Sproutのzk-SNARKsには一連の公開パラメータが必要であり、それらを安全に生成するには、セレモニーと呼ばれる一度限りのセットアップが必要でした。離れた場所にいる6人の参加者が、それぞれトキシックウェイストと呼ばれる秘密の断片を生成しました。誰かがすべての断片を再結合できれば、何もないところからZECを偽造できてしまいます。この設計は、そのリスクを単純なルールに変えました。少なくとも1人の参加者が自分の断片を破棄していれば、完全な秘密は再構築できず、偽造は不可能なままです。公に名前が明かされている参加者には、Zooko Wilcox、Andrew Miller、Peter Van Valkenburgh、Peter Todd、NCC GroupのDerek Hinchが含まれます。1人の参加者は匿名を選びました。

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## 起源

Sproutは、その後のすべての変更の基準です。ネットワークアップグレードの仕組みがOverwinterとともに導入された際、当初のルールにはコンセンサスブランチID 0が付けられました。これは、まだアップグレードが適用されていないことを意味します。それ以降のすべて（Overwinter、Sapling、Blossom、Heartwood、Canopy、NU5、NU6など）は、Sproutが始めたチェーン上にあります。開始は2016年8月に10月28日のジェネシスに向けて発表され、セレモニーはその数週間前に行われ、ジェネシスブロックにハードコードされたタイムスタンプは2016年10月28日07:56 UTCを示しています。

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## 用語集

| 用語 | 平易な意味 |
|---|---|
| zk-SNARK | 送信者、受信者、金額を明かさずに、トランザクションが有効であることを示すゼロ知識proof |
| Shielded pool | 金額と当事者が隠されるZcashのプライベートな側面です。Sproutプールが最初のものです |
| z-address and t-address | zアドレスはシールドされており、詳細をプライベートに保ちます。tアドレスは公開型であり、詳細を公開台帳に表示します |
| The Ceremony | Sproutの公開パラメータを生成し、その後トキシックウェイストを破棄した2016年のマルチパーティセットアップです |
| Toxic waste | ZECを偽造できないように破棄する必要があった、セレモニーからの秘密鍵の断片です |
| Consensus branch id 0 | ネットワークアップグレード前の基準を意味する、Sproutのルールのラベルです |

## FAQ

Sproutは現在の私のZECやプライバシーを変更しますか？ いいえ。Sproutは歴史であり、あなたのZECが存在するチェーンを始めた開始時点です。現在のコインとプライバシーは、Sproutについて何かをする必要があるかどうかではなく、今使用しているウォレットとシールドされたプールによって決まります。

SproutにZIP番号がないのはなぜですか？ ZIPプロセスは、Overwinterアップグレードから後に始まりました。Sproutは当初の開始であり、Zcashプロトコル仕様と、それが基づいたZerocash構成によって説明されます。ZIP 200は、すべてのアップグレード前の基準であるコンセンサスブランチID 0として、後からSproutに言及しているだけです。

セレモニーの6人を信頼する必要はありましたか？ セットアップは、1人だけが誠実であればよいように構築されていました。各人が秘密の断片を持ち、1人でも自分の断片を破棄していれば、完全な秘密は再構築できず、誰もZECを偽造できません。5人の参加者は公に名前が明かされ、1人は匿名のままでした。

Sproutプールは、現在私のウォレットが使用しているものですか？ おそらく違います。Sproutは最初のシールドされたプールでしたが、Saplingのような後のアップグレードではより高速なシールドされた設計が導入され、現在ではほとんどのウォレットがより新しいプールを使用しています。Sproutは、プライベートで検証可能なトランザクションが稼働中のネットワークで実行できることを示した取り組みとして、今でも重要です。

SproutはBitcoinと何が違ったのですか？ Bitcoinでは、金額とアドレスが見える公開台帳にすべての支払いが記録されます。Sproutは、送信者、受信者、金額を隠しながら、ネットワークがトランザクションの有効性を確認できるシールドされたトランザクションを追加しました。公開型アドレスも維持されたため、両方の方式が同じチェーン上に存在します。

## 理解度を確認する

Sproutは、有効化ブロック高を持つネットワークアップグレードとよく呼ばれます。なぜそれは完全には正しくないのでしょうか？

<details>
<summary>答え</summary>

SproutはZcashの当初の開始であり、後のアップグレードではありません。2016年10月28日のジェネシスブロック（ブロック0）以降に有効であるため、示すべき有効化ブロック高はありません。ネットワークアップグレードの仕組みは後から導入され、Sproutのルールを、すべてのアップグレード前の基準であるコンセンサスブランチID 0としてラベル付けしました。
</details>

### リソース

[ZIP 200: ネットワークアップグレードの仕組み](https://zips.z.cash/zip-0200)

[Zcashネットワークアップグレード](https://z.cash/upgrade/)

[Electric Coin Company: ZcashのSprout開始](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: セレモニーの設計](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### 関連項目

[シールドされたプール](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Zcash ネットワークアップグレード](../start-here/network-upgrades)

[ZECとZcashとは何ですか](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

シリーズ: [ネットワークアップグレード索引](../start-here/network-upgrades) · 次へ: [Overwinter](../zcash-tech/overwinter)

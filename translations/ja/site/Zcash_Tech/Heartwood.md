<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Heartwood

> Heartwoodは、Zcashのメインネットでブロック903,000（2020年7月16日 UTC）に稼働開始しました。

ここで学べること: Heartwoodがどのようにマイナー（miner）がブロック報酬をシールドされたアドレスへ直接受け取れるようにしたか、またZcashのプルーフ・オブ・ワークを軽量クライアントが検証可能にしたかを学びます。

Heartwoodは、Zcashの[ネットワークアップグレード](../start-here/network-upgrades)であり、[ZIP 250](https://zips.z.cash/zip-0250)でデプロイメントが定義された、コンセンサスルールのハードフォークです。これには、[ZIP 213](https://zips.z.cash/zip-0213)（シールドされたCoinbase）と、[ZIP 221](https://zips.z.cash/zip-0221)（FlyClient）という2つの機能変更が含まれていました。HeartwoodはZcashにとって4番目の主要なネットワークアップグレードであり、[Electric Coin Company](../zcash-organizations/electric-coin-company)と[Zcash Foundation](../zcash-organizations/zcash-foundation)が共同でサポートしました。すべてのZcashアップグレードと同様に、新しいコンセンサスブランチIDを設定しました。これは双方向のリプレイ保護を提供するタグであり、新ルールのもとで作成されたトランザクションが古いチェーンでリプレイされること、およびその逆を防ぎます。

Heartwoodは固定時刻ではなく、設定されたブロック高（903,000）で有効化されるため、ダッシュボードで表示される正確な分は場所によってわずかに異なる場合があります。ブロックとその瞬間は同じです。

これが重要である理由です。マイナーはブロックをマイニングするたびに、新規発行されたZECを獲得します。Heartwood以前、この収入は公開されている公開型アドレスに入る必要がありました。誰でも、マイナーがいくら稼いだか、コインが次にどこへ移動したかを確認できました。Heartwoodは、その報酬を代わりにシールドされたアドレスへ直接送れるようにしたため、マイナーの報酬をプライベートに保てます。また、軽量ウォレットや他のチェーンが、チェーン全体をダウンロードせずにZcashのプルーフ・オブ・ワークを確認することも可能にしました。

## シールドされたコインベース

コインベーストランザクションは、ブロック報酬を支払う特別なトランザクションです。Heartwood以前、その出力は公開型でなければならなかったため、マイナーが新規発行したZECは常に公開アドレスから始まりました。Heartwoodはコンセンサスルールを変更し、ZIP 213の表現によれば、コインベーストランザクションにSapling出力を含められるようにしました。平たく言えば、マイナーは報酬をシールドされたSaplingアドレスへ直接受け取れるようになりました。公開型コインベース出力も引き続きサポートされているため、これは強制的な変更ではなく、新たな選択肢です。

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## なぜ最初にSaplingなのか

シールドされたコインベースは特にSapling出力を対象としており、それには理由があります。ZIP 213では、Saplingアップグレードによって、コインベーストランザクション内で資金を直接シールドすることを可能にするアーキテクチャ変更と性能向上がもたらされたと説明されています。元のSproutシールドされたプールは、コインベースで直接シールドするにはリソース集約的すぎました。Saplingのより効率的なプルービングシステムとノート形式により、これが実用的になりました。Saplingは、シールドされたコインベース出力を禁止する以前のルールを拡張し、そのルールがSapling出力にも適用されるようにしていましたが、Heartwoodはそのルールを緩和して許可します。これは、Zcashアップグレードがどのように相互に積み重なるかを示す良い例です。あるアップグレードの基盤機構が、次のアップグレードの土台となります。

## FlyClient

Heartwoodは、ブロックヘッダーが何にコミットするかも変更しました。以前はhashFinalSaplingRootという名前だったヘッダーフィールドは、用途変更され、hashLightClientRootに改名されました。現在は、タイムスタンプ、難易度ターゲット、Saplingルート、累積作業量、トランザクション数など、過去のブロックのヘッダーデータとメタデータに基づいて構築される継続的な構造であるマークル・マウンテン・レンジ（Merkle Mountain Range、MMR）のルートにコミットします。このコミットメントにより、ライトクライアントまたは外部チェーンは、サイズがチェーンの長さに対して対数的にのみ増加する小さなproofを使い、Zcashのプルーフ・オブ・ワークを検証できます。その結果、より優れたライトクライアントウォレットと、より容易なサードパーティおよびクロスチェーン統合が実現します。クライアントは、チェーンを支える作業を信頼するために、すべてのブロックをダウンロードする必要がなくなるためです。

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Heartwoodの位置付け

Heartwoodは、それぞれが次のアップグレードに必要な要素を追加するZcashアップグレードの連続の一段階です。OverwinterとSaplingは2018年に、Blossomは2019年に、Heartwoodは2020年にブロック903,000で導入されました。Canopyはその後、2020年のブロック1,046,400で導入されました。Saplingは、Heartwoodにとってこのチェーンの重要なつながりです。その効率的なシールドされたトランザクション機構が、シールドされたコインベースを可能にした技術的前提条件でした。

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## 用語集

| 用語 | 平易な意味 |
|---|---|
| Network upgrade (NU) | 設定されたブロック高で有効化される、Zcashのコンセンサスルールに対する協調的な変更 |
| Coinbase transaction | 各ブロック内でブロック報酬を支払う特別なトランザクション |
| Shielded Sapling address | Saplingアップグレードで導入された、プライベートなZcashアドレスの種類 |
| Shielded coinbase | ブロック報酬をシールドされたSaplingアドレスへ支払えるようにするHeartwoodの変更 |
| FlyClient | ライトクライアントが小さなproofでプルーフ・オブ・ワークを検証できるようにする手法 |
| Merkle Mountain Range (MMR) | ブロックヘッダーがコミットする、過去のブロックの継続的な要約 |
| Consensus branch id | トランザクションが従うアップグレードのルールを識別し、リプレイ保護に使用されるタグ |

## よくある質問

Heartwoodは私のZECやプライバシーを変更しますか？ いいえ。Heartwoodは既存の資金には触れませんでした。マイナーが報酬をシールドされたアドレスで受け取る選択肢を追加し、ライトクライアントへのサポートを改善しました。ご自身の残高とシールドされたトランザクションは影響を受けません。

シールドされたコインベースとは何ですか？ コインベースはブロック報酬を支払うトランザクションです。Heartwoodにより、その報酬は公開型アドレスではなくシールドされたSaplingアドレスへ入れられるため、マイナーの収入をプライベートに保てます。

マイナーは現在、必ずシールドされた状態で報酬を受け取る必要がありますか？ いいえ。シールドされたコインベースは任意です。公開型コインベース出力は引き続きサポートされているため、マイナーはいずれかを選択できます。

なぜシールドされたコインベースは古いSproutプールではなくSaplingを使用するのですか？ Saplingのより効率的な設計により、コインベース内で直接シールドすることが実用的になったためです。以前のSproutプールは、そのためにはリソース集約的すぎました。

ライトクライアントでは何が変わりましたか？ ブロックヘッダーは現在、hashLightClientRootフィールドを通じて過去のブロックにまたがるマークル・マウンテン・レンジにコミットします。これによりライトクライアントと他のチェーンは、チェーン全体ではなく、対数サイズの小さなproofでZcashのプルーフ・オブ・ワークを検証できます。

## 理解度チェック

Heartwood以前、マイナーに支払われるブロック報酬が公開表示されたのはなぜですか。また、Heartwoodは何を変えましたか？

<details>
<summary>回答</summary>

Coinbase出力は公開型でなければならなかったため、マイナーの新規発行された報酬は常に誰でも確認できる公開型アドレスに入っていました。Heartwoodは、コインベーストランザクションにSapling出力を含められるよう、コンセンサスルール（ZIP 213）を変更し、マイナーが報酬をシールドされたアドレスへ直接受け取れるようにしました。
</details>

### リソース

[ZIP 250: Heartwoodネットワークアップグレードのデプロイメント](https://zips.z.cash/zip-0250)

[ZIP 213: シールドされたCoinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - コンセンサスレイヤーの変更](https://zips.z.cash/zip-0221)

[Heartwoodネットワークアップグレード](https://z.cash/upgrade/heartwood/)

### 関連項目

[Zcashネットワークアップグレード](../start-here/network-upgrades)

[シールドされたプール](../using-zcash/shielded-pools)

[ウォレット](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

シリーズ: [ネットワークアップグレード索引](../start-here/network-upgrades) · 前: [Blossom](../zcash-tech/blossom) · 次: [Canopy](../zcash-tech/canopy)

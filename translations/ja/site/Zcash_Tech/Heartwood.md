---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Heartwood

> Heartwood は、ブロック 903,000（2020年7月16日 UTC）で Zcash メインネット上で有効化されました。

ここでわかること：Heartwood によって、マイナーがブロック報酬を直接シールドアドレスで受け取れるようになったこと、そして Zcash のプルーフ・オブ・ワークを軽量クライアントで検証できるようになったこと。

Heartwood は Zcash の[ネットワークアップグレード](../start-here/network-upgrades)です。これはコンセンサスルールを変更するハードフォークであり、その展開は [ZIP 250](https://zips.z.cash/zip-0250) で定義されています。これには 2 つの機能変更、[ZIP 213](https://zips.z.cash/zip-0213)（Shielded Coinbase）と [ZIP 221](https://zips.z.cash/zip-0221)（FlyClient）が含まれていました。Heartwood は Zcash における 4 回目の主要なネットワークアップグレードであり、[Electric Coin Company](../zcash-organizations/electric-coin-company) と [Zcash Foundation](../zcash-organizations/zcash-foundation) が共同でサポートしました。すべての Zcash アップグレードと同様に、新しい consensus branch id も設定されました。これは双方向のリプレイ保護を提供するタグで、新しいルールのもとで作られたトランザクションが古いチェーン上で再実行されること、またその逆を防ぎます。

Heartwood は固定された時刻ではなく、決められたブロック高（903,000）で有効化されるため、ダッシュボード上で表示される正確な時刻は場所によってわずかに異なることがあります。ただし、ブロックも、その瞬間も同じです。

なぜこれが重要なのか。マイナーはブロックを採掘するたびに新規発行された ZEC を得ます。Heartwood 以前、その収入は透明アドレスに入る必要があり、それは公開されていました。誰でもマイナーがどれだけ稼ぎ、そのコインが次にどこへ移動したかを追跡できたのです。Heartwood によって、その報酬を代わりに直接シールドアドレスへ送れるようになり、マイナーの報酬を非公開に保てるようになりました。また、軽量ウォレットや他のチェーンが、チェーン全体をダウンロードせずに Zcash のプルーフ・オブ・ワークを検証することも可能になりました。

## Shielded coinbase

coinbase トランザクションは、ブロック報酬を支払う特別なトランザクションです。Heartwood 以前、その出力は透明でなければならなかったため、新規発行されたマイナーの ZEC は常に公開アドレスから始まっていました。Heartwood はコンセンサスルールを変更し、ZIP 213 の言葉を使えば、coinbase トランザクションに Sapling 出力を含められるようにしました。平たく言えば、マイナーは報酬を直接シールドされた Sapling アドレスで受け取れるようになったのです。透明な coinbase 出力も引き続きサポートされているため、これは強制的な変更ではなく、新しい選択肢です。

![Heartwood 以前、マイナーのブロック報酬は透明な公開アドレスに送られる必要がありました。Heartwood 後は coinbase トランザクションに Sapling 出力を含められるため、報酬を直接シールドアドレスへ送ることができます](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## なぜまず Sapling なのか

Shielded coinbase は特に Sapling 出力を対象としており、そこには理由があります。ZIP 213 は、Sapling アップグレードがアーキテクチャ上の変更と性能改善をもたらし、それによって coinbase トランザクション内で直接資金をシールドすることが実現可能になったと説明しています。元の Sprout シールドプールは、coinbase の中で直接シールドするにはリソース消費が大きすぎました。Sapling のより効率的な証明システムとノート形式によって、それが実用的になったのです。Sapling 自体も、シールドされた coinbase 出力を禁止していた従来のルールを拡張し、そのルールが Sapling 出力にも適用されるようにしていましたが、Heartwood はそのルールを緩和してそれらを許可します。これは、Zcash のアップグレードがどのように互いの上に積み重なっていくかを示す好例です。あるアップグレードの基盤整備が、次のアップグレードの土台になります。

## FlyClient

Heartwood はまた、ブロックヘッダーが何にコミットするかも変更しました。以前 `hashFinalSaplingRoot` と呼ばれていたヘッダーフィールドは、用途変更されて `hashLightClientRoot` に改名されました。現在これは Merkle Mountain Range（MMR）のルートにコミットします。MMR は、タイムスタンプ、難易度ターゲット、Sapling ルート、累積作業量、トランザクション数など、過去のブロックのヘッダーデータとメタデータをもとに構築される継続的な構造です。このコミットメントにより、ライトクライアントや外部チェーンは、サイズがチェーン長に対して対数的にしか増えない小さな証明を使って、Zcash のプルーフ・オブ・ワークを検証できます。その利点は、より優れたライトクライアントウォレットと、より容易なサードパーティおよびクロスチェーン統合です。クライアントはもはや、チェーンの背後にある作業を信頼するためにすべてのブロックをダウンロードする必要がありません。

![FlyClient の流れ：各ブロックのヘッダーデータは Merkle Mountain Range ルート（hashLightClientRoot）にコミットされ、これによってライトクライアントは小さな対数サイズの証明でプルーフ・オブ・ワークを検証できます](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Heartwood の位置づけ

Heartwood は、次のアップグレードが依存する要素をそれぞれ追加していく一連の Zcash アップグレードの中の 1 段階です。Overwinter と Sapling は 2018 年に、Blossom は 2019 年に、そして Heartwood は 2020 年にブロック 903,000 で導入されました。Canopy はその後、2020 年後半にブロック 1,046,400 で続きました。Heartwood にとって、この連なりの中での重要な結節点は Sapling です。Sapling の効率的なシールドトランザクション機構こそが、Shielded coinbase を可能にした技術的前提条件でした。

![Zcash アップグレードのタイムライン：2018 年に Overwinter と Sapling、2019 年に Blossom、2020 年に Heartwood](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## 用語集

| 用語 | わかりやすい意味 |
|---|---|
| Network upgrade (NU) | Zcash のコンセンサスルールに対する協調的な変更で、決められたブロック高で有効化されるもの |
| Coinbase transaction | 各ブロック内でブロック報酬を支払う特別なトランザクション |
| Shielded Sapling address | Sapling アップグレードで導入された、プライベートな Zcash アドレスの種類 |
| Shielded coinbase | ブロック報酬をシールドされた Sapling アドレスへ支払えるようにする Heartwood の変更 |
| FlyClient | ライトクライアントが小さな証明でプルーフ・オブ・ワークを検証できるようにする方式 |
| Merkle Mountain Range (MMR) | ブロックヘッダーがコミットする、過去のブロックの継続的な要約 |
| Consensus branch id | トランザクションがどのアップグレードのルールに従うかを識別するタグで、リプレイ保護に使われるもの |

## FAQ

Heartwood は私の ZEC やプライバシーを変えますか？ いいえ。Heartwood は既存の資金には手を加えていません。マイナーが報酬をシールドアドレスで受け取る選択肢を追加し、ライトクライアントへのサポートを改善しただけです。あなた自身の残高やシールドトランザクションには影響しません。

Shielded coinbase とは何ですか？ coinbase はブロック報酬を支払うトランザクションです。Heartwood は、その報酬を透明アドレスではなくシールドされた Sapling アドレスへ送れるようにするため、マイナーの収入を非公開に保てます。

マイナーは今後、必ずシールドで報酬を受け取らなければなりませんか？ いいえ。Shielded coinbase は任意です。透明な coinbase 出力も引き続きサポートされるため、マイナーはどちらでも選べます。

なぜ Shielded coinbase は古い Sprout プールではなく Sapling を使うのですか？ Sapling のより効率的な設計によって、coinbase 内で直接シールドすることが実用的になったからです。以前の Sprout プールでは、それを行うにはリソース消費が大きすぎました。

ライトクライアントにとって何が変わりましたか？ ブロックヘッダーは現在、`hashLightClientRoot` フィールドを通じて、過去のブロックに対する Merkle Mountain Range にコミットします。これにより、ライトクライアントや他のチェーンは、チェーン全体ではなく、小さな対数サイズの証明で Zcash のプルーフ・オブ・ワークを検証できます。

## 理解度チェック

Heartwood 以前、マイナーに支払われるブロック報酬はなぜ公開状態で見えていたのでしょうか？ そして Heartwood は何を変えたのでしょうか？

<details>
<summary>答え</summary>

coinbase 出力は透明でなければならなかったため、マイナーの新規発行された報酬は常に、誰でも確認できる公開の透明アドレスに入っていました。Heartwood はコンセンサスルール（ZIP 213）を変更し、coinbase トランザクションに Sapling 出力を含められるようにしたことで、マイナーが報酬を直接シールドアドレスで受け取れるようにしました。
</details>

### リソース

[ZIP 250: Heartwood Network Upgrade の展開](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - コンセンサス層の変更](https://zips.z.cash/zip-0221)

[Heartwood ネットワークアップグレード](https://z.cash/upgrade/heartwood/)

### 関連項目

[Zcash ネットワークアップグレード](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[ウォレット](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

シリーズ: [Network Upgrades index](../start-here/network-upgrades) · 前へ: [Blossom](../zcash-tech/blossom) · 次へ: [Canopy](../zcash-tech/canopy)

---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling は Zcash メインネットのブロック 419,200（2018年10月29日 02:15 UTC）で稼働開始しました。

ここでわかること: Sapling によって、プライベートな Zcash 決済はスマートフォンやハードウェアウォレットでも動かせるほど高速かつ軽量になりました。

Sapling は Zcash における2回目の大規模なネットワークアップグレードであり、Zcash の2周年に有効化されました。これはコンセンサスを伴うハードフォークで、シールド化された（プライベートな）トランザクションの組み立て方を再構築したものです。この導入は ZIP 205 で定義され、新しいトランザクション署名ルールは ZIP 243 で定義されており、どちらもネットワークアップグレードの仕組みである ZIP 200 を基盤にしています。詳細は Zcash Protocol Specification に記載されています。Electric Coin Company はこのアップグレードを実装し、これをサポートする最初のバージョンである zcashd 2.0.0 を2018年8月にリリースしました。チェーン上では、ネットワークはコンセンサス branch id によって Sapling のルールを識別します。

なぜこれが重要なのか。Sapling 以前は、本当にプライベートな送金を行うには、証明を生成するためにコンピューターが数ギガバイトのメモリを使いながら数分間処理するのを待たなければなりませんでした。これはほとんどの人にとって遅すぎ、重すぎたため、多くのユーザー、取引所、店舗はシールド化トランザクションを避け、代わりに ZEC を公開状態のまま送っていました。Sapling はこの作業を数秒、メモリ使用量約40メガバイトまで削減しました。このたった一つの変化によって、シールド化された ZEC は日常生活の中で、一般的なスマートフォンやハードウェアウォレット上でも実用的に使えるようになったのです。

## 何が変わったのか

Sapling の中核は、シールド化トランザクションのプライバシーを守るゼロ知識証明を、より高速に生成する方式です。元の Sprout の設計では、単一の証明回路（JoinSplit 回路）が使われており、低速で大量のメモリを必要としました。Sapling はこれを、Zcash Protocol Specification で説明されている2つの専用回路、Spend 回路と Output 回路に置き換えました。その結果、コストは大幅に低下しました。Electric Coin Company によると、シールド化トランザクションは約40メガバイトのメモリで、最短では数秒で生成できます。Sapling 以前の Sprout の基準ははるかに重く、おおよそ数分と数ギガバイトのメモリを要していました（これらの Sprout 側の数値は、広く引用されているおおまかな基準値です）。

![Sprout versus Sapling shielded transaction cost](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## 新しい鍵

Sapling では、新しい一連のシールド化アドレスと鍵も導入されました。1つの鍵から多数の diversified addresses を導出でき、これらは外部の観察者が相互に関連付けられない、別々の支払い用アドレスです。Sapling は viewing keys も追加しました。完全または受信用の Viewing Key を使えば、資金を使う権限を渡すことなく、ウォレットのトランザクション詳細を閲覧する能力を共有できます。これは監査、会計、あるいは単に支払いが行われたことの証明に役立ちます。

関連する変更として、Sapling は証明を生成する役割と、トランザクションに署名する役割を分離しました。ゼロ知識証明を構築するデバイスが、もはや支出権限を保持するデバイスである必要はなくなったのです。この分離によって、ハードウェアウォレットは支出鍵を隔離したまま保持し、別のデバイスがより重い証明生成作業を担当できるようになりました。

![Proving device hands the proof to a separate signing device](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## trusted setup

Sapling の回路は、慎重に生成されなければならない一連の公開パラメータに依存しています。もし単一の当事者がそれらを単独で生成し、残余の秘密データ（「toxic waste」）を保持していた場合、その当事者は証明を偽造できた可能性があります。これを避けるため、パラメータは2段階のマルチパーティセレモニーから生成されました。Phase 1 は Powers of Tau と呼ばれ、回路非依存、つまり Sapling 固有の回路には結びついていませんでした。Phase 2 は Sapling MPC で、回路固有のものでした。各フェーズは、少なくとも1人の参加者が誠実であり、自分の toxic waste を破棄していれば安全性が保たれます。したがって、このセレモニーが失敗するのは、参加者全員が共謀した場合だけです。

## どのように有効化されたか

Sapling は、ネットワークのアップグレード機構を準備した2018年6月のアップグレード Overwinter に続くものでした。Electric Coin Company は2018年8月にリリースした zcashd 2.0.0 でメインネットの有効化ブロック高を設定し、ブロック 419,200 が採掘されたときにネットワークは Sapling のルールへ切り替わりました。チェーン上では、その瞬間は Sapling のコンセンサス branch id によって示されます。

![Timeline from Zcash launch to Sapling activation](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## 用語集

| 用語 | わかりやすい意味 |
|---|---|
| Shielded transaction | 送信者、受信者、金額を隠すプライベートな Zcash トランザクション。 |
| Sprout | Zcash が最初に導入したシールド化プロトコルで、Sapling より遅く重い。 |
| Spend and Output circuits | Sprout の単一の JoinSplit 回路を置き換えた、Sapling の2つの新しい証明回路。 |
| Diversified address | 1つの鍵から導出できる、多数の相互にリンク不可能な支払い用アドレスの1つ。 |
| Viewing Key | ウォレットから資金を使うことなく、そのトランザクションを見られるようにする鍵。 |
| Consensus branch id | トランザクションがどのアップグレードのルールに従っているかをネットワークに伝える短いコード。 |

## FAQ

Sapling によって自分の ZEC 保有量は変わりましたか？ いいえ。Sapling が変えたのはシールド化トランザクションの構築方法であり、誰かが保有する ZEC の量や総供給量ではありません。あなたの残高に影響はありませんでした。

Sapling 後も私の ZEC はプライベートですか？ はい、それに加えてより使いやすくなりました。Sapling はシールド化トランザクションの強力なプライバシーを維持しつつ、それを実際に使えるほど高速かつ低コストにしました。シールド化された資金はこれまでと同じ方法で隠されたままです。

何かする必要はありますか？ 保有者としてあなたが行うべきことはありません。Sapling はウォレットやノードソフトウェアが採用したネットワークアップグレードです。現代のウォレットはすでに Sapling アドレスをサポートしています。

Sprout と Sapling の違いは何ですか？ Sprout は最初のシールド化プロトコルで、低速かつメモリ負荷の高い1つの証明回路を使っていました。Sapling はそれをより高速な Spend 回路と Output 回路に置き換え、Viewing Key と diversified addresses を追加し、シールド化トランザクションをスマートフォンやハードウェアウォレットでも扱えるほど軽量にしました。

なぜ10月28日と書く資料もあれば、10月29日と書く資料もあるのですか？ 有効化ブロック高は、2018年10月28日を目標として事前に設定されていました。実際に変更を引き起こしたブロック 419,200 は、UTC では10月29日の早朝に採掘されました。多くの現地タイムゾーンでは、それはまだ10月28日でした。どちらの表記でも、同じブロックであり、同じ瞬間を指しています。

Viewing Key とは何ですか？ Viewing Key を使うと、シールド化ウォレットへの読み取りアクセスを共有できます。完全または受信用の Viewing Key を持つ人は、そのウォレットのトランザクション詳細を見ることができますが、資金を使うことはできません。詳しくは [Viewing Keys](../zcash-tech/viewing-keys) をご覧ください。

## 理解度チェック

Sprout では、なぜこれほど多くの人がシールド化トランザクションを避けていたのでしょうか？ また、Sapling はそれをどのように解決したのでしょうか？

<details>
<summary>答え</summary>
Sprout では、シールド化トランザクションの生成に数分と数ギガバイトのメモリが必要だったため、ほとんどのユーザー、取引所、店舗にとって遅すぎて重すぎました。Sapling はより高速な Spend 回路と Output 回路を導入し、この作業を数秒、約40メガバイトまで削減したことで、シールド化トランザクションを日常的なスマートフォンやハードウェアウォレットで実用的に使えるようにしました。
</details>

### リソース

- [ZIP 205: Sapling Network Upgrade の導入](https://zips.z.cash/zip-0205)
- [ZIP 243: Sapling のためのトランザクション署名検証](https://zips.z.cash/zip-0243)
- [Zcash Sapling アップグレードページ](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling の発表](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Sapling MPC の発表](https://electriccoin.co/blog/sapling-mpc/)

### 関連項目

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Zcash ネットワークアップグレード](../start-here/network-upgrades)
- [ウォレット](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

シリーズ: [ネットワークアップグレード索引](../start-here/network-upgrades) · 前へ: [Overwinter](../zcash-tech/overwinter) · 次へ: [Blossom](../zcash-tech/blossom)

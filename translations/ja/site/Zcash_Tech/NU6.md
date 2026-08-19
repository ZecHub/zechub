<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 は、ブロック 2,726,400（2024年11月23日 UTC）で Zcash メインネット上で有効化されました。

ここで学べること：半減期後も Zcash がどのように自らの開発資金を確保し続けたのか、まだ使い道を決めていない準備金をなぜ確保したのか、そして ZEC の総供給量をどのようにして完全に予測可能にしたのか。

NU6 は Zcash の[ネットワークアップグレード](../start-here/network-upgrades)であり、[ZIP 253](https://zips.z.cash/zip-0253) によって導入され、2024年11月にブロック 2,726,400 でメインネットにおいて有効化されました。これはマネタリーおよび[開発資金](../start-here/development-fund)に関するアップグレードです。2024年11月の半減期以降もブロック補助金の一部を開発に回し続けるようにし、将来コミュニティが決定する用途のためにプロトコル内準備金を設け、新たに発行される ZEC の計上方法を厳密化しました。NU6 は Electric Coin Company と Zcash Foundation の両方から支持されました。

これが重要な理由。Zcash の[開発基金](../zcash-tech/canopy)は、歴史上2回目となる2024年11月の半減期ごろに終了する予定でした。NU6 はその資金供給を継続させましたが、すべてのコインを固定された受取先に渡すのではなく、その一部をプロトコル内に留保し、後でコミュニティがその使い道を決められるようにしました。また、見えにくかった会計上のギャップも解消し、将来存在する ZEC の総量を正確に予測できるようにしました。

## NU6 で何が変わったのか

NU6 は、[ZIP 1015](https://zips.z.cash/zip-1015) で定義されたルールに基づき、2024年11月の半減期以降もブロック補助金の 20% を開発資金に回し続けました。その 20% は次の2つに分けられます。

1. ブロック補助金の 8% は Zcash Community Grants (ZCG) に送られ、コミュニティによる、そしてコミュニティのための活動に資金提供します。
2. 12% は、新たなプロトコル内ロックボックスに入り、将来コミュニティが決定する用途のために保有されます。

ブロック補助金の残りとトランザクション手数料は、ネットワークを保護するマイナーに渡ります。NU6 はまた、既存の funding stream と dev fund のルール（ZIP 207 と ZIP 214）をこの新しい構造に合うよう更新しました。

![NU6 の開発資金の配分：ブロック補助金の 20 パーセントが開発に回され、そのうち 8 パーセントが Zcash Community Grants に、12 パーセントが Deferred Dev Fund Lockbox に入る](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## Deferred Dev Fund Lockbox

12% の取り分は、NU6 における新しいアイデアです。受取アドレスに支払われるのではなく、その価値は [ZIP 2001](https://zips.z.cash/zip-2001) で定義された Deferred Dev Fund Lockbox というプロトコル内プールに直接預け入れられます。

1. このロックボックスは新しい funding-stream タイプ（DEFERRED_POOL）であり、ブロック報酬の価値は個人や組織ではなく、プロトコルそのものに入ります。
2. ネットワークはこれを独自のチェーン・バリュー・プール残高として追跡し、shielded pool の残高を追跡するのと同じ方法で管理します。
3. NU6 は意図的にこのロックボックスを作成しましたが、難しい問いは未解決のまま残しました。つまり、誰がその資金を管理し、どのように解放されるのか、という点です。

この問いには後に [NU6.1](../zcash-tech/nu6-1) が答えを出し、ガバナンスを定めました。ブロック補助金の 8% のストリームを Zcash Community Grants に継続し、12% のストリームを、ロックボックスを元手とする coin-holder-controlled fund に向けるようにしました。

## 帳尻を正確に合わせる

NU6 はまた、新しい ZEC がどのように生成されるかに関する会計上のギャップを解消しました。これは [ZIP 236](https://zips.z.cash/zip-0236) で定義されています。Coinbase transaction は、各ブロックの新しい ZEC と手数料を支払う特別なトランザクションです。

1. NU6 以前は、coinbase transaction は受け取る権利のある額を超えて請求しないことだけが求められていました。マイナーは補助金の満額より少なく請求することができ、その結果、その ZEC はひそかにバーンされていました。
2. NU6 以後は、coinbase transaction は厳密にバランスしなければなりません。出力値の合計は、マイナー補助金と手数料の合計と完全に一致する必要があり、多すぎても少なすぎてもいけません。
3. マイナーが少なめに請求して誤って ZEC をバーンすることができなくなったため、将来存在する ZEC の総量を正確に予測できるようになりました。

![NU6 前後の Coinbase の収支：以前は coinbase が少なめに請求して ZEC をバーンできたため、供給量は正確に予測できなかった。その後は coinbase が厳密に収支一致しなければならないため、発行量は正確に予測可能になった](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## 資金調達はどのように進化したか

NU6 は、Zcash がどのように自らの維持費を賄ってきたかという、より長い物語の一章です。

1. Canopy（2020年）は、当初の founders reward を終了し、[開発基金](../start-here/development-fund)を創設しました。
2. NU6（2024年11月）は、2回目の半減期後にその資金供給を再編し、Deferred Dev Fund Lockbox を設け、将来コミュニティが決定する助成のために発行量の一部を留保しました。
3. NU6.1（2025年）は、NU6 が未解決のまま残した「誰がその留保資金を管理するのか」という問いに答え、ブロック補助金の 8% を Zcash Community Grants に継続し、12% をロックボックスを元手とする coin-holder-controlled fund に向けました。

![Zcash の資金調達の進化：Canopy が開発基金を作り、NU6 がロックボックスを設け、NU6.1 が誰がそれを管理するかのルールを定めた](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## 用語集

| 用語 | 平易な意味 |
|---|---|
| Block subsidy | マイニングされた各ブロックごとに新たに作られる ZEC |
| Coinbase transaction | ブロックの補助金と手数料を支払う特別なトランザクション |
| Deferred Dev Fund Lockbox | 将来コミュニティが決定する用途のために、発行量の一部を保持するプロトコル内準備金 |
| Zcash Community Grants (ZCG) | Zcash コミュニティによる、そしてコミュニティのための活動に資金提供する委員会 |
| Consensus branch id | どのアップグレードのルールにブロックが従っているかを判断するためにノードが使う識別子 |
| Network upgrade (NU) | Zcash のコンセンサスルールに対する協調的な変更で、指定されたブロック高で有効化されるもの |

## FAQ

NU6 は私の ZEC やプライバシーを変えますか？ いいえ。NU6 は開発資金の調達方法と発行量の計上方法に関するものであり、あなたのトランザクションやプライバシーに関するものではありません。あなたの資金や shielded transaction に影響はありません。

資金はどこから来るのですか？ ブロックがマイニングされるたびに発行される新しい ZEC、つまり block subsidy から来ます。その 20% が、すべてマイナーに行く代わりに開発へ振り向けられます。

ロックボックスは何のためにあるのですか？ 発行量の一部をプロトコル内に留保し、その使い道を後でコミュニティが決められるようにするためです。NU6 がその準備金を確保し、NU6.1 が誰がそれを管理するかのルールを定めました。

厳密な収支一致ルールは私のコインを変えますか？ いいえ。これは各ブロックの coinbase transaction が、受け取る権利のある金額を正確に支払うことだけを要求します。影響するのは新規発行の会計処理であり、既存の残高ではありません。

技術的に NU6 を定義しているのは何ですか？ NU6 は ZIP 253 によって導入されており、ブロック 2,726,400 でのメインネット有効化とその consensus branch id を定めています。実際のコンセンサス変更は ZIP 236、ZIP 1015、ZIP 2001 に由来し、ZIP 207 と ZIP 214 はそれに適合するよう更新されています。

NU6 と NU6.1 はどう違うのですか？ NU6 は資金調達を再編し、ロックボックスを作成しました。NU6.1 はロックボックス資金を誰が管理するか、そして留保された取り分をどのように分配するかを決定しました。

## 理解度をチェック

NU6 は Deferred Dev Fund Lockbox を設けましたが、誰がそれを管理するかは定めませんでした。なぜアップグレードが準備金を作成しつつ、そのガバナンスを意図的に後回しにするのでしょうか？

<details>
<summary>答え</summary>

準備金を作ることで、発行量の一部が固定された受取先に支払われるのではなく、プロトコル内に留保されることを確定できました。誰がその資金を管理し、どのように解放するのかを決めるのは、より難しいガバナンス上の問題です。NU6 はそれを意図的に未解決のまま残し、NU6.1 がそれに答えました。ブロック補助金の 8% は Zcash Community Grants に継続し、12% はロックボックスを元手とする coin-holder-controlled fund に向けられます。
</details>

### リソース

[ZIP 253: NU6 Network Upgrade の導入](https://zips.z.cash/zip-0253)

[ZIP 236: ブロックは厳密に収支一致すべき](https://zips.z.cash/zip-0236)

[ZIP 1015: 非直接的な開発資金のための Block Subsidy Allocation](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox Funding Streams](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### あわせて読む

[Zcash Network Upgrades](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash Monetary Policy](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[ZEC と Zcash とは](../start-here/what-is-zec-and-zcash)

---

シリーズ: [Network Upgrades index](../start-here/network-upgrades) · 前へ: [NU5](../zcash-tech/nu5) · 次へ: [NU6.1](../zcash-tech/nu6-1)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwoodは2026年7月28日UTCに、ブロック3,428,143でZcashメインネットにおいて有効化され、それ以降稼働しています。

ここで学べること: Ironwoodによって何が変わるのか、隠された資金におけるバグがなぜ重大なのか、そしてターンスタイル（turnstile）によって、ZECが偽造されていないことを誰でも確認できる仕組みです。

Ironwoodは、同名の新しいシールドされたプールを導入する、正式にはNU6.3と呼ばれるZcash[ネットワークアップグレード（network upgrade）](../start-here/network-upgrades)です。[シールドされたプール（shielded pool）](../using-zcash/shielded-pools)とは、[ゼロ知識暗号技術（zero-knowledge cryptography）](../zcash-tech/zk-snarks)によって金額と所有者が秘匿される資金の集合です。Ironwoodは、既存のOrchardシールドされたプールで見つかった健全性のバグを封じ込めて監査し、ZECの総供給量が正しいことをコミュニティがより強力に確認できるようにするために存在します。そのコンセンサスルールは[ZIP 258](https://zips.z.cash/zip-0258)で規定されています。

これが重要である理由です。Bitcoinのような公開型（transparent）の資金では、誰でも公開台帳を読むことでコインが偽造されていないことを確認できます。シールドされた資金では金額が隠されているため、単に見るだけでは確認できません。代わりに、暗号技術そのものが、誰も密かに資金を作成できないことを保証しなければなりません。Ironwoodが重要なのは、Orchardプールにおけるその保証にバグが見つかったためです。このアップグレードはその欠落を解消し、ZECの総供給量が依然として正しいことを誰でも確認できるようにします。

Zcashを初めて知りましたか？まずは[ZECとは何かとZcash](../start-here/what-is-zec-and-zcash)、そして[シールドされたプール](../using-zcash/shielded-pools)をご覧いただき、その後こちらに戻ってください。

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Ironwoodが必要だった理由

2026年5月下旬、独立したセキュリティ研究者であるTaylor Hornbyは、[Shielded Labs](../zcash-organizations/shielded-labs)のプロトコル監査中に、Orchardシールドされたプールの健全性バグを責任を持って開示しました。Orchardは当時Zcashの最新のシールドされたプールであり、この欠陥は[Halo](../zcash-tech/halo) 2プルーフ（proof）システムを使用するゼロ知識回路の楕円曲線部分にありました。

1. 健全性バグとは、トランザクションが有効であることを示す数学的根拠が、それを完全には保証しないことを意味します。
2. 理論上、攻撃者はこの欠陥を利用してOrchardプール内で無効な価値を偽造し、実際には自分のものではない資金を使用できた可能性があります。その痕跡は通常のノードでは検出されません。
3. ZcashのターンスタイルはOrchardから出ることのできる価値の量を依然として制限していたため、総供給量を膨張させることはできませんでした。しかし、プール自体の暗号技術は、その内部に隠されたすべてのコインが本物であることを保証しなくなっていました。

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

上記の数値は単純化した説明です。実際の欠陥は、コインの入出数そのものではなく、回路の数学における特定の部分にありました。重要なのは、健全性バグによって、検出されずにプール内で価値が作成される可能性があるということです。

重要なのは、このバグが悪用された証拠、ユーザー資金への影響の証拠、ZECの総供給量が変化した証拠はいずれもないことです。この問題はセキュリティ研究によって発見され、既知の被害が生じる前に修正されました。

## 対応

Zcashコミュニティは、一度にすべてではなく段階的に修正を導入しました。

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. 2026年6月上旬、完全な修正を準備する間の一時的な措置として、Orchardプールを無効化しました。
2. NU6.2アップグレードでは、Orchard回路自体を修正し、根本的な健全性の脆弱性を解消しました。
3. NU6.3アップグレードであるIronwoodは、新しいシールドされたプールと公開チェックポイントを導入し、古いOrchardプールから価値を完全な監査の下で移動できるようにします。

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Ironwoodプールの役割

NU6.2は、新しいすべてのトランザクションについてOrchard回路を保護しましたが、古いルールの下で作成された価値は依然としてOrchardプールにあります。Ironwoodは、その価値に明確な移行先を与え、移動時に監査する方法を提供します。

Ironwoodプールは、ブロック3,428,143においてNU6.3によって作成されたシールドされた価値のプールです。これは修正済みの回路に基づいて構築されており、量子回復可能なノート（note）形式を使用します。これは、[量子コンピューター](../zcash-tech/post-quantum-security)がいつか今日の暗号技術を破った場合に資金を回復できるようにする設計であり、[ZIP 2005](https://zips.z.cash/zip-2005)で定義されています。

1. 有効化後、古いOrchardプールは使用専用となるため、新しい価値を追加できなくなります。
2. 新たにシールドされた価値は、代わりにIronwoodへ流れます。
3. Ironwood内では、シールドされたZECにより、送信者、受信者、および金額を隠すプライバシー（privacy）が維持されます。ZECをOrchardからIronwoodへ移す際には、移動した金額が表示されます。

## ターンスタイル

Ironwoodにおける重要な考え方はターンスタイルです。これは、古いOrchardプールからIronwoodへ移動する際に、すべてのコインが通過しなければならない会計チェックポイントです。

> ターンスタイルは、隠された資金に対して、銀行の金庫にあるガラス扉と同じ役割を果たします。内部を見ることはできませんが、入るものと出るものを正確に数えられます。

1. Orchardから出る資金は、Ironwoodに入る前に公開検証ポイントで計数されます。
2. これにより、誰でもZECがどれだけ移行したかを監査でき、実際の流通供給量に対する信頼が高まります。
3. 以前のバグによって偽造されたZECが存在した場合、この移行時の会計処理で明らかになります。

ターンスタイルはZcashにとって新しいものではありません。ネットワークは以前からSprout、Sapling、Orchardプール間の境界でこれを使用しており、プール間を移動する価値を監査可能にし、どのプールも正当に入った量を超えて出すことがないようにしています。

コンセンサスルールにより、Ironwoodを含むすべての価値プールはネットワークの最大資金上限内に維持されるため、プール残高が負になることはありません。

## ユーザーが行う必要のあること

ウォレットとノードソフトウェアがこの大部分を自動的に処理しますが、実際の変更は簡単です。時間をかけて、古いOrchardプールのシールドされた保有資産をターンスタイル経由でIronwoodプールへ移動してください。各移動ではその金額がブロックチェーン（blockchain）上に表示されるため、[ZIP 318](https://zips.z.cash/zip-0318)に従うウォレットは、これを標準金額に分割して時間をかけて送信します。ウォレット提供者の案内に従い、ソフトウェアをサポート対象のリリースに維持してください。

## 用語集

| 用語 | 平易な意味 |
|---|---|
| Shielded pool | ゼロ知識暗号技術によって金額と所有者が隠されている資金の集合 |
| Soundness bug | 無効なトランザクションを、有効であるかのようにプルーフ検証に通してしまう欠陥 |
| Turnstile | 供給量を監査可能な状態に保つため、プール間を移動する価値を計数する公開チェックポイント |
| Spend-only | 使用はできるものの、新しい価値を追加できないプール |
| Network upgrade (NU) | 設定されたブロック高で有効化される、Zcashのコンセンサスルールに対する協調的な変更 |
| Quantum-recoverable note | 量子コンピューターがいつか今日の暗号技術を破った場合に資金を回復できるよう設計されたノート形式 |

## よくある質問

私のZECは影響を受けましたか？いいえ。このバグが悪用された証拠はなく、ユーザー資金への影響も総供給量の変化もありません。

何かする必要がありますか？ウォレットとノードソフトウェアをサポート対象のリリースに維持してください。Orchardの資金を使用すると、それらはIronwoodへ移動し、通過する金額は公開されます。一部のウォレットでは、標準金額を時間をかけて送信する移行機能を提供しているため、残高の関連付けがより困難になります。ウォレット提供者の案内に従ってください。

Zcashは依然としてプライベートですか？はい。Ironwood内の支払い（payment）は、Orchardの支払いと同様に、送信者、受信者、および金額を隠します。OrchardからIronwoodへのように、プール間を移動する金額は公開されます。このアップグレードは供給量の完全性に関するものです。

バグは悪用されたことがありますか？その証拠はありません。セキュリティ研究によって発見され、責任を持って開示され、既知の被害が生じる前に修正されました。

古いOrchardプールはどうなりますか？使用専用になります。新しい価値は入れなくなり、既存の価値はターンスタイル経由でIronwoodへ移動します。その移行は公開監査されます。

## 理解度を確認しましょう

シールドされたプール内のZECが隠されているなら、Orchardのバグによって総供給量が密かに膨張していないことを、どうすれば誰でも確認できますか？

<details>
<summary>答え</summary>

ターンスタイルを通じて確認できます。古いOrchardプールを出るすべてのコインは、Ironwoodに入る際に公開チェックポイントで計数されます。正当に入った量を超える価値が出ようとすると会計が一致しないため、バグによって作成された可能性のある偽造品はそのゲートで明らかになります。
</details>

### リソース

[ZIP 258: NU6.3ネットワークアップグレードの導入](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard一時的脆弱性緩和策およびNU6.2ネットワークアップグレードの導入](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood量子回復可能性](https://zips.z.cash/zip-2005)

[ZIP 229: バージョン6トランザクション形式](https://zips.z.cash/zip-0229)

[ZIP 318: OrchardからIronwoodへの移行](https://zips.z.cash/zip-0318)

[Ironwood: Zcashのための新しいシールドされたプール](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### 関連項目

[Zcashネットワークアップグレード](../start-here/network-upgrades)

[シールドされたプール](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[ポスト量子セキュリティ](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZECとは何かとZcash](../start-here/what-is-zec-and-zcash)

---

シリーズ: [ネットワークアップグレード一覧](../start-here/network-upgrades) · 前へ: [NU6.2](../zcash-tech/nu6-2)

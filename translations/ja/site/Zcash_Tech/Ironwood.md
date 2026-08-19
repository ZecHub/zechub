<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood はブロック 3,428,143 で Zcash メインネット上で有効化され、UTC 2026年7月28日頃と見込まれています。

この記事でわかること: Ironwood によって何が変わるのか、なぜ見えない資金におけるバグが深刻なのか、そして turnstile によって誰でも ZEC が不正に生成されていないことをどのように確認できるのか。

Ironwood は、正式には NU6.3 と呼ばれる Zcash の[ネットワークアップグレード](../start-here/network-upgrades)であり、同名の新しいシールドプールを導入します。[シールドプール](../using-zcash/shielded-pools)とは、[ゼロ知識暗号](../zcash-tech/zk-snarks)によって金額と所有者が隠されている資金の集合です。Ironwood は、既存の Orchard シールドプールで見つかった soundness バグを封じ込めて監査するため、そして ZEC の総供給量が正しいことをコミュニティがより強力に検証できるようにするために存在します。そのコンセンサスルールは [ZIP 258](https://zips.z.cash/zip-0258) で定義されています。

これが重要である理由。Bitcoin のような透明な資金では、公開台帳を読むことでコインが不正に生成されていないかを誰でも確認できます。シールドされた資金では金額が隠されるため、単に見ればわかるというものではありません。その代わり、暗号技術そのものが誰も秘密裏に資金を作れないことを保証しなければなりません。Ironwood が重要なのは、その保証に関するバグが Orchard プールで見つかったためです。このアップグレードはその隙間を塞ぎ、ZEC の総供給量が依然として健全であることを誰でも確認できる方法を提供します。

Zcash が初めてですか？ まずは [ZEC と Zcash とは](../start-here/what-is-zec-and-zcash) と [シールドプール](../using-zcash/shielded-pools) を読み、そのあとでここに戻ってきてください。

![Ironwood への価値移行フロー: 価値が Orchard プールを離れ、turnstile のチェックポイントを通過し、新しい Ironwood プールに入る](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## なぜ Ironwood が必要だったのか

2026年5月下旬、独立系セキュリティ研究者の Taylor Hornby は、[Shielded Labs](../zcash-organizations/shielded-labs) のためのプロトコル監査中に、Orchard シールドプールにおける soundness バグを責任ある形で開示しました。Orchard は当時 Zcash で最新のシールドプールであり、その欠陥は [Halo](../zcash-tech/halo) 2 証明システムを使うゼロ知識回路の楕円曲線に関する部分にありました。

1. soundness バグとは、トランザクションが有効であることを証明する数学が、その有効性を完全には保証していないことを意味します。
2. 理論上、攻撃者はこの欠陥を使って Orchard プール内で無効な価値を不正生成し、本来は自分のものでない資金を使うことができた可能性があり、その痕跡は通常のノードでは検知できませんでした。
3. それでも Zcash の turnstile は Orchard から出ていける価値の総量に上限を設けていたため、総供給量が水増しされることはありませんでしたが、プール自身の暗号技術はもはや内部のすべての隠されたコインが本物であることを保証していませんでした。

![バグの説明: トランザクションは 5 ZEC を入れるが、欠陥のある証明では 7 ZEC が出てきても通ってしまい、何もないところから 2 ZEC が作られる](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

上の数字は単純化したイメージです。実際の欠陥は、コインの出入りを文字どおり数え間違えるものではなく、回路の数学の特定の部分にありました。ここで理解すべき点は、soundness バグによってプール内で価値が検知されずに生成されうる、ということだけです。

重要なのは、このバグが実際に悪用された証拠はなく、ユーザー資金への影響を示す証拠もなく、ZEC の総供給量が変化した証拠もないということです。これはセキュリティ研究によって発見され、既知の被害が出る前に修正されました。

## 対応

Zcash コミュニティは、すべてを一度に行うのではなく、段階的に修正を展開しました。

![Ironwood 対応のタイムライン: Orchard のバグは 2026年5月に発見され、プールは 2026年6月に一時停止され、回路は NU6.2 で修正され、Ironwood は 2026年7月28日頃に有効化される](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. 2026年6月初旬、完全な修正の準備が整うまでの暫定措置として Orchard プールが無効化されました。
2. NU6.2 アップグレードにより Orchard 回路そのものが修正され、根本的な soundness 脆弱性が解消されました。
3. NU6.3 アップグレードである Ironwood は、新しいシールドプールと公開チェックポイントを導入し、古い Orchard プールから価値を完全な監査のもとで移動できるようにします。

![NU6.2 での修正: 修正後の証明では入力と出力が等しいことが必要となるため、有効な 5 ZEC の出力は通るが、7 ZEC を出力しようとする試みは拒否される](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Ironwood プールは何をするのか

NU6.2 によって、すべての新しいトランザクションに対して Orchard 回路は安全になりましたが、古いルールの下で作られた価値は依然として Orchard プール内に残っています。Ironwood は、その価値に対してクリーンな移行先と、移動時に監査する方法を提供します。

Ironwood プールは、NU6.3 が有効化されると作成される新しいシールド価値プールです。これは修正済みの回路上に構築されており、量子回復可能なノート形式（もし[量子コンピューター](../zcash-tech/post-quantum-security)が将来現在の暗号技術を破った場合でも資金を回復できる設計）を使用します。これは [ZIP 2005](https://zips.z.cash/zip-2005) で定義されています。

1. 有効化後、古い Orchard プールは spend-only となり、新しい価値はそこに入れられなくなります。
2. 新たにシールドされる価値は代わりに Ironwood に流れます。
3. シールドされた ZEC は、送信者・受信者・金額を隠す同じ強力なプライバシー保証を維持します。

## turnstile

Ironwood における重要な考え方が turnstile です。これは、古い Orchard プールから Ironwood に移動する際に、すべてのコインが通過しなければならない会計上のチェックポイントです。

> turnstile は、見えない資金に対して、銀行の金庫にあるガラス扉と同じ役割を果たします。中は見えなくても、何が入って何が出たかを正確に数えることはできます。

1. Orchard を離れる資金は、Ironwood に入る前に公開された検証ポイントで数えられます。
2. これにより、どれだけの ZEC が移行したかを誰でも監査でき、実際の流通供給量に対する信頼が強まります。
3. もし以前のバグによって偽の ZEC が作られていたなら、この移行の会計処理でそれが表面化します。

turnstile は Zcash にとって新しいものではありません。ネットワークは以前にも Sprout、Sapling、Orchard プールの境界でこれを使っており、プール間を移動する価値が監査可能であり続け、どのプールも正当に入った量を超えて価値を放出できないようにしてきました。

コンセンサスルールは、Ironwood を含むすべての価値プールがネットワークの最大発行上限内に収まるようにしているため、プール残高が負になることはありません。

## ユーザーが行う必要があること

ウォレットとノードソフトウェアがこの大部分を自動で処理しますが、実務上の変化はシンプルです。時間をかけて、シールドされた保有分を古い Orchard プールから turnstile を通して Ironwood プールへ移してください。ウォレット提供元の案内に従い、有効化ブロックの前に必ずサポート対象のリリースへ更新してください。

## 用語集

| 用語 | 平易な意味 |
|---|---|
| シールドプール | ゼロ知識暗号によって金額と所有者が隠されている資金の集合 |
| soundness バグ | 本来は無効なトランザクションが、有効であるかのように証明チェックを通過してしまう欠陥 |
| turnstile | 供給量が監査可能な状態に保たれるよう、プール間を移動する価値を数える公開チェックポイント |
| Spend-only | そこから支出はできるが、新しい価値を追加できないプール |
| ネットワークアップグレード (NU) | 一定のブロック高で有効化される、Zcash のコンセンサスルールへの協調的な変更 |
| 量子回復可能ノート | 量子コンピューターが将来現在の暗号技術を破った場合に資金を回復できるよう設計されたノート形式 |

## FAQ

私の ZEC は影響を受けましたか？ いいえ。このバグが実際に使われた証拠はなく、ユーザー資金への影響もなく、総供給量の変化もありません。

何かする必要がありますか？ 有効化ブロックの前に、ウォレットとノードソフトウェアをサポート対象のリリースへ更新してください。ウォレットは支出に伴って時間をかけて資金を Ironwood に移動するため、急いで手動で何かする必要はありません。ウォレット提供元の案内に従ってください。

Zcash は今でもプライベートですか？ はい。Ironwood は、送信者・受信者・金額を隠す同じシールドされたプライバシーを維持します。このアップグレードは供給量の健全性に関するものであり、プライバシーに関するものではありません。

そのバグは実際に悪用されましたか？ その証拠はありません。これはセキュリティ研究によって発見され、責任ある形で開示され、既知の被害が出る前に修正されました。

古い Orchard プールはどうなりますか？ spend-only になります。新しい価値はそこに入れられなくなり、既存の価値は turnstile を通って Ironwood に移動し、その移行は公開監査されます。

## 理解度チェック

シールドプール内の ZEC が隠されているなら、Orchard のバグによって総供給量が密かに水増しされていないことを、どうやって誰でも確認できるのでしょうか？

<details>
<summary>答え</summary>

turnstile を通じてです。古い Orchard プールを離れるすべてのコインは、Ironwood に入る際に公開チェックポイントで数えられます。正当に入った量を超える価値が出ていこうとすれば会計が一致しないため、このバグによって作られえた偽造分はそのゲートで表面化します。
</details>

### リソース

[ZIP 258: NU6.3 ネットワークアップグレードの展開](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard 一時的脆弱性緩和策および NU6.2 ネットワークアップグレードの展開](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)

[Ironwood: Zcash の新しいシールドプール](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### 関連項目

[Zcash ネットワークアップグレード](../start-here/network-upgrades)

[シールドプール](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[ポスト量子セキュリティ](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZEC と Zcash とは](../start-here/what-is-zec-and-zcash)

---

シリーズ: [ネットワークアップグレード一覧](../start-here/network-upgrades) · 前へ: [NU6.2](../zcash-tech/nu6-2)

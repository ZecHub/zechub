# よくある質問

Zcash に関して最もよく寄せられる質問の一覧です。Zcash クライアントのトラブルシューティングについては、[公式トラブルシューティングガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)をご覧ください。

### クイックナビゲーション
[Zcash とは？](#what-is-zcash) | [Zcash を入手するには？](#how-can-i-acquire-zcash) | [他の暗号資産との違いは？](#what-is-the-difference-between-zcash-and-other-cryptocurrencies) | [プロトコルのガバナンスは？](#how-is-the-zcash-protocol-governed) | [自分のトランザクションはどこ？](#where-is-my-transaction) | [Zcash は本当にプライベート？](#is-zcash-really-private) | [よくある誤解](#a-few-common-misconceptions)

---

## Zcash とは？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash は、高速で機密性の高いトランザクションと低い手数料を備えたデジタル通貨です。プライバシーは Zcash の中核機能です。すべてのトランザクションを暗号化するためのゼロ知識証明の利用を先駆けて実現しました。  

即時・モバイル・安全・プライベートな決済のために、複数のウォレットが利用できます：[モバイルウォレット](https://z.cash/wallets/)
</div>

## Zcash を入手するには？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
暗号資産[取引所](https://z.cash/exchanges)で ZEC を購入できます。  
また、ピアツーピアで Zcash を購入したり、マイニングで取得したりすることもできます。
</div>

## Zcash と他の暗号資産の違いは？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash は Bitcoin や Ethereum と比べて、本質的により高いプライバシーを備えています。高速なブロック時間（75秒）、低い手数料、定期的なアップグレードを提供します。  

ユーザーは**透明**トランザクションと**シールド**トランザクションのどちらかを選択できます。詳細は[シールドされたエコシステム](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)をご覧ください。
</div>

## Zcash プロトコルはどのようにガバナンスされていますか？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
プロトコルは、**Zcash Improvement Proposal (ZIP)** プロセスによってガバナンスされています。誰でも ZIP の草案を提出できます。草案はコミュニティで議論され、ZIP エディターによって承認または却下されます。

- [Daira Hopwood](https://twitter.com/feministPLT)（Electric Coin Company）  
- [Deirdre Connolly](https://twitter.com/durumcrustulum)（Zcash Foundation）

決定は仕様書に記載され、ネットワークが採用した際にオンチェーンで承認されます。
</div>

## 自分のトランザクションはどこ？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
まず、[ブロックエクスプローラーのガイド](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629)をお読みください。次に、[Zcash Block Explorer](https://zcashblockexplorer.com)を確認してください。  

トランザクションは約25分（20ブロック）後に失効し、資金は自動的に返却されます。  

**トランザクションが表示されない一般的な理由：**
- 接続の喪失
- トランザクション手数料が低すぎる
- ネットワークの過負荷
- 透明な入力が多すぎる（サイズが大きすぎる）

**成功のためのヒント：**
- 安定した接続を使用する
- 標準手数料を支払う（優先処理にはより高い手数料）
- 時間を置いてから再試行する
- トランザクションを小さく保つため、入力を減らす
</div>

## Zcash は本当にプライベート？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**はい。** Zcash は、シールドトランザクションにおける送信者、金額、受取人のデータを暗号化します。  

Zcash は次のことを**行いません**：
- マルチシグネチャトランザクションを暗号化する（FROST 統合は保留中）
- 透明なトランザクションとの相関関係から保護する
- IP アドレスを隠す

詳細情報：[シールドされたエコシステム](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## よくある誤解

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">誤解</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">正しい回答</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash は中央集権的なコインですか？</td>
        <td className="py-5 px-6 text-foreground">いいえ。商標契約により、Zcash Foundation または ECC がコミュニティの合意に反して行動することは防止されています。ガバナンスの分散性は実証されています（[Messari レポート](https://messari.io/report/decentralizing-zcash)を参照）。コミュニティ投票、ZecHub、Zcash Foundation A/V Club はいずれも幅広い参加を可能にしています。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash にはバックドアがありますか？</td>
        <td className="py-5 px-6 text-foreground">いいえ。Zcash も、私たちが開発したいかなる暗号ソフトウェアも、バックドアを含んでおらず、今後も含むことはありません。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash は企業によって管理されていますか？</td>
        <td className="py-5 px-6 text-foreground">誤りです。私たちは研究のために企業と提携していますが、Zcash は分散化への取り組みを維持しています。複数の自律組織が、自己管理とプライバシーの権利に向けて協力しています。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash のプライバシーは他のプライバシーコインと比べて限定的である</td>
        <td className="py-5 px-6 text-foreground">いいえ。Monero/Grin 形式のプライバシーはデコイに依存しています（これは突破される可能性があります）。Zcash はすべてのシールドトランザクションデータを暗号化するため、プール内のすべてのトランザクションを区別できません。[プライベート性が不十分？](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)をご覧ください。</td>
      </tr>
    </tbody>
  </table>
</div>

---

**最終更新：** 2026年3月  
**貢献したいですか？** [GitHub でこのページを編集](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)

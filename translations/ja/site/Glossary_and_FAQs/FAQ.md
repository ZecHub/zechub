# よくある質問

Zcashに関する最もよくある質問の一覧です。Zcashクライアントのトラブルシューティングについては、[公式トラブルシューティングガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)をご覧ください。

### クイックナビゲーション

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashとは？</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashを入手するには？</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">他の暗号資産との違いは？</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">プロトコルのガバナンスは？</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">取引はどこにある？</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashは本当にプライベート？</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">よくある誤解</a>
</div>

---

## Zcashとは？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcashは、高速で機密性の高い取引と低手数料を特徴とするデジタル通貨です。プライバシーはZcashの中核的な機能です。すべての取引を暗号化するためにゼロ知識証明を先駆けて採用しました。

即時利用でき、モバイル対応で安全かつプライベートな支払いのために、複数のウォレットが利用できます：[ウォレット](/using-zcash/wallets)

</div>

## Zcashを入手するには？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ZECは、[カストディ型取引所](/using-zcash/custodial-exchanges)、[DEX](/dex)、または[中央集権型スワッププラットフォーム](/using-zcash/centralizedswaps)で購入できます。

また、Zcashをピアツーピアで購入したり、マイニングによって入手したりすることもできます。

</div>

## Zcashと他の暗号資産の違いは何ですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcashは、BitcoinやEthereumと比べて根本的にプライバシー性が高い通貨です。高速なブロック時間（75秒）、低い手数料、定期的なアップグレードを提供します。

ユーザーは**Transparent**取引または**Shielded**取引を選択できます。詳細は[Shieldedエコシステム](https://electriccoin.co/blog/shielded-ecosystem)をご覧ください。

</div>

## Zcashプロトコルはどのように統治されていますか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

このプロトコルは、**Zcash改善提案（ZIP）**プロセスによって統治されています。誰でもZIPの草案を提出できます。草案はコミュニティで議論され、ZIP編集者によって承認または却下されます：

- [Daira Hopwood](https://twitter.com/feministPLT)（Electric Coin Company）
- [Deirdre Connolly](https://twitter.com/durumcrustulum)（Zcash Foundation）

決定は仕様に記載され、ネットワークが採用した時点でオンチェーンで承認されます。

</div>

## 私の取引はどこにありますか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

まず、[ブロックエクスプローラーのガイド](/guides/blockchain-explorers)をお読みください。次に、[Zcash Block Explorer](https://zcashblockexplorer.com)を確認してください。

取引は約25分（20ブロック）後に期限切れとなり、資金は自動的に返還されます。

**取引が表示されない一般的な理由：**

- 接続の喪失
- 取引手数料が低すぎる
- ネットワークの過負荷
- Transparent入力が多すぎる（サイズが大きすぎる）

**成功のためのヒント：**

- 安定した接続を使用する
- 標準手数料を支払う（優先処理にはより高い手数料）
- 待ってから後で再試行する
- 取引を小さく保つため、入力数を減らす

</div>

## Zcashは本当にプライベートですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**はい。** Zcashは、Shielded取引における送信者、金額、受取人のデータを暗号化します。

Zcashは**次のことを行いません**：

- マルチシグ取引を暗号化する（FROST統合は保留中）
- Transparent取引との相関から保護する
- IPアドレスを隠す

さらに読む：[Shieldedエコシステム](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## よくある誤解

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">誤解</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">正しい回答</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashは中央集権型のコインですか？</td>
      <td className="py-4 px-5 text-foreground">いいえ。商標契約により、Zcash FoundationまたはECCがコミュニティの合意に反して行動することは防止されています。ガバナンスが分散化されていることは証明されています（[Messariレポート](https://messari.io/report/decentralizing-zcash)を参照）。コミュニティ投票、ZecHub、およびZcash Foundation A/V Clubはいずれも幅広い参加を可能にします。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashにはバックドアがありますか？</td>
      <td className="py-4 px-5 text-foreground">いいえ。Zcashにも、私たちが構築したいかなる暗号ソフトウェアにもバックドアは含まれておらず、今後も決して含まれることはありません。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashは企業によって管理されていますか？</td>
      <td className="py-4 px-5 text-foreground">誤りです。私たちは研究のために企業と提携していますが、Zcashは分散化への取り組みを維持しています。複数の自律組織が、セルフカストディとプライバシーの権利という目標に向けて協力しています。</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashは他のプライバシーコインと比べてプライバシーが限定的です</td>
      <td className="py-4 px-5 text-foreground">いいえ。Monero/Grin形式のプライバシーはデコイに依存しています（これは破られる可能性があります）。ZcashはすべてのShielded取引データを暗号化するため、プール内のすべての取引は区別できません。[プライバシーは十分ではない？](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)をご覧ください。</td>
    </tr>
  </tbody>
</table>

</div>

---

**最終更新：** 2026年3月
**貢献したいですか？** [GitHubでこのページを編集](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)

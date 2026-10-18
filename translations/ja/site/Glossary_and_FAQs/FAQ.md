# よくある質問

Zcashに関して最もよくある質問の一覧です。Zcashクライアントのトラブルシューティングについては、[公式トラブルシューティングガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)をご覧ください。

### クイックナビゲーション

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashとは？</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashを入手するには？</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">他の暗号通貨との違いは？</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">プロトコルのガバナンスは？</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">私のトランザクションはどこ？</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashは本当にプライベート？</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">よくある誤解</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashdが動かなくなった？</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">ウォレットをZalletに移行するには？</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ironwoodとは？</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">どのフルノードを実行すべき？</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">用語を調べるには？</a>
</div>

---

## Zcashとは？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcashは、高速で機密性の高いトランザクションと低い手数料を備えたデジタル通貨です。プライバシーはZcashの中心的な機能です。すべてのトランザクションを暗号化するためにゼロ知識証明を初めて採用しました。

即時・モバイル・安全・プライベートな支払いに利用できるウォレットが複数あります：[ウォレット](/using-zcash/wallets)

</div>

## Zcashを入手するには？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ZECは、[カストディアル取引所](/using-zcash/custodial-exchanges)、[DEX](/using-zcash/dex)、または[中央集権型スワッププラットフォーム](/using-zcash/centralized-swaps)で購入できます。

また、Zcashをピアツーピアで購入したり、マイニングで取得したりすることもできます。

</div>

## Zcashと他の暗号通貨との違いは？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcashは、BitcoinやEthereumよりも根本的に高いプライバシーを備えています。高速なブロック時間（75秒）、低い手数料、定期的なアップグレードを提供します。

ユーザーは**Transparent**トランザクションまたは**Shielded**トランザクションを選択できます。詳しくは、[シールドされたエコシステム](https://electriccoin.co/blog/shielded-ecosystem)をご覧ください。

</div>

## Zcashプロトコルはどのように管理されていますか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

プロトコルは、**Zcash改善提案（ZIP）**プロセスによって管理されています。誰でもZIPのドラフトを提出できます。ドラフトはコミュニティで議論され、ZIP編集者によって受理または却下されます。

- [Daira Hopwood](https://twitter.com/feministPLT)（Electric Coin Company）
- [Deirdre Connolly](https://twitter.com/durumcrustulum)（Zcash Foundation）

決定は仕様に記載され、ネットワークが採用するとオンチェーンで承認されます。

</div>

## 私のトランザクションはどこですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

まず、[ブロックエクスプローラーのガイド](/guides/blockchain-explorers)をお読みください。次に、[Zcash Block Explorer](https://zcashblockexplorer.com)を確認してください。

トランザクションは約25分（20ブロック）後に期限切れとなり、資金は自動的に返却されます。

**トランザクションが表示されない一般的な理由：**

- 接続の喪失
- トランザクション手数料が低すぎる
- ネットワークの過負荷
- Transparent入力が多すぎる（サイズが大きすぎる）

**成功のためのヒント：**

- 安定した接続を使用する
- 標準手数料を支払う（優先処理にはより高い手数料）
- 待ってから後で再試行する
- トランザクションを小さく保つため、入力を減らす

</div>

## Zcashは本当にプライベートですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**はい。**Zcashは、シールドされたトランザクションにおいて送信者、金額、受信者のデータを暗号化します。

Zcashは、以下を**行いません**。

- マルチシグネチャトランザクションの暗号化（FROST統合は保留中）
- Transparentトランザクションとの相関関係からの保護
- IPアドレスの秘匿

さらに読む：[シールドされたエコシステム](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashdが動かなくなりました。今は何を実行すればよいですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashdは廃止されました。バージョン6.20.0は2026年7月18日にブロック3417100で自動停止し、Ironwood（NU6.3）をサポートしたこともないため、アップグレードできる後継バージョンはありません。

代わりにZ3スタックを実行してください。zcashdが以前は単独で行っていた作業を、3つのプログラムに分割しています。

- **[Zebra](/zcash-tech/zebra-full-node)**がチェーンを検証します
- **[Zaino](/zcash-tech/zaino)**がチェーンをインデックス化し、ウォレットデータを提供します
- **[Zallet](/zcash-tech/zallet)**が資金を保管します

[Zakura](/zcash-tech/zakura-node)は代替のフルノードです。また、その上でzcashdも実行するため、他のソフトウェアが依然として旧インターフェースを想定している場合に役立ちます。

まず[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)をご覧ください。

</div>

## zcashdウォレットをZalletに移行するには？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zalletは既存の`wallet.dat`を移行するため、資金とアドレスはそのまま維持されます。

まず`wallet.dat`をバックアップしてから、[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)に従ってください。Zalletで残高を確認するまで、そのバックアップを保管してください。

移行後の日常的なコマンドについては、[Zalletクイックリファレンス](/using-zcash/zallet-quick-reference-guide)をご覧ください。

</div>

## Ironwoodとは何ですか？何かする必要がありますか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

IronwoodはネットワークアップグレードNU6.3で、2026年7月28日、ブロック3,428,143以降にメインネットで稼働しています。修正済み回路に基づくシールドプールを追加し、旧来の[Orchard](/using-zcash/shielded-pools)プールを封鎖することで、ZECが偽造されていないことを誰でも検証できるようにします。

**シールドされた資金を保有している場合、移動が必要になる可能性があります。**価値はOrchardから[ターンスタイル](/zcash-tech/the-turnstile)を通じてのみ移動でき、ウォレットによって移行の時期と方法は異なります。手動で何かを移動する前に、ウォレットプロバイダーに確認してください。

何が、なぜ変更されたかについては、[Ironwood](/zcash-tech/ironwood)をお読みください。

</div>

## どのフルノードを実行すべきですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)**はzcashdの直接の後継であり、移行ガイドが前提とするノードです。特別な理由がなければ、これを選んでください。

**[Zakura](/zcash-tech/zakura-node)**は、より高速な同期とネイティブのブロックプルーニングを備え、スケールを目的とした2つ目の実装です。それらが必要な場合、またはzcashdと通信するソフトウェアに依存している場合は、こちらを選んでください。

どちらも同じチェーンを検証するため、これはコンセンサスではなく運用上の選択です。

</div>

## リリースノートの用語はどこで調べればよいですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

[Zcash Library](/glossary-and-faqs/zcash-library)をご覧ください。ノードおよびウォレットソフトウェア、シールドプール、そして最も頻繁に登場するZIP番号を扱っています。

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
      <td className="py-4 px-5 font-medium text-foreground">Zcashは中央集権型コインですか？</td>
      <td className="py-4 px-5 text-foreground">いいえ。商標契約により、Zcash FoundationまたはECCがコミュニティのコンセンサスに反して行動することは防止されています。ガバナンスは分散化されていることが証明されています（[Messariレポート](https://messari.io/report/decentralizing-zcash)を参照）。コミュニティ投票、ZecHub、およびZcash Foundation A/V Clubにより、幅広い参加が可能になります。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashにはバックドアがありますか？</td>
      <td className="py-4 px-5 text-foreground">いいえ。Zcashにも、私たちが構築したいかなる暗号ソフトウェアにもバックドアは含まれておらず、今後も含まれることはありません。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashは企業に支配されていますか？</td>
      <td className="py-4 px-5 text-foreground">誤りです。研究のために企業と提携する一方で、Zcashは分散化への取り組みを維持しています。複数の自律組織が、自己管理とプライバシーの権利に向けて協力しています。</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashは、他のプライバシーコインと比べてプライバシーが限定的です</td>
      <td className="py-4 px-5 text-foreground">いいえ。Monero/Grin式のプライバシーはデコイに依存しています（これは突破される可能性があります）。Zcashはすべてのシールドされたトランザクションデータを暗号化するため、プール内のすべてのトランザクションを区別できません。[プライベート性が十分でない？](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)をご覧ください。</td>
    </tr>
  </tbody>
</table>

</div>

---

**最終更新：** 2026年10月
**貢献したいですか？** [GitHubでこのページを編集する](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)

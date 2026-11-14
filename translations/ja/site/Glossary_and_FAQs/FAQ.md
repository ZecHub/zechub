# よくある質問

Zcashに関して最もよくある質問の一覧です。Zcashクライアントのトラブルシューティングについては、[公式トラブルシューティングガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)をご覧ください。

### クイックナビゲーション

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashとは何ですか？</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashを入手するには？</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">他の暗号資産との違いは？</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">プロトコルのガバナンスは？</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">私のトランザクションはどこですか？</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcashは本当にプライバシーを保護しますか？</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">よくある誤解</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashdが動作しなくなった場合は？</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">ウォレットをZalletへ移行するには？</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ironwoodとは何ですか？</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">どのフルノードを実行すべきですか？</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">用語を調べるには？</a>
</div>

---

## Zcashとは何ですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcashは、高速で機密性の高いトランザクションと低い手数料を備えたデジタル通貨です。プライバシー（Privacy）はZcashの中心的な機能です。すべてのトランザクションを暗号化するためのゼロ知識プルーフ（zero-knowledge proofs）の使用を先駆けて導入しました。

即時性、モバイル対応、安全性、プライバシーを備えた支払いに利用できるウォレットが複数あります：[ウォレット](/using-zcash/wallets)

</div>

## Zcashを入手するにはどうすればよいですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

ZECは、[カストディアル取引所](/using-zcash/custodial-exchanges)、[DEX](/using-zcash/dex)、または[中央集権型スワッププラットフォーム](/using-zcash/centralized-swaps)で購入できます。

また、Zcashをピアツーピアで購入したり、マイニングで入手したりすることもできます。

</div>

## Zcashと他の暗号資産の違いは何ですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcashは、BitcoinやEthereumよりも根本的にプライバシー性が高いです。高速なブロック時間（75秒）、低い手数料、定期的なアップグレードを提供します。

ユーザーは、**公開型**または**シールドされた**トランザクションを選択できます。詳細は[シールドされたエコシステム](https://electriccoin.co/blog/shielded-ecosystem)をご覧ください。

</div>

## Zcashプロトコルはどのようにガバナンスされていますか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

プロトコルは、**Zcash改善提案（ZIP）**プロセスによってガバナンスされています。誰でもZIPの草案を提出できます。草案はコミュニティで議論され、ZIP編集者によって採用または却下されます。

- [Daira Hopwood](https://twitter.com/feministPLT)（Electric Coin Company）
- [Deirdre Connolly](https://twitter.com/durumcrustulum)（Zcash Foundation）

決定は仕様書に記載され、ネットワークが採用した時点でオンチェーンで承認されます。

</div>

## 私のトランザクションはどこですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

まず、[ブロックエクスプローラーのガイド](/guides/blockchain-explorers)をお読みください。次に、[Zcashブロックエクスプローラー](https://mainnet.zcashexplorer.app)を確認してください。

固定の25分の期限切れや自動返金タイマーはありません。ウォレットに記録された有効期限のブロック高と、元の支払いがマイニングされたかどうかを確認してください。マイニングされずに期限切れになった場合、オンチェーンで決済されておらず、期限切れによって返金トランザクションが作成されることはありません。ウォレットを同期してから、再試行に関する案内に従ってください。[トランザクションのトラブルシューティング](/using-zcash/transactions#troubleshooting-stuck-transactions)および[ZIP 203](https://zips.z.cash/zip-0203)を参照してください。

**トランザクションが表示されない一般的な理由：**

- 接続の喪失
- トランザクション手数料が低すぎる
- ネットワークの過負荷
- 公開型入力が多すぎる（サイズが大きすぎる）

**成功のためのヒント：**

- 安定した接続を使用してください
- 標準手数料を支払ってください（優先処理にはそれ以上）
- 時間を置いて再試行してください
- トランザクションを小さく保つため、入力数を減らしてください

</div>

## Zcashは本当にプライベートですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**はい。** Zcashは、シールドされたトランザクションの送信者、金額、受信者のデータを暗号化します。

Zcashは、以下を**行いません**：

- マルチシグネチャトランザクションを暗号化すること（FROSTの統合は保留中です）
- 公開型トランザクションとの相関関係から保護すること
- IPアドレスを隠すこと

さらに読む：[シールドされたエコシステム](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashdが動作しなくなった場合、今は何を実行すればよいですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashdは廃止されました。バージョン6.20.0は2026年7月18日にブロック3417100で自動停止し、Ironwood（NU6.3）をサポートしたことがないため、アップグレード先となる後続バージョンはありません。

代わりにZ3スタックを実行してください。以前はzcashd単独で行っていた作業を、3つのプログラムに分割しています：

- **[Zebra](/zcash-tech/zebra-full-node)**はチェーンを検証します
- **[Zaino](/zcash-tech/zaino)**はチェーンをインデックス化し、ウォレットデータを提供します
- **[Zallet](/zcash-tech/zallet)**は資金を保管します

[Zakura](/zcash-tech/zakura-node)は代替となるフルノードです。また、その上でzcashdも実行するため、ほかのソフトウェアが依然として旧インターフェースを想定している場合に役立ちます。

まずは[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)をご覧ください。

</div>

## zcashdウォレットをZalletへ移行するにはどうすればよいですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zalletは既存の`wallet.dat`を移行するため、資金とアドレスを維持できます。

最初に`wallet.dat`をバックアップしてから、[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet)に従ってください。Zalletで残高を確認するまで、そのバックアップを保管してください。

移行後の日常的なコマンドについては、[Zalletクイックリファレンス](/using-zcash/zallet-quick-reference-guide)をご覧ください。

</div>

## Ironwoodとは何ですか？何かする必要がありますか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

IronwoodはネットワークアップグレードNU6.3です。2026年7月28日、ブロック3,428,143からメインネットで稼働しています。修正済みの回路に基づくシールドされたプールを追加し、古い[Orchard](/using-zcash/shielded-pools)プールを封鎖することで、ZECが偽造されていないことを誰でも検証できます。

**シールドされた資金を保有している場合、移動が必要になる可能性があります。**価値はOrchardから[ターンスタイル](/zcash-tech/the-turnstile)を通じてのみ移動でき、ウォレットごとに移動の時期と方法が異なります。手動で何かを移動する前に、ウォレットの提供元へ確認してください。

変更内容とその理由については、[Ironwood](/zcash-tech/ironwood)をお読みください。

</div>

## どのフルノードを実行すべきですか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)**はzcashdの直接的な後継であり、移行ガイドが想定しているノードです。特別な理由がなければ、これを選んでください。

**[Zakura](/zcash-tech/zakura-node)**は、より高速な同期とネイティブのブロックプルーニングを備え、スケールを目的とした2つ目の実装です。それらが必要な場合、またはzcashdと通信するソフトウェアに依存している場合は、こちらを選んでください。

どちらも同じチェーンを検証するため、これはコンセンサスではなく運用上の選択です。

</div>

## リリースノートの用語はどこで調べられますか？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

[Zcashライブラリ](/glossary-and-faqs/zcash-library)をご覧ください。ノードとウォレットのソフトウェア、シールドされたプール、および最も頻繁に登場するZIP番号を扱っています。

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
      <td className="py-4 px-5 text-foreground">いいえ。商標契約により、Zcash FoundationまたはECCがコミュニティのコンセンサスに反する行動を取ることは防止されています。ガバナンスは分散型であることが実証されています（[Messariレポート](https://messari.io/report/decentralizing-zcash)を参照）。コミュニティ投票、ZecHub、Zcash Foundation A/V Clubはいずれも幅広い参加を可能にしています。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashにはバックドアがありますか？</td>
      <td className="py-4 px-5 text-foreground">いいえ。Zcashにも、私たちが構築したいかなる暗号ソフトウェアにもバックドアは含まれておらず、今後も含まれることはありません。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashは企業によって管理されていますか？</td>
      <td className="py-4 px-5 text-foreground">誤りです。私たちは研究のために企業と提携していますが、Zcashは分散化への取り組みを維持しています。複数の自律組織が、セルフカストディとプライバシーの権利に向けて協力しています。</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcashは他のプライバシーコインと比べてプライバシーが限定的です</td>
      <td className="py-4 px-5 text-foreground">いいえ。Monero/Grin形式のプライバシーはデコイに依存しており、これは破られる可能性があります。Zcashはすべてのシールドされたトランザクションデータを暗号化するため、プール内のすべてのトランザクションは区別できません。[十分にプライベートではないですか？](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)をご覧ください。</td>
    </tr>
  </tbody>
</table>

</div>

---

**最終更新：** 2026年10月
**貢献したいですか？** [GitHubでこのページを編集する](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)

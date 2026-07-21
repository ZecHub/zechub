# よくある質問

Zcashに関する最もよく寄せられる質問の一覧です。Zcashクライアントのトラブルシューティングについては、[公式のトラブルシューティングガイド](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)をご参照ください。

### すばやなナビゲーション
[Zcashとは？](#what-is-zcash) | [Zcashをどのように入手できますか？](#acquire) | [他の暗号通貨との違いは？](#difference) | [プロトコルのガバナンスは？](#governance) | [私の取引はどこにありますか？](#transaction) | [Zcashは本当にプライベートですか？](#privacy) | [よくある誤解](#misconceptions)

---

## Zcashとは？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcashは、高速で秘密性の高い取引と低コストを特徴とするデジタル通貨です。プライバシーがZcashの中心的な機能です。ゼロ知識証明を使用してすべての取引を暗号化する方法を先駆けました。

即時かつモバイル、安全でプライベートな支払いに適したいくつかのウォレットがあります：[モバイルウォレット](https://z.cash/wallets/)
</div>

## Zcashをどのように入手できますか？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
暗号通貨の[取引所](https://z.cash/exchanges)でZECを購入できます。

また、ピアツーピアでの購入やマイニングによってもZcashを入手できます。
</div>

## Zcashと他の暗号通貨との違いは？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcashは、ビットコインやイーサリアムよりも本質的にプライバシーが高くなっています。速いブロックタイム（75秒）、低コスト、定期的なアップグレードを提供しています。

ユーザーは**Transparent（透明）**または**Shielded（保護された）**取引のどちらかを選択できます。詳細については[Shielded Ecosystem](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)をご覧ください。
</div>

## Zcashプロトコルはどのようにガバナンスされていますか？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
プロトコルは**Zcash Improvement Proposal (ZIP)**のプロセスによってガバナンスされます。誰でもZIPのドラフトを提出できます。コミュニティによってドラフトが議論され、ZIP編集者によって採択または拒否されます：

- [Daira Hopwood](https://twitter.com/feministPLT)（Electric Coin Company）  
- [Deirdre Connolly](https://twitter.com/durumcrustulum)（Zcash Foundation）

決定は仕様書に記載され、ネットワークが採用したときにチェーン上での承認が行われます。
</div>

## 私の取引はどこですか？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
まず[ブロックエクスプローラーに関するガイド](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629)を読むことをお勧めします。その後、[Zcash Block Explorer](https://zcashblockexplorer.com)をご確認ください。

取引は約25分（20ブロック）後に期限切れとなり、資金が自動的に戻されます。

**取引が表示されない可能性のある一般的な理由：**
- 接続の喪失
- 手数料が低すぎる
- ネットワークの過負荷
- 透明な入力が多すぎる（サイズが大きすぎる）

**成功するためのヒント：**
- 安定した接続を使用してください。
- 標準的な手数料を支払ってください（優先度が高い場合はそれ以上に）。
- 後で再度試してみてください。
- 入力を減らし、取引サイズを小さく保つようにしてください。
</div>

## Zcashは本当にプライベートですか？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**はい。** Zcashは保護された取引において送信者、金額、受取人のデータを暗号化します。

Zcashは**以下のことはしません：**
- マルチ署名取引（FROST統合が進行中）の暗号化
- 透明な取引との相関性の保護
- IPアドレスの隠蔽

詳しい情報については、[Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem)をご覧ください。
</div>

## よくある誤解

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">誤解</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">正しい答え</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcashは中央集権的なコインですか？</td>
        <td className="py-5 px-6 text-foreground">いいえ。商標協定により、Zcash FoundationやECCがコミュニティの合意に反する行動を取ることはできません。ガバナンスは証明された分散型です（[Messariレポート](https://messari.io/report/decentralizing-zcash)をご参照ください）。コミュニティ投票、ZecHub、およびZcash Foundation A/V Clubは幅広い参加を可能にしています。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcashにはバックドアがありますか？</td>
        <td className="py-5 px-6 text-foreground">いいえ。Zcashまたは我々が構築したどの暗号ソフトウェアにもバックドアは存在せず、今後も存在することはありません。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcashは企業によって管理されていますか？</td>
        <td className="py-5 px-6 text-foreground">誤りです。研究のために企業と提携していますが、Zcashは分散型へのコミットメントを維持しています。複数の自律的な組織が共同で自己保有およびプライバシー権を追求しています。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcashは他のプライバシーコインと比較してプライバシーが限られています</td>
        <td className="py-5 px-6 text-foreground">いいえ。Monero/Grinスタイルのプライバシーはダミー（これは破られる可能性があります）に依存しています。Zcashはすべての保護された取引データを暗号化するため、プール内のどの取引も区別できません。[Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)をご覧ください。</td>
      </tr>
    </tbody>
  </table>
</div>

---

**最終更新:** 2026年3月  
**貢献したいですか？** [GitHubでこのページを編集](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)

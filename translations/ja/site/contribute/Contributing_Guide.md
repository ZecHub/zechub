<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecHub への貢献

ZecHubは、Zcashについて人々が学ぶための支援をしています。このページをご覧の皆さんが、貢献を検討してくださっていることを本当に嬉しく思います！皆さんのあらゆる貢献は、[zechub.wiki](https://www.zechub.wiki/)およびその他のZecHubソーシャルメディアに反映されます。

### 新しい貢献者の方へ

ZecHubの概要については、[README](https://github.com/ZecHub/zechub/blob/main/README.md)をお読みください。


### はじめに

ZecHubは、コミュニティからの貢献を管理するためにGitHubを利用しています。GitHubが初めての方も、ご安心ください！ZecHubのコミュニティ貢献者として参加する方法を説明します。採用された貢献には、シールド化されたZECでチップをお支払いします。報酬額はZECで固定されていません。[報酬額の決定方法](#how-rewards-are-set)をご覧ください。このガイドでは、issueの作成、プルリクエスト（PR）の作成、レビュー、PRのマージまで、貢献のワークフローの概要を説明します。


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### 会話に参加する

まず、[コミュニティリンク](https://zechub.wiki/zcash-community/community-links)から会話に参加してください。

### スタイルガイド

ZecHubへのあらゆる貢献は、[ZecHubスタイルガイド](https://zechub.wiki/contribute/style-guide)に従う必要があります。これにはWiki、ドキュメント、ソーシャルメディアのコンテンツが含まれます。

### 貢献方法

ZecHubは、Zcashのユーザーと開発者にサポートおよびリソースを提供することを目的とした、コミュニティ主導のプロジェクトです。週刊ニュースレターの執筆、ナレッジベースへの貢献、開発プロジェクトの支援など、ZecHubに参加する方法は数多くあります。

現在ZecHubが受け付けている貢献の種類は以下のとおりです。

### 報酬額の決定方法

チップはシールド化されたZECで支払われます。以前は下記の見出しにあったZECの数値は、過去のZEC/USDレートに基づく履歴上のスナップショットです。現在のレートとして扱わないでください。

金額の決定方法：

1. 作業内容を[報奨金額ポリシー](https://bounties.zechub.wiki/docs/bounty-amounts)のUSD区間に照らし合わせます。
2. その範囲内で目標額を選びます。自動的に上限額を選ぶわけではありません。
3. 公開されているZEC/USDのスポット価格で換算し、報奨金にZECを記入します。

```
zec_to_enter = usd_target / zec_usd_spot
```

小数点以下4桁に丸めてください。ポリシーファイルが唯一の正しい情報源です。このページとそのファイルの内容が異なる場合は、ポリシーが優先されます。

報酬対象の作業は[ZEC Bounties](https://bounties.zechub.wiki/)に掲載されています。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

同じではない3つの状態：

1. **マージ済み** — PRがリポジトリに受け入れられた状態です。
2. **報酬承認済み** — スポンサーまたはDAOが、報酬を支払うべきこととその金額に合意した状態です。
3. **支払い済み** — ZECがあなたのシールド化されたUnified Addressに届いた状態です。

貢献がマージされたことだけでは、報酬は承認されません。報酬が承認されても、支払いが完了したことにはなりません。

#### 開発作業

Zcashエコシステムの構築に役立つ、承認済みの開発作業です。これにはWiki、新しいウォレット、または思いつくあらゆるアプリケーションが含まれます。

#### Zcash チュートリアル（動画）

以下にチュートリアルの例を示します。


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + Zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Zcashアプリに関するチュートリアルを作成・共有して、報酬を受け取りましょう。PRをzechub/tutorialsに提出するか、動画をDiscordの#video-contentチャンネルに送ってください。動画が基準を満たしていれば、こちらで投稿し、チップをお渡しします。

#### ZecHub Wiki - 新しいWikiページの公開

当Wikiサイトでは、理解しやすく消化しやすい形式でZcashの教育資料を提供しています。Zcashは活気あるコミュニティを持つ非常に高度な技術であるため、まだ作成すべきドキュメントが残っています。私たちの目標は、以下に関するドキュメントを作成することです：

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

これらはかなり幅広い分野であり、取り組めることが数多くあります。アイデアが必要な場合は、現在の[wiki-docsサイト](https://zechub.wiki/)を確認し、不足している内容を探してください。書きたい内容が決まったら、変更を加え、ZecHubリポジトリにPRを提出する方法を学びましょう。すべてのドキュメントはこのリポジトリで作成・管理されています。Wikiページを執筆する際は、[ZecHubスタイルガイド](https://zechub.wiki/contribute/style-guide)に従い、同じセクション内の既存ページを構成上の参考にしてください。PRを提出した後は、discordの#zechubセクションで@dismad、@squirrel、または@vitoにメッセージを送ってください。サイトに追加できる状態であれば、PRをレビューしてマージします。マージされた場合は、そのドキュメントをZecHubウェブサイトに追加します。ドキュメントの準備ができていない場合は、PR上で修正案を提示します。

#### ZecHub Wiki - 翻訳済みWikiページ

ZecHubの目標は、Zcashコミュニティの誰もが貢献できるオープンソースの教育ハブを提供することです。このハブの最大の成功の一つは、コミュニティメンバーがZecHubの資料を各地域の言語に翻訳していることです。

注：ZecHubのグローバルページ翻訳のレート制限は、週10ページです。

`translations/<locale>/site/`配下のキュレーションされたロケールページは、ソースハッシュマニフェストにより英語の原文と照合されています。古さの検出、同期ワークフロー、保護用語の検証については、[translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md)を参照してください。

#### ZecHub Wiki - 既存ドキュメントの編集

ドキュメント内の情報が正確でない場合があります。それでも問題ありません。だからこそ、私たちはこれらをオープンソース化しています！Wikiドキュメント内で変更が必要な箇所を見つけた場合は、ドキュメントのフッター（GitHubページへのリンクがあります）に移動し、PRで変更を提案してください。

#### ZecHub Wiki - リンク切れの修正

リンク切れや重要なスペルミスを見つけた場合は、ドキュメントのフッター（GitHubページへのリンクがあります）に移動し、PRで変更を提案してください。

#### ニュースレター - 新しい号の作成

私たちはエコシステムの週刊ニュースレターを制作しています。これは非常に手軽で、簡単に参加できる方法です！ニュースレターは毎週金曜日または土曜日に配信されます。ニュースレターを書きたい場合は、Discordの#zecweeklyセクションで@squirrelにメッセージを送り、その旨を知らせてください。

その後、このリポジトリの[ニュースレターセクション](https://github.com/ZecHub/zechub/blob/main/newsletter/newsletterbasics.md)に移動し、ニュースレターの新しい号を作成するためのプルリクエストを提出できます。この[テンプレート](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)で使用されている形式に従ってください。

これを行うと、@squirrelまたは（Discordでは）がニュースレターの新しい号が利用可能であることを確認し、レビューしてからリポジトリにマージします。マージ後、内容はSubstackで投稿されます。

#### ニュースレター - 翻訳

現在、スペイン語、ポルトガル語、ロシア語の版があります。翻訳版は各ソーシャルメディアに投稿され、私たちもZecHubのソーシャルを通じて可能な限り拡散しています。

ニュースレターを地域の言語に翻訳したい場合は、どのチャンネルから共有するか、またどの言語でニュースレターを公開するかをお知らせください。公開を調整します。

#### ポッドキャスト - ZecHubのソーシャルにエピソードを投稿

ニュース番組、ポッドキャスト、Twitterトーク、またはその他の動画・音声コンテンツのアイデアはありますか？Discordの#video-contentでお知らせください。ご相談に応じます。

この種のコンテンツに対する報酬はやや高額であるため、支出を承認する前にZecHubのDAOへ提案を提出する必要があります。

#### クリエイティブなソーシャルメディア投稿

私たちは、ソーシャルメディア向けの新しく魅力的なコンテンツを求めています。短い動画、GIF、ミーム、その他のクリエイティブな投稿は、[ZecHubスタイルガイド](https://zechub.wiki/contribute/style-guide)に沿っている場合に受け付けています。報酬額は[報奨金額ポリシー](https://bounties.zechub.wiki/docs/bounty-amounts)に従います。

ニュースレターやポッドキャスト用のサムネイルをデザインすることもできます。デザインの才能がある方は、Discordの#designでメッセージを送ってください。

#### 他のアイデアはありますか？ぜひお知らせください！

別の提案がありますか？Discordの#generalでお知らせください。話し合い、ZecHubのDAOが支援できるか検討します。

### 最後に

業界で最も尊敬されるプロトコルの一つに貢献することを、ぜひ始めてください。これはZcashに参加する素晴らしい方法です。貢献について質問がある場合は、[Discord](#join-the-conversation)でお知らせください。

ありがとうございます！

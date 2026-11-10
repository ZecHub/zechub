<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecHubへの貢献

ZecHubは、Zcashについて人々が学ぶ手助けをしています。このページをお読みいただいているということは、貢献をご検討いただいているのですね。とても嬉しく思います！皆さんからのあらゆる貢献は、[zechub.wiki](https://www.zechub.wiki/)およびその他のZecHubソーシャルメディアに反映されます。

### 新しい貢献者の方へ

ZecHubの概要については、[README](https://github.com/ZecHub/zechub/blob/main/README.md)をお読みください。


### はじめに

ZecHubは、コミュニティからの貢献を管理するためにGitHubを使用しています。GitHubを初めて利用する方も、ご心配はいりません！ZecHubのコミュニティ貢献者として参加する方法を説明します。承認された貢献に対しては、シールドされたZECでチップをお支払いします。報酬額はZECで固定されていません。[報酬の設定方法](#how-rewards-are-set)をご覧ください。このガイドでは、Issueの作成、プルリクエスト（PR）の作成、レビュー、PRのマージまで、貢献のワークフローを概観できます。


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

まず、[コミュニティリンク](https://zechub.wiki/zcash-community/community-links)で会話に参加してください。

### スタイルガイド

ZecHubへのあらゆる貢献は、[ZecHubスタイルガイド](https://zechub.wiki/contribute/style-guide)に従う必要があります。これにはWiki、ドキュメント、ソーシャルメディアのコンテンツが含まれます。

### 貢献できる方法

ZecHubは、Zcashのユーザーとdeveloperを支援し、リソースを提供することを目指すコミュニティ主導のプロジェクトです。週刊ニュースレターの執筆、ナレッジベースへの貢献、開発プロジェクトの支援など、ZecHubに参加する方法は数多くあります。

現在、ZecHubが受け付けている貢献の種類は以下のとおりです。

### 報酬の設定方法

チップはシールドされたZECで支払われます。以前は下の見出しにあったZECの数値は、古いZEC/USDレートに基づく過去のスナップショットです。現在のレートとして扱わないでください。

金額の選び方：

1. 作業内容を[バウンティ額ポリシー](https://bounties.zechub.wiki/docs/bounty-amounts)のUSD範囲に照らし合わせます。
2. その範囲内で目標額を選びます。自動的に上限額を選ぶわけではありません。
3. 公開されているZEC/USDのスポット価格で換算し、バウンティにZECを入力します。

```
zec_to_enter = usd_target / zec_usd_spot
```

小数点以下4桁に丸めてください。ポリシーファイルが唯一の信頼できる情報源です。このページとそのファイルの内容が異なる場合は、ポリシーが優先されます。

有償の作業は[ZEC Bounties](https://bounties.zechub.wiki/)に掲載されています。

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

1. **マージ済み** — PRがリポジトリに受け入れられています。
2. **報酬承認済み** — スポンサーまたはDAOが、報酬を支払うべきこととその金額に同意しています。
3. **支払い済み** — ZECがあなたのシールドされたUnified Addressに届きます。

貢献がマージされても、それだけで報酬が承認されるわけではありません。承認された報酬は、支払い完了を意味するものではありません。

#### 開発作業

Zcashエコシステムの構築に役立つ、承認済みのdeveloper作業です。Wiki、新しいウォレット、または思いつくあらゆるアプリケーションが含まれます。

#### Zcashチュートリアル（動画）

以下はチュートリアルの例です。


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Zcashアプリのチュートリアルを作成・共有して、報酬を受け取りましょう。zechub/tutorialsにPRを提出するか、Discordの#video-contentチャンネルに動画を送ってください。動画が基準を満たしていれば、投稿してチップをお支払いします。

#### ZecHub Wiki - 新しいWikiページの公開

当Wikiサイトは、理解しやすく消化しやすい形式でZcashの教育資料を提供しています。Zcashは活気あるコミュニティを持つ非常に高度な技術であり、まだ作成すべきドキュメントがあります。私たちの目標は、次の分野に関するドキュメントを作成することです。

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

これらはかなり広範な分野であるため、取り組めることが数多くあります。ヒントが必要な場合は、現在の[wiki-docsサイト](https://zechub.wiki/)を確認し、不足している内容を探してください。執筆したい内容が決まったら、変更を始め、ZecHubリポジトリにPRを提出する方法を学んでください。すべてのドキュメントはこのリポジトリで作成・管理されています。Wikiページを執筆する際は、[ZecHubスタイルガイド](https://zechub.wiki/contribute/style-guide)に従い、同じセクション内の既存ページを構成の参考にしてください。PRを提出した後、Discordの#zechubセクションで@dismad、@squirrel、または@vitoにメッセージを送ってください。PRをレビューし、サイトへ追加できる状態であればマージします。マージされた場合、ドキュメントはZecHubウェブサイトに追加されます。ドキュメントの準備ができていない場合は、PR内で編集案を提案します。

#### ZecHub Wiki - 翻訳されたWikiページ

ZecHubの目標は、Zcashコミュニティの誰もが貢献できるオープンソースの教育ハブを提供することです。このハブの最大の成功の1つは、コミュニティメンバーがZecHubの資料を自分たちの地域の言語に翻訳していることです。

注：ZecHubのグローバルページ翻訳のレート制限は、週10ページです。

`translations/<locale>/site/`配下のキュレーションされたロケールページは、ソースハッシュマニフェストにより英語の原文と照合されます。古さの検出、同期ワークフロー、保護用語の検証については、[translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md)をご覧ください。

#### ZecHub Wiki - 既存ドキュメントの編集

ドキュメント内の情報が完全に正確ではない場合があります。それでも問題ありません。それが私たちがドキュメントをオープンソース化している理由です！Wikiドキュメント内で変更が必要な箇所を見つけた場合は、ドキュメントのフッター（GitHubページへのリンクがあります）に移動し、PRで変更を提案してください。

#### ZecHub Wiki - 壊れたリンクの修正

リンクが壊れている、または重要な箇所のスペルが間違っている場合は、ドキュメントのフッター（GitHubページへのリンクがあります）に移動し、PRで変更を提案してください。

#### ニュースレター - 新しい号

私たちはエコシステムの週刊ニュースレターを発行しています。これは非常に手軽で、簡単に参加できる方法です！ニュースレターは毎週金曜日または土曜日に配信されます。ニュースレターを書きたい場合は、Discordの#zecweeklyセクションで@squirrelにメッセージを送り、その旨を伝えてください。

その後、このリポジトリの[ニュースレターセクション](/newsletter/newsletterbasics.md)に移動し、ニュースレターの新しい号を作成するためのプルリクエストを提出できます。[テンプレート](/newsletter/newslettertemplate.md)で使用されている形式に従ってください。

その後、@squirrelまたは（Discordでは）がニュースレターの新しい号を確認し、レビューしてリポジトリにマージします。マージ後、内容をSubstack経由で投稿します。

#### ニュースレター - 翻訳

現在、スペイン語、ポルトガル語、ロシア語の号があります。翻訳版は各ソーシャルメディアに投稿され、私たちはZecHubのソーシャルメディアを通じてできる限り拡散しています。

ニュースレターを地域の言語に翻訳したい場合は、共有に使用するチャンネルと、ニュースレターを発行する言語をお知らせください。公開を調整します。

#### ポッドキャスト - ZecHubソーシャルメディアでエピソードを投稿

ニュース番組、ポッドキャスト、Twitterトーク、またはその他の動画・音声コンテンツのアイデアはありますか？Discordの#video-contentでお知らせください。相談しましょう。

この種のコンテンツに対する報酬はやや大きいため、支出を承認する前にZecHubのDAOへ提案を提出する必要があります。

#### クリエイティブなソーシャルメディア投稿

私たちは、ソーシャルメディア向けの新しく魅力的なコンテンツを求めています。短い動画、GIF、ミーム、その他のクリエイティブな投稿は、[ZecHubスタイルガイド](https://zechub.wiki/contribute/style-guide)に合致する場合に受け付けています。報酬額は[バウンティ額ポリシー](https://bounties.zechub.wiki/docs/bounty-amounts)に従います。

ニュースレターやポッドキャストのサムネイルをデザインすることもできます。デザインの才能がある方は、Discordの#designでメッセージを送ってください。

#### その他のアイデアはありますか？ぜひお知らせください！

ほかに提案はありますか？Discordの#generalでお知らせください。話し合い、ZecHubのDAOが支援できるか確認します。

### 最後に

業界で最も尊敬されるプロトコルの1つへの貢献を、ぜひ始めてください。これはZcashに参加する素晴らしい方法です。貢献についてご質問があれば、[Discord](#join-the-conversation)でお知らせください。

ありがとうございます！

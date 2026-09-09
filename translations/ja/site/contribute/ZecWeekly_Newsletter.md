<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly ニュースレター

ZecWeekly は毎週日曜日の朝に配信されるニュースレターです。Zcash エコシステムでその週に起きたすべてのニュースを掲載しています。ニュースはコミュニティメンバーが毎週選定し、関連リンクはすべてニュースレターに追加されます。ニュースレターの購読は[こちら](https://zechub.substack.com/)からお願いします。

## 貢献する

ニュースレターへの貢献は、1人の寄稿者が対象週の号を作成し、現在の報酬または調整スレッドに従い、週ごとのリンクが揃った後にプルリクエストを提出する形が最も円滑です。ZecHub がその号の日付を投稿または確認する前に、将来分の号を提出しないでください。早すぎるプルリクエストでは、週後半の更新を見落としたり、担当キュレーターと競合したり、締め切りを誤ったりすることがあります。

### 1. 現在の号を確認する

執筆を始める前に：

- 現在のニュースレタータスクについては、[ZEC Bounties ](https://bounties.zechub.wiki/)を確認してください。
- 割り当てを待ってください

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. リポジトリをフォークする

GitHub を初めて使う場合は、次のワークフローを利用してください：

1. [ZecHub リポジトリ](https://github.com/ZecHub/zechub)を開きます。
2. **Fork** をクリックし、自分の GitHub アカウント配下にフォークを作成します。
3. フォーク内で、その号用の新しいブランチを作成します。`digest-may-30-2026` のように分かりやすいブランチ名を付けると便利です。
4. プルリクエストのベースリポジトリが `ZecHub/zechub`、ベースブランチが `main` になっていることを確認します。

コマンドラインを使用する場合、同じワークフローは次のようになります：

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME` は自分の GitHub ユーザー名に置き換えてください。上記 URL はプレースホルダーであり、そのままでは解決されません。

### 3. ニュースレターファイルを作成する

まずは[ニュースレターテンプレート](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)を使用してください。ニュースレターの各号は[`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter)フォルダに置きます。

ファイルを作成する際は：

- issue で指定された、または最近受理された号で使用されているファイル名形式に合わせてください。
- タスクで別の形式が求められていない限り、テンプレートと同じセクション順を維持してください。
- 対象週のリンクのみを追加してください。
- 各リンクについて、読者が重要性を理解できるよう、短く明確な説明を書いてください。
- 必要に応じて、英語以外の情報源を英語で翻訳または要約してください。
- プルリクエストを開く前に、すべてのリンクを確認してください。

### 4. 適切なタイミングでリンクを集める

ZecWeekly は通常、当週の Zcash エコシステム活動を取り上げ、週の終わり頃に公開されます。最も安全なタイミングは次のとおりです：

- 現在のニュースレター issue またはタスクが投稿された後にリンクを集め始めてください。
- 週が進行中の間は下書きを維持してください。
- 週後半の更新を確認した後、指定された提出日に近いタイミングでプルリクエストを提出してください。
- その日付のタスクが存在する前、または ZecHub が作成するよう確認する前に、将来週のニュースレターを提出しないでください。

issue に特定の日付までに提出するよう記載されている場合は、その日付に従ってください。このページと現在の issue に矛盾がある場合は、現在の issue に従ってください。

### 5. プルリクエストを開く

ニュースレターファイルの準備ができたら：

1. 変更を自分のフォークにコミットします。
2. `main` ブランチ上の `ZecHub/zechub` に対してプルリクエストを開きます。
3. `Zcash Ecosystem Digest | May 30th` のように、その号に一致するタイトルを使用します。
4. レビュアーが作業とタスクを結び付けられるよう、プルリクエスト本文に issue をリンクします。

プルリクエスト本文の例：

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

プルリクエストを開いた後は、レビューコメントを確認してください。ZecHub から編集を求められた場合は、同じ号について2つ目のプルリクエストを開くのではなく、同じブランチを更新してください。

### 実例

受理された提出例として、マージ済みの以下のニュースレタープルリクエストを参照してください：

- [Zcash Ecosystem Digest | 4月11日](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 3月28日](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 2月14日](https://github.com/ZecHub/zechub/pull/1474)


![マージ済み ZecWeekly ニュースレターのプルリクエスト例](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

自分の作業を例と比較する際は、ファイルの場所、タイトル形式、セクション順、リンクの説明、プルリクエストが正しいタスクに結び付いているかに注目してください。

### 避けるべきよくある間違い

- 号の日付またはタスクが確認される前にプルリクエストを開くこと。
- すでにリンクされたプルリクエストがある issue に取り組むこと。
- `ZecHub/zechub` ではなく、自分のフォークにプルリクエストを提出すること。
- 誤ったファイル名を使用したり、`newsletter` フォルダ外にファイルを置いたりすること。
- すべての日付、リンク、説明を更新せずに古い号をコピーすること。
- 誤った週のリンクを追加すること。
- 壊れたリンク、重複リンク、またはテンプレート内のプレースホルダーテキストを残すこと。
- レビューコメント後に元のブランチを更新せず、新しいプルリクエストを開くこと。

### 最終チェックリスト

レビューを依頼する前に、以下を確認してください：

- issue またはタスクの日付がニュースレターファイルと一致している。
- 同じ issue または号を対象とする別の未解決プルリクエストがすでに存在しない。
- ファイルが `newsletter` フォルダ内にある。
- テンプレートのセクションがすべて完成している。
- すべてのリンクが機能し、有用な説明が付いている。
- プルリクエスト本文が正しい issue にリンクしている。
- レビュアーが変更を求めた場合に編集できる。

## 過去の号

[ZecWeekly アーカイブ](https://zechub.substack.com/p/archive)

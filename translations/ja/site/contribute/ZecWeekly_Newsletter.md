<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# ZecWeekly ニュースレター

ZecWeekly は毎週日曜の朝に配信されるニュースレターです。Zcash エコシステムでその週に起きたすべてのニュースが含まれています。ニュースは毎週コミュニティメンバーによってキュレーションされ、関連するリンクがすべてニュースレターに追加されます。ニュースレターの購読は[こちら](https://zechub.substack.com/)からお願いします。

## 貢献する

ニュースレターへの貢献は、1人のコントリビューターが正しい週の版を準備し、現在のバウンティまたは調整スレッドに従い、週次リンクの準備が整ってからプルリクエストを提出する形が最もうまく機能します。ZecHub がその版を投稿するか日付を確認する前に、将来分の版を提出しないでください。早すぎるプルリクエストは、週の後半の更新を見落としたり、担当キュレーターと競合したり、締切を誤ったりすることがよくあります。

### 1. 現在の版を確認する

書き始める前に、以下を行ってください:

- 現在のニュースレター作業について [ZEC Bounties ](https://bounties.zechub.wiki/) を確認する。
- 割り当てを待つ

![ss](https://github.com/user-attachments/assets/149a802c-b64f-4969-ad89-e83ffecf568e)



### 2. リポジトリをフォークする

GitHub に不慣れな場合は、このワークフローを使用してください:

1. [ZecHub リポジトリ](https://github.com/ZecHub/zechub)を開きます。
2. **Fork** をクリックし、自分の GitHub アカウント配下にフォークを作成します。
3. フォーク内で、その版用の新しいブランチを作成します。`digest-may-30-2026` のような分かりやすいブランチ名が便利です。
4. プルリクエストの送信先がベースリポジトリ `ZecHub/zechub`、ベースブランチ `main` になっていることを確認します。

コマンドラインを使う場合、同じワークフローは次のようになります:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. ニュースレターファイルを作成する

出発点として [newsletter template](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) を使用してください。ニュースレターの各版は [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) フォルダに配置します。

ファイルを作成する際は、以下を守ってください:

- issue で指定された、または最近承認された版で使われているファイル名形式に合わせる。
- タスクで別の形式が求められていない限り、テンプレートと同じセクション順を維持する。
- 該当する週のリンクのみを追加する。
- 読者がその重要性を理解できるよう、各リンクに短く明確な説明を書く。
- 必要に応じて、英語以外のソースは英語に翻訳または要約する。
- プルリクエストを開く前に、すべてのリンクを確認する。

### 4. 適切なタイミングでリンクを集める

ZecWeekly は通常、その週の Zcash エコシステムの活動を扱い、週の終わり頃に公開されます。最も安全なタイミングは次のとおりです:

- 現在のニュースレター issue またはタスクが投稿された後にリンク収集を始める。
- 週がまだ進行中の間は下書きを維持する。
- 週の後半の更新を確認したうえで、求められた提出日に近いタイミングでプルリクエストを提出する。
- その日付のタスクが存在する前、または ZecHub があなたに準備すべきだと確認する前に、将来の週のニュースレターを提出しない。

issue に特定の日付までに提出するよう書かれている場合は、その日付に従ってください。このページと現在の issue の内容が矛盾する場合は、現在の issue に従ってください。

### 5. プルリクエストを開く

ニュースレターファイルの準備ができたら:

1. 変更を自分のフォークにコミットします。
2. `main` ブランチの `ZecHub/zechub` に向けてプルリクエストを開きます。
3. `Zcash Ecosystem Digest | May 30th` のように、その版に一致するタイトルを使用します。
4. レビュアーが作業とタスクを結び付けられるよう、プルリクエスト本文に issue をリンクします。

プルリクエスト本文の例:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

プルリクエストを開いた後は、レビューコメントに注意してください。ZecHub から修正を求められた場合は、同じ版について2本目のプルリクエストを開くのではなく、同じブランチを更新してください。

### 実例

承認済み提出の例として、以下のマージ済みニュースレターのプルリクエストを参照してください:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](https://github.com/user-attachments/assets/9230d68d-6406-4c8a-992c-df84e0d318d8)

自分の作業を例と比較する際は、ファイルの場所、タイトル形式、セクション順、リンク説明、そしてプルリクエストが正しいタスクに結び付いているかに注目してください。

### 避けるべきよくあるミス

- 版の日付またはタスクが確認される前にプルリクエストを開くこと。
- すでにリンクされたプルリクエストがある issue に取り組むこと。
- `ZecHub/zechub` ではなく自分のフォークに対してプルリクエストを提出すること。
- 間違ったファイル名を使うこと、または `newsletter` フォルダの外にファイルを置くこと。
- 古い版をコピーしたまま、すべての日付・リンク・説明を更新しないこと。
- 間違った週のリンクを追加すること。
- 壊れたリンク、重複リンク、またはテンプレートのプレースホルダーテキストを残すこと。
- レビューコメント後に元のブランチを更新せず、新しいプルリクエストを開くこと。

### 最終チェックリスト

レビューを依頼する前に、以下を確認してください:

- issue またはタスクの日付が自分のニュースレターファイルと一致している。
- 同じ issue または版をすでに扱っている未クローズのプルリクエストが他にない。
- ファイルが `newsletter` フォルダ内にある。
- テンプレートのセクションがすべて完成している。
- すべてのリンクが機能し、有用な説明が付いている。
- プルリクエスト本文が正しい issue にリンクしている。
- レビュアーから変更依頼があった場合に修正できる状態である。

## 過去の版

[ZecWeekly アーカイブ](https://zechub.substack.com/p/archive)

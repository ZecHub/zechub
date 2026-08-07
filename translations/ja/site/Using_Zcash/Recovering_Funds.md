---
<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcashウォレットの資金復元

**なぜ秘密鍵を保持しておくのですか？**

秘密鍵は、あなたのデジタル資産の安全性を守る秘密です。安全に保管し、第三者と決して共有しないことが不可欠です。

> この文脈では、**シードフレーズ**は秘密鍵と同等のものと見なせます。

秘密鍵を自分で管理していれば、復元プロセスは常に可能です。Zcashの秘密鍵には2種類（transparent と shielded）があり、Sweep Funds機能を使う場合でも、新しいアカウントとしてインポートする場合でも、簡単にウォレットへ取り込めます。秘密鍵を自分で管理し続けることで、資産に対する完全なコントロールを維持し、所有権・安全性・安心を確保できます。

# セキュリティと責任

ユーザーは、秘密鍵を扱うことに伴うリスクを理解し、これらの鍵を不正アクセスから保護しておくことが極めて重要です。資金の安全性は、ユーザーが自らの秘密鍵を適切に保護する責任にかかっています。

> **始める前に:** 以前の復元ガイドではYwalletが案内されていました。その開発者は、Ironwood（NU6.3）ネットワークアップグレード向けには更新しないことを確認しており、現在はチェーンを追跡できません。**Zkool**を使ってください。これは同じ開発者による後継であり、現在も保守されています。詳しくはこのページ下部の[Ywallet is no longer maintained](#ywallet-is-no-longer-maintained)を参照してください。

## Zkoolによる資金復元

[Zkool](https://github.com/hhanh00/zkool2/releases) は、同じ開発者によるYwalletの後継で、transparent と shielded の両方の復元をサポートしています。

ここでは2つの状況を扱います。

1. シードフレーズ、秘密鍵、またはViewing Keyから**アカウントを復元する**
2. transparentアドレスしかサポートしていなかったウォレットから**資金をSweepする**

### 1) アカウントの復元

1. [releases page](https://github.com/hhanh00/zkool2/releases) からZkoolをインストールして開きます
2. **Account Manager**（メインページ）で、**+** ボタンをタップして **New Account** 画面へ進みます
3. このアカウントを識別するための **Account Name** を入力します
4. **Restore Account?** をオンにします。これにより、鍵とbirth heightのフィールドが表示されます
5. **Key (Seed Phrase, Private Key, or Viewing Key)** に鍵を貼り付けます。Zkoolはシードフレーズ、Sapling秘密鍵、transparent拡張鍵、またはViewing Keyを受け付けます
6. ウォレットを最初に使った時期がおおよそ分かっているなら、**Birth Height** を入力します。これによりZkoolはどこからスキャンを始めるか判断でき、大幅に時間を節約できます

![Restore AccountとAdvanced Optionsの両方がオンになったZkoolのNew Account画面](/content-images/zkool-restore-account-60b1d2777e.webp)

> **birth heightが分からないですか？** 空欄のままにして警告を確認してください。Zkoolはチェーンの先頭からスキャンします。遅くはなりますが、見落としはありません。もし資金が2018年10月のSaplingアップグレード以前のものであれば、後の高さを推測して入力するより空欄のままにしてください。そうしないと、スキャンがあなたのトランザクションを完全に飛ばしてしまう可能性があります。

7. アカウントを保存し、その後同期します

### 別のウォレットのシードを復元する

シードが別のウォレット由来で、同期後の残高が正しく見えない場合、通常はchange addressの導出方法が原因です。

同じNew Account画面のさらに下にある **Advanced Options** スイッチをオンにし、保存前に **Use Internal Change** をオンにしてください。

ウォレットはすべて同じ方法でchange addressを導出するわけではありません。この設定なしでZODLのシードをZkoolに復元すると、change notesが欠けた残高が表示されることがあり、資金が失われたように見えますが、実際にはそうではありません。Zkoolのこのスイッチに対するツールチップは、依然としてZashiに言及していますが、これはZODLの以前の名称です。

さらに2つのフィールドが **Advanced Options** の下にあります。

- **Extra Passphrase (optional)**。元のウォレットで使用していた場合のみ
- **Account Index**。元のウォレットが1つのシード上で複数のアカウントを持っていた場合。資金が別のインデックスにある可能性があります

> **この2つは、有効なシードフレーズがKeyフィールドに入っている場合にのみ表示されます。** フィールドが空、または秘密鍵やViewing Keyが入っている場合、Zkoolには **Use Internal Change** と **H/W Ledger** しか表示されません。まずシードを貼り付けてから、Advanced Optionsを開いてください。

### 2) transparent専用ウォレットから資金をSweepする

資金が、shieldedアドレスを一度もサポートしていなかったウォレット（Trust、Coinomi、Guardaなど）にある場合、まずアカウントを復元し、その後資金をshielded poolへ移してください。

1. 上記の手順でアカウントを復元します
2. アカウントを開き、**Receive Funds** ページへ移動します
3. 上部バーの虫眼鏡（**Find other transparent addresses**）をタップします。LedgerやExodusのようにアドレスをローテーションするウォレットは、1つのシードから多数のtransparentアドレスを生成するため、この機能で資金のあるものを見つけられます
4. **その後、アカウントをResetして同期してください。** 新たに見つかったアドレスは次回のスキャンで初めて残高を拾うため、これを省くとSweepで何も見つからなかったように見えます
5. **Send** ページへ進みます。残高の近くに3つのアイコンボタンがあります。テキストラベルはないため、名前を確認するにはホバーまたは長押ししてください:
   - **Shield One**（輪郭だけの盾）は、1回に1つのtransparentアドレスを移動します
   - **Shield All**（塗りつぶしの盾）は、すべてのtransparentアドレスから一度にすべてを移動します
   - **Unshield All**（開いた南京錠）は、その逆方向、つまりtransparentアドレスへ移動します

> **よりプライバシーが高いのはShield Oneです。** 複数のアドレスを1つのトランザクションでshield化すると、それらが同一人物のものであることが公開上結び付けられます。Zkool自身も、Shield Allを実行する前にこの点を警告します。

6. トランザクションを確認して送信します

Unshield Allは、transparentアドレスしか受け付けない取引所へ出金するときに便利です。shield化ボタンは、アカウントにshieldedアドレスがある場合にのみ表示され、Unshield Allはtransparentアドレスがある場合にのみ表示されます。

## 復元した資金とIronwoodプール

2026年7月28日にIronwood（NU6.3）アップグレードが有効化されて以降、Orchardプールは支出専用です。新しい価値をそこへ入れることはできず、既存の価値はturnstileを通ってIronwoodへ出ていきます。

復元した資金がOrchardにある場合、通常どおりに扱えるようになる前に移行が必要です。アカウントメニューを開いて **Note Migration** を選んでください。このオプションは、実際に移行するものがあるときにのみ表示されます。

画面のタイトルは **Orchard to Ironwood Migration** で、2段階で実行されます。まず非標準のnotesを標準額面に分割し、その後それらのnotesを1つずつ移動します。**Migration Speed** はUltra FastからSlowまでのスライダーで、各ステップの間に入るランダムな遅延を設定します。**Start Migration** はこの段階的プロセスをバックグラウンドで実行し、ページを閉じて後で再開することもできます。**One Shot** はこれを一括で実行します。

各ステップはそれぞれ独立したトランザクションであるため、そのたびに手数料が発生します。

> **移行額は公開されます。** 価値がturnstileを通過するとき、送信者と受信者はshieldedのままでも、金額とブロック高はチェーン上で可視になります。特徴的な金額はあなたの特定につながり得るため、一括実行よりも低速での段階的移行を優先し、さらに移動した金額とIPアドレスが結び付けられないよう、先にTorやVPNを経由して接続することを検討してください。

## ZExCavatorによる詳細復元

[ZExCavator](https://github.com/zingolabs/zexcavator) は、Zingo Labsによる復元ツールで、ウォレットファイルの破損や一部欠損など、通常の復元が機能しないケース向けです。

> 最終更新は最近のネットワークアップグレード以前であるため、最後の手段として扱い、結果を信用する前に、復元した鍵を保守中のウォレットで検証してください。

## Ywalletはもう保守されていません

Ywalletは長い間、このページで推奨されていた復元ツールであり、古いガイドの多くは今でもそこを参照しています。

その開発者は、Ironwood向けには更新しないことを確認しています。現在のコンセンサスルールをサポートしないウォレットは有効なトランザクションを構築できないため、復元した資金を移動する用途にはもう使えません。同じ開発者による **Zkool** が保守されている後継であり、このページでも現在はこちらを使用しています。

すでにYwallet内に資金がある場合は、上記の手順を使って同じシードフレーズをZkoolに復元してください。

## 関連ページ

- [ウォレット](/using-zcash/wallets) - 保守されているウォレットと、そのIronwood対応状況
- [Ironwood](/zcash-tech/ironwood) - アップグレードで何が変わったのか、そしてなぜ資金が移行するのか
- [メモ](/using-zcash/memos) - 暗号化メモの仕組み
- [Viewing Keys](/zcash-tech/viewing-keys) - 支出権限なしの読み取り専用アクセス

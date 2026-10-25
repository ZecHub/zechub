<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Crosslink Feature Net に参加する

## 要約

- Feature Net は、Zcash のプルーフ・オブ・ワークにステーキングを加える、提案中のファイナリティ層である [Crosslink](/zcash-tech/crosslink-protocol) のための Shielded Labs の公開テストネットです。
- これはテストコイン cTAZ 上で動作します。ここで何をしても、メインネットの ZEC が動いたり危険にさらされたりすることはありません。
- 1つのデスクトップアプリが、ノード、マイナー、ウォレット、ファイナライザーを兼ねます。デフォルトで cTAZ をマイニングし、フォーセット用ボタンもあります。
- ステーキング、アンステーキング、出金は、3日に1度の「Staking Day」にのみ可能です。逃すと次の開催日まで待つ必要があります。
- ステーキングするには、ファイナライザーの識別情報を貼り付けて金額をクリックします。このガイドでは、例として ZecHub のファイナライザーを使用します。
- 現在の状態は、2つの RPC 呼び出し、`wallet_staking_positions` と `get_tfl_recency_status` で確認できます。

*2026年10月8日から10日にかけて、Feature Net バージョン14を Windows 11（バージョン10.0.26200.9550）でテストしました。このソフトウェアはプロトタイプであり、リリースごとに変わります。表示内容がこのページと異なる場合は、ご自身の実行結果を信頼し、PRを作成してください。*

## Feature Net とは

Crosslink は提案であり、現在は Zcash の一部ではありません。Shielded Labs の [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) には、メインネットに到達するには「標準的な Zcash ガバナンスプロセスを経る必要がある」とあります。[Crosslink Protocol](/zcash-tech/crosslink-protocol) のページで設計が説明されています。

実際のユーザーとともに設計を試すため、Shielded Labs は [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)、すなわち「インセンティブ付きテストネットのシリーズ」と呼ぶものを運用しています。ネットワークには3つの役割があり、デスクトップアプリはそのすべてを担えます。

| 役割 | 行うこと |
|---|---|
| マイナー | 現在の Zcash と同様に、プルーフ・オブ・ワークのブロックを生成する |
| ステーカー | cTAZ をデリゲーションボンドにロックし、ファイナライザーに委任する |
| ファイナライザー | ブロックの確定に投票する。投票力は委任されたステークで決まる |

これを支えるリポジトリは、何かをインストールする前に読む価値のある免責事項で始まります。そこには「本番環境のエンジニアリングを示すためではなく、アイデアを証明するために存在する」ものであり、「本番環境対応のコードではない」とあります（[README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)）。それが許容できるマシンで実行してください。

### バージョン14で変わったこと

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) は2026年10月1日に公開されました。このネットワークは通常のプルーフ・オブ・ワークとして始まり、3段階で Crosslink を有効にします（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)、[ctaz.cash](https://ctaz.cash/v14) にも表示されています）。

| ブロック | 発生すること |
|---|---|
| 20,736 | ステーキング開始 |
| 34,560 | チェーン上のステークから、最初のファイナライザーロスターが作成される |
| 36,288 | BFTファイナリティと、ステーキング報酬が始まる |

ステーキング報酬は最後のブロックから始まります。それより前に作られたボンドは、それまでは何も獲得しません（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)）。

同じリリースでは、アクティブなロスターをステーク上位12名のファイナライザーに限定し（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)）、リリースノートの表現では、それらにコミッションを与えました。「ブロック内のすべての PoS Rewards の10%がこれらのコミッションに充てられ、90%がすべてのステーキングボンドに分配されます」。

### cTAZ と実際の ZEC

cTAZ（「Crosslink TAZ」）は Feature Net のテストコインです。ステーキングするのは cTAZ であり、ZEC ではありません。

実際の ZEC が関係するのは最後だけです。Shielded Labs はフィーチャーネット用に [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) を確保しており、[release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) には、「各参加者がマイニングまたはステーキングを通じて得た cTAZ の量だけに基づき、比例配分で」支払われるとあります。そこから2つのことが分かります。

- **フォーセットのコインは対象になりません。** フォーセットまたは他人から受け取った cTAZ は、ウォレットに置いているだけでは何も獲得しません。対象となるのは、マイニングとステーキングによるブロック報酬だけです。
- **支払いは請求制であり、自動ではありません。** Shielded Labs は各ラウンドを [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) で発表します。Round 2 では、参加者に対し、2026年10月4日までにウォレットの Viewing Key とメインネットアドレスを送るよう求めました（[post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)）。バージョン14が動作する、このガイドで参加するネットワークは、Round 3 として発表されました（[post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)）。

## 始める前に

- **動かしたままにできるコンピューター。** リリースには、Windows、macOS、Ubuntu、Arch Linux 向けのビルドがあります。このガイドは、Intel Core i5-8350U プロセッサ搭載PCの Windows で実行しました。
- **Staking Day。** 何かを計画する前に、次回の開始時刻を確認してください。[Staker Space's dashboard](https://crosslink.staker.space/) でカウントダウンを確認できます。
- **ほかには不要です。** ZEC も、アカウントも、登録も必要ありません。

## ステップ1：アプリをダウンロードしてファイルを確認する

1. [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) を開き、**Assets** までスクロールします。
2. 使用するシステム向けのファイルをダウンロードします。Windows では `zebrad_v14_win32.exe` です。
3. ファイルの SHA-256 を、GitHub がそのアセットの横に表示するダイジェストと比較します。

Windows では、PowerShell で次を実行します。

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

そのファイルに対して GitHub が示すダイジェストは `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e` です。16進数では大文字・小文字は区別されないため、上記の大文字でも問題ありません。目視ではなくシェルに比較させるには、次を実行します。

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

このチェックの意味を理解しておいてください。リリースには署名がないため、ハッシュが一致しても、ダウンロードが完全で、GitHub が提供しているファイルであることしか分かりません。誰がビルドしたかは分かりません。[Verifying Zcash Releases](/guides/verifying-zcash-releases) では、この違いを説明しています。

## ステップ2：ノードを起動して同期を待つ

起動メッセージを画面に残せるよう、ターミナルからアプリを起動します。「管理者として実行」で開いたものではなく、通常の PowerShell ウィンドウを使用してください。これは署名なしのプロトタイプソフトウェアであり、管理者権限は必要ありません。

```powershell
.\zebrad_v14_win32.exe
```

「Zcash Crosslink Visualizer」というタイトルのウィンドウが開きます。左側に **Your Wallet** と **Faucet Wallet** タブを持つウォレット、中央に描画されたチェーン、右側にファイナライザー一覧が表示されます。ターミナルにはノードのログが出力され続けます。ネットワークを使う間は両方を開いたままにしてください。

リリースノートには、[video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk) へのリンクがあります。

リリースノートによると、アプリはキャッシュフォルダーにデータを保存します。Windows では `%LOCALAPPDATA%\zebra`、Linux では `~/.cache/zebra`、macOS では `~/Library/Caches/zebra` です。

**秘密は自分だけのものにしてください。** そのフォルダーには `secret.seed` というファイルがあります。アプリは最初の起動時にこれを作成し（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)）、これからウォレットとファイナライザー識別情報を導出します（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)）。アプリには、同じ秘密をクリップボードに入れる **Copy Seed** ボタンもあります。どちらかを持つ者はウォレットを操作できます。チャット、フォーラム投稿、スクリーンショットに貼り付けないでください。

### 同期済みかどうかを判断する方法

リリースノートには、「ネットワークの先端までどれほど同期できているかを確認する組み込み監視機能はない」とあります。バージョン14には多少あります。ウィンドウ上部の **Network Info** ドロップダウンには、PoW Height、Wallet Sync、Blocks Behind Known PoW の行があります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)）。自分の高さを [Staker Space](https://crosslink.staker.space/) または [ctaz.cash](https://ctaz.cash/) のものと比較してください。

ノードは RPC 経由でも応答します。

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

このビルドでは、RPC ポート `127.0.0.1:8232` はデフォルトで開いており、パスワードは不要です（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)）。自身のマシン上でのみ待ち受けますが、そのマシン上で動作するものは何でも呼び出せます。

この実行では、ブロック0から約28,400の先端までの初回同期に、およそ50分かかりました。

**再起動後、しばらくの間は残高がゼロと表示されます。** アプリは起動のたびに、`secret.seed` からウォレットを再構築し、ブロック0から再びチェーンをスキャンします（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)）。スキャンが自分のトランザクションに達するまで、残高とステークは0と表示されます。この実行では、再起動から約15分後に戻りました。フォーセットのウォレットも同様に再スキャンされ（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)）、スキャン中は Faucet Wallet タブに非常に大きな残高が表示されました。Wallet Sync が完了するまで、どちらも無視してください。

## ステップ3：cTAZ を入手する

### マイニングする

リリースノートによると、アプリは同期が完了すると、自分のウォレットに向けてCPUマイニングを開始します。何かを有効にする必要はありません。マイニングされたコインは、自分のウォレットの透明アドレスに入ります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)）。

ブロックを見つけられるかは別問題です。ノートには、「より速くマイニングする他者に競り負ける可能性があり、成功は保証されない」と警告されています。デフォルトでは、内蔵マイナーは1つのCPUスレッドを使用します（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)）。

より多くのスレッドを使うには、アプリを起動する前に、同じ PowerShell ウィンドウで環境変数を設定します（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)）。この実行では4つ使用しました。

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

この変数は、そのウィンドウが開いている間だけ有効です。設定すると、Windows のプロセッサカウンターでは、ノードが論理プロセッサ1個を100%とした割合で、4～5個分のプロセッサ時間を使っていると表示されました。

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

結果として、Intel Core i5-8350U が4スレッドで10月8日早朝から10月9日午後までマイニングしましたが、ブロックは見つかりませんでした。

### またはフォーセットを使う

アプリの右下には **Receive cTAZ** ボタンがあります。バージョン14のソースでは、1回押すとフォーセットのウォレットから自分のウォレットへ0.5 cTAZが送られます（[amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073)、[send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)）。フォーセットはアプリのすべてのコピーに含まれる単一のウォレットであり（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)）、**Faucet Wallet** タブにはその残高が表示されます。

フォーセットにシールドされたコインが5.01 cTAZより多くなければ、ボタンは無効になります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)）。タブはフォーセットがマイニングしたコインも数えますが、それらはちょうど10 cTAZと手数料単位でしかシールドされません（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)）。そのため、タブには十分な残高が表示されていても、ボタンがグレーのままであることがあります。この実行では、タブに14.74695 cTAZが表示されていたにもかかわらず、10月8日と9日はグレーのままで、ホバーすると「The faucet is mining more funds.」と表示されました。

**ボタンがグレーの場合は、自分のノードに問い合わせてください。** ノードには、ボタンの5.01 cTAZルールを適用しないフォーセット要求メソッド `requestfaucetdonation` があります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)）。`YOUR_ADDRESS` の位置に自分のアドレスを入れてください（下記の `wallet_spendable_funds` の `address` フィールドです）。

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

この応答は、送信されたのではなく要求がキューに入ったことを意味します。この実行では、フォーセットの0.5 cTAZはブロック33,306でマイニングされ、ブロック33,322で使用可能になりました。フォーセットは共有されており、最初の要求が保留中は同じアドレスへの2回目の要求が拒否されるため、要求は1回だけにしてください（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)）。

### または別の参加者に頼む

ネットワーク上の誰でも、アプリの **Send** ボタンで cTAZ を送れます。この実行では、別の参加者が31 cTAZを送ってくれました。「send from user wallet」というメモ付きで「Received」として到着しました。これはアプリ自身の Send が付けるメモです（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)）。[forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) で依頼し、伝えるのは自分のアドレスだけにしてください。

フォーセットのコインや贈与されたコインは、ステーキングを学ぶには十分です。ZEC の報酬には算入されません。

### 使用可能な残高を確認する

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

フォーセットの0.5 cTAZが到着後、アドレスを短縮して表示した応答は次のとおりでした。

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

金額の単位は zatoshi で、100,000,000 zatoshi が1 cTAZです。シールドされたコインは、使用可能になるまでに3承認が必要です（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)）。フォーセットや他の参加者からのコインは `spendable_zats` に入ります。マイニングされたコインは透明なので、`unshielded_zats` に入ります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)）。

この実行で2回目のステークを行った1ブロック後、残りの残高は `pending_zats` の下に表示されました。数ブロック後には再び使用可能になりました。

## ステップ4：ファイナライザーへステーキングする

### Staking Day を待つ

ステーキング、アンステーキング、出金が受け付けられるのは、次の期間だけです。

```text
block height mod 10,368 < 3,456
```

これは10,368ブロックごとの最初の3,456ブロックのウィンドウです。ネットワークのブロック目標時間が25秒であるため、3日に1日となります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)）。バージョン14の最初のウィンドウは、ブロック20,736、31,104、41,472、51,840で始まります。

リリースノートによると、アプリは各 Staking Day の開始と終了を通知します。この実行では、ブロック一覧にブロック34,559と34,560の間で赤い「* STAKING DAY END *」行が表示されました。

**リリースノートには2つの異なる記述があります。** 変更一覧には「Staking Day は約1日、Staking Cycle は約3日」とあり、これはコードと一致します。さらに下には、Season 1から引き継がれた、Staking Day は150ブロックごとに始まり70ブロック続くという記述が残っています。前者に従ってください。上記の終了行は、最初のルールがウィンドウを閉じる位置にあります（34,560 mod 10,368 = 3,456）。2つ目のルールでは、ブロック34,560はウィンドウ内に入ります。

### ファイナライザーを選ぶ

ファイナライザーは、`zfinv1` で始まる文字列である識別情報によって指定されます。ZecHub は、運用しているファイナライザーの識別情報を [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) に公開しています。

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

信頼できるソースから識別情報をコピーしてください。リリースノートによると、アプリの右側パネルにもファイナライザーが一覧表示され、それぞれの左にコピーアイコンがあります。

ステーキング後、ウォレット履歴とRPCは、識別情報の代わりに16進キーでファイナライザーを示します。ZecHub のファイナライザーでは、そのキーは `2941ef23...266aae8f` です。

信頼できるファイナライザーを選んでください。この設計には自動スラッシングはありませんが、「特定のファイナライザーに委任されたすべてのステークを焼却する、ユーザー協調型のハードフォーク」を許容しています（[Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)）。

選択は誰が投票するかも決めます。アクティブなボンドはすべて、ステーキング報酬の分け前を得ます。ファイナライザーがロスターの12名に入っている場合、その分け前の10分の1がコミッションとしてファイナライザーに渡ります。12名以外のファイナライザーに向けたボンドは分け前をすべて保持しますが、そのファイナライザーは投票しません（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)）。

### ステーキングする

1. ファイナライザーの識別情報をコピーします。
2. **Your Wallet** タブで **Stake** を押します。
3. **Paste Identity** を押します。ボタンの上の行が識別情報の最初と最後の文字に変わります。ZecHub の場合は `[zfinv1j6..YWyzp4YN]` です。続ける前に確認してください。
4. 金額をクリックします。金額は固定の刻みで、最小は0.01 cTAZです。残高でカバーできる金額だけが点灯します。0.5 cTAZの場合、+0.01 cTAZ と +0.1 cTAZ が点灯しました。

**確認を求められることはなく、何も起きていないように見えます。** この実行でテスターは「一度クリックしたけれど何も起きず、グレーになってまた点灯しただけだった」と表現しました。しかしステークは通っていました。ウォレット履歴には「Staked @ 33334 to 2941ef23..266aae8f」と表示され、手数料は0.00015 cTAZ、ウォレットには0.010 cTAZ Stakedと表示されました。数分後の2回目のステークでは、ブロック33,348に2つ目のボンドが作成されました。

ステークを行うたびに、別個のデリゲーションボンドが作成されます。固定金額と Staking Day はどちらもプライバシーのために存在します。これにより、ある人のステークを別の人のものと区別しにくくなります。

## ステップ5：自分の状況を確認する

### 自分のボンド

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

これは、ステーキングから2日後のブロック36,490での応答です。

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

この呼び出しにパラメーターはありません。アクティブなボンドを、各ボンドが支援するファイナライザーのキーごとにまとめて返し、アンステーキングが完了して出金可能なボンドも返します。各ボンドには、ステーク額（`initial_val`）、現在価値（`latest_val`）、作成したトランザクションとブロック高が表示されます。報酬はボンド自体に加算されます。ブロック36,490までに、1,000,000 zatoshi の各ボンドは1,003,451に増加していました。

**Edit Stake ウィンドウでは、各ボンドが10倍大きく表示されます。** この実行では、各0.01 cTAZボンドが各行で0.100 cTAZと表示され、報酬開始後は0.1003536 cTAZと表示されました。一方、行の上にある合計（0.020 cTAZ、その後0.02007 cTAZ）はRPCと一致していました。合計とRPCを基準にしてください。

同じウィンドウでは、ファイナリティ開始前後とも、ファイナライザーの横に警告三角形が表示されました。ソースでは、この三角形はアプリがそのファイナライザーをオンラインと数えていないことを意味し、オンラインなら代わりにWi-Fiアイコンが表示されます（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)）。それでもボンドは報酬を獲得しました。

### ファイナライザー

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

リリースノートによると、これは自分のノードが投票プロセスのどこにいるか、また各ファイナライザーについて、ノードが最後にいつそのファイナライザーから情報を受け取ったか、その投票状況を報告します。

ブロック36,288以前は、すべてのフィールドがゼロで、リストは空です。これはブロック33,354での応答です。

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

ファイナリティが始まると、リストにはロスター上のファイナライザーが入ります。ブロック36,490では12名が含まれ、その中に ZecHub の `2941ef23...` があり、ロスター上限の12と一致していました。以下は、その応答の先頭部分で、最初のエントリーの後で切っています。

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

数分後、アプリの右側パネルには「Finalizers (23)」と表示されました。

### Linux と macOS では

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) はこの呼び出しを `curl` 形式で示しています。他の呼び出しではメソッド名を変更してください。この形式は、このガイドでは実行していません。

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Linux では、リリースノートによると、アプリでコピー＆ペーストを機能させる前に `xclip` をインストールする必要がある可能性があります。

### 注意すべきRPC名

バージョン14のリリースノートでは、オブジェクトを受け取る `wallet_staking_action` というステーキング呼び出しを説明しています。バージョン14のソースコードにはその名前のメソッドはなく、この実行ではノードは次のように応答しました。

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

登録されているステーキングメソッドは [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420) であり、リクエストをJSONとして保持する1つの文字列を受け取り、ファイナライザーはその `zfinv1` 識別情報で指定します（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)）。このガイドでは試していません。

## アンステーキングと出金

ボンドは作成した当日に取り消すことはできません。開始から終了までに3回の Staking Day が必要です。1回目にステークし、後の回にアンステークし、3回目に出金します。リリースノートには、1つのボンドは同じ Staking Day に2つのステーキング操作を行えないともあります。

*このガイドでは実行していません。バージョン14のリリースノートによると、アンステーキングするには、**Edit Stake** を押し、Staked Bonds リストからボンドを選び、チェーンリンクアイコンをクリックします。後の Staking Day に出金するには、**Edit Stake** を押し、Withdrawable Bonds リストからボンドを選び、金銭アイコンをクリックします。ボンドを別のファイナライザーに移すことは、ノートではリターゲティングと呼ばれ、いつでも可能です。*

## ネットワークを確認する場所

[Crosslink tab on ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) は、「このネットワークでのステーキングは ZEC を動かしません」という注意書きの下に、ツールを1か所に集めています。

- ノード不要のホスト型：[Staker Space](https://crosslink.staker.space/)。これは高さ、マイナー、ソリューションレート、Staking Dayのカウントダウン、ファイナリティを備えた「現在の cTAZ テストネットのライブダッシュボード」です。もう1つは [ctaz.cash](https://ctaz.cash/) で、マイニング生産量、ファイナライザーロスター、ピア、ステーキングアドレス名の請求を表示します。
- 自分のマシン上：`zcash-explorer`。その `/live/crosslink` ページには有効化、ファイナリティ遅延、ロスター、ステーキングポジションが表示されます。もう1つは `crosslink_indexer` で、Crosslink ノードのSQLiteインデックスです。

## よくある間違い

**ブロック高ではなく時計を基準に計画すること。** Staking Day はブロック数で数えられます。カレンダーではなく、ダッシュボードのカウントダウンを見てください。

**ウィンドウ終了直前にステーキングすること。** ルールはトランザクションを含むブロックに対してチェックされます（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)）。そのため、ステークは送信されるだけでなく、ウィンドウが閉じる前にマイニングされなければなりません。

**ステークをマイニングで得られると期待すること。** Intel Core i5-8350U の4スレッドCPUマイナーは、10月8日から9日の間にブロックを1つも見つけませんでした。最初のcTAZは、フォーセットまたは別の参加者から得てください。

**何も起きなかったように見えて再度クリックすること。** 金額をクリックするたびに新しいボンドが作られます。先にウォレット履歴または `wallet_staking_positions` を確認してください。

**再起動後に慌てること。** ウォレットの再スキャンが完了するまで、残高とステークはゼロと表示されます。Wallet Sync の完了を待ってください。

**cTAZをただの遊び金、または秘密を無害なものとして扱うこと。** cTAZはテストコインですが、獲得したcTAZが実際の ZEC の取り分を決めます。`secret.seed` はウォレットと同じように守ってください。

**古い説明を読むこと。** リリースノートには、新しいルールと並んで以前のシーズンからの文面が残っています。自分のノードの動作と矛盾する場合は、ノードが正しいです。

## 関連ページ

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - このネットワークがテストする設計
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslink の背後にあるチーム
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - チェックサムが証明することと証明しないこと
- [Zebra Full Node](/zcash-tech/zebra-full-node) - Feature Net アプリの基盤となるノード
- [Zcash Testnet](/using-zcash/testnet) - 通常の Zcash テストネット。これは別のネットワークです

## 情報源

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)、Shielded Labs、2026年10月1日
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)、Shielded Labs、2026年4月2日
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)、Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/)、Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/)、Shielded Labs

---

*このページの手順は、2026年10月8日から10日にかけて、Feature Net バージョン14を Windows 11（バージョン10.0.26200.9550）で実行したものです。リリースノートまたはソースコードを引用する記述は、それらから取られています。「not run」と記されたものは試していません。*

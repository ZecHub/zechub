<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Crosslink Feature Netに参加する

## 要約

- Feature Netは、Zcashのプルーフ・オブ・ワークにステーキングを追加する、提案中のファイナリティ層である[Crosslink](/zcash-tech/crosslink-protocol)のための、Shielded Labsの公開テストネットワークです。
- このネットワークはテストコインのcTAZで動作します。ここで何をしても、メインネットのZECが移動したり危険にさらされたりすることはありません。
- 1つのデスクトップアプリが、ノード（node）、マイナー（miner）、ウォレット（wallet）、ファイナライザー（finalizer）のすべてを担います。デフォルトでcTAZをマイニングし、フォーセット（faucet）ボタンも備えています。
- ステーキング、アンステーキング、出金は、3日に1度ある「ステーキングデイ」の間にのみ行えます。逃した場合は、次のステーキングデイまで待つ必要があります。
- ステーキングするには、ファイナライザーのIDを貼り付け、金額をクリックします。このガイドでは、例としてZecHubのファイナライザーを使用します。
- 2つのRPC呼び出しで現在の状況を確認できます。`wallet_staking_positions`と`get_tfl_recency_status`です。

*Feature Netバージョン14をWindows 11（バージョン10.0.26200.9550）で使用し、2026年10月8日から10日にテストしました。このソフトウェアはプロトタイプであり、リリースごとに変更されます。表示内容がこのページと異なる場合は、ご自身の実行結果を信頼し、PRを作成してください。*

## Feature Netとは

Crosslinkは提案であり、現時点ではZcashの一部ではありません。Shielded Labsの[Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/)には、メインネットに到達する前に「標準のZcashガバナンス（governance）プロセスを通過する必要がある」と記されています。[のCrosslink Protocol](/zcash-tech/crosslink-protocol)ページでは設計を説明しています。

実際のユーザーとともに設計を試すため、Shielded Labsは[インセンティブ付きフィーチャーネット](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)と呼ぶもの、すなわち「一連のインセンティブ付きテストネット」を運用しています。ネットワークには3つの役割があり、デスクトップアプリはそのすべてを担えます。

| 役割 | 内容 |
|---|---|
| マイナー | 現在のZcashと同様に、プルーフ・オブ・ワークのブロック（block）を生成します |
| ステーカー | cTAZを委任ボンド（bond）にロックし、ファイナライザーを指定します |
| ファイナライザー | ブロックを確定するために投票します。投票力は委任されたステークです |

その背後にあるリポジトリは、インストール前に読むべき免責事項から始まります。これは「プロダクションエンジニアリングを示すためではなく、アイデアを実証するために存在する」もので、「本番環境対応のコードではない」とされています（[README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)）。それを許容できるマシンで実行してください。

### バージョン14で変更されたこと

[バージョン14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)は2026年10月1日に公開されました。このネットワークは通常のプルーフ・オブ・ワークとして始まり、Crosslinkを3段階で有効にします（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)。[ctaz.cash](https://ctaz.cash/v14)にも表示されています）。

| ブロック | 起きること |
|---|---|
| 20,736 | ステーキングが開始されます |
| 34,560 | 最初のファイナライザー名簿が、チェーン上のステークから作成されます |
| 36,288 | BFTファイナリティが開始し、同時にステーキング報酬も始まります |

ステーキング報酬は、これらのうち最後のブロックから始まります。それ以前に作成されたボンドは、それまでは何も獲得しません（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)）。

同じリリースでは、アクティブな名簿をステークが最も多い12人のファイナライザーに絞りました（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)）。また、リリースノートの表現では、彼らにコミッションを与えました。「ブロック内のすべてのPoS報酬の10%がこれらのコミッションに割り当てられ、90%はすべてのステーキングボンドに分配されます」。

### cTAZと実際のZEC

cTAZ（「Crosslink TAZ」）は、Feature Netのテストコインです。ステーキングするのはcTAZであり、ZECではありません。

実際のZECが登場するのは最後だけです。Shielded Labsはフィーチャーネット用に500 [ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)を確保しており、[release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)では、「各参加者がマイニングまたはステーキングを通じて獲得したcTAZの量のみに基づき、比例配分で」支払われると記されています。結果として、次の2点があります。

- **フォーセットのコインはカウントされません。** フォーセットまたは他者から受け取ったcTAZは、ウォレットに置いておいても何も獲得しません。カウントされるのは、マイニングとステーキングによるブロック報酬だけです。
- **支払いは自動ではなく請求します。** Shielded Labsは各ラウンドを[forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)で発表します。ラウンド2では、参加者に対し、2026年10月4日までにウォレットのビューイングキー（viewing key）とメインネットアドレスを送るよう求めました（[post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)）。バージョン14が動作するネットワーク、すなわちこのガイドで参加するネットワークは、ラウンド3として発表されました（[post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)）。

## 始める前に

- **稼働させたままにできるコンピューター。** リリースにはWindows、macOS、Ubuntu、Arch Linux向けのビルドがあります。このガイドは、Intel Core i5-8350Uプロセッサーを搭載したPCのWindowsで実行しました。
- **ステーキングデイ。** 何かを計画する前に、次回の開始時刻を確認してください。[Staker Space's dashboard](https://crosslink.staker.space/)でカウントダウンを確認できます。
- **それ以外は不要です。** ZECも、アカウントも、登録も不要です。

## ステップ1：アプリをダウンロードしてファイルを確認する

1. [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)を開き、**Assets**までスクロールします。
2. お使いのシステム向けのファイルをダウンロードします。Windowsでは`zebrad_v14_win32.exe`です。
3. ファイルのSHA-256を、GitHubがそのアセットの横に表示するダイジェストと比較します。

Windowsでは、PowerShellで次を実行します。

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

そのファイルについてGitHubが表示するダイジェストは`1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`です。16進数には大文字と小文字の区別がないため、上記の大文字でも問題ありません。目視ではなくシェルに比較させるには、次を実行します。

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

この確認にどの程度の価値があるかを理解してください。リリースには署名がないため、ハッシュが一致しても、ダウンロードが完全であり、GitHubが配信しているファイルであることしか分かりません。誰がビルドしたかは分かりません。[Verifying Zcash Releases](/guides/verifying-zcash-releases)では違いを説明しています。

## ステップ2：ノードを起動して同期させる

起動メッセージが画面に残るよう、ターミナルからアプリを起動します。「管理者として実行」で開いたものではなく、通常のPowerShellウィンドウを使用してください。これは署名されていないプロトタイプソフトウェアであり、管理者権限は必要ありません。

```powershell
.\zebrad_v14_win32.exe
```

「Zcash Crosslink Visualizer」というタイトルのウィンドウが開きます。左側には**Your Wallet**と**Faucet Wallet**タブがあるウォレット、中ほどにはチェーン、右側にはファイナライザーの一覧が表示されます。ターミナルにはノードのログが引き続き出力されます。ネットワークを使用している間は、両方を開いたままにしてください。

リリースノートには、[によるWindowsのインストール動画](https://www.youtube.com/watch?v=cO-5Oa4B1Tk)へのリンクがあります。

リリースノートによると、アプリはキャッシュフォルダーにデータを保存します。Windowsでは`%LOCALAPPDATA%\zebra`、Linuxでは`~/.cache/zebra`、macOSでは`~/Library/Caches/zebra`です。

**秘密は自分だけのものにしてください。** そのフォルダーには`secret.seed`という名前のファイルがあります。アプリは初回起動時にこれを作成し（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)）、そこからウォレットとファイナライザーIDを導出します（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)）。アプリには、同じ秘密をクリップボードへ置く**Copy Seed**ボタンもあります。いずれかを持つ人は、あなたのウォレットを操作できます。チャット、フォーラム投稿、スクリーンショットに絶対に貼り付けないでください。

### 同期済みかどうかを確認する方法

リリースノートには、「ネットワーク先端への同期の近さを監視する機能は組み込まれていない」とあります。バージョン14にはある程度の機能があります。ウィンドウ上部の**Network Info**ドロップダウンには、PoW Height、Wallet Sync、Blocks Behind Known PoWの行があります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)）。自分の高さを、[Staker Space](https://crosslink.staker.space/)または[ctaz.cash](https://ctaz.cash/)の高さと比較してください。

ノードはRPC経由でも応答します。

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

このビルドでは、RPCポート`127.0.0.1:8232`はデフォルトで開いており、パスワードも必要ありません（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)）。自分のマシン上でのみ待ち受け、そのマシン上で動作するものは何でも呼び出せます。

この実行では、ブロック0から約ブロック28,400の先端までの最初の同期に、およそ50分かかりました。

**再起動後は、しばらく残高がゼロと表示されます。** アプリは起動するたびに、`secret.seed`からウォレットを再構築し、ブロック0からチェーンを再スキャンします（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)）。スキャンが自分のトランザクションに到達するまで、残高とステークは0と表示されます。この実行では、再起動から約15分後に戻りました。フォーセットのウォレットも同様に再スキャンされ（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)）、スキャン中はFaucet Walletタブに非常に大きな残高が表示されました。Wallet Syncが完了するまで、どちらも無視してください。

## ステップ3：cTAZを入手する

### マイニングする

リリースノートによると、アプリは同期後、自己のウォレット宛てにCPUマイニングを開始します。何かを有効にする必要はありません。マイニングしたコインは、自己のウォレットの公開型アドレス（transparent address）へ送られます（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)）。

ブロックを見つけられるかどうかは別の問題です。ノートには、「より速くマイニングする他者に負ける可能性があるため、成功は保証されない」と警告されています。デフォルトでは、組み込みマイナーはCPUスレッドを1つ使用します（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)）。

より多くのスレッドを使用するには、アプリを起動する前に、同じPowerShellウィンドウで環境変数を設定します（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)）。この実行では4つ使用しました。

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

この変数は、そのウィンドウが開いている間だけ有効です。設定すると、Windowsのプロセッサーカウンターでは、ノードが論理プロセッサー1基分の割合として、4～5基分の時間を使用していることが示されました。

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

結果として、10月8日早朝から10月9日午後にかけて4スレッドでマイニングしたIntel Core i5-8350Uは、ブロックを1つも見つけませんでした。

### またはフォーセットを使用する

アプリ右下には**Receive cTAZ**ボタンがあります。バージョン14のソースでは、1回押すとフォーセットのウォレットから自分のウォレットへ0.5 cTAZが送られます（[amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073)、[send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)）。フォーセットはアプリのすべてのコピーに含まれる単一のウォレットであり（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)）、**Faucet Wallet**タブにはその残高が表示されます。

フォーセットがシールドされたコインで5.01 cTAZを超えていない限り、ボタンは無効です（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)）。このタブはフォーセットがマイニングしたコインも数えますが、それらは10 cTAZちょうどに手数料を加えた単位でのみシールドされます（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)）。そのため、タブに十分な額が表示されていても、ボタンはグレーのままの場合があります。この実行では、タブに14.74695 cTAZと表示されていたにもかかわらず、10月8日と9日はグレーのままで、ホバーすると「The faucet is mining more funds.」と表示されました。

**ボタンがグレーの場合は、自分のノードに問い合わせてください。** ノードには、ボタンの5.01 cTAZルールを適用しないフォーセット要求メソッド`requestfaucetdonation`があります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)）。`YOUR_ADDRESS`の代わりに自分のアドレスを入力します（下記の`wallet_spendable_funds`の`address`フィールドです）。

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

この応答は、送信済みではなく、要求がキューに入ったことを意味します。この実行では、フォーセットの0.5 cTAZはブロック33,306でマイニングされ、ブロック33,322で使用可能になりました。フォーセットは共有されており、最初の要求が保留中は同じアドレスへの2回目の要求が拒否されるため、要求は1回だけにしてください（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)）。

### または別の参加者に頼む

ネットワーク上の誰でも、アプリの**Send**ボタンを使ってcTAZを送れます。この実行では、別の参加者から31 cTAZが送られました。「Received」として届き、ノートには「send from user wallet」と表示されました。これはアプリ自身のSendが付加するノートです（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)）。[forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)で頼み、渡すのはアドレスだけにしてください。

フォーセットのコインと贈与されたコインだけでも、ステーキングを学ぶには十分です。これらはZECの報酬にはカウントされません。

### 使用可能な残高を確認する

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

これは、フォーセットの0.5 cTAZが到着した後の応答です。アドレスは短縮しています。

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

金額の単位はザトシです。100,000,000ザトシで1 cTAZになります。シールドされたコインは、使用可能な残高に含まれるまでに3回の承認が必要です（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)）。フォーセットや他の参加者からのコインは`spendable_zats`に入ります。マイニングしたコインは公開型なので、`unshielded_zats`に入ります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)）。

この実行で2回目のステークを行った1ブロック後、残りの残高は`pending_zats`の下に表示されました。数ブロック後には再び使用可能になりました。

## ステップ4：ファイナライザーにステーキングする

### ステーキングデイを待つ

ステーキング、アンステーキング、出金が受け付けられるのは、次の期間だけです。

```text
block height mod 10,368 < 3,456
```

これは、10,368ブロックごとの開始時から3,456ブロックのウィンドウです。ネットワークのブロック目標時間25秒では、3日に1日となります（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)）。バージョン14の最初のウィンドウは、ブロック20,736、31,104、41,472、51,840で開始します。

リリースノートによると、アプリは各ステーキングデイの開始と終了を通知します。この実行では、ブロック一覧にブロック34,559と34,560の間で、赤い「* STAKING DAY END *」行が表示されました。

**リリースノートには2つの異なる記述があります。** 変更一覧には「ステーキングデイは約1日、ステーキングサイクルは約3日」とあり、これはコードと一致します。下の方にあるSeason 1から引き継がれた節には、ステーキングデイは150ブロックごとに始まり70ブロック続くと、今も記されています。前者に従ってください。上記の終了行は、最初のルールでウィンドウが閉じる位置にあります（34,560 mod 10,368 = 3,456）。2番目のルールでは、ブロック34,560はウィンドウ内に入るはずです。

### ファイナライザーを選ぶ

ファイナライザーは、`zfinv1`で始まる文字列であるIDによって指定されます。ZecHubは、自身が運用するファイナライザーのIDを[`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json)で公開しています。

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

信頼できるソースからIDをコピーしてください。リリースノートによると、アプリも右側のパネルにファイナライザーを一覧表示し、それぞれの左側にコピーアイコンを表示します。

ステーキング後、ウォレット履歴とRPCでは、IDではなく16進キーでファイナライザーが示されます。ZecHubのファイナライザーの場合、そのキーは`2941ef23...266aae8f`です。

信頼できるファイナライザーを選んでください。この設計に自動スラッシングはありませんが、「指定されたファイナライザーに委任されたすべてのステークを焼却する、ユーザーが協調したハードフォーク」を可能にしています（[Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)）。

選択は誰が投票するかも決めます。アクティブな各ボンドは、ステーキング報酬の配分を獲得します。そのファイナライザーが名簿上の12人に含まれる場合、その配分の10分の1がコミッションとしてファイナライザーに渡ります。12人以外のファイナライザーを指定したボンドは配分全体を保持しますが、そのファイナライザーは投票しません（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)）。

### ステーキングする

1. ファイナライザーIDをコピーします。
2. **Your Wallet**タブで、**Stake**を押します。
3. **Paste Identity**を押します。ボタン上の行がIDの先頭と末尾の文字に変わります。ZecHubの場合は`[zfinv1j6..YWyzp4YN]`です。続ける前に確認してください。
4. 金額をクリックします。金額は固定の刻みで、最小額は0.01 cTAZです。残高でカバーできる金額だけが点灯します。0.5 cTAZでは、+0.01 cTAZと+0.1 cTAZが点灯しました。

**確認を求められることはなく、何も起きていないように見えます。** この実行では、テスターの言葉を借りると、「1回クリックしても何も起きず、グレーになってからまた点灯しただけでした」。ステークは通っていました。ウォレット履歴には「Staked @ 33334 to 2941ef23..266aae8f」と表示され、手数料は0.00015 cTAZ、ウォレットには0.010 cTAZ Stakedと表示されました。数分後の2回目のステークでは、ブロック33,348で2つ目のボンドが作成されました。

各ステークは、それぞれ独自の委任ボンドを作成します。固定金額とステーキングデイはいずれもプライバシーのために存在します。これらにより、ある人のステークを別の人のものと見分けにくくなります。

## ステップ5: 自分のポジションを確認する

### 自分のボンド

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

これは、ステーキングから2日後のブロック36,490での応答でした。

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

この呼び出しにパラメータは必要ありません。各ボンドが支援するファイナライザー（finalizer）のキーごとにグループ化された有効なボンドと、アンステーキングが完了して引き出せるボンドが返されます。各ボンドには、ステーキングされた額（`initial_val`）、現在の値（`latest_val`）、および作成元のトランザクションとブロック高が表示されます。報酬はボンド自体に加算されます。ブロック36,490までに、1,000,000 zatoshisの各ボンドは1,003,451まで増加していました。

**Edit Stakeウィンドウでは、各ボンドが10倍大きく表示されます。** この実行では、各0.01 cTAZボンドは単独の行で0.100 cTAZと表示され、報酬が始まると0.1003536 cTAZと表示されました。一方、行の上にある合計（0.020 cTAZ、後に0.02007 cTAZ）はRPCと一致していました。合計とRPCを基準にしてください。

同じウィンドウでは、ファイナリティが始まる前後とも、ファイナライザーの横に警告三角形が表示されました。ソースでは、この三角形はアプリがそのファイナライザーをオンラインと見なしていないことを意味し、オンラインの場合は代わりにWi-Fiアイコンが表示されます（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)）。それでもボンドは報酬を獲得していました。

### ファイナライザー

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

リリースノートによると、これはノードが投票プロセスのどこにいるかと、各ファイナライザーについてノードが最後にいつ通信を受け取り、どのように投票してきたかを報告します。

ブロック36,288より前は、すべてのフィールドが0で、リストは空です。これはブロック33,354での応答でした。

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

ファイナリティ開始後、リストにはロスター上のファイナライザーが表示されます。ブロック36,490では12件があり、そのうちZecHubの`2941ef23...`も含まれていました。これはロスター上限の12と一致します。以下は、その応答の先頭部分を最初のエントリの後で切り取ったものです。

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

### LinuxとmacOSについて

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610)には、`curl`形式での呼び出しが示されています。他の呼び出しについては、メソッド名を変更してください。この形式は本ガイドでは実行していません。

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Linuxでは、リリースノートにより、アプリでコピー＆ペーストを機能させるには、おそらく`xclip`を事前にインストールする必要があるとされています。

### 注意すべきRPC名

バージョン14のリリースノートでは、オブジェクトを受け取る`wallet_staking_action`というステーキング呼び出しが説明されています。バージョン14のソースコードにはその名前のメソッドはなく、この実行ではノードは次のように応答しました。

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

登録されているステーキングメソッドは[`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420)です。これはリクエストをJSONとして保持する1つの文字列を受け取り、ファイナライザーは`zfinv1`アイデンティティで指定します（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)）。本ガイドでは試していません。

## アンステークと引き出し

ボンドは作成したその日に取り消すことはできません。開始から完了までに3つのステーキング日が必要です。1つ目でステークし、後のステーキング日でアンステークし、3つ目で引き出します。リリースノートでは、1つのボンドは同じステーキング日に2つのステーキング操作を実行できないことも追記されています。

*本ガイドでは実行していません。バージョン14のリリースノートによると、*アンステークするには、**Edit Stake**を押し、Staked Bondsリストからボンドを選んでチェーンリンクアイコンをクリックします。後のステーキング日に引き出すには、**Edit Stake**を押し、Withdrawable Bondsリストからボンドを選んでお金のアイコンをクリックします。リリースノートでリターゲティングと呼ばれる、ボンドを別のファイナライザーへ移す操作はいつでも許可されています。

## ネットワークを確認する場所

[Crosslinkタブは、ZecHub Tools](https://zechub.wiki/tools?tool=crosslink)において、「このネットワークでのステーキングではZECは移動しません」という通知の下にツールを集約しています。

- ノード不要のホスト型: [Staker Space](https://crosslink.staker.space/)。これはブロック高、マイナー、ソリューションレート、ステーキング日のカウントダウン、ファイナリティを表示する「現在のcTAZテストネット向けライブダッシュボード」です。[ctaz.cash](https://ctaz.cash/)では、マイニング生産量、ファイナライザーのロスター、ピア、ステーキングアドレス名の請求を確認できます。
- 自分のマシン上: `zcash-explorer`。その`/live/crosslink`ページでは、アクティベーション、ファイナリティ遅延、ロスター、ステーキングポジションを表示します。もう1つは`crosslink_indexer`で、CrosslinkノードのSQLiteインデックスです。

## よくある間違い

**ブロック高ではなく時計を基準に計画すること。** ステーキング日はブロック単位で数えられます。カレンダーではなく、ダッシュボードのカウントダウンを確認してください。

**ウィンドウ終了直前にステーキングすること。** ルールはトランザクションを含むブロックに対して確認されます（[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)）。そのため、ステークは単に送信するだけでなく、ウィンドウが閉じる前にマイニングされなければなりません。

**自分のステークをマイニングできると期待すること。** Intel Core i5-8350Uの4スレッドCPUマイナーでは、10月8日から9日の間にブロックは見つかりませんでした。最初のcTAZはフォーセットまたは別の参加者から入手してください。

**何も起きなかったように見えて、もう一度クリックすること。** 金額をクリックするたびに新しいボンドが作成されます。まずウォレット履歴または`wallet_staking_positions`を確認してください。

**再起動後に慌てること。** ウォレットの再スキャンが完了するまで、残高とステークは0と表示されます。Wallet Syncが完了するまで待ってください。

**cTAZを遊びのお金、またはシークレットを無害なものとして扱うこと。** cTAZはテストコインですが、獲得したcTAZは実際のZECにおける自分の取り分を決定します。`secret.seed`はウォレットと同じように保護してください。

**古い手順を読むこと。** リリースノートには、新しいルールの隣に以前のシーズンからの文章が残っています。ノードの動作と矛盾する場合は、ノードが正しいです。

## 関連ページ

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - このネットワークがテストする設計
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslinkの背後にいるチーム
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - チェックサムが証明することと証明しないこと
- [Zebra Full Node](/zcash-tech/zebra-full-node) - Feature Netアプリの基盤となるノード
- [Zcash Testnet](/using-zcash/testnet) - 別ネットワークである通常のZcashテストネットワーク

## 情報源

- [バージョン14リリースノート](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)、Shielded Labs、2026年10月1日
- [Crosslink: インセンティブ付きFeature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)、Shielded Labs、2026年4月2日
- [Crosslink: インセンティブ付きFeature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)、Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/)、Shielded Labs
- [Crosslinkブック](https://shieldedlabs.github.io/crosslink_book/)、Shielded Labs

---

*このページの手順は、2026年10月8日から10日にかけて、Feature Netバージョン14をWindows 11（バージョン10.0.26200.9550）で実行したものです。リリースノートまたはソースコードを引用する記述は、それらから引用されています。「not run」と記されたものは試していません。*

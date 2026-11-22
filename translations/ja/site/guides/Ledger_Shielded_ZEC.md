<a href="https://github.com/zechub/zechub/edit/main/site/guides/Ledger_Shielded_ZEC.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ledger シールドされた ZEC ユーザーガイド

> Ledger Wallet Desktop で、Ledger ハードウェアウォレットを使ってプライベートな（シールドされた）ZEC を保有、受け取り、送信できます。

## 要約

* 2026年9月23日以降、Ledger Wallet Desktop はシールドされた（shielded）ZEC に対応しています。1つの Zcash アカウントには、公開型残高と Ironwood プール内のプライベート残高があります。
* 現時点ではデスクトップのみ対応しています。モバイル対応は「近日公開」と発表されています。
* Nano S Plus、Nano X、Stax または Flex（初代 Nano S ではありません）、Ledger Wallet Desktop 4.21以降、および最新の Zcash アプリが必要です。
* **シールドされた機能を有効化**を1回クリックします。Ledger はビューイングキー（viewing key）をエクスポートするため、デスクトップアプリはプライベート資金を見つけられます。支出鍵がデバイスから外部へ出ることはありません。
* 可能な場合は、プライベートアドレス（u1...）で受け取ってください。公開型残高から ZEC をプライベート残高へ移動することもできますが、両者が関連付けられます。
* すべての送金は Ledger の画面で確認し、署名します。そこでアドレスを1文字ずつ確認してください。

## 基本説明

Zcashには2種類の残高があります。公開型ZEC（t1アドレス）はBitcoinのように機能します。金額とアドレスは公開されています。シールドされたZECはシールドされたプール内にあり、送信者、受信者、金額はオンチェーンで暗号化されています。

Ledger は支出鍵をハードウェアデバイス内に保持します。非公開残高を表示するには、Ledger Wallet Desktop には統合ビューイングキー（Unified Full Viewing Key、UFVK）が必要です。デバイスはこれを一度エクスポートし、デスクトップアプリはそれを使用してブロックチェーン上のシールドされたノートをスキャンします。ビューイングキーはシールドされた履歴を確認できますが、送金には使用できないため、非公開情報として扱ってください。

以下の手順では、Zcashアプリのインストール、アカウントの追加、非公開残高の有効化、受け取り、公開型ZECのシールド化、非公開残高からの送信について説明します。

## 概要

2026年9月23日、Ledger はネイティブのシールドされた ZEC を Ledger Wallet Desktop に追加しました。1つの Zcash アカウントで、公開型残高と、Zcash の Ironwood プール内のプライベート残高を保持できるようになりました。秘密鍵は Ledger に保管されたままで、すべてのトランザクションはデバイス上で確認・署名されます。

**デスクトップ版のみです。** Ledger の発表によると、シールドされた ZEC は「Ledger Wallet Desktop でのみ利用可能です。現時点ではモバイル対応は利用できませんが、近日中に提供予定です」とされています。デスクトップアプリにも同じ注意書きが表示されます。2026年10月15日に確認しました。

## 準備

- Zcash アプリを実行できる Ledger デバイス：Nano S Plus、Nano X、Stax または Flex。現行の Zcash アプリは、初代 Nano S 向けには作られていません。
- [ledger.com](https://www.ledger.com) からのみダウンロードした、Ledger Wallet Desktop 4.21以降。このガイドではバージョン4.24.0を使用しました。
- Ledger 上の最新 Zcash アプリ（本ガイド執筆時は3.9.4）。
- テスト用の少額の ZEC。以下のすべての手順は、メインネットで0.001 ZEC を使用して実行しました。各トランザクションには少額のネットワーク手数料がかかります（テストでは0.00015 ZEC）。
- 24単語のリカバリーフレーズは紙に保管してください。絶対にコンピューターへ入力したり、共有したりしないでください。

## ステップバイステップガイド（Ledger Wallet Desktop）

**1. Zcash アプリをインストールまたは更新する**
- Ledger Wallet を開き、Ledger を接続してロックを解除し、**My Ledger** を開きます。デバイスで接続を許可します。
- アプリカタログで **Zcash** を検索し、**Install** をクリックします。すでにインストール済みの場合は **Update** をクリックします。
- Ledger で Zcash アプリを開きます。画面には「Zcash app is ready」と表示されます。右へスクロールして **App info** を開き、バージョンを確認します。

**2. Zcash アカウントを追加する**
- Ledger Wallet で **Add account** を選択します。**Select asset** で Zcash を検索し、ラップドトークンである Binance-Peg Zcash Token ではなく、**Zcash (ZEC)** を選択します。
- Ledger で Zcash アプリを開いた状態で、Ledger Wallet がアカウントを検出します。**Select the accounts you want to add** の下でチェックを入れ、**Confirm** をクリックします。
- アカウントページには、**Available balance**、**Transparent balance**、**Private balance**、および **Enable shielded** ボタンが表示されます。

![Zcash account in Ledger Wallet Desktop showing the desktop-only notice, transparent and private balances, and the Enable shielded button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. プライベート残高を有効化する**
- **シールドされた残高を有効化**をクリックします。**Zcash プライベート残高を有効化**ウィンドウには、Birthday、UFVK、デバイス、確認の4つのステップがあります。
- **Birthday:** 新しいアカウントの場合、バースデーの高さは今日の日付のままにします。ブロック0からのスキャンには長時間かかる可能性があるため、「このアカウントは過去にシールドされたZECを受け取りました」は、それが事実だと分かっている場合にのみチェックします。
- **UFVKとデバイス:** Ledger Walletは、LedgerにUnified Full Viewing Key（UFVK）をエクスポートするよう求めます。デバイス上の画面を読み、承認します。「デバイス接続が失われました」と表示された場合は、Zcashアプリが開いていることを確認し、速やかに承認してから**再試行**をクリックします。
- **UFVKが正常にインポートされました**と表示されたら、**同期を開始**をクリックします。同期が完了すると、ボタンは「最終同期」時刻を含む**残高を更新**に変わります。
- ビューイングキー（viewing key）はコンピューター上に残ります。シールドされた資金を見つけることはできますが、使用することはできません。

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. ZEC を受け取り、Ledger で両方のアドレスを確認する**
- **Receive** をクリックし、Zcash アカウントを選択します。Ledger Wallet には、**Address for Zcash 1**（公開型、t1で始まる）と、**Private address for Zcash 1**（u1で始まる）が表示されます。以前のアドレスも引き続き有効です。
- Ledger には「Verify Zcash addresses」と表示され、続いて2ページにわたる **Private address**、その後に **Public Address** が表示されます。いずれかのアドレスを共有する前に、すべての文字を画面と照合し、デバイスで確認します。
- プライベートアドレスを優先し、送信者が他の方法に対応していない場合にのみ公開型アドレスを使用してください。

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. 公開型 ZEC をプライベート残高へ移動する**
- **Send** をクリックします。**Self transfer** で **Send to private balance** を選択します。
- 金額を入力するか、25%、50%、75%、または **Max** を使用します。ネットワーク手数料を確認し、**Review** をクリックします。
- Ledger で次の画面を順に確認します：「Review transaction to send ZEC」、「Transfer from public to private address」、金額、2ページにわたる出力先アドレス、手数料、有効期限高度。出力先アドレスがステップ4のプライベートアドレスと一致することを確認してから、**Sign transaction** で両方のボタンを押します。
- Ledger Wallet に **Transaction sent** と表示されます。トランザクション詳細では、タイプが **Private (Ironwood)** と表示されます。
- Ledger Wallet は、自己送金によりシールドされた資金と公開型アドレスが関連付けられると説明しています。プライベートアドレスへ直接受け取れば、それらの関連付けは行われません。

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- トランザクションが承認されると、公開型残高は減少し、プライベート残高は増加します。新たにシールドされた資金は、使用に十分な承認数を得るまで「maturing」と表示されます。

![Zcash account after shielding: transparent balance reduced, private balance increased and shown as maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. プライベート残高から ZEC を送信する**
- プライベート残高が使用可能になったら、**Send** をクリックし、**Transfer from** を **Private balance** に設定します。
- 受取人のアドレスを貼り付け、金額を入力します。受取人だけが読める、最大512バイトの暗号化された **Memo (optional)** を追加できます。
- Ledger で受取人、金額、手数料を確認してから、**Sign transaction** で両方のボタンを押します。

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## 知っておくとよいこと

- Ledger におけるシールドされた ZEC は、現時点ではデスクトップ版のみです（2026年10月15日確認）。
- Ledger Wallet のプライベート残高は Ironwood プールを使用します。
- Ledger によると、トランザクション履歴への読み取り専用アクセスを税務アドバイザーと共有できます。ビューイングキーを持つ人はシールドされた履歴を閲覧できるため、意図している場合にのみ共有してください。
- 本ガイドのデバイス画面は、Ledger の Speculos エミュレーター（Nano S Plus）で Zcash アプリ3.9.4を実行し、Zcash メインネット上で Ledger Wallet Desktop 4.24.0に接続してキャプチャしました。物理的な Ledger でも同じアプリが実行され、同じ画面が表示されます。

## 追加ヘルプ

- [Ledger Walletの新機能：ネイティブのシールドされた Zcash サポート](https://www.ledger.com/blog-native-shielded-zcash-support)（Ledger の発表）
- [Ledger ヘルプセンター](https://support.ledger.com)
- [ZecHub ウォレットページ](/using-zcash/wallets)
- ZecHub の [シールドされたプール](/using-zcash/shielded-pools) および [ビューイングキー](/zcash-tech/viewing-keys)
- 別のハードウェアウォレットの選択肢：[Keystone Zashi ユーザーガイド](/guides/keystone-zashi)

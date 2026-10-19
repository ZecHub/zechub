# Ledger シールド ZEC ユーザーガイド

2026年9月23日、Ledger は Ledger Wallet Desktop にネイティブのシールド ZEC を追加しました。現在、1つの Zcash アカウントで、透明な残高と Zcash の Ironwood プール内のプライベート残高を保持できます。秘密鍵は Ledger 上に保持され、すべてのトランザクションはデバイス上で確認・署名されます。

**デスクトップ版のみ。** Ledger の発表によると、シールド ZEC は「Ledger Wallet Desktop でのみ利用可能です。モバイル対応は現在利用できませんが、まもなく提供予定です」とされています。デスクトップアプリにも同じ注意書きが表示されます。2026年10月15日に確認しました。

## 準備

- Zcash アプリを実行できる Ledger デバイス：Nano S Plus、Nano X、Stax または Flex。現在の Zcash アプリは、初代 Nano S 向けには作られていません。
- [ledger.com](https://www.ledger.com) からのみダウンロードした Ledger Wallet Desktop 4.21以降。このガイドではバージョン4.24.0を使用しました。
- Ledger 上の最新の Zcash アプリ（本ガイド執筆時点では3.9.4）。
- テスト用の少額の ZEC。以下のすべての手順は、メインネットで0.001 ZEC を使って実施しました。各トランザクションには少額のネットワーク手数料がかかります（テストでは0.00015 ZEC）。
- 24語のリカバリーフレーズは紙に保管してください。決してコンピューターに入力したり、共有したりしないでください。

## ステップバイステップガイド（Ledger Wallet Desktop）

**1. Zcash アプリをインストールまたは更新する**
- Ledger Wallet を開き、Ledger を接続してロックを解除し、**My Ledger** を開きます。デバイス上で接続を許可します。
- アプリカタログで **Zcash** を検索し、**Install** をクリックします。すでにインストール済みの場合は **Update** をクリックします。
- Ledger で Zcash アプリを開きます。画面に「Zcash app is ready」と表示されます。右にスクロールして **App info** を表示し、バージョンを確認します。

**2. Zcash アカウントを追加する**
- Ledger Wallet で **Add account** を選択します。**Select asset** で Zcash を検索し、Binance-Peg Zcash Token のようなラップドトークンではなく、**Zcash (ZEC)** を選びます。
- Ledger 上で Zcash アプリを開いた状態で、Ledger Wallet がアカウントを検出します。**Select the accounts you want to add** の下でチェックを入れ、**Confirm** をクリックします。
- アカウントページには、**Available balance**、**Transparent balance**、**Private balance** と、**Enable shielded** ボタンが表示されます。

![Zcash account in Ledger Wallet Desktop showing the desktop-only notice, transparent and private balances, and the Enable shielded button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. プライベート残高を有効化する**
- **シールドを有効化**をクリックします。**Zcashのプライベート残高を有効化**ウィンドウには、Birthday、UFVK、Device、Confirmation の4つの手順があります。
- **Birthday：** 新しいアカウントの場合は、バースデー高を本日の日付のままにします。「This account received shielded ZEC in the past」は、過去に受け取ったと分かっている場合にのみチェックしてください。ブロック0からのスキャンには長時間かかることがあります。
- **UFVK と Device：** Ledger Wallet は、Unified Full Viewing Key（UFVK）をエクスポートするようLedgerに求めます。デバイス上の画面を読み、承認してください。「Device connection lost」と表示された場合は、Zcashアプリが開いていることを確認し、速やかに承認してから**再試行**をクリックします。
- **UFVK successfully imported**が表示されたら、**同期を開始**をクリックします。同期が完了すると、ボタンは「Last sync」の時刻付きの**残高を更新**に変わります。
- 閲覧キーはコンピューターに保存されます。シールドされた資金を見つけることはできますが、使用することはできません。

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. ZEC を受け取り、Ledger で両方のアドレスを確認する**
- **Receive** をクリックし、Zcash アカウントを選択します。Ledger Wallet には、**Address for Zcash 1**（t1で始まる透明アドレス）と、**Private address for Zcash 1**（u1で始まる）が表示されます。以前のアドレスも引き続き有効です。
- Ledger には「Verify Zcash addresses」と表示され、続いて2ページにわたる **Private address**、そして **Public Address** が表示されます。いずれかのアドレスを共有する前に、すべての文字を画面と照合してから、デバイス上で確認してください。
- プライベートアドレスを優先し、送信者がほかに対応していない場合にのみ透明アドレスを使用してください。

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. 透明な ZEC をプライベート残高へ移す**
- **Send** をクリックします。**Self transfer** で **Send to private balance** を選択します。
- 金額を入力するか、25%、50%、75%、または **Max** を使用します。ネットワーク手数料を確認してから、**Review** をクリックします。
- Ledger では、次の項目を順に確認します：「Review transaction to send ZEC」、「Transfer from public to private address」、金額、2ページに表示される出力先アドレス、手数料、expiry height。出力先アドレスがステップ4のプライベートアドレスと一致することを確認し、**Sign transaction** で両方のボタンを押します。
- Ledger Wallet に **Transaction sent** と表示されます。トランザクション詳細では、タイプが **Private (Ironwood)** と表示されます。
- Ledger Wallet は、自己送金によってシールド資金が公開アドレスに紐付けられると説明しています。プライベートアドレスに直接受け取れば、両者は紐付けられません。

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- トランザクションが承認されると、透明な残高は減少し、プライベート残高は増加します。新たなシールド資金は、使用に十分な承認数を得るまで「maturing」と表示されます。

![Zcash account after shielding: transparent balance reduced, private balance increased and shown as maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. プライベート残高から ZEC を送る**
- プライベート残高が使用可能になったら、**Send** をクリックし、**Transfer from** を **Private balance** に設定します。
- 受取人のアドレスを貼り付け、金額を入力します。受取人だけが読める、最大512バイトの暗号化された **Memo (optional)** を追加できます。
- Ledger で受取人、金額、手数料を確認してから、**Sign transaction** で両方のボタンを押します。

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## 知っておくとよいこと

- Ledger 上のシールド ZEC は、現時点ではデスクトップ版のみです（2026年10月15日確認）。
- Ledger Wallet のプライベート残高は、Ironwood プールを使用します。
- Ledger によると、税務アドバイザーとトランザクション履歴への読み取り専用アクセスを共有できます。閲覧キーを持つ人は誰でもシールド履歴を閲覧できるため、意図した場合にのみ共有してください。
- このガイドのデバイス画面は、Ledger の Speculosエミュレーター（Nano S Plus）で、Zcash メインネット上の Ledger Wallet Desktop 4.24.0 に接続した Zcash アプリ3.9.4を実行してキャプチャしました。物理的な Ledger でも同じアプリが動作し、同じ画面が表示されます。

## 追加のヘルプ

- [Ledger Walletの新機能：ネイティブのシールド Zcash サポート](https://www.ledger.com/blog-native-shielded-zcash-support)（Ledger の発表）
- [Ledger ヘルプセンター](https://support.ledger.com)
- [ZecHub Walletsページ](/using-zcash/wallets)
- ZecHub の [シールドプール](/using-zcash/shielded-pools) と [閲覧キー](/zcash-tech/viewing-keys)
- 別のハードウェアウォレットの選択肢：[Keystone Zashi ユーザーガイド](/guides/keystone-zashi)

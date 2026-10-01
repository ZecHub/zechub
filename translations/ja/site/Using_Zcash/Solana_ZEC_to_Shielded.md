<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Solana上のZECをお持ちですか？シールドされたZcashへ移しましょう

このページは、ZCATを保有しているためにZECがSolanaウォレットに表示された方、または保有者にZECを支払う別のSolanaトークンを保有している方のためのものです。手順に従うために何かを売る必要はありません。すでに持っているZECをSolanaからZcashウォレットへ移し、シールドされた状態にします。

以下の全手順は、2026年9月27日にPhantomで0.00266336 ZECから始めた実際の送金で検証しました。このページの手数料、所要時間、画面は、私たちが確認したものです。

---

## 実際に保有しているもの

Solanaウォレット内のZECは、Zcashネットワーク上のコインではなく、Solana上のトークンです。NEARのOmniBridgeがこれを発行し、裏付けとしてZcashチェーン上で実際のZECを保有しています。このブリッジは2025年10月からSolana上で稼働しています。そのSolana側は、ZcashライトクライアントではなくWormholeメッセージとNEAR Chain Signaturesで動作しているため、Solana側の安全性はその2つのシステムに依存します。人々はこれを「紙のZEC」と呼びます。ZECの価格に追随しますが、すべての残高と送金はあなたのウォレットアドレスのもとSolanaの公開台帳に記録され、そこにある限りシールドできません。

自分のものが本物のトークンであることを確認してください。Phantomで**ZEC**をタップし、**About Zcash**までスクロールします。コントラクトアドレスは以下でなければなりません。

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/01-phantom-zec-mint.png)

Phantomではこれが`A7bd…QXaS`に省略されるため、先頭と末尾の文字を比較するか、完全なアドレスを[Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS)で確認してください。ウォレット内にある、名称やロゴにかかわらず他の「ZEC」トークンはこれではありません。触らないでください。

---

## なぜ移すのか

シールドされたZECこそがZcashの目的です。あなたのZECがシールドプールにあるとき、各支払いの送信者、受信者、金額はZcashチェーン上で暗号化されます。エクスプローラーを閲覧する人には、あなたの残高は見えません。

あなたはすでにZECを保有しています。それをZcashウォレットへ移せば、Zcashたらしめる部分を手に入れられ、ブリッジも関係なくなります。自分のウォレット内にあるネイティブのZECは、誰かが償還に応じることに依存しません。

[誰があなたのZcash支払いを見られるのか？](/start-here/who-can-see-your-zcash-payment)では、何が正確に隠されるのかを説明しています。

---

## Zcashウォレットを選ぶ

ZecHubは特定のウォレットを推薦しません。[ZecHubウォレットディレクトリ](/wallets)から選び、インストール前にウォレットのカードで次の2つのラベルを確認してください。

- **Ironwood: Ready。** Ironwoodは、2026年7月28日の[Ironwoodアップグレード](/zcash-tech/ironwood)以降、新しいシールドされたZECが入るプールです。古いOrchardプールは新規資金を受け付けません。
- **Automatic Shielding。** 支払いが透明な状態で届いた場合に便利です。ウォレットがそのZECをあなたに代わってシールドプールへ移します。このラベルを**Ironwood: Ready**の代わりと考えないでください。Automatic Shieldingを備えていてもIronwoodプールがないウォレットはあり得ます（現在、ディレクトリ上のEdgeがこの状態です）。大半の他のウォレットでは、代わりに**Shield**ボタンが表示されます。

検索結果や広告ではなく、ディレクトリカードのリンクからウォレットをインストールしてください。シードフレーズは紙に書き、オフラインで保管してください。

あなたのウォレットには、2種類のアドレスが表示されます。

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/02-zodl-receive.png)

| 先頭 | 種類 | 公開される情報 |
|---|---|---|
| `u1` | Unified Address | あなたに関する情報は何も見えません。ただし、支払いがシールドプールに届いた場合に限ります |
| `t1` | 透明アドレス | Solanaと同じように、あなたのアドレスと金額が永久に公開されます |

ウォレットがシールド済みと表示する`u1`を使ってください。`u1`は複数の受信者をまとめたものであり、一部のウォレットではシールドされた受信者の隣に透明な受信者も含まれます。透明アドレスにしか送れない送信者はそちらを使用するため、`u1`を貼り付けても支払いは公開状態で届きます。私たちのテスト用ウォレットのシールドアドレスには透明な受信者がないため、そのようなことは起こりませんでした。[シールドプール](/using-zcash/shielded-pools)では、受信者をより詳しく説明しています。一部のウォレットでは、Receiveを開くたびに新しい`u1`が表示されますが、これは正常で、すべてあなたのものです。このページの受取画面のスクリーンショットとnear.comの受信者欄で異なる`u1`プレフィックスを使っているのはそのためです。

テストでは、すでに設定してあったZODLを使用しました。ディレクトリで**Ironwood: Ready**と表示されているウォレットだけが、新しいシールド済み価値を受け取れます。

---

## 移動する

経路は2つの部分から成ります。PhantomからZECをNEAR Intentsへ入れ、その後Zcashアドレスへ送ります。最初の部分にはSolanaユーザー向けにNEARが構築したサイト、[solswap.org](https://solswap.org)を使い、2番目にはNEAR自身のアプリである[near.com](https://near.com)を使いました。ZecHubの[Phantom WalletでZECへスワップする方法](/using-zcash/solswap)ガイドでは、solswapの画面をさらに詳しく扱っています。Phantom自身の**Swap**ボタンはこのために使わないでください。すでにトークンを持っているため、スワップしても意味がありません。

Solana手数料用に、Phantomには少量のSOLを残しておいてください。

### 1. solswap.orgでZECを入金する

1. Phantomを開き、ブラウザータブへ移動して、`solswap.org`を自分で入力し、ウォレットを接続します。
2. **Deposit**をタップします。**Asset**を**Zcash**、**Network**を**Solana**、方法を**Wallet**に設定します。
3. 金額を入力するか、**Max**をタップし、Phantomでトランザクションを承認します。

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/03-solswap-deposit.png)

私たちの入金は15:09:08（UTC+1）にSolanaブロックへ記録され、9秒後にsolswapで**Completed**と表示されました。

![solswap deposit history showing Completed, +0.0026 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/04-solswap-deposit-complete.png)

これであなたのZECはNEAR Intents残高にあります。あなたのPhantomキーがそこからのすべての移動を承認し、NEAR Intentsソルバーが配送を実行し、NEAR Intentsはコンプライアンス審査のために残高を保留できます（下記の信頼に関する注記を参照）。

### 2. near.comでZcashアドレスへ送る

solswapにも**Withdraw**ページがありますが、私たちには機能しませんでした。ネットワークにZcashまたはSolanaのどちらを選んでも、**Received amount**と**Fee**は「–」のままで、ボタンは何もしませんでした。

![solswap Withdraw form with the received amount and fee stuck at a dash](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/05-solswap-withdraw-blank.png)

あなたにも同じことが起きても、ZECが行き詰まっているわけではありません。残高はウェブサイトではなくウォレットのキーに紐付いているため、そのウォレットでサインインする任意のNEAR Intentsアプリからアクセスできます。私たちはnear.comで完了しました。

1. `near.com`へ移動し、同じPhantomウォレットでサインインします。
2. solswapの残高は**Move legacy assets**の下に表示されます（near.comでは古いNEAR Intentsアプリ由来の残高を「legacy」と呼びます）。ZECの行で**Withdraw**をタップします。**Move**は不要です。

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/06-nearcom-legacy-assets.png)

3. **Network**を**Zcash**に設定し、ウォレットの`u1`アドレスを**Recipient**として貼り付け、先頭と末尾の6文字をウォレットと照合します。

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/07-nearcom-withdraw.png)

4. **Review withdrawal**をタップし、概要を読んでから**Send**をタップします。

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/08-nearcom-review.png)

5. Phantomはnear.comのために**Sign Message**を求めます。この署名が、NEAR Intentsにあなたの残高を移動させる承認になります。SOLはかかりませんが、無害という意味ではありません。偽サイトも同じリクエストを表示し、これによってあなたのNEAR Intents残高を空にできます。**Confirm**をタップする前に、以下をすべて確認し、1つでも満たさない場合は**Cancel**をタップしてください。
   - リクエスト上に記載されたサイトが`near.com`であること。（手順1の入金は`solswap.org`からの通常のPhantomトランザクションリクエストでした。同様にそこでその名前を確認してください。）
   - **Message**を開き、`"verifying_contract": "intents.near"`を見つけること。
   - メッセージがスクリーンショットのような読めるテキストであること。読めないデータの塊だったり、サイトがアドレスバーのものと一致しなかったりする場合は拒否してください。
   - シードフレーズを求められることは決してありません。署名で入力することはありません。

![Phantom Sign Message request from near.com on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/09-phantom-sign-message.png)

6. near.comには**Processing send**、**Sending**、**Complete**が表示されます。**View on explorer**を開くと、送金のNEAR Intents記録が表示されます。

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/10-nearcom-complete.png)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/11-intents-explorer.png)

### 私たちのテストの費用と所要時間

|  | 私たちのテスト |
|---|---|
| Phantomから入金したZEC | 0.00266336 ZEC |
| Zcashウォレットで受け取ったZEC | 0.00241336 ZEC、シールド済み |
| ZEC側の費用 | 0.00025 ZEC（near.comでは「Fee 0 ZEC」と表示されましたが、費用は見積もり価格に含まれています） |
| 入金に使ったSOL | 0.00156844 SOL。このうち0.00008 SOLがネットワーク手数料 |
| 最低額 | 該当なし。solswapでは最低入金額が0.00000001 ZECと表示され、near.comは0.0026 ZECを受け付けました |
| 入金、Phantomからsolswapまで | 9秒 |
| 出金、near.comでの署名からZcashウォレット内のZECまで | 約8分（near.comの見積もりは約2分） |

記録：Solana入金 [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx)、NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9)、ブロック3,498,141内のZcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034)。手数料と時間はネットワークの負荷で変わるため、実行時には確認画面が最終的な基準です。

NEARのブリッジは、標準のZcash出金に対して最低0.01 ZECと手数料0.00047 ZECを公表しています。near.comは、私たちの0.0026 ZECにはどちらも適用しませんでした。アプリが少額を拒否する場合は、追加購入する前にnear.comを試してください。

### 他の経路と、それぞれが信頼するもの

Solanaから出るすべての経路は、ブリッジがあなたのトークンを裏付けるZECを保有しているため、OmniBridgeを信頼します。それに加えて、次のものを信頼します。

- **上記の経路**はNEAR Intentsを信頼します。あなたの署名が送金を承認し、ソルバーがZcash側でZECを配送し、NEAR Intentsはコンプライアンス審査のために資金を保留できます。2026年には、Zcash保有者が[数週間保留された大規模スワップを報告](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/)しました。また、2つのウェブサイトにウォレットを接続するため、毎回アドレスバーを確認してください。
- **NEAR Intentsを内蔵したウォレット**（NEAR Intents機能を[ディレクトリ](/wallets)で探してください）は、Zcashウォレット内から同じシステムを使います。信頼の前提は同じで、ウェブサイトが少なくなります。Solana上のZECではこれをテストしていません。
- **取引所**。ただし、Solanaネットワーク上のこのトークンの入金を受け付ける場合に限ります。ほとんどは受け付けません。カストディを渡すことになり、通常は本人確認も必要で、多くの取引所は`t1`アドレスにしかZECを送れません。[カストディ取引所](/using-zcash/custodial-exchanges)を参照してください。

---

## シールドを確認する

到着時点でシールドされていました。私たちのZECは`u1`アドレスへ送られ、Ironwoodシールドプールに直接着金しました。透明な段階はなく、手動でシールドする必要もありませんでした。確認を集めている間、16:07（UTC+1）にはウォレットでシールドアイコン付きの**Receiving…**と表示されました。

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/12-zodl-receiving.png)

自分で確認するには、ウォレットでトランザクションを開き、トランザクションIDをコピーします。

![Zcash wallet transaction details with the transaction ID and timestamp](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/13-zodl-tx-details.png)

それを[Zcashブロックエクスプローラー](https://mainnet.zcashexplorer.app)に貼り付けます。概要表示に惑わされないでください。私たちのものでは**Shielded Inputs / Outputs 0 / 0**、**Transferred from/to shielded pool 0.0 ZEC**と表示されます。これはエクスプローラーの概要がまだIronwoodを数えていないためです。表示される`t1`アドレスは送信側のもの（使用したZECと保持したお釣り）であり、あなたのものではありません。

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/14-explorer-summary.png)

**Raw TX: JSON**をクリックして、`ironwood`を検索します。そこで負の`valueBalance`は、ZECがIronwoodプールへ入ることを意味します。私たちの値は`-0.00241336`で、到着した額と正確に一致しており、トランザクションから受取人を知ることはできません。

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/15-explorer-raw-ironwood.png)

[ブロックエクスプローラーで見えるもの](/zcash-tech/what-a-block-explorer-can-see)では、残りのフィールドを説明しています。

### `t1`アドレスを貼り付けた場合

私たちは送っていませんが、結果は予測できます。ZECはウォレットの透明残高に着金し、エクスプローラーにはあなたの`t1`アドレスと金額が永久に誰でも見える状態で表示されます。自動シールド機能のあるウォレットなら、その後シールドプールへ移動します。そうでない場合は**Shield**をタップしてください。少額のネットワーク手数料がかかります。`t1`アドレスから支出するため、シールドのトランザクションも公開されます。何も失われませんが、その入金とあなたのウォレットとのつながりはチェーンに残ります。`u1`を貼り付けてください。

---

## 安全を保つ

新しい保有者は標的になります。目にする詐欺のほとんどは、次のいずれかです。

- **間違ったアドレス種別。** Zcashアドレスは`u1`、`t1`、`zs`、または`tex1`で始まります。Solanaアドレスには、そのようなプレフィックスはありません。ネイティブのZECをSolanaアドレスへ送らないでください。また、SolanaトークンをZcashアドレスへ送らないでください。
- **透明アドレス専用サービス。** 一部のブリッジ、スワップサイト、取引所は`t1`アドレスにしか送れません。到着後すぐにZECをシールドするなら対応可能です。ただし、そこに残したままにしないでください。
- **偽のウォレット。** [ウォレットディレクトリ](/wallets)カードのリンク、またはそこから案内される公式アプリストアの掲載ページからのみインストールしてください。偽の暗号資産ウォレットアプリは実際にアプリストアへ紛れ込み、本物とまったく同じように見えます。
- **シードフレーズのフィッシング。** ウォレット、ブリッジ、スワップサイト、サポート担当者、モデレーター、エアドロップのいずれも、あなたのシードフレーズを必要とすることはありません。メッセージへの署名で入力することもありません。それを求める人は、あなたから盗もうとしています。[資金の回復](/using-zcash/recovering-funds)では、この詐欺の「あなたのウォレットを復旧します」という形態を扱っています。
- **詐欺トークンと「claim」サイト。** ZEC、Zcash、またはそれに近い名前のトークンが、依頼していないのにSolanaウォレットへ現れることがあります。多くは、さらに受け取るための「claim」リンク付きです。そのリンクにウォレットを接続すると、資金を抜き取られる可能性があります。このページ冒頭のコントラクトアドレスを確認し、それ以外は無視してください。
- **悪意のある署名リクエスト。** 「Sign Message」リクエストは、SOL手数料なしであなたのNEAR Intents残高を移動できます。`near.com`または`solswap.org`上でのみ署名し、メッセージに`intents.near`と記載されている場合に限ってください（上の手順5に確認方法があります）。
- **見た目が似たサイト。** `solswap.org`と`near.com`は自分で入力するか、ブックマークを使ってください。DM、返信、広告のリンクはたどらないでください。

---

## シールドされたZECでできること

- 使うときにもプライバシーを保つ：[ZECをプライベートに使う](/guides/using-zec-privately)
- 使える場所を探す：[ZECを使える場所](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- プライベートなメッセージを添えて送る：[メモ](/using-zcash/memos)
- 身元を紐付けずに誰かへ支払う：[身元を紐付けずに送金する](/zcash-use-cases/send-money-without-linking-identity)

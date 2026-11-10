<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# ZECをSolanaで受け取りましたか？シールドされた（shielded）Zcashへ移動しましょう

このページは、ZCATまたはZECで保有者に支払われる別のSolanaトークンを保有しているため、SolanaウォレットにZECが表示された方のためのものです。これに従うために何かを売却する必要はありません。すでに保有しているZECをSolanaからZcashウォレットへ移動し、最終的にシールドされた状態にします。

2026年9月27日に、Phantom内の0.00266336 ZECから開始して、実際の送金ですべての手順を実行しました。このページの手数料、所要時間、画面は、私たちが確認したものです。

---

## 要約

- Solanaウォレット内のZECは、Zcashチェーン上でNEAR OmniBridgeが保有する実際のZECに1:1で裏付けられた**Solanaトークン**（ミント `A7bd…QXaS`）です。これはSolanaの公開台帳に存在し、そこでシールドできない「紙のZEC」です。
- 経路は2段階です。solswap.org（NEAR Intents）でトークンを**入金**し、near.comでウォレットのシールドされた`u1`アドレスへ**出金**します。Phantom独自のSwapボタンは使わないでください。役に立ちません。
- [ZecHubディレクトリ](/wallets)で**Ironwood: Ready**と表示されるウォレットを使い、Solana手数料のためにPhantomに少量のSOLを残しておいてください。
- 実際のテスト（2026年9月27日、0.00266336 ZEC）では、入金は9秒で着金し、出金には約8分かかり、総費用は約0.00025 ZEC + 0.0016 SOLでした。
- 安全上の注意：`near.com`/`solswap.org`上で、メッセージ内に`intents.near`がある場合にのみメッセージ要求へ署名し、シードフレーズを絶対に入力せず、`t1`ではなく`u1`を貼り付けてください。

## 視覚的な例え

Solana上のZECは、**カジノチップ**のようなものです。現金と同じ価格で取引され、カジノ、すなわちNEAR OmniBridgeは、チップを返却する人に実際の紙幣（ネイティブZEC）を渡すと約束します。しかしチップはカジノ台帳上の1行にすぎません。誰でも誰が保有しているかを確認でき、その価値はカジノのシステムが健全であり続けることに依存します。near.comから出金するのは、換金窓口へ行ってチップを現金化することです。紙幣がシールドされたプールに入れば、それは自分だけの不透明なウォレット内にあり、金額も保有者も誰にも見えなくなります。

---

## 実際に保有しているもの

Solanaウォレット内のZECは、Solana上のトークンであり、Zcashネットワーク上のコインではありません。NEAR OmniBridgeがこれを発行し、その裏付けとしてZcashチェーン上に実際のZECを保有しています。このブリッジは2025年10月からSolana上で稼働しています。Solana側はWormholeメッセージとNEAR Chain Signaturesで動作し、Zcashライトクライアントではないため、Solana側の健全性はこの2つのシステムに依存します。人々はこれを「紙のZEC」と呼びます。ZECの価格を追従しますが、すべての残高と送金はウォレットアドレスのもとでSolanaの公開台帳に記録され、そこに存在する限りシールドできません。

保有しているものが本物のトークンであることを確認してください。Phantomで**ZEC**をタップし、**Zcashについて**までスクロールします。コントラクトアドレスは次のものでなければなりません。

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantomではこれが`A7bd…QXaS`に短縮表示されるため、最初と最後の文字を比較するか、[Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS)で完全なアドレスを確認してください。名前やロゴにかかわらず、ウォレット内にある他の「ZEC」トークンはこれではありません。触れないでください。

---

## なぜ移動するのか

シールドされたZECこそがZcashの要点です。ZECがシールドされたプールにある場合、各支払いの送信者、受信者、金額はZcashチェーン上で暗号化されています。エクスプローラーを閲覧する人は、あなたの残高を確認できません。

すでにZECを保有しています。Zcashウォレットへ移動すれば、Zcashたる理由を得られ、ブリッジを介在させずに済みます。自分のウォレットにあるネイティブZECは、誰かが償還を履行することに依存しません。

[誰があなたのZcash支払いを見ることができますか？](/start-here/who-can-see-your-zcash-payment)では、何が隠されたままなのかを詳しく説明しています。

---

## Zcashウォレットを選ぶ

ZecHubはウォレットを選んでくれません。[ZecHubウォレットディレクトリ](/wallets)から選び、インストール前にウォレットカードの次の2つのラベルを確認してください。

- **Ironwood: Ready。** Ironwoodは、2026年7月28日の[Ironwoodアップグレード](/zcash-tech/ironwood)以降、新しいシールドされたZECが入るプールです。古いOrchardプールは新しい資金を受け付けなくなりました。
- **自動シールド。** 支払いが公開型で着金した場合、ウォレットがそのZECをシールドされたプールへ移動してくれるため便利です。ただし、このラベルを**Ironwood: Ready**の代わりと考えないでください。自動シールド機能があってもIronwoodプールを持たないウォレットがあります（現在、ディレクトリ上のEdgeがこの状態です）。他の大半のウォレットには代わりに**Shield**ボタンがあります。

検索結果や広告ではなく、ディレクトリカードのリンクからウォレットをインストールしてください。シードフレーズは紙に書き、オフラインで保管してください。

ウォレットには2種類のアドレスが表示されます。

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| 先頭文字 | 種類 | 公開される情報 |
|---|---|---|
| `u1` | 統合アドレス | 支払いがシールドされたプールに着金した場合に限り、あなたに関する情報は何も公開されません |
| `t1` | 公開型アドレス | Solanaと同様に、あなたのアドレスと金額が永続的に公開されます |

ウォレットがシールドされたものとして表示する`u1`を使ってください。`u1`は複数の受信者をまとめたものであり、一部のウォレットではシールドされた受信者の隣に公開型受信者が含まれます。公開型アドレスにしか支払えない送信者はそちらを使用するため、`u1`を貼り付けても支払いが公開状態で着金します。私たちのテスト用ウォレットのシールドされたアドレスには公開型受信者がないため、そのようなことは起こりませんでした。[シールドされたプール](/using-zcash/shielded-pools)では、受信者についてさらに詳しく説明しています。一部のウォレットでは、Receiveを開くたびに新しい`u1`が表示されます。これは正常であり、すべてあなたのものです。このページの受取画面とnear.comの受信者欄で異なる`u1`プレフィックスを使用しているのはそのためです。

テストには、すでに設定してあったZODLを使用しました。ディレクトリで**Ironwood: Ready**と表示されるウォレットのみが、新しいシールドされた価値を受け取れます。

---

## 移動する

経路は2つの部分に分かれます。PhantomからZECをNEAR Intentsに入れ、その後Zcashアドレスへ送ります。前半には[solswap.org](https://solswap.org)（Solanaユーザー向けのNEAR構築サイト）を、後半には[near.com](https://near.com)（NEAR独自のアプリ）を使用しました。ZecHubの[Phantom WalletでZECをスワップする方法](/using-zcash/solswap)ガイドでは、solswapの画面をより詳しく取り上げています。これにはPhantom独自の**Swap**ボタンを使わないでください。すでにトークンを保有しており、スワップしても何も進展しません。

Solana手数料のため、Phantomに少量のSOLを残してください。

### 1. solswap.orgにZECを入金する

1. Phantomを開き、ブラウザータブへ移動して`solswap.org`を自分で入力し、ウォレットを接続します。
2. **Deposit**をタップします。**Asset**を**Zcash**、**Network**を**Solana**、方法を**Wallet**に設定します。
3. 金額を入力し（または**Max**をタップし）、Phantomでトランザクションを承認します。

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

私たちの入金は15:09:08（UTC+1）にSolanaブロックへ着金し、9秒後にsolswapで**Completed**と表示されました。

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

これでZECはNEAR Intents残高にあります。Phantomキーがそこからのすべての移動を認可し、NEAR Intentsソルバーが配信を実行し、NEAR Intentsはコンプライアンス審査のために残高を保留できます（下記の信頼に関する注意を参照してください）。

### 2. near.comでZcashアドレスへ送る

solswapにも**Withdraw**ページがありますが、私たちには機能しませんでした。**Received amount**と**Fee**は、ネットワークにZcashまたはSolanaのどちらを選んでも「–」のままで、ボタンを押しても何も起こりませんでした。

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

その場合でも、ZECが動かせなくなったわけではありません。残高はウェブサイトではなくウォレットのキーに紐付いているため、そのウォレットでサインインする任意のNEAR Intentsアプリからアクセスできます。私たちはnear.comで完了しました。

1. `near.com`へ移動し、同じPhantomウォレットでサインインします。
2. solswapの残高は**Move legacy assets**の下に表示されます（near.comでは、古いNEAR Intentsアプリからの残高を「legacy」と呼んでいます）。ZECの行で**Withdraw**をタップします。**Move**は必要ありません。

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. **Network**を**Zcash**に設定し、ウォレットの`u1`アドレスを**Recipient**として貼り付け、最初と最後の6文字をウォレットと照合します。

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. **Review withdrawal**をタップし、概要を読んで**Send**をタップします。

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantomはnear.comのために**Sign Message**するよう求めます。この署名が、NEAR Intentsによる残高の移動を認可します。SOLはかかりませんが、無害という意味ではありません。偽サイトは同じ要求を表示し、それによってNEAR Intents残高を空にできます。**Confirm**をタップする前に、次のすべてを確認してください。1つでも満たさない場合は**Cancel**をタップしてください。
   - 要求に表示されるサイト名が`near.com`です。（手順1の入金は`solswap.org`からの通常のPhantomトランザクション要求でした。そこでの名前も同様に確認してください。）
   - **Message**を開き、`"verifying_contract": "intents.near"`を見つけます。
   - メッセージはスクリーンショットのように読めるテキストです。読めないデータの塊である場合や、サイトがアドレスバーのものと一致しない場合は、拒否してください。
   - シードフレーズを求めることは決してありません。署名で入力する必要はありません。

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.comには**Processing send**、**Sending**、**Complete**が表示されます。**View on explorer**を開くと、送金のNEAR Intents記録を確認できます。

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### テストの費用と所要時間

| | 私たちのテスト |
|---|---|
| Phantomから入金したZEC | 0.00266336 ZEC |
| Zcashウォレットで受け取ったZEC | 0.00241336 ZEC、シールド済み |
| ZEC側の費用 | 0.00025 ZEC（near.comは「Fee 0 ZEC」と表示しましたが、費用は見積もり価格に含まれています） |
| 入金に使ったSOL | 0.00156844 SOL。そのうち0.00008 SOLはネットワーク手数料でした |
| 最低額 | 該当なし。solswapの最低入金額は0.00000001 ZECで、near.comは0.0026 ZECを受け付けました |
| 入金、Phantomからsolswapまで | 9秒 |
| 出金、near.comでの署名からZcashウォレット内のZECまで | 約8分（near.comの見積もりは約2分でした） |

記録：Solana入金[5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx)、NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9)、ブロック3,498,141内のZcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034)。手数料と時間はネットワーク負荷によって変わるため、実行時には確認画面が最終的な情報です。

NEARのブリッジは、標準Zcash出金に対して最低額0.01 ZECと手数料0.00047 ZECを公表しています。near.comでは、私たちの0.0026 ZECにはどちらも適用されませんでした。アプリが少額を拒否する場合は、チャージする前にnear.comを試してください。

### 他の経路と、それぞれが信頼するもの

Solanaから出るすべての経路は、ブリッジがトークンの裏付けとなるZECを保有するため、OmniBridgeを信頼します。そのうえで、以下の違いがあります。

- **上記の経路**はNEAR Intentsを信頼します。あなたの署名が送金を認可し、ソルバーがZcash側のZECを配信し、NEAR Intentsはコンプライアンス審査のため資金を保留できます。2026年には、Zcash保有者が、[数週間保留された大規模なスワップを報告しました](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/)。また、ウォレットを2つのウェブサイトに接続するため、毎回アドレスバーを確認してください。
- **NEAR Intentsを内蔵したウォレット**（[ディレクトリ](/wallets)でNEAR Intents機能を探してください）は、Zcashウォレット内から同じシステムを使用します。信頼の前提は同じで、ウェブサイトは少なくなります。ZEC上のSolanaではテストしていません。
- **取引所**。このトークンのSolanaネットワーク上での入金を受け付ける場合に限りますが、ほとんどは受け付けません。カストディと通常は本人確認情報を渡すことになり、多くの取引所は`t1`アドレスにしかZECを送れません。[カストディアル取引所](/using-zcash/custodial-exchanges)を参照してください。

---

## シールドして確認する

これはシールドされた状態で届きました。私たちのZECは`u1`アドレスへ送られ、Ironwoodシールドされたプールに直接着金しました。公開型の段階はなく、手動でシールドするものもありませんでした。確認を集めている間、ウォレットには16:07（UTC+1）にシールドアイコン付きで**Receiving…**と表示されました。

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

自分で確認するには、ウォレット内でトランザクションを開き、トランザクションIDをコピーしてください。

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

これを[Zcashブロックエクスプローラー](https://mainnet.zcashexplorer.app)に貼り付けます。概要表示に惑わされないでください。私たちのものには**Shielded Inputs / Outputs 0 / 0**および**Transferred from/to shielded pool 0.0 ZEC**と表示されています。これは、エクスプローラーの概要がまだIronwoodを数えていないためです。表示される`t1`アドレスは送信側のもの（使用したZECと保持したお釣り）であり、あなたのものではありません。

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

**Raw TX: JSON**をクリックし、`ironwood`を検索してください。そこにある負の`valueBalance`は、Ironwoodプールに入るZECです。私たちの場合は`-0.00241336`で、到着した金額と正確に一致し、トランザクション内には誰が受け取ったかを示す情報はありません。

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[ブロックエクスプローラーで見えるもの](/zcash-tech/what-a-block-explorer-can-see)では、残りのフィールドを説明しています。

### 公開型`t1`アドレスを貼り付けた場合

私たちはそのように送金しませんでしたが、結果は予測できます。ZECはウォレットの公開型残高に着金し、エクスプローラーには`t1`アドレスと金額が永続的に誰にでも表示されます。自動シールド機能を持つウォレットは、その後それをシールドされたプールに移動します。そうでない場合は、少額のネットワーク手数料を払って**Shield**をタップしてください。`t1`アドレスから支出するため、シールドのトランザクションも公開されます。何も失われませんが、その入金とあなたのウォレットのつながりはチェーン上に残ります。`u1`を貼り付けてください。

---

## 安全を保つ

新しい保有者は標的になります。遭遇する詐欺のほぼすべては、次のいずれかです。

- **誤ったアドレス種類。** Zcashアドレスは`u1`、`t1`、`zs`、または`tex1`で始まります。Solanaアドレスにはこれらのプレフィックスがありません。ネイティブZECをSolanaアドレスへ送ったり、SolanaトークンをZcashアドレスへ送ったりしないでください。
- **公開型専用サービス。** 一部のブリッジ、スワップサイト、取引所は`t1`アドレスにしか送れません。到着後すぐにZECをシールドするなら利用できます。ただし、そこに置きっぱなしにしないでください。
- **偽のウォレット。** [ウォレットディレクトリ](/wallets)カードのリンク、またはそこから案内される公式アプリストアの掲載ページからのみインストールしてください。偽の暗号資産ウォレットアプリは実際にアプリストアへ入り込むことがあり、本物とまったく同じに見えます。
- **シードフレーズのフィッシング。** ウォレット、ブリッジ、スワップサイト、サポート担当者、モデレーター、エアドロップのいずれも、あなたのシードフレーズを必要としません。メッセージへの署名で入力を求められることもありません。これを求める人は、あなたから盗もうとしています。[資金を復旧する](/using-zcash/recovering-funds)では、この詐欺の「ウォレットを復旧します」という形を扱っています。
- **詐欺トークンと「請求」サイト。** ZEC、Zcash、または似た名前のトークンが、頼んでもいないのにSolanaウォレットに現れることがあります。多くの場合、さらに受け取るための「請求」リンクが付いています。そのリンクにウォレットを接続すると、残高が抜き取られる可能性があります。このページの冒頭にあるコントラクトアドレスを確認し、それ以外はすべて無視してください。
- **悪意ある署名要求。** 「Sign Message」要求は、SOL手数料なしでNEAR Intents残高を移動できる場合があります。`near.com`または`solswap.org`上でのみ署名し、メッセージに`intents.near`がある場合に限ってください（上記の手順5で確認方法を示しています）。
- **偽装サイト。** `solswap.org`と`near.com`は自分で入力するか、ブックマークを使ってください。DM、返信、広告のリンクには従わないでください。

---

## よくある間違い

- 入金フローではなく、PhantomのSwapボタンを使うこと。すでにトークンを保有しているため、スワップは紙のZECを別のトークンに交換するだけで、ネイティブZECには近づきません。
- シールドされた専用の`u1`をウォレットが提供しているのに、`t1`アドレス、または公開型受信者を隠した`u1`を貼り付けること。入金は公開状態で着金し、ウォレットとのつながりが永続的に残ります。
- solswapのWithdrawページで「–」と表示されたとき、資金が動かせなくなったと思い込むこと。残高はウェブサイトではなくPhantomキーに従います。near.comで出金を完了してください。
- 確認せずにメッセージへ署名すること。偽装サイトは1回の署名でNEAR Intents残高を空にできます。サイトは`near.com`であり、メッセージには`"verifying_contract": "intents.near"`が含まれていなければなりません。
- 2つの「ZEC」ティッカーを混同すること。SolanaトークンとネイティブZcash ZECは名前を共有していますがネットワークは異なり、どちらをもう一方のチェーンへ送っても失われます。

## シールドされたZECでできること

- 使用時のプライバシーを保つ：[ZECをプライベートに使う](/guides/using-zec-privately)
- 利用できる場所を探す：[ZECを使える場所](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- プライベートなメッセージを添えて送る：[メモ](/using-zcash/memos)
- 身元を紐付けずに誰かへ支払う：[身元を紐付けずに送金する](/zcash-use-cases/send-money-without-linking-identity)

---

## 関連ページ

- [Phantom WalletでZECをスワップする方法](/using-zcash/solswap) — solswapの画面についての詳細
- [シールドされたプール](/using-zcash/shielded-pools) — Ironwood/Orchardプールとは何か、受信者の仕組み
- [誰があなたのZcash支払いを見ることができますか？](/start-here/who-can-see-your-zcash-payment) — シールドで実際に隠されるもの
- [ウォレット](/wallets) — ディレクトリ。**Ironwood: Ready**ラベルを確認してください
- [カストディアル取引所](/using-zcash/custodial-exchanges) — この経路が避けられるトレードオフ
- [資金を復旧する](/using-zcash/recovering-funds) — アクセスを失わないために安全に保管すべきもの

# **Phantom ウォレット（Wallet）でZECをスワップ（Swap）する方法**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

すでにSolana上でZECを保有していますか（たとえば、保有者にZECで支払うトークン（token）から得たものなど）？スワップしないでください。そのトークンを、[を使ってシールドされた（shielded）Zcashウォレットへ移動してください。SolanaでZECを入手しましたか？シールドされたZcashへ移動してください](/using-zcash/solana-zec-to-shielded)。

---

## **ネイティブ（Native）ZECか、ZECトークンか？**

Phantomにおける「ZEC」は2種類の異なる資産を指す場合があるため、何に支払っているのかを把握してください。

- **Phantomの組み込みスワップボタン**では、Solana（またはPhantomが対応する別のネットワーク（network））上のZECのトークン表現を取得します。これはネイティブZECではありません。これはあなたのPhantomアドレス（address）にあり、Zcashのシールドされた機能はなく、Zcashウォレットでは確認もシールドもできません。
- **ネイティブZEC**はZcashブロックチェーン（blockchain）上にのみ存在し、Zcashアドレスへ送信されます。取得するには、[ZODL](https://zodl.com)内のスワップ、[DEXページ](/dex)の選択肢の1つ、またはsolswap.orgでスワップ後にZcashウォレットへ出金する方法（ステップ8）のように、Zcashアドレスの入力を求めるサービスが必要です。

### 支払う前に確認してください

- **ネットワーク：**受け取るZECは、**Zcash**ネットワーク上にある必要があります。Solana、Ethereum、またはBaseと表示されている場合、それはトークンです。
- **資産：**ネイティブZECにはトークンコントラクトやミントアドレスはありません。表示されている場合はトークンです。Solanaには、よく似た「ZEC」トークンも多数存在するため、名前だけで判断しないでください。Solana上のOmniBridgeトークンは`A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`です。これは依然としてトークンであり、ネイティブZECではありません。
- **アドレス：**ネイティブZECは、`t1`、`u1`、または`zs`で始まるZcashアドレスへ送られます。PhantomアドレスへZECが送られる場合、受け取るのはトークンです。

---

##  **ステップ1：スワップインターフェースを開く**
**Phantomアプリ**を起動し、Phantomブラウザから**[solswap.org](https://solswap.org/)**にアクセスします。アドレスは自分で入力してください。このサイトはNEAR Intents上で動作し、ZcashアドレスへZECを送信できます。

Phantom独自の**スワップ**ボタンにもZECが表示されますが、取得できるのは前述のトークンであり、ネイティブZECではありません。

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **ステップ2：入金するネットワークとトークンを選択する**
- **送信元ネットワーク**（例：*Ethereum*または*Solana*）を選択し、スワップ用に入金します。

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- **SOL、USDT、またはUSDC**などの基本トークンを選択します。
- **送信先トークン**として**ZEC**を選択します。
- Zcashがスワップインターフェースで利用可能であることを確認します。

![img4](/content-images/ry4QQF-5gx-2a27ccdd47.webp)

---

##  **ステップ3：金額を入力し、見積もりを確認する**
- スワップしたい金額を入力します。
- **solswap.org**に表示される受取額を使用してください。その見積もりがこの経路に適用されます。

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **ステップ4：ガスと手数料（fee）を確認する**
- 入金を承認するために、Phantom内に送信元チェーン（chain）のガストークンを十分に残しておいてください（Solanaでは*SOL*、Ethereumでは*ETH*）。
- 確定前にsolswapの見積もりにある手数料欄を確認してください。Phantomの組み込みスワップには独自の手数料体系があります（過去には0.85%のPhantom手数料に加え、ネットワークガスおよびブリッジ手数料）。これらの数値はsolswap.orgへの入金には適用されません。

---

##  **ステップ5：設定を調整する（任意）**
solswap.orgでは、入金前にスリッページと、その画面に表示される見積もり上の最小受取額を確認してください。

代わりにPhantom独自の**スワップ**シートを見ている場合、ページ上部で説明したトークン経路にいます。閉じて、Phantomブラウザで`solswap.org`を開いてください。

---

##  **ステップ6：スワップを確定する**
- solswap.orgでスワップのすべての詳細を確認します。
- Phantomで入金を確定します。

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **ステップ7：ステータスを確認する**
- solswap.orgのアクティビティで、**Completed**と表示されるまで入金を追跡します。
- Solanaまたは送信元チェーンのトランザクション（transaction）IDは、そのアクティビティ行およびそのネットワークのチェーンエクスプローラーに表示されます。

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **ステップ8：ネイティブZECをZcashウォレットへ出金する**
スワップ後、ZECはsolswap.orgの**Account**残高に表示されます。まだZcashネットワーク上にはなく、Phantom内にもありません。

1. [directory](/wallets)で**Ironwood: Ready**と表示されるZcashウォレットを開きます。ウォレットでシールドされたと表示されている`u1`をコピーします。`t1`も使用できますが、その入金はシールドするまで公開されます。
2. solswap.orgで**Account**に移動し、**Withdraw**をタップします。**ZEC**を選択し、ネットワークを**Zcash**に設定して、アドレスを貼り付けます。確定前に先頭と末尾の文字を確認してください。
3. **Received amount**と**Fee**が「–」のままでボタンが反応しない場合でも、残高が失われたわけではありません。残高はPhantomキーの下のNEAR Intentsにあります。[near.com](https://near.com)で完了してください。同じPhantomウォレットでサインインし、**Move legacy assets**を開き、ZEC行で**Move**ではなく**Withdraw**をタップし、ネットワークを**Zcash**に設定して、同じ`u1`を貼り付けます。Phantomは**Sign Message**を求めます。リクエスト元が`near.com`であり、メッセージに`"verifying_contract": "intents.near"`と記載されている場合にのみ確認してください。この回避策の全画面は[SolanaでZECを入手しましたか？シールドされたZcashへ移動してください](/using-zcash/solana-zec-to-shielded)。

---

## **次のステップ**
ネイティブZECがZcashウォレットに入ったら、[を使用してシールドされた状態を維持してくださいZECをプライベートに使用する](/guides/using-zec-privately)。

Phantomのスワップボタンで購入したZECトークンは、Phantomからシールドできません。そのトークンはSolana上のOmniBridge資産です。[SolanaでZECを入手しましたか？シールドされたZcashへ移動してください](/using-zcash/solana-zec-to-shielded)。

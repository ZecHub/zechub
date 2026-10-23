# **Phantom WalletでZECをスワップする方法**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

すでにSolana上でZECを保有していますか（例：保有者にZECを支払うトークンから得たもの）？スワップしないでください。そのトークンを[でシールドされたZcashウォレットに移動してください。Solana上にZECがありますか？](/using-zcash/solana-zec-to-shielded)を使ってシールドされたZcashに移動してください。

---

## **ネイティブのZECか、ZECトークンか？**

Phantomでの「ZEC」は2種類の異なる資産を指す場合があるため、何に対して支払いを行うのかを把握しましょう。

- **Phantom内蔵のSwapボタン**では、Solana（またはPhantomがサポートする別のネットワーク）上のZECのトークン表現を取得します。これはネイティブのZECではありません。Phantomアドレスに保有され、Zcashのシールド機能はなく、Zcashウォレットから確認またはシールドすることもできません。
- **ネイティブのZEC**はZcashブロックチェーン上にのみ存在し、Zcashアドレスへ送信されます。取得するには、Zcashアドレスの入力を求めるサービスが必要です。たとえば、[ZODL](https://zodl.com)内のスワップ、[DEXページ](/dex)の選択肢、またはsolswap.orgでのスワップ後にZcashウォレットへ出金する方法（ステップ8）があります。

### 支払う前に確認すること

- **ネットワーク：**受け取るZECは、**Zcash**ネットワーク上のものである必要があります。Solana、Ethereum、Baseと表示されている場合、それはトークンです。
- **資産：**ネイティブのZECには、トークンコントラクトやミントアドレスはありません。あなたのものにそれが表示されている場合、それはトークンです。Solanaには見た目が似た「ZEC」トークンも多数あるため、名前だけで判断しないでください。Solana上のOmniBridgeトークンは`A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`です。これはネイティブのZECではなく、依然としてトークンです。
- **アドレス：**ネイティブのZECは、`t1`、`u1`、または`zs`で始まるZcashアドレスに送られます。ZECがあなたのPhantomアドレスに送られている場合、受け取るのはトークンです。

---

##  **ステップ1：Swapインターフェースを開く**
**Phantomアプリ**を起動し、Phantomブラウザから**[solswap.org](https://solswap.org/)**にアクセスします。アドレスは自分で入力してください。このサイトはNEAR Intents上で動作しており、ZcashアドレスへZECを送信できます。

Phantom独自の**Swap**ボタンにもZECが表示されますが、取得できるのは上記で説明したトークンであり、ネイティブのZECではありません。  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **ステップ2：入金するネットワークとトークンを選択する**  
- **送信元ネットワーク**（例：*Ethereum*または*Solana*）を選択し、スワップ用に入金します。  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- **SOL、USDT、USDC**などのベーストークンを選択します。  
- **送信先トークン**として**ZEC**を選択します。  
- スワップ画面でZcashが利用可能であることを確認します。  



![img4](/content-images/ry4QQF-5gx-2a27ccdd47.webp)

---

##  **ステップ3：金額を入力して見積もりを確認**
- スワップしたい金額を入力します。
- **solswap.org** に表示されている受取金額を使用してください。このルートでは、その見積もりが適用されます。

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **ステップ4：ガスと手数料を確認**
- 入金を承認できるよう、Phantomに送信元チェーンのガストークンを十分に保持してください（Solanaでは*SOL*、Ethereumでは*ETH*）。
- 確定する前に、solswapの見積もりに表示される手数料欄を確認してください。Phantomに組み込まれたSwapには独自の手数料体系があり、過去には0.85%のPhantom手数料にネットワークガスとブリッジ手数料が加算されていました。これらの料金はsolswap.orgへの入金には適用されません。

---

##  **ステップ5：設定を調整する（任意）**
solswap.orgで、入金前にその画面上のスリッページと見積もり最小受取額を確認してください。

代わりにPhantom独自の**Swap**シートを見ている場合は、このページ上部からのトークンルートにいます。それを閉じ、Phantomブラウザで`solswap.org`を開いてください。

---

##  **ステップ6：スワップを確認**
- solswap.orgですべてのスワップ詳細を確認します。
- Phantomで入金を確認します。

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **ステップ7：ステータスを監視**
- **Completed** と表示されるまで、solswap.orgのアクティビティで入金を追跡します。
- Solanaまたは送信元チェーンのトランザクションIDは、そのアクティビティ行と、そのネットワークのチェーンエクスプローラーにあります。

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **ステップ8：ネイティブのZECをZcashウォレットへ出金**
スワップ後、ZECはsolswap.orgの**Account**残高に表示されます。まだZcashネットワーク上にはなく、Phantomにも入っていません。

1. [directory](/wallets)で**Ironwood: Ready**と表示されているZcashウォレットを開きます。ウォレットでシールド済みと表示されている`u1`をコピーします。`t1`も使用できますが、その入金はシールドするまで公開状態です。
2. solswap.orgで**Account**に移動し、**Withdraw**をタップします。**ZEC**を選び、ネットワークを**Zcash**に設定してアドレスを貼り付け、確定前に先頭と末尾の文字を確認します。
3. **Received amount**と**Fee**が「–」のままでボタンを押しても何も起こらない場合、残高が失われたわけではありません。残高はNEAR Intents内のPhantomキーの下にあります。[near.com](https://near.com)で手続きを完了します。同じPhantomウォレットでサインインし、**Move legacy assets**を開き、ZECの行で（**Move**ではなく）**Withdraw**をタップし、ネットワークを**Zcash**に設定して同じ`u1`を貼り付けます。Phantomから**Sign Message**を求められます。リクエストが`near.com`からのもので、メッセージに`"verifying_contract": "intents.near"`が記載されている場合にのみ確認してください。この回避策の全画面は[Got ZEC on Solana? Move it to shielded Zcash](/using-zcash/solana-zec-to-shielded)にあります。

---

## **次のステップ**
ネイティブのZECがZcashウォレットに入ったら、[ZECをプライベートに使う](/guides/using-zec-privately)ことで、シールドされた状態を維持しましょう。

PhantomのSwapボタンで購入したZECトークンは、Phantomからシールドできません。そのトークンはSolana上のOmniBridgeアセットです。[で移動しましょう。Solana上にZECをお持ちですか？シールドされたZcash](/using-zcash/solana-zec-to-shielded)へ移動しましょう。

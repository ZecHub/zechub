# **SOL/USDCからZECへのスワップ：Encrypt.tradeを使用**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*SolanaからZcashへスワップします。クロスチェーンの処理はNear Intentsを経由します。*  

---

###  はじめに  
[**encrypt.trade**](https://encrypt.trade/zec)は、JMD Labs Inc.が運営するSolanaアプリです。Solana上の**SOLまたはUSDC**を**Zcash（ZEC）**へスワップできます。トークンはまず暗号化されたバージョンにラップされるため、Solana上では金額が隠され、その後Near Intentsを通じてZECにスワップされます。

このスワップにはプライベートな側面もありますが、すべてがプライベートになるわけではありません。アプリ自身の[ドキュメント](https://docs.encifher.io/docs)には、チェーンとのやり取りは匿名ではないと記載されています。あなたのウォレットがアプリを使用したことは他者に見えますが、移動した金額は見えません。また、ZECはトランスペアレントアドレスに届くため、シールドするまでZcashチェーン上で表示されたままです。


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  スワップ前に知っておくこと  
- **Solana側。** ラップにより金額は隠れますが、ウォレットアドレスとアプリの利用は公開されます。[ベストプラクティス](https://docs.encifher.io/docs/best-practices)では、単純なラップ、スワップ、アンラップの流れではトランザクションを関連付けられる可能性があると警告されています。
- **暗号化。** 暗号化された残高は、ハードウェアエンクレーブ（TEE）内でオフチェーン処理されます。開発者の[論文](https://eprint.iacr.org/2026/1504)によると、これは暗号技術だけでなく、TEEの完全性、誠実な閾値鍵管理、クラウドのアテステーションルートにも依存します。
- **クロスチェーン処理。** ZECへのスワップはNear Intentsを経由し、独立したソルバーが注文を処理します。
- **Zcash側。** Near Intentsは、ZECについて[トランスペアレントアドレスのみ](https://docs.near-intents.org/resources/chain-support)をサポート対象として掲載しています。また、2026年9月にこのガイドを確認した時点では、encrypt.tradeのZEC欄はトランスペアレントアドレス（t1またはt3）のみを受け付けていました。トランスペアレントアドレスでは、シールドするまで残高と受信した送金が公開されます。
- **スクリーニング。** アプリは接続するウォレットをTRMやChainalysisなどのデータベースで確認します。また、[コンプライアンスページ](https://docs.encifher.io/docs/compliance)には、正当な法的根拠がある場合、暗号化された記録を確認できると記載されています。Near Intentsも独自の[スクリーニング](https://docs.near-intents.org/security-compliance/risk-and-compliance)を実施しています。

---

###  ステップ1：Solanaウォレットを接続する  
**ChromeまたはFirefox**で[encrypt.trade](https://encrypt.trade/zec)にアクセスし、**Phantom**、**Solflare**、または**Slope**ウォレットを接続します。ウォレットにガス料金用の十分な**SOL**と、取引したいトークンがあることを確認してください。接続後、資産をラップする準備が整います。  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  ステップ2：トークンをラップする  
**Wrap**セクションに移動します。**SOL**または**USDC**を選択し、金額を入力して確認します。アプリは資産をロックし、**暗号化バージョン（eSOLまたはeUSDC）**を発行します。スワップする額と異なる額をラップすると、金額によって両者を対応付けることは難しくなりますが、ウォレットがアプリを利用した事実は隠されません。  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  ステップ3：ZODLウォレットを準備する  
[**ZODL**](https://zodl.com)をダウンロードします。これはZODLが管理するZcashウォレットです。受取画面で、**Zcashトランスペアレントアドレス**（t1で始まります）をコピーします。encrypt.tradeは現在、ZECについてシールドアドレスまたは統合アドレスを受け付けていません。先に進む前に、シードフレーズを安全に保管してください。  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  ステップ4：スワップする  
**encrypt.trade**に戻り、**Swap**に移動します。**eSOL/eUSDC -> ZEC**を選択し、ZODLのトランスペアレントアドレスを貼り付け、詳細を確認して確定します。



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents**がクロスチェーンのルーティングを処理し、**ZEC**をあなたのZODLウォレットに送ります。数分かかる場合があります。Near Intentsは、クロスチェーンスワップには最大15分を見込むよう案内しています。  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  ステップ5：ZECをシールドする  
ZECが届いたら、ZODLの**Shield**オプションを使用して、[シールドプール](/using-zcash/shielded-pools)へ移動します。それまでは、誰でも残高を確認できるトランスペアレントアドレスに置かれます。シールドすると以降の操作は保護されますが、受信した送金とシールドのトランザクションはチェーン上で引き続き表示されます。常にリンクを確認し、アドレスの再利用を避け、まず少額でテストしてください。  

---

###  関係者とサポートの入手先  
- **encrypt.trade**はJMD Labs Inc.が運営するアプリです。[プライバシーポリシー](https://encrypt.trade/privacy)には、IP、ブラウザ、デバイスの詳細などの技術データを収集し、スワップ前にウォレットアドレス、最近の履歴、残高をコンプライアンス提供者へ送信し、ログとAMLスクリーニング結果を最長5年間保存する場合があると記載されています。[利用規約](https://encrypt.trade/terms)では、所在地を隠すためのVPNまたはプロキシの利用が禁止されています。サポート：help@encifher.io、またはアプリからリンクされている[Telegramグループ](https://t.me/+ZWHGMW4ZHXQwYTZl)。
- **Near Intents**はクロスチェーンの処理をルーティングし、ZECを届けます。[1Click API利用規約](https://docs.near-intents.org/security-compliance/terms-of-service)とnear.com/privacyのプライバシーポリシーを参照し、[Near Intents Explorer](https://explorer.near-intents.org)でスワップを追跡できます。サポートが必要な場合は、[Near Intents Telegram](https://t.me/near_intents)で問い合わせてください。

利用規約と対応アドレスは変更される場合があるため、大きな額をスワップする前に最新の内容を確認してください。より広い視点については、[ノンカストディアル取引所](/using-zcash/non-custodial-exchanges)を参照してください。

---

**Solana**、**Zcash**、**Near Intents**を組み合わせることで、**encrypt.trade**はSOLまたはUSDCからZECへの迅速なルートを提供します。Solana上では金額を隠せますが、エンドツーエンドでプライベートになるわけではないため、ZECが到着したらシールドしてください。

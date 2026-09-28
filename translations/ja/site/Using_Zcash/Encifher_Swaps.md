# **SOL/USDC -> ZEC スワップ：Encrypt.tradeを使用**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*SolanaからZcashへスワップします。クロスチェーンの処理はNear Intentsを経由します。*  

---

###  はじめに  
[**encrypt.trade**](https://encrypt.trade/zec)は、JMD Labs Inc.が運営するSolanaアプリです。Solana上の**SOLまたはUSDC**を**Zcash（ZEC）**へスワップできます。トークンはまず暗号化されたバージョンにラップされるため、Solana上では金額が隠され、その後Near Intentsを通じてZECへスワップされます。

このスワップにはプライベートな側面もありますが、すべてがプライベートになるわけではありません。アプリ自身の[ドキュメント](https://docs.encifher.io/docs)では、チェーンとのやり取りは匿名ではないと説明されています。つまり、あなたのウォレットがアプリを使用したことは他者に確認できますが、移動した金額は確認できません。ZECは透明アドレスにも到着するため、シールドするまでZcashチェーン上で可視のままです。


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  スワップ前に知っておくこと  
- **Solana側。** ラップにより金額は隠れますが、ウォレットアドレスとアプリの利用は公開されます。[ベストプラクティス](https://docs.encifher.io/docs/best-practices)では、単純なラップ、スワップ、アンラップを行うと、トランザクションが関連付け可能になると警告しています。
- **暗号化。** 暗号化された残高は、ハードウェアエンクレーブ（TEE）内でオフチェーン処理されます。開発者の[論文](https://eprint.iacr.org/2026/1504)では、これは暗号技術だけに依存するのではなく、TEEの完全性、正直な閾値鍵管理、およびクラウド認証ルートに依存すると説明されています。
- **クロスチェーン処理。** ZECへのスワップはNear Intentsを経由し、独立したソルバーが注文を執行します。
- **Zcash側。** Near Intentsでは、ZECは[透明アドレスのみ](https://docs.near-intents.org/resources/chain-support)でサポートされていると記載されています。また、2026年9月にこのガイドを確認した時点で、encrypt.tradeのZECフィールドでは透明（t1またはt3）アドレスのみ受け付けられました。透明アドレスでは、シールドするまで残高と受信送金が公開されます。
- **スクリーニング。** アプリは接続するウォレットをTRMやChainalysisなどのデータベースと照合します。また、その[コンプライアンスページ](https://docs.encifher.io/docs/compliance)では、正当な法的理由がある場合、暗号化された記録が確認される可能性があるとしています。Near Intentsも独自に[スクリーニング](https://docs.near-intents.org/security-compliance/risk-and-compliance)を実施しています。

---

###  ステップ1：Solanaウォレットを接続する  
**ChromeまたはFirefox**で[encrypt.trade](https://encrypt.trade/zec)にアクセスし、**Phantom**、**Solflare**、または**Slope**ウォレットを接続します。ウォレットにガス料金用の十分な**SOL**と、取引したいトークンが入っていることを確認してください。接続したら、資産をラップする準備が整います。  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  ステップ2：トークンをラップする  
**Wrap**セクションに移動します。**SOL**または**USDC**を選択し、金額を入力して確認します。アプリは資産をロックし、**暗号化バージョン（eSOLまたはeUSDC）**を発行します。スワップする金額とは異なる金額をラップすると、金額によって両者を照合しにくくなりますが、ウォレットがアプリを使用した事実は隠れません。  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  ステップ3：ZODLウォレットを準備する  
[**ZODL**](https://zodl.com)をダウンロードします。これはZODLが管理するZcashウォレットです。受信画面で、**Zcash透明アドレス**（t1で始まります）をコピーします。encrypt.tradeは現在、ZEC向けにシールドアドレスまたは統合アドレスを受け付けていません。続行する前に、シードフレーズを安全に保管してください。  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  ステップ4：スワップする  
**encrypt.trade**に戻り、**Swap**へ進みます。**eSOL/eUSDC -> ZEC**を選択し、ZODL透明アドレスを貼り付け、詳細を確認して確定します。



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents**がクロスチェーンのルーティングを処理し、**ZEC**をZODLウォレットへ送信します。数分かかる場合があります。Near Intentsは、クロスチェーンスワップには最大15分を見込むよう案内しています。  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  ステップ5：ZECをシールドする  
ZECが到着したら、ZODLの**Shield**オプションを使用して、[シールドプール](/using-zcash/shielded-pools)へ移動します。それまでは、残高を誰でも確認できる透明アドレスに置かれています。シールドによりその後の操作は保護されますが、受信送金とシールドトランザクションはチェーン上で可視のままです。常にリンクを確認し、アドレスの再利用を避け、まず少額で試してください。  

---

###  関係者とサポートの利用先  
- **encrypt.trade**はJMD Labs Inc.が運営するアプリです。[プライバシーポリシー](https://encrypt.trade/privacy)では、IPアドレス、ブラウザ、デバイスの詳細などの技術データを収集し、スワップ前にウォレットアドレス、最近の履歴、残高をコンプライアンス提供者へ送信し、ログとAMLスクリーニング結果を最長5年間保持する可能性があると記載されています。[利用規約](https://encrypt.trade/terms)では、位置情報を隠すためのVPNまたはプロキシの使用を禁止しています。サポート：help@encifher.io、またはアプリからリンクされている[Telegramグループ](https://t.me/+ZWHGMW4ZHXQwYTZl)。
- **Near Intents**はクロスチェーン処理をルーティングし、ZECを配信します。[1Click API利用規約](https://docs.near-intents.org/security-compliance/terms-of-service)とnear.com/privacyのプライバシーポリシーを確認し、[Near Intents Explorer](https://explorer.near-intents.org)でスワップを追跡できます。サポートは[Near Intents Telegram](https://t.me/near_intents)で依頼してください。

利用規約と対応アドレスは変更される可能性があるため、大きなスワップの前に最新の内容を確認してください。より広い全体像については、[ノンカストディアル取引所](/using-zcash/non-custodial-exchanges)を参照してください。

---

**Solana**、**Zcash**、および**Near Intents**を組み合わせることで、**encrypt.trade**はSOLまたはUSDCからZECへの迅速な経路を提供します。Solana上の金額は隠されますが、エンドツーエンドでプライベートではないため、到着後はZECをシールドしてください。

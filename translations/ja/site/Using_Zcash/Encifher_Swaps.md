<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# SOL/USDC から ZEC への encrypt.trade を使ったスワップ（Swap）

> Solana上のSOLまたはUSDCをZECへスワップし、クロスチェーン（cross-chain）のステップはNEAR Intentsを経由します。

![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


---

## TL;DR

* [encrypt.trade](https://encrypt.trade/zec)は、SOLまたはUSDCを暗号化（Encryption）されたトークン（Token）（eSOL/eUSDC）にラップし、それらをNEAR Intents経由でZECにスワップ（Swap）します。
* 金額はSolana上で隠されますが、あなたのウォレット（Wallet）アドレス（Address）とそのアプリの利用状況は公開されます。
* ZECは公開型（Transparent）（t1/t3）アドレスにのみ送られるため、シールド（Shield）するまではZcashチェーン（Chain）上で見える状態になります。
* ZECが届いたら、すぐにウォレットでシールドしてください。
* アプリとNEAR Intentsはどちらも、コンプライアンスのためにウォレットを審査しています。

---

## コアとなる説明
[**encrypt.trade**](https://encrypt.trade/zec)は、JMD Labs Inc.が運営するSolanaアプリです。Solana上の**SOLまたはUSDC**を**Zcash（ZEC）**にスワップ（swap）できます。まずトークン（token）が暗号化（encryption）されたバージョンにラップされるため、Solana上では金額が隠されます。その後、NEAR Intentsを経由してZECにスワップされます。

このスワップにはプライバシー（privacy）が保たれる面もありますが、すべてではありません。アプリの[ドキュメント](https://docs.encifher.io/docs)によると、チェーンとのやり取りは匿名ではありません。ウォレット（wallet）がアプリを使用したことは見られますが、移動した金額は見られません。ZECは公開型（transparent）アドレスにも到着するため、シールドするまでZcashチェーン上で表示されたままです。


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  スワップ前に知っておくべきこと  
- **Solana側。** ラップにより金額は隠されますが、ウォレットのアドレスとアプリの利用は公開されます。[ベストプラクティス](https://docs.encifher.io/docs/best-practices)では、単純なラップ、スワップ、アンラップの操作によりトランザクション（transaction）が関連付け可能になると警告されています。
- **暗号化（Encryption）。** 暗号化された残高は、ハードウェアエンクレーブ（TEE）内でオフチェーン処理されます。developerの[論文](https://eprint.iacr.org/2026/1504)によると、これは暗号技術だけでなく、TEEの完全性、信頼できる閾値鍵管理、クラウド認証ルートにも依存します。
- **クロスチェーンのステップ。** ZECへのスワップはNEAR Intentsを経由し、独立したソルバーが注文を処理します。
- **Zcash側。** NEAR Intentsは、ZECを[公開型アドレスのみ](https://docs.near-intents.org/resources/chain-support)でサポート対象として挙げています。また、このガイドを2026年9月に確認した時点で、encrypt.tradeのZEC欄では公開型（t1またはt3）アドレスのみが受け付けられました。公開型アドレスでは、シールドするまで残高と受信トランザクションが公開されます。
- **スクリーニング（Screening）。** このアプリは、接続するウォレットをTRMやChainalysisなどのデータベースと照合します。[コンプライアンスページ](https://docs.encifher.io/docs/compliance)には、正当な法的根拠がある場合、暗号化された記録を確認できると記載されています。NEAR Intentsも独自の[スクリーニング](https://docs.near-intents.org/security-compliance/risk-and-compliance)を実施しています。

---

###  ステップ1：Solanaウォレットを接続する  
**ChromeまたはFirefox**で[encrypt.trade](https://encrypt.trade/zec)にアクセスし、**Phantom**、**Solflare**、または**Slope**のウォレットを接続します。ウォレットにガス手数料（fee）用の十分な**SOL**と、取引したいトークンがあることを確認してください。接続後、資産をラップする準備が整います。  


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
[**ZODL**](https://zodl.com)をダウンロードします。これはZODLが維持するZcashウォレットです。受信画面で、**Zcash公開型アドレス**（t1で始まります）をコピーします。encrypt.tradeは現在、ZEC用のシールドされたアドレスまたは統合アドレスを受け付けていません。続行する前に、シードフレーズ（seed phrase）を安全に保存してください。  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  ステップ4：スワップする  
**encrypt.trade**に戻り、**Swap**に進みます。**eSOL/eUSDC -> ZEC**を選択し、ZODLの公開型アドレスを貼り付け、詳細を確認して確定します。



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**NEAR Intents**がクロスチェーンのルーティングを処理し、**ZEC**をZODLウォレットに送信します。数分かかる場合があります。NEAR Intentsでは、クロスチェーンスワップには最大15分を見込むよう案内しています。  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  ステップ5：ZECをシールドする  
ZECが到着したら、ZODLの**Shield**オプションを使用して、[シールドされたプール（pool）](/using-zcash/shielded-pools)へ移動します。それまでは、誰でも残高を確認できる公開型アドレスに置かれます。シールドにより次に行うことは保護されますが、受信トランザクションとシールドのトランザクションはチェーン上で表示されたままです。常にリンクを確認し、アドレスの再利用を避け、まず少額で試してください。  

---

###  関係者とサポートの利用先  
- **encrypt.trade**はJMD Labs Inc.が運営するアプリです。[プライバシーポリシー](https://encrypt.trade/privacy)によると、IP、ブラウザ、デバイスの詳細といった技術データを収集し、スワップ前にウォレットアドレス、最近の履歴、残高をコンプライアンスプロバイダーへ送信します。また、ログとAMLスクリーニング結果を最大5年間保持する場合があります。[利用規約](https://encrypt.trade/terms)では、所在地を隠すためのVPNまたはプロキシの使用が禁止されています。サポート：help@encifher.io、またはアプリからリンクされている[Telegramグループ](https://t.me/+ZWHGMW4ZHXQwYTZl)。
- **NEAR Intents**はクロスチェーンのステップをルーティングし、ZECを配信します。[1Click API利用規約](https://docs.near-intents.org/security-compliance/terms-of-service)およびnear.com/privacyのプライバシーポリシーを確認し、[NEAR Intents Explorer](https://explorer.near-intents.org)でスワップを追跡できます。サポートは[NEAR Intents Telegram](https://t.me/near_intents)でお問い合わせください。

利用規約とサポートされるアドレスは変更される場合があるため、大きな金額をスワップする前に最新バージョンを確認してください。より広い視点については、[ノンカストディアル取引所](/using-zcash/non-custodial-exchanges)を参照してください。

---

**Solana**、**Zcash**、**NEAR Intents**を組み合わせることで、**encrypt.trade**はSOLまたはUSDCからZECへの迅速な経路を提供します。Solana上の金額は隠されますが、エンドツーエンドでプライベートではないため、ZECが到着したらシールドしてください。

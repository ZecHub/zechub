# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> シールドされたZECでAIサービスにプライベートに支払う

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  初心者向け - 10分
</span>


## 要約

- **NanoGPT**は、アカウントもメールアドレスも不要で、シールドされたZECを直接受け取れます
- 最低チャージ額は**$0.10**なので、少額で試せます
- 最初の承認時に、約**30秒**でクレジットが反映されます
- ZECを受け取らないサービスでは、**CrossPay**を使ってシールドされたZECを支払い、相手にはUSDCで支払えます
- チェーン上に記録される内容は、**ZECがどのプール（pool）にあるか**によって決まりますが、画面上では分かりません

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> これは誰のためのものですか？

- 氏名に紐づくAIサブスクリプションを望まない人
- 法人カードなしで推論に支払うdeveloper
- AIサービスへのカード支払いが失敗する国にいる人
- モデルを試すためにメールアドレスを渡したくない人

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 問題点

通常、AIへの支払いにはカード、メールアドレス、アカウントが必要です。これにより、入力するすべてのプロンプトが法的身元に紐づき、決済代行業者にもそれが見えてしまいます。

暗号資産はこれを解決するはずですが、多くのガイドは古くなっています。サービスが受け付けるものは変わるため、1年前に書かれた手順では、もはや使えない方法に誘導される可能性があります。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> なぜZcashなのですか？

シールドされた支払い（payment）は、送信者、受信者、金額を隠します。サービスには支払いが届き、チェーンを監視する人にも、誰がいくら支払ったかは分かりません。

ただし、これはシールドされた資金**から**支払う場合に限られます。このページでは、それが成り立つ場合と成り立たない場合を具体的に説明します。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 必要なもの

- **シールドされた**残高のZEC
- 統合アドレスに送信できるウォレット（Wallet）。この手順ではブラウザー拡張機能の**Noir Wallet**を使用するため、すべての操作を1つのウィンドウ内で完結できます。ZkoolとZodlも同様に使えます
- 手順を進めるための約$1

> **取引所から送金しますか？** Binanceを含むほとんどの取引所（exchange）は、ZECを**公開型**アドレスにしか出金できず、送付先として`u1...`アドレスを受け付けません。まず自分の公開型アドレスへ出金し、ウォレットでシールドしてから、シールドされた残高から支払ってください。

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 方法1：NanoGPTに直接支払う

[NanoGPT](https://nano-gpt.com/)では、GPT、Claude、Gemini、画像モデルを含む200以上のモデルを利用でき、ZECをネイティブに受け付けます。

### ステップ1：開くだけです。登録は不要です

nano-gpt.comにアクセスして使い始めてください。すべてのセッションはデフォルトで匿名であり、アプリ自体も「すでにNanoGPTをプライベートに利用しています」と示しています。作成するアカウントも、渡すメールアドレスもありません。

### ステップ2：先にサインイントークンを保存する

入金前に**Settings**を開き、サインイントークンを作成して安全な場所に保管してください。

> **この手順は資金を保護します。** 匿名の残高はブラウザーのローカルデータ内に保存されます。保存済みトークンなしでCookieを削除すると、残高は失われ、復旧に使えるアカウントもありません。入金後ではなく、入金前に行ってください。

### ステップ3：残高を追加する

**Balance**を開き、**Custom**を選択して金額を入力します。最低額は**$0.10**、最高額は$5,000です。NanoGPTは、$1でGPT 5.5のプロンプト約12回、または画像18枚を利用できると案内します。

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### ステップ4：Zcashを選ぶ

**Digital currencies**を選択し、一覧から**Zcash**を選びます。

選択した金額に対するQRコード、支払いアドレス、ZEC建ての**送金最低額**が表示されます。この金額はページ読み込み時点の価格に基づいています。

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### ステップ5：ウォレットから送信する

アドレスをウォレットにコピーし、金額を入力して送信します。ネットワーク手数料（fee）は約**0.00015 ZEC**です。

> **最低額より少し多めに送ってください。** 見積もりはページ読み込み時に価格設定され、トランザクションが承認される前にZECの価格が変動します。テストでは、最低額ちょうどを送ると$1.00ではなく**$0.99**が反映されました。実際に送った額がNanoGPTにより反映されるため、少し多めに送ると、同じ名目$1に対して$1.17が反映されました。

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### ステップ6：約30秒待つ

ウォレットにはトランザクションが保留中と表示され、その後承認されます。NanoGPTは**最初の承認**で残高を反映するため、3回すべての承認を待つ必要はありません。

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

残高が表示され、すぐに使えます。

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> 方法2：ZECを受け取らないサービス

ほとんどのAIサービスはZECを受け付けません。**Venice.ai**と**OpenRouter**はいずれも代わりにUSDCを受け付け、OpenRouterではチェックアウトをどのチェーンで決済するか選択できます。

このような場合は、[Zodl](/zcash-organizations/zodl)内の**CrossPay**を使用します。シールドされたZECを支払い、中央集権型取引所やKYCを介さずにNEAR Intents経由でルーティングされ、受取人には要求した資産で支払われます。

1. サービスの支払いアドレスと、求められる資産およびチェーンを取得します。例：USDCのBase
2. Zodlを開き、**CrossPay**を選択します
3. そのアドレスを入力し、サービスが求める資産を選択して、金額を入力します
4. シールドされた残高から送信します

ZECはシールドされた状態で出ていきます。サービスには通常のUSDC支払いが届き、それがZECから始まったことは分かりません。

> スワップ（swap）の区間は送付先チェーン上で可視化されるため、USDCの支払い自体は、他のUSDC支払いと同じように公開されます。プライベートに保たれるのはZcash側と、両者のつながりです。

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 各段階で明らかになること

ここは多くのガイドが省略している部分です。

| 起こること | サービスが知ること | チェーン上に記録されること |
|---|---|---|
| 閲覧とプロンプト入力 | 何もありません。アカウントもメールアドレスも不要です | 何もありません |
| 入金アドレスが発行される | 何もありません | 何もありません |
| **Saplingから**支払う | 使用した入金アドレス | 何もありません。シールドされた状態からシールドされた状態への送金です |
| **Ironwoodから**支払う | 同じです | **金額とブロック高** |
| 公開型アドレスから支払う | 同じです | 金額とtアドレス |
| 上記のいずれの場合も | TorまたはVPNを使用しない限り、IPアドレス | 該当しません |

### プールが重要な理由

NanoGPTの入金アドレスは統合アドレスです。2026年8月に発行されたアドレスをデコードすると、受信者は**Sapling**と**Orchard**のちょうど2つであることが分かります。

[Ironwood](/zcash-tech/ironwood)アップグレードが2026年7月28日に有効化されて以降、Orchardは送信専用となり、新しい価値を受け入れられません。したがって、実際に支払いを受け取れる受信者は**Saplingだけ**です。

つまり、ZECがすでにSaplingにある場合、支払いはSaplingからSaplingへの送金となり、公開される情報はありません。しかし、Ironwoodへ移行済みの場合、支払いによって価値がプール境界を越えて移動し、[ターンスタイル（turnstile）](/zcash-tech/the-turnstile)により、送信者と受信者が隠されたままでも金額とブロック高が公開されます。

どちらの場合でも画面表示は同じです。支払い用に少額のSapling残高を維持することが最も簡単な対策です。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 避けるべきよくある間違い

- サインイントークンを保存する前に入金し、その後Cookieを削除する
- 送金最低額ちょうどを送って、1セント足りなくなる
- 取引所から`u1...`アドレスへ直接出金しようとする
- どのプールから支払ったかを確認せず、支払いがプライベートだと考える
- 特定されないことが目的なのに、通常の接続で支払う

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 結果

次のことができます。

- アカウント、メールアドレス、カードなしで最先端のAIモデルを利用する
- シールドされたZECで支払い、それによって何が隠れ、何が隠れないかを正確に理解する
- CrossPayを通じて、Zcashを一度も聞いたことがないサービスにもアクセスする

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 関連項目

- [Ironwood](/zcash-tech/ironwood) - 資金が置かれているプールが変わった理由
- [ターンスタイル](/zcash-tech/the-turnstile) - 価値がプールを越える際に公開されるもの
- [ウォレット](/using-zcash/wallets) - 維持管理されているウォレット
- [ZODL](/zcash-organizations/zodl) - CrossPayの背後にあるウォレット

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> 進捗

**ステップ1/1**

シールドされたZECでAIサービスに支払い、それによって何が明らかになったかを理解しました。

<br/>

## 次のステップ

- [身元を紐づけずに送金する](/zcash-use-cases/send-money-without-linking-identity)

<br/>

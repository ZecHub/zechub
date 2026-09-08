# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Shielded ZECでAIサービスにプライベートに支払う

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  初級 - 10分
</span>


## 要点

- **NanoGPT** はshielded ZECを直接受け付けており、アカウントもメールアドレスも不要
- 最低チャージ額は **$0.10** なので、小銭感覚で試せる
- クレジットは最初の承認時、約 **30秒** で反映される
- ZECを受け付けないサービスには、**CrossPay** を使ってshielded ZECを支払い、相手にはUSDCで支払ってもらえる
- オンチェーンに最終的に何が残るかは、**あなたのZECがどのプールにあるか** によって決まり、その画面ではそれはわからない

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> これは誰向け？

- 自分の名前に紐づいたAIサブスクリプションを避けたい人
- 法人カードなしで推論利用料を支払う開発者
- AIサービスへのカード決済が通らない国にいる人
- モデルを試すためにメールアドレスを渡したくない人

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 問題点

通常、AIへの支払いにはカード、メールアドレス、そしてアカウントが必要です。つまり、あなたが書くすべてのプロンプトが法的な身元に結びつき、決済処理業者にもそれが見えてしまいます。

本来Cryptoはこれを解決するはずですが、ほとんどのガイドは古くなっています。サービス側が受け付けるものは変わるため、1年前に書かれた手順では、もう機能しないルートに進まされることがあります。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> なぜZcashなのか？

shielded支払いでは、送信者、受信者、金額が隠されます。サービスには支払いが届き、チェーンを見ている第三者には、誰がいくら支払ったのか分かりません。

ただし、これは **shielded資金から** 支払った場合に限ります。このページでは、それが成り立つ場合と成り立たない場合を明確に区別しています。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 必要なもの

- **shielded** 残高のZEC
- unified address に送金できるウォレット。この手順ではブラウザ拡張機能の **Noir Wallet** を使うので、全体の流れを1つのウィンドウ内で完結できます。Zkool と ZODL でも同じように使えます
- 試すには約 $1

> **取引所から来る場合は？** Binance を含むほとんどの取引所は、ZECを **transparent** アドレスにしか出金できず、宛先として `u1...` アドレスを受け付けません。まず自分の transparent アドレスに出金し、その後ウォレット内でshield化してから、shielded 残高から支払ってください。

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> ルート1: NanoGPTに直接支払う

[NanoGPT](https://nano-gpt.com/) ではGPT、Claude、Gemini、画像モデルを含む200以上のモデルが使え、ZECをネイティブに受け付けています。

### ステップ1: 開く。登録は不要

nano-gpt.com にアクセスしてそのまま使い始めてください。すべてのセッションはデフォルトで匿名であり、アプリ自身もそう明言しています: *"You are already using NanoGPT privately."* 作成するアカウントも、渡すメールアドレスもありません。

### ステップ2: まずサインイントークンを保存する

入金する前に、**Settings** を開いてサインイントークンを作成し、安全な場所に保存してください。

> **この手順はあなたのお金を守ります。** 匿名の残高はブラウザのローカルデータに保存されます。保存済みトークンなしでCookieを削除すると、その残高は消え、復元できるアカウントもありません。これは入金後ではなく、入金前に行ってください。

### ステップ3: 残高を追加する

**Balance** を開き、**Custom** を選んで金額を入力します。最低額は **$0.10**、上限は $5,000 です。NanoGPTはその金額で何が買えるかも表示しており、$1で GPT 5.5 のプロンプト約12回分、または画像18枚程度です。

![カスタム金額と10セントの最低額を示すNanoGPTの残高追加画面](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### ステップ4: Zcashを選ぶ

**Digital currencies** を選び、次に一覧から **Zcash** を選びます。

すると、QRコード、支払いアドレス、そして選んだ金額に対するZEC建ての **transfer minimum** が表示されます。この数値はページ読み込み時点の価格で計算されています。

![QRコード、unified address、送金最低額を表示したNanoGPTのZcash入金画面](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### ステップ5: ウォレットから送金する

アドレスをウォレットにコピーし、金額を入力して送金します。ネットワーク手数料は約 **0.00015 ZEC** です。

> **最低額を少し上回るように送ってください。** 見積もりはページ読み込み時点の価格で計算され、トランザクションが承認されるまでの間にZEC価格は動きます。テストでは、最低額ちょうどを送ると **$1.00** ではなく **$0.99** しか反映されませんでした。少し上回る額を送ると、同じ名目上の$1でも $1.17 が反映されました。NanoGPTは実際に送られた額をクレジットするためです。

![NanoGPTのアドレスが貼り付けられ、ネットワーク手数料が表示されたNoir Walletの送金画面](/content-images/noir-send-6380a5f4ef.webp)

### ステップ6: 約30秒待つ

ウォレットにはトランザクションが保留中と表示され、その後承認されます。NanoGPTは **最初の承認** で残高を反映するため、3回すべてを待つ必要はありません。

![送金額とトランザクションハッシュを示すウォレットの承認画面](/content-images/noir-sent-2d476e94b9.webp)

残高が表示され、すぐに使えます。

![反映済み残高と入金履歴を表示したNanoGPTの残高ページ](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> ルート2: ZECを受け付けないサービス

ほとんどのAIサービスはZECを受け付けていません。**Venice.ai** と **OpenRouter** はどちらも代わりにUSDCを受け付けており、OpenRouterではどのチェーンで決済を完了させるかも選べます。

このような場合は、[Zodl](/zcash-organizations/zodl) の **CrossPay** を使います。あなたはshielded ZECを支払い、受取側には相手が求めた資産で支払われます。経路には NEAR Intents が使われ、中央集権型取引所もKYCも不要です。

1. サービスの支払いアドレスと、要求されている資産およびチェーンを取得します。たとえば Base 上の USDC です
2. Zodl を開いて **CrossPay** を選びます
3. そのアドレスを入力し、サービスが求める資産を選び、金額を入力します
4. shielded 残高から送金します

あなたのZECはshieldedから出ていきます。サービス側には通常のUSDC支払いが到着したように見えるだけで、それがもともとZECだったことは分かりません。

> スワップ部分は宛先チェーン上で見えるため、USDC支払い自体は他のUSDC支払いと同じく公開されています。プライベートなままなのはZcash側と、その2つの間の結びつきです。

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 各ステップで何が明らかになるか

ここが、ほとんどのガイドで省かれている部分です。

| 何が起こるか | サービス側に分かること | オンチェーンに残るもの |
|---|---|---|
| 閲覧とプロンプト入力 | 何もない。アカウントもメールアドレスも不要 | 何もない |
| 入金アドレスが発行される | 何もない | 何もない |
| **Saplingから** 支払う | 使用した入金アドレス | 何もない。Shielded から shielded |
| **Ironwoodから** 支払う | 同じ | **金額とブロック高** |
| **transparent addressから** 支払う | 同じ | 金額とあなたの t-address |
| 上記のいずれの場合も | Tor や VPN を使わなければあなたのIP | 該当なし |

### なぜプールが重要なのか

NanoGPT の入金アドレスは unified address です。2026年8月に発行されたものをデコードすると、受信先は **Sapling** と **Orchard** の2つだけであることが分かります。

[Ironwood](/zcash-tech/ironwood) アップグレードが 2026年7月28日 に有効化されて以降、Orchard は出金専用となり、新しい価値をそこへ入れることはできなくなりました。つまり、**実際に支払いが着地できる受信先は Sapling だけ** ということです。

したがって、あなたのZECがすでにSaplingにあるなら、その支払いはSaplingからSaplingへの移動であり、それについて公開される情報はありません。しかし、すでにIronwoodへ移行している場合、支払いはプール境界をまたいで価値を移動させることになり、送信者と受信者は隠されたままでも、[the turnstile](/zcash-tech/the-turnstile) によって金額とブロック高が公開されます。

どちらの場合でも画面表示は同じです。支払い用に少額のSapling残高を維持するのが、最も簡単な対策です。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 避けるべきよくあるミス

- サインイントークンを保存する前に入金し、その後Cookieを削除してしまう
- transfer minimum ちょうどを送って、1セント足りなくなる
- 取引所から直接 `u1...` アドレスへ出金しようとする
- どのプールから支払ったか確認せず、その支払いがプライベートだと思い込む
- 身元を知られたくないのが目的なのに、通常の接続で支払う

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 結果

次のことができます:

- アカウント、メールアドレス、カードなしで最先端のAIモデルを使う
- shielded ZECで支払い、それによって何が隠れ、何が隠れないかを正確に理解する
- CrossPay を通じて、Zcashを知らないサービスにも到達する

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 関連

- [Ironwood](/zcash-tech/ironwood) - 資金が置かれているプールがなぜ変わったのか
- [The Turnstile](/zcash-tech/the-turnstile) - 価値がプール間を移動するときに何が公開されるのか
- [ウォレット](/using-zcash/wallets) - どのウォレットがメンテナンスされているか
- [ZODL](/zcash-organizations/zodl) - CrossPay を支えるウォレット

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> 進捗

**ステップ 1 / 1**

shielded ZECでAIサービスに支払い、その際に何が明らかになったかを理解しました。

<br/>

## 次のステップ

- [身元を紐づけずに送金する](/zcash-use-cases/send-money-without-linking-identity)

<br/>

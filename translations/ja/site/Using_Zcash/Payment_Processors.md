---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 決済プロセッサ

加盟店として ZEC を受け取る方法を、横並びで比較しています。すべての項目は **2026年7月29日** 時点で、各プロバイダー自身のサイトと API をもとに確認しました。

プライバシー資産への対応は頻繁に変わるため、各行にはそれぞれ確認日を記載しています。これを数か月後に読んでいる場合は、導入前に必ずプロバイダーのサイトを確認してください。

<div class="processor-table">

| プロセッサ | カストディ | Shielded ZEC | セルフホスト | 加盟店手数料 | 地域 / KYC | 確認日 |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | 非カストディアル | はい、Unified Address 経由の Orchard | はい、オープンソース | 支払いごとに 1%、セルフホストなら無料 | KYC なし、地域は記載なし | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | 非カストディアル、view key のみ | はい、shielded のみ（Sapling、Orchard、UA） | はい、オープンソース | なし、支払うのはネットワーク手数料のみ | グローバル、KYC なし | 2026-07-29 |
| [ZGo](https://zgo.cash/) | 非カストディアル | はい、Sapling と Orchard | いいえ、ホスト型サービス | プリペイドセッション制、価格は非公開 | KYC の記載なし、地域の記載なし | 2026-07-29 |
| [Flexa](https://flexa.co/) | 顧客は自己管理、加盟店は法定通貨で精算 | 顧客は shielded を利用可能、受取側は文書化されていない | いいえ | 支払いごとに 1% | 米国および SEPA 37か国、EU での ZEC は未確認 | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | 既定では非カストディアル | いいえ、transparent address のみ | いいえ | 0.5%、換金ありなら 1% | 禁止地域を除きグローバル、開始時は KYC なし | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | マーケティング上の表現に反してカストディアル | 文書化されていない | いいえ | API は 0.5%、ホワイトラベルは 1.5% | 受取に KYC 不要 | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | カストディアル、オフチェーン | いいえ、shielded からの入金は拒否 | いいえ | ウォレット間は無料、支払いは 0.8% | 地域制限あり、FR・ES・IT・PL では ZEC 上場廃止 | 2026-07-29 |

</div>

### 各列の意味

**カストディ** は、そのプロセッサがあなたの ZEC を保管するかどうかです。非カストディアルであれば、資金はあなたが管理するウォレットに入ります。

**Shielded ZEC** は、shielded pool で支払いを受け取れるかどうかです。transparent のみということは、金額とアドレスがブロックチェーン上で公開されるという意味です。

**セルフホスト** は、間に企業を挟まず、自分でそのソフトウェアを動かせるかどうかです。

**加盟店手数料** には Zcash のネットワーク手数料は含まれません。ネットワーク手数料は、どの場合でも誰かが支払います。

プロバイダーが何かを公表していない場合、この一覧では推測せず「記載なし」または「文書化されていない」としています。これは「ない」と同じ意味ではありません。

### どれを選ぶべきか

プライバシーとコントロールを最優先するなら、**BTCPay Server** またはセルフホストの **CipherPay** を使ってください。どちらも shielded 対応、オープンソースで、資金を預かりません。

オンラインではなく店舗で支払いを受けるなら、**Flexa** を使ってください。

ホスト型ゲートウェイで transparent 支払いを許容できるなら、**NOWPayments** または **Plisio** を使ってください。

繰り返し強調する価値のある注意点がひとつあります。transparent のみのプロセッサでは、すべての支払い金額とアドレスがブロックチェーン上に公開されます。また、ホスト型の非カストディアルプロセッサでは、viewing key を相手に渡すことになるため、その企業は支払いを使えなくても内容を見ることはできます。これを避ける唯一の方法はセルフホストです。

<div class="processor-note">

**ZGo サービス警告、2026年7月29日。** このページの確認中、api.zgo.cash の ZGo バックエンドは全エンドポイントで HTTP 503 を返しました。プロジェクトが放棄されたわけではなく、保守担当者は今月もコミュニティで活動していましたが、依存する前にサービスが稼働していることを確認してください。

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Support Type**: Shielded（Orchard、Unified Addresses 経由）
- **Description**: 数分で Zcash を受け付け可能、非カストディアル、購入者データ不要、中間業者なし。
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

CipherPay には閲覧専用キーを渡すため、支払いは直接あなた自身のウォレットに入り、CipherPay が資金を保管することはありません。請求書ごとに新しいアドレスを使います。

Orchard のみです。リポジトリの README には Sapling への言及がありますが、Sapling や transparent への対応はありません。

料金は支払いごとに 1% で、自分で動かすなら完全に無料です。全体がオープンソースで、Rust バイナリ + SQLite としても、Docker イメージとしても提供されています。KYC はなく、購入者にアカウントも必要ありません。

連携先として、Shopify、WooCommerce、REST API、ホスト型チェックアウト、支払いリンク、対面用 QR に対応しています。

検討すべき点が 2 つあります。2026年2月に開始されたばかりで、公開されたセキュリティ監査はありません。また、ホスト型プランでは運営者があなたの Viewing Key を保持するため、支払い内容を見ることができます。セルフホストならそれはなくなります。さらに、shielded 支払いは確定後に取り消せないため、返金には購入者からアドレスを教えてもらう必要があります。

**最終確認日:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Support Type**: Shielded のみ（Sapling、Orchard、Unified Address）
- **Description**: BTCPay Server は、オープンソースでセルフホスト可能な暗号資産決済プロセッサです。
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

カストディ面では最も強力な選択肢です。ウォレットのバックエンドは閲覧専用で、シードも秘密鍵も保持しないため、たとえサーバーが侵害されてもあなたのお金を使われることはありません。

shielded のみ対応で、Sapling、Orchard、Unified Addresses をカバーします。transparent へのフォールバックはないので、それを前提にしないでください。

インストールには、feat/zec ブランチ上の btcpay-zcash Docker fork と、Ywallet や Zingo のようなウォレットからエクスポートした Viewing Key が必要です。デフォルトではリモートの lightwalletd と通信しますが、自分で Zebra と lightwalletd を動かすこともできます。

知っておくべき制限がひとつあります。このプラグインは 1 つのインスタンス上のすべてのストアで単一の Zcash ウォレットを使うため、共有サーバー上では運用しないでください。ストアごとのウォレットは現在開発中です。

ソフトウェア自体に手数料はありません。支払うのは Zcash のネットワーク手数料と、ホスティング費用だけです。

**最終確認日:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Support Type**: Shielded（Sapling と Orchard）
- **Description**: ZGo は、第三者を介さず、顧客からあなたへ直接支払いが届く電子決済プラットフォームです。
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

ブラウザで動くレジなので、ノート PC、タブレット、スマートフォンがそのままチェックアウト端末になります。WooCommerce プラグインと REST API もあります。Vergara Technologies によって構築され、zcashd から Zebra への移行を含め、Zcash Community Grants の資金提供を受けています。

資金は顧客からあなたのウォレットへ直接送られ、その間に誰も入りません。

shielded 対応で、Unified Addresses を通じて Sapling と Orchard をカバーし、ZIP 321 に従っています。現在のどの情報源にも transparent address への対応は書かれていないため、このページではもはや対応しているとは記載していません。

実際のところセルフホストはできません。ZGo は Zcash インフラを代行運用しており、デプロイガイドも公開していません。ソースコード自体は保守担当者自身の Git サーバー上で公開されていますが、多くの人が見つける GitLab コピーは 2022 年時点の古いミラーです。

無料でもありません。ZGo はプリペイドセッションを販売しており、WooCommerce には Pro セッションが必要ですが、現在は価格ページにアクセスできないため、ここでは金額を記載していません。

**最終確認日:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Support Type**: 顧客は shielded を利用、受取側は文書化されていない
- **Description**: Flexa は、顧客が Zcash を含むデジタル資産を自己管理ウォレットから小売店舗で使えるようにする決済ネットワークです。
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa はチェックアウトゲートウェイではないため、ここにある他のものの代替にはなりません。顧客は ZODL などの Flexa 対応ウォレットを開き、ワンタイムコードを表示し、店舗がそれをスキャンします。ZEC 請求書も e コマース用プラグインもありません。

顧客は支払う瞬間まで自分のコインを管理し続けます。加盟店であるあなたが ZEC を受け取ることはありません。Flexa はあなたに選んだ通貨で精算するので、暗号資産側は Flexa が処理します。

Flexa 自身の発表では、Zcash 統合は shielded ZEC で支払うものとして説明されています。Flexa がどのアドレスタイプで受け取るのかは、どこにも公開されていません。

手数料は支払いごとに 1% で、換金とカストディは追加料金なしで含まれています。

米国で利用でき、2026年7月以降は SEPA の 37 の国と地域でも利用できます。特に ZEC がヨーロッパで使えるかどうかは記載されていません。

**最終確認日:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Transparent のみ
- **Description**: NOWPayments は、加盟店が Zcash 支払いと寄付を簡単に受け付けられる暗号資産決済ゲートウェイです。
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

shielded 対応はありません。ドキュメントでは、Zcash には transparent address を設定するよう案内されており、ZEC だけがそのように個別指定されています。受け取るすべての支払いはブロックチェーン上で公開されます。

デフォルトでは非カストディアルです。FAQ には、資金は保管せず、秘密鍵も保持しないと書かれています。オプションでカストディ残高もあるため、確実にしたいならアカウント設定を確認してください。

手数料は通常の支払いで 0.5%、複数通貨、固定レート、または「手数料をユーザー負担」にする支払いでは 1% で、これに加えてネットワーク手数料がかかります。

法律で禁止されている地域を除けば世界中で利用可能です。暗号資産の受け付けを始めるのに KYC は不要で、必要なのは法定通貨を引き出すときだけです。

**最終確認日:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Transparent（文書化されていない）
- **Description**: Plisio は、企業が Zcash 支払いを受け付けられる暗号資産決済ゲートウェイです。
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

カストディアルとして扱ってください。Plisio のマーケティングでは非カストディアルとされていますが、自社のヘルプページには、プラットフォーム上で保持される残高、コールドストレージ、出金プロセスが記載されています。非カストディアルという主張は確認できませんでした。

Plisio はどの Zcash アドレスタイプを使うのか一切明言していないため、誰かが別の確認をするまでは transparent だと考えてください。

ウォレットは無料で、ゲートウェイと API は 0.5%、White Label は 1.5% です。White Label はセルフホストではなく、ホスト型サービスのリブランド版です。

支払いを受け取るのに KYC は不要で、制限国の一覧も公開されていません。

**最終確認日:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Support Type**: Transparent のみ、shielded からの入金は拒否
- **Description**: Binance Pay は、Zcash 支払いをサポートする暗号資産決済プラットフォームです。
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance は shielded address から送られた ZEC を拒否します。この拒否こそが TEX addresses が作られた理由です。

完全にカストディアルです。支払いは Binance Pay ウォレット間でオフチェーン移動し、認証済みの Binance アカウントが必要です。

ウォレット間送金は無料、加盟店への支払いは 0.8% で上限 5 USD、Mini Program 加盟店は 1% です。

依存する前に、自分の地域で利用できるか確認してください。Binance Pay は一部の国や業種では提供されておらず、ZEC は 2023 年以降フランス、スペイン、イタリア、ポーランドのユーザー向けに上場廃止されており、EEA でのサービスも MiCA の下で混乱しています。

**最終確認日:** 2026-07-29

---

### もう ZEC を受け付けていないもの

この 2 つは以前ここに掲載されていました。2026年7月29日に各プロバイダー自身の最新通貨一覧を確認したところ、どちらからも Zcash は消えていました。

**CoinPayments** は v2 のコイン一覧、旧一覧、最新通貨 API のいずれにも ZEC を掲載しておらず、Zcash に関する記事も現在はホームページへリダイレクトされます。

**CoinGate** は対応通貨ページにも公開 API にも ZEC を掲載していません。上場廃止の告知はなかったため、理由と時期は不明です。

どちらかが再び Zcash を追加したら、新しい確認日を付けて再掲載してください。

### このページを正確に保つために

プライバシーコイン対応は変動するため、このページの価値は最後の確認内容にかかっています。見直すときは次の点を確認してください。

1. プロバイダー自身の通貨一覧または API を確認すること。上で削除した 2 つのプロセッサでは、サードパーティーの一覧はどちらも古くなっていました。
2. どの Zcash アドレスタイプに対応しているか確認すること。「Zcash に対応」とは、たいてい transparent address のみを意味します。
3. 表とそのプロバイダーの節の両方で確認日を更新すること。

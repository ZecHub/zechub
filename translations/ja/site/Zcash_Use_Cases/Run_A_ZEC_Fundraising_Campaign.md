# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> ZECの資金調達キャンペーンを実施する

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  中級 - 10分
</span>

## 要約

- キャンペーン専用のウォレット（wallet）アカウントとシールドされた（shielded）アドレスを用意し、他の資金と決して混在させません
- 推奨額とメモ（memo）があらかじめ入力された支払い（payment）リクエストリンクまたはQRコードを共有します
- 寄付者を公開せずに進捗を示します。合計額を自分で投稿するか、信頼できる1人の確認者にビューイングキー（viewing key）を渡します
- ビューイングキーは1つのアドレスだけでなくアカウント全体を対象とするため、キャンペーン専用アカウントが必要です
- 約束した日にキャンペーンを終了し、資金の使途を公開します

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 対象者

- 1つの目標のために資金を集めるコミュニティグループ、オープンソースプロジェクト、クリエイター
- ZECで年末または緊急の寄付募集を行う非営利団体
- 個々の寄付を公開せずに、寄付者からキャンペーンへの信頼を得たいすべての人

米国の非営利団体の場合は、領収書およびIRSの書式について、まず[米国の非営利団体としてプライベートな寄付を受け入れる](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)をお読みください。

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 問題点

多くの暗号資産の資金調達では、寄付者が合計額の増加を確認できるように公開型（transparent）アドレスを使用します。しかし、その場合はすべての寄付、その金額、到着時刻、そして資金の次の送付先まで表示されます。意図してプライベートに寄付する人は、そのプライバシー（privacy）を失い、キャンペーン後の資金の流れも誰でも追跡できます。

完全にプライベートなキャンペーンには、反対の問題があります。寄付者は目標に到達したか、資金がどのように使われたかを確認できません。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> なぜZcashなのですか？

シールドされたZECでは、各寄付はオンチェーン（on-chain）でプライベートに保たれ、合計額、進捗バー、または確認者向けの読み取り専用アクセスなど、表示する内容を自分で決められます。寄付者は[メモ](/using-zcash/memos)にメッセージを追加でき、誰が寄付したかを他者に知られずにお礼を伝えられます。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 必要なもの

- 別個のアカウントを作成できる、シールドされた[ウォレット](/wallets)
- キャンペーンページ：ウェブサイト、ソーシャル投稿、またはフォーラムスレッド
- 目標、終了日、資金の使途に関する計画

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> ステップ別ガイド

### ステップ1：目標とルールを設定する

開始前に、次の内容を書き出します。
- 調達する金額とその使途
- 終了日
- 目標額を上回った場合または下回った場合の対応
- 資金を管理する人、および支出の承認に複数人が必要かどうか（[プライベートなコミュニティトレジャリーを運営する](/zcash-use-cases/private-community-treasury)を参照してください）

これらをキャンペーンページに公開します。何を行うかを最初に明示するキャンペーンは、寄付者から信頼されます。

### ステップ2：キャンペーン用の別アカウントを作成する

このキャンペーン専用に使用する新しいアカウントをウォレットに作成し、そこからシールドされたアドレスをコピーします。キャンペーンを分けておくと合計額を簡単に確認でき、後でビューイングキーを共有する場合にも重要です。ビューイングキーはアカウント全体の活動を表示するためです（[ビューイングキー](/zcash-tech/viewing-keys)）。

### ステップ3：支払いリクエストリンクとQRコードを作成する

[支払いリクエストURI](/using-zcash/payment-request-uris)は、寄付者向けにアドレス、推奨額、メモを入力する`zcash:`リンクです。ZecHubの[支払いリクエストジェネレーター](/tools)を使用して作成し、リンクとQRコードとして共有します。

「キャンペーン名、返信先：あなたのメールアドレスまたはハンドル」のようなメモは、お礼や領収書を希望する寄付者に役立ちます。メモは任意であることをページに明記してください。

### ステップ4：キャンペーンページを公開する

ページには、次を掲載します。
- ステップ1の目標、終了日、ルール
- シールドされたアドレス、QRコード、リンク
- シールドされたウォレットから寄付する方法と、入手先
- 進捗の報告方法（ステップ5）

アドレスは1か所に固定表示し、寄付者にはそこからのみコピーするよう伝えてください。

### ステップ5：寄付者を公開せずに進捗を報告する

次のいずれかを選び、ページでどちらを採用するか明記します。
- **合計額を自分で投稿する**：たとえば週1回、キャンペーンアカウントのウォレット残高を基に投稿します
- **信頼できる1人の確認者にビューイングキーを渡す**：理事会メンバーや、寄付者が知っているコミュニティメンバーなどに渡し、その人が合計額を公開確認します。受信ビューイングキーは受け取った寄付を表示し、フルビューイングキーは支出も表示します（[ビューイングキー](/zcash-tech/viewing-keys)）

キャンペーンページにビューイングキーを公開しないでください。これを持つ人は誰でも、寄付者の連絡先を含むすべての寄付の金額とメモを確認できます。

### ステップ6：寄付者にお礼を伝える

メモに連絡先を残した寄付者に返信します。事前に確認せずに、寄付者の名前や金額を公開してはいけません。

### ステップ7：終了して報告する

終了日には、次を行います。
- キャンペーン終了を告知し、アドレスとQRコードを削除または更新します
- 最終合計額と資金の使途を投稿します
- ビューイングキーを共有した場合は、確認者に最終合計額と支出の確認を依頼します

[支払い開示](/zcash-tech/payment-disclosures)により、いつかビューイングキーなしで単一の支払いを証明できるようになる可能性がありますが、この標準はまだ草案段階のため、現時点では依存しないでください。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 避けるべきよくある間違い

- 日常用のウォレットアカウントでキャンペーンを実施すること
- すべての寄付者の金額とメモが公開されるビューイングキーを公開すること
- 合計額を表示しやすいために、公開型アドレスまたは取引所（exchange）の入金アドレスを使用すること
- キャンペーン終了後もアドレスを残し、その寄付に対する計画がないまま寄付を受け続けること
- 資金の使途を一度も報告しないこと

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 結果

次のことができます。
- すべての寄付をオンチェーンでプライベートに保ちながら、明確な目標のためにZECを調達できます
- 寄付者が信頼できる進捗を示せます
- 寄付者を公開せずに、公開報告とともにキャンペーンを終了できます

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 関連情報

- [寄付をプライベートに受け取る](/zcash-use-cases/receive-donations-privately) - キャンペーンを使わない継続的な寄付
- [プライベートなコミュニティトレジャリーを運営する](/zcash-use-cases/private-community-treasury) - 共有資金の役割と承認
- [支払いリクエストURI](/using-zcash/payment-request-uris) - 金額とメモが入力されたリンクとQRコード
- [ビューイングキー](/zcash-tech/viewing-keys) - 確認者向けの読み取り専用アクセス
- [ZECへの寄付先](/zcash-use-cases/where-to-donate-zec) - すでにZECを受け入れている非営利団体

<br/>

## 次のステップ

- [米国の非営利団体としてプライベートな寄付を受け入れる](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

初めての方は、こちらから始めてください：[Zcashとは何ですか](/start-here/what-is-zec-and-zcash)

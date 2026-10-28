# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> 米国の非営利団体としてプライベートな ZEC 寄付を受け付ける

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  中級 - 10分
</span>

> このページは一般的な情報であり、法的または税務上の助言ではありません。米国の税制は変更されるため、各手順を会計士または税務アドバイザーに確認してください。以下の各規則にはIRSの出典へのリンクがあり、2026年10月にPublication 526（2025年分の申告用）およびForm 8283（2025年12月改訂版）に照らして確認しています。IRSの仮想通貨FAQは2025年より前の取引を対象として作成されたため、現行のガイダンスと照合してください。

## 要点

- スタッフ個人のウォレットではなく、組織が管理するシールドウォレットで寄付を保有する
- IRSは ZEC を財産として扱うため、ZEC の贈与は非現金寄付となる
- 250ドル以上の贈与については、ZEC を説明しつつドル建ての価値は記載しない書面による受領確認を寄付者に送る
- 5,000ドルを超える贈与では、寄付者は適格な鑑定を必要とし、あなたはそのForm 8283に署名する
- 受領後3年以内に ZEC を売却し、寄付者のForm 8283のSection Bに署名していた場合は、Form 8282を提出する
- あなたに対して匿名のままでいる寄付者は、通常250ドル以上の控除を請求できない

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 対象者

- ZEC を受け付けたい米国の501(c)(3)慈善団体、教会、コミュニティグループ
- 暗号資産による寄付の受け入れを準備する会計担当者、簿記担当者、理事会メンバー
- 非営利団体が自分たちに何を求めているかを知りたい寄付者

個人およびクリエイター向けについては、[寄付をプライベートに受け取る](/zcash-use-cases/receive-donations-privately)をご覧ください。

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 問題点

米国の慈善団体向け暗号資産寄付サービスの多くは、透明アドレスを提供するか、それを通じて贈与を換金します。透明アドレスでは、誰でもすべての贈与、その金額、残高を確認できます。意図してプライベートに寄付した寄付者も、贈与が着金した瞬間にそのプライバシーを失います。

非営利団体には、個人にはない事務手続きもあります。寄付者への領収書、大きな贈与に関するIRS書類、年次申告です。最初の贈与を受け取る前に計画しておけば、プライバシーとこうした事務手続きを両立できます。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 非公開のまま残るものと、残らないもの

| | シールドアドレスへのシールドされた贈与 |
|---|---|
| 一般の人々 | 寄付者、あなたのアドレス、金額を確認できない |
| あなたの組織 | 金額とメモを確認できる。寄付者が名乗った場合のみ寄付者も確認できる |
| あなたの会計士 | たとえば [閲覧キー](/zcash-tech/viewing-keys) を通じて、あなたが共有した情報を確認できる |
| 売却時 | 利用する取引所が透明な入金のみを受け付ける場合、シールドプールから移動する金額は公開される（[ターンスタイル](/zcash-tech/the-turnstile)を参照） |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 必要なもの

- 暗号資産を対象に含め、理事会の承認を得た寄付受入ポリシー
- 組織が管理する、シールドアドレス対応の [ウォレット](/using-zcash/wallets)
- ZEC をドルに換金する予定がある場合は、組織名義の取引所アカウント
- 非現金寄付を扱った経験のある会計士

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> ステップ別ガイド

### ステップ1: ポリシーを決める

以下を文書化し、理事会の承認を得ます。
- 資金を移動できる人と、各移動に2人の承認が必要かどうか
- 各贈与をすぐに売却するか、ZEC を一部保有するか
- 匿名の贈与を受け付けるかどうか、および上限額

### ステップ2: 組織が管理するウォレットを設定する

- 個人用スマートフォンではなく、組織のデバイスでウォレットを作成する
- シードフレーズをオフラインで保管し、それぞれがアクセスできる2名の役員に管理させる
- 共同管理については、[プライベートなコミュニティ財務を運営する](/zcash-use-cases/private-community-treasury)をご覧ください

### ステップ3: シールドアドレスを公開する

- 寄付ページでシールド専用アドレスを共有します。[統合アドレス](/using-zcash/unified-addresses) は `u1` で始まりますが、透明な受信者を含めることもでき、その場合、透明アドレス専用ウォレットからの贈与は公開状態で着金します。利用中のウォレットが提供している場合は、シールド専用アドレスを使用してください。
- 透明アドレスは公開しないでください（`t1` または `t3` で始まります）
- 領収書を希望する寄付者には、メールアドレスを [メモ](/using-zcash/memos) に入力するよう依頼してください。メモは暗号化されているため、読めるのは組織だけです。

### ステップ4: すべての贈与を記録する

各贈与について、以下を記録します。
- 受領した日時
- ZEC での金額
- その時点の米ドル価値と、使用した価格情報源
- トランザクションIDとメモ

IRSは ZEC を財産として扱います（[Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)）。そのため、帳簿上では非現金寄付となります。会計士に読み取り専用アクセスを提供する方法については、[シールドされた ZEC で記録を保持する](/zcash-use-cases/keeping-records-with-shielded-zec)をご覧ください。

### ステップ5: 250ドル以上の贈与を確認する

寄付者は、あなたからの書面による受領確認なしに、250ドル以上の単一の贈与を控除できません（[Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)）。ZEC の贈与について、以下を含めます。
- 組織名
- 受領日
- 贈与の説明。例：「1.5 ZEC」。ドル建ての価値は記載しないでください。贈与の評価は寄付者の責任です。
- 何らかの見返りを提供したかどうか。例：「この寄付に対して、物品またはサービスは提供されていません。」

寄付者は、納税申告を行う前に受領確認を受け取る必要があります（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)）。組織は通常、翌年1月31日までに送付します。すぐに送る方法が最も簡単です。

### ステップ6: 5,000ドルを超える贈与についてForm 8283に署名する

寄付者が5,000ドルを超える控除を請求する場合、適格な鑑定が必要です。暗号資産は上場有価証券とは見なされないため、鑑定が適用されます（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)、[CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)）。寄付者は [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) をあなたに持参し、あなたはSection Bの受贈者欄に署名します。あなたの署名は、その日に ZEC を受領したことを確認するものであり、寄付者の評価額を確認するものではありません（[IRS FAQ、Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

### ステップ7: 必要に応じてドルに換金する

- [カストディアル取引所](/using-zcash/custodial-exchanges)で、シールドされた入金を受け付ける取引所を確認してください。多くは透明な入金しか受け付けません。
- 利用する取引所が透明な入金専用の場合、売却時にシールドウォレットから取引所へ ZEC を一度で移動します。その金額は公開されますが、ほかの贈与と残高はプライベートなままです。
- ZEC を受領後3年以内に売却し、寄付者のForm 8283のSection Bに署名していた場合は、売却から125日以内に [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) を提出し、寄付者に写しを送付してください（[IRS FAQ、Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

### ステップ8: 年次申告で報告する

ZEC の贈与を、Form 990シリーズの申告書で非現金寄付として報告し、該当する場合は [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) も提出します。匿名の贈与の記載方法は会計士に確認してください。

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 匿名の寄付者：請求できることとできないこと

- 一般の人々からのプライバシーと、あなたに対する匿名性は別です。寄付者はプライベートに寄付しつつ、領収書を受け取るためにメモでメールアドレスを共有できます。
- あなたに対して匿名のままでいる寄付者は受領確認を受け取れないため、250ドル以上の単一の贈与を控除できません。
- 5,000ドルを超える場合、寄付者には鑑定とForm 8283へのあなたの署名も必要であり、あなたに身元を明かす必要があります。
- 寄付者にとって、1年を超えて保有した ZEC の贈与は、一般に公正市場価値で控除でき、贈与に対するキャピタルゲイン税はかかりません（[IRS FAQ、Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

寄付者が寄付する前に選べるよう、この内容を寄付ページに記載してください。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 避けるべきよくある間違い

- スタッフの個人用ウォレットで贈与を保有する
- 寄付アドレスとして、透明アドレスまたは取引所の入金アドレスを公開する
- 受領確認にドル建ての価値を記載する
- 3年以内に売却してForm 8282を忘れる
- 匿名の寄付者に税控除を約束する

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 結果

以下が可能になります。
- 寄付者や残高を公開せずに ZEC を受け付ける
- 寄付者が控除を請求するために必要な書類を提供する
- 会計士や監査人が確認できる記録を保持する

<br/>

## 情報源

- [IRS：仮想通貨取引に関するよくある質問](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)（Q34–Q37は慈善団体を扱っています）
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771：慈善寄付、証明および開示](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526：慈善寄付](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561：寄付された財産の価値の決定](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012：暗号資産の贈与に対する鑑定](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) および [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 関連項目

- [寄付をプライベートに受け取る](/zcash-use-cases/receive-donations-privately) - 個人向けの同じ考え方
- [シールドされた ZEC で記録を保持する](/zcash-use-cases/keeping-records-with-shielded-zec) - 帳簿のためのメモと閲覧キー
- [閲覧キー](/zcash-tech/viewing-keys) - 会計士または監査人のための読み取り専用アクセス
- [ターンスタイル](/zcash-tech/the-turnstile) - ZEC がシールドプールを離れる際に公開されるもの

<br/>

## 次のステップ

- [プライベートなコミュニティ財務を運営する](/zcash-use-cases/private-community-treasury)

<br/>

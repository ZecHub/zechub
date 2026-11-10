# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> 米国の非営利団体としてプライベートなZEC寄付を受け付ける

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  中級 - 10分
</span>

> このページは一般的な情報であり、法的助言または税務助言ではありません。米国の税務規則は変更されるため、各手順を会計士または税務アドバイザーに確認してください。以下のすべての規則には、2026年10月にPublication 526（2025年の申告用）およびForm 8283（2025年12月改訂版）に照らして確認したIRS出典へのリンクがあります。IRSの仮想通貨FAQは2025年以前のトランザクション向けに書かれているため、現行のガイダンスと照らして確認してください。

## 要約

- 寄付は、スタッフ個人のウォレットではなく、組織が管理するシールドされたウォレットに保管してください
- IRSはZECを財産として扱うため、ZECの贈与は非現金寄付です
- $250以上の贈与については、ZECを説明しつつドル価値を記載しない書面の受領確認書を寄付者に送付してください
- $5,000を超える贈与では、寄付者は適格な鑑定を必要とし、組織はそのForm 8283に署名します
- 受領から3年以内にZECを売却し、寄付者のForm 8283のSection Bに署名している場合は、Form 8282を提出してください
- 組織に対して匿名のままでいる寄付者は、通常、$250以上の控除を申請できません

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> これは誰のためのものですか？

- ZECを受け付けたい米国の501(c)(3)慈善団体、教会、コミュニティグループ
- 暗号資産による寄付の受け入れを設定する会計責任者、簿記担当者、理事会メンバー
- 非営利団体が自分たちに何を求めるかを知りたい寄付者

個人およびクリエイターについては、[寄付をプライベートに受け取る](/zcash-use-cases/receive-donations-privately)を参照してください。

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 問題点

米国の慈善団体向け暗号資産寄付サービスの多くは、公開型アドレスを提供するか、そのアドレスを通じて寄付を換金します。公開型アドレスでは、誰でもすべての寄付、その金額、残高を確認できます。意図的にプライベートに寄付する寄付者は、寄付が着金した瞬間にそのプライバシーを失います。

非営利団体には、個人にはない事務手続きもあります。寄付者への領収書、大きな贈与に関するIRSの書式、そして年次申告です。最初の贈与を受け取る前に計画しておけば、プライバシーとその事務手続きの両方を両立できます。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> プライベートに保たれるものと、保たれないもの

| | シールドされたアドレスへのシールドされた贈与 |
|---|---|
| 一般の人 | 寄付者、組織のアドレス、金額を確認できません |
| 組織 | 金額とメモを確認できます。寄付者が伝えた場合にのみ、その寄付者を確認できます |
| 会計士 | 共有する情報を確認できます。たとえば、[ビューイングキー](/zcash-tech/viewing-keys)を使用する場合です |
| 売却時 | 取引所が公開型の入金のみを受け付ける場合、シールドされたプールから移動する金額は公開されます（[ターンスタイル](/zcash-tech/the-turnstile)を参照） |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 必要なもの

- 暗号資産を対象とし、理事会の承認を受けた寄付受入方針
- 組織が管理する、シールドされたアドレスを備えた[ウォレット](/using-zcash/wallets)
- ZECをドルに換金する予定がある場合、組織名義の取引所アカウント
- 非現金の贈与を扱った経験のある会計士

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> ステップバイステップガイド

### ステップ1：方針を決める

以下を書面にし、理事会の承認を得てください。
- 誰が資金を移動できるか、また各移動に2人の承認が必要かどうか
- 各贈与を直ちに売却するか、ZECの一部を保有するか
- 匿名の贈与を受け入れるかどうか、およびその上限額

### ステップ2：組織が管理するウォレットを設定する

- 個人の電話ではなく、組織のデバイス上でウォレットを作成してください
- シードフレーズはオフラインで保管し、それぞれがアクセスできる2人の役員が管理してください
- 共同管理については、[プライベートなコミュニティ・トレジャリーを運営する](/zcash-use-cases/private-community-treasury)を参照してください

### ステップ3：シールドされたアドレスを公開する

- 寄付ページではシールドされたアドレスのみを共有してください。[統合アドレス](/using-zcash/unified-addresses)は`u1`で始まりますが、公開型の受信先を含むこともでき、公開型のみのウォレットからの贈与は公開された状態で着金します。利用可能な場合は、ウォレットのシールドされたアドレスのみを使用してください。
- 公開型アドレス（`t1`または`t3`で始まるもの）を公開しないでください
- 領収書を希望する寄付者には、メールアドレスを[メモ](/using-zcash/memos)に記載するよう依頼してください。メモは暗号化されているため、組織のみが読むことができます。

### ステップ4：すべての贈与を記録する

各贈与について、以下を記録してください。
- 受領した日時
- ZECでの金額
- その時点の米ドル価値と、使用した価格の情報源
- トランザクションIDとメモ

IRSはZECを財産として扱います（[Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)）。そのため、帳簿上は非現金寄付です。会計士に閲覧専用アクセスを提供するには、[シールドされたZECによる記録管理](/zcash-use-cases/keeping-records-with-shielded-zec)を参照してください。

### ステップ5：$250以上の贈与を確認する

寄付者は、組織からの書面による受領確認書がなければ、$250以上の単一の贈与を控除できません（[Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)）。ZECの贈与については、以下を記載してください。
- 組織名
- 受領日
- 贈与の説明。たとえば「1.5 ZEC」です。ドル価値は記載しないでください。贈与の評価は寄付者の責任です。
- 見返りに何かを提供したかどうか。たとえば「この寄付と引き換えに物品またはサービスは提供されませんでした。」

寄付者は、税務申告書を提出する前にこれを受け取る必要があります（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)）。組織は通常、翌年の1月31日までに送付しますが、直ちに送付するのが最も簡単です。

### ステップ6：$5,000を超える贈与についてForm 8283に署名する

寄付者が$5,000を超える額を申請する場合、適格な鑑定が必要です。暗号資産は公的に取引される有価証券には該当しないため、鑑定が適用されます（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)、[CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)）。寄付者は[Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf)を組織に持参し、組織はSection Bの受贈者欄に署名します。署名は、その日にZECを受領したことを確認するものであり、寄付者の評価額を確認するものではありません（[IRS FAQ、Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

### ステップ7：必要であればドルに換金する

- [カストディアル取引所](/using-zcash/custodial-exchanges)で、どの取引所がシールドされた入金を受け付けているか確認してください。多くは公開型の入金のみを受け付けます。
- 利用する取引所が公開型のみの場合、売却時にシールドされたウォレットから取引所へZECを1回で移動してください。その金額は公開されますが、他の贈与と残高はプライベートに保たれます。
- 受領から3年以内にZECを売却し、寄付者のForm 8283のSection Bに署名している場合は、売却から125日以内に[Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)を提出し、そのコピーを寄付者に送付してください（[IRS FAQ、Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

### ステップ8：年次申告書で報告する

ZECの贈与を、Form 990シリーズの申告書で非現金寄付として報告し、該当する場合は[Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990)を添付してください。匿名の贈与の記載方法については、会計士に相談してください。

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 匿名の寄付者：申請できることとできないこと

- 一般の人々に対するプライバシーと、組織に対する匿名性は同じではありません。寄付者はプライベートに寄付しながら、領収書を得るためにメモでメールアドレスを共有できます。
- 組織に対して匿名のままでいる寄付者は受領確認書を取得できないため、$250以上の単一の贈与を控除できません。
- $5,000を超える場合、寄付者は鑑定およびForm 8283への組織の署名も必要となるため、組織に身元を伝えることになります。
- 寄付者にとって、1年以上保有したZECの贈与は、通常、公正市場価値で控除でき、贈与に対するキャピタルゲイン税はかかりません（[IRS FAQ、Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

寄付者が寄付前に選択できるよう、寄付ページにこれを記載してください。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 避けるべきよくある間違い

- 贈与をスタッフ個人のウォレットに保管すること
- 公開型アドレスまたは取引所の入金アドレスを寄付用アドレスとして公開すること
- 受領確認書にドル価値を記載すること
- 3年以内に売却し、Form 8282を忘れること
- 匿名の寄付者に税控除を約束すること

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 結果

以下が可能になります。
- 寄付者や残高を公開せずにZECを受け付ける
- 寄付者が控除を申請するために必要な書類を提供する
- 会計士や監査人が確認できる記録を保持する

<br/>

## 出典

- [IRS：仮想通貨トランザクションに関するよくある質問](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)（Q34–Q37は慈善団体を扱います）
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771：慈善寄付、証明および開示](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526：慈善寄付](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561：寄贈財産の価値の決定](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012：暗号資産寄付の鑑定](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf)および[Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 関連情報

- [寄付をプライベートに受け取る](/zcash-use-cases/receive-donations-privately) - 個人向けの同じ考え方
- [シールドされたZECによる記録管理](/zcash-use-cases/keeping-records-with-shielded-zec) - 帳簿のためのメモとビューイングキー
- [ビューイングキー](/zcash-tech/viewing-keys) - 会計士または監査人のための閲覧専用アクセス
- [ターンスタイル](/zcash-tech/the-turnstile) - ZECがシールドされたプールを離れる際に公開されるもの

<br/>

## 次のステップ

- [プライベートなコミュニティ・トレジャリーを運営する](/zcash-use-cases/private-community-treasury)

<br/>

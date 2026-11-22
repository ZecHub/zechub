# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> ZECを寄付して米国の税控除を申請する

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  中級 - 10分
</span>

> このページは一般的な情報であり、法的または税務上の助言ではありません。米国の税制は変更されるため、ご自身の状況について税務アドバイザーに確認してください。以下の各ルールには、そのIRS情報源へのリンクがあります。2026年10月に、Publication 526（2025年申告用）および2025年税法に関するIRSページと照合して確認しました。

## 要約

- IRSはZECを財産として扱うため、ZECの贈与は現金以外の寄付となります
- ZECを1年以上保有していた場合、通常はその公正市場価値を控除でき、値上がり分に対するキャピタルゲイン税はかかりません
- 1年以下の保有期間の場合、控除額は取得原価（通常は支払額）と市場価値のいずれか低い方です
- $250以上の贈与には、慈善団体からの書面による受領確認が必要です
- $500超の場合はForm 8283を提出します。$5,000超の場合は、適格な鑑定も必要です
- 控除を受けられるのは項目別控除を行う場合のみです。2026年から始まる、項目別控除をしない人向けの新しい控除は、現金による贈与のみを対象とし、ZECは対象外です

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 対象者

- 慈善団体にZECを寄付したい米国の納税者
- オンチェーン上で贈与を非公開に保ちつつ、控除も申請したい寄付者

慈善団体を運営している場合は、[米国の非営利団体としてプライベートな寄付を受け入れる](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)をご覧ください。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> オンチェーンでは非公開、慈善団体には本人確認済み

シールドされた贈与では、金額、あなたのアドレス（Address）、慈善団体の残高は公開記録に残りません。税控除は別種のプライバシー（Privacy）です。$250以上の贈与では、慈善団体は受領確認を送るためにあなたの身元を知る必要があり、$5,000超では鑑定人と慈善団体の両方があなたのForm 8283に署名します。

そのため、一般公開からはプライベートなまま控除を申請できます。ただし、慈善団体に対して匿名のまま、$250以上の贈与について控除を申請することはできません。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 必要なもの

- 寄付するZECを保有するシールドされたウォレット（Wallet）
- そのZECを取得した時期と支払額の記録
- 適格団体である慈善団体（[IRSTax Exempt Organization Search](https://apps.irs.gov/app/eos/)で確認）で、ZECを受け入れていること。[寄付先一覧ZEC](/zcash-use-cases/where-to-donate-zec)をご覧ください

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> ステップごとのガイド

### ステップ1: ZECの保有期間を確認する

- **1年超:** ZECは資本資産であるため、キャピタルゲイン財産です。通常、寄付した日の公正市場価値を控除できます（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)、[IRS FAQ、Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）
- **1年以下:** 控除額は、取得原価（通常は支払額）と当日の公正市場価値のいずれか低い方です（[IRS FAQ、Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）

異なる時期にZECを購入した場合は、1年超保有したロットから寄付し、どのロットを使用したかをノート（Note）に記録してください。

### ステップ2: 慈善団体を確認する

その団体が税控除の対象となる贈与を受け取れることを確認し、暗号資産の受領書についての説明を読んでください。一部の慈善団体は、暗号資産について受領確認をまったく送付しません。[寄付先一覧ZEC](/zcash-use-cases/where-to-donate-zec)には、各団体の説明が記載されています。

### ステップ3: 贈与を送付し、慈善団体に本人情報を伝える

- 慈善団体自身の寄付ページからアドレスをコピーします
- シールドされたウォレットから送付します
- 慈善団体にシールドされたアドレスがある場合は、[メモ（Memo）](/using-zcash/memos)に氏名とメールアドレスを記入するか、寄付ページにある連絡方法を使用します

### ステップ4: 当日の価値を記録する

日付と時刻、ZECの金額、その時点の米ドル価値、価格の取得元を記録します。トランザクション（Transaction）IDも保存してください。[シールドされたZECの記録を保管する](/zcash-use-cases/keeping-records-with-shielded-zec)をご覧ください。

### ステップ5: 書面による受領確認を取得する

$250以上の単一の贈与には、慈善団体から同時期に発行された書面による受領確認が必要です。これは寄付したZECを記載しますが、価値は記載しません。申告書の提出日、または延長を含む期限日のうち早い日までに取得する必要があります（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)）。

### ステップ6: Form 8283を記入する

- **$500超から$5,000以下:** [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf)のSection Aを記入します
- **$5,000超:** Section Bを記入します。適格な鑑定人による適格な鑑定が必要であり、慈善団体がフォームに署名します。このルールでは暗号資産は公開取引証券ではないため、ZECに市場価格があっても鑑定が適用されます（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)、[CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)）。[Publication 561](https://www.irs.gov/pub/irs-pdf/p561.pdf)では、適格な鑑定に該当する条件と実施時期を説明しています

### ステップ7: 申告書で控除を申請する

Schedule Aで控除を申請します。これは項目別控除を行うことを意味します。大半の公的慈善団体へのキャピタルゲイン財産の贈与は、通常、調整後総所得の30%が上限であり、超過分は繰り越すことができます（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)）。

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 項目別控除をしない場合

2026年の課税年度から、項目別控除をしない人は慈善寄付を最大$1,000まで控除できます（夫婦合算申告では$2,000）。この控除は現金のみが対象です。ZECのような現金以外の贈与は対象になりません（[IRS: One Big Beautiful Billの規定](https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions)）。

項目別控除をしない場合でも、ZECの贈与は慈善団体を支援しますが、税額は減りません。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 避けるべきよくある間違い

- 先にZECを売却してからドルを寄付すること。回避できた可能性のあるキャピタルゲイン税を支払うことになる場合があります
- 1年以下しか保有していないZECを寄付し、その市場価値の全額を控除すること
- 匿名で寄付した後に受領書を期待すること
- ZECに市場価格があるため、$5,000超の贈与に必要な鑑定を省略すること
- 寄付したZECをいつ購入したか分からなくなること

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 結果

以下が可能になります：
- ZECをオンチェーンでプライベートに寄付する
- 控除申請に必要な書類を取得する
- 寄付前に、自分に控除が適用されるかを把握する

<br/>

## 情報源

- [IRS: 仮想通貨トランザクションに関するよくある質問](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)（Q34–Q37は慈善寄付を対象としています）
- [IRS Publication 526: 慈善寄付](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: 寄付された財産の価値の決定](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: 暗号資産の贈与に対する鑑定](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283およびその手順書](https://www.irs.gov/forms-pubs/about-form-8283)
- [IRS: One Big Beautiful Billの規定](https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 関連項目

- [寄付先一覧ZEC](/zcash-use-cases/where-to-donate-zec) - ZECを受け入れる非営利団体と、受領書に関する各団体の説明
- [米国の非営利団体としてプライベートな寄付を受け入れる](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) - 慈善団体側から見た同じ贈与
- [シールドされたZECの記録を保管する](/zcash-use-cases/keeping-records-with-shielded-zec) - 記録用のメモとビューイングキー（Viewing Key）
- [メモ](/using-zcash/memos) - シールドされた贈与に氏名とメールアドレスを追加する

<br/>

## 次のステップ

- [寄付先一覧ZEC](/zcash-use-cases/where-to-donate-zec)

<br/>

初めての方は、こちらから始めてください：[Zcashとは何ですか](/start-here/what-is-zec-and-zcash)

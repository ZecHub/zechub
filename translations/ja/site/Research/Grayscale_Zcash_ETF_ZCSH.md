# Grayscale Zcash ETF（ZCSH）

**ZcashはETFを開始していません。開始したのはGrayscaleです**。同社は2017年から運用してきたファンドを転換しました。Zcashはプロトコルであり、ファンドを発行できる企業、トレジャリー（treasury）、または取締役会を有していません。Grayscaleは独立系の資産運用会社であり、他の誰もがそうするように公開市場でZECを購入しています。

この区別はZCSHについて最も誤解されている点であり、このページはそこから始まります。2026年8月25日、このファンドはNYSE Arcaで*The Zcash ETF*として取引を開始しました。これは米国初の現物Zcash上場取引型商品であり、現在では存在するZECの単独保有者の中でも大規模な部類に入ります。

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## 同じファンド、3つの段階

| 時期 | 変更内容 |
| --- | --- |
| 2017年10月 | 私募として開始され、適格投資家のみが対象です |
| 2021年10月 | 株式がティッカーZCSHでOTCQXに上場され、NAVに対するディスカウントで取引されます |
| 2026年8月25日 | NYSE Arcaで償還可能なETPとなり、名称から「Trust」を削除します |

2026年の段階は見た目だけの変更ではありません。OTCで値付けされるトラストには償還メカニズムがないため、その株式は裏付け資産の価値に対してプレミアムまたはディスカウントへ乖離する可能性があり、時には大きく乖離します。これはまさに2021年から2026年にかけて起きたことです。機能する設定・償還を備えた上場取引型商品には、株価を純資産価値に連動させる裁定取引の経路があります。一方から他方へ変わることは、その証券としての振る舞いを変えます。

## 各当事者の役割

| 役割 | 当事者 |
| --- | --- |
| スポンサー | Grayscale Investments Sponsors, LLC |
| 受託者 | CSC Delaware Trust Company |
| 管理者および名義書換代理人 | The Bank of New York Mellon |
| プライムブローカー | Coinbase, Inc. — トラストのためにZECを調達します |
| 認定参加者 | Jane Street、Virtu — 株式を設定・償還します |
| マーケティング代理人 | Foreside Fund Services |
| **カストディアン（Custodian）** | **Coinbase Custody Trust Company, LLC** — 実際のZECが存在する唯一の場所です |

これらの当事者のいずれも、単独でファンドそのものではありません。ファンドの構造とは当事者間の取り決めであり、上の図はそれを示しています。上場時のニュース報道では、これらの役割のいくつかが欠落または誤って伝えられていました。ここでの一覧は、GrayscaleがEDGARに提出したForm S-3登録届出書に従っています。

## 株式の設定と償還の仕組み

スポンサーと契約を結んだ登録ブローカー・ディーラーである認定参加者のみが、バスケットと呼ばれる10,000株単位で株式を設定または償還できます。一般投資家がこの仕組みに関わることはなく、他の上場証券と同様に取引所で既存の株式を売買します。

現在のメカニズムは現金であり、現物ではありません。認定参加者は現金口座に現金を預け入れるか、現金口座から現金を受け取り、実際にZECを取得または処分するのは第三者の流動性プロバイダーです。登録届出書には現物プロセスも記載されており、その場合は認定参加者がZECを直接トラストに預け入れるか、トラストからZECを受け取ります。しかし、「In-Kind Regulatory Approval has not been obtained」であり、今後も取得されない可能性があると明記されています。

したがって、現金プロセスでは、ZECは流動性プロバイダーと市場の間で移転し、投資家とトラストの間で移転することはありません。リテール投資家の経路では、誰もZcashアドレス（address）に触れません。

## 手数料はZECで支払われます

スポンサー手数料は、上場時点で年率**2.5%**です。これは純資産価値に対する割合として日次で発生し、届出書の表現では「スポンサーに対し、日次で後払いによりZECで支払われる」ものです。

その結果は付随的ではなく構造的です。手数料はファンドのZECから差し引かれるため、各株式を裏付けるZECの量は毎日わずかに減少します。株式は、無期限に保有される固定量のZECではなく、徐々に減少する量に対する請求権です。長期的なZCSHへのエクスポージャーを、単にZECを保有することと比較する人は、この点を比較に含める必要があります。

参考までに、2.5%は一般的な現物ビットコインETFの手数料のおよそ10倍です。Grayscaleは、スポンサー手数料による初期収益をZcashエコシステムの開発へ還元すると述べています。

## 株主が実際に所有するもの

株式はZECの価格へのエクスポージャーです。ZECそのものではありません。

株主はシールドされた（shielded）トランザクション（transaction）を送信できず、メモ（memo）を添付できず、統合アドレスを保有できず、セルフカストディもできません。Zcashを他の資産と区別する特性はいずれも、このラッパーを通じて利用できません。このラッパーが提供するのは価格だけであり、それ以外は何もありません。証券会社口座や退職口座の中でエクスポージャーを得ることを目的とする投資家にとっては、それこそが目的です。Zcashへの関心がプライバシー（privacy）にある人にとって、ETFはウォレット（wallet）の代替ではなく、両者は本質的に相互の代替手段ではありません。

## ZECは公開された形で保有されています

この構造にはさらなる皮肉があり、それはこのページで最も鋭い点です。Coinbase CustodyはトラストのZECを、シールドされたアドレスではなく**公開型（transparent）**アドレスで保有しています。ファンドの保有資産はチェーン（chain）上で可視化され、カストディアンまで追跡可能であり、確認しようとする誰もがリアルタイムで観察できます。このファンドではシールドされたアドレスは一切使用されていません。

これは見落としではありません。規制されたファンドのインフラは監査と証明を中心に構築されており、シールドされた残高は監査人が独立して検証できないものです。Coinbase自身のサポートも同じ非対称性を反映しています。シールドされたアドレスから送付されたZECは受け取りますが、ZECをそのようなアドレスへ送付することはありません。

したがって、プライバシー資産の最大の機関保有者は、プライバシーをまったく持たない唯一の形態でそれを保有しています。この点は届出書ではなく報道に基づいています。S-3はトラストの秘密鍵のカストディについて記述していますが、アドレスの種類は特徴付けていません。そのため、この注意書きを添えてここに記載しています。

## 関与するZECの量

2026年8月25日の上場時、ファンドは約**387,000 ZEC**を保有し、運用資産残高は約**$313 million**でした。

より長期的な観点では、2025年9月30日時点で、届出書はトラストが流通しているZECの約**2.4%**を保有していたと述べています。両方の数値は変動します。前者はZEC価格および設定・償還に伴って、後者は保有資産から手数料が支払われることで変動します。そのため、現在の数値はこのページではなく、最新の届出書またはファンド自身の日次開示から取得してください。

## 出典

特記のない限り、すべて一次資料であり、CIK 1720265のEDGAR上にあります。

- [Grayscale Zcash Trust（ZEC）— EDGARの提出書類インデックス](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [2025年11月のForm S-3登録届出書](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — 事業体の役割、設定・償還の仕組み、スポンサー手数料、および流通ZECに占める割合
- [2024年12月31日に終了した年度のForm 10-K](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [The Zcash ETFがNYSE Arcaで取引開始、2026年8月25日](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trustのファンドページ](https://www.grayscale.com/funds/grayscale-zcash-trust) — 設定日と現在の開示
- [最初のプライバシーコインETF：GrayscaleのZcash提出書類の内部](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — 二次資料。トラストのZECが公開型アドレスで保有されていると述べている、見つかった唯一の資料です

数値は記載された日時点のものであり、変動します。2026年9月30日に確認済みです。
教育目的のみであり、投資助言ではありません。

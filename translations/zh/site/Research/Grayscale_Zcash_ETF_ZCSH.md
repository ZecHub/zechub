# Grayscale Zcash ETF（ZCSH）

**Zcash 并未推出 ETF。Grayscale 推出了**，方法是将其自 2017 年以来运营的一只基金转换而来。Zcash 是一种协议——它没有能够发行基金的公司、金库或董事会。Grayscale 是一家独立的资产管理公司，像其他人一样在公开市场购买 ZEC。

这一区别是有关 ZCSH 最常被误解的一点，也是本页面的起点。2026 年 8 月 25 日，该基金开始在 NYSE Arca 交易，名称为 *Zcash ETF*，成为美国首个 Zcash 现货交易所交易产品，如今也是现存持有 ZEC 数量较大的单一实体之一。

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## 同一只基金，三个阶段

| 时间 | 变化内容 |
| --- | --- |
| 2017 年 10 月 | 作为私募配售推出，仅限合格投资者 |
| 2021 年 10 月 | 股票以代码 ZCSH 在 OTCQX 报价，交易价格低于净资产价值 |
| 2026 年 8 月 25 日 | 成为 NYSE Arca 上可赎回的 ETP，并从名称中删除“Trust” |

2026 年这一步并非仅是形式上的改变。场外报价的信托没有赎回机制，因此其股票价格可能相对于背后资产价值形成溢价或折价，有时幅度很大——这正是 2021 年至 2026 年间发生的情况。具备有效创建和赎回机制的交易所交易产品拥有套利渠道，能够使股票价格与净资产价值保持一致。从一种形式转为另一种形式，改变了该证券的行为方式。

## 各方职责

| 角色 | 参与方 |
| --- | --- |
| 发起人 | Grayscale Investments Sponsors, LLC |
| 受托人 | CSC Delaware Trust Company |
| 管理人及过户代理人 | Bank of New York Mellon |
| 主经纪商 | Coinbase, Inc.——为信托获取 ZEC |
| 授权参与者 | Jane Street、Virtu——创建和赎回股票 |
| 营销代理人 | Foreside Fund Services |
| **托管人 [Custodian]** | **Coinbase Custody Trust Company, LLC**——实际 ZEC 唯一存在的地方 |

这些参与方中没有任何一方单独构成基金。基金的结构是它们之间的安排，这正是上图所展示的内容。上市时的新闻报道遗漏或错误表述了其中若干角色；此处列表遵循 Grayscale 在 EDGAR 提交的 Form S-3 注册声明。

## 股票如何创建和赎回

只有授权参与者——与发起人签有协议的注册经纪交易商——可以创建或赎回股票，且只能以每篮 10,000 股的单位进行，称为篮子。普通投资者从不接触这套机制；他们像买卖其他上市证券一样在交易所买卖现有股票。

该机制目前采用**现金**，而非实物交割。授权参与者向现金账户存入现金或从中收取现金，而实际取得或处置 ZEC 的是第三方流动性提供者。注册声明还描述了实物交割流程，在该流程中，授权参与者会将 ZEC 直接存入信托，或从信托收取 ZEC——但声明明确表示“尚未获得实物交割监管批准”，且可能永远无法获得。

因此，在现金流程下，ZEC 在流动性提供者与市场之间易手，绝不会在投资者与信托之间易手。零售路径中的任何人都不会接触 Zcash 地址 [address]。

## 手续费 [fee] 以 ZEC 支付

截至上市时，发起人手续费为每年 **2.5%**。该费用每日按净资产价值的百分比累积，用申报文件中的话说，即“每日向发起人支付拖欠的 ZEC”。

其后果是结构性的，而非偶然的。手续费从基金的 ZEC 中扣除，因此每股所对应的 ZEC 数量每天都会略微减少。一股股票并非永久持有固定数量 ZEC；它代表的是对一项缓慢缩减资产的请求权。任何人若将长期 ZCSH 敞口与单纯持有 ZEC 进行比较，都需要将这一点纳入比较。

作为参考，2.5% 大约是典型现货 bitcoin ETF 手续费的 10 倍。Grayscale 表示，发起人手续费带来的早期收入将重新投入 Zcash 生态系统的发展。

## 股东实际拥有的是什么

一股股票提供对 ZEC 价格的敞口。它不是 ZEC。

股东无法发送屏蔽交易 [shielded transaction]，无法附加备忘录 [memo]，无法持有统一地址，也无法自行托管。通过这一包装形式，Zcash 区别于其他资产的所有属性均不可获得——该包装形式只传递价格，仅此而已。对于目标是在经纪账户或退休账户内获得敞口的投资者而言，这正是其意义所在。对于因 Zcash 的隐私 [privacy] 而感兴趣的人而言，ETF 不能替代钱包 [wallet]，二者实际上并非彼此的替代选择。

## ZEC 以公开形式持有

这一结构还有进一步的讽刺意味，也是本页面最尖锐的一点。Coinbase Custody 将信托的 ZEC 存放在**透明 [transparent]**地址中，而不是屏蔽地址中。该基金的持仓在链上 [on-chain] 可见，可追溯至托管人，且任何有意查看的人都可实时观察。本基金没有任何部分使用屏蔽地址。

这并非疏忽。受监管基金基础设施围绕审计与证明建立，而屏蔽余额恰恰是审计师无法独立验证的内容。Coinbase 自身的支持政策反映了同样的不对称性：它会接收从屏蔽地址发送的 ZEC，但不会向屏蔽地址发送 ZEC。

因此，最大的隐私资产机构持有者以唯一不具隐私的形式持有它。这一点的来源是报道而非申报文件——S-3 描述了对信托私钥的托管，但未说明地址类型——因此此处带有这一保留条件。

## 涉及多少 ZEC

截至 2026 年 8 月 25 日上市时，该基金持有约 **387,000 ZEC**，管理资产约 **$313 million**。

从更长的视角看：截至 2025 年 9 月 30 日，申报文件称该信托持有约占流通中 ZEC **2.4%**。这两个数字都会变化——第一个随 ZEC 价格以及创建和赎回而变化，第二个则随着手续费从持仓中支付而变化——因此，应从最新申报文件或基金自身的每日披露中获取当前数字，而非参考本页面。

## 来源

除另有说明外，全部为主要来源，均位于 CIK 1720265 下的 EDGAR。

- [Grayscale Zcash Trust（ZEC）——EDGAR 申报索引](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Form S-3 注册声明，2025 年 11 月](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm)——实体角色、创建和赎回机制、发起人手续费以及流通中 ZEC 的百分比
- [截至 2024 年 12 月 31 日止年度的 Form 10-K](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [Zcash ETF 于 2026 年 8 月 25 日开始在 NYSE Arca 交易](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust 基金页面](https://www.grayscale.com/funds/grayscale-zcash-trust)——成立日期和当前披露
- [首个隐私币 ETF：剖析 Grayscale 的 Zcash 申报文件](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/)——二级来源；所找到的唯一说明信托 ZEC 存放于透明地址中的来源

数字截至所给日期，并将发生变化。核查日期为 2026 年 9 月 30 日。
仅供教育用途，不构成投资建议。

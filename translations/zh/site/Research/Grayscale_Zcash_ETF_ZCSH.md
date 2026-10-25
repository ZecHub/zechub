# Grayscale Zcash ETF（ZCSH）

**Zcash并未推出 ETF。Grayscale推出了**，方式是将其自 2017 年以来运营的一只基金进行转换。Zcash是一种协议——它没有公司、资金库或董事会，无法发行基金。Grayscale是一家独立资产管理公司，和其他人一样在公开市场买入
ZEC。

这一区别是人们对 ZCSH 最常误读的一点，也是本页的起点。2026 年 8 月 25 日，该基金开始在 NYSE Arca 交易，名称为*Zcash ETF*；这是美国首个现货 Zcash 交易所交易产品，如今也是现存 ZEC 的较大单一持有者之一。

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## 同一只基金，三个阶段

| 时间 | 变化 |
| --- | --- |
| 2017 年 10 月 | 作为私募配售基金推出，仅面向合格投资者 |
| 2021 年 10 月 | 份额以代码 ZCSH 在 OTCQX 报价交易，相对 NAV 存在折价 |
| 2026 年 8 月 25 日 | 成为可赎回的 NYSE Arca ETP，并从名称中去掉“Trust” |

2026 年这一步并非只是名称上的变化。场外报价的信托没有赎回机制，因此其份额价格可能相对于背后资产价值出现溢价或折价，有时幅度很大——这正是 2021 年至 2026 年间发生的情况。具备有效申购和赎回机制的交易所交易产品存在套利路径，可使份额价格与资产净值保持挂钩。从一种形式转为另一种，会改变该证券的运作方式。

## 各方职责

| 角色 | 相关方 |
| --- | --- |
| 发起人 | Grayscale Investments Sponsors, LLC |
| 受托人 | CSC Delaware Trust Company |
| 管理人及过户代理人 | Bank of New York Mellon |
| 主经纪商 | Coinbase, Inc.——为信托采购 ZEC |
| 授权参与者 | Jane Street、Virtu——创建和赎回份额 |
| 营销代理人 | Foreside Fund Services |
| **托管人** | **Coinbase Custody Trust Company, LLC**——实际 ZEC 存在的唯一地点 |

这些相关方中没有任何一家单独构成该基金。该结构是它们之间的安排，也正是上图所展示的内容。上市时的新闻报道遗漏或混淆了其中若干角色；此处的列表遵循 Grayscale 在 EDGAR 提交的 S-3 表格注册声明。

## 份额如何创建和赎回

只有授权参与者——与发起人签有协议的注册经纪交易商——可以创建或赎回份额，且只能以每组 10,000 份、称为 Basket 的单位进行。普通投资者从不接触这套机制；他们像买卖任何其他上市证券一样，在交易所买卖现有份额。

该机制目前为**现金**模式，而非实物模式。授权参与者将现金存入现金账户或从中收取现金，而实际取得或处置 ZEC 的是第三方流动性提供商。注册声明还描述了一种实物流程，即授权参与者将 ZEC 直接存入信托，或从信托取得
ZEC——但声明明确指出，“尚未获得实物监管批准”，并且可能永远无法获得。

因此，在现金流程下，ZEC 在流动性提供商与市场之间易手，绝不在投资者与信托之间易手。散户路径中的任何人都不会接触 Zcash 地址。

## 费用以 ZEC 支付

截至上市时，发起人费用为**每年 2.5%**。它按资产净值的一定比例每日累计，并且用申报文件中的表述来说，是“每日向发起人支付逾期的 ZEC”。

其后果是结构性的，而非附带的。费用从基金的 ZEC 中扣除，因此每份额所对应的 ZEC 数量每天都会略微减少。一份额并不是无限期持有固定数量的 ZEC；它代表的是对一个缓慢缩减的份额的请求权。任何将长期 ZCSH 敞口与直接持有 ZEC 进行比较的人，都需要将这一点纳入比较。

作为参考，2.5% 大约是典型现货 bitcoin ETF 费用的十倍。Grayscale 表示，发起人费用带来的早期收入将被投入 Zcash 生态系统的发展。

## 股东实际拥有的是什么

一份额代表对 ZEC 价格的敞口。它不是 ZEC。

股东无法发送屏蔽交易，无法附加备注，无法持有统一地址，也无法自行托管。通过这一包装工具，Zcash 区别于其他资产的特性一概无法获得——该工具仅传递价格敞口，别无其他。对于希望在经纪账户或退休账户内获得敞口的投资者而言，这正是其意义所在。对于任何因隐私而对 Zcash 感兴趣的人，ETF 不能替代钱包，两者其实并非真正的替代选择。

## ZEC 以公开形式持有

这一结构还存在进一步的讽刺之处，也是本页最尖锐的一点。Coinbase Custody 将信托的 ZEC 存放在**透明**
地址中，而非屏蔽地址中。该基金的持仓可在链上看见、可追溯至托管人，且任何有意查看的人都能实时观察。该基金没有任何部分使用屏蔽地址。

这并非疏漏。受监管基金基础设施围绕审计和证明建立，而屏蔽余额恰恰是审计师无法独立核验的内容。Coinbase 自身的支持政策也反映出同样的不对称：它会接收从屏蔽地址发送的 ZEC，但不会向屏蔽地址发送 ZEC。

因此，这项隐私资产最大的机构持有者以毫无隐私的唯一形式持有它。这一点来源于报道而非申报文件——S-3 描述了对信托私钥的托管，但未说明地址类型——因此此处是在这一前提下作出的表述。

## 涉及多少 ZEC

截至 2026 年 8 月 25 日上市时，该基金持有约 **387,000 ZEC**，管理资产约为 **3.13 亿美元**。

从更长时间维度看：截至 2025 年 9 月 30 日，申报文件称该信托持有约占流通中 ZEC 的 **2.4%**。这两个数字都会变动——前者随 ZEC 价格以及申购和赎回而变化，后者则因费用从持仓中支付而变化——因此应从最新申报文件或基金自身的每日披露中获取当前数字，而不是依据本页。

## 来源

除非另有说明，均为 EDGAR 上 CIK 1720265 名下的第一手资料。

- [Grayscale Zcash Trust（ZEC）——EDGAR 申报索引](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [2025 年 11 月 S-3 表格注册声明](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm)——实体角色、创建和赎回机制、发起人费用以及流通中 ZEC 的占比
- [截至 2024 年 12 月 31 日止年度的 10-K 表格](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [Zcash ETF 于 2026 年 8 月 25 日开始在 NYSE Arca 交易](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust 基金页面](https://www.grayscale.com/funds/grayscale-zcash-trust)——成立日期和当前披露
- [首只隐私币 ETF：解读 Grayscale 的 Zcash 申报文件](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/)——二手来源；所找到的唯一明确说明信托 ZEC 存放于透明地址的来源

数据截至所列日期，并会发生变动。核查日期：2026 年 9 月 30 日。
仅供教育用途，不构成投资建议。

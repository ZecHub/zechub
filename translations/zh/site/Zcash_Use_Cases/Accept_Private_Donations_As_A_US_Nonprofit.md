# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> 作为美国非营利组织接受私密 ZEC 捐赠

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  中级 - 10 分钟
</span>

> 本页面提供一般信息，并非法律或税务建议。美国税务规则会发生变化，因此请与您的会计师或税务顾问核实每一步。以下每项规则均链接至其 IRS 来源，并已于 2026 年 10 月根据 Publication 526（适用于 2025 年报税表）和 Form 8283（2025 年 12 月修订版）进行核查。IRS 虚拟货币常见问题针对 2025 年之前的交易编写，因此请结合现行指南进行核查。

## TL;DR

- 将捐赠保存在由组织控制的屏蔽钱包 [shielded wallet] 中，而非员工的个人钱包
- IRS 将 ZEC 视为财产，因此 ZEC 礼物属于非现金捐赠
- 对于价值 $250 或以上的礼物，请向捐赠者发送书面确认函，描述 ZEC，但不标注其美元价值
- 对于超过 $5,000 的礼物，捐赠者需要合格评估报告，而您需在其 Form 8283 上签字
- 如果您在收到 ZEC 后三年内出售它，且曾在捐赠者 Form 8283 的 B 部分签字，请提交 Form 8282
- 对您保持匿名的捐赠者通常无法申报 $250 或以上的税收扣除

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 本指南适用于谁？

- 希望接受 ZEC 的美国 501(c)(3) 慈善机构、教会和社区团体
- 正在建立加密货币捐赠机制的财务主管、簿记员和董事会成员
- 希望了解非营利组织需要其提供哪些材料的捐赠者

个人和创作者请参阅 [私密接收捐赠](/zcash-use-cases/receive-donations-privately)。

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题所在

大多数面向美国慈善机构的加密货币捐赠服务会为您提供透明地址，或通过透明地址为您兑换礼物。在透明地址上，任何人都可以看到每一笔礼物、其金额及您的余额。有意私密捐赠的捐赠者，会在礼物到账的瞬间失去这种隐私 [privacy]。

非营利组织还需处理个人无需处理的文书工作：捐赠者收据、较大额礼物的 IRS 表格，以及年度申报表。只要在第一笔礼物到账前做好规划，隐私和这些文书工作可以兼得。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 哪些信息保持私密，哪些不会

| | 向您的屏蔽地址进行的屏蔽礼物 |
|---|---|
| 公众 | 无法看到捐赠者、您的地址或金额 |
| 您的组织 | 可以看到金额和任何备忘录 [memo]；只有捐赠者告知时才能看到捐赠者身份 |
| 您的会计师 | 可以看到您分享的信息，例如通过 [viewing key](/zcash-tech/viewing-keys) |
| 您出售时 | 如果您的交易所只接受透明存款，您从屏蔽池 [shielded pool] 转出的金额将公开（参见 [turnstile](/zcash-tech/the-turnstile)） |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 您需要准备的内容

- 一项经董事会批准、涵盖加密货币的礼物接受政策
- 一个由组织控制、具有屏蔽地址的钱包 [wallet](/using-zcash/wallets)
- 如果您计划将 ZEC 兑换为美元，则需以组织名义开设交易所账户
- 一名处理过非现金礼物的会计师

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 分步指南

### 第 1 步：确定您的政策

记录以下内容并获得董事会批准：
- 谁可以转移资金，以及每次转移是否必须由两人批准
- 您是立即出售每份礼物，还是持有部分 ZEC
- 您是否接受匿名礼物，以及可接受的最高金额

### 第 2 步：设置由组织控制的钱包

- 在组织设备上创建钱包，而非个人手机上
- 将助记词 [seed phrase] 离线保存，由两名均可获取它的负责人保管
- 如需共同控制，请参阅 [运营私密社区金库](/zcash-use-cases/private-community-treasury)

### 第 3 步：公布屏蔽地址

- 在捐赠页面分享仅屏蔽地址。[统一地址](/using-zcash/unified-addresses) 以 `u1` 开头，但它也可能包含透明接收器，因此来自仅支持透明地址的钱包的礼物会公开到账。如您的钱包提供，请使用其仅屏蔽地址。
- 不要公布透明地址（其以 `t1` 或 `t3` 开头）
- 请希望获得收据的捐赠者在 [备忘录](/using-zcash/memos) 中填写其电子邮件地址。备忘录经过加密，因此只有您的组织可以读取。

### 第 4 步：记录每份礼物

对于每份礼物，记录：
- 收到的日期和时间
- 以 ZEC 计的金额
- 当时的美元价值，以及您使用的价格来源
- 交易 ID 和备忘录

IRS 将 ZEC 视为财产（[Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)），因此这在您的账簿中属于非现金捐赠。若要向会计师提供只读访问权限，请参阅 [使用屏蔽 ZEC 保存记录](/zcash-use-cases/keeping-records-with-shielded-zec)。

### 第 5 步：确认价值 $250 或以上的礼物

若没有您的书面确认函，捐赠者无法扣除单笔价值 $250 或以上的礼物（[Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)）。对于 ZEC 礼物，请包括：
- 您的组织名称
- 您收到礼物的日期
- 礼物描述，例如 "1.5 ZEC"。不要标注美元价值：评估礼物价值是捐赠者的责任。
- 您是否提供任何回报，例如 "未为此项捐赠提供任何商品或服务作为交换。"

捐赠者必须在提交其纳税申报表之前取得该确认函（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)）。组织通常会在次年 1 月 31 日前发送；立即发送最简单。

### 第 6 步：为超过 $5,000 的礼物签署 Form 8283

如果捐赠者申报超过 $5,000，他们需要合格评估报告。加密货币不属于公开交易证券，因此须对其进行评估（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)，[CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)）。捐赠者会向您提交 [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf)，而您应在 B 部分的受赠人栏签字。您的签名确认您于该日期收到了 ZEC；并不确认捐赠者申报的价值（[IRS FAQ，第 36 问](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

### 第 7 步：如有需要，兑换为美元

- 在 [托管交易所](/using-zcash/custodial-exchanges) 中查看哪些交易所接受屏蔽存款。许多交易所只接受透明存款。
- 如果您使用的交易所仅支持透明地址，请在出售时一步将 ZEC 从屏蔽钱包转至交易所。该金额将公开，但您的其他礼物和余额仍保持私密。
- 如果您在收到 ZEC 后三年内出售它，且曾在捐赠者 Form 8283 的 B 部分签字，请在出售后 125 天内提交 [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)，并向捐赠者发送副本（[IRS FAQ，第 37 问](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

### 第 8 步：在年度申报表中报告

在您的 Form 990 系列申报表中，将 ZEC 礼物作为非现金捐赠进行申报；如适用，请附上 [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990)。请询问您的会计师应如何列出匿名礼物。

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 匿名捐赠者：他们可以和不可以申报什么

- 不让公众知道与不让您知道并不相同。捐赠者可以私密捐赠，同时在备忘录中提供电子邮件地址以获得收据。
- 对您保持匿名的捐赠者无法获得确认函，因此无法扣除单笔价值 $250 或以上的礼物。
- 超过 $5,000 时，捐赠者还需要评估报告和您在 Form 8283 上的签名，这意味着他们必须告诉您其身份。
- 对捐赠者而言，持有超过一年的 ZEC 礼物通常可按公平市场价值扣除，且礼物无需缴纳资本利得税（[IRS FAQ，第 34–35 问](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

请在捐赠页面说明这一点，以便捐赠者在捐赠前作出选择。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 应避免的常见错误

- 将礼物存放在员工的个人钱包中
- 将透明地址或交易所存款地址作为捐赠地址公布
- 在确认函中标注美元价值
- 在三年内出售却忘记提交 Form 8282
- 向匿名捐赠者承诺税收扣除

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 成果

您可以：
- 接受 ZEC，而不暴露您的捐赠者或余额
- 向捐赠者提供申报扣除所需的文书
- 保存可供会计师和审计师核查的记录

<br/>

## 来源

- [IRS：虚拟货币交易常见问题](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)（第 34–37 问涵盖慈善机构）
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771：慈善捐赠、证明和披露](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526：慈善捐赠](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561：确定捐赠财产的价值](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012：加密货币礼物的评估](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) 和 [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关内容

- [私密接收捐赠](/zcash-use-cases/receive-donations-privately) - 面向个人的相同理念
- [使用屏蔽 ZEC 保存记录](/zcash-use-cases/keeping-records-with-shielded-zec) - 用于账簿的备忘录和 viewing key
- [Viewing Key](/zcash-tech/viewing-keys) - 供会计师或审计师使用的只读访问权限
- [Turnstile](/zcash-tech/the-turnstile) - 当 ZEC 离开屏蔽池时哪些信息会公开

<br/>

## 下一步

- [运营私密社区金库](/zcash-use-cases/private-community-treasury)

<br/>

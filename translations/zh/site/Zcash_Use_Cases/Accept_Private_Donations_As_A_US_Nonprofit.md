# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> 作为美国非营利组织接受私密的 ZEC 捐赠

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  中级 - 10 分钟
</span>

> 本页面提供一般信息，并非法律或税务建议。美国税法会发生变化，因此请与您的会计师或税务顾问核实每一步。以下每项规则均链接至其 IRS 来源，并已于 2026 年 10 月根据《Publication 526》（适用于 2025 年申报）和《Form 8283》（2025 年 12 月修订版）核查。IRS 虚拟货币常见问题解答面向 2025 年之前的交易编写，因此请与现行指南进行核对。

## TL;DR

- 将捐赠保存在由组织控制的 shielded wallet 中，而非工作人员的个人 wallet
- IRS 将 ZEC 视为财产，因此 ZEC 礼赠属于非现金捐款
- 对于 250 美元或以上的礼赠，请向捐赠者发送书面确认函，说明 ZEC，但不要标明其美元价值
- 对于超过 5,000 美元的礼赠，捐赠者需要合格的评估报告，而您须在其 Form 8283 上签字
- 如果您在收到 ZEC 后三年内将其出售，并且已在捐赠者 Form 8283 的 B 部分签字，请提交 Form 8282
- 对您保持匿名的捐赠者通常无法就 250 美元或以上的捐赠申请扣除

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 本指南适合谁？

- 希望接受 ZEC 的美国 501(c)(3) 慈善机构、教会和社区团体
- 正在设置 crypto 捐赠的财务主管、簿记员和董事会成员
- 想了解非营利组织需要其提供哪些材料的捐赠者

个人和创作者请参阅 [私密接收捐赠](/zcash-use-cases/receive-donations-privately)。

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题所在

大多数面向美国慈善机构的 crypto 捐赠服务会向您提供透明地址，或通过透明地址为您兑换礼赠。在透明地址上，任何人都能看到每笔礼赠、其金额及您的余额。有意私密捐赠的捐赠者，其礼赠到账的瞬间便会失去这份隐私。

非营利组织还需要处理个人无需处理的文书工作：捐赠者收据、较大额礼赠的 IRS 表格以及年度申报表。只要在第一笔礼赠到达前做好规划，隐私与这些文书工作可以兼得。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 哪些信息保持私密，哪些不会

| | 向您的 shielded 地址进行的 shielded 礼赠 |
|---|---|
| 公众 | 无法看到捐赠者、您的地址或金额 |
| 您的组织 | 可以看到金额及任何 memo；仅在捐赠者告知时才能看到其身份 |
| 您的会计师 | 可以看到您分享的内容，例如通过 [查看密钥](/zcash-tech/viewing-keys) |
| 您出售时 | 如果您的交易所仅接受透明存款，那么您从 shielded pool 转出的金额将公开（参见 [旋转门](/zcash-tech/the-turnstile)） |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 您需要准备什么

- 经董事会批准且涵盖 cryptocurrency 的礼赠接受政策
- 由组织控制、具有 shielded 地址的 [wallet](/using-zcash/wallets)
- 如果计划将 ZEC 兑换为美元，则需以组织名义开设交易所账户
- 曾处理过非现金礼赠的会计师

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 分步指南

### 第 1 步：确定您的政策

记录以下事项，并取得董事会批准：
- 谁可以转移资金，以及每次转移是否必须由两人批准
- 是立即出售每笔礼赠，还是持有部分 ZEC
- 是否接受匿名礼赠，以及接受的金额上限

### 第 2 步：设置由组织控制的 wallet

- 在组织设备上创建 wallet，而非个人手机
- 将 seed phrase 离线保存，并由两名均可取得它的负责人保管
- 如需共同控制，请参阅 [运营私密社区金库](/zcash-use-cases/private-community-treasury)

### 第 3 步：发布 shielded 地址

- 在您的捐赠页面上分享仅 shielded 的地址。[统一地址](/using-zcash/unified-addresses)以 `u1` 开头，但它也可能包含透明接收器，因此来自仅透明 wallet 的礼赠会公开到账。若您的 wallet 提供仅 shielded 地址，请使用该地址。
- 不要发布透明地址（其以 `t1` 或 `t3` 开头）
- 请希望获得收据的捐赠者将其电子邮箱写入 [memo](/using-zcash/memos)。memo 已加密，因此只有您的组织能够读取。

### 第 4 步：记录每笔礼赠

对于每笔礼赠，记录：
- 收到的日期和时间
- ZEC 金额
- 当时的美元价值，以及您所使用的价格来源
- 交易 ID 和 memo

IRS 将 ZEC 视为财产（[Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)），因此在您的账簿中，这属于非现金捐款。如需让会计师获得只读访问权限，请参阅 [使用 shielded ZEC 保存记录](/zcash-use-cases/keeping-records-with-shielded-zec)。

### 第 5 步：确认 250 美元或以上的礼赠

若没有您出具的书面确认函，捐赠者无法扣除单笔 250 美元或以上的礼赠（[Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)）。对于 ZEC 礼赠，请包含：
- 您组织的名称
- 您收到礼赠的日期
- 礼赠说明，例如“1.5 ZEC”。请勿标明美元价值：礼赠估值由捐赠者负责。
- 您是否提供任何回馈，例如“未就此捐款提供任何商品或服务作为交换。”

捐赠者必须在提交报税表前取得该确认函（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)）。组织通常在次年 1 月 31 日前发送；立即发送最简单。

### 第 6 步：对于超过 5,000 美元的礼赠，签署 Form 8283

如果捐赠者申报超过 5,000 美元的扣除额，他们需要合格的评估报告。Crypto 不属于公开交易证券，因此需对其进行评估（[Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)、[CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)）。捐赠者会将 [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) 交给您，您须在 B 部分的受赠方栏目签字。您的签名确认您于该日收到 ZEC；并不确认捐赠者所申报的价值（[IRS FAQ，第 36 问](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

### 第 7 步：如有需要，兑换为美元

- 在 [托管式交易所](/using-zcash/custodial-exchanges) 查看哪些交易所接受 shielded 存款。许多交易所仅接受透明存款。
- 若您的交易所仅支持透明存款，请在出售时一步将 ZEC 从 shielded wallet 转至交易所。该金额会公开，但您的其他礼赠和余额仍保持私密。
- 如果您在收到 ZEC 后三年内将其出售，且已在捐赠者 Form 8283 的 B 部分签字，请在出售后 125 天内提交 [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)，并向捐赠者发送副本（[IRS FAQ，第 37 问](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

### 第 8 步：在年度申报表中报告

在您的 Form 990 系列申报表中，将 ZEC 礼赠作为非现金捐款报告；如适用于您，请附上 [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990)。请咨询您的会计师如何列报匿名礼赠。

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 匿名捐赠者：他们可以和不可以申报什么

- 不向公众公开隐私，不等于对您匿名。捐赠者可以私密捐赠，同时在 memo 中提供其电子邮箱以获得收据。
- 对您保持匿名的捐赠者无法获得确认函，因此不能扣除单笔 250 美元或以上的礼赠。
- 超过 5,000 美元时，捐赠者还需要评估报告及您在 Form 8283 上的签名，这意味着他们必须告知您身份。
- 对捐赠者而言，持有超过一年的 ZEC 礼赠通常可按公平市价扣除，且礼赠无需缴纳资本利得税（[IRS FAQ，第 34–35 问](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)）。

请在您的捐赠页面说明这些内容，以便捐赠者在捐赠前作出选择。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 应避免的常见错误

- 将礼赠保存在工作人员的个人 wallet 中
- 将透明地址或交易所存款地址作为捐赠地址发布
- 在确认函中写入美元价值
- 三年内出售却忘记提交 Form 8282
- 向匿名捐赠者承诺税务扣除

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 结果

您可以：
- 接受 ZEC，而不暴露捐赠者或您的余额
- 向捐赠者提供申请扣除所需的文书
- 保留可供会计师和审计师核查的记录

<br/>

## 来源

- [IRS：虚拟货币交易常见问题解答](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)（第 34–37 问涵盖慈善机构）
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771：慈善捐款、证明和披露](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526：慈善捐款](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561：确定捐赠财产的价值](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS 首席法律顾问意见 202302012：crypto 礼赠的评估报告](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) 和 [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关内容

- [私密接收捐赠](/zcash-use-cases/receive-donations-privately) - 面向个人的相同理念
- [使用 shielded ZEC 保存记录](/zcash-use-cases/keeping-records-with-shielded-zec) - 用于账簿的 memo 和查看密钥
- [查看密钥](/zcash-tech/viewing-keys) - 供会计师或审计师使用的只读访问权限
- [旋转门](/zcash-tech/the-turnstile) - 当 ZEC 离开 shielded pool 时，哪些信息会公开

<br/>

## 下一步

- [运营私密社区金库](/zcash-use-cases/private-community-treasury)

<br/>

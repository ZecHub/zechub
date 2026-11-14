# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> 发起一场 ZEC 筹款活动

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  中级 - 10 分钟
</span>

## TL;DR

- 为活动单独设置一个钱包 [wallet] 账户和一个屏蔽 [shielded] 地址 [address]，以免与其他资金混在一起
- 分享一个已填写建议金额和备忘录 [memo] 的支付 [payment] 请求链接或 QR 码
- 在不暴露捐赠者的情况下展示进度：自行发布总额，或向一位可信审核人提供 viewing key
- viewing key 覆盖整个账户，而不只是一个地址，因此活动需要独立账户
- 在承诺的日期结束活动，并公布资金的使用方式

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 这适合谁？

- 为一个目标筹款的社区团体、开源项目和创作者
- 在 ZEC 发起年末或紧急募捐的非营利组织
- 希望捐赠者信任活动，同时不公开每笔捐赠的任何人

如果您是美国非营利组织，请先阅读 [作为美国非营利组织接受私人捐赠](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)，了解收据和 IRS 表格。

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题所在

大多数加密货币筹款活动使用透明 [transparent] 地址，以便捐赠者查看总额增长情况。但这也会显示每笔捐赠、金额、到账时间以及资金之后的去向。有意私下捐赠的捐赠者会失去这种隐私 [privacy]，任何人都能在活动结束后追踪这些资金。

完全私密的活动则有相反的问题：捐赠者无法看到是否达成目标，或资金如何被使用。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 为什么选择 Zcash？

通过屏蔽的 ZEC，每笔捐赠都会在链上 [on-chain] 保持私密，您可以决定展示什么：总额、进度条，或向审核人提供只读访问权限。捐赠者可以在 [备忘录](/using-zcash/memos) 中添加留言，而您可以感谢他们，无需让其他人看到是谁捐赠的。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 您需要什么

- 一个可创建独立账户的屏蔽 [钱包](/wallets)
- 一个活动页面：网站、社交媒体帖子或论坛主题帖
- 一个目标、结束日期，以及资金使用计划

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 分步指南

### 第 1 步：设定目标和规则

在启动前，写下：

- 您要筹集多少资金，以及资金用途
- 结束日期
- 如果筹集的金额高于或低于目标，会如何处理
- 谁控制资金，以及支出是否需要多人批准（参见 [运行私人社区金库 treasury](/zcash-use-cases/private-community-treasury)）

将这些内容发布在活动页面上。明确说明活动将如何开展，会让捐赠者更信任您。

### 第 2 步：为活动创建独立账户

在您的钱包中创建一个仅用于本次活动的新账户，并从中复制一个屏蔽地址。将活动资金分开可使总额易于查看；如果您之后分享 viewing key，这一点尤为重要，因为 viewing key 会显示整个账户的活动（[Viewing Keys](/zcash-tech/viewing-keys)）。

### 第 3 步：创建支付请求链接和 QR 码

[支付请求 URI](/using-zcash/payment-request-uris) 是一种 `zcash:` 链接，可为捐赠者填入地址、建议金额和备忘录。使用 ZecHub 的 [支付请求生成器](/tools) 创建一个，然后以链接和 QR 码的形式分享。

像"活动名称，回复地址：您的电子邮件或账号"这样的备忘录，有助于希望收到感谢或收据的捐赠者。在页面上说明备忘录是可选的。

### 第 4 步：发布活动页面

在页面上放置：

- 第 1 步中的目标、结束日期和规则
- 屏蔽地址、QR 码和链接
- 如何通过屏蔽钱包捐赠，以及在哪里获取钱包
- 您将如何报告进度（第 5 步）

将地址固定在一个位置，并告诉捐赠者只从那里复制地址。

### 第 5 步：在不暴露捐赠者的情况下报告进度

选择一种方式，并在页面上说明：

- **自行发布总额**，例如每周一次，根据钱包中活动账户的余额发布
- **向一位可信审核人提供 viewing key**，例如董事会成员或捐赠者熟悉的社区成员，由其公开确认总额。传入 viewing key 显示收到的捐赠；完整 viewing key 也会显示支出（[Viewing Keys](/zcash-tech/viewing-keys)）

不要在活动页面上发布 viewing key。任何拥有它的人都能看到每笔捐赠的金额和备忘录，包括捐赠者的联系信息。

### 第 6 步：感谢捐赠者

回复在备忘录中留下联系信息的捐赠者。未经捐赠者事先同意，绝不公开其姓名或捐赠金额。

### 第 7 步：结束并报告

在结束日期：

- 说明活动已结束，并移除或更新地址和 QR 码
- 发布最终总额以及资金支付了什么
- 如果您分享了 viewing key，请审核人确认最终总额和支出

[支付披露](/zcash-tech/payment-disclosures) 未来或许能让您无需 viewing key 即可证明单笔支付，但该标准仍处于草案阶段，因此暂时不要依赖它。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 要避免的常见错误

- 使用日常钱包账户运行活动
- 发布 viewing key，从而暴露每位捐赠者的金额和备忘录
- 因为更容易展示总额而使用透明地址或交易所 [exchange] 充值地址
- 活动结束后仍保留地址，导致捐赠不断到账却没有处理计划
- 从不报告资金的使用方式

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 结果

您可以：

- 为明确目标筹集 ZEC，同时让每笔捐赠在链上保持私密
- 展示捐赠者可以信赖的进度
- 通过公开报告结束活动，而不暴露捐赠者

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关内容

- [私密接收捐赠](/zcash-use-cases/receive-donations-privately) - 无需活动的持续性捐赠
- [运行私人社区金库](/zcash-use-cases/private-community-treasury) - 共享资金的角色和审批
- [支付请求 URI](/using-zcash/payment-request-uris) - 已填入金额和备忘录的链接与 QR 码
- [Viewing Keys](/zcash-tech/viewing-keys) - 面向审核人的只读访问权限
- [在哪里捐赠 ZEC](/zcash-use-cases/where-to-donate-zec) - 已接受 ZEC 的非营利组织

<br/>

## 下一步

- [作为美国非营利组织接受私人捐赠](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

如果您是新手，请从这里开始：[什么是 Zcash](/start-here/what-is-zec-and-zcash)

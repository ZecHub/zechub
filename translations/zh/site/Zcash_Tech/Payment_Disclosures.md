<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 屏蔽 [Shielded] 支付证明 [proof] 与支付披露

## TL;DR

- 交易 [transaction] ID 可识别一笔交易，但不会泄露屏蔽收款方、金额或备忘录 [memo]。
- 支付披露旨在让发送方证明一笔支付的选定详情，而无需暴露其余的钱包 [wallet] 历史记录。
- viewing key 可持续授予对一个地址 [address] 或账户的读取权限。请将其用于持续审计，而非单笔支付争议。
- 支付披露无法证明商品已送达、单独识别某个人、撤销一笔支付，或取代确认检查。
- [ZIP 311](https://zips.z.cash/zip-0311) 仍处于**草案 [Draft]**阶段。其当前文本尚未完成对 Orchard 的支持、透明 [transparent] 输入支持、编码、版本控制及用户界面规则。

## 为什么交易 ID 不足够

任何人都可以检查一笔透明 Zcash 支付的公开详情。区块 [block] 浏览器可以显示其地址、金额和确认状态。

屏蔽支付则不同。链 [chain] 会证明该交易遵循了 Zcash 的规则，但不会公布屏蔽发送方、收款方、金额或备忘录。分享交易 ID 可以表明交易已被挖矿 [mining]，但无法向商家或第三方证明其中包含的是哪笔私密支付。

这带来了一个实际问题。客户可能需要解决与商家的争议，交易所 [exchange] 可能需要证明其已处理提款，或捐赠者可能希望证明一笔捐款。分享完整 viewing key 会泄露远超这些情况所需的信息。

[ZIP 311：Zcash支付披露](https://zips.z.cash/zip-0311)提出了一个更窄范围的答案：披露并验证一笔交易中的选定信息。

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## 支付披露如何运作

基本流程如下：

1. 当交互式证明适用时，验证方会向发送方提供唯一的质询或参考编号。
2. 发送方选择要披露的交易以及一个或多个屏蔽输出。
3. 兼容的钱包软件会创建与该交易相关联、并可选择绑定质询的支付披露。
4. 发送方向验证方提供该披露。
5. 验证方从可信的 Zcash 节点 [node] 获取真实交易，检查其是否已被挖矿，并据此验证披露。
6. 有效结果仅确认该披露中包含的声明。

ZIP 的 Sapling 设计使用传出密文密钥来恢复每个选定输出。这可以揭示输出的收款方、金额和备忘录。它还要求证明至少一个交易输入的花费权限，因此仅仅看到交易的人无法像发送者一样创建有效披露。

Sapling 支付披露不必揭示发送方地址。花费权限可以控制许多多样化地址，因此证明对花费的控制权并不会自动识别某个地址。ZIP 311 包含可选的地址证明，用于必须将证明关联至已知发送方地址的情况。

## 支付披露还是 viewing key？

| 方法 | 最佳用途 | 会揭示什么 | 持续访问？ | 是否在密码学上绑定至支付？ |
| --- | --- | --- | --- | --- |
| Transaction ID | 检查交易是否已被挖矿 | 公开交易数据和确认信息 | 否 | 是，但屏蔽支付详情仍然隐藏 |
| Screenshot or receipt | 非正式记录保存 | 发送方选择展示的任何内容 | 否 | 否；图像可以被编辑 |
| Payment disclosure | 证明一笔支付的选定详情 | 选定的交易输出，以及包含在内的任何发送方或质询证明 | 否，但共享的证明可被复制 | 是 |
| Incoming Viewing Key | 监控账户收到的支付 | 密钥涵盖的传入活动 | 是 | 它会解密匹配的传入支付 |
| Full Viewing Key | 对账户进行记账或审计 | 密钥涵盖的传入和传出活动、金额、备忘录及余额 | 是 | 它会解密匹配的账户活动 |

请使用能够回答问题的最小范围披露。有关一笔支付的商家争议通常不应当成为访问账户中每笔支付的理由。必须审查整个报告期的会计人员则可能需要 viewing key。

这两种方法均不授予花费权限。绝不要将助记词 [seed phrase]、花费密钥 [spending key]、私钥或钱包备份作为支付证明分享。

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## 我今天可以使用什么？

此处未确认任何当前钱包实现了 ZIP 311 支付披露的创建或验证。ZIP 仍为草案，其参考实现列为"TBD"。以下持续维护的工具 [tools] 仍可帮助发送方、收款方或获授权审计人员检查如今可用的记录：

| 应用 | 如今可用于 | 重要限制 |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | 查看详细交易元数据、金额、pool 输入和输出及备忘录；将 Unified 或 Sapling viewing key 导入仅查看账户 | 不宣称支持 ZIP 311 披露创建或验证 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | 审查屏蔽交易历史和备忘录；以只读模式导入 Unified Full Viewing Key | 钱包记录或只读账户不是选择性限定范围的支付披露 |
| [Zallet](https://zcash.github.io/zallet/) | 使用 `z_viewtransaction`、`z_exportviewingkey` 和 `z_importviewingkey` 的运营者工作流程 | Beta 软件；其 viewing key 和交易 RPC 涉及更广范围或本地记录，而非 ZIP 311 证明 |

请首先使用发送或接收该支付的钱包。检查其交易详情、备忘录、交易 ID 和确认信息，然后要求对方将这些详情与其自身记录进行比对。不要为了生成证据而安装新钱包并输入助记词。如果审计人员需要持续可见性，请考虑使用兼容的仅查看账户，并在分享前了解 viewing key 的范围。

这些应用是检查记录的实用替代方案，并不能证明已有标准化支付披露可用。截图可以帮助人们比对记录，但它可被编辑，且不是密码学证明。

## 支付披露适用的场景

### 商家争议

客户可以证明特定金额已发送至商家的屏蔽地址。该证明无法确定商品是否已交付、是否应退款，或出示该证明的人是否具有特定法律身份。这些问题仍取决于订单记录及双方协议。

### 屏蔽提款

ZIP 311 将屏蔽提款列为目标用例 [use case]：交易所将在不链上 [on-chain] 公布这些详情的情况下证明收款方和金额。其透明输入证明仍未完成，因此这尚不是完整的标准化工作流程。客户还必须独立检查交易的确认状态。

### 捐款

捐赠者或活动发起方可以证明某笔特定捐款，同时使无关支付保持私密。发布披露会使其中选定的详情对每个收到副本的人公开，因此当无需公开证明时，私密验证渠道更安全。

### 记账

当会计人员需要一笔交易的证据时，请使用支付披露。当会计人员需要持续访问许多交易或完整报告期时，请使用范围最窄的适当 viewing key。

## 隐私安全的工作流程

ZIP 311 尚未成为完成且可广泛部署的钱包标准。当兼容的发送方和验证方工具可用时，请使用以下清单：

1. **首先确认兼容性。** 两个工具必须支持相同的披露格式及支付所使用的屏蔽池 [pool]。
2. **首先解决常规问题。** 在披露私密详情之前，检查钱包同步、交易 ID、确认数量、到期状态及收款方记录。
3. **请求质询。** 对于争议，验证方应提供新的订单编号或随机质询，使披露绑定至该请求。
4. **仅选择所需输出。** 不要包含同一交易中的无关输出。
5. **预览每个披露字段。** 导出前检查收款方、金额、备忘录、发送方地址证明和质询。
6. **通过私密渠道分享。** 披露不是秘密花费密钥，但任何收到它的人都可能保留或再分发其揭示的信息。
7. **根据链进行验证。** 验证方必须从可信节点获取准确交易，确认其位于预期网络和区块中，然后验证披露。
8. **记录结果，而非额外秘密。** 仅保留争议、提款、捐款或记账流程所需的内容。

如果钱包无法生成披露，在不了解其更广泛且永久范围的情况下，不要以完整 viewing key 替代。询问收款方能否从其自身钱包记录中确认支付，或能否接受敏感性较低的记录。

## 有效披露无法证明什么

验证成功并不证明：

- 该交易拥有足以符合验证方风险政策的确认数量
- 链重组无法移除最近交易
- 商品或服务已交付
- 需要退款或拒付
- 发送方控制某个特定地址，除非包含适当的地址证明
- 出示披露的人拥有其声称的现实世界身份
- 未披露输出、其他交易或钱包余额具有任何特定价值
- 披露在被分享后仍保持私密

验证方必须单独检查链包含情况和确认状态。ZIP 311 的验证程序假设调用者已取得已挖矿交易及其区块高度。

## 当前限制

请将 ZIP 311 视为拟议标准，而非承诺当前钱包拥有可用的**证明支付 [Prove payment]**按钮。

该草案当前规定了 Sapling 花费和输出，但对 Orchard、透明输入、披露编码、版本控制，以及钱包应如何显示不同有效性级别仍包含未完成项目。其参考实现也列为"TBD"。按当前文本，它未定义针对 Orchard 或 Ironwood 支付的支付披露。

如果交易在创建时刻意未为该输出创建传出 viewing key，发送方也可能无法披露一个输出。ZIP 311 保留了这种隐私选择，而非创建新的恢复路径。

较早的文档描述了 `zcashd` 中实验性的 `z_getpaymentdisclosure` 和 `z_validatepaymentdisclosure` 命令。这些命令仅支持**Sprout JoinSplit 输出**，而不支持 ZIP 311 中的 Sapling 设计，并且已被弃用。`zcashd` 于 2026 年 7 月达到了最终停止支持状态。不要将该旧版演练作为当前资金的操作说明。

这些缺口并不意味着这一理念毫无用处。它们解释了为什么谨慎的指南必须将隐私模型和用例与可供普通用户使用的软件区分开来。

## 常见问题

### 我能否仅凭交易 ID 证明一笔屏蔽支付？

不能。该 ID 可以识别交易及其确认状态，但屏蔽收款方、金额和备忘录并不公开。

### 支付披露和 viewing key 是同一回事吗？

不是。披露的范围限于一笔交易的选定详情。viewing key 可以随着时间推移揭示某个地址或账户的匹配活动。

### 收款方可以创建发送方的证明吗？

不能，至少在 ZIP 311 设计下不能。有效披露必须证明至少一个输入的花费权限。收款方可以使用自身的钱包记录确认支付，但那是不同的声明。

### 我能在分享披露后撤销它吗？

不能。它不像 viewing key 那样授予未来账户访问权限，但已揭示的数据和证明可以被复制。请像对待任何私密财务记录一样谨慎分享它。

### 验证会移动或锁定任何 ZEC 吗？

不会。创建或验证披露不会花费、退款、冻结或撤销资金。

### 如果我的钱包没有披露功能，我今天应使用什么？

请从收款方的钱包记录、交易 ID 和确认状态、加密备忘录中的发票参考编号，或双方共同接受的其他收据开始。仅当其更广泛的范围确实必要且已被理解时才使用 viewing key。

## 资源

- [ZIP 311：Zcash支付披露](https://zips.z.cash/zip-0311) - 草案设计、要求、验证流程和隐私考量
- [ZIP 310：SaplingViewing Keys 的安全属性](https://zips.z.cash/zip-0310) - viewing key 会揭示什么以及它们提供哪些保障
- [ZIP 304：Sapling地址签名 Signatures](https://zips.z.cash/zip-0304) - ZIP 311 所引用的可选地址证明机制
- [Zcash协议规范](https://zips.z.cash/protocol/protocol.pdf) - Sapling note 加密 [encryption]、传出 viewing key 和花费授权
- [已归档的 zcashd 支付披露文档](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - 历史 Sprout 专用实现，并非当前指南
- [zcashd已弃用功能](https://zcash.github.io/zcash/user/deprecation.html) - 旧实验性披露命令的状态

## 相关页面

- [交易](/using-zcash/transactions) - 屏蔽支付、确认信息和交易故障排查
- [Viewing keys](/zcash-tech/viewing-keys) - 持续只读访问和当前导出选项
- [区块浏览器可以看到什么](/zcash-tech/what-a-block-explorer-can-see) - 公开和私密交易字段
- [使用屏蔽 ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) 保存记录 - 在不公布钱包历史的情况下进行记账

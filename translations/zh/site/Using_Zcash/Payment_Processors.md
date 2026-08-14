<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 支付处理器

并排比较商家接受 ZEC 的方式。每一项都已根据服务提供商自己的网站和 API 于 **2026 年 7 月 29 日**核查。

对隐私资产的支持经常变化，因此每一行都附有各自的核实日期。如果你是在几个月后阅读本文，请在集成前先检查服务提供商的网站。

<div class="processor-table">

| 处理器 | 托管方式 | Shielded ZEC | 自托管 | 商家费用 | 地区 / KYC | 已核实 |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | 非托管 | 是，Orchard，通过 Unified Addresses | 是，开源 | 每笔支付 1%，自托管则免费 | 无 KYC，地区未说明 | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | 非托管，仅 view key | 是，仅 shielded（Sapling、Orchard、UA） | 是，开源 | 无，仅支付网络费用 | 全球，无 KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | 非托管 | 是，Sapling 和 Orchard | 否，托管服务 | 预付费会话，价格未公布 | 未说明需要 KYC，地区未说明 | 2026-07-29 |
| [Flexa](https://flexa.co/) | 客户自托管，商家以法币结算 | 客户可使用 shielded 支付，接收端未文档说明 | 否 | 每笔支付 1% | 美国和 37 个 SEPA 国家，欧盟是否支持 ZEC 未确认 | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | 默认非托管 | 否，仅透明地址 | 否 | 0.5%，兑换则为 1% | 除法律禁止地区外全球可用，开始时无需 KYC | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | 尽管营销如此宣传，但实际为托管型 | 未文档说明 | 否 | API 0.5%，白标 1.5% | 接收付款无需 KYC | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | 托管型，链下 | 否，拒绝 shielded 充值 | 否 | 钱包到钱包免费，提现 0.8% | 有地区限制，ZEC 已在 FR、ES、IT、PL 下架 | 2026-07-29 |

</div>

### 各列含义

**托管方式** 指处理器是否持有你的 ZEC。非托管意味着它会进入你自己控制的钱包。

**Shielded ZEC** 指你是否可以收款到 shielded 池。仅透明意味着金额和地址都会在 blockchain 上公开。

**自托管** 指你是否可以自己运行该软件，而不需要中间公司。

**商家费用** 不包括 Zcash 网络费用，而网络费用在任何情况下都需要由某一方支付。

当服务提供商没有公布某项信息时，条目会写“未说明”或“未文档说明”，而不是猜测。这并不等于“没有”。

### 该选哪一个

如果你最看重隐私和控制权，请使用 **BTCPay Server** 或自托管的 **CipherPay**。两者都支持 shielded、开源，而且不会替你持有资金。

如果你是在实体店收款而不是在线收款，请使用 **Flexa**。

如果你需要托管网关，并且可以接受透明支付，请使用 **NOWPayments** 或 **Plisio**。

有一点值得反复强调：仅支持透明地址的处理器会把每笔支付的金额和地址都公开写到 blockchain 上。而对于任何托管型非托管处理器，你都需要交出自己的 viewing key，因此公司虽然不能动用你的资金，但仍然可以看到你的收款。避免这一点的唯一方法就是自托管。

<div class="processor-note">

**ZGo 服务警告，2026 年 7 月 29 日。** 在核查本页内容期间，ZGo 后端 api.zgo.cash 的所有端点都返回了 HTTP 503。该项目并未被废弃，而且其维护者本月仍在社区中活跃，但在依赖它之前，请先确认服务正在运行。

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **支持类型**：Shielded（Orchard，通过 Unified Addresses）
- **描述**：几分钟内即可接受 Zcash，非托管，零买家数据，无中间人。
- **URL**：[CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

你向 CipherPay 提供一个只读的 view-only key，因此付款会直接进入你自己的钱包，它从不持有资金。它会为每张发票使用一个新的地址。

仅支持 Orchard。即使仓库 README 提到了 Sapling，也没有 Sapling 或透明地址支持。

每笔支付收费 1%，如果你自己运行，则完全免费。整个项目是开源的，可作为 Rust 二进制配合 SQLite 运行，也可以作为 Docker 镜像运行。无需 KYC，买家也不需要账户。

集成方式包括 Shopify、WooCommerce、REST API、托管结账页、支付链接，以及线下二维码。

有两点需要权衡。它于 2026 年 2 月上线，尚无公开的安全审计。而在托管层级中，运营方持有你的 viewing key，因此可以看到你的收款。自托管可以消除这一点。Shielded 支付也是最终确认的，因此退款需要买家向你提供一个地址。

**最后核实：** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **支持类型**：仅 shielded（Sapling、Orchard、Unified Address）
- **描述**：BTCPay Server 是一个开源、自托管的加密货币支付处理器。
- **URL**：[BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

在托管方面，这是最强的选择。它的钱包后端是只读的，不持有 seed 或私钥，因此即使服务器被攻破，也无法花掉你的钱。

仅支持 shielded，覆盖 Sapling、Orchard 和 Unified Addresses。没有透明地址回退，因此不要围绕它做这方面规划。

安装时你需要使用 feat/zec 分支上的 btcpay-zcash Docker fork，以及从 Ywallet 或 Zingo 等钱包导出的 viewing key。默认情况下，它会连接远程 lightwalletd，或者你也可以自己运行 Zebra 和 lightwalletd。

有一个限制需要了解：该插件在单个实例上为所有商店共用同一个 Zcash 钱包，因此不要把它运行在共享服务器上。按商店分配钱包的功能正在开发中。

软件本身不收费。你支付的是 Zcash 网络费用以及你的托管成本。

**最后核实：** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **支持类型**：Shielded（Sapling 和 Orchard）
- **描述**：ZGo 是一个电子支付平台，付款直接从你的客户到你，中间没有任何第三方参与。
- **URL**：[ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

这是一个在浏览器中运行的收银台，因此笔记本电脑、平板或手机都可以变成结账终端。它还有 WooCommerce 插件和 REST API。它由 Vergara Technologies 构建，并由 Zcash Community Grants 资助，其中包括从 zcashd 迁移到 Zebra 的工作。

资金会直接从客户进入你的钱包，中间没有任何第三方。

支持 shielded，通过 Unified Addresses 覆盖 Sapling 和 Orchard，并遵循 ZIP 321。当前没有任何来源说明它支持透明地址，因此本页不再声称它支持。

你实际上无法自托管它。ZGo 为你运行 Zcash 基础设施，而且没有发布任何部署指南。不过源码在维护者自己的 Git 服务器上是公开的，尽管大多数人通常找到的 GitLab 副本只是一个过时的 2022 年镜像。

它也不是免费的。ZGo 出售预付费会话，而 WooCommerce 需要 Pro 会话，但当前定价页面无法访问，因此这里不引用具体数字。

**最后核实：** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **支持类型**：客户可使用 shielded 支付，接收端未文档说明
- **描述**：Flexa 是一个支付网络，让客户能够通过自托管钱包在零售地点使用包括 Zcash 在内的数字资产进行支付。
- **URL**：[Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa 不是结账网关，因此它不能替代这里的其他方案。客户打开一个支持 Flexa 的钱包，例如 Zodl，展示一个一次性代码，商店再进行扫描。它没有 ZEC 发票，也没有电商插件。

客户在支付发生前始终自行持有自己的币。作为商家，你永远不会收到 ZEC。Flexa 会用你选择的货币与你结算，因此 crypto 端由他们处理。

Flexa 自己的公告把 Zcash 集成描述为使用 shielded ZEC 支付。Flexa 接收到的是什么地址类型，在任何地方都没有公布。

费用为每笔支付 1%，其中已包含兑换和托管，不另收费。

它可在美国使用，并且自 2026 年 7 月起可在 37 个 SEPA 国家和地区使用。至于欧洲是否特别支持消费 ZEC，则未说明。

**最后核实：** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **支持类型**：仅透明地址
- **描述**：NOWPayments 是一个加密货币支付网关，使商家能够轻松接受 Zcash 支付和捐赠。
- **URL**：[NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

不支持 shielded。他们的文档要求你为 Zcash 设置一个透明地址，而 ZEC 也是他们唯一专门这样说明的币种。你收到的每一笔付款都会在 blockchain 上公开。

默认是非托管。他们的 FAQ 说他们不存储资金，也绝不持有私钥。不过存在一个可选的托管余额功能，因此如果你需要确认，请检查你的账户设置。

直接支付的费用为 0.5%；多币种、固定汇率或“用户支付手续费”的支付费用为 1%，另加网络费用。

除法律禁止的地区外，全球可用。开始接受 crypto 时无需 KYC，只有提现法币时才需要。

**最后核实：** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **支持类型**：透明地址（未文档说明）
- **描述**：Plisio 是一个加密货币支付网关，允许企业接受 Zcash 支付。
- **URL**：[Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

请把它视为托管型。Plisio 的营销材料称其为非托管，但它自己的帮助页面描述了平台内持有余额、冷存储以及提现流程。其非托管说法无法得到确认。

Plisio 从未说明它使用哪些 Zcash 地址类型，因此在有人确认之前，请假定它使用透明地址。

钱包免费，网关和 API 收费 0.5%，White Label 收费 1.5%。White Label 是其托管服务的换牌版本，不是自托管。

接收付款无需 KYC，也没有公布受限国家列表。

**最后核实：** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **支持类型**：仅透明地址，拒绝 shielded 充值
- **描述**：Binance Pay 是一个支持 Zcash 支付的加密货币支付平台。
- **URL**：[Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance 会拒收从 shielded 地址发送的 ZEC。这种拒绝正是后来创建 TEX 地址的原因。

它是完全托管型的。支付在 Binance Pay 钱包之间以链下方式转移，而且你需要一个已验证的 Binance 账户。

钱包到钱包转账免费，商家提现收费 0.8%，上限为 5 USD，Mini Program 商家收费 1%。

在依赖它之前，请先检查你所在地区是否可用。Binance Pay 在某些国家和行业不提供服务，自 2023 年起，法国、西班牙、意大利和波兰用户的 ZEC 已被下架，而且在 MiCA 监管下，EEA 地区的服务也曾受到干扰。

**最后核实：** 2026-07-29

---

### 不再接受 ZEC 的服务

这两个此前都曾列在这里。已于 2026 年 7 月 29 日检查过每个提供商自己的实时货币列表，Zcash 都已从两者中移除。

**CoinPayments** 在其 v2 币种列表、旧版列表以及实时 currencies API 中都没有列出 ZEC，而且它的 Zcash 相关文章现在会重定向到首页。

**CoinGate** 在其支持币种页面和公共 API 中都没有列出 ZEC。没有发布下架公告，因此原因和日期都未知。

如果其中任何一个重新支持 Zcash，请用新的核实日期重新添加。

### 保持本页准确

隐私币支持情况变化频繁，因此本页的准确性只和最近一次核查一样可靠。审核本页时：

1. 检查服务提供商自己的币种列表或 API。上面移除的两个处理器，其第三方列表都已经过时。
2. 检查支持哪些 Zcash 地址类型。“支持 Zcash”通常只意味着支持透明地址。
3. 更新表格中的核实日期，以及该提供商章节中的核实日期。

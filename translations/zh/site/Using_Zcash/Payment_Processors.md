<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash 支付处理器 [Payment Processors]

以并排方式比较商家接受 ZEC 的途径。每一项均已于 **2026 年 7 月 29 日** 根据服务提供商自身网站和 API 核查。

对隐私 [privacy] 资产的支持经常变化，因此每一行均标有各自的核实日期。如果您在数月后阅读此页面，请在集成前查看服务提供商的网站。

<div class="processor-table">

| 处理器 | 托管 [Custody] | 屏蔽 [Shielded] ZEC | 自托管 | 商家手续费 | 地区 / KYC | 已核实 |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | 非托管 | 是，通过统一地址使用 Orchard | 是，开源 | 每笔支付 1%，自托管则免费 | 无 KYC，未说明地区 | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | 非托管，仅 viewing key | 是，仅屏蔽（Sapling、Orchard、UA） | 是，开源 | 无，仅支付网络手续费 | 全球，无 KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | 非托管 | 是，Sapling 和 Orchard | 否，托管服务 | 预付会话，未公布价格 | 未说明无 KYC，未说明地区 | 2026-07-29 |
| [Flexa](https://flexa.co/) | 客户自托管，商家以法币结算 | 客户使用屏蔽资金支付，未记录收款方信息 | 否 | 每笔支付 1% | 美国及 37 个 SEPA 国家，未确认 ZEC 在欧盟的情况 | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | 默认非托管 | 否，仅透明地址 | 否 | 0.5%，或兑换时 1% | 除法律禁止地区外全球可用，开始时无需 KYC | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | 尽管其营销宣传如此，仍为托管 | 未记录 | 否 | API 0.5%，白标 1.5% | 收款无需 KYC | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | 托管，链下 [off-chain] | 否，拒绝屏蔽存款 | 否 | 钱包之间免费，付款 0.8% | 受地理限制，ZEC 已在法国、西班牙、意大利和波兰下架 | 2026-07-29 |

</div>

### 各列含义

**托管**是指处理器是否持有您的 ZEC。非托管意味着资金会进入由您控制的钱包 [wallet]。

**屏蔽 ZEC**是指您是否可以收款至屏蔽 pool [pool]。仅透明意味着金额和地址会公开显示在 blockchain [blockchain] 上。

**自托管**是指您是否可以自行运行软件，而无需由公司居中参与。

**商家手续费**不包括 Zcash 网络手续费，无论何种情况都需要有人支付这些费用。

如果服务提供商未公布某项信息，条目会写明"未说明"或"未记录"，而非猜测。这并不等同于"否"。

### 该选择哪一个

如需最高程度的隐私和控制权，请使用 **BTCPay Server** 或自行托管的 **CipherPay**。两者均支持屏蔽、开源，且不会为您持有资金。

如需在商店而非线上收款，请使用 **Flexa**。

如需接受透明支付的托管网关，请使用 **NOWPayments** 或 **Plisio**。

有一个值得重申的注意事项：仅支持透明交易的处理器会在 blockchain 上公布每笔支付的金额和地址。任何托管的非托管处理器都会要求您交出 viewing key，因此公司虽然无法花费您的资金，却能看到您的支付。自托管是避免这一点的唯一方式。

<div class="processor-note">

**ZGo 服务警告，2026 年 7 月 29 日。** 在检查此页面期间，位于 api.zgo.cash 的 ZGo 后端在每个端点均返回 HTTP 503。该项目并未被弃置，且其维护者本月仍活跃于社区；但在依赖该服务前，请确认其正在运行。

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay 标志" class="processor-logo" />
- **支持类型**：屏蔽（Orchard，通过统一地址）
- **描述**：数分钟内接受 Zcash，非托管，无买家数据，无中间方。
- **URL**：[CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay 标志" width="200" hidden />

您向 CipherPay 提供仅查看密钥，因此支付会直接进入您自己的钱包，它绝不会持有资金。它会为每张发票使用一个新地址。

仅支持 Orchard。不支持 Sapling 或透明交易，尽管仓库 README 提到了 Sapling。

每笔支付收费 1%；若自行运行，则完全免费。整个项目均为开源，可作为 Rust 二进制文件配合 SQLite 运行，或作为 Docker 镜像运行。无需 KYC，买家也无需账户。

集成涵盖 Shopify、WooCommerce、REST API、托管结账、支付链接和线下 QR。

有两点需要权衡。它于 2026 年 2 月推出，且没有已公布的安全审计。托管层级中，运营方会持有您的 viewing key，因此可以看到您的支付。自托管可以消除这一点。屏蔽支付同样是最终完成的，因此退款需要买家向您提供一个地址。

**最后核实：** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server 标志" class="processor-logo" />
- **支持类型**：仅屏蔽（Sapling、Orchard、统一地址）
- **描述**：BTCPay Server 是一个开源、自托管的加密货币支付处理器。
- **URL**：[BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server 标志" width="200" hidden />

这是托管方面最强的选择。其钱包后端仅供查看，不持有种子或私钥，因此即使服务器遭入侵，也无法花费您的资金。

仅支持屏蔽交易，涵盖 Sapling、Orchard 和统一地址。没有透明备用方案，因此请勿将其纳入计划。

安装时，您需要 feat/zec 分支上的 btcpay-zcash Docker fork，以及从 Zkool 或 Zingo 等钱包导出的 viewing key。默认情况下，它会连接远程 lightwalletd；您也可以自行运行 Zebra 和 lightwalletd。

有一项限制需要注意：该插件会为实例中的每个商店使用同一个 Zcash 钱包，因此请勿在共享服务器上运行它。目前正在开发每个商店独立的钱包。

软件本身不收费。您支付 Zcash 网络手续费以及任何托管成本。

**最后核实：** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo 标志" class="processor-logo" />
- **支持类型**：屏蔽（Sapling 和 Orchard）
- **描述**：ZGo 是一个电子支付平台，直接从您的客户流向您，不涉及第三方。
- **URL**：[ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo 标志" width="200" hidden />

这是一个可在浏览器中运行的收银台，因此笔记本电脑、平板电脑或手机都可成为结账终端。它还提供 WooCommerce 插件和 REST API。它由 Vergara Technologies 构建，并由 Zcash Community Grants 拨款资助，其中包括从 zcashd 迁移至 Zebra。

资金直接从客户流向您的钱包，中间没有任何人参与。

支持屏蔽交易，通过统一地址涵盖 Sapling 和 Orchard，并遵循 ZIP 321。没有当前来源表明它处理透明地址，因此本页面不再声称它支持透明地址。

您实际上无法自行托管它。ZGo 会为您运行 Zcash 基础设施，且未发布部署指南。源代码在维护者自身的 Git 服务器上公开，不过人们通常找到的 GitLab 副本是一个过时的 2022 年镜像。

它也并非免费。ZGo 出售预付会话，WooCommerce 需要 Pro 会话，但价格页面目前无法访问，因此这里不提供具体金额。

**最后核实：** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa 标志" class="processor-logo" />
- **支持类型**：客户使用屏蔽资金支付，未记录收款方信息
- **描述**：Flexa 是一个支付网络，让客户可通过自托管钱包在零售地点使用包括 Zcash 在内的数字资产。
- **URL**：[Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa 标志" width="200" hidden />

Flexa 不是结账网关，因此它不能替代此处其他服务。客户会打开如 Zodl 等启用了 Flexa 的钱包，展示一次性代码，然后由商店扫描。没有 ZEC 发票，也没有电子商务插件。

客户会一直保留自己的币，直到支付的那一刻。作为商家的您永远不会收到 ZEC。Flexa 会以您选择的货币与您结算，因此加密货币部分由其处理。

Flexa 自己的公告将 Zcash 集成描述为使用屏蔽 ZEC 进行支付。Flexa 所接收的地址类型从未在任何地方公布。

每笔支付的手续费为 1%，兑换和托管均不另行收费。

它适用于美国，并自 2026 年 7 月起适用于 37 个 SEPA 国家和地区。未说明 ZEC 是否尤其可在欧洲使用。

**最后核实：** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments 标志" class="processor-logo processor-logo-wide" />
- **支持类型**：仅透明
- **描述**：NOWPayments 是一个加密货币支付网关，使商家能够轻松接受 Zcash 支付和捐赠。
- **URL**：[NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments 标志" width="200" hidden />

不支持屏蔽交易。其文档要求您为 Zcash 设置透明地址，而 ZEC 是唯一被其以这种方式特别指出的币种。您收到的每笔支付都会公开显示在 blockchain 上。

默认非托管。其常见问题说明其不会存储资金，也绝不持有私钥。它提供可选的托管余额，因此如果您需要确认，请检查账户设置。

直接支付的手续费为 0.5%；多币种、固定汇率或"由用户支付手续费"的支付为 1%，另加网络手续费。

除法律禁止的地区外，全球均可使用。您无需 KYC 即可开始接受加密货币，仅在提取法币时需要 KYC。

**最后核实：** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio 标志" class="processor-logo processor-logo-wide" />
- **支持类型**：透明（未记录）
- **描述**：Plisio 是一个加密货币支付网关，允许企业接受 Zcash 支付。
- **URL**：[Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio 标志" width="200" hidden />

应将其视为托管服务。Plisio 的营销宣传称其为非托管，但其自身帮助页面描述了平台所持余额、冷存储和提取流程。无法确认其非托管声明。

Plisio 从未说明它使用哪种 Zcash 地址类型，因此在有人另行确认前，应假定为透明地址。

钱包免费，网关和 API 收费 0.5%，白标收费 1.5%。白标是其托管服务的重新品牌化，而非自托管。

您无需 KYC 即可收款，且未公布受限制国家列表。

**最后核实：** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay 标志" class="processor-logo" />
- **支持类型**：仅透明，拒绝屏蔽存款
- **描述**：Binance Pay 是一个支持 Zcash 支付的加密货币支付平台。
- **URL**：[Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay 标志" width="200" hidden />

Binance 会拒绝从屏蔽地址发送的 ZEC。这种拒绝正是创建 TEX 地址的原因。

它完全是托管的。支付会在 Binance Pay 钱包之间链下转移，并且您需要经过验证的 Binance 账户。

钱包之间的转账免费，商家付款收费 0.8%，上限为 5 USD，而 Mini Program 商家收费 1%。

在依赖它之前，请先检查您所在地的可用性。Binance Pay 不向某些国家和行业提供服务，ZEC 自 2023 年起已对法国、西班牙、意大利和波兰的用户下架，且在 MiCA 监管下，EEA 的服务已受到干扰。

**最后核实：** 2026-07-29

---

### 不再接受 ZEC

这两项此前均列于此处。已于 2026 年 7 月 29 日检查每个服务提供商自身的实时币种列表，Zcash 已从两者中消失。

**CoinPayments** 未在其 v2 币种列表、旧版列表或实时货币 API 中列出 ZEC，且其 Zcash 文章现会重定向至首页。

**CoinGate** 未在其支持货币页面或公开 API 中列出 ZEC。未宣布下架，因此原因和日期未知。

若任一方重新支持 Zcash，请以新的核实日期将其重新添加。

### 保持本页面准确

隐私币支持情况不断变化，因此本页面的可靠性仅取决于上次检查。当您审核时：

1. 检查服务提供商自身的货币列表或 API。上述被移除的两个处理器的第三方列表均已过时。
2. 检查支持哪些 Zcash 地址类型。"支持 Zcash"通常仅指透明地址。
3. 更新表格及该服务提供商章节中的核实日期。

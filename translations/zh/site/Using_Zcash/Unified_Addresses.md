<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 统一地址 (Unified Addresses)

> 一个地址适用于所有 Zcash。分享它，发送方的钱包会找到向你支付的最私密方式。

## TL;DR

* 统一地址 (UA) 是一个 Zcash 地址，包含多个接收器：Ironwood、Sapling 和透明接收器。
* 主网 UA 以 `u1` 开头。ZIP 316 对其进行了定义，并随 NU5 升级于 2022 年 5 月 31 日推出。
* 发送方的钱包会选择两个钱包都支持的最私密 pool。你永远无需自行选择 pool。
* 当 Ironwood pool 于 2026 年 7 月上线时，你的 UA 仍可继续使用。你无需分享新地址。
* 你的钱包可以为每个发送方创建新的 UA，且它们都会支付到同一个账户。

## 核心说明

统一地址 (UA) 是一个 Zcash 地址，将多个接收器整合为一个。接收器是地址中用于在特定价值 pool 接收资金的部分：Ironwood、Sapling 和透明接收器。UA 在主网上以 `u1` 开头，并在 [ZIP 316](https://zips.z.cash/zip-0316) 中定义，随 NU5 网络升级于 2022 年 5 月 31 日推出。

在统一地址出现之前，接收 ZEC 时需要考虑地址类型。`zs` 地址接收 Sapling 资金，`t` 地址接收透明资金，在不同类型之间发送还需要额外步骤。UA 终结了这一点。你只需分享一个地址，钱包会处理其余事项。

### 工作原理

当有人向你的 UA 发送资金时，其钱包会读取其中的接收器，并选择两个钱包都支持的最私密 pool：

1. 如果两个钱包都支持当前的屏蔽 pool，支付将以屏蔽方式到账。没有任何公开信息会接触链。
2. 如果发送方只能从较旧的 pool 发送，钱包会回退到你们共同拥有的最佳接收器，例如 Sapling。
3. 如果发送方只能发送透明资金，支付将进入你 UA 的透明接收器，你的钱包随后可以从那里将其屏蔽。

你无需自行管理这些。地址保持不变；路由在其内部完成。

### 它如今为何重要

Zcash 持续升级。当 Ironwood pool 于 2026 年 7 月 28 日随 NU6.3 激活时，UA 持有者无需新地址：钱包只需开始选择其现有地址中的 Ironwood 接收器。持有较旧独立地址的用户则必须迁移。UA 持有者无需做任何事。

这正是设计目标。新的 pool 会随未来的网络升级推出，统一地址可自动纳入它们，无需任何人重新分享地址或手动转移资金。请参阅 [Zcash 价值池](/using-zcash/shielded-pools)，了解当前的 pool 阵容。

### 为每个发送方提供一个新地址

钱包可以为一个账户生成许多多样化统一地址。每个地址都支付到相同资金，但它们中的任意两个都无法在链上关联。向每个向你付款的人或服务提供不同的 UA，这样任意两方都无法通过比较地址得知他们向同一个钱包付款。

## 视觉化 / 类比

想象一扇前门，上面有三个投递口。最新的投递口会将信件投入一个上锁的保险箱（Ironwood）。第二个会将它们投入一个上锁的抽屉（Sapling）。第三个会将它们放到一个敞开的托盘上，任何人都可以透过窗户阅读（透明）。

邮递员就是发送方的钱包。它会使用自己能够通过的最私密投递口。你只需提供门的一个地址；当房子有了新的保险箱时，门上的地址保持不变。

## 深入探讨

### 相关工具

- **Viewing key。** 每个账户都有统一 viewing key，可分享 UA 接收的内容（或其发送的全部内容），而无需分享花费权限。前缀为 `uview` 和 `uivk`。参阅 [viewing key](/zcash-tech/viewing-keys)。
- **TEX 地址。** 部分交易所，目前包括 Binance，要求充值必须来自透明来源。TEX 地址（[ZIP 320](https://zips.z.cash/zip-0320)）是专为该情形设计的、仅透明的 UA 配套地址。参阅 [透明交易所地址](/using-zcash/transparent-exchange-addresses)。
- **支付请求。** UA 可以嵌入支付请求 URI，其中预先填写金额和备忘录。参阅 [支付请求 URI](/using-zcash/payment-request-uris)。

### 快速事实

| | |
|---|---|
| 前缀 | `u1`（主网） |
| 编码 | bech32m |
| 定义于 | [ZIP 316](https://zips.z.cash/zip-0316) |
| 推出时间 | NU5，2022 年 5 月 31 日 |
| 包含 | Ironwood、Sapling 和透明接收器 |
| 花费密钥 | 每个账户一个，由其所有 UA 共享 |

请在 [钱包](/wallets) 页面查看哪些钱包支持统一地址。

## 常见错误

- **分享旧的 `zs` 或 `t` 地址。** 独立地址只能到达一个 pool，且不会获得新的 pool。请分享你的 UA。
- **向所有人提供同一个 UA。** 向你付款的两人可以比较信息并发现相同地址。请为每个发送方从你的钱包提供一个新 UA。
- **认为每笔向 UA 的支付都是私密的。** 只能发送透明资金的发送方会支付到你的透明接收器，因此该支付是公开的。之后请从你的钱包将其屏蔽。

## 相关页面

- [屏蔽池](/using-zcash/shielded-pools)：UA 中每个接收器背后的价值池。
- [统一地址（技术）](/zcash-tech/unified-addresses)：ZIP 316 如何构建和编码 UA。
- [Viewing Keys](/zcash-tech/viewing-keys)：分享 UA 接收的内容，而无需分享花费权限。
- [透明交易所地址](/using-zcash/transparent-exchange-addresses)：适用于需要透明来源的交易所的 TEX 格式。
- [支付请求 URI](/using-zcash/payment-request-uris)：已填写金额和备忘录的 UA。
- [钱包](/using-zcash/wallets)：哪些钱包会创建并支付统一地址。
- [非托管交易所](/using-zcash/non-custodial-exchanges)：当兑换将 ZEC 支付到你的钱包时应检查什么。
- [谁能看到你的 Zcash 支付](/start-here/who-can-see-your-zcash-payment)：当支付使用每种接收器时，哪些内容保持可见。

**最后更新：**2026 年 10 月

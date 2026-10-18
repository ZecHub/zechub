<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Unified Address

> 一个地址即可覆盖所有 Zcash。分享它，发送方的钱包会找到向你付款的最私密方式。

Unified Address（UA）是一个将多个接收器整合为一体的单一 Zcash 地址。接收器是地址中用于接收特定价值池资金的部分：Ironwood、Sapling和透明池。主网上的 UA 以 `u1` 开头，定义于 [ZIP 316](https://zips.z.cash/zip-0316)，并于 2022 年 5 月 31 日随 NU5 网络升级推出。

在 Unified Address 出现之前，接收 ZEC 时必须考虑地址类型。`zs` 地址接收 Sapling 资金，`t` 地址接收透明资金，而在不同类型之间发送资金还需要额外步骤。UA 终结了这一点。你只需分享一个地址，钱包会处理其余事项。

## 工作原理

当有人向你的 UA 发送资金时，对方的钱包会读取其中的接收器，并选择双方钱包都支持的最私密价值池：

1. 若双方钱包都支持当前的屏蔽价值池，付款将以屏蔽方式到账。不会有任何公开信息写入链上。
2. 若发送方只能从较旧的价值池发送，钱包会回退到双方共同支持的最佳接收器，例如 Sapling。
3. 若发送方只能发送透明资金，付款会进入你的 UA 的透明接收器，而你的钱包可以从那里将其屏蔽。

你无需亲自管理这些事项。地址保持不变；路由在地址内部完成。

## 为什么现在很重要

Zcash 持续升级。当 Ironwood 价值池于 2026 年 7 月 28 日通过 NU6.3 激活时，UA 持有者无需更换地址：钱包只是开始选择人们已有地址中的 Ironwood 接收器。持有较旧独立地址的用户则必须迁移。UA 持有者无需进行任何操作。

这正是其设计目标。新的价值池会随未来的网络升级到来，而 Unified Address 会将其吸收，无需任何人重新分享地址或手动转移资金。请参阅 [Zcash价值池](/using-zcash/shielded-pools)，了解当前的价值池阵容。

## 为每位发送方使用一个新地址

钱包可以为一个账户生成许多多样化 Unified Address。每个地址都会付款至同一笔资金，但其中任意两个地址都无法在链上关联。为向你付款的每个人或服务提供不同的 UA，他们中的任何一对都无法通过比较地址得知自己在向同一个钱包付款。

## 相关工具

- **Viewing Key。** 每个账户都有 Unified Viewing Key，可分享 UA 所接收的内容（或其发送的全部内容），但不会分享支付权限。前缀为 `uview` 和 `uivk`。参阅 [Viewing Key](/zcash-tech/viewing-keys)。
- **TEX 地址。** 一些交易所（目前为 Binance）要求充值必须来自透明来源。TEX 地址（[ZIP 320](https://zips.z.cash/zip-0320)）是你的 UA 的仅透明配套地址，专门用于该情形。参阅 [透明交易所地址](/using-zcash/transparent-exchange-addresses)。
- **付款请求。** UA 可以嵌入付款请求 URI，其中预先填入金额和备注。参阅 [付款请求 URI](/using-zcash/payment-request-uris)。

## 速览

| | |
|---|---|
| 前缀 | `u1`（主网） |
| 编码 | bech32m |
| 定义于 | [ZIP 316](https://zips.z.cash/zip-0316) |
| 推出时间 | NU5，2022 年 5 月 31 日 |
| 包含 | Ironwood、Sapling和透明接收器 |
| Spending Key | 每个账户一个，由其所有 UA 共享 |

请在 [钱包](/wallets) 页面查看哪些钱包支持 Unified Address。

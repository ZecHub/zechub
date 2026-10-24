<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym 面向 Zcash 的 Mixnet 匿名性

> 最后验证：2026 年 10 月 18 日

Zcash 的屏蔽池会在链上隐藏金额、发送方和接收方。它们不会隐藏钱包与轻钱包服务器之间的网络路径。Nym 的 mixnet 补充了这一缺失的网络层保护。截至 2026 年 10 月，该集成已在生产钱包中上线（Zingo、Zkool）。

来源：[Nym 如何为 Zcash 钱包增加匿名性](https://nym.com/blog/zcash-mixnet-anonymity)（Nym，2026 年 10 月 13 日）。

## 受保护的内容

Nym 将交易数据包（通常包含 7–15 KB 的支出数据和 ZK 证明）拆分为 Sphinx 数据包，并通过 mixnet 路由。这样可以：

- 向轻钱包服务器隐藏发送方的 IP
- 将流量与其他 Nym 流量混合
- 在默认设置下提供约 17 比特熵，引用的匿名集超过 100,000 名用户

Zingo v7 中的支付和价格请求默认遵循此路径。

## 未受保护的内容

链同步、nullifier 查询、交易获取和内存池流量目前仍使用普通索引器连接。混合数据包之外的设备级或应用级元数据也不在 Nym 的保护范围内。

如果你的威胁模型要求隐藏同步流量，请将原生 mixnet 钱包与系统级 NymVPN 结合使用。参见 [Nym VPN](/guides/nym-vpn)。

## 钱包

| 钱包 | 状态 | 说明 |
| --- | --- | --- |
| Zingo v7 | 已上线，默认启用 | `makers run-cli` 捆绑了 `nym-proxy`。会话以离线状态启动；`--online`、`--remember-online` 或 `--server` 将授予同意。 |
| Zkool | 已上线 | 原生 mixnet 集成。 |
| 其他 | 通过 NymVPN | 通过系统级 Mixnet 模式路由钱包。 |

钱包级路径的设置详情见 [通过 Nym Mixnet 路由 Zcash 钱包流量](/guides/nym-mixnet-wallet-setup)。

## 权衡

经 Nym 路由的广播比明网慢约 12.5 倍（约 3.4 秒）。Tor 更快（约 3.7 倍），但它使用不混合的 FIFO 流，因此全局对手仍可进行关联。扩大共享的 Nym 用户群体，比增加额外延迟更能有效提升匿名性。

## 应用层卫生：nym-swizzle-zcash

仅有网络层保护还不够。即使拥有完美的 mixnet 或 VPN，轻钱包服务器仍可通过观察应用层模式关联会话：

- 恢复点链式关联：客户端从恰好 `previous end + 1` 处恢复同步，因此服务器仅凭区块高度即可将会话串联起来。
- 同步后发送：钱包在广播前立即同步，使服务器能够将交易归因于之前的同步会话。

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate 实现了专用于 Zcash 的卫生策略，以解决这两个问题。它将通用的 `nym-swizzle` 原语封装为面向轻客户端、具备链感知能力的策略。

**量化同步范围。** 请求会扩展至全网统一网格中按天划分的单元。起点向下取整，终点向上取整。范围是确定性的、升序的且互不重叠。重组检查保持在扩展后的范围内，因此不会暴露精确恢复点。匿名性来自碰撞（许多钱包发出相同的边界），而非噪声。

**解耦广播。** 交易发送将按指数分布延迟（均值为 144 个区块 ≈ 3 小时，上限为 576 个区块 ≈ 12 小时），与 ZIP 318 的转账调度相匹配。延迟时间超过典型进程生命周期，因此调度会被持久化。交易仅在触发时基于最新链尖构建。同步和广播应使用不同的服务器。

该 crate 提供 `BlockSource` 和 `TxBroadcaster` traits，可为 `wasm32-unknown-unknown` 编译，并且自身不包含网络栈。完整 API 和示例请参见 [Nym 文档](https://nym.com/docs/developers/swizzle/zcash)。

## 来源

- [Nym 如何为 Zcash 钱包增加匿名性](https://nym.com/blog/zcash-mixnet-anonymity) — Nym，2026 年 10 月 13 日
- [nym-swizzle-zcash：面向 Zcash 轻客户端的卫生策略](https://nym.com/docs/developers/swizzle/zcash) — Nym 文档
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [通过 Nym Mixnet 路由 Zcash 钱包流量](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub

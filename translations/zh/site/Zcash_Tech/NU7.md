<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# NU7

> NU7于 2026 年 11 月 6 日在 Zcash 主网上的区块 3,543,405 激活（02:34 UTC；美国时区为 11 月 5 日晚间），并已持续运行至今。

你将了解：NU7改变了什么（区块更快、屏蔽操作数量限制、手续费回收、版本 4 交易终止），保留了什么，以及节点运营者、钱包、交易所和矿工需要做什么。

NU7是一项 Zcash [网络升级](../start-here/network-upgrades)，由 [ZIP 259](https://zips.z.cash/zip-0259)部署。它将区块间隔从 75 秒缩短到 25 秒，限制每个区块可容纳的屏蔽操作数量，开始将 60% 的交易手续费移出流通，以便之后重新发放给矿工，并使版本 4 交易失效，从而停用了旧的 Sprout池。它没有引入新的交易格式。其共识分支 ID 为 `0x77190ad9`。

为何重要。在 NU7之前，首次确认平均需要等待 75 秒，对于商店柜台、交易所存款或跨链兑换来说太慢了。NU7将等待时间缩短到约 25 秒，同时没有增发更多 ZEC：每个区块的奖励降至三分之一，因此每日发行量保持不变。这也是首个加入相关机制的网络升级，旨在区块奖励缩减后为网络安全提供资金。

刚接触 Zcash？请先阅读 [什么是 ZEC 和 Zcash](../start-here/what-is-zec-and-zcash)以及[屏蔽池](../using-zcash/shielded-pools)，然后再回到这里。

## TL;DR

简单来说：现在每 25 秒产生一个区块，每日新增 ZEC数量保持不变，每笔手续费的一部分会留存起来供未来的矿工领取，而旧的 Sprout池已经关闭。

- **25 秒区块**（[ZIP 218](https://zips.z.cash/zip-0218)）：首次确认约需 25 秒，而不是 75 秒。区块补贴从 1.5625 降至 0.52083333 ZEC，因此每天仍会发行约 1,800 ZEC。
- **屏蔽操作数量限制**（ZIP 218）：所有 pool 中每个区块最多可包含 330 个屏蔽操作，并设有各 pool 的上限，以确保最坏情况下的区块验证和钱包同步成本低于之前。
- **网络可持续性机制**（[ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)）：每个区块的交易手续费有 60% 移出流通，之后重新发放给矿工，预计从区块 8,939,664 开始（预计约在 2031 年 2 月）。2,100 万的供应上限保持不变。
- **版本 4 交易已失效**（[ZIP 2003](https://zips.z.cash/zip-2003)）：钱包必须构建 v5 或 v6 交易。Sprout只能通过 v4 交易进行转出，因此仍在 Sprout中的资金现已被冻结。
- **软件**：[Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)及更高版本遵循 NU7。没有支持 NU7的 `zcashd`版本。

## 形象比喻

把链想象成一条铁路。NU7之前，每 75 秒发出一班列车，载客量上限是 2 MB。NU7每 25 秒发出一班列车，每位司机拿到的报酬是原来的三分之一，因此每日总额保持不变；同时，它限制每班列车可搭载的最重乘客（屏蔽操作）数量，避免任何一班列车的检查耗时过长。

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## NU7的变化

### 25 秒区块目标间隔（ZIP 218）

- 难度调整现在以每 **25 秒**产生一个区块为目标，而不是 75 秒，因此区块产生频率提高了 3 倍。
- 区块补贴除以了 3：当前减半周期内每个区块为 **0.52083333 ZEC**（原为 1.5625 ZEC）。每日发行量仍约为 1,800 ZEC（每天 3,456 个区块，而不是 1,152 个）。
- 减半仍每 4 年发生一次。由于区块速度加快，下次减半移至区块 **6,132,390**，按 25 秒间隔预计在 2028 年 11 月下旬发生（ZIP 259）。
- 难度平均窗口从 17 个区块扩大到 **102 个区块**，因此调整所参考的时间跨度大致相同。
- 默认交易过期时间从 40 个区块延长到 **120 个区块**，仍约为 50 分钟。

### 屏蔽操作数量限制（ZIP 218）

现在每个区块都有一个共享额度，并设有各 pool 的上限：

| 限制 | 每个区块 |
|---|---|
| 所有 pool 中的屏蔽操作总数 | 330 |
| Orchard操作 | 330 |
| Ironwood操作 | 330 |
| Sapling输入 + 输出 | 300 |
| Sprout JoinSplits | 不允许 |

在 NU7之前，一个完整的 2 MB 区块可以容纳约 617 个 Orchard或 Ironwood操作，或约 2,107 个 Sapling输出，且没有各 pool 的限制。ZIP 218 设定了新的上限，即使区块数量增加到 3 倍，节点验证和钱包同步的最坏情况也低于之前（例如，轻客户端屏蔽同步的最大带宽从每天约 271 MB 降至 169 MB），同时 Orchard协议的吞吐量翻了一倍以上（对于 2 操作交易，每秒约 2.9 笔增至 6.6 笔）。

### 网络可持续性机制（ZIP 235 + ZIP 237）

- **移除手续费（ZIP 235）：**每个区块的交易手续费有 60% 被移出流通；其余 40% 仍像以前一样归矿工所有。与销毁不同，被移除的ZEC会被记录下来，以便之后重新发行。
- **重新发行（ZIP 237）：**被移除的ZEC保存在称为 NSM Value Balance 的公开共识状态中。它在 NU7 时以矿工过去未领取的 368.58 ZEC 作为初始余额。从区块 **8,939,664** 开始（预计约在 2031 年 2 月），每个区块都会在正常减半计划之外，按固定比例发放该余额。
- 供应上限不会提高。余额归零时，发行量将完全遵循原有减半计划。
- NU7没有部署 [ZIP 233](https://zips.z.cash/zip-0233)（由用户自愿移除）或 [ZIP 234](https://zips.z.cash/zip-0234)（用平滑曲线取代减半）。持币者投票在 ZIP 237 中选择了保留减半的设计。

### 禁止版本 4 交易（ZIP 2003）

- 从 NU7开始，每笔版本 4 交易都无效：不仅 Sprout转账无效，以 v4 格式构建的仅透明交易和 Sapling交易也无效。版本 5（NU5）和版本 6（[Ironwood](../zcash-tech/ironwood)）交易不受影响。
- Sprout转账仅存在于 v4 格式中，因此无法再从 [Sprout](../zcash-tech/sprout)池中转出资金。请参阅[资金找回](../using-zcash/recovering-funds)。

### 其他较小变化

- 修订开发基金规则，使资金流适用于 25 秒区块（[ZIP 207](https://zips.z.cash/zip-0207)修订版 2、[ZIP 214](https://zips.z.cash/zip-0214)修订版 3），并更新资金流地址列表（[ZIP 2008](https://zips.z.cash/zip-2008)）。
- NU7节点在主网上通告网络协议版本 **170190**，并在激活后断开较旧的节点连接。

## NU7没有做什么

- **没有新增交易格式。**NU7刻意避免在 Ironwood引入 v6 交易后，立即再次迁移钱包和解析器。
- **供应上限和每 4 年减半的节奏没有变化。**
- **Coinbase 成熟度没有变化。**挖出的币仍需经过 100 个区块才能转出（现在约 42 分钟，而不是约 2 小时）。
- **没有新增屏蔽池。**Ironwood（NU6.3）仍是最新的 pool；自 Ironwood以来，Orchard一直只能转出。

## 各群体需要做什么

- **节点运营者：**运行 [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)或更高版本。Zebra 7 首次启动时会将数据库从 v28 格式迁移到 v29 格式，而 Zebra 6.x 无法读取 v29，因此升级前请备份 `state/v28`。`zcashd`没有 NU7版本（其最新版本是 6.20.0，于 2026 年 6 月发布）；Zebra手册中的 [zcashdAPI 迁移指南](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html)列出了每个 `zcashd` RPC 对应的 Zebra、[Zallet](../zcash-tech/zallet)或其替代项。请参阅[全节点](../zcash-tech/full-nodes)和[加固版 Zebra指南](../guides/hardened-zebrad)。
- **钱包：**停止构建 v4 交易，使用 120 区块的默认过期时间，保留 3 区块的锚定深度（现在约 1.25 分钟），并遵守每区块的操作数量限制。单笔交易如果自身就违反限制，则永远无法被挖出。
- **交易所和支付服务：**现在每次确认需要 25 秒，因此同样数量的确认只需三分之一的时间。请根据实际需要的时间和安全性，重新检查存款所需的确认数，而不要习惯性地沿用旧数字。
- **矿工和 pool：**挖矿软件和模板必须采用新的补贴、手续费分配方式和操作数量限制；按旧规则构建的区块会被拒绝。

## 常见误解

- **"我的旧节点还在运行，所以没问题。"**仅对 NU7而言，ZIP 259 免除了通常要求升级前软件在激活前自行关闭的规则。6.x 版 Zebra或 `zcashd`节点可能仍按旧规则保持在线，并在不知不觉中脱离真实链。请检查节点报告的高度是否高于 3,543,405，并与区块浏览器核对。
- **"区块变快意味着会发行更多 ZEC。"**不是。每个区块的补贴降至三分之一，因此每日发行量不变。
- **"60% 的手续费会永久销毁。"**不是。这些手续费会被移除，之后由 NSM 重新发放给矿工；供应上限不变。
- **"版本 4 的变化只影响 Sprout用户。"**任何仍在生成 v4 交易的钱包或脚本都停止了工作，包括仅透明交易和 Sapling交易。待处理的 v4 交易在激活时失效，重新签名本身无法使其有效。
- **"按区块数设定的数值不会变。"**任何以区块数衡量的设置（确认数、过期时间、锁定时间、超时）现在在现实时间中都会快 3 倍。

## 术语表

| 术语 | 通俗解释 |
|---|---|
| Block target spacing | 难度调整所针对的区块平均间隔：自 NU7以来为 25 秒 |
| Block subsidy | 每个区块中新创建的 ZEC，由矿工和开发基金资金流共同分配 |
| Shielded action | 一笔交易中的一个单位屏蔽操作（Orchard或 Ironwood操作，或 Sapling输入或输出） |
| Network Sustainability Mechanism (NSM) | 将部分手续费移出流通，并重新发放给未来矿工的规则 |
| NSM Value Balance | 从流通中移除、等待重新发行的 ZEC公开累计总额 |
| Version 4 transaction | 来自 Sapling的交易格式，由 NU7设为无效；v5 和 v6 仍然有效 |
| Consensus branch ID | 用于标识一组共识规则的编号；签名会绑定该编号，因此按照旧规则签名的交易在新规则下无效 |

## 常见问题

**NU7何时激活？**在 2026 年 11 月 6 日 02:34 UTC，于主网区块 3,543,405 激活。测试网更早激活，于 2026 年 10 月 4 日的区块 4,465,026 激活。

**区块奖励改变了吗？**每个区块的奖励改变了：从 1.5625 ZEC降至 0.52083333 ZEC。每日发行量没有改变：无论如何，每天约为 1,800 ZEC。

**我的 Sprout ZEC是不是没了？**这些资金已无法转移，因为 Sprout转出需要 v4 交易，而这类交易现在已经无效。请参阅[资金找回](../using-zcash/recovering-funds)了解实际影响。

**我需要换一个钱包吗？**你需要使用支持 NU7的钱包版本。ZecHub的[钱包](../using-zcash/wallets)页面列出了兼容 NU7的钱包。

**手续费何时开始重新发行？**主网区块 8,939,664，若区块平均间隔保持 25 秒，预计约在 2031 年 2 月。

**为什么 NU7跳过了新的交易格式？**为了避免钱包和解析器在 Ironwood的 v6 格式推出后立即再次迁移；而且手续费分配按区块计算，因此无需新增交易字段。

## 测试你的理解

1. NU7之后，每日 ZEC发行量为何保持不变？
2. 从流通中移除的 60% 手续费会如何处理？
3. 为什么 NU7之后无法转出 Sprout资金？
4. 在这次升级中，从未升级过的节点为何尤其危险？

答案：（1）每个区块的补贴降至三分之一，而区块产生频率提高了 3 倍；（2）这些手续费进入 NSM Value Balance，并从区块 8,939,664 起重新发放给矿工；（3）Sprout资金只能通过 v4 格式转出，而 NU7使这种格式失效；（4）ZIP 259 免除了自动关闭要求，因此旧节点可能继续运行在错误的链上。

### 资源

[ZIP 259：部署NU7网络升级](https://zips.z.cash/zip-0259)

[ZIP 218：25 秒区块目标间隔](https://zips.z.cash/zip-0218)

[ZIP 235：将 60% 的交易手续费移出流通](https://zips.z.cash/zip-0235)

[ZIP 237：网络可持续性机制：保留减半的发行方式](https://zips.z.cash/zip-0237)

[ZIP 2003：禁止版本 4 交易](https://zips.z.cash/zip-2003)

[Zebra 7.0.0 版本说明](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash社区论坛：NU7时间线](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## 相关页面

| 页面 | 关联原因 |
|---|---|
| [Ironwood](./Ironwood.md) | 系列中的上一次升级，引入了 v6 交易 |
| [25 秒区块究竟改变了什么](../research/what-25-second-blocks-actually-change) | 深入了解更快的区块时间 |
| [Sprout](./Sprout.md) | NU7停用的 pool |
| [资金找回](../using-zcash/recovering-funds) | Sprout冻结对旧资金意味着什么 |
| [交易](../using-zcash/transactions) | NU7之后的过期时间和确认数 |

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Ironwood](../zcash-tech/ironwood)

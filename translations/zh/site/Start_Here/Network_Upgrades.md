# Zcash 网络升级 [Network Upgrades]

Zcash 通过网络升级不断改进：这是对每个节点都同意的规则进行的协调变更，每次均在设定的区块高度激活。以下每次升级都有独立页面，以浅显语言说明其变更内容及原因。刚接触 Zcash？请按顺序阅读，从 Sprout 到 Ironwood。

如需了解 Zcash 的隐私 [privacy] 如何在这些升级中演变的可视化故事，请参阅 [隐私的演变](https://zechub.wiki/zcash-evolution)。本页面是索引，另一页面则是时间线。

| 升级 | 激活时间（UTC） | 区块 [Block] | 分支 ID | 变更内容 |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 2016 年 10 月 28 日 | 创世区块 | 00000000 | 正式发布：首个屏蔽池 [shielded pool] 及 zk-SNARK 私密交易 [transactions] |
| [Overwinter](../zcash-tech/overwinter) | 2018 年 6 月 26 日 | 347,500 | 5ba81b19 | 重放保护、交易版本控制及过期机制，使安全升级成为可能 |
| [Sapling](../zcash-tech/sapling) | 2018 年 10 月 29 日 | 419,200 | 76b809bb | 高效的屏蔽交易，速度足以支持手机和硬件钱包 [hardware wallets] |
| [Blossom](../zcash-tech/blossom) | 2019 年 12 月 11 日 | 653,600 | 2bb40e60 | 更快的区块，约 75 秒，以及更高的吞吐量 |
| [Heartwood](../zcash-tech/heartwood) | 2020 年 7 月 16 日 | 903,000 | f5b9230b | 屏蔽挖矿 [mining] 奖励和更轻量的客户端（FlyClient） |
| [Canopy](../zcash-tech/canopy) | 2020 年 11 月 18 日 | 1,046,400 | e9ff75a6 | 开发基金、首次减半 [halving]，以及逐步关闭 Sprout pool |
| [NU5](../zcash-tech/nu5) | 2022 年 5 月 31 日 | 1,687,104 | c2d6d0b4 | Orchard 2 上的 Halo pool（无需可信设置 [trusted setup]）、统一地址 [addresses] 和 v5 交易 |
| [NU6](../zcash-tech/nu6) | 2024 年 11 月 23 日 | 2,726,400 | c8e71055 | 延期开发基金锁箱及新的开发资金分配方案 |
| [NU6.1](../zcash-tech/nu6-1) | 2025 年 11 月 24 日 | 3,146,400 | 4dec4df0 | 社区和持币者对该资金的治理 [governance] |
| [NU6.2](../zcash-tech/nu6-2) | 2026 年 6 月 3 日 | 3,364,600 | 5437f330 | 修正 Orchard 电路的紧急修复 |
| [Ironwood（NU6.3）](../zcash-tech/ironwood) | 2026 年 7 月 28 日 | 3,428,143 | 37a5165b | Ironwood pool 和一个公开 turnstile，使任何人都能审计供应量 |
| **NU7**（即将推出） | 测试网：2026 年 10 月 4 日；主网：目标日期为 2026 年 11 月 5 日 | 测试网：4,465,026；主网：3,543,405 | 77190ad9 | 25 秒区块（ZIP 218）、NSM 手续费 [fee] 再循环（ZIP 235+237）、Sprout 退役（ZIP 2003） |

日期均以 UTC 显示。部分仪表板 [dashboard] 会以当地时间显示，但对应的是同一区块和同一时刻。每次升级的固定触发条件是其激活区块高度，而非日历日期。

### NU7 状态

NU7 已在公开测试网的高度 **4,465,026** 上线（于 2026 年 10 月 4 日激活）。主网激活高度为 **3,543,405**（[ZIP 259](https://zips.z.cash/zip-0259)），目标日期为 **2026 年 11 月 5 日**。

范围（ZIP 259）：

- **25 秒区块**（ZIP 218）——首次确认速度约快 3 倍；每日 ZEC 发行量保持不变。
- **网络可持续性机制**（ZIP 235 + ZIP 237）——60% 的交易手续费将退出流通并存入储备金，自约 2031 年 2 月起按照保持减半节奏的计划重新发放给矿工 [miners]。
- **Sprout 退役**（ZIP 2003）——版本 4 交易将失效；剩余的 Sprout 资金将无法花费。
- 屏蔽操作限制及更宽的难度平均窗口（17 → 102 个区块）。

不会引入新的交易格式。共识 [consensus] 分支 ID：`0x77190ad9`。

完整详情请参阅 [隐私的演变](https://zechub.wiki/zcash-evolution) 时间线及 [ZIP 259](https://zips.z.cash/zip-0259)。论坛时间线：[NU7 时间线](https://forum.zcashcommunity.com/t/nu7-timeline/57655)。

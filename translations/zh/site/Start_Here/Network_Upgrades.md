---
# Zcash 网络升级

Zcash 通过网络升级不断改进：这类升级是对所有节点共同认可规则的协调性变更，并在预先设定的区块高度激活。下面的每一次升级都有各自的页面，用通俗易懂的语言解释它改动了什么，以及为什么要这样改。如果你刚接触 Zcash？请按照顺序阅读，从 Sprout 到 Ironwood。

若想以可视化方式了解 Zcash 的隐私特性如何在这些升级中不断演进，请参阅[隐私的演进](https://zechub.wiki/zcash-evolution)。本页是索引页；那一页是时间线。

| Upgrade | Activation (UTC) | Block | Branch id | What it changed |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 2016年10月28日 | 创世区块 | 00000000 | Zcash 的启动：首个 shielded pool，以及 zk-SNARK 私密交易 |
| [Overwinter](../zcash-tech/overwinter) | 2018年6月26日 | 347,500 | 5ba81b19 | 重放保护、交易版本控制和过期机制，使安全升级成为可能 |
| [Sapling](../zcash-tech/sapling) | 2018年10月29日 | 419,200 | 76b809bb | 更高效的屏蔽交易，速度足以支持手机和硬件钱包 |
| [Blossom](../zcash-tech/blossom) | 2019年12月11日 | 653,600 | 2bb40e60 | 更快的区块，约 75 秒，以及更高的吞吐量 |
| [Heartwood](../zcash-tech/heartwood) | 2020年7月16日 | 903,000 | f5b9230b | 屏蔽挖矿奖励和更轻量的客户端（FlyClient） |
| [Canopy](../zcash-tech/canopy) | 2020年11月18日 | 1,046,400 | e9ff75a6 | Development Fund、首次减半，以及逐步关闭 Sprout pool |
| [NU5](../zcash-tech/nu5) | 2022年5月31日 | 1,687,104 | c2d6d0b4 | 基于 Halo 2 的 Orchard pool（无需可信设置）、统一地址，以及 v5 交易 |
| [NU6](../zcash-tech/nu6) | 2024年11月23日 | 2,726,400 | c8e71055 | Deferred Dev Fund Lockbox，以及新的开发资金分配方案 |
| [NU6.1](../zcash-tech/nu6-1) | 2025年11月24日 | 3,146,400 | 4dec4df0 | 社区和持币者对这笔资金的治理 |
| [NU6.2](../zcash-tech/nu6-2) | 2026年6月3日 | 3,364,600 | 5437f330 | 一项修正 Orchard 电路的紧急修复 |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | ~2026年7月28日 | 3,428,143 | 37a5165b | Ironwood pool，以及一个允许任何人审计供应量的公开 turnstile |

日期均以 UTC 显示。有些仪表盘会以本地时间显示，但对应的是同一个区块和同一时刻。Ironwood 的日期是根据其激活区块高度估算得出的，而区块高度才是固定的触发条件，因此确切日期可能会略有变动。未来的升级 NU7 仍在规划中，与 Ironwood 不是一回事。

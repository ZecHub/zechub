<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zcash货币政策

## 简要说明

* Zcash的供应量固定为 2100 万枚ZEC，与 Bitcoin 的上限相同。
* 自 2026 年 11 月 6 日NU7激活以来，大约每 25 秒产生一个新区块，并生成 0.52083333 枚ZEC。
* 每天新增约 1,800 枚ZEC，与NU7之前的每日数量相同。
* 每个区块奖励分配如下：80% 给矿工，8% 给Zcash Community Grants，12% 存入 lockbox。
* 区块奖励大约每 4 年减半一次。下一次减半预计在 2028 年 11 月下旬左右发生。

## 核心说明

### Zcash的经济机制是什么？

Zcash的货币基础与 Bitcoin 一样，固定供应量为 2100 万个ZEC货币单位。平均每 25 秒（NU7于 2026 年 11 月 6 日激活前为 75 秒），一个新的[区块](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.)会被挖出并加入Zcash blockchain，同时有 0.52083333 枚ZEC进入流通。NU7之前，每个区块的奖励为 1.5625 枚ZEC；[ZIP 218](https://zips.z.cash/zip-0218)将奖励和区块时间都缩短为原来的三分之一，因此每天新增的ZEC数量没有变化。自NU7起，0.52083333 枚ZEC的分配方式为：80% 给矿工（0.41666668 枚ZEC，另加交易手续费），8% 给Zcash Community Grants（0.04166666 枚ZEC），12% 存入 lockbox（0.06249999 枚ZEC），具体遵循[ZIP 1015](https://zips.z.cash/zip-1015)。

每个区块的奖励大约每 4 年减半一次，直到全部 2100 万枚ZEC进入流通。Zcash的通胀变化几乎与 Bitcoin 完全一致。需要注意的是，随着新币产生，通胀率会下降；每次减半时，通胀率都会大幅降低。

## 视觉类比

想象一个密封金库前有一台投币机。金库总共存有 2100 万枚ZEC，任何人都无法再往里面加哪怕一枚硬币。

每隔 25 秒，投币机就会吐出一小把新币，共 0.52083333 枚ZEC。找到该区块的矿工拿走其中的 80%。Zcash Community Grants获得 8%。剩下的 12% 存入 lockbox。

大约每 4 年，这一把新币的数量就会减半。这就是减半。

NU7让每一把新币的发放频率提高到原来的 3 倍，同时将每一把的数量缩小到原来的三分之一。每天新增的币数保持不变。

## 深入了解

### 各时期每天新增的ZEC数量

减半会减少每个区块的奖励。更快的区块（2019 年的Blossom、2026 年的NU7）也会减少每个区块的奖励，同时缩短区块时间，因此每天新增的数量保持不变。

| 时期 | 区块时间 | 每个区块的奖励 | 每天新增的ZEC数量 |
|:--|:--|:--|:--|
| 启动阶段，2016 年至 2019 年 | 150 秒 | 12.5 枚ZEC | 7,200 |
| [Blossom](/zcash-tech/blossom)，2019 年 12 月至 2020 年 11 月 | 75 秒 | 6.25 枚ZEC | 7,200 |
| 第一次减半（[Canopy](/zcash-tech/canopy)），2020 年 11 月至 2024 年 11 月 | 75 秒 | 3.125 枚ZEC | 3,600 |
| 第二次减半（[NU6](/zcash-tech/nu6)），2024 年 11 月至 2026 年 11 月 | 75 秒 | 1.5625 枚ZEC | 1,800 |
| [NU7](/zcash-tech/nu7)，2026 年 11 月至 2028 年末 | 25 秒 | 0.52083333 枚ZEC | 1,800 |
| 第三次减半，预计在 2028 年 11 月下旬 | 25 秒 | 当前奖励的一半 | 约 900 |

每天新增的数量等于每个区块的奖励乘以每天产生的区块数（86,400 秒除以区块时间）。实际区块时间会有轻微波动，因此每天的实际发行量也会略微偏离这些数字。

### 下一次减半何时发生

NU7让区块的产生频率提高到原来的 3 倍，因此下一次减半对应的区块高度也发生了变化。下一次减半设定在第 6,132,390 个区块，预计发生在 2028 年 11 月下旬（[ZIP 259](https://zips.z.cash/zip-0259)）。较早的文章给出的区块高度是 4,406,400。该数字在NU7之前是正确的。

### 手续费与网络可持续性机制

自NU7起，每个区块中的交易手续费有 60% 会从流通中移除，并存入公共储备。从第 8,939,664 个区块起（预计在 2031 年 2 月左右），每个区块都会从该储备中按固定比例向矿工支付款项，作为常规区块奖励的补充。2100 万枚的上限不会改变。[网络可持续性机制](/zcash-tech/network-sustainability-mechanism)页面介绍了其运作方式。

## 相关页面

- [NU7](/zcash-tech/nu7)：带来 25 秒区块和当前区块奖励的网络升级。
- [网络可持续性机制](/zcash-tech/network-sustainability-mechanism)：了解每个区块的 60% 手续费会流向何处，以及何时会返还。
- [开发基金](/start-here/development-fund)：区块奖励中开发份额的历史。
- [网络升级](/start-here/network-upgrades)：所有Zcash升级及其日期和区块高度。
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants)：获得 8% 份额的组织。
- [Zcash挖矿池](/using-zcash/zcash-mining-pools)：大多数矿工通过这些地方获得区块奖励中的份额。

### 资源

[Zcash 的经济模型是什么？](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218：25 秒区块目标间隔](https://zips.z.cash/zip-0218)

[ZIP 259：部署NU7网络升级](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**最后更新：**2026 年 11 月

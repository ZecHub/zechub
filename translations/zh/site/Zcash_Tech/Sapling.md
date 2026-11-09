<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Sapling

> Sapling 于 Zcash 主网上线，区块高度为 419,200（2018 年 10 月 29 日 02:15 UTC）。

你将了解到：Sapling 让私密 Zcash 支付（payment）足够快速轻量，可在手机或硬件钱包上运行。

Sapling 是第二次重大 Zcash 网络升级，于 Zcash 两周年之际激活。它是一项共识硬分叉，重构了屏蔽（shielded，私密）交易的构建方式。该部署由 ZIP 205 定义，新的交易签名规则由 ZIP 243 定义，两者均基于网络升级机制 ZIP 200。完整细节请参阅 Zcash 协议规范。Electric Coin Company 构建了这次升级，并于 2018 年 8 月发布首个支持它的版本 zcashd 2.0.0。在链上，网络通过其共识分支 ID 识别 Sapling 规则。

为什么这很重要。在 Sapling 之前，进行真正私密的支付意味着要等待数分钟，同时电脑需耗用数 GB 内存来构建证明（proof）。这对大多数人来说太慢、太占资源，因此许多用户、交易所和商家跳过了屏蔽交易，转而公开发送 ZEC。Sapling 将所需工作量降至数秒和约 40 MB 内存。正是这一项改变，让日常生活中在普通手机和硬件钱包上使用屏蔽 ZEC 成为现实。

## 有何变化

Sapling 的核心，是一种能更快构建零知识（zero-knowledge）证明的方法，以保持屏蔽交易的私密性。原始 Sprout 设计采用单一证明电路（JoinSplit 电路），速度缓慢且内存占用高。Sapling 将其替换为两个专用电路，即 Spend 电路和 Output 电路，详见 Zcash 协议规范。结果是成本大幅下降。根据 Electric Coin Company，屏蔽交易可在仅数秒内使用约 40 MB 内存构建完成。Sapling 之前的 Sprout 基准则重得多，需要数分钟和数 GB 内存（这些 Sprout 端数据是被广泛引用的大致基准）。

![Sprout versus Sapling shielded transaction cost](/content-images/sapling-before-after-a045b0b48f.webp)

## 新密钥

Sapling 还引入了一套新的屏蔽地址和密钥。一个密钥可以派生出许多多样化地址，即外部观察者无法将其彼此关联的独立支付地址。Sapling 还新增了 viewing key：完整或传入 viewing key 让你能够分享查看钱包交易详情的能力，而无需交出花费其资金的能力。这对于审计、会计，或仅仅证明某笔支付已经完成都很有用。

另一个相关变化是，Sapling 将构建证明的工作与为交易签名的工作分开。构建零知识证明的设备不再必须是持有花费授权的设备。这种解耦让硬件钱包可以保持你的花费密钥隔离，同时由另一台设备完成较繁重的证明工作。

![Proving device hands the proof to a separate signing device](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## 可信设置

Sapling 的电路依赖一组必须谨慎生成的公开参数。如果单一方独自生成这些参数，并保留剩余的秘密数据（"有毒废料"），该方就可能伪造证明。为避免这种情况，这些参数来自一场两阶段、多方仪式。第 1 阶段称为 Powers of Tau，与电路无关，即不绑定于 Sapling 的特定电路。第 2 阶段，即 Sapling MPC，与电路相关。只要每个阶段至少有一名参与者诚实并销毁其有毒废料，该阶段就仍然安全，因此只有所有参与者全部串通时，这场仪式才会失败。

## 如何激活

Sapling 紧随 Overwinter 之后，后者是 2018 年 6 月为网络升级机制做准备的升级。Electric Coin Company 在 2018 年 8 月发布的 zcashd 2.0.0 中设定了主网激活高度；当区块 419,200 被挖出时，网络切换至 Sapling 规则。在链上，这一时刻由 Sapling 共识分支 ID 标记。

![Timeline from Zcash launch to Sapling activation](/content-images/sapling-timeline-6cad184c30.webp)

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Shielded transaction | 一笔隐藏发送者、接收者和金额的私密 Zcash 交易。 |
| Sprout | Zcash 推出时采用的原始屏蔽协议，比 Sapling 更慢且更占资源。 |
| Spend and Output circuits | 替代 Sprout 单一 JoinSplit 电路的两个新 Sapling 证明电路。 |
| Diversified address | 可从单一密钥派生出的众多不可关联支付地址之一。 |
| Viewing Key | 一种让他人能够查看钱包交易、但不能从中花费资金的密钥。 |
| Consensus branch id | 告知网络某笔交易遵循哪次升级规则的简短代码。 |

## 常见问题

Sapling 是否改变了我拥有的 ZEC 数量？没有。Sapling 改变的是屏蔽交易的构建方式，而不是任何人持有的 ZEC 数量或总供应量。你的余额不受影响。

在 Sapling 之后，我的 ZEC 仍然私密吗？是的，而且更易使用。Sapling 保留了屏蔽交易强大的隐私性，并使其足够快速且成本低廉，从而能够真正投入使用。屏蔽资金仍以相同方式保持隐藏。

我需要做什么吗？作为持有者，你无需采取任何行动。Sapling 是一项由钱包和节点软件采用的网络升级。现代钱包已经支持 Sapling 地址。

Sprout 和 Sapling 有什么区别？Sprout 是第一个屏蔽协议，采用一个速度慢且内存占用高的证明电路。Sapling 用更快的 Spend 和 Output 电路替代了它，加入了 viewing key 和多样化地址，并让屏蔽交易轻量到可在手机和硬件钱包上使用。

为什么有些来源写 10 月 28 日，另一些写 10 月 29 日？激活高度已预先设定，目标日期为 2018 年 10 月 28 日。实际触发这一变化的区块，即区块 419,200，于 UTC 10 月 29 日凌晨被挖出。在许多本地时区，那仍是 10 月 28 日。无论如何，都是同一个区块和同一时刻。

什么是 viewing key？viewing key 让你可以分享对屏蔽钱包的读取权限。持有完整或传入 viewing key 的人可以查看钱包的交易详情，但不能花费其中的资金。有关更多信息，请参阅 [Viewing Keys](../zcash-tech/viewing-keys)。

## 测试你的理解

在 Sprout 下，为什么那么多人避免使用屏蔽交易，而 Sapling 又是如何解决这个问题的？

<details>
<summary>答案</summary>
在 Sprout 下，构建一笔屏蔽交易需要数分钟并使用数 GB 内存，因此对大多数用户、交易所和商家来说太慢且太占资源。Sapling 引入了更快的 Spend 和 Output 电路，将所需工作量降至数秒和约 40 MB，使屏蔽交易能够在日常手机和硬件钱包上实际使用。
</details>

### 资源

- [ZIP 205：Sapling 网络升级的部署](https://zips.z.cash/zip-0205)
- [ZIP 243：Sapling 的交易签名验证](https://zips.z.cash/zip-0243)
- [Zcash Sapling 升级页面](https://z.cash/upgrade/sapling/)
- [Electric Coin Company：Sapling 公告](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company：宣布 Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### 另请参阅

- [屏蔽池](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Zcash 网络升级](../start-here/network-upgrades)
- [钱包](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

系列：[网络升级索引](../start-here/network-upgrades) · 上一篇：[Overwinter](../zcash-tech/overwinter) · 下一篇：[Blossom](../zcash-tech/blossom)

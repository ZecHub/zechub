---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling 于区块 419,200（2018 年 10 月 29 日 02:15 UTC）在 Zcash 主网上线。

你将了解的要点：Sapling 让私密的 Zcash 支付变得足够快速且轻量，可以在手机或硬件钱包上运行。

Sapling 是 Zcash 的第二次重大网络升级，于 Zcash 二周年之际激活。这是一次共识层硬分叉，重构了 shielded（私密）交易的构建方式。其部署由 ZIP 205 定义，新的交易签名规则由 ZIP 243 定义，两者都建立在 ZIP 200 这一网络升级机制之上。完整细节载于 Zcash Protocol Specification。Electric Coin Company 构建了这次升级，并于 2018 年 8 月发布了首个支持该升级的版本 zcashd 2.0.0。在链上，网络通过其共识分支 id 来识别 Sapling 规则。

这为什么重要。在 Sapling 之前，发起一笔真正私密的支付意味着要等待数分钟，同时你的电脑需要消耗数 GB 内存来生成证明。对大多数人来说，这既太慢又太重，因此许多用户、交易所和商家会跳过 shielded 交易，转而公开发送 ZEC。Sapling 将这项工作缩短到几秒钟，并将内存需求降到约 40 MB。正是这一项改变，使 shielded ZEC 真正能够在日常生活中、在普通手机和硬件钱包上被实际使用。

## 有哪些变化

Sapling 的核心，是一种更快的零知识证明构建方式，用来保护 shielded 交易的隐私。最初的 Sprout 设计使用单一证明电路（JoinSplit 电路），速度慢且占用大量内存。Sapling 用两个专门构建的电路取而代之：Spend 电路和 Output 电路，详见 Zcash Protocol Specification。结果是成本大幅下降。根据 Electric Coin Company 的说法，一笔 shielded 交易最快只需几秒钟即可构建完成，且仅需约 40 MB 内存。Sapling 之前的 Sprout 基线则要沉重得多，大致需要数分钟和数 GB 内存（这些 Sprout 侧数据是被广泛引用的近似基线）。

![Sprout 与 Sapling 的 shielded 交易成本对比](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## 新密钥

Sapling 还引入了一组新的 shielded 地址和密钥。一个密钥可以派生出许多 diversified addresses，也就是多个彼此独立的收款地址，外部观察者无法将它们相互关联。Sapling 还加入了 viewing keys：完整 viewing key 或 incoming viewing key 可以让你分享查看钱包交易详情的能力，而无需交出花费其中资金的权限。这对于审计、记账，或只是证明一笔支付已经发生，都很有用。

另一项相关变化是，Sapling 将“构建证明”和“签署交易”这两项工作分离开来。构造零知识证明的设备，不再必须是持有花费授权的那台设备。这种解耦使硬件钱包能够将你的 spending key 隔离保存，同时由另一台设备完成更重的证明生成工作。

![证明设备将证明交给独立的签名设备](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## 可信设置

Sapling 的电路依赖一组必须被谨慎生成的公共参数。如果这些参数由单一一方独自产生，并保留了剩余的秘密数据（“toxic waste”），那么该方就可能伪造证明。为避免这种情况，这些参数通过一个两阶段、多方参与的仪式生成。第一阶段称为 Powers of Tau，与具体电路无关，这意味着它并不绑定于 Sapling 的特定电路。第二阶段是 Sapling MPC，针对的是特定电路。只要每个阶段中至少有一位参与者是诚实的，并销毁了自己的 toxic waste，该阶段就是安全的，因此只有在所有参与者全部串通的情况下，这场仪式才会失败。

## 它是如何激活的

Sapling 紧随 Overwinter 之后，后者是 2018 年 6 月的一次升级，为网络升级机制做好了准备。Electric Coin Company 在 2018 年 8 月发布的 zcashd 2.0.0 中设定了主网激活高度，当区块 419,200 被挖出时，网络切换到了 Sapling 规则。在链上，这一时刻以 Sapling 共识分支 id 标记。

![从 Zcash 发布到 Sapling 激活的时间线](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## 术语表

| 术语 | 通俗含义 |
|---|---|
| Shielded transaction | 一种私密的 Zcash 交易，会隐藏发送方、接收方和金额。 |
| Sprout | Zcash 最初发布时采用的 shielded 协议，比 Sapling 更慢、更重。 |
| Spend and Output circuits | Sapling 的两个新证明电路，取代了 Sprout 原先单一的 JoinSplit 电路。 |
| Diversified address | 可由单一密钥派生出的多个不可关联收款地址之一。 |
| Viewing key | 一种允许他人查看钱包交易、但不能花费其中资金的密钥。 |
| Consensus branch id | 一个简短代码，用于告诉网络某笔交易遵循的是哪次升级的规则。 |

## 常见问题

Sapling 会改变我持有的 ZEC 数量吗？不会。Sapling 改变的是 shielded 交易的构建方式，而不是任何人持有的 ZEC 数量，也不会改变总供应量。你的余额不受影响。

Sapling 之后，我的 ZEC 仍然是私密的吗？是的，而且更易使用。Sapling 保留了 shielded 交易的强隐私性，并让它们足够快速、足够便宜，从而真正可用。shielded 资金仍以同样的方式保持隐藏。

我需要做什么吗？作为持有者，你无需采取任何操作。Sapling 是一次由钱包和节点软件采用的网络升级。现代钱包已经支持 Sapling 地址。

Sprout 和 Sapling 有什么区别？Sprout 是第一代 shielded 协议，使用单一、缓慢且内存开销大的证明电路。Sapling 用更快的 Spend 和 Output 电路取而代之，加入了 viewing keys 和 diversified addresses，并让 shielded 交易轻量到足以在手机和硬件钱包上运行。

为什么有些资料写 10 月 28 日，而有些写 10 月 29 日？激活高度是提前设定好的，目标日期是 2018 年 10 月 28 日。真正触发变更的区块 419,200，是在 UTC 时间 10 月 29 日凌晨被挖出的。在许多本地时区中，那仍然是 10 月 28 日。无论哪种说法，指的都是同一个区块和同一时刻。

什么是 viewing key？viewing key 让你可以共享对 shielded 钱包的只读访问权限。拥有完整 viewing key 或 incoming viewing key 的人可以查看钱包的交易详情，但无法花费其中的资金。更多信息请参见[Viewing Keys](../zcash-tech/viewing-keys)。

## 测试你的理解

在 Sprout 时代，为什么那么多人会避免使用 shielded 交易？Sapling 又是如何解决这个问题的？

<details>
<summary>答案</summary>
在 Sprout 时代，构建一笔 shielded 交易需要数分钟并消耗数 GB 内存，因此对大多数用户、交易所和商家来说都太慢、太重。Sapling 引入了更快的 Spend 和 Output 电路，将这项工作缩短到几秒钟和约 40 MB 内存，使 shielded 交易能够在日常手机和硬件钱包上实际使用。
</details>

### 资源

- [ZIP 205：Sapling 网络升级的部署](https://zips.z.cash/zip-0205)
- [ZIP 243：Sapling 的交易签名验证](https://zips.z.cash/zip-0243)
- [Zcash Sapling 升级页面](https://z.cash/upgrade/sapling/)
- [Electric Coin Company：Sapling 公告](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company：Sapling MPC 公告](https://electriccoin.co/blog/sapling-mpc/)

### 另请参见

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Zcash 网络升级](../start-here/network-upgrades)
- [钱包](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

系列：[Network Upgrades 索引](../start-here/network-upgrades) · 上一篇：[Overwinter](../zcash-tech/overwinter) · 下一篇：[Blossom](../zcash-tech/blossom)

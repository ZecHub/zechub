# Zcash 网络升级

多年来，Zcash 对协议进行了重要的变更与改进，今天我们将逐一了解这些升级：

[OverWinter：](https://bitzecbzc.github.io/blog/overwinter/index.html) 于区块 347500 激活，出块时间为 2018 年 6 月 26 日。Overwinter 是 Zcash 自最初发布以来的第一次网络升级。Overwinter 的主要目标是为未来的网络升级强化协议基础。Overwinter 的核心内容包括针对网络升级的重放保护、版本管理、提升透明交易的性能，以及新增交易过期功能。


[Sapling：](https://coinbureau.com/analysis/zcash-sapling-upgrade/) 于区块 419200 激活，出块时间为 2018 年 10 月 29 日。这是 Zcash 网络第二次令人印象深刻的重大升级，主要聚焦于提升用于屏蔽交易的 zk-SNARKs 效率。在 Sapling 发布之初，zk-SNARKs 面临着若干迫在眉睫的挑战，包括可升级性问题、实现复杂性以及可信设置要求。幸运的是，Sapling 提升了 zk-SNARK 证明创建的效率，从而扩大了这种加密货币的潜在采用范围，而这正是我们今天正在受益的成果！Sapling 另一项值得注意的设计是（一个公共参数生成仪式），这也是 Zcash 团队希望改进的内容。


[Zcash Blossom：](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/) 于区块 653600 激活，出块时间为 2019 年 12 月 11 日。这次关键的网络升级旨在通过将区块时间减半至约 75 秒来提升可扩展性和用户体验。这意味着什么？交易确认更快，网络吞吐量翻倍，交易费用也保持在较低水平。Blossom 升级立即表明，Zcash 网络能够做出务实的工程决策，在保持高标准安全性和可靠性的同时提升网络容量。


[HeartWood：](https://electriccoin.co/blog/introducing-heartwood/) 于区块 903000 激活，出块时间为 2020 年 7 月 16 日。Heartwood 的唯一目的，是通过支持 shielded Coinbase 来实现更多第三方集成并增强隐私性，这使矿工能够以屏蔽地址接收奖励。此外，Heartwood 还带来了更强的网络去中心化和互操作性。Heartwood 升级还集成了 Flyclient，使轻客户端能够高效验证交易，从而提升可扩展性和第三方集成能力。还值得一提的是，被称为 ZIP 213 的 shielded Coinbase，旨在修改 Zcash 共识规则，使 Coinbase 资金能够被挖到受屏蔽的 Sapling 地址中。在 Sapling 升级之前，shielded Coinbase 并不可行，因为创建屏蔽交易需要大量内存和 CPU 资源。


[Canopy：](https://youtu.be/R8O1SZMfESM?si=qoBL1dBp4E_af-eM) 于区块 1046400 激活，出块时间为 2020 年 11 月 18 日。这次升级得到了 Electric Coin Co (ECC) 和 Zcash Foundation 的共同支持。Canopy 标志着创始人奖励的结束，同时引入了一种新的资金机制（Zcash 开发基金），并采用新的治理模式，以支持 Zcash 生态系统的持续资金供给。对于 Canopy，未来四年将设立一个新的开发基金。80% 的挖矿奖励将分配给矿工。剩余的 20% 将分配给新的 Major Grants Fund（8%）、Electric Coin Co（7%）和 Zcash Foundation（5%）。“canopy” 这一名称体现了 Zcash 的使命：在坚守隐私与去中心化原则的同时，打造一个可持续且繁荣的生态系统。


[NU5：](https://electriccoin.co/blog/nu5-proposed-features/) 于区块 1687104 激活，出块时间为 2022 年 5 月 31 日。值得一提的是，Zcash Network Upgrade 5 标志着这项加密货币自 2016 年诞生以来迎来了一个重要里程碑。作为 Zcash 的第六次重大升级，NU5 引入了 Orchard 屏蔽协议、Unified Address，以及 Halo 证明系统。Zcash 的 NU5 升级延续了 zk-SNARK 技术栈的演进，旨在消除可信设置并升级协议底层密码学的安全性。NU5 也得到了 ECC 和 Zcash Foundation 的支持。


[NU6：](https://zips.z.cash/zip-0253) NU6 实施了一个新的 Zcash 开发基金（Hybrid Deferred Dev Fund，向非直接资助模式过渡），并将设立一个 lockbox，用于保留一部分发行量，以供未来任何去中心化资助资金使用。这些资金的释放将完全由未来由 Zcash 社区决定的机制进行治理。NU6 的使命是减少区块补贴，并通过 lockbox 机制建立一个去中心化资金模型，以确保更高的透明度，同时加强隐私。

[NU6.2：](https://zips.z.cash/zip-0257) NU6.2 网络升级重新启用了 Orchard 屏蔽协议，并相对于原始 Orchard 规则带来了两项共识变更：

* Orchard Action 电路中的 variable-base scalar multiplication gadget 已被修正，修复了 soundness 漏洞。这会改变 Orchard verifying key。NU6.2 之前的 Action 证明只能在历史上的（不安全的）verifying key 下通过验证，而自 NU6.2 起的证明只能在修正后的 key 下通过验证。该修复已发布于 halo2_gadgets v0.5.0 10 和 orchard v0.14.0. 11

* 自 NU6.2 激活起，Orchard Action proof MUST 具有修正后电路的规范长度。在 NU6.2 之前，这一长度并未作为共识规则强制执行。8

自 NU6.2 激活起，临时缓解措施将不再适用。包含 Orchard Action 描述的交易 MUST 再次被接受，其证明需依据修正后的电路以及规范长度规则进行验证。NU6.2 已部署于 zcashd v6.20.0 和 zebra v5.0.0。

[NU6.3：](https://zips.z.cash/zip-0258) NU6.3 网络升级引入了 Ironwood 屏蔽池。NU6.3 的共识变更分别在版本 6 交易格式 5、Orchard Action 电路更新 6、ZIP 2005 7，以及本 ZIP 中进行了规定；其中本 ZIP 修复了激活参数以及那些无论交易版本为何、只要取决于 NU6.3 激活就会生效的共识规则。

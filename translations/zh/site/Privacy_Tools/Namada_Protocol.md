[![编辑页面](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada Protocol

![Namada 标志](https://i.ibb.co/BZcZHS1/logo.png)


## 什么是 Namada？

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash 详解：Namada-Zcash 战略联盟"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada Protocol 是一个基于权益证明共识的 Layer 1 平台，旨在提供跨链、与资产类型无关的隐私保护。通过 Inter-Blockchain Communication（IBC）协议，Namada 可与具备快速终局性的链无缝集成，实现顺畅的互操作性。此外，Namada 还与 Ethereum 建立了无需信任的双向桥接，促进两个网络之间安全可靠的通信。

Namada 将隐私放在优先位置，采用增强版的 Multi-Asset Shielded Pool（MASP）电路。这一升级版本使包括同质化代币和非同质化代币在内的各类资产，都能像 Zcash 一样使用同一个共享屏蔽集合。因此，在 Namada 上转移受支持资产时，由于隐私级别很高，识别具体转账行为会变得非常困难。此外，Multi Asset Shielded Pool 电路的最新更新还引入了屏蔽集合奖励，这是一项突破性的功能或激励机制，通过资源分配来推动将隐私作为公共产品的发展。

## Ethereum Bridge + IBC 兼容

将 Ethereum bridge 集成到 Namada 中后，无需再单独依赖一个独立协议，因为它已成为 Namada 生态系统的组成部分。Namada 中的验证者负责在运行核心 Namada 协议的同时运行该桥。这些验证者在将资产转移到 Namada 时也充当中继者，因此不再需要额外参与者。另一方面，在将资产转移到 Ethereum 时，则会有外部方（称为 relayers）参与，但他们不负责验证或保障该桥的安全。

![Ethereum Bridge 示意图](https://i.ibb.co/wKds5RP/image.jpg)

Namada Protocol 还能够与任何支持 Inter-Blockchain Communication（IBC）协议且具备快速终局性的链无缝连接。在与 Ethereum 互操作时，Namada 实现了一种专门且安全的 Ethereum bridge，并以无需信任的方式运行。该桥经过精心设计，将安全性放在首位：对所有桥接连接实施流量控制，并将任何有问题的 Ethereum 转账视为严重违规行为，可能触发罚没惩罚。

## 屏蔽集合奖励

在 [Namada Protocol](https://blog.namada.net/what-is-namada/) 的最新更新中，持有屏蔽资产的用户将被激励积极参与共享屏蔽集合。这得益于更新后的 MASP 电路整合了创新性的 Convert Circuit。借助这一新功能，Namada 鼓励用户通过持有屏蔽资产来为共享屏蔽集合作出贡献。

在 Namada 中，屏蔽集合被视为一种非排他性、非竞争性的公共产品。这意味着，随着越来越多的人使用屏蔽转账，每位参与者获得的隐私保障都会增强。该协议认识到，集体采用和参与对于提升所有用户的隐私至关重要。因此，通过激励用户持有屏蔽资产并为共享屏蔽集合作出贡献，Namada 正在培育一个更强大、更稳健的隐私生态系统。

## 屏蔽资产交易

在屏蔽转账中，无论涉及的是 Ethereum 非同质化代币（NFT）、ATOM 还是 NAM，它们彼此都无法区分。这意味着，MASP（Modified Accumulator Sapling Protocol，Zcash Sapling 电路的增强版本）提供的隐私保护特性会统一适用于所有类型的资产。MASP 电路使 Namada 生态系统中的所有资产共享同一个屏蔽集合。这种方式确保隐私保障不会在不同资产之间被割裂。无论某种特定资产的交易量如何，隐私保护都保持一致且彼此独立。

![屏蔽资产交易示意图](https://i.ibb.co/7CDmWk6/image-1.png)

通过在不同资产之间统一屏蔽集合，Namada 确保无论屏蔽转账涉及哪种具体资产类型，隐私都能得到一致维护。这种方法推动协议内部形成统一的隐私框架，并增强涉及 Ethereum NFT、ATOM、NAM 及其他受支持资产交易的保密性。Namada 还使用新型 zk-SNARKs 实现同质化与非同质化代币的私密转移，确保原生与非原生代币都能像在 Zcash 上那样获得保密性保护。

## 更低费用与更快交易

Namada 结合了两个关键要素来实现快速交易速度和终局性：快速证明生成与现代 Byzantine Fault Tolerant（BFT）共识。这两项特性使 Namada 能达到与 Visa 相当的交易处理速率；Visa 是一个以高吞吐能力著称的知名支付网络。快速证明生成是指高效生成加密证明，用于验证区块链上交易的正确性与完整性。通过采用先进技术与优化手段，Namada Protocol 将生成这些证明所需的计算开销降到最低，从而实现对交易的快速验证与确认。

此外，Namada 采用现代 BFT 共识算法，确保整个网络中交易的一致性与完整性。这些共识机制使 Namada 能够就交易顺序和有效性达成一致，从而提供强有力的终局性保证。有了终局性，交易就被视为不可逆，从而降低双花或交易回滚的风险。Namada 采用了与 Anoma 类似的方法，后者也是一个以可扩展性解决方案闻名的协议。Namada 采用分形实例，使得能够在主区块链内创建嵌套链。这种分形结构通过将负载分散到多个实例上来实现横向扩展，从而提升整个网络的容量与性能。

## Namada 与 Zcash 战略联盟

根据最近发布的一篇文章，可参见 [Namada Protocol Blog](https://blog.namada.net/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/)，Namada Protocol 背后的团队很高兴提出一项提案和征求意见稿（RFC），旨在推动 Namada 与 Zcash 的资产、链和社区之间建立战略联盟。

![Namada-Zcash 战略联盟示意图](https://i.ibb.co/FqsmkMb/image-2.png)

该联盟提案包含三个主要要素。首先，将创建一个资助池，为能够同时惠及 Zcash 和 Namada 的项目提供资金支持。其次，将向 ZEC 持有者分发 NAM 代币空投。最后，团队计划建立一座连接 Zcash 与 Namada 的最小信任桥。该桥一旦落地，ZEC 持有者（称为 Zolders）就能在 Namada 上使用他们的 ZEC。此外，Zolders 还将有机会通过 Namada 接入更广泛的 Cosmos 和 Ethereum 生态系统。你可以在 [Zcash Community Forum](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372) 了解更多关于该战略联盟的信息。

## 参考链接

- [Namada Protocol 官方视频](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada Protocol 官网](https://namada.net/)
- [Namada 博客](https://blog.namada.net/)
- [Namada 文档](https://docs.namada.net/)

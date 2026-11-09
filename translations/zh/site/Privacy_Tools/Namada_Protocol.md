[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Namada_Protocol.md)

# Namada 协议 [Protocol]

![Namada Logo](/content-images/logo-2067e2533d.webp)


## 什么是 Namada？

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Wg_WtPdBig0"
    title="Zcash Explained: Namada-Zcash Strategic Alliance"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Namada 协议作为一个基于权益证明 [proof-of-stake] 共识 [consensus] 的 Layer 1 平台，旨在提供跨链、资产无关的隐私 [privacy]。通过 Inter-Blockchain Communication (IBC) 协议，Namada 可与快速终局性链无缝集成，实现顺畅的互操作性。此外，Namada 与 Ethereum 建立了无需信任的双向桥 [bridge]，促进两个网络之间安全可靠的通信。

Namada 通过实施 Multi-Asset Shielded Pool (MASP) 电路的增强迭代版本，优先保障隐私。此升级版本使所有类型的资产，包括同质化和非同质化代币 [token]，都能像 Zcash 一样使用共享屏蔽 [shielded] 集。结果是，在 Namada 上转移受支持资产的行为因所涉及的高水平隐私而难以识别。Multi Asset Shielded Pool 电路的最新更新还支持屏蔽集奖励，这是一项突破性功能或激励措施，用于分配资源以推动将隐私作为公共产品。

## Ethereum 桥 + IBC 兼容

将 Ethereum 桥集成到 Namada 中，无需单独的协议，因为它成为 Namada 生态系统的组成部分。Namada 内的验证者负责在运行核心 Namada 协议的同时运行该桥。这些验证者在向 Namada 转移资产时也充当中继者，因此无需额外参与者。另一方面，向 Ethereum 转移资产时会有外部方参与，这些外部方被称为中继者，但他们不负责验证或保护该桥。

![Ethereum Bridge Diagram](/content-images/image-0fd8f754ba.webp)

Namada 协议还能够与任何支持 Inter-Blockchain Communication (IBC) 协议的快速终局性链无缝连接。在与 Ethereum 互操作方面，Namada 实施了一种专门且安全的 Ethereum 桥，以无需信任的方式运行。该桥经过精心设计，通过对所有桥连接实施流量控制，并将任何有故障的 Ethereum 转移视为可能导致削减处罚的严重违规行为，从而优先保障安全性。

## 屏蔽集奖励

在 [Namada 协议](https://namada.net/blog/what-is-namada)的最新更新中，持有屏蔽资产的用户会被激励积极参与共享屏蔽集。这通过集成更新后的 MASP 电路实现，该电路现已包含创新的 Convert Circuit。借助这一新功能，Namada 鼓励用户通过持有屏蔽资产来为共享屏蔽集作出贡献。

在 Namada 中，屏蔽集被视为非排他性且非竞争性的公共产品。这意味着，随着越来越多的人使用屏蔽转移，每位参与者获得的隐私保障水平都会提高。该协议认识到，集体采用和参与对于增强所有用户隐私的重要性。因此，通过激励用户持有屏蔽资产并为共享屏蔽集作出贡献，Namada 培育了一个更强大、更稳健的隐私生态系统。

## 屏蔽资产交易 [Transaction]

在屏蔽转移中，无论涉及 Ethereum 非同质化代币 (NFT)、ATOM 还是 NAM，它们彼此之间都无法区分。这意味着，MASP（Modified Accumulator Sapling Protocol）提供的隐私保护功能，即 Zcash Sapling 电路的增强版本，统一适用于所有类型的资产。MASP 电路使 Namada 生态系统中的所有资产能够共享同一个屏蔽集。这种方法确保隐私保障不会在各个资产之间碎片化。无论某一特定资产的交易量如何，隐私保护始终保持一致且独立。

![Shielded Assets Transaction Diagram](/content-images/image-1-512c639d56.webp)

通过统一不同资产之间的屏蔽集，Namada 确保无论屏蔽转移涉及何种具体资产类型，隐私都得到统一维护。这种方法在协议内推动了连贯的隐私框架，并增强了涉及 Ethereum NFT、ATOM、NAM 及其他受支持资产的交易保密性。Namada 还支持使用新颖的 zk-SNARKs 私密转移同质化和非同质化代币，确保原生和非原生代币的保密性，如同在 Zcash 上所实现的一样。

## 更低的手续费 [Fees] 和快速交易

Namada 结合两个关键要素来提供快速交易速度和终局性：快速证明生成以及现代拜占庭容错 (BFT) 共识。这两项功能使 Namada 能够实现与 Visa 相当的交易处理速率，Visa 是一个以高吞吐能力著称的支付 [payment] 网络。快速证明生成是指高效产生加密证明，以验证 Blockchain 上交易的正确性和完整性。通过采用先进技术和优化方法，Namada 协议将生成这些证明所需的计算开销降至最低，从而实现交易的快速验证和确认。

此外，Namada 使用现代 BFT 共识算法，以确保整个网络中交易的完整性和一致性。这些共识机制使 Namada 能够就交易的顺序和有效性达成共识，并提供强有力的终局性保证。具备终局性后，交易被视为不可逆转，从而降低双重支付或交易回滚的风险。Namada 采用与 Anoma 类似的方法，后者是另一个以扩容 [scaling] 解决方案闻名的协议。Namada 采用分形实例，允许在主 blockchain 内创建嵌套链。这种分形结构通过将负载分布到多个实例上实现水平扩容，增强网络的整体容量和性能。

## Namada 与 Zcash 战略联盟

根据可在 [Namada 协议博客](https://namada.net/blog/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash)找到的近期文章，Namada 协议背后的团队很高兴提出一项提案和征求意见稿 (RFC)，以建立 Namada 与 Zcash 资产、链和社区之间的战略联盟。

![Namada-Zcash Strategic Alliance Diagram](/content-images/image-2-68804c60f3.webp)

拟议的联盟包含三个主要要素。首先，将创建一个拨款 [grant] pool，为能同时惠及 Zcash 和 Namada 的项目提供资金。其次，将向 ZEC 持有者空投 NAM 代币。最后，计划建立一座连接 Zcash 和 Namada 的最小化信任桥。实施后，这座桥将使被称为 Zolders 的 ZEC 持有者能够在 Namada 上使用其 ZEC。此外，Zolders 将有机会通过 Namada 访问更广泛的 Cosmos 和 Ethereum 生态系统。您可以在 [Zcash 社区论坛](https://forum.zcashcommunity.com/t/rfc-proposal-for-a-strategic-alliance-between-namada-and-zcash/44372)了解有关战略联盟的更多信息。

## 参考链接

- [Namada 协议官方视频](https://www.youtube.com/watch?v=Wg_WtPdBig0)
- [Namada 协议官方网站](https://namada.net/)
- [Namada 博客](https://namada.net/blog)
- [Namada 文档](https://docs.namada.net/)

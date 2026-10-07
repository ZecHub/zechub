<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_in_DeFi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 在 DeFi 中使用 Zcash


## Near Intents 

Zcash 和 NEAR Intents 已完成集成，使用户能够将 Zcash (ZEC) 与其他主流山寨币进行交换，包括 Bitcoin、Solana、NEAR 和 XRP，且无需支付任何费用。这项集成是 NEAR Protocol 为构建自主且可验证的 AI 机器人基础设施所做努力的一部分，同时也通过启用 AI 驱动的支付轨道为 Zcash 带来益处。Zcash 用户如今可以通过 [Near Intents](https://app.near-intents.org) 在保护隐私的同时，访问智能合约和更广泛的 [DeFi applications](https://nym.com/blog/what-is-defi)。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/mKVvXY4yjjA"
    title="使用 Zcash x NEAR Intents 进行跨链交换"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Maya Protocol 

Maya Protocol 已集成 Zcash，以增强其去中心化、流动性和交易隐私。这项集成使 Zcash 用户能够受益于去中心化交换，在保护隐私的同时获得更大的灵活性和流动性。了解更多：[https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya](https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya)


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="如何在 LeoDex 上将 Ethereum 交换为 Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


**注意**：你也可以将自己已持有的任何 ETH 桥接到私密存储中，作为 Shielded Zcash，方法是使用 “Release” 选项卡并输入你的 Transparent address。然后，你可以在移动端/桌面端钱包中使用 “Autoshield”。为了让此应用保持私密，建议不要从 ZEC > ETH 再从 ETH > ZEC 进行交换。

---

## 围绕 Zcash DeFi 的创新 

**Layer 1 解决方案**

目前正在探索一些方案，以便利用现有的 Layer 1 在 Zcash 生态内实现 DeFi 应用。这可以通过将大部分合约操作由排序器在链下执行，再将这些操作的验证放到链上完成来实现。JP Morgan 曾在其企业区块链上合作创建过这一模式的一个版本。自 NU5 起，已经存在一种机制（TZE），可将这类扩展添加到 Zcash 中。

**zkEVM**

这将通过支持零知识证明计算的 EVM 兼容虚拟机，为 Zcash 带来原生可编程性。这将使 Zcash 能够借助更为多元的开发者社区实现增长，并培育一个保护隐私的应用与代币生态系统。这也会让它能够与其他现有的 L2 隐私解决方案相比较。

由 ECC 主导的 Proof-of-Stake 与 Cosmos Interblockchain Communication Protocol 相关研究仍在继续推进。后续步骤正在评估中，同时也会结合 Ethereum 向 PoS 合并的成效以及可能出现的任何问题。

**ZSA/UDA's**

Zcash Shielded Assets / User Defined Assets 一直在一个专门团队的协助下进行开发。随着 NU5 协议升级完成，它们距离落地已显著更近。目前，支持这些资产进行无需信任且私密的跨链桥接、从而实现互操作性的机制也正在开发中。下方附有关于此主题的 Zcon3 演讲链接。


### 资源：

[Zcon3 私密跨链转账](https://youtu.be/vCvMk2-CJN8)

[Zcon3 上关于 Defi 的 QEDIT 演讲](https://youtu.be/EGjcYhovty0) / [绘图板](https://miro.com/app/board/uXjVOhuveHo=/)

[Ian Miers 谈 ZSA's 与稳定币](https://www.youtube.com/watch?v=hJMWE3zLIcs)

[Proof-of-Stake 研究](https://electriccoin.co/blog/proof-of-stake-research-overview-1/)

__

与其他现有智能合约平台相比，Zcash 毫无疑问的优势在于其原生私密的 Layer 1。这彻底消除了在使用任何 Layer 2 应用时发生信息泄露的可能性。从而实现一个从根本上更简单、更安全的应用层，也能更轻松地对信息访问进行许可控制。

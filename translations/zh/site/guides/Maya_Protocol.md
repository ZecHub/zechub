# Maya 去中心化交易所

---

## 教程


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="如何在 LeoDex 上将 Ethereum 兑换为 Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 什么是 Maya Protocol？

Maya 是一个[去中心化交易所](https://nym.com/blog/what-is-dex)（DEX）系统，可实现不同区块链之间的加密货币交易。例如，你可以轻松地将 Bitcoin 区块链上的 Bitcoin（BTC）与 Ethereum 区块链上的 Ethereum（ETH）进行兑换，而无需持有相关资产，也无需涉及任何中心化机构或了解你的客户（KYC）流程。

Maya Protocol 使用 Cosmos Software Development Kit（Cosmos SDK）开发，并基于 Proof of Bond（PoB）共识机制运行。该协议由“节点运营者”维护，他们将资金质押到系统中，并以此获得回报，作为其贡献和努力的奖励。本质上，节点是运行软件的计算机，负责验证用户的兑换，并监管不同区块链上指定地址中的资产。

要完成一次兑换，用户发送的受支持加密货币必须先被 Maya 的某个地址接收，随后 Maya 会从另一条区块链上的另一个地址发送等值资产。这个过程由至少三分之二的节点管理并批准，尤其要确保资金已被正确接收。

通过这种方式，用户可以在一条区块链上发送一种代币，并在另一条区块链上原生接收另一种代币，全程无需使用封装代币。

## 什么是 Proof of Bond？

Proof of Bond（PoB）是一种共识机制，要求节点运营者必须提交一笔保证金（通常为网络的原生代币）才能参与网络。这笔保证金相当于一种经济安全机制，用于确保节点诚实行事并维护网络完整性2。如果某个节点试图作恶，或未能履行职责，其保证金可能会被罚没，也就是其中一部分会被扣除作为惩罚。

在 Maya Protocol 中，这一机制有助于从节点运营者所质押的资源中产生经济价值，从而提高资本效率。类似地，在 THORChain 中，节点运营者通过质押 RUNE（原生代币）来保护网络安全并确保参与者之间的协作。

## Maya 与 THORChain 的区别

Maya 是 THORChain 的一个分叉版本，但加入了一些新特性和新功能，使其成为一个很有价值的替代方案。其中最重要的有：

### 流动性节点

Maya 并未遵循纯保证金模型，而是在考虑转向流动性节点模型。在这一系统中，节点可以直接提供流动性，并将其绑定到网络中。这种方式意味着节点运营者面临显著风险：如果他们挪用资金，就会遭受损失，这构成了强有力的威慑。因此，节点运营者使用来自流动性池的流动性单位，这些单位在提供流动性的同时，也增强了网络安全性。

### 无常损失保护

这是一套保护流动性提供者免受临时性损失（LPs）的系统。此类损失可能发生在提供流动性期间，因为加密资产价格会持续波动。
ILP 持有 $CACAO 供应量的 10%（1000 万 $CACAO），并持续由协议手续费的 10% 进行补充。ILP 在流动性存入 50 天后生效，保障上限为 100%。

ILP 的保障期限取决于 ASSET 和 $CACAO 的表现。如果 ASSET 表现更好，则 150 天后实现全额保障；如果 $CACAO 表现更好，则需 450 天后实现全额保障。完全提取时，ILP 会被支付并重置；部分提取不会影响 ILP。对于追加存入，ILP 会重置，但不会支付。

### 不同的分配模型

流动性拍卖是一项为期 21 天的活动，旨在向参与者分发 $CACAO 代币。在活动期间，用户将受支持资产存入一个特定地址。拍卖结束时，90% 的 $CACAO 代币按参与者的流动性贡献比例进行分配，剩余 10% 分配给 ILP 储备。参与者随后成为流动性提供者，他们存入的资产和 $CACAO 代币被放入 Maya 的资金池中，从而可以赚取所产生手续费的一部分。

### 不同的储备处理方式

在 Maya Protocol 创世时，可用的 CACAO 储备仅占总供应量的 10%，相比之下 THORChain 为 44%，且这些储备主要用于无常损失保护（ILP）。Maya 没有区块发行；如果未来实现协议自有流动性和借贷功能，其设计也会有所不同，因为在 THORChain 中，这些方面与储备机制是紧密集成的。

尽管存在这些差异，Maya 仍然可作为 THORChain 的补充解决方案，提供冗余、扩展和验证能力，并整合当前 THORChain 实现中尚不存在的新网络。

此外，Maya 的目标是成为供其他服务构建其上的 *backend*，希望未来能出现大量新的 *frontends*，或基于 Maya 基础设施构建的 DEX 服务。

## Maya protocol 钱包集成

作为一个 *backend*，Maya 需要得到不同 UI 和钱包的支持才能被使用。
以下是一些已经支持 Maya 的服务：

[Thorwallet DEX](https://www.thorwallet.org/)：Ledger、XDEFI、Metamask、Keystore

[El Dorado](https://www.eldorado.market/)：XDEFI、Keystore

[CacaoSwap](https://cacaoswap.app/)：Keystore、MetaMask、XDEFI、Keplr、Leap

[Asgardex](https://www.asgardex.com/)：Keystore、Ledger

[DefiSpot](https://www.defispot.com/t)：XDEFI、Metamask、Keplr、Phantom、Walletconnect、Leap Wallet、Argeentx、Braavos、Trustwallet 和 Rabby。

[XDEFI](https://www.xdefi.io/)：一款多生态自托管钱包，支持 30+ 原生区块链，以及所有 EVM 和 Cosmos 链，包括 Bitcoin、Ethereum、Solana、THORChain、Maya Protocol、TRON 等。

[KeepKey ](https://keepkey.com/)：一款用于安全存储数字资产的硬件钱包。

# Maya 去中心化交易所

---

## 教程


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 什么是Maya Protocol？

Maya 是一个[去中心化交易所 decentralized exchange](https://nym.com/blog/what-is-dex)（DEX）系统，可实现不同 blockchain 之间的加密货币交易。例如，您可以轻松地将 Bitcoin blockchain 上的 Bitcoin（BTC）与 Ethereum blockchain 上的 Ethereum（ETH）进行兑换，无需持有资产，也无需涉及任何中心化机构或了解您的客户（KYC）程序。

Maya Protocol使用Cosmos软件开发工具包（Cosmos SDK）开发，并采用 Bond 证明 [Proof of Bond]（PoB）共识机制。该协议由"节点运营者"维护，他们向系统质押资本，并因其贡献和努力获得回报。节点本质上是运行软件的计算机，用于验证用户兑换，并监管不同 blockchain 上指定地址中的资产。

要完成兑换，用户必须将受支持的加密货币发送至 Maya 的某个地址，然后 Maya 会从另一条 blockchain 上的另一个地址发送等值金额。此过程由至少三分之二的节点管理和批准，尤其是确保资金已被正确接收。

通过这种方式，用户可以在一条 blockchain 上发送一种代币，并在另一条 blockchain 上接收不同类型的代币，整个过程均为原生操作，无需使用封装代币。

## 什么是 Bond 证明？

Bond 证明（PoB）是一种共识机制，节点运营者必须提交 bond（通常以网络原生代币的形式）才能参与网络。该 bond 作为一种经济安全保障，确保节点诚实行事并维护网络完整性2。如果节点试图恶意行事或未能履行职责，其 bond 可能会被削减，即其中一部分将被作为处罚扣除。

在Maya Protocol中，此机制有助于从节点运营者的质押资源中创造经济价值，提高资本效率。同样，在THORChain中，节点运营者通过 bond RUNE（原生代币）来保障网络安全，并确保参与者之间的协作。

## Maya 与 THORChain之间的差异

Maya 是THORChain的一个 fork，但具备一些新特性和功能，使其成为出色的替代方案。其中最重要的包括：

### 流动性节点

Maya 并未遵循纯 Bond 模型，而是在考虑转向流动性节点模型。在该系统中，节点可以直接提供流动性，并将其 bond 至网络。这种方式意味着节点运营者面临重大风险：如果他们滥用资金，就会蒙受损失，从而形成强大的威慑。因此，节点运营者使用来自流动性池的流动性单位，既能提供流动性，也能增强网络安全性。

### 无常损失保护

该系统可保护流动性提供者免受因加密资产价格持续波动而在提供流动性时可能遭受的暂时性损失（LP）。

ILP 持有 $CACAO 供应量的 10%（1000 万 $CACAO），并由协议手续费的 10% 持续补充。ILP 在流动性存入 50 天后生效，保障上限为 100%。

ILP 的保障期限取决于 ASSET 和 $CACAO 的表现。如果 ASSET 表现更佳，则在 150 天后实现全额保障；如果 $CACAO 表现更佳，则在 450 天后实现全额保障。完全提取时，ILP 会支付并重置；部分提取则不会受到影响。对于充值，ILP 会重置但不会支付。

### 不同的分配模型

流动性拍卖是一项为期 21 天的活动，旨在向参与者分配 $CACAO 代币。在活动期间，用户将受支持的资产存入特定地址。拍卖结束时，90% 的 $CACAO 代币按流动性贡献比例分配给参与者，其余 10% 分配至 ILP 储备。参与者成为流动性提供者，其存入的资产和 $CACAO 代币被置于 Maya 的 pool 中，使其能够赚取所产生手续费的一部分。

### 不同的储备处理方式

在Maya Protocol创世时，可用的 CACAO 储备仅占总供应量的 10%，而THORChain为 44%，并且主要用于无常损失保护（ILP）。Maya 没有区块发行；如果实施协议自有流动性和借贷，它们将采用不同设计，因为在THORChain中，这些方面与储备紧密集成。

尽管存在这些差异，Maya 也可作为THORChain的互补解决方案，提供冗余、扩展和验证，并整合当前THORChain实现中尚不存在的新网络。

此外，Maya 的目标是成为供其他服务构建的*后端*，希望看到大量基于 Maya 基础设施构建的新*前端*或 DEX 服务。

## Maya Protocol钱包集成

作为*后端*，Maya 需要获得不同 UI 和钱包的支持才能使用。
以下是一些已经支持 Maya 的服务：

[Thorwallet DEX](https://www.thorwallet.org/)：Ledger、XDEFI、MetaMask、Keystore

[El Dorado](https://www.eldorado.market/)：XDEFI、Keystore

[CacaoSwap](https://cacaoswap.app/)：Keystore、MetaMask、XDEFI、Keplr、Leap

[Asgardex](https://www.asgardex.com/)：Keystore、Ledger

DefiSpot：已不再运营，其域名无法解析。

[Ctrl Wallet（XDEFI）](https://ctrl.xyz/)：一款多生态系统自托管钱包，支持 30 多条原生区块链，以及所有 EVM 和Cosmos链，包括 Bitcoin、Ethereum、Solana、THORChain、Maya Protocol、TRON 等。

[KeepKey ](https://keepkey.com/)：一款用于安全存储数字资产的硬件钱包。

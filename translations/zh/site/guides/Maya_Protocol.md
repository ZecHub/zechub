<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Maya 去中心化交易所 [Decentralised Exchange]

> Maya Protocol 是一个用于原生兑换的跨链 [cross-chain] DEX，例如将 ETH 或 BTC 兑换为 ZEC，无需封装代币、账户或 KYC。

## TL;DR

* Maya 可在不同 blockchain 之间兑换原生币：你发送一种资产，并在其自身链上接收另一种资产。无需封装代币、账户或 KYC。
* 它是 THORChain 的 fork，使用 Cosmos SDK 构建，并由提供 bond 资本的节点 [node] 运营者通过 Proof of Bond 保障安全。
* 它的原生代币是 $CACAO。流动性提供者可赚取兑换手续费 [swap fees]，并在 50 天后获得无常损失保护 [Impermanent Loss Protection]（ILP）。
* Maya 是一个后端 [backend]：你可通过前端 [frontend] 或钱包 [wallet] 使用它，例如 THORWallet、CacaoSwap、Asgardex、Ctrl Wallet 或 KeepKey。
* 教程视频展示了如何在这些前端之一的 LeoDex 上，将 ETH 兑换为 ZEC。
* Maya 通过 SwapKit 支持屏蔽 [shielded]/统一 ZEC 充值 [top up]（透明 [transparent] 价值输出加上一条屏蔽备忘录 [memo]），因此某些前端可将 ZEC 直接发送至统一地址 [address]。如果你的前端支付至透明（t1）地址，请随后在钱包中将其屏蔽以保护隐私 [privacy]。
* Maya 并非原生 ZEC 兑换的唯一选择：THORChain 也拥有一个原生 ZEC pool。

## 核心说明

中心化交易所会持有你的币并需要你的身份信息。Maya 则使用一个由节点组成的网络，在每条受支持的链上控制金库。你将币发送至 Maya 金库，至少三分之二的节点确认该笔充值，然后匹配的资产会从另一座金库发送至你在目标链上的地址。

节点运营者提供可在违规时被削减的 bond，这让他们在经济上有动机保持诚实。Maya 在 THORChain 的基础上增加了流动性节点和自己的储备设计等功能，同时还作为与其并列的第二个独立网络运行。

以下章节介绍 Maya 的运作方式、Proof of Bond、它与 THORChain 的差异，以及哪些钱包支持它。

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


## 什么是 Maya Protocol？

Maya 是一个 [去中心化交易所](https://nym.com/blog/what-is-dex)（DEX）系统，可在不同 blockchain 之间交易加密货币。例如，你可以轻松地将 Bitcoin blockchain 上的 Bitcoin（BTC）与 Ethereum blockchain 上的 Ethereum（ETH）进行兑换，无需持有资产，也无需任何中心化机构或了解你的客户 [Know Your Customer]（KYC）程序参与。

Maya Protocol 使用 Cosmos 软件开发工具包 [Software Development Kit]（Cosmos SDK）开发，并采用 Proof of Bond（PoB）共识 [consensus] 机制运行。该协议由"节点运营者"维护，他们将资本质押 [staking] 至系统中，并因其贡献和努力而获得回报。本质上，节点是运行软件的计算机，用于验证用户兑换并监管不同 blockchain 指定地址中的资产。

要完成一次兑换，用户必须将受支持的加密货币发送至 Maya 的某个地址，然后等额资产会从 Maya 位于另一条 blockchain 的地址中发送出去。至少三分之二的节点会管理并批准该过程，尤其确保资金已被正确接收。

通过这种方式，用户可在一条 blockchain 上发送一种代币 [token]，并在另一条 blockchain 上接收不同种类的代币，整个过程均为原生完成，且无需使用封装代币。

## 什么是 Proof of Bond？

Proof of Bond（PoB）是一种共识机制，节点运营者必须提供 bond（通常以网络原生代币的形式）才能参与网络。该 bond 充当一种经济安全保障，确保节点诚实行事并维护网络完整性。如果某个节点试图恶意行事或未能履行职责，其 bond 可被削减，即其中一部分会被作为惩罚扣除。

在 Maya Protocol 中，这一机制有助于从节点运营者的质押资源中创造经济价值，提高资本效率。同样，在 THORChain 中，节点运营者提供 RUNE（原生代币）作为 bond，以保障网络安全并确保参与者之间的协作。

## Maya 与 THORChain 的差异

Maya 是 THORChain 的 fork，但增加了一些新特性和功能，使其成为出色的替代选择。最重要的包括：

### 流动性节点

Maya 正在考虑转向流动性节点模型，而不是遵循纯 bond 模型。在该系统中，节点可直接贡献流动性并将其 bond 至网络。该方式意味着节点运营者面临重大风险：如果他们滥用资金，就会遭受损失，这构成强有力的威慑。因此，节点运营者使用来自流动性池 [Liquidity Pools] 的流动性单位，这些单位同时提供流动性并增强网络安全。

### 无常损失保护

该系统可保护流动性提供者（LP）免受因加密资产价格持续波动、提供流动性时可能遭遇的暂时性损失。
ILP 持有 $CACAO 供应量的 10%（1,000 万 $CACAO），并由协议手续费的 10% 持续补充。ILP 会在流动性存入 50 天后生效，覆盖上限为 100%。

ILP 的覆盖期限取决于 ASSET 和 $CACAO 的表现。如果 ASSET 表现更佳，将在 150 天后实现全额覆盖；如果 $CACAO 表现更佳，则在 450 天后实现全额覆盖。完全撤出时，ILP 会同时支付并重置；部分撤出不会受影响。对于充值，ILP 会重置但不会支付。

### 不同的分配模型

流动性拍卖是一项为期 21 天的活动，旨在向参与者分配 $CACAO 代币。活动期间，用户将受支持资产存入特定地址。拍卖结束时，90% 的 $CACAO 代币按参与者的流动性贡献比例分配，剩余 10% 分配至 ILP 储备。参与者随即成为流动性提供者，其存入的资产和 $CACAO 代币被置入 Maya 的 pool，使其能够赚取所产生手续费的一部分。

### 不同的储备处理方式

在 Maya Protocol 创世时，可用的 CACAO 储备仅占总供应量的 10%，而 THORChain 为 44%，且主要用于无常损失保护（ILP）。Maya 没有区块 [block] 发行；如果实施协议拥有的流动性和借贷，它们将采用不同设计，因为在 THORChain 中，这些方面与储备紧密结合。

尽管存在这些差异，Maya 仍可作为 THORChain 的补充解决方案，提供冗余、扩展和验证，并整合当前 THORChain 实现中尚不存在的新网络。

此外，Maya 的目标是成为供其他服务构建的 *后端*，希望看到大量构建于 Maya 基础设施之上的新 *前端* 或 DEX 服务。

## Maya Protocol 钱包集成

作为一个 *后端*，Maya 需要获得不同 UI 和钱包的支持才能使用。
以下是一些已支持 Maya 的服务：

[THORWallet DEX](https://www.thorwallet.org/)：Ledger、XDEFI、MetaMask、Keystore

El Dorado：已不再在线，其域名无法解析。

[CacaoSwap](https://cacaoswap.app/)：Keystore、MetaMask、XDEFI、Keplr、Leap

[Asgardex](https://www.asgardex.com/)：Keystore、Ledger

DefiSpot：已不再在线，其域名无法解析。

[Ctrl Wallet（XDEFI）](https://ctrl.xyz/)：一款支持 30 多条原生 blockchain、所有 EVM 链和 Cosmos 链的多生态系统自托管钱包，支持 Bitcoin、Ethereum、Solana、THORChain、Maya Protocol、TRON 等。

[KeepKey ](https://keepkey.com/)：一款用于安全存储数字资产的硬件钱包 [hardware wallet]。

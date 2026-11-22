# Penumbra 

Penumbra 是 Cosmos 生态系统中的一个完全屏蔽[fully shielded]、权益证明[proof-of-stake] Layer 1 网络和去中心化[decentralized]交易所[exchange]。其跨链屏蔽池[shielded pool]可持有来自 IBC 连接链的资产。用户可以在 Penumbra 内转移、质押[staking]、兑换[swap]和提供流动性，而无需公开其个人账户余额或将这些操作与其身份关联。这并不意味着每一项网络或 DEX 数据都是私密的。

![image.png](/content-images/_unavailable.svg)

## Penumbra IBC 中使用的技术 

IBC 集成：跨区块链通信（IBC）协议将 Penumbra 连接至其他支持 IBC 的链[chain]。入站 IBC 转移会在资金进入 Penumbra 时将其屏蔽；出站转移会在资金离开时解除屏蔽。透明[transparent]对手方链上的活动仍然公开，包括入站存款的目标地址[address]。[隐私[privacy]边界遵循 IBC 边界](https://guide.penumbra.zone/overview/interchain-privacy)。

零知识[zero-knowledge]证明[proof]（ZKP）：Penumbra 使用客户端零知识证明来表明加密[encryption]状态更新有效，而无需公开用户的私密交易[transaction]数据。钱包[wallet]会在本地扫描并解密其可见的数据；公共节点[node]无法直接返回用户的私密余额。

![image.png](/content-images/_unavailable.svg)

具有隐私的去中心化交易所：Penumbra 包含一个用于在其屏蔽 pool 内交易资产的 DEX。单笔兑换输出是私密的，而批量执行结果和匿名流动性头寸是公开的。在描述该交易所隐藏的内容时，这些区别至关重要。

## 用例[Use Cases]

安全交易：Penumbra 的屏蔽 pool 内的转移会保护发送方、接收方、金额和资产类型。用户可以选择性地向获授权的第三方披露活动。仅分享接收地址不会暴露其所有者的余额。这些属性不适用于资金提取后在另一条链上的公开活动。

质押：Penumbra 的原生质押代币[token]是 **UM**。将 UM 委托给验证者会返回代表该验证者委托 pool 份额的委托代币。每个验证者 pool 中的总质押量是公开的，而个人委托是匿名的。取消委托会首先创建验证者专属的解绑代币，在解绑延迟结束前，它们仍会受到削减的影响。请参阅官方 [屏蔽质押指南](https://guide.penumbra.zone/overview/staking)。

代币兑换：兑换意图会按交易对分组，并在每个区块[block]结束时批量执行。这消除了区块内兑换意图排序作为交易者杠杆的作用；这是一种特定机制，并不保证任何形式的 MEV 都不会存在。批量结果会写入公开链状态，用户会私下将其所得份额领取至屏蔽 pool。[DEX 指南](https://guide.penumbra.zone/overview/dex)介绍了批量执行和该协议的自动套利。

做市：流动性提供者会创建匿名的集中流动性头寸。这些头寸的流动性和交易功能是公开的，但不会与提供者的身份关联。

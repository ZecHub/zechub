# Zcash Testnet

## 什么是 Zcash Testnet？

**Zcash Testnet** 是与真实 Zcash 主网络（Mainnet）并行运行的一条区块链，它完整复现了相同的协议、规则和交易逻辑——但有两个关键区别：

1. **币没有真实货币价值**——它们叫做 **TAZ**，而不是 ZEC，仅用于测试。  
2. **网络升级、工具和软件都会先在这里测试**，然后才部署到真实的 Zcash 区块链上。  

换句话说，Testnet 就像一个**沙盒或实验环境**，开发者、审计人员和构建者可以在不冒真实资金风险的情况下尝试各种想法。


## 为什么需要 Testnet？

Testnet 对区块链开发至关重要，因为**像 Zcash 这样的真实区块链是不可变的**——一旦交易在主网上被确认，就无法撤销。Testnet 提供了一个**安全的副本**，可在部署到 Mainnet 之前用于实验、测试和调试功能。

### Testnet 的用途

#### 1. 软件开发与集成

开发钱包、交易所、挖矿软件或隐私工具的开发者可以安全地在 Testnet 上测试它们。能力包括：

- 发送和接收交易  
- 使用零价值的 TAZ 币挖出新区块  
- 构建用户界面和 API  
- 测试交易隐私功能（透明 vs 屏蔽）  

**示例：**  
像 [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) 这样的工具会使用 Testnet 来生成交易，并测试 Zcash 屏蔽资产功能。  

**真实场景：**  
钱包开发者可以将软件连接到 Testnet RPC 端点，并模拟完整生命周期——创建地址、发送屏蔽交易、验证余额——然后再在 Mainnet 上线。

#### 2. 测试网络升级

Zcash 会定期升级其核心协议（例如 Nu5、Nu6）。新升级会在 Mainnet 之前先在 Testnet 激活，以便开发者和社区发现并修复漏洞。

**示例：**  
新的共识规则或交易类型会先推送到 Testnet。测试成功后，它会在预定的区块高度于 Mainnet 激活。

#### 3. 测试节点实现

Zcash 支持多个节点软件实现——`zcashd` 和 **Zebra**（由 Zcash Foundation 维护的 Rust 节点）。Testnet 使得在没有资金风险的真实条件下测试节点成为可能。  

节点开发者可以：

- 验证区块传播  
- 测试 RPC 接口  
- 观察节点在负载下的行为  
- 测试与挖矿软件的交互  

#### 4. 学习与教育

初学者可以学习 Zcash 的各种功能，例如挖矿、创建屏蔽交易以及使用 Unified Address。  
社区教程和文档提供了对 **Testnet 水龙头、浏览器和指南** 的访问。


## Testnet 的实际使用场景

### 1. 开发者测试（钱包 / 应用）

- 连接到 Zcash Testnet  
- 从水龙头申请 TAZ  
- 发送屏蔽交易  
- 验证隐私性和 UI 稳定性  

即使发生错误，也不会损失真实 ZEC。

### 2. 交易所集成测试

- 运行一个 Testnet 节点  
- 使用 Zebrad JSON-RPC 端点处理交易  
- 测试自动存款/提款逻辑  

可确保生产代码安全，并防止资金损失。

### 3. 挖矿配置试验

- 使用挖矿模板  
- 测试区块验证  
- 观察挖矿奖励（仅 TAZ）  
- 调整挖矿性能  

可避免迁移到 Mainnet 时出现停机或收益损失。

### 4. 学术 / 协议研究

研究人员可以使用 Testnet 测试诸如**无状态验证**、**零知识证明优化**或其他协议实验等创新。  
高级用户还可以运行**自定义 Testnet 或 regtest 环境**来进行专门实验。


## Mainnet 与 Testnet 的关键区别

| Feature               | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| 币的价值              | 真实 ZEC         | TAZ（无货币价值）        |
| 风险                  | 资金风险         | 适合安全测试             |
| 协议升级              | 生产环境         | 提前激活                 |
| 挖矿奖励              | 真实发行         | 仅测试奖励               |
| 网络用途              | 实时交易         | 测试与开发               |

## 常见误解

- **Testnet 币是有价值的** -> 错，TAZ 没有价值。  
- **丢失 Testnet 币很重要** -> 错，不会损失真实价值。  
- **Testnet 和 Mainnet 完全相同** -> 错，Testnet 会经常重置，而且不像 Mainnet 那样有经济安全保障。

---

## 什么是 TAZ？

**TAZ** 是 Zcash 币在 Testnet 上的版本：  

- 不是真实货币；不能兑换为 ZEC 或法币  
- 用于测试、开发和学习  
- 遵循所有 Zcash 规则：可以发送、挖矿，也可以用于屏蔽地址  

**示例：**  
开发者可以将 100 TAZ 从一个 Testnet 地址发送到另一个地址，以测试钱包功能，而无需冒真实 ZEC 的风险。  

你可以把 TAZ 理解为 **Zcash Testnet 上的“游戏币”**。


## 什么是水龙头？

**水龙头（faucet）** 是一种免费发放 TAZ 测试币的服务：

- 通常是网站或 API  
- 用户提供一个 Testnet 地址；水龙头会发送少量 TAZ  
- 无需手动挖矿即可获得 TAZ  

**示例：**  
1. 访问一个 Testnet 水龙头（例如 [testnet.zecfaucet.com](https://testnet.zecfaucet.com) | [fauzec.com](https://fauzec.com/)）  
2. 输入你的 Testnet 地址  
3. 申请 TAZ  
4. 立即收到 TAZ，开始测试  

**为什么这很重要：**  
- 可在不冒 ZEC 风险的情况下安全测试  
- 方便初学者和开发者使用  
- 有助于钱包、交易所和应用快速原型开发



## Zkool 和 Zingo! 钱包

### Zkool

- 面向高级 Zcash 用户的多账户钱包  
- 支持助记词、Viewing Key、透明地址和屏蔽地址  
- 可通过全节点或 lightwallet 服务器连接到 Mainnet、Testnet 或 Regtest

### Zingo!

- 专注于隐私和易用性的移动钱包  
- 支持屏蔽地址和统一地址  
- 已更新以支持 Testnet 协议（包括 NU6 Testnet）

## 在钱包中启用 Testnet

### Zkool Wallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**提示：**  
- 切换网络时，钱包可能会重启  
- Mainnet ZEC 账户不会受到影响  
- 如果出现提示，请使用 Testnet lightwallet 服务器

### Zingo! Wallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


启用后，钱包即可发送和接收 TAZ、测试屏蔽交易，并安全地进行各种实验。


## 启用 Testnet 之后

- 交易行为与 Mainnet 类似，但使用的是**零价值 TAZ**  
- 可以测试屏蔽交易、多地址和隐私功能  
- 开发者可以在不冒真实 ZEC 风险的情况下调试和测试功能


## 快速总结

- **Zcash Testnet** 是一个安全的沙盒环境，用于构建、测试和实验  
- 使用场景包括：开发者测试、节点测试、交易所集成、研究和教育  
- 使用的是 **TAZ 币** 而非 ZEC，且没有真实价值  
- 在将功能部署到 Mainnet 之前，Testnet 是必不可少的

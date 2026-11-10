# Zcash 测试网 [Testnet]

## 什么是 Zcash 测试网？

**Zcash 测试网** 是与真实的 Zcash 主网 [Mainnet] 并行运行的 blockchain，它复现了完全相同的协议、规则和交易 [transaction] 逻辑，但有两个关键区别：

1. **币没有真实的货币价值** - 它们称为 **TAZ**，而不是 ZEC，且仅用于测试。  
2. **网络升级 [network upgrade]、工具 [tools] 和软件会先在这里进行测试**，然后才部署到真实的 Zcash blockchain。  

换句话说，测试网就像一个**沙盒或实验环境**，开发者 [developer]、审计人员和构建者可以在不冒真实资金风险的情况下尝试各种想法。


## 为什么测试网存在？

测试网对 blockchain 开发至关重要，因为**像 Zcash 这样的真实 blockchain 是不可变的** - 一旦交易在主网上确认，就无法撤销。测试网提供了一个**安全的副本**，可在部署到主网之前进行实验、测试和调试功能。

### 测试网的用途

#### 1. 软件开发与集成

构建钱包 [wallet]、交易所 [exchange]、挖矿 [mining] 软件或隐私 [privacy] 工具的开发者可以在测试网上安全地测试它们。功能包括：

- 发送和接收交易  
- 使用无价值的 TAZ 币挖出新的区块 [block]  
- 构建用户界面和 API  
- 测试交易隐私功能（透明 [transparent] 与屏蔽 [shielded]）  

**示例：**  
诸如 [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) 的工具使用测试网生成交易，并测试 Zcash 屏蔽资产功能。  

**现实场景：**  
钱包开发者可以将软件连接到测试网 RPC 端点，并模拟完整生命周期 - 创建地址 [address]、发送屏蔽交易以及验证余额 - 然后再在主网上线。

#### 2. 测试网络升级

Zcash 会定期升级其核心协议（例如 NU6.1、NU6.2 和 Ironwood）。测试网会在**主网之前**激活新的升级，使开发者和社区能够识别并修复错误。

**示例：**  
新的共识 [consensus] 规则或交易类型会先推送到测试网。成功测试后，它会在预定的区块高度于主网上激活。

#### 3. 测试节点实现

Zcash 维护的节点 [node] 是 **Zebra**（由 Zcash Foundation 维护的基于 Rust 的节点），维护的钱包是 [Zallet](https://github.com/zcash/zallet)。原始节点实现 `zcashd` 于 2026 年 7 月 18 日达到自动停止支持的终止日期，现已不再维护 - 请参阅从 [zcashd 到 Zebra 的 Zallet 迁移指南](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet)。测试网可在没有资金风险的情况下，在真实条件下测试节点。

节点开发者可以：

- 验证区块传播  
- 测试 RPC 接口  
- 观察节点在负载下的行为  
- 测试与挖矿软件的交互  

#### 4. 学习与教育

初学者可以学习 Zcash 的功能，例如挖矿、创建屏蔽交易以及使用统一地址。  
社区教程和文档提供了对**测试网水龙头 [faucet]、浏览器和指南**的访问。


## 真实测试网用例 [use case]

### 1. 开发者测试（钱包 / 应用）

- 连接到 Zcash 测试网  
- 从水龙头请求 TAZ  
- 发送屏蔽交易  
- 验证隐私和 UI 稳定性  

即使发生错误，也不会损失真实的 ZEC。

### 2. 交易所集成测试

- 运行测试网节点  
- 使用 Zebrad JSON-RPC 端点处理交易  
- 测试自动存款/提款逻辑  

确保生产代码安全并防止资金损失。

### 3. 挖矿设置试验

- 使用挖矿模板  
- 测试区块验证  
- 观察挖矿奖励（仅 TAZ）  
- 调整挖矿性能  

在迁移到主网时避免停机或收益损失。

### 4. 学术 / 协议研究

研究人员可以使用测试网测试诸如**无状态验证**、**零知识 [zero-knowledge] 证明 [proof] 优化**或其他协议实验等创新。  
高级用户还可以运行**自定义测试网或 regtest 环境**进行专门实验。


## 主网与测试网之间的主要区别

| 功能               | 主网           | 测试网                  |
|-----------------------|-----------------|--------------------------|
| 币的价值        | 真实 ZEC         | TAZ（无货币价值）  |
| 风险                  | 资金风险   | 适合测试         |
| 协议升级     | 生产环境       | 提前激活         |
| 挖矿奖励        | 真实发行    | 仅测试奖励         |
| 网络用途       | 实时交易| 测试与开发  |

## 常见误解

- **测试网币有价值** -> 错误，TAZ 的价值为零。  
- **丢失测试网币很重要** -> 错误，不会损失真实价值。  
- **测试网和主网完全相同** -> 错误，测试网经常重置，且不像主网那样拥有经济安全保障。

---

## 什么是 TAZ？

**TAZ** 是 Zcash 币的测试网版本：  

- 不是真实货币；无法兑换为 ZEC 或法定货币  
- 用于测试、开发和学习  
- 遵循所有 Zcash 规则：可以发送、挖出并用于屏蔽地址  

**示例：**  
开发者可以从一个测试网地址向另一个地址发送 100 TAZ，以测试钱包功能而不冒真实 ZEC 的风险。  

将 TAZ 视为用于 Zcash 测试网的**"游戏币"**。


## 什么是水龙头？

**水龙头** 是一种免费提供 TAZ 币用于测试的服务：

- 通常是网站或 API  
- 用户提供测试网地址；水龙头会发送少量 TAZ  
- 无需手动挖取 TAZ  

**示例：**  
1. 访问测试网水龙头（例如 [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/)）  
2. 输入你的测试网地址  
3. 请求 TAZ  
4. 立即收到 TAZ 以开始测试  

**为什么这很重要：**  
- 无需冒 ZEC 风险即可安全测试  
- 为初学者和开发者提供可访问性  
- 支持钱包、交易所和应用的快速原型开发  



## Zkool 和 Zingo! 钱包

### Zkool

- 面向高级 Zcash 用户的多账户钱包  
- 支持助记词 [seed phrase]、viewing key、透明和屏蔽地址  
- 可通过全节点 [full node] 或 lightwallet 服务器连接到主网、测试网或 Regtest

### Zingo!

- 专注于隐私和简洁性的移动钱包  
- 支持屏蔽地址和统一地址  
- 已更新以支持测试网协议（包括 NU6 测试网）

## 在钱包中启用测试网

### Zkool 钱包

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
- 主网 ZEC 账户不会受到影响  
- 如有提示，请使用测试网 lightwallet 服务器

### Zingo! 钱包

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


启用后，钱包可以发送和接收 TAZ、测试屏蔽交易，并安全地进行实验。


## 启用测试网后

- 交易的行为与主网相同，但使用**无价值的 TAZ**  
- 可以测试屏蔽交易、多个地址和隐私功能  
- 开发者可以在不冒真实 ZEC 风险的情况下调试和测试功能


## 快速总结

- **Zcash 测试网** 是用于构建、测试和实验的安全沙盒环境  
- 用例：开发者测试、节点测试、交易所集成、研究和教育  
- 使用 **TAZ 币** 替代 ZEC，且其没有真实价值  
- 在将功能部署到主网之前，测试网必不可少

---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Privacy_and_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

![Namada Logo](/content-images/nam-078c7b6883.webp)

# Namada 隐私[Privacy]最佳实践

> 用于在 Namada 上实现最大隐私的实用、可操作指南——并准确了解其保护的边界所在。

**隐私是一项基本权利。** Namada 专为通过先进的零知识[zero-knowledge]密码学保护这一权利而打造。本指南提炼了注重隐私的用户和开发者所采用的最有效实践。

---

## Namada 如何保护您的隐私

Namada 是一个以隐私为先的主权 blockchain，可使用 **零知识证明[zero-knowledge proofs] (zk-SNARKs)** 隐藏钱包[wallet]地址[addresses]、交易[transaction]金额和余额。

### 核心隐私功能

- **屏蔽交易[Shielded Transactions]** - 完全隐藏发送方、接收方和金额。
- **多资产屏蔽池[Multi-Asset Shielded Pool] (MASP)** - 跨任意资产进行私密转账、兑换[swaps]和桥接。
- **跨链隐私[Cross-Chain Privacy]** - 通过 IBC 进行屏蔽桥接（Ethereum 和 Solana 支持即将推出）。
- **屏蔽收益奖励[Shielded Yield Rewards]** - 只需屏蔽交易即可赚取 NAM 代币[token]。
- **低手续费[Low Fees]** - 在不牺牲易用性的前提下提供强大的隐私保护。

---

## 重要限制

即使是最强的链上[on-chain]隐私，也可能因用户行为或链下因素而被削弱。

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada 不保护您免受以下情况影响：**

- 未使用 VPN 或 Tor 进行连接（您的 IP 地址会暴露）
- 重复使用屏蔽地址
- 执行透明[transparent]（未屏蔽）交易
- 将您的 Namada 地址与社交媒体或现实身份关联
- 使用中心化 KYC 交易所进行存款或提款

</div>

---

## 实现最大隐私的最佳实践

### 1. 一般原则
- 所有操作默认使用 **屏蔽交易**。
- 切勿为不同目的重复使用屏蔽地址。
- 避免在同一会话中混合屏蔽和透明活动。

### 2. 桥接资产
- 仅为传入桥接使用专用透明地址。
- 桥接转入后立即屏蔽资产。
- 尽可能减少从 Namada 桥接转出。

### 3. MASP（多资产屏蔽池）
- 默认将所有资产保留在 MASP 内。
- 将您的 MASP 余额视为主要的私密钱包。

### 4. View Keys
- 仅与您完全信任的各方分享 viewing key。
- 切勿公开发布或张贴 viewing key。

### 5. 交易卫生
- 随机安排交易之间的时间和金额。
- 尽可能批量处理多笔交易。
- 避免发送整数或高度可识别的金额。

### 6. 操作安全
- 与钱包或 dApps 交互时始终使用 **VPN**（最好是 Tor）。
- 切勿分享包含地址或余额的截图。
- 为不同活动使用不同的钱包（交易、捐赠、个人使用）。

---

## 扩展隐私检查清单

1. **始终先屏蔽** - 交易前将资产转入 MASP。
2. 定期**轮换屏蔽地址**，用于不同用例[use cases]。
3. 在可能的情况下，从交易所**直接提取至屏蔽地址**。
4. **变更交易时间**以打破可识别的模式。
5. 对较大持仓使用**硬件钱包[hardware wallets]**。
6. **保持软件更新** - 始终运行最新的 Namada 客户端。
7. 使用强大的加密[encryption]和密码管理器保护您的设备。
8. 对聊天或公开日志中的元数据泄露保持极高警惕。

---

## 贡献

您有额外的最佳实践或反馈吗？  
[加入 Discord](https://discord.gg/srC76aE6) 上的讨论

---
*最后更新：2026 年 3 月*

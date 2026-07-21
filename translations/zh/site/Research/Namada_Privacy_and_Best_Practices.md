---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

![Namada 标志](https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/nam.png)

# Namada 隐私最佳实践

> 关于如何在 Namada 上实现最大化隐私，以及准确理解其保护边界的实用、可操作指南。

**隐私是一项基本权利。** Namada 从设计之初就是为通过先进的零知识密码学来保护隐私而构建的。本指南提炼了注重隐私的用户和开发者所采用的最有效实践。

---

## Namada 如何保护你的隐私

Namada 是一条主权的、以隐私为先的区块链，使用**零知识证明（zk-SNARKs）**来隐藏钱包地址、交易金额和余额。

### 核心隐私功能

- **Shielded Transactions** - 完全隐藏发送方、接收方和金额。
- **Multi-Asset Shielded Pool (MASP)** - 支持任意资产的私密转账、兑换和跨链桥接。
- **Cross-Chain Privacy** - 通过 IBC 实现屏蔽式跨链桥接（即将支持 Ethereum 和 Solana）。
- **Shielded Yield Rewards** - 只需进行屏蔽交易即可赚取 NAM 代币。
- **Low Fees** - 在不牺牲可用性的前提下提供强隐私保护。

---

## 重要限制

即使是最强的链上隐私，也可能因用户行为或链下因素而被削弱。

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada 不保护以下情况：**

- 在未使用 VPN 或 Tor 的情况下连接（你的 IP 地址会暴露）
- 反复重复使用屏蔽地址
- 进行透明（未屏蔽）交易
- 将你的 Namada 地址与社交媒体或现实身份关联
- 使用中心化 KYC 交易所进行充值或提现

</div>

---

## 实现最大隐私的最佳实践

### 1. 一般原则
- 所有操作默认使用**屏蔽交易**。
- 不要将同一个屏蔽地址重复用于不同用途。
- 避免在同一会话中混合进行屏蔽和透明活动。

### 2. 资产桥接
- 仅为转入桥接资产使用一个专用透明地址。
- 资产桥接进入后立即进行屏蔽。
- 如无必要，尽量减少将资产从 Namada 桥接转出。

### 3. MASP (Multi-Asset Shielded Pool)
- 默认将所有资产保留在 MASP 内。
- 将你的 MASP 余额视为主要的私密钱包。

### 4. View Keys
- 仅与您完全信任的对象共享 viewing keys。
- 绝不要公开发布或张贴 viewing keys。

### 5. 交易卫生
- 在交易之间随机化时间和金额。
- 在可能的情况下将多笔交易打包处理。
- 避免发送整数额或高度可识别的金额。

### 6. 操作安全
- 与钱包或 dApps 交互时始终使用 **VPN**（理想情况下配合 Tor）。
- 不要分享包含地址或余额的截图。
- 为不同活动使用不同钱包（交易、捐赠、个人使用）。

---

## 扩展隐私检查清单

1. **始终先进行屏蔽** - 在交易前先将资产转入 MASP。
2. **定期轮换屏蔽地址**，用于不同使用场景。
3. **尽可能直接提现到屏蔽地址**。
4. **改变交易时间**，打破可识别的模式。
5. **使用硬件钱包**来保管较大金额资产。
6. **保持软件更新** - 始终运行最新的 Namada 客户端。
7. **保护你的设备安全**，使用强加密和密码管理器。
8. **对元数据泄露保持极度谨慎**，尤其是在聊天或公开日志中。

---

## 参与贡献

有更多最佳实践或反馈意见？  
[加入 Discord 上的讨论](https://discord.gg/srC76aE6)

---
*最后更新：2026 年 3 月*

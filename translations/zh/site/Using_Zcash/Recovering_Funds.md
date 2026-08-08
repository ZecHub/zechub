---
<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 钱包资金恢复

**为什么要保留你的私钥？**

私钥是你数字资产安全的核心。妥善保管私钥，并且绝不与第三方分享，这一点至关重要。

> 在这里，**助记词**可以被视为等同于私钥的存在。

只要你始终掌控自己的私钥，就始终可以进行恢复。Zcash 私钥有 2 种类型（透明和屏蔽），你可以轻松将它们导入你的钱包，无论是使用 Sweep Funds 功能，还是将它们作为新账户导入。通过始终掌控你的私钥，你就始终完全掌控自己的资产，确保所有权、安全性以及内心的安稳。

# 安全与责任

用户必须了解处理私钥所涉及的风险，并确保这些密钥不被未授权访问，这一点极其重要。资金的安全取决于用户是否负责地保护好自己的私钥。

> **开始之前：** 过去的恢复指南通常会指向 Ywallet。其开发者已确认，它不会为 Ironwood（NU6.3）网络升级进行更新，因此它已无法继续跟随链。请使用 **Zkool**，它出自同一位开发者之手，并且是目前仍在维护的继任者。请参见本页底部的[Ywallet 已不再维护](#ywallet-is-no-longer-maintained)。

## 使用 Zkool 恢复资金

[Zkool](https://github.com/hhanh00/zkool2/releases) 是 Ywallet 的继任者，来自同一位开发者，并且同时支持透明和屏蔽恢复。

这里涵盖两种情况：

1. 通过助记词、私钥或 viewing key **恢复账户**
2. 从一个仅支持透明地址的钱包中 **sweep 资金**

### 1) 恢复账户

1. 从[发布页面](https://github.com/hhanh00/zkool2/releases)安装 Zkool 并打开它
2. 在 **Account Manager**（主页面）中，点击 **+** 按钮进入 **New Account** 界面
3. 输入一个 **Account Name** 来标识这个账户
4. 打开 **Restore Account?**。这样会显示密钥和 birth height 字段
5. 将你的密钥粘贴到 **Key (Seed Phrase, Private Key, or Viewing Key)** 中。Zkool 接受助记词、Sapling secret key、透明 extended key，或 viewing key
6. 如果你大致知道钱包第一次使用的时间，请输入一个 **Birth Height**。这会告诉 Zkool 从哪里开始扫描，从而节省大量时间

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

> **不知道 birth height？** 留空并确认警告即可。Zkool 会从链的起点开始扫描，虽然会更慢，但不会漏掉任何内容。如果你的资金早于 2018 年 10 月 Sapling 升级，请保持留空，而不是猜一个更晚的高度，否则扫描可能会完全跳过你的交易。

7. 保存账户，然后进行同步

### 从其他钱包恢复助记词

如果这个助记词来自另一个钱包，而同步后显示的余额不正确，通常是因为 change address 派生方式不同。

请在同一个 New Account 界面更下方打开 **Advanced Options** 开关，并在保存前打开 **Use Internal Change**。

不同钱包派生 change address 的方式并不完全相同。如果在没有开启这个设置的情况下将 ZODL 的助记词恢复到 Zkool 中，显示的余额可能会缺少你的 change notes，这看起来像是资金丢失，但其实并不是。Zkool 对这个开关的提示文字仍然提到 Zashi，因为那是 ZODL 以前的名字。

在 **Advanced Options** 下还有另外两个字段：

- **Extra Passphrase (optional)**，仅当原钱包使用过时才填写
- **Account Index**，如果原钱包在同一个助记词下包含多个账户，资金可能位于不同的索引下

> **只有当 Key 字段中填入有效助记词后，这两个字段才会出现。** 当该字段为空，或其中放的是私钥或 viewing key 时，Zkool 只会显示 **Use Internal Change** 和 **H/W Ledger**。请先粘贴助记词，再打开 Advanced Options。

### 2) 从仅支持透明地址的钱包中 Sweep 资金

如果你的资金在一个从未支持屏蔽地址的钱包中（如 Trust、Coinomi、Guarda 及类似钱包），请先恢复账户，然后再把资金转入屏蔽池中。

1. 按照上面的步骤恢复账户
2. 打开该账户并进入 **Receive Funds** 页面
3. 点击顶部栏中的放大镜（**Find other transparent addresses**）。像 Ledger 和 Exodus 这类会轮换地址的钱包，会从同一个助记词生成多个透明地址，这个功能可以找出其中持有资金的地址
4. **之后重置并重新同步账户。** 新找到的地址要在下一次扫描时才会更新其余额，所以如果跳过这一步，看起来就会像 sweep 什么也没找到
5. 进入 **Send** 页面。在余额附近你会看到三个图标按钮。它们没有文字标签，因此请悬停或长按来查看它们的名称：
   - **Shield One**（描边盾牌）每次移动一个透明地址中的资金
   - **Shield All**（实心盾牌）一次性将所有透明地址中的全部资金都移动
   - **Unshield All**（打开的挂锁）则反向操作，把资金转入透明地址

> **Shield One 是更具隐私性的选择。** 在一笔交易中为多个地址加盾，会公开地将这些地址关联为属于同一个人。Zkool 在执行 Shield All 之前也会就这一点发出警告。

6. 检查交易并发送

当你向只接受透明地址的交易所提款时，Unshield All 会很有用。只有当账户有屏蔽地址时，屏蔽按钮才会出现；而 Unshield All 只有在账户有透明地址时才会出现。

## 已恢复资金与 Ironwood 池

自 2026 年 7 月 28 日 Ironwood（NU6.3）升级激活以来，Orchard 池已变为仅可支出。新的价值不能再进入其中，而现有价值会通过 turnstile 离开并进入 Ironwood。

如果你恢复出来的资金位于 Orchard 中，那么在它们恢复正常行为之前，需要先进行迁移。打开账户菜单并选择 **Note Migration**。只有在确实存在可迁移内容时，这个选项才会显示。

该界面的标题为 **Orchard to Ironwood Migration**，并分两个阶段运行。首先，它会把非标准 notes 拆分成标准面额；然后，它会逐个移动这些 notes。**Migration Speed** 是一个从 Ultra Fast 到 Slow 的滑块，用于设置各步骤之间的随机延迟。**Start Migration** 会在后台运行这个分阶段流程，你可以关闭页面并稍后继续。**One Shot** 则会一次性完成整个过程。

每一步都是一笔独立交易，因此每一步都需要支付一笔手续费。

> **迁移金额是公开的。** 当价值穿过 turnstile 时，金额和区块高度都会在链上可见，尽管发送方和接收方仍然是屏蔽的。具有明显特征的金额可能暴露你的身份，因此相比 one shot，更建议使用较慢速度的分阶段迁移；同时，也建议先通过 Tor 或 VPN 路由你的连接，以免你的 IP 地址与你迁移的金额产生关联。

## 使用 ZExCavator 进行深度恢复

[ZExCavator](https://github.com/zingolabs/zexcavator) 是 Zingo Labs 推出的恢复工具，适用于常规恢复无效的情况，例如钱包文件损坏或仅剩部分内容的情况。

> 它的最后一次更新早于最近的网络升级，因此请将其视为最后手段，并在依赖恢复结果之前，先在仍受维护的钱包中验证所有恢复出的密钥。

## Ywallet 已不再维护

Ywallet 曾长期是本页面推荐的恢复工具，许多较旧的指南现在仍然指向它。

其开发者已确认不会为 Ironwood 提供更新。不支持当前共识规则的钱包无法构建有效交易，因此它已不能再用于移动恢复出的资金。由同一位开发者开发的 **Zkool** 是目前仍在维护的继任者，这也是本页面现在使用的工具。

如果你已有资金仍保留在 Ywallet 中，请按照上面的步骤，将同一个助记词恢复到 Zkool 中。

## 相关页面

- [钱包](/using-zcash/wallets) - 哪些钱包仍在维护，以及它们对 Ironwood 的准备情况
- [Ironwood](/zcash-tech/ironwood) - 此次升级带来了哪些变化，以及为什么资金需要迁移
- [备注](/using-zcash/memos) - 加密 memo 的工作方式
- [Viewing Keys](/zcash-tech/viewing-keys) - 不具备支出权限的只读访问

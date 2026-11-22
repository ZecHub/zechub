<a href="https://github.com/zechub/zechub/edit/main/site/guides/Ledger_Shielded_ZEC.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ledger 隐蔽 ZEC 用户指南

> 使用您的 Ledger 硬件钱包，在 Ledger Wallet Desktop 中持有、接收和发送私密（private）的屏蔽 ZEC。

## 摘要 [TL;DR]

* 自 2026 年 9 月 23 日起，Ledger Wallet Desktop 支持屏蔽 [shielded] ZEC。一个 Zcash 账户在透明余额之外，还在 Ironwood pool 中拥有私密余额。
* 目前仅支持桌面端。移动端支持已宣布为“即将推出”。
* 您需要 Nano S Plus、Nano X、Stax 或 Flex（不包括原始 Nano S）、Ledger Wallet Desktop 4.21+ 以及最新的 Zcash 应用。
* 点击一次 **启用屏蔽**：您的 Ledger 会导出 viewing key，以便桌面应用找到您的私密资金。花费密钥绝不会离开设备。
* 尽可能接收至私密地址（u1...）。将 ZEC 从透明余额转入私密余额可行，但会将两者关联起来。
* 每次发送都会在 Ledger 屏幕上进行审核和签名。请逐个字符检查其中的地址。

## 核心说明 [Core Explanation]

Zcash 有两种余额。透明（Transparent）ZEC（t1 地址）的运作方式类似 Bitcoin：金额和地址均公开可见。屏蔽（Shielded）ZEC 位于屏蔽池中，其中发送方、接收方和金额均在链上加密。

Ledger 将您的花费密钥 [spending keys] 保存在硬件设备 [hardware device] 上。要显示私密余额 [private balance]，Ledger Wallet Desktop 需要一个 Unified Full Viewing Key (UFVK)。该设备会将其导出一次，桌面应用会用它扫描 blockchain 以查找您的屏蔽 note [shielded notes]。您的 viewing key 可以查看您的屏蔽历史记录，但不能花费资金，因此请将其视为私密信息 [private information]。

以下步骤涵盖安装 Zcash 应用（app）、添加账户（account）、启用私密余额（private balance）、接收、屏蔽透明 ZEC，以及从私密余额发送。

## 概述 [Overview]

2026 年 9 月 23 日，Ledger 在 Ledger Wallet Desktop 中添加了原生隐蔽 ZEC 支持。一个 Zcash 账户现在同时持有透明余额和 Zcash Ironwood 池中的私密余额。您的私钥保存在 Ledger 设备上，每笔交易都在设备上审核和签名。

**仅限桌面端。** Ledger 的公告称隐蔽 ZEC "仅在 Ledger Wallet Desktop 上可用。移动端支持目前不可用，但即将推出。" 桌面应用程序显示相同的提示。检查日期为 2026 年 10 月 15 日。

## 准备工作

- 运行 Zcash 应用的 Ledger 设备：Nano S Plus、Nano X、Stax 或 Flex。当前的 Zcash 应用不支持原始 Nano S。
- Ledger Wallet Desktop 4.21 或更高版本，仅从 [ledger.com](https://www.ledger.com) 下载。本指南使用的是 4.24.0 版本。
- Ledger 上最新的 Zcash 应用（编写本指南时为 3.9.4）。
- 少量 ZEC 用于测试。以下每个步骤均在主网上使用 0.001 ZEC 完成。每笔交易收取少量网络费用（我们测试中为 0.00015 ZEC）。
- 您的 24 个助记词保存在纸上。切勿将其输入计算机或分享给他人。

## 分步指南（Ledger Wallet Desktop）

**1. 安装或更新 Zcash 应用**
- 打开 Ledger Wallet，连接并解锁您的 Ledger，然后打开 **My Ledger**。在设备上允许连接。
- 在应用目录中搜索 **Zcash**，然后点击 **Install**，或者如果已安装则点击 **Update**。
- 在 Ledger 上打开 Zcash 应用。屏幕显示 "Zcash app is ready"。向右滚动到 **App info** 查看版本。

**2. 添加 Zcash 账户**
- 在 Ledger Wallet 中，选择 **Add account**。在 **Select asset** 中搜索 Zcash 并选择 **Zcash (ZEC)**，不要选择包装代币如 Binance-Peg Zcash Token。
- 在 Ledger 上打开 Zcash 应用后，Ledger Wallet 会找到您的账户。在 **Select the accounts you want to add** 下勾选并点击 **Confirm**。
- 账户页面显示 **Available balance**、**Transparent balance** 和 **Private balance**，以及 **Enable shielded** 按钮。

![Ledger Wallet Desktop 中的 Zcash 账户，显示仅限桌面端的提示、透明和私密余额，以及 Enable shielded 按钮](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. 启用私密余额**
- 点击 **Enable shielded**。**Enable Zcash private balance** 窗口有四个步骤：Birthday、UFVK、Device 和 Confirmation。
- **Birthday：** 对于新账户，保持生日高度为今天的日期。仅在您确定账户曾接收过隐蔽 ZEC 时才勾选 "This account received shielded ZEC in the past"，因为从区块 0 开始扫描可能需要很长时间。
- **UFVK 和 Device：** Ledger Wallet 请求您的 Ledger 导出统一 Full Viewing Key（UFVK）。阅读设备上的屏幕并批准。如果看到 "Device connection lost"，请确保 Zcash 应用已打开，及时批准并点击 **Retry**。
- 当您看到 **UFVK successfully imported** 时，点击 **Start sync**。同步完成后，按钮变为带有 "Last sync" 时间的 **Update balance**。
- Viewing Key 保存在您的计算机上。它可以找到您的隐蔽资金但无法花费它们。

![Enable Zcash private balance 窗口，显示 UFVK 已成功导入和 Start sync 按钮](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. 接收 ZEC 并在 Ledger 上验证两个地址**
- 点击 **Receive** 并选择您的 Zcash 账户。Ledger Wallet 显示 **Address for Zcash 1**（透明地址，以 t1 开头）和 **Private address for Zcash 1**（以 u1 开头）。之前的地址仍然有效。
- 您的 Ledger 显示 "Verify Zcash addresses"、**Private address**（分两页显示），然后是 **Public Address**。在分享任一地址之前，将每个字符与屏幕进行比较，然后在设备上确认。
- 优先使用私密地址；仅在发送方不支持其他格式时使用透明地址。

![Ledger Wallet 接收窗口，显示 Zcash 1 的透明地址和私密地址](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger 设备屏幕：Verify Zcash addresses、分两页显示的 Private address，然后是 Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. 将透明 ZEC 转移到私密余额**
- 点击 **Send**。在 **Self transfer** 下，选择 **Send to private balance**。
- 输入金额或使用 25%、50%、75% 或 **Max**。检查网络费用，然后点击 **Review**。
- 在 Ledger 上，依次查看："Review transaction to send ZEC"、"Transfer from public to private address"、金额、分两页显示的输出地址、费用和过期高度。检查输出地址是否与步骤 4 中的私密地址匹配，然后在 **Sign transaction** 上同时按下两个按钮。
- Ledger Wallet 显示 **Transaction sent**。在交易详情中，类型显示为 **Private (Ironwood)**。
- Ledger Wallet 提示自转账会将您的隐蔽资金与公开地址关联。直接接收到私密地址可保持它们不关联。

![Ledger Wallet 中的 Send ZEC 窗口，带有 Self transfer 选项 Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger 设备审核屏幕，用于将 ZEC 从透明余额转移到私密地址，最后显示 Sign transaction 和 Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- 交易确认后，透明余额减少，私密余额增加。新的隐蔽资金显示为 "maturing"，直到它们有足够的确认次数可以花费。

![隐蔽后的 Zcash 账户：透明余额减少，私密余额增加并显示为 maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. 从私密余额发送 ZEC**
- 私密余额可花费后，点击 **Send** 并将 **Transfer from** 设置为 **Private balance**。
- 粘贴收件人地址并输入金额。您可以添加最多 512 字节的加密 **Memo (optional)**，只有收件人可以阅读。
- 在 Ledger 上审核收件人、金额和费用，然后在 **Sign transaction** 上同时按下两个按钮。

![Ledger Wallet 交易详情中从私密余额发送的交易](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## 注意事项

- Ledger 上的隐蔽 ZEC 目前仅限桌面端（检查日期为 2026 年 10 月 15 日）。
- Ledger Wallet 的私密余额使用 Ironwood 池。
- Ledger 表示您可以与税务顾问共享交易历史的只读访问权限。任何拥有您 Viewing Key 的人都可以看到您的隐蔽历史，因此请仅在有意时分享。
- 本指南中的设备屏幕使用 Ledger 的 Speculos 模拟器（Nano S Plus）捕获，运行 Zcash 应用 3.9.4，连接到 Zcash 主网上的 Ledger Wallet Desktop 4.24.0。物理 Ledger 运行相同的应用并显示相同的屏幕。

## 更多帮助

- [Ledger Wallet 新功能：原生隐蔽 Zcash 支持](https://www.ledger.com/blog-native-shielded-zcash-support)（Ledger 的公告）
- [Ledger 帮助中心](https://support.ledger.com)
- [ZecHub 钱包页面](/using-zcash/wallets)
- ZecHub 上的[Shielded Pools](/using-zcash/shielded-pools)和[Viewing Keys](/zcash-tech/viewing-keys)
- 另一个硬件钱包选择：[Keystone Zashi 用户指南](/guides/keystone-zashi)

# Ledger Shielded ZEC 用户指南

2026 年 9 月 23 日，Ledger 为 Ledger Wallet Desktop 添加了原生 Shielded ZEC 支持。现在，一个 Zcash 账户可在 Zcash 的 Ironwood 池中同时持有透明余额和私密余额。你的私钥始终保留在 Ledger 上，每笔交易均在设备上审核并签名。

**仅限桌面版。** Ledger 的公告称，Shielded ZEC“仅在 Ledger Wallet Desktop 上可用。目前尚不支持移动端，但即将推出。”桌面应用也显示相同提示。于 2026 年 10 月 15 日核实。

## 准备工作

- 一台可运行 Zcash 应用的 Ledger 设备：Nano S Plus、Nano X、Stax 或 Flex。当前的 Zcash 应用并非为原始 Nano S 构建。
- Ledger Wallet Desktop 4.21 或更高版本，仅从 [ledger.com](https://www.ledger.com) 下载。本指南使用的是 4.24.0 版本。
- Ledger 上最新版的 Zcash 应用（本指南撰写时为 3.9.4）。
- 少量用于测试的 ZEC。以下每一步均在主网上使用 0.001 ZEC 完成。每笔交易均需支付少量网络手续费（我们的测试中为 0.00015 ZEC）。
- 将你的 24 个单词恢复短语保留在纸上。切勿将其输入电脑或分享给他人。

## 分步指南（Ledger Wallet Desktop）

**1. 安装或更新 Zcash 应用**
- 打开 Ledger Wallet，连接并解锁你的 Ledger，然后打开 **我的 Ledger**。在设备上允许连接。
- 在应用目录中搜索 **Zcash**，然后点击 **安装**；如已安装，则点击 **更新**。
- 在你的 Ledger 上打开 Zcash 应用。屏幕将显示“Zcash app is ready”。向右滚动至 **应用信息** 以查看版本。

**2. 添加 Zcash 账户**
- 在 Ledger Wallet 中选择 **添加账户**。在 **选择资产** 中搜索 Zcash，然后选择 **Zcash（ZEC）**，而非诸如 Binance-Peg Zcash Token 的封装代币。
- 在你的 Ledger 上打开 Zcash 应用后，Ledger Wallet 会找到你的账户。在 **选择要添加的账户** 下勾选它，然后点击 **确认**。
- 账户页面会显示 **可用余额**、**透明余额** 和 **私密余额**，以及一个 **启用 shielded** 按钮。

![Zcash account in Ledger Wallet Desktop showing the desktop-only notice, transparent and private balances, and the Enable shielded button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. 启用私密余额**
- 点击 **启用 shielded**。**启用 Zcash 私密余额** 窗口包含四个步骤：生日、UFVK、设备和确认。
- **生日：**对于新账户，请将生日区块高度保留为今天的日期。仅当你确定该账户过去曾收到 Shielded ZEC 时，才勾选“此账户过去曾收到 shielded ZEC”，因为从区块 0 开始扫描可能需要很长时间。
- **UFVK 和设备：**Ledger Wallet 会要求你的 Ledger 导出 Unified Full Viewing Key（UFVK）。阅读设备上的屏幕内容并批准。如果看到“设备连接丢失”，请确认 Zcash 应用已打开，及时批准并点击 **重试**。
- 当看到 **UFVK 导入成功** 时，点击 **开始同步**。同步完成后，按钮会变为 **更新余额**，并显示“上次同步”时间。
- 查看密钥保留在你的电脑上。它可以找到你的 shielded 资金，但无法花费它们。

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. 接收 ZEC，并在你的 Ledger 上验证两个地址**
- 点击 **接收**，并选择你的 Zcash 账户。Ledger Wallet 会显示一个 **Zcash 1 的地址**（透明地址，以 t1 开头）和一个 **Zcash 1 的私密地址**（以 u1 开头）。较早的地址仍然有效。
- 你的 Ledger 会显示“验证 Zcash 地址”，先在两个页面中显示 **私密地址**，随后显示 **公开地址**。在分享任一地址前，请将每个字符与屏幕进行比对，然后在设备上确认。
- 优先使用私密地址；仅当发送方不支持其他方式时才使用透明地址。

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. 将透明 ZEC 转入你的私密余额**
- 点击 **发送**。在 **自转账** 下，选择 **发送至私密余额**。
- 输入金额，或使用 25%、50%、75% 或 **最大值**。检查网络手续费，然后点击 **审核**。
- 在你的 Ledger 上，依次查看：“审核发送 ZEC 的交易”、“从公开地址转账至私密地址”、金额、分两页显示的输出地址、手续费和到期区块高度。确认输出地址与你在步骤 4 中的私密地址一致，然后在 **签署交易** 页面同时按下两个按钮。
- Ledger Wallet 会显示 **交易已发送**。在交易详情中，类型显示为 **私密（Ironwood）**。
- Ledger Wallet 提醒，自转账会将你的 shielded 资金与你的公开地址关联起来。直接接收到你的私密地址可使它们保持未关联状态。

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- 交易确认后，透明余额会下降，私密余额会上升。新的 shielded 资金会显示为“成熟中”，直到获得足够确认后才可花费。

![Zcash account after shielding: transparent balance reduced, private balance increased and shown as maturing](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. 从你的私密余额发送 ZEC**
- 私密余额可花费后，点击 **发送**，并将 **转出自** 设置为 **私密余额**。
- 粘贴收款人的地址并输入金额。你可以添加最多 512 字节的加密 **备注（可选）**，仅收款人可以阅读。
- 在你的 Ledger 上审核收款人、金额和手续费，然后在 **签署交易** 页面同时按下两个按钮。

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## 须知事项

- Ledger 上的 Shielded ZEC 目前仅限桌面版（于 2026 年 10 月 15 日核实）。
- Ledger Wallet 的私密余额使用 Ironwood 池。
- Ledger 表示，你可以与税务顾问共享对交易历史记录的只读访问权限。任何拥有你查看密钥的人都能看到你的 shielded 历史记录，因此请仅在有意的情况下分享。
- 本指南中的设备屏幕使用 Ledger 的 Speculos 模拟器（Nano S Plus）截取，其运行 Zcash 应用 3.9.4，并连接至 Zcash 主网上的 Ledger Wallet Desktop 4.24.0。实体 Ledger 运行相同应用，并显示相同屏幕。

## 更多帮助

- [Ledger Wallet 新功能：原生 Shielded Zcash 支持](https://www.ledger.com/blog-native-shielded-zcash-support)（Ledger 的公告）
- [Ledger 帮助中心](https://support.ledger.com)
- [ZecHub Wallet 页面](/using-zcash/wallets)
- ZecHub 上的 [Shielded Pools](/using-zcash/shielded-pools) 和 [Viewing Keys](/zcash-tech/viewing-keys)
- 另一种硬件钱包选择：[Keystone Zashi 用户指南](/guides/keystone-zashi)

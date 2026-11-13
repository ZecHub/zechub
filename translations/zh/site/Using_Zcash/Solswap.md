# **如何在 Phantom 钱包中兑换 ZEC**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

已经在 Solana 上持有 ZEC（例如来自向持有者分发 ZEC 的代币）？不要兑换它。使用[在 Solana 上有 ZEC？将其转移到隐蔽 Zcash](/using-zcash/solana-zec-to-shielded) 将该代币转移到隐蔽 Zcash 钱包。

---

## **原生 ZEC 还是 ZEC 代币？**

Phantom 中的 "ZEC" 可能指两种不同的资产，因此请确认您购买的是哪一种。

- **Phantom 的内置 Swap 按钮**为您提供的是 Solana（或 Phantom 支持的其他网络）上的 ZEC 代币表示。它不是原生 ZEC。它位于您的 Phantom 地址，没有 Zcash 隐蔽功能，Zcash 钱包无法看到或隐蔽它。
- **原生 ZEC** 仅存在于 Zcash 区块链上，发送到 Zcash 地址。要获取它，您需要一个要求您提供 Zcash 地址的服务，例如 [ZODL](https://zodl.com) 中的兑换、[DEX 页面](/dex)上的选项之一，或者 solswap.org 后跟提现到您的 Zcash 钱包（步骤 8）。

### 付款前检查

- **网络：**您收到的 ZEC 应该在 **Zcash** 网络上。如果显示 Solana、Ethereum 或 Base，那就是代币。
- **资产：**原生 ZEC 没有代币合约或铸造地址。如果您的显示有，那就是代币。Solana 上还有很多仿冒的 "ZEC" 代币，所以不要只看名称。Solana 上的 OmniBridge 代币是 `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`；这仍然是代币，不是原生 ZEC。
- **地址：**原生 ZEC 发送到 Zcash 地址，以 `t1`、`u1` 或 `zs` 开头。如果 ZEC 被发送到您的 Phantom 地址，您获得的是代币。

---

## **步骤 1：打开兑换界面**
启动 **Phantom 应用**并从 Phantom 浏览器访问 **[solswap.org](https://solswap.org/)**。自行输入地址。该网站运行在 NEAR Intents 上，可以将 ZEC 发送到 Zcash 地址。

Phantom 自己的 **Swap** 按钮也列出了 ZEC，但那会给您上面描述的代币，而非原生 ZEC。

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

## **步骤 2：选择存入的网络和代币**
- 选择您的**源网络**（例如 *Ethereum* 或 *Solana*），然后存入以进行兑换。

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- 选择基础代币，如 **SOL、USDT 或 USDC**。
- 选择 **ZEC** 作为您的**目标代币**。
- 确保 Zcash 可通过兑换界面使用。

![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

## **步骤 3：输入金额并查看报价**
- 输入您想要兑换的金额。
- 使用 **solswap.org** 上显示的接收金额。该报价适用于此路线。

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

## **步骤 4：检查 Gas 和费用**
- 在 Phantom 中保留足够的源链 gas 代币以批准存入（Solana 上为 *SOL*，Ethereum 上为 *ETH*）。
- 确认前阅读 solswap 报价上的费用行。Phantom 的内置 Swap 使用自己的费用表（历史上为 0.85% Phantom 费用加上网络 gas 和桥接费用）。这些数字不适用于 solswap.org 存入。

---

## **步骤 5：调整设置（可选）**
在 solswap.org 上，存入前查看滑点和该页面上显示的最低接收金额。

如果您看到的是 Phantom 自己的 **Swap** 页面，那您使用的是本页顶部描述的代币路线。关闭它并在 Phantom 浏览器中打开 `solswap.org`。

---

## **步骤 6：确认兑换**
- 在 solswap.org 上查看所有兑换详情。
- 在 Phantom 中确认存入。

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **步骤 7：监控状态**
- 在 solswap.org 活动中跟踪存入，直到显示 **Completed**。
- Solana 或源链交易 ID 在该活动行上以及该网络的链浏览器上可见。

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **步骤 8：将原生 ZEC 提现到您的 Zcash 钱包**
兑换后，您的 ZEC 显示在 solswap.org 的 **Account** 余额中。它还不在 Zcash 网络上，也不在 Phantom 中。

1. 打开一个[目录](/wallets)标记为 **Ironwood: Ready** 的 Zcash 钱包。复制您的钱包标记为隐蔽的 `u1` 地址。`t1` 也可以，但该存入在您隐蔽之前是公开的。
2. 在 solswap.org 上，转到 **Account** 并点击 **Withdraw**。选择 **ZEC**，将网络设置为 **Zcash**，粘贴地址并在确认前检查首尾字符。
3. 如果 **Received amount** 和 **Fee** 保持在 "–" 且按钮无响应，余额没有丢失。它位于您的 Phantom 密钥下的 NEAR Intents 中。在 [near.com](https://near.com) 上完成：使用相同的 Phantom 钱包登录，打开 **Move legacy assets**，在 ZEC 行上点击 **Withdraw**（不是 **Move**），将网络设置为 **Zcash**，并粘贴相同的 `u1`。Phantom 会要求您 **Sign Message**。仅在请求来自 `near.com` 且消息中包含 `"verifying_contract": "intents.near"` 时确认。该解决方法的完整截图在[在 Solana 上有 ZEC？将其转移到隐蔽 Zcash](/using-zcash/solana-zec-to-shielded) 中。

---

## **后续步骤**
一旦原生 ZEC 在您的 Zcash 钱包中，使用[私密使用 ZEC](/guides/using-zec-privately) 保持其隐蔽状态。

使用 Phantom 的 Swap 按钮购买的 ZEC 代币无法从 Phantom 隐蔽。该代币是 Solana 上的 OmniBridge 资产。使用[在 Solana 上有 ZEC？将其转移到隐蔽 Zcash](/using-zcash/solana-zec-to-shielded) 转移它。

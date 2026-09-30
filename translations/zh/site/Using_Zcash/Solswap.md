# **如何在 Phantom Wallet 中兑换 ZEC**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

已在 Solana 上持有 ZEC（例如来自一种以 ZEC 支付给持有者的代币）？不要兑换它。将该代币转移到使用 [ 的受屏蔽 Zcash 钱包。已在 Solana 上获得 ZEC？将其转移到受屏蔽的 Zcash](/using-zcash/solana-zec-to-shielded)

---

## **原生 ZEC 还是 ZEC 代币？**

Phantom 中的“ZEC”可能指两种不同的资产，因此请了解你所购买的是哪一种。

- **Phantom 内置的 Swap 按钮**会为你提供 Solana（或 Phantom 支持的其他网络）上 ZEC 的代币表示形式。它不是原生 ZEC。它存放在你的 Phantom 地址中，不具备 Zcash 的屏蔽功能，Zcash 钱包也无法看到或屏蔽它。
- **原生 ZEC**仅存在于 Zcash 区块链上，并会被发送至 Zcash 地址。要获得它，你需要使用要求提供 Zcash 地址的服务，例如 [ZODL](https://zodl.com) 内的兑换、[DEX 页面](/dex)上的选项之一，或使用 solswap.org 后再提现至你的 Zcash 钱包（第 8 步）。

### 付款前检查

- **网络：**你收到的 ZEC 应位于 **Zcash** 网络上。如果显示为 Solana、Ethereum 或 Base，则它是代币。
- **资产：**原生 ZEC 没有代币合约或铸造地址。如果你的显示了其中之一，它就是代币。Solana 上也有许多名称相似的“ZEC”代币，因此不要仅凭名称判断。Solana 上的 OmniBridge 代币是 `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`；它仍然是代币，并非原生 ZEC。
- **地址：**原生 ZEC 会发送至 Zcash 地址，其开头为 `t1`、`u1` 或 `zs`。如果 ZEC 被发送至你的 Phantom 地址，你收到的是代币。

---

##  **步骤 1：打开 Swap 界面**
启动 **Phantom 应用**，并通过 Phantom 浏览器访问 **[solswap.org](https://solswap.org/)**。请自行输入该地址。该网站运行在 NEAR Intents 上，并可将 ZEC 转出至 Zcash 地址。

Phantom 自带的 **Swap** 按钮也会列出 ZEC，但它会让你获得上述代币，而不是原生 ZEC。  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **第 2 步：选择用于存入的网络和代币**  
- 选择你的**源网络**（例如 *Ethereum* 或 *Solana*），然后存入资产以进行兑换。  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- 选择一种基础代币，例如 **SOL、USDT 或 USDC**。  
- 选择 **ZEC** 作为你的**目标代币**。  
- 确保可通过兑换界面使用 Zcash。  



![img4](/content-images/ry4QQF-5gx-2a27ccdd47.webp)

---

##  **第 3 步：输入金额并查看报价**
- 输入您想要兑换的金额。
- 使用 **solswap.org** 上显示的接收金额。该报价适用于此路线。

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **第 4 步：检查 Gas 与费用**
- 在 Phantom 中保留足够的源链 gas 代币，以批准存款（Solana 上的 *SOL*、Ethereum 上的 *ETH*）。
- 在确认前，阅读 solswap 报价中的费用行。Phantom 的内置 Swap 使用其自身的收费标准（历史上为 0.85% 的 Phantom 费用，另加网络 gas 和桥接费用）。这些数字不适用于 solswap.org 存款。

---

##  **第 5 步：调整设置（可选）**
在 solswap.org 上，存入前请查看滑点以及该页面显示的预估最低到账金额。

如果你看到的是 Phantom 自身的 **Swap** 面板，那么你走的是从本页顶部进入的代币路线。请关闭它，并在 Phantom 浏览器中打开 `solswap.org`。

---

##  **第 6 步：确认兑换**
- 在 solswap.org 上查看所有兑换详情。
- 在 Phantom 中确认存款。

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **第 7 步：监控状态**
- 在 solswap.org 活动中跟踪该笔存款，直至其显示为 **已完成**。
- Solana 或源链的交易 ID 位于该活动行中，也可在该网络的区块链浏览器上查看。

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **第 8 步：将原生 ZEC 提现至你的 Zcash 钱包**
兑换后，你的 ZEC 会显示在 solswap.org **账户**余额中。它尚未进入 Zcash 网络，也尚未进入 Phantom。

1. 打开一个被 [目录](/wallets)标记为 **Ironwood：已就绪** 的 Zcash 钱包。复制一个你的钱包标记为已屏蔽的 `u1`。`t1` 也可以，但该笔存款在你将其屏蔽前是公开的。
2. 在 solswap.org 上，前往 **账户** 并点击 **提现**。选择 **ZEC**，将网络设为 **Zcash**，粘贴地址，并在确认前检查首尾字符。
3. 如果 **到账金额** 和 **手续费** 一直显示为“–”，且按钮没有任何反应，余额并未丢失。它位于 NEAR Intents 中，归在你的 Phantom 密钥下。请在 [near.com](https://near.com) 完成操作：使用同一个 Phantom 钱包登录，打开 **转移旧版资产**，在 ZEC 行点击 **提现**（不是 **转移**），将网络设为 **Zcash**，并粘贴相同的 `u1`。Phantom 会要求你 **签署消息**。仅当请求来自 `near.com` 且消息中提到 `"verifying_contract": "intents.near"` 时才确认。该替代方案的完整界面见 [在 Solana 上获得 ZEC？将其转至已屏蔽的 Zcash](/using-zcash/solana-zec-to-shielded)。

---

## **下一步**
一旦原生 ZEC 已存入您的 Zcash 钱包，请通过 [私密地使用 ZEC](/guides/using-zec-privately)，持续保持其屏蔽状态。

通过Phantom的 Swap 按钮购买的ZEC代币无法从Phantom进行屏蔽。该代币是 Solana 上的OmniBridge资产。使用[将其转移。Solana 上有ZEC？将其转移到受屏蔽的Zcash](/using-zcash/solana-zec-to-shielded)。

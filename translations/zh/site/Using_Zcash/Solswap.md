# **如何在 Phantom Wallet 中兑换 ZEC**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

---

## **原生 ZEC 还是 ZEC 代币？**

Phantom 中的“ZEC”可能指两种不同的资产，因此请了解你所购买的是哪一种。

- **Phantom 内置的 Swap 按钮**会为你提供 Solana（或 Phantom 支持的其他网络）上 ZEC 的代币表示形式。它不是原生 ZEC。它存放在你的 Phantom 地址中，不具备 Zcash 的屏蔽功能，Zcash 钱包也无法看到或屏蔽它。
- **原生 ZEC**仅存在于 Zcash 区块链上，并会被发送至 Zcash 地址。要获得它，你需要使用要求提供 Zcash 地址的服务，例如 [ZODL](https://zodl.com) 内的兑换、[DEX 页面](/dex)上的选项之一，或使用 solswap.org 后再提现至你的 Zcash 钱包（第 8 步）。

### 付款前检查

- **网络：**你收到的 ZEC 应处于 **Zcash** 网络上。如果显示为 Solana、Ethereum 或 Base，它就是代币。
- **资产：**原生 ZEC 没有代币合约或铸造地址。如果你的资产显示其中之一，它就是代币。Solana 上还有许多名称相似的“ZEC”代币，因此不要仅凭名称判断。
- **地址：**原生 ZEC 会发送至 Zcash 地址，其开头为 `t1`、`u1` 或 `zs`。如果 ZEC 被发送至你的 Phantom 地址，你获得的就是代币。

---

##  **第 1 步：打开兑换界面**  
启动 **Phantom app**，并通过 Phantom 浏览器访问 **[solswap.org](https://solswap.org/)**。该网站运行于 Near Intents，可将 ZEC 发送至 Zcash 地址。  

Phantom 自带的 **Swap** 按钮也会列出 ZEC，但它会让你获得上述代币，而不是原生 ZEC。  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **第 2 步：选择用于存入的网络和代币**  
- 选择你的**源网络**（例如 *Ethereum* 或 *Solana*），然后存入资产以进行兑换。  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- 选择一种基础代币，例如 **SOL、USDT 或 USDC**。  
- 选择 **ZEC** 作为你的**目标代币**。  
- 确保可通过兑换界面使用 Zcash。  



![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **第 3 步：输入金额并查看报价**  
- 输入你想要兑换的金额。  
- 扣除费用后，Phantom 将显示**预计到账金额**。  


![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **第 4 步：检查 Gas 与费用**  
- 对于**同链兑换**，请确保你拥有足够的原生 Gas 代币（*Ethereum 使用 ETH，Solana 使用 SOL*）。  
- **跨链兑换**要求源链和目标链上均有 Gas。  
- 查看费用明细：  
  - Phantom 费用：**0.85%**  
  - 网络 Gas  
  - 跨桥服务商费用（约 **0.3%**）  
  
  
---

##  **第 5 步：调整设置（可选）**  
点击 **Swap Settings**，即可：  
- 调整**滑点**（默认 **0.3%**，最高可调至 30%）。  
- 在拥堵网络上提高**优先费用**。  

---

##  **第 6 步：确认兑换**  
- 检查所有兑换详情。  
- 点击 **Swap Now** 以发起交易。  


![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **第 7 步：监控状态**  
- 在 **Recent Activity** 标签页中追踪你的兑换。  
- 对于跨链兑换，请使用你的**交易 ID**配合 **Li.Fi Scanner** 获取实时更新。 


![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **第 8 步：将原生 ZEC 提现至你的 Zcash 钱包**  
兑换后，你的 ZEC 会显示在 solswap.org 的 **Account** 余额中。它尚未处于 Zcash 网络上，也不在 Phantom 中。要转移它：  
- 打开一个 Zcash 钱包，例如 [ZODL](https://zodl.com)，并复制你的收款地址。提现表单接受透明地址（`t1`）或统一地址（`u1`）。  
- 在 solswap.org 上，前往 **Account** 并点击 **Withdraw**。  
- 选择 **ZEC**，将网络设为 **Zcash**，粘贴你的地址，并在确认前仔细核对。  

---

## **后续步骤**  
原生 ZEC 进入你的 Zcash 钱包后，你可以使用 [本指南](/guides/using-zec-privately) 将其屏蔽。  

通过 Phantom 的 Swap 按钮购买的 ZEC 代币无法以这种方式屏蔽，因为它不在 Zcash 网络上。你首先需要将其兑换为发送至 Zcash 地址的原生 ZEC。

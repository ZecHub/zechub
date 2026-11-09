# MetaMask Zcash Snap 集成指南

如需完整演示和视觉说明，请观看此[**YouTube指南**](https://www.youtube.com/watch?v=UJh9Ilkohdw)： 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="如何在 Metamask 上使用 ZEC"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask 现通过 **ChainSafe 开发的 Zcash Snap** 支持**屏蔽 [shielded] Zcash（ZEC）**，让您可以直接在浏览器钱包 [wallet] 中发送、接收和管理私密ZEC。该 Snap 已由 **Hacken** 审计，并列入**官方 MetaMask Snaps 目录**，无需单独的Zcash软件，仅需 MetaMask 和该 Snap。

---

## **前提条件**


> [**MetaMask 扩展程序**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)（仅限桌面端）- Chrome、Edge 或 Firefox。
> MetaMask 账户 - 助记词 [seed phrase] 已妥善保护；Snap 会从中派生Zcash密钥。  
> 稳定的互联网连接 - 用于与 Zcash 网络同步。  
> 资金 - 用于兑换 [swap] ZEC 的 ETH，或从交易所 [exchange] 购买ZEC。

> **提示：**保护您的 MetaMask 恢复短语 - 它同时控制 ETH 和 ZEC。

---

## **1. 安装 Zcash Snap**

1. 前往 [**MetaMask Snaps 目录**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)。  
2. 搜索 [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) 或 [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)。  
3. 点击**安装/添加至 MetaMask**。
4. 批准以下权限，例如：
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. （可选）添加 Zcash 网络**

在 MetaMask 中，选择**添加网络**并输入：

对于 **BNB SmartChain**；
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
这将启用网络信息和浏览器链接。
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

对于 **Zcash 主网**；
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` 是由 [zec.rocks](https://zec.rocks)（@emersonian）运行的兼容 WebZjs（gRPC-web）的 lightwalletd 服务器。对于测试网，请使用 `https://zjs.zec.rocks/testnet`。如果您自行运行 WebZjs 网页钱包，则应将此值设置为 `LIGHTWALLETD_PROXY`。

---

## **3. 连接至 ChainSafe WebZjs 钱包**

1. 访问 [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev)。  
2. 点击**连接 MetaMask Snap**。  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. 批准连接。  
4. 查看您的 Zcash 账户摘要，包括：
   - 统一地址和透明 [transparent] 地址

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. 等待同步完成。




---

## **4. 为您的钱包充值**

> **将 ETH 兑换为 ZEC** - 使用 **LeoDex** 等服务，并发送至您的屏蔽地址。  
> **从交易所提现** - 将购买的 ZEC 提现至您的 WebZjs 屏蔽地址。  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => 使用屏蔽（z）地址以获得**完整隐私 [privacy]**。

---

## **5. 发送/接收 ZEC**

1. 在 **WebZjs** 中，前往**转移余额**。  
2. 输入：
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. 在 MetaMask 中确认交易 [transaction]（签署交易）。  
5. 确认后，收到的资金将显示在 WebZjs 中。

---

## **6. 验证/故障排除**

> 检查 **WebZjs** 中更新后的余额**（MetaMask 尚未直接列出 ZEC）**。  
> 如遇问题：
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **安全提示：**仅安装**经审计的 ChainSafe Snap**；批准前请审查权限。

---

## **7. 检查地址组件**

1. 前往**接收**部分 - 默认会显示您的统一地址。  
2. 复制统一地址并访问 [Zcash 区块 [block] 浏览器](https://mainnet.zcashexplorer.app/)。  
3. 将您的统一地址粘贴到搜索栏中。  
4. 您现在将看到统一地址的所有组件，其中包括：
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **附加说明**

> 使用 [**最新的 MetaMask 版本**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - 公开版本支持 Snaps。  
> 屏蔽证明 [proof] 可能需要一些时间，WebAssembly 会在浏览器中处理计算。  
> 恢复非常简单，安装 MetaMask 和该 Snap，然后导入您现有的助记词。  
> 该 Snap 默认使用**屏蔽 ZEC**，透明地址**并非重点**。  
> 使用 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) 确认交易。

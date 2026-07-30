# MetaMask Zcash Snap 集成指南

如需完整的操作演示和可视化说明，请观看这份 [**YouTube 指南**](https://www.youtube.com/watch?v=UJh9Ilkohdw)： 

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
     

MetaMask 现已通过 **由 ChainSafe 开发的 Zcash Snap** 支持 **屏蔽版 Zcash (ZEC)**，让你可以直接在浏览器钱包中发送、接收和管理私密 ZEC。该方案已通过 **Hacken** 审计，并已列入 **官方 MetaMask Snaps Directory**，**无需单独安装 Zcash 软件**，只需 MetaMask 和该 Snap。

---

## **先决条件**


> [**MetaMask 扩展**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)（仅桌面端）- Chrome、Edge 或 Firefox。
> MetaMask 账户 - 妥善保护助记词；Snap 会基于它派生 Zcash 密钥。  
> 稳定的网络连接 - 用于与 Zcash 网络同步。  
> 资金 - 可用于兑换 ZEC 的 ETH，或从交易所提取的 ZEC。

> **提示：** 请保护好你的 MetaMask 恢复短语——它同时控制 ETH 和 ZEC。

---

## **1. 安装 Zcash Snap**

1. 前往 [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)。  
2. 搜索 [**“Zcash Shielded Wallet”**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) 或 [**“WebZjs Zcash Snap”**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/)。  
3. 点击 **Install/Add to MetaMask**。
4. 批准相关权限，例如：
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![安装 Zcash-snap](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. （可选）添加 Zcash 网络**

在 MetaMask 中，选择 **Add Network** 并输入：

对于 **BNB SmartChain**；
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
这将启用网络信息和区块浏览器链接。
![添加自定义网络....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

对于 **Zcash Mainnet**；
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. 连接到 ChainSafe WebZjs Wallet**

1. 访问 [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev)。  
2. 点击 **Connect MetaMask Snap**。  

![Zcash 网页钱包](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. 批准连接。  
4. 查看你的 Zcash 账户摘要，其中包括：
   - Unified addresses 和 Transparent address

![账户摘要-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. 等待同步完成。




---

## **4. 为钱包注资**

> **将 ETH 兑换为 ZEC** - 使用 **LeoDex** 等服务，并发送到你的屏蔽地址。  
> **交易所提币** - 将购买的 ZEC 提现到你的 WebZjs 屏蔽地址。  

![LEODEX 兑换](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => 使用屏蔽（z）地址可获得 **完整隐私**。

---

## **5. 发送 / 接收 ZEC**

1. 在 **WebZjs** 中，进入 **Transfer Balance**。  
2. 输入：
```
   - Shielded recipient address  
   - Amount
```
   ![转账余额](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. 在 MetaMask 中确认交易（签署交易）。  
5. 收到的资金会在确认后显示在 WebZjs 中。

---

## **6. 验证 / 故障排查**

> 在 **WebZjs** 中检查更新后的余额 **（MetaMask 尚未直接列出 ZEC）** 。  
> 如果出现问题：
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **安全提示：** 仅安装 **经过审计的 ChainSafe Snap**；批准前请检查权限。

---

## **7. 检查地址组成部分**

1. 前往 **Receive** 页面 - 默认会显示你的 Unified Address。  
2. 复制 Unified Address，并访问 [Zcash 区块浏览器](https://mainnet.zcashexplorer.app/)。  
3. 将你的 Unified Address 粘贴到搜索栏中。  
4. 现在你将看到 Unified Address 的所有组成部分，包括：
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![地址组成部分](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **附加说明**

> 使用 [**最新版本的 MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - 公开发布版本支持 Snaps。  
> 屏蔽证明可能需要一些时间，WebAssembly 会在浏览器内处理计算。  
> 恢复很简单，安装 MetaMask 和该 Snap，然后导入你现有的助记词。  
> 该 Snap 默认使用 **屏蔽版 ZEC**，Transparent addresses **并非重点**。  
> 使用 [zcashblockexplorer.com](https://zcashblockexplorer.com) 查看交易确认情况。

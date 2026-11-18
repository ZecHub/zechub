<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# MetaMask Zcash Snap 集成指南

> 使用 MetaMask 浏览器扩展中的 ChainSafe 的 Zcash Snap 和 WebZjs Web 钱包，持有并发送屏蔽 ZEC。

## 简而言之

* ChainSafe Zcash Snap 可在桌面版 MetaMask（Chrome、Edge、Firefox）中添加屏蔽 ZEC。无需单独安装 Zcash 软件。
* 你的 Zcash 密钥由你的 MetaMask 恢复短语派生。现在，这个短语可以同时保护你的 ETH 和 ZEC。
* 你可通过 WebZjs 钱包（webzjs.chainsafe.dev）管理 ZEC，而不是在 MetaMask 自带的资产列表中管理。
* 你的账户会获得一个统一地址，因此发送者可以通过其支持的最隐私 pool 向你付款。
* 你可以通过兑换（例如将 ETH 兑换为 ZEC）为其注资，也可以从交易所提取 ZEC 到你的屏蔽地址。
* 恢复方法：重新安装 MetaMask 和 Snap，然后导入现有的恢复短语。

## 核心说明

MetaMask Snap 是一个小型沙盒附加组件，可让 MetaMask 支持新的 blockchain。由 ChainSafe 构建并经 Hacken 审计的 Zcash Snap，可让 MetaMask 根据你现有的恢复短语派生 Zcash 密钥，并为 Zcash 交易签名。

MetaMask 本身不会显示 ZEC 余额。相反，WebZjs Web 钱包会连接到 Snap，通过 lightwalletd 服务器与 Zcash 网络同步，并显示你的地址和余额。屏蔽证明会通过 WebAssembly 在浏览器中计算，因此发送可能需要一些时间。

以下步骤涵盖安装 Snap、连接 WebZjs、为钱包注资、发送和接收，以及检查统一地址的组成部分。

## 完整指南

如需查看完整操作流程和说明，请观看此 [**YouTube 指南**](https://www.youtube.com/watch?v=UJh9Ilkohdw)：

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
     

MetaMask 现在支持通过 **由 ChainSafe 开发的 Zcash Snap** 管理**屏蔽 Zcash（ZEC）**，让你可以直接在浏览器钱包中发送、接收和管理私密 ZEC。该功能已通过 **Hacken** 审计，并列入 **MetaMask 官方 Snaps 目录**，**无需单独安装 Zcash 软件**，只需使用 MetaMask 和 Snap。

---

## **前提条件**


> [**MetaMask 扩展程序**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)（仅限桌面版）- Chrome、Edge 或 Firefox。
> MetaMask 账户 - 请妥善保管助记词；Snap 会据此派生 Zcash 密钥。  
> 稳定的互联网连接 - 用于与 Zcash 网络同步。  
> 资金 - 用于兑换 ZEC 的 ETH，或从交易所提取的 ZEC。

> **提示：** 妥善保管你的 MetaMask 恢复短语 - 它同时控制 ETH 和 ZEC。

---

## **1. 安装 Zcash Snap**

1. 前往 [**MetaMask Snaps 目录**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)。  
2. 搜索 [**"Zcash WebZjs 钱包"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) 或 [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/)。  
3. 点击 **安装/添加到 MetaMask**。
4. 批准以下权限：
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2.（可选）添加 Zcash 网络**

在 MetaMask 中选择 **添加网络**，并输入：

对于 **BNB SmartChain**；
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
这将启用网络信息和区块浏览器链接。
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

对于 **Zcash 主网**；
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` 是由 [zec.rocks](https://zec.rocks)（@emersonian）运行的 WebZjs 兼容型（gRPC-web）lightwalletd 服务器。测试网请使用 `https://zjs.zec.rocks/testnet`。如果你自行运行 WebZjs Web 钱包，则应将此值设为 `LIGHTWALLETD_PROXY`。

---

## **3. 连接到 ChainSafe WebZjs 钱包**

1. 访问 [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev)。  
2. 点击 **连接 MetaMask Snap**。  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. 批准连接。  
4. 查看你的 Zcash 账户摘要，包括：
   - 统一地址和透明地址

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. 等待同步完成。




---

## **4. 为钱包注资**

> **兑换 ETH -> ZEC** - 使用 **LeoDex** 等服务，并将资金发送到你的屏蔽地址。  
> **从交易所提取** - 将购买的 ZEC 提取到你的 WebZjs 屏蔽地址。  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => 使用屏蔽（z）地址以实现**完全隐私**。

---

## **5. 发送/接收 ZEC**

1. 在 **WebZjs** 中，前往 **转账余额**。  
2. 输入：
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. 在 MetaMask 中确认交易（为交易签名）。  
5. 收到的资金将在确认后显示在 WebZjs 中。

---

## **6. 验证/排查问题**

> 查看 **WebZjs** 以确认余额已更新 **（MetaMask 尚未直接列出 ZEC）**。  
> 如果遇到问题：
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **安全提示：** 仅安装**经过审计的 ChainSafe Snap**；批准前请查看权限。

---

## **7. 查看地址组成部分**

1. 前往**接收**部分 - 默认会显示你的统一地址。  
2. 复制统一地址并访问 [Zcash区块浏览器](https://mainnet.zcashexplorer.app/)。  
3. 将统一地址粘贴到搜索栏中。  
4. 现在，你将看到统一地址的所有组成部分，包括：
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **补充说明**

> 使用 [**最新的 MetaMask 版本**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - 公开发行版支持 Snaps。  
> 屏蔽证明可能需要一些时间，WebAssembly 会在浏览器中执行计算。  
> 恢复很简单：安装 MetaMask 和 Snap，然后导入你现有的助记词。  
> Snap 默认使用**屏蔽 ZEC**，透明地址**并非重点**。  
> 使用 [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) 查看交易确认。

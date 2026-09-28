# **使用 Encrypt.trade 将 SOL/USDC -> ZEC 兑换**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*从 Solana 兑换至 Zcash，跨链步骤通过 Near Intents 路由。*  

---

###  简介  
[**encrypt.trade**](https://encrypt.trade/zec) 是一款由 JMD Labs Inc. 运营的 Solana 应用。它允许你将 Solana 上的 **SOL 或 USDC** 兑换为 **Zcash（ZEC）**。你的代币会先被封装为加密版本，因此金额在 Solana 上被隐藏，随后再通过 Near Intents 兑换为 ZEC。

这种兑换在某些方面具有隐私性，但并非完全私密。该应用自己的 [文档](https://docs.encifher.io/docs) 表示，你与链的交互并非匿名：人们可以看到你的钱包使用了该应用，但看不到你转移了多少金额。ZEC 也会到达一个透明地址，因此在你将其屏蔽之前，它会一直在 Zcash 链上可见。


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  兑换前须知  
- **Solana 端。** 封装会隐藏金额，但你的钱包地址及其使用该应用的行为是公开的。其 [最佳实践](https://docs.encifher.io/docs/best-practices) 警告说，简单地进行封装、兑换和解封装会使你的交易可被关联。
- **加密。** 加密余额在硬件隔离区（TEE）内离链处理。开发者的 [论文](https://eprint.iacr.org/2026/1504) 表示，这依赖于 TEE 完整性、诚实的门限密钥管理以及云证明根，而不仅仅是密码学。
- **跨链步骤。** 兑换至 ZEC 的操作通过 Near Intents 路由，由独立求解器完成订单。
- **Zcash 端。** Near Intents 将 ZEC 列为仅支持 [透明地址](https://docs.near-intents.org/resources/chain-support)，而在 2026 年 9 月核查本指南时，encrypt.trade 上的 ZEC 字段也只接受透明（t1 或 t3）地址。透明地址会公开显示其余额和收到的转账，直到你将其屏蔽。
- **筛查。** 该应用会根据 TRM 和 Chainalysis 等数据库检查连接的钱包，其 [合规页面](https://docs.encifher.io/docs/compliance) 表示，若存在合法法律理由，加密记录可能会被审查。Near Intents 也会进行自己的 [筛查](https://docs.near-intents.org/security-compliance/risk-and-compliance)。

---

###  第 1 步：连接你的 Solana 钱包  
使用 **Chrome 或 Firefox** 访问 [encrypt.trade](https://encrypt.trade/zec)，并连接你的 **Phantom**、**Solflare** 或 **Slope** 钱包。确保你的钱包中有足够的 **SOL** 用于支付 gas 费用，以及你想交易的代币。连接后，你就可以封装资产了。  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  第 2 步：封装你的代币  
前往 **Wrap** 部分。选择 **SOL** 或 **USDC**，输入金额并确认。该应用会锁定你的资产，并发行**加密版本（eSOL 或 eUSDC）**。封装与兑换不同的金额会使两者更难按金额匹配，但这不会隐藏你的钱包使用了该应用这一事实。  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  第 3 步：准备你的 ZODL 钱包  
下载 [**ZODL**](https://zodl.com)，这是由 ZODL 维护的 Zcash 钱包。在接收页面，复制你的 **Zcash 透明地址**（以 t1 开头）。目前 encrypt.trade 不接受用于 ZEC 的屏蔽地址或统一地址。继续前请安全保存你的助记词。  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  第 4 步：兑换  
返回 **encrypt.trade**，进入 **Swap**。选择 **eSOL/eUSDC -> ZEC**，粘贴你的 ZODL 透明地址，核对详情后确认。



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** 负责跨链路由，并将 **ZEC** 发送到你的 ZODL 钱包。此过程可能需要几分钟。Near Intents 建议为跨链兑换预留最多 15 分钟。  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  第 5 步：屏蔽你的 ZEC  
ZEC 到账后，使用 ZODL 的 **Shield** 选项将其转入 [屏蔽池](/using-zcash/shielded-pools)。在此之前，它会存放在透明地址中，任何人都可以看到余额。屏蔽能保护你接下来的操作，但入账转账和屏蔽交易仍会在链上可见。务必验证链接，避免重复使用地址，并先用小额进行测试。  

---

###  涉及方及获取帮助的途径  
- **encrypt.trade** 是由 JMD Labs Inc. 运营的应用。其 [隐私政策](https://encrypt.trade/privacy) 表示，它会收集 IP、浏览器和设备详情等技术数据；在兑换前，会将你的钱包地址、近期历史记录和余额发送给合规服务提供商；并且可能会将日志和 AML 筛查结果保存长达五年。其 [条款](https://encrypt.trade/terms) 禁止使用 VPN 或代理来隐藏你的位置。支持渠道：help@encifher.io，或应用中链接的 [Telegram 群组](https://t.me/+ZWHGMW4ZHXQwYTZl)。
- **Near Intents** 负责路由跨链步骤并交付 ZEC。请参阅其 [1Click API 条款](https://docs.near-intents.org/security-compliance/terms-of-service) 及 near.com/privacy 上的隐私政策，在 [Near Intents 浏览器](https://explorer.near-intents.org) 中追踪兑换，并在 [Near Intents Telegram](https://t.me/near_intents) 中寻求帮助。

条款和支持的地址可能会变化，因此进行大额兑换前请查看当前版本。想了解更广泛的背景，请参阅 [非托管交易所](/using-zcash/non-custodial-exchanges)。

---

通过结合 **Solana**、**Zcash** 和 **Near Intents**，**encrypt.trade** 为你提供了一条从 SOL 或 USDC 兑换至 ZEC 的快速路径。它会隐藏 Solana 上的金额，但并非端到端私密，因此 ZEC 到账后请将其屏蔽。

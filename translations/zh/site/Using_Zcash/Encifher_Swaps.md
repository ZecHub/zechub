# **使用 Encrypt.trade 将 SOL/USDC 兑换为 ZEC**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*从 Solana 兑换为 Zcash，跨链步骤通过 Near Intents 路由。*  

---

###  介绍  
[**encrypt.trade**](https://encrypt.trade/zec) 是由 JMD Labs Inc. 运营的一款 Solana 应用。它让你可以将 Solana 上的 **SOL 或 USDC** 兑换为 **Zcash (ZEC)**。你的代币会先被封装为加密版本，因此金额在 Solana 上被隐藏，随后再通过 Near Intents 兑换为 ZEC。

这种兑换在某些方面具有隐私性，但并非完全如此。该应用自身的 [文档](https://docs.encifher.io/docs) 表示，你与链的交互并非匿名：人们可以看到你的钱包使用了该应用，但看不到你转移了多少金额。ZEC 还会到达一个透明地址，因此在你将其屏蔽前，它会一直在 Zcash 链上可见。


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  兑换前须知  
- **Solana 端。** 封装会隐藏金额，但你的钱包地址及其对该应用的使用是公开的。其 [最佳实践](https://docs.encifher.io/docs/best-practices) 警告称，简单地进行封装、兑换和解封装会使你的交易可被关联。
- **加密。** 加密余额会在硬件飞地（TEE）内离线处理。开发者的 [论文](https://eprint.iacr.org/2026/1504) 表示，这依赖于 TEE 完整性、诚实的阈值密钥管理以及云证明根，而不单单是密码学。
- **跨链步骤。** 兑换为 ZEC 的操作通过 Near Intents 路由，由独立求解器完成订单。
- **Zcash 端。** Near Intents 将 ZEC 列为仅支持 [透明地址](https://docs.near-intents.org/resources/chain-support)，并且在本指南于 2026 年 9 月核查时，encrypt.trade 上的 ZEC 字段仅接受透明（t1 或 t3）地址。透明地址会公开显示其余额和收到的转账，直到你将其屏蔽。
- **筛查。** 该应用会根据 TRM 和 Chainalysis 等数据库检查连接的钱包，其 [合规页面](https://docs.encifher.io/docs/compliance) 表示，如有合法法律理由，可审查加密记录。Near Intents 也会进行自己的 [筛查](https://docs.near-intents.org/security-compliance/risk-and-compliance)。

---

###  第 1 步：连接你的 Solana 钱包  
使用 **Chrome 或 Firefox** 访问 [encrypt.trade](https://encrypt.trade/zec)，并连接你的 **Phantom**、**Solflare** 或 **Slope** 钱包。确保你的钱包中有足够的 **SOL** 用于支付 gas 费用，以及你想交易的代币。连接后，你就可以封装资产了。  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  第 2 步：封装你的代币  
前往 **Wrap** 部分。选择 **SOL** 或 **USDC**，输入金额并确认。该应用会锁定你的资产，并发行**加密版本（eSOL 或 eUSDC）**。封装与兑换不同的金额会使两者更难通过金额关联，但不会隐藏你的钱包使用了该应用这一事实。  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  第 3 步：准备你的 ZODL 钱包  
下载 [**ZODL**](https://zodl.com)，这是由 ZODL 维护的 Zcash 钱包。在接收页面，复制你的 **Zcash 透明地址**（以 t1 开头）。目前 encrypt.trade 不接受用于 ZEC 的屏蔽地址或统一地址。继续前请妥善保存你的助记词。  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  第 4 步：兑换  
回到 **encrypt.trade**，前往 **Swap**。选择 **eSOL/eUSDC -> ZEC**，粘贴你的 ZODL 透明地址，核对详情后确认。



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** 处理跨链路由，并将 **ZEC** 发送到你的 ZODL 钱包。此过程可能需要几分钟。Near Intents 建议为跨链兑换预留最多 15 分钟。  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  第 5 步：屏蔽你的 ZEC  
ZEC 到账后，使用 ZODL 的 **Shield** 选项将其转入 [屏蔽池](/using-zcash/shielded-pools)。在此之前，它会位于任何人都能看到余额的透明地址中。屏蔽会保护你之后的操作，但入账转账和屏蔽交易仍会在链上可见。务必验证链接，避免重复使用地址，并先用小额测试。  

---

###  涉及方及获取帮助的途径  
- **encrypt.trade** 是由 JMD Labs Inc. 运营的应用。其 [隐私政策](https://encrypt.trade/privacy) 表示，它会收集 IP、浏览器和设备详情等技术数据；在兑换前，会将你的钱包地址、近期历史记录和余额发送给合规服务商；并可能将日志及 AML 筛查结果保留最长五年。其 [条款](https://encrypt.trade/terms) 禁止使用 VPN 或代理来隐藏你的位置。支持：help@encifher.io，或通过应用链接的 [Telegram 群组](https://t.me/+ZWHGMW4ZHXQwYTZl)。
- **Near Intents** 路由跨链步骤并交付 ZEC。请参阅其 [1Click API 条款](https://docs.near-intents.org/security-compliance/terms-of-service) 和 near.com/privacy 上的隐私政策，在 [Near Intents Explorer](https://explorer.near-intents.org) 上追踪兑换，并在 [Near Intents Telegram](https://t.me/near_intents) 中寻求帮助。

条款和支持的地址可能会变化，因此在进行大额兑换前请查看当前版本。欲了解更广泛的背景，请参阅 [非托管交易所](/using-zcash/non-custodial-exchanges)。

---

通过结合 **Solana**、**Zcash** 和 **Near Intents**，**encrypt.trade** 为你提供了一条从 SOL 或 USDC 兑换为 ZEC 的快捷路径。它会隐藏 Solana 上的金额，但并非端到端私密，因此请在 ZEC 到账后将其屏蔽。

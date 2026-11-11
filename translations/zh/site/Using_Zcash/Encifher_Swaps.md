# **SOL/USDC -> ZEC 兑换 [Swap]，使用 Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*从 Solana 兑换到 Zcash，跨链 [cross-chain] 步骤通过 NEAR Intents 路由。*  

---

###  介绍 [Introduction]  
[**encrypt.trade**](https://encrypt.trade/zec) 是由 JMD Labs Inc. 运营的 Solana 应用。它让你能够在 Solana 上将 **SOL 或 USDC** 兑换为 **Zcash (ZEC)**。你的代币会先被封装为加密版本，以便在 Solana 上隐藏金额，然后再通过 NEAR Intents 兑换为 ZEC。

该兑换在某些方面具有隐私 [privacy]，但并非全部如此。该应用自己的 [文档](https://docs.encifher.io/docs) 表示，你与链 [chain] 的交互并非匿名：他人可以看到你的钱包 [wallet] 使用了该应用，但看不到你转移了多少金额。ZEC 也会到达一个透明 [transparent] 地址，因此在你将其屏蔽 [shielded] 前，它会一直在 Zcash 链上可见。


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  兑换前须知  
- **Solana 一侧。** 封装会隐藏金额，但你的钱包地址及其对应用的使用情况是公开的。其 [最佳实践](https://docs.encifher.io/docs/best-practices) 警告，简单地进行封装、兑换和解封装会使你的交易 [transaction] 可被关联。
- **加密 [Encryption]。** 加密余额会在硬件飞地 (TEE) 内以链下 [off-chain] 方式处理。开发者 [developer] 的 [论文](https://eprint.iacr.org/2026/1504) 表示，这依赖于 TEE 完整性、诚实的阈值密钥管理以及云证明根，而不仅仅是密码学。
- **跨链步骤。** 兑换到 ZEC 的过程通过 NEAR Intents 路由，由独立求解器执行订单。
- **Zcash 一侧。** NEAR Intents 将 ZEC 列为仅支持 [透明地址](https://docs.near-intents.org/resources/chain-support)，且在 2026 年 9 月核查本指南时，encrypt.trade 上的 ZEC 字段仅接受透明（t1 或 t3）地址。透明地址会公开显示其余额和收到的转账，直至你进行屏蔽。
- **筛查 [Screening]。** 该应用会根据 TRM 和 Chainalysis 等数据库检查所连接的钱包，其 [合规页面](https://docs.encifher.io/docs/compliance) 表示，如存在正当法律理由，加密记录可被审查。NEAR Intents 也会自行进行 [筛查](https://docs.near-intents.org/security-compliance/risk-and-compliance)。

---

###  第 1 步：连接你的 Solana 钱包  
使用 **Chrome 或 Firefox** 访问 [encrypt.trade](https://encrypt.trade/zec)，并连接你的 **Phantom**、**Solflare** 或 **Slope** 钱包。请确保你的钱包中有足够的 **SOL** 用于支付 gas 手续费 [fee]，以及有你想交易的代币。连接后，你即可封装资产。  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  第 2 步：封装你的代币  
前往 **Wrap** 部分。选择 **SOL** 或 **USDC**，输入金额并确认。该应用会锁定你的资产，并发行**加密版本（eSOL 或 eUSDC）**。封装与兑换不同的金额会使他人更难通过金额匹配两者，但这不会隐藏你的钱包使用了该应用这一事实。  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  第 3 步：准备你的 ZODL 钱包  
下载 [**ZODL**](https://zodl.com)，这是由 ZODL 维护的 Zcash 钱包。在接收界面，复制你的 **Zcash 透明地址**（以 t1 开头）。encrypt.trade 目前不接受用于 ZEC 的屏蔽地址或统一地址。继续前请妥善保存你的助记词 [seed phrase]。  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  第 4 步：兑换  
返回 **encrypt.trade**，前往 **Swap**。选择 **eSOL/eUSDC -> ZEC**，粘贴你的 ZODL 透明地址，检查详细信息并确认。



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**NEAR Intents** 负责跨链路由，并将 **ZEC** 发送到你的 ZODL 钱包。这可能需要几分钟。NEAR Intents 建议为跨链兑换预留最多 15 分钟。  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  第 5 步：屏蔽你的 ZEC  
ZEC 到账后，使用 ZODL 的 **Shield** 选项将其转入 [屏蔽池](/using-zcash/shielded-pools)。在此之前，它会存放在透明地址中，任何人都能看到余额。屏蔽可以保护你之后的操作，但入账转账和屏蔽交易仍会在链上可见。务必验证链接，避免重复使用地址，并先用小额资金测试。  

---

###  参与方及获取帮助的途径  
- **encrypt.trade** 是由 JMD Labs Inc. 运营的应用。其 [隐私政策](https://encrypt.trade/privacy) 表示，它会收集 IP、浏览器和设备详情等技术数据；在兑换前，会将你的钱包地址、近期历史记录和余额发送给合规服务提供商；并可能将日志和 AML 筛查结果保留最长五年。其 [条款](https://encrypt.trade/terms) 禁止使用 VPN 或代理隐藏你的所在地。支持：help@encifher.io，或通过应用链接的 [Telegram 群组](https://t.me/+ZWHGMW4ZHXQwYTZl)。
- **NEAR Intents** 负责跨链步骤的路由并交付 ZEC。请参阅其 [1Click API 条款](https://docs.near-intents.org/security-compliance/terms-of-service) 及 near.com/privacy 的隐私政策，在 [NEAR Intents Explorer](https://explorer.near-intents.org) 上跟踪兑换，并在 [NEAR Intents Telegram](https://t.me/near_intents) 寻求帮助。

条款和支持的地址可能会变化，因此在进行大额兑换前请查看当前版本。有关更广泛的背景信息，请参阅 [非托管交易所](/using-zcash/non-custodial-exchanges)。

---

通过结合 **Solana**、**Zcash** 和 **NEAR Intents**，**encrypt.trade** 为你提供了一条从 SOL 或 USDC 快速兑换到 ZEC 的途径。它会在 Solana 上隐藏金额，但并非端到端私密，因此请在 ZEC 到账后立即将其屏蔽。

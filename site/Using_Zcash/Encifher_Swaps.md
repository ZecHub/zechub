# **SOL/USDC -> ZEC Swap Using Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Swap from Solana into Zcash, with the cross-chain step routed through Near Intents.*  

---

###  Introduction  
[**encrypt.trade**](https://encrypt.trade/zec) is a Solana app run by JMD Labs Inc. It lets you swap **SOL or USDC** on Solana into **Zcash (ZEC)**. Your tokens are first wrapped into encrypted versions so the amounts are hidden on Solana, then swapped to ZEC through Near Intents.

The swap is private in some ways but not all. The app's own [docs](https://docs.encifher.io/docs) say your interaction with the chain is not anonymous: people can see that your wallet used the app, but not how much you moved. The ZEC also arrives at a transparent address, so it stays visible on the Zcash chain until you shield it.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  What to Know Before You Swap  
- **Solana side.** Wrapping hides amounts, but your wallet address and its use of the app are public. Its [best practices](https://docs.encifher.io/docs/best-practices) warn that a simple wrap, swap and unwrap makes your transaction linkable.
- **Encryption.** Encrypted balances are processed off-chain inside a hardware enclave (TEE). The developers' [paper](https://eprint.iacr.org/2026/1504) says this relies on TEE integrity, honest threshold key management and the cloud attestation root, not on cryptography alone.
- **Cross-chain step.** The swap to ZEC is routed through Near Intents, where independent solvers fill the order.
- **Zcash side.** Near Intents lists ZEC as supported for [transparent addresses only](https://docs.near-intents.org/resources/chain-support), and the ZEC field on encrypt.trade only accepted transparent (t1 or t3) addresses when this guide was checked in September 2026. A transparent address shows its balance and incoming transfers publicly until you shield.
- **Screening.** The app checks connecting wallets against databases such as TRM and Chainalysis, and its [compliance page](https://docs.encifher.io/docs/compliance) says encrypted records can be reviewed if there is legitimate legal cause. Near Intents runs its own [screening](https://docs.near-intents.org/security-compliance/risk-and-compliance) too.

---

###  Step 1: Connect Your Solana Wallet  
Visit [encrypt.trade](https://encrypt.trade/zec) using **Chrome or Firefox**, and connect your **Phantom**, **Solflare**, or **Slope** wallet. Ensure your wallet contains enough **SOL** for gas fees and the tokens you want to trade. Once connected, you're ready to wrap your assets.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Step 2: Wrap Your Tokens  
Navigate to the **Wrap** section. Choose **SOL** or **USDC**, enter the amount, and confirm. The app locks your assets and issues **encrypted versions (eSOL or eUSDC)**. Wrapping a different amount than you swap makes it harder to match the two by amount, but it does not hide that your wallet used the app.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Step 3: Prepare Your ZODL Wallet  
Download [**ZODL**](https://zodl.com), the Zcash wallet maintained by ZODL. On the Receive screen, copy your **Zcash Transparent Address** (it starts with t1). encrypt.trade does not accept shielded or unified addresses for ZEC at the moment. Save your seed phrase securely before proceeding.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Step 4: Swap  
Back on **encrypt.trade**, go to **Swap**. Select **eSOL/eUSDC -> ZEC**, paste your ZODL transparent address, review details, and confirm.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** handles the cross-chain routing and sends the **ZEC** to your ZODL wallet. It can take a few minutes. Near Intents suggests allowing up to 15 minutes for cross-chain swaps.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Step 5: Shield Your ZEC  
Once the ZEC arrives, use ZODL's **Shield** option to move it into the [shielded pool](/using-zcash/shielded-pools). Until then it sits at a transparent address where anyone can see the balance. Shielding protects what you do next, but the incoming transfer and the shielding transaction stay visible on chain. Always verify links, avoid reusing addresses, and test small amounts first.  

---

###  Who Is Involved and Where to Get Help  
- **encrypt.trade** is the app, run by JMD Labs Inc. Its [privacy policy](https://encrypt.trade/privacy) says it collects technical data such as IP, browser and device details, sends your wallet address, recent history and balances to compliance providers before a swap, and may keep logs and AML screening results for up to five years. Its [terms](https://encrypt.trade/terms) forbid using a VPN or proxy to hide your location. Support: help@encifher.io or the [Telegram group](https://t.me/+ZWHGMW4ZHXQwYTZl) linked from the app.
- **Near Intents** routes the cross-chain step and delivers the ZEC. See its [1Click API terms](https://docs.near-intents.org/security-compliance/terms-of-service) and the privacy policy at near.com/privacy, track swaps on the [Near Intents Explorer](https://explorer.near-intents.org), and ask for help in the [Near Intents Telegram](https://t.me/near_intents).

Terms and supported addresses can change, so check the current versions before a large swap. For more on the wider picture, see [Non-Custodial Exchanges](/using-zcash/non-custodial-exchanges).

---

By combining **Solana**, **Zcash** and **Near Intents**, **encrypt.trade** gives you a quick route from SOL or USDC into ZEC. It hides amounts on Solana but is not private end to end, so shield your ZEC once it lands.

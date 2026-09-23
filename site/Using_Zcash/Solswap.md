# **How to Swap for ZEC in Phantom Wallet**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

---

## **Native ZEC or a ZEC token?**

"ZEC" in Phantom can mean two different assets, so know which one you're paying for.

- **Phantom's built-in Swap button** gives you a token representation of ZEC on Solana (or another network Phantom supports). It is not native ZEC. It sits at your Phantom address, it has no Zcash shielded functionality, and a Zcash wallet can't see it or shield it.
- **Native ZEC** only exists on the Zcash blockchain and is sent to a Zcash address. To get it you need a service that asks for your Zcash address, like a swap inside [ZODL](https://zodl.com), one of the options on the [DEX page](/dex), or solswap.org followed by a withdrawal to your Zcash wallet (Step 8).

### Check before you pay

- **Network:** the ZEC you receive should be on the **Zcash** network. If it says Solana, Ethereum or Base, it's a token.
- **Asset:** native ZEC has no token contract or mint address. If yours shows one, it's a token. There are also plenty of look-alike "ZEC" tokens on Solana, so don't go by the name alone.
- **Address:** native ZEC goes to a Zcash address, which starts with `t1`, `u1` or `zs`. If the ZEC is being sent to your Phantom address, you're getting a token.

---

##  **Step 1: Open the Swap Interface**  
Launch the **Phantom app** and visit **[solswap.org](https://solswap.org/)** from the Phantom browser. The site runs on Near Intents and can send ZEC out to a Zcash address.  

Phantom's own **Swap** button also lists ZEC, but that gets you the token described above, not native ZEC.  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Step 2: Select Networks and Tokens for Depositing**  
- Choose your **source network** (e.g., *Ethereum* or *Solana*) then deposit for swapping.  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Select a base token like **SOL, USDT, or USDC**.  
- Choose **ZEC** as your **destination token**.  
- Ensure that Zcash is available through the swap interface.  



![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Step 3: Enter Amount & Review Quote**  
- Enter the amount you’d like to swap.  
- Phantom will display an **estimated receive amount** after fees.  


![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Step 4: Check Gas & Fees**  
- For **same-chain swaps**, ensure you have enough of the native gas token (*ETH for Ethereum, SOL for Solana*).  
- **Cross-chain swaps** require gas on both source and destination chains.  
- Review the fee breakdown:  
  - Phantom Fee: **0.85%**  
  - Network Gas  
  - Bridging Provider Fees (~**0.3%**)  
  
  
---

##  **Step 5: Adjust Settings (Optional)**  
Tap **Swap Settings** to:  
- Adjust **slippage** (default **0.3%**, adjustable up to 30%).  
- Increase **priority fees** on congested networks.  

---

##  **Step 6: Confirm Swap**  
- Review all swap details.  
- Tap **Swap Now** to initiate the transaction.  


![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Step 7: Monitor Status**  
- Track your swap in the **Recent Activity** tab.  
- For cross-chain swaps, use your **transaction ID** with **Li.Fi Scanner** for real-time updates. 


![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Step 8: Withdraw Native ZEC to Your Zcash Wallet**  
After the swap, your ZEC shows up in your solswap.org **Account** balance. It isn't on the Zcash network yet, and it isn't in Phantom either. To move it:  
- Open a Zcash wallet such as [ZODL](https://zodl.com) and copy your receiving address. The withdraw form accepts a transparent (`t1`) or unified (`u1`) address.  
- On solswap.org, go to **Account** and tap **Withdraw**.  
- Pick **ZEC**, set the network to **Zcash**, paste your address and double check it before you confirm.  

---

## **Next Steps**  
Once native ZEC is in your Zcash wallet, you can shield it with [this guide](/guides/using-zec-privately).  

A ZEC token bought with Phantom's Swap button can't be shielded this way, because it isn't on the Zcash network. You'd first need to swap it for native ZEC sent to a Zcash address.

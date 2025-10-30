# MetaMask Zcash Snap Integration Guide

For For a full walkthrough and visual explanation, watch this [**YouTube guide**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<iframe width="640" height="360" src="https://www.youtube.com/embed/UJh9Ilkohdw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



MetaMask now supports **shielded Zcash (ZEC)** via the **ChainSafe-developed Zcash Snap**, allowing you to send, receive, and manage private ZEC directly in your browser wallet. Audited by **Hacken** and listed in the **official MetaMask Snaps Directory**, it requires **no separate Zcash software** - only MetaMask and the Snap.

---

## **Prerequisites**


> [**MetaMask Extension**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (desktop only) - Chrome, Edge, or Firefox.
> MetaMask Account - Seed phrase secured; Snap derives Zcash keys from it.  
> Stable Internet Connection - For syncing with the Zcash network.  
> Funds - ETH to swap for ZEC or ZEC from an exchange.

> **Tip:** Protect your MetaMask recovery phrase - it controls both ETH and ZEC.

---

## **1. Install the Zcash Snap**

1. Go to the [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Search for [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) or [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Click **Install/Add to MetaMask**.
4. Approve permissions such as:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. (Optional) Add Zcash Network**

In MetaMask, choose **Add Network** and enter:

For **BNB SmartChain**;
```markdown
-  **Name**: BNB Smart Chain
-  **RPC URL**: https://bsc-dataseed.binance.org
-  **Chain ID**: 56
-  **Symbol**: BNB
-  **Block Explorer URL**: https://bscscan.com
```

For **Zcash Mainnet**;
- **Name:** Zcash Mainnet  
- **RPC URL:** `https://mainnet.lightwalletd.com:9067`  
- **Symbol:** ZEC  

This enables network info and explorer links.
![Add-a-custom-Net....](https://hackmd.io/_uploads/S1hq7f2Oel.png)


---

## **3. Connect to ChainSafe WebZjs Wallet**

1. Visit [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Click **Connect MetaMask Snap**.  

![Zcash-web-wallet](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. Approve the connection.  
4. View your Zcash account summary, including:
   - Unified addresses and Transparent address

![Account-summary-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. Wait for synchronization to complete.




---

## **4. Fund Your Wallet**

> **Swap ETH -> ZEC** - Use services like **LeoDex** and send to your shielded address.  
> **Exchange Withdrawal** - Withdraw purchased ZEC to your WebZjs shielded address.  

![LEODEX-SWAP](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> 🔒 Use shielded (z) addresses for **full privacy**.

---

## **5. Send / Receive ZEC**

1. In **WebZjs**, go to **Transfer Balance**.  
2. Enter:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. Confirm transaction in MetaMask (sign the transaction).  
5. Received funds will appear in WebZjs after confirmation.

---

## **6. Verify / Troubleshoot**

- Check **WebZjs** for updated balances **(MetaMask has not listed ZEC directly)** .  
- If issues occur:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Security Tip:** Only install the **audited ChainSafe Snap**; review permissions before approval.

---

## **7. Check Address Components**

1. Go to the **Receive** section - your Unified Address will be displayed by default.  
2. Copy the Unified Address and visit the [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Paste your Unified Address into the search bar.  
4. You will now see all the components of the Unified Address, which include:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **Additional Notes**

> Use the [**latest MetaMask version**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - public release supports Snaps.  
> Shielded proofs may take time, WebAssembly handles computation in-browser.  
> Recovery is simple,install MetaMask and the Snap, then import your existing seed.  
> The Snap defaults to **shielded ZEC**, transparent addresses are **not the focus**.  
> Use [zcashblockexplorer.com](https://zcashblockexplorer.com) for transaction confirmations.










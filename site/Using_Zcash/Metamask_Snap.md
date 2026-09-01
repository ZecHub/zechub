# MetaMask Zcash Snap Integration Guide

For a full walkthrough and visual explanation, watch this [**YouTube guide**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask now supports **shielded Zcash (ZEC)** via the **ChainSafe-developed Zcash Snap**, allowing you to send, receive, and manage private ZEC directly in your browser wallet. Audited by **Hacken** and listed in the **official MetaMask Snaps Directory**, it requires **no separate Zcash software** - only MetaMask and the Snap. ChainSafe describes the design and its funding, from Zcash Community Grants and the MetaMask Grants DAO, in [Zcash in the browser: bringing shielded ZEC to MetaMask](https://blog.chainsafe.io/zcash-in-the-browser-bringing-shielded-zec-to-metamask/).

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

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Optional) Add BNB Smart Chain**

MetaMask's **Add Network** dialog only accepts EVM chains, so it cannot be used to add Zcash. Zcash support comes from the Snap you installed in step 1. If you want BNB Smart Chain available for swapping into ZEC, add it here:

```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
This enables network info and explorer links.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

> **There is no Zcash network to add here.** An earlier version of this page listed a "Zcash Mainnet" entry with an RPC URL of `mainnet.lightwalletd.com:9067`. That host no longer resolves, and the entry could not have worked regardless: a lightwalletd server speaks gRPC, not the EVM JSON-RPC that MetaMask's Add Network expects.
>
> The Snap reaches Zcash through a lightwalletd gRPC-web proxy hosted by ChainSafe at `zcash-mainnet.chainsafe.dev`, which forwards to the [zec.rocks](https://zec.rocks) lightwalletd service, run by @emersonian and funded by Zcash Community Grants. You do not configure this yourself. Per the [WebZjs documentation](https://github.com/ChainSafe/WebZjs), an unproxied endpoint such as `https://zec.rocks` will not work from a browser, so substituting one by hand will not help.

---

## **3. Connect to ChainSafe WebZjs Wallet**

1. Visit [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  

> **Note:** this host was returning HTTP 503 when this page was last checked. The Snap itself is still maintained, so if the hosted wallet is unavailable you can run the WebZjs web wallet locally from the [ChainSafe/WebZjs](https://github.com/ChainSafe/WebZjs) repository.

2. Click **Connect MetaMask Snap**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Approve the connection.  
4. View your Zcash account summary, including:
   - Unified addresses and Transparent address

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Wait for synchronization to complete.




---

## **4. Fund Your Wallet**

> **Swap ETH -> ZEC** - Use services like **LeoDex** and send to your shielded address.  
> **Exchange Withdrawal** - Withdraw purchased ZEC to your WebZjs shielded address.  

![LEODEX-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Use shielded (z) addresses for **full privacy**.

---

## **5. Send / Receive ZEC**

1. In **WebZjs**, go to **Transfer Balance**.  
2. Enter:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Confirm transaction in MetaMask (sign the transaction).  
5. Received funds will appear in WebZjs after confirmation.

---

## **6. Verify / Troubleshoot**

> Check **WebZjs** for updated balances **(MetaMask has not listed ZEC directly)** .  
> If issues occur:
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

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Additional Notes**

> Use the [**latest MetaMask version**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - public release supports Snaps.  
> Shielded proofs may take time, WebAssembly handles computation in-browser.  
> Recovery is simple,install MetaMask and the Snap, then import your existing seed.  
> The Snap defaults to **shielded ZEC**, transparent addresses are **not the focus**.  
> Use [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) for transaction confirmations.












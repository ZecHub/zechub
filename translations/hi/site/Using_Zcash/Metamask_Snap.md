# MetaMask Zcash Snap एकीकरण मार्गदर्शिका

पूर्ण चरण-दर-चरण मार्गदर्शन और दृश्य व्याख्या के लिए यह [**YouTube गाइड**](https://www.youtube.com/watch?v=UJh9Ilkohdw) देखें: 

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
     

MetaMask अब **shielded Zcash (ZEC)** को **ChainSafe द्वारा विकसित Zcash Snap** के माध्यम से सपोर्ट करता है, जिससे आप सीधे अपने browser wallet में private ZEC भेज, प्राप्त और प्रबंधित कर सकते हैं। इसे **Hacken** द्वारा audited किया गया है और यह **official MetaMask Snaps Directory** में सूचीबद्ध है। इसके लिए **अलग से किसी Zcash software** की आवश्यकता नहीं है - केवल MetaMask और Snap चाहिए।

---

## **पूर्वापेक्षाएँ**


> [**MetaMask Extension**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (केवल desktop) - Chrome, Edge, या Firefox।
> MetaMask खाता - Seed phrase सुरक्षित हो; Snap इसी से Zcash keys बनाता है।  
> स्थिर इंटरनेट कनेक्शन - Zcash network के साथ sync करने के लिए।  
> फंड्स - ZEC के लिए swap करने हेतु ETH, या किसी exchange से ZEC।

> **सुझाव:** अपनी MetaMask recovery phrase को सुरक्षित रखें - यह आपके ETH और ZEC दोनों को नियंत्रित करती है।

---

## **1. Zcash Snap इंस्टॉल करें**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) पर जाएँ।  
2. [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) या [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) खोजें।  
3. **Install/Add to MetaMask** पर क्लिक करें।
4. निम्न जैसी permissions को approve करें:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


---

## **2. (वैकल्पिक) Zcash Network जोड़ें**

MetaMask में **Add Network** चुनें और यह दर्ज करें:

**BNB SmartChain** के लिए;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
इससे network जानकारी और explorer links सक्षम हो जाएँगे।
![Add-a-custom-Net....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

**Zcash Mainnet** के लिए;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. ChainSafe WebZjs Wallet से कनेक्ट करें**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev) पर जाएँ।  
2. **Connect MetaMask Snap** पर क्लिक करें।  

![Zcash-web-wallet](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. कनेक्शन को approve करें।  
4. अपने Zcash खाते का सारांश देखें, जिसमें शामिल हैं:
   - Unified addresses और Transparent address

![Account-summary-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. synchronization पूरा होने की प्रतीक्षा करें。




---

## **4. अपने Wallet में फंड जोड़ें**

> **ETH -> ZEC swap करें** - **LeoDex** जैसी सेवाओं का उपयोग करें और अपनी shielded address पर भेजें।  
> **Exchange Withdrawal** - खरीदे गए ZEC को अपने WebZjs shielded address पर withdraw करें।  

![LEODEX-SWAP](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => **पूर्ण गोपनीयता** के लिए shielded (z) addresses का उपयोग करें।

---

## **5. ZEC भेजें / प्राप्त करें**

1. **WebZjs** में **Transfer Balance** पर जाएँ।  
2. यह दर्ज करें:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](https://hackmd.io/_uploads/rkvcFfhdex.png)

4. MetaMask में transaction की पुष्टि करें (transaction sign करें)।  
5. पुष्टि के बाद प्राप्त फंड्स WebZjs में दिखाई देंगे।

---

## **6. सत्यापित करें / समस्या निवारण**

> अपडेटेड balances के लिए **WebZjs** जाँचें **(MetaMask ने अभी तक ZEC को सीधे सूचीबद्ध नहीं किया है)** ।  
> यदि समस्याएँ हों:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **सुरक्षा सुझाव:** केवल **audited ChainSafe Snap** ही इंस्टॉल करें; approve करने से पहले permissions की समीक्षा करें।

---

## **7. Address के घटक जाँचें**

1. **Receive** सेक्शन में जाएँ - आपका Unified Address डिफ़ॉल्ट रूप से प्रदर्शित होगा।  
2. Unified Address को कॉपी करें और [Zcash Block Explorer](https://mainnet.zcashexplorer.app/) पर जाएँ।  
3. अपने Unified Address को search bar में पेस्ट करें।  
4. अब आपको Unified Address के सभी घटक दिखाई देंगे, जिनमें शामिल हैं:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](https://hackmd.io/_uploads/SyPR2f2_gg.png)



---

## **अतिरिक्त टिप्पणियाँ**

> [**MetaMask का नवीनतम संस्करण**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) उपयोग करें - public release Snaps को सपोर्ट करती है।  
> Shielded proofs में समय लग सकता है, WebAssembly browser के भीतर computation संभालता है।  
> Recovery सरल है, MetaMask और Snap इंस्टॉल करें, फिर अपनी मौजूदा seed import करें।  
> Snap डिफ़ॉल्ट रूप से **shielded ZEC** पर केंद्रित है, transparent addresses **मुख्य फोकस नहीं हैं**।  
> transaction confirmations के लिए [zcashblockexplorer.com](https://zcashblockexplorer.com) का उपयोग करें।

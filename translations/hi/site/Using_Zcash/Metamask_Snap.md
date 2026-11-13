<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# MetaMask Zcash Snap इंटीग्रेशन गाइड

> MetaMask ब्राउज़र एक्सटेंशन से शील्डेड (shielded) ZEC रखें और भेजें। इसके लिए ChainSafe के Zcash Snap और WebZjs वेब वॉलेट (wallet) का उपयोग होता है।

## संक्षेप में

* ChainSafe Zcash Snap डेस्कटॉप (Chrome, Edge, Firefox) पर MetaMask में शील्डेड ZEC जोड़ता है। अलग से Zcash सॉफ़्टवेयर की ज़रूरत नहीं है।
* आपकी Zcash कीज़ आपके MetaMask रिकवरी फ्रेज़ से बनाई जाती हैं। अब वही एक फ्रेज़ आपके ETH और आपके ZEC दोनों की सुरक्षा करता है।
* आप ZEC को webzjs.chainsafe.dev पर WebZjs वॉलेट से मैनेज करते हैं, MetaMask की अपनी एसेट सूची में नहीं।
* आपके अकाउंट को एक यूनिफ़ाइड एड्रेस (address) मिलता है, ताकि भेजने वाले आपको उस सबसे निजी पूल (pool) में भुगतान करें जिसे वे सपोर्ट करते हैं।
* इसमें फ़ंड डालने के लिए स्वैप (swap) करें (उदाहरण के लिए ETH से ZEC) या किसी एक्सचेंज (exchange) से अपने शील्डेड एड्रेस पर ZEC निकालें।
* रिकवरी: MetaMask और Snap को फिर से इंस्टॉल करें, फिर अपना मौजूदा रिकवरी फ्रेज़ इम्पोर्ट करें।

## मुख्य जानकारी

MetaMask Snap एक छोटा, सैंडबॉक्स किया हुआ ऐड-ऑन है जो MetaMask को एक नया ब्लॉकचेन (blockchain) सिखाता है। ChainSafe द्वारा बनाया गया और Hacken द्वारा ऑडिट किया गया Zcash Snap, MetaMask को आपके मौजूदा रिकवरी फ्रेज़ से Zcash कीज़ बनाने और Zcash लेनदेन (transaction) साइन करने देता है।

MetaMask खुद ZEC बैलेंस नहीं दिखाता। इसके बजाय WebZjs वेब वॉलेट Snap से कनेक्ट होता है, lightwalletd सर्वर के ज़रिए Zcash नेटवर्क के साथ सिंक करता है, और आपके एड्रेस और बैलेंस दिखाता है। शील्डेड प्रूफ (proof) आपके ब्राउज़र में WebAssembly से कंप्यूट किए जाते हैं, इसलिए भेजने में थोड़ा समय लग सकता है।

नीचे दिए गए स्टेप में Snap इंस्टॉल करना, WebZjs कनेक्ट करना, वॉलेट में फ़ंड डालना, भेजना और प्राप्त करना, और अपने यूनिफ़ाइड एड्रेस के हिस्सों की जाँच शामिल है।

## पूरी गाइड

पूरे वॉकथ्रू और विज़ुअल व्याख्या के लिए यह [**YouTube गाइड**](https://www.youtube.com/watch?v=UJh9Ilkohdw) देखें: 

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
     

MetaMask अब **ChainSafe द्वारा विकसित Zcash Snap** के ज़रिए **शील्डेड Zcash (ZEC)** को सपोर्ट करता है। इससे आप अपने ब्राउज़र वॉलेट में सीधे निजी ZEC भेज, प्राप्त और मैनेज कर सकते हैं। **Hacken** द्वारा ऑडिट किया गया और **आधिकारिक MetaMask Snaps Directory** में सूचीबद्ध, इसके लिए **अलग से Zcash सॉफ़्टवेयर की ज़रूरत नहीं है** - केवल MetaMask और Snap चाहिए।

---

## **ज़रूरी चीज़ें**


> [**MetaMask एक्सटेंशन**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (केवल डेस्कटॉप) - Chrome, Edge या Firefox।
> MetaMask अकाउंट - सीड फ्रेज़ (seed phrase) सुरक्षित रखा हुआ हो; Snap इसी से Zcash कीज़ बनाता है।  
> स्थिर इंटरनेट कनेक्शन - Zcash नेटवर्क के साथ सिंक करने के लिए।  
> फ़ंड - ZEC में स्वैप करने के लिए ETH या किसी एक्सचेंज से ZEC।

> **सुझाव:** अपने MetaMask रिकवरी फ्रेज़ को सुरक्षित रखें - यह ETH और ZEC दोनों को नियंत्रित करता है।

---

## **1. Zcash Snap इंस्टॉल करें**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) पर जाएँ।  
2. [**“Zcash Shielded Wallet”**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) या [**“WebZjs Zcash Snap”**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) खोजें।  
3. **Install/Add to MetaMask** पर क्लिक करें।
4. इस तरह की अनुमतियाँ स्वीकार करें:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (वैकल्पिक) Zcash नेटवर्क जोड़ें**

MetaMask में **Add Network** चुनें और यह दर्ज करें:

**BNB SmartChain** के लिए;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
इससे नेटवर्क की जानकारी और एक्सप्लोरर लिंक उपलब्ध होते हैं।
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

**Zcash Mainnet** के लिए;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` एक WebZjs-संगत (gRPC-web) lightwalletd सर्वर है जिसे [zec.rocks](https://zec.rocks) (@emersonian) चलाते हैं। टेस्टनेट के लिए `https://zjs.zec.rocks/testnet` का उपयोग करें। अगर आप WebZjs वेब वॉलेट खुद चलाते हैं, तो `LIGHTWALLETD_PROXY` के रूप में यही वैल्यू सेट करें।

---

## **3. ChainSafe WebZjs वॉलेट से कनेक्शन**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev) पर जाएँ।  
2. **Connect MetaMask Snap** पर क्लिक करें।  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. कनेक्शन स्वीकार करें।  
4. अपने Zcash अकाउंट का सारांश देखें, जिसमें शामिल हैं:
   - यूनिफ़ाइड एड्रेस और ट्रांसपेरेंट (transparent) एड्रेस

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. सिंक्रोनाइज़ेशन पूरा होने तक प्रतीक्षा करें।




---

## **4. अपने वॉलेट में फ़ंड डालें**

> **ETH -> ZEC स्वैप** - **LeoDex** जैसी सेवाओं का उपयोग करें और अपने शील्डेड एड्रेस पर भेजें।  
> **एक्सचेंज से निकासी** - खरीदे गए ZEC को अपने WebZjs शील्डेड एड्रेस पर निकालें।  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => **पूरी गोपनीयता (privacy)** के लिए शील्डेड (z) एड्रेस का उपयोग करें।

---

## **5. ZEC भेजें / प्राप्त करें**

1. **WebZjs** में **Transfer Balance** पर जाएँ।  
2. यह दर्ज करें:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. MetaMask में लेनदेन की पुष्टि करें (लेनदेन साइन करें)।  
5. प्राप्त फ़ंड पुष्टि के बाद WebZjs में दिखाई देंगे।

---

## **6. जाँच / समस्या समाधान**

> अपडेट हुए बैलेंस के लिए **WebZjs** देखें **(MetaMask ने ZEC को सीधे सूचीबद्ध नहीं किया है)**।  
> अगर कोई समस्या आए:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **सुरक्षा सुझाव:** केवल **ऑडिट किया हुआ ChainSafe Snap** ही इंस्टॉल करें; स्वीकार करने से पहले अनुमतियों की समीक्षा करें।

---

## **7. एड्रेस के घटकों की जाँच**

1. **Receive** सेक्शन पर जाएँ - आपका यूनिफ़ाइड एड्रेस डिफ़ॉल्ट रूप से दिखाई देगा।  
2. यूनिफ़ाइड एड्रेस कॉपी करें और [Zcash ब्लॉक एक्सप्लोरर](https://mainnet.zcashexplorer.app/) पर जाएँ।  
3. अपना यूनिफ़ाइड एड्रेस सर्च बार में पेस्ट करें।  
4. अब आपको यूनिफ़ाइड एड्रेस के सभी घटक दिखाई देंगे, जिनमें शामिल हैं:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **अतिरिक्त जानकारी**

> [**नवीनतम MetaMask वर्ज़न**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) का उपयोग करें - सार्वजनिक रिलीज़ Snaps को सपोर्ट करती है।  
> शील्डेड प्रूफ में समय लग सकता है, WebAssembly ब्राउज़र में ही कंप्यूटेशन करता है।  
> रिकवरी आसान है: MetaMask और Snap इंस्टॉल करें, फिर अपना मौजूदा सीड इम्पोर्ट करें।  
> Snap डिफ़ॉल्ट रूप से **शील्डेड ZEC** का उपयोग करता है, ट्रांसपेरेंट एड्रेस **मुख्य फ़ोकस नहीं हैं**।  
> लेनदेन की पुष्टि के लिए [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) का उपयोग करें।

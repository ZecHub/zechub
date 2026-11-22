<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# MetaMask Zcash Snap इंटीग्रेशन गाइड

> MetaMask ब्राउज़र एक्सटेंशन से ChainSafe के Zcash Snap और WebZjs वेब वॉलेट का उपयोग करके शील्डेड ZEC रखें और भेजें।

## संक्षेप में

* ChainSafe Zcash Snap डेस्कटॉप पर MetaMask (Chrome, Edge, Firefox) में शील्डेड ZEC जोड़ता है। अलग Zcash सॉफ़्टवेयर की ज़रूरत नहीं है।
* आपकी Zcash कुंजियाँ आपके MetaMask रिकवरी फ्रेज़ से व्युत्पन्न होती हैं। अब वही फ्रेज़ आपके ETH और ZEC, दोनों की सुरक्षा करता है।
* आप ZEC को WebZjs वॉलेट के ज़रिए webzjs.chainsafe.dev पर प्रबंधित करते हैं, MetaMask की अपनी एसेट सूची में नहीं।
* आपके अकाउंट को एक यूनिफ़ाइड एड्रेस मिलता है, इसलिए भेजने वाले आपको उस सबसे निजी पूल में भुगतान करते हैं जिसका वे समर्थन करते हैं।
* स्वैप करके (उदाहरण के लिए, ETH को ZEC में) या किसी एक्सचेंज से ZEC निकालकर अपने शील्डेड एड्रेस पर इसे फ़ंड करें।
* रिकवरी: MetaMask और Snap फिर से इंस्टॉल करें, फिर अपना मौजूदा रिकवरी फ्रेज़ इंपोर्ट करें।

## मुख्य जानकारी

MetaMask Snap एक छोटा, सैंडबॉक्स में चलने वाला ऐड-ऑन है, जो MetaMask को एक नया ब्लॉकचेन इस्तेमाल करना सिखाता है। ChainSafe द्वारा बनाया गया और Hacken द्वारा ऑडिट किया गया Zcash Snap, MetaMask को आपके मौजूदा रिकवरी फ्रेज़ से Zcash कुंजियाँ व्युत्पन्न करने और Zcash लेनदेन पर हस्ताक्षर करने देता है।

MetaMask खुद ZEC बैलेंस नहीं दिखाता। इसके बजाय, WebZjs वेब वॉलेट Snap से कनेक्ट होता है, lightwalletd सर्वर के ज़रिए Zcash नेटवर्क के साथ सिंक होता है और आपके एड्रेस व बैलेंस दिखाता है। शील्डेड प्रूफ़ आपके ब्राउज़र में WebAssembly के साथ कैलकुलेट किए जाते हैं, इसलिए भेजने में थोड़ा समय लग सकता है।

नीचे दिए गए चरणों में Snap इंस्टॉल करना, WebZjs कनेक्ट करना, वॉलेट में फ़ंड डालना, भेजना और प्राप्त करना, तथा अपने यूनिफ़ाइड एड्रेस के हिस्सों की जाँच करना शामिल है।

## पूरी गाइड

पूरी प्रक्रिया और उसके दृश्य विवरण के लिए यह [**YouTube गाइड**](https://www.youtube.com/watch?v=UJh9Ilkohdw) देखें:

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
     

MetaMask अब **शील्डेड Zcash (ZEC)** का समर्थन करता है। यह **ChainSafe द्वारा विकसित Zcash Snap** के ज़रिए संभव है, जिससे आप सीधे अपने ब्राउज़र वॉलेट में निजी ZEC भेज, प्राप्त और प्रबंधित कर सकते हैं। **Hacken** द्वारा ऑडिट किया गया और **आधिकारिक MetaMask Snaps Directory** में सूचीबद्ध, इसे **अलग Zcash सॉफ़्टवेयर** की ज़रूरत नहीं है—केवल MetaMask और Snap चाहिए।

---

## **आवश्यकताएँ**


> [**MetaMask एक्सटेंशन**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (केवल डेस्कटॉप) - Chrome, Edge या Firefox।
> MetaMask अकाउंट - सीड फ्रेज़ सुरक्षित रखें; Snap इससे Zcash कुंजियाँ व्युत्पन्न करता है।  
> स्थिर इंटरनेट कनेक्शन - Zcash नेटवर्क के साथ सिंक करने के लिए।  
> फ़ंड - ZEC के लिए स्वैप करने हेतु ETH या किसी एक्सचेंज से ZEC।

> **सुझाव:** अपने MetaMask रिकवरी फ्रेज़ को सुरक्षित रखें - यह ETH और ZEC, दोनों को नियंत्रित करता है।

---

## **1. Zcash Snap इंस्टॉल करें**

1. [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) पर जाएँ।  
2. [**“Zcash WebZjs Wallet”**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) या [**“WebZjs Zcash Snap”**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) खोजें।  
3. **Install/Add to MetaMask** पर क्लिक करें।
4. इन जैसी अनुमतियों को मंज़ूरी दें:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (वैकल्पिक) Zcash नेटवर्क जोड़ें**

MetaMask में **Add Network** चुनें और ये जानकारी भरें:

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

**Zcash मेननेट** के लिए;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` एक WebZjs-संगत (gRPC-web) lightwalletd सर्वर है, जिसे [zec.rocks](https://zec.rocks) (@emersonian) चलाते हैं। टेस्टनेट के लिए `https://zjs.zec.rocks/testnet` का उपयोग करें। यदि आप WebZjs वेब वॉलेट खुद चलाते हैं, तो `LIGHTWALLETD_PROXY` के रूप में यही मान सेट करें।

---

## **3. ChainSafe WebZjs वॉलेट से कनेक्ट करें**

1. [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev) पर जाएँ।  
2. **Connect MetaMask Snap** पर क्लिक करें।  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. कनेक्शन को मंज़ूरी दें।  
4. अपने Zcash अकाउंट का सारांश देखें, जिसमें शामिल हैं:
   - यूनिफ़ाइड एड्रेस और ट्रांसपेरेंट एड्रेस

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. सिंक्रोनाइज़ेशन पूरा होने तक प्रतीक्षा करें।




---

## **4. अपने वॉलेट में फ़ंड डालें**

> **ETH को ZEC में स्वैप करें** - **LeoDex** जैसी सेवाओं का उपयोग करें और फ़ंड अपने शील्डेड एड्रेस पर भेजें।  
> **एक्सचेंज से निकासी** - खरीदे गए ZEC को अपने WebZjs शील्डेड एड्रेस पर निकालें।  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => **पूरी गोपनीयता** के लिए शील्डेड (z) एड्रेस का उपयोग करें।

---

## **5. ZEC भेजें / प्राप्त करें**

1. **WebZjs** में **Transfer Balance** पर जाएँ।  
2. यह जानकारी भरें:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. MetaMask में लेनदेन की पुष्टि करें (लेनदेन पर हस्ताक्षर करें)।  
5. पुष्टि के बाद प्राप्त फ़ंड WebZjs में दिखेंगे।

---

## **6. जाँच करें / समस्या निवारण**

> अपडेट किए गए बैलेंस के लिए **WebZjs** देखें **(MetaMask ने ZEC को सीधे सूचीबद्ध नहीं किया है)**।  
> समस्या आने पर:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **सुरक्षा सुझाव:** केवल **ऑडिट किए गए ChainSafe Snap** इंस्टॉल करें; मंज़ूरी देने से पहले अनुमतियाँ देखें।

---

## **7. एड्रेस के हिस्से जाँचें**

1. **Receive** सेक्शन में जाएँ - आपका यूनिफ़ाइड एड्रेस डिफ़ॉल्ट रूप से दिखेगा।  
2. यूनिफ़ाइड एड्रेस कॉपी करें और [Zcash Block Explorer](https://mainnet.zcashexplorer.app/) पर जाएँ।  
3. खोज बार में अपना यूनिफ़ाइड एड्रेस पेस्ट करें।  
4. अब आपको यूनिफ़ाइड एड्रेस के सभी हिस्से दिखेंगे, जिनमें शामिल हैं:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **अतिरिक्त नोट्स**

> [**नवीनतम MetaMask संस्करण**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) का उपयोग करें - सार्वजनिक रिलीज़ Snaps का समर्थन करती है।  
> शील्डेड प्रूफ़ में समय लग सकता है; WebAssembly गणना ब्राउज़र में करता है।  
> रिकवरी आसान है: MetaMask और Snap इंस्टॉल करें, फिर अपना मौजूदा सीड इंपोर्ट करें।  
> Snap डिफ़ॉल्ट रूप से **शील्डेड ZEC** पर सेट है; ट्रांसपेरेंट एड्रेस **मुख्य फ़ोकस नहीं हैं**।  
> लेनदेन की पुष्टि के लिए [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) का उपयोग करें।

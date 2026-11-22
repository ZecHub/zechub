<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash भुगतान अनुरोध URI

## संक्षेप में

* भुगतान अनुरोध URI (payment request URI) एक लिंक है जो `zcash:` से शुरू होता है और भुगतान (payment) का विवरण रखता है: एड्रेस (address), राशि, और एक वैकल्पिक मेमो (memo)।
* इसे QR कोड या क्लिक करने योग्य लिंक के रूप में साझा किया जाता है, और इससे आपका वॉलेट (wallet) आपके लिए भुगतान का विवरण अपने-आप भर देता है। आप विवरण जाँचते हैं और स्वीकृति देते हैं।
* [ZIP 321](https://zips.z.cash/zip-0321) इसका फ़ॉर्मेट तय करता है। इसकी शुरुआत Bitcoin के BIP 21 से हुई।
* एक ही अनुरोध एक ही लेनदेन (transaction) में कई प्राप्तकर्ताओं को भुगतान कर सकता है।
* ZecHub एक भुगतान विजेट और एक जनरेटर उपलब्ध कराता है, ताकि कोई दुकान URI को हाथ से लिखे बिना Zcash भुगतान बटन जोड़ सके।

## मुख्य व्याख्या

भुगतान अनुरोध URI एक `zcash:` लिंक है, जिसे [ZIP 321](https://zips.z.cash/zip-0321) में परिभाषित किया गया है। संगत वॉलेट लिंक या QR से एड्रेस, राशि और वैकल्पिक मेमो पढ़ते हैं और लेनदेन का विवरण पहले से भर देते हैं। न कोई अतिरिक्त खाता चाहिए, न बीच में कोई प्रोसेसर।

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    भुगतान विजेट खोलें
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    भुगतान अनुरोध बनाएँ
  </a>
</div>

विजेट डेमो एक लाइव ZIP-321 मोडल है: QR, एड्रेस/URI कॉपी करने का विकल्प, छोटा लिंक, और “वॉलेट में खोलें”। अगर आप पहले अपना एड्रेस और राशि तय करना चाहते हैं, तो उपकरण (tools) पेज जनरेटर का काम करता है।

### संरचना

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| फ़ील्ड | आवश्यक | नोट |
| --- | --- | --- |
| address | हाँ | यूनिफाइड एड्रेस (Unified Address) को प्राथमिकता दें (`u1` / `utest1`) |
| amount | नहीं | दशमलव ZEC, जिसमें `.` विभाजक हो और अधिकतम 8 दशमलव स्थान हों (`0.5`, न कि `0,5`) |
| memo | नहीं | केवल शील्डेड (shielded) एड्रेस के लिए। मेमो के UTF-8 बाइट (अधिकतम 512), `=` पैडिंग के बिना base64url में एन्कोड किए हुए: `Thanks!` बदलकर `VGhhbmtzIQ` बन जाता है, सादा टेक्स्ट नहीं |
| label | नहीं | मनुष्य द्वारा पढ़ा जा सकने वाला नाम, जिसे कुछ वॉलेट दिखाते हैं। स्पेस और आरक्षित अक्षरों को परसेंट-एन्कोड करें (`Coffee%20shop`); `+` का अर्थ शाब्दिक प्लस है, स्पेस नहीं |

पूरे नियम: [ZIP 321](https://zips.z.cash/zip-0321)।

### उपयोग के मामले

- चेकआउट: कीमत और ऑर्डर का मेमो पहले से भरें, ताकि ग्राहक को अपने वॉलेट में केवल पुष्टि करनी पड़े
- इनवॉइस: एक लिंक या QR साझा करें
- दान: किसी साइट पर विजेट एम्बेड करें
- P2P: चैट में `zcash:` लिंक भेजें

### किसी साइट पर एम्बेड

इस स्क्रिप्ट में अपना शील्डेड एड्रेस डालें। होस्ट की गई प्रति ZecHub पर उपलब्ध है:

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

आवश्यक: `data-address`, `data-amount`, `data-target`।

पहले होस्ट किया गया बटन आज़माएँ: [भुगतान विजेट खोलें](/zcash-payment-uri)।

### वीडियो

Zcash के साथ भुगतान अनुरोध कैसे बनाएँ:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

अपनी वेबसाइट पर Zcash दान विजेट जोड़ना:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## दृश्य / उपमा

बैंक ट्रांसफ़र के एक फ़ॉर्म की कल्पना करें, जिसमें खाता संख्या, राशि, और भुगतान किस लिए है यह बताने वाली एक टिप्पणी के लिए फ़ील्ड हों। इसे हाथ से भरना धीमा है, और एक भी गलत अंक पैसे को गलत जगह भेज देता है।

भुगतान अनुरोध URI वही फ़ॉर्म है, जिसे दुकान ने भर दिया है। QR कोड उस फ़ॉर्म की एक तस्वीर है। आपके फ़ोन का कैमरा तस्वीर पढ़ता है, वॉलेट हर फ़ील्ड को उसकी जगह पर कॉपी कर देता है, और आप संख्याएँ जाँचकर हस्ताक्षर करते हैं।

वेब पेज पर दिया गया लिंक भी यही काम करता है। उस पर क्लिक करने से भरा हुआ फ़ॉर्म आपके वॉलेट को मिल जाता है।

## गहराई से

### एक वास्तविक उदाहरण

यह ZIP 321 से लिया गया एक उदाहरण है, जो टेस्टनेट (testnet) के लिए लिखा गया है:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

यह एक शील्डेड Sapling एड्रेस पर 1 ZEC का अनुरोध करता है। मेमो डिकोड होकर “This is a simple memo.” बनता है। संदेश “Thank you for your purchase” वह टेक्स्ट है जिसे वॉलेट स्क्रीन पर दिखाता है।

### वे नियम जिन्हें वॉलेट जाँचता है

राशि का फ़ॉर्मेट सख़्त है। `amount=0.5` और `amount=50` मान्य हैं। `amount=50,000.00`, `amount=.5`, और `amount=0.123456789` अमान्य हैं: केवल पूर्ण विराम (period) ही दशमलव विभाजक है, और उसके बाद अधिकतम 8 अंक हो सकते हैं। कोई भी राशि 21,000,000 ZEC से अधिक नहीं हो सकती।

कच्चे URI में मेमो base64url में एन्कोड होता है, और डिकोड होने के बाद इसमें अधिकतम 512 बाइट आ सकते हैं। ट्रांसपेरेंट (transparent) एड्रेस के साथ जोड़ा गया मेमो पूरे अनुरोध को अमान्य बना देता है, क्योंकि ट्रांसपेरेंट एड्रेस मेमो नहीं ले जा सकते। Sprout एड्रेस की बिल्कुल अनुमति नहीं है, और जो अनुरोध ZIP 321 के व्याकरण का पालन नहीं करता, उसे अस्वीकार किया जाना चाहिए।

ऊपर दी गई तालिका के अलावा दो और फ़ील्ड मौजूद हैं। `message` भुगतान का विवरण है, जिसे वॉलेट दिखाता है। `req-asset` कस्टम एसेट (Custom Assets) के लिए आरक्षित है, जैसा कि ZIP 227 में परिभाषित है।

### एक साथ कई लोगों को भुगतान

हर अतिरिक्त भुगतान के पैरामीटर नामों में एक इंडेक्स संख्या जोड़ी जाती है, उदाहरण के लिए `address.1`, `amount.1` और `memo.1`। वॉलेट एक ही लेनदेन बनाता है जो सूची में शामिल सभी को भुगतान करता है। यह ऐसे चेकआउट के लिए उपयोगी है जो भुगतान को बाँटता है, या एक साथ भेजे गए दानों के समूह के लिए।

### यह फ़ॉर्मेट कहाँ से आया

भुगतान अनुरोधों के लिए Bitcoin के दो पुराने मानक हैं: BIP 21, एक प्राप्तकर्ता के लिए एक सरल लिंक, और BIP 70, जटिल भुगतानों के लिए एक भारी प्रोटोकॉल। ZIP 321 बीच का रास्ता अपनाता है: एक लिंक फ़ॉर्मेट, जिसमें कई प्राप्तकर्ताओं के लिए जगह है। इस पर चर्चा 2018 में Zcash ZIPs रिपॉज़िटरी में शुरू हुई, जहाँ BIP 21 की झलक देने के लिए संख्या 321 चुनी गई, और ZIP स्वयं अगस्त 2020 में बनाया गया।

## संबंधित पेज

- [मेमो](/using-zcash/memos): भुगतान अनुरोध में मेमो फ़ील्ड किस लिए है।
- [भुगतान प्रोसेसर](/using-zcash/payment-processors): वे सेवाएँ जो दुकानों के लिए भुगतान संभालती हैं।
- [वॉलेट](/using-zcash/wallets): इन लिंक को पढ़ने वाले वॉलेट खोजने के लिए “भुगतान अनुरोध” फ़िल्टर का उपयोग करें।
- [Zcash शील्डेड एसेट](/zcash-tech/zcash-shielded-assets): वे कस्टम एसेट जिनका उल्लेख `req-asset` करता है।
- [Zcash TEX एड्रेस क्या हैं?](/using-zcash/transparent-exchange-addresses): एड्रेस से जुड़ा एक और नियम, जिसे आपका वॉलेट भुगतान करने से पहले पढ़ता है।

**अंतिम अपडेट:** अक्टूबर 2026

<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash भुगतान अनुरोध URI

## संक्षेप में

* भुगतान अनुरोध URI एक लिंक है जो `zcash:` से शुरू होता है और भुगतान का विवरण रखता है: पता, राशि और एक वैकल्पिक मेमो।
* QR कोड या क्लिक करने योग्य लिंक के रूप में साझा किए जाने पर, यह आपके wallet को आपके लिए भुगतान भरने देता है। आप विवरण जांचते हैं और स्वीकृति देते हैं।
* [ZIP 321](https://zips.z.cash/zip-0321) प्रारूप को परिभाषित करता है। यह Bitcoin के BIP 21 से विकसित हुआ है।
* एक अनुरोध एक ही transaction में कई प्राप्तकर्ताओं को भुगतान कर सकता है।
* ZecHub एक भुगतान widget और generator होस्ट करता है, इसलिए कोई दुकान हाथ से URI लिखे बिना Zcash भुगतान बटन जोड़ सकती है।

## मुख्य व्याख्या

भुगतान अनुरोध URI एक `zcash:` लिंक है, जिसे [ZIP 321](https://zips.z.cash/zip-0321) द्वारा परिभाषित किया गया है। संगत wallets लिंक या QR से पता, राशि और वैकल्पिक मेमो पढ़ते हैं और transaction को पहले से भर देते हैं। किसी अतिरिक्त खाते या बीच में processor की आवश्यकता नहीं होती।

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    भुगतान widget खोलें
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    भुगतान अनुरोध बनाएं
  </a>
</div>

widget डेमो एक लाइव ZIP-321 modal है: QR, पता/URI कॉपी करना, छोटा लिंक और Wallet में खोलें। यदि आप पहले अपना पता और राशि तय करना चाहते हैं, तो tools पेज generator है।

### संरचना

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| फ़ील्ड | आवश्यक | टिप्पणियाँ |
| --- | --- | --- |
| address | हाँ | Unified Address (`u1` / `utest1`) को प्राथमिकता दें |
| amount | नहीं | विभाजक के रूप में `.` और अधिकतम 8 दशमलव स्थानों के साथ दशमलव ZEC (`0.5`, `0,5` नहीं) |
| memo | नहीं | केवल shielded पते। मेमो के UTF-8 bytes (अधिकतम 512), `=` padding के बिना base64url-encoded: `Thanks!`, सादा पाठ नहीं, `VGhhbmtzIQ` बनता है |
| label | नहीं | कुछ wallets द्वारा दिखाया जाने वाला मानव-पठनीय नाम। रिक्त स्थान और आरक्षित वर्णों को percent-encode करें (`Coffee%20shop`); `+` एक वास्तविक plus है, रिक्त स्थान नहीं |

पूर्ण नियम: [ZIP 321](https://zips.z.cash/zip-0321)।

### उपयोग के मामले

- Checkout: कीमत और order memo पहले से भरें ताकि ग्राहक को केवल अपने wallet में पुष्टि करनी हो
- Invoices: एक लिंक या QR साझा करें
- Donations: अपनी साइट पर widget एम्बेड करें
- P2P: चैट में `zcash:` लिंक भेजें

### साइट पर एम्बेड करें

इस script को अपने shielded पते पर इंगित करें। होस्ट की गई कॉपी ZecHub पर है:

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

पहले होस्ट किया गया बटन आज़माएं: [भुगतान widget खोलें](/zcash-payment-uri)।

### वीडियो

Zcash के साथ Payment Requests कैसे बनाएं:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Zcash के साथ Payment Requests कैसे बनाएं"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

अपनी वेबसाइट में Zcash Donation Widget जोड़ना:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="अपनी वेबसाइट में Zcash Donation Widget जोड़ना"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## दृश्य / सादृश्य

एक बैंक transfer form की कल्पना करें, जिसमें account number, राशि और भुगतान किसलिए है यह बताने वाले note के फ़ील्ड हों। इसे हाथ से भरना धीमा है, और एक गलत अंक पैसे को गलत जगह भेज सकता है।

भुगतान अनुरोध URI वही form है, जिसे दुकान ने भर दिया है। QR code उस form की तस्वीर है। आपके फोन का camera तस्वीर को पढ़ता है, wallet हर फ़ील्ड को सही जगह कॉपी करता है, और आप संख्याओं की जांच करके हस्ताक्षर करते हैं।

वेब पेज पर मौजूद लिंक भी यही काम करता है। उस पर क्लिक करने से भरा हुआ form आपके wallet को मिल जाता है।

## विस्तृत जानकारी

### एक वास्तविक उदाहरण

यहाँ ZIP 321 का testnet के लिए लिखा गया एक उदाहरण है:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

यह एक shielded Sapling पते पर 1 ZEC मांगता है। मेमो डिकोड होने पर "This is a simple memo." बनता है। संदेश "Thank you for your purchase" वह पाठ है जो wallet स्क्रीन पर दिखाता है।

### वे नियम जिन्हें wallet जांचता है

राशि का प्रारूप सख्त है। `amount=0.5` और `amount=50` मान्य हैं। `amount=50,000.00`, `amount=.5` और `amount=0.123456789` अमान्य हैं: period ही एकमात्र दशमलव विभाजक है, और इसके बाद अधिकतम 8 अंक हो सकते हैं। कोई राशि 21,000,000 ZEC से अधिक नहीं हो सकती।

raw URI में मेमो base64url में encoded होता है और डिकोड होने के बाद इसमें अधिकतम 512 bytes हो सकते हैं। transparent पते से जुड़ा मेमो पूरे अनुरोध को अमान्य बनाता है, क्योंकि transparent पते मेमो नहीं रख सकते। Sprout पते बिल्कुल स्वीकार्य नहीं हैं, और जो अनुरोध ZIP 321 grammar का पालन नहीं करता उसे अस्वीकार करना आवश्यक है।

ऊपर की तालिका से परे दो और फ़ील्ड मौजूद हैं। `message` भुगतान का विवरण है जिसे wallet प्रदर्शित करता है। `req-asset` Custom Assets के लिए आरक्षित है, जैसा कि ZIP 227 में परिभाषित है।

### एक साथ कई लोगों को भुगतान करना

हर अतिरिक्त भुगतान के parameter नामों में एक index number जोड़ा जाता है, उदाहरण के लिए `address.1`, `amount.1` और `memo.1`। wallet एक transaction बनाता है जो सूची में मौजूद सभी को भुगतान करता है। यह ऐसे checkout के लिए उपयोगी है जो भुगतान विभाजित करता हो, या साथ में भेजे गए donations के समूह के लिए।

### प्रारूप कहाँ से आया

Bitcoin में भुगतान अनुरोधों के दो पुराने standards हैं: BIP 21, एक प्राप्तकर्ता के लिए सरल लिंक, और BIP 70, जटिल भुगतानों के लिए भारी protocol। ZIP 321 बीच का रास्ता अपनाता है, ऐसा लिंक प्रारूप जिसमें कई प्राप्तकर्ताओं के लिए जगह है। चर्चा 2018 में Zcash ZIPs repository में शुरू हुई, जहाँ BIP 21 की प्रतिध्वनि के लिए संख्या 321 चुनी गई थी, और ZIP स्वयं अगस्त 2020 में बनाया गया था।

## संबंधित पृष्ठ

- [Memos](/using-zcash/memos): भुगतान अनुरोध में memo फ़ील्ड किसलिए है।
- [Payment Processors](/using-zcash/payment-processors): दुकानों के लिए भुगतान संभालने वाली सेवाएँ।
- [Wallets](/using-zcash/wallets): इन लिंक को पढ़ने वाले wallets खोजने के लिए Payment Request filter का उपयोग करें।
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): वे Custom Assets जिनका `req-asset` उल्लेख करता है।
- [Zcash TEX Addresses क्या हैं?](/using-zcash/transparent-exchange-addresses): भुगतान से पहले आपका wallet जिस एक अन्य पता नियम को पढ़ता है।

**अंतिम अपडेट:** अक्टूबर 2026

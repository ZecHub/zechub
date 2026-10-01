<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Zcash भुगतान अनुरोध URI

भुगतान अनुरोध URI, [ZIP 321](https://zips.z.cash/zip-0321) द्वारा परिभाषित एक `zcash:` लिंक है। संगत wallet लिंक या QR से पता, राशि और वैकल्पिक मेमो पढ़ते हैं और एक लेनदेन पहले से भर देते हैं। कोई अतिरिक्त खाता नहीं, बीच में कोई प्रोसेसर नहीं।

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

विजेट डेमो एक लाइव ZIP-321 मोडल है: QR, पता/URI कॉपी करना, छोटा लिंक और wallet में खोलना। यदि आप पहले अपना पता और राशि निर्धारित करना चाहते हैं, तो tools पेज जनरेटर है।

## संरचना

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| फ़ील्ड | आवश्यक | टिप्पणियाँ |
| --- | --- | --- |
| address | हाँ | Unified Address को प्राथमिकता दें (`u1` / `utest1`) |
| amount | नहीं | दशमलव ZEC |
| memo | नहीं | केवल shielded ट्रांसफ़र |
| label | नहीं | कुछ wallet द्वारा दिखाया जाने वाला मानव-पठनीय नाम |

पूर्ण नियम: [ZIP 321](https://zips.z.cash/zip-0321)।

## उपयोग के मामले

- **चेकआउट** — कीमत और ऑर्डर मेमो पहले से भरें, ताकि ग्राहक को अपने wallet में केवल पुष्टि करनी हो
- **इनवॉइस** — एक लिंक या QR साझा करें
- **दान** — अपनी साइट पर विजेट एम्बेड करें
- **P2P** — चैट में एक `zcash:` लिंक भेजें

## साइट पर एम्बेड करें

इस स्क्रिप्ट को अपने shielded पते पर इंगित करें। होस्ट की गई कॉपी ZecHub पर उपलब्ध है:

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

## वीडियो

Zcash के साथ Payment Requests कैसे बनाएँ:

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

अपनी वेबसाइट में Zcash Donation Widget जोड़ना:

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

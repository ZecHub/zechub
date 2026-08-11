---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# लेनदेन

ZEC भुगतान के लिए व्यापक रूप से उपयोग की जाने वाली एक डिजिटल संपत्ति है, जो मजबूत गोपनीयता सुविधाएँ प्रदान करती है, जिससे यह दोस्तों को भुगतान करने, खरीदारी करने या दान देने जैसे विभिन्न लेनदेन के लिए उपयुक्त बनती है। गोपनीयता और सुरक्षा को अधिकतम करने के लिए, यह समझना आवश्यक है कि Zcash के भीतर विभिन्न प्रकार के लेनदेन कैसे काम करते हैं।

## संक्षेप में

- Zcash दो प्रकार के लेनदेन का समर्थन करता है: **shielded**, जो विवरणों को निजी रखता है, और **transparent**, जो उन्हें सार्वजनिक रूप से दर्ज करता है।
- Shielded पते `u` या `z` से शुरू होते हैं। Transparent पते `t` से शुरू होते हैं और काफी हद तक Bitcoin पते की तरह काम करते हैं।
- हर भुगतान पर चुनाव आपका होता है। गोपनीयता वह विकल्प है जो Zcash आपको देता है, न कि कोई ऐसी सेटिंग जिसे कोई और आपके लिए तय करे।
- एक्सचेंज से निकासी वह सबसे आम जगह है जहाँ लोग गोपनीयता खो देते हैं। यदि एक्सचेंज केवल transparent withdrawals का समर्थन करता है, तो फंड आने के बाद उन्हें स्वयं shield करें।
- शुल्क [ZIP 317](https://zips.z.cash/zip-0317) का पालन करते हैं और लेनदेन के आकार के साथ बढ़ते हैं। जो wallet अभी भी पुराना flat fee भेज रहे हैं, उनके लेनदेन में देरी हो सकती है।

## Shielded लेनदेन

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded लेनदेन तब होते हैं जब आप ZEC को अपने shielded wallet में भेजते हैं। आपके shielded wallet का पता U या Z से शुरू होता है। Shielded लेनदेन भेजते समय, आप यह सुनिश्चित कर रहे होते हैं कि आप और जिन लोगों के साथ आप लेनदेन कर रहे हैं, वे ऐसी गोपनीयता बनाए रखें जो अन्य P2P भुगतान नेटवर्क पर संभव नहीं है। Shielded लेनदेन भेजना बहुत आसान है, बस आपको दो बातों का ध्यान रखना होता है। पहली यह कि आप सही wallet प्रकार का उपयोग कर रहे हों। यह सुनिश्चित करने का सबसे आसान तरीका कि आप सही प्रकार का wallet उपयोग कर रहे हैं, एक [wallet](https://zechub.wiki/wallets) डाउनलोड करना है। दूसरी महत्वपूर्ण बात है ZEC को shielded wallet में भेजना। किसी एक्सचेंज से ZEC निकालते समय, आपको यह जानना होगा कि एक्सचेंज shielded withdrawals का समर्थन करता है या transparent withdrawals का। यदि वह shielded withdrawals का समर्थन करता है, तो आप बस ZEC को अपने shielded पते पर withdraw कर सकते हैं। यदि एक्सचेंज केवल transparent withdrawals का समर्थन करता है, तो आपको YWallet का उपयोग करना होगा और ZEC प्राप्त होने के बाद उसे autoshield करना होगा। फंड भेजने और प्राप्त करने के लिए केवल shielded लेनदेन का उपयोग करना गोपनीयता बनाए रखने और डेटा लीक होने के जोखिम को कम करने का सबसे अच्छा तरीका है।

## Transparent लेनदेन

Transparent लेनदेन समान तरीके से काम करते हैं, लेकिन उनमें गोपनीयता सुरक्षा नहीं होती, जिससे लेनदेन के विवरण blockchain पर सार्वजनिक रूप से दिखाई देते हैं। जब गोपनीयता प्राथमिकता हो, तब transparent लेनदेन से बचना चाहिए। ध्यान दें: Transparent wallet को ZIP-317 के कारण समस्याओं का सामना करना पड़ सकता है, क्योंकि इसमें लेनदेन की जटिलता के अनुपात में शुल्क आवश्यक होता है। डिफ़ॉल्ट शुल्क अस्वीकृति या देरी का कारण बन सकता है, इसलिए शुल्क का अनुकूलन महत्वपूर्ण हो जाता है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## इसे समझने का एक आसान तरीका

एक transparent लेनदेन एक पोस्टकार्ड की तरह है। डाकिया उसे पहुँचा देता है, लेकिन रास्ते में जिसे भी वह संभालना पड़े, वह संदेश पढ़ सकता है, देख सकता है कि किसने भेजा और किसे मिला।

एक shielded लेनदेन एक सीलबंद लिफाफे की तरह है। डाक सेवा फिर भी यह पुष्टि करती है कि असली डाक शुल्क के साथ एक वास्तविक पत्र प्रणाली से गुज़रा, और कोई भी उसे नकली नहीं बना सकता या वही पत्र दो बार नहीं भेज सकता। लिफाफे के भीतर क्या है, यह प्रेषक और प्राप्तकर्ता के बीच ही रहता है।

महत्वपूर्ण बात यह है कि Zcash आपको हर भुगतान पर यह तय करने देता है कि कौन-सा विकल्प भेजना है।

## Transparent लेनदेन के लिए शुल्क प्रबंधन

ZIP-317 मार्गदर्शन: शुल्क संरचना लेनदेन की जटिलता के साथ बढ़ती है, इसलिए मानक 0.00001 ZEC शुल्क से आगे समायोजन आवश्यक होता है।
उदाहरण गणना: एक साधारण one-note लेनदेन के लिए 0.0001 ZEC शुल्क की आवश्यकता हो सकती है, और प्रत्येक अतिरिक्त note पर लगभग 0.00005 ZEC बढ़ सकता है।

Wallets में शुल्क संपादित करना

Trust Wallet: लेनदेन बनाते समय gear icon पर टैप करके advanced settings खोलें। लेनदेन विफल होने से बचाने के लिए Miner Tip Gwei और Max Fee Gwei फ़ील्ड्स को सावधानी से समायोजित करें। Trust Wallet केवल network fees लेता है।
Coinomi Wallet: नेटवर्क की स्थिति के आधार पर Low, Normal, High तीन dynamic fee विकल्प प्रदान करता है। मैनुअल समायोजन के लिए, समर्थित coins पर Custom चुनें या ऊपर-दाएँ कोने में Change Fee का उपयोग करें। उपयोगकर्ता प्रति byte या kilobyte शुल्क निर्धारित कर सकते हैं, जो confirmation time को प्रभावित करता है। यदि आप निश्चित नहीं हैं, तो dynamic options का उपयोग करना अनुशंसित है।

## आम गलतियाँ

- **यह मान लेना कि ZEC सूचीबद्ध करने वाला कोई भी wallet उसे निजी रूप से भेज सकता है।** कई multi-coin wallet केवल Zcash के transparent पक्ष का समर्थन करते हैं। गोपनीयता के लिए उस पर निर्भर होने से पहले wallet के supported pools की जाँच करें। [Wallets](https://zechub.wiki/using-zcash/wallets) पृष्ठ प्रत्येक विकल्प के लिए यह जानकारी देता है।
- **Transparent पते पर withdraw करना और फंड वहीं छोड़ देना।** निकासी स्वयं सार्वजनिक होती है, और उस पते से बाद की हर गतिविधि भी सार्वजनिक रहती है। फंड पहुँचने के बाद उन्हें shield करें।
- **गोपनीयता को ऐसी चीज़ मानना जिसे आप एक बार चालू कर देते हैं।** हर लेनदेन एक अलग चुनाव है। आज shielded भेजने से पिछले सप्ताह किया गया transparent भुगतान मिट नहीं जाता।
- **हर चीज़ के लिए एक ही transparent पते का बार-बार उपयोग करना।** क्योंकि transparent गतिविधि स्थायी रूप से दिखाई देती है, एक ही पते का पुन: उपयोग धीरे-धीरे उन भुगतानों को आपस में जोड़ देता है जिनके जुड़े होने का कोई कारण नहीं था।
- **पुराने default fee के साथ भेजना।** जिन wallet ने अभी तक ZIP 317 को अपनाया नहीं है, वे अब भी पुराना flat fee भेज सकते हैं, जिससे लेनदेन बिना पुष्टि के अटका रह सकता है।

## नोट

कृपया ध्यान दें कि ZEC का उपयोग करने का सबसे सुरक्षित तरीका केवल shielded लेनदेन का उपयोग करना है। कुछ wallet [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) को लागू करने की प्रक्रिया में हैं, जो उपयोगकर्ताओं और एक्सचेंजों को transparent और shielded पतों को एक साथ संयोजित करने की अनुमति देता है।

## संसाधन

[ZIPS](https://zips.z.cash/)

## संबंधित पृष्ठ

- [Wallets](/using-zcash/wallets) — कौन-से wallet shielded sending का समर्थन करते हैं, और कौन-से केवल transparent हैं
- [Shielded Pools](/using-zcash/shielded-pools) — Sapling और Orchard, वे pools जिनमें आपके shielded फंड रहते हैं
- [Memos](/using-zcash/memos) — encrypted संदेश जो shielded लेनदेन के साथ जा सकते हैं
- [Transparent Exchange Addresses](/using-zcash/transparent-exchange-addresses) — TEX पते और एक्सचेंज उनका उपयोग क्यों करते हैं
- [Custodial Exchanges](/using-zcash/custodial-exchanges) — कौन-से एक्सचेंज shielded withdrawals का समर्थन करते हैं

## ZEC से ZAT कन्वर्टर

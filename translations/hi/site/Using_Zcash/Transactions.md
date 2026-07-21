<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# लेनदेन

ZEC भुगतान के लिए व्यापक रूप से उपयोग की जाने वाली एक डिजिटल एसेट है, जो मजबूत गोपनीयता सुविधाएँ प्रदान करती है, जिससे यह दोस्तों को भुगतान करने, खरीदारी करने, या दान देने जैसे विभिन्न लेनदेन के लिए उपयुक्त बनती है। गोपनीयता और सुरक्षा को अधिकतम करने के लिए, यह समझना आवश्यक है कि Zcash के भीतर विभिन्न प्रकार के लेनदेन कैसे काम करते हैं।

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

Shielded लेनदेन तब होते हैं जब आप ZEC को अपने shielded wallet में भेजते हैं। आपके shielded wallet का पता U या Z से शुरू होता है। Shielded लेनदेन भेजते समय, आप यह सुनिश्चित कर रहे होते हैं कि आप और जिन लोगों के साथ आप लेनदेन कर रहे हैं, वे उस स्तर की गोपनीयता बनाए रखें जो अन्य P2P भुगतान नेटवर्क पर संभव नहीं है। Shielded लेनदेन भेजना बहुत आसान है, आपको बस दो बातों का ध्यान रखना होता है। पहली यह है कि आप सही wallet प्रकार का उपयोग कर रहे हों। यह सुनिश्चित करने का सबसे आसान तरीका कि आप सही प्रकार का wallet उपयोग कर रहे हैं, एक [wallet](https://zechub.wiki/wallets) डाउनलोड करना है। दूसरी महत्वपूर्ण बात है ZEC को shielded wallet में ले जाना। किसी exchange से ZEC निकालते समय, आपको यह जानना होगा कि वह exchange shielded या transparent निकासी का समर्थन करता है या नहीं। यदि वह shielded निकासी का समर्थन करता है, तो आप सीधे ZEC को अपने shielded पते पर निकाल सकते हैं। यदि exchange केवल transparent निकासी का समर्थन करता है, तो आपको YWallet का उपयोग करना होगा और ZEC प्राप्त होने के बाद उसे autoshield करना होगा। धन भेजने और प्राप्त करने के लिए केवल shielded लेनदेन का उपयोग करना गोपनीयता बनाए रखने और डेटा लीक होने के जोखिम को कम करने का सबसे अच्छा तरीका है

## Transparent लेनदेन

Transparent लेनदेन समान तरीके से काम करते हैं, लेकिन उनमें गोपनीयता सुरक्षा नहीं होती, जिससे लेनदेन का विवरण blockchain पर सार्वजनिक रूप से दिखाई देता है। जब गोपनीयता प्राथमिकता हो, तो transparent लेनदेन से बचना चाहिए। नोट: Transparent wallets को ZIP-317 के कारण समस्याओं का सामना करना पड़ सकता है, क्योंकि इसमें लेनदेन की जटिलता के अनुपात में फीस आवश्यक होती है। डिफ़ॉल्ट फीस के कारण अस्वीकृति या देरी हो सकती है, इसलिए फीस को अनुकूलित करना महत्वपूर्ण है।

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


### Transparent लेनदेन के लिए फीस प्रबंधन

ZIP-317 मार्गदर्शन: फीस संरचना लेनदेन की जटिलता के साथ बढ़ती है, जिसके लिए मानक 0.00001 ZEC फीस से अधिक समायोजन की आवश्यकता होती है।
उदाहरण गणना: एक साधारण one-note लेनदेन के लिए 0.0001 ZEC फीस की आवश्यकता हो सकती है, और प्रत्येक अतिरिक्त note पर लगभग 0.00005 ZEC की वृद्धि हो सकती है।

Wallets में फीस संपादित करना

Trust Wallet: लेनदेन बनाते समय gear icon पर टैप करके advanced settings खोलें। लेनदेन विफल होने से बचने के लिए Miner Tip Gwei और Max Fee Gwei फ़ील्ड्स को सावधानीपूर्वक समायोजित करें। Trust Wallet केवल network fees ही लेता है।
Coinomi Wallet: नेटवर्क स्थितियों के आधार पर Low, Normal, High नामक तीन dynamic fee विकल्प प्रदान करता है। मैन्युअल समायोजन के लिए, supported coins पर Custom चुनें या ऊपर-दाईं ओर Change Fee का उपयोग करें। उपयोगकर्ता प्रति byte या kilobyte के आधार पर फीस निर्धारित कर सकते हैं, जो confirmation समय को प्रभावित करता है। यदि आप निश्चित नहीं हैं, तो dynamic विकल्पों का उपयोग करने की सिफारिश की जाती है।

इस संस्करण में फीस प्रबंधन संबंधी मार्गदर्शन, dynamic fee विकल्प, और Trust Wallet तथा Coinomi में customization settings शामिल हैं, जिससे उपयोगकर्ताओं को फीस नियंत्रण का व्यापक विवरण मिलता है।

#### संसाधन

[ZIPS](https://zips.z.cash/)

#### नोट

कृपया ध्यान दें कि ZEC का उपयोग करने का सबसे सुरक्षित तरीका केवल shielded लेनदेन का उपयोग करना है। कुछ wallets [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) को लागू करने की प्रक्रिया में हैं, जो उपयोगकर्ताओं और exchanges को transparent और shielded पतों को एक साथ संयोजित करने की अनुमति देता है। 

## ZEC से ZAT कन्वर्टर

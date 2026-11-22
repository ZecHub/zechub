# Brave Wallet के साथ शील्डेड (shielded) Zcash (ZEC) कैसे भेजें और प्राप्त करें: चरण-दर-चरण गोपनीयता (privacy) गाइड

Brave Wallet एक सुरक्षित, नेटिव क्रिप्टो वॉलेट (wallet) है, जो सीधे Brave ब्राउज़र में बना हुआ है - किसी एक्सटेंशन की आवश्यकता नहीं है।


## शील्डेड ZEC सपोर्ट का महत्व


Zcash उन गिनी-चुनी क्रिप्टोकरेंसी में से एक है, जो शील्डेड लेनदेन (transaction) के साथ डिफ़ॉल्ट रूप से गोपनीयता प्रदान करती हैं।

Brave Wallet अब Orchard शील्डेड ZEC को सपोर्ट करता है, जिससे थर्ड-पार्टी सॉफ़्टवेयर के बिना निजी लेनदेन संभव होते हैं।

उपयोगकर्ता अब बैलेंस या मेटाडेटा उजागर किए बिना ZEC भेज/प्राप्त कर सकते हैं - और यह सब Brave ब्राउज़र के भीतर ही।


## ट्यूटोरियल

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/TNcHY-GXFVo"
    title="How to use ZEC on Brave"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## भाग 1: Brave Wallet का सेटअप

**शामिल चरण:**

1. Brave ब्राउज़र खोलें (फ़िलहाल केवल डेस्कटॉप पर)

2. वॉलेट आइकन पर क्लिक करें या brave://wallet पर जाएँ

3. अपना वॉलेट सेट करें (नया बनाएँ या इम्पोर्ट करें)

4. क्रिप्टो डैशबोर्ड (dashboard) खोलें


![img1](/content-images/f54cd1a1-8569-4925-ba1c-7597d030593e-8d83734cd5.webp)


## भाग 2: Brave Wallet में Zcash (ZEC) जोड़ना

**शामिल चरण:**

1. वॉलेट डैशबोर्ड में “Manage Assets” पर क्लिक करें

2. ZEC खोजें और उसे सक्षम करें

3. ZEC अब आपके वॉलेट में दिखाई देगा


![img2](/content-images/6f2b2190-cf55-4394-9d5f-29ff9b5bb525-13d37cb455.webp)


## भाग 3: शील्डेड ZEC प्राप्त करना (यूनिफ़ाइड एड्रेस)

**शामिल चरण:**

1. अपने एसेट में ZEC पर क्लिक करें

2. “Receive” चुनें

3. Brave एक यूनिफ़ाइड एड्रेस (Unified Address, UA) बनाता है - एक ऐसा एड्रेस (address) जो शील्डेड और ट्रांसपेरेंट (transparent) दोनों प्रकार के लेनदेन को सपोर्ट करता है

4. QR कोड कॉपी करें या स्कैन करें

5. अपना UA भेजने वाले के साथ साझा करें



![img3](/content-images/53c940b6-1a03-4fa7-aefa-d3478f678a88-23f68a3855.webp)



## भाग 4: शील्डेड ZEC निजी रूप से भेजना

**शामिल चरण:**

1. ZEC -> Send चुनें

2. प्राप्तकर्ता का यूनिफ़ाइड एड्रेस या शील्डेड एड्रेस पेस्ट करें

3. राशि दर्ज करें

4. लेनदेन के विवरण की पुष्टि करें

5. Send पर क्लिक करें - अब Orchard पूल (pool) का उपयोग करके फ़ंड निजी रूप से ट्रांसफ़र हो जाते हैं


![img4](/content-images/Internet_20250808_172118_4-e6df0f7fe2.webp)




## एड्रेस के प्रकार

यहाँ Zcash के प्रत्येक एड्रेस प्रकार की व्याख्या दी गई है:

**t-addr (t1...)** - ट्रांसपेरेंट एड्रेस Bitcoin एड्रेस की तरह काम करते हैं, यानी लेनदेन ब्लॉकचेन (blockchain) पर सार्वजनिक होते हैं। गैर-Zcash वॉलेट के साथ इनका उपयोग आसान है, लेकिन ये गोपनीयता प्रदान नहीं करते।

**z-addr (zs...)** - शील्डेड एड्रेस भेजने वाले, प्राप्तकर्ता और राशि को छिपाने के लिए Zcash की गोपनीयता तकनीक (Sprout/Sapling) का उपयोग करते हैं। केवल व्यूइंग की (viewing key) या मालिक ही विवरण उजागर कर सकते हैं।

**UA (u... या QR)** - यूनिफ़ाइड एड्रेस कई एड्रेस प्रकारों (ट्रांसपेरेंट, शील्डेड, Orchard) को एक में जोड़ते हैं। इससे अधिकतम कम्पैटिबिलिटी मिलती है और जहाँ संभव हो, गोपनीयता को प्राथमिकता दी जाती है।



## उन्नत

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/AmTMa5HXa2w"
    title="Brave Wallet Tutorial : Defi with Near Intents and Shielded Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## निष्कर्ष: व्यावहारिक गोपनीयता

Brave Wallet और शील्डेड ZEC के साथ, गोपनीयता अब हर किसी के लिए सुलभ है - किसी विशेष सॉफ़्टवेयर या उन्नत ज्ञान की आवश्यकता नहीं है।

यह पत्रकारों, एक्टिविस्ट या गोपनीयता के प्रति सजग व्यक्तियों के लिए आदर्श है।

आज ही Brave के भीतर अपना पहला शील्डेड लेनदेन करके देखें!


**निजी रहें। स्वतंत्र रहें। Brave Wallet के साथ ZEC निजी रूप से भेजें।**

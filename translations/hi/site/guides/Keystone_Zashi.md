# Keystone Zashi उपयोगकर्ता गाइड

Twitter गाइड:  => [Zashi x Keystone हार्डवेयर वॉलेट (hardware wallet) इंटीग्रेशन Twitter गाइड](https://x.com/zashi_app/status/1869793574880973144) 

यह इंटीग्रेशन शील्डेड (shielded) ZEC के कोल्ड स्टोरेज को संभव बनाकर Zcash की उपयोगिता में एक महत्वपूर्ण बदलाव लाता है। Zcash समुदाय को अतीत में अन्य हार्डवेयर वॉलेट प्लेटफ़ॉर्म के साथ असफलताओं का सामना करना पड़ा है, लेकिन Keystone एक ऐसे सहयोगी भागीदार के रूप में उभरा जो सीमाओं को आगे बढ़ाने और Electric Coin Company के साथ मिलकर नवाचार करने के लिए तैयार है। Keystone टीम को अपनी ओर का काम आगे बढ़ाने के लिए ZCG ग्रांट (grant) प्राप्त हुई।

## Keystone X Zashi ट्यूटोरियल

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## तैयारी
[अपना Keystone 3 Pro या Keystone 3 ऑर्डर करें और प्राप्त करें](https://keyst.one) 

बैटरी स्तर: सुनिश्चित करें कि आपके Keystone डिवाइस का बैटरी स्तर 20% से अधिक हो।

USB केबल या SD कार्ड:

- फ़र्मवेयर (firmware) अपडेट के लिए USB केबल (साथ में शामिल)।
- अपग्रेड के लिए माइक्रो SD कार्ड (1 TB से कम) (अलग से खरीदें)।

सत्यापन और फ़र्मवेयर अपडेट के लिए Keystone की आधिकारिक वेबसाइट तक पहुँच।

आपके मोबाइल डिवाइस पर Zashi ऐप का सेटअप।

## [चरण-दर-चरण गाइड (Keystone डिवाइस)](https://keyst.one/get-started) 


**अपनी भाषा चुनें**
-डिवाइस सत्यापन (QR के माध्यम से): परिवहन के दौरान संभावित छेड़छाड़ का पता लगाने, सप्लाई चेन (supply chain) हमलों को रोकने और इंस्टॉल किए गए फ़र्मवेयर की सुरक्षा सुनिश्चित करने के लिए डिवाइस सत्यापन बहुत महत्वपूर्ण है।
  - Keystone वेबसाइट पर डिवाइस सत्यापन पेज पर जाएँ।
  - आधिकारिक वेबसाइट पर “Scan QR Code” पर क्लिक करें।
  - वेबसाइट पर दिखाए गए QR कोड को स्कैन करने के लिए अपने Keystone के कैमरे का उपयोग करें।
  - आपकी Keystone स्क्रीन पर एक सत्यापन कोड दिखाई देगा।
  - सत्यापन प्रक्रिया पूरी करने के लिए यह कोड वेबसाइट पर दर्ज करें।

- **फ़र्मवेयर अपडेट:**
  - MicroSD कार्ड के माध्यम से अपडेट
    - सुनिश्चित करें कि आपके Keystone वॉलेट में कम से कम 20% बैटरी चार्ज हो।
    - SD कार्ड को अपने कंप्यूटर में डालें और उसे FAT32 के रूप में फ़ॉर्मैट करें।
    - [Keystone फ़र्मवेयर अपडेट पेज](https://keyst.one/firmware) से नवीनतम Cypherpunk फ़र्मवेयर संस्करण डाउनलोड करें और keystone3.bin फ़ाइल को अपने MicroSD कार्ड के रूट में सेव करें।
    - फ़र्मवेयर वाले SD कार्ड को अपने Keystone वॉलेट में लगाएँ।
    - अपने Keystone वॉलेट पर “Upgrade” विकल्प खोलें, फिर अपडेट प्रक्रिया शुरू करने के लिए स्क्रीन पर दिए गए निर्देशों का पालन करें।
  - **USB केबल के माध्यम से अपडेट**
    - यदि आपका फ़र्मवेयर संस्करण 1.0.4 से कम है, तो USB अपडेट शुरू करने से पहले आपको MicroSD कार्ड का उपयोग करके प्रारंभिक अपडेट करना होगा।
    - सुनिश्चित करें कि आपके Keystone वॉलेट में कम से कम 20% बैटरी चार्ज हो।
    - “via USB” पर टैप करें और USB केबल से अपने Keystone वॉलेट को अपने कंप्यूटर से कनेक्ट करें। अपने Keystone वॉलेट को USB एक्सेस देने के लिए [Approve] पर टैप करें, अन्यथा यह केवल चार्जिंग की अनुमति दे सकता है।
    - अपने कंप्यूटर का वेब ब्राउज़र खोलें और [Keystone फ़र्मवेयर अपडेट पेज](https://keyst.one/firmware) पर जाएँ
    - अपडेट पेज पर “Install Update” बटन पर क्लिक करें और नवीनतम फ़र्मवेयर इंस्टॉल करने के लिए दिए गए निर्देशों का पालन करें।
- **वॉलेट बनाना:**
    - सुरक्षित पासवर्ड: अपने वॉलेट की सुरक्षा के लिए एक मज़बूत PIN या पासवर्ड चुनें।
    - अपने वॉलेट को नाम दें (वैकल्पिक): आसान पहचान के लिए आप चाहें तो अपने वॉलेट को एक नाम दे सकते हैं, या इस चरण को छोड़ सकते हैं।
    - यदि आप पहली बार वॉलेट सेट कर रहे हैं, तो “Create New Wallet” चुनें।
    - आपका डिवाइस 24 शब्दों का सीड फ्रेज़ (seed phrase) जनरेट करेगा।
    - इस सीड फ्रेज़ को लिख लें और इसे सुरक्षित रूप से संग्रहीत करें।
    - स्क्रीन पर दिखाए गए सही क्रम में शब्दों का सत्यापन करके सीड फ्रेज़ की पुष्टि करें।
- **Zashi + Keystone वॉलेट कनेक्ट करना:**
    - Keystone डिवाइस पर: मुख्य पेज पर … पर टैप करें
    - “Connect Software Wallet” पर टैप करें और Zashi चुनें। Zashi से कनेक्शन के लिए QR कोड दिखाई देगा।
    - Zashi ऐप में: zashi ड्रॉपडाउन (स्क्रीन के ऊपर बाईं ओर) पर टैप करें
    - “Connect Hardware Wallet” पर टैप करें
    - “Ready to Scan” पर टैप करें
    - Keystone डिवाइस पर दिखाए गए QR को स्कैन करें
    - Zashi ऐप में: दिखाए गए अकाउंट पर टैप करके Keystone वॉलेट अकाउंट की पुष्टि करें
    - स्क्रीन के नीचे “Connect” पर टैप करें


## अतिरिक्त सहायता

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

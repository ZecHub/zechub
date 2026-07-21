# Keystone Zashi उपयोगकर्ता मार्गदर्शिका

Twitter Guide:  => [Zashi x Keystone Hardware Wallet Integration Twitter Guide](https://x.com/zashi_app/status/1869793574880973144) 

यह एकीकरण shielded ZEC के cold storage को सक्षम बनाकर Zcash की उपयोगिता में एक महत्वपूर्ण प्रगति को दर्शाता है। अतीत में Zcash समुदाय को अन्य hardware wallet प्लेटफ़ॉर्म्स के साथ कुछ झटके लगे थे, लेकिन Keystone एक ऐसे सहयोगी साझेदार के रूप में सामने आया जो सीमाओं को आगे बढ़ाने और Electric Coin Company के साथ मिलकर नवाचार करने के लिए तैयार था। इस काम के अपने हिस्से को आगे बढ़ाने के लिए Keystone टीम को ZCG grant प्राप्त हुआ।

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

बैटरी स्तर: सुनिश्चित करें कि आपके keystone device का battery level 20% से ऊपर हो।

USB केबल या SD कार्ड:

- firmware update के लिए USB केबल (शामिल है)।
- upgrades के लिए Micro SD कार्ड (1 TB से कम) (अलग से खरीदें)।

verification और firmware update के लिए Keystone की आधिकारिक वेबसाइट तक पहुंच।

अपने mobile device पर Zashi app setup।

## [चरण-दर-चरण मार्गदर्शिका(Keystone Device)](https://keyst.one/get-started) 


**अपनी भाषा चुनें**
-Device Verification(via QR): परिवहन के दौरान संभावित छेड़छाड़ का पता लगाने, supply chain attacks को रोकने, और इंस्टॉल किए गए firmware की सुरक्षा सुनिश्चित करने के लिए Device Verification बहुत महत्वपूर्ण है।
  - Keystone वेबसाइट पर Device Verification पेज पर जाएँ।
  - आधिकारिक वेबसाइट पर Scan QR Code पर क्लिक करें।
  - वेबसाइट पर दिखाए गए QR code को स्कैन करने के लिए अपने Keystone camera का उपयोग करें।
  - आपके Keystone screen पर एक verification code दिखाई देगा।
  - verification प्रक्रिया पूरी करने के लिए इस code को वेबसाइट पर दर्ज करें।

- **Firmware Update:**
  - MicroSD कार्ड के माध्यम से update
    - सुनिश्चित करें कि आपके Keystone wallet में कम-से-कम 20% battery charge हो।
    - SD कार्ड को अपने computer में डालें और उसे FAT32 के रूप में format करें।
    - [Keystone Firmware Update page](https://keyst.one/firmware) से नवीनतम Cypherpunk firmware version डाउनलोड करें और keystone3.bin फ़ाइल को अपने MicroSD कार्ड की root directory में सहेजें।
    - firmware वाला SD कार्ड अपने Keystone wallet में डालें।
    - अपने Keystone wallet पर "Upgrade" विकल्प खोलें, फिर update प्रक्रिया शुरू करने के लिए स्क्रीन पर दिए गए निर्देशों का पालन करें।
  - **USB केबल के माध्यम से update**
    - यदि आपका firmware version 1.0.4 से कम है, तो USB updates आगे बढ़ाने से पहले आपको प्रारंभिक update MicroSD कार्ड का उपयोग करके करना होगा।
    - सुनिश्चित करें कि आपके Keystone wallet में कम-से-कम 20% battery charge हो।
    - via USB पर टैप करें और USB केबल का उपयोग करके अपने Keystone wallet को अपने computer से कनेक्ट करें। अपने Keystone wallet को USB access देने के लिए [Approve] पर टैप करें, क्योंकि अन्यथा यह केवल charging की अनुमति दे सकता है।
    - अपने computer का web browser खोलें और [Keystone Firmware Update page](https://keyst.one/firmware) पर जाएँ
    - update page पर Install Update बटन पर क्लिक करें और नवीनतम firmware इंस्टॉल करने के लिए दिए गए निर्देशों का पालन करें।
- **Wallet बनाएँ:**
    - सुरक्षित password: अपने wallet की सुरक्षा के लिए एक मजबूत PIN या password चुनें।
    - अपने Wallet को नाम दें (वैकल्पिक): आसान पहचान के लिए चाहें तो अपने wallet को एक नाम दें या इस चरण को छोड़ दें।
    - यदि आप पहली बार wallet setup कर रहे हैं, तो Create New Wallet चुनें।
    - आपका device 24 शब्दों का एक seed phrase जनरेट करेगा।
    - इस seed phrase को लिख लें और सुरक्षित स्थान पर रखें।
    - स्क्रीन पर दिखाए गए क्रम के अनुसार शब्दों की पुष्टि करके seed phrase verify करें।
- **Zashi + Keystone Wallet कनेक्ट करें:**
    - Keystone device पर: मुख्य पृष्ठ पर … पर टैप करें
    - Connect Software Wallet पर टैप करें और Zashi चुनें। Zashi से कनेक्शन के लिए QR code दिखाई देगा।
    - Zashi App में: zashi dropdown पर टैप करें (स्क्रीन के ऊपर बाईं ओर)
    - Connect Hardware Wallet पर टैप करें
    - Ready to Scan पर टैप करें
    - Keystone Device पर प्रदर्शित QR को स्कैन करें
    - Zashi App में: प्रदर्शित account पर टैप करके Keystone Wallet Account की पुष्टि करें
    - स्क्रीन के नीचे Connect पर टैप करें


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

<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS पर एक वेबसाइट प्रकाशित करें 

![](/content-images/IPFS-40c2e22732.webp)

## IPFS के संपर्क में

IPFS (InterPlanetary File System) एक peer-to-peer प्रोटोकॉल और नेटवर्क है, जिसका डिज़ाइन फाइलों के संग्रहण और साझा करने की एक वितरित तरीका बनाने के लिए है। 

ईंटरनेट के पारंपरिक क्लाइंट-सर्वर मॉडल के विपरीत, IPFS यूज़र्स को एक दूसरे से फाइलें सीधे साझा करने की अनुमति देता है, बजाय केंद्रित सर्वर पर निर्भर करने के। 

IPFS में फ़ाइलों के *कंटेंट-एड्रेसिंग* के उपयोग से एड्रेस किया जाता है, इसका मतलब है कि प्रत्येक फ़ाइल को अपनी सामग्री के आधार पर एक अद्वितीय हैश या CONTENT IDENTIFIER (CID) दिया जाता है, और इस हैश का उपयोग नेटवर्क से फ़ाइल प्राप्त करने के लिए किया जाता है।

IPFS सामग्री को ब्लॉक के रूप में संग्रहीत करता है, जिनकी पहचान CID से होती है। फ़ाइल जोड़ने पर वह आपके नोड पर संग्रहीत होती है; वह अपने-आप दूसरे नोड पर कॉपी नहीं होती। उसकी एक पहुँच-योग्य कॉपी ऑनलाइन रखें, या रिमोट पिनिंग की व्यवस्था करें, ताकि दूसरे पाठक उसे प्राप्त कर सकें। देखें [IPFS persistence](https://docs.ipfs.tech/concepts/persistence/)।

[IPFS के परिचय](https://blog.infura.io/post/an-introduction-to-ipfs) पढ़ें


## अपना साइट बनाएं

इस उदाहरण में हम एक साधारण वेबसाइट बनाने के लिए जा रहे हैं। 

[उदाहरण साइट](https://squirrel.surf)


**चरण 1:** यदि आपको वेब डिज़ाइन के बारे में पता नहीं है, तो अपनी वेबसाइट के लिए मुख्य सामग्री लिखें, जिसमें शीर्षक, मुख्य पाठ, अन्य पृष्ठों/साइट के लिंक और फ़ुटर हो।

**चरण 2:** [एक HTML टेम्पलेट का उपयोग करें!](https://nicepage.com/html-templates) आपने लिखे पाठ को उपयुक्त रूप से पेस्ट करें। अपनी वेबसाइट के लिए .CSS शैली फ़ाइल भी बनाना आवश्यक हो सकता है। 

**चरण 3:** अपना होमपेज साइट फ़ोल्डर के रूट में `index.html` में रखें। इसकी इमेज और CSS भी शामिल करें, और `style.css` जैसे relative paths का उपयोग करें ताकि वे IPFS gateway URL के अंतर्गत भी काम करें।

## नोड के सेटअप

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) आपके लिए नोड का प्रबंधन करता है। अपनी साइट साझा करते समय इसे चालू रखें।

[कमांड-लाइन तरीके](https://docs.ipfs.tech/how-to/command-line-quick-start/) के लिए, एक बार एक नई repository इनिशियलाइज़ करें:

```sh
ipfs init
```

फिर नोड शुरू करें और इस टर्मिनल को खुला छोड़ दें:

```sh
ipfs daemon
```

शेष कमांड एक दूसरे टर्मिनल में चलाएँ। यदि IPFS Desktop पहले से इस रिपॉज़िटरी को प्रबंधित कर रहा है, तो दूसरा daemon शुरू न करें।

**साइट फ़ोल्डर को IPFS में जोड़ें**: 

IPFS Desktop में, Add Folder विकल्प का उपयोग करके अपनी वेबसाइट फ़ाइलों वाला फ़ोल्डर चुनें।

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

CLI तरीके के लिए, इसे अपने साइट फ़ोल्डर की पैरेंट डायरेक्टरी से चलाएँ:

```sh
ipfs add -r folder_name
```

`folder_name` को अपने फ़ोल्डर के नाम से बदलें (जिन नामों में स्पेस हों, उन्हें उद्धरण चिह्नों में रखें)। अंतिम `added ... folder_name` पंक्ति पर दिखाया गया CID सहेज लें: यह केवल `index.html` की नहीं, बल्कि पूरी डायरेक्टरी की पहचान करता है।

### IPFS पर साइट को पिन करें: 

CLI `ipfs add` कमांड डिफ़ॉल्ट रूप से आयात की गई सामग्री को स्थानीय रूप से पिन करता है। फ़ोल्डर के पिन की जाँच इस तरह करें:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` को पिछले चरण के CID से बदलें; आउटपुट में `recursive` दिखना चाहिए। पिनिंग इस नोड की कॉपी को garbage collection से बचाती है, लेकिन बंद कंप्यूटर को ऑनलाइन नहीं रखती। जब आपका नोड ऑफ़लाइन हो तब उपलब्धता के लिए [रिमोट पिनिंग](https://docs.ipfs.tech/how-to/work-with-pinning-services/) की व्यवस्था करें और पुष्टि करें कि रिमोट सेवा ने पिनिंग पूरी कर ली है।

### IPFS पर अपनी वेबसाइट का उपयोग करें: 

पहले अपनी साइट को `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` पर लोकल gateway के ज़रिए जाँचें (अगर आपका daemon कोई अलग gateway पोर्ट दिखाता है, तो उसी का उपयोग करें)। अंत में लगा स्लैश relative links को डायरेक्टरी के अंदर ही resolve होने देता है।

एक बार जब `https://ipfs.io/ipfs/YOUR_FOLDER_CID/` जैसा कोई सार्वजनिक गेटवे किसी पहुँच योग्य नोड से सामग्री प्राप्त कर लेता है, तो वह इसे उपलब्ध करा सकता है। स्थानीय प्रीव्यू का सफल होना यह साबित नहीं करता कि सामग्री सार्वजनिक रूप से उपलब्ध है।

हमारी मामला में CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS 

Interplanetary Naming System (IPNS) आपकी वेबसाइट के संबद्ध IPFS CID को अपडेट करने की अनुमति देता है, लेकिन फिर भी एक स्थिर लिंक प्रदान करता है। इसे एक की के रूप में प्रदान किया जाता है। 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

आपके साइट फ़ोल्डर के लिए IPFS डेस्कटॉप एप्लिकेशन में सेटिंग मेनू से Publish to IPNS का चयन करें।  

![](/content-images/IPNS-2fe62cc369.webp)

की: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

आप इसे एक गेटवे के माध्यम से हमारी साइट देखने के लिए भी उपयोग कर सकते हैं: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS लिंक 
 
साइट बना दी गई है, अब हमें URL के सामग्री पर निर्देशित करने के एक तरीका की आवश्यकता है। 

`example.com` के लिए, यह DNS रिकॉर्ड जोड़ें, और `YOUR_FOLDER_CID` को अपनी डायरेक्टरी के CID से बदलें:

| प्रकार | नाम | मान |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

कुछ DNS प्रदाता zone अपने-आप जोड़ देते हैं; वहाँ केवल `_dnslink` दर्ज करें। यदि आप ऊपर दिए गए IPNS नाम का उपयोग कर रहे हैं, तो मान इसके बजाय `dnslink=/ipns/YOUR_IPNS_NAME` हो सकता है। [DNSLink](https://docs.ipfs.tech/concepts/dnslink/) देखें।

![](/content-images/example-c2a9edb28b.webp)

DNS propagation के बाद, `https://ipfs.io/ipns/example.com/` आज़माएँ। साइट को सीधे `https://example.com/` पर सर्व करने के लिए DNSLink-सक्षम gateway और HTTPS कॉन्फ़िगरेशन की भी ज़रूरत होती है; केवल TXT रिकॉर्ड से ये सेटअप नहीं होते। [कस्टम-डोमेन गाइड](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) का पालन करें।

बधाई हो! आपने एक अटूटता प्रतिरोधी वेबसाइट सेटअप कर दी है। 


**संसाधन**

[IPFS दस्तावेज़](https://docs.ipfs.tech)

[IPNS दस्तावेज़](https://docs.ipfs.tech/concepts/ipns/)

[DNS लिंक दस्तावेज़](https://dnslink.io/#introduction)

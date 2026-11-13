<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS पर वेबसाइट का प्रकाशन 

![](/content-images/IPFS-40c2e22732.webp)

## IPFS का परिचय 

IPFS (InterPlanetary File System) एक पीयर-टू-पीयर (peer-to-peer) प्रोटोकॉल और नेटवर्क है, जिसे फ़ाइलों को स्टोर और शेयर करने का एक डिसेंट्रलाइज़्ड (decentralized) तरीका बनाने के लिए डिज़ाइन किया गया है। 

इंटरनेट के पारंपरिक क्लाइंट-सर्वर (client-server) मॉडल के विपरीत, IPFS उपयोगकर्ताओं को कंटेंट स्टोर और वितरित करने के लिए किसी सेंट्रलाइज़्ड सर्वर पर निर्भर रहने के बजाय, फ़ाइलें सीधे एक-दूसरे के साथ शेयर करने की सुविधा देता है। 

IPFS में फ़ाइलों को *कंटेंट-एड्रेसिंग* (content-addressing) के माध्यम से एड्रेस किया जाता है, यानी हर फ़ाइल को उसके कंटेंट के आधार पर एक यूनिक हैश (hash) या कंटेंट आइडेंटिफ़ायर (CID) दिया जाता है, और इसी हैश का उपयोग नेटवर्क से फ़ाइल प्राप्त करने के लिए किया जाता है।

IPFS कंटेंट को CID द्वारा पहचाने जाने वाले ब्लॉक के रूप में स्टोर करता है। कोई फ़ाइल जोड़ने पर वह आपके नोड पर स्टोर होती है; वह अपने-आप दूसरे नोड पर कॉपी नहीं होती। एक पहुँच योग्य कॉपी ऑनलाइन रखें, या रिमोट पिनिंग (remote pinning) की व्यवस्था करें, ताकि दूसरे पाठक उसे प्राप्त कर सकें। देखें [IPFS पर्सिस्टेंस](https://docs.ipfs.tech/concepts/persistence/)।

पढ़ें [IPFS का परिचय](https://blog.infura.io/post/an-introduction-to-ipfs)



## आपकी साइट का निर्माण 

इस उदाहरण में हम एक सरल वेबसाइट बना रहे हैं। 

[उदाहरण साइट](https://squirrel.surf)


**चरण 1:** यदि आप वेब डिज़ाइन से परिचित नहीं हैं, तो अपनी वेबसाइट का मुख्य कंटेंट लिखें, जिसमें शीर्षक, टेक्स्ट का मुख्य भाग, अन्य पेज/साइट के लिंक और फ़ुटर (footer) शामिल हों।

**चरण 2:** एक [HTML टेम्पलेट!](https://nicepage.com/html-templates) का उपयोग करें। आपने जो टेक्स्ट लिखा है, उसे उसी के अनुसार पेस्ट करें। आप चाहें तो अपनी वेबसाइट के लिए एक .CSS स्टाइलशीट (stylesheet) भी बना सकते हैं। 

**चरण 3:** अपना होमपेज साइट फ़ोल्डर के रूट (root) पर `index.html` में रखें। इसकी इमेज और CSS को `style.css` जैसे रिलेटिव पाथ (relative path) के साथ शामिल करें, ताकि वे IPFS गेटवे (gateway) URL के अंतर्गत भी काम करें।



## नोड का सेटअप

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) आपके लिए नोड को मैनेज करता है। अपनी साइट शेयर करते समय इसे चालू रखें।

[कमांड-लाइन तरीके](https://docs.ipfs.tech/how-to/command-line-quick-start/) के लिए, एक बार एक नई रिपॉज़िटरी (repository) इनिशियलाइज़ करें:

```sh
ipfs init
```

फिर नोड शुरू करें और यह टर्मिनल खुला छोड़ दें:

```sh
ipfs daemon
```

बाकी कमांड दूसरे टर्मिनल में चलाएँ। यदि IPFS Desktop पहले से इस रिपॉज़िटरी को मैनेज कर रहा है, तो दूसरा डेमन (daemon) शुरू न करें।

**साइट फ़ोल्डर को IPFS में जोड़ें**: 

IPFS Desktop में, Add Folder विकल्प का उपयोग करके अपनी वेबसाइट की फ़ाइलों वाला फ़ोल्डर चुनें।

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

CLI तरीके के लिए, इसे अपने साइट फ़ोल्डर की पैरेंट डायरेक्टरी (parent directory) से चलाएँ:

```sh
ipfs add -r folder_name
```

`folder_name` को अपने फ़ोल्डर के नाम से बदलें (स्पेस वाले नामों को उद्धरण चिह्नों में रखें)। अंतिम `added ... folder_name` लाइन पर दिया गया CID सेव करें: यह पूरी डायरेक्टरी की पहचान करता है, केवल `index.html` की नहीं।


### IPFS पर साइट की पिनिंग:

CLI की `ipfs add` कमांड डिफ़ॉल्ट रूप से इम्पोर्ट किए गए कंटेंट को लोकल रूप से पिन करती है। फ़ोल्डर पिन की जाँच इससे करें:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` को पिछले चरण के CID से बदलें; आउटपुट में `recursive` दिखना चाहिए। पिनिंग इस नोड की कॉपी को गार्बेज कलेक्शन (garbage collection) से बचाती है, लेकिन बंद कंप्यूटर को ऑनलाइन नहीं रखती। आपका नोड ऑफ़लाइन होने पर भी उपलब्धता के लिए, [रिमोट पिनिंग](https://docs.ipfs.tech/how-to/work-with-pinning-services/) की व्यवस्था करें और पुष्टि करें कि रिमोट सेवा ने पिनिंग पूरी कर ली है।

### IPFS पर आपकी वेबसाइट तक पहुँच: 

सबसे पहले `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` पर लोकल गेटवे के माध्यम से अपनी साइट की जाँच करें (यदि अलग हो, तो आपके डेमन द्वारा प्रिंट किए गए गेटवे पोर्ट का उपयोग करें)। अंत का स्लैश रिलेटिव लिंक को डायरेक्टरी के भीतर रिज़ॉल्व होने देता है।

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/` जैसा कोई पब्लिक गेटवे इसे तभी सर्व कर सकता है, जब वह किसी पहुँच योग्य नोड से कंटेंट प्राप्त कर सके। सफल लोकल प्रीव्यू से पब्लिक उपलब्धता साबित नहीं होती।

हमारे मामले में CID = “QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3”


## IPNS 

Interplanetary Naming System (IPNS) आपको अपनी वेबसाइट से जुड़े IPFS CID को अपडेट करने और फिर भी एक स्थिर लिंक सर्व करने की सुविधा देता है। यह एक की (key) के रूप में दिया जाता है। 

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

IPFS डेस्कटॉप एप्लिकेशन पर अपने साइट फ़ोल्डर के सेटिंग मेनू में Publish to IPNS चुनें।  

![](/content-images/IPNS-2fe62cc369.webp)

की: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

इसका उपयोग गेटवे के माध्यम से हमारी साइट देखने के लिए भी किया जा सकता है: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS लिंक 
 
साइट बन चुकी है, अब हमें किसी URL को कंटेंट की ओर पॉइंट करने का तरीका चाहिए। 

`example.com` के लिए, यह DNS रिकॉर्ड जोड़ें और `YOUR_FOLDER_CID` को अपनी डायरेक्टरी के CID से बदलें:

| प्रकार | नाम | मान |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

कुछ DNS प्रोवाइडर ज़ोन अपने-आप जोड़ देते हैं; वहाँ केवल `_dnslink` दर्ज करें। यदि ऊपर दिए गए IPNS नाम का उपयोग कर रहे हैं, तो मान इसके बजाय `dnslink=/ipns/YOUR_IPNS_NAME` हो सकता है। देखें [DNSLink](https://docs.ipfs.tech/concepts/dnslink/)।

![](/content-images/example-c2a9edb28b.webp)

DNS प्रोपेगेशन (propagation) के बाद, `https://ipfs.io/ipns/example.com/` आज़माएँ। साइट को सीधे `https://example.com/` पर सर्व करने के लिए DNSLink-सक्षम गेटवे और HTTPS कॉन्फ़िगरेशन की भी ज़रूरत होती है; केवल TXT रिकॉर्ड इन्हें सेट नहीं करता। [कस्टम डोमेन गाइड](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) का पालन करें।

बधाई हो! आपने एक सेंसरशिप-रोधी (censorship resistant) वेबसाइट सेट कर ली है। 


**संसाधन**

[IPFS डॉक्यूमेंटेशन](https://docs.ipfs.tech)

[IPNS डॉक्यूमेंटेशन](https://docs.ipfs.tech/concepts/ipns/)

[DNS लिंक डॉक्यूमेंटेशन](https://dnslink.io/#introduction)

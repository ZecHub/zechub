<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS पर साइट का प्रकाशन

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## IPFS का परिचय

IPFS (InterPlanetary File System) एक पीयर-टू-पीयर (peer-to-peer) प्रोटोकॉल और नेटवर्क है। इसे फ़ाइलों को स्टोर और शेयर करने का एक डिसेंट्रलाइज़्ड (decentralized) तरीका बनाने के लिए डिज़ाइन किया गया है।

इंटरनेट के पारंपरिक क्लाइंट-सर्वर मॉडल से अलग, IPFS में यूज़र कंटेंट को स्टोर और वितरित करने के लिए किसी सेंट्रलाइज़्ड सर्वर पर निर्भर नहीं रहते। इसके बजाय वे फ़ाइलें सीधे एक-दूसरे के साथ शेयर कर सकते हैं।

IPFS में फ़ाइलों को *कंटेंट-एड्रेसिंग* (content-addressing) के ज़रिए एड्रेस किया जाता है। इसका मतलब है कि हर फ़ाइल को उसके कंटेंट के आधार पर एक यूनिक हैश या कंटेंट आइडेंटिफ़ायर (CID) दिया जाता है। इसी हैश से फ़ाइल को नेटवर्क से प्राप्त किया जाता है।

IPFS कंटेंट को CID से पहचाने जाने वाले ब्लॉक (block) के रूप में स्टोर करता है। कोई फ़ाइल जोड़ने पर वह आपके नोड (node) पर स्टोर होती है। वह अपने-आप दूसरे नोड पर कॉपी नहीं होती। एक पहुँच योग्य कॉपी ऑनलाइन रखें या रिमोट पिनिंग की व्यवस्था करें, ताकि दूसरे पाठक उसे प्राप्त कर सकें। [IPFS पर्सिस्टेंस](https://docs.ipfs.tech/concepts/persistence/) देखें।

**पढ़ें: [IPFS का परिचय](https://blog.infura.io/post/an-introduction-to-ipfs)**

## आपकी साइट का निर्माण

इस उदाहरण में हम एक सरल वेबसाइट बना रहे हैं।

[उदाहरण साइट](https://squirrel.surf/)

**चरण 1:** अगर आप वेब डिज़ाइन से परिचित नहीं हैं, तो पहले अपनी वेबसाइट का मुख्य कंटेंट लिखें। इसमें शीर्षक, मुख्य टेक्स्ट, दूसरे पेज/साइट के लिंक और फ़ुटर शामिल करें।

**चरण 2:** एक [HTML टेम्पलेट!](https://nicepage.com/html-templates) का उपयोग करें और अपना लिखा हुआ टेक्स्ट उसमें सही जगह पेस्ट करें। चाहें तो अपनी वेबसाइट के लिए एक .CSS स्टाइलशीट भी बना सकते हैं।

**चरण 3:** अपना होमपेज साइट फ़ोल्डर के रूट में `index.html` में रखें। उसकी इमेज और CSS भी शामिल करें। इनके लिए `style.css` जैसे रिलेटिव पाथ का उपयोग करें, ताकि वे IPFS गेटवे URL के अंतर्गत भी काम करें।

## नोड का सेटअप

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) आपके लिए नोड का प्रबंधन करता है। अपनी साइट शेयर करते समय इसे चालू रखें।

[कमांड-लाइन तरीके](https://docs.ipfs.tech/how-to/command-line-quick-start/) के लिए एक बार नई रिपॉज़िटरी इनिशियलाइज़ करें:

```sh
ipfs init
```

इसके बाद नोड शुरू करें और यह टर्मिनल खुला छोड़ दें:

```sh
ipfs daemon
```

बाकी कमांड दूसरे टर्मिनल में चलाएँ। अगर IPFS Desktop पहले से इस रिपॉज़िटरी का प्रबंधन कर रहा है, तो दूसरा डेमन शुरू न करें।

### **साइट फ़ोल्डर को IPFS में जोड़ें**:

IPFS Desktop में Add Folder विकल्प से अपनी वेबसाइट की फ़ाइलों वाला फ़ोल्डर चुनें।


<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

CLI तरीके के लिए यह कमांड अपनी साइट फ़ोल्डर की पैरेंट डायरेक्टरी से चलाएँ:

```sh
ipfs add -r folder_name
```

`folder_name` की जगह अपने फ़ोल्डर का नाम लिखें। जिन नामों में स्पेस हों, उन्हें कोट में रखें। आखिरी `added ... folder_name` लाइन पर दिया गया CID सेव कर लें। यह सिर्फ़ `index.html` को नहीं, बल्कि पूरी डायरेक्टरी को पहचानता है।

### IPFS पर साइट को पिन करें:

CLI का `ipfs add` कमांड डिफ़ॉल्ट रूप से इम्पोर्ट किए गए कंटेंट को लोकली पिन करता है। फ़ोल्डर का पिन इस कमांड से जाँचें:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` की जगह पिछले चरण वाला CID लिखें। आउटपुट में `recursive` दिखना चाहिए। पिनिंग इस नोड की कॉपी को गार्बेज कलेक्शन से बचाती है, लेकिन बंद कंप्यूटर को ऑनलाइन नहीं रखती। आपका नोड ऑफ़लाइन होने पर भी साइट उपलब्ध रहे, इसके लिए [रिमोट पिनिंग](https://docs.ipfs.tech/how-to/work-with-pinning-services/) की व्यवस्था करें। फिर पक्का करें कि रिमोट सर्विस ने पिनिंग पूरी कर ली है।

### IPFS पर अपनी वेबसाइट तक पहुँच:

सबसे पहले `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` पर लोकल गेटवे के ज़रिए अपनी साइट जाँचें। अगर आपका डेमन कोई दूसरा गेटवे पोर्ट दिखाता है, तो उसका उपयोग करें। आखिर में लगा स्लैश रिलेटिव लिंक को डायरेक्टरी के अंदर सही तरह खुलने देता है।

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/` जैसा पब्लिक गेटवे साइट को तब दिखा सकता है, जब वह किसी पहुँच योग्य नोड से कंटेंट प्राप्त कर सके। लोकल प्रीव्यू सफल होने का मतलब यह नहीं कि साइट पब्लिक रूप से उपलब्ध है।

हमारे मामले में CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS) की मदद से आप अपनी वेबसाइट से जुड़े IPFS CID अपडेट कर सकते हैं और फिर भी एक स्थायी लिंक दे सकते हैं। यह एक की (key) के रूप में मिलता है।


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


IPFS डेस्कटॉप एप्लिकेशन में अपने साइट फ़ोल्डर के सेटिंग मेनू में जाकर Publish to IPNS चुनें।

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


की: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

इसका उपयोग गेटवे के ज़रिए हमारी साइट देखने के लिए भी किया जा सकता है: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS लिंक

साइट बन गई है। अब हमें एक URL को इस कंटेंट की ओर पॉइंट करने का तरीका चाहिए।

`example.com` के लिए यह DNS रिकॉर्ड जोड़ें और `YOUR_FOLDER_CID` की जगह अपनी डायरेक्टरी का CID लिखें:

| टाइप | नाम | वैल्यू |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

कुछ DNS प्रोवाइडर ज़ोन अपने-आप जोड़ देते हैं। वहाँ सिर्फ़ `_dnslink` लिखें। अगर आप ऊपर वाले IPNS नाम का उपयोग कर रहे हैं, तो वैल्यू की जगह `dnslink=/ipns/YOUR_IPNS_NAME` भी रखी जा सकती है। [DNSLink](https://docs.ipfs.tech/concepts/dnslink/) देखें।


<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


DNS प्रोपेगेशन के बाद `https://ipfs.io/ipns/example.com/` आज़माएँ। साइट को सीधे `https://example.com/` पर दिखाने के लिए DNSLink को सपोर्ट करने वाला गेटवे और HTTPS कॉन्फ़िगरेशन भी चाहिए। सिर्फ़ TXT रिकॉर्ड से ये सेट नहीं होते। [कस्टम-डोमेन गाइड](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) का पालन करें।

*बधाई हो! अब आपके पास एक सेंसरशिप-रोधी वेबसाइट है।*

____

**संसाधन**

[IPFS डॉक्यूमेंटेशन](https://docs.ipfs.tech/)

[IPNS डॉक्यूमेंटेशन](https://docs.ipfs.tech/concepts/ipns/)

[DNS लिंक डॉक्यूमेंटेशन](https://dnslink.io/#introduction)

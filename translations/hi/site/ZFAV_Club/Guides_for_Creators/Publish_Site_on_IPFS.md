<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS पर एक साइट प्रकाशित करें

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## IPFS के परिचय

IPFS (InterPlanetary File System) एक peer-to-peer प्रोटोकॉल और नेटवर्क है, जो फ़ाइलों के संग्रहण और साझा करने के लिए एक डिस्पैच तरीका बनाने के लिए डिज़ाइन किया गया है।

ईंटरनेट के पारंपरिक क्लाइंट-सर्वर मॉडल के विपरीत, IPFS उपयोगकर्ताओं को एक दूसरे से सीधे फ़ाइलें साझा करने की अनुमति देता है, बजाय केंद्रित सर्वर पर निर्भर करने के।

IPFS में फ़ाइलों के *कंटेंट-एड्रेसिंग* के उपयोग से एड्रेस किया जाता है, इसका मतलब है कि प्रत्येक फ़ाइल अपनी सामग्री के आधार पर एक अद्वितीय हैश या CONTENT IDENTIFIER (CID) मिलता है, और इस हैश का उपयोग नेटवर्क से फ़ाइल प्राप्त करने के लिए किया जाता है।

IPFS सामग्री को ब्लॉक्स के रूप में संग्रहित करता है, जिनकी पहचान CID से होती है। फ़ाइल जोड़ने पर वह आपके नोड पर संग्रहित होती है; यह उसे अपने-आप दूसरे नोडों पर कॉपी नहीं करता। एक ऐसी कॉपी ऑनलाइन रखें जिस तक पहुँचा जा सके, या रिमोट पिनिंग की व्यवस्था करें, ताकि दूसरे पाठक उसे प्राप्त कर सकें। देखें [IPFS स्थायित्व](https://docs.ipfs.tech/concepts/persistence/)।

**पढ़ें: [IPFS के परिचय](https://blog.infura.io/post/an-introduction-to-ipfs)**

## अपनी साइट बनाएं

इस उदाहरण में हम एक साधारण वेबसाइट बना रहे हैं।

[उदाहरण साइट](https://squirrel.surf/)

**चरण 1:** यदि आप वेब डिज़ाइन के साथ परिचित नहीं हैं, तो अपनी वेबसाइट के मुख्य सामग्री लिखें, शीर्षक, मुख्य पाठ के साथ, अन्य पृष्ठों/साइट और फ़ुटर के लिंक।

**चरण 2:** [एक HTML टेम्पलेट का उपयोग करें!](https://nicepage.com/html-templates) आपने लिखे पाठ को अनुसूचित करें। वेबसाइट के लिए .CSS स्टाइलशीट भी बनाना चाहते हैं, यह वैकल्पिक है।

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

शेष कमांड दूसरे टर्मिनल में चलाएँ। यदि IPFS Desktop पहले से ही इस रिपॉज़िटरी का प्रबंधन कर रहा है, तो दूसरा daemon शुरू न करें।

### **साइट फ़ोल्डर IPFS में जोड़ें**:

IPFS Desktop में, Add Folder विकल्प का उपयोग करके अपनी वेबसाइट की फ़ाइलों वाला फ़ोल्डर चुनें।

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

CLI तरीके के लिए, इसे अपने साइट फ़ोल्डर की पैरेंट डायरेक्टरी से चलाएँ:

```sh
ipfs add -r folder_name
```

`folder_name` को अपने फ़ोल्डर के नाम से बदलें (जिन नामों में स्पेस हों उन्हें उद्धरण चिह्नों में रखें)। अंतिम `added ... folder_name` पंक्ति पर दिया गया CID सहेज लें: यह केवल `index.html` की नहीं, बल्कि पूरी डायरेक्टरी की पहचान करता है।

### IPFS पर साइट को पिन करें:

CLI `ipfs add` कमांड डिफ़ॉल्ट रूप से आयात की गई सामग्री को स्थानीय रूप से पिन करता है। फ़ोल्डर पिन की जाँच इससे करें:

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` को पिछले चरण के CID से बदलें; आउटपुट में `recursive` दिखना चाहिए। पिनिंग इस नोड की कॉपी को garbage collection से बचाती है, लेकिन बंद कंप्यूटर को ऑनलाइन नहीं रखती। जब आपका नोड ऑफ़लाइन हो, तब भी उपलब्धता बनाए रखने के लिए [रिमोट पिनिंग](https://docs.ipfs.tech/how-to/work-with-pinning-services/) की व्यवस्था करें और पुष्टि करें कि रिमोट सेवा ने पिनिंग पूरी कर ली है।

### IPFS पर अपनी वेबसाइट का उपयोग करें:

पहले अपनी साइट को `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` पर स्थानीय gateway के ज़रिए जाँचें (अगर आपका daemon कोई दूसरा gateway पोर्ट दिखाता है, तो वही पोर्ट इस्तेमाल करें)। अंत में लगा स्लैश relative लिंक को डायरेक्टरी के अंदर ही resolve होने देता है।

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/` जैसा कोई सार्वजनिक गेटवे इसे तभी सर्व कर सकता है जब वह किसी पहुँच योग्य नोड से सामग्री प्राप्त कर सके। स्थानीय प्रीव्यू का सफल होना यह साबित नहीं करता कि सामग्री सार्वजनिक रूप से उपलब्ध है।

हमारे मामले में CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System (IPNS) आपकी वेबसाइट के संबंधित IPFS CIDs को अद्यतन करने की अनुमति देता है, लेकिन एक स्थिर लिंक प्रदान करता है। इसे एक कुंजी के रूप में प्रदान किया जाता है।


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


IPFS डेस्कटॉप एप्लिकेशन पर अपने साइट फ़ोल्डर के सेटिंग मेनू में Publish to IPNS का चयन करें।

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


कुंजी: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

इसे एक गेटवे के माध्यम से हमारी साइट को देखने के लिए भी उपयोग किया जा सकता है: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS लिंक

साइट बना दी गई है, अब हमें URL को सामग्री पर निर्देशित करने के एक तरीके की आवश्यकता है।

`example.com` के लिए, यह DNS रिकॉर्ड जोड़ें और `YOUR_FOLDER_CID` को अपनी डायरेक्टरी के CID से बदलें:

| प्रकार | नाम | मान |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

कुछ DNS प्रदाता zone को अपने आप जोड़ देते हैं; वहाँ केवल `_dnslink` दर्ज करें। यदि आप ऊपर दिए गए IPNS नाम का उपयोग कर रहे हैं, तो मान इसके बजाय `dnslink=/ipns/YOUR_IPNS_NAME` हो सकता है। देखें [DNSLink](https://docs.ipfs.tech/concepts/dnslink/)।

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


DNS प्रसार के बाद, `https://ipfs.io/ipns/example.com/` आज़माएँ। साइट को सीधे `https://example.com/` पर उपलब्ध कराने के लिए DNSLink-सक्षम gateway और HTTPS कॉन्फ़िगरेशन की भी ज़रूरत होती है; अकेला TXT रिकॉर्ड इन्हें सेट नहीं करता। [कस्टम-डोमेन गाइड](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/) का पालन करें।

*अभिनंदन! अब आपके पास एक विरोधी-अवरोधन सहित वेबसाइट है।*

____

**संसाधन**

[IPFS दस्तावेज़](https://docs.ipfs.tech/)

[IPNS दस्तावेज़](https://docs.ipfs.tech/concepts/ipns/)

[DNS लिंक दस्तावेज़](https://dnslink.io/#introduction)

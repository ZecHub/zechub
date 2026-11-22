<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Improvement_Proposals.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash सुधार प्रस्ताव (Improvement Proposals)

<img width="672" height="378" alt="1" src="/content-images/fbce4a28-585b-4caa-b306-4cf06bcb5977-0b61791008.webp" />



# ZIP क्या है
Zcash सुधार प्रस्ताव (ZIP) एक डिज़ाइन दस्तावेज़ है, जो Zcash समुदाय को जानकारी देता है या Zcash, उसकी प्रक्रियाओं या उसके परिवेश के लिए किसी नई सुविधा का वर्णन करता है। ZIP में उस सुविधा का संक्षिप्त तकनीकी विनिर्देश (specification) और उसका औचित्य (rationale) दिया जाना चाहिए।

हमारा उद्देश्य है कि नई सुविधाओं का प्रस्ताव रखने, किसी मुद्दे पर समुदाय की राय एकत्र करने और Zcash में शामिल किए गए डिज़ाइन निर्णयों का दस्तावेज़ीकरण करने का मुख्य माध्यम ZIP ही हों। ZIP के स्वामी (आमतौर पर इसके लेखक) समुदाय के भीतर कंसेंसस बनाने और असहमति वाले विचारों का दस्तावेज़ीकरण करने के लिए ज़िम्मेदार होते हैं।

चूँकि ZIP को एक वर्ज़न-नियंत्रित रिपॉज़िटरी (repository) में टेक्स्ट फ़ाइलों के रूप में रखा जाता है, इसलिए उनका संशोधन इतिहास ही किसी सुविधा के प्रस्ताव का ऐतिहासिक रिकॉर्ड होता है।

-> [zips.z.cash](https://zips.z.cash)


## ZIP संपादक (Editors)

आने वाले हर ZIP को समीक्षा प्रक्रिया से गुज़रना होता है। ZIP संपादकों का काम यह सुनिश्चित करना है कि किसी भी ZIP का फ़ॉर्मेट और सामग्री उसके शब्दों, औचित्य और किए गए तकनीकी परिवर्तनों का पर्याप्त रूप से वर्णन करे।

```markdown
* Jack Grigg, Kris Nuttycombe and Daira-Emma Hopwood associated with the ECC.
* Conrado, and Arya, associated with the ZF.
* Sam and Mark, associated with SL.
```

## उल्लेखनीय वर्तमान ZIP

नीचे दी गई स्थितियों और शीर्षकों को 18 अगस्त 2026 को [zips.z.cash](https://zips.z.cash/#index-of-zips) पर ZIP इंडेक्स से मिलाकर जाँचा गया था। किसी ZIP की स्थिति समय के साथ बदलती रहती है, इसलिए सही जानकारी के लिए इंडेक्स को ही प्रमाण मानें।

> ड्राफ़्ट: [ट्रांसपेरेंट Zcash एक्सटेंशन](https://zips.z.cash/zip-0222)

> ड्राफ़्ट: [Zcash शील्डेड एसेट का ट्रांसफ़र और बर्न](https://zips.z.cash/zip-0226)

> ड्राफ़्ट: [Zcash शील्डेड एसेट का जारीकरण](https://zips.z.cash/zip-0227)

> वापस लिया गया: [वापस लिया गया संस्करण 6 लेनदेन फ़ॉर्मेट](https://zips.z.cash/zip-0230) — इसकी जगह अब ZIP 229 ने ले ली है, जो लेनदेन संस्करण 6 को परिभाषित करता है। नीचे दी गई NU6.3 सूची देखें।

> ड्राफ़्ट: [ट्रांसपेरेंट Zcash एक्सटेंशन के लिए लेनदेन आइडेंटिफ़ायर डाइजेस्ट और सिग्नेचर सत्यापन](https://zips.z.cash/zip-0245)

> ड्राफ़्ट: [मानकीकृत मेमो फ़ील्ड फ़ॉर्मेट](https://zips.z.cash/zip-0302)

> ड्राफ़्ट: [Sapling एड्रेस सिग्नेचर](https://zips.z.cash/zip-0304)

> ड्राफ़्ट: [भुगतान की पहचान के लिए लाइट क्लाइंट प्रोटोकॉल](https://zips.z.cash/zip-0307)

> ड्राफ़्ट: [Sapling व्यूइंग की की सुरक्षा विशेषताएँ](https://zips.z.cash/zip-0310)

> सक्रिय: [ऐसे एड्रेस प्रकार की परिभाषा, जिस पर फ़ंड केवल ट्रांसपेरेंट एड्रेस से भेजे जा सकते हैं](https://zips.z.cash/zip-0320)

> ड्राफ़्ट: [Wallet.dat फ़ॉर्मेट](https://zips.z.cash/zip-0400)

## NU6.3 (Ironwood) ZIP

NU6.3 का वर्णन ZIP 258 में और यहाँ सूचीबद्ध अतिरिक्त ZIP में किया गया है। उम्मीदवार ZIP का पूरा समूह [ZIP इंडेक्स](https://zips.z.cash/#nu6-3-candidate-zips) पर प्रकाशित है।

> ड्राफ़्ट: [NU6.3 नेटवर्क अपग्रेड की तैनाती](https://zips.z.cash/zip-0258)

> ड्राफ़्ट: [संस्करण 6 लेनदेन फ़ॉर्मेट](https://zips.z.cash/zip-0229)

> ड्राफ़्ट: [Orchard से Ironwood में माइग्रेशन](https://zips.z.cash/zip-0318)

> ड्राफ़्ट: [वॉलेट पर NU6.3 के प्रभाव](https://zips.z.cash/zip-0326)

> प्रस्तावित: [Ironwood क्वांटम रिकवरेबिलिटी](https://zips.z.cash/zip-2005)

> आरक्षित: [Orchard पूल में ट्रांसफ़र पर प्रतिबंध](https://zips.z.cash/zip-2006)

NU6.3 के लिए तीन पुराने ZIP भी अपडेट किए गए हैं: [ZIP 209](https://zips.z.cash/zip-0209), [ZIP 213](https://zips.z.cash/zip-0213) और [ZIP 317](https://zips.z.cash/zip-0317)।

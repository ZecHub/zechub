# ZAP1 सत्यापन प्रोटोकॉल

ZAP1, Zcash के लिए एक ओपन-सोर्स सत्यापन (attestation) प्रोटोकॉल है। यह संरचित लाइफ़साइकल इवेंट को एक BLAKE2b Merkle ट्री में लिखता है और Orchard शील्डेड (shielded) मेमो (memo) के ज़रिए ट्री रूट को ऑन-चेन (on-chain) एंकर करता है। प्रूफ (proof) सार्वजनिक रूप से सत्यापित किए जा सकते हैं। इवेंट डेटा निजी रहता है।

## यह कैसे काम करता है

ऑपरेटर इवेंट के प्रकार (डिप्लॉयमेंट, भुगतान (payment), ट्रांसफ़र आदि) रजिस्टर करते हैं और उन्हें एक ZAP1 इंस्टेंस में जमा करते हैं। हर इवेंट डोमेन-सेपरेटेड BLAKE2b-256 का उपयोग करके एक लीफ़ हैश बनाता है। लीफ़ एक Merkle ट्री में जमा होती जाती हैं। जब एक सीमा पूरी हो जाती है, तो ट्री रूट को ZAP1:09 मेमो के रूप में एन्कोड किया जाता है और एक शील्डेड लेनदेन (transaction) में Zcash पर एंकर किया जाता है।

जिस किसी के पास लीफ़ हैश है, वह ऑपरेटर पर भरोसा किए बिना, लीफ़ से रूट तक और फिर ऑन-चेन एंकर तक का पूरा पाथ सत्यापित कर सकता है।

## मुख्य विशेषताएँ

- **एप्लिकेशन से स्वतंत्र**: कोई भी Zcash ऑपरेटर अपने स्वयं के इवेंट प्रकार और पर्सनलाइज़ेशन स्ट्रिंग परिभाषित कर सकता है
- **गोपनीयता (privacy) की रक्षा**: एंकर करने से पहले इवेंट पेलोड को हैश किया जाता है। केवल हैश ही ऑन-चेन जाते हैं।
- **स्वतंत्र रूप से सत्यापन योग्य**: सत्यापन के लिए केवल प्रूफ बंडल और चेन (chain) तक पहुँच की आवश्यकता होती है। ऑपरेटर पर भरोसे की आवश्यकता नहीं है।
- **ZIP 302 के अनुकूल**: ZAP1 सत्यापन पेलोड के लिए एक ZIP 302 partType की ओर बढ़ रहा है

## क्या उपलब्ध है

- रेफ़रेंस इम्प्लीमेंटेशन (Rust, MIT लाइसेंस प्राप्त)
- crates.io पर सत्यापन SDK (Rust + 83KB WASM)
- npm पर JavaScript SDK
- यूनिवर्सल मेमो डिकोडर (ZAP1, ZIP 302 TVLV, टेक्स्ट, बाइनरी और खाली मेमो की पहचान करता है)
- 29 API जाँचों और 14 प्रोटोकॉल जाँचों वाली अनुरूपता किट
- मल्टी-पार्टी एंकर ब्रॉडकास्टिंग के लिए FROST 2-of-3 थ्रेशोल्ड साइनिंग डिज़ाइन
- ZIP ड्राफ़्ट PR #1243 समीक्षाधीन
- मार्च 2026 तक 14 लीफ़ के साथ 4 मेननेट एंकर

## आर्किटेक्चर

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

हर ऑपरेटर अपनी स्वयं की कुंजियों, Merkle ट्री और एंकर के साथ अपना स्वयं का ZAP1 इंस्टेंस चलाता है। ऑपरेटरों के बीच कोई साझा स्थिति नहीं होती।

## अधिक जानकारी कहाँ से प्राप्त करें

- सोर्स: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- सत्यापन SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- मेमो डिकोडर: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- प्रोटोकॉल स्पेसिफ़िकेशन: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP ड्राफ़्ट: [PR #1243](https://github.com/zcash/zips/pull/1243)
- लाइव API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- ऑपरेटर गाइड: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)

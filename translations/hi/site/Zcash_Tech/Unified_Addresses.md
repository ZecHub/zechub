# Unified Address (ZIP-316) सत्यापन

*यह एक शिक्षण मार्गदर्शिका है, कोई पैकेज्ड डिकोडर या कॉपी-पेस्ट भुगतान लाइब्रेरी नहीं। यह बताती है कि Unified Address की संरचना कैसी होती है, ताकि आप समझ सकें कि रखरखाव वाली लाइब्रेरी पर्दे के पीछे क्या करती हैं। वास्तविक धन संभालने वाली किसी भी चीज़ के लिए, [ZIP-316 विनिर्देशन](https://zips.z.cash/zip-0316) और नीचे लिंक किए गए आधिकारिक कार्यान्वयनों का उपयोग करें।*

---

## व्यापक चित्र

एक Unified Address (UA) एकल पता स्ट्रिंग है जिसमें कई रिसीवर प्रकार होते हैं: **Transparent**, **Sapling**, **Orchard**, या इनका संयोजन। भुगतान करने वाला wallet अपने समर्थित रिसीवर पूल में से स्वचालित रूप से सर्वोत्तम रिसीवर चुनता है।

UA को कई लेबल वाले कार्डों वाले एक सीलबंद लिफाफे की तरह समझें। हर कार्ड आप तक पहुँचने का एक अलग तरीका दर्शाता है। किसी पते की जाँच करने के लिए, एक एप्लिकेशन को:

1. **लिफाफा खोलना:** टेक्स्ट स्ट्रिंग को डिकोड करें।
2. **सामग्री को फिर से क्रमबद्ध करना:** सुरक्षात्मक मिश्रण को हटाएँ (**F4Jumble**)।
3. **हर कार्ड पढ़ना:** अलग-अलग रिसीवर निकालें।
4. **प्रोटोकॉल नियम लागू करना:** typecode रेंज के अनुसार प्रविष्टियों को अनदेखा या अस्वीकार करें।

---

## केवल Bech32m को डिकोड करना पर्याप्त क्यों नहीं है

UA Bech32m टेक्स्ट एन्कोडिंग का उपयोग करता है, लेकिन केवल Bech32m को डिकोड करने से उपयोग योग्य रिसीवर प्रकट नहीं होते।

ZIP-316 एन्कोडिंग से पहले जानबूझकर payload को **F4Jumble** के उपयोग से मिश्रित करता है। F4Jumble यह सुनिश्चित करता है कि पते में एक भी वर्ण बदलने पर डिकोड किया गया आउटपुट पूरी तरह बदल जाए। यह address malleability हमलों को रोकता है, जिनमें हमलावर पते के मध्य में bytes बदलता है, जबकि prefix और suffix वैध दिखाई देते रहते हैं।

> **मुख्य नियम:** Malleability सुरक्षा तभी काम करती है जब आपका एप्लिकेशन पूरी decoding और validation pipeline चलाता है। आंशिक decoding जोखिम बनाए रखते हुए सुरक्षा हटा देती है।

---

## डिकोडिंग pipeline, चरण-दर-चरण

### चरण 1: Bech32m डिकोड करें और नेटवर्क जाँचें
- **मानव-पठनीय भाग (HRP):** `u` mainnet की पहचान करता है; `utest` testnet की पहचान करता है। *(Mainnet UAs `u1` से शुरू होते हैं, जहाँ `1` Bech32 separator है।)*
- **लंबाई सीमा:** मानक Bech32m 90-वर्णों की सीमा लागू करता है। UAs आम तौर पर इस सीमा से अधिक होते हैं, इसलिए decoder में मानक लंबाई जाँच निष्क्रिय होनी चाहिए।
- 5-bit Bech32m words को वापस मानक 8-bit bytes में बदलें।

### चरण 2: F4Jumble को उलटें
F4Jumble, BLAKE2b पर निर्मित 4-round Feistel network है:
- **बाएँ भाग की लंबाई:** `min(64, floor(length / 2))` bytes। 64 bytes की सीमा BLAKE2b के अधिकतम output size के अनुरूप है। दाएँ भाग में शेष payload होता है।
- **Hash functions:** निश्चित personalization labels (`UA_F4Jumble_G` और `UA_F4Jumble_H`) के उपयोग से G और H को बारी-बारी से लागू करता है।
- **Round क्रम:** आगे की encoding G(0) → H(0) → G(1) → H(1) चलाती है। उलटने (मिश्रण हटाने) में H(1) → G(1) → H(0) → G(0) चलता है।
- **Range जाँच:** ZIP-316 payload size सीमाओं के बाहर के inputs अस्वीकार करें।

### चरण 3: padding हटाएँ और HRP सत्यापित करें
मिश्रण से पहले, encoder HRP वाले 16 bytes जोड़ता है, जिनमें शून्य padding होती है।
- मिश्रण हटाने के बाद अंतिम 16 bytes हटाएँ।
- पुष्टि करें कि embedded HRP अपेक्षित नेटवर्क से मेल खाता है (`u` या `utest`)। यह testnet पतों को गलती से mainnet पर स्वीकार होने से रोकता है।

### चरण 4: रिसीवर निकालें
शेष payload में `(typecode, length, content)` entries होती हैं, जहाँ typecode और लंबाई compact-size integers के रूप में संग्रहीत होते हैं (छोटे मानों के लिए एक byte)। ज्ञात receiver typecodes:

| Typecode | रिसीवर प्रकार       | सामग्री लंबाई |
| :------- | :------------------ | :------------- |
| `0x00`   | Transparent (P2PKH) | 20 bytes       |
| `0x01`   | Transparent (P2SH)  | 20 bytes       |
| `0x02`   | Sapling             | 43 bytes       |
| `0x03`   | Orchard             | 43 bytes       |

इनके अतिरिक्त, ZIP-316 आगे की संगतता के लिए दो अन्य रेंज आरक्षित करता है:

- **`0xC0`–`0xDF` (non-MUST-understand metadata):** consumers को इस रेंज में ऐसे metadata items अनदेखे करने होंगे जिन्हें वे नहीं पहचानते।
- **`0xE0` और `0xE1` (assigned MUST-understand expiry metadata):** वर्तमान ZIP-316 registry इन्हें address expiry height और time के लिए निर्दिष्ट करती है। Consumers को इन items को समझना होगा, अन्यथा पता अस्वीकार करना होगा।
- **`0xE2`–`0xFC` (unassigned MUST-understand metadata):** यदि consumers को इस रेंज में कोई अपरिचित item मिले, तो उन्हें पता अस्वीकार करना होगा।

ज्ञात receiver types के लिए, सत्यापित करें कि encoded लंबाई उस प्रकार की निर्दिष्ट सामग्री लंबाई से मेल खाती है। Metadata items के लिए, सामग्री लंबाई निर्धारित करने हेतु उनकी encoded compact-size लंबाई का उपयोग करें। कटी हुई entries या किसी भी trailing bytes को अस्वीकार करें।

**पसंदीदा रिसीवर क्रम।** पता सफलतापूर्वक parse होने के बाद, wallet या भुगतान tool को इस क्रम में सर्वोत्तम रिसीवर चुनना चाहिए: Orchard, फिर Sapling, फिर transparent।

---

## अनिवार्य ZIP-316 अस्वीकृति नियम

**सफलतापूर्वक डिकोड हो जाना किसी पते को वैध नहीं बनाता।** आधिकारिक Zcash wallets उन पतों को सख्ती से अस्वीकार करते हैं जो निम्नलिखित नियमों का उल्लंघन करते हैं। भुगतान विफलताओं को रोकने के लिए web tools को भी उन्हें अस्वीकार करना चाहिए:

- **Shielded receivers अनुपस्थित:** पते में कम-से-कम एक Sapling या Orchard receiver **होना ही चाहिए**। केवल transparent receivers वाला UA, ZIP-316 के अंतर्गत अमान्य है।
- **दोहराए गए typecodes:** प्रत्येक receiver type अधिकतम एक बार आ सकता है।
- **अक्रमबद्ध typecodes:** रिसीवर सख्ती से आरोही typecode क्रम में होने चाहिए।
- **परस्पर विरोधी transparent receivers:** UA में P2PKH या P2SH में से कोई एक हो सकता है, लेकिन **दोनों कभी नहीं**।
- **विकृत entries या padding:** बेमेल नेटवर्क prefixes, कटे हुए payloads, या लंबाई असंगतियों पर तत्काल अस्वीकृति होनी चाहिए।
- **अपरिचित typecodes:** Consumers को अपरिचित items अनदेखे करने होंगे, सिवाय MUST-understand metadata रेंज (`0xE0`–`0xFC`) के items के, जिन्हें अपरिचित होने पर अस्वीकार करना होगा। वर्तमान registry में `0xE0` और `0xE1` निर्दिष्ट expiry types हैं, जबकि `0xE2`–`0xFC` अनिर्दिष्ट हैं। इसके अतिरिक्त, ऊपर दिए गए अनिवार्य वैधता नियमों में विफल किसी भी पते को अस्वीकार करें, जिसमें Sapling या Orchard receiver की आवश्यकता भी शामिल है।

---

## डेवलपर्स के लिए सर्वोत्तम अभ्यास

- **Raw strings की नहीं, parsed receivers की तुलना करें।** समानता जाँचने से पहले पतों को डिकोड करें।
- **धन संभालने वाली हर चीज़ के लिए रखरखाव वाली लाइब्रेरी का उपयोग करें।** कस्टम JavaScript decoders तैनात करने के बजाय आधिकारिक Rust crates (जैसे `zcash_address`) को WebAssembly में compile करें।
- **हाथ से लिखे parsers के साथ सावधान रहें।** यदि आप सीखने के लिए एक लिखते हैं, तो उसे अध्ययन परियोजना मानें और किसी भी चीज़ पर भरोसा करने से पहले नीचे दिए गए आधिकारिक vectors के विरुद्ध उसका परीक्षण करें।

---

## आधिकारिक विनिर्देश और संदर्भ कार्यान्वयन

- **[ZIP-316: Unified Addresses और Viewing Keys](https://zips.z.cash/zip-0316)**
- **[zcash_address crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **आधिकारिक test vectors:**
  - [F4Jumble test vectors](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Unified Address test vectors](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## शब्दावली

| शब्द | अर्थ |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | कई receiver pools को संयोजित करने वाली एकल पता स्ट्रिंग। |
| **Receiver** | विशिष्ट भुगतान गंतव्य प्रकार (transparent, Sapling, या Orchard)। |
| **Bech32m** | UA strings के लिए उपयोग की जाने वाली टेक्स्ट एन्कोडिंग योजना। |
| **HRP** | मानव-पठनीय भाग या नेटवर्क prefix (`u` या `utest`)। |
| **F4Jumble** | पते की अखंडता सुनिश्चित करने वाला reversible obfuscation algorithm। |
| **Typecode** | प्रत्येक entry की संख्या जो payload में receiver type परिभाषित करती है। |
| **Malleability** | बिना पहचान के address bytes का अनधिकृत संशोधन। |

यह भी देखें: [Viewing Keys](./Viewing_Keys.md)

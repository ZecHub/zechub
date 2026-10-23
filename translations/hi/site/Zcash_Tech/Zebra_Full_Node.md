<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra पूर्ण नोड

## संक्षेप में

- Zebra (`zebrad`) Rust में लिखा गया Zcash पूर्ण नोड है और इसका रखरखाव Zcash Foundation द्वारा किया जाता है।
- यह ब्लॉक और लेनदेन सत्यापित करता है, चेन की स्थिति बनाए रखता है और पीयर-टू-पीयर नेटवर्क पर अन्य नोडों से संवाद करता है।
- Zebra और zcashd ने समान प्रोटोकॉल लागू किया था और वे परस्पर काम कर सकते थे। zcashd के सेवानिवृत्त होने के बाद, Zebra सहमति की भूमिका निभाता है।
- इसे चलाने के दो तरीके हैं: `zfnd/zebra` Docker इमेज या स्रोत से बिल्ड।
- अनुशंसित हार्डवेयर 4 CPU कोर, 16 GB RAM और 300 GB डिस्क है। न्यूनतम आवश्यकता 2 कोर और 4 GB RAM है, साथ में वही 300 GB डिस्क।

## मुख्य व्याख्या

Zebra पहला Zcash नोड है जो पूरी तरह Rust में लिखा गया है। यह Zcash पीयर-टू-पीयर नेटवर्क पर स्थित है, जहाँ यह लेनदेन सत्यापित और प्रसारित करता है तथा blockchain की स्थिति बनाए रखता है। दूसरा स्वतंत्र कार्यान्वयन होने से नेटवर्क का बुनियादी ढाँचा किसी एक codebase पर कम निर्भर रहता है।

### Zebra और zcashd

मूल Zcash नोड, zcashd, को Electric Coin Company ने Bitcoin के codebase से विकसित किया था। Zebra को सुरक्षा और दक्षता पर ध्यान देते हुए, मेमोरी-सुरक्षित भाषा Rust में शुरू से लिखा गया था।

दोनों कार्यान्वयन एक ही प्रोटोकॉल का पालन करते हैं, इसलिए वे संवाद कर सकते थे और परस्पर काम कर सकते थे। zcashd ने 18 जुलाई 2026 को अपनी End-of-Support समाप्ति प्राप्त की और अब शुरू नहीं होता, जिससे Zebra और Zakura उपयोग में रहने वाले नोड कार्यान्वयन हैं। व्यापक जानकारी के लिए [पूर्ण नोड](/zcash-tech/full-nodes) देखें।

## Zebra चलाना

आप Zebra को Docker इमेज से चला सकते हैं या इसे मैन्युअल रूप से बिल्ड कर सकते हैं। कृपया सिस्टम आवश्यकताएँ अनुभाग देखें।

### Docker उपयोग

नवीनतम रिलीज़ चलाने और उसे नवीनतम ब्लॉक तक सिंक्रनाइज़ करने के लिए, निम्न कमांड चलाएँ:

```

docker run zfnd/zebra:latest

```

पूर्ण निर्देशों के लिए [Docker दस्तावेज़](https://zebra.zfnd.org/user/docker.html) देखें।

### Zebra बनाना

Zebra को बनाने के लिए Rust, libclang और एक C++ compiler की आवश्यकता होती है।

- सुनिश्चित करें कि आपके पास Rust का नवीनतम स्थिर संस्करण स्थापित है, क्योंकि Zebra का परीक्षण केवल इसी के साथ किया जाता है।
- आवश्यक build dependencies में शामिल हैं:
  - libclang (जिसे libclang-dev या llvm-dev भी कहा जाता है)
  - clang या कोई अन्य C++ compiler (जैसे सभी प्लेटफ़ॉर्मों के लिए g++ या macOS के लिए Xcode)
  - protoc (Protocol Buffers compiler), जिसमें Protocol Buffers v3.12.0 में पेश किया गया *--experimental_allow_proto3_optional* फ्लैग हो (16 मई 2020 को जारी)।

### स्थापित करें और शुरू करें

glibc 2.34 या नए संस्करण वाले x86_64 अथवा aarch64 Linux पर (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), आप build dependencies छोड़ सकते हैं और हस्ताक्षरित pre-built binary स्थापित कर सकते हैं:

```
cargo binstall zebrad
```

यही binaries प्रत्येक GitHub रिलीज़ के साथ `zebrad-<version>-<target>.tar.gz` के रूप में संलग्न होती हैं, प्रत्येक में SHA-256 checksum, Sigstore build-provenance attestation और Cosign signature होता है। पुराने प्लेटफ़ॉर्मों पर Docker इमेज का उपयोग करें या स्रोत से बिल्ड करें।

स्रोत से बिल्ड करने के लिए, code प्राप्त करें और रिलीज़ binary बनाएँ:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

नोड को इस प्रकार शुरू करें:

```
target/release/zebrad start
```

स्थापना मार्गदर्शिका: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## वैकल्पिक कॉन्फ़िगरेशन और सुविधाएँ

### कॉन्फ़िगरेशन फ़ाइल आरंभ करना

  - इस कमांड से कॉन्फ़िगरेशन फ़ाइल बनाएँ:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - बनाई गई *zebrad.toml* Linux की डिफ़ॉल्ट preferences directory में रखी जाएगी। अन्य OS के डिफ़ॉल्ट स्थानों के लिए दस्तावेज़ देखें।

### प्रगति बार कॉन्फ़िगर करना

  - टर्मिनल में प्रगति बार के माध्यम से मुख्य metrics दिखाने के लिए अपनी *zebrad.toml* में *tracing.progress_bar* कॉन्फ़िगर करें। ध्यान दें: एक ज्ञात समस्या है जिसमें प्रगति बार के अनुमान अत्यधिक बड़े हो सकते हैं।

### माइनिंग कॉन्फ़िगर करना

  - Docker में *MINER_ADDRESS* और port mapping निर्दिष्ट करके Zebra को माइनिंग के लिए कॉन्फ़िगर किया जा सकता है। अधिक विवरण [माइनिंग समर्थन दस्तावेज़](https://zebra.zfnd.org/user/mining-docker.html) में मिल सकते हैं।

### कस्टम बिल्ड सुविधाएँ

  - Prometheus metrics, Sentry monitoring, प्रायोगिक Elasticsearch समर्थन और अन्य अतिरिक्त Cargo सुविधाओं के साथ Zebra की कार्यक्षमता बढ़ाएँ।

  - स्थापना के दौरान `--features` फ्लैग के parameters के रूप में कई सुविधाएँ सूचीबद्ध करके उन्हें संयोजित करें।

  - प्रदर्शन को अनुकूलित करने के लिए कुछ debugging और monitoring सुविधाएँ रिलीज़ बिल्ड में अक्षम रहती हैं। प्रायोगिक और डेवलपर सुविधाओं की पूरी सूची के लिए [API दस्तावेज़](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags) देखें।

## सिस्टम आवश्यकताएँ और नेटवर्क कॉन्फ़िगरेशन

### अनुशंसित आवश्यकताएँ

- CPU: 4 CPU कोर
- RAM: 16 GB
- डिस्क स्थान: binaries compile करने और cached chain state संग्रहीत करने के लिए 300 GB उपलब्ध डिस्क स्थान
- नेटवर्क: प्रति माह न्यूनतम 300 GB upload और download के साथ 100 Mbps नेटवर्क कनेक्शन

### न्यूनतम आवश्यकताएँ

- CPU: 2 CPU कोर
- RAM: 4 GB
- डिस्क स्थान: 300 GB उपलब्ध डिस्क स्थान

आपकी मशीन के विनिर्देशों के आधार पर Zebra के test suite को पूरा होने में एक घंटे से अधिक समय लग सकता है। धीमे सिस्टम Zebra को compile और चला सकते हैं। सटीक प्रदर्शन सीमाएँ परीक्षण द्वारा स्थापित नहीं की गई हैं।

### डिस्क आवश्यकताएँ

- Zebra cached Mainnet डेटा के लिए लगभग 300 GB और cached Testnet डेटा के लिए 10 GB उपयोग करता है। समय के साथ डिस्क उपयोग बढ़ने की अपेक्षा करें।
- डेटाबेस की समय-समय पर, तथा shutdown या restart पर भी सफ़ाई की जाती है। बदलाव database transactions का उपयोग करके commit किए जाते हैं। बलपूर्वक समाप्ति या panic से हुए अधूरे बदलाव अगली बार Zebra शुरू होने पर वापस किए जाते हैं।

### नेटवर्क आवश्यकताएँ और पोर्ट

- Zebra inbound और outbound कनेक्शनों के लिए निम्न TCP ports का उपयोग करता है:
  - Mainnet के लिए 8233
  - Testnet के लिए 18233
- किसी विशिष्ट listen_addr के साथ Zebra कॉन्फ़िगर करने पर यह पता inbound कनेक्शनों के लिए घोषित होता है। सिंक्रनाइज़ेशन के लिए outbound कनेक्शन आवश्यक हैं; inbound कनेक्शन वैकल्पिक हैं।
- OS DNS resolver के माध्यम से Zcash DNS seeders तक पहुँच आवश्यक है (आमतौर पर port 53)।
- Zebra किसी भी port पर outbound कनेक्शन बना सकता है। अन्य नेटवर्कों पर DDoS हमलों के लिए उपयोग होने से बचने हेतु zcashd डिफ़ॉल्ट ports पर peers को प्राथमिकता देता है।

### सामान्य Mainnet नेटवर्क उपयोग

- प्रारंभिक सिंक: प्रारंभिक सिंक्रनाइज़ेशन के लिए 300 GB download आवश्यक है और इस आँकड़े के बढ़ने की अपेक्षा है।
- निरंतर अपडेट: उपयोगकर्ता लेनदेन के आकार और peer अनुरोधों के आधार पर, प्रतिदिन 10 MB से 10 GB तक upload और download।
- Zebra हर आंतरिक डेटाबेस संस्करण परिवर्तन पर प्रारंभिक सिंक शुरू करता है, जिसका अर्थ संस्करण उन्नयन के दौरान पूर्ण chain download हो सकता है।
- 2 सेकंड या कम की round-trip latency वाले peers को प्राथमिकता दी जाती है। यदि latency इस सीमा से अधिक हो, तो Zebra repository में ticket खोलें।

## सामान्य गलतियाँ

- डिस्क का आकार केवल आज के लिए निर्धारित करना। cached Mainnet स्थिति पहले ही 300 GB के करीब है और लगातार बढ़ रही है।
- `zebrad` से wallet RPCs की अपेक्षा करना। keys और balances अलग प्रोग्राम [Zallet](https://github.com/zcash/zallet) में रहते हैं।
- `zebrad` को अकेले चलाना और light wallets के कनेक्ट होने की अपेक्षा करना। उस मार्ग के लिए एक indexer चाहिए, या तो lightwalletd या [Zaino](/zcash-tech/zaino)।
- अप्रत्याशित resync को त्रुटि मानना। डेटाबेस संस्करण परिवर्तन जानबूझकर एक resync शुरू करता है।

## संबंधित पृष्ठ

- [पूर्ण नोड](/zcash-tech/full-nodes) - पूर्ण नोड क्या करता है और कौन से कार्यान्वयन उपलब्ध हैं
- [Zakura नोड](/zcash-tech/zakura-node) - तेज़ सिंक और pruning वाला Zebra से fork किया गया नोड
- [Zaino](/zcash-tech/zaino) - Rust indexer जो light wallets को सेवा देता है
- [लाइटवॉलेट नोड](/zcash-tech/lightwallet-nodes) - वे सर्वर जिन्हें light wallets query करते हैं
- [Zcash माइनिंग गाइड](/using-zcash/zcash-mining-guide) - अपने स्वयं के नोड के विरुद्ध माइनिंग

## आगे सीखें

- [Zebra पुस्तक](https://zebra.zfnd.org)
- [Zebra पर GitHub](https://github.com/ZcashFoundation/zebra/)
- [सिस्टम आवश्यकताएँ](https://zebra.zfnd.org/user/requirements.html)

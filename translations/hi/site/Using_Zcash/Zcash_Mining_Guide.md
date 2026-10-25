# Zcash माइनिंग गाइड: व्यक्तिगत हार्डवेयर के साथ माइनिंग पूल में शामिल होना

## परिचय

Zcash (ZEC) एक गोपनीयता-केंद्रित क्रिप्टोकरेंसी है जो माइनिंग के लिए Equihash प्रूफ-ऑफ-वर्क एल्गोरिदम का उपयोग करती है। Zcash की माइनिंग में जटिल गणितीय समस्याओं को हल करने, लेनदेन को सत्यापित करने और ZEC रिवॉर्ड के बदले नेटवर्क को सुरक्षित करने के लिए कंप्यूटेशनल शक्ति का उपयोग किया जाता है। नेटवर्क की उच्च कठिनाई के कारण, अधिकांश उपयोगकर्ताओं के लिए सोलो माइनिंग की सलाह नहीं दी जाती। दूसरों के साथ अपनी हैश शक्ति मिलाकर लगातार रिवॉर्ड कमाने का सबसे अच्छा तरीका माइनिंग पूल में शामिल होना है।

यह गाइड व्यक्तिगत हार्डवेयर (जैसे, GPUs वाले होम PC या एंट्री-लेवल ASICs) का उपयोग करके Zcash की माइनिंग पर केंद्रित है। ध्यान दें कि GPUs अब भी Zcash की माइनिंग कर सकते हैं, लेकिन नेटवर्क कठिनाई के कारण 2026 में ASICs कहीं अधिक कुशल और लाभदायक हैं। WhatToMine.com जैसे टूल से हमेशा वर्तमान लाभप्रदता जांचें, क्योंकि बिजली की लागत, हार्डवेयर कीमतें और ZEC का मूल्य जैसे कारक व्यवहार्यता को प्रभावित करते हैं। माइनिंग सभी के लिए लाभदायक नहीं हो सकती; स्थानीय नियमों और ऊर्जा दरों पर शोध करें (लक्ष्य < $0.08/kWh रखें)।


## आवश्यकताएँ

### हार्डवेयर
- **GPU माइनिंग (शुरुआती लोगों के लिए व्यक्तिगत सेटअप अनुशंसित):**
  - कम से कम 4GB VRAM वाले NVIDIA या AMD GPUs (जैसे, NVIDIA GTX 1070, RTX 3060; AMD RX 580 या बेहतर)।
  - एक संगत मदरबोर्ड, पर्याप्त PSU (कई GPUs के लिए कम से कम 750W), और ओवरहीटिंग रोकने के लिए अच्छी कूलिंग।
  - बेहतर हैश रेट के लिए मल्टी-GPU रिग्स आम हैं (जैसे, 6x GPUs 1-2 kSol/s प्राप्त कर सकते हैं)।
- **ASIC माइनिंग (अधिक कुशल लेकिन अधिक लागत):**
  - Bitmain Antminer Z15 (420 kSol/s) या Innosilicon A9 (50 kSol/s) जैसे Equihash-संगत ASICs।
  - ये अधिक शोर करते हैं, अधिक गर्म होते हैं और अधिक बिजली खपत करते हैं (जैसे, 1500W+); समर्पित स्थानों के लिए उपयुक्त हैं। Bitmain.com या पुनर्विक्रेताओं (Blockware Mining) जैसे प्रतिष्ठित स्रोतों से खरीदें।
- **सामान्य:** स्थिर इंटरनेट, सेटअप/निगरानी के लिए एक कंप्यूटर। ASICs नेटवर्क पर हावी हैं (2026 में कुल हैशरेट ~13 GSol/s), जिससे GPU माइनिंग कम प्रतिस्पर्धी होती है, लेकिन शौकिया उपयोगकर्ताओं के लिए फिर भी संभव है।

### सॉफ़्टवेयर
- **ऑपरेटिंग सिस्टम:** Windows 10/11, Linux (स्थिरता के लिए Ubuntu अनुशंसित)।
- **माइनिंग सॉफ़्टवेयर:**
  - GPUs के लिए: lolMiner (AMD/NVIDIA समर्थित), GMiner, या miniZ (NVIDIA-केंद्रित)। आधिकारिक GitHub repos से डाउनलोड करें (जैसे, github.com/Lolliedieb/lolMiner-releases)।
  - ASICs के लिए: निर्माता के अंतर्निर्मित फर्मवेयर/डैशबोर्ड का उपयोग करें (जैसे, Bitmain का वेब इंटरफ़ेस)।
- **वॉलेट:** भुगतान प्राप्त करने के लिए एक Zcash वॉलेट। अनुशंसित:
  - Shielded (निजी): ZODL Wallet, Zingo (मोबाइल/डेस्कटॉप), Zkool (मोबाइल/डेस्कटॉप)।
  - Transparent (आसान लेकिन कम निजी): Edge Wallet, Zecwallet Lite।
  - [wallets](https://zechub.wiki/wallets) से डाउनलोड करें। यदि पूल समर्थन करता है तो गोपनीयता के लिए एक shielded पता (जो 'zs' से शुरू होता है) बनाएं।

### अन्य
- बिजली: लागत की गणना करें। GPUs प्रति कार्ड 150-300W उपयोग करते हैं; ASICs 1000W+।
- एंटीवायरस: सेटअप के दौरान अक्षम करें, क्योंकि यह माइनर्स को खतरे के रूप में चिह्नित कर सकता है।

## माइनिंग पूल में शामिल होने की चरण-दर-चरण गाइड

### चरण 1: अपना Zcash वॉलेट सेट अप करें
1. आधिकारिक Zcash वेबसाइट [wallets](https://zechub.wiki/wallets) से वॉलेट डाउनलोड और इंस्टॉल करें।
2. नया वॉलेट बनाएं और अपनी seed phrase का सुरक्षित बैकअप लें।
3. प्राप्ति पता बनाएं (गोपनीयता के लिए अधिमानतः shielded)। उसे नोट कर लें, उदाहरण के लिए, `zs1exampleaddress...`।
4. यदि transparent पते (जो 't' से शुरू होता है) का उपयोग कर रहे हैं, तो यह सरल है लेकिन कम गोपनीयता प्रदान करता है।

### चरण 2: अपना हार्डवेयर तैयार करें
- GPUs के लिए:
  1. अपने PC में GPUs इंस्टॉल करें और ड्राइवर अपडेट करें (NVIDIA: GeForce Experience; AMD: Radeon Software)।
  2. अनुभव होने पर ओवरक्लॉक करें (स्थिरता के लिए MSI Afterburner का उपयोग करें; दक्षता के लिए +100-200 core clock, -500 memory का लक्ष्य रखें)।
- ASICs के लिए:
  1. ASIC को बिजली और Ethernet से कनेक्ट करें।
  2. Advanced IP Scanner या निर्माता के ऐप जैसे टूल से इसका IP पता खोजें।
  3. वेब डैशबोर्ड एक्सेस करें (जैसे, ब्राउज़र में IP दर्ज करें, Bitmain के लिए डिफ़ॉल्ट लॉगिन: root/root)।

**चेतावनी:** उचित वेंटिलेशन सुनिश्चित करें; माइनिंग से गर्मी उत्पन्न होती है। परीक्षण के लिए छोटे स्तर से शुरू करें।

### चरण 3: माइनिंग पूल चुनें और उसमें शामिल हों
माइनिंग पूल काम वितरित करते हैं और आपके योगदान किए गए हैशरेट के आधार पर रिवॉर्ड साझा करते हैं। शुल्क (0-2%), न्यूनतम भुगतान (0.01-0.1 ZEC), स्थान (कम ping), और विश्वसनीयता के आधार पर चुनें।

**अनुशंसित पूल (हैशरेट, शुल्क और समीक्षाओं के आधार पर):**
- **2Miners (zec.2miners.com)**: 1% शुल्क, PPLNS भुगतान, GPU/ASIC/NiceHash समर्थन। उच्च हैशरेट (~1.17 GSol/s), विश्वसनीय सर्वर।
- **F2Pool (zec.f2pool.com)**: 2% शुल्क, PPS+ भुगतान, multi-coin समर्थन। बड़ा पूल (~2.57 GSol/s)।
- **ViaBTC (zec.viabtc.com)**: 2% शुल्क (PPS+), उपयोगकर्ता-अनुकूल डैशबोर्ड, वैश्विक सर्वर।
- **AntPool (zec.antpool.com)**: 1% शुल्क, Bitmain से, ASICs के लिए अच्छा (~494 MSol/s)।
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Foundry Digital द्वारा पेशेवर Zcash माइनिंग पूल। PPLNS भुगतान का उपयोग करता है, पारदर्शी रिवॉर्ड ट्रैकिंग और एंटरप्राइज़-स्तरीय सहायता देता है। संस्थागत और बड़े पैमाने के ASIC माइनर्स के लिए सबसे उपयुक्त; खाता सत्यापन आवश्यक है।
- **Sovright (mining.sovright.com)**: Stratum V2 पर निर्मित एक Zcash पूल, जो वर्तमान में सार्वजनिक testnet के रूप में चल रहा है। अभी कोई वास्तविक ZEC भुगतान नहीं है, इसलिए इसे कमाई का स्रोत मानने के बजाय अपने सेटअप का परीक्षण करने के तरीके के रूप में देखें। विवरण के लिए नीचे समर्पित अनुभाग देखें।
- अन्य: Kryptex Pool, Luxor (रीयल-टाइम आंकड़ों के लिए poolwatch.io/coin/zcash देखें)।

1. पूल की वेबसाइट पर जाएं और खाता बनाएं (कुछ, जैसे 2Miners, के लिए ईमेल या पंजीकरण आवश्यक नहीं है)।
2. भुगतान के लिए सेटिंग्स में अपना Zcash वॉलेट पता जोड़ें।
3. पूल के stratum सर्वर (जैसे, zec.2miners.com:1010) और पोर्ट को नोट करें।

### चरण 4: माइनिंग सॉफ़्टवेयर इंस्टॉल और कॉन्फ़िगर करें
- GPUs के लिए (उदाहरण: Windows/Linux पर lolMiner):
  1. GitHub से lolMiner डाउनलोड करें (नवीनतम संस्करण, जैसे 1.88)।
  2. किसी फ़ोल्डर में extract करें।
  3. कॉन्फ़िगरेशन के साथ एक batch फ़ाइल (start.bat) बनाएं:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS` को अपने ZEC पते से बदलें।
     - `WORKER_NAME`: आपके रिग का नाम (जैसे, Rig1)।
     - EU सर्वरों के लिए: eu.zec.2miners.com:1010।
  4. batch फ़ाइल चलाएं। यह पूल से कनेक्ट होकर माइनिंग शुरू कर देगी।
- ASICs के लिए (उदाहरण: Bitmain Antminer):
  1. वेब डैशबोर्ड में लॉग इन करें।
  2. Miner Configuration पर जाएं।
  3. पूल विवरण जोड़ें:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (या खाली)।
  4. सहेजें और माइनर रीबूट करें।
- अन्य सॉफ़्टवेयर के लिए (जैसे, GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**परीक्षण:** 10-15 मिनट चलाएं; स्वीकार किए गए shares और हैशरेट के लिए console जांचें।

### चरण 5: माइनिंग शुरू करें और निगरानी करें
1. माइनर लॉन्च करें: यह पूल से कनेक्ट होगा और shares सबमिट करना शुरू करेगा।
2. इनके माध्यम से निगरानी करें:
   - पूल डैशबोर्ड: हैशरेट, अवैतनिक बैलेंस और आंकड़े देखने के लिए अपना वॉलेट पता दर्ज करें।
   - सॉफ़्टवेयर console: त्रुटियां, तापमान देखें (तापमान < 80 degrees C रखें)।
   - टूल: दूरस्थ रिग प्रबंधन के लिए HiveOS या SimpleMining OS का उपयोग करें।
3. भुगतान: अधिकांश पूल न्यूनतम सीमा (जैसे, 0.05 ZEC) पहुंचने पर स्वचालित रूप से भुगतान करते हैं। पूल नियम जांचें।

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet पूल और रिले नेटवर्क

Sovright (sovright.com) एक Stratum V2 माइनिंग पूल और अलग ब्लॉक रिले नेटवर्क चलाता है। इनके कार्य अलग हैं, इसलिए इन्हें नीचे अलग-अलग शामिल किया गया है।

### माइनिंग पूल (mining.sovright.com)

Sovright का पूल सार्वजनिक Zcash testnet (NU6, Stratum V2) पर चलता है, mainnet पर नहीं। testnet वास्तविक ZEC का भुगतान नहीं करता। इसका उपयोग अपनी माइनर कॉन्फ़िगरेशन जांचने के लिए करें, कमाई के लिए नहीं।

- शुरू करने के लिए कोई खाता आवश्यक नहीं है। CPU या ASIC Equihash माइनर को पूल की ओर निर्देशित करें और आपके shares लाइव डैशबोर्ड पर दिखाई देंगे।
- Sovright उन माइनर्स के लिए एक open source Stratum V2 proxy भी प्रकाशित करता है जो केवल पूल के jobs लेने के बजाय अपने स्वयं के ब्लॉक टेम्पलेट चुनना चाहते हैं:

### Foundry Zcash Pool की निगरानी

Foundry Zcash Pool उपयोगकर्ताओं के लिए:

- Foundry pool dashboard के माध्यम से माइनर प्रदर्शन की निगरानी करें।
- जांचें:
  - सक्रिय workers
  - रिपोर्ट किया गया हैशरेट
  - स्वीकार किए गए shares
  - अनुमानित रिवॉर्ड
  - भुगतान स्थिति

क्योंकि Foundry PPLNS रिवॉर्ड मॉडल का उपयोग करता है, माइनिंग रिवॉर्ड केवल तत्काल हैशरेट के बजाय पूल की रिवॉर्ड विंडो के दौरान योगदान किए गए shares पर निर्भर करते हैं।

अनुशंसित निगरानी पद्धतियां:
- ASIC डैशबोर्ड हैशरेट की तुलना Foundry द्वारा रिपोर्ट किए गए हैशरेट से करें।
- अस्वीकृत shares, stale shares, या कनेक्शन अस्थिरता की जांच करें।
- स्थिर नेटवर्क कनेक्टिविटी बनाए रखें क्योंकि डाउनटाइम से सबमिट किए गए shares और संभावित रिवॉर्ड कम होते हैं।
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  अपने माइनर को सीधे पूल के बजाय proxy की ओर निर्देशित करें:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  `yourname.rig1` जैसे worker नाम का उपयोग करते हुए।
- Sovright का transparency page shielded लेनदेन के लिए "include all" नीति बताता है, कुछ ऐसे पूलों के विपरीत जो उन्हें फ़िल्टर कर देते हैं। प्रत्येक ब्लॉक को एक signed attestation मिलता है ताकि नीति को स्वतंत्र रूप से जांचा जा सके।
- नमूना डैशबोर्ड डेटा के बजाय अपने workers को ट्रैक करने के लिए mining.sovright.com पर खाता बनाएं (Google या ईमेल sign in)।

### रिले नेटवर्क (relay.sovright.com)

Sovright अलग से Zcash mainnet पर सार्वजनिक ब्लॉक रिले नेटवर्क चलाता है। जब कोई पूल ब्लॉक खोजता है, तो वह ब्लॉक शेष नेटवर्क तक कितनी तेज़ी से पहुंचता है, यह तय करता है कि वह कितनी बार orphaned होता है, अर्थात वह propagation race हारता है और उसका रिवॉर्ड खो जाता है। रिले forward error correction के साथ compact block relay का उपयोग करके चार क्षेत्रों में ब्लॉक्स को अग्रेषित करता है।

सार्वजनिक डैशबोर्ड प्रभाव को लाइव दिखाता है: relay-connected क्षेत्रों में नए ब्लॉक, साधारण peer to peer gossip के समय के आधे से भी कम में पहुंचते हैं, और डैशबोर्ड नेटवर्क की लाइव orphan दर को ट्रैक करता है।

यह व्यक्तिगत माइनर्स के लिए नहीं, बल्कि पूल ऑपरेटरों के लिए अवसंरचना है। Sovright की open source `mining-infra` repository, native P2P की तुलना में खोजे गए ब्लॉक्स को mesh में तेज़ी से भेजने के लिए एक `submitblock` relay gateway का दस्तावेज़ीकरण करती है। कनेक्ट करने के लिए relay peer addresses और auth key हेतु सीधे Sovright (support@sovright.com) से संपर्क करें।


## अपने स्वयं के Zebra नोड के विरुद्ध माइनिंग

ऊपर की हर चीज़ आपके माइनर को किसी और के पूल की ओर निर्देशित करती है। दूसरा तरीका स्वयं एक नोड चलाना और अपने माइनिंग सॉफ़्टवेयर से उससे कार्य मांगना है। चूंकि zcashd 18 जुलाई 2026 को बंद हो गया, इसका अर्थ है [Zebra](/zcash-tech/zebra-full-node), वह नोड जिसे यह अनुभाग कवर करता है।

Zebra की भूमिका छोटी और विशिष्ट है: यह ब्लॉक टेम्पलेट बनाता है और अपने RPC इंटरफ़ेस पर हल किए गए ब्लॉक स्वीकार करता है। हैशिंग माइनिंग सॉफ़्टवेयर द्वारा की जाती है, और कई माइनर्स के बीच रिवॉर्ड बांटना पूल सॉफ़्टवेयर का कार्य है। सोलो माइनिंग से कभी ब्लॉक मिलेगा या नहीं, यह नेटवर्क हैश रेट में आपकी हिस्सेदारी पर निर्भर करता है, जिसका अनुमान लगाने का प्रयास यह अनुभाग नहीं करता। यही कारण है कि इस पृष्ठ का परिचय अधिकांश उपयोगकर्ताओं को सोलो माइनिंग की अनुशंसा नहीं करता।

ये चरण दो Zebra Book पृष्ठों, [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) और [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html), का अनुसरण करते हैं, जैसी उनकी स्थिति 8 अक्टूबर 2026 को थी। कुंजी नाम और डिफ़ॉल्ट रिलीज़ों के बीच बदलते हैं, इसलिए किसी पर निर्भर होने से पहले Book देखें।

### रिवॉर्ड प्राप्त करने वाला पता सेट करें

डिफ़ॉल्ट सेटिंग्स के साथ एक config फ़ाइल बनाएं, फिर उसे संपादित करें:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

माइनर पता आवश्यक है ([Book: Miner address](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra transparent P2PKH या P2SH पता, एक Sapling पता, या एक Unified Address स्वीकार करता है। एक से अधिक receiver वाले Unified Address के लिए, Book कहती है कि Zebra एक ही receiver को भुगतान करता है, "पहले Orchard, फिर Sapling, फिर transparent" को प्राथमिकता देते हुए।

दो वैकल्पिक कुंजियां उसी `[mining]` अनुभाग में जाती हैं:

| कुंजी | यह क्या करती है | सीमा |
|---|---|---|
| `extra_coinbase_data` | आपके माइन किए हर ब्लॉक के coinbase input में, Zebra के अपने marker के बाद, पूल नाम जैसा सार्वजनिक tag जोड़ता है ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 bytes। इससे अधिक होने पर, "Zebra शुरू होने से इनकार करता है" |
| `miner_memo` | रिवॉर्ड output के साथ shielded memo संलग्न करता है। `extra_coinbase_data` के विपरीत, यह सार्वजनिक नहीं है: केवल प्राप्ति पते के viewing key वाला व्यक्ति इसे पढ़ सकता है ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bytes। यह केवल तब काम करता है जब रिवॉर्ड shielded receiver को जाता है। transparent पते के साथ इसका "चुपचाप कोई प्रभाव नहीं होता" |

### RPC पोर्ट खोलें

माइनिंग सॉफ़्टवेयर JSON-RPC के माध्यम से Zebra से बात करता है, जो तब तक बंद रहता है जब तक आप उसे सुनने के लिए पता नहीं देते ([Book: RPC section](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 Mainnet पर मानक RPC पोर्ट है। `127.0.0.1` पोर्ट को केवल उसी मशीन से पहुंच योग्य रखता है।

Zebra 2.0.0 के बाद से, एक cookie RPC पोर्ट की सुरक्षा करती है, जो zcashd द्वारा उपयोग की गई विधि जैसी है। RPC endpoint शुरू होने पर Zebra cookie लिखता है और shutdown पर उसे हटा देता है। डिफ़ॉल्ट रूप से फ़ाइल Zebra की cache directory में होती है, उदाहरण के लिए Linux पर `/home/user/.cache/zebra/.cookie`, और इसमें एक पंक्ति होती है:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` फ़ाइल को स्थानांतरित करता है। `rpc.enable_cookie_auth = false` जांच बंद कर देता है, और इसके साथ RPC पोर्ट की एकमात्र authentication भी: तब पोर्ट तक पहुंच सकने वाली कोई भी चीज़ उसे call कर सकती है।

### Zebra शुरू करें और उसे sync होने दें

```bash
zebrad
```

Zebra डिफ़ॉल्ट स्थान से config पढ़ता है। दूसरी फ़ाइल उपयोग करने के लिए `-c /path/to/zebrad.toml` पास करें। sync पूरा होने की प्रतीक्षा करें। पूरा होने पर log में `sync_percent=100.000%` दिखता है ([Book: Running zebra](https://zebra.zfnd.org/user/mining.html#running-zebra))। [Zebra Full Node](/zcash-tech/zebra-full-node) हार्डवेयर और disk space को कवर करता है।

### getblocktemplate से जांचें

`getblocktemplate` वह call है जो माइनिंग सॉफ़्टवेयर कार्य प्राप्त करने के लिए करता है, इसलिए यह सबसे तेज़ परीक्षण भी है ([Book: Testing the setup](https://zebra.zfnd.org/user/mining.html#testing-the-setup))। अपनी cookie फ़ाइल की सामग्री को `__cookie__:PASSWORD` के स्थान पर रखें:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

सही ढंग से कार्यरत सेटअप एक `result` object लौटाता है जिसमें माइनर को आवश्यक fields होते हैं, जिनमें `previousblockhash`, `coinbasetxn`, `target` और `height` शामिल हैं। यदि आपने `extra_coinbase_data` सेट किया है, तो Book बताती है कि अपना tag `coinbasetxn.data` में कैसे खोजें।

### अपने माइनिंग सॉफ़्टवेयर को इसकी ओर निर्देशित करें

अपने माइनिंग या पूल सॉफ़्टवेयर को RPC endpoint, `127.0.0.1:8232`, और cookie से username व password दें। Book कहती है कि Zebra "अधिकांश माइनिंग पूल सॉफ़्टवेयर चलाने के लिए आवश्यक RPC methods को समर्थन देता है" ([Book: Run a mining pool](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool))।

सॉफ़्टवेयर चुनने से पहले Book से दो बातें:

- **s-nomp केवल परीक्षण के लिए है।** Book इसके s-nomp सेटअप को "experimental" कहती है और बताती है कि s-nomp "NU5 के साथ संगत नहीं है, इसलिए कुछ माइनिंग functions अक्षम हैं"। इसकी [Testnet guide](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) जोड़ती है कि s-nomp "को NU5 या बाद के network upgrades के लिए आधिकारिक रूप से अपडेट नहीं किया गया है" और production माइनर्स को ऐसे पूल सॉफ़्टवेयर की ओर निर्देशित करती है जो वर्तमान upgrades का समर्थन करे।
- **Zebra तैयार स्टैक प्रदान करता है।** Zebra repository में [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) में एक Docker Compose सेटअप है, जो Zebra को एक माइनिंग पूल के साथ और, यदि आप चाहें, CPU माइनर के साथ शुरू करता है। इसका पूल s-nomp है और जब तक आप इसे नहीं बदलते, यह Testnet पर शुरू होता है, इसलिए इसे घटकों को समझने के तरीके के रूप में लें।

### Docker मार्ग

Book का सबसे छोटा मार्ग `zfnd/zebra` Docker image है, जिसमें पता और RPC पोर्ट environment variables के रूप में पास किए जाते हैं ([Book: Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html))। नीचे दिया गया command Book के command जैसा है, एक बदलाव के साथ: यह RPC पोर्ट को केवल host के loopback पते पर प्रकाशित करता है, ताकि अन्य मशीनें उस तक न पहुंच सकें।

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

यह Mainnet नोड शुरू करता है, P2P पोर्ट (8233) को Docker host पर प्रकाशित करता है, और RPC पोर्ट (8232) को केवल host से पहुंच योग्य बनाता है। cookie प्रिंट करें:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **`0.0.0.0` को `ZEBRA_RPC__LISTEN_ADDR` में रखें।** यह वह पता है जिस पर Zebra container के भीतर सुनता है। Docker प्रकाशित पोर्ट को container के अपने network interface तक अग्रेषित करता है, इसलिए container के भीतर `127.0.0.1` पर सुन रहा Zebra, host से भी कनेक्शन प्राप्त नहीं करेगा। `-p` के सामने का `127.0.0.1:` ही पोर्ट को नेटवर्क से दूर रखता है।
- **Book का command** RPC पोर्ट को `-p 8232:8232` के साथ प्रकाशित करता है, जो उसे host के हर network interface पर खोल देता है।
- **Testnet पर अभ्यास करने के लिए**, `-e ZEBRA_NETWORK__NETWORK="Testnet"` जोड़ें, `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232` सेट करें, `-p 18233:18233` और `-p 127.0.0.1:18232:18232` प्रकाशित करें, और Testnet पता दें। Mainnet पता Zebra को Testnet पर शुरू होने से रोकता है, और इसका उलटा भी सही है।

माइनर्स को भुगतान करना और वॉलेट संभालना इस अनुभाग के बाहर है। वॉलेट पक्ष के लिए, [Zallet](/zcash-tech/zallet) देखें।

## सुझाव और सर्वोत्तम अभ्यास
- **लाभप्रदता:** whattomine.com/coins/166-zec-equihash जैसे calculators उपयोग करें। उदाहरण: एक RTX 3060 (~300 Sol/s) $50/ZEC पर ~0.001 ZEC/दिन कमाता है, बिजली के ~$0.50 घटाकर।
- **गोपनीयता:** उपलब्ध होने पर shielded पूल उपयोग करें; पते दोबारा उपयोग करने से बचें।
- **सुरक्षा:** मजबूत passwords उपयोग करें; pools/wallets पर 2FA सक्षम करें। private keys कभी साझा न करें।
- **समस्या-निवारण:** यदि कोई shares नहीं हैं, तो firewall, antivirus, या गलत config जांचें। forum.zcashcommunity.com या Reddit r/zec जैसे forums में शामिल हों।
- **विकल्प:** यदि लाभदायक नहीं है, तो cloud mining या अन्य coins की staking पर विचार करें।
- **पर्यावरणीय टिप्पणी:** माइनिंग ऊर्जा खपत करती है; संभव हो तो renewable sources का उपयोग करें।
- **अपडेट:** Zcash विकसित हो सकता है (जैसे, संभावित PoS बदलाव); समाचार के लिए z.cash देखें।

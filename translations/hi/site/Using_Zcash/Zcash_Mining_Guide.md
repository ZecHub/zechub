# Zcash माइनिंग गाइड: व्यक्तिगत हार्डवेयर के साथ माइनिंग पूल से जुड़ना

## परिचय

Zcash (ZEC) एक privacy-focused cryptocurrency है जो माइनिंग के लिए Equihash proof-of-work algorithm का उपयोग करती है। Zcash माइनिंग में जटिल गणितीय समस्याओं को हल करने, लेनदेन को validate करने, और ZEC rewards के बदले नेटवर्क को सुरक्षित करने के लिए computational power का उपयोग शामिल होता है। नेटवर्क की उच्च difficulty के कारण, अधिकांश उपयोगकर्ताओं के लिए solo mining की सिफारिश नहीं की जाती। दूसरों के साथ अपनी hash power मिलाकर लगातार rewards कमाने का सबसे अच्छा तरीका किसी mining pool से जुड़ना है।

यह गाइड व्यक्तिगत हार्डवेयर (जैसे GPUs वाला home PC या entry-level ASICs) का उपयोग करके Zcash माइन करने पर केंद्रित है। ध्यान दें कि GPUs अभी भी Zcash माइन कर सकते हैं, लेकिन 2026 में नेटवर्क difficulty के कारण ASICs कहीं अधिक efficient और profitable हैं। WhatToMine.com जैसे tools का उपयोग करके हमेशा वर्तमान profitability जांचें, क्योंकि बिजली की लागत, हार्डवेयर की कीमतें, और ZEC का मूल्य viability को प्रभावित करते हैं। माइनिंग हर किसी के लिए profitable नहीं हो सकती; स्थानीय नियमों और energy rates पर शोध करें (लक्ष्य < $0.08/kWh रखें)।

## आवश्यकताएँ

### हार्डवेयर
- **GPU Mining (शुरुआती लोगों के लिए अनुशंसित व्यक्तिगत सेटअप):**
  - कम से कम 4GB VRAM वाले NVIDIA या AMD GPUs (जैसे NVIDIA GTX 1070, RTX 3060; AMD RX 580 या बेहतर)।
  - एक compatible motherboard, पर्याप्त PSU (कई GPUs के लिए कम से कम 750W), और overheating रोकने के लिए अच्छी cooling।
  - बेहतर hash rates के लिए multi-GPU rigs आम हैं (जैसे 6x GPUs 1-2 kSol/s प्राप्त कर सकते हैं)।
- **ASIC Mining (अधिक efficient लेकिन अधिक लागत वाली):**
  - Equihash-compatible ASICs जैसे Bitmain Antminer Z15 (420 kSol/s) या Innosilicon A9 (50 kSol/s)।
  - ये अधिक शोर करते हैं, अधिक गर्म होते हैं, और अधिक power consume करते हैं (जैसे 1500W+); dedicated spaces के लिए उपयुक्त। Bitmain.com या resellers (Blockware Mining) जैसे विश्वसनीय स्रोतों से खरीदें।
- **सामान्य:** स्थिर internet, setup/monitoring के लिए एक computer। ASICs नेटवर्क पर हावी हैं (~13 GSol/s total hashrate in 2026), जिससे GPU mining कम प्रतिस्पर्धी हो जाती है, लेकिन hobbyists के लिए अभी भी संभव है।

### सॉफ़्टवेयर
- **Operating System:** Windows 10/11, Linux (स्थिरता के लिए Ubuntu अनुशंसित)।
- **Mining Software:**
  - GPUs के लिए: lolMiner (AMD/NVIDIA को support करता है), GMiner, या miniZ (NVIDIA-focused)। आधिकारिक GitHub repos से download करें (जैसे github.com/Lolliedieb/lolMiner-releases)।
  - ASICs के लिए: निर्माता के built-in firmware/dashboard का उपयोग करें (जैसे Bitmain का web interface)।
- **Wallet:** payouts प्राप्त करने के लिए एक Zcash wallet। अनुशंसित:
  - Shielded (private): ZODL Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop)।
  - Transparent (आसान लेकिन कम private): Edge Wallet, ZecWallet Lite।
  - [wallets](https://zechub.wiki/wallets) से download करें। privacy के लिए यदि pool support करता हो तो एक shielded address (जो 'zs' से शुरू होता है) generate करें।

### अन्य
- बिजली: लागत की गणना करें। GPUs प्रति card 150-300W उपयोग करते हैं; ASICs 1000W+।
- Antivirus: setup के दौरान इसे disable करें क्योंकि यह miners को threats के रूप में flag कर सकता है।

## माइनिंग पूल से जुड़ने की चरण-दर-चरण गाइड

### चरण 1: अपना Zcash Wallet सेट अप करें
1. आधिकारिक Zcash वेबसाइट [wallets](https://zechub.wiki/wallets) से एक wallet download और install करें।
2. एक नया wallet बनाएं और अपनी seed phrase का सुरक्षित backup लें।
3. एक receiving address generate करें (privacy के लिए बेहतर होगा shielded)। इसे नोट कर लें, उदाहरण के लिए `zs1exampleaddress...`।
4. यदि आप transparent address (जो 't' से शुरू होता है) का उपयोग कर रहे हैं, तो यह सरल है लेकिन कम privacy देता है।

### चरण 2: अपना हार्डवेयर तैयार करें
- GPUs के लिए:
  1. अपने PC में GPUs install करें और drivers update करें (NVIDIA: GeForce Experience; AMD: Radeon Software)।
  2. यदि अनुभवी हों तो overclock करें (स्थिरता के लिए MSI Afterburner का उपयोग करें; efficiency के लिए +100-200 core clock, -500 memory का लक्ष्य रखें)।
- ASICs के लिए:
  1. ASIC को power और Ethernet से connect करें।
  2. Advanced IP Scanner या निर्माता के app जैसे tool का उपयोग करके उसका IP address पता करें।
  3. web dashboard access करें (जैसे browser में IP डालें, default login: Bitmain के लिए root/root)।

**चेतावनी:** उचित ventilation सुनिश्चित करें; माइनिंग से गर्मी पैदा होती है। परीक्षण के लिए छोटे स्तर से शुरू करें।

### चरण 3: एक माइनिंग पूल चुनें और उससे जुड़ें
Mining pools काम को वितरित करते हैं और आपके contributed hashrate के आधार पर rewards साझा करते हैं। fees (0-2%), payout minimum (0.01-0.1 ZEC), location (low ping), और reliability के आधार पर चयन करें।

**अनुशंसित Pools (Hashrate, Fees, और Reviews के आधार पर):**
- **2Miners (zec.2miners.com)**: 1% fee, PPLNS payout, GPU/ASIC/NiceHash support करता है। उच्च hashrate (~1.17 GSol/s), विश्वसनीय servers।
- **F2Pool (zec.f2pool.com)**: 2% fee, PPS+ payout, multi-coin support। बड़ा pool (~2.57 GSol/s)।
- **ViaBTC (zec.viabtc.com)**: 2% fee (PPS+), user-friendly dashboard, global servers।
- **AntPool (zec.antpool.com)**: 1% fee, Bitmain से, ASICs के लिए अच्छा (~494 MSol/s)।
- **Sovright (mining.sovright.com)**: Stratum V2 पर बना एक Zcash pool, जो वर्तमान में public testnet के रूप में चल रहा है। अभी live ZEC payouts नहीं हैं, इसलिए इसे कमाई के स्रोत के बजाय अपने setup का परीक्षण करने के तरीके के रूप में देखें। विवरण के लिए नीचे समर्पित section देखें।
- अन्य: Kryptex Pool, Luxor (real-time stats के लिए poolwatch.io/coin/zcash देखें)।

1. pool की website पर जाएँ और account बनाएं (email के साथ, या कुछ pools जैसे 2Miners में registration के बिना)।
2. payouts के लिए settings में अपना Zcash wallet address जोड़ें।
3. pool के stratum server (जैसे zec.2miners.com:1010) और port को नोट करें।

### चरण 4: Mining Software install और configure करें
- GPUs के लिए (उदाहरण: Windows/Linux पर lolMiner):
  1. GitHub से lolMiner download करें (latest version, जैसे 1.88)।
  2. इसे एक folder में extract करें।
  3. configuration के साथ एक batch file (start.bat) बनाएं:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS` को अपने ZEC address से बदलें।
     - `WORKER_NAME`: आपके rig के लिए एक नाम (जैसे Rig1)।
     - EU servers के लिए: eu.zec.2miners.com:1010।
  4. batch file चलाएँ। यह pool से connect होकर mining शुरू कर देगा।
- ASICs के लिए (उदाहरण: Bitmain Antminer):
  1. web dashboard में log in करें।
  2. Miner Configuration पर जाएँ।
  3. pool details जोड़ें:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (या खाली)।
  4. Save करें और miner को reboot करें।
- अन्य software के लिए (जैसे GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**परीक्षण:** 10-15 मिनट तक चलाएँ; accepted shares और hashrate के लिए console जांचें।

### चरण 5: Mining शुरू करें और मॉनिटर करें
1. miner launch करें: यह pool से connect होगा और shares submit करना शुरू करेगा।
2. निम्न माध्यमों से monitor करें:
   - Pool dashboard: hashrate, unpaid balance, और stats देखने के लिए अपना wallet address दर्ज करें।
   - Software console: errors, temperature देखें (इसे 80 degrees C से कम रखें)।
   - Tools: remote rig management के लिए HiveOS या SimpleMining OS का उपयोग करें।
3. Payouts: अधिकांश pools minimum threshold तक पहुँचने पर अपने आप pay करते हैं (जैसे 0.05 ZEC)। pool rules जांचें।

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool और Relay Network

Sovright (sovright.com) एक Stratum V2 mining pool और एक अलग block relay network चलाता है। ये अलग-अलग काम करते हैं, इसलिए इन्हें नीचे अलग-अलग कवर किया गया है।

### Mining Pool (mining.sovright.com)

Sovright का pool mainnet पर नहीं, बल्कि एक public Zcash testnet (NU6, Stratum V2) पर चलता है। testnet वास्तविक ZEC payout नहीं करता। इसे कमाई के लिए नहीं, बल्कि अपने miner configuration का परीक्षण करने के लिए उपयोग करें।

- शुरू करने के लिए किसी account की आवश्यकता नहीं है। एक CPU या ASIC Equihash miner को pool की ओर point करें और आपके shares live dashboard पर दिखाई देंगे।
- Sovright उन miners के लिए एक open source Stratum V2 proxy भी publish करता है जो केवल pool के jobs लेने के बजाय अपने block templates स्वयं चुनना चाहते हैं:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  pool से सीधे connect करने के बजाय अपने miner को proxy की ओर point करें:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  `yourname.rig1` जैसे worker name का उपयोग करते हुए।
- Sovright के transparency page में shielded transactions के लिए "include all" policy बताई गई है, उन कुछ pools के विपरीत जो उन्हें filter कर देते हैं। हर block को एक signed attestation मिलता है ताकि policy को स्वतंत्र रूप से verify किया जा सके।
- sample dashboard data के बजाय अपने workers को track करने के लिए mining.sovright.com पर account बनाएं (Google या email sign in)।

### Relay Network (relay.sovright.com)

Sovright अलग से Zcash mainnet पर एक public block relay network चलाता है। जब कोई pool एक block ढूंढता है, तो वह block बाकी नेटवर्क तक कितनी तेज़ी से पहुँचता है, यह तय करता है कि वह कितनी बार orphaned होता है, यानी propagation race हार जाता है और उसका reward खो जाता है। relay forward error correction के साथ compact block relay का उपयोग करके चार regions में blocks forward करता है।

public dashboard इसका प्रभाव live दिखाता है: relay-connected regions plain peer to peer gossip की तुलना में आधे से भी कम समय में नए blocks देखते हैं, और dashboard नेटवर्क की live orphan rate को track करता है।

यह individual miners के लिए नहीं, बल्कि pool operators के लिए infrastructure है। Sovright का open source `mining-infra` repository native P2P की तुलना में मिले हुए blocks को mesh में तेज़ी से फैलाने के लिए एक `submitblock` relay gateway को document करता है। connect करने के लिए relay peer addresses और auth key हेतु सीधे Sovright से संपर्क करें (support@sovright.com)।

## सुझाव और सर्वोत्तम प्रथाएँ
- **Profitability:** whattomine.com/coins/166-zec-equihash जैसे calculators का उपयोग करें। उदाहरण: एक RTX 3060 (~300 Sol/s) $50/ZEC पर ~0.001 ZEC/day कमाती है, जिसमें से ~$0.50 electricity घटेगी।
- **Privacy:** यदि उपलब्ध हों तो shielded pools का उपयोग करें; addresses को बार-बार reuse करने से बचें।
- **Security:** मजबूत passwords का उपयोग करें; pools/wallets पर 2FA enable करें। private keys कभी साझा न करें।
- **Troubleshooting:** यदि shares नहीं आ रहे हैं, तो firewall, antivirus, या गलत config जांचें। forum.zcashcommunity.com या Reddit r/zec जैसे forums से जुड़ें।
- **Alternatives:** यदि profitable न हो, तो cloud mining या अन्य coins की staking पर विचार करें।
- **Environmental Note:** माइनिंग में ऊर्जा की खपत होती है; यदि संभव हो तो renewable sources का उपयोग करें।
- **Updates:** Zcash विकसित हो सकता है (जैसे संभावित PoS shift); समाचार के लिए z.cash देखें।

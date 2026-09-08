# Zcash माइनिंग गाइड: व्यक्तिगत हार्डवेयर के साथ माइनिंग पूल में शामिल होना

## परिचय

Zcash (ZEC) एक privacy-focused cryptocurrency है जो माइनिंग के लिए Equihash proof-of-work algorithm का उपयोग करती है। Zcash माइनिंग में जटिल गणितीय समस्याओं को हल करने, लेनदेन को validate करने, और ZEC rewards के बदले नेटवर्क को सुरक्षित करने के लिए computational power का उपयोग शामिल है। नेटवर्क की उच्च difficulty के कारण, अधिकांश उपयोगकर्ताओं के लिए solo mining की सिफारिश नहीं की जाती। माइनिंग पूल में शामिल होना लगातार rewards कमाने का सबसे अच्छा तरीका है, क्योंकि इसमें आप अपनी hash power को दूसरों के साथ जोड़ते हैं।

यह गाइड व्यक्तिगत हार्डवेयर (जैसे GPUs वाला home PC या entry-level ASICs) का उपयोग करके Zcash माइनिंग पर केंद्रित है। ध्यान दें कि GPUs अभी भी Zcash माइन कर सकते हैं, लेकिन 2026 में नेटवर्क difficulty के कारण ASICs कहीं अधिक efficient और profitable हैं। हमेशा WhatToMine.com जैसे tools का उपयोग करके वर्तमान profitability जांचें, क्योंकि बिजली की लागत, हार्डवेयर की कीमतें, और ZEC का मूल्य viability को प्रभावित करते हैं। माइनिंग हर किसी के लिए लाभदायक नहीं हो सकती; स्थानीय नियमों और energy rates पर शोध करें (लक्ष्य < $0.08/kWh रखें)।

## आवश्यकताएँ

### हार्डवेयर
- **GPU माइनिंग (शुरुआती लोगों के लिए व्यक्तिगत सेटअप की सिफारिश):**
  - कम से कम 4GB VRAM वाले NVIDIA या AMD GPUs (जैसे NVIDIA GTX 1070, RTX 3060; AMD RX 580 या बेहतर)।
  - एक compatible motherboard, पर्याप्त PSU (एक से अधिक GPUs के लिए कम से कम 750W), और overheating रोकने के लिए अच्छी cooling।
  - बेहतर hash rates के लिए multi-GPU rigs आम हैं (जैसे 6x GPUs 1-2 kSol/s हासिल कर सकते हैं)।
- **ASIC माइनिंग (अधिक efficient लेकिन अधिक महंगी):**
  - Bitmain Antminer Z15 (420 kSol/s) या Innosilicon A9 (50 kSol/s) जैसे Equihash-compatible ASICs।
  - ये अधिक शोर करते हैं, अधिक गर्म होते हैं, और अधिक power लेते हैं (जैसे 1500W+); dedicated spaces के लिए उपयुक्त हैं। Bitmain.com या resellers (Blockware Mining) जैसे विश्वसनीय स्रोतों से खरीदें।
- **सामान्य:** स्थिर internet, setup/monitoring के लिए एक computer। ASICs नेटवर्क पर हावी हैं (~13 GSol/s total hashrate in 2026), जिससे GPU माइनिंग कम competitive हो जाती है, लेकिन hobbyists के लिए अभी भी संभव है।

### सॉफ़्टवेयर
- **Operating System:** Windows 10/11, Linux (स्थिरता के लिए Ubuntu की सिफारिश की जाती है)।
- **Mining Software:**
  - GPUs के लिए: lolMiner (AMD/NVIDIA को support करता है), GMiner, या miniZ (NVIDIA-focused)। official GitHub repos से download करें (जैसे github.com/Lolliedieb/lolMiner-releases)।
  - ASICs के लिए: manufacturer का built-in firmware/dashboard उपयोग करें (जैसे Bitmain का web interface)।
- **Wallet:** payouts प्राप्त करने के लिए एक Zcash wallet। अनुशंसित:
  - Shielded (private): Zodl Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop)।
  - Transparent (आसान लेकिन कम private): Edge Wallet, Zecwallet Lite।
  - [wallets](https://zechub.wiki/wallets) से download करें। यदि pool support करता है, तो privacy के लिए एक shielded address (जो 'zs' से शुरू होता है) generate करें।

### अन्य
- बिजली: लागत की गणना करें। GPUs प्रति card 150-300W उपयोग करते हैं; ASICs 1000W+।
- Antivirus: setup के दौरान इसे disable करें क्योंकि यह miners को threat के रूप में flag कर सकता है।

## माइनिंग पूल में शामिल होने के लिए चरण-दर-चरण गाइड

### चरण 1: अपना Zcash Wallet सेट अप करें
1. official Zcash website [wallets](https://zechub.wiki/wallets) से एक wallet download और install करें।
2. एक नया wallet बनाएं और अपनी seed phrase का सुरक्षित backup लें।
3. एक receiving address generate करें (privacy के लिए बेहतर है कि shielded हो)। इसे नोट कर लें, उदाहरण के लिए `zs1exampleaddress...`।
4. यदि आप transparent address (जो 't' से शुरू होता है) का उपयोग कर रहे हैं, तो यह आसान है लेकिन कम privacy देता है।

### चरण 2: अपना हार्डवेयर तैयार करें
- GPUs के लिए:
  1. अपने PC में GPUs install करें और drivers update करें (NVIDIA: GeForce Experience; AMD: Radeon Software)।
  2. यदि अनुभवी हों तो overclock करें (स्थिरता के लिए MSI Afterburner का उपयोग करें; efficiency के लिए +100-200 core clock, -500 memory का लक्ष्य रखें)।
- ASICs के लिए:
  1. ASIC को power और Ethernet से connect करें।
  2. Advanced IP Scanner या manufacturer के app जैसे tool का उपयोग करके उसका IP address खोजें।
  3. web dashboard access करें (जैसे browser में IP दर्ज करें, default login: Bitmain के लिए root/root)।

**चेतावनी:** उचित ventilation सुनिश्चित करें; माइनिंग से गर्मी उत्पन्न होती है। परीक्षण के लिए छोटे स्तर से शुरू करें।

### चरण 3: एक माइनिंग पूल चुनें और उसमें शामिल हों
माइनिंग पूल काम वितरित करते हैं और आपके contributed hashrate के आधार पर rewards साझा करते हैं। fees (0-2%), payout minimum (0.01-0.1 ZEC), location (low ping), और reliability के आधार पर चयन करें।

**अनुशंसित Pools (Hashrate, Fees, और Reviews के आधार पर):**
- **2Miners (zec.2miners.com)**: 1% fee, PPLNS payout, GPU/ASIC/NiceHash support करता है। High hashrate (~1.17 GSol/s), reliable servers।
- **F2Pool (zec.f2pool.com)**: 2% fee, PPS+ payout, multi-coin support। बड़ा pool (~2.57 GSol/s)।
- **ViaBTC (zec.viabtc.com)**: 2% fee (PPS+), user-friendly dashboard, global servers।
- **AntPool (zec.antpool.com)**: 1% fee, Bitmain से, ASICs के लिए अच्छा (~494 MSol/s)।
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Foundry Digital द्वारा पेशेवर Zcash mining pool। PPLNS payouts का उपयोग करता है, transparent reward tracking और enterprise-grade support प्रदान करता है। संस्थागत और बड़े पैमाने के ASIC miners के लिए सबसे उपयुक्त; account verification आवश्यक है।
- **Sovright (mining.sovright.com)**: Stratum V2 पर बना एक Zcash pool, जो वर्तमान में public testnet के रूप में चल रहा है। अभी live ZEC payouts नहीं हैं, इसलिए इसे कमाई के स्रोत के बजाय अपने setup को test करने के तरीके के रूप में देखें। विवरण के लिए नीचे समर्पित section देखें।
- अन्य: Kryptex Pool, Luxor (real-time stats के लिए poolwatch.io/coin/zcash जांचें)।

1. pool की website पर जाएँ और एक account बनाएं (email के साथ, या 2Miners जैसे कुछ pools में registration की आवश्यकता नहीं होती)।
2. payouts के लिए settings में अपना Zcash wallet address जोड़ें।
3. pool का stratum server (जैसे zec.2miners.com:1010) और port नोट करें।

### चरण 4: Mining Software install और configure करें
- GPUs के लिए (उदाहरण: Windows/Linux पर lolMiner):
  1. GitHub से lolMiner download करें (latest version, जैसे 1.88)।
  2. इसे एक folder में extract करें।
  3. configuration के साथ एक batch file (start.bat) बनाएं:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS` को अपने ZEC address से बदलें।
     - `WORKER_NAME`: आपकी rig के लिए एक नाम (जैसे Rig1)।
     - EU servers के लिए: eu.zec.2miners.com:1010।
  4. batch file चलाएँ। यह pool से connect होगी और माइनिंग शुरू करेगी।
- ASICs के लिए (उदाहरण: Bitmain Antminer):
  1. web dashboard में log in करें।
  2. Miner Configuration पर जाएँ।
  3. pool details जोड़ें:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (या खाली)।
  4. save करें और miner को reboot करें।
- अन्य software के लिए (जैसे GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**परीक्षण:** 10-15 मिनट तक चलाएँ; accepted shares और hashrate के लिए console जांचें।

### चरण 5: माइनिंग शुरू करें और monitor करें
1. miner launch करें: यह pool से connect होगा और shares submit करना शुरू करेगा।
2. इन माध्यमों से monitor करें:
   - Pool dashboard: hashrate, unpaid balance, और stats देखने के लिए अपना wallet address दर्ज करें।
   - Software console: errors, temperature देखें (इसे < 80 degrees C रखें)।
   - Tools: remote rig management के लिए HiveOS या SimpleMining OS का उपयोग करें।
3. Payouts: अधिकांश pools minimum तक पहुँचने पर स्वचालित रूप से भुगतान करते हैं (जैसे 0.05 ZEC)। pool के नियम जांचें।

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Pool और Relay Network

Sovright (sovright.com) एक Stratum V2 mining pool और एक अलग block relay network चलाता है। ये अलग-अलग काम करते हैं, इसलिए इन्हें नीचे अलग से कवर किया गया है।

### Mining Pool (mining.sovright.com)

Sovright का pool public Zcash testnet (NU6, Stratum V2) पर चलता है, mainnet पर नहीं। testnet वास्तविक ZEC का payout नहीं करता। इसे कमाई के लिए नहीं, बल्कि अपने miner configuration को test करने के लिए उपयोग करें।

- शुरू करने के लिए किसी account की आवश्यकता नहीं है। एक CPU या ASIC Equihash miner को pool की ओर point करें और आपकी shares live dashboard पर दिखाई देंगी।
- Sovright उन miners के लिए एक open source Stratum V2 proxy भी प्रकाशित करता है जो सिर्फ pool की jobs लेने के बजाय अपने block templates स्वयं चुनना चाहते हैं:

### Monitoring Foundry Zcash Pool

Foundry Zcash Pool उपयोगकर्ताओं के लिए:

- Foundry pool dashboard के माध्यम से miner performance monitor करें।
- जांचें:
  - Active workers
  - Reported hashrate
  - Accepted shares
  - Estimated rewards
  - Payout status

क्योंकि Foundry PPLNS reward model का उपयोग करता है, माइनिंग rewards केवल instant hashrate के बजाय pool की reward window में contributed shares पर निर्भर करते हैं।

अनुशंसित monitoring practices:
- ASIC dashboard hashrate की तुलना Foundry reported hashrate से करें।
- rejected shares, stale shares, या connection instability की जांच करें।
- स्थिर network connectivity बनाए रखें क्योंकि downtime submitted shares और संभावित rewards को कम कर देता है।
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
- Sovright के transparency page में shielded transactions के लिए "include all" policy बताई गई है, कुछ pools के विपरीत जो उन्हें filter कर देते हैं। प्रत्येक block को एक signed attestation मिलता है ताकि policy को स्वतंत्र रूप से जांचा जा सके।
- sample dashboard data के बजाय अपने workers को track करने के लिए mining.sovright.com पर एक account बनाएं (Google या email sign in)।

### Relay Network (relay.sovright.com)

Sovright अलग से Zcash mainnet पर एक public block relay network चलाता है। जब कोई pool एक block ढूंढता है, तो वह block नेटवर्क के बाकी हिस्से तक कितनी तेजी से पहुँचता है, यह निर्धारित करता है कि वह कितनी बार orphaned होता है, यानी वह propagation race हार जाता है और उसका reward खो जाता है। relay compact block relay with forward error correction का उपयोग करते हुए blocks को चार regions में forward करता है।

public dashboard इसका प्रभाव live दिखाता है: relay-connected regions में नए blocks plain peer to peer gossip की तुलना में आधे से भी कम समय में दिखाई देते हैं, और dashboard नेटवर्क की live orphan rate को track करता है।

यह individual miners के लिए नहीं, बल्कि pool operators के लिए infrastructure है। Sovright का open source `mining-infra` repository, found blocks को native P2P से तेज़ mesh में भेजने के लिए एक `submitblock` relay gateway का documentation देता है। connect करने के लिए, relay peer addresses और auth key के लिए सीधे Sovright (support@sovright.com) से संपर्क करें।

## सुझाव और सर्वोत्तम अभ्यास
- **Profitability:** whattomine.com/coins/166-zec-equihash जैसे calculators का उपयोग करें। उदाहरण: एक RTX 3060 (~300 Sol/s) $50/ZEC पर ~0.001 ZEC/day कमाती है, जिसमें से ~$0.50 बिजली घटती है।
- **Privacy:** जहाँ उपलब्ध हो वहाँ shielded pools का उपयोग करें; addresses को दोबारा उपयोग करने से बचें।
- **Security:** मजबूत passwords का उपयोग करें; pools/wallets पर 2FA enable करें। private keys कभी साझा न करें।
- **Troubleshooting:** यदि shares नहीं आ रही हैं, तो firewall, antivirus, या गलत config जांचें। forum.zcashcommunity.com या Reddit r/zec जैसे forums से जुड़ें।
- **Alternatives:** यदि लाभदायक न हो, तो cloud mining या अन्य coins की staking पर विचार करें।
- **Environmental Note:** माइनिंग ऊर्जा का उपभोग करती है; यदि संभव हो तो renewable sources का उपयोग करें।
- **Updates:** Zcash विकसित हो सकता है (जैसे संभावित PoS shift); समाचार के लिए z.cash जांचें।

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet, Rust में लिखा गया एक फुल नोड (full node) Zcash वॉलेट है। यह उस वॉलेट का प्रतिस्थापन है जो पहले `zcashd` में अंतर्निहित था। 18 जुलाई 2026 को ब्लॉक ऊंचाई 3417100 पर `zcashd` के एंड-ऑफ-सपोर्ट हॉल्ट पर पहुंचने के बाद, कंसेंसस और वॉलेट की ज़िम्मेदारियां अलग कर दी गईं: **Zebra** या **Zakura** चेन को वैलिडेट करते हैं, और **Zallet** की रखता है, नोट स्कैन करता है, और वॉलेट JSON-RPC उपलब्ध कराता है।

Zallet वर्तमान में **बीटा** में है। इसकी पूरी समीक्षा नहीं हुई है। ब्रेकिंग बदलावों के कारण वॉलेट को हटाकर दोबारा बनाना पड़ सकता है। [Zallet बुक](https://zcash.github.io/zallet/) में दी गई सुरक्षा चेतावनियां पढ़े बिना, बड़ी मात्रा में ZEC के लिए इसे प्रोडक्शन कस्टडी के रूप में न मानें।

---

## TL;DR

- Zallet एक **फुल नोड RPC वॉलेट** है, न कि मोबाइल लाइट वॉलेट और न ही कंसेंसस नोड।
- यह `zcashd` के वॉलेट वाले हिस्से की जगह लेता है। नोड वाला हिस्सा [Zebra](Zebra_Full_Node.md) या [Zakura](Zakura_Node.md) है।
- **Rust** में लिखा गया, MIT / Apache-2.0 के अंतर्गत दोहरे लाइसेंस वाला, और [zcash/zallet](https://github.com/zcash/zallet) में अनुरक्षित।
- अगस्त 2026 के अंत तक नवीनतम प्रकाशित रिलीज़: **v0.1.0-beta.3**।
- दो में से एक बैकएंड के माध्यम से चेन डेटा से संवाद करता है: **zebra-state** (स्थानीय `zebrad` के विरुद्ध सीधा `ReadStateService`) या **Zaino**।
- **zcashd-संगत JSON-RPC** का एक उपसमुच्चय उपलब्ध कराता है। कुछ मेथड बदले गए हैं; कुछ जानबूझकर छोड़े गए हैं।
- की से जुड़ी सामग्री (key material) हमेशा **age** से एन्क्रिप्ट की जाती है। लेनदेन (transaction) इतिहास, एड्रेस और व्यूइंग की `wallet.db` में बिना एन्क्रिप्शन के रखे रहते हैं।
- एक हस्ताक्षरित आर्काइव में तीन बाइनरी आती हैं: `zallet` (लॉन्चर), `zallet-zebra`, और `zallet-zaino`।
- आधिकारिक दस्तावेज़: [Zallet बुक](https://zcash.github.io/zallet/)।

---

## Zallet क्यों मौजूद है

`zcashd` ने Bitcoin Core से व्युत्पन्न एक कंसेंसस नोड और एक वॉलेट को एक ही प्रोसेस में बंडल किया था। वह डिज़ाइन अब समाप्त हो चुका है।

| भूमिका | पुराना स्टैक | वर्तमान स्टैक |
|------|-----------|---------------|
| कंसेंसस / P2P | `zcashd` | Zebra (`zebrad`) या Zakura |
| वॉलेट / की / बैलेंस | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| लाइट क्लाइंट इंडेक्सर | `lightwalletd` | Zaino या `lightwalletd` |

वॉलेट को नोड से अलग करने का अर्थ है:

- की को स्थानांतरित किए बिना नोड सॉफ़्टवेयर बदला जा सकता है (Zebra बनाम Zakura)।
- वॉलेट स्कैनिंग और खर्च करने का अधिकार (spend authority) एक ऐसी प्रोसेस में रहते हैं जिसे अलग से सुरक्षित किया जा सकता है।
- RPC सिमेंटिक्स `zcashd` की विचित्रताओं पर स्थिर रहने के बजाय ZIP 32 अकाउंट, यूनिफ़ाइड एड्रेस (Unified Addresses) और PCZT की ओर विकसित हो सकते हैं।

Zallet उन ऑपरेटरों के लिए बनाया गया वॉलेट है जो पहले `zcashd` को हॉट वॉलेट, एक्सचेंज बैकएंड, फॉसेट या माइनिंग पेआउट वॉलेट के रूप में चलाते थे।

---

## स्थिति

Zallet **बीटा** में है।

व्यवहार में इसका अर्थ है:

- किसी भी बीटा में ब्रेकिंग बदलाव आ सकते हैं। आपको डेटा डायरेक्टरी हटाकर फिर से शुरू करना पड़ सकता है।
- `zcashd` के सभी वॉलेट RPC पोर्ट नहीं किए गए हैं।
- पोर्ट किए गए कुछ मेथड के सिमेंटिक्स `zcashd` से भिन्न हैं। इंटीग्रेशन करने वालों को [परिवर्तित सिमेंटिक्स वाला पेज](https://zcash.github.io/zallet/zcashd/json_rpc.html) पढ़ना चाहिए।
- क्रेट अभी विकासाधीन हैं और उनकी पूरी समीक्षा नहीं हुई है।
- Zallet कोई Rust लाइब्रेरी **नहीं** है। यदि आप इसे लाइब्रेरी के रूप में उपयोग करते हैं, तो कोई गारंटी नहीं है।

प्रतिक्रिया [GitHub इश्यू](https://github.com/zcash/zallet/issues/new) पर या [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) पर `#wallet-dev` चैनल में भेजें।

इच्छित RPC सतह उपलब्ध होने के बाद आगे एक स्थिर चरण की योजना है। तब कॉलर से अपेक्षा की जाएगी कि वे प्रलेखित सिमेंटिक अंतरों सहित Zallet के मेथड पर माइग्रेट करें।

---

## आर्किटेक्चर

Zallet को तीन Cargo वर्कस्पेस में विभाजित किया गया है ताकि दोनों चेन बैकएंड अलग-अलग डिपेंडेंसी ग्राफ़ का पालन कर सकें।

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

तीनों बाइनरी **एक ही** `wallet.db` खोलती हैं। लॉन्चर रनटाइम पर बैकएंड चुनता है; बदलने के लिए आपको दोबारा कंपाइल करने की आवश्यकता नहीं है।

सामान्य डिप्लॉयमेंट:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet एक **फुल नोड वॉलेट** है: यह एक स्थानीय वैलिडेटिंग नोड की अपेक्षा करता है। यह लाइट क्लाइंट नहीं है। लाइट वॉलेट और कॉम्पैक्ट-ब्लॉक सर्वर के लिए [Zaino](Zaino.md) और [लाइटवॉलेट नोड](Lightwallet_Nodes.md) देखें।

Zcash Foundation का [Z3](https://github.com/ZcashFoundation/z3) कंपोज़ स्टैक Zebra + Zallet को एक साथ चलाता है, और बाहरी लाइट क्लाइंट के लिए वैकल्पिक स्टैंडअलोन Zaino भी उपलब्ध है।

---

## अकाउंट, एड्रेस और की

Zallet ZIP 32 अकाउंट के आधार पर बना है, न कि `zcashd` के एकल अंतर्निहित अकाउंट पर।

- एक वॉलेट में **कई BIP 39 नेमोनिक** हो सकते हैं। प्रत्येक नेमोनिक एक स्वतंत्र स्पेंड रूट है, जिसकी पहचान एक **सीड फ़िंगरप्रिंट** (`zip32seedfp1…`) से होती है।
- **अकाउंट** एक सीड से ZIP 32 अकाउंट इंडेक्स के साथ व्युत्पन्न किए जाते हैं। एक Zallet इंस्टेंस के भीतर उनका एक स्थानीय **UUID** भी होता है। किसी अकाउंट की पोर्टेबल पहचान `(seedfp, account index)` है।
- एड्रेस **ZIP 316 यूनिफ़ाइड एड्रेस** होते हैं, जो `z_getaddressforaccount` से बनाए जाते हैं। एक अकाउंट के कई डायवर्सिफ़ाइड एड्रेस हो सकते हैं; शील्डेड रिसीवर को ऑन-चेन आपस में जोड़ा नहीं जा सकता।
- इम्पोर्ट की गई स्पेंडिंग की (`z_importkey`) और केवल-निगरानी (watch-only) एड्रेस (`z_importaddress`) ऐसे UUID अकाउंट बन जाते हैं जो किसी नेमोनिक के अंतर्गत नहीं आते।
- व्यूइंग की को एक्सपोर्ट और इम्पोर्ट किया जा सकता है (`z_exportviewingkey`, `z_importviewingkey`), जिसमें यूनिफ़ाइड फुल व्यूइंग की और इनकमिंग व्यूइंग की शामिल हैं।

`getnewaddress` लागू नहीं किया गया है। `z_getnewaccount` और `z_getaddressforaccount` का उपयोग करें।

यदि `keystore.require_backup` चालू है (`zcashd` के `walletrequirebackup` का माइग्रेट किया गया रूप), तो Zallet ऐसे नेमोनिक से नया स्पेंड अधिकार व्युत्पन्न करने से इनकार करता है जिसके बैकअप की पुष्टि नहीं हुई है।

---

## एन्क्रिप्शन और बैकअप

की से जुड़ी सामग्री **हमेशा** एन्क्रिप्ट की जाती है। कोई अनएन्क्रिप्टेड मोड नहीं है और कोई `encryptwallet` RPC नहीं है — वह `zcashd` मेथड कभी पूरी तरह समर्थित नहीं था।

- सेटअप एक **age** आइडेंटिटी बनाता है, जिसका डिफ़ॉल्ट पाथ `{datadir}/encryption-identity.txt` है।
- नेमोनिक और इम्पोर्ट की गई स्पेंडिंग की `wallet.db` में age सिफ़रटेक्स्ट के रूप में संग्रहीत होती हैं।
- डेटाबेस का शेष भाग एन्क्रिप्टेड **नहीं** है। यदि किसी को फ़ाइल मिल जाए, तो इतिहास, एड्रेस और व्यूइंग की पढ़े जा सकते हैं।
- आइडेंटिटी को पासफ़्रेज़ से सुरक्षित किया जा सकता है (`generate-encryption-identity -p`)। `walletpassphrase` RPC से अनलॉक करें; `walletlock` से लॉक करें।
- आइडेंटिटी फ़ाइल या उसका पासफ़्रेज़ खो देने पर स्पेंडिंग की पुनर्प्राप्त नहीं की जा सकतीं। आइडेंटिटी, हर नेमोनिक, और (अलग से, एन्क्रिप्ट करके) अपने पास रखी किसी भी `wallet.db` कॉपी का बैकअप लें।

Zallet चलते समय `wallet.db` को कॉपी करना सुरक्षित बैकअप नहीं है। SQLite फ़ाइल असंगत होकर टूट सकती है। बंद प्रोसेस को प्राथमिकता दें, या किसी आधिकारिक ऑनलाइन-बैकअप कमांड की प्रतीक्षा करें।

---

## JSON-RPC

Zallet HTTP पर Basic auth के साथ `zcashd` वॉलेट RPC का एक उपसमुच्चय लागू करता है। लूपबैक से बाइंड करें। दूरस्थ उपयोग एक एन्क्रिप्टेड टनल के माध्यम से होना चाहिए। `rpc.allow_insecure_remote_bind` मौजूद है और असुरक्षित है।

`zcashd` से उल्लेखनीय अंतर:

- `getwalletinfo` पर बैलेंस फ़ील्ड खाली हैं। `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance` का उपयोग करें।
- शुल्क (fee) **ZIP 317** का पालन करते हैं। कोई `settxfee` नहीं है।
- स्पेंड निर्माण **PCZT** (Partially Created Zcash Transactions, ZIP 374) की ओर बढ़ रहा है। PCZT RPC बीटा सीरीज़ में आ चुके हैं।
- एक वैश्विक **सिंक लॉक** बैलेंस और स्पेंड RPC को तब तक रोकता है जब तक वॉलेट अद्यतन हो रहा हो या किसी रीऑर्ग से उबर रहा हो (`ClientInInitialDownload` / `ForbiddenBySafeMode`)।

जानबूझकर छोड़े गए मेथड में `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, और `encryptwallet` शामिल हैं। इनके विकल्प [Zallet बुक](https://zcash.github.io/zallet/zcashd/json_rpc.html) में सूचीबद्ध हैं।

---

## शुरुआत

आधिकारिक इंस्टॉल पथ (Debian पैकेज, Docker, रिलीज़ बाइनरी) [इंस्टॉलेशन गाइड](https://zcash.github.io/zallet/guide/installation/index.html) में हैं। रिलीज़ आर्काइव के नाम `zallet-<version>-<arch>.tar.gz` होते हैं और उनमें तीनों बाइनरी होती हैं।

न्यूनतम नया-वॉलेट प्रवाह:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

`[indexer]` को एक स्थानीय `zebrad` JSON-RPC एंडपॉइंट पर पॉइंट करें। Zebra बैकएंड को `[indexer.read_state_service]` और इंडेक्सर फ़ीचर के साथ बनाया गया एक `zebrad` भी चाहिए, ताकि Zallet चेन स्टेट को सीधे पढ़ सके।

[StageX](https://codeberg.org/stagex/stagex/) से पुनरुत्पादनीय इमेज बनाई जा सकती हैं (Docker 25+, containerd इमेज स्टोर, GNU Make)।

---

## zcashd से माइग्रेशन

जब तक आप बैलेंस की पुष्टि और रीस्टोर का परीक्षण न कर लें, तब तक पुरानी `zcashd` डेटा डायरेक्टरी (datadir) को सुरक्षित रखें।

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` केवल `zcashd-import` फ़ीचर वाले बिल्ड में उपलब्ध है। `wallet.dat` को पढ़ने के लिए **Berkeley DB 6.2** का `db_dump` चाहिए, वही संस्करण जिसका `zcashd` उपयोग करता था।

चरण-दर-चरण ऑपरेटर निर्देश: [माइग्रेशन गाइड: zcashd से Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)।

---

## Zallet अन्य सॉफ़्टवेयर से कैसे संबंधित है

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| यह क्या है | फुल नोड RPC वॉलेट | शील्डेड-फ़र्स्ट वॉलेट सर्वर | एंड-यूज़र वॉलेट | कंसेंसस नोड | इंडेक्सर / lightwalletd का प्रतिस्थापन |
| किसकी जगह लेता है | `zcashd` वॉलेट | `zcashd` का सीधा क्लोन नहीं | मोबाइल/डेस्कटॉप ऐप | `zcashd` नोड | `lightwalletd` |
| स्थानीय नोड आवश्यक | हाँ | हाँ (डिफ़ॉल्ट रूप से Zebra) | नहीं (लाइट क्लाइंट) | यह *स्वयं* नोड है | हाँ |
| zcashd RPC संगतता | संगतता पथ के रूप में डिज़ाइन किया गया | केवल छोटा चुना हुआ उपसमुच्चय | लागू नहीं | आंशिक / Zakura संगतता मोड | अलग API |
| कस्टडी मॉडल | ऑपरेटर `wallet.db` में की रखता है | सीड से पुनर्प्राप्त करने योग्य सर्वर | उपयोगकर्ता के डिवाइस पर की | कोई वॉलेट नहीं | कोई की नहीं |

Zallet और **zecd** दोनों Zebra के आगे रखे जा सकते हैं। जब आपको `z_*` वॉलेट इंटरफ़ेस और `wallet.dat` से माइग्रेशन पथ चाहिए, तो Zallet चुनें। जब आप ऐसा शील्डेड-फ़र्स्ट सर्वर चाहते हैं जो स्पष्ट रूप से `zcashd` का क्लोन *नहीं* है, तो zecd चुनें।

[zallet.io](https://www.zallet.io/) पर एक अलग उपभोक्ता उत्पाद है जो इसी नाम का उपयोग करता है। वह ऐप यह प्रोजेक्ट नहीं है।

---

## संबंधित पेज

- [फुल नोड](Full_Nodes.md) — Zebra, Zakura, और सेवानिवृत्त `zcashd` नोड
- [Zebra फुल नोड](Zebra_Full_Node.md) — वह नोड जिसे Zallet का डिफ़ॉल्ट बैकएंड पढ़ता है
- [Zakura नोड](Zakura_Node.md) — वैकल्पिक वैलिडेटिंग नोड
- [Zaino](Zaino.md) — इंडेक्सर बैकएंड और लाइट क्लाइंट सर्वर
- [zecd](ZECD.md) — librustzcash पर आधारित एक अन्य वॉलेट-सर्वर डिज़ाइन
- [Zcash वॉलेट सिंकिंग](Zcash_Wallet_Syncing.md) — शील्डेड वॉलेट चेन को कैसे स्कैन करते हैं
- [व्यूइंग की](Viewing_Keys.md)

## संसाधन

- [Zallet बुक](https://zcash.github.io/zallet/)
- [GitHub पर zcash/zallet](https://github.com/zcash/zallet)
- [रिलीज़](https://github.com/zcash/zallet/releases)
- [JSON-RPC के परिवर्तित सिमेंटिक्स](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi गाइड (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet कंपोज़ स्टैक)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`

<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# व्यावहारिक गाइड: Zcash नोड RPC और ब्लॉकचेन इंडेक्सिंग

यह पेज चल रहे Zcash फुल नोड से JSON-RPC के ज़रिए बात करने और एक ऐसा इंडेक्सर (indexer) जोड़ने की रेसिपी-बुक है, जिससे लाइट वॉलेट और एक्सप्लोरर (explorer) क्वेरी कर सकें। यह **कोई** दूसरी इंस्टॉल गाइड **नहीं** है।

`zcashd` के बाद के स्टैक (Zebra + Zallet, वैकल्पिक Zaino, पोर्ट, वॉल्यूम, दो-चरणीय बूट) को चालू करने के लिए [Z3 स्टैक](/zcash-tech/z3-stack) पेज और [Z3 रिपॉज़िटरी](https://github.com/ZcashFoundation/z3) देखें। कंसेंसस नोड की पृष्ठभूमि के लिए [फुल नोड](/zcash-tech/full-nodes) और [Zebra फुल नोड](/zcash-tech/zebra-full-node) देखें।

`zcashd` का जीवनकाल 18 जुलाई 2026 को समाप्त हो गया। नया ऑपरेटर कार्य `zcashd` के बजाय Zebra (या [Zakura](/zcash-tech/zakura-node)) और साथ में एक वॉलेट/इंडेक्सर को लक्ष्य करके होना चाहिए।

---

## संक्षेप में

* **JSON-RPC** वह तरीका है जिससे ऑपरेटर और वॉलेट किसी नोड से चेन टिप, पीयर (peers) और (वॉलेट प्रोसेस पर) बैलेंस के बारे में पूछते हैं। Z3 पर Zebra नोड RPC प्रदान करता है; Zallet वॉलेट RPC प्रदान करता है।
* **रेगटेस्ट (regtest)** इन कॉल को सीखने की सही जगह है। `http://127.0.0.1:8181` पर Z3 का rpc-router `zebra` / `zebra` स्वीकार करता है और नोड मेथड को Zebra तथा वॉलेट मेथड को Zallet पर फ़ॉरवर्ड करता है।
* **मेननेट (mainnet) और टेस्टनेट (testnet)** Zebra पर कुकी ऑथ (cookie auth) का उपयोग करते हैं। रेगटेस्ट का यूज़रनेम/पासवर्ड किसी सार्वजनिक नोड पर कॉपी न करें।
* **इंडेक्सिंग** सत्यापन (validation) से अलग काम है। Zebra सत्यापन करता है। [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) lightwalletd-संगत gRPC प्रदान करता है। [Ztreamer](https://github.com/distractedm1nd/ztreamer) एक Zakura-आधारित इंडेक्सर है; Z3 इसे शामिल नहीं करता।
* Zaino JSON-RPC और Zebra का वैकल्पिक इंडेक्सर gRPC लूपबैक या किसी विश्वसनीय नेटवर्क के लिए हैं। इन्हें बिना ऑथेंटिकेशन के सार्वजनिक इंटरनेट पर उजागर न करें।

---

## कौन-सा प्रोसेस किस कॉल का जवाब देता है

| आपको क्या चाहिए | किससे बात करें | Z3 मेननेट होस्ट पोर्ट | विवरण |
| --- | --- | --- | --- |
| चेन टिप, पीयर, `getblockchaininfo` | Zebra JSON-RPC | 8232 | कुकी ऑथ |
| वॉलेट बैलेंस, एड्रेस, भेजना | Zallet RPC | 28232 | अलग प्रोसेस; बीटा सॉफ़्टवेयर |
| लाइट वॉलेट के लिए कॉम्पैक्ट ब्लॉक | Zaino gRPC | 8137 | केवल `--profile indexer` के साथ; प्लेनटेक्स्ट h2c |
| एक्सप्लोरर / फॉसेट JSON-RPC प्रॉक्सी | Zaino JSON-RPC | 8237 | केवल विश्वसनीय नेटवर्क |
| सिंक के बिना ऊपर दिए सभी का अभ्यास | Z3 रेगटेस्ट rpc-router | 8181 | यूज़रनेम `zebra` / पासवर्ड `zebra` |

पोर्ट मैट्रिक्स और Compose प्रोजेक्ट नाम: [Z3 स्टैक](/zcash-tech/z3-stack) और [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)।

---

## पहले रेगटेस्ट पर अभ्यास करें

Z3 चेकआउट से, `./scripts/regtest-init.sh` और `docker compose --env-file .env.regtest up -d` के बाद:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

एक स्वस्थ `getblockchaininfo` परिणाम में `"blocks"` और एक `"upgrades"` मैप शामिल होता है। यदि curl अटक जाता है, तो राउटर चालू नहीं है; यदि आपको `401` मिलता है, तो आप राउटर के बजाय सीधे Zebra तक पहुँच रहे हैं (रेगटेस्ट पर सीधा Zebra `29232` है और जब तक आपने उन्हें बदला न हो, यह अब भी राउटर के क्रेडेंशियल की अपेक्षा करता है)।

एक्टिवेशन ब्लॉक की माइनिंग सहित पूरा रेगटेस्ट वर्कफ़्लो: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)।

---

## मेननेट / टेस्टनेट JSON-RPC (कुकी ऑथ)

मेननेट और टेस्टनेट पर Zallet और वैकल्पिक Zaino सेवा एक **साझा कुकी वॉल्यूम** पढ़ते हैं। यह कुकी हर बूट पर दोबारा बनाई जाती है; यह बैकअप का लक्ष्य नहीं है।

Zebra JSON-RPC को सार्वजनिक इंटरनेट पर प्रकाशित **न** करें। इसे Compose नेटवर्क (`zebra:8232`) से कॉल करें, या होस्ट से केवल तभी जब आपने इसे लूपबैक से बाइंड किया हो।

Zebra के `/ready` होने के बाद ऑपरेटर की सामान्य जाँचें:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` माइनिंग RPC हैं। जो पूल अब भी एक ही `zcashd` प्रोसेस की अपेक्षा रखते थे, उन्हें टेम्पलेट के लिए Zebra (या Zakura) और साथ ही कॉइनबेस के लिए अपने किसी भी वॉलेट की ज़रूरत होगी। देखें [Zcash माइनिंग पूल](/using-zcash/zcash-mining-pools) और [माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet)।

---

## इंडेक्सर जोड़ना

सत्यापन और इंडेक्सिंग अलग-अलग काम हैं।

### Zaino (जो Z3 में शामिल है)

Zaino Zebra को पढ़ता है और एक lightwalletd-संगत gRPC API के साथ एक JSON-RPC प्रॉक्सी प्रदान करता है। Zallet को स्टैंडअलोन Zaino कंटेनर की **ज़रूरत नहीं** होती; यह Zaino लाइब्रेरी को अपने भीतर रखता है और JSON-RPC के ज़रिए Zebra से बात करता है। जब आपको बाहरी लाइट वॉलेट, एक्सप्लोरर या फॉसेट चाहिए, तब स्टैंडअलोन Zaino शुरू करें:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

क्लाइंट को Zaino की ओर इंगित करने से पहले Zebra के सिंक होने तक प्रतीक्षा करें। ऊँची फ़ेच कॉन्करेंसी के साथ कैच-अप कर रहा बल्क इंडेक्सर Zebra के वेरिफ़ायर को धीमा कर सकता है; जब तक इंडेक्सर कैच-अप न कर ले, `fetch_concurrency` को कम एकल अंकों में रखें।

रेगटेस्ट gRPC (प्लेनटेक्स्ट; पोर्ट `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Zaino gRPC सभी नेटवर्क पर प्लेनटेक्स्ट h2c है। यदि होस्ट के बाहर से कुछ भी कनेक्ट होगा, तो TLS को रिवर्स प्रॉक्सी पर टर्मिनेट करें। विवरण: [Zaino](/zcash-tech/zaino) और [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)।

### अन्य इंडेक्सर (Z3 नहीं)

* **lightwalletd** — पुराना कॉम्पैक्ट-ब्लॉक सर्वर। अब भी कई जगह तैनात है; इस भूमिका के लिए Zaino उत्तराधिकारी मार्ग है।
* **Ztreamer** — एक Zakura-आधारित इंडेक्सर और `CompactTxStreamer` इम्प्लीमेंटेशन। यह Z3 सेवा नहीं है। देखें [Ztreamer रिपॉज़िटरी](https://github.com/distractedm1nd/ztreamer)।
* **Zebra `rpc.indexer_listen_addr`** — Zebra के *भीतर* एक वैकल्पिक gRPC लिसनर। Z3 को इसकी ज़रूरत नहीं है और Z3 इसे होस्ट पर प्रकाशित नहीं करता।

---

## आम गलतियाँ

**Zebra पर वॉलेट मेथड कॉल करना।** `getwalletinfo` और भेजने वाले RPC Zallet (या किसी अन्य वॉलेट) के हैं, कंसेंसस नोड के नहीं।

**Zebra के `/ready` होने से पहले Zallet शुरू करना।** Zallet बार-बार रीस्टार्ट होता रहेगा। मेननेट/टेस्टनेट पर `scripts/check-zebra-readiness.sh` का उपयोग करें।

**रेगटेस्ट का `zebra`/`zebra` मेननेट पर कॉपी करना।** मेननेट/टेस्टनेट पर कुकी ऑथ किसी कारण से ही डिफ़ॉल्ट है।

**Zaino को फुल नोड समझना।** Zebra (या Zakura) सत्यापन करता है। Zaino इंडेक्सिंग करता है।

**Zaino JSON-RPC या Zebra इंडेक्सर gRPC को सार्वजनिक रूप से उजागर करना।** ये एंडपॉइंट लूपबैक या किसी विश्वसनीय निजी नेटवर्क के लिए हैं।

**यह मान लेना कि हर लाइट वॉलेट पहले से Zaino समझता है।** वॉलेट की मौजूदा रिलीज़ की तुलना उस प्रोटोकॉल से करें जिसे वह वास्तव में लागू करता है।

---

## संबंधित पेज

* [Z3 स्टैक](/zcash-tech/z3-stack) — इंस्टॉल, पोर्ट, वॉल्यूम, दो-चरणीय बूट
* [Zaino](/zcash-tech/zaino) — इंडेक्सर की भूमिका और ऑपरेटर के लिए जानकारी
* [फुल नोड](/zcash-tech/full-nodes)
* [Zebra फुल नोड](/zcash-tech/zebra-full-node)
* [लाइटवॉलेट नोड](/zcash-tech/lightwallet-nodes)
* [माइग्रेशन गाइड: zcashd से Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib और Zaino ट्यूटोरियल](/guides/zingolib-and-zaino-tutorial)

## संसाधन

* [Z3 रिपॉज़िटरी](https://github.com/ZcashFoundation/z3)
* [Z3 रेगटेस्ट कुकबुक (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet बुक](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**अंतिम अपडेट:** सितंबर 2026

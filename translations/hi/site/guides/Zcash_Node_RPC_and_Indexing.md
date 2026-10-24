<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# व्यावहारिक मार्गदर्शिका: Zcash नोड RPC और Blockchain इंडेक्सिंग

यह पृष्ठ चल रहे Zcash पूर्ण नोड से JSON-RPC पर बात करने और ऐसा इंडेक्सर जोड़ने की विधियों का संग्रह है, जिसे light wallets और explorers क्वेरी कर सकें। यह **दूसरी इंस्टॉल मार्गदर्शिका नहीं** है।

`zcashd` के बाद वाले स्टैक को शुरू करने के तरीके (Zebra + Zallet, वैकल्पिक Zaino, पोर्ट, वॉल्यूम, दो-चरणीय बूट) के लिए [Z3 Stack](/zcash-tech/z3-stack) पृष्ठ और [Z3 repository](https://github.com/ZcashFoundation/z3) का उपयोग करें। सर्वसम्मति नोड की पृष्ठभूमि के लिए [Full Nodes](/zcash-tech/full-nodes) और [Zebra Full Node](/zcash-tech/zebra-full-node) देखें।

`zcashd` 18 जुलाई 2026 को जीवन-अंत तक पहुँच गया। नए ऑपरेटर कार्यों को Zebra (या [Zakura](/zcash-tech/zakura-node)) और एक wallet/indexer को लक्षित करना चाहिए, `zcashd` को नहीं।

---

## संक्षेप में

* **JSON-RPC** वह माध्यम है जिससे ऑपरेटर और wallets नोड से chain tip, peers, और (wallet प्रक्रिया पर) balances के बारे में पूछते हैं। Z3 में, Zebra नोड RPC प्रदान करता है; Zallet wallet RPC प्रदान करता है।
* **Regtest** कॉल्स सीखने के लिए सही स्थान है। `http://127.0.0.1:8181` पर Z3 का rpc-router `zebra` / `zebra` स्वीकार करता है और नोड methods को Zebra तथा wallet methods को Zallet तक अग्रेषित करता है।
* **Mainnet और testnet** Zebra पर cookie auth का उपयोग करते हैं। regtest का username/password किसी सार्वजनिक नोड पर कॉपी न करें।
* **इंडेक्सिंग** सत्यापन से अलग कार्य है। Zebra सत्यापित करता है। [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) lightwalletd-संगत gRPC प्रदान करता है। [Ztreamer](https://github.com/distractedm1nd/ztreamer) एक Zakura-आधारित इंडेक्सर है; यह Z3 के साथ नहीं आता।
* Zaino JSON-RPC और Zebra का वैकल्पिक indexer gRPC loopback या विश्वसनीय नेटवर्क के लिए हैं। उन्हें सार्वजनिक इंटरनेट पर बिना प्रमाणीकरण के उजागर न करें।

---

## कौन-सी प्रक्रिया किस कॉल का उत्तर देती है

| आप क्या चाहते हैं | किससे बात करें | Z3 mainnet host port | टिप्पणियाँ |
| --- | --- | --- | --- |
| Chain tip, peers, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie auth |
| Wallet balance, addresses, भेजना | Zallet RPC | 28232 | अलग प्रक्रिया; beta software |
| Light wallets के लिए compact blocks | Zaino gRPC | 8137 | केवल `--profile indexer` के साथ; plaintext h2c |
| Explorer / faucet JSON-RPC proxy | Zaino JSON-RPC | 8237 | केवल विश्वसनीय नेटवर्क |
| सिंक के बिना उपर्युक्त सभी का अभ्यास | Z3 regtest rpc-router | 8181 | Username `zebra` / password `zebra` |

पोर्ट मैट्रिक्स और Compose प्रोजेक्ट नाम: [Z3 Stack](/zcash-tech/z3-stack) और [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)।

---

## पहले regtest पर अभ्यास करें

Z3 checkout से, `./scripts/regtest-init.sh` और `docker compose --env-file .env.regtest up -d` के बाद:

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

एक स्वस्थ `getblockchaininfo` परिणाम में `"blocks"` और एक `"upgrades"` map शामिल होता है। यदि curl अटकता है, तो router चालू नहीं है; यदि आपको `401` मिलता है, तो आप router के बजाय सीधे Zebra को हिट कर रहे हैं (regtest पर प्रत्यक्ष Zebra `29232` है और तब भी router credentials की अपेक्षा करता है, जब तक कि आपने उन्हें बदला न हो)।

activation blocks की mining सहित पूर्ण regtest कार्यप्रवाह: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)।

---

## Mainnet / testnet JSON-RPC (cookie auth)

Mainnet और testnet पर, Zallet और वैकल्पिक Zaino सेवा एक **साझा cookie volume** पढ़ते हैं। वह cookie बूट पर फिर से बनाई जाती है; वह बैकअप का लक्ष्य नहीं है।

Zebra JSON-RPC को सार्वजनिक इंटरनेट पर **प्रकाशित न करें**। इसे Compose नेटवर्क (`zebra:8232`) से कॉल करें या host से केवल तभी कॉल करें जब आपने इसे loopback से बाँधा हो।

Zebra के `/ready` होने के बाद सामान्य ऑपरेटर जाँच:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` mining RPCs हैं। जिन pools को अभी भी एकल `zcashd` प्रक्रिया की अपेक्षा है, उन्हें templates के लिए Zebra (या Zakura) तथा coinbase के लिए अपने उपयोग का कोई भी wallet चाहिए। [Zcash Mining Pools](/using-zcash/zcash-mining-pools) और [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।

---

## इंडेक्सर जोड़ें

सत्यापन और इंडेक्सिंग अलग-अलग कार्य हैं।

### Zaino (जो Z3 के साथ आता है)

Zaino, Zebra को पढ़ता है और lightwalletd-संगत gRPC API तथा JSON-RPC proxy प्रदान करता है। Zallet को standalone Zaino container की **आवश्यकता नहीं** है; यह Zaino libraries को एम्बेड करता है और JSON-RPC के माध्यम से Zebra से बात करता है। बाहरी light wallets, explorers, या faucets चाहिए हों तो standalone Zaino शुरू करें:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Clients को Zaino की ओर इंगित करने से पहले Zebra के सिंक होने तक प्रतीक्षा करें। अधिक fetch concurrency के साथ catch-up में चल रहा bulk indexer, Zebra के verifier को धीमा कर सकता है; indexer के catch up होने तक `fetch_concurrency` को कम एकल अंकों में रखें।

Regtest gRPC (plaintext; पोर्ट `28137`):

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

Zaino gRPC सभी नेटवर्कों पर plaintext h2c है। यदि host के बाहर से कोई कनेक्ट करेगा, तो reverse proxy पर TLS समाप्त करें। विवरण: [Zaino](/zcash-tech/zaino) और [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)।

### अन्य इंडेक्सर (Z3 नहीं)

* **lightwalletd** — पुराना compact-block server। अभी भी व्यापक रूप से तैनात है; इस भूमिका के लिए Zaino उत्तराधिकारी मार्ग है।
* **Ztreamer** — एक Zakura-आधारित इंडेक्सर और `CompactTxStreamer` implementation। यह Z3 सेवा नहीं है। [Ztreamer repository](https://github.com/distractedm1nd/ztreamer) देखें।
* **Zebra `rpc.indexer_listen_addr`** — Zebra के *अंदर* एक वैकल्पिक gRPC listener। Z3 को इसकी आवश्यकता नहीं है और यह इसे host पर प्रकाशित नहीं करता।

---

## सामान्य गलतियाँ

**Zebra पर wallet methods कॉल करना।** `getwalletinfo` और send RPCs, consensus नोड के नहीं बल्कि Zallet (या किसी अन्य wallet) के होते हैं।

**Zebra के `/ready` होने से पहले Zallet शुरू करना।** Zallet restart-loop में चला जाएगा। mainnet/testnet पर `scripts/check-zebra-readiness.sh` का उपयोग करें।

**regtest के `zebra`/`zebra` को mainnet पर कॉपी करना।** Cookie auth किसी कारण से mainnet/testnet का default है।

**Zaino को पूर्ण नोड मानना।** Zebra (या Zakura) सत्यापित करता है। Zaino इंडेक्स करता है।

**Zaino JSON-RPC या Zebra indexer gRPC को सार्वजनिक रूप से उजागर करना।** वे endpoints loopback या विश्वसनीय निजी नेटवर्क के लिए हैं।

**यह मान लेना कि हर light wallet पहले से Zaino बोलता है।** wallet के वर्तमान release को उसके वास्तव में लागू प्रोटोकॉल के विरुद्ध जाँचें।

---

## संबंधित पृष्ठ

* [Z3 Stack](/zcash-tech/z3-stack) — इंस्टॉल, पोर्ट, वॉल्यूम, दो-चरणीय बूट
* [Zaino](/zcash-tech/zaino) — इंडेक्सर की भूमिका और ऑपरेटर नोट्स
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Migration Guide: zcashd से Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib और Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)

## संसाधन

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 regtest cookbook (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**अंतिम अपडेट:** सितंबर 2026

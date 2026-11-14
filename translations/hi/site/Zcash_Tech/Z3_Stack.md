<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

**Z3 Stack** Zcash Foundation का पैकेज किया हुआ नोड (node) प्लेटफ़ॉर्म है: **Zebra** (फुल नोड (full node)) + **Zallet** (फुल-नोड वॉलेट (wallet)), साथ में एक वैकल्पिक **Zaino** इंडेक्सर (indexer)। इसे स्टैंडअलोन `zcashd` प्रोसेस की जगह लेने के लिए बनाया गया है। उस प्रोसेस में कंसेंसस (consensus) और वॉलेट एक ही बाइनरी में थे, और 18 जुलाई 2026 को उसका जीवनकाल समाप्त हो गया।

इसका संदर्भ इम्प्लीमेंटेशन [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) पर मौजूद Docker Compose प्रोजेक्ट है।

---

## संक्षेप में

* Z3 **कोई नया कंसेंसस क्लाइंट नहीं है**। यह `zcashd` के बाद वाले स्टैक को एक साथ चलाने का तरीका है: Zebra चेन (chain) को वैलिडेट करता है, Zallet कुंजियाँ रखता है और वॉलेट RPC देता है, और Zaino (वैकल्पिक) lightwalletd gRPC प्रोटोकॉल पर संवाद करता है।
* `zcashd` में नोड + वॉलेट एक साथ थे। Z3 **इन भूमिकाओं को अलग करता है**। एक्सचेंज (exchange), माइनिंग (mining) पूल (pool) और फुल-नोड वॉलेट चलाने वाले दूसरे ऑपरेटर केवल Zebra पर नहीं, बल्कि इसी संयोजन पर माइग्रेट करते हैं।
* एक ही होस्ट पर तीन अलग-अलग Compose प्रोजेक्ट चल सकते हैं: **मेननेट**, **टेस्टनेट** और **रेगटेस्ट**।
* मेननेट का पहला सिंक लगभग **24–72 घंटे** का होता है और करीब **300 GB** जगह लेता है। रेगटेस्ट कुछ ही सेकंड में चालू हो जाता है और स्टैक सीखने के लिए सही जगह है।
* Zallet में Zaino की इंडेक्सर लाइब्रेरी एम्बेड की गई हैं और यह JSON-RPC के ज़रिए Zebra से बात करता है। स्टैंडअलोन Zaino सेवा की ज़रूरत तभी है जब आप बाहरी वॉलेट के लिए lightwalletd-संगत एंडपॉइंट चाहते हों।
* Zallet अभी **बीटा** में है। ब्रेकिंग बदलावों के कारण वॉलेट को डिलीट करके फिर से बनाना पड़ सकता है। बड़ी रकम के लिए इसे पूरा तैयार कस्टोडियल (custodial) सॉफ़्टवेयर न मानें।

---

## Z3 क्यों मौजूद है

Zcash के ज़्यादातर इतिहास में `zcashd` ही संदर्भ फुल नोड था और प्रोडक्शन में इस्तेमाल होने वाला एकमात्र फुल-नोड वॉलेट भी। एक्सचेंज, पूल और कस्टोडियन ने इसी डिज़ाइन के साथ इंटीग्रेशन किया था।

`zcashd` अब सेवानिवृत्त हो चुका है। कंसेंसस [Zebra](/zcash-tech/zebra-full-node) पर चला गया है (और अब [Zakura](/zcash-tech/zakura-node) पर भी)। एम्बेडेड वॉलेट [Zallet](https://github.com/zcash/zallet) पर चला गया है। लाइट-वॉलेट सर्विंग [lightwalletd](/zcash-tech/lightwallet-nodes) से [Zaino](/zcash-tech/zaino) पर जा रही है।

ये तीनों हिस्से अलग रिपॉज़िटरी में हैं, इनकी रिलीज़ अलग-अलग होती हैं और इनके कॉन्फ़िग भी अलग हैं। Z3 इन्हें जोड़ता है: पिन की गई इमेज, ऐसे हेल्थ चेक जो नोड के सिंक होने तक वॉलेट को बंद रखते हैं, हर नेटवर्क के लिए अलग पोर्ट और वॉल्यूम, और ऑपरेटर के लिए दस्तावेज़ित तरीका।

यह नाम इकोसिस्टम का एक अनौपचारिक संक्षिप्त रूप है — Zebra, Zaino, Zallet — हालाँकि डिफ़ॉल्ट Compose फ़ाइल केवल Zebra और Zallet को शुरू करती है। Zaino एक Compose प्रोफ़ाइल है, कोई अनिवार्य तीसरा प्रोसेस नहीं।

---

## आर्किटेक्चर

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| घटक | Z3 में भूमिका | आवश्यक? |
| --- | --- | --- |
| **Zebra** | चेन को सिंक और वैलिडेट करता है, गॉसिप, JSON-RPC, हेल्थ एंडपॉइंट | हाँ |
| **Zallet** | फुल-नोड वॉलेट। इसमें Zaino लाइब्रेरी एम्बेड हैं। यह सीधे Zebra JSON-RPC से कनेक्ट होता है। यह स्टैंडअलोन Zaino कंटेनर को कॉल **नहीं** करता | हाँ |
| **Zaino** | स्टैंडअलोन इंडेक्सर। बाहरी लाइट क्लाइंट (light client) के लिए lightwalletd-संगत gRPC, साथ ही एक्सप्लोरर और फॉसेट (faucet) के लिए JSON-RPC प्रॉक्सी | नहीं — `--profile indexer` |

Z3 इमेज वर्ज़न को `docker-compose.yml` में पिन करता है। अगर आपको कोई दूसरा टैग चाहिए, तो `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` या `Z3_ZALLET_IMAGE` से उसे बदलें।

---

## यह zcashd से कैसे अलग है

| | zcashd | Z3 |
| --- | --- | --- |
| भाषा | C++ (Bitcoin फ़ोर्क) | Rust सेवाएँ, जिन्हें Docker Compose से ऑर्केस्ट्रेट किया जाता है |
| प्रोसेस मॉडल | एक बाइनरी: नोड + वॉलेट | नोड और वॉलेट के अलग कंटेनर |
| कंसेंसस | सेवानिवृत्त (EOS 18 जुलाई 2026) | Zebra (या कोई दूसरा संगत नोड) |
| वॉलेट | बिल्ट-इन `wallet.dat` | Zallet, age-एन्क्रिप्टेड datadir |
| लाइट क्लाइंट | आमतौर पर एक अलग lightwalletd | वैकल्पिक Zaino प्रोफ़ाइल |
| कॉन्फ़िग | `zcash.conf` | `config/<network>/` के अंदर हर नेटवर्क की अलग फ़ाइलें और साथ में Compose env फ़ाइलें |
| एक होस्ट पर कई नेटवर्क | पोर्ट टकराव की परेशान करने वाली समस्या | पूरा समर्थन: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

अगर आपके पास अब भी `zcashd` वॉलेट है, तो `wallet.dat` को Z3 वॉल्यूम में कॉपी न करें। इसके बजाय ZecHub की [माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) और Zallet के `migrate-zcashd-wallet` कमांड का उपयोग करें।

---

## नेटवर्क

Z3 में तीन स्वतंत्र Compose प्रोजेक्ट हैं। ये पोर्ट या वॉल्यूम साझा नहीं करते।

| नेटवर्क | प्रोजेक्ट का नाम | किस काम के लिए | पहला सिंक | असली फंड |
| --- | --- | --- | --- | --- |
| **मेननेट** | `z3-mainnet` | प्रोडक्शन | 24–72 घंटे | हाँ |
| **टेस्टनेट** | `z3-testnet` | सार्वजनिक टेस्ट नेटवर्क पर स्टेजिंग | 2–12 घंटे | नहीं (टेस्ट ZEC) |
| **रेगटेस्ट** | `z3-regtest` | स्थानीय अभ्यास: तुरंत बनने वाले ब्लॉक (block), कोई पीयर नहीं | कुछ सेकंड | नहीं |

नए ऑपरेटर को **रेगटेस्ट** से शुरुआत करनी चाहिए। वहाँ RPC और वॉलेट के काम की पुष्टि करने के बाद ही टेस्टनेट या मेननेट पर जाएँ।

---

## डिफ़ॉल्ट होस्ट पोर्ट

तीनों नेटवर्क एक ही मशीन पर साथ-साथ चल सकें, इसी हिसाब से इन्हें बनाया गया है। नीचे दी गई वैल्यू प्रकाशित डिफ़ॉल्ट हैं। हर वैल्यू को उससे जुड़े `Z3_*` env वेरिएबल से बदला जा सकता है। आधिकारिक सूची [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml) में है।

| सेवा | मेननेट | टेस्टनेट | रेगटेस्ट |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (प्रकाशित नहीं) |
| Zebra हेल्थ (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (इंडेक्सर प्रोफ़ाइल) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (इंडेक्सर प्रोफ़ाइल) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Compose नेटवर्क के अंदर सेवाएँ अपने नाम से पहचानी जाती हैं (`zebra`, `zaino`, `zallet`)।

---

## डेटा और बैकअप

| वॉल्यूम | इसमें क्या रहता है | बैकअप लें? |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra चेन स्टेट (मेननेट पर ~300 GB) | वैकल्पिक — फिर से सिंक किया जा सकता है |
| `z3-<network>-zallet` | एन्क्रिप्टेड वॉलेट डेटाबेस **और** उसे अनलॉक करने वाली age पहचान | **हाँ — केवल इसी वॉल्यूम का बैकअप लेना अनिवार्य है** |
| `z3-<network>-zaino` | इंडेक्सर स्टेट (केवल इंडेक्सर प्रोफ़ाइल के साथ) | वैकल्पिक — फिर से बनाया जा सकता है |
| `z3-<network>-cookie` | Zebra RPC कुकी | नहीं — अपने आप फिर से बन जाती है |

पहली बार शुरू करने से पहले चेन स्टेट को किसी दूसरी डिस्क पर रखने के लिए:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` स्टैक को रोक देता है और वॉल्यूम बनाए रखता है। `-v` जोड़ने पर वॉल्यूम डिलीट हो जाते हैं और पूरा री-सिंक करना पड़ता है। `--profile "*"` भी शामिल करें, ताकि प्रोफ़ाइल से चलने वाली सेवाएँ (इंडेक्सर, मॉनिटरिंग) सच में बंद हो जाएँ।

---

## शुरुआत

ज़रूरी चीज़ें: Docker Engine, Docker Compose v2.24.4+, Git। `openssl` केवल रेगटेस्ट के लिए ज़रूरी है।

### रेगटेस्ट (स्टैक देखने का सबसे तेज़ तरीका)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

टेस्ट कमांड के लिए [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) देखें।

### मेननेट (दो चरणों में बूट)

Zallet तभी काम का है जब Zebra का सिंक पूरा हो चुका हो। अगर Zallet को पहले शुरू किया जाए, तो `/ready` के true होने तक वह बार-बार रीस्टार्ट होता रहता है।

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

टेस्टनेट के लिए भी यही तरीका है, बस `.env.testnet` और `./scripts/check-zebra-readiness.sh 18080` का उपयोग करें।

`config/<network>/` के अंदर किए गए बदलाव लोकल रहते हैं और `git pull` के बाद भी बने रहते हैं।

### वैकल्पिक प्रोफ़ाइल

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Grafana के डिफ़ॉल्ट पोर्ट हैं: 3000 (मेननेट), 13000 (टेस्टनेट), 23000 (रेगटेस्ट)।

---

## ऑपरेटर के लिए नोट

* **पिन की गई इमेज।** Z3 चुपचाप `:latest` पर नहीं चला जाता। किसी पिन को रिव्यू किए गए बदलाव में अपडेट करें, या `Z3_<SERVICE>_IMAGE` सेट करें।
* **नॉन-रूट कंटेनर।** Linux क्षमताएँ हटा दी जाती हैं। जब तक Zebra तैयार न हो, हेल्थ चेक वॉलेट को रोके रखते हैं। रीस्टार्ट पॉलिसी डिफ़ॉल्ट रूप से चालू रहती है।
* **लॉग।** Z3 कोई लॉगिंग ड्राइवर पिन नहीं करता। Docker डेमन कॉन्फ़िग में साइज़ की सीमा सेट करें, वरना 24/7 चलने वाले नोड पर लॉग बिना रुके बढ़ते रहेंगे।
* **P2P।** मेननेट और टेस्टनेट Zebra का P2P पोर्ट प्रकाशित करते हैं। अगर नोड NAT के पीछे है, तो `ZEBRA_NETWORK__EXTERNAL_ADDR` को उस एड्रेस (address) पर सेट करें जिस पर पीयर को कनेक्ट करना चाहिए। रेगटेस्ट में कोई पीयर नहीं होता।
* **ARM पर Zaino।** अपस्ट्रीम Zaino इमेज केवल `linux/amd64` के लिए है। Apple Silicon पर यह इम्यूलेशन में चलती है, जब तक आप इसे सोर्स से बिल्ड न करें। Zebra और Zallet मल्टी-आर्किटेक्चर हैं।
* **साझा होस्ट।** डिफ़ॉल्ट रूप से CPU या मेमोरी की कोई सीमा तय नहीं होती। अगर मशीन केवल नोड के लिए नहीं है, तो ओवरराइड फ़ाइल में `deploy.resources.limits` जोड़ें।

प्रोडक्शन के लिए चेकलिस्ट और FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md)।

---

## Z3 किसे चलाना चाहिए

**उपयुक्त**

* एक्सचेंज, कस्टोडियन और माइनिंग पूल, जो `zcashd` को नोड और वॉलेट दोनों के रूप में इस्तेमाल करते थे
* वे ऑपरेटर जो सिंक किए गए Zebra के साथ समर्थित फुल-नोड वॉलेट RPC चाहते हैं
* वे डेवलपर (developer) जिन्हें मेननेट, टेस्टनेट और रेगटेस्ट साथ-साथ चाहिए
* कोई भी जो Zaino प्रोफ़ाइल के ज़रिए अपना निजी lightwalletd-संगत एंडपॉइंट चलाना चाहता है

**आमतौर पर गलत उपकरण (tools)**

* वे उपयोगकर्ता जिन्हें केवल ZEC भेजना और पाना है — ZODL / Zashi, Zingo या YWallet जैसा लाइट वॉलेट इस्तेमाल करें
* वे लोग जो केवल चेन को वैलिडेट करना चाहते हैं — सिर्फ़ Zebra (या Zakura) चलाएँ
* वे लोग जो केवल कॉम्पैक्ट ब्लॉक सर्व करना चाहते हैं — Zallet के बिना Zebra + Zaino या Zebra + lightwalletd चलाएँ

---

## संबंधित पेज

* [Zebra फुल नोड](/zcash-tech/zebra-full-node) — वह कंसेंसस नोड जिसे Z3 रैप करता है
* [Zaino](/zcash-tech/zaino) — वैकल्पिक इंडेक्सर प्रोफ़ाइल
* [फुल नोड](/zcash-tech/full-nodes) — Zebra, Zakura, और सेवानिवृत्त zcashd
* [लाइटवॉलेट नोड](/zcash-tech/lightwallet-nodes) — लाइट क्लाइंट जिनसे संवाद करते हैं
* [Zakura नोड](/zcash-tech/zakura-node) — एक वैकल्पिक फुल नोड; Z3 फ़िलहाल इसे शामिल नहीं करता
* [माइग्रेशन गाइड: zcashd से Zebrad/Zallet तक](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [डेवलपर संसाधन](/start-here/developer-resources)

---

## संसाधन

* [Z3 रिपॉज़िटरी](https://github.com/ZcashFoundation/z3)
* [Z3 कॉन्ट्रैक्ट (पोर्ट, वॉल्यूम, प्रोजेक्ट नाम)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebra बुक](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet बुक](https://zcash.github.io/zallet/)
* [Zcash सामुदायिक फ़ोरम — Z3 अपडेट](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 लॉन्चर](https://github.com/Jubrilabdulazeez/z3-launcher) — आधिकारिक Compose स्टैक पर चलने वाला सामुदायिक कंट्रोल प्लेन (ZecHub हैकाथॉन)

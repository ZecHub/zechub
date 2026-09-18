<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 Stack

**Z3 Stack** Zcash Foundation का पैकेज्ड नोड प्लेटफ़ॉर्म है: **Zebra** (पूर्ण नोड) + **Zallet** (पूर्ण-नोड वॉलेट), साथ में वैकल्पिक **Zaino** इंडेक्सर। यह स्टैंडअलोन `zcashd` प्रक्रिया का अभिप्रेत प्रतिस्थापन है, जिसने एक बाइनरी में consensus और वॉलेट को सम्मिलित किया था तथा 18 जुलाई 2026 को अपने जीवन-अंत तक पहुँच गया।

संदर्भ कार्यान्वयन [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) पर Docker Compose प्रोजेक्ट है।

---

## संक्षेप में

* Z3 **कोई नया consensus client नहीं है**। यह post-`zcashd` stack को एक साथ चलाने का तरीका है: Zebra चेन को सत्यापित करता है, Zallet keys रखता है और wallet RPC प्रदान करता है, तथा Zaino (वैकल्पिक) lightwalletd gRPC protocol का उपयोग करता है।
* `zcashd` ने नोड + वॉलेट को एक साथ रखा था। Z3 **इन भूमिकाओं को अलग करता है**। एक्सचेंज, mining pools और अन्य पूर्ण-नोड वॉलेट ऑपरेटर केवल Zebra पर जाने के बजाय इस संयोजन पर माइग्रेट करते हैं।
* एक होस्ट पर तीन पृथक Compose projects चल सकते हैं: **mainnet**, **testnet**, और **regtest**।
* Mainnet का पहला sync लगभग **24–72 घंटे** और करीब **300 GB** का होता है। Regtest कुछ सेकंड में तैयार हो जाता है और stack सीखने के लिए सही स्थान है।
* Zallet, Zaino की indexer libraries को सम्मिलित करता है और JSON-RPC के माध्यम से Zebra से बात करता है। स्टैंडअलोन Zaino सेवा की आवश्यकता केवल तब है, जब आप बाहरी वॉलेट्स के लिए lightwalletd-compatible endpoint चाहते हैं।
* Zallet **beta** में है। Breaking changes के कारण वॉलेट को हटाकर फिर से बनाना पड़ सकता है। इसे बड़ी रकमों के लिए तैयार custody software न मानें।

---

## Z3 क्यों है

Zcash के जीवन के अधिकांश हिस्से में, `zcashd` संदर्भ पूर्ण नोड और एकमात्र production पूर्ण-नोड वॉलेट, दोनों था। एक्सचेंजों, pools और custodians ने इसी डिज़ाइन के विरुद्ध integration किया था।

`zcashd` को retired कर दिया गया है। Consensus [Zebra](/zcash-tech/zebra-full-node) में चला गया है (और अब [Zakura](/zcash-tech/zakura-node) में भी)। एम्बेडेड वॉलेट [Zallet](https://github.com/zcash/zallet) में चला गया है। Light-wallet सेवा [lightwalletd](/zcash-tech/lightwallet-nodes) से [Zaino](/zcash-tech/zaino) की ओर जा रही है।

ये तीनों हिस्से अलग repositories, अलग release trains और अलग configs हैं। Z3 इन्हें जोड़ने वाला माध्यम है: pinned images, ऐसे health checks जो नोड sync होने तक वॉलेट को बंद रखते हैं, हर नेटवर्क के लिए ports और volumes, और एक दस्तावेज़ीकृत operator path।

नाम एक अनौपचारिक ecosystem shorthand है — Zebra, Zaino, Zallet — भले ही डिफ़ॉल्ट Compose file केवल Zebra और Zallet शुरू करती है। Zaino एक Compose profile है, आवश्यक तीसरी प्रक्रिया नहीं।

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
| **Zebra** | चेन sync और सत्यापित करता है, gossip, JSON-RPC, health endpoint | हाँ |
| **Zallet** | पूर्ण-नोड वॉलेट। Zaino libraries को सम्मिलित करता है। सीधे Zebra JSON-RPC से जुड़ता है। स्टैंडअलोन Zaino container को **कॉल नहीं करता** | हाँ |
| **Zaino** | स्टैंडअलोन इंडेक्सर। बाहरी light clients के लिए lightwalletd-compatible gRPC, साथ ही explorers और faucets के लिए JSON-RPC proxy | नहीं — `--profile indexer` |

Z3, `docker-compose.yml` में image versions pin करता है। अलग tag की आवश्यकता हो तो `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` या `Z3_ZALLET_IMAGE` से override करें।

---

## यह zcashd से कैसे अलग है

| | zcashd | Z3 |
| --- | --- | --- |
| भाषा | C++ (Bitcoin fork) | Rust सेवाएँ, Docker Compose द्वारा orchestrated |
| प्रक्रिया मॉडल | एक binary: नोड + वॉलेट | अलग नोड और वॉलेट containers |
| Consensus | Retired (EOS 18 जुलाई 2026) | Zebra (या कोई अन्य compatible नोड) |
| वॉलेट | अंतर्निर्मित `wallet.dat` | Zallet, age-encrypted datadir |
| Light clients | आमतौर पर अलग lightwalletd | वैकल्पिक Zaino profile |
| Config | `zcash.conf` | `config/<network>/` के अंतर्गत प्रति-नेटवर्क files, साथ में Compose env files |
| एक होस्ट पर नेटवर्क | मुश्किल port clashes | मूल सुविधा: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

यदि आपके पास अभी भी `zcashd` वॉलेट है, तो ZecHub की [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) और Zallet के `migrate-zcashd-wallet` command का उपयोग करें, न कि `wallet.dat` को Z3 volume में कॉपी करें।

---

## नेटवर्क्स

Z3 तीन स्वतंत्र Compose projects हैं। वे ports या volumes साझा नहीं करते।

| नेटवर्क | प्रोजेक्ट नाम | इसका उपयोग करें | पहला sync | वास्तविक धन |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | Production | 24–72 घंटे | हाँ |
| **testnet** | `z3-testnet` | सार्वजनिक test network पर staging | 2–12 घंटे | नहीं (परीक्षण ZEC) |
| **regtest** | `z3-regtest` | स्थानीय अभ्यास: तत्काल blocks, कोई peers नहीं | सेकंड | नहीं |

नए operators को **regtest** से शुरू करना चाहिए, RPC और वॉलेट flows की पुष्टि करनी चाहिए, फिर testnet या mainnet पर जाना चाहिए।

---

## डिफ़ॉल्ट होस्ट ports

तीनों नेटवर्क्स को एक ही मशीन पर सह-अस्तित्व के लिए बनाया गया है। नीचे के मान प्रकाशित defaults हैं; हर एक को संबंधित `Z3_*` env var के माध्यम से override किया जा सकता है। Canonical matrix है [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)।

| सेवा | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (प्रकाशित नहीं) |
| Zebra health (`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC (indexer profile) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC (indexer profile) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Compose नेटवर्क के भीतर, सेवाएँ नाम से resolve होती हैं (`zebra`, `zaino`, `zallet`)।

---

## डेटा और backups

| Volume | इसमें क्या है | इसका backup लें? |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra chain state (~300 GB mainnet) | वैकल्पिक — फिर से sync किया जा सकता है |
| `z3-<network>-zallet` | Encrypted wallet database **और** उसे unlock करने वाली age identity | **हाँ — यही एकमात्र volume है जिसका backup लिया जाना चाहिए** |
| `z3-<network>-zaino` | Indexer state (केवल indexer profile के साथ) | वैकल्पिक — फिर से बनाया जा सकता है |
| `z3-<network>-cookie` | Zebra RPC cookie | नहीं — फिर से जनरेट होती है |

पहली बार शुरू करने से पहले chain state को किसी दूसरी disk पर रखने के लिए:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` stack को रोकता है और volumes को बनाए रखता है। `-v` जोड़ने पर वे हट जाते हैं और पूर्ण re-sync आवश्यक हो जाता है। `--profile "*"` शामिल करें ताकि profile-gated सेवाएँ (indexer, monitoring) वास्तव में बंद हो जाएँ।

---

## शुरुआत करें

पूर्वापेक्षाएँ: Docker Engine, Docker Compose v2.24.4+, Git। `openssl` केवल regtest के लिए आवश्यक है।

### Regtest (stack देखने का सबसे तेज़ तरीका)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

परीक्षण commands के लिए [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) देखें।

### Mainnet (दो-चरण boot)

Zebra का sync पूरा होना आवश्यक है, तभी Zallet उपयोगी होगा। Zallet को जल्दी शुरू करने पर वह restart-loop में चला जाएगा, जब तक `/ready` true नहीं हो जाता।

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

Testnet के लिए भी यही flow है, `.env.testnet` और `./scripts/check-zebra-readiness.sh 18080` के साथ।

`config/<network>/` के अंतर्गत किए गए edits स्थानीय रहते हैं और `git pull` के बाद भी बने रहते हैं।

### वैकल्पिक profiles

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

डिफ़ॉल्ट Grafana ports हैं 3000 (mainnet), 13000 (testnet), 23000 (regtest)।

---

## Operator notes

* **Pinned images.** Z3 चुपचाप `:latest` पर float नहीं करता। Reviewed change में pin बढ़ाएँ, या `Z3_<SERVICE>_IMAGE` सेट करें।
* **Non-root containers.** Linux capabilities हटा दी जाती हैं। Health checks, Zebra तैयार होने तक वॉलेट को रोक कर रखते हैं। Restart policy डिफ़ॉल्ट रूप से चालू है।
* **Logs.** Z3 logging driver pin नहीं करता। Docker daemon config में size limits सेट करें, अन्यथा 24/7 नोड पर logs बिना सीमा बढ़ते रहेंगे।
* **P2P.** Mainnet और testnet, Zebra का P2P port प्रकाशित करते हैं। NAT के पीछे होने पर, `ZEBRA_NETWORK__EXTERNAL_ADDR` को उस address पर सेट करें जिस पर peers को dial करना चाहिए। Regtest में कोई peers नहीं होते।
* **ARM पर Zaino।** Upstream Zaino image केवल `linux/amd64` है। Apple Silicon पर source से build किए बिना यह emulation के तहत चलता है। Zebra और Zallet multi-arch हैं।
* **Shared hosts.** डिफ़ॉल्ट रूप से CPU या memory limits सेट नहीं हैं। यदि मशीन केवल नोड के लिए समर्पित नहीं है, तो override file में `deploy.resources.limits` जोड़ें।

Production-जैसी checklist और FAQ: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md)।

---

## Z3 किसे चलाना चाहिए

**उपयुक्त विकल्प**

* एक्सचेंज, custodians और mining pools जो `zcashd` को node-plus-wallet के रूप में उपयोग करते थे
* ऐसे operators जो synced Zebra के विरुद्ध समर्थित पूर्ण-नोड wallet RPC चाहते हैं
* ऐसे developers जिन्हें mainnet, testnet और regtest एक साथ चाहिए
* कोई भी जो Zaino profile के माध्यम से निजी lightwalletd-compatible endpoint स्थापित कर रहा हो

**आमतौर पर गलत उपकरण**

* अंतिम उपयोगकर्ता जिन्हें केवल ZEC भेजना और प्राप्त करना है — ZODL / Zashi, Zingo, या YWallet जैसे light wallet का उपयोग करें
* लोग जो केवल चेन को सत्यापित करना चाहते हैं — केवल Zebra (या Zakura) चलाएँ
* लोग जो केवल compact blocks प्रदान करना चाहते हैं — Zebra + Zaino, या Zebra + lightwalletd चलाएँ, Zallet के बिना

---

## संबंधित पृष्ठ

* [Zebra पूर्ण नोड](/zcash-tech/zebra-full-node) — consensus नोड जिसे Z3 wrap करता है
* [Zaino](/zcash-tech/zaino) — वैकल्पिक indexer profile
* [पूर्ण नोड्स](/zcash-tech/full-nodes) — Zebra, Zakura, और retired zcashd
* [Lightwallet नोड्स](/zcash-tech/lightwallet-nodes) — जिनसे light clients बात करते हैं
* [Zakura नोड](/zcash-tech/zakura-node) — वैकल्पिक पूर्ण नोड; आज Z3 में यही शामिल नहीं है
* [Migration Guide: zcashd से Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Developer Resources](/start-here/developer-resources)

---

## संसाधन

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 contract (ports, volumes, project names)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [The Zebra Book](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [The Zallet Book](https://zcash.github.io/zallet/)
* [Zcash Community Forum — Z3 updates](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — आधिकारिक Compose stack के ऊपर community control plane (ZecHub Hackathon)

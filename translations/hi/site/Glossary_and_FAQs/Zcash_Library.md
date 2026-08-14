# Zcash लाइब्रेरी

Zcash से संबंधित प्रमुख शब्दों, अवधारणाओं और संसाधनों की एक व्यापक शब्दावली।

### त्वरित नेविगेशन
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Term | Definition |
|------|-----------|
| Actions | प्रत्येक Spend और Output के लिए कई अलग-अलग proofs बनाने के बजाय, Orchard प्रोटोकॉल उन्हें एक ही Action में मिला देता है। |
| Addresses | Zcash में Shielded (Z/zaddr) और Transparent (T/taddr) addresses होते हैं। NU5 upgrade के बाद Z और T को बदलने के लिए Unified addresses (UA) को चरणबद्ध तरीके से अपनाया जा रहा है। |
| Arborist Call | Zcash प्रोटोकॉल और research development updates को कवर करने वाली द्वि-साप्ताहिक call। Zcash Community Forum और Discord पर होस्ट की जाती है। [बैठक नोट्स](https://github.com/ZcashCommunityGrants/arboretum-notes) / [फ़ोरम घोषणाएँ](https://forum.zcashcommunity.com) |
| Auto-shielding | उपयोगकर्ताओं (विशेष रूप से उनके wallets) को transparent address से नवीनतम shielded ZEC pool में funds अपने-आप स्थानांतरित करने में सक्षम बनाता है। |

## B

| Term | Definition |
|------|-----------|
| Benchmarking | Miners, Zcash mining के लिए उपयोग किए जाने वाले विभिन्न hardware की efficiency पर metrics जमा कर सकते हैं। [यहाँ देखें](https://zcashbenchmarks.info) |
| Block | Block, Zcash blockchain में एक record होता है जिसमें network पर भेजे गए transactions का एक set शामिल होता है। औसतन लगभग हर 75 सेकंड में blockchain में एक नया block जोड़ा जाता है। |
| Block Explorer | blockchain पर पिछले और वर्तमान सभी transactions को देखने के लिए एक online tool। [Zcash Block Explorer](https://zcashexplorer.app/) |
| Blogs | [ZODL Blog (पूर्व में Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation Blog](https://zfnd.org/blog/) / [ZecHub Blog](https://zechub.wiki/zechub-dao) |
| Blossom | Zcash के लिए तीसरा Major Network Upgrade। [अधिक जानकारी](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Term | Definition |
|------|-----------|
| Canopy | Zcash के लिए पाँचवाँ Major Network Upgrade। [अधिक जानकारी](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | किसी committer को एक छोटी string के साथ polynomial के प्रति commit करने की अनुमति देता है, जिसका उपयोग verifier committed polynomial के claimed evaluations की पुष्टि करने के लिए कर सकता है। Zcash प्रोटोकॉल में communication costs को कम करने के लिए उपयोगी। |
| Community | [आधिकारिक Zcash Community Forum](https://forum.zcashcommunity.com) / [Zcash Community Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | एक प्रस्तावित hybrid consensus design, जो proof-of-work block production को बनाए रखता है और उसके ऊपर proof-of-stake finality layer जोड़ता है, ताकि mining को छोड़े बिना blocks को अधिक मजबूत finality मिल सके। यह Trailing Finality Layer research से विकसित हुआ है और 2026 तक अभी भी testnet development में है, जिसे Shielded Labs द्वारा बनाया जा रहा है। |
| CrossPay | Zodl wallet में एक feature, जो आपको shielded ZEC खर्च करने देता है, जबकि प्राप्तकर्ता को उनकी पसंद के asset और chain में भुगतान मिलता है, जिसे centralized exchange के बजाय NEAR Intents के माध्यम से route किया जाता है। |
| Cypherpunk Zero | ECC, illustrator Stranger Wolf, Mighty Jaxx और चुनिंदा ecosystem partners के बीच एक Creative Universe और collaborative effort। [Cypherpunk Zero साइट](https://halo.electriccoin.co/?utm_source=ECC&utm_medium=Website&utm_campaign=None) / [Opensea कलेक्शन](https://opensea.io/collection/cypherpunk-zero) |

## D

| Term | Definition |
|------|-----------|
| DeFi | ZEC को DeFi के साथ integrate करने वाले projects: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [Near Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [ThorSwap](https://app.thorswap.finance/) |
| Deshielding | उस transaction को संदर्भित करता है जो zaddr (shielded address) से taddr (transparent address) पर भेजी जाती है। transaction की origin दिखाई नहीं देती, लेकिन funds एक सार्वजनिक रूप से दिखाई देने वाले value pool में प्रवेश करते हैं। |
| Developer Resources | [डेवलपर संसाधन](https://www.zcashcommunity.com/developers/) |
| Documentation | [आधिकारिक दस्तावेज़](https://zcash.readthedocs.io/en/latest/) |

## E

| Term | Definition |
|------|-----------|
| ECC | Electric Coin Company, वह team जिसने Zcash protocol को launch किया था; पहले इसे Zcash Company के नाम से जाना जाता था। जनवरी 2026 में Bootstrap board के साथ governance dispute के बाद इसकी पूरी engineering team ने इस्तीफा दे दिया, और आगे चलकर ZODL का गठन किया। |
| ECDSA | Elliptic Curve Digital Signature Algorithm एक cryptographically secure digital signature scheme है। ECDSA sign/verify algorithm elliptic curve point multiplication पर निर्भर करता है। |
| Education | Zcash को समझाने वाले learning-oriented videos [यहाँ](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | shielded addresses पर भेजे गए transactions के लिए एक अतिरिक्त field, जो भुगतान प्राप्त करने वाले recipient को दिखाई देती है। encrypted memo केवल sender और recipient को दिखाई देता है। |
| Equihash | memory-oriented proof-of-work mining algorithm, जिसका उपयोग Zcash पर किया जाता है। |
| Events | Zcash से संबंधित events का calendar [Luma](https://luma.com/zcash) और [Zcash Foundation](https://zfnd.org/zf-events/) पर देखा जा सकता है |
| Exchanges | [Zcash को support करने वाले exchanges की सूची](https://z.cash/exchanges/) |

## F

| Term | Definition |
|------|-----------|
| Fiat-Shamir | interactive proof of knowledge को लेकर उसके आधार पर digital signature बनाने की एक तकनीक। इस तरह, किसी तथ्य (जैसे किसी secret का ज्ञान) को underlying information प्रकट किए बिना सार्वजनिक रूप से सिद्ध किया जा सकता है। |
| Formal Verification | गणितीय रूप से यह सिद्ध करना कि कोई system ठीक उसी तरह व्यवहार करता है जैसा निर्दिष्ट किया गया है, केवल testing पर निर्भर रहने के बजाय। soundness bugs की अनुपस्थिति प्रदर्शित करने के लिए Ironwood Action circuit को zkSecurity और ZODL के contributors ने Lean theorem prover का उपयोग करके इसी तरीके से verify किया था। |
| Founders Reward | Founder reward कुल block reward का 20 प्रतिशत दर्शाता है और इसे प्रत्येक block के value से काटकर protocol development और growth को आगे बढ़ाने के लिए पारदर्शी रूप से वितरित किया जाता है। |
| Free2z | Zcash द्वारा संचालित anonymous content और private donations के लिए एक tool। [Free2z](https://free2z.com) |
| FROST | Flexible Round-Optimized Schnorr Threshold signature scheme। [Research Paper](https://eprint.iacr.org/2020/852) |

## G

| Term | Definition |
|------|-----------|
| Governance | ZIP process से आने वाले निर्णय Zcash specification में लिखे जाते हैं, साथ ही उस software में भी जो network चलाता है। जब network का अधिकांश हिस्सा upgrade अपना लेता है और consensus नहीं टूटता, तब changes on-chain ratify हो जाते हैं। [पूरा प्रोटोकॉल इतिहास](https://zfnd.org/protocol-governance/) |

## H

| Term | Definition |
|------|-----------|
| Halo | trusted setups की आवश्यकता के बिना circuit upgrades को सक्षम बनाता है, जिससे Zcash shielded protocol भविष्य के improvements और extensions के लिए अधिक agile बनता है। [तकनीकी व्याख्या](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | Hierarchical deterministic wallets एक seed से key pairs की एक श्रृंखला उत्पन्न करते हैं, जिससे सुविधा, manageability और उच्च-स्तरीय security मिलती है। |
| Heartwood | Zcash का चौथा Major Network Upgrade। [अधिक जानकारी](https://z.cash/upgrade/heartwood/) |

## I

| Term | Definition |
|------|-----------|
| Index | CoinDesk का ZCX Index, Zcash के लिए एक real-time, USD-equivalent spot rate दर्शाता है। [प्राइस इंडेक्स](https://www.coindesk.com/indices/zcx/) |
| Integrations | आप कई 3rd party providers के माध्यम से Zcash payments स्वीकार कर सकते हैं। [Payment Processors](https://z.cash/zcash-for-business/) |
| Interactive Proof System | एक abstract machine जो computation को दो पक्षों: एक Prover और एक Verifier के बीच messages के आदान-प्रदान के रूप में मॉडल करती है। |
| Investment | संस्थागत investors या family offices, जो Zcash में exposure लेना चाहते हैं, उनके लिए कई financial options उपलब्ध हैं। [पूरी सूची](https://z.cash/investors/) |
| Ironwood | network upgrade (NU6.3), जो 28 जुलाई 2026 को block 3,428,143 पर mainnet पर सक्रिय हुआ। इसने एक नया shielded pool पेश किया, जिसे Ironwood भी कहा जाता है, और Orchard pool को केवल spend-only बना दिया ताकि मौजूदा value turnstile के पार migrate हो सके। [अधिक जानकारी](/zcash-tech/ironwood) |

## J

| Term | Definition |
|------|-----------|
| JubJub | एक elliptic curve जिसे zk-SNARK circuits में कुशलतापूर्वक लागू करने के लिए डिज़ाइन किया गया है। |

## K

| Term | Definition |
|------|-----------|
| Keystone Wallet | एक air-gapped hardware wallet जिसमें native Zcash (Orchard shielded) support है, और cold signing के लिए ZODL के साथ compatible है। [Keystone](https://keyst.one) |

## L

| Term | Definition |
|------|-----------|
| Layer-1 | एक base network और उसके underlying infrastructure को संदर्भित करता है। Layer-1 blockchains किसी अन्य network की आवश्यकता के बिना transactions को validate और finalize कर सकती हैं। Zcash एक L1 blockchain है। |
| librustzcash | एक Rust workspace जिसमें Zcash के साथ काम करने के लिए सभी crates और dependencies शामिल हैं। [repo](https://github.com/zcash/librustzcash) |
| Lightwalletd | एक stateless server जो light clients को blockchain information प्रदान करता है। [Lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Term | Definition |
|------|-----------|
| Metrics | Network metrics [यहाँ](https://tokenterminal.com/explorer/projects/zcash/metrics/all) उपलब्ध हैं |
| Metadata | वह data जो उपयोगकर्ता के Zcash transaction के साथ उत्पन्न होता है। इसमें block height, transaction version या expiry height आदि शामिल हो सकते हैं। |
| Mobile SDK | एक lightweight SDK जो Android को Zcash से जोड़ता है, जिससे third-party Android apps shielded transactions भेज और प्राप्त कर सकते हैं। [Github](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | वह प्रक्रिया जिसमें प्रत्येक block के लिए, Zcash network के नोड जटिल गणितीय calculations करके self-adjusting difficulty के आधार पर solution खोजने के लिए प्रतिस्पर्धा करते हैं। [मार्गदर्शिका](https://z.cash/mining-zcash/) |
| Multisignature | एक ऐसा address जिसे funds खर्च करने के लिए कई private key signatures की आवश्यकता होती है। वर्तमान में multisig functionality केवल transparent addresses द्वारा समर्थित है। |

## N

| Term | Definition |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Shielded Labs का एक प्रस्ताव, जिसमें transaction fees के एक हिस्से को burn करने की बात है ताकि protocol का दीर्घकालिक security budget पूरी तरह issuance पर निर्भर न रहे। यह ZIP 234 में निर्दिष्ट है और 2026 में समीक्षा के अधीन है। |
| Nighthawk | Zcash के लिए एक mobile wallet। [वेबसाइट](https://nighthawkwallet.com) |
| Noir Wallet | Zcash के लिए एक browser extension wallet, जिसे Zcash Community Grants का समर्थन प्राप्त है। इसे shielded ZEC को QR codes और manual transfers पर निर्भर रहने के बजाय सीधे browser applications से जोड़ने के लिए बनाया गया है। [zknoir.com](https://www.zknoir.com/) |
| NU5 | Zcash के लिए छठा Major Network Upgrade, जिसने Orchard shielded pool और Unified Addresses को पेश किया। [अधिक जानकारी](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash के लिए सातवाँ Major Network Upgrade, जिसने Zcash Community Grants program और Shielded Labs को fund करने के लिए block subsidy को समायोजित किया। 2024 के अंत में सक्रिय हुआ। [अधिक जानकारी](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood के बाद अगला major network upgrade। संभावित features में Project Tachyon का scaling work, Zcash Shielded Assets, और Network Sustainability Mechanism शामिल हैं। |

## O

| Term | Definition |
|------|-----------|
| Oblivious Synchronization | Project Tachyon में विकासाधीन एक विधि, जो एक wallet को किसी अविश्वसनीय server से अपनी आवश्यक डेटा इस तरह अनुरोध करने देती है कि यह प्रकट न हो कि वह किन notes के बारे में पूछ रहा है। server आपके nullifiers कभी नहीं सीखता, क्योंकि protocol उन्हें ऐसे तरीके से विकसित करता है जिसे आपस में जोड़ा नहीं जा सकता। [विवरण](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard Shielded Pool | Zcash के लिए तीसरा shielded pool, और यह हमारे zk-SNARK technology stack के निरंतर विकास का प्रतिनिधित्व करता है। [पूरी जानकारी](https://electriccoin.co/blog/explaining-halo-2/) |
| Overwinter | Zcash के लिए पहला Network Upgrade। [अधिक जानकारी](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Term | Definition |
|------|-----------|
| Payments | कई अलग-अलग payment providers के माध्यम से रोज़मर्रा की खरीदारी के लिए Zcash का उपयोग करना संभव है। [Payment Apps](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | यह एक primitive है जिसमें data अपनी शुद्धता के proof के साथ चलता है, ताकि data को संयोजित करने पर proofs भी संयोजित हो जाएँ। Project Tachyon shielded protocol को PCD के आधार पर फिर से बनाता है, जिससे हर wallet chain को दोबारा scan करने के बजाय यह recursive proof साथ रख सकता है कि उसका अपना balance सही है। Zcash implementation [Ragu](https://github.com/tachyon-zcash/ragu) है, जो Halo का अनुसरण करता है और किसी trusted setup की आवश्यकता नहीं होती। |
| Peer-to-Peer Network | P2P networks decentralization की अवधारणा पर आधारित होते हैं। यह blockchain technology की foundational architecture है। |
| PIR (Private Information Retrieval) | ऐसी तकनीकें जो आपको server से कोई record इस तरह प्राप्त करने देती हैं कि server यह न जान सके कि आपने कौन-सा record माँगा। Zcash के लिए इस पर सक्रिय शोध चल रहा है, ताकि light wallets अपनी ज़रूरी जानकारी बिना यह उजागर किए प्राप्त कर सकें कि वे क्या खोज रहे हैं। |
| Podcast | [Radiolab (Zcash Ceremony)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Term | Definition |
|------|-----------|
| QR Code | एक machine-readable code जिसका उपयोग आसान scanning के लिए Zcash addresses को encode करने में किया जाता है। आधुनिक Zcash wallets में Unified Addresses (UAs) आमतौर पर QR codes के माध्यम से साझा किए जाते हैं। |
| Quantum Recoverability | [ZIP 2005](https://zips.z.cash/zip-2005) में निर्दिष्ट Ironwood notes का एक गुण, जो यह सुनिश्चित करता है कि यदि भविष्य में कोई quantum computer आज उसकी सुरक्षा करने वाली cryptography को तोड़ दे, तब भी coin का on-chain record पुनर्प्राप्त करने योग्य रहे। यह quantum resistance के बजाय एक recovery path है, और यह Ironwood notes पर लागू होता है, मौजूदा Sprout, Sapling या Orchard funds पर नहीं। |

## R

| Term | Definition |
|------|-----------|
| Recovery Phrase | wallet का backup लेने और restore करने के लिए उपयोग किए जाने वाले 12 या 24 letters और numbers का एक क्रम। Zcash में, यह phrase spending और viewing keys को पुनर्जीवित करता है, जिससे fund recovery और security के लिए यह अत्यंत महत्वपूर्ण बन जाता है। |

## S

| Term | Definition |
|------|-----------|
| Sapling | एक प्रमुख network upgrade जिसने shielded transactions के लिए महत्वपूर्ण efficiency improvements पेश किए और mobile adoption का मार्ग प्रशस्त किया। block 419200 पर सक्रिय हुआ। |
| Selective Disclosure | shielded address के owner को viewing keys या payment disclosures चुनिंदा रूप से third parties के साथ साझा करने की अनुमति देता है, जबकि बाकी सभी से data को private रखा जाता है। |
| Shielded Address | इसे zaddr भी कहा जाता है। z से शुरू होता है। sender, receiver, amount, और memo को zk-SNARKs का उपयोग करके छुपाता है। |
| Shielded Labs | Zcash protocol economics और consensus पर काम करने वाला एक स्वतंत्र organization। वर्तमान में Crosslink और Network Sustainability Mechanism का नेतृत्व करता है। [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | shielded addresses के बीच विशेष रूप से होने वाला transaction। blockchain पर पूरी तरह private। |
| Sol/s | प्रति सेकंड solutions - Equihash mining performance को मापता है। |
| Spending Key | वह private key जो shielded address से spending की अनुमति देती है (और balance तथा history देखने भी देती है)। |
| Sprout | Zcash का मूल shielded protocol version (2016 में launch हुआ)। |

## T

| Term | Definition |
|------|-----------|
| Tachyon | Zcash का scaling programme, जिसका लक्ष्य NU7 है। यह wallets को हर block को scan करने से हटाकर proof-carrying wallet state, oblivious synchronization, और prunable नोड state की ओर ले जाता है, जिसका उद्देश्य shielded throughput को प्रति सेकंड हज़ारों transactions तक पहुँचाना है। [प्रोजेक्ट साइट](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash (बिना मूल्य की test currency)। |
| Testnet | mainnet से पहले upgrades और features की testing के लिए एक अलग blockchain। |
| Trailing Finality Layer (TFL) | Zcash की proof-of-work chain के पीछे एक finality layer जोड़ने पर शोध, ताकि mining को बदले बिना हाल के blocks को final किया जा सके। Crosslink इसी से निकला design है। |
| Transaction | उपयोगकर्ताओं के बीच एक payment, जिसे network पर submit किया जाता है और अंततः किसी block में confirm किया जाता है। |
| Transaction Expiry | यदि transactions unconfirmed रहें, तो लगभग 25 मिनट (20 blocks) बाद expire हो जाती हैं; funds अपने-आप वापस लौट आते हैं। |
| Transaction Fee | default fee 0.0001 ZEC है। अधिक fees को प्राथमिकता मिलती है; बहुत कम fees देरी या expiry का कारण बन सकती हैं। |
| Transparent Address | इसे taddr भी कहा जाता है। t से शुरू होता है। पूरी तरह public (Bitcoin की तरह)। |
| Transparent Transaction | transparent addresses के बीच विशेष रूप से होने वाला transaction - सब कुछ सार्वजनिक रूप से दिखाई देता है। |
| Turnstile | यह accounting rule इस बात का हिसाब रखता है कि हर shielded pool में कितनी value प्रवेश करती है और उससे कितनी बाहर जाती है, ताकि कोई भी pool उसमें गई मात्रा से अधिक जारी न कर सके। Zcash के इतिहास में हर pool transition पर इसका उपयोग हुआ है, और वर्तमान में यह Orchard से Ironwood में migration की निगरानी कर रहा है। [अधिक जानकारी](/zcash-tech/the-turnstile) |

## U

| Term | Definition |
|------|-----------|
| Unified Address | आधुनिक address format (NU5 में प्रस्तुत) जो एक ही string में transparent और shielded दोनों payments के लिए काम करता है। |
| Upgrade Activation | वह विशिष्ट block height जहाँ कोई network upgrade (जैसे NU5, NU6) अपने-आप सक्रिय हो जाता है। |

## V

| Term | Definition |
|------|-----------|
| Viewing Key | एक private key जो आपको shielded address का balance और transaction history देखने देती है, बिना funds खर्च करने में सक्षम हुए। |

## W

| Term | Definition |
|------|-----------|
| Wallet | software या hardware जो private keys store करता है और आपको ZEC भेजने/प्राप्त करने देता है। सक्रिय wallets में ZODL (iOS/Android), Zingo! (mobile/desktop), Nighthawk (Android), YWallet, Zallet (आगामी), और Keystone (hardware) शामिल हैं। पूरी सूची के लिए, [Zcash Ecosystem Wallets](https://z.cash/ecosystem/?wallets=#tag-wallets) देखें |
| WebZjs | Zcash के लिए पहला JavaScript SDK, जिसे browser environments के लिए ChainSafe ने बनाया है। यही Zcash Shielded Wallet snap की आधारशिला है, जिसने MetaMask में shielded ZEC उपलब्ध कराया। |

## X

| Term | Definition |
|------|-----------|
| XZC | Zcash के लिए एक पुराना ticker symbol, जिसका उपयोग कुछ legacy exchanges पर किया जाता था। आधिकारिक ticker ZEC है। |

## Y

| Term | Definition |
|------|-----------|
| YWallet | एक privacy-focused Zcash wallet जो Orchard, Sapling और transparent addresses को support करता है, और तेज sync के लिए जाना जाता है। अब इसका रखरखाव नहीं किया जाता: इसके developer ने पुष्टि की है कि इसे Ironwood के लिए update नहीं किया जाएगा, इसलिए यह अब नेटवर्क का अनुसरण नहीं कर सकता। उसी developer द्वारा बनाया गया Zkool इसका maintained successor है। |

## Z

| Term | Definition |
|------|-----------|
| Zcash | zk-SNARKs का उपयोग करने वाली privacy-focused cryptocurrency। यह transparent (Bitcoin-style) और fully shielded payments के बीच bridge का काम करती है। |
| Zcash Foundation | स्वतंत्र non-profit जो Zcash ecosystem का समर्थन करती है, development को fund करती है, और privacy को बढ़ावा देती है। |
| Zcash Network | नोडों का peer-to-peer network जो transactions को validate करता है और blockchain को बनाए रखता है। |
| ZEC | Zcash के लिए आधिकारिक currency code (कुछ exchanges अभी भी XZC दिखाते हैं)। |
| Zerocash | वह academic protocol (2014) जिस पर Zcash आधारित है। |
| Zaino | अगली पीढ़ी का Zcash indexer जो lightwalletd की जगह ले रहा है, और जिसे Zcash Foundation ने बनाया है। यह light clients को तेज़ और अधिक private तरीके से sync करने में सक्षम बनाता है। यह Zcash Z3 infrastructure upgrade का हिस्सा है। |
| Zakura | जुलाई 2026 में जारी किया गया एक Zcash पूर्ण नोड implementation, जिसे Valar Group और Project Tachyon ने Zebra के fork के रूप में बनाया। इसका लक्ष्य throughput और sync speed है, जिसमें snapshot bootstrapping और card-network scale, लगभग 50,000 transactions per second, का घोषित उद्देश्य शामिल है। [zakura.com](https://zakura.com) |
| Zallet | वह wallet component जिसने zcashd के retire होने पर उसके wallet functions संभाल लिए; इसे Zaino पर Zcash Z3 infrastructure work के हिस्से के रूप में बनाया गया है। |
| Zebra | Zcash Foundation का Rust-based पूर्ण नोड implementation (zcashd का alternative)। यह production-ready है और active maintenance में है। [GitHub](https://github.com/ZcashFoundation/zebra) |
| zcashd | मूल Zcash पूर्ण नोड, जिसे Bitcoin Core से fork किया गया था। लंबी deprecation प्रक्रिया के बाद जुलाई 2026 में इसे retire कर दिया गया, और इसकी भूमिकाएँ consensus के लिए Zebra तथा wallet functions के लिए Zallet के बीच बाँट दी गईं। |
| ZIP | Zcash Improvement Proposal - community governance process जिसका उपयोग protocol changes प्रस्तावित करने और ratify करने के लिए किया जाता है। [ZIP रिपॉज़िटरी](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab। यह स्वतंत्र organization है जिसकी स्थापना 2026 की शुरुआत में Josh Swihart और पूर्व Electric Coin Company engineering team ने Bootstrap के साथ governance dispute के बाद इस्तीफा देने पर की थी। इसने मार्च 2026 में seed funding में $25 million से अधिक जुटाए और Zodl wallet का रखरखाव करता है, जिसका नाम फरवरी 2026 में Zashi से बदलकर रखा गया था। [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — वही cryptography जो Zcash shielded transactions को शक्ति देती है। किसी कथन (जैसे, valid spend) को बिना कोई secret information प्रकट किए सिद्ध करने की अनुमति देती है। |
| ZSA (Zcash Shielded Assets) | User-issued tokens जो Zcash की shielded privacy को inherit करते हैं, जिससे ZEC के अलावा अन्य assets भी network पर private तरीके से move कर सकते हैं। इसका specification [ZIP 226](https://zips.z.cash/zip-0226) में दिया गया है और यह NU7 के लिए एक candidate feature है। |

---

**अंतिम अद्यतन:** जुलाई 2026
**योगदान करना चाहते हैं?** [GitHub पर इस पेज को संपादित करें](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)

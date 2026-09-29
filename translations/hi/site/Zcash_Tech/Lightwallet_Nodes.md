<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash लाइटवॉलेट नोड

## संक्षेप में

* अधिकांश लोग Zcash का उपयोग लाइट वॉलेट के माध्यम से करते हैं, जो पूरी blockchain डाउनलोड नहीं करता। इसके बजाय, यह ऐसे सर्वर से बात करता है जिसने वह काम पहले ही कर लिया होता है।
* आज लाइट वॉलेट को दो सॉफ़्टवेयर सेवाएँ प्रदान करती हैं: **lightwalletd**, Go में लिखी गई मूल सेवा, और **Zaino**, Rust में लिखा गया एक नया indexer।
* आपकी कुंजियाँ कभी भी आपके डिवाइस से बाहर नहीं जातीं, और सर्वर आपके धन को खर्च नहीं कर सकता या पूरी तरह shielded लेनदेनों के भीतर की राशियाँ और memos नहीं पढ़ सकता।
* सर्वर आपके IP पते और आपकी गतिविधि के समय के बारे में जानने की स्थिति में होता है — shielded लेनदेन blockchain पर होने वाली गतिविधि की सुरक्षा करते हैं, सर्वर से आपके कनेक्शन की नहीं।
* Tor IP पहचानकर्ता हटा देता है; यह `zcash_client_backend` पर बने वॉलेट में उपलब्ध है, और ZODL में यह Advanced Settings का एक विकल्प है।
* आप बदल सकते हैं कि आपका वॉलेट किस सर्वर का उपयोग करता है, या अपना स्वयं का सर्वर चला सकते हैं — lightwalletd और Zaino दोनों open source हैं।

## मुख्य व्याख्या

अधिकांश लोग Zcash का उपयोग लाइट वॉलेट के माध्यम से करते हैं, जो पूरी blockchain डाउनलोड नहीं करता। इसके बजाय, यह ऐसे सर्वर से बात करता है जिसने वह काम पहले ही कर लिया होता है। यह पृष्ठ बताता है कि वे सर्वर क्या हैं, वे आपके बारे में क्या देख सकते हैं और क्या नहीं, अपने कनेक्शन को Tor के माध्यम से कैसे route करें, और आपका वॉलेट जिस सर्वर का उपयोग करता है उसे कैसे बदलें।

आज लाइट वॉलेट को दो सॉफ़्टवेयर सेवाएँ प्रदान करती हैं। **lightwalletd** मूल सेवा है, जिसे Go में लिखा गया है। **Zaino** Rust में लिखा गया नया indexer है, जिसे zcashd deprecation कार्य के हिस्से के रूप में बनाया गया है।

### लाइट वॉलेट सर्वर क्या करता है

एक लाइट वॉलेट सर्वर आपके वॉलेट और Zcash blockchain के बीच स्थित होता है और उसे chain का bandwidth-कुशल दृश्य देता है। यह आपके लिए तीन काम करता है।

यह compact blocks प्रदान करता है। पूरे blocks के बजाय, यह एक compact रूप भेजता है जिसमें केवल उतनी जानकारी होती है जितनी वॉलेट को अपने shielded पते पर भुगतान पहचानने, अपने notes के खर्च को पहचानने और अपने witnesses को अपडेट करने के लिए चाहिए।

यह आपके लेनदेन relay करता है। जब आप भेजते हैं, तो आपका वॉलेट तैयार लेनदेन सर्वर को देता है, जो उसे नेटवर्क पर broadcast करता है।

यह chain queries का उत्तर देता है, जैसे वर्तमान height और आपके वॉलेट को आवश्यक fee जानकारी।

आपका वॉलेट फिर भी निजी काम स्थानीय रूप से करता है। यह आपकी कुंजियाँ रखता है, आपके notes खोजने के लिए blocks को trial-decrypt करता है, और आपके डिवाइस पर लेनदेन बनाता और sign करता है।

### सर्वर क्या देख सकता है और क्या नहीं

यह वह हिस्सा है जिसे समझने में आसानी से गलती हो सकती है। आपकी कुंजियाँ कभी भी आपके डिवाइस से बाहर नहीं जातीं, लेकिन इसका अर्थ यह नहीं कि सर्वर आपके बारे में कुछ भी नहीं जानता।

यहाँ संदर्भ [Zcash wallet app threat model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) है, जिसे यदि आप इसकी परवाह करते हैं तो पूरा पढ़ना उपयोगी है। यह कई प्रकार के adversary बताता है। इस पृष्ठ के लिए महत्वपूर्ण adversary वह है जो आपके वॉलेट और इंटरनेट के बीच, तथा सर्वर और इंटरनेट के बीच traffic देख सकता है। सर्वर चलाने वाला व्यक्ति स्वाभाविक रूप से उस स्थिति के एक हिस्से में होता है, क्योंकि आपका वॉलेट उससे सीधे जुड़ता है।

पहले यह समझें कि क्या सुरक्षित है। मॉडल के हर adversary के विरुद्ध, उस adversary के विरुद्ध भी जिसने सर्वर से समझौता कर लिया हो, वह "can't learn any of the user's cryptographic key material (spending keys, viewing keys, seed phrase, etc.)", आपके धन की चोरी नहीं कर सकता, और आपको ऐसा धन भेजने के लिए बाध्य नहीं कर सकता जिसे भेजने का आपका इरादा न हो। पूरी तरह shielded लेनदेनों के भीतर की राशियाँ और memos encrypted रहते हैं।

फिर वह है जो सुरक्षित नहीं है। threat model इन्हें traffic-observing adversary के विरुद्ध ज्ञात कमजोरियों के रूप में सूचीबद्ध करता है:

| कमजोरी | कैसे |
|:--|:--|
| यह बताना कि आप कौन हैं | "The adversary knows the user's IP address, which could lead them to the user's real identity" |
| यह बताना कि आप मोटे तौर पर कहाँ हैं | आपके IP को "in a geolocation database to approximate their location" खोजकर |
| यह बताना कि आपने shielded लेनदेन किया या प्राप्त किया, और कब | भेजने में "uses more bandwidth, which is visible even though the connection is encrypted"। मॉडल बताता है कि भेजने और प्राप्त करने की क्रिया स्वयं सर्वर को दिखाई देती है |
| समय के साथ आपके किए गए लेनदेनों की संख्या गिनना | वही bandwidth patterns, जो लंबी अवधि में देखे जाते हैं |
| बार-बार होने वाले भुगतान patterns पहचानना | गतिविधि होने का समय देखकर |
| यह पता लगाना कि कोई पता आपका है या नहीं | ऐसा adversary जो पहले से किसी पते को जानता है, "could send funds to that address and watch to see if there are bandwidth spikes" जब आपका वॉलेट उसे प्राप्त करता है |

मॉडल यह भी बताता है कि सामान्य स्थिति "a trust relationship between the user and the lightwalletd server operator" मानती है।

इसलिए ईमानदार सार यह है। लाइट वॉलेट सर्वर आपका धन खर्च नहीं कर सकता, और वह आपके shielded लेनदेनों की राशियाँ या memos नहीं पढ़ सकता। वह जिस जानकारी को जानने की स्थिति में है, वह आपका IP पता और आपकी गतिविधि का समय है, और ये दोनों मिलकर किसी व्यक्ति के बारे में बहुत कुछ बता सकते हैं। shielded लेनदेन blockchain पर होने वाली गतिविधि की सुरक्षा करते हैं। वे अपने आप में सर्वर से आपके कनेक्शन को नहीं छिपाते।

## दृश्य / उपमा

एक सार्वजनिक पुस्तकालय की कल्पना करें जिसमें अब तक छपा हर समाचारपत्र रखा है। एक पूर्ण नोड वह पाठक है जो पूरा archive घर ले जाता है। एक लाइट वॉलेट वह पाठक है जो इसके बजाय librarian से दैनिक सार माँगता है — एक पतली शीट जिसमें केवल इतनी जानकारी हो कि पता चल सके कि कुछ उसके संबंध में है या नहीं।

सार सीलबंद है: librarian इसे इस तरह तैयार करता है कि वह यह नहीं पढ़ सकता कि कौन-सी चीज़ें आपके लिए महत्वपूर्ण हैं, और आप इसे अपनी कुंजी से घर पर खोलते हैं। वही compact block है, और इसे खोलना आपके डिवाइस पर trial-decryption है।

लेकिन librarian फिर भी देखता है कि कौन-सा पाठक आया, किस समय आया, और वह कितना मोटा bundle लेकर गया। वह IP पता और समय है — desk से दिखाई देने वाली जानकारी, चाहे लिफाफा कितना भी अच्छी तरह सीलबंद हो। Tor एक अनाम courier भेजने के समान है: librarian वही bundle देता है, लेकिन अब नहीं जानता कि वह किसके घर जा रहा है।

## विस्तृत जानकारी

### Tor के माध्यम से routing

Tor आपके IP पते और आपके वॉलेट traffic के बीच का संबंध तोड़ता है, जिससे ऊपर की तालिका में सबसे मजबूत पहचानकर्ता हट जाता है।

कई Zcash वॉलेट जिन Rust libraries पर बने हैं उनमें यह समर्थन उपलब्ध है। zcash_client_backend में [Arti](https://tpo.pages.torproject.net/core/arti/) पर बना Tor module शामिल है, जो Tor का Rust implementation है; इसलिए एक वॉलेट अलग Tor client शामिल किए बिना sync, transaction broadcast और price lookups को Tor के माध्यम से route कर सकता है।

Zaino developers भी threat model का सीधे उल्लेख करते हुए यही तर्क देते हैं: "a need to use anonymous transport protocols (such as Nym or Tor) to obfuscate clients' identities from Zcash's indexing servers" है।

**ZODL** में Tor, Advanced Settings का एक विकल्प है। वॉलेट के release notes उपयोगकर्ताओं को manual connection mode के साथ "plus enabling Tor in Advanced Settings" की ओर निर्देशित करते हैं यदि वे "prefer to reduce metadata exposure", और ऐप वॉलेट restore करने से पहले Tor चालू करने की पेशकश करता है — यही वह क्षण है जब नया IP अन्यथा पूरे वॉलेट इतिहास से जुड़ सकता है।

दो चेतावनियाँ। Tor सर्वर से आपका IP छिपाता है, लेकिन आपके द्वारा किए जाने वाले requests से सर्वर जो जानता है उसे नहीं बदलता। और onion routing latency बढ़ाता है, इसलिए syncing में अधिक समय लगता है। अपना सर्वर चलाने से trust का प्रश्न अलग तरीके से समाप्त हो जाता है, क्योंकि तब operator आप स्वयं हैं।

### Zaino, Rust indexer

[Zaino](/zcash-tech/zaino), Zingo टीम द्वारा Rust में लिखा गया एक indexer है, जिसे zcashd deprecation कार्य के हिस्से के रूप में lightwalletd का स्थान लेने के लिए बनाया गया है। यह "either a Zebra or Zcashd full validator" द्वारा रखे गए chain data को पढ़ते हुए light clients, full clients और block explorers को सेवा देता है।

यह सक्रिय विकास में है, जिसका संस्करण 0.8.0 अगस्त 2026 में जारी हुआ था। जहाँ संभव हो, इसका लक्ष्य lightwalletd के साथ backward compatible रहना है, ताकि वॉलेट बिना फिर से लिखे इसकी ओर निर्देशित हो सकें।

Zaino का architecture diagrams सहित अपना पृष्ठ है, इसलिए यह पृष्ठ केवल लाइट वॉलेट सर्वर के रूप में इसकी भूमिका को कवर करता है।

### अपना स्वयं का चलाना

सबसे मजबूत विकल्प स्वयं अपना operator बनना है, जो trust के प्रश्न को पूरी तरह समाप्त कर देता है। दोनों सर्वर open source हैं: Go में [lightwalletd](https://github.com/zcash/lightwalletd) और Rust में [Zaino](https://github.com/zingolabs/zaino)। दोनों एक full validator से पढ़ते हैं, इसलिए आपको [Zebra](/zcash-tech/zebra-full-node) भी चाहिए होगा।

## व्यावहारिक प्रभाव

### सर्वर सूची

[hosh.zec.rocks](https://hosh.zec.rocks/zec) dashboard सार्वजनिक सर्वरों और उनकी स्थिति को track करता है, और वास्तव में कौन-से सर्वर चालू हैं यह जाँचने का स्थान है। [status.zec.rocks](https://status.zec.rocks/) सेवा की स्थिति दिखाता है।

लिखे जाने के समय उस dashboard पर सूचीबद्ध सर्वर:

| सर्वर | टिप्पणियाँ |
|:--|:--|
| zec.rocks:443 | इसके साथ क्षेत्रीय endpoints na.zec.rocks, eu.zec.rocks, ap.zec.rocks और sa.zec.rocks पर सूचीबद्ध हैं |
| zec-node.cakewallet.com:443 | Cake Wallet के domain पर |
| zec.0xrpc.io:443 | 0xRPC द्वारा संचालित, जो कई chains के लिए निःशुल्क सार्वजनिक endpoints प्रदान करता है और क्षमता लागत पूरी करने के लिए donations माँगता है |
| zaino.unsafe.zec.rocks:443 | एक Zaino instance। hostname पर ध्यान दें, इसे experimental मानें |
| testnet.zec.rocks:443 | Testnet, जिसमें zaino.testnet.unsafe.zec.rocks पर Zaino testnet instance सूचीबद्ध है |

इस सूची पर भरोसा करने के बजाय dashboard जाँचें। operators आते-जाते रहते हैं, और इस तरह का पृष्ठ पुराना हो जाता है।

### अपने वॉलेट में सर्वर बदलना

यदि आप उस operator को चुनना चाहते हैं जिस पर आपको भरोसा है, गतिविधि को अलग-अलग operators में बाँटना चाहते हैं, या अपने सर्वर की ओर निर्देशित करना चाहते हैं, तो यह करना उपयोगी है।

नीचे दिए गए menu paths इस पृष्ठ के अपडेट होने पर सही थे, लेकिन वॉलेट interfaces बदलते रहते हैं, इसलिए इन्हें सटीक मार्ग के बजाय संकेत मानें। Advanced Settings या server विकल्प खोजें।

#### ZODL

पहले Zashi था। ऊपर दाएँ कोने में cog, फिर Advanced Settings। Tor भी इसी screen में है। यदि server के पुराना होने के कारण sync विफल होती है, तो ZODL Switch server shortcut भी प्रदान करता है।

#### Ywallet

ऊपर दाएँ कोने में cog, फिर Zcash tab।

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

ऊपर बाएँ कोने में hamburger menu, फिर Settings, फिर नीचे scroll करें।

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

ऊपर बाएँ कोने में hamburger menu, फिर Settings, फिर Advanced।

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

वे screenshots मार्च 2025 में लिए गए थे, और तब से apps ने releases जारी किए हैं, इसलिए buttons स्थान बदल चुके हो सकते हैं।

## सामान्य गलतियाँ

**यह सोचना कि सर्वर आपके लेनदेन पढ़ सकता है**। वह नहीं पढ़ सकता। आपकी कुंजियाँ आपके डिवाइस पर रहती हैं, और पूरी तरह shielded लेनदेनों के भीतर की राशियाँ और memos encrypted रहते हैं — उस adversary के विरुद्ध भी जिसने सर्वर से समझौता कर लिया हो।

**"shielded" को "अनाम कनेक्शन" समझना**। shielded लेनदेन blockchain पर होने वाली गतिविधि की सुरक्षा करते हैं। आपका IP पता और आपकी गतिविधि का समय एक अलग layer है, और सर्वर ठीक उसी layer को देखता है।

**यह मान लेना कि Tor हर निशान मिटा देता है**। Tor सर्वर से आपका IP छिपाता है, लेकिन आपके requests से सर्वर जो जानता है उसे नहीं बदलता, और syncing में latency जोड़ता है।

**wiki पृष्ठ की सर्वर सूची पर भरोसा करना**। operators आते-जाते रहते हैं। अपने वॉलेट को किसी भी सर्वर की ओर निर्देशित करने से पहले वास्तव में क्या चल रहा है, यह देखने के लिए [hosh.zec.rocks](https://hosh.zec.rocks/zec) जाँचें।

## सारांश

लाइट वॉलेट आपको disk space के बिना shielded pool देते हैं, जो एक अच्छा समझौता है। बस यह स्पष्ट रखें कि आप क्या छोड़ रहे हैं। सर्वर आपका धन नहीं ले सकता या आपकी shielded राशियाँ नहीं पढ़ सकता, लेकिन वह आपका IP पता और आपके लेनदेन का समय देखने की स्थिति में है। Tor के माध्यम से route करें, अपना operator सोच-समझकर चुनें, या अपना स्वयं का सर्वर चलाएँ।

## संबंधित पृष्ठ

- [आपका Zcash भुगतान कौन देख सकता है](/start-here/who-can-see-your-zcash-payment) — उसी प्रश्न का शुरुआती स्तर का दृष्टिकोण।
- [एक Block Explorer क्या देख सकता है](/zcash-tech/what-a-block-explorer-can-see) — server के बजाय on-chain दिखाई देने वाली जानकारी।
- [Zaino](/zcash-tech/zaino) — architecture diagrams और Rust indexer की व्यापक भूमिका।
- [Zebra पूर्ण नोड](/zcash-tech/zebra-full-node) — वह validator जिससे लाइट वॉलेट सर्वर पढ़ता है।
- [Zcash वॉलेट syncing](/zcash-tech/zcash-wallet-syncing) — सर्वर द्वारा भेजे गए compact blocks आपके वॉलेट में कैसे process होते हैं।

**अंतिम अपडेट:** अगस्त 2026

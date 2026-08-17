<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>


# Zcash Lightwallet नोड

## परिचय

ज़्यादातर लोग Zcash का उपयोग एक light wallet के माध्यम से करते हैं, जो पूरी blockchain डाउनलोड नहीं करता। इसके बजाय, यह ऐसे server से बात करता है जो यह काम पहले ही कर चुका होता है। यह पृष्ठ बताता है कि वे server क्या हैं, वे आपके बारे में क्या देख सकते हैं और क्या नहीं, अपनी connection को Tor के ऊपर कैसे route करें, और आपका wallet किस server का उपयोग करता है उसे कैसे बदलें।

आज light wallet की सेवा के लिए दो software उपयोग में हैं। **lightwalletd** मूल service है, जो Go में लिखी गई है। **Zaino** Rust में लिखा गया एक नया indexer है, जिसे zcashd deprecation कार्य के हिस्से के रूप में बनाया गया है।

## एक light wallet server क्या करता है

एक light wallet server आपके wallet और Zcash blockchain के बीच बैठता है और उसे chain का bandwidth-efficient दृश्य देता है। यह आपके लिए तीन काम करता है।

यह compact block प्रदान करता है। पूरे block भेजने के बजाय, यह एक compact रूप भेजता है जिसमें सिर्फ वही होता है जिसकी wallet को ज़रूरत होती है ताकि वह अपने shielded address पर payment का पता लगा सके, अपने notes के spend का पता लगा सके, और अपने witness अपडेट कर सके।

यह आपके transaction relay करता है। जब आप भेजते हैं, आपका wallet तैयार transaction server को देता है, जो उसे network पर broadcast करता है।

यह chain query का उत्तर देता है, जैसे current height और fee information जिसकी आपके wallet को ज़रूरत होती है।

आपका wallet फिर भी private काम locally करता है। यह आपकी keys रखता है, आपके notes खोजने के लिए blocks को trial-decrypt करता है, और आपके device पर transactions बनाता और sign करता है।

## server क्या देख सकता है और क्या नहीं

यह वह हिस्सा है जिसे गलत समझना आसान है। आपकी keys कभी भी आपके device से बाहर नहीं जातीं, लेकिन इसका मतलब यह नहीं है कि server आपके बारे में कुछ भी नहीं सीखता।

यहाँ संदर्भ [Zcash wallet app threat model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) है, जिसे यदि आप इस विषय की परवाह करते हैं तो पूरा पढ़ना उचित है। यह कई प्रकार के adversary को बताता है। इस पृष्ठ के लिए महत्वपूर्ण adversary वह है जो आपके wallet और internet के बीच, और server और internet के बीच के traffic को देख सकता है। जो कोई भी server चलाता है, वह स्वाभाविक रूप से आंशिक रूप से इसी स्थिति में होता है, क्योंकि आपका wallet सीधे उसी से जुड़ता है।

पहले देखते हैं कि क्या सुरक्षित है। model में हर adversary के विरुद्ध, यहाँ तक कि उस adversary के विरुद्ध भी जिसने server को compromise कर लिया हो, वह "can't learn any of the user's cryptographic key material (spending keys, viewing keys, seed phrase, etc.)", आपके funds चोरी नहीं कर सकता, और आपको ऐसे funds भेजने के लिए मजबूर नहीं कर सकता जिन्हें भेजने का आपका इरादा नहीं था। पूरी तरह shielded transactions के अंदर की amounts और memos encrypted रहते हैं।

अब देखते हैं कि क्या सुरक्षित नहीं है। threat model इन्हें traffic-observing adversary के विरुद्ध ज्ञात कमजोरियों के रूप में सूचीबद्ध करता है:

| कमजोरी | कैसे |
|:--|:--|
| यह पता लगाना कि आप कौन हैं | "The adversary knows the user's IP address, which could lead them to the user's real identity" |
| मोटे तौर पर यह पता लगाना कि आप कहाँ हैं | आपके IP को "in a geolocation database to approximate their location" देखना |
| यह पता लगाना कि आपने shielded transaction भेजा या प्राप्त किया, और कब किया | भेजने में "uses more bandwidth, which is visible even though the connection is encrypted". model यह भी नोट करता है कि भेजने और प्राप्त करने की क्रिया स्वयं server को दिखाई देती है |
| समय के साथ यह गिनना कि आपने कितने transactions किए हैं | वही bandwidth pattern, लंबे समय तक observe किए जाने पर |
| बार-बार होने वाले payment pattern पहचानना | यह देखना कि गतिविधि कब होती है |
| यह पता लगाना कि कोई address आपका है या नहीं | ऐसा adversary जिसे पहले से कोई address पता हो, वह "could send funds to that address and watch to see if there are bandwidth spikes" जब आपका wallet उसे fetch करता है |

model यह भी नोट करता है कि सामान्य स्थिति में "a trust relationship between the user and the lightwalletd server operator" माना जाता है।

तो ईमानदार सार यह है। एक light wallet server आपका पैसा खर्च नहीं कर सकता, और न ही यह आपके shielded transactions की amounts या memos पढ़ सकता है। लेकिन यह आपके IP address और आपकी activity के timing को सीखने की अच्छी स्थिति में होता है, और ये दोनों मिलकर किसी व्यक्ति के बारे में बहुत कुछ बता सकते हैं। Shielded transactions यह सुरक्षित करते हैं कि blockchain पर क्या जाता है। वे अपने आप में server के साथ आपकी connection को नहीं छिपाते।

## Tor के ऊपर routing

Tor आपके IP address और आपके wallet traffic के बीच की कड़ी तोड़ देता है, जिससे ऊपर की तालिका में सबसे मजबूत identifier हट जाता है।

उन Rust libraries में support मौजूद है जिन पर कई Zcash wallet बनाए जाते हैं। zcash_client_backend में [Arti](https://tpo.pages.torproject.net/core/arti/) पर आधारित एक Tor module शामिल है, जो Tor का Rust implementation है, ताकि wallet बिना अलग Tor client भेजे sync, transaction broadcast और price lookup को Tor के माध्यम से route कर सके।

Zaino developers भी यही तर्क देते हैं, और threat model का सीधे हवाला देते हैं: वहाँ "a need to use anonymous transport protocols (such as Nym or Tor) to obfuscate clients' identities from Zcash's indexing servers" है।

**ZODL** में, Tor Advanced Settings में एक setting है। wallet की release notes उपयोगकर्ताओं को manual connection mode "plus enabling Tor in Advanced Settings" की ओर निर्देशित करती हैं यदि वे "prefer to reduce metadata exposure", और app wallet restore करने से पहले Tor चालू करने का विकल्प देती है, जो वह क्षण होता है जब अन्यथा एक नया IP पूरे wallet history से जुड़ सकता है।

दो caveat हैं। Tor server से आपका IP छिपा देता है, लेकिन यह नहीं बदलता कि server आपकी requests से क्या सीखता है। और onion routing latency बढ़ाती है, इसलिए sync में अधिक समय लगता है। अपना खुद का server चलाना trust के प्रश्न को अलग तरीके से हल करता है, क्योंकि तब operator आप स्वयं होते हैं।

## Zaino, Rust indexer

[Zaino](/site/Zcash_Tech/Zaino) Zingo team द्वारा Rust में लिखा गया एक indexer है, जिसे zcashd deprecation कार्य के हिस्से के रूप में lightwalletd को replace करने के लिए बनाया गया है। यह light clients, full clients और block explorers को सेवा देता है, और chain data को पढ़ता है जो "either a Zebra or Zcashd full validator" में रखा होता है।

यह सक्रिय विकास के अधीन है, और version 0.7.0 अगस्त 2026 में जारी किया गया था। इसका लक्ष्य जहाँ संभव हो lightwalletd के साथ backward compatible रहना है, ताकि wallets बिना दोबारा लिखे इसकी ओर point कर सकें।

Zaino का architecture diagram के साथ अपना अलग पृष्ठ है, इसलिए यह पृष्ठ केवल light wallet server के रूप में इसकी भूमिका को कवर करता है।

## server सूची

[hosh.zec.rocks](https://hosh.zec.rocks/zec) dashboard public server और उनकी health को track करता है, और वास्तव में क्या चालू है यह जाँचने की जगह यही है। [status.zec.rocks](https://status.zec.rocks/) service status दिखाता है।

इस लेखन के समय उस dashboard पर सूचीबद्ध server:

| Server | नोट्स |
|:--|:--|
| zec.rocks:443 | इसके साथ regional endpoint भी सूचीबद्ध हैं: na.zec.rocks, eu.zec.rocks, ap.zec.rocks और sa.zec.rocks |
| zec-node.cakewallet.com:443 | Cake Wallet के domain पर |
| zec.0xrpc.io:443 | 0xRPC द्वारा चलाया जाता है, जो कई chains के लिए free public endpoint प्रदान करता है और capacity की लागत पूरी करने के लिए donation माँगता है |
| zaino.unsafe.zec.rocks:443 | एक Zaino instance। hostname पर ध्यान दें, इसे experimental मानें |
| testnet.zec.rocks:443 | Testnet, जिसमें zaino.testnet.unsafe.zec.rocks पर एक Zaino testnet instance सूचीबद्ध है |

इस सूची पर भरोसा करने के बजाय dashboard देखें। operator आते-जाते रहते हैं, और इस तरह का पृष्ठ पुराना पड़ जाता है।

## अपने wallet में server बदलना

यह तब उपयोगी है यदि आप अपने भरोसेमंद operator को चुनना चाहते हैं, activity को अलग-अलग operator में बाँटना चाहते हैं, या अपने ही server की ओर point करना चाहते हैं।

नीचे दिए गए menu path उस समय सही थे जब यह पृष्ठ अपडेट किया गया था, लेकिन wallet interface बदलते रहते हैं, इसलिए इन्हें सटीक route नहीं बल्कि संकेत के रूप में लें। Advanced Settings या server option खोजें।

#### ZODL

पहले Zashi। ऊपर दाईं ओर का cog, फिर Advanced Settings। Tor भी उसी screen में है। ZODL एक Switch server shortcut भी प्रदान करता है जब sync failure का कारण server का outdated होना हो।

#### Ywallet

ऊपर दाईं ओर का cog, फिर Zcash tab।

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

ऊपर बाईं ओर hamburger menu, फिर Settings, फिर नीचे scroll करें।

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

ऊपर बाईं ओर hamburger menu, फिर Settings, फिर Advanced।

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

ये screenshot मार्च 2025 में लिए गए थे और तब से apps के कई release आ चुके हैं, इसलिए buttons स्थान बदल चुके हो सकते हैं।

## अपना स्वयं का चलाना

सबसे मजबूत विकल्प है कि आप स्वयं अपने operator बनें, जिससे trust का प्रश्न पूरी तरह समाप्त हो जाता है। दोनों server open source हैं: Go में [lightwalletd](https://github.com/zcash/lightwalletd) और Rust में [Zaino](https://github.com/zingolabs/zaino)। दोनों एक full validator से पढ़ते हैं, इसलिए आपको [Zebra](/site/Zcash_Tech/Zebra_Full_Node) भी चाहिए होगा।

## सारांश

Light wallet आपको disk space के बिना shielded pool तक पहुँच देते हैं, जो एक अच्छा trade है। बस यह स्पष्ट रखें कि आप किस चीज़ का trade कर रहे हैं। server आपके funds नहीं ले सकता और न ही आपकी shielded amounts पढ़ सकता है, लेकिन यह आपके IP address और आपके transaction के समय को देखने की अच्छी स्थिति में होता है। Tor के ऊपर route करें, operator सोच-समझकर चुनें, या अपना खुद का चलाएँ।

**अंतिम अपडेट:** अगस्त 2026

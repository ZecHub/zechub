# Zcash Network Upgrades 

वर्षों के दौरान, Zcash ने प्रोटोकॉल में महत्वपूर्ण बदलाव और सुधार पेश किए हैं, और आज हम इन सभी upgrades का अध्ययन करते हैं:

[OverWinter:](https://bitzecbzc.github.io/blog/overwinter/index.html) block 347500 पर सक्रिय किया गया, जिसे 26 जून 2018 को mine किया गया था। शुरुआती लॉन्च के बाद Overwinter, Zcash का पहला network upgrade था। Overwinter का मुख्य लक्ष्य भविष्य के network upgrades के लिए प्रोटोकॉल को अधिक मजबूत बनाना था। Overwinter के मूल में network upgrades के लिए replay protection, versioning, transparent transactions के प्रदर्शन में सुधार, और transaction expiry की एक नई सुविधा शामिल है।


[Sapling:](https://coinbureau.com/analysis/zcash-sapling-upgrade/) block 419200 पर सक्रिय किया गया, जिसे 29 अक्टूबर 2018 को mine किया गया था। यह Zcash network के लिए दूसरा बड़ा और प्रभावशाली upgrade था, जिसका मुख्य फोकस shielded transactions के लिए zk-SNARKs की दक्षता में सुधार करना था। Sapling के रिलीज़ के समय zk-SNARKs के आसपास कई चुनौतियाँ मंडरा रही थीं, जिनमें upgradability की चुनौतियाँ, implementation की जटिलताएँ, और trusted setup की आवश्यकताएँ शामिल थीं। सौभाग्य से, Sapling ने zk-SNARK proof creation की दक्षता बढ़ाई, जिससे इस cryptocurrency के संभावित adoption का दायरा व्यापक हुआ, जिसका लाभ हम आज उठा रहे हैं! Sapling के लिए कल्पित एक और उल्लेखनीय setup (एक public parameter generation ceremony) था, जिसे Zcash टीम भी बेहतर बनाना चाहती थी। 


[Zcash Blossom:](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/) block 653600 पर सक्रिय किया गया, जिसे 11 दिसंबर 2019 को mine किया गया था। यह महत्वपूर्ण network upgrade scalability और user experience को बेहतर बनाने के लिए डिज़ाइन किया गया था, जिसमें block time को आधा करके लगभग 75 सेकंड कर दिया गया। इसका प्रभाव? Transaction confirmations तेज़ हो गए, network throughput दोगुना हो गया और transaction fees कम लागत पर आ गईं। Blossom upgrade तुरंत यह दिखाता है कि Zcash network सुरक्षा और reliability के अपने उच्च मानकों को बनाए रखते हुए network capacity बढ़ाने के लिए व्यावहारिक engineering निर्णय ले सकता है। 


[HeartWood:](https://electriccoin.co/blog/introducing-heartwood/) block 903000 पर सक्रिय किया गया, जिसे 16 जुलाई 2020 को mine किया गया था। Heartwood का एकमात्र उद्देश्य अधिक third-party integrations और बेहतर privacy को सक्षम करना है, एक shielded Coinbase के माध्यम से जो miners को shielded addresses में rewards प्राप्त करने की अनुमति देता है। इसके अतिरिक्त, Heartwood को बेहतर network decentralization और interoperability का समर्थन प्राप्त है। Heartwood upgrade ने Flyclient को भी integrate किया, जो lightweight clients को transactions को कुशलतापूर्वक verify करने में सक्षम बनाता है, जिससे scalability और third-party integration में सुधार होता है। यह भी उल्लेखनीय है कि shielded Coinbase, जिसे ZIP 213 के नाम से जाना जाता है, Zcash consensus rules में संशोधन करना चाहता है ताकि Coinbase funds को shielded Sapling addresses पर mine किया जा सके। Sapling upgrade से पहले shielded Coinbase संभव नहीं था क्योंकि shielded transactions को बनाने के लिए significant memory और CPU resources की आवश्यकता होती थी।


[Canopy:](https://youtu.be/R8O1SZMfESM?si=qoBL1dBp4E_af-eM) block 1046400 पर सक्रिय किया गया, जिसे 18 नवंबर 2020 को mine किया गया था। इस upgrade को Electric Coin Co (ECC) और Zcash Foundation, दोनों का समर्थन प्राप्त था। Canopy ने founders reward का अंत चिह्नित किया, एक नया funding mechanism पेश किया गया (Zcash development fund), और एक नए governance model ने Zcash ecosystem के लिए निरंतर funding का समर्थन किया। Canopy के लिए, अगले चार वर्षों के लिए एक नया development fund स्थापित किया जाएगा। mining reward का 80% miners को जाएगा। शेष 20% को नए Major Grants Fund (8%), Electric Coin Co (7%), और Zcash Foundation (5%) के बीच विभाजित किया जाएगा। ‘canopy’ नाम Zcash के उस मिशन को दर्शाता है, जिसका उद्देश्य privacy और decentralization के सिद्धांतों के प्रति सच्चे रहते हुए एक टिकाऊ और समृद्ध ecosystem बनाना है।


[NU5:](https://electriccoin.co/blog/nu5-proposed-features/) block 1687104 पर सक्रिय किया गया, जिसे 31 मई 2022 को mine किया गया था। यह उल्लेखनीय है that Zcash Network Upgrade 5, 2016 में अपनी शुरुआत के बाद से इस cryptocurrency के लिए एक महत्वपूर्ण milestone की शुरुआत को चिह्नित करता है। Zcash के लिए छठा major upgrade होने के नाते, NU5 में Orchard shielded protocol, Unified Address, साथ ही Halo proving system शामिल थे। Zcash NU5 upgrade, zk-SNARK technology stack का एक सतत विकास है, जिसे trusted setup को समाप्त करने और प्रोटोकॉल की आधारभूत cryptography security को upgrade करने के लिए बनाया गया है। NU5 को ECC और Zcash Foundation, दोनों का समर्थन भी प्राप्त है। 


[NU6:](https://zips.z.cash/zip-0253) NU6 ने एक नया Zcash development fund लागू किया (Hybrid Deferred Dev Fund, जो non-direct funding model में transition करता है) और फिर एक lockbox स्थापित करेगा, जहाँ issuance का एक हिस्सा भविष्य में किसी भी decentralized grants funding के लिए आरक्षित रखा जाएगा। इन funds की release पूरी तरह एक ऐसे mechanism द्वारा नियंत्रित होगी, जिसे भविष्य में Zcash community निर्धारित करेगी। NU6 का मिशन block subsidy को कम करना और lockbox mechanism के माध्यम से एक decentralized funding model स्थापित करना है, ताकि privacy को मजबूत करते हुए अधिक transparency सुनिश्चित की जा सके।

---

**Protected terms (keep in English):** `zcashd`

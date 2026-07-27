# Zcash नेटवर्क अपग्रेड्स 

वर्षों के दौरान, Zcash ने प्रोटोकॉल में महत्वपूर्ण बदलाव और सुधार पेश किए हैं, और आज हम इन प्रत्येक अपग्रेड्स का अवलोकन करते हैं:

[OverWinter:](https://bitzecbzc.github.io/blog/overwinter/index.html) ब्लॉक 347500 पर सक्रिय हुआ, 26 जून 2018 को माइन किया गया। Overwinter, प्रारंभिक लॉन्च के बाद Zcash का पहला नेटवर्क अपग्रेड था। Overwinter का मुख्य लक्ष्य भविष्य के नेटवर्क अपग्रेड्स के लिए प्रोटोकॉल को और मजबूत बनाना था। Overwinter के केंद्र में नेटवर्क अपग्रेड्स के लिए replay protection, versioning, transparent transactions के प्रदर्शन में सुधार, और transaction expiry की एक नई सुविधा शामिल थी।


[Sapling:](https://coinbureau.com/analysis/zcash-sapling-upgrade/) ब्लॉक 419200 पर सक्रिय हुआ, 29 अक्टूबर 2018 को माइन किया गया। यह Zcash नेटवर्क के लिए दूसरा बड़ा और प्रभावशाली अपग्रेड था, जिसका मुख्य फोकस shielded transactions के लिए zk-SNARKs की दक्षता में सुधार करना था। Sapling के रिलीज़ होने के समय zk-SNARKs को लेकर कई चुनौतियाँ मौजूद थीं, जिनमें upgradability की समस्याएँ, implementation की जटिलताएँ, और trusted setup की आवश्यकताएँ शामिल थीं। सौभाग्य से, Sapling ने zk-SNARK proof निर्माण की दक्षता को बढ़ाया, जिससे इस cryptocurrency को व्यापक रूप से अपनाने की संभावना बढ़ी, जिसका लाभ हम आज उठा रहे हैं! Sapling के लिए एक और उल्लेखनीय व्यवस्था (एक public parameter generation ceremony) की परिकल्पना की गई थी, जिसे Zcash टीम भी बेहतर बनाना चाहती थी। 


[Zcash Blossom:](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/) ब्लॉक 653600 पर सक्रिय हुआ, 11 दिसंबर 2019 को माइन किया गया। यह महत्वपूर्ण नेटवर्क अपग्रेड scalability और user experience को बेहतर बनाने के लिए डिज़ाइन किया गया था, जिसमें block time को आधा करके लगभग 75 सेकंड कर दिया गया। इसका प्रभाव? Transaction confirmations तेज़ हो गए, network throughput दोगुना हो गया, और transaction fees कम लागत पर आ गईं। Blossom अपग्रेड ने तुरंत यह प्रदर्शित किया कि Zcash नेटवर्क सुरक्षा और विश्वसनीयता के अपने उच्च मानकों को बनाए रखते हुए नेटवर्क की क्षमता बढ़ाने के लिए व्यावहारिक engineering निर्णय ले सकता है। 


[HeartWood:](https://electriccoin.co/blog/introducing-heartwood/) ब्लॉक 903000 पर सक्रिय हुआ, 16 जुलाई 2020 को माइन किया गया। Heartwood का एकमात्र उद्देश्य अधिक third-party integrations और बेहतर privacy को सक्षम बनाना था, एक shielded Coinbase के माध्यम से जो miners को shielded addresses में rewards प्राप्त करने की अनुमति देता है। इसके अतिरिक्त, Heartwood को बेहतर network decentralization और interoperability का समर्थन प्राप्त है। Heartwood अपग्रेड ने Flyclient को भी एकीकृत किया, जो lightweight clients को transactions को कुशलतापूर्वक verify करने में सक्षम बनाता है, जिससे scalability और third-party integration में सुधार होता है। यह भी उल्लेखनीय है कि shielded Coinbase, जिसे ZIP 213 के नाम से जाना जाता है, Zcash consensus rules को इस प्रकार संशोधित करने का प्रयास करता है कि Coinbase funds को shielded Sapling addresses पर माइन किया जा सके। Sapling अपग्रेड से पहले, shielded Coinbase संभव नहीं था क्योंकि shielded transactions को बनाने के लिए पर्याप्त memory और CPU resources की आवश्यकता होती थी।


[Canopy:](https://youtu.be/R8O1SZMfESM?si=qoBL1dBp4E_af-eM) ब्लॉक 1046400 पर सक्रिय हुआ, 18 नवंबर 2020 को माइन किया गया। इस अपग्रेड को Electric Coin Co (ECC) और Zcash Foundation दोनों का समर्थन प्राप्त था। Canopy ने founders reward का अंत चिह्नित किया, एक नया funding mechanism पेश किया गया (Zcash development fund), और एक नए governance model ने Zcash ecosystem के लिए निरंतर funding का समर्थन किया। Canopy के लिए, अगले चार वर्षों के लिए एक नया development fund स्थापित किया जाएगा। mining reward का 80% miners को जाएगा। शेष 20% को नए Major Grants Fund (8%), Electric Coin Co (7%), और Zcash Foundation (5%) के बीच विभाजित किया जाएगा। ‘canopy’ नाम Zcash के उस मिशन को दर्शाता है जिसमें privacy और decentralization के अपने सिद्धांतों के प्रति सच्चे रहते हुए एक टिकाऊ और समृद्ध ecosystem बनाया जाए।


[NU5:](https://electriccoin.co/blog/nu5-proposed-features/) ब्लॉक 1687104 पर सक्रिय हुआ, 31 मई 2022 को माइन किया गया। यह उल्लेखनीय है कि Zcash Network Upgrade 5, 2016 में अपनी शुरुआत के बाद से इस cryptocurrency के लिए एक महत्वपूर्ण मील का पत्थर है। Zcash के लिए छठा प्रमुख अपग्रेड होने के नाते, NU5 में Orchard shielded protocol, Unified Address, और Halo proving system शामिल थे। Zcash NU5 अपग्रेड, zk-SNARK technology stack का निरंतर विकास है, जिसे trusted setup को समाप्त करने और प्रोटोकॉल की अंतर्निहित cryptography security को उन्नत करने के लिए बनाया गया है। NU5 को ECC और Zcash Foundation दोनों का समर्थन भी प्राप्त है। 


[NU6:](https://zips.z.cash/zip-0253) NU6 ने एक नया Zcash development fund लागू किया (Hybrid Deferred Dev Fund जो एक non-direct funding model में transition करता है) और फिर एक lockbox स्थापित करेगा जहाँ issuance का एक अनुपात भविष्य में किसी भी decentralized grants funding के लिए सुरक्षित रखा जाएगा। इन funds की रिहाई पूरी तरह उस mechanism द्वारा शासित होगी जिसे भविष्य में Zcash community निर्धारित करेगी। NU6 का मिशन block subsidy को कम करना और lockbox mechanism के माध्यम से एक decentralized funding model स्थापित करना है, ताकि privacy को मजबूत करते हुए बेहतर transparency सुनिश्चित की जा सके।

[NU6.2:](https://zips.z.cash/zip-0257) NU6.2 नेटवर्क अपग्रेड Orchard shielded protocol को फिर से सक्षम करता है, जिसमें मूल Orchard rules की तुलना में consensus में दो बदलाव हैं:

* Orchard Action circuit के variable-base scalar multiplication gadget को ठीक किया गया है, जिससे soundness vulnerability का समाधान होता है। इससे Orchard verifying key बदल जाती है। Pre-NU6.2 Action proofs केवल ऐतिहासिक (असुरक्षित) verifying key के अंतर्गत verify होते हैं, और NU6.2 के बाद के proofs केवल संशोधित key के अंतर्गत। यह fix halo2_gadgets v0.5.0 10 और orchard v0.14.0. 11 में प्रकाशित किया गया था।

* NU6.2 के सक्रिय होने के बाद से, एक Orchard Action proof के लिए corrected circuit की canonical length होना अनिवार्य है। NU6.2 से पहले, इस length को consensus rule के रूप में लागू नहीं किया गया था। 8

NU6.2 के सक्रिय होने के बाद से, अस्थायी mitigation अब लागू नहीं होती। Orchard Action descriptions वाली transactions को फिर से स्वीकार किया जाना अनिवार्य है, बशर्ते proofs corrected circuit और canonical-length rule के तहत verification के अधीन हों। NU6.2 को zcashd v6.20.0 और zebra v5.0.0 में deploy किया गया था।

[NU6.3:](https://zips.z.cash/zip-0258) NU6.3 नेटवर्क अपग्रेड Ironwood shielded pool को प्रस्तुत करता है। NU6.3 के लिए consensus changes version 6 transaction format 5, Orchard Action circuit update 6, ZIP 2005 7, और इस ZIP में निर्दिष्ट हैं, जो activation parameters और उन consensus rules को ठीक करता है जो transaction version की परवाह किए बिना NU6.3 activation पर निर्भर करते हैं।

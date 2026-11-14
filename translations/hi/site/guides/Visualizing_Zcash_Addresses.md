<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash एड्रेस का विज़ुअलाइज़ेशन

यदि आप पहली बार Zcash के बारे में सीख रहे हैं, तो आपको तुरंत पता चल जाएगा कि दो प्रकार के [लेनदेन](https://zechub.wiki/using-zcash/transactions) हो सकते हैं: *ट्रांसपेरेंट (transparent)* और *शील्डेड (shielded)*।
इसके अलावा, यदि आप Zcash इकोसिस्टम (ecosystem) के नवीनतम विकास पर नज़र रखते आए हैं, तो आपने [यूनिफ़ाइड एड्रेस](https://zips.z.cash/zip-0316) या UA के बारे में जाना होगा।
जब Zcash उद्योग के लोग *शील्डेड* लेनदेन की बात करते हैं, तो उनका अर्थ ऐसे लेनदेन से होता है जिनमें वे एड्रेस शामिल होते हैं जो सैपलिंग (sapling) या ऑर्चर्ड (orchard) प्रोटोकॉल (protocol) के लिए एन्कोड किए गए हैं।
UA को *किसी भी* प्रकार के शील्डेड या ट्रांसपेरेंट लेनदेन को एक ही एड्रेस में एकीकृत करने के लिए डिज़ाइन किया गया है। यह सामान्यीकरण आगे चलकर UX को सरल बनाने की कुंजी है। इस गाइड का उद्देश्य ठोस विज़ुअल उदाहरणों के माध्यम से UA की समझ को और मज़बूत करना है।

## Zcash एड्रेस के प्रकार

वर्तमान में तीन मुख्य प्रकार के एड्रेस उपयोग में हैं। इनमें शामिल हैं

* ट्रांसपेरेंट

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* सैपलिंग

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* यूनिफ़ाइड एड्रेस (Unified Address) (पूर्ण)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


पहली बात जिस पर ध्यान देना है, वह यह है कि हर प्रकार के एड्रेस की लंबाई अलग होती है। आप इसे एड्रेस स्ट्रिंग (string) में अक्षरों की संख्या से *या* संबंधित QR कोड को देखकर विज़ुअल रूप से समझ सकते हैं। जैसे-जैसे एड्रेस की लंबाई बढ़ती है, QR कोड ज़ूम आउट होता जाता है और वर्ग में अधिक डेटा समा लेता है।

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` 35 अक्षर लंबा है
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` 78 अक्षर लंबा है
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` 213 अक्षर लंबा है

दूसरी बात जिस पर ध्यान देना है, वह है हर एड्रेस स्ट्रिंग का प्रीफ़िक्स (prefix) -- ट्रांसपेरेंट एड्रेस *t* से शुरू होते हैं, सैपलिंग *zs* से, और अंत में UA *u1* से।

यह ध्यान रखना महत्वपूर्ण है:

#### “Orchard भुगतान एड्रेस का कोई स्वतंत्र स्ट्रिंग एन्कोडिंग नहीं होता। इसके बजाय, हम ‘यूनिफ़ाइड एड्रेस’ परिभाषित करते हैं जो Orchard सहित विभिन्न प्रकार के एड्रेस को एक साथ बंडल कर सकते हैं। मेननेट (Mainnet) पर यूनिफ़ाइड एड्रेस का ह्यूमन-रीडेबल पार्ट (Human-Readable Part) “u” होता है, अर्थात उनका प्रीफ़िक्स “u1” होगा।”

## यूनिफ़ाइड एड्रेस रिसीवर

जैसा कि [यहाँ](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) चर्चा की गई है, कोई भी अलग-अलग रिसीवर (receiver) के साथ UA बना सकता है -- ट्रांसपेरेंट, सैपलिंग और ऑर्चर्ड एड्रेस प्रकारों का कोई संयोजन।
पूर्ण UA के अलावा, ये सबसे आम प्रकार हैं जो आपको व्यवहार में मिलेंगे:

* ट्रांसपेरेंट + सैपलिंग

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* ट्रांसपेरेंट + ऑर्चर्ड


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* सैपलिंग + ऑर्चर्ड


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* ऑर्चर्ड
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

पहली बात ध्यान देने योग्य यह है कि ये सभी UA एक ही प्राइवेट की (private key) से बने हैं! दूसरी बात ध्यान देने योग्य है हर प्रकार के UA की लंबाई:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 अक्षर
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 अक्षर
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 अक्षर
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 अक्षर

तीसरी बात ध्यान देने योग्य यह है कि विज़ुअल रूप से हर UA थोड़ा अलग है! UA की शक्ति वह *विकल्प* है जो वे अंतिम उपयोगकर्ताओं को देते हैं। यदि भविष्य में किसी नए प्रोटोकॉल की आवश्यकता होती है, तो UA उसके लिए तैयार रहेंगे।

## स्रोत

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

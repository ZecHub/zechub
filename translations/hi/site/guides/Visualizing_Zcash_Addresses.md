<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash पतों का दृश्यात्मक समझना

यदि आप पहली बार Zcash के बारे में सीख रहे हैं, तो आप तुरंत समझ जाएंगे कि [transactions](https://zechub.wiki/using-zcash/transactions) दो प्रकार के हो सकते हैं: *transparent* और *shielded*।
इसके अलावा, यदि आप Zcash ecosystem के नवीनतम विकासों पर नज़र रख रहे हैं, तो आपने [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), या UA's, के बारे में भी सीखा होगा।
जब Zcash उद्योग में लोग *shielded* transactions की बात करते हैं, तो उनका मतलब उन transactions से होता है जिनमें ऐसे पते शामिल होते हैं जो sapling या orchard protocols के लिए encoded होते हैं।
UA's इस तरह डिज़ाइन किए गए हैं कि वे *shielded* या transparent transaction के *किसी भी* प्रकार को एक ही पते में एकीकृत कर सकें। यह सामान्यीकरण आगे बढ़ते हुए UX को सरल बनाने की कुंजी है। इस guide का उद्देश्य ठोस visual examples के साथ UA's की समझ को और बेहतर बनाना है।

## Zcash पतों के प्रकार

वर्तमान में अब तक उपयोग में तीन मुख्य प्रकार के पते हैं। इनमें शामिल हैं

* transparent

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (पूर्ण)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


सबसे पहले ध्यान देने वाली बात यह है कि हर प्रकार के पते की लंबाई अलग होती है। आप इसे address string में मौजूद characters की संख्या से *या* संबंधित QR codes को देखकर visually समझ सकते हैं। जैसे-जैसे पते की लंबाई बढ़ती है, QR code आमतौर पर zoom out हो जाता है और square के भीतर अधिक data समेट लेता है।

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` 35 characters लंबा है
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` 78 characters लंबा है
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` 213 characters लंबा है

दूसरी बात जिस पर ध्यान देना चाहिए, वह है हर address string का prefix -- transparent पतों की शुरुआत *t* से होती है, sapling की *zs* से, और अंत में UA's की *u1* से।

यह ध्यान रखना महत्वपूर्ण है:

#### "Orchard payment addresses का कोई standalone string encoding नहीं होता। इसके बजाय, हम "unified addresses" को परिभाषित करते हैं जो Orchard सहित विभिन्न प्रकार के पतों को एक साथ bundle कर सकते हैं। Mainnet पर unified addresses का Human-Readable Part "u" होता है, अर्थात उनका prefix "u1" होगा।"

## Unified Address receivers

जैसा कि [यहाँ](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) चर्चा की गई है, कोई व्यक्ति अलग-अलग receivers के साथ UA's बना सकता है -- transparent, sapling, और orchard address types के कुछ संयोजन।
एक full UA के अलावा, यहाँ वे सबसे सामान्य प्रकार हैं जो आपको व्यवहार में मिलेंगे:

* transparent + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

सबसे पहले ध्यान देने वाली बात यह है कि ये सभी UA's एक ही private key से बने हैं! दूसरी बात यह है कि हर प्रकार के UA की लंबाई अलग है:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 characters
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 characters
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 characters
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 characters

तीसरी बात जिस पर ध्यान देना चाहिए, वह यह है कि visually हर UA थोड़ा अलग दिखता है! UA's की ताकत उस *choice* में है जो वे end users को देते हैं। यदि भविष्य में किसी नए protocol की आवश्यकता होती है, तो UA's उसके लिए तैयार होंगे।

## स्रोत

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

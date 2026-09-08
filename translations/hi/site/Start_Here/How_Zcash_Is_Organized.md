# Zcash कैसे संगठित है

## संक्षेप में

- Zcash को किसी एक कंपनी ने नहीं बनाया है, इसे कई स्वतंत्र संगठन मिलकर बनाते हैं, जिनमें से हर एक काम के अलग हिस्से की जिम्मेदारी संभालता है
- अपने अधिकांश इतिहास में विकास का नेतृत्व दो संगठनों ने किया, Electric Coin Company और Zcash Foundation
- जनवरी 2026 में एक governance विवाद के बाद पूरी Electric Coin Company टीम ने इस्तीफा दे दिया, और ecosystem कई स्वतंत्र टीमों में पुनर्गठित हो गया
- आज protocol, नोड software, wallets, research, scaling, और funding अलग-अलग समूहों द्वारा संभाले जाते हैं
- कोई एक संगठन Zcash को नियंत्रित नहीं करता, network open source और permissionless है, और हर बदलाव के दौरान यह सामान्य रूप से चलता रहा

<br/>

## यह किसके लिए है

- नए लोग जो समझना चाहते हैं कि वास्तव में Zcash को कौन बनाता और मेंटेन करता है
- वे लोग जो ecosystem में मौजूद कई संगठनात्मक नामों को लेकर भ्रमित हैं
- contributors जो यह तय कर रहे हैं कि किसके साथ काम करें या अपना proposal कहाँ भेजें

<br/>

## यह क्यों महत्वपूर्ण है

इस संरचना को समझने से बाकी सब कुछ आसान हो जाता है। इससे पता चलता है कि जिस code पर आप निर्भर हैं, उसे कौन मेंटेन करता है, grant के लिए किससे संपर्क करना चाहिए, और network के उस हिस्से की जिम्मेदारी किसकी है जिसकी आपको परवाह है। यह Zcash की एक शांत ताकत भी दिखाता है: क्योंकि काम स्वतंत्र समूहों में बंटा हुआ है, कोई एक failure point पूरे project पर कब्जा नहीं कर सकता या उसे रोक नहीं सकता।

यह पेज एक नक्शा है। इस wiki पर जिन संगठनों का पहले से पूरा पेज मौजूद है, उनके लिए यहाँ आपको एक छोटा note और आगे पढ़ने के लिए link मिलेगा, न कि वहाँ लिखी बातों की पुनरावृत्ति।

<br/>

## पहले यह कैसे काम करता था

Zcash के अधिकांश इतिहास में, दो संगठनों ने नेतृत्व किया।

Electric Coin Company ने 2016 में Zcash लॉन्च किया और core development team के बड़े हिस्से को रोजगार दिया। इसकी निगरानी Bootstrap करता था, जो Zcash के समर्थन के लिए बनाया गया एक nonprofit board था। Zcash Foundation इसके साथ एक स्वतंत्र nonprofit के रूप में काम करती थी, जिसका ध्यान protocol के stewardship और एक स्वतंत्र नोड बनाने पर था। दोनों को funding मुख्यतः block reward के उस हिस्से से मिलती थी जो development के लिए अलग रखा गया था।

यह two-pillar संरचना वर्षों तक बनी रही, लेकिन यह उस साझा funding पर और इन दोनों संगठनों के एकमत बने रहने पर निर्भर थी। जैसे-जैसे मूल development funding बदलती गई और उसका दीर्घकालिक भविष्य कम निश्चित होता गया, ongoing work के लिए भुगतान कैसे किया जाए यह प्रश्न अधिक महत्वपूर्ण होता गया। funding का यही प्रश्न आगे हुए कई बदलावों की पृष्ठभूमि में था, और यही एक कारण है कि कुछ टीमें अब बाहरी पूंजी जुटाती हैं जबकि अन्य grants पर निर्भर हैं।

<br/>

## 2026 का पुनर्गठन

जनवरी 2026 में संरचना में तेज बदलाव आया। 7 जनवरी को Electric Coin Company के chief executive Josh Swihart ने X पर घोषणा की कि पूरी कंपनी टीम ने इस्तीफा दे दिया है।

Bootstrap एक nonprofit था जिसे 2020 में Electric Coin Company के governance के लिए बनाया गया था, जो उसका पूर्ण स्वामित्व वाली subsidiary बन गई थी। कंपनी टीम और इस board के बीच मतभेद समय के साथ बढ़ते गए और कई मुद्दों को छूते थे, जिनमें संगठन की दिशा, development को funding कैसे मिले, और Zashi wallet का भविष्य शामिल था, जिसे टीम बाहरी पूंजी जुटाने के लिए एक private company में ले जाना चाहती थी। Swihart ने इस departure को constructive discharge बताया, जो एक कानूनी शब्द है जिसका अर्थ है कि परिस्थितियाँ इतनी गंभीर रूप से बदल दी गईं कि इस्तीफा देना व्यवहारतः मजबूरी बन गया, और उन्होंने कहा कि board का बहुमत Zcash के mission से असंगत हो गया था।

निष्पक्षता के लिए कहानी के दूसरे पक्ष का महत्व भी है। Bootstrap ने इस संघर्ष को governance और nonprofit कानूनी compliance का मामला बताया। Zcash के संस्थापक, Zooko Wilcox, ने सार्वजनिक रूप से इस विवाद में नामित board members का बचाव किया और कहा कि उन्होंने वर्षों तक उनके साथ काम किया है और उन्हें उच्च integrity वाले लोग मानते हैं, साथ ही यह भी स्पष्ट किया कि वे स्वयं इस असहमति में किसी एक पक्ष का समर्थन नहीं कर रहे थे।

दो बातें विवादित नहीं थीं। किसी भी पक्ष ने किसी आपराधिक आचरण का आरोप नहीं लगाया, इसलिए यह कानूनी मामला नहीं बल्कि corporate और governance का विवाद था। और स्वयं Zcash network अप्रभावित रहा, यह पूरे समय open source, permissionless, secure, और पूरी तरह operational बना रहा, जिस बात पर Swihart और Wilcox दोनों ने उपयोगकर्ताओं के लिए जोर दिया।

इसके बाद पतन नहीं बल्कि पुनर्गठन हुआ। पूर्व कंपनी टीम ने 2026 में बाद में ZODL बनाया, और अलग से Bootstrap के तीन पूर्व board members ने Sovright बनाया। विकास कई स्वतंत्र टीमों में अधिक वितरित रूप में व्यवस्थित हो गया।

यहाँ वर्णित बयान 7 जनवरी 2026 को X पर Josh Swihart (@jswihart) और Zooko Wilcox (@zooko) द्वारा सार्वजनिक रूप से दिए गए थे, जहाँ मूल पोस्ट पूरी तरह पढ़े जा सकते हैं।

<br/>

## अब Zcash कौन बनाता है

आज काम स्वतंत्र संगठनों में बंटा हुआ है, जिनमें से हर एक एक स्पष्ट हिस्से का मालिक है।

### 2026 के विभाजन से निकले दो संगठन

1. ZODL, यानी Zcash Open Development Lab, पूर्व Electric Coin Company टीम द्वारा बनाया गया और Josh Swihart के नेतृत्व में है। इसने बाहरी निवेशकों से पच्चीस मिलियन डॉलर से अधिक जुटाए और core protocol development पर काम करता है, जिसमें Halo 2 proving system शामिल है जो Zcash के नवीनतम shielded transactions को संचालित करता है, और ZODL wallet पर भी, जो shielded by default mobile wallet है और पहले Zashi कहलाता था। देखें [ZODL](https://zechub.wiki/zcash-organizations/zodl)।
2. Sovright तीन पूर्व Bootstrap board members द्वारा बनाया गया एक nonprofit है। इसका ध्यान ecosystem के लिए tools और support पर है, और इसने Argos बनाया, जो शुरुआती उपयोगकर्ताओं को एक पुराने, बिना मेंटेन किए गए wallet में फँसी funds वापस पाने में मदद करने वाला tool है। देखें [Sovright](https://zechub.wiki/zcash-organizations/sovright)।

### Protocol stewardship, research, और नोड software

3. Zcash Foundation Zebra को मेंटेन करती है, जो Rust नोड है और पुराने zcashd client के retire होने के साथ network का primary नोड बन रहा है। यह Zcash GitHub organization, z.cash website, और X पर मुख्य Zcash account का stewardship भी करती है, और उन assets में से कुछ को manage करने में मदद के लिए ZecHub के साथ साझेदारी करती है। देखें [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)।
4. Shielded Labs स्विट्जरलैंड स्थित एक स्वतंत्र, donation-funded nonprofit है। इसका ध्यान research और long term sustainability पर है, जिसमें network sustainability mechanism शामिल है जो भविष्य के development को fund करता है, और Crosslink का वह काम भी जो Zcash में proof of stake finality जोड़ने पर केंद्रित है, और इसी ने 2026 में Orchard pool vulnerability का पता लगाने वाले security audit को fund किया था। देखें [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)।
5. Electric Coin Company इतिहास का हिस्सा बनी हुई है, क्योंकि यही वह संगठन है जिसने 2016 में Zcash बनाया और लॉन्च किया। देखें [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)।

### Scaling और cryptography

6. Project Tachyon एक scaling प्रयास है जिसका नेतृत्व cryptographer Sean Bowe कर रहे हैं। यह wallets के blockchain के साथ sync होने का एक नया तरीका प्रस्तावित करता है, जिसे oblivious synchronization कहा जाता है, जो transactions को छोटा करता है और एक side effect के रूप में Zcash को post-quantum privacy की दिशा में आगे बढ़ाता है। इसका काम [tachyon.z.cash](https://tachyon.z.cash/) पर documented है।
7. The Valar Group एक cryptography research और engineering lab है जो बड़े पैमाने पर private, post-quantum digital cash के लिए Zcash protocol पर काम कर रही है। यह scaling और quantum work पर Project Tachyon के साथ घनिष्ठ सहयोग करती है। इसके काम के बारे में अधिक जानकारी [valargroup.dev](https://valargroup.dev/) पर है।

### क्षेत्रीय और सामुदायिक संगठन

8. Obscura Labs नाइजीरिया में पंजीकृत एक स्वतंत्र संगठन है, जिसका ध्यान अफ्रीका और emerging markets पर है, और जो infrastructure तथा adoption pathways बना रहा है। देखें [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs)।

### शिक्षा

9. ZecHub, Zcash के लिए एक decentralized education hub है। community members मिलकर ऐसा content बनाते, validate करते, और बढ़ावा देते हैं जो लोगों को ecosystem समझने और उसमें भाग लेना सीखने में मदद करता है, tutorials, wiki documentation, एक podcast, और एक weekly newsletter के माध्यम से। जो wiki आप अभी पढ़ रहे हैं वह ZecHub का हिस्सा है, और Zcash Foundation कुछ community resources को manage करने में मदद के लिए इसके साथ साझेदारी करती है।

### Funding

10. Zcash Community Grants block reward के एक हिस्से से स्वतंत्र contributors और community projects को fund करता है, जिससे core organizations से परे कई टीमों में काम फैलता है। देखें [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)।
11. Financial Privacy Foundation, Zcash ecosystem और community projects का समर्थन करती है। देखें [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)।

ये सभी संगठन open source repositories मेंटेन करते हैं, इसलिए इनके काम को कोई भी पढ़ सकता है, जाँच सकता है, और आगे बढ़ा सकता है। और संगठन पूरी कहानी नहीं हैं। कई महत्वपूर्ण योगदान व्यक्तियों से और grants द्वारा funded contracted companies से आते हैं, केवल core organizations से नहीं। इनके साथ wallet teams, क्षेत्रीय communities, स्वतंत्र developers, और वे निवेशक भी हैं जो protocol बनाए बिना ZEC को hold और support करते हैं। ऊपर दी गई सूची रीढ़ है, पूरी तस्वीर नहीं।

<br/>

## एक नए व्यक्ति के रूप में कहाँ से शुरू करें

कौन सा संगठन आपके लिए महत्वपूर्ण है, यह इस पर निर्भर करता है कि आप क्या करना चाहते हैं।

1. Zcash का उपयोग करने के लिए आपको एक wallet चाहिए, इसलिए ZODL और उसका wallet एक स्वाभाविक शुरुआती बिंदु हैं।
2. नोड चलाने या network software को समझने के लिए Zcash Foundation और उसके Zebra नोड की ओर देखें।
3. किसी project को fund करने या paid work में योगदान देने के लिए Zcash Community Grants की ओर देखें।
4. research और protocol के भविष्य को follow करने के लिए Shielded Labs, Project Tachyon, और The Valar Group को follow करें।

<br/>

## सीखना जारी रखें

यह wiki आपको और गहराई तक जाने में मदद करने के लिए मौजूद है, इसलिए अगला सबसे अच्छा कदम है इसे पढ़ते रहना। एक नए व्यक्ति के लिए कुछ अच्छे आगे के विषय:

- [ZEC और Zcash क्या हैं](https://zechub.wiki/start-here/what-is-zec-and-zcash) network और coin की बुनियादी बातों के लिए
- [नए उपयोगकर्ता मार्गदर्शिका](https://zechub.wiki/start-here/new-user-guide) Zcash के उपयोग की पहली चरणबद्ध समझ के लिए
- [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) यह समझने के लिए कि Zcash transactions को private कैसे रखता है
- [टर्नस्टाइल](https://zechub.wiki/zcash-tech/the-turnstile) यह समझने के लिए कि coin supply सत्यापनयोग्य कैसे बनी रहती है
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) उस shielded pool के बारे में जिसे network अपना रहा है
- [Network Upgrades](https://zechub.wiki/start-here/network-upgrades) यह समझने के लिए कि समय के साथ Zcash कैसे बदलता है
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) privacy के पीछे की cryptography के लिए

हर पेज आगे और links देता है, इसलिए आप अपनी रुचि के अनुसार इस धागे को जितनी दूर चाहें उतनी दूर तक ले जा सकते हैं।

<br/>

## आम गलतफहमियाँ

- Zcash किसी एक कंपनी के स्वामित्व या नियंत्रण में नहीं है, कोई एक संगठन अपने दम पर network को बदल या रोक नहीं सकता
- 2026 के विवाद का network, funds, या privacy पर कोई असर नहीं पड़ा, यह एक संगठनात्मक असहमति थी, और protocol पूरे समय सामान्य रूप से चलता रहा
- Electric Coin Company को छोड़ने वाली टीम के जाने से Zcash समाप्त नहीं हुआ, काम नए स्वतंत्र संगठनों में स्थानांतरित हो गया
- कई संगठनों का होना कमजोरी नहीं बल्कि ताकत है, यह single points of failure को हटाता है और project को resilient बनाए रखता है
- ZEC को hold करना या उसका प्रचार करना, Zcash बनाने के समान नहीं है, निवेशक और evangelists community का हिस्सा हैं लेकिन वे protocol विकसित करने वाली टीमों से अलग हैं

<br/>

## संबंधित पेज

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - पूर्व Electric Coin Company टीम द्वारा बनाया गया development lab
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - पूर्व Bootstrap board members द्वारा बनाया गया nonprofit
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - protocol और Zebra नोड का steward
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - research और protocol sustainability
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - वह कंपनी जिसने 2016 में Zcash लॉन्च किया
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - अफ्रीका और emerging markets में infrastructure और adoption
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - स्वतंत्र contributors के लिए funding

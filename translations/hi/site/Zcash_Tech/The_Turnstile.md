# टर्नस्टाइल

## संक्षेप में

- टर्नस्टाइल एक सार्वजनिक लेखांकन नियम है जो यह ट्रैक करता है कि प्रत्येक shielded pool में कितनी वैल्यू प्रवेश करती है और उससे कितनी बाहर जाती है
- यह किसी को भी यह सत्यापित करने देता है कि कोई pool उसमें डाली गई राशि से अधिक कभी भुगतान नहीं करता, भले ही उसके अंदर की ट्रांज़ैक्शन निजी हों
- यह ZEC आपूर्ति को किसी छिपी हुई बग से सुरक्षित रखता है, क्योंकि नकली कॉइन गिनती को तोड़े बिना किसी pool से बाहर नहीं निकल सकते
- यह privacy को कमजोर किए बिना काम करता है, क्योंकि केवल pool के कुल योग सार्वजनिक होते हैं, individual ट्रांज़ैक्शन कभी नहीं
- यही कारण है कि Orchard से Ironwood migration यह साबित कर सकती है कि shielded supply सही है

<br/>

## यह किसके लिए है

- कोई भी जो समझना चाहता है कि Zcash अपनी private supply को भरोसेमंद कैसे बनाए रखता है
- वे उपयोगकर्ता जो Orchard से Ironwood migration को फॉलो कर रहे हैं और सोच रहे हैं कि यह supply के वास्तविक होने को कैसे सिद्ध करती है
- नए लोग जो यह जानना चाहते हैं कि private money system का audit फिर भी कैसे किया जा सकता है

<br/>

## चुनौती

Shielded Zcash राशि, sender और receiver को छिपाता है। यही उसकी privacy का मूल उद्देश्य है। लेकिन इससे एक कठिन सवाल उठता है: अगर कोई भी shielded pool के अंदर नहीं देख सकता, तो किसी को यह कैसे पता चले कि ZEC की कुल राशि सही है? उस धन का audit कैसे किया जाए जिसे देखा ही नहीं जा सकता?

अगर कभी कोई bug किसी को shielded pool के भीतर कॉइन गढ़ने दे, तो वही privacy जो ईमानदार उपयोगकर्ताओं की रक्षा करती है, उस जालसाजी को भी छिपा देगी। किसी सुरक्षा उपाय के बिना, यह अनिश्चितता पूरी supply पर भरोसे को कमजोर कर देगी। टर्नस्टाइल वही सुरक्षा उपाय है जो इस समस्या का समाधान करता है।

<br/>

## टर्नस्टाइल क्या है

हर shielded pool को एक ऐसे कमरे की तरह सोचिए जिसका केवल एक गिना जाने वाला दरवाज़ा है। जब भी वैल्यू बाहर से pool में प्रवेश करती है, या वहाँ से कहीं और जाती है, वह इसी दरवाज़े से गुजरती है और सार्वजनिक रूप से दर्ज की जाती है। कमरे के अंदर की ट्रांज़ैक्शन निजी रहती हैं, लेकिन दरवाज़े पर चल रहा कुल योग सभी को दिखाई देता है।

नियम सरल है: कोई pool उसमें गई वैल्यू से अधिक बाहर कभी नहीं जाने दे सकता। नोड किसी भी ऐसे block को reject कर देते हैं जो किसी pool का balance शून्य से नीचे ले जाए। किसी pool के भीतर कितनी राशि मानी जा रही है, यह हर समय ज्ञात रहता है, क्योंकि वह केवल कुल प्रवेशित राशि में से कुल निकली राशि घटाने पर मिलती है। यही सार्वजनिक tally टर्नस्टाइल है।

<br/>

## यह कैसे काम करता है

Zcash के इतिहास में कई shielded pool रहे हैं, जैसे Sprout, Sapling, और Orchard। वैल्यू transparent chain और इन pools के बीच चलती है, और कभी-कभी pools के बीच भी। टर्नस्टाइल इन गतिविधियों पर नज़र रखता है:

1. जब ZEC किसी shielded pool में जाता है, तो वह राशि उस pool के public balance में जोड़ दी जाती है
2. जब ZEC किसी pool से बाहर आता है, तो वह राशि घटा दी जाती है
3. नेटवर्क किसी भी ऐसे block को reject कर देता है जो किसी pool का balance negative कर दे, यानी जितना कभी अंदर गया उससे अधिक बाहर चला गया
4. Individual shielded ट्रांज़ैक्शन पूरी तरह private रहती हैं, केवल pool totals सार्वजनिक होते हैं

नेटवर्क हर value pool का balance इसी तरह ट्रैक करता है, जिसमें Sprout, Sapling, Orchard, नया Ironwood pool, और transparent तथा lockbox balances शामिल हैं। इसी कारण, भले ही किसी pool की सटीक सामग्री छिपी हो, उसमें से अधिकतम उतनी ही राशि बाहर आ सकती है जितनी भीतर गई थी। कोई hidden inflation circulation में नहीं निकल सकती।

<br/>

## value balance की जाँच कैसे होती है

दरवाज़े पर की गई tally केवल इसलिए भरोसेमंद है क्योंकि हर ट्रांज़ैक्शन को यह साबित करना पड़ता है कि उसने सही राशि move की, भले ही राशि स्वयं छिपी रहे। हर shielded ट्रांज़ैक्शन एक ईमानदार संख्या सार्वजनिक करती है: वह शुद्ध वैल्यू जो वह pool में अंदर या बाहर ले जाती है, जिसे उसका value balance कहा जाता है। Positive value balance का मतलब है कि funds pool से transparent side में गए, और negative का मतलब है कि funds pool में प्रवेश किए। Private विवरण sealed रहते हैं, लेकिन यही एक net figure सार्वजनिक होती है, और टर्नस्टाइल इसी को जोड़ता है।

चतुराई इस बात में है कि ट्रांज़ैक्शन इस public संख्या के ईमानदार होने को, उसके पीछे की private राशियाँ बताए बिना, कैसे सिद्ध करती है। यह mechanism pool के अनुसार अलग होता है, और यही वास्तव में टर्नस्टाइल की मशीनरी है।

मूल Sprout pool में, हर ट्रांज़ैक्शन एक JoinSplit का उपयोग करती है। एक JoinSplit दो hidden notes खर्च करती है और दो नई notes बनाती है, और इसमें दो public fields होती हैं: vpub_old, यानी transparent side से shielded pool में प्रवेश करने वाली वैल्यू, और vpub_new, यानी pool से वापस transparent side में जाने वाली वैल्यू। हर JoinSplit को स्वयं संतुलित होना चाहिए, और उसका zero knowledge proof यह guarantee देता है कि hidden inputs और hidden outputs सही तरह से जोड़ते हैं। Sprout का pool balance बस chain भर में सभी vpub_old का running total है, जिसमें से सभी vpub_new घटाए जाते हैं। यही कारण है कि आगे Sprout एक उपयोगी उदाहरण है: क्योंकि vpub_old ही pool में वैल्यू प्रवेश करने का एकमात्र तरीका है, उसे बंद कर देने वाला एक नियम pool को स्थायी रूप से seal कर सकता है।

Sapling, Orchard, और Ironwood में, balance को एक अधिक स्मार्ट तरीके से सिद्ध किया जाता है, binding signature का उपयोग करके। हर transfer को अलग-अलग संतुलित करने के बजाय, पूरी ट्रांज़ैक्शन हर hidden amount के लिए value commitment के माध्यम से commit करती है। Value commitment किसी संख्या के लिए एक sealed envelope की तरह है, जो homomorphic Pedersen commitment से बनाई जाती है, जिसकी एक विशेष property होती है: envelope खोले बिना उन्हें जोड़ा और घटाया जा सकता है। नेटवर्क सभी input commitments को जोड़ता है, सभी output commitments को घटाता है, और परिणाम की तुलना ट्रांज़ैक्शन द्वारा घोषित एकमात्र net figure, उसके valueBalance field, से करता है। केवल वही ट्रांज़ैक्शन जिसके hidden amounts वास्तव में उस public valueBalance से मेल खाते हों, combined commitments पर एक valid binding signature बना सकती है। अगर कोई घोषित राशि से अधिक वैल्यू move करने की कोशिश करे, तो commitments का हिसाब नहीं बैठेगा, binding signature verify नहीं होगी, और ट्रांज़ैक्शन reject कर दी जाएगी। Ironwood भी वही Orchard protocol उपयोग करता है, इसलिए यह उसी तरह काम करता है।

यही कारण है कि cross-pool transfer की जाँच भी सुरक्षित रहती है। जब funds एक shielded pool से दूसरे में जाते हैं, उदाहरण के लिए Orchard से Ironwood में, ट्रांज़ैक्शन accounting से राशियों को नहीं छिपा सकती। हर pool का अपना value balance होता है, जिसे उसके अपने proofs से satisfy करना पड़ता है: Orchard side को अपनी binding signature के माध्यम से matching outflow दिखाना होगा, और Ironwood side को अपने proof के माध्यम से corresponding inflow दिखाना होगा। एक pool से निकलने वाली वैल्यू और दूसरे में प्रवेश करने वाली वैल्यू, दोनों स्वतंत्र रूप से सिद्ध की जाती हैं, इसलिए cross-pool move वास्तव में एक ही ट्रांज़ैक्शन में होने वाले दो टर्नस्टाइल crossings हैं — एक बाहर, एक अंदर — और दोनों सार्वजनिक रूप से tally किए जाते हैं, भले ही underlying राशियाँ private रहें।

इसलिए टर्नस्टाइल भरोसे पर आधारित नहीं है। हर ट्रांज़ैक्शन अपने net effect को गणितीय रूप से सिद्ध करती है, नेटवर्क उन सिद्ध net effects को हर pool के हिसाब से जोड़ता है, और एक consensus rule (ZIP 209) किसी भी ऐसे block को reject कर देता है जो किसी pool का balance negative कर दे। ट्रांज़ैक्शन स्तर पर proof, chain स्तर पर enforcement।

<br/>

## यह क्यों महत्वपूर्ण है

टर्नस्टाइल Zcash को एक साथ तीन चीज़ें देता है।

पहला, यह risk को compartmentalize करता है। किसी एक pool में cryptographic bug उसी pool तक सीमित रहती है, क्योंकि टर्नस्टाइल forged value को व्यापक supply में पार जाने से रोकता है।

दूसरा, यह समुदाय को बाद में supply को verify करने देता है। अगर बाद में कोई bug खोजी जाती है, तो टर्नस्टाइल रिकॉर्ड दिखाता है कि क्या किसी pool से कभी उतनी राशि से अधिक वैल्यू निकली जितनी उसमें गई थी। साफ रिकॉर्ड इस बात का मजबूत प्रमाण है कि counterfeiting का सफलतापूर्वक दुरुपयोग नहीं हुआ।

तीसरा, यह यह सब करते हुए privacy को बनाए रखता है। केवल pool-level totals सार्वजनिक होते हैं। आपकी individual ट्रांज़ैक्शन shielded रहती हैं। Auditability और privacy साथ-साथ मौजूद रहती हैं, जो असामान्य है और Zcash की शांत ताकतों में से एक है।

<br/>

## व्यवहार में टर्नस्टाइल

टर्नस्टाइल नया नहीं है, और Zcash के इतिहास के महत्वपूर्ण क्षणों में इसका उपयोग किया गया है।

जब Zcash मूल Sprout pool से नए Sapling pool की ओर बढ़ा, तब टर्नस्टाइल ने इस transition की रक्षा की। बाद में Sprout pool को सीमित कर दिया गया ताकि वह नए inflows प्राप्त न कर सके, जिससे उपयोगकर्ताओं को migrate करने के लिए प्रोत्साहन मिला, जबकि टर्नस्टाइल accounting को ईमानदार बनाए रखता रहा। वर्षों बाद, यह तथ्य कि Sprout से कभी भी अनुचित रूप से कोई वैल्यू बाहर नहीं गई, इस बात का प्रमाण है कि उसकी शुरुआती cryptography का कभी सफलतापूर्वक दुरुपयोग नहीं हुआ।

अब यही design Orchard से Ironwood की move की रक्षा कर रहा है। 2026 में Orchard proving system में एक soundness bug पाई गई और patch की गई। ऐसा कोई प्रमाण नहीं है कि उसका कभी दुरुपयोग हुआ, लेकिन क्योंकि shielded activity private होती है, पूर्ण निश्चितता असंभव थी। इसका जवाब है पुराने Orchard pool को seal करना और सबको अपने funds टर्नस्टाइल के माध्यम से Ironwood में migrate करवाना, जो corrected protocol उपयोग करने वाला एक नया pool है। Funds को टर्नस्टाइल से गुजारने का अर्थ है कि पीछे छूटे कोई काल्पनिक counterfeit coins उनका पीछा नहीं कर सकते, और migration पूरी होने के बाद कोई भी पुष्टि कर सकता है कि shielded supply सही है।

<br/>

## एक-तरफ़ा pool deprecation

टर्नस्टाइल किसी पुराने pool को केवल एक दिशा में, सुरक्षित रूप से retire करना संभव बनाता है, बिना supply guarantee को कभी तोड़े। तरकीब यह है कि प्रवेश द्वार बंद कर दिया जाए, लेकिन निकास खुला छोड़ा जाए।

Sprout इसका सबसे स्पष्ट उदाहरण है। इसे deprecate करने के लिए, ZIP 211 ने एक single consensus rule जोड़ा: उसकी activation height से, हर JoinSplit का vpub_old field शून्य होना चाहिए। क्योंकि vpub_old ही वह एकमात्र तरीका है जिससे वैल्यू Sprout में प्रवेश कर सकती है, उसे शून्य करने का मतलब है कि अब कोई नई वैल्यू उसमें फिर कभी नहीं जा सकती, जबकि वैल्यू अभी भी transparent side या आगे Sapling की ओर बाहर जा सकती है। pool एक-तरफ़ा हो गया। वह केवल खाली हो सकता है, भर नहीं सकता। टर्नस्टाइल पूरे समय गिनती करता रहता है, इसलिए funds निकलने पर balance गिर सकता है लेकिन बढ़ नहीं सकता, और वह कभी negative नहीं हो सकता।

Orchard से Ironwood migration भी यही विचार उपयोग करती है। NU6.3 upgrade पर, Orchard pool को नए inflows के लिए बंद कर दिया जाता है, और wallets को निर्देशित किया जाता है कि वे Orchard funds को टर्नस्टाइल के पार नए Ironwood pool में भेजें। Orchard एक-तरफ़ा pool बन जाता है जो केवल खाली हो सकता है। क्योंकि हर exit एक टर्नस्टाइल crossing है जिसे सिद्ध करना अनिवार्य है, Orchard में पीछे छूटी कोई काल्पनिक counterfeit value ईमानदार funds के साथ चुपचाप बाहर नहीं आ सकती। वह ऐसे pool में फँसी रहती है जो केवल खाली होता है और जिसके दरवाज़े पर निगरानी रहती है। समय के साथ इससे पुराना pool खाली होने की ओर बढ़ता है और किसी को भी यह पुष्टि करने देता है कि जो वैल्यू बाहर आई, वह कभी भी उस वैल्यू से अधिक नहीं थी जो ईमानदारी से भीतर गई थी।

यही वह गहरा कारण है कि साधारण accounting से आगे टर्नस्टाइल क्यों महत्वपूर्ण है। यही वह mechanism है जो Zcash को किसी shielded pool को deprecate करने देता है — चाहे Sprout की तरह complexity कम करने के लिए, या Orchard की तरह किसी खोजी गई bug से उबरने के लिए — और फिर भी supply के बारे में एक निरंतर, सार्वजनिक, सिद्ध करने योग्य guarantee बनाए रखता है।

<br/>

## आम गलतफ़हमियाँ

- टर्नस्टाइल आपकी ट्रांज़ैक्शन को प्रकट नहीं करता। यह केवल pool totals की tally करता है, यह नहीं कि किसने किसे क्या भेजा
- यह किसी counterfeiter को नाम से नहीं पकड़ता। यह सीमित करता है कि किसी pool से कितनी राशि बाहर जा सकती है, और यही supply की रक्षा करता है
- यह Ironwood के लिए कोई नया आविष्कार नहीं है। इसने Zcash के इतिहास में हर बड़े shielded pool transition की रक्षा की है
- सार्वजनिक pool total privacy को कमजोर नहीं करता। privacy pool के अंदर की ट्रांज़ैक्शन में होती है, जो छिपी रहती हैं

<br/>

## संसाधन

1. [ZIP 209: Out-of-Range Chain Value Pool Balances को निषिद्ध करना](https://zips.z.cash/zip-0209) - टर्नस्टाइल के पीछे का consensus rule
2. [ZIP 211: Sprout Chain Value Pool में नई Value जोड़ने को निष्क्रिय करना](https://zips.z.cash/zip-0211) - कैसे Sprout pool को नए deposits के लिए बंद किया गया
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - वह upgrade जो Ironwood pool को प्रस्तुत करती है और टर्नस्टाइल के पार value को निर्देशित करती है
4. [Counterfeiting के विरुद्ध Turnstile Enforcement](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - Electric Coin Company से मूल व्याख्या
5. [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) - पूरी जानकारी के लिए balance और binding signature वाले sections देखें
6. [Value Pools, Zebra Book](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - एक नोड हर pool का value balance कैसे ट्रैक करता है

<br/>

## संबंधित पृष्ठ

- [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) - कैसे Zcash shielded ट्रांज़ैक्शन विवरणों को private रखती हैं
- [Halo](https://zechub.wiki/zcash-tech/halo) - Orchard pool के पीछे की proof system
- [Network Upgrades](https://zechub.wiki/start-here/network-upgrades) - Zcash नए shielded pools जैसे बदलावों को कैसे activate करता है

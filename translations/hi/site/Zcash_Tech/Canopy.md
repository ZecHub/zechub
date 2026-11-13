<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy, Zcash mainnet पर ब्लॉक 1,046,400 (18 नवंबर 2020 UTC) पर लाइव हुआ।

आप यहाँ से यह समझकर जाएँगे: founders reward समाप्त होने के बाद Zcash ने अपने विकास के लिए वित्तपोषण कैसे जारी रखा, और Canopy ने वह funding split कैसे स्थापित किया जिस पर बाद के upgrades भी आधारित हैं।

Canopy, Zcash का पाँचवाँ network upgrade है, जिसे Network Upgrade 4 (NU4) भी कहा जाता है। इसे [ZIP 251](https://zips.z.cash/zip-0251) द्वारा deploy किया गया था, और यह 18 नवंबर 2020 (UTC) को mainnet ब्लॉक 1,046,400 पर सक्रिय हुआ, ठीक उसी समय जब Zcash का पहला block reward halving हुआ। Canopy मुख्य रूप से governance और monetary upgrade था। इसने original founders reward को समाप्त किया और नया Zcash Development Fund शुरू किया, जो Electric Coin Company, Zcash Foundation, और independent grant recipients को भुगतान करता है। इस fund के पीछे की policy 2019 में चली एक विस्तृत community governance process से निकली थी।

यह क्यों महत्वपूर्ण है। Zcash अपने विकास के लिए block rewards से खुद वित्तपोषण करता है, क्योंकि इसके पीछे कोई company नहीं है। founders reward, जिसने शुरुआती वर्षों का खर्च उठाया, पहले halving पर समाप्त होने वाला था। Canopy उसका replacement था: इसने हर block reward का एक निश्चित हिस्सा Development Fund में भेजा और तय किया कि उसे कौन प्राप्त करेगा। बाद के upgrades ने इस model को और परिष्कृत किया, यहाँ तक कि [NU6.1](../zcash-tech/nu6-1) तक।

![Canopy से पहले founders reward विकास को वित्तपोषित करता था और पहला halving आते ही समाप्त होने वाला था। Canopy के बाद Development Fund हर block reward का 20 प्रतिशत लेता है और 2024 में दूसरे halving तक चलता है](/content-images/canopy-founders-to-devfund-010676e799.webp)

## Development Fund

Canopy ने original founders reward को समाप्त किया और उसकी जगह Zcash Development Fund लाया। यह बदलाव उसी block पर लागू हुआ जिस पर Zcash का पहला halving हुआ, जब block reward 6.25 ZEC से घटकर 3.125 ZEC हो गया। इसलिए miners ने उसी दिन अपना reward आधा होते देखा, जिस दिन उस छोटे reward का एक नया हिस्सा development की ओर जाना शुरू हुआ।

यह fund चार वर्षों तक चलने के लिए निर्धारित किया गया था, नवंबर 2020 के इस पहले halving से लेकर 2024 के दूसरे halving तक। सहमति से बनी policy को [ZIP 1014](https://zips.z.cash/zip-1014) के रूप में लिखा गया। वास्तव में पैसे को स्थानांतरित करने वाला consensus mechanism funding stream mechanism है: [ZIP 207](https://zips.z.cash/zip-0207) ने block subsidy के एक हिस्से को निर्धारित recipients तक भेजने का सामान्य तरीका प्रस्तुत किया, और [ZIP 214](https://zips.z.cash/zip-0214) ने Development Fund के लिए विशिष्ट rules और recipient addresses तय किए।

## पैसे का बँटवारा कैसे होता है

Development Fund हर block reward का 20 प्रतिशत लेता है। बाकी 80 प्रतिशत miners के पास रहता है। फिर उस 20 प्रतिशत को ZIP 1014 के अनुसार तीन हिस्सों में बाँटा जाता है।

1. 35 प्रतिशत Bootstrap Project को, जो Electric Coin Company की parent organization है।
2. 25 प्रतिशत Zcash Foundation को।
3. 40 प्रतिशत Major Grants को, जो independent work को fund करता है और जिसका प्रशासन Zcash Foundation करती है। Major Grants बाद में Zcash Community Grants (ZCG) बन गया।

अगर इन्हें केवल fund की बजाय पूरे block reward के अनुपात में मापा जाए, तो ये हिस्से Electric Coin Company के लिए 7 प्रतिशत, Zcash Foundation के लिए 5 प्रतिशत, और Major Grants के लिए 8 प्रतिशत बनते हैं। इसे बताने के दोनों तरीके एक ही संख्याएँ दर्शाते हैं।

![Development Fund हर block reward का 20 प्रतिशत है, जिसमें 35 प्रतिशत Bootstrap और Electric Coin Company को, 25 प्रतिशत Zcash Foundation को, और 40 प्रतिशत Major Grants को जाता है](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sprout pool में बदलाव

Canopy ने सबसे पुराने shielded pool को retire करना भी शुरू किया। Sprout, Zcash का पहला shielded pool था, और Canopy ने [ZIP 211](https://zips.z.cash/zip-0211) के माध्यम से इसे धीरे-धीरे बंद करने की प्रक्रिया शुरू की।

Canopy के सक्रिय होते ही, Sprout pool में कोई नया value नहीं जोड़ा जा सकता। तकनीकी रूप से, हर JoinSplit का `vpub_old` field शून्य होना चाहिए। जो funds पहले से Sprout में हैं उन्हें अब भी निकाला जा सकता है, इसलिए कोई भी locked out नहीं होता, लेकिन अब यह pool केवल छोटा ही हो सकता है। यह legacy Sprout pool को eventually deprecate करके नए shielded pools के पक्ष में जाने की दिशा में पहला कदम है।

![Canopy से पहले value Sprout pool में जा भी सकता था और बाहर भी आ सकता था। Canopy के बाद कोई नया value अंदर नहीं जा सकता, लेकिन withdrawals अभी भी अनुमति हैं](/content-images/canopy-sprout-pool-f5166aa049.webp)

## तकनीकी अतिरिक्त बातें

Funding changes के साथ, Canopy में दो छोटे technical ZIPs भी शामिल थे। [ZIP 212](https://zips.z.cash/zip-0212) ने यह बदला कि कोई recipient, Sapling ephemeral secret को कैसे derive करता है, और इसे note plaintext से derive किया। [ZIP 215](https://zips.z.cash/zip-0215) ने Ed25519 signatures को validate करने के लिए स्पष्ट rules लिखे, ताकि हर नोड ठीक-ठीक इस बात पर सहमत हो कि कौन-सी signatures valid मानी जाएँगी।

## संक्षेप में (TL;DR)

- Canopy (NU4) mainnet block 1,046,400 (18 नवंबर 2020 UTC) पर सक्रिय हुआ — यह वही block था जिस पर Zcash का पहला halving हुआ, जिसने block reward को 6.25 से घटाकर 3.125 ZEC कर दिया।
- इसने founders reward को समाप्त किया और Zcash Development Fund बनाया: चार वर्षों तक हर block reward का 20%, 2024 में दूसरे halving तक (ZIP 1014 नीति; ZIP 207/214 तंत्र)।
- फंड का 20% इस प्रकार बँटता है: 35% Bootstrap (Electric Coin Company) को, 25% Zcash Foundation को, और 40% Major Grants को — जिसे बाद में Zcash Community Grants के नाम से जाना गया।
- इसने Sprout pool को नए value के लिए बंद कर दिया (ZIP 211): कोई नया deposit इसमें प्रवेश नहीं कर सकता, लेकिन withdrawals अब भी काम करते हैं।
- इसके साथ दो तकनीकी ZIPs भी लागू हुए: ZIP 212 (note plaintext से व्युत्पन्न Sapling ephemeral secret) और ZIP 215 (स्पष्ट Ed25519 validation नियम)।

## मुख्य व्याख्या

Zcash अपने development का खर्च block rewards से उठाता है, क्योंकि इसके पीछे कोई कंपनी नहीं है। शुरुआती वर्षों का खर्च founders reward से चला, और इसे पहली halving पर समाप्त होना था, इसलिए उस समय-सीमा से पहले इसका कोई विकल्प मौजूद होना ज़रूरी था। Canopy वही विकल्प था: ZIP 207 ने सामान्य funding-stream तंत्र पेश किया, जो block subsidy का एक हिस्सा तय किए गए प्राप्तकर्ता addresses पर भेजता है, और ZIP 214 ने Development Fund के लिए विशिष्ट नियम और addresses तय किए। केवल fund के बजाय पूरे reward के हिसाब से देखें, तो हिस्से इस प्रकार हैं: 7% ECC, 5% Zcash Foundation और 8% Major Grants। संख्याएँ वही हैं, बस उन्हें दो तरीकों से बताया गया है।

Canopy ने Zcash के सबसे पुराने shielded pool, Sprout, को भी चरणबद्ध तरीके से बंद करना शुरू किया: सक्रियण के बाद से हर JoinSplit का vpub_old field शून्य होना अनिवार्य है, इसलिए value Sprout से बाहर तो जा सकती है, लेकिन उसमें कभी वापस नहीं आ सकती।

## दृश्य उपमा

Canopy वह क्षण है जब किसी startup का संस्थापक-वेतन वाला चरण समाप्त होता है और एक संविधान उसकी जगह ले लेता है: उस block से आगे, network द्वारा mint किए गए हर डॉलर में से 20 सेंट रखरखाव के लिए निर्धारित किए जाते हैं और तीन विभागों के बीच 35/25/40 के अनुपात में बाँटे जाते हैं। उसी समय पुराना गोदाम (Sprout) नए भंडारण के लिए सील कर दिया जाता है — कोई भी अब भी अपना सामान वापस ले सकता है, लेकिन उसमें कुछ भी नया नहीं जाता।

## गहन अध्ययन

funding stream को consensus द्वारा लागू किया जाता है, भरोसे द्वारा नहीं: नोड उन blocks को अस्वीकार कर देते हैं जिनका coinbase निर्धारित प्राप्तकर्ताओं को उनके निर्धारित हिस्से का भुगतान नहीं करता। Canopy को जानबूझकर halving block पर लागू किया गया, ताकि miners ने reward को ठीक उसी समय आधा होते देखा जब उस छोटे reward का एक नया हिस्सा development की ओर जाना शुरू हुआ। ZIP 212 ने यह बदल दिया कि Sapling ephemeral secret कैसे derive किया जाता है (note plaintext से), और ZIP 215 ने स्पष्ट Ed25519 स्वीकृति नियम लिखित रूप में तय किए ताकि हर नोड signatures को एक समान तरीके से validate करे — ऐसे छोटे बदलाव जिन्होंने consensus संबंधी अस्पष्टता की पूरी श्रेणियों को समाप्त कर दिया।

## आम गलतियाँ

- **Canopy को ही halving समझ लेना।** दोनों एक ही activation block साझा करते थे, लेकिन ये अलग-अलग बदलाव हैं: ZIP 251 (Canopy) बनाम issuance schedule।
- **20% को miners के नए हिस्से में से लिया गया मान लेना।** Miners के पास 80% रहा; fund को block reward का 20% मिलता है।
- **यह मान लेना कि Sprout के funds फ़्रीज़ या नष्ट कर दिए गए थे।** Withdrawals अब भी संभव हैं, केवल नए deposits बंद हुए हैं।
- **"fund का 35/25/40" और "reward का 7/5/8" को अलग-अलग बँटवारे समझना।** ये वही संख्याएँ हैं, बस अलग-अलग आधारों पर मापी गई हैं।
- **Canopy को cryptography upgrade कहना।** यह मुख्य रूप से governance और monetary policy से जुड़ा था; तकनीकी ZIPs में केवल छोटे बदलाव थे।

## शब्दावली

| शब्द | सरल अर्थ |
|---|---|
| Founders reward | मूल funding model जिसने शुरुआती Zcash development के लिए भुगतान किया; इसे पहले halving पर समाप्त होना था |
| Development Fund | हर block reward का 20 प्रतिशत हिस्सा जिसे Canopy ने development की ओर भेजा, और जो दूसरे halving तक चला |
| Block reward (subsidy) | नया ZEC जो हर block के mine होने पर बनाया और वितरित किया जाता है |
| Halving | वह निर्धारित घटना जिसमें block reward आधा कर दिया जाता है |
| Funding stream | consensus mechanism (ZIP 207) जो block subsidy के एक हिस्से को निर्धारित recipient addresses की ओर भेजता है |
| Sprout pool | Zcash का मूल shielded pool, जिसमें Canopy ने नया value स्वीकार करना बंद कर दिया |

## FAQ

क्या Canopy मेरे ZEC या मेरी privacy को बदलता है? नहीं। Canopy इस बारे में है कि development को कैसे fund किया जाता है, साथ ही कुछ technical rules भी। आपके balances और आपके shielded transactions अप्रभावित रहते हैं।

क्या Canopy ने block reward घटाया? Canopy उसी block पर सक्रिय हुआ जिस पर Zcash का पहला halving हुआ, जिसने reward को 6.25 ZEC से 3.125 ZEC कर दिया। Halving, Zcash की monetary policy का हिस्सा है। Canopy का काम यह तय करना था कि उस छोटे reward के एक हिस्से का उपयोग कैसे किया जाए।

Development Fund किसलिए है? यह Zcash बनाने वाले लोगों को fund करता है। यह पैसा Electric Coin Company (Bootstrap Project के माध्यम से), Zcash Foundation, और Major Grants को जाता है, जो independent work को support करता है।

क्या मैं अब भी Sprout pool में रखे funds का उपयोग कर सकता हूँ? हाँ। आप वे funds अब भी निकाल सकते हैं जो पहले से Sprout में हैं। बस Canopy के बाद आप उसमें नया value नहीं जोड़ सकते।

क्या Development Fund स्थायी है? नहीं। इसे चार वर्षों तक चलने के लिए निर्धारित किया गया था, नवंबर 2020 के पहले halving से लेकर 2024 के दूसरे halving तक, ताकि community को यह देखने का समय मिल सके कि यह कैसे काम करता है, और फिर इस पर दोबारा विचार किया जा सके।

Canopy का NU6 और NU6.1 से क्या संबंध है? Canopy ने तीन-तरफ़ा funding split और funding stream mechanism स्थापित किया। बाद के upgrades, जिनमें NU6 और NU6.1 शामिल हैं, ने उसी आधार पर बने Development Fund की फिर से समीक्षा की और उसे नया रूप दिया।

## अपनी समझ जाँचें

Canopy, Zcash के पहले halving वाले बिल्कुल उसी block पर सक्रिय हुआ। यह timing क्यों चुनी गई थी, और Canopy के बिना development funding का क्या होता?

<details>
<summary>उत्तर</summary>

मूल founders reward को पहले halving पर समाप्त होना था। Canopy के बिना, halving के बाद का पूरा छोटा block reward miners को चला जाता, और development के लिए protocol-level funding नहीं बचती। Canopy ने उसी block पर founders reward को Development Fund से replace कर दिया, इसलिए funding बिना किसी gap के जारी रही।
</details>

### संसाधन

[ZIP 251: Canopy Network Upgrade का Deployment](https://zips.z.cash/zip-0251)

[ZIP 1014: ECC, ZF, और Major Grants के लिए Dev Fund की स्थापना](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Zcash Development Fund के लिए Consensus Rules](https://zips.z.cash/zip-0214)

[ZIP 211: Sprout Chain Value Pool में नए Value के जोड़ने को अक्षम करना](https://zips.z.cash/zip-0211)

[Canopy Network Upgrade](https://z.cash/upgrade/canopy/)

### यह भी देखें

[Zcash Network Upgrades](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash Monetary Policy](../start-here/zcash-monetary-policy)

[Shielded Pools](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash Governance](../zcash-community/zcash-governance)

---

## संबंधित पृष्ठ

- [Sprout](./Sprout.md) — वह पूल जिसे Canopy ने नए जमा के लिए बंद कर दिया
- [Heartwood](./Heartwood.md) — इस श्रृंखला का पिछला अपग्रेड
- [NU5](./NU5.md) — अगला अपग्रेड, जिसने Orchard लॉन्च किया
- [NU6.1](./NU6_1.md) — डेवलपमेंट फंडिंग में किया गया सबसे हालिया सुधार

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [Heartwood](../zcash-tech/heartwood) · अगला: [NU5](../zcash-tech/nu5)

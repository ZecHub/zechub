---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy, Zcash mainnet पर ब्लॉक 1,046,400 (18 नवंबर 2020 UTC) पर लाइव हुआ।

आप यहाँ से यह समझकर जाएँगे: founders reward समाप्त होने के बाद Zcash ने अपने विकास के लिए वित्तपोषण कैसे जारी रखा, और Canopy ने वह funding split कैसे स्थापित किया जिस पर बाद के upgrades भी आधारित हैं।

Canopy, Zcash का पाँचवाँ network upgrade है, जिसे Network Upgrade 4 (NU4) भी कहा जाता है। इसे [ZIP 251](https://zips.z.cash/zip-0251) द्वारा deploy किया गया था, और यह 18 नवंबर 2020 (UTC) को mainnet ब्लॉक 1,046,400 पर सक्रिय हुआ, ठीक उसी समय जब Zcash का पहला block reward halving हुआ। Canopy मुख्य रूप से governance और monetary upgrade था। इसने original founders reward को समाप्त किया और नया Zcash Development Fund शुरू किया, जो Electric Coin Company, Zcash Foundation, और independent grant recipients को भुगतान करता है। इस fund के पीछे की policy 2019 में चली एक विस्तृत community governance process से निकली थी।

यह क्यों महत्वपूर्ण है। Zcash अपने विकास के लिए block rewards से खुद वित्तपोषण करता है, क्योंकि इसके पीछे कोई company नहीं है। founders reward, जिसने शुरुआती वर्षों का खर्च उठाया, पहले halving पर समाप्त होने वाला था। Canopy उसका replacement था: इसने हर block reward का एक निश्चित हिस्सा Development Fund में भेजा और तय किया कि उसे कौन प्राप्त करेगा। बाद के upgrades ने इस model को और परिष्कृत किया, यहाँ तक कि [NU6.1](../zcash-tech/nu6-1) तक।

![Canopy से पहले founders reward विकास को वित्तपोषित करता था और पहला halving आते ही समाप्त होने वाला था। Canopy के बाद Development Fund हर block reward का 20 प्रतिशत लेता है और 2024 में दूसरे halving तक चलता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Development Fund

Canopy ने original founders reward को समाप्त किया और उसकी जगह Zcash Development Fund लाया। यह बदलाव उसी block पर लागू हुआ जिस पर Zcash का पहला halving हुआ, जब block reward 6.25 ZEC से घटकर 3.125 ZEC हो गया। इसलिए miners ने उसी दिन अपना reward आधा होते देखा, जिस दिन उस छोटे reward का एक नया हिस्सा development की ओर जाना शुरू हुआ।

यह fund चार वर्षों तक चलने के लिए निर्धारित किया गया था, नवंबर 2020 के इस पहले halving से लेकर 2024 के दूसरे halving तक। सहमति से बनी policy को [ZIP 1014](https://zips.z.cash/zip-1014) के रूप में लिखा गया। वास्तव में पैसे को स्थानांतरित करने वाला consensus mechanism funding stream mechanism है: [ZIP 207](https://zips.z.cash/zip-0207) ने block subsidy के एक हिस्से को निर्धारित recipients तक भेजने का सामान्य तरीका प्रस्तुत किया, और [ZIP 214](https://zips.z.cash/zip-0214) ने Development Fund के लिए विशिष्ट rules और recipient addresses तय किए।

## पैसे का बँटवारा कैसे होता है

Development Fund हर block reward का 20 प्रतिशत लेता है। बाकी 80 प्रतिशत miners के पास रहता है। फिर उस 20 प्रतिशत को ZIP 1014 के अनुसार तीन हिस्सों में बाँटा जाता है।

1. 35 प्रतिशत Bootstrap Project को, जो Electric Coin Company की parent organization है।
2. 25 प्रतिशत Zcash Foundation को।
3. 40 प्रतिशत Major Grants को, जो independent work को fund करता है और जिसका प्रशासन Zcash Foundation करती है। Major Grants बाद में Zcash Community Grants (ZCG) बन गया।

अगर इन्हें केवल fund की बजाय पूरे block reward के अनुपात में मापा जाए, तो ये हिस्से Electric Coin Company के लिए 7 प्रतिशत, Zcash Foundation के लिए 5 प्रतिशत, और Major Grants के लिए 8 प्रतिशत बनते हैं। इसे बताने के दोनों तरीके एक ही संख्याएँ दर्शाते हैं।

![Development Fund हर block reward का 20 प्रतिशत है, जिसमें 35 प्रतिशत Bootstrap और Electric Coin Company को, 25 प्रतिशत Zcash Foundation को, और 40 प्रतिशत Major Grants को जाता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Sprout pool में बदलाव

Canopy ने सबसे पुराने shielded pool को retire करना भी शुरू किया। Sprout, Zcash का पहला shielded pool था, और Canopy ने [ZIP 211](https://zips.z.cash/zip-0211) के माध्यम से इसे धीरे-धीरे बंद करने की प्रक्रिया शुरू की।

Canopy के सक्रिय होते ही, Sprout pool में कोई नया value नहीं जोड़ा जा सकता। तकनीकी रूप से, हर JoinSplit का `vpub_old` field शून्य होना चाहिए। जो funds पहले से Sprout में हैं उन्हें अब भी निकाला जा सकता है, इसलिए कोई भी locked out नहीं होता, लेकिन अब यह pool केवल छोटा ही हो सकता है। यह legacy Sprout pool को eventually deprecate करके नए shielded pools के पक्ष में जाने की दिशा में पहला कदम है।

![Canopy से पहले value Sprout pool में जा भी सकता था और बाहर भी आ सकता था। Canopy के बाद कोई नया value अंदर नहीं जा सकता, लेकिन withdrawals अभी भी अनुमति हैं](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## तकनीकी अतिरिक्त बातें

Funding changes के साथ, Canopy में दो छोटे technical ZIPs भी शामिल थे। [ZIP 212](https://zips.z.cash/zip-0212) ने यह बदला कि कोई recipient, Sapling ephemeral secret को कैसे derive करता है, और इसे note plaintext से derive किया। [ZIP 215](https://zips.z.cash/zip-0215) ने Ed25519 signatures को validate करने के लिए स्पष्ट rules लिखे, ताकि हर नोड ठीक-ठीक इस बात पर सहमत हो कि कौन-सी signatures valid मानी जाएँगी।

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

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [Heartwood](../zcash-tech/heartwood) · अगला: [NU5](../zcash-tech/nu5)

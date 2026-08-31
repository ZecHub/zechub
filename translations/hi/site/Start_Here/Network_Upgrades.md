# Zcash नेटवर्क अपग्रेड

Zcash नेटवर्क अपग्रेड के माध्यम से बेहतर होता है: नियमों में समन्वित बदलाव, जिन पर हर नोड सहमत होता है, और जिनमें से प्रत्येक एक निर्धारित block height पर सक्रिय होता है। नीचे दिए गए हर अपग्रेड का अपना एक पेज है, जो सरल भाषा में बताता है कि उसमें क्या बदला और क्यों। Zcash में नए हैं? इन्हें Sprout से Ironwood तक क्रम से पढ़ें।

इन अपग्रेड्स के दौरान Zcash की privacy कैसे विकसित हुई, इसकी दृश्यात्मक कहानी के लिए [Privacy का विकास](https://zechub.wiki/zcash-evolution) देखें। यह पेज सूचकांक है। वह पेज timeline है।

| Upgrade | Activation (UTC) | Block | Branch id | क्या बदला |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 अक्टूबर, 2016 | genesis | 00000000 | शुरुआत: पहला shielded pool और zk-SNARK private transactions |
| [Overwinter](../zcash-tech/overwinter) | 26 जून, 2018 | 347,500 | 5ba81b19 | Replay protection, transaction versioning, और expiry, ताकि सुरक्षित अपग्रेड संभव हो सके |
| [Sapling](../zcash-tech/sapling) | 29 अक्टूबर, 2018 | 419,200 | 76b809bb | कुशल shielded transactions, जो फ़ोन और hardware wallets के लिए पर्याप्त तेज़ थे |
| [Blossom](../zcash-tech/blossom) | 11 दिसंबर, 2019 | 653,600 | 2bb40e60 | तेज़ blocks, लगभग 75 सेकंड, और अधिक throughput |
| [Heartwood](../zcash-tech/heartwood) | 16 जुलाई, 2020 | 903,000 | f5b9230b | Shielded mining rewards और हल्के clients (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 नवंबर, 2020 | 1,046,400 | e9ff75a6 | Development Fund, पहली halving, और Sprout pool को चरणबद्ध रूप से समाप्त करना |
| [NU5](../zcash-tech/nu5) | 31 मई, 2022 | 1,687,104 | c2d6d0b4 | Halo 2 पर Orchard pool (कोई trusted setup नहीं), unified addresses, और v5 transactions |
| [NU6](../zcash-tech/nu6) | 23 नवंबर, 2024 | 2,726,400 | c8e71055 | Deferred Dev Fund Lockbox और development funding का नया विभाजन |
| [NU6.1](../zcash-tech/nu6-1) | 24 नवंबर, 2025 | 3,146,400 | 4dec4df0 | उस funding पर community और coin-holder governance |
| [NU6.2](../zcash-tech/nu6-2) | 3 जून, 2026 | 3,364,600 | 5437f330 | एक आपातकालीन सुधार जिसने Orchard circuit को ठीक किया |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 जुलाई, 2026 | 3,428,143 | 37a5165b | Ironwood pool और एक सार्वजनिक turnstile जो किसी को भी supply का audit करने देता है |

तिथियाँ UTC में दिखाई गई हैं। कुछ dashboards इन्हें स्थानीय समय में दिखाते हैं, लेकिन block और क्षण वही रहते हैं। हर upgrade के लिए निश्चित trigger उसकी activation block height होती है, कैलेंडर तिथि नहीं: Ironwood block 3,428,143 पर activate हुआ था। एक भविष्य का upgrade, NU7, अभी भी योजना चरण में है और वह Ironwood जैसा नहीं है।

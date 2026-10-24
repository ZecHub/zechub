<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Crosslink Feature Net में शामिल हों

## संक्षेप में

- Feature Net, Shielded Labs का [Crosslink](/zcash-tech/crosslink-protocol) के लिए सार्वजनिक परीक्षण नेटवर्क है—यह प्रस्तावित finality लेयर है, जो Zcash के proof-of-work के साथ staking जोड़ती है।
- यह cTAZ नामक परीक्षण कॉइन पर चलता है। इस पर आपका कोई भी कार्य mainnet ZEC को न तो स्थानांतरित करता है और न जोखिम में डालता है।
- एक desktop app ही नोड, miner, wallet और finalizer है। यह डिफ़ॉल्ट रूप से cTAZ mine करता है और इसमें faucet बटन है।
- Staking, unstaking और निकासी केवल "Staking Day" के दौरान काम करते हैं—हर तीन दिनों में एक दिन। इसे चूकने पर अगले दिन की प्रतीक्षा करनी होगी।
- Stake करने के लिए, आप finalizer की identity चिपकाते हैं और एक राशि पर क्लिक करते हैं। यह मार्गदर्शिका उदाहरण के रूप में ZecHub के finalizer का उपयोग करती है।
- दो RPC calls आपकी स्थिति दिखाती हैं: `wallet_staking_positions` और `get_tfl_recency_status`।

*Feature Net version 14 के साथ Windows 11 (version 10.0.26200.9550) पर 8 से 10 अक्टूबर 2026 तक परीक्षण किया गया। सॉफ्टवेयर एक prototype है और हर release के साथ बदलता है। यदि आपको दिखने वाली चीज़ इस पृष्ठ से अलग हो, तो अपने स्वयं के run पर भरोसा करें और कृपया एक PR खोलें।*

## Feature Net क्या है

Crosslink एक प्रस्ताव है, आज Zcash का हिस्सा नहीं। Shielded Labs का [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) कहता है कि mainnet तक पहुँचने से पहले इसे "मानक Zcash governance प्रक्रिया से गुजरना होगा"। [Crosslink Protocol](/zcash-tech/crosslink-protocol) पृष्ठ डिज़ाइन की व्याख्या करता है।

वास्तविक उपयोगकर्ताओं के साथ डिज़ाइन आज़माने के लिए, Shielded Labs उन चीज़ों को चलाता है जिन्हें वह [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) कहता है: "incentivized testnets की एक श्रृंखला"। नेटवर्क पर तीन भूमिकाएँ होती हैं, और desktop app उन सभी को निभा सकता है:

| भूमिका | यह क्या करती है |
|---|---|
| Miner | आज के Zcash की तरह proof-of-work blocks बनाता है |
| Staker | cTAZ को delegation bond में लॉक करता है और उसे एक finalizer की ओर निर्देशित करता है |
| Finalizer | blocks को final करने के लिए वोट करता है। इसकी voting power इसे delegated stake होती है |

इसके पीछे का repository एक अस्वीकरण से शुरू होता है, जिसे कुछ भी install करने से पहले पढ़ना उचित है: यह "production engineering प्रदर्शित करने के लिए नहीं, बल्कि विचारों को सिद्ध करने के लिए मौजूद है" और "production-ready code नहीं है" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md))। इसे ऐसी मशीन पर चलाएँ जहाँ यह स्वीकार्य हो।

### Version 14 में क्या बदला

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) 1 अक्टूबर 2026 को जारी हुआ। इसका नेटवर्क सामान्य proof-of-work के रूप में शुरू होता है और तीन चरणों में Crosslink चालू करता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), [ctaz.cash](https://ctaz.cash/v14) पर भी दिखाया गया है):

| Block | क्या होता है |
|---|---|
| 20,736 | Staking खुलती है |
| 34,560 | finalizers का पहला roster chain पर मौजूद stakes से लिया जाता है |
| 36,288 | BFT finality शुरू होती है, और उसके साथ staking rewards भी |

Staking rewards इनमें से आखिरी block से शुरू होते हैं। उससे पहले बनाया गया bond तब तक कुछ नहीं कमाता ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508))।

इसी release ने सक्रिय roster को सबसे अधिक stake वाले 12 finalizers तक सीमित किया ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) और release notes के शब्दों में उन्हें commission दिया: "एक block के सभी PoS Rewards में से 10% इन commissions को जाता है, जबकि 90% सभी staking bonds में वितरित किया जाता है"।

### cTAZ और वास्तविक ZEC

cTAZ ("Crosslink TAZ") Feature Net का परीक्षण कॉइन है। आप cTAZ stake करते हैं, कभी ZEC नहीं।

वास्तविक ZEC केवल अंत में आता है। Shielded Labs ने feature nets के लिए [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) अलग रखे हैं, और [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) कहते हैं कि इसका भुगतान "केवल mining या staking से प्रत्येक participant द्वारा अर्जित cTAZ की राशि के आधार पर pro rata आधार पर" होता है। इसके दो परिणाम हैं:

- **Faucet coins की गणना नहीं होती।** Faucet या किसी और से मिले cTAZ को अपने wallet में रखने भर से कुछ नहीं मिलता। केवल mining और staking से मिलने वाले block rewards गिने जाते हैं।
- **Payouts claim किए जाते हैं, स्वचालित नहीं होते।** Shielded Labs प्रत्येक round की घोषणा [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) में करता है। Round 2 के लिए इसने participants से 4 अक्टूबर 2026 तक अपने wallet की viewing key और एक mainnet address भेजने को कहा था ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94))। version 14 जिस नेटवर्क पर चलता है, जिसमें यह मार्गदर्शिका शामिल होती है, उसकी घोषणा Round 3 के रूप में की गई थी ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101))।

## शुरू करने से पहले

- **ऐसा कंप्यूटर जिसे आप चालू छोड़ सकते हों।** Release में Windows, macOS, Ubuntu और Arch Linux के लिए builds हैं। यह मार्गदर्शिका Windows पर, Intel Core i5-8350U processor वाले PC पर चलाई गई थी।
- **एक Staking Day।** कोई योजना बनाने से पहले जाँच लें कि अगला दिन कब खुलता है। [Staker Space's dashboard](https://crosslink.staker.space/) इसके लिए उलटी गिनती दिखाता है।
- **और कुछ नहीं।** न ZEC, न account और न sign-up।

## चरण 1: App डाउनलोड करें और file जाँचें

1. [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) खोलें और **Assets** तक नीचे scroll करें।
2. अपने system के लिए file डाउनलोड करें। Windows पर वह `zebrad_v14_win32.exe` है।
3. File के SHA-256 की तुलना उस digest से करें जो GitHub उस asset के पास दिखाता है।

Windows पर, PowerShell में:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

उस file के लिए GitHub जो digest दिखाता है वह `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e` है। Hex में uppercase/lowercase का भेद नहीं होता, इसलिए ऊपर के capital letters ठीक हैं। अपनी आँखों के बजाय shell से तुलना करवाने के लिए:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

जानें कि यह जाँच कितनी उपयोगी है। Release में कोई signature नहीं है, इसलिए matching hash केवल यह बताता है कि डाउनलोड पूर्ण है और वह वही file है जो GitHub प्रदान कर रहा है। यह नहीं बताता कि इसे किसने बनाया। [Verifying Zcash Releases](/guides/verifying-zcash-releases) अंतर समझाता है।

## चरण 2: नोड शुरू करें और इसे sync होने दें

App को terminal से शुरू करें ताकि उसके startup messages स्क्रीन पर बने रहें। सामान्य PowerShell window का उपयोग करें, "Run as administrator" से खोली गई window का नहीं: यह unsigned prototype software है और इसे administrator अधिकारों की ज़रूरत नहीं है।

```powershell
.\zebrad_v14_win32.exe
```

"Zcash Crosslink Visualizer" शीर्षक वाली window खुलती है। बाईं ओर **Your Wallet** और **Faucet Wallet** tabs के साथ wallet है, बीच में chain दिखाई जाती है और दाईं ओर finalizers सूचीबद्ध हैं। Terminal नोड का log print करता रहता है। नेटवर्क उपयोग करते समय दोनों को खुला रखें।

Release notes में [video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk) का लिंक है।

Release notes के अनुसार app अपना data cache folder में रखता है: `%LOCALAPPDATA%\zebra` Windows पर, `~/.cache/zebra` Linux पर और macOS पर `~/Library/Caches/zebra`।

**Secret केवल अपने तक रखें।** उस folder में `secret.seed` नाम की file होती है। App इसे पहले start पर बनाता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) और इससे आपका wallet तथा आपकी finalizer identity derive करता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626))। App में **Copy Seed** बटन भी है, जो वही secret आपके clipboard में रख देता है। जिसके पास इनमें से कोई भी हो, वह आपके wallet को नियंत्रित करता है। उन्हें कभी chat, forum post या screenshot में paste न करें।

### कैसे जानें कि आप synced हैं

Release notes कहते हैं कि "नेटवर्क tip से आप कितने करीब synced हैं, इसके लिए कोई built-in monitoring नहीं है"। Version 14 में कुछ है: window के ऊपर **Network Info** drop-down में PoW Height, Wallet Sync और Blocks Behind Known PoW की rows हैं ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373))। अपनी height की तुलना [Staker Space](https://crosslink.staker.space/) या [ctaz.cash](https://ctaz.cash/) पर मौजूद height से करें।

नोड RPC पर भी उत्तर देता है:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

इस build में RPC port `127.0.0.1:8232` डिफ़ॉल्ट रूप से खुला है और उसे password की आवश्यकता नहीं है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337))। यह केवल आपकी अपनी मशीन पर listen करता है, और उस मशीन पर चल रही कोई भी चीज़ इसे call कर सकती है।

इस run में block 0 से लगभग block 28,400 पर tip तक पहली sync में लगभग 50 मिनट लगे।

**Restart के बाद कुछ समय के लिए आपका balance zero दिखता है।** App हर बार शुरू होने पर `secret.seed` से wallet फिर बनाता है और chain को block 0 से दोबारा scan करता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623))। Scan आपके transactions तक पहुँचने तक आपका balance और stake 0 दिखते हैं। इस run में restart के लगभग 15 मिनट बाद वे वापस दिखे। Faucet का wallet भी इसी तरह rescan होता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), और scan के दौरान Faucet Wallet tab ने बहुत बड़ा balance दिखाया। Wallet Sync पूर्ण होने तक दोनों को अनदेखा करें।

## चरण 3: कुछ cTAZ प्राप्त करें

### इसे mine करें

Release notes के अनुसार, app sync होते ही आपके अपने wallet में CPU mining शुरू करता है। आपको कुछ भी चालू नहीं करना पड़ता। Mined coins आपके अपने wallet के transparent address पर जाते हैं ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355))।

यह block ढूँढता है या नहीं, यह अलग बात है। Notes चेतावनी देते हैं कि "आपसे तेज़ mine करने वालों से आप पीछे रह सकते हैं, इसलिए सफलता की कोई गारंटी नहीं है"। डिफ़ॉल्ट रूप से built-in miner एक CPU thread उपयोग करता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100))।

अधिक threads उपयोग करने के लिए app शुरू करने से पहले उसी PowerShell window में environment variable सेट करें ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128))। इस run में चार का उपयोग हुआ:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

यह variable केवल उस window के खुले रहने तक रहता है। इसे सेट करने पर Windows के processor counter ने नोड को चार से पाँच processors के समय के बराबर उपयोग करते दिखाया, एक logical processor के प्रतिशत में:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

परिणाम: चार threads पर mine करते हुए Intel Core i5-8350U को 8 अक्टूबर की शुरुआत से 9 अक्टूबर की दोपहर तक कोई block नहीं मिला।

### या faucet का उपयोग करें

App में नीचे दाईं ओर **Receive cTAZ** बटन है। Version 14 source में, एक press faucet के wallet से आपके wallet में 0.5 cTAZ भेजती है ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021))। Faucet एक ही wallet है जिसे app की हर copy में शामिल किया गया है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), और **Faucet Wallet** tab उसका balance दिखाता है।

बटन तब तक बंद रहता है जब तक faucet के पास shielded coins में 5.01 cTAZ से अधिक न हों ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989))। Tab faucet के mined coins भी गिनता है, और वे केवल ठीक 10 cTAZ plus fee के lots में shielded होते हैं ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), इसलिए tab बहुत कुछ दिखा सकता है जबकि बटन grey बना रहता है। इस run में 8 और 9 अक्टूबर को यह grey रहा; hover करने पर "The faucet is mining more funds." दिखा, जबकि tab में 14.74695 cTAZ थे।

**जब बटन grey हो, तो अपने नोड से पूछें।** नोड में faucet request method, `requestfaucetdonation` है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), जो बटन का 5.01 cTAZ नियम लागू नहीं करती। `YOUR_ADDRESS` के स्थान पर अपना address रखें (नीचे `wallet_spendable_funds` का `address` field है):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

इस उत्तर का अर्थ है कि request queue में डाली गई, यह नहीं कि भेजी जा चुकी है। इस run में faucet का 0.5 cTAZ block 33,306 में mine हुआ और block 33,322 पर spendable बना। एक बार पूछें: faucet साझा है, और उसी address के लिए दूसरी request तब तक अस्वीकार होती है जब तक पहली pending हो ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553))।

### या किसी दूसरे participant से पूछें

नेटवर्क पर कोई भी app के **Send** बटन से आपको cTAZ भेज सकता है। इस run में दूसरे participant ने 31 cTAZ भेजे। यह "send from user wallet" note के साथ "Received" के रूप में पहुँचा, जो app का अपना Send जोड़ता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036))। [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) में पूछें और केवल अपना address दें।

Faucet coins और gifts staking सीखने के लिए पर्याप्त हैं। वे ZEC rewards में नहीं गिने जाते।

### जाँचें कि आप क्या खर्च कर सकते हैं

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Faucet का 0.5 cTAZ आने के बाद, address छोटा करके, यह उत्तर मिला:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Amounts zatoshis में होते हैं: 100,000,000 से एक cTAZ बनता है। Shielded coins को spendable होने के लिए 3 confirmations चाहिए ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634))। Faucet और अन्य participants के coins `spendable_zats` में आते हैं। Mined coins transparent होते हैं, इसलिए वे `unshielded_zats` में आते हैं ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659))।

इस run में दूसरे stake के एक block बाद, balance का शेष भाग `pending_zats` के अंतर्गत दिखा। कुछ blocks बाद वह फिर spendable हो गया।

## चरण 4: किसी finalizer को stake करें

### Staking Day की प्रतीक्षा करें

Staking, unstaking और निकासी केवल तब स्वीकार होते हैं जब

```text
block height mod 10,368 < 3,456
```

जो हर 10,368 blocks की शुरुआत में 3,456 blocks की window है। नेटवर्क के 25-second block target पर यह हर तीन दिनों में एक दिन है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547))। Version 14 की पहली windows blocks 20,736, 31,104, 41,472 और 51,840 पर खुलती हैं।

Release notes के अनुसार app प्रत्येक Staking Day के आरंभ और अंत की घोषणा करता है। इस run में इसकी block list ने blocks 34,559 और 34,560 के बीच लाल "* STAKING DAY END *" line दिखाई।

**Release notes दो बातें कहते हैं।** उनके changes की list "~1 day for Staking Day and ~3 days for the Staking Cycle" देती है, जो code से मेल खाती है। नीचे Season 1 से लाया गया section अभी भी कहता है कि Staking Day हर 150 blocks पर शुरू होता है और 70 blocks तक रहता है। पहले वाले नियम का अनुसरण करें। ऊपर की end line वहीं है जहाँ पहला नियम window बंद करता है (34,560 mod 10,368 = 3,456); दूसरे नियम में block 34,560 एक window के भीतर होता।

### एक finalizer चुनें

एक finalizer को उसकी identity से नामित किया जाता है, जो `zfinv1` से शुरू होने वाली string है। ZecHub, [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) में अपने चलाए जाने वाले finalizer की identity प्रकाशित करता है:

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

जिस source पर आप भरोसा करते हैं, उससे identity copy करें। Release notes के अनुसार app दाएँ panel में finalizers भी सूचीबद्ध करता है, और प्रत्येक के बाईं ओर copy icon होता है।

Stake करने के बाद wallet history और RPC finalizer को उसकी identity के बजाय hex key से नाम देते हैं। ZecHub के finalizer के लिए वह key `2941ef23...266aae8f` है।

ऐसा finalizer चुनें जिस पर आपको भरोसा हो। डिज़ाइन में automatic slashing नहीं है, लेकिन यह "user-coordinated hard fork जो किसी नामित finalizer को delegated सभी stake को जला दे" की अनुमति देता है ([Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html))।

चुनाव यह भी तय करता है कि कौन वोट करेगा। प्रत्येक active bond को staking reward का अपना हिस्सा मिलता है। यदि उसका finalizer 12 के roster में है, तो उस हिस्से का दसवाँ भाग commission के रूप में finalizer को जाता है। 12 से बाहर के finalizer की ओर निर्देशित bond अपना पूरा हिस्सा रखता है, लेकिन वह finalizer वोट नहीं करता ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079))।

### Stake करें

1. Finalizer identity copy करें।
2. **Your Wallet** tab पर **Stake** दबाएँ।
3. **Paste Identity** दबाएँ। बटन के ऊपर की line identity के पहले और अंतिम characters में बदलती है, ZecHub की identity के लिए `[zfinv1j6..YWyzp4YN]`। आगे बढ़ने से पहले जाँच लें।
4. एक amount पर क्लिक करें। Amounts तय steps में होते हैं, सबसे छोटा 0.01 cTAZ है, और केवल वे amounts प्रकाशित होते हैं जिन्हें आपका balance cover करता है। 0.5 cTAZ के साथ +0.01 cTAZ और +0.1 cTAZ प्रकाशित थे।

**कोई आपसे confirmation नहीं माँगता, और कुछ होता हुआ नहीं लगता।** इस run में tester के शब्दों में: "I clicked it once and nothing happened, it just turned grey and lit up back." Stake हो चुका था। Wallet history में "Staked @ 33334 to 2941ef23..266aae8f" दिखा, fee 0.00015 cTAZ थी और wallet ने 0.010 cTAZ Staked दिखाया। कुछ मिनट बाद किए गए दूसरे stake ने block 33,348 पर दूसरा bond बनाया।

हर stake अपना delegation bond बनाता है। Fixed amounts और Staking Day दोनों privacy के लिए हैं: वे एक व्यक्ति के stake को दूसरे के stake से अलग पहचानना कठिन बनाते हैं।

## चरण 5: अपनी स्थिति जाँचें

### आपके bonds

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Stake करने के दो दिन बाद, block 36,490 पर यह उत्तर था:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

Call कोई parameters नहीं लेता। यह आपके active bonds लौटाता है, हर bond को समर्थन देने वाले finalizer की key के अंतर्गत group करके, और उन bonds को भी लौटाता है जो unstaking पूर्ण कर चुके हैं और निकाले जा सकते हैं। हर bond staked amount (`initial_val`), उसका वर्तमान value (`latest_val`), और उसे बनाने वाला transaction तथा block height दिखाता है। Rewards bond में ही जोड़े जाते हैं: block 36,490 तक 1,000,000 zatoshis का प्रत्येक bond बढ़कर 1,003,451 हो गया था।

**Edit Stake window हर bond को दस गुना बड़ा दिखाती है।** इस run में प्रत्येक 0.01 cTAZ bond अपनी row पर 0.100 cTAZ पढ़ता था, और rewards शुरू होने पर 0.1003536 cTAZ, जबकि rows के ऊपर totals (0.020 cTAZ, बाद में 0.02007 cTAZ) RPC से मेल खाते थे। Totals और RPC के अनुसार चलें।

उसी window ने finality शुरू होने से पहले और बाद दोनों समय finalizer के पास warning triangle दिखाया। Source में triangle का अर्थ है कि आपका app उस finalizer को online नहीं गिनता; online finalizer के बजाय Wi-Fi icon मिलता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648))। फिर भी bonds ने rewards कमाए।

### Finalizers

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Release notes के अनुसार, यह बताता है कि voting process में आपका नोड कहाँ है और प्रत्येक finalizer के लिए आपका नोड उससे आखिरी बार कब सुन पाया तथा उसने कैसे vote किया है।

Block 36,288 से पहले हर field zero होती है और list खाली होती है। Block 33,354 पर यह उत्तर था:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Finality शुरू होने के बाद list में roster के finalizers होते हैं। Block 36,490 पर इसमें 12 थे, जिनमें ZecHub का `2941ef23...` भी था, जो 12 की roster limit से मेल खाता है। यह उस उत्तर की शुरुआत है, पहले entry के बाद काट दिया गया है:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

कुछ मिनट बाद app के दाएँ panel ने "Finalizers (23)" दिखाया।

### Linux और macOS पर

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) call को `curl` रूप में देता है। अन्य calls के लिए method name बदलें। इस form को इस मार्गदर्शिका के लिए नहीं चलाया गया:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Linux पर release notes कहते हैं कि app में copy और paste काम करने से पहले संभवतः आपको `xclip` install करना होगा।

### ध्यान रखने योग्य एक RPC name

Version 14 release notes `wallet_staking_action` नाम की एक staking call बताते हैं, जो एक object लेती है। Version 14 source code में उस नाम का कोई method नहीं है, और इस run में नोड ने उत्तर दिया:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

यह जिस staking method को register करता है वह [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420) है, जो JSON के रूप में request रखने वाली एक string लेता है; इसमें finalizer को उसकी `zfinv1` identity से दिया जाता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760))। इसे इस मार्गदर्शिका के लिए नहीं आज़माया गया।

## Unstake और withdraw

जिस दिन bond बनाया जाता है, उसे उसी दिन वापस नहीं लिया जा सकता। शुरू से अंत तक तीन Staking Days लगते हैं: एक में stake करें, बाद के किसी दिन unstake करें और तीसरे में withdraw करें। Release notes यह भी जोड़ते हैं कि एक bond एक ही Staking Day में दो staking actions नहीं कर सकता।

*इस मार्गदर्शिका के लिए नहीं चलाया गया। Version 14 release notes से:* unstake करने के लिए **Edit Stake** दबाएँ, Staked Bonds list से bond चुनें और chain-link icon पर क्लिक करें। बाद के Staking Day में withdraw करने के लिए **Edit Stake** दबाएँ, Withdrawable Bonds list से bond चुनें और money icon पर क्लिक करें। किसी bond को दूसरे finalizer में ले जाना, जिसे notes retargeting कहते हैं, किसी भी समय स्वीकार्य है।

## नेटवर्क कहाँ देखें

[Crosslink tab, ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) पर, tools को एक जगह इकट्ठा करता है, उस notice के अंतर्गत जिसमें लिखा है "इस नेटवर्क पर staking से ZEC नहीं चलता":

- Hosted, किसी नोड की आवश्यकता नहीं: [Staker Space](https://crosslink.staker.space/), एक "current cTAZ testnet के लिए live dashboard", जिसमें height, miners, solution rate, Staking Day countdown और finality हैं; और [ctaz.cash](https://ctaz.cash/), जिसमें mining production, finalizer roster, peers और staking-address name claims हैं।
- अपनी मशीन पर: `zcash-explorer`, जिसका `/live/crosslink` पृष्ठ activation, finality lag, roster और staking positions दिखाता है; और `crosslink_indexer`, Crosslink नोड का SQLite index।

## सामान्य गलतियाँ

**Block height के बजाय घड़ी के अनुसार योजना बनाना।** Staking Days को blocks में गिना जाता है। Calendar नहीं, dashboard की countdown देखें।

**Window के आखिरी मिनटों में stake करना।** नियम उस block के विरुद्ध जाँचा जाता है जिसमें आपका transaction शामिल होता है ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), इसलिए window बंद होने से पहले stake का mine होना चाहिए, केवल भेजा जाना नहीं।

**अपना stake mine करने की उम्मीद करना।** Intel Core i5-8350U पर four-thread CPU miner को 8 और 9 अक्टूबर के बीच कोई block नहीं मिला। अपना पहला cTAZ faucet या किसी दूसरे participant से लें।

**कुछ होता हुआ न दिखने पर फिर क्लिक करना।** Amount पर हर क्लिक एक नया bond है। पहले wallet history या `wallet_staking_positions` जाँचें।

**Restart के बाद घबरा जाना।** Wallet के rescan होने तक आपका balance और stake zero दिखते हैं। Wallet Sync समाप्त होने की प्रतीक्षा करें।

**cTAZ को खेल का पैसा, या secret को हानिरहित मानना।** cTAZ परीक्षण कॉइन है, लेकिन आपके अर्जित cTAZ से वास्तविक ZEC में आपका हिस्सा तय होता है। `secret.seed` की सुरक्षा वैसे करें जैसे wallet की करते हैं।

**पुराने निर्देश पढ़ना।** Release notes में नए नियमों के साथ पहले seasons का text भी है। जहाँ वे आपके नोड के व्यवहार से असहमत हों, आपका नोड सही है।

## संबंधित पृष्ठ

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - वह डिज़ाइन जिसका यह नेटवर्क परीक्षण करता है
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslink के पीछे की टीम
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - checksum क्या सिद्ध करता है और क्या नहीं
- [Zebra Full Node](/zcash-tech/zebra-full-node) - वह नोड जिस पर Feature Net app बनाया गया है
- [Zcash Testnet](/using-zcash/testnet) - सामान्य Zcash परीक्षण नेटवर्क, जो एक अलग नेटवर्क है

## स्रोत

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 अक्टूबर 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 अप्रैल 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*इस पृष्ठ के चरण Feature Net version 14 के साथ Windows 11 (version 10.0.26200.9550) पर 8 से 10 अक्टूबर 2026 तक चलाए गए थे। ऐसा कथन जो release notes या source code का उल्लेख करता है, उनसे लिया गया है। "not run" चिह्नित किसी भी चीज़ को आज़माया नहीं गया था।*

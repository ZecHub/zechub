<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Feature Net में भागीदारी

## TL;DR

- Feature Net, [Crosslink](/zcash-tech/crosslink-protocol) के लिए Shielded Labs का सार्वजनिक टेस्ट नेटवर्क (test network) है। यह प्रस्तावित फ़ाइनैलिटी लेयर (finality layer) है, जो Zcash के प्रूफ-ऑफ-वर्क (proof-of-work) के साथ स्टेकिंग (staking) जोड़ती है।
- यह एक टेस्ट कॉइन, cTAZ, पर चलता है। इस पर आप जो कुछ भी करते हैं, उससे मेननेट (mainnet) ZEC न तो स्थानांतरित होता है और न ही जोखिम में पड़ता है।
- एक ही डेस्कटॉप ऐप नोड (node), माइनर (miner), वॉलेट (wallet) और फाइनलाइज़र (finalizer) है। यह डिफ़ॉल्ट रूप से cTAZ की माइनिंग (mining) करता है और इसमें एक फॉसेट (faucet) बटन है।
- स्टेकिंग, अनस्टेकिंग और निकासी केवल “Staking Day” के दौरान ही काम करते हैं, जो हर तीन दिनों में एक दिन होता है। यदि आप इसे चूक जाते हैं, तो आपको अगले दिन की प्रतीक्षा करनी होगी।
- स्टेक करने के लिए, आप किसी फाइनलाइज़र की पहचान पेस्ट करते हैं और एक राशि पर क्लिक करते हैं। यह गाइड उदाहरण के रूप में ZecHub के फाइनलाइज़र का उपयोग करती है।
- दो RPC कॉल दिखाते हैं कि आपकी स्थिति क्या है: `wallet_staking_positions` और `get_tfl_recency_status`।

*Windows 11 (संस्करण 10.0.26200.9550) पर Feature Net संस्करण 14 के साथ 8 से 10 अक्टूबर 2026 तक परीक्षण किया गया। यह सॉफ़्टवेयर एक प्रोटोटाइप है और हर रिलीज़ के साथ बदलता है। यदि आपको इस पेज से कुछ अलग दिखाई देता है, तो अपने स्वयं के रन पर भरोसा करें और कृपया एक PR खोलें।*

## Feature Net क्या है

Crosslink एक प्रस्ताव है, आज Zcash का हिस्सा नहीं है। Shielded Labs का [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) कहता है कि मेननेट तक पहुँचने से पहले इसे “मानक Zcash गवर्नेंस (governance) प्रक्रिया से गुज़रना होगा”। [Crosslink Protocol](/zcash-tech/crosslink-protocol) पेज इसके डिज़ाइन की व्याख्या करता है।

वास्तविक उपयोगकर्ताओं के साथ इस डिज़ाइन को आज़माने के लिए Shielded Labs वह चलाता है जिसे वह [प्रोत्साहन-आधारित फ़ीचर नेट](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) कहता है: “प्रोत्साहन-आधारित टेस्टनेट की एक श्रृंखला”। नेटवर्क पर तीन भूमिकाएँ होती हैं, और डेस्कटॉप ऐप ये तीनों निभा सकता है:

| भूमिका | यह क्या करता है |
|---|---|
| माइनर | प्रूफ-ऑफ-वर्क ब्लॉक (block) बनाता है, जैसा आज Zcash पर होता है |
| स्टेकर | cTAZ को एक डेलिगेशन बॉन्ड (bond) में लॉक करता है और उसे किसी फाइनलाइज़र की ओर निर्देशित करता है |
| फाइनलाइज़र | ब्लॉक को फ़ाइनलाइज़ करने के लिए वोट देता है। इसकी वोटिंग शक्ति उसे डेलिगेट की गई स्टेक होती है |

इसके पीछे की रिपॉज़िटरी एक अस्वीकरण से शुरू होती है, जिसे कुछ भी इंस्टॉल करने से पहले पढ़ना उचित है: यह “विचारों को सिद्ध करने के लिए मौजूद है, प्रोडक्शन इंजीनियरिंग प्रदर्शित करने के लिए नहीं” और “प्रोडक्शन के लिए तैयार कोड नहीं है” ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md))। इसे ऐसी मशीन पर चलाएँ जहाँ यह स्वीकार्य हो।

### संस्करण 14 में क्या बदला

[संस्करण 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) 1 अक्टूबर 2026 को जारी हुआ। इसका नेटवर्क सामान्य प्रूफ-ऑफ-वर्क के रूप में शुरू होता है और तीन चरणों में Crosslink को चालू करता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), [ctaz.cash](https://ctaz.cash/v14) पर भी दिखाया गया है):

| ब्लॉक | क्या होता है |
|---|---|
| 20,736 | स्टेकिंग खुलती है |
| 34,560 | फाइनलाइज़र का पहला रोस्टर चेन (chain) पर मौजूद स्टेक से लिया जाता है |
| 36,288 | BFT फ़ाइनैलिटी शुरू होती है, और उसके साथ स्टेकिंग पुरस्कार भी |

स्टेकिंग पुरस्कार इन ब्लॉक में से अंतिम ब्लॉक से शुरू होते हैं। उससे पहले बनाया गया बॉन्ड तब तक कुछ नहीं कमाता ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508))।

उसी रिलीज़ ने सक्रिय रोस्टर को सबसे अधिक स्टेक वाले 12 फाइनलाइज़र तक सीमित कर दिया ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) और, इसके रिलीज़ नोट के शब्दों में, उन्हें एक कमीशन दिया: “किसी ब्लॉक के सभी PoS पुरस्कारों का 10% इन कमीशन में जाता है, जबकि 90% सभी स्टेकिंग बॉन्ड में वितरित किया जाता है”।

### cTAZ और वास्तविक ZEC

cTAZ (“Crosslink TAZ”) Feature Net का टेस्ट कॉइन है। आप cTAZ स्टेक करते हैं, कभी ZEC नहीं।

वास्तविक ZEC केवल अंत में आता है। Shielded Labs ने फ़ीचर नेट के लिए [500 ZEC अलग रखे हैं](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), और [रिलीज़ नोट](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) कहते हैं कि इसका भुगतान “केवल उस cTAZ की मात्रा के आधार पर आनुपातिक रूप से किया जाता है, जो प्रत्येक प्रतिभागी ने माइनिंग या स्टेकिंग के माध्यम से अर्जित की”। इसके दो परिणाम हैं:

- **फॉसेट कॉइन की गिनती नहीं होती।** जो cTAZ आपको दिया गया, चाहे फॉसेट से या किसी और से, वह आपके वॉलेट में पड़े रहने से कुछ नहीं कमाता। केवल माइनिंग और स्टेकिंग से मिले ब्लॉक पुरस्कार गिने जाते हैं।
- **भुगतान का दावा करना पड़ता है, यह स्वचालित नहीं है।** Shielded Labs प्रत्येक राउंड की घोषणा [फ़ोरम थ्रेड](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) में करता है। राउंड 2 के लिए इसने प्रतिभागियों से 4 अक्टूबर 2026 तक अपने वॉलेट की व्यूइंग की (viewing key) और एक मेननेट एड्रेस (address) भेजने को कहा था ([पोस्ट 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94))। जिस नेटवर्क पर संस्करण 14 चलता है, यानी वह नेटवर्क जिससे यह गाइड जुड़ती है, उसे राउंड 3 के रूप में घोषित किया गया था ([पोस्ट 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101))।

## शुरू करने से पहले

- **एक कंप्यूटर जिसे आप चालू छोड़ सकें।** रिलीज़ में Windows, macOS, Ubuntu और Arch Linux के लिए बिल्ड उपलब्ध हैं। यह गाइड Windows पर, Intel Core i5-8350U प्रोसेसर वाले PC पर चलाई गई थी।
- **एक स्टेकिंग डे।** कुछ भी योजना बनाने से पहले जाँच लें कि अगला कब खुलता है। [Staker Space का डैशबोर्ड (dashboard)](https://crosslink.staker.space/) उसकी उलटी गिनती दिखाता है।
- **और कुछ नहीं।** न ZEC, न कोई खाता और न ही कोई साइन-अप।

## चरण 1: ऐप का डाउनलोड और फ़ाइल की जाँच

1. [संस्करण 14 रिलीज़](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) खोलें और **Assets** तक स्क्रॉल करें।
2. अपने सिस्टम के लिए फ़ाइल डाउनलोड करें। Windows पर यह `zebrad_v14_win32.exe` है।
3. फ़ाइल के SHA-256 की तुलना उस डाइजेस्ट से करें जो GitHub उस एसेट के बगल में दिखाता है।

Windows पर, PowerShell में:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

उस फ़ाइल के लिए GitHub जो डाइजेस्ट दिखाता है वह `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e` है। हेक्स में बड़े और छोटे अक्षरों का कोई अंतर नहीं होता, इसलिए ऊपर के बड़े अक्षर ठीक हैं। अपनी आँखों के बजाय शेल से तुलना करवाने के लिए:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

जानें कि इस जाँच का क्या मूल्य है। रिलीज़ के साथ कोई सिग्नेचर (signature) नहीं है, इसलिए मेल खाता हैश आपको बताता है कि डाउनलोड पूरा है और यह वही फ़ाइल है जो GitHub दे रहा है। यह आपको यह नहीं बताता कि इसे किसने बनाया। [Zcash रिलीज़ का सत्यापन](/guides/verifying-zcash-releases) इस अंतर को समझाता है।

## चरण 2: नोड की शुरुआत और सिंक

ऐप को टर्मिनल से शुरू करें, ताकि उसके स्टार्टअप संदेश स्क्रीन पर बने रहें। एक सामान्य PowerShell विंडो का उपयोग करें, “Run as administrator” से खोली गई विंडो का नहीं: यह बिना सिग्नेचर वाला प्रोटोटाइप सॉफ़्टवेयर है, और इसे एडमिनिस्ट्रेटर अधिकारों की आवश्यकता नहीं है।

```powershell
.\zebrad_v14_win32.exe
```

“Zcash Crosslink Visualizer” शीर्षक वाली एक विंडो खुलती है। वॉलेट बाईं ओर है, जिसमें **Your Wallet** और **Faucet Wallet** टैब हैं, बीच में चेन दिखाई जाती है, और दाईं ओर फाइनलाइज़र की सूची है। टर्मिनल नोड का लॉग प्रिंट करता रहता है। नेटवर्क का उपयोग करते समय दोनों को खुला रखें।

रिलीज़ नोट में [Windows इंस्टॉल का एक वीडियो](https://www.youtube.com/watch?v=cO-5Oa4B1Tk) लिंक किया गया है।

रिलीज़ नोट के अनुसार, ऐप अपना डेटा एक कैश फ़ोल्डर में रखता है: Windows पर `%LOCALAPPDATA%\zebra`, Linux पर `~/.cache/zebra` और macOS पर `~/Library/Caches/zebra`।

**सीक्रेट को अपने तक ही रखें।** उस फ़ोल्डर में `secret.seed` नाम की एक फ़ाइल होती है। ऐप पहली बार शुरू होने पर इसे बनाता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) और इसी से आपका वॉलेट और आपकी फाइनलाइज़र पहचान बनाता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626))। ऐप में एक **Copy Seed** बटन भी है जो वही सीक्रेट आपके क्लिपबोर्ड पर डाल देता है। जिसके पास इनमें से कोई भी हो, वह आपके वॉलेट को नियंत्रित करता है। इन्हें कभी किसी चैट, फ़ोरम पोस्ट या स्क्रीनशॉट में पेस्ट न करें।

### कैसे पता करें कि आप सिंक हो चुके हैं

रिलीज़ नोट कहते हैं कि “इसकी कोई अंतर्निहित निगरानी नहीं है कि आप नेटवर्क टिप के कितने करीब तक सिंक हैं”। संस्करण 14 में कुछ निगरानी है: विंडो के शीर्ष पर **Network Info** ड्रॉप-डाउन में PoW Height, Wallet Sync और Blocks Behind Known PoW की पंक्तियाँ हैं ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373))। अपनी ऊँचाई की तुलना [Staker Space](https://crosslink.staker.space/) या [ctaz.cash](https://ctaz.cash/) पर दिखाई गई ऊँचाई से करें।

नोड RPC के माध्यम से भी उत्तर देता है:

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

इस बिल्ड में RPC पोर्ट `127.0.0.1:8232` डिफ़ॉल्ट रूप से खुला है और इसे किसी पासवर्ड की आवश्यकता नहीं है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337))। यह केवल आपकी अपनी मशीन पर सुनता है, और उस मशीन पर चल रहा कोई भी प्रोग्राम इसे कॉल कर सकता है।

इस रन में पहला सिंक, ब्लॉक 0 से लगभग ब्लॉक 28,400 के टिप तक, लगभग 50 मिनट में पूरा हुआ।

**रीस्टार्ट के बाद कुछ समय तक आपका बैलेंस शून्य दिखता है।** हर बार ऐप शुरू होने पर यह `secret.seed` से वॉलेट को फिर से बनाता है और ब्लॉक 0 से चेन को फिर से स्कैन करता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623))। जब तक स्कैन आपके लेनदेन (transaction) तक नहीं पहुँचता, आपका बैलेंस और आपकी स्टेक 0 दिखाई देते हैं। इस रन में रीस्टार्ट के लगभग 15 मिनट बाद वे वापस आ गए। फॉसेट के वॉलेट को भी इसी तरह फिर से स्कैन किया जाता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), और स्कैन के दौरान Faucet Wallet टैब ने बहुत बड़ा बैलेंस दिखाया। Wallet Sync पूरा होने तक दोनों को अनदेखा करें।

## चरण 3: कुछ cTAZ की प्राप्ति

### माइनिंग से

रिलीज़ नोट के अनुसार, सिंक होने के बाद ऐप आपके अपने वॉलेट में CPU माइनिंग शुरू कर देता है। आपको कुछ भी चालू करने की आवश्यकता नहीं है। माइन किए गए कॉइन आपके अपने वॉलेट के एक ट्रांसपेरेंट (transparent) एड्रेस पर जाते हैं ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355))।

यह कोई ब्लॉक खोज पाएगा या नहीं, यह अलग बात है। नोट चेतावनी देते हैं कि “अधिक तेज़ी से माइनिंग करने वाले अन्य लोग आपसे आगे निकल सकते हैं, इसलिए सफलता की कोई गारंटी नहीं है”। डिफ़ॉल्ट रूप से अंतर्निहित माइनर एक ही CPU थ्रेड का उपयोग करता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100))।

अधिक थ्रेड का उपयोग करने के लिए, ऐप शुरू करने से पहले उसी PowerShell विंडो में एक एनवायरनमेंट वेरिएबल सेट करें ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128))। इस रन में चार का उपयोग किया गया:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

यह वेरिएबल केवल तब तक रहता है जब तक वह विंडो खुली है। इसे सेट करने पर, Windows के प्रोसेसर काउंटर ने दिखाया कि नोड चार से पाँच प्रोसेसर जितना समय उपयोग कर रहा था, एक लॉजिकल प्रोसेसर के प्रतिशत में:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

परिणाम: चार थ्रेड पर माइनिंग करते हुए एक Intel Core i5-8350U को 8 अक्टूबर की सुबह से 9 अक्टूबर की दोपहर तक कोई ब्लॉक नहीं मिला।

### या फॉसेट का उपयोग

ऐप में नीचे दाईं ओर एक **Receive cTAZ** बटन है। संस्करण 14 के सोर्स में, एक बार दबाने पर फॉसेट के वॉलेट से आपके वॉलेट में 0.5 cTAZ भेजे जाते हैं ([राशि](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [भेजना](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021))। फॉसेट एक ही वॉलेट है जो ऐप की हर कॉपी में मौजूद होता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), और **Faucet Wallet** टैब उसका बैलेंस दिखाता है।

यह बटन तब तक बंद रहता है जब तक फॉसेट के पास शील्डेड (shielded) कॉइन में 5.01 cTAZ से अधिक न हों ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989))। टैब फॉसेट के माइन किए गए कॉइन भी गिनता है, और वे केवल ठीक 10 cTAZ और एक शुल्क (fee) के लॉट में शील्ड किए जाते हैं ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), इसलिए टैब पर्याप्त राशि दिखा सकता है जबकि बटन ग्रे ही रहता है। इस रन में यह 8 और 9 अक्टूबर को ग्रे रहा, और उस पर होवर करने पर “The faucet is mining more funds.” दिखा, जबकि टैब 14.74695 cTAZ दिखा रहा था।

**जब बटन ग्रे हो, तो अपने स्वयं के नोड से पूछें।** नोड में एक फॉसेट अनुरोध मेथड है, `requestfaucetdonation` ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), जो बटन के 5.01 cTAZ नियम को लागू नहीं करता। `YOUR_ADDRESS` की जगह अपना एड्रेस डालें (यह `wallet_spendable_funds` का `address` फ़ील्ड है, नीचे देखें):

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

इस उत्तर का अर्थ है कि अनुरोध कतार में डाल दिया गया, यह नहीं कि उसे भेज दिया गया। इस रन में फॉसेट के 0.5 cTAZ ब्लॉक 33,306 पर माइन हुए और ब्लॉक 33,322 पर खर्च करने योग्य हो गए। केवल एक बार अनुरोध करें: फॉसेट साझा है, और पहला अनुरोध लंबित रहते हुए उसी एड्रेस के लिए दूसरा अनुरोध अस्वीकार कर दिया जाता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553))।

### या किसी अन्य प्रतिभागी से अनुरोध

नेटवर्क पर कोई भी व्यक्ति ऐप के **Send** बटन से आपको cTAZ भेज सकता है। इस रन में एक अन्य प्रतिभागी ने 31 cTAZ भेजे। वे “Received” के रूप में “send from user wallet” नोट के साथ आए, जो वही नोट है जिसे ऐप का अपना Send जोड़ता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036))। [फ़ोरम थ्रेड](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) में पूछें, और केवल अपना एड्रेस दें।

फॉसेट कॉइन और उपहार स्टेकिंग सीखने के लिए पर्याप्त हैं। वे ZEC पुरस्कारों में नहीं गिने जाते।

### खर्च योग्य राशि की जाँच

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

फॉसेट के 0.5 cTAZ आने के बाद यह उत्तर मिला, एड्रेस को छोटा करके दिखाया गया है:

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

राशियाँ ज़ैटोशी में हैं: 100,000,000 ज़ैटोशी से एक cTAZ बनता है। शील्डेड कॉइन को खर्च योग्य गिने जाने से पहले 3 पुष्टियों की आवश्यकता होती है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634))। फॉसेट और अन्य प्रतिभागियों से आए कॉइन `spendable_zats` में आते हैं। माइन किए गए कॉइन ट्रांसपेरेंट होते हैं, इसलिए वे `unshielded_zats` में आते हैं ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659))।

इस रन में दूसरी स्टेक के एक ब्लॉक बाद, बाकी बैलेंस `pending_zats` के अंतर्गत दिखा। कुछ ब्लॉक बाद यह फिर से खर्च करने योग्य हो गया।

## चरण 4: फाइनलाइज़र के लिए स्टेकिंग

### स्टेकिंग डे की प्रतीक्षा

स्टेकिंग, अनस्टेकिंग और निकासी केवल तभी स्वीकार की जाती है जब

```text
block height mod 10,368 < 3,456
```

जो हर 10,368 ब्लॉक की शुरुआत में 3,456 ब्लॉक की एक विंडो है। नेटवर्क के 25-सेकंड ब्लॉक लक्ष्य पर यह हर तीन दिनों में एक दिन है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547))। संस्करण 14 की पहली विंडो ब्लॉक 20,736, 31,104, 41,472 और 51,840 पर खुलती हैं।

रिलीज़ नोट के अनुसार, ऐप हर स्टेकिंग डे की शुरुआत और समाप्ति की घोषणा करता है। इस रन में इसकी ब्लॉक सूची ने ब्लॉक 34,559 और 34,560 के बीच एक लाल “* STAKING DAY END *” पंक्ति दिखाई।

**रिलीज़ नोट दो अलग बातें कहते हैं।** उनकी परिवर्तनों की सूची में “स्टेकिंग डे के लिए ~1 दिन और स्टेकिंग साइकिल के लिए ~3 दिन” दिया गया है, जो कोड से मेल खाता है। आगे नीचे, सीज़न 1 से लिया गया एक खंड अभी भी कहता है कि स्टेकिंग डे हर 150 ब्लॉक पर शुरू होता है और 70 ब्लॉक तक चलता है। पहले वाले को मानें। ऊपर की समाप्ति पंक्ति ठीक वहीं है जहाँ पहला नियम विंडो बंद करता है (34,560 mod 10,368 = 3,456); दूसरे नियम के अनुसार ब्लॉक 34,560 एक विंडो के अंदर पड़ता।

### फाइनलाइज़र का चयन

किसी फाइनलाइज़र को उसकी पहचान से नामित किया जाता है, जो `zfinv1` से शुरू होने वाली एक स्ट्रिंग है। ZecHub अपने द्वारा चलाए जाने वाले फाइनलाइज़र की पहचान [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) में प्रकाशित करता है:

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

पहचान किसी ऐसे स्रोत से कॉपी करें जिस पर आप भरोसा करते हों। रिलीज़ नोट के अनुसार, ऐप अपने दाएँ पैनल में भी फाइनलाइज़र की सूची दिखाता है, जिनमें से हर एक के बाईं ओर एक कॉपी आइकन होता है।

स्टेक करने के बाद, वॉलेट इतिहास और RPC फाइनलाइज़र को उसकी पहचान के बजाय एक हेक्स की से दर्शाते हैं। ZecHub के फाइनलाइज़र के लिए वह की `2941ef23...266aae8f` है।

ऐसा फाइनलाइज़र चुनें जिस पर आप भरोसा करते हों। डिज़ाइन में कोई स्वचालित स्लैशिंग नहीं है, लेकिन यह “एक उपयोगकर्ता-समन्वित हार्ड फ़ोर्क की अनुमति देता है जो किसी नामित फाइनलाइज़र को डेलिगेट की गई सारी स्टेक को बर्न कर देता है” ([Crosslink पुस्तक, डिज़ाइन अवलोकन](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html))।

यह चुनाव यह भी तय करता है कि वोट कौन देता है। हर सक्रिय बॉन्ड स्टेकिंग पुरस्कार में अपना हिस्सा कमाता है। यदि उसका फाइनलाइज़र रोस्टर के 12 में से एक है, तो उस हिस्से का दसवाँ भाग कमीशन के रूप में फाइनलाइज़र को जाता है। 12 से बाहर के किसी फाइनलाइज़र की ओर निर्देशित बॉन्ड अपना पूरा हिस्सा रखता है, लेकिन वह फाइनलाइज़र वोट नहीं देता ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079))।

### स्टेक

1. फाइनलाइज़र की पहचान कॉपी करें।
2. **Your Wallet** टैब पर **Stake** दबाएँ।
3. **Paste Identity** दबाएँ। बटन के ऊपर की पंक्ति बदलकर पहचान के पहले और अंतिम अक्षर दिखाती है, ZecHub के लिए `[zfinv1j6..YWyzp4YN]`। आगे बढ़ने से पहले इसे जाँच लें।
4. किसी राशि पर क्लिक करें। राशियाँ निश्चित चरणों में आती हैं, सबसे छोटी 0.01 cTAZ है, और केवल वही राशियाँ प्रकाशित होती हैं जिन्हें आपका बैलेंस कवर करता है। 0.5 cTAZ के साथ +0.01 cTAZ और +0.1 cTAZ प्रकाशित थीं।

**कुछ भी आपसे पुष्टि नहीं माँगता, और ऐसा लगता है कि कुछ नहीं हुआ।** इस रन में, परीक्षक के शब्दों में: “मैंने इसे एक बार क्लिक किया और कुछ नहीं हुआ, यह बस ग्रे हुआ और फिर से जल उठा।” स्टेक हो चुकी थी। वॉलेट इतिहास ने “Staked @ 33334 to 2941ef23..266aae8f” दिखाया, शुल्क 0.00015 cTAZ था, और वॉलेट ने 0.010 cTAZ Staked दिखाया। कुछ मिनट बाद एक दूसरी स्टेक ने ब्लॉक 33,348 पर एक दूसरा बॉन्ड बनाया।

हर स्टेक अपना अलग डेलिगेशन बॉन्ड बनाती है। निश्चित राशियाँ और स्टेकिंग डे, दोनों गोपनीयता (privacy) के लिए मौजूद हैं: ये किसी एक व्यक्ति की स्टेक को दूसरे की स्टेक से अलग पहचानना कठिन बना देते हैं।

## चरण 5: अपनी स्थिति की जाँच

### आपके बॉन्ड

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

स्टेकिंग के दो दिन बाद, ब्लॉक 36,490 पर यह उत्तर मिला था:

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

यह कॉल कोई पैरामीटर नहीं लेती। यह आपके सक्रिय बॉन्ड लौटाती है, जो उस फाइनलाइज़र की की (key) के अंतर्गत समूहित होते हैं जिसे हर बॉन्ड समर्थन देता है। साथ ही यह वे बॉन्ड भी लौटाती है जिनकी अनस्टेकिंग पूरी हो चुकी है और जिन्हें निकाला जा सकता है। हर बॉन्ड में स्टेक की गई राशि (`initial_val`), उसका वर्तमान मूल्य (`latest_val`), और उसे बनाने वाला लेनदेन तथा ब्लॉक ऊँचाई दिखाई जाती है। रिवॉर्ड स्वयं बॉन्ड में जोड़े जाते हैं: ब्लॉक 36,490 तक 1,000,000 ज़ैटोशी (zatoshis) का हर बॉन्ड बढ़कर 1,003,451 हो गया था।

**Edit Stake विंडो हर बॉन्ड को दस गुना बड़ा दिखाती है।** इस रन में 0.01 cTAZ का हर बॉन्ड अपनी पंक्ति में 0.100 cTAZ दिखा, और रिवॉर्ड शुरू होने के बाद 0.1003536 cTAZ, जबकि पंक्तियों के ऊपर दिए गए कुल योग (0.020 cTAZ, बाद में 0.02007 cTAZ) RPC से मेल खाते थे। कुल योग और RPC पर भरोसा करें।

उसी विंडो ने फाइनलाइज़र के पास एक चेतावनी त्रिकोण दिखाया, फ़ाइनैलिटी शुरू होने से पहले भी और बाद में भी। सोर्स कोड के अनुसार, इस त्रिकोण का अर्थ है कि आपका ऐप उस फाइनलाइज़र को ऑनलाइन नहीं मानता, और ऑनलाइन फाइनलाइज़र के लिए इसके बजाय Wi-Fi आइकन दिखता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648))। फिर भी बॉन्ड पर रिवॉर्ड मिलते रहे।

### फाइनलाइज़र

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

रिलीज़ नोट के अनुसार, यह बताता है कि आपका नोड वोटिंग प्रक्रिया में कहाँ है, और हर फाइनलाइज़र के लिए यह कि आपके नोड को उससे आख़िरी बार कब सूचना मिली और वह किस तरह वोट करता रहा है।

ब्लॉक 36,288 से पहले हर फ़ील्ड शून्य होती है और सूची ख़ाली रहती है। ब्लॉक 33,354 पर यह उत्तर मिला था:

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

फ़ाइनैलिटी शुरू होने के बाद सूची में रोस्टर के फाइनलाइज़र होते हैं। ब्लॉक 36,490 पर इसमें 12 फाइनलाइज़र थे, जिनमें ZecHub का `2941ef23...` भी शामिल था। यह संख्या रोस्टर की 12 की सीमा से मेल खाती है। नीचे उस उत्तर का शुरुआती भाग है, जिसे पहली प्रविष्टि के बाद काट दिया गया है:

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

कुछ मिनट बाद ऐप के दाएँ पैनल में “Finalizers (23)” दिखा।

### Linux और macOS पर

[स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) में यह कॉल `curl` रूप में दी गई है। अन्य कॉल के लिए मेथड का नाम बदलें। यह रूप इस गाइड के लिए नहीं चलाया गया:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Linux पर, रिलीज़ नोट के अनुसार ऐप में कॉपी और पेस्ट काम करने से पहले संभवतः आपको `xclip` इंस्टॉल करना होगा।

### एक RPC नाम जिस पर ध्यान दें

संस्करण 14 के रिलीज़ नोट में `wallet_staking_action` नाम की एक स्टेकिंग कॉल का वर्णन है, जो एक ऑब्जेक्ट लेती है। संस्करण 14 के सोर्स कोड में इस नाम का कोई मेथड नहीं है, और इस रन में नोड ने यह उत्तर दिया:

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

यह जो स्टेकिंग मेथड रजिस्टर करता है वह [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420) है, जो एक स्ट्रिंग लेता है जिसमें अनुरोध JSON के रूप में होता है, और फाइनलाइज़र को उसकी `zfinv1` पहचान से दिया जाता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760))। इस गाइड के लिए इसे आज़माया नहीं गया।

## अनस्टेक और निकासी

जिस दिन बॉन्ड बनाया जाता है, उसी दिन उसे वापस नहीं लिया जा सकता। शुरू से अंत तक इसमें तीन स्टेकिंग डे (Staking Days) लगते हैं: एक में स्टेक, बाद वाले किसी दिन में अनस्टेक, और तीसरे में निकासी। रिलीज़ नोट यह भी बताते हैं कि एक बॉन्ड पर एक ही स्टेकिंग डे में दो स्टेकिंग कार्रवाइयाँ नहीं की जा सकतीं।

*इस गाइड के लिए नहीं चलाया गया। संस्करण 14 के रिलीज़ नोट से:* अनस्टेक करने के लिए **Edit Stake** दबाएँ, Staked Bonds सूची से एक बॉन्ड चुनें और चेन-लिंक आइकन पर क्लिक करें। किसी बाद के स्टेकिंग डे पर निकासी के लिए **Edit Stake** दबाएँ, Withdrawable Bonds सूची से एक बॉन्ड चुनें और पैसे वाले आइकन पर क्लिक करें। किसी बॉन्ड को दूसरे फाइनलाइज़र पर ले जाना, जिसे नोट में रीटार्गेटिंग (retargeting) कहा गया है, किसी भी समय किया जा सकता है।

## नेटवर्क पर नज़र कहाँ रखें

[ZecHub उपकरण पर Crosslink टैब](https://zechub.wiki/tools?tool=crosslink) सभी उपकरण एक जगह इकट्ठा करता है, एक सूचना के नीचे जिसमें लिखा है “इस नेटवर्क पर स्टेकिंग ZEC को स्थानांतरित नहीं करती”:

- होस्ट किए गए, जिनके लिए किसी नोड की ज़रूरत नहीं: [Staker Space](https://crosslink.staker.space/), “वर्तमान cTAZ टेस्टनेट के लिए एक लाइव डैशबोर्ड”, जिसमें ऊँचाई, माइनर, सॉल्यूशन रेट, स्टेकिंग डे की उलटी गिनती और फ़ाइनैलिटी दिखती है, और [ctaz.cash](https://ctaz.cash/), जिसमें माइनिंग उत्पादन, फाइनलाइज़र रोस्टर, पीयर और स्टेकिंग एड्रेस के नाम-दावे दिखते हैं।
- आपकी अपनी मशीन पर: `zcash-explorer`, जिसका `/live/crosslink` पेज सक्रियण, फ़ाइनैलिटी लैग, रोस्टर और स्टेकिंग पोज़िशन दिखाता है, और `crosslink_indexer`, जो किसी Crosslink नोड का SQLite इंडेक्स है।

## आम गलतियाँ

**ब्लॉक ऊँचाई के बजाय घड़ी के हिसाब से योजना बनाना।** स्टेकिंग डे ब्लॉक में गिने जाते हैं। कैलेंडर नहीं, किसी डैशबोर्ड की उलटी गिनती देखें।

**विंडो के आख़िरी मिनटों में स्टेक करना।** नियम की जाँच उस ब्लॉक के आधार पर होती है जिसमें आपका लेनदेन शामिल होता है ([स्रोत](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), इसलिए विंडो बंद होने से पहले स्टेक का माइन होना ज़रूरी है, सिर्फ़ भेजा जाना नहीं।

**अपना स्टेक माइन करने की उम्मीद रखना।** Intel Core i5-8350U पर चार थ्रेड वाले CPU माइनर को 8 और 9 अक्टूबर के बीच एक भी ब्लॉक नहीं मिला। अपने पहले cTAZ फॉसेट से या किसी अन्य प्रतिभागी से प्राप्त करें।

**कुछ होता न दिखने पर दोबारा क्लिक करना।** किसी राशि पर हर क्लिक एक नया बॉन्ड बनाता है। पहले वॉलेट का इतिहास या `wallet_staking_positions` जाँचें।

**रीस्टार्ट के बाद घबरा जाना।** जब तक वॉलेट दोबारा स्कैन नहीं कर लेता, आपका बैलेंस और स्टेक शून्य दिखते हैं। Wallet Sync पूरा होने तक प्रतीक्षा करें।

**cTAZ को खिलौना पैसा, या सीक्रेट को हानिरहित समझना।** cTAZ एक टेस्ट कॉइन है, लेकिन आप जितने cTAZ कमाते हैं, उसी से वास्तविक ZEC में आपका हिस्सा तय होता है। `secret.seed` की रक्षा उसी तरह करें जैसे आप किसी वॉलेट की करते हैं।

**पुराने निर्देश पढ़ना।** रिलीज़ नोट में नए नियमों के साथ पिछले सीज़न का टेक्स्ट भी मौजूद है। जहाँ वे आपके नोड के व्यवहार से मेल नहीं खाते, वहाँ आपका नोड सही है।

## संबंधित पेज

- [Crosslink प्रोटोकॉल](/zcash-tech/crosslink-protocol) - वह डिज़ाइन जिसका यह नेटवर्क परीक्षण करता है
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslink के पीछे की टीम
- [Zcash रिलीज़ का सत्यापन](/guides/verifying-zcash-releases) - चेकसम क्या साबित करता है और क्या नहीं
- [Zebra फुल नोड](/zcash-tech/zebra-full-node) - वह नोड जिस पर Feature Net ऐप बना है
- [Zcash टेस्टनेट](/using-zcash/testnet) - सामान्य Zcash टेस्ट नेटवर्क, जो एक अलग नेटवर्क है

## स्रोत

- [संस्करण 14 के रिलीज़ नोट](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 अक्टूबर 2026
- [Crosslink: प्रोत्साहन-आधारित Feature Net](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 अप्रैल 2026
- [Crosslink: प्रोत्साहन-आधारित Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash सामुदायिक फ़ोरम
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Crosslink पुस्तक](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*इस पेज के चरण 8 से 10 अक्टूबर 2026 तक Windows 11 (संस्करण 10.0.26200.9550) पर Feature Net संस्करण 14 के साथ चलाए गए। जो कथन रिलीज़ नोट या सोर्स कोड का हवाला देता है, वह उन्हीं से लिया गया है। “नहीं चलाया गया” के रूप में चिह्नित किसी भी चीज़ को आज़माया नहीं गया।*

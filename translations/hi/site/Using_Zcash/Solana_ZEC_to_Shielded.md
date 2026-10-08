<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Solana पर ZEC है? इसे शील्डेड Zcash में भेजें

यह पेज आपके लिए है अगर आपके पास ZCAT, या कोई अन्य Solana टोकन है जो धारकों को ZEC में भुगतान करता है, और इस कारण आपके Solana wallet में ZEC आया है। इसका पालन करने के लिए आपको कुछ बेचने की ज़रूरत नहीं है। आप अपने पास पहले से मौजूद ZEC को Solana से एक Zcash wallet में भेजेंगे और यह शील्डेड रूप में पहुँचेगा।

हमने नीचे दिया हर चरण 27 सितंबर 2026 को वास्तविक ट्रांसफर के साथ किया था, जिसकी शुरुआत Phantom में 0.00266336 ZEC से हुई। इस पेज पर शुल्क, समय और स्क्रीन वही हैं जो हमने देखे।

---

## आपके पास वास्तव में क्या है

आपके Solana wallet में मौजूद ZEC, Solana का एक टोकन है, Zcash नेटवर्क के कॉइन नहीं। NEAR OmniBridge इसे जारी करता है और इसे समर्थन देने के लिए Zcash chain पर वास्तविक ZEC रखता है; यह bridge अक्टूबर 2025 से Solana पर लाइव है। इसका Solana भाग Wormhole संदेशों और NEAR Chain Signatures पर चलता है, Zcash light client पर नहीं, इसलिए Solana पक्ष केवल उन दो प्रणालियों जितना ही भरोसेमंद है। लोग इसे "paper ZEC" कहते हैं। यह ZEC की कीमत का अनुसरण करता है, लेकिन हर बैलेंस और हर ट्रांसफर आपके wallet पते के अंतर्गत Solana के सार्वजनिक ledger पर होता है, और वहाँ रहते हुए इसे शील्ड नहीं किया जा सकता।

जाँचें कि आपका टोकन असली है। Phantom में **ZEC** पर टैप करें और **About Zcash** तक स्क्रॉल करें। contract address यह होना चाहिए:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom इसे `A7bd…QXaS` तक छोटा दिखाता है, इसलिए पहले और आखिरी अक्षरों की तुलना करें, या पूरा पता [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS) पर देखें। आपके wallet में कोई भी दूसरा "ZEC" टोकन, उसका नाम या लोगो कुछ भी हो, यह वाला नहीं है। उसे वैसे ही छोड़ दें।

---

## इसे क्यों भेजें

शील्डेड ZEC ही Zcash का उद्देश्य है। जब आपका ZEC शील्डेड pool में होता है, तो हर भुगतान का भेजने वाला, पाने वाला और राशि Zcash chain पर एन्क्रिप्टेड होते हैं। explorer ब्राउज़ करने वाला कोई व्यक्ति आपका बैलेंस नहीं देख सकता।

आपके पास पहले से ZEC है। इसे Zcash wallet में भेजने से आपको वह हिस्सा मिलता है जो इसे Zcash बनाता है, और bridge तस्वीर से बाहर हो जाता है: आपके अपने wallet में मौजूद native ZEC किसी के redemption का सम्मान करने पर निर्भर नहीं होता।

[आपका Zcash भुगतान कौन देख सकता है?](/start-here/who-can-see-your-zcash-payment) ठीक-ठीक बताता है कि क्या छिपा रहता है।

---

## एक Zcash wallet चुनें

ZecHub आपके लिए कोई wallet नहीं चुनता। [ZecHub wallet directory](/wallets) में से चुनें, और install करने से पहले wallet के card पर ये दो लेबल जाँचें:

- **Ironwood: Ready.** Ironwood वह pool है जिसमें नया शील्डेड ZEC, 28 जुलाई 2026 के [Ironwood upgrade](/zcash-tech/ironwood) के बाद से जाता है। पुराना Orchard pool अब नए funds स्वीकार नहीं करता।
- **Automatic Shielding.** यदि कोई भुगतान transparent रूप में आता है तो यह उपयोगी है: wallet उस ZEC को आपके लिए शील्डेड pool में भेज देता है। इस लेबल को **Ironwood: Ready** का विकल्प न समझें। किसी wallet में Automatic Shielding हो सकता है और फिर भी उसमें Ironwood pool न हो (आज directory में Edge की यही स्थिति है)। अधिकांश अन्य wallets इसके बजाय **Shield** बटन दिखाते हैं।

wallet को उसके directory card के लिंक से install करें, खोज परिणाम या विज्ञापन से नहीं। seed phrase कागज़ पर लिखें और उसे ऑफ़लाइन रखें।

आपका wallet दो प्रकार के पते दिखाता है:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| इससे शुरू होता है | प्रकार | जनता क्या देखती है |
|---|---|---|
| `u1` | Unified Address | आपके बारे में कुछ नहीं, लेकिन केवल तब जब भुगतान शील्डेड pool में पहुँचे |
| `t1` | Transparent address | आपका पता और राशि, हमेशा के लिए, बिल्कुल Solana की तरह |

ऐसा `u1` उपयोग करें जिसे आपका wallet शील्डेड के रूप में चिह्नित करता है। `u1` receivers का एक bundle है, और कुछ wallets उसमें शील्डेड receiver के साथ एक transparent receiver भी रखते हैं। केवल transparent addresses को भुगतान कर सकने वाला sender उसी का उपयोग करेगा, और आपका भुगतान सार्वजनिक रूप में पहुँचेगा, भले ही आपने `u1` paste किया हो। हमारे test wallet के शील्डेड address में कोई transparent receiver नहीं है, इसलिए ऐसा नहीं हो सकता था। [Shielded pools](/using-zcash/shielded-pools) receivers को अधिक विस्तार से समझाता है। कुछ wallets हर बार Receive खोलने पर नया `u1` दिखाते हैं; यह सामान्य है और वे सभी आपके ही हैं। इस पेज के receive screenshot और near.com recipient field में इसी कारण अलग-अलग `u1` prefixes हैं।

हमने अपने परीक्षण के लिए ZODL इस्तेमाल किया क्योंकि वही wallet हमने सेट अप किया हुआ था। केवल वे wallets जो directory में **Ironwood: Ready** चिह्नित हैं, नया शील्डेड value प्राप्त कर सकते हैं।

---

## इसे भेजें

इस मार्ग में दो हिस्से हैं: अपना ZEC, Phantom से NEAR Intents में डालें, फिर उसे अपने Zcash address पर भेजें। हमने पहले हिस्से के लिए Solana उपयोगकर्ताओं हेतु NEAR द्वारा बनाई साइट [solswap.org](https://solswap.org) और दूसरे हिस्से के लिए NEAR का अपना app [near.com](https://near.com) इस्तेमाल किया। ZecHub की [Phantom Wallet में ZEC के लिए swap कैसे करें](/using-zcash/solswap) गाइड solswap की screens को अधिक विस्तार से कवर करती है। इसके लिए Phantom का अपना **Swap** बटन इस्तेमाल न करें: आपके पास पहले से टोकन है, और उसे swap करने से आप कहीं नहीं पहुँचेंगे।

Solana शुल्क के लिए Phantom में थोड़ा SOL रखें।

### 1. solswap.org पर अपना ZEC deposit करें

1. Phantom खोलें, browser tab पर जाएँ, `solswap.org` स्वयं टाइप करें और अपना wallet connect करें।
2. **Deposit** पर टैप करें। **Asset** को **Zcash**, **Network** को **Solana** और method को **Wallet** पर सेट करें।
3. राशि दर्ज करें (या **Max** पर टैप करें) और Phantom में transaction approve करें।

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

हमारा deposit 15:09:08 (UTC+1) पर Solana block में पहुँचा और solswap ने नौ सेकंड बाद उसे **Completed** दिखाया।

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

अब आपका ZEC आपके NEAR Intents balance में है। आपकी Phantom key इससे बाहर होने वाली हर गतिविधि को authorize करती है, NEAR Intents solvers delivery करते हैं, और NEAR Intents compliance review के लिए balance रोक सकता है (नीचे trust notes देखें)।

### 2. near.com पर इसे अपने Zcash address पर भेजें

solswap में **Withdraw** पेज भी है, लेकिन वह हमारे लिए काम नहीं किया। **Received amount** और **Fee** "–" पर ही रहे और बटन ने कुछ नहीं किया, चाहे हमने नेटवर्क के रूप में Zcash चुना हो या Solana।

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

यदि आपके साथ ऐसा होता है, तो आपका ZEC फँसा नहीं है। balance website से नहीं, आपके wallet की key से जुड़ा है, इसलिए जिस भी NEAR Intents app में आप उस wallet से sign in करते हैं, वह उसे access कर सकता है। हमने near.com पर पूरा किया:

1. `near.com` पर जाएँ और उसी Phantom wallet से sign in करें।
2. आपका solswap balance **Move legacy assets** के अंतर्गत दिखाई देता है (near.com पुराने NEAR Intents apps के balances को "legacy" कहता है)। ZEC row पर **Withdraw** टैप करें। आपको **Move** की आवश्यकता नहीं है।

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. **Network** को **Zcash** पर सेट करें, अपने wallet का `u1` address **Recipient** के रूप में paste करें और अपने wallet से पहले व अंतिम छह characters जाँचें।

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. **Review withdrawal** पर टैप करें, सारांश पढ़ें और **Send** पर टैप करें।

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom आपसे near.com के लिए **Sign Message** करने को कहता है। यही signature NEAR Intents को आपका balance भेजने की अनुमति देता है। इसमें कोई SOL खर्च नहीं होता, लेकिन इसका अर्थ यह नहीं कि यह हानिरहित है: मिलती-जुलती साइट वही request दिखाकर आपका NEAR Intents balance खाली कर सकती है। **Confirm** पर टैप करने से पहले इन सभी बातों की जाँच करें, और एक भी विफल हो तो **Cancel** पर टैप करें:
   - request पर दिखाया गया site नाम `near.com` है। (चरण 1 का deposit `solswap.org` से एक सामान्य Phantom transaction request था; वहाँ भी नाम इसी तरह जाँचें।)
   - **Message** खोलें और `"verifying_contract": "intents.near"` खोजें।
   - संदेश screenshot जैसा पढ़ा जा सकने वाला text हो। यदि वह पढ़ा न जा सकने वाला blob है, या site आपके address bar वाले site से मेल नहीं खाती, तो उसे अस्वीकार करें।
   - वह कभी आपका seed phrase नहीं माँगता। signing में उसे टाइप करना कभी शामिल नहीं होता।

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com **Processing send**, **Sending** और **Complete** दिखाता है। **View on explorer** ट्रांसफर का NEAR Intents record खोलता है।

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### हमारे परीक्षण की लागत और लगने वाला समय

| | हमारा परीक्षण |
|---|---|
| Phantom से deposit किया गया ZEC | 0.00266336 ZEC |
| Zcash wallet में प्राप्त ZEC | 0.00241336 ZEC, शील्डेड |
| ZEC पक्ष की लागत | 0.00025 ZEC (near.com ने "Fee 0 ZEC" दिखाया; लागत quote में शामिल है) |
| deposit पर खर्च किया गया SOL | 0.00156844 SOL, जिसमें 0.00008 SOL network fee थी |
| न्यूनतम | कोई लागू नहीं हुआ। solswap ने 0.00000001 ZEC का न्यूनतम deposit दिखाया, और near.com ने 0.0026 ZEC स्वीकार किया |
| Deposit, Phantom से solswap तक | 9 सेकंड |
| Withdrawal, near.com पर signing से Zcash wallet में ZEC तक | लगभग 8 मिनट (near.com ने लगभग 2 का अनुमान दिया था) |

Records: Solana deposit [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) block 3,498,141 में। network load के साथ शुल्क और समय बदलते हैं, इसलिए जब आप यह करें तो review screen ही अंतिम जानकारी है।

NEAR का bridge अपने standard Zcash withdrawals के लिए 0.01 ZEC न्यूनतम और 0.00047 ZEC शुल्क प्रकाशित करता है। near.com ने हमारे 0.0026 ZEC पर दोनों में से कोई लागू नहीं किया। यदि कोई app छोटी राशि अस्वीकार करता है, तो top up करने से पहले near.com आज़माएँ।

### अन्य मार्ग और हर एक में किस पर भरोसा होता है

Solana से बाहर जाने वाला हर मार्ग OmniBridge पर भरोसा करता है, क्योंकि bridge आपके टोकन का समर्थन करने वाला ZEC रखता है। इसके अलावा:

- **ऊपर दिया मार्ग** NEAR Intents पर भरोसा करता है। आपका signature transfer authorize करता है, solvers Zcash पक्ष पर ZEC पहुँचाते हैं, और NEAR Intents compliance review के लिए funds रोक सकता है; 2026 में एक Zcash holder ने [हफ्तों तक रोके गए एक बड़े swap की रिपोर्ट की](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/)। आप अपना wallet दो websites से भी connect करते हैं, इसलिए हर बार address bar जाँचें।
- **बिल्ट-इन NEAR Intents वाले wallets** ([directory](/wallets) में NEAR Intents feature खोजें) उसी system को Zcash wallet के भीतर से इस्तेमाल करते हैं। वही trust, कम websites। हमने Solana पर ZEC के साथ इसका परीक्षण नहीं किया।
- **एक exchange**, केवल तभी यदि वह Solana network पर इस टोकन के deposits स्वीकार करता हो, जो अधिकांश नहीं करते। आप custody और आमतौर पर अपनी पहचान सौंप देते हैं, और कई exchanges केवल `t1` addresses पर ZEC भेजते हैं। [custodial exchanges](/using-zcash/custodial-exchanges) देखें।

---

## इसे शील्ड करें और जाँचें

यह शील्डेड रूप में पहुँचा। हमारा ZEC एक `u1` address पर गया और सीधे Ironwood shielded pool में पहुँचा। कोई transparent चरण नहीं था और हाथ से shield करने के लिए कुछ नहीं था। confirmations इकट्ठा करते समय wallet ने 16:07 (UTC+1) पर इसे shield icon के साथ **Receiving…** के रूप में दिखाया।

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

स्वयं जाँचने के लिए, अपने wallet में transaction खोलें और transaction ID कॉपी करें।

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

इसे [Zcash block explorer](https://mainnet.zcashexplorer.app) में paste करें। सारांश से भ्रमित न हों। हमारा **Shielded Inputs / Outputs 0 / 0** और **Transferred from/to shielded pool 0.0 ZEC** दिखाता है, क्योंकि explorer का सारांश अभी Ironwood को नहीं गिनता। जो `t1` addresses आप देखते हैं, वे भेजने वाले पक्ष पर हैं (उसका खर्च किया गया ZEC और उसका रखा हुआ change), आपके नहीं।

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

**Raw TX: JSON** पर क्लिक करें और `ironwood` खोजें। वहाँ negative `valueBalance` का अर्थ है कि ZEC, Ironwood pool में प्रवेश कर रहा है। हमारा `-0.00241336` था, ठीक उतना ही जितना पहुँचा, और transaction में यह नहीं दिखता कि इसे किसने प्राप्त किया।

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[Block explorer क्या देख सकता है](/zcash-tech/what-a-block-explorer-can-see) बाकी fields समझाता है।

### यदि आप `t1` address paste करते हैं

हमने किसी ऐसे address पर नहीं भेजा, लेकिन परिणाम अनुमानित है। ZEC आपके wallet के transparent balance में पहुँचता है, और explorer आपका `t1` address तथा राशि किसी को भी, स्थायी रूप से, दिखाता है। Automatic shielding वाला wallet फिर इसे shielded pool में भेज देता है; अन्यथा **Shield** पर टैप करें, जिसमें छोटा network fee लगता है। shielding transaction भी सार्वजनिक है, क्योंकि वह आपके `t1` address से खर्च करता है। कुछ खोता नहीं है, लेकिन उस deposit और आपके wallet के बीच का link chain पर बना रहता है। `u1` paste करें।

---

## सुरक्षित रहें

नए holders को निशाना बनाया जाता है। आपको दिखने वाला लगभग हर scam इनमें से एक होगा:

- **गलत address type।** Zcash address `u1`, `t1`, `zs` या `tex1` से शुरू होता है। Solana address में इनमें से कोई prefix नहीं होता। native ZEC कभी Solana address पर न भेजें, और Solana टोकन कभी Zcash address पर न भेजें।
- **केवल transparent सेवाएँ।** कुछ bridges, swap sites और exchanges केवल `t1` addresses पर भेज सकते हैं। यदि पहुँचते ही आप ZEC को shield कर दें तो यह काम चलाऊ है। बस उसे वहाँ न छोड़ें।
- **नकली wallets।** केवल [wallet directory](/wallets) card के लिंक या उसके बताए आधिकारिक app store listing से install करें। नकली crypto wallet apps app stores में पहुँच जाते हैं और वे असली जैसे ही दिखते हैं।
- **Seed phrase phishing।** किसी wallet, bridge, swap site, support agent, moderator या airdrop को कभी आपके seed phrase की आवश्यकता नहीं होती। message sign करने में इसे टाइप करना कभी शामिल नहीं होता। जो भी इसे माँगता है, वह आपसे चोरी करने की कोशिश कर रहा है। [Funds पुनर्प्राप्त करना](/using-zcash/recovering-funds) इस scam के "हम आपका wallet पुनर्प्राप्त करेंगे" संस्करण को कवर करता है।
- **Scam tokens और "claim" sites।** ZEC, Zcash या उनसे मिलते-जुलते नामों के tokens बिना माँगे Solana wallets में दिखाई देते हैं, अक्सर और अधिक "claim" करने के लिंक के साथ। उस लिंक से अपना wallet connect करने पर वह खाली हो सकता है। इस पेज के शीर्ष पर दिया contract address जाँचें और बाकी सब अनदेखा करें।
- **हानिकारक signature requests।** "Sign Message" request बिना किसी SOL शुल्क के आपका NEAR Intents balance भेज सकती है। केवल `near.com` या `solswap.org` पर sign करें, और केवल तब जब संदेश में `intents.near` का नाम हो (ऊपर चरण 5 बताता है कि क्या जाँचना है)।
- **मिलती-जुलती sites।** `solswap.org` और `near.com` स्वयं टाइप करें या bookmarks का इस्तेमाल करें। DMs, replies या ads के links का अनुसरण न करें।

---

## शील्डेड ZEC के साथ क्या करें

- खर्च करते समय इसे निजी रखें: [ZEC को निजी रूप से इस्तेमाल करना](/guides/using-zec-privately)
- इसे स्वीकार करने वाली जगहें खोजें: [ZEC खर्च करने की जगहें](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- निजी संदेश संलग्न करके भेजें: [Memos](/using-zcash/memos)
- अपनी पहचान लिंक किए बिना किसी को भुगतान करें: [पहचान लिंक किए बिना पैसे भेजें](/zcash-use-cases/send-money-without-linking-identity)

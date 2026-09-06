# मल्टीसिग डेमो

> **ऐतिहासिक। यह वॉकथ्रू अब नहीं चलता है।**
>
> नीचे दिया गया हर चरण zcashd पर निर्भर है, जो 18 जुलाई 2026 को अपने स्वचालित End-of-Support बंद होने तक पहुँचा था। इस पृष्ठ के साथ दिए गए सात स्क्रिप्ट इसे `zcash-cli` के माध्यम से चलाते हैं, इसलिए इनमें से कोई भी आज चल रहे नोड तक नहीं पहुँच सकता।
>
> इन स्क्रिप्टों को यांत्रिक रूप से पोर्ट नहीं किया जा सकता। ये raw-transaction और wallet RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) पर बनी हैं, जिन्हें zcashd ने बंद होने से पहले अप्रचलित कर दिया था; Zallet उन्हें नई विधियों से बदलता है जो raw transaction hex के बजाय PCZTs पर काम करती हैं, और अभी भी बीटा में है जिसमें कई zcashd विधियाँ अभी तक पोर्ट नहीं की गई हैं।
>
> आज Zcash पर बहु-पक्षीय कस्टडी के लिए, [FROST और Threshold Custody](/zcash-tech/frost-threshold-custody) देखें, जिसमें पारदर्शी multisig के साथ सीधी तुलना शामिल है, और कार्यशील [Ywallet FROST डेमो](/guides/frostdemo/ywallet-frost-demo) देखें। किसी मौजूदा नोड को zcashd से हटाने के लिए, [Zebra और Zallet पर माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
>
> इस पृष्ठ को पारदर्शी multisig वर्कफ़्लो के ऐतिहासिक रिकॉर्ड के रूप में रखा गया है।

इस डेमो के लिए zcashd आवश्यक है, जो 18 जुलाई 2026 को बंद हो गया था और अब नहीं चलता। नीचे दी गई कोई भी चीज़ लाइव चेन पर पूरी नहीं की जा सकती।

## आवश्यक व्यक्तियों से सार्वजनिक कुंजियाँ एकत्र करें

* https://github.com/iancoleman/bip39
* यदि zcashd का उपयोग कर रहे हैं, तो आप एक UA बना सकते हैं और अपने पारदर्शी रिसीवर का भी उपयोग कर सकते हैं। फिर अपनी सार्वजनिक कुंजी निकालने के लिए `getPubkey.sh` का उपयोग करें।


## 2x मल्टीसिग (3 में से 2) t3 पते बनाएँ

अपना multisig पता और redeem script जनरेट करने के लिए createMultiSig.sh चलाएँ। 3 सार्वजनिक कुंजियों की आवश्यकता है

`./createMultiSig.sh pubk1 pubk2 pubk3`      # पहला t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # परिवर्तन पते के लिए दूसरा t3। 

#### नोट: इस उदाहरण में pubk1,pubk4 एक ही व्यक्ति हैं, pubk2,pubk5 एक ही व्यक्ति हैं, और इसी तरह आगे ...

#### नोट2: आपकी pubkeys का क्रम मायने रखता है! इस पर ध्यान दें!!!!


## t3 पते को फंड करें

पते को फंड करने के लिए किसी भी wallet/faucet का उपयोग करें

## मल्टीसिग ट्रांज़ैक्शन बनाएँ

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

जहाँ,

```
        txid: उस ट्रांज़ैक्शन की ट्रांज़ैक्शन ID जिसने आपके नए t3 में धन भेजा
   voutIndex: vout में उस आउटपुट का इंडेक्स जिसका मान सबसे अधिक है
scriptPubKey: P2SH locking script में दूसरे locking script (Script Hash) का हैश होता है, जो HASH160 और EQUAL opcodes से घिरा होता है। यह hex में होता है, और getrawtransaction rpc के माध्यम से मिलता है, scriptPubKey खोजें
redeemScript: उस redeemScript का hex मान जो हमारा t3 बनाते समय आउटपुट हुआ था। t3 से खर्च करना चाहने वाले सभी लोगों को इसकी आवश्यकता है।
   oldAmount: ऊपर दिए गए txid से आपके नए t3 को भेजी गई राशि
       tAddy: वह पता जिस पर आप धन भेजना चाहते हैं
      amount: tAddy को भेजने के लिए ZEC की राशि
 changeTaddy: परिवर्तन पता (नए redeemScript के साथ नया t3!)

```

`./txDetails.sh txid`   => आवश्यक जानकारी खोजने में आपकी सहायता करेगा

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** साइनिंग के लिए इसकी आवश्यकता है! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## मल्टीसिग TX पर साइन करें

signMultiSigTX.sh खोलें और pk1,pk2, ... वेरिएबल्स में अपनी निजी कुंजियाँ जोड़ें।
 

*** मैं इन्हें अपने टर्मिनल में टाइप करने की सलाह नहीं दूँगा। ***


यदि आपके पास अपनी सभी निजी कुंजियों तक पहुँच है, तो समय बचाने के लिए आप उन सभी का एक साथ उपयोग कर सकते हैं,
लेकिन वास्तविक दुनिया के अधिकांश उदाहरणों में, साइनिंग दुनिया भर के लोगों द्वारा की जाएगी, इसलिए प्रत्येक आवश्यक प्रतिभागी को साइन करना होगा,
फिर अद्यतन raxTX "hex" आउटपुट वापस भेजना होगा जिसका उपयोग अन्य लोग साइन करके साइनिंग प्रक्रिया पूरी करने के लिए करेंगे।

जो भी पहला tx बनाता है, वह अपनी निजी कुंजी से साइन करेगा और अद्यतन rawTX hex भेजेगा, जिस पर अन्य प्रतिभागियों को साइन करना होगा।

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

इस tx पर साइन करने के लिए, तीन में से कम से कम दो निजी कुंजियों को इस पर साइन करना होगा। यदि आपके द्वारा दी गई सार्वजनिक कुंजी zcashd से T-address का उपयोग करके निर्यात की गई थी, तो आप अपने T पते की निजी कुंजी इससे प्राप्त कर सकते हैं: 


`zcash-cli dumpprivkey "t-addr"`

यह कमांड zcashd के साथ बंद हो गया था और आज कुछ भी वापस नहीं करता; इसे यहाँ केवल यह दिखाने के लिए दर्ज किया गया है कि डेमो ने अपनी कुंजियाँ कैसे प्राप्त कीं।


इस डेमो के लिए, मैंने आवश्यक निजी कुंजियों को जल्दी से अलग करने के लिए iancoleman के bip39 का उपयोग किया है।


## साइन किए गए TX को प्रसारित करें

`./sendMultiSignedTX.sh signedTXfromLastStep`



# स्रोत

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

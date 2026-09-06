# MultiSig डेमो

> **ऐतिहासिक। यह walkthrough अब नहीं चलता है।**
>
> नीचे दिया गया हर चरण zcashd पर निर्भर है, जो 18 जुलाई 2026 को अपने स्वचालित End-of-Support ठहराव पर पहुँच गया। इस पृष्ठ के साथ दिए गए सात scripts इसे `zcash-cli` के माध्यम से चलाते हैं, इसलिए इनमें से कोई भी आज चालू नोड तक नहीं पहुँच सकता।
>
> इन scripts को यांत्रिक रूप से port नहीं किया जा सकता। ये raw-transaction और wallet RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) पर बने हैं, जिन्हें zcashd ने ठहराव से पहले deprecated कर दिया था; Zallet इनकी जगह नए methods देता है जो raw transaction hex के बजाय PCZTs पर काम करते हैं, और अभी beta में है तथा कई zcashd methods अभी port नहीं हुए हैं।
>
> आज Zcash पर multi-party custody के लिए [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody) देखें, जिसमें transparent multisig के साथ सीधी तुलना शामिल है, और [Ywallet FROST डेमो](/guides/frostdemo/ywallet-frost-demo) देखें। किसी मौजूदा नोड को zcashd से हटाने के लिए, [Zebra और Zallet पर migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
>
> यह पृष्ठ transparent multisig workflow के ऐतिहासिक रिकॉर्ड के रूप में रखा गया है।

इस डेमो के लिए zcashd आवश्यक है, जो 18 जुलाई 2026 को रुक गया और अब नहीं चलता। नीचे दी गई कोई भी चीज़ live chain पर पूरी नहीं की जा सकती।

## आवश्यक व्यक्तियों से public keys एकत्र करें

* https://github.com/iancoleman/bip39
* यदि zcashd का उपयोग कर रहे हैं, तो आप एक UA बना सकते हैं और अपना transparent receiver भी उपयोग कर सकते हैं। फिर अपनी public key निकालने के लिए `getPubkey.sh` का उपयोग करें।


## 2x Multisig (3 में से 2) t3 addresses बनाएँ

अपना multisig address और redeem script बनाने के लिए createMultiSig.sh चलाएँ। 3 public keys चाहिए

`./createMultiSig.sh pubk1 pubk2 pubk3`      # पहला t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # change address के लिए दूसरा t3। 

#### ध्यान दें: इस उदाहरण में pubk1,pubk4 एक ही व्यक्ति हैं, pubk2,pubk5 एक ही व्यक्ति हैं और इसी तरह आगे भी ...

#### ध्यान दें2: आपकी pubkeys का ORDER मायने रखता है! इस पर ध्यान दें!!!!


## t3 address में धन भेजें

address में धन भेजने के लिए किसी भी wallet/facuet का उपयोग करें

## MultiSig transaction बनाएँ

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

जहाँ,

```
        txid: उस transaction की transaction ID जिसने आपके नए t3 में धन भेजा
   voutIndex: vout में उस output का index जिसका मान सबसे अधिक है
scriptPubKey: P2SH locking script में दूसरे locking script (Script Hash) का hash होता है, जो HASH160 और EQUAL opcodes से घिरा होता है। यह hex में है, और getrawtransaction rpc के माध्यम से मिलता है; scriptPubKey देखें
redeemScript: उस redeemScript का hex मान जो हमारा t3 बनाते समय output हुआ था। यह उन सभी लोगों के लिए आवश्यक है जो t3 से खर्च करना चाहते हैं।
   oldAmount: ऊपर दिए गए txid से आपके नए t3 को भेजी गई राशि
       tAddy: वह address जहाँ आप धन भेजना चाहते हैं
      amount: tAddy को भेजी जाने वाली ZEC की राशि
 changeTaddy: Change address (नए redeemScript के साथ नया t3!)

```

`./txDetails.sh txid`   => आवश्यक जानकारी खोजने में आपकी सहायता करेगा

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX पर हस्ताक्षर करें

signMultiSigTX.sh खोलें और pk1,pk2, ... variables में अपनी private keys जोड़ें।
 

*** मैं इन्हें अपने terminal में टाइप करने की अनुशंसा नहीं करूँगा। ***


यदि आपकी सभी private keys तक पहुँच है, तो समय बचाने के लिए आप उन सभी का एक साथ उपयोग कर सकते हैं,
लेकिन वास्तविक दुनिया के अधिकांश उदाहरणों में, हस्ताक्षर दुनिया भर के लोगों द्वारा किए जाएँगे, इसलिए प्रत्येक आवश्यक प्रतिभागी को हस्ताक्षर करना होगा,
फिर अद्यतन raxTX "hex" output वापस भेजना होगा, जिसका उपयोग अन्य लोग हस्ताक्षर करके signing प्रक्रिया पूरी करने के लिए करेंगे।

जो भी व्यक्ति पहला tx बनाता है, वह अपनी private key से हस्ताक्षर करेगा और अद्यतन rawTX hex भेजेगा, जिस पर अन्य प्रतिभागियों को हस्ताक्षर करने होंगे।

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

इस tx पर हस्ताक्षर करने के लिए, तीन private keys में से कम-से-कम दो को उस पर हस्ताक्षर करने होंगे। यदि आपके द्वारा दी गई public key को zcashd के T-address का उपयोग करके export किया गया था, तो आप अपने T address की private key इस तरह प्राप्त कर सकते हैं: 


`zcash-cli dumpprivkey "t-addr"`

यह command zcashd के साथ रुक गया था और आज कुछ भी return नहीं करता; इसे यहाँ केवल यह दिखाने के लिए दर्ज किया गया है कि डेमो ने अपनी keys कैसे प्राप्त कीं।


इस डेमो के लिए, मैंने आवश्यक private keys को जल्दी अलग करने के लिए iancoleman's bip39 का उपयोग किया है।


## हस्ताक्षरित TX broadcast करें

`./sendMultiSignedTX.sh signedTXfromLastStep`



# स्रोत

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

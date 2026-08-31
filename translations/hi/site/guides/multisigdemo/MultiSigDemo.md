# MultiSig डेमो

> **ऐतिहासिक। यह walkthrough अब नहीं चलता।**
>
> नीचे दिया गया हर चरण zcashd पर निर्भर करता है, जो 18 July 2026 को अपने automatic End-of-Support halt पर पहुंच गया। इस पेज के साथ दिए गए सात scripts इसे `zcash-cli` के जरिए चलाते हैं, इसलिए आज इनमें से कोई भी किसी चल रहे नोड तक नहीं पहुंच सकता।
>
> इन scripts को यांत्रिक रूप से port नहीं किया जा सकता। ये raw-transaction और wallet RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) पर बने हैं, जिन्हें zcashd ने halt से पहले deprecated कर दिया था; Zallet इन्हें नए methods से बदलता है जो raw transaction hex की बजाय PCZTs पर काम करते हैं, और यह अभी भी beta में है, जहां zcashd के कई methods अभी तक port नहीं किए गए हैं।
>
> आज Zcash पर multi-party custody के लिए, [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody) देखें, जिसमें transparent multisig के साथ सीधी तुलना शामिल है, और काम करने वाला [Ywallet FROST demo](/guides/frostdemo/ywallet-frost-demo) भी देखें। किसी मौजूदा नोड को zcashd से हटाने के लिए, [Zebra और Zallet पर migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
>
> यह पेज transparent multisig workflow के एक ऐतिहासिक रिकॉर्ड के रूप में रखा गया है।

इस डेमो के लिए zcashd की आवश्यकता है, जो 18 July 2026 को रुक गया था और अब नहीं चलता। नीचे दिया गया कुछ भी live chain पर पूरा नहीं किया जा सकता।

## आवश्यक व्यक्तियों से public keys एकत्र करें

* https://github.com/iancoleman/bip39
* यदि zcashd का उपयोग कर रहे हैं, तो आप एक UA बना सकते हैं और अपने transparent reciever का भी उपयोग कर सकते हैं। फिर अपनी public key निकालने के लिए `getPubkey.sh` का उपयोग करें।


## 2x Multisig (2 of 3) t3 addresses बनाएं

अपना multisig address और redeem script जनरेट करने के लिए createMultiSig.sh चलाएं। इसके लिए 3 public keys चाहिए

`./createMultiSig.sh pubk1 pubk2 pubk3`      # पहला t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # दूसरा t3 change address के लिए। 

#### NOTE: इस उदाहरण में pubk1,pubk4 एक ही व्यक्ति हैं, pubk2,pubk5 एक ही व्यक्ति हैं वगैरह ...

#### NOTE2: आपकी pubkeys का ORDER मायने रखता है! इस पर ध्यान दें!!!!


## t3 address को fund करें

address को fund करने के लिए कोई भी wallet/facuet उपयोग करें

## MultiSig transaction बनाएं

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

जहां,

```
        txid: उस transaction की transaction ID जिसने आपके नए t3 में पैसा भेजा
   voutIndex: vout में उस output का index जिसकी value सबसे अधिक है
scriptPubKey: P2SH locking script में एक दूसरे locking script (Script Hash) का hash होता है, जो HASH160 और EQUAL opcodes से घिरा होता है। यह hex में होता है, और getrawtransaction rpc के जरिए मिलता है, scriptPubKey देखें
redeemScript: redeemScript की hex value जो हमारा t3 बनाते समय output हुई थी। t3 से खर्च करना चाहने वाले सभी लोगों के लिए यह आवश्यक है।
   oldAmount: ऊपर दिए गए txid से आपके नए t3 पर भेजी गई राशि
       tAddy: वह address जिस पर आप funds भेजना चाहते हैं
      amount: tAddy पर भेजी जाने वाली ZEC की राशि
 changeTaddy: Change address (नया t3 एक नए redeemScript के साथ!)

```

`./txDetails.sh txid`   => आवश्यक जानकारी ढूंढने में मदद करेगा

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX पर sign करें

signMultiSigTX.sh खोलें और अपनी private keys को pk1,pk2, ... variables में जोड़ें।
 

*** मैं इन्हें अपने terminal में टाइप करने की सिफारिश नहीं करूंगा। ***


यदि आपके पास अपनी सभी private keys की पहुंच है, तो समय बचाने के लिए आप उन सभी का एक साथ उपयोग कर सकते हैं,
लेकिन अधिकांश वास्तविक उदाहरणों में, signing दुनिया भर के लोगों द्वारा किया जाएगा, इसलिए आवश्यक प्रत्येक participant को sign करना होगा,
फिर updated raxTX "hex" output वापस भेजना होगा, जिसका उपयोग दूसरे लोग signing प्रक्रिया पूरी करने के लिए sign करने में करेंगे।

जो भी पहला tx बनाता है, वह अपनी private key से sign करेगा और updated rawTX hex भेजेगा, जिस पर अन्य participants को sign करना होगा।

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

इस tx पर sign करने के लिए, तीन private keys में से कम से कम 2 को इस पर sign करना होगा। यदि आपकी दी गई public key zcashd के T-address का उपयोग करके export की गई थी, तो आप अपने T address की private key इस प्रकार प्राप्त कर सकते हैं: 


`zcash-cli dumpprivkey "t-addr"`

यह command zcashd के साथ रुक गई थी और आज कुछ वापस नहीं करती; इसे यहां केवल यह दिखाने के लिए दर्ज किया गया है कि डेमो ने अपनी keys कैसे प्राप्त कीं।


इस डेमो के लिए, मैंने आवश्यक private keys को जल्दी अलग करने के लिए iancoleman's bip39 का उपयोग किया है।


## signed TX broadcast करें

`./sendMultiSignedTX.sh signedTXfromLastStep`



# स्रोत

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

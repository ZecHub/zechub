# MultiSig डेमो

इस डेमो के लिए zcashd आवश्यक है 

## आवश्यक व्यक्तियों से public keys एकत्र करें

* https://github.com/iancoleman/bip39
* यदि zcashd का उपयोग कर रहे हैं, तो आप एक UA बना सकते हैं और अपने transparent reciever का भी उपयोग कर सकते हैं। फिर अपनी public key निकालने के लिए `getPubkey.sh` का उपयोग करें।


## 2x Multisig (2 of 3) t3 addresses बनाएं

अपना multisig address और redeem script जनरेट करने के लिए createMultiSig.sh चलाएँ। इसके लिए 3 public keys की आवश्यकता होती है

`./createMultiSig.sh pubk1 pubk2 pubk3`      # पहला t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # change address के लिए दूसरा t3. 

#### नोट: इस उदाहरण में pubk1,pubk4 एक ही व्यक्ति हैं, pubk2,pubk5 एक ही व्यक्ति हैं और इसी तरह आगे भी ...

#### नोट2: आपकी pubkeys का ORDER महत्वपूर्ण है! इस पर ध्यान दें!!!!


## t3 address को फंड करें

address को फंड करने के लिए किसी भी wallet/facuet का उपयोग करें

## MultiSig transaction बनाएं

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

जहाँ,

```
        txid: उस transaction की transaction ID जिसने आपके नए t3 में धन भेजा
   voutIndex: vout में उस output का index जिसकी value सबसे अधिक है
scriptPubKey: P2SH locking script में एक अन्य locking script (Script Hash) का hash होता है, जो HASH160 और EQUAL opcodes से घिरा होता है। यह hex में होता है, और getrawtransaction rpc के माध्यम से मिलता है, scriptPubKey को देखें
redeemScript: redeemScript की hex value जो हमारा t3 बनाते समय output हुई थी। यह उन सभी लोगों के लिए आवश्यक है जो t3 से spend करना चाहते हैं।
   oldAmount: ऊपर दिए गए txid से आपके नए t3 में भेजी गई राशि
       tAddy: वह address जिस पर आप funds भेजना चाहते हैं
      amount: tAddy पर भेजी जाने वाली ZEC की राशि
 changeTaddy: Change address (नया t3 एक नए redeemScript के साथ!)

```

`./txDetails.sh txid`   => आवश्यक जानकारी खोजने में आपकी मदद करेगा

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** signing के लिए यह आवश्यक है! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX पर sign करें

signMultiSigTX.sh खोलें और `pk1`,`pk2`, ... variables में अपनी private keys जोड़ें।
 

*** मैं इन्हें आपके terminal में टाइप करने की सिफारिश नहीं करूँगा। ***


यदि आपके पास अपनी सभी private keys की पहुँच है, तो समय बचाने के लिए आप उन सबका एक साथ उपयोग कर सकते हैं,
लेकिन वास्तविक दुनिया के अधिकांश उदाहरणों में signing दुनिया भर में मौजूद लोगों द्वारा की जाएगी, इसलिए आवश्यक प्रतिभागियों में से प्रत्येक को sign करना होगा,
फिर अद्यतन raxTX "hex" output वापस भेजना होगा, जिसे अन्य लोग signing प्रक्रिया पूरी करने के लिए sign करने में उपयोग करेंगे।

जो भी व्यक्ति पहला tx बनाता है, वह अपनी private key से sign करेगा और फिर अद्यतन rawTX hex भेजेगा, जिस पर अन्य प्रतिभागियों को sign करना होगा।

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

इस tx पर sign करने के लिए, तीन private keys में से कम-से-कम 2 को इस पर sign करना होगा। यदि आपने जो public key दी थी वह zcashd के T-address का उपयोग करके export की गई थी, तो आप अपने T address की private key इस प्रकार प्राप्त कर सकते हैं: 


`zcash-cli dumpprivkey "t-addr"`


इस डेमो के लिए, मैंने आवश्यक private keys को जल्दी से अलग करने के लिए iancoleman के bip39 का उपयोग किया है।


## signed TX को broadcast करें

`./sendMultiSignedTX.sh signedTXfromLastStep`



# स्रोत

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

# MultiSig डेमो

> **ऐतिहासिक। यह मार्गदर्शिका अब नहीं चलती है।**
>
> नीचे दिया गया हर चरण zcashd पर निर्भर है, जो 18 जुलाई 2026 को अपने स्वचालित End-of-Support रुकाव पर पहुँच गया था। इस पृष्ठ के साथ दिए गए सात स्क्रिप्ट इसे `zcash-cli` के माध्यम से चलाते हैं, इसलिए इनमें से कोई भी आज चल रहे नोड तक नहीं पहुँच सकता।
>
> इन स्क्रिप्ट्स को यांत्रिक रूप से पोर्ट नहीं किया जा सकता। ये raw-transaction और wallet RPCs (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) पर बनी हैं, जिन्हें zcashd ने रुकने से पहले हटा दिया था; Zallet इन्हें नए तरीकों से बदलता है जो raw transaction hex के बजाय PCZTs पर काम करते हैं, और अभी भी beta में है तथा कई zcashd विधियाँ अभी पोर्ट नहीं की गई हैं।
>
> आज Zcash पर बहु-पक्षीय कस्टडी के लिए [FROST & Threshold Custody](/zcash-tech/frost-threshold-custody) देखें, जिसमें transparent multisig से सीधी तुलना शामिल है, और [Ywallet FROST डेमो](/guides/ywallet-frost-demo) देखें। किसी मौजूदा नोड को zcashd से हटाने के लिए [Zebra और Zallet में माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
>
> इस पृष्ठ को transparent multisig कार्यप्रवाह के ऐतिहासिक रिकॉर्ड के रूप में रखा गया है।

इस डेमो के लिए zcashd आवश्यक है, जो 18 जुलाई 2026 को रुक गया और अब नहीं चलता। नीचे दिया गया कुछ भी लाइव चेन पर पूरा नहीं किया जा सकता।

## आवश्यक व्यक्तियों से सार्वजनिक कुंजियाँ एकत्र करें

* https://github.com/iancoleman/bip39
* यदि zcashd का उपयोग कर रहे हैं, तो आप एक UA बना सकते हैं और अपना transparent receiver भी उपयोग कर सकते हैं। फिर अपनी सार्वजनिक कुंजी निकालने के लिए `getPubkey.sh` का उपयोग करें।


## 2x Multisig (3 में से 2) t3 पते बनाएँ

अपना multisig पता और redeem script बनाने के लिए createMultiSig.sh चलाएँ। 3 सार्वजनिक कुंजियों की आवश्यकता है

`./createMultiSig.sh pubk1 pubk2 pubk3`      # पहला t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # बदलाव के पते के लिए दूसरा t3। 

#### नोट: इस उदाहरण में pubk1,pubk4 एक ही व्यक्ति हैं, pubk2,pubk5 एक ही व्यक्ति हैं और इसी तरह आगे ...

#### नोट2: आपकी pubkeys का क्रम मायने रखता है! इस पर ध्यान दें!!!!


## t3 पते में फंड भेजें

पते में फंड भेजने के लिए किसी भी wallet/faucet का उपयोग करें

## MultiSig ट्रांज़ैक्शन बनाएँ

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

जहाँ,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => यह आवश्यक जानकारी ढूँढने में आपकी सहायता करेगा

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## MultiSig TX पर हस्ताक्षर करें

signMultiSigTX.sh खोलें और pk1,pk2, ... वेरिएबल्स में अपनी निजी कुंजियाँ जोड़ें।
 

*** मैं इन्हें अपने टर्मिनल में टाइप करने की अनुशंसा नहीं करूँगा। ***


यदि आपकी सभी निजी कुंजियों तक पहुँच है, तो समय बचाने के लिए आप उन सभी का एक साथ उपयोग कर सकते हैं,
लेकिन वास्तविक दुनिया के अधिकांश उदाहरणों में, हस्ताक्षर दुनिया भर के लोगों द्वारा किए जाएँगे, इसलिए प्रत्येक आवश्यक प्रतिभागी को हस्ताक्षर करना होगा,
फिर अपडेट किया गया raxTX "hex" आउटपुट वापस भेजना होगा, जिसका उपयोग अन्य लोग हस्ताक्षर करके हस्ताक्षर प्रक्रिया पूरी करने के लिए करेंगे।

जो भी पहला tx बनाता है, वह अपनी निजी कुंजी से हस्ताक्षर करेगा और अपडेट किया गया rawTX hex भेजेगा, जिस पर अन्य प्रतिभागियों को हस्ताक्षर करना होगा।

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

इस tx पर हस्ताक्षर करने के लिए, तीन में से कम से कम 2 निजी कुंजियों से हस्ताक्षर होना आवश्यक है। यदि आपकी दी हुई सार्वजनिक कुंजी zcashd से T-address का उपयोग करके export की गई थी, तो आप अपने T पते की निजी कुंजी इससे प्राप्त कर सकते हैं: 


`zcash-cli dumpprivkey "t-addr"`

यह कमांड zcashd के साथ रुक गया और आज कोई परिणाम नहीं देता; इसे यहाँ केवल यह दिखाने के लिए दर्ज किया गया है कि डेमो ने अपनी कुंजियाँ कैसे प्राप्त कीं।


इस डेमो के लिए, मैंने आवश्यक निजी कुंजियों को जल्दी से अलग करने के लिए iancoleman's bip39 का उपयोग किया है।


## हस्ताक्षरित TX प्रसारित करें

`./sendMultiSignedTX.sh signedTXfromLastStep`



# स्रोत

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/

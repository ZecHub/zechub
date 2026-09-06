# Ywallet FROST डेमो

> **Ywallet अब मेंटेन नहीं किया जाता है।** इसके डेवलपर ने पुष्टि की है कि इसे Ironwood (NU6.3) के लिए अपडेट नहीं किया जाएगा, इसलिए यह अब चेन का अनुसरण नहीं कर सकता और नीचे दिए गए चरण mainnet पर पूरे नहीं किए जा सकते। यह पृष्ठ संदर्भ के लिए रखा गया है। उसी डेवलपर का Zkool, इसका मेंटेन किया जाने वाला उत्तराधिकारी है और FROST multisig का समर्थन करता है।

## FROST bins कंपाइल करें

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

ऊपर दिए गए repo का उपयोग करें और कंपाइल करने के निर्देशों का पालन करें: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Bins target फ़ोल्डर में होंगे।


## FROST UA बनाएं

`./generateFROST_UA.sh`



## UFVK को Ywallet में इम्पोर्ट करें

Accounts -> + पर क्लिक करें और ऊपर दिए गए चरण का ufvk पेस्ट करें

## Ywallet के साथ एक लेनदेन बनाएं

कोई भी UA पेस्ट करें और एक tx भेजें। फ़ाइल सहेजें।

## FROST हस्ताक्षर प्रक्रिया शुरू करें

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

पहला इनपुट ऊपर दिए गए चरण की raw tx का स्थान है  
दूसरा इनपुट उस signed tx का स्थान और नाम है जिसे आप broadcast करना चाहते हैं  
यह वह भाग है जहाँ आप FROST को बताते हैं कि आप चाहते हैं कि सभी किस transction पर हस्ताक्षर करें

## Coordinator शुरू करें

`./runCoordinator.sh`

यह प्रत्येक participant के हस्ताक्षर को समन्वित करता है और एक group signature बनाता है

## प्रत्येक Participant से इस लेनदेन पर हस्ताक्षर करवाएं

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## हस्ताक्षरित Transaction को अंतिम रूप दें

Coordinator विंडो में, आउटपुट किए गए group signature को कॉपी करें और उसे FROST signing विंडो में पेस्ट करें।
इससे FROST signing पूरी हो जाएगी और 'mysingedtx' आउटपुट होगा।


## अपना Transaction Ywallet के साथ Broadcast करें

Ywallet के निचले दाएँ भाग में 'More' पर क्लिक करें और 'Broadcast' ढूँढें। 'mysignedtx' ढूँढें और ok पर क्लिक करें।

यदि सब कुछ काम करता है, तो आपको एक transaction ID मिलेगी :)

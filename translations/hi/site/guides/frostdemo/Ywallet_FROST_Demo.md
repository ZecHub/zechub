# Ywallet FROST डेमो

## FROST bins को compile करें

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

ऊपर दिए गए repo का उपयोग करें और compile करने के निर्देशों का पालन करें: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Bins `target` folder में होंगे.


## FROST UA बनाएँ

`./generateFROST_UA.sh`



## UFVK को Ywallet में import करें

Accounts -> + पर क्लिक करें और ऊपर वाले चरण से ufvk पेस्ट करें

## Ywallet के साथ एक transaction बनाएँ

किसी भी UA को पेस्ट करें और एक tx भेजें। फ़ाइल को सहेज लें।

## FROST signing procedure शुरू करें

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

पहला input ऊपर वाले चरण से raw tx का स्थान है
दूसरा input उस signed tx का स्थान और नाम है जिसे आप broadcast करना चाहते हैं
यह वह भाग है जहाँ आप FROST को बताते हैं कि आप कौन-सा transaction सभी से sign करवाना चाहते हैं

## Coordinator शुरू करें

`./runCoordinator.sh`

यह प्रत्येक participant के signature का समन्वय करता है और एक group signature बनाता है

## प्रत्येक Participant से इस transaction पर sign करवाएँ

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Signed Transaction को finalize करें

coordinator window में, output हुई group signature को कॉपी करें और उसे FROST signing window में पेस्ट करें।
इससे FROST signing पूरी हो जाएगी और 'mysingedtx' output होगा


## अपने Transaction को Ywallet के साथ broadcast करें

Ywallet के नीचे दाईं ओर 'More' पर क्लिक करें और 'Broadcast' खोजें। 'mysignedtx' ढूँढें और ok पर क्लिक करें।

यदि सब कुछ सही काम करता है, तो आपको एक transaction ID मिलेगी :)

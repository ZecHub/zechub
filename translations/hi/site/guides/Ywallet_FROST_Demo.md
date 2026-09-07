# Ywallet FROST डेमो

> **Ywallet का रखरखाव अब नहीं किया जाता है।** इसके डेवलपर ने पुष्टि की है कि इसे Ironwood (NU6.3) के लिए अपडेट नहीं किया जाएगा, इसलिए यह अब chain का अनुसरण नहीं कर सकता और नीचे दिए गए चरण mainnet पर पूरे नहीं किए जा सकते। यह पृष्ठ संदर्भ के लिए रखा गया है। उसी डेवलपर का Zkool इसका अनुरक्षित उत्तराधिकारी है और FROST multisig को समर्थित करता है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## FROST bins को कंपाइल करें

[Github लिंक](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

ऊपर दिए गए repo का उपयोग करें और कंपाइल करने के निर्देशों का पालन करें: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Bins target फोल्डर में होंगे।

## FROST UA बनाएं

`./generateFROST_UA.sh`



## UFVK को Ywallet में इम्पोर्ट करें

Accounts -> + पर क्लिक करें और ऊपर दिए गए चरण का ufvk पेस्ट करें

## Ywallet के साथ एक transaction बनाएं

कोई भी UA पेस्ट करें और एक tx भेजें। फ़ाइल सेव करें।

## FROST signing प्रक्रिया शुरू करें

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

पहला input ऊपर दिए गए चरण के raw tx का स्थान है  
दूसरा input उस signed tx का स्थान और नाम है जिसे आप broadcast करना चाहते हैं  
यह वह भाग है जहाँ आप FROST को बताते हैं कि आप सभी से किस transaction पर हस्ताक्षर करवाना चाहते हैं

## Coordinator शुरू करें

`./runCoordinator.sh`

यह प्रत्येक participant के हस्ताक्षर का समन्वय करता है और एक group signature बनाता है

## प्रत्येक Participant से इस transaction पर हस्ताक्षर करवाएं

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## हस्ताक्षरित Transaction को अंतिम रूप दें

Coordinator विंडो में, output हुआ group signature कॉपी करें और उसे FROST signing विंडो में पेस्ट करें।
इससे FROST signing पूरी हो जाएगी और 'mysingedtx' output होगा।


## Ywallet के साथ अपना Transaction broadcast करें

Ywallet के नीचे दाईं ओर 'More' पर क्लिक करें और 'Broadcast' खोजें। 'mysignedtx' खोजें और ok पर क्लिक करें।

यदि सब कुछ काम करता है, तो आपको एक transaction ID मिलेगी :)

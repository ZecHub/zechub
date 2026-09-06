# Ywallet FROST डेमो

> **Ywallet अब रखरखाव में नहीं है।** इसके डेवलपर ने पुष्टि की है कि इसे Ironwood (NU6.3) के लिए अपडेट नहीं किया जाएगा, इसलिए यह अब चेन का अनुसरण नहीं कर सकता और नीचे दिए गए चरण mainnet पर पूरे नहीं किए जा सकते। यह पेज संदर्भ के लिए रखा गया है। उसी डेवलपर का Zkool, इसका रखरखाव किया जा रहा उत्तराधिकारी है और FROST multisig का समर्थन करता है।

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


## FROST बाइनरी संकलित करें

[Github लिंक](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

ऊपर दिए गए repo का उपयोग करें और संकलन के निर्देशों का पालन करें: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

बाइनरी target फ़ोल्डर में होंगी।

## FROST UA बनाएँ

`./generateFROST_UA.sh`



## UFVK को Ywallet में आयात करें

Accounts -> + पर क्लिक करें और ऊपर दिए गए चरण से ufvk पेस्ट करें

## Ywallet से एक लेनदेन बनाएँ

कोई भी UA पेस्ट करें और एक tx भेजें। फ़ाइल सहेजें।

## FROST हस्ताक्षर प्रक्रिया शुरू करें 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

पहला इनपुट ऊपर दिए गए चरण से raw tx का स्थान है
दूसरा इनपुट उस हस्ताक्षरित tx का स्थान और नाम है जिसे आप प्रसारित करना चाहते हैं
यह वह भाग है जहाँ आप FROST को बताते हैं कि आप किस लेनदेन पर सभी से हस्ताक्षर करवाना चाहते हैं

## Coordinator शुरू करें

`./runCoordinator.sh`

यह प्रत्येक प्रतिभागी के हस्ताक्षर का समन्वय करता है और एक समूह हस्ताक्षर बनाता है

## प्रत्येक Participant से इस लेनदेन पर हस्ताक्षर करवाएँ

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## हस्ताक्षरित Transaction को अंतिम रूप दें

coordinator विंडो में, आउटपुट किए गए समूह हस्ताक्षर को कॉपी करें और उसे FROST हस्ताक्षर विंडो में पेस्ट करें।
इससे FROST हस्ताक्षर पूरा हो जाएगा और 'mysingedtx' आउटपुट होगा


## अपना Transaction Ywallet से प्रसारित करें

Ywallet के नीचे-दाएँ भाग में 'More' पर क्लिक करें और 'Broadcast' ढूँढें। 'mysignedtx' ढूँढें और ok पर क्लिक करें।

यदि सब कुछ काम करता है, तो आपको एक transaction ID मिलेगी :)

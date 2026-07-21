# Ywallet FROST डेमो

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


## FROST bins कंपाइल करें

[Github लिंक](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

ऊपर दिए गए repo का उपयोग करें और कंपाइल करने के निर्देशों का पालन करें: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Bins `target` फ़ोल्डर में होंगे।

## FROST UA बनाएँ

`./generateFROST_UA.sh`



## UFVK को Ywallet में इम्पोर्ट करें

Accounts -> + पर क्लिक करें और ऊपर वाले चरण से ufvk पेस्ट करें

## Ywallet के साथ एक transaction बनाएँ

किसी भी UA को पेस्ट करें और एक tx भेजें। फ़ाइल सहेज लें।

## FROST signing प्रक्रिया शुरू करें

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

पहला इनपुट ऊपर वाले चरण से raw tx का स्थान है
दूसरा इनपुट उस signed tx का स्थान और नाम है जिसे आप broadcast करना चाहते हैं
यह वह हिस्सा है जहाँ आप FROST को बताते हैं कि आप कौन-सा transaction सभी से sign करवाना चाहते हैं

## Coordinator शुरू करें

`./runCoordinator.sh`

यह प्रत्येक participant के signature का समन्वय करता है और एक group signature बनाता है

## हर Participant से इस transaction पर sign करवाएँ

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Signed Transaction को अंतिम रूप दें

Coordinator विंडो में, आउटपुट हुए group signature को कॉपी करें और उसे FROST signing विंडो में पेस्ट करें।
इससे FROST signing पूरी हो जाएगी और `mysingedtx` आउटपुट होगा


## Ywallet के साथ अपना Transaction broadcast करें

Ywallet के नीचे दाईं ओर 'More' पर क्लिक करें और 'Broadcast' ढूँढें। `mysignedtx` ढूँढें और ok पर क्लिक करें।

यदि सब कुछ सही से काम करता है, तो आपको एक transaction ID मिलेगी :)

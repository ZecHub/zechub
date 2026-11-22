# Ywallet FROST डेमो

> **Ywallet का अब रखरखाव नहीं किया जाता।** इसके डेवलपर (developer) ने पुष्टि की है कि इसे Ironwood (NU6.3) के लिए अपडेट नहीं किया जाएगा, इसलिए यह अब चेन (chain) का अनुसरण नहीं कर सकता और नीचे दिए गए चरण मेननेट (mainnet) पर पूरे नहीं किए जा सकते। यह पृष्ठ संदर्भ के लिए रखा गया है। उसी डेवलपर का Zkool इसका सक्रिय रूप से रखरखाव किया जाने वाला उत्तराधिकारी है और FROST मल्टीसिग (multisig) को सपोर्ट करता है।

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


## FROST बिन का कंपाइलेशन

[GitHub लिंक](https://github.com/ZcashFoundation/frost-zcash-demo)

ऊपर दी गई रिपॉज़िटरी का उपयोग करें और कंपाइल करने के निर्देशों का पालन करें: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

बिन target फ़ोल्डर में होंगे।

## FROST UA का निर्माण

`./generateFROST_UA.sh`



## Ywallet में UFVK का इम्पोर्ट

Accounts -> + पर क्लिक करें और ऊपर वाले चरण से ufvk पेस्ट करें

## Ywallet के साथ लेनदेन का निर्माण

कोई भी UA पेस्ट करें और एक लेनदेन (transaction) भेजें। फ़ाइल सेव करें।

## FROST साइनिंग प्रक्रिया की शुरुआत 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

पहला इनपुट ऊपर वाले चरण के रॉ लेनदेन का लोकेशन है
दूसरा इनपुट उस साइन किए गए लेनदेन का लोकेशन और नाम है जिसे आप ब्रॉडकास्ट करना चाहते हैं
इस हिस्से में आप FROST को बताते हैं कि आप किस लेनदेन पर सभी से साइन करवाना चाहते हैं

## कोऑर्डिनेटर की शुरुआत

`./runCoordinator.sh`

यह प्रत्येक प्रतिभागी के सिग्नेचर (signature) का समन्वय करता है और एक ग्रुप सिग्नेचर बनाता है

## प्रत्येक प्रतिभागी द्वारा इस लेनदेन पर सिग्नेचर

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## साइन किए गए लेनदेन का अंतिम रूप

कोऑर्डिनेटर विंडो में, आउटपुट के रूप में मिले ग्रुप सिग्नेचर को कॉपी करें और उसे FROST साइनिंग विंडो में पेस्ट करें।
इससे FROST साइनिंग पूरी हो जाएगी और “mysingedtx” आउटपुट होगा


## Ywallet के साथ अपने लेनदेन का ब्रॉडकास्ट

Ywallet के नीचे दाईं ओर “More” पर क्लिक करें और “Broadcast” खोजें। “mysignedtx” खोजें और ok पर क्लिक करें।

यदि सब कुछ ठीक से काम करता है, तो आपको एक लेनदेन ID मिलेगी :)

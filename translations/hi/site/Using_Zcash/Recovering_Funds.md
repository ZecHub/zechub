[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md)

# Zcash वॉलेट फंड रिकवरी

**अपनी private key क्यों सुरक्षित रखें?** 

Private keys आपकी digital assets की सुरक्षा का रहस्य हैं। इन्हें सुरक्षित रखना और कभी भी third parties के साथ साझा न करना अत्यंत आवश्यक है। 

> इस संदर्भ में एक **Seed Phrase** को private key के समतुल्य माना जा सकता है।

अपनी private keys पर नियंत्रण बनाए रखने से recovery प्रक्रिया हमेशा संभव रहती है। Zcash private keys के 2 प्रकार होते हैं (transparent और shielded), और आप इन्हें आसानी से अपने wallet में import कर सकते हैं, चाहे `Sweep Funds` फ़ंक्शन का उपयोग करके या इन्हें एक नए account के रूप में import करके। अपनी private keys पर नियंत्रण बनाए रखने से आप अपनी assets पर पूर्ण नियंत्रण बनाए रखते हैं, जिससे ownership, security और मानसिक शांति सुनिश्चित होती है।

# सुरक्षा और ज़िम्मेदारी

उपयोगकर्ताओं के लिए यह समझना अत्यंत महत्वपूर्ण है कि private keys के साथ काम करने में कौन-कौन से जोखिम शामिल हैं, और इन keys को unauthorized access से सुरक्षित रखना चाहिए। फंड्स की सुरक्षा इस बात पर निर्भर करती है कि उपयोगकर्ता अपनी private keys की रक्षा करने की ज़िम्मेदारी निभाए।

## Ywallet के साथ फंड रिकवरी

YWallet को inaccessible funds की recovery के लिए सबसे अच्छे विकल्पों में से एक माना जाता है, चाहे वे केवल *transparent only* private keys से हों या shielded private keys से।

### 1) Private Key Import 

1. Ywallet डाउनलोड करें[](https://ywallet.app)

2. खुलने के बाद, नीचे दाईं ओर 'More' पर क्लिक करें

3. 'Accounts' चुनें

4. ऊपर दाएँ कोने में plus sign पर क्लिक करें 

![Plus sign button](https://i.postimg.cc/xJbVz7gB/plus.png)

5. 'Restore an account' को toggle करें 

6. Seed phrase या Private key दर्ज करें

> **नोट**: यदि आपके फंड्स ऐसे wallet में थे जो shielded addresses को support नहीं करता (Trust, Coinomi, Guarda आदि), तो आपको 'Sweep Funds' फीचर का उपयोग करना होगा।

### 2) Sweep Funds

1. Ywallet डाउनलोड करें[](https://ywallet.app)

2. खुलने के बाद, नीचे दाईं ओर 'More' पर क्लिक करें

3. नीचे स्क्रॉल करके Tools सेक्शन में जाएँ, फिर 'Sweep' पर क्लिक करें

4. अपना seed phrase दर्ज करें (Gap limit seed द्वारा उत्पन्न अतिरिक्त addresses के लिए scan करता है)

![Sweep Funds screen](https://i.postimg.cc/3055CBcN/sweep.png)

5. जिस destination का आप उपयोग करना चाहते हैं उसके लिए Value Pool दर्ज करें (Exchanges Transparent का उपयोग करते हैं)

6. जहाँ आप फंड्स जमा करना चाहते हैं, उसका Destination Address दर्ज करें। 

## Zkool

फंड रिकवरी के एक अन्य विकल्प के लिए कृपया Zkool का विस्तृत documentation देखें:

- [Zkool Docs](https://hhanh00.github.io/zkool2/guide/start.html)
- [Github](https://github.com/hhanh00/zkool2/)

## ZExCavator

ZExCavator एक ऐसा टूल है जो संभवतः खोए हुए ZEC को recover (excavate!) करता है:

- [ZExCavator](https://zexcavator.com/)
- [Github](https://github.com/zingolabs/zexcavator)

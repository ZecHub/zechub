<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) एक क्रिप्टोग्राफिक सॉफ़्टवेयर पैकेज है जो असुरक्षित चैनलों पर सुरक्षित संचार प्रदान करता है। PGP एन्क्रिप्शन और डिजिटल हस्ताक्षरों के संयोजन का उपयोग करता है ताकि केवल इच्छित प्राप्तकर्ता ही संदेश पढ़ सके और यह सुनिश्चित हो सके कि प्रेषक वही है जो वह होने का दावा करता है।

## उपलब्ध टूल्स

कई अलग-अलग PGP टूल्स उपलब्ध हैं, लेकिन उनमें से कुछ सबसे लोकप्रिय ये हैं:

* **[GPG](https://gpgtools.org/)**: GPG एक निःशुल्क और ओपन-सोर्स PGP implementation है, जो Windows, macOS, और Linux के लिए उपलब्ध है।
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail एक व्यावसायिक PGP ईमेल क्लाइंट है, जो Windows और macOS के लिए उपलब्ध है।
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope Gmail और Thunderbird के लिए एक निःशुल्क और ओपन-सोर्स PGP extension है।

![PGP Tools](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## Keys कैसे जनरेट करें

PGP का उपयोग करने के लिए, आपको keys की एक जोड़ी जनरेट करनी होती है: PGP keys जनरेट करने का तरीका:

1. अपना PGP सॉफ़्टवेयर खोलें।
2. "Generate Key" बटन पर क्लिक करें।
3. अपना नाम और ईमेल पता दर्ज करें।
4. key length चुनें। key length जितनी लंबी होगी, आपकी keys उतनी ही अधिक सुरक्षित होंगी।
5. "Generate" बटन पर क्लिक करें।

आपकी PGP key pair जनरेट हो जाएगी।

![Generate Keys](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## ईमेल के लिए PGP का उपयोग कैसे करें

जब आप PGP key pair जनरेट कर लेते हैं, तो आप इसका उपयोग ईमेल्स को encrypt और decrypt करने के लिए कर सकते हैं। किसी ईमेल को encrypt करने के लिए, आपको प्राप्तकर्ता की public key पता होनी चाहिए। इसके बाद आप अपने PGP टूल का उपयोग करके प्राप्तकर्ता की public key से ईमेल को encrypt कर सकते हैं।

encrypted ईमेल किसी भी ऐसे व्यक्ति के लिए अपठनीय होगी जिसके पास प्राप्तकर्ता की private key नहीं है। ईमेल को decrypt करने के लिए, प्राप्तकर्ता अपनी private key का उपयोग करके ईमेल को decrypt कर सकता है।

![PGP Email](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## सर्वोत्तम अभ्यास

PGP का उपयोग करने के लिए यहाँ कुछ सर्वोत्तम अभ्यास दिए गए हैं:

* अपनी private key को सुरक्षित रखें। private key आपकी PGP key pair का सबसे महत्वपूर्ण हिस्सा है। यदि किसी को आपकी private key मिल जाती है, तो वह उन सभी संदेशों को decrypt कर सकता है जिन्हें आपकी public key से encrypt किया गया है।

![Best Practices 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![Best Practices 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* अपनी public key केवल उन लोगों के साथ साझा करें जिन पर आप भरोसा करते हैं। आप अपनी public key उन्हें सीधे भेजकर, या उसे किसी PGP keyserver पर अपलोड करके साझा कर सकते हैं।
* अपनी PGP keyring के लिए मजबूत passwords का उपयोग करें। आपकी PGP keyring एक फ़ाइल होती है जिसमें आपकी PGP keys संग्रहीत होती हैं। इस फ़ाइल की सुरक्षा के लिए मजबूत password का उपयोग करना महत्वपूर्ण है।
* अपने PGP सॉफ़्टवेयर को अद्यतन रखें। bugs ठीक करने और सुरक्षा बेहतर बनाने के लिए PGP सॉफ़्टवेयर लगातार अपडेट किया जाता है। यह सुनिश्चित करने के लिए कि आप नवीनतम सुरक्षा सुविधाओं का उपयोग कर रहे हैं, अपने सॉफ़्टवेयर को अद्यतन रखना महत्वपूर्ण है।

## PGP के साथ ईमेल को encrypt कैसे करें

* अपना PGP सॉफ़्टवेयर खोलें।
* वह ईमेल खोलें जिसे आप encrypt करना चाहते हैं।
* "Encrypt" बटन पर क्लिक करें।
* प्राप्तकर्ता की public key दर्ज करें।
* "Encrypt" बटन पर क्लिक करें।
* ईमेल encrypt हो जाएगी।

![Encrypt Email](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![Encryption Flow](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## PGP के साथ ईमेल को decrypt कैसे करें

* अपना PGP सॉफ़्टवेयर खोलें।
* encrypted ईमेल खोलें।
* "Decrypt" बटन पर क्लिक करें।
* अपनी private key दर्ज करें।
* "Decrypt" बटन पर क्लिक करें।
* ईमेल decrypt हो जाएगी।

![Decrypt Email](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)

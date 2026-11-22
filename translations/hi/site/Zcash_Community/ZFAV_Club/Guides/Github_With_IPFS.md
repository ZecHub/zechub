<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS के साथ GitHub रिपॉज़िटरी (repository) को सर्व करना

## परिचय

इस गाइड में हम सीखेंगे कि IPFS CID के माध्यम से सर्व की जाने वाली आपकी GitHub रिपॉज़िटरी के लिए git से क्लोन किया जा सकने वाला URL कैसे बनाया जाए। यह भौगोलिक क्षेत्र की परवाह किए बिना सामग्री की उपलब्धता सुनिश्चित करने, सेंसरशिप प्रतिरोध (censorship resistance) और मूल्यवान जानकारी के स्थायी बैकअप के रूप में उपयोगी है!

ध्यान दें: IPFS पर अपलोड किया गया डेटा *सभी* नेटवर्क उपयोगकर्ताओं के लिए उपलब्ध होता है। आप व्यक्तिगत/संवेदनशील डेटा को स्थानीय रूप से एन्क्रिप्ट करना चाह सकते हैं।


## IPFS Kubo का इंस्टॉलेशन

[यहाँ](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions) दिए गए इंस्टॉलेशन निर्देशों का पालन करें।

इस उदाहरण में हम Linux का उपयोग करते हैं, अन्य OS संस्करण भी उपलब्ध हैं।

“ipfs --version” का उपयोग करके जाँचें कि इंस्टॉलेशन सफल रहा।


## रिपॉज़िटरी को क्लोन करना

शुरू करने के लिए, वह Git रिपॉज़िटरी चुनें जिसे आप होस्ट करना चाहते हैं और उसे क्लोन करें:

कमांड चलाएँ: “git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


अब, इसे IPFS के माध्यम से क्लोन किए जाने के लिए तैयार करें।

cd zechub
git update-server-info


Git के ऑब्जेक्ट (objects) को अनपैक करें:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

ऐसा करने से, यदि आप बाद में Git रिपॉज़िटरी को अपडेट करते हैं, तो IPFS ऑब्जेक्ट को डीडुप्लिकेट (deduplicate) कर सकेगा।


## IPFS में जोड़ना

एक बार यह हो जाने के बाद, वह रिपॉज़िटरी सर्व किए जाने के लिए तैयार है। अब बस इसे IPFS में जोड़ना बाकी है:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

परिणामी CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

बहुत बढ़िया! अब आपकी रिपॉज़िटरी नेटवर्क पर अपलोड हो चुकी है।


## IPFS का उपयोग करके क्लोनिंग

अब आप निम्नलिखित का उपयोग करके github रिपॉज़िटरी प्राप्त कर सकेंगे:

git clone http://ipfs.io/ipfs/"yourCID"

वैकल्पिक रूप से, आप अपने स्थानीय IPFS नोड का उपयोग करके खोज और प्राप्ति कर सकते हैं।

अंतिम टिप्पणी: IPFS पर मौजूद रिपॉज़िटरी फ़ोल्डर को वास्तविक github रिपॉज़िटरी के साथ अपडेट प्राप्त नहीं होते। नियमित अंतराल पर फ़ोल्डर को फिर से अपलोड करने की सलाह दी जाती है।

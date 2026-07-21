<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS के साथ GitHub रिपॉज़िटरी सेवा

## परिचय

इस मार्गदर्शक में हम सीखते हैं कि आप अपने GitHub रिपॉज़िटरी के लिए एक git cloneable URL कैसे बनाते हैं, जो IPFS CID का उपयोग करके सेवा में प्रदान किया गया है। 

इसके लिए भौगोलिक क्षेत्र, जबरन अंधाधुंधता के विरोध और महत्वपूर्ण सूचना के लंबे समय तक बैकअप के रूप में उपलब्धता की गारंटी होती है!

ध्यान दें: IPFS पर अपलोड किए गए डेटा सभी नेटवर्क उपयोगकर्ताओं के लिए उपलब्ध होते हैं। आप स्थानीय रूप से व्यक्तिगत/संवेदनशील डेटा को एन्क्रिप्शन करना चाहते हो सकते हैं।

## IPFS Kubo की装置

[यहां](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions) प्रदान किए गए इस्ताल निर्देशों के अनुसरण करें

इस उदाहरण में हम Linux का उपयोग करते हैं, अन्य OS संस्करण उपलब्ध हैं।

उपयोग करके इस्ताल की सफलता की जांच करें   ipfs –version

## रिपॉज़िटरी क्लोन करें

शुरू करने के लिए, अपने विश्वासघात रिपॉज़िटरी चुनें जिसे होस्ट करना आवश्यक है & इसे क्लोन करें:

आदेश चलाएं: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

अब, इसे IPFS के माध्यम से क्लोन करने के तैयार करें।

cd zechub git update-server-info

गिट के ऑब्जेक्ट्स को अपकैस करें:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

यह करने से IPFS आपके गिट रिपॉज़िटरी को बाद में अपडेट करते समय ऑब्जेक्ट्स के डुप्लिकेशन को हटा सकता है।

## IPFS में एड करें

जब आप इसे करते हैं, तो वह रिपॉज़िटरी सेवा के लिए तैयार है। अब करने के लिए बस IPFS में इसे जोड़ें:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

परिणामी CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

ब्रिलियंट! अब आपका रिपॉज़िटरी नेटवर्क पर अपलोड कर दिया गया है।

## IPFS के साथ क्लोन करें

अब आपको GitHub रिपॉज़िटरी को पुनः प्राप्त करने के लिए इसका उपयोग कर सकते हैं:

git clone http://ipfs.io/ipfs/yourCID

एक वैकल्पिक रूप से, आप अपने स्थानीय IPFS नोड का उपयोग करके खोज और प्राप्त कर सकते हैं।

अंतिम ध्यान: IPFS पर रिपॉज़िटरी फोल्डर वास्तविक GitHub रिपॉज़िटरी के साथ समायोजन नहीं होता। आपको नियमित अंतराल पर फोल्डर को फिर से अपलोड करना चाहिए।

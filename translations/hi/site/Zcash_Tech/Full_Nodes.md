<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# पूर्ण नोड

एक पूर्ण नोड किसी भी क्रिप्टोकरेंसी के ब्लॉकचेन की पूरी कॉपी चलाने वाला सॉफ़्टवेयर होता है, जिससे प्रोटोकॉल के फ़ीचर्स तक पहुंच मिलती है।

यह सभी लेन-देन के पूरे रिकॉर्ड धारण करता है, जो कि जन्म से आए हुए हैं। इसलिए यह ब्लॉकचेन में जोड़े गए नए लेन-देन और ब्लॉक की वैधता की पुष्टि कर सकता है।

## Zcashd

Zcashd वर्तमान में Zcash द्वारा इस्तेमाल किये जाने वाले प्राथमिक पूर्ण नोड के कार्यान्वयन है, जिसकी बनावट और रख-रखाव Electric Coin Company द्वारा किया गया है।

Zcashd अपने RPC इंटरफ़ेस के माध्यम से एक सेट API को प्रदान करता है। यह API बाहरी ऐप्लिकेशन के साथ नोड के अंतःक्रिया के फ़ंक्शन प्रदान करता है।

[Lightwalletd](https://github.com/zcash/lightwalletd) Zcashd के सीधे इस्तेमाल के बिना मोबाइल-अनुकूल छिपे हुए लाइट वॉलेट बनाने और रखरखाव करने की सुविधा प्रदान करते हुए, एक ऐप्लिकेशन के उदाहरण है।

[समर्थित RPC कमांड की पूरी सूची](https://zcash.github.io/rpc/)

[Zcashd की पुस्तक](https://zcash.github.io/zcash/)


### एक नोड के चलाना (लिनक्स)

- डिपेंडेंसी स्थापित करें 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- नवीनतम रिलीज को क्लोन, चेकआउट, सेटअप और बिल्ड करें:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- ब्लॉकचेन सिंक (कई घंटों के लिए लग सकता है)

    नोड को चलाने के लिए:

      ./src/zcashd

- प्राइवेट की ~/.zcash/wallet.dat में संग्रहित होते हैं

[Raspberry Pi पर Zcashd का मार्गदर्शन](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra, Zcash प्रोटोकॉल के लिए एक स्वतंत्र पूर्ण नोड कार्यान्वयन है, जिसकी बनावट Zcash Foundation द्वारा की गई है। 

वर्तमान में इसके परीक्षण के अंतर्गत है और यह अभी भी प्रयोगात्मक है।

Zebra के दो मुख्य घटक हैं। एक उपयोगकर्ता घटक, जिसके द्वारा ब्लॉकचेन स्कैन करना और लेन-देन की प्रति डिक्रिप्शन करना होता है। 

दूसरा हिस्सा zebra कमांड लाइन टूल है। यह टूल खरीद संबंधी कुंजियों, पते के प्रबंधन करता है और zebrad में उपयोगकर्ता घटक के साथ संचार करता है, जिससे बुनियादी वॉलेट फ़ंक्शनलिटी प्रदान करता है।

ब्लॉक माइन करने के लिए Zebra को परीक्षण करने वाले किसी भी व्यक्ति को R&D discord सर्वर में शामिल होने का आमंत्रण दिया जाता है। Zebra पुस्तक को पढ़ें सेटअप निर्देशों के लिए। 

[गिटहब](https://github.com/ZcashFoundation/zebra/)

[Zebra पुस्तक](https://zebra.zfnd.org) 

[डिस्कॉर्ड](https://discord.gg/uvEdHsrb)



## नेटवर्क

एक पूर्ण नोड चलाकर, आप Zcash नेटवर्क के वितरण का समर्थन करते हुए इसे मजबूत बनाने में मदद करते हैं। 

यह दुश्मनों के नियंत्रण की रोकथाम में सहायता प्रदान करता है और नेटवर्क के कुछ रूपों के बाधा के प्रति अनुकूलता में सहायता करता है।

DNS seeders एक निहित सर्वर के माध्यम से अन्य विश्वसनीय नोड के सूची प्रदान करते हैं। इसके द्वारा लेन-देन नेटवर्क में प्रसारित हो सकते हैं। 

### नेटवर्क स्टैट्स

ये उदाहरण के अनुसार प्लेटफ़ॉर्म हैं, जो Zcash नेटवर्क डेटा तक पहुंच प्रदान करते हैं:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

आप नेटवर्क के विकास में सहायता कर सकते हैं, परीक्षण चलाकर या नए सुधारों के प्रस्ताव देकर और मेट्रिक्स प्रदान करके। 



### माइनिंग

माइनर्स को अपने सभी माइनिंग संबंधी RPC जैसे getblocktemplate & getmininginfo तक पहुंच के लिए पूर्ण नोड की आवश्यकता होती है। 

Zcashd माइनिंग को छिपे हुए कॉइनबेस तक सक्षम बनाता है। माइनर्स और माइनिंग पूल के लिए, डिफ़ॉल्ट रूप से z-पता में छिपे हुए ZEC जमा करने के लिए सीधे माइनिंग करने का विकल्प होता है। 

[माइनिंग मार्गदर्शक पढ़ें](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) या [Zcash माइनर्स के लिए समुदाय फोरम पृष्ठ](https://forum.zcashcommunity.com/c/mining/13) में शामिल हों।

### गोपनीयता 

एक पूर्ण नोड के चलाने से, आप Zcash नेटवर्क पर सभी लेन-देन और ब्लॉक की स्वतंत्र रूप से पुष्टि कर सकते हैं।

एक पूर्ण नोड के चलाने से, तीसरे पक्ष के सेवा के उपयोग के माध्यम से लेन-देन की पुष्टि करने से संबंधित कुछ गोपनीयता जोखिमों से बचा जा सकता है।

अपने नोड के उपयोग करने से, [Tor](https://zcash.github.io/zcash/user/tor.html) के माध्यम से नेटवर्क के साथ जुड़ा जा सकता है।
यह अन्य उपयोगकर्ताओं के लिए आपके नोड .onion पते के माध्यम से गोपनीय रूप से जुड़ने का अतिरिक्त फायदा भी है।


**सहायता की आवश्यकता है?**

[समर्थन दस्तावेज़ पढ़ें](https://zcash.readthedocs.io/en/latest/)

हमारे [डिस्कॉर्ड सर्वर](https://discord.gg/zcash) में शामिल हों या हमसे [ट्विटर पर](https://twitter.com/ZecHub) संपर्क करें

---

**Protected terms (keep in English):** `Zaino` `Zallet`

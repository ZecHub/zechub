<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# पूर्ण नोड

## संक्षेप में

- एक पूर्ण नोड Zcash blockchain की पूरी प्रतिलिपि रखता है और प्रत्येक नए ब्लॉक व लेनदेन को सहमति नियमों के विरुद्ध जांचता है।
- Zebra (`zebrad`) आज इंस्टॉल करने योग्य नोड है। Zakura, Zebra से fork किया गया दूसरा कार्यान्वयन है।
- zcashd सेवानिवृत्त हो चुका है। इसका End-of-Support अवरोध 18 जुलाई 2026 को ब्लॉक ऊंचाई 3417100 पर पहुंचा, और वे नोड अब शुरू नहीं होते।
- नोड और wallet अब अलग-अलग प्रोग्राम हैं। [Zallet](https://github.com/zcash/zallet) एक नोड के साथ चलता है और keys रखता है।
- अपना नोड चलाने से आपको स्वतंत्र सत्यापन मिलता है और किसी अन्य के server पर भरोसा करने की आवश्यकता समाप्त होती है।

## मूल व्याख्या

पूर्ण नोड ऐसा सॉफ़्टवेयर है जो किसी cryptocurrency की blockchain की पूर्ण प्रतिलिपि चलाता है, जिससे आपको protocol की सुविधाओं तक पहुंच मिलती है।

यह genesis से अब तक हुए प्रत्येक लेनदेन का पूर्ण रिकॉर्ड रखता है और इसलिए blockchain में जोड़े जाने वाले नए लेनदेन और ब्लॉकों की वैधता सत्यापित कर सकता है।

## नोड कार्यान्वयन

### Zebra

Zebra, Zcash protocol का एक स्वतंत्र, production-ready पूर्ण नोड कार्यान्वयन है, जिसे Zcash Foundation ने बनाया है और Rust में लिखा गया है। चूंकि zcashd सेवानिवृत्त हो चुका है, Zebra (`zebrad`) नए deployments के लिए अनुशंसित पूर्ण नोड है।

Zebra ब्लॉकों और लेनदेनों को सत्यापित करता है, peer-to-peer network में भाग लेता है, और applications के लिए RPC interface उपलब्ध कराता है। wallet अब एक अलग component है: [Zallet](https://github.com/zcash/zallet) एक Zebra नोड के साथ चलता है तथा keys और balances संभालता है। यह zcashd का स्थान लेता है, जिसमें नोड और wallet एक ही process में शामिल थे।

shielded light wallets को सेवा देने के लिए, नोड एक indexer के साथ चलता है, जो स्थापित [lightwalletd](https://github.com/zcash/lightwalletd) या नया [Zaino](https://zechub.wiki/zcash-tech/zaino) हो सकता है।

सेट-अप निर्देशों के लिए Zebra book अवश्य पढ़ें, और सहायता के लिए R&D Discord server से जुड़ें।

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Zebra Book](https://zebra.zfnd.org)

इंस्टॉल चरणों, configuration और hardware आवश्यकताओं के लिए [Zebra पूर्ण नोड](/zcash-tech/zebra-full-node) देखें।

### Zakura

Zakura, Zebra से fork किया गया और Valar Group द्वारा Project Tachyon के साथ विकसित दूसरा consensus-compatible पूर्ण नोड है। यह समान protocol नियमों का पालन करता है और तेज synchronization, block pruning तथा zcashd RPC compatibility layer जोड़ता है। [Zakura नोड](/zcash-tech/zakura-node) देखें।

### zcashd (सेवानिवृत्त)

> **नोट:** zcashd सेवानिवृत्त हो चुका है। Electric Coin Company [ने अप्रचलन की घोषणा की](https://z.cash/support/zcashd-deprecation/), और स्वचालित End-of-Support अवरोध 18 जुलाई 2026 को ब्लॉक ऊंचाई 3417100 पर पहुंचा। प्रत्येक अपरिवर्तित zcashd 6.20.0 नोड उस ऊंचाई पर बंद हो गया और दोबारा शुरू होने से इनकार करता है, तथा सॉफ़्टवेयर NU6.3 को समर्थन नहीं देता। Zebra का उपयोग करें। यदि आपके पास zcashd `wallet.dat` है, तो [माइग्रेशन गाइड: zcashd से zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet) का पालन करें।

zcashd, Zcash के लिए मूल पूर्ण नोड कार्यान्वयन था, जिसे Electric Coin Company ने विकसित और बनाए रखा। नीचे दिए गए build निर्देश संदर्भ हेतु तथा zcashd से दूर migrate करने वाले operators के लिए रखे गए हैं।

zcashd अपने RPC interface के माध्यम से API's का एक सेट उपलब्ध कराता है। ये API's ऐसे functions प्रदान करते हैं जो बाहरी applications को नोड के साथ interact करने देते हैं।

[lightwalletd](https://github.com/zcash/lightwalletd) ऐसे application का उदाहरण है जो developers को zcashd के साथ सीधे interact किए बिना mobile-friendly shielded light wallets बनाने और बनाए रखने में सक्षम करने के लिए पूर्ण नोड का उपयोग करता है।

[समर्थित RPC commands की पूरी सूची](https://zcash.github.io/rpc/)

[zcashd book](https://zcash.github.io/zcash/)

#### नोड शुरू करें (Linux)

- Dependencies इंस्टॉल करें

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- नवीनतम release clone करें, checkout करें, setup करें और build करें:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Blockchain sync करें (इसमें कई घंटे लग सकते हैं)

    नोड शुरू करने के लिए चलाएं:

      ./src/zcashd

- Private Keys ~/.zcash/wallet.dat में संग्रहित होती हैं

[Raspberry Pi पर zcashd की गाइड](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## व्यावहारिक निहितार्थ

### नेटवर्क

पूर्ण नोड चलाकर आप zcash network के decentralization का समर्थन करके उसे मजबूत बनाने में सहायता करते हैं।

यह विरोधी नियंत्रण को रोकने और network को कुछ प्रकार के व्यवधानों के प्रति resilient बनाए रखने में मदद करता है।

DNS seeders एक built-in server के माध्यम से अन्य विश्वसनीय नोड की सूची उपलब्ध कराते हैं। इससे लेनदेन पूरे network में प्रसारित हो पाते हैं।

### नेटवर्क आँकड़े

ये उदाहरण platforms हैं जो Zcash Network data तक पहुंच प्रदान करते हैं:

[Zcash ब्लॉक एक्सप्लोरर](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

आप tests चलाकर या नए सुधार प्रस्तावित करके एवं metrics उपलब्ध कराकर भी network के विकास में योगदान दे सकते हैं।

### Mining

Miners को getblocktemplate और getmininginfo जैसे सभी mining-संबंधित RPC's तक पहुंचने के लिए पूर्ण नोड की आवश्यकता होती है।

zcashd shielded coinbase में mining भी सक्षम करता है। Miners और mining pools के पास default रूप से z-address में shielded ZEC जमा करने के लिए सीधे mine करने का विकल्प होता है।

[Mining Guide](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) पढ़ें या [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13) के लिए Community Forum पृष्ठ से जुड़ें।

### गोपनीयता

पूर्ण नोड चलाने से आप Zcash network पर सभी लेनदेन और ब्लॉकों को स्वतंत्र रूप से सत्यापित कर सकते हैं।

पूर्ण नोड चलाने से आपकी ओर से लेनदेन सत्यापित करने के लिए third-party services का उपयोग करने से जुड़े कुछ गोपनीयता जोखिमों से बचा जा सकता है।

अपना नोड उपयोग करने से [Tor](https://zcash.github.io/zcash/user/tor.html) के माध्यम से network से जुड़ना भी संभव होता है।
इसका अतिरिक्त लाभ यह है कि अन्य users आपके नोड के .onion address से निजी रूप से जुड़ सकते हैं।

## सामान्य गलतियाँ

- ऊपर दिए गए निर्देशों से zcashd build करना और एक कार्यशील नोड की अपेक्षा करना। वे binaries अप्रचलन ऊंचाई पर रुक जाते हैं।
- नोड चलाना और यह मान लेना कि आपका mobile wallet अब इसका उपयोग करता है। जब तक आप उसे अपने नोड की ओर निर्देशित नहीं करते, light wallet उसी server से बात करता रहता है जिसके लिए वह configured है। [Lightwallet नोड](/zcash-tech/lightwallet-nodes) देखें।
- केवल `zebrad` चलाना और light wallets के जुड़ने की अपेक्षा करना। नोड के साथ एक indexer होना आवश्यक है, lightwalletd या [Zaino](/zcash-tech/zaino) में से कोई एक।
- नोड पर wallet RPCs ढूंढना। Keys और balances Zallet में स्थानांतरित हो गए हैं।

## संबंधित पृष्ठ

- [Zebra पूर्ण नोड](/zcash-tech/zebra-full-node) - अनुशंसित नोड इंस्टॉल, configure और चलाएं
- [Zakura नोड](/zcash-tech/zakura-node) - Zebra से fork किया गया दूसरा नोड कार्यान्वयन
- [Lightwallet नोड](/zcash-tech/lightwallet-nodes) - वे servers जिनसे light wallets query करते हैं
- [Zaino](/zcash-tech/zaino) - light wallets को सेवा देने वाला Rust indexer
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) - syncing इस तरह क्यों कार्य करता है

## आगे सीखें

[सहायता दस्तावेज़ीकरण](https://zcash.readthedocs.io/en/latest/) पढ़ें

हमारे [Discord Server](https://discord.gg/zcash) से जुड़ें या [X](https://X.com/ZecHub) पर हमसे संपर्क करें

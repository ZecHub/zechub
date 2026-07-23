---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Full Nodes

Full Node वह software है जो किसी भी cryptocurrency की blockchain की पूर्ण प्रति चलाता है, जिससे protocol की सुविधाओं तक पहुँच मिलती है।

यह genesis से अब तक हुई हर transaction का पूरा रिकॉर्ड रखता है और इसलिए blockchain में जोड़ी जाने वाली नई transactions और blocks की वैधता सत्यापित कर सकता है।

## Zcashd

> **नोट:** zcashd को चरणबद्ध रूप से हटाया जा रहा है। Electric Coin Company ने [औपचारिक रूप से घोषणा की है](https://z.cash/support/zcashd-deprecation/) कि zcashd को सेवानिवृत्त किया जा रहा है, और उसकी full-node भूमिका को [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) तथा उसकी wallet भूमिका को [Zallet](https://github.com/zcash/zallet) द्वारा प्रतिस्थापित किया जा रहा है। नई deployments के लिए Zebra का उपयोग करें (नीचे देखें)। यदि आप पहले से zcashd node चला रहे हैं, तो [Migration Guide: zcashd to Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet) का पालन करें।

zcashd, Zcash के लिए मूल Full Node implementation था, जिसे Electric Coin Company ने विकसित और अनुरक्षित किया था। नीचे दिए गए build निर्देश संदर्भ के लिए और उन operators के लिए सुरक्षित रखे गए हैं जो zcashd से migrate कर रहे हैं।

Zcashd अपने RPC interface के माध्यम से API's का एक सेट उपलब्ध कराता है। ये API's ऐसे functions प्रदान करती हैं जो external applications को node के साथ interact करने की अनुमति देती हैं।

[Lightwalletd](https://github.com/zcash/lightwalletd) एक ऐसे application का उदाहरण है जो full node का उपयोग करता है, ताकि developers सीधे Zcashd के साथ interact किए बिना mobile-friendly shielded light wallets बना और अनुरक्षित कर सकें।

[समर्थित RPC commands की पूरी सूची](https://zcash.github.io/rpc/)

[The Zcashd book](https://zcash.github.io/zcash/)


### Node शुरू करना (Linux)

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

    node शुरू करने के लिए चलाएँ:

      ./src/zcashd

- Private Keys `~/.zcash/wallet.dat` में संग्रहीत होती हैं

[Raspberry Pi पर Zcashd के लिए गाइड](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra, Zcash protocol का एक स्वतंत्र, production-ready full node implementation है, जिसे Zcash Foundation ने बनाया है और जो Rust में लिखा गया है। चूँकि zcashd सेवानिवृत्त हो रहा है, इसलिए नई deployments के लिए Zebra (`zebrad`) अनुशंसित full node है।

Zebra blocks और transactions को validate करता है, peer-to-peer network में भाग लेता है, और applications के लिए एक RPC interface उपलब्ध कराता है। अब wallet एक अलग component है: [Zallet](https://github.com/zcash/zallet) Zebra node के साथ चलता है और keys तथा balances को संभालता है। यह zcashd का स्थान लेता है, जो node और wallet को एक ही process में bundled रखता था।

shielded light wallets को सेवा देने के लिए, node एक indexer के साथ चलता है, या तो स्थापित [lightwalletd](https://github.com/zcash/lightwalletd) या नया [Zaino](https://zechub.wiki/zaino)।

setup निर्देशों के लिए Zebra book अवश्य पढ़ें, और सहायता के लिए R&D Discord server से जुड़ें। 

[Github](https://github.com/ZcashFoundation/zebra/)

[The Zebra Book](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## Network

full node चलाकर आप zcash network के decentralization को समर्थन देकर उसे और मजबूत बनाने में मदद करते हैं। 

यह विरोधी नियंत्रण को रोकने और network को कुछ प्रकार के व्यवधानों के प्रति लचीला बनाए रखने में मदद करता है।

DNS seeders एक built-in server के माध्यम से अन्य भरोसेमंद nodes की सूची उपलब्ध कराते हैं। इससे transactions पूरे network में propagate हो पाती हैं। 

### Network Stats

ये कुछ उदाहरण platforms हैं जो Zcash Network data तक पहुँच प्रदान करते हैं:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

आप tests चलाकर, नए improvements प्रस्तावित करके और metrics प्रदान करके भी network के विकास में योगदान दे सकते हैं। 



### Mining

Miners को mining से संबंधित सभी rpc's जैसे getblocktemplate और getmininginfo तक पहुँचने के लिए full nodes की आवश्यकता होती है। 

Zcashd shielded coinbase के लिए mining भी सक्षम करता है। Miners और mining pools के पास यह विकल्प होता है कि वे सीधे mine करें ताकि default रूप से z-address में shielded ZEC संचित कर सकें। 

[Mining Guide](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) पढ़ें या [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13) के लिए Community Forum पेज से जुड़ें।

### Privacy 

full node चलाने से आप Zcash network पर सभी transactions और blocks को स्वतंत्र रूप से सत्यापित कर सकते हैं।

full node चलाने से उन privacy जोखिमों से बचाव होता है जो आपकी ओर से transactions सत्यापित करने के लिए third-party services का उपयोग करने से जुड़े होते हैं।

अपना स्वयं का node उपयोग करने से [Tor](https://zcash.github.io/zcash/user/tor.html) के माध्यम से network से जुड़ना भी संभव होता है।
इसका एक अतिरिक्त लाभ यह है कि अन्य users आपके node के .onion address से निजी रूप से जुड़ सकते हैं।


**मदद चाहिए?**

[Support Documentation](https://zcash.readthedocs.io/en/latest/) पढ़ें

हमारे [Discord Sever](https://discord.gg/zcash) से जुड़ें या [twitter](https://twitter.com/ZecHub) पर हमसे संपर्क करें

<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Nym Mixnet द्वारा Zcash के लिए गुमनामी

> अंतिम सत्यापन: 18 अक्टूबर, 2026

Zcash shielded pools ऑन-चेन राशियों, प्रेषकों और प्राप्तकर्ताओं को छिपाते हैं। वे wallet और lightwallet server के बीच नेटवर्क पथ को नहीं छिपाते। Nym का mixnet उस अनुपस्थित नेटवर्क-लेयर सुरक्षा को जोड़ता है। अक्टूबर 2026 तक, एकीकरण प्रोडक्शन wallets (Zingo, Zkool) में सक्रिय है।

स्रोत: [कैसे Nym Zcash wallets में गुमनामी जोड़ता है](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 अक्टूबर 2026)।

## क्या सुरक्षित है

Nym transaction packets (आमतौर पर spending data और ZK proofs के 7–15 KB) को Sphinx packets में विभाजित करता है और उन्हें mixnet के माध्यम से रूट करता है। यह:

- lightwallet server से प्रेषक का IP छिपाता है
- ट्रैफ़िक को अन्य Nym ट्रैफ़िक के साथ मिलाता है
- डिफ़ॉल्ट सेटिंग्स पर लगभग 17 बिट entropy प्रदान करता है, जिसमें उद्धृत anonymity set 100,000 उपयोगकर्ताओं से अधिक है

Zingo v7 में payments और price requests डिफ़ॉल्ट रूप से इसी पथ का अनुसरण करते हैं।

## क्या सुरक्षित नहीं है

Chain synchronization, nullifier queries, transaction fetches और mempool traffic वर्तमान में सामान्य indexer connection का उपयोग करते हैं। मिश्रित packets के बाहर का device-level या application-level metadata भी Nym के दायरे से बाहर है।

यदि आपके threat model में sync traffic छिपाना आवश्यक है, तो native-mixnet wallet को system-level NymVPN के साथ संयोजित करें। [Nym VPN](/guides/nym-vpn) देखें।

## Wallets

| Wallet | स्थिति | टिप्पणियाँ |
| --- | --- | --- |
| Zingo v7 | सक्रिय, डिफ़ॉल्ट | `makers run-cli`, `nym-proxy` को बंडल करता है। सत्र ऑफ़लाइन शुरू होता है; `--online`, `--remember-online`, या `--server` सहमति प्रदान करता है। |
| Zkool | सक्रिय | Native mixnet integration। |
| अन्य | NymVPN के माध्यम से | Wallet को system-level Mixnet mode के माध्यम से रूट करें। |

Wallet-स्तर के पथ की सेटअप जानकारी [Zcash Wallet Traffic को Nym Mixnet के माध्यम से रूट करें](/guides/nym-mixnet-wallet-setup) में है।

## समझौते

Nym-रूटेड broadcast, clearnet (~3.4 s) की तुलना में लगभग 12.5× धीमा है। Tor तेज़ है (~3.7×), लेकिन mixing के बिना FIFO streams का उपयोग करता है, इसलिए एक वैश्विक adversary फिर भी correlation कर सकता है। साझा Nym user base बढ़ाना अतिरिक्त delay जोड़ने की तुलना में गुमनामी को अधिक प्रभावी ढंग से बढ़ाता है।

## Application-layer स्वच्छता: nym-swizzle-zcash

नेटवर्क-लेयर सुरक्षा पर्याप्त नहीं है। एक पूर्ण mixnet या VPN के साथ भी, lightwallet server application-layer patterns देखकर sessions को अब भी लिंक कर सकता है:

- Resume-point chaining: clients ठीक `previous end + 1` से sync फिर शुरू करते हैं, इसलिए server केवल block height के आधार पर sessions को श्रृंखलाबद्ध कर सकता है।
- Sync-then-send: wallets broadcast करने से तुरंत पहले sync करते हैं, जिससे server किसी transaction को पूर्व sync session से जोड़ सकता है।

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate एक Zcash-विशिष्ट स्वच्छता नीति लागू करता है जो दोनों समस्याओं का समाधान करती है। यह light clients के लिए सामान्य `nym-swizzle` primitives को chain-aware policy में पैकेज करता है।

**परिमाणित sync ranges।** अनुरोधों को दिन-आकार की cells वाली नेटवर्क-व्यापी grid तक विस्तृत किया जाता है। शुरुआत को नीचे की ओर round किया जाता है और अंत को ऊपर की ओर। Ranges नियतात्मक, आरोही और असंबद्ध होती हैं। Reorg checks विस्तृत range के भीतर रहते हैं, ताकि सटीक resume point प्रकट न हो। गुमनामी noise के बजाय collision (कई wallets द्वारा समान boundaries जारी करना) से आती है।

**अलग किए गए broadcasts।** Transaction sends को ZIP 318 transfer scheduling से मेल खाते exponential distribution (औसत 144 blocks ≈ 3 घंटे, सीमा 576 blocks ≈ 12 घंटे) द्वारा विलंबित किया जाता है। विलंब सामान्य process lifetimes से अधिक होते हैं, इसलिए schedules को स्थायी रूप से संग्रहीत किया जाता है। Transaction केवल fire time पर एक ताज़ा tip के विरुद्ध बनाया जाता है। Sync और broadcast को अलग servers का उपयोग करना चाहिए।

Crate `BlockSource` और `TxBroadcaster` traits प्रदान करता है, `wasm32-unknown-unknown` के लिए compile होता है, और इसका अपना कोई network stack नहीं है। पूर्ण API और उदाहरणों के लिए [Nym docs](https://nym.com/docs/developers/swizzle/zcash) देखें।

## स्रोत

- [कैसे Nym Zcash wallets में गुमनामी जोड़ता है](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 अक्टूबर 2026
- [nym-swizzle-zcash: Zcash Light Clients के लिए Hygiene Policy](https://nym.com/docs/developers/swizzle/zcash) — Nym Docs
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Zcash Wallet Traffic को Nym Mixnet के माध्यम से रूट करें](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub

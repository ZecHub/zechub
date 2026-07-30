# Zero से Zero Knowledge तक: Mnemonic Seed Phrases

**श्रृंखला:** Zero से Zero Knowledge तक

Mnemonic seed phrases cryptocurrency के सबसे महत्वपूर्ण पहलुओं में से एक — **self-custody** — की आधारशिला हैं।  
आज हम सीखेंगे कि एक seed phrase कैसे उत्पन्न की जाती है और wallets में उसका उपयोग कैसे होता है।

---

## Mnemonic Seed Phrases क्या हैं?

Recovery phrases को **BIP-39** specification द्वारा परिभाषित किया गया है, जो आज उपयोग में आने वाली recovery phrase का सबसे सामान्य प्रकार है।

Recovery phrases का निर्माण **randomness** उत्पन्न करने से शुरू होता है। अधिक entropy का अर्थ है अधिक सुरक्षा। अधिकांश उपयोगकर्ताओं के लिए **128 bits** entropy पर्याप्त मानी जाती है।

![Seed phrase concept](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

प्रारंभिक entropy की लंबाई के आधार पर, recovery phrase **12 से 24 शब्दों** की होगी।

---

## चरण-दर-चरण: 12-शब्दों वाली Seed Phrase कैसे उत्पन्न की जाती है

### 1. Entropy उत्पन्न करें
हम **128 bits** entropy उत्पन्न करके शुरुआत करते हैं।

### 2. Checksum जोड़ें
हम entropy को **SHA256** का उपयोग करके hash करते हैं। इस hash के शुरुआती कुछ bits checksum बन जाते हैं।  
यह हमारी entropy के लिए एक अद्वितीय fingerprint देता है।

![Entropy + Checksum diagram](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. 11-bit खंडों में विभाजित करें
कुल 132 bits (128 entropy + 4 checksum) को 11 bits के खंडों में विभाजित किया जाता है।

### 4. Wordlist से मिलान करें
प्रत्येक 11-bit sequence को एक decimal संख्या (0-2047) में बदला जाता है।  
BIP-39 wordlists में ठीक **2048 शब्द** होते हैं (English, Spanish, Chinese, आदि)।

इन संख्याओं का उपयोग wordlist में संबंधित शब्द खोजने के लिए किया जाता है।

![Word mapping example](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**परिणाम:** अब हमारे पास एक सुरक्षित, मानव-पठनीय 12-शब्दों वाली recovery phrase है!

---

## Recovery Phrase -> Seed -> Payment Addresses

Recovery phrase का उपयोग करके, एक wallet payment addresses और अलग-अलग wallet accounts बनाने के लिए keys उत्पन्न कर सकता है।

उत्पन्न की गई keys **deterministic** होती हैं — वही input हमेशा वही output देता है।

### Seed Generation
Wallet seed, mnemonic phrase से एक **Key Derivation Function (KDF)** का उपयोग करके निकाली जाती है:

- **Bitcoin** में: PBKDF2  
- **Zcash** में: Blake2b-256/512

इससे एक **64-byte (512-bit)** seed उत्पन्न होती है।

![Seed to master keys](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Master Keys
Seed को 32-byte के दो sequence में विभाजित किया जाता है:
- **Master Spending Key**
- **Master Chain Code**

इनका उपयोग **Hierarchical Deterministic (HD) Wallets** में child key derivation के लिए किया जाता है।

---

## Zcash की विशिष्ट विशेषताएँ (ZIP-32)

Zcash में, **viewing authority** या **spending authority** को master seed से समझौता किए बिना sub-trees के लिए स्वतंत्र रूप से delegate किया जा सकता है।

**ZIP-32** hierarchical deterministic key generation standard को परिभाषित करता है, जिसे Zcash की privacy features के अनुरूप अनुकूलित किया गया है।

एक **Expanded Spending Key** से हम प्राप्त करते हैं:
- Full Viewing Key
- Incoming Viewing Key
- payment addresses का एक set

अलग-अलग derivation mechanisms ऐसी external addresses उत्पन्न करते हैं जो shielded pools (Sapling & Orchard) के बीच senders को देने के लिए उपयुक्त होती हैं।

![Zcash key derivation hierarchy](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash wallet operations जैसे Auto-Shielding के लिए **internal addresses** का भी समर्थन करता है।

---

## संसाधन

- [ZIP-32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash Protocol Specification (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Shielded-by-default wallets का अवलोकन](https://zechub.wiki)

---

**ZecHub (@ZecHub) द्वारा मूल Thread**  
https://x.com/ZecHub/status/1624125037945946145

---

*यह पृष्ठ ZecHub wiki के लिए मूल Zero to Zero Knowledge thread से संकलित किया गया था।*

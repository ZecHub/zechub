<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Improvement_Proposals.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Improvement Proposals

<img width="672" height="378" alt="1" src="/content-images/fbce4a28-585b-4caa-b306-4cf06bcb5977-0b61791008.webp" />



# ZIP क्या है
Zcash Improvement Proposal (ZIP) एक डिज़ाइन दस्तावेज़ है जो Zcash समुदाय को जानकारी प्रदान करता है, या Zcash अथवा उसकी प्रक्रियाओं या परिवेश के लिए किसी नई सुविधा का वर्णन करता है। ZIP में उस सुविधा का संक्षिप्त तकनीकी विनिर्देशन और उसके लिए तर्क होना चाहिए।

हमारा उद्देश्य है कि ZIPs नई सुविधाओं का प्रस्ताव रखने, किसी मुद्दे पर समुदाय की राय एकत्र करने, और Zcash में शामिल किए गए डिज़ाइन निर्णयों का दस्तावेज़ीकरण करने का प्राथमिक माध्यम बनें। ZIP के Owner(s) (आमतौर पर author(s)) समुदाय के भीतर सहमति बनाने और असहमति वाले विचारों का दस्तावेज़ीकरण करने के लिए ज़िम्मेदार होते हैं।

क्योंकि ZIPs को एक versioned repository में text files के रूप में संधारित किया जाता है, उनका revision history फीचर प्रस्ताव का ऐतिहासिक अभिलेख होता है।

-> [zips.z.cash](https://zips.z.cash)


## ZIP संपादक

हर आने वाले ZIP को समीक्षा प्रक्रिया से गुजरना होता है। ZIP संपादकों का कार्य यह सुनिश्चित करना है कि किसी भी ZIP का प्रारूप और सामग्री उसमें किए गए terms, rationale और technical changes का पर्याप्त रूप से वर्णन करे। 

```markdown
* Jack Grigg, Kris Nuttycombe and Daira-Emma Hopwood associated with the ECC.
* Conrado, and Arya, associated with the ZF.
* Sam and Mark, associated with SL.
```

## उल्लेखनीय वर्तमान ZIPs

नीचे दी गई स्थितियाँ और शीर्षक 18 अगस्त 2026 को [zips.z.cash](https://zips.z.cash/#index-of-zips) पर ZIP index के आधार पर जाँचे गए थे। किसी ZIP की स्थिति समय के साथ बदलती रहती है, इसलिए index को ही सत्य का स्रोत मानें।

> Draft: [Transparent Zcash Extensions](https://zips.z.cash/zip-0222)

> Draft: [Zcash Shielded Assets का Transfer और Burn](https://zips.z.cash/zip-0226)

> Draft: [Zcash Shielded Assets का Issuance](https://zips.z.cash/zip-0227)

> Withdrawn: [Withdrawn Version 6 Transaction Format](https://zips.z.cash/zip-0230) — इसे ZIP 229 ने अप्रचलित कर दिया है, जो अब transaction version 6 को परिभाषित करता है। नीचे दी गई NU6.3 सूची देखें।

> Draft: [Transparent Zcash Extensions के लिए Transaction Identifier Digests और Signature Validation](https://zips.z.cash/zip-0245)

> Draft: [Standardized Memo Field Format](https://zips.z.cash/zip-0302)

> Draft: [Sapling Address Signatures](https://zips.z.cash/zip-0304)

> Draft: [Payment Detection के लिए Light Client Protocol](https://zips.z.cash/zip-0307)

> Draft: [Sapling Viewing Keys के Security Properties](https://zips.z.cash/zip-0310)

> Active: [ऐसे Address Type को परिभाषित करना जिसमें funds केवल Transparent Addresses से ही भेजे जा सकते हैं](https://zips.z.cash/zip-0320)

> Draft: [Wallet.dat format](https://zips.z.cash/zip-0400)

## NU6.3 (Ironwood) ZIPs

NU6.3 का वर्णन ZIP 258 में किया गया है, साथ ही यहाँ सूचीबद्ध अतिरिक्त ZIPs के साथ। पूर्ण candidate set [ZIP index](https://zips.z.cash/#nu6-3-candidate-zips) पर प्रकाशित है।

> Draft: [NU6.3 Network Upgrade का Deployment](https://zips.z.cash/zip-0258)

> Draft: [Version 6 Transaction Format](https://zips.z.cash/zip-0229)

> Draft: [Orchard से Ironwood Migration](https://zips.z.cash/zip-0318)

> Draft: [Wallets के लिए NU6.3 के Consequences](https://zips.z.cash/zip-0326)

> Proposed: [Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)

> Reserved: [Orchard Pool में Transfers को सीमित करना](https://zips.z.cash/zip-2006)

तीन पहले के ZIPs भी NU6.3 के लिए अद्यतन किए गए हैं: [ZIP 209](https://zips.z.cash/zip-0209), [ZIP 213](https://zips.z.cash/zip-0213) और [ZIP 317](https://zips.z.cash/zip-0317)।

<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash प्रणाली सुरक्षा

## प्रणाली सुरक्षा निर्देशक

ZCG ग्रैंट के माध्यम से Zcash प्रणाली सुरक्षा निर्देशक की भूमिका स्थापित की गई है, जो ECC और ZF के बाहर व्यापक Zcash प्रणाली - विशेष रूप से ZCG ग्रैंट देने वालों - के लिए सुरक्षा इंजीनियरिंग के लिए समर्पित है।

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) पहला प्रणाली सुरक्षा निर्देशक थे। अधिक जानने के लिए [zecsec.com](https://zecsec.com) पर जाएं।
- **2024–2025:** ZCG ने [Least Authority](https://leastauthority.com) को एक नए [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) के माध्यम से इस भूमिका को जारी रखने के लिए चुना। अपडेट [यहाँ](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541) पर मिल सकते हैं।
- **2026:** Shielded Labs [Taylor Hornby को एक सुरक्षा सलाहकार के रूप में नियुक्त करता है](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) Zcash की सुरक्षा क्षमताओं को मजबूत बनाने के लिए।

## ZCG सुरक्षा और दुर्बलता खुलासा पहल

[ZCG सुरक्षा और दुर्बलता खुलासा पहल](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) Zcash प्रणाली में सुरक्षा दुर्बलताओं के समन्वित खुलासे के लिए एक ढांचा प्रदान करता है।

## हालिया सुरक्षा अपडेट (2026)

- **Zebra 4.4.1 (मई 2026):** [महत्वपूर्ण सुरक्षा सुधार](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) जारी किया गया। सभी नोड ऑपरेटर्स के तुरंत अपग्रेड करने की आवश्यकता है।
- **Zebra 4.3.1 (अप्रैल 2026):** [महत्वपूर्ण सुरक्षा सुधार, डॉकराइज्ड माइनिंग और CI हार्डेनिंग](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) जारी किया गया।
- **एक से अधिक दुर्बलताओं को ठीक कर दिया गया (अप्रैल 2026):** [कई Zcash दुर्बलताएं सफलतापूर्वक ठीक कर दी गई](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) उपयोगकर्ता के धन या गोपनीयता पर कोई प्रभाव नहीं हुआ।
- **zcashd सलाह (अप्रैल 2026):** [zcashd के हमले के लिए खतरा कम करने की सलाह](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) Zebra के माध्यम से ट्रैफिक को रूट करके।

## जिम्मेदार खुलासा

Electric Coin Company और Zcash Foundation दोनों इस [जिम्मेदार खुलासा](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) मानक के अनुसरण करते हैं, जिसमें निम्नलिखित विचलन है:

> "Zcash एक ऐसी प्रौद्योगिकी है जो मजबूत गोपनीयता प्रदान करती है। नोट्स अपने गंतव्य पर एन्क्रिप्ट किए जाते हैं, फिर मुद्रा आधार शून्य ज्ञान साबितों के माध्यम से रखा जाता है, जो केवल Zcash के वास्तविक धामकर्ता द्वारा बनाए जा सकते हैं। यदि यह विफल हो जाता है, और झूठी नोट के बग के परिणामस्वरूप होता है, तो उस बग का दुरुपयोग बिना किसी भी तरह के संभवतः ब्लॉकचेन विश्लेषकों के द्वारा पीड़ित के अथवा ब्लॉकचेन में किस डेटा के दुरुपयोग के बारे में कोई तरीका नहीं हो सकता। इस पूर्व बिंदु के बाद रोलबैक, जैसा कि कुछ अन्य परियोजनाओं में ऐसी स्थितियों में किए गए हैं, इसलिए असंभव हो जाता है। मानक विचारों के बारे में बताता है कि सुरक्षा दुर्बलताओं की रिपोर्ट करने वाले पूरी तरह से एक मुद्दे के विवरण शामिल करते हैं, जिससे उसे दोहरा सकें। यह आवश्यक है, उदाहरण के तौर पर, एक बाहरी अनुसंधानकर्ता द्वारा सुरक्षा मुद्दे को दिखाने और साबित करने के लिए, और उस सुरक्षा मुद्दे के वास्तव में प्रभाव के बारे में जो वे कहते हैं - इसलिए विकास टीम उस समस्या को सटीक तरीके से प्राथमिकता देने और उसे हल करने में सक्षम हो सके। हालांकि, झूठी नोट के बग के मामले में, जैसा कि CVE-2019-7167 में हुआ था, हम इसके साथ उन विवरणों को अपनी रिपोर्ट में शामिल नहीं कर सकते हैं, जब तक हम यह निश्चित नहीं हो जाते कि वे दुर्बल हैं।"

## सुरक्षा संसाधन

- [Zcash सुरक्षा सलाह](https://github.com/zcash/zcash/security/advisories)
- [Zebra सुरक्षा सलाह](https://github.com/ZcashFoundation/zebra/security/advisories)
- [ECC को एक दुर्बलता रिपोर्ट करें](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [ZF को एक दुर्बलता रिपोर्ट करें](https://zfnd.org/contact/)

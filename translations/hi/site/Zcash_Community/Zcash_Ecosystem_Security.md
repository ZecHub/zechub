<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash इकोसिस्टम सुरक्षा

## इकोसिस्टम सुरक्षा लीड

Zcash इकोसिस्टम सुरक्षा लीड (Ecosystem Security Lead) की भूमिका एक ZCG ग्रांट (grant) के माध्यम से स्थापित की गई थी। इसका उद्देश्य ECC और ZF के बाहर व्यापक Zcash इकोसिस्टम, विशेष रूप से ZCG ग्रांटी, को समर्पित सुरक्षा इंजीनियरिंग प्रदान करना है।

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) ने पहले इकोसिस्टम सुरक्षा लीड के रूप में कार्य किया। अधिक जानकारी के लिए [zecsec.com](https://zecsec.com) देखें।
- **2024–2025:** ZCG ने एक नए [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) के माध्यम से इस भूमिका को जारी रखने के लिए [Least Authority](https://leastauthority.com) का चयन किया। अपडेट [यहाँ](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541) देखे जा सकते हैं।
- **2026:** Shielded Labs ने Zcash की सुरक्षा क्षमताओं को मज़बूत करने के लिए [Taylor Hornby को सुरक्षा सलाहकार के रूप में नियुक्त किया](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421)।

## ZCG सुरक्षा और भेद्यता प्रकटीकरण पहल

[ZCG सुरक्षा और भेद्यता प्रकटीकरण पहल](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) (Security & Vulnerability Disclosure Initiative) Zcash इकोसिस्टम में सुरक्षा भेद्यताओं के समन्वित प्रकटीकरण के लिए एक ढाँचा प्रदान करती है।

## हाल के सुरक्षा अपडेट (2026)

- **Zebra 4.4.1 (मई 2026):** [महत्वपूर्ण सुरक्षा सुधार](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) जारी किया गया। सभी नोड (node) ऑपरेटरों को तुरंत अपग्रेड करने के लिए प्रोत्साहित किया जाता है।
- **Zebra 4.3.1 (अप्रैल 2026):** [महत्वपूर्ण सुरक्षा सुधार, डॉकराइज़्ड माइनिंग और CI हार्डनिंग](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) जारी किए गए।
- **कई भेद्यताओं का निवारण (अप्रैल 2026):** [कई Zcash भेद्यताओं को सफलतापूर्वक पैच किया गया](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388), और इससे उपयोगकर्ताओं के फंड या गोपनीयता (privacy) पर कोई प्रभाव नहीं पड़ा।
- **zcashd परामर्श (अप्रैल 2026):** Zebra के माध्यम से ट्रैफ़िक रूट करके [zcashd अटैक सरफ़ेस को कम करने हेतु परामर्श](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390)।

## ज़िम्मेदार प्रकटीकरण

Electric Coin Company और Zcash Foundation दोनों निम्नलिखित विचलन के साथ इस ज़िम्मेदार प्रकटीकरण (Responsible Disclosure) [मानक](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) का पालन करते हैं:

> “Zcash एक ऐसी तकनीक है जो मज़बूत गोपनीयता प्रदान करती है। नोट (note) उनके गंतव्य के लिए एन्क्रिप्ट किए जाते हैं, और फिर मौद्रिक आधार को ज़ीरो-नॉलेज (zero-knowledge) प्रूफ (proof) के माध्यम से बनाए रखा जाता है, जिन्हें केवल Zcash का वास्तविक धारक ही बना सके, ऐसा अभिप्रेत है। यदि यह विफल हो जाता है और परिणामस्वरूप जालसाज़ी का कोई बग उत्पन्न होता है, तो उस जालसाज़ी बग का दुरुपयोग इस तरह किया जा सकता है कि ब्लॉकचेन (blockchain) विश्लेषकों के पास अपराधी की पहचान करने या यह जानने का कोई तरीका न हो कि बग का दुरुपयोग करने के लिए ब्लॉकचेन के किस डेटा का उपयोग किया गया है। इसलिए उस बिंदु से पहले के रोलबैक, जैसे कि ऐसे मामलों में कुछ अन्य परियोजनाओं में किए गए हैं, असंभव हैं। मानक में बताया गया है कि भेद्यताओं की रिपोर्ट करने वाले किसी समस्या का पूरा विवरण शामिल करें, ताकि उसे पुनः उत्पन्न किया जा सके। उदाहरण के लिए, यह किसी बाहरी शोधकर्ता के मामले में आवश्यक है, जिसे यह दिखाना और सिद्ध करना होता है कि वास्तव में एक सुरक्षा समस्या है, और उस सुरक्षा समस्या का वास्तव में वही प्रभाव है जिसका वह दावा करता है — जिससे डेवलपमेंट टीम समस्या को सटीक रूप से प्राथमिकता दे सके और उसका समाधान कर सके। हालाँकि, जालसाज़ी बग के मामले में, ठीक CVE-2019-7167 की तरह, हम समन्वित रिलीज़ से पहले अपने भागीदारों को भेजी जाने वाली रिपोर्टों में वे विवरण शामिल न करने का निर्णय ले सकते हैं, बशर्ते हमें यह निश्चित हो कि वे असुरक्षित हैं।”

## सुरक्षा संसाधन

- [Zcash सुरक्षा परामर्श](https://github.com/zcash/zcash/security/advisories)
- [Zebra सुरक्षा परामर्श](https://github.com/ZcashFoundation/zebra/security/advisories)
- [zcash/zcash में भेद्यता की रिपोर्ट](https://github.com/zcash/zcash/security/policy)
- [ZF को भेद्यता की रिपोर्ट](https://github.com/ZcashFoundation/zebra/security/policy)

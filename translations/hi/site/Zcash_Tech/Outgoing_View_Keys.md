<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Outgoing Viewing Keys (OVKs)

एक outgoing viewing key (OVK) 32-बाइट का मान है जिसका उपयोग केवल shielded output के *outgoing* ciphertext को एन्क्रिप्ट करने के लिए किया जाता है। यह किसी पक्ष को भेजे गए note plaintext (प्राप्तकर्ता का पता, मूल्य और मेमो) को पुनर्प्राप्त करने देता है, बिना फंड खर्च करने या incoming notes देखने की क्षमता के।

प्राप्तकर्ता हमेशा अपने incoming viewing key से incoming note को डिक्रिप्ट करता है। OVK का चुनाव प्राप्तकर्ता द्वारा देखी जाने वाली चीज़ को नहीं बदलता। raw OVK के लिए कोई मानक एन्कोडिंग नहीं है; यह बस 32 बाइट होता है।

## संक्षेप में

- एक OVK केवल यह नियंत्रित करता है कि shielded भुगतान के outgoing plaintext को कौन पुनर्प्राप्त कर सकता है।
- Wallets तीन नीतियों में से चुनते हैं: **Sender** (अकाउंट के UFVK के साथ सामान्य पुनर्प्राप्ति), **Custom** (आपके दिए गए key से पुनर्प्राप्ति), या **Discard** (कोई भी chain से outgoing plaintext पुनर्प्राप्त नहीं कर सकता)।
- Discard या custom OVK के साथ भी, UFVK धारक फिर भी देख सकता है कि कौन-से notes खर्च किए गए और अकाउंट से निकली शुद्ध राशि की गणना कर सकता है।
- किसी विशेष UFVK से राशि को अदृश्य रखने का एकमात्र विश्वसनीय तरीका यह सुनिश्चित करना है कि notes कभी उस अकाउंट के थे ही नहीं (अलग अकाउंट या अलग wallet)।
- ये तीन नीतियाँ पहले से ही `zcash_client_backend` में मौजूद हैं; आज लगभग हर wallet केवल डिफ़ॉल्ट Sender नीति का उपयोग करता है।

---

## तीन नीतियाँ

`zcash_client_backend` पर बने Wallets लेनदेन बनाते समय एक `OvkPolicy` चुनते हैं:

| नीति | Outgoing ciphertexts | बाद में outgoing plaintext कौन पुनर्प्राप्त कर सकता है |
|--------|----------------------|----------------------------------------------|
| **Sender** (डिफ़ॉल्ट) | अकाउंट के सामान्य OVK से एन्क्रिप्ट किए जाते हैं | भेजने वाले अकाउंट का Unified Full Viewing Key |
| **Custom** | आपके दिए गए key(s) से एन्क्रिप्ट किए जाते हैं | जो भी दिए गए key(s) रखता है |
| **Discard** | कोई OVK उपयोग नहीं होता (`ovk = ⊥`) | कोई नहीं (भेजने वाला भी नहीं) |

एक सुविधा constructor एकल 32-बाइट मान से `Custom` नीति बनाता है, ताकि external और internal दोनों OVK एक ही key हों।

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

[OvkPolicy दस्तावेज़ीकरण](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) और [ZIP 310](https://zips.z.cash/zip-0310) देखें।

## प्रत्येक नीति का उपयोग

**Sender** सामान्य wallet व्यवहार है। लेनदेन mined हो जाने के बाद, अकाउंट का UFVK रखने वाला कोई भी व्यक्ति outgoing ciphertexts को डिक्रिप्ट कर सकता है और प्राप्तकर्ता के पते, राशियाँ तथा मेमो पुनर्प्राप्त कर सकता है।

**Custom** आपको किसी तीसरे पक्ष (ऑडिटर, भुगतान प्रोसेसर, रसीद प्रणाली या अलग डिवाइस) को पूर्ण viewing key दिए बिना विशिष्ट outgoing भुगतानों को डिक्रिप्ट करने की क्षमता देता है। आप ephemeral key का भी उपयोग कर सकते हैं जिसे लेनदेन के बाद फेंक दिया जाए, या अलग-अलग counterparties के लिए अलग keys का उपयोग कर सकते हैं ताकि कोई एक key हर outgoing भुगतान न देखे।

**Discard** का अर्थ है कि भेजने वाला wallet chain से outgoing plaintext पुनर्प्राप्त नहीं कर सकता। यह तब उपयोगी है जब आप बाद में UFVK से समझौता होने पर पुनर्प्राप्त की जा सकने वाली जानकारी को कम से कम रखना चाहते हैं, या जब आप जानबूझकर ऐसा on-chain रिकॉर्ड नहीं चाहते जिसे अकाउंट का OVK खोल सके।

## UFVK धारक फिर भी क्या देखता है

Discard या custom OVK उपयोग होने पर भी, अकाउंट का UFVK रखने वाला व्यक्ति फिर भी:

- देख सकता है कि अकाउंट के कौन-से notes खर्च हुए (nullifiers के माध्यम से)।
- उन input notes के मूल्य जान सकता है।
- किसी भी change notes को पुनर्प्राप्त कर सकता है (वे internal incoming viewing key से एन्क्रिप्ट होते हैं, OVK से नहीं)।
- इसलिए अकाउंट से निकली शुद्ध राशि की गणना कर सकता है।

जो दिखाई नहीं देता, वह है व्यक्तिगत प्राप्तकर्ता पते, राशि का विभाजन और मेमो। `WalletWrite` दस्तावेज़ीकरण चेतावनी देता है कि Discard (या किसी random custom OVK) के तहत बनाए गए लेनदेन का डेटा, स्थानीय रिकॉर्ड खो जाने पर, chain डेटा से पुनर्प्राप्त नहीं किया जा सकता।

## किसी विशेष UFVK से राशियों को छिपाकर रखना

`OvkPolicy` केवल outgoing plaintext की पुनर्प्राप्ति को नियंत्रित करता है। यह अकाउंट के अपने UFVK से खर्च या शुद्ध राशियों को नहीं छिपाता।

किसी राशि को किसी विशेष UFVK के लिए दृश्यमान होने से रोकने का एकमात्र विश्वसनीय तरीका यह सुनिश्चित करना है कि उस राशि को वहन करने वाले notes कभी उस अकाउंट के नहीं थे जिसे UFVK नियंत्रित करता है:

1. **अलग ZIP-32 अकाउंट्स** (समान seed) — नया account index बनाएँ, फंड उसमें भेजें और उस अकाउंट का UFVK कभी export न करें। मूल अकाउंट का UFVK केवल नए अकाउंट में हुआ ट्रांसफ़र देखता है।
2. **पूर्णतः अलग wallet** (अलग seed) — एक नए wallet में फंड भेजें, उससे खर्च करें और seed या UFVK त्याग दें। मूल wallet केवल funding transfer रिकॉर्ड करता है।
3. **Ephemeral one-time wallets** — ऊपर जैसा ही, लेकिन spend wallet को disposable मानें।

एक UFVK प्रति-अकाउंट होता है। जो notes कभी उस अकाउंट में नहीं रहे, वे उसके balance या outflow totals में कभी दिखाई नहीं देते।

## आज wallets नीतियों का कैसे उपयोग करते हैं

लगभग हर production wallet केवल डिफ़ॉल्ट **Sender** नीति का उपयोग करता है, इसलिए पूर्ण outgoing इतिहास UFVK से पुनर्प्राप्त किया जा सकता है। अन्य दो नीतियाँ library में मौजूद हैं, लेकिन user interfaces में शायद ही कभी उपलब्ध कराई जाती हैं।

संभावित भविष्य के विकल्पों में शामिल हैं:

- प्रति-लेनदेन flag जो उपयोगकर्ता को एकल भुगतान के लिए Custom या Discard चुनने देता है।
- एक स्थायी Discard मोड (तब seed restore केवल net outflows दिखाएगा)।
- व्यक्तिगत भुगतानों के चयनात्मक प्रकटीकरण के लिए Custom OVKs (पूर्ण [ZIP 311](https://zips.z.cash/zip-0311) भुगतान प्रकटीकरण की तुलना में हल्का)।
- अधिक सशक्त अलगाव के लिए अकाउंट या wallet पृथक्करण का निरंतर उपयोग।

## संसाधन

- [ZIP 310: Sapling Viewing Keys के सुरक्षा गुण](https://zips.z.cash/zip-0310)
- [ZIP 316: Unified Addresses और Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ZIP 315: Wallet Implementations के लिए सर्वोत्तम प्रथाएँ](https://zips.z.cash/zip-0315)
- [OvkPolicy zcash_client_backend में](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## संबंधित पृष्ठ

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Payment Disclosures](/zcash-tech/payment-disclosures)
- [Unified Addresses](/zcash-tech/unified-addresses)
- [एक Block Explorer क्या देख सकता है](/zcash-tech/what-a-block-explorer-can-see)

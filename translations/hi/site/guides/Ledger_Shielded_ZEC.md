# Ledger Shielded ZEC उपयोगकर्ता मार्गदर्शिका

23 सितंबर 2026 को Ledger ने Ledger Wallet Desktop में मूल shielded ZEC जोड़ा। अब एक Zcash खाते में Zcash के Ironwood पूल में एक पारदर्शी बैलेंस और एक निजी बैलेंस होता है। आपकी निजी कुंजियाँ आपके Ledger पर रहती हैं, और हर लेनदेन की समीक्षा और हस्ताक्षर डिवाइस पर किए जाते हैं।

**केवल डेस्कटॉप।** Ledger की घोषणा में कहा गया है कि shielded ZEC "केवल Ledger Wallet Desktop पर उपलब्ध है। इस समय मोबाइल समर्थन उपलब्ध नहीं है, लेकिन जल्द आ रहा है।" डेस्कटॉप ऐप भी यही सूचना दिखाता है। 15 अक्टूबर 2026 को जाँच की गई।

## तैयारी

- एक Ledger डिवाइस जिस पर Zcash ऐप चलता हो: Nano S Plus, Nano X, Stax या Flex। वर्तमान Zcash ऐप मूल Nano S के लिए नहीं बनाया गया है।
- Ledger Wallet Desktop 4.21 या बाद का संस्करण, केवल [ledger.com](https://www.ledger.com) से डाउनलोड किया गया हो। इस मार्गदर्शिका में संस्करण 4.24.0 का उपयोग किया गया है।
- आपके Ledger पर नवीनतम Zcash ऐप (इस मार्गदर्शिका के लिखे जाने पर 3.9.4)।
- परीक्षण के लिए थोड़ी मात्रा में ZEC। नीचे दिया गया हर चरण mainnet पर 0.001 ZEC के साथ किया गया था। प्रत्येक लेनदेन पर एक छोटा नेटवर्क शुल्क लगता है (हमारे परीक्षण में 0.00015 ZEC)।
- आपका 24-शब्दों वाला रिकवरी वाक्यांश कागज़ पर ही रहे। इसे कभी कंप्यूटर में टाइप न करें या साझा न करें।

## चरण-दर-चरण मार्गदर्शिका (Ledger Wallet Desktop)

**1. Zcash ऐप इंस्टॉल या अपडेट करें**
- Ledger Wallet खोलें, अपना Ledger कनेक्ट और अनलॉक करें, और **My Ledger** खोलें। डिवाइस पर कनेक्शन की अनुमति दें।
- ऐप कैटलॉग में **Zcash** खोजें, फिर **Install** पर क्लिक करें, या यदि यह पहले से इंस्टॉल है तो **Update** पर क्लिक करें।
- अपने Ledger पर Zcash ऐप खोलें। स्क्रीन पर "Zcash app is ready" लिखा होगा। संस्करण जाँचने के लिए दाईं ओर स्क्रॉल करके **App info** पर जाएँ।

**2. एक Zcash खाता जोड़ें**
- Ledger Wallet में **Add account** चुनें। **Select asset** में Zcash खोजें और wrapped token, जैसे Binance-Peg Zcash Token, के बजाय **Zcash (ZEC)** चुनें।
- आपके Ledger पर Zcash ऐप खुला होने पर, Ledger Wallet आपका खाता खोज लेता है। **Select the accounts you want to add** के अंतर्गत उसे चुनें और **Confirm** पर क्लिक करें।
- खाता पृष्ठ पर **Available balance**, **Transparent balance** और **Private balance**, साथ ही **Enable shielded** बटन दिखता है।

![Ledger Wallet Desktop में Zcash खाता, जिसमें केवल डेस्कटॉप सूचना, पारदर्शी और निजी शेष राशि, तथा “Enable shielded” बटन दिख रहा है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. निजी बैलेंस सक्षम करें**
- **Enable shielded** पर क्लिक करें। **Enable Zcash private balance** विंडो में चार चरण होते हैं: Birthday, UFVK, Device और Confirmation।
- **Birthday:** नए खाते के लिए birthday height को आज की तारीख पर ही रखें। "This account received shielded ZEC in the past" को केवल तभी चुनें जब आपको पता हो कि ऐसा हुआ था, क्योंकि block 0 से स्कैन करने में बहुत समय लग सकता है।
- **UFVK और Device:** Ledger Wallet आपके Ledger से आपका Unified Full Viewing Key (UFVK) एक्सपोर्ट करने को कहता है। डिवाइस की स्क्रीन पढ़ें और स्वीकृत करें। यदि "Device connection lost" दिखे, तो सुनिश्चित करें कि Zcash ऐप खुला है, तुरंत स्वीकृत करें और **Retry** पर क्लिक करें।
- जब **UFVK successfully imported** दिखे, तो **Start sync** पर क्लिक करें। syncing पूरा होने पर बटन "Last sync" समय के साथ **Update balance** में बदल जाता है।
- viewing key आपके कंप्यूटर पर रहती है। यह आपके shielded फंड खोज सकती है, लेकिन उन्हें खर्च नहीं कर सकती।

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. ZEC प्राप्त करें और अपने Ledger पर दोनों पतों को सत्यापित करें**
- **Receive** पर क्लिक करें और अपना Zcash खाता चुनें। Ledger Wallet एक **Address for Zcash 1** (पारदर्शी, t1 से शुरू) और एक **Private address for Zcash 1** (u1 से शुरू) दिखाता है। पुराने पते मान्य बने रहते हैं।
- आपका Ledger "Verify Zcash addresses", फिर दो पृष्ठों में **Private address**, और फिर **Public Address** दिखाता है। किसी भी पते को साझा करने से पहले हर अक्षर की स्क्रीन से तुलना करें, फिर डिवाइस पर पुष्टि करें।
- निजी पते को प्राथमिकता दें; पारदर्शी पते का उपयोग केवल तब करें जब भेजने वाला किसी और चीज़ का समर्थन नहीं करता।

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. पारदर्शी ZEC को अपने निजी बैलेंस में स्थानांतरित करें**
- **Send** पर क्लिक करें। **Self transfer** के अंतर्गत **Send to private balance** चुनें।
- एक राशि दर्ज करें या 25%, 50%, 75% अथवा **Max** का उपयोग करें। नेटवर्क शुल्क जाँचें, फिर **Review** पर क्लिक करें।
- अपने Ledger पर क्रम से देखें: "Review transaction to send ZEC", "Transfer from public to private address", राशि, दो पृष्ठों में आउटपुट पता, शुल्क और expiry height। जाँचें कि आउटपुट पता चरण 4 के आपके निजी पते से मेल खाता है, फिर **Sign transaction** पर दोनों बटन दबाएँ।
- Ledger Wallet **Transaction sent** दिखाता है। लेनदेन विवरण में प्रकार **Private (Ironwood)** पढ़ता है।
- Ledger Wallet नोट करता है कि self transfer आपके shielded फंड को आपके सार्वजनिक पते से जोड़ देता है। सीधे अपने निजी पते पर प्राप्त करने से वे असंबद्ध रहते हैं।

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- लेनदेन की पुष्टि होने के बाद, पारदर्शी बैलेंस घटता है और निजी बैलेंस बढ़ता है। नए shielded फंड खर्च करने के लिए पर्याप्त confirmations मिलने तक "maturing" के रूप में दिखते हैं।

![शील्ड करने के बाद Zcash खाता: पारदर्शी शेष राशि कम हुई, निजी शेष राशि बढ़ी और परिपक्व हो रही के रूप में दिखाई गई](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. अपने निजी बैलेंस से ZEC भेजें**
- निजी बैलेंस खर्च योग्य हो जाने पर **Send** पर क्लिक करें और **Transfer from** को **Private balance** पर सेट करें।
- प्राप्तकर्ता का पता पेस्ट करें और राशि दर्ज करें। आप 512 bytes तक का एन्क्रिप्टेड **Memo (optional)** जोड़ सकते हैं, जिसे केवल प्राप्तकर्ता पढ़ सकता है।
- अपने Ledger पर प्राप्तकर्ता, राशि और शुल्क की समीक्षा करें, फिर **Sign transaction** पर दोनों बटन दबाएँ।

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## जानने योग्य बातें

- Ledger पर shielded ZEC अभी केवल डेस्कटॉप के लिए है (15 अक्टूबर 2026 को जाँच की गई)।
- Ledger Wallet का निजी बैलेंस Ironwood पूल का उपयोग करता है।
- Ledger कहता है कि आप अपने लेनदेन इतिहास का read-only access किसी कर सलाहकार के साथ साझा कर सकते हैं। आपके viewing key वाला कोई भी व्यक्ति आपका shielded इतिहास देख सकता है, इसलिए इसे केवल सोच-समझकर साझा करें।
- इस मार्गदर्शिका में डिवाइस स्क्रीन Ledger के Speculos emulator (Nano S Plus) से कैप्चर की गई थीं, जिस पर Zcash ऐप 3.9.4 चल रहा था और जो Zcash mainnet पर Ledger Wallet Desktop 4.24.0 से कनेक्ट था। एक भौतिक Ledger वही ऐप चलाता है और वही स्क्रीन दिखाता है।

## अतिरिक्त सहायता

- [Ledger Wallet में नया: मूल Shielded Zcash समर्थन](https://www.ledger.com/blog-native-shielded-zcash-support) (Ledger की घोषणा)
- [Ledger सहायता केंद्र](https://support.ledger.com)
- [ZecHub Wallets पृष्ठ](/using-zcash/wallets)
- [Shielded Pools](/using-zcash/shielded-pools) और [Viewing Keys](/zcash-tech/viewing-keys), ZecHub पर
- एक अन्य hardware wallet विकल्प: [Keystone Zashi उपयोगकर्ता मार्गदर्शिका](/guides/keystone-zashi)

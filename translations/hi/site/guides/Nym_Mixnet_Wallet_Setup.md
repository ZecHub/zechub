<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Page"/>
</a>

# Nym Mixnet के माध्यम से Zcash Wallet ट्रैफ़िक रूट करें

> अंतिम सत्यापन: 29 सितंबर, 2026

Zcash shielded लेनदेन ऑन-चेन लेनदेन डेटा की सुरक्षा करते हैं, लेकिन wallet अभी भी इंटरनेट पर संचार करते हैं। नेटवर्क पर्यवेक्षक संभावित रूप से आपका IP पता, आपका wallet कब कनेक्ट होता है, और वह किस इन्फ्रास्ट्रक्चर से संपर्क करता है जैसी मेटाडेटा जानकारी जान सकते हैं।

Nym एक अलग नेटवर्क-गोपनीयता परत जोड़ता है। सितंबर 2026 तक, सर्वोत्तम तरीका wallet पर निर्भर करता है:

1. **जहाँ उपलब्ध हो, wallet के मूल Nym एकीकरण को प्राथमिकता दें।**
2. अन्यथा, **सिस्टम-स्तरीय NymVPN Mixnet मोड** का उपयोग करें, ताकि wallet का नेटवर्क ट्रैफ़िक wallet-विशिष्ट proxy समर्थन पर निर्भर हुए बिना Nym के माध्यम से रूट हो।

सामान्य VPN और dVPN पृष्ठभूमि के लिए, [VPN & dVPN](./VPN_and_DVPN.md) देखें।

## Nym क्या जोड़ता है — और क्या नहीं

shielded Zcash भुगतान और नेटवर्क गोपनीयता उपकरण अलग-अलग समस्याएँ हल करते हैं:

- **Zcash shielded pools** ऑन-चेन लेनदेन विवरण की सुरक्षा करते हैं।
- **Nym mixnet रूटिंग** आपके वास्तविक नेटवर्क पहचान और wallet ट्रैफ़िक प्राप्त करने वाली सेवा के बीच जुड़ाव की संभावना कम करने के लिए डिज़ाइन की गई है।
- सिस्टम-स्तरीय NymVPN tunnel के माध्यम से संपर्क किया गया गंतव्य आपके घर/मोबाइल IP के बजाय Nym exit देखना चाहिए।

Nym का mixnet नेटवर्क-मेटाडेटा रिसाव कम करने के लिए कई hops, packet mixing, यादृच्छिक विलंब, cover traffic और onion encryption का उपयोग करता है।

Nym किसी compromised device, दुर्भावनापूर्ण wallet software, उजागर recovery phrases, exchange accounts के माध्यम से आपके द्वारा प्रकट की गई पहचान, या transparent Zcash गतिविधि के कारण होने वाली गोपनीयता हानि से **सुरक्षा नहीं** करता।

## मूल Nym समर्थन: उपलब्ध होने पर पहले इसका उपयोग करें

Nym ने 24 सितंबर, 2026 को घोषणा की कि उसका Zcash Community Grant कार्य पूरा हो गया है और वास्तविक Zcash wallets में मूल mixnet समर्थन भेजा जा रहा है।

### Zingo! Wallet

Zingo PC में एक मूल Nym transport शामिल है। Zingo Mobile भी iOS और Android पर in-app Nym proxy का उपयोग करके Mixnet Mode प्रदान करता है।

Zingo द्वारा प्रलेखित वर्तमान व्यवहार:

- Nym नियंत्रण **Settings → Nym Mixnet** के अंतर्गत है।
- भुगतान भेजना mixnet के माध्यम से रूट किया जाता है।
- Ironwood migration transmissions उसी संरक्षित send path का अनुसरण करते हैं।
- ZEC मूल्य अनुरोध भी mixnet के माध्यम से रूट किए जाते हैं।
- Nym सक्षम होने पर भेजना fail closed करता है: यदि mixnet transport उपलब्ध नहीं है, तो भुगतान को चुपचाप clearnet पर नहीं भेजा जाता।
- **Zingo PC में chain synchronization को वर्तमान में mixnet के माध्यम से रूट नहीं किया जाता।** Compact blocks, nullifier queries, transaction fetches, mempool traffic और server-health checks अब भी सामान्य server connection का उपयोग करते हैं।

यह अंतर महत्वपूर्ण है: Zingo का मूल एकीकरण सबसे अधिक जुड़ाव वाले broadcast path की सुरक्षा करता है, लेकिन यह अभी पूर्ण-डिवाइस नेटवर्क tunnel नहीं है।

यदि आपके threat model में server से sync traffic छिपाना भी आवश्यक है, तो इससे होने वाली अतिरिक्त latency और जटिलता को समझने के साथ-साथ NymVPN जैसे सिस्टम-स्तरीय privacy tunnel का उपयोग करें।

स्रोत:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym की रिपोर्ट के अनुसार **Zkool** अब मूल toggle का उपयोग करके Nym mixnet पर Zcash RPC infrastructure से कनेक्ट करने का समर्थन करता है।

Zkool, YWallet का सक्रिय रूप से अनुरक्षित उत्तराधिकारी है। इसका प्रोजेक्ट Zcash server connections के लिए Tor proxying और onion services का भी समर्थन करता है।

किसी पुराने YWallet build को undocumented proxy path से मजबूर करने के बजाय Zkool के मूल Nym विकल्प को प्राथमिकता दें।

स्रोत:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet में भी Nym-aware transport paths हैं। इसका वर्तमान कार्यान्वयन outgoing transaction submission को Nym mixnet पर तथा compact-block synchronization को अलग Nym dVPN path पर रूट करने का समर्थन करता है। यह मानने के बजाय कि प्रत्येक wallet अनुरोध स्वचालित रूप से mixnet का उपयोग करता है, इन्हें अलग सुरक्षा उपायों के रूप में देखें।

स्रोत:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl में वर्तमान में अंतर्निहित **Tor Protection** है, जो ऊपर Zingo, Zkool और Nozy के लिए वर्णित उसी मूल Nym एकीकरण के समान नहीं है।

Zodl का Tor feature transaction submission, transaction-data retrieval, exchange-rate requests और third-party API calls को Tor पर रूट कर सकता है। Nym ने 24 सितंबर, 2026 को कहा कि वह व्यापक mixnet एकीकरण के बारे में अभी भी Zodl टीम के साथ सक्रिय बातचीत में है।

आज Zodl के लिए, इनमें से किसी एक का उपयोग करें:

- Zodl का प्रलेखित Tor Protection, या
- सिस्टम-स्तरीय NymVPN, यदि आपका लक्ष्य wallet के सामान्य device traffic को Nym के माध्यम से रूट करना है।

सिर्फ इसलिए कि दोनों privacy networks हैं, यह न मानें कि Tor और Nym wallet के भीतर परस्पर विनिमेय transports हैं।

Zodl Tor सेटिंग्स:

**More → Advanced Features → Beta: Tor Protection → Enable → Save changes**

स्रोत:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## विकल्प: सिस्टम-स्तरीय NymVPN

यह सबसे व्यापक रूप से संगत Nym विकल्प है क्योंकि इसमें wallet को Nym-विशिष्ट proxy settings समझने की आवश्यकता नहीं होती।

### 1. NymVPN इंस्टॉल करें

NymVPN केवल Nym की आधिकारिक वेबसाइट या आधिकारिक platform store से डाउनलोड करें:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN, Android, iOS, Linux, Windows और macOS का समर्थन करता है।

### 2. Mixnet मोड चुनें

NymVPN में **Fast mode**, कम latency के लिए अनुकूलित 2-hop dVPN path, और **Mixnet mode**, मजबूत नेटवर्क-मेटाडेटा सुरक्षा के लिए अनुकूलित 5-hop mixnet path उपलब्ध है। संवेदनशील wallet गतिविधि के लिए Mixnet mode चुनें और wallet खोलने या refresh करने से पहले client द्वारा connection स्थापित होने की सूचना देने तक प्रतीक्षा करें।

### 3. Wallet को सामान्य नेटवर्क settings पर रखें

जब operating system पहले से ही NymVPN के माध्यम से ट्रैफ़िक tunnel कर रहा हो, तो अधिकांश wallets को custom proxy settings की आवश्यकता नहीं होती।

Wallet को सामान्य रूप से खोलें और उसे sync करने दें।

यदि NymVPN आपके platform पर split tunneling उपलब्ध कराता है, तो पुष्टि करें कि wallet **protected tunnel में शामिल** है, bypass या exclusion list में नहीं रखा गया है।

### 4. Wallet उपयोग करने से पहले tunnel सत्यापित करें

एक सरल सिस्टम-स्तरीय जाँच:

1. NymVPN को disconnect करें।
2. किसी सार्वजनिक IP-जाँच सेवा पर जाएँ, या desktop पर चलाएँ:

   ```bash
   curl https://api.ipify.org
   ```

3. दिखाई देने वाला IP दर्ज करें।
4. Mixnet mode में NymVPN से connect करें।
5. जाँच दोहराएँ।

दिखाई देने वाला सार्वजनिक IP बदल जाना चाहिए।

यह सिस्टम tunnel की पुष्टि करता है। यदि app या OS में विशेष routing rules हों, तो यह **सिद्ध नहीं** करता कि किसी विशेष wallet द्वारा किए गए हर अनुरोध का मार्ग वही है।

Desktop पर अधिक आश्वासन के लिए:

- operating system के network monitor से wallet process का निरीक्षण करें,
- सत्यापित करें कि कोई split-tunnel exclusion नहीं है,
- पुष्टि करें कि NymVPN disconnect होने पर अपेक्षित wallet व्यवहार बदलता है।

Troubleshooting करते समय wallet addresses, balances, transaction IDs, IP addresses या recovery material वाली screenshots पोस्ट न करें।

## NymVPN dApp / wallet proxy मोड

NymVPN, mixnet के माध्यम से SOCKS5 / RPC routing का उपयोग करने वाला app-and-wallet proxy mode भी उपलब्ध कराता है।

Nym का सार्वजनिक setup documentation इसे मुख्य रूप से Ethereum-style RPC configuration के साथ प्रदर्शित करता है। यह ऐसे software के लिए उपयोगी है जो स्पष्ट रूप से संगत generic proxy/RPC path का समर्थन करता है, लेकिन इसे हर Zcash wallet के साथ काम करने वाला नहीं मानना चाहिए।

इस path का उपयोग तभी करें जब wallet का अपना documentation संगत proxy या RPC समर्थन की पुष्टि करता हो।

अन्यथा, प्राथमिकता दें:

- wallet के मूल Nym एकीकरण को, या
- सिस्टम-स्तरीय NymVPN को।

## प्रदर्शन और timeout के समझौते

Mixnets अधिक मजबूत metadata सुरक्षा के बदले जानबूझकर गति का समझौता करते हैं।

इन पर संभावित प्रभाव की अपेक्षा करें:

- प्रारंभिक wallet synchronization,
- बड़े catch-up syncs,
- transaction-history queries,
- RPC timeouts,
- third-party API calls।

व्यावहारिक मार्गदर्शन:

- डिफ़ॉल्ट Nym settings से शुरू करें।
- पहले sync या लंबे catch-up sync में अधिक समय लगने की अपेक्षा करें।
- गोपनीयता settings कमज़ोर करने से पहले timeout को पुनः आज़माएँ।
- संवेदनशील transaction से ठीक पहले privacy modes को बार-बार बदलने से बचें।
- यदि आप bulk sync के लिए तेज़ path का उपयोग करते हैं, तो समझें कि उस अवधि में संपर्क किया गया infrastructure आपकी वास्तविक नेटवर्क पहचान देख सकता है।
- विशेष रूप से Zingo PC के लिए याद रखें कि उसका मूल Nym transport वर्तमान में sends और price lookup की सुरक्षा करता है, जबकि synchronization प्रत्यक्ष रहता है।

## मोबाइल विचार

Android और iOS पर, operating system का VPN slot सामान्य wallet traffic को NymVPN के माध्यम से रूट करने का सामान्यतः सबसे सरल तरीका है: पहले NymVPN से connect करें, फिर wallet खोलें।

यदि कोई अन्य VPN, firewall या local VPN-based ad blocker पहले से ही system VPN interface का उपयोग कर रहा है, तो दोनों products एक साथ काम नहीं कर सकते। Wallet को सुरक्षित मानने से पहले operating system की VPN स्थिति की पुष्टि करें।

## Threat-model checklist

Setup पर निर्भर होने से पहले, पूछें:

- क्या मैं जहाँ उपयुक्त हो shielded Zcash addresses का उपयोग कर रहा हूँ?
- क्या मेरे wallet में मूल Nym समर्थन है?
- यदि है, तो वह मूल एकीकरण ठीक-ठीक किस traffic की सुरक्षा करता है?
- यदि मुझे व्यापक coverage चाहिए, तो क्या wallet के network activity शुरू करने से पहले NymVPN connected है?
- क्या wallet को split-tunneling rule द्वारा बाहर रखा गया है?
- क्या मैं ऐसे proxy mode पर निर्भर हूँ जिसे wallet वास्तव में document करता है?
- क्या मैं exchange, browser session, third-party API या transparent address के माध्यम से पहचान लीक कर रहा हूँ?
- क्या मैं धीमे sync और कभी-कभार होने वाले timeouts के लिए तैयार हूँ?

## स्रोत

- Nym: Nym mixnet अब Zcash wallets में लाइव है, 24 सितंबर, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym व्यवहार: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym transport: https://github.com/zingolabs/zingo-mobile
- Zkool repository: https://github.com/hhanh00/zkool2
- NozyWallet Nym transport कार्य: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection: https://support.zodl.com/article/17-enabling-tor-protection

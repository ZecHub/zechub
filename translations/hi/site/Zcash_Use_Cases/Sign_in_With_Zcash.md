# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Zcash से साइन इन करें

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>मध्यवर्ती - 7 मिनट</span>

## संक्षेप में

- पासवर्ड इस्तेमाल करने के बजाय यह साबित करके लॉग इन करें कि आप एक Zcash address को नियंत्रित करते हैं
- दो डिज़ाइन प्रचलन में हैं: **challenge पर हस्ताक्षर करना**, या **memo में एक code के साथ shielded payment भेजना**
- क्योंकि shielded addresses balance और history को छिपाते हैं, नियंत्रण साबित करने से आपकी वित्तीय जानकारी उजागर नहीं होती
- यह पैटर्न अभी शुरुआती चरण में है। अभी तक कोई ratified standard नहीं है, और implementations आपस में interoperate नहीं करतीं

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> यह किसके लिए है?

- Developers जो personal data इकट्ठा किए बिना passwordless login चाहते हैं
- वे उपयोगकर्ता जो हर site को अपना email address देना पसंद नहीं करते
- कोई भी व्यक्ति जो अपने financial history को किसी account से जोड़े बिना लॉग इन करना चाहता है

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> समस्या

ज़्यादातर login options कुछ न कुछ लीक करते हैं:

- **Passwords और email** आपकी पहचान से जुड़ा एक account बनाते हैं, और दोनों ही अंततः breach dumps में पहुँच जाते हैं
- **Social sign-in** identity provider को यह बता देता है कि आप कहाँ और कब लॉग इन करते हैं
- **Transparent chains पर wallet sign-in** जितना दिखता है उससे भी बदतर है। Wallet कनेक्ट करने से site को आपका पूरा balance और transaction history स्थायी रूप से मिल सकता है

आम तौर पर आप सुविधा और disclosure के बीच चुनाव कर रहे होते हैं।

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Zcash क्यों?

Zcash, *control साबित करने* और *वित्तीय जानकारी उजागर करने* को अलग करता है:

- **Shielded addresses** balances और transaction history को private रखते हैं, इसलिए यह साबित करना कि आपके पास एक address है, यह नहीं बताता कि आपके पास कितना है
- **Encrypted memos** किसी transaction के भीतर निजी रूप से एक one time login code ले जा सकते हैं
- **Viewing keys** selective disclosure की सुविधा देते हैं, इसलिए किसी app को केवल वही read access दिया जा सकता है जिसकी उसे ज़रूरत है, उससे अधिक नहीं

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> यह कैसे काम करता है

दो तरीके उभर कर सामने आए हैं। दोनों में अंततः app के पास आपके लिए एक stable identifier होता है और कोई password नहीं होता।

### तरीका 1: challenge पर हस्ताक्षर करें

1. App एक random, single use challenge बनाता है
2. आपका wallet उस challenge पर आपके address के पीछे मौजूद key से हस्ताक्षर करता है
3. App signature को verify करता है और आपको लॉग इन कर देता है

कुछ भी broadcast नहीं होता, इसलिए कोई fee नहीं लगती और किसी block का इंतज़ार नहीं करना पड़ता। संबंधित specification [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304) है, जो अभी भी draft में है, इसलिए message signing के लिए wallet support अलग-अलग है।

### तरीका 2: shielded payment से इसे साबित करें

1. App एक one time code बनाता है और एक payment request दिखाता है
2. आप memo में उस code के साथ एक छोटा shielded transaction भेजते हैं
3. App memo पर नज़र रखता है, code को match करता है, और आपको लॉग इन कर देता है

यह उन wallets के साथ काम करता है जो आज पहले से memos को support करते हैं, और ऐसे wallets अधिकांश हैं। इसका tradeoff यह है कि इसमें network fee लगती है और आपको confirmation का इंतज़ार करना पड़ता है।

### Address को private बनाए रखना

किसी app को आपको पहचानने के लिए आपका address store करना ज़रूरी नहीं है। कुछ implementations उसे किसी application specific value के साथ hash कर देती हैं, ताकि हर site को उसी user के लिए एक अलग, stable identifier दिखाई दे। इससे sites आपस में जानकारी मिलाकर आपके accounts को link नहीं कर पातीं।

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Trade-offs

इस पर build करने या इस पर निर्भर होने से पहले इसे समझ लेना उपयोगी है।

| | Signed challenge | Shielded payment |
|---|---|---|
| लागत | निःशुल्क | हर login पर network fee |
| गति | तुरंत | Confirmation का इंतज़ार |
| Wallet support | सीमित, ZIP 304 एक draft है | व्यापक, सिर्फ memos चाहिए |
| क्या chain record छोड़ता है | नहीं | हाँ, एक transaction मौजूद होता है |

साझी सीमाएँ:

- **डिफ़ॉल्ट रूप से account recovery नहीं होती।** Key खोने का मतलब account खोना है, जब तक app कोई recovery path डिज़ाइन न करे
- **Address reuse आपको link कर सकता है।** कई sites पर एक ही address इस्तेमाल करने से tracking की वही समस्या फिर बन जाती है, इसलिए app specific identifiers महत्वपूर्ण हैं
- **कोई ratified standard नहीं है।** हर project की अपनी scheme है, इसलिए एक के लिए बना login दूसरे के साथ काम नहीं करता
- **यह अपने आप में anonymity नहीं है।** यह app से आपकी वित्तीय जानकारी छिपाता है, लेकिन app के अंदर आने के बाद भी वह आपके कामों की profiling कर सकता है

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> बचने योग्य आम गलतियाँ

- किसी challenge code का दोबारा इस्तेमाल करना। हर code single use होना चाहिए और जल्दी expire होना चाहिए, वरना पकड़ा गया code replay किया जा सकता है
- उपयोगकर्ताओं से लॉग इन करने के लिए कोई महत्वपूर्ण राशि भेजने को कहना। Payment एक proof है, इसलिए राशि नगण्य होनी चाहिए
- जब application specific identifier वही काम कर सकता हो तब raw address को store करना
- यह मान लेना कि message signing हर जगह काम करती है। देखें कि आपके उपयोगकर्ताओं के पास वास्तव में कौन-से wallets हैं
- बाद में memo को secret मान लेना। यह साबित करता है कि sender ने कार्रवाई की, यह password नहीं है

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> इस पर काम कर रहे प्रोजेक्ट

ये [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon) के **Zcash Login** track के लिए बनाए गए थे। ये तैयार उत्पादों के बजाय experiments हैं, और ये दिखाते हैं कि एक ही विचार को कितने अलग तरीकों से बनाया जा सकता है।

- **ZecAuth** - Zcash के लिए एक wallet connection protocol, कुछ-कुछ वैसा जैसा WalletConnect अन्य जगहों पर करता है। App एक QR code या `zecauth://` link दिखाता है जिसमें एक challenge और वे capabilities होती हैं जिनकी वह मांग कर रहा है, जैसे sign in, payment requests, या viewing access। कोई transaction नहीं, कोई fee नहीं, कोई chain interaction नहीं। यह code के साथ एक written protocol specification भी देता है
- **ZShield** - एक shielded address को W3C DID और OpenID Connect identity में बदल देता है। Browser एक keypair बनाता है, server ZIP 304 शैली के interface पर एक nonce जारी करता है, wallet उस पर हस्ताक्षर करता है, और server एक JWT लौटाता है। क्योंकि परिणाम OIDC compatible है, मौजूदा apps इसे bespoke integration के बिना उपयोग कर सकती हैं
- **ZecPass** - signed memo के ज़रिए ownership साबित करता है, और इसे इस तरह बनाया गया है कि app को उपयोगकर्ता का address कभी पता ही न चले। यह एक stable identifier के रूप में उपयोग करने के लिए application scoped hash निकालता है, challenges को single use और time bound रखता है, और एक drop in React button के साथ एक नोड verification library भी देता है
- **Portal** - memo में one time code के साथ shielded transaction भेजकर login, जो mainnet पर चल रहा है। इसी flow का फिर से उपयोग paid content unlock करने और किसी link से पैसे भेजने या पाने के लिए किया जाता है
- **ZcashMe** - identity के proof के रूप में shielded payment का उपयोग करता है, और desktop से mobile के अंतर पर ध्यान देता है ताकि laptop पर sign in करने के लिए browser extension की ज़रूरत न पड़े
- **ZBooks** - एक accounting और payouts tool जो Zcash से sign in को स्वयं उत्पाद के बजाय एक reusable auth primitive की तरह मानता है, और treasury data को Unified Full Viewing Key के माध्यम से पढ़ता है

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> संबंधित पृष्ठ

- [Memos](/using-zcash/memos) - encrypted memos कैसे काम करते हैं, और login code उनके भीतर कैसे चलता है
- [Viewing Keys](/zcash-tech/viewing-keys) - spending power सौंपे बिना read only access देना
- [Shielded ZEC के साथ रिकॉर्ड रखना](/zcash-use-cases/keeping-records-with-shielded-zec) - वही selective disclosure विचार, accounting पर लागू किया गया
- [पहचान को लिंक किए बिना पैसे भेजें](/zcash-use-cases/send-money-without-linking-identity) - address reuse privacy को क्यों कमज़ोर करता है

<br/>

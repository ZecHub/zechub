---
# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Zcash के साथ साइन इन करें

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>मध्यम स्तर - 7 मिनट</span>

## TL;DR

- पासवर्ड इस्तेमाल करने के बजाय, यह साबित करके लॉग इन करें कि आप एक Zcash address को नियंत्रित करते हैं
- दो डिज़ाइन प्रचलन में हैं: **challenge पर sign करना**, या **memo में एक code के साथ shielded payment भेजना**
- क्योंकि shielded addresses बैलेंस और हिस्ट्री छिपाते हैं, नियंत्रण साबित करने से आपकी वित्तीय जानकारी उजागर नहीं होती
- यह पैटर्न अभी शुरुआती चरण में है। अभी तक कोई ratified standard नहीं है, और implementations आपस में interoperable नहीं हैं

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> यह किसके लिए है?

- Developers जो व्यक्तिगत डेटा इकट्ठा किए बिना passwordless login चाहते हैं
- ऐसे users जो हर site को अपना email address नहीं देना चाहते
- कोई भी व्यक्ति जो अपने वित्तीय इतिहास को किसी account से जोड़े बिना लॉग इन करना चाहता है

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> समस्या

ज़्यादातर login options कुछ न कुछ लीक करते हैं:

- **Passwords और email** आपकी पहचान से जुड़ा एक account बनाते हैं, और दोनों अंततः breach dumps में पहुँच जाते हैं
- **Social sign-in** identity provider को यह बता देता है कि आप कहाँ और कब लॉग इन करते हैं
- **Transparent chains पर wallet sign-in** दिखने से भी बदतर है। किसी wallet को connect करने से site को आपका पूरा balance और transaction history स्थायी रूप से मिल सकती है

आमतौर पर आप सुविधा और खुलासे के बीच चुनाव कर रहे होते हैं।

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Zcash क्यों?

Zcash *नियंत्रण साबित करने* को *वित्तीय जानकारी उजागर करने* से अलग करता है:

- **Shielded addresses** balances और transaction history को private रखते हैं, इसलिए यह साबित करना कि आप किसी address के मालिक हैं, यह नहीं बताता कि आपके पास क्या है
- **Encrypted memos** किसी transaction के भीतर निजी रूप से एक one time login code ले जा सकते हैं
- **Viewing keys** selective disclosure की अनुमति देते हैं, ताकि किसी app को केवल वही read access दिया जाए जिसकी उसे ज़रूरत है, उससे अधिक नहीं

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> यह कैसे काम करता है

दो तरीके उभरकर सामने आए हैं। दोनों का अंत इस बात पर होता है कि app के पास आपके लिए एक stable identifier होता है और कोई password नहीं।

### तरीका 1: किसी challenge पर sign करें

1. App एक random, single use challenge बनाता है
2. आपका wallet उस challenge पर आपके address के पीछे मौजूद key से sign करता है
3. App signature को verify करता है और आपको लॉग इन कर देता है

कुछ भी broadcast नहीं होता, इसलिए कोई fee नहीं लगती और किसी block का इंतज़ार नहीं करना पड़ता। इससे संबंधित specification [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304) है, जो अभी भी draft में है, इसलिए message signing के लिए wallet support अलग-अलग है।

### तरीका 2: shielded payment से इसे साबित करें

1. App एक one time code बनाता है और एक payment request दिखाता है
2. आप memo में उस code के साथ एक छोटी shielded transaction भेजते हैं
3. App memo को देखता है, code का मिलान करता है, और आपको लॉग इन कर देता है

यह उन wallets के साथ काम करता है जो आज पहले से memos को support करते हैं, और ऐसे wallets ज़्यादातर हैं। इसका tradeoff यह है कि इसमें network fee लगती है और confirmation का इंतज़ार करना पड़ता है।

### address को private रखना

किसी app को आपको पहचानने के लिए आपका address store करना ज़रूरी नहीं है। कुछ implementations इसे किसी application specific value के साथ hash करती हैं, ताकि हर site को उसी user के लिए एक अलग, stable identifier दिखाई दे। इससे sites आपस में जानकारी मिलाकर आपके accounts को link नहीं कर पातीं।

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Trade-offs

इस पर build करने या इस पर निर्भर होने से पहले इन्हें समझना ज़रूरी है।

| | Signed challenge | Shielded payment |
|---|---|---|
| लागत | मुफ़्त | हर login पर network fee |
| गति | तुरंत | confirmation का इंतज़ार |
| Wallet support | सीमित, ZIP 304 एक draft है | व्यापक, केवल memos की ज़रूरत |
| Chain पर रिकॉर्ड छोड़ता है | नहीं | हाँ, एक transaction मौजूद होती है |

साझी सीमाएँ:

- **डिफ़ॉल्ट रूप से account recovery नहीं होती।** Key खोने का मतलब account खोना है, जब तक app कोई recovery path डिज़ाइन न करे
- **Address reuse आपको link कर सकता है।** कई sites पर एक ही address का उपयोग tracking की समस्या को फिर से पैदा करता है, इसलिए app specific identifiers महत्वपूर्ण हैं
- **कोई ratified standard नहीं है।** हर project की अपनी scheme है, इसलिए एक के लिए बना login दूसरे के साथ काम नहीं करता
- **यह अपने आप में anonymity नहीं है।** यह app से आपकी वित्तीय जानकारी छिपाता है, लेकिन app के अंदर पहुँचने के बाद भी app आपके व्यवहार की profiling कर सकता है

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> बचने योग्य आम गलतियाँ

- किसी challenge code का दोबारा उपयोग करना। हर code single use होना चाहिए और जल्दी expire होना चाहिए, नहीं तो पकड़ा गया code replay किया जा सकता है
- Users से लॉग इन करने के लिए कोई अर्थपूर्ण राशि भेजने को कहना। Payment सिर्फ proof है, इसलिए राशि नगण्य होनी चाहिए
- Raw address को store करना, जबकि application specific identifier वही काम कर सकता है
- यह मान लेना कि message signing हर जगह काम करती है। जाँचें कि आपके users के पास वास्तव में कौन से wallets हैं
- बाद में memo को secret मान लेना। यह साबित करता है कि sender ने कार्रवाई की, यह password नहीं है

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> इस दिशा में काम कर रहे प्रोजेक्ट्स

ये [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon) के **Zcash Login** track के लिए बनाए गए थे। ये तैयार products की बजाय experiments हैं, और ये दिखाते हैं कि एक ही विचार को कितने अलग तरीकों से बनाया जा सकता है।

- **ZecAuth** - Zcash के लिए एक wallet connection protocol, कुछ वैसा जैसा दूसरी जगह WalletConnect करता है। App एक QR code या `zecauth://` link दिखाता है, जिसमें एक challenge और वे capabilities होती हैं जिनकी वह माँग कर रहा है, जैसे sign in, payment requests, या viewing access। कोई transaction नहीं, कोई fee नहीं, कोई chain interaction नहीं। यह code के साथ एक लिखित protocol specification भी प्रदान करता है
- **ZShield** - एक shielded address को W3C DID और OpenID Connect identity में बदल देता है। Browser एक keypair बनाता है, server ZIP 304 शैली के interface पर एक nonce जारी करता है, wallet उस पर sign करता है, और server एक JWT लौटाता है। क्योंकि परिणाम OIDC compatible है, मौजूदा apps इसे बिना किसी bespoke integration के इस्तेमाल कर सकते हैं
- **ZecPass** - एक signed memo के माध्यम से ownership साबित करता है, और इसे इस तरह बनाया गया है कि app user का address कभी सीखता ही नहीं। यह stable identifier के रूप में उपयोग के लिए application scoped hash derive करता है, challenges को single use और time bound रखता है, और एक drop in React button के साथ एक Node verification library भी देता है
- **Portal** - memo में one time code के साथ shielded transaction भेजकर login, जो mainnet पर चल रहा है। उसी flow का पुन: उपयोग paid content unlock करने और किसी link से पैसा भेजने या पाने के लिए किया जाता है
- **ZcashMe** - identity के proof के रूप में shielded payment का उपयोग करता है, और desktop से mobile के अंतर पर ध्यान केंद्रित करता है ताकि laptop पर sign in करने के लिए browser extension की आवश्यकता न पड़े
- **ZBooks** - एक accounting और payouts tool, जो Zcash के साथ sign in को स्वयं product के बजाय एक reusable auth primitive के रूप में मानता है, और treasury data को Unified Full Viewing Key के माध्यम से पढ़ता है

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> संबंधित पृष्ठ

- [Memos](/using-zcash/memos) - encrypted memos कैसे काम करते हैं, और login code उनके भीतर कैसे यात्रा करता है
- [Viewing Keys](/zcash-tech/viewing-keys) - spending power सौंपे बिना read only access देना
- [Shielded ZEC के साथ रिकॉर्ड रखना](/zcash-use-cases/keeping-records-with-shielded-zec) - selective disclosure का वही विचार, accounting पर लागू किया गया
- [पहचान को लिंक किए बिना पैसा भेजें](/zcash-use-cases/send-money-without-linking-identity) - address reuse privacy को क्यों कमज़ोर करता है

<br/>

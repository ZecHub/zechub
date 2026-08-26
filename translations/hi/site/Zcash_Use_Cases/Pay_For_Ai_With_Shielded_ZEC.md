# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Shielded ZEC के साथ निजी तौर पर AI सेवाओं के लिए भुगतान करें

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  शुरुआती - 10 मिनट
</span>


## संक्षेप में

- **NanoGPT** सीधे shielded ZEC स्वीकार करता है, बिना किसी account और बिना email के
- न्यूनतम top-up **$0.10** है, इसलिए आप बहुत कम रकम से इसे आजमा सकते हैं
- क्रेडिट लगभग **30 सेकंड** में, पहली confirmation पर पहुंच जाता है
- जो सेवाएं ZEC स्वीकार नहीं करतीं, उनके लिए **CrossPay** का उपयोग करें ताकि आप shielded ZEC खर्च कर सकें और उन्हें USDC में भुगतान हो जाए
- chain पर अंततः क्या दिखाई देगा, यह इस पर निर्भर करता है कि आपका ZEC **किस pool में है**, और स्क्रीन यह कभी नहीं बताती

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> यह किसके लिए है?

- कोई भी जो नहीं चाहता कि उसकी AI subscription उसके नाम से जुड़ी हो
- Developers जो corporate card के बिना inference के लिए भुगतान कर रहे हैं
- वे लोग जिनके देशों में AI सेवाओं के लिए card payment विफल हो जाती है
- कोई भी जो किसी model को आजमाने के लिए अपना email नहीं देना चाहता

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> समस्या

सामान्य तौर पर AI के लिए भुगतान करने का मतलब है एक card, एक email, और एक account। इससे आपका हर prompt आपकी कानूनी पहचान से जुड़ जाता है, और payment processor भी यह सब देखता है।

Crypto को यह समस्या हल करनी चाहिए, लेकिन अधिकतर guides पुराने हो चुके हैं। सेवाएं क्या स्वीकार करती हैं, यह बदलता रहता है, और एक साल पहले लिखा गया walkthrough आपको ऐसे रास्ते पर भेज देगा जो अब काम नहीं करता।

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Zcash क्यों?

एक shielded payment भेजने वाले, पाने वाले और राशि, तीनों को छिपा देती है। सेवा को भुगतान मिल जाता है, और chain को देखने वाला कोई भी व्यक्ति यह नहीं जान पाता कि किसने कितना भुगतान किया।

लेकिन यह तभी सही है जब आप **shielded funds से** भुगतान करें। यह पेज साफ तौर पर बताता है कि यह कब सही है और कब नहीं।

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> आपको क्या चाहिए

- **shielded** balance में ZEC
- ऐसा wallet जो unified address पर भेज सके। यह walkthrough **Noir Wallet** का उपयोग करता है, जो एक browser extension है, ताकि पूरा flow एक ही window में रहे। Zkool और Zodl भी इसी तरह काम करते हैं
- साथ-साथ करने के लिए लगभग $1

> **क्या आप किसी exchange से आ रहे हैं?** Binance सहित अधिकांश exchanges, ZEC को केवल **transparent** addresses पर withdraw करते हैं, और वे destination के रूप में `u1...` address स्वीकार नहीं करेंगे। पहले अपने खुद के transparent address पर withdraw करें, फिर अपने wallet में उसे shield करें, और उसके बाद shielded balance से भुगतान करें।

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> मार्ग 1: NanoGPT को सीधे भुगतान करें

[NanoGPT](https://nano-gpt.com/) आपको 200+ models देता है, जिनमें GPT, Claude, Gemini और image models शामिल हैं, और यह मूल रूप से ZEC स्वीकार करता है।

### चरण 1: इसे खोलें। Signup की जरूरत नहीं है

nano-gpt.com पर जाएं और इसका उपयोग शुरू करें। हर session default रूप से anonymous होता है और app खुद यही कहता है: *"You are already using NanoGPT privately."* बनाने के लिए कोई account नहीं है और देने के लिए कोई email नहीं है।

### चरण 2: पहले एक sign-in token सुरक्षित कर लें

पैसे डालने से पहले **Settings** खोलें और एक sign-in token बनाएं, फिर उसे कहीं सुरक्षित रख लें।

> **यह कदम आपके पैसे की सुरक्षा करता है।** एक anonymous balance आपके browser के local data में रहती है। यदि आपने token सुरक्षित नहीं किया और cookies साफ कर दीं, तो balance चली जाएगी, और उसे वापस पाने के लिए कोई account भी नहीं होगा। यह काम deposit करने से पहले करें, बाद में नहीं।

### चरण 3: balance जोड़ें

**Balance** खोलें, **Custom** चुनें, और राशि दर्ज करें। न्यूनतम **$0.10** है और अधिकतम $5,000। NanoGPT आपको बताता है कि इससे क्या खरीदा जा सकता है, लगभग 12 GPT 5.5 prompts या $1 में 18 images।

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### चरण 4: Zcash चुनें

**Digital currencies** चुनें, फिर grid से **Zcash** चुनें।

आपको एक QR code, एक payment address, और चुनी गई राशि के लिए ZEC में एक **transfer minimum** मिलेगा। यह संख्या पेज लोड होने के समय की कीमत पर आधारित होती है।

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### चरण 5: अपने wallet से भेजें

address को अपने wallet में copy करें, राशि दर्ज करें, और भेजें। network fee लगभग **0.00015 ZEC** है।

> **न्यूनतम से थोड़ा अधिक भेजें।** quote की कीमत पेज लोड होने के समय तय होती है और आपकी transaction confirm होने से पहले ZEC की कीमत बदल सकती है। testing में ठीक न्यूनतम भेजने पर **$1.00** की बजाय **$0.99** पहुंचे। थोड़ा अधिक भेजने पर उसी nominal $1 के लिए $1.17 पहुंचे, क्योंकि NanoGPT उतना credit देता है जितना आप वास्तव में भेजते हैं।

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### चरण 6: लगभग 30 सेकंड प्रतीक्षा करें

आपका wallet transaction को pending, फिर confirming दिखाएगा। NanoGPT balance को **पहली confirmation** पर credit कर देता है, इसलिए आपको तीनों confirmations का इंतजार नहीं करना पड़ता।

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

balance दिखाई दे जाएगी और आप उसे तुरंत खर्च कर सकते हैं।

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> मार्ग 2: वे सेवाएं जो ZEC स्वीकार नहीं करतीं

अधिकांश AI सेवाएं ZEC स्वीकार नहीं करतीं। **Venice.ai** और **OpenRouter** दोनों USDC स्वीकार करते हैं, और OpenRouter आपको चुनने देता है कि checkout किस chain पर settle होगा।

ऐसे मामलों में [Zodl](/zcash-organizations/zodl) में **CrossPay** का उपयोग करें। आप shielded ZEC खर्च करते हैं और प्राप्तकर्ता को उसी asset में भुगतान मिलता है जो उसने मांगा है, NEAR Intents के माध्यम से route होकर, बिना किसी centralised exchange और बिना KYC के।

1. सेवा का payment address, और वह asset तथा chain पता करें जिसकी वह अपेक्षा करती है, उदाहरण के लिए Base पर USDC
2. Zodl खोलें और **CrossPay** चुनें
3. वह address दर्ज करें, सेवा द्वारा मांगा गया asset चुनें, और राशि दर्ज करें
4. अपने shielded balance से भेजें

आपका ZEC shielded अवस्था से बाहर निकलता है। सेवा को एक सामान्य USDC payment आती हुई दिखती है और उसे कभी पता नहीं चलता कि इसकी शुरुआत ZEC के रूप में हुई थी।

> swap वाला भाग destination chain पर दिखाई देता है, इसलिए USDC payment खुद उतनी ही सार्वजनिक होती है जितनी कोई भी दूसरी USDC payment। जो चीज निजी रहती है, वह Zcash वाला हिस्सा और दोनों के बीच का संबंध है।

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> हर चरण पर क्या उजागर होता है

यही वह हिस्सा है जिसे अधिकांश guides छोड़ देती हैं।

| क्या होता है | सेवा क्या सीखती है | chain पर क्या जाता है |
|---|---|---|
| Browse करना और prompts भेजना | कुछ नहीं। कोई account नहीं, कोई email नहीं | कुछ नहीं |
| एक deposit address जारी होता है | कुछ नहीं | कुछ नहीं |
| आप **Sapling से** भुगतान करते हैं | वह deposit address जिसे आपने उपयोग किया | कुछ नहीं। Shielded से shielded |
| आप **Ironwood से** भुगतान करते हैं | वही | **राशि और block height** |
| आप **transparent address से** भुगतान करते हैं | वही | राशि और आपका t-address |
| ऊपर दिए गए किसी भी मामले में | आपका IP, जब तक आप Tor या VPN का उपयोग न करें | लागू नहीं |

### pool का महत्व क्यों है

NanoGPT का deposit address एक unified address है। August 2026 में जारी किए गए एक address को decode करने पर ठीक दो receivers दिखते हैं: **Sapling** और **Orchard**।

चूंकि [Ironwood](/zcash-tech/ironwood) upgrade 28 July 2026 को सक्रिय हुआ था, Orchard अब केवल spend-only है और उसमें कोई नई value नहीं डाली जा सकती। इसका मतलब है कि **Sapling ही एकमात्र receiver बचता है जहां payment वास्तव में पहुंच सकती है**।

इसलिए यदि आपका ZEC पहले से Sapling में है, तो payment Sapling से Sapling होगी और उसके बारे में कुछ भी सार्वजनिक नहीं होगा। लेकिन यदि आप Ironwood पर migrate कर चुके हैं, तो भुगतान value को एक pool boundary के पार ले जाता है, और [the turnstile](/zcash-tech/the-turnstile) राशि और height प्रकाशित करता है, भले ही sender और receiver छिपे रहें।

दोनों ही स्थितियों में स्क्रीन बिल्कुल एक जैसी दिखती हैं। भुगतान के लिए थोड़ा सा Sapling balance बनाए रखना सबसे सरल समाधान है।

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> बचने योग्य सामान्य गलतियां

- sign-in token सुरक्षित करने से पहले deposit कर देना, और फिर cookies साफ कर देना
- ठीक transfer minimum भेजना और एक cent कम पहुंचना
- किसी exchange से सीधे `u1...` address पर withdraw करने की कोशिश करना
- यह मान लेना कि payment निजी है, बिना यह जांचे कि आपने किस pool से खर्च किया
- सामान्य connection पर भुगतान करना जबकि पूरा उद्देश्य पहचान छिपाना था

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> परिणाम

आप यह कर सकते हैं:

- बिना account, email या card के frontier AI models का उपयोग
- shielded ZEC में भुगतान और यह ठीक-ठीक समझना कि इससे क्या छिपता है और क्या नहीं
- CrossPay के माध्यम से उन सेवाओं तक पहुंचना जिन्होंने Zcash का नाम भी नहीं सुना

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> संबंधित

- [Ironwood](/zcash-tech/ironwood) - आपके funds जिस pool में हैं, उसमें क्या बदलाव हुआ
- [The Turnstile](/zcash-tech/the-turnstile) - जब value pools के बीच जाती है तो क्या सार्वजनिक हो जाता है
- [Wallets](/using-zcash/wallets) - कौन से wallets maintained हैं
- [ZODL](/zcash-organizations/zodl) - CrossPay के पीछे का wallet

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> प्रगति

**1 में से चरण 1**

आपने shielded ZEC के साथ एक AI सेवा के लिए भुगतान किया है और आपको पता है कि उससे क्या उजागर हुआ।

<br/>

## अगला चरण

- [पहचान को जोड़े बिना पैसे भेजें](/zcash-use-cases/send-money-without-linking-identity)

<br/>

<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# लेनदेन

ZEC भुगतान के लिए व्यापक रूप से उपयोग की जाने वाली एक डिजिटल एसेट है, जो मजबूत privacy सुविधाएँ प्रदान करती है, जिससे यह दोस्तों को भुगतान करने, खरीदारी करने या दान देने जैसे विभिन्न लेनदेन के लिए उपयुक्त बनती है। privacy और सुरक्षा को अधिकतम करने के लिए, यह समझना आवश्यक है कि Zcash के भीतर अलग-अलग प्रकार के लेनदेन कैसे काम करते हैं।

## संक्षेप में

- Zcash दो प्रकार के लेनदेन का समर्थन करता है: **shielded**, जो विवरण को निजी रखता है, और **transparent**, जो उन्हें सार्वजनिक रूप से दर्ज करता है।
- Shielded addresses की शुरुआत `u` या `z` से होती है। Transparent addresses की शुरुआत `t` से होती है और वे काफी हद तक Bitcoin address की तरह काम करते हैं।
- हर भुगतान में चुनाव आपका है। privacy वह विकल्प है जो Zcash आपको देता है, न कि कोई setting जिसे कोई और आपके लिए तय करे।
- Exchange से निकासी वह सबसे आम जगह है जहाँ लोग privacy खो देते हैं। यदि exchange केवल transparent withdrawals का समर्थन करता है, तो फंड आने के बाद उन्हें स्वयं shield करें।
- Fees [ZIP 317](https://zips.z.cash/zip-0317) का पालन करती हैं और लेनदेन के आकार के साथ बढ़ती हैं। जो wallets अभी भी पुरानी flat fee भेज रही हैं, उनके लेनदेन में देरी हो सकती है।
- अधिकांश Zcash लेनदेन में [ZIP 203](https://zips.z.cash/zip-0203) के तहत expiry height होती है। यदि कोई लेनदेन mined होने से पहले expire हो जाता है, तो वह उस expiry height के बाद confirm नहीं हो सकता और उसे फिर से भेजने की आवश्यकता पड़ सकती है।

## Shielded लेनदेन

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded लेनदेन तब होते हैं जब आप ZEC को अपने shielded wallet में ले जाते हैं। आपके shielded wallet address की शुरुआत `u` या `z` से होती है। Shielded लेनदेन भेजते समय, आप और जिन लोगों के साथ आप लेनदेन करते हैं, वे ऐसी privacy बनाए रख सकते हैं जो default रूप से public payment networks पर संभव नहीं है।

Shielded लेनदेन भेजना सबसे आसान तब होता है जब आप ऐसा wallet उपयोग करते हैं जो वर्तमान Zcash network और वर्तमान shielded pools का समर्थन करता हो। privacy के लिए किसी wallet पर निर्भर होने से पहले, यह जाँच लें कि क्या वह shielded sending, shielded receiving, और उस pool का समर्थन करता है जिसका आप उपयोग करना चाहते हैं। किसी exchange से ZEC निकालते समय, यह जाँच लें कि क्या exchange shielded या transparent withdrawals का समर्थन करता है। यदि वह केवल transparent withdrawals का समर्थन करता है, तो फंड आने के बाद उन्हें shielded-capable wallet में ले जाएँ।

फंड भेजने और प्राप्त करने के लिए shielded लेनदेन का उपयोग privacy बनाए रखने और payment data के लीक होने के जोखिम को कम करने का सबसे अच्छा तरीका है।

## Transparent लेनदेन

Transparent लेनदेन Bitcoin लेनदेन की तरह काम करते हैं। लेनदेन का विवरण blockchain पर सार्वजनिक रूप से दिखाई देता है, जिसमें transparent addresses और transparent values शामिल हैं। जब privacy प्राथमिकता हो, तब transparent लेनदेन से बचना चाहिए।

Transparent addresses कुछ स्थितियों में अभी भी उपयोगी हैं, खासकर जब कोई exchange या सेवा shielded addresses का समर्थन नहीं करती। यदि आपको ZEC किसी transparent address पर प्राप्त होता है, तो बाद में भुगतान करने से पहले उसे shield करने पर विचार करें।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## इसे समझने का एक सरल तरीका

एक transparent लेनदेन एक postcard की तरह है। डाकिया उसे पहुँचा देता है, लेकिन रास्ते में जो भी उसे संभालता है, वह संदेश पढ़ सकता है, देख सकता है कि उसे किसने भेजा और किसे प्राप्त हुआ।

एक shielded लेनदेन एक sealed envelope की तरह है। डाक सेवा फिर भी यह पुष्टि करती है कि वास्तविक डाक-शुल्क के साथ एक वास्तविक पत्र system से गुज़रा, और कोई भी उसे नकली नहीं बना सकता या एक ही पत्र दो बार नहीं भेज सकता। लिफाफे के भीतर क्या है, यह केवल प्रेषक और प्राप्तकर्ता के बीच रहता है।

महत्वपूर्ण बात यह है कि Zcash आपको हर भुगतान पर यह तय करने देता है कि कौन-सा भेजना है।

## Zcash Fees

Zcash Ethereum-style gas units का उपयोग नहीं करता। Zcash transaction fees का भुगतान ZEC में किया जाता है, जिसे आमतौर पर **zatoshis** में मापा जाता है। एक ZEC, 100,000,000 zatoshis के बराबर होता है।

[ZIP 317](https://zips.z.cash/zip-0317) एक प्रचलित fee mechanism को परिभाषित करता है जो लेनदेन की complexity के साथ बढ़ता है। हर लेनदेन द्वारा पुरानी 1,000-zatoshi flat fee उपयोग करने के बजाय, conventional fee "logical actions" जैसे inputs, outputs, और shielded actions पर आधारित होती है। साधारण लेनदेन आमतौर पर लगभग 10,000 zatoshis, या 0.0001 ZEC, से शुरू होते हैं, और अधिक जटिल लेनदेन के लिए इससे अधिक की आवश्यकता हो सकती है।

अधिकांश वर्तमान wallets में, उपयोगकर्ताओं को ZIP 317 fees की manual गणना करने की आवश्यकता नहीं होनी चाहिए। Wallet को स्वचालित रूप से उपयुक्त fee चुननी चाहिए। यदि कोई wallet अभी भी पुरानी flat fee का उपयोग करता है या आपको ZIP 317 conventional fee से काफी कम fee सेट करने देता है, तो लेनदेन में देरी हो सकती है, उसकी प्राथमिकता कम हो सकती है, कुछ नोड उसे drop कर सकते हैं, या वह भरोसेमंद तरीके से relay होने में विफल हो सकता है।

## अटके हुए लेनदेन की समस्या-समाधान

कोई Zcash लेनदेन केवल इसलिए final नहीं हो जाता क्योंकि वह आपके wallet में दिखाई देता है। सामान्य उपयोग के लिए वह तब final होता है जब वह किसी block में mined हो जाए और आपकी स्थिति के लिए पर्याप्त confirmations प्राप्त कर ले। Exchanges और सेवाएँ wallet द्वारा default रूप से दिखाए जाने से अधिक confirmations माँग सकती हैं।

फिर से भेजने से पहले इस decision tree का उपयोग करें:

1. **क्या आपका wallet transaction ID दिखा रहा है?**
   - यदि नहीं, तो wallet ने शायद अभी तक लेनदेन बनाया या broadcast नहीं किया है। Sync status, internet connection, wallet version, और wallet के किसी error message की जाँच करें।
   - यदि हाँ, तो transaction ID कॉपी करें और आगे बढ़ें।
2. **क्या लेनदेन किसी block में confirmed है?**
   - यदि हाँ, तो अपने wallet, exchange, merchant, या सेवा द्वारा आवश्यक confirmations की संख्या पूरी होने तक प्रतीक्षा करें।
   - यदि नहीं, तो आगे बढ़ें।
3. **क्या लेनदेन अपनी expiry height तक पहुँच गया है?**
   - यदि नहीं, तो अभी वही भुगतान manually फिर से न भेजें। मूल लेनदेन अभी भी confirm हो सकता है।
   - यदि हाँ, तो वह लेनदेन उस expiry height के बाद mined नहीं हो सकता। आपका wallet उसे expired या failed के रूप में चिह्नित कर सकता है, और आपको नया लेनदेन बनाना पड़ सकता है।
4. **क्या लेनदेन एक server या explorer पर दिखाई देता है लेकिन दूसरे पर नहीं?**
   - इसे network visibility issue मानें, यह प्रमाण नहीं कि लेनदेन विफल हो गया। अलग-अलग नोड के mempool views अलग हो सकते हैं।
   - प्रतीक्षा करें, अपना wallet resync करें, या यदि आपका wallet समर्थन करता है तो किसी दूसरे trusted server पर switch करें।
5. **क्या confirmed दिखने के बाद लेनदेन गायब हो गया?**
   - एक छोटी chain reorganization अस्थायी रूप से किसी लेनदेन को best chain से हटा सकती है।
   - अधिक blocks आने तक प्रतीक्षा करें। यदि लेनदेन वापस आता है, तो confirmations का इंतज़ार जारी रखें। यदि वह वापस नहीं आता और बाद में expire हो जाता है, तो नया लेनदेन बनाएँ।
6. **क्या wallet आपसे फिर से भेजने के लिए कह रहा है?**
   - केवल तब wallet के वर्तमान guidance का पालन करें जब आपने जाँच लिया हो कि पिछला लेनदेन expired, failed, या अब valid नहीं है।
   - यदि आप निश्चित नहीं हैं, तो दोबारा भेजने से पहले support से पूछें।

## Pending, Expired, Dropped, और Reorged

- **Pending** का मतलब है कि लेनदेन बनाया या broadcast किया जा चुका है, लेकिन अभी तक किसी block में mined नहीं हुआ है।
- **Expired** का मतलब है कि लेनदेन की expiry height पार हो चुकी है। ZIP 203 के तहत, expiry height वाला लेनदेन उस height के बाद mined नहीं हो सकता।
- **Dropped** का मतलब है कि एक या अधिक नोड अब उस लेनदेन को अपने mempool में नहीं रखते। ऐसा expiry, low fees, mempool policy, restart behavior, या relay differences के कारण हो सकता है।
- **Reorged** का मतलब है कि वह block जिसमें पहले लेनदेन शामिल था, अब best chain का हिस्सा नहीं है। लेनदेन बाद में फिर से mined हो सकता है, या यदि वह अभी भी valid है तो वापस pending में आ सकता है।

## कब फिर से न भेजें

केवल इसलिए तुरंत फिर से न भेजें क्योंकि कोई लेनदेन pending है, धीमा है, या एक explorer में नहीं दिख रहा। बहुत जल्दी फिर से भेजने से भ्रम पैदा हो सकता है और, wallet नया भुगतान कैसे बनाता है इस पर निर्भर करते हुए, दो बार भुगतान करने का जोखिम हो सकता है।

पहले प्रतीक्षा करें या support लें जब:

- लेनदेन के पास transaction ID है और वह expired नहीं हुआ है।
- एक server उसे दिखाता है जबकि दूसरा नहीं।
- वह हाल ही में mined हुआ था लेकिन संभव reorg के बाद confirmations खो बैठा।
- Receiving service ने अभी confirmations गिनना पूरा नहीं किया है।
- आपका wallet अभी भी sync हो रहा है।

आमतौर पर केवल तब फिर से भेजना अधिक सुरक्षित होता है जब wallet स्पष्ट रूप से लेनदेन को expired या failed के रूप में चिह्नित कर दे, या support पुष्टि कर दे कि मूल लेनदेन confirm नहीं हो सकता।

## Privacy-Safe Checks

आप आवश्यक से अधिक जानकारी उजागर किए बिना लेनदेन की बुनियादी स्थिति जाँच सकते हैं:

- जाँचें कि आपका wallet पूरी तरह synced है या नहीं।
- जाँचें कि wallet app up to date है या नहीं।
- जाँचें कि लेनदेन के पास transaction ID है या नहीं।
- जाँचें कि लेनदेन confirmed, pending, expired, या failed है या नहीं।
- वर्तमान block height जाँचें और यदि आपका wallet दिखाता है, तो उसकी तुलना लेनदेन की expiry height से करें।
- Transparent लेनदेन के लिए, कोई block explorer सार्वजनिक लेनदेन, addresses, values, और confirmations दिखा सकता है।
- Shielded लेनदेन के लिए, block explorer यह दिखा सकता है कि कोई लेनदेन मौजूद है, लेकिन वह shielded sender, recipient, amount, या memo details नहीं दिखा सकता।

## क्या सार्वजनिक रूप से साझा नहीं करना चाहिए

इन्हें कभी भी public chat, social media, या issue tracker में पोस्ट न करें:

- Seed phrase या recovery phrase
- Spending key, private key, या wallet backup
- Full viewing key
- ऐसे screenshots जिनमें balances, full addresses, memos, QR codes, या exchange account details दिखाई दें
- व्यक्तिगत पहचान दस्तावेज़ या account recovery records

Transaction ID chain पर public होती है, लेकिन यह फिर भी आपके support question को आपकी पहचान से जोड़ सकती है। यदि privacy महत्वपूर्ण है, तो इसे केवल किसी trusted support channel के साथ साझा करें।

## Support Teams को क्या चाहिए

Wallet, exchange, या service support से मदद माँगते समय केवल न्यूनतम उपयोगी जानकारी साझा करें:

- Wallet या service का नाम
- App version और operating system
- क्या लेनदेन shielded है, transparent है, या shielded और transparent addresses के बीच है
- Transaction ID, यदि आप इसे साझा करने में सहज हैं
- भेजने का अनुमानित समय
- क्या wallet पूरी तरह synced है
- Wallet द्वारा दिखाई गई वर्तमान स्थिति
- सटीक error message, जिसमें private data हटा दिया गया हो
- ऐसा screenshot जिसमें balances, addresses, memos, और account details छिपी हों

Support teams को आपकी seed phrase, spending key, private key, या full viewing key की आवश्यकता नहीं होती।

## सामान्य गलतियाँ

- **यह मान लेना कि ZEC सूचीबद्ध करने वाला कोई भी wallet उसे privately भेज सकता है।** कई multi-coin wallets केवल Zcash के transparent पक्ष का समर्थन करते हैं। privacy के लिए उस पर निर्भर होने से पहले wallet के supported pools की जाँच करें। [Wallets](https://zechub.wiki/using-zcash/wallets) पेज प्रत्येक विकल्प के लिए यह सूचीबद्ध करता है।
- **किसी transparent address पर withdrawal करना और फंड वहीं छोड़ देना।** Withdrawal स्वयं public है, और उस address से बाद की हर movement भी public रहती है। फंड आते ही उन्हें shield करें।
- **privacy को ऐसी चीज़ समझना जिसे आप एक बार on कर देते हैं।** हर लेनदेन एक अलग चुनाव है। आज shielded भेजने से पिछले सप्ताह किया गया transparent भुगतान मिट नहीं जाता।
- **हर चीज़ के लिए एक ही transparent address का पुन: उपयोग करना।** क्योंकि transparent activity स्थायी रूप से दिखाई देती है, एक ही reused address धीरे-धीरे उन भुगतानों को आपस में जोड़ देता है जिन्हें जुड़े होने की कोई आवश्यकता नहीं थी।
- **पुरानी default fee के साथ भेजना।** जिन wallets ने ZIP 317 को नहीं अपनाया है, वे अभी भी पुरानी flat fee भेज सकती हैं, जिससे लेनदेन unconfirmed पड़ा रह सकता है।
- **expiry से पहले फिर से भेजना।** Pending लेनदेन expire होने तक अभी भी confirm हो सकता है। दूसरा भुगतान बनाने से पहले expiry status जाँचें।

## ध्यान दें

कृपया ध्यान दें कि ZEC का उपयोग करने का सबसे सुरक्षित तरीका shielded लेनदेन का उपयोग करना है, जब भी sender, recipient, wallet, और service सभी उनका समर्थन करते हों। कुछ wallets और exchanges [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) का समर्थन करते हैं, जो एक address में कई Zcash receiver types को जोड़ सकते हैं।

## संसाधन

- [ZIP 203: Transaction Expiry](https://zips.z.cash/zip-0203)
- [ZIP 317: आनुपातिक ट्रांसफर fee mechanism](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## संबंधित पृष्ठ

- [Wallets](/using-zcash/wallets) - कौन से wallets shielded sending का समर्थन करते हैं, और कौन से केवल transparent हैं
- [Shielded Pools](/using-zcash/shielded-pools) - Sapling और Orchard, वे pools जिनमें आपके shielded funds रहते हैं
- [Memos](/using-zcash/memos) - encrypted messages जो shielded लेनदेन के साथ जा सकते हैं
- [Transparent Exchange Addresses](/using-zcash/transparent-exchange-addresses) - TEX addresses और exchanges उनका उपयोग क्यों करते हैं
- [Custodial Exchanges](/using-zcash/custodial-exchanges) - कौन से exchanges shielded withdrawals का समर्थन करते हैं

## ZEC से ZAT Converter

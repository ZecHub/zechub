<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZEC का निजी रूप से उपयोग

#### Shielded (निजी) बनाम Transparent

वर्तमान स्थिति में, Zcash में दो प्रकार के पते और लेन-देन होते हैं: shielded और transparent। Shielded और transparent ZEC के बीच का अंतर बहुत सरल है। Shielded ZEC आपके पैसे और आपके लेन-देन को निजी रखता है, जबकि transparent ZEC Bitcoin की तरह काम करता है, यानी पूरी तरह पारदर्शी। इसका मतलब है कि यदि किसी को आपका पता पता हो, तो वह आपका बैलेंस और आपके सभी लेन-देन देख सकता है।

जब लोग पहली बार ZEC का उपयोग शुरू करते हैं, तो हो सकता है कि उन्हें यह पता न हो कि वे किस प्रकार का पता इस्तेमाल कर रहे हैं। ऐसा इसलिए है क्योंकि सभी exchanges shielded ZEC और/या shielded ZEC withdrawals का समर्थन नहीं करते।

तो, उदाहरण के लिए, यदि कोई Coinbase का उपयोग करता है और ZEC खरीदता है, तो वह transparent ZEC खरीदेगा और उस ZEC को केवल किसी wallet के transparent पते पर ही withdraw कर पाएगा। [Zodl](https://zodl.com/) जैसे wallets इस समस्या के समाधान के लिए transparent पते पर भेजे गए funds को shield कर सकते हैं, लेकिन हर किसी को यह पता नहीं होता। सरल शब्दों में कहें तो, बहुत से लोग ZEC का उपयोग उसी तरह करते हैं जैसा उनका exchange या primary wallet उन्हें करने देता है।

#### यह सुनिश्चित करना कि आपका ZEC shielded है

हम सुझाव देते हैं कि हर कोई अपने ZEC की self-custody करे। यानी, अपना ZEC किसी exchange से निकालकर wallet में रखें। यह जानने का सबसे अच्छा तरीका कि आप shielded, यानी private, ZEC का उपयोग कर रहे हैं या नहीं, उस पते को देखना है जिसमें आपका बैलेंस रखा है। यदि पता "z" या "u1" से शुरू होता है, तो आपका बैलेंस shielded है। यदि पता "t" से शुरू होता है, तो बैलेंस transparent है।

सामान्यतः shielded ZEC तक पहुँचने के दो रास्ते होते हैं।

ऐसे exchange से जो **shielded** withdrawals का समर्थन करता हो:

  1. किसी exchange पर ZEC खरीदें
  2. exchange में withdrawal प्रक्रिया शुरू करें
  3. अपना shielded ZEC wallet खोलें और सुनिश्चित करें कि receiving address "u1" या "z" से शुरू होता है
  4. अपने exchange से withdrawal पूरा करें

ऐसे exchange से जो **transparent** withdrawals का समर्थन करता हो:


  1. किसी exchange पर ZEC खरीदें
  2. exchange में withdrawal प्रक्रिया शुरू करें
  3. अपना autoshielding ZEC wallet खोलें और transparent receiving address का उपयोग करें
  4. अपने exchange से withdrawal पूरा करें
  5. दस confirmations का इंतज़ार करें, फिर अपने transparent address से shielded address पर ZEC को shield करें


यहाँ exchange से ZEC withdraw करने का एक tutorial है। ध्यान दें कि यह एक shielded withdrawal है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
यहाँ अपने ZEC को transparent address से shielded address में shield करने का एक tutorial है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
यहाँ Coinbase पर ZEC खरीदने और उसे Zashi पर भेजने का एक tutorial है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### लेन-देन

यह सुनिश्चित करने के बाद कि आपका ZEC ऐसे shielded wallet में है जो shielded addresses का समर्थन करता है, अब आप तय कर सकते हैं कि क्या आप उस ZEC से लेन-देन करना चाहते हैं। ZEC के साथ लेन-देन करना बेहद आसान है। आप सामने वाले व्यक्ति की पसंद के अनुसार ZEC को shielded या transparent, किसी भी पते पर भेज सकते हैं। किसी भी मौद्रिक लेन-देन की तरह, इसमें थोड़ी संभावना रहती है कि लोग डेटा लीक कर दें। ZEC डेटा leakage से बचाव में सबसे बेहतर है, लेकिन इसका मतलब यह नहीं कि आप इसे पूरी तरह बेफिक्र होकर इस्तेमाल करें। ZEC के साथ लेन-देन करते समय कुछ बातों से बचना चाहिए।

- अपना shielded address सार्वजनिक करना
- Shielded address का उपयोग t-addresses के लिए pass through के रूप में करना (यानी "mixing")
- बड़ी संख्या में shielded से transparent transactions करना, और यह बताना कि आप ऐसा कर रहे हैं
- नियमित रूप से लोगों को यह बताना कि आप shielded ZEC कहाँ खर्च करते हैं


मूल रूप से, आपके ZEC के साथ सबसे अच्छा यही है कि उसे shielded wallet में रखें, shielded addresses के बीच लेन-देन करें, और सार्वजनिक जगहों पर ZEC का उपयोग कैसे करते हैं इस बारे में सावधान रहें (जैसे किसी coffee shop में)। गोपनीयता बनाए रखने के साथ एक स्तर की ज़िम्मेदारी भी आती है।

#### संसाधन

[Zcash लेन-देन](https://zechub.wiki/using-zcash/transactions)

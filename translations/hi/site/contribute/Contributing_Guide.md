<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecHub में योगदान

ZecHub लोगों को Zcash के बारे में सीखने में मदद करता है। यदि आप यह पेज पढ़ रहे हैं, तो हमें बहुत खुशी है कि आप योगदान देने पर विचार कर रहे हैं! आपका कोई भी योगदान [zechub.wiki](https://www.zechub.wiki/) और अन्य ZecHub सोशल मीडिया पर प्रदर्शित होगा।

### नए योगदानकर्ता

ZecHub का अवलोकन पाने के लिए, [README](https://github.com/ZecHub/zechub/blob/main/README.md) पढ़ें।


### शुरुआत करना

ZecHub समुदाय के योगदान का प्रबंधन करने के लिए GitHub का उपयोग करता है। यदि आप GitHub में नए हैं, तो चिंता न करें! हम बताएंगे कि आप ZecHub के सामुदायिक योगदानकर्ता के रूप में कैसे शामिल हो सकते हैं। स्वीकृत योगदान के लिए हम shielded ZEC में टिप देते हैं। ZEC में पुरस्कार राशि निश्चित नहीं है — [पुरस्कार कैसे निर्धारित किए जाते हैं](#how-rewards-are-set) देखें। इस मार्गदर्शिका में आपको issue खोलने, pull request (PR) बनाने, समीक्षा करने और PR मर्ज करने तक की योगदान प्रक्रिया का अवलोकन मिलेगा।


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### बातचीत में शामिल हों

सबसे पहले, हमारे [कम्युनिटी लिंक्स](https://zechub.wiki/zcash-community/community-links) में बातचीत में शामिल हों।

### स्टाइल गाइड

ZecHub में किसी भी योगदान को [ZecHub स्टाइल गाइड](https://zechub.wiki/contribute/style-guide) का पालन करना चाहिए। इसमें विकी, दस्तावेज़ और सोशल मीडिया सामग्री शामिल हैं।

### योगदान देने के तरीके

ZecHub एक समुदाय-संचालित परियोजना है जिसका उद्देश्य Zcash उपयोगकर्ताओं और डेवलपर्स के लिए सहायता और संसाधन प्रदान करना है। ZecHub से जुड़ने के कई तरीके हैं, जिनमें हमारे साप्ताहिक न्यूज़लेटर के लिए लिखना, हमारे नॉलेज बेस में योगदान देना, या विकास परियोजनाओं में मदद करना शामिल है।

ये वे प्रकार के योगदान हैं जिन्हें ZecHub वर्तमान में स्वीकार करता है:

### पुरस्कार कैसे निर्धारित किए जाते हैं

टिप्स shielded ZEC में दी जाती हैं। नीचे की हेडिंग्स में पहले दिए गए ZEC नंबर पुराने ZEC/USD रेट के ऐतिहासिक स्नैपशॉट थे। उन्हें वर्तमान रेट न मानें।

राशि कैसे चुनी जाती है:

1. कार्य को [बाउंटी राशि नीति](https://bounties.zechub.wiki/docs/bounty-amounts) में USD अंतराल से मिलाएं।
2. उस सीमा के भीतर एक लक्ष्य चुनें — अपने-आप सबसे ऊपरी राशि नहीं।
3. सार्वजनिक ZEC/USD स्पॉट रेट पर कन्वर्ट करें और बाउंटी पर ZEC दर्ज करें:

```
zec_to_enter = usd_target / zec_usd_spot
```

4 दशमलव स्थानों तक राउंड करें। नीति फ़ाइल ही एकमात्र सत्य स्रोत है। यदि यह पेज और वह फ़ाइल अलग हों, तो नीति मान्य होगी।

भुगतान वाला काम [ZEC Bounties](https://bounties.zechub.wiki/) पर सूचीबद्ध है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

तीन अवस्थाएँ जो एक जैसी नहीं हैं:

1. **मर्ज किया गया** — PR को repository में स्वीकार कर लिया गया है।
2. **पुरस्कार स्वीकृत** — एक sponsor या DAO सहमत है कि पुरस्कार देय है, और उसकी राशि क्या होगी।
3. **भुगतान किया गया** — ZEC आपके shielded Unified Address तक पहुंचता है।

मर्ज किया गया योगदान अपने-आप किसी पुरस्कार को स्वीकृत नहीं करता। स्वीकृत पुरस्कार पूर्ण भुगतान नहीं होता।

#### Dev कार्य

कोई भी स्वीकृत dev कार्य जो Zcash ecosystem के निर्माण में मदद करे। इसमें हमारा विकी, नए wallets, या कोई भी application शामिल हो सकता है जिसकी आप कल्पना कर सकते हैं।

#### Zcash ट्यूटोरियल (वीडियो)

नीचे एक उदाहरण ट्यूटोरियल है:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + Zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Zcash apps पर ट्यूटोरियल बनाएं और साझा करें तथा पुरस्कार पाएं। zechub/tutorials में PR सबमिट करें या Discord के #video-content चैनल में वीडियो भेजें। यदि वीडियो हमारे मानदंडों पर खरा उतरता है, तो हम उसे पोस्ट करेंगे और आपको टिप देंगे।

#### ZecHub विकी - नया विकी पेज प्रकाशित

हमारी विकी साइट आसान और समझने योग्य प्रारूप में Zcash शैक्षिक सामग्री प्रदान करती है। Zcash एक अत्यंत उन्नत तकनीक है जिसकी कम्युनिटी जीवंत है, इसलिए हमें अभी भी और दस्तावेज़ तैयार करने हैं। हमारा लक्ष्य इन विषयों पर दस्तावेज़ बनाना है:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

ये काफी व्यापक क्षेत्र हैं, इसलिए काम करने के लिए बहुत कुछ है। यदि आपको कुछ प्रेरणा चाहिए, तो हमारी वर्तमान [wiki-docs साइट](https://zechub.wiki/) देखें और देखें कि क्या कमी है। जब आप तय कर लें कि आप क्या लिखना चाहते हैं, तो अपने बदलाव करना शुरू करें और ZecHub repo में PR सबमिट करना सीखें। हमारे सभी दस्तावेज़ इसी repo में बनाए और बनाए रखे जाते हैं। विकी पेज लिखते समय [ZecHub स्टाइल गाइड](https://zechub.wiki/contribute/style-guide) का पालन करें और संरचनात्मक संदर्भ के लिए उसी सेक्शन में मौजूद किसी पेज का उपयोग करें। PR सबमिट करने के बाद, कृपया discord के #zechub सेक्शन में @dismad, @squirrel, या @vito को संदेश भेजें; वे आपके PR की समीक्षा करेंगे और साइट में जोड़ने के लिए तैयार होने पर उसे मर्ज करेंगे। मर्ज होने पर, वे दस्तावेज़ को ZecHub वेबसाइट में जोड़ देंगे। यदि दस्तावेज़ तैयार नहीं है, तो वे PR में आपके लिए संपादन सुझाएंगे।

#### ZecHub विकी - अनुवादित विकी पेज

ZecHub का लक्ष्य एक open-source शिक्षा केंद्र प्रदान करना है जिसमें Zcash कम्युनिटी का कोई भी व्यक्ति योगदान दे सके। इस केंद्र की सबसे बड़ी सफलताओं में से एक है कम्युनिटी सदस्यों को ZecHub सामग्री का अपनी स्थानीय भाषा में अनुवाद करते देखना।

नोट: ZecHub की Global पेज अनुवाद दर सीमा प्रति सप्ताह 10 पेज है।

`translations/<locale>/site/` के अंतर्गत क्यूरेट की गई locale पेजों को source-hash manifest द्वारा उनके अंग्रेज़ी स्रोत के साथ ट्रैक किया जाता है। पुरानेपन की पहचान, sync workflow और protected-terms validation के लिए [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) देखें।

#### ZecHub विकी - मौजूदा दस्तावेज़ में संपादन

कभी-कभी दस्तावेज़ों में हमारी जानकारी बिल्कुल सटीक नहीं होती। यह ठीक है। इसी कारण हमने उन्हें open-source बनाया है! यदि आपको किसी wiki-doc में कुछ ऐसा मिले जिसमें बदलाव की आवश्यकता हो, तो कृपया दस्तावेज़ के footer पर जाएं (जो उसके GitHub पेज से लिंक करता है) और PR के माध्यम से बदलाव सुझाएं।

#### ZecHub विकी - टूटा हुआ लिंक ठीक किया गया

यदि आपको कोई लिंक टूटा हुआ मिले, या कोई महत्वपूर्ण चीज़ गलत वर्तनी में हो, तो कृपया दस्तावेज़ के footer पर जाएं (जो उसके GitHub पेज से लिंक करता है) और PR के माध्यम से बदलाव सुझाएं।

#### न्यूज़लेटर - नया संस्करण

हम ecosystem का साप्ताहिक न्यूज़लेटर तैयार करते हैं। यह जुड़ने का बहुत आसान तरीका है! न्यूज़लेटर हर शुक्रवार या शनिवार को भेजा जाता है। यदि आप न्यूज़लेटर लिखना चाहते हैं, तो उन्हें बताने के लिए Discord के #zecweekly सेक्शन में @squirrel को संदेश भेजें।

ऐसा करने के बाद, आप इस repository के [न्यूज़लेटर सेक्शन](https://github.com/ZecHub/zechub/blob/main/newsletter/newsletterbasics.md) में जाकर न्यूज़लेटर का नया संस्करण बनाने के लिए pull request सबमिट कर सकते हैं। कृपया इस [टेम्पलेट](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) में उपयोग किए गए प्रारूप का पालन करें।

ऐसा करने के बाद @squirrel या (Discord में) देखेंगे कि आपके न्यूज़लेटर का नया संस्करण उपलब्ध है, और वे उसकी समीक्षा करके उसे repository में मर्ज करेंगे। मर्ज होने के बाद, वे सामग्री लेंगे और उसे Substack के माध्यम से पोस्ट करेंगे।

#### न्यूज़लेटर - अनुवाद

वर्तमान में हमारे पास Spanish, Portuguese और Russian में संस्करण हैं। अनुवादित संस्करण उनके socials पर पोस्ट किए जाते हैं, और हम ZecHub social के माध्यम से उन्हें अधिक से अधिक लोगों तक पहुंचाने का प्रयास करते हैं।

यदि आप न्यूज़लेटर का अपनी स्थानीय भाषा में अनुवाद करना चाहते हैं, तो हमें बताएं कि आप इसे किस चैनल से साझा करेंगे और न्यूज़लेटर किस भाषा में प्रकाशित करेंगे, ताकि हम इसके प्रकाशन का समन्वय कर सकें।

#### पॉडकास्ट - ZecHub socials पर एपिसोड पोस्ट किया गया

क्या आपके पास किसी news show, podcast, Twitter talk, या किसी अन्य वीडियो/ऑडियो चीज़ का विचार है? हमें Discord #video-content में बताएं और हम बात करेंगे।

इस प्रकार की सामग्री के लिए पुरस्कार कुछ बड़े होते हैं, इसलिए खर्च को स्वीकृत करने से पहले ZecHub के DAO को एक प्रस्ताव प्रस्तुत करना होगा।

#### रचनात्मक सोशल मीडिया पोस्ट

हम अपने सोशल मीडिया के लिए नई आकर्षक सामग्री चाहते हैं। छोटे वीडियो, GIFs, memes और अन्य रचनात्मक पोस्ट तब स्वीकार किए जाते हैं जब वे [ZecHub स्टाइल गाइड](https://zechub.wiki/contribute/style-guide) के अनुरूप हों। पुरस्कार राशि [बाउंटी राशि नीति](https://bounties.zechub.wiki/docs/bounty-amounts) के अनुसार होती है।

आप हमारे न्यूज़लेटर और पॉडकास्ट के लिए thumbnails भी डिज़ाइन कर सकते हैं। यदि आपके पास डिज़ाइन प्रतिभा है, तो Discord पर #design में हमें संदेश भेजें।

#### अन्य विचार? हमें बताएं!

कोई और सुझाव है? Discord पर #general में हमें बताएं। हम उस पर चर्चा कर सकते हैं और देख सकते हैं कि ZecHub का DAO उसका समर्थन करेगा या नहीं।

### समाप्त करने के लिए

कृपया उद्योग के सबसे सम्मानित protocols में से एक में योगदान देना शुरू करने में संकोच न करें। यह Zcash से जुड़ने का एक शानदार तरीका है। यदि आपके पास योगदान के बारे में कोई प्रश्न हैं, तो कृपया हमें [Discord](#join-the-conversation) पर बताएं।

धन्यवाद!

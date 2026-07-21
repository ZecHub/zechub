<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>

# ZecHub में योगदान

ZecHub लोगों को Zcash के बारे में सीखने में मदद करता है। यदि आप यह पेज पढ़ रहे हैं, तो हमें सचमुच बहुत खुशी है कि आप योगदान देने पर विचार कर रहे हैं! आपका कोई भी योगदान [zechub.wiki](https://www.zechub.wiki/) और ZecHub के अन्य सोशल मीडिया पर प्रदर्शित होगा।

### नए योगदानकर्ता

ZecHub का एक अवलोकन पाने के लिए, [README](https://github.com/ZecHub/zechub/blob/main/README.md) पढ़ें.


### शुरुआत करना

ZecHub सामुदायिक योगदान को प्रबंधित करने के लिए GitHub का उपयोग करता है। यदि आप GitHub में नए हैं, तो चिंता की कोई बात नहीं! हम यह समझाने जा रहे हैं कि आप ZecHub के सामुदायिक योगदानकर्ता के रूप में कैसे शामिल हो सकते हैं। स्वीकृत योगदान के लिए हम ZEC में टिप्स देते हैं। इस गाइड में आपको योगदान कार्यप्रवाह का एक अवलोकन मिलेगा, जिसमें issue खोलने, pull request (PR) बनाने, समीक्षा करने, और PR को merge करने तक की प्रक्रिया शामिल है।


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="ZecHub में योगदान कैसे करें!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### बातचीत में शामिल हों

सबसे पहले, हमारे [community links](https://zechub.wiki/zcash-community/community-links) में बातचीत में शामिल हों।

### शैली मार्गदर्शिकाएँ

ZecHub में कोई भी योगदान [ZecHub style guides](https://github.com/ZecHub/zechub/blob/main/styles/guide.md) का पालन करना चाहिए। इसमें wiki, docs और social media सामग्री शामिल हैं।

### आप किन-किन तरीकों से योगदान कर सकते हैं

ZecHub एक समुदाय-प्रेरित परियोजना है जिसका उद्देश्य Zcash उपयोगकर्ताओं और डेवलपर्स के लिए सहायता और संसाधन उपलब्ध कराना है। ZecHub के साथ जुड़ने के कई तरीके हैं, जिनमें हमारे साप्ताहिक newsletter के लिए लिखना, हमारे knowledge base में योगदान देना, या development projects में मदद करना शामिल है।

ये वे प्रकार के योगदान हैं जिन्हें ZecHub वर्तमान में स्वीकार करता है:

#### Dev Work - प्रति स्वीकृत PR 0.12 से 0.5 ZEC तक

कोई भी स्वीकृत dev work जो Zcash ecosystem के निर्माण में मदद करे। इसमें हमारी wiki, नए wallets, या कोई भी application शामिल हो सकता है जिसकी आप कल्पना कर सकते हैं।

#### Zcash Tutorials (video) - प्रति tutorial 0.15 ZEC तक

नीचे एक उदाहरण tutorial दिया गया है:


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

Zcash apps पर tutorials बनाइए और साझा कीजिए तथा पुरस्कार पाइए। zechub/tutorials में PR submit करें या Discord के #video-content channel में वीडियो भेजें। यदि वीडियो हमारे मानदंडों पर खरा उतरता है, तो हम उसे पोस्ट करेंगे और आपको tip देंगे।

#### ZecHub Wiki - प्रकाशित प्रत्येक नए wiki page के लिए 0.08 ZEC तक

हमारी wiki site आसान और सुगम प्रारूप में Zcash शैक्षणिक सामग्री प्रदान करती है। Zcash एक बहुत उन्नत तकनीक है जिसकी एक जीवंत community है, इसलिए अभी भी बहुत-सा documentation है जिसे हमें बनाना है। हमारा लक्ष्य इन विषयों पर documentation तैयार करना है:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

ये काफी व्यापक क्षेत्र हैं, इसलिए काम करने के लिए बहुत कुछ है। यदि आपको कुछ प्रेरणा चाहिए, तो हमारी वर्तमान [wiki-docs site](https://zechub.wiki/) देखें और देखें कि क्या कमी है। जब आप तय कर लें कि आप क्या लिखना चाहते हैं, तो अपने बदलाव करना शुरू करें और सीखें कि ZecHub repo में PR कैसे submit करना है। हमारे सभी docs इसी repo में बनाए और संधारित किए जाते हैं। [docs template](https://github.com/ZecHub/zechub/blob/main/template.md) का उपयोग करें और wiki page लिखते समय [ZecHub style](https://zechub.wiki/contribute/style-guide) का पालन करें। PR submit करने के बाद, कृपया discord के #zechub section में @dismad, @squirrel, या @vito को संदेश भेजें, और वे आपके PR की समीक्षा करेंगे तथा यदि वह site में जोड़ने के लिए तैयार होगा तो उसे merge करेंगे। यदि merge हो जाता है, तो वे doc को ZecHub website में जोड़ देंगे। यदि doc तैयार नहीं है, तो वे PR में आपके लिए edits सुझाएँगे।

#### ZecHub Wiki - docs में प्रत्येक स्वीकृत edit के लिए 0.015 ZEC

कभी-कभी हमारे docs में दी गई जानकारी बिल्कुल सटीक नहीं होती। यह ठीक है। यही कारण है कि हम उन्हें open-source करते हैं! यदि आपको किसी wiki-doc में कुछ बदलने की ज़रूरत दिखे, तो कृपया doc के footer पर जाएँ (जो उसके Github page से लिंक करता है) और PR के माध्यम से बदलाव सुझाएँ।

#### ZecHub Wiki - ठीक की गई प्रत्येक broken link के लिए 0.005 ZEC

यदि आपको कोई link टूटा हुआ मिले, या कोई महत्वपूर्ण चीज़ गलत लिखी हुई हो, तो कृपया doc के footer पर जाएँ (जो उसके Github page से लिंक करता है) और PR के माध्यम से बदलाव सुझाएँ।

#### Newsletter - प्रति edition 0.05 ZEC

हम ecosystem का साप्ताहिक newsletter तैयार करते हैं। यह शामिल होने का एक बहुत आसान / कम-मेहनत वाला तरीका है! newsletter हर शुक्रवार या शनिवार को जारी होता है। यदि आप newsletter लिखना चाहते हैं, तो Discord के #zecweekly section में @squirrel को संदेश भेजकर उन्हें बताइए।

इसके बाद, आप [इस repository के newsletter section](/newsletter/newsletterbasics.md) में जा सकते हैं और newsletter का नया edition बनाने के लिए एक pull request submit कर सकते हैं। कृपया इस [template](/newsletter/newslettertemplate.md) में उपयोग किए गए format का पालन करें।

इसके बाद @squirrel या (Discord में) देखेंगे कि newsletter का आपका नया edition उपलब्ध है, और वे उसकी समीक्षा करके उसे repository में merge कर देंगे। merge होने के बाद, वे सामग्री लेकर उसे Substack के माध्यम से पोस्ट करेंगे।


#### Podcast - ZecHub socials पर पोस्ट किए गए प्रति episode .25 ZEC

क्या आपके पास किसी news show, podcast, Twitter talk, या किसी अन्य video/audio सामग्री का विचार है? हमें Discord #video-content में बताइए और हम बात करेंगे।

इस प्रकार की सामग्री के लिए पुरस्कार थोड़े बड़े होते हैं, इसलिए खर्च को स्वीकृत करने से पहले प्रस्ताव को ZecHub के DAO के समक्ष submit करना होगा।


#### अन्य विचार? हमें बताइए!

क्या आपके पास कोई और सुझाव है? हमें Discord पर #general में बताइए। हम इस पर चर्चा कर सकते हैं और देख सकते हैं कि क्या ZecHub का DAO इसका समर्थन करेगा।

### समाप्त करने के लिए

कृपया उद्योग के सबसे सम्मानित protocols में से एक में योगदान शुरू करने में बिल्कुल संकोच न करें। यह Zcash के साथ जुड़ने का एक शानदार तरीका है। यदि आपके पास योगदान के बारे में कोई प्रश्न हैं, तो कृपया हमें [Discord](#join-the-conversation) पर बताइए।

धन्यवाद!

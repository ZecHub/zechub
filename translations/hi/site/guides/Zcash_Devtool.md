# Zcash Devtool

[Zcash-Devtool क्या है?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

Zcash Devtool, Zcash पर hacking करने के लिए एक platform है। इसे developers द्वारा, developers के लिए, नई Zcash functionality के testing और development के लिए बनाया गया है; और इसे production-ready नहीं माना जाना चाहिए। यह tool जो command line API उपलब्ध कराता है, वह किसी भी समय और बिना किसी चेतावनी के बदल सकता है और बदलेगा। zcash-devtool embedded wallet के प्रबंधन में महत्वपूर्ण धनराशि बिल्कुल भी commit न करें।

### Zcash Devtool का वीडियो tutorial:
Kris Nuttycombe (@nuttycom) ने इस tool को ZconVI के दौरान प्रस्तुत किया था।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

इन tools का उपयोग शुरू करने के लिए चरण-दर-चरण मार्गदर्शिका हेतु, [इस walkthrough को देखें](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md)। इसमें zcash devtool tooling को सेट अप और उपयोग करने की पूरी walkthrough दी गई है। इसका उद्देश्य यह बताना है कि setup कैसे करें और tool में अपनी स्वयं की functionality कैसे जोड़ें।


**सुरक्षा चेतावनियाँ:**
इसे PRODUCTION में उपयोग न करें!!!
इस app को security को ध्यान में रखकर नहीं लिखा गया है। हालांकि, इसमें mnemonic seed phrases के encryption जैसी सुविधाएँ हैं, जो इसे छोटे पैमाने पर प्रयोग के लिए उपयोगी बना सकती हैं, लेकिन यह पूरी तरह आपके अपने जोखिम पर है।

### उन्नत (librustzcash tutorial )


[वीडियो यहाँ देखें](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)

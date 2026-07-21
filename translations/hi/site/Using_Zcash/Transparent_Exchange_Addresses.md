# Zcash TEX पते क्या हैं?

Zcash TEX पते प्राप्ति पते का एक विशिष्ट प्रकार दर्शाते हैं। "Transparent Exchange" पते का संक्षिप्त रूप, यह एक **अद्वितीय**, Unified-type (bech32m) encoding है, जो एक single p2pkh Transparent पते की होती है। 

इसका एकमात्र उद्देश्य किसी compatible wallet को यह बताना है कि वह एक Transparent-Only (T -> T) transaction करे। 

इसका तर्क इस प्रकार है: TEX पता पहचानने पर, एक compatible wallet उसे decode करके उसमें मौजूद Transparent receiver प्राप्त करता है। इसके बाद wallet tx के लिए आवश्यक funds को Shielded pool से एक अलग, user-controlled, ephemeral Transparent पते पर भेजता है (Z -> T)। फिर वह उन funds को TEX पते से decode किए गए Transparent receiver पर भेजता है (T -> T)।  

TEX पतों के लिए technical proposal Zcash [ZIP 320](https://zips.z.cash/zip-0320) में दिया गया है, जो एक ऐसा address type परिभाषित करता है जो विशेष रूप से Transparent Addresses से funds प्राप्त करने के लिए है।

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


हालाँकि TEX पते अभी व्यापक रूप से अपनाए नहीं गए हैं, Zcash उपयोगकर्ताओं को अंततः उनका उपयोग करना पड़ सकता है।

## मुझे TEX पते की आवश्यकता कब होती है

### आपको TEX पते की **आवश्यकता** तब होती है जब आप किसी ऐसे wallet का उपयोग करके किसी Transparent पते पर funds भेज रहे हों जो सीधे Transparent पते पर भेजने का समर्थन नहीं करता। 
कुछ wallets सीधे Transparent पते पर भेजने की अनुमति ही नहीं देते और **recipient TEX का समकक्ष पता उपलब्ध नहीं करा सकता**। इसलिए, कभी-कभी Transparent पते को TEX पते में **convert** करना आवश्यक हो सकता है। यह zip-320 में वर्णित reference implementation चलाकर manually किया जा सकता है। **Transparent-to-TEX-Converter** का एक hosted instance [यहाँ](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/) पाया जा सकता है।

### आपको TEX पते की आवश्यकता तब होती है जब आप किसी centralized exchange को funds भेज रहे हों जो **यह REQUIRE करता हो कि वे funds किसी Transparent source से आए हों**। 
वर्तमान में, [Binance](https://www.binance.com/) ही एकमात्र Centralized Exchange है जो TEX पतों का उपयोग करता है (और TEX बनने का मुख्य कारण भी वही है)। 
TEX पते किसी compatible wallet को बताते हैं कि उस पते पर भेजे गए सभी funds transparent होने चाहिए और कोई भी shielded value उस पते पर भेजी नहीं जानी चाहिए।
यदि Binance जैसा कोई exchange भेजी गई value को अस्वीकार कर देता है, तो उसके पास उस value को उसी पते पर वापस भेजने के आवश्यक साधन होते हैं जहाँ से वह आई थी। यह Binance जैसी संस्थाओं को सरकारों या अन्य प्राधिकरणों द्वारा लगाए गए कानूनों और विनियमों का पालन करने में भी मदद करता है।


## कौन-कौन से wallets TEX Addresses का समर्थन करते हैं?

आप हमारी [wallets](https://zechub.wiki/wallets) page पर सबसे अद्यतन सूची देख सकते हैं। **TEX Address Filter** का उपयोग करें।

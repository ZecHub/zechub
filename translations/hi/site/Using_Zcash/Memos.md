<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# मेमो

#### एन्क्रिप्टेड मेमो भेजना

जब आप एक Z2Z (shielded-to-shielded) ट्रांज़ैक्शन भेजते हैं, तो आप उस ट्रांज़ैक्शन में एक मेमो (संदेश) शामिल कर सकते हैं। इस मेमो का उपयोग कई अलग-अलग कामों के लिए किया जा सकता है।

#### ट्रांज़ैक्शन पर हस्ताक्षर करना

मेमो का मुख्य उपयोग भुगतानों पर हस्ताक्षर करने के लिए किया जाता है। क्योंकि shielded ट्रांज़ैक्शन आपके डेटा को एन्क्रिप्ट कर देते हैं, आप यह नहीं देख पाते कि आपको ZEC किसने भेजा, और वह ZEC किस लिए भेजा गया होगा। उपयोगकर्ता मेमो फ़ील्ड का उपयोग करके अपना नाम या उपनाम लिख सकते हैं, ताकि सामने वाले को पता चल सके कि ट्रांज़ैक्शन किसकी ओर से था। वे यह भी बता सकते हैं कि ट्रांज़ैक्शन किसलिए था।

#### एक संदेश भेजना

एन्क्रिप्टेड मेमो का एक और उपयोग यह है कि किसी z-addr वाले व्यक्ति को संदेश भेजा जाए। ये संदेश किसी भी विषय पर हो सकते हैं, चाहे वह [किसी दोस्त के लिए एक याद दिलाने वाला संदेश](https://twitter.com/iansagstette/status/1542142468505870336) हो, या [ऐसा संवेदनशील संदेश जिसे यथासंभव निजी रखना ज़रूरी हो](https://twitter.com/InsideZcash/status/1545800146352578560)।

#### blockchain पर प्रेम-पत्र

एक व्यक्ति ने Zcash blockchain के शुरुआती ब्लॉकों में से एक में अपने साथी को एक प्रेम-पत्र भेजा था। किसी को पता चला कि उनके साथी ने उन्हें Zcash मेमो के माध्यम से एक फ़ाइल भेजी थी। यह फ़ाइल विदेश में होने वाले एक विशेष कार्यक्रम का टिकट थी, जिसके बारे में वह और उनका दूर रहने वाला प्रेमी साथ जाने की बात कर रहे थे। वह मेमो एक प्रेम-पत्र था।

#### उन्नत

> **ऐतिहासिक। यह डेमो अब लिखे अनुसार नहीं चलता।**
>
> नीचे दिया गया डेमो zcashd का उपयोग करता है, और इसकी [प्राप्ति स्क्रिप्ट](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) `zcash-cli` के माध्यम से मेमो पढ़ती है। zcashd 18 जुलाई 2026 को अपने स्वचालित End-of-Support रुकाव पर पहुँच गया था, इसलिए यह स्क्रिप्ट किसी चालू नोड तक नहीं पहुँच सकती, और इसे पोर्ट नहीं किया गया है।
>
> कमांड लाइन से शील्डेड मेमो पढ़ना Zallet पर अब भी काम करता है: `zallet rpc z_listunspent` हर प्राप्त शील्डेड नोट को उसी `memoStr` फ़ील्ड के साथ लौटाता है जिसे स्क्रिप्ट पढ़ती है। कमांड के लिए [Zallet क्विक रेफ़रेंस गाइड](/using-zcash/zallet-quick-reference-guide) देखें, और किसी नोड को zcashd से हटाने के लिए [Zebra और Zallet पर माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें। Zallet अभी बीटा में है।
>
> यह अनुभाग Magic-Wormhole डेमो के ऐतिहासिक रिकॉर्ड के रूप में रखा गया है।

यहाँ बताया गया है कि Magic-Wormhole CLI और zcashd के साथ Zcash Shielded Memos का उपयोग करके एक कंप्यूटर से दूसरे कंप्यूटर तक फ़ाइलों को सुरक्षित रूप से कैसे भेजें!: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

#### संसाधन

[एन्क्रिप्टेड मेमो फ़ील्ड](https://electriccoin.co/blog/encrypted-memo-field/)

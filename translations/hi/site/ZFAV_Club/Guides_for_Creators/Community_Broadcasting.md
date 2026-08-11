---
<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# VDO.Ninja और OBS Studio का उपयोग करके सामुदायिक प्रसारण

यह छोटा ट्यूटोरियल [DWeb Camp 2023](https://dwebcamp.org/) के दौरान साथियों और स्वयंसेवकों के एक समूह द्वारा बनाया गया था। इस अभ्यास का उद्देश्य सहयोगात्मक वीडियो रिकॉर्डिंग और स्ट्रीमिंग के लिए offline MESH network से जुड़े smart phone डिवाइसों के उपयोग का लाभ उठाना है।

हम दो open source software का उपयोग करते हैं: [OBS Studio (Open Broadcaster software)](https://obsproject.com/) और [VDO.Ninja](https://vdo.ninja/)। इन software को डाउनलोड करके आपके कंप्यूटर पर locally चलाया जा सकता है।

## OBS Studio (Open Boardcaster software)

OBS Studio रिकॉर्डिंग और live streaming के लिए Free और Open source software है, जो कई operating systems पर उपलब्ध है। यह software पहली बार 2012 में जारी किया गया था और game streaming community तथा स्वतंत्र video content creators के बीच इसका काफी बड़ा अनुसरण है।

OBS Studio का user interface पहली बार उपयोग करने वालों को काफी जटिल लग सकता है। OBS studio दो windows में विभाजित है: "Preview" और "Broadcast"। Preview window उपलब्ध videos (विभिन्न cameras जैसे webcam, Iriun Webcam, OBS Virtual Camera, Video और Browser source) को दिखाती है, जिन्हें "Scenes" कहा जाता है, और "Broadcast" live stream दिखाता है।

VDO.ninja से remote camera stream को OBS Studio में stream करने के लिए, आप "Sources > Add > Browser" के माध्यम से एक नया "Browser Source" जोड़कर शुरुआत करते हैं। नई window में, आप VDO.Ninja से source URL दे सकते हैं और "Make source visible" चुन सकते हैं।

अब आप remote streams का प्रसारण शुरू कर सकते हैं।

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) एक Free और open source web application है, जो आपको अपने mobile devices को live streaming camera में बदलने की अनुमति देता है। इस software को डाउनलोड करके आपके local computer पर deploy किया जा सकता है या आप सीधे [online version at https://vdo.ninja](https://vdo.ninja/) का उपयोग कर सकते हैं।

VOD.Ninja का interface सरल है, बस अपने mobile device के web browser में VDO.Ninja खोलें और "Add your camera to OBS" चुनें। फिर आप devices की सूची से अपना camera और audio device चुनेंगे और "Start" पर क्लिक करेंगे। इसके बाद आपको एक "view" link मिलेगा, जिसे OBS Studio में जोड़ा जा सकता है।

## VDO.Ninja के साथ एक community call को direct करना

शुरुआत अपने desktop/laptop पर web browser में [VDO.ninja](http://VDO.ninja) पर जाकर करें।

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


एक नया room बनाने और अपनी community call livestream को direct करने के लिए, Create a Room पर क्लिक करें।

अगली स्क्रीन आपसे अपना room setup करने के लिए बुनियादी जानकारी मांगेगी।

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

एक बार room बन जाने के बाद, director के पास अगली स्क्रीन पर उपलब्ध कई control options होते हैं।

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


जब लोग आपके room में शामिल होते हैं, तब आप, director, उनके video और audio के साथ सभी source options और controls को दिखाई देते हुए देखेंगे।

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## अक्सर पूछे जाने वाले प्रश्न

- OBS Studio के लिए किस प्रकार के video graphic cards आवश्यक हैं?

आप एक अच्छे graphic card और काफी memory वाले personal computer का उपयोग कर सकते हैं, या वैकल्पिक रूप से hardware encoders [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE) का उपयोग कर सकते हैं।
- क्या OBS आपको live translation और captioning करने की अनुमति देता है?

कुछ community-contributed plugins हैं जो ऐसा feature प्रदान करते प्रतीत होते हैं। [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- क्या आप OBS Studio के लिए अपने स्वयं के plugins विकसित कर सकते हैं?

हाँ, OBS lua, python scripting का समर्थन करता है। साथ ही Overlays और webviews के लिए JavaScript भी।

- क्या हम live fade to black या transitions का उपयोग करते हैं?

यह आप पर निर्भर है, producer!

- जब आप streaming कर रहे होते हैं, तो क्या latency होती है?

यह मुख्य रूप से उस destination पर निर्भर करता है जहाँ आप streaming कर रहे हैं। उदाहरण के लिए, YouTube पर एक मिनट या उससे अधिक की देरी हो सकती है, क्योंकि broadcast होने से पहले उनके servers पर video processing की जाती है।

- धीमी मशीन पर OBS का उपयोग करते समय और green-screening करते समय audio drop हो जाता है

Hardware encoder का उपयोग करें या stream yard का उपयोग करें
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) या [RiverSide.FM](http://riverside.fm/)

## श्रेय

- Ryan
- Ajay
- Arky

## संसाधन

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: media और digital event community
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)

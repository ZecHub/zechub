<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# VDO.Ninja और OBS Studio के साथ सामुदायिक प्रसारण (Community Broadcasting)

यह छोटा ट्यूटोरियल [DWeb Camp 2023](https://dwebcamp.org/) के दौरान फ़ेलो और स्वयंसेवकों के एक समूह ने बनाया था। इस अभ्यास का उद्देश्य ऑफ़लाइन MESH नेटवर्क से जुड़े स्मार्टफ़ोन डिवाइसों का उपयोग करके मिलकर वीडियो रिकॉर्डिंग और स्ट्रीमिंग करना है।

हम दो ओपन सोर्स सॉफ़्टवेयर (open source software) का उपयोग करते हैं: [OBS Studio (Open Broadcaster Software)](https://obsproject.com/) और [VDO.Ninja](https://vdo.ninja/)। इन सॉफ़्टवेयर को डाउनलोड करके आप अपने कंप्यूटर पर लोकल रूप से चला सकते हैं।

## OBS Studio (Open Broadcaster Software)

OBS Studio रिकॉर्डिंग और लाइव स्ट्रीमिंग (live streaming) के लिए एक मुफ़्त और ओपन सोर्स सॉफ़्टवेयर है, जो कई ऑपरेटिंग सिस्टम के लिए उपलब्ध है। यह सॉफ़्टवेयर पहली बार 2012 में जारी किया गया था और गेम स्ट्रीमिंग समुदाय तथा स्वतंत्र वीडियो कंटेंट क्रिएटर के बीच यह काफ़ी लोकप्रिय है।

पहली बार उपयोग करने वालों को OBS Studio का यूज़र इंटरफ़ेस काफ़ी जटिल लग सकता है। OBS Studio दो विंडो में बँटा है: “Preview” और “Broadcast”। Preview विंडो उपलब्ध वीडियो (विभिन्न कैमरे, जैसे वेबकैम, Iriun Webcam, OBS Virtual Camera, Video और Browser source) दिखाती है, जिन्हें “Scenes” कहा जाता है, और “Broadcast” लाइव स्ट्रीम दिखाती है।

VDO.Ninja से किसी रिमोट कैमरा स्ट्रीम को OBS Studio में स्ट्रीम करने के लिए, सबसे पहले “Sources > Add > Browser” के माध्यम से एक नया “Browser Source” जोड़ें। नई विंडो में आप VDO.Ninja से मिला सोर्स URL दर्ज कर सकते हैं और “Make source visible” चुन सकते हैं।

अब आप रिमोट स्ट्रीम का प्रसारण शुरू कर सकते हैं।

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) एक मुफ़्त और ओपन सोर्स वेब एप्लिकेशन है, जिससे आप अपने मोबाइल डिवाइस को लाइव स्ट्रीमिंग कैमरे में बदल सकते हैं। इस सॉफ़्टवेयर को डाउनलोड करके अपने लोकल कंप्यूटर पर डिप्लॉय किया जा सकता है, या आप सीधे [ऑनलाइन संस्करण https://vdo.ninja](https://vdo.ninja/). का उपयोग कर सकते हैं।

VDO.Ninja का इंटरफ़ेस सरल है: बस अपने मोबाइल डिवाइस के वेब ब्राउज़र में VDO.Ninja खोलें और “Add your camera to OBS” चुनें। इसके बाद डिवाइस की सूची से अपना कैमरा और ऑडियो डिवाइस चुनें और “Start” पर क्लिक करें। फिर आपको एक “view” लिंक मिलेगा, जिसे आप OBS Studio में जोड़ सकते हैं।

## VDO.Ninja के साथ सामुदायिक कॉल का संचालन

डेस्कटॉप/लैपटॉप पर अपने वेब ब्राउज़र से [VDO.ninja](http://VDO.ninja) पर जाकर शुरुआत करें।

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


नया रूम बनाने और अपनी सामुदायिक कॉल की लाइवस्ट्रीम का संचालन करने के लिए, Create a Room पर क्लिक करें।

अगली स्क्रीन आपसे रूम सेट अप करने के लिए बुनियादी जानकारी माँगेगी।

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

रूम बन जाने के बाद, अगली स्क्रीन पर डायरेक्टर के पास नियंत्रण के कई विकल्प उपलब्ध होते हैं।

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


जब लोग आपके रूम में शामिल होंगे, तब आपको, यानी डायरेक्टर को, उनके वीडियो और ऑडियो के साथ सभी सोर्स विकल्प और नियंत्रण दिखाई देंगे।

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## अक्सर पूछे जाने वाले प्रश्न (FAQ)

- OBS Studio के लिए किस प्रकार के वीडियो ग्राफ़िक कार्ड आवश्यक हैं?

आप अच्छे ग्राफ़िक कार्ड और पर्याप्त मेमोरी वाले पर्सनल कंप्यूटर का उपयोग कर सकते हैं, या विकल्प के रूप में [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE) जैसे हार्डवेयर एनकोडर का उपयोग कर सकते हैं।
- क्या OBS लाइव अनुवाद और कैप्शनिंग की सुविधा देता है?

समुदाय द्वारा बनाए गए कुछ प्लगइन ऐसी सुविधा प्रदान करते प्रतीत होते हैं। [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- क्या आप OBS Studio के लिए अपने स्वयं के प्लगइन विकसित कर सकते हैं?

हाँ, OBS में Lua और Python स्क्रिप्टिंग का समर्थन है। इसके अलावा ओवरले और वेबव्यू के लिए JavaScript भी है।

- क्या हम लाइव फ़ेड टू ब्लैक या ट्रांज़िशन का उपयोग करते हैं?

यह आप पर, यानी प्रोड्यूसर पर, निर्भर है!

- क्या स्ट्रीमिंग करते समय लेटेंसी होती है?

यह मुख्य रूप से इस पर निर्भर करता है कि आप किस गंतव्य पर स्ट्रीम कर रहे हैं। उदाहरण के लिए, YouTube में एक मिनट या उससे अधिक की देरी हो सकती है, क्योंकि प्रसारण से पहले उनके सर्वर पर वीडियो प्रोसेसिंग की जाती है।

- धीमी मशीन पर OBS का उपयोग करते समय और ग्रीन-स्क्रीनिंग करते समय ऑडियो कट जाता है

हार्डवेयर एनकोडर का उपयोग करें, या StreamYard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) या [RiverSide.FM](http://riverside.fm/) का उपयोग करें।

## आभार

- Ryan
- Ajay
- Arky

## संसाधन

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: मीडिया और डिजिटल इवेंट समुदाय
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)

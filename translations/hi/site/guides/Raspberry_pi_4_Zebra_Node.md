<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra चलाने के लिए Raspberry Pi 4 गाइड

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Raspberry Pi 4 पर Zebra नोड सॉफ़्टवेयर चलाकर आप Zcash नेटवर्क में एक स्वतंत्र, कंसेंसस-संगत (consensus-compatible) नोड (node) के रूप में भाग ले सकते हैं। यह गाइड आपको अपने Raspberry Pi 4 पर Zebra को सेट अप करने और चलाने के चरण बताएगी।

## पूर्वापेक्षाएँ

1. Raspberry Pi 4 (2GB RAM या उससे अधिक की अनुशंसा की जाती है)।

2. MicroSD कार्ड (16GB या उससे अधिक की अनुशंसा की जाती है), जिस पर Raspberry Pi OS (Raspbian) इंस्टॉल हो।

3. स्थिर इंटरनेट कनेक्शन।

4. कीबोर्ड, माउस और एक मॉनिटर (प्रारंभिक सेटअप के लिए)।

5. SSH क्लाइंट (वैकल्पिक, रिमोट एक्सेस के लिए)।

## इंस्टॉलेशन

1. __अपने सिस्टम का अपडेट__
   एक टर्मिनल खोलें या अपने Raspberry Pi में SSH के माध्यम से लॉग इन करें और निम्नलिखित कमांड चलाकर सुनिश्चित करें कि आपका सिस्टम अप टू डेट है:

   __sudo apt update__

   __sudo apt upgrade__

2. __डिपेंडेंसी का इंस्टॉलेशन__
   Zebra को बिल्ड करने और चलाने के लिए आपको कुछ आवश्यक डिपेंडेंसी (dependencies) इंस्टॉल करनी होंगी:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Zebra रिपॉज़िटरी का क्लोन__
   एक टर्मिनल खोलें और Zebra रिपॉज़िटरी (repository) को अपने Raspberry Pi पर क्लोन करें:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebra का बिल्ड__
   Zebra को बिल्ड करने के लिए निम्नलिखित कमांड का उपयोग करें:

   __cargo build --release__

   इस प्रक्रिया में कुछ समय लग सकता है। सुनिश्चित करें कि आपका Raspberry Pi पर्याप्त रूप से ठंडा रहे, क्योंकि कंपाइलिंग से गर्मी उत्पन्न हो सकती है।

5. __कॉन्फ़िगरेशन__
   Zebra के लिए एक कॉन्फ़िगरेशन फ़ाइल बनाएँ। आप शुरुआती बिंदु के रूप में डिफ़ॉल्ट कॉन्फ़िगरेशन का उपयोग कर सकते हैं:

   __cp zcash.conf.example zcash.conf__

   अपने नोड की सेटिंग्स को अनुकूलित करने के लिए zcash.conf फ़ाइल को संपादित करें। आप नेटवर्क निर्दिष्ट कर सकते हैं, माइनिंग (mining) सक्षम कर सकते हैं, पीयर कनेक्शन सेट अप कर सकते हैं, और भी बहुत कुछ।

6. __Zebra की शुरुआत__
   अब आप अपने कस्टम कॉन्फ़िगरेशन के साथ Zebra शुरू कर सकते हैं:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   यह कमांड Zebra नोड को शुरू करेगी, और यह Zcash ब्लॉकचेन (blockchain) के साथ सिंक होना शुरू कर देगा।

7. __मॉनिटरिंग__
   आप एक वेब ब्राउज़र खोलकर और __http://127.0.0.1:8233/status__. पर जाकर अपने Zebra नोड की प्रगति और स्थिति की निगरानी कर सकते हैं

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## समस्या निवारण

यदि Zebra को बिल्ड करने या चलाने में आपको कोई समस्या आती है, तो समस्या निवारण के सुझावों और अतिरिक्त जानकारी के लिए [Zebra दस्तावेज़ीकरण](https://zebra.zfnd.org/user/troubleshooting.html) देखें।

अपने Raspberry Pi को ठंडा रखना सुनिश्चित करें, क्योंकि नोड चलाने से गर्मी उत्पन्न हो सकती है। आप पंखे या हीट सिंक जैसे किसी कूलिंग समाधान का उपयोग कर सकते हैं।

## निष्कर्ष

इस गाइड का पालन करके आपने अपने Raspberry Pi 4 पर Zebra को सफलतापूर्वक सेट अप कर लिया होगा और चला लिया होगा। अब आप एक स्वतंत्र नोड के रूप में Zcash नेटवर्क में योगदान दे रहे हैं और Zcash लेनदेन (transactions) की गोपनीयता (privacy) को सुरक्षित करने में मदद कर रहे हैं।

<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Zebra चलाने के लिए Raspberry Pi 4 गाइड

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Raspberry Pi 4 पर Zebra node software चलाने से आप Zcash network में एक स्वतंत्र, consensus-compatible node के रूप में भाग ले सकते हैं। यह गाइड आपको अपने Raspberry Pi 4 पर Zebra को सेट अप और चलाने के चरणों से परिचित कराएगी।

## पूर्वापेक्षाएँ

1. Raspberry Pi 4 (2GB RAM या उससे अधिक की अनुशंसा की जाती है)।

2. MicroSD card (16GB या उससे अधिक की अनुशंसा की जाती है) जिसमें Raspberry Pi OS (Raspbian) इंस्टॉल हो।

3. स्थिर इंटरनेट कनेक्शन।

4. Keyboard, mouse, और एक monitor (प्रारंभिक सेटअप के लिए)।

5. SSH client (वैकल्पिक, remote access के लिए)।

## इंस्टॉलेशन

1. __अपने सिस्टम को अपडेट करें__  
   एक terminal खोलें या SSH के माध्यम से अपने Raspberry Pi में लॉग इन करें और निम्न चलाकर सुनिश्चित करें कि आपका सिस्टम अद्यतन है:

   __sudo apt update__

   __sudo apt upgrade__

2. __Dependencies इंस्टॉल करें__  
   Zebra को build और run करने के लिए आपको कुछ आवश्यक dependencies इंस्टॉल करनी होंगी:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Zebra repository को clone करें__  
   एक terminal खोलें और Zebra repository को अपने Raspberry Pi पर clone करें:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebra को build करें__  
   Zebra को build करने के लिए निम्न commands का उपयोग करें:

   __cargo build --release__

   इस प्रक्रिया में कुछ समय लग सकता है। सुनिश्चित करें कि आपका Raspberry Pi पर्याप्त रूप से ठंडा रहे, क्योंकि compilation के दौरान गर्मी उत्पन्न हो सकती है।

5. __Configuration__  
   Zebra के लिए एक configuration file बनाएँ। शुरुआत के लिए आप default configuration का उपयोग कर सकते हैं:

   __cp zcash.conf.example zcash.conf__

   अपने node की settings को अनुकूलित करने के लिए zcash.conf file को संपादित करें। आप network निर्दिष्ट कर सकते हैं, mining सक्षम कर सकते हैं, peer connections सेट कर सकते हैं, और बहुत कुछ।

6. __Zebra शुरू करें__  
   अब आप अपनी custom configuration के साथ Zebra शुरू कर सकते हैं:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   यह command Zebra node को शुरू करेगी, और यह Zcash blockchain के साथ sync होना शुरू कर देगा।

7. __Monitoring__  
   आप web browser खोलकर और __http://127.0.0.1:8233/status__ पर जाकर अपने Zebra node की प्रगति और स्थिति की निगरानी कर सकते हैं।

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## समस्या निवारण

यदि आपको Zebra को build या run करते समय कोई समस्या आती है, तो troubleshooting tips और अतिरिक्त जानकारी के लिए [Zebra दस्तावेज़ीकरण](https://doc.zebra.zfnd.org/docs/intro.html) देखें।

यह सुनिश्चित करें कि आपका Raspberry Pi ठंडा रहे, क्योंकि node चलाने से गर्मी उत्पन्न हो सकती है। आप cooling solution, जैसे fan या heat sink, का उपयोग करना चाह सकते हैं।

## निष्कर्ष

इस गाइड का पालन करके, आपने अपने Raspberry Pi 4 पर सफलतापूर्वक Zebra को सेट अप और run कर लिया होगा। अब आप एक स्वतंत्र node के रूप में Zcash network में योगदान दे रहे हैं, जिससे Zcash transactions की गोपनीयता सुरक्षित रखने में मदद मिलती है।

# कार्यशाला दिवस 3



## डेटा विश्लेषण

* पैटर्न, रुझान, और अंतर्दृष्टि पहचानने के लिए विशेष प्रणालियों, टूल्स, और तकनीकों का उपयोग करके कच्चे डेटा का विश्लेषण करने का विज्ञान


इसमें शामिल है:
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* एन्क्रिप्टेड इलेक्ट्रॉनिक कैश। निजी peer-to-peer भुगतानों के लिए zero-knowledge encryption विकसित करने वाली पहली cryptocurrency।

नोट: यदि आप सटीक डेटा चाहते हैं जिस पर आप TRUST कर सकें, तो अपना स्वयं का full node [zebrad] चलाने की सिफारिश की जाती है। यदि आप एक पूर्ण और मज़बूत समाधान चाहते हैं, तो आप
z3 infrastructure [ zebrad + zainod/lightwalletd + "wallet of choice here" ] सेटअप कर सकते हैं। आप
डेटा को RPC's(Remote Procedure Calls) का उपयोग करके एक्सेस करते हैं।

यह कैसे काम करता है, इसका एक त्वरित प्रदर्शन देखने के लिए यह वीडियो देखें:


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## कार्यशाला डेमो

यह कार्यशाला wallet स्तर से डेटा एकत्र करने और रूपांतरित करने पर केंद्रित होगी। यही वह स्तर है जहाँ अधिकांश लोग
Zcash blockchain को एक्सेस करेंगे।


### उपयोग-प्रकरण (Zkool में किसी दिए गए अकाउंट की सभी transactions की एक .csv फ़ाइल बनाना)

यह एक लोकप्रिय परिदृश्य है जहाँ किसी को अपनी *digital* व्यक्तिगत वित्तीय जानकारी को व्यवस्थित और अनुकूलित करने की आवश्यकता होगी।

#### चरण 1

Zkool खोलें और वह अकाउंट चुनें जिसे आप उपयोग करना चाहते हैं

नोट: इस डेमो के लिए हम testnet wallet का उपयोग करेंगे।

नोट2: हम यहाँ Zkool चुन रहे हैं, लेकिन कोई भी wallet जिसमें export functionality हो, काम करेगा!

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### चरण 2


ऊपर दाईं ओर वाले मेन्यू में जाएँ और "Export Transactions" चुनें

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### चरण 3

उस bash script को डाउनलोड करें जिसका उपयोग हम अपने डेटा को रूपांतरित करने के लिए करेंगे। जो Developers देख रहे हैं, उनके लिए मैं bash का उपयोग करूँगा, जो
अधिकांश Linux Distros में standard होता है, लेकिन आप अपनी पसंद की भाषा का उपयोग कर सकते हैं। 

जो non-devs या छात्र अभी शुरुआत कर रहे हैं, वे AI का उपयोग करें! 

कुछ उदाहरण prompts जो आपको शुरुआत करने में मदद कर सकते हैं:

"मैं CSV फ़ाइलों को transform करने के लिए "bash/rust/python/ ... etc." का उपयोग कैसे कर सकता हूँ"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

नोट: आपको फिर भी मूल बातें समझनी होंगी, लेकिन इन कार्यशालाओं को चलाने से ही आप प्रक्रिया के FLOW को समझते हैं।

नोट2: AI आमतौर पर private नहीं होता, इसलिए छात्र के रूप में इसका उपयोग करते समय अतिरिक्त सावधानी रखें!

#### चरण 4

उपयोग के लिए scripts सेटअप करें और चलाएँ

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### चरण 5 डेटा का उपयोग करें

उपयोग के लिए libreOffice या किसी भी CSV viewer में खोलें!



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />

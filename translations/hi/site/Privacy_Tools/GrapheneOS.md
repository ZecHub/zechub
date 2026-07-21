<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Graphene OS

GrapheneOS एक गैर-लाभकारी, ओपन-सोर्स प्रोजेक्ट है जो Android apps के साथ संगतता बनाए रखते हुए मोबाइल डिवाइसों पर गोपनीयता और सुरक्षा को बेहतर बनाने के लिए समर्पित है। यह Operating system गोपनीयता और सुरक्षा तकनीकों को आगे बढ़ाने पर विशेष ज़ोर देता है, खासकर sandboxing को मजबूत करने, exploit mitigations को बेहतर बनाने, और permission model को परिष्कृत करने पर। 2014 में **CopperheadOS** नाम के तहत जन्मा यह प्रोजेक्ट तब से विकसित होकर आपकी डिजिटल गोपनीयता और सुरक्षा का एक शक्तिशाली रक्षक बन गया है।

GrapheneOS का मुख्य उद्देश्य app sandbox जैसी सुरक्षा सीमाओं को मज़बूत करना है, बिना उपयोगकर्ता अनुभव पर नकारात्मक प्रभाव डाले।

GrapheneOS कुछ विशेष सुविधाओं के लिए विभिन्न toggles पेश कर सकता है, जैसे Network permissions, Sensors permissions, या डिवाइस लॉक होने पर प्रतिबंध (जिसमें USB peripherals, camera access, और quick tiles जैसी चीज़ें शामिल हैं)। इसके अतिरिक्त, उपयोगकर्ता-उन्मुख अधिक जटिल गोपनीयता और सुरक्षा सुविधाएँ भी सोच-समझकर इस तरह डिज़ाइन की गई हैं कि उपयोगकर्ता अनुभव सहज बना रहे, और प्रत्येक सुविधा के साथ अपने स्वयं के user interface enhancements हों।

## **Features of GrapheneOS**

**Security Hardening** GrapheneOS में व्यापक सुरक्षा सुधार शामिल हैं, जैसे memory-safe programming languages और compiler-based security features, जो सामान्य कमजोरियों को कम करने में मदद करते हैं।

**Sandboxing** यह app sandboxing को मज़बूत करता है ताकि apps एक-दूसरे से अलग रहें और संभावित attack vectors सीमित हों।

**Verified Boot** GrapheneOS hardware-backed keys और एक verifiable boot process का उपयोग करता है ताकि operating system की अखंडता सुनिश्चित की जा सके।

**Enhanced Permissions** यह app permissions पर बेहतर नियंत्रण प्रदान करता है, जिससे उपयोगकर्ता यह बारीकी से तय और प्रबंधित कर सकते हैं कि apps किस data तक पहुँच सकते हैं।

**Privacy Dashboard** उपयोगकर्ता privacy dashboard के माध्यम से app behavior की निगरानी और नियंत्रण कर सकते हैं, जिससे data usage के बारे में पारदर्शिता मिलती है।

**Built-in Security Updates** GrapheneOS समय पर security updates प्रदान करता है, जिससे उपयोगकर्ताओं को vulnerabilities के खिलाफ नवीनतम सुरक्षा मिलती रहती है।

**Strong Encryption** यह डिफ़ॉल्ट रूप से full-disk encryption का उपयोग करता है, जिससे डिवाइस में संग्रहीत data सुरक्षित रहता है।

**Improved Browser Security** डिफ़ॉल्ट browser को बेहतर सुरक्षा के लिए configured किया गया है, जिसमें tracking के खिलाफ सुरक्षा भी शामिल है।

**Minimal Pre-installed Apps** GrapheneOS में बहुत कम pre-installed apps आते हैं, जिससे संभावित सुरक्षा और गोपनीयता जोखिम कम होते हैं।

**USB Hostile Port Protection** यह डिवाइस लॉक होने पर USB ports के माध्यम से डिवाइस तक अनधिकृत पहुँच के खिलाफ सुरक्षा प्रदान करता है।

**Anti-Malware Protections** GrapheneOS में ज्ञात malware का पता लगाने और उन्हें रोकने की सुविधाएँ शामिल हैं।

**Focused on Privacy** यह OS उपयोगकर्ता की गोपनीयता पर मजबूत ज़ोर के साथ डिज़ाइन किया गया है, जिससे data collection और exposure को न्यूनतम रखा जाता है।

**Open Source** यह एक open-source प्रोजेक्ट है, जो पारदर्शिता और सुरक्षा सुधार के लिए सामुदायिक योगदान की अनुमति देता है।

**Customizable Security Policies** उपयोगकर्ताओं के पास विभिन्न security policies को अपनी पसंद के अनुसार अनुकूलित करने की क्षमता होती है।

**Compatibility** GrapheneOS Android apps के साथ संगतता बनाए रखने का प्रयास करता है, ताकि उपयोगकर्ता बेहतर सुरक्षा और गोपनीयता सुविधाओं का लाभ लेते हुए अपने पसंदीदा applications का उपयोग जारी रख सकें।

## **Installing GrapheneOS**

जैसा कि best practice section में बताया गया है, अनुशंसित official installation guide का उपयोग करने की सलाह दी जाती है। GrapheneOS को install करने के दो तरीके हैं: या तो [WebUSB-based installer](https://grapheneos.org/install/web) का उपयोग करें या [command-line installation guide](https://grapheneos.org/install/cli) का उपयोग करें।

**Web USB Based Installation** Web installer method का उपयोग करके GrapheneOS install करने के लिए आमतौर पर आपको निम्नलिखित सामग्री और संसाधनों की आवश्यकता होगी:

- 2GB free memory और 32GB free storage space।
- USB Cable (A या C)
- Supported Operating System : Windows 10, Windows 11, macOS Big Sur (11 - 13), Arch Linux, Debian (10 - 12), Ubuntu (22.04, 22.10 and 23.04), ChromeOS, GrapheneOS, Google Android (stock Pixel OS)
- Supported Browsers: Chromium (Ubuntu के साथ supported नहीं), Vanadium (GrapheneOS), Google Chrome, Microsoft Edge, Brave Browser।

नीचे दिए गए लिंक के माध्यम से installation Guide देखें और installation process का पालन करें

[GrapheneOS Web Installer Guide](https://grapheneos.org/install/web#prerequisites)

**Command Line installation** Command line installation उन उपयोगकर्ताओं के लिए अनुशंसित नहीं है जो तकनीकी रूप से सहज नहीं हैं, और Command Line Installation के लिए नीचे दिए गए tools और resources आवश्यक हैं;

- आपके पास कम से कम 2GB free memory और 32GB free storage space उपलब्ध होना चाहिए
- USB Cable (A या C)
- Supported Operating System Windows 10 Windows 11 macOS Big Sur (11) macOS Monterey (12) macOS Ventura (13) Arch Linux Debian 10 (buster) Debian 11 (bullseye) Debian 12 (bookworm) Ubuntu 20.04 LTS Ubuntu 22.04 LTS Ubuntu 22.10 Ubuntu 23.04
- Android, ChromeOS या GrapheneOS से Web Installer

नीचे दिए गए लिंक के माध्यम से installation Guide देखें और installation process का पालन करें 

[Command Line Installation](https://grapheneos.org/install/cli#prerequisites)

## **Best Practices**

**Keep the OS Up to Date** GrapheneOS को नियमित रूप से अपडेट करें ताकि आपके पास नवीनतम security patches और enhancements हों।

**Use Strong Passwords** डिवाइस encryption और app logins के लिए मजबूत, अद्वितीय passwords सेट करें ताकि अनधिकृत पहुँच को रोका जा सके।

**App Permissions** app permissions की सावधानीपूर्वक समीक्षा और प्रबंधन करें, और केवल उतनी ही अनुमति दें जितनी प्रत्येक app के काम करने के लिए आवश्यक हो।

**Regular Backups** डिवाइस खो जाने या data corruption की स्थिति में अपने data के नियमित backups लें।

**Encrypt Storage** यदि डिफ़ॉल्ट रूप से enabled न हो, तो अपने डिवाइस storage को encrypt करें ताकि डिवाइस खोने या चोरी होने पर आपका data सुरक्षित रहे।

**Secure Lock Screen** अनधिकृत पहुँच को रोकने के लिए एक सुरक्षित lock screen का उपयोग करें, जैसे PIN, password, या biometric authentication।

**Avoid Rooting Your Android Device** अपने Android डिवाइस को root करने या bootloader unlock करने से बचें, क्योंकि इससे डिवाइस की सुरक्षा कमज़ोर हो सकती है।

**Verify App Sources** apps और उनके sources की प्रामाणिकता की जाँच करें ताकि malicious software install करने से बचा जा सके।

**Install a Privacy-Focused Browser** सुरक्षित browsing के लिए Brave browser, Firefox या Bromite जैसे privacy-focused browser का उपयोग करने पर विचार करें।

**Regularly Audit Apps** attack surface को कम करने के लिए समय-समय पर उन apps की समीक्षा करें और उन्हें uninstall करें जिनका आप अब उपयोग नहीं करते या जिन पर भरोसा नहीं करते।

**Enable Two-Factor Authentication (2FA)** अपने online accounts के लिए 2FA सक्षम करें ताकि सुरक्षा की एक अतिरिक्त परत जुड़ सके।

**Avoid Public Wi-Fi** public Wi-Fi networks से कनेक्ट करते समय सावधान रहें, क्योंकि वे कम सुरक्षित हो सकते हैं। आवश्यकता पड़ने पर VPN का उपयोग करें।

**Be Cautious with Location Data** apps के लिए location tracking को सीमित करें और यदि आप गोपनीयता को महत्व देते हैं तो location spoofing tool का उपयोग करने पर विचार करें।

**Avoid Unknown Links and Attachments** अनचाहे links और email attachments से सावधान रहें, क्योंकि वे phishing attempts या malware हो सकते हैं।

**Review Default Settings** default settings की सावधानीपूर्वक समीक्षा करें और उन्हें अपनी privacy preferences के अनुरूप समायोजित करें।

**Community Support** सुझाव, updates, और security advice के लिए GrapheneOS community और forums से जुड़ें। आप टीम से संपर्क कर सकते हैं और अधिक संपर्क विकल्प देखने के लिए [here](https://grapheneos.org/contact) पर क्लिक करके अपडेट रह सकते हैं।

**Use Official Installation Method** GrapheneOS दो आधिकारिक रूप से supported installation methods प्रदान करता है। उपयोगकर्ता WebUSB-based installer चुन सकते हैं, जिसकी अधिकांश लोगों के लिए सिफारिश की जाती है, या वे command-line installation guide का पालन कर सकते हैं, जो अधिक तकनीकी रूप से दक्ष उपयोगकर्ताओं के लिए तैयार की गई है।

## **Conclusion**

सार रूप में, GrapheneOS का उद्देश्य एक वैकल्पिक mobile operating system प्रदान करना है जो अपने उपयोगकर्ताओं की गोपनीयता और सुरक्षा को प्राथमिकता देता है, उन्हें उनके digital lives पर अधिक नियंत्रण देता है, और साथ ही उन apps के साथ संगतता भी प्रदान करता है जिन पर वे निर्भर करते हैं। यह एक ऐसा प्रोजेक्ट है जिसका लक्ष्य उस युग में mobile device security और privacy के लिए उच्च मानक स्थापित करना है जहाँ ये चिंताएँ सर्वोपरि हैं।

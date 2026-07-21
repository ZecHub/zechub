<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# गोपनीयता क्यों महत्वपूर्ण है

डिजिटल युग में, अपनी [privacy](https://www.privacyguides.org/en/) की सुरक्षा करना लगातार अधिक महत्वपूर्ण हो गया है। जबकि कुछ लोग गोपनीयता को एक खोया हुआ मामला मान सकते हैं, ऐसा नहीं है। आपकी गोपनीयता दांव पर है और यह चिंता का विषय होना चाहिए। गोपनीयता का महत्वपूर्ण मूल्य है क्योंकि इसका संबंध शक्ति से है, और यह सुनिश्चित करना अत्यंत आवश्यक है कि उस शक्ति का उपयोग जिम्मेदारी से किया जाए।

## Tor और I2P तकनीकें

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) एक proxy tool है जो applications के लिए connections स्थापित करने हेतु Tor network का उपयोग करता है। Torbot यह कार्य उनके traffic को Tor के माध्यम से route करके करता है, जिससे इन applications के लिए [privacy and anonymity](https://www.torproject.org/) बेहतर होती है।

## I2P Network

I2P network, जिसे [Invisible Internet Project](https://geti2p.net/en/about/intro) के नाम से भी जाना जाता है, एक पूर्णतः encrypted peer-to-peer overlay network है। यह सुनिश्चित करता है कि messages की सामग्री, स्रोत और गंतव्य पर्यवेक्षकों से छिपे रहें। दूसरे शब्दों में, कोई भी traffic की उत्पत्ति या गंतव्य, या प्रसारित किए जा रहे messages की वास्तविक सामग्री नहीं देख सकता। I2P में उपयोग किया गया encryption उसके उपयोगकर्ताओं के लिए privacy और anonymity का उच्च स्तर सुनिश्चित करता है।

## Tor और I2P में कुछ समान विशेषताएँ हैं, लेकिन महत्वपूर्ण अंतर भी हैं।

Tor और I2P दोनों decentralized और anonymous peer-to-peer networks हैं, लेकिन I2P, Tor की तुलना में अधिक उच्च स्तर की security प्रदान करता है। हालांकि, I2P मुख्य रूप से अपने network के भीतर email, chat, और torrenting जैसी सेवाओं तक पहुँचने के लिए बनाया गया है और इसका उपयोग सामान्य internet तक पहुँचने के लिए नहीं किया जा सकता। दूसरी ओर, Tor उपयोगकर्ताओं को I2P की तरह deep web तक पहुँचने की अनुमति देता है, लेकिन यह surface web पर websites तक पहुँचने के लिए एक सामान्य browser की तरह भी काम करता है।

*नोट: Tor और I2P की समानताओं और भिन्नताओं के बारे में अधिक जानकारी के लिए [यहाँ](https://geti2p.net/en/comparison/tor) जाएँ*

## Smartphone पर Ywallet के साथ Tor को एकीकृत करना

Orbot एक निःशुल्क virtual private network (VPN) है, जिसे smartphones के लिए डिज़ाइन किया गया है और जो आपके device की सभी applications के traffic को Tor network के माध्यम से भेजता है।

Tor को Zcash Wallet *(Ywallet)* से जोड़ने के लिए नीचे दिए गए निर्देशों का पालन करें:

1.  App store से *Orbot* डाउनलोड और install करें।

2.  Installation के बाद, एक greetings message दिखाई देगा। *Orbot* के home page पर जाएँ और *'Tor Enabled Apps'* पर click करें।              

3. इससे स्क्रीन पर एक page खुलेगा जिसमें Tor-compatible applications दिखाई जाएँगी। *Ywallet* App को खोजें और सुनिश्चित करें कि वह selected है।

4. VPN सेट up करने के लिए एक connection request दिखाई देगी, जो *Orbot* को network traffic की निगरानी करने की अनुमति देगी। यह permission स्वीकृत होने के बाद *Orbot* initialize हो जाएगा।

5. Taskbar या Orbot homepage पर जाँच करें कि Tor चल रहा है या नहीं; इसकी पुष्टि तब होती है जब आपको 'Connected to the Tor network' दिखाई देता है।

* Video tutorial के लिए [यहाँ](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing) देखें

*नोट: यदि आपके mobile network द्वारा Tor block किया गया है, तो आप connect करने के वैकल्पिक तरीके के रूप में Bridge Server का उपयोग कर सकते हैं।*


## PC/Desktop पर Torbot के साथ Zcash wallet कैसे सेट up करें

## Zcash में Tor support?

* Tor browser को आधिकारिक website से डाउनलोड किया जा सकता है, आप [यहाँ](https://www.torproject.org/download/) लिंक देख सकते हैं।

 Tor install करने का सबसे सुविधाजनक तरीका Tor Browser Bundle के माध्यम से है। यदि आप headless installations को प्राथमिकता देते हैं, तो आप अलग से Tor daemon install कर सकते हैं। 

*नोट: डिफ़ॉल्ट रूप से, Tor Browser bundle tcp/9150 पर एक SOCKS listener उपलब्ध कराता है और Tor daemon tcp/9050 पर SOCKS listener उपलब्ध कराता है।*

* Tor Project द्वारा प्रदान किए गए अपने operating system के लिए विशिष्ट installation [instructions](https://support.torproject.org/apt/) देखें।

## Zcashd wallet install करें

Zcashd आधिकारिक linux-based full-node wallet है, जिसे Electric Coin Company के core developers द्वारा update और maintain किया जाता है। यह उन उपयोगकर्ताओं के लिए बनाया गया है जो Zcash transactions को mine और validate करना चाहते हैं, साथ ही Zcash भेजना और प्राप्त करना भी चाहते हैं।

* Zcashd Wallet डाउनलोड करने के लिए आधिकारिक website [यहाँ](https://electriccoin.co/zcashd/) उपलब्ध है। 

* Wallet install करें: Zcash wallet developers द्वारा प्रदान किया गया Tutorial video [यहाँ](https://www.youtube.com/watch?v=hTKL0jPu7X0) उपलब्ध है।

##  Zcashd को Tor पर चलाएँ

* Zcashd को Tor SOCKS proxy का उपयोग करने के लिए configure करने हेतु, आप daemon command में -proxy command line argument जोड़ सकते हैं।

 उदाहरण के लिए:

  $ zcashd -proxy=127.0.0.1:9050
      
वैकल्पिक रूप से, zcash.conf file में निम्नलिखित line जोड़ें:

  proxy=127.0.0.1:9050

Configuration changes को प्रभावी करने के लिए zcashd को restart करना उचित है।

ध्यान दें कि यह मानकर चला गया है कि Tor daemon का उपयोग किया जा रहा है। यदि Tor Browser Bundle का उपयोग किया जा रहा है, तो 9050 को 9150 से बदलें।

इसके अतिरिक्त, आप -listenonion command line argument भी जोड़ सकते हैं ताकि daemon एक .onion address उत्पन्न करे, जिस पर आपका node पहुँचा जा सके।

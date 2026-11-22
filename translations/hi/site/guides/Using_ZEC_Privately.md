<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZEC का निजी उपयोग

#### शील्डेड (Shielded) यानी निजी बनाम ट्रांसपेरेंट (Transparent)

वर्तमान स्थिति में, Zcash में दो प्रकार के एड्रेस (address) और लेनदेन (transaction) हैं: शील्डेड और ट्रांसपेरेंट। शील्डेड और ट्रांसपेरेंट ZEC के बीच का अंतर बहुत सरल है। शील्डेड ZEC आपके पैसे और आपके लेनदेन को निजी रखता है, जबकि ट्रांसपेरेंट ZEC Bitcoin की तरह काम करता है, यानी पूरी तरह ट्रांसपेरेंट। इसका अर्थ है कि यदि किसी को आपका एड्रेस पता हो, तो वह आपका बैलेंस और आपके सभी लेनदेन देख सकता है।

जब लोग पहली बार ZEC का उपयोग शुरू करते हैं, तो हो सकता है कि उन्हें यह पता न हो कि वे किस प्रकार के एड्रेस का उपयोग कर रहे हैं। ऐसा इसलिए है क्योंकि सभी एक्सचेंज (exchange) शील्डेड ZEC और/या शील्डेड ZEC निकासी का समर्थन नहीं करते।

उदाहरण के लिए, यदि कोई Coinbase का उपयोग करता है और ZEC खरीदता है, तो वह ट्रांसपेरेंट ZEC खरीदेगा और उस ZEC को केवल किसी वॉलेट (wallet) के ट्रांसपेरेंट एड्रेस पर ही निकाल पाएगा। इस समस्या के समाधान के लिए [Zodl](https://zodl.com/) जैसे वॉलेट ट्रांसपेरेंट एड्रेस पर भेजी गई राशि को शील्ड कर सकते हैं, लेकिन हर किसी को इसकी जानकारी नहीं होती। सीधे शब्दों में कहें तो, बहुत से लोग ZEC का उपयोग उसी तरह करते हैं जिस तरह उनका एक्सचेंज या मुख्य वॉलेट उन्हें करने देता है।

#### यह सुनिश्चित करना कि आपका ZEC शील्डेड है

हम सभी को सलाह देते हैं कि वे अपने ZEC को स्वयं अपनी कस्टडी में रखें। अर्थात, अपने ZEC को एक्सचेंज से किसी वॉलेट में ले जाएँ। आप शील्डेड, यानी निजी, ZEC का उपयोग कर रहे हैं या नहीं, यह जानने का सबसे अच्छा तरीका उस एड्रेस को देखना है जिसमें बैलेंस रखा है। यदि एड्रेस “z” या “u1” से शुरू होता है, तो आपका बैलेंस शील्डेड है। यदि एड्रेस “t” से शुरू होता है, तो बैलेंस ट्रांसपेरेंट है।

शील्डेड ZEC तक पहुँचने के आम तौर पर दो रास्ते हैं।

ऐसे एक्सचेंज से जो **शील्डेड** निकासी का समर्थन करता है:

  1. किसी एक्सचेंज में ZEC खरीदें
  2. एक्सचेंज में निकासी की प्रक्रिया शुरू करें
  3. अपना शील्डेड ZEC वॉलेट खोलें और सुनिश्चित करें कि प्राप्त करने वाला एड्रेस “u1” या “z” से शुरू होता है
  4. अपने एक्सचेंज से निकासी पूरी करें

ऐसे एक्सचेंज से जो **ट्रांसपेरेंट** निकासी का समर्थन करता है:


  1. किसी एक्सचेंज में ZEC खरीदें
  2. एक्सचेंज में निकासी की प्रक्रिया शुरू करें
  3. अपना ऑटोशील्डिंग ZEC वॉलेट खोलें और ट्रांसपेरेंट प्राप्ति एड्रेस का उपयोग करें
  4. अपने एक्सचेंज से निकासी पूरी करें
  5. दस पुष्टियों (confirmations) की प्रतीक्षा करें, और फिर ZEC को अपने ट्रांसपेरेंट एड्रेस से शील्डेड एड्रेस पर शील्ड करें


यहाँ एक्सचेंज से ZEC निकालने का एक ट्यूटोरियल है। ध्यान दें कि यह एक शील्डेड निकासी है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
यहाँ अपने ZEC को ट्रांसपेरेंट एड्रेस से शील्डेड एड्रेस पर शील्ड करने का एक ट्यूटोरियल है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
यहाँ Coinbase पर ZEC खरीदने और उसे Zodl पर भेजने का एक ट्यूटोरियल है।

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### लेनदेन

यह सुनिश्चित करने के बाद कि आपका ZEC ऐसे शील्डेड वॉलेट में है जो शील्डेड एड्रेस का समर्थन करता है, अब आप तय कर सकते हैं कि आप उस ZEC से लेनदेन करना चाहते हैं या नहीं। ZEC से लेनदेन करना बेहद आसान है। सामने वाले व्यक्ति की पसंद के अनुसार आप ZEC को शील्डेड या ट्रांसपेरेंट, किसी भी एड्रेस पर भेज सकते हैं। किसी भी मौद्रिक लेनदेन की तरह, इसमें भी डेटा लीक होने की थोड़ी संभावना रहती है। ZEC डेटा लीक से लड़ने में सबसे अच्छा है, लेकिन इसका अर्थ यह नहीं है कि आप इसका उपयोग बेफिक्र होकर करें। ZEC से लेनदेन करते समय आपको इन बातों से बचना चाहिए:

- अपना शील्डेड एड्रेस उजागर करना
- शील्डेड एड्रेस को t-एड्रेस के लिए पास-थ्रू के रूप में उपयोग करना (जिसे “मिक्सिंग” भी कहते हैं)
- बड़ी संख्या में शील्डेड से ट्रांसपेरेंट लेनदेन करना, और यह उजागर करना कि आप ऐसा कर रहे हैं
- लोगों को नियमित रूप से यह बताना कि आप शील्डेड ZEC कहाँ खर्च करते हैं


मूल रूप से, अपने ZEC के साथ सबसे अच्छा यही है कि आप उसे शील्डेड वॉलेट में रखें, शील्डेड एड्रेस के बीच लेनदेन करें, और सार्वजनिक स्थानों (जैसे किसी कॉफ़ी शॉप) में ZEC का उपयोग करते समय सावधान रहें। गोपनीयता (privacy) सुनिश्चित करने के साथ एक स्तर की ज़िम्मेदारी भी आती है।

#### संसाधन

[Zcash लेनदेन](https://zechub.wiki/using-zcash/transactions)

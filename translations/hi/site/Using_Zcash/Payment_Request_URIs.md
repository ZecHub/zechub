<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Zcash भुगतान अनुरोध URIs

## डायनेमिक QR कोड्स का अवलोकन

URI का अर्थ Universal Resource Identifier है। ये ऐसे QR कोड होते हैं जो Zcash wallet के भीतर किसी लेनदेन की जानकारी पहले से भरने का काम करते हैं। जो wallet इस फ़ॉर्मेट को पहचानते हैं, वे वेब पेजों पर लिंक पर क्लिक करके या QR कोड स्कैन करके लेनदेन तैयार कर सकते हैं। मान लीजिए आपकी एक ऑनलाइन कॉफ़ी शॉप है, तो आपके ग्राहक इन QR कोड्स को अपने Zcash wallet से स्कैन करके पहले से भरी हुई कीमत और ऑर्डर नंबर के साथ खरीदारी कर सकते हैं।

## भुगतान अनुरोधों के उपयोग के मामले


- ऑनलाइन शॉपिंग।                    Checkout भुगतान अनुरोध ग्राहकों द्वारा ऑनलाइन खरीदारी के दौरान शुरू किए जाते हैं।
- होटल और आवास बुकिंग।   विभिन्न बुकिंग प्लेटफ़ॉर्म होटल आरक्षण के लिए payment request URLs का उपयोग करते हैं।
- ऑनलाइन बिल भुगतान।               Utility कंपनियाँ payment request URLs का उपयोग करती हैं ताकि ग्राहक आसानी से अपने बिलों का भुगतान कर सकें। 
- इवेंट टिकट खरीद।             विभिन्न देशों के event organizers टिकट खरीद को आसान बनाने के लिए इस तंत्र का उपयोग करते हैं।
- P2P भुगतान।                       व्यक्ति messaging apps के माध्यम से परिवार और दोस्तों को आसानी से भुगतान अनुरोध भेज सकते हैं, जिनमें संदेशों के भीतर payment links जुड़े होते हैं।


## विवरण

[ZIP 321](https://zips.z.cash/zip-0321) यह परिभाषित करता है कि अपना स्वयं का custom payment URI कैसे बनाया जाए। 

Zcash के साथ Payment Requests कैसे बनाएं: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

    
### कोड उदाहरण

अपनी वेबसाइट में Zcash Donation Widget जोड़ना: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

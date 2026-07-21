# Zkool Multisig गाइड

यह गाइड Zkool का उपयोग करके multisig ट्रांज़ैक्शन करने की चरण-दर-चरण व्याख्या प्रदान करती है। इसमें अकाउंट बनाना, फंड भेजना या प्राप्त करना, और multisig के लिए distributed key generation (DKG) सेट करना शामिल है। प्रत्येक मुख्य चरण के लिए स्क्रीनशॉट शामिल किए गए हैं।

## ट्यूटोरियल

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. अकाउंट बनाना


1. **Zkool app** खोलें और **New Account** पर जाएँ।


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. एक **Account Name** दर्ज करें (उदाहरण: Anabelle)।  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. आवश्यकता होने पर वैकल्पिक रूप से **Use Internal Change** या **Restore Account** को टॉगल करें।


5. निर्माण के बाद, अकाउंट आपकी **Account List** में दिखाई देगा।  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. फंड प्राप्त करना

प्रत्येक अकाउंट कई प्रकार के address जनरेट करता है:

**Unified Address**

**केवल Orchard Address**

**Sapling Address**
  
**Transparent Address**


जिस प्रकार का address आप उपयोग करना चाहते हैं उसे चुनें और फंड प्राप्त करने के लिए साझा करें।  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. फंड भेजना

1. **Recipient** सेक्शन में जाएँ।  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. **recipient address** दर्ज करें।  

4. **amount** और वैकल्पिक **memo** निर्दिष्ट करें।  

5. ट्रांज़ैक्शन विवरण की समीक्षा करें और **confirm** करें।  


पूरा होने पर, आपकी account list में balance अपडेट हो जाता है।  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. Multisig ट्रांज़ैक्शन करना: Distributed Key Generation (Multisig) सेट करना

Zkool में multisig, **Distributed Key Generation (DKG)** का उपयोग करता है ताकि यह सुनिश्चित किया जा सके कि कई प्रतिभागी एक साझा अकाउंट को नियंत्रित करें।



### चरण 1: DKG प्रारंभ करें
साझा wallet के लिए एक **Name** चुनें (उदाहरण: Anabelle)।

**Number of Participants** सेट करें।
  
अपना **Participant ID** चुनें।
  
**Number of Signers Required (Threshold)** निर्धारित करें।
    
**Funding Account** चुनें।
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### चरण 2: प्रतिभागियों के Address जोड़ें
- प्रत्येक प्रतिभागी का **Unified Address** दर्ज करें (सुझावित)।


**नोट:** यदि आप केवल Orchard या केवल Sapling address का उपयोग करते हैं, तो multisig केवल उसी pool तक सीमित रहेगा (Orchard या Sapling)।  
इसका अर्थ है कि साझा wallet अन्य pools से फंड प्राप्त नहीं कर सकेगा।  
अधिकतम compatibility और flexibility के लिए, हमेशा **Unified Addresses** का उपयोग करें।  


### चरण 3: DKG Rounds चलाएँ
सभी प्रतिभागियों द्वारा **round 1** और **round 2** packages का आदान-प्रदान करने की प्रतीक्षा करें।  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### चरण 4: साझा Address को अंतिम रूप दें
पूरा होने के बाद, एक **shared address** जनरेट हो जाता है।  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## निष्कर्ष

Zkool का उपयोग करके, आप यह कर सकते हैं: अकाउंट बनाना, फंड भेजना और प्राप्त करना, तथा Distributed Key Generation का उपयोग करके एक **multisig wallet** सेट करना। यह **बेहतर सुरक्षा** और **सहयोगात्मक तथा निजी फंड प्रबंधन** सुनिश्चित करता है।

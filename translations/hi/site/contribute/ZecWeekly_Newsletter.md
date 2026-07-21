<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly न्यूज़लेटर

ZecWeekly एक न्यूज़लेटर है जो हर रविवार सुबह भेजा जाता है। इसमें Zcash ecosystem में सप्ताह के दौरान हुई सभी खबरें शामिल होती हैं। खबरों का साप्ताहिक संकलन समुदाय के सदस्य करते हैं और सभी प्रासंगिक लिंक न्यूज़लेटर में जोड़ दिए जाते हैं। कृपया न्यूज़लेटर की सदस्यता [यहाँ](https://zechub.substack.com/) लें।

## योगदान दें

न्यूज़लेटर में योगदान सबसे अच्छा तब काम करता है जब एक योगदानकर्ता सही सप्ताह के लिए संस्करण तैयार करे, वर्तमान bounty या coordination thread का पालन करे, और साप्ताहिक लिंक तैयार होने के बाद pull request सबमिट करे। कृपया ZecHub द्वारा उस संस्करण की तिथि पोस्ट या पुष्टि किए जाने से पहले भविष्य का कोई संस्करण सबमिट न करें। समय से पहले की गई pull requests अक्सर सप्ताह के अंत के अपडेट छूट जाने, नियुक्त curator से टकराव, या गलत deadline के उपयोग का कारण बनती हैं।

### 1. वर्तमान संस्करण की पुष्टि करें

लिखना शुरू करने से पहले:

- वर्तमान न्यूज़लेटर कार्य के लिए [ZEC Bounties ](https://bounties.zechub.wiki/) देखें।
- असाइन किए जाने की प्रतीक्षा करें

![ss](https://github.com/user-attachments/assets/149a802c-b64f-4969-ad89-e83ffecf568e)



### 2. repository को Fork करें

यदि आप GitHub पर नए हैं, तो इस workflow का उपयोग करें:

1. [ZecHub repository](https://github.com/ZecHub/zechub) खोलें।
2. **Fork** पर क्लिक करें और अपने GitHub account के अंतर्गत एक fork बनाएं।
3. अपने fork में, उस संस्करण के लिए एक नई branch बनाएं। एक स्पष्ट branch name उपयोगी होता है, जैसे `digest-may-30-2026`।
4. सुनिश्चित करें कि आपकी pull request में base repository `ZecHub/zechub` और base branch `main` हो।

यदि आप command line का उपयोग करते हैं, तो यही workflow इस तरह दिखता है:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. न्यूज़लेटर फ़ाइल बनाएं

शुरुआत के लिए [newsletter template](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) का उपयोग करें। न्यूज़लेटर के संस्करण [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) फ़ोल्डर में होने चाहिए।

फ़ाइल बनाते समय:

- issue में मांगे गए या हाल की स्वीकृत editions में उपयोग किए गए filename format से मेल रखें।
- जब तक कार्य किसी अलग format के लिए न कहे, template वाला वही section order रखें।
- केवल संबंधित सप्ताह के लिंक जोड़ें।
- हर लिंक के लिए छोटा, स्पष्ट description लिखें ताकि पाठक समझ सकें कि वह क्यों महत्वपूर्ण है।
- आवश्यकता होने पर non-English sources का English में अनुवाद या सारांश दें।
- pull request खोलने से पहले हर लिंक की जाँच करें।

### 4. सही समय पर लिंक एकत्र करें

आमतौर पर ZecWeekly वर्तमान सप्ताह की Zcash ecosystem गतिविधि को कवर करता है और सप्ताह के अंत के आसपास प्रकाशित होता है। सबसे सुरक्षित समय-निर्धारण यह है:

- वर्तमान न्यूज़लेटर issue या task पोस्ट होने के बाद लिंक एकत्र करना शुरू करें।
- जब सप्ताह अभी चल रहा हो, तब एक draft बनाए रखें।
- देर-सप्ताह के updates की जाँच करने के बाद, अनुरोधित submission date के करीब pull request सबमिट करें।
- उस तिथि के लिए task मौजूद होने से पहले या ZecHub द्वारा यह पुष्टि किए जाने से पहले कि आपको इसे तैयार करना चाहिए, भविष्य के सप्ताह का न्यूज़लेटर सबमिट न करें।

यदि किसी issue में किसी विशेष तिथि तक सबमिट करने को कहा गया है, तो उसी तिथि का पालन करें। यदि इस पेज और किसी वर्तमान issue के बीच टकराव हो, तो वर्तमान issue का पालन करें।

### 5. pull request खोलें

जब आपकी न्यूज़लेटर फ़ाइल तैयार हो जाए:

1. अपने fork में अपने changes commit करें।
2. `main` branch पर `ZecHub/zechub` में एक pull request खोलें।
3. ऐसा title उपयोग करें जो संस्करण से मेल खाता हो, जैसे `Zcash Ecosystem Digest | May 30th`।
4. pull request body में issue को लिंक करें ताकि reviewers काम को task से जोड़ सकें।

उदाहरण pull request body:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

pull request खुलने के बाद, review comments पर नज़र रखें। यदि ZecHub edits के लिए कहे, तो उसी branch को update करें, उसी संस्करण के लिए दूसरी pull request न खोलें।

### वास्तविक उदाहरण

स्वीकृत submissions के उदाहरण के रूप में इन merged newsletter pull requests का उपयोग करें:

- [Zcash Ecosystem Digest | 11 अप्रैल](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 मार्च](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 फ़रवरी](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](https://github.com/user-attachments/assets/9230d68d-6406-4c8a-992c-df84e0d318d8)

अपने काम की किसी उदाहरण से तुलना करते समय, फ़ाइल के स्थान, title format, section order, link descriptions, और क्या pull request सही task से वापस जुड़ती है, इन बातों पर ध्यान दें।

### बचने योग्य सामान्य गलतियाँ

- संस्करण की तिथि या task की पुष्टि होने से पहले pull request खोलना।
- ऐसे issue पर काम करना जिसके साथ पहले से एक linked pull request हो।
- pull request को `ZecHub/zechub` की बजाय अपने स्वयं के fork में सबमिट करना।
- गलत file name का उपयोग करना या फ़ाइल को `newsletter` फ़ोल्डर के बाहर रखना।
- किसी पुराने संस्करण की नकल करना बिना हर date, link, और description को update किए।
- गलत सप्ताह के लिंक जोड़ना।
- टूटे हुए links, duplicate links, या template का placeholder text छोड़ देना।
- review comments के बाद मूल branch को update करने के बजाय नई pull request खोलना।

### अंतिम चेकलिस्ट

review के लिए अनुरोध करने से पहले, पुष्टि करें कि:

- issue या task की तिथि आपकी न्यूज़लेटर फ़ाइल से मेल खाती है।
- कोई दूसरी open pull request पहले से उसी issue या edition को cover नहीं कर रही है।
- फ़ाइल `newsletter` फ़ोल्डर में है।
- template के sections पूर्ण हैं।
- हर link काम करता है और उसका उपयोगी description है।
- pull request body सही issue को लिंक करती है।
- यदि reviewers changes का अनुरोध करें, तो आप edits करने के लिए उपलब्ध हैं।

## पिछले संस्करण

[ZecWeekly Archive](https://zechub.substack.com/p/archive)

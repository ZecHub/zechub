<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly न्यूज़लेटर

ZecWeekly एक न्यूज़लेटर है जो हर रविवार सुबह भेजा जाता है। इसमें Zcash ecosystem में सप्ताह के दौरान हुई सभी खबरें शामिल होती हैं। खबरों का साप्ताहिक संकलन समुदाय के सदस्य करते हैं और सभी प्रासंगिक लिंक न्यूज़लेटर में जोड़े जाते हैं। कृपया न्यूज़लेटर की सदस्यता [यहाँ](https://zechub.substack.com/) लें।

## योगदान करें

न्यूज़लेटर में योगदान सबसे अच्छा तब काम करता है जब एक योगदानकर्ता सही सप्ताह के लिए संस्करण तैयार करे, मौजूदा bounty या coordination thread का पालन करे, और साप्ताहिक लिंक तैयार होने के बाद pull request जमा करे। कृपया ZecHub द्वारा उस संस्करण के लिए पोस्ट या तारीख की पुष्टि करने से पहले भविष्य का कोई संस्करण जमा न करें। जल्दी खोले गए pull request अक्सर सप्ताह के अंत की अपडेट्स छूट जाती हैं, किसी निर्धारित curator से टकराव करते हैं, या गलत deadline का उपयोग करते हैं।

### 1. वर्तमान संस्करण की पुष्टि करें

लिखना शुरू करने से पहले:

- वर्तमान न्यूज़लेटर कार्य के लिए [ZEC Bounties ](https://bounties.zechub.wiki/) देखें।
- assigned होने की प्रतीक्षा करें

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. repository का Fork करें

यदि आप GitHub पर नए हैं, तो इस workflow का उपयोग करें:

1. [ZecHub repository](https://github.com/ZecHub/zechub) खोलें।
2. **Fork** पर क्लिक करें और अपने GitHub account के अंतर्गत एक fork बनाएं।
3. अपने fork में, संस्करण के लिए एक नई branch बनाएं। branch का स्पष्ट नाम उपयोगी होता है, जैसे `digest-may-30-2026`।
4. सुनिश्चित करें कि आपका pull request base repository के रूप में `ZecHub/zechub` और base branch के रूप में `main` को target करेगा।

यदि आप command line का उपयोग करते हैं, तो यही workflow इस तरह दिखता है:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

`YOUR-USERNAME` को अपने GitHub username से बदलें। ऊपर दिया गया URL एक placeholder है और जैसा लिखा है वैसा resolve नहीं होगा।

### 3. न्यूज़लेटर फ़ाइल बनाएं

शुरुआत के लिए [newsletter template](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) का उपयोग करें। न्यूज़लेटर के संस्करण [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) folder में होने चाहिए।

फ़ाइल बनाते समय:

- issue में मांगे गए या हाल की स्वीकार की गई editions में उपयोग किए गए filename format से मेल रखें।
- जब तक task किसी अलग format के लिए न कहे, template जैसा ही section order रखें।
- केवल संबंधित सप्ताह के लिंक जोड़ें।
- हर लिंक के लिए छोटा, स्पष्ट description लिखें ताकि पाठक समझ सकें कि वह क्यों महत्वपूर्ण है।
- जरूरत होने पर non-English sources का English में अनुवाद या सारांश दें।
- pull request खोलने से पहले हर लिंक जांचें।

### 4. सही समय पर लिंक एकत्र करें

ZecWeekly सामान्यतः चालू सप्ताह की Zcash ecosystem गतिविधि को कवर करता है और सप्ताह के अंत के करीब प्रकाशित होता है। सबसे सुरक्षित समय यह है:

- वर्तमान न्यूज़लेटर issue या task पोस्ट होने के बाद लिंक एकत्र करना शुरू करें।
- जब सप्ताह अभी जारी हो, तब एक draft बनाए रखें।
- सप्ताह के अंत की अपडेट्स जांच लेने के बाद, मांगी गई submission date के करीब pull request जमा करें।
- उस तारीख के लिए task मौजूद होने से पहले या ZecHub द्वारा यह पुष्टि करने से पहले कि आपको इसे तैयार करना चाहिए, भविष्य के किसी सप्ताह का न्यूज़लेटर जमा न करें।

यदि किसी issue में किसी विशेष तारीख तक जमा करने के लिए कहा गया है, तो उसी तारीख का पालन करें। यदि इस page और किसी वर्तमान issue के बीच टकराव हो, तो वर्तमान issue का पालन करें।

### 5. pull request खोलें

जब आपकी न्यूज़लेटर फ़ाइल तैयार हो जाए:

1. अपने fork में अपने changes commit करें।
2. `main` branch पर `ZecHub/zechub` में एक pull request खोलें।
3. ऐसा title उपयोग करें जो edition से मेल खाता हो, जैसे `Zcash Ecosystem Digest | May 30th`।
4. pull request body में issue का लिंक दें ताकि reviewers काम को task से जोड़ सकें।

उदाहरण pull request body:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

pull request खुलने के बाद, review comments पर नज़र रखें। यदि ZecHub edits के लिए कहे, तो उसी edition के लिए दूसरा pull request खोलने के बजाय उसी branch को update करें।

### वास्तविक उदाहरण

स्वीकार की गई submissions के उदाहरण के रूप में इन merged newsletter pull requests का उपयोग करें:

- [Zcash Ecosystem Digest | 11 अप्रैल](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 मार्च](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 फ़रवरी](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

अपने काम की किसी उदाहरण से तुलना करते समय, फ़ाइल के स्थान, title format, section order, link descriptions, और इस बात पर ध्यान दें कि pull request सही task से जुड़ता है या नहीं।

### बचने योग्य सामान्य गलतियाँ

- edition की तारीख या task की पुष्टि होने से पहले pull request खोलना।
- ऐसे issue पर काम करना जिसके साथ पहले से कोई linked pull request हो।
- pull request को `ZecHub/zechub` के बजाय अपने खुद के fork में submit करना।
- गलत file name का उपयोग करना या फ़ाइल को `newsletter` folder के बाहर रखना।
- पुरानी edition को copy करके हर तारीख, लिंक और description को update न करना।
- गलत सप्ताह के लिंक जोड़ना।
- template से broken links, duplicate links, या placeholder text छोड़ देना।
- review comments के बाद original branch को update करने के बजाय नया pull request खोलना।

### अंतिम checklist

review का अनुरोध करने से पहले, पुष्टि करें कि:

- issue या task की तारीख आपकी न्यूज़लेटर फ़ाइल से मेल खाती है।
- वही issue या edition किसी अन्य open pull request में पहले से कवर नहीं हो रहा है।
- फ़ाइल `newsletter` folder में है।
- template के sections पूरे हैं।
- हर लिंक काम करता है और उसका उपयोगी description है।
- pull request body सही issue से link करती है।
- यदि reviewers changes मांगें तो आप edits करने के लिए उपलब्ध हैं।

## पिछली editions

[ZecWeekly Archive](https://zechub.substack.com/p/archive)

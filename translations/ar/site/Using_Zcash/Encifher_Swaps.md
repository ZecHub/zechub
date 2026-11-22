<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# مبادلة SOL/USDC إلى ZEC باستخدام encrypt.trade

> بادِل SOL أو USDC على Solana إلى ZEC، مع توجيه الخطوة عبر السلاسل (cross-chain) من خلال NEAR Intents.


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)



---

## باختصار

* يقوم [encrypt.trade](https://encrypt.trade/zec) بتغليف SOL أو USDC في رموز (tokens) مشفّرة (eSOL/eUSDC)، ثم يبادلها إلى ZEC عبر NEAR Intents.
* تكون المبالغ مخفية على Solana، لكن عنوان (address) محفظتك (wallet) واستخدامها للتطبيق علنيان.
* يُسلَّم ZEC إلى عنوان شفاف (transparent) فقط (t1/t3)، لذا يكون مرئيًا على سلسلة (chain) Zcash إلى أن تحميه.
* احمِ ZEC في محفظتك فور وصوله.
* يقوم كلٌّ من التطبيق وكذلك NEAR Intents بفحص المحافظ لأغراض الامتثال.

---

## الشرح الأساسي
يُعدّ [**encrypt.trade**](https://encrypt.trade/zec) تطبيقًا على Solana تديره شركة JMD Labs Inc. ويتيح لك مبادلة **SOL أو USDC** على Solana إلى **Zcash (ZEC)**. تُغلَّف رموزك أولًا في نسخ مشفّرة بحيث تكون المبالغ مخفية على Solana، ثم تُبادَل إلى ZEC عبر NEAR Intents.

المبادلة خاصة من بعض النواحي وليس من جميعها. تقول [الوثائق](https://docs.encifher.io/docs) الخاصة بالتطبيق إن تفاعلك مع السلسلة ليس مجهول الهوية: يمكن للناس رؤية أن محفظتك استخدمت التطبيق، ولكن ليس المبلغ الذي نقلته. كما يصل ZEC إلى عنوان شفاف، لذا يبقى مرئيًا على سلسلة Zcash إلى أن تحميه.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  ما يجب أن تعرفه قبل أن تُجري المبادلة  
- **جانب Solana.** يُخفي التغليف المبالغ، لكن عنوان محفظتك واستخدامها للتطبيق علنيان. وتحذّر [أفضل الممارسات](https://docs.encifher.io/docs/best-practices) الخاصة بالتطبيق من أن التغليف ثم المبادلة ثم فك التغليف بشكل بسيط يجعل معاملتك (transaction) قابلة للربط.
- **التشفير (Encryption).** تُعالَج الأرصدة المشفّرة خارج السلسلة (off-chain) داخل جيب أجهزة آمن (TEE). وتقول [الورقة البحثية](https://eprint.iacr.org/2026/1504) الخاصة بالمطورين (developers) إن ذلك يعتمد على سلامة TEE، وعلى إدارة نزيهة للمفاتيح بنظام العتبة، وعلى جذر التصديق السحابي، وليس على التشفير وحده.
- **الخطوة عبر السلاسل.** تُوجَّه المبادلة إلى ZEC عبر NEAR Intents، حيث يقوم حلّالون (solvers) مستقلون بتنفيذ الطلب.
- **جانب Zcash.** يُدرج NEAR Intents عملة ZEC على أنها مدعومة [للعناوين الشفافة فقط](https://docs.near-intents.org/resources/chain-support)، ولم يكن حقل ZEC في encrypt.trade يقبل سوى العناوين الشفافة (t1 أو t3) عند مراجعة هذا الدليل في سبتمبر 2026. يُظهر العنوان الشفاف رصيده والتحويلات الواردة إليه علنًا إلى أن تقوم بالحماية.
- **الفحص.** يتحقق التطبيق من المحافظ المتصلة مقابل قواعد بيانات مثل TRM وـ Chainalysis، وتقول [صفحة الامتثال](https://docs.encifher.io/docs/compliance) الخاصة به إن السجلات المشفّرة يمكن مراجعتها إذا وُجد سبب قانوني مشروع. كما يُجري NEAR Intents [فحصه الخاص](https://docs.near-intents.org/security-compliance/risk-and-compliance) أيضًا.

---

###  الخطوة 1: اربط محفظة Solana الخاصة بك  
تفضّل بزيارة [encrypt.trade](https://encrypt.trade/zec) باستخدام **Chrome أو Firefox**، واربط محفظة **Phantom** أو **Solflare** أو **Slope** الخاصة بك. تأكد من أن محفظتك تحتوي على ما يكفي من **SOL** لرسوم (fees) الغاز وعلى الرموز التي تريد تداولها. بمجرد الاتصال، تصبح جاهزًا لتغليف أصولك.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  الخطوة 2: غلّف رموزك  
انتقل إلى قسم **Wrap**. اختر **SOL** أو **USDC**، وأدخل المبلغ، ثم أكّد. يقفل التطبيق أصولك ويُصدر **نسخًا مشفّرة (eSOL أو eUSDC)**. إن تغليف مبلغ مختلف عن المبلغ الذي تبادله يجعل مطابقة العمليتين من خلال المبلغ أصعب، لكنه لا يُخفي أن محفظتك استخدمت التطبيق.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  الخطوة 3: جهّز محفظة ZODL الخاصة بك  
نزّل [**ZODL**](https://zodl.com)، محفظة Zcash التي يُشرف عليها ZODL. في شاشة الاستلام (Receive)، انسخ **عنوان Zcash الشفاف** (يبدأ بـ t1). لا يقبل encrypt.trade حاليًا العناوين المحمية (shielded) أو الموحّدة لـ ZEC. احفظ عبارة البذور (seed phrase) الخاصة بك بأمان قبل المتابعة.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  الخطوة 4: المبادلة  
بالعودة إلى **encrypt.trade**، انتقل إلى **Swap**. اختر **eSOL/eUSDC -> ZEC**، والصق عنوان ZODL الشفاف الخاص بك، وراجع التفاصيل، ثم أكّد.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


يتولى **NEAR Intents** التوجيه عبر السلاسل ويُرسل **ZEC** إلى محفظة ZODL الخاصة بك. قد يستغرق ذلك بضع دقائق. ويقترح NEAR Intents الانتظار لمدة تصل إلى 15 دقيقة لعمليات المبادلة عبر السلاسل.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  الخطوة 5: احمِ ZEC الخاص بك  
بمجرد وصول ZEC، استخدم خيار **Shield** في ZODL لنقله إلى [المجمّع المحمي](/using-zcash/shielded-pools). وحتى ذلك الحين، يبقى في عنوان شفاف حيث يمكن لأي شخص رؤية الرصيد. تحمي عملية الحماية ما تفعله لاحقًا، لكن التحويل الوارد ومعاملة الحماية يظلان مرئيين على السلسلة. تحقّق دائمًا من الروابط، وتجنّب إعادة استخدام العناوين، وجرّب مبالغ صغيرة أولًا.  

---

###  الجهات المعنية وأين تحصل على المساعدة  
- التطبيق هو **encrypt.trade**، وتديره شركة JMD Labs Inc. تقول [سياسة الخصوصية](https://encrypt.trade/privacy) الخاصة به إنه يجمع بيانات تقنية مثل IP وتفاصيل المتصفح والجهاز، ويرسل عنوان محفظتك وسجلك الأخير وأرصدتك إلى مزوّدي خدمات الامتثال قبل المبادلة، وقد يحتفظ بالسجلات ونتائج فحص مكافحة غسل الأموال (AML) لمدة تصل إلى خمس سنوات. وتحظر [شروطه](https://encrypt.trade/terms) استخدام VPN أو خادم وكيل (proxy) لإخفاء موقعك. الدعم: help@encifher.io أو [مجموعة Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) المرتبطة من التطبيق.
- يتولى **NEAR Intents** توجيه الخطوة عبر السلاسل ويُسلّم ZEC. اطّلع على [شروط 1Click API](https://docs.near-intents.org/security-compliance/terms-of-service) وسياسة الخصوصية على near.com/privacy، وتتبّع عمليات المبادلة على [مستكشف NEAR Intents](https://explorer.near-intents.org)، واطلب المساعدة في [NEAR Intents Telegram](https://t.me/near_intents).

قد تتغير الشروط والعناوين المدعومة، لذا تحقّق من الإصدارات الحالية قبل إجراء مبادلة كبيرة. لمزيد من المعلومات حول الصورة الأشمل، راجع [منصات التداول غير الوصائية](/using-zcash/non-custodial-exchanges).

---

من خلال الجمع بين **Solana** مع **Zcash** إضافةً إلى **NEAR Intents**، يوفّر لك **encrypt.trade** مسارًا سريعًا من SOL أو USDC إلى ZEC. وهو يُخفي المبالغ على Solana لكنه لا يوفّر الخصوصية (privacy) من البداية إلى النهاية، لذا احمِ ZEC الخاص بك فور وصوله.

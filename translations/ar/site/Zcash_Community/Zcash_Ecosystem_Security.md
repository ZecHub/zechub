<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# أمن منظومة Zcash

## مسؤول أمن المنظومة

أُنشئ دور مسؤول أمن منظومة Zcash من خلال منحة (grant) من ZCG بهدف توفير هندسة أمنية مخصصة لمنظومة Zcash الأوسع — ولا سيما الحاصلين على منح ZCG — خارج ECC وخارج ZF.

- **2022–2023:** شغل [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) منصب أول مسؤول لأمن المنظومة. يمكنك معرفة المزيد على [zecsec.com](https://zecsec.com).
- **2024–2025:** اختارت ZCG [Least Authority](https://leastauthority.com) لمواصلة هذا الدور عبر [طلب عروض](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) جديد. يمكنك الاطلاع على التحديثات [هنا](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** Shielded Labs [استعانت بـ Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) بصفته مستشارًا أمنيًا لتعزيز القدرات الأمنية لـ Zcash.

## مبادرة ZCG للأمن والإفصاح عن الثغرات

توفر [مبادرة ZCG للأمن والإفصاح عن الثغرات](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) إطارًا للإفصاح المنسق عن الثغرات الأمنية في منظومة Zcash بأكملها.

## آخر التحديثات الأمنية (2026)

- **Zebra 4.4.1 (مايو 2026):** صدر [إصلاح أمني حرج](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588). يُنصح جميع مشغلي العقد (node) بالترقية فورًا.
- **Zebra 4.3.1 (أبريل 2026):** صدرت [إصلاحات أمنية حرجة، وتعدين ضمن حاويات Docker، وتعزيز أمان CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389).
- **معالجة ثغرات متعددة (أبريل 2026):** [أُصلحت عدة ثغرات في Zcash بنجاح](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) دون التأثير على أموال المستخدمين أو على الخصوصية (privacy).
- **تنبيه zcashd (أبريل 2026):** [تنبيه لتقليل سطح الهجوم على zcashd](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) عبر توجيه حركة المرور من خلال Zebra.

## الإفصاح المسؤول

يلتزم كلٌّ من Electric Coin Company وـ Zcash Foundation بهذا [المعيار](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) للإفصاح المسؤول، مع الاستثناء التالي:

> «Zcash تقنية توفر خصوصية قوية. يجري تشفير (encryption) notes إلى وجهتها، ثم يُحافَظ على القاعدة النقدية عبر إثباتات (proof) المعرفة الصفرية (zero-knowledge) التي يُفترض ألا يتمكن من إنشائها إلا المالك الحقيقي لـ Zcash. وإذا فشل ذلك ونتج عنه خطأ يسمح بالتزييف، فقد يُستغل هذا الخطأ دون أي وسيلة تُمكّن محللي سلسلة الكتل (blockchain) من تحديد الجاني أو البيانات التي استُخدمت في سلسلة الكتل لاستغلال الخطأ. لذلك فإن التراجع إلى ما قبل تلك النقطة، كما نُفّذ في بعض المشاريع الأخرى في مثل هذه الحالات، أمر مستحيل. يصف المعيار قيام المُبلّغين عن الثغرات بتضمين التفاصيل الكاملة للمشكلة من أجل إعادة إنتاجها. وهذا ضروري مثلًا في حالة باحث خارجي يُبيّن ويُثبت أن هناك بالفعل مشكلة أمنية، وأن لهذه المشكلة الأمنية فعلًا التأثير الذي يقوله — مما يتيح لفريق التطوير تحديد أولوية المشكلة وحلها بدقة. أما في حالة خطأ التزييف، تمامًا كما في CVE-2019-7167، فقد نقرر عدم تضمين تلك التفاصيل في تقاريرنا المرسلة إلى الشركاء قبل الإصدار المنسق، طالما أننا متأكدون من أنهم معرضون للخطر.»

## موارد الأمن

- [التنبيهات الأمنية لـ Zcash](https://github.com/zcash/zcash/security/advisories)
- [التنبيهات الأمنية لـ Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [الإبلاغ عن ثغرة في zcash/zcash](https://github.com/zcash/zcash/security/policy)
- [الإبلاغ عن ثغرة إلى ZF](https://github.com/ZcashFoundation/zebra/security/policy)

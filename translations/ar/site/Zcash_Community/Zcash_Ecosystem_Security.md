<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>

# أمان منظومة Zcash

## قائد أمان المنظومة

تم إنشاء دور قائد أمان منظومة Zcash من خلال منحة من ZCG لتوفير هندسة أمنية مخصصة لمنظومة Zcash الأوسع — وبالأخص الجهات الحاصلة على منح من ZCG — خارج ECC و ZF.

- **2022–2023:** خدم [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) كأول قائد لأمان المنظومة. تعرّف على المزيد في [zecsec.com](https://zecsec.com).
- **2024–2025:** اختارت ZCG [Least Authority](https://leastauthority.com) لمواصلة هذا الدور عبر [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) جديدة. يمكن العثور على التحديثات [هنا](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** قامت Shielded Labs [بالتعاقد مع Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) كمستشار أمني لتعزيز قدرات Zcash الأمنية.

## مبادرة ZCG للإفصاح عن الأمن والثغرات

توفر [مبادرة ZCG للإفصاح عن الأمن والثغرات](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) إطارًا للإفصاح المنسق عن الثغرات الأمنية عبر منظومة Zcash.

## أحدث التحديثات الأمنية (2026)

- **Zebra 4.4.1 (مايو 2026):** تم إصدار [إصلاح أمني بالغ الأهمية](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588). يُشجَّع جميع مشغلي العقد على الترقية فورًا.
- **Zebra 4.3.1 (أبريل 2026):** تم إصدار [إصلاحات أمنية بالغة الأهمية، وتعدين مؤتمت عبر Docker، وتعزيز أمان CI](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389).
- **معالجة عدة ثغرات (أبريل 2026):** تم [تصحيح عدة ثغرات في Zcash بنجاح](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388) دون التأثير على أموال المستخدمين أو خصوصيتهم.
- **إرشاد أمني لـ `zcashd` (أبريل 2026):** [إرشاد لتقليل سطح هجوم `zcashd`](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) عبر توجيه حركة المرور من خلال Zebra.

## الإفصاح المسؤول

يلتزم كل من Electric Coin Company و Zcash Foundation بهذا [المعيار](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) للإفصاح المسؤول مع الانحراف التالي:

> "Zcash هي تقنية توفّر خصوصية قوية. تُشفَّر الملاحظات إلى وجهتها، ثم تُحفَظ القاعدة النقدية عبر براهين المعرفة الصفرية التي يُفترض ألا يكون إنشاؤها ممكنًا إلا من قبل الحائز الحقيقي لـ Zcash. إذا فشل ذلك ونتجت ثغرة تزوير، فقد يتم استغلال تلك الثغرة دون أي وسيلة تُمكّن محللي البلوكشين من تحديد الجاني أو معرفة أي بيانات في البلوكشين استُخدمت لاستغلال الثغرة. ولذلك فإن التراجعات قبل تلك النقطة، كما جرى تنفيذها في بعض المشاريع الأخرى في مثل هذه الحالات، تكون مستحيلة. يصف المعيار قيام مُبلّغي الثغرات بتضمين التفاصيل الكاملة للمشكلة من أجل إعادة إنتاجها. وهذا ضروري، على سبيل المثال، في حالة باحث خارجي يقوم بعرض وإثبات وجود مشكلة أمنية فعلًا، وأن لهذه المشكلة الأمنية بالفعل الأثر الذي يذكره — مما يتيح لفريق التطوير تحديد الأولويات ومعالجة المشكلة بدقة. ومع ذلك، في حالة ثغرة تزوير، وكما في CVE-2019-7167، قد نقرر عدم تضمين تلك التفاصيل في تقاريرنا إلى الشركاء قبل الإصدار المنسق، طالما أننا متأكدون من أنهم معرّضون لها."

## موارد الأمان

- [تنبيهات Zcash الأمنية](https://github.com/zcash/zcash/security/advisories)
- [تنبيهات Zebra الأمنية](https://github.com/ZcashFoundation/zebra/security/advisories)
- [الإبلاغ عن ثغرة إلى ECC](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [الإبلاغ عن ثغرة إلى ZF](https://zfnd.org/contact/)

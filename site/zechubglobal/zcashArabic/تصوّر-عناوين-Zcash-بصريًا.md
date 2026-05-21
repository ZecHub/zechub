إذا كنت تتعرّف على Zcash للمرة الأولى، فستلاحظ مباشرةً وجود نوعين من المعاملات: معاملات شفافة (Transparent) ومعاملات محمية (Shielded). وإذا كنت تتابع أحدث تطورات منظومة Zcash، فربما سمعت عن **العناوين الموحّدة (Unified Addresses أو UA)**.

عندما يتحدث العاملون في مجال Zcash عن المعاملات المحمية، فهم يقصدون المعاملات التي تستخدم عناوين مُشفَّرة وفق بروتوكولي **Sapling** أو **Orchard**. أمّا العناوين الموحّدة فصُمِّمت لدمج أي نوع من المعاملات — سواء كانت شفافة أو محمية — داخل عنوان واحد. ويُعدّ هذا التعميم عنصرًا أساسيًا لتبسيط تجربة المستخدم (UX) مستقبلًا.

يهدف هذا الدليل إلى تعزيز فهم العناوين الموحّدة من خلال أمثلة بصرية ملموسة.

أنواع عناوين Zcash
------------------

يوجد حاليًا ثلاثة أنواع رئيسية من العناوين قيد الاستخدام:

*   العناوين الشفافة (transparent)
*   ![trans1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)
*   عناوين Sapling
*   ![Sapling](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)
*   العنوان الموحّد الكامل (Unified Address – Full UA)
*   ![fullUA](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)
*     
    

أول ما ستلاحظه هو اختلاف طول كل نوع من العناوين. يمكن رؤية ذلك بعدد الأحرف في سلسلة العنوان أو عبر رموز QR المرتبطة به؛ فكلما زاد طول العنوان، أصبح رمز QR أكثر تصغيرًا ليستوعب بيانات أكثر داخل المربّع.

*   عنوان شفاف: **35 حرفًا**
*   **عنوان Sapling: 78 حرفًا**
*   **عنوان موحّد كامل: 213 حرفًا**

كما ستلاحظ اختلاف البادئة (Prefix) لكل نوع:

*   العناوين الشفافة تبدأ بالحرف **t**
*   **عناوين Sapling تبدأ بـ zs**
*   **العناوين الموحّدة تبدأ بـ u1**

من المهم ملاحظة ما يلي:

> عناوين الدفع الخاصة بـ Orchard لا تمتلك تمثيلًا نصيًا مستقلًا. بدلاً من ذلك، يتم تعريف “العناوين الموحّدة” بحيث تجمع أنواعًا مختلفة من العناوين — بما فيها Orchard. ويكون الجزء المقروء بشريًا (HRP) لهذه العناوين هو الحرف **u** على الشبكة الرئيسية، أي أنها تبدأ بالبادئة **u1**.

مستقبلات العنوان الموحّد (UA Receivers)
---------------------------------------

يمكن إنشاء العناوين الموحّدة بتركيبات مختلفة من المستقبلات، أي مزيج من:

sapling\+ شفاف

*   ![TransSaplingUA](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

transparent + orchard

*   ![TransOrchUA](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)sapling + orchard
*   ![SapOrcUA](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)orchard
*   ![OrchUA](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

أول نقطة مهمة: جميع هذه العناوين الموحّدة مشتقة من **نفس المفتاح الخاص**.

ثانيًا: يختلف طول كل نوع منها:

شفاف + ‏Sapling

`t+s`

u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e

**الطول:** 141 حرفًا

شفاف + ‏Orchard

`t+o`

u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws

**الطول:** 141 حرفًا

Sapling + ‏Orchard

`s+o`

u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc

**الطول:** 178 حرفًا

Orchard فقط

`o`

u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa

**الطول:** 106 أحرفثالثًا: لكل عنوان موحّد شكل بصري مختلف قليلًا. تكمن قوة العناوين الموحّدة في أنها تمنح المستخدم حرية الاختيار. وإذا ظهر بروتوكول جديد مستقبلًا، فستكون العناوين الموحّدة جاهزة لدعمه دون الحاجة لتغيير تجربة المستخدم.

**المصادر**

[https://zcash.github.io/orchard/design/keys.html](https://zcash.github.io/orchard/design/keys.html)

  

[https://medium.com/@hanh425/transaction-privacy-78f80f9f175e](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)
<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# تصوّر العناوين في Zcash

إذا كنت تتعرّف على Zcash للمرة الأولى، فستدرك على الفور أن هناك نوعين من [المعاملات](https://zechub.wiki/using-zcash/transactions) (transactions) يمكن أن يحدثا: *الشفافة* (transparent) و*المحمية* (shielded).
علاوة على ذلك، إذا كنت تتابع آخر التطورات في منظومة Zcash، فربما تكون قد تعرّفت على [العناوين الموحدة](https://zips.z.cash/zip-0316) (Unified Addresses)، أو UA.
عندما يتحدث العاملون في صناعة Zcash عن المعاملات *المحمية*، فإنهم يقصدون المعاملات التي تتضمن عناوين مُرمَّزة إما لبروتوكول Sapling أو لبروتوكول Orchard. 
صُمّمت العناوين الموحدة UA لتوحيد *أي* نوع من المعاملات المحمية أو الشفافة في عنوان واحد. هذا التعميم هو المفتاح لتبسيط تجربة المستخدم (UX) في المستقبل. الغرض من هذا الدليل هو دعم فهم العناوين الموحدة UA بأمثلة مرئية ملموسة.

## أنواع العناوين في Zcash

توجد حاليًا ثلاثة أنواع رئيسية من العناوين قيد الاستخدام حتى الآن. وهي

* شفاف

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* Sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* عنوان موحد (كامل)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


أول ما يجب ملاحظته هو اختلاف طول كل نوع من العناوين. يمكنك رؤية ذلك بصريًا من خلال عدد الأحرف في سلسلة العنوان *أو* بالنظر إلى رموز QR المرتبطة بها. كلما زاد طول العنوان، يميل رمز QR إلى التصغير واستيعاب مزيد من البيانات داخل المربع.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` يتكوّن من 35 حرفًا
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` يتكوّن من 78 حرفًا
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` يتكوّن من 213 حرفًا

ثاني ما يجب ملاحظته هو بادئة كل سلسلة عنوان، إذ تبدأ العناوين الشفافة بالحرف *t*، وعناوين Sapling بـ *zs*، وأخيرًا العناوين الموحدة UA بـ *u1*.

من المهم ملاحظة ما يلي:

#### «لا تمتلك عناوين الدفع في Orchard ترميزًا نصيًا مستقلًا. بدلًا من ذلك، نُعرّف «العناوين الموحدة» التي يمكنها تجميع عناوين من أنواع مختلفة معًا، بما في ذلك Orchard. تمتلك العناوين الموحدة جزءًا قابلًا للقراءة البشرية هو «u» على الشبكة الرئيسية، أي أنها ستحمل البادئة «u1».»

## مستقبِلات العنوان الموحد

كما نوقش [هنا](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)، يمكنك إنشاء عناوين موحدة UA بمستقبِلات مختلفة، أي بمزيج ما من أنواع العناوين الشفافة وSapling وOrchard.
إلى جانب العنوان الموحد الكامل، إليك الأنواع الأكثر شيوعًا التي ستصادفها في الواقع:

* شفاف + Sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* شفاف + Orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* Sapling + Orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* Orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

أول ما يجب ملاحظته هو أن كل هذه العناوين الموحدة UA مشتقة من المفتاح الخاص نفسه! وثاني ما يجب ملاحظته هو طول كل نوع من العناوين الموحدة:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 حرفًا
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 حرفًا
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 حرفًا
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 حرفًا

وثالث ما يجب ملاحظته هو أن كل عنوان موحد يختلف قليلًا عن الآخر من الناحية المرئية! تكمن قوة العناوين الموحدة UA في *حرية الاختيار* التي تتيحها للمستخدمين النهائيين. وإذا دعت الحاجة مستقبلًا إلى بروتوكول جديد، فستكون العناوين الموحدة جاهزة للعمل.

## المصادر

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

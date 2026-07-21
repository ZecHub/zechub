<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="تعديل الصفحة"/>
</a>


# تصوّر عناوين Zcash

إذا كنت تتعلّم عن Zcash للمرة الأولى، فستدرك فورًا أن هناك نوعين من [المعاملات](https://zechub.wiki/using-zcash/transactions) يمكن أن تحدث: *شفافة* و*محمية*.
وعلاوة على ذلك، إذا كنت تتابع أحدث التطورات في منظومة Zcash، فقد تكون قد تعرّفت على [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/)، أو UA's.
عندما يتحدث العاملون في مجال Zcash عن المعاملات *المحمية*، فإنهم يقصدون المعاملات التي تتضمن عناوين مُرمّزة إما لبروتوكول sapling أو orchard. 
وقد صُممت UA's لتوحيد *أي* نوع من المعاملات المحمية أو الشفافة ضمن عنوان واحد. وهذا التعميم هو المفتاح لتبسيط تجربة المستخدم مستقبلًا. والغرض من هذا الدليل هو تعزيز فهم UA's من خلال أمثلة بصرية ملموسة.

## أنواع عناوين Zcash

يوجد حاليًا ثلاثة أنواع رئيسية من العناوين المستخدمة حتى الآن. وتشمل:

* شفافة

![صورة 1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![صورة 2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (كامل)

![صورة 3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


أول ما ينبغي ملاحظته هو أن طول كل نوع من العناوين مختلف. ويمكنك رؤية ذلك بصريًا من خلال عدد الأحرف في سلسلة العنوان *أو* من خلال رموز QR المرتبطة بها. ومع زيادة طول العنوان، يميل رمز QR إلى التصغير لاحتواء مزيد من البيانات داخل المربع.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` طوله 35 حرفًا
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` طوله 78 حرفًا
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` طوله 213 حرفًا

والأمر الثاني الذي ينبغي ملاحظته هو البادئة في كل سلسلة عنوان -- فالعناوين الشفافة تبدأ بـ *t*، وsapling تبدأ بـ *zs*، وأخيرًا تبدأ UA's بـ *u1*.

من المهم ملاحظة ما يلي:

#### "عناوين الدفع الخاصة بـ Orchard لا تمتلك ترميزًا نصيًا مستقلًا بذاته. وبدلًا من ذلك، نعرّف "عناوين موحّدة" يمكنها جمع عناوين من أنواع مختلفة معًا، بما في ذلك Orchard. تمتلك العناوين الموحّدة جزءًا مقروءًا بشريًا هو "u" على Mainnet، أي إنها ستحمل البادئة "u1". "

## مستقبلات Unified Address

كما نوقش [هنا](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)، يمكن للمرء إنشاء UA's بمستقبلات مختلفة -- أي بعض التركيبات من أنواع العناوين: الشفافة وsapling وorchard.
وبالإضافة إلى UA الكامل، فإليك أكثر الأنواع شيوعًا التي ستجدها متداولة عمليًا:

* شفافة + sapling

![صورة 4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* شفافة + orchard


![صورة 5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![صورة 6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![صورة 7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

أول ما يجب ملاحظته هو أن كل هذه UA's مشتقة من المفتاح الخاص نفسه! وثاني ما يجب ملاحظته هو أطوال كل نوع من أنواع UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 حرفًا
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 حرفًا
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 حرفًا
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 أحرف

وثالث ما ينبغي ملاحظته هو أن كل UA يختلف بصريًا قليلًا عن الآخر! تكمن قوة UA's في *الاختيار* الذي تتيحه للمستخدمين النهائيين. وإذا استدعى الأمر في المستقبل بروتوكولًا جديدًا، فستكون UA's جاهزة للانطلاق.

## المصادر

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

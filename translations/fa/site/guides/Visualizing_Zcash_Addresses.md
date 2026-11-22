<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# تصویرسازی آدرس‌های Zcash

اگر برای نخستین بار با Zcash آشنا می‌شوید، بلافاصله متوجه خواهید شد که دو نوع [تراکنش](https://zechub.wiki/using-zcash/transactions) می‌تواند رخ دهد: *شفاف* و *محافظت‌شده*.
افزون بر این، اگر آخرین تحولات اکوسیستم Zcash را دنبال کرده باشید، ممکن است با [آدرس‌های یکپارچه](https://zips.z.cash/zip-0316) یا UA‌ها آشنا شده باشید.
وقتی افراد در صنعت Zcash از تراکنش‌های *محافظت‌شده* صحبت می‌کنند، منظورشان تراکنش‌هایی است که شامل آدرس‌هایی هستند که برای پروتکل‌های sapling یا orchard رمزگذاری شده‌اند.
UA‌ها به گونه‌ای طراحی شده‌اند که *هر* نوع تراکنش محافظت‌شده یا شفاف را در یک آدرس واحد یکپارچه کنند. این تعمیم، کلید ساده‌سازی تجربه کاربری در آینده است. هدف این راهنما تکمیل درک شما از UA‌ها با نمونه‌های تصویری ملموس است.

## انواع آدرس‌های Zcash

در حال حاضر سه نوع اصلی آدرس مورد استفاده قرار می‌گیرد. این‌ها عبارتند از

* شفاف

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* آدرس یکپارچه (کامل)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


نخستین نکته‌ای که باید به آن توجه کنید این است که طول هر نوع آدرس متفاوت است. شما می‌توانید این را به‌صورت تصویری از روی تعداد کاراکترهای رشته آدرس *یا* با نگاه کردن به کدهای QR مربوطه ببینید. با افزایش طول آدرس، کد QR کوچک‌نمایی می‌شود و داده‌های بیشتری را در مربع جای می‌دهد.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` دارای 35 کاراکتر است
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` دارای 78 کاراکتر است
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` دارای 213 کاراکتر است

دومین نکته‌ای که باید به آن توجه کنید پیشوند هر رشته آدرس است -- آدرس‌های شفاف با *t*، آدرس‌های sapling با *zs* و در نهایت UA‌ها با *u1* آغاز می‌شوند.

توجه به این نکته مهم است:

#### «آدرس‌های پرداخت Orchard رمزگذاری رشته‌ای مستقلی ندارند. در عوض، ما «آدرس‌های یکپارچه» را تعریف می‌کنیم که می‌توانند آدرس‌هایی از انواع مختلف، از جمله Orchard، را با هم ترکیب کنند. آدرس‌های یکپارچه در Mainnet دارای بخش قابل‌خواندن برای انسان «u» هستند، یعنی پیشوند آن‌ها «u1» خواهد بود.»

## گیرنده‌های آدرس یکپارچه

همان‌طور که [اینجا](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) بحث شد، می‌توان UA‌ها را با گیرنده‌های مختلف ساخت -- ترکیبی از انواع آدرس شفاف، sapling و orchard.
علاوه بر یک UA کامل، رایج‌ترین انواعی که در عمل با آن‌ها روبه‌رو خواهید شد عبارتند از:

* شفاف + sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* شفاف + orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* sapling + orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

نخستین نکته‌ای که باید به آن توجه کنید این است که همه این UA‌ها از یک کلید خصوصی یکسان هستند! دومین نکته، طول هر نوع UA است:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 کاراکتر
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 کاراکتر
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 کاراکتر
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 کاراکتر

سومین نکته این است که هر UA از نظر تصویری اندکی متفاوت است! قدرت UA‌ها در *حق انتخابی* است که به کاربران نهایی می‌دهند. اگر در آینده به پروتکل جدیدی نیاز باشد، UA‌ها آماده به کار خواهند بود.

## منابع

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

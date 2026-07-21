<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Визуализация адресов Zcash

Если вы впервые изучаете Zcash, то сразу заметите, что существуют два типа [транзакций](https://zechub.wiki/using-zcash/transactions): *transparent* и *shielded*.
Кроме того, если вы следите за последними событиями в экосистеме Zcash, возможно, вы уже узнали о [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), или UA.
Когда люди в индустрии Zcash говорят о *shielded* транзакциях, они имеют в виду транзакции, в которых используются адреса, закодированные для протоколов sapling или orchard. 
UA предназначены для объединения *любого* типа shielded или transparent транзакции в одном адресе. Это обобщение — ключ к упрощению пользовательского опыта в будущем. Цель этого руководства — дополнить понимание UA конкретными визуальными примерами.

## Типы адресов Zcash

На сегодняшний день используются три основных типа адресов. К ним относятся:

* transparent

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (полный)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


Первое, что стоит заметить, — длина адресов каждого типа различается. Это можно увидеть визуально по количеству символов в строке адреса *или* по соответствующим QR-кодам. По мере увеличения длины адреса QR-код обычно становится более плотным и вмещает больше данных в квадрат.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` имеет длину 35 символов
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` имеет длину 78 символов
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` имеет длину 213 символов

Второе, что стоит заметить, — это префикс каждой строки адреса: transparent начинаются с *t*, sapling — с *zs*, а UA — с *u1*.

Важно отметить:

#### "Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1". "

## Получатели Unified Address

Как обсуждается [здесь](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), можно создавать UA с разными получателями — с некоторой комбинацией типов адресов transparent, sapling и orchard.
Помимо полного UA, вот наиболее распространённые варианты, которые можно встретить на практике:

* transparent + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Первое, что стоит отметить, — все эти UA получены из одного и того же приватного ключа! Второе, что стоит отметить, — длина каждого типа UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 символ
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 символ
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 символов
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 символов

Третье, что стоит отметить, — визуально каждый UA немного отличается! Сила UA заключается в *выборе*, который они дают конечным пользователям. Если в будущем потребуется новый протокол, UA будут к этому готовы.

## Источники

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

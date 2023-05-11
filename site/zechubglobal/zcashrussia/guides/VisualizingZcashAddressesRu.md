
# Визуализация адресов Zcash

Если вы впервые узнаете о Zcash, вы сразу поймете, что существует два типа [транзакций](https://zechub.notion.site/Transactions-2862a2c98a104c3fa08402fb9d5b71b8): *прозрачные* и *экранированные*.
Кроме того, если вы следите за последними разработками в экосистеме Zcash, возможно, вы узнали о [унифицированных адресах](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/) или UA.
Когда люди в индустрии Zcash говорят о «защищенных» транзакциях, они имеют в виду транзакции, в которых используются адреса, закодированные либо для протоколов саженца, либо для сада.
UA предназначены для объединения *любых* типов защищенных или прозрачных транзакций в единый адрес. Это обобщение является ключом к упрощению UX в будущем. Цель этого руководства — дополнить понимание UA конкретными наглядными примерами.

## Типы адресов Zcash

В настоящее время используются три основных типа адресов. К ним относятся

* прозрачный

![trans1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)


* саженец

![Саженец](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)


* Единый адрес (полный)

![fullUA](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


Первое, на что следует обратить внимание, это то, как различается длина каждого типа адреса. Вы можете увидеть это визуально по количеству символов в адресной строке *или*, просмотрев соответствующие QR-коды. По мере увеличения длины адреса QR-код имеет тенденцию уменьшаться и вмещать больше данных в квадрат.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` имеет длину 35 символов.
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` имеет длину 78 символов.
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv 4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` имеет длину 213 символов.

Второе, на что следует обратить внимание, это префикс каждой адресной строки: прозрачное начало с *t*, молодое дерево с *zs* и, наконец, UA с *u1*.

Важно отметить:

#### "Платежные адреса Orchard не имеют отдельной строковой кодировки. Вместо этого мы определяем "унифицированные адреса", которые могут объединять адреса разных типов, включая Orchard. Унифицированные адреса имеют удобочитаемую часть "u" на Mainnet, т.е. они будут иметь префикс «u1».

## Получатели унифицированных адресов

Как обсуждалось [здесь](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), можно создавать UA с разными получателями — некоторая комбинация прозрачных, молодых и садовых адресов.
Помимо полного UA, вот наиболее распространенные, которые вы найдете в дикой природе:

* прозрачный + саженец

![TransSaplingUA](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)


* прозрачный + фруктовый сад

![TransOrchUA](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)


* саженец + фруктовый сад

![SapOrcUA](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)


* фруктовый сад

![OrchUA](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)


Первое, что нужно отметить, это то, что каждый из этих UA относится к одному и тому же закрытому ключу! Во-вторых, следует отметить длину каждого типа UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf50 0y2atq28e` 141 символ
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws ` 141 символ
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyjuywtnn4nkfznctael pkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 символов
* o `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 символов

Третье, на что следует обратить внимание, это то, насколько визуально каждый UA немного отличается! Сила UA — это *выбор*, который они предоставляют конечным пользователям. Если в будущем потребуется новый протокол, UA будут готовы к работе.

## Источники

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e



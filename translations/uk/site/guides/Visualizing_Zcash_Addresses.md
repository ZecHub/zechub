<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Візуалізація адрес Zcash

Якщо ви вивчаєте Zcash уперше, то одразу зрозумієте, що існує два типи [транзакцій](https://zechub.wiki/using-zcash/transactions), які можуть відбуватися: *прозорі* та *екрановані*.
Крім того, якщо ви стежили за останніми подіями в екосистемі Zcash, то, можливо, дізналися про [Unified Address](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), або UA.
Коли люди в індустрії Zcash говорять про *екрановані* транзакції, вони мають на увазі транзакції, що включають адреси, закодовані для протоколів sapling або orchard. 
UA створені для об’єднання *будь-якого* типу екранованої або прозорої транзакції в одну адресу. Це узагальнення є ключем до спрощення UX у майбутньому. Мета цього посібника — доповнити розуміння UA конкретними візуальними прикладами.

## Типи адрес Zcash

Наразі на сьогодні використовуються три основні типи адрес. До них належать

* прозорі

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (повна)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


Перше, на що варто звернути увагу, — це те, що довжина кожного типу адреси різна. Ви можете побачити це візуально за кількістю символів у рядку адреси *або* подивившись на відповідні QR-коди. У міру збільшення довжини адреси QR-код зазвичай віддаляється, щоб умістити більше даних у квадрат.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` має довжину 35 символів
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` має довжину 78 символів
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` має довжину 213 символів

Друге, на що варто звернути увагу, — це префікс кожного рядка адреси: прозорі адреси починаються з *t*, sapling — з *zs*, а зрештою UA — з *u1*.

Важливо зазначити:

#### "Адреси платежів Orchard не мають окремого рядкового кодування. Натомість ми визначаємо "unified addresses", які можуть об’єднувати адреси різних типів, включно з Orchard. Unified addresses мають Human-Readable Part "u" у Mainnet, тобто вони матимуть префікс "u1". "

## Отримувачі Unified Address

Як обговорюється [тут](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), можна створювати UA з різними отримувачами — певною комбінацією типів адрес transparent, sapling та orchard.
Окрім повної UA, ось найпоширеніші варіанти, які ви зустрінете в реальному використанні:

* transparent + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Перше, що слід зазначити, — це те, що всі ці UA походять з одного й того ж приватного ключа! Друге, що слід зазначити, — це довжина кожного типу UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 символ
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 символ
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 символів
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 символів

Третє, на що слід звернути увагу, — це те, що візуально кожна UA трохи відрізняється! Сила UA полягає у *виборі*, який вони дають кінцевим користувачам. Якщо в майбутньому знадобиться новий протокол, UA будуть до цього готові.

## Джерела

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

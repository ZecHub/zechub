<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Visualizando direcciones de Zcash

Si estás aprendiendo sobre Zcash por primera vez, te darás cuenta de inmediato de que hay dos tipos de [transacciones](https://zechub.wiki/using-zcash/transactions) que pueden ocurrir: *transparentes* y *blindadas*.
Además, si has estado al día con los últimos desarrollos en el ecosistema de Zcash, es posible que hayas aprendido sobre [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), o UA's.
Cuando la gente de la industria de Zcash habla de transacciones *blindadas*, se refiere a transacciones que involucran direcciones codificadas para los protocolos sapling u orchard. 
Las UA's están diseñadas para unificar *cualquier* tipo de transacción blindada o transparente en una sola dirección. Esta generalización es la clave para simplificar la UX de cara al futuro. El propósito de esta guía es complementar la comprensión de las UA's con ejemplos visuales concretos.

## Tipos de direcciones de Zcash

Actualmente hay tres tipos principales de direcciones en uso hasta la fecha. Estas incluyen

* transparentes

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (completa)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


Lo primero que hay que notar es cómo la longitud de cada tipo de dirección es diferente. Puedes verlo visualmente por la cantidad de caracteres en la cadena de la dirección *o* mirando los códigos QR asociados. A medida que aumenta la longitud de la dirección, el código QR tiende a alejarse y a ajustar más datos dentro del cuadrado.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` tiene 35 caracteres
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` tiene 78 caracteres
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` tiene 213 caracteres

Lo segundo que hay que notar es el prefijo de cada cadena de dirección: las transparentes empiezan con una *t*, las sapling con una *zs* y, finalmente, las UA's con un *u1*.

Es importante señalar:

#### "Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1". "

## Receptores de Unified Address

Como se comenta [aquí](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), se pueden construir UA's con diferentes receptores: alguna combinación de tipos de direcciones transparent, sapling y orchard.
Además de una UA completa, estas son las más comunes que encontrarás en la práctica:

* transparentes + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparentes + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Lo primero que hay que destacar es que cada una de estas UA's proviene de la misma clave privada. Lo segundo que hay que destacar son las longitudes de cada tipo de UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 caracteres
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 caracteres
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 caracteres
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 caracteres

Lo tercero que hay que notar es cómo visualmente cada UA es ligeramente diferente. El poder de las UA's es la *elección* que permiten a los usuarios finales. Si en el futuro se necesita un nuevo protocolo, las UA's estarán listas para entrar en acción.

## Fuentes

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

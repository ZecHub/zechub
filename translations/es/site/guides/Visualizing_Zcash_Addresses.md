<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Visualización de direcciones Zcash

Si estás aprendiendo sobre Zcash por primera vez, te darás cuenta inmediatamente de que pueden ocurrir dos tipos de [transacciones transactions](https://zechub.wiki/using-zcash/transactions): *transparentes [transparent]* y *blindadas [shielded]*.
Además, si has seguido los últimos avances en el ecosistema de Zcash, es posible que hayas aprendido sobre las [Direcciones unificadas](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), o UA.
Cuando las personas de la industria de Zcash hablan de transacciones *blindadas*, se refieren a transacciones que involucran direcciones [addresses] codificadas para los protocolos sapling u orchard. 
Las UA están diseñadas para unificar *cualquier* tipo de transacción blindada o transparente en una sola dirección. Esta generalización es clave para simplificar la UX en el futuro. El propósito de esta guía es complementar la comprensión de las UA con ejemplos visuales concretos.

## Tipos de direcciones Zcash

Actualmente hay tres tipos principales de direcciones en uso. Estos incluyen

* transparente

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* Dirección unificada (completa)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


Lo primero que hay que notar es que la longitud de cada tipo de dirección es diferente. Puedes verlo visualmente por el número de caracteres en la cadena de dirección *o* mirando los códigos QR asociados. A medida que aumenta la longitud de la dirección, el código QR tiende a alejarse e incluir más datos en el cuadrado.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` tiene 35 caracteres de longitud
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` tiene 78 caracteres de longitud
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` tiene 213 caracteres de longitud

Lo segundo que hay que notar es el prefijo de cada cadena de dirección: las transparentes comienzan con una *t*, las sapling con un *zs* y, finalmente, las UA con un *u1*.

Es importante tener en cuenta:

#### «Las direcciones de pago [payment] de Orchard no tienen una codificación de cadena independiente. En su lugar, definimos «direcciones unificadas» que pueden agrupar direcciones de distintos tipos, incluidas Orchard. Las direcciones unificadas tienen una parte legible para humanos de «u» en Mainnet; es decir, tendrán el prefijo «u1».»

## Receptores de Direcciones unificadas

Como se explica [aquí](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), se pueden crear UA con distintos receptores: alguna combinación de tipos de direcciones transparentes, sapling y orchard.
Además de una UA completa, estas son las más comunes que encontrarás en la práctica:

* transparente + sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* transparente + orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* sapling + orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

Lo primero que hay que notar es que todas estas UA provienen de la misma clave privada. Lo segundo que hay que notar son las longitudes de cada tipo de UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 caracteres
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 caracteres
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 caracteres
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 caracteres

Lo tercero que hay que notar es que, visualmente, cada UA es ligeramente diferente. El poder de las UA es la *elección* que permiten a los usuarios finales. Si en el futuro se necesita un nuevo protocolo, las UA estarán listas para funcionar.

## Fuentes

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


# Visualiser les adresses Zcash

Si vous découvrez Zcash pour la première fois, vous réaliserez immédiatement qu’il existe deux types de [transactions](https://zechub.wiki/using-zcash/transactions) possibles : *transparentes* et *protégées*.
De plus, si vous avez suivi les derniers développements de l’écosystème Zcash, vous avez peut-être entendu parler des [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), ou UA.
Lorsque les acteurs de l’industrie Zcash parlent de transactions *protégées*, ils désignent des transactions impliquant des adresses encodées pour les protocoles sapling ou orchard. 
Les UA sont conçues pour unifier *tout* type de transaction protégée ou transparente dans une seule adresse. Cette généralisation est la clé pour simplifier l’expérience utilisateur à l’avenir. L’objectif de ce guide est de compléter la compréhension des UA avec des exemples visuels concrets.

## Types d’adresses Zcash

À ce jour, il existe actuellement trois principaux types d’adresses utilisés. Ceux-ci comprennent

* transparentes

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (complète)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


La première chose à remarquer est que la longueur de chaque type d’adresse est différente. Vous pouvez le voir visuellement par le nombre de caractères dans la chaîne d’adresse *ou* en regardant les codes QR associés. À mesure que la longueur de l’adresse augmente, le code QR a tendance à dézoomer afin de faire tenir davantage de données dans le carré.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` fait 35 caractères
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` fait 78 caractères
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` fait 213 caractères

La deuxième chose à remarquer est le préfixe de chaque chaîne d’adresse — les adresses transparentes commencent par un *t*, les adresses sapling par *zs*, et enfin les UA par *u1*.

Il est important de noter :

#### "Les adresses de paiement Orchard n’ont pas d’encodage autonome sous forme de chaîne. À la place, nous définissons des "unified addresses" capables de regrouper des adresses de différents types, y compris Orchard. Les unified addresses ont une partie lisible par l’humain de "u" sur Mainnet, c’est-à-dire qu’elles auront le préfixe "u1". "

## Receivers d’Unified Address

Comme expliqué [ici](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), on peut construire des UA avec différents receivers — une certaine combinaison de types d’adresses transparentes, sapling et orchard.
En plus d’une UA complète, voici les combinaisons les plus courantes que vous trouverez dans la nature :

* transparente + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparente + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

La première chose à noter est que chacune de ces UA provient de la même clé privée ! La deuxième chose à noter est la longueur de chaque type d’UA :

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 caractères
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 caractères
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 caractères
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 caractères

La troisième chose à noter est que visuellement chaque UA est légèrement différente ! La force des UA réside dans le *choix* qu’elles offrent aux utilisateurs finaux. Si, à l’avenir, un nouveau protocole devient nécessaire, les UA seront prêtes à entrer en action.

## Sources

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

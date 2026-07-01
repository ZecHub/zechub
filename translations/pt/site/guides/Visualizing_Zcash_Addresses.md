<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>


# Visualizando Endereços Zcash

Se você está aprendendo sobre Zcash pela primeira vez, perceberá imediatamente que há dois tipos de [transações](https://zechub.wiki/using-zcash/transactions) que podem ocorrer: *transparentes* e *shielded*.
Além disso, se você tem acompanhado os desenvolvimentos mais recentes no ecossistema Zcash, talvez já tenha aprendido sobre [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), ou UA's.
Quando as pessoas da indústria Zcash falam sobre transações *shielded*, elas se referem a transações que envolvem endereços codificados para os protocolos sapling ou orchard. 
As UA's são projetadas para unificar *qualquer* tipo de transação shielded ou transparente em um único endereço. Essa generalização é a chave para simplificar a UX daqui para frente. O objetivo deste guia é complementar o entendimento sobre UA's com exemplos visuais concretos.

## Tipos de endereços Zcash

Atualmente, há três tipos principais de endereços em uso até o momento. Eles incluem

* transparentes

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (Completo)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


A primeira coisa a notar é como o comprimento de cada tipo de endereço é diferente. Você pode ver isso visualmente pelo número de caracteres na string do endereço *ou* olhando os códigos QR associados. À medida que o comprimento do endereço aumenta, o código QR tende a se afastar e encaixar mais dados dentro do quadrado.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` tem 35 caracteres
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` tem 78 caracteres
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` tem 213 caracteres

A segunda coisa a notar é o prefixo de cada string de endereço -- transparentes começam com *t*, sapling com *zs* e, por fim, as UA's com *u1*.

É importante observar:

#### "Os endereços de pagamento Orchard não têm uma codificação de string independente. Em vez disso, definimos "unified addresses" que podem agrupar endereços de diferentes tipos, incluindo Orchard. Unified addresses têm uma Parte Legível por Humanos de "u" na Mainnet, ou seja, terão o prefixo "u1". "

## Receptores de Unified Address

Como discutido [aqui](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), é possível construir UA's com diferentes receptores -- alguma combinação dos tipos de endereço transparente, sapling e orchard.
Além de uma UA completa, aqui estão os mais comuns que você encontrará em uso:

* transparente + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparente + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

A primeira coisa a notar é que cada uma dessas UA's vem da mesma chave privada! A segunda coisa a notar são os comprimentos de cada tipo de UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 caracteres
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 caracteres
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 caracteres
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 caracteres

A terceira coisa a notar é como, visualmente, cada UA é ligeiramente diferente! O poder das UA's é a *escolha* que elas permitem aos usuários finais. Se no futuro um novo protocolo for necessário, as UA's estarão prontas para entrar em ação.

## Fontes

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

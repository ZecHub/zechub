# Visualizando endereços Zcash

Se você está aprendendo sobre Zcash pela primeira vez, perceberá imediatamente que existem dois tipos de [transações](https://zechub.notion.site/Transactions-2862a2c98a104c3fa08402fb9d5b71b8) que podem ocorrer: *transparentes* e *blindadas*.
Além disso, se você tem acompanhado os últimos desenvolvimentos no ecossistema Zcash, pode ter aprendido sobre [Endereços Unificados](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), ou UA's.
Quando as pessoas da indústria do Zcash falam sobre transações *blindadas*, elas se referem a transações que envolvem endereços codificados para os protocolos sapling ou orchard.
Os UA's são projetados para unificar *qualquer* tipo de transação blindada ou transparente em um único endereço. Essa generalização é a chave para simplificar a UX no futuro. O objetivo deste guia é complementar o entendimento dos UA's com exemplos visuais concretos.

## Tipos de endereços Zcash

Atualmente existem três tipos principais de endereços em uso até o momento. Estes incluem:

* Transparente

![trans1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* Sapling

![Sapling](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

Endereço Unificado (Completo)

![fullUA](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


A primeira coisa a se notar é como o comprimento de cada tipo de endereço é diferente. Isso pode ser visto visualmente pelo número de caracteres na string do endereço ou olhando para os códigos QR associados. À medida que o comprimento do endereço aumenta, o código QR tende a dar zoom e caber mais dados no quadrado.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` tem 35 caracteres

* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` tem 78 caracteres

* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` tem 213 caracteres

A segunda coisa a se notar é o prefixo de cada sequência de endereço - transparente começa com um t, sapling com um zs e, finalmente, UA's com um u1.

É importante notar que:

#### "Os endereços de pagamento Orchard não possuem uma codificação de sequência independente. Em vez disso, definimos "endereços unificados" que podem agrupar endereços de diferentes tipos, incluindo Orchard. Os endereços unificados têm uma Parte Legível por Humanos de "u" na Mainnet, ou seja, terão o prefixo "u1"."

## Destinatários de Endereços Unificados

Como discutido [aqui](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), pode-se construir UA's com diferentes destinatários - alguma combinação de tipos de endereço transparente, sapling e orchard.
Além de um UA completo, aqui estão os mais comuns que você encontrará na rede:

transparente + sapling

![TransSaplingUA](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

transparente + orchard

![TransOrchUA](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

sapling + orchard

![SapOrcUA](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

orchard

![OrchUA](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)


A primeira coisa a notar é que cada um desses UA's é do mesmo chave privada! A segunda coisa a notar é o comprimento de cada tipo de UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 caracteres

* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 caracteres

* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc`  178 caracteres

* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 caracteres

Terceira coisa a se notar é como visualmente cada UA é ligeiramente diferente! O poder das UA's é a escolha que elas permitem aos usuários finais. Se no futuro um novo protocolo for necessário, as UA's estarão prontas para entrar em ação.

## Fontes

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

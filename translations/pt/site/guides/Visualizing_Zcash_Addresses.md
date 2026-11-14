<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


# Visualizando endereços do Zcash

Se você está aprendendo sobre o Zcash pela primeira vez, vai perceber imediatamente que existem dois tipos de [transações](https://zechub.wiki/using-zcash/transactions) que podem ocorrer: *transparentes* e *blindadas*.
Além disso, se você tem acompanhado os desenvolvimentos mais recentes no ecossistema do Zcash, talvez já tenha ouvido falar dos [endereços unificados](https://zips.z.cash/zip-0316), ou UAs.
Quando as pessoas do setor de Zcash falam sobre transações *blindadas*, elas se referem a transações que envolvem endereços codificados para os protocolos sapling ou orchard.
Os UAs foram projetados para unificar *qualquer* tipo de transação blindada ou transparente em um único endereço. Essa generalização é a chave para simplificar a experiência do usuário daqui para frente. O objetivo deste guia é complementar o entendimento dos UAs com exemplos visuais concretos.

## Tipos de endereços do Zcash

Atualmente, existem três tipos principais de endereços em uso. São eles:

* transparente

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* Endereço unificado (completo)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


A primeira coisa a notar é como o comprimento de cada tipo de endereço é diferente. Você pode ver isso visualmente pelo número de caracteres na string do endereço *ou* observando os QR codes correspondentes. À medida que o comprimento do endereço aumenta, o QR code tende a diminuir o zoom e encaixar mais dados no quadrado.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` tem 35 caracteres
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` tem 78 caracteres
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` tem 213 caracteres

A segunda coisa a notar é o prefixo de cada string de endereço: os transparentes começam com *t*, os sapling com *zs* e, por fim, os UAs com *u1*.

É importante observar:

#### "Os endereços de pagamento Orchard não têm uma codificação de string independente. Em vez disso, definimos "endereços unificados", que podem agrupar endereços de tipos diferentes, incluindo Orchard. Os endereços unificados têm uma parte legível por humanos "u" na Mainnet, ou seja, terão o prefixo "u1". "

## Receptores de endereços unificados

Como discutido [aqui](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), é possível criar UAs com receptores diferentes, ou seja, alguma combinação dos tipos de endereço transparente, sapling e orchard.
Além do UA completo, estes são os mais comuns que você vai encontrar por aí:

* transparente + sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* transparente + orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* sapling + orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

A primeira coisa a notar é que todos esses UAs vêm da mesma chave privada! A segunda coisa a notar é o comprimento de cada tipo de UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 caracteres
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 caracteres
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 caracteres
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 caracteres

A terceira coisa a notar é como cada UA é visualmente um pouco diferente! O poder dos UAs está na *escolha* que eles oferecem aos usuários finais. Se no futuro for necessário um novo protocolo, os UAs estarão prontos para isso.

## Fontes

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e


# Visualizzazione degli indirizzi Zcash

Se stai imparando a conoscere Zcash per la prima volta ti renderai subito conto che ci sono due tipi di [transazioni](https://zechub.notion.site/Transactions-2862a2c98a104c3fa08402fb9d5b71b8) che possono essere: *trasparenti* e *schermate*.
Inoltre, se sei stato al passo con gli ultimi sviluppi nell'ecosistema Zcash, potresti aver appreso dell'esistenza di [indirizzi unificati (Unified Addresses)](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), ovvero gli UA.
Quando le persone nel settore Zcash parlano di transazioni *schermate*, si riferiscono a transazioni che coinvolgono indirizzi codificati per i protocolli Sapling o Orchard.
Gli UA sono progettati per unificare *qualsiasi* tipo di transazione schermata o trasparente in un unico indirizzo. Questa generalizzazione è la chiave per semplificare l'esperienza utente in futuro. Lo scopo di questa guida è quello di semplificare la comprensione degli UA con esempi visivi concreti.

## Tipi di indirizzi Zcash

Attualmente ci sono tre principali tipi di indirizzi in uso ad oggi. Questi includono:

* Trasparenti

![trans1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)


* Sapling

![Sapling](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)


* Indirizzi Unificati (Completi)

![fullUA](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


La prima cosa da notare è come la lunghezza di ciascun tipo di indirizzo sia diversa. Puoi notarlo visivamente contando il numero di caratteri nella stringa dell'indirizzo o guardando i codici QR associati. Aumentando la lunghezza dell'indirizzo, il codice QR tende a zoomare indietro e ad inserire più dati nel quadrato.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` è lungo 35 caratteri
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` è di 78 caratteri
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` è di 213 caratteri

La seconda cosa da notare è il prefisso di ciascuna stringa di indirizzo -- i trasparenti iniziano con una *t*, i sapling con uno *zs* e infine gli UA con un *u1*.

È importante notare che:

#### "Gli indirizzi di pagamento Orchard non hanno una codifica di stringa autonoma. Invece, definiamo "indirizzi unificati" che possono raggruppare insieme indirizzi di diversi tipi, inclusi quelli Orchard. Gli indirizzi unificati hanno una parte leggibile dall'essere umano di "u" su Mainnet, cioè avranno il prefisso "u1"."

## Destinatari di indirizzi unificati

Come discusso [qui](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) si possono costruire indirizzi unificati con diversi destinatari -- una combinazione di tipi di indirizzo trasparenti, sapling e orchard.
Oltre ad un UA completo, questi sono i più comuni che si possono trovare:

* trasparente + sapling

![TransSaplingUA](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)


* trasparente + orchard

![TransOrchUA](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)


* sapling + orchard

![SapOrcUA](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)


* orchard

![OrchUA](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)


La prima cosa da notare è che ciascuno di questi UA proviene dalla stessa chiave privata! La seconda cosa da notare è la lunghezza di ciascun tipo di UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 caratteri
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 caratteri
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 caratteri
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 caratteri

La terza cosa da notare è come visivamente ciascun UA sia leggermente diverso! Il potere degli UA è la scelta che consentono agli utenti finali. Se in futuro sarà necessario un nuovo protocollo, gli UA saranno pronti per essere utilizzati.

## Fonti

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

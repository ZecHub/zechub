<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Visualizzare gli indirizzi Zcash

Se stai imparando a conoscere Zcash per la prima volta, ti renderai subito conto che esistono due tipi di [transazioni](https://zechub.wiki/using-zcash/transactions) che possono verificarsi: *trasparenti* e *schermate*.
Inoltre, se hai seguito gli ultimi sviluppi nell'ecosistema Zcash, potresti aver appreso degli [Unified Address](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), o UA.
Quando le persone nel settore Zcash parlano di transazioni *schermate*, intendono transazioni che coinvolgono indirizzi codificati per i protocolli sapling o orchard. 
Gli UA sono progettati per unificare *qualsiasi* tipo di transazione schermata o trasparente in un unico indirizzo. Questa generalizzazione è la chiave per semplificare la UX in futuro. Lo scopo di questa guida è integrare la comprensione degli UA con esempi visivi concreti.

## Tipi di indirizzi Zcash

Attualmente esistono tre tipi principali di indirizzi in uso. Questi includono

* transparent

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (completo)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


La prima cosa da notare è quanto sia diversa la lunghezza di ciascun tipo di indirizzo. Puoi vederlo visivamente dal numero di caratteri nella stringa dell'indirizzo *oppure* osservando i codici QR associati. Man mano che la lunghezza dell'indirizzo aumenta, il codice QR tende a rimpicciolirsi per far entrare più dati nel quadrato.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` è lungo 35 caratteri
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` è lungo 78 caratteri
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` è lungo 213 caratteri

La seconda cosa da notare è il prefisso di ciascuna stringa di indirizzo -- quelli transparent iniziano con una *t*, quelli sapling con *zs*, e infine gli UA con *u1*.

È importante notare:

#### "Gli indirizzi di pagamento Orchard non hanno una codifica stringa autonoma. Definiamo invece gli "unified address" che possono raggruppare insieme indirizzi di diversi tipi, incluso Orchard. Gli unified address hanno una Human-Readable Part pari a "u" sulla Mainnet, ovvero avranno il prefisso "u1"."

## Ricevitori degli Unified Address

Come discusso [qui](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), si possono costruire UA con ricevitori diversi -- una qualche combinazione dei tipi di indirizzo transparent, sapling e orchard.
Oltre a un UA completo, ecco i più comuni che troverai in circolazione:

* transparent + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

La prima cosa da notare è che ciascuno di questi UA proviene dalla stessa chiave privata! La seconda cosa da notare è la lunghezza di ciascun tipo di UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 caratteri
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 caratteri
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 caratteri
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 caratteri

La terza cosa da notare è come visivamente ogni UA sia leggermente diverso! Il potere degli UA è la *scelta* che permettono agli utenti finali. Se in futuro sarà necessario un nuovo protocollo, gli UA saranno pronti a entrare in azione.

## Fonti

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

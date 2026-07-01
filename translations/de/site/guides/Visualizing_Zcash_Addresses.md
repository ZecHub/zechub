<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Visualisierung von Zcash-Adressen

Wenn du dich zum ersten Mal mit Zcash beschäftigst, wirst du sofort feststellen, dass es zwei Arten von [Transaktionen](https://zechub.wiki/using-zcash/transactions) gibt, die stattfinden können: *transparent* und *shielded*.
Außerdem hast du, wenn du die neuesten Entwicklungen im Zcash-Ökosystem verfolgt hast, vielleicht schon von [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/) oder UA's gehört.
Wenn Menschen in der Zcash-Branche von *shielded* Transaktionen sprechen, meinen sie Transaktionen, an denen Adressen beteiligt sind, die entweder für die sapling- oder orchard-Protokolle codiert sind. 
UA's wurden entwickelt, um *jede* Art von shielded oder transparenten Transaktionen in einer einzigen Adresse zu vereinen. Diese Verallgemeinerung ist der Schlüssel dazu, die UX in Zukunft zu vereinfachen. Der Zweck dieses Leitfadens ist es, das Verständnis von UA's mit konkreten visuellen Beispielen zu ergänzen.

## Arten von Zcash-Adressen

Derzeit sind bis heute drei Haupttypen von Adressen in Gebrauch. Dazu gehören

* transparent

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (vollständig)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


Als Erstes fällt auf, dass die Länge jedes Adresstyps unterschiedlich ist. Du kannst das visuell an der Anzahl der Zeichen in der Adresszeichenfolge *oder* anhand der zugehörigen QR-Codes erkennen. Je länger die Adresse ist, desto weiter zoomt der QR-Code tendenziell heraus, um mehr Daten im Quadrat unterzubringen.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` ist 35 Zeichen lang
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` ist 78 Zeichen lang
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` ist 213 Zeichen lang

Als Zweites fällt das Präfix jeder Adresszeichenfolge auf -- transparente Adressen beginnen mit einem *t*, sapling mit einem *zs* und schließlich UA's mit *u1*.

Wichtig ist dabei:

#### "Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1". "

## Unified Address Empfänger

Wie [hier](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) besprochen, kann man UA's mit unterschiedlichen Empfängern erstellen -- also mit einer Kombination aus transparent-, sapling- und orchard-Adresstypen.
Neben einer vollständigen UA sind dies die häufigsten Varianten, die du in freier Wildbahn finden wirst:

* transparent + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Als Erstes ist zu beachten, dass all diese UA's vom selben privaten Schlüssel stammen! Als Zweites ist die Länge jedes UA-Typs zu beachten:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 Zeichen
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 Zeichen
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 Zeichen
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 Zeichen

Als Drittes ist zu beachten, dass jede dieser UA's visuell leicht unterschiedlich ist! Die Stärke von UA's ist die *Wahlfreiheit*, die sie den Endnutzern ermöglichen. Falls in Zukunft ein neues Protokoll benötigt wird, sind UA's dafür bereit.

## Quellen

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

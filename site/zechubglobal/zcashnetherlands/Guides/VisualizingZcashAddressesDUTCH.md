
# Zcash-adressen visualiseren

Als je voor het eerst over Zcash leert, zul je je meteen realiseren dat er twee soorten [transacties](https://zechub.notion.site/Transactions-2862a2c98a104c3fa08402fb9d5b71b8) zijn die kunnen voorkomen: *transparant* en *afgeschermd*.
Bovendien, als je de laatste ontwikkelingen in het Zcash-ecosysteem hebt bijgehouden, heb je misschien iets gehoord over [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), of UA's.
Wanneer mensen in de Zcash-industrie praten over *afgeschermde* transacties, bedoelen ze transacties met adressen die zijn gecodeerd voor de boomgaard- of boomgaardprotocollen.
UA's zijn ontworpen om *elk* type afgeschermde of transparante transactie te verenigen in één enkel adres. Deze generalisatie is de sleutel tot het vereenvoudigen van de UX in de toekomst. Het doel van deze gids is om het begrip van UA's aan te vullen met concrete visuele voorbeelden.

## Soorten Zcash-adressen

Momenteel zijn er tot op heden drie hoofdtypen adressen in gebruik. Deze omvatten

* transparant

![trans1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)


* jong boompje

![Jong boompje](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)


* Uniform adres (volledig)

![fullUA](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


Het eerste dat opvalt, is hoe de lengte van elk type adres verschilt. U kunt dit visueel zien aan het aantal tekens in de adresreeks *of* door naar de bijbehorende QR-codes te kijken. Naarmate het adres langer wordt, heeft de QR-code de neiging om uit te zoomen en meer gegevens in het vierkant te passen.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` is 35 tekens lang
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` is 78 tekens lang
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4t rd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` is 213 tekens lang

Het tweede dat opvalt is het voorvoegsel van elke adresreeks -- transparant begint met een *t*, boompje met een *zs* en ten slotte UA's met een *u1*.

Het is belangrijk op te merken:

#### "Orchard-betalingsadressen hebben geen op zichzelf staande tekenreekscodering. In plaats daarvan definiëren we "geünificeerde adressen" die adressen van verschillende typen kunnen bundelen, waaronder Orchard. Geünificeerde adressen hebben een voor mensen leesbaar deel van "u" op Mainnet, d.w.z. ze hebben het voorvoegsel "u1". "

## Unified Address-ontvangers

Zoals [hier](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) besproken kan men UA's bouwen met verschillende ontvangers -- een combinatie van transparante, boomgaard- en boomgaardadrestypen.
Naast een volledige UA zijn hier de meest voorkomende die je in het wild zult vinden:

* transparant + jong boompje

![TransSaplingUA](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)


* transparant + boomgaard

![TransOrchUA](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)


* jonge boom + boomgaard

![SapOrcUA](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)


* boomgaard

![OrchUA](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)


Het eerste dat u moet opmerken, is dat elk van deze UA's van dezelfde privésleutel is! Het tweede ding om op te merken is de lengte van elk type UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2 atq28e` 141 tekens
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws ` 141 tekens
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrq cm9cxhkgv3t9jtrvgym7la5varrmzc` 178 tekens
* o `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 tekens

Het derde ding om op te merken is hoe visueel elke UA net iets anders is! De kracht van UA's is de *keuze* die ze eindgebruikers bieden. Als er in de toekomst een nieuw protocol nodig is, zijn de UA's klaar voor gebruik.

## Bronnen

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e



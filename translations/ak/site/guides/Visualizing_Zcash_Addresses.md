<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Address ahorow a wobɛyɛ wɔ w’adwenem

Sɛ woresua Zcash ho ade nea edi kan a wubehu ntɛm ara sɛ [nkitahodi ahorow abien na ɛwɔ hɔ](https://zechub.wiki/using-zcash/transactions) a ebetumi aba: *transparent* ne *shielded*.
Bio nso, sɛ woakɔ so ayɛ nea aba foforo wɔ Zcash abɔde a nkwa wom nhyehyɛe no mu a, ebia woasua [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), or UA's.
Sɛ folks wɔ Zcash adwumayɛ mu ka *shielded * nkitahodi ho asɛm a, wɔkyerɛ nkitahodi a ɛfa address ahorow a wɔde encoded ama sapling anaa orchard protocols no ho. 
Wɔayɛ UA's sɛ ɛbɛka *biara* ayɔnkofa a wɔabɔ ho ban anaa ɛda adi pefee abom ayɛ no address baako. Saa generalization yi ne ade titiriw a ɛbɛma UX a ɛkɔ n’anim no ayɛ mmerɛw. Akwankyerɛ yi botaeɛ ne sɛ ɛde nhwɛsoɔ a ɛyɛ nokware a wɔde aniwa hu bɛka UA ho nteaseɛ ho.

## Zcash address ahorow ahorow

Mprempren address ahorow atitiriw abiɛsa na wɔde di dwuma de besi nnɛ. Eyinom bi ne

* fann

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* dua a wɔde yɛ nnuadewa

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (Full)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


Ade a edi kan a ɛsɛ sɛ yɛhyɛ no nsow ne sɛnea ɛsono address ahorow biara tenten. Wubetumi ahu eyi wɔ w’ani so denam nkyerɛwde dodow a ɛwɔ address string no mu *anaasɛ* denam QR code ahorow a ɛbata ho a wobɛhwɛ so. Bere a address no tenten kɔ soro no, QR code no taa brɛ ase na ɛde data pii hyɛ ahinanan no mu.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` no tenten yɛ nkyerɛwde 35
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` no tenten yɛ nkyerɛwde 78
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` no tenten yɛ nkyerɛwde 213

Adeɛ a ɛtɔ so mmienu a ɛsɛ sɛ yɛhyɛ no nsow ne address string biara prefix -- transparent start ne *t*, sapling de *zs*, na awiei koraa no UA's de *u1*.

Ɛho hia sɛ yɛhyɛ no nsow:

#### "Orchard akatua address nni stand-alone string encoding. Mmom, yɛkyerɛkyerɛ "address a wɔaka abom" a ebetumi abɔ address ahorow a ɛsono emu biara abom, a Orchard ka ho. Address a wɔaka abom no wɔ "u" Fa a Onipa Akenkan wɔ Mainnet so, i.e. wobenya prefix "u1

## Unified Address agyefo

Sɛnea wɔaka ho asɛm [ha](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) obi betumi akyekye UA's ne receivers ahorow -- ebinom a wɔaka abom a ɛyɛ transparent,sapling, ne orchard address ahorow.
Sɛ UA a edi mũ da nkyɛn a, nea ɛtaa ba a wubehu wɔ wuram no ni:

* transparent + dua a ɛyɛ nnuadewa

![img4 na ɛwɔ hɔ](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + nnuaba turo


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* nnuadewa + nnuaba turo


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* nnuaba turo
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Adeɛ a ɛdi kan a ɛsɛ sɛ yɛhyɛ no nsow ne sɛ saa UA yi mu biara firi private key korɔ no ara mu! Ade a ɛto so abien a ɛsɛ sɛ yɛhyɛ no nsow ne UA ahorow biara tenten:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` nkyerɛwde 141 na ɛwɔ mu
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` nkyerɛwde 141 na ɛwɔ mu
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` nkyerɛwde 178 na ɛwɔ mu
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` nkyerɛwde 106 na ɛwɔ mu

Ade a ɛto so abiɛsa a ɛsɛ sɛ yɛhyɛ no nsow ne sɛnea wɔ aniwa so no UA biara yɛ soronko kakra! Tumi a UA's wɔ ne *choice* a wɔma ho kwan ma end users. Sɛ daakye ɛho hia sɛ wɔyɛ protocol foforo a, UA's bɛyɛ krado sɛ wɔbɛbɔ.

## Nneɛma a wonya fi mu

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

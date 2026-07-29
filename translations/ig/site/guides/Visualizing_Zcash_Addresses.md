<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Ịhụ Adreesị Zcash

Ọ bụrụ na ị na-amụta banyere Zcash maka oge mbụ ị ga-aghọta ozugbo na e nwere ụdị abụọ nke [azụmahịa](https://zechub.wiki/using-zcash/transactions) nke nwere ike ime: *transparent* na *shielded*.
Ọzọkwa, ọ bụrụ na ị nọ na-eso mmepe kachasị ọhụrụ na gburugburu ebe obibi Zcash, ị nwere ike mụta banyere [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), or UA's.
Mgbe ndị mmadụ nọ na ụlọ ọrụ Zcash na-ekwu maka azụmahịa * echedoro *, ha pụtara azụmahịa ndị metụtara adreesị nke edobere maka ma ọ bụ usoro ogwu maọbụ ubi. 
UA's are designed to unify *any* type of shielded or transparent transaction into a single address. This generalization is the key to simplifying the UX moving forward. The purpose of this guide is to supplement understanding of UA's with concrete visual examples.

## Ụdị adreesị Zcash

Ka ọ dị ugbu a, e nwere ụdị adreesị atọ a na-eji eme ihe ruo taa.

* ihe na-ekpuchi

! [img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* nwa osisi

! [img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (Zuru ezu)

! [img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


First thing to notice is how the length of each type of address is different. You can see this visually by the number of characters in the address string *or* by looking at the associated QR codes. As length of the address increases, the QR code tends to zoom out and fit more data into the square.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` bụ mkpụrụedemede 35 ogologo
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` bụ mkpụrụedemede 78 ogologo
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` bụ mkpụrụedemede 213 ogologo

Second thing to notice is the prefix of each address string -- transparent start with a *t*, sapling with a *zs*, and finally UA's with a *u1*.

Ọ dị mkpa iburu n'uche:

#### "Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1". "

## Unified Address receivers

Dị ka a tụlere [ebe a](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) mmadụ nwere ike iwulite UA site na iji ndị nnata dị iche iche - ụfọdụ ngwakọta nke ụdị adreesị doro anya, osisi, na ubi.
E wezụga UA zuru ezu, ndị a bụ ndị a na-ahụkarị n'ọhịa:

* na-egbukepụ egbukepụ + osisi

! [img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* uzo + ubi mkpụrụ osisi


! [img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* ahịhịa + ubi mkpụrụ osisi


! [img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* ubi mkpụrụ osisi
  
! [img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Ihe mbụ ị ga-achọpụta bụ na nke ọ bụla n'ime UA ndị a sitere na otu igodo nzuzo ahụ! Ihe nke abụọ ị ga -achọta bụ ogologo nke ụdị UA ọ bụla:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` Ihe odide 141
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` Ihe odide 141
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` Ihe odide 178
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` Ihe odide 106

Ihe nke ato kwesiri iburu n'uche bu otu anya UA obula si di iche! Ike nke UA bu * nhọrọ * ha na enye ndi oru njedebe. Ọ bụrụ na n'ọdịnihu achọrọ usoro ọhụrụ, UA ga-adị njikere ịgba ọsọ.

## Isi mmalite

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

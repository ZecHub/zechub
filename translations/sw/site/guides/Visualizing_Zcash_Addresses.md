<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Kuona Anwani za Zcash

Kama wewe ni kujifunza kuhusu Zcash kwa mara ya kwanza wewe mara moja kutambua kuna aina mbili za [matumizi](https://zechub.wiki/using-zcash/transactions) ambayo inaweza kutokea: * uwazi * na * shielded *.
Zaidi ya hayo, kama umekuwa kuweka juu na maendeleo ya hivi karibuni katika mazingira Zcash, unaweza kuwa kujifunza kuhusu [Unified anwani](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), or UA's.
Wakati watu katika sekta Zcash kuzungumza kuhusu * kulindwa * shughuli, wao maana shughuli ambazo zinahusisha anwani ambazo ni encoded kwa ama sapling au bustani itifaki. 
UA ni iliyoundwa na kuunganisha * aina yoyote ya ulinzi au uwazi shughuli katika anwani moja. generalization hii ni muhimu kwa kurahisisha UX kusonga mbele. lengo la mwongozo huu ni kuongeza uelewa wa UA na mifano halisi ya kuona.

## Aina ya anwani Zcash

Hivi sasa kuna aina kuu tatu za anwani katika matumizi ya tarehe. Hizi ni pamoja na

* uwazi

! [img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* mchanga

! [img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (Full)

! [img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


Jambo la kwanza kugundua ni jinsi urefu wa kila aina ya anwani ni tofauti. Unaweza kuona hii kwa macho na idadi ya wahusika katika string anwani * au * kwa kuangalia codes kuhusishwa QR. Kama urefu ya kuongezeka kwa anwani, QR code huwa na zoom nje na fit data zaidi katika mraba.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` ni herufi 35 kwa muda mrefu
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` ni wahusika 78 kwa muda mrefu
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` ni wahusika 213 mrefu

Second thing to notice is the prefix of each address string -- transparent start with a *t*, sapling with a *zs*, and finally UA's with a *u1*.

Ni muhimu kutambua:

#### "Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1". "

## Unified Address wapokeaji

Kama ilivyojadiliwa [hapa](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) mtu anaweza kujenga UA ya na wapokeaji tofauti - baadhi ya mchanganyiko wa uwazi, sapling, na aina ya anwani orchard.
Mbali na UA kamili, hapa ni ya kawaida kwamba utapata katika pori:

* uwazi + sapling

! [img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* uwazi + bustani ya matunda


! [img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* mchanga + bustani ya matunda


! [img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* shamba la matunda
  
! [img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Jambo la kwanza kumbuka ni kwamba kila mmoja wa UA hizi ni kutoka ufunguo huo binafsi! Jambo la pili kumbuka na urefu wa kila aina ya UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` Wahusika 141
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` Wahusika 141
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` Wahusika 178
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` Wahusika 106

Jambo la tatu kutambua ni jinsi gani visually kila UA ni tofauti kidogo! Nguvu ya UA ni * uchaguzi * wao kuruhusu kwa watumiaji wa mwisho. Kama katika siku zijazo itifaki mpya inahitajika, UA itakuwa tayari kwa roll.

## Vyanzo

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

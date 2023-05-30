# Kuangazia Anwani za Zcash kwa Njia ya Vitendo

Ikiwa unajifunza kuhusu Zcash kwa mara ya kwanza, utagundua mara moja kuwa kuna aina mbili za [miamala](https://zechub.notion.site/Transactions-2862a2c98a104c3fa08402fb9d5b71b8) zinazoweza kutokea: *Za uwazi/transparent* na * za kinga/shielded*.
Zaidi ya hayo, ikiwa umekuwa ukifuatilia maendeleo ya hivi karibuni katika mfumo wa Zcash, labda umesikia juu ya [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), au UA's.
Wakati watu katika tasnia ya Zcash wanazungumzia miamala za *kinga* wanamaanisha miamala ambayo inahusisha anwani zilizohifadhiwa kwa itifaki za sapling au orchard.
UA's zimeundwa ili kuunganisha aina *yoyote* ya miamala ya kinga au ya uwazi katika anwani moja. Ujumuishaji huu ni ufunguo wa kusimplisha UX (uzoefu wa mtumiaji) katika siku zijazo. Lengo la mwongozo huu ni kusaidia uelewa wa UA's na kuonyesha mifano ya kuona kwa njia ya vitendo.

## Aina za anwani za Zcash

Kwa sasa, kuna aina tatu kuu za anwani zinazotumiwa hadi sasa. Hizi ni pamoja na:

* Uwazi/transparent

![trans1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![Sapling](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)


* Unified Address (Nzima)

![fullUA](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)

Jambo la kwanza la kuzingatia ni jinsi urefu wa kila aina ya anwani unavyotofautiana. Unaweza kuona hili kwa kulinganisha idadi ya herufi katika kila anwani au kwa kutazama nambari za QR zinazohusiana. Kadiri urefu wa anwani unavyoongezeka, nambari ya QR inazidi kuwa ndogo na kuweza kubeba data zaidi ndani ya mraba.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` ina herufi 35
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` ina herufi 78
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` ina herufi 213

Jambo la pili la kuzingatia ni kipengele cha awali cha kila kamba ya anwani -- anwani za wazi huanza na *t*, anwani za sapling huanza na*zs*,  na mwishowe UA's huanza na  *u1*.

Ni muhimu kutambua:

#### "Anwani za malipo za Orchard hazina msimbo wa neno pekee. Badala yake, tunatambua 'anwani zilizounganishwa' ambazo zinaweza kufunga pamoja anwani za aina tofauti, ikiwa ni pamoja na Orchard. Anwani zilizounganishwa zina sehemu inayoweza kusomwa na binadamu ya 'u' kwenye Mtandao wa Kuu, yaani zitakuwa na kiambishi cha awali 'u1'."

## Wapokeaji wa Anwani Zilizounganishwa

Kama ilivyoelezwa [hapa](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) unaweza kujenga UA's na wapokeaji tofauti -- ya mchanganyiko wa anwani za wazi, sapling, na orchard.
Mbali na UA kamili, hapa kuna zile za kawaida zaidi utakazozipata:

* transparent + sapling

![TransSaplingUA](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard

![TransOrchUA](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard

![SapOrcUA](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard

![OrchUA](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Jambo la kwanza la kuzingatia ni kwamba kila moja ya UA hizi ni kutoka kwa funguo sawa za faragha! Jambo la pili la kuzingatia ni urefu wa kila aina ya UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` herufi 141 
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws`  herufi 141 
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` herufi 178 

* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` herufi 106 

Jambo la tatu la kuzingatia ni jinsi kila UA inavyoonekana kidogo tofauti! Nguvu ya UA's ni chaguo wanachokiruhusu watumiaji wa mwisho. Ikiwa siku zijazo itahitajika itifaki mpya, UA's itakuwa tayari kutumika.

## Marejeo

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
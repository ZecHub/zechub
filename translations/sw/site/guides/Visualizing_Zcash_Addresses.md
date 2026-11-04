<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Kuona Anwani za Zcash

Ikiwa unajifunza kuhusu Zcash kwa mara ya kwanza, utagundua mara moja kwamba kuna aina mbili za [miamala](https://zechub.wiki/using-zcash/transactions) [transactions] inayoweza kutokea: *ya uwazi [transparent]* na *ya faragha [shielded]*.
Zaidi ya hayo, ikiwa umekuwa ukifuatilia maendeleo ya hivi karibuni katika mfumo ikolojia wa Zcash, huenda umejifunza kuhusu [Anwani Zilizounganishwa](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), au UA.
Watu katika tasnia ya Zcash wanapozungumzia miamala ya *faragha*, wanamaanisha miamala inayohusisha anwani ambazo zimesimbwa kwa itifaki za Sapling au Orchard. 
UA zimeundwa kuunganisha muamala wa aina yoyote wa faragha au wa uwazi katika anwani moja. Ujumlishaji huu ni ufunguo wa kurahisisha UX katika siku zijazo. Madhumuni ya mwongozo huu ni kuongeza uelewa wa UA kwa mifano thabiti ya kuona.

## Aina za anwani za Zcash

Kwa sasa kuna aina tatu kuu za anwani zinazotumika hadi leo. Hizi ni pamoja na

* ya uwazi

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* Sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* Anwani Iliyounganishwa (Kamili)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


Jambo la kwanza la kutambua ni kwamba urefu wa kila aina ya anwani ni tofauti. Unaweza kuona hili kwa idadi ya herufi katika mfuatano wa anwani *au* kwa kuangalia misimbo ya QR inayohusishwa. Urefu wa anwani unapoongezeka, msimbo wa QR huwa unapungua kwa taswira na kutoshea data zaidi katika mraba.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` ina herufi 35
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` ina herufi 78
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` ina herufi 213

Jambo la pili la kutambua ni kiambishi awali cha kila mfuatano wa anwani -- anwani za uwazi huanza kwa *t*, Sapling kwa *zs*, na hatimaye UA kwa *u1*.

Ni muhimu kutambua:

#### "Anwani za malipo [payment] za Orchard hazina usimbaji wa mfuatano unaojitegemea. Badala yake, tunafafanua "anwani zilizounganishwa" ambazo zinaweza kujumuisha pamoja anwani za aina tofauti, zikiwemo Orchard. Anwani zilizounganishwa zina Sehemu Inayosomeka kwa Binadamu ya "u" kwenye Mainnet, yaani zitakuwa na kiambishi awali "u1". "

## Vipokezi vya Anwani Iliyounganishwa

Kama ilivyojadiliwa [hapa](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), mtu anaweza kujenga UA zenye vipokezi tofauti -- mchanganyiko fulani wa aina za anwani za uwazi, Sapling, na Orchard.
Kando na UA kamili, hizi ndizo zinazopatikana kwa kawaida zaidi:

* ya uwazi + Sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* ya uwazi + Orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* Sapling + Orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* Orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

Jambo la kwanza la kutambua ni kwamba UA hizi zote zinatokana na ufunguo sawa wa faragha! Jambo la pili la kutambua ni urefu wa kila aina ya UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` herufi 141
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` herufi 141
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` herufi 178
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` herufi 106

Jambo la tatu la kutambua ni kwamba, kwa taswira, kila UA ni tofauti kidogo! Nguvu ya UA ni *uchaguzi* unaoruhusu watumiaji wa mwisho. Ikiwa itifaki mpya itahitajika katika siku zijazo, UA zitakuwa tayari kutumika.

## Vyanzo

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

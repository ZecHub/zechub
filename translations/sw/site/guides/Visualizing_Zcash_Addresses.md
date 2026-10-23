<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Kuona Anwani za Zcash

Ukijifunza kuhusu Zcash kwa mara ya kwanza utagundua mara moja kwamba kuna aina mbili za [miamala](https://zechub.wiki/using-zcash/transactions) ambayo yanaweza kutokea: *wazi* na *iliyofunikwa*.
Zaidi ya hayo, ikiwa umekuwa ukifuatilia maendeleo ya hivi karibuni katika mfumo ikolojia wa Zcash, huenda umejifunza kuhusu [Anwani Zilizounganishwa](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), or UA's.
Watu katika tasnia ya Zcash wanapozungumzia miamala *iliyolindwa*, wanamaanisha miamala inayohusisha anwani ambazo zimesimbwa kwa itifaki za miche au bustani. 
UA zimeundwa kuunganisha aina yoyote ya muamala uliolindwa au wa uwazi katika anwani moja. Ujumla huu ndio ufunguo wa kurahisisha UX kusonga mbele. Madhumuni ya mwongozo huu ni kuongeza uelewa wa UA kwa mifano halisi inayoonekana.

## Aina za anwani za Zcash

Kwa sasa kuna aina tatu kuu za anwani zinazotumika hadi sasa. Hizi ni pamoja na

* uwazi

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* miche

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* Unified Address (Full)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


Jambo la kwanza la kugundua ni jinsi urefu wa kila aina ya anwani ulivyo tofauti. Unaweza kuona hili kwa kuona idadi ya herufi kwenye mfuatano wa anwani *au* kwa kuangalia misimbo ya QR inayohusiana. Kadri urefu wa anwani unavyoongezeka, misimbo ya QR huelekea kukuza na kutoshea data zaidi kwenye mraba.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` ina herufi 35 kwa urefu
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` ina herufi 78 kwa urefu
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` ina herufi 213 kwa urefu

Jambo la pili la kugundua ni kiambishi awali cha kila mfuatano wa anwani -- anza kwa uwazi na *t*, miche na *zs*, na hatimaye UA na *u1*.

Ni muhimu kuzingatia:

#### "Anwani za malipo za Orchard hazina usimbaji wa kamba unaojitegemea. Badala yake, tunafafanua "anwani zilizounganishwa" ambazo zinaweza kuunganisha anwani za aina tofauti, ikiwa ni pamoja na Orchard. Anwani zilizounganishwa zina Sehemu Inayoweza Kusomwa na Binadamu ya "u" kwenye Mainnet, yaani zitakuwa na kiambishi awali "u1". "

## Unified Address receivers

Kama ilivyojadiliwa [hapa](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) Mtu anaweza kujenga UA kwa kutumia vipokezi tofauti -- mchanganyiko wa aina za anwani za bustani zenye uwazi, miche midogo, na zenye uwazi.
Mbali na UA kamili, hizi ndizo za kawaida zaidi utakazozipata porini:

* uwazi + miche

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* bustani ya uwazi + bustani


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* miche + bustani ya matunda


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* bustani ya matunda
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

Jambo la kwanza kuzingatia ni kwamba kila moja ya UA hizi zinatoka kwenye ufunguo mmoja wa faragha! Jambo la pili kuzingatia ni urefu wa kila aina ya UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` Herufi 141
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` Herufi 141
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` Herufi 178
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` Herufi 106

Jambo la tatu la kuzingatia ni jinsi kila UA inavyotofautiana kidogo! Nguvu ya UA ni *chaguo* wanaloruhusu watumiaji wa mwisho. Ikiwa katika siku zijazo itifaki mpya inahitajika, UA itakuwa tayari kutumika.

## Vyanzo

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Fífi ojú inú wo àwọn àdírẹ́sì Zcash

Tí o bá ń kọ́ nípa Zcash fún ìgbà àkọ́kọ́, o máa rí i lẹ́sẹ̀kẹsẹ̀ pé oríṣi méjì ló wà [awọn iṣowo](https://zechub.wiki/using-zcash/transactions) tí ó lè ṣẹlẹ̀: *àfihàn* àti *àbò*.
Síwájú sí i, tí o bá ti ń tẹ̀lé àwọn ìdàgbàsókè tuntun nínú ètò-ẹ̀rọ Zcash, o lè ti kọ́ nípa rẹ̀ [Àwọn Àdírẹ́sì Ìṣọ̀kan](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), or UA's.
Nígbà tí àwọn ènìyàn nínú iṣẹ́ Zcash bá ń sọ̀rọ̀ nípa àwọn ìṣòwò *tí a dáàbò bò*, wọ́n túmọ̀ sí àwọn ìṣòwò tí ó ní àwọn àdírẹ́sì tí a fi àmì sí fún àwọn ìlànà igi tàbí ọgbà igi. 
A ṣe àwọn UA láti so *èyíkéyìí* irú ìṣòwò tí a dáàbò bò tàbí tí ó hàn gbangba pọ̀ mọ́ àdírẹ́sì kan. Ìṣàpapọ̀ yìí ni kọ́kọ́rọ́ láti mú kí UX rọrùn síi ní ìlọsíwájú. Ète ìtọ́sọ́nà yìí ni láti fi àwọn àpẹẹrẹ ìrísí tó dájú kún òye UA.

## Awọn oriṣi awọn adirẹsi Zcash

Lọ́wọ́lọ́wọ́, oríṣi àdírẹ́sì mẹ́ta pàtàkì ló wà tí a ń lò títí di òní. Àwọn wọ̀nyí ni

* di mimọ

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* igi ogbin

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* Unified Address (Full)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


Ohun àkọ́kọ́ tí a gbọ́dọ̀ kíyèsí ni bí gígùn irú àdírẹ́sì kọ̀ọ̀kan ṣe yàtọ̀ síra. O lè rí èyí ní ojú ìwòye nípa iye àwọn ohun kikọ nínú okùn àdírẹ́sì *tàbí* nípa wíwo àwọn kódì QR tí ó so mọ́ ọn. Bí gígùn àdírẹ́sì náà ṣe ń pọ̀ sí i, kódì QR máa ń dínkù sí i, ó sì máa ń fi àwọn dátà púpọ̀ sí i sínú onígun mẹ́rin náà.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` Ó gùn ní àwọn ohun kikọ 35
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` Ó gùn ní àwọn ohun kikọ 78
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` Ó gùn ní àwọn ohun kikọ 213

Ohun kejì tí a gbọ́dọ̀ kíyèsí ni ìṣáájú ìlà àdírẹ́sì kọ̀ọ̀kan -- ìbẹ̀rẹ̀ tí ó ṣe kedere pẹ̀lú *t*, igi kékeré pẹ̀lú *zs*, àti ní ìkẹyìn UA pẹ̀lú *u1*.

Ó ṣe pàtàkì láti kíyèsí:

#### "Àwọn àdírẹ́sì ìsanwó Orchard kò ní ìkọ̀wé okùn tí ó dúró fúnra rẹ̀. Dípò bẹ́ẹ̀, a túmọ̀ "àdírẹ́sì ìṣọ̀kan" tí ó lè so àwọn àdírẹ́sì onírúurú pọ̀, títí kan Orchard. Àwọn àdírẹ́sì ìṣọ̀kan ní Apá tí a lè kà nípa ènìyàn nínú "u" lórí Mainnet, ìyẹn ni pé wọn yóò ní ìpele ìṣáájú "u1". "

## Unified Address receivers

Gẹ́gẹ́ bí a ti ṣe àgbéyẹ̀wò rẹ̀ [Nibi](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) Ẹnìkan lè kọ́ àwọn UA pẹ̀lú onírúurú àwọn olugba -- àpapọ̀ àwọn irú àdírẹ́sì tí ó hàn gbangba, irúgbìn igi, àti irúgbìn igi.
Yato si UA kikun, awọn wọnyi ni awọn wọpọ julọ ti iwọ yoo rii ni igbo:

* kedere + igi

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* ọgbà igi + tí ó ṣe kedere


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* igi ati ọgba igi


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* ọgbà igi
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

Ohun àkọ́kọ́ tí a gbọ́dọ̀ kíyèsí ni pé gbogbo àwọn UA wọ̀nyí wá láti inú kọ́kọ́rọ́ ìkọ̀kọ̀ kan náà! Ohun kejì tí a gbọ́dọ̀ kíyèsí ni gígùn gbogbo irú UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` Àwọn ohun kikọ 141
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` Àwọn ohun kikọ 141
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` Àwọn ohun kikọ 178
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` Àwọn ohun kikọ 106

Ohun kẹta tí a gbọ́dọ̀ kíyèsí ni bí ojú UA kọ̀ọ̀kan ṣe yàtọ̀ díẹ̀! Agbára UA ni *àṣàyàn* tí wọ́n gbà láàyè fún àwọn olùlò. Tí a bá nílò ìlànà tuntun ní ọjọ́ iwájú, UA yóò ti ṣetán láti bẹ̀rẹ̀.

## Àwọn Orísun

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

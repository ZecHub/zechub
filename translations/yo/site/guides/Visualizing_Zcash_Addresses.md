<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Fífi ojú wo àwọn Adirẹsi Zcash

If you're learning about Zcash for the first time you will immediately realize there are two types of [transactions](https://zechub.wiki/using-zcash/transactions) èyí lè wáyé: *transparent* àti *shielded*.
Pẹlupẹlu, ti o ba ti n tọju pẹlu awọn idagbasoke tuntun ni ilolupo eda abemi Zcash, o le ti kẹkọọ nipa [Awọn Adirẹsi Aladani](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), or UA's.
When folks in the Zcash industry talk about *shielded* transactions, they mean transactions that involve addresses that are encoded for either the sapling or orchard protocols. 
UA's are designed to unify *any* type of shielded or transparent transaction into a single address. This generalization is the key to simplifying the UX moving forward. The purpose of this guide is to supplement understanding of UA's with concrete visual examples.

## Awọn oriṣi adirẹsi Zcash

Lọwọlọwọ awọn oriṣi adirẹsi mẹta lo wa ni lilo titi di oni.

* tó ṣe kedere

! [ì ì1 ]](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* ọmọ ọ̀dọ́

! [ì ì ì2 ]](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (Full)

! [ì ì ì3 ]](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


First thing to notice is how the length of each type of address is different. You can see this visually by the number of characters in the address string *or* by looking at the associated QR codes. As length of the address increases, the QR code tends to zoom out and fit more data into the square.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` ó ní àwọn òǹkọ̀wé márùndínlógójì
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` jẹ àwọn àmì 78
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` jẹ 213 awọn ohun kikọ gun

Ohun kejì láti ṣàkíyèsí ni àfikún tí ó wà nínú ìlà àdírẹ́sì kọ̀ọ̀kan - ìbẹ̀rẹ̀ tí ó ṣe kedere pẹ̀lú *t*, ìkókó pẹ̀lu *zs*, àti níkẹyìn UA's pẹ̀lẹ́lú *u1*.

Ó ṣe pàtàkì láti kíyè sí:

#### "Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1". "

## Unified Address receivers

Gẹ́gẹ́ bí a ti sọ níbí](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) a le kọ UA pẹlu awọn olugba oriṣiriṣi -- diẹ ninu apapo ti ṣiṣan, igi gbigbẹ oloorun, ati awọn iru adirẹsi ọgba.
Yàtọ̀ sí àwọn àbùdá tí kò ṣeé fojú rí yìí, àwọn tó wọ́pọ̀ jù lọ tó o máa rí nínú igbó ni:

* ìmọ́lẹ̀ + ọ̀wọ́ igi

! [ì ì 1⁄4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* àlàfo + ọgbà èso


! [ì í ì °5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* ọgbà àjàrà + ọgbà èso


! [ì ì °6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* ọgbà èso
  
![ì ì ì£1⁄4ì í ]](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

Ohun akọkọ lati ṣe akiyesi ni wipe kọọkan ti awọn wọnyi UA ká wa ni lati kanna ikọkọ bọtini! ohun keji lati se akiyesi ni awọn ipari ti kọọkan iru ti UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 àwọn àmì
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 àwọn àmì
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` Àwọn àmì 178
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 àwọn àmì

Ohun kẹta lati ṣe akiyesi ni bi o ṣe jẹ wiwo kọọkan UA jẹ iyatọ diẹ! Agbara ti UA ni * yiyan * ti wọn fun laaye fun awọn olumulo ipari. Ti ni ọjọ iwaju a nilo ilana tuntun, UA yoo ṣetan lati tan.

## Àwọn orísun

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e

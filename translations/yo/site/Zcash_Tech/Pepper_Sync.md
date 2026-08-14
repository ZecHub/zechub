<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync

## TL;DR

* Pepper Sync ni ẹrọ isọdọkan ti a ṣe afihan ninu Zingo! 2.0, apamọwọ orisun ṣiṣi-orisun Zcash ti o kọ nipasẹ Awọn ile -iṣẹ Zingo.
* Ó ń lo ìsopọ̀ tí kò bára mu dípò kí ó máa ṣàyẹwò ẹrù náà ní àwọn àlàfo ńláńlá, nítorí náà owó rẹ àti ìṣòfò rẹ̀ á tètè fara hàn.
* Ìlọsíwájú ni a fi pamọ ní pẹrẹu. Bí ìjápọ̀ bá já tàbí tí app náà ba pa, àfijọpọ yóò tún padà bẹ́ sílẹ̀ láti ibi tó ti dúró dípò kí ó máa dáwọ́lé.
* O lè náwó kí ìfọwọ́sowọ̀pọ̀ náà tó parí.
* Àwọn ìnáwó tí a fi ààbò ṣe máa ń wà ní àṣírí jálẹ̀ gbogbo ètò náà.

## Àlàyé Ìpilẹ̀ṣẹ̀

Zingo 2.0 is the latest version of the Zingo! wallet, a lightweight, open-source wallet built for the Zcash community. The star of this release is Pepper Sync, a major upgrade that completely rethinks how wallets connect with the blockchain.

Ni igba atijọ, isọdọkan le rilara irora ti o lọra pupọ, aṣiṣe-ara ẹni, ati awọn orisun agbara, nigbakan fi ipa mu awọn olumulo lati tun bẹrẹ lati ibẹrẹ. Pepper Sync yipada gbogbo iyẹn. O jẹ ki iṣọkan yara sii, rọọrun, igbẹkẹle diẹ sii, ati ibeere kekere lori ẹrọ rẹ, lakoko fifipamọ ni kikun asiri ti awọn iṣowo aabo.

Bóyá o jẹ́ olùṣàmúlò tuntun tí ó ń dán Zcash wò fún ìgbà àkọ́kọ́, tàbí ọmọ ẹgbẹ́ aládàáni tó ti pẹ̀lú n ṣakoso ọpọ àpamọ́ owó aláàbò, Pepper Sync mú kí ìrírí náà túbọ̀ wúlò àti dídùn.

### Àwọn ohun pàtàkì ti Pepper Sync

Pepper Sync ṣe àtúnṣe sí àwọn ohun tó wà nínú rẹ̀:

- Ìmúṣiṣẹ́pọ̀ Tó Yára Gan-an - Wọléètì rẹ á ti wà ní sẹpé nínú ìṣẹ́jú dípò wákàtí.
- Awọn imudojuiwọn Smart - A ṣe ilana data ni awọn ege kekere, yago fun kikun rescans.
- Resilient to Interruptions - Bí ìsopọ̀ rẹ bá já, ìṣàdákọ́rọ̀ yóò tún padà bẹ̀rẹ̀ níbi tí ó ti dúró.
- Ó rọrùn láti lò, ó sì gbéṣẹ́ - A ṣe é fún àwọn fóònù alágbèéká àti àwọn èlò míì tí kò fi bẹ́ẹ̀ gba agbára.
- Ìdáhùn tó ṣe kedere - Àtúnṣe ìlọsíwájú ojú-ọjọ́ dín ìdàrúdàpò.
- Ìpamọ́-ìdáàbòbò - Àwọn ìsòwò tí a fi ààlà ṣe máa ń jẹ́ àṣírí ní gbogbo ìgbà.

### Ohun tó dára ju ti ìṣáájú lọ ni

Awọn ẹya atijọ ti Zingo nigbagbogbo ṣe ibanujẹ awọn olumulo pẹlu akoko isọdọkan pipẹ, mimu aṣiṣe ṣiṣanwo ko han gbangba, ati lilo orisun agbara. Pepper Sync ṣatunṣe awọn iṣoro wọpọ wọnyi:

Àwọn Àṣejèrè Ẹ̀dà Zingo ti tẹlẹ. Zingo 2.0 pẹlú Pepper Sync
| ------------------ | -------------------------------------- | -------------------------------------------- |
ìmúṣiṣẹ́pọ̀ ìyára. Ó máa ń lọra, pàápàá nígbà tí a bá kọ́kọ́ ṣe é. Ìmúlùmọ̀ tó yára gan-an ni ó wà níbẹ̀rẹ̀ àti bí wọ́n ti ń tẹ̀ síwájú sí i.
 Ìtọjú àṣìṣe. Àìdáa àti àwọn ìkùdíẹ̀-káàtó tí kò ṣe kedere. Ó mú kí ìdánilójú pọ̀ sí i pẹlú igbala aládàáṣiṣẹ́.
ìmúlò oníṣe. Ṣíṣàmúṣẹ̀ rí "bí òkùnkùn" fún àwọn tí ó ṣẹ̀ṣẹ̀ dé. Ó ṣe kedere, pẹlú ipò àti àtúntò tó hàn gbangba jùlọ.
 Ìṣiṣẹ́ Ẹ̀rọ  Gbigba CPU/ìrántí lọpọlọpọ  Ti a ṣe ààyò fún lílo àwọn ohun àmúṣe ní rọra.

Ní ṣókí: ìfiwéra-ìṣiṣẹ́pọ̀ ti wá yára báyìí, ó ṣeé gbára lé jù àti pé kò ṣòro láti lóye.

## Ìran / Àfiwé

ronú nípa àpò ìwé tí ó ti pẹ́ bíi kíkàwé tó gùn gan-an láti ojúewé kan, lóhùn rara, kó o to lè sọ ohunkóhun nípa rẹ̀. dúró ní ìdajì ọ̀nà, àti bẹ̀rẹ̀ padà láti ojúwé kìíní. Pepper Sync ka ìwé náà, ṣùgbọ́n yóò pa àmì àkọsílẹ̀ mọ́, á kọkọ kà àwọn orí tó ṣe pàtàkì fún ẹ, yóò sì jẹ́ kí ìwọ bá a sọ̀rọ̀ lórí ìtàn náà ṣáájú kí o tó parí ojúewè kẹyìn.

Àmì ojúewé ni apá pàtàkì. Gbogbo àtúnṣe tó ti wà tẹ́lẹ̀ ń wo ìmúṣiṣẹ́pọ̀ tí ó dáwọ́ dúró bí iṣẹ́ tí a pàdánù; Pepper Sync ṣe é bíi ìdákẹ́sẹ̀.

### Àwọn ìwé tó ń fi àwòrán hàn

- Ìsọfúnni tó kún fún ìjìnlẹ̀ - Ó fi gbogbo ìgbésẹ̀ hàn. ![Detailed Flow](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Ìṣàn tí a mú rọrùn - Àwòran kíákíá fún àwọn oníṣe ojoojúmọ́. ![Simplified Flow](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Wọlé Lọ Jìnnà

### Bí Pepper Sync ṣe ń ṣiṣẹ́ (ìwòye tó rọrùn)

Dípò kí ó tún àdàkọ blockchain ṣe ní ìpele-ìpín, Pepper Sync ń ṣiṣẹ́ ni àwọn ìgbésẹ̀ kéékèèké tí a lè darí - nígbà gbogbo á máa pa ibi rẹ mọ́ bí o ti n lọ.

1. So pọ - Àpò-ìpamọ́ wọlé pẹ̀lú nẹtiwọọki.
2. Gbigba Awọn bulọọki - A gba data silẹ ni ilọsiwaju.
3. Ṣayẹwo - Awọn iṣowo ti wa ni idaniloju.
4. Ṣakoso Awọn Akọsilẹ Aṣọ - Ìpamọ́ ti wa ni ipamọ ní gbogbo ìgbà.
5. Àtúnṣe Ìṣòro - Wọ́léètì ń sọ̀tun ní ààbò.
6. Fi Àṣeyọrí pamọ́ - Yóò dáwọ̀ dúró, yóò sì tún padà lọ láìṣe àbùkù.
7. Ṣẹ́yìn - Wọléètì ti ṣetan láti ṣe ìnáwó.

## Àwọn Ohun Tó Lè Yọrí sí Lóòótọ́

### Àwọn wo ló ń jàǹfààní látinú Pepper Sync?

- Àwọn Olùloyè tuntun - Le ṣe ìsopọ̀ àwọn àpamọ́ owó láìní díẹ̀ lọ́kàn nítorí ìdádúró.
- Awọn Olumulo Ojoojumọ - Iṣọkan ti o gbẹkẹle jẹ ki awọn sisanwo aabo wulo fun lilo ojoojumọ.
- Awọn Olùgbéejáde & Àwọn Onídánwò - Àkókò ìsopọ̀ tí ó kúrú túmọ̀ sí àwọn ayẹyẹ ìdánwò tó yá.
- Mobile & Light Devices - Zingo n ṣiṣẹ daradara paapaa lori ohun elo ti o ni opin.

### Ìdí tí ó fi ṣe pàtàkì fún Zcash

Zcash ni a kọ si ayika awọn iṣowo ti o bo, ọkan ninu awọn irinṣẹ aṣiri to lagbara julọ ni cryptocurrency. Ṣugbọn asiri jẹ wulo nikan bi o ba wa wọle.

Pepper Sync ṣe iranlọwọ nipa:

- Ṣíṣá àwọn ohun tó ń díwọ̀n wọlé - Àwọn olùlowó tuntun lè tètè bẹ̀rẹ̀.
- Atilẹyin lilo ojoojumọ - Awọn adirẹsi ti o ni aabo di rọrun lati gbẹkẹle.
- Ifilọlẹ idagbasoke eto-aye - Iriri apamọwọ ti o dara julọ n ṣe awakọ gbigba diẹ sii, awọn ohun elo ati iṣẹ.

Nípa mímú ìrírí àpò owó sunwọ̀n sí i, Pepper Sync ń fún gbogbo ètò ìsálú Zcash lókun.

### Bẹrẹ: gbígbé pẹlú Zingo 2.0

1. Ṣe igbasilẹ Iwe-owo naa - Gba ẹya ti o tọ lati oju-iwe [Zingo GitHub fifunni](https://github.com/zingolabs/zingolib)
2. Ṣeto apamọwọ rẹ - ṣẹda tuntun kan tabi mu pada lati inu gbolohun ọrọ irugbin ti o wa tẹlẹ. [Zingo 2.0 pẹlu Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Jẹ ki Pepper Sync Ṣiṣẹ - Wo awọn afihan ilọsiwaju bi imudojuiwọn apamọwọ rẹ. [Pepper Synch Run](https://x.com/ZingoLabs/status/1961871338441724191)
4. Bẹrẹ Lilo Zcash - Fi ati gba awọn ohun elo ti o ni aabo ZEC lẹsẹkẹsẹ bi isọdọkan ba pari.
5. Rọ́ra nípa àwọn ìkórìíra - Bí app bá ti pa tàbí tí àjápò ba já, Pepper Sync yóò tún padà bẹ̀rẹ̀ nídàá.

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

**Tẹ́jú Pepper Sync gẹ́gẹ́ bí àpò owó ní ẹ̀tọ́ tirè rẹ**. Pepper sync ni ẹrọ ìsopọ nínú Zingo! àpò, kìí ṣe ohun èlò tó yàtọ̀ síra. O fi Zingo sori; Peppersync jẹ èyí tí ó ń ṣiṣẹ lábẹ́ rèé.

** Ifá pé ìsínkálọ́pọ̀ tí ó yá jù túmọ̀ sí àṣírí tó rẹlẹ̀ ju**. Ìyára náà wá láti bí a ṣe ń mú data àdìpọ̀, bó o ti pàṣẹ fún un àti báa fi pamọ́ sínú ìṣàpamọ́, kì í ṣe láti ṣí àwọn ìmọ̀ síwájú síi payá. Àwọn ìdánwò dídènà wà ní aṣiri títí dé àsìkò kan.

**Ti o ba ro pe o gbọdọ wa ni ibamu daradara ṣaaju ki o to lo**. Ṣiṣowo ṣaaju iṣọkan ti pari jẹ ọkan ninu awọn ẹya akọle ti Pepper Sync, nitorinaa iwọ ko nilo lati duro fun apamọwọ naa lati de opin pqp.

## FAQ - Àwọn ìbéèrè tí a sábà máa ń béèrè

Q: Ṣe mo ní láti tún àyẹ̀wò ṣe nígbàkigbà tí mo bá ṣí apamọwọ náà?

A: Rárá. Pepper Sync ń pa ìlọsíwájú mọ́, nítorí náà o máa ṣe àtúnṣe láti ibi tó kẹyìn nìkan ni.

**Ibeere: Kí ló máa ṣẹlẹ̀ tí ayélujára mi bá jáwọ́?**

A: Ṣiṣakojọpọ duro ati tẹsiwaju nigbamii laisi tun bẹrẹ.

Q: Ṣé ìpamọ́ mi wà ní ààbò nígbà tí mo bá ń ṣe ìṣàmúlò?

A: Bẹ́ẹ̀ ni. Àwọn ìnáwó tí a fi ààbò ṣe máa ń jẹ́ àṣírí pátápátá.

Q: Bawo ni gun ti akọkọ isọdọkan gba? **

Ìdáhùn: Lọ́pọ̀ ìgbà, ó máa ń tó ìṣẹ́jú dípò wákàtí. Ó sinmi lórí ohun èlò àti Íńtánẹ́ẹ̀tì tí o ní.

Ìbéèrè: Ṣé mo lè lo àpò-ìpamọ́ kí ìfọwọ̀sopọ̀ tó parí?

A: Bẹẹni. Pepper Sync ṣe atilẹyin inawo ṣaaju ki isọdọkan ti pari, nitorinaa o ko nilo lati duro fun apamọwọ naa lati de opin pqp.

## Ìparí Ọ̀rọ̀

Pẹlu Zingo 2.0 Pepper Sync, isọdọkan ko si ni aaye irora nla ti awọn apamọwọ aabo. O jẹ bayi iyara, iduroṣinṣin ati ore-olumulo, fifun idiwọ fun awọn tuntun ati ṣiṣe lilo ojoojumọ diẹ sii wulo.

fún àwọn oníṣe, ó túmọ̀ sí dídúró tí kò tó nǹkan àti ìpamọ́sí púpọ̀. fún àwọn olùdàgbàsókè, ó tọ́ka sí ìpìlẹ̀ lílágbára láti kọlé lé lórí. fún ètò ìṣètò Zcash, ìgbésẹ̀ mìíràn ni èyí jẹ́ ní títúbọ̀ ṣe kí àdáwó-ààbò wà lárọ̀ọ́wọ́tó gbogbo ènìyàn.

Zingo 2.0 pẹlu Pepper Sync kì í ṣe àtúnṣe lásán; ó jẹ ìyípadà síwájú fún ẹ̀rọ-ìpamọ́, tí a lè lò.

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Ìṣètò Ìpínwó Zcash](/zcash-tech/zcash-wallet-syncing)  bí ìfiwéra àpò ṣe ń ṣiṣẹ́ ní gbogbo ètò ìṣẹ̀dá Zcash.
- [Àwọn Ìpín Lightwallet](/zcash-tech/lightwallet-nodes)  ìlé-iṣẹ́ tí àpò owó tó rọrùn bíi Zingo ń bá lò.
- [Zaino] Èmi náà sì ni.](/zcash-tech/zaino)  àtòjọ ìsọfúnni tí ẹgbẹ́ Zingo ṣe.
- [Àwọn àpamọ́wọ́n](/wallets)  gbogbo ìwé ìsọfúnni nípa àwọn àpò Zcash àti ohun tí wọ́n ní.

## Mímọ Sí I

- [Zingo! Àpamọ́ GitHub](https://github.com/zingolabs/zingolib)
- [Ìjọ Ìjùmọ̀ Zcash](https://forum.zcashcommunity.com/)
- Àwọn Ìkéde Ìjọba - [Ìwé Twitter Zingo Labs](https://twitter.com/ZingoLabs)

___
___

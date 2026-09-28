<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ààbò Lẹ́yìn-Ìwọ̀n-Owó ní Zcash

## TL;DR

- Àwọn kọ̀ǹpútà Quantum jẹ́ ewu ọjọ́ iwájú nítorí wọ́n lè fọ́ àwọn ìkọ̀kọ̀ gbogbogbò tí àwọn blockchains ń lò lónìí.
- "Post-quantum" túmọ̀ sí ìkọ̀kọ̀ tí ó ń ṣiṣẹ́ lórí àwọn kọ̀ǹpútà lásán ṣùgbọ́n tí a ṣe láti dènà àwọn ìkọlù láti ọ̀dọ̀ àwọn kọ̀ǹpútà quantum ọjọ́ iwájú.
- Zcash kò tíì dé ìpele-pípé lónìí.
- Zcash ti a daabobo dinku iye data iṣowo gbogbogbo ti awọn olujako iwaju le kẹkọọ, ṣugbọn lilo aabo ko jẹ kanna bi resistance kuatomu kikun.
- Zcash ń múra sílẹ̀ nípasẹ̀ ìwádìí, àwọn ZIP, àti àwọn àbá ìgbéga bíi ZIP 2005 àti Project Tachyon.
- Ìrìnàjò lẹ́yìn-ìwọ̀n-ọrọ̀ gbọ́dọ̀ dáàbò bo owó, ìpamọ́, àpò owó, pàṣípààrọ̀ owó, àti àwọn òfin ìfohùnṣọ̀kan ní àkókò kan náà.

Fun ohun ti Ironwood yipada ati ipo ọjọ ti nkan kọọkan, wo [Ṣé Zcash Post-Quantum ni?](/zcash-tech/is-zcash-post-quantum).

## Kí ni Kọ́mútímù Kọ́mútímù?

Kọ̀ǹpútà déédéé máa ń tọ́jú ìwífún gẹ́gẹ́ bí bit. Ìwọ̀n kọ̀ọ̀kan jẹ́ yálà `0` or `1`.

Kọ̀ǹpútà quantum kan máa ń lo àwọn ìdìpọ̀ quantum, tí a ń pè ní qubits. Àwọn algoridimu pàtàkì kan lè lo Qubits tí ó máa ń yanjú àwọn ìṣòro ìṣirò kíákíá ju àwọn kọ̀ǹpútà déédéé lọ.

Iyẹn kò túmọ̀ sí pé kọ̀ǹpútà quantum yára ju gbogbo nǹkan lọ. Ewu náà ṣe pàtàkì. Àwọn ìṣòro ìṣirò kan sinmi lórí àwọn ìṣòro ìṣirò tó ṣòro fún àwọn kọ̀ǹpútà déédéé ṣùgbọ́n ó rọrùn fún kọ̀ǹpútà quantum tó tóbi tó.

Fún àwọn blockchains, àpẹẹrẹ pàtàkì jùlọ ni ìkọ̀kọ̀-kíkọ̀-kíkọ̀-sí-public. Àwọn kọ́kọ́rọ́ àti ìfọwọ́sowọ́pọ̀ gbogbogbò ni a lò láti fi hàn pé a gbà láàyè fún olùlò láti ná owó.

## Kílódé tí a fi ń tọ́jú Blockchain

Àwọn Blockchain ń lo ìkọ̀kọ̀ fún ọ̀pọ̀lọpọ̀ iṣẹ́:

| Irinṣẹ́ ìkọ̀wé-kíríǹkì | Ohun tí ó ṣe | Ipa kuatomu |
| --- | --- | --- |
| Àwọn ìfọwọ́sowọ́pọ̀ oní-nọ́ńbà | Fi hàn pé ẹni tó ni ilé náà fún ni àṣẹ láti náwó | Ewu giga fun awọn eto elliptic-curve ti o wọpọ |
| Àwọn iṣẹ́ Hash | Kọ awọn adirẹsi, awọn ileri, awọn igi Merkle, ati awọn italaya | Ewu kekere, ṣugbọn awọn ala aabo ṣe pataki |
| Àwọn ẹ̀rí àìmọ̀ | Fi hàn pé àwọn ìṣòwò tí a dáàbò bo wúlò láìsí àwọn àlàyé tó wà nínú rẹ̀ | Da lori eto ẹri ati awọn arosinu |
| Àdéhùn pàtàkì | Ṣe iranlọwọ fun awọn apamọwọ lati fi data akọsilẹ pamọ fun awọn olugba | Ó nílò àtúnyẹ̀wò kíákíá lábẹ́ àpẹẹrẹ ewu kuatomu |

Kọ̀ǹpútà quantum tó lágbára tó lè halẹ̀ mọ́ ọ̀pọ̀lọpọ̀ ètò ìfọwọ́sowọ́pọ̀ tí a ń lò lónìí, títí kan àwọn ìfọwọ́sowọ́pọ̀ onígun elliptic. Èyí ṣe pàtàkì nítorí pé ìfọwọ́sowọ́pọ̀ ni ohun tó ń jẹ́ kí nẹ́tíwọ́ọ̀kì mọ̀ pé ìṣòwò kan jẹ́ èyí tí a fọwọ́ sí nípasẹ̀ kọ́kọ́rọ́ ọ̀tún.

Àwọn iṣẹ́ Hash yàtọ̀ síra. Algorithm Grover lè mú kí ìwádìí agbára brute yára, ṣùgbọ́n kò ba àwọn iṣẹ́ hash jẹ́ ní ọ̀nà tààrà kan náà. Àwọn àlàfo ààbò tó tóbi jù lè ran lọ́wọ́.

## Kí ni ìkọ̀kọ̀ Post-Quantum?

A ṣe àgbékalẹ̀ ìkọ̀kọ̀ post-quantum láti dáàbò bo àwọn kọ̀ǹpútà déédéé àti àwọn kọ̀ǹpútà quantum ọjọ́ iwájú.

Kò túmọ̀ sí pé ìkọ̀kọ̀ kọ̀ǹpútà lo kọ̀ǹpútà quantum. Ó túmọ̀ sí pé ètò náà dá lórí onírúurú ìṣòro ìṣirò líle.

Ni ọdun 2024, NIST tu awọn ipele post-quantum akọkọ ti a pari jade:

- **ML-KEM** fún ìdásílẹ̀ kọ́kọ́rọ́
- **ML-DSA** fún àwọn ìfọwọ́sowọ́pọ̀ oní-nọ́ńbà
- **SLH-DSA** fún àwọn ìfọwọ́sowọ́pọ̀ oní-nọ́ńbà tí a fi hash ṣe

Àwọn ìlànà wọ̀nyí jẹ́ àmì pàtàkì, ṣùgbọ́n blockchain kò le ṣe àyípadà algorithm kan fún òmíràn ní alẹ́ kan. Àwọn òfin ìfọwọ́sowọ́pọ̀, àpò owó, àpò owó ohun èlò, ìwọ̀n ìṣòwò, owó tí a ń gbà, àti ìpamọ́ gbogbo wọn ni a gbọ́dọ̀ gbé yẹ̀wò.

## Báwo ni ewu kuatomu ṣe ń farahàn lórí ẹ̀wọ̀n

Ọ̀nà tó rọrùn láti ronú nípa ewu náà ni:

1. Olùlò kan ṣẹ̀dá bata bọtini kan.
2. Kọ́kọ́rọ́ gbogbogbò tàbí ìwífún ìfọwọ́sí lè hàn lórí ẹ̀wọ̀n.
3. Ẹni tí ó bá fẹ́ lu quantum ní ọjọ́ iwájú lè lo àwọn ohun èlò ìta gbangba yẹn láti kọ́ kọ́kọ́rọ́ ìkọ̀kọ̀ náà.
4. Tí kọ́kọ́rọ́ yẹn bá ṣì ń darí owó, wọ́n lè wà nínú ewu.

Àwọn ẹ̀rọ blockchain tí ó hàn gbangba máa ń fi ọ̀pọ̀lọpọ̀ ìwífún hàn nípa ìṣètò. Àwọn àdírẹ́sì, iye owó, àti àwọn ìjápọ̀ ìṣòwò jẹ́ ti gbogbo ènìyàn. Àwọn ohun èlò pàtàkì gbogbo ènìyàn tún lè hàn nígbà tí a bá ná owó.

Èyí ni ọ̀kan lára ìdí tí àtúnlo àdírẹ́sì fi léwu. Àtúnlo fún àwọn olùwòran ní ìwífún púpọ̀ sí i láti so pọ̀ lónìí, ó sì fún àwọn olùkọlù ọjọ́ iwájú ní àwọn ohun ìtàn púpọ̀ sí i láti ṣàyẹ̀wò.

## Kini o yatọ si Zcash?

Zcash ṣe atilẹyin fun awọn iṣowo ti o han gbangba ati ti a daabobo.

Zcash Transparent n ṣiṣẹ bi lilo blockchain gbogbogbo ti Bitcoin. Awọn adirẹsi, iye owo, ati awọn ibatan iṣowo han gbangba.

Zcash tí a dáàbò bo yàtọ̀. Àwọn ìṣòwò tí a dáàbò bo máa ń lo ẹ̀rí àìmọ̀ kí nẹ́tíwọ́ọ̀kì lè fìdí rẹ̀ múlẹ̀ pé ìṣòwò kan tẹ̀lé àwọn òfin láìsí fífi olùránṣẹ́, olùgbà, tàbí iye owó hàn.

Èyí fún Zcash ní àǹfààní ìpamọ́ pàtàkì kan:

- A ti tẹ data iṣowo diẹ sii fun gbogbo eniyan lati rii.
- Àwọn olùlò yẹra fún ṣíṣẹ̀dá àwòrán ìsanwó gbogbogbò nígbà tí wọ́n bá wà ní ààbò.
- Àwọn olùwòran ọjọ́ iwájú kò ní ìtàn ìnáwó gbogbogbò tí a lè ṣàyẹ̀wò.
- Ìfihàn àṣàyàn lè ṣẹlẹ̀ nípasẹ̀ àwọn kọ́kọ́rọ́ wíwo dípò àwọn àkọsílẹ̀ gbogbogbòò.

Ṣùgbọ́n Zcash tí a dáàbò bo kì í ṣe lẹ́yìn ìsanwó. Àwọn adágún tí a dáàbò bo ṣì gbára lé àwọn àbá ìkọ̀kọ̀. Ìfọwọ́sowọ́pọ̀ ìnáwó, àkọsílẹ̀ àwọn ìlérí, àwọn ohun tí kò ṣeé yẹ̀ sílẹ̀, àwọn ètò ìdánilójú, ìfọwọ́sowọ́pọ̀, àti àwọn kọ́kọ́rọ́ àpò owó gbogbo nílò àtúnyẹ̀wò pẹ̀lẹ́pẹ̀lẹ́.

Ẹ̀yà kúkúrú náà:

> Lílo ààbò dín ìfarahàn gbogbogbò kù, ṣùgbọ́n Zcash ṣì nílò àtúnṣe lẹ́yìn-ìwọ̀n.

## Máàpù Ewu Zcash

| Agbègbè | Àlàyé olùbẹ̀rẹ̀ | Àníyàn lẹ́yìn-ìwọ̀n-owó |
| --- | --- | --- |
| Àwọn àdírẹ́sì tí ó hàn gbangba | Awọn adirẹsi gbogbogbo ati aworan iṣowo gbogbo eniyan | Àwọn ewu tó jọra sí àwọn blockchain mìíràn tó hàn gbangba |
| Na àṣẹ ìnáwó | Ẹ̀rí pé a gba olùlò láàyè láti náwó | Àwọn ètò ìfọwọ́sowọ́pọ̀ lè nílò ìyípadà tàbí ìṣípòpadà |
| Àwọn àkọsílẹ̀ tí a dáàbò bò | Àwọn àkọsílẹ̀ iye ara ẹni nínú àwọn adágún tí a dáàbò bò | Àwọn ohun èlò kan lè nílò àwọn àbá tuntun tàbí àwọn irinṣẹ́ ìgbàpadà |
| zk-SNARKs | Àwọn ẹ̀rí tó fi hàn pé àwọn ìṣòwò tó ní ààbò wúlò | Àwọn àbá ètò ẹ̀rí nílò àtúnyẹ̀wò |
| Ṣíṣàyẹ̀wò Àpò Owó | Báwo ni àwọn àpò owó ṣe ń rí àti ṣe ń yí àwọn àkọsílẹ̀ tí a gbà padà | Àdéhùn pàtàkì àti ìfipamọ́ àkọsílẹ̀ nílò àtúnyẹ̀wò |
| Ìṣílọ | Gbigbe awọn owo si cryptography ailewu | Ó gbọ́dọ̀ yẹra fún pípadánù owó àti jíjò ìpamọ́ |

## Báwo ni Zcash ṣe ń ṣẹ̀dá

### Zcash ní ilana igbesoke nẹtiwọọki kan

Zcash ti yi eto ìkọ̀kọ̀ rẹ̀ pada tẹ́lẹ̀. Sapling mú kí àwọn ìṣòwò tí a dáàbò bo rọrùn láti lò. NU5 ṣe àgbékalẹ̀ Orchard, Unified Addresses, àti Halo 2.

Èyí ṣe pàtàkì nítorí pé ìmúrasílẹ̀ lẹ́yìn-ìwọ̀n kìí ṣe àtúnṣe sọ́fítíwèlì oní-ìlà kan. Ó nílò àtúnṣe nẹ́tíwọ́ọ̀kì tí a ṣètò, àyípadà àpò owó, àyẹ̀wò, àti àkókò fún àwọn olùlò láti ṣí lọ sí ibòmíràn.

Àwọn àtúnṣe Zcash tó ti kọjá fihàn pé àyíká náà ní ìrírí láti ìgbà àtijọ́ sí àwọn àwòṣe tuntun.

### Àwọn Èrò Àtijọ́ Nínú Halo àti Orchard Dínkù

Orchard, adágún òde òní tí a fi ààbò bo Zcash's, ló ń lo Halo 2. Ìdàgbàsókè pàtàkì kan ni pé Halo ti mú àìní fún ètò ìgbẹ́kẹ̀lé fún ètò ìdáàbòbò Orchard.

Iyẹn kìí ṣe ohun kan náà pẹ̀lú ààbò post-quantum. Ó ṣì ṣe pàtàkì nítorí ó fihàn pé Zcash lè rọ́pò àwọn ohun èlò ìkọ́lé pàtàkì nígbà tí àwọn àwòrán tó dára jù bá wà.

### ZIP 2005 Fojusi lori Imupadabọsipo Quantum

Àkọlé ZIP 2005 ni "Orchard Quantum Recoverability." Ó dábàá àwọn àyípadà tí a ṣe láti ran àwọn olùlò Orchard lọ́wọ́ láti gba owó padà tàbí láti ṣí lọ síbòmíràn tí àwọn ìkọlù quantum lòdì sí àwọn àbá àtijọ́ bá di ohun tí ó wúlò.

Àtúnṣe kò dọ́gba pẹ̀lú ààbò post-quantum kíkún. Ó kéré sí i, ó sì tún wúlò:

- Ààbò ìpamọ́ lẹ́yìn-ìwọ̀n ...
- Àtúnṣe ara ẹni fún àwọn olùlò olóòótọ́ ní ọ̀nà tó dára jù tí ìkọ̀sílẹ̀ àtijọ́ bá di èyí tí kò léwu.

Fún àwọn olùbẹ̀rẹ̀, ẹ ronú nípa èyí gẹ́gẹ́ bí ètò ìjádelọ pajawiri. Kì í rọ́pò gbogbo ilé náà, ṣùgbọ́n ó ń ran àwọn ènìyàn lọ́wọ́ láti jáde kúrò ní yàrá àtijọ́ láìléwu tí ìdènà àtijọ́ náà bá di aláìlera.

### Iṣẹ́ Tachyon Ń Wo Àwọn Ìmúdàgbàsókè Ìlànà Tóbi Jù

Iṣẹ́ àgbékalẹ̀ Tachyon jẹ́ àtúnṣe Zcash tí a dámọ̀ràn tí ó dá lórí ìwọ̀n, ìṣọ̀kan, àti ìdàgbàsókè ìpínlẹ̀. Ojú òpó wẹ́ẹ̀bù gbogbogbòò rẹ̀ sọ pé àbá náà fẹ́ dín àwọn ìṣòwò kù, dín ìdàgbàsókè ìpínlẹ̀ ìfìdí múlẹ̀ kù, àti láti gba ìpamọ́ lẹ́yìn-ìwọ̀n gẹ́gẹ́ bí àbájáde ẹ̀gbẹ́.

Nítorí pé Tachyon jẹ́ àbá, ó ṣì sinmi lórí iṣẹ́ ẹ̀rọ, àtúnyẹ̀wò, àti ìfọwọ́sowọ́pọ̀ àwùjọ kí a tó bẹ̀rẹ̀ sí í ṣiṣẹ́. Ó dára jù láti lóye rẹ̀ gẹ́gẹ́ bí apá kan nínú ìwádìí àti ìtọ́sọ́nà ìgbéga Zcash's, kì í ṣe gẹ́gẹ́ bí ohun tí àwọn olùlò ti ní lónìí.

### Iwadi ati Awọn Ilana n lọ siwaju

Ayé ìkọ̀kọ̀ tó gbòòrò náà tún ń lọ síwájú. Àwọn ìlànà post-quantum ti NIST fún àwọn olùṣe iṣẹ́ ní àwọn ìpìlẹ̀ tó lágbára fún ìfọwọ́sowọ́pọ̀ àti ìdásílẹ̀ pàtàkì. Àwọn olùwádìí tí kò ní ìmọ̀ ń tẹ̀síwájú láti kẹ́kọ̀ọ́ nípa àwọn ètò ẹ̀rí tí ó lè dúró lábẹ́ àwọn àbá ìkùùn.

Zcash le ṣe anfaani lati inu iṣẹ yẹn, ṣugbọn o tun ni lati ṣe atunṣe rẹ si blockchain ti o tọju asiri.

## Awọn ọna igbesoke ti o ṣeeṣe ni ojo iwaju

### Àṣẹ Ìnáwó Lẹ́yìn-Kọ́mbà

Zcash le nilo aṣẹ inawo nikẹhin ti ko gbẹkẹle awọn eto ibuwọlu ti o le ṣe ipalara fun kuatomu.

Èyí lè lo àwọn àmì ìfọwọ́sowọ́pọ̀ lẹ́yìn-ìwọ̀n, àmì ìfọwọ́sowọ́pọ̀, tàbí àwòrán mìíràn. Apẹẹrẹ ìfọwọ́sowọ́pọ̀ máa ń lo àwọn àyẹ̀wò ìṣàyẹ̀wò àti ti ìyípadà nígbà àkókò ìyípadà, nítorí náà ètò náà kò sinmi lórí èrò kan ṣoṣo.

Ìpèníjà náà ni ìwọ̀n àti iye owó. Àwọn ìfọwọ́sowọ́pọ̀ lẹ́yìn-ìwọ̀n le tóbi ju àwọn ìfọwọ́sowọ́pọ̀ òde òní lọ, èyí tí ó ní ipa lórí ìwọ̀n ìṣòwò, ìwọ̀n ìlọ́po méjì, owó oṣù, àwọn àpò ìfọ́wọ́pamọ́ alágbèéká, àti àwọn àpò ìfọ́wọ́pamọ́ ohun èlò.

### Àdírẹ́sì Tuntun àti Àwọn Fọ́ọ̀mù Pàtàkì

Ìkọ̀sílẹ̀ tuntun sábà máa ń nílò àwọn kọ́kọ́rọ́ àti àdírẹ́sì tuntun. Àwọn olùlò yóò nílò ọ̀nà ìṣíkiri tí ó ṣe kedere láti àwọn ọ̀nà ìkọ̀wé àtijọ́ sí àwọn ọ̀nà ìkọ̀wé tí ó ní ààbò.

Ìṣíkiri náà yẹ kí ó rọrùn nínú àpò owó. Ọ̀pọ̀lọpọ̀ àwọn olùlò kò gbọ́dọ̀ lóye gbogbo kúlẹ̀kúlẹ̀ ìkọ̀kọ̀ kí wọ́n tó lè wà ní ààbò.

### Ìṣíkiri-Ààbò

Ìṣíkiri jẹ́ ohun tó ṣe pàtàkì jùlọ fún Zcash. Tí ọ̀pọ̀ àwọn olùlò bá ń gbé owó láti inú àwọn adágún àtijọ́ sí àwọn adágún tuntun ní àwọn àpẹẹrẹ tó hàn gbangba, ìṣíkiri náà fúnra rẹ̀ lè máa yọ ìwífún jáde.

Ètò ìrìnàjò tó dára gbọ́dọ̀ dáàbò bo:

- Awọn owo olumulo
- Ìpamọ́ olùlò
- Ibamu pẹlu apamọwọ
- Àtìlẹ́yìn pàṣípààrọ̀
- Atilẹyin apamọwọ ohun elo
- Ààbò ìfọwọ́sowọ́pọ̀ nẹ́tíwọ́ọ̀kì

### Àtúnyẹ̀wò Ètò Ìdánilójú Lẹ́yìn-Ìṣirò

Rírọ́pò àwọn ìfọwọ́sowọ́pọ̀ kò tó. Apẹrẹ ààbò Zcash's tún sinmi lórí ẹ̀rí àìmọ̀ àti àwọn ìlérí.

Iṣẹ́ ọjọ́ iwájú lè nílò àtúnyẹ̀wò tàbí rọ́pò:

- awọn iṣeduro zk-SNARK
- Àwọn ìlérí Polynomial
- Àwọn ìpèníjà Fiat-Shamir
- Ṣe àkíyèsí àwọn ìlérí
- Ìkọ́lé nullifia
- Àwọn àbájáde igi Merkle
- Ṣe akiyesi ìfipamọ́ àti ìwà bọtini wíwo

Àwọn ẹ̀yà ara kan lè jẹ́ ohun tí a lè gbà pẹ̀lú àwọn pàrámítà tí a ti ṣàtúnṣe. Àwọn ẹ̀yà ara mìíràn lè nílò àwọn àwòrán tuntun.

## Àwọn Àpẹẹrẹ Olùbẹ̀rẹ̀

### Àpẹẹrẹ 1: Ìdènà Àtijọ́

Fojú inú wo àpótí ààbò kan tí ó ní ìdènà tó lágbára lónìí. Ohun èlò tuntun tí a ṣe ní ọjọ́ iwájú lè ṣí ìdènà àtijọ́ náà kíákíá.

Àkọsílẹ̀ ìkọ̀sílẹ̀ lẹ́yìn-ìwọ̀n dà bí ìgbà tí a fi àwòrán tí a kò retí pé irinṣẹ́ tuntun náà yóò fọ́ rọ́pò titiipa náà.

Fún blockchain, yíyípadà titiipa náà ṣòro nítorí pé gbogbo àpò owó, nódù, pàṣípààrọ̀, àti ẹ̀rọ hardware gbọ́dọ̀ lóye àwòrán tuntun náà.

### Àpẹẹrẹ 2: Àpótí Ìwé Ìsanwó Gbogbogbò

Àwọn ìwífún blockchain tí ó hàn gbangba dà bí fífi gbogbo ìwé ẹ̀rí ìsanwó sínú àpótí gbogbogbòò títí láé. Bí ẹnikẹ́ni kò bá tilẹ̀ lè ka gbogbo ìlànà lónìí, àwọn irinṣẹ́ ọjọ́ iwájú lè kọ́ ẹ̀kọ́ sí i nígbà tó bá yá.

Ààbò Zcash gbìyànjú láti yẹra fún títẹ̀ àwọn ìwé ẹ̀rí ìsanwó wọ̀nyẹn jáde ní àkọ́kọ́. Èyí ń ran ìpamọ́ ìgbà pípẹ́ lọ́wọ́, ṣùgbọ́n ìdènà tí ó ń dáàbò bo ètò ààbò náà ṣì ní láti ṣe àtúnyẹ̀wò fún ọjọ́ iwájú tó dára.

### Àpẹẹrẹ 3: Ètò Ìjáde

Àtúnṣe ara ẹni dà bí ìgbà tí a bá ń gbèrò ọ̀nà àbájáde kí iná tó bẹ̀rẹ̀. O nírètí pé o kò ní nílò rẹ̀, àmọ́ ó dára jù láti ṣe é ní kùtùkùtù ju nígbà pàjáwìrì lọ.

ZIP 2005 bá èrò yìí mu fún àwọn àkọsílẹ̀ Orchard.

## Ohun ti Awọn olumulo le Ṣe Loni

Àwọn olùlò kò nílò láti bẹ̀rù. Àwọn kọ̀ǹpútà quantum gbogbogbòò tó tóbi tó lè fọ́ ìkọ̀ǹpútà blockchain tí a ti gbé kalẹ̀ kò sí lónìí.

Àwọn ìwà rere ṣì ń ranni lọ́wọ́:

- Fẹ́ràn lílo Zcash tí a dáàbò bo nígbà tí ó bá ṣeé ṣe.
- Yẹra fún àtúnlo àwọn àdírẹ́sì.
- Jẹ́ kí àwọn àpò owó máa wà ní àtúnṣe.
- Tẹ̀lé àwọn ìkéde ìdàgbàsókè nẹ́tíwọ́ọ̀kì Zcash.
- Ṣọ́ra fún àwọn ìtọ́sọ́nà fún àwọn ZIP àti àpò owó nípa bí a ṣe lè mú padà tàbí ṣíṣí lọ.
- Má ṣe rò pé ìgbòkègbodò tí ó ṣe kedere jẹ́ ìkọ̀kọ̀.
- Má ṣe gbé owó kiri nítorí àhesọ; dúró de ìtọ́sọ́nà tó ṣe kedere láti ọ̀dọ̀ àwọn olùgbékalẹ̀ Zcash àti àwọn ẹgbẹ́ àpò owó tí a gbẹ́kẹ̀lé.

## Àwọn ìpèníjà

Àwọn àtúnṣe lẹ́yìn-ìwọ̀n jẹ́ ohun tó ṣòro fún gbogbo blockchain.

Awọn italaya ti o wọpọ pẹlu:

- Awọn bọtini ati awọn ibuwọlu ti o tobi ju
- Awọn iṣowo nla
- Awọn idiyele idanwo ti o ga julọ
- Lilo bandiwidi diẹ sii
- Awọn ayẹwo aabo tuntun
- Atilẹyin apamọwọ ohun elo
- Iṣẹ́ àpò owó alagbeka
- Ìṣọ̀kan pàṣípààrọ̀ àti ìtọ́jú
- Àwọn ìpamọ́ tí ń jó nígbà ìṣíkiri
- Àdéhùn àwùjọ lórí àwọn àyípadà ìfohùnṣọ̀kan

Fún Zcash, apá tó ṣòro jùlọ kì í ṣe pé kí owó náà ṣeé ná nìkan ni. Apá tó ṣòro jùlọ ni kí owó náà ṣeé ná nígbà tí a bá ń pa àṣírí mọ́, èyí tó mú kí Zcash yàtọ̀.

## Àkótán

Àwọn kọ̀ǹpútà Quantum lè ní ewu ìkọ̀ǹpútà kan tí àwọn blockchain ń lò nígbẹ̀yìn gbẹ́yín. Ìkọ̀ǹpútà post-quantum ni ìdáhùn pípẹ́, ṣùgbọ́n ó gbọ́dọ̀ wà ní ìṣọ́ra.

Zcash kò tíì dé ìpele-ìpele-ìpele mọ́ lónìí. Síbẹ̀síbẹ̀, Zcash ní àwọn agbára tó wúlò: àwọn ìṣòwò tí a dáàbò bo dín ìfarahàn gbogbo ènìyàn kù, nẹ́tíwọ́ọ̀kì náà ní ìtàn àwọn àtúnṣe ìkọ̀kọ̀, àti ìwádìí lọ́wọ́lọ́wọ́ bíi ZIP 2005 àti Project Tachyon ti wà fún àwọn ewu quantum lọ́jọ́ iwájú.

Fún àwọn olùbẹ̀rẹ̀, èrò pàtàkì náà rọrùn: ìpamọ́ lónìí dín ìfarahàn dátà lọ́jọ́ iwájú kù, àti àwọn àtúnṣe oníṣọ̀ọ́ra lè ran Zcash lọ́wọ́ láti gbéra sí ààbò tó lágbára ní àkókò quantum láìsí ìyípadà lílò.

## Àwọn ojú ìwé tó jọra

- [Ṣé Zcash Post-Quantum ni?](/zcash-tech/is-zcash-post-quantum) - Ohun ti Ironwood yipada, ohun ti o tun han, ati tabili ipo ọjọ kan
- [Àwọn Adágún Tí A Dáàbò Bo](/using-zcash/shielded-pools) - Báwo ni àwọn ìṣòwò tí a fi ààbò Zcash ṣe ń dáàbò bo àwọn àlàyé ìṣòwò náà
- [Halo](/zcash-tech/halo) - Eto ẹri Zcash's laisi eto ti o gbẹkẹle
- [Àwọn ZKP àti ZK-SNARKS](/zcash-tech/zk-snarks) - Bawo ni awọn ẹri imọ-odo ṣe n ṣiṣẹ ni Zcash
- [Àwọn Kọ́kọ́rọ́ Wíwo](/zcash-tech/viewing-keys) - Bawo ni ifihan yiyan ṣe n ṣiṣẹ fun Zcash ti a daabobo
- [Àwọn Ohun Ìní tí a fi ààbò Zcash ṣe](/zcash-tech/zcash-shielded-assets) - Awọn ohun-ini aabo ọjọ iwaju ati atilẹyin dukia ikọkọ
- [Ìpamọ́ gẹ́gẹ́ bí Ìlànà Pàtàkì](/privacy/privacy-as-a-core-principle) - Idi ti asiri eto-owo fi ṣe pataki

## Àwọn ìtọ́kasí

- [NIST: Àwọn ìlànà ìfipamọ́ lẹ́yìn-ìwọ̀n àkọ́kọ́ tí a parí](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Iṣẹ́ Àgbékalẹ̀ Ìkọ̀kọ̀ NIST Post-Quantum](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Àtúnṣe Orchard Quantum](https://zips.z.cash/zip-2005)
- [Iṣẹ́ Tachyon](https://tachyon.z.cash/)
- [Ìlànà Ìlànà Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Ìwé Halo 2](https://zcash.github.io/halo2/)

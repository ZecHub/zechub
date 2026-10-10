<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Idibo Ẹni tó ni èrè owó tí a dáàbò bo

> Ní oṣù kẹjọ ọdún 2026, Zcash ṣe ìwádìí kan tí ó ní owó tí ó wà nínú rẹ̀ níbi tí àwọn ìdìbò náà ti wà ní ìkọ̀kọ̀, tí gbogbo àròpọ̀ ìkẹ́yìn nìkan ni a sì fi hàn, nípa lílo ìlànà ìdìbò tí a dáàbò bo tí Valar Group.

Ohun tí o máa gbà: bí a ṣe lè fi iye tí o ní ní ZEC, tí o fi pamọ́, tí o sì ṣì ń kà á dáadáa hàn nínú ìdìbò, láìsí ẹnikẹ́ni tó mọ̀ nípa bí o ṣe dìbò tàbí iye tí o ní.

Ìdìbò àwọn oníṣòwò owó tí a dáàbò bo jẹ́ kí àwọn oníṣòwò Zcash dìbò lórí àwọn ìbéèrè nípa ètò-ẹ̀rọ nípa lílo ZEC. Kò sí ẹni tí ó mọ ohun tí ẹnìkan dìbò tàbí iye tí ZEC wọn ní, síbẹ̀ ẹnikẹ́ni lè ṣe àyẹ̀wò pé iye náà péye. Ó ń ṣiṣẹ́ lórí ẹ̀wọ̀n ìdìbò tí Valar Group, yàtọ̀ sí Zcash mainnet, kí owó gidi rẹ má baà yí padà. Fún bí Zcash ṣe ń ṣe ìpinnu ní gbogbogbòò, wo [Àkótán Ìnáwó àti Ìṣàkóso Zcash](../zcash-community/zcash-governance)Ojú ìwé yìí dá lórí ìlànà ìdìbò ìkọ̀kọ̀ lásán.

Tuntun sí Zcash? Bẹ̀rẹ̀ pẹ̀lú [Kí ni ZEC àti Zcash](../start-here/what-is-zec-and-zcash), [Àwọn Adágún Tí A Dáàbò Bo](../using-zcash/shielded-pools), àti [zk-SNARKs](../zcash-tech/zk-snarks), lẹ́yìn náà, padà wá síbí.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Kí nìdí tí ìdìbò ìkọ̀kọ̀ fi ṣòro

Idibo oni-owo to dara fẹ nkan mẹrin ni ẹẹkan, ati awọn ọna ti o han gbangba lati jẹ ki wọn ja ara wọn.

1. Ìwúwo nípa igi, nítorí náà dídi ZEC mú pọ̀ sí i gbé ìwúwo púpọ̀ sí i.
2. Ìpamọ́ tí o bá fẹ́, kí ẹnikẹ́ni má baà mọ bí o ṣe dìbò.
3. Ìpamọ́ ìwọ́ntúnwọ̀nsì, nítorí náà kò sí ẹni tí ó mọ iye tí o ní ZEC.
4. Iye ti o tọ, ti a le ṣayẹwo ti ẹnikẹni le ṣayẹwo.

Láti fi ìwọ̀nba ara rẹ hàn, ó dà bíi pé o nílò ìwọ̀ntúnwọ̀nsì gbogbo ènìyàn. Láti ka ìwé ìdìbò, ó dà bíi pé o nílò láti ṣí wọn. Ṣíṣe èyíkéyìí nínú àwọn ọ̀nà tí kò fi bẹ́ẹ̀ ṣe kedere ń tú gbogbo ìwífún nípa ìkọ̀kọ̀ jáde [adágún adágún tí a dáàbò bò](../using-zcash/shielded-pools) wà láti dáàbò bo, àti àwọn ìdìbò owó ìṣáájú mú kí ìwífún tó wà ní ìwọ́ntúnwọ̀nsì jáde fún ìdí yìí. Ìdìbò ààbò yanjú ìṣòro náà pẹ̀lú àwọn irinṣẹ́ kan náà tí ó ń darí ìsanwó: [àwọn ẹ̀rí àìmọ̀](../zcash-tech/zk-snarks), àwọn ohun tí kò ní ìtumọ̀, àti ìfọwọ́sowọ́pọ̀.

## Ìmọ̀lára: àpótí ìdìbò tí ó ṣe pàtàkì sí ara rẹ̀

> Àpótí ìdìbò tó ní ààbò máa ń jẹ́ kí o ka ohun tó bá kọjá nínú àpò ìfowópamọ́ láìrí ohun tó wà nínú rẹ̀. Àpótí ìdìbò tó ní ààbò máa ń lọ síwájú: ó máa ń kó àwọn ìdìbò tó ní èdìdì jọ láìsí ṣí wọn rárá.

Fojú inú wo àpótí ìdìbò kan tí ó ní agbára mẹ́ta tí kò wọ́pọ̀. Ó lè fi àpò ìwé tí a ti dì mọ́ iye tí ó ń lọ láìsí ṣí i. Àwùjọ àwọn aláṣẹ kan, tí kò sí ẹni tí ó mú kọ́kọ́rọ́ náà, ló máa fi àròpọ̀ gbogbo rẹ̀ hàn lẹ́yìn náà. Kí o tó fi àpò ìwé kan sínú rẹ̀, o fi ìdákẹ́jẹ́ẹ́ fihàn pé o di ZEC mú ní àkókò tí ó ti kọjá tí o sì kò tíì dìbò, láìfi àwọn owó tí ó jẹ́ tìrẹ hàn. Gbogbo ohun tí ó wà ní ìsàlẹ̀ yìí ni bí a ṣe ṣe àpótí náà ní gidi.

## Àǹfààní àti àwòrán náà

Yika idibo yoo ṣatunṣe giga aworan kan, bulọọki mainnet Zcash kan ṣoṣo, ati iwuwo rẹ ni iwọntunwọnsi aabo ti o le lo ninu [Ironwood](../zcash-tech/ironwood) Adagun ní ààrin náà. Òfin náà jẹ́ Ironwood ZEC kan ní àwòrán náà dọ́gba pẹ̀lú ìbò kan. Fún ìwádìí NU7 àwòrán náà jẹ́ ààrin mainnet block 3,459,350, ní nǹkan bí ọjọ́ kẹrìndínlógún oṣù kẹjọ ọdún 2026 ní agogo mọ́kàndínlógún òwúrọ̀ UTC, pẹ̀lú ìdìbò ṣí sílẹ̀ títí di ọjọ́ kẹrìnlá oṣù kẹsàn-án ọdún 2026 ní agogo mọ́kàndínlógún òwúrọ̀ UTC. Ọ̀nà àtijọ́ ni a ń ṣe àkóso Transparent ZEC lọ́tọ̀ọ̀tọ̀, kì í ṣe nípasẹ̀ ìlànà yìí.

1. Owó rẹ kì í yí padà, bẹ́ẹ̀ ni wọn kì í ti í tì í pa. Àkókò tó yẹ kó o yẹ ni a yàn, nítorí náà o lè náwó tàbí kó o gbé ZEC lọ lẹ́sẹ̀kẹsẹ̀ lẹ́yìn náà láìsí ipa lórí ìdìbò rẹ.
2. Kò sí ìgbésẹ̀ ìforúkọsílẹ̀. Gíga fọ́tò ni gbogbo ohun tí a nílò, èyí tí ó mú kí ìlànà náà rọrùn tí kò sì ní jẹ́ kí a fi ẹni tí ó fẹ́ dìbò hàn.

## Ṣíṣe àfihàn ìwọ̀ntúnwọ̀nsì rẹ láìṣípayá rẹ̀

Nígbà tí o bá dìbò, àpò rẹ yóò fi ẹ̀rí àìmọ̀ hàn pé ní àwòrán rẹ, o ṣàkóso ZEC. Ó ń fi ìwọ̀n tó wúlò àti ìwọ̀n rẹ̀ hàn sí ẹ̀rọ kíkà àdáni, ṣùgbọ́n kò fi àkọsílẹ̀ hàn, kò sì ní ṣe ìṣòwò kankan lórí Zcash mainnet.

Ẹ̀rí yẹn fi hàn pé owó ìdìbò tó wà lórí ẹ̀wọ̀n ìdìbò tó dọ́gba pẹ̀lú ìwọ̀n ìṣàfihàn rẹ, tó jẹ́ ti kọ́kọ́rọ́ ìdìbò tuntun tí àpò ìpamọ́ rẹ ń mú wá fún ìyípo yìí. Nítorí pé kọ́kọ́rọ́ náà jẹ́ tuntun tí kò sì ní ìsopọ̀ mọ́ àdírẹ́sì Zcash rẹ, kò sí ohun tó wà lórí ẹ̀wọ̀n ìdìbò tó lè tọ́ka sí àwọn àkọsílẹ̀ gidi rẹ. Ìdámọ̀ rẹ lórí ẹ̀wọ̀n àti ìdìbò rẹ kò ṣeé so pọ̀ mọ́ra nípasẹ̀ ìkọ́lé.

## Dídínà ìdìbò méjì, ní ìkọ̀kọ̀

Láti dá ẹnikẹ́ni dúró láti dìbò lẹ́ẹ̀mejì pẹ̀lú owó kan náà, ètò náà gbọ́dọ̀ jẹ́rìí sí i pé àwọn àkọsílẹ̀ tó wà lẹ́yìn owó rẹ kò ná ní àwòrán náà. Lórí mainnet, èyí ni a ń ṣe nípa ṣíṣí àkọsílẹ̀ aláìlóye, àmì tí a fi ń ná owó rẹ̀, èyí tí gbogbo àwọn nódù ń ṣàyẹ̀wò fún àtúnlò. Ṣùgbọ́n ṣíṣí àkọsílẹ̀ aláìlóye rẹ níbí yóò so ìwé ìdìbò rẹ pọ̀ mọ́ àkọsílẹ̀ rẹ.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Nítorí náà, ìlànà náà fi hàn pé ó yàtọ̀ sí èyí ní ìkọ̀kọ̀. Ó kọ́ àkójọ gbogbo ohun tí ó lè fa àléébù tí a ti lò tẹ́lẹ̀ gẹ́gẹ́ bí àwòrán náà, àpò owó rẹ sì fi hàn pé kò sí ohun tí ó lè fa àléébù tí ó wà nínú àkọsílẹ̀ náà, èyí tí ó fi hàn pé owó náà kò ná láìsí pé a fi àmì tí ó jẹ́ hàn.

Iṣoro kan ṣì wà níbẹ̀. Gbígbà apá tí a nílò nínú àkójọ náà láti ọ̀dọ̀ olupin kan yóò fi ohun tí ó ń parẹ́ rẹ hàn fún olupin náà, àkójọ gbogbo rẹ̀ sì tóbi, ó tó nǹkan bí 2 GB fún dátà Orchard-era àti pé ó tóbi jù bí Zcash ṣe ń pọ̀ sí i. [Ìgbàpadà Ìwífún Àdáni](../zcash-tech/private-information-retrieval) (PIR) yanjú méjèèjì: àpò rẹ máa ń gba dátà tí ó nílò gan-an nígbà tí ó ń fi àwọn dátà tí ó béèrè fún pamọ́ ní ọ̀nà ìkọ̀kọ̀. A máa ń ṣàyẹ̀wò àbájáde náà pẹ̀lú àkópọ̀ àkójọ àwọn ohun tí kò ní ìtumọ̀, nítorí náà olupin aláìṣòótọ́ kò lè ṣe àbájáde èké.

## Síṣe ìdìbò tí a fi àkọpamọ́ ṣe

Fún ìbéèrè kọ̀ọ̀kan, àpò rẹ ṣe àwọn nǹkan mẹ́ta.

1. Ó ń fi ìdìbò rẹ sí ìgbìmọ̀ kíkà nípa lílo ìfipamọ́ homomorphic, irú ìfipamọ́ tí a lè fi àwọn ìkọ̀wé ìpamọ́ pọ̀ láìsí ìyípadà. Èyí ni ohun tí ó ń jẹ́ kí àpótí náà ní gbogbo ìdìbò tí kò lè kà.
2. Ó pín ìbò rẹ sí ìpín mẹ́rìndínlógún ọ̀tọ̀ọ̀tọ̀, débi pé ìgbìmọ̀ alábáṣepọ̀ pàápàá yóò ṣòro láti tún kó iye tí ẹnìkan kan fi dìbò fún jọ.
3. Ó máa ń fi àwọn ìpín wọ̀nyẹn ránṣẹ́ ní àkókò tí a kò ṣe pàtó nípasẹ̀ ọ̀pọ̀lọpọ̀ àwọn olupin, nítorí náà, olùwòye kò lè mọ̀ pé ìpín náà jẹ́ ti olùdìbò kan náà nígbà tí wọ́n bá dé.

Ìpín kọ̀ọ̀kan ní ẹ̀rí àìmọ̀ tirẹ̀ pé ó jẹ́ ìwé ìdìbò tó tọ́, nítorí náà kò sí ẹni tó lè fi àwọn ìdìbò tí kò ní àtìlẹ́yìn kún un. Àwọn ìpín tí a ti fìdí rẹ̀ múlẹ̀ ni a fi kún iye ìṣiṣẹ́ tí a fi ìkọ̀kọ̀ kún fún ìdáhùn tí o yàn.

## Kíkà láìsí ìdìbò kankan

Àwọn aláṣẹ ìdìbò tí a pín káàkiri ló ń ṣe ìkà náà: ó kéré tán àwọn olùfọwọ́sowọ́pọ̀ ìdìbò mẹ́wàá, kò sí ẹnìkan nínú wọn tí ó lè fa ohunkóhun yọ. Ní ìbẹ̀rẹ̀ ìyípo kan, wọ́n papọ̀ ṣe ayẹyẹ ìṣẹ̀dá àmì-ìdámọ̀ràn kan tí ó ń ṣe kọ́kọ́rọ́ ìkọ̀kọ̀ tí kọ́kọ́rọ́ ìkọ̀kọ̀ tí ó báramu rẹ̀ pín sí gbogbo wọn, tí a kò sì kó jọ síbì kan.

> Kò sí aláṣẹ kan ṣoṣo tó gbé kọ́kọ́rọ́ náà. Àpótí náà máa ń ṣí nígbà tí ìdá méjì nínú mẹ́ta wọn bá yí kọ́kọ́rọ́ wọn papọ̀, àti nígbà náà gbogbo rẹ̀ ló máa ń fi hàn.

Nígbà tí ìyípo náà bá parí, gbogbo àròpọ̀ ìkọ̀kọ̀ náà ti wà láti inú àfikún homomorphic tí ó wà lókè yìí. Olùṣàyẹ̀wò kọ̀ọ̀kan ń tẹ ìkọ̀kọ̀ díẹ̀ jáde pẹ̀lú ẹ̀rí tí ó ṣe kedere. Nígbà tí ó kéré tán ìdá méjì nínú mẹ́ta bá ti fi kún un, àwọn ẹ̀yà wọn yóò para pọ̀ di ìdìpọ̀ ìkọ̀wé ìkẹyìn fún ìbéèrè kọ̀ọ̀kan, a kò sì ní ṣe ìkọ̀kọ̀ mìíràn mọ́. Gbogbo nódù tí ó pé pérépéré lè ṣàyẹ̀wò ẹ̀rí ìṣọ̀kan náà, kí gbogbo ènìyàn lè fìdí ìkà náà múlẹ̀ láìgbẹ́kẹ̀lé àwọn olùṣàyẹ̀wò náà.

## Ta ló ń ṣiṣẹ́ rẹ̀, àti ohun tí wọn kò lè ṣe

Apẹẹrẹ naa ya awọn ipa meji sọtọ ki ko si ẹgbẹ ti o ni agbara pupọ ju.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Àwọn olùdarí multisig jẹ́ ẹgbẹ́ méjì nínú márùn-ún pẹ̀lú àwọn aṣojú láti Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), àti Valar Group. Ó ń pinnu àwọn ìbéèrè tí ó dé ẹ̀wọ̀n náà, ó sì ń jẹ́rìí sí kọ́kọ́rọ́ ìkọ̀kọ̀ gbogbo ìpele náà, ṣùgbọ́n kò lè rí, yí padà, tàbí dí ìbò ẹnìkọ̀ọ̀kan. Ẹnikẹ́ni tí kò bá fẹ́ràn àwọn ìbéèrè náà lè ṣiṣẹ́ ẹ̀wọ̀n ìdìbò tirẹ̀, nítorí pé sọ́fítíwọ́ọ̀dù náà ṣí sílẹ̀ tí kò sì ní àṣẹ.

Àwọn olùdásílẹ̀ ni ó kéré tán àwọn nódù mẹ́wàá tí ó ní kọ́kọ́rọ́ ìdènà ìpínyà tí wọ́n sì ń ṣe ìdènà ìdènà. Wọn kò le ṣe ìdènà ìdìbò kọ̀ọ̀kan tàbí ṣe ìdìrò èké, nítorí pé gbogbo ìdènà ìdènà ń ní ẹ̀rí ìtọ́sọ́nà gbogbogbòò.

## Kí ni iye owó náà jẹ́ fún

Àwọn olùṣètò gbé ààlà ìkópa kalẹ̀: a máa ń wo àwọn èsì ìwádìí náà gẹ́gẹ́ bí aṣojú àwọn oní-ìnáwó nìkan tí ó bá kéré tán 1,000,000 ZEC bá kópa nínú ó kéré tán ìbéèrè kan, pẹ̀lú àwọn ìfàsẹ́yìn. Àkójọpọ̀ náà kò ní ìbéèrè kankan, a kò sì lò ó fún ìbéèrè kọ̀ọ̀kan. Ó jẹ́ àyẹ̀wò kan ṣoṣo lórí gbogbo ìwádìí náà, nítorí náà a máa ń gba èsì náà ní pàtàkì nígbà tí iye ZEC tó pọ̀ bá fara hàn. Ní ìsàlẹ̀ ìpele yẹn, a kò kà èsì náà sí àmì tó ní ìtumọ̀.

## Ohun ti ilana yii ko daabobo lodi si

Jíjẹ́ kí a mọ àwọn ẹ̀gbẹ́ rẹ̀ dáadáa jẹ́ ara òye nípa àwòrán náà.

1. Ó jẹ́ àmì, kìí ṣe ìpinnu tó gbọ́dọ̀ wà ní ìkáwọ́. Ìwádìí àwọn tó ní owó èrè ń wọn ìmọ̀lára tí wọ́n gbé ka orí igi, ó sì ń gbé e kalẹ̀ sí ohun Zcash's ṣe déédéé [ilana iṣakoso](../zcash-community/zcash-governance) dípò kí a rọ́pò rẹ̀.
2. Ó ní ìwọ̀n owó, nítorí náà ipa máa ń tẹ̀lé àwọn ohun tí wọ́n ní. Ìjàkadì tó kéré síi lè mú kí àwọn ènìyàn tó ń kópa pọ̀ sí i, ṣùgbọ́n kò yí ìṣọ̀kan ZEC.
3. Olùdarí multisig ni ó ṣètò ètò náà, èyí tí ó yan àwọn ìbéèrè tí ó fara hàn. Kò lè kan ìdìbò, ẹnikẹ́ni sì lè ṣiṣẹ́ ẹ̀wọ̀n tí ó ń díje, ṣùgbọ́n ṣíṣe ètò ṣì jẹ́ ibi tí a lè darí rẹ̀.
4. Kíkà owó nílò àwọn olùṣàyẹ̀wò lórí ayélujára. Ṣíṣe àkọsílẹ̀ owó náà nílò ó kéré tán ìdá méjì nínú mẹ́ta wọn láti fọwọ́sowọ́pọ̀, nítorí náà, ìdádúró ńlá tàbí ìkọ̀sílẹ̀ tí a ṣètò lè fa àbájáde kan.
5. Ìwọ̀n ìpamọ́ lábẹ́ ìfọwọ́sowọ́pọ̀ pípé jẹ́ ààbò jíjinlẹ̀, kìí ṣe ìlànà. Tí gbogbo ìgbìmọ̀ bá tún kọ́kọ́rọ́ náà kọ́ ní ìkọ̀kọ̀, pípín ìpínkiri àti fífi sílẹ̀ ní àkókò ni ohun tí ó ń dáàbò bo ìwọ́ntúnwọ̀nsì rẹ, àwọn apẹ̀ẹrẹ sì gbà pé àwọn wọ̀nyí kò lágbára lábẹ́ ìfọwọ́sowọ́pọ̀. Ìṣàyẹ̀wò ìrìnnà tí ó lọ́ra jẹ́ ewu tí ó kù.
6. Àwọn ẹ̀yà ara tí ń gbéra ju àwọn ẹ̀yà ara àtijọ́ lọ. Àwọn ẹ̀yà ara PIR, àwọn ẹ̀yà ara ìfiránṣẹ́, kọ́kọ́rọ́ ìdìbò tuntun, àti àwọn ẹ̀rí ìpele púpọ̀ jẹ́ ibi tí àwọn àṣìṣe tàbí àṣìṣe ìṣètò lè fara hàn. Ètò náà jẹ́ orísun ṣíṣí sílẹ̀ àti pé a ti ṣe àyẹ̀wò àwọn ẹ̀yà ara fúnra wọn, èyí tí ó ń ṣàkóso ewu náà dípò kí ó mú un kúrò.

Ohun tí ó ń dáàbò bò, ní agbára àti ní ọ̀nà tí ó dájú, ni àwọn nǹkan méjì tí ó ṣe pàtàkì jùlọ: ìdìbò rẹ kò lè ní ìsopọ̀ pẹ̀lú ìdámọ̀ rẹ, àti pé àpapọ̀ ìkẹyìn nìkan ni a máa ń ṣí payá.

## Ìwé Àlàyé

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| Voting chain | Blockchain lọtọ kan, ti Valar Group, ti o n ṣe ibo naa; awọn akọsilẹ Zcash rẹ kii yoo lọ si i rara |
| Snapshot height | Àkọsílẹ̀ pàtàkì tí ìwọ̀n rẹ̀ tó wà ní ìpele ìdìbò (block 3,459,350 fún ìdìbò NU7) |
| Nullifier | Àmì owó tí a fi pamọ́ sí ìwé àkọsílẹ̀ kan àrà ọ̀tọ̀; fífi hàn pé yóò so ìdìbò pọ̀ mọ́ ìwé àkọsílẹ̀ kan, nítorí náà ìdìbò fi hàn pé kì í ṣe ọmọ ẹgbẹ́ dípò rẹ̀ |
| Private Information Retrieval (PIR) | Gbígbà dátà láti ọ̀dọ̀ olupin nígbàtí o ń fi dátà tí o béèrè pamọ́ |
| Homomorphic encryption | Ìfipamọ́ tí a lè fi àwọn ìkọ̀wé ìpamọ́ tí a kò lè pa pọ̀ láìsí ìyípadà ìkọ̀kọ̀ |
| Coordinator multisig | Ẹgbẹ́ méjì nínú márùn-ún tí ó fún ní àṣẹ láti béèrè ìbéèrè àti kọ́kọ́rọ́ yíká, ṣùgbọ́n tí kò lè rí tàbí yí ìdìbò padà |
| Election authority | Àwọn olùdásílẹ̀ mẹ́wàá tàbí jù bẹ́ẹ̀ lọ tí wọ́n pa kọ́kọ́rọ́ ìpínyà mọ́ra, tí wọ́n sì ń fi àkọsílẹ̀ ìkẹyìn nìkan hàn |
| Threshold decryption | N gba abajade pada nikan nigbati awọn oniwun ipin bọtini to to, nibi ida meji ninu mẹta, ba n ṣiṣẹ pọ |
| Quorum | A ó kà sí pé iye àwọn tó kópa tó kéré jùlọ ZEC tó tó 1,000,000 fún ìdìbò náà jẹ́ aṣojú |

## Awọn ibeere ti a maa n beere nigbagbogbo

Ṣé owó mi máa ń ṣí kiri tàbí wọ́n máa ń tii pa nígbà tí mo bá dìbò? Rárá. A máa ń wọn ìtóótun ní ibi tí wọ́n ti lè dìbò, nítorí náà, ZEC rẹ yóò dúró níbẹ̀, a ó sì lè náwó. Ìdìbò máa ń mú ẹ̀rí wá lórí ẹ̀wọ̀n ọ̀tọ̀ọ̀tọ̀, kì í ṣe ìṣòwò Zcash.

Ǹjẹ́ ẹnikẹ́ni lè sọ bí mo ṣe dìbò tàbí iye tí mo ní? Rárá o. Àwọn ìdìbò ni a fi nkọ̀ǹpútà kọ, àpapọ̀ iye tí a sì fi nkọ̀ǹpútà kọ nìkan ni a lè fi nkọ̀ǹpútà kọ. Ìdìbò rẹ kò ní ìsopọ̀ mọ́ ìdámọ̀ rẹ, a sì pín ìwọ̀n rẹ sí ìpín mẹ́rìndínlógún tí a yàn láti dáàbò bò ó kódà lọ́wọ́ ìgbìmọ̀ tí ń dìtẹ̀.

Kí ló ń dá ẹnìkan dúró láti dìbò lẹ́ẹ̀mejì, tàbí láti dìbò pẹ̀lú owó tí kò ní? Ìdìbò kọ̀ọ̀kan ní ẹ̀rí tí kò ní ìmọ̀ tó péye pé ó ní ìwọ̀nba àwòrán gidi tí a kò ná, àti ẹ̀rí àìsí ọmọ ẹgbẹ́ tí ó dá lórí PIR fihàn pé owó tí ó wà ní ìsàlẹ̀ kò tíì ná, láìsí fífi àmì tí ó jẹ́ hàn.

Ta ni o ka awọn ibo naa? A pínpín ti o kere ju awọn olufisilẹ mẹwa, ti ko si ọkan ninu wọn ti o le ṣe alaye ohunkohun nikan. Ida meji ninu mẹta gbọdọ ṣiṣẹ papọ lati ṣafihan apapọ, ati pe gbogbo alaye iṣiro wa pẹlu ẹri ti o peye ni gbangba.

Ṣé àbájáde náà so mọ́ ara rẹ̀? Ó jẹ́ àmì ìmọ̀lára oní-owó tí a gbé ka orí igi. Ó ń sọ fún ìjọba déédéé Zcash's dípò kí ó ṣe àtúnṣe láìfọwọ́sí.

Ṣé mo lè ṣe àyẹ̀wò èyí fúnra mi tàbí kí n ṣe àyẹ̀wò rẹ̀? Bẹ́ẹ̀ni. Valar Group ló gbé gbogbo ẹ̀rọ ìdìbò, àwọn ẹ̀rọ yíká, ètò PIR, àti àyẹ̀wò ìṣàyẹ̀wò jáde fún ẹnikẹ́ni láti ṣe àyẹ̀wò àti láti ṣiṣẹ́.

## Dán òye rẹ wò

Tí gbogbo ìdìbò bá jẹ́ ti a fi npamọ́, tí gbogbo olùdìbò sì jẹ́ ẹni tí a kò mọ̀, báwo ni ẹnikẹ́ni ṣe lè rí i dájú pé gbogbo iye tí a tẹ̀ jáde pé ó tọ́ àti pé kò sí ẹni tí ó dìbò lẹ́ẹ̀mejì?

<details>
<summary>Answer</summary>

Ẹ̀rí mẹ́ta ló ń ṣiṣẹ́ náà. Ìdìbò kọ̀ọ̀kan ní ẹ̀rí àìmọ̀ pé ó ní ìwọ̀nba àwòrán gidi, nítorí náà a kò ka àwọn ìdìbò tí kò ní àtìlẹ́yìn. Ẹ̀rí àìsí ọmọ ẹgbẹ́ tí ó dá lórí PIR fi hàn pé àkọsílẹ̀ tí ó wà lẹ́yìn rẹ̀ kò ná, èyí tí ó ń dènà ìdìbò méjì láìfi àkọsílẹ̀ náà hàn. Nígbà tí àwọn olùdámọ̀ràn bá sì ń pa gbogbo iye náà, ọ̀kọ̀ọ̀kan wọn ń tẹ ẹ̀rí tí ó tọ́ jáde, nítorí náà gbogbo nọ́ńbà tí ó kún lè jẹ́rìí sí i pé wọ́n ti pa àwọn nọ́ńbà ìkẹyìn náà rẹ́ láti inú àwọn ìdìbò tí a fi kọ̀ǹpútà pamọ́.
</details>

## Àwọn ohun àlùmọ́nì

- [Ìkéde ìdìbò Coinholder NU7 (Valar Group àti Iṣẹ́ Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - apejọ naa lẹhin ti o ṣe ayẹwo ibo naa, giga aworan, ati iṣeto naa
- [Ẹ̀wọ̀n Ìdìbò Onígbọ̀wọ́: àwòrán ìmọ̀-ẹ̀rọ](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - kikọ ilana naa ni oju-iwe yii da lori
- [Àwọn ìwé ìdìbò tí wọ́n dáàbò bo Valar Group](https://valargroup.gitbook.io/shielded-vote-docs) - itọkasi ti a tọju fun pq idibo
- [Kóòdù ìdìbò àti àyẹ̀wò Valar Group (GitHub)](https://github.com/valargroup/vote-sdk) - imuse orisun-ìṣí àti àyẹ̀wò rẹ̀

## Àwọn ojú ìwé tó jọra

- [Ìgbàpadà Ìwífún Àdáni](../zcash-tech/private-information-retrieval) - ilana imudaniloju ti kii ṣe ọmọ ẹgbẹ lẹhin idena ibo meji ikọkọ
- [Ironwood](../zcash-tech/ironwood) - adágún tí a dáàbò bò tí ìwọ̀n rẹ̀ ṣe àkójọ ìdìbò
- [zk-SNARKs](../zcash-tech/zk-snarks) - eto ẹri lẹhin iwọntunwọnsi ati awọn ẹri ẹtọ
- [Àwọn Adágún Tí A Dáàbò Bo](../using-zcash/shielded-pools) - kini iwontunwonsi aabo jẹ ati idi ti o fi farapamọ
- [Àkótán Ìnáwó àti Ìṣàkóso Zcash](../zcash-community/zcash-governance) - bawo ni ifihan ẹdun yii ṣe n pese sinu ilana ipinnu gbooro Zcash's
- [Shielded Labs](../zcash-organizations/shielded-labs) - ọkan ninu awọn ọmọ ẹgbẹ marun ti oludari multisig

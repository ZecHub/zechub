<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìlànà Crosslink

## TL;DR

* Ìlànà Crosslink jẹ́ àgbékalẹ̀ tí a dámọ̀ràn fún ìpele Proof-of-Work/Proof-of-Stake (PoW/PoS) Zcash's. Ó so PoW pọ̀ mọ́ ìlànà Byzantine Fault Tolerance (BFT), èyí tí ó mú kí ó ṣeé ṣe láti parí níwọ̀n ìgbà tí PoW tàbí PoS bá wà ní ààbò.
* Hybrid PoS ṣe àgbékalẹ̀ àwọn notaries tí wọ́n ń fìdí àwọn bulọọki múlẹ̀ tí wọ́n dá lórí ZEC tí a ti so pọ̀ — ní àkọ́kọ́, tí a yàn lẹ́yìn náà tí a dá lórí ZEC.
* Crosslink ní èrò láti pèsè àwọn ìwé àkọsílẹ̀ méjì: ìwé àkọsílẹ̀ **tí a parí (LOG_fin)** fún ààbò ìyípadà, àti ìwé àkọsílẹ̀ **tí ó ní ìdúró díẹ̀ (LOG_ba)** tí ó gùn ún pẹ̀lú àwọn búlọ́ọ̀kì *L* tí kò ju bẹ́ẹ̀ lọ.
* Ipo Aabo **Aabo** kan yoo ṣiṣẹ ti iwe-ipamọ ti a pari ba kuna lẹhin nipasẹ diẹ sii ju awọn bulọọki *L* lọ: PoW n tẹsiwaju, ṣugbọn awọn iṣẹ eto-ọrọ aje duro titi ti a fi yanju iṣoro naa.
* Bí àkókò ti ń lọ, àwọn olùfọwọ́sowọ́pọ̀ PoS yóò gba ìpín tí ń pọ̀ sí i nínú àwọn èrè, èyí tí yóò dín owó tí àwọn awakùsà PoW ń rí kù; ìlànà náà yóò mú àwọn àyípadà wá díẹ̀díẹ̀.
* Shielded Labs, pẹ̀lú ojú ọ̀nà ìṣàfihàn fún sísopọ̀ Crosslink 2* pọ̀ mọ́ oníbàárà Zebra Zcash's.
* Crosslink kò ṣiṣẹ́ lórí Zcash mainnet. Ó ń ṣiṣẹ́ lórí Shielded Labs' Feature Net, nẹ́tíwọ́ọ̀kì ìdánwò kan tí ẹnikẹ́ni lè dara pọ̀ mọ́. Wo “Ibi tí Crosslink dúró sí” ní ìsàlẹ̀.

## Àlàyé Pàtàkì

### Ìfihàn: Zcash Hybrid PoS àti Ìlànà Crosslink

Ìlànà Crosslink jẹ́ ìdàgbàsókè pàtàkì nínú ìdàgbàsókè Zcash, ó ń darí rẹ̀ sí àwòṣe **Ìdánilójú-Ìpele-Ọ̀pọ̀ (PoS)** àti **Ìdánilójú-Ìṣẹ́ (PoW)**. Bó tilẹ̀ jẹ́ pé PoW ìbílẹ̀ ṣeé gbẹ́kẹ̀lé fún ìdánilójú ààbò nẹ́tíwọ́ọ̀kì, ó dojúkọ ẹ̀sùn fún lílo agbára àti ewu àárín gbùngbùn tí ó níí ṣe pẹ̀lú iwakusa ilé iṣẹ́. Crosslink ṣe àgbékalẹ̀ ètò àdàpọ̀ kan, ó sì so agbára PoW tí a ti fihàn pọ̀ mọ́ àwọn àǹfààní ìṣàkóso àti ìṣiṣẹ́ PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Ìyípadà yìí bá àwọn àṣà àgbáyé mu nínú ìṣẹ̀dá blockchain, níbi tí àwọn iṣẹ́ akanṣe ti ń yípadà sí àwọn ètò tí ó ṣeé gbé kalẹ̀ fún àyíká àti àwọn ètò tí kò ní ìṣọ̀kan. Àpẹẹrẹ ìfohùnṣọ̀kan méjì ti Crosslinks rí i dájú pé Zcash ń pa àwọn ìdánilójú ìpamọ́ ìkọ̀kọ̀ rẹ̀ mọ́ nígbà tí ó ń yípadà láti kojú àwọn ìpèníjà òde òní.

Ọ̀nà ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn ìṣàfihàn tó lágbára jù sí àwọn ètò PoW mímọ́ ZEC.

### Kí ló dé tí Hybrid PoS/PoW fi jẹ́ ìdánwò àkọ́kọ́?

* Ó ń tẹ̀síwájú sí PoS mímọ́.
* Ó jẹ́ kí a máa lo àwọn ohun èlò ìwakùsà àti ìfipamọ́ nígbà kan náà, kí a sì máa lo àwọn ohun èlò ìṣẹ̀dá àyíká.
* Ó dín àwọn ìṣòro ààbò tó ṣeéṣe pẹ̀lú ìlànà PoS kù títí tí yóò fi ní ìgbẹ́kẹ̀lé àti ìgbẹ́kẹ̀lé tó ga jù.
* Ethereum ti fi ọ̀nà gbogbogbò hàn nínú iṣẹ́-ṣíṣe.

### Kí ni Crosslink jẹ́

Ìlànà Crosslink jẹ́ àpẹẹrẹ tí a dámọ̀ràn fún ìpele Proof-of-Work/Proof-of-Stake (PoW/PoS) Zcash's. Ó so PoW pọ̀ mọ́ ìlànà Byzantine Fault Tolerance (BFT), èyí tí ó mú kí ó ṣeé ṣe níwọ̀n ìgbà tí PoW tàbí PoS bá wà ní ààbò. Apẹrẹ náà ń fẹ́ láti mú ààbò nẹ́tíwọ́ọ̀kì àti ìpínkiri lágbára síi nípa fífi ìfọwọ́sowọ́pọ̀ onípele kún un nígbà tí ó ń pa ìkópa àwọn awakùsà mọ́. Àmì pàtàkì kan nínú ìdámọ̀ràn náà, tí a pè ní Crosslink 2, mú kí ìṣètò náà rọrùn nípa síso àwọn olùdámọ̀ràn BFT àti àwọn awakùsà pọ̀. Ọ̀nà tí ó rọrùn yìí dín àwọn ìyípadà ìṣètò kù ó sì gba ààyè láti lo ìpele BFT “dummy” kan, èyí tí ó mú kí ó rọrùn láti ṣe àpẹẹrẹ àti láti gbé e kalẹ̀ nígbà tí ó ń pa àwọn ìlànà ààbò gíga mọ́.

Ètò ìṣiṣẹ́ náà ní ipa ọ̀nà ìṣàfihàn pẹ̀lú iye owó ìjìnlẹ̀ tí a ṣírò fún sísopọ̀ Crosslink 2* pọ̀ mọ́ oníbàárà Zebra Zcash's. Ìgbékalẹ̀ onípele yìí dojúkọ ìwọ́ntúnwọ́nsí àwọn ìṣírí olùníláárí, dín ìdàrúdàpọ̀ kù, àti ìbáramu pẹ̀lú àwọn góńgó Zcash fún ìlọ́po, lílò, àti ìpínkiri. Ìgbẹ́kẹ̀lé tí ó ń pọ̀ sí i nínú àwọn ohun-ìní ààbò tí ó lágbára ti ìlànà náà ń mú kí agbára rẹ̀ lágbára síi gẹ́gẹ́ bí ìgbésẹ̀ pàtàkì nínú ìdàgbàsókè Zcash. Nípa ṣíṣe àtúnṣe agbára àti mímú àwọn ọ̀nà ìfohùnṣọ̀kan pọ̀ sí i, Crosslink ń fúnni ní ojútùú tí ó ń wo iwájú sí àwọn ìpèníjà blockchain tí ń yípadà. Fún àwọn ẹ̀kúnrẹ́rẹ́ àlàyé, wo sí [Ibi ipamọ GitHub](https://github.com/ShieldedLabs/zebra-crosslink) àti [Àpérò Àwùjọ Zcash](https://forum.zcashcommunity.com).

### Àwọn Ète àti Àfojúsùn ti Crosslink

A ṣe agbekalẹ Ilana Crosslink lati koju awọn ibi-afẹde eto-ọrọ pataki pupọ fun ọjọ iwaju Zcash:

1. **Ṣíṣe àkóso ìjọba**:
   * Nípa fífi PoS kún un, Zcash dín ìgbẹ́kẹ̀lé lórí ohun èlò PoW pàtàkì (ASICs) kù, èyí tí ó sábà máa ń darí agbára iwakusa láàrín àwọn olùṣiṣẹ́ ńlá díẹ̀.
   * PoS gba awọn eniyan laaye lati kopa lati agbegbe ti o gbooro, nibiti awọn oniwun owo-owo ti n pin awọn ohun-ini wọn lati ni aabo nẹtiwọọki naa, ni idaniloju pe a pin gbogbo awọn eniyan.
   * Nípa ṣíṣe àgbékalẹ̀ ìfọwọ́sowọ́pọ̀ onípele, ìlànà náà ń rí i dájú pé àwọn olùkópa nínú ètò ọrọ̀ ajé ń kó ipa pàtàkì nínú ìfohùnṣọ̀kan, èyí tí ó ń dín ìgbẹ́kẹ̀lé lórí iwakusa nìkan kù.
2. **Ìṣàkóso Tí Ó Mú Dára Jù**:
   * Àwọn tó ní owó èrè ń gba ẹ̀tọ́ ìdìbò nípasẹ̀ ìfipamọ́, èyí tó ń jẹ́ kí wọ́n ní ipa lórí ìpinnu nípa àtúnṣe nẹ́tíwọ́ọ̀kì, ìpínfúnni owó, àti àwọn ohun pàtàkì nípa àyíká. Ọ̀nà tiwantiwa yìí so ìdàgbàsókè ìlànà náà pọ̀ mọ́ àwọn ohun tó jẹ mọ́ àwùjọ.
3. **Agbara Lilo**:
   * Ṣíṣe àyípadà díẹ̀ sí PoS dín àwọn ìbéèrè agbára kù ní pàtàkì, ó sì ń so Zcash pọ̀ mọ́ àwọn ètò ìdúróṣinṣin kárí ayé. PoS kò ní agbára púpọ̀ láti lo àwọn ohun èlò ní ìfiwéra pẹ̀lú PoW tó wúwo ní ìṣírò. Àwọn ètò ìdàpọ̀ ń gbìyànjú láti dín lílo agbára kù ní ìfiwéra pẹ̀lú àwọn ètò PoW nìkan nígbàtí wọ́n ń pa ààbò gíga mọ́.
4. **Aabo Eto-ọrọ ati Iduroṣinṣin**:
   * Pípọ̀ PoW àti PoS pọ̀ ń pín àwọn ìṣírí ọrọ̀ ajé fún àwọn olùkópa nẹ́tíwọ́ọ̀kì, ó sì ń rí i dájú pé ààbò tó lágbára kò sí ìgbẹ́kẹ̀lé jù lórí ẹ̀rọ kan ṣoṣo.
   * Staking tún ṣe àgbékalẹ̀ àpẹẹrẹ èrè tí a lè sọtẹ́lẹ̀ fún àwọn olùkópa, èyí tí ó ṣẹ̀dá àbá tí ó fani mọ́ra fún àwọn olùfowópamọ́ ìgbà pípẹ́.
5. **Ààbò Tó Pọ̀ Síi**: Crosslink fẹ́ mú kí nẹ́tíwọ́ọ̀kì náà lágbára síi sí àwọn ìkọlù àtúntò ẹ̀wọ̀n nípa sísopọ̀ PoS pọ̀ mọ́ PoW.

## Ìwòran / Àfiwé

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Ronú nípa iṣẹ́ àpò kan tí ó ń fúnni ní ìwé méjì ọ̀tọ̀ọ̀tọ̀ fún ìfijiṣẹ́ kan náà. Èkíní ni àyẹ̀wò ìtọ́pinpin: ó máa ń farahàn kíákíá, ó máa ń sọ ibi tí àpò náà wà fún ọ, a sì máa ń ṣe àtúnṣe nígbà míì. Èkejì ni ìwé ẹ̀rí ìfijiṣẹ́ tí a fọwọ́ sí: ó máa ń dé nígbà míì, ṣùgbọ́n nígbà tí ó bá wà, kò sí ẹni tí ó ń tako rẹ̀.

Ìwé àkọsílẹ̀ tí ó ní ìpele ìdúró díẹ̀ ni àyẹ̀wò ìtọ́pinpin, ìwé àkọsílẹ̀ tí a parí sì ni ìwé ẹ̀rí tí a fọwọ́ sí. Àwọn méjèèjì ṣàpèjúwe ẹ̀gbẹ́ ìṣẹ̀lẹ̀ kan náà; wọ́n yàtọ̀ síra ní bí wọ́n ṣe yára hàn àti bí wọ́n ṣe mú ṣinṣin tó.

Ipo Abo ni ibi ipamọ naa maa n se nigbati awọn iwe-ẹri ti a ti fi ọwọ si ba duro de nigba ti awọn iwe-ẹri ti a ti fi ọwọ si ba n kojọ. Awọn apo naa si n lọ kiri nipasẹ ile naa — ṣugbọn ọfiisi naa ko san owo sisan lori awọn iwe-ẹri nikan titi ti awọn ibuwọlu yoo fi pari.

## Jíjìn Jìnnìjìnnì

### Àfojúsùn Ààbò àti Iṣẹ́ ti Crosslink

Ìlànà Crosslink ní èrò láti pèsè oríṣi ìwé àkọsílẹ̀ méjì fún Zcash: ìwé àkọsílẹ̀ **tí a parí (LOG_fin)** àti ìwé àkọsílẹ̀ **tí a dínkù sí i (LOG_ba)**. Ìwé àkọsílẹ̀ tí a parí ń rí i dájú pé ààbò ìyípadà padà wà lábẹ́ àwọn àbá tó bófin mu nípa ìlànà ìfaradà ẹ̀bi Byzantine (BFT) tàbí ìlànà blockchain (BC). A ṣe é láti wà láàyè àti ní ààbò kódà lábẹ́ àwọn ìpín nẹ́tíwọ́ọ̀kì, pẹ̀lú ìdádúró díẹ̀ ju ìlọ́po méjì ti blockchain Zcash lọ́wọ́lọ́wọ́ lọ fún àwọn ìfìdíkalẹ̀ ìdènà tó dọ́gba.

The lower-latency ledger extends the finalized ledger by no more than *L* blocks. It ensures rollback safety under the blockchain protocol alone and maintains latency and security no worse than the existing Zcash model. In the streamlined Crosslink 2* design, the lower latency ledger simplifies development and adoption by functioning as a PoW chain.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Wíwà ní Ààlà àti Ipò Ààbò

Crosslink ní **Ààbò Ipò** láti kojú àwọn ewu tó níí ṣe pẹ̀lú ìwé àkọsílẹ̀ ìpamọ́ tó kéré síi tó ń lọ síwájú ìwé àkọsílẹ̀ tó parí. Èyí ń dènà àwọn ìyàtọ̀, bíi àwọn ipò àkọọ́lẹ̀ tí kò ní ìṣọ̀kan tàbí àwọn àlàfo ààbò tí a kò tíì fìdí rẹ̀ múlẹ̀ nínú àwọn ìdáhùn ìgbà díẹ̀ láti ọwọ́ àwọn olùpèsè iṣẹ́. A máa ń mú Ipò Ààbò ṣiṣẹ́ tí ìwé àkọsílẹ̀ tó parí bá ju àwọn bulọ́ọ̀kù *L* lọ. Ní àkókò yìí, blockchain náà ń bá iṣẹ́ PoW lọ (ó ń rí i dájú pé ààbò ìpìlẹ̀ wà), ṣùgbọ́n a máa ń dá àwọn ìgbòkègbodò ọrọ̀ ajé dúró títí tí a ó fi yanjú ọ̀ràn náà. A ṣe ètò yìí láti gba ara rẹ̀ padà láti inú àwọn ipò tó yàtọ̀ bíi àwọn ìkọlù ńlá nígbàtí a ń ṣe àtìlẹ́yìn fún àwọn ìlànà ìyípadà tí ó dá lórí ìṣàkóso.

### Àwọn Àlàyé Ìmọ̀-ẹ̀rọ àti Ìmúṣiṣẹ́

Shielded Labs ń ṣe àgbékalẹ̀ àti ìlò Crosslink Protocol pẹ̀lú àjọṣepọ̀ pẹ̀lú àwọn alábáṣiṣẹpọ̀ pàtàkì nínú ètò ìṣẹ̀dá ilẹ̀ bíi ZODL. Ìmúṣe ìlànà náà ní nínú:

* Ṣíṣe àgbékalẹ̀ àwọn ọ̀nà ìdúró tó dájú fún àwọn olùkópa PoS.
* Ṣíṣe àtúnṣe sí ètò èrè láti ṣe àtúnṣe àwọn ìṣírí láàrín àwọn awakùsà àti àwọn onípín.
* Rírí i dájú pé ìbáramu ẹ̀yìn àti ìrírí olùlò láìsí ìṣòro nígbà ìyípadà.
* Ètò Àkọsílẹ̀: Ìlànà náà ní àwọn akọ̀wé tí wọ́n fọwọ́ sí àwọn bulọ́ọ̀kì. Ní àkọ́kọ́, a máa ń lo àwọn akọ̀wé tí kìí ṣe static, tí wọ́n ń yípadà sí ètò dynamic níbi tí a ti ń yan àwọn akọ̀wé tí a gbé kalẹ̀ lórí ZEC.
* Ìmúṣiṣẹ́ Ìrònú: Ìmúṣẹ Crosslink nílò àtúnṣe sí àwọn òfin ìfọwọ́sowọ́pọ̀ Zcash, pẹ̀lú ṣíṣe àgbékalẹ̀ ìlànà ìpínkiri ìpínkiri àti ṣíṣe àtúnṣe àwọn òfin ìlànà nẹ́tíwọ́ọ̀kì láti ṣe àtìlẹ́yìn fún ìfọwọ́sowọ́pọ̀ àdàpọ̀.
* Ìgbékalẹ̀ Ìgbékalẹ̀ Ní Ìpele-ìpele: Ìlànà náà yóò bẹ̀rẹ̀ ní ìpele-ìpele láti rí i dájú pé nẹ́tíwọ́ọ̀kì dúró ṣinṣin àti àtúnṣe àwùjọ. Àwọn ìpele àkọ́kọ́ dojúkọ ìmúṣẹ ìmọ̀-ẹ̀rọ, lẹ́yìn náà ni ìṣọ̀kan ìṣàkóso fún yíyan àwọn notaries.

Àpẹẹrẹ àtijọ́ àti àwọn ìwé rẹ̀ wà nínú [Ibi ipamọ zebra-crosslink lori GitHub](https://github.com/ShieldedLabs/zebra-crosslink) àti [Ìwé Ìjápọ̀ Abila](https://shieldedlabs.github.io/zebra-crosslink/)A ṣe àpèjúwe iṣẹ́ lọ́wọ́lọ́wọ́ ní abala tó tẹ̀lé e.

### Ibi ti Crosslink duro

Crosslink ṣì jẹ́ àbá kan. Shielded Labs' [Awọn Ibeere Nigbagbogbo Crosslink](https://shieldedlabs.net/crosslink-faq/) sọ pe “yoo nilo lati kọja ilana iṣakoso Zcash boṣewa” ṣaaju ki o to le ṣiṣẹ lori mainnet.

Ohun tó wà lónìí ni **Feature Net**: nẹ́ẹ̀tìwọ́ọ̀kì ìdánwò tí Shielded Labs, pẹ̀lú owó ìdánwò tirẹ̀, cTAZ, níbi tí ẹnikẹ́ni ti lè wa nǹkan jáde, fi owó sílẹ̀, kí ó sì ṣiṣẹ́ ìparí. [Ẹ̀yà 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)tí a tú jáde ní ọjọ́ kìíní oṣù kẹwàá ọdún 2026, bẹ̀rẹ̀ gẹ́gẹ́ bí ẹ̀rí iṣẹ́ tó ṣe kedere, ó sì yí Crosslink padà ní ìpele: pípadánù láti block 20,736, àkójọ àkọ́kọ́ ti àwọn ìparí tí a mú ní block 34,560, àti ìparí BFT láti block 36,288 ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Ohun méjì ló ti yí padà láti ìgbà tí wọ́n ti kọ ọ́:

* **Iṣẹ́ tí a ń pè ní notary níbí ni a ń pè ní finalizer** nínú sọ́fítíwọ́ọ̀tì àti àkọsílẹ̀ ìtújáde Shielded Labs'. Àwọn Stakers máa ń fi owó fún olùṣe ìparí, àti àwọn olùṣe ìparí tí wọ́n ní ìdìbò tó pọ̀ jùlọ láti parí àwọn bulọọki.
* **Kódì náà ti yí padà.** Ibi ìpamọ́ zebra-crosslink tí a gbé sókè yìí ni a ṣe àtúnṣe ìkẹyìn ní oṣù kẹrin ọdún 2026. Àwọn ìtújáde Feature Net wá láti ọ̀dọ̀ [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), ati pe a kọ apẹrẹ naa sinu [Ìwé Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Láti gbìyànjú fúnra rẹ, tẹ̀lé e [Feature Net Crosslink](/guides/crosslink-feature-net) ìtọ́sọ́nà. Láti wo nẹ́tíwọ́ọ̀kì náà láìsí ohunkóhun, ṣí taabu Crosslink lórí [Àwọn Irinṣẹ́ ZecHub](https://zechub.wiki/tools?tool=crosslink).

## Àwọn Àbájáde Tó Wúlò

### Ipa lori Owo-wiwọle PoW Miners

Crosslink jẹ́wọ́ ipa pàtàkì ti àwọn awakùsà PoW ní nínú ìdàgbàsókè ìbẹ̀rẹ̀ Zcash nígbà tí wọ́n ń múra sílẹ̀ fún ìyípadà díẹ̀díẹ̀:

* **Ẹ̀bùn tí a dínkù**:
  * Bí àkókò ti ń lọ, àwọn olùdásílẹ̀ PoS yóò gba ìpín tí ń pọ̀ sí i nínú àwọn èrè, èyí tí yóò dín èrè àwọn awakùsà PoW kù. Àtúnpín yìí fi ipa PoW tí ń dínkù nínú àwòṣe àdàpọ̀ hàn.
* **Iyipada ododo**:
  * Ìlànà náà ń mú àwọn àyípadà wá díẹ̀díẹ̀, ó ń rí i dájú pé àwọn awakùsà ní àkókò tó láti ṣe àtúnṣe tàbí ṣe àwárí àwọn ipa tuntun nínú ètò Zcash, bíi lílọ sí ṣíṣe àkójọpọ̀ tàbí ṣíṣe àfikún sí àwọn iṣẹ́ nẹ́tíwọ́ọ̀kì mìíràn.
* **Dinku Awọn Ewu Aarin-iṣẹ**:
  * A ṣe àwọn adágún ìdìpọ̀ PoS láti dènà ìdàgbàsókè agbára, èyí tí ó fún àwọn olùṣeré kékeré ní àǹfààní láti kópa ní ìpele kan náà. Ọ̀nà tí ó gba gbogbo ènìyàn yìí lòdì sí ìdàgbàsókè lọ́wọ́lọ́wọ́ tí a rí nínú iwakusa tí ó dá lórí ASIC.
* Àwọn awakùsà PoW yóò ní ìrírí owó tí ó dínkù bí a bá ṣe gbé èrè bulọọki náà sí àwọn olùfọwọ́sowọ́pọ̀ PoS. Ìyípadà ipò yìí ń rí i dájú pé ètò ìṣírí wà ní ìwọ̀ntúnwọ̀nsì, ó sì ń san èrè fún àwọn awakùsà àti àwọn olùnípín fún ààbò nẹ́tíwọ́ọ̀kì náà.
* A gbero lati yi iyipada diẹdiẹ pada lati dinku ipa eto-ọrọ aje lori awọn awakusa lakoko ti o n mu ki awọn ti o ni ipa kopa ninu rẹ pọ si.

Ọ̀nà ìbáṣepọ̀ méjì yìí ń fi ìdúróṣinṣin Zcash's sí ìpamọ́, ìdúróṣinṣin, àti ìpínkiri agbára múlẹ̀, ó sì ń gbé e kalẹ̀ gẹ́gẹ́ bí aṣáájú tí ó ń wo iwájú ní ààyè blockchain.

## Àwọn Àṣìṣe Tó Wọ́pọ̀

**Kíkà Crosslink gẹ́gẹ́ bí òfin ìfọwọ́sowọ́pọ̀ tó ń ṣiṣẹ́**. Ojú ìwé yìí ṣàlàyé àwòrán tí a dábàá pẹ̀lú ètò ìfiranṣẹ́ onípele kan. Ṣíṣe àgbékalẹ̀ rẹ̀ nílò àtúnṣe sí àwọn òfin ìfọwọ́sowọ́pọ̀ Zcash, èyí tí ó jẹ́ ohun tí a fi ń ṣe àgbékalẹ̀ ojú ìwé àti iṣẹ́ ìfọwọ́sowọ́pọ̀ Zebra.

**Gbígbà tí a bá gbà pé PoS rọ́pò iwakusa**. Crosslink jẹ́ àgbékalẹ̀ aládàpọ̀: Ìṣẹ̀dá bulọọki PoW ń tẹ̀síwájú pẹ̀lú ìfọwọ́sowọ́pọ̀ staked. Kódà ní Ìpo Ààbò, blockchain ń tẹ̀síwájú iṣẹ́ PoW nígbàtí àwọn ìgbòkègbodò ọrọ̀ ajé bá dúró.

**Ṣíṣe àyẹ̀wò "ìparí" gẹ́gẹ́ bí ìjẹ́rìísí kíákíá**. Ìwé àkọsílẹ̀ tí a parí ni a ṣe fún ìdúró díẹ̀ ju ìlọ́po méjì ti blockchain Zcash lọ́wọ́lọ́wọ́ lọ fún ìjẹ́rìísí block tó báramu. Ohun tí ó fi kún un ni ààbò rollback, kìí ṣe iyàrá — ìwé àkọsílẹ̀ tí ó kéré síi ni ìwòye kíákíá.

**Ó ń da àwọn ìwé àkójọpọ̀ méjèèjì rú**. LOG_ba kì í ṣe ẹ̀wọ̀n ọ̀tọ̀ọ̀tọ̀: ó ń fa ìwé àkójọpọ̀ tí a parí gùn ju àwọn búlọ́ọ̀kì *L* lọ, àti nínú àwòrán Crosslink 2*, ó ń ṣiṣẹ́ gẹ́gẹ́ bí ẹ̀wọ̀n PoW.

## Àwọn ojú ìwé tó jọra

- [Feature Net Crosslink](/guides/crosslink-feature-net) — fi app Feature Net desktop sori ẹrọ, fi sori ẹrọ fun oluṣeto ipari ki o ṣayẹwo ipo rẹ.
- [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node) — a gbero lati so alabara Crosslink 2* pọ mọ.
- [Àwọn Nódù Kíkún](/zcash-tech/full-nodes) — bí àwọn nódù ṣe ń fi àwọn òfin ìfohùnṣọ̀kan múlẹ̀ lónìí, kí ìyípadà ìfohùnṣọ̀kan àpapọ̀ èyíkéyìí tó wáyé.
- [Àwọn Ìmúdàgbàsókè Nẹ́tíwọ́ọ̀kì](/start-here/network-upgrades) — bí àwọn ìyípadà òfin ìfohùnṣọ̀kan ṣe dé ọ̀dọ̀ nẹ́tíwọ́ọ̀kì Zcash.
- [Ètò Ìnáwó Zcash](/start-here/zcash-monetary-policy) — ètò èrè block tí Crosslink yóò tún pín kiri.

## Àwọn Ohun Èlò Àfikún

- Ìjíròrò àwùjọ: [Crosslink: Feature Net, lórí Àpérò Àwùjọ Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Àwọn àtúnṣe tó jẹ́ ti ìjọba: [Crosslink ni Shielded Labs](https://shieldedlabs.net/crosslink/) àti [Àwọn ìtújáde Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Itọkasi apẹrẹ: [Ìwé Crosslink](https://shieldedlabs.github.io/crosslink_book/)

  Ìtọ́kasí:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>

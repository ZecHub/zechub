<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo jẹ́ ètò ìṣàfihàn ìmọ̀-ayé tí kò ṣeé gbẹ́kẹ̀lé, tí a tún ń pè ní ZKP (ZKP) tí Sean Bowe ṣe àwárí ní Electric Coin Co. Ó mú àìní fún ètò ìṣàfihàn tí a gbẹ́kẹ̀lé kúrò, ó sì mú kí ìṣàfihàn ẹ̀rí ìṣàfihàn tí ó ṣeé gbára lé ṣiṣẹ́, èyí tí ó jẹ́ ìpìlẹ̀ ìṣípayá àti ìlànà ààbò Zcash's lọ́wọ́lọ́wọ́.

- **Kí ni:** ìkọ́lé zk-SNARK pẹ̀lú àtúnṣe tó gbéṣẹ́ àti ayẹyẹ ìṣètò tí a gbẹ́kẹ̀lé.
- **Kí ló dé tí ó fi ṣe pàtàkì:** Adágún tí wọ́n fi ààbò bo Zcash's Orchard, tí wọ́n fi NU5 ṣiṣẹ́ ní ọdún 2022, ń ṣiṣẹ́ lórí Halo 2 — ìṣètò ìwádìí yìí.
- **Ohun pàtàkì:** kò sí "egbin olóró" láti inú àwọn ayẹyẹ ìṣètò, àti àwọn ẹ̀rí tí ó lè jẹ́rìí sí àwọn ẹ̀rí mìíràn tí kò lópin.
- **Iṣẹ-aṣẹ:** Halo 2 jẹ́ orísun ṣíṣí sílẹ̀ lábẹ́ [MIT àti Apache 2.0](https://github.com/zcash/halo2#readme), nítorí náà ẹnikẹ́ni nínú ètò àyíká náà lè kọ́lé lórí rẹ̀.

---

## Àlàyé Pàtàkì

Halo jẹ́ ètò ìdánilójú àìgbẹ́kẹ̀lé, tí a tún ṣe àtúnṣe sí òdo tí Sean Bowe ṣe àwárí ní Electric Coin Co. Ó mú ètò tí a gbẹ́kẹ̀lé kúrò, ó sì fún Zcash blockchain ní àǹfààní láti ṣe àtúnṣe sí i. Halo ni ètò ìdánilójú àìlódo àkọ́kọ́ tí ó ṣiṣẹ́ dáadáa tí ó sì ń ṣe àtúnṣe sí i — tí a kà sí ìtẹ̀síwájú ìmọ̀ sáyẹ́ǹsì.

![halo](/content-images/_unavailable.svg "halo")

### Awọn ẹya meji naa

- **Ètò Ìbáṣepọ̀ Onírúurú.** Ó fún olùdásílẹ̀ láyè láti ṣe àdéhùn sí onírúurú pẹ̀lú okùn kúkúrú kan tí olùdásílẹ̀ lè lò láti fìdí àwọn àyẹ̀wò tí a sọ pé ó jẹ́ ti onírúurú náà múlẹ̀.
- **Ẹ̀rí Ìbáṣepọ̀ Polynomial Interactive Oracle.** Olùdánilójú náà béèrè lọ́wọ́ olùdánilójú (algorithm kan) láti ṣí gbogbo àwọn ìlérí ní àwọn ibi tí ó yàn, nípa lílo ètò ìfọwọ́sowọ́pọ̀ polynomial, kí ó sì ṣàyẹ̀wò bóyá ìdánilójú náà jẹ́ òótọ́ láàárín wọn.

### Ko si eto ti o gbẹkẹle

zk-SNARKs gbẹ́kẹ̀lé okùn ìtọ́kasí kan tí a wọ́pọ̀ (CRS) gẹ́gẹ́ bí pàrámítà gbogbogbò fún ìfìdí múlẹ̀ àti ìfìdí múlẹ̀. Ẹgbẹ́ tí a gbẹ́kẹ̀lé gbọ́dọ̀ ṣẹ̀dá CRS yìí ṣáájú. Títí di àìpẹ́ yìí, àwọn ìṣirò onípele-pupọ tí ó ní ààbò (MPC) — gẹ́gẹ́ bí àwọn tí nẹ́tíwọ́ọ̀kì Aztec àti Zcash ń ṣe — jẹ́ pàtàkì láti dín ewu tí ó wà ní àkókò yìí kù [ayẹyẹ iṣeto ti a gbẹkẹle](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Àwọn adágún Sprout àti Sapling tí Zcash's ti dáàbò bo tẹ́lẹ̀ lo àwọn ètò BCTV14 àti Groth16 zk tí wọ́n ń fi hàn. Bó tilẹ̀ jẹ́ pé àwọn wọ̀nyí ní ààbò, wọ́n ní àwọn ààlà: wọn kò pọ̀ tó nítorí pé wọ́n so mọ́ ìlò kan ṣoṣo, “ẹ̀gbin olóró” (àṣẹ́kù ohun èlò ìkọ̀kọ̀ tí a ṣẹ̀dá nígbà ayẹyẹ ìbílẹ̀) lè máa bá a lọ, àti pé ìgbẹ́kẹ̀lé kan wà (bó tilẹ̀ jẹ́ pé ìṣẹ́jú díẹ̀) nínú ríronú pé ayẹyẹ náà jẹ́ èyí tí ó ṣeé gbà.

Halo yọ eto ti a gbẹkẹle kuro nipa fifi ọpọlọpọ awọn ipo iṣoro lile papọ nigbagbogbo lori awọn iyipo ti awọn ila elliptic, ki awọn ẹri iṣiro le ṣee lo lati ronu nipa ara wọn ni imunadoko (amortization ti a fi sinu ara). Ipa ẹgbẹ kan ni pe okun itọkasi ti a ṣeto (jade ti ayẹyẹ kan) di igbesoke, ti o mu ki awọn ohun elo bii awọn adehun ọlọgbọn ṣiṣẹ.

Halo fún àwọn olùlò ní ìdánilójú pàtàkì méjì nípa ààbò ètò ìdánilójú ìmọ̀-òdo ńlá. Àkọ́kọ́, ó jẹ́ kí àwọn olùlò fihàn pé kò sí ẹnikẹ́ni tí ó ní ipa nínú ayẹyẹ ìbílẹ̀ tí ó dá ìlẹ̀kùn ìkọ̀kọ̀ láti ṣe àwọn ìṣòwò jìbìtì. Èkejì, ó fún àwọn olùlò láyè láti fihàn pé ètò náà ti wà ní ààbò ní àkókò kan, kódà bí ó tilẹ̀ ti ṣe àwọn àtúnṣe àti àyípadà.

[Olùṣàlàyé Sean Bowe's ní Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Ìwòran / Àfiwé

### Ẹ̀wọ̀n notary náà

Ronú nípa zk-SNARK déédé gẹ́gẹ́ bí ìwé àkọsílẹ̀ tí a fi ìwé àṣẹ kọ: sítóòmù kan, ìjẹ́rìí kan, tí a ti ṣe tán. Wàyí o, fojú inú wò ó pé o nílò láti fihàn pé àkójọpọ̀ àwọn ìwé ẹgbẹ̀rún mẹ́wàá jẹ́ òótọ́. Láìsí ìyípadà, olùdánilójú yóò ní láti ṣàyẹ̀wò gbogbo sítóòmù.

Halo yí gbogbo ìwé tí a ti fìdí rẹ̀ múlẹ̀ sí sím̀pù lórí ìwé *tókàn*, títí gbogbo àkójọpọ̀ náà yóò fi wó lulẹ̀ sí ìwé kan ṣoṣo pẹ̀lú sím̀pù kan ṣoṣo. Ṣíṣàyẹ̀wò ìwé tó kẹ́yìn tó láti gbẹ́kẹ̀lé gbogbo ẹ̀wọ̀n náà — àti ní pàtàkì, akọ̀wé Halo's (ẹ̀rọ ìfìdí múlẹ̀) ń ṣe sím̀pù tirẹ̀ láìsí pé ó nílò àṣẹ láti òde láti fi èdìdì rẹ̀ lélẹ̀.

### Kí ló dé tí yíyọ ètò ìgbẹ́kẹ̀lé kúrò ṣe pàtàkì

Nínú àwọn ètò àtijọ́, “èdì” (CRS) wá láti inú ayẹyẹ kan. Àwọn olùkópa ní láti pa ohun èlò àárín run, gbogbo ènìyàn sì ní láti gbẹ́kẹ̀lé pé wọ́n ṣe bẹ́ẹ̀. Ìṣirò nìkan ló ń ṣe èdìdì Halo's: kò sí ohun tí a lè pa run, kò sí ohun tí a lè yọ́ jáde, kò sì sí ayẹyẹ tí a lè gbẹ́kẹ̀lé.

---

## Jíjìn Jìnnìjìnnì

### Àwọn ẹ̀rí tó ń tẹ̀lé e

Àkójọ ẹ̀rí ìyípadà ń jẹ́ kí ẹ̀rí kan ṣoṣo jẹ́rìí sí ìtọ́sọ́nà àwọn ẹ̀rí mìíràn tí kò ní ààlà, tí ó ń fúnni ní ọ̀pọ̀lọpọ̀ ìṣirò (àti ìwífún). Èyí jẹ́ apá pàtàkì fún ìlọ́po, nítorí pé ó ń jẹ́ kí nẹ́tíwọ́ọ̀kì náà fẹ̀ sí i ní ìpele ní ìpele kan nígbà tí àwọn àpò àwọn olùkópa ṣì lè gbẹ́kẹ̀lé ìdúróṣinṣin ti ìyókù nẹ́tíwọ́ọ̀kì náà.

Kí Halo, ṣíṣe àtúnṣe ìdánilójú ìṣàfihàn nílò owó ìṣirò ńlá àti ètò ìgbẹ́kẹ̀lé. Ọ̀kan lára àwọn àwárí pàtàkì ni ọ̀nà kan tí a ń pè ní **amortization tí a fi ṣe àkójọpọ̀**: ìṣàfihàn ìṣàtúnṣe nípa lílo ètò ìfọwọ́sowọ́pọ̀ onípele-pupọ kan tí ó dá lórí àríyànjiyàn ọjà inú, tí ó ń mú iṣẹ́ sunwọ̀n sí i nígbà tí ó ń yẹra fún ètò ìgbẹ́kẹ̀lé náà.

Àwọn [ìwé Halo](https://eprint.iacr.org/2019/1021.pdf) Ó ṣàlàyé ètò ìfọwọ́sowọ́pọ̀ onípele yìí ní kíkún, ó sì ṣàwárí pé ọ̀nà ìṣọ̀kan tuntun kan wà nínú rẹ̀. Ọ̀nà náà gba ọ̀pọ̀lọpọ̀ ẹ̀rí tí a ṣẹ̀dá láti jẹ́rìí sí ní kíákíá bíi fífún ẹ̀rí kan ṣoṣo ní ẹ̀rí. Fúnra rẹ̀, èyí ti fúnni ní àyípadà tó dára jù sí àwọn zk-SNARKs ìṣáájú tí a lò nínú Zcash.

### Halo 2

Halo 2 jẹ́ ìgbésẹ̀ zk-SNARK tó ní agbára gíga tí a kọ sínú Rust èyí tó mú kí àìní fún ètò tó ṣeé gbẹ́kẹ̀lé kúrò nígbà tí ó ń ṣètò ìpele fún ìyípadà nínú Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Ó ní ìṣàkójọpọ̀ ọ̀nà tí a ń pè ní **ìṣètò ìkójọ**. Ìṣètò yìí fi bí ìṣàkójọpọ̀ onípele ṣe ń ṣiṣẹ́ hàn: nípa fífi àwọn ẹ̀rí kún ohun tí a ń pè ní **àkójọpọ̀**, níbi tí ẹ̀rí kọ̀ọ̀kan ti jẹ́rìí nípa ipò ìṣètòpọ̀ tẹ́lẹ̀, gbogbo ẹ̀rí ìṣáájú ni a lè ṣàyẹ̀wò (nípasẹ̀ ìfàsẹ́yìn) nípa ṣíṣàyẹ̀wò ipò ìṣètòpọ̀ lọ́wọ́lọ́wọ́.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Ní ìfiwéra, ọ̀pọ̀lọpọ̀ àwọn ẹgbẹ́ mìíràn ń ṣàwárí àwọn IOP Polynomial tí ó gbéṣẹ́ ju Sonic lọ (tí a lò nínú Halo 1), bíi Marlin. Èyí tí ó gbéṣẹ́ jùlọ nínú àwọn ìlànà wọ̀nyí ni PLONK, èyí tí ó fúnni ní ìyípadà ńlá nínú ṣíṣe àgbékalẹ̀ àwọn ìgbésẹ̀ tí ó gbéṣẹ́ tí ó da lórí àwọn àìní pàtó fún ìlò àti pé ó fúnni ní àkókò ìdánilójú tí ó dára jù 5× ju Sonic lọ.

[Àkótán PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo ninu eto-ẹkọ ti o gbooro julọ

Electric Coin Company ṣe àdéhùn pẹ̀lú Protocol Labs, Filecoin Foundation, àti Ethereum Foundation láti ṣe àwárí Halo R&D, pẹ̀lú bí a ṣe lè lo ìmọ̀-ẹ̀rọ náà nínú àwọn nẹ́tíwọ́ọ̀kì wọn. Àdéhùn náà ní èrò láti pèsè ìtóbi tó dára jù, ìbáṣepọ̀, àti ìpamọ́ káàkiri àwọn ètò-ẹ̀dá ayé àti fún Web 3.0.

Ni afikun, Halo 2 wa labẹ ọkọ ofurufu naa [Àwọn ìwé-àṣẹ orísun ṣíṣí sílẹ̀ MIT àti Apache 2.0](https://github.com/zcash/halo2#readme), èyí túmọ̀ sí wípé ẹnikẹ́ni nínú ètò àyíká ayé lè kọ́ pẹ̀lú ètò ìṣàfihàn.

**Filecoin.** Láti ìgbà tí wọ́n ti gbé e kalẹ̀, wọ́n ti gba ìkàwé halo2 nínú àwọn iṣẹ́ bíi zkEVM, wọ́n sì lè so Halo 2 pọ̀ mọ́ ètò ìdánilójú fún Ẹ̀rọ Filecoin Virtual. Filecoin nílò ọ̀pọ̀lọpọ̀ ẹ̀rí tó gbowó lórí àkókò àyè àti ẹ̀rí ìṣẹ̀dá; Halo 2 ṣe pàtàkì nínú fífún lílo ààyè pọ̀ àti fífún nẹ́tíwọ́ọ̀kì náà ní ìwọ̀n tó dára jù. [Fidio Filecoin Foundation pẹlu Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)Yoo tun ṣe anfaani fun awọn eto-aye mejeeji ti a ba le ṣe awọn sisanwo ibi ipamọ Filecoin ni ZEC, ti o funni ni ikọkọ kanna fun awọn rira ibi ipamọ ti o wa ninu awọn gbigbe aabo Zcash - pẹlu fifi ẹnọ kọ awọn faili ni ibi ipamọ Filecoin ati atilẹyin fun awọn alabara alagbeka ti o so media mọ akọsilẹ ti a fi pamọ Zcash. [ECC × Ìfiranṣẹ́ bulọọgi Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Ẹ̀rí Halo 2 fún Ìṣiṣẹ́ Ìdádúró Verifiable (VDF) tó gbéṣẹ́ ni wọ́n ń ṣe. VDF jẹ́ ìpìlẹ̀ ìkọ̀kọ̀ pẹ̀lú ọ̀pọ̀lọpọ̀ àwọn ọ̀ràn lílo tó ṣeé ṣe, títí kan àìròtẹ́lẹ̀ fún àwọn àdéhùn ọlọ́gbọ́n àti ìdìbò olórí nínú Proof of Stake. ECC, Filecoin Foundation, Protocol Labs, àti Ethereum Foundation náà ń ṣiṣẹ́ pẹ̀lú [SupraNational](https://www.supranational.net/), olùtajà kan tí ó jẹ́ ògbóǹtarìgì nínú ìkọ̀kọ̀ ohun èlò tí ó yára sí i, fún ìdàgbàsókè GPU àti ASIC ti VDF [Ẹgbẹ́ Ìpamọ́ àti Ìwádìí Ìwọ̀n-ẹ̀rọ](https://appliedzkp.org/) ń ṣe ìwádìí àwọn ọ̀nà afikún tí àwọn ẹ̀rí Halo 2 lè gbà mú ìpamọ́ àti ìyípadà tó pọ̀ sí i fún Ethereum sunwọ̀n síi.

### Awọn iṣẹ akanṣe miiran ti o nlo Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — ìlànà ìyípadà atomiki multichain kan tí ó ń dáàbò bo ìpamọ́
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — L2 zkRollup kan lori Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — blockchain L1 zkEVM ikọkọ kan
- [Yi lọ kiri](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) - ohun L2 zkRollup lori Ethereum

---

## Àwọn Àbájáde Tó Wúlò

**Fún Zcash fúnra rẹ̀**

- Adágún tí wọ́n fi ààbò Orchard ṣe, tí wọ́n fi NU5, ni wọ́n fi ṣe ètò ìdánilójú tuntun yìí lórí nẹ́tíwọ́ọ̀kì Zcash. A ṣe àkóso rẹ̀ pẹ̀lú irú àwòrán kan náà tí wọ́n lò láàárín Sprout àti Sapling, pẹ̀lú èrò láti fi àwọn adágún tí wọ́n ti dáàbò bò tẹ́lẹ̀ sílẹ̀ díẹ̀díẹ̀.
- Lẹ́yìn NU5 (ààrin ọdún 2022), ìṣọ̀kan àwọn ẹ̀rí ìyípadà di ohun tó ṣeé ṣe, ọ̀pọ̀lọpọ̀ àtúnṣe ìpamọ́ sì wá pẹ̀lú rẹ̀ — pàápàá jùlọ ìfìhàn 'Ìgbésẹ̀' tí ó rọ́pò àwọn ohun tí a fi sínú/àwọn ohun tí ó jáde, èyí tí ó dín iye metadata ìṣòwò kù.
- Yíyọ àwọn ètò ìgbẹ́kẹ̀lé kúrò nínú ewu ètò kan tí ìbá ti jẹ́ pé a gbọ́dọ̀ tún ṣe fún gbogbo ìgbéga ìlànà pàtàkì.

**Fun awọn onimu ati awọn oniṣẹ**

- Àkójọpọ̀ ẹ̀rí ìṣàtúnṣe ní agbára láti fún ìṣírò àìlópin ní ìwọ̀n àìlópin, ṣíṣẹ̀dá àwọn ètò tí a lè ṣàyẹ̀wò, àti mímú agbára Layer 1 sunwọ̀n síi fún àwọn olùṣiṣẹ́ ní gbogbo node — tí ó bá àwọn ìfàgùn bíi Zcash Shielded Assets àti àwọn àwòrán ìgbà pípẹ́ Zcash's mu.

---

## Àwọn Àṣìṣe Tó Wọ́pọ̀

| Ìgbàgbọ́ gbogbogbò | Kí ni ó jẹ́ gan-an? |
| --- | --- |
| "Halo jẹ́ àtúnṣe ọjọ́ iwájú tí Zcash ń dúró dè." | Orchard, ti o wa laaye lori mainnet lati NU5 (2022), ti n ṣiṣẹ tẹlẹ lori Halo 2. |
| "Ko si eto ti a gbẹkẹle tumọ si pe ko si awọn paramita rara." | Halo ṣì ń lo àwọn pàrámítà tí a ṣètò; ìyàtọ̀ náà ni pé wọn kò ní egbin olóró kankan, wọ́n sì lè ṣẹ̀dá àti ṣe àtúnṣe láìsí àwọn olùkópa nínú ayẹyẹ náà tí wọ́n gbọ́dọ̀ gbẹ́kẹ̀lé. |
| "Halo 2 àti ìwé Halo jẹ́ ohun kan náà." | Àwọn [iwe](https://eprint.iacr.org/2019/1021.pdf) ṣàlàyé ètò ìfọwọ́sowọ́pọ̀ onípele-pupọ àti ìṣàtúnṣe àfikún; Halo 2 ni ìṣelọ́pọ́ Rust pẹ̀lú ètò ìkójọpọ̀ àti ìṣirò PLONKish. |
| "Recursion n ran lọwọ nikan pẹlu iṣipopada iṣeduro bulọọki." | Recursion tún ń so ìṣírò ìpele ìṣiṣẹ́ pọ̀ — wo àwọn ẹ̀rí Filecoin's nípa àkókò spacetime/replication àti iṣẹ́ VDF fún Ethereum. |

---

## Àwọn ojú ìwé tó jọra

- [zk-SNARKs](/zcash-tech/zk-snarks) — ẹ̀ka ìmọ̀-ẹ̀rọ gbogbogbò Halo jẹ́ ti
- [Halo (ìwé ìwádìí)](https://eprint.iacr.org/2019/1021.pdf) — ìtẹ̀jáde àtilẹ̀wá
- [Ironwood](/zcash-tech/ironwood) àti [Ìyípadà náà](/zcash-tech/the-turnstile) — bí àwọn adágún adágún tí a dáàbò bo ṣe ń ṣí lọ nígbà tí àwọn àgbàlagbà bá fẹ̀yìntì
- [Àwọn Ohun Ìní tí a fi ààbò Zcash ṣe](/zcash-tech/zcash-shielded-assets) — itẹsiwaju kan ti o ni anfani lati awọn ẹri loorekoore
- [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node) — imuse node ti o jẹrisi awọn ẹri lori pq

## Ẹ̀kọ́ Síwájú

- [Ifihan si ZKP ati Halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 pẹ̀lú Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Bulọọgi alaye imọ-ẹrọ](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Ifihan Agbegbe Halo 2 — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Ìwé àkọsílẹ̀**

- [Awọn orisun Halo 2](https://github.com/mhchia/awesome-halo2)
- [Àwọn ìwé Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)

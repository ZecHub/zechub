<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 lọ si igbesi aye lori Zcash mainnet ni bulọọki 1,687,104 (May 31, 2022 UTC).

Ohun tí ẹ óo mú lọ: bí NU5 ṣe fún Zcash ní àgbá tuntun tó ń dáàbò bo owó, èyí kò nílò ìmúrasílẹ̀ gbígbẹ́kẹ̀lé kankan, àti irú àdírésì kan ṣoṣo tó máa ṣiṣẹ láàrín àwọn àgbá.

NU5 (Network Upgrade 5) ni Zcash kẹfa ti a ṣe lati jẹ ki o ṣiṣẹ. [àtúnṣe síra ẹ̀rọ](../start-here/network-upgrades), tí a gbé kalẹ̀ nípasẹ̀: [ZIP 252](https://zips.z.cash/zip-0252). It is a major cryptographic upgrade. It introduced the Orchard shielded payment protocol, built on the Halo 2 proving system, along with unified addresses and a new version 5 transaction format. NU5 shipped in the Electric Coin Company's zcashd v5.0.0 release.

ìdí tí èyí fi ṣe pàtàkì. ààbò ìsọ̀ kan jẹ́ olóòótọ̀ gẹ́gẹ́ bí ètò tó dá a sílẹ̀. àwọn méjì àkọ́kọ́ nínú Zcash, Sprout àti Sapling nílò ìdánilẹ́nuwò ìgbàkan ṣoṣo láti mú ìlànà àṣírí wọn jáde. bí wọ́n bá pa òfin náà mọ́ dípò kí ó bàjẹ́, ẹnìkan lè tẹ ẹ̀dà ZEC láìṣe ẹnikẹ́ni rí i. Àjọ Orchard ti NU5 máa ń yanjú ìṣòro yìí nípa lílo ètò èrídìí Halo 2, kò sì sí irú ìgbésè bẹ́ẹ̀ kankan fún un.

## Ìdásílẹ̀ tí a fọkàn tán náà.

Orchard jẹ ilana aabo tuntun ti Zcash, eyiti a ṣalaye ninu [ZIP 224](https://zips.z.cash/zip-0224)O ti kọ lori eto idaniloju Halo 2, eyiti o nlo ilana kan ti a pe ni PLONKish arithmetization on Pallas ati Vesta iyipo iyika. Awọn owo-owo to wulo jẹ rọrun: Halo 2 ko nilo iṣeto igbẹkẹle tabi okun itọkasi atunkọ, nitorinaa ko si paramita aṣiri ti o le ṣee lo laiṣe.

Sprout ati Sapling mejeeji da lori iṣeto igbẹkẹle. Ẹgbẹ eniyan kan ṣe ayẹyẹ lati kọ awọn iwọn didun ti adagun kọọkan, gbogbo wọn ni lati gbẹkẹle pe o kere ju ọkan ninu wọn ba apakan aṣiri rẹ jẹ. Orchard yọ ero yẹn kuro. Awọn adagun agbalagba tun wa lẹhin NU5, nitorinaa iṣeduro ko si-iṣeto waye fun owo ti o mu sinu adagun Orchard .

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## Àwọn ohun tí NU5 yí padà

NU5 ṣe àkójọ àwọn àyípadà ìfohùnṣòótọ́ bíi mélòó kan, gbogbo wọn ni a dá sílò papọ̀ ní ẹyọ 1,687,104.

1. O fi kun adagun Orchard ti a bo (ZIP 224), ilana Halo 2 da lori apejuwe loke.
2. O fi awọn ẹya 5 idunadura kika (ZIP 225), a restructured layout pẹlu lọtọ agbegbe fun ṣiṣan, Sapling, ati titun Orchard data. Sprout aaye ti wa ni kuro, ati ki o gun version 4 ọna kika duro wulo lẹhin igbekale.
3. O ṣafihan awọn adirẹsi iṣọkan ati awọn bọtini wiwo ti o ni ibamu (ZIP 316), eyiti a bo ninu apakan atẹle.
4. It adopted transaction identifier non-malleability (ZIP 244), a new way of computing a transaction's id that separates what a transaction does from the proofs and signatures that authorize it.
5. O gba awọn ifaminsi ojuami Jubjub ti o jẹ ofin (ZIP 216) lati yọkuro awọn ifamọra ti ko ni deede ati mu awọn ilana naa ṣe lori ohun ti a kà si iṣowo to wulo.
6. O ṣe iranlọwọ fun fifiranṣẹ awọn iṣowo ti ẹya 5 kọja nẹtiwọọki ẹlẹgbẹ-si-ẹlẹgbẹ (ZIP 239).

NU5 tun ṣe imudojuiwọn nọmba kan ti ZIP tẹlẹ (32, 203, 209, 212, 213, 221, ati 401) nitorinaa wọn ṣalaye fun adagun Orchard tuntun.

## Àwọn àdírẹ́sì tó wà níṣọ̀kan

Ṣaaju ki o to NU5, kọọkan pool ní awọn oniwe-ara adirẹsi iru, ati a sender ni lati mọ eyi ti irú ti o fẹ. unified ìsọfúnni, apejuwe ninu [ZIP 316 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0316)Adirẹsi kan ṣoṣo le ṣajọ awọn olugba fun ju apapọ lọ, nitorinaa apamọwọ oluranlowo nikan yan eyi ti o dara julọ ti o ṣe atilẹyin.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Awọn bọtini wiwo iṣọkan ṣiṣẹ ni ọna kanna fun wiwo. Wọn fi han kika nikan kọja awọn adagun adirẹsi kan bo. Fun diẹ sii lori iyẹn, wo awọn ohun elo ti o wa ninu rẹ lati ṣafihan wọn si gbogbo eniyan miiran ati pe yoo jẹ ki a mọ bi a ṣe le rii wọn daradara pẹlu lilo data naa. [Àwọn Kókó Ìwòran](../zcash-tech/viewing-keys) ojú ìwé.

## Ibi tí NU5 wà.

NU5 tẹsiwaju awọn igbesoke Zcash ti iṣaaju: Overwinter, Sapling, Blossom, Heartwood ati Canopy. O ṣiṣẹ lori mainnet ni Oṣu Karun ọjọ 31, Ọdun 2022. A yan iyipo iyipo Orchard nitori o ṣe atilẹyin atunṣe, eyiti o jẹ ipilẹ fun iṣẹ titobi nigbamii. NU5 jẹ alagbata taara si laini NU6 ati NU6.x ti awọn ilọsiwaju, eyiti a kọ sori adagun-odo igi gbigbẹ oloorun ati lẹhinna fi sii.

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
 Network upgrade (NU)  Aṣayan iyipada ti a ṣepọ si awọn ofin ifọkanbalẹ Zcash, ti o ṣiṣẹ ni giga bulọọki ṣeto.
 Orchard. Ìlé ìwẹ̀ tí a fi ààbò ṣe, èyí ti NU5 gbé kalẹ̀ lórí ètò ìdánwò Halo 2.
Halo 2 Àmì ètò tí ó wà lẹ́yìn Orchard èyí kò nílò ìmúrasílẹ̀ tó ṣeé gbára lé.
ìdásílẹ̀ tí a fọkàn tán. Àjọṣe kan ṣoṣo tó ń ṣe àwọn ìlànà ìpamọ́ adágún omi, ó sì gbọ́dọ̀ ṣeé gbára lé láti pa wọ́n run.
 Adirẹsi ti o ṣọkan Aṣayan kan ṣoṣo tí ó le kó àwọn olùgba fún ju ìdìpò̀-ìpín lọ (ZIP 316)
☐ Idì ẹ̀ka ìfọwọ́sowọ́pọ̀ (consensus branch id) ☐ Àmì ìdánimọ tí ó ń sàmọ̀nà sí ìlànà ti ìṣòwò kan jẹ́ tirẹ̀.

## Àwọn ìbéèrè tí a sábà máa ń béèrè

Ṣé NU5 yí ZEC mi padà tàbí ìpamọ́ra mí? Àìní. Nu5 fi àgbá tuntun tí a dì àti ọ̀nà adirẹsi titun kún un. A kò ní nípa lórí àwọn ZEC rẹ tó wà, wọn ò sì dín àṣírí ẹ kù. Fífi owó sínú Orchard fún ọ ní àgbá kan tí kì í nílò ètò ìṣètò gbígbẹkẹlé kankan.

Kí ni Orchard? Orchid jẹ ìlànà tí a fi ààbò ṣe ti Zcash, èyí tí NU5 gbé kalẹ̀. Ó ń ṣiṣẹ́ lórí ètò ìwádìí Halo 2, nítorí náà kò nílò ayẹyẹ ìṣètò tó gbẹkẹlé kankan.

ṣé mo ní láti ṣe ohunkóhun? rárá. àpò owó tí a fọwọ́ sí ń bójú tó NU5 fún ọ o lè máa lo àwọn àdírésì àtijọ, ó sì le bẹ̀rẹ̀ sí í lò àwọn adiresi ìṣọ̀kan nígbàtí àpò rẹ bá pèsè wọn.

Kí ni àdírẹ́sì tí ó wà ní ọ̀kan? Adirẹsi kan ṣoṣo tó lè gba àwọn olùgba fún ju àgbájọ lọ. Ẹlẹ́tà ẹni ti o ránṣẹ́ yan àgbájútó tí ó ń ṣe atilẹyin, nítorí náà kò sí ìdí láti pín adirẹsí òdìkejì fún oríṣi kọ̀ọ̀kan.

Ṣé NU5 yọ ìgbéga ìgbàgbọ́ kúrò nínú àwọn owó mi tí ó ti pẹ̀? Kò sí ní ọ̀nà àtúnṣe. Orchard kò nílò ìmúṣẹ ìgbàgbọ̣, ṣùgbọ́n ìlànà ìṣètò Sapling ṣì wà lẹ́yìn NU5. Ìdánilójú àìdáwó náà kan àwọn owó tó ń bẹ nínú àjọ Orchard.

Njẹ ọna kika iṣowo atijọ ti dẹkun ṣiṣẹ? No. NU5 ṣafikun ọna kika ẹya 5, ati pe ọna kika 4 agbalagba jẹ wulo lẹhin ifisilẹ.

## Wádìí òye rẹ wò

Sprout ati Sapling mejeeji nilo ayẹyẹ iṣeto ti o gbẹkẹle. Kini idiwọ Orchard NU5 ṣe ayipada nipa iyẹn, ati pe kilode ti o fi jẹ pataki?

<details>
<summary>Answer</summary>

Orchard ti kọ lori eto idaniloju Halo 2, eyiti ko nilo iṣeto igbẹkẹle ati pe o wa ni okun itọkasi. Eyi yọ ewu kuro pe awọn idiwọn aṣiri iyokù le ṣee lo lati ṣe ayederu ZEC. Idaabobo naa kan si owo-owo ti a waye ninu adagun Orchard. Awọn iwọn didun Sapling agbalagba tun wa lẹhin NU5.
</details>

### Àwọn Owó-ìṣúnná owó

[ZIP 252: Ṣíṣiṣẹ́ Àtúnṣe sí Nẹtiwọọki NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Àlàkalẹ́ tí a fi ààbò ṣe sí ọgbà òdòdó èso (Orchard Shielded Protocol)](https://zips.z.cash/zip-0224)

[ZIP 225: Ẹ̀dà 5 Àkọlé Ìṣirò Ọna ìsopọ́](https://zips.z.cash/zip-0225)

[ZIP 316: Àwọn Adirẹsi Tí ó Ṣọ̀kan àti àwọn Kókó Ìwòran tí Ó Ṣò̀kan](https://zips.z.cash/zip-0316)

[Àtúnṣe sípínlẹ̀ 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 ìfilọlẹ](https://electriccoin.co/blog/new-release-5-0-0/)

### Ẹ tún wo:

[Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)

[Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[àwọn ohun èlò tí wọ́n ń pè ní zk-SNARKS](../zcash-tech/zk-snarks)

[Àwọn Kókó Ìwòran](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àwọn tó ṣáájú: [Àgbàlá ilé](../zcash-tech/canopy) · Àtúnṣe: [NU6](../zcash-tech/nu6)

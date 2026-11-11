<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Blossom

> Blossom ilianza kutumika kwenye mainnet ya Zcash katika block 653,600 (Desemba 11, 2019 UTC).

Utajifunza: jinsi Blossom ilivyofanya block za Zcash zifike kwa kasi takriban mara mbili bila kubadilisha kiasi cha ZEC ambacho mtandao huunda kadiri muda unavyopita.

Blossom ni Zcash [uboreshaji wa mtandao](../start-here/network-upgrades). Ilitekelezwa kupitia [ZIP 206](https://zips.z.cash/zip-0206), na mabadiliko yake makuu ya makubaliano yamefafanuliwa katika [ZIP 208](https://zips.z.cash/zip-0208). Blossom ulikuwa uboreshaji wa kupanua uwezo: ulipunguza muda lengwa kati ya block kutoka sekunde 150 hadi sekunde 75, hivyo block hufika takriban mara mbili zaidi. Electric Coin Company iliongoza na kutangaza Blossom.

Kwa nini hili ni muhimu. Unapotuma ZEC, unasubiri mtandao uthibitishe katika block. Ikiwa block ni za polepole, unasubiri kwa muda mrefu zaidi. Kabla ya Blossom, block mpya ilitarajiwa takriban kila sekunde 150. Blossom ilipunguza lengo hilo kwa nusu, hadi sekunde 75, hivyo uthibitisho hupatikana mapema na mnyororo unaweza kubeba miamala mingi zaidi katika muda uleule. Ilifanya hivi bila kuunda ZEC zaidi au kubadilisha muda wa kupunguzwa kwa nusu siku zijazo.

## Block za kasi zaidi

Mabadiliko ya msingi ya Blossom ni rahisi. Muda lengwa kati ya block wa Zcash [target block spacing], yaani muda ambao mtandao hulenga kati ya block moja na inayofuata, ulipungua kutoka sekunde 150 hadi sekunde 75 ([ZIP 208](https://zips.z.cash/zip-0208)). Block hupatikana kwa thibitisho la kazi [proof of work], hivyo pengo halisi kati yake hutofautiana, lakini mtandao sasa hulenga block moja takriban kila sekunde 75 badala ya kila sekunde 150.

Mambo mawili hufuata:

1. Block hufika takriban mara mbili zaidi, hivyo mnyororo unaweza kubeba takriban miamala mara mbili kwa kila kipimo cha muda.
2. Muamala wako hupata uthibitisho wake wa kwanza mapema, kwa sababu husubiri kwa muda mfupi zaidi block inayofuata.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Kudumisha utoaji thabiti

Block za kasi zaidi huibua swali. Ikiwa Zcash ingetengeneza block mara mbili zaidi na kila block bado ilipewa zawadi ileile, mtandao ungeunda ZEC kwa kasi mara mbili zaidi. Blossom huepusha hilo. Ilipunguza kwa nusu zawadi inayolipwa kwa kila block, na ikaongeza kwa mara mbili kipindi cha kupunguzwa kwa nusu cha zawadi ya block kutoka block 840,000 hadi 1,680,000 ([ZIP 208](https://zips.z.cash/zip-0208)). Block mara mbili zaidi, kila moja ikilipa nusu ya kiasi, husababisha kiasi kilekile cha ZEC kuundwa kwa kila kipimo cha muda. Ratiba ya jumla ya ugavi na muda wa kupunguzwa kwa nusu siku zijazo, unapopimwa kwa muda halisi, haukubadilika.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Uboreshaji wa lazima

Blossom ulikuwa mabadiliko ya makubaliano ya pande mbili [bilateral consensus change], ambayo yanamaanisha kila node ilipaswa kuboreshwa ili iendelee kufuata mnyororo ([ZIP 206](https://zips.z.cash/zip-0206)). Haikuwa hiari kwa mwendeshaji wa node aliyetaka kuendelea kusawazishwa. Blossom iliwashwa katika block 653,600 ya mainnet na ina kitambulisho chake cha tawi la makubaliano [consensus branch id], lebo inayoruhusu node na miamala kuthibitisha kuwa ziko kwenye kanuni za Blossom. Uboreshaji ulitumia utaratibu wa kawaida wa uboreshaji wa mtandao wa Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Nafasi ya Blossom

Blossom ulikuwa uboreshaji wa tatu wa mtandao wa Zcash. Ulifuata Overwinter na Sapling, na ulikuja kabla ya Heartwood na Canopy. Tofauti na Sapling, ambao ulifanyia upya kriptografia ya faragha ya Zcash, Blossom ulilenga uwezo na kasi. Jukumu lake kuu lilikuwa muda wa block, si vipengele vipya vya faragha.

## Faharasa

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Block target spacing | Muda ambao mtandao hulenga kati ya block moja na inayofuata |
| Block reward | ZEC mpya inayoundwa na kulipwa block inapochimbwa |
| Halving interval | Idadi ya block zinazopita kati ya kila kupunguzwa kwa nusu kwa zawadi ya block |
| Consensus branch id | Lebo inayoonyesha seti ipi ya kanuni za mtandao ambayo node au muamala inafuata |
| Bilateral consensus change | Mabadiliko ya kanuni ambayo kila node lazima ikubali ili ibaki kwenye mtandao |
| Network upgrade (NU) | Mabadiliko yaliyoratibiwa kwa kanuni za makubaliano za Zcash, yanayowashwa katika urefu maalumu wa block |

## Maswali Yanayoulizwa Mara kwa Mara

Je, Blossom hubadilisha kiasi cha ZEC kilichopo au wakati kupunguzwa kwa nusu hutokea? Hapana. Zawadi kwa kila block ilipunguzwa kwa nusu na kipindi cha kupunguzwa kwa nusu kikaongezwa mara mbili kwa wakati mmoja, hivyo kiasi cha ZEC kinachoundwa kwa kila kipimo cha muda, pamoja na muda wa kupunguzwa kwa nusu siku zijazo, kilibaki kilekile.

Je, Blossom hubadilisha ZEC yangu au faragha yangu [privacy]? Hapana. Blossom ilibadilisha muda wa block na hesabu za zawadi. Haikugusa salio lako wala miamala yako ya faragha [shielded transactions].

Sekunde 75 zinamaanisha nini hasa? Ni lengo, si hakikisho. Block hupatikana kwa thibitisho la kazi, hivyo pengo halisi kati ya block hutofautiana. Mtandao hulenga moja takriban kila sekunde 75 badala ya kila sekunde 150.

Je, nilipaswa kufanya jambo lolote Blossom ilipowashwa? Ikiwa uliendesha full node, ulihitaji kuiboresha, kwa sababu Blossom ulikuwa wa lazima. Ikiwa ulitumia pochi, ulihitaji toleo lililounga mkono kanuni mpya.

Kwa nini kupunguza zawadi ya block kwa nusu? Kwa sababu block sasa hufika kwa kasi mara mbili zaidi. Kupunguza zawadi kwa kila block kwa nusu huzuia mtandao kuunda ZEC kwa kasi mara mbili zaidi.

Blossom iliwashwa lini? Katika block 653,600 ya mainnet, Desemba 11, 2019 UTC.

## Jaribu uelewa wako

Blossom ilifanya block za Zcash zifike takriban mara mbili zaidi. Kwa nini hilo halikuongeza mara mbili kiwango ambacho ZEC mpya huundwa?

<details>
<summary>Jibu</summary>

Kwa sababu Blossom pia ilipunguza kwa nusu zawadi inayolipwa kwa kila block na ikaongeza kwa mara mbili kipindi cha kupunguzwa kwa nusu kutoka block 840,000 hadi 1,680,000. Block mara mbili zaidi, kila moja ikilipa nusu ya kiasi, hujumlisha kiasi kilekile cha ZEC kwa kila kipimo cha muda, hivyo ratiba ya utoaji inayopimwa kwa muda halisi haikubadilika.
</details>

### Rasilimali

[ZIP 208: Muda Lengwa Mfupi Zaidi Kati ya Block](https://zips.z.cash/zip-0208)

[ZIP 206: Utekelezaji wa Uboreshaji wa Mtandao wa Blossom](https://zips.z.cash/zip-0206)

[Blossom Uboreshaji wa Mtandao](https://z.cash/upgrade/blossom/)

[Blossom Uboreshaji Huongeza Kasi, Uwezo wa Kupanua, na Uwezo wa Kubeba (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Sera ya Kifedha ya Zcash](../start-here/zcash-monetary-policy)

[ZEC ni nini na Zcash](../start-here/what-is-zec-and-zcash)

[Full Nodes](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Sapling](../zcash-tech/sapling) · Inayofuata: [Heartwood](../zcash-tech/heartwood)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood ilizinduliwa kwenye mainnet ya Zcash katika block 903,000 (Julai 16, 2020 UTC).

Utakayojifunza: jinsi Heartwood ilivyowawezesha wachimbaji kupokea zawadi zao za block moja kwa moja kwenye anwani za faragha [shielded addresses], na jinsi ilivyofanya uthibitishaji wa proof-of-work wa Zcash uweze kukaguliwa na light client.

Heartwood ni Zcash [uboreshaji wa mtandao](../start-here/network-upgrades), hard fork ya sheria za makubaliano ambayo utekelezaji wake umefafanuliwa katika [ZIP 250](https://zips.z.cash/zip-0250). Iliunganisha mabadiliko mawili ya vipengele: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) na [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood ulikuwa uboreshaji wa nne mkubwa wa mtandao wa Zcash, na uliungwa mkono kwa pamoja na [Electric Coin Company](../zcash-organizations/electric-coin-company) na [Zcash Foundation](../zcash-organizations/zcash-foundation). Kama kila uboreshaji wa Zcash, uliweka kitambulisho kipya cha tawi la makubaliano, lebo inayotoa ulinzi wa kurudia muamala katika pande zote mbili ili muamala ulioundwa chini ya sheria mpya usiweze kurudiwa kwenye mnyororo wa zamani, na kinyume chake.

Heartwood huwashwa kwenye kimo cha block kilichowekwa (903,000), si kwa muda maalumu wa saa, kwa hiyo dakika kamili unayoiona kwenye dashibodi inaweza kutofautiana kidogo kutoka mahali pamoja hadi pengine. Block, na wakati huo, ni uleule.

Kwa nini hili ni muhimu. Wachimbaji hupata ZEC mpya kila wanapochimba block. Kabla ya Heartwood, mapato hayo yalilazimika kuingia kwenye anwani ya uwazi [transparent address], ambayo ni ya umma. Mtu yeyote angeweza kuona kiasi alichopata mchimbaji na mahali ambapo sarafu zilienda baadaye. Heartwood iliruhusu zawadi hiyo kwenda moja kwa moja kwenye anwani ya faragha badala yake, hivyo malipo ya mchimbaji yanaweza kubaki ya siri. Pia iliwezesha pochi nyepesi na minyororo mingine kukagua proof-of-work ya Zcash bila kupakua mnyororo mzima.

## Coinbase ya faragha [Shielded coinbase]

Muamala wa coinbase ni muamala maalumu unaolipa zawadi ya block. Kabla ya Heartwood, matokeo yake yalilazimika kuwa ya uwazi, hivyo ZEC mpya za mchimbaji daima zilianza katika anwani ya umma. Heartwood ilibadilisha sheria za makubaliano ili kwamba, kwa maneno ya ZIP 213, miamala ya coinbase inaweza kuwa na matokeo ya Sapling. Kwa maneno rahisi, wachimbaji sasa wanaweza kupokea zawadi moja kwa moja kwenye anwani za Sapling za faragha. Matokeo ya coinbase ya uwazi bado yanaungwa mkono, kwa hiyo hili ni chaguo jipya, si mabadiliko ya lazima.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Kwa nini Sapling kwanza

Coinbase ya faragha inalenga hasa matokeo ya Sapling, na kuna sababu ya hilo. ZIP 213 inaeleza kwamba uboreshaji wa Sapling ulileta mabadiliko ya usanifu na maboresho ya utendaji yaliyofanya kuficha fedha moja kwa moja katika muamala wa coinbase kuwezekane. Bwawa la awali la faragha la Sprout lilihitaji rasilimali nyingi mno ili kuficha fedha moja kwa moja katika coinbase. Mfumo bora zaidi wa uthibitishaji na muundo wa dokezo wa Sapling ulifanya jambo hili liwe la vitendo. Sapling yenyewe ilikuwa imepanua sheria ya zamani iliyokataza matokeo ya coinbase ya faragha ili sheria hiyo pia ihusu matokeo ya Sapling, na Heartwood hulegeza sheria hiyo ili kuyaruhusu. Huu ni mfano mzuri wa jinsi maboresho ya mtandao ya Zcash yanavyojengana: miundombinu ya uboreshaji mmoja huwa msingi wa unaofuata.

## FlyClient

Heartwood pia ilibadilisha kile ambacho kichwa cha block kinaweka commitment yake. Sehemu ya kichwa iliyokuwa ikiitwa hashFinalSaplingRoot ilitumika upya na kuitwa hashLightClientRoot. Sasa inaweka commitment kwa mzizi wa Merkle Mountain Range (MMR), muundo unaoendelea kujengwa juu ya data ya kichwa na metadata ya block zilizopita, kama vile nyakati, malengo ya ugumu, mizizi ya Sapling, kazi iliyokusanywa, na hesabu za miamala. Commitment hiyo humwezesha light client, au mnyororo wa nje, kuthibitisha proof-of-work ya Zcash kwa kutumia thibitisho dogo ambalo ukubwa wake hukua kwa logarithimu pekee kulingana na urefu wa mnyororo. Faida yake ni pochi bora za light client na ujumuishaji rahisi zaidi wa wahusika wengine na cross-chain, kwa sababu mteja hahitaji tena kupakua kila block ili kuamini kazi iliyo nyuma ya mnyororo.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Nafasi ya Heartwood

Heartwood ni hatua moja katika mfululizo wa maboresho ya mtandao ya Zcash, huku kila moja likiongeza sehemu ambayo linalofuata hutegemea. Overwinter na Sapling zilifika mwaka 2018, Blossom mwaka 2019, na Heartwood mwaka 2020 katika block 903,000. Canopy ilifuata baadaye mwaka 2020 katika block 1,046,400. Sapling ni kiungo muhimu katika mnyororo huu kwa Heartwood: mitambo yake bora ya miamala ya faragha ilikuwa sharti la kiufundi lililowezesha coinbase ya faragha.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## Fahirisi ya istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Network upgrade (NU) | Mabadiliko yaliyoratibiwa kwa sheria za makubaliano za Zcash, yanayowashwa kwenye kimo cha block kilichowekwa |
| Coinbase transaction | Muamala maalumu katika kila block unaolipa zawadi ya block |
| Shielded Sapling address | Aina ya anwani binafsi ya Zcash iliyoanzishwa na uboreshaji wa Sapling |
| Shielded coinbase | Mabadiliko ya Heartwood yanayoruhusu zawadi za block kulipwa kwenye anwani za Sapling za faragha |
| FlyClient | Mbinu inayoruhusu light client kuthibitisha proof-of-work kwa uthibitisho mdogo |
| Merkle Mountain Range (MMR) | Muhtasari unaoendelea wa block zilizopita ambao kichwa cha block huweka commitment kwake |
| Consensus branch id | Lebo inayotambulisha sheria za uboreshaji zinazofuatwa na muamala, inayotumika kwa ulinzi dhidi ya kurudia muamala |

## Maswali Yanayoulizwa Mara kwa Mara

Je, Heartwood inabadilisha ZEC yangu au faragha yangu? Hapana. Heartwood haikugusa fedha zako zilizopo. Iliongeza chaguo kwa wachimbaji kupokea zawadi kwenye anwani za faragha na kuboresha usaidizi kwa light client. Salio lako mwenyewe na miamala ya faragha haiathiriki.

Coinbase ya faragha ni nini? Coinbase ni muamala unaolipa zawadi ya block. Heartwood inaruhusu zawadi hiyo kuingia kwenye anwani ya Sapling ya faragha badala ya anwani ya uwazi, hivyo mapato ya mchimbaji yanaweza kubaki ya siri.

Je, wachimbaji lazima wapokee zawadi za faragha sasa? Hapana. Coinbase ya faragha ni ya hiari. Matokeo ya coinbase ya uwazi yanaendelea kuungwa mkono, hivyo wachimbaji wanaweza kuchagua mojawapo.

Kwa nini coinbase ya faragha hutumia Sapling badala ya bwawa la zamani la Sprout? Kwa sababu muundo bora zaidi wa Sapling ulifanya kuficha fedha moja kwa moja katika coinbase kuwe kwa vitendo. Bwawa la awali la Sprout lilihitaji rasilimali nyingi mno kufanya hivyo.

Ni nini kilibadilika kwa light client? Kichwa cha block sasa kinaweka commitment kwa Merkle Mountain Range juu ya block zilizopita kupitia sehemu ya hashLightClientRoot. Hilo huruhusu light client na minyororo mingine kuthibitisha proof-of-work ya Zcash kwa uthibitisho mdogo wa ukubwa wa logarithimu badala ya mnyororo mzima.

## Jaribu uelewa wako

Kabla ya Heartwood, kwa nini zawadi ya block iliyolipwa kwa mchimbaji ilionekana hadharani, na Heartwood ilibadilisha nini?

<details>
<summary>Jibu</summary>

Matokeo ya Coinbase yalilazimika kuwa ya uwazi, hivyo zawadi mpya ya mchimbaji daima iliingia kwenye anwani ya umma ya uwazi ambayo mtu yeyote angeweza kuikagua. Heartwood ilibadilisha sheria za makubaliano (ZIP 213) ili miamala ya coinbase iweze kuwa na matokeo ya Sapling, na hivyo kuwawezesha wachimbaji kupokea zawadi zao moja kwa moja kwenye anwani za faragha.
</details>

### Rasilimali

[ZIP 250: Utekelezaji wa Uboreshaji wa Mtandao wa Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Coinbase ya Faragha](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Mabadiliko ya Kiwango cha Makubaliano](https://zips.z.cash/zip-0221)

[Heartwood uboreshaji wa mtandao](https://z.cash/upgrade/heartwood/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Mabwawa ya Faragha](../using-zcash/shielded-pools)

[Pochi](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Blossom](../zcash-tech/blossom) · Inayofuata: [Canopy](../zcash-tech/canopy)

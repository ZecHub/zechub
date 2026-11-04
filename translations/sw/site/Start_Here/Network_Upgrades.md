# Maboresho ya Mtandao wa Zcash [Network Upgrades]

Zcash Huboreka kupitia maboresho ya mtandao: mabadiliko yaliyoratibiwa ya kanuni ambazo kila node inakubaliana nazo, kila moja likiwashwa katika urefu mahususi wa block. Kila uboreshaji hapa chini una ukurasa wake unaoeleza, kwa lugha rahisi, kilichobadilika na sababu yake. Je, wewe ni mgeni katika Zcash? Yasome kwa mpangilio, kutoka Sprout hadi Ironwood.

Kwa simulizi la kuona kuhusu jinsi faragha [privacy] ya Zcash ilivyobadilika katika maboresho haya, tazama [Mageuzi ya Faragha](https://zechub.wiki/zcash-evolution). Ukurasa huu ni faharasa. Ule mwingine ni mstari wa matukio.

| Uboreshaji | Uanzishaji (UTC) | Block | Kitambulisho cha tawi | Kile kilichobadilika |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 Oktoba 2016 | genesis | 00000000 | Uzinduzi: bwawa la kwanza la faragha [shielded pool] na miamala ya faragha [private transactions] ya zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 Juni 2018 | 347,500 | 5ba81b19 | Ulinzi dhidi ya kurudiwa, uwekaji wa matoleo ya miamala, na muda wa kuisha, hivyo maboresho salama yakawezekana |
| [Sapling](../zcash-tech/sapling) | 29 Oktoba 2018 | 419,200 | 76b809bb | Miamala bora ya faragha [efficient shielded transactions], yenye kasi ya kutosha kwa simu na hardware wallet |
| [Blossom](../zcash-tech/blossom) | 11 Desemba 2019 | 653,600 | 2bb40e60 | Block zenye kasi zaidi, takriban sekunde 75, na uwezo mkubwa zaidi wa uchakataji |
| [Heartwood](../zcash-tech/heartwood) | 16 Julai 2020 | 903,000 | f5b9230b | Zawadi za uchimbaji wa faragha [shielded mining rewards] na wateja wepesi zaidi (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 Novemba 2020 | 1,046,400 | e9ff75a6 | Mfuko wa Maendeleo, kupunguzwa kwa nusu [halving] kwa kwanza, na kusitisha bwawa la Sprout |
| [NU5](../zcash-tech/nu5) | 31 Mei 2022 | 1,687,104 | c2d6d0b4 | Bwawa la Orchard kwenye Halo 2 (bila usanidi unaoaminika [trusted setup]), anwani zilizounganishwa, na miamala ya v5 |
| [NU6](../zcash-tech/nu6) | 23 Novemba 2024 | 2,726,400 | c8e71055 | Deferred Dev Fund Lockbox na mgawanyo mpya wa ufadhili wa maendeleo |
| [NU6.1](../zcash-tech/nu6-1) | 24 Novemba 2025 | 3,146,400 | 4dec4df0 | Utawala [governance] wa jamii na wamiliki wa sarafu kuhusu ufadhili huo |
| [NU6.2](../zcash-tech/nu6-2) | 3 Juni 2026 | 3,364,600 | 5437f330 | Marekebisho ya dharura yaliyosahihisha saketi ya Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 Julai 2026 | 3,428,143 | 37a5165b | Bwawa la Ironwood na turnstile ya umma inayomwezesha mtu yeyote kukagua ugavi |
| **NU7** (ijayo) | Testnet: 4 Oktoba 2026; Mainnet: inalengwa 5 Novemba 2026 | Testnet: 4,465,026; Mainnet: 3,543,405 | 77190ad9 | Block za sekunde 25 (ZIP 218), urejelezaji wa ada wa NSM (ZIP 235+237), kustaafishwa kwa Sprout (ZIP 2003) |

Tarehe zinaonyeshwa kwa UTC. Baadhi ya dashibodi huzionyesha kwa saa za eneo husika, ambazo ni block ileile na muda uleule. Kichocheo kisichobadilika cha kila uboreshaji ni urefu wa block wa uanzishaji wake, si tarehe ya kalenda.

### Hali ya NU7

NU7 Inatumika kwenye Testnet ya umma katika urefu **4,465,026** (iliwashwa 4 Oktoba 2026). Urefu wa uanzishaji wa Mainnet ni **3,543,405** ([ZIP 259](https://zips.z.cash/zip-0259)), unaolengwa kufikiwa **5 Novemba 2026**.

Wigo (ZIP 259):

- **Block za sekunde 25** (ZIP 218) — uthibitisho wa kwanza ni wa kasi zaidi kwa takriban mara 3; utoaji wa kila siku wa ZEC haujabadilika.
- **Mfumo wa Uendelevu wa Mtandao** (ZIP 235 + ZIP 237) — 60% ya ada za miamala [transaction fees] huondolewa kwenye mzunguko na kuwekwa kwenye akiba, kisha hutolewa tena kwa wachimbaji kwa ratiba inayodumisha kupunguzwa kwa nusu kuanzia takriban Februari 2031.
- **Kustaafishwa kwa Sprout** (ZIP 2003) — miamala ya toleo la 4 inakuwa batili; fedha zilizosalia za Sprout haziwezi kutumika.
- Vikomo vya vitendo vya faragha na dirisha pana zaidi la wastani wa ugumu (17 → 102 block).

Hakuna muundo mpya wa muamala unaoanzishwa. Kitambulisho cha tawi cha makubaliano [consensus]: `0x77190ad9`.

Tazama mstari wa matukio wa [Mageuzi ya Faragha](https://zechub.wiki/zcash-evolution) na [ZIP 259](https://zips.z.cash/zip-0259) kwa maelezo kamili. Mstari wa matukio wa jukwaa: [NU7 Mstari wa Matukio](https://forum.zcashcommunity.com/t/nu7-timeline/57655).

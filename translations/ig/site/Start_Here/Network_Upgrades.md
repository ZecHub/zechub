# Zcash Network Upgrades

Zcash na-akawanye mma site na network upgrade: mgbanwe a haziri ahazi n’iwu nke node ọ bụla kwenyere na ha, nke ọ bụla na-arụ ọrụ n’ogo block e setịpụrụ. Upgrade ọ bụla dị n’okpuru nwere ibe nke ya nke na-akọwa, n’asụsụ dị mfe, ihe ọ gbanwere na ihe kpatara ya. Ị bụ onye ọhụrụ na Zcash? Gụọ ha n’usoro, site na Sprout ruo Ironwood.

Maka akụkọ anya nke otu Nzuzo Zcash siri gbanwee n’ime upgrade ndị a, lee [Mgbanwe nke Nzuzo](https://zechub.wiki/zcash-evolution). Ibe a bụ ndeksi. Nke ọzọ bụ usoro oge.

| Upgrade | Mbido ọrụ (UTC) | Block | ID alaka | Ihe ọ gbanwere |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | Ọktoba 28, 2016 | genesis | 00000000 | Mmalite: pool nke e chebere echebe mbụ na Azụmahia nzuzo zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | Juun 26, 2018 | 347,500 | 5ba81b19 | Nchedo megide mmegharị ọzọ, nsụgharị Azụmahia, na ngafe oge, ka upgrade dị nchebe wee kwe omume |
| [Sapling](../zcash-tech/sapling) | Ọktoba 29, 2018 | 419,200 | 76b809bb | Azụmahia nke e chebere echebe na-arụ ọrụ nke ọma, nke dị ngwa zuru ezu maka ekwentị na hardware wallet |
| [Blossom](../zcash-tech/blossom) | Disemba 11, 2019 | 653,600 | 2bb40e60 | Block dị ngwa karịa, ihe dịka sekọnd 75, na mwepụta ka elu |
| [Heartwood](../zcash-tech/heartwood) | Julaị 16, 2020 | 903,000 | f5b9230b | Ụgwọ ọrụ ịgwụputa nke e chebere echebe na ndị ahịa dị mfe karịa (FlyClient) |
| [Canopy](../zcash-tech/canopy) | Nọvemba 18, 2020 | 1,046,400 | e9ff75a6 | Ego Mmepe, halving mbụ, na imechi pool Sprout nwayọọ nwayọọ |
| [NU5](../zcash-tech/nu5) | Mee 31, 2022 | 1,687,104 | c2d6d0b4 | Pool Orchard na Halo 2 (enweghị trusted setup), Adreesị akpa ego jikọtara ọnụ, na Azụmahia v5 |
| [NU6](../zcash-tech/nu6) | Nọvemba 23, 2024 | 2,726,400 | c8e71055 | Deferred Dev Fund Lockbox na nkewa ego mmepe ọhụrụ |
| [NU6.1](../zcash-tech/nu6-1) | Nọvemba 24, 2025 | 3,146,400 | 4dec4df0 | Gọọmentị obodo na ndị ji mkpụrụ ego nke ego ahụ |
| [NU6.2](../zcash-tech/nu6-2) | Juun 3, 2026 | 3,364,600 | 5437f330 | Ndozi mberede nke doziri circuit Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | Julaị 28, 2026 | 3,428,143 | 37a5165b | Pool Ironwood na turnstile ọha nke na-enye onye ọ bụla ohere inyocha ngụkọta mkpụrụ ego |
| **NU7** (na-abịa) | Testnet: 4 Ọktoba 2026; Mainnet: ezubere 5 Nọvemba 2026 | Testnet: 4,465,026; Mainnet: 3,543,405 | 77190ad9 | Block sekọnd 25 (ZIP 218), ịmegharị ugwo NSM (ZIP 235+237), ịla ezumike nká Sprout (ZIP 2003) |

A na-egosi ụbọchị na UTC. Ụfọdụ dashboard na-egosi ha n’oge mpaghara, nke bụ otu block na otu oge ahụ. Ihe na-akpalite upgrade ọ bụla n’enweghị mgbanwe bụ ogo block mbido ọrụ ya, ọ bụghị ụbọchị kalenda.

### Ọnọdụ NU7

NU7 na-arụ ọrụ na Testnet ọha n’ogo **4,465,026** (malitere ọrụ na 4 Ọktoba 2026). Ogo mbido ọrụ Mainnet bụ **3,543,405** ([ZIP 259](https://zips.z.cash/zip-0259)), ezubere maka **5 Nọvemba 2026**.

Oke ọrụ (ZIP 259):

- **Block sekọnd 25** (ZIP 218) — nkwenye mbụ dị ngwa ihe dịka 3×; mmepụta ZEC kwa ụbọchị agbanweghị.
- **Network Sustainability Mechanism** (ZIP 235 + ZIP 237) — a na-ewepụ 60% nke ugwo Azụmahia n’ime mgbasa ma tinye ya n’ebe nchekwa, wee nyeghachi ya ndị na-egwụputa n’usoro na-echekwa halving malite ihe dịka Febrụwarị 2031.
- **Ịla ezumike nká Sprout** (ZIP 2003) — Azụmahia nsụgharị 4 aghọghị nke ziri ezi; ego Sprout fọdụrụ aghọghị nke a pụrụ imefu.
- Oke omume nke e chebere echebe na windo sara mbara maka ịgụta ihe isi ike (17 → 102 block).

Ewebataghị ụdị Azụmahia ọhụrụ. ID alaka consensus: `0x77190ad9`.

Lee usoro oge [Mgbanwe nke Nzuzo](https://zechub.wiki/zcash-evolution) na [ZIP 259](https://zips.z.cash/zip-0259) maka nkọwa zuru ezu. Usoro oge nnọkọ: [NU7 Usoro Oge](https://forum.zcashcommunity.com/t/nu7-timeline/57655).

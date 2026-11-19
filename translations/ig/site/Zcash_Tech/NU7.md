<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie ibe"/>
</a>

# NU7

> NU7 malitere ọrụ na Mainnet Zcash na block 3,543,405 n’ụbọchị November 6, 2026 (02:34 UTC; mgbede November 5 n’oge mpaghara US), ma ọ na-arụ ọrụ kemgbe ahụ.

Ihe ị ga-amụta: ihe NU7 gbanwere (block na-adị ngwa ngwa, oke omume nke nke e chebere echebe, imegharị ugwo, na njedebe nke azụmahịa ụdị 4), ihe ọ hapụrụ otu ahụ, na ihe ndị na-arụ node, e-akpa ego, exchange na ndị na-egwụputa kwesịrị ime.

NU7 bụ Zcash [network upgrade](../start-here/network-upgrades), nke [ZIP 259](https://zips.z.cash/zip-0259) wepụtara. Ọ belatara oge dị n’etiti block site na sekọnd 75 ruo sekọnd 25, debe oke ọnụọgụ omume nke nke e chebere echebe nwere ike ịdị n’otu block, malite iwepụ 60% nke ugwo azụmahịa n’ime mgbasa ka e wee nwee ike inye ya ndị na-egwụputa n’ọdịnihu ọzọ, meekwa ka azụmahịa ụdị 4 ghara ịdị irè, nke mechiri pool Sprout ochie. Ọ wetaghị usoro azụmahịa ọhụrụ. NJI ngalaba consensus ya bụ `0x77190ad9`.

Ihe mere nke a ji dị mkpa. Tupu NU7, ị na-eche sekọnd 75 ná nkezi maka nkwenye mbụ, nke na-adịghị ngwa maka ebe a na-ere ihe, nkwụnye ego na exchange, ma ọ bụ Mgbawe cross-chain. NU7 mere ka oge ahụ bụrụ ihe dị ka sekọnd 25 n’ebughị ZEC ọzọ: e belatara ụgwọ ọrụ kwa block ruo otu ụzọ n’ime atọ, ya mere ego a na-ewepụta kwa ụbọchị ka bụ otu. Ọ bụkwa network upgrade mbụ tinyere usoro e mere iji kwụọ ụgwọ maka nchekwa network mgbe ụgwọ ọrụ block belatara.

Ọ bụrụ na ị ka bụ onye ọhụrụ na Zcash, malite na [Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash) na [Pools nke e Chebere Echebe](../using-zcash/shielded-pools), laghachikwa ebe a.

## TL;DR

N’okwu dị mfe: block na-abịa kwa sekọnd 25 ugbu a, ọnụọgụ ZEC ọhụrụ kwa ụbọchị ka bụ otu, a na-echekwa akụkụ nke ugwo ọ bụla maka ndị na-egwụputa n’ọdịnihu, mechiekwa pool Sprout ochie.

- **Block nke sekọnd 25** ([ZIP 218](https://zips.z.cash/zip-0218)): nkwenye mbụ na-ewe ihe dị ka sekọnd 25 kama 75. Ego nkwado block belatara site na 1.5625 ruo 0.52083333 ZEC, ya mere a ka na-ewepụta ihe dị ka 1,800 ZEC kwa ụbọchị.
- **Oke omume nke nke e chebere echebe** (ZIP 218): a ga-enwe ihe karịrị omume nke nke e chebere echebe 330 kwa block n’ofe pool niile, tinyere oke maka pool nke ọ bụla, ka ọnụ ahịa kachasị njọ nke ịlele block na imekọrịta e-akpa ego ghara ịkarị nke mbụ.
- **Usoro Nkwado Ịdịgide nke Network** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60% nke ugwo azụmahịa dị na block ọ bụla na-apụ n’ime mgbasa, a ga-enyekwa ya ndị na-egwụputa ọzọ n’oge na-abịa, malite na block 8,939,664 (atụmatụ bụ gburugburu February 2031). Oke mkpokọta 21 nde agbanwebeghị.
- **Azụmahịa ụdị 4 adịghịzi irè** ([ZIP 2003](https://zips.z.cash/zip-2003)): e-akpa ego ga-ewu azụmahịa v5 ma ọ bụ v6. Sprout nwere ike iji v4 naanị ka e si emefu ya, ya mere ego fọdụrụ na Sprout agaghịzi enwe ike ịgagharị.
- **Sọftụwia**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) na nke ọhụrụ ya na-agbaso NU7. Enweghị ntọhapụ `zcashd` nwere nkwado NU7.

## Ihe atụ iji anya hụ ya

Chee echiche maka chain dịka ụzọ ụgbọ oloko. Tupu NU7, ụgbọ oloko na-apụ kwa sekọnd 75, nwee ike ibu ọtụtụ ndị njem ruo mgbe oghere 2 MB jupụtara. NU7 na-eme ka ụgbọ oloko pụọ kwa sekọnd 25, na-akwụ onye ọkwọ ụgbọ oloko ọ bụla otu ụzọ n’ime atọ nke ụgwọ ochie ka ngụkọta kwa ụbọchị bụrụ otu, ma na-amachi ọnụọgụ ndị njem kacha ibu (omume nke nke e chebere echebe) nwere ike ịbanye n’otu ụgbọ oloko, ka o wee ghara iwe ogologo oge inyocha otu ụgbọ oloko.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Ihe NU7 gbanwere

### Oge e lekwasịrị anya n’etiti block bụ sekọnd 25 (ZIP 218)

- Mgbanwe nhazi siri ike na-achọ otu block kwa **sekọnd 25** ugbu a, kama 75, ya mere block na-abịa ugboro atọ karịa.
- E kewara ego nkwado block ụzọ atọ: **0.52083333 ZEC** kwa block n’oge halving dị ugbu a (ọ bụ 1.5625 ZEC). Ego a na-ewepụta kwa ụbọchị ka bụ ihe dị ka 1,800 ZEC (block 3,456 kwa ụbọchị kama 1,152).
- Halving ka na-eme kwa afọ anọ. Ebe block na-adị ngwa ngwa, halving ọzọ kwagara na block **6,132,390**, nke a na-atụ anya ya na ngwụcha November 2028 n’oge sekọnd 25 (ZIP 259).
- Oghere nkezi maka mgbanwe nhazi siri ike toro site na block 17 ruo **block 102**, ya mere mgbanwe ahụ ka na-eleba anya n’oge hà nhata.
- Oge ngafe azụmahịa ndabara toro site na block 40 ruo **block 120**, nke na-eme ka ọ ka bụrụ ihe dị ka nkeji 50.

### Oke omume nke nke e chebere echebe (ZIP 218)

Block ọ bụla nwere mmefu e kenyere ọnụ na oke maka pool nke ọ bụla ugbu a:

| Oke | Kwa block |
|---|---|
| Omume niile nke nke e chebere echebe n’ofe pool | 330 |
| Omume Orchard | 330 |
| Omume Ironwood | 330 |
| Ntinye + mmepụta Sapling | 300 |
| Sprout JoinSplits | ekweghị ka e jiri ya |

Tupu NU7, block 2 MB jupụtara nwere ike ịnwe ihe dị ka Orchard 617 ma ọ bụ omume Ironwood, ma ọ bụ mmepụta Sapling ihe dị ka 2,107, n’enweghị oke maka pool nke ọ bụla. ZIP 218 na-ewepụta oke ọhụrụ ka, ọbụna mgbe block mụbara ugboro atọ, ọnọdụ kacha njọ maka node na imekọrịta e-akpa ego dị ala karịa nke mbụ (dịka ọmụmaatụ, bandwit sync nke nke e chebere echebe maka light-client kacha elu na-ada site na ihe dị ka 271 ruo 169 MB kwa ụbọchị), ebe n’otu oge ahụ mmepụta site na protocol Orchard na-adị ihe karịrị okpukpu abụọ (ihe dị ka azụmahịa 2.9 ruo 6.6 kwa sekọnd maka azụmahịa nwere omume 2).

### Usoro Nkwado Ịdịgide nke Network (ZIP 235 + ZIP 237)

- **Iwepụ ugwo (ZIP 235):** a na-ewepụ 60% nke ugwo azụmahịa dị na block ọ bụla n’ime mgbasa; 40% fọdụrụ na-aga n’aka onye na-egwụputa dịka ọ dị na mbụ. N’adịghị ka ikpochapụ, a na-edekọ ZEC e wepụrụ ka e nwee ike inye ya ọzọ n’ọdịnihu.
- **Inyeghachi (ZIP 237):** a na-edebe ZEC e wepụrụ n’ọnọdụ consensus ọha a na-akpọ NSM Value Balance. E tinyere ego mmalite ya na NU7 (368.58 ZEC) site na uru ndị na-egwụputa hapụrụ n’enweghị onye kwuru ya n’oge gara aga. Malite na block **8,939,664** (atụmatụ bụ gburugburu February 2031), block ọ bụla na-ewepụta akụkụ a kapịrị ọnụ nke ngụkọta ahụ, n’elu usoro halving nkịtị.
- Oke mkpokọta anaghị arị elu. Mgbe ngụkọta ahụ ghọrọ efu, ego a na-ewepụta ga-abụ kpọmkwem nke usoro halving ochie.
- NU7 ebughị [ZIP 233](https://zips.z.cash/zip-0233) (iwepụ ego ndị ọrụ ji aka ha họrọ) ma ọ bụ [ZIP 234](https://zips.z.cash/zip-0234) (iji usoro dị nro dochie halving). Ntuli aka ndị ji coin họọrọ nhazi na-echekwa halving na ZIP 237.

### E kweghịzi azụmahịa ụdị 4 (ZIP 2003)

- Malite na NU7, azụmahịa ụdị 4 ọ bụla adịghịzi irè: ọ bụghị naanị mbufe Sprout, kamakwa azụmahịa nke naanị akụkụ Oha metụtara na nke Sapling e wuru n’usoro v4. Azụmahịa ụdị 5 (NU5) na nke ụdị 6 ([Ironwood](../zcash-tech/ironwood)) agbanwebeghị.
- Mbufe Sprout dị naanị n’usoro v4, ya mere enweghịzi ike imefu pool [Sprout](../zcash-tech/sprout). Lee [Iweghachite Ego](../using-zcash/recovering-funds).

### Ihe ndị dị nta

- Ndozigharị iwu ego mmepe ka ụzọ ego si aga rụọ ọrụ na block nke sekọnd 25 ([ZIP 207](https://zips.z.cash/zip-0207) Ndozigharị 2, [ZIP 214](https://zips.z.cash/zip-0214) Ndozigharị 3), na mmelite na ndepụta Adreesị akpa ego maka ụzọ ego ([ZIP 2008](https://zips.z.cash/zip-2008)).
- Node NU7 na-ekwupụta ụdị protocol network **170190** na Mainnet ma kwụsị njikọ na ndị peer ochie mgbe ọ malitere ọrụ.

## Ihe NU7 emeghị

- **Enweghị usoro azụmahịa ọhụrụ.** NU7 kpachapụrụ anya zere njem mgbanwe ọzọ maka e-akpa ego na parser ozugbo Ironwood webatara azụmahịa v6.
- **Enweghị mgbanwe n’oke mkpokọta ma ọ bụ n’usoro halving nke afọ anọ.**
- **Enweghị mgbanwe n’oge ntozu coinbase.** A ka ga-echere block 100 tupu enwee ike imefu coin ndị e gwupụtara (ugbu a ihe dị ka nkeji 42 kama ihe dị ka awa 2).
- **Enweghị pool ọhụrụ nke e chebere echebe.** Ironwood (NU6.3) ka bụ pool kacha ọhụrụ; Orchard ka bụ nke a na-emefu naanị, dịka ọ dị kemgbe Ironwood.

## Ihe otu ọ bụla kwesịrị ime

- **Ndị na-arụ ọrụ Node:** jiri [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) ma ọ bụ nke ọhụrụ karịa. Zebra 7 na-akwaga nchekwa data ya site na usoro v28 gaa na v29 mgbe mbụ e bidoro ya, ebe Zebra 6.x enweghị ike ịgụ v29, ya mere, chekwaa nkwado ndabere `state/v28` tupu ịkwalite ya. `zcashd` enweghị mwepụta NU7 (mwepụta ọhụrụ ya bụ 6.20.0, nke e wepụtara na June 2026); ntuziaka Zebra book's [zcashd API migration guide](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) na-egosi ebe RPC `zcashd` nke ọ bụla si aga: gaa na Zebra, [Zallet](../zcash-tech/zallet) ma ọ bụ nke nọchiri ya. Lee [Full Nodes](../zcash-tech/full-nodes) na ntuziaka [Hardened Zebra guide](../guides/hardened-zebrad).
- **E-akpa ego:** kwụsị iwu azụmahịa v4, jiri oge ngafe ndabara nke block 120, debe omimi anchor nke block 3 (nke dị ihe dị ka nkeji 1.25 ugbu a), ma rube isi n'ókè omume kwa block. A pụghị ịgụpụta azụmahịa nke n'onwe ya mebiri otu ókè.
- **Exchanges na ọrụ ịkwụ ụgwọ:** nkwenye na-ewe sekọnd 25 ugbu a, ya mere otu ọnụ ọgụgụ nkwenye ahụ na-ekpuchi naanị otu ụzọ n'ụzọ atọ nke oge mbụ. Legharịa ọnụ ọgụgụ nkwenye nkwụnye ego anya dabere n'oge na nchekwa ị chọrọ n'ezie, kama idowe ọnụ ọgụgụ ochie n'ihi àgwà.
- **Ndị na-egwụputa na pool:** sọftụwia ịgwụputa na ndebiri ga-eji subsidy ọhụrụ, nkewa ugwo na ókè omume; a na-ajụ blocks e wuru n'okpuru iwu ochie.

## Mmejọ ndị a na-emekarị

- **“Node ochie m ka na-arụ ọrụ, ya mere ihe niile dị mma.”** Maka NU7 naanị, ZIP 259 wepụrụ iwu a na-emekarị nke na-eme ka sọftụwia tupu mmelite mechie onwe ya tupu oge mmalite. Zebra 6.x ma ọ bụ node `zcashd` nwere ike ịnọ n’ọrụ n’okpuru iwu ochie, dapụkwa nwayọ nwayọ n’ezigbo chain. Lelee na node gị na-egosi ịdị elu karịrị 3,543,405 nakwa na o kwekọrọ na ihe nyocha block na-egosi.
- **“Block ngwa ngwa pụtara na a na-ebipụta ZEC karịa.”** Mba. Ego nkwado kwa block dara ruo otu ụzọ n’ime atọ, ya mere ego a na-ewepụta kwa ụbọchị agbanwebeghị.
- **“A na-ekpochapụ 60% nke ugwo ruo mgbe ebighị ebi.”** Mba. A na-ewepụ ha, NSM ga-enyekwa ha ndị na-egwụputa ọzọ n’oge na-abịa; oke mkpokọta agbanwebeghị.
- **“Ọ bụ naanị ndị ọrụ Sprout ka mgbanwe v4 metụtara.”** E-akpa ego ma ọ bụ script ọ bụla ka na-emepụta azụmahịa v4, gụnyere ndị nke naanị akụkụ Oha metụtara na nke Sapling, kwụsịrị ịrụ ọrụ. Azụmahịa v4 niile na-echere ghọrọ ihe na-adịghị irè mgbe ọ malitere ọrụ, mbinye aka ọzọ naanị ya enweghị ike ime ka ha dị irè.
- **“Ntọala ọnụọgụ block ka ga-adị otu.”** Ihe ọ bụla a tụrụ na block (nkwenye, oge ngafe, oge mkpọchi, oge nchere) na-agafe ugboro atọ ngwa ngwa n’oge n’ezie ugbu a.

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n’asụsụ dị mfe |
|---|---|
| Block target spacing | Oge nkezi dị n’etiti block nke mgbanwe nhazi siri ike na-achọ: sekọnd 25 kemgbe NU7 |
| Block subsidy | ZEC ọhụrụ a na-emepụta na block ọ bụla, nke a na-ekekọrịta n’etiti onye na-egwụputa na ụzọ ego mmepe |
| Shielded action | Otu ọrụ nke nke e chebere echebe n’ime azụmahịa (omume Orchard ma ọ bụ Ironwood, ma ọ bụ ntinye ma ọ bụ mmepụta Sapling) |
| Network Sustainability Mechanism (NSM) | Iwu na-ewepụ akụkụ ugwo n’ime mgbasa ma nye ya ndị na-egwụputa n’ọdịnihu ọzọ |
| NSM Value Balance | Ngụkọta ọha na-aga n’ihu nke ZEC e wepụrụ n’ime mgbasa ma na-eche inyeghachi |
| Version 4 transaction | Usoro azụmahịa sitere na Sapling, nke NU7 mere ka ọ ghara ịdị irè; v5 na v6 ka dị irè |
| Consensus branch ID | Nọmba na-egosi otu iwu consensus; mbinye aka na-ejikọta onwe ha na ya, ya mere azụmahịa e binyere aka maka iwu ochie adịghị irè n’okpuru iwu ọhụrụ |

## Ajụjụ Ndị A Na-ajụkarị

**Olee mgbe NU7 malitere ọrụ?** Na Mainnet block 3,543,405 n’ụbọchị November 6, 2026 na 02:34 UTC. Testnet malitere ọrụ tupu mgbe ahụ, na block 4,465,026 n’ụbọchị October 4, 2026.

**Ụgwọ ọrụ block gbanwere?** Kwa block, ee: 0.52083333 ZEC kama 1.5625 ZEC. Kwa ụbọchị, mba: ihe dị ka 1,800 ZEC n’ụzọ abụọ ahụ.

**Sprout ZEC m efuola?** A pụghịzi ịkwaga ya, n’ihi na imefu Sprout chọrọ azụmahịa v4, nke na-adịghịzi irè. Lee [Iweghachite Ego](../using-zcash/recovering-funds) maka ihe nke a pụtara n’omume.

**Achọrọ m e-akpa ego ọhụrụ?** Ị chọrọ ụdị e-akpa ego na-akwado NU7. Ibe [E-akpa ego](../using-zcash/wallets) nke ZecHub na-egosi e-akpa ego ndị kwekọrọ na NU7.

**Olee mgbe inyeghachi ugwo ga-amalite?** Na block 8,939,664 na Mainnet, nke a na-atụ anya gburugburu February 2031 ma ọ bụrụ na block anọgide na-ewe sekọnd 25 ná nkezi.

**Gịnị mere NU7 ji hapụ usoro azụmahịa ọhụrụ?** Ka e-akpa ego na parser ghara ime njem mgbanwe nke abụọ ozugbo usoro v6 nke Ironwood gasịrị, nakwa n’ihi na a na-agbakọ nkewa ugwo kwa block, ya mere ubi azụmahịa ọhụrụ adịghị mkpa.

## Nwalee nghọta gị

1. Gịnị mere ego ZEC a na-ewepụta kwa ụbọchị ji ka bụrụ otu mgbe NU7 gasịrị?
2. Gịnị na-eme 60% nke ugwo e wepụrụ n’ime mgbasa?
3. Gịnị mere enweghị ike imefu ego Sprout mgbe NU7 gasịrị?
4. Gịnị mere node a na-emelitebeghị ji dị ize ndụ karịsịa na mmelite a?

Azịza: (1) ego nkwado kwa block belatara ruo otu ụzọ n’ime atọ, ebe block bịara ugboro atọ karịa; (2) ha na-abanye na Ngụkọta Uru NSM, a na-enyekwa ha ndị na-egwụputa ọzọ malite na block 8,939,664; (3) imefu Sprout dị naanị n’usoro v4, nke NU7 mere ka ọ ghara ịdị irè; (4) ZIP 259 wepụrụ mmechi akpaaka, ya mere node ochie nwere ike ịga n’ihu n’ọrụ n’elu chain na-ezighi ezi.

### Ihe ndị ọzọ

[ZIP 259: Mbugharị NU7 Network Upgrade](https://zips.z.cash/zip-0259)

[ZIP 218: Oge e lekwasịrị anya n’etiti block bụ sekọnd 25](https://zips.z.cash/zip-0218)

[ZIP 235: Iwepụ 60% nke Ugwo Azụmahịa n’ime Mgbasa](https://zips.z.cash/zip-0235)

[ZIP 237: Usoro Nkwado Ịdịgide nke Network: Ego a na-ewepụta nke na-echekwa Halving](https://zips.z.cash/zip-0237)

[ZIP 2003: E kweghịzi azụmahịa ụdị 4](https://zips.z.cash/zip-2003)

[Zebra Ihe ndekọ ntọhapụ 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Forum Obodo: NU7 Usoro oge](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Ibe ndị metụtara ya

| Ibe | Ihe mere o ji metụta |
|---|---|
| [Ironwood](./Ironwood.md) | mmelite bu ya ụzọ n’usoro a, nke webatara azụmahịa v6 |
| [Ihe Block nke Sekọnd 25 Na-agbanwe N’ezie](../research/what-25-second-blocks-actually-change) | nkọwa miri emi banyere oge block dị ngwa ngwa |
| [Sprout](./Sprout.md) | pool NU7 mechiri |
| [Iweghachite Ego](../using-zcash/recovering-funds) | ihe Sprout igbochi pụtara maka ego ochie |
| [Azụmahịa](../using-zcash/transactions) | oge ngafe na nkwenye mgbe NU7 gasịrị |

---

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke bu ya ụzọ: [Ironwood](../zcash-tech/ironwood)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Ibe"/>
</a>

# NU7

> NU7 rụọ ọrụ na Mainnet na Zcash block 3,543,405 na November 6, 2026 (02:34 UTC; mgbede November 5 n’oge mpaghara US), ọ na-arụkwa ọrụ kemgbe ahụ.

Ihe ị ga-amụta: ihe NU7 gbanwere (blocks dị ngwa ngwa, oke shielded actions, iweghachi ugwo n’ọrụ, njedebe transaction nke ụdị 4), ihe ọ hapụrụ otu ahụ, na ihe ndị na-arụ node, e-akpa ego, exchanges na ndị na-egwụputa kwesịrị ime.

NU7 bụ network upgrade Zcash [](../start-here/network-upgrades), nke [ZIP 259](https://zips.z.cash/zip-0259) bugoro. O mere ka oge dị n’etiti blocks belata site na sekọnd 75 ruo sekọnd 25, tinye oke n’ọnụọgụ shielded actions nwere ike ịdị n’otu block, malite iwepụ 60% nke ugwo Azụmahia n’usoro mgbasa ka e wee nye ha ndị na-egwụputa n’ọdịnihu ọzọ, ma mee ka Azụmahia ụdị 4 bụrụ ihe iwu na-akwadoghị, nke mechiri pool Sprout ochie. O webataghị usoro Azụmahia ọhụrụ. NJ alaka consensus ya bụ `0x77190ad9`.

Ihe mere nke a ji dị mkpa. Tupu NU7, ị na-eche sekọnd 75 ná nkezi maka nkwenye mbụ, nke na-adị ngwa nwayọọ n’ebe a na-akwụ ụgwọ n’ụlọ ahịa, nkwụnye ego n’exchange ma ọ bụ Mgbawe cross-chain dị. NU7 mere ka nke a bụrụ ihe dị ka sekọnd 25 n’enweghị ibipụta ZEC ọzọ: e belatara ụgwọ ọrụ kwa block ruo otu ụzọ n’ime atọ, ya mere ego a na-ewepụta kwa ụbọchị ka dị otu. Ọ bụkwa upgrade mbụ gbakwunyere usoro e bu n’obi iji kwụọ ụgwọ nchekwa network mgbe ụgwọ ọrụ block belatara.

Ị ka bụ onye ọhụrụ na Zcash? Malite na [Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash) na [Shielded Pools](../using-zcash/shielded-pools), ma laghachi ebe a emechaa.

## TL;DR

N’okwu dị mfe: blocks na-abịa ugbu a kwa sekọnd 25, ọnụọgụ ZEC ọhụrụ kwa ụbọchị ka dị otu, a na-echekwa akụkụ nke ugwo ọ bụla maka ndị na-egwụputa n’ọdịnihu, mechiekwa pool Sprout ochie.

- **Blocks sekọnd 25** ([ZIP 218](https://zips.z.cash/zip-0218)): nkwenye mbụ na-ewe ihe dị ka sekọnd 25 kama 75. E belatara nkwado block site na 1.5625 ruo 0.52083333 ZEC, ya mere a ka na-ewepụta ihe dị ka 1,800 ZEC kwa ụbọchị.
- **Oke shielded actions** (ZIP 218): kacha bụ shielded actions 330 n’otu block n’ofe pools niile, tinyere oke maka pool nke ọ bụla, iji mee ka ego na-efu n’ịkwado block na ịmekọrịta e-akpa ego ghara ịkarị nke ọ dị na mbụ.
- **Network Sustainability Mechanism** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60% nke ugwo Azụmahia block ọ bụla na-apụ n’usoro mgbasa, a na-enyekwa ha ndị na-egwụputa ọzọ ma emechaa, malite na block 8,939,664 (a na-atụ anya ya gburugburu February 2031). Oke ọkọnọ 21 million agbanwebeghị.
- **Azụmahia ụdị 4 bụ ihe iwu na-akwadoghị** ([ZIP 2003](https://zips.z.cash/zip-2003)): e-akpa ego ga-ewu Azụmahia v5 ma ọ bụ v6. Sprout nwere ike imefu naanị site na v4, ya mere ego fọdụrụ na Sprout aghọwo nke a na-apụghị ịgagharị.
- **Sọftụwia**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) na nke mechara na-agbaso NU7. Enweghị ntọhapụ `zcashd` nke nwere nkwado NU7.

## Ntụnyere anya

Were chain ahụ dị ka ụzọ ụgbọ oloko. Tupu NU7, ụgbọ oloko na-apụ kwa sekọnd 75 ma nwee ike ibu ọtụtụ ndị njem dịka ndị dabara n’ime 2 MB. NU7 na-eme ka ụgbọ oloko na-apụ kwa sekọnd 25, na-akwụ onye ọkwọ ụgbọ oloko ụgwọ otu ụzọ n’ime atọ nke ego ochie ka ngụkọta kwa ụbọchị bụrụ otu, ma na-etinye oke n’ọnụọgụ ndị njem kacha arọ (shielded actions) nwere ike ịbanye n’otu ụgbọ oloko, ka o wee ghara iwe ogologo oge inyocha otu ụgbọ oloko.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Ihe NU7 gbanwere

### Oge e lekwasịrị anya maka block: sekọnd 25 (ZIP 218)

- Ndozi difficulty na-achọzi otu block kwa **sekọnd 25** kama 75, ya mere blocks na-abịa ugboro atọ karịa.
- E kewara nkwado block ụzọ atọ: **0.52083333 ZEC** kwa block n’oge halving dị ugbu a (ọ bụ 1.5625 ZEC). Ego a na-ewepụta kwa ụbọchị ka dị ihe dị ka 1,800 ZEC (blocks 3,456 kwa ụbọchị kama 1,152).
- Halving ka na-eme kwa afọ anọ. N’ihi na blocks na-adị ngwa ngwa, halving na-abịa ebugala na block **6,132,390**, a na-atụkwa anya ya na ngwụcha November 2028 n’oge sekọnd 25 (ZIP 259).
- E mere ka windo nkezi difficulty si na blocks 17 ruo **102**, ka ndozi ahụ wee na-eleba anya n’oge dị ihe dịka otu ogologo ahụ.
- E mere ka ngwụcha oge Azụmahia ndabara si na blocks 40 ruo **120**, nke na-eme ka ọ bụrụ ihe dị ka nkeji 50.

### Oke shielded actions (ZIP 218)

Block ọ bụla nwerezi mmefu ego a na-ekekọrịta na oke maka pool nke ọ bụla:

| Oke | Kwa block |
|---|---|
| Shielded actions niile n’ofe pools | 330 |
| Actions Orchard | 330 |
| Actions Ironwood | 330 |
| Ntinye + mmepụta Sapling | 300 |
| Sprout JoinSplits | Enweghị nke a kwadoro |

Tupu NU7, block 2 MB zuru ezu nwere ike ijide ihe dị ka Orchard 617 ma ọ bụ actions Ironwood, ma ọ bụ ihe dị ka mmepụta Sapling 2,107, n’enweghị oke maka pool nke ọ bụla. ZIP 218 setịpụrụ oke ọhụrụ ndị a ka, ọbụna mgbe blocks dị okpukpu atọ, ọnọdụ kacha njọ maka nodes na maka imekọrịta e-akpa ego dị ala karịa nke mbụ (dịka ọmụmaatụ, bandwidth shielded sync nke light-client kacha elu na-ada site n’ihe dị ka 271 ruo 169 MB kwa ụbọchị), ebe throughput protocol Orchard karịrị okpukpu abụọ (site n’ihe dị ka Azụmahia 2.9 ruo 6.6 kwa sekọnd maka Azụmahia nwere actions 2).

### Network Sustainability Mechanism (ZIP 235 + ZIP 237)

- **Iwepụ ugwo (ZIP 235):** a na-ewepụ 60% nke ugwo Azụmahia dị na block ọ bụla n’usoro mgbasa; 40% fọdụrụ na-agara onye na-egwụputa dị ka ọ dị na mbụ. N’adịghị ka ịkụ ya ọkụ, a na-edekọ ZEC e wepụrụ ka e wee nwee ike iwepụta ya ọzọ n’ọdịnihu.
- **Iweghachi n’ọrụ (ZIP 237):** a na-edobe ZEC e wepụrụ n’ọnọdụ consensus ọha a na-akpọ NSM Value Balance. E tinyere ego mbụ n’ime ya na NU7 site n’ego ndị na-egwụputa hapụrụ n’enwetaghị n’oge gara aga. Malite na block **8,939,664** (a na-atụ anya ya gburugburu February 2031), block ọ bụla na-ewepụta akụkụ a kapịrị ọnụ nke ngụkọta ahụ n’elu usoro halving nkịtị.
- Oke ọkọnọ anaghị arị elu. Mgbe ngụkọta ahụ ghọrọ efu, ego a na-ewepụta na-agbaso kpọmkwem usoro halving ochie.
- NU7 ebughị **[ZIP 233](https://zips.z.cash/zip-0233)** (iwepụ ego n’aka ndị ọrụ n’afọ ofufo) ma ọ bụ **[ZIP 234](https://zips.z.cash/zip-0234)** (iji usoro mgbago nwayọọ dochie halving). Ntuli aka ndị nwere mkpụrụ ego họọrọ nhazi na-echekwa halving na ZIP 237.
- Nkọwa ọnụọgụ (ego mbụ 368.58 ZEC, akụkụ a na-eweghachi kwa block, ihe kpatara o ji amalite na block 8,939,664) dị na peeji [Network Sustainability Mechanism](./Network_Sustainability_Mechanism.md).

### Azụmahia ụdị 4 amachibidoro (ZIP 2003)

- Site na NU7 gawa, Azụmahia ụdị 4 ọ bụla bụ ihe iwu na-akwadoghị: ọ bụghị naanị nnyefe Sprout kamakwa Azụmahia nke naanị Oha na nke Sapling e wuru n’usoro v4. Azụmahia ụdị 5 (NU5) na ụdị 6 ([Ironwood](../zcash-tech/ironwood)) agbanwebeghị.
- Nnyefe Sprout dị naanị n’usoro v4, ya mere, a pụghịzi imefu pool [Sprout](../zcash-tech/sprout). Lee [Iweghachi Ego](../using-zcash/recovering-funds).

### Ihe ndị dị nta

- Ndozigharị iwu maka ego mmepe ka usoro ego si arụ ọrụ na blocks sekọnd 25 ([ZIP 207](https://zips.z.cash/zip-0207) Ndozigharị 2, [ZIP 214](https://zips.z.cash/zip-0214) Ndozigharị 3), na mmelite na ndepụta Adreesị akpa ego nke usoro ego ([ZIP 2008](https://zips.z.cash/zip-2008)).
- NU7 nodes na-akpọsa ụdị protocol network **170190** na Mainnet ma kwụpụ ndị peer ochie mgbe ebugoro upgrade ahụ.

## Ihe NU7 emeghị

- **Enweghị usoro Azụmahia ọhụrụ.** NU7 zere ụma ịkwaga ọzọ n’usoro e-akpa ego na parser ozugbo Ironwood webatara Azụmahia v6.
- **Enweghị mgbanwe n’oke ọkọnọ ma ọ bụ n’usoro halving afọ anọ.**
- **Enweghị mgbanwe na ntozu coinbase.** Mkpụrụ ego e gwupụtara ka chọrọ blocks 100 tupu e nwee ike imefu ha (ugbu a ihe dị ka nkeji 42 kama ihe dị ka awa 2).
- **Enweghị pool shielded ọhụrụ.** Ironwood (NU6.3) ka bụ pool kacha ọhụrụ; Orchard ka nwere ike imefu naanị, dịkwa otu a kemgbe Ironwood.

## Ihe otu ọ bụla kwesịrị ime

- **Ndị na-arụ node:** jiri [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) ma ọ bụ nke ọhụrụ. Zebra 7 na-ebufe nchekwa data ya site na usoro v28 gaa na v29 mgbe mbụ ọ malitere, ma Zebra 6.x enweghị ike ịgụ v29, ya mere chekwaa ndabere `state/v28` tupu i kwalite. `zcashd` enweghị mwepụta NU7 (mwepụta ya kacha ọhụrụ bụ 6.20.0, nke e wepụtara na June 2026); akwụkwọ Zebra nwere ntuziaka mbugharị API [zcashd API migration guide](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html), nke na-egosi ebe RPC `zcashd` ọ bụla ga-aga: Zebra, [Zallet](../zcash-tech/zallet) ma ọ bụ ihe dochiri ya. Lee [Full Nodes](../zcash-tech/full-nodes) na ntuziaka [Hardened Zebra guide](../guides/hardened-zebrad).
- **E-akpa ego:** kwụsị iwulite azụmahịa v4, jiri oge ngafe ndabara nke block 120, debe omimi anchor nke block 3 (nke dị ugbu a ihe dị ka nkeji 1.25) ma rube isi n'ókè omume maka block ọ bụla. A gaghị enwe ike ịgụpụta azụmahịa nke n'onwe ya gafere ókè.
- **Exchange na ọrụ ịkwụ ụgwọ:** nkwenye na-ewezi sekọnd 25, ya mere otu ọnụ ọgụgụ nkwenye ahụ na-ekpuchi naanị otu ụzọ n'ụzọ atọ nke oge gara aga. Lelee ọzọ ọnụ ọgụgụ nkwenye maka nkwụnye ego dabere n'oge na nchekwa nke ịchọrọ n'ezie, kama idobe ọnụ ọgụgụ ochie n'ihi àgwà.
- **Ndị na-egwụputa na pool:** ngwa ịgụpụta na ndebiri ga-eji enyemaka ọhụrụ, nkewa ugwo na ókè omume; a na-ajụ block ndị e wuru n'okpuru iwu ochie.

## Mmejọ a na-emekarị

- **…Node ochie m ka na-arụ ọrụ, ya mere ihe niile dị mma.…** Maka NU7 naanị, ZIP 259 wepụrụ iwu a na-emebu nke na-eme ka sọftụwia tupu upgrade mechie onwe ya tupu ọ rụọ ọrụ. Zebra 6.x ma ọ bụ node `zcashd` nwere ike ịnọ n’ịntanetị n’usoro iwu ochie wee daa nwayọọ nwayọọ n’azụ chain n’ezie. Lelee na node gị na-egosi ịdị elu karịrị 3,543,405 ma dabara na block explorer.
- **…Blocks dị ngwa ngwa pụtara na a na-ebipụta ZEC karịa.…** Mba. Nkwado kwa block dara ruo otu ụzọ n’ime atọ, ya mere ego a na-ewepụta kwa ụbọchị agbanwebeghị.
- **…A na-akụ 60% nke ugwo ọkụ ruo mgbe ebighị ebi.…** Mba. A na-ewepụ ha, NSM eweghachiakwa ha nye ndị na-egwụputa ma emechaa; oke ọkọnọ agbanwebeghị.
- **…Naanị ndị ọrụ Sprout ka mgbanwe v4 metụtara.…** E-akpa ego ma ọ bụ script ọ bụla ka na-emepụta Azụmahia v4, gụnyere nke naanị Oha na nke Sapling, kwụsịrị ịrụ ọrụ. Azụmahia v4 ndị na-echere ghọrọ ihe iwu na-akwadoghị mgbe upgrade rụrụ ọrụ, ịbịanye aka ọzọ naanị ya enweghị ike ime ka ha bụrụ ihe iwu kwadoro.
- **…Ntọala a tụrụ site n’ọnụọgụ blocks ka na-arụ ọrụ otu ahụ.…** Ihe ọ bụla a tụrụ na blocks (nkwenye, ngwụcha oge, oge mkpọchi, oge echere) na-agafezi ugboro atọ ngwa ngwa n’oge n’ezie.

## Nkọwa okwu

| Okwu | Nkọwa ya n’asụsụ dị mfe |
|---|---|
| Block target spacing | Oge nkezi n’etiti blocks nke ndozi difficulty na-achọ: sekọnd 25 kemgbe NU7 |
| Block subsidy | ZEC ọhụrụ e kere n’ime block ọ bụla, nke e kesara n’etiti onye na-egwụputa na usoro ego mmepe |
| Shielded action | Otu akụkụ ọrụ e chebere echebe n’ime Azụmahia (action Orchard ma ọ bụ Ironwood, ma ọ bụ ntinye ma ọ bụ mmepụta Sapling) |
| Network Sustainability Mechanism (NSM) | Iwu ndị na-ewepụ akụkụ ugwo n’usoro mgbasa ma nyeghachi ha ndị na-egwụputa n’ọdịnihu |
| NSM Value Balance | Ngụkọta ọha na-abawanye nke ZEC e wepụrụ n’usoro mgbasa ma na-eche iweghachi n’ọrụ |
| Version 4 transaction | Usoro Azụmahia sitere na Sapling, nke NU7 mere ka ọ bụrụ ihe iwu na-akwadoghị; v5 na v6 ka dị ire |
| Consensus branch ID | Ọnụọgụ na-amata otu iwu consensus; signatures na-etinye nkwa na ya, ya mere Azụmahia e binyere aka n’okpuru iwu ochie bụ ihe iwu na-akwadoghị n’okpuru iwu ọhụrụ |

## Ajụjụ Ndị A Na-ajụkarị

**Olee mgbe NU7 rụrụ ọrụ?** Na block Mainnet 3,543,405 na November 6, 2026 na 02:34 UTC. Testnet rụrụ ọrụ tupu ya, na block 4,465,026 na October 4, 2026.

**Ụgwọ ọrụ block ọ gbanwere?** Kwa block, ee: 0.52083333 ZEC kama 1.5625 ZEC. Kwa ụbọchị, mba: ihe dị ka 1,800 ZEC n’ụzọ abụọ ahụ.

**Sprout ZEC m efuola?** A pụghịzi ịkwaga ya, n’ihi na mmefu Sprout chọrọ Azụmahia v4, ma ndị ahụ bụzi ihe iwu na-akwadoghị. Lee [Iweghachi Ego](../using-zcash/recovering-funds) ka ị mata ihe nke a pụtara n’omume.

**Ọ dị m mkpa inweta e-akpa ego ọhụrụ?** Ị chọrọ ụdị e-akpa ego na-akwado NU7. Peeji ZecHub[E-akpa ego](../using-zcash/wallets) na-egosi e-akpa ego ndị dakọtara na NU7.

**Olee mgbe iweghachi ugwo n’ọrụ ga-amalite?** Na block 8,939,664 na Mainnet, a na-atụ anya ya gburugburu February 2031 ma ọ bụrụ na blocks na-aga n’ogologo sekọnd 25 ná nkezi.

**Gịnị mere NU7 ji hapụ usoro Azụmahia ọhụrụ?** Iji gbochie e-akpa ego na parsers ime mbugharị nke ugboro abụọ ozugbo usoro v6 nke Ironwood gasịrị, nakwa n’ihi na a na-agbakọ nkewa ugwo kwa block, ya mere ọ dịghị ubi Azụmahia ọhụrụ achọrọ.

## Nwalee nghọta gị

1. Gịnị mere ego ZEC a na-ewepụta kwa ụbọchị ji dị otu mgbe NU7 gasịrị?
2. Gịnị na-eme 60% nke ugwo e wepụrụ n’usoro mgbasa?
3. Gịnị mere na a pụghị imefu ego Sprout mgbe NU7 gasịrị?
4. Gịnị mere node a na-emebeghị upgrade ji dị ize ndụ karịsịa na upgrade a?

Azịza: (1) e belatara nkwado kwa block ruo otu ụzọ n’ime atọ ebe blocks bịara ugboro atọ karịa; (2) ha na-abanye na NSM Value Balance, a na-enyekwa ha ndị na-egwụputa ọzọ malite na block 8,939,664; (3) mmefu Sprout dị naanị n’usoro v4, nke NU7 mere ka ọ bụrụ ihe iwu na-akwadoghị; (4) ZIP 259 wepụrụ mmechi akpaaka, ya mere node ochie nwere ike ịga n’ihu na-arụ ọrụ na chain na-ezighị ezi.

### Akụrụngwa

[ZIP 259: Mbugo nke NU7 Network Upgrade](https://zips.z.cash/zip-0259)

[ZIP 218: Oge e lekwasịrị anya n’etiti blocks bụ sekọnd 25](https://zips.z.cash/zip-0218)

[ZIP 235: Wepụ 60% nke Ugwo Azụmahia n’usoro Mgbasa](https://zips.z.cash/zip-0235)

[ZIP 237: Network Sustainability Mechanism: Iwepụta Ego Na-echekwa Halving](https://zips.z.cash/zip-0237)

[ZIP 2003: Machibido Azụmahia ụdị 4](https://zips.z.cash/zip-2003)

[Zebra Ihe ndetu ntọhapụ 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Forum Obodo: NU7 Usoro oge](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Peeji ndị yiri ya

| Peeji | Ihe mere o ji metụta |
|---|---|
| [Ironwood](./Ironwood.md) | upgrade gara aga n’usoro a, nke webatara Azụmahia v6 |
| [Ihe Blocks Sekọnd 25 Na-agbanwe n’Ezie](../research/what-25-second-blocks-actually-change) | nlele miri emi banyere ọsọ oge block |
| [Network Sustainability Mechanism](./Network_Sustainability_Mechanism.md) | otu iwepụ ugwo na iweghachi ha n’ọrụ NU7 si arụ ọrụ, tinyere ọnụọgụ ya |
| [Sprout](./Sprout.md) | pool ahụ NU7 mechiri |
| [Iweghachi Ego](../using-zcash/recovering-funds) | ihe mkpọchi Sprout pụtara maka ego ochie |
| [Azụmahia](../using-zcash/transactions) | ngwụcha oge na nkwenye mgbe NU7 gasịrị |

---

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke gara aga: [Ironwood](../zcash-tech/ironwood)

# ZIP 218: Ihe Block Nkeji 25 Na-agbanwe N’Ezie

N’ime ntuli aka ndị ji mkpụrụ ego NU7 nke mechiri na 14 Septemba 2026, ihe dị ka 2,397,669 ZEC tụrụ vootu maka ZIP 218, ebe 141.6 ZEC tụrụ vootu megide ya, nke bụ nsonaazụ 99.9%. Ọtụtụ akụkọ chịkọtara ya dịka …block Zcash na-adị ngwa ngwa karịa.… Nke ahụ bụ eziokwu, mana ọ hapụrụ ọtụtụ ihe atụmatụ a na-eme na ọtụtụ ihe ọ kpachapụrụ anya idobe otu ha dị.

Ibe a na-akọwa ZIP 218 site n’ederede ya: ihe na-agbanwe, ihe anaghị agbanwe, na ihe ọ na-efu.

## Nchịkọta nkenke

| | Taa | Mgbe ZIP 218 gachara |
|---|---|---|
| Oge ezubere maka block | nkeji 75 | nkeji 25 |
| Block kwa ụbọchị | 1,152 | 3,456 |
| Nkwado block (oge halving ugbu a) | 1.5625 ZEC | 0.52083333 ZEC |
| ZEC ọhụrụ kwa ụbọchị | anaghị agbanwe | anaghị agbanwe |
| Oge etiti halving | block 1,680,000 | block 5,040,000 |
| Oke omume nke e chebere echebe n’ime block ọ bụla | enweghị (naanị oke nha 2 MB) | 330 n’ozuzu, tinyere oke pool ọ bụla |
| Nrụpụta Orchard (Azụmahia nwere omume 2) | ihe dị ka 2.9 kwa nkeji | ihe dị ka 6.6 kwa nkeji |

![ZIP 218 cuts block target spacing from 75 seconds to 25, tripling daily blocks from 1,152 to 3,456, while dividing the per-block subsidy by the same factor of three from 1.5625 to 0.52083333 ZEC, so daily issuance stays at 1,800 ZEC and the halving interval stretches from 1,680,000 to 5,040,000 blocks to hold halving dates fixed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Block dị okpukpu atọ, nke ọ bụla na-akwụ otu ụzọ n’ụzọ atọ. Usoro nnyefe ego na-anọ ebe ọ dị.

## Gịnị mere a ga-eji gbanwee oge block

Ebumnuche bụ isi bụ **ibelata oge echere**. Taa, Kwụọ ụhwọ na-eche nkeji 75 ná nkezi maka nkwenye mbụ ya, n’agbanyeghị ibu netwọk. Na nkeji 25, nke a na-adaba na nkeji 25 ná nkezi. ZIP kpọrọ Kwụọ ụhwọ ebe a na-ere ahịa, nkwụnye ego na exchange, na bridge cross-chain dịka ihe eji ya eme nke ga-enwe mmetụta a karịa.

Isi ihe abụọ sitere na ZIP kwesịrị iburu n’uche:

- **Ọ naghị agwa onye ọ bụla ka o jiri nkwenye ole na ole.** Maka ndị ọrụ na-edobe otu nnabata ha maka ihe ize ndụ mweghachi dị ka taa, ZIP na-atụ anya ka oge nkwenye dị mma ihe na-erughị okpukpu atọ ntakịrị.
- **Ọ bụghị ihe nnọchi anya ọrụ finality.** ZIP kọwara onwe ya dịka ihe na-akwado usoro finality dịka Crosslink. Block ngwa ngwa na oyi akwa ntọala na-enyere aka ma a gbakwunye oyi akwa finality ma ọ bụ na a naghị agbakwunye ya n’ọdịnihu.

ZIP kwukwara na a gaara enweta nrụpụta dị elu naanị site n’ime ka nha block dị ukwuu. Latency bụ ihe kpatara ịhọrọ block dị mkpụmkpụ kama.

## Ihe na-agbanwe

### Nnyefe: otu ZEC kwa ụbọchị

Ime ka ọnụ ọgụgụ block dị okpukpu atọ ga-eme ka nnyefe kwa ụbọchị dị okpukpu atọ ma ọ bụrụ na ọ dịghị ihe ọzọ agbanwee. ZIP 218 na-egbochi nke ahụ site n’ikewa nkwado kwa block n’ọzọ site n’ihe kpatara ya bụ atọ ozugbo NU7 malitere ịrụ ọrụ.

N’oge halving ugbu a, nke a na-eweta nkwado block site na **1.5625 ZEC ruo 0.52083333 ZEC** (zatoshi 52,083,333). N’ihi na zatoshi 156,250,000 anaghị ekewa kpọmkwem n’ime atọ, block ọ bụla na-agbada n’ịgbakọ site n’otu ụzọ n’ụzọ atọ nke zatoshi. N’ofe oge halving zuru ezu nke block 5,040,000, nke ahụ bụ ihe dị ka 0.0168 ZEC n’ozuzu.

Nkwado ahụ bụ mkpokọta ZEC ọhụrụ e kere kwa block. A ka na-ewepụ òkè ego mmepe dị ugbu a n’ime ya, yabụ ndị onye na-egwụputa na-anata ihe na-erughị ọnụ ọgụgụ zuru ezu ahụ, kpọmkwem dịka taa.

> **Rịba ama banyere ọnụ ọgụgụ 0.26041666 ZEC.** Nkọwa draft ZIP na-ebipụta nkwado mgbe NU7 dị ka floor(156250000 / 6) = 0.26041666 ZEC, ụfọdụ akụkọ mgbasa ozi emewokwa ka ọ pụta ọzọ. Nkọwa ahụ hiere ụzọ site n’ihe kpatara ya bụ abụọ: zatoshi 156,250,000 bụrịị nkwado mgbe Blossom, ya mere ikewa ya n’ime isii na-etinye ihe kpatara ya bụ abụọ nke Blossom ugboro nke abụọ n’elu ihe kpatara ya bụ atọ nke NU7. Usoro iwu na-enye floor(1,250,000,000 / (2 · 3 · 4)) = zatoshi 52,083,333 na ndeksi halving ugbu a. Okwu mmejuputa Zebra maka mgbanwe a ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) na-edekọ nkọwa ahụ dị ka ịgụ ihe kpatara ya bụ abụọ nke Blossom ugboro abụọ, na-agwa ndị mmejuputa ka ha …mejuputa usoro ahụ, ọ bụghị nkọwa ahụ,… ma na-ekwu na etinyela mmezi megide ZIP. Ọnụ ọgụgụ ziri ezi mgbe mbido bụ **0.52083333 ZEC**.

### Halving na-edobe oge ha

Oge etiti halving na-adị okpukpu atọ site na block 1,680,000 ruo block 5,040,000. Ebe block na-abịa ugboro atọ karịa, halving ka na-adaba n’ihe dị ka otu oge ha ga-adaba na-enweghị mgbanwe ahụ. Oke nnyefe zuru ezu adịghị emetụta.

Nke a dị iche na ajụjụ nnyefe ọzọ n’ime ntuli aka NU7, ebe ndị ji mkpụrụ ego tụrụ vootu idebe halving kama iji curve a na-eme ka ọ dị larịị dochie ha. ZIP 218 na-arụ ọrụ na ụdị halving dị ugbu a ma ọ naghị agbanwe ya.

### Oke ọhụrụ n’omume nke e chebere echebe kwa block

ZIP 218 na-agbakwunye oke n’ọrụ nke e chebere echebe otu block nwere ike ijide:

| Oke | Kachasị elu kwa block |
|---|---|
| Pool niile nke e chebere echebe jikọtara ọnụ | 330 (JoinSplit Sprout ọ bụla na-agụta dịka 2) |
| Omume Orchard | 330 |
| Ntinye na mmepụta Sapling jikọtara ọnụ | 300 |
| JoinSplit Sprout | 25 |

Akụkụ Oha nke Azụmahia anaghị emetụta, oke nha block 2 MB ka na-arụkwa ọrụ.

Oke ndị a dị n’ihi na ọtụtụ block ga-apụta na ọtụtụ ọrụ maka e-akpa ego na node. Mgbe etinyere oke ndị a, ọnọdụ kacha njọ na-adị **mma** karịa taa, ọbụna na block dị okpukpu atọ:

- **Mmekọrịta e-akpa ego:** data kacha ukwuu e-akpa ego dị mfe nwere ike ịmanye ibudata n’otu ụbọchị na-adaba site n’ihe dị ka 271 MB ruo ihe dị ka 169 MB, mbelata ruru 38%. Nnwale decryption kacha njọ na-adaba site n’ihe dị ka nde 4.8 ruo ihe dị ka nde 2.3 kwa ụbọchị.
- **Nkwenye block:** benchmark ZIP na-etinye block Orchard kacha njọ n’ihe dị ka 432 ms n’okpuru oke ọhụrụ, megide ihe dị ka 770 ms maka ọnọdụ kacha njọ taa. Maka Sapling, mbelata ahụ ka ukwuu, site na ihe dị ka 3,175 ms ruo ihe dị ka 272 ms.

Oke Sapling na Sprout siri ike n’ụzọ kpachaara anya. Dị ka ọ dị na Mee 2026, Orchard nwere 87.9% nke ZEC nke e chebere echebe, Sapling nwere 11.6% ebe Sprout nwere 0.5%, yabụ pool nta na-enweta ohere zuru ezu maka ojiji ha n’ezie, ebe ọ na-enye onye mwakpo ihe ole na ole ọ ga-eji eme ihe n’ụzọ na-adịghị mma. N’ihi na ugwo ZIP 317 na-akwụ otu ụgwọ maka omume ezi uche dị na ya n’ime pool ọ bụla, onye mwakpo anaghị enweta uru ọ bụla site n’ịgbasa otu pool karịa nke ọzọ.

### Nrụpụta

Site n’omume Orchard 330 kwa block, Azụmahia Orchard ọkọlọtọ nwere omume 2 dabara ⌊330 / 2⌋ = ugboro 165 kwa block. Na otu block kwa nkeji 25, nke ahụ bụ ihe dị ka **Azụmahia 6.6 kwa nkeji**, site n’ihe dị ka 2.9 taa — ZIP kpọrọ ya mmụba 2.3× n’ime nrụpụta Orchard nkịtị. Sapling na-apụta na ihe dị ka 3.0 kwa nkeji, ka dị elu karịa ihe Orchard na-enweta taa.

### Mmezi ihe isi ike

Algorithm ihe isi ike na-agbakọ nkezi n’elu windo block ndị na-adịbeghị anya. ZIP 218 na-ebuli windo ahụ site na block 17 ruo 102, ka ọ ka na-ekpuchi ihe dị ka nkeji 2,550 nke oge n’ezie, otu ogologo oge ọ kpuchiri mgbe Zcash malitere na block nkeji 150. ZIP na-enye ihe abụọ kpatara ya: izere ime ka mwakpo ịchịkwa ihe isi ike dị mfe karịa (ọ kpọrọ ihe omume MWEB Litecoin nke Eprel 2026), na ime ka mgbanwe obere oge n’oge block dị larịị.

Ozugbo mbido gasịrị, oge block ga-ewe obere oge iji kwụsie ike n’ebumnuche ọhụrụ ahụ. Nke ahụ a tụrụ anya ya, ma ọ na-egosipụta ihe mere na Blossom, mgbe Zcash si na nkeji 150 gaa nkeji 75.

### Ntọala ndabara maka node na e-akpa ego

Ndị a bụ ndụmọdụ maka mmejuputa karịa ịbụ iwu consensus:

- **Mmebi Azụmahia:** mmebi ndabara na-ebili site na block 40 ruo 120, na-edobe ihe dị ka nkeji 50 ahụ.
- **Omimi reorg kacha elu:** oke Zebra na-ebili site na block 99 ruo 600, ihe dị ka awa 4.2 na nkeji 25, otu windo ọ kpuchiri mgbe mbido.
- **Omimi anchor maka Azụmahia nke e chebere echebe:** na-anọ na block 3, yabụ oge ichere na-ebelata site na nkeji 3.75 ruo nkeji 1.25. ZIP na-agbaso ụkpụrụ Blossom ebe a.
- **Ọtụtụ constant netwọk** a tụrụ n’ime block na-adị okpukpu atọ ka ha wee kpuchie otu ogologo oge.

## Ihe na-anọ otu

- ZEC a na-enye kwa ụbọchị, usoro halving na oke nnyefe
- Oke nha block 2 MB
- Azụmahia Oha, nke oke omume ọhụrụ anaghị emetụta
- Ntozu Coinbase na block 100. Rịba ama na nke a pụtara ugbu a ihe dị ka nkeji 42 kama ihe dị ka nkeji 125, n’ihi na a na-agụta ya na block, ọ bụghị oge.

## Mgbanwe a na-akwụ: ọtụtụ block stale

Block ngwa ngwa anaghị abịa n’efu. Block stale bụ block ziri ezi nke na-atụfu asọmpi itinye ya n’ime chain n’ihi na block ọzọ rutere netwọk mbụ. Ka oghere dị n’etiti block na-adị mkpụmkpụ, ka nke a na-eme ọtụtụ mgbe, ZIP na-ejikọta ọnụego stale na mgbasa block, oge nkwenye, na ihe ize ndụ nchịkọta mining.

- **Taa:** ihe dị ka 0.4%, nke ZIP kwuru nwere ike na-egosighi ọnụego dị n’ezie nke ọma n’ihi na hashpower juru n’ime pool.
- **N’usoro echiche na nkeji 25:** ihe dị ka 3.26%, dabere na oge igbu oge mgbasa Zcash a tụrụ.
- **Nnwale Devnet:** node Zebra 99 kesara n’ebe dị iche iche nke na-emepụta block 2 MB zuru ezu n’oghere nkeji 25 tụrụ ọnụego stale 4.86% na ọnụego fork 0.37%. Naanị mmezi dị mkpa bụ nhazi TCP. Ebe devnet ahụ bụ decentralized karịa mainnet taa, ZIP na-ewere ndị a dịka ọnụ ọgụgụ dị nso na ọnọdụ kacha njọ.
- **Ebe ntụnyere:** ZIP na-eji ọnụego stale proof-of-work akụkọ ihe mere eme Ethereum nke 5.4% dịka oke nchekwa ya. Ọnụ ọgụgụ devnet abụọ ahụ dị n’okpuru ya.

E nwekwara obere ụgwọ abụọ ọzọ. E-akpa ego dị mfe na-ebudata ihe dị ka 200 KB karịa kwa ụbọchị nke isi block dị mkpirikpi. N’ihi na block dị okpukpu atọ, full node nke nọworo offline nwere ọtụtụ block ọ ga-ahazi mgbe ọ na-enweta ihe ndị fọdụrụ, ọbụna ma block ọ bụla dị ọnụ ala karịa iji kwado. ZIP nabatara ha abụọ.

## Ọnọdụ na usoro oge

- **Ọnọdụ ZIP:** Atụpụtara. Ndị nwe ya bụ Dev Ojha na Evan Forbes; e kere ya na 13 Maachị 2026.
- **Ntuli aka ndị ji mkpụrụ ego:** mechiri na 14 Septemba 2026, na nkwado 99.9%. Ntuli aka ahụ na-egosi mmasị; ọ naghị agbanwe iwu consensus n’onwe ya.
- **Usoro oge:** n’ọkwa ọkwa Community Forum Zcash na 17 Septemba, òtù mmepe kwetara usoro nke code ga-ezu oke n’ime 30 Septemba, NU7 na testnet na 6 Ọktoba, na mkpebi ikpeazụ na 20 Ọktoba. Edebela ugbu a ogo mbido mainnet na 3,543,405 ([ZIP 259](https://zips.z.cash/zip-0259)), nke a na-ezubere maka ihe dị ka 5 Nọvemba 2026.
- **Mmejuputa:** a na-esochi ya na Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) na na Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Ihe nke a pụtara nye gị

- **Ijide ZEC:** ọ dịghị ihe a ga-eme. Balance gị na usoro nnyefe anaghị emetụta.
- **Iji e-akpa ego:** melite mgbe e-akpa ego gị wepụtara nkwado NU7. Nkwenye mbụ ga-abịa ihe dị ka ugboro atọ ngwa ngwa karịa.
- **Ịrụ node, exchange, ma ọ bụ ọrụ:** mee atụmatụ imelite tupu mbido, ma nyochaa ntọala ọ bụla a tụrụ na block, ebe ọnụ ọgụgụ block kwụ ọtọ na-ekpuchi ugbu a otu ụzọ n’ụzọ atọ nke oge ọ kpuchiri mbụ.

## Isi mmalite

- [ZIP 218: Oge Ezubere Block Nkeji 25](https://zips.z.cash/zip-0218)
- [ZIP 208: Oge Ezubere Block Dị Mkpirikpi](https://zips.z.cash/zip-0208), ụkpụrụ Blossom
- [Forum: Atụmatụ — Belata Oge Ezubere Block Zcash ruo 25s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: Mbelata Oge Block Zcash Dị Ka Ọ Dị Nchekwa Maka NU7 na Devnet naanị Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra okwu #11463](https://github.com/ZcashFoundation/zebra/issues/11463), oge halving na nkwado mgbe NU7
- [Zebra okwu #11440](https://github.com/ZcashFoundation/zebra/issues/11440), nsuso mmejuputa ZIP 218
- NU7 nsonaazụ ntuli aka na usoro oge, dịka Bitcoin.com News, crypto.news, na KuCoin kọrọ (16–19 Septemba 2026)

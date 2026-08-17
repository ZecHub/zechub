<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 malitere na Zcash mainnet n'ụlọ 1,687,104 (May 31, 2022 UTC).

Ihe ị ga-ewepụ: otu NU5 si nye Zcash ọdọ mmiri ọhụrụ echedoro nke na -achọghị ntọala tụkwasịrị obi, gbakwunyere ụdị adreesị naanị ya na arụ ọrụ n'ofe ọdọ mmiri.

NU5 (Nwelite Ntanetị 5) bụ nke isii Zcash. [nkwalite netwọkụ.](../start-here/network-upgrades), nke a na- emejuputa site n" aka: [ZIP 252 (mkpọka)](https://zips.z.cash/zip-0252)Ọ bụ nnukwu nkwalite cryptographic. O webatara usoro ịkwụ ụgwọ echekwara Orchard, nke e wuru na sistemụ Halo 2, yana adreesị dị n'otu na ụdị azụmahịa 5 ọhụrụ. NU5 ebuputara na ntọhapụ zcashd v5.0.0 nke Electric Coin Company .

Why this matters. A shielded pool is only as trustworthy as the setup that created it. Zcash's first two shielded pools, Sprout and Sapling, each needed a one-time trusted setup ceremony to generate their secret parameters. If those parameters were ever kept instead of destroyed, someone could have printed counterfeit ZEC without anyone seeing it. NU5's Orchard pool closes that concern by using the Halo 2 proving system, which needs no such ceremony.

## Nhazi a tụkwasịrị obi.

Orchard bụ usoro ọhụụ nke Zcash kachasị ọhụrụ, akọwapụtara na [ZIP 224 (mkpọka)](https://zips.z.cash/zip-0224)Ọ na-ewuli elu n'usoro Halo 2 nke gosipụtara, nke na-eji usoro a kpọrọ PLONKish arithmetization on the Pallas and Vesta curve cycle. Ihe bara uru dị mfe: Halo 2 adịghị mkpa ntọala tụkwasịrị obi ma ọ bụ eriri ederede ahaziri iche, yabụ enweghị ihe nzuzo zoro ezo nwere ike iji mee ihe ọjọọ.

Sprout and Sapling both depended on a trusted setup. A group of people ran a ceremony to build each pool's parameters, and everyone had to trust that at least one of them destroyed their piece of the secret. Orchard removes that assumption. The older pools still exist after NU5, so the no-setup guarantee applies to funds you hold in the Orchard pool.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## Ihe NU5 gbanwere

NU5 na-agbakọta ọtụtụ mgbanwe nkwekọrịta, ha niile arụ ọrụ ọnụ na ngọngọ 1,687,104.

1. Ọ gbakwunyere ọdọ mmiri Orchard (ZIP 224), usoro Halo 2 nke akọwapụtara n'elu.
2. Ọ gbakwunyere usoro azụmahịa nke 5 (ZIP 225), nhazi a na-emegharị ya na mpaghara dị iche maka data doro anya, Sapling, na ọhụrụ Orchard. E wepụrụ ubi ndị nwere ike ịba uru, ma ụdị mbipute 4 ochie ahụ ka dịkwa irè mgbe arụ ọrụ.
3. Ọ webatara adreesị na igodo nlele (ZIP 316), nke a tụlere na ngalaba ọzọ.
4. Ọ nakweere njirimara azụmahịa na-enweghị ike (ZIP 244), ụzọ ọhụrụ nke ịgbakọ id transaction's nke kewara ihe nkwekọrịta ahụ si n'aka ndị akaebe na mbinye aka nyere ya ikike.
5. Ọ nakweere koodu Jubjub isi (ZIP 216) iji wepu koodu ndị na-abụghị ọkọlọtọ ma mee ka iwu sie ike banyere ihe a ga - agụ dị ka azụmahịa ziri ezi.
6. O mere ka e nwee ike ịnyefe azụmahịa nke 5 n'ofe netwọkụ ibe (ZIP 239).

NU5 emelitere ọtụtụ ZIP ndị dị ugbu a (32, 203, 209, 212, 213, 221, na 401) ka ha wee nwee ike ịkọwa ọdọ mmiri ọhụrụ Orchard.

## Adreesị ndị dị n'otu

Tupu NU5, ọdọ mmiri ọ bụla nwere ụdị adreesị nke ya, onye na-ezipụ ga-amarakwa ụdị ị chọrọ. Adreesị Unified, akọwapụtara n'ime [ZIP 316  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0316)Otu adreesị nwere ike ijikọta ndị na-anata ihe karịrị otu ọdọ mmiri, yabụ obere akpa onye zitere ahụ họrọ nke kachasị mma ọ kwadoro.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Igodo igosi ihe na-arụ ọrụ n'otu ụzọ ahụ maka ile anya. Ha na - enye visibiliti naanị ịgụ gafee ọdọ mmiri adreesị kpuchiri. Maka nkọwa ndị ọzọ, lee akwụkwọ ozi a: "Nchọpụta nke Adres" (na Bekee). [Igodo Nlele](../zcash-tech/viewing-keys) peeji nke.

## Ebe NU5 nọ.

NU5 followed Zcash's earlier upgrades: Overwinter, Sapling, Blossom, Heartwood, and Canopy. It activated on mainnet on May 31, 2022. Orchard's curve cycle was chosen because it supports recursion, which is groundwork for later scaling work. NU5 is the direct predecessor to the NU6 and NU6.x line of upgrades, which built on the Orchard pool and later patched it.

## Akwụkwọ ọkọwa okwu

Okwu. N'asụsụ Bekee nkịtị pụtara:
|---|---|
◯ Nwelite netwọk (NU) ▸ Mgbanwe a haziri ahazi na iwu nkwekọrịta Zcash, nke arụ ọrụ n'ogo ngọngọ setịpụrụ.
 Orchard. The echebe ọdọ mmiri NU5 ẹkenam, wuru na Halo 2 egosi usoro.
Halo 2 Usoro nyocha n'azụ Orchard nke na-achọghị ntọala a tụkwasịrị obi.
◯ Nhazi a tụkwasịrị obi ▪ Ememe otu oge nke na-emepụta ihe nzuzo dị n'ọdọ mmiri ma bụrụ onye e kwesịrị ịtụkwasị obi iji bibie ha.
◯ Unified address. Otu adreesị nwere ike ijikọta ndị nnata maka ihe karịrị otu ọdọ mmiri (ZIP 316)
◯ Consensus branch id. Ihe njirimara na-egosi nke setịpụrụ iwu azụmahịa bụ otu n'ime ya.

## Ajụjụ ndị a na-ajụkarị

NU5 gbanwere ZEC m ma ọ bụ nzuzo m? Mba. NU5 gbakwunyere ọdọ mmiri ọhụrụ echedoro na usoro adreesị ọhụụ. Ọdịnaya gị dị ugbu a adịghị emetụta, yana enweghị ike ịchekwa onwe gị. Ịkwaga ego n'ime Orchard na-enye gị ọdọ mmiri nke chọrọ ntọala ntụkwasị obi. Nke ahụ ga - eme ka ị nwee ohere ịnweta akaụntụ akụ ọzọ maka oge ụfọdụ (ọ bụrụhaala na ha nwere ihe nchọpụta). Nweta aha njirimara: Aha ngalaba "Z" pụtara 'Nhazi'.

Gịnị bụ Orchard? Ọchịchịrị bụ usoro Zcash nke NU5 webatara. Ọ na-agba ọsọ n'usoro ihe ngosi Halo 2, yabụ ọ chọghị emume ntọala tụkwasịrị obi.

Enwere m ihe ọ bụla? Mba. A kwadoro obere akpa aka NU5 maka gị. Ị nwere ike ịnọgide na-eji okenye adreesị, ma ị pụrụ ịmalite iji n'otu adreesì mgbe gị wallet awade ha. Ọ bụrụ na i tinye a ọhụrụ akaụntụ, ị ga-enwe ohere nke inwe otu onye ọrụ dị ka ndị ahịa si mba ọzọ.

Kedu ihe bụ adreesị dị n'otu? Otu adres nke nwere ike ijide ndị nnata maka karịa otu ọdọ mmiri. Obere akpa ego onye na-ezipụ ya họọrọ ọdọ mmiri ọ kwadoro, yabụ ịkwesighi inyefe adreesì dị iche maka ụdị ọ bụla.

NU5 ewepu ntọala ntụkwasị obi site na ego m ochie? Ọ bụghị azụ. Orchard achọghị nhazi nke a tụkwasịrị obi, mana usoro ndị gara aga nke ọdọ mmiri Sapling ka dị mgbe NU5. Nkwado enweghị ntọala metụtara ego ejiri n'ime ogige orchard.

Ọ bụ na usoro azụmahịa ochie ahụ kwụsịrị ịrụ ọrụ? NU5 gbakwunyere ụdị nke 5, yana usoro 4 dịbu gara aga ka bara uru mgbe arụnyere ya.

## Nwalee nghọta gị .

Sprout na Sapling abụọ chọrọ emume ntọala a tụkwasịrị obi. Gịnị ka ọdọ mmiri Orchard nke NU5 gbanwere banyere ya, gịnịkwa mere o ji dị mkpa?

<details>
<summary>Answer</summary>

Orchard is built on the Halo 2 proving system, which needs no trusted setup and no structured reference string. That removes the risk that leftover secret parameters could ever be used to counterfeit ZEC. The guarantee applies to funds held in the Orchard pool. The older Sapling parameters still exist after NU5.
</details>

### Akụnụba

[ZIP 252: Ịmepụta NU5 Network Upgrade](https://zips.z.cash/zip-0252)

[ZIP 224: Usoro Nchebe nke Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Ụdị 5 Transaction Format](https://zips.z.cash/zip-0225)

[ZIP 316: Adreesị Unified na Igodo Nlele Na-ahụ Maka Ịhụ Ihe Ndị Dị n'Otu](https://zips.z.cash/zip-0316)

[Nwelite netwọk 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 release](https://electriccoin.co/blog/new-release-5-0-0/)

### Lee kwa nke a.

[Nwelite netwọk Zcash](../start-here/network-upgrades)

[Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](../using-zcash/shielded-pools)

[Halo (ụtụtụ ọma)](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Igodo Nlele](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Usoro: [Nhazi nke netwọkụ na-emelite.](../start-here/network-upgrades) · Nke gara aga: [Ugboro abụọ](../zcash-tech/canopy) · Nke ọzọ: [NU6](../zcash-tech/nu6)

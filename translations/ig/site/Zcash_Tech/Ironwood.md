<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Arụnyere Ironwood na Zcash mainnet na ngọngọ 3,428,143 na Julaị 28, 2026 UTC, ọ nọkwa na-arụ ọrụ kemgbe ahụ.

Ihe ị ga-ewepụ: ihe Ironwood na-agbanwe, ihe kpatara ahụhụ dị na ego zoro ezo ji dị njọ, na otu turnstile si enye onye ọ bụla ohere ikweta na ọ dịghị ZEC e mepụtara.

Ironwood bụ Zcash [mmelite netwọk](../start-here/network-upgrades), nke a na-akpọ NU6.3, nke na-ewebata ọdọ mmiri ọhụrụ nwere otu aha ahụ [ọdọ mmiri echebe](../using-zcash/shielded-pools) bụ otu ego nke ego na ndị nwe ya na-ezochi site na [nzuzo enweghị ihe ọmụma](../zcash-tech/zk-snarks)Ironwood dị iji gbochie ma nyochaa nsogbu ahụike dị n'ọdọ mmiri Orchard dị ugbu a, nakwa iji nye obodo ụzọ siri ike iji chọpụta ma ngụkọta ZEC zuru oke bụ eziokwu. Iwu nkwenye ya dị na [ZIP 258](https://zips.z.cash/zip-0258).

Ihe kpatara nke a ji dị mkpa. Site na ego doro anya dịka Bitcoin, onye ọ bụla nwere ike ịlele na ọ dịghị mkpụrụ ego e mepụtara site n'ịgụ akwụkwọ ndekọ ọha. Ego e zoro ezo na-ezochi ego ahụ, yabụ na ị gaghị ele anya naanị. Kama nke ahụ, akwụkwọ nzuzo ahụ ga-eme ka o doo anya na ọ dịghị onye nwere ike ịmepụta ego na nzuzo. Ironwood dị mkpa n'ihi na achọtara ahụhụ na nkwa ahụ maka ọdọ mmiri Orchard. Mmelite ahụ na-emechi oghere ahụ ma nye onye ọ bụla ụzọ iji gosi na ngụkọta ZEC ka bụ eziokwu.

Ọhụrụ na Zcash? Malite na [Kedu ihe bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash) na [Ọdọ Mmiri E Kpuchiri Ekpuchi](../using-zcash/shielded-pools), wee laghachi ebe a.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Ihe mere e ji chọọ Ironwood

Na ngwụcha Mee 2026, onye nyocha nchekwa nọọrọ onwe ya bụ Taylor Hornby, n'oge nyocha usoro maka [Shielded Labs](../zcash-organizations/shielded-labs), gosiri n'ụzọ ezi uche dị na ya otu ahụhụ ahụike dị n'ọdọ mmiri ahụ e ji ihe mkpuchi Orchard kpuchie. Orchard bụ ọdọ mmiri Zcash's kachasị ọhụrụ e ji ihe mkpuchi kpuchie n'oge ahụ, ntụpọ ahụ dịkwa n'akụkụ akụkụ elliptic nke sekit ihe ọmụma efu ya, nke na-eji [Halo](../zcash-tech/halo) 2 sistemụ nnwale.

1. Nsogbu ahụike pụtara na mgbakọ na mwepụ nke gosiri na azụmahịa ahụ dị irè anaghị ekwe nkwa ya kpamkpam.
2. N'echiche, onye na-awakpo nwere ike iji ntụpọ ahụ mepụta uru na-adịghị mma n'ime ọdọ mmiri Orchard wee mefuo ego na-abụghị nke ha, na-ahapụghị ihe ọ bụla ga-ejide otu ebe nkịtị.
3. Orchard Zcash's ka na-ekpuchi ọnụ Orchard, ya mere enweghị ike ibuli ihe niile dị na ya elu, mana ihe ndekọ nke ọdọ mmiri ahụ emeghịzi ka a mara na mkpụrụ ego ọ bụla zoro ezo dị n'ime ya bụ ezigbo ya.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Ọnụọgụgụ ndị dị n'elu bụ foto dị mfe nghọta. Nrụgide dị n'ezie dị n'otu akụkụ nke mgbakọ na mwepụ nke sekit ahụ, ọ bụghị ọnụọgụgụ mkpụrụ ego na-abanye na mpụga. Isi ihe a ga-ewepụ bụ naanị na njehie ahụike nwere ike ikwe ka e mepụta uru n'ime ọdọ mmiri ahụ na-enweghị nchọpụta.

Ihe dị mkpa bụ na ọ dịghị ihe akaebe na e jiri nje ahụ mee ihe, ọ dịghị ihe akaebe na-egosi mmetụta ọ na-enwe na ego ndị ọrụ, ọ dịghịkwa ihe akaebe na-egosi na mkpokọta ZEC agbanweela. A chọtara ya site na nyocha nchekwa ma dozie ya tupu ihe ọjọọ ọ bụla a maara.

## Azịza ya

Ndị Zcash zigara ndozi n'usoro kama ime ihe niile n'otu oge.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Na mbido ọnwa Juun afọ 2026, otu ihe nwa oge mebiri ọdọ mmiri Orchard ebe a na-akwado ndozi zuru oke.
2. Mmelite NU6.2 doziri sekit Orchard n'onwe ya, wee mechie adịghị ike nke ịdị mma dị n'okpuru.
3. Nkwalite NU6.3, Ironwood, na-ewebata ọdọ mmiri ọhụrụ a na-echebe nke ọma na ebe a na-enyocha ihe ọha na eze ka uru wee pụọ na ọdọ mmiri Orchard ochie n'okpuru nyocha zuru oke.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Ihe ọdọ mmiri Ironwood na-eme

NU6.2 nwetara usoro Orchard maka azụmahịa ọhụrụ niile, mana uru e kere n'okpuru iwu ochie ka dị n'ọdọ mmiri Orchard. Ironwood na-enye uru ahụ ebe dị ọcha na ụzọ isi nyochaa ya ka ọ na-agagharị.

Ọdọ mmiri Ironwood bụ ọdọ mmiri uru nke NU6.3 mepụtara na blọk 3,428,143. A na-ewu ya na sekit edoziri ma na-eji usoro ndetu a na-agbanwe agbanwe (ihe nlereanya nke na-enye ohere ka a nweta ego ma ọ bụrụ na ọ dị mkpa [kọmputa kwantum](../zcash-tech/post-quantum-security) gbajie ihe odide nzuzo nke taa), nke a kọwara na [ZIP 2005](https://zips.z.cash/zip-2005).

1. Mgbe emechara ọrụ ahụ, ọdọ mmiri Orchard ochie ahụ na-aghọ naanị ego, yabụ na uru ọhụrụ agaghị abanye na ya.
2. Uru nchekwa ọhụrụ na-abanye na Ironwood kama.
3. N'ime Ironwood, ZEC e ji ihe nchekwa kpuchie na-echekwa nzuzo nke na-ezochi onye zitere, onye nnata, na ego ole. Ibufe ZEC site na Orchard gaa na Ironwood na-egosi ego e bufere.

## Ogwe aka ahụ

Isi ihe dị na Ironwood bụ ntụgharị, ebe a na-enyocha akaụntụ nke mkpụrụ ego ọ bụla ga-agafe mgbe ọ na-esi n'ọdọ mmiri Orchard ochie ahụ gaa Ironwood.

> Ihe e ji agbanwe ihe na-eme ka e nwee ego zoro ezo, ihe ọnụ ụzọ iko na-eme maka ebe a na-echekwa ego n'ụlọ akụ. Ị ka na-ahụ ihe dị n'ime ya, mana ị nwere ike ịgụta kpọmkwem ihe na-abanye na ihe na-apụta.

1. A na-agụta ego ndị na-apụ na Orchard n'ebe a na-enyocha ọha tupu ha abanye na Ironwood.
2. Nke a na-enye onye ọ bụla ohere inyocha ego ole ZEC na-akwaga, na-eme ka obi sie ike na ezigbo ọkọnọ na-ekesa.
3. Ọ bụrụ na e mepụtara ZEC adịgboroja ọ bụla site na njehie mbụ, akaụntụ mbugharị a bụ ebe ọ ga-apụta ìhè.

Turnstiles abụghị ihe ọhụrụ na Zcash. Netwọk ahụ ejirila ha mee ihe mbụ, n'ókè dị n'etiti ọdọ mmiri Sprout, Sapling, na Orchard, ka uru na-agagharị n'etiti ọdọ mmiri wee bụrụ nke a na-enyocha, ọ dịghịkwa ọdọ mmiri nwere ike ịpụta ihe karịrị nke e tinyere n'ime ya n'ụzọ iwu kwadoro.

Iwu nkwekọrịta na-eme ka uru ọ bụla dị n'ime Ironwood, netwọk ahụ dị n'ime oke ego kachasị elu nke netwọk ahụ, yabụ na nguzozi pool agaghị adị njọ.

## Ihe ndị ọrụ kwesịrị ime

Ngwa obere akpa na ngwanrọ node na-ejikwa ọtụtụ n'ime nke a na akpaghị aka, mana mgbanwe bara uru dị mfe: ka oge na-aga, bufee ihe ndị e ji kpuchie site na ọdọ mmiri Orchard ochie site na turnstile gaa na ọdọ mmiri Ironwood. Njem ọ bụla na-egosi ego ya na blockchain, yabụ obere akpa ndị na-esochi ya [ZIP 318](https://zips.z.cash/zip-0318) kewaa ya n'ime ọnụọgụ nkịtị wee ziga ha ka oge na-aga. Soro ntuziaka sitere n'aka onye na-enye obere akpa gị, ma debe ngwanrọ gị na ntọhapụ akwadoro.

## Nkọwa Okwu

| Oge okwu | Nkọwa Bekee dị mfe |
|---|---|
| Shielded pool | Nchịkọta ego nke ego na ndị nwe ya zoro ezo site na nzuzo efu |
| Soundness bug | Njehie nke na-ekwe ka azụmahịa na-ezighi ezi gafere nyocha akaebe dị ka a ga-asị na ọ dị irè |
| Turnstile | Ebe nlele ọha nke na-agụta uru na-agagharị n'etiti ọdọ mmiri ka ọkọnọ ahụ wee nọgide na-enyocha ya |
| Spend-only | Ọdọ mmiri ị nwere ike iji, mana ị gaghị etinye uru ọhụrụ na ya |
| Network upgrade (NU) | Mgbanwe nhazi na iwu nkwekọrịta Zcash's, nke a na-arụ ọrụ na elu blọk edobere |
| Quantum-recoverable note | E mere usoro ndetu ka e wee nweta ego ma ọ bụrụ na kọmputa quantum emebie ihe ndekọ ego nke oge a |

## Ajụjụ Ndị A Na-ajụkarị

Ò metụtara ZEC m? Mba. Enweghị ihe akaebe na e jirila ahụhụ ahụ mee ihe, enweghị mmetụta ọ bụla na ego ndị ọrụ, enweghịkwa mgbanwe na mkpokọta ọkọnọ ahụ.

Ọ dị mkpa ka m mee ihe ọ bụla? Debe obere akpa gị na ngwanrọ node gị na ntọhapụ akwadoro. Imefu ego Orchard na-ebuga ha na Ironwood, ego nke gafere bụ nke ọha. Ụfọdụ obere akpa na-enye mbugharị nke na-eziga ego nkịtị ka oge na-aga, yabụ na ọ na-esiri ike ijikọ nguzozi gị. Soro ntuziaka onye na-enye obere akpa gị.

Zcash ọ̀ ka bụ nkeonwe? Ee. Ụgwọ dị n'ime onye na-eziga ihe, onye na-anata ihe, na ego dị n'ime Ironwood, dịka ụgwọ Orchard si dị. Ego a na-agafe n'etiti ọdọ mmiri, dịka site na Orchard ruo Ironwood, bụ nke ọha. Mmelite a bụ maka iguzosi ike n'ezi ihe nkesa.

È jiri nje ahụ mee ihe? Enweghị ihe akaebe na-egosi na e ji ya mee ihe. A chọtara ya site na nnyocha nchekwa, kpughee ya nke ọma, ma dozie ya tupu e nwee ihe ọjọọ ọ bụla a maara.

Gịnị na-eme ọdọ mmiri Orchard ochie ahụ? Ọ na-aghọ naanị ihe a na-emefu. Uru ọhụrụ ọ bụla agaghị abanye na ya, uru dị adị na-abanyekwa na Ironwood site na turnstile, ebe a na-enyocha mbugharị ahụ n'ihu ọha.

## Nwalee nghọta gị

Ọ bụrụ na ZEC dị n'ime ọdọ mmiri ndị e ji ihe nchebe kpuchie ezo, kedu ka onye ọ bụla ga-esi gosi na ahụhụ Orchard ahụ emeghị ka mmiri zuru oke gbasaa na nzuzo?

<details>
<summary>Answer</summary>

Site na ebe a na-atụgharị ihe. A na-agụta mkpụrụ ego ọ bụla si n'ọdọ mmiri Orchard ochie ahụ gaa n'ebe a na-enyocha ihe ọha na eze ka ọ na-abanye Ironwood. Ọ bụrụ na a gbalịa ịpụ karịa itinye ya n'ụzọ ziri ezi, akaụntụ agaghị adaba, yabụ njehie ọ bụla a gaara emepụta ga-apụta n'ọnụ ụzọ ámá ahụ.
</details>

### akụrụngwa

[ZIP 258: Ntinye nke Nkwalite netwọkụ NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Ntinye nke Mbelata Ndabere Nwa Oge nke Orchard na Mmelite Netwọk NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Mweghachi nke Ironwood Quantum](https://zips.z.cash/zip-2005)

[ZIP 229: Ụdị nke 6 Usoro Azụmahịa](https://zips.z.cash/zip-0229)

[ZIP 318: Njem Orchard gaa Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Ọdọ Mmiri Ọhụrụ E Ji Echebe Maka Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Leekwa

[Mmelite netwọkụ Zcash](../start-here/network-upgrades)

[Ọdọ Mmiri E Kpuchiri Ekpuchi](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Nchekwa Quantum Mgbe Emechara](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Kedu ihe bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash)

---

Usoro: [Ndepụta Mmelite Netwọk](../start-here/network-upgrades) · Nke gara aga: [NU6.2](../zcash-tech/nu6-2)

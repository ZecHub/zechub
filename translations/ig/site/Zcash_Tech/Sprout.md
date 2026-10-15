<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash malitere na Ọktoba 28, 2016, ya na ọdọ mmiri Sprout nke nwere ihe nchebe.

> **Ịdọ Aka Ná Ntị:** NU7 na-eme ka ZEC ka dị na ọdọ mmiri Sprout ghara imefu ego ozugbo ọ malitere (mainnet ezubere maka 5 Nọvemba 2026, mkpebi ikpeazụ 20 Ọktoba 2026; lee [ZIP 259](https://zips.z.cash/zip-0259)) Ọ bụrụ na ị nwere ego Sprout, gụọ [Ịnata ego](../using-zcash/recovering-funds) ma buru ụzọ kwaga ha.

Ihe ị ga-ewepụ: Sprout bụ ebe Zcash malitere, nke mbụ ego nkeonwe, nke a pụrụ ịtụkwasị obi na-agba ọsọ na blockchain dị ndụ.

Sprout bụ mmalite mbụ nke netwọkụ Zcash, ọ bụghị nke mechara [mmelite netwọk](../start-here/network-upgrades)Ọ malitere ịpụta ìhè na ngalaba mmalite na Ọktoba 28, 2016. Enweghị ZIP nọmba na-akọwa Sprout: usoro ZIP malitere mgbe e mesịrị na Overwinter, yabụ nkọwapụta Zcash Protocol mbụ na owuwu Zerocash e wuru ya kọwara Sprout [Electric Coin Company](../zcash-organizations/electric-coin-company) (ụlọ ọrụ Zerocoin Electric Coin Company), nke Zooko Wilcox duziri, wuru ma ziga ya. Sprout webatara azụmahịa mbụ bara uru zk-SNARK kpuchiri na ọdọ mmiri mbụ ahụ e ji kpuchie, ka ndị mmadụ wee nwee ike izipu ZEC na onye zitere ya, onye nnata, na ego zoro ezo ebe netwọk ahụ ka na-enyocha ma nguzozi ahụ agbakọtala. Aha ahụ gosiri otu ụlọ ọrụ na-eto eto nke otu ahụ tụrụ anya na ọ ga-eto.

Ihe kpatara nke a ji dị mkpa. Blockchain ọha niile tupu Sprout egosipụtara ịkwụ ụgwọ gị: onye ọ bụla nwere ike ịhụ onye kwụrụ onye na ego ole. Sprout bụ netwọk mbụ dị ndụ, nke na-enweghị ikike izochi nkọwa ndị ahụ ma ka gosi na ọ dịghị onye na-aghọ aghụghọ. Nke ahụ dị mkpa maka nzuzo ego nkịtị, ụdị ị na-atụ anya ya site na ego ma ọ bụ akwụkwọ ego ụlọ akụ nke onye ọzọ na-agaghị agụ. O gosikwara na nzuzo siri ike dị n'usoro nwere ike ịrụ ọrụ n'ọrụ, karịa imewe akwụkwọ. Ememme ntọala a tụkwasịrị obi nke mere ka o kwe omume ghọrọ ebe ntụaka maka ọrụ nzuzo mgbe e mesịrị, sistemụ Sprout nke na-egosi nwayọ, nke na-echekwa ihe bụ kpọmkwem ihe kpaliri ndị otu ahụ iwu Sapling afọ abụọ ka e mesịrị.

## Ọdọ mmiri mbụ e ji echebe ihe

Sprout mepụtara ụdị adreesị abụọ. Adreesị doro anya (adreesị t) na-arụ ọrụ dị ka Bitcoin, nkọwa ndị a na-ahụkwa na akwụkwọ ndekọ ọha. Adreesị echekwara (adreesị z) na-eziga ego na Sprout [ọdọ mmiri echebe](../using-zcash/shielded-pools), ebe onye zitere ya, onye nnata, na ego ole ahụ na-ezo. Aghụghọ bụ [zk-SNARKs](../zcash-tech/zk-snarks), ihe akaebe efu nke na-eme ka azụmahịa gosi na ọ dị irè, na-enweghị mmefu okpukpu abụọ na nguzozi nke na-agbakọta, na-ekpugheghị nkọwa ọ bụla. Sprout bụ oge mbụ a na-emepụta nke a na cryptocurrency dị ndụ.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Ememme ahụ

zk-SNARKs dị na Sprout chọrọ usoro paramita ọha, imepụta ha n'enweghị nsogbu chọrọ nhazi otu oge a na-akpọ Ememme. Ndị sonyere isii nọ n'ebe dị iche iche, nke ọ bụla n'ime ha mepụtara ihe nzuzo, nke a na-akpọ ihe mkpofu na-egbu egbu. Ọ bụrụ na onye ọ bụla chịkọta ihe niile ahụ ọzọ, ha nwere ike ịmepụta ZEC site na ihe ọ bụla. Nhazi ahụ gbanwere ihe egwu ahụ ka ọ bụrụ iwu dị mfe: ọ bụrụhaala na ọ dịkarịa ala otu onye sonyere bibiri ihe ha, enweghị ike iwughachi ihe nzuzo ahụ zuru oke, yabụ imepụta ihe adịgboroja ka agaghị ekwe omume. Ndị sonyere a kpọrọ aha n'ihu ọha gụnyere Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, na Derek Hinch nke NCC Group. Otu onye sonyere họọrọ ịnọ na-amaghị aha ya.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## Mmalite

Sprout bụ ntọala nke mgbanwe ọ bụla na-abịa na-ewulite. Mgbe usoro nkwalite netwọkụ rutere na Overwinter, o kpọrọ iwu mbụ dị ka ngalaba nkwenye ID 0, nke pụtara na etinyebeghị mmelite ọ bụla. Ihe niile kemgbe ahụ (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, na-aga n'ihu) dị na usoro Sprout malitere. A mara ọkwa mmalite ahụ na Ọgọst 2016 maka mmalite Ọktoba 28, emume ahụ mere n'izu ndị gara aga, akara oge nke ngalaba genesis ahụ na-agụ Ọktoba 28, 2016, na 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## Nkọwa Okwu

| Oge okwu | Nkọwa Bekee dị mfe |
|---|---|
| zk-SNARK | Ihe akaebe efu nke na-egosi na azụmahịa dị irè n'ekpugheghị onye zitere ya, onye nnata, ma ọ bụ ego ole ọ chọrọ |
| Shielded pool | Akụkụ nkeonwe nke Zcash ebe a na-ezobe ego na oriri. Ọdọ mmiri Sprout bụ nke mbụ |
| z-address and t-address | A na-echekwa adreesị z ma na-edebe nkọwa nzuzo. Adreesị t na-edo anya ma na-egosi nkọwa na akwụkwọ ndekọ ọha |
| The Ceremony | Nhazi nke ọtụtụ ndị otu nke afọ 2016 nke mepụtara paramita ọha Sprout's wee tụfuo ihe mkpofu na-egbu egbu |
| Toxic waste | Isi ihe nzuzo sitere na emume ahụ nke a ga-ebibi ka e wee ghara imepụta ZEC |
| Consensus branch id 0 | Akara maka iwu Sprout's, nke pụtara ntọala tupu mmelite netwọkụ ọ bụla |

## Ajụjụ Ndị A Na-ajụkarị

Sprout ọ̀ na-agbanwe ZEC m ka ọ bụ nzuzo m taa? Mba. Sprout bụ akụkọ ihe mere eme, mmalite nke malitere usoro ZEC gị na-ebi ndụ. Mkpụrụ ego gị na nzuzo gị taa dabere na obere akpa ego na ọdọ mmiri a na-echebe nke ị na-eji ugbu a, ọ bụghị n'ihe ọ bụla ị chọrọ ime gbasara Sprout.

Gịnị mere na enweghị nọmba ZIP maka Sprout? Usoro ZIP ahụ malitere mgbe e mesịrị, site na mmelite Overwinter. Sprout bụ mmalite mbụ, nke nkọwapụta Zcash Protocol na owuwu Zerocash ya kọwara. ZIP 200 na-ekwu naanị Sprout n'azụ, dị ka ngalaba nkwenye ID 0, ntọala tupu mmelite ọ bụla.

Ò kwesịrị ka m tụkwasị mmadụ isii nọ n'emume ahụ obi? E wuru ntọala ahụ ka naanị otu n'ime ha wee kwuo eziokwu. Onye ọ bụla nwere otu ihe nzuzo, ma ọ bụrụhaala na otu onye so na ya bibie nke ha, a gaghị enwe ike iwughachi ihe nzuzo ahụ kpamkpam, ọ dịghịkwa onye nwere ike ịmepụta ZEC. A kpọpụtala aha mmadụ ise so na ya n'ihu ọha, otu ka na-amaghị aha ya.

Ọdọ mmiri Sprout ọ̀ bụ nke obere akpa m na-eji ugbu a? O nwere ike ọ bụghị. Sprout bụ ọdọ mmiri mbụ e ji kpuchie, mana mmelite ndị e mechara dịka Sapling webatara nhazi nchekwa ngwa ngwa, ọtụtụ obere akpa na-ejikwa ọdọ mmiri ọhụrụ taa. Sprout ka dị mkpa n'ihi na ọrụ nke gosipụtara azụmahịa nkeonwe, nke a pụrụ ịtụkwasị obi nwere ike ịgba ọsọ na netwọk dị ndụ.

Gịnị mere Sprout ji dị iche na Bitcoin? Bitcoin na-etinye ụgwọ ọ bụla n'akwụkwọ ndekọ ọha ebe a na-ahụ ọnụọgụ na adreesị. Sprout tinyere azụmahịa echekwara nke na-ezochi onye zitere ya, onye nnata, na ego ebe ọ ka na-ekwe ka netwọk ahụ gosi na azụmahịa ahụ dị irè. O debekwara adreesị doro anya, yabụ ụdị abụọ ahụ na-ebi n'otu usoro.

## Nwalee nghọta gị

A na-akpọkarị Sprout nkwalite netwọk nwere oke ọrụ. Gịnị mere na nke ahụ ezighi ezi?

<details>
<summary>Answer</summary>

Sprout bụ mmalite mbụ nke Zcash, ọ bụghị mmelite emechara. Ọ nọwo na-arụ ọrụ kemgbe ngọngọ genesis (block 0) na Ọktoba 28, 2016, yabụ enweghị elu mmalite iji tụọ aka na ya. Usoro nkwalite netwọkụ bịara mgbe e mesịrị wee kpọọ iwu Sprout's dị ka ngalaba nkwenye ID 0, ntọala tupu mmelite ọ bụla.
</details>

### akụrụngwa

[ZIP 200: Usoro Mmelite Netwọk](https://zips.z.cash/zip-0200)

[Mmelite netwọkụ Zcash](https://z.cash/upgrade/)

[Electric Coin Company: Mmalite Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Nhazi nke Ememme ahụ](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Leekwa

[Ọdọ Mmiri E Kpuchiri Ekpuchi](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Mmelite netwọkụ Zcash](../start-here/network-upgrades)

[Kedu ihe bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Usoro: [Ndepụta Mmelite Netwọk](../start-here/network-upgrades) · Osote: [Overwinter](../zcash-tech/overwinter)

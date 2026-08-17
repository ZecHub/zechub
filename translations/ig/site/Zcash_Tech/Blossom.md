<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Osisi okooko osisi Blossom

> Blossom gara ndụ na Zcash mainnet na ngọngọ 653,600 (December 11, 2019 UTC).

Ihe ị ga-ewepụ: otú Blossom si mee ka Zcash blocks rute ihe dịka okpukpu abụọ ngwa ngwa n'agbanweghị ole ZEC netwọk ahụ na -emepụta oge.

Blossom bụ Zcash. [nkwalite netwọkụ.](../start-here/network-upgrades)Ọ bụ ndị ọrụ nchekwa wụnye ya . [ZIP 206 Ụlọ ọrụ](https://zips.z.cash/zip-0206), na isi mgbanwe nkwekọrịta ya ka akọwapụtara n'ime . [ZIP 208 Ụlọ ọrụ](https://zips.z.cash/zip-0208)Blossom bụ nkwalite scalability: ọ belatara oge ebumnuche n'etiti ngọngọ site na 150 sekọnd ruo 75 sekọnda, yabụ blocks rutere ihe dị ka okpukpu abụọ. The Electric Coin Company duru ma kwupụta Blossum .

Why this matters. When you send ZEC, you wait for the network to confirm it in a block. If blocks are slow, you wait longer. Before Blossom, a new block was expected about every 150 seconds. Blossom cut that target in half, to 75 seconds, so confirmations come sooner and the chain can carry more transactions in the same amount of time. It did this without creating more ZEC or moving the timing of future halvings.

## Ihe na-agba ọsọ ngwa ngwa.

Mgbanwe isi nke Blossom dị mfe. Zcash lekwasịrị anya na ngọngọ, oge netwọk ahụ chọrọ n'etiti otu ogige na ọzọ, si 150 sekọnd ruo 75 sekọnda ([ZIP 208 Ụlọ ọrụ](https://zips.z.cash/zip-0208)A na-achọta ngọngọ site n'ihe akaebe nke ọrụ, yabụ ọdịiche dị iche n'etiti ha dịgasị iche, mana netwọkụ ahụ ugbu a chọrọ maka otu ogige kwa sekọnd 75 kama ọ bụla 150.

Ihe abụọ na-eso:

1. Ihe mgbochi na-abata ihe dị ka okpukpu abụọ, yabụ yinye ahụ nwere ike ibute azụmahịa ugboro abụọ kwa oge.
2. Mmekọrịta gị na-enweta nkwenye mbụ ya ngwa ngwa, n'ihi na ị naghị echere ogologo oge maka ngọngọ ọzọ.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Ịnọgide na-ebipụta akwụkwọ ahụ mgbe niile.

Faster blocks raise a question. If Zcash made twice as many blocks and each block still paid the same reward, the network would create ZEC twice as fast. Blossom avoids that. It halved the reward paid per block, and it doubled the block-reward halving interval from 840,000 to 1,680,000 blocks ([ZIP 208 Ụlọ ọrụ](https://zips.z.cash/zip-0208)) Ugboro abụọ dị ka ọtụtụ blocks, onye ọ bụla na-akwụ ụgwọ ọkara karịa, arụ ọrụ ruo otu ego nke ZEC kere kwa nkeji oge. ngụkọta usoro iheomume ọkọnọ na oge nke ọdịnihu halvings, tụrụ ya n'oge ahụ, agbanweghị agbanwe.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Nkwalite iwu kwadoro.

Blossom bụ mgbanwe nkwekọrịta abụọ, nke pụtara na ọnụ ọ bụla ga-emelite iji nọgide na-agbaso agbụ ([ZIP 206 Ụlọ ọrụ](https://zips.z.cash/zip-0206)). It was not optional for a node operator who wanted to stay in sync. Blossom activated at mainnet block 653,600 and carries its own consensus branch id, a tag that lets nodes and transactions confirm they are on the Blossom rules. The upgrade used Zcash's standard network upgrade mechanism ([ZIP 200 Ụlọ ọrụ](https://zips.z.cash/zip-0200)).

## Ebe Blossom dabara adaba

Blossom bụ nke atọ netwọk nkwalite Zcash. Ọ sochiri Overwinter na Sapling, ọ bịakwara tupu Heartwood na Canopy. N'adịghị ka Sapling , nke rụgharịrị ihe mkpuchi nzuzo Zcash kpuchie ya, a lekwasịrị anya n'ịdị elu na ọsọ. Ọrụ ya bụ isi bụ oge ngọngọ, ọ bụghị atụmatụ nzuzo ọhụrụ.

## Akwụkwọ ọkọwa okwu

Okwu. N'asụsụ Bekee nkịtị pụtara:
|---|---|
 Oge dị n'etiti ihe mgbaru ọsọ nke ngọngọ ahụ. oge netwọk na-achọ maka otu ogige ruo ọzọ.
 Block ụgwọ ọrụ  The ọhụrụ ZEC kere na-akwụ dị ka onye ọ bụla ngọngọ a gwuru.
 Ịgbaji oge ole ka ị ga-agafe n'etiti nke ọ bụla na nkwụghachi ụgwọ.
◯ Consensus branch id. A mkpado na akara nke set of netwọk iwu a ọnụ ma ọ bụ azụmahịa na-esote.
◯ Mgbanwe nkwekọrịta abụọ ❖ mgbanwe iwu nke ọ bụla ọnụ ga-agbaso iji nọrọ na netwọkụ ahụ.
◯ Nwelite netwọk (NU) ▸ Mgbanwe a haziri ahazi na iwu nkwekọrịta Zcash, nke arụ ọrụ n'ogo ngọngọ setịpụrụ.

## Ajụjụ ndị a na-ajụkarị

Blossom ọ gbanwere ole ZEC dị maọbụ mgbe halving na-eme? Mba. E belatara ụgwọ ọrụ kwa ngọngọ, e mekwara ka oge nkewa okpukpu abụọ n'otu oge ahụ, ya mere ego ZEC mepụtara maka nkeji oge, yana usoro ịhazi ọdịnihu ga - adịgide otu ihe ahụ.

Does Blossom change my ZEC or my privacy? No. Blossom changed block timing and reward math. It did not touch your balances or your shielded transactions.

Kedu ihe 75 sekọnd pụtara n'ezie? Ọ bụ ebumnuche, ọ bụghị nkwa. A na-achọta ngọngọ site na akaebe nke ọrụ, yabụ ezigbo ọdịiche dị n'etiti blocks dịgasị iche. Ntanetị ahụ chọrọ otu maka ihe dịka nkeji iri asaa na ise kama ịbụ 150 ọbụla.

Enwere m ihe ọ bụla mgbe Blossom na-arụ ọrụ? Ọ bụrụ na ị gbara ọsọ zuru ezu, ịkwesịrị ịkwalite ya n'ihi na Blossum bụ iwu. Ọ bụrụ n 'iji obere akpa ego mee ihe, ịchọrọ ụdị nke kwadoro usoro ọhụrụ ahụ.

Kedu ihe kpatara ị ga-eji belata ụgwọ ọrụ nke ngọngọ? N'ihi na ugbu a, blọọgụ na-abịa okpukpu abụọ ngwa ngwa. Ịgba ụgwọ maka nkwụsịtụ ọ bụla na - eme ka netwọk ghara ịmepụta ZEC ugboro abụọ karịa ọsọ.

Kedu mgbe Blossom malitere ọrụ? Na blọọgụ 653,600, na Disemba 11, 2019 UTC.

## Nwalee nghọta gị .

Blossom mere ka Zcash blocks rute ihe dịka okpukpu abụọ. Gini kpatara na nke ahụ ejighi okpukpu abuo ọnụego a na-ekepụta ọhụrụ ZEC?

<details>
<summary>Answer</summary>

N'ihi na Blossom belatara ụgwọ ọrụ a kwụrụ maka otu ngọngọ ma mee ka oge nkewa ahụ site n'ihe dị ka 840,000 ruo 1,680,000. Ugboro abụọ karịa ọtụtụ blocks, onye ọ bụla na-akwụ ọkara ego, gbakwunyere ọnụ ọgụgụ ZEC kwa nkeji oge, ya mere usoro nhazi emission e lere anya na ezigbo oge agbanweghị.
</details>

### Akụnụba

[ZIP 208: Obere Block Target Spacing](https://zips.z.cash/zip-0208)

[ZIP 206: Ịkwado nke Blossom Network Upgrade](https://zips.z.cash/zip-0206)

[Blossom Network Upgrade (Nkezi nke netwọkụ)](https://z.cash/upgrade/blossom/)

[Blossom Upgrade Na-eme Ka Ọsọ, Ịdị Elu, Ike (Electric Coin Company) Dịkwuo Mma](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Lee kwa nke a.

[Nwelite netwọk Zcash](../start-here/network-upgrades)

[Zcash Monetary Policy Ụgwọ ego nke ụlọ akụ na-akwụ ụgwọ.](../start-here/zcash-monetary-policy)

[Gịnị bụ ZEC na Zcash?](../start-here/what-is-zec-and-zcash)

[Nọmba zuru ezu](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Usoro: [Nhazi nke netwọkụ na-emelite.](../start-here/network-upgrades) · Nke gara aga: [Osisi osisi Sapling](../zcash-tech/sapling) · Nke ọzọ: [Osisi nkwụ](../zcash-tech/heartwood)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom bidoro ịrụ ọrụ na mainnet Zcash na block 653,600 (December 11, 2019 UTC).

Ihe ị ga-amụta: otu Blossom siri mee ka blocks Zcash bịarute ihe dị ka ugboro abụọ ọsọ, n’agbanweghị oke ZEC nke network ahụ na-emepụta ka oge na-aga.

Blossom bụ Zcash [network upgrade](../start-here/network-upgrades). E tinyere ya n’ọrụ site na [ZIP 206](https://zips.z.cash/zip-0206), a kọwakwara mgbanwe consensus ya bụ isi na [ZIP 208](https://zips.z.cash/zip-0208). Blossom bụ upgrade maka scaling: o mere ka oge e lekwasịrị anya n’etiti blocks dị mkpụmkpụ site na sekọnd 150 ruo sekọnd 75, ya mere blocks na-abịa ihe dị ka ugboro abụọ karịa. Electric Coin Company duziri ma kwupụta Blossom.

Ihe kpatara nke a ji dị mkpa. Mgbe ị zitere ZEC, ị na-eche ka network kwado ya n’ime block. Ọ bụrụ na blocks adịghị ọsọ, ị ga-eche ogologo oge. Tupu Blossom, a na-atụ anya block ọhụrụ ihe dị ka kwa sekọnd 150. Blossom belatara ebumnuche ahụ ọkara, ruo sekọnd 75, ya mere nkwenye na-abịa ngwa ngwa ma chain nwere ike ibu Azụmahia ndị ọzọ n’otu oge ahụ. O mere nke a n’emepụtaghị ZEC ọzọ ma ọ bụ gbanwee oge halving ndị ga-abịa.

## Nchịkọta dị mkpirikpi (TL;DR)

- Blossom bụ network upgrade nke atọ nke Zcash, nke malitere ọrụ na mainnet block 653,600 (December 11, 2019 UTC). E jiri ZIP 206 wepụta ya, mgbanwe bụ isi ya dịkwa na ZIP 208.
- O mere ka oge ezubere n’etiti block (target block spacing) si na sekọnd 150 daa ruo sekọnd 75. Blocks na-abịa ihe dị ka okpukpu abụọ karịa ka ha na-abịa na mbụ, ya mere nkwenye mbụ (confirmation) na-abịa ngwa ngwa, ọnụ ọgụgụ Azụmahia network nwere ike ịrụ (throughput) amụbaa ihe dị ka okpukpu abụọ.
- Iji mee ka ọnụego e ji ewepụta ego ọhụrụ (issuance) kwụsie ike, o kewara ụgwọ ọrụ e nyere maka otu block ọkara. O mekwara ka oge n’etiti halving abụọ (halving interval) mụbaa okpukpu abụọ, si na blocks 840,000 ruo blocks 1,680,000.
- Ngụkọta ZEC a na-emepụta n’ime otu oge agbanweghị. Oge halving ndị na-abịa ga-eme n’ezie agbanwekwaghị.
- Ọ bụ mgbanwe ọ dị mkpa ka onye ọ bụla mee, nke na-emetụta akụkụ abụọ (bilateral change). Node ọ bụla aghaghị ịkwalite (upgrade) ka ọ nọgide na chain.

## Ihe atụ a na-ahụ anya

Blossom dị ka netwọk ụgbọ ala bọs nke na-amụba ọpụpụ ya okpukpu abụọ. Ugbu a, bọs na-abịa kwa sekọnd 75 kama kwa sekọnd 150, ya mere ị na-eche naanị ọkara oge ahụ (nkwenye ngwa ngwa [faster confirmations]), netwọk ahụ na-ebukwa ndị njem okpukpu abụọ (ike ibu [throughput]). Iji debe ego ụgwọ ọnwa ndị ọkwọ ụgbọ ala otu ka ọ dị, a na-ebelata ụgwọ onye ọkwọ ụgbọ ala ọ bụla na-enweta n’otu njem ka ọ bụrụ ọkara — otu ego ụgwọ ọnwa ahụ a na-emefu n’ozuzu, naanị na a na-akwụ ya n’ọtụtụ njem okpukpu abụọ.

## Blocks ọsọ karịa

Mgbanwe bụ isi nke Blossom dị mfe. Oghere oge ezubere n’etiti block [target block spacing] nke Zcash, ya bụ oge network na-achọ ka ọ dị n’etiti otu block na nke na-esote, si na sekọnd 150 daa ruo sekọnd 75 ([ZIP 208](https://zips.z.cash/zip-0208)). A na-achọta blocks site n’ọrụ proof [proof of work], ya mere ezigbo oghere oge dị n’etiti ha na-adịgasị iche, mana network ugbu a na-achọ block ihe dị ka kwa sekọnd 75 kama kwa sekọnd 150.

Ihe abụọ na-esite na nke a:

1. Blocks na-abịa ihe dị ka ugboro abụọ karịa, ya mere chain nwere ike ibu Azụmahia ihe dị ka okpukpu abụọ n’otu nkeji oge.
2. Azụmahia gị na-enweta nkwenye mbụ ya ngwa ngwa, n’ihi na ị naghị eche ogologo oge maka block na-esote.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Idebe mwepụta n’otu ọkwa

Blocks ọsọ karịa na-ebute ajụjụ. Ọ bụrụ na Zcash mepụtara blocks okpukpu abụọ karịa, block ọ bụla akwụkwaa otu ụgwọ ọrụ block [block reward], network ahụ ga-emepụta ZEC ọsọ okpukpu abụọ. Blossom na-egbochi nke ahụ. Ọ kewara ụgwọ a na-akwụ kwa block ọkara, ma mụbaa etiti halving ụgwọ ọrụ block [halving interval] site na 840,000 ruo 1,680,000 blocks ([ZIP 208](https://zips.z.cash/zip-0208)). Blocks okpukpu abụọ karịa, nke ọ bụla na-akwụ ọkara, na-eduga n’otu oke ZEC a na-emepụta n’otu nkeji oge. Usoro ngụkọta mwepụta na oge halving ndị ga-adị n’ọdịnihu, mgbe a tụrụ ha n’oge n’ezie, agbanweghị.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Upgrade amanyere amanye

Blossom bụ mgbanwe consensus abụọ na ibe ya [bilateral consensus change], nke pụtara na node ọ bụla ga-eme upgrade iji nọgide na-eso chain ([ZIP 206](https://zips.z.cash/zip-0206)). Ọ bụghị nhọrọ nye onye na-arụ node chọrọ ịnọgide na-adị na sync. Blossom malitere ịrụ ọrụ na mainnet block 653,600 ma nwee njirimara alaka consensus [consensus branch id] nke ya, akara na-enyere nodes na Azụmahia aka ikwenye na ha na-eso iwu Blossom. Upgrade ahụ jiri usoro network upgrade ọkọlọtọ nke Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Ebe Blossom dabara

Blossom bụ network upgrade nke atọ nke Zcash. Ọ bịara mgbe Overwinter na Sapling gasịrị, ọ bịakwara tupu Heartwood na Canopy. N’adịghị ka Sapling, nke hazigharịrị cryptography nke e chebere echebe [shielded] nke Zcash, Blossom lekwasịrị anya na scaling na ọsọ. Ọrụ ya bụ isi bụ oge block, ọ bụghị atụmatụ Nzuzo ọhụrụ.

## Ndudue Ndị A Na-emekarị

- **Iche na blocks ndị na-abịa ngwa ngwa pụtara ZEC karịa.** Ibelata ụgwọ ọrụ nke block ọ bụla ọkara mgbe a na-eme ka ọnụọgụ blocks okpukpu abụọ na-eme ka mwepụta ego (emission) bụrụ otu ihe ahụ kpọmkwem n’oge ọ bụla.
- **Iche na halvings na-eme ngwa ngwa n’oge n’ezie.** Oge dị n’etiti halving ọ bụla mụbara okpukpu abụọ site na blocks 840,000 ruo 1,680,000, ya mere ụbọchị halving n’oge n’ezie agbanweghị.
- **Ịgụ "sekọnd 75" dị ka nkwa.** Ọ bụ ebumnuche proof-of-work; ezigbo oghere oge n’etiti blocks na-adịgasị iche gburugburu ya.
- **Iwere Blossom dị ka nkwalite Nzuzo (privacy).** Ọrụ ya bụ oge blocks na scaling — n’adịghị ka Sapling, ọ gbanweghị usoro nzuzo cryptography ọ bụla.
- **Iche na ndị na-arụ node nwere ike ịhapụ ya.** Blossom bụ mgbanwe consensus nke akụkụ abụọ; node a na-akwalitebeghị na-ekewapụ onwe ya na network.

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n’asụsụ dị mfe |
|---|---|
| Block target spacing | Oge network na-achọ ka ọ dị n’etiti otu block na nke na-esote |
| Block reward | ZEC ọhụrụ e mepụtara ma kwụọ mgbe a na-agwụpụta block ọ bụla |
| Halving interval | Ọnụọgụ blocks na-agafe n’etiti halving ọ bụla nke ụgwọ ọrụ block |
| Consensus branch id | Akara na-egosi usoro iwu network nke node ma ọ bụ Azụmahia na-eso |
| Bilateral consensus change | Mgbanwe iwu nke node ọ bụla ga-anabata iji nọrọ na network |
| Network upgrade (NU) | Mgbanwe a haziri ahazi n’iwu consensus nke Zcash, nke na-amalite ịrụ ọrụ n’ogo block e debere |

## FAQ

Blossom ọ na-agbanwe oke ZEC dị ma ọ bụ mgbe halving na-eme? Mba. E kewara ụgwọ ọrụ kwa block ọkara ma mụbaa etiti halving okpukpu abụọ n’otu oge, ya mere oke ZEC a na-emepụta n’otu nkeji oge, na oge halving ndị ga-adị n’ọdịnihu, nọgidere otu.

Blossom ọ na-agbanwe ZEC m ma ọ bụ Nzuzo [privacy] m? Mba. Blossom gbanwere oge block [block] na mgbakọ ụgwọ ọrụ. Ọ metụghị nguzozi gị ma ọ bụ Azụmahia [transaction] nke e chebere echebe [shielded] gị.

Gịnị ka sekọnd 75 pụtara n’ezie? Ọ bụ ebumnuche, ọ bụghị nkwa. A na-achọta blocks site n’ọrụ proof, ya mere ezigbo oghere oge n’etiti blocks na-adịgasị iche. Network na-achọ otu ihe dị ka kwa sekọnd 75 kama kwa sekọnd 150.

Ọ dị m mkpa ime ihe ọ bụla mgbe Blossom malitere ịrụ ọrụ? Ọ bụrụ na ị na-arụ full node, ị ga-eme ya upgrade, n’ihi na Blossom bụ amanyere amanye. Ọ bụrụ na ị ji e-akpa ego, ị chọrọ ụdị na-akwado iwu ọhụrụ ahụ.

Gịnị mere e ji kee ụgwọ ọrụ block ọkara? N’ihi na blocks ugbu a na-abịa ọsọ okpukpu abụọ. Ikewa ụgwọ ọrụ kwa block ọkara na-egbochi network imepụta ZEC ọsọ okpukpu abụọ.

Kedu mgbe Blossom malitere ịrụ ọrụ? Na mainnet block 653,600, na December 11, 2019 UTC.

## Nwale nghọta gị

Blossom mere ka blocks Zcash bịarute ihe dị ka ugboro abụọ karịa. Gịnị mere nke ahụ ejighị mee ka ọnụego e si emepụta ZEC ọhụrụ bụrụ okpukpu abụọ?

<details>
<summary>Azịza</summary>

N’ihi na Blossom kekwara ụgwọ a na-akwụ kwa block ọkara ma mụbaa etiti halving site na blocks 840,000 ruo 1,680,000. Blocks okpukpu abụọ karịa, nke ọ bụla na-akwụ ọkara, na-agbakọta ruo n’otu oke ZEC n’otu nkeji oge, ya mere usoro mwepụta a tụrụ n’oge n’ezie agbanweghị.
</details>

### Akụrụngwa

[ZIP 208: Oghere Oge Ebumnuche Block Dị Mkpirikpi](https://zips.z.cash/zip-0208)

[ZIP 206: Ntinye n’ọrụ nke Network Upgrade Blossom](https://zips.z.cash/zip-0206)

[Blossom Network Upgrade](https://z.cash/upgrade/blossom/)

[Blossom Upgrade Na-eme Ka Ọsọ, Scaling, na Ikike Ka Mma (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Hụkwa

[Zcash Network Upgrades](../start-here/network-upgrades)

[Zcash Iwu Ego](../start-here/zcash-monetary-policy)

[Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash)

[Full Nodes](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## Peeji Ndị Metụtara Ya

- [Sapling](./Sapling.md) — network upgrade gara aga (cryptography, ọ bụghị oge)
- [Heartwood](./Heartwood.md) — network upgrade na-esote n'usoro ahụ
- [Full Nodes](./Full_Nodes.md) — ihe ịgba ọsọ node site na network upgrade ndị a manyere iwu gụnyere
- [Ndepụta Network Upgrades](../start-here/network-upgrades) — usoro oge zuru ezu nke network upgrade niile

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke gara aga: [Sapling](../zcash-tech/sapling) · Nke na-esote: [Heartwood](../zcash-tech/heartwood)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## Na nkenke

Halo bụ usoro proof zero-knowledge na-enweghị ntụkwasị obi, nke na-emeghachi onwe ya, nke Sean Bowe chọpụtara na Electric Coin Co. Ọ na-ewepụ mkpa trusted setup ma mee ka nchikọta proof na-emeghachi onwe ya bụrụ ihe bara uru, nke bụ ntọala nke atụmatụ scaling na nchekwa ugbu a nke Zcash.

- **Ihe ọ bụ:** ihe owuwu zk-SNARK nwere recursion dị irè na-enweghị emume trusted setup.
- **Ihe mere o ji dị mkpa:** pool nke e chebere echebe Orchard nke Zcash, nke e mere ka ọ rụọ ọrụ na NU5 n’afọ 2022, na-arụ ọrụ na Halo 2 — mmejuputa nyocha a maka iji n’ezi ụwa.
- **Njirimara dị mkpa:** enweghị “toxic waste” sitere n’emume nhazi, yana proof ndị nwere ike ịgba akaebe maka proof ndị ọzọ na-enweghị oke a pụrụ itinye n’ọrụ.
- **Ikikere:** Halo 2 bụ open source n’okpuru [MIT na Apache 2.0](https://github.com/zcash/halo2#readme), ya mere onye ọ bụla nọ n’usoro gburugburu nwere ike iwulite n’elu ya.

---

## Nkọwa Isi

Halo bụ usoro proof zero-knowledge na-enweghị ntụkwasị obi, nke na-emeghachi onwe ya, nke Sean Bowe chọpụtara na Electric Coin Co. Ọ na-ewepụ trusted setup ma kwe ka blockchain Zcash nweta scaling ka ukwuu. Halo bụ usoro proof zero-knowledge mbụ nke dị irè ma na-emeghachi onwe ya — nke a na-elekarị anya dịka nnukwu ọganihu sayensị.

![halo](/content-images/_unavailable.svg "halo")

### Akụkụ abụọ ahụ

- **Atụmatụ Polynomial Commitment dị mkpirikpi.** Ọ na-enye onye na-eme commitment ohere ime commitment na polynomial site n’ahịrịokwu dị mkpirikpi nke onye na-enyocha nwere ike iji kwado nlele a kwupụtara maka polynomial e mere commitment na ya.
- **Polynomial Interactive Oracle Proof.** Onye na-enyocha na-arịọ onye na-enye proof (algọridim) ka o mepee commitment niile n’ebe ọ họọrọ, site n’iji atụmatụ polynomial commitment, wee nyochaa na njirimara ahụ bụ eziokwu n’etiti ha.

### Enweghị trusted setup

Ụfọdụ nhazi zk-SNARK, dịka Groth16, chọrọ trusted setup iji mepụta parampita ọha ha, nke a na-akpọkarị ahịrịokwu ntụaka nkịtị (common reference string, CRS). A na-ekekọrịta CRS ahụ na ndị na-enye proof na ndị na-enyocha proof; ọ bụghị ihe nzuzo a ga-ebibi. A ghaghị ịtụfu ihe etiti nzuzo (“toxic waste”) sitere na nhazi dị otú ahụ. Mgbakọ nchekwa nke ọtụtụ ndị sonyere nwere ike ikesa ntụkwasị obi ahụ: emume ahụ dị nchebe ma ọ bụrụ na opekata mpe otu onye sonyere na-agbaso protocol ma bibie onyinye nzuzo ya. Lee ECC [nkọwa banyere parampita ọha na toxic waste](https://zodl.com/snark-parameters/).

Pool nke e chebere echebe Sprout na Sapling mbụ nke Zcash jiri usoro proving trusted setup, BCTV14 na Groth16 n'otu n'otu. Parameeta ọha ha [public parameters] ka dị maka ịmepụta proof na nyocha. Ihe na-echegbu bụ ma echekwala ihe nzuzo e ji hazie usoro ahụ, nke nwere ike ikwe ka e mepụta proof ụgha; ibipụta CRS n'onwe ya bụ ihe a na-atụ anya ya, ọ naghị ekpughe ihe nzuzo ahụ.

Halo na-ejikọta nhazi proof na-alaghachi n’onwe ya [recursive proof composition] na atụmatụ commitment polynomial [polynomial commitment scheme] dabere na arụmụka inner product. Oke ọhaneze ya [public parameters] anaghị achọ emume trusted setup ma ọ bụ mbibi trapdoor nzuzo nke nhazi mbụ [secret setup trapdoor]. Akwụkwọ [Halo 2 na-akọwa oke group ndị a nke ọhaneze](https://zcash.github.io/halo2/background/pc-ipa.html#setup). Nke a dị iche na ime ka structured reference string nke emume mepụtara nwee ike imelite.

Iwepụ ihe a chọrọ maka nhazi a na-ezere ịdabere na mbibi nke ihe nzuzo e ji eme emume maka proof Halo. Ọ naghị egosi na emume Sprout ma ọ bụ Sapling gara aga enweghị mmebi, ma ọ bụ kwado na mgbanwe protocol niile e mere mgbe e mesịrị dị nchebe. Proof recursive na-agba akaebe banyere mgbako ndị etinyere na sekit ha, n'okpuru echiche nke usoro proof. Sekit na mmejuputa ziri ezi ka dị mkpa; nkọwa mbugharị [Halo 2 nke ECC](https://zodl.com/technical-explainer-halo-on-zcash/) na-ekwu kpọmkwem maka ihe ize ndụ nke bugs ọhụrụ ma ọ bụ ntụpọ dị na nhazi.

[Sean Bowe's nkọwa na Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Ihe Anya / Ntụnyere

### Chain onye notary

Chee maka zk-SNARK nkịtị dị ka akwụkwọ notari kwadoro: otu stampụ, otu nyocha, agwụla. Ugbu a chee na ị chọrọ igosi na mkpokọta akwụkwọ puku iri bụ nke eziokwu. Enweghị ntughari [recursion], onye na-enyocha ga-enyocha stampụ ọ bụla.

Halo na-atụgharị akwụkwọ ọ bụla a nyochara ka ọ bụrụ stampụ n’akwụkwọ *na-esote*, ruo mgbe ikpo ahụ dum gbakọrọ bụrụ otu akwụkwọ nwere otu stampụ. Ịlele akwụkwọ ikpeazụ zuru iji tụkwasị chain ahụ dum obi — ma nke dị oke mkpa, notary Halo (usoro inye proof) na-emepụta stampụ nke ya n’enweghị mkpa ka ikike mpụta hazie akara ya.

### Ihe mere iwepụ trusted setup ji dị mkpa

N’usoro trusted setup ochie, “akara” ọhaneze ahụ (CRS) sitere n’emume. Ndị sonyere ga-ebibi ihe nzuzo ha dị n’etiti ebe ha na-edobe paramita ọhaneze ka ha dị. Halo na-ezere emume ahụ na trapdoor nhazi nzuzo ya. Nke a anaghị ewepụ mkpa ọ dị ichekwa Igodo ego ndị ọrụ ma ọ bụ ịlele echiche na mmejuputa usoro proof.

---

## Nnyocha Miri Emi

### Proof na-emeghachi onwe ya

Nchịkọta proof na-emeghachi onwe ya na-enye otu proof ohere ịgba akaebe maka izi ezi nke proof ndị ọzọ na-enweghị oke a pụrụ itinye n’ọrụ, na-akpakọ nnukwu mgbakọ na mwepụ (na ozi). Nke a bụ akụkụ dị mkpa maka scaling, n’ihi na ọ na-enye netwọk ohere ịgbasa n’akụkụ ebe obere ìgwè ndị sonyere ka nwere ike ịtụkwasị iguzosi ike n’ezi ihe nke akụkụ netwọk fọdụrụ obi.

Tupu Halo, ime nchịkọta proof na-emeghachi onwe ya chọrọ nnukwu ego mgbakọ na mwepụ na trusted setup. Otu n’ime nchọpụta ndị bụ isi bụ usoro akpọrọ **nested amortization**: nchịkọta recursive na-eji atụmatụ polynomial commitment dabere na arụmụka inner product, nke na-eme ka arụmọrụ kawanye mma nke ukwuu ma na-ezere trusted setup.

Akwụkwọ [Halo](https://eprint.iacr.org/2019/1021.pdf) kọwara atụmatụ polynomial commitment a n’uju ma chọpụta na usoro nchịkọta ọhụrụ dị n’ime ya. Usoro a na-enye ohere ka a nyochaa ọnụ ọgụgụ buru ibu nke proof e mepụtara n’otu n’otu fọrọ nke nta ka ọ dị ngwa dịka inyocha otu proof. N’onwe ya, nke ahụ enyelarị ụzọ ka mma karịa zk-SNARKs mbụ e ji na Zcash.

### Halo 2

Halo 2 bụ mmejuputa zk-SNARK nwere nnukwu arụmọrụ edere na Rust, nke na-ewepụ mkpa trusted setup ma na-akwado ụzọ maka scaling na Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Ọ gụnyere mmebawanye nke ụzọ a kpọrọ **atụmatụ nchịkọta**. Nhazi iwu a na-ekpughe ka nested amortization si arụ ọrụ n’ezie: site n’ịgbakwunye proof na ihe a kpọrọ **accumulator**, ebe proof ọ bụla na-atụgharị uche banyere ọnọdụ accumulator gara aga, a pụrụ ịlele proof niile gara aga (site na induction) naanị site n’ịlele ọnọdụ accumulator ugbu a.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

N’otu oge ahụ, ọtụtụ otu ndị ọzọ na-achọpụtakwa Polynomial IOP ndị dị irè karịa Sonic (e ji na Halo 1), dịka Marlin. Nke kasị arụ ọrụ nke ọma n’ime protocol ndị a bụ PLONK, nke na-enye mgbanwe dị ukwuu n’ịmepụta mmejuputa dị irè dabere n’ọrụ chọrọ kpọmkwem ma na-enye oge onye na-enye proof ka mma ugboro 5 karịa Sonic.

[Nchịkọta nke PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo n’usoro gburugburu sara mbara

Electric Coin Company batara na nkwekọrịta na Protocol Labs, Filecoin Foundation, na Ethereum Foundation iji nyochaa R&D Halo, gụnyere otu a pụrụ isi jiri teknụzụ ahụ na netwọk nke ọ bụla. Ebumnuche nkwekọrịta ahụ bụ inye scaling, interoperability, na Nzuzo ka mma n’usoro gburugburu yana maka Web 3.0.

Ọzọkwa, Halo 2 nọ n’okpuru [MIT na Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme), nke pụtara na onye ọ bụla nọ n’usoro gburugburu nwere ike iwulite site n’usoro inye proof ahụ.

**Filecoin.** Kemgbe e tinyere ya n’ọrụ, ewerela ọbá akwụkwọ halo2 n’ọrụ dịka zkEVM, ma enwere ike ijikọta Halo 2 na usoro proof maka Filecoin Virtual Machine. Filecoin chọrọ ọtụtụ proof nke spacetime na proof nke replication dị ọnụ; Halo 2 dị mkpa n’ịkpakọ ojiji oghere na ime ka netwọk nwee scaling ka mma. [Filecoin vidio Foundation na Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Ọ ga-abakwara usoro gburugburu abụọ ahụ uru ma ọ bụrụ na e nwere ike iji ZEC kwụọ ụgwọ nchekwa Filecoin, na-enye otu Nzuzo ahụ maka ịzụta nchekwa dị na mbufe nke e chebere echebe Zcash — gụnyere izo faịlụ n’ime nchekwa Filecoin na ịkwado ndị ahịa mkpanaka na-etinye media na memo e zoro ezo Zcash. [ECC × Filecoin blọọgụ](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** A na-emepụta proof Halo 2 maka Verifiable Delay Function (VDF) dị irè. VDF bụ cryptographic primitive nwere ọtụtụ Ojiji nwere ike ịdị, gụnyere randomness maka smart contract n’ozuzu ya na ịhọpụta onye ndu na Proof of Stake. ECC, Filecoin Foundation, Protocol Labs, na Ethereum Foundation na-arụkọkwa ọrụ na [SupraNational](https://www.supranational.net/), onye na-ere ihe pụrụ iche na cryptography ngwaike kwalitere, maka mmepe GPU na ASIC nke VDF nwere ike ime. Otu [Privacy and Scaling Explorations group](https://appliedzkp.org/) na-enyocha ụzọ ndị ọzọ proof Halo 2 nwere ike isi meziwanye Nzuzo na scaling maka Ethereum.

### Ọrụ ndị ọzọ na-eji Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — protocol Mgbawe atomic multichain na-echekwa Nzuzo
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — L2 zkRollup na Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — blockchain zkEVM L1 nkeonwe
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — L2 zkRollup na Ethereum

---

## Mmetụta Bara Uru

**Maka Zcash n’onwe ya**

- Pool nke e chebere echebe Orchard, nke e mere ka ọ rụọ ọrụ na NU5, bụ mmejuputa usoro proof ọhụrụ a na netwọk Zcash. Otu atụmatụ turnstile e ji n’etiti Sprout na Sapling na-eche ya nche, ebumnuche ya bụ iji nwayọọ nwayọọ kwụsị pool nke e chebere echebe ochie.
- Mgbe NU5 (etiti afọ 2022), ijikọta proof recursive ghọrọ ihe kwe omume, ọtụtụ nkwalite Nzuzo sokwa ya — nke kacha pụta ìhè bụ iwebata “Actions” iji dochie inputs/outputs, nke na-ebelata ọnụọgụ metadata Azụmahia.
- Iwepụ trusted setup na-ewepụ ihe ize ndụ usoro zuru ezu nke a ga-achọ imeghachi maka mmelite protocol ọ bụla dị nnukwu.

**Maka ndị ji ya na ndị na-arụ ya**

- Nchịkọta proof recursive nwere ike ịkpakọ mgbakọ na mwepụ na-enweghị oke, mepụta usoro kesara kesara a pụrụ inyocha, ma melite ike Layer 1 maka ndị na-arụ full node — ihe dị mkpa maka mgbatị dịka Zcash Shielded Assets na atụmatụ ogologo oge nke Zcash.

---

## Mmejọ A Na-emekarị

| Echiche a na-enwekarị | Ihe dị n’eziokwu |
| --- | --- |
| “Halo bụ mmelite n’ọdịnihu Zcash na-eche.” | Orchard, nke dị ndụ na mainnet kemgbe NU5 (2022), na-agba ọsọ ugbu a na Halo 2. |
| “Enweghị trusted setup pụtara na enweghị parampita ọ bụla.” | Halo ka na-eji parampita ọha. Ha anaghị achọ emume ndị sonyere ga-atụkwasị obi ka ha bibie ihe nzuzo e ji hazie ya. |
| “Halo 2 na akwụkwọ Halo bụ otu ihe.” | Akwụkwọ [](https://eprint.iacr.org/2019/1021.pdf) na-akọwa atụmatụ polynomial commitment na nested amortization; Halo 2 bụ mmejuputa Rust maka iji n’ezi ụwa, nke nwere atụmatụ nchịkọta na PLONKish arithmetisation. |
| “Recursion na-enyere naanị scaling nke nyocha block aka.” | Recursion na-akpakọkwa mgbakọ n’ogo ngwa — lee proof spacetime/replication nke Filecoin na ọrụ VDF maka Ethereum. |

---

## Peeji Ndị Metụtara Ya

- [zk-SNARKs](/zcash-tech/zk-snarks) — ngalaba teknụzụ n’ozuzu ya nke Halo so na ya
- [Halo (akwụkwọ nyocha)](https://eprint.iacr.org/2019/1021.pdf) — mbipụta mbụ
- [Ironwood](/zcash-tech/ironwood) na [The Turnstile](/zcash-tech/the-turnstile) — ka pool nke e chebere echebe si akwaga mgbe ndị ochie na-akwụsị
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — mgbatị na-erite uru site na proof recursive
- [Zebra Full Node](/zcash-tech/zebra-full-node) — mmejuputa node nke na-akwado proof na chain

## Ịmụtakwu Ihe

- [Okwu mmalite gbasara ZKP na Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 na Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blọọgụ nkọwa teknụzụ](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Akwụkwọ Nkụzi**

- [Halo 2 akụrụngwa](https://github.com/mhchia/awesome-halo2)
- [Halo 2 docs](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)

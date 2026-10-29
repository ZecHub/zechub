<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo bụ sistemụ enweghị ntụkwasị obi, nke na-egosi ihe ọmụma efu (ZKP) nke Sean Bowe na Electric Coin Co. chọtara. Ọ na-ewepụ mkpa maka ntọala a pụrụ ịtụkwasị obi ma na-eme ka nhazi ihe akaebe recursive bara uru, nke bụ ntọala nke nhazi Zcash's ugbu a na atụmatụ nchekwa.

- **Ihe ọ bụ:** ihe owuwu zk-SNARK nwere nlọghachi dị irè na enweghị emume ntọala a pụrụ ịtụkwasị obi.
- **Ihe mere o ji dị mkpa:** Ọdọ mmiri Zcash's Orchard nke nwere ihe nchebe, nke ejiri NU5 rụọ ọrụ na 2022, na-agba ọsọ na Halo 2 — mmejuputa mmepụta nke nyocha a.
- **Ihe dị mkpa:** enweghị "ihe mkpofu na-egbu egbu" sitere na emume ntọala, yana ihe akaebe ndị nwere ike ịgba akaebe na ihe akaebe ndị ọzọ na-akparaghị ókè.
- **Ikike ikike:** Halo 2 bụ isi mmalite mepere emepe n'okpuru [MIT na Apache 2.0](https://github.com/zcash/halo2#readme), yabụ onye ọ bụla nọ na gburugburu ebe obibi nwere ike iwulite ya.

---

## Nkọwa Isi

Halo bụ sistemụ enweghị ntụkwasị obi, nke na-egosi enweghị ihe ọmụma na-emegharị emegharị nke Sean Bowe na Electric Coin Co. chọpụtara. Ọ na-ewepụ ntọala a tụkwasịrị obi ma na-enye ohere ka ukwuu maka Zcash blockchain. Halo bụ sistemụ mbụ na-egosi enweghị ihe ọmụma nke dị irè ma na-emegharị emegharị - nke a na-ewere dị ka ihe ọhụrụ sayensị.

![halo](/content-images/_unavailable.svg "halo")

### Akụkụ abụọ ahụ

- **Atụmatụ Nkwa Polynomial Succinct.** Na-enye onye kwere nkwa itinye aka na polynomial nwere obere eriri nke onye nyocha nwere ike iji kwado nyocha e kwuru na polynomial ahụ ekwenyela.
- **Polynomial Interactive Oracle Proof.** Onye nyocha ahụ na-arịọ onye nyocha (algọridim) ka o mepee nkwa niile n'ebe ọ họọrọ, site na iji atụmatụ nkwa polynomial, ma lelee ma njirimara ahụ bụ eziokwu n'etiti ha.

### Enweghị ntọala a tụkwasịrị obi

zk-SNARKs na-adabere na eriri ntụaka nkịtị (CRS) dị ka paramita ọha maka igosi na inyocha. A ghaghị imepụta CRS a tupu oge eruo site n'aka ndị a tụkwasịrị obi. Ruo n'oge na-adịbeghị anya, mgbakọta ọtụtụ ndị ọzọ dị nchebe (MPC) - dịka ndị netwọk Aztec na Zcash na-eme - dị mkpa iji belata ihe egwu dị na ya n'oge a [emume ntọala a tụkwasịrị obi](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Ọdọ mmiri ndị e ji Sprout na Sapling kpuchie Zcash's ji usoro BCTV14 na Groth16 zk mee ihe. Ọ bụ ezie na ha dị nchebe, ha nwere oke: ha enweghị ike ịgbasa n'ihi na ejiri ha mee ihe otu ugboro, "ihe mkpofu na-egbu egbu" (ihe fọdụrụ nke ihe e ji ezochi ihe n'oge emume mmalite) nwere ike ịnọgide, e nwekwara ihe ntụkwasị obi (ọ bụ ezie na ọ bụ obere oge) n'ịhụ na emume ahụ dị mma.

Halo na-ewepụ ntọala a tụkwasịrị obi site n'ịkọwa ọtụtụ ihe isi ike ọnụ n'ime usoro nke elliptic curves, ka e wee nwee ike iji ihe akaebe mgbakọ na mwepụ tụgharịa uche banyere onwe ha nke ọma (amortization nke e tinyere n'ime ya). Mmetụta dị n'akụkụ bụ na eriri ntụaka ahaziri ahazi (mpụta nke emume) na-aghọ ihe a pụrụ imelite, na-eme ka ngwa dị ka nkwekọrịta smart rụọ ọrụ.

Halo na-enye ndị ọrụ nkwa abụọ dị mkpa gbasara nchekwa nke nnukwu sistemụ ihe akaebe efu. Nke mbụ, ọ na-enye ndị ọrụ ohere igosi na ọ dịghị onye ọ bụla metụtara emume mmalite okike emepụtala ụzọ nzuzo iji mee azụmahịa aghụghọ. Nke abụọ, ọ na-enye ndị ọrụ ohere igosi na sistemụ ahụ anọgidewo na-enwe nchebe ka oge na-aga, ọbụlagodi na emelitere ya na mgbanwe.

[Onye na-akọwa Sean Bowe's na Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Anya / Ihe atụ

### Ụlọ ọrụ notary

Chee echiche banyere zk-SNARK nkịtị dị ka akwụkwọ notaried: otu stampụ, otu nkwenye, emechara. Ugbu a chee na ịchọrọ igosi na mkpokọta puku akwụkwọ iri bụ ezigbo ya. Na-enweghị recursion, onye na-enyocha ga-enyocha stampụ ọ bụla.

Halo na-agbanwe akwụkwọ ọ bụla enyochara ka ọ bụrụ stampụ na akwụkwọ *na-esote*, ruo mgbe mkpokọta ahụ dum ga-adaba n'otu akwụkwọ nwere otu stampụ. Ịlele akwụkwọ ikpeazụ zuru ezu iji tụkwasị usoro a niile obi - nke kachasị mkpa bụ na onye na-ede akwụkwọ Halo's (usoro ihe akaebe) na-emepụta stampụ nke ya n'achọghị ikike mpụga iji tinye akara ya.

### Ihe kpatara iwepụ ntọala a tụkwasịrị obi ji dị mkpa

N'ime sistemụ ochie, "akara" (CRS) sitere na emume. Ndị sonyere ga-ebibi ihe dị n'etiti, onye ọ bụla ga-atụkwasịkwa obi na ha mere ya. A na-emepụta akara Halo's site na mgbakọ na mwepụ naanị: ọ dịghị ihe a ga-ebibi, ọ dịghị ihe a ga-awụpụ, ọ dịghịkwa emume a ga-atụkwasị obi.

---

## Mmiri miri emi

### Ihe akaebe na-emegharị emegharị

Nhazi ihe akaebe na-emegharị emegharị na-enye otu ihe akaebe ohere ịgba akaebe na izi ezi nke ihe akaebe ndị ọzọ na-akparaghị ókè, na-agbakọta nnukwu ọnụọgụgụ mgbakọ na mwepụ (na ozi). Nke a bụ ihe dị mkpa maka nhazi, n'ihi na ọ na-enye ohere ka netwọk ahụ gbasaa n'usoro kwụ ọtọ ebe obere ndị sonyere ka nwere ike ịtụkwasị obi na iguzosi ike n'ezi ihe nke netwọk ndị ọzọ.

Tupu Halo, inweta ihe mejupụtara ihe akaebe ugboro ugboro chọrọ nnukwu mmefu mgbakọ na mwepụ na ntọala a pụrụ ịtụkwasị obi. Otu n'ime ihe nchọpụta bụ isi bụ usoro a kpọrọ **amortization nke a na-akpọ nested**: ihe mejupụtara ugboro ugboro site na iji atụmatụ nkwa polynomial dabere na arụmụka ngwaahịa dị n'ime, na-eme ka arụmọrụ ka mma nke ukwuu ma na-ezere ntọala a pụrụ ịtụkwasị obi.

Ihe [Akwụkwọ Halo](https://eprint.iacr.org/2019/1021.pdf) kọwara nke ọma atụmatụ ntinye aka nke polynomial a ma chọpụta na usoro nchịkọta ọhụrụ dị n'ime ya. Usoro a na-enye ohere ka a nyochaa ọtụtụ ihe akaebe e kere n'onwe ha ngwa ngwa dịka ịlele otu ihe akaebe. N'onwe ya, nke ahụ enyelarị ụzọ ka mma karịa zk-SNARKs mbụ ejiri na Zcash.

### Halo 2

Halo 2 bụ mmejuputa zk-SNARK dị elu nke e dere na Rust nke na-ewepụ mkpa maka ntọala a pụrụ ịtụkwasị obi mgbe ọ na-edozi usoro maka nhazi na Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Ọ gụnyere nchịkọta nke ụzọ a na-akpọ **nhazi mkpokọta**. Nhazi a na-ekpughe otu amortization nke e ji aka mee si arụ ọrụ n'ezie: site na itinye ihe akaebe na ihe a na-akpọ **nhazi mkpokọta**, ebe ihe akaebe ọ bụla gbasara ọnọdụ gara aga nke nhazi mkpokọta, enwere ike ịlele ihe akaebe niile gara aga (site na induction) site na ịlele ọnọdụ nhazi mkpokọta ugbu a.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

N'otu aka ahụ, ọtụtụ ndị otu ndị ọzọ na-achọpụta Polynomial IOPs nke ọma karịa Sonic (eji na Halo 1), dịka Marlin. Nke kachasị dị irè n'ime usoro ndị a bụ PLONK, nke na-enye nnukwu mgbanwe n'ịmepụta mmejuputa dị irè dabere na mkpa ngwa ma na-enye oge nnwale 5 × ka mma karịa Sonic.

[Isi ihe gbasara PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo na gburugburu ebe obibi sara mbara

Electric Coin Company tinyere aka na nkwekọrịta na Protocol Labs, Filecoin Foundation, na Ethereum Foundation iji nyochaa nyocha na mmepe Halo, gụnyere otu esi eji teknụzụ ahụ na netwọk ha. Nkwekọrịta a na-achọ inye nhazi ka mma, njikọta, na nzuzo n'ofe gburugburu ebe obibi na maka Web 3.0.

Ọzọkwa, Halo 2 dị n'okpuru egwuregwu ahụ [Akwụkwọ ikike MIT na Apache 2.0 mepere emepe](https://github.com/zcash/halo2#readme), nke pụtara na onye ọ bụla nọ na gburugburu ebe obibi nwere ike iwulite site na usoro nnwale.

**Filecoin.** Kemgbe e tinyere ya n'ọrụ, a na-anabata ọbá akwụkwọ halo2 n'ọrụ dịka zkEVM, enwere ike itinye Halo 2 n'ime sistemụ ihe akaebe maka Filecoin Virtual Machine. Filecoin chọrọ ọtụtụ ihe akaebe dị oke ọnụ nke oge oghere na ihe akaebe nke mmegharị; Halo 2 dị mkpa n'ịkpakọ ojiji oghere na ịbawanye netwọk ahụ nke ọma. [Vidiyo Filecoin Foundation na Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)Ọ ga-abarakwa gburugburu ebe obibi abụọ ahụ uru ma ọ bụrụ na enwere ike ịkwụ ụgwọ nchekwa Filecoin na ZEC, na-enye otu nzuzo ahụ maka ịzụrụ nchekwa dị na mbufe Zcash - gụnyere izochi faịlụ na nchekwa Filecoin na ịkwado ndị ahịa mkpanaka nke na-etinye mgbasa ozi na memo ezoro ezo nke Zcash. [ECC × Blọgụ blọgụ Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** A na-emepụta ihe akaebe Halo 2 maka ọrụ Verifiable Delay Function (VDF) dị irè. VDF bụ usoro e ji ede ihe nke nwere ọtụtụ ihe ndị nwere ike iji, gụnyere ihe ndị a na-eme n'ozuzu maka nkwekọrịta smart na ntuli aka onye isi na Proof of Stake. ECC, Filecoin Foundation, Protocol Labs, na Ethereum Foundation na-arụkọkwa ọrụ na [SupraNational](https://www.supranational.net/), onye na-ere ahịa nke bụ ọkachamara na cryptography ngwa ngwa nke ngwaike, maka mmepe GPU na ASIC nke VDF [Otu Nnyocha Nzuzo na Ịtụle Ọnụọgụ](https://appliedzkp.org/) na-eme nnyocha maka ụzọ ndị ọzọ Halo 2 proofs nwere ike isi melite nzuzo na nhazi maka Ethereum.

### Ọrụ ndị ọzọ na-eji Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) - usoro mgbanwe atọm nke multichain na-echekwa nzuzo
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — L2 zkRollup na Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — blockchain L1 zkEVM nkeonwe
- [Pịgharịa](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) - ihe L2 zkRollup na Ethereum

---

## Mmetụta Bara Uru

**Maka Zcash n'onwe ya**

- Ọdọ mmiri a na-echebe site Orchard, nke e ji NU5, bụ mmejuputa usoro ihe akaebe ọhụrụ a na netwọk Zcash. A na-echekwa ya site na otu imewe turnstile e ji mee ihe n'etiti Sprout na Sapling, iji mee ka ọdọ mmiri ndị ochie ahụ dị nchebe kwụsị nwayọọ nwayọọ.
- Mgbe NU5 (etiti afọ 2022) gasịrị, njikọta nke ihe akaebe na-emegharị emegharị malitere, ọtụtụ mmezi nzuzo sokwa ya — nke kachasị mkpa bụ iwebata 'Actions' dochie ntinye/mpụta, nke na-ebelata ọnụọgụ metadata azụmahịa.
- Iwepụ ntọala ntụkwasị obi na-ewepụ ihe egwu sistemụ nke a ga-emerịrị maka mmelite protocol ọ bụla dị mkpa.

**Maka ndị na-ejide na ndị na-arụ ọrụ**

- Nhazi ihe akaebe na-emegharị emegharị nwere ike ịkpakọ ọnụọgụgụ mgbakọ na mwepụ na-akparaghị ókè, ịmepụta sistemụ kesara nke a na-enyocha, na imeziwanye ikike Layer 1 maka ndị na-arụ ọrụ n'oghere zuru oke - nke metụtara ndọtị dịka Zcash Shielded Assets na atụmatụ ogologo oge Zcash's.

---

## Mmejọ Ndị A Na-emekarị

| Nkwenye a na-ekwenyekarị | Gịnị bụ eziokwu? |
| --- | --- |
| "Halo bụ mmelite n'ọdịnihu Zcash na-eche." | Orchard, nke dị ndụ na mainnet kemgbe NU5 (2022), na-agba ọsọ na Halo 2. |
| "Enweghị ntọala a tụkwasịrị obi pụtara na enweghị paramita ma ọlị." | Halo ka na-eji paramita nhazi; ihe dị iche bụ na ha anaghị ebu ihe mkpofu na-egbu egbu, a pụkwara ịmepụta ma melite ha na-enweghị ndị sonyere ga-atụkwasị obi na emume ahụ. |
| "Halo 2 na akwụkwọ Halo bụ otu ihe." | Ihe [akwụkwọ](https://eprint.iacr.org/2019/1021.pdf) na-akọwa atụmatụ ntinye aka nke polynomial na amortization nke e ji aka mee; Halo 2 bụ mmejuputa mmepụta Rust nke nwere atụmatụ nchịkọta na mgbakọ na mwepụ PLONKish. |
| "Recursion na-enyere aka naanị na nyocha nke ngọngọ." | Recursion na-agbakọkwa mgbakọta ọkwa ngwa — lee ihe akaebe Filecoin's nke oge oghere/mmepụta ihe na ọrụ VDF maka Ethereum. |

---

## Peeji ndị metụtara ya

- [zk-SNARKs](/zcash-tech/zk-snarks) — ngalaba teknụzụ izugbe Halo bụ nke
- [Halo (akwụkwọ nyocha)](https://eprint.iacr.org/2019/1021.pdf) — mbipụta mbụ
- [Ironwood](/zcash-tech/ironwood) na [Ogwe Mgbanwe](/zcash-tech/the-turnstile) — otu ọdọ mmiri ndị e ji kpuchie echebe si aga ebe ndị agadi lara ezumike nká
- [Akụ Zcash Chebere](/zcash-tech/zcash-shielded-assets) - ndọtị nke na-erite uru site na ihe akaebe ugboro ugboro
- [Zebra zuru oke](/zcash-tech/zebra-full-node) - mmejuputa node nke na-akwado ihe akaebe na yinye

## Mmụta Ọzọ

- [Okwu mmeghe nke ZKP na Halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 na Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blọọgụ nkọwa teknụzụ](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Ihe ngosi obodo Halo 2 — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Akwụkwọ**

- [Akụrụngwa Halo 2](https://github.com/mhchia/awesome-halo2)
- [Akwụkwọ Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP na ZK-SNARKS

## TL;DR

- **zk-SNARKs** = Esemokwu Ihe Ọmụma Na-abụghị Mmekọrịta nke Ihe Ọmụma
- Ha kwere ka otu onye gosi na ha maara ihe** n'ekpugheghị ozi ahụ n'onwe ya
- Zcash na-eji zk-SNARKs iji gosi na azụmahịa dị irè (ego ziri ezi, ntinye ndị a na-emefughị) **na-ekpugheghị onye zitere ya, onye nnata, ma ọ bụ ego**
- "Succinct" pụtara na ihe akaebe ahụ dị obere ma dịkwa ngwa iji gosi ọbụlagodi maka okwu ndị dị mgbagwoju anya
- Ọdọ mmiri Orchard na-eji Halo 2, sistemụ zk-SNARK nke na-enweghị ntọala a pụrụ ịtụkwasị obi**

---

## Gịnị bụ ihe akaebe?

Ihe akaebe bụ ntọala maka mgbakọ na mwepụ niile. Ihe akaebe bụ nkwupụta ma ọ bụ usoro ihe atụ ị na-agbalị igosi na usoro ihe e si na ya pụta iji gosi na ihe akaebe ahụ egosila. Dịka ọmụmaatụ, onye ọ bụla nwere ike ịlele akụkụ niile dị na triangle 180° n'onwe ya (onye nyocha).

**Ihe akaebe** 

Onye Nlereanya ---> Na-ekwu maka Mkpesa ---> Onye Nlereanya Họrọ ---> Nabata/Jụọ 

(Ma ihe akaebe na ihe akaebe bụ algọridim)

N'ime sayensị kọmputa, okwu maka ihe akaebe a na-enyocha nke ọma bụ ihe akaebe NP. Enwere ike ịkwado ihe akaebe ndị a dị mkpirikpi n'oge polynomial. Echiche sara mbara bụ "E nwere ngwọta maka theorem & a na-enyefe ya na onye na-enyocha ya iji lelee ya."


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


N'asụsụ NP = ọnọdụ abụọ ga-adịrịrị: 

Mmezu: Onye nyocha ga-anabata eziokwu mkpesa (na-enye ndị akaebe eziokwu ohere iru nkwenye)

Ịdị mma: Nkwupụta ụgha agaghị enwe ihe akaebe ọ bụla (maka atụmatụ aghụghọ niile ha agaghị enwe ike igosi na nkwupụta ezighi ezi ziri ezi).


### Ihe akaebe mmekọrịta na nke puru omume

**Mmekọrịta**: Kama ịgụ naanị ihe akaebe ahụ, onye na-enyocha ihe na-eme ihe na-eso onye na-egosi ihe n'ihu na azụ n'ọtụtụ ozi.

**Nzuzo**: Arịrịọ onye nyocha na-arịọ onye nyocha ka o nye onye nyocha bụ nke a na-ahazighị ahazi, onye nyocha ga-enwerịrị ike ịza nke ọ bụla nke ọma. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Site n'iji mmekọrịta na enweghị usoro ọnụ, o kwere omume igosi nkwupụta nye onye na-enyocha kpuru ìsì na Oge Polynomial Probabilistic (PPT). 

Ihe akaebe mmekọrịta nwere ike igosi ihe karịrị ihe akaebe NP nke ọma?

Ihe akaebe NP vs ihe akaebe IP:

|  Nkwupụta   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  ee      |  ee   |
|    CO-NP     |  no       |  ee   |
|    #P        |  no       |  ee   |
|    PSPACE    |  no       |  ee   |


NP - E nwere ihe ngwọta maka nkwupụta

CO-NP - Gosipụta na enweghị azịza maka nkwupụta

#P - Iji gụọ ọnụọgụ ngwọta dị maka nkwupụta

PSPACE - Na-egosi mgbanwe nke nkwupụta dị iche iche

### Gịnị bụ ihe ọmụma efu?

Ihe onye nyocha nwere ike ịgbakọ mgbe mmekọrịta gasịrị yiri ihe ha nwere ike igosi na mbụ. Mmekọrịta dị n'etiti onye nyocha na onye nyocha emebeghị ka ike mgbakọ nke onye nyocha ahụ dịkwuo elu.

**Usoro Nlereanya Paradigm**

Nnwale a dị n'oge niile e dere ihe gbasara nzuzo. Ọ na-egosi "Ezigbo Echiche" na "Ezigbo Echiche". 

Echiche Ziri Ezi: Akụkọ ihe mere eme niile nwere ike ime gbasara mmekọrịta dị n'etiti Prover na Verifier (P, V)

Echiche Eserese: Ihe nyocha ahụ na-eme ka mmekọrịta niile dị n'etiti Prover na Verifier sikwuo ike 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Onye na-achọpụta oge polynomial na-anwa ịchọpụta ma ha na-ele anya n'ezie ma ọ bụ nke e mere ka ọ dị ka ihe nlereanya ma na-arịọ ka e nye ha ihe nlele site na ha abụọ ugboro ugboro.

A na-ekwu na echiche abụọ a "anaghị aghọtacha nke ọma n'ụzọ mgbakọ na mwepụ" ma ọ bụrụ na maka algọridim/atụmatụ niile dị iche iche, ọbụlagodi mgbe enwetara ọnụọgụgụ polynomial nke ihe atụ sitere na ezigbo ma ọ bụ nke e mere ka ọ dị ka ihe atụ, ohere ya bụ >1/2. 

**Arụmụka Ihe Ọmụma Na-enweghị Ihe Ọmụma**

Usoro mmekọrịta (P, V) bụ ihe ọmụma efu ma ọ bụrụ na e nwere ihe eji eme ihe (algọridim) nke na maka ihe nyocha oge polynomial ọ bụla (mgbe usoro ahụ ziri ezi), nkesa puru omume nke na-ekpebi ezigbo ya site na echiche e mere ka ọ dị ka ihe nlereanya enweghị ike ịmata nke ọma na kọmputa. 

Usoro mmekọrịta bara uru mgbe e nwere otu onye na-enyocha ya. Ihe atụ ga-abụ onye na-enyocha ụtụ isi n'akwụkwọ 'ihe akaebe ụtụ isi' nke na-enweghị ihe ọmụma.

## Gịnị bụ SNARK?

**Arụmụka Ihe Ọmụma nke Na-abụghị Mmekọrịta**

Nkọwa sara mbara - Ihe akaebe dị mkpirikpi na nkwupụta bụ eziokwu. Ihe akaebe ahụ ga-adị mkpụmkpụ ma dị ngwa iji gosi. Na SNARKS, a na-eziga otu ozi site na Prover gaa na Verifier. Onye nyocha ahụ nwere ike ịhọrọ ịnakwere ma ọ bụ ịjụ. 

ihe atụ okwu: "Amaara m ozi (m) nke na SHA256(m)=0"

N'ime zk-SNARK ihe akaebe ahụ anaghị egosi ihe ọ bụla gbasara ozi ahụ (m).

**Polynomials**: Nchikota okwu nwere ihe na-agbanwe agbanwe (dịka 1,2,3), ihe na-agbanwe agbanwe (dịka x,y,z), na ihe na-egosi ihe na-agbanwe agbanwe (dịka x², y³). 

ihe atụ: "3x² + 8x + 17"

**Seketi Mgbakọ**: Ihe nlereanya maka ịgbakọ polynomials. N'ozuzu ya, enwere ike ịkọwa ya dị ka eserese Acyclic Directed nke a na-arụ ọrụ mgbakọ na mwepụ na node ọ bụla nke eserese ahụ. Seketi ahụ nwere ọnụ ụzọ mgbakwunye, ọnụ ụzọ mmụba na ụfọdụ ọnụ ụzọ ámá na-adịgide adịgide. N'otu ụzọ ahụ seketi Boolean na-ebu bits na waya, seketi Arithmetic na-ebu integers.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

N'ihe atụ a, onye akaebe chọrọ ime ka onye nyocha kwenye na ọ maara ihe ngwọta maka sekit mgbakọ na mwepụ. 

**Nkwa**: Iji mee nke a, onye na-egosi ihe ga-etinye ụkpụrụ niile (nkeonwe na nke ọha) metụtara sekit ahụ n'ime nkwa. Nkwa na-ezochi ntinye ha site na iji ọrụ nke mmepụta ya na-enweghị ike ịgbanwe agbanwe.

Sha256 bụ otu ihe atụ nke ọrụ hashing nke enwere ike iji na atụmatụ nkwa.

Mgbe onye akaebe nyefere ihe ndị ahụ, a na-eziga nkwa ndị ahụ na onye nyocha (n'inwe obi ike na ha enweghị ike ịchọpụta uru mbụ ọ bụla). Onye nyocha ahụ ga-enwe ike igosi onye nyocha ihe ọmụma nke uru ọ bụla dị na n'ime oghere nke eserese ahụ. 

**Fiat-Shamir Transform**

Iji mee ka usoro a *na-anaghị akpakọrịta*, onye na-egosi ihe na-eme n'enweghị usoro (eji maka ihe ịma aka zoro ezo) n'aha onye na-enyocha ihe site na iji ọrụ hash cryptographic. A maara nke a dị ka oracle random. Onye na-enyocha ihe nwere ike izipu otu ozi nye onye na-enyocha ihe wee lelee ma ọ ziri ezi. 

Iji mepụta SNARK nke enwere ike iji maka sekit izugbe, ihe abụọ dị mkpa:

Atụmatụ nkwa ọrụ: Na-enye onye na-etinye aka ohere itinye aka na polynomial nwere obere eriri nke onye na-enyocha nwere ike iji kwado nyocha a na-ekwu maka polynomial ekwenyeghị.

Okwu mkparịta ụka gbasara Polynomial: Onye na-enyocha ihe na-arịọ prover (algọridim) ka o mepee nkwa niile n'ebe dị iche iche ha họọrọ site na iji atụmatụ nkwa polynomial & checks njirimara na-agbaso eziokwu n'etiti ha.

**Melite**

Usoro ntọala na-enyere onye nyocha aka site n'ịchịkọta sekit ma wepụta paramita ọha. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Ụdị nhazi tupu nhazi**:

Ntọala a tụkwasịrị obi kwa sekit - A na-agba otu ugboro kwa sekit. Ọ dị iche na sekit ahụ, a ga-ezobekwa ihe nzuzo ahụ (Common Reference String) + bibie ya. 

Nhazi a na-emebi emebi pụtara na onye na-ekwu eziokwu nwere ike igosi na okwu ụgha bụ eziokwu. 

Ntọala a tụkwasịrị obi mana zuru ụwa ọnụ - Naanị otu ugboro ka a ga-agba ntọala a tụkwasịrị obi ma nwee ike ịhazi ọtụtụ sekit tupu oge eruo. 

Ntọala Transparent (Enweghị Ntọala A Tụkwasara Obi) - Algọridim nhazi tupu oge eruo anaghị eji ihe nzuzo ọ bụla eme ihe ma ọlị. 


**Ụdị ihe owuwu SNARK na-egosi**:

[Groth16](https://eprint.iacr.org/2016/260): Achọrọ Ntọala A tụkwasịrị Obi mana o nwere obere ihe akaebe nke enwere ike ịchọpụta ngwa ngwa.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://eprint.iacr.org/2019/953): Ntọala a tụkwasịrị obi n'ụwa niile.

[Ọchịchịrị](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Enweghị Ntọala A Tụkwasara Obi mana ọ na-emepụta ihe akaebe dị ogologo karịa ma ọ bụ nwee ike were ogologo oge ka ihe ngosi ahụ rụọ ọrụ. 

SNARKS bara uru mgbe achọrọ ọtụtụ ihe akaebe dị ka blockchain dịka Zcash ma ọ bụ zk-Rollup dịka [Aztek](https://docs.aztec.network) nke mere na ọtụtụ nodes nkwado agaghị enwe mmekọrịta n'ọtụtụ agba na ihe akaebe ọ bụla. 

## Kedu otu esi etinye zk-SNARK's n'ọrụ na Zcash?

N'ozuzu, ihe akaebe efu bụ ngwaọrụ iji mee ka omume eziokwu dị na usoro iwu na-ekpugheghị ozi ọ bụla. 

Zcash bụ blockchain ọha na eze nke na-eme ka azụmahịa nkeonwe dị mfe. A na-eji zk-SNARK's iji gosi na azụmahịa nkeonwe dị irè n'ime iwu nkwekọrịta netwọk na-ekpugheghị nkọwa ọ bụla ọzọ gbasara azụmahịa ahụ. 

[Nkọwa Vidiyo](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - N'okwu nkuzi a, Ariel Gabizon na-enye nkọwa gbasara osisi nkwa Zcash Note, nyocha polynomial blind & ihe ịma aka zoro ezo nke Homomorphically na otu esi etinye ha n'ọrụ na netwọk ahụ. 

Gụọ ya [Akwụkwọ Halo2](https://zcash.github.io/halo2/index.html) maka ozi ndị ọzọ.

## Ngwa Ndị Ọzọ Na-enweghị Ihe Ọmụma 

zk-SNARKs na-enye ọtụtụ uru n'ọtụtụ ngwa dị iche iche. Ka anyị leba anya n'ụfọdụ ihe atụ.

**Ịhazi Nhagharị**: A na-enweta nke a site na 'Nkọwapụta Mwepụ'. Enweghị mkpa siri ike maka ihe ọmụma efu maka yinye L1 iji chọpụta ọrụ nke ọrụ na-abụghị nke agbụ ígwè. Azụmahịa abụghị nkeonwe na zk-EVM.

Uru nke ọrụ Rollup (zk-Rollup) dabere na ihe akaebe bụ ịhazi otu narị/puku kwuru puku azụmahịa na L1 nwere ike ịchọpụta obere ihe akaebe na e mepụtara azụmahịa niile nke ọma, na-amụba mmepụta azụmahịa netwọk site na ihe dị ka 100 ma ọ bụ 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Mmekọrịta**: A na-enweta nke a na zk-Bridge site na 'ịkpọchi' akụ na isi iyi ma gosi na akụ ahụ akpọchiri na agbụ ebumnuche (ihe akaebe nke nkwekọrịta).

**Nrubeisi**: Ọrụ dịka [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) nwee ike igosi na azụmahịa nkeonwe na-agbaso iwu ụlọ akụ mpaghara na-ekpugheghị nkọwa nke azụmahịa ahụ. 

**Ịlụso Ozi Na-ezighi Ezi ọgụ**: N'ime ọtụtụ ihe atụ ndị ọzọ na-abụghị blockchain na cryptocurrency, ojiji nke imepụta ihe akaebe na onyonyo nke akụkọ na ụlọ ọrụ mgbasa ozi haziri iji mee ka ndị na-ekiri nwee ike ịchọpụta ebe onyonyo si na ọrụ niile emere na ya n'onwe ha. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Mmụta Ọzọ: 

[Akwụkwọ ọgụgụ ihe ọmụma efu - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK na Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 na SNARKs na-enweghị Ntọala Atụkwasịrị Obi - Sean Bowe na Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Ihe akaebe efu na Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Ihe akaebe nke ihe ọmụma efu na-emekọrịta ihe - Akụkọ njikọ Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Nkuzi nke 1: Okwu Mmalite na Akụkọ Ihe Mere Eme nke ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Nkọwa Dị Mfe nke Mgbakọ na Mwepụ - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Nhazi dị n'ime ya na-agwụ ike, nzuzo anwụọla: ihe akaebe ZK, gịnị ka ha dị mma maka ya?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Peeji ndị metụtara ya

- [Ọdọ Mmiri E Kpuchiri Ekpuchi](/using-zcash/shielded-pools) — Otu esi eji zk-SNARKs eme ihe na ọdọ mmiri uru Zcash
- [Halo](/zcash-tech/halo) — Sistemụ zk-SNARK Zcash's nke na-ewepụ ntọala a tụkwasịrị obi
- [Nchekwa Mgbe-Ọnọdụ Na Zcash](/zcash-tech/post-quantum-security) - Otu ihe egwu kwantum n'ọdịnihu si metụta cryptography Zcash
- [Akụ Zcash Chebere](/zcash-tech/zcash-shielded-assets) — ZSAs e wuru na teknụzụ zk-SNARK
- [Kedu ihe bụ ZEC na Zcash](/start-here/what-is-zec-and-zcash) — Okwu Mmalite nke Zcash na ụdị nzuzo ya
- [Ònye nwere ike ịhụ ụgwọ Zcash gị?](/start-here/who-can-see-your-zcash-payment) — Ihe na-anọ n'ihu ọha, na ihe mkpuchi na-ezo

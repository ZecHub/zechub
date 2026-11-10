<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# ZKP & ZK-SNARKS

## N'Ikpeazụ

- **zk-SNARKs** = Arụmụka Ihe Ọmụma Dị Mkpirikpi na-enweghị Mmekọrịta nke Zero-Knowledge
- Ha na-eme ka otu akụkụ nwee ike **gosipụta na ha maara ihe** na-enweghị ikpughe ozi ahụ n'onwe ya
- Zcash na-eji zk-SNARKs gosipụta na azụmahia ziri ezi (ọnụọgụ ziri ezi, ntinye a na-emefubeghị) **na-enweghị ikpughe onye zitere, onye natara, ma ọ bụ ọnụọgụ**
- “Dị mkpirikpi” pụtara na proof ahụ dị nta ma dị ngwa inyocha ọbụna maka nkwupụta ndị dị mgbagwoju anya
- Pool nke e chebere echebe Orchard na-eji Halo 2, usoro zk-SNARK nke **anaghị achọ trusted setup**

---

## Gịnị bụ Proof?

Proof bụ ntọala maka mgbakọ na mwepụ niile. Proof bụ nkwupụta ma ọ bụ usoro iwu ị na-achọ igosipụta na usoro mwepụta e mere iji kwupụta na egosila usoro iwu ahụ. Dịka ọmụmaatụ, onye ọ bụla na-enyocha (verifier) nwere ike n'onwe ya nyochaa na akụkụ niile nke triangle na-agbakọta ruo 180°.

**Proof** 

Onye na-egosi ---> Na-eme Nkwupụta ---> Onye Nyocha Na-ahọrọ ---> Nabata/Jụ 

(Ma onye na-egosi ma onye nyocha bụ algọridim)

Na sayensị kọmputa, okwu a na-eji maka proof ndị a pụrụ inyocha nke ọma bụ NP proof. Enwere ike inyocha proof ndị a dị mkpirikpi n'oge polynomial. Echiche sara mbara bụ “E nwere azịza maka usoro iwu ma nyefee ya onye nyocha ka ọ nyochaa ya”.


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


N'asụsụ NP = ọnọdụ abụọ ga-adịrị: 

Njuputa: Onye nyocha ga-anabata nkwupụta eziokwu (na-enye ndị na-egosi ezi omume ohere iru nkwenye)

Izi ezi: Nkwupụta ụgha agaghị enwe proof (maka atụmatụ ọ bụla nke onye na-egosi aghụghọ, ha agaghị enwe ike igosi izi ezi nke nkwupụta na-ezighi ezi).


### Proof mmekọrịta & nke nwere ihe ndabara

**Mmekọrịta**: Kama naanị ịgụ proof ahụ, onye nyocha na onye na-egosi na-emekọrịta ugboro ugboro n'ọtụtụ mgbatị ozi.

**Ihe ndabara**: Arịrịọ onye nyocha na-enye onye na-egosi bụ nke a haziri n'amaghị ama, onye na-egosi ga-enwe ike ịza nke ọ bụla n'ụzọ ziri ezi. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Site n'iji mmekọrịta na ihe ndabara ọnụ, ọ ga-ekwe omume igosi nkwupụta nye onye nyocha na-ahụghị ihe n'oge Probabilistic Polynomial Time (PPT). 

Proof mmekọrịta hà nwere ike inyocha karịa NP proof nke ọma?

NP Proof megide IP proof:

|  Nkwupụta   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  ee      |  ee   |
|    CO-NP     |  mba      |  ee   |
|    #P        |  mba      |  ee   |
|    PSPACE    |  mba      |  ee   |


NP - E nwere azịza maka nkwupụta

CO-NP - Igosi na enweghị azịza maka nkwupụta

#P - Ịgụ ole azịza dị maka nkwupụta

PSPACE  - Igosi ntụgharị nke nkwupụta dị iche iche

### Gịnị bụ Zero Knowledge?

Ihe onye nyocha nwere ike ịgbakọ mgbe mmekọrịta gachara na ihe ha nwere ike igosi tupu ya bụ otu. Mmekọrịta a na-eme n'ọtụtụ mgbatị n'etiti onye na-egosi na onye nyocha emebeghị ka ikike mgbakọ nke onye nyocha bawanye.

**Nnwale Paradigm**

Nnwale a dị n'ime cryptography niile. Ọ na-eweta “Nlele Eziokwu” na “Nlele Emebere”. 

Nlele Eziokwu: Akụkọ ihe mere eme niile nwere ike ịdị nke mmekọrịta n'etiti Onye Na-egosi na Onye Nyocha (P,V)

Nlele Emebere: Onye nyocha na-emegharị mmekọrịta niile nwere ike ịdị n'etiti Onye Na-egosi na Onye Nyocha 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Onye nkewa oge polynomial na-agbalị ikpebi ma ha na-ele nlele eziokwu ma ọ bụ nlele emebere anya, ma na-arịọ ihe atụ n'aka ha abụọ ugboro ugboro.

A na-ekwu na nlele abụọ ahụ “enweghị ike ikewapụ ha site na mgbakọ” ma ọ bụrụ na maka algọridim/atụmatụ nkewa niile, ọbụna mgbe ha natara ọnụ ọgụgụ polynomial nke ihe atụ sitere na nlele eziokwu ma ọ bụ nke emebere, ihe gbasara nke puru ime karịrị 1/2. 

**Arụmụka Ihe Ọmụma Zero-Knowledge**

Usoro mmekọrịta (P,V) bụ zero-knowledge ma ọ bụrụ na e nwere simulator (algọridim) nke na, maka onye nyocha ọ bụla nke oge polynomial nwere ihe ndabara (mgbe usoro iwu ahụ ziri ezi), nkesa ihe gbasara nke puru ime nke na-ekpebi nlele eziokwu na nlele emebere enweghị ike ikewapụ site na mgbakọ. 

Usoro mmekọrịta bara uru mgbe e nwere naanị otu onye nyocha. Otu atụ bụ onye nyocha ụtụ isi n'ime ngwa zero-knowledge nke “proof ụtụ isi”.

## Gịnị bụ SNARK?

**Arụmụka Ihe Ọmụma Dị Mkpirikpi na-enweghị Mmekọrịta**

Nkọwa sara mbara - Proof dị mkpirikpi na nkwupụta bụ eziokwu. Proof ahụ ga-adị mkpirikpi ma dị ngwa inyocha. Na SNARKS, a na-eziga otu ozi site n'aka Onye Na-egosi gaa n'aka Onye Nyocha. Onye nyocha nwere ike ịhọrọ ịnakwere ma ọ bụ ịjụ ya. 

ihe atụ nkwupụta: “Amaara m ozi (m) nke SHA256(m)=0”

Na zk-SNARK proof anaghị ekpughe ihe ọ bụla gbasara ozi (m).

**Polynomial**: Nchịkọta nke okwu nwere mgbe niile (dịka 1,2,3), mgbanwe (dịka x,y,z), na ike nke mgbanwe (dịka x², y³). 

ihe atụ: “3x² + 8x + 17”

**Circuit mgbakọ**: Nlereanya maka ịgbakọ polynomial. N'ozuzu, a pụrụ ịkọwa ya dịka Directed Acyclic Graph nke a na-arụ ọrụ mgbakọ na node ọ bụla nke graph ahụ. Circuit ahụ nwere ọnụ ụzọ mgbakwunye, ọnụ ụzọ mmụba, na ụfọdụ ọnụ ụzọ mgbe niile. N'otu ụzọ Boolean circuit si ebu bit n'ime waya, circuit mgbakọ na-ebu integer.

<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

N'ihe atụ a, onye na-egosi chọrọ ime ka onye nyocha kweta na ọ maara azịza maka circuit mgbakọ ahụ.  

**Commitment**: Ime nke a, onye na-egosi ga-etinye ụkpụrụ niile (nke nzuzo na nke ọha) metụtara circuit ahụ n'ime commitment. Commitment na-ezo ntinye ha site n'iji ọrụ nke mmepụta ya enweghị ike ịlaghachi azụ.

Sha256 bụ otu atụ nke ọrụ hashing a pụrụ iji na atụmatụ commitment.

Mgbe onye na-egosi mechara commitment maka ụkpụrụ ndị ahụ, a na-eziga commitment ahụ nye onye nyocha (n'ihi obi ike na ha enweghị ike ikpughe ụkpụrụ mbụ ọ bụla). Onye na-egosi nwere ike igosi onye nyocha na ha maara nke ọ bụla n'ime ụkpụrụ dị na node nke graph ahụ. 

**Mgbanwe Fiat-Shamir**

Iji mee ka usoro ahụ bụrụ *na-enweghị mmekọrịta*, onye na-egosi na-emepụta ihe ndabara (e ji maka ihe ịma aka zoro ezo) n'aha onye nyocha site n'iji ọrụ hash cryptographic. A maara nke a dịka random oracle. Onye na-egosi nwere ike iziga otu ozi nye onye nyocha, onye ahụ wee nyochaa ma ọ ziri ezi. 

Iji mepụta SNARK enwere ike iji maka circuit izugbe, a chọrọ ihe abụọ:

Atụmatụ commitment na-arụ ọrụ: Na-ekwe ka onye na-eme commitment mee commitment maka polynomial site na eriri dị mkpirikpi onye nyocha nwere ike iji kwado nyocha a na-ekwu maka polynomial e mere commitment maka ya.

Oracle mmekọrịta polynomial: Onye nyocha na-arịọ onye na-egosi (algọridim) ka o mepee commitment niile n'ebe dị iche iche onye nyocha họọrọ site n'iji atụmatụ commitment polynomial, ma nyochaa na njirimara dị n'etiti ha bụ eziokwu.

**Nhazi**

Usoro nhazi na-enyere onye nyocha aka site n'ịchịkọta circuit ma wepụta parampatà ọha. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Ụdị nhazi tupu nhazi**:

Trusted Setup maka circuit ọ bụla - A na-eme ya otu ugboro maka circuit ọ bụla. Ọ bụ kpọmkwem maka circuit, na ihe ndabara nzuzo (Common Reference String) ga-anọrịrị na nzuzo ma bibie ya. 

Nhazi emebiela n'usoro a pụtara na onye na-egosi na-adịghị akwụwa aka ọtọ nwere ike igosi nkwupụta ụgha. 

Trusted Setup zuru ụwa ọnụ - Ọ dị mkpa naanị ime trusted setup otu ugboro ma nwee ike mezia ọtụtụ circuit n'ụzọ kpebiri ekpebi mgbe ahụ. 

Nhazi Oha (Enweghị Trusted Setup)- Algọridim nhazi tupu nhazi anaghị eji ihe ndabara nzuzo ọ bụla. 


**Ụdị nrụpụta SNARK proof**:

[Groth16](https://eprint.iacr.org/2016/260): Na-achọ Trusted Setup mana nwere proof dị mkpirikpi nke a pụrụ inyocha ngwa ngwa.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953): Trusted Setup zuru ụwa ọnụ.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Enweghị Trusted Setup mana ha na-emepụta proof dị ntakịrị ogologo karị ma ọ bụ nwere ike iwe onye na-egosi ogologo oge ịrụ. 

SNARKS bara uru mgbe a chọrọ ọtụtụ ndị nyocha, dịka blockchain dị ka Zcash ma ọ bụ zk-Rollup dịka [Aztec](https://docs.aztec.network), ka ọtụtụ node nkwado ghara inwe mmekọrịta n'ọtụtụ mgbatị na proof ọ bụla. 

## Kedu ka e si etinye zk-SNARK's n'ime Zcash?

N'ozuzu, zero-knowledge proof bụ ngwá ọrụ iji manye omume ezi omume n'ime protocol na-enweghị ikpughe ozi ọ bụla. 

Zcash bụ blockchain ọha na-eme ka azụmahia nzuzo kwe omume. A na-eji zk-SNARK's igosi na azụmahia nzuzo ziri ezi n'ime iwu consensus netwọk na-enweghị ikpughe nkọwa ọ bụla ọzọ gbasara azụmahia ahụ. 

[Nkọwa Vidio](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - N'ọmụmụ a, Ariel Gabizon na-akọwa Zcash Note Commitment Tree, Blind Polynomial Evaluation na Homomorphically Hidden Challenges, na otu esi etinye ha n'ime netwọk. 

Gụọ akwụkwọ [Halo2](https://zcash.github.io/halo2/index.html) maka ozi ndị ọzọ.

## Ngwa Zero-Knowledge Ndị Ọzọ 

zk-SNARKs na-enye ọtụtụ uru n'ime ngwa dịgasị iche iche. Ka anyị lelee ụfọdụ atụ.

**Scaling**: A na-enweta nke a site na “Ibufe Mgbakọ n'èzí”. Enweghị mkpa siri ike maka zero-knowledge ka chain L1 nyochaa ọrụ nke ọrụ off-chain. Azụmahia abụghị mgbe niile nke nzuzo na zk-EVM.

Uru ọrụ Rollup dabere na proof (zk-Rollup) bụ ịhazi otu nchịkọta nke ọtụtụ narị/puku azụmahia, L1 wee nwee ike inyocha proof dị mkpirikpi na azụmahia niile ka ahaziri nke ọma, si otú a na-abawanye ụba azụmahia netwọk ugboro 100 ma ọ bụ 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Mmekọrịta n'etiti usoro**: A na-enweta nke a na zk-Bridge site n'“igbachi” akụ na chain isi mmalite ma gosi chain ebe a na-aga na akụ ndị ahụ agbachiela (proof nke consensus).

**Nrubeisi**: Ọrụ dịka [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) nwere ike igosi na azụmahia nzuzo na-erube isi n'iwu ụlọ akụ mpaghara na-enweghị ikpughe nkọwa azụmahia ahụ. 

**Ịlụso Ozi Ụgha ọgụ**: N'etiti ọtụtụ atụ ndị dị n'èzí blockchain na cryptocurrency, e nwere iji nrụpụta proof na ihe onyonyo ụlọ ọrụ akụkọ na mgbasa ozi haziri, iji mee ka ndị na-ekiri nwee ike n'onwe ha nyochaa isi mmalite ihe onyonyo na arụmọrụ niile e mere na ya. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Ọmụmụ Ndị Ọzọ: 

[Ndepụta Akwụkwọ Zero-Knowledge - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's ya na Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 na SNARKs na-enweghị Trusted Setups - Sean Bowe na Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Proofs ya na Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Proof Zero-Knowledge Mmekọrịta - Isiokwu Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Ọmụmụ 1: Mmalite na Akụkọ Ihe Mere Eme nke ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Nkọwa Dị Mfe Maka Arithmetic Circuits - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Scaling Na-agwụ Ike, Nzuzo Anwụọla: ZK-Proofs, Gịnị Ka Ha Bara Uru Maka Ya?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Peeji Ndị Metụtara Ya

- [Pool nke E Chebere Echebe](/using-zcash/shielded-pools) — Otu e si eji zk-SNARKs n'ime pool uru Zcash
- [Halo](/zcash-tech/halo) — Usoro Zcash's zk-SNARK nke na-ewepụ trusted setup
- [Nchekwa Post-Quantum na Zcash](/zcash-tech/post-quantum-security) - Otu ihe ize ndụ quantum n'ọdịnihu si metụta cryptography Zcash
- [Zcash Akụ nke E Chebere Echebe](/zcash-tech/zcash-shielded-assets) — ZSA ndị e wuru na teknụzụ zk-SNARK
- [Gịnị bụ ZEC na Zcash](/start-here/what-is-zec-and-zcash) — Mmalite maka Zcash na nlereanya Nzuzo ya
- [Ònye Pụrụ Ịhụ Kwụọ ụhwọ Zcash Gị?](/start-here/who-can-see-your-zcash-payment) — Ihe na-anọ n'ihu ọha, na ihe nchebe na-ezo

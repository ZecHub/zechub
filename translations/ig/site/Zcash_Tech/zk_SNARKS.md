<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = Zero-Knowledge Succinct Non-Interactive Arụmụka nke Ihe Ọmụma
- Ha na-ekwe ka otu onye gosipụta na ha maara ihe n'ekpugheghị ozi ahụ n'onwe ya
- Zcash na-eji ZK-SNARKs iji gosipụta azụmahịa dị irè (ego ziri ezi, ntinye ego) **na-enweghị igosipụta onye na-ezipụ, onye nnata, ma ọ bụ ego**
- "Succinct" pụtara na ihe akaebe ahụ pere mpe ma dịkwa ngwa iji nyochaa ọbụnadị maka nkwupụta ndị dị mgbagwoju anya
- Ogige Orchard na-eji Halo 2, usoro ZK-SNARK na ** enweghị ntọala a tụkwasịrị obi chọrọ **

---

## Gịnị Bụ Ihe Àmà?

Ihe akaebe bụ ihe ndabere maka mgbakọ na mwepụ niile. Ngosipụta bụ nkwupụta ma ọ bụ usoro iwu ị na-anwa igosipụta & usoro nke ntụgharị e mere iji kwupụta usoro iwu ahụ gosipụtara. dịka ọmụmaatụ. akụkụ niile dị na triangle ngụkọta 180 ° nwere ike ịnwale onye ọ bụla (onye nyocha).

Ihe akaebe 

Prov ---> Na-ekwu okwu ---> Onye nyocha na-ahọrọ ---> Nabata/Jụ 

(Ma onye nyocha na onye nyocha bụ algọridim)

In computer science the term for efficiently verifiable proofs is NP proofs. These short proofs can be verified in polynomial time. The broad idea being "There exists a solution to a theorem & it is passed over to the verifier to check it"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


Na NP-asụsụ = ọnọdụ abụọ ga-emezu: 

Ihe zuru ezu: Onye nyocha ga-anabata ezigbo nkwupụta (na-enye ndị na-egosi eziokwu aka iru nyocha)

Eziokwu: Nkwupụta ụgha agaghị enwe ihe akaebe (maka usoro aghụghọ ọ bụla ha agaghị enwe ike igosi izi ezi nke nkwupụta na-ezighi ezi).


### Ngosipụta mmekọrịta & Ihe ga-ekwe omume

**Mmekọrịta**: Kama ịgụ naanị ihe akaebe ahụ, onye nyocha ahụ na-etinye aka na onye nyocha azụ na n'ihu n'ọtụtụ ozi.

**Randomness**: Verifier si arịrịọ ka prover na-randomized na prover ga-enwe ike ịza n'ụzọ ziri ezi ka onye ọ bụla. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Using interaction and randomness together it is possible to prove a claim to a blind verifier in Probabilistic Polynomial Time (PPT). 

Enwere ike igosi ihe ngosi Interactive nke ọma karịa nkwenye NP?

NP Proofs vs IP proofs:

Nkwupụta NP IP
|--------------|-----------|--------|
NP: Ee. Ee.
CO-NP Mba ee
#P: Mba. Ee.
PSPACE: Mba ee.


NP - Enwere ngwọta maka nkwupụta

CO-NP - Igosi na enweghi ngwọta maka nkwupụta

#P - Ịgụ ole ngwọta dị na nkwupụta

PSPACE - Igosipụta mgbanwe nke nkwupụta dị iche iche

### Gịnị bụ Zero Knowledge?

What a verifier can compute after an interaction is identical to what they could prove prior. The interaction over multiple rounds between the prover & verifier has not increased the computional power of the verifier.

** The Simulation Paradigm **

Nnwale a dị na cryptography. Ọ na-enye "Ezi Echiche" & "Echere Echiche". 

Ezigbo Echiche: Akụkọ niile nwere ike ịdị n'etiti Prover & Verifier (P,V)

Nlele nlele: Onye nyocha ahụ na-eme ka mmekọrịta niile dị n'etiti Prover & Verifier 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

A polynomial-time distinguisher makes an attempt to determine whether they are looking at the real or simulated view and requests a sample from both repeatedly.

The two views are said to be "computationally indistinguishable" if for all distinguisger algorithms/strategies, even after receiving a polynomial number of samples from real or simulated, the probability is >1/2. 

**Ebumnuche nke ihe ọmụma efu**

An interactive protocol (P,V) is zero-knowledge if there exists a simulator (algorithm) such that for every probabilty polynomial-time verifier (when the theorem is correct), the probability distributions determining the real from simulated view are computationaly indistinguishable. 

Nkwekọrịta mmekọrịta bara uru mgbe enwere otu onye nyocha. Otu ihe atụ ga-abụ onye nyocha ụtụ na ngwa 'ihe akaebe nke ụtụ isi'.

## Gịnị bụ SNARK?

** Nkwupụta Amamihe Na-enweghị Mmekọrịta **

Broad definition - A succinct proof that a statement is true. The proof must be short and fast to verify. In SNARKS a single message is sent from Prover to Verifier. The verifier can then choose to accept or reject. 

nkwupụta ihe atụ: "Amaara m ozi (m) dị ka SHA256(m) = 0"

Na zk-SNARK ihe akaebe ahụ anaghị ekpughe ihe ọ bụla gbasara ozi (m).

**Polynomials**: Nchịkọta nke okwu ndị nwere ihe na-adịgide adịgide (dịka 1,2,3), mgbanwe (dị ka x,y,z), na exponents nke mgbanwe (dika x2, y3). 

ihe atụ: "3x2 + 8x + 17"

**Arithmetic Circuit**: Ọ bụ ihe atụ maka ịgbakọ polynomials. More n'ozuzu ọ nwere ike kọwaa dị ka a Directed Acyclic Graph na nke ọ bụla ọnụ nke graph a mgbakọ na mwepụ ọrụ a rụrụ.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

In this example, the prover wants to convince the verifier that he knows a solution to the arithmetic circuit.  

**Commitments**: To do this, the prover will put all of the values (private and public) associated with the circuit into a commitment. Commitments hide their inputs by using a function whose output is irreversible.

Sha256 bụ otu ihe atụ nke ọrụ hashing nke enwere ike iji ya na atụmatụ nkwekọrịta.

After the prover commits to the values, the commitments are sent to verifier (being confident they are unable to uncover any of the original values). The prover is then able to show to the verifier knowledge of each of the values on the nodes of the graph. 

** Mgbanwe Fiat-Shamir **

To make the protocol *non-interactive* the prover generates randomness (used for the hidden challenge) on behalf of the verifier using a cryptographic hash function. This is known as the random oracle. The prover can then send a single message to the verifier who can then check it is correct. 

Iji mepụta SNARK nke enwere ike iji ya mee ihe maka usoro izugbe, a chọrọ ihe abụọ:

Functional commitment scheme: Allows a committer to commit to a polynomial with a short string that can be used by a verifier to confirm claimed evaluations of the committed polynomial.

Polynomial interactive oracle: Verifier na-ajụ prover (algorithm) ka o mepee nkwekọrịta niile n'ebe dị iche iche nke ha na-ahọrọ site na iji atụmatụ nkwekọ polynomials & nyocha njirimara bụ eziokwu n'etiti ha.

** Ntọala **

Usoro nhazi na-enyere onye nyocha aka site na ichikota sekit & mmepụta ihe ngosi ọha. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

** Types nke tupu nhazi ntọlite **:

Ntọala a tụkwasịrị obi kwa sekit - A na-agba ọsọ otu ugboro kwa okirikiri. Ọ bụ ihe pụrụ iche na sekit & ihe nzuzo nzuzo (Common Reference String) ga-ezo ezo + kpochapụ. 

Nhazi a na usoro a pụtara na onye na-adịghị akwụwa aka ọtọ nwere ike igosi nkwupụta ụgha. 

Atụkwasị obi ma Universal Setup - Naanị nwere na-agba ọsọ tụkwasịrị obi setup otu ugboro na bụ ike mgbe ahụ deterministically preprocess multiple sekit. 

Ntọala Transparent (Enweghị Ntọalụ Tụkwasịrị Obi) - Usoro nhazi nke mbụ anaghị eji ihe nzuzo ọ bụla zoro ezo. 


** Types of SNARK proof constructions **: Ụdị nke SNARC na-eguzogide ihe owuwu

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Na-achọ Ntọala tụkwasịrị obi ma nwee ihe akaebe dị mkpirikpi nke enwere ike nyochaa ngwa ngwa.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Ntọala a tụkwasịrị obi n'ụwa niile.

[Ọchịchịrị](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[ỤRỤ](https://www.youtube.com/watch?v=wFZ_YIetK1o): Enweghị Ntọala tụkwasịrị obi ma mepụta ihe akaebe dịtụ ogologo ma ọ bụ nwere ike iwe ogologo oge maka ịgba ọsọ. 

SNARKS bara uru mgbe achọrọ ọtụtụ ndị nyocha dị ka blockchain dị ka Zcash ma ọ bụ zk-Rollup dị ka [Aztec](https://docs.aztec.network) so that multiple validating nodes don't have to interact over several rounds with each proof. 

## Kedụ ka e si etinye zk-SNARK na Zcash?

N'ozuzu, ihe akaebe na-enweghị ihe ọmụma bụ ngwá ọrụ iji mezuo omume n'eziokwu na protocols n'ekpugheghị ozi ọ bụla. 

Zcash is a public blockchain that facilitates private transactions. zk-SNARK's are used to prove that a private transaction is valid within the network consensus rules without revealing any other details about the transaction. 

[Ihe E Ji Akụziri Mmadụ Vidio]](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - In this lecture Ariel Gabizon provides descriptions of the Zcash Note Commitment Tree, Blind Polynomial Evaluation & Homomorphically Hidden Challenges and how they are implemented on the network. 

Gụọ akwụkwọ Halo 2 .](https://zcash.github.io/halo2/index.html) maka ozi ndị ọzọ.

## Ngwa ndị ọzọ na-enweghị ihe ọmụma 

zk-SNARKS provide several advantages in a variety of different applications. Let's take a look at some examples.

**Scalability**: Nke a na-enweta site na 'Outsourcing Computation'. Ọ dịghị mkpa maka ihe ọmụma efu maka usoro L1 iji nyochaa ọrụ nke ọrụ mpụga. Azụmahịa abụghị nke onwe na zk-EVM.

The advantage of a proof based Rollup (zk-Rollup) service is to process a batch of hundreds/thousands of transactions & the L1 is able to verify a succinct proof that all transactions were processed correctly, scaling the networks transaction throughput by a factor of 100 or 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interoperability**: This is achieved on a zk-Bridge by 'locking' assets on a source chain and proving to the target chain the assets have been locked (proof of consensus).

**Irube isi**: Ọrụ ndị dị ka [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) are able to prove that a private transaction is compliant with local banking laws without revealing the details of the transaction. 

**Fighting Disinformation**: Among several examples outside of blockchain & cryptocurrency, the use of proof generation on images that have been processed by news & media outlets to enable viewers to independently verify the source of an image and all operations performed on it. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Ịmụtakwu Ihe: 

[Akwụkwọ ọgụgụ ihe ọmụma efu - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK na Hanh Huynh Huu nọ](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 na SNARKs na-enweghị Tụkwasịrị Obi Mbido - Sean Bowe on Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Amụma efu na-egosi na Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interactive Zero-Knowledge Proofs - Chainlink isiokwu](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Nkuzi 1: Okwu Mmalite na Akụkọ nke ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Nkọwa Dị Mfe nke Circuits Arithmetic - Ọkara](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Ịgbasapụ Agbasapụ Na-agwụ Ike, Nzuzo Anwụọla: ZK-Proofs, Gịnị Ka Ha Dị Mma Maka Ya?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Peeji ndị metụtara ya

- [Egwú Mmiri Ndị E Chebere](/using-zcash/shielded-pools)  Otu esi eji ZK-SNARKs na Zcash uru ọdọ mmiri
- [Halo](/zcash-tech/halo)  Usoro ZK-SNARK nke Zcash nke na-ewepụ ntọala ndị a tụkwasịrị obi
- [Post-Quantum Security na Zcash](/zcash-tech/post-quantum-security) - Olee otú ihe ize ndụ quantum n'ọdịnihu si metụta Zcash cryptography
- [Zcash echebe akụ](/zcash-tech/zcash-shielded-assets)  ZSAs wuru na teknụzụ ZK-SNARK
- [Gịnị bụ ZEC na Zcash](/start-here/what-is-zec-and-zcash)  Okwu Mmalite na Zcash na ụdị nzuzo ya
- [Nchekwa nzuzo dị ka ụkpụrụ bụ isi](/privacy/privacy-as-a-core-principle)  Ihe mere o ji dị mkpa ka e chebe ihe nzuzo ego

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS NKYERƐKYERƐMU

## TL;DR

- **ZK-SNARKs** = Zero-Knowledge Nimdeɛ ho akyinnyegye a ɛyɛ tiawa a ɛnyɛ nkitahodi
- Wɔma ɔfã biako **da no adi sɛ wonim biribi** a wɔanna nsɛm no ankasa adi
- Zcash de ZK-SNARKs di dwuma de kyerɛ sɛ asɛm bi yɛ nokware (sika dodow a ɛteɛ, nsɛm a wɔansɛe no) **a ɛnna nea ɔde kɔmaa, nea ogye, anaa sika dodow adi**
- "Tiatiaa" kyerɛ sɛ adanse no sua na ɛyɛ ntɛm sɛ wobetumi adi ho adanse mpo wɔ nsɛm a ɛyɛ den ho
- Orchard pool no de Halo 2, ZK-SNARK nhyehyɛe a **ɛho nhia sɛ wɔyɛ nhyehyɛe a wotumi de ho to so** na edi dwuma.

---

## Dɛn ne Adanse?

Adanse ne nea wogyina so yɛ akontaabu nyinaa. Adanse yɛ asɛm anaa theorem a worebɔ mmɔden sɛ wobɛda no adi & sequence of derivations made to declare the theorem has been proved. s.e., s.e. anim nyinaa a ɛwɔ ahinanan a ne nyinaa yɛ 180° no, obiara betumi ahwɛ no wɔ ahofadi mu (verifier).

**Adanse ahorow** 

Prover ---> Ɔyɛ Claim ---> Verifier Paw ---> Gye/Pow 

(Prover ne verifier nyinaa yɛ algorithms)

Wɔ kɔmputa ho nyansahu mu no asɛmfua a wɔde frɛ adanse a wotumi di ho adanse yiye ne NP adanse. Wobetumi de polynomial bere adi adanse ntiantiaa yi ho adanse. Adwene a ɛtrɛw no ne sɛ "Ano aduru bi wɔ hɔ ma theorem & wɔde kɔma verifier no sɛ ɔnhwɛ mu".


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


Wɔ NP-kasa mu no = ɛsɛ sɛ tebea abien kura mu: 

Nea edi mũ: Nokware nsɛm no, nea ɔyɛ nokwaredifo begye atom (ɛma wɔn a wɔkyerɛ nokwaredi no kwan ma wodu adansedi ho) .

Nteaseɛ: Atoro nsɛm rennya adanseɛ biara (wɔ nsisi prover strategy nyinaa fam no wɔrentumi nkyerɛ sɛ asɛm a ɛnteɛ no teɛ).


### Nkitahodi & Probabalist Adanse

**Nkitahodi**: Sɛ́ anka ɔbɛkenkan adanse no ara kwa no, nea ɔhwɛ so no ne ɔbenfo bi di nkitaho kɔ anim ne akyi wɔ nkrasɛm ahorow pii mu.

**Randomness**: Verifier abisadeɛ a ɛfa prover ho no yɛ randomized na ɛsɛ sɛ prover tumi bua emu biara yie. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Sɛ yɛde nkitahodi ne randomness bom di dwuma a, ɛyɛ yiye sɛ yɛbɛkyerɛ sɛ wɔka sɛ obi a ɔyɛ anifuraefo a ɔyɛ nokware wɔ Probabilistic Polynomial Time (PPT) mu. 

So Interactive Proofs betumi adi adanse yiye asen NP adanse ahorow?

NP Adanse vs IP adanse:

|  Asɛm a Wɔka |    NP | IP |
|--------------|-----------|--------|
|    NP |  yiw |  yiw |
|    CO-NP |  dabi |  yiw |
|    #P |  dabi |  yiw |
|    PSPACE |  dabi |  yiw |


NP - Ano aduru bi wo ho ma asem bi

CO-NP - a ɛkyerɛ sɛ ano aduru biara nni hɔ ma asɛm bi

#P - Se wobekan ano aduru dodow a ewo asem bi ho

PSPACE - a ɛkyerɛ sɛ nsɛm ahodoɔ a wɔsesa

### Dɛn ne Nimdeɛ a Ɛyɛ Zero?

Nea verifier betumi abu ho akontaa wɔ nkitahodi bi akyi no ne nea wobetumi adi kan ada no adi no yɛ pɛ. Nkitahodi a ɛwɔ rounds pii so wɔ prover & verifier ntam no mmaa verifier no computional tumi nkɔ soro.

**The Simulation Paradigm**

Saa sɔhwɛ yi wɔ hɔ wɔ cryptography nyinaa mu. Ɛde "Adwene Ankasa" & "Nhwɛso a Wɔayɛ no Nsusuwii" kyerɛ. 

Real View: Abakɔsɛm a ebetumi aba nyinaa a ɛfa nkitahodi a ɛda Prover & Verifier (P,V) ntam ho .

Simulated View: Verifier no yɛ nkitahodi a ebetumi aba nyinaa a ɛda Prover & Verifier ntam no ho mfonini 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Polynomial-time distinguisher bɔ mmɔden sɛ ɛbɛkyerɛ sɛ ebia wɔrehwɛ ankasa anaasɛ simulated view na ɛsrɛ nhwɛsode fi abien no nyinaa hɔ mpɛn pii.

Wɔka sɛ adwene mmienu no yɛ "computationally indistinguishable" sɛ wɔ distinguisger algorithms/strategies nyinaa mu no, mpo wɔ akyi a wɔanya polynomial dodoɔ a ɛyɛ samples afiri real anaa simulated mu no, probability no yɛ >1/2. 

**Zero-Nimdeɛ ho akyinnyegye a ɛfa Nimdeɛ ho**

Nkitahodi protocol (P,V) yɛ zero-nimdeɛ sɛ simulator (algorithm) bi wɔ hɔ a ɛbɛma wɔ probabilty polynomial-time verifier biara ho (bere a theorem no teɛ), probability distributions a ɛkyerɛ ankasa fi simulated view no yɛ computationally indistinguishable. 

Interactive Protocols ho wɔ mfaso bere a verifier biako wɔ hɔ. Nhwɛso bi bɛyɛ towtua ho akontaabufo wɔ nimdeɛ a onni ‘towtua ho adanse’ akwammisa krataa mu.

## Dɛn ne SNARK?

**Nimdeɛ ho akyinnyegye a ɛyɛ tiawa a ɛnyɛ nkitahodi**

Nkyerɛaseɛ a ɛtrɛ - Adanse tiawa a ɛkyerɛ sɛ asɛm bi yɛ nokware. Ɛsɛ sɛ adanse no yɛ tiawa na ɛyɛ ntɛm na ama wɔatumi akyerɛ sɛ ɛyɛ nokware. Wɔ SNARKS mu no wɔde nkra biako fi Prover kɔ Verifier. Afei nea ɔhwɛ so no betumi apaw sɛ obegye atom anaasɛ ɔbɛpow. 

nhwɛsoɔ asɛm: "Menim nkra (m) a ɛte sɛ SHA256(m)=0".

Wɔ zk-SNARK mu no adanse no nna biribiara adi wɔ nkrasɛm no ho (m).

**Polynomials**: Nsɛmfua a ɛwɔ daa (te sɛ 1,2,3), nsakraeɛ (te sɛ x,y,z), ne nsakraeɛ (te sɛ x2, y3) ho nkyerɛkyerɛmu a wɔaka abom. 

nhwɛso: "3x2 + 8x + 17".

**Arithmetic Circuit**: Nhwɛsoɔ a wɔde yɛ kɔmputa polynomial. Mpɛn pii no wobetumi akyerɛ ase sɛ Directed Acyclic Graph a wɔ graph no node biara so no wɔyɛ akontaabu adwuma. Ɔmansin no yɛ apon a wɔde ka ho, apon a wɔde dɔɔso ne apon bi a ɛkɔ so daa. Saa ara na Boolean circuits de bits kɔ wires mu no, saa ara na Arithmetic circuits nso kura integers.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

Wɔ saa nhwɛso yi mu no, ɔbofo no pɛ sɛ ɔma nea ɔhwɛ so no gye di sɛ onim akontaabu amansin no ano aduru. 

**Abɔhyɛ ahorow**: Sɛ ɔbɛyɛ eyi a, ɔbofo no de gyinapɛn ahorow (ankorankoro ne ɔmanfo) a ɛbata ɔmansin no ho nyinaa bɛhyɛ bɔhyɛ bi mu. Commitments de wɔn inputs sie denam function a ne output no ntumi nsakra no a wɔde di dwuma so.

Sha256 yɛ nhwɛsoɔ baako a ɛkyerɛ hashing dwumadie a wɔbɛtumi de adi dwuma wɔ commitment scheme mu.

Bere a ɔbofo no de ne ho ahyɛ gyinapɛn ahorow no mu akyi no, wɔde bɔhyɛ ahorow no kɔma ɔhwɛfo (a wɔwɔ ahotoso sɛ wontumi nhu mfitiase gyinapɛn ahorow no biara). Afei ɔbofo no tumi kyerɛ nea ɔhwɛ so no nimdeɛ a ɔwɔ wɔ gyinapɛn ahorow a ɛwɔ graph no node ahorow no so no mu biara ho. 

**Fiat-Shamir Nsakraeɛ**

Sɛnea ɛbɛyɛ a protocol no *non-interactive* prover no ma randomness (a wɔde di dwuma ma hidden challenge) wɔ verifier no ananmu denam cryptographic hash function so. Wonim eyi sɛ random oracle. Afei ɔsɔfo no betumi de nkra biako akɔma nea ɔhwɛ so no a afei obetumi ahwɛ sɛ ɛteɛ. 

Sɛ wobɛhyehyɛ SNARK a wobetumi de adi dwuma ama general circuits a, nneɛma abien na ɛho hia:

Functional commitment scheme: Ɛma committer kwan ma ɔde ne ho to polynomial a ɛwɔ string tiawa a verifier betumi de adi dwuma de asi so dua sɛ wɔakyerɛ sɛ wɔayɛ nhwehwɛmu wɔ committed polynomial no ho.

Polynomial interactive oracle: Verifier bisa prover (algorithm) sɛ ɔmmue bɔhyɛ nyinaa wɔ mmeae ahorow a wɔpɛ denam polynomial commitment scheme & checks identity holds true between them.

**Hyehyɛ**

Setup akwan boa verifier no denam circuit bi a wɔboaboa ano & outputting public parameters so. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Nhyehyɛe ahorow a wɔde di kan yɛ adwuma**:

Trusted Setup per circuit - Ɛyɛ run pɛnkoro wɔ ɔmansin biara mu. Is sepcific to a circuit & ɛsɛ sɛ wɔde kokoam randomness (Common Reference String) sie + sɛe. 

A comprimised setup wɔ saa kwan yi so kyerɛ sɛ ɔbufo a onni nokware betumi adi atoro nsɛm ho adanse. 

Trusted but Universal Setup - Nko na ɛsɛ sɛ ɛyɛ trusted setup pɛnkoro na ɛtumi afei deterministically preprocess circuits pii. 

Transparent Setup (No Trusted Setup)- Preprocessing algorithm no mfa kokoam randomness biara nni dwuma koraa. 


**SNARK adanseɛ adansi ahodoɔ**:

[Nkɔso16](https://www.youtube.com/watch?v=QDplVkyncYQ): Ɛhwehwɛ Trusted Setup nanso ɛwɔ adanse ntiantiaa paa a wobetumi agye atom ntɛmntɛm.

[Sonic a ɛyɛ dɛ](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin na ɔkyerɛwee](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk a ɔyɛ](https://cryptocurrencywiki.org/PLONK): Nhyehyɛe a Wogye Di wɔ Amansan Nyinaa Mu.

[SUM](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK, NKWASƐM](https://www.youtube.com/watch?v=wFZ_YIetK1o): No Trusted Setup nanso ɛma adanse a ɛware kakra anaasɛ ebetumi agye bere tenten ansa na prover atu mmirika. 

SNARKS ho wɔ mfaso bere a wohia verifiers pii te sɛ blockchain te sɛ Zcash anaa zk-Rollup te sɛ [Aztec](https://docs.aztec.network) sɛnea ɛbɛyɛ a ɛho renhia sɛ validating nodes pii di nkitaho wɔ rounds pii mu ne adanse biara. 

## Ɔkwan bɛn so na wɔde zk-SNARK's di dwuma wɔ Zcash mu?

Mpɛn pii no, adanse a nimdeɛ nnim yɛ adwinnade a wɔde hyɛ nokwaredi nneyɛe mu den wɔ protocol ahorow mu a wɔmfa nsɛm biara nkyerɛ. 

Zcash yɛ ɔmanfo blockchain a ɛma ankorankoro nkitahodi yɛ mmerɛw. Wɔde zk-SNARK's di dwuma de kyerɛ sɛ kokoam asɛm bi yɛ adwuma wɔ network consensus mmara no mu a wɔda nsɛm foforo biara adi wɔ asɛm no ho. 

[Video no mu Nkyerɛkyerɛmu](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Wɔ saa ɔkasa yi mu no Ariel Gabizon de nkyerɛkyerɛmu a ɛfa Zcash Note Commitment Tree, Blind Polynomial Evaluation & Homomorphically Hidden Challenges ne sɛnea wɔde di dwuma wɔ network no so ma. 

Kenkan [Halo2 nhoma no](https://zcash.github.io/halo2/index.html) sɛ wopɛ nsɛm pii a.

## Zero-Knowledge Dwumadi Afoforo 

zk-SNARKS ma mfasoɔ ahodoɔ bi wɔ dwumadie ahodoɔ mu. Ma yɛnhwɛ nhwɛso ahorow bi.

**Scalability**: Eyi nam 'Outsourcing Computation' so na ɛba. Ɛho nhia koraa sɛ nimdeɛ a ɛyɛ zero ma L1 nkɔnsɔnkɔnsɔn bi de hwɛ sɛ ɔsom adwuma bi a ɛnyɛ nkɔnsɔnkɔnsɔn no yɛ adwuma. Ɛnyɛ nea ɛkyerɛ sɛ nkitahodi yɛ kokoam wɔ zk-EVM so.

Mfasoɔ a ɛwɔ adanseɛ a egyina Rollup (zk-Rollup) dwumadie so ne sɛ ɛbɛdi batch a ɛyɛ ɔhaha/mpempem pii ho dwuma & L1 no tumi di adanseɛ tiawa bi a ɛkyerɛ sɛ wɔdii nnwuma nyinaa ho dwuma yie, scaling networks transaction throughput by a factor of 100 or 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interoperability**: Eyi yɛ nea wonya wɔ zk-Bridge so denam agyapade a ‘wɔtow’ wɔ source chain so na wɔda no adi kyerɛ target chain no sɛ wɔato agyapade no mu (adanse a ɛkyerɛ sɛ wɔapene so).

**Compliance**: Nnwuma te sɛ [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) wotumi kyerɛ sɛ ankorankoro asɛm bi ne mpɔtam hɔ sikakorabea mmara hyia a wɔmfa asɛm no ho nsɛm nkyerɛ. 

**Fighting Disinformation**: Wɔ nhwɛso ahorow pii a ɛwɔ blockchain & cryptocurrency akyi mu no, adanse awo ntoatoaso a wɔde di dwuma wɔ mfonini ahorow a nsɛm ho amanneɛbɔ & nsɛm ho amanneɛbɔfo adi ho dwuma so na ama ahwɛfo atumi de wɔn ho ahwɛ sɛnea mfonini bi fibea ne dwumadi ahorow a wɔyɛ wɔ so nyinaa. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Adesua Foforo: 

[Zero-Nimdeɛ Nwoma a Wɔahyehyɛ - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK ne Hanh Huynh Huu yɛ adwuma](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 ne SNARKs a enni Setups a Wogye Di - Sean Bowe wɔ Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Nimdeɛ zero Adanse a ɛwɔ Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Nkitahodi Zero-Nimdeɛ Adanse - Chainlink asɛm](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Ɔkasa 1: ZKP Nnianim ne Abakɔsɛm - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Nkyerɛkyerɛmu a Ɛyɛ Mmerewa a Ɛfa Nkontaabu Amansin Ho - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Scalability yɛ Boring, Privacy yɛ Dead: ZK-Adanse, Dɛn na Wɔyɛ Ma?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Nkratafa a Ɛfa Ho

- [Atare a Wɔabɔ ho Ban](/using-zcash/shielded-pools) — Sɛnea wɔde ZK-SNARKs di dwuma wɔ Zcash botae ahorow mu
- [Halo](/zcash-tech/halo) — Zcash ZK-SNARK nhyehyɛe a eyi nhyehyɛe a wogye di fi hɔ
- [Post-Quantum Ahobammɔ wɔ Zcash mu](/zcash-tech/post-quantum-security) - sedee daakye quantum asiane fa Zcash cryptography ho
- [Zcash Shielded Agyapadeɛ](/zcash-tech/zcash-shielded-assets) — ZSA ahorow a wɔasi wɔ ZK-SNARK mfiridwuma so
- [Dɛn ne ZEC ne Zcash](/start-here/what-is-zec-and-zcash) — Zcash ne ne kokoam nsɛm ho nnianim asɛm
- [Kokoamsɛm sɛ Nnyinasosɛm Titiriw](/privacy/privacy-as-a-core-principle) — Nea enti a sikasɛm mu kokoamsɛm ho hia

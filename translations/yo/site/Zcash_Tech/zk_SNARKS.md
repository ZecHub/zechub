<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP àti ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = Ìmòye-kò-Mọ Àwọn Àríyànjiyàn tí kò ní Ìfọ̀rọ̀wérọ̀ ti Ìmọ̀
- Wọ́n jẹ́ kí ẹnì kan fi hàn pé òun mọ nǹkan kan láìjẹ́ pé ó sọ ohun tó wà nínú rẹ̀ fún wọn
- Zcash nlo ZK-SNARKs lati fi idi rẹ mulẹ pe idunadura kan wulo (awọn iye to tọ, awọn ohun elo ti a ko lo) **laisi fifihan oluranlowo, olugba, tabi iye**
- "Succinct" túmọ̀ sí pé ẹ̀rí náà kéré gan-an, ó sì tètè ṣeé ṣètẹ́wọ̀n kódà fún àwọn gbólóhùn tó díjú pàápàá
- The Orchard pool uses Halo 2, a ZK-SNARK system with **no trusted setup required**

---

## Kí Ni Ẹ̀rí?

Proofs are the basis for all mathematics. A proof is a claim or theorem you are trying to prove & sequence of derivations made to declare the theorem has been proved. eg. all angles in a triangle total 180° can be independently checked by anyone (verifier).

Àwọn Ẹ̀rí 

Prov ---> Ṣe Ibeere ---> Oluṣayẹwo Yan ---> Gba/Kọ̀ọ́ 

(Awọn oludari ati olutẹtisi jẹ awọn alugoridimu)

Ninu imọ-ẹrọ kọnputa ọrọ fun awọn ẹri ti o le ṣayẹwo daradara ni awọn ẹrí NP. Awọn ẹri kukuru wọnyi le jẹ idaniloju ni akoko polynomial. Ero gbogbogbo ni "O wa ojutu si theorem kan & o ti kọja si oluṣakoso lati ṣayẹyẹ rẹ"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


Nínú èdè NP = àwọn ipò méjì ní láti ṣẹ: 

Ìmúṣẹ: Olùwádìí yóò gba àwọn àlàyé tó jẹ́ òótọ́ (ó ń jẹ́ kí àwọn olùwádìí tí ó jẹ́ aláìlábòsí dé ìmúṣẹ)

Ìdánilójú: Àwọn ìkéde èké kò ní ní ẹ̀rí kankan (fún gbogbo ọ̀nà tí wọ́n fi ń ṣe àdàkàdekè wọn kò ní lè fi hàn pé àwọn ìkédé tí kò tọ́ jẹ́ òótọ́).


### Àwọn Àrídájú Oníṣiṣẹ́pọ̀ àti Ìṣeéṣe

**Ìfọ̀rọ̀wérọ̀**: Dípò kí ó kàn ka ẹ̀rí náà, olùṣàyẹ̀wò náà ń bá olùṣe àyẹ̀wò lọ sápá iwájú àti sápà iwájú ní oríṣiríṣi ìsọfúnni.

**Randomness**: Àwọn ìbéèrè tí olùṣàyẹ̀wò bá béèrè lọ́wọ́ olùdánilẹ́kọ̀ọ́ ni wọ́n máa ń ṣe lóòrèkóòrè, ẹni tó sì ń dán an wò sì gbọ́dọ̀ lè dáhùn àwọn ìbéèrè náà lọ́nà tó tọ́. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Lílo ìfọwọ́sowọ́pọ̀ àti àìròtẹ́lẹ̀ papọ̀ ó ṣeé ṣe láti fi ẹ̀rí ìdánilójú kan hàn sí olùdánilórúkọsílẹ̀ afọ́jú nínú Àkókò Ọ̀pọ̀lọpọ̀ Ọ̀nà (PPT). 

Ṣé àwọn ẹ̀rí tí ó ń ṣiṣẹ́ pẹ̀lú ara wọn lè ṣe àyẹ̀wò tó kún fún èrè ju ti àwọn ẹ̀rí NP lọ?

Awọn ẹri NP vs awọn ẹri IP:

ì§ ì ¬ì ©í ê ̧°ê±'ë©' NP IP
|--------------|-----------|--------|
NP: Bẹ́ẹ̀ ni.
CO-NP kò rí bẹ́ẹ̀.
#P: kò sí.
PSPACE kò bẹ́ẹ̀ ni


NP - Ìdáhùn sí àlàyé kan wà

CO-NP - Fihan pe ko si awọn iṣeduro si gbólóhùn kan

#P - Lati ka iye awọn solusan ti o wa si gbólóhùn kan

PSPACE - Ṣíṣe àfihàn ìyípadà àwọn gbólóhùn tó yàtọ̀ síra

### Kí ni Ìmọ̀ Àìní?

What a verifier can compute after an interaction is identical to what they could prove prior. The interaction over multiple rounds between the prover & verifier has not increased the computional power of the verifier.

**The Simulation Paradigm**

Ìdánwò yìí wà ní gbogbo ìgbà nínú ẹ̀kọ́ ìkọ̀kọ̀. Ó ńfi "Ìwòye gidi" àti "Ìwoye àfarawé" hàn. 

Real View: Gbogbo àwọn ìtàn tí ó ṣeé ṣe ti ìfọ̀rọ̀wérọ̀ láàrin Prover & Verifier (P,V)

Àwòran tí a ṣe àfarawé: Olùdánilójú náà ń ṣàfarawé gbogbo ìfọ̀rọ̀wérọ̀ tó ṣeé ṣe láàrin Prover & Olùdáa 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Olùyàtọ̀ àkókò polynomial máa ń gbìyànjú láti mọ̀ bóyá ojúlówó tàbí àfarawé ni wọ́n ń wò, ó sì máa ń béèrè fún àwòkọ́ṣe láti ọ̀dọ̀ àwọn méjèèjì léraléra.

The two views are said to be "computationally indistinguishable" if for all distinguisger algorithms/strategies, even after receiving a polynomial number of samples from real or simulated, the probability is >1/2. 

Àwọn Àríyànjiyàn Ìmòye-Kò-ní-Mọ

An interactive protocol (P,V) is zero-knowledge if there exists a simulator (algorithm) such that for every probabilty polynomial-time verifier (when the theorem is correct), the probability distributions determining the real from simulated view are computationaly indistinguishable. 

Awọn Ilana Ibaraẹnisọrọ jẹ wulo nigbati o ba jẹ olutọkasi kan. Apẹẹrẹ kan yoo jẹ oludari owo-ori ni ohun elo 'ẹri ti owo-owo' ti oye odo.

## Kí ni SNARK?

**Èrò tí kò ní ìfọ̀rọ̀wérọ̀ lórí ìmọ̀**

ìtumọ̀ gbòòrò - ẹ̀rí tí ó ṣe ṣókí pé àlàyé kan jẹ́ òtítọ́. ẹ̀jẹ́ náà gbọdọ̀ kúrú kí ó sì yára láti ṣàyẹ̀wò. nínú SNARKS a fi ìsọfúnni kan ṣoṣo ránṣẹ́ láti Prover sí Olùṣàyẹ́wò. Olùṣèwádìí lè wá yàn láti gbà tàbí kọ̀. 

Àpẹẹrẹ gbólóhùn: "Mo mọ ifiranṣẹ kan (m) tí SHA256 ((m) = 0"

Ninu zk-SNARK ẹri naa ko fi ohunkohun han nipa ifiranṣẹ (m).

**Polynomials**: Sums of terms containing a constant (such as 1,2,3), variables (such as x,y,z), and exponents of variables (such as x², y³). 

àpẹẹrẹ: "3x2 + 8x + 17"

**Arithmetic Circuit**: A model for computing polynomials. More generally it can be defined as a Directed Acyclic Graph on which at each node of the graph an arithmetic operation is performed. The circuit consists of addition gates, multiplication gates and some constant gates. In the same way Boolean circuits carry bits in wires, Arithmetic circuits carry integers.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

Nínú àpèjúwe yìí, ẹni tí ó ń ṣe àyẹ̀wò náà fẹ́ kí ẹni tó ń ṣàyẹ̀wò ọ̀rọ̀ náà gbà pé òun mọ ojútùú sí àyíká ìṣirò náà. 

**Commitments**: To do this, the prover will put all of the values (private and public) associated with the circuit into a commitment. Commitments hide their inputs by using a function whose output is irreversible.

Sha256 jẹ́ àpẹẹrẹ kan ti iṣẹ́ ìdìpò tí a lè lò nínú ètò ìfọ̀kànsí.

After the prover commits to the values, the commitments are sent to verifier (being confident they are unable to uncover any of the original values). The prover is then able to show to the verifier knowledge of each of the values on the nodes of the graph. 

Ìyípadà Fiat-Shamir

To make the protocol *non-interactive* the prover generates randomness (used for the hidden challenge) on behalf of the verifier using a cryptographic hash function. This is known as the random oracle. The prover can then send a single message to the verifier who can then check it is correct. 

Lati ṣe agbekalẹ SNARK ti a le lo fun awọn iyipo gbogbogbo, awọn eroja meji ni a nilo:

Functional commitment scheme: Allows a committer to commit to a polynomial with a short string that can be used by a verifier to confirm claimed evaluations of the committed polynomial.

Polynomial interactive oracle: Verifier béèrè prover (algorithm) lati ṣii gbogbo awọn adehun ni orisirisi awọn aaye ti wọn yan nipa lilo eto adehun polynomials ati awọn ayẹwo idanimọ jẹ otitọ laarin wọn.

Ìtòlẹ́sẹẹsẹ

Awọn ilana iṣeto ṣe iranlọwọ fun olutọwo nipa ṣakojọpọ iyipo kan & fifi awọn iṣiro gbangba jade. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Àwọn oríṣi ìmúrasílẹ̀-ìṣelọpọ**:

Trusted Setup per circuit - Is run once per circuit. Is sepcific to a circuit & the secret randomness (Common Reference String) must be kept secret + destroyed. 

Àtòjọ tí a ṣe nínú ọ̀nà yìí túmọ̀ sí wípé olùdánilójú tí kò jẹ́ olóòótọ́ lè fìdí àwọn àlàyé èké múlẹ̀. 

Trusted but Universal Setup - Nikan ni lati ṣiṣe iṣeto ti o gbẹkẹle lẹẹkan ati pe o le lẹhinna ṣe ipinnu iṣaaju awọn iyipo pupọ. 

Ṣiṣeto Transparent (Ko si Iṣeto Igbẹkẹle) - Alugoridimu iṣaju iṣaaju ko lo eyikeyi aṣiri aṣiri rara. 


**Àwọn oríṣi àwọn ìkópa tí kò ní í ṣe pẹ̀lú SNARK**:

[Grọ́ọ̀sì 16]](https://www.youtube.com/watch?v=QDplVkyncYQ): Nilo Iṣeto Igbẹkẹle ṣugbọn o ni awọn ẹri kukuru pupọ ti o le ṣayẹwo ni kiakia.

[Ìró tó ń dún](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK)Ìdásílẹ̀ Tí Gbogbo Èèyàn Gbára Lé.

[ÌDÍLÉ](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Kò sí ìmúrasílẹ̀ tí a gbẹ́kẹ̀lé ṣùgbọ́n ó máa ń mú àwọn ẹ̀rí tó gùn díẹ̀ jáde tàbí ó lè gba àkókò púpọ̀ sí i kí ẹ̀jẹ̀ náà tó ṣiṣẹ́. 

Awọn SNARKS wulo nigbati o ba nilo ọpọlọpọ awọn olutọtọ bii blockchain bi Zcash tabi zk-Rollup bii [Aztec](https://docs.aztec.network) nítorí náà, ọ̀pọ̀lọpọ̀ àwọn òpó ìmúṣẹ kò ní láti ṣe àjọṣepọ̀ pẹ̀lú ẹ̀rí kọ̀ọ̀kan fún ìgbà díẹ̀. 

## Bawo ni Zk-SNARKs ṣe n ṣiṣẹ ni Zcash?

Ni gbogbogbo awọn ẹri-imọ-kukuru jẹ ọpa lati mu ihuwasi otitọ ni awọn ilana laisi fifihan eyikeyi alaye. 

Zcash jẹ blockchain gbangba ti o dẹrọ awọn iṣowo ikọkọ. zk-SNARKs ni a lo lati fi idi rẹ mulẹ pe idunadura aladani jẹ wulo laarin awọn ofin ifọkanbalẹ nẹtiwọọki laisi fifihan eyikeyi awọn alaye miiran nipa idunwo naa. 

[Àwòrán tó ṣàlàyé]](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Ninu ẹkọ yii Ariel Gabizon pese awọn apejuwe ti Igi Iṣeduro Akọsilẹ Zcash, Iyẹwo Polynomial afọju & Awọn ipenija ti o farapamọ Homomorphically ati bi wọn ṣe ṣe imuse wọn lori nẹtiwọọki naa. 

Ka ìwé [Halo2 book](https://zcash.github.io/halo2/index.html) fún ìsọfúnni síwájú sí i.

## Awọn ohun elo Imọ-Imọ-Ohun miiran 

zk-SNARKS pese orisirisi awọn anfani ni orisii ti o yatọ si awọn ohun elo. Jẹ ki a wo diẹ ninu awọn apẹẹrẹ.

**Scalability**: Eleyi ti wa ni aseyori nipa 'Outsourcing Computation'. nibẹ ni ko si to muna nilo fun odo-imọ fun a L1 pq lati ṣayẹwo awọn iṣẹ ti ohun ita-pq iṣẹ. awọn iṣowo ni o wa ko dandan ikọkọ lori a zk-EVM.

The advantage of a proof based Rollup (zk-Rollup) service is to process a batch of hundreds/thousands of transactions & the L1 is able to verify a succinct proof that all transactions were processed correctly, scaling the networks transaction throughput by a factor of 100 or 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


** Interoperability**: Eyi ni a ṣe lori zk-Bridge nipasẹ 'iboju' awọn ohun-ini lori orisun orisun kan ati fifihan si ẹwọn ibi-afẹde ti awọn ohun elo ti wa ni titiipa (ẹri ti ifọkanbalẹ).

** Ìmúṣẹ**: Àwọn iṣẹ́ bíi [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) ó lè fi hàn wípé ìdánwò àdáni bá òfin ilé-ìfowópamọ́ ti àdúgbò mu láìsí wípé ó ń sọ kúlẹ̀kúlẹ̀ ìdánwò náà. 

**Fighting Disinformation**: Among several examples outside of blockchain & cryptocurrency, the use of proof generation on images that have been processed by news & media outlets to enable viewers to independently verify the source of an image and all operations performed on it. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Ìkẹ́kọ̀ọ́ Sí I: 

[Ìwé-ìwé tí kò ní ìmọ̀ kankan - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[ZKSNARK's with Hanh Huynh Huu] [Àwòrán tí wọ́n ṣe fún Hanh Huyú]](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 and SNARKs without Trusted Setups - Sean Bowe on Dystopia labs] [Àkọlé àwòrán: Àjọ tó ń rí sí àyípadà nínú ìṣẹ̀dá]](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Ohun tí kò ní ìmọ̀ kankan fi hàn pé Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Awọn Ẹri-Imọ-Ohun-Ile-iṣẹ - Chainlink article]](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Èdè 1: Ìfilọ́lẹ̀ àti Ìtàn ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Ìtumọ̀ Rírẹ́ẹ̀lì Nípa Àwọn Ẹ̀ka Ìṣirò - Àárín](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Ìmúpọ̀sílẹ̀ Kò Níláárí, Ìpamọ́ Ọkàn Kò Wúlò: Àwọn Àrídájú ZK, Kí Ni Wọ́n Wà fún?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Àwọn ojúewé tó tan mọ́ ọn

- [Àwọn Erékùṣù Tí Wọ́n Fi Ààbò Ṣe](/using-zcash/shielded-pools)  Bawo ni a ṣe nlo ZK-SNARKs ninu awọn iṣupọ iye Zcash
- [Halo](/zcash-tech/halo)  Eto ZK-SNARK ti Zcash ti o yọ awọn iṣeto igbẹkẹle kuro
- [Awọn Post-Quantum Aabo ni Zcash](/zcash-tech/post-quantum-security) - Bawo ni awọn eewu quantum ọjọ iwaju ṣe ni ibatan si crypto Zcash
- [Awọn ohun-ini ti o ni aabo Zcash](/zcash-tech/zcash-shielded-assets)  Awọn ZSA ti a kọ lori imọ-ẹrọ ZK-SNARK
- [Kí ni ZEC àti Zcash?](/start-here/what-is-zec-and-zcash)  Ìfilọ́lẹ̀ sí Zcash àti àwòṣe ìpamọ́ rẹ̀
- [Ìfọ̀kànbalẹ̀ gẹ́gẹ́ bí Ìlànà Pàtàkì](/privacy/privacy-as-a-core-principle)  Ìdí tó fi ṣe pàtàkì láti pa ọ̀rọ̀ ìnáwó mọ́

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS ƑE NUÐEÐEŊUTI

## TL;DR

- **ZK-SNARKs** = Zero-Sidzedze Sidzedze ƒe Nyaʋiʋli Kpuie Siwo Mewɔa Nu Ðekae O
- Wona akpa ɖeka **ɖo kpe edzi be yewonya nane** evɔ womeɖea nyatakakaa ŋutɔ ɖe go o
- Zcash zãa ZK-SNARKs tsɔ ɖoa ​​kpe edzi be asitsatsa aɖe sɔ (ga home siwo sɔ, nyatakaka siwo womezã o) **evɔ meɖea amesi ɖoe ɖa, amesi xɔe, alo ga home fiana o**
- "Kpuie" fia be kpeɖodzia le sue eye woate ŋu aɖo kpe edzi kabakaba le nya sesẽwo gɔ̃ hã gome
- Orchard ƒe ta la zãa Halo 2, si nye ZK-SNARK ɖoɖo si me **mehiã be woawɔ ɖoɖo si dzi woka ɖo o** .

---

## Nukae Nye Kpeɖodzi?

Kpeɖodziwoe nye nusi dzi wotu akɔntabubuwo katã ɖo. Kpeɖodzi nye nya alo nyagbɔgblɔ si nèle agbagba dzem be yeaɖo kpe edzi & ɖoɖo si wowɔ tsɔ ɖe gbeƒãe be woɖo kpe nyagbɔgblɔa dzi. le kpɔɖeŋu me. dzogoe siwo katã le dzogoe etɔ̃ me ƒe ƒuƒoƒo 180° ate ŋu anye esiwo ame sia ame ate ŋu alé ŋku ɖe eŋu le eɖokui si (ɖoɖowɔla).

**Kpeɖodziwo** 

Prover ---> Wɔ Nyabiase ---> Kpeɖodzila Tia ---> Lɔ̃/Gbe 

(Prover kple verifier siaa nye algorithms)

Le kɔmpiutaŋutinunya me la, nya si wozãna na kpeɖodzi siwo ŋu woate ŋu aɖo kpee nyuie enye NP kpeɖodziwo. Woate ŋu aɖo kpe kpeɖodzi kpui siawo dzi le ɣeyiɣi si me wowɔa nu geɖe le me. The broad idea being "Egbɔkpɔnu aɖe li na nyagbɔgblɔ aɖe & wotsɔe yi na kpeɖodziwɔla be wòalé ŋku ɖe eŋu".


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


Le NP-gbe me = ele be nɔnɔme eve nalé: 

Blibodede: Nyateƒetotolawo axɔ nya siwo wogblɔ la to kpeɖodzila gbɔ (eɖea mɔ na kpeɖodziwɔla anukwaretɔwo be woaɖo kpeɖodzinana gbɔ)

Nyateƒenya: Kpeɖodzi aɖeke manɔ alakpanyawo ŋu o (le ametafatafa prover ƒe aɖaŋuwo katã gome la, womate ŋu aɖo kpe nya si mesɔ o ƒe nyateƒenyenye dzi o).


### Kpeɖodzi Siwo Wowɔna Kple Nuwɔwɔ Kple Wo Nɔewo

**Nuwɔwɔ aduadu**: Le esi teƒe be kpeɖodzinu la naxlẽ kpeɖodzia ko la, ewɔa nu kple prover aɖe yia ŋgɔ kple megbe le gbedasi ƒe ƒoƒo geɖe me.

**Randomness**: Verifier ƒe biabia be prover nye randomized eye ele be prover nate ŋu aɖo wo dometɔ ɖesiaɖe ŋu nyuie. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Ne wozã kadodo kple nusiwo dzɔna le vome ɖekae la, anya wɔ be woaɖo kpe nya aɖe si wogblɔ na ŋkuagbãtɔ ƒe kpeɖodzila dzi le Probabilistic Polynomial Time (PPT) me. 

Ðe Interactive Proofs ate ŋu aɖo kpe nu geɖe dzi nyuie wu NP proofs?

NP Kpeɖodziwo vs IP kpeɖodziwo:

|  Nyagbɔgblɔ |    NP | IP |
|--------------|-----------|--------|
|    NP |  ẽ |  ẽ |
|    CO-NP ƒe ƒuƒoƒo |  ao |  ẽ |
|    #P |  ao |  ẽ |
|    PSPACE |  ao |  ẽ |


NP - Nya aɖe gbɔkpɔnu li

CO-NP - Eɖo kpe edzi be egbɔkpɔnu aɖeke meli na nya aɖe o

#P - Be woaxlẽ egbɔkpɔnu nenie li na nyagbɔgblɔ aɖe

PSPACE - Nya vovovowo ƒe tɔtrɔ ɖe wo nɔewo ŋu ƒe kpeɖodzi

### Nukae Nye Sidzedze Zero?

Nusi kpeɖodziwɔla ate ŋu abu akɔnta le kadodo aɖe megbe la sɔ kple nusi woate ŋu aɖo kpe edzi do ŋgɔ. Nuwɔwɔ aduadu le ƒoƒo geɖe me le prover & verifier dome medzi akɔntabubu ƒe ŋusẽ si le verifier la ŋu ɖe edzi o.

**Simulation Paradigm la**

Dodokpɔ sia li le nya ɣaɣlawo ƒe nyatakakawo katã me. Eɖea "Nukpɔkpɔ Nyateƒetɔ" & "Nukpɔkpɔ si Wowɔ abe Ðekae" fiana. 

Nukpɔkpɔ Nyateƒetɔ: Ŋutinya siwo katã ate ŋu anɔ Prover & Verifier (P,V) dome ƒe kadodowo ŋu

Simulated View: Dzesidela la srɔ̃a kadodo siwo katã ate ŋu anɔ Prover & Verifier dome 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Polynomial-time vovototodeameme dzea agbagba be yeanya nenye be wole ŋku lém ɖe nukpɔkpɔ ŋutɔŋutɔ alo esi wowɔ abe ɖe wole nukpɔkpɔ ene ŋu eye wòbiaa kpɔɖeŋu tso wo ame evea siaa gbɔ enuenu.

Wogblɔ be nukpɔsusu eveawo be "womateŋu ade vovototo wo dome le akɔntabubu me o" ne le vovototodedeameme ƒe akɔntabubuwo/mɔnuwo katã gome la, le kpɔɖeŋuwo ƒe xexlẽme si nye polynomial xɔxɔ tso nyateƒe alo esiwo wowɔ abe ɖe wole ene megbe gɔ̃ hã la, kakaɖedzia nye >1/2. 

**Zero-Sidzedze Nyaʋiʋliwo le Sidzedze ŋu**

Nuwɔwɔ aduadu ƒe ɖoɖowɔɖi (P,V) nye zero-sidzedze ne simulator (algorithm) li ale be le kakaɖedzi ƒe polynomial-ɣeyiɣi ƒe kpeɖodzinala ɖesiaɖe gome (ne nukpɔsusua sɔ), kakaɖedzimama siwo dea dzesi nu ŋutɔŋutɔ tso simulated view me la nye esiwo womate ŋu ade vovototo wo dome le akɔntabubu me o. 

Interactive Protocols ɖea vi ne kpeɖodzinu ɖeka li. Kpɔɖeŋu aɖe anye adzɔxexe ŋuti agbalẽdzikpɔla le ‘adzɔxexe ƒe kpeɖodzi’ ƒe dɔbiagbalẽvi si me sidzedze zero le me.

## Nukae nye SNARK?

**Sidzedze Ŋuti Nyaʋiʋli Kpuie si Mewɔa Nu Kple Wo Nɔewo O**

Gɔmesese gbadzaa - Kpeɖodzi kpui aɖe be nya aɖe nye nyateƒe. Ele be kpeɖodzia nanɔ kpuie eye wòawɔ kabakaba hafi woate ŋu aɖo kpe edzi. Le SNARKS me la, woɖoa gbedasi ɖeka tso Prover gbɔ yi Verifier gbɔ. Emegbe amesi ɖo kpe edzi ate ŋu atiae be yeaxɔe alo agbe. 

kpɔɖeŋu nyagbɔgblɔ: "Menya gbedasi (m) ale be SHA256(m)=0".

Le zk-SNARK me la, kpeɖodzia meɖea naneke fiana tso gbedasi (m) la ŋu o.

**Polynomials**: Nya siwo me nusi nɔa anyi ɖaa (abe 1,2,3), tɔtrɔwo (abe x,y,z), kple tɔtrɔwo ƒe xexlẽdzesiwo (abe x2, y3 ene) ƒe ƒuƒoƒo. 

kpɔɖeŋu: "3x2 + 8x + 17".

**Akɔntabubu ƒe nutome**: Kpɔɖeŋu si wotsɔ wɔa akɔntabubu le xexlẽdzesi gbogbowo ŋu. Le go geɖe me la, woate ŋu aɖe egɔme be enye Directed Acyclic Graph si dzi wowɔa akɔntabubu ƒe dɔwɔwɔ le graph la ƒe node ɖesiaɖe dzi. Nutome suea nye agbo siwo wotsɔ kpe ɖe wo nɔewo ŋu, agbo siwo dzi wodzina ɖo kple agbo aɖewo siwo nɔa anyi ɖaa. Alesi Boolean nutome suewo tsɔa bit siwo le ka me la, nenema ke Akɔntabubu ƒe nutome suewo hã tsɔa xexlẽdzesi blibowo.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

Le kpɔɖeŋu sia me la, lodola la di be yeana amesi ɖo kpe edzi naxɔe ase be yenya akɔntabubu ƒe nutome suea gbɔ kpɔnu. 

**Adzɔgbeɖeɖe**: Be woawɔ esia la, lodola la atsɔ dzidzenu siwo katã (ame ŋutɔ tɔ kple dukɔa tɔ) siwo do ƒome kple nutome suea ade adzɔgbeɖeɖe me. Adzɔgbeɖeɖewo ɣlaa woƒe nyawo to dɔwɔwɔ si ƒe emetsonu nye esi womate ŋu atrɔ o zazã me.

Sha256 nye hashing dɔwɔwɔ ƒe kpɔɖeŋu ɖeka si woateŋu azã le ɖokuitsɔtsɔna ƒe ɖoɖo me.

Ne prover la tsɔ eɖokui na asixɔxɔawo vɔ la, woɖoa adzɔgbeɖeɖeawo ɖe ɖaseɖiɖila (kakaɖedzitɔe be yewomate ŋu ake ɖe asixɔxɔ gbãtɔawo dometɔ aɖeke ŋu o). Emegbe lodola la te ŋu ɖea asixɔxɔ siwo le nɔnɔmetata la ƒe nugbɔwo dzi dometɔ ɖesiaɖe ƒe sidzedze fiana kpeɖodziwɔla. 

**Fiat-Shamir ƒe Tɔtrɔ**

Be ɖoɖowɔɖia nanye *non-interactive* prover la wɔa randomness (si wozãna na kuxi ɣaɣla la) ɖe verifier la teƒe to cryptographic hash function zazã me. Woyɔa esia be nyagblɔɖila si wogblɔna le vome. Emegbe dodokpɔwɔla ate ŋu aɖo gbedasi ɖeka ɖe ɖaseɖila si ate ŋu akpɔe ɖa be esɔ. 

Be woawɔ SNARK si woate ŋu azã na nutome suewo katã la, ele be woawɔ nu eve:

Dɔwɔwɔ ƒe ɖokuitsɔtsɔna ƒe ɖoɖo: Enaa mɔ na ɖokuitsɔtsɔnala be wòatsɔ eɖokui ana ɖe xexlẽdzesi gbogbo aɖe si me ka kpui aɖe le si kpeɖodziwɔla ate ŋu azã atsɔ aɖo kpe xexlẽdzesi gbogbo si wotsɔ ɖokuitsɔtsɔna ƒe dodokpɔ siwo wogblɔ be wowɔ dzi.

Polynomial interactive oracle: Verifier bia tso prover (algorithm) si be wòaʋu ŋugbedodowo katã le teƒe vovovo siwo wotia to polynomial commitment scheme zazã me & léa ŋku ɖe identity holds true between them.

**Ɖo anyi**

Setup ɖoɖowo kpena ɖe verifier to nutome sue aɖe kpuie & dutoƒo parameters dodo. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Ðoɖowɔwɔ do ŋgɔ ƒe dɔwɔwɔ ƒe ƒomeviwo**:

Trusted Setup per circuit - Woƒua du zi ɖeka le nutome ɖesiaɖe me. Is sepcific to a circuit & adzame randomness (Common Reference String) ele be woatsɔ aɣla + atsrɔ̃. 

A comprimised setup le mɔnu sia me fia be lodododzikpɔla maɖianukware ate ŋu aɖo kpe alakpanyawo dzi. 

Kakaɖedzi gake Xexeame Katã ƒe Ðoɖo - Ðeko wòle be wòawɔ ɖoɖo si dzi woka ɖo zi ɖeka eye wòte ŋu emegbe deterministically preprocess circuit geɖewo. 

Transparent Setup (No Trusted Setup)- Preprocessing algorithm mezãa adzame randomness aɖeke kura o. 


**SNARK kpeɖodzi xɔtutu ƒomeviwo**:

[Tsitsi16](https://www.youtube.com/watch?v=QDplVkyncYQ): Ebia Setup si Dzi Woka Ðo gake kpeɖodzi kpui ŋutɔ siwo woate ŋu aɖo kpee kaba le esi.

[Sonic ƒe gbeɖiɖi](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin ƒe ŋkɔ](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk ƒe dɔwɔwɔ](https://cryptocurrencywiki.org/PLONK): Ðoɖo si Dzi Woka Ðo Le Xexeame Katã.

[NYRƆ](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK ƑE NUÐEÐEŊUTI](https://www.youtube.com/watch?v=wFZ_YIetK1o): No Trusted Setup gake ewɔa kpeɖodzi siwo didi vie alo ate ŋu axɔ ɣeyiɣi didi hafi prover naƒu du. 

SNARKS ɖea vi ne wohiã kpeɖodzinu geɖewo abe blockchain abe Zcash alo zk-Rollup abe [Aztec ene](https://docs.aztec.network) ale be mehiã be node geɖewo nawɔ nu aduadu le ƒoƒo geɖe me kple kpeɖodzi ɖesiaɖe o. 

## Aleke wowɔa zk-SNARK ƒe dɔwɔwɔ le Zcash me?

Zi geɖe la, sidzedze zero-sidzedze ƒe kpeɖodziwo nye dɔwɔnu si wotsɔ zi anukwareɖiɖi ƒe nuwɔna dzi le ɖoɖowɔɖiwo me evɔ womaɖe nyatakaka aɖeke afia o. 

Zcash nye dutoƒo blockchain si naa ame ŋutɔ ƒe asitsatsa nɔa bɔbɔe. Wozãa zk-SNARK's tsɔ ɖoa ​​kpe edzi be ame ŋutɔ ƒe asitsatsa sɔ le network ƒe nubabla ƒe sewo me evɔ womeɖea nyatakaka bubu aɖeke ɖe go tso asitsatsa la ŋu o. 

[Video me Numeɖela](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Le nuƒo sia me la Ariel Gabizon na numeɖeɖewo tso Zcash Note Commitment Tree, Blind Polynomial Evaluation & Homomorphically Hidden Challenges kple alesi wowɔa woe le network la dzi. 

Xlẽ [Halo2 ƒe agbalẽa](https://zcash.github.io/halo2/index.html) hena nyatakaka bubuwo.

## Zero-Sidzedze Dɔwɔnu Bubuwo 

zk-SNARKS naa viɖe geɖe le dɔwɔwɔ vovovo vovovowo me. Na míalé ŋku ɖe eƒe kpɔɖeŋu aɖewo ŋu.

**Scalability**: Esia nye nusi wowɔna to 'Akɔntabubu si wotsɔna naa ame bubuwo' me. Mehiã vevie be woanya zero-sidzedze na L1 kɔsɔkɔsɔ be woatsɔ aɖo kpe dɔwɔwɔ si mele kɔsɔkɔsɔ me o ƒe dɔwɔwɔ dzi o. Adzɔnuwo menye ame ŋutɔ tɔ kokoko le zk-EVM dzi o.

Viɖe si le kpeɖodzi si wotu ɖe Rollup (zk-Rollup) subɔsubɔdɔ ŋue nye be wòawɔ dɔ tso asitsatsa alafa/akpe geɖe ƒe hatsotso aɖe ŋu & L1 te ŋu ɖoa kpe kpeɖodzi kpui aɖe dzi be wowɔ asitsatsaawo katã nyuie, eye wòdzia ​​networks ƒe asitsatsa ƒe dɔwɔwɔ ɖe edzi to xexlẽme si nye 100 alo 1000 dzi.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interoperability**: Esia nyea nusi wowɔna le zk-Bridge dzi to ‘locking’ nunɔamesiwo le dzɔtsoƒe kɔsɔkɔsɔ dzi eye woɖo kpe edzi na taɖodzinu kɔsɔkɔsɔ be wotu nunɔamesiawo (kpeɖodzi si ɖee fia be wolɔ̃ ɖe edzi).

**Sedziwɔwɔ**: Dɔwɔnawo abe [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) te ŋu ɖoa kpe edzi be ame ŋutɔ ƒe asitsatsa aɖe wɔ ɖeka kple nutoa me gadzraɖoƒewo ƒe sewo evɔ womeɖea asitsatsa la ŋuti nyatakakawo fiana o. 

**Avuwɔwɔ kple Nyatakaka Totro**: Le kpɔɖeŋu geɖe siwo le blockchain & cryptocurrency godo dome la, kpeɖodzi dzidzi zazã ɖe nɔnɔmetata siwo ŋu nyadzɔdzɔwo & nyadzɔdzɔdɔwɔƒewo trɔ asi le dzi be wòana nukpɔlawo nate ŋu aɖo kpe nɔnɔmetata aɖe ƒe dzɔtsoƒe kple dɔwɔwɔ siwo katã wowɔ ɖe edzi la dzi le wo ɖokui si. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Nusɔsrɔ̃ Bubuwo: 

[Zero-Sidzedze ƒe Agbalẽwo ƒe xexlẽdzesi - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK ƒe kple Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 kple SNARKs siwo me Ðoɖo Siwo Dzi Woka Ðo mele o - Sean Bowe le Dystopia dodokpɔxɔwo me](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Sidzedze zero Kpeɖodziwo kple Avi Wigderson - Xexlẽdzesiwo lɔ̃la](https://youtu.be/5ovdoxnfFVc)

[Nuwɔwɔ aduadu ƒe Sidzedze Zero-Kpeɖodziwo - Chainlink nyati](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Nuƒoƒo 1: ZKP ƒe ŋgɔdonya kple ŋutinya - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Akɔntabubu ƒe Nutome Gãwo Ŋuti Numeɖeɖe Blewu - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Scalability nye Boring, Privacy is Dead: ZK-Kpeɖodziwo, Nukae Wonyo na?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Axa Siwo Do Ƒome Kplii

- [Ta Siwo Wotsɔ Akpoxɔnu Wɔe](/using-zcash/shielded-pools) — Alesi wozãa ZK-SNARKs le Zcash ƒe asixɔxɔ ƒe ƒuƒoƒo me
- [Halo](/zcash-tech/halo) — Zcash ƒe ZK-SNARK ɖoɖo si ɖea ɖoɖo siwo dzi woka ɖo ɖa
- [Dedienɔnɔ le Quantum megbe le Zcash me](/zcash-tech/post-quantum-security) - Alesi etsɔme quantum afɔkuwo do ƒome kple Zcash cryptography
- [Zcash ƒe Nunɔamesi Siwo Wokpɔna](/zcash-tech/zcash-shielded-assets) — ZSA siwo wotu ɖe ZK-SNARK mɔ̃ɖaŋununya dzi
- [Nukae nye ZEC kple Zcash](/start-here/what-is-zec-and-zcash) — Zcash kple eƒe ameŋunyatakakawo ŋuti kpɔɖeŋu ƒe ŋgɔdonya
- [Ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ abe Gɔmeɖose Vevi aɖe ene](/privacy/privacy-as-a-core-principle) — Nusita ganyawo ŋuti nyatakakawo tsɔtsɔ aɣla le vevie

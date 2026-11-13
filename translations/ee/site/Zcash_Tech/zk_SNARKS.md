<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **zk-SNARKs** = Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge
- Woɖe mɔ na ame aɖe **wòaɖe kpe be ye nya nu aɖe** ne wòmegblɔ nya la ŋutɔ o
- Zcash zã zk-SNARKs be wòaɖe kpe be gaɖoɖo aɖe le nyuie (ga ƒe hãhãwo le nyuie, ga siwo wometsɔ zu o) **ke wòmegblɔ ame si dɔ ga la, ame si xɔe la, alo ga ƒe home o**
- "Succinct" fia be ɖaseɖigbalɛ la sue ŋutɔ eye wòle bɔbɔe be woatsɔ akpɔe ɖe asi, ke ne nyawo le sesĩe hã
- Orchard gaƒuƒoƒo zã Halo 2, si nye zk-SNARK ƒe ɖoɖo si me mɔ̃ ƒe ɖoɖo xexlẽnuwo mele be woahiã o

---

## Nu ka nye ɖaseɖigbalɛ?

Ɖaseɖigbalɛwo nye matematiki katã ƒe gɔme. Ɖaseɖigbalɛ nye nya si wòdi be nàɖe kpe na alo teorem, kple nyawo ƒe ɖeɖe wɔwɔ si wozã be woagblɔ be woɖe kpe na teorem la. Amedzro aɖe kaɖe ate ŋu akpɔe ɖe asi be, le kpɔtɔ aɖe me, anglewo katã ƒe xexlẽme nye 180° (ame si kpɔa nu ɖe asi).

**Ɖaseɖigbalɛwo** 

Ame si ɖea kpe ---> Gblɔ nya ---> Ame si kpɔa nu ɖe asi tia ---> Xɔe/Agbe o 

(Ame si ɖea kpe kple ame si kpɔa nu ɖe asi la woƒe eve nye algorithmwo)

Le kɔmpiuta ƒe nusrɔ̃me me la, woyɔ ɖaseɖigbalɛwo siwo woate ŋu akpɔ ɖe asi enumake be wonye NP ɖaseɖigbalɛwo. Woate ŋu akpɔ ɖaseɖigbalɛ kpuie siawo ɖe asi le polynomial ƒe ɣeyiɣi me. Gɔme vevi lae nye be "Fifi la, fɔfɔ aɖe le teorem aɖe ŋu eye woɖo fɔfɔ la ɖe ame si kpɔa nu ɖe asi la ŋu be wòakpɔe ɖe asi"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


Le NP-gbegbe me la, ɖoɖo eve siawo katã mele be woava eme: 

Completeness: Woaxɔ nyagblɔɖiwo siwo nye nyateƒe la (esia na ame siwo ɖea kpe le nyateƒe me la be woava ɖeɖeɖe eme)

Soundness: Ɖaseɖigbalɛ aɖeke manɔ nyagblɔɖi siwo nye alakpa ŋu o (le mɔ sia mɔ sia si ame si di be wòanɔ aɖaŋu atsa la, mate ŋu aɖe kpe be alakpa ƒe nyagblɔɖi aɖe nye nyateƒe o).


### Ɖaseɖigbalɛ si me woaɖo nu kple Ɖaseɖigbalɛ si dze ɖe nasiaɖi ŋu

**Nuɖoɖo**: Le ɖaseɖigbalɛ la ƒe xexle ko gbɔ o la, ame si kpɔa nu ɖe asi la doa nu kple ame si ɖea kpe la va yi le duɖoɖowo ƒe akpa geɖe me.

**Nasiaɖi**: Ame si kpɔa nu ɖe asi ƒe biabiawo na ame si ɖea kpe la tsoa nasiaɖi me, eye ame si ɖea kpe la mele be wòaɖo ŋu na wo dometɔ ɖe sia ɖe nyuie. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Ne wotsɔ nuɖoɖo kple nasiaɖi wɔ dɔ ɖekae la, woate ŋu aɖe kpe na nyagblɔɖi aɖe na ame si kpɔa nu ɖe asi si mekpena o le Probabilistic Polynomial Time (PPT) me. 

Ɖaseɖigbalɛ si me woaɖo nu ate ŋu akpɔ nu geɖe ɖe asi nyuie wu NP ɖaseɖigbalɛwoa?

NP Ɖaseɖigbalɛwo kple IP ɖaseɖigbalɛwo:

|  Nyagblɔɖi   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  ɛ̃        |  ɛ̃   |
|    CO-NP     |  ao       |  ɛ̃   |
|    #P        |  ao       |  ɛ̃   |
|    PSPACE    |  ao       |  ɛ̃   |


NP - Fɔfɔ aɖe le nyagblɔɖi aɖe ŋu

CO-NP - Ɖeɖe kpe be fɔfɔ aɖeke mele nyagblɔɖi aɖe ŋu o

#P - Xexlẽ be fɔfɔ nenie le nyagblɔɖi aɖe ŋu

PSPACE  - Ɖeɖe kpe na nyagblɔɖi vovovowo ƒe ɖoɖo

### Nu ka nye Zero Knowledge?

Nu si ame si kpɔa nu ɖe asi la ate ŋu akpɔ le nuɖoɖo megbe la sɔ kple nu si wòate ŋu aɖe kpe na hafi nuɖoɖo la dze egɔme. Nuɖoɖo si va yi le duwo geɖe me le ame si ɖea kpe kple ame si kpɔa nu ɖe asi dome la medze ame si kpɔa nu ɖe asi la ƒe kɔmpiuta ŋusẽ yi dzi o.

**Paradigm ƒe Simulation**

Nunu sia le cryptography blibo me. Eɖea "Nukpɔkpɔ Vavã" kple "Nukpɔkpɔ si Woɖe Wɔ" fia. 

Nukpɔkpɔ Vavã: Ŋutinya siwo katã ate ŋu anɔ nuɖoɖowo ŋu le Ame si Ɖea Kpe kple Ame si Kpɔa Nu Ɖe Asi (P,V) dome

Nukpɔkpɔ si Woɖe Wɔ: Ame si kpɔa nu ɖe asi la ɖea nuɖoɖo siwo katã ate ŋu anɔ le Ame si Ɖea Kpe kple Ame si Kpɔa Nu Ɖe Asi dome wɔ 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Polynomial-time distinguisher aɖe doa ŋusẽ be yeadze sii be ɖe ye kpɔa nukpɔkpɔ vavã alo nukpɔkpɔ si woɖe wɔ, eye wòbia kpɔɖeŋu tso wo evea siaa gbɔ zi geɖe.

Wogblɔ be nukpɔkpɔ evea "wo sɔ le kɔmpiuta ƒe akpa me" ne distinguisher algorithms/strategies katã la, ke esi woxɔ kpɔɖeŋu polynomial ƒe xexlẽme tso vavã alo nukpɔkpɔ si woɖe wɔ me hã la, dzidzɔ be wòaɖo to >1/2. 

**Zero-Knowledge Ɖeɖe Kpe Na Nyanya**

Nuɖoɖo si me woaɖo nu (P,V) nye zero-knowledge ne simulator (algorithm) aɖe le afi ma, ale be na probabilty polynomial-time ame si kpɔa nu ɖe asi siaa (ne teorem la nye nyateƒe), dzidzɔ ƒe mama siwo tso nukpɔkpɔ vavã kple nukpɔkpɔ si woɖe wɔ me ƒe mama me la sɔ le kɔmpiuta ƒe akpa me. 

Nuɖoɖo siwo me woaɖo nu la wɔnɛ nyuie ne ame ɖeka ko kpɔa nu ɖe asi. Kpɔɖeŋu aɖe nye duƒe ƒe takisi ƒe kpɔla le zero-knowledge "takisi ƒe ɖaseɖigbalɛ" ƒe application aɖe me.

## Nu ka nye SNARK?

**Succinct Non-Interactive Argument of Knowledge**

Gɔme ga - Ɖaseɖigbalɛ kpuie be nyagblɔɖi aɖe nye nyateƒe. Ɖaseɖigbalɛ la mele be wòanye kpuie eye wòakpɔe ɖe asi kaba. Le SNARKS me la, woɖoa duɖoɖo ɖeka tso Ame si Ɖea Kpe gbɔ na Ame si Kpɔa Nu Ɖe Asi. Emegbe, ame si kpɔa nu ɖe asi la ate ŋu atia be yeaxɔe alo wòagbe. 

Nyagblɔɖi ƒe kpɔɖeŋu: "Menya duɖoɖo (m) aɖe si le SHA256(m)=0"

Le zk-SNARK me la, ɖaseɖigbalɛ la megblɔ naneke tso duɖoɖo (m) la ŋu o.

**Polynomials**: Nya siwo ƒe ƒoƒo le, siwo me constant (abe 1,2,3 ene), variables (abe x,y,z ene), kple variables ƒe exponents (abe x², y³ ene) le. 

Kpɔɖeŋu: "3x² + 8x + 17"

**Arithmetic Circuit**: Ɖoɖo aɖe si wo zãa be woabu polynomials. Le gɔme gã me la, woate ŋu aɖe egɔme be enye Directed Acyclic Graph si ƒe node siaa dzi la, wo wɔa arithmetic ƒe dɔ aɖe. Circuit la ƒe akpae nye gates siwo kpena nu, gates siwo wɔa nu vevie, kple constant gates aɖewo. Abe ale si Boolean circuits tsɔa bits kplɔa mɔ dzi ene la, Arithmetic circuits tsɔa integers kplɔa mɔ dzi.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

Le kpɔɖeŋu sia me la, ame si ɖea kpe la di be yeakpɔ ame si kpɔa nu ɖe asi la ɖe edzi be yenya arithmetic circuit la ƒe fɔfɔ aɖe.  

**Adzɔgbeɖeɖewo**: Be wòawɔ esia la, ame si ɖea kpe la ade asixɔxɔwo katã (siwo le ɣaɣla kple siwo le ƒe dzeɖeɖe) siwo kplɔ circuit la ƒe mɔ la ɖe adzɔgbeɖeɖe aɖe me. Adzɔgbeɖeɖewo zia woƒe nusiwo wotsɔ ge eme la ɣla to function aɖe si ƒe nusi va do me la megatrɔ o.

Sha256 nye hashing function ƒe kpɔɖeŋu aɖe si woate ŋu azã le adzɔgbeɖeɖe ƒe ɖoɖo me.

Ne ame si ɖea kpe la de asixɔxɔwo ɖe adzɔgbeɖeɖe me vɔ la, woɖoa adzɔgbeɖeɖewo ɖe ame si kpɔa nu ɖe asi la ŋu (esi woka ɖe edzi be womate ŋu aɖe asixɔxɔ gɔmedzeƒewo dometɔ aɖeke afia o). Emegbe, ame si ɖea kpe la ate ŋu aɖe fia ame si kpɔa nu ɖe asi la be yenya asixɔxɔ siaa si le graph la ƒe nodewo dzi. 

**Fiat-Shamir Transform**

Be woawɔ protocol la *manɔ nuɖoɖo me o* la, ame si ɖea kpe la wɔa nasiaɖi (si wo zã na challenge si woɣla) ɖe ame si kpɔa nu ɖe asi la teƒe to cryptographic hash function aɖe zazã me. Esiae woyɔna be random oracle. Emegbe, ame si ɖea kpe la ate ŋu aɖo duɖoɖo ɖeka ɖe ame si kpɔa nu ɖe asi la ŋu, eye ema ate ŋu akpɔe ɖe asi be ele nyuie. 

Be woawɔ SNARK si woate ŋu azã na circuits gbogblɔ katã la, ele be nu eve nanɔ:

Functional commitment scheme: Ena ame si dea nu ɖe adzɔgbeɖeɖe me la mɔ be wòade polynomial aɖe ɖe ka kpuie aɖe me, si ame si kpɔa nu ɖe asi la ate ŋu azã be wòakpɔ polynomial si woɖe adzɔgbeɖeɖe na ƒe evaluation si wogblɔ la ɖe asi.

Polynomial interactive oracle: Ame si kpɔa nu ɖe asi la bia be ame si ɖea kpe (algorithm) la na woaʋu adzɔgbeɖeɖewo katã afia le teƒe vovovowo si wòtia me to polynomial commitment scheme la me, eye wòakpɔe ɖe asi be identity la le nyateƒe.

**Ɖoɖo**

Ɖoɖo ƒe mɔwo kpena ɖe ame si kpɔa nu ɖe asi la ŋu to circuit aɖe ƒe kɔkɔe kple parameters siwo katã ate ŋu akpɔ la ƒe tata me. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Pre-processing ƒe ɖoɖo ƒomeviwo**:

Mɔ̃ ƒe ɖoɖo xexlẽnuwo na circuit sia sia - Wɔe vovo na circuit sia sia. Common reference string (CRS) si tsoe me la me duɖuɖu si le amesiwo wɔa ɖaseɖigbalɛ kple amesiwo kpɔa ɖaseɖigbalɛ ɖa la ƒe zazã me. Mɔ̃ ƒe ɖoɖo ƒe nu si le titina ("toxic waste"), menye CRS o, wòle be woaɣla eye woatsrɔ̃e. ECC ƒe [duɖuɖu si le amesiwo katã ŋu ƒe gɔmeɖeɖe](https://zodl.com/snark-parameters/) ɖe vovototo si le wo eve ma dome fia.

Ne woɖe asi ɖe asiri me ƒe ɖoɖo xexlẽnuwo si woɖo ɖi hia la dzi alo woɖu eƒe gɔme la, ame si ɖea ɖaseɖigbalɛ si menya dzɔdzɔe o ate ŋu awɔ ɖaseɖigbalɛ na alakpa ƒe nyagblɔɖiwo. Le MPC ƒe kɔnu me la, dedienyenye ate ŋu azɔ ɖe edzi be ame aɖe le wo dome to mɔɖoɖo la dzi eye wògbã eƒe asiri me ƒe akpa.

Mɔ̃ ƒe ɖoɖo xexlẽnuwo [trusted setup] si le na katã - Mɔ̃ ƒe ɖoɖo xexlẽnuwo ɖeka koe hea parameterwo si woate ŋu azã atsɔ ana ɖaseɖigbalɛ wɔwɔ kple ɖaseɖe keys na circuits geɖe siwo le size siwo wodoa alɔ la me. Esia hã le gbe le be woatsrɔ̃ ɣaɣla; universal menye be nuwo ƒe ʋuʋuɖi o.

Nuwo ƒe ʋuʋuɖi ƒe ɖoɖo (mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o) - Dukɔƒe parameterwo ate ŋu woawɔ wo ne ame aɖeke meshiã be woakpɔ dzɔgbe be wòatsrɔ̃ dzɔgbenyenye ƒe ɖoɖo trapdoor aɖe o. Eya menye be ɖaseɖigbalɛɖeɖe mezãa nasiaɖi o alo be system la mekpɔ dukɔƒe parameterwo o. [Halo 2 book](https://zcash.github.io/halo2/background/pc-ipa.html#setup) naa dukɔƒe group parameterwo ƒe kpɔɖeŋu.


**SNARK ɖaseɖigbalɛ ƒe ɖoɖo ƒomeviwo**:

[Groth16](https://eprint.iacr.org/2016/260): Ehia Mɔ̃ ƒe Ɖoɖo Xexlẽnuwo, ke eƒe ɖaseɖigbalɛwo kpuie ŋutɔ eye woate ŋu akpɔ wo ɖe asi kaba.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953): Mɔ̃ ƒe Ɖoɖo Xexlẽnuwo si Le na Katã.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Mɔ̃ ƒe Ɖoɖo Xexlẽnuwo Menye Mahiã O, ke wowɔa ɖaseɖigbalɛ siwo didi vie wu alo woate ŋu ahia ɣeyiɣi geɖe na ame si ɖea kpe be wòawɔe. 

SNARKS wɔnɛ nyuie ne ame geɖe kpɔa nu ɖe asi, abe gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu abe Zcash ene alo zk-Rollup abe [Aztec](https://docs.aztec.network) ene, ale be ɣaɣla dzesi ŋɔŋlɔ siwo kpɔa nu ɖe asi geɖe la mele be woaɖo nu le duwo geɖe me kple ɖaseɖigbalɛ siaa o. 

## Aleke wozã zk-SNARK le Zcash me?

Le gbogblɔ me la, zero-knowledge ɖaseɖigbalɛwo nye dɔwɔnu si wozãa be woakpe ɖe dzɔdzɔe ƒe nɔnɔ ŋu le protocols me ke womagblɔ nyatakakawo o. 

Zcash nye gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu si le ƒe dzeɖeɖe me si ɖea mɔ na gaɖoɖowo siwo le ɣaɣla. Wozã zk-SNARK be woaɖe kpe be gaɖoɖo si le ɣaɣla le nyuie le network la ƒe gbegbɔgblɔ ɖi ƒe sewo nu, ke womagblɔ nyatakaka bubu aɖeke tso gaɖoɖo la ŋu o. 

[Video ƒe Gɔmeɖeɖe](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Le nusrɔ̃ƒe sia me la, Ariel Gabizon ɖea Zcash Note Commitment Tree, Blind Polynomial Evaluation kple Homomorphically Hidden Challenges ƒe gɔme fia, kple ale si wozã wo le network la me. 

Xlẽ [Halo2 agbalẽ](https://zcash.github.io/halo2/index.html) be nànya nu geɖe.

## Zero-Knowledge ƒe Dɔwɔwɔ Bubuwo 

zk-SNARKs dea viɖe geɖe fia le dɔwɔwɔ ƒomevi vovovowo me. Mina míakpɔ kpɔɖeŋu aɖewo.

**Nu ƒe dziyiyi**: Woɖo esia to "Kɔmpiuta ƒe Dɔ Nana Ame Bubu" me. Menye be zero-knowledge le be woahiã vevie na L1 ɖoɖonu be wòakpɔ dɔ si off-chain dɔwɔƒe aɖe wɔ ɖe asi o. Gaɖoɖowo menye be woanye ɣaɣla le zk-EVM aɖe dzi ɣesiaɣi o.

Viɖe si le ɖaseɖigbalɛ ƒe Rollup (zk-Rollup) dɔwɔƒe aɖe ŋu nye be wòawɔ gaɖoɖowo alafa alo akpe geɖe ƒe ƒuƒoƒo, eye L1 ate ŋu akpɔ ɖaseɖigbalɛ kpuie aɖe ɖe asi be wowɔ gaɖoɖowo katã nyuie, si na network la ƒe gaɖoɖo ƒe dɔwɔwɔ ƒe home dzi yi 100 alo 1000 teƒe.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Nuwo ƒe Dɔwɔwɔ Ɖekae**: Woɖo esia le zk-Bridge aɖe dzi to assets ƒe "kaka ɖe teƒe aɖe" le source ɖoɖonu aɖe dzi, eye woɖea kpe na target ɖoɖonu la be wokaka assets la ɖe teƒe (gbegbɔgblɔ ɖi ƒe ɖaseɖigbalɛ).

**Sewo ƒe Dzadzraɖo**: Projectwo abe [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) ene ate ŋu aɖe kpe be gaɖoɖo si le ɣaɣla la de duƒe la ƒe banki ƒe sewo dzi, ke womagblɔ gaɖoɖo la ƒe nyawo o. 

**Alakpa Nyatakaka ƒe Ɖoɖo**: Le kpɔɖeŋu geɖe siwo le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu kple cryptocurrency ƒe gota me la, woate ŋu azã ɖaseɖigbalɛ ƒe wɔwɔ le aworanwo si news kple media dɔwɔƒewo wɔ dɔ kple, be woana nukpɔlawo nakpɔ aworan aɖe ƒe gbɔnyeƒe kple dɔ katã si wowɔe la ɖe asi le wo ŋutɔwo ƒe mɔ nu. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Nusrɔ̃me Bubu: 

[Zero-Knowledge ƒe Agbalẽha - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's kple Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 kple SNARKs siwo me Mɔ̃ ƒe Ɖoɖo Xexlẽnuwo Mele O - Sean Bowe le Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Ɖaseɖigbalɛwo kple Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Zero-Knowledge Ɖaseɖigbalɛ si Me Woaɖo Nu - Chainlink ƒe nyati](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Nusrɔ̃ƒe 1: ZKP ƒe Gɔmedzedze kple Eƒe Ŋutinya - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Arithmetic Circuits ƒe Gɔmeɖeɖe Bɔbɔe - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Nu ƒe dziyiyi Mele Dzidzɔme O, Ɣaɣla Ku: ZK-Proofs, Nu kae Wonyɛ Nyui Na?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Axawo siwo Kplɔe ɖo

- [Ɣaɣla Gaƒuƒoƒowo](/using-zcash/shielded-pools) — Ale si wozã zk-SNARKs le Zcash ƒe value gaƒuƒoƒowo me
- [Halo](/zcash-tech/halo) — Zcash ƒe zk-SNARK ɖoɖo si naa mɔ̃ ƒe ɖoɖo xexlẽnuwo mele mahiã o
- [Quantum ƒe Megbe Ƒe Dedienɔnɔ le Zcash](/zcash-tech/post-quantum-security) me - Ale si quantum ƒe afɔku siwo ava le etsɔme la kplɔe ɖo Zcash ƒe cryptography ŋu
- [Zcash Ɣaɣla Assets](/zcash-tech/zcash-shielded-assets) — ZSAs siwo wotu ɖe zk-SNARK technology ŋu
- [Nu kae nye ZEC kple Zcash](/start-here/what-is-zec-and-zcash) — Gɔmedzedze na Zcash kple eƒe ɣaɣla ƒe model
- [Ame Ka Ate Ŋu Akpɔ Wò ƒe Zcash Fexexe?](/start-here/who-can-see-your-zcash-payment) — Nu kae nɔa ƒe dzeɖeɖe me, eye nu kae ɣaɣla zia

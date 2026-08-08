<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo (Kɔkɔkɔ)


## Nukae nye Halo?

Halo nye nu si ŋu kakaɖedzi mele o, eye wòɖea vi le numekuku me. Eɖe mɔ ɖe Zcash blockchain ƒe ɖoɖowo dzi wɔwɔ kple eƒe dɔwɔwɔ nyuie ŋuti. Eyae nye zero-knowledge proof system gbãtɔ si wɔa dɔ pɛpɛpɛ gake eya hã ɖea vi na amewo la. Eye wobunɛ be enye dzɔdzɔmeŋutinunyalawo ƒe ŋgɔyiyi gã aɖe ŋutɔ.

![halo](/content-images/_unavailable.svg "halo")


** Eƒe akpa vovovoawo**

Polynomial ƒe Kpekpeɖeŋunana Ƒe Ðoɖowɔɖi: Ena be ame si le dɔ wɔm la naɖe asi le polynomials ŋu kple kpui aɖe, eye wòate ŋu azã nuŋlɔla atsɔ aɖo kpe edzii.

Polynomial Interactive Oracle Proof: Verifier biaa prover (algorithm) be wòava ʋu nuxexlẽawo katã le teƒe vovovowo si wotia to polynomials commitment scheme dzi eye wòkpɔna ne enye nyateƒe. 


### Womeɖo Ðoɖo si Dzi Woaka Ðe Edzi O

zkSNARKs da ɖe Common Reference String (CRS) dzi abe nu si woazã atsɔ aɖo kpe edzii kple be enye nyateƒe. Ele be CRS sia nazu esi ame aɖe ɖo ŋu ɖi do ŋgɔ hafi wòateŋu awɔe. Va se ɖe fifia la, ele vevie be woawɔ numekuku siwo me amesiawo le dedie wu (MPC), abe esiwo Aztec network & Zcash wɔna ene, bene woate ŋu akpɔ afɔku si li ne wole ɖoɖowɔɖi siawo wɔm [trusted setup ceremony] ta.](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Tsã la, Zcash ƒe Sprout & Sapling me tsimɔ siwo ŋu wotrɔ asi le be woazãe nye BCTV14 kple Groth 16 zk-dzidzimewo. Togbɔ be esiawo nɔ dedie hã la, seɖoƒe li na wo. Womateŋu awɔ ɖoɖo ɖe eŋu o elabena wodea dɔ ɖeka aɖe ko dzi; "nu gbegblẽ" (siwo tsi anyi tso nya ɣaɣla si wowɔna ne wole wɔwɔm) ate ŋu anɔ anyi eye kakaɖedzi nɔa ame aɖewo dome hafi woate ŋu abu wɔna sia nu xɔasie.

By repeatedly collapsing multiple instances of hard problems together over cycles of elliptic curves so that computational proofs can be used to reason about themselves efficiently (Nested amortization) the need for a trusted setup is eliminated. This also means that the structured reference string (output from ceremony) is upgradeable enabling applications such as smart contracts.

Halo provides users with two important assurances regarding the security of the large-scale zero-knowledge proof system. Firstly, it enables users to prove that no one who was involved in the genesis ceremony has created a secret backdoor to execute fraudulent transactions. Secondly, it allows users to demonstrate that the system has remained secure over time, even as it has undergone updates and changes.

[Sean Bowes ƒe Nuteƒekpɔkpɔ le Dystopia Labs ŋu](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Ðaseɖiɖi si me nyawo trɔna le la dzi wɔwɔ

Recursive proof composition allows a single proof to attest to the correctness of practically unlimited other proofs, allowing a large amount of computation (and information) to be compressed. This is an essential component for scalablilty, not least because it allows us to horizontally scale the network while still allowing pockets of participants to trust the integrity of the remainder of the network.

Hafi Halo nava la, nuŋɔŋlɔ si me kpeɖodzi le ƒe ɖoɖowɔwɔ bia akɔntabubu gã kple ɖoɖoawo. Eʋevi siwo ŋu woke ɖo dometɔ ɖekae nye mɔnu aɖe si woyɔna be **nested amortization** . Mɔnuwo sia na mɔɖeɖe ɖe nuwo wɔwɔ to polynomial commitment scheme dzii eye wòzɔna ɖe internɔdɔme-nyatakaka dzi, esia nana wowɔa dɔ nyuie wu eye womegawɔa ɖoɖo aɖeke o.

Le [Halo-gbalẽa me] la, woŋlɔe ɖe agbalẽ si nye "The World Book Encyclopedia" dzi.](https://eprint.iacr.org/2019/1021.pdf), míedzro polynomial commitment scheme sia me nyuie eye míekpɔe be nu yeye aɖe le eme. Enaa mɔ̃ɖaŋunuwo ƒe xexlẽme si dzi woato awɔ numekuku siwo ŋu wotrɔ asi le la sɔna kple ale si woawɔ numekukua ɖeka pɛ ko hafi wòadze edzii. Esia ɖeɖe dzaa ana mɔnu bubu nanɔ anyi wu zk-SNARK gbãtɔawo, siwo wozãna le Zcash.


### Halo 2

Halo 2 nye zk-SNARK ƒe dɔwɔwɔ si de ŋgɔ ŋutɔ, eye woŋlɔe ɖe Rust me. Eɖe alesi woada ɖo le Zcash dzi la ɖa esime wòle ɖoɖo wɔm be woate ŋu ada dɔ sia gɔme nyuie wu. 

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Eƒo nu tso míaƒe mɔnu si míeyɔna be ** accumulation scheme** la ŋu. Nu yeye sia ɖe alesi mía ƒe amortization-mɔ̃a wɔa dɔ ŋutɔŋutɔ fia; to kpeɖodziwo dodo na nane si woyɔna be **accumulator,** afisi kpeɖodziawo bua nuwo me le wo ɖokui ŋu abe tsã ene ta la, míate ŋu akpɔe ɖa be nusiwo katã míewɔ va yi nɔ eteƒe (to induction dzi) ne míekpɔ nusi tututu wowɔ fifia ko hã.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>



Le ɣeyiɣi ma ke me la, ƒuƒoƒo bubu geɖewo nɔ Polynomial IOP yeyewo si nyo wu Sonic (si wozã le Halo 1) abe Marlin ene. 

Mɔ̃ɖoɖo yeye siawo dometɔ si wɔa dɔ nyuie wue nye PLONK, eye wònaa mɔɖeɖe geɖe be woate ŋu awɔ ɖoɖo ɖe alesi woawɔ wo ŋudɔe le ɖekawɔwɔ me kple dɔwɔnu aɖe koŋ ƒe hiahiãwo ahana ɣeyiɣi agbɔsɔsɔme 5 wu esi wozãna tsɔ kpɔa egbɔ.

[Nɔnɔmewo Ŋuti Numekuku](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Aleke esia ɖea vi na Zcash?

Orchard Shielded pool si dzi NU5 & ɖo la nye proof system yeye sia ƒe dɔwɔwɔ le Zcash Network. Edzena kple mɔ̃ siwo woɖuna ɖe Sprout kple Sapling ŋu be woatsɔ adzudzɔ xoxoa zazã vivivi. Esia dea dzo amewo me be woaʋu ayi trustless proof system, eye wònana kakaɖedzi nɔa gaɖoɖoawo dome nyuie wu, hedoa alɔ nuwɔwɔ kpli Zcash katã gbɔ. Esi wowɔ NU5 dɔ gɔme tso 2022 ƒe domedome megbe la, wote ŋu wɔ recursive proofs (nusi mede blibo o) hã ɖekae. Wode privacy ŋuti mɔfiame geɖewo asi na ame bubuwo. 'Actions' ɖoɖo anyi tsɔ ɖɔli input/output kpe ɖe eŋu wotrɔna zea transaction metadata agbɔsɔsɔme dzi kpɔtɔ. 

Ehiã be woagbugbɔe awɔ le ɖoɖowɔɖi gã ɖesiaɖe me. Wo ɖeɖe ɖa nye ŋgɔyiyi vevi aɖe hena ɖoɖoa yeyewo wɔwɔ ɖe edzi dedie. 

Recursive proof composition ate ŋu ana be woaƒo nuŋɔŋlɔ agbɔsɔsɔme si seɖoƒe meli na o, eye woada akɔnta le ɖoɖo siwo me nuwo ƒe xexlẽdzesiwo sɔ gbɔ ɖo la dzi. Esia hã ɖea vi ŋutɔ ne wole Zcash Shielded Assets kple Layer 1 ŋutete dzram ɖe edzi le teƒe kɔkɔ wu esi wozãa eƒe mɔ̃ bliboa le ɣeyiɣi siawo katã me.


## Halo le nutoa me ƒe nu gbagbewo dome. 

Electric Coin Company wɔ ɖoɖo kple Protocol Labs, Filecoin Foundation, kpakple Ethereum Foundation be yewoaku Halo R&D ŋu. Eɖoe koŋ le nubabla sia me be woana ŋutete si sɔ wu, dɔwɔwɔ ɖekae kple ame ƒe nyonyowo dzi ɖe edzi le nutoa katã me eye wòava nye Web 3.0 hã.

Hekpe ɖe eŋu la, Halo 2 le MIT kple Apache 2.0 ʋuʋu-tsoƒe mɔɖegbalẽviwo te.](https://github.com/zcash/halo2#readme), si fia be amesiame ate ŋu atu nu kple ɖoɖo sia.

### Filecoin

Tso esime Halo2 ƒe agbalẽdzraɖoƒea dze dɔwɔwɔ gɔme la, wodze eyɔyɔ le ɖoɖowo abe zkEVM ene me. Eye woate ŋu atsɔe ade Filecoin Virtual Machine si nye kpeɖodzinya ŋuti mɔnu hã me. Ele be woaxe ga geɖe ɖe SpaceTime/replication dzi hafi wòateŋu awɔ esia. Alea ke wòle na Halo 2 ne wole teƒe aɖe zãm nyuie eye woɖoe ɖa kaba wu?

[Filecoin Foundation ƒe video si me Zooko le](https://www.youtube.com/watch?v=t4XOdagc9xw)

Azɔ hã, anyo ŋutɔ na Filecoin kple Zcash ecosystems siaa ne woate ŋu awɔ filecoin storage payment le ZEC me, eye wòana be ame ƒe nuŋɔŋlɔwo nanɔ dedie abe ale si wòle le zcash shielded transfer. Esia ana ŋutete wo be woaxe mɔ̃ ɖe files siwo le Filecoin dzi la ta ahado alɔ mobile clients ale be woate ŋu ade media alo fayel aɖewo asi na Zcash encrypted memo . 

[ECC x Filecoin Blog ƒe Nyatakaka](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum (Ethereum)

Halo 2 ƒe kpeɖodziawo wɔwɔ ɖe dɔ ŋu be woateŋu akpɔ egbɔ le ɣeyiɣi didi me (VDF) si wole ta demi. VDF nye nyagbɔgblɔ aɖe si dzi wotrɔ asi le bɔbɔe eye ateŋutete geɖe li na wo zazã. 

Woateŋu azãe abe nusi nana be nuwo dzɔna le ɖoɖo nu ene, eye woazãnɛ hã ɖe dɔ si me nunyalawo wɔa ɖo ŋu. Eye woateŋunɛ na kplɔla tiatiawo le Ethereum kple mɔ̃ɖoɖo bubuwo dzi.

ECC, Filecoin Foundation, Protocol Labs kple Ethereum Foundation hã awɔ dɔ aduadu kple [SupraNational] le woƒe dɔwɔƒe si nye Electronic Commodity Exchange (ECX) la.](https://www.supranational.net/), si nye asitelefon-dɔwɔƒe aɖe si nya nu tso kɔmpiuta ƒe nuŋlɔɖi ŋu, be wòate ŋu awɔ GPU kple ASIC ŋuti dɔ le VDF la wɔwɔ me.

[Ame Ŋuti Nyawo Gbɔkpɔ Kple Amesiwo Wotsɔna Dea Dɔwɔƒee](https://appliedzkp.org/) le numekuku wɔm tso mɔ vovovo siwo dzi Halo 2 ƒe kpeɖodziawo ate ŋu ana be Ethereum nutoa me nuwo nanɔ dedie wu eye wòateŋu ato vovo hã la ŋuti. Ƒuƒoƒo sia va ɖo Ethereum gɔmeɖoanyi gbɔ, eye eƒe susu katã nɔ zero-knowledge proofs kple cryptographic primitives ŋu vevie. 

## Dɔ bubu siwo me wozã Halo le

+ [Anoma, enye adzameɖoɖo si wotsɔna trɔa asi le atomik-mɔ̃wo ŋu ƒe kɔpi siwo li to vovo me](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, L2 zkRollup le Cardano dzi](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, L1 zkEVM ƒe blockchain si le ame ŋutɔ tɔ me](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Miku, L2 zkRollup le Ethereum dzi](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


** Nusɔsrɔ̃ Bubuwo**:

[Afɔku si nye ZKP kple Halo 2 - Hanh Huynh Huu ƒe ŋgɔdonya](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 kple Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Nunyala aɖe ƒe Nyatakakawo Ŋuti Dzeɖoɖo](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3 Eʋegbe me tɔ](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

** Agbalẽwo**

[Halo 2 ƒe dɔwɔnuwo](https://github.com/adria0/awesome-halo2)

[Halo 2 ƒe nuŋlɔɖiwo](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)

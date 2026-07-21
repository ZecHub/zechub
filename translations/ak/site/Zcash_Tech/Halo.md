<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo


## Dɛn ne Halo?

Halo yɛ ahotoso, recursive zero-nimdeɛ adanse (ZKP) a Sean Bowe hui wɔ Electric Coin Co. Ɛyi nhyehyɛe a wogye di no fi hɔ na ɛma kwan ma Zcash blockchain no scalability kɛse. Halo yɛ zero-nimdeɛ adanseɛ nhyehyɛeɛ a ɛdi kan a ɛyɛ adwuma yie & recursive a wɔbu no kɛseɛ sɛ nyansahu mu nkɔsoɔ.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Nneɛma a ɛwɔ mu**

Succinct Polynomial Commitment Scheme: Ɛma committer kwan ma ɔde ne ho to polynomial a ɛwɔ ahama tiawa bi a verifier betumi de adi dwuma de asi nhwehwɛmu a wɔakyerɛ sɛ wɔayɛ wɔ committed polynomial no so dua.

Polynomial Interactive Oracle Proof: Verifier srɛ prover (algorithm) sɛ onbue bɔhyɛ nyinaa wɔ mmeae ahorow a wɔpɛ denam polynomial commitment scheme & checks identity holds true between them. 


### Nsiesiei a Wogye Di Biara Nni Hɔ

zkSNARKs de wɔn ho to common reference string (CRS) so sɛ ɔmanfoɔ parameter a wɔde di adanseɛ & di adanseɛ. Ɛsɛ sɛ obi a wogye no di di kan yɛ saa CRS yi. Ɛde besi nnansa yi no, na ɛho hia sɛ wɔyɛ akontaabu a ahobammɔ wom a ɛkɔ akyiri a ɛfa nnipa pii ho (MPC) te sɛ nea Aztec network & Zcash yɛ no na ama asiane a ɛwɔ mu wɔ saa [nhyehyɛe guasodeyɛ a wotumi de ho to so yi mu no so atew](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Kane no na Zcash Sprout & Sapling shielded pools no de BCTV14 & Groth 16 zk-proving nhyehyɛe ahorow no di dwuma. Bere a na eyinom yɛ nea ahobammɔ wom no, na anohyeto ahorow wɔ hɔ. Na wɔnyɛ scalable sɛnea na wɔakyekyere wɔn wɔ application biako ho no, "awuduru nwura" (nkae a efi cryptographic nneɛma a wɔyɛe wɔ genesis guasodeyɛ no mu) betumi atra hɔ, na na ahotoso bi wɔ hɔ (ɛwom sɛ ɛyɛ simma kakraa bi de) ma wɔn a wɔde di dwuma no sɛ wobebu guasodeyɛ no sɛ ɛyɛ nea wogye tom.

Ɛdenam ɔhaw ahorow pii a wɔsɛe no mpɛn pii wɔ elliptic curves kyinhyia ahorow so sɛnea ɛbɛyɛ a wobetumi de akontaabu mu adanse adi dwuma de asusuw wɔn ho yiye (Nested amortization) so no, hia a ehia sɛ wɔyɛ nhyehyɛe a wotumi de ho to so no fi hɔ. Wei nso kyerɛ sɛ structured reference string (output from ceremony) no yɛ upgradeable a ɛma applications te sɛ smart contracts tumi yɛ adwuma.

Halo ma wɔn a wɔde di dwuma no awerɛhyem abien a ɛho hia a ɛfa ahobammɔ a ɛwɔ nimdeɛ a enni adanse nhyehyɛe kɛse no mu. Nea edi kan no, ɛma wɔn a wɔde di dwuma no tumi kyerɛ sɛ obiara nni hɔ a ɔde ne ho hyɛɛ genesis guasodeyɛ no mu a wayɛ kokoam akyi pon a ɔde bɛyɛ nnaadaa nnwuma. Nea ɛto so abien no, ɛma wɔn a wɔde di dwuma no tumi kyerɛ sɛ nhyehyɛe no akɔ so ayɛ ahobammɔ bere tenten, bere mpo a wɔayɛ no foforo ne nsakrae no.

[Sean Bowes Ɔkyerɛkyerɛfo a ɔhwɛ Dystopia Labs so](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Adanse a Wɔsan De Di Dwuma

Adanse a wɔhyehyɛ no mpɛn pii no ma adanse biako di adanse sɛ ɛkame ayɛ sɛ adanse afoforo a anohyeto nnim no teɛ, na ɛma wotumi mia akontaabu (ne nsɛm) pii so. Eyi yɛ adeɛ a ɛho hia ma scalabilty, ɛnyɛ nea ɛsua koraa ɛfiri sɛ ɛma yɛtumi yɛ horizontally scale network no berɛ a ɛda so ara ma kotokuo a ɛwɔ participants no mu ahotosoɔ wɔ network no nkaeɛ no mudi mu kura mu.

Ansa na Halo reba no, na sɛ wobenya recursive proof composition a, na ɛhwehwɛ sɛ wɔbɔ ka kɛse wɔ kɔmputa so ne nhyehyɛe a wotumi de ho to so. Nneɛma titiriw a wohui no mu biako ne ɔkwan bi a wɔfrɛ no **nested amortization**. Saa kwan yi ma kwan ma wɔde polynomial commitment scheme a egyina inner product argument so no di dwuma recursive composition, ɛma adwumayɛ tu mpɔn kɛse na ɛkwati nhyehyɛe a wogye di no.

Wɔ [Halo krataa no mu](https://eprint.iacr.org/2019/1021.pdf), yɛkyerɛkyerɛɛ saa polynomial commitment nhyehyɛe yi mu yiye na yehui sɛ aggregation technique foforo bi wɔ mu. Ɔkwan a wɔfa so yɛ no ma wotumi di adanse dodow bi a wɔde wɔn ho ayɛ a ɛkame ayɛ sɛ ɛyɛ nokware ntɛmntɛm te sɛ nea wɔde di adanse biako ho adanse. Eyi nkutoo bɛma woanya ɔkwan foforo a eye sen zk-SNARK ahorow a atwam a wɔde dii dwuma wɔ Zcash mu no.


### Halo 2. Ɔde ne nsa kyerɛɛ ne so

Halo 2, yɛ zk-SNARK dwumadie a ɛyɛ adwuma yie a wɔatwerɛ wɔ Rust mu a ɛyi hia a ɛhia sɛ wɔnya nhyehyɛɛ a wɔgye di berɛ a ɛresiesie stage ama scalability wɔ Zcash mu. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

Ɛka yɛn kwan a yɛfa so yɛ adwuma no nyinaa a wɔfrɛ no **accumulation scheme** ho. Saa formalization foforo yi da sɛnea yɛn nested amortization technique no yɛ adwuma ankasa adi; denam adanse a yɛde bɛka ade bi a wɔfrɛ no **accumulator,** a adanse ahorow no susuw accumulator no tebea a atwam no ho no, yebetumi ahwɛ sɛ adanse a atwam no nyinaa teɛ (ɛnam induction so) denam mprempren tebea a accumulator no wom a yɛbɛhwɛ ara kwa so.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



Nea ɛne eyi di nsɛ no, na akuw afoforo pii rehu Polynomial IOP foforo a ɛyɛ adwuma yiye sen Sonic (a wɔde dii dwuma wɔ Halo 1 mu), te sɛ Marlin. 

Nea ɛyɛ adwuma yiye wɔ saa protocol foforo yi mu ne PLONK, a ɛma nsakrae kɛse wɔ nhyehyɛe a etu mpɔn a wɔde di dwuma a egyina application-specific ahiade so na ɛma 5x prover bere a eye sen biara fi Sonic.

[PLONK ho nsɛm a wɔaka abom](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Ɔkwan bɛn so na eyi so ba Zcash so mfaso?

Orchard Shielded pool a wɔde NU5 & ayɛ adwuma no yɛ adansedie nhyehyɛeɛ foforɔ yi a wɔde bedi dwuma wɔ Zcash Network so. Wɔde turnstile nhyehyɛe koro no ara a wɔde dii dwuma wɔ Sprout ne Sapling ntam a adwene a ɛne sɛ wɔde nkakrankakra bɛma atare dedaw a wɔabɔ ho ban no akɔ pɛnhyen na ɛbɔ ho ban. Eyi hyɛ atutra a ɛkɔ adansedi nhyehyɛe a wontumi mfa wɔn ho nto so koraa ho nkuran, ɛhyɛ ahotoso a ɛwɔ sikasɛm nnyinaso no mu den, na ɛtew dwumadie a ɛyɛ den ne ntua a ɛwɔ Zcash nyinaa so. NU5 a wɔde yɛɛ adwuma wɔ afe 2022 mfinimfini akyi no, adanse a wɔsan de di dwuma no a wɔde bɛka abom no bɛyɛɛ yiye (ɛwom sɛ eyi nwie pɛyɛ de). Wɔyɛɛ kokoam nsɛm mu nkɔso pii nso wɔ tangentially. ‘Nneyɛe’ a wɔde bae sɛ wɔde besi nneɛma a wɔde ba/nneɛma a wɔde ba ananmu no boa ma wɔtew ayɔnkofa metadata dodow so. 

Trusted setups yɛ mpɛn pii no ɛyɛ den sɛ wɔbɛyɛ nhyehyɛe & ɛde nhyehyɛe mu asiane bae. Ɛbɛyɛ nea ɛho hia sɛ wɔsan yɛ wɔn bio ma protocol upgrade titiriw biara. Wɔn a woyi fi hɔ no de nkɔso kɛse ba ma wɔde protocol foforo a wɔayɛ no foforo bedi dwuma dwoodwoo. 

Recursive adanseɛ composition kura tumi a ɛbɛma compressing a anohyetoɔ nni mu dodoɔ, ayɛ auditable distributed systems, a ɛma Zcash tumi kɛseɛ titire ne nsakraeɛ a ɛkɔ Proof of Stake. Eyi nso ho wɔ mfaso ma ntrɛwmu te sɛ Zcash Shielded Assets ne Layer 1 tumi a ɛbɛma atu mpɔn wɔ node a edi mũ a wɔde di dwuma no awiei a ɛkorɔn wɔ mfe a ɛreba no mu ama Zcash.


## Halo wɔ abɔde a nkwa wom a ɛtrɛw no mu 

Electric Coin Company ne Protocol Labs, Filecoin Foundation, ne Ethereum Foundation ayɛ apam sɛ wɔbɛhwehwɛ Halo R&D mu, a sɛnea wobetumi de mfiridwuma no adi dwuma wɔ wɔn ntam nkitahodi mu ka ho. Apam no botae ne sɛ ɛbɛma scalability, adwumayɛ ne kokoamsɛm a eye wɔ abɔdeɛ a nkwa wom nyinaa ne Web 3.0.

Bio nso, Halo 2 wɔ [MIT ne Apache 2.0 tumi krataa a wɔabue ano no ase](https://github.com/zcash/halo2#readme), a ɛkyerɛ sɛ obiara a ɔwɔ abɔde a nkwa wom mu no betumi de nhyehyɛe a ɛkyerɛ sɛ ɛyɛ nokware no asi.

### Faelcoin a wɔde yɛ adwuma

Efi bere a wɔde sii hɔ no, wɔagye halo2 nhomakorabea no atom wɔ nnwuma te sɛ zkEVM mu no, ebetumi aba sɛ wɔde Halo 2 bɛka adanse nhyehyɛe no ho ama Filecoin Virtual Machine no. Filecoin hwehwɛ adanse pii a ne bo yɛ den a ɛfa ahunmu bere / adanse a ɛkyerɛ sɛ wɔyɛ nsɛso. Halo2 bɛyɛ pivotal wɔ compressing ahunmu dwumadie, yie scaling network no.

[Filecoin Fapem video a ɛne Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Bio nso, ɛbɛyɛ mfasoɔ kɛseɛ ama Filecoin ne Zcash abɔdeɛ a nkwa wom nyinaa sɛ wɔbɛtumi atua Filecoin akoraeɛ ho ka wɔ ZEC mu, a ɛbɛma kokoamsɛm a ɛte saa ara ama akoraeɛ atɔ a ɛwɔ hɔ wɔ Zcash shielded transfers mu. Saa mmoa yi bɛma wɔde tumi a wɔde bɛbɔ fael a ɛwɔ Filecoin storage mu no aka ho na wɔde mmoa aka mobile clients ho sɛnea ɛbɛyɛ a wobetumi **abata** media anaa fael ahorow ho wɔ Zcash encrypted memo ho. 

[ECC x Faelcoin Blog Nsɛm a Wɔakyerɛw](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum a wɔde yɛ adwuma

Halo 2 adanseɛ a wɔde bedi dwuma ama Verifiable Delay Function (VDF) a ɛyɛ adwuma yie a wɔreyɛ no. VDF yɛ cryptographic primitive a ɛwɔ nsɛm pii a ebetumi de adi dwuma. 

Wobetumi de adi dwuma sɛ fibea a atirimpɔw nyinaa randomness a nea ɛka ho ne dwumadie wɔ smart contract applications ne saa ara nso na ɔkannifo paw wɔ Proof of Stake wɔ Ethereum & protocols afoforo.

ECC, Filecoin Fapem, Protocol Labs, ne Ethereum Fapem nso ne [SupraNational](https://www.supranational.net/), adetɔnfo a ne ho akokwaw wɔ hardware-accelerated cryptography mu, ma GPU ne ASIC nhyehyɛe a ebetumi aba ne VDF no nkɔso.

[Kokoamsɛm ne Scaling Nhwehwɛmu kuw no](https://appliedzkp.org/) nso reyɛ nhwehwɛmu wɔ akwan ahodoɔ a Halo 2 adanseɛ bɛtumi ama kokoamsɛm ne scalability atu mpɔn ama Ethereum ecosystem. Saa kuw yi roll up kɔ Ethereum fapem no so, na ɛwɔ adwene a ɛtrɛw wɔ zero-nimdeɛ adanse ne cryptographic primitives so. 

## Nnwuma afoforo a wɔde Halo di dwuma

+ [Anoma, kokoam nsɛm a wɔkora so multichain atom swap protocol](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, L2 zkRollup a ɛwɔ Cardano so](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, kokoam L1 zkEVM blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, L2 zkRollup a ɛwɔ Ethereum so](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Adesua Foforo**:

[Nnianim asɛm a ɛfa zkp ne halo 2 ho - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 a ɛwɔ Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Mfiridwuma ho Nkyerɛkyerɛmu Blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Mpɔtam Hɔ Nneɛma a Wɔde Kyerɛkyerɛ - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Nwoma a wɔakyerɛw**

[Halo 2 nneɛma a wɔde yɛ adwuma](https://github.com/adria0/awesome-halo2)

[Halo 2 ho nkrataa](https://zcash.github.io/halo2/)

[Halo 2 a wɔde kyerɛw nsɛm](https://github.com/zcash/halo2)

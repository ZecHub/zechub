<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo yɛ ahotosoɔ, recursive zero-knowledge proof (ZKP) system a Sean Bowe hunuu wɔ Electric Coin Co. Ɛyi hia a ɛhia sɛ wɔde ahotosoɔ nhyehyɛeɛ fi hɔ na ɛma recursive proof composition yɛ adwuma, a ɛyɛ Zcash's mprempren scalability ne ahobanbɔ kwankyerɛ no fapem.

- **Nea ɛyɛ:** zk-SNARK adansi a ɛwɔ recursion a etu mpɔn na enni nhyehyɛe guasodeyɛ a wogye di.
- **Nea enti a ɛho hia:** Zcash's Orchard shielded pool, a wɔde NU5 yɛɛ adwuma wɔ afe 2022 mu no, tu mmirika wɔ Halo 2 — nhwehwɛmu yi a wɔde di dwuma no so.
- **Agyapade titiriw:** "awuduru nwura" biara nni hɔ a efi nhyehyɛe guasodeyɛ ahorow mu, ne adanse a ebetumi adi adanse afoforo a ɛkame ayɛ sɛ anohyeto nni mu ho adanse.
- **Tumi krataa:** Halo 2 yɛ open source ase [MIT ne Apache 2.0](https://github.com/zcash/halo2#readme), enti obiara a ɔwɔ abɔde a nkwa wom mu no betumi de asi so.

---

## Nkyerɛkyerɛmu Titiriw

Halo yɛ ahotoso, recursive zero-nimdeɛ adanse nhyehyɛe a Sean Bowe hui wɔ Electric Coin Co. Ɛyi nhyehyɛe a wogye di no fi hɔ na ɛma kwan ma Zcash blockchain no scalability kɛse. Halo yɛ zero-nimdeɛ adanseɛ nhyehyɛeɛ a ɛdi kan a ɛyɛ adwuma yie na ɛsan yɛ bio — a wɔbu no kɛseɛ sɛ nyansahu mu nkɔsoɔ.

![halo](/content-images/_unavailable.svg "halo")

### Nneɛma abien a ɛwɔ mu no

- **Succinct Polynomial Commitment Scheme.** Ɛma committer kwan ma ɔde ne ho to polynomial a ɛwɔ ahama tiawa a verifier betumi de adi dwuma de asi nhwehwɛmu a wɔakyerɛ sɛ wɔayɛ wɔ committed polynomial no so dua.
- **Polynomial Interactive Oracle Proof.** Verifier no srɛ prover (algorithm bi) sɛ ɔmmue commitments nyinaa wɔ mmeae a ɔpɛ, de polynomial commitment scheme no di dwuma, na ɔhwɛ sɛ identity no kura nokware wɔ wɔn ntam.

### Nsiesiei biara nni hɔ a wotumi de ho to so

zk-SNARKs de wɔn ho to common reference string (CRS) so sɛ ɔmanfoɔ parameter a wɔde bɛdi adanseɛ na wɔadi ho adanseɛ. Ɛsɛ sɛ obi a wogye no di di kan yɛ saa CRS yi. Ɛde besi nnansa yi no, na ɛho hia sɛ wɔyɛ akontaabu a ahobammɔ wom a ɛkɔ akyiri a ɛfa nnipa pii ho (MPC) — sɛnea Aztec ntam nkitahodi ne Zcash yɛ no — na ama asiane a ɛwɔ mu wɔ eyi mu no so atew [setup guasodeyɛ a wogye di](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Zcash's kan Sprout ne Sapling shielded pools no de BCTV14 ne Groth16 zk-proving nhyehyɛe ahorow no dii dwuma. Bere a na eyinom yɛ ahobammɔ no, na wɔwɔ anohyeto ahorow: na wontumi nsɛe no efisɛ na wɔakyekyere no wɔ dwumadie baako ho, "awuduru nwura" (nwura a awuduru wom" (cryptographic nneɛma nkaeɛ a wɔyɛeɛ wɔ genesis guasodeyɛ no mu) tumi kɔ so, na na ahotosoɔ bi wɔ hɔ (ɛwom sɛ ɛyɛ simma ketewaa bi de) a ɛbɛma wɔabu guasodeyɛ no sɛ ɛyɛ nea wɔgye tom.

Halo yi nhyehyɛe a wogye di no fi hɔ denam ɔhaw ahorow pii a ɛbɔ bom mpɛn pii wɔ elliptic curves kyinhyia so, sɛnea ɛbɛyɛ a wobetumi de akontaabu adanse adi dwuma de asusuw wɔn ho yiye (nested amortization). Nsunsuansoɔ bɔne ne sɛ structured reference string (asɛm a ɛfiri guasodeɛ bi mu ba) no bɛyɛ upgradeable, na ɛma applications te sɛ smart contracts tumi yɛ adwuma.

Halo ma wɔn a wɔde di dwuma no awerɛhyem abien a ɛho hia fa ahobammɔ a ɛwɔ nimdeɛ a enni adanse nhyehyɛe kɛse bi mu. Nea edi kan no, ɛma wɔn a wɔde di dwuma no tumi kyerɛ sɛ obiara nni hɔ a ɔde ne ho hyɛɛ genesis guasodeyɛ no mu a wayɛ kokoam akyi pon bi a wɔde bɛyɛ nnaadaa nnwuma. Nea ɛto so abien no, ɛma wɔn a wɔde di dwuma no tumi kyerɛ sɛ bere kɔ so no, nhyehyɛe no akɔ so ayɛ nea ahobammɔ wom, bere mpo a wɔayɛ no foforo na wɔayɛ nsakrae wom no.

[Sean Bowe's nkyerɛkyerɛmufo a ɔwɔ Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Aniwa so / Nsɛso

### Notary nkɔnsɔnkɔnsɔn no

Susuw zk-SNARK a ɛyɛ daa ho sɛ krataa a wɔakyerɛw so: stamp biako, nokwaredi biako, wɔayɛ. Afei fa no sɛ ɛsɛ sɛ wokyerɛ sɛ nkrataa mpem du a wɔaboaboa ano no yɛ nokware. Sɛ ɛnyɛ recursion a, anka ɛsɛ sɛ verifier hwɛ stamp biara.

Halo dane krataa biara a wɔagye atom no yɛ no stamp wɔ *next* krataa no so, kɔsi sɛ stack no nyinaa bɛbubu ayɛ no krataa baako a stamp baako na ɛwɔ mu. Sɛ wohwɛ krataa a etwa to no mu a, ɛdɔɔso sɛ wubenya nkɔnsɔnkɔnsɔn no nyinaa mu ahotoso — na nea ɛho hia titiriw no, Halo's notary (proving system) yɛ n’ankasa stamps a enhia abɔnten so tumidi da sɛ ɔde ne nsɔano besi hɔ.

### Nea enti a nhyehyɛe a wogye di no a wobeyi afi hɔ no ho hia

Wɔ nhyehyɛe dedaw mu no, "nsɔano" (CRS) no fi guasodeyɛ bi mu. Na ɛsɛ sɛ wɔn a wɔde wɔn ho hyɛɛ mu no sɛe nneɛma a ɛwɔ ntam no, na na ɛsɛ sɛ obiara nya ahotoso sɛ wɔyɛ saa. Nkontaabu nkutoo na ɛyɛ Halo's nsɔano no: biribiara nni hɔ a ɛsɛe, biribiara nni hɔ a ɛbɛtwetwe, na guasodeyɛ biara nni hɔ a ɛsɛ sɛ wɔde wɔn ho to so.

---

## Deep Dive a Wɔde Nsu Gu Mu

### Adanse a wɔsan de di dwuma bio

Recursive proof composition ma adanse biako di adanse sɛ ɛkame ayɛ sɛ adanse afoforo a anohyeto nnim no teɛ, na ɛhyɛ akontaabu (ne nsɛm) pii mu. Eyi yɛ ade titiriw ma scalability, efisɛ ɛma network no tumi scale horizontally bere a kotoku ahorow a wɔde wɔn ho hyɛ mu no da so ara tumi de wɔn ho to network no nkae no mudi mu kura so.

Ansa na Halo, na sɛ wobenya recursive proof composition a, na ɛhwehwɛ sɛ wɔbɔ ka kɛse wɔ kɔmputa so ne nhyehyɛe a wotumi de ho to so. Nneɛma titiriw a wohui no mu biako ne ɔkwan bi a wɔfrɛ no **nested amortization**: recursive composition a wɔde polynomial commitment scheme a egyina inner product argument so di dwuma, ɛma adwumayɛ tu mpɔn kɛse bere a wɔkwati nhyehyɛe a wogye di no.

No [Halo krataa](https://eprint.iacr.org/2019/1021.pdf) kyerɛkyerɛ saa polynomial commitment nhyehyɛe yi mu yiye na ohui sɛ aggregation technique foforo bi wɔ mu. Ɔkwan a wɔfa so yɛ no ma wotumi di adanse dodow bi a wɔde wɔn ho ayɛ a ɛkame ayɛ sɛ ɛyɛ nokware ntɛmntɛm te sɛ nea wɔde di adanse biako ho adanse. Wɔ n’ankasa mu no, ɛno de ɔkwan foforo a eye sen biara mae dedaw sen zk-SNARKs a edi kan a wɔde dii dwuma wɔ Zcash.

### Halo 2. Ɔde ne nsa kyerɛɛ ne so

Halo 2 yɛ zk-SNARK dwumadie a ɛyɛ adwuma yie a wɔatwerɛ wɔ Rust mu a ɛyi hia a ɛhia sɛ wɔnya nhyehyɛɛ a wɔgye di berɛ a ɛresiesie stage ama scalability wɔ Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Ɛka ɔkwan a wɔfa so yɛ no nyinaa a wɔfrɛ no **accumulation scheme** ho. Saa formalization yi da sɛnea nested amortization yɛ adwuma ankasa adi: denam adanse a wɔde bɛka ade bi a wɔfrɛ no **accumulator** ho, baabi a adanse biara susuw accumulator no tebea a atwam no ho no, wobetumi ahwɛ adanse a atwam nyinaa (denam induction so) denam accumulator no tebea a ɛwɔ hɔ mprempren a wɔbɛhwɛ ara kwa so.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Nea ɛne eyi di nsɛ no, na akuw afoforo pii rehu Polynomial IOP ahorow a ɛyɛ adwuma yiye sen Sonic (a wɔde di dwuma wɔ Halo 1 mu), te sɛ Marlin. Nea ɛyɛ adwuma yiye wɔ saa protocols yi mu ne PLONK, a ɛma nsakrae kɛse wɔ nhyehyɛe a etu mpɔn a wɔde di dwuma a egyina application-specific ahiade so na ɛma 5× prover bere a eye sen Sonic.

[PLONK ho nsɛm a wɔaka abom](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo wɔ abɔde a nkwa wom a ɛtrɛw no mu

Electric Coin Company ne Protocol Labs, Filecoin Foundation, ne Ethereum Foundation yɛɛ apam sɛ wɔbɛhwehwɛ Halo R&D mu, a sɛnea wobetumi de mfiridwuma no adi dwuma wɔ wɔn ntam nkitahodi mu ka ho. Apam no botae ne sɛ ɛbɛma scalability, adwumayɛ, ne kokoamsɛm a eye wɔ abɔdeɛ a nkwa wom nyinaa ne Web 3.0.

Bio nso, Halo 2 wɔ ase [MIT ne Apache 2.0 tumi krataa a wɔabue ano](https://github.com/zcash/halo2#readme), a ɛkyerɛ sɛ obiara a ɔwɔ abɔde a nkwa wom mu no betumi de nhyehyɛe a ɛkyerɛ sɛ ɛyɛ nokware no asi.

**Filecoin.** Efi bere a wɔde sii hɔ no, wɔagye halo2 nhomakorabea no atom wɔ nnwuma te sɛ zkEVM mu, na ebetumi aba sɛ wɔde Halo 2 bɛka adanse nhyehyɛe no ho ama Filecoin Virtual Machine no. Filecoin hwehwɛ adanse pii a ne bo yɛ den a ɛfa ahunmu bere ne adanse a ɛkyerɛ sɛ wɔayɛ no sɛnea ɛte; Halo 2 yɛ ade titiriw wɔ compressing space dwumadie ne yie scaling network no. [Filecoin Fapem video a ɛne Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Ɛbɛsan nso aboa ecosystems mmienu no nyinaa sɛ wobetumi atua Filecoin storage payments wɔ ZEC, ama kokoamsɛm koro no ara ama storage adetɔ a ɛwɔ Zcash shielded transfers mu — a fael ahorow a wɔde encrypt wɔ Filecoin storage mu ne mobile clients a wɔboa a wɔde media bata Zcash encrypted memo ho ka ho. [ECC × Filecoin blog asɛm a wɔakyerɛw](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Wɔreyɛ Halo 2 adanseɛ a ɛbɛma Verifiable Delay Function (VDF) a ɛyɛ adwuma yie. VDF yɛ cryptographic primitive a ɛwɔ nsɛm pii a ebetumi de adi dwuma, a nea ɛka ho ne general-purpose randomness ma smart contracts ne akannifo a wɔpaw wɔ Proof of Stake mu. ECC, Filecoin Fapem, Protocol Labs, ne Ethereum Fapem nso ne wɔn reyɛ adwuma [SupraNational](https://www.supranational.net/), adetɔnfo a ne ho akokwaw wɔ hardware-accelerated cryptography mu, ma GPU ne ASIC nkɔso a ebetumi aba wɔ VDF no mu. No [Kokoamsɛm ne Scaling Nhwehwɛmu kuw](https://appliedzkp.org/) reyɛ nhwehwɛmu wɔ akwan foforo a Halo 2 adanse betumi ama kokoamsɛm ne scalability atu mpɔn ama Ethereum.

### Nnwuma afoforo a wɔde Halo di dwuma

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — a ɛyɛ kokoam nsɛm a ɛkora multichain atom swap protocol
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — a ɛyɛ L2 zkRollup wɔ Cardano so
- [DarkFi](https://dark.fi/book/arch/arch.html) — a ɛyɛ kokoam L1 zkEVM blockchain
- [Scroll no mu](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — a ɛyɛ L2 zkRollup wɔ Ethereum so

---

## Nkyerɛkyerɛmu a mfaso wɔ so

**Ma Zcash ankasa**

- Orchard shielded pool, a wɔde NU5, ne adanseɛ nhyehyɛeɛ foforɔ yi a wɔde bedi dwuma wɔ Zcash ntwamutam no so. Wɔde afiri a wɔde dannan nneɛma a wɔde di dwuma wɔ Sprout ne Sapling, a adwene no ne sɛ wɔde nkakrankakra bɛma atare dedaw a wɔabɔ ho ban no akɔ pɛnhyen.
- NU5 (2022 mfimfini) akyi no, adanseɛ a wɔsan de di dwuma no a wɔde bɛka abom no bɛyɛɛ yie, na kokoamsɛm mu nkɔsoɔ pii kaa ho — nea ɛda nsow kɛseɛ ne sɛ wɔde ‘Nneyɛeɛ’ a ɛbɛsi nneɛma a wɔde ba/nneɛma a ɛfiri mu ba ananmu, a ɛtew ayɔnkofa metadata dodoɔ so.
- Sɛ woyi nhyehyɛe a wogye di fi hɔ a, eyi nhyehyɛe mu asiane a anka ɛsɛ sɛ wɔsan yɛ bio ma protocol upgrade kɛse biara no fi hɔ.

**Ma wɔn a wokurakura ne wɔn a wɔyɛ adwuma wɔ hɔ**

- Recursive adanseɛ composition kura tumi a ɛde compressing akontabuo dodoɔ a anohyetoɔ nni mu, ayɛ auditable distributed systems, na ama Layer 1 tumi atu mpɔn ama full-node operators — a ɛfa ntrɛmu te sɛ Zcash Shielded Assets ne Zcash's longer-term designs.

---

## Mfomso a Ɛtaa Tu

| Gyidi a wɔtaa nya | Nea ɛte ankasa |
| --- | --- |
| "Halo yɛ daakye upgrade Zcash retwɛn." | Orchard, te ase wɔ mainnet so fi NU5 (2022), tu mmirika wɔ Halo 2 so dedaw. |
| "No trusted setup kyerɛ sɛ parameters biara nni hɔ koraa." | Halo da so ara de parameters a wɔahyehyɛ di dwuma; nsonsonoe no ne sɛ wɔmfa nwura a awuduru wom biara nkɔ na wobetumi ayɛ na wɔayɛ no foforo a ɛsɛ sɛ guasodeyɛ biara nni guasodeyɛ bi a ɛsɛ sɛ wɔn a wɔde wɔn ho hyɛ mu no de wɔn ho to so. |
| "Halo 2 ne Halo krataa no yɛ ade koro." | No [krataa](https://eprint.iacr.org/2019/1021.pdf) kyerɛkyerɛ polynomial commitment nhyehyɛe ne nested amortization mu; Halo 2 yɛ adeyɛ Rust dwumadie a ɛwɔ akoraeɛ nhyehyɛeɛ ne PLONKish akontabuo. |
| "Recursion boa wɔ scaling block verification nkutoo mu." | Recursion nso mia application-level akontabuo — hwɛ Filecoin's adanseɛ a ɛfa spacetime/replication ne VDF adwuma ma Ethereum. |

---

## Nkratafa a Ɛfa Ho

- [zk-SNARKs](/zcash-tech/zk-snarks) — mfiridwuma kuw a ɛwɔ hɔ nyinaa Halo yɛ ne dea
- [Halo (nhwehwɛmu krataa)](https://eprint.iacr.org/2019/1021.pdf) — mfitiase nhoma no
- [Ironwood](/zcash-tech/ironwood) ne [Turnstile a ɛwɔ hɔ no](/zcash-tech/the-turnstile) — sɛnea atare a wɔabɔ ho ban no tu bere a wɔn a wɔn mfe akɔ anim kɔ pɛnhyen no
- [Zcash Shielded Agyapadeɛ](/zcash-tech/zcash-shielded-assets) — ntrɛwmu a wonya mfaso fi adanse a wɔsan de di dwuma mu
- [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) — node dwumadie a ɛma adanseɛ a ɛwɔ nkɔnsɔnkɔnsɔn so no yɛ nokware

## Adesua a Ɛkɔ Akyiri

- [Nnianim asɛm bi a ɛfa ZKP ne Halo 2 ho — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 a ɛwɔ Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Mfiridwuma ho nkyerɛkyerɛmufo blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Mpɔtam Hɔ Nneɛma a Wɔde Kyerɛkyerɛ — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Nwoma a wɔakyerɛw**

- [Halo 2 nneɛma a wɔde yɛ adwuma](https://github.com/mhchia/awesome-halo2)
- [Halo 2 ho nsɛm a wɔakyerɛw](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)

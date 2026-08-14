<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) yɛ threshold signature ne distributed key generation protocol: wɔn a wɔde wɔn nsa ahyɛ aseɛ dodoɔ bi mu biara kura kyɛfa wɔ kokoam safoa a wɔbom yɛ mu, na ɛsɛ sɛ wɔn mu threshold nɔma bi yɛ adwuma bom na ama wɔayɛ nsaano nkyerɛwee baako.
* Esiane sɛ nea efi mu ba ne Schnorr nsaano nkyerɛwee biako nti, asɛm a wɔayɛ no saa kwan yi so no te sɛ asɛm a wɔyɛ no kwa wɔ ntwamutam no so.
* Ɛhwehwɛ sɛ wɔde nkitahodi kakraa bi na ɛyɛ, ebetumi atu mmirika bere koro mu, na ebetumi ahu obi a ɔde ne ho hyɛ mu a ɔbɔ bra bɔne na ayi no afi mu.
* Wɔ Zcash fam no, eyi kyerɛ sɛ FROST ma afã horow pii, a wɔatew wɔn ho wɔ asasesin mu no tumi di sika a wɔsɛe no tumi a ɛwɔ ZEC a wɔabɔ ho ban no so — mfaso wɔ so ma sikakorabea, escrow, nnwuma a ɛnyɛ sikakorabea, ne Zcash Shielded Assets (ZSA).
* It was created by Chelsea Komlo (University of Waterloo, Zcash Foundation) and Ian Goldberg (University of Waterloo).

## Nkyerɛkyerɛmu Titiriw

### Dɛn ne Schnorr nsaano nkyerɛwee?

Schnorr dijitaal nsaano nkyerɛwee yɛ nhyehyɛe ahorow a wɔahyehyɛ: (KeyGen, Sign, Verify).

Schnorr nsaano nkyerɛwee wɔ mfaso pii. Mfaso titiriw biako ne sɛ, sɛ wɔde nsafe pii di dwuma de hyɛ nkrasɛm koro ase a, wobetumi de nsaano nkyerɛwee a efi mu ba no abom ayɛ no nsaano nkyerɛwee biako. Eyi betumi atew multisig sikatua ne nnwuma afoforo a ɛfa multisig ho no kɛse so kɛse.

### Dɛn ne FROST?

**Schnorr Threshold Nsɛnkyerɛnne a Ɛyɛ Nsakrae Kurukuruwa-Optimised** - .
*Created by Chelsea Komlo (University of Waterloo, Zcash Foundation) & Ian Goldberg (University of Waterloo).*

FROST yɛ threshold signature ne distributed key generation protocol a ɛhia nkitahodi rounds kakraa bi na wobetumi ayɛ no parallel. FROST protocol yɛ Schnorr nsaano nkyerɛwee nhyehyɛe no threshold version.

Nea ɛnte sɛ nsaano nkyerɛwee a ɛwɔ ɔfã biako tebea mu no, ahyɛnsode nsaano nkyerɛwee hwehwɛ sɛ wɔn a wɔde wɔn nsa hyɛ ase no dodow bi a wɔde wɔn nsa hyɛ ase no yɛ biako, na wɔn mu biara kura kokoam safe biako mu kyɛfa.

[Dɛn ne Threshold Signatures? Chelsea Komlo - Ɔde ne nsa kyerɛɛ ne so](https://youtu.be/cAfTTfblzoU?t=110)

Ne saa nti, sɛ wɔyɛ nsaano nkyerɛwee wɔ threshold nhyehyɛe mu a, ɛde sika pii ba esiane ntwamutam a ɛkɔ so wɔ wɔn a wɔde wɔn nsa hyɛ ase no mu nti, na ɛma ɛyɛ den bere a wɔde kokoam kyɛfa sie wɔ mfiri a ntwamutam anohyeto wom so anaasɛ bere a nkitahodi kɔ so wɔ ntwamutam a wontumi mfa ho nto so so.

Network overhead bere a signing adwumayɛ no so tew denam ɔkwan foforo a wɔde di dwuma a ɛbɔ ho ban fi atoro ntua ho na ɛfa nhyehyɛe afoforo nso ho.

FROST ma threshold signature protocols tu mpɔn denam ma a ɛma kwan ma wɔyɛ signature dwumadie dodoɔ a anohyetoɔ nni mu dwoodwoo wɔ parallel (concurrency) mu.

Wobetumi de adi dwuma sɛ 2-round protocol, baabi a signers de nkrasɛm 2 mena na wogye nyinaa, anaasɛ sɛ optimized single-round signing protocol a ɛwɔ preprocessing stage.

FROST nya ne nkɔsoɔ a ɛba wɔ adwumayɛ mu no fã bi denam ma a ɛma protocol no gyae nyinsɛn wɔ obi a ɔde ne ho hyɛ mu a ɔnyɛ abrabɔ bɔne anim, a afei wɔhunu no na wɔyi no firi daakye dwumadie mu.

Wɔde ahobammɔ ho adanse a ɛkyerɛ sɛ FROST wɔ ahobammɔ wɔ ntua a wɔapaw ho, a yɛfa no sɛ discrete logarithm haw no yɛ den, na ɔtamfo no di wɔn a wɔde wɔn ho hyɛ mu kakraa bi so sen threshold no ama [ha](https://eprint.iacr.org/2020/852.pdf#page=16).

### Ɔkwan bɛn so na FROST yɛ adwuma?

FROST protocol no kura nneɛma abien a ɛho hia:

Nea edi kan no, n a wɔde wɔn ho hyɛɛ mu no yɛ distributed key generation (DKG) protocol de yɛ common verification key. Wɔ awiei no, obiara a ɔde ne ho hyɛ mu no nya kokoam kokoam safe kyɛfa ne ɔmanfo nokwaredi safe kyɛfa.

Ɛno akyi no, t-out-of-n participants biara betumi ayɛ threshold signing protocol de ayɛ adwuma abom ayɛ Schnorr signature a ɛfata.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Aniwa so / Nsɛso

Fa no sɛ FROST te sɛ safe-deposit box a ɛbue bere a keyholders pii a wɔama wɔn tumi dan wɔn safe no bom nkutoo — nanso ɛnyɛ keyholder biara na wɔhwehwɛ; nɔma a wɔahyɛ no ara kwa (sɛ nhwɛso no, 5 biara mu 3). Sɛ wobue adaka no wie a, obi a ɔhwɛ abɔnten ntumi nhu safe a wɔde kuraa mu a wɔdaa no adi, anaasɛ mpo sɛ ɛboro biako na wɔde wɔn ho hyɛɛ mu. Saa ara nso na kuw bi betumi abom ama Zcash asɛm bi ho kwan bere a ntwamutam no hu nsaano nkyerɛwee biako pɛ a ɛte sɛ nea ɛyɛ mpapahwekwa.

## Deep Dive a Wɔde Nsu Gu Mu

**Awoɔ ntoatoasoɔ safoa a wɔakyekyɛ (DKG)**

Botae a ɛwɔ saa ɔfa yi mu ne sɛ ɛbɛma wɔanya kokoam safoa kyɛfa a ɛtra hɔ kyɛ ne safe a wɔde di adanse a wɔbom yɛ. Saa fa yi, n a wɔde wɔn ho hyɛ mu na wɔhwɛ so.

FROST kyekye n’ankasa awo ntoatoaso titiriw fã wɔ Pedersen DKG (GJKR03), a ɛde Shamir kokoam kyɛfa ne Feldman kokoam kyɛfa nhyehyɛe a wotumi di ho adanse nyinaa di dwuma sɛ subroutines. Bio nso, ɛsɛ sɛ obiara a ɔde ne ho hyɛ mu no da nimdeɛ a ɔwɔ wɔ n’ankasa ahintasɛm ho adi denam adanse a nimdeɛ biara nnim a ɔde bɛmena wɔn a wɔde wɔn ho hyɛɛ mu afoforo no so, a ɛno ankasa yɛ Schnorr nsaano nkyerɛwee. Saa anammɔn foforo yi bɔ ho ban fi rogue-key ntua ho bere a t ≥ n/2.

Wɔ DKG protocol no awiei no, wɔyɛ joint verification key vk. Obiara a ɔde ne ho hyɛ mu Pᵢ kura botaeɛ (i, skᵢ ) a ɛyɛ wɔn kokoam kyɛfa a ɛtra hɔ kyɛ ne verification key share vkᵢ = skᵢ *G. Ɔdefoɔ Pᵢ no verification key share vkᵢ no, afoforɔ a wɔde wɔn ho hyɛ mu no de di dwuma de hwɛ sɛ Pᵢ nsaano nkyerɛwee kyɛfa no teɛ wɔ signing phase no mu, berɛ a verification key vk no, abɔnten sofoɔ de di dwuma de hwɛ sɛ nsaano nkyerɛwee a kuw no de ama no yɛ nokware.

**Aboboano Nsɛnkyerɛnne**

Saa fa yi gyina akwan a wonim a ɛde additive secret sharing ne share conversion di dwuma de non-interactively generate the nonce ma signature biara. Ɛsan nso de akwan horow a wɔfa so kyekyere nneɛma di dwuma de kwati ntua a wonim sɛ ɛyɛ atoro a ɛntoto nneɛma a ɛkɔ so bere koro mu ano.

Wɔ preprocessing stage no mu no, obiara a ɔde ne ho hyɛ mu no siesie Elliptic Curve (EC) nsɛntitiriw abien abien dodow bi a wɔahyɛ ato hɔ ma wɔde adi dwuma akyiri yi. Saa fã yi tu mmirika pɛnkoro wɔ threshold signing phases pii so.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

Signing Round 1: Obiara a ɔde ne ho hyɛ mu no Pᵢ fi ase denam kokoam nonce baanu biako (dᵢ, eᵢ) ne EC nsɛntitiriw abien a ɛne no hyia (Dᵢ, Eᵢ) a ɔde bɛma so, afei ɔde saa nsɛntitiriw abien yi kɔma wɔn a wɔde wɔn ho hyɛɛ mu afoforo nyinaa. Obiara a ɔde ne ho hyɛ mu no de EC nsɛntitiriw abien yi sie ma ɔde bedi dwuma akyiri yi. Signing rounds 2 ne 3 yɛ adwumayɛ ankasa a t-out-of-n a wɔde wɔn ho hyɛ mu no yɛ biako de yɛ Schnorr nsaano nkyerɛwee a ɛfata.

Signing Round 2: Wɔn a wɔbɛkɔ bi no bom yɛ adwuma de yɛ Schnorr nsaano nkyerɛwee a ɛfata. Ɔkwan titiriw a ɛwɔ saa round yi akyi ne t-out-of-t additive secret sharing.

Saa anammɔn yi siw atoro ntua ano efisɛ ntuafo ntumi nka nsaano nkyerɛwee kyɛfa nkabom wɔ nsaano nkyerɛwee dwumadi ahorow mu anaasɛ wɔnsakra wɔn a wɔde wɔn nsa hyɛɛ ase no nhyehyɛe anaa nsɛntitiriw a wɔatintim mma obiara a ɔde ne nsa hyɛɛ ase no.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Bere a wabu asɛnnennen c no, obiara a ɔde ne ho hyɛɛ mu no betumi de nonces a wɔde di dwuma pɛnkoro ne kokoam kyɛfa a wɔde di dwuma bere tenten, a ɛyɛ t-out-of-n (degree t-1) Shamir kokoam kyɛfa a ɛwɔ kuw no safoa a ɛtra hɔ kyɛ no so abu mmuae zᵢ no ho akontaa. Wɔ nsaano nkyerɛwee round 2 awiei no, obiara a ɔde ne ho hyɛ mu no bɔ zᵢ kyerɛ wɔn a wɔde wɔn ho hyɛɛ mu afoforo.

[Kenkan krataa no nyinaa](https://eprint.iacr.org/2020/852.pdf)

### FROST a wɔde di dwuma wɔ abɔde a nkwa wom a ɛtrɛw no mu

**FROST wɔ [Coinbase mu](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Sɛnea ɛbɛyɛ a Coinbase threshold-signing systems no bɛyɛ adwuma yiye no, wɔyɛɛ FROST bi. Saa Coinbase dwumadie yi yɛ nsakraeɛ kakra firi mfitiaseɛ FROST draft no mu.

Wɔpaw sɛ wɔremfa nsaano nkyerɛwee a wɔboaboa ano dwumadi no nni dwuma. Mmom no, obiara a ɔde ne ho hyɛ mu no yɛ obi a ɔboaboa nsaano nkyerɛwee ano. Saa nhyehyeɛ yi yɛ ahobanbɔ kɛseɛ: wɔn a wɔde wɔn ho hyɛ protocol no mu nyinaa di afoforo akontabuo ho adanseɛ, na wɔnam saayɛ so nya ahobanbɔ a ɛkorɔn na asiane so tew. Woyii preprocessing stage a na wɔyɛ pɛnkoro no nso fii hɔ sɛnea ɛbɛyɛ a wɔde bedi dwuma ntɛmntɛm, na wɔde signing round a ɛto so abiɛsa dii dwuma mmom.

---

**[TOTO](https://eprint.iacr.org/2022/550.pdf) Blockstream na ɔkyerɛwee**

Wɔahyɛ nyansa sɛ wɔmfa nkɔsoɔ a ɛfa dwumadie pɔtee bi ho wɔ FROST so mfa nni dwuma wɔ [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) ma Bitcoin.

"ROAST yɛ ade a ɛnyɛ den a wɔde kyekyere threshold signature schemes te sɛ FROST. Ɛma awerɛhyem sɛ quorum a ɛyɛ nokwaredifo a wɔde wɔn nsa hyɛ ase, e.g., Liquid adwumayɛfo no, betumi anya nsaano nkyerɛwee a ɛfata bere nyinaa wɔ mpo wɔ hɔ a disruptive signers wɔ hɔ bere a network connections wɔ arbitrarily high latency."

---

**FROST wɔ IETF mu**

Intanɛt Mfiridwuma Adwumakuo a wɔde sii hɔ wɔ afe 1986 mu no ne ahyehyɛdeɛ a ɛdi kan a ɛma wɔyɛ gyinapɛn ma Intanɛt. IETF no yɛ gyinapɛn ahorow a wofi wɔn pɛ mu yɛ a wɔn a wɔde Intanɛt di dwuma, wɔn a wɔyɛ nkitahodi nhyehyɛe, ne wɔn a wɔtɔn nnwinnade taa gye tom, na ɛboa ma wɔyɛ Intanɛt no kwan.

Wɔde FROST version 11 (a ɛyɛ abien-round variant) [wɔde akɔma IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Eyi yɛ anammɔn a ɛho hia a ɛbɛma wɔayɛ FROST nhwehwɛmu a edi mũ sɛ threshold signature scheme gyinapɛn foforo a wɔde bedi dwuma wɔ intanɛt so, wɔ hardware mfiri mu, ne nnwuma afoforo mu wɔ mfe a ɛreba no mu.


## Nkyerɛkyerɛmu a mfaso wɔ so

Yiw koraa. FROST a wɔde bɛba Zcash no bɛma akuo ahodoɔ pii, a wɔatew wɔn ho wɔ asasesin mu, atumi adi sika a wɔsɛe no tumi a ɛwɔ ZEC a wɔabɔ ho ban no so. Nkitahodi a wɔde saa nsaano nkyerɛwee nhyehyɛe yi bɛbɔ amanneɛ no, wɔrenhu nsonsonoe a ɛda nnwuma afoforo a ɛwɔ ntam no ntam, na ɛbɛkɔ so asɔre atia sikatua akyi a wodi no denneennen na ɛto blockchain data dodow a ɛwɔ hɔ ma nhwehwɛmu no ano hye.

Wɔ nnwuma mu no, eyi ma wotumi sisi application foforo pii wɔ network no so, efi escrow providers so kosi nnwuma afoforo a ɛnyɛ custodial so.

FROST nso bɛyɛ ade titiriw wɔ Zcash Shielded Assets (ZSA) a wɔde ma ne ne sohwɛ a ahobanbɔ wom mu, a ɛbɛma wɔatumi adi sika a wɔsɛe no tumidi ho dwuma a ahobammɔ wom wɔ nkɔso orgs & ZEC ahwɛfo te sɛ exchanges mu, bere a ɛsan nso de saa tumi yi ma Zcash dwumadiefoɔ.

## Mfomso a Ɛtaa Tu

**FROST a ɛyɛ basaa ne atetesɛm on-chain multisig**. Amanneɛ kwan so multisig betumi ada nnipa pii a wɔde wɔn nsa ahyɛ ase anaasɛ nsaano nkyerɛwee pii adi wɔ nkɔnsɔnkɔnsɔn so. FROST ma Schnorr nsaano nkyerɛwee biako a wɔaboaboa ano, enti wontumi nhu nsonsonoe a ɛda asɛm bi ne nsaano nkyerɛwee biako ntam.

**Fa no sɛ kakraa bi sen threshold no betumi de wo nsa ahyɛ ase**. Threshold number (t-out-of-n) a ɛfa wɔn a wɔde wɔn ho hyɛɛ mu a wɔbom yɛ ade nkutoo na ebetumi ama wɔanya nsaano nkyerɛwee a ɛfata; kuw ketewaa biara ntumi nyɛ saa.

**Sɛ yɛfa no sɛ FROST de biribiara sie off-chain**. FROST bɔ nsaano nkyerɛwee a ɛwɔ nkɔnsɔnkɔnsɔn so no ho ban, nanso nkitahodi a ɛda wɔn a wɔde wɔn nsa hyɛ ase ntam no da so ara kɔ so wɔ nkɔnsɔnkɔnsɔn no akyi na ɛhwehwɛ sɛ ɔhwɛ n’ankasa kokoam nsɛm ne ahobammɔ so.


## Nkratafa a Ɛfa Ho

- [Halo](/zcash-tech/halo) — adansedie a enni ahotosoɔ, a ɛsan ba bio a wɔde di dwuma wɔ Zcash Orchard pool mu.
- [Nsafe a Wɔde Hwɛ](/zcash-tech/viewing-keys) — paw a wɔda no adi ma nsɛm a wɔabɔ ho ban.
- [Zcash Shielded Agyapadeɛ](/zcash-tech/zcash-shielded-assets) — baabi a FROST boa ma wɔhwɛ sika a wɔsɛe no/wɔde ma ho tumidi so.
- [Zcash Sikakorabea a Wɔde Hyehyɛ](/zcash-tech/zcash-wallet-syncing) — Zcash kokoam nsɛm nhyehyɛe no fã titiriw foforo.


## Adesua a Ɛkɔ Akyiri

[Coinbase Asɛm - Threshold Nsaano Nkyerɛwee](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Ahintasɛm Kyɛ - Nkyerɛkyerɛmu & Nhwɛso](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video Tiawa a ɛfa Schnorr Digital Signatures ho](https://youtu.be/r9hJiDrtukI?t=19)

___
___

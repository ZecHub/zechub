<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## Nyatakaka Vevi

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) nye xexlẽme asidede agbalẽ te kple klavi ƒe dzidzeme le amehawo dome ƒe ɖoɖo: asidela geɖewo siaa le klavi sia tɔ̃ ƒe kpekpeɖeŋu aɖe si wo ƒe sia, eye wòhiã be wo dometɔ geɖe si wo da ɖo la nakpe ɖe eŋu be woawɔ asidede agbalẽ te aɖe.
* Esi emetsonu la nye Schnorr ƒe asidede agbalẽ te ɖeka, gaɖoɖo [transaction] si wowɔ ale la ƒe nɔnɔ le network me anɔ abe gaɖoɖo kawaida ene.
* Ehia ƒoƒo meɖoɖowo vi, wòate ŋu awɔ dɔ le ɣeyiɣi ɖeka me, eye wòate ŋu ade dzesi ame si wɔ nu vɔ̃ la eye wòadoe ɖe zaza me.
* Na Zcash, esia fia be FROST na amehawo siwo le anyigba ƒe teƒe vovovowo te ŋu nɔ la ate ŋu akplɔ gaɖoɖo ƒe ŋusẽ le ɣaɣla ZEC dzi — esia ƒe vi na gakotoku [wallet] ƒe dzrala, gaƒoƒoƒe, dɔwɔƒewo siwo menye asikplɔ-dzralá o, kple Zcash Shielded Assets (ZSA).
* Chelsea Komlo (University of Waterloo, Zcash Foundation) kple Ian Goldberg (University of Waterloo) wɔe.

## Nu Si Wòasrɔ Gbã

### Nu kae nye Schnorr ƒe asidede agbalẽ te?

Schnorr ƒe asidede agbalẽ te si nye digital la nye algorithm ƒe ƒuƒoƒo: (KeyGen, Sign, Verify).

Schnorr ƒe asidede agbalẽ tewo le viɖe geɖe. Viɖe vevi aɖe nye be ne wowɔ asidede le mesaj ma ke dzi kple klavi geɖe, woate ŋu aƒo asidede agbalẽ te siwo do tso eme la ƒu ɖe asidede agbalẽ te ɖeka me. Esia ate ŋu aɖe multisig ƒe fexexe [payment] kple gaɖoɖowo bubu siwo kplɔ multisig ɖo la ƒe lolome ɖe anyi kakhulu.

### Nu kae nye FROST?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Chelsea Komlo (University of Waterloo, Zcash Foundation) kple Ian Goldberg (University of Waterloo) wɔe.*

FROST nye xexlẽme asidede agbalẽ te kple klavi ƒe dzidzeme le amehawo dome ƒe ɖoɖo si hia ƒoƒo meɖoɖowo vi, eye wòate ŋu awɔ dɔ le ɣeyiɣi ɖeka me. FROST ƒe ɖoɖo nye Schnorr ƒe asidede agbalẽ te ƒe xexlẽme ƒe version.

To vovo na asidede agbalẽ tewo siwo le ame ɖeka ƒe nɔnɔ me la, xexlẽme asidede agbalẽ tewo hia be asidela geɖe si wo da ɖo nakpe ɖe eŋu, esi sia sia le klavi sia tɔ̃ ƒe kpekpeɖeŋu aɖe si wo ƒe.

[Nu kae nye Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Eya ta, asidede agbalẽ te ƒe wɔwɔ le xexlẽme ƒe nɔnɔ me hia dɔ bubu tso network ƒe ƒoƒo me le asidelawo dome, eye esia wɔna be wòxɔ asi ne woɖe ɣaɣla ƒe kpekpeɖeŋuwo ɖe mɔ̃dɔlawo dzi siwo ƒe network ŋusẽ meganɔ o, alo ne woƒo nu le network si mele nuteƒe o dzi.

Wona network ƒe dɔ bubu le asidede ƒe dɔwɔwɔ me nɔa anyi sue wu to mɔ yeye aɖe si dea tso forgery ƒe attacks me, eye wòle dɔ wɔm na scheme bubuwo hã.

FROST nana xexlẽme asidede agbalẽ te ƒe ɖoɖowo nɔnɔ nyuie wu to asidede agbalẽ te ƒe dɔwɔwɔ siwo menye nuwɔwɔ ƒe xexlẽme o ƒe numeɖeka me, be woate ŋu awɔ wo katã le ɣeyiɣi ɖeka me le dedie (concurrency).

Woate ŋu azãe abe ƒoƒo ƒe ɖoɖo si me asidelawo doa mesaj 2 eye woxɔ mesaj 2 katã ene, alo abe asidede ƒe ɖoɖo si woɖe nyuie si le ƒoƒo ɖeka me kple ɖoɖo gbã ƒe akpa ene.

FROST xɔ eƒe nɔnɔ nyuie ƒe akpa aɖe to mɔ si na ɖoɖo la ƒe dɔ nɔ teƒe ne ame aɖe wɔa nu vɔ̃, eye woade dzesi ame ma eye woadoe ɖe dɔwɔwɔ siwo gbɔna me.

Woɖo dedie ƒe ɖaseɖigbalɛwo si fia be FROST le dedie tso chosen-message attacks me, ne discrete logarithm ƒe kuxi le sesĩe, eye fliatɔ la kplɔ amehawo siwo sɔ ɖe xexlẽme la nu o, le [afisia](https://eprint.iacr.org/2020/852.pdf#page=16).

### Alekee FROST wɔa dɔ?

FROST ƒe ɖoɖo la ƒe akpa vevi evee:

Gbã la, amehawo n le klavi ƒe dzidzeme le amehawo dome (DKG) ƒe ɖoɖo aɖe dzi be woawɔ nukpɔsafui [viewing key] si wo katã ƒe. Le nuwuwu la, ame sia sia kpɔ klavi sia tɔ̃ ƒe kpekpeɖeŋu kple nukpɔsafui ƒe kpekpeɖeŋu si nye dukɔ ƒe.

Emegbe la, amehawo t-le-n me ate ŋu awɔ xexlẽme asidede ƒe ɖoɖo la ɖekae be woawɔ Schnorr ƒe asidede agbalẽ te si le eteƒe.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Nɔnɔ Ƒe Nɔnɔ / Mɔ Ƒe Ŋutinya

Bu FROST be enye gaƒoƒoƒe ƒe akpa si ƒu nɔe ne klavi tɔwo si woɖe mɔ na wɔnɔ la trɔ woƒe klaviwo ɖekae — ke menye be klavi tɔ sia sia nɔa anyi o; xexlẽme aɖe ko (kpɔɖeŋu, ame 3 le ame 5 me). Ne woƒu akpa la, ame si le gota mate ŋu akpɔ klavi tɔ kaewo va o, alo be ame ɖeka wu nɔ eme hã o. Nenema ke, ƒuƒoƒo aɖe ate ŋu ana mɔ na Zcash ƒe gaɖoɖo, eye network la kpɔ asidede agbalẽ te ɖeka ko si wɔnɔ abe dzidzɔ ene.

## Nya Kɔkɔe

**Klavi ƒe dzidzeme le amehawo dome (DKG)**

Akpa sia ƒe taɖodzinu nye be woawɔ klavi sia tɔ̃ ƒe kpekpeɖeŋuwo siwo anɔ anyi ɣeyiɣi didi kple nukpɔsafui si wo katã ƒe. Ame n wɔa akpa sia.

FROST tua eya ŋutɔ ƒe klavi ƒe dzidzeme ƒe akpa ɖo Pedersen ƒe DKG (GJKR03) dzi, si zãa Shamir ƒe ɣlɔ̃ɣlɔ̃ ƒe maɖama kple Feldman ƒe ɣlɔ̃ɣlɔ̃ ƒe maɖama si wòate ŋu akpɔ ɖa be wòle eteƒe la abe dɔwɔwɔ ƒe akpawo ene. Kpe ɖe eŋu la, ame sia sia ele be wòafia be eya ŋutɔ nya eƒe ɣlɔ̃ɣlɔ̃ la to zero-knowledge ƒe ɖaseɖigbalɛ si wòado ɖe amehawo bubu ŋu, si enye Schnorr ƒe asidede agbalẽ te hã. Akpa bubu sia dea tso rogue-key ƒe attacks me ne t ≥ n/2.

Le DKG ƒe ɖoɖo la ƒe nuwuwu la, woɖea nukpɔsafui si wo katã ƒe vk. Ame sia sia Pᵢ le value (i, skᵢ ) si nye eƒe ɣlɔ̃ɣlɔ̃ ƒe kpekpeɖeŋu si anɔ anyi ɣeyiɣi didi kple nukpɔsafui ƒe kpekpeɖeŋu vkᵢ = skᵢ *G. Ame Pᵢ ƒe nukpɔsafui ƒe kpekpeɖeŋu vkᵢ nye nu amehawo bubu zãna be woakpɔ be Pᵢ ƒe asidede agbalẽ te ƒe kpekpeɖeŋuwo le eteƒe le asidede ƒe akpa me, eye nukpɔsafui vk nye nu amehawo siwo le gota zãna be woakpɔ asidede agbalẽ te si ƒuƒoƒo la do la ɖa.

**Xexlẽme Ƒe Asidede**

Akpa sia ɖo ɖe mɔwo si nye nunya xoxo si zãa ɣlɔ̃ɣlɔ̃ ƒe maɖama si woate ŋu aƒo kpe kple kpekpeɖeŋu ƒe trɔtrɔ be woawɔ nonce na asidede sia sia le mɔ si me amehawo mewɔ dɔ ɖekae o. Ega zãa mɔwo si wɔnɔa nuwo ɖe teƒe ɖekae be woade tso forgery ƒe attacks si woyɔ o me, eye wòmele concurrency ɖom ɖe teƒe o.

Le ɖoɖo gbã ƒe akpa me la, ame sia sia ɖoa Elliptic Curve (EC) ƒe teƒewo ƒe pairs ƒe xexlẽme si woɖo ɖe eteƒe be woazãe emegbe. Akpa sia wɔa dɔ zi ɖeka le xexlẽme ƒe asidede ƒe akpawo geɖe dome.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

Asidede Ƒe Ƒoƒo 1: Ame sia sia Pᵢ dzena kple private nonce pair (dᵢ, eᵢ) ɖeka kple EC ƒe teƒewo ƒe pair si sɔ ɖe eŋu (Dᵢ, Eᵢ), eye wòdo teƒewo ƒe pair sia ɖe amehawo bubu katã ŋu. Ame sia sia ɖea EC ƒe teƒewo ƒe pairs siawo ɖo be woazãe emegbe. Asidede ƒe ƒoƒo 2 kple 3 nye dɔwɔwɔ tututɔ si me amehawo t-le-n kpena ɖe eŋu be woawɔ Schnorr ƒe asidede agbalẽ te si le eteƒe.

Asidede Ƒe Ƒoƒo 2: Amehawo wɔ dɔ ɖekae be woawɔ Schnorr ƒe asidede agbalẽ te si le eteƒe. Nunya vevi si le ƒoƒo sia megbe nye t-le-t ƒe ɣlɔ̃ɣlɔ̃ ƒe maɖama si woate ŋu aƒo kpe.

Afɔ sia dea tso forgery ƒe attacks me elabena attack wɔlawo mate ŋu aƒo asidede agbalẽ te ƒe kpekpeɖeŋuwo le asidede ƒe dɔwɔwɔ vovovoawo me kpe o, alo woatrɔ asidelawo ƒe ƒuƒoƒo alo teƒewo si woɖe fia na asidela sia sia.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Le esime woɖe challenge c xexle la, ame sia sia ate ŋu axexle response zᵢ to noncewo si woazã zi ɖeka kple ɣlɔ̃ɣlɔ̃ ƒe kpekpeɖeŋuwo siwo anɔ anyi ɣeyiɣi didi, siwo nye ƒuƒoƒo la ƒe klavi si anɔ anyi ɣeyiɣi didi ƒe t-le-n (degree t-1) Shamir ƒe ɣlɔ̃ɣlɔ̃ ƒe kpekpeɖeŋuwo. Le asidede ƒe ƒoƒo 2 ƒe nuwuwu la, ame sia sia doa zᵢ ɖe amehawo bubu ŋu.

[Xlẽ agbalẽ blibo la](https://eprint.iacr.org/2020/852.pdf)

### FROST ƒe zazã le ecosystem blibo me

**FROST le [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost) me**

Be woana Coinbase ƒe xexlẽme ƒe asidede ƒe ɖoɖowo wɔ dɔ nyuie wu la, wowɔ FROST ƒe version aɖe. Coinbase ƒe dɔwɔwɔ sia wɔ tɔtrɔ sue aɖewo tso FROST ƒe draft gɔme.

Wotia be woazã signature aggregator ƒe dɔa o. Le ɖeke me la, ame sia sia nye signature aggregator. Nɔnɔ sia le dedie wu: amehawo katã le ɖoɖo la me kpɔa amehawo bubu ƒe xexleɖewo ɖa, eye woɖo dedie ƒe nɔnɔ kɔkɔe wu teƒe eye woɖea afɔku ƒe nuwo ɖe anyi. Woɖe preprocessing ƒe akpa si wɔa dɔ zi ɖeka hã ɖa be dɔwɔwɔ la nava kabakaba wu, eye woza asidede ƒe ƒoƒo etɔ ɖe eteƒe.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) tso Blockstream**

Woɖo FROST ƒe nɔnɔ nyuitɔ si wɔe na dɔ tɔxɛ aɖe be woazãe le [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) dzi na Bitcoin.

“ROAST nye wrapper bɔbɔe aɖe si le xexlẽme ƒe asidede ƒe ɖoɖowo abe FROST ene ƒe xexlẽme. Wòɖo kpo be asidelawo siwo wɔnɔ nyuie ƒe quorum, kpɔɖeŋu, Liquid functionaries, ate ŋu akpɔ asidede agbalẽ te si le eteƒe ɣesiaɣi, gɔ̃ hã ne asidelawo aɖewo katã wɔa dɔ vɔ̃ eye network ƒe kadodo le ɣeyiɣi didi si meke wòte ŋu ayɔ o.”

---

**FROST le IETF me**

Internet Engineering Task Force, si woɖo le 1986 me, nye standards ƒe dzidzeme ƒe habɔbɔ si kɔkɔe wu na Internet. IETF wɔa standards si mewobia be amehawo nava zã o, ke Internet ƒe zãlawo, network ƒe dzralawo, kple mɔ̃ ƒe dzidzelawo zãna zi geɖe, eye esia kpena ɖe Internet ƒe mɔ si wòto la ŋu.

FROST version 11 (two-round variant) woɖo [do ɖe IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Esia nye afɔ vevi aɖe yi FROST ƒe kpɔkpɔ blibo ŋu abe xexlẽme ƒe asidede agbalẽ te ƒe standard yeye si woazã le internet blibo me, le hardware ƒe mɔ̃wo me, kple na dɔwɔƒe bubuwo le ƒeawo si gbɔna me.

## Dɔwɔwɔ Ƒe Gomeɖeɖe

Ɛ̃, tututu. FROST ƒe vava yi Zcash me ana amehawo geɖe siwo le anyigba ƒe teƒe vovovowo te ŋu nɔ la nakplɔ gaɖoɖo ƒe ŋusẽ le ɣaɣla ZEC dzi. Gaɖoɖowo si woado ɖe network la dzi to asidede ƒe ɖoɖo sia zazã me la anɔ abe gaɖoɖo bubuwo le network la me ene, eye woakpɔ ŋusẽ sesĩe be woatsɔ akpɔ fexexe ƒe mɔwo ɖa, eye woaɖe gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] ƒe nyatakaka si woate ŋu akpɔa be woaxle dɔ le eŋu la ƒe lolome ɖe anyi.

Le dɔwɔwɔ me la, esia na mɔ be woatu dɔwɔwɔ yeye ƒe ha geɖe le network la dzi, tso gaƒoƒoƒe ƒe dzralawo gbɔ yi dɔwɔƒe bubuwo siwo menye asikplɔ-dzralá o gbɔ.

FROST hã atrɔ zu akpa vevi le Zcash Shielded Assets (ZSA) ƒe dodododo kple dzradrza si le dedie me, eye wòana woakplɔ gaɖoɖo ƒe ŋusẽ nyuie wu le development ƒe habɔbɔwo kple ZEC ƒe asikplɔ-dzraláwo abe gatrɔƒewo [exchange] ene me, eye wòana Zcash ƒe zãlawo hã nakpɔ ŋusẽ sia.

## Vodada Siwo Wɔna Zi Geɖe

**FROST ƒe mamanya kple on-chain [ɖoɖonu dzi] multisig xoxo**. Multisig xoxo ate ŋu afia asidelawo geɖe alo asidede agbalẽ te geɖe ɖoɖonu dzi. FROST wɔa Schnorr ƒe asidede agbalẽ te ɖeka si woƒo ƒu, eyata gaɖoɖo aɖe menye vovototo le gaɖoɖo si le asidede ɖeka me ŋu o.

**Miexɔe se be amehawo siwo sɔ ɖe xexlẽme la nu ate ŋu aside**. Ame geɖe siwo da ɖo (t-le-n) siwo wɔa dɔ ɖekae ko ate ŋu awɔ asidede agbalẽ te si le eteƒe; ƒuƒoƒo si su wɔnɛ mate ŋu awɔe o.

**Miexɔe se be FROST ɣaɣla nu sia katã le ɖoɖonu me o**. FROST dea asidede agbalẽ te si le ɖoɖonu dzi la tso afɔku me, ke ƒomeɖoɖo le asidelawo dome gaɖe le ɖoɖonu me o, eye wòhia eya ŋutɔ ƒe ɣaɣla kple dedie ƒe dzidzenuwo.

## Axa Siwo Kplɔe ɖo

- [Halo](/zcash-tech/halo) — ɖaseɖigbalɛ ƒe ɖoɖo si meka ɖe ame aɖe ŋu o, si wòate ŋu atrɔ ɖe eya ŋutɔ me, si Zcash zãna le eƒe Orchard ƒe gaƒuƒoƒo [pool] me.
- [Nukpɔsafuiwo](/zcash-tech/viewing-keys) — nyatakaka tɔxɛ ɣaɣla [selective disclosure] na ɣaɣla gaɖoɖowo.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — afi si FROST kpena ɖe gaɖoɖo/nu dodododo ƒe ŋusẽ ƒe dzradrza ŋu.
- [Zcash Gakotoku ƒe Sync Wɔwɔ](/zcash-tech/zcash-wallet-syncing) — akpa vevi bubu le Zcash ƒe ɣaɣla ƒe nɔnuwo me.

## Nusrɔ̃ Muna Wu

[Coinbase Article - Xexlẽme Ƒe Asidede Agbalẽ Tewo](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir ƒe Ɣlɔ̃ɣlɔ̃ Ƒe Maɖama - Nuxlẽɖeŋu kple Kpɔɖeŋu](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video Vevi Kuɖe Ŋu Tso Schnorr ƒe Digital Asidede Agbalẽ Tewo Ŋu](https://youtu.be/r9hJiDrtukI?t=19)

___
___

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST ƑE NUÐEÐEŊUTI


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) nye dzidzenu ƒe asidede agbalẽ te kple safui dzidzi ƒe ɖoɖo si woma: asidede agbalẽ te geɖewo dometɔ ɖesiaɖe ƒe akpa aɖe le ame ŋutɔ ƒe safui ɖeka me, eye ele be wo dometɔ ƒe dzidzenu ƒe xexlẽme nawɔ nu aduadu be woawɔ asidede ɖeka.
* Esi wònye be nusi dona tso eme nye Schnorr ƒe asidede agbalẽ te ɖeka ta la, asitsatsa si wowɔ alea la dzena abe asitsatsa dzro aɖe si wowɔna le network la dzi ene.
* Ebia kadodo sue aɖe ko, ate ŋu aƒu du le ɣeyiɣi ɖeka me, eye ate ŋu ade dzesi gomekpɔla si wɔa nu gbegblẽ ahaɖee ɖa.
* Le Zcash gome la, esia fia be FROST na be akpa geɖe, siwo dome to vovo le anyigba ƒe nɔnɔme nu la te ŋu kpɔa ŋusẽ ɖe ZEC si wokpɔ ta na ƒe gazazã ƒe ŋusẽ dzi — si ɖea vi na nudzikpɔkpɔ, escrow, dɔwɔna siwo menye nudzraɖoƒe o, kple Zcash Shielded Assets (ZSA).
* Chelsea Komlo (Waterloo Yunivɛsiti, Zcash Foundation) kple Ian Goldberg (Waterloo Yunivɛsiti) ye wɔe.

## Numeɖeɖe Vevitɔ

### Nukae nye Schnorr ƒe asidede agbalẽ te?

Schnorr ƒe dijitaal asidede agbalẽ te nye akɔntabubuwo ƒe hatsotso aɖe: (KeyGen, Sign, Verify).

Viɖe geɖe le Schnorr ƒe asidede agbalẽ te ŋu. Viɖe vevi ɖekae nye be ne wozã safui geɖe tsɔ de asi gbedasi ɖeka te la, woate ŋu aƒo asidede agbalẽ te siwo do tso eme la nu ƒu wòazu asidede agbalẽ te ɖeka. Esia ate ŋu aɖe multisign fexexe kple asitsatsa bubu siwo do ƒome kple multisign ƒe lolome dzi akpɔtɔ ŋutɔ.

### Nukae nye FROST?

**Schnorr ƒe dzidzenu ƒe asidede agbalẽ te siwo te ŋu trɔna goglo-Optimised** -
*Chelsea Komlo (Waterloo Yunivɛsiti, Zcash Foundation) & Ian Goldberg (Waterloo Yunivɛsiti) ye wɔe.*

FROST nye threshold signature kple distributed key generation protocol si hiã kadodo ƒe ƒoƒo suetɔ kekeake eye woateŋu awɔe le ɣeyiɣi ɖeka me. FROST ɖoɖowɔɖi nye Schnorr ƒe asidede agbalẽ te ƒe ɖoɖoa ƒe dzidzenu ƒe tɔtrɔ.

To vovo na asidede agbalẽ te le ame ɖeka ƒe nɔnɔme me la, dzidzenu ƒe asidede agbalẽ te bia be woawɔ nu aduadu le amesiwo de asi agbalẽ te ƒe xexlẽme si woɖo ɖi dome, eye wo dometɔ ɖesiaɖe ƒe gome le ame ŋutɔ ƒe safui ɖeka me.

[Nukae nye Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Eyata asidede agbalẽ te wɔwɔ le dzidzenu ƒe ɖoɖo me xɔa ga geɖe le network ƒe tsatsam le asidede agbalẽ te dome ta, si wɔnɛ be wòxɔa ga geɖe ne wodzra adzame gomekpɔkpɔwo ɖo ɖe mɔ̃ siwo me network seɖoƒe le dzi alo ne ɖoɖowɔwɔ dzɔ le network siwo dzi womate ŋu aka ɖo o dzi.

Woɖea network ƒe gazazã dzi kpɔtɔna le asidede agbalẽ te ƒe dɔwɔnawo me to mɔnu yeye aɖe zazã si kpɔa ame ta tso aʋatsokaka ƒe amedzidzedze me eye wòsɔ na ɖoɖo bubuwo hã.

FROST na threshold signature protocols nyona ɖe edzi to mɔɖeɖe be woawɔ asidede dɔwɔwɔ ƒe xexlẽme si seɖoƒe meli na o dedie le parallel (concurrency) me.

Woateŋu azãe abe 2-round protocol, afisi asidede agbalẽ te ɖoa gbedasi 2 ɖa eye woxɔa wo le wo katã me, alo abe 2-round signing protocol si wowɔ nyuie wu kple preprocessing stage.

FROST kpɔa eƒe dɔwɔwɔ nyuie ƒe ŋgɔyiyi ƒe akpa aɖe to mɔɖeɖe na ɖoɖowɔɖia be wòaɖe fu le gomekpɔla aɖe si mewɔa nu gbegblẽ o la ŋkume, amesi emegbe wodea dzesii eye woɖenɛ ɖa le etsɔme dɔwɔwɔwo me.

Wotsɔ dedienɔnɔ ƒe kpeɖodzi siwo ɖee fia be FROST le dedie tso gbedasi tiatia ƒe amedzidzedzewo me, ne wotsɔe be discrete logarithm kuxia sesẽ, eye futɔa kpɔa gomekpɔla ʋɛ aɖewo dzi wu dzidzenua, na [le afisia](https://eprint.iacr.org/2020/852.pdf#page=16).

### Aleke FROST wɔa dɔe?

Nu vevi eve le FROST ƒe ɖoɖowɔɖia me:

Gbã la, n gomekpɔlawo wɔa distributed key generation (DKG) protocol tsɔ wɔa kpeɖodzi safui si bɔ. Le nuwuwu la, gomekpɔla ɖesiaɖe xɔa ame ŋutɔ ƒe adzame safui ƒe gome kple dutoƒo kpeɖodzi safui ƒe gome.

Le ema megbe la, t-out-of-n gomekpɔla ɖesiaɖe ateŋu awɔ threshold signing protocol be woawɔ Schnorr ƒe asidede agbalẽ te si sɔ le nuwɔwɔ aduadu me.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Nukpɔkpɔ / Nusɔsrɔ̃

Bu FROST abe dedienɔƒe si ʋuna ne safuixɔla geɖe siwo ŋu woɖe mɔ ɖo trɔ woƒe safuiwo ɖekae ko — gake menye safuitɔ ɖesiaɖee wobia o; xexlẽdzesi si woɖo ko (le kpɔɖeŋu me, 3 ɖesiaɖe le 5 me). Ne wonya ʋu aɖakaa ko la, eteƒekpɔla si le egodo mate ŋu anya safui siwo va, alo be ame siwo wu ɖeka koe kpɔ gome le eme gɔ̃ hã o. Le mɔ ma ke nu la, ƒuƒoƒo aɖe ate ŋu awɔ ɖeka aɖe mɔ ɖe Zcash ƒe asitsatsa ŋu esime network la kpɔa asidede agbalẽ te ɖeka si dze abe ame tsɛ ene ko.

## Deep Dive (Tsi me tsi goglo).

**Dzidzime vevi si woma (DKG)**

Taɖodzinu si le akpa sia ŋue nye be woawɔ safui ɣaɣla siwo anɔ anyi didi kple safui si woatsɔ aɖo kpe edzi ɖekae. Akpa sia nyea gomekpɔla n.

FROST tu eya ŋutɔ ƒe dzidzime vevi ƒe akpa ɖe Pedersen ƒe DKG (GJKR03) dzi, si zãa Shamir ƒe adzame mama kple Feldman ƒe adzame mama ƒe ɖoɖo siwo ŋu woate ŋu aɖo kpee siaa abe ɖoɖowɔɖi suewo ene. Tsɔ kpe ɖe eŋu la, ele be gomekpɔla ɖesiaɖe naɖe eya ŋutɔ ƒe nya ɣaɣla sidzedze afia to kpeɖodzi si me sidzedze aɖeke mele o ɖoɖo ɖe gomekpɔla bubuawo me, si ŋutɔ nye Schnorr ƒe asidede agbalẽ te. Afɔɖeɖe bubu sia kpɔa ame ta tso rogue-key ƒe amedzidzedzewo me ne t ≥ n/2.

Le DKG ƒe ɖoɖowɔɖia ƒe nuwuwu la, wowɔa ƒuƒoƒo ƒe kpeɖodzi safui vk. Gomenɔla ɖesiaɖe Pᵢ lé asixɔxɔ (i, skᵢ ) si nye woƒe adzame gomekpɔkpɔ si nɔa anyi didi kple kpeɖodzi safui ƒe gomekpɔkpɔ vkᵢ = skᵢ *G. Gomenɔla Pᵢ ƒe kpeɖodzi safui ƒe akpa vkᵢ nye esi gomekpɔla bubuwo zãna tsɔ ɖoa ​​kpe Pᵢ ƒe asidede agbalẽ te ƒe gomekpɔkpɔ ƒe dzɔdzɔenyenye dzi le asidede agbalẽ te ƒe akpaa me, gake kpeɖodzi safui vk ya nye esi gotagometɔwo zãna tsɔ ɖoa ​​kpe asidede agbalẽ te siwo ƒuƒoƒoa ɖe ɖe go dzi.

**Akɔtadzesi ƒe Asidede**

Akpa sia tua aɖaŋu nyanyɛ siwo zãa additive secret sharing kple share conversion be non-interactively dzia nonce na asidede ɖesiaɖe. Ewɔa aɖaŋu siwo wotsɔ blaa nu hã ŋudɔ tsɔ ƒoa asa na aʋatsokaka ƒe amedzidzedze siwo wonya evɔ meɖoa seɖoƒe na nusiwo dzɔna le ɣeyiɣi ɖeka me o.

Le dɔwɔwɔ do ŋgɔ ƒe afɔɖeɖea me la, gomekpɔla ɖesiaɖe dzraa Elliptic Curve (EC) ƒe teƒe eve ƒe xexlẽme si woɖo ɖi ɖo hena zazã emegbe. Afɔɖeɖe sia zɔna zi ɖeka to dzidzenu ƒe asidede agbalẽ te ƒe akpa geɖewo dzi.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Asidede agbalẽ te ƒe Kpekpe 1: Gomenɔla ɖesiaɖe Pᵢ dzea egɔme kple ame ŋutɔ ƒe nonce eve (dᵢ, eᵢ) kple EC ƒe dzesi eve siwo sɔ (Dᵢ, Eᵢ) wɔwɔ, emegbe eɖea dzesi eve sia ɖe go na gomekpɔla bubuawo katã. Gomenɔla ɖesiaɖe dzraa EC-point eve siawo ɖo be woazã emegbe. Asidede agbalẽ te ƒe ƒoƒo 2 kple 3 nye dɔwɔwɔ ŋutɔŋutɔ siwo me t-out-of-n gomekpɔlawo wɔa nu aduadu le be woawɔ Schnorr ƒe asidede agbalẽ te si sɔ.

Asidede agbalẽ te ƒe Kpekpe 2 lia: Gomenɔlawo wɔa dɔ aduadu be woawɔ Schnorr ƒe asidede agbalẽ te si sɔ. Mɔnu vevitɔ si le megbe na ƒoƒo siae nye t-out-of-t additive secret sharing.

Afɔɖeɖe sia xea mɔ na aʋatsokaka ƒe amedzidzedzewo elabena amedzidzelawo mate ŋu aƒo asidede agbalẽ te ƒe gomekpɔkpɔwo nu ƒu le asidede agbalẽ te ƒe dɔwɔna vovovowo me alo atrɔ asi le amesiwo de asi agbalẽ te ƒe hatsotso alo teƒe siwo wota na asidede agbalẽ te ɖesiaɖe ŋu o.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Esi wobu kuxi c vɔ la, gomekpɔla ɖesiaɖe ate ŋu abu ŋuɖoɖo zᵢ to nonces siwo wozãna zi ɖeka kple adzame gomekpɔkpɔ siwo nɔa anyi didi, siwo nye t-out-of-n (degree t-1) Shamir adzame gomekpɔkpɔwo le ƒuƒoƒoa ƒe safui si nɔa anyi didi la zazã me. Le asidede agbalẽ te ƒe ƒoƒo 2 lia ƒe nuwuwu la, gomekpɔla ɖesiaɖe ɖea zᵢ ɖe go na gomekpɔla bubuwo.

[Xlẽ agbalẽ bliboa](https://eprint.iacr.org/2020/852.pdf)

### FROST zazã le lãwo ƒe agbenɔnɔ ƒe ɖoɖo si keke ta wu me

**FROST le [Coinbase me](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Be Coinbase ƒe threshold-signing systems ƒe dɔwɔwɔ nanyo ɖe edzi la, wowɔ FROST ƒe tɔtrɔ aɖe. Coinbase ƒe dɔwɔwɔ sia wɔa tɔtrɔ sue aɖewo tso FROST ƒe nuŋɔŋlɔ gbãtɔ gbɔ.

Wotiae be yewomazã asidede agbalẽ te ƒe nuƒoƒoƒu ƒe akpaa o. Ke boŋ gomekpɔla ɖesiaɖe nyea asidede agbalẽ te nuƒoƒoƒula. Aɖaŋu sia le dedie wu: gomekpɔla siwo katã le ɖoɖowɔɖia me la ɖoa kpe ame bubuwo ƒe akɔntabubuwo dzi, si wɔnɛ be wokpɔa dedienɔnɔ ƒe ɖoɖo si de ŋgɔ wu eye woɖea afɔku dzi kpɔtɔna. Woɖe afɔɖeɖe si wowɔna zi ɖeka do ŋgɔ hã ɖa be woawɔ dɔ kabakaba, eye wozã asidede agbalẽ te ƒe ɣeyiɣi etɔ̃lia ɖe eteƒe.

---

**[ME](https://eprint.iacr.org/2022/550.pdf) si Blockstream ŋlɔ**

Wodo ŋgɔyiyi aɖe si ku ɖe dɔwɔwɔ tɔxɛ aɖe ŋu le FROST ŋu be woazã le [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) na Bitcoin.

"ROAST nye nusi wotsɔ blaa nu bɔbɔe aɖe si ƒo xlã threshold signature schemes abe FROST. Enaa kakaɖedzi be ameha si dea asi anukwareɖilawo dome, e.g., Liquid dɔwɔlawo, ateŋu axɔ asidede agbalẽ te si sɔ ɣesiaɣi le asidede agbalẽ te siwo gblẽa nu le ame ŋu ƒe anyinɔnɔ gɔ̃ hã me ne network kadodowo ƒe latency lolo le wo ɖokui si."

---

**FROST le IETF me**

Internet Mɔ̃ɖaŋudɔwo ƒe Dɔwɔha, si woɖo le ƒe 1986 me, ye nye dzidzenuwo wɔwɔ ƒe habɔbɔ vevitɔ kekeake na Internet. IETF wɔa lɔlɔ̃nu faa dzidzenu siwo dzi Internet zãlawo, kɔmpiutadziɖoɖodzikpɔlawo, kple dɔwɔnudzralawo da asi ɖo zi geɖe, si kpena ɖe ame ŋu wòtrɔa asi le Internet ƒe mɔzɔzɔ ŋu.

Wotsɔ FROST ƒe tɔtrɔ 11 (si ƒe tɔtrɔ eve le) [ɖoe ɖe IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Esia nye afɔɖeɖe vevi aɖe si ana woada FROST kpɔ bliboe abe dzidzenu yeye si woatsɔ ade asi agbalẽ te ƒe ɖoɖo si woazã le internet dzi katã, le xɔtunuwo me, kple na dɔwɔna bubuwo le ƒe siwo gbɔna me.


## Nusiwo wòfia ŋutɔŋutɔ

Ẽ bliboe. FROST ƒe dodo ɖe Zcash me ana akpa geɖe, siwo dome to vovo le anyigba ƒe nɔnɔme nu, nakpɔ ŋusẽ ɖe ZEC si wokpɔ ta na ƒe gazazã ƒe ŋusẽ dzi. Womate ŋu ade vovototo asitsatsa siwo woaɖe ɖe go to asidede agbalẽ te ƒe ɖoɖo sia zazã me kple asitsatsa bubu siwo le network la dzi o, si alé tsitretsitsi sesẽ ɖe fexexe yometiti ŋu me ɖe asi eye wòaɖo seɖoƒe na blockchain nyatakaka agbɔsɔsɔme si li hena numekuku.

Le nyateƒe me la, esia wɔnɛ be woate ŋu atu dɔwɔnu yeye geɖe ɖe network la dzi, tso escrow dɔwɔƒewo dzi va ɖo dɔwɔƒe bubu siwo menye gaxɔmenɔnɔ ƒe dɔwɔƒe o dzi.

FROST hã ava zu akpa vevi aɖe le Zcash Shielded Assets (ZSA) ƒe nana kple edzikpɔkpɔ dedie me, si ana gazazã ƒe ŋusẽ dzikpɔkpɔ dedie wu le ŋgɔyiyi orgs & ZEC dzikpɔlawo abe exchanges ene me, esime wòana ŋutete sia hã Zcash zãlawo.

## Vodada Siwo Wowɔna Zi geɖe

**FROST tɔtɔ kple kɔsɔkɔsɔ dzi multisig xoxo**. Dekɔnu multisig ateŋu aɖe asidede agbalẽ te geɖe alo asidede agbalẽ te geɖe ɖe kɔsɔkɔsɔ dzi. FROST wɔa Schnorr ƒe asidede agbalẽ te ɖeka si woƒo ƒu, eyata womate ŋu ade vovototo asitsatsa kple asidede agbalẽ te ɖeka dome o.

**Ne míetsɔe be wosɔ gbɔ wu dzidzenu la ate ŋu ade asi ete**. Gomenɔla siwo wɔa nu ɖekae ƒe xexlẽdzesi si woɖo ɖi (t-tso-n) koe ate ŋu awɔ asidede agbalẽ te si sɔ; ƒuƒoƒo sue ɖesiaɖe mate ŋui o.

**Ne míetsɔe be FROST ɣlaa nusianu off-chain**. FROST kpɔa asidede agbalẽ te le kɔsɔkɔsɔa me ta, gake nuwɔwɔ aduadu le asidede agbalẽ te dome gakpɔtɔ dzɔna le kɔsɔkɔsɔa godo eye ebia be wòakpɔ eya ŋutɔ ƒe ameŋunyatakakawo kple dedienɔnɔ dzi.


## Axa Siwo Do Ƒome Kplii

- [Halo](/zcash-tech/halo) — kpeɖodziɖoɖo si dzi womate ŋu aka ɖo o, si gbugbɔna dzɔna si wozãna le Zcash ƒe Orchard ta la me.
- [Nukpɔkpɔ ƒe Safuiwo](/zcash-tech/viewing-keys) — tiatia tiatia na asitsatsa siwo wokpɔ ta na.
- [Zcash ƒe Nunɔamesi Siwo Wokpɔna](/zcash-tech/zcash-shielded-assets) — afisi FROST kpena ɖe gazazã/nuɖeɖe ƒe ŋusẽ dzi kpɔkpɔ ŋu le.
- [Zcash Gakotoku ƒe Ðoɖowɔwɔ](/zcash-tech/zcash-wallet-syncing) — Zcash ƒe ameŋunyatakakawo ŋuti dɔwɔnu vevi bubu.


## Nusɔsrɔ̃ Bubuwo

[Coinbase Nyati - Dzesidede asidede agbalẽ te](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Nya ɣaɣlawo mama - Numeɖela & Kpɔɖeŋu](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video Kpuie si ku ɖe Schnorr Digital Signatures ŋu](https://youtu.be/r9hJiDrtukI?t=19)

___
___

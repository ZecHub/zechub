<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Gakotoku ƒe Ðoɖowɔwɔ

## TL;DR

* Esi wònye be Zcash ƒe asitsatsa siwo wokpɔ ta na ɣlaa woƒe nyatakakawo ta la, server mate ŋu adi gakotoku ƒe ga si susɔ ko abe alesi wòate ŋu akpɔ gaku siwo me kɔ abe Bitcoin alo Ethereum ene ko o.
* Kekeli gakotokuwo ɖea “compact blocks” suewo tso server tɔxɛ aɖe (lightwalletd) dzi eye woawo ŋutɔwo tsɔa woƒe safuiwo ɖea nyatakaka siwo sɔ la me.
* Block mawo ɖeɖeɖa kple wo ŋudɔwɔwɔ xɔa ɣeyiɣi, eyata gakotokuwo zãa mɔnu siwo wɔa ɖeka kabakaba wu be nàte ŋu azã wò ga kaba.
* Mɔnu ɖedzesiwo: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), kple DAGSync si wodo ɖa.
* Zi geɖe la, mɔnu siawo ɖɔlia ŋkuɖodzinu alo dɔwɔwɔ ƒe ŋusẽ bubu hena dɔwɔwɔ ɖekae kabakaba.

## Numeɖeɖe Vevitɔ

### Alesi Zcash syncing wɔa dɔe

Zcash zãa kpeɖodzi siwo me sidzedze aɖeke mele o tsɔ kpɔa asitsatsa ŋuti nyatakakawo ta tso amesiwo ŋu womeɖe mɔ ɖo o gbɔ. Nya ɣaɣla sia na be gakotoku siwo me kɔ la ƒe wɔwɔ ɖekae sesẽna elabena womedzraa blockchain bliboa ɖo ɖe teƒea o eye woɖoa ŋu ɖe server ŋu ​​boŋ hena nyatakaka siwo hiã. Le Bitcoin alo Ethereum me la, serverwo ate ŋu awɔ index le blockchain la ŋu eye woatrɔ akɔnta ŋuti nyatakakawo kaba. Gake le Zcash gome la, server la mate ŋu akpɔ asitsatsa ŋuti nyatakakawo o. Eyata aleke gakotoku si me kɔ ate ŋu awɔ ɖeka kple eƒe dadasɔ kple ŋutinya evɔ maɖe blockchain bliboa ŋutɔ ƒe kɔpi ahaɖe eƒe nyatakakawo ɖa o?

Zcash kpɔa kuxi sia gbɔ to mɔnu vovovowo ƒoƒo ƒu me. Server tɔxɛ aɖe le esi, lightwalletd, si ɖea nyatakakawo tso node blibo aɖe me eye wòdzraa nusiwo hiã hena asitsatsa ƒe dzesidede ko ɖo. Woyɔa nyatakaka sia be compact blocks, eye wòle sue wu block gbãtɔawo sã. Kekeli gakotokuwo ɖea xɔtunu sue siawo tso lightwalletd server la dzi gbã eye emegbe wotsɔa woƒe safui ɣaɣlawo ɖea wo gɔme.

Block siawo ƒe nya ɣaɣlawo ɖeɖeɖa kple wo ŋudɔwɔwɔ gɔ̃ hã ate ŋu axɔ ɣeyiɣi geɖe, vevietɔ ne asitsatsa geɖe le block ɖeka me. Eyata gakotokuwo zãa mɔnu vovovowo tsɔ naa nuwɔwɔ ɖekae kabakaba eye wònana nèzãa wò ga kaba ale si nàte ŋui.

## Nukpɔkpɔ / Nusɔsrɔ̃

Bu blockchain la be enye posuxɔ gã aɖe si me aɖaka siwo wotu yɔ fũu. Ne gaku si me kɔ la, posudɔwɔƒea ƒe agbalẽŋlɔla ate ŋu axlẽ nusiwo woŋlɔ ɖe wo dzi eye wòagblɔ aɖaka siwo nye tɔwò na wò enumake. Le Zcash me la, woɣlaa dzesideawo — eyata ele be wò gakotokua naxɔ eƒe safuiwo eye wòalé ŋku ɖe aɖakaawo ŋutɔ ŋu kpoo be yeake ɖe esiwo wòate ŋu aʋu ŋu. Nuwɔwɔ ɖekae ƒe mɔnu siwo le ete nye mɔnu vovovo siwo dzi woato ade dzesi aɖaka mawo kabakaba wu.

## Deep Dive (Tsi me tsi goglo).

### Warp Sync ƒe wɔwɔme

Warp sync nye YWallet ƒe nɔnɔme si doa kpo afɔɖeɖe siwo le domedome siwo nye decrypting kple dɔwɔwɔ le compact block ɖesiaɖe me, ti kpo yia emetsonu mamlɛtɔ gbɔ tẽ.

Be wòate ŋu awɔ esia la, ezãa akɔntabubu kple nya ɣaɣlawo tsɔ bua akɔnta le emetsonu mamlɛtɔ ŋu evɔ metoa afɔɖeɖe ɖesiaɖe me o.

Warp sync ate ​​ŋu awɔ dɔ tso block akpe geɖe ŋu le sɛkɛnd ɖeka me, si wɔa dɔ kabakaba wu synchronization mɔnu si wozãna ɖaa. Esia fia be YWallet zãlawo ate ŋu ase vivi na dɔwɔwɔ kabakaba eye wòanɔ bɔbɔe, ne wowɔ asitsatsa akpe alafa geɖe eye woxɔ nuŋlɔɖiwo le woƒe akɔntabubuwo me gɔ̃ hã.

Le afɔɖeɖe-ti-ti-mɔnu sia ɖeɖeko megbe la, YWallet ate ŋu awɔ dɔ tso blɔka geɖe ŋu le ɣeyiɣi ɖeka me, ama agbaa ɖe wò xɔtunu siwo li la dzi be wòana dɔwɔwɔa nawɔ kabakaba wu.

Xlẽ Nu Geɖe le [Warp Sync](https://ywallet.app/warp/)

### Zã-hafi-wɔ ɖekawɔwɔ

Spend-before-sync nye nu yeye aɖe le Zcash Mobile Wallet SDK V2 me si na be ezãlawo te ŋu zãa ga enumake ne woʋu woƒe gakotoku, evɔ womalala gakotokua ƒe ɖekawɔwɔ blibo o. Nɔnɔme sia nana woke ɖe gakotokua ƒe ga si woate ŋu azã ŋu kabakaba eye wònaa ezãla ƒe nuteƒekpɔkpɔ nyona ɖe edzi.

Spend-before-sync wɔa dɔ to compact-blocks synchronization algorithm zazã me si wɔa blocks tso lightwalletd server la gbɔ le ɖoɖo si menye linear o nu. Esia fia be le esi teƒe be gakotokuwo nalala be woawɔ dɔ tso block ɖeka ŋu bliboe hafi ayi edzi la, woate ŋu azã ŋkuɖodzinu kple dɔwɔwɔ ƒe ŋusẽ si sɔ gbɔ vie atsɔ akpɔ blockchain la ƒe akpa vovovowo. Zi geɖe la, ewɔa scan ɖe range vovovowo dzi, dia asitsatsa yeyewo esime wole block xoxoawo ƒe kɔpi wɔm hele dɔ wɔm tso wo ŋu. Ne woke ɖe gagbalẽ aɖe si womezã nyitsɔ laa o ŋu la, woana wòanɔ anyi enumake.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze ƒe Sync

Zecwallet ƒe ƒuƒoƒoae to Blaze sync vɛ, eye wònye synchronization algorithm na kekeli gakotoku siwo léa ŋku ɖe blockchain la ŋu yi megbe, dzea egɔme tso block kɔkɔtɔ, yeyetɔ kekeake dzi eye wòwɔa dɔ yi megbe.

Esia wɔnɛ be gakotokua te ŋu dia nuŋlɔɖi siwo wozã hafi xɔ wo, evɔ wònaa nuŋlɔɖi siwo womezã tsã o la nɔa anyi evɔ malala be woawɔ ɖekawɔwɔ bliboa ƒe ɖoɖoa nawu enu o.

Gakpe ɖe eŋu la, ezãa Out-of-Order Sync to sync la ƒe akpawo ɖeɖeɖa tso wo nɔewo gbɔ me — blocks ƒe kɔpi wɔwɔ, trial decryptions wɔwɔ, kple ɖasefowo ƒe asitɔtrɔ — kple wo ŋudɔwɔwɔ le ɣeyiɣi ɖeka me. Esia xɔa ŋkuɖodzinu kple CPU nunɔamesi geɖe gake edzia sync ƒe duƒuƒu ɖe edzi X5.

### DAGSync ƒe dɔwɔwɔ

DAGSync nye ɖoɖowɔwɔ ƒe mɔnu si wodo ɖa si ƒe taɖodzinue nye be yeana Zcash ƒe gakotoku siwo ŋu wokpɔ ta na ƒe zãla ƒe nuteƒekpɔkpɔ nanyo ɖe edzi to wɔwɔ ɖekae kabakaba me.

Ezãa [Directed Acyclic Graph (DAG) .](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) be woatsɔ atsi tre ɖi na nusiwo dzi woanɔ te ɖo le nuŋlɔɖiwo, ɖasefowo, kple nullifiers dome le Zcash gakotoku me.

DAG nye nyatakaka ƒe ɖoɖo si me nugbɔ kple nugbɔ le, afisi nugbɔ ɖesiaɖe ƒe mɔfiame le si fia ƒomedodo si le nugbɔ eve dome. DAG mekpɔa tsatsam o, si fia be mɔ aɖeke meli si dzi woato adze egɔme tso node aɖe dzi eye woakplɔ goawo ɖo atrɔ ayi node ma ke gbɔ o.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Nusiwo wòfia ŋutɔŋutɔ

Enyo be míade dzesii be mɔnu siawo katã ƒe taɖodzinue nye be yewoakpɔ nyabiase siwo Zcash Security fɔ ɖe te le eƒe nyatakaka si wòŋlɔ ɖe [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) kple eƒe ƒomedodo kple ame ŋutɔ ƒe fexexe ƒe ɖoɖowo. Ame aɖewo gɔ̃ hã ɖea afɔ bubu si nye be woaɖe memo nyatakakawo katã tso serverwo dzi, negbe nyatakaka siwo ku ɖe adrɛs aɖe ko ŋu koe mele eme o, si wɔnɛ be ame ŋutɔ ƒe nyatakakawo dzina ɖe edzi eye wògblẽa nunɔamesi bubu vi aɖe ɖe edzi.

Azɔ hã, Zcash Foundation nɔ ŋku lém ɖe mɔnu bubuwo ŋu be woatsɔ ana gakotoku siwo me kɔ ƒe dɔwɔwɔ nanyo ɖe edzi. Aleae wòle le [Oblivious Message Retrieval (OMR) .](https://zfnd.org/oblivious-message-retrieval/), xɔtuɖoɖo aɖe si ŋu gɔmeɖoanyia nɔ nu srɔ̃m tsoe “be yeakpɔe ɖa be ena egbɔkpɔnu aɖe si ate ŋu akpɔ dɔwɔwɔ ƒe kuxi siwo do mo ɖa nyitsɔ laa siwo gblẽ nu le Zcash gakotoku zãlawo ŋu hã.”

## Vodada Siwo Wowɔna Zi geɖe

**Ne míetsɔe be lightwalletd server la nya wò balance.** Compact blocks koe server la naa; wò gakotokua tsɔa wò ŋutɔ wò safuiwo ɖea wo gɔme heɖea wo gɔme le mia gbɔ.

**Stopping sync too early.** Mɔnu aɖewo naa ga si woate ŋu azã nyitsɔ laa la nɔa anyi hafi sync bliboa wu enu, gake ŋutinya xoxowo kple nuŋlɔɖiwo ate ŋu anɔ edzi yim kokoko.

**Zcash sync tsɔtsɔ sɔ kple transparent-chain sync tẽ.** Mɔ si le blewu ateŋu anye ga si woatsɔ akpɔ ame ŋutɔ ƒe nyawo ta, ke menye vodadae o — gakotokua le dɔ wɔm si dutoƒo-gakui ƒe dɔwɔƒe awɔ ne menye nenema o la, wò akɔnta xexlẽ gaglãa.


## Axa Siwo Do Ƒome Kplii

- [Kekeli ƒe Nodes](/zcash-tech/lightwallet-nodes) — lightwalletd infrastructure si dzi kekeli gakotokuwo ɖoa ŋu ɖo.
- [Nukpɔkpɔ ƒe Safuiwo](/zcash-tech/viewing-keys) — safui siwo gakotokuwo zãna tsɔ dea dzesi woawo ŋutɔ ƒe nuŋlɔɖiwo heɖea wo gɔme.
- [Atadi ƒe Sync](/zcash-tech/pepper-sync) — mɔnu bubu si dzi woato awɔ Zcash gakotoku ƒe wɔwɔ ɖekae.
- [FROST](/zcash-tech/frost) — woma asidede agbalẽ te ƒe ŋusẽ na ZEC si wokpɔ ta na.

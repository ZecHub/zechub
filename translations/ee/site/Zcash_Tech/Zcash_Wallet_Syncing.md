<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Gakotoku [Wallet] Ƒe Sync Wɔwɔ

## TL;DR

* Elabena ɣaɣla [shielded] Zcash gaɖoɖowo [transactions] ɣla woƒe nyawo la, server aɖeke mate ŋu adi gakotoku ƒe balance le bɔbɔe abe ale si wòate ŋu awɔe na nuwo ƒe ʋuʋuɖi [transparent] coins abe Bitcoin kple Ethereum ene o.
* Gakotoku suewo [Light wallets] ƒea gaɖoɖowo ƒuƒoƒe suewo "compact blocks" tso server tɔxɛ aɖe (lightwalletd) gbɔ, eye wodecrypt data si le bubu me la woaŋutɔ kple woƒe private keys.
* Compact blocks siawo ƒe decrypt kple processing bia ɣeyiɣi, eyata gakotokuwɔlawo zãa sync mɔ kabalakabala be nàte ŋu azã wò ga le ɣeyiɣi kpui aɖe me.
* Mɔ siwo nye vevi: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), kple DAGSync si wotsɔe va gblɔ.
* Zi geɖe, mɔ siawo trɔ memory alo processing power bubu aɖe na sync kabalakabala.

## Nya Vevi Ƒe Gɔmesese

### Ale si Zcash sync wɔa dɔe

Zcash zãa zero-knowledge ɖaseɖigbalɛwo [proofs] be wòaɣla gaɖoɖo ƒe nyawo na ame siwo menye mɔ na wo o. Ɣaɣla [privacy] sia na sync wɔwɔ sesẽ na gakotoku suewo, elabena wometsɔ gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] blibo la ɖe woƒe teƒe me o, ke boŋ wodea asi server aɖe ŋu be wòatsɔ nyawo siwo hia na wo. Kple Bitcoin alo Ethereum la, serverwo ate ŋu aɖe blockchain la ƒe index eye woatsɔ account data ava kabalakabala. Ke kple Zcash la, server la mate ŋu akpɔ gaɖoɖo ƒe nyawo o. Eya ta, aleke gakotoku sue aɖe ate ŋu async eƒe balance kple eƒe ŋutinya ne metsɔ blockchain blibo la ƒe download kple decrypt wɔ eya ŋutɔ o?

Zcash ɖɔ nya sia kple mɔ vovovowo ƒe ƒoƒo. Eƒe server tɔxɛ, lightwalletd, dea data ɖa tso ɣaɣla dzesi ŋɔŋlɔ blibo [full node] aɖe me eye wòle esi si hia na gaɖoɖo ƒe dzesi wɔwɔ koe ɖe asi. Woyɔ data sia be compact blocks, eye wònye sue wu gaɖoɖowo ƒuƒoƒewo [blocks] gɔmedzedzeawo. Gakotoku suewo gbãna ƒea compact blocks siawo tso lightwalletd server la gbɔ eye woɖea wo decrypt kple woƒe private keys.

Hã, compact blocks siawo ƒe decrypt kple processing ate ŋu axɔ ɣeyiɣi geɖe, vevie ne gaɖoɖowo geɖe le block sia block me. Eya ta gakotokuwɔlawo zãa mɔ vovovowo be woakpɔ sync ƒe kabalakabala eye woana nàzã wò ga le ɣeyiɣi si le ema wu.

## Nuku Ƒe Nɔnɔmetata / Sɔsɔ

Bu blockchain la be wonye posuƒe gã aɖe si me bokisi siwo woɖe ɖe ga me le. Kple nuwo ƒe ʋuʋuɖi coin aɖe la, posuƒe ƒe dɔwɔla ate ŋu axlẽ labelwo eye wòagblɔ na wò enumake bokisi kae nye wòtɔ. Kple Zcash la, woɣla labelwo — eyata wò gakotoku hia be wòatsɔ eƒe keywo akpɔ bokisiwo ɖokui be wòakpɔ esiawo si wòate ŋu aʋu. Sync mɔ siwo le ete la nye mɔ vovovo siwo wɔa bokisi siawo ƒe kpekpe kabalakabala.

## Nya Ƒe Kpɔkpɔ Kɔkɔe

### Warp Sync

Warp sync nye YWallet ƒe feature si dzoa compact block sia compact block ƒe decrypt kple processing ƒe afã titinae, eye wòyi ɖe nu mamlea tẽ.

Be wòawɔe la, ezãa mathematics kple cryptography be wòabu nu mamlea me, eye wòmato afɔ sia afɔ me o.

Warp sync ate ŋu awɔ blocks akpe geɖe le sekondi ɖeka me, eye wòkaba wu sync mɔ si wozãna zi geɖe. Esia fia be YWallet ƒe zazãlawo ate ŋu akpɔ dɔwɔwɔ kabalakabala kple dɔwɔwɔ ɖeɖe, hã ne gaɖoɖowo akpe alafa geɖe kple didienuwo [notes] siwo woxɔ le woƒe accountwo me.

Tso afɔdzo mɔ sia gbɔ la, YWallet ate ŋu awɔ blocks geɖe ɖe ɣeyiɣi ma ke me, eye wòmama dɔ la na wò hardware siwo le asiwò me be wòakpɔe kabalakabala wu.

Xlẽ Nya Geɖe tso [Warp Sync](https://ywallet.app/warp/) Ŋu

> Wogblɔ Warp sync le afisia be enye sync ƒe mɔ aɖe. Ywallet ŋutɔ wometsɔ dɔ wɔm o eye womatsɔe ava yeye na Ironwood o, eyata menye gakotoku si nàɖo egbe o.

### Spend-before-sync

Spend-before-sync nye feature yeye le Zcash Mobile Wallet SDK V2 me si na zazãlawo ate ŋu azã woƒe ga enumake ne woʋu woƒe gakotoku, eye womaxɔe ase be gakotoku la ƒe sync blibo nawɔ wu o. Feature sia kaba gakotoku la ƒe balance si wòate ŋu azã ƒe kpɔkpɔ eye wòna zazãla ƒe nɔnɔ nyo wu.

Spend-before-sync wɔa dɔ kple compact-blocks sync algorithm si wɔa blocks tso lightwalletd server la gbɔ le ɖoɖo si menye tẽ o me. Esia fia be, ɖe teƒe be gakotokuwo nɔ anyi be block ɖeka ƒe processing blibo nawɔ wu hafi woayi edzi la, wòate ŋu azã memory kple processing power bubu aɖe be woakpɔ blockchain la ƒe afã vovovowo. Zi geɖe, ekpɔ ranges vovovowo, ele gaɖoɖo yeyeawo dim le esi wòele blocks xoxoawo ƒem kple processing wɔm. Ne wokpɔ didienu yeye aɖe si womexɔ o la, woana wòanɔ asiwò enumake.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Zecwallet ƒe team la wɔ Blaze sync, eye wònye sync algorithm na gakotoku suewo si kpɔa blockchain la megbe, eye wòdzea egɔme tso block si le dzogbe, eye wòyi megbe.

Esia na gakotoku la ate ŋu akpɔ didienu siwo wozã xoxo hafi wòakpɔ esiawo woxɔ, eye wòna didienu siwo wometsɔ zã kpɔe hafi sync ƒe dɔwɔwɔ blibo la nu wɔ.

Kpuie la, ezãa Out-of-Order Sync kple sync ƒe akpaawo ƒe mama tso wo nɔewo gbɔ — blocks ƒe download, trial decryptions ƒe wɔwɔ, kple witnesses ƒe yeye wɔwɔ — eye wòwɔa wo ɖe ɣeyiɣi ma ke me. Esia bia memory kple CPU resources geɖe, ke wòkekea sync ƒe kabalakabala ɖe X5.

### DAGSync

DAGSync nye sync algorithm si wotsɔe va gblɔ, si ƒe taɖodzinu nye be wòana Zcash ƒe ɣaɣla gakotokuwo ƒe zazãla ƒe nɔnɔ anyo wu to sync ƒe kabalakabala me.

Ezãa [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) be wòatsɔ anɔ didienuwo, witnesses, kple gaɣaɣla ɖeɖe dzesiwo [nullifiers] dome ƒe dependencewo ƒe nɔnɔmetata le Zcash gakotoku aɖe me.

DAG nye data structure si me ɣaɣla dzesi ŋɔŋlɔwo [nodes] kple edges le, eye edge sia edge ƒe direction fia ka ɖe ɣaɣla dzesi ŋɔŋlɔ eve dome. DAG me cycles mele o, si fia be mɔ aɖeke mele be nàdze egɔme tso ɣaɣla dzesi ŋɔŋlɔ aɖe gbɔ eye nàto edgesawo me atrɔ ava ɣaɣla dzesi ŋɔŋlɔ ma ke gbɔ o.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Kɔkɔe Ƒe Nɔnɔwo

Nu si wòna ame ŋutɔ nuku lae nye be, mechanism siawo katã ƒe taɖodzinu nye be woaɖo biabia siwo Zcash Security fɔ le eƒe post tso [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) ŋu kple eƒe kadodo kple fexexe [payment] system siwo le ɣaɣla me. Wo dometɔ aɖewo hã wɔa dɔ bubu be woaƒe memo [memo] data katã tso serverwo gbɔ, to data si nye gaɖoƒe ƒe dzesi [address] aɖe tɔ ko me, eye esia keke ɣaɣla la ɖe dzi to resources bubu sue aɖe ƒe xexeme.

Hã, Zcash Foundation le mɔ bubuwo kpɔm be wòana gakotoku suewo ƒe dɔwɔwɔ anyo wu. Esiae nye nɔnɔ kple [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), si nye construction aɖe si foundation la le srɔ̃m "be woakpɔ be ɖe eƒe nuwɔwɔ aɖe ate ŋu anye ɖoɖɔ na dɔwɔwɔ ƒe kuxi yeyeawo siwo va dzɔ na Zcash gakotoku ƒe zazãlawo."

## Vodadawo Si Wona Zi Geɖe

**Bu be lightwalletd server la nya wò balance.** Server la tsɔa compact blocks koe; wò gakotoku decrypt kple gɔmesese wɔa wo le eƒe teƒe kple wòaŋutɔ ƒe keys.

**Tso sync me kaba akpa.** Mɔ aɖewo na ga si wòate ŋu azã le yeyewo me nava asiwò hafi sync blibo la nu wɔ, ke ɖoɖonu xoxo kple didienuwo ate ŋu anɔ processing me hafi.

**Sɔ Zcash sync kple nuwo ƒe ʋuʋuɖi-ɖoɖonu sync tẽ.** Mɔ si mekaba o ate ŋu anye ɣaɣla ƒe dzadzra ƒe xexeme, menye vodada o — gakotoku la le dɔ aɖe wɔm si public-coin server aɖe awɔ ɖe teƒe be wòaxlẽ wò account le ʋuʋuɖi me.

## Axɔ Nyalɔƒewo

- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — lightwalletd ƒe infrastructure si gakotoku suewo de asi ŋu.
- [Viewing Keys](/zcash-tech/viewing-keys) — keys siwo gakotokuwo zãa be woakpɔ woaŋutɔ ƒe didienuwo eye woadecrypt wo.
- [Pepper Sync](/zcash-tech/pepper-sync) — mɔ bubu aɖe na Zcash gakotoku ƒe sync wɔwɔ.
- [FROST](/zcash-tech/frost) — signing authority si woma ƒuƒoƒe me na ɣaɣla ZEC.

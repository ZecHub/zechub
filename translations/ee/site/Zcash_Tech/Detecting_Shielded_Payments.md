# Gakotoku vɔ̃ɣaɣla fexexewo kpɔkpɔ: scanning ƒe asiɖeɖe

Dɔwɔƒe si xɔa ɣaɣla fexexewo le ZEC la ele be wòakpɔ wò fexexe siwo vanɛ. Le nuwo ƒe ʋuʋuɖi gaƒuƒoƒo la, esia nye index lookup. Le ɣaɣla gaƒuƒoƒowo la, ame aɖeke mate ŋu aŋlɔ fexexewo ɖe index me ɖe gaɖoƒe ƒe dzesi nu o, eya ta gakotoku alo backend la ele be wòalé ɣaɣla output sia output le ɖoɖonu la me kple eƒe gakotoku ŋutikɔkɔeawo. Page sia ɖe ale si esia wɔa dɔ, nu ka wòna, eye ale si nàtia account ƒe ɖoɖo si ɖoa asi le dɔ ƒe asiɖeɖe dzi la ŋu.

## TL;DR

* ɣaɣla kpɔkpɔ ƒe asiɖeɖe ɖea ɖe **nukpɔsafui** siwo nèle kpɔm ƒe xexlẽme, menye gaɖoƒe ƒe dzesi siwo nàna la ƒe xexlẽme o
* Account ɖeka ate ŋu ana gaɖoƒe ƒe dzesi siwo ɖea kadodo manɔ anyi ƒe yeyewo na asiƒe sia asi alo invoice sia asi, scanning ƒe asiɖeɖe kple ɖeɖe aɖeke manɔ
* Nukpɔsafui ɖea **account blibo la** fia. Ne auditor ele be wòakpɔ customer ɖeka ko, customer ma hiã eya ŋutɔ ƒe account, eye account sia account tsɔa scanning dɔ bubu vɛ le gaɖoɖowo ƒuƒoƒe sia sia dzi
* ɖo scanner ɖe **gaɖoɖowo ƒuƒoƒe blibo** nu, menye average la nu o. Mainnet la tsɔa gaɖoɖowo ƒuƒoƒe siwo yɔ fũ fũ ƒe ɖoɖo vɛ xoxo
* Wòɖe asiɖeɖe le trial ɖeka dzi le wò hardware ŋu hafi wòɖo nu sia nu

## Nu ka ta ɣaɣla fexexe mate ŋu anɔ index me o

Kple gaɖoƒe ƒe dzesi siwo ʋuʋu le, node ate ŋu axlẽ gaɖoƒe ƒe dzesi le output sia output dzi, eye wòawɔ index si kɔ gaɖoƒe ƒe dzesi kple outputwo ɖe kadodo me. Zebra ɖea esia fia to `getaddressutxos` kple `getaddresstxids` dzi.

ɣaɣla dɔwɔwɔ ɖeka me gaɖoƒe ƒe dzesi si wòate ŋu axlẽ mele o. Etsɔ didienu ƒe commitment, public key si wɔa ɖe ɣeyiɣi kpui aɖe me kple didienu si wòɣaɣla vɛ. Nu aɖeke le byte siawo me meɖea ame ka ta fexexe la wò nye fia o, eya ta node alo [indexer](Lightwallet_Nodes.md) mate ŋu awɔ gaɖoƒe ƒe dzesi ƒe index o.

Eya ta ame kpɔkpɔ ƒe mɔ zɔa le mɔ bubu dzi. Gakotoku la tsɔa ɣaɣla output sia output eye wòbia "nye tɔe ya?" to eƒe ɣaɣlaɣaɣla nyagbee. Esia woyɔna be **trial decryption**. [Viewing keys](Viewing_Keys.md) ɖea nu ka ta gakotokuawo ɖea fia la ŋu, eye [Zcash wallet syncing](Zcash_Wallet_Syncing.md) ɖea ale si gakotokuwo ɖoa dɔa ɖe ɖoɖo me la ŋu.

## Ale si trial ɖeka zɔna

Na Orchard-protocol dɔwɔwɔ ƒe nɔnɔme, si Orchard kple Ironwood gaƒuƒoƒowo katã zãna:

1. **Key agreement:** Kpɔ dɔwɔwɔ la ƒe ephemeral public key kple wò incoming viewing key. Esia nye scalar multiplication le Pallas curve dzi, eye enye asiɖeɖe ƒe akpa gãtɔ
2. **Key derivation:** Hash shared secret la me ɖe symmetric key me
3. **ɣaɣla didienu ƒe byte 52 gbãtɔ**: diversifier, value kple `rseed`
4. **Gaɖoƒe ƒe dzesi commitment yeye wɔ** tso nu si nèɣaɣla la me
5. **Tsɔe sɔ** kple dɔwɔwɔ la ƒe `cmx`. Ne wò sɔ la, ele be didienu la nye tɔwò

Le dzesi 5 ko dzi nènya be didienu la nye tɔwò, eya ta **trial si mesɔ o la asiɖeɖe le evea ƒe asiɖeɖe nu ƒe nɔnɔme**. Dɔwɔwɔ geɖe le ɖoɖonu la me nye ame bubuwo tɔ, eya ta dɔ geɖe la nye trial siwo mesɔ o.

## Asiɖeɖe ƒe formula

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

Gaɖoƒe ƒe dzesiwo ƒe term aɖeke mele eme o. Gakotokuwo tsɔa external key (gaɖoƒe ƒe dzesi si nàna) kple internal key (change) evea siaa zãna, eya ta `I = 2`. Wòate ŋu akpɔ esia le `for scope in [Scope::External, Scope::Internal]` loops le librustzcash ƒe `zcash_client_backend/src/scanning.rs` me.

[ZIP 218](https://zips.z.cash/zip-0218) ɖea ɣaɣla dɔwɔwowo ƒe xexlẽme ɖe **330 le gaɖoɖowo ƒuƒoƒe ɖeka me** dzi, eya ta `A` si nàkpɔ la ɖo 330 dzi.

## Gaɖoƒe ƒe dzesiwo siwo ɖea vovototo: gaɖoƒe ƒe dzesi geɖe, key ɖeka

Orchard-protocol gaɖoƒe ƒe dzesi nye diversifier `d` (byte 11) kple transmission key si tso incoming viewing key ma ke me. [ZIP 32](https://zips.z.cash/zip-0032) wɔa diversifier siawo ɖe index 88-bit aɖe me kple FF1 ɣaɣla, eya ta account ɖeka si **2^88 gaɖoƒe ƒe dzesiwo** le, eye wo katã ŋu wòate ŋu azã wo le Orchard protocol la me.

Esia naa payments backend la nɔnɔme vevi eve:

* **Gaɖoƒe ƒe dzesiwo kadodo manɔ anyi.** Ne viewing key mele asiwò o la, account ɖeka ƒe gaɖoƒe ƒe dzesi evewo ana wòabu be gakotoku eve mawo le eveawo si
* **Fexexeawo kɔa ɖe invoicewo dzi, lookup table manɔ.** Ne trial decryption ɖo ŋu la, didienu si wòɣaɣla la me `d` le. Account la ƒe diversifier key ɣaɣlaa `d` ɖe index la me, eya ta ne index la nye wò invoice number la, ènya invoice ka ŋu woxɔ fexexe

Ɖe gaɖoƒe ƒe dzesi sia ɖe [unified address](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)) me hafi nàɖee fia customer.

## Nu si wòle be nàkpɔ: viewing key ɖea account blibo la fia

Màte ŋu aɖe viewing key la ɖe gaɖoƒe ƒe dzesi vovovowo ŋu o, elabena gaɖoƒe ƒe dzesi siawo le account la me zãa key ma ke. Eya ta account lae nye nu si ɖea ame ɖe nudzɔdzɔ me. Ame sia ame si xɔ account la ƒe viewing key la kpɔa fexexe sia fexexe si woxɔ ɖe gaɖoƒe ƒe dzesi siawo dzi.

Esia wɔa be nu etɔ̃ le ɖoɖo ɖeka me:

| ɖoɖo | Scanning ƒe asiɖeɖe | Nu ka wòate ŋu aɖe fia auditor |
|:--|:--|:--|
| Account ɖeka, diversifier gaɖoƒe ƒe dzesi na customer sia customer | Key ɖeka, customerwo ƒe xexlẽme sia me | Nu sia nu alo naneke |
| Account ɖeka na customer sia customer | Key ɖeka na customer sia customer, le gaɖoɖowo ƒuƒoƒe sia sia dzi | Customer ɖeka le ɣeyiɣi ɖeka me |
| Account ɖeka na customer sia customer kple ɣeyiɣi sia ɣeyiɣi | Key ɖeka na customer sia customer kple ɣeyiɣi sia ɣeyiɣi | Customer ɖeka le ɣeyiɣi ɖeka me |

Tia account ƒe ɖoɖo le gɔmedzedze me. Account ɖeka maɖe eme le megbe la fia be wòatu eƒe sika ɖe account yeye me, si naa adzɔwo le eye wòwɔa nɔnɔme si amewo ate ŋu akpɔ.

## Nu ka asiɖeɖe la nɔna le agbe me

Nɔnɔme siawo tso laptop core ɖeka dzi (Apple M3 Pro, release build), wozã `try_compact_note_decryption` tso `zcash_note_encryption` 0.5.1 me le Ironwood dɔwɔwowo siwo tso testnet me:

| Dɔmedzoe | Nɔnɔme |
|:--|:--|
| Trial ɖeka, key ɖeka ɣesiaɣi | 82 µs ƒe nɔnɔme |
| Trial ɖeka, wotsɔe ƒoƒo kple key 10 alo 100 | 42 µs ƒe nɔnɔme |

Batching ɖea asiɖeɖe la ɖe afã nu, eye librustzcash ƒe scanner la tsɔa dɔwɔwowo ƒoƒo le aleke ma ta.

Kple `t = 42 µs` kple gaɖoɖowo ƒuƒoƒe 330 ƒe blibowo:

| Account siwo wokpɔa | Core ƒe ɣeyiɣi le gaɖoɖowo ƒuƒoƒe blibo ɖeka me | Core siwo hiã be woakpɔ gaɖoɖowo ƒuƒoƒe blibowo |
|:--|:--|:--|
| 1 | 28 ms | 0.001 |
| 1,000,000 (ɖeka na customer sia customer) | 7.7 hours | 1,109 ƒe nɔnɔme |

Customer million ma ke siwo zãa diversifier gaɖoƒe ƒe dzesiwo le account ɖeka me la asiɖeɖe 28 ms le gaɖoɖowo ƒuƒoƒe blibo ɖeka me. Akpa ɖeka si trɔa nu lae nye afi si account ƒe mɔ ɖe anyi.

## ɖo nu ɖe asi kple dzidzime ɖeɖe ŋu, menye average ŋu o

Le mainnet gaɖoɖowo ƒuƒoƒe 5,000 siwo wu height 3,582,677 ɖo me (woxɔ nɔnɔme le 2026 ƒe November 17):

* Gaɖoɖowo ƒuƒoƒe 62% me ɣaɣla output aɖeke mele o, eye median la nye zero
* Average la nye ɣaɣla output 12.3 le gaɖoɖowo ƒuƒoƒe ɖeka me
* Gaɖoɖowo ƒuƒoƒe 153 le height 3,579,935 kple 3,580,346 dome, ɖoɖonu ƒe ɣeyiɣi ɖeka si le ɣleti etɔ̃ ƒe nɔnɔme me, siawo katã me output wu 250, zi geɖe wozɔna ɖe akpa ɖeka vɔ. Woxɔ nɔnɔme si nye outputwo ƒe 75% le nuŋɔŋlɔ sia me

Scanner si wotsɔ average la ɖo ɖe asi nu la le megbe na dzidzime ma me. Ɖe headroom (kpɔɖeŋu, ɖo ɖoɖo be nàzã gaɖoɖowo ƒuƒoƒe 25-second interval ƒe afã) eye ɖo ɖe limit la nu.

## Compact blocks kpena ɖe bandwidth ŋu, menye trial xexlẽme o

Gakotoku siwo le light me scan compact blocks tso lightwallet server. Compact dɔwɔwowo 148 bytes le 820 bytes si full action la si teƒe. Ɖea nu siwo trial hiã la ko le eme: ephemeral key, ciphertext ƒe byte 52 gbãtɔ, nullifier kple `cmx`. Woɖoa data si ʋuʋu le ko ne client la biɛ.

Compact blocks ɖea download size ɖe anyi. Wometsɔ trial xexlẽme ɖe anyi o, elabena ele be trial wo kple key sia key wɔ kple dɔwɔwowo siawo katã.

## Nyatakakadzraɖoƒe na payments backend

* Tia ame ka le be wòakpɔ nu ka hafi nàwɔ accountwo
* Do diversifier gaɖoƒe ƒe dzesi ɖe invoice sia invoice ŋu tso account ɖeka me, afi si nudzɔdzɔ le mɔ nu
* Ɖe asiɖeɖe le `t` ŋu le wò hardware dzi, kple batching
* Ɖo ɣeyiɣi tsɔ scan tip ɖe 330 dɔwɔwowo le gaɖoɖowo ƒuƒoƒe ɖeka me, kple headroom
* Ma rescans ɖe height range nu le workers dome. Nɔnɔme vɔ̃a le ɖoɖo ɖeka me, eya ta wòate ŋu amae le mɔ bɔbɔe me
* Ðo ŋku edzi be account yeye sia account ele be woascan ɖe birthday height la dzi

## Nàsrɔ̃ nu geɖe

* [ZIP 218: ɖoɖo le gaɖoɖowo ƒuƒoƒe ɖeka ƒe ɣeyiɣi 25-second,](https://zips.z.cash/zip-0218) kple gaɖoɖowo ƒuƒoƒe sia sia ƒe dɔwɔwowo ƒe limitwo
* [ZIP 32: ɣaɣla hierarchical deterministic gakotokuwo](https://zips.z.cash/zip-0032)
* [ZIP 316: unified gaɖoƒe ƒe dzesiwo kple unified viewing keys](https://zips.z.cash/zip-0316)
* [Lightwallet protocol: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): `zcash_client_backend` scanning kple `zcash_note_encryption`
* [One viewing key, a million customers](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): nɔnɔme blibowo kple lab code si wòate ŋu azã be wòawɔ wo ɖo###

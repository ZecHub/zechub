<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Axa Aƒe"/>
</a>


# Zcash Lightwallet Nodes

## TL;DR

* Ame geɖe kekeawo zãa Zcash to wɔa dɔ kple light wallet, si menɔa blockchain bliboa gɔme o. Le esime ma teƒe la, eƒoa nu kple server si wɔ dɔ ma xoxo.
* Mɔ̃ ƒe ɖoɖowo eve le light wallets ƒe subɔsubɔ wɔm egbe: **lightwalletd**, subɔsubɔ gbãtɔ si wotu kple Go, kple **Zaino**, indexer yeye si wotu kple Rust.
* Wò safuiwo menoa wò mɔ̃ dzi o, eye server la mate ŋu azã wò ga alo axle asixɔxɔwo kple nya kpuiawo si le ɣaɣla gaɖoɖowo me o.
* Nu si server la ate ŋu asrɔ̃e nyuiee lae nye wò IP address kple wò dɔwɔwɔ ƒe gaƒoƒo — ɣaɣla gaɖoɖowo ɣlãa nu si le blockchain dzi, ke menɣlãa wò kadodo kple server la o.
* Tor ɖea IP dzesi la ɖa; eŋu wɔnɔ wallet siwo wotu ɖe `zcash_client_backend` dzi me, eye le ZODL me la, e nye ɖoɖo le Advanced Settings me.
* Àte ŋu atrɔ server si wò gakotoku zãa, alo nàwɔ tɔwò — lightwalletd kple Zaino siaa nye mɔ̃ si le fɔfɔ̃e.

## Nyati Gbegbe

Ame geɖe kekeawo zãa Zcash to wɔa dɔ kple light wallet, si menɔa blockchain bliboa gɔme o. Le esime ma teƒe la, eƒoa nu kple server si wɔ dɔ ma xoxo. Axa sia aɖe nyateƒe le server siawo ŋu, nu si woate ŋu akpɔ tso gbɔwò kple nu si womate ŋu akpɔ o, aleke nàto wò kadodo ɖe Tor dzi, kple aleke nàtrɔ server si wò gakotoku zãa.

Mɔ̃ ƒe ɖoɖowo eve le light wallets ƒe subɔsubɔ wɔm egbe. **lightwalletd** nye subɔsubɔ gbãtɔ, si wotu kple Go. **Zaino** nye indexer yeye si wotu kple Rust, eye wotu eŋu le zcashd ƒe deprecation dɔwɔwɔ me.

### Nu si light wallet server wɔa

Light wallet server nɔa wò gakotoku kple Zcash blockchain dome, eye wònaa ɖoɖonu la ƒe nukpɔkpɔ si me data ƒe zãzã medze dɔ ge o. Ewɔ nu etɔ na wò.

Enaa compact blocks. Le gaɖoɖowo ƒuƒoƒewo bliboa teƒe la, eɖoa wɔnɔnu si kplɔ nu si gakotoku hia ko, be wòanya fexexe si va na eƒe ɣaɣla gaɖoƒe ƒe dzesi, nya dzi be woza eƒe didienuwo, eye wòatrɔ eƒe witnesses.

Etsɔa wò gaɖoɖowo yi. Ne nèɖo ga la, wò gakotoku naa gaɖoɖo si woɖo nu blibo la server la, eye server la ɖee gbe le network la me.

Eɖoa biabiawo ŋu tso ɖoɖonu la ŋu, abe fifi ƒe kɔkɔme kple adzɔ ƒe nyatakaka si wò gakotoku hia ene.

Wò gakotoku gale asixɔxɔ dɔa wɔm le afi si nèle. Etsɔa wò safuiwo ɖe asi, eɣe ɣaɣlaŋlɔŋlɔ le gaɖoɖowo ƒuƒoƒewo ŋu be wòakpɔ wò didienuwo, eye wòwɔa eye wòdea asi gaɖoɖowo ŋu le wò mɔ̃ dzi.

### Nu si server la ate ŋu akpɔ kple nu si mate ŋu akpɔ o

Eyae nye akpa si wòasu be woawɔ vodada le. Wò safuiwo menoa wò mɔ̃ dzi o, ke esia menye be server la mesrɔ̃ naneke tso gbɔwò o.

Nya si woɖo le afi sia nye [Zcash gakotoku app ƒe threat model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), si nyo be nàxlẽ blibo ne esia le vevie na wò. Eɖe futɔwo ƒe ƒomevi vovovowo fia. Esi le vevie na axa sia nye futɔ si ate ŋu awɔ kpɔkpɔ ɖe traffic si le wò gakotoku kple internet dome, kple si le server la kple internet dome. Ame si nɔa server la dzi la le teƒe ma ƒe akpa me le wɔnɔtɔe me, elabena wò gakotoku kpena ɖe eŋu tẽe.

Míadze egɔme kple nu si woɣlã. Le futɔ siawo katã ŋu, tso wɔnɔtɔ si ɖo server la ɖe asi me hã, "mate ŋu asrɔ̃ naneke tso user la ƒe cryptographic key material (spending keys, viewing keys, seed phrase, etc.) ŋu o", mate ŋu afi wò ga o, eye mate ŋu awɔ be nàɖo ga si mewɔa be nàɖo o. Asixɔxɔwo kple nya kpuiawo si le ɣaɣla gaɖoɖowo blibo me la gale ɣaɣlaŋlɔŋlɔ me.

Emegbe la, nu si woɣlã o lae nye. Threat model la bu esiawo be wonye gbɔdzɔdzɔ siwo woanya tso traffic ƒe kpɔla ƒe ŋu:

| Gbɔdzɔdzɔ | Aleke |
|:--|:--|
| Nyanya ame si nèle | "Futɔ la nya user la ƒe IP address, si ate ŋu akplɔ wo yi user la ƒe ame dzidzɔtɔ gbɔ" |
| Nyanya afi si nèle ƒe teƒe kɔkɔe | Wòɖea wò IP address kpɔ "le geolocation database me be woaɖo eƒe teƒe kɔkɔe" |
| Nyanya be nèɖo alo nèxɔ ɣaɣla gaɖoɖo, kple gaƒoƒo si me wòwɔe | Gaɖoɖo "zãa bandwidth geɖe, si doa ŋku na ame, togbɔ be woɣlã kadodo la". Model la de dzesi be gaɖoɖo kple xɔxɔ ƒe wɔwɔ doa ŋku na server la ŋutɔ |
| Bu gaɖoɖo nenie nèwɔ le ɣeyiɣi me | Bandwidth ƒe nɔnɔ ma ke, si woakpɔ le ɣeyiɣi didi me |
| Kpɔ fexexe ƒe nɔnɔ si gbugbɔna | Kpɔkpɔ ɖe ɣeyiɣi si me dɔwɔwɔ wɔa |
| Ɖoɖo be gaɖoƒe ƒe dzesi aɖe nye tɔwò | Futɔ si nya gaɖoƒe ƒe dzesi aɖe xoxo "ate ŋu aɖo ga yi gaɖoƒe ƒe dzesi ma dzi eye wòakpɔ be bandwidth ƒe dzedze gã aɖe ava tso wò gakotoku gbɔ" ne wòele eŋu xɔm |

Model la gblɔ hã be nɔnɔ gbɔtɔ la bua be "kakaɖedzi ƒe kadodo le user la kple lightwalletd server ƒe dɔwɔla la dome".

Eyata, nyateƒe ƒe tatae nye esi. Light wallet server mate ŋu azã wò ga o, eye mate ŋu axle asixɔxɔwo alo nya kpuiawo si le wò ɣaɣla gaɖoɖowo me o. Nu si wònɔ teƒe nyui me be wòasrɔ̃e lae nye wò IP address kple wò dɔwɔwɔ ƒe gaƒoƒo, eye esiawo eve katã ate ŋu agblɔ nu geɖe tso ame aɖe ŋu. Ɣaɣla gaɖoɖowo ɣlãa nu si le blockchain dzi. Womeɣlãa wò kadodo kple server la ƒe nu o.

## Nɔnɔ Kpɔɖeŋu / Sɔsɔme

Bu public library aɖe si le nyadzɔdzɔsia katã si woŋlɔ kpɔe ŋu. Full node nye xlẽla si tsɔ archive bliboa yi aƒeme. Light wallet nye xlẽla si bia be librarian la nana daily digest na ye ɖe teƒe la — axa mebɔbɔ aɖe si kplɔ nu siɖeɖe ko be wòakpɔ be nu aɖe ku ɖe eŋu hã.

Woɣlã digest la: librarian la ƒo eƒu ƒeɖeŋu be wòate ŋu axle nu si le vevie na wò o, eye nèʋuae le aƒeme kple wò safui ŋutɔ. Eyae nye compact block la, eye ʋuʋu lae nye trial-decryption le wò mɔ̃ dzi.

Ke librarian la gblẽa kpɔa reader kae va ge, gaƒoƒo kae wòva, kple bundle la ƒe bɔbɔ nenie wòtsɔ dzoe. Eyae nye IP address kple gaƒoƒo — woakpɔe le desk la gbɔ, alo envelope la wɔ ɣaɣla nyuie o. Tor le abe ame si dɔ courier si me ame menya o ene: librarian la naa bundle ma ke, ke meganya aƒe si wòyi o.

## Nyati Didime

### To Kadodo ɖe Tor Dzi

Tor ƒe ɖoɖo ɖea kadodo si le wò IP address kple wò gakotoku ƒe traffic dome ɖa, eye esia ɖea dzesi sesẽtɔ si le tabia si le dzi ɖa.

Kpekpeɖeŋu le Rust libraries si Zcash wallets geɖe tu ɖo ɖe wo dzi me. zcash_client_backend kplɔ Tor module si wotu ɖe [Arti](https://tpo.pages.torproject.net/core/arti/) dzi, si nye Rust ƒe implementation na Tor, ale be gakotoku aɖe ate ŋu ato sync, gaɖoɖo ƒe gbeɖeɖe, kple asiwo ƒe nudzodzro ɖe Tor dzi, eye mehiã be woatsɔ Tor client aɖe kplɔe o.

Zaino mɔ̃ ƒe ɖoɖoŋlɔlawo wɔ argument ma ke, eye wozã threat model la tẽe: "hiã be woazã anonymous transport protocols (abe Nym alo Tor ene) be woaɣlã clients ƒe ame nyanyanya tso Zcash ƒe indexing servers gbɔ".

Le **ZODL** me la, Tor nye ɖoɖo le Advanced Settings me. Gakotoku la ƒe release notes fia users be woazã manual connection mode "kple Tor ƒe dɔwɔwɔ le Advanced Settings me" ne wole "metadata ƒe kpekpeɖeŋu ƒe ɖeɖe dzi dim", eye app la bia be wòaɖe Tor dɔ le esime nèle gakotoku aɖe gbugbɔm, si nye ɣeyiɣi si IP yeye aɖe akpɔ kadodo kple gakotoku ƒe ŋutinya bliboa le mɔ bubu me.

Nudzodzro eve le. Tor ɣlãa wò IP tso server la gbɔ, ke metrɔa nu si server la srɔ̃a tso biabia siwo nèwɔ la ŋu o. Eye onion routing kplɔa ɣeyiɣi didi, eyata syncing xɔa ɣeyiɣi geɖe. Wò server ŋutɔ ƒe wɔwɔ ɖea kakaɖedzi ƒe biabia la ɖe mɔ bubu me, elabena dɔwɔla lae nye wò.

### Zaino, Rust indexer la

[Zaino](/zcash-tech/zaino) nye indexer si wotu kple Rust tso Zingo team la gbɔ, be wòaxɔ lightwalletd ƒe teƒe le zcashd deprecation dɔwɔwɔ la me. Esubɔa light clients, full clients, kple block explorers, eye wòxlẽa ɖoɖonu ƒe data si woɖea ɖe asi le "Zebra alo zcashd full validator" aɖe gbɔ.

Wole eƒe ɖoɖo yina dzi vevie, eye version 0.8.0 do go le August 2026. Edi be wòanɔ backward compatible kple lightwalletd afi si wòate ŋu, ale be wallets ate ŋu aɖo eŋu mekpɔ woŋlɔ wo gake o.

Zaino le eya ŋutɔ ƒe axa kple architecture diagrams, eyata axa sia ƒe nya nye eƒe dɔ abe light wallet server ene ko.

### Wò Ŋutɔ Ƒe Wɔwɔ

Mɔ sesẽtɔe nye be nànye wò ŋutɔ ƒe dɔwɔla, si ɖea kakaɖedzi ƒe biabia la ɖa bliboe. Server evea siaa nye mɔ̃ si le fɔfɔ̃e: [lightwalletd](https://github.com/zcash/lightwalletd) le Go me kple [Zaino](https://github.com/zingolabs/zaino) le Rust me. Woƒe siaa xlẽa tso full validator aɖe gbɔ, eyata nàdi [Zebra](/zcash-tech/zebra-full-node) hã.

## Nuzãzã Ƒe Kpekpeɖeŋu

### Server Ƒe ƒeƒe

[hosh.zec.rocks](https://hosh.zec.rocks/zec) dashboard la le public servers kple woƒe nɔnɔ nyui ƒe kpɔkpɔ wɔm, eye nye teƒe si nàkpɔ nu si le dɔ wɔm nyateƒe. [status.zec.rocks](https://status.zec.rocks/) fia subɔsubɔ ƒe nɔnɔ.

Servers siwo le dashboard ma dzi le esime woŋlɔ axa sia:

| Server | Nudzodzro |
|:--|:--|
| zec.rocks:443 | Woɖe regional endpoints fia kplee le na.zec.rocks, eu.zec.rocks, ap.zec.rocks kple sa.zec.rocks |
| zec-node.cakewallet.com:443 | Le Cake Wallet ƒe domain dzi |
| zec.0xrpc.io:443 | 0xRPC wɔnɔa eŋu, si naa public endpoints fɔfɔ̃e na ɖoɖonu geɖe eye bia be woanɔ donation wɔm be woaɣlɔ capacity ƒe fi |
| zaino.unsafe.zec.rocks:443 | Zaino instance aɖe. Ɖo ŋku hostname la dzi, eye nàbu be eƒe nɔnɔ le dodom |
| testnet.zec.rocks:443 | Testnet, kple Zaino testnet instance si woɖe fia le zaino.testnet.unsafe.zec.rocks |

Kpɔ dashboard la ɖe teƒe la, eye mègakakaɖe asi ɖe list sia dzi o. Dɔwɔlawo vaa eye woyia, eye axa si abe esi ene ƒe ɣeyiɣi lia.

### Server ƒe Trɔtrɔ Le Wò Gakotoku Me

Enyo nàwɔe ne wòdi be nàtia dɔwɔla si dzi nèka ɖe, nàma dɔwɔwɔ ɖe dɔwɔlawo dome, alo nàɖo asi ɖe tɔwò ŋutɔ.

Menu ƒe mɔ siwo le ete la nɔ eteŋu le esime woɖe axa sia yeyee, ke gakotoku ƒe interfacewo trɔa afi, eyata nàbu wo be wonye mɔfiawo ko, menye mɔ dzadzɛ aɖe o. Di Advanced Settings alo server ƒe option aɖe.

#### ZODL

Tsã la woyɔe be Zashi. Cog si le ƒeƒe dzi ƒe akpa mia, eye emegbe Advanced Settings. Tor le screen ma ke dzi. ZODL hã naa Switch server shortcut ne sync ƒe vodada aɖe va tso be server la meyɛ yeyee o.

#### Ywallet

Cog si le ƒeƒe dzi ƒe akpa mia, eye emegbe Zcash tab la.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Hamburger menu si le ƒeƒe dzi ƒe akpa mia, eye emegbe Settings, eye nàyi anyi.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Hamburger menu si le ƒeƒe dzi ƒe akpa mia, eye emegbe Settings, eye emegbe Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Woɖe screenshot siawo le March 2025, eye apps lawo do releases tso ɣeyiɣi ma megbe, eyata buttons lawo ate ŋu atrɔ afi.

## Vodadawo Si Wɔa Zi Geɖe

**Bubu be server la ate ŋu axle wò gaɖoɖowo**. Mate ŋu o. Wò safuiwo nɔa wò mɔ̃ dzi, eye asixɔxɔwo kple nya kpuiawo si le ɣaɣla gaɖoɖowo blibo me la gale ɣaɣlaŋlɔŋlɔ me — le futɔ si ɖo server la ɖe asi me hã.

**Xexlẽ "shielded" be enye "anonymous connection"**. Ɣaɣla gaɖoɖowo ɣlãa nu si le blockchain dzi. Wò IP address kple wò dɔwɔwɔ ƒe gaƒoƒo nye layer bubu, eye layer ma pɛpɛe nye nu si server la kpɔa.

**Bu be Tor ɖea dzesi siawo katã ɖa**. Tor ɣlãa wò IP tso server la gbɔ, ke metrɔa nu si server la srɔ̃a tso biabia siwo nèwɔ la ŋu o, eye ekplɔa ɣeyiɣi didi ɖe syncing ŋu.

**Kakaɖe asi ɖe server list si le wiki axa dzi**. Dɔwɔlawo vaa eye woyia. Kpɔ [hosh.zec.rocks](https://hosh.zec.rocks/zec) be nànya nu si le dɔ wɔm nyateƒe hafi nàɖo wò gakotoku ɖe naneke ŋu.

## Nuxexlẽ Ƒe Tata

Light wallets naa wò ɣaɣla gaƒuƒoƒo la mehiã disk ƒe teƒe geɖe o, eye esia nye trade nyui. Ke nànya nyuie nu si nèle trɔm. Server la mate ŋu axɔ wò ga alo axle wò ɣaɣla asixɔxɔwo o, ke enɔ teƒe nyui me be wòakpɔ wò IP address kple ɣeyiɣi si nèwɔ gaɖoɖo. To kadodo ɖe Tor dzi, tia wò dɔwɔla kple susu, alo nàwɔ tɔwò ŋutɔ.

## Axawo Si Kplɔe ɖo

- [Ame Kae Ate Ŋu Akpɔ Wò Zcash Fexexe](/start-here/who-can-see-your-zcash-payment) — nukpɔkpɔ ƒe gɔmedzedze le biabia ma ke ŋu.
- [Nu Si Block Explorer Ate Ŋu Akpɔ](/zcash-tech/what-a-block-explorer-can-see) — nu si doa ŋku le ɖoɖonu dzi, to vovo na nu si doa ŋku le server la gbɔ.
- [Zaino](/zcash-tech/zaino) — architecture diagrams kple Rust indexer la ƒe dɔ didi.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — validator si light wallet server xlẽa tsoe gbɔ.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — ale si wò gakotoku wɔa compact blocks si server la ɖoa ɖe asi.

**Wotrɔe nyateƒe:** August 2026

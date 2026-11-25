<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axɔta"/>
</a>


# Zcash Lightwallet Ƒe ɣaɣla dzesi ŋɔŋlɔwo

## Nya veviwo

* Ame geɖewo zã Zcash to nyatakaka si hiã ƒe mɔ dzi, eye esia meɖea gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu blibo o. Esi wòle eme la, eƒoa nu kple server si ɖo dɔ siawo xoxo.
* Software etɔ̃ siwo zãa nyatakaka si hiã ƒe mɔwo egbe lae nye **lightwalletd** (gbãtɔ, Go), **Zaino** (Rust indexer), kple ztreamer (Zcash Labs ƒe Rust indexer si dɔa ŋutɔ sesẽ, eye wòna fastz.cash ƒe network si le gbɔna la dɔ).
* Wò safuiwo meɖoa wò legba la o, eye server la mate ŋu aɖu wò ga alo axlẽ ga siwo kple nya kpuiwo le gaɖoɖo ɣaɣla blibo me o.
* Nu si server la ate ŋu anya ŋutɔe nye wò IP address kple ɣeyiɣi si wòwɔa dɔwo — gaɖoɖo ɣaɣla le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi la, ke wò kadodo kple server la mele ɣaɣla me o.
* Tor ɖea IP identifier la ɖa; e le gakotokuwo siwo woɖo ɖe `zcash_client_backend` dzi la me, eye le ZODL me la, enye ɖoɖo le Advanced Settings me.
* Àte ŋu atrɔ server si wò gakotoku zãa, alo aɖo wò tɔ — lightwalletd, Zaino, kple ztreamer siaa nye open source.

## Nyateƒe siwo le eƒe ta me

Ame geɖewo zã Zcash to nyatakaka si hiã ƒe mɔ dzi, eye esia meɖea gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu blibo o. Esi wòle eme la, eƒoa nu kple server si ɖo dɔ siawo xoxo. Page sia ɖe server siawo, nu siwo ate ŋu akpɔ kple esiwo mate ŋu akpɔ le wò ŋuti o, ale si nàte ŋu akplɔ wò kadodo to Tor dzi, kple ale si nàtrɔ server si wò gakotoku zãa la me.

Dɔwɔnu etɔ̃ siwo naa nyatakaka si hiã ƒe mɔwo dɔ le egbe la. **lightwalletd** nye dɔwɔnu gbãtɔ, woŋlɔ le Go me. **Zaino** nye indexer yeye si woŋlɔ le Rust me, si wowɔ abe zcashd ƒe ɖoɖoɖeɖe dɔ la ƒe akpa ene. **ztreamer** nye Rust indexer si dɔ wɔna ŋutɔ, si tso Zcash Labs, eye wòna fastz.cash ƒe network si le mɔa dzi la dɔ.

### Nu si server aɖe si se nyatakaka si hiã ƒe mɔwɔ la wɔna

Server si se nyatakaka si hiã ƒe mɔwo la le wò gakotoku kple Zcash ƒe gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dome, eye ena wòkpɔ ɖoɖonu la ƒe nɔnɔme si zã bandwidth sue. Ewɔ nu etɔ̃ na wò.

Ena compact blocks. Le gaɖoɖowo ƒuƒoƒo blibo siwo teƒe la, etsɔa nɔnɔme kpui si de nu si gakotoku hiã ko la: wòanya gaɖoɖo ɖe wò gaɖoƒe ƒe dzesi ɣaɣla la, wòanya wò didienuwo ƒe zãzã, eye wòatrɔ wò witnesses.

Eƒoa wò gaɖoɖowo. Ne èɖo gaɖoɖo la, wò gakotoku tsɔa gaɖoɖo si wòwu la na server la, eye server la ɖea egblɔ na network la.

Eɖoa ɖoɖonu ƒe biabiawo ŋu, abe height si li fifia kple adzɔ ƒe nyatakaka si wò gakotoku hiã ene.

Wò gakotoku la wɔa dɔ ɣaɣla la le wò ŋutɔ ƒe device me. Wòasafuiwo le esi, etsɔ trial-decrypt na gaɖoɖowo be yanya wò didienuwo, eye ewɔa gaɖoɖowo eye wòde podpisia wo le wò device dzi.

### Nu si server la ate ŋu akpɔ kple esi mate ŋu akpɔ o

Esiae nye akpa si le bɔbɔe be woase egɔme naɖe. Wò safuiwo meɖoa wò device la ɖa o, gake esia menye be server la menya naneke le wò ŋuti o lae nye o.

Afɔɖeɖe si míexɔ le [Zcash gakotoku ƒe ŋusẽɖeɖe ƒe nɔnɔme](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) me, eye ne ehiã na wò la, xe ɖe eŋu blibo. Eɖea adversary ƒomevi geɖewo fia. Adversary si vevie na page sia nye ame si ate ŋu akpɔ traffic si le wò gakotoku kple internet dome, eye le server kple internet dome hã. Ame si ɖoa server la dze le teƒe sia ƒe akpa aɖe me, elabena wò gakotoku la dɔa kadodo kple wo ŋutɔ.

Míadzro nu siwo le ɣaɣla me la gbã. Le adversary ɖesiaɖe si le nɔnɔme la te, ame si wɔ server la nu hã, la, "mate ŋu anya user la ƒe cryptographic key material (spending keys, viewing keys, seed phrase, etc.) aɖeke o", mate ŋu aɖu wò ga o, eye mate ŋu awɔ be nàɖo gaɖoɖo si mewɔ be yèɖo o la o. Ga siwo kple nya kpuiwo le gaɖoɖo ɣaɣla blibo me la nɔa ɣaɣlaŋlɔŋlɔ me.

Esi megale ɣaɣla me o la hã li. Ŋusẽɖeɖe ƒe nɔnɔme la ɖea nɔnɔme siawo fia be wonye ŋuʋu siwo le traffic-kpɔla adversary kple ŋuʋu:

| Ŋuʋu | Ale |
|:--|:--|
| Nya wò ame si nye | "Adversary la nya user la ƒe IP address, si ate ŋu akplɔ wo yi user la ƒe ameŋutinya ŋu" |
| Nya teƒe si wò le le susu me | Wòɖo wò IP la ɖe "geolocation database me be woaɖo susu le woƒe teƒe ŋu" |
| Nya be wòɖo alo xɔ gaɖoɖo ɣaɣla le ɣeyiɣi aɖe me | Gaɖoɖo ɖoɖo la "zãa bandwidth bubu, si wòle si woɖe kadodo la ɣaɣla ɖo hã" Meɖoɖo la gblɔ be server la ŋutɔ kpɔa nu si wòɖoa alo xɔa la |
| Nya gaɖoɖowo ƒe xexlẽme si wòwɔ le ɣeyiɣi didi me | Bandwidth ƒe nɔnɔme mawo, si woɖoa ŋku ɖe wo ŋu le ɣeyiɣi didi me |
| Ɖo ŋku ɖe fexexe ƒe nɔnɔme siwo gbugbɔna ŋu | Ŋku ɖoɖo ɖe ɣeyiɣi si nuwɔna le |
| Nya be gaɖoƒe ƒe dzesi aɖe nye tɔwò | Adversary si nya gaɖoƒe ƒe dzesi la xoxo "ate ŋu aɖo ga ɖe gaɖoƒe ma dzi, eye wòakpɔ be bandwidth ƒe nɔnɔme gãwo le" le wò gakotoku si xɔa gaɖoƒe la me |

Meɖoɖo la hã gblɔ be le nɔnɔme si dzɔna le ŋutɔ la me la, "trust relationship li le user kple lightwalletd server la dziŋɔlɔla dome".

Nya si míate ŋu agblɔ le nyateƒe me le afɔɖeɖe sia ŋu lae nye esia. Server si se nyatakaka si hiã ƒe mɔwo la mate ŋu aɖu wò ga o, eye mate ŋu axlẽ ga siwo alo nya kpui siwo le wò gaɖoɖo ɣaɣla me o. Nu si ate ŋu anya ŋutɔe nye wò IP address kple ɣeyiɣi si wòwɔa dɔwo, eye nu eve siawo ɖekaɖeka ate ŋu agblɔ nu geɖe le ame ŋu. Gaɖoɖo ɣaɣla ɖea nu siwo dzɔna le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi ɣaɣla. Womeɖea wò kadodo kple server la ɣaɣla le wo ŋutɔ o.

## Nɔnɔme / Nɔnɔme si wòte ŋu adzro

Bu nu abe agbalẽxɔƒe kɔkɔ si si nyagbalẽ siwo woŋlɔ xoxo katã le ene. Ɣaɣla dzesi ŋɔŋlɔ blibo nye agbalẽxlẽla si kɔ archive blibo la yi aƒe. Gakotoku si hiã ƒe mɔ nye agbalẽxlẽla si bia agbalẽxɔƒela la be wòana wo gbe sia gbe ƒe nyatakaka kpui — pepa sue si wòtsɔa nu si de vevie hã ko, be wòanya ne nu aɖe kplɔ eya ŋu.

Wotsɔ ɣaɣla ɖo nyatakaka kpui la ŋu: agbalẽxɔƒela la ŋutɔ wɔe, gake mate ŋu axlẽ nu siwo hia na wò o, eye wòʋuae le wò aƒe me kple wò ŋutɔ ƒe safui. Esiae nye compact block, eye ʋuʋu la nye trial-decryption le wò device me.

Gake agbalẽxɔƒela la kpɔa agbalẽxlẽla si va, ɣeyiɣi si wòva, eye nu si wòkɔ yi la ƒe klosalawo hã. Esiae nye IP address kple ɣeyiɣi — wòkpɔna le desk la dzi, aleke envelope la ɣaɣla nenye o. Tor sɔ ɖe courier si meɖe ameŋkɔ o la dzi: agbalẽxɔƒela la tsɔa bundle ma ke na ame la, gake menya aƒe si wòayi o.

## Nyatakaka didi

### Kadodo ɖoɖo to Tor dzi

Tor ɖea wò IP address kple wò gakotoku ƒe traffic dome ƒe kadodo la ɖa, eye wòɖea identifier si ŋuʋu wu le teƒe si le ɖoɖo dzi la ɖa.

Kadodo sia le Rust libraries siwo Zcash gakotoku geɖewo tua ɖo la me. zcash_client_backend si me module Tor le, si wowɔ to [Arti](https://tpo.pages.torproject.net/core/arti/) dzi, Rust ƒe mɔ si wɔ Tor la, ale be gakotoku ate ŋu akplɔ sync, gaɖoɖo ƒe ɖeɖe ɖe network me, kple ʋeʋẽ ƒe biabiawo to Tor dzi, si mehiã be wòakɔ Tor client bubu vɛ o.

Zaino mɔ̃ ƒe ɖoɖoŋlɔlawo gblɔ nya ma ke, eye woxɔ ŋusẽɖeɖe ƒe nɔnɔme la ɖe asi: "hiã be wòazã anonymous transport protocols (abe Nym alo Tor ene) be woaɣaɣla clients' identities le Zcash's indexing servers ŋu".

Le **ZODL** me la, Tor nye ɖoɖo le Advanced Settings me. Gakotoku la ƒe release notes fiaa dɔwɔlawo ɖe manual connection mode "kple Tor si woɖo ɖe Advanced Settings me" me, ne "wòdi be yeaxɔ metadata sue", eye app la na be wòate ŋu aɖo Tor ɖe eme hafi wòagbugbɔ aɖo gakotoku, si nye ɣeyiɣi si IP yeye ate ŋu ade kadodo kple gakotoku ƒe abakɔsɛm blibo.

Nya eve si wòle be nàbu ŋu. Tor ɣaɣla wò IP le server la ŋu, gake metrɔa nu si server la nya le nu si wòbiawo ŋu o. Eye onion routing ɖea latency kplɔ vɛ, ale sync la wòava tsã. Ne èɖo wò server ŋutɔ la, eɖea trust ƒe biabia la ɖa to mɔ bubu dzi, elabena wòe nye operator la.

### Zaino, Rust indexer la

[Zaino](/zcash-tech/zaino) nye indexer si woŋlɔ le Rust me le Zingo team ƒe asixɔxɔ me, eye wowɔe be wòayi teƒe lightwalletd le zcashd ƒe ɖoɖoɖeɖe dɔ la me. Esea nyatakaka si hiã ƒe mɔwo, nyatakaka blibo ƒe mɔwo, kple block explorers, eye wòxlẽ ɖoɖonu ƒe nyatakaka siwo li le "Zebra alo zcashd full validator" me.

Wole eŋu dzɔdzɔm, eye wode version 0.10.1 ɖe eme le September 2026. Edi be wòanɔ backward compatible kple lightwalletd le teƒe si wòate ŋu la, ale be gakotokuwo ate ŋu atso ɖe eŋu eye mehia be woagbugbɔ woŋlɔ wo o.

Zaino ƒe page si le eƒe architecture ƒe diagramwo kple, ale page sia ɖe eƒe dɔ si wòwɔna abe gakotoku si hiã ƒe mɔ server ko ene ko.

### ztreamer kple fastz.cash

[ztreamer](https://github.com/zcashlabs/ztreamer) nye Zcash Labs ƒe Rust me ŋlɔ́ Zcash indexer kple light-wallet server si wɔa dɔ kple ŋusẽ geɖe. Wɔe be wòatsɔ ɣeyiɣi sue aɖe atsɔ nuɖoɖo, eye wòawɔ dɔ geɖe le ɣeyiɣi sue me, eye wò ŋusẽna ame sia ame ƒe [fastz.cash](https://forum.zcashcommunity.com/t/announcing-fastz-cash-rpc-by-zcash-labs/59478) indexer network (ŋuti nyawo ɖeɖe le 19 November 2026).

fastz.cash zɔa anyigba ƒe edge serverwo (fifia le Frankfurt, London, Virginia, Oregon, São Paulo, Singapore kple Osaka). Region ɖesiaɖe si le eya ŋutɔ ƒe ɣaɣla dzesi ŋɔŋlɔ blibo kple ztreamer ƒe index si le afi ma. TLS nuwuwu le ɣaɣla dzesi ŋɔŋlɔ la dzi. Woɖoɖo be ŋkeke sia ŋkeke ƒe ɣeyiɣi titina si wòle be wòade ŋu axɔ ŋuɖoɖo gbãtɔ na GetLatestBlock call la nye 35 ms le xexeame katã. Woɖoɖo be gaɖoɖowo ƒe ɖoɖonu ƒe range sync zɔa va se 3× wu lightwalletd siwo do ŋgɔ la, eye index ƒe nɔnɔme le sue (~18 GB), si wɔa be edge location bubuwo zɔ̃a.

Status kple endpoint si le didiɖe: [status.fastz.cash](https://status.fastz.cash).

**ɣaɣlaŋlɔŋlɔ ƒe nya kpui:** fastz.cash hã ɖo Valar Group’s wallet-pir dɔwɔnu. Vizor zãlawo ate ŋu azãe egbea be woabia ɖoɖoŋkɔŋkɔ ƒe nyatakakawo le ɣaɣla me, siwo doa asi le nyatakakawo si dzɔla la se tso didienu alo didienu ƒe ƒoƒo siwo wobia tso ŋu. Esia nye ɣaɣlaŋlɔŋlɔ ƒe kpeɖeŋu bubu si kpe ɖe light-wallet ƒe nuxaxa ƒe nukɔnta si ŋu wogblɔ tso ɖoƒe si dzi la ŋu; meɖea Tor alo operator si wòatia teƒe o.

ztreamer nye mɔxenu si woƒo nyadzɔdzɔ kɔa le eme, eye wòate ŋu azã eye wòawɔ dɔ le eɖokui si (Zakura node si wode ɖe eme alo mode si zãa remote). Abe lightwalletd kple Zaino ene la, etsoa light-wallet protocol le gRPC dzi. Wole edzi wɔm dɔ le eŋu, eye woyɔe be infrastructure si woate ŋu azã le production me, eye wòanye teƒe si woato atsɔ akpɔ light-wallet protocol ƒe ŋutinya yeye siwo le ŋgɔ.

### Wò ŋutɔ ɖo wò server

Nukam be ele vevi wu enye be nàzu operator wò ŋutɔ, eye esia ɖea dzixɔse ƒe biabia ɖa blibo. Server etɔ̃a katã nye open source: [lightwalletd](https://github.com/zcash/lightwalletd) le Go me, [Zaino](https://github.com/zingolabs/zaino) le Rust me, eye [ztreamer](https://github.com/zcashlabs/ztreamer) le Rust me. Wokpɔ nyatakakawo tso validator blibo aɖe me, eya ta wòahiã hã [Zebra](/zcash-tech/zebra-full-node) alo Zakura. Wotsɔ zec.rocks servers la ɖo dɔ kple [Zcash Stack](/guides/zcash-stack), si nye Helm chart kple Docker Compose kit siwo katã le open source, eye wòdɔa Zebra kple lightwalletd ɖe mɔ dzi ɖo.

## Nu si wòate ŋu awɔ le nuwɔna me

### Serverwo ƒe ŋkɔwo

[hosh.zec.rocks](https://hosh.zec.rocks/zec) ƒe ɖoɖowo ƒuƒopé la dzra server siwo le dutoƒo kple woƒe ŋusẽ ta, eye wòate ŋu akpɔ afi si nusiwo le dɔ wɔm nyateƒe. [status.zec.rocks](https://status.zec.rocks/) fia dɔwɔwɔ ƒe nɔnɔme. Le fastz.cash ƒe network ŋu la, kpɔ [status.fastz.cash](https://status.fastz.cash).

Server siwo le dashboard ma dzi le ɣeyiɣi si woŋlɔ page sia:

| Server | Notes |
|:--|:--|
| zec.rocks:443 | Ɖoƒe siwo le ƒuƒoƒo me la le eŋu le na.zec.rocks, eu.zec.rocks, ap.zec.rocks kple sa.zec.rocks |
| zec-node.cakewallet.com:443 | Le Cake Wallet ƒe domain dzi |
| zec.0xrpc.io:443 | 0xRPC ye wɔe, eye wòna mɔxɔxɔ ƒe endpoints siwo le dutoƒo eye wòbia nunana be wòakpɔ ga si hiã na woƒe capacity |
| zaino.unsafe.zec.rocks:443 | Zaino ƒe instance. Bu hostname ŋu, eye nàbu be wòle experiment me |
| testnet.zec.rocks:443 | Testnet, kple Zaino testnet ƒe instance si woŋlɔ ɖe zaino.testnet.unsafe.zec.rocks |
| rpc.fastz.cash | Ztreamer ƒe network si le dutoƒo, si Zcash Labs wɔ. Kpɔ status.fastz.cash be nànya endpoints siwo le ƒuƒoƒo me kple woƒe ŋusẽ. |

Ŋlɔ ɖoɖowo ƒuƒopéwo me kpɔe, eye mègaɖo asi ɖe xexlẽdzesi sia dzi o. Ame siwo lé wo ŋu vaa eye woyina, eye axa abe esia ene ƒe ŋkekewo doa.

### Ale si nàtrɔ server le wò gakotoku me

Wòate ŋu awɔ esia ne èdi be yèatia operator si wòlése, wòawɔ dɔ kple operator geɖe, alo nàɖo wò tɔ ŋu.

Mɔ siwo wòakpɔ le menu me la dze le ɣeyiɣi si woɖo page sia yeye la, gake gakotoku ƒe interfacewo trɔna, ale bu wo abe nyatakaka si kplɔa wò la ene, ke menye mɔ si dze pɛpɛɛpɛ o. Di Advanced Settings alo server ƒe ɖoɖo.

#### ZODL

Wokpɔe ŋkɔ be Zashi. Ɖe cog si le dzi ɖusime la dzi, eye yi Advanced Settings. Tor le screen ma ke me hã. ZODL hã na Switch server ƒe mɔ kpui ne sync ƒe ŋuʋu si server si meganye yeye o la ɖo.

#### Zkool

Eyi teƒe Ywallet, tso developer ma ke (Ywallet ŋutɔ mele dɔ wɔwɔ me o, eye mate ŋu alé network la ɖe ɖoɖo me le Ironwood megbe o). Ɖe gear icon (Open Settings) si le accounts screen la ta dzi la, eye yi Light Node Server ƒe field la. List button si le eŋu la tia server siwo woɖo xoxo, eye Direct / Tor / Nym / Proxy ƒe switch si le ete la ɖo mɔ si gakotoku la zãa be wòakplɔ kadodo.

#### Zingo

Hamburger menu si le dzi le ŋgɔ ɖusime la, eye yi Settings, eye srɔ̃ alɔ.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Hamburger menu si le dzi le ŋgɔ ɖusime la, eye yi Settings, eye yi Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Woɖe screenshot siawo le March 2025 me, eye appwo ɖe releases yeye le ema megbe, ale buttonwo ate ŋu atrɔ teƒe.

## Nuwɔna siwo dzɔna

**Susua be server ate ŋu axlẽ wò gaɖoɖowo**. Mate ŋu o. Wò safuiwo nɔa wò device me, eye ga siwo kple nya kpuiwo le gaɖoɖo ɣaɣla blibo me la nɔa ɣaɣlaŋlɔŋlɔ me — ne adversary aɖe wɔ server la nu hã.

**Se "shielded" gɔme abe "anonymous connection" ene**. Gaɖoɖo ɣaɣla ɖea nu siwo dzɔna le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi ɣaɣla. Wò IP address kple ɣeyiɣi si wòwɔa dɔwo nye nɔnɔme bubu, eye nɔnɔme ma ke lae server la kpɔna.

**Susua be Tor ɖea mɔ ɖesiaɖe ƒe xexe la ɖa**. Tor ɣaɣla wò IP le server la ŋu, gake metrɔa nu si server la nya le nu si wòbiawo ŋu o, eye ena sync la ɖoa ɣeyiɣi didi.

**Nɔ ŋu ɖe serverwo ƒe ŋkɔwo ŋu le wiki ƒe axa dzi**. Dɔwɔlawo va eye woyina. Kpɔ [hosh.zec.rocks](https://hosh.zec.rocks/zec) kple [status.fastz.cash](https://status.fastz.cash) be nànya nu si le dɔ wɔm la hafi nàtsɔ wò gakotoku de nu aɖeke me.

## Nya veviwo

Gakotoku si hiã ƒe mɔwo na wò gaƒuƒoƒo si ɣaɣla la, si mehiã disk space o, eye esia nye trɔtrɔ vevi. Bu nu si wòle asitre la ŋu ko. Server la mate ŋu aɖu wò ga alo axlẽ ga siwo ɣaɣla o, gake ate ŋu akpɔ wò IP address kple ɣeyiɣi si wòwɔ gaɖoɖowo. Kplɔ kadodo to Tor dzi, tia operator wò ŋutɔ, alo ɖo wò tɔ.

## Page siwo kplɔa esia

- [Ame kaŋu wò ƒe Zcash fexexe](/start-here/who-can-see-your-zcash-payment) — nyatakakaa si wòtsɔna le gɔmedzedze me le nyabiase ma ŋuti.
- [Nukae Gaɖoɖowo ƒe Laŋu Ate Ŋu Akpɔ](/zcash-tech/what-a-block-explorer-can-see) — nu siwo le ɖoɖonu dzi la, eye menye nu siwo le server la gbɔ o.
- [Zaino](/zcash-tech/zaino) — ɖoɖo ƒe afɔkuwo kple mɔ̃ ƒe ɖoɖoŋlɔla si le Rust indexer la ƒe dɔ gã la.
- [Zinder](/zcash-tech/zinder) — Zcash Foundation ƒe alpha indexer, si tsɔ lightwalletd-compatible adapter la wɔa dɔ na nyatakakakotokuwo.
- [Zebra ɣaɣla dzesi ŋɔŋlɔ blibo](/zcash-tech/zebra-full-node) — validator si nyatakakakotoku ƒe server la xɔa nyatakakawo tso.
- [Zcash Gakotoku Ɖoɖo](/zcash-tech/zcash-wallet-syncing) — ale si wò gakotoku wɔa gaɖoɖowo ƒe gaɖoɖowo kpui si server la dɔna.
- [ztreamer](https://github.com/zcashlabs/ztreamer) — Rust indexer si wɔa dɔ kabakaba le fastz.cash network la me.

**Eŋu mamlɛtɔ ƒe ŋutinya:** 2026 ƒe November

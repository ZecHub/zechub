<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Axa ƒe Aɖeŋlɔ"/>
</a>


# Mɔ̃ ƒe ɖoɖoŋlɔla [Developer] ƒe Nuɖeɖewo

Nuɖeɖe siwo wò hia be nàtsɔ atu Zcash dzi la, woƒo ƒu ɖe nu si wòwɔ sia me ta, eye womete ɖe wo nɔewo ƒe dzi o.

Nuwo ƒe ɖoɖo trɔ keŋkeŋ le 2026 me. zcashd, si nɔ ɣaɣla dzesi ŋɔŋlɔ [node] la neti ƒe akpa gã te ŋutɔ ƒe eƒe ŋkekeawo katã, va se eƒe agbe ƒe nuwuwu 18 July 2026 le gaɖoɖowo ƒuƒoƒe [block] ƒe kɔkɔme 3417100, eye ɣaɣla dzesi ŋɔŋlɔ siwo me wotrɔ naneke o la katã tu le kɔkɔme ma, eye woagbe be woagatrɔ aɖe o. Fiafiɖewo siwo woŋlɔ na zcashd nye xoxoŋutinya fifia eye menye gɔmedzedze teƒe o, eyata woɖo axa sia ɖe nu si wɔ ɖe eteƒe la ŋu.

## Nuwo ƒe ɖoɖo le kpɔm kpuie

| Akpa | Nu si nàtsɔ | Dze egɔme kple |
|:--|:--|:--|
| Ɣaɣla dzesi ŋɔŋlɔ blibo [Full node] | Zebra alo Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku [wallet] | Zallet, le beta me | [The Zallet Book](https://zcash.github.io/zallet/) |
| Gakotoku ƒe nyatakaka si hiã ƒe mɔ [Light wallet server] | Zaino alo lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Gakotoku ƒe librarywo | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | Android kple iOS SDKs | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Ŋlɔɖi | Protocol ƒe ŋlɔɖi kple ZIPs | [zips.z.cash](https://zips.z.cash) |

## Ɣaɣla dzesi ŋɔŋlɔwo

Ɣaɣla dzesi ŋɔŋlɔ aɖe doa ɖase ɖe gbegbɔgblɔ ɖi [consensus] ŋu eye wòlé ɖoɖonu [chain] la. Dɔwɔwɔ siwo woɖe ɖe ŋgɔ nyuie le fifia koe li eve.

[Zebra](/zcash-tech/zebra-full-node) nye Zcash Foundation ƒe ɣaɣla dzesi ŋɔŋlɔ, woŋlɔe kple Rust, eye enye esi fiafiɖe geɖe bua be wòle. [The Zebra Book](https://zebra.zfnd.org/) ƒo nu tso ale si nàɖoe eye nàwɔ dɔ kplee ŋu, eye [repository](https://github.com/ZcashFoundation/zebra) nye afi si wole mɔ̃ ƒe ɖoɖoŋlɔla dɔ wɔm.

[Zakura](/zcash-tech/zakura-node) nye ɣaɣla dzesi ŋɔŋlɔ [node] yeye, si eŋlɔlawo ɖe eme be enye "gbegbɔgblɔ ɖi [consensus]-si wɔa ɖeka kple Zcash ɣaɣla dzesi ŋɔŋlɔ blibo [full node], si woɖo na wòate ŋu akpɔ nu geɖe", eye wòƒe sync le tsɔtsɔm kabakaba, gaɖoɖowo ƒuƒoƒe [block] ƒe tata kple zcashd ƒe mode si wɔa ɖeka. Sean Bowe, Zcash ƒe hadɔwɔtɔ gã ɖeka, kple Dev Ojha kplɔe. Enye dɔ si ŋutɔ ame sia ame ate ŋu awɔ le Apache 2.0 te le [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub ƒe [Full Nodes](/zcash-tech/full-nodes) axa la ƒo nu tso vɔsametɔwo siwo le wo dome ŋu.

## Ɣaɣla dzesi ŋɔŋlɔ blibo ƒe gakotoku

zcashd tsɔ gakotoku ɖeka de ɣaɣla dzesi ŋɔŋlɔ la kple. Gakotoku ma va bu, eye [Zallet](https://github.com/zcash/zallet) nye esi wɔ ɖe eteƒe. Zallet Book la gblɔ be enye "ɣaɣla dzesi ŋɔŋlɔ blibo ƒe Zcash gakotoku si woŋlɔ kple Rust" si "wom le wɔm be wòanye zcashd gakotoku ƒe nɔƒe".

Xlẽ dedie le dedienɔnɔ ƒe nukpɔkpɔ la hafi nàɖo ŋutɔ ɖe eŋu. Zallet le beta me, "womemekpɔe blibo o", trɔtrɔ siwo gbãa nu "ate ŋu ava ɣeyiɣi sia ɣeyiɣi, eye woaɖe wò be nàtutu eye nàwɔ Zallet gakotoku la ake", eye wometsɔ zcashd RPC ƒe mɔwo katã va o haɖe.

Ne èle ɖoɖo xoxo aɖe trɔm la, ZecHub ƒe [trɔm ƒe fiafiɖe tso zcashd yi Zebra kple Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet), kple [Zallet nubabla ƒe kpuieŋlɔ](/using-zcash/zallet-quick-reference-guide).

## Gakotoku ƒe nyatakaka si hiã ƒe mɔwo

Gakotoku geɖe menoa ɣaɣla dzesi ŋɔŋlɔ aɖe o. Wodoa gbe na server aɖe si lé ɖoɖonu la eye wòtrɔa eƒe kpɔkpɔ sue aɖe na wo.

[lightwalletd](https://github.com/zcash/lightwalletd) nye subɔsubɔ gãtɔ, woŋlɔe kple Go, eye womɔe be enye "megbe ƒe subɔsubɔ si naa mɔ si mesia bandwidth geɖe o be woatsɔ ado gbe na Zcash blockchain". [Zaino](/zcash-tech/zaino) nye indexer yeye, woŋlɔe kple Rust, eye woxlea nu tso validator blibo aɖe me ɖe teƒe be wòatsɔ eya ŋutɔ ƒe ɖoɖonu ƒe kɔpi.

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) ƒe agbalẽwo ƒo nu tso protocol la ŋutɔ ŋu. [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) axa la ƒo nu tso nu si server siawo ate ŋu akpɔ kple nu si womate ŋu akpɔ tso zãla aɖe ŋu, si wòle be nàse egɔme hafi nàtia ɖeka.

## Gakotoku tutu

Gakotoku ƒe dɔ geɖe wɔna le Rust crates siwo le [librustzcash](https://github.com/zcash/librustzcash) te, siwo mobile SDKs kple desktop gakotoku geɖe tutu ɖo. Woŋlɔ crate ɖeka sia ɖeka ƒe agbalẽ le [docs.rs](https://docs.rs).

| Krate | Esi wozanae na |
|:--|:--|
| zcash_client_backend | "APIwo siwo nana be woawɔ ɣaɣla [shielded] Zcash nyatakaka si hiã ƒe mɔ [light client]wo", eye wòtsɔ ɖoɖo ɖe eŋu kple gaɖoɖo [transaction] wɔwɔ ɖe eme |
| zcash_client_sqlite | "Zcash nyatakaka si hiã ƒe mɔ si SQLite tu wɔ", si nye dzesiwo ƒe nɔƒe ƒe akpa na esi le etame |
| zcash_keys | "Zcash kɔkɔe kple gaɖoƒe ƒe dzesi [address] dzi kpɔkpɔ" |
| zcash_primitives | "Rust ƒe Zcash gɔmedzedze ƒe wɔwɔwo" |
| zcash_protocol | "Zcash protocol ƒe network constants kple asixɔxɔ ƒomeviwo" |
| orchard | "Orchard ƒe ɣaɣla gaɖoɖo protocol" |
| sapling-crypto | "Kryptography ƒe library na Zcash Sapling" |
| pczt | "Dɔwɔnu [tools] siwo nana be woawɔ dɔ kple Zcash gaɖoɖowo siwo mewɔ bliboa o", si wozana na hardware kple mɔwo geɖe ƒe asidede agbalẽ te [signature] wɔwɔ |
| zip321 | Fexexe [payment] ƒe biabia URIwo, abe ale si woɖe fia le ZIP 321 me |

Na mobile, [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) kple [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) ɖoa library siawo ƒe agbale. Woyɔ iOS repository la kpɔ be ZcashLightClientKit, eyata kadodo xoxowo kple nyatiwo tsɔ ŋkɔ ma.

## Ŋlɔɖi kple cryptography

[protocol specification](https://zips.z.cash/protocol/protocol.pdf) nye amegã le ale si Zcash wɔa dɔ ŋu, si me [gaɖoƒe ƒe dzesi kple kɔkɔ ƒe codewo](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) hã le.

[ZIPs](https://zips.z.cash) nye afi si wom doa ɖe trɔtrɔwo ŋu eye womɔa wo, eye index la fia esiwɔwo si nye draft kple esiwɔwo si woɖo nu le. Gbegbɔgblɔ ɖi ƒe trɔtrɔwo doa tso neti ƒe mɔ̃ ƒe sewo trɔtrɔ [network upgrade] me, eye ZecHub le wo dom tom le [Network Upgrades](/start-here/network-upgrades) axa dzi.

Na cryptography si le ete, xlẽ [The halo2 Book](https://zcash.github.io/halo2/index.html) kple [The Orchard Book](https://zcash.github.io/orchard/), kple [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) kple [orchard](https://docs.rs/orchard/latest/orchard/) crate ƒe agbalẽwo. [The FROST Book](https://frost.zfnd.org/) ƒo nu tso asidede agbalẽ te si ame geɖe wɔa ŋu, eye ZecHub ƒe [FROST](/zcash-tech/frost) axa.

## Testnet

Testnet nye ɖoɖonu bubu aɖe si me ga si me asixɔxɔ le o le, eye woyɔe be TAZ. Zebra kple Zakura ate ŋu awɔ dɔ kplee, eye [testnet guide](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) ƒo nu tso ɣaɣla dzesi ŋɔŋlɔ ƒe ɖoɖo ŋu.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) nye testnet ƒe gaɖoɖowo ƒuƒoƒe ƒe didimekpɔƒe si wɔa dɔ, eye mainnet ƒe nɔvia le [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

TAZ xɔxɔ nye akpa si sesẽ, elabena ga suewo nanaƒewo [faucet] siwo kadodo xoxowo ɖo ƒe adzɔ la megale gbɔna o. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) nye ga suewo nanaƒe si hadɔa wɔ, si wɔa dɔ kple "eŋutɔ ƒe ɣaɣla dzesi ŋɔŋlɔ, gakotoku kple nukula [miner]", wòxena "ɣaɣla z2z drips", eye wòtsɔ "browser ƒe dɔ ƒe ɖaseɖigbalɛ [proof] ɖe teƒe be captcha vendor". Enye open source le MIT te. Ne mele asɔ o la, bia le Zcash R&D Discord me, elabena Zcash ƒe agbalẽwo ŋutɔe fia.

## Agbalẽ gbogblɔ

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) gale nye nyaƒoƒe ɖeka si gã wu, eye wòƒo nu tso protocol ƒe gɔmesese, integration kple nukuku [mining] ŋu. Xlẽe kple dzidzo. Woɖo eƒe version ɖe zcashd ŋu, eyata eƒe akpa aɖewo ƒo nu tso ɣaɣla dzesi ŋɔŋlɔ si megawɔ dɔ o, ke hã protocol kple nyatakaka si hiã ƒe mɔ ƒe akpawoe gale vi na. [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) si le afima la le be nàxlẽ hafi nàɖo nu aɖe si kwa zãlawo ƒe ɣaɣla [privacy] ŋu.

Ne wòle blockchainwo ƒe nya gbogblɔ me yeye la, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) nye nu si wom tsɔa fia na ame geɖe na gɔmedzedze siwo wɔ ɖeka, eye wòle baɖa be woaxlẽe blibo. Menɔa ɣaɣla gaɖoɖowo ŋu o.

## Dɔwɔnu bubu siwo mɔ̃ ƒe ɖoɖoŋlɔlawo gblɔ

[Arti](https://docs.rs/arti/latest/arti/) nye Rust ƒe Tor ƒe wɔwɔnu, si zcash_client_backend tsɔna tsɔa gakotoku ƒe trafik ɖe mɔ dzi. [Tailscale](https://github.com/tailscale/tailscale) va doa le ɣaɣla dzesi ŋɔŋlɔ si wò ŋutɔ nɔa dzi ƒe kadodo me. [warp2](https://github.com/hhanh00/warp2) nye Hanh ƒe sync kaba ƒe wɔwɔnu, gake wometrɔe tso 2023 o.

## Hadɔ kple nudzɔdzɔwo

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) nye afi si womƒoa nu tso protocol kple gakotoku ƒe mɔ̃ ƒe ɖoɖoŋlɔla dɔ ŋu, eye [Zcash Community Forum](https://forum.zcashcommunity.com/) naa ɖoɖo didiwo kple kpekpeɖeŋu ƒe nyatiwo.

Hackathon ƒe emetsonu yeyeawo fia nu nyui tso nu si amewo le tutum ŋu: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) kple [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Nuɖeɖe siwo wometsɔ dɔ o azɔ

Woɖe wo ɖe afima elabena nyati xoxowo ɖo kadodo ɖe wo ŋu, eye elabena wo gale nye nuɖeɖe na ale si ɣaɣla dzesi ŋɔŋlɔ si wometsɔ dɔ o azɔ wɔa dɔ. Mègadzɔ le afisia o.

[The zcashd Book](https://zcash.github.io/zcash/) kple [zcashd RPC reference](https://zcash.github.io/rpc/) ƒo nu tso software si va se [end of life](https://zcash.github.io/zcash/user/end-of-life.html) le July 2026 me. [zcash/zcash](https://github.com/zcash/zcash) repository la woɖe ɖe archive me.

Ne ètsɔ nuɖeɖe aɖe akpe ɖe eŋu, alo nèkpɔ nu aɖe le afisia si va xoxo la, ɖe issue alo pull request aɖe. Hadɔwo menɔa ŋusẽ ɣesiaɣi be woanɔ nuwo katã yɔm fifia o, eye nu si nèdo go fiaa mɔ be fiafiɖewo nakpɔ afisi wòle be yewoatsɔ wɔnuku.

**Wotrɔe mlɔeba:** August 2026

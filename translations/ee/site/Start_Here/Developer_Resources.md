<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Dɔwɔlawo ƒe Dɔwɔnuwo

Nusiwo nèhiã be nàtu ɖe Zcash dzi, siwo woƒo ƒu ɖe nusiwo wo dometɔ ɖesiaɖe nye nu tsɔ wu be woaŋlɔ wo ɖe ƒuƒoƒo ɖeka me.

The stack changed a great deal in 2026. zcashd, si nɔ network la dzi kpɔm le eƒe ŋutinya ƒe akpa gãtɔ me la, ɖo eƒe agbenɔƒe ƒe nuwuwu le 18 July 2026 dzi le block height 3417100, eye node ɖesiaɖe si wometrɔ o la tsi le kɔkɔƒe ma eye wòagbe be yemagadze egɔme ake o. Mɔfiame siwo woŋlɔ na zcashd nye ŋutinya fifia tsɔ wu be woanye gɔmedzeƒe, eyata wowɔ ɖoɖo ɖe axa sia ŋu ƒo xlã nusi va xɔ ɖe eteƒe.

## Stack la le ŋkubiãnya me

| Layer | Nusiwo woazã | Dze egɔme kple |
|:--|:--|:--|
| Node blibo | Zebra alo Zakura | [Zebra ƒe Agbalẽa](https://zebra.zfnd.org/), [zakura.com dzi](https://zakura.com/) |
| Blibo node gakotoku | Zallet, le beta me | [Zallet ƒe Agbalẽa](https://zcash.github.io/zallet/) |
| Light wallet server | Zaino or lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Gakotoku ƒe agbalẽdzraɖoƒewo | librustzcash ƒe aɖakawo | [librustzcash ƒe ŋkɔ](https://github.com/zcash/librustzcash) |
| Asitelefon dzi | Android kple iOS SDKwo | [Android dzi](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Nusiwo wogblɔ tso eŋu | Protocol spec kple ZIPwo | [zips.z.ga si wotsɔna xɔa gae](https://zips.z.cash) |

## Nodes ƒe ƒuƒoƒo

Node aɖe ɖoa kpe nukpɔsusu ɖeka dzi eye wòléa kɔsɔkɔsɔa ɖe asi. Dɔwɔwɔ eve li siwo wowɔ veviedodotɔe.

[Zebra](/zcash-tech/zebra-full-node) nye Zcash Foundation ƒe node, si woŋlɔ ɖe Rust me, eye eyae nye esi mɔfiala akpa gãtɔ susu fifia. [Zebra ƒe Agbalẽa](https://zebra.zfnd.org/) ƒo nu tso eɖoɖo kple ewɔwɔ ŋu, eye [nudzraɖoƒe](https://github.com/ZcashFoundation/zebra) nye afisi ŋgɔyiyi dzɔna le.

[Zakura](/zcash-tech/zakura-node) nye node yeyetɔ, si eƒe agbalẽŋlɔlawo ɖɔ be enye "Zcash full node si sɔ kple nukpɔsusu ɖeka, si wotu na scale", kple sync kabakaba, block pruning kple zcashd compatibility mode. Sean Bowe, si nye Zcash ƒe gɔmeɖoanyila ɖeka, kple Dev Ojha ye le ŋgɔ nɛ. Enye ʋuʋu dzɔtsoƒe le Apache 2.0 te le [zakura-nu vevi/zakura](https://github.com/zakura-core/zakura).

ZecHub ƒe a [Nodes Blibowo](/zcash-tech/full-nodes) axa si ƒo nu tso asitsatsa siwo le wo dome ŋu.

## Node ƒe gakotoku bliboa

zcashd bla gakotoku aɖe kple node la. Gakotoku ma megali o, eye... [Zallet ƒe ŋkɔ](https://github.com/zcash/zallet) ye nye esi woatsɔ aɖo eteƒe. Zallet Agbalẽa ɖɔe be "Zcash gakotoku si ƒe node blibo si woŋlɔ ɖe Rust me" si "wotu abe zcashd gakotokua teƒe ene".

Xlẽ dedienɔnɔ ŋuti nuxlɔ̃amea hafi nànɔ te ɖe edzi. Zallet le beta me, "womelé ŋku ɖe eŋu bliboe o", tɔtrɔ siwo gblẽ "ate ŋu adzɔ ɣesiaɣi, si abia be nàtutu wò Zallet gakotokua eye nàgbugbɔ awɔe", eye menye zcashd RPC mɔnu ɖesiaɖee wotsɔ yi haɖe o.

Ne èle ɖoɖo si li xoxo ʋum ɖe edzi la, ZecHub ƒe a [ʋuʋu ƒe mɔfiame tso zcashd yi Zebra kple Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) kple a [Zallet ƒe nufiame kabakaba](/using-zcash/zallet-quick-reference-guide).

## Kekeli gakotoku ƒe dɔwɔƒewo

Gakotoku akpa gãtɔ mewɔa node aɖeke o. Woƒoa nu kple server aɖe si léa kɔsɔkɔsɔa ɖe te eye wòtsɔa asi naa eƒe nukpɔkpɔ sue aɖe.

[lightwalletd](https://github.com/zcash/lightwalletd) nye subɔsubɔdɔ gbãtɔ, si woŋlɔ ɖe Go me, si woɖɔ be "megbedɔwɔwɔ si naa kadodomɔnu si zãa bandwidth nyuie na Zcash blockchain". [Zaino](/zcash-tech/zaino) nye indexer yeyetɔ, si woŋlɔ kple Rust, eye wòxlẽa nu tso validator blibo gbɔ tsɔ wu be wòatsɔ eya ŋutɔ ƒe kɔsɔkɔsɔa ƒe kɔpi ɖe asi.

The [Kekeli ƒe Asitsaha ƒe Ðoɖowɔɖi](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) nuŋlɔɖiwo ƒo nu tso ɖoɖowɔɖia ŋutɔ ŋu. The [Lightwallet ƒe Nutowo](/zcash-tech/lightwallet-nodes) axaa ƒo nu tso nusiwo server siawo ate ŋu akpɔ kple esiwo womate ŋu akpɔ tso ezãla ŋu o, si gɔme wòle be nàse hafi atia ɖeka.

## Gakotoku tutu

Gakotokudɔ akpa gãtɔ dzɔna le Rust crates te [librustzcash ƒe ŋkɔ](https://github.com/zcash/librustzcash), si dzi asitelefon dzi SDK-wo kple kɔmpiutadzigakotoku geɖe tua ɖo. Woŋlɔa agbalẽ ɖe aɖaka ɖesiaɖe dzi [docs.rs](https://docs.rs).

| Crate | Nusi wònye na |
|:--|:--|
| zcash_client_megbenyawo | "APIwo hena Zcash kekeli ƒe asisiwo si wokpɔ ta na wɔwɔ", si me sync kple asitsatsa tutu hã le |
| zcash_asitsala_sqlite | "Zcash kekeli ƒe asitsaha si wotu ɖe SQLite dzi", nudzraɖoƒe ƒe ƒuƒoƒo na |
| zcash_safuiwo | "Zcash safui kple adrɛs dzikpɔkpɔ" |
| zcash_primitives ƒe gɔmedzenuwo | "Rust ƒe dɔwɔwɔwo le Zcash gbãtɔwo me" |
| zcash_ɖoɖowɔɖi | "Zcash protocol network ƒe nɔnɔme madzudzɔmadzudzɔe kple asixɔxɔ ƒomeviwo" |
| atikutsetsebɔ | "Orchard ƒe asitsatsa ƒe ɖoɖowɔɖi si wokpɔ ta na" |
| atikutsetse-kplu-kplu | "Cryptographic agbalẽdzraɖoƒe na Zcash Sapling" |
| pczt ƒe ƒuƒoƒo | "Dɔwɔnu siwo woatsɔ awɔ dɔ kple Zcash ƒe asitsatsa siwo wowɔ ƒe akpa aɖe", wozãna na xɔtunuwo kple mɔ̃ geɖe ƒe asidede |
| zip321 | Fexexe ƒe biabiawo ƒe URIwo, abe alesi wogblɔe le ZIP 321 |

Le asitelefon gome la,... [Android SDK ƒe dɔwɔwɔ](https://github.com/zcash/zcash-android-wallet-sdk) kple... [iOS SDK ƒe dɔwɔwɔ](https://github.com/zcash/zcash-swift-wallet-sdk) xatsa agbalẽdzraɖoƒe mawo. Tsã la, woyɔa iOS ƒe nudzraɖoƒea be ZcashLightClientKit, eyata kadodo kple nyati xoxowo zãa ŋkɔ ma.

## Nusiwo wogblɔ tẽ kple nya ɣaɣlawo

The [protocol ƒe nɔnɔmetatawo](https://zips.z.cash/protocol/protocol.pdf) nye ŋusẽ si le alesi Zcash wɔa dɔe ŋu, si me [adrɛs kple safui ƒe nuŋɔŋlɔwo](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP-wo](https://zips.z.cash) nye afisi wodo tɔtrɔwo ƒe susu ɖa le eye wogblɔ wo le, eye index la ɖea esiwo nye nuŋlɔɖiwo kple esiwo nye mamlɛtɔ fiana. Consensus ƒe tɔtrɔwo meli le network upgrades me, eye ZecHub léa ŋku ɖe amesiwo le... [Netwɔƒea ƒe Ðɔɖɔɖowo](/start-here/network-upgrades) axa 10.

Ne èdi nya ɣaɣla siwo le ete la, xlẽe [Halo2 Agbalẽa](https://zcash.github.io/halo2/index.html) kple [The Orchard Book](https://zcash.github.io/orchard/), kple [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) kple [atikutsetsebɔ](https://docs.rs/orchard/latest/orchard/) crate docs le axadzi. [FROST ƒe Agbalẽa](https://frost.zfnd.org/) ƒoa nu tso threshold signatures ŋu, eye ZecHub ƒe a [FROST ƑE NUÐEÐEŊUTI](/zcash-tech/frost) axa 10.

## Dodokpɔ ƒe mɔ̃

Testnet nye kɔsɔkɔsɔ si to vovo si me gaku siwo ŋu asixɔxɔ mele o le, si woyɔna be TAZ. Zebra kple Zakura siaa ate ŋu aƒu du atsi tre ɖe eŋu, eye... [testnet ƒe mɔfiame](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) ƒo nu tso node ƒe ɖoɖowɔwɔ ŋu.

[testnet.zcashexplorer.dɔwɔwɔ ƒe mɔnu](https://testnet.zcashexplorer.app/) nye testnet block explorer si le dɔ wɔm, kple mainnet ƒe kpeɖeŋutɔ le [mainnet.zcashexplorer.dɔwɔwɔ ƒe mɔnu](https://mainnet.zcashexplorer.app/).

TAZ xɔxɔ nye akpa si mebɔbɔ o. Dutoƒo pɔmpiwo dona eye wobuna, eye esiwo wotsɔ ka ɖe wo ŋu tso nuŋlɔɖi xoxowo me la menɔ ŋu ɖom esime woŋlɔ axa sia o. Mɔ si ŋu kakaɖedzi le enye be nàbia le Zcash R&D Discord me, si nye nusi Zcash ƒe nuŋlɔɖiwo ŋutɔ do ɖa.

## Nuŋlɔɖi siwo wowɔna le mɔ gbadza nu

[Zcash ƒe Nuŋlɔɖiwo](https://zcash.readthedocs.io/en/latest/) gakpɔtɔ nye dzɔtsoƒe ɖeka si keke ta wu, si ƒo nu tso ɖoɖowɔɖi ƒe susuwo, ɖekawɔwɔ kple tomenukuƒewo ŋu. Xlẽe kple ŋuɖɔɖɔɖo aɖe. Wotrɔ asi le eŋu ɖe zcashd ŋu, eyata eƒe akpa aɖewo ɖɔa node si megawɔa dɔ o, esime protocol kple light client ƒe akpawo gakpɔtɔ nye viɖenu. [Zcash Wallet App ƒe Afɔku ƒe Kpɔɖeŋu](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) si nɔa afima la sɔ be woaxlẽ hafi awɔ nusianu si aka asi zãla ƒe adzamenyawo ŋu.

Ne ènye ame yeye le blockchains me le goawo katã me la, . [Bitcoin ƒe aɖaŋudzedze](https://github.com/bitcoinbook/bitcoinbook) nye kafukafu si wozãna zi geɖe na gɔmeɖose siwo woama, eye woate ŋu axlẽe bliboe faa. Meƒoa nu tso asitsatsa siwo ŋu wokpɔa akpoxɔnuwo le ŋu o.

## Dɔwɔnu bubu siwo dɔwɔlawo ƒo nu tsoe

[Arti](https://docs.rs/arti/latest/arti/) nye Tor ƒe Rust dɔwɔwɔ, si zcash_client_backend zãna tsɔ ɖoa ​​mɔ gakotoku ƒe ʋuɖoɖo. [Tailscale ƒe ʋuʋudedi](https://github.com/tailscale/tailscale) va doa ka kple node si wò ŋutɔ nèwɔna. [warp2](https://github.com/hhanh00/warp2) nye fast sync implementation si Hanh wɔ, togbɔ be womewɔe yeyee tso ƒe 2023 me o hã.

## Nutoa me kple wɔnawo

The [Zcash Numekuku Kple Dɔwɔnawo ƒe Masɔmasɔ](https://discord.gg/6AK7keWFaK) nye afisi woƒo nu tso protocol kple gakotoku ƒe ŋgɔyiyi ŋu le, eye [Zcash Nutome Nyamedzroƒe](https://forum.zcashcommunity.com/) tsɔa aɖaŋuɖoɖo didiwo kple kpekpeɖeŋu kawo.

Hackathon me tsonu siwo wowɔ nyitsɔ laa nye nusiwo amewo le tutum ƒe nɔnɔmetata nyui aɖe: [ZecHub ƒe 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub ƒe 2025](https://x.com/ZecHub/status/1975565960661635283) kple... [Zypherpunk ƒe Hackathon ƒe 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Dzudzɔxɔxɔledɔme ƒe nunɔamesiwo

Wodzrae ɖo elabena nyati xoxowo do ƒome kpli wo, eye elabena wogakpɔtɔ nye nufiame na alesi node si xɔ dzudzɔ le dɔme la wɔ nui. Mègadze egɔme tso afisia o.

[Zcashd ƒe Agbalẽa](https://zcash.github.io/zcash/) kple... [zcashd RPC ƒe nufiame](https://zcash.github.io/rpc/) nuŋlɔɖi kɔmpiutadziɖoɖo si ɖo [agbe ƒe nuwuwu](https://zcash.github.io/zcash/user/end-of-life.html) le July 2026. Eƒe... [zcash/zcash ƒe ga](https://github.com/zcash/zcash) nudzraɖoƒea le nudzraɖoƒe.

Ne dɔwɔnu aɖe le asiwò nàtsɔ akpe ɖe eŋu, alo nèkpɔ nane le afisia si gblẽ la, ʋu nya aɖe alo hehe ƒe biabiawo. Menye ɣesiaɣie ŋutete nɔa ƒuƒoƒowo si be woana nusianu nanɔ yeye o, eye aflaga tsɔtsɔ de nusi nèdo goe kpena ɖe mɔfialawo ŋu wòfiaa mɔ wo.

**Wowɔ yeyee zi mamlɛtɔ:** August 2026

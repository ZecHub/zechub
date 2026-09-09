<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Vifaa vya Watengenezaji wa Programu

Rasilimali unahitaji kujenga juu ya Zcash, makundi kwa nini kila mmoja ni kwa badala ya waliotajwa katika rundo moja.

The stack changed a great deal in 2026. zcashd, which ran the network for most of its history, reached its end of life on 18 July 2026 at block height 3417100, and every unmodified node shut down at that height and will refuse to restart. Guides written for zcashd are history now rather than a starting point, so this page is organised around what replaced it.

## Mkusanyiko kwa mtazamo mmoja tu

 Tabaka  Nini cha kutumia  Anza na 
|:--|:--|:--|
Kondoo kamili. Zebra au Zakura. [Kitabu cha Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
Zawadi ya kifungo kamili Zallet, katika beta. [Kitabu cha Zallet](https://zcash.github.io/zallet/) |
Light wallet server Zaino au lightwalletd. [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Wallet libraries | The librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
Simu ya mkononi. Android na iOS SDKs. [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
☐ Ufafanuzi wa taratibu na ZIPs. [zip.z. fedha taslimu](https://zips.z.cash) |

## Nodes (viungo)

Node validates makubaliano na anaendelea mlolongo. Kuna mbili uanzishaji kikamilifu maendeleo.

[Zebra](/zcash-tech/zebra-full-node) ni node Zcash Foundation ya, imeandikwa katika kutu, na moja viongozi wengi sasa kudhani. [Kitabu cha Zebra](https://zebra.zfnd.org/) inashughulikia kufunga na kuendesha yake, na [kumbukumbu ya habari](https://github.com/ZcashFoundation/zebra) ni mahali ambapo maendeleo hutokea.

[Zakura (mnyama)](/zcash-tech/zakura-node) is a newer node, described by its authors as a "consensus-compatible Zcash full node, built for scale", with faster sync, block pruning and a zcashd compatibility mode. It is led by Sean Bowe, a Zcash cofounder, and Dev Ojha. It is open source under Apache 2.0 at [zakura-msingi/zakura](https://github.com/zakura-core/zakura).

ZecHub ina a [Nodes kamili](/zcash-tech/full-nodes) ukurasa kufunika biashara kati yao.

## Nakala kamili ya mkoba

zcashd bundled mkoba na node. mfuko huo ni gone, na [Zallet (Kifungu cha kulia)](https://github.com/zcash/zallet) ni badala. Kitabu Zallet inaelezea kama "full-node Zcash mkoba imeandikwa katika kutu" kuwa "kujengwa kama mbadala kwa ajili ya mfuko wa zcashd".

Soma onyo la usalama kabla ya kutegemea. Zallet ni katika beta, "haikuwa kikamilifu upya", kuvunja mabadiliko "inaweza kutokea wakati wowote, zinahitaji wewe ili kufutilia mbali na recreate mkoba wako Zallet", na si kila njia zcashd RPC imekuwa ported bado.

Kama wewe ni kusonga kuanzisha zilizopo katika, ZecHub ina [uhamiaji mwongozo kutoka zcashd kwa Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) na a [Zallet haraka rejea](/using-zcash/zallet-quick-reference-guide).

## Mwanga mkoba servers

Wengi pochi si kukimbia node. Wao kuzungumza na server kwamba anaendelea mlolongo na mikono nyuma mtazamo compact ya hiyo.

[lightwalletd](https://github.com/zcash/lightwalletd) ni huduma ya awali, iliyoandikwa katika Go, ilivyoelezwa kama "huduma backend ambayo hutoa interface bandwidth-afya kwa blockchain Zcash". [Zaino](/zcash-tech/zaino) ni indexer mpya, imeandikwa katika kutu, na anasoma kutoka validator kamili badala ya kubeba nakala yake mwenyewe wa mlolongo.

Makala ya kwanza. [Mwanga Client Itifaki](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) hati inashughulikia itifaki yenyewe. [Nodes Lightwallet](/zcash-tech/lightwallet-nodes) ukurasa inashughulikia nini hizi seva wanaweza na hawawezi kuona kuhusu mtumiaji, ambayo ni thamani ya kuelewa kabla ya kuchagua moja.

## Kujenga mkoba

Kazi zaidi mkoba hutokea katika makontena Rust chini ya [librustzcash](https://github.com/zcash/librustzcash), ambayo SDKs mkononi na pochi kadhaa desktop kujenga juu. Kila crate ni kumbukumbu kwenye [docs.rs](https://docs.rs).

Sanduku. Ni kwa ajili ya nini?
|:--|:--|
 zcash_client_backend "APIs kwa ajili ya kujenga walinzi Zcash mwanga wateja", ikiwa ni pamoja na usawazishaji na shughuli ujenzi"
zcash_client_sqlite. "msingi SQLite-Zcash mwanga mteja", kuhifadhi safu kwa ajili ya hapo juu".
 zcash_keys "Usimamizi wa ufunguo na anwani ya Zcash"
 zcash_primitives "Utekelezaji wa kutu ya Zcash primitives"
 zcash_protocol "Zcash itifaki mtandao constants na aina thamani"
"Protocol ya shughuli iliyohifadhiwa na Orchard".
"Maktaba ya Cryptographic kwa Zcash Sapling".
│ pczt "Zana za kufanya kazi na shughuli Zcash sehemu-kuundwa", kutumika kwa ajili ya vifaa vya na multi-kifaa kusaini.
DATA: zip321. Maombi ya malipo URI, kama ilivyoainishwa katika ZIP 321.

Kwa simu, the [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) na ya [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) kumbukumbu iOS awali aliitwa ZcashLightClientKit, hivyo viungo zamani na makala kutumia jina hilo.

## Vipimo na cryptography

Makala ya kwanza. [maelezo ya itifaki](https://zips.z.cash/protocol/protocol.pdf) ni mamlaka juu ya jinsi Zcash kazi, ikiwa ni pamoja na [anwani na encodings muhimu](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIPs](https://zips.z.cash) mabadiliko ya mkataba meli katika kuboresha mtandao, na ZecHub hufuatilia wale juu ya mstari. [Kuboresha Mtandao](/start-here/network-upgrades) ukurasa.

Kwa cryptography chini, kusoma [Kitabu cha Halo2](https://zcash.github.io/halo2/index.html) na [The Orchard Book](https://zcash.github.io/orchard/), pamoja na [halo2 (mwanga)](https://docs.rs/halo2_proofs/latest/halo2_proofs/) na [shamba la matunda](https://docs.rs/orchard/latest/orchard/) crate docs kando. [Kitabu cha FROST](https://frost.zfnd.org/) inashughulikia saini kizingiti, na ZecHub ina [FROST](/zcash-tech/frost) ukurasa.

## Mtihani wa kuchuja

Testnet ni mlolongo tofauti na sarafu thamani, aitwaye TAZ. Wote Zebra na Zakura wanaweza kukimbia dhidi yake, na mzunguko wa fedha za kigeni kwa ajili ya biashara yao katika nchi nyingine pia inaonekana kuwa muhimu zaidi kuliko hata kabla. [mwongozo wa jaribio la ukumbi](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) inashughulikia node Configuration.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) ni kazi testnet block Explorer, na mainnet mwenzake katika [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Kupata TAZ ni sehemu awkward. faucets umma kuonekana na kutoweka, na wale wanaohusishwa kutoka hati ya zamani walikuwa si kujibu wakati ukurasa huu iliandikwa. njia ya kuaminika ni kuomba katika Zcash R & D Discord, ambayo ni nini nyaraka za Zcash yenyewe inapendekeza.

## Nyaraka za jumla

[Zcash Nyaraka](https://zcash.readthedocs.io/en/latest/) ni bado pana moja chanzo, kufunika itifaki dhana, ushirikiano na madini. Kusoma kwa uangalifu fulani. Ni versioned dhidi zcashd, hivyo sehemu yake kuelezea node kwamba tena anaendesha, wakati protocol na mwanga mteja mafungu kubaki muhimu. [Zcash Wallet App tishio la mfano wa mtindo](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) kwamba anaishi kuna thamani ya kusoma kabla ya kubuni kitu chochote ambacho huathiri faragha user.

Kama wewe ni mpya kwa blockchains ujumla, [Kujifunza Bitcoin kwa Ukamili](https://github.com/bitcoinbook/bitcoinbook) ni mapendekezo ya kawaida kwa msingi pamoja, na ni huru kusoma katika ukamilifu. Haina kufunika shughuli shielded.

## Vifaa vingine watengenezaji wametaja

[Arti](https://docs.rs/arti/latest/arti/) ni Rust utekelezaji wa Tor, kutumika na zcash_client_backend kwa njia ya mkoba trafiki. [Tailscale (Kipande cha Mkia)](https://github.com/tailscale/tailscale) huja juu kwa kuunganisha na node wewe kukimbia mwenyewe. [warp2](https://github.com/hhanh00/warp2) ni utekelezaji wa haraka ya usawazishaji na Hanh, ingawa haijasasishwa tangu 2023.

## Jumuiya na matukio

Makala ya kwanza. [Zcash R & D Discord](https://discord.gg/6AK7keWFaK) ni ambapo itifaki na mkoba maendeleo ni kujadiliwa, na [Zcash Jamii Forum](https://forum.zcashcommunity.com/) hubeba mapendekezo marefu na kuunga mkono thread.

Matokeo ya hivi karibuni ya hackathon ni picha nzuri ya kile watu wanajenga: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) na ya [Zypherpunk Hackathon 2025 (Mchezo wa kutisha)](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Rasilimali waliondolewa kazi

Ilibaki kwa sababu makala ya zamani wanaunganisha yao, na kwa sababu bado ni rejea jinsi node kustaafu mwenendo. Usianze hapa.

[Kitabu Zcashd](https://zcash.github.io/zcash/) na ya [zcashd RPC rejea](https://zcash.github.io/rpc/) hati programu ambayo kufikiwa [mwisho wa maisha ya mtu](https://zcash.github.io/zcash/user/end-of-life.html) katika Julai 2026. [zcash/zcash](https://github.com/zcash/zcash) hazina ni kumbukumbu.

Kama una rasilimali kuongeza, au wewe doa kitu hapa kwamba imekuwa stale, kufungua suala au ombi kuvuta. Timu si daima kuwa na uwezo wa kuweka kila kitu sasa, na flagging nini kukimbia katika husaidia mwongozo viongozi.

** Mwisho updated:** Agosti 2026

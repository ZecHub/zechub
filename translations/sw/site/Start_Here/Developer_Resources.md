<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Rasilimali za wasanidi programu [Developer Resources]

Rasilimali unazohitaji kujenga kwenye Zcash, zikiwa zimepangwa kulingana na kusudi la kila moja badala ya kuorodheshwa pamoja.

Mfumo ulipitia mabadiliko makubwa mwaka 2026. zcashd, ambayo iliendesha mtandao kwa sehemu kubwa ya historia yake, ilifikia mwisho wa maisha yake tarehe 18 Julai 2026 katika urefu wa block 3417100, na kila node ambayo haijabadilishwa ilisimama katika urefu huo na itakataa kuwashwa upya. Miongozo iliyoandikwa kwa ajili ya zcashd sasa ni historia badala ya mahali pa kuanzia, kwa hiyo ukurasa huu umepangwa kuzungumzia kilichoibadilisha.

## Mfumo kwa muhtasari

| Tabaka | Cha kutumia | Anza na |
|:--|:--|:--|
| Full node | Zebra au Zakura | [Kitabu cha Zebra](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Pochi [wallet] ya full node | Zallet, katika beta | [Kitabu cha Zallet](https://zcash.github.io/zallet/) |
| Seva ya pochi nyepesi | Zaino au lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Maktaba za pochi | Crates za librustzcash | [librustzcash](https://github.com/zcash/librustzcash) |
| Simu | SDK za Android na iOS | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Uainishaji | Uainishaji wa itifaki na ZIP | [zips.z.cash](https://zips.z.cash) |

## Node

Node huthibitisha makubaliano [consensus] na kuhifadhi mnyororo [chain]. Kuna utekelezaji mbili zinazoendelezwa kikamilifu.

[Zebra](/zcash-tech/zebra-full-node) ni node ya Zcash Foundation, iliyoandikwa kwa Rust, na ndiyo inayodhaniwa na miongozo mingi sasa. [Kitabu cha Zebra](https://zebra.zfnd.org/) kinaeleza jinsi ya kuisakinisha na kuiendesha, na [hazina](https://github.com/ZcashFoundation/zebra) ndiyo mahali ambapo maendeleo hufanyika.

[Zakura](/zcash-tech/zakura-node) ni node mpya zaidi, iliyoelezwa na waandishi wake kama “full node ya Zcash inayooana na makubaliano, iliyojengwa kwa ajili ya ukubwa”, yenye usawazishaji wa haraka zaidi, upogoaji wa block na hali ya uoanifu ya zcashd. Inaongozwa na Sean Bowe, mwanzilishi mwenza wa Zcash, na Dev Ojha. Ni huria chini ya Apache 2.0 katika [zakura-core/zakura](https://github.com/zakura-core/zakura).

ZecHub ina ukurasa wa [Full Nodes](/zcash-tech/full-nodes) unaoeleza tofauti za kiutendaji kati yao.

## Pochi ya full node

zcashd iliunganisha pochi na node. Pochi hiyo haipo tena, na [Zallet](https://github.com/zcash/zallet) ndiyo mbadala wake. Kitabu cha Zallet kinaieleza kama “pochi ya Zcash full-node iliyoandikwa kwa Rust” inayojengwa “kama mbadala wa pochi ya zcashd”.

Soma onyo la usalama kabla ya kuitegemea. Zallet iko katika beta, “haijapitiwa kikamilifu”, mabadiliko yanayovunja uoanifu “yanaweza kutokea wakati wowote, yakikuhitaji ufute na uunde upya pochi yako ya Zallet”, na bado si kila mbinu ya RPC ya zcashd imehamishwa.

Ikiwa unahamisha usanidi uliopo, ZecHub ina [mwongozo wa uhamishaji kutoka zcashd hadi Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) pamoja na [Zalletrejeleo la haraka](/using-zcash/zallet-quick-reference-guide).

## Seva za pochi nyepesi

Pochi nyingi haziendeshi node. Huzungumza na seva inayohifadhi mnyororo na kurudisha mtazamo finyu wake.

[lightwalletd](https://github.com/zcash/lightwalletd) ni huduma asili, iliyoandikwa kwa Go, inayoelezwa kama “huduma ya nyuma inayotoa kiolesura kinachotumia bendi kwa ufanisi kwa blockchain ya Zcash”. [Zaino](/zcash-tech/zaino) ni kiorodheshi kipya zaidi, kilichoandikwa kwa Rust, na husoma kutoka kwa kithibitishaji kamili badala ya kubeba nakala yake yenyewe ya mnyororo.

Nyaraka za [Itifaki ya Light Client](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) zinaeleza itifaki yenyewe. Ukurasa wa [Node za Lightwallet](/zcash-tech/lightwallet-nodes) unaeleza seva hizi zinaweza na haziwezi kuona nini kuhusu mtumiaji, jambo linalofaa kueleweka kabla ya kuchagua moja.

## Kutengeneza pochi

Kazi nyingi za pochi hufanyika katika crates za Rust chini ya [librustzcash](https://github.com/zcash/librustzcash), ambazo SDK za simu na pochi kadhaa za kompyuta mezani hujengwa juu yake. Kila crate imeandikwa kwenye [docs.rs](https://docs.rs).

| Crate | Kusudi lake |
|:--|:--|
| zcash_client_backend | “API za kuunda light client za Zcash zenye faragha [shielded]”, ikijumuisha usawazishaji na uundaji wa muamala [transaction] |
| zcash_client_sqlite | “Light client ya Zcash inayotegemea SQLite”, tabaka la hifadhi kwa yaliyo hapo juu |
| zcash_keys | “Usimamizi wa funguo na anwani [address] wa Zcash” |
| zcash_primitives | “Utekelezaji wa Rust wa primitivi za Zcash” |
| zcash_protocol | “Vigezo vya mtandao vya itifaki ya Zcash na aina za thamani” |
| orchard | “Itifaki ya muamala wa faragha ya Orchard” |
| sapling-crypto | “Maktaba ya kriptografia kwa ajili ya Zcash Sapling” |
| pczt | “Vifaa [tools] vya kufanya kazi na miamala ya Zcash iliyoundwa kwa sehemu”, vinavyotumika kwa utiaji sahihi wa hardware na vifaa vingi |
| zip321 | URI za maombi ya malipo [payment], kama zilivyoainishwa katika ZIP 321 |

Kwa simu, SDK ya [Android](https://github.com/zcash/zcash-android-wallet-sdk) na [SDK ya iOS](https://github.com/zcash/zcash-swift-wallet-sdk) hufunika maktaba hizo. Hazina ya iOS hapo awali iliitwa ZcashLightClientKit, kwa hiyo viungo na makala za zamani hutumia jina hilo.

## Uainishaji na kriptografia

[Uainishaji wa itifaki](https://zips.z.cash/protocol/protocol.pdf) ndiyo mamlaka ya jinsi Zcash inavyofanya kazi, ikijumuisha [usimbaji wa anwani na funguo](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP](https://zips.z.cash) ndizo mahali ambapo mabadiliko hupendekezwa na kubainishwa, na faharasa inaonyesha zipi ni rasimu na zipi ni za mwisho. Mabadiliko ya makubaliano hutolewa katika maboresho ya mtandao [network upgrades], na ZecHub huyafuatilia kwenye ukurasa wa [Maboresho ya Mtandao](/start-here/network-upgrades).

Kwa kriptografia ya msingi, soma [Kitabu cha halo2](https://zcash.github.io/halo2/index.html) na [Kitabu cha Orchard](https://zcash.github.io/orchard/), pamoja na nyaraka za crate za [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) na [orchard](https://docs.rs/orchard/latest/orchard/). [Kitabu cha FROST](https://frost.zfnd.org/) kinaeleza sahihi [signature] za kizingiti, na ZecHub ina ukurasa wa [FROST](/zcash-tech/frost).

## Testnet

Testnet ni mnyororo tofauti wenye sarafu zisizo na thamani, zinazoitwa TAZ. Zebra na Zakura zote zinaweza kuendeshwa dhidi yake, na [mwongozo wa testnet](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) unaeleza usanidi wa node.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) ni kichunguzi kinachofanya kazi cha block za testnet, chenye mwenzake wa mainnet katika [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/).

Kupata TAZ ndiyo sehemu ngumu, kwa sababu vyanzo vya sarafu za bure [faucets] vilivyounganishwa kutoka nyaraka za zamani vimeacha kujibu. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) ni chanzo cha sarafu za bure kinachoendeshwa na jamii ambacho huendesha “node, pochi na mchimbaji [miner] wake wenyewe”, hulipa “matone ya z2z ya faragha”, na huzuia madai kwa “thibitisho la kazi [proof of work] la kivinjari badala ya mtoa captcha”. Ni huria chini ya MIT. Kisipopatikana, uliza katika Zcash R&D Discord, jambo ambalo nyaraka za Zcash zenyewe zinapendekeza.

## Nyaraka za jumla

[Nyaraka za Zcash](https://zcash.readthedocs.io/en/latest/) bado ndicho chanzo kimoja chenye upana mkubwa zaidi, kikijumuisha dhana za itifaki, ujumuishaji na uchimbaji [mining]. Zisome kwa tahadhari. Zinawekewa matoleo kulingana na zcashd, kwa hiyo baadhi yake zinaeleza node ambayo haiendeshi tena, huku sehemu za itifaki na light client zikibaki muhimu. [Muundo wa Vitisho wa Programu ya Pochi ya Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) uliopo humo unafaa kusomwa kabla ya kubuni chochote kinachogusa faragha [privacy] ya mtumiaji.

Ikiwa wewe ni mpya kwa blockchain kwa ujumla, [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) ndilo pendekezo la kawaida kwa misingi inayoshirikiwa, na linaweza kusomwa lote bila malipo. Halielezi miamala ya faragha.

## Vifaa vingine ambavyo wasanidi programu wametaja

[Arti](https://docs.rs/arti/latest/arti/) ni utekelezaji wa Rust wa Tor, unaotumiwa na zcash_client_backend kuelekeza trafiki ya pochi. [Tailscale](https://github.com/tailscale/tailscale) hutajwa kwa kuunganisha kwenye node unayoendesha mwenyewe. [warp2](https://github.com/hhanh00/warp2) ni utekelezaji wa usawazishaji wa haraka wa Hanh, ingawa haujasasishwa tangu 2023.

## Jamii na matukio

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) ni mahali ambapo maendeleo ya itifaki na pochi hujadiliwa, na [Jukwaa la Jamii la Zcash](https://forum.zcashcommunity.com/) hubeba mapendekezo marefu na mijadala ya usaidizi.

Matokeo ya hivi karibuni ya hackathon yanatoa picha nzuri ya kile watu wanachojenga: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) na [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Rasilimali zilizostaafishwa

Zimehifadhiwa kwa sababu makala za zamani zinaunganisha kwazo, na kwa sababu bado ni rejeleo la jinsi node iliyostaafishwa ilivyofanya kazi. Usianzie hapa.

[Kitabu cha zcashd](https://zcash.github.io/zcash/) na rejeleo la RPC la [zcashd](https://zcash.github.io/rpc/) zinaandika programu iliyofikia [mwisho wa maisha](https://zcash.github.io/zcash/user/end-of-life.html) mwezi Julai 2026. Hazina ya [zcash/zcash](https://github.com/zcash/zcash) imehifadhiwa.

Ikiwa una rasilimali ya kuongeza, au unaona kitu hapa ambacho kimepitwa na wakati, fungua issue au pull request. Timu hazina uwezo kila wakati wa kuweka kila kitu kikiwa cha sasa, na kuripoti ulichokutana nacho husaidia kuelekeza miongozo.

**Ilisasishwa mwisho:** Agosti 2026

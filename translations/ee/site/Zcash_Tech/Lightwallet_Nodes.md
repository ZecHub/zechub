<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Kekeli ƒe Nuŋlɔɖiwo

## Kpɔkplɔyiɖeme

Ame akpa gãtɔ zãa Zcash to gakotoku si me kɔ dzi, si mewɔa blockchain bliboa ƒe kɔpi o. Ke boŋ eƒoa nu kple server si wɔ dɔ ma xoxo. Axa sia ɖe nusiwo server mawo nye, nusiwo woateŋu akpɔ tso ŋuwò kple esiwo womateŋu akpɔ tso ŋuwò o, alesi nàɖo wò kadodoa to Tor dzi, kple alesi nàtrɔ server si wò gakotoku zãna la me.

Kɔmpiutadziɖoɖo eve subɔa gakotoku siwo me kɔ egbea. **lightwalletd** nye subɔsubɔdɔ gbãtɔ, si woŋlɔ ɖe Go me. **Zaino** nye indexer yeye si woŋlɔ ɖe Rust me, si wotu abe zcashd deprecation dɔa ƒe akpa aɖe ene.

## Nusi kekeli gakotoku ƒe dɔwɔƒe wɔna

Gakotoku ƒe dɔwɔƒe si me kɔ la nɔa wò gakotoku kple Zcash blockchain dome eye wònaa wòkpɔa kɔsɔkɔsɔa ƒe bandwidth-efficient. Ewɔa nu etɔ̃ na wò.

Esubɔa xɔtunu siwo le gbadzaa. Le esi teƒe be wòaɖo block blibowo la, eɖoa agbalẽvi sue aɖe si me nusiwo gakotoku hiã be woatsɔ ade dzesi ga si woxe la koe le ɖe eƒe adrɛs si wokpɔ ta na, ade dzesi ga si wozã ɖe eƒe nuŋlɔɖiwo ŋu, eye wòawɔ asitɔtrɔ le eƒe ɖasefowo ŋu.

Eɖoa wò asitsatsa ɖe amewo gbɔ. Ne èɖoe ɖa la, wò gakotokua tsɔa asitsatsa si nèwɔ vɔ la dea asi na server la, eye wòkakanɛ ɖe network la dzi.

Eɖoa kɔsɔkɔsɔ ƒe nyabiasewo ŋu, abe kɔkɔme si li fifia kple fetu ŋuti nyatakaka siwo wò gakotokua hiã ene.

Wò gakotokua gakpɔtɔ wɔa ame ŋutɔ ƒe dɔa le mia gbɔ. Eléa wò safuiwo ɖe asi, eɖea mɔxenuwo me kpɔ be yeake ɖe wò nuŋlɔɖiwo ŋu, eye wòtua asitsatsa ɖe wò mɔ̃a dzi hedea asi ete.

## Nusiwo server la ate ŋu akpɔ kple esiwo mate ŋu akpɔ o

Esiae nye akpa si me vodada le bɔbɔe. Wò safuiwo medzona le wò mɔ̃a dzi gbeɖe o, gake ema mesɔ kple server la ƒe naneke masrɔ̃ tso ŋuwò o.

Nusi ŋu woƒo nu tsoe le afisiae nye... [Zcash gakotoku app ŋɔdzidoname kpɔɖeŋu](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), si sɔ be nàxlẽ bliboe ne ètsɔ ɖe le esia me. Eɖoa futɔ ƒomevi vovovowo ɖi. Amesi le vevie na axa sia enye futɔ si ate ŋu akpɔ ʋuwo ƒe zɔzɔ le wò gakotoku kple internet dome, kple le server kple internet dome. Amesiame si le server la zãm la le nɔnɔme ma ƒe akpa aɖe me le dzɔdzɔme nu, elabena wò gakotokua doa ka kpli wo tẽ.

Dze egɔme kple nusiwo wokpɔ ta na. Le futɔ ɖesiaɖe si le kpɔɖeŋua me, si me amesi gblẽ nu le server la ŋu hã le ŋu la, "mateŋu asrɔ̃ zãla ƒe nya ɣaɣlawo ƒe safuiwo dometɔ aɖeke o (safuiwo zazã, safuiwo kpɔkpɔ, nuku ƒe nyagbe, kple bubuawo)", mateŋu afi wò ga o, eye mateŋu ana nàɖo ga si mèɖoe be yeaɖo ɖa o. Ga home kple nuŋlɔɖi siwo le asitsatsa siwo ŋu wokpɔ ta na bliboe me nɔa nya ɣaɣlawo me.

Emegbe nusiwo womekpɔ ta na o hã li. Afɔku ƒe kpɔɖeŋua yɔ esiawo be wonye gbɔdzɔgbɔdzɔ siwo wonya ɖe futɔ si léa ŋku ɖe ʋuwo ƒe zɔzɔ ŋu:

| Gbɔdzɔgbɔdzɔ | Alesi |
|:--|:--|
| Gblɔ amesi nènye | "Futɔ la nya zãla ƒe IP adrɛs, si ateŋu akplɔ wo ayi zãla ƒe amenyenye ŋutɔŋutɔ gbɔ" |
| Afisi nèle gbɔgblɔ teti | Wò IP didi "le geolocation database me be woatsɔ asɔ kple woƒe teƒe" |
| Ema gbɔgblɔ kple ɣeyiɣi si nèɖo asitsanya si wotsɔ akpoxɔnu ɖo ɖa alo xɔe | Dɔdɔ "zãa bandwidth geɖe wu, si dzena togbɔ be kadodoa nye nya ɣaɣla hã". Kpɔɖeŋua de dzesii be nuwɔna si nye dɔdɔ kple xɔxɔ dzena na server la ŋutɔ |
| Adzɔnu agbɔsɔsɔme si nèwɔ le ɣeyiɣi aɖe megbe xexlẽ | Bandwidth ƒe nɔnɔme mawo ke, siwo wokpɔ le ɣeyiɣi didi aɖe me |
| Spotting fexexe ƒe ɖoɖo siwo gbugbɔna | Kpɔkpɔ ne dɔwɔna dzɔ |
| Dɔwɔwɔ le eŋu nenye be adrɛs aɖe nye tɔwò | Futɔ si nya adrɛs xoxo "ateŋu aɖo ga ɖe adrɛs ma eye wòakpɔe ɖa be bandwidth spikes li hã" tso wò gakotoku me tsɔe vɛ |

Kpɔɖeŋua de dzesii hã be nya dzroa tsɔe be "kakaɖedzi ƒe ƒomedodo aɖe le zãla kple lightwalletd server dɔwɔla dome".

Eyata nya kpui si woagblɔ kpuie anukwaretɔe nye esia. Gakotoku ƒe dɔwɔƒe si me kɔ mate ŋu azã wò ga o, eye mate ŋu axlẽ ga home alo nuŋlɔɖi siwo le wò asitsatsa siwo ŋu wokpɔ ta na o. Nusi wòle nyuie be nàsrɔ̃e nye wò IP adrɛs kple ɣeyiɣi si me nàwɔ dɔ, eye ame eve mawo ne wotsɔ wo katã ƒo ƒu ate ŋu agblɔ nya geɖe tso ame aɖe ŋu. Asitsatsa siwo wotsɔ akpoxɔnu wɔe la kpɔa nusi yia edzi le blockchain la dzi ta. Womeɣlaa wò kadodo kple server la le wo ɖokui si o.

## Mɔzɔzɔ to Tor dzi

Tor gblẽa kadodo si le wò IP adrɛs kple wò gakotoku ƒe ʋuɖoɖo dome, si ɖea dzesidenu sesẽtɔ kekeake si le kplɔ̃ si le etame la ɖa.

Kpekpeɖeŋu le Rust agbalẽdzraɖoƒe siwo dzi Zcash gakotoku geɖe tu ɖo la me. zcash_client_backend de Tor module si wotu ɖe edzi [Arti](https://tpo.pages.torproject.net/core/arti/), Tor ƒe Rust dɔwɔwɔ, ale be gakotoku ate ŋu aɖo mɔ na sync, asitsatsa ƒe gbeƒãɖeɖe kple asixɔxɔ didi to Tor dzi evɔ maɖo Tor asisi ɖe vovo o.

Zaino dɔwɔlawo hã ʋlia nya ma ke, eye woyɔ ŋɔdzidoname ƒe kpɔɖeŋua tẽ: "ehiã be woazã ʋuɖoɖo ƒe ɖoɖo siwo womeyɔ o (abe Nym alo Tor ene) atsɔ atɔtɔ asisiwo ƒe dzedzeme tso Zcash ƒe indexing servers gbɔ".

Le **ZODL** me la, Tor nye ɖoɖo si le Ðoɖo Deŋgɔwo me. Gakotokua ƒe dodo ŋuti nuŋlɔɖiwo fia asi zãlawo ɖe asi kadodo ƒe nɔnɔme "kple Tor ƒe dɔwɔwɔ le Ðoɖo Deŋgɔwo me" ne "wodi be yewoaɖe metadata ƒe ɖeɖefia dzi akpɔtɔ", eye dɔwɔnua gblɔ be yeaʋu Tor hafi agbugbɔ gakotoku aɖe aɖo te, si nye ɣeyiɣi si me IP yeye aɖe abla ɖe gakotoku ŋutinya blibo aɖe ŋu ne menye nenema o.

Nuxlɔ̃ame eve. Tor ɣlaa wò IP ɖe server la, gake metrɔa nusi server la srɔ̃na tso biabia siwo nèwɔ me o. Eye onion routing naa latency kpena ɖe eŋu, eyata syncing xɔa ɣeyiɣi didi wu. Wò ŋutɔ wò server zazã ƒoa asa na kakaɖedzibiabia le mɔ bubu nu, elabena ɣemaɣi la, wòe nye dɔwɔla la.

## Zaino, si nye Rust ƒe xexlẽdzesifiala

[Zaino](/site/Zcash_Tech/Zaino) nye indexer si Zingo ƒe ƒuƒoƒoa ŋlɔ ɖe Rust me, si wotu be wòaxɔ ɖe lightwalletd teƒe abe zcashd deprecation dɔa ƒe akpa aɖe ene. Esubɔa kekeli ƒe asisiwo, asisi blibowo kple block explorers, xlẽa kɔsɔkɔsɔ nyatakaka siwo le "Zebra alo Zcashd blibo validator" si.

Ele ŋgɔyiyi wɔm vevie, eye woɖe eƒe tɔtrɔ 0.7.0 ɖe go le August 2026. Eƒe taɖodzinue nye be yeanɔ megbedede si sɔ kple lightwalletd le afisi wòanya wɔ le, ale be gakotokuwo nate ŋu afia asi edzi evɔ womagbugbɔe aŋlɔe o.

Zaino ŋutɔ ƒe axa le esi si dzi xɔtuɖaŋu ƒe nɔnɔmetatawo le, eyata axa sia ƒo nu tso eƒe akpa si wòwɔna abe kekeli gakotoku ƒe dɔwɔƒe ene ŋu ko.

## Server ƒe xexlẽdzesiwo

The [hosh.zec.kpewo](https://hosh.zec.rocks/zec) dashboard léa ŋku ɖe dutoƒo serverwo kple woƒe lãmesẽ ŋu, eye wònye teƒe si woakpɔ nusi tututu le edzi yim le. [nɔnɔme.zec.kpewo](https://status.zec.rocks/) ɖea subɔsubɔ ƒe nɔnɔme fiana.

Server siwo woŋlɔ ɖe dashboard ma dzi le nyati sia ŋɔŋlɔɣi:

| Server | De dzesiiwo |
|:--|:--|
| zec.kpewo:443 | Woŋlɔ nutome ƒe nuwuƒewo ɖe eƒe axadzi le na.zec.rocks, eu.zec.rocks, ap.zec.rocks kple sa.zec.rocks |
| zec-node.keke ƒe gakotoku.com: 443 | Le Cake Wallet ƒe domenyiŋusẽfianu dzi |
| zec.0xrpc.io: 443 kple edzivɔ | 0xRPC ye le edzi kpɔm, si naa dutoƒo nuwuƒe femaxee na kɔsɔkɔsɔ geɖe eye wòbiaa nudzɔdzɔwo be woatsɔ axe ŋutete |
| zaino.unsafe.zec.rocks:443 | A Zaino instance. Note the hostname, treat it as experimental |
| testnet.zec.kpewo: 443 | Testnet, kple Zaino testnet ƒe kpɔɖeŋu si woŋlɔ ɖe zaino.testnet.unsafe.zec.rocks |

Kpɔ dashboard la ɖa tsɔ wu be nàka ɖe xexlẽdzesi sia dzi. Dɔdzikpɔlawo vaa eye wodzona, eye axa si le abe esia ene tsina.

## Server si le wò gakotokua me tɔtrɔ

Enyo be nàwɔe ne èdi be yeatia dɔwɔla aɖe si dzi nèka ɖo, akaka dɔwɔnawo ɖe dɔwɔƒewo dome, alo nàfia asi ye ŋutɔ tɔ.

Menu ƒe mɔ siwo le ete la sɔ esime wowɔ axa sia yeyee, gake gakotoku ƒe ŋgɔdonyawo ʋãna, eyata bu wo abe aɖaŋuɖoɖo ene tsɔ wu be nàwɔ nu ɖe ​​wo ŋu abe mɔ si sɔ pɛpɛpɛ ene. Di Advanced Settings alo server ƒe tiatia aɖe.

#### ZODL

Tsã la, enye Zashi. Cog si le etame le ɖusime, emegbe Advanced Settings. Tor hã nɔa screen ɖeka ma ke dzi. ZODL hã naa Switch server ƒe mɔ kpui aɖe ne sync ƒe kpododonu tso server la ƒe ɣeyiɣi si do xoxo gbɔ.

#### Ywallet ƒe ŋkɔ

Cog si le etame le ɖusime, emegbe Zcash tab.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo ƒe nya

Hamburger ƒe nuɖuɖu si le miame ƒe dzogoe si le etame, emegbe Settings, emegbe nàʋu ayi anyime.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash ƒe nyawo

Hamburger ƒe nuɖuɖu si le miame ƒe dzogoe si le etame, emegbe Settings, emegbe Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Woɖe screenshots mawo le March 2025 me eye apps la ɖo esiwo woɖe ɖe go tso ɣemaɣi, eyata ɖewohĩ buttons ʋu.

## Wò ŋutɔ tɔwò ƒe duƒuƒu

Tiatia sesẽtɔ kekeakee nye be nànye wò ŋutɔ wò dɔwɔla, si ɖea kakaɖedzi ƒe nyabiasea ɖa keŋkeŋ. Server eveawo siaa nye esiwo woate ŋu aʋu: [lightwalletd](https://github.com/zcash/lightwalletd) le Go kple [Zaino](https://github.com/zingolabs/zaino) le Rust me. Wo ame evea siaa xlẽa nu tso validator blibo aɖe gbɔ, eyata àdi hã [Zebra](/site/Zcash_Tech/Zebra_Full_Node).

## Totoɖeme

Gakotoku siwo me kɔ naa ta si wotsɔ akpoxɔnu wɔe si me disk ƒe teƒe mele o la wò, si nye asitsatsa nyui aɖe. Ðeko nàgblɔ nusi nèle asitsadɔ wɔm la eme nakɔ. Server la mate ŋu axɔ wò ga alo axlẽ wò ga home siwo wokpɔ ta na o, gake ele teƒe nyui aɖe be wòakpɔ wò IP adrɛs kple ɣeyiɣi si nèle asitsadɔ wɔm. Mɔ to Tor dzi, eɖoe koŋ tia wò dɔwɔla, alo nàƒu du na wò ŋutɔ tɔ.

**Wowɔ yeyee zi mamlɛtɔ:** August 2026

#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Dziɖuɖua ƒe Nyatakakadzraɖoƒe](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs nye ŋutegakpɔlawo ƒe ƒuƒoƒo si tsɔ wo ɖokui na be yewoana amegbetɔ ƒe nuteƒekpɔkpɔ nanyo ɖe edzi. Míexɔe se be ele be mɔ̃ɖaŋununya naɖe vi na ameƒomea eye be míakpɔ dzidzedze to kadodo siwo dzi wolɔ̃ ɖo me. Míele dzesi dem kpɔɖeŋu siwo na esia te ŋu dzɔna.

Zingo Lab Cyan wɔa dɔ abe Shielded DAO ene. Míedzraa míaƒe ga ɖo ɖe gaxɔ aɖe si me hamevi ɖesiaɖe ƒe nukpɔkpɔ ƒe safui le. Wozãa ga tso gaxɔa me ne hameviwo da asi ɖe aɖaŋuɖoɖo aɖe dzi.

## Dɔwɔnawo

### Zingo! Gakotoku ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet nye Zcash gakotoku si me nusianu le si wowɔ na ezãla xɔlɔ̃wɔwɔ, togbɔ be nɔnɔme deŋgɔ aɖewo le eme na ezãla siwo de ŋgɔ wu hã. Edoa alɔ tadeaguƒe siwo me kɔ, Sapling kple Ironwood, adrɛsgbalẽ le esi na fexexe enuenu eye wòle gbegbɔgblɔ vovovowo me. Enye gakotoku gbãtɔ si do alɔ Orchard eye wòwɔ NU5 nɔnɔmewo ŋudɔ.

Zingo! nye ŋutete si le esi be wòazã Memo ƒe akpaa atsɔ ana gɔmesese veviwo tso wò asitsatsa ŋu.

Zingo! la li na asitelefonwo kple PC-wo. Àkpɔ nusiwo katã woɖe ɖe go [afi sia](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
API kple test-app si ɖea zcash ƒe dɔwɔwɔ ɖe go na app zazã. Zingolib naa agbalẽdzraɖoƒe na zingo-mobile siaa, kpakple cli dɔwɔɖoɖo si le eme si woyɔna be zingo-cli, sedede-fli ƒe kekeli gakotoku si ƒoa nu kple kɔsɔkɔsɔ ƒe indexer abe [Zaino](/zcash-tech/zaino).

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino nye Rust indexer na Zcash blockchain, si Zingo ƒuƒoƒoa wɔ. Enye indexer si le.. [Z3 ƒe ƒuƒoƒo](/zcash-tech/z3-stack): ewɔa kɔsɔkɔsɔ ŋuti nyatakakawo ƒe index tso a [Zebra](/zcash-tech/zebra-full-node) validator eye wòsubɔa gakotokuwo, anyigbayeyedila, kple asisi bubuwo. Enye mɔ si kplɔe ɖo na lightwalletd.

Zaino naa nu veviwo na kekeli asisiwo siaa, abe gakotokuwo kple dɔwɔɖoɖo siwo mehiã blockchain ŋutinya bliboa o, kple asisiwo alo gakotoku blibowo ene. Edoa alɔ block explorers hã, enaa mɔnukpɔkpɔ be woakpɔ blockchain si wowu enu kple kɔsɔkɔsɔ nyuitɔ kekeake si womewu enu o kple mempool si Zebra full validator kpɔna la siaa.

`zcashd` ɖo eƒe End-of-Support ƒe tɔtrɔ gbɔ le 18 July 2026 dzi le block 3,417,100 eye medoa alɔ Ironwood (NU6.3). Zaino xlẽa Zebra validator aɖe.

###  ZLN (zcash-nutoa me-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Dɔwɔnu siwo dzea Zcash ƒe dɔwɔwɔwo gɔme eye wokpɔa wo dzi. Wozãa esia hena ƒoƒo ɖekae dodokpɔ le:
- kekeli ƒe asisiwo
- index-wo ƒe xexlẽdzesiwo
- kpeɖodzinalawo

Eƒe taɖodzinu enye be yeana dodokpɔ ƒe nɔnɔme si te ŋu trɔna ɖe nɔnɔmewo ŋu ŋutɔ eye wòsẽna na core nodes (validators) abe Zebra, indexers abe Zaino, kple light client wallets abe zingo-cli.

Stack gbãtɔ si wòdze egɔmee nye Zebrad, zainod, kple zcash-devtool. Domenyinu la `zcashd` kple lightwalletd dɔwɔwɔwo nɔa megbe na nusi womedo alɔe o `legacy-stack` feature eye wowɔ ɖoɖo be woaɖe wo ɖa.

Tsɔ kpe ɖe dɔwɔnu siwo woatsɔ adze Zcash kɔsɔkɔsɔ ŋuti nyatakakawo gɔme, adzra wo ɖo, eye woatsɔ wo ade (na mainnet, testnet, kple regtest) ŋu la, wozãa zcash-local-net tso Zaino's dodokpɔ ƒe hatsotso me tsɔ daa Lightwallet RPC dɔwɔna siwo woxɔ ɖe Zaino me kpɔ (kpɔ [Zaino dodokpɔ ƒe nuŋlɔɖiwo](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).

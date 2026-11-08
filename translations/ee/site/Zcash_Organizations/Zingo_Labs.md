#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Nyatakakadzraƒe vevi](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs nye nukpɔla ƒe hatɔ siwo tsɔ wo ɖokui de ameƒomevi ƒe agbenɔnɔ nyuie wɔwɔ me. Míexɔe se be teknɔlɔdzi na na viɖe na amegbetɔwo, eye míenɔa anyi nyuie to nu siwo woƒe lɔlɔ̃ le eme me. Míele ɖoɖowo siwo wɔna be esia anɔ te ŋu dzrom.

Zingo Lab Cyan wɔa dɔ abe ɣaɣla [Shielded] DAO ene. Míetsɔa míatɔwo ɖoa gadzraɖoƒe [treasury] me, afi si hatɔ sia hatɔ si ƒe nukpɔsafui [viewing key] le. Woɖea ga tso gadzraɖoƒe la me ne hatɔwo ɖo vote be woakpe ɖe aɖaŋu aɖe ŋu.

## Dɔwo

### Zingo! gakotoku [Wallet] ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo gakotoku nye Zcash gakotoku si ƒe nɔnɔwo blibo, eye woɖoe be wòasɔ na zãlawo, ke hã eƒe nɔnɔ xɔasi aɖewo le na zãla siwo le ŋgɔ wu. Ekpea ɖe nuwo ƒe ʋuʋuɖi [transparent], Sapling kple Ironwood gaƒuƒoƒo [pools] ŋu, eƒe gaɖoƒe ƒe dzesi [address] ƒe agbalẽ le na fexexe [payments] siwo gagbɔna, eye wòte ŋu akpɔ wo le gbe vovovowo me. Eyae nye gakotoku gbãtɔ si kpe ɖe Orchard ŋu eye wòwɔ NU5 ƒe nɔnɔwo.

Zingo! ƒe nɔnɔ vevi aɖe nye be wòate ŋu azã nya kpui [Memo] ƒe teƒe atsɔ ana nya siwo le vevie ku ɖe wò gaɖoɖo [transactions] ŋu.

Zingo! le mɔ̃ nyuitɔwo kple PCwo dzi. Àkpɔ downloadwo katã le [afi](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
API kple test-app si ɖe zcash ƒe nɔnɔwo fia na appwo be woazã. Zingolib naa library na zingo-mobile, kple cli application si le eme, si woyɔna be zingo-cli, command-line nyatakaka si hiã ƒe gakotoku si doa gbe kple ɖoɖonu [chain] ƒe indexer abe [Zaino](/zcash-tech/zaino) ene.

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino nye Rust indexer na Zcash ƒe gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain], si Zingo ƒe hatɔ la wɔ. Enye indexer si le [Z3 stack](/zcash-tech/z3-stack) me: ekpea ɖe ɖoɖonu ƒe nyatakakawo ŋu tso [Zebra](/zcash-tech/zebra-full-node) validator aɖe gbɔ, eye wòsubɔa gakotokuwo, explorerwo, kple client bubuwo. Enye mɔ si ɖo ta na lightwalletd.

Zaino naa nɔnɔ veviwo na nyatakaka si hiã ƒe mɔ [light clients] siawo, abe gakotokuwo kple application siwo mehiã gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe ŋutinya blibo o ene, kple client blibowo alo gakotokuwo. Ekpea hã ɖe gaɖoɖowo ƒuƒoƒe [block] ƒe explorerwo ŋu, eye wònaa mɔ be woage ɖo gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu si woɖo kpɔ kple ɖoɖonu nyuitɔ si womeɖo kpɔ o kple mempool si Zebra ƒe ɣaɣla dzesi ŋɔŋlɔ blibo [full node] ƒe validator kpɔa dzi la gbɔ.

`zcashd` va ɖo eƒe End-of-Support ƒe dzeɖiƒe le 18 July 2026 le gaɖoɖowo ƒuƒoƒe 3,417,100, eye mekpea ɖe Ironwood (NU6.3) ŋu o. Zaino xlea Zebra ƒe validator.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Dɔwɔnu [tools] ƒe ƒome aɖe si dzea Zcash ƒe processwo gɔme eye wòkpɔa dzi na wo. Wozãa esia na integration testing le nusiwo ƒe ŋgɔyiyi me:
- nyatakaka si hiã ƒe mɔwo
- indexerwo
- validatorwo

Eƒe taɖodzinu nye be wòana testing ƒe teƒe si ate ŋu atrɔ eye wòsesẽ na ɣaɣla dzesi ŋɔŋlɔ [nodes] veviwo (validatorwo) abe Zebra ene, indexerwo abe Zaino ene, kple nyatakaka si hiã ƒe mɔ ƒe gakotokuwo abe zingo-cli ene.

Stack si wòdzea gɔme le gɔmedzedze me nye Zebrad, zainod, kple zcash-devtool. `zcashd` kple lightwalletd ƒe process xoxowo le `legacy-stack` ƒe nɔnɔ si womekpea ɖe ŋu o megbe, eye woɖo ɖe woƒe ɖeɖe ɖa.

Kpuie na dɔwɔnu si dzea, ɖoa ɖe cache me, eye wòloa Zcash ƒe ɖoɖonu ƒe nyatakakawo (na mainnet, testnet, kple regtest), wozãa zcash-local-net tso Zaino ƒe test suite me be woatsɔ akpɔ Lightwallet RPC ƒe subɔsubɔwo siwo le Zaino me (kpɔ [Zaino testing ƒe agbalẽwo](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).

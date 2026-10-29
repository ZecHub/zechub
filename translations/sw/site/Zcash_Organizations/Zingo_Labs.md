#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Tovuti Rasmi](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs ni timu ya watu wenye maono waliojitolea kuboresha uzoefu wa binadamu. Tunaamini kwamba teknolojia inapaswa kuwanufaisha wanadamu na kwamba tunastawi kupitia mwingiliano wa makubaliano. Tunatambua mifumo inayowezesha hili.

Zingo Lab Cyan inafanya kazi kama DAO Iliyolindwa. Tunahifadhi fedha zetu katika hazina ambapo kila mwanachama ana ufunguo wa kuona. Fedha zinatumika kutoka hazina wakati wanachama wanapiga kura kuunga mkono pendekezo.

## Miradi

### Pochi Zingo! ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet ni pochi ya Zcash iliyoangaziwa kikamilifu iliyoundwa kwa ajili ya urahisi wa mtumiaji, ingawa inajumuisha baadhi ya vipengele vya hali ya juu kwa watumiaji wa hali ya juu zaidi. Inasaidia mabwawa ya uwazi, Sapling na Ironwood, ina kitabu cha anwani cha malipo ya mara kwa mara na inapatikana katika lugha mbalimbali. Ilikuwa pochi ya kwanza kusaidia Orchard na kutekeleza miundo ya NU5.

Mojawapo ya sifa kuu za Zingo! ni uwezo wake wa kutumia sehemu ya Memo kutoa maarifa muhimu kuhusu miamala yako.

Zingo! inapatikana kwa vifaa vya mkononi na Kompyuta. Utapata vipakuliwa vyote [hapa](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
API na programu ya majaribio inayofichua utendaji kazi wa zcash kwa matumizi ya programu. Zingolib hutoa maktaba ya zingo-mobile, pamoja na programu ya cli iliyojumuishwa inayoitwa zingo-cli, pochi ya mstari wa amri inayozungumza na kiashiria cha mnyororo kama vile [Zaino](/zcash-tech/zaino).

### Kiashiria cha Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino ni kiashiria cha Rust cha blockchain Zcash, kilichotengenezwa na timu ya Zingo. Ni kiashiria katika [Mrundiko wa Z3](/zcash-tech/z3-stack): huorodhesha data ya mnyororo kutoka kwa [Zebra](/zcash-tech/zebra-full-node) kithibitishaji na huhudumia pochi, wachunguzi, na wateja wengine. Ni njia inayofuata ya lightwalletd.

Zaino hutoa vipengele muhimu kwa wateja wepesi, kama vile pochi na programu ambazo hazihitaji historia kamili ya blockchain, na wateja kamili au pochi. Pia inasaidia wachunguzi wa blockchain, ikitoa ufikiaji wa blockchain iliyokamilishwa na mnyororo bora na mepool isiyokamilishwa inayosimamiwa na kithibitishaji kamili Zebra.

`zcashd` ilifikia kikomo chake cha Mwisho wa Usaidizi mnamo tarehe 18 Julai 2026 katika kitalu namba 3,417,100 na haiungi mkono Ironwood (NU6.3). Zaino inasoma kithibitishaji cha Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Seti ya huduma zinazozindua na kudhibiti michakato ya Zcash. Hii inatumika kwa majaribio ya ujumuishaji katika ukuzaji wa:
- wateja wa taa
- viashiria
- vithibitishaji

Lengo lake ni kutoa mazingira ya majaribio yanayoweza kubadilika na imara kwa nodi kuu (vithibitishaji) kama vile Zebra, viashiria kama Zaino, na pochi nyepesi za wateja kama vile zingo-cli.

Rafu chaguo-msingi inayozindua ni Zebrad, zainod, na zcash-devtool. Urithi `zcashd` na michakato lightwalletd iko nyuma ya isiyoungwa mkono `legacy-stack` kipengele na kimepangwa kuondolewa.

Mbali na kutoa zana za kuanzisha, kuhifadhi, na kupakia data ya mnyororo wa Zcash (kwa mtandao mkuu, testnet, na regtest), zcash-local-net hutumika kutoka kwa seti ya majaribio Zaino's kutathmini huduma za Lightwallet RPC zinazoshikiliwa Zaino (tazama [Hati za majaribio Zaino](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).

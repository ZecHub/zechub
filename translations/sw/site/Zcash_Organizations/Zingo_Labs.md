#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Tovuti Rasmi](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs ni timu ya wenye maono inayojitolea kuboresha uzoefu wa binadamu. Tunaamini kwamba teknolojia inapaswa kunufaisha ubinadamu na kwamba tunastawi kupitia mwingiliano wa hiari. Tunatambua mifumo inayowezesha hili.

Zingo Lab Cyan hufanya kazi kama DAO ya Faragha [Shielded DAO]. Tunahifadhi fedha zetu katika hazina [treasury] ambako kila mwanachama ana ufunguo wa kutazama [view key]. Fedha hutolewa kutoka kwenye hazina wanachama wanapopigia kura kwa niaba ya pendekezo.

## Miradi

### Zingo! Pochi [Wallet] ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet ni pochi yenye vipengele kamili ya Zcash iliyoundwa kwa urahisi wa matumizi, ingawa inajumuisha vipengele vya kina kwa watumiaji wenye ujuzi zaidi. Inaauni mabwawa ya uwazi [transparent], Sapling na Ironwood, ina kitabu cha anwani kwa malipo [payments] yanayorudiwa, na inapatikana katika lugha mbalimbali. Ilikuwa pochi ya kwanza kuunga mkono Orchard na kutekeleza fomati za NU5.

Kimoja cha vipengele vikuu vya Zingo! ni uwezo wake wa kutumia sehemu ya ujumbe [Memo] kutoa maarifa muhimu kuhusu miamala [transactions] yako.

Zingo! inapatikana kwa vifaa vya mkononi na Kompyuta. Utapata vipakuliwa vyote [hapa](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
API na programu ya majaribio inayotoa utendakazi wa zcash kwa matumizi ya programu. Zingolib hutoa maktaba ya zingo-mobile, pamoja na programu ya cli iliyojumuishwa iitwayo zingo-cli, pochi nyepesi ya mstari wa amri inayowasiliana na kiorodheshi cha mnyororo [chain indexer] kama vile [Zaino](/zcash-tech/zaino).

### Kiorodheshi [Indexer] cha Zaino ([GitHub](https://github.com/zingolabs/zaino))
Zaino ni kiorodheshi cha Rust cha blockchain ya Zcash, kilichotengenezwa na timu ya Zingo. Ni kiorodheshi katika [stacki ya Z3](/zcash-tech/z3-stack): Huweka faharasa ya data ya mnyororo kutoka kwa kithibitishaji cha [Zebra](/zcash-tech/zebra-full-node) na huhudumia pochi, vivinjari, na wateja wengine. Ni njia mrithi wa lightwalletd.

Zaino hutoa vipengele muhimu kwa light clients, kama pochi na programu ambazo hazihitaji historia kamili ya blockchain, pamoja na wateja kamili au pochi. Pia inaauni vivinjari vya block, ikitoa ufikiaji wa blockchain iliyokamilishwa na mnyororo bora [best chain] ambao haujakamilishwa pamoja na mempool inayosimamiwa na kithibitishaji kamili [full validator] cha Zebra.

`zcashd` ilifikia kusimamishwa kwa Mwisho wa Usaidizi [End-of-Support] tarehe 18 Julai 2026 katika block 3,417,100 na haiungi mkono Ironwood (NU6.3). Zaino husoma kithibitishaji cha Zebra.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Seti ya vifaa vinavyoanzisha na kusimamia michakato ya Zcash. Hii hutumiwa kwa majaribio ya ujumuishaji katika maendeleo ya:
- light clients
- viorodheshi
- vithibitishaji

Lengo lake ni kutoa mazingira ya majaribio yanayoweza kubadilishwa kwa urahisi na thabiti kwa node za msingi (vithibitishaji) kama Zebra, viorodheshi kama Zaino, na pochi za light client kama zingo-cli.

Stacki chaguomsingi inayozinduliwa ni Zebrad, zainod, na zcash-devtool. Michakato ya urithi ya `zcashd` na lightwalletd iko nyuma ya kipengele cha `legacy-stack` kisichoauniwa na imepangwa kuondolewa.

Mbali na kutoa vifaa vya kuanzisha, kuhifadhi kwenye kashe, na kupakia data ya mnyororo wa Zcash (kwa mainnet, testnet, na regtest), zcash-local-net hutumiwa kutoka kwenye mkusanyiko wa majaribio wa Zaino kutathmini huduma za Lightwallet RPC zinazopangishwa katika Zaino (tazama [Zainonyaraka za majaribio](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).

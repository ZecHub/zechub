# Zaino Kielezo

Zaino ni kielezo cha Rust cha blockchain ya Zcash. Husoma data ya mnyororo kutoka kwa full node ya Zebra na kutoa data zinazohitajika na pochi, vivinjari vya blockchain, vyanzo vya sarafu za bure na huduma nyingine, bila kuifanya Zebra iwajibike kwa kila kielezo kinachohitajika na programu zinazotumia huduma hizo.

## Kwa ufupi

* **Zebra** huthibitisha mnyororo wa Zcash.
* **Zaino** huweka kielezo cha data ya mnyororo ya Zebra na kutoa API za programu zinazotumia huduma hizo.
* **Zallet** ni sehemu ya pochi katika mkusanyiko wa Z3. Katika usanidi wa kawaida wa Z3, Zallet huwasiliana moja kwa moja na Zebra na haihitaji huduma ya pekee ya Zaino.
* Huduma ya pekee ya Zaino ni muhimu waendeshaji wanapohitaji endpoint ya gRPC inayooana na lightwalletd, proksi ya JSON-RPC, au miundombinu ya pochi nyepesi, vivinjari vya blockchain, vyanzo vya sarafu za bure na huduma zinazofanana.
* Zaino ni miundombinu inayotumika, lakini kabla ya kuiendesha katika mazingira ya uzalishaji, waendeshaji wanapaswa kuangalia Zaino rasmi na nyaraka za Z3 ili kupata maelezo ya sasa ya uwekaji.

## Zaino Hufanya Nini

Zaino iko kati ya Zebra na programu za watumiaji. Zebra ni node ya makubaliano: hupakua, huthibitisha na kufuata blockchain ya Zcash. Zaino hutumia Zebra kama chanzo cha data ya mnyororo, kisha huandaa mitazamo yenye faharasa ambayo programu za watumiaji zinaweza kuulizia kwa ufanisi.

Mgawanyo huu huweka majukumu wazi:

| Kipengele | Jukumu |
|:--|:--|
| Zebra | Full node na kithibitishaji |
| Zaino | Kielezo na huduma ya API kwa programu zinazotumia huduma hizo |
| Zallet | Huduma ya pochi |
| lightwalletd | Seva ya zamani ya pochi nyepesi ambayo Zaino imeundwa kuibadilisha au kuikamilisha |

Zaino hutoa utendaji kwa light clients, full clients au pochi, na vivinjari vya block. Hutoa ufikiaji wa mnyororo uliokamilishwa, mnyororo bora ambao bado haujakamilishwa, na data ya mempool inayohifadhiwa na Zebra.

## Jinsi Inavyofanya Kazi Katika Mkusanyiko wa Sasa wa Zcash Stack

Mkusanyiko wa sasa wa Z3 umejengwa kwa kutumia Zebra, Zallet na Zaino za hiari.

Katika uwekaji wa kawaida wa Z3, Zebra na Zallet huendeshwa pamoja. Zallet huwasiliana moja kwa moja na Zebra, kwa hivyo mwendeshaji anayeendesha tu mkusanyiko wa pochi wa ndani hahitaji kuanzisha huduma ya pekee ya Zaino.

Zaino huongezwa mwendeshaji anapotaka kutoa huduma kwa wateja wa nje. Katika Z3, huendeshwa kupitia wasifu wa Compose wa `indexer` na huongeza:

* endpoint ya gRPC inayoendana na lightwalletd kwa light wallet clients
* proksi ya JSON-RPC kwa vivinjari vya blockchain, vyanzo vya sarafu za bure na mifumo saidizi ya huduma
* hifadhidata ya kielezo iliyo tofauti na hali ya mnyororo ya Zebra

Hivyo, Zaino ni muhimu hasa kwa mifumo saidizi ya pochi, waendeshaji wa miundombinu ya umma, vivinjari vya blockchain, vyanzo vya sarafu za bure na wasanidi programu wanaojaribu huduma zinazohitaji data ya mnyororo ya Zcash iliyo na faharasa.

## Zaino na lightwalletd

lightwalletd ndiyo seva asilia ya pochi nyepesi. Zaino ndiyo njia ya mrithi inayotumia Rust kwa jukumu hili. Lengo lake ni kutoa API zinazooana pale inapowezekana ili pochi na huduma ziweze kuhamia bila kuhitaji kuandikwa upya kabisa mara moja.

Hii haimaanishi kwamba kila uwekaji wa lightwalletd tayari umehamia kwenye Zaino. Waendeshaji wanapaswa kuichukulia Zaino kama sehemu ya mkusanyiko wa sasa unaotumia Zebra na kuangalia nyaraka za hivi karibuni za mradi, matoleo na dashibodi za huduma kabla ya kuchagua cha kuendesha.

## Maelezo kwa Waendeshaji

Njia rahisi zaidi ya uwekaji iliyoidhinishwa ni hazina ya Z3. Z3 inajumuisha Zaino kama huduma ya hiari:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Anzisha usanidi wa kawaida wa Z3 kwanza, kisha subiri Zebra isawazishe kabla ya kuanzisha huduma tegemezi kwenye mainnet au testnet.

Zaino hutoa aina mbili za huduma za mtandao. Huduma ya gRPC ndiyo API inayotumiwa na light wallets. Huduma ya JSON-RPC imekusudiwa kwa loopback au mitandao binafsi inayoaminika, isipokuwa kama safu ya nje inatoa ulinzi. Usionyeshe endpoint ya JSON-RPC isiyo na uthibitishaji au usimbaji fiche kwenye intaneti ya umma.

## Baadhi ya michoro inayoonyesha jinsi Zaino inavyofanya kazi

### Zaino Muundo wa Ndani

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino Muundo wa Huduma Inayoendeshwa

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino Muundo wa Mfumo

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Makosa ya Kawaida

**Kuchukulia Zaino kama full node.** Zaino si kithibitishaji. Zebra huthibitisha mnyororo; Zaino huweka faharasa ya data kutoka Zebra.

**Kudhani kwamba kila uwekaji wa Z3 unahitaji Zaino ya pekee.** Zallet inaweza kuwasiliana moja kwa moja na Zebra katika mkusanyiko wa kawaida wa Z3. Anzisha Zaino unapohitaji huduma ya pekee ya kielezo kwa wateja wa nje.

**Kuwasilisha vipengele vilivyopangwa kana kwamba tayari vimewekwa.** Zaino inaendelezwa kikamilifu, kwa hivyo angalia madokezo ya matoleo na nyaraka za sasa kabla ya kueleza kwamba kipengele kinapatikana.

**Kufichua JSON-RPC bila tahadhari.** Kiolesura cha JSON-RPC cha Zaino ni cha loopback au mitandao binafsi inayoaminika, isipokuwa kilindwe na safu nyingine.

## Ninaweza kujifunza zaidi wapi?

* [Zaino hazina ya GitHub](https://github.com/zingolabs/zaino)
* Matoleo ya [Zaino](https://github.com/zingolabs/zaino/releases)
* Nyaraka zilizozalishwa za [Zaino](https://zingolabs.github.io/zaino/)
* [hazina ya uwekaji wa Z3](https://github.com/ZcashFoundation/z3)
* Nyaraka za [Zebra](https://zebra.zfnd.org/)
* Majadiliano ya ruzuku na mradi ya [Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)
* [Zinder](/zcash-tech/zinder), kielezo kingine cha Rust, kutoka kwa Zcash Foundation (alpha)

**Ilisasishwa mwisho:** Agosti 2026

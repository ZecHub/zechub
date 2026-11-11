# Zaino Kiorodheshi

Zaino ni kiorodheshi [indexer] cha Rust kwa blockchain ya Zcash. Husoma data za mnyororo [chain] kutoka kwa full node ya Zebra na kutoa data zinazohitajika na pochi [wallet], vichunguzi, vyanzo vya sarafu za bure [faucets], na huduma nyingine bila kuifanya Zebra yenyewe iwajibike kwa kila faharasa inayowakabili wateja.

## Kwa Ufupi Sana

* **Zebra** huthibitisha mnyororo wa Zcash.
* **Zaino** huorodhesha data za mnyororo wa Zebra na kufichua API zinazowakabili wateja.
* **Zallet** ni sehemu ya pochi katika mfumo wa Z3. Katika usanidi chaguomsingi wa Z3, Zallet huwasiliana na Zebra moja kwa moja na haihitaji huduma huru ya Zaino.
* Huduma huru ya Zaino ni muhimu waendeshaji wanapohitaji kituo cha gRPC kinachooana na lightwalletd, proksi ya JSON-RPC, au miundombinu ya light wallet, vichunguzi, vyanzo vya sarafu za bure, na huduma zinazofanana.
* Zaino ni miundombinu inayotumika, lakini waendeshaji wanapaswa kuangalia nyaraka rasmi za Zaino na Z3 kwa maelezo ya sasa ya usambazaji kabla ya kuiendesha katika uzalishaji.

## Kile Zaino Hufanya

Zaino hukaa kati ya Zebra na programu ya mteja. Zebra ni node ya makubaliano [consensus]: hupakua, huthibitisha, na hufuata blockchain ya Zcash. Zaino hutumia Zebra kama chanzo chake cha data za mnyororo, kisha hutayarisha mitazamo iliyorodheshwa ambayo programu za mteja zinaweza kuuliza kwa ufanisi.

Utenganishaji huu huweka majukumu wazi:

| Kijenzi | Jukumu |
|:--|:--|
| Zebra | Full node na kithibitishaji |
| Zaino | Kiorodheshi na huduma ya API inayowakabili wateja |
| Zallet | Huduma ya pochi |
| lightwalletd | Seva ya zamani ya light wallet ambayo Zaino imeundwa kuibadilisha au kuikamilisha |

Zaino hutoa utendakazi kwa light client, wateja kamili au pochi, na vichunguzi vya block [block explorers]. Hutoa ufikiaji wa mnyororo uliokamilishwa, mnyororo bora ambao haujakamilishwa, na data za mempool zinazoshikiliwa na Zebra.

## Jinsi Inavyoingia Katika Mfumo wa Sasa wa Zcash

Mfumo wa sasa wa Z3 umejengwa kuzunguka Zebra, Zallet, na Zaino ya hiari.

Katika usambazaji chaguomsingi wa Z3, Zebra na Zallet huendeshwa pamoja. Zallet hufikia Zebra moja kwa moja, kwa hivyo mwendeshaji anayeendesha mfumo wa pochi wa ndani pekee hahitaji kuanzisha huduma huru ya Zaino.

Zaino huongezwa mwendeshaji anapotaka kuhudumia wateja wa nje. Katika Z3, huendeshwa nyuma ya wasifu wa Compose wa `indexer` na huongeza:

* kituo cha gRPC kinachooana na lightwalletd kwa wateja wa light wallet
* proksi ya JSON-RPC kwa vichunguzi, vyanzo vya sarafu za bure, na mifumo ya nyuma ya huduma
* hifadhidata ya kiorodheshi tofauti na hali ya mnyororo ya Zebra

Hii hufanya Zaino kuwa muhimu hasa kwa mifumo ya nyuma ya pochi, waendeshaji wa miundombinu ya umma, vichunguzi, vyanzo vya sarafu za bure, na wasanidi programu [developers] wanaojaribu huduma zinazohitaji data za mnyororo wa Zcash zilizoorodheshwa.

## Zaino na lightwalletd

lightwalletd ni seva asili ya light wallet. Zaino ni njia mbadala inayofuata inayotegemea Rust kwa jukumu hili. Lengo lake ni kutoa API zinazooana inapowezekana ili pochi na huduma ziweze kuhamia bila kuandikwa upya kabisa kwa wakati mmoja.

Hii haimaanishi kwamba kila usambazaji wa lightwalletd tayari umehamia kwenye Zaino. Waendeshaji wanapaswa kuchukulia Zaino kama sehemu ya mfumo wa sasa unaotegemea Zebra na kuangalia nyaraka za hivi karibuni za mradi, matoleo, na dashibodi [dashboard] za huduma kabla ya kuchagua cha kuendesha.

## Maelezo kwa Waendeshaji

Njia rahisi yenye mamlaka ya usambazaji ni hazina ya Z3. Z3 inajumuisha Zaino kama huduma ya hiari:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Endesha usanidi wa kawaida wa Z3 kwanza na usubiri Zebra isawazishe kabla ya kuanzisha huduma tegemezi kwenye mainnet au testnet.

Zaino hutoa aina mbili za huduma za mtandao. Huduma ya gRPC ndiyo API inayowakabili lightwallet. Huduma ya JSON-RPC imekusudiwa kwa loopback au mitandao binafsi inayoaminika isipokuwa safu ya nje itoe ulinzi. Usifiche kituo cha JSON-RPC kisicho na uthibitishaji au usimbaji fiche kwenye intaneti ya umma.

## Baadhi ya michoro inayoonyesha jinsi Zaino inavyofanya kazi

### Usanifu wa Ndani wa Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Usanifu wa Huduma Hai wa Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Usanifu wa Mfumo wa Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Makosa ya Kawaida

**Kuchukulia Zaino kama full node.** Zaino si kithibitishaji. Zebra huthibitisha mnyororo; Zaino huorodhesha data kutoka kwa Zebra.

**Kudhani kwamba kila usambazaji wa Z3 unahitaji Zaino huru.** Zallet inaweza kufikia Zebra moja kwa moja katika mfumo chaguomsingi wa Z3. Anzisha Zaino unapohitaji huduma huru ya kiorodheshi kwa wateja wa nje.

**Kuwasilisha vipengele vilivyopangwa kana kwamba tayari vimesambazwa.** Zaino inaendelezwa kikamilifu, kwa hivyo angalia maelezo ya sasa ya toleo na nyaraka kabla ya kueleza kipengele kuwa kinapatikana.

**Kufichua JSON-RPC bila uangalifu.** Kiolesura cha JSON-RPC cha Zaino ni kwa loopback au mitandao binafsi inayoaminika isipokuwa kinalindwa na safu nyingine.

## Ninaweza kujifunza zaidi wapi?

* [Zaino hazina ya GitHub](https://github.com/zingolabs/zaino)
* [matoleo ya Zaino](https://github.com/zingolabs/zaino/releases)
* [nyaraka zilizozalishwa za Zaino](https://zingolabs.github.io/zaino/)
* [hazina ya usambazaji wa Z3](https://github.com/ZcashFoundation/z3)
* [nyaraka za Zebra](https://zebra.zfnd.org/)
* [majadiliano ya ruzuku [grant] na mradi wa Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Ilisasishwa mwisho:** Agosti 2026

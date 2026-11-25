<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Zaino Kielezo

## Kwa ufupi

* **Zebra** huthibitisha mnyororo wa Zcash.
* **Zaino** huweka faharasa ya data ya mnyororo wa Zebra na kutoa API zinazotumiwa na programu za wateja.
* **Zallet** ni kipengele cha pochi katika stack ya Z3. Katika usanidi chaguomsingi wa Z3, Zallet huwasiliana moja kwa moja na Zebra na haihitaji huduma huru ya Zaino.
* Huduma huru ya Zaino ni muhimu pale waendeshaji wanapohitaji endpoint ya gRPC inayooana na lightwalletd, proksi ya JSON-RPC, au miundombinu ya pochi nyepesi, vivinjari vya blockchain, vyanzo vya sarafu za bure na huduma zinazofanana.
* Zaino ni miundombinu inayotumika, lakini waendeshaji wanapaswa kuangalia Zaino rasmi na nyaraka za Z3 kwa maelezo ya sasa ya uwekaji kabla ya kuiendesha katika mazingira ya uzalishaji.

## Maelezo ya Msingi

Zaino ni kielezo cha Rust cha blockchain ya Zcash. Husoma data ya mnyororo kutoka kwa full node ya Zebra. Hutoa data inayohitajika na pochi, vivinjari vya blockchain, vyanzo vya sarafu za bure na huduma nyingine, bila kuifanya Zebra iwajibike kwa kila faharasa inayotumiwa na programu za wateja.

### Kazi ya Zaino

Zaino hukaa kati ya Zebra na programu za wateja. Zebra ni node ya makubaliano: hupakua, huthibitisha na kufuatilia blockchain ya Zcash. Zaino hutumia Zebra kama chanzo cha data ya mnyororo, kisha huandaa mitazamo iliyowekwa faharasa ambayo programu za wateja zinaweza kuiuliza kwa ufanisi.

Mgawanyo huu huweka majukumu wazi:

| Kipengele | Jukumu |
|:--|:--|
| Zebra | Full node na kithibitishaji |
| Zaino | Kielezo na huduma ya API kwa programu za wateja |
| Zallet | Huduma ya pochi |
| lightwalletd | Seva ya zamani ya pochi nyepesi ambayo Zaino imeundwa kuibadilisha au kuikamilisha |

Zaino hutoa utendaji kwa light client, full client au pochi, na vivinjari vya block. Hutoa ufikiaji wa mnyororo uliokamilishwa, mnyororo bora ambao bado haujakamilishwa, na data ya mempool inayohifadhiwa na Zebra.

### Jinsi Inavyolingana na Zcash Stack ya Sasa

Stack ya sasa ya Z3 imejengwa kuzunguka Zebra, Zallet, na Zaino ya hiari.

Katika uwekaji chaguomsingi wa Z3, Zebra na Zallet huendeshwa pamoja. Zallet huwasiliana moja kwa moja na Zebra, kwa hiyo mwendeshaji anayeendesha stack ya ndani ya pochi pekee hahitaji kuanzisha huduma huru ya Zaino.

Zaino huongezwa pale mwendeshaji anapotaka kuhudumia wateja wa nje. Katika Z3, huendeshwa kupitia wasifu wa Compose wa `indexer` na huongeza:

* endpoint ya gRPC inayoendana na lightwalletd kwa wateja wa pochi nyepesi
* proksi ya JSON-RPC kwa vivinjari vya blockchain, vyanzo vya sarafu za bure na mifumo ya nyuma ya huduma
* hifadhidata ya kielezo iliyo tofauti na hali ya mnyororo ya Zebra

Hii hufanya Zaino kuwa muhimu hasa kwa mifumo ya nyuma ya pochi, waendeshaji wa miundombinu ya umma, vivinjari vya blockchain, vyanzo vya sarafu za bure na wasanidi programu wanaojaribu huduma zinazohitaji data ya mnyororo ya Zcash iliyowekwa faharasa.

### Zaino na lightwalletd

lightwalletd ndiyo seva ya awali ya pochi nyepesi. Zaino ndiyo njia mrithi inayotegemea Rust kwa jukumu hili. Lengo lake ni kutoa API zinazooana inapowezekana ili pochi na huduma ziweze kuhamia bila kuandikwa upya kikamilifu mara moja.

Hii haimaanishi kuwa kila uwekaji wa lightwalletd tayari umehamia kwenye Zaino. Waendeshaji wanapaswa kuichukulia Zaino kama sehemu ya stack ya sasa inayotegemea Zebra na kuangalia nyaraka za hivi karibuni za mradi, matoleo na dashibodi za huduma kabla ya kuchagua watakachoendesha.

## Taswira / Mfano

Fikiria blockchain ya Zcash kama jalada kubwa la kurasa za daftari la miamala.

Zebra ndiye mtunza kumbukumbu. Hupokea kila ukurasa mpya, hukagua ikiwa unafuata kanuni, kisha huuweka mahali pake panapofaa.

Zaino ni dawati la marejeo mbele ya jalada. Husoma yaliyowekwa na Zebra, hutengeneza katalogi ili kurahisisha utafutaji, na huwajibu wageni haraka. Pochi nyepesi, vivinjari vya blockchain na vyanzo vya sarafu za bure huja kwenye dawati hili kuuliza maswali kama “kuna nini kwenye block hii?” au “ni miamala ipi inayosubiri kwenye mempool?”. Dawati la marejeo haliamui ni kurasa zipi ni halisi. Jukumu hilo ni la mtunza kumbukumbu.

Zallet, katika usanidi chaguomsingi wa Z3, hufanya kazi katika jengo moja na huenda moja kwa moja kwa mtunza kumbukumbu. Haihitaji dawati la marejeo.

### Baadhi ya michoro inayoonyesha jinsi Zaino inavyofanya kazi

#### Usanifu wa Ndani wa Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Usanifu wa Huduma Inayotumika wa Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Usanifu wa Mfumo wa Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Uchambuzi wa Kina

### Maelezo kwa Waendeshaji

Njia rahisi zaidi ya uwekaji iliyoidhinishwa ni hazina ya Z3. Z3 inajumuisha Zaino kama huduma ya hiari:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Anza kwa kuendesha usanidi wa kawaida wa Z3 na usubiri Zebra isawazishe kabla ya kuanzisha huduma tegemezi kwenye mainnet au testnet.

Zaino hutoa aina mbili za huduma za mtandao. Huduma ya gRPC ndiyo API inayotumiwa na lightwallet. Huduma ya JSON-RPC imekusudiwa kwa loopback au mitandao binafsi inayoaminika, isipokuwa kama safu ya nje inatoa ulinzi. Usiweke hadharani kwenye intaneti endpoint ya JSON-RPC isiyo na uthibitishaji au usimbaji fiche.

## Makosa ya Kawaida

**Kuchukulia Zaino kama full node.** Zaino si kithibitishaji. Zebra huthibitisha mnyororo; Zaino huweka faharasa ya data kutoka kwa Zebra.

**Kudhani kila uwekaji wa Z3 unahitaji Zaino huru.** Zallet inaweza kuwasiliana moja kwa moja na Zebra katika stack chaguomsingi ya Z3. Anzisha Zaino unapohitaji huduma huru ya kielezo kwa wateja wa nje.

**Kuwasilisha vipengele vilivyopangwa kana kwamba tayari vimewekwa.** Zaino inaendelezwa kikamilifu, kwa hiyo angalia maelezo ya sasa ya matoleo na nyaraka kabla ya kueleza kuwa kipengele kinapatikana.

**Kuweka JSON-RPC wazi bila tahadhari.** Kiolesura cha JSON-RPC cha Zaino ni cha loopback au mitandao binafsi inayoaminika, isipokuwa kilindwe na safu nyingine.

## Kurasa Zinazohusiana

- [Nodi za Lightwallet](/zcash-tech/lightwallet-nodes): seva ambazo pochi nyepesi huunganishwa nazo, lightwalletd na Zaino, na jinsi ya kubadilisha kati yake.
- [Zinder](/zcash-tech/zinder), kielezo kingine cha Rust, kutoka kwa Zcash Foundation (alpha)
- [Zebra Full Node](/zcash-tech/zebra-full-node): node ambayo Zaino husoma data yake ya mnyororo kutoka kwayo.
- [Zallet](/zcash-tech/zallet): pochi ya full node katika stack ya Z3.
- [Stack ya Z3](/zcash-tech/z3-stack): Zebra, Zallet na kielezo cha hiari cha Zaino vimefungashwa pamoja.
- [Kiwango cha Utendaji cha Kielezo: Zaino dhidi ya Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): ulinganisho unaoweza kurudiwa wa vielezo viwili vya lightwallet.
- [Full Nodes](/zcash-tech/full-nodes): muhtasari wa programu za full node za Zcash.
- [Zcash Usawazishaji wa Pochi](/zcash-tech/zcash-wallet-syncing): kwa nini pochi za faragha zinahitaji mchakato wa kusawazisha.

### Nyenzo

* [Zaino hazina ya GitHub](https://github.com/zingolabs/zaino)
* matoleo ya [Zaino](https://github.com/zingolabs/zaino/releases)
* nyaraka zilizozalishwa za [Zaino](https://zingolabs.github.io/zaino/)
* hazina ya uwekaji wa Z3[](https://github.com/ZcashFoundation/z3)
* nyaraka za [Zebra](https://zebra.zfnd.org/)
* majadiliano ya ruzuku na mradi ya [Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Ilisasishwa mara ya mwisho:** Novemba 2026

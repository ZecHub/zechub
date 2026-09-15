# Zaino Indexing Kifaa cha Kuonyesha Maonyesho ya Picha

Zaino ni Rust indexer kwa blockchain Zcash. Inasoma data mlolongo kutoka Zebra full node na hutumikia data kwamba pochi, wavumbuzi, bomba, na huduma nyingine haja bila kufanya Zebra yenyewe kuwajibika kwa kila mteja-inakabiliwa index.

## TL;DR

* ** Zebra** inathibitisha mlolongo Zcash.
* ** Zaino** index data Zebra ya mlolongo na inaonyesha API mteja-inakabiliwa.
* ** Zallet** ni mfuko wa fedha sehemu katika Z3 stack. Katika default Z3 kuanzisha, Zallet anaongea kwa Zebra moja kwa moja na hauhitaji kujitegemea Zaino huduma.
* Kujitegemea Zaino huduma ni muhimu wakati waendeshaji haja lightwalletd-ambayo inaendana gRPC mwisho, JSON RPC wakala au miundombinu kwa ajili ya mikoba nyepesi, wavumbuzi, bomba na huduma kama hizo.
* Zaino ni miundombinu hai, lakini waendeshaji wanapaswa kuangalia hati rasmi za Zaino na Z3 kwa maelezo ya sasa ya kupelekwa kabla ya kuifungua katika uzalishaji.

## Zaino Anafanya Nini?

Zaino anakaa kati ya Zebra na programu mteja. zebra ni makubaliano node: inapakua, kuthibitisha, na ifuatavyo Zcash blockchain. zaino inatumia Zebra kama chanzo chake cha data mnyororo, kisha huandaa vielelezo maono kwamba matumizi ya wateja wanaweza kuuliza kwa ufanisi.

Kutenganishwa huko huweka madaraka wazi:

Sehemu ya kazi. Jukumu la kazi.
|:--|:--|
Zebra. Full node na kuthibitisha.
Zaino: Indexer na mteja-mbele API huduma.
Zallet Huduma ya pochi.
 lightwalletd. mzee mwanga mfuko wa fedha server kwamba Zaino ni iliyoundwa na kuchukua nafasi au kuongeza

Zaino hutoa utendaji kwa wateja mwanga, wateja kamili au pochi, na block explorers. Inatoa upatikanaji wa mlolongo finalized, mzunguko bora yasiyo ya mwisho, na mempool data uliofanyika na Zebra.

## Jinsi Inavyofaa Katika Stack ya Zcash Ya Sasa

Z3 ya sasa stack ni kujengwa karibu Zebra, Zallet na Zaino hiari.

Katika default Z3 kupelekwa, Zebra na Zallet kukimbia pamoja. Zallet fika Zebra moja kwa moja, hivyo operator kuendesha tu ndani ya mkoba stack haina haja ya kuanza kujitegemea Zaino huduma.

Zaino ni aliongeza wakati operator anataka kutumikia wateja wa nje. Katika Z3, anaendesha nyuma ya `indexer` Kuandika profile na anaongeza:

* lightwalletd-ambayo inaendana gRPC mwisho kwa wateja mwanga mkoba
* JSON-RPC wakala kwa ajili ya wavumbuzi, bomba na huduma backends
* indexer database tofauti na hali ya mlolongo wa Zebra,

Hii inafanya Zaino hasa muhimu kwa backends mkoba, waendeshaji miundombinu ya umma, wavumbuzi, bomba na watengenezaji huduma za kupima kwamba haja indexed Zcash data mlolongo.

## Zaino na lightwalletd

lightwalletd ni original mwanga mkoba server. Zaino ni Rust-msingi mpenzi njia kwa ajili ya jukumu hili. Lengo lake ni kutoa sambamba APIs ambapo inawezekana hivyo pochi na huduma inaweza kuhamia bila kuwa kikamilifu rewritten mara moja.

Hiyo haina maana kila lightwalletd kupelekwa tayari wakiongozwa na Zaino. Waendeshaji wanapaswa kutibu Zaino kama sehemu ya sasa Zebra-msingi stack na kuangalia karibuni mradi nyaraka, releases, na huduma dashibodi kabla ya kuchagua nini kukimbia.

## Opereta Maelezo

Njia rahisi mamlaka kupelekwa ni Z3 hazina. Z3 inajumuisha Zaino kama huduma ya hiari:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Run kawaida Z3 kuanzisha kwanza na kusubiri kwa Zebra kulandanisha kabla ya kuanza huduma tegemezi juu mainnet au testnet.

Zaino inaonyesha aina mbili za huduma ya mtandao. Huduma gRPC ni lightwallet-inakabiliwa na API. JSON-RPC huduma ni lengo kwa ajili loopback au kuaminiana mitandao binafsi isipokuwa safu nje hutoa ulinzi. Je, si wazi unauthenticated au unencrypted mwisho wa JSON RPC kwenye internet umma.

## Baadhi ya michoro kuonyesha jinsi Zaino kazi

### Zaino Usanifu wa Ndani

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino Live Huduma Usanifu

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino System Usanifu

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Makosa ya Kawaida

**Kutibu Zaino kama full node.** Zaino si validator. Zebra inathibitisha mlolongo; Zaino index data kutoka kwa Zebra.

** Kufikiria kila Z3 kupelekwa mahitaji ya kujitegemea Zaino.** Zallet unaweza kufikia Zebra moja kwa moja katika default Z3 stack. Start Zaino wakati unahitaji huduma standalone indexer kwa wateja wa nje.

**Kutoa vipengele iliyopangwa kama tayari kupelekwa.** Zaino ni kikamilifu maendeleo, hivyo kuangalia sasa kutolewa maelezo na docs kabla ya kuelezea kipengele kama inapatikana.

** Kufunua JSON-RPC carelessly.** Zaino ya interface JSON RPC ni kwa ajili loopback au kuaminiwa mitandao binafsi isipokuwa kulindwa na safu nyingine.

## Ninaweza kupata wapi habari zaidi?

* [Zaino GitHub hazina](https://github.com/zingolabs/zaino)
* [Zaino releases (Kifungu cha habari)](https://github.com/zingolabs/zaino/releases)
* [Zaino kuzalisha nyaraka](https://zingolabs.github.io/zaino/)
* [Z3 kupelekwa kumbukumbu](https://github.com/ZcashFoundation/z3)
* [Nyaraka za Zebra](https://zebra.zfnd.org/)
* [Zaino ruzuku na mjadala wa mradi](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

** Mwisho updated:** Agosti 2026

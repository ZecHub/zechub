# Zcash Testnet

## Zcash Testnet ni nini?

**Zcash Testnet** ni blockchain sambamba na mtandao halisi mkuu wa Zcash (Mainnet) ambao huiga itifaki, sheria, na mantiki halisi ya miamala - lakini ikiwa na tofauti mbili muhimu:

1. **Sarafu hazina thamani halisi ya kifedha** - zinaitwa **TAZ**, si ZEC, na hutumika kwa majaribio pekee. 
2. **Maboresho ya mtandao, zana, na programu hujaribiwa hapa kwanza** kabla ya kutekelezwa kwenye blockchain halisi ya Zcash. 

Kwa maneno mengine, Testnet ni kama **sandbox au mazingira ya majaribio** ambapo watengenezaji, wakaguzi, na wajenzi wanaweza kujaribu mawazo bila kuhatarisha pesa halisi.


## Kwa Nini Testnet Ipo?

Testnet ni muhimu kwa ajili ya maendeleo ya blockchain kwa sababu **blockchain halisi kama Zcash hazibadiliki** - mara tu miamala inapothibitishwa kwenye mtandao mkuu, haiwezi kutenduliwa. Testnet hutoa **nakala salama** ya kujaribu, kujaribu, na kutatua vipengele kabla ya kuvitumia kwenye Mainnet.

### Matumizi ya Testnet

#### 1. Ukuzaji na Ujumuishaji wa Programu

Wasanidi programu wanaojenga pochi, soko la kubadilishana, programu za uchimbaji madini, au zana za faragha wanaweza kuzijaribu kwa usalama kwenye Testnet. Uwezo ni pamoja na:

- Kutuma na kupokea miamala 
- Kuchimba vitalu vipya kwa sarafu za TAZ zisizo na thamani yoyote 
- Kujenga violesura vya mtumiaji na API 
- Kujaribu vipengele vya faragha ya miamala (wazi dhidi ya ulinzi) 

**Mfano:** 
Zana kama [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) tumia Testnet kutengeneza miamala na kujaribu utendaji kazi wa mali iliyolindwa ya Zcash. 

**Hali halisi:** 
Msanidi programu wa pochi anaweza kuunganisha programu kwenye sehemu ya mwisho ya Testnet RPC na kuiga mzunguko mzima wa maisha - kuunda anwani, kutuma miamala iliyolindwa, na kuthibitisha salio - kabla ya kuanza kutumika kwenye Mainnet.

#### 2. Kujaribu Uboreshaji wa Mtandao

Zcash huboresha itifaki yake kuu mara kwa mara (k.m., NU6.1, NU6.2 na Ironwood). Testnet huwasha uboreshaji mpya **kabla ya Mainnet**, hivyo kuruhusu watengenezaji na jamii kutambua na kurekebisha hitilafu.

**Mfano:** 
Sheria mpya ya makubaliano au aina ya muamala husukumwa kwanza hadi Testnet. Baada ya majaribio yaliyofanikiwa, huamilishwa kwenye Mainnet kwa urefu wa block uliopangwa mapema.

#### 3. Utekelezaji wa Nodi za Kujaribu

Zcash's maintained node is **Zebra** (the Rust-based node maintained by the Zcash Foundation) and the maintained wallet is [Zallet](https://github.com/zcash/zallet). `zcashd`, utekelezaji wa nodi asilia, ulifikia kikomo chake cha mwisho wa usaidizi kiotomatiki tarehe 18 Julai 2026 na hauendelezwi tena - tazama [Mwongozo wa uhamiaji wa zcashd hadi Zebra na Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet)Testnet huwezesha upimaji wa nodi katika hali halisi bila hatari ya kifedha.

Wasanidi programu wa nodi wanaweza:

- Thibitisha uenezaji wa vitalu 
- Jaribu violesura vya RPC 
- Angalia tabia ya nodi chini ya mzigo 
- Jaribu mwingiliano wa programu za uchimbaji madini 

#### 4. Kujifunza na Elimu

Waanziaji wanaweza kujifunza vipengele vya Zcash kama vile uchimbaji madini, kuunda miamala iliyolindwa, na kutumia Anwani Zilizounganishwa. 
Mafunzo na nyaraka za jumuiya hutoa ufikiaji wa **mabomba ya Testnet, wachunguzi, na miongozo**.


## Kesi za Matumizi Halisi za Testnet

### 1. Upimaji wa Wasanidi Programu (Pochi / Programu)

- Unganisha kwenye Zcash Testnet 
- Omba TAZ kutoka kwa bomba 
- Tuma miamala iliyolindwa 
- Thibitisha faragha na uthabiti wa kiolesura 

Hakuna ZEC halisi inayopotea hata kama makosa yatatokea.

### 2. Upimaji wa Ujumuishaji wa Exchange

- Endesha nodi ya Testnet 
- Tumia sehemu za mwisho za Zebrad JSON-RPC kusindika miamala 
- Jaribu mantiki ya kuweka/kutoa pesa kiotomatiki 

Huhakikisha kanuni salama ya uzalishaji na kuzuia upotevu wa kifedha.

### 3. Majaribio ya Usanidi wa Uchimbaji Madini

- Tumia violezo vya uchimbaji madini 
- Uthibitishaji wa kizuizi cha jaribio 
- Fuatilia zawadi za uchimbaji madini (TAZ pekee) 
- Rekebisha utendaji wa uchimbaji madini 

Huzuia muda wa mapumziko au mapato yanayopotea wakati wa kuhamia Mainnet.

### 4. Utafiti wa Kitaaluma/Itifaki

Watafiti wanaweza kujaribu uvumbuzi kama vile **uthibitisho usio na takwimu**, **uboreshaji wa uthibitisho wa maarifa**, au majaribio mengine ya itifaki kwa kutumia Testnet. 
Watumiaji wa hali ya juu wanaweza pia kuendesha **Testnets maalum au mazingira ya majaribio ya kawaida** kwa majaribio maalum.


## Tofauti Muhimu Kati ya Mainnet na Testnet

| Kipengele | Mtandao Mkuu | Mtandao wa Majaribio |
|-----------------------|-----------------|--------------------------|
| Thamani ya sarafu | ZEC Halisi | TAZ (hakuna thamani ya fedha) |
| Hatari | Hatari ya kifedha | Salama kwa ajili ya majaribio |
| Maboresho ya itifaki | Uzalishaji | Uanzishaji wa mapema |
| Zawadi za uchimbaji madini | Utoaji halisi | Zawadi ya majaribio pekee |
| Huduma ya mtandao | Miamala ya moja kwa moja | Majaribio na uundaji |

## Dhana Potofu za Kawaida

- **Sarafu za Testnet zina thamani fulani** -> Si kweli, TAZ hazina thamani yoyote. 
- **Kupoteza sarafu za Testnet ni muhimu** -> Si kweli, hakuna thamani halisi inayopotea. 
- **Testnet na Mainnet zinafanana** -> Si kweli, Testnet huwekwa upya mara nyingi na haina usalama wa kiuchumi kama Mainnet.

---

## TAZ ni nini?

**TAZ** ni toleo la Testnet la sarafu za Zcash: 

- Si pesa halisi; haiwezi kubadilishwa kwa ZEC au fiat 
- Inatumika kwa ajili ya majaribio, ukuzaji, na kujifunza 
- Hufuata sheria zote za Zcash: zinaweza kutumwa, kuchimbwa, na kutumika katika anwani zilizolindwa 

**Mfano:** 
Msanidi programu anaweza kutuma TAZ 100 kutoka anwani moja ya Testnet hadi nyingine ili kujaribu kipengele cha pochi bila kuhatarisha ZEC halisi. 

Fikiria TAZ kama **"pesa ya kuchezea" kwa ajili ya Zcash Testnet**.


## Mifereji ya maji ni nini?

**Bomba** ni huduma inayotoa sarafu za TAZ bila malipo kwa ajili ya majaribio:

- Kwa kawaida tovuti au API 
- Watumiaji hutoa anwani ya Testnet; bomba hutuma kiasi kidogo cha TAZ 
- Huepuka hitaji la kuchimba TAZ kwa mikono 

**Mfano:** 
1. Tembelea bomba la Testnet (k.m., [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))  
2. Ingiza anwani yako ya Testnet 
3. Omba TAZ 
4. Pokea TAZ mara moja ili uanze kupima 

**Kwa nini ni muhimu:** 
- Upimaji salama bila kuhatarisha ZEC 
- Upatikanaji kwa wanaoanza na watengenezaji programu 
- Uundaji wa haraka wa pochi, soko la hisa, na programu



## Pochi za Zkool na Zingo!

### Zkool

- Pochi ya akaunti nyingi kwa watumiaji wa hali ya juu wa Zcash 
- Inasaidia misemo ya mbegu, funguo za kutazama, anwani zinazoonekana wazi na zilizolindwa 
- Inaweza kuunganishwa na Mainnet, Testnet, au Regtest kupitia nodi kamili au seva za lightwallet

### Zingo!

- Pochi ya simu inalenga faragha na urahisi 
- Husaidia anwani zilizolindwa na zilizounganishwa 
- Imesasishwa ili kuunga mkono itifaki za Testnet (ikiwa ni pamoja na NU6 Testnet)

## Kuwezesha Testnet katika Pochi

### Pochi ya Zkool

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**Vidokezo:** 
- Pochi inaweza kuwashwa upya inapobadilisha mitandao 
- Akaunti za Mainnet ZEC hazijaathiriwa 
- Tumia seva ya Testnet lightwallet ikiwa imeombwa

### Pochi ya Zingo!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


Mara tu pochi zikiwa zimewezeshwa, zinaweza kutuma na kupokea TAZ, kujaribu miamala iliyolindwa, na kujaribu kwa usalama.


## Baada ya Kuwezesha Testnet

- Miamala hufanya kazi kama Mainnet lakini ikiwa na thamani ya **sifuri TAZ** 
- Miamala iliyolindwa, anwani nyingi, na vipengele vya faragha vinaweza kujaribiwa 
- Wasanidi programu wanaweza kutatua na kujaribu vipengele bila kuhatarisha ZEC halisi


## Muhtasari wa Haraka

- **Zcash Testnet** ni mazingira salama ya sanduku la mchanga kwa ajili ya kujenga, kupima, na kujaribu 
- Mifano ya matumizi: majaribio ya wasanidi programu, majaribio ya nodi, ujumuishaji wa ubadilishanaji, utafiti, na elimu 
- Sarafu za TAZ** zinatumika badala ya ZEC na hazina thamani halisi 
- Testnet ni muhimu kabla ya kusambaza vipengele moja kwa moja kwenye Mainnet

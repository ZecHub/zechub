# Zcash Testnet

## Testnet ya Zcash Ni Nini?

**Zcash Testnet** ni blockchain sambamba na mtandao mkuu halisi wa Zcash (Mainnet) unaorudia itifaki, sheria na mantiki ya miamala [transactions] kwa usahihi kabisa - lakini ukiwa na tofauti mbili kuu:

1. **Sarafu hazina thamani halisi ya kifedha** - zinaitwa **TAZ**, siyo ZEC, na hutumika kwa majaribio pekee.  
2. **Maboresho ya mtandao [network upgrades], vifaa [tools], na programu hujaribiwa hapa kwanza** kabla ya kutekelezwa kwenye blockchain halisi ya Zcash.  

Kwa maneno mengine, Testnet ni kama **mazingira ya majaribio au ya uchunguzi** ambapo wasanidi programu [developers], wakaguzi, na wajenzi wanaweza kujaribu mawazo bila kuhatarisha fedha halisi.


## Kwa Nini Testnet Ipo?

Testnet ni muhimu sana kwa maendeleo ya blockchain kwa sababu **blockchain halisi kama Zcash haiwezi kubadilishwa** - mara miamala inapothibitishwa kwenye mtandao mkuu, haiwezi kutenduliwa. Testnet hutoa **nakala salama** ya kufanyia majaribio, kupima, na kutatua hitilafu za vipengele kabla ya kuvitekeleza kwenye Mainnet.

### Matumizi ya Testnet

#### 1. Maendeleo na Uunganishaji wa Programu

Wasanidi programu wanaojenga pochi [wallets], masoko ya kubadilishana sarafu [exchanges], programu za uchimbaji [mining], au vifaa vya faragha [privacy] wanaweza kuvijaribu kwa usalama kwenye Testnet. Uwezo unajumuisha:

- Kutuma na kupokea miamala  
- Kuchimba block mpya kwa sarafu za TAZ zisizo na thamani  
- Kujenga violesura vya watumiaji na API  
- Kujaribu vipengele vya faragha vya miamala (uwazi [transparent] dhidi ya ya faragha [shielded])  

**Mfano:**  
Vifaa kama [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) hutumia Testnet kutengeneza miamala na kujaribu utendakazi wa mali za faragha wa Zcash.  

**Hali ya matumizi halisi:**  
Msanidi programu wa pochi anaweza kuunganisha programu kwenye mwisho wa RPC wa Testnet na kuiga mzunguko kamili wa maisha - kuunda anwani [addresses], kutuma miamala ya faragha, na kuthibitisha salio - kabla ya kuanza kutumia Mainnet.

#### 2. Kujaribu Maboresho ya Mtandao

Zcash huboresha itifaki yake kuu mara kwa mara (kwa mfano, NU6.1, NU6.2 na Ironwood). Testnet huwasha maboresho mapya **kabla ya Mainnet**, na kuruhusu wasanidi programu na jumuiya kutambua na kurekebisha hitilafu.

**Mfano:**  
Sheria mpya ya makubaliano [consensus] au aina mpya ya muamala husukumwa kwanza kwenye Testnet. Baada ya majaribio yenye mafanikio, huwashwa kwenye Mainnet katika urefu wa block uliopangwa mapema.

#### 3. Kujaribu Utekelezaji wa Node

Node inayotunzwa ya Zcash ni **Zebra** (node inayotegemea Rust inayotunzwa na Zcash Foundation) na pochi inayotunzwa ni [Zallet](https://github.com/zcash/zallet). `zcashd`, utekelezaji wa awali wa node, ulifikia kusimamishwa kwake kiotomatiki kwa mwisho wa usaidizi tarehe 18 Julai 2026 na hautunzwa tena - tazama [zcashd ya kuhamia Zebra na Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet). Testnet huwezesha majaribio ya node katika hali halisi bila hatari ya kifedha.

Wasanidi programu wa node wanaweza:

- Kuthibitisha uenezaji wa block  
- Kujaribu violesura vya RPC  
- Kuchunguza tabia ya node chini ya mzigo  
- Kujaribu mwingiliano wa programu za uchimbaji  

#### 4. Kujifunza na Elimu

Waanzilishi wanaweza kujifunza vipengele vya Zcash kama vile uchimbaji, kuunda miamala ya faragha, na kutumia Anwani Zilizounganishwa.  
Mafunzo na nyaraka za jumuiya hutoa ufikiaji wa **vyanzo vya sarafu za bure vya Testnet, vivinjari, na miongozo**.


## Matumizi Halisi ya Testnet

### 1. Majaribio ya Wasanidi Programu (Pochi / Programu)

- Unganisha kwenye Testnet ya Zcash  
- Omba TAZ kutoka kwenye chanzo cha sarafu za bure  
- Tuma miamala ya faragha  
- Thibitisha faragha na uthabiti wa UI  

Hakuna ZEC halisi inayopotea hata makosa yanapotokea.

### 2. Majaribio ya Uunganishaji wa Soko la Kubadilishana Sarafu

- Endesha node ya Testnet  
- Tumia miisho ya JSON-RPC ya Zebrad kuchakata miamala  
- Jaribu mantiki ya kiotomatiki ya amana/utoaji  

Huhakikisha msimbo salama wa uzalishaji na huzuia hasara ya kifedha.

### 3. Majaribio ya Usanidi wa Uchimbaji

- Tumia violezo vya uchimbaji  
- Jaribu uthibitishaji wa block  
- Chunguza zawadi za uchimbaji (TAZ pekee)  
- Boresha utendaji wa uchimbaji  

Huzuia muda wa kutofanya kazi au mapato yaliyopotea wakati wa kuhamia Mainnet.

### 4. Utafiti wa Kielimu / Itifaki

Watafiti wanaweza kujaribu ubunifu kama **uthibitishaji usio na hali**, **uboreshaji wa thibitisho la maarifa sifuri [zero-knowledge proof]**, au majaribio mengine ya itifaki kwa kutumia Testnet.  
Watumiaji wa hali ya juu wanaweza pia kuendesha **Testnet maalumu au mazingira ya regtest** kwa majaribio mahususi.


## Tofauti Kuu Kati ya Mainnet na Testnet

| Kipengele               | Mainnet           | Testnet                  |
|-----------------------|-----------------|--------------------------|
| Thamani ya sarafu        | ZEC halisi         | TAZ (haina thamani ya kifedha)  |
| Hatari                  | Hatari ya kifedha   | Salama kwa majaribio         |
| Maboresho ya itifaki     | Uzalishaji       | Uwashaji wa mapema         |
| Zawadi za uchimbaji        | Utoaji halisi    | Zawadi ya majaribio pekee         |
| Matumizi ya mtandao       | Miamala ya moja kwa moja| Majaribio na maendeleo  |

## Dhana Potofu za Kawaida

- **Sarafu za Testnet zina thamani** -> Si kweli, TAZ hazina thamani.  
- **Kupoteza sarafu za Testnet kuna athari** -> Si kweli, hakuna thamani halisi inayopotea.  
- **Testnet na Mainnet zinafanana kabisa** -> Si kweli, Testnet huwekwa upya mara nyingi na hailindwi kiuchumi kama Mainnet.

---

## TAZ Ni Nini?

**TAZ** ni toleo la Testnet la sarafu za Zcash:  

- Si fedha halisi; haziwezi kubadilishwa kwa ZEC au fedha za kawaida  
- Hutumika kwa majaribio, maendeleo, na kujifunza  
- Hufuata sheria zote za Zcash: zinaweza kutumwa, kuchimbwa, na kutumika katika anwani za faragha  

**Mfano:**  
Msanidi programu anaweza kutuma TAZ 100 kutoka anwani moja ya Testnet hadi nyingine ili kujaribu kipengele cha pochi bila kuhatarisha ZEC halisi.  

Fikiria TAZ kama **“fedha za kuchezea” kwa Testnet ya Zcash**.


## Vyanzo vya Sarafu za Bure Ni Nini?

**Chanzo cha sarafu za bure [faucet]** ni huduma inayotoa sarafu za TAZ bila malipo kwa ajili ya majaribio:

- Kwa kawaida ni tovuti au API  
- Watumiaji hutoa anwani ya Testnet; chanzo cha sarafu za bure hutuma kiasi kidogo cha TAZ  
- Huondoa hitaji la kuchimba TAZ kwa mkono  

**Mfano:**  
1. Tembelea chanzo cha sarafu za bure cha Testnet (kwa mfano, [fauzec.com](https://fauzec.com/) | [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz/))  
2. Weka anwani yako ya Testnet  
3. Omba TAZ  
4. Pokea TAZ mara moja ili kuanza majaribio  

**Kwa Nini Ni Muhimu:**  
- Majaribio salama bila kuhatarisha ZEC  
- Ufikiaji kwa waanzilishi na wasanidi programu  
- Utengenezaji wa haraka wa pochi, masoko ya kubadilishana sarafu, na programu



## Pochi za Zkool na Zingo!

### Zkool

- Pochi ya akaunti nyingi kwa watumiaji wa hali ya juu wa Zcash  
- Inasaidia maneno ya kurejesha pochi [seed phrases], funguo za kutazama [viewing keys], anwani za uwazi na za faragha  
- Inaweza kuunganisha kwenye Mainnet, Testnet, au Regtest kupitia full node au seva za lightwallet

### Zingo!

- Pochi ya simu inayolenga faragha na urahisi  
- Inasaidia anwani za faragha na zilizounganishwa  
- Imesasishwa kusaidia itifaki za Testnet (ikiwemo Testnet ya NU6)

## Kuwasha Testnet Katika Pochi

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
- Pochi inaweza kuanza upya wakati wa kubadilisha mitandao  
- Akaunti za ZEC za Mainnet haziathiriki  
- Tumia seva ya lightwallet ya Testnet ukiombwa

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


Baada ya kuwashwa, pochi zinaweza kutuma na kupokea TAZ, kujaribu miamala ya faragha, na kufanya majaribio kwa usalama.


## Baada ya Kuwasha Testnet

- Miamala hufanya kazi kama Mainnet lakini kwa **TAZ zisizo na thamani**  
- Miamala ya faragha, anwani nyingi, na vipengele vya faragha vinaweza kujaribiwa  
- Wasanidi programu wanaweza kutatua hitilafu na kujaribu vipengele bila kuhatarisha ZEC halisi


## Muhtasari wa Haraka

- **Testnet ya Zcash** ni mazingira salama ya majaribio ya kujenga, kujaribu, na kufanya uchunguzi  
- Matumizi: majaribio ya wasanidi programu, majaribio ya node, uunganishaji wa soko la kubadilishana sarafu, utafiti, na elimu  
- **Sarafu za TAZ** hutumika badala ya ZEC na hazina thamani halisi  
- Testnet ni muhimu kabla ya kutekeleza vipengele moja kwa moja kwenye Mainnet

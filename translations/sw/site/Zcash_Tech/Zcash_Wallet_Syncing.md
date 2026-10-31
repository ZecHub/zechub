<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ulandanishaji wa pochi [wallet] wa Zcash

## Kwa kifupi

* Kwa sababu miamala ya faragha [shielded transactions] ya Zcash huficha maelezo yake, seva haiwezi kutafuta tu salio la pochi kama inavyoweza kwa sarafu za uwazi [transparent] kama Bitcoin au Ethereum.
* Pochi nyepesi hupakua “block fupi” kutoka kwa seva maalumu (lightwalletd) na husimbua data husika zenyewe kwa funguo zao binafsi.
* Kusimbua na kuchakata block hizo huchukua muda, kwa hivyo pochi hutumia mbinu za ulandanishaji wa haraka zaidi ili kukuwezesha kutumia fedha zako mapema.
* Mbinu mashuhuri: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), na DAGSync inayopendekezwa.
* Mbinu hizi kwa ujumla hubadilisha kumbukumbu ya ziada au nguvu ya uchakataji kwa ulandanishaji wa haraka zaidi.

## Maelezo ya Msingi

### Jinsi ulandanishaji wa Zcash unavyofanya kazi

Zcash hutumia mathibitisho ya maarifa sifuri [zero-knowledge] kuficha maelezo ya muamala kutoka kwa wahusika wasioidhinishwa. Faragha hii hufanya ulandanishaji kuwa mgumu zaidi kwa pochi nyepesi kwa sababu hazihifadhi blockchain nzima ndani ya kifaa na badala yake hutegemea seva kwa taarifa zinazohitajika. Kwa Bitcoin au Ethereum, seva zinaweza kuorodhesha blockchain na kurejesha data ya akaunti haraka. Lakini kwa Zcash, seva haiwezi kuona maelezo ya muamala. Hivyo pochi nyepesi inaweza vipi kusawazisha salio na historia yake bila kupakua na kusimbua blockchain nzima yenyewe?

Zcash hutatua tatizo hili kwa kuchanganya mbinu nyingi. Ina seva maalumu, lightwalletd, inayochuja data kutoka kwa full node na kuweka tu kinachohitajika kwa utambuzi wa miamala. Data hii huitwa block fupi, na ni ndogo zaidi kuliko block za awali. Pochi nyepesi kwanza hupakua block hizi fupi kutoka kwa seva ya lightwalletd na kisha kuzisimbua kwa funguo zao binafsi.

Hata kusimbua na kuchakata block hizi fupi kunaweza kuchukua muda mwingi, hasa kunapokuwa na miamala mingi kwa kila block. Kwa hivyo pochi hutumia mbinu tofauti kuharakisha ulandanishaji na kukuwezesha kutumia fedha zako haraka iwezekanavyo.

## Taswira / Mfano

Fikiria blockchain kama chumba kikubwa cha posta kilichojaa masanduku yaliyofungwa. Kwa sarafu ya uwazi, karani wa chumba cha posta anaweza kusoma lebo na kukuambia mara moja masanduku gani ni yako. Kwa Zcash, lebo zimefichwa — kwa hivyo pochi yako inapaswa kuchukua funguo zake na kukagua masanduku yenyewe kwa utulivu ili kupata yale inayoweza kufungua. Mbinu za ulandanishaji zilizo hapa chini ni mikakati tofauti ya kukagua masanduku hayo kwa haraka zaidi.

## Uchambuzi wa Kina

### Warp Sync

Warp sync ni kipengele cha YWallet kinachoruka hatua za kati za kusimbua na kuchakata kila block fupi, na kwenda moja kwa moja kwenye matokeo ya mwisho.

Ili kufanya hivyo, hutumia hesabu na kriptografia kukokotoa matokeo ya mwisho bila kupitia kila hatua.

Warp sync inaweza kuchakata maelfu ya block kwa sekunde, haraka zaidi kuliko mbinu ya kawaida ya ulandanishaji. Hii inamaanisha kuwa watumiaji wa YWallet wanaweza kufurahia utendaji wa haraka na laini, hata wakiwa na mamia ya maelfu ya miamala na madokezo [notes] yaliyopokelewa katika akaunti zao.

Kando na mbinu hii ya kuruka hatua, YWallet inaweza kuchakata block nyingi kwa wakati mmoja, ikisambaza mzigo kwenye vifaa vyako vinavyopatikana ili kufanya mchakato kuwa wa haraka zaidi.

Soma Zaidi kuhusu [Warp Sync](https://ywallet.app/warp/)

> Warp sync inaelezewa hapa kama mbinu ya ulandanishaji. Ywallet yenyewe haitunzwii tena na haitasasishwa kwa Ironwood, kwa hivyo si pochi ya kusakinisha leo.

### Spend-before-sync

Spend-before-sync ni kipengele kipya katika Zcash Mobile Wallet SDK V2 kinachowawezesha watumiaji kutumia fedha mara moja wanapofungua pochi yao, bila kusubiri ulandanishaji kamili wa pochi. Kipengele hiki huharakisha ugunduzi wa salio linaloweza kutumika la pochi na kuboresha uzoefu wa mtumiaji.

Spend-before-sync hufanya kazi kwa kutumia algoriti ya ulandanishaji wa block fupi inayochakata block kutoka seva ya lightwalletd kwa mpangilio usio wa mstari. Hii inamaanisha kwamba badala ya kusubiri block moja ichakatwe kikamilifu kabla ya kuendelea, pochi zinaweza kutumia kumbukumbu na nguvu ya uchakataji zaidi kidogo kuchanganua sehemu tofauti za blockchain. Kwa kawaida, huchanganua masafa tofauti, zikitafuta miamala mipya huku block za zamani zikishushwa na kuchakatwa. Ikiwa dokezo la hivi karibuni ambalo halijatumika litagunduliwa, litapatikana mara moja.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Iliyotengenezwa na timu ya Zecwallet, Blaze sync ni algoriti ya ulandanishaji kwa pochi nyepesi inayochanganua blockchain kwa kurudi nyuma, ikianzia block ya juu zaidi na ya hivi karibuni zaidi na kuendelea kurudi nyuma.

Hii huwezesha pochi kupata madokezo yaliyotumika kabla ya yale yaliyopokelewa, huku ikifanya madokezo ambayo hayakuwa yametumika hapo awali yapatikane bila kusubiri mchakato mzima wa ulandanishaji ukamilike.

Zaidi ya hayo, hutumia Out-of-Order Sync kwa kutenganisha vipengele vya ulandanishaji kutoka kwa kila kimoja — kupakua block, kufanya usimbuaji wa majaribio, na kusasisha mashahidi — na kuvichakata sambamba. Hii hutumia kumbukumbu na rasilimali zaidi za CPU lakini huongeza kasi ya ulandanishaji kwa X5.

### DAGSync

DAGSync ni algoriti ya ulandanishaji inayopendekezwa inayolenga kuboresha uzoefu wa mtumiaji wa pochi za faragha za Zcash kwa kuharakisha ulandanishaji.

Hutumia [Grafu Elekezi Isiyo na Mizunguko (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) kuwakilisha utegemezi kati ya madokezo, mashahidi, na nullifier katika pochi ya Zcash.

DAG ni muundo wa data unaojumuisha node na kingo, ambapo kila ukingo una mwelekeo unaoonyesha uhusiano kati ya node mbili. DAG haina mizunguko, kumaanisha kuwa hakuna njia ya kuanzia kwenye node na kufuata kingo kurudi kwenye node hiyo hiyo.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Athari za Kivitendo

Kwa kuvutia, mifumo hii yote inalenga kushughulikia maswali yaliyoibuliwa na Zcash Security katika chapisho lake kuhusu [Ujumbe Binafsi Unaoweza Kupanuliwa](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) na uhusiano wake na mifumo ya malipo ya faragha. Baadhi hata huchukua hatua ya ziada ya kupakua data yote ya jumbe kutoka kwenye seva, isipokuwa data inayohusu anwani pekee, na kuongeza faragha kwa gharama ya rasilimali zaidi kidogo.

Pia, Zcash Foundation imekuwa ikichunguza njia mbadala za kuboresha utendaji wa pochi nyepesi. Hivi ndivyo ilivyo kwa [Urejeshaji wa Ujumbe Usiofahamu (OMR)](https://zfnd.org/oblivious-message-retrieval/), muundo ambao foundation imekuwa ikiuchunguza “ili kubaini kama unatoa suluhisho linalowezekana kwa matatizo ya hivi karibuni ya utendaji yaliyoathiri watumiaji wa pochi wa Zcash.”

## Makosa ya Kawaida

**Kudhani seva ya lightwalletd inajua salio lako.** Seva huwasilisha block fupi pekee; pochi yako huzisimbua na kuzitafsiri ndani ya kifaa kwa funguo zako mwenyewe.

**Kusimamisha ulandanishaji mapema sana.** Baadhi ya mbinu hufanya fedha za hivi karibuni zinazoweza kutumika zipatikane kabla ya ulandanishaji kamili kukamilika, lakini historia na madokezo ya zamani huenda bado yanachakatwa.

**Kulinganisha ulandanishaji wa Zcash moja kwa moja na ulandanishaji wa mnyororo wa uwazi.** Njia ya polepole zaidi inaweza kuwa gharama ya kuhifadhi faragha, si kasoro — pochi inafanya kazi ambayo seva ya sarafu ya umma ingefanya kwa kusoma akaunti yako waziwazi.


## Kurasa Zinazohusiana

- [Node za Lightwallet](/zcash-tech/lightwallet-nodes) — miundombinu ya lightwalletd ambayo pochi nyepesi hutegemea.
- [Funguo za kutazama](/zcash-tech/viewing-keys) — funguo ambazo pochi hutumia kugundua na kusimbua madokezo yake yenyewe.
- [Pepper Sync](/zcash-tech/pepper-sync) — mbinu nyingine ya ulandanishaji wa pochi wa Zcash.
- [FROST](/zcash-tech/frost) — mamlaka ya usaini iliyosambazwa kwa ZEC ya faragha.

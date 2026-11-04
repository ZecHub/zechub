<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Maarifa sifuri [Zero Knowledge] dhidi ya Mifumo inayotegemea Chambo [Decoy based Systems]

“Sarafu ya kidijitali hufichua shughuli zako zote za matumizi kwa umma kwa kuwa ni kama Twitter kwenye akaunti yako ya Benki, na hili ni tatizo kubwa linalopaswa kutatuliwa kwa kutumia faragha ya on-chain.” - Ian Miers katika [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Baadhi ya miradi ya crypto imepata kutambuliwa kwa mbinu zake zinazolenga faragha. Zcash inajulikana kwa kutumia Mathibitisho ya Maarifa Sifuri (ZK) kulinda kiasi na anwani za miamala. Monero inajitokeza kwa matumizi yake ya ufichaji wa mtumaji unaotegemea chambo pamoja na mifumo mingine ya usimbaji fiche ili kufikia faragha ya mtumiaji kwenye blockchain.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## Kuelewa Mathibitisho ya ZK na Mifumo Inayotegemea Chambo

Mathibitisho ya Maarifa Sifuri ni mifumo ya kriptografia inayoruhusu upande mmoja (mthibitishaji) kumwonyesha upande mwingine (mhakiki) uhalali wa dai bila kufichua *taarifa zozote za msingi kuhusu dai lenyewe*. Katika muktadha wa Zcash, mathibitisho ya ZK hutumiwa kuthibitisha uhalali wa muamala bila kufichua maelezo ya muamala kama vile MTUMAJI, MPOKEAJI au KIASI cha muamala. 

**Hili huhakikisha kuwa faragha ya mtumiaji inalindwa huku muamala ukibaki wa siri lakini bado ukithibitishwa. Teknolojia hii imeundwa kuhakikisha usiri wa miamala ya kifedha kwenye mtandao wa Zcash.**

Katika mifumo inayotegemea chambo kama vile [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), miamala mingi huunganishwa, na hivyo kufanya iwe changamoto kufuatilia chanzo na mwisho halisi wa fedha. Algoriti huingiza ingizo na matokeo ya chambo katika miamala, pia ikitumia usimbaji fiche wa anwani zinazotumika kama ingizo na kutumia mathibitisho ya Range kuthibitisha kuwa kiasi kilichohamishwa kinaweza kutumika. 

Mbinu hii huficha mkondo wa muamala. Matumizi ya ingizo za chambo hufanya iwe changamoto kwa yeyote anayechanganua blockchain kutambua mtumaji halisi, mpokeaji, au kiasi cha muamala. 

**Dokezo Muhimu**: Mbinu hii ya muamala unaohifadhi faragha ya on-chain bado hufichua wazi ingizo zilizosimbwa fiche za miamala yote ya watumiaji. Metadata kama vile *MTIRIRIKO WA MIAMALA* kati ya watumiaji tofauti kwenye mtandao bado inaweza kukusanywa. Ikiwa mpinzani anashiriki kikamilifu katika kuzalisha miamala kwenye mtandao, hufanya ingizo za chambo za watumiaji wengine zipoteze kutotambulika kwake. 


## Faida za ZK dhidi ya Mifumo Inayotegemea Chambo

Zote mbili Zcash na Monero ni sarafu za kidijitali zinazolenga faragha, lakini hufikia faragha kwa njia tofauti. 

Hizi ni baadhi ya faida za mathibitisho ya maarifa sifuri ya Zcash (ZK) dhidi ya mfumo wa chambo wa Monero:

1) **Selective Disclosure**: Kwa seti ya vipengele vya ZK ya Zcash, watumiaji wana chaguo la kufichua maelezo ya muamala kwa wahusika mahususi [Soma ECC Blogu kuhusu Selective Disclosure](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Katika Zcash, maudhui yaliyosimbwa fiche ya miamala ya faragha huruhusu watu kufichua kwa hiari data kutoka uhamisho mahususi. Zaidi ya hayo, ufunguo wa kutazama unaweza kutolewa ili kufichua miamala yote inayohusishwa na anwani mahususi ya faragha. Kipengele hiki huruhusu uzingatiaji wa kanuni na ukaguzi bila kuhatarisha faragha ya jumla ya mtandao. 

Ingawa algoriti ya chambo ya Monero (sahihi ya pete) husaidia kutoa faragha, haitoi ufichuzi *wa hiari* kwa namna hiyo hiyo.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Mwonekano wa Hiari**: Zcash huruhusu watumiaji kuchagua kati ya miamala ya uwazi (isiyo ya faragha) na ya faragha (ya kibinafsi). Hii inaashiria kwamba Zcash huwapa watumiaji unyumbufu wa kuweka taarifa zao za kifedha kuwa za siri (za faragha) au kuzifanya ziwe za uwazi na zipatikane hadharani, sawa na blockchain nyingine nyingi kama ilivyoelezwa kwenye tovuti rasmi ya [Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Faragha hii ya hiari huruhusu unyumbufu mkubwa zaidi na matumizi yanayohusiana na biashara/mashirika, kwa kuwa miamala fulani inaweza kuhitaji faragha kidogo zaidi kwa uchunguzi wa umma, huku mingine ikinufaika na faragha iliyoimarishwa.


3) **Kikundi cha Kutotambulika**: Kikundi cha kutotambulika cha [anonymity set](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) cha mabwawa ya faragha ya maarifa sifuri kinajumuisha miamala yote ambayo *imewahi* kutokea. Hiki ni kikubwa sana kuliko mbinu nyingine nyingi za on-chain za kufikia miamala isiyoweza kuhusishwa. Dokezo: Hili hutumika tu kwa miamala ndani ya bwawa lilelile la faragha.

Matumizi ya vyambo huongeza kikundi cha kutotambulika. Hata hivyo, mbinu hii hutegemea kabisa idadi ya watumiaji *halisi* kwenye mtandao. 

4) **Hakuna Usanidi Unaoaminika**: Usanidi wa Zcash wa Sprout na Sapling ulitumia ukokotoaji wa wahusika wengi unaojulikana kama “sherehe ya usanidi unaoaminika”. Uboreshaji wa hivi karibuni wa NU5 haukuhitaji imani yoyote katika uadilifu wa usanidi wa sakiti ya maarifa sifuri. [Soma ECC Blogu kuhusu NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Faragha ya Data**: Teknolojia ya [zk-SNARK](https://zechub.wiki/zcash-tech/zk-snarks) inayotumiwa katika mabwawa ya faragha ya Zcash huruhusu usalama ulioimarishwa kwa kiasi kikubwa kwa watumiaji. Kupungua kwa uvujaji wa metadata kwenye on-chain kunamaanisha kwamba watumiaji wako salama dhidi ya wapinzani kama vile wadukuzi wanaowezekana au vyombo vya serikali kandamizi. 

Kuna visa kadhaa ambavyo hitilafu zimetambuliwa katika algoriti ya uteuzi wa chambo ya Monero. Hitilafu hizi zilikuwa na uwezo wa kufichua matumizi ya watumiaji kulingana na ripoti kutoka [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


Kwa muhtasari, jambo muhimu zaidi ni kupunguza au kuondoa uvujaji wa taarifa na data za watumiaji kama ilivyoelezwa na Zooko katika kipindi cha moja kwa moja cha AMA cha [Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***Viungo vya Marejeleo***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/

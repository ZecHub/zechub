<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP & ZK-SNARKS

## Kwa Ufupi

- **zk-SNARKs** = Hoja Fupi Zisizoingiliana za Maarifa Sifuri
- Huwezesha upande mmoja **kuthibitisha kwamba unajua kitu** bila kufichua taarifa yenyewe
- Zcash hutumia zk-SNARKs kuthibitisha kuwa muamala [transaction] ni halali (kiasi sahihi, ingizo ambalo halijatumika) **bila kufichua mtumaji, mpokeaji, au kiasi**
- “Fupi” humaanisha kuwa thibitisho [proof] ni dogo na la haraka kuthibitishwa hata kwa kauli changamani
- Bwawa [pool] la Orchard hutumia Halo 2, mfumo wa zk-SNARK wenye **usanidi unaoaminika [trusted setup] ambao hauhitajiki**

---

## Thibitisho ni Nini?

Mathibitisho ndiyo msingi wa hisabati yote. Thibitisho ni dai au nadharia unayojaribu kuthibitisha pamoja na mfuatano wa derivations unaofanywa kutangaza kwamba nadharia imethibitishwa. Kwa mfano, jumla ya pembe zote katika pembetatu ni 180° inaweza kukaguliwa kwa kujitegemea na mtu yeyote (mthibitishaji).

**Mathibitisho** 

Mthibitishaji ---> Hutoa Dai ---> Mthibitishaji Huchagua ---> Kubali/Kataa 

(Mtoa thibitisho na mthibitishaji wote ni algoriti)

Katika sayansi ya kompyuta, istilahi ya mathibitisho yanayoweza kuthibitishwa kwa ufanisi ni mathibitisho ya NP. Mathibitisho haya mafupi yanaweza kuthibitishwa katika muda wa polinomi. Wazo kuu ni kwamba “Kuna suluhisho kwa nadharia na linawasilishwa kwa mthibitishaji ili kulikagua”


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


Katika lugha ya NP = masharti mawili lazima yatimizwe: 

Ukamilifu: Madai ya kweli yatakubaliwa na mthibitishaji (huwaruhusu watoaji thibitisho waaminifu kufikia uthibitishaji)

Uhalali: Madai ya uongo hayatakuwa na mathibitisho (kwa kila mkakati wa mtoa thibitisho mdanganyifu, hawataweza kuthibitisha usahihi wa dai lisilo sahihi).


### Mathibitisho ya Kuingiliana na ya Kinasibu

**Mwingiliano**: Badala ya kusoma tu thibitisho, mthibitishaji huwasiliana na mtoa thibitisho kwa kupokezana katika raundi kadhaa za ujumbe.

**Unasibishaji**: Maombi ya mthibitishaji kwa mtoa thibitisho huchaguliwa kinasibu, na mtoa thibitisho lazima aweze kujibu kila moja kwa usahihi. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Kwa kutumia mwingiliano na unasibishaji pamoja, inawezekana kuthibitisha dai kwa mthibitishaji asiyejua katika Muda wa Polinomi wa Kinasibu (PPT). 

Je, Mathibitisho ya Kuingiliana yanaweza kuthibitisha kwa ufanisi zaidi ya mathibitisho ya NP?

Mathibitisho ya NP dhidi ya mathibitisho ya IP:

|  Kauli   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  ndiyo      |  ndiyo   |
|    CO-NP     |  hapana       |  ndiyo   |
|    #P        |  hapana       |  ndiyo   |
|    PSPACE    |  hapana       |  ndiyo   |


NP - Kuna suluhisho kwa kauli

CO-NP - Kuthibitisha kuwa hakuna suluhisho kwa kauli

#P - Kuhesabu idadi ya suluhisho zilizopo kwa kauli

PSPACE  - Kuthibitisha ubadilishanaji wa kauli tofauti

### Maarifa Sifuri ni Nini?

Kile ambacho mthibitishaji anaweza kukokotoa baada ya mwingiliano ni sawa na kile ambacho angeweza kuthibitisha kabla yake. Mwingiliano wa raundi nyingi kati ya mtoa thibitisho na mthibitishaji haujaongeza uwezo wa kikokotozi wa mthibitishaji.

**Jaribio la Uigaji Paradigm**

Jaribio hili lipo katika kriptografia yote. Linaonyesha “Mtazamo Halisi” na “Mtazamo Uliigwa”. 

Mtazamo Halisi: Historia zote zinazowezekana za mwingiliano kati ya Mtoa Thibitisho na Mthibitishaji (P,V)

Mtazamo Uliigwa: Mthibitishaji huiga mwingiliano wote unaowezekana kati ya Mtoa Thibitisho na Mthibitishaji 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Kitofautishaji cha muda wa polinomi hujaribu kubaini kama kinatazama mtazamo halisi au uliigwa na huomba sampuli kutoka kwa zote mbili mara kwa mara.

Mitazamo hii miwili husemwa kuwa “haiwezi kutofautishwa kikokotozi” ikiwa kwa algoriti au mikakati yote ya kutofautisha, hata baada ya kupokea idadi ya polinomi ya sampuli kutoka mtazamo halisi au uliigwa, uwezekano ni >1/2. 

**Hoja za Maarifa Sifuri**

Itifaki ya kuingiliana (P,V) ni ya maarifa sifuri ikiwa kuna kiigaji (algoriti) kiasi kwamba kwa kila mthibitishaji wa muda wa polinomi wa kinasibu (wakati nadharia ni sahihi), migawanyo ya uwezekano inayobaini mtazamo halisi kutoka ule uliigwa haiwezi kutofautishwa kikokotozi. 

Itifaki za Kuingiliana zinafaa wakati kuna mthibitishaji mmoja. Mfano unaweza kuwa mkaguzi wa kodi katika programu ya “uthibitisho wa kodi” wa maarifa sifuri.

## SNARK ni Nini?

**Hoja Fupi Isiyoingiliana ya Maarifa**

Ufafanuzi mpana - Thibitisho fupi kwamba kauli ni kweli. Thibitisho lazima liwe fupi na la haraka kuthibitishwa. Katika SNARKS, ujumbe mmoja hutumwa kutoka kwa Mtoa Thibitisho hadi kwa Mthibitishaji. Mthibitishaji anaweza kisha kuchagua kukubali au kukataa. 

Mfano wa kauli: “Ninajua ujumbe (m) kiasi kwamba SHA256(m)=0”

Katika zk-SNARK thibitisho halifichui chochote kuhusu ujumbe (m).

**Polinomi**: Jumla za istilahi zenye konstanti (kama 1,2,3), vigeu (kama x,y,z), na vielelezo vya vigeu (kama x², y³). 

Mfano: “3x² + 8x + 17”

**Saketi ya Kihesabu**: Kielelezo cha kukokotoa polinomi. Kwa ujumla zaidi inaweza kufafanuliwa kama Grafu Elekezi Isiyo na Mzunguko ambapo katika kila nodi ya grafu operesheni ya kihesabu hufanywa. Saketi ina malango ya kujumlisha, malango ya kuzidisha, na baadhi ya malango ya konstanti. Kama vile saketi za Boolean hubeba biti katika nyaya, saketi za kihesabu hubeba nambari kamili.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

Katika mfano huu, mtoa thibitisho anataka kumshawishi mthibitishaji kwamba anajua suluhisho la saketi ya kihesabu.  

**Commitment**: Ili kufanya hivi, mtoa thibitisho ataweka thamani zote (za faragha na za umma) zinazohusishwa na saketi katika commitment. Commitment huficha ingizo zake kwa kutumia fomula ambayo matokeo yake hayawezi kubatilishwa.

Sha256 ni mfano mmoja wa fomula ya hashing ambayo inaweza kutumika katika mpango wa commitment.

Baada ya mtoa thibitisho kuweka commitment kwa thamani hizo, commitment hutumwa kwa mthibitishaji (akiwa na uhakika kwamba hawawezi kufichua thamani zozote za awali). Mtoa thibitisho anaweza kisha kumuonyesha mthibitishaji maarifa ya kila thamani kwenye nodi za grafu. 

**Ubadilishaji wa Fiat-Shamir**

Ili kufanya itifaki kuwa *isiyoingiliana*, mtoa thibitisho hutengeneza unasibishaji (unaotumika kwa changamoto iliyofichwa) kwa niaba ya mthibitishaji akitumia fomula ya kriptografia ya hash. Hii inajulikana kama oracle ya kinasibu. Mtoa thibitisho anaweza kisha kutuma ujumbe mmoja kwa mthibitishaji ambaye anaweza kukagua kuwa ni sahihi. 

Ili kuunda SNARK inayoweza kutumika kwa saketi za jumla, vipengele viwili vinahitajika:

Mpango wa commitment wa kiutendaji: Humruhusu mtoaji commitment kuweka commitment kwa polinomi kwa mfuatano mfupi ambao unaweza kutumiwa na mthibitishaji kuthibitisha tathmini zinazodaiwa za polinomi iliyowekewa commitment.

Oracle ya kuingiliana ya polinomi: Mthibitishaji humwomba mtoa thibitisho (algoriti) kufungua commitment zote katika sehemu mbalimbali anazochagua kwa kutumia mpango wa commitment wa polinomi na hukagua kuwa utambulisho unashikilia kweli kati yake.

**Usanidi**

Taratibu za usanidi humsaidia mthibitishaji kwa kufupisha saketi na kutoa vigezo vya umma. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Aina za usanidi wa uchakataji wa awali**:

Usanidi Unaaminika kwa kila saketi - Huendeshwa mara moja kwa kila saketi. Ni mahususi kwa saketi na unasibishaji wa siri (Common Reference String) lazima ubaki siri + uangamizwe. 

Usanidi ulioathiriwa kwa njia hii unamaanisha kuwa mtoa thibitisho asiye mwaminifu anaweza kuthibitisha kauli za uongo. 

Usanidi Unaaminika lakini wa Jumla - Unahitaji tu kuendesha usanidi unaoaminika mara moja na unaweza kisha kuchakata mapema saketi nyingi kwa njia bainifu. 

Usanidi Wazi (Hauna Usanidi Unaaminika)- Algoriti ya uchakataji wa awali haitumii unasibishaji wowote wa siri. 


**Aina za miundo ya thibitisho la SNARK**:

[Groth16](https://eprint.iacr.org/2016/260): Huhitaji Usanidi Unaaminika lakini huwa na mathibitisho mafupi sana yanayoweza kuthibitishwa haraka.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[PLONK](https://eprint.iacr.org/2019/953): Usanidi Unaaminika wa Jumla.

[DARK](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Hazina Usanidi Unaaminika lakini hutoa mathibitisho marefu kidogo au zinaweza kuchukua muda mrefu zaidi kwa mtoa thibitisho kuendesha. 

SNARKS zinafaa wakati mthibitishaji wengi wanahitajika, kama blockchain kama Zcash au zk-Rollup kama [Aztec](https://docs.aztec.network), ili node nyingi za uthibitishaji zisilazimike kuingiliana kwa raundi kadhaa kwa kila thibitisho. 

## zk-SNARK Zinatekelezwaje katika Zcash?

Kwa ujumla, mathibitisho ya maarifa sifuri ni kifaa cha kutekeleza tabia ya uaminifu katika itifaki bila kufichua taarifa yoyote. 

Zcash ni blockchain ya umma inayowezesha miamala ya faragha. zk-SNARK hutumiwa kuthibitisha kuwa muamala wa faragha ni halali ndani ya kanuni za makubaliano ya mtandao bila kufichua maelezo mengine yoyote kuhusu muamala. 

[Maelezo ya Video](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Katika mhadhara huu Ariel Gabizon anatoa maelezo ya Mti wa Commitment wa Dokezo la Zcash, Tathmini ya Polinomi Kipofu na Changamoto Zilizofichwa Kihomomofia, pamoja na jinsi zinavyotekelezwa kwenye mtandao. 

Soma [kitabu cha Halo2](https://zcash.github.io/halo2/index.html) kwa maelezo zaidi.

## Matumizi Mengine ya Maarifa Sifuri 

zk-SNARKs hutoa manufaa kadhaa katika matumizi mbalimbali tofauti. Hebu tuangalie baadhi ya mifano.

**Uwezo wa Kupanuka**: Hii hufikiwa kwa “Kuhamisha Ukokotoaji”. Hakuna hitaji la lazima la maarifa sifuri kwa mnyororo wa L1 kuthibitisha kazi ya huduma ya off-chain. Miamala si lazima iwe ya faragha kwenye zk-EVM.

Faida ya huduma ya Rollup inayotegemea thibitisho (zk-Rollup) ni kuchakata kundi la mamia/maelfu ya miamala na L1 inaweza kuthibitisha thibitisho fupi kwamba miamala yote ilichakatwa kwa usahihi, ikipanua uwezo wa utendaji wa miamala wa mitandao kwa kigezo cha 100 au 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Uwezo wa Kushirikiana**: Hii hufikiwa kwenye daraja la zk kwa “kufunga” mali kwenye mnyororo chanzo na kuthibitisha kwa mnyororo lengwa kwamba mali zimefungwa (thibitisho la makubaliano).

**Utiifu**: Miradi kama [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) inaweza kuthibitisha kuwa muamala wa faragha unatii sheria za benki za mahali husika bila kufichua maelezo ya muamala. 

**Kupambana na Upotoshaji wa Taarifa**: Miongoni mwa mifano kadhaa nje ya blockchain na sarafu za kidijitali, kuna matumizi ya uzalishaji wa thibitisho kwenye picha ambazo zimechakatwa na vyombo vya habari na habari ili kuwawezesha watazamaji kuthibitisha kwa kujitegemea chanzo cha picha na operesheni zote zilizofanywa juu yake. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Mafunzo Zaidi: 

[Bibliografia ya Maarifa Sifuri - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK za Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 na SNARK zisizo na Usanidi Unaaminika - Sean Bowe kwenye Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Mathibitisho ya Maarifa Sifuri pamoja na Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Mathibitisho ya Maarifa Sifuri ya Kuingiliana - Makala ya Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Mhadhara wa 1: Utangulizi na Historia ya ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Maelezo Rahisi ya Saketi za Kihesabu - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Uwezo wa Kupanuka Unachosha, Faragha Imekufa: Thibitisho za ZK, Zinafaa Kwa Nini?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Kurasa Husika

- [Mabwawa ya Faragha](/using-zcash/shielded-pools) — Jinsi zk-SNARKs zinavyotumiwa katika mabwawa ya thamani ya Zcash
- [Halo](/zcash-tech/halo) — Mfumo wa Zcash wa zk-SNARK unaoondoa usanidi unaoaminika
- [Usalama wa Baada ya Quantum katika Zcash](/zcash-tech/post-quantum-security) - Jinsi hatari za quantum za siku zijazo zinavyohusiana na kriptografia ya Zcash
- [Mali za Faragha za Zcash](/zcash-tech/zcash-shielded-assets) — ZSA zilizojengwa kwa teknolojia ya zk-SNARK
- [ZEC ni Nini na Zcash](/start-here/what-is-zec-and-zcash) — Utangulizi wa Zcash na modeli yake ya faragha
- [Nani Anaweza Kuona Malipo Yako ya Zcash?](/start-here/who-can-see-your-zcash-payment) — Kile kinachobaki hadharani, na kile kinachofichwa na ulinzi wa faragha

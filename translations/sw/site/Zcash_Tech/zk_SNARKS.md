<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZKP na ZK-SNARKS

## TL;DR

- **zk-SNARKs** = Hoja za Maarifa Zisizo na Maarifa Zisizo na Ushirikiano
- Wanaruhusu upande mmoja kuthibitisha kwamba wanajua jambo fulani** bila kufichua taarifa yenyewe
- Zcash hutumia zk-SNARKs kuthibitisha muamala ni halali (kiasi sahihi, ingizo ambazo hazijatumika) **bila kufichua mtumaji, mpokeaji, au kiasi**
- "Succunt" inamaanisha uthibitisho ni mdogo na wa haraka kuthibitishwa hata kwa kauli ngumu
- Bwawa la Orchard hutumia Halo 2, mfumo wa zk-SNARK usiohitaji usanidi unaoaminika**

---

## Uthibitisho ni nini?

Uthibitisho ndio msingi wa hisabati yote. Uthibitisho ni dai au nadharia unayojaribu kuthibitisha na mfuatano wa matokeo yaliyofanywa kutangaza kwamba nadharia imethibitishwa. k.m. pembe zote katika pembetatu jumla ya 180° zinaweza kukaguliwa kwa kujitegemea na mtu yeyote (mthibitishaji).

**Uthibitisho** 

Mtoa Madai ---> Mthibitishaji Anachagua ---> Kubali/Kukataa 

(Kithibitishaji na kithibitishaji vyote ni algoriti)

Katika sayansi ya kompyuta, neno la uthibitisho unaoweza kuthibitishwa kwa ufanisi ni uthibitisho wa NP. Uthibitisho huu mfupi unaweza kuthibitishwa katika wakati wa polinomia. Wazo pana ni "Kuna suluhisho la nadharia na hupitishwa kwa mthibitishaji ili kuiangalia"


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


Katika lugha ya NP = masharti mawili lazima yawepo: 

Ukamilifu: Madai ya kweli yatakubaliwa na mthibitishaji (huruhusu wathibitishaji waaminifu kufikia uthibitisho)

Uthabiti: Madai ya uongo hayatakuwa na uthibitisho (kwa mbinu zote za kuthibitisha udanganyifu, hayataweza kuthibitisha usahihi wa madai yasiyo sahihi).


### Ushahidi Shirikishi na Uwezekano

**Mwingiliano**: Badala ya kusoma tu uthibitisho, mthibitishaji hujishughulisha na mthibitishaji mara kwa mara katika raundi kadhaa za ujumbe.

**Nasibu**: Maombi ya Mthibitishaji ya kuthibitisha ni ya nasibu na mthibitishaji lazima aweze kujibu kwa usahihi kwa kila moja. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Kwa kutumia mwingiliano na utofautishaji pamoja inawezekana kuthibitisha dai la kithibitishaji kipofu katika Wakati wa Polenimu wa Kinachowezekana (PPT). 

Je, Uthibitisho Mwingiliano unaweza kuthibitisha kwa ufanisi zaidi ya uthibitisho wa NP?

Uthibitisho wa NP dhidi ya uthibitisho wa IP:

|  Taarifa   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  ndiyo      |  ndiyo   |
|    CO-NP     |  no       |  ndiyo   |
|    #P        |  no       |  ndiyo   |
|    PSPACE    |  no       |  ndiyo   |


NP - Kuna suluhisho la taarifa

CO-NP - Kuthibitisha kwamba hakuna suluhisho la taarifa

#P - Kuhesabu ni suluhisho ngapi zilizopo kwa taarifa

PSPACE - Kuthibitisha mbadala wa kauli tofauti

### Maarifa Zero ni nini?

Kile ambacho mthibitishaji anaweza kuhesabu baada ya mwingiliano ni sawa na kile ambacho angeweza kuthibitisha hapo awali. Mwingiliano katika raundi nyingi kati ya mthibitishaji na mthibitishaji haujaongeza nguvu ya hesabu ya mthibitishaji.

**The Simulation Paradigm**

Jaribio hili lipo katika usimbaji fiche. Linatoa "Mwonekano Halisi" na "Mwonekano Ulioigwa". 

Mtazamo Halisi: Historia zote zinazowezekana za mwingiliano kati ya Prover na Verifier (P,V)

Mwonekano Ulioigwa: Kithibitishaji huiga mwingiliano wote unaowezekana kati ya Prover na Kithibitishaji 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Kitofautishi cha wakati wa polinomia hujaribu kubaini kama wanaangalia mwonekano halisi au ulioigwa na kuomba sampuli kutoka kwa wote wawili mara kwa mara.

Mitazamo hiyo miwili inasemekana kuwa "haiwezi kutofautishwa kihesabu" ikiwa kwa algoriti/mikakati yote ya kutofautisha, hata baada ya kupokea idadi ya sampuli za polinomia kutoka kwa halisi au zilizoigwa, uwezekano ni >1/2. 

**Hoja za Maarifa Bila Maarifa**

Itifaki shirikishi (P,V) haina ujuzi wowote ikiwa kuna kiigaji (algorithimu) kiasi kwamba kwa kila kithibitishaji cha wakati wa polinomiali cha uwezekano (wakati nadharia ni sahihi), mgawanyo wa uwezekano unaoamua halisi kutoka kwa mwonekano ulioigwa hauwezi kutofautishwa kwa hesabu. 

Itifaki shirikishi ni muhimu wakati kuna kithibitishaji kimoja. Mfano ungekuwa mkaguzi wa kodi katika ombi la 'uthibitisho wa kodi' ambalo halijui chochote.

## SNARK ni nini?

**Hoja Fupi Isiyohusisha Maarifa**

Ufafanuzi mpana - Uthibitisho mfupi kwamba taarifa ni kweli. Uthibitisho lazima uwe mfupi na wa haraka ili kuthibitisha. Katika SNARKS ujumbe mmoja hutumwa kutoka kwa Prover hadi Verifier. Kisha verifier anaweza kuchagua kukubali au kukataa. 

kauli ya mfano: "Ninajua ujumbe (m) kiasi kwamba SHA256(m)=0"

Katika zk-SNARK uthibitisho hauonyeshi chochote kuhusu ujumbe (m).

**Polini**: Jumla ya maneno yenye kigezo kisichobadilika (kama vile 1,2,3), vigezo (kama vile x,y,z), na vielelezo vya vigezo (kama vile x², y³). 

mfano: "3x² + 8x + 17"

**Mzunguko wa Hesabu**: Mfano wa kuhesabu polinomiali. Kwa ujumla zaidi inaweza kufafanuliwa kama Grafu ya Acyclic Iliyoelekezwa ambayo katika kila nodi ya grafu operesheni ya hesabu hufanywa. Mzunguko huu una milango ya kuongeza, milango ya kuzidisha na milango mingine isiyobadilika. Kwa njia ile ile saketi za Boolean hubeba biti kwenye waya, saketi za Hesabu hubeba nambari kamili.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

Katika mfano huu, mthibitishaji anataka kumshawishi mthibitishaji kwamba anajua suluhisho la saketi ya hesabu. 

**Ahadi**: Ili kufanya hivi, kipimaji kitaweka thamani zote (za kibinafsi na za umma) zinazohusiana na saketi katika ahadi. Ahadi huficha ingizo zao kwa kutumia chaguo ambalo matokeo yake hayawezi kurekebishwa.

Sha256 ni mfano mmoja wa chaguo la kukokotoa la hashing ambalo linaweza kutumika katika mpango wa ahadi.

Baada ya mthibitishaji kujitolea kwa thamani, ahadi hizo hutumwa kwa mthibitishaji (akiwa na uhakika kwamba hawezi kufichua thamani yoyote ya asili). Kisha mthibitishaji anaweza kuonyesha kwa mthibitishaji ujuzi wa kila thamani kwenye nodi za grafu. 

**Fiat-Shamir Transform**

Ili kufanya itifaki *isiyoingiliana*, kithibitisha hutoa nasibu (inayotumika kwa changamoto iliyofichwa) kwa niaba ya kithibitishaji kwa kutumia kitendakazi cha hashi cha kriptografia. Hii inajulikana kama oracle ya nasibu. Kithibitishaji kinaweza kutuma ujumbe mmoja kwa kithibitishaji ambaye anaweza kisha kuthibitisha kuwa ni sahihi. 

Ili kuunda SNARK ambayo inaweza kutumika kwa mizunguko ya jumla, vipengele viwili vinahitajika:

Mpango wa kujitolea kwa utendaji kazi: Humruhusu mtoa ahadi kujitolea kwa polinomiali yenye mfuatano mfupi ambao unaweza kutumiwa na mthibitishaji kuthibitisha tathmini zinazodaiwa za polinomiali iliyoahidiwa.

Oracle shirikishi ya polinomial: Kithibitishaji kinamuuliza prover (algorithimu) kufungua ahadi zote katika sehemu mbalimbali wanazochagua kwa kutumia mpango wa ahadi ya polinomial na huangalia utambulisho unabaki kuwa kweli kati yao.

**Kuweka**

Taratibu za usanidi husaidia kithibitishaji kwa kufupisha saketi na kutoa vigezo vya umma. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Aina za usanidi wa usindikaji wa awali**:

Usanidi Unaoaminika kwa kila saketi - Huendeshwa mara moja kwa kila saketi. Ni sambamba na saketi na utofauti wa siri (Kamba ya Marejeleo ya Kawaida) lazima iwekwe siri + iharibiwe. 

Mpangilio wa udanganyifu katika njia hii unamaanisha kuwa mtoa ushahidi asiye mwaminifu anaweza kuthibitisha kauli za uongo. 

Usanidi Unaoaminika Lakini wa Jumla - Lazima uendesha usanidi unaoaminika mara moja tu na kisha unaweza kusindika saketi nyingi mapema. 

Usanidi Uwazi (Hakuna Usanidi Unaoaminika)- Algoriti ya usindikaji wa awali haitumii nasibu yoyote ya siri hata kidogo. 


**Aina za miundo isiyoweza kuathiriwa na SNARK**:

[Groth16](https://eprint.iacr.org/2016/260): Inahitaji Usanidi Unaoaminika lakini ina uthibitisho mfupi sana ambao unaweza kuthibitishwa haraka.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://eprint.iacr.org/2019/953): Usanidi Unaoaminika Ulimwenguni.

[GIZA](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[NYOTA](https://www.youtube.com/watch?v=wFZ_YIetK1o): Hakuna Usanidi Unaoaminika lakini hutoa uthibitisho mrefu kidogo au inaweza kuchukua muda mrefu kwa prover kufanya kazi. 

SNARKS ni muhimu wakati vithibitishaji vingi vinahitajika kama vile blockchain kama Zcash au zk-Rollup kama vile [Azteki](https://docs.aztec.network) ili nodi nyingi zinazothibitisha zisilazimike kuingiliana katika raundi kadhaa na kila uthibitisho. 

## zk-SNARK's zinatekelezwaje katika Zcash?

Kwa ujumla uthibitisho wa kutojua chochote ni chombo cha kutekeleza tabia ya uaminifu katika itifaki bila kufichua taarifa yoyote. 

Zcash ni blockchain ya umma inayowezesha miamala ya kibinafsi. zk-SNARK's hutumika kuthibitisha kwamba muamala wa kibinafsi ni halali ndani ya sheria za makubaliano ya mtandao bila kufichua maelezo mengine yoyote kuhusu muamala huo. 

[Kielezi cha Video](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Katika hotuba hii Ariel Gabizon anatoa maelezo ya Mti wa Kujitolea Zcash Note, Tathmini ya Polynomial Isiyoonekana na Changamoto Zilizofichwa kwa Homomorphically na jinsi zinavyotekelezwa kwenye mtandao. 

Soma [Kitabu cha Halo2](https://zcash.github.io/halo2/index.html) kwa maelezo zaidi.

## Matumizi Mengine ya Zero-Knowledge 

zk-SNARKs hutoa faida kadhaa katika matumizi mbalimbali. Hebu tuangalie mifano kadhaa.

**Uwezo wa Kupanuka**: Hili linafanikiwa kwa 'Ukopaji wa Huduma kwa Wateja wa Nje'. Hakuna haja kali ya kutojua chochote kwa mnyororo wa L1 ili kuthibitisha kazi ya huduma isiyo ya mnyororo. Miamala si lazima iwe ya faragha kwenye zk-EVM.

Faida ya huduma ya Rollup (zk-Rollup) inayotegemea uthibitisho ni kusindika kundi la miamala mamia/maelfu na L1 inaweza kuthibitisha uthibitisho mfupi kwamba miamala yote ilishughulikiwa kwa usahihi, na kuongeza kiwango cha muamala wa mitandao kwa kiwango cha 100 au 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Ushirikiano**: Hili linafanikiwa kwenye Daraja la zk kwa 'kufunga' mali kwenye mnyororo chanzo na kuthibitisha kwa mnyororo lengwa kwamba mali zimefungwa (uthibitisho wa makubaliano).

**Utiifu**: Miradi kama vile [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) wanaweza kuthibitisha kwamba muamala wa kibinafsi unafuata sheria za benki za ndani bila kufichua maelezo ya muamala huo. 

**Kupambana na Taarifa Potofu**: Miongoni mwa mifano kadhaa nje ya blockchain na sarafu ya kidijitali, matumizi ya uundaji wa ushahidi kwenye picha ambazo zimeshughulikiwa na vyombo vya habari na vyombo vya habari ili kuwawezesha watazamaji kuthibitisha kwa uhuru chanzo cha picha na shughuli zote zinazofanywa juu yake. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Kujifunza Zaidi: 

[Marejeleo ya Maarifa Yenye Sifuri - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK akiwa na Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 na SNARKs bila Mipangilio Inayoaminika - Sean Bowe kwenye maabara ya Dystopia](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Uthibitisho wa maarifa sifuri na Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Uthibitisho Shirikishi wa Maarifa ya Zero - Makala ya Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Hotuba ya 1: Utangulizi na Historia ya ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Maelezo Rahisi ya Mizunguko ya Hesabu - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Uwezo wa Kupanuka Unachosha, Faragha Imekufa: Ushahidi wa ZK, Je, Zina Faida kwa Nini?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Kurasa Zinazohusiana

- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools) — Jinsi zk-SNARKs zinavyotumika katika mabwawa ya thamani Zcash
- [Halo](/zcash-tech/halo) — Mfumo wa zk-SNARK Zcash's unaoondoa mipangilio inayoaminika
- [Usalama wa Baada ya Quantum huko Zcash](/zcash-tech/post-quantum-security) - Jinsi hatari za quantum za baadaye zinavyohusiana na usimbaji fiche Zcash
- [Mali Zilizolindwa za Zcash](/zcash-tech/zcash-shielded-assets) — ZSA zilizojengwa kwa teknolojia ya zk-SNARK
- [ZEC na Zcash ni nini?](/start-here/what-is-zec-and-zcash) — Utangulizi wa Zcash na mfumo wake wa faragha
- [Nani Anaweza Kuona Malipo Yako Zcash?](/start-here/who-can-see-your-zcash-payment) — Ni nini kinachobaki hadharani, na ni nini kinga huficha

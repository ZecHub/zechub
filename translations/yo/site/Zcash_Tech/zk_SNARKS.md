<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn ZKP àti ZK-SNARKS

## TL;DR

- **zk-SNARKs** = Àwọn Àríyànjiyàn Ìmọ̀ Tí Kò Ní Ìbáṣepọ̀ Pẹ̀lú Òye
- Wọ́n jẹ́ kí ẹgbẹ́ kan **jẹ́rìí pé wọ́n mọ nǹkan kan** láìfi ìwífún náà hàn fúnra rẹ̀
- Zcash nlo zk-SNARKs lati fihan pe iṣowo kan wulo (awọn iye to tọ, awọn titẹ sii ti a ko lo) **laisi ifihan oluranṣẹ, olugba, tabi iye**
- "Succinct" túmọ̀ sí pé ẹ̀rí náà kéré, ó sì yára láti jẹ́rìí, kódà fún àwọn gbólóhùn tó díjú
- Adágún Orchard náà ń lo Halo 2, ètò zk-SNARK kan tí kò ní ètò ìgbẹ́kẹ̀lé kankan**

---

## Kí ni Ẹ̀rí?

Àwọn ẹ̀rí ni ìpìlẹ̀ fún gbogbo ìmọ̀ ìṣirò. Ẹ̀rí jẹ́ ẹ̀tọ́ tàbí ẹ̀kọ́ tí o ń gbìyànjú láti fi hàn & ìtẹ̀lé àwọn ìyọrísí tí a ṣe láti fi hàn pé ẹ̀kọ́ náà ti jẹ́rìí sí. Fún àpẹẹrẹ, gbogbo àwọn igun nínú onígun mẹ́ta tí ó ní àpapọ̀ 180° ni ẹnikẹ́ni lè ṣàyẹ̀wò fúnra rẹ̀ (olùwádìí).

**Àwọn ẹ̀rí** 

Prover ---> Sọ Ẹ̀tọ́ ---> Olùdánilójú Yàn ---> Gba/Kọ 

(Àwọn algoridimu ni olùdánilójú àti olùdánilójú)

Nínú ìmọ̀ sáyẹ́ǹsì kọ̀ǹpútà, ọ̀rọ̀ fún àwọn ẹ̀rí tí a lè fìdí rẹ̀ múlẹ̀ dáadáa ni àwọn ẹ̀rí NP. Àwọn ẹ̀rí kúkúrú wọ̀nyí ni a lè fìdí rẹ̀ múlẹ̀ ní àkókò polynomial. Èrò gbígbòòrò náà ni "Ojútùú kan wà sí ìlànà kan & a gbé e kalẹ̀ fún olùdánilójú láti ṣàyẹ̀wò rẹ̀."


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="/content-images/d25345cf-e958-4ce2-b01d-f4e7f2db9551-1ac56e56d7.webp" alt="" width="600" height="400"/>
</a>


Nínú èdè NP = àwọn ipò méjì gbọ́dọ̀ wà: 

Pípé: Àwọn ẹ̀tọ́ òótọ́ ni olùfìdí múlẹ̀ yóò gbà (ó máa jẹ́ kí àwọn olùfẹ̀rí òótọ́ dé ìfìdí múlẹ̀)

Ìdánilójú: Àwọn ẹ̀tọ́ èké kò ní ẹ̀rí kankan (fún gbogbo ọgbọ́n ìdánilójú ìtanjẹ, wọn kò ní lè fi ẹ̀rí hàn pé ẹ̀tọ́ tí kò tọ́ ni).


### Àwọn Ẹ̀rí Ìbáṣepọ̀ àti Ìṣẹ̀lẹ̀ Tó Ṣeéṣe

**Ìbáṣepọ̀**: Dípò kíkà ẹ̀rí lásán, olùdánilójú náà máa ń bá olùdánilójú sọ̀rọ̀ lẹ́ẹ̀kọ̀ọ̀kan lórí ọ̀pọ̀ ìfọ̀rọ̀ránṣẹ́.

**Àìròtẹ́lẹ̀**: Àwọn ìbéèrè olùdánwò sí olùdánwò jẹ́ èyí tí a ṣe láìròtẹ́lẹ̀, olùdánwò sì gbọ́dọ̀ lè dáhùn sí ọ̀kọ̀ọ̀kan. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="/content-images/1542be12-d3fd-4934-8413-0d16f95b8d10-58bfcb4059.webp" alt="" width="600" height="400"/>
</a>


Nípa lílo ìbáṣepọ̀ àti àìròtẹ́lẹ̀ papọ̀, ó ṣeé ṣe láti fi ẹ̀rí hàn pé a jẹ́rìí sí afọ́jú nínú Àkókò Pọ́ńómíálì Pípé (PPT). 

Ṣé àwọn ẹ̀rí ìbánisọ̀rọ̀ lè jẹ́rìí sí i ju àwọn ẹ̀rí NP lọ?

Àwọn Ẹ̀rí NP àti Ẹ̀rí IP:

|  Gbólóhùn   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  bẹẹni      |  bẹẹni   |
|    CO-NP     |  no       |  bẹẹni   |
|    #P        |  no       |  bẹẹni   |
|    PSPACE    |  no       |  bẹẹni   |


NP - Ojutu kan wa si gbólóhùn kan

CO-NP - Fifihan pe ko si awọn ojutu si alaye kan

#P - Láti ka iye ojútùú tó wà fún gbólóhùn kan

PSPACE - Ṣíṣe àfihàn ìyàtọ̀ àwọn gbólóhùn tó yàtọ̀ síra

### Kí ni ìmọ̀ odo?

Ohun tí olùdánilójú lè ṣírò lẹ́yìn ìbáṣepọ̀ kan jọ ohun tí ó lè fihàn tẹ́lẹ̀. Ìbáṣepọ̀ láàárín ọ̀pọ̀ ìyípo láàárín olùdánilójú àti olùdánilójú kò mú kí agbára ìṣirò olùdánilójú pọ̀ sí i.

**The Simulation Paradigm**

Ìdánwò yìí wà ní gbogbo ìgbà tí a bá ń kọ nǹkan sí ìkọ̀kọ̀. Ó gbé "Ìwò gidi" àti "Ìwò tí a fi ṣe àfarawé" kalẹ̀. 

Ìwòye Tòótọ́: Gbogbo ìtàn tó ṣeé ṣe nípa ìbáṣepọ̀ láàárín Prover & Verifier (P, V)

Ìwò tí a fi ṣe àfarawé: Olùṣàyẹ̀wò náà ń ṣe àfarawé gbogbo ìbáṣepọ̀ tó ṣeé ṣe láàrín Prover àti Verifier 

<a href="">
    <img width="850" height="397" alt="simulation1" src="/content-images/0e68649d-a231-44d8-a76a-25a307f68b9e-ba1f0027cf.webp"  alt="" width="600" height="400"/>
</a>

Olùṣàfihàn àkókò onípele-pupọ kan gbìyànjú láti pinnu bóyá wọ́n ń wo ojú ìwòye gidi tàbí èyí tí a fi ṣe àfarawé, ó sì ń béèrè fún àpẹẹrẹ láti ọ̀dọ̀ àwọn méjèèjì leralera.

A sọ pé àwọn ojú ìwòye méjèèjì “kò ṣeé ṣe láti fi ìṣirò ṣe ìyàtọ̀” tí ó bá jẹ́ pé fún gbogbo àwọn algoridimu/àwọn ọgbọ́n ìyàtọ̀, kódà lẹ́yìn gbígba nọ́mbà polynomial ti àwọn àpẹẹrẹ láti inú gidi tàbí àwòkọ́ṣe, ìṣeéṣe náà jẹ́ >1/2. 

**Àwọn Àríyànjiyàn Ìmọ̀ Òdo-Òdo**

Ìlànà ìbánisọ̀rọ̀ (P,V) jẹ́ ìmọ̀ òdo tí a bá ní ohun èlò ìṣàfihàn (algorithm) tí ó fi jẹ́ pé fún gbogbo ìṣàyẹ̀wò àkókò onípele-àkókò ìṣeeṣe (nígbà tí ìlànà náà bá tọ́), àwọn ìpínkiri ìṣeeṣe tí ó ń pinnu ojú gidi láti ojú ìwòye tí a fi ṣe àfarawé kò ṣeé yà sọ́tọ̀ ní ṣíṣírò. 

Àwọn ìlànà ìbánisọ̀rọ̀ wúlò nígbà tí olùṣàyẹ̀wò kan bá wà. Àpẹẹrẹ kan ni olùṣàyẹ̀wò owó orí nínú ìbéèrè 'ẹ̀rí owó orí' tí kò ní ìmọ̀.

## Kí ni SNARK?

**Ariyanjiyan Ìmọ̀ Tí Kò Ní Ìbáṣepọ̀ Pẹ̀lú Ọ̀rọ̀**

Ìtumọ̀ gbígbòòrò - Ẹ̀rí kúkúrú kan pé gbólóhùn kan jẹ́ òótọ́. Ẹ̀rí náà gbọ́dọ̀ kúrú kíákíá láti jẹ́rìí sí i. Nínú SNARKS, ìránṣẹ́ kan ṣoṣo ni a fi ránṣẹ́ láti Prover sí Verifier. Lẹ́yìn náà, olùdánilójú lè yan láti gbà tàbí láti kọ̀. 

Àpẹẹrẹ gbólóhùn: "Mo mọ ìránṣẹ́ (m) tó bẹ́ẹ̀ tí SHA256(m)=0"

Nínú zk-SNARK ẹ̀rí náà kò fi ohunkóhun hàn nípa ìránṣẹ́ náà (m).

**Àwọn Onírúurú**: Àròpọ̀ àwọn ọ̀rọ̀ tí ó ní àwọn onírúurú (bíi 1,2,3), àwọn onírúurú (bíi x,y,z), àti àwọn olùfihàn àwọn onírúurú (bíi x², y³). 

àpẹẹrẹ: "3x² + 8x + 17"

**Iṣiro Iṣiro**: Àpẹẹrẹ fún ṣíṣírò àwọn polynomials. Ní gbogbogbòò, a lè túmọ̀ rẹ̀ sí Àwòrán Acyclic Directed Graph lórí èyí tí a ti ṣe iṣẹ́ ìṣirò ní gbogbo nódù ti àwòrán náà. Àwòrán náà ní àwọn ẹnubodè afikún, àwọn ẹnubodè ìsọdipúpọ̀ àti àwọn ẹnubodè kan tí ó dúró ṣinṣin. Bákan náà ni àwọn àyíká Boolean gbé àwọn bits nínú wáyà, àwọn àyíká Arithmetic ní àwọn nọ́ńbà.


<a href="">
<img width="785" height="368" alt="circuit1" src="/content-images/be1de1d6-60d3-4fd1-b9a2-5094c65d696f-dbd3177247.webp" alt="" width="300" height="200"/>
</a>

Nínú àpẹẹrẹ yìí, olùdánilójú fẹ́ láti yí olùdánilójú náà lérò padà pé òun mọ ojútùú sí ètò ìṣirò. 

**Àwọn Ìjẹ́wọ́**: Láti ṣe èyí, olùdámọ̀ràn yóò fi gbogbo àwọn ìníyelórí (ìkọ̀kọ̀ àti ti gbogbo ènìyàn) tí ó níí ṣe pẹ̀lú àyíká náà sínú ìjẹ́wọ́ kan. Àwọn ìjẹ́wọ́ máa ń fi àwọn ohun tí wọ́n ń fi sínú wọn pamọ́ nípa lílo iṣẹ́ kan tí àbájáde rẹ̀ kò ṣeé yípadà.

Sha256 jẹ́ àpẹẹrẹ kan ti iṣẹ́ hashing tí a lè lò nínú ètò ìfọwọ́sowọ́pọ̀.

Lẹ́yìn tí olùjẹ́rìí bá ti fi ara rẹ̀ fún àwọn iye náà, a ó fi àwọn ìlérí náà ránṣẹ́ sí olùjẹ́rìí (ní ìdánilójú pé wọn kò lè ṣàfihàn èyíkéyìí nínú àwọn iye àkọ́kọ́). Lẹ́yìn náà, olùjẹ́rìí náà yóò lè fi ìmọ̀ nípa iye kọ̀ọ̀kan lórí àwọn nódù ti àwòrán náà hàn fún olùjẹ́rìí náà. 

**Ìyípadà Fiat-Shamir**

Láti sọ ìlànà náà di *aláìní-ìbáṣepọ̀*, olùdánilójú náà máa ń mú àìròtẹ́lẹ̀ (tí a lò fún ìpèníjà ìkọ̀kọ̀) wá ní ipò olùdánilójú nípa lílo iṣẹ́ hash ìkọ̀kọ̀. Èyí ni a mọ̀ sí oracle laileto. Olùdánilójú náà lè fi ìránṣẹ́ kan ránṣẹ́ sí olùdánilójú náà tí ó lè ṣàyẹ̀wò pé ó tọ́. 

Láti ṣe SNARK kan tí a lè lò fún àwọn àyíká gbogbogbòò, àwọn ohun méjì ni a nílò:

Ètò ìdúróṣinṣin iṣẹ́: Ó fún olùfẹ́ láti fi ara mọ́ ìdúróṣinṣin pẹ̀lú okùn kúkúrú kan tí olùfìdí múlẹ̀ lè lò láti fi ẹ̀rí hàn pé àwọn àyẹ̀wò tí a sọ pé àwọn ìdúróṣinṣin náà jẹ́ ti ìdúróṣinṣin náà.

Ọ̀rọ̀ ìfọwọ́sowọ́pọ̀ oní-ẹ̀rọ-ìbáṣepọ̀ oní-ẹ̀rọ-ìbáṣepọ̀: Olùdánilójú béèrè lọ́wọ́ prover (algorithm) láti ṣí gbogbo ìlérí ní oríṣiríṣi ibi tí wọ́n bá yàn nípa lílo ètò ìfọwọ́sowọ́pọ̀ oní-ẹ̀rọ-ìwé ...

**Ṣeto**

Àwọn ìlànà ìṣètò ń ran olùdánilójú lọ́wọ́ nípa ṣíṣe àkópọ̀ àyíká kan àti ṣíṣe àgbékalẹ̀ àwọn pàrámítà gbogbogbò. 

<a href="">
<img width="845" height="398" alt="setup1" src="/content-images/c41212ca-b5e9-4ac8-8695-be612c45a679-80a6a87752.webp" alt="" width="600" height="300"/>
</a>

**Awọn oriṣi eto iṣaaju-ṣiṣe**:

Ìṣètò Gbẹ́kẹ̀lé fún àyíká kọ̀ọ̀kan - A ń ṣiṣẹ́ lẹ́ẹ̀kan fún àyíká kọ̀ọ̀kan. Ó jẹ́ ìyàtọ̀ sí àyíká kan àti pé àìròtẹ́lẹ̀ ìkọ̀kọ̀ (Wọ́n ń tọ́ka sí Okùn Ìtọ́kasí Àpapọ̀) gbọ́dọ̀ wà ní ìkọ̀kọ̀ + kí ó parẹ́. 

Ìṣètò tí a fi ẹ̀sùn kàn nínú ọ̀nà yìí túmọ̀ sí pé ẹlẹ́rìí èké lè fi ẹ̀rí hàn pé àwọn ọ̀rọ̀ èké ni. 

Ìṣètò tí a gbẹ́kẹ̀lé ṣùgbọ́n tí gbogbogbòò - Ó gbọ́dọ̀ ṣiṣẹ́ ìṣètò tí a gbẹ́kẹ̀lé lẹ́ẹ̀kan ṣoṣo, ó sì lè ṣe àgbékalẹ̀ ọ̀pọ̀ àwọn iyika tẹ́lẹ̀. 

Eto ti o han gbangba (Ko si Eto ti a gbẹkẹle) - Algorithm ti a ṣe ṣaaju iṣẹ naa ko lo eyikeyi aṣiri laileto rara. 


**Àwọn oríṣiríṣi àwọn ìkọ́lé tí a lè fi SNARK ṣe**:

[Groth16](https://eprint.iacr.org/2016/260): Ó nílò ètò tí a gbẹ́kẹ̀lé ṣùgbọ́n ó ní àwọn ẹ̀rí kúkúrú tí a lè fìdí rẹ̀ múlẹ̀ kíákíá.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://eprint.iacr.org/2019/953): Eto ti a gbẹkẹle gbogbo agbaye.

[DUDU](https://eprint.iacr.org/2019/1229)/[Halo](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Ko si Eto ti a gbẹkẹle ṣugbọn o ṣe awọn ẹri ti o gun diẹ tabi o le gba akoko diẹ fun prover lati ṣiṣẹ. 

SNARKS wúlò nígbà tí a bá nílò àwọn olùṣàyẹ̀wò púpọ̀ bí blockchain bíi Zcash tàbí zk-Rollup bíi [Aztec](https://docs.aztec.network) kí ọ̀pọ̀lọpọ̀ àwọn nódù ìfìdí múlẹ̀ má baà ní láti bá ara wọn lò lórí ọ̀pọ̀ ìyípo pẹ̀lú ẹ̀rí kọ̀ọ̀kan. 

## Báwo ni a ṣe ń lo zk-SNARK's ní Zcash?

Ni gbogbogbo, awọn ẹri ti ko ni imọ jẹ irinṣẹ lati fi agbara mu iwa otitọ ninu awọn ilana laisi fifi alaye eyikeyi han. 

Zcash jẹ́ ẹ̀rọ blockchain gbogbogbòò tí ó ń mú kí àwọn ìṣòwò àdáni rọrùn. A ń lo zk-SNARK's láti fi hàn pé ìṣòwò àdáni wúlò lábẹ́ àwọn òfin ìfọwọ́sowọ́pọ̀ nẹ́tíwọ́ọ̀kì láìsí ìfihàn àwọn kúlẹ̀kúlẹ̀ mìíràn nípa ìṣòwò náà. 

[Àlàyé Fídíò](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - Nínú àsọyé yìí, Ariel Gabizon ṣe àpèjúwe igi ìjẹ́wọ́ Zcash Note, Ìṣàyẹ̀wò Polynomial Blind & Àwọn Ìpèníjà Homomorphically Hidden àti bí a ṣe ń ṣe wọ́n lórí nẹ́tíwọ́ọ̀kì náà. 

Ka [Ìwé Halo2](https://zcash.github.io/halo2/index.html) fun alaye siwaju sii.

## Àwọn Ohun Èlò Míràn fún Ìmọ̀ Òdodo 

zk-SNARKs n pese ọpọlọpọ awọn anfani ninu ọpọlọpọ awọn ohun elo oriṣiriṣi. Jẹ ki a wo awọn apẹẹrẹ diẹ.

**Ìwọ̀n-ìwọ̀n**: Èyí ni a ṣe nípasẹ̀ 'Outsourcing Computation'. Kò sí àìní ìmọ̀ tó lágbára fún ẹ̀wọ̀n L1 láti fi ẹ̀rí iṣẹ́ iṣẹ́ tí kò ní ẹ̀wọ̀n hàn. Àwọn ìṣòwò kì í ṣe ìkọ̀kọ̀ lórí zk-EVM.

Àǹfààní iṣẹ́ Rollup (zk-Rollup) tí a gbé kalẹ̀ gẹ́gẹ́ bí ẹ̀rí ni láti ṣe àgbékalẹ̀ ọ̀pọ̀ ọgọ́rùn-ún/ẹgbẹ̀rún àwọn ìṣòwò àti pé L1 lè fìdí ẹ̀rí tí ó ṣe kedere múlẹ̀ pé gbogbo ìṣòwò ni a ṣe ní ọ̀nà tí ó tọ́, nípa gbígbé ìwọ̀n ìṣòwò àwọn nẹ́tíwọ́ọ̀kì náà ga sí i nípa ìwọ̀n 100 tàbí 1000.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="/content-images/a3cbb5c9-8767-4b34-9fcb-868ca421838f-d69b264b5b.webp" width="600" height="300"/>
</a>


**Ìbáṣepọ̀**: Èyí ni a ṣe lórí afárá zk nípa ‘dídì’ àwọn dúkìá lórí ẹ̀wọ̀n orísun àti fífi hàn pé àwọn dúkìá náà ti di mọ́lẹ̀ sí ẹ̀wọ̀n àfojúsùn (ẹ̀rí ìfohùnṣọ̀kan).

**Ìbámu**: Àwọn iṣẹ́ àgbékalẹ̀ bíi [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) ni anfani lati fihan pe iṣowo aladani kan ni ibamu pẹlu awọn ofin ile-ifowopamọ agbegbe laisi fifi awọn alaye ti iṣowo naa han. 

**Gbíjà Àìmọ̀ràn**: Láàrín ọ̀pọ̀lọpọ̀ àpẹẹrẹ yàtọ̀ sí blockchain àti cryptocurrency, lílo ìdánilójú lórí àwọn àwòrán tí àwọn ìròyìn àti àwọn ilé iṣẹ́ ìròyìn ti ṣe àgbékalẹ̀ láti jẹ́ kí àwọn olùwòran lè dá orísun àwòrán àti gbogbo iṣẹ́ tí wọ́n ṣe lórí rẹ̀ mọ̀ fúnra wọn. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Ẹ̀kọ́ Síwájú: 

[Ìwé Ìròyìn Zero-Knowledge - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's pẹ̀lú Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 àti SNARKs láìsí Àwọn Ìṣètò Gbẹ́kẹ̀lé - Sean Bowe lórí àwọn yàrá ìwádìí Dystopia](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Àwọn ẹ̀rí ìmọ̀ díẹ̀ pẹ̀lú Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Àwọn Ẹ̀rí Ìbánisọ̀rọ̀ Òfo-Ìmọ̀ - Àpilẹ̀kọ Chainlink](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Àkọ́kọ́ 1: Ìṣáájú àti Ìtàn ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Àlàyé Rọrùn nípa Àwọn Ìyípo Ìṣirò - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Ìwọ̀n tó ń súni, ìpamọ́ ti kú: Àwọn ẹ̀rí ZK, Kí ni wọ́n dára fún?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Àwọn ojú ìwé tó jọra

- [Àwọn Adágún Tí A Dáàbò Bo](/using-zcash/shielded-pools) — Báwo ni a ṣe ń lo zk-SNARKs nínú àwọn adágún iye Zcash
- [Halo](/zcash-tech/halo) — Eto zk-SNARK Zcash's ti o yọkuro awọn eto ti a gbẹkẹle
- [Ààbò Lẹ́yìn-Ìwọ̀n-Owó ní Zcash](/zcash-tech/post-quantum-security) - Bawo ni awọn ewu kuatomu ojo iwaju ṣe ni ibatan si cryptography Zcash
- [Àwọn Ohun Ìní tí a fi ààbò Zcash ṣe](/zcash-tech/zcash-shielded-assets) — ZSAs tí a kọ́ lórí ìmọ̀-ẹ̀rọ zk-SNARK
- [Kí ni ZEC àti Zcash](/start-here/what-is-zec-and-zcash) — Ifihan si Zcash ati awoṣe ikọkọ rẹ
- [Ta ló lè rí ìsanwó Zcash rẹ?](/start-here/who-can-see-your-zcash-payment) — Kí ni ó máa ń wà ní gbangba, àti ohun tí ó máa ń pamọ́ sí

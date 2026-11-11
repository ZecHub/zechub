<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Halo

## Kwa ufupi

Halo ni mfumo wa thibitisho la maarifa sifuri [zero-knowledge proof (ZKP)] usiohitaji uaminifu na unaojirudia, uliogunduliwa na Sean Bowe katika Electric Coin Co. Huondoa hitaji la usanidi unaoaminika [trusted setup] na kufanya utungaji wa thibitisho unaojirudia utekelezeke kwa vitendo, ambacho ni msingi wa ramani ya sasa ya Zcash ya kupanua uwezo na usalama.

- **Ni nini:** Muundo wa zk-SNARK wenye ujirudiaji wenye ufanisi na usio na sherehe ya usanidi unaoaminika.
- **Kwa nini ni muhimu:** Bwawa la faragha [shielded pool] la Zcash la Orchard, lililoamilishwa pamoja na NU5 mwaka 2022, hutumia Halo 2 — utekelezaji wa uzalishaji wa utafiti huu.
- **Sifa kuu:** Hakuna “taka zenye sumu” kutoka kwenye sherehe za usanidi, na mathibitisho yanayoweza kuthibitisha karibu idadi isiyo na kikomo ya mathibitisho mengine.
- **Leseni:** Halo 2 ni chanzo huria chini ya [MIT na Apache 2.0](https://github.com/zcash/halo2#readme), hivyo mtu yeyote katika mfumo ikolojia anaweza kujenga juu yake.

---

## Maelezo ya Msingi

Halo ni mfumo wa thibitisho la maarifa sifuri usiohitaji uaminifu na unaojirudia, uliogunduliwa na Sean Bowe katika Electric Coin Co. Huondoa usanidi unaoaminika na kuruhusu kupanua uwezo zaidi wa blockchain ya Zcash. Halo ulikuwa mfumo wa kwanza wa thibitisho la maarifa sifuri ambao ni wenye ufanisi na unaojirudia — unaotambuliwa kwa mapana kama mafanikio ya kisayansi.

![halo](/content-images/_unavailable.svg "halo")

### Vipengele viwili

- **Mpango Mfupi wa Commitment za Polinomu.** Humruhusu mtendaji wa commitment kuweka commitment kwa polinomu kwa mfuatano mfupi unaoweza kutumiwa na mthibitishaji kuthibitisha tathmini zinazodaiwa za polinomu iliyowekewa commitment.
- **Thibitisho Shirikishi la Oracle la Polinomu.** Mthibitishaji humwomba mtoa thibitisho (algoriti) afungue commitment zote katika pointi anazochagua, kwa kutumia mpango wa commitment za polinomu, na hukagua kwamba utambulisho ni sahihi kati yazo.

### Hakuna usanidi unaoaminika

zk-SNARKs hutegemea mfuatano wa pamoja wa marejeleo (CRS) kama kigezo cha umma cha kuthibitisha na kuhakiki. CRS hii lazima itengenezwe mapema na mhusika anayeaminika. Hadi hivi karibuni, ukokotoaji tata salama wa wahusika wengi (MPC) — kama ule uliofanywa na mtandao wa Aztec na Zcash — ulikuwa muhimu kupunguza hatari iliyohusika wakati wa [sherehe ya usanidi unaoaminika](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Mabwawa ya faragha ya awali ya Zcash ya Sprout na Sapling yalitumia mifumo ya kuthibitisha ya zk ya BCTV14 na Groth16. Ingawa hii ilikuwa salama, ilikuwa na vikwazo: haikuweza kupanua uwezo kwa sababu ilifungwa kwenye programu moja, “taka zenye sumu” (mabaki ya nyenzo za kificho zilizotengenezwa wakati wa sherehe ya mwanzo) zingeweza kubaki, na kulikuwa na kipengele cha uaminifu (japokuwa kidogo sana) katika kuamua kwamba sherehe ilikubalika.

Halo huondoa usanidi unaoaminika kwa kuunganisha mara kwa mara vielelezo vingi vya matatizo magumu pamoja katika mizunguko ya mikunjo ya eliptiki, ili mathibitisho ya ukokotoaji yaweze kutumiwa kujielezea kwa ufanisi (ugawaji wa gharama uliopachikwa). Athari ya pembeni ni kwamba mfuatano wa marejeleo uliopangiliwa (matokeo ya sherehe) unaweza kuboreshwa, na hivyo kuwezesha programu kama mikataba mahiri [smart contracts].

Halo huwapa watumiaji uhakikisho mbili muhimu kuhusu usalama wa mfumo mkubwa wa thibitisho la maarifa sifuri. Kwanza, huwawezesha watumiaji kuthibitisha kwamba hakuna yeyote aliyehusika katika sherehe ya mwanzo aliyeunda njia ya siri ya kutekeleza miamala ya udanganyifu. Pili, huwaruhusu watumiaji kuonyesha kwamba mfumo umeendelea kuwa salama kadiri muda ulivyopita, hata baada ya kufanyiwa masasisho na mabadiliko.

[Sean Bowe's maelezo katika Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Taswira / Mfano

### Mnyororo wa mthibitishaji wa nyaraka

Fikiria thibitisho la kawaida la zk-SNARK kama hati iliyothibitishwa na mthibitishaji wa nyaraka: muhuri mmoja, uhakiki mmoja, imekamilika. Sasa fikiria unahitaji kuthibitisha kwamba rundo la hati elfu kumi ni halisi. Bila ujirudiaji, mthibitishaji angelazimika kukagua kila muhuri.

Halo hugeuza kila hati iliyohakikiwa kuwa muhuri kwenye hati *inayofuata*, hadi rundo lote linapounganishwa kuwa hati moja yenye muhuri mmoja. Kukagua hati ya mwisho kunatosha kuamini mnyororo wote — na muhimu zaidi, mthibitishaji wa nyaraka wa Halo (mfumo wa kutoa thibitisho) hutengeneza mihuri yake mwenyewe bila kuhitaji mamlaka ya nje kuweka muhuri wake.

### Kwa nini kuondoa usanidi unaoaminika ni muhimu

Katika mifumo ya zamani, “muhuri” (CRS) ulitokana na sherehe. Washiriki walipaswa kuharibu nyenzo za kati, na kila mtu alipaswa kuamini kwamba walifanya hivyo. Muhuri wa Halo hutengenezwa na hisabati pekee: hakuna cha kuharibu, hakuna cha kuvuja, na hakuna sherehe ya kuamini.

---

## Uchambuzi wa Kina

### Mathibitisho yanayojirudia

Utungaji wa thibitisho unaojirudia huruhusu thibitisho moja kuthibitisha usahihi wa karibu idadi isiyo na kikomo ya mathibitisho mengine, huku ikibana kiwango kikubwa cha ukokotoaji (na taarifa). Hiki ni kipengele muhimu kwa kupanua uwezo, kwa sababu huruhusu mtandao kupanuka kwa mlalo huku makundi ya washiriki yakiweza bado kuamini uadilifu wa sehemu iliyosalia ya mtandao.

Kabla ya Halo, kufanikisha utungaji wa thibitisho unaojirudia kulihitaji gharama kubwa ya ukokotoaji na usanidi unaoaminika. Moja ya uvumbuzi mkuu ulikuwa mbinu iitwayo **ugawaji wa gharama uliopachikwa**: utungaji unaojirudia kwa kutumia mpango wa commitment za polinomu unaotegemea hoja ya zao la ndani, ukiboresha utendaji kwa kiasi kikubwa huku ukiepuka usanidi unaoaminika.

Makala ya [Halo](https://eprint.iacr.org/2019/1021.pdf) yanaeleza kikamilifu mpango huu wa commitment za polinomu na kugundua kwamba mbinu mpya ya ujumlishaji ilikuwepo ndani yake. Mbinu hii huruhusu idadi kubwa ya mathibitisho yaliyoundwa kwa kujitegemea kuhakikiwa karibu kwa kasi sawa na kuhakiki thibitisho moja. Peke yake, tayari ilitoa mbadala bora wa zk-SNARKs wa awali uliotumika katika Zcash.

### Halo 2

Halo 2 ni utekelezaji wa utendaji wa juu wa zk-SNARK ulioandikwa kwa Rust ambao huondoa hitaji la usanidi unaoaminika huku ukiweka msingi wa kupanua uwezo katika Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Unajumuisha ujumuishaji wa jumla wa mbinu iitwayo **mpango wa mkusanyiko**. Urasimishaji huu unaonyesha jinsi ugawaji wa gharama uliopachikwa unavyofanya kazi kwa kweli: kwa kuongeza mathibitisho kwenye kitu kinachoitwa **kikusanyaji**, ambapo kila thibitisho huelezea hali ya awali ya kikusanyaji, mathibitisho yote ya awali yanaweza kukaguliwa (kwa induksheni) kwa kukagua tu hali ya sasa ya kikusanyaji.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Sambamba na hilo, timu nyingine nyingi zilikuwa zikigundua Polynomial IOP zenye ufanisi zaidi kuliko Sonic (iliyotumika katika Halo 1), kama Marlin. Itifaki yenye ufanisi zaidi kati ya hizi ni PLONK, ambayo hutoa unyumbufu mkubwa katika kubuni utekelezaji wenye ufanisi unaotegemea mahitaji mahususi ya programu na hutoa muda wa mtoa thibitisho ulio bora mara 5 kuliko Sonic.

[Muhtasari wa PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo katika mfumo mpana wa ikolojia

Electric Coin Company iliingia katika makubaliano na Protocol Labs, Foundation ya Filecoin, na Ethereum Foundation kuchunguza Utafiti na Maendeleo wa Halo, ikijumuisha jinsi teknolojia hiyo inavyoweza kutumiwa katika mitandao yao husika. Makubaliano hayo yanalenga kutoa kupanua uwezo bora, uwezo wa kushirikiana, na faragha katika mifumo ikolojia na kwa Web 3.0.

Aidha, Halo 2 iko chini ya leseni za chanzo huria za [MIT na Apache 2.0](https://github.com/zcash/halo2#readme), ikimaanisha kwamba mtu yeyote katika mfumo ikolojia anaweza kujenga kwa kutumia mfumo wa kuthibitisha.

**Filecoin.** Tangu kutumwa kwake, maktaba ya halo2 imekubaliwa katika miradi kama zkEVM, na kuna uwezekano wa kuunganisha Halo 2 katika mfumo wa uthibitisho wa Virtual Machine ya Filecoin. Filecoin huhitaji mathibitisho mengi ya gharama kubwa ya muda wa nafasi na mathibitisho ya urudufu; Halo 2 ni muhimu katika kubana matumizi ya nafasi na kupanua uwezo wa mtandao vyema zaidi. [Filecoin Video ya Foundation yenye Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Pia mifumo ikolojia yote miwili ingenufaika ikiwa malipo ya hifadhi ya Filecoin yangeweza kufanywa kwa ZEC, yakitoa faragha sawa kwa ununuzi wa hifadhi inayopatikana katika uhamisho wa faragha wa Zcash — ikijumuisha kusimba fiche faili katika hifadhi ya Filecoin na kusaidia wateja wa simu wanaoambatanisha media kwenye ujumbe uliosimbwa fiche wa Zcash. [ECC × Filecoin chapisho la blogu](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Thibitisho la Halo 2 kwa ajili ya Verifiable Delay Function (VDF) yenye ufanisi linaendelezwa. VDF ni kijenzi cha kificho chenye matumizi mengi yanayoweza kutokea, yakiwemo nasibu ya madhumuni ya jumla kwa mikataba mahiri na uchaguzi wa kiongozi katika Proof of Stake. ECC, Foundation ya Filecoin, Protocol Labs, na Ethereum Foundation pia zinafanya kazi na [SupraNational](https://www.supranational.net/), muuzaji aliyebobea katika usimbaji fiche unaoharakishwa kwa vifaa, kwa ajili ya maendeleo yanayoweza kutokea ya GPU na ASIC ya VDF. Kikundi cha [Privacy and Scaling Explorations](https://appliedzkp.org/) kinatafiti njia za ziada ambazo mathibitisho ya Halo 2 yanaweza kuboresha faragha na kupanua uwezo kwa Ethereum.

### Miradi mingine inayotumia Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — itifaki ya kubadilisha atomiki ya minyororo mingi inayohifadhi faragha
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — zkRollup ya L2 kwenye Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — blockchain ya faragha ya L1 zkEVM
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — zkRollup ya L2 kwenye Ethereum

---

## Athari za Kivitendo

**Kwa Zcash yenyewe**

- Bwawa la faragha la Orchard, lililoamilishwa pamoja na NU5, ni utekelezaji wa mfumo huu mpya wa thibitisho kwenye mtandao wa Zcash. Linalindwa na muundo huohuo wa turnstile unaotumiwa kati ya Sprout na Sapling, kwa nia ya kuondoa hatua kwa hatua mabwawa ya faragha ya zamani.
- Kufuatia NU5 (katikati ya 2022), ujumuishaji wa mathibitisho yanayojirudia uliwezekana, na maboresho kadhaa ya faragha yalikuja nao — hasa kuanzishwa kwa “Actions” badala ya ingizo/toleo, ambako hupunguza kiasi cha metadata ya muamala.
- Kuondoa usanidi unaoaminika huondoa hatari ya kimfumo ambayo vinginevyo ingehitajika kurudiwa kwa kila uboreshaji mkubwa wa itifaki.

**Kwa wamiliki na waendeshaji**

- Utungaji wa thibitisho unaojirudia una uwezo wa kubana kiasi kisicho na kikomo cha ukokotoaji, kuunda mifumo iliyosambazwa inayoweza kukaguliwa, na kuboresha uwezo wa Layer 1 kwa waendeshaji wa full node — muhimu kwa viendelezi kama Zcash Shielded Assets na miundo ya muda mrefu ya Zcash.

---

## Makosa ya Kawaida

| Imani ya kawaida | Hali halisi ni ipi |
| --- | --- |
| “Halo ni uboreshaji wa baadaye ambao Zcash inasubiri.” | Orchard, inayotumika kwenye mainnet tangu NU5 (2022), tayari hutumia Halo 2. |
| “Kutokuwa na usanidi unaoaminika kunamaanisha kutokuwa na vigezo kabisa.” | Halo bado hutumia vigezo vilivyopangiliwa; tofauti ni kwamba havina taka zenye sumu na vinaweza kutengenezwa na kuboreshwa bila sherehe ambayo washiriki wanapaswa kuiamini. |
| “Halo 2 na makala ya Halo ni kitu kimoja.” | [makala](https://eprint.iacr.org/2019/1021.pdf) yanaeleza mpango wa commitment za polinomu na ugawaji wa gharama uliopachikwa; Halo 2 ni utekelezaji wa uzalishaji wa Rust wenye mpango wa mkusanyiko na arithmetization ya PLONKish. |
| “Ujirudiaji husaidia tu kupanua uhakiki wa block.” | Ujirudiaji pia hubana ukokotoaji wa kiwango cha programu — tazama mathibitisho ya Filecoin ya muda wa nafasi/urudufu na kazi ya VDF kwa Ethereum. |

---

## Kurasa Zinazohusiana

- [zk-SNARKs](/zcash-tech/zk-snarks) — kategoria ya jumla ya teknolojia ambayo Halo inahusishwa nayo
- [Halo (makala ya utafiti)](https://eprint.iacr.org/2019/1021.pdf) — chapisho la awali
- [Ironwood](/zcash-tech/ironwood) na [The Turnstile](/zcash-tech/the-turnstile) — jinsi mabwawa ya faragha yanavyohama huku yale ya zamani yakiondolewa
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — kiendelezi kinachonufaika na mathibitisho yanayojirudia
- [Zebra Full Node](/zcash-tech/zebra-full-node) — utekelezaji wa node unaothibitisha mathibitisho kwenye mnyororo

## Mafunzo Zaidi

- [Utangulizi wa ZKP na Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 pamoja na Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blogu ya maelezo ya kiufundi](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Nyaraka**

- [Rasilimali za Halo 2](https://github.com/mhchia/awesome-halo2)
- [Nyaraka za Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)

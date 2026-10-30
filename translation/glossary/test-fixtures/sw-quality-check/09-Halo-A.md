<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## Kwa Ufupi

Halo ni mfumo wa uthibitisho wa maarifa sifuri (ZKP) usiohitaji kuaminiana na unaojirudia, uliogunduliwa na Sean Bowe katika Electric Coin Co. Unaondoa hitaji la usanidi unaoaminika na kufanya utungaji wa uthibitisho unaojirudia uwe wa vitendo, ambao ni msingi wa ramani ya sasa ya Zcash ya kupanua uwezo na usalama.

- **Ni nini:** muundo wa zk-SNARK wenye urejeleaji wenye ufanisi na bila sherehe ya usanidi unaoaminika.
- **Kwa nini ni muhimu:** bwawa la faragha la Zcash la Orchard, lililoamilishwa pamoja na NU5 mwaka 2022, linaendeshwa kwenye Halo 2 — utekelezaji wa uzalishaji wa utafiti huu.
- **Sifa kuu:** hakuna “taka hatari” kutoka sherehe za usanidi, na mathibitisho yanayoweza kuthibitisha idadi isiyo na kikomo kivitendo ya mathibitisho mengine.
- **Utoaji leseni:** Halo 2 ni chanzo huria chini ya [MIT na Apache 2.0](https://github.com/zcash/halo2#readme), hivyo yeyote katika mfumo ikolojia anaweza kujenga juu yake.

---

## Maelezo ya Msingi

Halo ni mfumo wa uthibitisho wa maarifa sifuri usiohitaji kuaminiana na unaojirudia, uliogunduliwa na Sean Bowe katika Electric Coin Co. Unaondoa usanidi unaoaminika na kuruhusu kupanua uwezo zaidi wa mnyororo wa vizuizi wa Zcash. Halo ulikuwa mfumo wa kwanza wa uthibitisho wa maarifa sifuri ambao ni wenye ufanisi na unaojirudia — unaotambuliwa kwa upana kama mafanikio ya kisayansi.

![halo](/content-images/_unavailable.svg "halo")

### Vipengele viwili

- **Mpango Mfupi wa Ahadi za Polinomu.** Humwezesha mtoa ahadi kuweka ahadi kwa polinomu kwa mfuatano mfupi unaoweza kutumiwa na mthibitishaji kuthibitisha tathmini zinazodaiwa za polinomu iliyoahidiwa.
- **Uthibitisho wa Oracle Shirikishi wa Polinomu.** Mthibitishaji humwomba mthibitishaji (algoriti) afungue ahadi zote katika pointi anazochagua, kwa kutumia mpango wa ahadi za polinomu, na hukagua kuwa utambulisho ni sahihi kati yazo.

### Hakuna usanidi unaoaminika

zk-SNARKs hutegemea mfuatano wa marejeleo wa pamoja (CRS) kama kigezo cha umma cha kuthibitisha na kuhakiki. CRS hii lazima itengenezwe mapema na upande unaoaminika. Hadi hivi karibuni, hesabu tata salama za wahusika wengi (MPC) — kama zile zilizofanywa na mtandao wa Aztec na Zcash — zilihitajika kupunguza hatari iliyohusika wakati wa [sherehe hii ya usanidi unaoaminika](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Mabwawa ya faragha ya awali ya Zcash ya Sprout na Sapling yalitumia mifumo ya uthibitishaji wa zk ya BCTV14 na Groth16. Ingawa mifumo hii ilikuwa salama, ilikuwa na vikwazo: haikuwa ya kupanua uwezo kwa sababu ilifungamana na programu moja, “taka hatari” (mabaki ya nyenzo za kriptografia zilizozalishwa wakati wa sherehe ya mwanzo) zingeweza kubaki, na kulikuwa na kipengele cha kuaminiana (ingawa kidogo sana) katika kuchukulia sherehe kuwa inakubalika.

Halo huondoa usanidi unaoaminika kwa kuunganisha mara kwa mara vielelezo vingi vya matatizo magumu katika mizunguko ya mikunjo ya duaradufu, ili mathibitisho ya kihesabu yaweze kutumiwa kujielezea kwa ufanisi (upunguzaji wa gharama uliowekwa ndani). Athari ya pembeni ni kwamba mfuatano wa marejeleo ulioundwa (matokeo ya sherehe) unaweza kuboreshwa, na kuwezesha programu kama mikataba mahiri.

Halo huwapa watumiaji uhakikisho mbili muhimu kuhusu usalama wa mfumo mkubwa wa uthibitisho wa maarifa sifuri. Kwanza, huwawezesha watumiaji kuthibitisha kwamba hakuna yeyote aliyehusika katika sherehe ya mwanzo aliyetengeneza njia ya siri ya kutekeleza miamala ya udanganyifu. Pili, huwaruhusu watumiaji kuonyesha kwamba mfumo umeendelea kuwa salama kwa muda, hata ulipopitia masasisho na mabadiliko.

[Ufafanuzi wa Sean Bowe katika Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Taswira / Mfano

### Mnyororo wa mthibitishaji wa nyaraka

Fikiria zk-SNARK ya kawaida kama hati iliyothibitishwa na mthibitishaji wa nyaraka: muhuri mmoja, uhakiki mmoja, imetosha. Sasa fikiria unahitaji kuthibitisha kwamba rundo la hati elfu kumi ni halisi. Bila urejeleaji, mthibitishaji angelazimika kukagua kila muhuri.

Halo hubadilisha kila hati iliyohakikiwa kuwa muhuri kwenye hati *inayofuata*, hadi rundo lote lipunguzwe kuwa hati moja yenye muhuri mmoja. Kukagua hati ya mwisho kunatosha kuamini mnyororo wote — na muhimu zaidi, mthibitishaji wa nyaraka wa Halo (mfumo wa kuthibitisha) hutengeneza mihuri yake mwenyewe bila kuhitaji mamlaka ya nje kuweka muhuri wake.

### Kwa nini kuondoa usanidi unaoaminika ni muhimu

Katika mifumo ya zamani, “muhuri” (CRS) ulitokana na sherehe. Washiriki walipaswa kuharibu nyenzo za kati, na kila mtu alipaswa kuamini kwamba walifanya hivyo. Muhuri wa Halo huzalishwa kwa hisabati pekee: hakuna cha kuharibu, hakuna cha kuvuja, na hakuna sherehe ya kuamini.

---

## Uchambuzi wa Kina

### Mathibitisho yanayojirudia

Utungaji wa uthibitisho unaojirudia huruhusu uthibitisho mmoja kuthibitisha usahihi wa idadi isiyo na kikomo kivitendo ya mathibitisho mengine, ukibana kiasi kikubwa cha hesabu (na taarifa). Hiki ni kipengele muhimu kwa kupanua uwezo, kwa sababu huruhusu mtandao kupanuka kwa mlalo huku makundi ya washiriki yakibaki kuamini uadilifu wa sehemu iliyobaki ya mtandao.

Kabla ya Halo, kufanikisha utungaji wa uthibitisho unaojirudia kulihitaji gharama kubwa ya kihesabu na usanidi unaoaminika. Mojawapo ya uvumbuzi mkuu ulikuwa mbinu iitwayo **upunguzaji wa gharama uliowekwa ndani**: utungaji unaojirudia ukitumia mpango wa ahadi za polinomu unaotegemea hoja ya bidhaa ya ndani, ukiboresha sana utendaji huku ukiepuka usanidi unaoaminika.

Makala ya [Halo](https://eprint.iacr.org/2019/1021.pdf) yanaeleza kikamilifu mpango huu wa ahadi za polinomu na kugundua kwamba mbinu mpya ya ujumlishaji ilikuwepo ndani yake. Mbinu hii huruhusu idadi kubwa ya mathibitisho yaliyoundwa kwa kujitegemea kuhakikiwa kwa karibu kasi sawa na kuthibitisha uthibitisho mmoja. Kwa yenyewe, hilo tayari lilitoa mbadala bora kwa zk-SNARKs ya awali iliyotumika katika Zcash.

### Halo 2

Halo 2 ni utekelezaji wa utendaji wa juu wa zk-SNARK ulioandikwa kwa Rust ambao huondoa hitaji la usanidi unaoaminika huku ukiweka msingi wa kupanua uwezo katika Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Unajumuisha ujanibishaji wa mbinu inayoitwa **mpango wa ukusanyaji**. Urasimishaji huu huonyesha jinsi upunguzaji wa gharama uliowekwa ndani unavyofanya kazi kwa kweli: kwa kuongeza mathibitisho kwenye kitu kinachoitwa **kikusanyaji**, ambapo kila uthibitisho hurejelea hali ya awali ya kikusanyaji, mathibitisho yote ya awali yanaweza kukaguliwa (kwa induksioni) kwa kukagua tu hali ya sasa ya kikusanyaji.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Sambamba na hilo, timu nyingine nyingi zilikuwa zikigundua Polynomial IOP zenye ufanisi zaidi kuliko Sonic (iliyotumika katika Halo 1), kama Marlin. Itifaki yenye ufanisi zaidi kati ya hizi ni PLONK, ambayo hutoa unyumbufu mkubwa katika kubuni utekelezaji wenye ufanisi kulingana na mahitaji mahususi ya programu na hutoa muda wa mthibitishaji ulio bora mara 5 kuliko Sonic.

[Muhtasari wa PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo katika mfumo ikolojia mpana

Electric Coin Company iliingia katika makubaliano na Protocol Labs, Filecoin Foundation, na Ethereum Foundation ili kuchunguza utafiti na maendeleo wa Halo, ikijumuisha jinsi teknolojia hiyo inavyoweza kutumiwa katika minyororo yao husika. Makubaliano hayo yanalenga kutoa kupanua uwezo [scaling], utangamanifu, na faragha [privacy] bora zaidi katika mifumo ikolojia na kwa Web 3.0.

Zaidi ya hayo, Halo 2 iko chini ya leseni za chanzo huria za [MIT na Apache 2.0](https://github.com/zcash/halo2#readme), kumaanisha yeyote katika mfumo ikolojia anaweza kujenga kwa mfumo wa kuthibitisha.

**Filecoin.** Tangu kutumwa kwake, maktaba ya halo2 imepitishwa katika miradi kama zkEVM, na kuna uwezekano wa kuunganisha Halo 2 kwenye mfumo wa uthibitisho wa Filecoin Virtual Machine. Filecoin huhitaji mathibitisho mengi ya gharama kubwa ya muda wa anga na mathibitisho ya urudufishaji; Halo 2 ni muhimu katika kubana matumizi ya nafasi na kupanua uwezo wa mtandao vizuri zaidi. [FilecoinVideo ya Foundation yenye Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Pia mifumo yote miwili ikolojia ingenufaika ikiwa malipo ya hifadhi ya Filecoin yangeweza kufanywa kwa ZEC, yakitoa faragha sawa kwa ununuzi wa hifadhi inayopatikana katika uhamisho wa faragha wa Zcash — ikijumuisha kusimba faili fiche katika hifadhi ya Filecoin na kusaidia wateja wa simu wanaoambatisha maudhui kwenye ujumbe wa Zcash uliosimbwa fiche. [ECC × FilecoinChapisho la blogu](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Thibitisho [proof] la Halo 2 kwa ajili ya Verifiable Delay Function (VDF) yenye ufanisi linatengenezwa. VDF ni kijenzi cha kriptografia chenye matumizi [use cases] mengi yanayowezekana, ikiwemo nasibu ya madhumuni ya jumla kwa mikataba mahiri [smart contracts] na uteuzi wa kiongozi katika Proof of Stake. ECC, Filecoin Foundation, Protocol Labs, na Ethereum Foundation pia zinafanya kazi pamoja na [SupraNational](https://www.supranational.net/), muuzaji aliyebobea katika kriptografia inayoharakishwa na vifaa, kwa ajili ya uwezekano wa kutengeneza VDF kwa GPU na ASIC. [Kikundi cha Uchunguzi wa Faragha na Upanuzi wa Uwezo](https://appliedzkp.org/) kinafanyia utafiti njia za ziada ambazo thibitisho za Halo 2 zinaweza kuboresha faragha [privacy] na kupanua uwezo [scaling] kwa Ethereum.

### Miradi mingine inayotumia Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — itifaki ya kubadilisha atomiki ya minyororo mingi inayohifadhi faragha
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — zkRollup ya L2 kwenye Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — mnyororo wa vizuizi wa faragha wa L1 zkEVM
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — zkRollup ya L2 kwenye Ethereum

---

## Athari za Kivitendo

**Kwa Zcash yenyewe**

- Bwawa la faragha la Orchard, lililoamilishwa pamoja na NU5, ni utekelezaji wa mfumo huu mpya wa uthibitisho kwenye mtandao wa Zcash. Linalindwa na muundo uleule wa turnstile uliotumika kati ya Sprout na Sapling, kwa lengo la kustaafisha taratibu mabwawa ya zamani ya faragha.
- Baada ya NU5 (katikati ya 2022), ujumuishaji wa mathibitisho yanayojirudia uliwezekana, na maboresho kadhaa ya faragha yalikuja nayo — hasa kuanzishwa kwa “Actions” kuchukua nafasi ya ingizo/matokeo, jambo linalopunguza kiasi cha metadata ya muamala.
- Kuondoa usanidi unaoaminika huondoa hatari ya kimfumo ambayo vinginevyo ingelazimika kurudiwa kwa kila uboreshaji mkuu wa itifaki.

**Kwa wamiliki na waendeshaji**

- Utungaji wa uthibitisho unaojirudia una uwezo wa kubana kiasi kisicho na kikomo cha hesabu, kuunda mifumo inayosambazwa inayoweza kukaguliwa, na kuboresha uwezo wa Layer 1 kwa waendeshaji wa full node — husika kwa viendelezi kama Zcash Shielded Assets na miundo ya muda mrefu ya Zcash.

---

## Makosa ya Kawaida

| Imani ya kawaida | Hali halisi ni ipi |
| --- | --- |
| “Halo ni uboreshaji wa baadaye ambao Zcash inasubiri.” | Orchard, inayotumika kwenye mainnet tangu NU5 (2022), tayari inaendeshwa kwenye Halo 2. |
| “Kutokuwa na usanidi unaoaminika kunamaanisha kutokuwa na vigezo kabisa.” | Halo bado hutumia vigezo vilivyoundwa; tofauti ni kwamba havina taka hatari na vinaweza kuzalishwa na kuboreshwa bila sherehe ambayo washiriki wanapaswa kuamini. |
| “Halo 2 na makala ya Halo ni kitu kimoja.” | Makala ya [](https://eprint.iacr.org/2019/1021.pdf) yanaeleza mpango wa ahadi za polinomu na upunguzaji wa gharama uliowekwa ndani; Halo 2 ni utekelezaji wa uzalishaji wa Rust wenye mpango wa ukusanyaji na arithmetization ya PLONKish. |
| “Urejeleaji husaidia tu kupanua uwezo wa uthibitishaji wa vizuizi.” | Urejeleaji pia hubana hesabu za kiwango cha programu — tazama mathibitisho ya Filecoin ya muda wa anga/urudufishaji na kazi ya VDF kwa Ethereum. |

---

## Kurasa Husika

- [zk-SNARKs](/zcash-tech/zk-snarks) — aina ya jumla ya teknolojia ambayo Halo inamiliki
- [Halo (makala ya utafiti)](https://eprint.iacr.org/2019/1021.pdf) — uchapishaji wa awali
- [Ironwood](/zcash-tech/ironwood) na [The Turnstile](/zcash-tech/the-turnstile) — jinsi mabwawa ya faragha huhama huku yale ya zamani yakistaafishwa
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — kiendelezi kinachonufaika na mathibitisho yanayojirudia
- [Zebra Full Node](/zcash-tech/zebra-full-node) — utekelezaji wa node unaohakiki mathibitisho kwenye mnyororo

## Kujifunza Zaidi

- [Utangulizi wa ZKP na Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 pamoja na Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blogu ya maelezo ya kiufundi](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Onyesho la Jumuiya — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Nyaraka**

- [Rasilimali za Halo 2](https://github.com/mhchia/awesome-halo2)
- [Nyaraka za Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)

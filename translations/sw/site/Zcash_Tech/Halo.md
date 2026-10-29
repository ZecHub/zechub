<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo ni mfumo usioaminika, unaojirudia usio na maarifa (ZKP) uliogunduliwa na Sean Bowe katika Electric Coin Co. Huondoa hitaji la usanidi unaoaminika na hufanya utunzi wa uthibitisho unaojirudia kuwa wa vitendo, ambao ndio msingi wa mpango wa sasa Zcash's wa kupanuka na usalama.

- **Ni nini:** muundo wa zk-SNARK wenye urejeshaji mzuri na sherehe isiyoaminika ya usanidi.
- **Kwa nini ni muhimu:** Bwawa la Zcash's lililolindwa na Orchard, lililoamilishwa na NU5 mnamo 2022, linaendeshwa kwenye Halo 2 — utekelezaji wa uzalishaji wa utafiti huu.
- **Sifa muhimu:** hakuna "taka zenye sumu" kutoka kwa sherehe za kuanzishwa, na uthibitisho unaoweza kuthibitisha uthibitisho mwingine usio na kikomo.
- **Leseni:** Halo 2 ni chanzo huria chini ya [MIT na Apache 2.0](https://github.com/zcash/halo2#readme), ili mtu yeyote katika mfumo ikolojia aweze kujenga juu yake.

---

## Maelezo ya Msingi

Halo ni mfumo usioaminika na unaojirudia unaothibitisha sifuri ya maarifa uliogunduliwa na Sean Bowe katika Electric Coin Co. Huondoa usanidi unaoaminika na kuruhusu upanukaji mkubwa wa blockchain Zcash. Halo ilikuwa mfumo wa kwanza wa uthibitisho sifuri ya maarifa ambao ni mzuri na unaojirudia — unaochukuliwa sana kama mafanikio ya kisayansi.

![halo](/content-images/_unavailable.svg "halo")

### Vipengele viwili

- **Mpango wa Kujitolea wa Polynomiali Succinct.** Humruhusu mtoa ahadi kujitolea kwa polynomiali yenye mfuatano mfupi ambao unaweza kutumiwa na mthibitishaji kuthibitisha tathmini zinazodaiwa za polynomiali iliyofanywa.
- **Uthibitisho wa Oracle Inayoingiliana ya Polynomial.** Kithibitishaji kinamuuliza kithibitishaji (algoriti) kufungua ahadi zote katika sehemu anazochagua, kwa kutumia mpango wa ahadi ya polynomial, na huangalia kwamba utambulisho unabaki kuwa kweli kati yao.

### Hakuna usanidi unaoaminika

zk-SNARKs hutegemea kamba ya marejeleo ya kawaida (CRS) kama kigezo cha umma cha kuthibitisha na kuthibitisha. CRS hii lazima izalishwe mapema na mtu anayeaminika. Hadi hivi karibuni, hesabu salama za vyama vingi (MPC) zilizofafanuliwa vizuri — kama zile zilizofanywa na mtandao wa Aztec na Zcash — zilikuwa muhimu ili kupunguza hatari inayohusika wakati huu [sherehe ya usanidi inayoaminika](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Mabwawa ya awali Sprout na Sapling Zcash's yalitumia mifumo ya BCTV14 na Groth16 inayothibitisha zk. Ingawa haya yalikuwa salama, yalikuwa na mapungufu: hayakuweza kupanuliwa kwa sababu yaliunganishwa na programu moja, "taka zenye sumu" (mabaki ya nyenzo za kriptografia zilizozalishwa wakati wa sherehe ya mwanzo) zingeweza kuendelea, na kulikuwa na kipengele cha uaminifu (ingawa ni dakika moja) katika kuiona sherehe hiyo kuwa inakubalika.

Halo huondoa usanidi unaoaminika kwa kurudisha mara kwa mara matukio mengi ya matatizo magumu pamoja katika mizunguko ya mikunjo ya duaradufu, ili uthibitisho wa hesabu uweze kutumika kujifikiria wenyewe kwa ufanisi (upunguzaji wa gharama uliowekwa kwenye kiota). Athari mbaya ni kwamba mfuatano wa marejeleo uliopangwa (matokeo ya sherehe) unakuwa unaoweza kuboreshwa, na kuwezesha programu kama vile mikataba mahiri.

Halo huwapa watumiaji uhakikisho mbili muhimu kuhusu usalama wa mfumo mkubwa usio na maarifa. Kwanza, inawawezesha watumiaji kuthibitisha kwamba hakuna mtu aliyehusika katika sherehe ya mwanzo aliyeunda mlango wa siri wa kutekeleza miamala ya ulaghai. Pili, inaruhusu watumiaji kuonyesha kwamba mfumo umebaki salama kwa muda, hata kama umepitia masasisho na mabadiliko.

[Maelezo Sean Bowe's katika Maabara ya Dystopia](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Taswira / Analojia

### Mnyororo wa mthibitishaji

Fikiria zk-SNARK ya kawaida kama hati iliyoidhinishwa: muhuri mmoja, uthibitisho mmoja, umekamilika. Sasa fikiria unahitaji kuthibitisha kwamba rundo la hati elfu kumi ni halisi. Bila kujirudia, mthibitishaji atalazimika kukagua kila muhuri.

Halo hubadilisha kila hati iliyothibitishwa kuwa stempu kwenye hati *inayofuata*, hadi rundo zima litakapoanguka na kuwa hati moja yenye stempu moja. Kuangalia hati ya mwisho kunatosha kuamini mnyororo mzima — na muhimu zaidi, mthibitishaji Halo's (mfumo wa kuthibitisha) hutengeneza stempu zake mwenyewe bila kuhitaji mamlaka ya nje kuweka muhuri wake.

### Kwa nini kuondoa usanidi unaoaminika ni muhimu

Katika mifumo ya zamani, "muhuri" (CRS) ulitokana na sherehe. Washiriki walilazimika kuharibu nyenzo za kati, na kila mtu alilazimika kuamini kwamba walifanya hivyo. Muhuri Halo's huzalishwa na hisabati pekee: hakuna cha kuharibu, hakuna cha kuvuja, na hakuna sherehe ya kuamini.

---

## Kupiga Mbizi Kina

### Ushahidi unaojirudia

Muundo wa uthibitisho unaojirudia huruhusu uthibitisho mmoja kuthibitisha usahihi wa uthibitisho mwingine usio na kikomo, na hivyo kubana kiasi kikubwa cha hesabu (na taarifa). Hii ni sehemu muhimu ya kupanuka, kwa sababu inaruhusu mtandao kupanuka kwa usawa huku washiriki wengi wakiweza kuamini uadilifu wa mtandao uliobaki.

Kabla ya Halo, kufikia utungaji wa uthibitisho wa kurudia kulihitaji gharama kubwa ya kompyuta na usanidi unaoaminika. Mojawapo ya uvumbuzi mkuu ulikuwa mbinu inayoitwa **upunguzaji wa thamani**: utungaji unaorudia kwa kutumia mpango wa kujitolea wa polinomia kulingana na hoja ya ndani ya bidhaa, ikiboresha utendaji kwa kiasi kikubwa huku ikiepuka usanidi unaoaminika.

Ya [Karatasi Halo](https://eprint.iacr.org/2019/1021.pdf) inaelezea kikamilifu mpango huu wa kujitolea kwa polinomia na kugundua kuwa mbinu mpya ya ujumuishaji ilikuwepo ndani yake. Mbinu hii inaruhusu idadi kubwa ya uthibitisho ulioundwa kwa kujitegemea kuthibitishwa karibu haraka kama vile kuthibitisha uthibitisho mmoja. Kwa yenyewe, hiyo tayari ilitoa mbadala bora kwa zk-SNARKs za awali zilizotumika katika Zcash.

### Halo 2

Halo 2 ni utekelezaji wa zk-SNARK wenye utendaji wa hali ya juu ulioandikwa katika Rust ambao huondoa hitaji la usanidi unaoaminika huku ukiweka msingi wa uwezo wa kupanuka katika Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Inajumuisha ujumlishaji wa mbinu inayoitwa mpango wa **mkusanyiko**. Urasimishaji huu unafichua jinsi upunguzaji wa thamani uliowekwa kwenye kiota unavyofanya kazi: kwa kuongeza uthibitisho kwenye kitu kinachoitwa **mkusanyiko**, ambapo kila uthibitisho unasababu kuhusu hali ya awali ya mkusanyaji, uthibitisho wote wa awali unaweza kukaguliwa (kwa kuanzishwa) kwa kuangalia tu hali ya sasa ya mkusanyaji.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Sambamba na hilo, timu zingine nyingi zilikuwa zikigundua IOP za Polynomial zenye ufanisi zaidi kuliko Sonic (zinazotumika katika Halo 1), kama vile Marlin. Itifaki zenye ufanisi zaidi kati ya hizi ni PLONK, ambayo hutoa unyumbufu mkubwa katika kubuni utekelezaji mzuri kulingana na mahitaji maalum ya programu na hutoa muda bora wa 5× kuliko Sonic.

[Muhtasari wa PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo katika mfumo ikolojia mpana zaidi

Electric Coin Company iliingia makubaliano na Maabara ya Itifaki, Wakfu wa Filecoin, na Wakfu wa Ethereum ili kuchunguza Halo R&D, ikiwa ni pamoja na jinsi teknolojia hiyo inavyoweza kutumika katika mitandao yao husika. Makubaliano hayo yanalenga kutoa uwezo bora wa kupanuka, ushirikiano, na faragha katika mifumo ikolojia na kwa Wavuti 3.0.

Zaidi ya hayo, Halo 2 iko chini ya [Leseni za programu huria za MIT na Apache 2.0](https://github.com/zcash/halo2#readme), ikimaanisha mtu yeyote katika mfumo ikolojia anaweza kujenga kwa kutumia mfumo unaothibitisha.

**Filecoin.** Tangu kuanzishwa kwake, maktaba ya halo2 imetumika katika miradi kama vile zkEVM, na kuna uwezekano wa kuunganishwa kwa Halo 2 katika mfumo wa uthibitisho kwa Mashine Pepe Filecoin. Filecoin inahitaji uthibitisho mwingi wa gharama kubwa wa muda wa nafasi na uthibitisho wa kurudiwa; Halo 2 ni muhimu katika kubana matumizi ya nafasi na kuongeza mtandao vyema. [Video ya Wakfu wa Filecoin na Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)Pia ingefaidi mifumo yote miwili ya ikolojia ikiwa malipo ya hifadhi Filecoin yangeweza kufanywa katika ZEC, na kutoa faragha sawa kwa ununuzi wa hifadhi kama ilivyo katika uhamisho uliolindwa wa Zcash — ikiwa ni pamoja na kusimba faili katika hifadhi Filecoin na kusaidia wateja wa simu wanaounganisha vyombo vya habari kwenye memo iliyosimbwa ya Zcash. [Chapisho la blogu la ECC × Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Ushahidi wa Halo 2 kwa Kitendakazi cha Kuchelewa Kinachothibitishwa (VDF) kinachofanya kazi kwa ufanisi unatengenezwa. VDF ni hati ya awali ya usimbaji fiche yenye matumizi mengi yanayowezekana, ikiwa ni pamoja na nasibu ya jumla kwa mikataba mahiri na uchaguzi wa kiongozi katika Uthibitisho wa Hisa. ECC, Wakfu wa Filecoin, Maabara ya Itifaki, na Wakfu wa Ethereum pia wanafanya kazi na [SupraNational](https://www.supranational.net/), muuzaji aliyebobea katika usimbaji fiche unaoharakishwa na maunzi, kwa ajili ya ukuzaji wa GPU na ASIC wa VDF [Kikundi cha Faragha na Utafutaji wa Upanuzi](https://appliedzkp.org/) inatafiti njia za ziada ambazo uthibitisho wa Halo 2 unaweza kuboresha faragha na uwezo wa kupanuka kwa Ethereum.

### Miradi mingine inayotumia Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — itifaki ya kubadilishana atomiki ya minyororo mingi inayohifadhi faragha
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — L2 zkRollup kwenye Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — blockchain ya kibinafsi ya L1 zkEVM
- [Sogeza](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — L2 zkRollup kwenye Ethereum

---

## Matokeo ya Kivitendo

**Kwa Zcash yenyewe**

- Bwawa la kuogelea lililolindwa na Orchard, lililoamilishwa na NU5, ni utekelezaji wa mfumo huu mpya wa uthibitishaji kwenye mtandao Zcash. Linalindwa na muundo uleule wa kugeuza unaotumika kati ya Sprout na Sapling, kwa nia ya kurudisha polepole mabwawa ya zamani yaliyolindwa.
- Kufuatia NU5 (katikati ya 2022), ujumuishaji wa uthibitisho unaojirudia uliwezekana, na maboresho kadhaa ya faragha yalikuja pamoja nayo — haswa kuanzishwa kwa 'Vitendo' vinavyochukua nafasi ya ingizo/matokeo, ambayo hupunguza kiwango cha metadata ya miamala.
- Kuondoa mipangilio inayoaminika huondoa hatari ya kimfumo ambayo vinginevyo ingelazimika kurudiwa kwa kila uboreshaji mkubwa wa itifaki.

**Kwa wamiliki na waendeshaji**

- Muundo wa uthibitisho unaojirudia una uwezo wa kubana kiasi kisicho na kikomo cha hesabu, kuunda mifumo iliyosambazwa inayoweza kukaguliwa, na kuboresha uwezo wa Tabaka la 1 kwa waendeshaji wa nodi kamili — unaohusiana na viendelezi kama vile Zcash Shielded Assets na miundo ya muda mrefu Zcash's.

---

## Makosa ya Kawaida

| Imani ya pamoja | Ni nini hasa? |
| --- | --- |
| "Halo ni sasisho la siku zijazo ambalo Zcash inasubiri." | Orchard, inayopatikana moja kwa moja kwenye mtandao mkuu tangu NU5 (2022), tayari inaonyeshwa kwenye Halo 2. |
| "Hakuna usanidi unaoaminika inamaanisha hakuna vigezo hata kidogo." | Halo bado hutumia vigezo vilivyopangwa; tofauti ni kwamba havibebi taka zenye sumu na vinaweza kuzalishwa na kuboreshwa bila washiriki wa sherehe lazima waamini. |
| "Halo 2 na karatasi ya Halo ni kitu kimoja." | Ya [karatasi](https://eprint.iacr.org/2019/1021.pdf) inaelezea mpango wa ahadi ya polinomia na upunguzaji wa thamani uliowekwa kwenye kiota; Halo 2 ni utekelezaji wa uzalishaji Rust wenye mpango wa mkusanyiko na uainishaji wa hesabu za PLONKish. |
| "Kurudia husaidia tu katika uthibitishaji wa kuzuia kuongeza ukubwa." | Urejeshaji pia hukandamiza hesabu ya kiwango cha programu — tazama uthibitisho Filecoin's wa muda/kurudia na kazi ya VDF kwa Ethereum. |

---

## Kurasa Zinazohusiana

- [zk-SNARKs](/zcash-tech/zk-snarks) — kategoria ya teknolojia ya jumla Halo ni mali ya
- [Halo (karatasi ya utafiti)](https://eprint.iacr.org/2019/1021.pdf) — chapisho la awali
- [Ironwood](/zcash-tech/ironwood) na [Turnstile](/zcash-tech/the-turnstile) — jinsi mabwawa yaliyolindwa yanavyohama huku yale ya zamani yakistaafu
- [Mali Zilizolindwa za Zcash](/zcash-tech/zcash-shielded-assets) — kiendelezi kinachofaidika kutokana na uthibitisho unaojirudia
- [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node) — utekelezaji wa nodi unaothibitisha uthibitisho kwenye mnyororo

## Kujifunza Zaidi

- [Utangulizi wa ZKP na Halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 na Daira na Str4d — ZK Podikasti](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blogu ya ufafanuzi wa kiufundi](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Onyesho la Jumuiya la Halo 2 — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Nyaraka**

- [Rasilimali za Halo 2](https://github.com/mhchia/awesome-halo2)
- [Hati za Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)

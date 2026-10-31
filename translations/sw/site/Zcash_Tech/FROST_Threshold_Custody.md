<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Uhifadhi wa Kizingiti kwa ZEC za Faragha

> Kwa maelezo kamili ya kisiri ya protokali ya FROST, tazama ukurasa wa kiufundi wa [FROST](FROST.md).

Uhifadhi wa kizingiti wa FROST hujitokeza mara kwa mara katika mazungumzo ya Zcash — ulikuwa mkondo mkuu katika Hackathon ya ZecHub 2026 — lakini dhana hii haielezwi kila mara kwa lugha rahisi. Ukurasa huu unaeleza maana yake, wakati unapouhitaji kweli, manufaa na hasara zake, na vifaa vinavyouhimili leo.

---

## Kwa Ufupi

- **FROST** huruhusu kundi la wamiliki wa funguo kudhibiti kwa pamoja anwani ya Zcash ya faragha bila mtu mmoja kushikilia ufunguo kamili wa faragha.
- Kizingiti cha **t-kati-ya-n** kinamaanisha: watu t lazima watie sahihi pamoja ili kutumia; watu t-1 au wachache hawawezi kuhamisha fedha peke yao.
- Miamala huonekana kama muamala mwingine wowote wa faragha — hakuna alama on-chain inayoonyesha kwamba utiaji sahihi wa kizingiti ulitumika.
- Hii ni tofauti kimsingi na multisig ya uwazi (ambayo ni ya umma on-chain na Zcash imehimili kwa muda mrefu) — FROST hufanya kazi ndani ya bwawa la faragha.
- Ni muhimu kwa DAO, masoko ya kubadilishana sarafu, huduma za uhifadhi, akiba za pamoja, na hazina za timu — mahali popote ambapo hitilafu ya ufunguo mmoja haikubaliki.

---

## FROST ni nini kwa lugha rahisi?

Fikiria washirika watatu wa biashara ambao kila mmoja anashikilia sehemu ya ufunguo. Ili kutumia kutoka kwenye pochi yao ya pamoja, wawili wowote kati ya hao watatu lazima wakubaliane na watie sahihi pamoja. Muamala unaotokana huonekana sawa kabisa na utumaji wa kawaida wa mtu binafsi — hakuna mtazamaji anayeweza kutambua kutoka kwenye blockchain kwamba watu wengi walihusika.

FROST (**Sahihi za Kizingiti za Schnorr Zilizoboreshwa kwa Mizunguko na Zinazonyumbulika**) ni protokali ya kisiri inayowezesha hili kwa Zcash za faragha. Iliundwa na Chelsea Komlo (Chuo Kikuu cha Waterloo / Zcash Foundation) na Ian Goldberg.

Sifa kuu:

- **Kizingiti**: watiaji sahihi t-kati-ya-n pekee wanahitaji kushiriki (kwa mfano, 2-kati-ya-3, 3-kati-ya-5)
- **Ya faragha**: hufanya kazi ndani ya bwawa la faragha la Orchard — kiasi, mtumaji na mpokeaji hubaki siri
- **Isiyotofautishika**: sahihi ya mwisho huonekana kama muamala mwingine wowote wa Zcash wa faragha
- **Isiyohifadhiwa na mtu mwingine**: hakuna mhusika mmoja anayewahi kushikilia ufunguo kamili — hata mratibu

---

## Ni lini unapaswa kutumia uhifadhi wa kizingiti?

Uhifadhi wa kizingiti unafaa wakati **kupoteza ufunguo mmoja au mtu mmoja hakupaswi kumaanisha kupoteza fedha**.

| Hali | Kwa nini uhifadhi wa kizingiti husaidia |
|-----------|----------------------------|
| **DAO au hazina ya timu** | Hakuna msimamizi mmoja anayeweza kuondoa fedha peke yake; huhitaji makubaliano |
| **Soko la kubadilishana sarafu au mhifadhi** | Husambaza hatari ya ufunguo katika maeneo ya usalama au kati ya wafanyakazi |
| **Hifadhi binafsi ya baridi (pamoja na familia inayoaminika)** | 2-kati-ya-3 kati yako na wanafamilia wawili — ukifa au kupoteza ufikiaji, fedha hazipotei |
| **Escrow** | Mnunuzi, muuzaji na mwamuzi kila mmoja hushikilia sehemu; fedha hutolewa wawili wanapokubaliana |
| **Utoaji wa ruzuku wa thamani kubwa** | Mtindo wa ZCG: huhitaji watiaji sahihi wengi huru kabla ya kulipa |
| **Usimamizi wa funguo za wasanidi programu** | Huzuia tishio la ndani — hakuna mhandisi mmoja anayeweza kuondoa fedha za protokali |

Huenda **huhitaji** uhifadhi wa kizingiti kwa pochi binafsi unayoidhibiti peke yako, kiasi kidogo, au hali ambazo uratibu wa ziada unazidi manufaa ya kupunguza hatari.

---

## Inatofautianaje na multisig ya uwazi?

Zcash imehimili kwa muda mrefu multisig ya uwazi — funguo nyingi zinazohitajika kutumia kutoka kwenye t-anwani. Lakini multisig ya uwazi ina gharama kubwa ya faragha: **muundo wa multisig, funguo zote za umma, na watiaji sahihi wote huonekana kwenye blockchain**.

FROST hutatua hili kwa kufanya kazi ndani ya bwawa la faragha:

| | Multisig ya uwazi [transparent] | Kizingiti cha FROST (cha faragha [shielded]) |
|--|---------------------|--------------------------|
| Bwawa [pool] | Ya uwazi (hadharani) | Orchard (ya faragha) |
| Watia sahihi wanaoonekana on-chain | Ndiyo — funguo zote za umma zimefichuliwa | Hapana — haiwezi kutofautishwa na matumizi ya mtia sahihi mmoja |
| Kiasi kinachoonekana | Ndiyo | Hapana |
| Uratibu unaohitajika | Script on-chain | Mzunguko wa mawasiliano off-chain |
| Faragha [privacy] | Hakuna | Faragha kamili ya miamala ya faragha |

---

## Manufaa na hasara pamoja na vikwazo

FROST ina nguvu, lakini ina manufaa na hasara halisi unazopaswa kuelewa kabla ya kuitumia:

### Mzigo wa uratibu
Watiaji sahihi lazima wawe mtandaoni kwa wakati mmoja (au karibu hivyo) ili kukamilisha mzunguko wa utiaji sahihi. Ikiwa watiaji wako sahihi t wamesambaa katika kanda za saa au wana miunganisho isiyotegemewa, matumizi yanahitaji uratibu ambao pochi ya mtu mmoja haihitaji.

### Hakuna utiaji sahihi ikiwa akidi haipatikani
Ikiwa wamiliki wa funguo wa kutosha hawapatikani (wagonjwa, wanasafiri, hawajibu), fedha haziwezi kutumika kwa muda. Chagua kizingiti chako na idadi ya sehemu kwa uangalifu — 2-kati-ya-3 ina ustahimilivu zaidi kuliko 2-kati-ya-2.

### Sherehe ya uundaji wa funguo
Kusanidi FROST kunahitaji sherehe ya uundaji wa funguo uliosambazwa (DKG) ambapo washiriki wote n wako mtandaoni pamoja. Hili ni tukio la mara moja, lakini lazima lifanywe kwa uangalifu — ikiwa washiriki wataathiriwa wakati wa DKG, usalama hudhoofishwa.

### Vifaa bado vinakomaa
FROST kwa Zcash za faragha ni mpya kwa kiasi. Kiwango cha IETF (draft-irtf-cfrg-frost) kimekomaa, lakini ujumuishaji wa pochi ni mdogo. Tarajia changamoto fulani ikilinganishwa na pochi ya kawaida ya ufunguo mmoja.

### Utata wa urejeshaji
Kupoteza sehemu si mwisho wa dunia (hiyo ndiyo hoja ya kizingiti), lakini mipango ya urejeshaji lazima iandikwe mapema. Nani anashikilia nakala za akiba? Nini hutokea ikiwa sehemu mbili zitapotea kwa wakati mmoja?

---

## Ni nani anayejenga kwa kutumia FROST kwenye Zcash?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation imetoa utekelezaji unaofanya kazi wa FROST na tovuti ya majaribio. Huu ni utekelezaji rejeleo unaotumika kwa majaribio na maendeleo.

### Onyesho la Ywallet FROST
Ywallet ilikuwa na ujumuishaji wa awali wa onyesho la FROST, ulioelezwa katika Mwongozo wa Onyesho la [Ywallet FROST](/guides/Ywallet_FROST_Demo). Ywallet haitunzwa tena na haitasasishwa kwa Ironwood, kwa hiyo soma mwongozo huu kama maelezo ya usuli badala ya kitu cha kuendesha leo. Zkool, kutoka kwa msanidi programu huyo huyo, ndiyo mrithi unaotunzwa na huorodhesha multisig ya FROST miongoni mwa vipengele vyake.

### Hackathon ya ZecHub 2026 — Miradi ya Mkondo wa FROST

Mkondo wa FROST ulikuwa wenye ushindani mkubwa zaidi katika Hackathon ya ZecHub 2026. Miradi inayojulikana:

- **ZecVault** — escrow ya faragha ya 2-kati-ya-3 iliyokamilishwa kwenye mainnet (kizingiti cha FROST)
- **Steward** — uhifadhi wa kizingiti kwa Zcash za faragha wenye UX inayolenga urejeshaji

### Coinbase
Coinbase ilijenga utekelezaji wa FROST wa uzalishaji kwa mifumo yao ya utiaji sahihi wa kizingiti (kwa Bitcoin), ukiwa na marekebisho yanayoondoa hatua ya uchakataji awali na kusambaza jukumu la mkusanyaji miongoni mwa washiriki wote. Uzoefu wao unathibitisha muundo wa usalama wa FROST katika kiwango cha uzalishaji.

---

## Jinsi kipindi cha utiaji sahihi kinavyofanya kazi (kwa ufupi)

1. **Usanidi (mara moja):** Washiriki wote n huendesha sherehe ya uundaji wa funguo uliosambazwa (DKG). Kila mmoja hupata sehemu binafsi; ufunguo wa umma wa pamoja hutolewa. Hakuna mhusika anayejua ufunguo kamili wa faragha.

2. **Ratibu watiaji sahihi:** Matumizi yanapohitajika, mratibu (ambaye anaweza kuwa mmoja wa watiaji sahihi) hukusanya commitment kutoka kwa washiriki t walio tayari kutia sahihi.

3. **Mzunguko wa 1:** Kila mtiaji sahihi anayeshiriki hutengeneza nonce na kutangaza commitment (ya umma, isiyo nyeti).

4. **Mzunguko wa 2:** Kila mtiaji sahihi anayeshiriki hukokotoa sahihi yake sehemu kwa kutumia sehemu yake binafsi na kuitangaza.

5. **Ujumuishaji:** Mratibu huunganisha sahihi t za sehemu kuwa sahihi moja ya mwisho ya Schnorr — isiyotofautishika on-chain na sahihi ya mhusika mmoja.

6. **Utangazaji:** Muamala hutangazwa kwa mtandao wa Zcash kama kawaida.

Ikiwa mtiaji sahihi yeyote atatuma sahihi mbaya ya sehemu, protokali humtambua na kusitisha shughuli (hutengwa katika vipindi vya baadaye). Uratibu hufanyika off-chain — blockchain huona muamala wa mwisho pekee.

---

## Kuchagua vigezo vyako vya kizingiti

| Usanidi | Ustahimilivu | Hatari |
|-------|-----------|------|
| 1-kati-ya-1 | Hakuna ustahimilivu — sehemu moja ya kushindwa | Kupoteza ufunguo = kupoteza kudumu |
| 2-kati-ya-2 | Lazima uwe na watiaji sahihi wote wawili — hakuna ustahimilivu wa hitilafu | Mmoja asipopatikana = fedha zimegandishwa |
| 2-kati-ya-3 | Sehemu moja inaweza kupotea au kutopatikana | Upeo mdogo wa usalama kuliko 3-kati-ya-5 |
| 3-kati-ya-5 | Sehemu mbili zinaweza kupotea; usalama imara | Mzigo mkubwa zaidi wa uratibu |
| 3-kati-ya-7 | Kiwango cha taasisi; huvumilia hitilafu mbili | Gharama kubwa ya uratibu |

Mwanzo wa vitendo kwa timu nyingi: **2-kati-ya-3** (ustahimilivu, uratibu mdogo) au **3-kati-ya-5** (wa taasisi, usalama wa juu zaidi).

---

## Kurasa Zinazohusiana

- [FROST — Ufafanuzi wa Kina wa Kiufundi](FROST.md) — maelezo ya kisiri ya protokali (DKG, mizunguko ya utiaji sahihi, mathibitisho ya usalama)
- [Ywallet Mwongozo wa Onyesho la FROST](/guides/Ywallet_FROST_Demo) — maelezo ya usuli, Ywallet haitunzwa tena
- [Funguo za kutazama](Viewing_Keys.md) — ufikiaji wa kusoma pekee kwa anwani za faragha (unaokamilisha uhifadhi wa kizingiti)
- [Mali za Faragha za Zcash](Zcash_Shielded_Assets.md) — FROST pia ni miundombinu muhimu kwa utoaji wa ZSA

## Rasilimali

- [Karatasi ya utafiti ya FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [Kiwango rasimu cha IETF FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Utekelezaji wa Zcash Foundation FROST](https://frost.zfnd.org)
- [Chelsea Komlo — Sahihi za Kizingiti ni Nini? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Sahihi za Kidijitali za Kizingiti](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Sahihi za Kizingiti za Schnorr Imara na Asinkroni (Blockstream)](https://eprint.iacr.org/2022/550.pdf)

![alt text](image-1.png)
# Uthibitisho wa Kisheria Ni Nini?

### Jinsi ya kuthibitisha programu ni sahihi, badala tu matumaini yake ni

> **Series:** *Formal Verification Series* · **Part 1 ya 3**
> ** Wasikilizaji:** kabisa wageni. Hakuna hisabati, programu au cryptography background kudhaniwa.
> ** Nini wewe kuondoka na:** uelewa wazi wa nini maana ya * kuthibitisha * programu sahihi, kwa nini hiyo ni kimsingi tofauti kutoka kupima yake, kile mashine-iliyoangaliwa uthibitisho ni, na usahihi (na waaminifu) mipaka ya yale kama ushahidi inaweza ahadi.

Programu nyingi ni kuaminiwa kwa sababu imekuwa * kupimwa: sisi kukimbia juu ya pembejeo wengi na kuangalia tabia yake. uthibitisho rasmi anauliza swali zaidi jasiri. Je, tunaweza kuthibitisha*, pamoja na uhakika wa hisabati, kwamba mfumo hufanya nini lazima ** kila** uwezekano pembeji, ikiwa ni pamoja na wale hakuna mtu milele mawazo kujaribu? Makala hii hujenga wazo hilo kutoka chini hadi Intuition kwanza, hakuna alama mpaka wao kupata.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Hii ni hadithi ya kweli, na ndiyo sababu mfululizo huu upo.

In 2022, the privacy-focused cryptocurrency Zcash launched a new shielded pool named Orchard, letting people transact with the amounts hidden. For four years it worked flawlessly and passed repeated professional audits. Then, in May 2026, a security researcher reasoning carefully about the underlying mathematics (with help from AI tooling) found a single **under-constrained** spot in the system's math. That one gap could have let an attacker create an *unlimited* amount of counterfeit money, and because the amounts were hidden, nobody would have seen it happen. The flaw had been present the entire time.

Ni si hawakupata kwa kupima. Kila mtihani alikuwa kupita kwa miaka minne. Ilikuwa ni kukamatwa na mtu * kusababu kuhusu math.* Na wakati timu kurekebisha, hawakuwa tu patch na kuendelea. Waliandika ** mashine-iliyoangaliwa ushahidi wa hisabati** zaidi ya 2,700 theorems binafsi, kwamba badala hakuweza kuwa darasa hilo la kasoro kabisa.

Hiyo ni uthibitisho rasmi, na hii ndiyo inunuliwa kwako: sio "tulijaribu kesi nyingi na zilifanya kazi", lakini "tumethibitisha inafaa kwa kila kisa". Kwa mifumo ambapo hali moja iliyopotea ni mbaya (fedha, ndege, vifaa vya matibabu, cryptography), tofauti hiyo ni yote.

Macho ya kipofu katika kupima yalitajwa miongo kadhaa iliyopita na mwanasayansi wa kompyuta Edsger Dijkstra, na bado ni kweli:

> ** Uchunguzi unaweza kuonyesha * uwepo wa mende, lakini kamwe kutokuwepo kwao. *

Kama mtihani hupita, umefanya kujifunza kwamba mfumo kazi * juu ya kuingia hiyo.* Wewe wamejifunza kitu kuhusu pembejeo wewe si walijaribu, na bugs hatari ni karibu daima katika kesi hakuna mtu alijaribu.

---

## 2. Intuition: kuangalia milango dhidi ya kuthibitisha jengo hilo

Wazia kwamba una daraka la kujenga jengo lenye milango elfu moja, na kazi yako ni kuhakikisha kila mlango umefungwa usiku.

- ** Njia ya kupima:** kutembea kuzunguka na kujaribu sampuli ya milango. Jaribu hamsini, mia moja, elfu tano. Kila mmoja wewe jaribu ni imefungwa, hivyo ujasiri wako kukua. Lakini si wamejaribu wote, na mlango unlocked inaweza kuwa moja skipped.
- ** Njia rasmi-uthibitisho:** kuchunguza * mfumo wa kufunga yenyewe* na kuthibitisha, kutoka kwa kubuni yake, kwamba kushinikiza "lock" kifungo lazima engages kila mlango. Sasa huna haja ya kujaribu milango mtu binafsi wakati wote. Umeonyesha kuwa * hakuna mlango iwezekanavyo inaweza kushoto unlocked*, kwa sababu utaratibu hufanya hivyo haiwezekani.

Tofauti ni kati ya ** sampuli ukweli** na ** kuthibitisha mali ya kubuni. Kupima sampuli. uthibitisho rasmi inathibitisha. Hiyo ndiyo wazo lote, na kila kitu kingine ni mashine kwa kufanya hivyo madhubuti.

![alt text](image-2.png)

---

## 3. nguzo tatu za yoyote ya kuthibitisha rasmi

Kila uthibitisho rasmi, bila kujali jinsi ya juu ni kujengwa kutoka hasa viungo tatu. Kuweka haya wazi na wengine ni maelezo mafupi.

Nguzo. Maana ya kawaida. Kujenga ulinganisho.
|---|---|---|
** Ufafanuzi**. taarifa sahihi ya nini "sahihi" * maana yake ni.* "Kila mlango lazima imefungwa usiku".
** Mfumo**. Kitu halisi kuwa checked (programu, mzunguko, itifaki) Jengo na utaratibu wake kufunga.
** Ushahidi**. hoja kali kwamba mfumo daima hukutana na vipimo vya. Uonyesho mantiki ambayo kubonyeza "lock" locks milango yote.

Na sehemu ya nne, isiyo na sauti nyingi hufanya jambo hilo liwe lenye kuaminika:

- **Mchunguzi wa mashine.** Uthibitisho haujaandikwa na mwanadamu na unaonekana tu. Inalishwa kwa programu (msaidizi wa uthibitishaji, pia huitwa mtoaji wa nadharia) ambayo inachunguza * kila hatua ya kimantiki*. Mwanadamu anaweza kupeperusha mikono yake au kufanya kosa la hila; mashine haitakubali hatua ambayo haifuati kabisa. Hii ndio sababu tunasema matokeo ni **mashine-iliyoangaliwa**.

![alt text](image-3.png)

Msaidizi wa uthibitisho unaweza kusikia jina ni pamoja na ** Lean, Roq (zamani Coq), na Isabelle. Wao ni, kwa kweli, injini za kuangalia mantiki kali sana. Ushahidi wa Zcash katika hadithi yetu ya ufunguzi uliandikwa katika * Lean. Ikumbukwe kwamba mifano ya kisasa ya AI inatumiwa zaidi kusaidia kuandika ushahidi huu, na wanadamu kuwaongoza, ambayo imefupisha juhudi ambazo wakati mmoja zilichukua miaka hadi wiki. Mashine bado inachunguza kila hatua, hivyo kuongeza kasi hakugharimu uhakika wowote.

---

## 4. Uthibitisho ni nini hasa?

Neno "uthibitisho" linaweza kuogopesha, kwa hiyo hebu tulitoshe na mfano halisi unaofuatiliwa. Hakuna cryptography, hesabu ya shule pekee.

** Madai:** kwa kila idadi nzima `n`, jumla ya fedha hizo ni: `0 + 1 + 2 + ... + n` sawa na `n(n+1)/2`.

Unaweza *kujaribu* hii. `n = 5` huandaa `0+1+2+3+4+5 = 15`, na `5 × 6 / 2 = 15`. ✓ Inalingana. Jaribu `n = 10`: jumla ni: `55`, na formula inatoa `10 × 11 / 2 = 55`✓ (Hizi ni mahesabu na kuthibitishwa; madai kwa kweli huchukua kila moja ya viungo vya mwili. `n` kutoka 0 hadi 999 wakati checked moja kwa moja.)

Lakini kupima maadili, hata elfu yao, kamwe kufikia "kwa kila idadi nzima". Kuna infinitely wengi. A ** ushahidi** kufunga kwamba pengo usio katika hoja ya mwisho, kwa kutumia mbinu inayoitwa *** induction:

1. ** kesi ya msingi:** kwa ajili ya `n = 0`, jumla ni tu `0`, na formula inatoa `0 × 1 / 2 = 0`. Wanakubaliana. ✓
2. ** Hatua inductive: * kudhani* formula anaendelea kwa baadhi ya idadi `k`Sasa ongeza namba ijayo, `k+1`. Jumla hadi `k+1` is `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. line ya algebra rearranges hii kwa `(k+1)(k+2)/2`, ambayo ni hasa formula na `k+1` badala ya: `k`. ✓

Kwa kuwa ni wa mwanzo (0) na kila hatua hubeba kwa idadi ya pili, inashikilia ** zote** namba nzima milele katika hoja moja mwisho. Hiyo ni uthibitisho. Msaidizi ushahidi hufanya hasa sababu hii, lakini mechanically kuthibitisha kwamba kila hatua, ikiwa ni pamoja na "mstari wa algebra", kweli ifuatavyo kutoka kile kilichokuja kabla.

> Leap thamani ya kunyonya: uthibitisho anarudi "matukio mengi infinitely" katika ** mwisho, checkable hoja. Hiyo ni superpower kupima kimkakati haina.

---

## 5. Mahali ambapo wadudu huishi hasa

Formal uthibitisho ni nguvu kwa sehemu kutokana na kufafanua ufahamu kuhusu * ambapo * bugs kuja kutoka katika nafasi ya kwanza. kasoro yoyote katika mfumo wa sheria-kuangalia hufuatiliwa moja ya maeneo matatu:

Chanzo cha mdudu. Nini maana yake? Je, tunaweza kuthibitisha mbali ni?
|---|---|---|
**Maelezo**. hesabu au sheria wenyewe ni makosa (kushindwa hali, ufafanuzi mbaya) *** Ndiyo*, moja kwa moja hii ni rasmi ya uthibitisho wa nyumbani turf.
** Utekelezaji**. Msimbo inashindwa uaminifu kutekeleza vipimo sahihi kwa sehemu; mara nyingi kushindwa kama kuacha ushahidi detectable
** A kuvunjwa dhana** Kitu mfumo mzima hutegemea inageuka kuwa si kweli. No; mawazo ni msingi irreducible.

Hii taxonomy mambo zaidi ya inaonekana, na Sehemu 2 3 kurejea juu yake. kina, mende hatari sana, wale ambao wanaweza kujificha milele, huwa kuishi katika ** vipimo vya: maelezo ya hisabati ya nini mfumo ni lazima kufanya. Na maalum ni hasa kile mashine-iliyotathmini ushahidi unaweza kuchunguza moja kwa moja, kesi zote mara moja. Hiyo ndiyo sababu kubwa rasmi kuthibitisha juhudi lengo huko kwanza.

![alt text](image-4.png)

---

## 6. tahadhari muhimu zaidi katika uwanja mzima

Uthibitisho rasmi una nguvu, lakini ahadi yake ni sahihi na kutoelewana huongoza watu vibaya. Kwa hivyo sema kwa uangalifu:

> ** Uthibitisho dhamana kwamba * mfumo wa* hukutana na * vipimo, chini ya taarifa mawazo. kitu zaidi.**

Matokeo manne yanafuata, na kila moja ni muhimu:

- ** Kama vipimo ni makosa, ushahidi haina thamani.** kama wewe kuthibitisha "kila mlango kufuli" lakini mahitaji halisi ilikuwa "kila * dirisha * kufuli", umethibitishwa kitu kibaya, kikamilifu. ukaguzi wa uthibitisho kwamba kujengwa * nini maalum yako*, si kuwa maalum ya jambo sahihi.
- ** Kama ufafanuzi ni subtly misstated, dhamana kimya huziba.** uthibitisho kuhusu kidogo makosa ya ufafano wa "usawa" inaweza kuthibitisha chini kuliko unafikiri wakati bado kupita kila kuangalia. Hii ndiyo sababu maonyesho katika moyo wa ukaguzi lazima mfupi, kiwango cha juu na wazi reviewable kwa wanadamu.
- ** Kama dhana kushindwa, udhamini inakoma.** Ushahidi hutegemea madai ("hardware lock si kimwili kuvunjwa"). Ikiwa dhana ni uongo katika hali halisi, hitimisho haipaswi kushikilia.
- ** Haina maana "hakuna mende milele".** Ina maana "hapana mende wa aina ya kukataliwa na uainishaji huu, kutokana na dhana hizi. "A narrower, zaidi waaminifu, na madai mengi muhimu zaidi.

Kama tutakavyoona katika Sehemu ya 3, timu Zcash kueleza wigo wao na dhana wazi ("sisi kuthibitishwa ugavi soundness, chini ya haya majina madai, na si faragha") ni mfano wa uaminifu kwamba.

![alt text](image-5.png)

---

## 7. Kujitenga kwa unyoofu na madeni ya wengine

Ili kuweka hii readable sisi kurahisishwa. specifikationer halisi ni imeandikwa katika lugha sahihi rasmi, si sentensi Kiingereza; kuna * mitindo kadhaa ya ukaguzi wa kisheria (interactive theorem kuthibitisha, mfano kuangalia, SMT-msingi mbinu) yanafaa kwa matatizo mbalimbali; na kuandika ushahidi haya bado ujuzi, kazi ngumu hata kwa msaada AI. Sisi pia akaruka jinsi msaidizi uthibitisho inawakilisha mantiki ndani. Hakuna mabadiliko hayo msingi: uainishaji, mfumo, na mashine checked ushahidi kwamba wawili kukubaliana chini ya madai alisema. maelezo anarudi kama tunahitaji yake.

---

## 8. Muhtasari

- **Kujaribu** sampuli maalum ya pembejeo na inaweza kuonyesha bug ni sasa, kamwe kwamba mende hazipo. mende hatari kujificha katika kesi hakuna mtu samples.
- **Formal uthibitisho** inathibitisha mali anashikilia kwa ajili ya kila kesi iwezekanavyo, katika mwisho, checkable hoja.
- Kila uthibitisho ina nguzo tatu: ** vipimo** (nini sahihi maana), a ** mfumo wa ** (kitu checked), na ** ushahidi *** kwamba wanakubaliana, pamoja na ** ushuhuda msaidizi ** (kama vile Lean) ambayo mashine-kuangalia kila hatua.
- A ** ushahidi** (kwa mfano, kwa njia ya *** induction **) collapses infinitely kesi nyingi katika hoja moja mwisho.
- Bugs kuishi katika ** vipimo vya, utekelezaji wa au dhana kuvunjwa. Formal uthibitisho malengo maalum moja kwa moja, ambayo ni ambapo kina zaidi, wengi siri bugs huwa na kuishi.
- dhamana ni sahihi: mfumo hukutana ** vipimo vya, chini ya dhana alisema. Spec makosa, misstated ufafanuzi au kuvunjwa dhana huvunja yake na kamwe haina maana "hakuna mende milele".

---

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
** Uthibitisho rasmi**. Kuthibitisha, hisabati, kwamba mfumo hukutana na vipimo kwa ajili ya kesi zote.
**Maelezo**. Taarifa sahihi ya nini "tabia sahihi" maana yake ni,
** Mfumo**. Programu halisi, mzunguko au itifaki kuwa checked.
** Ushahidi** A mwisho mlolongo wa hatua za kimantiki kuanzisha madai kwa ajili ya kesi zote.
Programu (Lean, Rocq, Isabelle) ambayo inachunguza kila hatua ya uthibitisho.
** Mashine-iliyoangaliwa**. kuthibitishwa hatua kwa hatua na kompyuta, si tu kusoma binadamu.
**Induction** Uhakikisho wa kiufundi: kweli katika mwanzo, na kila hatua hubeba kwa ijayo.
** Dhana** Hali uthibitisho hutegemea; kama ni uongo, dhamana inaweza kuwa si kushikilia.

---

## FAQs

** Je, uthibitisho rasmi kuchukua nafasi ya kupima?**
Hapana. Wao kukamilisha kila mmoja. kupima huchukua masuala ya vitendo na dhana potofu kwa bei rahisi; uthibitishaji unazuia makundi nzima ya mdudu kwamba upimaji inaweza kamwe sampuli.

** Kama ni nguvu sana, kwa nini kila kitu si rasmi kuthibitishwa?**
Ni ghali na inahitaji ujuzi maalum, ingawa AI msaada ni kupunguza gharama hiyo. Imehifadhiwa kwa mifumo ambapo mdudu nadra itakuwa janga la, ambayo ni hasa mahali ambapo gharama yake pays off.

** Je, mfumo rasmi kuthibitishwa bado kushindwa?**
Ndiyo, kama vipimo ilikuwa na makosa, ufafanuzi alikuwa misstated, dhana hakuwa kushikilia, au kushindwa liko nje ya kile kilichotajwa. ushahidi inashughulikia tu nini inadai kufunika.

** Je, uthibitisho wa mashine uliopimwa ni wenye kuaminika zaidi kuliko ule wa kibinadamu?**
Kwa uthibitisho mkubwa, tata kwa ujumla ndiyo. Mashine haitapuuza pengo dogo au kukubali mwendo wa mkono, ingawa bado inaamini vipimo na ufafanuzi uliopewa.

** Kama AI husaidia kuandika uthibitisho, kwa nini kuamini?**
Kwa sababu msaidizi wa uthibitisho huangalia kila hatua kwa njia ya mitambo. AI inapendekeza hatua; mashine inathibitisha yao. Hatua mbaya ni tu kukataliwa, hivyo AI kuharakisha kazi bila kudhoofisha dhamana.

---

### Jaribu kutambua hisia zako za ndani.

Unathibitisha kwamba programu ya benki "hairuhusu kamwe usawa wa akaunti uwe hasi". Mwaka mmoja baadaye, pesa bado hazipo. Ni vipi zote mbili zinaweza kuwa kweli kwa wakati mmoja? * ((Jibu hapa chini.)) *

<details><summary>Answer</summary>

Uthibitisho ulihakikisha mali moja tu: mizani haiwezi kuwa hasi. Pesa zinaweza kutoweka kwa njia ambazo hazina kamwe hazishughulikiwi, kwa mfano mdudu anayehamisha pesa kwenye akaunti mbaya (bado sio hasi), au kasoro katika sehemu ya mfumo ambayo haikuelezewa kamwe. Ukaguzi ulifanya kile kilichoahidiwa na hakuna zaidi. Hii ni tahadhari ya Sehemu ya 6 inatumika: uthibitishaji unafunika uainishaji, sio kila wazo linalowezekana la "sahihi".
</details>

---

### Ni nini kinachofuata?

** Sehemu ya 2 · Orchard Bug:** sisi kurejea kwa kweli 2026 hadithi katika full. mfumo wa faragha siri kiasi kutumia cryptographic ushahidi, na moja chini-constrained mstari katika hesabu yake ilimaanisha kwamba uthibitisho hizo inaweza kufanywa uongo, kuruhusu unlimited bandia asiyeonekana. Tutaona hasa nini "mzunguko chini ya constrained" maana, ni kwa nini darasa hili la mdudu unaweza kujificha milele, na kwa nini imekuwa kilichotokea zaidi ya mara moja.

* Sehemu ya* Formal Verification * mfululizo kwa ajili ya [ZecHub](https://zechub.org).*

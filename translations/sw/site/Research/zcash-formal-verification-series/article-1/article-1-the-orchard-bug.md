![alt text](image-1.png)
# Mdudu wa Orchard: Wakati Mfumo Wenye Uthibitisho Ukiwa na Pengo

### Jinsi moja chini ya vikwazo mstari wa hisabati inaweza kuwa minted unlimited fedha asiyeonekana

> **Series:** *Formal Verification Series* · **Part 2 ya 3**
> ** Wasikilizaji:** wageni. Sehemu ya 1 ilianzisha uthibitisho rasmi; hapa tunakutana na mdudu halisi ambayo alifanya hivyo haraka. Kila kitu muhimu ni kuelezwa kutoka mwanzo.
> **What you'll leave with:** an intuitive but accurate picture of how a cryptographic proof system can contain a soundness hole, exactly what the 2026 Zcash "Orchard" bug was, why this class of bug can hide for years, and why it has happened before.

Katika Sehemu ya 1 sisi alisema kupima inaweza kuonyesha uwepo wa mende lakini kamwe kukosekana yao, na kwamba mende hatari zaidi kuishi katika mfumo * vipimo*, yake msingi hisabati. makala hii ni utafiti kesi. Mwaka 2026 kasoro ilipatikana katika Zcash Orchard kulindwa pool ambayo inaweza kuwa kuruhusu mshambuliaji kuunda unlimited fedha bandia invisibly. Ilikuwa imeokoka miaka minne na ukaguzi mara kwa mara. Kuelewa hilo, na watangulizi wake, ni nia dhahiri iwezekanavyo kwa kuthibitisha mifumo sahihi.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Zcash ni cryptocurrency na hali ya kibinafsi. Katika bwawa lake la kulindwa, kiasi cha pesa, watumaji, na wapokeaji wa shughuli zimefichwa. Faragha hii imeundwa kwa kutumia uthibitisho wa maarifa-si*: ushahidi wa kifumbo kwamba manunuzi yanafuata sheria zote bila kufunua yaliyomo kwenye manunuzio.

Kwa hiyo, ikiwa mfumo wa uthibitisho yenyewe ulikuwa na kasoro ambayo iliruhusu shughuli isiyo halali ionekane kuwa halali, ulaghai huo haungeweza kugunduliwa. Huwezi kuuona kwa kukagua kitabu cha hesabu, kwani kitabu hicho kimekuwa kisicho wazi kabisa. Lakini kama kuna kitu ambacho kinafanya biashara iwe mbaya zaidi kuliko Bitcoin ni kwamba mtu anaweza kuuza sarafu kutoka kwenye vitu visivyoonekana katika akaunti yake ya benki au hata kutengeneza pesa za kibinafsi ambazo hazipatikani kupitia mtandao wake.

Hiyo ni hatari ambayo ilitokea katika Orchard. Ili kuielewa, tunahitaji kuangalia ndani ya kile uthibitisho wa ujuzi-sifuri unathibitisha kweli.

---

## 2. Intuition: uthibitisho ni mzuri tu kama orodha yake ya kuangalia

Fikiria ofisa wa mpakani ambaye lazima akubali wasafiri bila kuona hati zao moja kwa moja. Badala yake, kila msafiri hujaza orodha ya ** kuangalia**, na afisa anakubali mtu yeyote ambaye orodha yake imewekwa alama kabisa. Orodha hiyo imetengenezwa ili * tu mhamiaji halali aweze kuweka tick kwenye kila kisanduku.*

Sasa fikiria orodha ya kuangalia inakosa sanduku moja muhimu, sema "pasipoti haijakwisha". Karibu kila mtu bado kujaza kwa uaminifu na hakuna kitu inaonekana makosa. Lakini mtu mwenye pasipoti iliyopitwa inaweza * pia * alama kila kisanduku kilichobaki na meli kupitia. mfumo unaonekana vizuri katika matumizi ya kila siku. shimo tu mambo kwa mtu ambaye huenda kutafuta yake.

Ushahidi wa ujuzi-sifuri hufanya kazi kama orodha hiyo ya kuangalia. Haifunuli maelezo binafsi; inachunguza kwamba wanakidhi seti maalum ya hali. Na ikiwa sharti moja muhimu imeondolewa kwa bahati mbaya, basi baadhi ya pembejeo zisizofaa zinaweza * pia * kupita, wakati kila kitu kinaendelea kuonekana kawaida.

Hebu tufanye "orodha ya hali" kuwa sahihi, kwa sababu hapo ndipo hasa mdudu aliishi.

---

## 3. Hesabu: mizunguko, vizuizi na uthabiti wa mfumo

Chini ya kofia, taarifa " shughuli hii ni halali" imewekwa kama ** mzunguko: mkusanyiko wa masharti yaliyoandikwa kwa hesabu inayoitwa vikwazo na kuandikwa kama equations juu ya idadi. Ili kufanya uthibitisho halali, prover lazima kutoa maadili siri (shahidi) ambayo kuridhisha * kila kikwazo. ushahidi inasadikisha verifier kwamba shahidi vile ipo bila kufunua yake.

Mali tunayohitaji kutoka kwa mfumo huu ina jina:

> **Usahihi:** lazima iwe vigumu kutoa ushahidi halali kwa taarifa * ya uongo. Tu kweli kauli wanapaswa kuwa na mashahidi ambao kukidhi vikwazo vyote.

Usahihi ni dhamana ya kupambana na bandia. Kama usahihi inashikilia, ushahidi halali kweli ina maana "halisi, sheria-kutii manunuzi kilichotokea". kama uhalali ana pengo, uthibitisho halali inaweza kuwa haina maana yoyote wakati wote.

### Nini mapungufu kizuizi gani (a kuthibitishwa mfano)

Vizuizi mara nyingi haja ya kulazimisha thamani kuwa rahisi. Mfano wa kawaida: kulazimishwa kwa thamani `b` kuwa moja ** bit**, ama `0` or `1`. Njia ya kawaida ya kufanya hivyo ni moja kizuizi:

```
b × (b − 1) = 0
```

Kwa nini kazi? bidhaa ni zero tu wakati moja ya mambo yake ni sifuri. hivyo `b × (b − 1) = 0` nguvu za kijeshi `b = 0` or `b = 1`, na kitu kingine. kuangalia kila thamani kutoka 0 hadi 16 (katika hesabu kwamba wraps karibu katika 17), * tu* maadili kuridhisha ni hasa **0 1**. ✓

Sasa fikiria kwamba mstari ni **accidentally kushoto nje** ya mzunguko. ghafla `b` Mtawala asiye mnyoofu anaweza kuweka sheria za kiadili ambazo hazipatani na kanuni. `b` to `5`, or `9`, au kitu chochote, na bado kukidhi vikwazo zilizobaki. line Hiyo moja inayokosekana ni ** upungufu wa sauti**: taarifa za uwongo sasa zina mashahidi wenye kuridhisha.

This is not a hypothetical. A missing boolean constraint of exactly this kind was found in Zcash's very first shielded design, Sprout, during development, and fixed before launch. Under-constraining is one of the most common and dangerous mistakes in building these circuits.

![alt text](image-2.png)

Hii ni sura nzima ya mdudu wa Orchard, kwa kiwango kidogo. Sasa kitu halisi.

---

## 4. Mdudu wa Orchard alikuwa nini hasa?

Zcash ya ulinzi ushahidi ni kujengwa juu ** curves elliptic, hisabati vitu ambayo pointi inaweza kuwa pamoja na "kuzidishwa" kwa idadi, shughuli mzunguko ina kutekeleza na vikwazo. Mzunguko lina gadgets kwamba kufanya * multiplication Elliptic-curve** na kuangalia kama ilifanyika vizuri.

Kulingana na ufunuo wa Shielded Labs na mtafiti Taylor Hornby, kasoro ya Orchard ilikuwa hasa hii:

> ** chini ya kizuizi kipengele cha mzunguko wa Orchard** alifanya inawezekana kulisha ** hiari uongo pembejeo katika elliptic-curve kuzidisha na bado kuwa na uzalishaji kuangalia kupita.**

Kwa maneno rahisi, orodha ya mzunguko ilikuwa inakosa masanduku ambayo inapaswa kuwa na pinned chini kwamba kuzidisha. Kutokana na pengo hilo, mshambuliaji wa kutosha mwenye ujuzi anaweza kujenga uthibitisho wa shughuli ambao mfumo unakubali hata kama shughuli iliunda thamani kutoka kwa kitu chochote. Hiyo ni ** ulaghai**, na kwa sababu kiasi katika bwawa la ulinzi kimefichwa, ingekuwa ** haijulikani ** kutoka kwenye kitabu cha kumbukumbu. Timu ya Tachyon baadaye ilivyoelezwa kosa sawa katika kiwango cha nambari kama mistari inayokosekana katika mzungko ambao ulichanganya kimya kimya usawa uliowekwa.

Ulinganisho wa hadithi yetu ya orodha ni sahihi:

| Hadithi ya orodha ya ukaguzi | Mdudu wa Orchard |
|---|---|
| Kisanduku cha "pasipoti ambacho hakijaisha muda wake" kinakosekana | Kizuizi kinachokosekana kwenye kuzidisha kwa mkunjo wa duaradufu |
| Msafiri aliyemaliza muda wake wa kusafiria hupita hata hivyo | Ingizo bandia kiholela hupita ukaguzi wa kuzidisha |
| Kila mtu mwingine hajaathiriwa, kwa hivyo hakuna kinachoonekana kibaya | Miamala ya kawaida ilifanya kazi vizuri, ikificha dosari |
| Ni mtu anayeitafuta tu ndiye anayepata shimo | Ilimchukua mtaalamu kuchunguza kwa makusudi hesabu ya mzunguko |

To be clear about how serious this was: the researcher, with AI assistance, wrote a *complete working exploit* and confirmed in a local test network that it produced unlimited, undetectable counterfeit coins. This was a real and exploitable flaw, not a theoretical worry.

---

## 5. Kwa nini ilifichwa kwa miaka minne?

mdudu aliishi katika Orchard kutoka kuanzishwa kwake Mei 2022 hadi kurekebisha dharura Juni 2026, kupitia ukaguzi wa kitaalam uliorudiwa na baadhi ya wataalamu bora zaidi duniani. Jinsi gani?

Because, as Part 1 warned, **testing samples cases, and this flaw lived in a case nobody sampled.** Ordinary transactions never exercised the missing constraint, so every test passed and every day of normal operation looked flawless. The flaw was reachable only by deliberately constructing an unusual witness aimed squarely at the gap. It was ultimately found not by running tests but by *reasoning about the circuit's mathematics*.

The discovery itself is a sign of where security is heading. In April 2026, Shielded Labs engaged security researcher **Taylor Hornby** specifically to hunt for exactly this kind of flaw. Shortly after a new frontier AI model (Anthropic's Claude Opus 4.8) was released in late May 2026, Hornby used it, together with a custom analysis harness and traditional methods, in a targeted review of the Orchard circuit. On **May 29, 2026**, the review found the vulnerability.

Mambo mawili ya wazi kutoka kwa ufunuo yanafaa kutajwa moja kwa moja:

- Timu kupatikana ** hakuna ushahidi * mdudu alikuwa milele kutumika, na anaona matumizi ya awali haiwezekani (ilikuwa evaded miaka ya uchunguzi wa wataalam, na aligunduliwa kupitia juhudi makusudi nyeupe-hat). Lakini asili yenyewe ya kosa la * undetectable * ina maana kitabu peke yake hawezi kikamilifu kuthibitisha kamwe kilichotokea.
- Ugunduzi huo ulisababisha machafuko makubwa, ikiwa ni pamoja na kushuka kwa kasi katika bei ya mali hiyo, haswa kwa sababu * uwezekano wa* udanganyifu uliofichwa ni mbaya sana kwa pesa.

![alt text](image-3.png)

---

## 6. Hii haikuwa mara ya kwanza kwa

Kosa la Orchard linatokana na familia inayorudiwa, na kuona kwamba ni nini hufanya uthibitisho rasmi usionekane kuwa wa hiari lakini unaepuka. Kasoro ya kudanganya daima hufuatilia mojawapo ya vyanzo vitatu (taxonomi kutoka Sehemu ya 1): ** vipimo** (hisabati yenyewe), utekelezaji** (kificho kisichokuwa cha kufuata hesabu sahihi), au dhana iliyovunjika.* Na muhimu zaidi:

> mdudu bandia ni ** undetectable** tu kama anaishi katika * vipimo vya. viungo utekelezaji kuondoka ushahidi wa kudumu umma, kwa sababu kila block kumbukumbu ya maudhui kamili ya kila shughuli, hivyo replaying historia kupitia programu kusahihishwa ingekuwa kufichua yoyote manunuzi code buggy vibaya kukubalika.

Historia ya Zcash yenyewe inaonyesha muundo:

| Mdudu (mwaka) | Chanzo | Inaweza kugunduliwa? |
|---|---|---|
| Dosari ya ahadi ya Zerocash (2016, kabla ya uzinduzi) | Vipimo (hash iliyokatwa ilivunja sifa ya kufunga) | Haigunduliki |
| Kasoro ya uthabiti katika usanidi unaoaminika (2018) | Vipimo (kosa katika karatasi ya zk-SNARK) | Haigunduliki |
| Mgongano wa hoja ya mfumo wa kuthibitisha (2025) | Vipimo (hundi isiyopatikana katika mfumo wa uthibitisho) | Inaweza kugunduliwa |
| Hitilafu ya uthibitishaji wa kikundi kidogo cha mkunjo (2016) | Utekelezaji (ukaguzi wa kikundi kidogo unaokosekana) | Inaweza kugunduliwa |
| **Orchard under-constrained multiplication (2026)** | **Vipimo (mzunguko)** | **Haigunduliki** |

Kupitia-line ni stark: kasoro ambayo inaweza kujificha milele ndio wale katika hisabati. Hiyo ndiyo hasa darasa kuthibitishwa mashine ya vipimo unaweza kuondoa, kesi zote kwa mara moja. kupima na ukaguzi sampuli; tu kuthibitisha hesabu inashughulikia kila pembejeo.

---

## 7. Itikio la watu

Watengenezaji wa Zcash walihamia haraka na kwa hatua:

1. ** Urekebishaji wa dharura (kufikia Juni 1-2, 2026).** Ndani ya siku chache za ufunuo huo, uboreshaji wa mtandao wa dharuru ulifunga dirisha la udhaifu, na kuongeza vizuizi vilivyokosekana ili hesabu ya mzunguko iwe sawa tena.
2. **A fresh, provable start ("Ironwood," activated July 28, 2026).** Rather than trust a patched version of the old pool indefinitely, the community launched a brand-new shielded pool, Ironwood, based on the corrected circuit but starting clean, and accompanied by a formal, machine-checked proof of correctness.

Hatua hiyo ya pili ni ambapo uthibitisho rasmi huingia hadithi, na ndio mada ya Sehemu 3. utambuzi timu alitenda juu yake inafaa kutazama mapema, kwa sababu inahusisha mfululizo huu wote pamoja:

> * undetectable * udanganyifu mdudu anaweza kuishi tu katika itifaki ya ** vipimo hivyo kama unaweza kuthibitisha maalum sheria nje ulaghai, kuondoa darasa nzima ya bug kwamba siri hapa kwa miaka minne.

Hiyo ni hasa nguzo-moja wazo kutoka Sehemu ya 1: kuthibitisha vipimo, na wewe kufunga pengo kwamba kupima kamwe inaweza.

---

## 8. Mtu anayetoa taarifa kwa unyoofu kuhusu madeni yake

We simplified deliberately. The real circuit involves hundreds of regions and many thousands of constraints, and the actual flaw is more technically intricate than a single missing bit-check; we used the bit-check because it shows the *shape* of an under-constrained circuit exactly, and because that exact mistake is real in Zcash's history. The precise Orchard flaw was an under-constrained elliptic-curve multiplication, as stated in the official disclosure. We also compressed the disclosure and remediation timeline. For the authoritative technical account, consult the Shielded Labs disclosure and the Project Tachyon writeups.

---

## 9. Muhtasari

- Hifadhi ya Zcash iliyohifadhiwa huficha kiasi kwa kutumia uthibitisho wa ujuzi, hivyo kosa katika ushahidi huo linaweza kuwezesha udanganyifu usioonekana.
- mfumo wa uthibitisho checks a fasta ** mzunguko** ya vikwazo; mali yake muhimu ni ** soundness: taarifa tu kweli lazima kuwa na kuridhisha *** shahidi.
- ** missing constraint** inajenga ** soundness gap**, kuruhusu taarifa za uongo kupita. (Kesi ya toy iliyothibitishwa: `b(b−1)=0` nguvu za kijeshi `b` kwa 0 au 1; kuacha na `b` Hii aina halisi ya mdudu ni kweli katika historia Zcash.)
- ** Orchard mdudu** ilikuwa ni chini ya vikwazo elliptic-curve kuzidisha: arbitrary uongo pembejeo inaweza kupita uzalishaji kuangalia, kuwezesha ukomo, undetectable bandia. kazi utumiaji ulionyeshwa katika mtandao mtihani.
- Ilikuwa imefichwa kwa miaka minne (Mei 2022 hadi Juni 2026) kwani majaribio ya sampuli za kesi na kamwe haikuchukua; ilipatikana kwa sababu juu ya hesabu, kwa msaada wa AI mnamo Mei 29, 2026.
- Zcash alijibu na kurekebisha dharura na dimbwi jipya, lililothibitishwa rasmi, Ironwood, somo la Sehemu ya 3.

---

## Orodha ya maneno

| Muhula | Maana ya Kiingereza cha kawaida |
|---|---|
| **Bwawa la kuogelea lenye ngao** | Hali ya faragha ya Zcash ambapo kiasi na vyama vimefichwa |
| **Ushahidi wa kutojua** | Uthibitisho kwamba kauli iliyofichwa ni halali, bila kufichua kitu kingine chochote |
| **Mzunguko** | Seti isiyobadilika ya masharti ya hesabu ambayo muamala halali lazima utimize |
| **Kikwazo** | Hali moja (mlinganyo) ndani ya saketi |
| **Shahidi** | Thamani za siri zinazokidhi vikwazo |
| **Utulivu** | Dhamana kwamba taarifa za kweli pekee ndizo zinaweza kutoa uthibitisho halali |
| **Pengo la utimamu** | Kizuizi kinachokosekana kinachoruhusu taarifa za uongo kupita |
| **Imebanwa kidogo** | Mzunguko usio na hali iliyohitajika, mzizi wa mdudu wa Orchard |
| **Inaonekana / Haionekani** | Kama unyonyaji ungeacha ushahidi katika ledger la umma |

---

## FAQs

** Je, Zcash bandia kweli kuundwa?**
Hakuna ushahidi wa unyonyaji kupatikana, na timu anaona ni uwezekano. Lakini kwa sababu kasoro ingekuwa undetectable kutoka kitabu cha hesabu, kitabu peke yake hawezi kikamilifu kuthibitisha kamwe kilichotokea, ambayo ni kwa nini majibu ilikuwa hivyo kina.

**Kwa nini kuficha kiasi hufanya mdudu kuwa mbaya zaidi?**
Katika mzunguko wa uwazi, sarafu zilizochongwa zinaonekana na zinaweza kukamatwa na kugeuzwa. Wakati kiasi kinafichwa kwa faragha, mdudu bandia haitoi kasoro inayoonekana, hivyo inaweza kudumu bila kuonekana.

Kwa nini miaka ya ukaguzi haikugundua?
Ukaguzi na vipimo kwa kiasi kikubwa kuchunguza tabia ya kesi halisi. kasoro hii tu kuibuka chini ya makusudi crafted, pembejeo isiyo ya kawaida inayolenga hali kando hisabati, ambayo mapitio routine hakuwa zoezi. Ilikuwa kupatikana kwa lengo kufikiri kuhusu mzunguko, si kwa kupima.

** Je, kikwazo kukosa kweli wote inachukua?**
Ndiyo. mfumo wa uthibitisho ni nguvu tu kama seti yake kamili ya vikwazo. moja muhimu hali kushoto nje kutosha kuruhusu taarifa batili kupitia.

** AI ilicheza jukumu gani?**
Mtafiti alitumia mpaka AI mfano pamoja na harness desturi na mbinu za jadi kupitia hisabati mzunguko wa na kupata kasoro. AI ni inazidi kutumika kwa pande zote mbili ya usalama, ambayo ni sehemu ya nini kuthibitisha mifumo sahihi sasa mambo mengi sana.

---

### Jaribu kutambua hisia zako za ndani.

Tuseme shughuli kulindwa ni inatakiwa kuthibitisha "pesa katika sawa fedha nje", lakini mzunguko anasahau kuzuia moja pato thamani. nini inaweza kuwa na uaminifu prover kufanya, na kwa nini ingekuwa kitabu cha umma kuangalia kabisa kawaida? * ((Jibu chini.)) *

<details><summary>Answer</summary>

With that output unconstrained, the prover could set it larger than the real inputs allow, creating value from nothing, a counterfeit. The proof would still verify, because the missing constraint is the only thing that would have caught the imbalance. And since the shielded pool hides amounts, the ledger shows only that "a valid transaction occurred," with no visible imbalance to raise an alarm. The forgery is real but invisible, which is exactly why soundness of the circuit matters so much, and exactly why it must be proven rather than tested.
</details>

---

### Ni nini kinachofuata?

**Part 3 · Ironwood:** the fix was not just a patch. Zcash's engineers built a new shielded pool and accompanied it with a machine-checked mathematical proof, over 2,700 theorems written in the Lean proof assistant, that it cannot create counterfeit money under its stated assumptions. We will see what "balance integrity" and "knowledge soundness" mean, exactly what the proof does and does not cover, and how the old pool was safely retired.

* Sehemu ya* Formal Verification * mfululizo kwa ajili ya [ZecHub](https://zechub.org).*

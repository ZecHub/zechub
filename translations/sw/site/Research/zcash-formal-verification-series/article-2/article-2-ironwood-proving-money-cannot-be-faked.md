![alt text](image-1.png)
# Ironwood: Kuthibitisha Kwamba Pesa Haiwezi Kutengenezwa Kimakosa

### Jinsi Zcash alijibu mdudu na mashine-iliyopimwa ushahidi

> **Series:** *Formal Verification* · **Part 3 ya 3**
> Sehemu ya 1 na 2 kuweka kuthibitisha rasmi na mdudu Orchard; mwisho huu inaonyesha mkutano mawazo mawili katika mfumo halisi. Kila kitu muhimu ni kukumbushwa kama sisi kwenda.
> ** Nini wewe kuondoka na:** uelewa sahihi wa nini Zcash kweli kuthibitishwa kuhusu yake mpya "Ironwood" pool, jinsi ushahidi ni muundo, kile gani na haina kufunika, jinsi ya zamani bwawa alikuwa kustaafu salama, na kwa nini hii inaonyesha kiwango kipya cha kujenga fedha cryptographic.

Katika Sehemu ya 1 tulijifunza nini maana yake kwa * kuthibitisha* mfumo sahihi. katika sehemu 2 sisi aliona kasoro halisi kwamba kupima amekosa miaka minne, chini-constrained elliptic curve kuzidisha ambayo inaweza kuwa kuruhusiwa ukosefu wa mipaka bandia asiyeonekana. makala hii ni azimio: jinsi Zcash akajibu si tu na patch, lakini pamoja na mashine checked ushahidi kwamba darasa nzima ya mdudu imeondoka.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

When a bug threatens money, the usual response is to patch it and move on. Zcash did something more ambitious. Alongside a new shielded pool called **Ironwood**, activated on July 28, 2026, its engineers published a **machine-checked mathematical proof**, over **2,700 theorems** written in the **Lean** proof assistant, establishing that the new pool cannot create counterfeit coins under its stated assumptions. The proof is public, in the open-source `ironwood` kuhifadhi, na alichukua timu tatu za watafiti na cryptographers vizuri zaidi ya mwezi kukamilisha.

Hii ni muhimu zaidi ya Zcash. Ni mojawapo ya maonyesho wazi kabisa katika ulimwengu halisi kwamba unaweza kuchukua mfumo wa kifedha ulio hai, andika kwa usahihi kile "hakuna udanganyifu" unamaanisha na *uthibitishe,* badala ya kutumaini vipimo vyako vilikuwa vya kina. Inabadilisha ahadi kuwa nadharia.

---

## 2. wazo kuu: kuthibitisha vipimo, kuua darasa la mdudu

Sehemu ya 2 ilimalizika kwa ufahamu uliofanya hili iwezekanavyo. Ikumbuke, kwani kila kitu hapa kinategemea:

> An *undetectable* counterfeiting bug can only live in the protocol's **specification**, the mathematical description of what the circuit must enforce. Anything detectable would show up in the public accounting. So proving the specification sound eliminates the entire class of hidden-counterfeiting bug at once.

Kwa nini "tu katika vipimo"? kwa sababu kila block daima kumbukumbu ya maudhui kamili ya kila shughuli, ikiwa ni pamoja na uthibitisho wake. Kama * programu * kimakosa kukubalika biashara mbaya, mtu yeyote anaweza replay historia kupitia software kusahihishwa na kuona hiyo. ushahidi huo ni wa kudumu na umma. Tu kasoro katika msingi * math * unaweza kujificha milele, kwa sababu hakuna "toleo sahihi" kucheza dhidi yake. Hiyo ni kosa rasmi ukaguzi inalenga.

Kupima hundi * tabia ya sampuli pembejeo*, na Orchard mdudu siri hasa kwa sababu hakuna sampuli input hit yake. uthibitisho kuhusu vipimo inashughulikia ** wote** pembeji wakati huo huo, ikiwa ni pamoja kesi makali mtu yeyote bila kufikiri kujaribu. Hiyo ndiyo aina pekee ya dhamana nguvu kutosha kustaafu miaka minne-wazee hitilafu asiyeonekana kwa ujasiri.

![alt text](image-2.png)

---

## 3. Ni nini hasa kilichothibitishwa?

Uthibitisho huanzisha kichwa cha habari moja, iliyojengwa kutoka kwa kina zaidi chini yake.

### Usawa wa usawa (kifungu cha kichwa)

> ** Usawa wa usawa:** thamani iliyofichwa imehifadhiwa katika dimbwi la kulinda kamwe haizidi thamani ya umma ambayo imemiminika ndani yake.

Hii ni mali ya kupambana na bandia katika fomu wazi. Fedha inaweza kuingia kwenye bwawa la ulinzi (kuonekana kwa umma) na kuondoka (kujulikana kwa umma), lakini ndani, ambapo kiasi kinafichwa, hakuna thamani inayoweza kutekelezwa. Hebu tufanye iwe halisi na kitabu kidogo cha hesabu (arithmetic kuthibitishwa):

- ** Uaminifu shughuli:** thamani ya pembejeo `5 + 3 = 8` kuzalisha matokeo thamani ya `4 + 4 = 8`. Thamani katika sawa thamani nje. usawa wa mizani anaendelea ✓
- ** Jaribio la bandia:** thamani ya pembejeo sawa `8`, lakini matokeo ya `4 + 4 + 2 = 10`Hiyo ingekuwa mint . `2` usawa uadilifu ** inakataza hii: pool hawezi kamwe kulipa nje zaidi kuliko aliingia yake. 

usawa uadilifu ni taarifa ya hisabati kwamba hali ya pili kamwe inaweza kuzalisha shughuli halali.

### Ujuzi soundness (injini chini)

To guarantee balance integrity, the researchers first had to prove a deeper and subtler property about the zero-knowledge proof system itself. Ordinary soundness (Part 2's "only true statements have a witness") turns out to be *not enough* for a shielded pool, for a fascinating reason: because a hidden transaction can contain anything, almost every statement technically *has* some witness. So the researchers proved a stronger property:

> ** Ujuzi soundness:** mtu yeyote ambaye anaweza kuzalisha halali ya manunuzi ushahidi lazima *kweli kumiliki* na shahidi halali, yaani sarafu halisi, usahihi inayotokana, katika anwani sahihi.

Katika sehemu ya pili, kuna ushahidi wa kutosha kwamba hakuna pengo la uhalali katika taarifa. Hakuna kizuizi kinachokosekana ambacho kingeacha taarifa bandia kupotea. Ni mali halisi ambayo * kukosekana kwake ilikuwa mdudu wa Orchard. Kuthibitisha kuwa iko sasa kwa washuhuda wote wanaowezekana ni kile kinachofunga mlango huo.

![alt text](image-3.png)

---

## 4. Jinsi uthibitisho ulivyojengwa

Uthibitisho huo ulikuwa ni juhudi kubwa ya kibinadamu, sio matokeo ya kushinikiza kitufe:

- Imeandikwa katika ** Lean** msaidizi uthibitisho (kutoka Sehemu ya 1: mashine ambayo inachunguza kila hatua mantiki).
- Inajumuisha **zaidi ya theorems 2,700**, inapatikana kwa umma katika EU. `ironwood` kumbukumbu.
- Produced by **three teams** of researchers and cryptographers over **more than a month**, including work led by Project Tachyon's Tal Derei, with contributions from Gregor Mitscha-Baude of zkSecurity and Daira-Emma Hopwood of the Zcash Open Development Lab, plus an independent parallel soundness proof by other cryptographers.

To reason about the property, the Lean model describes an entire **ledger** as a list of transactions, each carrying its actions, its declared public value, and its signatures. A predicate the researchers call **ValidLedger** transcribes the network's consensus rules directly: every action's witness must satisfy the required conditions, no spend-marker (nullifier) may appear twice, every referenced tree state must be one the system genuinely reached, and every signature must verify. The theorems then quantify over **every** valid ledger. That phrase, "every valid ledger," is the whole point: not a sample, but all of them, a superset of anything a real attacker could ever assemble.

The balance-integrity result is assembled from several ledger-level theorems, each proving one route to counterfeiting is closed: that every spend corresponds to a real earlier output, that total value is conserved, that a received note stays spendable and cannot be stolen, and that spending requires proper authorization. A separate piece, the **binding signature**, ties each transaction's hidden values to the public amount it declares, so hidden and public accounting cannot silently disagree.

---

## 5. Mahali ambapo hesabu hukutana na programu ya kompyuta

Swali la busara na uaminifu: uthibitisho ni kuhusu mfano wa hisabati, lakini mtandao huendesha * Rust code. * Tunajuaje nambari inalingana na mtindo?

The team drew a careful boundary they call the verifier's **fingerprint**. Above the boundary, the Lean proofs reason about the verifier as a precise mathematical object. Below it sits the ordinary Rust implementation. The key argument is the same one from Part 2:

> Njia yoyote programu halisi inaweza kupotoka kutoka mfano kuthibitishwa itakuwa * utekelezaji * mdudu, na udhaifu wa uendeshaji unaweza tu milele kuzalisha bandia ya kutambulika, kwa sababu kila uthibitisho uliokubaliwa umerekodiwa kabisa na unaweza kusakinishwa kupitia programu iliyorekebishwa.

Hivyo uthibitisho hushughulikia darasa undetectable (vipimo), na rekodi ya umma kudumu inashughulikia darasani detectable, utekelezaji. Kati yao, hakuna mahali kwa ajili *undetectables* bandia mdudu kujificha. Timu pia msalaba-iliyoangaliwa, kwa kuendesha halisi kuthibitisha na kuthibitisha ni reproduces alama za vidole hasa juu ya kesi alitekwa.

---

## 6. tahadhari muhimu zaidi: "chini ya dhana zilizotajwa"

Sehemu ya 1 alisisitiza kwamba uthibitisho dhamana mfumo hukutana na vipimo * chini ya madai alisema*, na kamwe maana "hakuna mende milele". timu Zcash alikuwa admirably sahihi kuhusu hasa hii, na uandishi wa elimu waaminifu lazima pia.

Uthibitisho hupunguza usalama wa Ironwood chini ya seti ndogo ya kiwango, wazi jina dhana. Hasa, soundness yake inategemea juu ya ukali wa ** tofauti logarithm tatizo** kwenye curve elliptic Ironwood matumizi (a vizuri alisoma dhana, ambapo mashambulizi bora inayojulikana kuchukua kwa utaratibu wa `2^126` shughuli, mbali zaidi ya yoyote hesabu feasible), pamoja na dhana standard modeling kwa ajili ya kazi hash. mipaka mbili ni thamani ya kusema wazi:

- ** Inachukua chini ya dhana hizo za kificho.** Ikiwa msingi wa msingi ulivunjwa, dhamana ingepotea. Hii ni kawaida na haiepukiki; kimsingi wote uliowekwa kwenye cryptography unategemea mawazo kama hayo.
- ** Inafunika usawa wa usawa, sio faragha.** Uthibitisho ni juu ya uadilifu wa usambazaji (hakuna pesa bandia). Haina * madai ya kudhihirisha dhamana tofauti za faragha za dimbwi, ambazo ni mali tofauti na hoja tofauti.

Mbali na kudhoofisha mafanikio, kutaja mipaka hii ni nini hufanya kuaminika. Madai ni sahihi: * chini ya dhana za kawaida za cryptographic, hifadhi hii haiwezi kutengeneza sarafu bandia zisizoweza kugunduliwa.* Hiyo ni nadharia, sio tumaini, na upeo wake wa uhakika unatajwa waziwazi.

![alt text](image-4.png)

---

## 7. Kuondoa maji ya zamani kwa usalama: kijia cha kugeuza hewa kinachobadilika-badilika

Kuthibitisha * mpya ya* pool sauti bado inachukua swali: nini kuhusu * zamani * Orchard bwawa, ambapo kasoro aliishi kwa miaka minne? Huwezi un-kuficha yake nyuma. Lakini unaweza amefungwa baadaye yake.

Zcash ilianzisha utaratibu aitwaye **turnstile**. sheria ni rahisi na nguvu:

> Thamani inaweza tu kuondoka pool zamani hadi kiasi kwamba verifiably aliingia ndani yake.

Because money moving into and out of a shielded pool is publicly visible (only the activity *inside* is hidden), the turnstile lets the whole network check that no more comes out than ever went in. If counterfeit coins had been created inside the old pool, they would hit this cap and fail to exit. And as honest funds migrate out and no excess appears, the community gains strong public evidence that the flaw was never exploited. It is the closest thing to auditing a private pool's supply without breaking its privacy, and it brings supply integrity closer to the transparent model of a chain like Bitcoin while preserving Zcash's privacy.

![alt text](image-5.png)

Ironwood yenyewe inatumia tena mzunguko wa uthibitisho * uliosahihishwa, huanza upya na dimbwi tupu, na inaongeza ulinzi unaotazama mbele (pamoja na vifungu ili fedha ziweze kubaki kupatikana ikiwa kompyuta za quantum zitakazotishia usiri wa leo). Shughuli mpya ya kulindwa sasa inapita kupitia Ironwood, wakati bwawa la zamani la Orchard limezuiliwa kwa uondoaji.

---

## 8. picha kubwa: cryptography juu ya uhakika

Ironwood is part of a broader shift in how Zcash builds. Its next-generation scaling effort (an architecture called **Tachyon**, built on recursive proofs and a toolkit called **Ragu**) is being developed under a philosophy sometimes called **high-assurance cryptography**: treating machine-checked formal verification not as an afterthought, but as a standard part of shipping novel cryptographic systems.

The logic is compelling. Cutting-edge cryptography is exactly where human intuition is weakest and where a subtle, untested edge case can hide for years, as Orchard showed. Proving the specification is the one technique that scales to "all possible inputs" and closes those gaps by construction. The team has signaled it intends to extend this scrutiny further over time, toward the implementation and beyond. Expect to see this bar adopted more widely, in and beyond Zcash.

---

## 9. Mtu anayetoa taarifa kwa unyoofu kwamba hana hatia ya kosa fulani

We simplified for clarity. The real Lean development is far more detailed than the sketch here, with precise definitions of actions, statements, commitments, nullifiers, and signatures; "balance integrity" and "knowledge soundness" have exact formal definitions we stated only in words; the reduction to discrete-log hardness passes through several intermediate models (an algebraic model of the prover and a random-oracle model of the hash) that we compressed into "standard assumptions"; and we described the fingerprint and turnstile at a conceptual level. None of this changes the essential story: a specification of "no counterfeiting," a machine-checked proof over all valid ledgers, an explicit and honest statement of scope and assumptions, and a safe retirement of the flawed pool. For the authoritative account, consult Project Tachyon's published verification writeups and the `ironwood` uthibitisho hazina.

---

## 10. Muhtasari

- Zcash akajibu Orchard mdudu si tu na patch lakini kwa ** mashine-iliyopimwa ushahidi** (zaidi ya theorems 2,700 katika Lean, inapatikana hadharani) kwa ajili yake mpya Ironwood pool.
- Ushahidi huanzisha ** usawa wa usawa** (dimbwi kamwe hulipa zaidi ya uliingia kwa umma), kujengwa juu ya uhalali wa maarifa * (ushahidi halali unahitaji kuthibitisha kweli kushikilia shahidi halisi, alithibitishwa kupitia ** extractor **). Uhalali na ujuzi ni mali hasa ambayo pengo lilikuwa mdudu wa Orchard.
- Ni sababu kuhusu ** kila kitabu halali**, si sampuli kesi, ambayo ni nini kufunga darasa la siri-ulaghai mdudu kwamba kupima missed.
- Math-to-programu pengo ni kushughulikiwa na ** alama ya vidole ** mpaka: bugs undetectable wanakataliwa nje kwa ushahidi, na yoyote utekelezaji kupotoka itakuwa ** detectable** katika rekodi ya kudumu umma.
- Dhamana ni alielezea hasa: inashikilia chini ya ** diskret-log ugumu na kiwango hash dhana**, na inashughulikia ** counterfeiting, si faragha. uaminifu huu ni kipengele, sio udhaifu.
- ** Turntile** salama retires pool zamani kwa capping exits yake katika amana zake verifiable, kufichua bandia yoyote na kujenga ushahidi wa umma ya uadilifu usambazaji.
- Ironwood huonyesha hatua kuelekea ** high-uhakikisho cryptography**, ambapo uthibitishaji rasmi ni sehemu ya kawaida ya kujenga riwaya fedha Cryptographic.

---

## Orodha ya maneno

| Muhula | Maana ya Kiingereza cha kawaida |
|---|---|
| **Ironwood** | Bwawa jipya Zcash's lenye ulinzi (2026), likichukua nafasi ya bwawa Orchard lenye dosari |
| **Uadilifu wa usawa** | Bwawa la kuogelea halilipi thamani zaidi ya kuingia hadharani |
| **Usawa wa maarifa** | Ushahidi halali unahitaji mthibitishaji kuwa na ushahidi halisi |
| **Kitoaji** | Utaratibu unaomtoa shahidi kutoka kwenye uthibitisho wowote unaoshawishi |
| **Konda** | Msaidizi wa uthibitishaji alitumika kukagua uthibitishaji kwa mashine |
| **Leja Halali** | Mfano rasmi wa makubaliano hutawala nadharia za mantiki |
| **Alama ya vidole** | Mpaka kati ya hesabu iliyothibitishwa na programu ya Rust inayoendeshwa |
| **Chini ya dhana zilizotajwa** | Uthibitisho umetoa dhana zilizotajwa za kriptografia |
| **Turnstile** | Sheria inayoweka mipaka ya njia za kutoka za bwawa la kuogelea kwenye amana zake zinazoweza kuthibitishwa |
| **Usimbaji fiche wa uhakika wa hali ya juu** | Kujenga crypto kwa uthibitisho rasmi kama hatua ya kawaida |

---

## FAQs

** Je, uthibitisho maana Ironwood ni bug-bure?**
Hapana, na haidai kuwa. Inathibitisha mali moja sahihi, usawa wa uwiano, chini ya dhana zilizowekwa. Hiyo inakataza udanganyifu usioonekana, sio kila mdudu anayeweza kufikiriwa.

** Je, uthibitisho dhamana shughuli zangu ni binafsi?**
Hapana. uthibitisho inashughulikia ugavi soundness (hakuna fedha bandia), si tofauti ya hifadhi faragha dhamana hizo ni hoja tofauti.

**Kwa nini uamini uthibitisho ulioandikwa na wanadamu (na AI)?**
Kwa sababu ni mashine-iliyoangaliwa. Lean uthibitisho msaidizi kuthibitisha kila hatua mechanically, hivyo imani hutegemea vipimo na madai aitwaye, si juu ya huduma yoyote binadamu au AI katika kila hatua.

** Nini kinachotokea kwa sarafu bado katika bwawa zamani Orchard?**
Wanaweza kuondolewa, lakini tu hadi kiasi kwamba verifiably aliingia, kutekelezwa na turnstile. Hii wote inalinda uadilifu usambazaji na husaidia kuonyesha mdudu zamani kamwe alitumia vibaya.

** Je, huu ndio mwisho wa hadithi?**
Ni hatua muhimu, si mstari wa kumaliza. usanifu ujao Zcash ya (Tachyon, na Ragu toolkit) ni kuwa kujengwa kwa uthibitisho rasmi kama mazoezi standard, kupanua mbinu hii zaidi.

---

### Jaribu kutambua hisia zako za ndani.

Mtu anadai: "Kwa kuwa Ironwood imethibitishwa rasmi, sasa haiwezekani kwa chochote kwenda vibaya na Zcash". Kutumia maoni kutoka sehemu zote tatu, toa sababu mbili tofauti ambazo madai ni nguvu sana. * ((Jibu hapa chini.)) *

<details><summary>Answer</summary>

Kwanza, uthibitisho inashughulikia * maalum* mali (usawa usawa) chini ya * alisema dhana * (discrete-log ugumu na kiwango hash modeling). Kama cryptographic dhana walikuwa kuvunjwa, au kama tatizo lilitokea nje kile kilichoainishwa (kwa mfano katika faragha, katika programu mkoba, au baadhi sehemu unproven), ushahidi anasema chochote kuhusu hilo. Pili, kuthibitisha rasmi dhamana mfumo hukutana * vipimo kwamba alikuwa imeandikwa; ikiwa kuwa specifikation yenyewe alishindwa kukamata mahitaji fulani halisi, ushahidi itakuwa uaminifu vyeti kitu kibaya. Pointi zote mbili ni Sehemu 1 tahadhari reiterated: ushahidi sahihi na bounded, nguvu hasa kwa sababu wigo wake ni waaminifu, si blanketi kuhakikisha kwamba hakuna jambo inaweza kwenda vibaya wakati wowote.
</details>

---

### Mfululizo, kamilifu

Across three parts we moved from a general idea to a live application: what it means to **prove** software correct rather than test it (Part 1), how a real under-constrained circuit could have minted invisible money (Part 2), and how a machine-checked proof of **balance integrity** retired that class of bug for good (Part 3). The through-line is a single, honest promise: not "no bugs ever," but "this precise property holds for every case, under stated assumptions." For money that hides its own amounts, that promise is exactly the one worth proving.

* Sehemu ya* Formal Verification * mfululizo kwa ajili ya [ZecHub](https://zechub.org).*

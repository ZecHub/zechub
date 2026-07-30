# Jinsi Usafirishaji wa Zcash Unavyofanya Kazi
##### Utafiti wa awali kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

! [ alt maandishi](image.png)

### Intuition kabla ya hesabu: hakuna-formula kutembea kwa njia ya malipo binafsi

> Mfululizo: Zcash kutoka Kanuni za Kwanza.
> Hakuna cryptography, hakuna blockchain background, na hakuna hisabati kudhani.
> ** Nini wewe kuondoka na: ** sahihi ya kiakili mfano wa jinsi Zcash huficha * nani kulipwa nani, na kiasi gani *, wakati bado kuruhusu dunia nzima kuthibitisha kwamba hakuna fedha ilikuwa bandia au alitumia mara mbili.

Kila makala ya baadaye katika mfululizo huu inakaribia sehemu moja ya mashine unayokaribia kukutana nayo. Kwa hiyo kama neno hapa linaonekana kama mkono wa mikono, * nzuri. * Hiyo ni ahadi kwamba tutarudi na kupata vizuri.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Imagine your bank statement were nailed to a wall in the town square. Forever. Anyone (your landlord, your employer, a stranger, a future employer, a government) could read every rent payment, every medical bill, every donation, every coffee, and trace exactly who you sent money to and who sent money to you.

Hiyo si dystopian hypothetical. ** Hiyo ni takriban jinsi Bitcoin kazi.**

Bitcoin is often called "anonymous," but it isn't. It's *pseudonymous*: your name isn't on the ledger, but every transaction, amount, and link between addresses is public and permanent. The entire field of "chain analysis" exists to peel back that thin pseudonym and tie addresses to real people. Once one of your addresses is linked to you, your financial history unspools.

Zcash ilijengwa kujibu swali gumu la kudanganya:

> Je, tunaweza kuwa na pesa ambazo ni za kibinafsi kabisa, kuficha mtumaji, mpokeaji, na kiasi, wakati bado kuruhusu mtu yeyote kuthibitisha kwamba sheria zilifuatwa?

malengo hayo mawili mapigano kila mmoja. kitabu cha umma ni verifiable * kwa sababu * kila mtu anaweza kuona. faragha ina maana hakuna mtu anaweza kuiona. hivyo jinsi gani umma kuthibitisha kitu ni si kuruhusiwa kuangalia?

Kutatua hiyo paradox ni hadithi nzima ya mfululizo huu. Hebu kuanza.

---

## 2. Kuna dunia mbili ndani ya Zcash

Kabla ya kitu kingine chochote, eleza dhana potofu ya kawaida: ** Zcash sio "sarafu ya kibinafsi. " Ni sarafu ambayo inatoa faragha kama chaguo.** Kwa kweli ilianza maisha kama uma wa Bitcoin, na inabeba mifumo miwili sambamba kwenye blockchain moja.

♬ Dunia ya uwazi ♬ ♬ Ulimwengu wenye ulinzi ♬
|---|---|---|
Faragha. Umma, kama Bitcoin. Kibinafsi.
Anwani huanza na... `t...` | `z...` or `u...` |
Mtumaji / mpokeaji / kiasi. ** Inaonekana ** kwa kila mtu. ** Siri ** kutoka kila mtu
Teknolojia ya msingi, kitabu cha umma cha Bitcoin-style, ahadi za cryptographic + uthibitisho wa ujuzi wa sifuri.

Fedha inaweza hata kuvuka mpaka kati yao: kuhamisha fedha * katika * ulimwengu ulinzi inaitwa * kulinda *, na kuihamisha tena ni * unshielding *.

Ulimwengu wa uwazi ni "Bitcoin tayari unaelewa kwa kiasi kikubwa. " Ni ** ulimwengu ulinzi ** ambayo ina cryptography zote nzuri, na kwamba ni dunia tu mfululizo huu anajali kuhusu.

! [ alt maandishi](image-1.png)

---

## 3. Intuition: bahasha zilizofungwa kwenye ubao wa umma

Hapa kuna picha moja ya akilini ya kuendeleza kupitia makala iliyobaki. Tutarudi kwa hiyo daima.

Hebu wazia ubao mkubwa wa matangazo ambao kila mtu duniani anaweza kuuona wakati wowote.

* **Receiving money** means someone pins a **sealed, opaque envelope** to the board. Inside the envelope is *how much money it holds* and *a secret that only the recipient can read*, because the envelope is locked to that recipient's personal key. The whole world sees that *an envelope appeared*. Nobody but the owner can see what's inside.

* Bodi huendelea kukua, na bahasha mpya huwekwa juu ya bahasha hiyo milele.

* Kutumia pesa inamaanisha kutembea nyuma ya pazia, kuthibitisha * "Mimi mwenyewe moja ya bahasha unspent juu ya bodi hii, na mimi ni kuruhusiwa kufungua" *, kisha kuacha kipekee ** void ishara ** katika umma "imetumika" bin na pinning ** bahasha mpya ** kwa mtu yeyote wewe ni kulipa.

Desturi hiyo ndogo (kuweka ishara tupu, kuweka bahasha mpya, yote kutoka nyuma ya pazia) * ni* malipo ya Zcash. Kila kitu kingine ni maelezo.

Sasa hebu tuwape wale viungo majina yao halisi.

---

## 4. Majina matano

Maneno haya matano ni msamiati mzima wa Zcash kulindwa. Jifunze kama * hadithi *, si kama msamiato, na wao itakuwa fimbo.

Katika hadithi. Real Zcash neno. Nini ni kweli.
|---|---|---|
 Yaliyomo kwenye bahasha (kiasi + mmiliki + siri)  **Kumbuka**  "sarafu" ya kibinafsi: kipande cha thamani inayomilikiwa na mtu.
Muhuri uliofungwa, usio wazi kwenye ubao. Muhuri wa kisiri unaothibitisha kuwepo kwa bahasha huku ukificha yaliyomo ndani.
Bodi ya matangazo yenyewe ** mti wa kujitolea wa maelezo ** rekodi ya kiambatisho tu ya * kila maelezo yaliyowahi kuundwa *
Alama ya tupu katika "kutumia" bin. ** Nullifier **. alama ya kipekee maana "note hii sasa imetumika".
"Baada ya pazia" uchawi. ** Zero-ujuzi uthibitisho **. Ushahidi kwamba matumizi yote ni halali, kufunua hakuna wa hayo.

Kama unakumbuka kitu kingine chochote kutoka makala hii, kumbuka meza hii. Kila kitu ifuatavyo ni tu * kwa nini * kila kipande ina kuwa umbo njia ni.

---

## 5. Kwa nini kila kipande kina umbo lake

Hii ni sehemu ya wengi waelezaji kuruka, na ni hasa sehemu ambayo hutenganisha "mimi memorized baadhi ya maneno" kutoka "Mimi kuelewa kubuni". Kila moja ya vipande tano ipo kutatua ** tatizo moja maalum.**

### Kujitolea barua: kuficha yaliyomo, lakini kufanya bandia haiwezekani

Envelope ya kawaida inaweza kufunguliwa kwa mvuke. cryptographic ** not commitment ** haiwezi. Fikiria kama envelope * magically * muhuri, opaque kabisa na nguvu mbili:

- **Kuficha**: kuangalia bahasha iliyofungwa hakukuambii chochote kuhusu kiasi au mmiliki aliye ndani.
- ** Kufunga **: mara moja ni muhuri, maudhui haiwezi kubadilishwa. Huwezi baadaye kudai bahasha uliofanyika kiasi tofauti.

Kwa sasa, kukubali bahasha kama uchawi na kuendelea kusonga mbele.

### Nullifier: kweli smart kidogo

Wakati wewe kutumia noti, wewe kuchapisha yake null, "vifungo tupu". ishara hii ni mahesabu kutoka * noti yenyewe * na * ufunguo wako siri. * Hiyo mapishi hununua mali tatu wakati huo huo, na kila moja mambo:

1. **Mmiliki pekee anaweza kuunda.** Unahitaji ufunguo wa siri kwa mahesabu yake, hivyo hakuna mtu anaweza kutumia maelezo yako kwa ajili yenu.
2. ** Daima ni * sawa * ishara kwa ajili ya noti fulani.** Jaribu kutumia noti hiyo mara mbili na ungependa kuzalisha * kufanana * void ishara mara zote mbili, na umma "kutumia" bin tayari ina yake. Double-kutumia kukataliwa. 
3. ** Hakuna mtu anayeweza kufuatilia nyuma kwa bahasha yake.** ishara tupu inaonekana kabisa kuhusiana na bahasha ilitoka.

Hiyo mali ya tatu ni ** moyo wa faragha Zcash **, na anastahili sehemu yake mwenyewe chini.

### Uthibitisho wa ujuzi wa sifuri: pazia yenyewe

Kila kitu kinatokea nyuma ya pazia, na kile unachokipa ulimwengu baada ya hapo ni uthibitisho wa ujuzi wa sifuri, aina ya cheti kisichoweza kudanganywa.

- * envelope I'm spending really is pinned to the board * (it's a real, existing note), (ni halisi, inapatikana kwenye ubao)
- * Mimi ni kweli kuruhusiwa kufungua * (Mimi kushikilia ufunguo haki),
- * ishara yangu void ni mahesabu kwa usahihi * (hakuna cheating kuangalia mara mbili-matumizi),
- * envelopes yangu mpya kushikilia fedha sawa kama moja ya zamani *: ** hakuna fedha kuundwa kutoka kitu chochote. *

The miracle is that the proof reveals **none** of those facts. Not the amount, not the addresses, not which envelope. It only convinces you that *every statement above is true*. How that's even possible is **Article 5 (zero-knowledge proofs)**, the crescendo of the series.

---

## 6. Maisha ya noti moja

A note is *born*, it *lives* on the board, and eventually it *dies*, and crucially, its birth and its death look unrelated to anyone watching.

! [ alt maandishi](image-2.png)

---

## 7. Malipo, mwisho hadi mwisho

Hebu tuangalie Alice akimlipa Bob, na kila hatua ya umma na ya kibinafsi ikiwekwa alama.

! [ alt maandishi](image-4.png)

Angalia asymmetry ambayo inafanya kazi ya faragha:

- **Noti ya zamani ya Alice** inakufa kupitia *nullifier* katika bin kutumika.
- **Noti mpya ya Bob** imezaliwa kupitia *kujitolea* mpya kwenye bodi.
- Kwa kila mtu anayetazama, matukio haya mawili hayana uhusiano wowote unaoonekana.

> ** Jinsi gani Bob hata anajua yeye alikuwa kulipwa? ** noti yake ni encrypted * kwa ufunguo wake. * Yeye kuendelea scans bodi na tu * bahasha yake pop wazi kwa ajili yake, kama kuwa na ufunguzi moja kwamba inafaa seti maalum ya kufuli. * Mashine nyuma ya hii ni ** viewing funguo **, mada baadaye.

---

## 8. Kile ambacho ulimwengu unaona dhidi ya kile kinachobaki kikifichwa

Ukweli kuhusu malipo. Inaonekana kwa umma?
|---|---|
Hiyo * * ulinzi shughuli ilitokea. Ndiyo.
- Kwamba alitii sheria zote (hakuna bandia, hakuna matumizi mara mbili) - Ndiyo (kupitia uthibitisho)
Ni nani aliyetuma pesa hizo?
**Who** alipokea. Siri.
**Kiasi gani** kilipelekwa.
Ni noti ipi iliyotumika mapema? Imefichwa.

Hii ni azimio la utata kutoka Sehemu ya 1. umma kuthibitisha * sheria, * si * yaliyomo. * Ukaguzi na faragha kuacha mapigano, kwa sababu zero-ujuzi ushahidi utapata kuangalia zamani bila kugusa mwisho.

---

## 9. moyo wake: kwa nini bahasha na ishara tupu haiwezi kuunganishwa

Kama unaelewa wazo hili moja, unaelewa kwa nini Zcash ni binafsi. Soma polepole.

- ** bahasha (kujitolea) ** ni pinned kwa bodi wakati kumbuka ni ** kuzaliwa **.
- Nambari isiyo na maana (nullifier) inachukuliwa katika bin wakati noti hiyo hiyo inatumika, labda miezi baadaye.
- Zinatengenezwa kwa njia tofauti za siri, na hakuna hesabu ya umma ambayo hubadilisha moja kuwa nyingine.

Kwa hiyo mtazamaji wa nje anaona mkondo wa bahasha kuonekana na mkondo ya ishara tupu kuonekana, lakini hawawezi mechi yao up. Hawawezi kusema "tokeni tupu imeshuka leo inalingana na bahasha pinned Machi iliyopita". Kiungo ipo * tu * ndani ya maarifa siri ya mmiliki wa noti, na zero-ujuzi ushahidi unathibitisha kiungo ni halali * bila kufunua yake.*

Kiungo hicho kilichovunjika ni kitu ambacho kampuni za uchambuzi wa mlolongo hufurahia katika Bitcoin, na kitu ambacho Zcash hukata kwa makusudi.

> **Jaribu intuition yako:** Kama nullifiers walikuwa badala ya kuhesabiwa * tu * kutoka kwa kumbuka (hakuna siri muhimu kushiriki), ambayo ya mali tatu katika Sehemu ya 5 bila kuvunja, na kwa nini kwamba kimya kimya kuharibu faragha? * Jibu mwisho.) *

---

## 10. Kujitenga kwa unyoofu

This is a **mental model**, not the spec. To keep it newcomer-friendly we've quietly simplified several real things: Zcash has had multiple shielded designs (Sprout, then Sapling, now Orchard); real transactions can spend and create *several* notes at once; "the board" is technically a specific kind of tree, not a literal pinboard; and value balance is enforced with some additional cryptographic bookkeeping. None of those details change the story you just learned; they refine it. We'll add the precision back, one article at a time, and flag clearly whenever we do.

Maudhui mazuri ya elimu hupata uaminifu kwa kusema kile kilichopotea. Sehemu hii ni ahadi hiyo.

---

## 11. Loops sisi kufunguliwa (ramani yako ya mfululizo)

Kila "tutarudi kwa hili" hapo juu ni thread. Hapa ni ambapo kila mmoja anapata amefungwa:

! [ alt maandishi](image-29.png)

◯ Mwisho wa makala hii. ◯ Maelezo ya kina.
|---|---|
Jinsi gani bahasha iliyofungwa inaweza kufichwa * na * haiwezi kudanganywa?
Makala 1 na 2: mashamba na curves.
Makala ya 4: Merkle miti.
Jinsi gani unaweza kuthibitisha kitu bila kufunua chochote? Kifungu cha 5: zero-maarifa uthibitisho.
Jinsi gani vipande vyote vitano snap pamoja katika Zcash halisi? Makala 6: Shielded itifaki.

---

## 12 Muhtasari

- Bitcoin ni ** uwazi **; Zcash inatoa ** ulinzi ** ulimwengu ambapo mtumaji, mpokeaji, na kiasi ni siri.
- Utata dhahiri (* faragha bado hadharani verifiable *) ni hatua nzima, na ni solvable.
- Malipo ya kulindwa ni vipande vitano vya kuingiliana: **note** (sarafu), **note commitment** (bao lililofungwa), **not commitment tree** (bodi ya umma), **nullifier** (alama isiyo na maana ambayo inazuia matumizi mara mbili), na **zero-knowledge proof** (kifuniko ambacho kinathibitisha uhalali bila kufunua chochote).
- Faragha mwishowe hutegemea ** kiungo kimoja kilichokatwa **: hakuna mtu nje anayeweza kuunganisha kuzaliwa kwa noti (kujitolea) na kifo chake (nullifier).
- Umma unathibitisha sheria, si yaliyomo.

Sasa unashikilia ramani hiyo. Mfululizo unaobaki hujaza ramani.

---

## Orodha ya maneno

Neno. Maana ya Kiingereza ya kawaida.
|---|---|
** Kumbuka ** ** kitengo binafsi ya thamani, Zcash ni sawa na sarafu au muswada.
** Nakala ya dhamana ** muhuri cryptographic kwamba inathibitisha noti ipo bila kufunua ni.
| **Note commitment tree** | The append-only public record of all note commitments |
** Nullifier **. kipekee "matumizi" marker kuchapishwa wakati noti ni kutumika, kuzuia mara mbili matumizi.
** Ushahidi wa ujuzi wa sifuri** Ushahidi kwamba taarifa ni ya kweli wakati haidhihirishi chochote zaidi ya ukweli wake.
Kuhamisha fedha katika / nje ya ulimwengu binafsi shielded.
** Kuangalia ufunguo ** Ufunguo kwamba inaruhusu mmiliki kugundua na kusoma maelezo kushughulikiwa kwao.

---

## FAQ

** Je, Zcash daima binafsi? **
No. faragha inatumika kwa * shielded * dunia (`z...`/`u...` anwani). Uwazi (`t...`) shughuli ni ya umma, kama Bitcoin.

Ikiwa kila kitu kimefichwa, ni nini kinachomzuia mtu kuchapisha pesa bure?
Uthibitisho wa ujuzi wa sifuri, unawalazimisha kwa hesabu matokeo ya kila shughuli kuungwa mkono na mapato halisi, ambayo hayajatumika, * wakati * kuweka kiasi cha siri.

** Je, noti ileile inaweza kutumiwa mara mbili?**
Hapana. Kutumia noti kuchapisha null yake; jaribio la pili itakuwa kuchapishwa null sawa, ambayo ni tayari katika "matumizi" bin, hivyo mtandao inakataa yake.

** Je, watu wa nje wanaweza kuunganisha mtumaji na mpokeaji?**
Hapana, dhamira (kuzaliwa kwa noti) na kufuta (kifo cha noti) haziwezi kulinganishwa na mtu yeyote bila ujuzi wa siri wa mmiliki.

---

### Jibu la mtihani wa intuition (Sehemu ya 9)

Kama nullifier walikuwa mahesabu * tu * kutoka maelezo, na hakuna siri muhimu, basi ** mtu yeyote ** anaweza kuhesabu ni, kuvunja mali # 1 (tu mmiliki anaweza kutumia). mbaya zaidi, nultifier sasa itakuwa derivable moja kwa moja kutoka taarifa ya umma kuhusu maelezo, ambayo inaweza basi watazamaji ** kuunganisha nullifer nyuma kwa ahadi yake **, kukiuka mali # 3 na kimya kimya unraveling faragha ya mfumo mzima. siri muhimu ni nini hufanya tupu ishara zote mbili * peke yako * na * unlinkable. *

---

### Ni nini kinachofuata

** Kifungu cha 1. mashamba Finite: ** ajabu, nzuri idadi mfumo ambapo hesabu "wrapples kuzunguka", na sababu kila kipande cha cryptography katika mfululizo huu anaishi huko. Tutaanza, kama siku zote, na intuition, hakuna fomula mpaka wao ni chuma.

* Sehemu ya * Zcash kutoka Kanuni za Kwanza * mfululizo kwa [ZecHub](https://zechub.org). Leseni CC BY-SA 4.0.*

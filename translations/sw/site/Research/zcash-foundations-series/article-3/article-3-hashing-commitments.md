# Kushiriki na ahadi: bahasha ya kichawi iliyofungwa
##### Utafiti wa awali kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

! [ alt maandishi](image-15.png)

### Jinsi ya kufunga siri katika umma na kamwe kuwa na uwezo wa uongo kuhusu hilo

> **Series:** *Zcash kutoka Kwanza Kanuni* . **Kifungu cha 3 .
> Sisi kujenga juu ya [Kifungu cha 1 (maeneo ya mwisho)](article-1-finite-fields.md) na [Kifungu cha 2 (curves elliptic)](article-2-elliptic-curves.md), lakini intuition anasimama peke yake.
> Nini wewe kuondoka na: uelewa wazi wa kazi hash, nini "kuficha" na "kufunga" kweli maana, na jinsi Zcash hujenga ahadi kumbuka kwamba nanga kila malipo binafsi.

Katika [Kifungu cha 0](article-0-shielded-transaction.md) sisi ilivyoelezwa "kibao cha kichawi kufungwa": kitu unaweza pini kwa bodi ya umma kwamba inathibitisha bahasha ipo wakati kuficha nini ndani, na ambayo unaweza kamwe kubadilishana nje baadaye. Tuliahidi kueleza jinsi jambo kama hilo inawezekana. Hii ni makala hiyo. Tunahitaji viungo viwili: ** kazi hash ** na ** ahadi **.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Fikiria wewe kutabiri matokeo ya uchaguzi na wanataka kuthibitisha, * baada ya *, kwamba wewe kuitwa ni mapema. Huwezi tu kutangaza utabiri wako (ambayo huathiri watu, au inakaribisha mashtaka wewe iliyopita). Na huwezi kuiweka siri kabisa (basi huwezi kuthibitisha chochote baadaye).

Nini unataka ni njia ya ** lock katika thamani sasa, katika umma, kama kwamba:**

- hakuna mtu anaweza kujua nini wewe imefungwa ndani (ni anakaa siri kwa sasa), na
- Baadaye, unapoifunua, huwezi kusema uwongo kuhusu jinsi ilivyokuwa.

Hii "kufunga sasa, kufunua baadaye, hakuna uongo" gadget inaitwa ahadi, na ni kila mahali katika Zcash. noti ya thamani na mmiliki ni imefungwa katika ahadi wakati noti ni kuundwa. kujenga ahadi, sisi kwanza haja workhorse yao: hash kazi.

---

## 2. Intuition: alama ya vidole kwa ajili ya data

kazi ** hash ** inachukua data yoyote wakati wote, herufi moja au maktaba nzima, na crushes chini ya mfululizo mfupi, fasta-saizi aitwaye ** digest ** au ** hash. Fikiria kama alama ya vidole kwa ajili ya data.

! [ alt maandishi](image-16.png)

Fingerprint encryptographic nzuri ina mali nne. kushikilia yao kama intuitions, si equations:

Mali. Maana ya kawaida. Kwa nini ni muhimu.
|---|---|---|
**Deterministic** Ingizo sawa daima hutoa alama sawa ya kidole. Unaweza kuangalia upya alama ya kidoleshi wakati wowote.
** Fast mbele **. Kompyuta alama ya vidole ni ya haraka. Vitendo kutumia kila mahali.
** One-way (preimage resistant) ** kutokana na alama ya vidole, huwezi kupata pembejeo kwamba alifanya hivyo. Anaficha data ya awali.
Hakuna mtu anayeweza kufananisha alama mbili za vidole.

Na tabia moja zaidi ambayo hufanya alama za vidole kuhisi karibu kichawi:

### Athari ya mvua ya mawe (iliyothibitishwa)

Kubadilisha pembejeo kwa kiasi kidogo na mabadiliko ya alama ya vidole * kabisa *, bila kufanana na zamani. Hapa ni mbili halisi SHA-256 alama za kidole ya ujumbe tofauti na herufi moja:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Out of 64 hex digits, **59 are different.** One character in, an entirely unrelated fingerprint out. This is why you cannot nudge an input toward a target fingerprint: there's no "warmer / colder" signal to follow.

---

## 3. Kutoka alama za vidole hadi wajibu

Hapa ni wazo la kushawishi lakini kuvunjwa: kujitolea kwa thamani ya siri `v`, tu kuchapisha fingerprint yake `H(v)`.

Hii * binds * wewe vizuri (unaweza baadaye kudai tofauti `v`, kwa sababu hiyo ingehitaji mgongano). Lakini ** inashindwa kujificha.** Kama seti ya thamani iwezekanavyo ni ndogo, mshambuliaji tu fingerprints kila mgombea na kulinganisha. Kujitolea kwa "ndiyo" au "hapana"? Wao hash wote na mara moja kujifunza ambayo wewe alichagua. determinism, rafiki yetu dakika iliyopita, sasa kuvuja siri.

Suluhisho ni neno moja: ** randomness. **

> ** ahadi ni alama ya vidole ya thamani yako mchanganyiko na idadi safi random: **
> `commitment = H(v, r)` ambapo `r` ni siri random "kupofusha" thamani.

Sasa sawa `v` inazalisha tofauti-kuangalia ahadi kila wakati, kwa sababu `r` Sifa mbili tulitaka hatimaye wote kushikilia:

! [ alt maandishi](image-17.png)

** Kufungua ** (kufunua) ahadi baadaye, wewe kuchapisha `v` na `r`; mtu yeyote recalculates `H(v, r)` Hiyo ni bahasha ya kichawi iliyofungwa kutoka kwa Kifungu cha 0, iliyofanywa kuwa halisi.

> **Two takeaways kubeba milele:** *binding* linatokana na hash kuwa mgongano sugu; *kuficha* inatokana na random blinding sababu `r`.

---

## 4. Njia mbili za kujenga bahasha

Kuna mapishi mawili ya kawaida, na Zcash hutumia zote mbili.

∙∙∙Hash-based Commitment ∙Pedersen commitment (kutoka Article 2) ∙
|---|---|---|
Kichocheo `H(v, r)` | `v.G + r.H` (Inaashiria kwenye curve)
Kujificha kutokana na... `r` Kwa bahati mbaya `r` |
Kuunganisha kutoka kwa upinzani wa mgongano mlango wa mtego wa curve ya elliptic (ECDLP)
Nguvu maalum. Rahisi na haraka. ahadi ** kuongeza up ** (homomorphic).

Hiyo safu ya mwisho ni kwa nini ahadi Pedersen umuhimu sana katika Zcash. Kwa sababu `commit(v_1) + commit(v_2)` ni halali `commit(v_1 + v_2)`, itifaki inaweza baadaye kuthibitisha kwamba ** fedha katika sawa fedha nje ** kwa kuongeza ahadi pamoja, wote bila kufunua kiasi moja. Sisi ni kuhifadhi ukweli kwamba kwa Ibara ya 6.

---

## 5. subtlety kwamba maumbo yote ya Zcash: ZK-kirafiki hashing

Hapa ni ufahamu wengi utangulizi miss, na ni hasa "hisabati hukutana uhandisi" uhakika thamani ya kuonyesha.

SHA-256 is a superb fingerprint for everyday computing. But Zcash doesn't just *compute* hashes; it has to **prove, inside a zero-knowledge proof, that a hash was computed correctly** (Article 5 explains why). And here's the catch: a zero-knowledge proof works in the language of **finite-field arithmetic** (Article 1), while SHA-256 is built from bit-twiddling operations (shifts, ANDs, XORs). Expressing all that bit-twiddling in field arithmetic is enormously expensive, making proofs huge and slow.

Hivyo Zcash cryptographers iliyoundwa kazi hash ambao ndani ni * tayari * uwanja arithmetic, na kuifanya nafuu kuthibitisha:

! [ alt maandishi](image-18.png)

Hii moja ya uhandisi shinikizo, * "ni lazima kuwa na gharama nafuu kuthibitisha",* ni kwa nini Zcash zuliwa na kupitishwa maalum hash kazi badala ya kufikia kwa SHA-256 kila mahali.

---

## 6. Ambapo hii anaishi katika Zcash

Zcash ametumia hashes tofauti katika miundo yake, kila mmoja alichaguliwa kwa kazi hiyo:

Design. Hashes kutumika ambapo.
|---|---|---|
**Sprout** (mwanzoni) **SHA-256** **Kumbuka ahadi na mti
**Sapling** **Pedersen hashes**, pamoja na **BLAKE2**. Pedersen kwa ajili ya mikataba ya maelezo na mti Merkle; BLAKE 2 kwa ajili muhimu derivation na nullifiers.
**Orchard** (sasa) **Sinsemilla**, pamoja na **Poseidon**. Sinsemila kwa ajili ya mikataba ya maelezo na mti Merkle; Poseidon kwa nullifier, yote iliyoundwa kwa mizunguko arithmetic.

Majina ya kutambua ni ** Pedersen ** na ** Sinsemilla ** (kufunga-style hashes kujengwa kutoka pointi curve, hivyo kurithi "anaongeza" superpower na kuthibitisha nafuu) na ** Poseidon ** (shamba-arithmetic hash kusudi-kujengwa kwa ajili ya zero-maarifa circuits). Wakati Ibara 0 alisema maudhui ya kumbuka ni muhuri katika ahadi, * hii * ni mashine kufanya muhuri.

Hivyo kitanzi wazi kutoka Ibara ya 0, * "jinsi unaweza bahasha muhuri kuficha yaliyomo yake bado kuwa haiwezekani kwa ajili ya bandia?" *, Sasa imefungwa: ** kujificha kutoka kwa sababu blinding random, binding kutoka upinzani mgongano au curve trapdoor. *

---

## 7. Kujitenga kwa unyoofu

Sisi kurahisisha kuweka mambo wazi. mipango halisi ahadi kufafanua hasa jinsi `v` na `r` are encoded and which generators are used; "hiding" and "binding" each come in flavours (perfect vs computational) with precise security definitions; and we didn't show the internals of Pedersen, Sinsemilla, or Poseidon. None of that changes the intuition: a commitment is a fingerprint plus randomness that hides now and binds forever. The details return, flagged, when the protocol article needs them.

---

## 8. Muhtasari

- A **hash function** is a **fingerprint for data**: deterministic, fast forwards, one-way, collision resistant, with an **avalanche effect** (one bit in, a totally different fingerprint out).
- A ** kujitolea ** utapata ** lock thamani katika umma sasa na kufunua baadaye bila kuwa na uwezo wa uongo.
- Kuchapisha alama za vidole `H(v)` inaunganisha lakini haina ** si ** kujificha. Kuongeza random blinding sababu, `H(v, r)`, hurekebisha kwamba: ** kujificha kutoka `r`, kuunganisha kutoka upinzani mgongano.**
- Zcash anatumia wote wawili ** hash-msingi ** na ** Pedersen ** ahadi; Pedersen ahadi kuongeza ** kuongeza up **, ambayo Ibara ya 6 itatumia kuthibitisha thamani ya usawa binafsi.
- Kwa sababu hashes lazima ** kuthibitishwa ** ndani ya zero-maarifa uthibitisho, Zcash anatumia ** ZK-kirafiki ** hashes kujengwa kutoka uwanja hesabu (Pedersen **, Sinsemilla **, Poseidon **) badala ya SHA-256 kila mahali.

---

## Orodha ya maneno

Neno. Maana ya Kiingereza ya kawaida.
|---|---|
** kazi ya hash **. crushes data yoyote katika fupi fixed-ukubwa alama ya vidole (digest).
** Digest **. pato alama ya vidole ya kazi hash.
** Upinzani wa picha ya awali ** Huwezi kurudisha digest nyuma kwa pembejeo yake (njia moja).
** Upinzani wa mgongano **. Huwezi kupata pembejeo mbili na digest sawa.
Mabadiliko madogo ya pembejeo hubadilisha kabisa digest.
Kufunga thamani sasa, kufunua baadaye, hawezi kusema uongo kuhusu hilo.
** Kiungo cha upofu (`r`) **. Nambari safi ya nasibu ambayo hufanya ahadi kuficha.
** ZK-kirafiki hash ** A hash kujengwa kutoka uwanja hesabu hivyo ni nafuu kuthibitisha.

---

## FAQ

** Kwa nini si tu encrypt thamani badala ya ahadi yake? **
Encryption ni kuhusu *usiri unaweza baadaye decrypt.* ahadi ni kuhusu #binding*: dhamana kwamba huwezi kubadilisha jibu lako baadaye. kazi tofauti.

** Kama ahadi kuficha thamani, jinsi gani mtu yeyote kuangalia sheria? **
Hiyo ni jukumu la zero-ujuzi uthibitisho (Kifungu cha 5): wao kuthibitisha thamani ya siri hutii sheria bila kufunua yake.

** Je, SHA-256 kuvunjwa, tangu Zcash kuepuka ni katika maeneo? **
Hapana SHA-256 ni nzuri na Zcash bado inatumia ni tu ghali kwa * kuthibitisha ndani ya mzunguko *, ambayo ni kwa nini ZK-kirafiki hashes zipo kwa kazi hiyo maalum.

**Wapi random `r` linatoka wapi, na ni nani anayelitunza?**
Ni yanayotokana na safi wakati kumbuka ni kuundwa na inayojulikana kwa kumbuka ya mmiliki. Ni sehemu ya nini hufanya kila kumbuka kipekee na binafsi.

---

### Jaribu ufahamu wako wa ndani

Unajitolea kwa utabiri wako wa uchaguzi kama `H(v, r)` rafiki anasisitiza unapaswa kuchapisha tu `H(v)` Katika sentensi moja, kwa nini ni wazo mbaya kama kuna tu matokeo mawili iwezekanavyo? * ((Jibu chini.) *

<details><summary>Answer</summary>

Kwa matokeo mawili tu, rafiki yako anaweza tu mahesabu `H("win")` na `H("lose")` wao wenyewe na kulinganisha dhidi ya kuchapishwa yako digest, mara moja kujifunza utabiri wako. hash wazi huunganisha lakini haina kujificha; random `r` ni nini stops hii guess-na-kuangalia mashambulizi.
</details>

---

### Ni nini kinachofuata

**Article 4 . Merkle trees:** we now have millions of commitments piling up. Article 4 shows how Zcash organizes them into a single tree whose tiny root fingerprint stands in for the entire history, and how you can prove your note is in that tree without revealing which one. That's the real shape of Article 0's "public board."

* Sehemu ya * Zcash kutoka Kanuni za Kwanza * mfululizo kwa [ZecHub](https://zechub.org). Leseni CC BY-SA 4.0.*

# Miti ya Merkle: Jinsi blockchain inakumbuka kila noti
##### Utafiti wa awali kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

! [ alt maandishi](image-19.png)

### Kujumlisha mamilioni ya ahadi katika alama moja ndogo ya kidole

> **Series:** *Zcash kutoka Kanuni za Kwanza* . **Kifungu cha 4 .
> Sisi kujenga juu ya [Kifungu cha 3 (hashing na ahadi)](article-3-hashing-commitments.md)Kama unajua nini alama za vidole na ahadi ni, uko tayari.
> ** Nini wewe kuondoka na: ** intuitive, sahihi picha ya Merkle miti, jinsi ya kuthibitisha uanachama bila kufunua ambayo kipengee maana, na hasa jinsi hii inakuwa Zcash ya kumbuka ahadi mti.

[Kifungu cha 0](article-0-shielded-transaction.md) lakini kwa kweli, kuna mambo mengi sana ambayo huwezi kuyatambua, kama vile jinsi unavyoweza kupata maelezo ya kina juu ya kila kitu ambacho umefanya, au jinsi unavyopata taarifa kuhusu kila kitu unachofanya.

---

## 1. Kwa nini unapaswa kuhangaikia jambo hilo?

Matatizo mawili hutokea wakati ambapo una orodha kubwa ya ahadi za umma.

**Tatizo la kwanza: uadilifu kwa kiwango.** Ikiwa orodha ina viingilio milioni 300, ni jinsi gani mtu yeyote kuthibitisha kwamba * hakuna moja * imebadilishwa kwa siri? Kuangalia tena vitu milioni 300 kila wakati hakuna matumaini.

**Tatizo la pili: ushirika wa kibinafsi.** Kutumia noti (Kifungu cha 0), lazima uthibitishe kujitolea kwako ni kweli kwenye bodi. Lakini ikiwa unaonyesha ("ni nambari ya kuingia 4,201,337!"), umejiondoa tu. Unahitaji kuthibitisha *" bahasha yangu iko mahali fulani kwenye bodi hii "* bila kufunua ** ambayo ** moja.

Mti wa Merkle hutatua yote mawili kwa wakati mmoja, hufupisha orodha nzima kuwa alama moja ya vidole, na hukuruhusu kuthibitisha uanachama kwa uthibitisho mdogo wa kuficha nafasi.

---

## 2. Intuition: mashindano ya alama za vidole

Fikiria mzunguko wa mashindano ya knockout, lakini badala ya wachezaji kusonga mbele, alama za vidole huunganishwa.

- Chini, kila kipande cha data anapata fingerprint yake mwenyewe (hash yake kutoka Ibara ya 3).
- Jozi yao. alama mbili za kila jozi ni hashed * pamoja * katika moja ya mzazi alama ya kidole.
- Waunganishe wazazi wawili wawili, weka kila jozi pamoja, na kadhalika.
- Endelea mpaka alama moja ya vidole ikae juu.

! [ alt maandishi](image-20.png)

Mali moja muhimu zaidi inafuata moja kwa moja kutoka athari ya mvua ya mawe (Kifungu cha 3):

> **The root is a fingerprint of *everything* below it.** Change any leaf, even by one bit, and its fingerprint changes, which changes its parent, which changes *that* parent, all the way up. **The root changes.** So one small root value certifies the integrity of the entire list. That solves Problem one.

---

## 3. Mti halisi, uliopimwa kwa usahihi

Hebu kujenga mti nne-leaf juu na halisi SHA-256 alama za vidole juu ya majani `A, B, C, D` (digests inaonyeshwa truncated kwa uwazi):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Kila kitu ni tu "hash kitu, kisha hash jozi ya hashes. " Hakuna kitu zaidi ya kigeni kuliko Ibara ya 3, kupangwa katika mti.

---

## 4. Sehemu ya busara: kuthibitisha uanachama bila kufunua nafasi

Sasa tatizo la pili. Sema unataka kuthibitisha kwamba jani `C` Ni katika mti, kwa mtu ambaye anajua tu ** mzizi **. Wewe * si * kutoa yao mti mzima. Wewe kutoa yao tu alama za vidole zinahitajika kupanda kutoka `C` kwa mizizi, aitwaye **authentication njia** (au **Merkle uthibitisho**):

> Ili kuthibitisha `C` ni katika mti, kutoa:
> - ndugu yake `hD`, na
> - mjomba wake `hAB`.

Verifier, kujua tu mizizi, recalculates kupanda:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Imehesabiwa kwa kweli: hii inazalisha `1b3faa3fcc5e...`, ambayo ** mechi mizizi. * * jani ni kuthibitika kuwa katika mti.

! [ alt maandishi](image-21.png)

Vitu viwili vinafanya hii iwe na nguvu:

- **Ni ndogo.** Kwa majani 4 wewe zinazotolewa 2 hashes. `n` majani wewe kutoa tu kuhusu **log_2(n) ** hashes. Kwa bilioni majani, hiyo ni takribani **30 hashes, si bilioni. ushahidi ni vigumu kukua kama mti kulipuka katika ukubwa.
- **It's the seed of privacy.** The proof shows your leaf is *somewhere* in the tree. When this same check is performed *inside a zero-knowledge proof* (Article 5), even the path itself is hidden, so you prove "my note is in the tree" while revealing neither the note nor its position. That fully solves Problem two.

---

## 5. Kutoka mti wa Merkle hadi mti wa ahadi ya noti ya Zcash

Sasa tunaweza kusema kwa usahihi kile "baraza la umma" la Kifungu cha 0 ni kweli:

> Mti wa kujitolea ** ni mti wa Merkle ambao ** majani yake ni ahadi za noti. * Kila wakati maelezo yanapoundwa mahali popote ulimwenguni, ahadi yake imeongezwa kama jani linalofuata, na mzizi unasasishwa.

Maelezo machache halisi:

- Mti huu unaitwa mti wa Merkle unaoongezeka.** (Inalingana na Kifungu cha 0 "bodi haibomoi chochote kamwe".)
- ** mzizi inaitwa * nanga * * Wakati matumizi, shughuli yako marejeo nanga hivi karibuni na inathibitisha, katika ujuzi sifuri, kwamba dhamira yako kumbuka ya anakaa katika mti na mzizi kwamba.
- **Fixed kina.** miti Zcash ya ulinzi na kina **32**, maana wao wanaweza kushikilia hadi `2^(32)` (zaidi ya bilioni nne) noti.
- **ZK-kirafiki hashing.** Mti si kujengwa na SHA-256. Sapling hashes mti na **Pedersen hashes** na Orchard anatumia **Sinsemilla** (wote kutoka Ibara ya 3), hasa hivyo uanachama kupanda ni nafuu kuthibitisha ndani ya mzunguko.

! [ alt maandishi](image-22.png)

### Jambo moja mti *hatutumii*: hutumia mara mbili

The tree proves a note **exists**. It does not, by itself, stop you from spending the same note twice. That job belongs to the **nullifier set** from Article 0: a separate collection of "void tokens." When you spend, you publish the note's nullifier, and the network rejects any nullifier it has seen before.

Kwa hiyo miundo miwili ya umma ina jukumu la ziada, na kuwaweka kando ni nini hasa hukata uhusiano kati ya kuzaliwa kwa noti na kifo chake:

Muundo. Maswali na majibu. Updated wakati.
|---|---|---|
**Note kujitolea mti** "Je, hii kumbuka ipo?" A kumbuka ni ** kuundwa ** (kujitolea imeambatanishwa)
** Nullifier kuweka ** "Je, noti hii tayari kutumika?" A noti ni ** kutumika ** (nullifier kuchapishwa)

---

## 6. Kujitenga kwa unyoofu

Simplifications, as usual. Real incremental Merkle trees track "frontier" nodes so the root can update without rebuilding everything; the network keeps a window of recent anchors, not just the latest, so wallets aren't broken by every new block; and empty leaves use a defined padding value. We also drew binary trees with neat powers of two. None of this changes the intuition: leaves of commitments, hashed in pairs up to one root, with short membership proofs. The exact bookkeeping returns in the protocol article.

---

## 7. Muhtasari

- **Merkle mti** hashes data katika ** majani, kisha hashes ** jozi juu hadi ** moja mizizi bado.
- Thanks to the avalanche effect, the **root is a fingerprint of the entire list**: change one leaf and the root changes. One small value certifies a huge dataset.
- A ** uthibitisho wa uanachama (njia ya uthibitishaji) ** ni tu ndugu pamoja na kupanda kwa mizizi, kuhusu ** log_2 ((n) ** hashes, hivyo ushahidi kubaki ndogo hata kwa mabilioni ya majani.
- Alifanya ** ndani ya zero-ujuzi uthibitisho **, kwamba uanachama kuangalia anaficha * ambayo * jani unamaanisha, kuthibitisha "kumbuka yangu ni katika mti" bila kuonyesha maelezo au nafasi yake.
- Zcash ya ** note ahadi mti ** ni ** incremental ** Merkle mti wa maelezo ahadi, kina ** 32 **, ambao mzizi ni ** nanga **; Sapling hashes ni na ** Pedersen ** na Orchard na ** Sinsemilla **.
- Mti inathibitisha ** kuwepo **; tofauti ** nullifier kuweka ** inazuia ** mara mbili-inatumia **. Kuweka yao mbali ni nini unlinks kuzaliwa noti ya kutoka kifo chake.

---

## Orodha ya maneno

Neno. Maana ya Kiingereza ya kawaida.
|---|---|
Mti wa Merkle. Mti ya hashes; majani ni data alama za vidole, wazazi hash watoto wao.
** Leaf **. A chini node; katika Zcash, moja kumbuka ahadi.
** Mzizi wa Merkle ** alama moja ya juu ya kidole inayojumlisha mti mzima.
** Authentication path / Merkle proof** The sibling hashes needed to prove a leaf is in the tree. ** Njia ya uthibitisho / uthibitishaji wa Merkle**
** Mti wa Merkle unaoongezeka **. Mti unaongeza tu Merkle (majani huongezwa tu)
** Anchor **. a Merkle mizizi ambayo matumizi marejeleo kama "mti hali mimi ni kuthibitisha dhidi ya".
** Nullifier kuweka ** The tofauti mkusanyiko wa alitumia-markers kwamba kuzuia mara mbili-inatumia.

---

## FAQ

** Kwa nini mti na si tu orodha ndefu ya hashes? **
orodha gorofa ingekuwa kuwalazimisha kufichua au mchakato kila kuingia kuthibitisha uanachama. mti inakupa ushahidi logarithmic-ukubwa na mzizi moja kwa uadilifu.

** Je, verifier haja mti mzima? **
La. kuthibitishwa tu mahitaji ya ** mizizi ** pamoja na njia yako short uthibitishaji. Hiyo ni hatua nzima.

** Kwa nini kina cha 32 hasa? **
Inazuia mti kwa takriban bilioni nne za noti, ambayo ni nafasi kubwa ya kichwa, wakati wa kuweka uthibitisho wa uanachama (na gharama yake ya ndani ya mzunguko) saizi iliyowekwa, inayoweza kudhibitiwa.

** Ikiwa mzizi hubadilika na kila noti mpya, uthibitisho wa zamani unabakije halali?**
The network remembers a window of recent roots (anchors), so a proof made against a slightly older anchor still verifies. The protocol article makes this precise.

---

### Jaribu ufahamu wako wa ndani

Katika mti wetu wenye majani manne, tuseme mshambuliaji anabadili majani kisiri `C` kwa thamani tofauti lakini huacha mzizi kuchapishwa unchanged. Nini huenda vibaya kwa ajili yao, na kwa nini hawawezi kurekebisha kimya kimya? * ((Jibu chini.) *

<details><summary>Answer</summary>

Kubadilika `C` mabadiliko `hC` (athari barafu), ambayo mabadiliko `hCD = H(hC, hD)`, ambayo mabadiliko `ROOT = H(hAB, hCD)`. Hivyo recalculated mizizi tena mechi ya kuchapishwa mizizi, na tampering ni aligundua. "Kufanya kurekebisha kimya kimya" wao ingekuwa haja ya kupata tofauti `C` ambayo inazalisha *same* `hC`, ambayo ni mgongano wa hash, haiwezekani kwa Makala 3. uadilifu ana.
</details>

---

### Ni nini kinachofuata

Makala ya 5 . Zero-ujuzi uthibitisho: crescendo. Sisi sasa kujengwa maelezo, ahadi, na mti, na sisi kuendelea kusema "uthibitisho katika zero maarifa". Makala 5 hatimaye anaelezea jinsi gani unaweza kuthibitisha taarifa ni kweli, kwamba kumbuka yako ni katika mti, kwamba nullifier yako ni sahihi, kwamba fedha mizani, wakati akifunua hakuna wa hayo.

* Sehemu ya * Zcash kutoka Kanuni za Kwanza * mfululizo kwa [ZecHub](https://zechub.org). Leseni CC BY-SA 4.0.*

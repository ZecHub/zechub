# Miti ya Merkle [Merkle Trees]: Jinsi Blockchain Hukumbuka Kila Dokezo
##### Utafiti Asili kutoka [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-19-cfbdcf8f78.webp)

### Kufupisha commitment milioni nyingi katika alama moja ndogo ya kipekee

> **Mfululizo:** *Zcash kutoka Kanuni za Msingi* . **Makala ya 4 . Miti ya Merkle**
> **Hadhira:** wanaoanza. Tunaendeleza kutoka [Makala ya 3 (kuweka hash na commitment)](article-3-hashing-commitments.md). Ikiwa unajua alama ya kipekee na commitment ni nini, uko tayari.
> **Utachojifunza:** picha sahihi na inayoeleweka ya miti ya Merkle, jinsi ya kuthibitisha uanachama bila kufichua ni kipengee gani unachomaanisha, na hasa jinsi hii inavyokuwa mti wa note commitment wa Zcash.

[Makala ya 0](article-0-shielded-transaction.md) ilieleza “ubao wa umma” unaoshikilia kila dokezo lililowahi kuundwa na unaoendelea kukua pekee. Kufikia sasa unaweza kukisia kinachobandikwa humo: **commitment** (Makala ya 3), bahasha zilizofungwa. Lakini ubao halisi ungeshikilia *mamia ya mamilioni* yake. Mtandao unahifadhije hayo, kuyathibitishaje, na kukuruhusu kuthibitisha bahasha yako iko ubaoni bila kuielekeza? Jibu ni mojawapo ya miundo maridadi zaidi katika sayansi ya kompyuta: **mti wa Merkle [Merkle tree].**

---

## 1. Kwa nini unapaswa kujali?

Matatizo mawili hujitokeza mara tu unapokuwa na orodha kubwa ya umma ya commitment.

**Tatizo la kwanza: uadilifu kwa kiwango kikubwa.** Ikiwa orodha ina ingizo milioni 300, mtu yeyote anathibitishaje kuwa *hakuna hata moja* lililobadilishwa kwa siri? Kukagua upya vipengee milioni 300 kila unapoitazama haiwezekani.

**Tatizo la pili: uanachama wa faragha.** Ili kutumia dokezo (Makala ya 0), lazima uthibitishe commitment yako iko ubaoni kweli. Lakini ukiielekeza (“ni ingizo namba 4,201,337!”), umeondoa utambulisho wako usiojulikana. Unahitaji kuthibitisha *“bahasha yangu iko mahali fulani kwenye ubao huu”* bila kufichua **ipi**.

Mti wa Merkle hutatua yote mawili kwa wakati mmoja. Unafinyaza orodha nzima kuwa alama moja ya kipekee, na hukuruhusu kuthibitisha uanachama kwa thibitisho dogo linaloficha nafasi.

---

## 2. Intuisheni: mashindano ya alama za kipekee

Fikiria jedwali la mashindano ya mtoano, lakini badala ya wachezaji kusonga mbele, **alama za kipekee huunganishwa.**

- Chini kabisa, kila sehemu ya data hupata alama yake ya kipekee (hash yake kutoka Makala ya 3). Hizi ndizo **majani [leaves].**
- Ziunganishe kwa jozi. Alama mbili za kipekee za kila jozi huwekwa hash *pamoja* kuwa alama moja ya kipekee ya mzazi.
- Unganisha wazazi kwa jozi, weka hash kila jozi pamoja, na kuendelea.
- Endelea hadi **alama moja ya kipekee** ibaki juu. Bingwa huyo ni **mzizi wa Merkle [Merkle root].**

![alt text](/content-images/image-20-f5d57e425a.webp)

Sifa moja muhimu zaidi hutokana moja kwa moja na athari ya maporomoko (Makala ya 3):

> **Mzizi ni alama ya kipekee ya *kila kitu* kilicho chini yake.** Badilisha jani lolote, hata kwa biti moja, na alama yake ya kipekee hubadilika, jambo linalobadilisha mzazi wake, ambalo hubadilisha mzazi *huyo*, hadi juu kabisa. **Mzizi hubadilika.** Hivyo thamani moja ndogo ya mzizi huthibitisha uadilifu wa orodha nzima. Hilo hutatua Tatizo la kwanza.

---

## 3. Mti halisi, uliokokotolewa kwa usahihi

Hebu tujenge mti wa majani manne hapo juu kwa kutumia alama halisi za kipekee za SHA-256 juu ya majani `A, B, C, D` (digesti zimeonyeshwa kwa ufupi ili kurahisisha usomaji):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Kila kitu ni “weka hash kitu, kisha weka hash jozi za hash.” Hakuna kitu cha ajabu zaidi ya Makala ya 3, kilichopangwa katika mti.

---

## 4. Sehemu ya werevu: kuthibitisha uanachama bila kufichua nafasi

Sasa Tatizo la pili. Sema unataka kuthibitisha kwamba jani `C` limo kwenye mti, kwa mtu anayejua **mzizi** pekee. Humpi mti mzima. Unampa tu alama za kipekee zinazohitajika kupanda kutoka `C` hadi mzizini, zinazoitwa **njia ya uthibitishaji [authentication path]** (au **thibitisho la Merkle [Merkle proof]**):

> Ili kuthibitisha `C` limo kwenye mti, toa:
> - ndugu yake `hD`, na
> - ami yake `hAB`.

Mthibitishaji, akijua mzizi pekee, hukokotoa upya upandaji:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Imekokotolewa kwa uhalisia: hii hutoa `1b3faa3fcc5e...`, ambayo **inalingana na mzizi.** Jani limethibitishwa kuwa kwenye mti.

![alt text](/content-images/image-21-d9e5d6eaf6.webp)

Vitu viwili hufanya hili liwe lenye nguvu:

- **Ni dogo.** Kwa majani 4 ulitoa hash 2. Kwa mti wa majani `n` unatoa hash takriban **log_2(n)** pekee. Kwa majani bilioni moja, hiyo ni takriban **hash 30**, si bilioni moja. Thibitisho hukua kwa kiwango kidogo sana kadiri mti unavyopanuka kwa ukubwa.
- **Ni mbegu ya faragha.** Thibitisho linaonyesha jani lako lipo *mahali fulani* kwenye mti. Ukaguzi huu huu unapofanywa *ndani ya thibitisho la maarifa sifuri [zero-knowledge proof]* (Makala ya 5), hata njia yenyewe hufichwa, hivyo unathibitisha “dokezo langu limo kwenye mti” huku ukifichua dokezo wala nafasi yake. Hilo hutatua Tatizo la pili kikamilifu.

---

## 5. Kutoka mti wa Merkle hadi mti wa note commitment wa Zcash

Sasa tunaweza kueleza kwa usahihi “ubao wa umma” wa Makala ya 0 ni nini hasa:

> **Mti wa note commitment** ni mti wa Merkle ambao **majani yake ni note commitment.** Kila mara dokezo linapoundwa popote duniani, commitment yake huongezwa kama jani linalofuata, na mzizi husasishwa.

Maelezo machache halisi:

- **Hukua pekee.** Majani huongezwa, hayatoiwi kamwe. Hii huitwa **mti wa Merkle wa nyongeza [incremental Merkle tree].** (Inalingana na kauli ya Makala ya 0 kwamba “ubao hauondoi chochote kamwe.”)
- **Mzizi huitwa *anchor*.** Unapotumia, muamala wako hurejelea anchor ya hivi karibuni na kuthibitisha, kwa maarifa sifuri, kwamba commitment ya dokezo lako iko kwenye mti wenye mzizi huo.
- **Kina kisichobadilika.** Miti ya faragha ya Zcash ina kina cha **32**, kumaanisha inaweza kushikilia hadi `2^(32)` (zaidi ya madokezo bilioni nne).
- **Kuweka hash kunakofaa ZK.** Mti haujengwi kwa SHA-256. Sapling huweka hash mti kwa **Pedersen hashes** na Orchard hutumia **Sinsemilla** (zote kutoka Makala ya 3), hasa ili upandaji wa uanachama uwe wa gharama nafuu kuthibitisha ndani ya circuit.

![alt text](/content-images/image-22-518354b8d5.webp)

### Jambo moja ambalo mti *haushughulikii*: matumizi maradufu

Mti huthibitisha dokezo **lipo**. Haukuzuii, wenyewe, kutumia dokezo lilelile mara mbili. Jukumu hilo ni la **seti ya nullifier [nullifier set]** kutoka Makala ya 0: mkusanyiko tofauti wa “tokeni batili.” Unapotumia, unachapisha nullifier ya dokezo, na mtandao hukataa nullifier yoyote ambayo umeiona awali.

Hivyo miundo miwili ya umma ina majukumu yanayokamilishana, na kuiweka tofauti ndiyo hasa hukata kiungo kati ya kuzaliwa na kufa kwa dokezo:

| Muundo | Swali linalojibiwa | Husasishwa lini |
|---|---|---|
| **Mti wa note commitment** | “Je, dokezo hili lipo?” | Dokezo **linaundwa** (commitment huongezwa) |
| **Seti ya nullifier** | “Je, dokezo hili tayari limetumika?” | Dokezo **linatumika** (nullifier huchapishwa) |

---

## 6. Ufafanuzi wa wazi

Kurahisisha, kama kawaida. Miti halisi ya Merkle ya nyongeza hufuatilia nodi za “frontier” ili mzizi uweze kusasishwa bila kujenga upya kila kitu; mtandao huhifadhi dirisha la anchor za hivi karibuni, si ya mwisho pekee, ili pochi zisiharibiwe na kila block mpya; na majani matupu hutumia thamani iliyobainishwa ya padding. Pia tulichora miti ya jozi yenye nguvu nadhifu za mbili. Hakuna kati ya haya kinachobadilisha intuisheni: majani ya commitment, yaliyopewa hash kwa jozi hadi mzizi mmoja, pamoja na uthibitisho mfupi wa uanachama. Uhasibu sahihi unarudi katika makala ya itifaki.

---

## 7. Muhtasari

- **Mti wa Merkle** huweka hash data kuwa **majani**, kisha huweka hash **jozi kuelekea juu** hadi **mzizi** mmoja ubaki.
- Shukrani kwa athari ya maporomoko, **mzizi ni alama ya kipekee ya orodha nzima**: badilisha jani moja na mzizi hubadilika. Thamani moja ndogo huthibitisha seti kubwa ya data.
- **Thibitisho la uanachama (njia ya uthibitishaji)** ni ndugu tu waliopo kwenye upandaji hadi mzizini, takriban hash **log_2(n)**, hivyo uthibitisho hubaki mdogo hata kwa mabilioni ya majani.
- Likifanywa **ndani ya thibitisho la maarifa sifuri**, ukaguzi huo wa uanachama huficha ni jani *gani* unalomaanisha, ukithibitisha “dokezo langu limo kwenye mti” bila kufichua dokezo wala nafasi yake.
- Mti wa **note commitment** wa Zcash ni mti wa Merkle wa **nyongeza**, wenye kina cha **32**, ambao mzizi wake ni **anchor**; Sapling huuweka hash kwa **Pedersen** na Orchard kwa **Sinsemilla**.
- Mti huthibitisha **uwepo**; **seti ya nullifier** tofauti huzuia **matumizi maradufu**. Kuziweka kando ndiko kunakotenganisha kuzaliwa kwa dokezo na kufa kwake.

---

## Faharasa

| Neno | Maana kwa lugha rahisi ya Kiingereza |
|---|---|
| **Merkle tree** | Mti wa hash; majani ni alama za kipekee za data, wazazi huweka hash watoto wao |
| **Leaf** | Nodi ya chini; katika Zcash, note commitment moja |
| **Merkle root** | Alama moja ya kipekee ya juu inayofupisha mti mzima |
| **Authentication path / Merkle proof** | Hash za ndugu zinazohitajika kuthibitisha jani limo kwenye mti |
| **Incremental Merkle tree** | Mti wa Merkle wa kuongeza pekee (majani huongezwa tu) |
| **Anchor** | Mzizi wa Merkle ambao matumizi hurejelea kama “hali ya mti ninayothibitisha dhidi yake” |
| **Nullifier set** | Mkusanyiko tofauti wa alama za matumizi unaozuia matumizi maradufu |

---

## Maswali Yanayoulizwa Mara kwa Mara

**Kwa nini mti na si orodha ndefu tu ya hash?**
Orodha tambarare ingekulazimisha kufichua au kuchakata kila ingizo ili kuthibitisha uanachama. Mti hukupa uthibitisho wa ukubwa wa logarithmu na mzizi mmoja wa uadilifu.

**Je, mthibitishaji anahitaji mti mzima?**
Hapana. Mthibitishaji anahitaji **mzizi** pekee pamoja na njia yako fupi ya uthibitishaji. Hilo ndilo kusudi lote.

**Kwa nini kina cha 32 hasa?**
Huweka kikomo cha mti kuwa karibu madokezo bilioni nne, ambayo ni nafasi kubwa ya kutosha, huku ikidumisha thibitisho la uanachama (na gharama yake ndani ya circuit) katika ukubwa maalumu unaoweza kusimamiwa.

**Ikiwa mzizi hubadilika kwa kila dokezo jipya, uthibitisho wa zamani hubakije halali?**
Mtandao hukumbuka dirisha la mizizi ya hivi karibuni (anchor), hivyo thibitisho lililotengenezwa dhidi ya anchor ya zamani kidogo bado huthibitishwa. Makala ya itifaki hufafanua hili kwa usahihi.

---

### Jaribu intuisheni yako

Katika mti wetu wa majani 4, tuseme mshambuliaji anabadilisha kwa siri jani `C` kwa thamani tofauti lakini anaacha mzizi uliochapishwa bila kubadilika. Nini kinawaendea vibaya, na kwa nini hawawezi kulirekebisha kimya kimya? *(Jibu hapa chini.)*

<details><summary>Jibu</summary>

Kubadilisha `C` hubadilisha `hC` (athari ya maporomoko), ambayo hubadilisha `hCD = H(hC, hD)`, ambayo hubadilisha `ROOT = H(hAB, hCD)`. Hivyo mzizi uliokokotolewa upya haulingani tena na mzizi uliochapishwa, na uchakachuaji hugunduliwa. Ili “kulirekebisha kimya kimya” wangepaswa kupata `C` tofauti inayozalisha `hC` *ileile*, ambayo ni mgongano wa hash, usiowezekana kwa Makala ya 3. Uadilifu unadumu.
</details>

---

### Kinachofuata

**Makala ya 5 . Thibitisho za maarifa sifuri:** kilele. Sasa tumejenga madokezo, commitment, na mti, na tunaendelea kusema “imethibitishwa kwa maarifa sifuri.” Makala ya 5 hatimaye inaeleza jinsi unavyoweza kuthibitisha kauli ni kweli, kwamba dokezo lako limo kwenye mti, kwamba nullifier yako ni sahihi, kwamba fedha zinasawazika, huku usifichue chochote kati ya hayo.

*Sehemu ya mfululizo wa* Zcash kutoka Kanuni za Msingi *kwa [ZecHub](https://zechub.org). Imepewa leseni ya CC BY-SA 4.0.*

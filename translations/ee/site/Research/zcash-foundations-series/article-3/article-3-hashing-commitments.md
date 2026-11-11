# Hashing kple Adzɔgbeɖeɖe: Akpa ƒe Gɔmeɖeɖe Si Wotsɔ Ƒo Tso
##### Gɔmesese Ƒe Nudzodzro Tso [Annkkitaaa](https://github.com/Annkkitaaa) Ɖe

![alt text](/content-images/image-15-0c16784b27.webp)

### Ale si nàte ŋu aɖo nya vevi ɣa le ame katã ƒe ŋkume eye màte ŋu aɖagblɔa

> **Ƒometɔwo:** *Zcash Tso Gɔmedzedze ƒe Nunya Me* . **Agbalẽ 3 . Hashing kple Adzɔgbeɖeɖe**
> **Ame siwo wòŋlɔ na:** Ame yeyeawo. Míetso [Agbalẽ 1 (finite fields)](article-1-finite-fields.md) kple [Agbalẽ 2 (elliptic curves)](article-2-elliptic-curves.md) dzi, gake gɔmesese la tsɔa eɖokui ko tsi.
> **Nu si nàkpɔ le egbe megbe:** Hash ƒe dɔwɔnuwo ƒe gɔmesese nyui, nu si "ɣaɣla" kple "kadodo" gɔme nye vavã, kple ale si Zcash wɔa didienu ƒe adzɔgbeɖeɖewo siwo dea teƒe fexexe siawo katã.

Le [Agbalẽ 0](article-0-shielded-transaction.md) me la, míɖe "akpa ƒe gɔmeɖeɖe si wotsɔ ƒo tso" nu: nu si nàte ŋu aɖe ɖe kpekpeƒe ƒe kplɔdzi be akpa li, eye wòɣe nu si le eme ɣla, eye màte ŋu aɖe tɔe ɖo teƒe le megbe o. Mído ŋugbe be míatsɔe afia ale si nu sia ate ŋu ava eme. Agbalẽ sia nye esia. Míahiã nu eve: **hash ƒe dɔwɔnuwo** kple **adzɔgbeɖeɖewo**.

---

## 1. Nu ka ta wòle be nàtsɔe na?

Bu be nèɖe ame si awɔ dɔ dzi ƒe tiŋu ɖe gɔme eye nèdi be nàɖe fia, *le emegbe*, be nèɖe egɔme tsã. Màte ŋu aɖe wòŋgɔɖoɖo la afia ko o (esia ate ŋu akpɔ ameawo ƒe susu ɖe edzi, alo ana woabu be nètrɔe). Eye màte ŋu aɖe eɣla blibo hã o (ekema màte ŋu aɖe naneke afia le megbe o).

Nu si nèdi nye mɔ aɖe si nàtsɔ **aɖo asixɔxɔ me fifia le ame katã ƒe ŋkume, ale be:**

- Ame aɖeke mate ŋu aka nu si nèɖo ɖe eme o (eaganɔ ɣaɣla fifia), eye
- Le megbe, ne èɖe eɖe go la, **màte ŋu aɖagblɔ** nu si wònye o.

Woyɔ "ɖo fifia, ɖe go le megbe, mègblɔ alakpa o" ƒe mɔsia be **adzɔgbeɖeɖe [commitment]**, eye eli afi sia afi le Zcash. Wode didienu ƒe asixɔxɔ kple etɔ ƒe dzesi ɖe adzɔgbeɖeɖe me enumake ne wowɔ didienu la. Be míatu adzɔgbeɖeɖewo, ele be míatsɔ wo ƒe dɔwɔnu vevitɔ: hash ƒe dɔwɔnu la adze egɔme.

---

## 2. Gɔmesese la: asidzedze na data

**Hash ƒe dɔwɔnu [hash function]** xɔ data ɖesiaɖe, alɔŋlɔ ƒe ŋkekevi aɖe alo agbalẽxɔxɔ blibo aɖe, eye wòtsɔe wɔa alɔŋlɔ kpui, si ƒe lolome menye be wòtrɔna o, si woyɔna be **digest** alo **hash**. Bu be enye **asidzedze na data.**

![alt text](/content-images/image-16-52fdf62c87.webp)

Asidzedze crypto ƒe nyui aɖe si le tɔxɛ ene. Mìatsɔ wo anɔ mia ƒe susu me abe gɔmesesewo ene, menye abe equationwo ene o:

| Tɔxɛ | Gɔmesese bɔbɔe | Nu ka ta wòle vevie |
|---|---|---|
| **Metrɔna o** | Nu si wotsɔ de eme ɖeka na asidzedze ɖeka ɣesiaɣi | Nàte ŋu aɖetrɔ asidzedze aɖe ɣesiaɣi |
| **Wòdoa ŋgɔ kabakaba** | Asidzedze ƒe wɔwɔ le kabakaba | Wòle bɔbɔe be woatsɔe awɔ dɔ afi sia afi |
| **Mɔ ɖeka ko (preimage resistant)** | Ne wòkpɔ asidzedze aɖe la, màte ŋu akpɔ nu si wɔe o | Wòɣla data gbãtɔ la |
| **Metrɔna o ɖe woƒe tsitsitɔ me** | Màte ŋu akpɔ nu vovovo eve siwo ƒe asidzedze ɖeka o | Ame aɖeke mate ŋu awɔ nudzɔdzɔ aɖe o |

Eye nɔnɔme bubu aɖe hã li si wɔa be asidzedzewo nakpɔ ɖe ame ŋu abe nukunu ene:

### Avalanche ƒe nɔnɔme (wode kpe ɖe edzi)

Trɔ nu si wotsɔ de eme la kpuie eye asidzedze la atrɔ *blibo*, eye wòmeganye abe etɔ gbãtɔ ene o. Afisiae SHA-256 asidzedze vavã eve siwo tso gbedeasi eve siwo ƒe alɔŋlɔ ɖeka ko vovo me:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Hex ƒe digit 64 dometɔ, **59 vovo.** Alɔŋlɔ ɖeka ko wode eme, eye asidzedze si meka ɖe etɔ aɖeke ŋu o do go. Esiae ta màte ŋu atrɔ nu si wotsɔ de eme la vievie be nàva ɖo asidzedze si nèdi la gbɔ o: "xɔe dze ɖe eme / xɔe dzo le eme" ƒe dzesi aɖeke meli be nàto o.

---

## 3. Tso asidzedze me yi adzɔgbeɖeɖe gbɔ

Mɔ si dze abe eƒe nyuie gake wogbãe: be nàwɔ adzɔgbeɖeɖe na asixɔxɔ ɣaɣla `v`, ɖe eƒe asidzedze `H(v)` afia ko.

Esia *kada* wò nyuie (màte ŋu agblɔ le megbe be `v` bubu nènye o, elabena esia ahiã be nàkpɔ nu eve siwo ƒe asidzedze ɖeka). Gake e**meɣlana o.** Ne asixɔxɔ siwo ate ŋu anɔ la meganɔ agbã o la, avuɖela aɖe atsɔ asidzedze awɔ na asixɔxɔ siawo katã eye wòatsɔ wo asɔ kple tɔwò. Èwɔ adzɔgbeɖeɖe na "ɛ̃" alo "ao"? Wòwɔ hash na wo eve eye wòka ɖe nu si nètia dzi enumake. Nu si medze ŋgɔ o, si nye mia ƒe xɔlɔ kpuie va yi la, le ɖeŋu dzi ɖe ɣaɣla la go.

Dɔɖɔɖo la nye nya ɖeka: **nudzudzɔ.**

> **Adzɔgbeɖeɖe nye wò ƒe asixɔxɔ ƒe asidzedze si wotsɔ xɔ nudzudzɔ yeye aɖe ɖe eme:**
> `commitment = H(v, r)` afi si `r` nye asixɔxɔ nudzudzɔ "blinding" si woɣla.

Fifia, `v` ma ke wɔa adzɔgbeɖeɖe si kpɔa ɖe ame ŋu abe bubu ene ɣesiaɣi, elabena `r` vovo. Tɔxɛ eve si míedi la katã va eme fifia:

![alt text](/content-images/image-17-3ec4617665.webp)

Be nà**ʋu** (aɖe afia) adzɔgbeɖeɖe la le megbe la, nàɖe `v` kple `r` afia; ame sia ame atsɔ `H(v, r)` awɔ ake eye wòakpɔ be wòsɔ kple tɔ gbãtɔ la. Wòɖo wò ɖe eme. Esiae nye akpa ƒe gɔmeɖeɖe si wotsɔ ƒo tso le Agbalẽ 0 me, si va zu nu vavã.

> **Nya eve si nèle be nàtsɔ anɔ ɣesiaɣi:** *kadodo* tsoa hash ƒe nɔnɔme si mete ŋu akpɔ asidzedze ma ke o; *ɣaɣla* tsoa blinding ƒe nudzudzɔ `r`.

---

## 4. Mɔ eve si woatsɔ atu akpa la

Mɔ siwo wozã zi geɖe nye eve, eye Zcash zãa wo eve.

| | **Adzɔgbeɖeɖe si wotu kple hash** | **Pedersen adzɔgbeɖeɖe** (tso Agbalẽ 2 me) |
|---|---|---|
| Mɔ si wotsɔ wɔe | `H(v, r)` | `v.G + r.H` (teƒewo le curve aɖe dzi) |
| Ɣaɣla tsoa | `r` si menye nudzudzɔ o | `r` si menye nudzudzɔ o |
| Kadodo tsoa | Asidzedze ma ke ƒe mabu | Elliptic-curve ƒe mɔɣaɣla (ECDLP) |
| Ŋusẽ tɔxɛ | Eme bɔbɔe eye wòle kabakaba | Adzɔgbeɖeɖewo **dea kple wo nɔewo** (homomorphic) |

Mizɔzɔ mamlɛtɔ lae nye nu si wɔa be Pedersen adzɔgbeɖeɖewo nanɔ vevie ŋutɔ le Zcash. Elabena `commit(v_1) + commit(v_2)` nye `commit(v_1 + v_2)` si le eɖokui me, protocol la ate ŋu aɖe fia le megbe be **ga si ge ɖe eme sɔ kple ga si do go** to adzɔgbeɖeɖewo ƒe tsɔtsɔ kpe ɖe wo nɔewo ŋu, togbɔ be womeɖe asixɔxɔ aɖeke afia o. Míele nya sia ɖom ɖe teƒe na Agbalẽ 6.

---

## 5. Nu sue aɖe si wɔa Zcash katã: Hashing si dze ZK ŋu

Afisiae gɔmesese aɖe si gɔmedzedze geɖe megblɔna o, eye nye "mathematics kple engineering ƒe kadodo" teƒe si dze be woade dzesi na.

SHA-256 nye asidzedze nyui ŋutɔ na computer dɔwɔwɔ ɣesiaɣi. Gake Zcash menye be wòwɔa hashes ko o; ele be wòa**ɖe ɖaseɖigbalɛ, le zero-knowledge ɖaseɖigbalɛ aɖe ƒe me, be wowɔ hash aɖe ɖe mɔ si sɔ me** (Agbalẽ 5 aɖe gɔme na nu ka ta). Eye afisiae kuxi la le: zero-knowledge ɖaseɖigbalɛ aɖe wɔa dɔ le **finite-field arithmetic** (Agbalẽ 1) ƒe gbegbɔgblɔ me, ke SHA-256 wotu tso bit-twiddling dɔwɔwɔwo (shifts, ANDs, XORs) me. Be woatsɔ bit-twiddling sia katã aɖe fia le field arithmetic me la xɔa ga sɔŋ, eye wòwɔa be ɖaseɖigbalɛwo nanɔ gã eye woatsi afɔ.

Eya ta Zcash ƒe crypto ƒe amedɔwɔlawo wɔ hash ƒe dɔwɔnuwo siwo ƒe emetɔwo nye field arithmetic xoxo, eye esia wɔa be wòle bɔbɔe be woaɖe wo ƒe ɖaseɖigbalɛ:

![alt text](/content-images/image-18-89ade807ad.webp)

Engineering ƒe nusẽ ɖeka sia, *"ele be eƒe ɖaseɖigbalɛ nanɔ bɔbɔe,"* nye nu ka ta Zcash ƒo hash ƒe dɔwɔnu tɔxɛwo eye wòzã wo ɖe teƒe be wòaɖe asi ɖe SHA-256 ŋu afi sia afi.

---

## 6. Afi si esia le le Zcash

Zcash zã hashes vovovo le eƒe nunyonamewo me, eye wotia ɖeka ɖeka na dɔ si wòwɔ:

| Nunyoname | Hashes si wozã | Afi si wozã wo |
|---|---|---|
| **Sprout** (gbãtɔtɔ) | **SHA-256** | Didienu ƒe adzɔgbeɖeɖewo kple ati la |
| **Sapling** | **Pedersen hashes**, kple **BLAKE2** | Pedersen na didienu ƒe adzɔgbeɖeɖewo kple Merkle ati la; BLAKE2 na kɔsiɖoɖo kple gaɣaɣla ɖeɖe dzesiwo |
| **Orchard** (fifia) | **Sinsemilla**, kple **Poseidon** | Sinsemilla na didienu ƒe adzɔgbeɖeɖewo kple Merkle ati la; Poseidon na gaɣaɣla ɖeɖe dzesi la, wo katã wotu na arithmetic circuits |

Ŋkɔ siwo ele be nàde dzesi nye **Pedersen** kple **Sinsemilla** (adzɔgbeɖeɖe ƒe nɔnɔme ƒe hashes si wotu tso curve ƒe teƒewo me, eya ta woɖe "dea kple wo nɔewo" ƒe ŋusẽtɔxɛ la kple wo eye wo ƒe ɖaseɖigbalɛ wɔna bɔbɔe) kple **Poseidon** (field-arithmetic hash si wotu tsitotsito na zero-knowledge circuits). Ne Agbalẽ 0 gblɔ be didienu ƒe emetɔwo woɖo ɖe adzɔgbeɖeɖe me la, *esia*e nye mɔ si wɔa ɖoɖo la.

Eya ta, nya si wometsɔ ɖo nu le Agbalẽ 0 me, *"Aleke akpa ƒe gɔmeɖeɖe si wotsɔ ƒo tso ate ŋu aɣla eƒe emetɔwo eye womegate ŋu aɖu eƒe aɖa o?"*, va ɖo nu fifia: **ɣaɣla tsoa blinding ƒe nudzudzɔ aɖe me, kadodo tsoa asidzedze ma ke ƒe mabu alo curve ƒe mɔɣaɣla la me.**

---

## 7. Nya vavã aɖe si ele be míagblɔ

Míwɔe bɔbɔe be wòanɔ kɔ. Adzɔgbeɖeɖe ƒe mɔ vavãwo ɖe gɔme tsitotsito ale si wowɔ `v` kple `r` ƒe encoding kple generators si wozã; "ɣaɣla" kple "kadodo" ɖeka ɖeka ƒe nɔnɔme vovovo li (perfect kple computational) siwo ƒe dedienyawo le nyuie; eye mímeɖe Pedersen, Sinsemilla, alo Poseidon ƒe emetɔwo fia o. Nu sia aɖeke metrɔa gɔmesese la o: adzɔgbeɖeɖe nye asidzedze kple nudzudzɔ si ɣla nu fifia eye wòkada nu ɣesiaɣi. Nya tsitotsitowo ava gbɔ, woatsɔ dzesi afia wo, ne protocol ƒe agbalẽ la hiã wo.

---

## 8. Nuxexlẽ

- **Hash ƒe dɔwɔnu** nye **asidzedze na data**: metrɔna o, wòdoa ŋgɔ kabakaba, mɔ ɖeka ko, asidzedze ma ke mabu, kple **avalanche ƒe nɔnɔme** (bit ɖeka de eme, asidzedze bubu blibo do go).
- **Adzɔgbeɖeɖe** na wò mɔ be nà**ɖo asixɔxɔ aɖe le ame katã ƒe ŋkume fifia eye nàɖe eɖe go le megbe, si màte ŋu aɖagblɔ le egɔme o.**
- Ne nèɖe asidzedze ƒe `H(v)` ko afia la, ekada wò gake e**meɣlana o**. Ne nètsɔ blinding ƒe nudzudzɔ, `H(v, r)`, kpe ɖe eme la, esia wɔ dɔɖɔɖo la: **ɣaɣla tsoa `r`, kadodo tsoa asidzedze ma ke ƒe mabu.**
- Zcash zãa adzɔgbeɖeɖewo si wotu kple **hash** kple **Pedersen**; Pedersen adzɔgbeɖeɖewo hã **dea kple wo nɔewo**, si Agbalẽ 6 azã be wòaɖe asixɔxɔ ƒe sɔsɔ ɣaɣla.
- Elabena ele be woa**ɖe hashes ƒe ɖaseɖigbalɛ** le zero-knowledge ɖaseɖigbalɛwo ƒe me la, Zcash zãa hashes si **dze ZK ŋu** si wotu tso field arithmetic me (**Pedersen**, **Sinsemilla**, **Poseidon**) ɖe teƒe be wòazã SHA-256 afi sia afi.

---

## Nya ƒe gɔmesesewo

| Nya | Gɔmesese le English me |
|---|---|
| **Hash function** | Wòtsɔ data ɖesiaɖe wɔa asidzedze kpui si ƒe lolome metrɔna o (digest) |
| **Digest** | Asidzedze si do go tso hash ƒe dɔwɔnu aɖe me |
| **Preimage resistance** | Màte ŋu atrɔ digest aɖe yi nu si wotsɔ de eme gbãtɔ gbɔ o (mɔ ɖeka ko) |
| **Collision resistance** | Màte ŋu akpɔ nu eve siwo ƒe digest ɖeka o |
| **Avalanche effect** | Nu sue aɖe si wotrɔ le input la me trɔa digest la blibo |
| **Commitment** | Ɖo asixɔxɔ aɖe fifia, ɖe eɖe go le megbe, màte ŋu aɖagblɔ le egɔme o |
| **Blinding factor (`r`)** | Nudzudzɔ yeye si wɔa be adzɔgbeɖeɖe aɖe naɣla nu |
| **ZK-friendly hash** | Hash si wotu tso field arithmetic me be eƒe ɖaseɖigbalɛ nanɔ bɔbɔe |

---

## Ƒoƒo biabiawo

**Nu ka ta wometsɔ encryption wɔ na asixɔxɔ la ɖe teƒe be woawɔ adzɔgbeɖeɖe na eo?**
Encryption le ku ɖe *ɣaɣla si nàte ŋu aʋu le megbe* ŋu. Adzɔgbeɖeɖe le ku ɖe *kadodo* ŋu: kafukafu be màte ŋu atrɔ wò ŋuɖoɖo le megbe o. Dɔ vovovo ewɔm.

**Ne adzɔgbeɖeɖewo ɣla asixɔxɔ la, aleke ame aɖeke akpɔ be seawo wɔ dɔa?**
Esia nye zero-knowledge ɖaseɖigbalɛwo ƒe dɔ (Agbalẽ 5): wòɖea ɖaseɖigbalɛ be asixɔxɔ si woɣla la de seawo dzi, togbɔ be womeɖe eɖe go o.

**SHA-256 gbãa, elabena Zcash metsɔe zãa le teƒewo aɖewo oa?**
Ao. SHA-256 nyo eye Zcash gale zãe. Eƒe ɖaseɖigbalɛ wɔwɔ *le circuit aɖe ƒe me* ko xɔa ga sɔŋ, eye esiae ta hashes si dze ZK ŋu li na dɔ sia tɔxɛ.

**Afikae `r` si menye nudzudzɔ o tsoa, eye ame kae léa eŋu?**
Wogbɔna eya yeye ne wowɔ didienu la, eye didienu la ƒe tɔ kae nyae. Enye akpa aɖe si wɔa be didienu ɖeka ɖeka nanɔ tɔxɛ eye nanɔ ɣaɣla.

---

### Do kpe wò ƒe gɔmesese ŋu

Èwɔ adzɔgbeɖeɖe na wò ŋuɖoɖo ku ɖe ametiŋu la ŋu abe `H(v, r)` ene eye nèɖe eɖe go. Xɔlɔ aɖe gblɔ be ele be nàɖe `H(v)` ko afia be wòanɔ bɔbɔe. Le nyagblɔ ɖeka me, nu ka ta esia menyo o ne emetɔ eve ko ate ŋu anɔ? *(Ŋuɖoɖo le anyi.)*

<details><summary>Ŋuɖoɖo</summary>

Elabena emetɔ eve ko li, wò xɔlɔ la ate ŋu awɔ `H("win")` kple `H("lose")` le eɖokuiŋu eye wòasɔ wo kple digest si nèɖe afia la, eye wòanya wò ŋuɖoɖo enumake. Hash si menye kpeɖeŋu si aɖeke o kada nu gake eɣlana o; `r` si menye nudzudzɔ o koe tsena guess-and-check ƒe avuɖeɖe sia ŋu.
</details>

---

### Nu si ava yi

**Agbalẽ 4 . Merkle atiwo:** Fifia, adzɔgbeɖeɖe miliɔn geɖewo le ƒoƒom. Agbalẽ 4 fia ale si Zcash dea wo ɖe ati ɖeka me, si ƒe root asidzedze kpui la tsi ɖe ŋutinyawo katã ƒe teƒe, kple ale si nàte ŋu aɖe ɖaseɖigbalɛ be wò didienu le ati ma me, togbɔ be mèɖe afia be afikae wòle o. Esiae nye Agbalẽ 0 ƒe "kpekpeƒe ƒe kplɔdzi" ƒe nɔnɔme vavã.

*Enye akpa aɖe le* Zcash Tso Gɔmedzedze ƒe Nunya Me *ƒometɔwo me na [ZecHub](https://zechub.org). Wona mɔ CC BY-SA 4.0.*

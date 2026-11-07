# Agbanɔ̃ me xexlẽme: Xexlẽme ƒe ɖoɖo si Cryptography ƒe agbe le me
##### Nunya ƒe ŋu ŋutinya tso [Annkkitaaa](https://github.com/Annkkitaaa) gbɔ

![alt text](/content-images/image-5-6e8a8950f8.webp)

### Nu ka ta "trɔ yi gome" nye Zcash ƒe gɔmedzedze ƒe gbɔɖeɖe

> **Series:** *Zcash tso gɔmedzedze ƒe nɔnɔme me* . **Nyati 1 . Agbanɔ̃ me xexlẽme**
> **Ame siwo wò ŋlɔ na:** Ame yeyeawo. Míebu be wònya suku me xexlẽme bɔbɔe ko (tsɔkpe, zi, ma). Cryptography alo mathematics si le dzogo wu la ƒe sidzedze aɖeke mele be wòhiã o.
> **Nu si wòatsɔ adzoe:** Agbanɔ̃ me xexlẽme ƒe gɔmesese si le bɔbɔe eye wòle ete, nu ka ta cryptographerwo zãa wo, kple afi si woɖea eƒe dzesi le Zcash me.

Le [Nyati 0](article-0-shielded-transaction.md) me la, míedo go ame atɔ̃: didienu, adzɔgbeɖeɖe, didienu ƒe adzɔgbeɖeɖe ti, gaɣaɣla ɖeɖe dzesi, kple zero-knowledge ɖaseɖigbalɛ. Míede biabia aɖe ɖi be: *afi ka keywo kple ɣaɣla ƒe mɔnuwo katã tsoe vae?* Xexlẽmewo mee wotso. Ke menye xexlẽme bɔbɔe si wòtsɔ tsi tsoe o. Wotso xexlẽme ƒe ɖoɖo tɔxɛ si le eɖokui me, si woyɔna be **agbanɔ̃ me xexlẽme [finite field]**, eye cryptography ƒe akpa gbogbo le Zcash me wotu ɖe eŋu.

Nyati sia ana míaɖo eƒe gɔmesese dzidzem. Ale si mído ŋugbe ene la, gɔmesese va gbã. Formula aɖeke manava hafi wòana eɖokui ƒe asixɔxɔ.

---

## 1. Nu ka ta wòle be na wòatsɔe ɖe dzi?

Xexlẽme bɔbɔe wɔa kuxi na cryptography: woƒe xexlẽme menɔa agbe o, eye wodea nya fia.

Bu nu si dzɔna ne xexlẽme aɖe *gã wu*. Ne megblɔ na wò be xexlẽme ɣaɣla aɖe wɔe va zu `8,142,067` la, ènya nu geɖe xoxo: xexlẽme si me dzesi adre le, ele atsyɔ̃, eye "egã kpuie." Eƒe lolome nye dzesi. Eye dzesiwoe nye nu si ɣaɣla ƒe ɖoɖo mate ŋu axɔ be yeana ame o.

Cryptography di xexlẽme ƒe ɖoɖo si me:

- asixɔxɔ **siwo katã me le se**, ale be computer ate ŋu aɖo wo katã ɖe dzesi me tututu, mɔxɔmɔxɔ alo overflow manɔe o,
- asixɔxɔawo **mede woƒe lolome fia o**, elabena ɖoɖoa me "gã wu" ƒe gɔmesese vavã aɖeke mele o,
- àte ŋu **atsɔkpe, aɖe le eŋu, azi, eye nàma** bliboe eye nàtrɔ wo aɖo, elabena cryptography ƒe mɔnuwo hia algebra vavã be woawɔ dɔ, eye
- woate ŋu awɔ teƒea **gã kpuie**, ale be flilimakaka mele mɔkpɔkpɔa me o.

Didi sia ƒe ŋkɔ le. Woyɔe be **agbanɔ̃ me xexlẽme**. Mina miatu eƒe gɔmesese na ɖeka hafi miaŋlɔ dzesi ɖeka pɛ.

---

## 2. Gɔmesese: gaƒoƒo

Èzãa agbanɔ̃ me xexlẽme gbe sia gbe. Nye gaƒoƒo si le wògli ŋu.

Gaƒoƒo si me gaƒoƒo 12 le la me, xexlẽmewo *trɔna yi gome*. Dze egɔme le ga 10, tsɔkpe ga 5, eye mèva ɖo "ga 15" o, ke boŋ nàva ɖo **ga 3**. Teƒe wuieve pɛe gaƒoƒoa si, eye ne nàdo xexlẽme va yi dzi la, etrɔna yi gɔmedzedzea me.

![alt text](/content-images/image-9-30b39f4cc5.webp)

Nu etɔ̃e dzɔ fifia, siwoe nye nyati sia ƒe tanya gã la katã:

1. **Xexemea le se.** Teƒe wuieve pɛe li, togbɔ be nàgaɖo xexlẽme yi edzidzi hã.
2. **Tsɔkpe ha wɔ dɔ.** Àte ŋu atsɔkpe gaƒoƒowo ŋkeke blibo; nàva ɖo gaƒoƒo ƒe teƒe si le ete ɣesiaɣi.
3. **Lolome megale vevie o.** "Ga 3" megblɔ na wò be ègaɖo ga 3 alo 15 alo 27 o. Trɔtrɔ yi gome la *tutui lolome ƒe nyanyui la ɖa.* Tututui siae nye ɣaɣla ƒe nɔnɔme si míedi vɛ.

Trɔtrɔ yi gome ƒe xexlẽme sia ƒe ŋkɔ le mathematics me: **modulo ƒe xexlẽme [modular arithmetic]**. Gaƒoƒoa wɔa dɔ "modulo 12," si woŋlɔna be **mod 12**. Mathematics ƒe amewo di be woadzɔ xexlẽme teƒeawo tso 0 me, eyata "gaƒoƒo mod 12" me teƒeawo nye `0, 1, 2, ..., 11`. Gaƒoƒo mod 7 me teƒeawo anye `0` va se ɖe `6`.

> **Se ɖeka pɛ:** Be nàwɔ nu aɖe "mod p," wɔ xexlẽme bɔbɔe gbã, emegbe mà `p` me eye nàtsɔ hagbegbe ko.
> Medekpɔɖeŋu mod 7: `5 + 4 = 9`, eye ne womã `9` me la, hagbegbe si susɔe nye `2`, eyata `7`, ale `5 + 4 = 2 (mod 7)`.

---

## 3. Tso gaƒoƒo me yi xexlẽme ƒe aƒe

Gaƒoƒo naa míaɖe tsɔkpe. **Xexlẽme ƒe aƒe [field]** nye kekeɖeŋu: xexlẽme ƒe ɖoɖo si me wɔwɔ eneawo katã wɔa dɔ nyuie, hã ma, si nye esia sesẽ la.

Le gɔmesese bɔbɔe me la, **xexlẽme ƒe aƒe** nye "xexlẽmewo" ƒe ƒome aɖe si me àte ŋu **atsɔkpe, aɖe le eŋu, azi, eye nàma** (nu bubu ɖe 0 ŋu pɛ), eye se siwo katã wònya va xɔe la gali: ɖoɖo meva dɔ na tsɔkpe alo zizi o, woate ŋu aɖo bracketwo ƒe ƒoƒo bubu, `0` kple `1` li, eye xexlẽme ɖe sia ɖe si ƒe trɔtrɔ yi megbe li kple (tsɔ ɖe `0` ŋu) eƒe ɖeɖe ƒe gome.

Rational xexlẽmewo nye xexlẽme ƒe aƒe. Real xexlẽmewo nye xexlẽme ƒe aƒe. Nu si míedi la nye aƒe *si le se*.

Nyati gã lae nye esi, eye edze tugbe:

> **Tsɔ xexlẽme bliboawo `0, 1, ..., p-1` eye nàwɔ xexlẽme katã mod `p`. Ne `p` nye prime xexlẽme la, nu si ava eme nye agbanɔ̃ me xexlẽme.** Míeŋlɔna be `F_p` (wogblɔna be "F sub p").

Eyata `F_7 = {0, 1, 2, 3, 4, 5, 6}` kple gaƒoƒo ƒe mɔnu me xexlẽme mod 7 nye agbanɔ̃ me xexlẽme vavã. Mina míakpɔ ale si wɔe.

### Zizi le F_7 me (woɖo kpe ɖe eŋu)

Nusiwo katã le teƒe ɖe sia ɖe me nye `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Kpɔ fli siwo nye `1` va se ɖe `6`: ɖeka ɖe sia ɖe me la, asixɔxɔ siwo menye 0 o `1..6` le edzi ɖe sia ɖe zi ɖeka pɛ. Nɔnɔme "woƒe sɔsɔ teƒe mele o, eye naneke bui o" siae nye xexlẽme ƒe aƒe ƒe dzesi si wòate ŋu akpɔ.

### Mama: nukunu si hia prime

Mama nye "zi kple ɖeɖe ƒe gome." Le `F_7` me la, xexlẽme `a` ƒe ɖeɖe ƒe gome (alo **inverse**) nye asixɔxɔ `a^(-1)` si na `a x a^(-1) = 1`. Ne míetsɔe tso kplɔ̃ la dzi nyagbeɖeɖe la:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Kpɔ ɖeka: `2 x 4 = 8 = 1 (mod 7)`. Eyata "ma 2 me" le `F_7` me fia be "zi kple 4." Nonzero element ɖe sia ɖe ƒe nɔvi li. **Eyae wɔa `F_7` be xexlẽme ƒe aƒe.**

---

## 4. Nu ka ta modulus la le be wòanye prime

Eyae nye gɔmesese vevi wu le nyati sia me, eyata míana wòakpɔe le nu vavã me, menye le gɔmesese ma me o.

Kpɔ nu si gbã ne míedi be míatu "xexlẽme ƒe aƒe" mod `6` kple mɔ bɔbɔe (eye `6` *menye* prime o):

> `x` aɖe le woa si na `2 x x = 1 (mod 6)`? Ne míele wo katã kpɔm la: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **Ŋuɖoɖo `1` va do go kpɔ o.** Eyata `2` ƒe ɖeɖe ƒe gome mele mod 6 me o. Nu si pɔtɔ wu lae nye `2 x 3 = 6 = 0 (mod 6)`: nonzero xexlẽme eve dzi kple wo nɔewo va na 0.

Nyagbe evelia la nye gbegblẽ na xexlẽme. Ne nonzero nu eve zia wo nɔewo eye woɖea 0 la (woyɔe be **zero divisor [zero divisor]**) fia be mama gbã, eye ɖoɖo si me mama gbã la menye xexlẽme ƒe aƒe o. Edzɔa tɔxɛ elabena `6` mate ŋu awɔ akpae `2 x 3`.

Prime, le eƒe gɔgblɔ me, ƒe akpa mawo mele o. Eyata mod prime me la, zero divisorwo mate ŋu ado go o, nonzero element ɖe sia ɖe axɔ eƒe ɖeɖe ƒe gome tsẽ, eye ɖoɖoa anye xexlẽme ƒe aƒe vavã.

![alt text](/content-images/image-8-573914db92.webp)

> **Nyagbe ɖeka si nàte ŋu azã le wò nyatiwo me:** *prime modulus ge ɖe eme, mama nyuie doa go.*

---

## 5. Formula ɖeka si dze be míado go: ale si computerwo di inversewo

Míexle inversewo tso kplɔ̃ aɖe dzi le `F_7` me, ke Zcash ƒe prime me dzesi alafa geɖe le; kplɔ̃ aɖeke mate ŋu anɔe o. Mɔ mɔkeke aɖe le, eye eyae nye formula ɖeka pɛ le nyati sia me.

**Fermat ƒe Theorem Sue [Fermat's Little Theorem]** gblɔ be na prime `p` kple nonzero `a` ɖe sia ɖe:

```
a^(p-1) = 1   (mod p)
```

Trɔe ɖo (ɖe factor ɖeka ƒe `a` ɖa) eye inverse la ava na wò ɖe asi:

```
a^(-1) = a^(p-2)   (mod p)
```

Kpɔe le `F_7` me (`p = 7`, eyata `p - 2 = 5`): inverse si le `2` ƒe nye `2^5 = 32 = 4 (mod 7)`. Eye vavã la, míaƒe kplɔ̃ la gblɔ be `2^(-1) = 4`. Computerwo wɔa zizi yi power gãwo me kabakaba, eyata esia trɔa "di ɖeɖe ƒe gome" zu xexlẽme tsẽ si wɔna kaba, togbɔ be primewo gã kpuie hã.

Mèhia be nàde esia dzesi me o. Nu si wòle be nanyae nye be **mama le agbanɔ̃ me xexlẽme me nye dɔwɔwɔ kabakaba, si le ete**, eye eyae tututu ta cryptographerwo dzɔa dzi be woatu nu ɖe eŋu.

---

## 6. Nu ka ta cryptography lɔ̃ agbanɔ̃ me xexlẽmewo ŋutɔ

Ne míatsɔ gɔmeseseawo katã ade ɖeka la, esiae nye nyagbe blibo la katã le axa ɖeka dzi.

| `F_p` ƒe nɔnɔme | Nu ka ta ɣaɣla ƒe ɖoɖo dii |
|---|---|
| **Le se** | Computer ate ŋu aɖo element ɖe sia ɖe ɖe dzesi me tututu; mɔxɔmɔxɔ, overflow, alo floating-point ƒe makpɔkpɔ mele o |
| **Trɔtrɔ yi gome** | Etutui "lolome" ɖa, ale be asixɔxɔ aɖe mede nya fia tso ale si wowɔe va eme o |
| **Wɔwɔ eneawo katã wɔ dɔ** | Cryptography ƒe mɔnuwo (keywo, adzɔgbeɖeɖewo, ɖaseɖigbalɛwo) hia algebra vavã, menye gaɖo xexlẽme ko o |
| **Woate ŋu atia eƒe lolome** | Tia prime si me bit 255 alo bit 381 le eye elementwo anɔ aƒea me geɖe wu atom siwo le xexeme si míate ŋu akpɔ; flilimakaka mele mɔkpɔkpɔa me o |
| **Le ete eye wòle ɖe mɔ ɖeka dzi** | Ame siwo wɔa nu nyuie eye wokpɔa nu ɖeka la, woɖea eme ɖeka tɔ pɛ ɣesiaɣi, si ɖaseɖigbalɛwo ɖe wɔnuku le |

Le nyagbe ɖeka me la, agbanɔ̃ me xexlẽme nye **teƒe si le ɖoɖo blibo, le ete blibo, eye egã blibo na xexlẽme ƒe fɔfɔ.** Nu bubu katã le Zcash me wotu to fɔfɔ le eme.

---

## 7. Afi si esia le Zcash me

Mèle be nàxɔ be "Zcash zãa agbanɔ̃ me xexlẽmewo" le xɔse ko dzi o. Esiae nye map vavã la (machine si le dzogo wu la nye nyati siwo ava emegbe; esia nye be nàkpɔ be dzesiwo vavã le).

- **Sapling** (ɣaɣla ƒe ɖoɖo xoxoa) tua eƒe ɖaseɖigbalɛwo ɖe curve si woƒe ŋkɔe nye **BLS12-381** ŋu, si ƒe base field zãa prime si ƒe didime nye **bit 381**. Coordinate, key, kple proof element ɖe sia ɖe nye agbanɔ̃ me xexlẽme si wotu ɖe prime ma ŋu ƒe element.
- **Orchard** (ɣaɣla ƒe ɖoɖo si le fifia) zãa curve eve si woƒe ŋkɔe nye **Pallas and Vesta** (curve "Pasta"wo), siwo ƒe fieldwo zãa prime siwo ƒe didime le **bit 255** ƒe teƒe.
- **Didienu ƒe adzɔgbeɖeɖe**, **gaɣaɣla ɖeɖe dzesi**, kple xexlẽmewo siwo le **zero-knowledge ɖaseɖigbalɛ** me tso Nyati 0 me la katã, le gɔme vavã me, nye agbanɔ̃ me xexlẽme siawo dometɔ ɖeka ƒe elementwo. Ne protocol la gblɔ be "wɔ adzɔgbeɖeɖe sia" la, egɔme nye be "wɔ xexlẽme sia mod prime ma."

![alt text](/content-images/image-7-c81fe982f0.webp)

Eyata ŋuɖoɖo si na Nyati 0 ƒe biabia si meɖi ɖi, *"afi ka mɔnu ɣaɣlaawo tsoe vae?"*, dzea egɔme le afisia: **nu sia nu ƒe gɔmedzedze nye xexlẽme le agbanɔ̃ me xexlẽme me.** Le nyati si ava la me míatsɔ aƒe ma atu nu vavãawo, pointwo siwo le elliptic curve aɖe ŋu, siwo zu keywo kple adzɔgbeɖeɖewo.

---

## 8. Nya vavã ƒe ƒoɖoɖo

Be míana esɔ na ameyeyeawo ta la, míewɔ nyateƒe aɖewo bɔbɔe. Agbanɔ̃ me xexlẽmewo menɔa `F_p` ƒe nɔnɔme pɛ me o; àte ŋu atu aƒewo si me element `p^n` le (woyɔna be **extension fields**), eye woe le vevie na "pairings" si Sapling ƒe proof system ɖe wɔnuku le. Míegbe field axioms ƒe xexlẽme blibo, eye míedo go wɔ be ale si wotiaa prime siwo gã ale sia la eye woɖoa kpe ɖe woŋu. Nu sia aɖeke matrɔ gɔmesese si le asiwò fifia o; ena wòle nyuie wu. Míaɖe dzesi de esiawo ŋu, eye míagbugbɔ tsɔ dzesidede va, ne nyati si ava me hia.

---

## 9. Nuxlẽme ƒe takpekpe

- Cryptography hia xexlẽme ƒe ɖoɖo si **le se, le ete, mekpea lolome ŋu o, element ɖe sia ɖe ƒe trɔtrɔ le, eye egã kpuie.** Ɖoɖo ma nye **agbanɔ̃ me xexlẽme**.
- Gɔmesese la nye **gaƒoƒo**: xexlẽme si **trɔna yi gome** (modulo ƒe xexlẽme), si tutui xexlẽme aɖe ƒe "lolome" ɖa.
- Ne wòwɔ xexlẽme kple xexlẽmewo `0..p-1` mod **prime** `p` la, nàxɔ xexlẽme ƒe aƒe vavã `F_p`, si me àte ŋu **amã** hã elabena nonzero element ɖe sia ɖe ƒe inverse le.
- Modulus la **le be wòanye prime**: composite modulus wɔa zero divisorwo (abe `2 x 3 = 0 mod 6` ene) eye egbãa mama.
- Computerwo dina inversewo kaba to **Fermat ƒe Theorem Sue** (`a^(-1) = a^(p-2)`) dzi.
- Le **Zcash** me la, key, adzɔgbeɖeɖe, gaɣaɣla ɖeɖe dzesi, kple proof element ɖe sia ɖe nye agbanɔ̃ me xexlẽme gã aɖe ƒe element le gɔme vavã me (bit 255 ƒe Pasta fieldwo na Orchard, bit 381 ƒe field na Sapling ƒe BLS12-381).

---

## Nya ƒe gɔgblɔwo

| Nya | Eƒe gɔme le English bɔbɔe me |
|---|---|
| **Modular arithmetic** | Xexlẽme si trɔna yi gome ne woɖo asixɔxɔ si woɖo ɖe edzi, abe gaƒoƒo ene |
| **mod p** | "Ma `p` me eye nàtsɔ hagbegbe ko" |
| **Field** | Xexlẽme ƒe ɖoɖo si me tsɔkpe, ɖeɖe le eŋu, zizi, kple mama katã wɔa dɔ |
| **Finite field `F_p`** | Xexlẽmewo `0..p-1` siwo me woƒe xexlẽme wɔna mod prime `p` |
| **Inverse (reciprocal)** | Element `a^(-1)` si na `a x a^(-1) = 1`; "mama `a` me" fia be wòzia kple e |
| **Zero divisor** | Nonzero asixɔxɔ eve siwo ƒe zizi nye zero; nu si gbãa composite moduluswo |
| **Prime** | Xexlẽme blibo si gã wu 1 eye akpa aɖeke mele eƒe me tsɔ ɖe 1 kple eɖokui ŋu o |

---

## Biabia siwo wobiaa zi geɖe

**Nu ka ta míezãa integer alo decimal xexlẽme bɔbɔe o?**
Decimalwo trɔa eye wodzraa; integerwo gãna yi edzidzi eye wodea woƒe lolome fia. Agbanɔ̃ me xexlẽmewo le ete, le se, eye mekpea lolome ŋu o, si cryptography hia.

**"Trɔtrɔ yi gome" naa nyanyui bua?**
Ɛ̃, le ta. Tututui intermediate valuewo ƒe lolome ɖa nye keke, menye vodada o, na ɣaɣla.

**Prime gã wu ɣesiaɣi aƒo ta ɣaɣla wu?**
Le gɔmesese bɔbɔe me la, field gã wu fia be asixɔxɔ geɖe wu li eye flilimakaka sesẽ wu, ke dzadzɛɣe ƒe se le ɖoɖo blibo ŋu, menye field ƒe lolome ko ŋu o. Nyati siwo ava la aɖe esia fia nyuie.

**Nu ka ta prime siawo tututu (bit 255, bit 381) le Zcash me?**
Wotia wo be curve siwo woatu ɖe woŋu la nakpɔ nɔnɔme si le ete kple dɔwɔwɔ nyuie na proof system la. "Nɔnɔme si le ete" ma nye nyati siwo ava emegbe eve ƒe tanya.

---

### Ɖo wò gɔmesese kpɔ

Le `F_7` me, `5 - 6` nye nu ka? (Ɖo ŋku edzi: nɔ ɖe `{0,...,6}` me to trɔtrɔ yi gome dzi.) *(Ŋuɖoɖo le ete.)*

<details><summary>Ŋuɖoɖo</summary>

`5 - 6 = -1`, eye `-1` si wotrɔ va ɖe `F_7` me nye `6` (elabena `6 + 1 = 7 = 0`). Eyata `5 - 6 = 6 (mod 7)`. Ɖeɖe le eŋu medoa go le aƒea me o; etrɔna yi gome kple mɔ bubu ko.
</details>

---

### Nu si ava

**Nyati 2 . Elliptic curvewo:** míatsɔ agbanɔ̃ me xexlẽme si míetu fifia la atu curve ƒe ƒome wɔnuku aɖe si ƒe pointwo ate ŋu "atsɔkpe" kple wo nɔewo. Point mawo zu Zcash ƒe keywo kple adzɔgbeɖeɖewo, eye woɣla mɔ ɖeka si megbɔtrɔ o, si wɔa be ɣaɣla ƒe ɖoɖo blibo le mɔkpɔkpɔ me. Gɔmesese va gbã, abe ɣesiaɣi ene.

*Akpa le* Zcash tso gɔmedzedze ƒe nɔnɔme me *series na [ZecHub](https://zechub.org). Woɖe mɔ na eƒe zãzã le CC BY-SA 4.0 te.*

# Elliptic Curves: Afisi Zcash ƒe Safuiwo kple Adzɔgbeɖeɖewo Le Dzi
##### Ɖeɖefia Gbãtɔ tso [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](/content-images/image-10-c1097b22d7.webp)

### Mɔ si dzi wòate ŋu ayi ɖe ŋgɔ ko, eye wotu tso afisiwo ŋu

> **Ƒome:** *Zcash tso Gɔmedzedze ƒe Gɔme* . **Nusiŋɔŋlɔ 2 . Elliptic Curves**
> **Ame siwo wotu na:** ame yeyeawo. Míebu be nènya [Nusiŋɔŋlɔ 1 (finite fields)](article-1-finite-fields.md) ko: xexlẽ si trɔa yi ɖe gɔmedzenu me le prime me. Medzidzɔge bubu aɖeke mele be wòhiã o.
> **Nusi nàdzɔ ɖe eme:** nufia si nya me le elliptic curves ŋu, "trapdoor" si wɔna be wònye nu si wòahiã, kple ale si Zcash trɔe zu safuiwo kple adzɔgbeɖeɖewo.

[Nusiŋɔŋlɔ 1](article-1-finite-fields.md) na mí dzɔƒe nyui aɖe na xexlẽ: finite field. Gake field ɖeka ko nye xexlẽwo. Be wòatu safuiwo kple "agbalẽkuku si wodze" tso [Nusiŋɔŋlɔ 0](article-0-shielded-transaction.md) me, Zcash hia nu si me kuxi ƒe ƒome si yina ɖe mɔ ɖeka dzi le: wòbɔbɔ be wòawɔe yi ŋgɔ, gake eƒe megatrɔ gbɔ nye nu si womate ŋu awɔ o. Nu mae nye **elliptic curve**. Nusiŋɔŋlɔ sia tuae tso gɔmedzenu me, nufia le algebra ŋgɔ.

---

## 1. Nu ka tae wòle be nàtsɔe ɖe susu me?

Ɣaɣla ƒe ɖoɖo ɖe sia ɖe hia **mɔ si dzi wòate ŋu ayi ɖe ŋgɔ ko**: dɔwɔwɔ si bɔbɔ be woazɔ yi ŋgɔ, eye si megatrɔ gbɔ nye nu si womate ŋu awɔ o.

Eya tae. Wò **safui ɣaɣla** nye xexlẽ si nèɖea ɣla. Wò **safui si le duto ƒe ŋkume** (kple wò gaɖoƒe ƒe dzesi) tsoe me eye wofia na xexlẽame blibo. Ɖoɖo la ƒe dedie blibo le nyateƒe ɖeka dzi: *Ne woɖe safui si le duto ƒe ŋkume la, ame aɖeke mate ŋu atrɔ yi megbe va wò safui ɣaɣla gbɔ o.* Ne woate ŋu awɔe, woate ŋu azã wò ga.

Eya ta míhia matematik ƒe dɔwɔwɔ si me:

- zɔzɔ **yi ŋgɔ** (ɣaɣla -> si le duto ƒe ŋkume) le kabakaba eye wòbɔbɔ, gake
- zɔzɔ **yi megbe** (si le duto ƒe ŋkume -> ɣaɣla) sesẽ ale gbegbe be computerwo katã siwo le anyigba dzi, ne wowɔ dɔ le xexlẽgbegbe ƒe agbenɔƒe blibo, womakpɔ nuwuwu o.

Finite-field ƒe hahã ɖeka menya o; mamae trɔe gbɔ enumake (emae nye Nusiŋɔŋlɔ 1 ƒe tame blibo). Míhia nu si me "trɔe gbɔ" ƒe button bɔbɔ aɖeke mele o. Elliptic curves naa esia ke, eye be woakpe ɖe eŋu la, woƒe afisiwo ɖoa wo ƒe nuku ƒo le mɔ si nyo na adzɔgbeɖeɖewo tutu. Míakpɔ ale si wòle.

---

## 2. Nufia: afisi si ŋu wòate ŋu "na afisi eve ƒo"

Mèbu cryptography ŋu kpɔ o. **Elliptic curve** nye afisiwo ƒe ha ko `(x, y)` siwo wɔ equation si le ƒome sia me:

```
y^2 = x^3 + ax + b
```

Le xexlẽ siwo le gɔmedzenu me la, wòle abe afisi ƒe mɔ bɔbɔ si le yiyi ene, zi geɖe wòna woakpɔ akpa si ƒe nuku le akpa eye tail eve:

![alt text](/content-images/image-14-1d2e8c25d2.webp)

Nu si wɔa be womakpɔe o lae nye esi: **Wòate ŋu "na afisi eve ƒo" le curve sia dzi be wòakpɔ afisi etɔ̃ si le curve ma ke dzi.** Esia menye coordinates ƒe nukuɖoɖo gbɔgbɔ o. Geometric se aɖe wònye, eye wòbɔbɔ be woakpɔe kple ŋku wu be woagblɔe.

### Chord se (afisi vovovowo eve ƒe nukuɖoɖo)

Be nàtsɔ `P + Q` aɖo nuku:

1. Ɖo mɔ dzɔdzɔe aɖe to `P` kple `Q` me.
2. Mɔ ma ƒo kple curve la le teƒe bubu ɖeka pɛ. Yɔe be `R*`.
3. **Trɔ `R*` yi ɖe horizontal axis ƒe akpa bubu.** Eƒe trɔtrɔe nye ɖoɖo la, `P + Q`.

![alt text](/content-images/image-11-61f3df1989.webp)

### Tangent se (afisi aɖe kple e ŋutɔ ƒe nukuɖoɖo)

Be nàwɔ `P + P` (si woŋlɔna be `2P`), afisi evelia mele be nàto mɔ dzi o, eyata zã **tangent** mɔ le `P` gbɔ ɖe eteƒe, eye nàwɔ "ƒome etɔ̃, ekema trɔ" ƒe mɔ ma ke.

Emae nye dɔwɔwɔ blibo. Geometric se eve. Kple wo, elliptic curve ƒe afisiwo wɔ nu si mathematicianwo yɔna be **group**: nuwo ƒe ha si me "nukuɖoɖo" dzɔ nyuie. Esi tsɔ "zero" gɔ̃ hã le eme.

### Afisi si le mavɔ (curve la ƒe zero)

Xexlẽ ƒe ɖoɖo ɖe sia ɖe hia `0`, nu si metrɔa naneke o ne nàtsɔe kpe ɖe eŋu. Le elliptic curve dzi la, afisi bubu aɖe si yɔna be **afisi si le mavɔ** nye nu ma, eye woŋlɔna be `O`. Àte ŋu abu be ele "kakaɖedzi le dzi," afi si mɔ verticalwo ƒoa. Ne nàtsɔ `O` akpe ɖe afisi aɖeke ŋu la, ele eƒe nɔnɔ me, abe alesi nàtsɔ `0` akpe ɖe eŋu ene.

---

## 3. Tso aworanwo me yi finite field me

Curve bɔbɔ si le etame nye *nufia*. Gake Zcash mezã xexlẽ siwo le gɔmedzenu o (wona woƒe nɔnɔ nɔ trɔtrɔ eye wona nɔnɔ ƒe lolome, abe Nusiŋɔŋlɔ 1 gblɔ ene). Ezã elliptic curve **le finite field me**: equation `y^2 = x^3 + ax + b` ma ke, gake xexlẽ katã wɔna le prime aɖe me.

Ne nàwɔ esia la, curve nyui ma gbã ɖe **dotwo siwo mate ŋu aka ɖe wo nɔewo ŋu o** me, dot ɖeka na `(x, y)` pair ɖe sia ɖe si wɔ equation la le `p` me. Mekpɔa ɖe abe curve gɔ̃ o. Gake esiae nye nu vevi:

> **Chord-and-tangent se la ƒe algebra wɔ dɔ bɔbɔ ɖe edzi hã.** Formula mawo siwo kpɔ `P + Q` le geometric mɔ nu la, azɔ wɔnɛ kple finite-field ƒe xexlẽ. Dotwo ha ɖe sia ɖe hã wɔ group, kple `0` ma ke (afisi si le mavɔ).

Míana esia nanye nu si le ete kple kpɔɖeŋu sue si wodzro blibo.

### Curve blibo si wowɔ xexlẽe tututu

Tsɔ `y^2 = x^3 + 2x + 2` le finite field `F_17` me. Ne nèxle afisi siwo katã le eme la, nàkpɔ afisi **18 tututu, kpe ɖe afisi si le mavɔ ŋu = 19 le katã.** Woe dometɔ aɖewo:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Azɔ tsɔ afisi `G = (5, 1)` eye nàtsɔe kpe ɖe eŋutɔ ŋu zi geɖe. Kpɔ nu si dzɔa (woxle fli ɖe sia ɖe si le anyi la, wometsɔe ɖo ɖe mɔ aɖeke o):

| Afɔ | Afisi | Afɔ | Afisi |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (mavɔ)** |
| `10G` | (7, 11) | | |

Nu eve si wòle be nàkpɔ:

- Eƒoa **afisi finite 18 katã dzi eye eɖo `O`** le afɔ 19, ekema woatrɔ awɔe akpɔ ɖe mavɔ me. Afisi si wotsɔ dze egɔme `G` "wɔa" group blibo, eyata míeyɔe be **generator**.
- Group si wodzro wònye: le kpɔɖeŋu me `1G + 2G = (5,1) + (6,3) = (10,6)`, si nye `3G` tututu. Nukuɖoɖo la me nɔnɔ le eme, abe alesi group hia ene.

---

## 4. Trapdoor: scalar multiplication

`1G, 2G, 3G, ...` ƒe kplɔ̃ ma nye nu katã ƒe dzi. Afisi aɖe ƒe nukuɖoɖo kple eŋutɔ zi geɖe yɔna be **scalar multiplication**: afisi `kG` gɔme nye "`G` si woɖo eƒe nuku kple eŋutɔ zi `k`."

Azɔ nu wɔnuku la. Bu mɔ eve siawo ŋu:

| Mɔ | Biabia | Kuxi |
|---|---|---|
| **Yi ŋgɔ** | Ne woɖe `k` kple `G`, xle `kG` | **Ewɔ bɔbɔ.** Na `k` siwo gã wu nu si ŋkuate ŋu akpɔ hã, mɔ aɖe si yɔna be *double-and-add* wɔe le afɔ alafa aɖewo me |
| **Yi megbe** | Ne woɖe `G` kple `kG`, kpɔ `k` | **Womate ŋu awɔe le nyateƒe me o** le cryptographic curve vavã aɖe dzi |

Mɔ eve ma ƒe vovototoe nye **mɔ si dzi wòate ŋu ayi ɖe ŋgɔ ko** si míehia le Akpa 1 me. Problem si le megbe ("`k` kae wɔ afisi sia?") yɔna be **Elliptic Curve Discrete Logarithm Problem (ECDLP)**, eye le curvewo si Zcash zã la dzi, mɔ aɖeke si wòanya fifia mate ŋu awɔe hafi xexlẽgbegbe ƒe tsitotsito aɖo nuwuwu o.

![alt text](/content-images/image-12-86b9ace6cb.webp)

> Le míatɔ toy `F_17` curve la dzi, àte ŋu axle `k` tso kplɔ̃ la me pɛ, elabena afisi 19 koe le eme. Curve vavãwo ƒe afisiwo sɔ abe `2^(255)` ene. Kplɔ̃ la ƒe fliwo asɔ wu atom siwo le xexlẽgbegbe me, eyata "xexlee tso kplɔ̃ me" menye mɔ aɖeke o. Eƒe sueŋue wɔa be toy curve la nɔa bɔbɔ na nufia eye eya ke hã tae menye dedie o.

---

## 5. Ale si safuiwo doa (nu si wòakpɔ le egbe)

Azɔ míexɔ nu siwo katã míehia be míagblɔ cryptographic safui vavã aɖe ŋu, eye wòle bɔbɔ vevie:

> **Tia xexlẽ ɣaɣla `k`. Ɖe afisi `kG` fia na amewo. Ema ko.**
> `k` nye wò **safui ɣaɣla**. `kG` nye wò **safui si le duto ƒe ŋkume**. Mɔ si dzi wòate ŋu ayi ɖe ŋgɔ ko (ECDLP) naa dedie be ame aɖeke mate ŋu atrɔ `kG` yi `k` gbɔ o.

Susume ɖeka sia, *safui si le duto ƒe ŋkume nye scalar ɣaɣla aɖe si woɖo nuku kple generator fixed aɖe*, nye Zcash ƒe gazazãsafuiwo, nukpɔsafuiwo, kple gaɖoƒe ƒe dzesiwo ƒe ɖɔ. Safui ƒe ati blibo tsɔ ɖoɖo geɖe kpe ɖe eŋu, gake ƒe ɖe sia ɖe tso agbagba sia me doa.

### Bonus: Nu ka tae curve ƒe afisiwo nyo na adzɔgbeɖeɖewo

Ðo ŋku "agbalẽkuku si wodze" (adzɔgbeɖeɖe) tso Nusiŋɔŋlɔ 0 me ŋu, si wòle be wòaɖe eƒe nuwo ɣla gake womate ŋu aɖɔe o. Elliptic curves naa mɔ dzɔdzɔe mí be míatu esia. Tsɔ generator ƒe afisi public eve fixed `G` kple `H`, asixɔxɔ ɣaɣla `v`, kple xexlẽ random si ɖe nu ɣla `r`, eye nàwɔ:

```
Commitment  =  v.G  +  r.H
```

Esia nye **Pedersen adzɔgbeɖeɖe**, eye nu siwo míedia eve le eŋu:

- **Ɣaɣlatsi:** `r` random la ɖe result la ɖe curve blibo dzi, eyata afisi la megblɔ naneke tso `v` ŋu o.
- **Blibodede:** ECDLP naa be womate ŋu akpɔ `(v, r)` bubu si ana afisi ma ke o, eyata màte ŋu atrɔ wò susu tso nu si nèɖe asi ɖo la ŋu o.

Bonus ƒe nɔnɔ aɖe doa le eme si me ga sɔ kple nu vavã le megbe: adzɔgbeɖeɖewo **ɖoa nuku**. Adzɔgbeɖeɖe na `v_1` kple adzɔgbeɖeɖe na `v_2` ƒe nukuɖoɖo nye adzɔgbeɖeɖe si sɔ na `v_1 + v_2`. Nɔnɔ "homomorphic" siae nye ale si Zcash aɖe ɖase le megbe be ga si yina *ge ɖe* gaɖoɖo aɖe me sɔ kple ga si yina *doa goe*, togbɔ be womaɖe ga ƒe home aɖeke fia o. Míazãe le Nusiŋɔŋlɔ 6 gbɔ.

---

## 6. Afi si esia le le Zcash

Eƒe dzesiwo le ete eye wòate ŋu adzro wo.

| Zcash ƒe ɖoɖo | Curvewo si ezã | Dɔ |
|---|---|---|
| **Sapling** (xoxoa) | **BLS12-381** kple curve si woɖe ɖe eme si yɔna be **Jubjub** | BLS12-381 tsɔ ɖaseɖigbalɛ ƒe ɖoɖo la; Jubjub le BLS12-381 ƒe scalar field dzi, ale be safui kple adzɔgbeɖeɖe ƒe dɔwɔwɔwo asɔ gbɔ le zero-knowledge ɖaseɖigbalɛ aɖe me |
| **Orchard** (fifia) | **Pallas** kple **Vesta** (the "Pasta" cycle) | Pallas tsɔ Orchard ƒe safuiwo kple adzɔgbeɖeɖewo; Pallas/Vesta ƒe kadodo ƒe ɖoɖo wònye tɔxɛ be advanced ɖaseɖigbalɛwo nanɔ dɔ wɔm nyuie |

Nya siwo tae woɖea curve aɖe ɖe bubu ƒe field me, kple nu ka tae *cycle* ƒe curve eve hiã, nye nyateƒe siwo le vevi, gake wole ɖaseɖigbalɛ ƒe ɖoɖo ƒe nusiŋɔŋlɔwo me. Fifi la, nusi si wòle be nàxɔ la sesẽ: **Zcash ƒe safui ɖe sia ɖe nye scalar aɖe si woɖo nuku kple generator aɖe, eye Zcash ƒe adzɔgbeɖeɖe ɖe sia ɖe nye curve ƒe afisiwo ƒe nukuɖoɖo**, siwo le curve siwo wɔ woƒe ŋkɔ le afisia dzi.

![alt text](/content-images/image-13-ffdd703c60.webp)

---

## 7. Nyateƒe ƒe nyagblɔɖi

Míeɖe nusiwo kpe ɖe agbalẽ sia ƒe bɔbɔŋu ŋu ɖe te. Míezã **short Weierstrass** form (`y^2 = x^3 + ax + b`); Zcash ƒe curvewo woŋlɔa wo zi geɖe le form bubu siwo sɔ kple eme (Jubjub nye *twisted Edwards* curve) si woatia na dɔwɔwɔ nyui kple dedie, gake group ƒe susu la ke tututu wònye. Míemede afisiwo ƒe nukuɖoɖo ƒe formula tututu gɔme o (wɔe le algebra ƒe mɔ nu nye "ƒome etɔ̃, ekema trɔ"), eye míeɖe nu siwo le curve ƒe order, cofactors, kple "pairings" ŋu ɖe te, siwo zu vevi le ɖaseɖigbalɛ ƒe ɖoɖo ƒe nusiŋɔŋlɔwo me. Esia katã metrɔ nufia la o; ewɔe nyuie wu.

---

## 8. Nudzodzro

- Ɣaɣla ƒe ɖoɖo hia **mɔ si dzi wòate ŋu ayi ɖe ŋgɔ ko**: wòbɔbɔ be wòawɔe yi ŋgɔ, gake megatrɔ gbɔ sesẽ. Elliptic curves naa esia.
- **Elliptic curve** nye afisiwo siwo wɔ `y^2 = x^3 + ax + b` ƒe ha, eye wòate ŋu **aɖo wo nuku** to geometric **chord-and-tangent** se la dzi, kple **afisi si le mavɔ** aɖe si wɔa zero ƒe dɔ.
- Le **finite field** me la, curve la zu dotwo siwo ka ɖe wo nɔewo ŋu o, gake nukuɖoɖo ma ke wɔa dɔ eye afisiwo wɔa **group**. (Kpɔɖeŋu si wodzro: `y^2 = x^3 + 2x + 2` le `F_17` me ƒe afisi 19 le eme, eye `G = (5,1)` wɔ wo katã.)
- **Scalar multiplication** `kG` wòbɔbɔ be woaxle, gake megatrɔ gbɔ sesẽ: **ECDLP**. Emae nye trapdoor.
- **Safuiwo:** safui ɣaɣla `k`, safui si le duto ƒe ŋkume `kG`. **Adzɔgbeɖeɖewo:** Pedersen ƒe form `v.G + r.H`, si ɖea nu ɣla, dea asi ɖe eŋu, eye wòate ŋu **aɖo nuku**.
- Le **Zcash** me, Sapling zã **BLS12-381 + Jubjub** eye Orchard zã **Pallas/Vesta (Pasta)** curvewo; safui kple adzɔgbeɖeɖe ɖe sia ɖe le wo dzi.

---

## Nyawo ƒe gɔmedzedze

| Nyagbe | Gɔme si le Eŋlisigbe bɔbɔ me |
|---|---|
| **Elliptic curve** | Afisiwo siwo wɔ `y^2 = x^3 + ax + b`, kple afisiwo ƒe "nukuɖoɖo" tɔxɛ aɖe |
| **Afisiwo ƒe nukuɖoɖo** | Chord-and-tangent se: mɔ to afisi eve me, tsɔ afisi etɔ̃ si wòƒo la, trɔe |
| **Afisi si le mavɔ (`O`)** | Curve la ƒe "zero"; ne nàtsɔe akpe ɖe nu aɖe ŋu la metrɔa naneke o |
| **Generator (`G`)** | Afisi gɔmedzedze aɖe si eƒe multipleswo tsɔa ɖe group blibo dzi le megbe |
| **Scalar multiplication (`kG`)** | `G` ƒe nukuɖoɖo kple eŋutɔ zi `k`; wòbɔbɔ be woawɔe yi ŋgɔ, gake megatrɔ gbɔ sesẽ |
| **ECDLP** | Problem sesẽ si nye be woakpɔ `k` tso `kG` me; dedie ƒe fɔɖoƒe |
| **Pedersen adzɔgbeɖeɖe** | `v.G + r.H`; agbalẽkuku si wodze, si ɖea nu ɣla, dea asi ɖe eŋu, eye wòate ŋu aɖo nuku |

---

## Biabia siwo wobia zi geɖe

**Nu ka tae curvewo le enu, ɣe menye xexlẽ gãwo ko le prime aɖe me o?**
Wo evea katã ate ŋu ana mɔ si dzi wòate ŋu ayi ɖe ŋgɔ ko, gake elliptic curves na dedie ma ke kple safui siwo sue akpa aɖe, dɔwɔwɔ kabakaba, eye woƒe afisi ƒe xexlẽ nyo na adzɔgbeɖeɖewo.

**Wode ɖase be ECDLP sesẽa?**
Womede ɖase be womate ŋu awɔe o, gake ƒe ewo ƒe dɔkpekpe sesẽ la me, womate kpɔ attack si wɔa dɔ nyuie ɖe curve siwo wotia nyuie la dzi o. Dedie la ɖo ɖe susu ma si wodzro nyuie la dzi.

**Quantum computer aɖe ate ŋu agbãe?**
Quantum computer si gã ɖe ema ŋu ate ŋu agbã ECDLP. Esia nye nusi ƒe fifi hã wokpɔa ɖe eme le gbedoxɔme le industry blibo me eye wole research ƒe dɔwɔƒe; curve siwo le egbe la le dedie ɖe classical computerwo ŋu.

**Nu ka tae Zcash zã curve geɖe?**
Dɔwo vovo. Curve aɖe tsɔ zero-knowledge ɖaseɖigbalɛ ƒe ɖoɖo; bubu (si woɖe ɖe first ƒe field me) wɔna be safui kple adzɔgbeɖeɖe ƒe dɔwɔwɔwo le ɖaseɖigbalɛ me nanɔ dɔ wɔm nyuie. Nusiŋɔŋlɔ siwo kplɔe ɖo la aɖe gbe na nu ka tae kadodo ma le vevi.

---

### Dzro wò nufia me

Ne nàzã kplɔ̃ si wodzro le Akpa 3 me, nu kae nye `9G + 10G` le míatɔ toy curve la dzi? Eye nu kae ɖoɖo la gblɔ na wò tso `G` ŋu? *(Ɖoɖo la le anyi.)*

<details><summary>Ɖoɖo</summary>

`9 + 10 = 19`, eye míekpɔ be `19G = O`, afisi si le mavɔ. Eyata `9G + 10G = O`. Esia fia be `10G` nye `9G` ƒe **negative** (additive inverse): afisi eve siwo ƒe nukuɖoɖo na "zero" ƒe afisi. Le curve aɖe dzi la, afisi ƒe negative nye eƒe aworan si wotrɔ yi x-axis ƒe akpa bubu ko, eye vavã `9G = (7,6)` kple `10G = (7,11)` ƒe `x` ma ke le eye woƒe `y`-valueswo ƒe nuku sɔ `17 = 0 (mod 17)`. Ɖoɖo la ƒe nɔnɔ le eme bliboe, si nye nu tututu si "enye group" gblɔna be wana.

</details>

---

### Nu si kplɔe ɖo

**Nusiŋɔŋlɔ 3 . Hashing kple adzɔgbeɖeɖewo:** míaʋu "magic sealed envelope" la me nyuie. Azɔ nèkpɔ mɔ ɖeka si dzi woate ŋu atsa adzɔgbeɖeɖe to curve ƒe afisiwo dzi; si kplɔe ɖo la, míabia nu si ɣaɣlatsi kple blibodede gɔme vavã nye, míakpɔ hash functions, eye míakpe wo evea ɖe didienu ƒe adzɔgbeɖeɖewo siwo doa ɖe Zcash fexexe ɖe sia ɖe ŋu.

*Le* Zcash tso Gɔmedzedze ƒe Gɔme *ƒe ƒome me na [ZecHub](https://zechub.org). Licensed CC BY-SA 4.0.*

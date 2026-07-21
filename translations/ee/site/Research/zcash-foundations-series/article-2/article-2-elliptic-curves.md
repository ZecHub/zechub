# Elliptic Curves: Afisi Wodzi Zcash ƒe Safuiwo Kple Adzɔgbeɖeɖewo Le
##### Numekuku Gbãtɔ tso [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nuŋɔŋlɔ](image-10.png)

### Mɔdodo ɖeka si wotu tso teƒe siwo le mɔ si woƒo xlãe dzi

> **Series:** *Zcash tso Gɔmeɖose Gbãtɔwo me* . **Nyati 2 lia . Elliptic Curves** ƒe Ʋuʋudedi**
> **Nyaselawo:** ame yeyewo. Míetsɔe be [Nyati 1 (anyigba siwo seɖoƒe li na) koe.](article-1-finite-fields.md): akɔntabubu si xatsa ɖe mod a prime ŋu. Mehiã be woatso teƒe bubu aɖeke o.
> **Nusi nàgblẽ ɖi:** elliptic curves ƒe nɔnɔmetata si me kɔ eye wòsɔ, "mɔ̃" si na woɖea vi, kple alesi tututu Zcash trɔa wo wozua safuiwo kple adzɔgbeɖeɖewo.

[Nyati 1 lia](article-1-finite-fields.md) na míekpɔ fefewɔƒe deblibo aɖe na akɔntabubu: afisi seɖoƒe li na. Gake agble le eɖokui si nye xexlẽdzesiwo ko. Be woatu safuiwo kple "akplo siwo wotre nu na" tso [Se 0](article-0-shielded-transaction.md), Zcash hiã na nusi ƒe sesẽme tɔxɛ, si le mɔ ɖeka dzi: akɔntabubu le bɔbɔe yi ŋgɔ, manya wɔ kloe be woatrɔe o. Nu ma nye **elliptic curve**. Nyati sia tue tso gɔmedzedzea me ke, intuition do ŋgɔ na algebra.

---

## 1. Nu ka tae wòle be nàtsɔ ɖe le eme?

Ameŋunyatakakawo takpɔkpɔ ƒe ɖoɖo ɖesiaɖe hiã **mɔ ɖeka dzi**: dɔwɔwɔ si mehiã boo o be woazɔ ayi ŋgɔ eye le nyateƒe me la, manya wɔ be woatrɔ ayi megbe o.

Nusitae nye esi. Wò **safui ɣaɣla** nye xexlẽdzesi si nèɣla. Woɖe wò **dutoƒo safui** (kple wò adrɛs) tso eme eye woɖee fia xexeame. Nuɖoanyia ƒe dedienɔnɔ bliboa nɔ te ɖe nyateƒenya ɖeka dzi: *ne wotsɔ dutoƒo safuia na la, ame aɖeke mate ŋu awɔ dɔ atrɔ ɖe wò safui ɣaɣla ŋu o.* Ne woate ŋui la, woate ŋu azã wò ga.

Eyata míehiã akɔntabubu ƒe dɔwɔwɔ si me:

- yiyi **yi ŋgɔ** (nya ɣaɣla -> dutoƒo) le kabakaba eye wòle bɔbɔe, gake
- yiyi **megbe** (dutoƒo -> nya ɣaɣla) sesẽ ale gbegbe be kɔmpiuta siwo katã le Anyigba dzi siwo le dɔ wɔm le xexeame katã ƒe agbenɔɣi katã la mawu enu o.

Seɖoƒe ƒe dzidziɖedzi gbadzaa menyo o; mama ɖee ɖa enumake (emae nye nya bliboa si le Se 1 lia me). Míehiã nane si me "undo" ƒe dzesi bɔbɔe aɖeke mele o. Elliptic curves naa nu ma tututu, eye abe bonus ene la, woƒe dzesiwo ƒoa ƒu le mɔ si sɔ nyuie na ŋugbedodowo tutuɖo nu. Na míakpɔ alesi wòawɔe ɖa.

---

## 2. Intuition: curve si ƒe nyawo nàte ŋu "atsɔ akpe ɖe eŋu".

Ŋlɔ nya ɣaɣlawo ƒe nuŋɔŋlɔ be vie. **elliptic curve** nye teƒewo ƒe ƒuƒoƒo ko `(x, y)` si naa nɔnɔmea ƒe sɔsɔŋuɖoɖo aɖe nadze ame ŋu:

```
y^2 = x^3 + ax + b
```

Le xexlẽdzesi dzrowo gome la, edzena abe ʋuƒo si le gbadzaa, si le ʋuʋum ene, eye zi geɖe la, eƒe ka le goglo eye eƒe asike eve:

![alt nuŋɔŋlɔ](image-14.png)

Akpa si wɔ nuku ŋutɔŋutɔ: **àte ŋu "atsɔ" teƒe eve akpe ɖe fli sia ŋu be nàkpɔ teƒe etɔ̃lia le fli ɖeka ma ke dzi.** Esia menye kɔordinatewo ƒe tsɔtsɔ kpee dzro ko o. Enye geometric se, eye ele bɔbɔe be * woakpɔ* wu be woagblɔ.

### Chord rule (tsɔ nya vovovo eve kpee) .

Be míatsɔ akpe ɖe eŋu `P + Q`:

1. Kpa fli dzɔdzɔe aɖe to eme `P` kple `Q`.
2. Fli ma dzea mɔa dzi le teƒe ɖeka pɛpɛpɛ. Yɔe `R*`.
3. **Klẽ `R*` across the horizontal axis.** Ŋugbledede mae nye ŋuɖoɖoa, . `P + Q`.

![alt nuŋɔŋlɔ](image-11.png)

### Tangent rule (si tsɔa dzesi aɖe kpena ɖe eɖokui ŋu) .

Be woawɔ akɔntabubu `P + P` (wo ŋlɔ `2P`), teƒe evelia aɖeke meli si me nàta fli ato o, eyata èzãa **tangent** fli le `P` ke boŋ, emegbe zɔ ɖe "tsoƒe etɔ̃lia, emegbe nàde ŋugble" ƒe nuɖaɖa ma ke dzi.

Emae nye dɔwɔwɔ bliboa. Geometri ƒe se eve. Le wo gome la, elliptic curve ƒe teƒewo wɔa nusi akɔntanyalagãwo yɔna be **ƒuƒoƒo**: ƒuƒoƒo si me "tsɔtsɔ kpe ɖe" si wɔa nu nyuie le. "Zero" gɔ̃ hã le esi.

### Teƒe si le seɖoƒemanɔmanɔ (curve la ƒe zero) .

Xexlẽdzesiwo ƒe ɖoɖo ɖesiaɖe hiã a `0`, nusi metrɔa naneke ne ètsɔe kpee o. Le elliptic curve dzi la, akpa ma nyea teƒe tɔxɛ aɖe si wotsɔ kpe ɖe eŋu si woyɔna be **teƒe si le seɖoƒemanɔsitɔ**, si woŋlɔ `O`. Àte ŋu akpɔe le susu me be enye "didiƒe si seɖoƒe meli na o," teƒe si fli siwo le tsitrenu do go le. Tsɔ kpe ɖe eŋu `O` vaseɖe afi sia afi la, egblẽnɛ ɖi matrɔmatrɔe, abe alesi wòtsɔe kpee ene pɛpɛpɛ `0`.

---

## 3. Tso nɔnɔmetatawo dzi va ɖo agble si seɖoƒe li na dzi

Curve si le gbadzaa si le etame lae nye *intuition*. Gake Zcash mezãa xexlẽdzesi ŋutɔŋutɔwo o (wowɔa goglo eye woɖea tsi ƒe lolome, le Se 1 nu). Ezãa elliptic curve **le seɖoƒe aɖe dzi**: equation ma ke `y^2 = x^3 + ax + b`, gake kple akɔntabubuwo katã wowɔ mod a prime.

Ne èwɔe nenema la, fli dzeani la gbãna zua **teƒenɔƒe siwo metso kadodo me o ƒe kaka**, dometsotso ɖeka na wo dometɔ ɖesiaɖe `(x, y)` eve si naa equation mod la dzea eŋu `p`. Edzudzɔa dzedzeme abe ʋuʋudedi ene kura. Gake nu vevitɔe nye esi:

> **Cord-and-tangent sea ƒe algebra gakpɔtɔ wɔa dɔ bliboe.** Mɔfiame mawo ke siwo ŋu woke ɖo `P + Q` le geometri nu azɔ tsɔ akɔntabubu si seɖoƒe li na bu akɔntae. Dot-awo gakpɔtɔ wɔa ƒuƒoƒo, eye wosɔ kple wo nɔewo `0` (teƒe si le seɖoƒemanɔmanɔ me).

Mina míatsɔ kpɔɖeŋu sue aɖe si ŋu woɖo kpee bliboe awɔ esia wòanye nu ŋutɔŋutɔ.

### Curve blibo aɖe, si wobu akɔnta pɛpɛpɛ

Tsɔ `y^2 = x^3 + 2x + 2` le agble si seɖoƒe li na la dzi `F_17`. Ne èbu akɔnta le teƒe ɖesiaɖe si sɔ ŋu la, ana **dzesi 18 pɛpɛpɛ, tsɔ kpe ɖe teƒe si le seɖoƒemanɔsitɔ ŋu = 19 katã.** Wo dometɔ ʋɛ aɖewo:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Azɔ tia nya la `G = (5, 1)` eye nàyi edzi anɔ etsɔm kpe ɖe eɖokui ŋu. Kpɔ nusi dzɔna ɖa (wobu fli ɖesiaɖe si le ete, ke menye ɖe wosusui o):

| Afɔɖeɖe | Nya vevi aɖe | Afɔɖeɖe | Nya vevi aɖe |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (seɖoƒemanɔsitɔ)** |
| `10G` | (7, 11) | | |

Nu eve siwo wòle be míade dzesii:

- **eɖia tsa yia teƒe 18 siwo katã seɖoƒe li na eye emegbe wòɖina ɖe edzi `O`** le afɔɖeɖe 19 lia me la, ekema agbugbɔ awɔe tegbee. Afisi wodze egɔme tsoe `G` "dzi" ƒuƒoƒo bliboa, eyata míeyɔe be **generator**.
- Enye ƒuƒoƒo si ŋu woɖo kpee: le kpɔɖeŋu me `1G + 2G = (5,1) + (6,3) = (10,6)`, si sɔ pɛpɛpɛ `3G`.  Nusi wotsɔ kpe ɖe eŋu la sɔ le ememe, abe alesi ƒuƒoƒo aɖe bia ene.

---

## 4. Mɔ̃a ƒe ʋɔtru: scalar dzidziɖedzi

Tabla ma ƒe... `1G, 2G, 3G, ...` nye nusianu ƒe dzi. Woyɔa teƒe aɖe tsɔtsɔ kpe ɖe eɖokui ŋu enuenu be **scalar multiplication**: teƒea `kG` gᴐme nye "`G` tsɔ kpe ɖe eɖokui ŋu `k` ɣeyiɣiwo."

Fifia akunyawɔwɔa. Bu mɔfiame eve siawo ŋu kpɔ:

| Mɔfiame | Nyabiase | Sesẽme |
|---|---|---|
| **Ŋgɔgbewo** | Na `k` kple `G`, akɔntabubu `kG` | **Easy.** Na ɣletiviŋutinunya ƒe gã gɔ̃ hã `k`, ayemɔ aɖe si woyɔna be *double-and-add* ɖoa afima le afɔɖeɖe alafa ʋee aɖewo me |
| **Megbe** | Na `G` kple `kG`, xɔe gbɔ `k` | **Le nyateƒe me la, manya wɔ o** le cryptographic curve ŋutɔŋutɔ dzi |

Asymmetry ma nye **mɔ ɖeka dzi** si míehiã le Akpa 1. Megbe ƒe kuxia ("si." `k` produced this point?") woyɔna be **Elliptic Curve Discrete Logarithm Problem (ECDLP)**, eye le curve siwo Zcash zãna dzi la, mɔnu aɖeke si wonya mekpɔ egbɔ hafi xexeame katã ƒe dzoxɔxɔ ku o.

![alt nuŋɔŋlɔ](image-12.png)

> Le míaƒe fefenu me `F_17` curve si *ate ŋu* axlẽ ko `k` le kplɔ̃a dzi, elabena dzesi 19 koe le esi. Curves ŋutɔŋutɔwo le ƒo xlãe `2^(255)` nya veviwo. Fli geɖe anɔ kplɔ̃a ŋu wu atɔm siwo le xexeame, eyata "exlẽe ɖa" menye tiatia o. Suenyenyee nye nusi na fefenu ƒe ʋuʋudedi la te ŋu fiaa nu eye wòganye nusitae mele dedie o.

---

## 5. Alesi wodzia safuiwoe (fetu si wokpɔna) .

Nusianu si hiã be míatsɔ aɖe nya ɣaɣlawo ƒe safui ŋutɔŋutɔ me la le mía si fifia, eye ele bɔbɔe nukutɔe:

> **Tia xexlẽdzesi ɣaɣla aɖe `k`. Ta nya la `kG`. Emae nye ema.**
> `k` nye wò **ame ŋutɔ ƒe safui**. `kG` nye wò **dutoƒo safui**. Mɔ ɖeka dzi (ECDLP) ka ɖe edzi be ame aɖeke mate ŋu aƒu du o `kG` trɔ yi `k`.

Susu ɖeka sia, *dutoƒo safui nye adzame scalar zi gbɔ zi generator si woɖo ɖi*, nye Zcash ƒe gazazã safuiwo, kpɔkpɔ safuiwo, kple adrɛswo ƒe nuku. Ati vevi bliboa ƒoa xɔtunu geɖe wu ɖe etame, gake alɔ ɖesiaɖe tsina tso ke sia me.

### Bonus: nusita curve points doa ŋugbe deblibowo

Ðo ŋku "nutrenu kotoku" (ɖokuitsɔtsɔna) si tso Se 0 lia me, si wòle be **ɣla** emenyawo gake **womate ŋu awɔ aʋatso o**. Elliptic curves naa mɔnu dzadzɛ aɖe mí be míatu ɖeka. Tsɔ elektrikŋusẽnamɔ̃ eve siwo woɖo ɖi, siwo le dutoƒo `G` kple `H`, si nye asixɔxɔ ɣaɣla aɖe `v`, kple xexlẽdzesi si gbãa ŋku le vome `r`, kple nɔnɔme:

```
Commitment  =  v.G  +  r.H
```

Esia nye **Pedersen ƒe ɖokuitsɔtsɔna**, eye nunɔamesi eve siwo míedi la le esi:

- **Ɣla:** nusi wowɔ le vome `r` tsɔa nusi do tso eme la ƒua gbe ɖe fli bliboa dzi, eyata nya la meɖea naneke fiana tso eŋu o `v`.
- **Binding:** ECDLP la na be manya wɔ be woake ɖe *to vovo* ŋu o. `(v, r)` nya ma ke gbɔgblɔ, ale be màte ŋu atrɔ susu le nusi nètsɔ ɖokuiwò na ŋu o.

Bonus nunɔamesi aɖe va zua nusi ŋu asixɔxɔ gã aɖe le emegbe: ŋugbedodo siawo **tsɔ wo kpe ɖe eŋu**. Ðokuitsɔtsɔna be... `v_1` tsɔ kpe ɖe ɖokuitsɔtsɔna be `v_2` nye adzɔgbeɖeɖe si sɔ be `v_1 + v_2`. "Homomorphic" nuwɔna ma nye alesi Zcash aɖo kpe edzi emegbe be ga si yi *yi* asitsatsa aɖe me sɔ kple ga si dona *do*, evɔ maɖe ga home aɖeke afia o. Míatsɔ ga awɔ ema le Se 6 lia lɔƒo.

---

## 6. Afisi esia le le Zcash

Asibidɛawo nye kɔnkrit eye woate ŋu alé ŋku ɖe wo ŋu.

| Zcash ƒe nɔnɔme | Curves siwo wòzãna | Akpa si wòwɔna |
|---|---|---|
| **Sapling** (older) | **BLS12-381** plus an embedded curve called **Jubjub** | BLS12-381 carries the proof system; Jubjub is built over BLS12-381's scalar field so that key and commitment operations are cheap to perform *inside* a zero-knowledge proof |
| **Atikutsetsebɔ** (fifia) | **Pallas** kple **Vesta** ("Pasta" ƒe tsatsam) | Pallas tsɔa Orchard ƒe safuiwo kple adzɔgbeɖeɖewo; wowɔ ɖoɖo ɖe Pallas/Vesta ƒe ƒoƒo ɖekae ŋu etɔxɛe be kpeɖodzi deŋgɔwo nawɔ dɔ nyuie |

Susu siwo tae ʋuʋudedi ɖeka "gena ɖe" bubu ƒe agble me, kple nusitae *tsatsa* si me ʋuʋudedi eve le la ɖea vi, nye nu ŋutɔŋutɔwo eye wole vevie, gake wole kpeɖodzi-ɖoɖo ƒe nyatiwo me. Fifia la, takeaway la sesẽ: **Zcash safui ɖesiaɖe nye scalar zi gbɔ zi generator, eye Zcash ƒe ɖokuitsɔtsɔna ɖesiaɖe nye curve points ƒe ƒuƒoƒo**, si nɔa agbe ɖe curve siawo siwo ŋkɔ wo dometɔ ɖeka dzi.

![alt nuŋɔŋlɔ](image-13.png)

---

## 7. Nya aɖe si wogblɔna be yeaɖe asi le nyaa ŋu anukwaretɔe

Nu ʋɛ aɖewo siwo wowɔ wòle bɔbɔe na esia na wote ŋu xlẽa esia. Míezã **Weierstrass kpui** ƒe nɔnɔme (`y^2 = x^3 + ax + b`); Zi geɖe la, woŋlɔa Zcash ƒe ʋuʋudediwo ɖe nɔnɔme bubu siwo sɔ me (Jubjub nye *Edwards* ʋuʋudedi si wotro) si wotia hena dɔwɔwɔ nyuie kple dedienɔnɔ, gake ƒuƒoƒo ƒe susua sɔ. Míeɖe point-addition formulas tututu gɔme o (wonye algebraic version of "third intersection, then reflect"), eye míeɖe subtleties abe curve order, cofactors, kple "pairings," siwo va zua nu veviwo le proof-system nyatiwo me la ɖe vovo. Esiawo dometɔ aɖeke metrɔa nusi wokpɔna le susu me o; eƒonɛ ɖe enu.

---

## 8. Kpuie ko la

- Adzamenyawo gbɔ kpɔkpɔ ƒe ɖoɖo hiã **mɔ ɖeka dzi**: yi ŋgɔ bɔbɔe, megbedede si mate ŋu adzɔ o. Elliptic curves naa ɖeka.
- **elliptic curve** nye teƒe siwo woɖo ɖi siwo naa dzidzeme ame `y^2 = x^3 + ax + b`, eye woateŋu **atsɔ eƒe teƒewo akpe ɖe eŋu** to geometric **chord-and-tangent** sea dzi, eye **teƒe tɔxɛ aɖe si le seɖoƒemanɔmanɔ** awɔ dɔ abe zero ene.
- Le **agble si seɖoƒe li na** dzi la, fli la zua dometsotsowo ƒe kaka, gake kpeɖeŋutɔ ma ke gakpɔtɔ wɔa dɔ eye teƒeawo wɔa **ƒuƒoƒo**. (Kpɔɖeŋu si ŋu woɖo kpee: `y^2 = x^3 + 2x + 2` to eta `F_17` ƒe dzesi 19 le esi, eye `G = (5,1)` dzia wo katã.)
- **Scalar ƒe dzidziɖedzi** `kG` akɔntabubu le bɔbɔe gake manya wɔ be woatrɔe o: **ECDLP** la. Emae nye mɔ̃a ƒe ʋɔtrua.
- **Safuiwo:** ame ŋutɔ ƒe safui `k`, dutoƒo safui `kG`. **Adzɔgbeɖeɖewo:** Pedersen ƒe agbalẽvi `v.G + r.H`, si ɣlaa, blaa nu, eye wòsɔna **tsɔ kpe ɖe eŋu**.
- Le **Zcash** me la, Sapling zãa **BLS12-381 + Jubjub** eye Orchard zãa **Pallas/Vesta (Pasta)** ƒe ʋuʋudediwo; safui ɖesiaɖe kple ɖokuitsɔtsɔna nɔa agbe ɖe esiawo dzi.

---

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| **Elliptic ƒe ʋuʋudedi** | Nya siwo naa dzidzeme ame `y^2 = x^3 + ax + b`, kple "tsɔtsɔ kpe ɖe" nya veviwo ŋu tɔxɛ aɖe |
| **Nya si wotsɔ kpe ɖe eŋu** | Chord-and-tangent ƒe se: fli to teƒe eve, xɔ etɔ̃lia ƒoƒo, ɖe |
| **Fia asi seɖoƒemanɔsitɔ (`O`)** | Curve la ƒe "zero"; etsɔtsɔ kpee metrɔa naneke o |
| **Dzɔdzɔmeŋusẽŋununya (`G`)** | Gɔmeɖoanyi si ƒe xexlẽdzesiwo xɔa ƒuƒoƒo bliboa mlɔeba |
| **Scalar dzidziɖedzi (`kG`)** | Tsɔ kpe ɖe eŋu `G` na eɖokui `k` ɣeyiɣiwo; ŋgɔgbe bɔbɔe, megbedede sesẽ |
| **ECDLP** ƒe ƒuƒoƒo | Kuxi sesẽ si nye hayahaya `k` tso `kG`; dedienɔnɔ ƒe gɔmeɖoanyia |
| **Pedersen ƒe ɖokuitsɔtsɔna** | `v.G + r.H`; agbalẽkotoku si wotu nu ɖo si ɣlaa, blaa nu, eye wòtsɔa |

---

## Nyabiasewo ƒe Nyabiasewo

**Nukatae curves le esi teƒe be xexlẽdzesi gãwo ko mod a prime?**
Wo ame evea siaa ate ŋu ana mɔ ɖeka, gake elliptic curves kpɔa dedienɔnɔ ɖeka ma ke gbɔ ne safui siwo le sue wu sã eye wowɔa dɔ kabakaba wu, eye woƒe point arithmetic sɔ nyuie na ɖokuitsɔtsɔna.

**Ðe woɖo kpe edzi be ECDLP sesẽa?**
Menye *woɖo kpe edzi* be manya wɔ o, gake agbagbadzedze vevie ƒe bla nanewo mekpɔ amedzidzedze nyui aɖeke ɖe fli siwo wotia nyuie ŋu o. Dedienɔnɔ nɔ te ɖe susu ma si wodo kpɔ nyuie dzi.

**Ðe quantum kɔmpiuta ate ŋu agbã esia?**
Quantum kɔmpiuta si lolo ale gbegbe ate ŋu agbã ECDLP la. Ema nye nusi wonya be enye nusi ŋu wotsi dzi ɖo ɣeyiɣi didi le dɔwɔƒea katã eye wònye numekuku ƒe akpa si le dɔ dzi vevie; egbegbe ʋuƒoawo gakpɔtɔ le dedie le kɔmpiuta xoxowo ŋu.

**Nukatae Zcash zãa curve siwo wu ɖeka?**
Dɔ vovovowo wɔwɔ. Kplɔ̃ ɖeka tsɔa sidzedze zero ƒe kpeɖodzi ƒe ɖoɖoa; bubu (si wotsɔ de gbãtɔa ƒe agble me) na be safui si le kpeɖodzi me kple ɖokuitsɔtsɔna ƒe dɔwɔwɔwo wɔa dɔ nyuie. Nyati siwo kplɔe ɖo ɖe nusita atsu kple asi ma le vevie la me.

---

### Do wò susuŋudɔwɔwɔ kpɔ

Ne èzã kplɔ̃ si ŋu woɖo kpee le Akpa 3 lia me la, nusi nye `9G + 10G` le míaƒe fefenu ƒe ʋuƒoa dzia? Eye nuka ŋue ŋuɖoɖoa gblɔ na wò `G`? *(Ðo eŋu le ete.)*

<details><summary>Answer</summary>

`9 + 10 = 19`, eye míekpɔe nenema `19G = O`, si nye teƒe si le seɖoƒemanɔmanɔ me. Eyata `9G + 10G = O`. Esia fia be `10G` nye **negative** (additive inverse) ƒe `9G`: teƒe eve siwo kpena ɖe "zero" teƒea ŋu. Le fli dzi la, teƒe aɖe ƒe negative nye eƒe ahuhɔ̃e me nɔnɔmetata ko le x-axis la dzi, eye le nyateƒe me `9G = (7,6)` kple `10G = (7,11)` ma nu ɖeka ma ke `x` eye wòkpɔe `y`-asixɔxɔ siwo ƒo ƒu ɖe `17 = 0 (mod 17)`. Dɔwɔɖoɖoa sɔ pɛpɛpɛ, si nye nusi tututu "enye ƒuƒoƒo" ka ɖe edzi.
</details>

---

### Nukae kplɔe ɖo

**Nyati 3 lia . Hashing kple ŋugbedodowo:** míaʋu "magic sealed envelope" la nyuie. Fifia èkpɔ mɔ ɖeka si dzi nàto atu ɖokuitsɔtsɔna ɖo tso teƒe siwo woƒo xlãe; emegbe míebiaa nusi ɣla kple babla fia ŋutɔŋutɔ, doa go hash dɔwɔwɔwo, eye míetsɔa evea siaa doa ka kple nuŋlɔɖi ƒe ŋugbedodo siwo léa Zcash ƒe fexexe ɖesiaɖe ɖe te.

*Zcash ƒe akpa aɖe tso Gɔmeɖose Gbãtɔwo *series na [ZecHub](https://zechub.org). CC BY-SA 4.0 si ŋu mɔɖegbalẽ le.*

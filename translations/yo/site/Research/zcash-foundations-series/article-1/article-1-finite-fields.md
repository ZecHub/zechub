# Awọn aaye ti o pari: Awọn nọmba Awọn eto Cryptography ngbe ni
##### Ìwádìí Àkọ́kọ́ láti [Annkkitaaa](https://github.com/Annkkitaaa)

![ì í ì °ë¦¬í ë ¤]](image-5.png)

### Ìdí tí "fífi nǹkan wé" fi jẹ́ ìpìlẹ̀ ìkọ̀kọ̀ Zcash

> **Series:** *Zcash from First Principles* . **Article 1 . Finite Fields** Àwọn ojúewé wọ̀nyí jápọ̀ mọ́ Àdàkọ:Coordinates:
> ** àwùjọ:** àwọn tí wọ́n ṣẹ̀ṣẹ̀ dé. a gbà pé ìṣirò iléèwé lásán ni (àkójọ, ìlọ́po, pínpín). kò sí ẹ̀kọ́ kíkọ̀ǹpútà tàbí ìmọ̀-ìṣirò gíga.
> **What you'll leave with:** an intuitive and correct understanding of finite fields, why cryptographers use them, and where they show up inside Zcash.

Ni [Abala 0](article-0-shielded-transaction.md) we met five characters: the note, the commitment, the note commitment tree, the nullifier, and the zero-knowledge proof. We left a loose end hanging: *where do all the keys and secret recipes actually come from?* They come from numbers. But not the ordinary numbers you grew up with. They come from a special, self-contained number system called a **finite field**, and almost every piece of cryptography in Zcash is built on top of it.

Àpilẹ̀kọ yìí ń mú èrò náà jáde ní ṣísẹ̀-n-tẹ̀lé, gẹ́gẹ́ bí mo ti ṣèlérí, ìmọ̀lára ni àkọ́kọ́, kò sí àwọn ìlànà àbáyọ títí wọ́n á fi sanwó fún ara wọn.

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Àwọn nọ́ńbà tí kò ṣe pàtàkì kì í jẹ́ kí àwọn ẹ̀rọ ìgbàkọ̀wé lè ṣe àdàkọ àwọn ìsọfúnni tó wà nínú wọn.

Ronu nipa ohun ti o ṣẹlẹ nigbati nọmba kan gba * tobi. * Ti o ba ti mo so fun o a ikọkọ iṣiro produced `8,142,067`, o ti mọ ọ̀pọ̀lọpọ̀: ó jẹ́ nọ́ńbà méje, kò bára mu, ó "tóbi púpọ̀". Iwọn jẹ́ àmì. Àmì sì ni ohun tí ètò ìpamọ́ kan kò lè fúnni.

Àkọsílẹ̀-ìmọ̀-nǹkan fẹ́ ètò iye tí:

- àwọn iye tí kò ní ààlà wà, nítorí náà kọ̀ǹpútà kan lè fi èyíkéyìí nínú wọn pa mọ́ láìṣe àyípo tàbí kí ó má ṣàn kọjá.
- awọn iye **ma ko jo wọn iwọn **, nitori awọn eto ni o ni ko si gidi oro ti "ti o tobi",
- o ṣì lè ṣe àfikún, àyọkúrò, ìlọ́po, àti pínpín lómìnira àti lọ́nà tí ó ṣeé yí padà, nítorí pé àwọn àlàkalẹ̀ ìkọ̀wé-ìpamọ́ nílò algebra gidi láti ṣiṣẹ́, àti
- a lè ṣe àgbáálá ayé yìí lọ́nà tó ga ju bó ṣe yẹ lọ, nítorí náà, kò sídìí láti máa rò ó.

Oríṣun àwòrán, Getty Images Àkọlé àwòrán, Ẹ jẹ́ ká kọ̀kọ́ mọ ohun tí a fẹ́ kí ó jẹ́ kí a kọ àmì kan ṣoṣo.

---

## 2. Ìmọ̀lára: aago kan

O ti ń lo pápá tó ní òpin lójoojúmọ́.

On a 12-hour clock, numbers *wrap around*. Start at 10 o'clock, add 5 hours, and you don't land on "15 o'clock," you land on **3 o'clock**. The clock has only twelve positions, and counting past the top simply loops back to the start.

![ì í ì °ë¦¬í ë ¤]](image-9.png)

Ohun mẹ́ta ló ṣẹlẹ̀ láìpẹ́ yìí tó jẹ́ kókó pàtàkì nínú àpilẹ̀kọ yìí:

1. ** Ayé kò lópin.** Ìpò méjìlá péré ló wà, láìka iye ìgbà tó o bá kà á sí.
2. **O lè fi wákàtí kún un lójoojúmọ́; o máa ń dé ibi tí aago wà nígbà gbogbo.
3. **Iwọn ti dẹkun pataki.** "Aago mẹta" ko sọ fun ọ boya o ka wakati mẹta tabi mẹẹdogun tabi mẹrindinlọgbọn.

Ìṣirò yìí ní orúkọ kan: "ìṣirọ̀ modulu". Wákàtí náà ń ṣiṣẹ́ "módulo 12," tí a kọ **mod 12**. Àwọn onímọ̀ ìṣirò fẹ́ràn láti ka àwọn ipò tí ó bẹ̀rẹ̀ láti 0, nítorí náà "wákàtí mod 12" ní àwọn ipò `0, 1, 2, ..., 11`. Aago mod 7 yoo ni awọn ipo `0` láti inú `6`.

> ** Òfin kan:** láti ṣírò ohunkóhun "mod p, " ṣe ìṣirò òòjọ́, lẹ́yìn náà pín sí `p` kí o sì mú èyí tó ṣẹ́ kù.
> Àpẹẹrẹ mod 7: `5 + 4 = 9`, àti `9` àwọn ewé tó ṣẹ́ kù `2` lẹ́yìn tí a bá pín sí `7`, so `5 + 4 = 2 (mod 7)`.

---

## 3. Láti inú aago kan lọ sí oko kan

Aago jẹ ki a ṣafikun. A ** aaye ** ni igbesoke: eto nọmba nibiti gbogbo awọn iṣẹ mẹrin ṣe ihuwasi, pẹlu ọkan ti o nira, pipin.

Lákòókò tí a kò mọ̀, àgbègbè kan jẹ́ àkójọpọ̀ "àwọn iye" tí o lè fi kún, yọ, sọpọ̀, àti pín (ní ohunkóhun àyàfi sírò), àti gbogbo òfin tí a mọ̀ dáadáa ṣì ń bá a lọ: ètò kò ṣe pàtàkì fún àfikún tàbí ìpo, àwọn àlàfo lè di àwùjọ, ó wà `0` àti a `1`, ati gbogbo nọmba ni o ni kan odi ati (ayafi `0`) ìmúlùmálà.

Àwọn nọ́mbà rational jẹ́ pápá kan. àwọn nọ̀mbà tòótọ́ ni pápà kan. ohun tí a fẹ́ ni *òpin* kan.

Àbájáde àkọlé náà rèé, ó sì dára gan-an:

> **Gba gbogbo iye `0, 1, ..., p-1` ki o si ṣe gbogbo iṣiro mod `p`. If `p` jẹ́ iye àkọ́kọ́, àbájáde rẹ̀ jẹ́ àyè tó ní òpin.** A kọ ọ́ `F_p` (kà á sí "F sub p").

So `F_7 = {0, 1, 2, 3, 4, 5, 6}` pẹ̀lú ọ̀nà ìṣirò wákàtí-ọ̀nà mod 7 jẹ́ ojúlówó pápá tí ó ní òpin. ẹ jẹ́ ká wo bí ó ṣe ń mí.

### Ìmúpòpò nínú F_7 (tí a ṣàyẹ̀wò)

Gbogbo àkọsílẹ̀ ni `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Wo àwọn ìlà fún `1` láti inú `6`: olúkúlùkù wọn ní gbogbo iye tí kì í ṣe òfo `1..6` Àpẹẹrẹ "kò sí àtúnṣe, kò sí ohun tí ó sọnù" yìí ni àmì ìka tí ó hàn gbangba ti pápá kan.

### Ìpínyà: ẹ̀mí òkùnkùn tí ó nílò àlàfo

Pípín jẹ́ "ìpọ́npọ̀ pẹ̀lú àtúnṣe". `F_7`, àtúnṣe (tàbí **òdìkejì**) ti iye kan `a` jẹ iye `a^(-1)` fún èyí tí `a x a^(-1) = 1`. kíkà wọ́n ní tààràtà láti orí tábìlì:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Ṣayẹwo ọkan: `2 x 4 = 8 = 1 (mod 7)`Nítorí náà, "ìpín méjì" nínú `F_7` ó túmọ̀ sí "fi 4 kún un". Gbogbo ohun tí kò bá jẹ́ 0 ní ẹnìkan. **Èyí ló mú kí `F_7` pápá kan.**

---

## 4. Ìdí tó fi jẹ́ pé kókó kan ṣoṣo ló yẹ kí ọ̀pá ìdiwọ̀n jẹ́

Èyí ni èrò tó ṣe pàtàkì jù lọ nínú àpilẹ̀kọ yìí, nítorí náà ẹ jẹ́ ká sọ ọ́ lọ́nà tó ṣe pàtó dípò ká máa fi ṣe àpèjúwe.

Wo ohun ti breaks ti o ba ti a naively gbiyanju lati kọ a "field" mod `6` (àti `6` kì í ṣe kókó:

> Ṣé àwọn kan wà `x` pẹ̀lú `2 x x = 1 (mod 6)`? Ṣíṣayẹwo gbogbo wọn: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. Ìdáhùn `1` kò sí nínú ìwé náà.** `2` kò ní àtúnṣe 6. `2 x 3 = 6 = 0 (mod 6)`: iye méjì tí kì í ṣe zéró tí a bá fi kún un láti fún zérò.

That second sentence is a catastrophe for arithmetic. Two nonzero things multiplying to zero (called a **zero divisor**) means division is broken, and a system with broken division is not a field. It happens precisely because `6` àwọn nǹkan bíi `2 x 3`.

Àkọ́kọ́, nípasẹ̀ ìtumọ̀, kò ní irú àwọn èròjà bẹ́ẹ̀. Nítorí náà mod a prime, kò sí àwọn onímọ́ tí ó lè farahàn, gbogbo ohun tí kò jẹ́ nọ́ńbà kan máa ń ní àtúnṣe tó mọ́ tónítóní, àti pé ẹ̀ka náà jẹ́ pápá tó yẹ.

![ì í ì °ë¦¬í ë ¤]](image-8.png)

> ** Ojúlówó ìlà kan tí a lè lò fún àwọn ohun èlò rẹ:** * Prime modulus in, clean division out.*

---

## 5. Ọ̀nà kan ṣoṣo tó yẹ kéèyàn máa lò: bí àwọn kọ̀ǹpútà ṣe ń rí àwọn ohun tí kò bára wọn mú

A ka àwọn àyípadà láti inú tábìlì fún `F_7`, ṣugbọn Zcash's prime ní ọgọ́rọ̀ọ̀rún àwọn dígítì; kò sí tábìlì tó ṣeé ṣe. ó wà ni àlàfo títóbi, òun sì ni ọ̀nà kan ṣoṣo nínú àpilẹ̀kọ yìí.

**Fermat's Little Theorem** sọ wípé fún ọ̀pọ̀lọpọ̀ `p` àti gbogbo àwọn tí kì í ṣe zérò `a`:

```
a^(p-1) = 1   (mod p)
```

Yí i pa dà (ṣá ìkan lára àwọn nǹkan tó wà nínú rẹ̀ kúrò) `a`) o sì rí àyípadà rẹ̀ gbà lómìnira:

```
a^(-1) = a^(p-2)   (mod p)
```

Ìdánwò nínú `F_7` (`p = 7`, so `p - 2 = 5`): àyípadà ti `2` ó yẹ kó rí bẹ́ẹ̀ `2^5 = 32 = 4 (mod 7)`Àti pé tábìlì wa sọ `2^(-1) = 4`Àwọn kọ̀ǹpútà máa ń yára yára di alágbára ńlá, nítorí náà, èyí á sọ wíwá àtúnṣe síra wọn di ìṣirò tó yára kánkán, tó sì ṣe gúnmọ́, kódà fún àwọn àkópọ̀ títóbi.

You do not need to memorize this. You need to know that **division in a finite field is a fast, exact operation**, which is exactly why cryptographers are happy to build on it.

---

## 6. Ìdí tí ìmọ̀ ìjìnlẹ̀ nípa ọ̀rọ̀ sísọ fi nífẹ̀ẹ́ àwọn ohun tí kò ní àlàfo

Tá a bá wo ohun tó ṣẹlẹ̀, a máa rí i pé gbogbo ẹjọ́ náà ló wà ní ojú ìwé kan.

Ohun ìní `F_p` Ìdí tí ètò ìpamọ́ fi fẹ́ ẹ.
|---|---|
** Finite** Kọ̀ǹpútà máa ń tọ́jú gbogbo ohun tó bá fẹ́; kò sí yípo, kò sí àpòpòpò, kò sì sí àlàfo.
** Wrap-around** Ó máa ń pa "ìwọ̀n" nù, nítorí náà iye kan kò ní sọ ohunkóhun nípa bí wọ́n ṣe mú un jáde.
| **All four operations work** | Cryptographic recipes (keys, commitments, proofs) need genuine algebra, not just counting |
**Iwọn ti o le yan**. Yan 255-bit tabi 381-bit akọkọ ati pe aaye naa ni awọn eroja diẹ sii ju awọn atomu lọ ni agbaye ti a le ṣe akiyesi; iṣaro jẹ ireti.
**Exact and deterministic** Ẹgbẹ́ olóòtítọ́ méjì tí wọ́n ń ṣe ìwádìí ohun kan náà máa ń rí àbájáde kan náà, èyí tí àwọn ẹ̀rí dá lé.

Ẹ̀ka tí ó ní òpin ni, ní gbólóhùn kan, ** ibi eré ìdárayá tí ó ti dí pátápátá, tí ó pé pérépéré, tó sì tóbi fún ìṣirò.** Gbogbo ohun mìíràn nínú Zcash ni a kọ nípa gbígbá nínú rẹ̀.

---

## 7. Ibi tí èyí ń gbé ní Zcash

You don't have to take "Zcash uses finite fields" on faith. Here's the concrete map (the deeper machinery is for later articles; this is just to show the fingerprints are real).

- **Sapling** (an older shielded design) builds its proofs over a curve called **BLS12-381**, whose base field uses a prime that is **381 bits** long. Every coordinate, key, and proof element is an element of a finite field built on that prime.
- **Orchard** (the current shielded design) uses a pair of curves called **Pallas and Vesta** (the "Pasta" curves), whose fields use primes roughly **255 bits** long.
- The **note commitment**, the **nullifier**, and the numbers inside a **zero-knowledge proof** from Article 0 are all, at bottom, elements of one of these finite fields. When the protocol says "compute this commitment," it means "do this arithmetic mod that prime."

![ì í ì °ë¦¬í ë ¤]](image-7.png)

Nítorí náà ìdáhùn sí ìbéèrè tí Àpilẹ̀kọ 0 ń béèrè, *"níbo ni àwọn ìlànà àṣírí ti wá?"*, bẹ̀rẹ̀ níbí: **ohun gbogbo bẹ̀bẹ̀ gẹ́gẹ́ bí ìṣirò nínú pápá tí ó ní òpin.** Nínú àpilẹ̀lẹ̀ tó tẹ̀ lé e a ó gba pápà yẹn a ó sì kọ àwọn ohun gidi, àwọn àlàfo lórí ẹ̀ka yíyọ̀ kan, tí wọ́n di kókó àti àdéhùn.

---

## 8. Ẹni tó jẹ́ olóòótọ́

Lati wa ni titunse- ore a simplified kan diẹ ninu awọn otitọ ohun. lopin aaye ko nikan wa ni `F_p` o tún lè kọ́ pápá pẹ̀lú `p^n` elements (called **extension fields**), and those matter for the "pairings" that Sapling's proof system relies on. We also skipped the full list of field axioms and glossed over how primes of this size are chosen and validated. None of that changes the intuition you now hold; it refines it. We'll add the precision back, with flags, when a later article needs it.

---

## 9. Àkópọ̀

- Cryptography needs a number system that is **finite, exact, size-blind, fully invertible, and enormous.** That system is a **finite field**.
- Ìmòye-ara-ẹni jẹ́ aago: ìṣirò tí ó yíká (ìṣirò modulu), tí ó rọgbọ pa "ìtóbi" iye kan.
- Ṣíṣe ìṣirò pẹ̀lú àwọn iye `0..p-1` mod a **prímì** `p` ó ń fúnni ní ojúlówó àgbègbè `F_p`, nibi ti o ti le tun pin nitori gbogbo nonzero eroja ni o ni ohun inverse.
- Modulu naa ** gbọdọ jẹ akọkọ **: modulu apapo ṣẹda awọn divisors odo (bii `2 x 3 = 0 mod 6`) ó sì ń fọ ẹ̀ka náà.
- Àwọn kọ̀ǹpútà máa ń tètè rí àwọn àyípadà nípa lílo **Fermat's Little Theorem** (`a^(-1) = a^(p-2)`).
- Ni **Zcash**, gbogbo kókó, àdéhùn, àfojúdi, àti ẹ̀rí jẹ́ ohun tí ó wà nínú oko tí ó ní ìparí tí ó tóbi (255-bit Pasta fields for Orchard, a 381-bit field for Sapling's BLS12-381).

---

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
**Modular arithmetic** Arithmetics ti o n yi pada lẹhin ti o de iye kan, bi aago.
"Pá nípasẹ̀ `p` kí o sì fi èyí tó kù pa mọ́ fún ara rẹ".
**Field**. Ètò ìṣirò tí a fi ń ṣe àfikún, àyọkúrò, ìlọ́po, àti pínpín gbogbo iṣẹ́.
** Àgbègbè tí ó ní òpin `F_p`Àwọn Nọ́ńbà `0..p-1` pẹ̀lú ìṣirò tí a ṣe mod a prime `p` |
** Inverse (àdàpọ̀) ** Ẹ̀yà náà `a^(-1)` pẹ̀lú `a x a^(-1) = 1`; "bí a bá pín in sí `a`" túmọ̀ sí pé ká fi iye yẹn kún un.
** Zero divisor**: Awọn iye meji ti kii ṣe odo ti ọja wọn jẹ odo; ohun ti o bajẹ modulu apapọ.
**Prime**. Nọmba gbogbo ti o tobi ju 1 lọ pẹlu ko si awọn oludari ayafi 1 ati ara rẹ.

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

** Kí ló dé tí kò fi lo àwọn àlàfo tàbí àwọn díẹ̀díẹ̀?**
Awọn decimals yika ati gbigbe; awọn nọmba odidi dagba laisi opin ati iwọn ti n jo. Awọn aaye to lopin jẹ deede, opin, ati afọju iwọn, eyiti cryptography nilo.

**Ṣé "fífi yíká" máa ń sọ ìsọfúnni nù?**
Lákọ̀ọ́kọ́, bẹ́ẹ̀ ni. Fífi àlàfo pa àwọn iye tó wà láàárín jẹ́ ohun kan, kì í ṣe àṣìṣe, fún ìpamọ́.

**Ṣé ààlà tí ó tóbi ju èyí lọ máa ń dáàbò bò ó?**
Ní kúkúrú, ibi tó tóbi ju ti tẹ́lẹ̀ lọ túmọ̀ sí pé iye tó ṣeé ṣe kó jẹ́ púpọ̀ sí i, ó sì máa ń ṣòro láti mọ̀, ṣùgbọ́n ààbò sinmi lórí gbogbo ohun tí wọ́n fi kọ́ ilé náà, kì í kàn-án ṣe bí ilẹ̀ náà ṣe tóbi tó nìkan.

** Kí ló dé tí àwọn àkànṣe iye yìí (255-bit, 381-bit) fi wà nínú Zcash?**
A yàn wọ́n kí àwọn ìlà tí a gbé ka orí wọn lè ní ẹ̀yà ara àti agbára tó yẹ fún ètò ìdánilójú náà. "Ẹ̀dá ara tó yẹ" yẹn ni kókó tí a óò jíròrò nínú àpilẹ̀kọ méjì tó tẹ̀ lé èyí.

---

### Wádìí ohun tó wà lọ́kàn rẹ

In `F_7`, kí ni `5 - 6`? (Rántí: dúró nínú ilé `{0,...,6}` nípa fífi nǹkan yí i ká.) *

<details><summary>Answer</summary>

`5 - 6 = -1`, àti `-1` tí wọ́n fi wé `F_7` is `6` (nítorí pé `6 + 1 = 7 = 0`). So `5 - 6 = 6 (mod 7)`Ìyókù kì í kúrò nínú àyíká; ó kàn ń yí padà.
</details>

---

### Kí ló tún ń bọ̀?

**Article 2 . Elliptic curves:** we take the finite field we just built and use it to draw a strange kind of curve whose points can be "added" together. Those points become Zcash's keys and commitments, and they hide a one-way trapdoor that makes the whole privacy system possible. Intuition first, as always.

* Apá kan nínú àwọn* Zcash láti Àwọn Ìlànà Àkọ́kọ́ *series fún [ZecHub](https://zechub.org)Àdàkọ CC BY-SA 4.0.*

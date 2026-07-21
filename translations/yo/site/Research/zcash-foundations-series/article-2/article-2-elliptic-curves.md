# Awọn Ikun Elliptic: Ibi ti Awọn bọtini ati Awọn adehun Zcash ti bi
##### Ìwádìí Àkọ́kọ́ láti [Annkkitaaa](https://github.com/Annkkitaaa)

![ì í ì °ë¦¬í ë ¤]](image-10.png)

### Òpópónà tí ọ̀nà rẹ̀ kan ṣoṣo ni wọ́n fi àwọn ibi tó wà lórí ìlà kan ṣe

> **Series:** *Zcash from First Principles* . **Article 2 . Elliptic Curves** (Àdàkọ:Ojúewé ojúewé)
> A ro pe [Abala 1 (awọn aaye to lopin)](article-1-finite-fields.md): iṣiro ti o yika mod a akọkọ. Ko si ipilẹṣẹ miiran ti o nilo.
> ** Ohun tí ẹ ó fi sílẹ̀:** àwòrán tó ṣe kedere tó sì tọ̀nà nípa àwọn ìyí elliptic, "ibi ìdẹkùn" tí ó jẹ́ kí wọ́n wúlò, àti bí Zcash ṣe sọ wọ̀n di kókó àti àdéhùn.

[Àpilẹ̀kọ 1](article-1-finite-fields.md) fún wa ní ibi eré ìdárayá tó dára fún ìṣirò: àgbègbè tí ó ní òpin. ṣùgbọ́n àgbègbè kan ní tirẹ̀ jẹ́ àwọn nọ́ńbà lásán. láti ṣe kókó àti "àwọn àpòòwé tí a fi èdìdì dì" láti inú [ìpínrọ̀ 0](article-0-shielded-transaction.md), Zcash nilo ohun kan pẹlu pataki, ọkan-itọsọna iru ti isoro: rorun lati ṣe iṣiro siwaju, fere soro lati yi pada. Ohun ti o jẹ a ** elliptic iyipo **. Yi article kọ o lati ilẹ soke, inu ilohunsoke ṣaaju ki o to algebra.

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Gbogbo ètò ìpamọ́ nílò òpópónà kan tí kò ní àtúnṣe: iṣẹ́ tí kò fi bẹ́ẹ̀ ṣe pàtàkì láti rìn síwájú àti tí kò ṣeé ṣe láti padà sẹ́yìn.

Here's why. Your **secret key** is a number you keep hidden. Your **public key** (and your address) is derived from it and shown to the world. The entire security of the system rests on one fact: *given the public key, nobody can work backwards to your secret key.* If they could, they could spend your money.

Nítorí náà a nílò ìṣiṣẹ́ ìṣirò níbi tí:

- lílọ ** síwájú ** (àṣírí -> gbangba) yára ó sì rọrùn, ṣùgbọ́n
- lílọ sápá ẹ̀yìn (ìpínlẹ̀ -> àṣírí) ṣòro débi pé gbogbo kọ̀ǹpútà tó wà láyé kò ní lè parí iṣẹ́ wọn títí ayé á fi dópin.

Plain finite-field multiplication isn't good enough; division undoes it instantly (that was the whole point of Article 1). We need something with no easy "undo" button. Elliptic curves provide exactly that, and as a bonus, their points combine in a way that's perfect for building commitments. Let's see how.

---

## 2. Ìmọ̀lára: àlàfo kan tó o lè fi àwọn ibi tó wà lára rẹ̀ "pọ̀"

Gbagbe cryptography fun akoko kan. a ** elliptic iyipo ** ni o kan awọn ṣeto ti ojuami `(x, y)` tí ó tẹ́júmọ́ àpapọ̀ ìṣirò tí ó ní ìrísí:

```
y^2 = x^3 + ax + b
```

Over ordinary numbers it looks like a smooth, swooping curve, often with a rounded loop and two tails:

![ì í ì °ë¦¬í ë ¤]](image-14.png)

The genuinely surprising part: **you can "add" two points on this curve to get a third point on the same curve.** This isn't ordinary addition of coordinates. It's a geometric rule, and it's easier to *see* than to say.

### Òfin akòró (fi àlàfo méjì kún un)

Láti fi kún `P + Q`:

1. Fa ìlà tó dúró ṣánṣán `P` àti `Q`.
2. Àlàfo yìí bá àlàfo náà pàdé ní ibi kan pàtó. `R*`.
3. **Rò ó wò `R*` ní ààlà ojú òpó.** Ìrònú yẹn ni ìdáhùn, `P + Q`.

![ì í ì °ë¦¬í ë ¤]](image-11.png)

### Òfin tó ń jẹ́ tangent (tó ń fi nǹkan kan kún ara rẹ̀)

Láti ṣe ìṣirò `P + P` (ìwé `2P`), kò sí ibì kejì láti fa ìlà, nítorí náà o lo ìlà tí a fi ń mọ̀ ọ́n. `P` instead, then follow the same "third intersection, then reflect" recipe.

That's the entire operation. Two geometric rules. With them, the points of an elliptic curve form what mathematicians call a **group**: a set with a well-behaved "addition." It even has a "zero."

### Àkókó ní àìlópin (ìyí náà jẹ́ 0)

Gbogbo ètò ìṣírò nílò `0`, the thing that changes nothing when you add it. On an elliptic curve, that role is played by a special extra point called the **point at infinity**, written `O`O lè fojú inú wò ó bí "òkè tí kò lópin", ibi tí àwọn ìlà tó dúró ṣánṣán ti ń pàdé. `O` ó fi í sílẹ̀ láì yí i padà, bí ìgbà tí a bá fi í kún un `0`.

---

## 3. Láti inú àwòrán lọ sí ibi tó ní òpin

The smooth curve above is the *intuition*. But Zcash doesn't use real numbers (they round and leak size, per Article 1). It uses an elliptic curve **over a finite field**: the same equation `y^2 = x^3 + ax + b`, ṣùgbọ́n pẹ̀lú gbogbo ìṣirò tí a ṣe mod a prime.

Tó o bá ṣe bẹ́ẹ̀, àlàfo tó rẹwà náà á tú ká, á sì di àwọn kókó tí kò ní ìsopọ̀ kankan, kókó kan fún ẹnì kọ̀ọ̀kan `(x, y)` tọkọtaya tí ó tẹ́júmọ̀ sí àpapọ̀ mod `p`O ti dẹkun wíwo bi a iyipo ni gbogbo. sugbon nibi ni awọn crucial ohun:

> **Awọn algebra ti awọn chord-ati-tangent ofin ṣi ṣiṣẹ pipe.** Awọn kanna agbekalẹ ti ri `P + Q` geometrically bayi ṣe iṣiro rẹ pẹlu arithmetic aaye opin. awọn ojuami ṣi ṣe ẹgbẹ kan, pẹlu kanna `0` (àkókó ní àìlópin).

Ẹ jẹ́ ká sọ èyí di òótọ́ pẹ̀lú àpẹẹrẹ kéékèèké kan tí a ti rí i pé ó jóòótọ́.

### Ìlà tó pé pérépéré, tí wọ́n ṣe ìṣirò rẹ̀ lọ́nà pípé

Gba `y^2 = x^3 + 2x + 2` lórí àgbègbè tí ó ní òpin `F_17`. Ṣiṣiro gbogbo aaye ti o wulo n funni ni deede ** awọn aaye 18, pẹlu aaye ni ailopin = 19 lapapọ.** Diẹ ninu wọn:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Wá ibi tó o máa lọ báyìí `G = (5, 1)` ẹ wo ohun tó ṣẹlẹ̀ (gbogbo ìlà tó wà nísàlẹ̀ yìí ni wọ́n ṣírò, kì í ṣe àbá):

Ìgbésẹ̀. Àkókó.
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` O (ìparí)
| `10G` | (7, 11) | | |

Ohun méjì tó yẹ kó o kíyè sí rèé:

- Ó máa ń lọ sí gbogbo ibi méjìdínlógún tó ní òpin, ó sì máa ń gúnlẹ̀ sí `O`** ni igbesẹ 19, ki o si o yoo tun lailai. `G` "ń mú" gbogbo àwùjọ wá, nítorí náà a pè é ní "generator".
- Ẹgbẹ́ tí a ti rí i dájú pé ó wà: fún àpẹẹrẹ `1G + 2G = (5,1) + (6,3) = (10,6)`, èyí tí ó jẹ́ gan-an `3G`. Àfikún náà bára mu ní inú, gẹ́gẹ́ bí àwùjọ kan ṣe ń béèrè.

---

## 4. Ẹnubodè: ìmúdàgba scalar

Àtẹ yẹn ti `1G, 2G, 3G, ...` ni okan ohun gbogbo. fifi aaye kan kun si ara re ni a npe ni *scalar multiplication**: aaye `kG` túmọ̀ sí "`G` tí a fi kún ara rẹ̀ `k` àwọn ìgbà kan. "

Ní báyìí, ẹ jẹ́ ká wo ọ̀nà méjì tí wọ́n gbà ṣe é:

Ìtọ́sọ́nà Ìbéèrè Ìṣòro
|---|---|---|
A ti fi * síwájú * * fún `k` àti `G`, ṣírò `kG` **Rọrun.** Kódà fún àwọn tó tóbi lọ́nà ti sánmà `k`, ẹ̀tàn kan tí wọ́n ń pè ní *double-and-add* máa ń dé ibẹ̀ ní ọgọ́rọ̀ọ̀rún ìgbésẹ̀.
A ti fún wa ní ẹ̀dà tí ó yí padà. `G` àti `kG`, gba ara rẹ padà `k` **Ohun tí kò ṣeé ṣe** lórí àlàfo ìkọ̀wé-ìfiwéra gidi.

Ti asymmetry ni awọn ** ọkan-ọna street ** ti a nilo ni Section 1. `k` produced this point?") ni a npe ni **Elliptic Curve Discrete Logarithm Problem (ECDLP) **, ati lori awọn iyipo Zcash lo, ko si ọna ti a mọ ti o yanju rẹ ṣaaju iku ooru ti agbaye.

![ì í ì °ë¦¬í ë ¤]](image-12.png)

> Nínú ohun ìṣeré wa `F_17` ìkúrú o * le * nìkan ka `k` O ni 19 ojuami. `2^(255)` points. The table would have more rows than there are atoms in the universe, so "reading it off" is not an option. The smallness is what makes the toy curve teachable and also why it isn't secure.

---

## 5. Bí wọ́n ṣe ń dá àwọn kọ́kọ́rọ́ (ìyọrísí rẹ̀)

A ní gbogbo ohun tí a nílò láti ṣàlàyé kókó ìkọ̀wé-ìfiwéra gidi, ó sì rọrùn gan-an:

> ** Yan nọ́ńbà àṣírí kan `k`. Ṣíṣèwé lórí kókó náà `kG`Ìyẹn ni.**
> `k` kókó ìkọ̀kọ̀ rẹ ni. `kG` jẹ́ kókó ìta gbangba rẹ. Ọ̀nà kan ṣoṣo (ECDLP) ṣe ìdánilójú pé ẹnikẹ́ni kò lè sá `kG` padà sí `k`.

Èrò kan ṣoṣo yìí, *a public key is a secret scalar times a fixed generator*, ni irúgbìn àwọn kókó ìnáwó Zcash, wíwo kókó, àti àwọn àdírẹ́sì. Igi kókó tí ó kún fún àwọn àlàfo ní orí, ṣùgbọ́n gbogbo ẹ̀ka ń dàgbà láti inú gbòǹgbò yìí.

### Àfikún: ìdí tí àwọn àlàfo yípo fi ń ṣe àdéhùn pípé

Recall the "sealed envelope" (commitment) from Article 0, which had to **hide** its contents yet be **impossible to forge**. Elliptic curves hand us a clean way to build one. Take two fixed, public generator points `G` àti `H`, ohun tó ṣe pàtàkì gan - an `v`, ati nọmba ti o fọju laileto `r`, ati fọọmu:

```
Commitment  =  v.G  +  r.H
```

Èyí ni ìfọ̀kànsí Pedersen, ó sì ní àwọn ànímọ́ méjèèjì tí a fẹ́:

- Ìkòkò: Àṣà ìbílẹ̀ `r` smears awọn esi kọja gbogbo awọn iyipo, ki awọn ojuami fi han ohunkohun nipa `v`.
- **Binding:** ECDLP kò jẹ́ kí ó ṣeé ṣe láti rí *òdìkejì* `(v, r)` tó o bá ń sọ ohun kan náà, kò ní ṣeé ṣe fún ẹ láti yí èrò rẹ pa dà nípa ohun tó o ti pinnu láti ṣe.

Ohun-ini ajeseku kan ti di ohun ti ko ni idiyele nigbamii: awọn adehun wọnyi ** ṣafikun **. `v_1` àfikún sí àdéhùn láti `v_2` jẹ àdéhùn tó lẹ́sẹ̀ nílẹ̀ láti `v_1 + v_2`. Ìwà "homomorphic" ni bí Zcash yóò ṣe fi hàn nígbà tó bá yá pé owó tí ó wọlé nínú ìnáwó kan dọ́gba pẹ̀lú owó tó jáde, láìfi iye kankan hàn. A ó ná owó náà ní àyíká Àpilẹ̀kọ 6.

---

## 6. Ibi tí èyí ń gbé ní Zcash

Àwọn ẹ̀rí ìka náà dájú, wọ́n sì ṣeé ṣàyẹ̀wò.

| Zcash design | Curves it uses | Role |
|---|---|---|
| **Sapling** (older) | **BLS12-381** plus an embedded curve called **Jubjub** | BLS12-381 carries the proof system; Jubjub is built over BLS12-381's scalar field so that key and commitment operations are cheap to perform *inside* a zero-knowledge proof |
**Orchard** (current) **Pallas** and **Vesta** (the "Pasta" cycle) Pallas ń gbé àwọn kókó àti àdéhùn Orchard; Pallas/Vesta pairing ni a ṣètò ní pàtó láti mú kí àwọn ẹ̀rí tí ó ti gòkè àgbà jẹ́ alágbára.

The reasons one curve gets "embedded" inside another's field, and why a *cycle* of two curves is useful, are real and important, but they belong to the proof-system articles. For now the takeaway is solid: **every Zcash key is a scalar times a generator, and every Zcash commitment is a sum of curve points**, living on one of these named curves.

![ì í ì °ë¦¬í ë ¤]](image-13.png)

---

## 7. Ẹni tó jẹ́ olóòótọ́ máa ń sọ pé òun ò jẹ̀bi

A lo fọọmu Weierstrass ti o kuru (`y^2 = x^3 + ax + b`); Zcash's curves are often written in other equivalent forms (Jubjub is a *twisted Edwards* curve) chosen for efficiency and safety, but the group idea is identical. We didn't define the exact point-addition formulas (they're the algebraic version of "third intersection, then reflect"), and we set aside subtleties like curve order, cofactors, and "pairings," which become important in the proof-system articles. None of this changes the intuition; it sharpens it.

---

## 8. Àkópọ̀

- Ètò ìpamọ́ nílò òpópónà kan tí kò ní àlàfo: ó rọrùn láti lọ síwájú, kò ṣeé ṣe láti padà sẹ́yìn.
- A **elliptic curve** ni awọn ṣeto ti ojuami satisfying `y^2 = x^3 + ax + b`, ati awọn aaye rẹ ni a le fi kun nipasẹ ofin geometric chord-and-tangent, pẹlu aaye pataki ni ailopin ti n ṣiṣẹ bi odo.
- Lori aaye ti o lopin, igigirisẹ naa di itankale ti awọn aaye, ṣugbọn afikun kanna ṣi ṣiṣẹ ati awọn aaye ṣe agbekalẹ ẹgbẹ kan. `y^2 = x^3 + 2x + 2` ó kọjá `F_17` ó ní ìlà mọ́kàndínlógún, `G = (5,1)` gbogbo wọn ni.)
- **Ìmupọ̀ ọ̀pá ìdiwọ̀n** `kG` ó rọrùn láti ṣírò ṣùgbọ́n kò ṣeé ṣe láti yí i padà: ECDLP. Èyí ni ẹnubodè.
- **Key:** kókó ìkọ̀kọ̀ `k`, ọ̀rọ̀ àkọsílẹ̀ `kG`. **Ìpinnu:** Fọọmu Pedersen `v.G + r.H`, which hides, binds, and conveniently **adds up**.
- Ninu **Zcash**, Sapling lo **BLS12-381 + Jubjub** ati Orchard lo awọn iyipo **Pallas / Vesta (Pasta) **; gbogbo bọtini ati adehun n gbe lori iwọnyi.

---

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
Àwọn ibi tí ó tẹ́ni lọ́rùn `y^2 = x^3 + ax + b`, pẹ̀lú àkànṣe "àfikún" àwọn kókó
Òfin tí a fi ń ṣe àfikún àwọn kókó: tẹ̀lé ìlà tó bá gba ibi méjì kọjá, tẹ̀ lé ìlà kẹta, kí o sì ronú padà.
**Awọn ojuami ni ailopin (`O`)**. Ìlà náà jẹ́ "zero"; tí a bá fi kún un, kò ní yí padà rárá.
Àkọlé àwòrán`G`)**. Awon ohun ti o wa ni ipilẹ ti o ni ọpọlọpọ igba ti o bo gbogbo ẹgbẹ.
** Ìmúpòpòpò ọ̀pá-ìdiwọ̀n (`kG`)**. Àfikún `G` sí ara rẹ̀ `k` àwọn ìgbà; ó rọrùn láti tẹ̀ síwájú, ó ṣòro láti yí padà.
Ìṣòro líle koko tó jẹ mọ́ àtúnṣe `k` láti `kG`; ìpìlẹ̀ ààbò
Ìpínra tí a fi fúnni. `v.G + r.H`; àpò ìwé tí wọ́n dì tí ó fi pamọ́, tí ó so pọ̀, tó sì ṣe àpapọ̀;

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

** Kí ló dé tí a fi máa ń lo àwọn ìlà dípò àwọn iye ńláńlá tí a lè fi ṣe àkópọ̀?**
Both can give a one-way street, but elliptic curves achieve the same security with far smaller keys and faster operations, and their point arithmetic is ideal for commitments.

**Ṣé ECDLP ti fi hàn pé ó nira?**
kì í ṣe ohun tí kò ṣeé ṣe, ṣùgbọ́n ọ̀pọ̀lọpọ̀ ọdún ìsapá kìí rí àbájáde kankan tó gbéṣẹ́ lórí àwọn ìyí tí wọ́n yàn dáadáa.

**Ṣé kọ̀ǹpútà kónítọ̀mù lè ṣe èyí?**
Kọǹpútà kónítọ́ọ̀mù tí ó tóbi tó lè fọ ECDLP. Èyí jẹ́ ìdààmú tí a mọ̀ fún àkókò gígùn ní gbogbo ilé-iṣẹ́ àti agbègbè ìwádìí tí ó wà ní ìgbésẹ̀; àwọn àyípo òde òní ṣì ní ààbò lòdì sí kọ̀ǹpùtátọ̀ ìgbàlódé.

** Kí ló dé tí Zcash fi ń lo ju àlàfo kan lọ?**
Different jobs. One curve carries the zero-knowledge proof system; another (embedded in the first's field) makes the in-proof key and commitment operations efficient. The next articles explain why that pairing matters.

---

### Wádìí ohun tó wà lọ́kàn rẹ

Nípa lílo tábìlì tí a ṣàyẹ̀wò ní Abala 3, kí ni `9G + 10G` kí sì ni ìdáhùn náà sọ fún ọ nípa `G`? *ìdáhùn rẹ wà nísàlẹ̀ yìí.) *

<details><summary>Answer</summary>

`9 + 10 = 19`, a sì rí i pé `19G = O`, ìyókù ní àìlópin. `9G + 10G = O`Èyí túmọ̀ sí `10G` jẹ́ ìyókù ìdìpọ̀ ti **negative** `9G`: awọn aaye meji ti o ṣafikun si aaye "zero". lori iyipo kan, idaduro aaye kan jẹ aworan digi rẹ nikan ni ori ila-x, ati ni otitọ `9G = (7,6)` àti `10G = (7,11)` bákan náà `x` àti ní `y`-ìpín iye tó tó `17 = 0 (mod 17)`Àkópọ̀ náà kò yàtọ̀ síra, èyí sì ni ohun tí "ọmọ ẹgbẹ́ kan" ń mú dáni lójú.
</details>

---

### Kí ló tún ń bọ̀?

**Article 3 . Hashing and commitments:** we'll open up the "magic sealed envelope" properly. You've now seen one way to build a commitment from curve points; next we ask what hiding and binding really mean, meet hash functions, and connect both to the note commitments that anchor every Zcash payment.

* Apá kan nínú àwọn* Zcash láti Àwọn Ìlànà Àkọ́kọ́ *series fún [ZecHub](https://zechub.org)Àdàkọ CC BY-SA 4.0.*

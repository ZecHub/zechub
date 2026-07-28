# Finite Fields: Nnɔmba Nhyehyɛe a Cryptography Te Ase Wɔ Mu
##### Mfitiase Nhwehwɛmu a efi [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nkyerɛwee](/content-images/image-5-6e8a8950f8.webp)

### Nea enti a "wrapping around" yɛ Zcash kokoam fapem

> **Series:** *Zcash fi Nnyinasosɛm a Edi Kan* . **Ahyɛdeɛ 1 . Mfuw a Ɛwɔ Awiei**
> **Atiefo:** wɔn a wɔaba foforo. Yɛfa no sɛ sukuu akontaabu a ɛyɛ mpapahwekwa nkutoo (a wɔde ka ho, dodow, kyekyɛ). Crypography anaa akontaabu a ɛkorɔn biara nni hɔ a wɔadi kan ayɛ.
> **Nea wobɛgyaw:** nteaseɛ a ɛyɛ mmerɛw na ɛteɛ wɔ finite fields ho, nea enti a cryptographers de di dwuma, ne baabi a wɔda wɔn ho adi wɔ Zcash mu.

Wɔ [Ahyɛde 0](article-0-shielded-transaction.md) yehyiaa nkyerɛwde anum: nkyerɛwde, bɔhyɛ, nkyerɛwde ahofama dua, nullifier, ne nimdeɛ a enni adanse. Yɛgyaa awieeɛ a ɛyɛ loose bi a ɛsensɛn hɔ: *ɛhe na nsafe ne kokoam aduanenoa nyinaa firi ankasa?* Wɔfiri nɔma mu. Nanso ɛnyɛ dodow a ɛyɛ mpapahwekwa a wo ne no nyinii no. Wɔfiri nɔma nhyehyɛeɛ soronko bi a ɛwɔ ne ho a wɔfrɛ no **finite field**, na ɛkame ayɛ sɛ wɔasi cryptography biara a ɛwɔ Zcash mu wɔ so.

Asɛm yi nya saa adwene no nkakrankakra. Sɛnea wɔhyɛɛ bɔ no, intuition di kan. No formulas kosi sɛ wobetua wɔn ho ka.

---

## 1. Adɛn nti na ɛsɛ sɛ wodwene ho?

Nnɔmba a wɔtaa de di dwuma no wɔ ɔhaw bi ma cryptography: ɛdɔɔso a enni ano, na ɛma nsɛm pue.

Susuw nea ɛba bere a nɔma bi *kɛse* no ho. Sɛ meka kyerɛ wo kokoam akontaabu bi a wɔayɛ `8,142,067`, wunim pii dedaw: ɛyɛ nɔma a ɛwɔ ahinanan ason, ɛyɛ nwonwa, ɛyɛ "kɛse koraa." Size yɛ ade a ɛkyerɛ biribi. Na nsɛnkyerɛnne yɛ nea kokoam nsɛm ho nhyehyɛe bi ntumi mfa mma pɛpɛɛpɛ.

Cryptography pɛ nɔma nhyehyɛe a:

- **dodow pii** wɔ hɔ, enti kɔmputa betumi de emu biara asie pɛpɛɛpɛ a ɛnyɛ kurukuruwa na ɛnyɛ nea ɛboro so, .
- gyinapɛn ahorow no **nsɛe wɔn kɛse**, efisɛ nhyehyɛe no nni adwene ankasa biara sɛ "kɛse," .
- woda so ara betumi **de aka ho, ayi afi mu, abu so, na woakyekyɛ mu** kwa na wotumi dannan mu, efisɛ cryptographic recipes hia algebra ankasa na ama ayɛ adwuma, na
- wobetumi ama ahunmu no ayɛ **astronomically large**, enti guessing yɛ anidaso biara.

Saa apɛde a wɔahyehyɛ no wɔ din. Ɛyɛ **afuo a ɛwɔ anohyeto**. Momma yɛnkyekye intuition no mma biako ansa na yɛakyerɛw sɛnkyerɛnne biako.

---

## 2. Intuition: dɔn bi

Wode afuw a anohyeto wom di dwuma dedaw da biara da. Ɛyɛ dɔn a ɛwɔ wo fasu so no.

Wɔ dɔnhwerew 12 dɔn so no, nɔma *bɔ ho*. Fi ase nnɔn 10, fa nnɔnhwerew 5 ka ho, na woankɔ fam wɔ "nnɔn 15," wo si fam wɔ **nnɔn 3**. Dɔn no wɔ gyinabea dumien pɛ, na sɛ wokan twa soro a, ɛsan kɔ mfiase kɛkɛ.

![alt nkyerɛwee](/content-images/image-9-30b39f4cc5.webp)

Nneɛma abiɛsa na esisii nkyɛe a ɛno ne asɛm yi mu asɛm nyinaa:

1. **Wiase no wɔ anohyeto.** Gyinabea dumien pɛpɛɛpɛ na ɛwɔ hɔ, ɛmfa ho bere tenten a wobɛkan.
2. **Adding still works.** Wubetumi de nnɔnhwerew aka ho da mũ nyinaa; bere nyinaa wusi fam wɔ dɔn gyinabea a ɛfata so.
3. **Size stopped mattering.** "3 o'clock" nkyerɛ wo sɛ wokan nnɔnhwerew 3 anaa 15 anaa 27. Wrap-around no *popaa size ho nsɛm.* Saa erasing no ne kokoamsɛm-adamfofa agyapade a yɛpɛ no pɛpɛɛpɛ.

Saa akontabuo a wɔabɔ ho ban yi wɔ din a wɔahyɛ da ayɛ: **modular akontabuo**. Dɔn no yɛ adwuma "modulo 12," a wɔakyerɛw sɛ **mod 12**. Nkontaabufo pɛ sɛ wɔkan gyinabea ahorow a efi ase fi 0, enti "dɔn mod 12" wɔ gyinabea ahorow ankasa `0, 1, 2, ..., 11`. Anka dɔn mod 7 benya gyinabea ahorow `0` fam `6`.

> **Mmara baako:** sɛ wobɛbu biribiara "mod p," yɛ akontabuo a ɛyɛ mpapahwekwa, afei kyekyɛ mu `p` na fa nea aka no nkutoo sie.
> Nhwɛso mod 7: `5 + 4 = 9`, ne `9` nhaban a aka `2` bere a wɔakyekyɛ mu akyi `7`, so `5 + 4 = 2 (mod 7)`.

---

## 3. Efi dɔn so kɔ afuw mu

Dɔn ma yɛde ka ho. **field** ne upgrade: nɔma nhyehyɛe a adwumayɛ anan no nyinaa yɛ wɔn ade, a nea ɛyɛ anifere no ka ho, mpaapaemu.

Wɔ ɔkwan a ɛnyɛ ɔkwan pa so no, **afuw** yɛ "nɔmba" biara a woaboaboa ano a wubetumi **de aka ho, atwe afi mu, abɔ, na woakyekyɛ** (denam biribiara so gye zero), na mmara a wonim no nyinaa da so ara kura: nhyehyɛe nnyɛ hwee mma nkabom anaa dodow, wobetumi asan akyekyɛ nkahyemde no mu, a `0` ne a `1`, na nɔma biara wɔ negative ne (gye sɛ `0`) a ɛyɛ nea wɔde wɔn ho hyɛ mu.

Nkontaabu a ntease wom no yɛ afuw. Akontaabu ankasa no yɛ afuw. Nea yɛpɛ no yɛ *ɛwɔ anohyeto*.

Nea efii asɛmti no mu bae ni, na ɛyɛ fɛ:

> **Fa akontabuo no nyinaa `0, 1, ..., p-1` na yɛ akontaabu mod nyinaa `p`. If `p` yɛ prime number, nea efi mu ba no yɛ finite field.** Yɛkyerɛw `F_p` (kenkan "F sub p").

So `F_7 = {0, 1, 2, 3, 4, 5, 6}` ne dɔn-style akontaabu mod 7 yɛ nokware anohyeto field. Momma yɛnhwɛ sɛ ɛrehome.

### Mpɛn dodow wɔ F_7 (wɔagye atom) .

Entry biara yɛ `(row x column) mod 7`:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

Hwɛ rows no ma `1` fam `6`: emu biara kura botae biara a ɛnyɛ zero `1..6` pɛnkoro pɛpɛɛpɛ. Saa "no repeats, nothing missing" nhyehyɛe no yɛ nsateaa a wotumi hu a ɛwɔ afuw bi mu.

### Division: nkonyaayi a ehia prime

Mpaapaemu yɛ "dodow denam nea ɛne ne ho di nsɛ so" ara kwa. Mu `F_7`, akontaahyɛde bi a ɛne ne ho di nsɛ (anaasɛ **inverse**). `a` ne mfaso a ɛwɔ so `a^(-1)` ɛno nti `a x a^(-1) = 1`. Sɛ wokenkan wɔn fi pon so tẽẽ a:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Hwɛ biako: `2 x 4 = 8 = 1 (mod 7)`.  Enti "kyɛ mu 2" wɔ `F_7` kyerɛ sɛ "fa 4 bɔ ho." Element biara a ɛnyɛ zero wɔ ɔhokafo. **Ɛno na ɛma `F_7` afuw bi.**

---

## 4. Nea enti a ɛsɛ sɛ modulus no yɛ prime

Eyi ne adwene biako pɛ a ɛho hia sen biara wɔ asɛm no mu, enti momma yɛmma ɛnyɛ nea ɛyɛ nokware sen sɛ ɛbɛyɛ nea ɛnyɛ nokware.

Hwɛ nea ɛbubu sɛ yɛde naively bɔ mmɔden sɛ yɛbɛkyekye "field" mod `6` (ne `6` yɛ *ɛnyɛ* prime):

> So ebi wɔ hɔ `x` ne `2 x x = 1 (mod 6)`? Wɔn nyinaa a wobɛhwɛ mu: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **Mmuae no `1` mpue da.** Enti `2` nni reciprocal mod 6. Nea enye koraa no, . `2 x 3 = 6 = 0 (mod 6)`: akontaahyɛde abien a ɛnyɛ zero a wɔde abɔ ho ma ama zero.

Saa kasamu a ɛto so abien no yɛ ɔsɛe kɛse ma akontaabu. Nneɛma abien a ɛnyɛ zero a ɛdɔɔso kɔ zero (wɔfrɛ no **zero divisor**) kyerɛ sɛ mpaepaemu abubu, na nhyehyɛe a mpaepaemu abubu no nyɛ afuw. Ɛba saa pɛpɛɛpɛ esiane sɛ `6` factors sɛ `2 x 3`.

Sɛnea wɔkyerɛ ase no, prime nni nneɛma a ɛtete saa. Enti mod a prime, zero divisors biara ntumi mpue, element biara a ɛnyɛ zero nya reciprocal a ɛho tew, na nhyehyɛe no yɛ field a ɛfata.

![alt nkyerɛwee](/content-images/image-8-573914db92.webp)

> **One-liner a wotumi san de di dwuma ma wo nsɛm:** *prime modulus in, clean division out.*

---

## 5. Fomula biako a ɛfata sɛ wohyia: sɛnea kɔmputa hwehwɛ inverses

Yɛkenkan inverses fi pon bi so ma `F_7`, nanso Zcash prime no wɔ digit ɔhaha pii; pon biara nni hɔ a ebetumi aba. Ɔkwan tiawa bi a wɔagye din wɔ hɔ, na ɛno nkutoo ne formula a ɛwɔ asɛm yi mu.

**Fermat's Little Theorem** ka saa ma prime `p` ne biribiara a ɛnyɛ zero `a`:

```
a^(p-1) = 1   (mod p)
```

San hyehyɛ no (yi ade biako a ɛyɛ `a`) na wunya inverse no kwa:

```
a^(-1) = a^(p-2)   (mod p)
```

Sɔhwɛ wɔ `F_7` (`p = 7`, so `p - 2 = 5`): nea ɛne no bɔ abira `2` ɛsɛ sɛ ɛyɛ `2^5 = 32 = 4 (mod 7)`. Na ampa ara yɛn pon no kaa sɛ `2^(-1) = 4`.  Kɔmputa kɔ soro kɔ tumi akɛse mu ntɛmntɛm koraa, enti eyi dan "find the reciprocal" ma ɛbɛyɛ akontaabu a ɛyɛ ntɛm, pɛpɛɛpɛ ma primes akɛse mpo.

Ɛho nhia sɛ wokyere eyi gu wo tirim. Ɛsɛ sɛ wuhu sɛ **mpaapaemu wɔ afuw a anohyeto wom mu yɛ adwuma a ɛyɛ ntɛmntɛm, ɛyɛ pɛpɛɛpɛ**, ɛno nti pɛpɛɛpɛ na cryptographers ani gye sɛ wɔbɛkyekye wɔ so.

---

## 6. Nea enti a cryptography nyaa ɔdɔ maa afuw a anohyeto wom

Sɛ yɛde intuition no bom a, asɛm no nyinaa wɔ kratafa biako ni.

| Agyapadeɛ a ɛwɔ `F_p` | Nea enti a kokoam nsɛm ho nhyehyɛe bi pɛ sɛ |
|---|---|
| **Awiei** | Kɔmputa de nneɛma biara sie pɛpɛɛpɛ; rounding biara nni hɔ, overflow biara nni hɔ, floating-point fuzz biara nni hɔ |
| **Wɔde kyekyere ho** | Erases "size," enti value bi leaks biribiara fa sɛnea wɔyɛɛ no ​​|
| **Oprehyɛn anan no nyinaa yɛ adwuma** | Cryptographic recipes (keys, commitments, proofs) hia algebra ankasa, ɛnyɛ sɛ wɔbɛkan |
| **Ne kɛse a wobetumi apaw** | Paw 255-bit anaa 381-bit prime na afuw no wɔ nneɛma pii sen atɔm a ɛwɔ amansan a wotumi hu no mu; guessing yɛ nea anidaso biara nni mu |
| **Pɛpɛɛpɛ na ɛyɛ deterministic** | Afoforo abien a wodi nokware a wɔde kɔmputa yɛ ade koro no nya nea efi mu ba a ɛyɛ pɛ bere nyinaa, a adanse ahorow no gyina |

Afuo a ɛwɔ anohyetoɔ yɛ, wɔ kasasin baako mu no, **agorubea a wɔato mu pɛpɛɛpɛ, ɛyɛ pɛpɛɛpɛ, ɛyɛ kɛseɛ koraa ma akontabuo.** Wɔnam agodie a wɔdi wɔ mu no so na ɛsi biribiara a aka wɔ Zcash mu.

---

## 7. Baabi a eyi te wɔ Zcash

Ɛnsɛ sɛ wofa "Zcash de finite fields di dwuma" wɔ gyidi so. Concrete map no ni (mfiri a emu dɔ no yɛ ma nsɛm a ɛbɛba akyiri yi; eyi yɛ de kyerɛ sɛ nsateaa nkyerɛwee no yɛ nokware ara kwa).

- **Sapling** (nsusuwii dedaw a wɔabɔ ho ban) si n’adanse wɔ curve a wɔfrɛ no **BLS12-381** so, a ne base field de prime a ne tenten yɛ **381 bits** di dwuma. Coordinate, key, ne proof element biara yɛ element a ɛwɔ finite field a wɔasi wɔ saa prime no so.
- **Orchard** (mprempren shielded design) de curves mmienu a wɔfrɛ no **Pallas ne Vesta** ("Pasta" curves) di dwuma, a ne mfuo de primes a ne tenten bɛyɛ **255 bits** di dwuma.
- **note commitment**, **nullifier**, ne akontabuo a ɛwɔ **zero-knowledge proof** a ɛfiri Ahyɛdeɛ 0 mu no nyinaa yɛ, wɔ aseɛ hɔ, nneɛma a ɛwɔ saa afuo a ɛwɔ anohyetoɔ yi mu baako mu. Sɛ protocol no ka sɛ "compute saa commitment yi," ɛkyerɛ sɛ "yɛ saa arithmetic mod yi sɛ prime."

![alt nkyerɛwee](/content-images/image-7-c81fe982f0.webp)

Enti Ahyɛde 0 asɛmmisa a wɔabue ano no mmuae, *"ɛhe na kokoam aduannoa ho nyansahyɛ ahorow no fi?"*, fi ase wɔ ha: **biribiara fi ase sɛ akontaabu wɔ afuw a ɛwɔ anohyeto mu.** Wɔ asɛm a edi hɔ no mu no yɛbɛfa saa afuw no na yɛasi nneɛma ankasa, nsɛntitiriw wɔ elliptic curve so, a ɛbɛyɛ nsafe ne bɔhyɛ ahorow.

---

## 8. Nokware mu asɛm a wɔka sɛ wɔmfa wɔn ho nhyɛ mu

Sɛnea ɛbɛyɛ a yɛbɛkɔ so ayɛ adamfofa su ma wɔn a wɔaba foforo no yɛmaa nokware nneɛma kakraa bi yɛɛ mmerɛw. Ɛnyɛ sɛ afuw a ɛwɔ anohyeto no mma wɔ `F_p` dɛ a ɛyɛ dɛ; wobɛtumi nso de asi afuo `p^n` elements (a wɔfrɛ no **extension fields**), na ɛnonom ho hia ma "pairings" a Sapling adansedi nhyehyɛe no de ne ho to so. Yɛsan nso twaa field axioms a wɔahyehyɛ no nyinaa so na yɛde glossed wɔ sɛnea wɔpaw primes a ne kɛse te sɛɛ na wɔma ɛyɛ nokware no so. Ɛno mu biara nsakra nkate a wukura mprempren no; ɛma ɛyɛ yiye. Yɛde pɛpɛɛpɛyɛ no bɛka ho asan, a frankaa ka ho, bere a asɛm bi a ɛbɛba akyiri yi hia no.

---

## 9. Nsɛm a wɔaboaboa ano

- Cryptography hia nɔma nhyehyɛe a **ɛwɔ anohyeto, ɛyɛ pɛpɛɛpɛ, ɛyɛ kɛse-anifurae, ɛdannan koraa, na ɛyɛ kɛse.** Saa nhyehyɛe no yɛ **finite field**.
- Nhumu no yɛ ** dɔn**: akontabuo a **ɛbɔ ho ** (modular akontabuo), a ɛpopa nɔma bi "kɛseɛ" wɔ ɔkwan a ɛyɛ mmerɛw so.
- Nkontaabu a wɔde akontaahyɛde no yɛ `0..p-1` mod a **prime** a ɛyɛ nokware. `p` ma afuw ankasa `F_p`, baabi a wobɛtumi nso **akyekyɛ** ɛfiri sɛ element biara a ɛnyɛ zero wɔ inverse.
- Modulus no **ɛsɛ sɛ ɛyɛ prime**: modulus a wɔabom ayɛ no yɛ zero divisors (te sɛ `2 x 3 = 0 mod 6`) na ɛbubu mpaapaemu.
- Kɔmputa ahorow nam **Fermat Nsusuwii Ketekete** (`a^(-1) = a^(p-2)`).
- Wɔ **Zcash** mu no, safoa, bɔhyɛ, nullifier, ne adanseɛ element biara awieeɛ koraa no ɛyɛ adeɛ a ɛwɔ afuo kɛseɛ a ɛwɔ anohyetoɔ mu (255-bit Pasta afuo ma Orchard, 381-bit afuo ma Sapling BLS12-381).

---

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| **Modular akontabuo** | Nkontaabu a ɛbɔ ho ban bere a adu bo a wɔahyɛ ato hɔ akyi, te sɛ dɔn |
| **mod p** na ɛyɛ | "Kyekyɛ mu denam." `p` na fa nea aka no sie" |
| **Afuw** | Nnɔmba nhyehyɛe a wɔde ka ho, yi fi mu, bɔ, na kyekyɛ adwuma nyinaa mu |
| **Afuo a ɛwɔ anohyetoɔ `F_p`** ** | Nnɔmba ahorow no `0..p-1` ne akontaabu ayɛ mod a prime `p` |
| **Inverse (wɔde ne ho hyɛ mu)** | Element no `a^(-1)` ne `a x a^(-1) = 1`; "a wɔkyekyɛ mu denam." `a`" kyerɛ sɛ wɔde bɛdɔɔso |
| **Zero nkyekyɛmu** | Nneɛma abien a ɛnyɛ zero a nea efi mu ba yɛ zero; ade a ɛsɛe composite moduli |
| **Prime ** Ɔde ne nsa kyerɛɛ ne so | Dodow mũ a ɛboro 1 a nneɛma biara nni mu gye 1 ne n’ankasa |

---

## FAQ

**Dɛn nti na womfa integers anaa decimals a ɛyɛ mpapahwekwa nni dwuma kɛkɛ?**
Desimals kurukuruwa na ɛtwetwe; integers nyin a enni bound ne leak size. Finite fields yɛ pɛpɛɛpɛ, anohyeto, na size-blind, a cryptography hwehwɛ.

**So "wrap around" hwere nsɛm?**
Wɔhyɛɛ da, yiw. Mfinimfini botae ahorow no kɛse a wobɛpopa no yɛ ade, na ɛnyɛ bɔne, ma kokoam nsɛm.

**So prime kɛse yɛ ahobammɔ kɛse bere nyinaa?**
Wɔ ɔkwan a ɛnyɛ den so no, afuw kɛse kyerɛ gyinapɛn ahorow a ebetumi aba pii ne nsusuwii a ɛyɛ den, nanso ahobammɔ gyina adansi no nyinaa so, na ɛnyɛ afuw no kɛse nkutoo so. Nsɛm a ɛba akyiri yi ma eyi yɛ pɛpɛɛpɛ.

**Dɛn nti na saa primes pɔtee yi (255-bit, 381-bit) wɔ Zcash mu?**
Wɔapaw wɔn sɛnea ɛbɛyɛ a curves a wɔasi wɔ so no wɔ nhyehyɛe ne adwumayɛ a ɛfata ma adanse nhyehyɛe no. Saa "nhyehyɛe a ɛteɛ" no ne asɛmti a ɛwɔ nsɛm abien a edi hɔ no mu.

---

### Sɔ wo nkate mu hwɛ

In `F_7`, den ne `5 - 6`? (Kae: tena mu `{0,...,6}` denam nea wobɛkyekyere so.) *(Mmuae wɔ ase hɔ.)*

<details><summary>Answer</summary>

`5 - 6 = -1`, ne `-1` wɔde abɔ mu `F_7` is `6` (ɛfiri `6 + 1 = 7 = 0`). So `5 - 6 = 6 (mod 7)`. Nneɛma a wɔtwe fi mu no mfi afuw no mu da; ɛkyekyere ɔkwan foforo so kɛkɛ.
</details>

---

### Nea edi hɔ

**Ahyɛdeɛ 2 . Elliptic curves:** yɛfa finite field a yɛasi seesei ara no na yɛde di dwuma de twetwe curve bi a ɛyɛ nwonwa a wobetumi "de ne nsɛntitiriw aka ho". Saa nsɛm no bɛyɛ Zcash safe ne ne bɔhyɛ ahorow, na ɛde ɔkwan biako so afiri a ɛma kokoam nsɛm nhyehyɛe no nyinaa tumi yɛ yiye sie. Intuition kan, sɛnea ɛte daa no.

*Zcash no fã bi a efi Nnyinasosɛm a Edi Kan *series ma [ZecHub](https://zechub.org). CC BY-SA 4.0 a wɔama ho tumi krataa.*

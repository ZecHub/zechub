# Elliptic Curves: Baabi a Wɔwo Zcash Safoa ne Bɔhyɛ ahorow
##### Mfitiase Nhwehwɛmu a efi [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nkyerɛwee](image-10.png)

### Ɔkwan a ɛkɔ ɔkwan biako so a wosii fi mmeae a ɛwɔ ɔkwan a ɛkɔ akyiri so

> **Series:** *Zcash fi Nnyinasosɛm a Edi Kan* . **Ahyɛdeɛ 2 . Elliptic Curves**
> **Atiefo:** wɔn a wɔaba foforo. Yɛfa no sɛ [Ahyɛde 1 (finite fields) nkutoo .](article-1-finite-fields.md): akontabuo a ɛkyekyere mod a prime. Ná akyigyina foforo biara ho nhia.
> **Nea wobɛgyaw:** mfonini a ɛyɛ mmerɛw na ɛteɛ a ɛfa elliptic curves ho, "trapdoor" a ɛma ɛyɛ nea mfaso wɔ so, ne sɛnea Zcash dan no safe ne bɔhyɛ ahorow pɛpɛɛpɛ.

[Ahyɛdeɛ 1](article-1-finite-fields.md) maa yenyaa agoprama a edi mũ ma akontaabu: abɔnten a anohyeto wom. Nanso afuw bi ankasa yɛ akontaahyɛde ara kwa. Sɛ wɔbɛkyekyere nsafe ne "envelopes a wɔatoto mu" a efi [Ahyɛde 0](article-0-shielded-transaction.md), Zcash hia adeɛ a ɛwɔ ɔhaw soronko bi a ɛfa ɔkwan baako so: ɛnyɛ den sɛ wɔbɛbu akontaa akɔ anim, ɛkame ayɛ sɛ ɛrentumi nyɛ yie sɛ wɔbɛsan akɔ akyi. Saa adeɛ no yɛ **elliptic curve**. Saa asɛm yi kyekye no fi fam, intuition ansa na algebra aba.

---

## 1. Adɛn nti na ɛsɛ sɛ wodwene ho?

Kokoamsɛm nhyehyɛe biara hia **ɔkwan biako**: oprehyɛn a ɛnyɛ hwee sɛ wobɛnantew akɔ w’anim na wɔ ɔkwan a etu mpɔn so no, ɛrentumi nyɛ yiye sɛ wobɛsan akɔ akyi.

Nea enti a ɛte saa ni. Wo **secret key** yɛ nɔma a wode sie. Wo **public key** (ne wo address) no, wonya fi mu na wɔkyerɛ wiase. Nhyehyɛe no ahobammɔ nyinaa gyina nokwasɛm biako so: *sɛ wɔde ɔmanfo safe no ma a, obiara ntumi nyɛ adwuma nsan nkɔ wo kokoam safe no so.* Sɛ wobetumi a, wobetumi asɛe wo sika.

Enti yehia akontaabu dwumadi bi a:

- kɔ **kɔ anim** (ahintasɛm -> ɔmanfo) yɛ ntɛmntɛm na ɛnyɛ den, nanso
- kɔ **akyi** (baguam -> kokoam) yɛ den araa ma kɔmputa a ɛwɔ Asase so a ɛyɛ adwuma wɔ amansan nkwa nna nyinaa mu nyinaa renwie.

Plain finite-field multiplication nyɛ papa sɛnea ɛsɛ; mpaapaemu ma ɛpopa ntɛm ara (ɛno ne asɛm a ɛwɔ Ahyɛde 1 no mu nyinaa). Yɛhia biribi a "undo" button a ɛyɛ mmerɛw biara nni mu. Elliptic curves de saa pɛpɛɛpɛ ma, na sɛ bonus no, wɔn nsɛntitiriw no ka bom wɔ ɔkwan a ɛyɛ pɛpɛɛpɛ ma bɔhyɛ ahorow a wɔkyekye. Ma yɛnhwɛ sɛnea ɛbɛyɛ.

---

## 2. The intuition: curve a ne nsɛntitiriw a wubetumi "de aka ho".

Wo werɛ mfi cryptography kakra. **elliptic curve** yɛ nsɛntitiriw a wɔahyehyɛ no ara kwa `(x, y)` a ɛma nsɛso bi a ɛfa nsusuwii no ho di mu:

```
y^2 = x^3 + ax + b
```

Wɔ akontaahyɛde a ɛyɛ mpapahwekwa mu no, ɛte sɛ nea ɛyɛ torotoro na ɛtwetwe, a mpɛn pii no ɛwɔ ahama kurukuruwa ne dua abien:

![alt nkyerɛwee](image-14.png)

Ɔfã a ɛyɛ nwonwa ankasa: **wubetumi "de" nsɛntitiriw abien aka ho wɔ saa curve yi so na woanya nsɛntitiriw a ɛto so abiɛsa wɔ curve koro no ara so.** Eyi nyɛ coordinates a wɔde ka ho a ɛyɛ ɔkwan biara so. Ɛyɛ geometric mmara, na ɛyɛ mmerɛw sɛ *wubehu* sen sɛ wobɛka.

### Chord mmara (a wɔde nsɛntitiriw abien ka ho) .

Sɛ yɛde bɛka ho a `P + Q`:

1. Twe nsensanee tẽẽ bi fa mu `P` ne `Q`.
2. Saa nkyerɛwde no bɔ curve no wɔ baabi biako pɛpɛɛpɛ bio. Frɛ no `R*`.
3. **Sɛso `R*` across the horizontal axis.** Saa nsusuwii no ne mmuae no, . `P + Q`.

![alt nkyerɛwee](image-11.png)

### Tangent mmara (a ɛde nsɛntitiriw bi ka ne ho) .

Sɛnea ɛbɛyɛ a wobetumi ayɛ akontaabu `P + P` (atwerɛ `2P`), beaeɛ a ɛtɔ so mmienu biara nni hɔ a wobɛtwe nkyerɛwdeɛ bi afa mu, enti wode **tangent** nkyerɛwdeɛ no di dwuma wɔ `P` mmom, afei di "ntwamu a ɛto so abiɛsa, afei susuw" aduannoa ho nyansahyɛ koro no ara akyi.

Ɛno ne oprehyɛn no nyinaa. Geometric mmara abien. Wɔ wɔn nkyɛn no, nsɛntitiriw a ɛwɔ elliptic curve mu no yɛ nea akontaabufo frɛ no **kuw**: set a "addition" a ɛyɛ suban pa wom. Ɛwɔ "zero" mpo.

### Beae a ɛwɔ infinity (curve no zero) .

Nnɔmba nhyehyɛe biara hia a `0`, ade a ɛnsakra biribiara bere a wode ka ho no. Wɔ elliptic curve so no, saa dwumadie no, beaeɛ soronko bi a ɛboro so a wɔfrɛ no **point at infinity**, a wɔakyerɛw `O`. Wubetumi ayɛ ho mfonini sɛ "kɔ soro a enni ano," beae a nsensanee a ɛda hɔ gyina hɔ hyia. Ɔde ka ho `O` kosi baabiara no gyaw no a ɛnsakra, te sɛ nea wode ka ho pɛpɛɛpɛ `0`.

---

## 3. Efi mfonini ahorow so kosi afuw a anohyeto wom so

Curve a ɛyɛ mmerɛw a ɛwɔ atifi hɔ no ne *intuition*. Nanso Zcash mfa nɔma ankasa nni dwuma (wɔyɛ round na leak size, sɛnea Ahyɛde 1 kyerɛ no). Ɛde elliptic curve **wɔ finite field so** di dwuma: equation koro no ara `y^2 = x^3 + ax + b`, nanso ne akontaabu nyinaa ayɛ mod a prime.

Sɛ woyɛ saa a, curve fɛfɛ no bubu yɛ **apete a ɛyɛ nsensanee a wɔatwa mu**, nsensanee biako ma emu biara `(x, y)` pair a ɛma equation mod no di mu `p`. Egyae sɛ ɛte sɛ nea ɛyɛ kurukuruwa koraa. Nanso ade a ɛho hia ni:

> **Algebra a ɛwɔ chord-and-tangent mmara no mu no da so ara yɛ adwuma pɛpɛɛpɛ.** Fomula koro no ara a wohuu no `P + Q` geometrically afei fa finite-field akontabuo bu ho akontaa. Nsonsonoe no da so ara yɛ kuw, a saa ara na ɛwɔ hɔ `0` (asɛm a ɛwɔ baabi a enni ano).

Momma yɛmfa nhwɛso ketewaa bi a wɔagye atom koraa nyɛ eyi ankasa.

### Curve a edi mũ, a wɔabu ho akontaa pɛpɛɛpɛ

Fam `y^2 = x^3 + 2x + 2` wɔ afuw a anohyeto wom no so `F_17`. Sɛ wɔbɔ nsɛntitiriw biara a ɛfata a, ɛma wonya **nsɛntitiriw 18 pɛpɛɛpɛ, na wɔde nsɛntitiriw a ɛwɔ infinity = 19 nyinaa ka ho.** Wɔn mu kakraa bi:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Afei paw asɛm no `G = (5, 1)` na kɔ so de ka ne ho. Hwɛ nea ɛkɔ so (wɔyɛɛ nkyerɛwde biara a ɛwɔ ase ha no ho akontaabu, na ɛnyɛ nea wɔasusuw ho):

| Anamɔn | Point | Anamɔn | Point |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (a enni ano)** |
| `10G` | (7, 11) | | |

Nneɛma abien a ɛsɛ sɛ yɛhyɛ no nsow:

- Ɛ **kɔsra mmeae a ɛwɔ anohyeto 18 no nyinaa na afei ɛkɔ fam `O`** wɔ anammɔn 19 mu no, afei na ɛbɛsan ayɛ bio daa. Ade a wofi ase `G` "generates" kuw no nyinaa, enti yɛfrɛ no **generator**.
- Ɛyɛ kuw a wɔagye atom: sɛ nhwɛso no `1G + 2G = (5,1) + (6,3) = (10,6)`, a ɛyɛ pɛpɛɛpɛ `3G`.  Nea wɔde ka ho no yɛ nea ɛkɔ so daa wɔ wɔn mu, sɛnea kuw bi hwehwɛ no.

---

## 4. Afiri pon no: scalar multiplication

Saa pon no a `1G, 2G, 3G, ...` yɛ biribiara koma. Sɛ wɔde nsɛntitiriw bi ka ne ho mpɛn pii a, wɔfrɛ no **scalar multiplication**: asɛm no `kG` kyerɛ sɛ "`G` de kaa ne ho `k` mmere."

Afei nkonyaayi no. Susuw akwankyerɛ abien no ho hwɛ:

| Akwankyerɛ | Asɛmmisa | Ɔhaw |
|---|---|---|
| **Akɔ anim** | Ama `k` ne `G`, akontaabu `kG` | **Easy.** Po mpo ma nsoromma mu hwɛ akɛse `k`, afiri bi a wɔfrɛ no *double-and-add* du hɔ wɔ anammɔn ɔhaha kakraa bi mu |
| **Akyi** | Ama `G` ne `kG`, sa pɛ bra `k` | **Effectively ɛrentumi nyɛ yiye** wɔ cryptographic curve ankasa so |

Saa asymmetry no ne **ɔkwan baako** a na yɛhia wɔ Ɔfa 1. Ɔhaw a ɛkɔ akyi ("a `k` produced this point?") na wɔfrɛ no **Elliptic Curve Discrete Logarithm Problem (ECDLP)**, na wɔ curves a Zcash de di dwuma no so no, ɔkwan biara nni hɔ a wonim ntumi nni ho dwuma ansa na amansan no ɔhyew awu.

![alt nkyerɛwee](image-12.png)

> Wɔ yɛn agode mu `F_17` curve a *wobetumi* akenkan kɛkɛ `k` off the table, efisɛ ɛwɔ nsɛntitiriw 19 pɛ. Curves ankasa wɔ atwa ho ahyia `2^(255)` nsɛntitiriw. Anka pon no benya toatoaso pii sen atɔm a ɛwɔ amansan no mu, enti "kenkan a wobɛkenkan" nyɛ ɔkwan a wobɛfa so. Ketekete no ne nea ɛma agode curve no yɛ nea wotumi kyerɛkyerɛ ne nea enti a ɛnyɛ ahobammɔ nso.

---

## 5. Sɛnea wɔwo safe (akatua no) .

Seesei yɛwɔ biribiara a ehia na yɛde akyerɛkyerɛ cryptographic key ankasa mu, na ɛyɛ mmerɛw ma ɛyɛ nwonwa:

> **Paw nɔma bi a ɛwɔ kokoam `k`. Twerɛ asɛm no `kG`. Ɛno ne no.**
> `k` yɛ wo **private key**. `kG` yɛ wo **ɔmanfoɔ safoa**. Ɔkwan biako so (ECDLP) no ma awerɛhyem sɛ obiara ntumi ntu mmirika `kG` san kɔ `k`.

Saa adwene baako yi, *ɔmanfoɔ safoa yɛ kokoam scalar mpɛn generator a ɛyɛ pintinn*, yɛ aba a ɛwɔ Zcash sikasɛm safoa, hwɛ safoa, ne address ahodoɔ mu. Dua titiriw a ɛyɛ safe no ma nhyehyɛe pii wɔ soro, nanso nkorabata biara nyin fi saa ntini yi mu.

### Bonus: nea enti a curve points yɛ bɔhyɛ ahorow a edi mũ

Kae "sealed envelope" (commitment) a efi Ahyɛde 0 mu, a na ɛsɛ sɛ **de** emu nsɛm no sie nanso **ɛrentumi nyɛ yiye sɛ wɔbɛyɛ atoro**. Elliptic curves ma yɛn ɔkwan a ɛho tew a yɛbɛfa so ayɛ biako. Fa mmeae abien a ɛyɛ pintinn, ɔmanfo generator `G` ne `H`, kokoam botae bi `v`, ne nɔma a ɛma ani fura a wɔanhyɛ da `r`, ne ɔkwan a wɔfa so yɛ:

```
Commitment  =  v.G  +  r.H
```

Eyi yɛ **Pedersen bɔhyɛ**, na ɛwɔ agyapade abien no nyinaa a yɛpɛe:

- **Hiding:** nea wɔyɛ no random `r` de nea efi mu ba no petepete curve no nyinaa so, enti asɛm no nna biribiara adi wɔ ho `v`.
- **Binding:** ECDLP no ma ɛnyɛ yiye sɛ wobɛhwehwɛ *ɛsono* . `(v, r)` asɛm koro no ara a wode bɛma, enti wuntumi nsakra w’adwene wɔ nea wode wo ho hyɛɛ mu no ho.

Bonus agyapade bi dan bo a ɛsom bo akyiri yi: saa bɔhyɛ ahorow yi **ka ho**. Ahofama a wɔde ma sɛ `v_1` ne bɔhyɛ a ɛne sɛ `v_2` yɛ bɔhyɛ a ɛfata sɛ `v_1 + v_2`. Saa "homomorphic" suban no ne sɛnea Zcash bɛkyerɛ akyiri yi sɛ sika a ɛkɔ *kɔ* asɛm bi mu no ne sika a ɛrepue *pue* no yɛ pɛ, a ɔrenna sika biara adi. Yɛbɛma ɛno ayɛ sika wɔ bɛyɛ Ahyɛdeɛ 6 no mu.

---

## 6. Baabi a eyi te wɔ Zcash

Nsateaa nkyerɛwee no yɛ kɔnkrit na wotumi hwɛ mu.

| Zcash nhyehyɛe | Curves a ɛde di dwuma | Dwuma a Di |
|---|---|---|
| **Sapling** (older) | **BLS12-381** plus an embedded curve called **Jubjub** | BLS12-381 carries the proof system; Jubjub is built over BLS12-381's scalar field so that key and commitment operations are cheap to perform *inside* a zero-knowledge proof |
| **Nnua turo** (mprempren) | **Pallas** ne **Vesta** ("Pasta" kyinhyia no) | Pallas kura Orchard nsafe ne ne bɔhyɛ ahorow; wɔayɛ Pallas/Vesta pairing no ho nhyehyɛe titiriw sɛnea ɛbɛyɛ a adanse a ɛkɔ akyiri no bɛyɛ adwuma yiye |

Nea enti a curve biako nya "embedded" wɔ foforo afuw mu, ne nea enti a *cycle* a curve abien ho wɔ mfaso no yɛ nokware na ɛho hia, nanso ɛyɛ proof-system articles no dea. Mprempren de, takeaway no yɛ den: **Zcash safoa biara yɛ scalar mpɛn generator, na Zcash bɔhyɛ biara yɛ curve nsɛntitiriw a wɔaboaboa ano**, a ɛte saa curves a wɔato din yi mu biako so.

![alt nkyerɛwee](image-13.png)

---

## 7. Nokwaredi mu asɛm a wɔka sɛ wɔmfa wɔn ho nhyɛ mu

Nneɛma kakraa bi a wɔayɛ no mmerɛw no maa eyi kɔɔ so kenkan. Yɛde **Weierstrass** kratasin tiawa (`y^2 = x^3 + ax + b`); Wɔtaa kyerɛw Zcash curves no wɔ akwan foforo a ɛne no sɛ (Jubjub yɛ *twisted Edwards* curve) a wɔpaw sɛnea ɛbɛyɛ a ɛbɛyɛ adwuma yiye na ahobammɔ wom, nanso kuw adwene no yɛ pɛ. Yɛankyerɛkyerɛ point-addition formulas no pɛpɛɛpɛ (wɔyɛ algebraic version a ɛkyerɛ "third intersection, then reflect"), na yɛde subtleties te sɛ curve order, cofactors, ne "pairings," a ɛbɛyɛ nea ɛho hia wɔ proof-system nsɛm no mu no too nkyɛn. Eyinom mu biara nsakra sɛnea wɔte nka no; ɛma ɛyɛ nnam.

---

## 8. Nsɛm a wɔaboaboa ano

- Kokoamsɛm nhyehyɛe hia **ɔkwan biako so**: ɛnyɛ den sɛ wobɛkɔ anim, akɔ akyi a entumi nyɛ yiye. Elliptic curves ma wonya biako.
- **elliptic curve** yɛ nsɛntitiriw a wɔahyehyɛ a ɛma abotɔyam `y^2 = x^3 + ax + b`, na wobetumi **de ne nsɛntitiriw aka ho** denam geometric **chord-and-tangent** mmara no so, a **nsɛntitiriw soronko bi a ɛwɔ infinity** yɛ adwuma sɛ zero.
- Wɔ **finite field** so no, curve no bɛyɛ nsensanee a wɔapete, nanso saa nkabom koro no ara da so ara yɛ adwuma na nsɛntitiriw no yɛ **kuw**. (Nhwɛso a wɔagye atom: `y^2 = x^3 + 2x + 2` so `F_17` wɔ nsɛntitiriw 19, na `G = (5,1)` na ɛma wɔn nyinaa ba.)
- **Scalar dodow a wɔdɔɔso** `kG` ɛnyɛ den sɛ wobɛbu akontaa nanso ɛrentumi nyɛ yie sɛ wobɛdan no: **ECDLP** no. Ɛno ne afiri pon no.
- **Keys:** kokoam safoa `k`, ɔmanfo safe `kG`. **Abɔhyɛ ahorow:** Pedersen kratasin `v.G + r.H`, a ɛde sie, ɛkyekyere, na ɛyɛ mmerɛw sɛ **ɛka ho**.
- Wɔ **Zcash** mu no, Sapling de **BLS12-381 + Jubjub** di dwuma na Orchard de **Pallas/Vesta (Pasta)** curves di dwuma; safoa ne ahofama biara tra eyinom so.

---

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| **Elliptic a ɛyɛ kurukuruwa** | Nsɛntitiriw a ɛma abotɔyam `y^2 = x^3 + ax + b`, a "ade ka ho" soronko bi a ɛfa nsɛntitiriw ho |
| **Nsɛntitiriw a wɔde ka ho** | Chord-and-tangent mmara: line fa nsɛntitiriw abien mu, fa hit a ɛto so abiɛsa, kyerɛ |
| **Twe adwene si baabi a enni ano (`O`)** | Curve no yɛ "zero"; sɛ wode ka ho a, ɛnsesa hwee |
| **Nneɛma a ɛma anyinam ahoɔden (`G`)** | Base point a awiei koraa no ne multiples kata kuw no nyinaa so |
| **Scalar dodow a ɛkɔ soro (`kG`)** | Ɔde ka ho `G` ma n’ankasa ho `k` mmere; ɛnyɛ den sɛ wobɛkɔ anim, ɛyɛ den sɛ wobɛsan akɔ akyi |
| **ECDLP** na ɛyɛ adwuma | Ɔhaw a emu yɛ den a ɛne sɛ obi ho bɛtɔ no `k` firi `kG`; ahobammɔ fapem no |
| **Pedersen bɔhyɛ** | `v.G + r.H`; envelope a wɔatoto mu a ɛde sie, kyekyere, na ɛka bom |

---

## FAQ

**Dɛn nti na curves mmom sen sɛ ɛbɛyɛ nɔma akɛse kɛkɛ mod a prime?**
Wɔn baanu nyinaa betumi ama ɔkwan biako so, nanso elliptic curves nya ahobammɔ koro no ara denam nsafe nketewa koraa ne adwumayɛ a ɛyɛ ntɛmntɛm so, na wɔn point akontabuo no ye ma bɔhyɛ ahorow.

**So wɔada no adi sɛ ECDLP no yɛ den?**
Ɛnyɛ *wɔada no adi sɛ* ɛrentumi nyɛ yiye, nanso mfe du du pii mmɔdenbɔ a emu yɛ den no nhuu ntua biara a etu mpɔn wɔ curves a wɔapaw no yiye so. Ahobammɔ gyina saa adwene a wɔasɔ ahwɛ yiye no so.

**So quantum kɔmputa betumi abubu eyi?**
Quantum kɔmputa a ɛsõ sɛnea ɛsɛ betumi abubu ECDLP no. Ɛno yɛ ade a wonim sɛ ɛhaw adwene bere tenten wɔ nnwuma no nyinaa mu ne nhwehwɛmu beae a ɛyɛ nnam; nnɛyi curves da so ara yɛ nea ahobammɔ wom wɔ tete kɔmputa ahorow ho.

**Adɛn nti na Zcash de curve bɛboro biako di dwuma?**
Nnwuma ahorow. Curve biako kura zero-knowledge proof nhyehyɛe no; foforo (a wɔde ahyɛ nea edi kan no afuw mu) ma in-proof key ne commitment operations no yɛ adwuma yiye. Nsɛm a edi hɔ no kyerɛkyerɛ nea enti a saa awarefo a wɔbom yɛ no ho hia no mu.

---

### Sɔ wo nkate mu hwɛ

Sɛ wode pon a wɔagye atom wɔ Ɔfa 3 no di dwuma a, nea ɛyɛ `9G + 10G` wɔ yɛn agode curve no so? Na dɛn na mmuae no ka ho asɛm kyerɛ wo `G`? *(Mmuae wɔ aseɛ ha.)*

<details><summary>Answer</summary>

`9 + 10 = 19`, na yehuu saa `19G = O`, asɛm a ɛwɔ baabi a enni ano. Nti `9G + 10G = O`. Eyi kyerɛ sɛ `10G` ne **negative** (additive inverse) a ɛyɛ `9G`: nsɛntitiriw abien a ɛde ka "zero" nsɛntitiriw no ho. Wɔ curve so no, point bi negative yɛ n’ahwehwɛ mfonini ara kwa wɔ x-axis no so, na ampa `9G = (7,6)` ne `10G = (7,11)` kyɛ ade koro no ara `x` na wɔanya `y`- values ​​a ɛka bom yɛ `17 = 0 (mod 17)`. Nhyehyɛe no yɛ pɛpɛɛpɛ, a ɛno ne nea "ɛyɛ kuw" de hyɛ ho bɔ pɛpɛɛpɛ.
</details>

---

### Nea edi hɔ

**Ahyɛdeɛ 3 . Hashing ne commitments:** yɛbɛbue "magic sealed envelope" no yie. Seesei woahu ɔkwan biako a wobɛfa so akyekye bɔhyɛ bi afi curve points mu; afei yebisa nea hiding ne binding kyerɛ ankasa, yehyia hash functions, na yɛde abien no nyinaa bata note commitments a anchor Zcash payment biara ho.

*Zcash no fã bi a efi Nnyinasosɛm a Edi Kan *series ma [ZecHub](https://zechub.org). CC BY-SA 4.0 a wɔama ho tumi krataa.*

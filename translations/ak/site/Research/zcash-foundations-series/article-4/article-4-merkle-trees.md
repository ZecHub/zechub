# Merkle Nnua: Sɛnea Blockchain Kae Biribiara a Wɔahyɛ no nsow
##### Mfitiase Nhwehwɛmu a efi [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nkyerɛwee](image-19.png)

### Bɔhyɛ ɔpepem pii a yɛbɛbɔ no mua wɔ nsateaa ketewaa biako mu

> **Series:** *Zcash fi Nnyinasosɛm a Edi Kan* . **Ahyɛdeɛ 4 . Merkle Nnua**
> **Atiefo:** wɔn a wɔaba foforo. Yɛde si [Ahyɛde 3 (hashing ne bɔhyɛ ahorow) so.](article-3-hashing-commitments.md). Sɛ wunim nea nsateaa ne ahofama yɛ a, na woasiesie wo ho.
> **Nea wobɛgyae:** Merkle nnua mfonini a ɛyɛ mmerɛw, ɛteɛ, sɛnea wobɛkyerɛ sɛ woyɛ asɔremma a worenda ade a wopɛ sɛ woka adi, ne sɛnea eyi bɛyɛ Zcash note commitment dua no pɛpɛɛpɛ.

[Ahyɛdeɛ 0](article-0-shielded-transaction.md) kaa "ɔmanfoɔ board" a ɛkura nkyerɛwdeɛ biara a wɔayɛ pɛn na ɛnyini da nko ara ho asɛm. Seesei wobɛtumi asusu deɛ wɔde abɔ mu: **bɔhyɛ ahodoɔ** (Ahyɛdeɛ 3), nkrataa a wɔatoto mu no. Nanso board ankasa bɛkura wɔn mu *ɔpepehaha pii*. Ɔkwan bɛn so na network no de saa asɛm no sie, di ho adanse, na ɛma woda no adi sɛ wo envelope no wɔ board no so a wontwe adwene nsi so? Mmuae no yɛ adan a ɛyɛ fɛ sen biara wɔ kɔmputa ho nyansahu mu no mu biako: **Merkle dua no.**

---

## 1. Adɛn nti na ɛsɛ sɛ wodwene ho?

Ɔhaw abien pue bere a wowɔ bɔhyɛ ahorow a wɔahyehyɛ wɔ baguam kɛse no.

**Ɔhaw a edi kan: integrity at scale.** Sɛ list no wɔ entries ɔpepem 300 a, ɛbɛyɛ dɛn na obi asi so dua sɛ *ɛnyɛ biako* wɔ kokoam nsakrae? Sɛ wɔbɛsan ahwɛ nneɛma ɔpepem 300 mu bere biara a wɔbɛhwɛ no no yɛ nea anidaso biara nni mu.

**Ɔhaw a ɛtɔ so mmienu: kokoam asɔremma.** Sɛ wopɛ sɛ wode krataa bi (Ahyɛdeɛ 0) di dwuma a, ɛsɛ sɛ woda no adi sɛ wo bɔhyɛ no wɔ board no so ampa. Nanso sɛ wotwe adwene si so ("ɛyɛ entry number 4,201,337!"), woayɛ deanonymized wo ho ara kwa. Ɛsɛ sɛ woda no adi sɛ *"me envelope no wɔ baabi wɔ board yi so"* a worenda **nea** bi adi.

Merkle dua bi siesie abien no nyinaa prɛko pɛ. Ɛde nsɛm a wɔahyehyɛ no nyinaa mia nsateaa biako so, na ɛma wutumi de adanse ketewaa bi a ɛde gyinabea sie di adanse sɛ woyɛ asɔremma.

---

## 2. Intuition: nsateaa nkyerɛwee akansi

Fa w’adwene bu knockout tournament bracket, nanso sɛ́ anka agodifo bɛkɔ wɔn anim no, **nsateaa nkyerɛwee ka bom.**

- Wɔ ase hɔ no, data biara nya n’ankasa nsateaa nkyerɛwee (ne hash fi Ahyɛde 3). Eyinom ne **ahaban.**
- Fa wɔn bom yɛ abien. Wɔde hash awarefo biara nsateaa abien *bom* yɛ ɔwofo nsateaa nkyerɛwee biako.
- Fa awofo no bom, hash baanu biara bom, ne nea ɛkeka ho.
- Kɔ so kɔsi sɛ **nsateaa baako** bɛtena soro. Saa champion no ne **Merkle ntini.**

![alt nkyerɛwee](image-20.png)

Agyapadeɛ baako a ɛho hia paa no di akyi tẽẽ firi avalanche effect no mu (Ahyɛdeɛ 3):

> **Ntini no yɛ nsateaa a ɛkyerɛ *biribiara* a ɛwɔ n’ase.** Sesa ahaban biara, mpo kakra, na ne nsateaa sesa, a ɛsakra n’awofo, a ɛsakra *saa* ɔwofo no, kɔ soro nyinaa. **Ntini no sesa.** Enti ntini bo ketewa biako di adanse sɛ list no nyinaa yɛ nokware. Ɛno di Ɔhaw a edi kan no ho dwuma.

---

## 3. Dua ankasa, a wɔabɔ ho akontaa pɛpɛɛpɛ

Momma yɛmfa SHA-256 nsateaa nkyerɛwee ankasa nsi dua a nhaban anan wɔ atifi hɔ no wɔ nhaban no so `A, B, C, D` (wɔakyerɛ sɛ wɔatwa digests no mu sɛnea ɛbɛyɛ a wobetumi akenkan):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Biribiara yɛ "hash ade bi, afei hash pairs of hashes" kɛkɛ. Biribiara nni hɔ a ɛyɛ nwonwa sen Ahyɛde 3 a wɔahyehyɛ no dua bi mu no.

---

## 4. Ɔfã a ɛyɛ anifere: asɔremma a wɔbɛda no adi a wɔrenna gyinabea adi

Afei Ɔhaw a ɛto so abien. Ka sɛ wopɛ sɛ wokyerɛ sɛ saa ahaban no yɛ nokware `C` wɔ dua no mu, ma obi a ɔnim **ntini** nko ara. Wo *mfa* dua no nyinaa nhyɛ wɔn nsa. Wode nsateaa nkyerɛwee a ehia na wɔde aforo afi mu no nkutoo ma wɔn `C` kɔ ntini no so, a wɔfrɛ no **nokwaredi kwan** (anaasɛ **Merkle adanse**):

> Sɛnea ɛbɛyɛ a ɛbɛkyerɛ sɛ ɛyɛ nokware `C` wɔ dua no mu, ma:
> - ne nua `hD`, ne
> - ne papa nua barima `hAB`.

Ɔhwɛfo no, a onim ntini no nkutoo no, san bu ɔforo no ho akontaa:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Wɔabu akontaa ankasa: eyi ma aba `1b3faa3fcc5e...`, a **ne ntini no hyia.** Wɔada no adi sɛ ahaban no wɔ dua no mu.

![alt nkyerɛwee](image-21.png)

Nneɛma abien na ɛma eyi yɛ nea tumi wom:

- **Ɛyɛ ketewaa bi.** Wɔ nhaban 4 ho no wode hashes 2 mae. Na dua bi a `n` gyaw wo de ma bɛyɛ **log_2(n)** hashes nkutoo. Wɔ nhaban ɔpepepem biako ho no, ɛno bɛyɛ **30 hashes**, ɛnyɛ ɔpepepem biako. Ɛkame ayɛ sɛ adanse no nnyin bere a dua no pae kɛse no.
- **Ɛyɛ kokoamsɛm aba.** Adanse no kyerɛ sɛ wo ahaban no wɔ *baabi* wɔ dua no mu. Sɛ wɔyɛ saa nhwehwɛmu koro yi ara *wɔ zero-nimdeɛ adanseɛ mu* (Ahyɛdeɛ 5) a, ɔkwan no ankasa mpo ahintaw, enti woda no adi sɛ "me nkyerɛwde no wɔ dua no mu" bere a wonda nkyerɛwde no anaa ne gyinabea adi. Ɛno di Ɔhaw a ɛto so abien no ho dwuma koraa.

---

## 5. Efi Merkle dua bi so kosi Zcash note commitment dua so

Afei yebetumi aka nea Ahyɛde 0 "ɔmanfo bagua" no yɛ ankasa pɛpɛɛpɛ:

> **note commitment tree** yɛ Merkle dua a ne **haban yɛ note commitments.** Bere biara a wɔbɛbɔ note wɔ wiase baabiara no, wɔde ne commitment no ka ho sɛ ahaban a edi hɔ, na wɔyɛ ntini no foforo.

Nsɛm pɔtee kakraa bi a ɛyɛ nokware:

- **Ɛnyin nko ara.** Wɔde nhaban bata ho, wɔnyi mfi hɔ da. Wɔfrɛ eyi **Incremental Merkle dua.** (Ɛne Ahyɛde 0 "board no nsɛe biribiara da.")
- **Wɔfrɛ ntini no *ankora*.** Sɛ wosɛe sika a, w’adwuma no twe adwene si anchor a ɛbaa nnansa yi so na ɛkyerɛ, wɔ nimdeɛ zero mu, sɛ wo nkyerɛwde no bɔhyɛ te dua a ɛwɔ saa ntini no mu.
- **Fixed depth.** Zcash nnua a wɔabɔ ho ban no wɔ bun **32**, a ɛkyerɛ sɛ wobetumi akura mu akodu `2^(32)` (bɛboro ɔpepepem anan) nkrataa.
- **ZK-adamfofa hashing.** Wɔmfa SHA-256 nsi dua no. Sapling de **Pedersen hashes** hashes dua no na Orchard de **Sinsemilla** (abien no nyinaa fi Ahyɛde 3) di dwuma, pɛpɛɛpɛ sɛnea ɛbɛyɛ a asɔremma foro no bo yɛ mmerɛw sɛ wɔbɛda no adi wɔ ɔmansin bi mu.

![alt nkyerɛwee](image-22.png)

### Adeɛ baako a dua no *nni* ho dwuma: ɛbɔ ka mmɔho mmienu

Dua no di adanse sɛ nkyerɛwde bi **wɔ hɔ**. Ɛno ankasa nsiw wo kwan sɛ wobɛsɛe sika koro no ara mprenu. Saa adwuma no yɛ **nullifier set** a efi Ahyɛde 0 no dea: "void tokens" a wɔaboaboa ano a ɛyɛ soronko. Sɛ wosɛe sika a, wotintim nkyerɛwde no nullifier, na network no pow nullifier biara a wahu pɛn.

Enti ɔmanfo nhyehyɛe abien no di dwuma ahorow a ɛboa wɔn ho wɔn ho, na sɛ wɔbɛma atew wɔn ho a, ɛno ne nea ɛtwa abusuabɔ a ɛda krataa bi awo ne ne wu ntam no mu pɛpɛɛpɛ:

| Nhyehyeɛ | Asɛmmisa a ɛbua | Wɔayɛ no foforo bere a |
|---|---|---|
| **Hyɛ ahofama dua no nsow** | "So saa nkyerɛwde yi wɔ hɔ?" | Wɔayɛ nkyerɛwde bi **wɔabɔ** (wɔde bɔhyɛ aka ho) |
| **Nullifier a wɔahyehyɛ** | "So wɔasɛe saa krataa yi dedaw?" | Nkyerɛwde bi yɛ **asɛe** (nullifier a wɔatintim) |

---

## 6. Nokwaredi mu asɛm a wɔka sɛ wɔmfa wɔn ho nhyɛ mu

Nsɛm a wɔma ɛyɛ mmerɛw, sɛnea wɔtaa yɛ no. Merkle nnua a ɛkɔ soro ankasa di "frontier" nodes akyi sɛnea ɛbɛyɛ a ntini no betumi ayɛ foforo a ɛnsan nsi biribiara; network no sie mfɛnsere a ɛyɛ nnansa yi anchors, ɛnyɛ nea aba foforo nkutoo, enti sika kotoku no nsɛe wɔ block foforo biara so; na nhaban a hwee nni mu de padding value a wɔakyerɛkyerɛ mu di dwuma. Yɛsan nso yɛɛ nnua abien a ɛwɔ tumi a ɛyɛ fɛ a ɛyɛ abien. Eyi mu biara nsakra nkate no: bɔhyɛ ahorow nhaban, a wɔayɛ no abien abien kosi ntini biako, a asɔremma adanse ntiantiaa wom. Nhomakorabea pɔtee no san ba wɔ protocol asɛm no mu.

---

## 7. Nsɛm a wɔaboaboa ano

- **Merkle dua** bi hashes data kɔ **ahaban**, afei hashes **pairs kɔ soro** kosi sɛ **ntini** biako bɛka.
- Esiane avalanche effect no nti, **ntini no yɛ nsateaa nkyerɛwee a ɛwɔ list no nyinaa mu**: sesa ahaban biako na ntini no sesa. Botae ketewa biako di dataset kɛse bi ho adanse.
- **asɔremma adanse (authentication path)** yɛ anuanom a wɔwɔ foro a ɛkɔ ntini no so no ara kwa, ɛfa **log_2(n)** hashes ho, enti adanseɛ tra hɔ nketenkete mpo ma nhaban ɔpepepem pii.
- Wɔyɛ **wɔ zero-nimdeɛ adanseɛ mu**, saa asɔremma nhwehwɛmu no de *ahaban* a wopɛ sɛ woka no sie, a ɛkyerɛ sɛ "me nkyerɛwde no wɔ dua no mu" a ɛnna nkyerɛwde no anaa ne gyinabea adi.
- Zcash **note commitment dua** yɛ **incremental** Merkle dua a ɛwɔ note commitments, emu dɔ **32**, a ne ntini ne **anchor**; Sapling de **Pedersen** hash no na Orchard de **Sinsemilla** yɛ no.
- Dua no di adanse sɛ **ɛwɔ hɔ**; **nullifier set** a ɛyɛ soronko no siw **double-spends** ano. Wɔn a wɔma wɔtew wɔn ho no ne nea ɛma nkyerɛwde bi awo ne ne wu ntam abusuabɔ te.

---

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| **Merkle dua** | Dua a ɛyɛ hashes; nhaban yɛ data nsateaa nkyerɛwee, awofo hash wɔn mma |
| **Ahaban** | Node bi a ɛwɔ ase; wɔ Zcash mu no, biako note bɔhyɛ |
| **Merkle ntini** | Nsateaa biako a ɛwɔ soro a ɛbɔ dua no nyinaa mua |
| **Agyedie kwan / Merkle adanseɛ** | Onuanom hashes a ehia na wɔde akyerɛ sɛ ahaban bi wɔ dua |
| **Merkle dua a ɛkɔ soro** | Merkle dua a append-only (wɔde nhaban nkutoo na ɛka ho) |
| **Anchor** | Merkle ntini bi a spend ka ho asɛm sɛ "dua tebea a merekyerɛ sɛ ɛne no tia" |
| **Nullifier a wɔahyehyɛ** | Sent-markers a wɔaboaboa ano a ɛtetew mu a esiw sika a wɔsɛe no mmɔho abien |

---

## FAQ

**Dɛn nti na dua na ɛnyɛ hashes list tenten bi kɛkɛ?**
Sɛ wopɛ sɛ wokyerɛw nsɛm a ɛyɛ tratraa a, ɛbɛhyɛ wo ma woada biribiara a wobɛkyerɛw no adi anaasɛ woadi ho dwuma de akyerɛ sɛ woyɛ asɔremma. Dua ma wunya adanse a ne kɛse te sɛ logarithmic ne ntini biako a ɛbɛma woadi nokware.

**So verifier no hia dua no nyinaa?**
Dabi, verifier no hia **root** no nkutoo ne wo authentication kwan tiawa no. Ɛno ne asɛm no nyinaa.

**Dɛn nti na bun 32 pɔtee?**
Ɛde bɛyɛ ɔpepepem anan na ɛkyekyere dua no, a ɛyɛ ti a ɛdɔɔso, bere a ɛma asɔremma ho adanse (ne ne ka a wɔbɔ wɔ ɔmansin no mu) no yɛ kɛse a wɔahyɛ da ayɛ a wotumi di ho dwuma no.

**Sɛ ntini no sesa wɔ nkyerɛwde foforo biara mu a, ɛbɛyɛ dɛn na adanse dedaw no akɔ so ayɛ adwuma?**
Netwɛk no kae mfɛnsere bi a nnansa yi ntini (ankɔre) wom, enti adanse a wɔayɛ atia ankora a akyɛ kakra da so ara di nokware. Protocol asɛm no ma eyi yɛ pɛpɛɛpɛ.

---

### Sɔ wo nkate mu hwɛ

Wɔ yɛn dua a nhaban 4 wom no mu no, fa no sɛ ɔtowhyɛfo bi sesa ahaban wɔ kokoam `C` ma botae soronko nanso ɛmma ntini a wɔatintim no nsakra. Dɛn na ɛnkɔ yiye mma wɔn, na dɛn nti na wontumi nsiesie no komm? *(Mmuae wɔ aseɛ ha.)*

<details><summary>Answer</summary>

Nsakrae a ɛresakra `C` nsakrae ahorow `hC` (avalanche effect), a ɛsakra `hCD = H(hC, hD)`, a ɛsakra `ROOT = H(hAB, hCD)`. Enti ntini a wɔasan asusuw ho no ne ntini a wɔatintim no nhyia bio, na wohu nsakrae no. Sɛ "wosiesie no komm" a, anka ɛho behia sɛ wɔhwehwɛ soronko `C` a ɛde *ade koro no ara* ba. `hC`, a ɛyɛ hash collision, a ɛrentumi nyɛ yiye wɔ Ahyɛde 3. Integrity holds.
</details>

---

### Nea edi hɔ

**Ahyɛdeɛ 5 . Zero-nimdeɛ adanse:** crescendo no. Seesei yɛasi nsɛm a wɔakyerɛw, bɔhyɛ ahorow, ne dua no, na yɛkɔ so ka sɛ "wɔada no adi wɔ nimdeɛ zero mu." Awiei koraa no, Ahyɛde 5 kyerɛkyerɛ sɛnea wubetumi akyerɛ sɛ asɛm bi yɛ nokware, sɛ wo krataa no wɔ dua no mu, sɛ wo nullifier no teɛ, sɛ sika kari pɛ, bere a ɛnda emu biara adi.

*Zcash no fã bi a efi Nnyinasosɛm a Edi Kan *series ma [ZecHub](https://zechub.org). CC BY-SA 4.0 a wɔama ho tumi krataa.*

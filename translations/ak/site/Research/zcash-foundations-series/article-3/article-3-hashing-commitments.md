# Hashing ne Bɔhyɛ ahorow: The Magic Sealed Envelope
##### Mfitiase Nhwehwɛmu a efi [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nkyerɛwee](/content-images/image-15-0c16784b27.webp)

### Sɛnea wobɛto ahintasɛm bi mu wɔ baguam na worentumi nni atoro da

> **Series:** *Zcash fi Nnyinasosɛm a Edi Kan* . **Ahyɛdeɛ 3 . Hashing ne Bɔhyɛ ahorow**
> **Atiefo:** wɔn a wɔaba foforo. Yɛde si [Ahyɛde 1 (finite fields) .](article-1-finite-fields.md) ne [Ahyɛde 2 (elliptic curves) .](article-2-elliptic-curves.md), nanso nkate no gyina n’ankasa so.
> **Nea wobɛgyae:** nteaseɛ a emu da hɔ wɔ hash dwumadie ho, deɛ "hiding" ne "binding" kyerɛ ankasa, ne sɛdeɛ Zcash kyekyere note commitments a ɛkyekyere kokoam akatua biara.

Wɔ [Ahyɛde 0](article-0-shielded-transaction.md) yɛkaa "magic sealed envelope" ho asɛm: biribi a wubetumi de abɔ ɔmanfo board a ɛkyerɛ sɛ envelope bi wɔ hɔ bere a wode nea ɛwɔ mu no asie, na wuntumi nsesa bio akyiri yi da. Yɛhyɛɛ bɔ sɛ yɛbɛkyerɛkyerɛ sɛnea ade a ɛte saa betumi aba mu. Eyi ne saa asɛm no. Yɛhia nneɛma mmienu: **hash functions** ne **commitments**.

---

## 1. Adɛn nti na ɛsɛ sɛ wodwene ho?

Fa no sɛ wohyɛ nea ebefi abatow bi mu aba ho nkɔm na wopɛ sɛ wokyerɛ, *akyi*, sɛ woadi kan afrɛ no. Worentumi mmɔ wo nkɔmhyɛ no ho amanneɛ kɛkɛ (ɛno nya nkurɔfo so nkɛntɛnso, anaasɛ ɛto nsa frɛ sobo ahorow a wosesaa no). Na worentumi mfa nsie koraa (afei wuntumi nkyerɛ sɛ biribiara nkyerɛ akyiri yi).

Nea wopɛ ne ɔkwan a wobɛfa so **atoto botae bi mu mprempren, wɔ baguam, sɛnea ɛbɛyɛ a:**

- obiara ntumi nka nea woto mu (ɛda so ara yɛ kokoam mprempren), na
- akyiri yi, sɛ woda no adi a, wo **ntumi nni atoro** wɔ nea na ɛyɛ ho.

Wɔfrɛ saa "lock now, reveal later, no lying" gadget yi **commitment**, na ɛwɔ baabiara wɔ Zcash. Wɔato krataa bi bo ne ne wura mu wɔ bɔhyɛ bi mu bere a wɔayɛ krataa no. Sɛ yɛbɛkyekyere bɔhyɛ ahorow a, yedi kan hia wɔn adwuma pɔnkɔ: hash dwumadie no.

---

## 2. Intuition: nsateaa a wɔde kyerɛw data

**hash dwumadie** gye data biara koraa, nkyerɛwdeɛ baako anaa nwomakorabea mũ nyinaa, na ɛbubu no kɔ fam kɔ ​​ahama tiawa a ne kɛseɛ yɛ pɛpɛɛpɛ a wɔfrɛ no **digest** anaa **hash**. Fa no sɛ ɛyɛ **nsateaa nkyerɛwee ma data.**

![alt nkyerɛwee](/content-images/image-16-52fdf62c87.webp)

Cryptographic nsateaa nkyerɛwee pa wɔ nneɛma anan. Fa kura wɔn sɛ intuitions, na ɛnyɛ equations:

| Agyapadeɛ | Nkyerɛase a ɛda adi pefee | Nea enti a ɛho hia |
|---|---|---|
| **Nneɛma a wɔde si gyinae** | Saa input koro no ara ma nsateaa nkyerɛwee koro no ara bere nyinaa | Wubetumi asan ahwɛ nsateaa nkyerɛwee bi bere biara |
| **Ntɛmntɛm kɔ anim** | Computing nsateaa nkyerɛwee no yɛ ntɛm | Practical sɛ wode bedi dwuma wɔ baabiara |
| **Ɔkwan biako (preimage resistant)** | Sɛ wode nsateaa nkyerɛwee ma a, worentumi nhu input a ɛmaa ɛyɛɛ | Hides mfitiase data no |
| **Nea ɛko tia nhyiamu** | Worentumi nhu input ahorow abien a ɛwɔ nsateaa nkyerɛwee koro | Obiara ntumi forge match |

Na suban biako bio a ɛkame ayɛ sɛ ɛma nsateaa nkyerɛwee te nka sɛ ɛyɛ anwanwade:

### Avalanche nkɛntɛnso (wɔagye atom) .

Sesa input no denam dodow ketewaa bi so na nsateaa no sesa *koraa*, a ɛne dedaw no nsɛ biara. SHA-256 nsateaa nkyerɛwee ankasa abien a ɛkyerɛ nkrasɛm a ɛsono nkyerɛwde biako ni:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Wɔ hex digits 64 mu no, **59 yɛ soronko.** Nkyerɛwde biako wɔ mu, nsateaa nkyerɛwee a ɛne no nni abusuabɔ koraa fi adi. Eyi nti na wuntumi ntutu input bi nkɔ nsateaa nkyerɛwee a wode asi w'ani so no so: "ɔhyew / awɔw" sɛnkyerɛnne biara nni hɔ a ɛsɛ sɛ wudi akyi.

---

## 3. Efi nsateaa nkyerɛwee so kosi ahofama so

Adwene a ɛsɔ hwɛ nanso abubu ni: sɛ wode wo ho bɛhyɛ kokoam botae bi mu `v`, tintim ne nsateaa nkyerɛwee kɛkɛ `H(v)`.

Eyi *kyekyere* wo fɛfɛɛfɛ (akyiri yi wuntumi nka sɛ ɛyɛ soronko `v`, efisɛ ɛno behia sɛ wɔbɔ wɔn ho wɔn ho). Nanso **entumi nsie.** Sɛ set of possible values ​​no sua a, attacker bi de ne nsateaa kyerɛw obiara a ɔpɛ sɛ ɔyɛ ɔkannifo no ara kwa na ɔde toto ho. Wobɛhyɛ bɔ sɛ "yiw" anaa "dabi"? Wɔ hash abien no nyinaa na ntɛm ara wohu nea wopaw. Determinism, yɛn adamfo bere tiaa bi a atwam ni no, mprempren ɛrepue ahintasɛm no.

Fix no yɛ asɛmfua biako: **randomness.**

> **Abɔhyɛ yɛ nsateaa a ɛkyerɛ wo boɔ a wɔde afrafra random number foforɔ:**
> `commitment = H(v, r)` ɛhe `r` yɛ kokoam random "anifurae" botae.

Afei nso saa ara `v` de ahofama a ɛte sɛ soronko ba bere biara, efisɛ `r` yɛ soronko. Agyapade abien a na yɛpɛ no awiei koraa no abien no nyinaa kura:

![alt nkyerɛwee](/content-images/image-17-3ec4617665.webp)

Sɛ **bue** (da) bɔhyɛ no adi akyiri yi a, wotintim `v` ne `r`; obiara san bu akontaa `H(v, r)` na ɔhwɛ sɛ ɛne no hyia. Wɔato wo mu Ɛno ne nkonyaayi a wɔatoto mu envelope a efi Ahyɛde 0 mu, a wɔayɛ no ankasa.

> **Two takeaways to soa daa:** *binding* fi hash no a ɛyɛ collision resistant; *hiding* fi random blinding factor no mu `r`.

---

## 4. Akwan abien a wɔfa so yɛ envelope no

Nneɛma abien na wɔtaa yɛ, na Zcash de abien no nyinaa di dwuma.

| | **Hash-gyinaso bɔhyɛ** | **Pedersen bɔhyɛ** (efi Ahyɛde 2) |
|---|---|---|
| Nnuan a wɔde yɛ aduan | `H(v, r)` | `v.G + r.H` (ɔtwe adwene si curve bi so) |
| Wɔde wɔn ho sie fi | nea wɔyɛ no random `r` | nea wɔyɛ no random `r` |
| Binding fi | nhyiamu a ɛko tia | afiri a ɛyɛ elliptic-curve (ECDLP) |
| Tumi soronko | ɛnyɛ den na ɛyɛ ntɛmntɛm | bɔhyɛ ahorow no **ka ho** (homomorphic) |

Saa row a etwa to no ne nea enti a Pedersen bɔhyɛ ahorow ho hia kɛse wɔ Zcash mu no. Ɛfiri `commit(v_1) + commit(v_2)` yɛ nea ɛfata `commit(v_1 + v_2)`, akyiri yi protocol no betumi ada no adi sɛ **sika a ɛwɔ mu no yɛ pɛ sika fi mu** denam bɔhyɛ ahorow a wɔde bɛka abom so, ne nyinaa a wɔrenna sika biako mpo adi. Yɛreboaboa saa nokwasɛm no ano ama Ahyɛde 6.

---

## 5. Anifere kwan so a ɛkyerɛ Zcash nyinaa: ZK-adamfofa hashing

Nhumu bi a nnianim nsɛm dodow no ara hwere ni, na ɛyɛ "akontaabu hyia mfiridwuma" asɛm a ɛfata sɛ yɛtwe adwene si so no pɛpɛɛpɛ.

SHA-256 yɛ nsateaa a ɛyɛ fɛ yiye a wɔde yɛ kɔmputa a wɔde di dwuma da biara da. Nanso Zcash nnyɛ *compute* hashes kɛkɛ; ɛsɛ sɛ **da no adi, wɔ zero-nimdeɛ adanseɛ mu, sɛ wɔbuu hash bi yie** (Ahyɛdeɛ 5 kyerɛkyerɛ nea enti a ɛte saa). Na nea ɛkyere no ni: zero-nimdeɛ adanse yɛ adwuma wɔ kasa a ɛne **finite-field arithmetic** (Ahyɛde 1), bere a wɔkyekyee SHA-256 fi bit-twiddling dwumadi ahorow (shifts, ANDs, XORs). Saa bit-twiddling no nyinaa a wɔbɛda no adi wɔ afuw mu akontaabu mu no bo yɛ den kɛse, na ɛma adanse ahorow yɛ akɛse na ɛyɛ brɛoo.

Enti Zcash cryptographers yɛɛ hash functions a ne mu nsɛm yɛ *dedaw* field akontabuo, na ɛmaa ne boɔ yɛ mmerɛw sɛ wɔbɛkyerɛ sɛ:

![alt nkyerɛwee](/content-images/image-18-89ade807ad.webp)

Saa engineering nhyɛsoɔ baako yi, *"ɛsɛ sɛ ɛyɛ mmerɛw sɛ wobɛda no adi,"* ɛno nti na Zcash yɛɛ na ɛfaa hash dwumadie soronko mmom sen sɛ ɛbɛduru SHA-256 wɔ baabiara.

---

## 6. Baabi a eyi te wɔ Zcash

Zcash de hash ahorow adi dwuma wɔ ne nsusuwii ahorow nyinaa mu, na wɔapaw emu biara ama adwuma no:

| Nsusuwii | Hashes a wɔde di dwuma | Ɛhe na |
|---|---|---|
| **Sprout** (a edi kan koraa) | **SHA-256** na ɛyɛ adwuma | Hyɛ bɔhyɛ ahorow ne dua no nsow |
| **Sapling** | **Pedersen hashes**, plus **BLAKE2** | Pedersen for note commitments and the Merkle tree; BLAKE2 for key derivation and nullifiers |
| **Orchard** (current) | **Sinsemilla**, plus **Poseidon** | Sinsemilla for note commitments and the Merkle tree; Poseidon for the nullifier, all designed for arithmetic circuits |

Edin a ɛsɛ sɛ wohu ne **Pedersen** ne **Sinsemilla** (commitment-style hashes a wɔasisi afi curve points, enti wonya "adds up" superpower no agyapade na ɛda adi sɛ ne bo nyɛ den) ne **Poseidon** (field-arithmetic hash a wɔde atirimpɔw ayɛ ama zero-knowledge circuits). Bere a Ahyɛde 0 kae sɛ wɔasɔ krataa bi mu nsɛm ano ayɛ no bɔhyɛ a, *eyi* ne mfiri a ɛreyɛ nsɔano no.

Enti open loop a efi Ahyɛde 0, *"ɛbɛyɛ dɛn na envelope a wɔatoto mu atumi de emu nsɛm asie nanso ɛrentumi nyɛ yiye sɛ wɔbɛyɛ?"*, mprempren wɔato mu: **hiding from a random blinding factor, binding from collision resistance or the curve trapdoor.**

---

## 7. Nokwaredi mu asɛm a wɔka sɛ wɔmfa wɔn ho nhyɛ mu

Yɛyɛɛ no ​​mmerɛw sɛnea ɛbɛyɛ a nneɛma mu daa hɔ. Ahofama nhyehyɛe ankasa kyerɛ ɔkwan pɔtee a wɔbɛyɛ `v` ne `r` wɔde encoded na generators bɛn na wɔde di dwuma; "hiding" ne "binding" biara ba wɔ flavors (perfect vs computational) a ahobammɔ nkyerɛase pɔtee; na yɛankyerɛ Pedersen, Sinsemilla, anaa Poseidon mu nsɛm. Ɛno mu biara nsakra nkate no: ahofama yɛ nsateaa nkyerɛwee a wɔde ka ho a ɛyɛ randomness a ɛhintaw mprempren na ɛkyekyere daa. Nsɛm no san ba, wɔde frankaa ahyɛ mu, bere a protocol asɛm no hia no.

---

## 8. Nsɛm a wɔaboaboa ano

- **hash dwumadie** yɛ **nsateaa nkyerɛwee ma data**: deterministic, ɛkɔ anim ntɛmntɛm, ɔkwan baako so, ɛko tia nhyiamu, a ɛwɔ **avalanche effect** (bit baako wɔ mu, nsateaa nkyerɛwee soronko koraa a ɛfiri mu).
- **bɔhyɛ** ma wo **tow botae bi mu wɔ baguam mprempren na woda no adi akyiri yi a wuntumi nni atoro.**
- Nsateaa a ɛda hɔ kwa a wotintim `H(v)` kyekyere nanso **ɛnyɛ** hinta. Sɛ wode ade a ɛma ani fura random ka ho a, . `H(v, r)`, siesie sɛ: **hiding from `r`, a ɛkyekyere fi nhyiam a ɛko tia.**
- Zcash de **hash-based** ne **Pedersen** bɔhyɛ nyinaa di dwuma; Pedersen bɔhyɛ ahorow de ka ho **add up**, a Ahyɛde 6 no de bedi dwuma de akyerɛ sɛ bo a ɛsom kari pɛ wɔ kokoam.
- Esiane sɛ ɛsɛ sɛ hashes **da no adi** wɔ zero-nimdeɛ adanse mu nti, Zcash de **ZK-adamfofa** hashes a wɔasisi afi afuw mu akontaabu (**Pedersen**, **Sinsemilla**, **Poseidon**) mu di dwuma sen sɛ wɔde SHA-256 bedi dwuma wɔ baabiara.

---

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| **Hash dwumadie** | Crushes data biara ma ɛyɛ fixed-size nsateaa nkyerɛwee tiawa (digest) |
| **Digest** | Nsateaa a ɛfiri hash dwumadie bi mu |
| **Preimage a wɔko tia** | Entumi nsan digest bi nsan nkɔ ne input (ɔkwan biako so) |
| **Nneɛma a ɛbɔ ho ban** | Wontumi nnya input abien a ɛwɔ digest koro |
| **Avalanche nkɛntɛnso** | Nsakrae ketewaa bi a ɛba input mu sesa digest |
| **Ahofama** | Lock a value now, da no adi akyiri yi, ntumi nni atoro wɔ ho |
| **Ade a ɛma anifurae (`r`)** | Random number a ɛyɛ foforo a ɛma bɔhyɛ bi sie |
| **ZK-adamfofa hash** | Hash a wɔasisi afi field akontabuo mu enti ɛyɛ cheap sɛ wobɛkyerɛ sɛ |

---

## FAQ

**Dɛn nti na wonnyɛ encrypt value no kɛkɛ sen sɛ wode wo ho bɛhyɛ mu?**
Encryption fa *ahintasɛm a akyiri yi wobɛtumi decrypt* ho. Ahyɛde bi fa *binding* ho: guarantee a ɛkyerɛ sɛ worentumi nsakra wo mmuae akyiri yi. Nnwuma ahorow.

**Sɛ bɔhyɛ ahorow de bo a ɛsom no sie a, ɛbɛyɛ dɛn na obi ahwɛ mmara no?**
Ɛno ne dwumadie a adanseɛ a nimdeɛ nnim di (Ahyɛdeɛ 5): wɔda no adi sɛ boɔ a ahintaw no di mmara no so a ɛnda no adi.

**So SHA-256 abubu, efisɛ Zcash kwati wɔ mmeae bi?**
Dabi SHA-256 ye na Zcash da so ara de di dwuma. Ɛyɛ den kɛkɛ sɛ *ɛda no adi wɔ circuit bi mu*, ɛno nti na ZK-adamfofa hashes wɔ hɔ ma saa adwuma pɔtee no.

**Ɛhe na random no yɛ `r` fi, na hena na ɔkora so?**
Ɛyɛ generated freshly bere a wɔabɔ note no na note no wura nim no. Ɛyɛ nea ɛma nkyerɛwde biara yɛ soronko na ɛyɛ kokoam de no fã.

---

### Sɔ wo nkate mu hwɛ

Wode wo ho to wo abatow ho nkɔmhyɛ so sɛ `H(v, r)` na wotintim. W’adamfo bi si so dua sɛ ɛsɛ sɛ wutintim pɛpɛɛpɛ `H(v)` sɛnea ɛbɛyɛ a ɛbɛyɛ mmerɛw. Wɔ kasamu biako mu no, dɛn nti na ɛno yɛ adwene bɔne sɛ nneɛma abien pɛ na ebetumi afi mu aba a? *(Mmuae wɔ aseɛ ha.)*

<details><summary>Answer</summary>

Sɛ nneɛma abien pɛ na efi mu ba a, w’adamfo no betumi ayɛ akontaabu kɛkɛ `H("win")` ne `H("lose")` wɔn ankasa na wɔde toto wo digest a wɔatintim no ho, na wosua wo nkɔmhyɛ no ntɛm ara. Hash a ɛda hɔ kwa no kyekyere nanso ɛnhintaw; nea wɔyɛ no random `r` ne nea ɛma saa ntua a wɔde susuw nneɛma ho yi gyae.
</details>

---

### Nea edi hɔ

**Ahyɛdeɛ 4 . Merkle nnua:** seesei yɛwɔ bɔhyɛ ɔpepem pii a ɛreboaboa ano. Ahyɛdeɛ 4 kyerɛ sɛdeɛ Zcash hyehyɛ wɔn ma wɔyɛ dua baako a ne ntini nsateaa nkyerɛwee ketewa no gyina hɔ ma abakɔsɛm no nyinaa, ne sɛdeɛ wobɛtumi akyerɛ sɛ wo nsɛm a woakyerɛw no wɔ saa dua no mu a worenkyerɛ nea ɛwɔ he. Ɛno ne Ahyɛde 0 "ɔmanfo board" no nsusuwii ankasa.

*Zcash no fã bi a efi Nnyinasosɛm a Edi Kan *series ma [ZecHub](https://zechub.org). CC BY-SA 4.0 a wɔama ho tumi krataa.*

# The Shielded Protocol, Awiei kosi Awiei
##### Mfitiase Nhwehwɛmu a efi [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nkyerɛwee](image-27.png)

### Aboaboa afã biara ano ayɛ no kokoam Zcash asɛm biako

> **Series:** *Zcash fi Nnyinasosɛm a Edi Kan* . **Ahyɛdeɛ 6 . Protocol a Wɔabɔ ho Ban** (awiei) .
> **Atiefoɔ:** wɔn a wɔaba foforɔ a wɔakenkan Asɛm 0 kɔsi 5. Ɛha na biribiara di nkitaho.
> **Nea wubegyaw ne:** adwene mu nhwɛso a edi mũ, ɛteɛ a ɛfa Zcash asɛm a wɔabɔ ho ban ho, a adwene biara a efi ntoatoaso no mu wɔ ne beae a ɛfata, na wɔato loop biara a efi Ahyɛde 0 mu.

Yɛhyɛɛ aseɛ, wɔ [Ahyɛdeɛ 0](article-0-shielded-transaction.md), a abirabɔsɛm ne asɛm bi a ɛfa nkrataa a wɔatoto mu ho wɔ ɔmanfo kyerɛwpon bi so. Afei yɛde nsɛm anum yɛɛ afã horow no: afuw a ɛwɔ anohyeto, elliptic curves, commitments, Merkle nnua, ne zero-knowledge proofs. Seesei yɛka wɔn bom na yɛhwɛ kokoam sikatua adwuma ankasa, fi ase kosi awiei.

---

## 1. Adɛn nti na ɛsɛ sɛ wodwene ho?

Ankorankoro, afã biara a woasua no yɛ anifere. Nanso *magic* a ɛwɔ Zcash mu no wɔ sɛnea wɔde wɔn ho hyɛ mu no mu. Nullifier nkutoo mma kokoam nsɛm. Ahofama nkutoo nsiw atoro kwan. Adanse nkutoo nkyerɛ sɛ mfaso biara nni so. Ɛyɛ **assembly** a ɛdan nneɛma anum ma ɛbɛyɛ sika a bere koro mu no ɛyɛ kokoam na wotumi de ho to so.

Asɛm yi ne nhyiam no. Ɛduru awieeɛ no, kasamu *"network no di asɛm bi a ɛntumi nhunu ho adanseɛ"* no rente nka sɛ ɛnyɛ abirabɔ na mmom ɛte sɛ nea ɛda adi pefee a ɛfiri afã ahodoɔ a woate aseɛ dedaw mu aba.

---

## 2. Cast no, wɔasan aboaboa ano

Nsɛm a ɛtoatoa so no nyinaa wɔ kratafa biako so, a wɔayɛ ho mfonini afi Ahyɛde 0 asɛm no so akɔ mfiri ankasa no so ni.

| Ahyɛdeɛ 0 asɛm element | Ankasa afã | Wɔkyekyee no fii |
|---|---|---|
| Sika a ɛwɔ envelope mu | **Hyɛ no nsow** (botae, nea ogye, randomness) | encoded sɛ afuw mu nneɛma (Art 1) |
| Na wɔatoto opaque envelope no mu | **Hyɛ ahofama nsow** | Pedersen / Sinsemilla ahofama (Adwini 2, 3) |
| Ɔmanfoɔ board no | **Hyɛ ahofama dua nsow** (ankora = ne ntini) | Merkle dua a ɛkɔ soro (Art 4) |
| Na void token no | **Nnuruyɛfoɔ** | a ZK-adamfofa hash of note + kokoam safoa (Art 2, 3) |
| "Sika a ɛwɔ mu no yɛ pɛ sika a efi mu" | **Boɔ a wɔde ahyɛ bɔ + sika a ɛkari pɛ nhwehwɛmu** | homomorphic Pedersen bɔhyɛ ahorow (Art 2, 3) |
| Ntama no akyi nkonyaayi | **Zero-nimdeɛ adanseɛ** | zk-SNARK wɔ akontabuo kwansin bi so (Art 5) |
| "Wo nko ara na wobɛtumi akenkan wo envelope" | **Encrypted note + hwɛ safe** | encryption + key hierarchy (asɛm yi) |

---

## 3. Baabi a nsafe fi ba

Biribiara a obi a ɔde di dwuma betumi ayɛ no sen fi ahintasɛm biako mu, **spending key**, fa ɔkwan biako so nhyehyɛe so (agyan biara yɛ nea efi mu ba a wontumi nsakra, afiri apon a ɛwɔ Ahyɛde 2 ne 3 no adom):

![alt nkyerɛwee](image-32.png)

Nneɛma abien a ɛfata sɛ yɛhyɛ no nsow, nea afi nsɛm a atwam mu aba abien no nyinaa:

- Mpaapaemu no ma wotumi de **hwɛ safoa** (ka sɛ, ma akontaabufo) a ɛda wo nnwuma adi **a** womma** tumi a wode bɛsɛe sika. Kokoam nsɛm yɛ nea wɔpaw, ɛnyɛ ne nyinaa anaa biribiara.
- Derivation biara yɛ **ɔkwan baako**: hwɛ safe a wokura no mma obiara nnya sika a wɔsɛe no safe no da, elliptic-curve trapdoor a efi Ahyɛde 2 mu no pɛpɛɛpɛ na ɛreyɛ n’adwuma.

---

## 4. Sɛ wode krataa bi di dwuma: nsɛm anan no

Sɛ wopɛ sɛ wode krataa bi di dwuma wɔ kokoam a, ɛsɛ sɛ woma network no gye nneɛma anan di prɛko pɛ **a worenda nkyerɛwde no, ne bo, ne gyinabea, anaa wo nipasu adi.** Wɔnam ade bi a wunim dedaw so na ɛma nea wɔka biara di ho dwuma.

![alt nkyerɛwee](image-31.png)

Adanse no da nokwasɛm ahorow a ɛwɔ ase no mu biara adi **biara** (kyerɛwtohɔ bɛn, hena safoa, bo bɛn). Ɛda no adi nko ara sɛ *nsɛm anan a wɔka no nyinaa kura.* Ɛno ne Zcash a wɔabɔ ho ban no anifere nyinaa, a wɔaka ho asɛm wɔ mfonini biako mu.

---

## 5. Botae-kari pɛ afiri (akatua a yɛde sie) .

San kɔ Ahyɛdeɛ 2 ne 3 mu no yɛhyɛɛ no ​​nsow sɛ Pedersen bɔhyɛ ahodoɔ **ka ho**: bɔhyɛ a ɛfa `v_1` ne bɔhyɛ a ɛne sɛ `v_2` yɛ bɔhyɛ a wɔde ma sɛ `v_1 + v_2`. Ɛha na ɛno sow aba.

Nkyerɛwde biara a wɔde hyɛ mu ne nea wɔde fi mu no kura **botae bɔhyɛ**: Pedersen bɔhyɛ `v.G + r.H` ɛno de ne dodow sie `v`. Esiane sɛ eyinom de ka ho nti, network no betumi ayɛ akontaabu:

```
(sum of input value commitments) − (sum of output value commitments)
```

Sɛ asɛm no kari pɛ (wɔmmɔ sika biara anaasɛ wɔansɛe no) a,... `v` afã horow no twa mu pɛpɛɛpɛ, na ɛka bɔhyɛ nkutoo a ɛne **zero value**, a randomness a aka no ani afura. Nea ɔde kɔma no di adanse sɛ wonim saa randomness a aka no denam nsaano nkyerɛwee ketewaa bi a wɔfrɛ no **binding signature a wɔyɛ so.** Binding signature a ɛfata betumi aba bere a gyinapɛn ahorow no kari pɛ ankasa nkutoo, **nanso wɔanna dodow biako mpo adi.**

> Eyi ne mfatoho a ɛho tew sen biara wɔ *nea enti* a na yehia homomorphic, curve-based commitments a ɛtoatoa so no nyinaa mu. Wɔde "sika a ɛwɔ mu yɛ pɛ sika fi mu" mmara no di dwuma denam **a wɔde envelopes a wɔatoto mu ka ho** na wɔhwɛ sɛ nea efi mu ba no nsɔano no kɔ zero.

---

## 6. Aguadi a edi mũ, a wɔhwɛ no awiei kosi awiei

Momma yɛnboaboa Alice a ɔretua Bob ka no ano. Yɛde Sapling "spend side / output side" nhyehyeɛ a ɛda adi pefee no bedi dwuma sɛ nkyerɛkyerɛ nhwɛsoɔ.

**Aguadi a wɔabɔ ho ban no boa nkyerɛkyerɛmu ahorow abien:**

| Spend description (di krataa bi) | Output nkyerɛkyerɛmu (ɛbɔ nkyerɛwde) |
|---|---|
| value commitment a ɛwɔ input no mu | value commitment a ɛwɔ output no mu |
| **anchor** a ɛda no adi tia (dua ntini bi) | **note commitment** foforo no (ahaban foforo) |
| **nullifier** a ɛwɔ nkyerɛwde a wɔasɛe no mu | **bere tiaa mu safoa** a wɔde yɛ encryption |
| ɔmanfo safoa a wɔasan ayɛ no random + sika a wɔde di dwuma ho tumi krataa nsaano nkyerɛwee | **nkyerɛwde a wɔabɔ no kokoam** (ciphertext ma nea ogye no) |
| **zk-SNARK** a ɛkyerɛ sɛ nsɛm anan no yɛ nokware | a **zk-SNARK** a ɛkyerɛ sɛ nea efi mu ba no yɛ nea wɔahyehyɛ no yiye |

Plus baako **binding signature** wɔ bundle no nyinaa so, hyɛ value balance (Ɔfa 5).

![alt nkyerɛwee](image-30.png)

Trace the privacy: network no hwɛɛ anchor no, hwɛɛ sɛ nullifier no yɛ foforo, hwɛɛ sɛ adanse no yɛ nokware, na ɛkyerɛɛ sɛ ɛkari pɛ. Ɛgyee sikatua a ɛfata **a ensuaa sika biara, address biara, na ɛnyɛ krataa ko a wɔsɛee no.** Saa bere yi nyinaa krataa a wɔasɛe no no **nullifier** (ne wu) ne Bob **bɔhyɛ foforo** (ne krataa no awo) te ɔmanfo nhyehyɛe ahorow abien mu a abusuabɔ biara a wotumi hu biara nni wɔn ntam, abusuabɔ a wɔatwa afi Ahyɛde 0 no mu.

---

## 7. Loop biara a wɔbɛto mu afiri Ahyɛdeɛ 0

Ahyɛde 0 hyɛɛ da buee nsɛmmisa ano. Wɔn nyinaa ni, wɔato mu.

| Loop buee wɔ Ahyɛdeɛ 0 | Wɔatoto mu denam |
|---|---|
| Ɔkwan bɛn so na wobetumi ayɛ krataa a wɔde kotoku a wɔatoto mu nanso wontumi nwene? | Bɔhyɛ ahorow: hintaw fi randomness, binding fi collision resistance / the curve trapdoor (Art 3) |
| Ɛhe na nsafe ne kokoam aduannoa ho nyansahyɛ ahorow fi? | Field akontabuo ne elliptic-curve scalar dodoɔ (Art 1, 2) |
| Dɛn ankasa ne "board" no? | Merkle dua a ɛkɔ soro a ɛyɛ bɔhyɛ ahorow a wɔahyɛ no nsow; ne ntini ne ankora (Art 4) |
| Dɛn nti na wontumi mfa void token no bata ne envelope no ho? | Nullifier no yɛ keyed hash a wɔde asie wɔ set soronko bi mu fi commitments (Art 2, 3, 4) |
| Wobɛyɛ dɛn akyerɛ sɛ ɛyɛ nokware bere a wonda biribiara adi no? | zk-SNARK a ɛwɔ akontabuo kwansin a ɛkyerɛw nsɛm anan no nyinaa so (Art 5) |
| Ɔkwan bɛn so na nea ogye no hu sɛ wotua wɔn ka? | Wɔde nkyerɛwde no ahyɛ wɔn address so; wɔde safoa a wɔde hwɛ ade (asɛm yi) |
| Ɔkwan bɛn so na wɔhyɛ "sika a wɔde hyɛ mu = sika a wɔde fi mu" no mu den wɔ kokoam? | Homomorphic botaeɛ bɔhyɛ + nsaano nkyerɛwee a ɛkyekyere (Sec 5) |

Abirabɔsɛm a efi kratafa biako, *hwɛ nea wuntumi nhu no mu nokware* no, mprempren wɔagyae koraa. Netwɛk no di **nsɛm a wɔka fa data a ahintaw ho** ho adanse, ɛnyɛ data no ankasa da.

---

## 8. Sapling vs Orchard, wɔ ahome biako mu

Yɛde Sapling nhyehyɛe na ɛkyerɛkyerɛɛ efisɛ ne mpaapaemu no da adi pefee sen biara. Mprempren nhyehyɛe, **Orchard**, siesie mmom sen sɛ ɛbɛsesa saa nsusuwii ahorow yi:

| | **Sapling** | **Orchard** |
|---|---|---|
| Nkitahodi kuw | tetew **Spend** ne **Output** nkyerɛkyerɛmu | unified **Nneyɛe** (biara yɛ biako sɛe + biako output) |
| Adanse nhyehyɛe | **Groth16** (nhyehyɛe a wotumi de ho to so) | **Halo 2** (nhyehyɛe biara nni hɔ a wotumi de ho to so) |
| Nkyerεkyerεmu | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) a wɔde yɛ aduan |
| Ahofama hash | Pedersen a ɔyɛ | Sinsemilla |

Adwene biara a ɛwɔ asɛm yi mu no kɔ so tẽẽ; Orchard titiriw bundles spend-and-output bom na sesa wɔ adanse nhyehyɛe a guasodeyɛ biara nni mu. Adum anum no nsakrae.

---

## 9. Nokware mu asɛm a wɔka sɛ wɔmfa wɔn ho nhyɛ mu

Eyi ne mfonini a edi mũ sen biara wɔ nsɛm a ɛtoatoa so no mu, nanso ɛda so ara yɛ nhwɛsode. Yɛde nsɛm a wɔakyerɛw no afuw mu encodings pɔtee, key-derivation formulas a ɛyɛ pɛpɛɛpɛ, spend keys a wɔsan yɛ no randomization, address ahorow, memo fields, fee a wɔde di dwuma, nsonsonoe a ɛda value commitments ne note commitments ntam no mu kɔ akyiri koraa, ne dwuma pɔtee a signature biara di. Yɛde canonical flow biako nso mae; nnwuma ankasa betumi de sika a wɔsɛe no ne nneɛma pii a wɔyɛ prɛko pɛ na ebetumi afrafra afã horow a ɛda adi pefee ne nea wɔabɔ ho ban. Fibea a ɛwɔ tumi ne Zcash Protocol Specification. Nea wokura mu mprempren no ne nsusuwii a ɛfata; nkyerɛkyerɛmu no hyɛ susudua biara ma.

---

## 10. Nsɛm a wɔaboaboa ano

- Adwuma a wɔabɔ ho ban no ka nneɛma anum no nyinaa bom: **note** (botae no), ne **bɔhyɛ** a ɛwɔ **note commitment dua** no mu, **nullifier** a ɛbɛma wɔasiw sika a wɔsɛe no mmɔho abien, **botae bɔhyɛ** ma ɛkari pɛ, ne **zk-SNARK** a ɛkyekyere ne nyinaa bom.
- Sika a wɔsɛe no di adanse sɛ **nsɛm anan a wɔka prɛko pɛ**, nkyerɛwde no wɔ hɔ, wɔama wo tumi, ne nullifier no teɛ, na bo a ɛkari pɛ, wɔ **nimdeɛ zero** mu, ɛnda nokwasɛm a ɛwɔ ase no mu biara adi.
- **Wɔde boɔ a ɛkari pɛ** di dwuma denam **homomorphic commitments a wɔde bɛka ho** na wɔahwɛ sɛ wɔasɔ ano akɔ zero, denam **binding signature** so, a wɔankyerɛ sika dodoɔ biara.
- Ɔdefoɔ tumi sene firi **spending key** baako so fa **one-way hierarchy** so, ɛma **viewing keys** a ɛda adi a ɛmma spend tumi.
- Netwɛk no **hwɛ sɛ nsɛm a wɔka fa data a ahintaw ho** yɛ nokware, na ɛpopa verify-vs-privacy paradox no fi Ahyɛde 0. Loop biara a wɔabue wɔ hɔ no, mprempren wɔato mu.
- **Orchard** siesie **Sapling** (Nneyɛe a wɔaka abom, Halo 2 a enni nhyehyɛe a wogye di, Pasta curves, Sinsemilla) a ɛnsakra adum anum no.

---

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| **Spending key** | Ntini biako ahintasɛm a ɔdefo safe nyinaa fi mu |
| **Hwɛ safoa** | Da wo nnwuma adi kyerɛ obi a ɔwɔ bi a ɔmma wɔmfa |
| **Spend nkyerɛkyerɛmu** | Tx fã a ɛdi nkyerɛwde bi (nullifier, anchor, proof) |
| **Output nkyerɛkyerɛmu** | Tx fã a ɛma nkyerɛwde (commitment, ciphertext, proof) |
| **Action (Orchard)** | A unified unit doing one spend and one output together |
| **Boɔ a ɛsom boɔ ho bɔhyɛ** | A homomorphic Pedersen bɔhyɛ a ɛfa sika bi ho |
| **Nsaano nkyerɛwee a ɛkyekyere** | Nsaano nkyerɛwee a ɛkyerɛ sɛ gyinapɛn ahorow kari pɛ a ɛnda no adi |
| **Anchor** | Dua ntini a spend di asɔremma ho adanse tia |
| **Asɔhwɛ decryption** | Obi a ogye no resɔ bɔhyɛ foforo ahwɛ de ahwehwɛ nsɛm a wɔakyerɛw a wɔahyɛ da ayɛ ama wɔn |

---

## FAQ

**So network no hu sika no da anaasɛ hena na otuaa hena?**
Dabi, ɛkyerɛ sɛ adanse no yɛ nokware, sɛnea nullifier no yɛ foforo, ankora no, ne nsaano nkyerɛwee a ɛkyekyere no. Kokoam gyinapɛn ahorow nyinaa tra hɔ ahintaw.

**Dɛn na esiw me kwan sɛ mɛsɛe krataa bi mprenu?**
Nea ɛyɛ nullifier no. Sika a wɔsɛe no tintim no; network no pow nullifier biara a ɛwɔ nullifier set no mu dedaw. Nkyerɛwde koro no ara ma wonya nullifier koro no ara bere nyinaa.

**Sɛ wɔde sika a wɔde asie a, ɛbɛyɛ dɛn na wɔatumi ahwɛ sika a aka no?**
Botae ho bɔhyɛ ahorow no ka bom wɔ ɔkwan a ɛne ne ho di nsɛ so; asɛm a ɛkari pɛ no bɔhyɛ ahorow twa mu kɔ bɔhyɛ a ɛyɛ zero, a nsaano nkyerɛwee a ɛkyekyere no di ho adanse.

**So metumi adi me nnwuma ho adanse akyerɛ akontaabufo a mempae tumidi mu?**
Aane. Fa safe a wode hwɛ nneɛma ma. Ɛda wo dwumadi a wɔabɔ ho ban no adi nanso entumi mma sika a wɔsɛe no ho kwan, esiane ɔkwan biako so safoa nhyehyɛe no nti.

**So Sapling ayɛ dedaw mprempren a Orchard wɔ hɔ no?**
Wɔn baanu nyinaa atra hɔ wɔ nkitahodi nhyehyɛe no so; Orchard ne mprempren nhyehyɛe no. Wɔkyɛ nsusuwii ahorow no, enti sɛ wote biako ase a, ɛma wunya foforo.

---

### Sɔ wo nkate mu hwɛ

M’adamfo bi ka sɛ: "Esiane sɛ adanse no de sika dodow no sie nti, owifo betumi aka kɛkɛ sɛ wɔn nneɛma a wɔyɛ no bo yɛ den sen nea wɔde hyɛ mu na watintim sika a wontua hwee." Fa Ɔfa 5 kyerɛkyerɛ nea enti a eyi di nkogu no mu wɔ kasamu abien mu. *(Mmuae wɔ aseɛ ha.)*

<details><summary>Answer</summary>

Wɔde sika dodoɔ no asie, nanso wɔde homomorphic value commitment abɔ emu biara mu, na network no de input commitment nyinaa ka ho na ɛyi output commitment nyinaa fi mu; sɛ gyinapɛn ahorow a ahintaw no ankari pɛ a, nea ebefi mu aba no rensɔw ano nkɔ zero na **wɔrentumi nyɛ nsaano nkyerɛwee a ɛfata biara a ɛkyekyere.** Owifo no betumi de *dodow a ɛkari pɛ* asie, nanso ontumi mma gyinapɛn ahorow a ɛnkari pɛ no ntwam wɔ sika a ɛkari pɛ no mu, enti sika a wontua hwee a wobetintim no ntumi nyɛ yiye a wonda biribiara adi nanso akontaabu no da so ara kyere.
</details>

---

### Nsɛm a ɛtoatoa so no, awie

Seesei woatu kwan afi abirabɔsɛm biako mu akɔ kokoam sikatua a edi mũ so:

![alt nkyerɛwee](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


Efi ha, abɔde mu arc a edi hɔ no kɔ akyiri: Groth16 ne Halo 2 mu adwumayɛ, ahotoso-nsiesie guasodeyɛ, Sapling ne Orchard amansin no kɔ akyiri, key derivation ne address ahorow ahorow, ne protocol no nkɔso wɔ network upgrades nyinaa mu. Nanso fapem no wɔ hɔ mprempren, na saa nsɛmti no mu biara wɔ ofie a ɔde bata ho.

*Zcash no fã bi a efi Nnyinasosɛm a Edi Kan *series ma [ZecHub](https://zechub.org). CC BY-SA 4.0 a wɔama ho tumi krataa.*

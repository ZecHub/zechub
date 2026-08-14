# Adanse a Nimdeɛ Nni Mu: Sɛ Wobɛkyerɛ sɛ Wo Teɛ a Worenka Nea Enti a Enti
##### Mfitiase Nhwehwɛmu a efi [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nkyerɛwee](/content-images/image-23-71534bece9.webp)

### Ntama a ɛma wiase no di nea entumi nhu da no ho adanse

> **Series:** *Zcash fi Nnyinasosɛm a Edi Kan* . **Ahyɛdeɛ 5 . Zero-Nimdeɛ Adanse**
> **Atiefo:** wɔn a wɔaba foforo. Yɛtwe adwene si asɛm biara a atwam so (finite fields, curves, commitments, Merkle trees), nanso wɔkae adwene biara sɛnea yehia.
> **Nea wobɛgyae:** nteaseɛ a ɛyɛ mmerɛw, a ɛteɛ wɔ deɛ ɛyɛ zero-nimdeɛ adanseɛ, awerɛhyɛmu mmiɛnsa a ɛde ma, sɛdeɛ nsɛm a wɔka no kwa no nya adanseɛ, ne deɛ ɛma Zcash Sapling ne Orchard tumi.

Eyi ne asɛm a nsɛm a ɛtoatoa so no nyinaa aforo akɔ so. Efi [Ahyɛde 0](article-0-shielded-transaction.md) kɔ so yɛkɔɔ so kae sɛ wɔagye sikatua bi atom "wɔ ntama akyi," a wɔada no adi sɛ ɛteɛ bere a ɛda biribiara adi no. Adanse a nimdeɛ nnim ne saa ntama no. Ɛyɛ asinasin a awiei koraa no esiesie abirabɔ a yɛde buee ano no: *ɛbɛyɛ dɛn na ɔmanfo atumi ahwɛ sɛ asɛm bi a wɔmma wɔn kwan sɛ wonhu no yɛ nokware?*

---

## 1. Adɛn nti na ɛsɛ sɛ wodwene ho?

Kae abirabɔ a ɛwɔ Zcash koma mu no:

- Blockchain yɛ nea wotumi de ho to so efisɛ ɛyɛ **wotumi di ho adanse wɔ baguam**.
- Zcash sikatua yɛ **kokoam koraa**: sika dodow, nea ɔde kɔmaa, nea ogye, ne nyinaa ahintaw.

Eyinom te sɛ nea ɛne wɔn ho wɔn ho nhyia. Ɛte sɛ nea verification *hwehwɛ* sɛ wohwɛ. Privacy *bara* sɛ wobɛhwɛ. Sɛ woantumi ansiesie wɔn ntam a, wuntumi nnya kokoam sika a obiara de ne ho to so.

**nnimdeɛ a enni adanseɛ (ZKP)** ne mpata no. Ɛma **ɔhwɛfoɔ** bi gye **ɔhwɛfoɔ** gye di sɛ asɛm bi yɛ nokware **a ɛnna biribiara adi nsen nokwasɛm a ɛyɛ sɛ ɛyɛ nokware.** Sika dodoɔ biara nni hɔ. Nnipa a wɔde wɔn ho hyɛ mu biara nni hɔ. Nkyerɛwde biara nni hɔ. Kɛkɛ: *"biribiara a ɛwɔ ha no di mmara so."* Momma yɛnkyekye intuition no ansa na mfiri biara aba.

---

## 2. Intuition: adanse abiɛsa a ɛwɔ hɔ da biara da

**Adanse a ɛkyerɛ sɛ wunim password, a wonka.** Wɛbsaet bi betumi ahwɛ sɛ wunim wo password denam hwɛ a ɔbɛhwɛ sɛ wubue biribi a password no nkutoo na ɛbue mu, a ɛrenhu password no ankasa da. Woda *nimdeɛ* adi a *wonna ho adi*.

**Aadamfo a n’ani afura kɔla ne bɔɔl abien.** Wokura bɔɔl kɔkɔɔ ne bɔɔl a ɛyɛ ahabammono a ɛte sɛ w’adamfo a n’ani afura kɔla no yɛ pɛ. Wopɛ sɛ wogye no di sɛ wɔyɛ *kɔla ahorow* a worenkyerɛ no nea ɛyɛ nea ɛwɔ he. Ɔde abien no nyinaa sie n’akyi, sɛ ɔpɛ sɛ ɔsesa, na ɔkyerɛ wo biako. Woka sɛ ebia ɔsesaa ne ho anaa. Sɛ ɛsono bɔɔl no ankasa a, na woteɛ bere nyinaa. Sɛ wɔyɛ pɛ a, anka wobɛsusu sɛ, bere no fã pɛ. Bere a woabɔ bɔɔl 20 akyi no, wo streak a ensɛee no ma ogye di sɛ ɛsono wɔn, nanso onhu bɔɔl a ɛyɛ kɔkɔɔ da. **Ɔgye nokwasɛm bi di bere a onsua biribi foforo biara.** Ɛno yɛ nimdeɛ zero wɔ miniature mu.

**Ɔbodan no.** Ɔbodan bi a ɛte sɛ nkaa wɔ nkonyaayi pon bi wɔ akyi a wɔde kokoam asɛmfua bi nkutoo na ebue. Woka sɛ wunim asɛmfua no. Sɛnea ɛbɛyɛ a wobɛda no adi a worenda no adi no: obi a ɔhwɛ nneɛma so twɛn wɔ abɔnten bere a worekɔ mu no na wopaw benkum anaa nifa kwan no kwa. Afei verifier no teɛm sɛ ɔfã bɛn na wɔpɛ sɛ wufi *fi* ba. Sɛ wunim asɛmfua no ampa a, wubetumi adi so bere nyinaa (sɛ ɛho hia a, wubetumi abue ɔpon no de asesa afã horow). Sɛ woreyɛ bluff a, wobɛtumi apue wɔ nifa so nko ara denam luck so, 50/50 round biara. Tia mu mpɛn 20 na hokwan a obi wɔ sɛ obenya nkwa no nnu ɔpepem biako biara mu biako.

Saa ɔbodan mu asɛm no da **ahyɛde abiɛsa** a ɛsɛ sɛ adanse biara a wonni nimdeɛ biara de ma no adi komm.

---

## 3. Ahyɛde abiɛsa no

![alt nkyerɛwee](/content-images/image-24-b559d31849.webp)

| Guarantee a wɔde ma | Wɔ ɔbodan mu asɛm | Wɔ Zcash mu |
|---|---|---|
| **Nea edi mũ** | Sɛ wunim asɛmfua no a, bere nyinaa wufi nifa so | Aguadi a ɛfata de adanse a wogye tom ba bere nyinaa |
| **Nnyigyei** | Bluffer bi kyere ne nea ebetumi aba kɛse | Nsisi a wɔde di gua (sika a wɔde di dwuma atoro, sika a wɔsɛe no mmɔho abien) ntumi mma adanse a wogye tom |
| **Zero-nimdeɛ** | Verifier no nte kokoam asɛmfua | Netwɛk no nsua sika dodow, address, anaa nkyerɛwde bɛn da |

Sɛ eyinom mu biara di nkogu a, nhyehyɛe no sɛe: wɔmpow nea edi mũ ne nokwaredifo a wɔde di dwuma no; soundness biara nni hɔ na atorofo tintim sika; nimdeɛ ne kokoamsɛm biara nni hɔ a ɛyɛ hyew.

---

## 4. Efi ɔbodan mu kɔ *asɛm biara* so: amansin ne adansefo

Ɔbodan no di nokwasɛm biako a ɛyɛ fɛ ho adanse. Ɛsɛ sɛ Zcash di asɛm bi a ɛyɛ den ho adanse: *"Menim krataa bi a wɔansɛe no wɔ dua no mu, wɔama me tumi sɛ mensɛe no, wɔabu ne nullifier no yiye, na me inputs yɛ pɛ me outputs."* Yɛbɛyɛ dɛn afi bɔɔl ne abodan mu akɔ saa?

Bridge no yɛ adwene a ɛka saa nsɛm a ɛtoatoa so yi nyinaa bom:

> **Asɛm biara a wobɛtumi de akontabuo ahwɛ no, wobɛtumi asan akyerɛw sɛ akontabuo kwansin:** nkitahodiɛ a ɛfa nkabom ne dodoɔ a ɛwɔ afuo a ɛwɔ anohyetoɔ so (Ahyɛdeɛ 1).

Fa no sɛ ɔmansin no sɛ akontaabu anohyeto ahorow a wɔahyehyɛ a *wɔn nyinaa di mu sɛ asɛm no yɛ nokware nkutoo a.* Wɔfrɛ kokoam nsɛm a wɔde hyɛ mu a ɛma biribiara hwɛ, wo nkyerɛwde, wo safoa, Merkle kwan no, **ɔdansefo.**

![alt nkyerɛwee](/content-images/image-25-2479377e43.webp)

Eyi nti na yɛde Ahyɛde 1 dii dwuma wɔ finite fields ne Ahyɛde 3 wɔ ZK-adamfofa hashes so: ɔmansin no ka field akontabuo, enti ɛsɛ sɛ wɔda dwumadie biara a ɛwɔ asɛm no mu (a hashing ne Merkle foro a ɛwɔ Ahyɛdeɛ 4 no ka ho) adi saa. Dodow a oprehyɛn biara bo yɛ mmerɛw sɛ wɔbɛda no adi no, dodow no ara na adanse no sua na ɛyɛ ntɛmntɛm.

---

## 5. Ɛbɛyɛ nea mfaso wɔ so: ɛnyɛ nea ɛne afoforo di nkitaho na ɛyɛ tiawa

Ná ɔbodan no hia sɛ wɔde akuturuku pii kɔ akyi ne akyi. Ɛno nyɛ adwuma mma blockchain, baabi a ɛsɛ sɛ wɔde adanse bi to hɔ pɛnkoro na obiara hwɛ mu, daa. Nkɔso abien siesie eyi.

**Non-interactive (Fiat-Shamir adwene no).** Sɛ anka live verifier bɛteɛm random challenges, prover no ankasa generates "random challenges" denam *hashing * wɔn ankasa adanse-so-far. Esiane sɛ hash pa yɛ nea wontumi nhu (Ahyɛde 3) nti, ɔbofo no ntumi nnoa nsɛnnennen no mma wɔn. Nkɔmmɔbɔ a ɛyɛ nkɔmmɔbɔ no hwe ase yɛ **adanse biako a ɛwɔ ne ho** obiara betumi ahwɛ akyiri yi, a nkitahodi biara nni mu.

**Tiawa.** Nhyehyɛe ahorow a eye sen biara no ma adanse no yɛ **ketewaa na ɛyɛ ntɛm sɛ wobegye atom, ɛmfa ho sɛnea asɛm no kɛse te.** Eyi ne ɔfã a ɛyɛ nwonwa ankasa.

> Groth16 adanseɛ (nhyehyɛeɛ a Sapling de di dwuma) bɛyɛ **192 bytes** na ɛdi ho adanseɛ wɔ milisekɔn mu, *sɛ ebia asɛm a ɛkyerɛ no yɛ ketewa anaasɛ ɛsõ.* Baiti ɔhaha kakraa bi tumi di adanseɛ sɛ akontabuo a ɛfa anohyetoɔ mpempem pii ho.

Fa saa nneɛma no bom na wubenya asɛmfua tiawa a wubehu wɔ baabiara no:

> **zk-SNARK** = **z**ero-**k**nimdeɛ **S**uccinct **N**on-interactive **AR**gument of **K**nimdeɛ. Zero-nimdeɛ (ɛnyɛ hwee adi), tiawa (ketewa na ɛyɛ ntɛmntɛm), ɛnyɛ nkitahodi (a wɔtow tuo biako), nimdeɛ ho akyinnyegye (ɔbɛkafo *nim* ɔdansefo a ɔfata ankasa).

---

## 6. Nea ɛkyere biako: nhyehyɛe a wotumi de ho to so

Awia aduan biara nni hɔ a wontua hwee. SNARKs pii hia **setup** a ɛyɛ pɛnkoro a ɛma ɔmanfoɔ parameters ma circuit no. Setup no ma kokoam randomness sɛ byproduct, na ɛsɛ sɛ saa ahintasɛm no **sɛe.** Sɛ obi sie a, obetumi ayɛ adanse, kyerɛ sɛ, **ayɛ sika** (ɛwom sɛ, nea ɛho hia no, na wɔda so ara *antumi * asɛe kokoamsɛm).

Wɔto saa ahintasɛm a aka yi din **nwura a awuduru wom.** Sɛnea ɛbɛyɛ a wɔbɛtow agu dwoodwoo no, Zcash yɛɛ **apontow ahorow pii guasodeyɛ ahorow** a ɛyɛ nwonwa a wɔn a wɔde wɔn ho pii a wɔde wɔn ho hyɛɛ mu no mu biara de randomness mae; bere tenten a *baako mpo* sɛee wɔn asinasin no nokwarem no, awuduru nwura no yɛ nea wontumi nnya bio.

![alt nkyerɛwee](/content-images/image-26-cdad6625cd.webp)

Nhyehyɛe foforo yi saa ahwehwɛde yi fi hɔ koraa, a ɛyɛ ade titiriw biako nti a Zcash danee ne adanse nhyehyɛe bere tenten.

---

## 7. Baabi a eyi te wɔ Zcash

| Nsusuwii | Adanse nhyehyɛe | Setup a wogye di? | Wɔasi wɔ |
|---|---|---|---|
| **Sprout** (a edi kan koraa) | mfiase zk-SNARK | Yiw | mfitiase guasodeyɛ |
| **Nnuadewa** | **Nkɔsoɔ16** | Yiw ("Powers of Tau" + Sapling guasodeyɛ a nnipa pii wom) | **BLS12-381** (Ahyɛdeɛ 2) |
| **Orchard** (current) | **Halo 2** | **No trusted setup** | **Pallas / Vesta** (Article 2) |

Nantew a efi Sprout kɔ Sapling kɔ Orchard no yɛ asɛm a ɛfa adanse ahorow a ɛreyɛ nketewa, ɛyɛ ntɛmntɛm, na ɛrehwie nhyehyɛe a wogye di no agu ho kɛse. **Halo 2**, a Orchard de di dwuma no, nhia guasodeyɛ biara koraa na wɔasi sɛ ɛbɛboa *recursion* (adanseɛ a ɛkyerɛ adanseɛ foforɔ), ɛno nti na Orchard de Pallas/Vesta **cycle** a ɛfa curves a ɛfiri Ahyɛdeɛ 2 mu di dwuma: wɔayɛ curve biara tuned de ahwɛ sɛ adanseɛ a wɔakyerɛw wɔ ɔfoforo no so no yɛ nokware.

Eyi to loop kɛse a efi Ahyɛde 0. "akyi ntama" nkonyaayi no yɛ **zk-SNARK**: ɛkyerɛ sɛ wo asɛm no di akontaabu amansin bi a ɛkyerɛw mmara no nyinaa ho dwuma, bere a ɛnda biribiara adi gye bit biako a "ɛfata."

---

## 8. Nokware mu asɛm a wɔka sɛ wɔmfa wɔn ho nhyɛ mu

Zero-nimdeɛ adanse yɛ afuw a emu dɔ na yɛhyɛɛ da traa intuition level. Yɛankyerɛkyerɛ probability bounds pɔtee a ɛwɔ soundness mu, arithmetic circuit (R1CS, PLONKish, ne nea ɛkeka ho), sɛnea polynomials ne commitments dan circuit ma ɛbɛyɛ adanse tiawa, anaasɛ Groth16 ne Halo 2 no mu nneɛma ankasa.Ɔbodan no yɛ *interactive* proof nhyehyɛe ahorow a wɔde yɛ nneɛma no nyɛ nea ɛne afoforo di nkitaho na ɛyɛ nea ɛyɛ nwonwa kɛse koraa. Ɛno mu biara nsakra ade titiriw no: kyerɛ sɛ ɔmansin bi wɔ kokoam ɔdansefo bi abotɔyam, koraa, wɔ ɔkwan a ɛfata so, na ɛnna biribiara adi. Mfiri no yɛ n’ankasa nneɛma a ɛtoatoa so koraa.

---

## 9. Nsɛm a wɔaboaboa ano

- **Zero-knowledge proof** ma prover gye verifier gye di sɛ asɛm bi yɛ nokware **bere a ɛnna biribi foforo biara adi**, siesie verify-vs-privacy paradox no.
- Ɛsɛ sɛ ɛdi awerɛhyɛmu mmiɛnsa ho dwuma: **nea edi mũ** (nokware nsɛm ma wogye di), **ɛteɛ** (atoro nsɛm ntumi), ne **nimdeɛ a enni mu** (nea ɔhwɛ so no sua "ɛyɛ nokware" nkutoo).
- Nsɛm a wɔka no kwa no bɛyɛ **akontaabu amansin** wɔ afuw a anohyeto wom so; kokoam nsɛm a wɔde hyɛ mu a ɛma ɔmansin no nya abotɔyam ne **ɔdansefo**. Eyi nti na na finite fields ne ZK-adamfofa hashes ho hia no.
- **Fiat-Shamir** yɛ adanseɛ **ɛnyɛ nkitahodi** (too baako); nhyehyɛe a eye sen biara nso yɛ **tiatiaa** (Groth16 adanse bi bɛyɛ **192 bytes** na ɛyɛ nokware wɔ milisekɔn mu a asɛm no kɛse mfa ho). Wɔaka abom: a **zk-SNARK**.
- SNARKfo binom hia **nhyehyɛe a wotumi de ho to so** a ɛsɛ sɛ wɔsɛe ne **awuduru nwura** a aka no (ɛnam amanne ahorow a nnipa pii yɛ so); compromise bɛma kwan ma wɔayɛ sika nanso **ɛnyɛ** sɛ wobebu kokoam nsɛm so.
- **Sapling** de **Groth16** (nhyehyɛe a wotumi de ho to so, BLS12-381) di dwuma; **Orchard** de **Halo 2** di dwuma (nhyehyɛe biara nni hɔ a wotumi de ho to so, Pallas/Vesta, ɛyɛ recursion-adamfofa).

---

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| **Zero-nimdeɛ adanseɛ** | Ma obi gye di sɛ asɛm bi yɛ nokware bere a wonna biribi foforo biara adi |
| ** Ɔbɛbufoɔ / Ɔhwɛfoɔ** | Nea ɔyɛ adanse / nea ɔhwɛ mu |
| **Nea edi mũ** | Nokware nsɛm gye tom bere nyinaa (efi ɔbofo a odi nokware hɔ) |
| **Nnyigyei** | Atoro nsɛm nya pow (nsisifo ntumi nni nkonim gye sɛ ɛnam anigye so) |
| **Ɔdansefo** | Kokoam nsɛm a wɔde hyɛ mu a ɛma asɛm no yɛ nokware |
| **Akontaabu amansin** | Asɛm a wɔasan akyerɛw sɛ ɛka ho na ɛdɔɔso wɔ afuw a ɛwɔ anohyeto so |
| **Nea ɛnyɛ nkitahodi (Fiat-Shamir)** | Adanse a wɔde tow tuo biako a enhia sɛ wɔte ase akyi-ne-akyi |
| **Nsɛm tiawa** | Adanse no sua na ɛyɛ ntɛm sɛ wobɛdi ho adanse ɛmfa ho sɛnea asɛm no kɛse te |
| **zk-SNARK** na ɛyɛ adwuma | Zero-knowledge Tiawa a Ɛnyɛ nkitahodi ARgument of Knowledge |
| **Nsiesiei a wogye di / awuduru nwura** | One-time parameter generation a ɛsɛ sɛ wɔsɛe n’ahintasɛm a aka |

---

## FAQ

**Sɛ adanse no nkyerɛ hwee a, ɛbɛyɛ dɛn na wɔahwɛ mu akyerɛ biribiara?**
Efisɛ wɔahyehyɛ akontaabu no sɛnea ɛbɛyɛ a *ɔdansefo ankasa a ɔfata nkutoo* na obetumi de adanse a ɛtwam aba. Check no a wɔde bɛma no ankasa yɛ adanse, enhia sɛ wɔda no adi.

**So obi betumi ayɛ adanse bi atoro?**
Ntease ma eyi ntumi nyɛ yiye. Nea ɛka ho biako ne SNARK a wɔde ne nwura a awuduru wom a wɔde wɔn ho to so a wɔahyehyɛ no siei; ɛno nti pɛpɛɛpɛ na guasodeyɛ ahorow a wɔde sɛe no ho hia no.

**So nhyehyɛe a wogye di a asɛe no ma me kokoam data no pue?**
Dabi Ɛbɛma ɔtowhyɛfo bi ayɛ sika *foforo*, nanso **ɛnyɛ** sika dodow, address, anaa nkrataa a wɔakyerɛw. Kokoamsɛm ne nea ɛfata yɛ awerɛhyem ahorow a ɛsono emu biara.

**Adɛn nti na Zcash sesaa adansedi nhyehyɛe ahorow bere kɔɔ so?**
Sɛ wobɛnya adanseɛ nketewa, ntɛmntɛm na, ɛne Halo 2, wobɛyi nhyehyeɛ a wogye di no afiri hɔ koraa na woama recursion atumi ayɛ adwuma.

---

### Sɔ wo nkate mu hwɛ

Wɔ ɔbodan no mu no, dɛn nti na ɛho hia sɛ nea ɔhwɛ so no paw ɔfã a obefi adi *akyi* sɛ ɔbenfo no akɔ mu dedaw, sen sɛ obedi kan abɔ ho amanneɛ? *(Mmuae wɔ aseɛ ha.)*

<details><summary>Answer</summary>

Sɛ nea ɔhwɛ so no di kan de ɔfã no too gua a, na obi a ɔyɛ ɔkwasea a onnim asɛmfua no betumi anantew akɔ saa ɔfã no mu ara kwa fi mfiase na wasan anantew akɔ abɔnten, na onhia ɔpon no da. Sɛ ɔpaw *akyi* sɛ ɔbofo no de ne ho hyɛ ntwamu bi mu a, ɛhyɛ bluffer bi ma ɔde ne ho to anigye so (50/50 wɔ round biara mu), a ɛno ne nea ɛma rounds a wɔsan yɛ no yɛ nea wogye di. Saa "commit first, then be challenged" ordering yi yɛ nea Fiat-Shamir kora so pɛpɛɛpɛ denam asɛnnennen no a wonya fi hash a ɛyɛ prover no adanse a ɔde ahyɛ bɔ dedaw no mu no so.
</details>

---

### Nea edi hɔ

**Ahyɛdeɛ 6 . Protocol a wɔabɔ ho ban no, awiei kosi awiei:** awiei no. Yɛfa asinasin biara, nkyerɛwde, bɔhyɛ ahorow, nkyerɛwde bɔhyɛ dua, nullifiers, bo a ɛkari pɛ, ne zero-nimdeɛ adanse, na yɛboaboa Zcash shielded asɛm a edi mũ ano, na yɛtoto loop biako biara a wɔabue akyi wɔ Ahyɛde 0 no mu.

*Zcash no fã bi a efi Nnyinasosɛm a Edi Kan *series ma [ZecHub](https://zechub.org). CC BY-SA 4.0 a wɔama ho tumi krataa.*

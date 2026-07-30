# Sɛnea Shielded Zcash Transaction Yɛ Adwuma Ankasa
##### Mfitiase Nhwehwɛmu a efi [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nkyerɛwee](/content-images/image-fedc371488.webp)

### Intuition ansa na akontaabu no: a no-formula walkthrough of private payments

> **Series:** *Zcash fi Nnyinasosɛm a Edi Kan* . **Ahyɛdeɛ 0 . Anchor no**
> **Atiefo:** wɔn a wɔaba foforo koraa. Crypography biara nni hɔ, blockchain akyi nsɛm biara nni hɔ, na akontaabu biara nni hɔ a wɔfaa no.
> **Nea wobɛgyaw:** adwene mu nhwɛsoɔ a ɛteɛ a ɛkyerɛ sɛdeɛ Zcash de *hena a ɔtuaa hena, ne dodoɔ* sie, berɛ a ɔda so ara ma wiase nyinaa hwɛ sɛ wɔannwene sika biara anaasɛ wɔansɛe no mprenu.

Asɛm biara a ɛbɛba akyiri yi wɔ nsɛm a ɛtoatoa so yi mu no ma afiri a worebehyia no no fã biako ayɛ kɛse. Enti sɛ asɛmfua bi wɔ ha te nka sɛ nsa-wavy a, *papa*. Ɛno yɛ bɔhyɛ sɛ yɛbɛsan aba na yɛanya no yiye.

---

## 1. Adɛn nti na ɛsɛ sɛ wodwene ho?

Fa no sɛ wɔde nnadewa bɔɔ wo sikakorabea krataa so wɔ ɔfasu bi so wɔ kurow no abɔnten so. Daa. Obiara (wo fie wura, w’adwumawura, ɔhɔho, daakye adwumawura, aban) betumi akenkan dan ka biara, aduruyɛ ho ka biara, ntoboa biara, kɔfe biara, na wahwehwɛ onii a wode sika kɔmaa wo ne onii a wode sika kɔmaa wo no mu pɛpɛɛpɛ.

Ɛno nyɛ dystopia nsusuwii hunu. **Ɛbɛyɛ sɛ saa na Bitcoin yɛ adwuma.**

Wɔtaa frɛ Bitcoin sɛ "anonymous," nanso ɛnte saa. Ɛyɛ *pseudonymous*: wo din nni ledger no so, nanso asɛm biara, sika dodow, ne nkitahodi biara a ɛda address ahorow ntam no yɛ baguam na ɛtra hɔ daa. "Nkɔnsɔnkɔnsɔn nhwehwɛmu" afuw no nyinaa wɔ hɔ sɛ ɛbɛpepa saa din atoro a ɛyɛ tratraa no akɔ akyi na ɛde address ahorow akyekye nnipa ankasa. Sɛ wɔde w’address no biako bata wo ho pɛ a, wo sikasɛm ho abakɔsɛm da adi.

Wɔkyekyeree Zcash sɛ wɔde bebua asɛmmisa bi a emu yɛ den a ɛyɛ nnaadaa:

> **So yebetumi anya sika a ɛyɛ kokoam koraa, a ɛde nea ɔde kɔmaa, nea ogye, ne sika dodow asie, bere a yɛda so ara ma obiara hwɛ sɛ wodii mmara no so?**

Saa botae abien no ko. Public ledger yɛ verifiable *efisɛ* obiara tumi hu. Kokoamsɛm kyerɛ sɛ obiara ntumi nhu. Enti ɛbɛyɛ dɛn na ɔmanfo atumi ahwɛ sɛ biribi a wɔmma wɔn kwan sɛ wɔbɛhwɛ no yɛ nokware?

Saa abirabɔsɛm no a wobesiesie no ne nsɛm a ɛtoatoa so yi mu asɛm nyinaa. Momma yɛnhyɛ aseɛ.

---

## 2. Wiase abien na ɛwɔ Zcash mu

Ansa na biribi foforo biara bɛba no, yi adwene a ɛnteɛ a wɔtaa nya no fi hɔ: **Zcash nyɛ "kokoam sika." Ɛyɛ sika a ɛma kokoamsɛm sɛ ɔkwan a wobɛfa so.** Nokwarem no, efii asetra ase sɛ Bitcoin fork, na ɛde nhyehyɛe abien a ɛne ne ho di nsɛ wɔ blockchain koro no ara so.

| | **Wiase a ɛda adi pefee** | **Wiase a wɔabɔ ho ban** |
|---|---|---|
| Kokoam nsɛm | Ɔmanfo, te sɛ Bitcoin | Ankorankoro |
| Address ahorow no fi ase wɔ | `t...` | `z...` or `u...` |
| Ɔsomafo / nea ogye / sika dodow | **Wotumi hu** ma obiara | **Wɔde asie** obiara |
| Underlying tech | Bitcoin-kwan so ɔmanfo nhomakorabea | Cryptographic bɔhyɛ ahorow + zero-nimdeɛ adanse |

Sika mpo betumi atwa wɔn ntam hye: sika a wɔde *kɔ* wiase a wɔabɔ ho ban no mu no, wɔfrɛ no *kyɛm*, na sɛ wɔde bɛsan akɔ akyi no yɛ *deshielding*.

Wiase a ɛda adi pefee no ne "Bitcoin a wote ase dedaw bɛyɛ sɛ." Ɛyɛ **wiase a wɔabɔ ho ban** a ɛwɔ cryptography fɛfɛ no nyinaa, na ɛno nkutoo ne wiase a saa ntoatoaso yi dwen ho.

![alt nkyerɛwee](/content-images/image-1-f821d24c6f.webp)

---

## 3. Intuition: envelopes a wɔatoto mu wɔ ɔmanfo board so

Adwene mu mfonini biako pɛ a ɛsɛ sɛ yɛde fa asɛm no fã a aka no mu ni. Yɛbɛsan akɔ so bere nyinaa.

Fa w’adwene bu **ɔmanfo amanneɛbɔ kyerɛwpon** kɛse biako a obiara a ɔwɔ Asase so betumi ahu bere nyinaa.

* **Sika a wobɛgye** kyerɛ sɛ obi de **sealed, opaque envelope** bɛbɔ board no so. Wɔ envelope no mu no, *sika dodow a ɛkura* ne *ahintasɛm bi a nea ogye no nkutoo na obetumi akenkan*, efisɛ wɔato envelope no mu wɔ saa ogyefo no ankasa safe so. Wiase nyinaa hu sɛ *envelope bi puei*. Obiara ntumi nhu nea ɛwɔ mu no gye owura no nkutoo.

* **Board no nko ara na enyin da.** Wɔntetew envelopes mu anaasɛ wɔmpopa da. Wɔde pin abɔ foforo wɔ soro, daa.

* **Sika a wobɛsɛe** kyerɛ sɛ wobɛtiatia ntama akyi, akyerɛ sɛ *"Mewɔ envelope a wɔansɛe no wɔ saa board yi so no biako, na wɔama me kwan sɛ mebue"*, afei wobɛtow **void token** soronko bi agu ɔmanfo "asɛe" bin mu na woabɔ **envelope foforo** ama obiara a woretua no.

Saa amanne ketewa no (pin a void token, pin envelopes foforo, ne nyinaa fi ntama akyi) *yɛ* Zcash akatua. Biribiara a aka no yɛ nea ɛkɔ akyiri.

Afei momma yɛmfa saa props no din ankasa mma.

---

## 4. Edin anum no

Saa nsɛmfua anum yi yɛ nsɛmfua a ɛwɔ shielded Zcash no nyinaa. Sua wɔn sɛ *asɛm*, ɛnyɛ sɛ nsɛmfua nkyerɛase, na wɔbɛbata ho.

| Wɔ asɛm no mu | Ankasa Zcash asɛmfua | Nea ɛyɛ ankasa |
|---|---|---|
| Envelope no mu nsɛm (sika + owura + ahintasɛm bi) | **Hyɛ no nsow** | Kokoam "sika" no: bo a ɛsom a ɛyɛ obi dea |
| Envelope a wɔatoto mu, a ɛnyɛ hann a ɛwɔ board no so | **Hyɛ ahofama nsow** | Cryptographic seal a ɛkyerɛ sɛ envelope bi wɔ hɔ bere a ɛde nea ɛwɔ |
| Bulletin board no ankasa | **Hyɛ ahofama dua no nsow** | Append-only record a ɛkyerɛ *nkyerɛwde biara a wɔayɛ pɛn* |
| Void token a ɛwɔ "spent" bin no mu | **Nnuruyɛfoɔ** | Agyiraehyɛde soronko bi a ɛkyerɛ sɛ "wɔasɛe saa nkyerɛwde yi mprempren" |
| "Ntama no akyi" nkonyaayi | **Zero-nimdeɛ adanseɛ** | Adanse a ɛkyerɛ sɛ sika a wɔsɛee no nyinaa yɛ nokware, a ɛda emu biara adi |

Sɛ wonkae biribi foforo biara mfi asɛm yi mu a, kae pon yi. Biribiara a ɛdi akyire no yɛ *nea enti a* ɛsɛ sɛ wɔhyehyɛ afã biara sɛdeɛ ɛteɛ no ara kwa.

---

## 5. Nea enti a wɔayɛ asinasin biara sɛnea ɛte no

Eyi ne ɔfã a nkyerɛkyerɛmufo dodow no ara twa so, na ɛyɛ ɔfã a ɛtetew "Mekyeree nsɛmfua bi wɔ me tirim" ne "Mete sɛnea wɔayɛ no ase" no mu pɛpɛɛpɛ. Asinasin anum no mu biara wɔ hɔ sɛ wɔde bedi **ɔhaw pɔtee biako ho dwuma.**

### The note commitment: fa emu nsɛm no sie, nanso ma atoro nyɛ nea entumi nyɛ yiye

Wobetumi de nsu a ɛyɛ hyew abue envelope a ɛnyɛ den mu. Cryptographic **note commitment** ntumi. Fa no sɛ ɛyɛ *anwanwakwan* a wɔatoto mu, envelope a ɛnyɛ hann koraa a tumi akɛse abien wom:

- **Hiding**: sɛ wohwɛ envelope a wɔatoto mu no a, ɛnkyerɛ wo *biribiara* wɔ sika dodow anaa owura a ɛwɔ mu no ho.
- **Binding**: sɛ wɔsɔ ano wie a, wɔrentumi nsesa emu nsɛm no. Akyiri yi wuntumi nka sɛ na sika soronko bi kura envelope no mu.

Ɛbɛyɛ dɛn na nsɔano atumi ayɛ abien no nyinaa prɛko pɛ? Ɛno yɛ asɛmmisa ankasa a wobetumi abua. Ɛyɛ asɛmti a ɛfa **Ahyɛde 3 (bɔhyɛ ahorow)** ho. Mprempren de, gye envelope no tom sɛ nkonyaayi na kɔ so tu.

### Nullifier no: nea ɛyɛ anifere ankasa

Sɛ wosɛe krataa bi a, wotintim ne **nullifier**, "void token." Wɔbu saa token yi firi *nkyerɛwdeɛ no ankasa* **ne** *wo kokoam safoa*. Saa aduannoa no tɔ agyapade abiɛsa bere koro mu, na emu biara ho hia:

1. **Owura no nko ara na obetumi abɔ.** Wohia kokoam safoa no na woatumi ayɛ ho akontaabu, enti obiara ntumi nsɛe wo nsɛm a woakyerɛw no mma wo.
2. **Ɛyɛ *token* koro no ara bere nyinaa ma nkyerɛwde a wɔde ama.** Bɔ mmɔden sɛ wobɛsɛe nkyerɛwde koro no ara mprenu na anka wobɛma *identical* void token no aba mprenu no nyinaa, na ɔmanfo "sent" bin no kura mu dedaw. Wɔpow sika a wɔsɛe no mmɔho abien. 
3. **Obiara ntumi nhwehwɛ mu nkɔ ne envelope no mu.** Void token no te sɛ nea ɛne envelope a efi mu bae no nni abusuabɔ koraa.

Saa agyapadeɛ a ɛtɔ so mmiɛnsa no yɛ **Zcash kokoamsɛm koma**, na ɛfata n’ankasa ɔfa a ɛwɔ aseɛ ha.

### Adanse a nimdeɛ nnim: ntama no ankasa

Biribiara si wɔ ntama akyi, na nea wode ma wiase no wɔ ɛno akyi no yɛ **nimdeɛ a enni adanse**, adansedi krataa bi a wontumi nhyɛ da. Ɛdi eyinom nyinaa ho adanse prɛko pɛ:

- *envelope a meresɛe no ampa no wɔde pin abɔ board no so* (ɛyɛ note ankasa, a ɛwɔ hɔ dedaw),
- *Wɔama me kwan ankasa sɛ mebue* (Mekura safoa a ɛfata),
- *me void token no wɔabu akontaa yiye* (no cheating the double-spend check),
- *me envelopes foforo no kura sika dodow te sɛ dedaw no pɛpɛɛpɛ*: **sika biara nni hɔ a wɔabɔ afi hwee mu.**

Anwonwadeɛ no ne sɛ adanseɛ no da saa nokwasɛm no mu biara adi **biara**. Ɛnyɛ sika dodow no, ɛnyɛ address ahorow no, ɛnyɛ envelope bɛn. Ɛma wogye di nko ara sɛ *asɛm biara a ɛwɔ atifi hɔ no yɛ nokware*. Sɛnea ɛno mpo betumi aba ne **Ahyɛde 5 (nimdeɛ a enni adanse)**, crescendo a ɛwɔ ntoatoaso no mu.

---

## 6. Nkwa a nkyerɛwde biako te

Wɔwo *note*, *ɛte* board no so, na awiei koraa no *wu*, na nea ɛho hia titiriw no, n’awo ne ne wu no te sɛ nea ɛne obiara a ɔrehwɛ no nni abusuabɔ.

![alt nkyerɛwee](/content-images/image-2-0eca0ea4f7.webp)

---

## 7. Akatua bi, awiei kosi awiei

Momma yɛnhwɛ sɛ Alice tua Bob ka, a wɔakyerɛw ɔmanfo ne kokoam anammɔn biara din.

![alt nkyerɛwee](/content-images/image-4-7af0dfe795.webp)

Hyɛ asymmetry a ɛma kokoam nsɛm no yɛ adwuma no nsow:

- **Alice krataa dedaw no** wu denam *nullifier* a ɛwɔ bin a wɔasɛe no mu.
- **Bob note foforo** no nam *commitment* foforo a ɛwɔ board no so na ɛwo.
- Wɔ obiara a ɔrehwɛ fam no, saa nsɛm abien yi nni **nkitahodi biara a wotumi hu.** Sika no kwan no kɔ nwini.

> **Ɛbɛyɛ dɛn na Bob mpo ahu sɛ wɔtuaa no ka?** Wɔde ne krataa no ahyɛ ne nsa *kɔ ne safoa so*. Ɔkɔ so scan board no na *ne* envelopes nkutoo na ɛpue ma no, te sɛ nea ɔwɔ safe biako a ɛfata locks pɔtee bi. Mfiri a ɛwɔ eyi akyi ne **viewing keys**, asɛmti a ɛbɛba akyiri yi.

---

## 8. Nea wiase hu vs. nea ɛtra hɔ ahintaw

| Nokwasɛm a ɛfa sikatua ho | Ɔmanfo betumi ahu? |
|---|---|
| Saa *a* shielded transaction no sii |  Yiw |
| Sɛ ɛdi mmara nyinaa so (atoro nnim, sika a wɔsɛe no mmɔho abien) |  Yiw (ɛnam adanse no so) |
| **Hena** na ɔde sika no kɔmaa |  Wɔde ahintaw |
| **Hena** na ogyee no |  Wɔde ahintaw |
| **Nea ɛhe na** na wɔde kɔmaa |  Wɔde ahintaw |
| **He** kan note a wɔde dii dwuma |  Wɔde ahintaw |

Eyi ne abirabɔ no ano aduru a efi Ɔfa 1. Ɔmanfo na wɔhwɛ *mmara* no so, na ɛnyɛ *emu nsɛm* no. Verification ne kokoamsɛm gyae ntɔkwaw, efisɛ zero-knowledge adanse no ma wutumi hwɛ kan no mu a wonka nea etwa to no.

---

## 9. Ne koma: nea enti a envelope ne void token no ntumi nkabom

Sɛ wote saa adwene baako yi ase a, wote nea enti a Zcash yɛ kokoam no ase. Kenkan no nkakrankakra.

- Wɔde **envelope (commitment)** bi pinn board no so bere a wɔawo note bi**.
- Wɔtow **void token (nullifier)** gu bin no mu bere a saa nkyerɛwde koro no ara **asɛe**, ebia asram pii akyi.
- Wɔnam **kokoam aduannoa ahodoɔ** so na ɛyɛ, na **ɔmanfoɔ akontabuo** biara nni hɔ a ɛdane baako kɔ foforɔ mu.

Enti obi a ɔhwɛ abɔnten hu sɛ envelopes asuten bi repue na void tokens a ɛrepue, nanso **ontumi nhyia**. Wontumi nka sɛ "void token a wɔtow gui nnɛ no ne envelope a wɔde pinned wɔ March a etwaam no hyia." Link no wɔ hɔ *nkutoo* wɔ kokoam nimdeɛ a nkyerɛwde no wura wɔ mu, na zero-nimdeɛ adanse no si so dua sɛ link no yɛ nokware *a ɛnda no adi.*

Saa link a abubu no ne ade a chain-analysis firms di apontow wɔ Bitcoin mu, ne ade a Zcash hyɛ da twa mu.

> **Sɔ wo nkate hwɛ:** Sɛ wɔde nullifiers mmom bu akontaa *nko* fi nkyerɛwde no mu (kokoam safe biara nni mu a), agyapade abiɛsa a ɛwɔ Ɔfã 5 no mu nea ɛwɔ he na ɛbɛbubu, na dɛn nti na ɛno bɛsɛe kokoamsɛm komm? *(Mmuae wɔ awiei.)*

---

## 10. Nokwaredi mu asɛm a wɔde tow

Eyi yɛ **adwene mu nhwɛso**, ɛnyɛ spec no. Sɛnea ɛbɛyɛ a ɛbɛkɔ so ayɛ nea ɛyɛ foforo-adamfofa no yɛama nneɛma ankasa pii ayɛ mmerɛw komm: Zcash anya nhyehyɛe ahorow pii a wɔabɔ ho ban (Sprout, afei Sapling, mprempren Orchard); nnwuma ankasa betumi asɛe sika na wɔayɛ *nkyerɛwde pii* prɛko pɛ; "the board" yɛ mfiridwuma mu no dua pɔtee bi, ɛnyɛ pinboard ankasa; na wɔde cryptographic nhomakorabea foforo bi hyɛ bo a ɛkari pɛ no mu den. Saa nsɛm no mu biara nsakra asɛm a wusuae seesei ara no; wɔsiesie no yiye. Yɛde pɛpɛɛpɛyɛ no bɛka ho asan, asɛm biako biara, na yɛahyɛ frankaa pefee bere biara a yɛbɛyɛ saa.

Nhomasua mu nsɛm pa ma wonya ahotoso denam nea egyaw no a wɔka so. Saa ɔfa yi ne saa bɔhyɛ no.

---

## 11. Loops a yɛbuee (wo map a ɛkyerɛ series no) .

"Yɛbɛsan aba eyi so" biara a ɛwɔ atifi hɔ no yɛ asaawa. Baabi a wɔkyekyere wɔn mu biara ni:

![alt nkyerɛwee](/content-images/image-29-27ef4636ff.webp)

| Loose end fi asɛm yi mu | Baabi a wɔasiesie |
|---|---|
| Ɛbɛyɛ dɛn na envelope a wɔatoto mu atumi ayɛ nea wɔde asie *ne* nea wontumi mfa mfiri? | Ahyɛdeɛ 3: bɔhyɛ ahodoɔ |
| Ɛhe na nsafe ne kokoam aduannoa ho nyansahyɛ ahorow no fi? | Ahyɛdeɛ 1 & 2: afuo ne curves |
| Dɛn *ne* "board no," pɛpɛɛpɛ? | Ahyɛdeɛ 4: Merkle nnua |
| Wobɛyɛ dɛn atumi akyerɛ sɛ biribi yɛ nokware bere a wonda biribiara adi? | Ahyɛdeɛ 5: adanseɛ a ɛkyerɛ sɛ nimdeɛ nnim |
| Ɔkwan bɛn so na asinasin anum no nyinaa bom wɔ Zcash ankasa mu? | Ahyɛdeɛ 6: protocol a wɔabɔ ho ban |

---

## 12. Nsɛm a wɔaboaboa ano

- Bitcoin yɛ **nea ɛda adi pefee**; Zcash de **shielded** wiase a wɔde nea ɔde kɔma, nea ogye, ne sika dodow a wɔde asie ma.
- Abirabɔ a ɛda adi (*private yet publicly verifiable*) no ne asɛm no nyinaa, na wotumi siesie.
- Akatua a wɔabɔ ho ban yɛ asinasin anum a ɛka bom: **note** (sika no), **note commitment** (envelope a wɔatoto mu), **note commitment dua** (ɔmanfoɔ board), **nullifier** (void token a ɛsiw sika a wɔsɛe no mmɔho mmienu), ne **zero-knowledge proof** (curtain a ɛkyerɛ sɛ ɛyɛ nokware bere a ɛnkyerɛ hwee).
- Awiei koraa no, kokoamsɛm gyina **link biako a wɔatwa** so: obiara nni abɔnten a obetumi de nkyerɛwde bi awo (ahofama) abata ne wu (nullifier) ​​ho.
- Ɔmanfoɔ di **mmara** no ho adanseɛ, ɛnyɛ **nneɛma** no da.

Seesei wokura asase mfonini no. Nsɛm a ɛtoatoa so no nkae no hyɛ mu ma.

---

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| **Hyɛ no nsow** | Ankorankoro unit a ɛsom bo, Zcash a ɛne sika anaa sika a wɔde tua ho ka yɛ pɛ |
| **Hyɛ ahofama nsow** | Cryptographic seal a ɛkyerɛ sɛ krataa bi wɔ hɔ a ɛnda no adi |
| **Hyɛ ahofama dua no nsow** | Baguam kyerɛwtohɔ a wɔde ka ho nkutoo a ɛfa nkyerɛwde bɔhyɛ ahorow nyinaa ho |
| **Nnuruyɛfoɔ** | "Sent" agyiraehyɛde soronko a wotintim bere a wɔde nkyerɛwde bi di dwuma, a esiw sika a wɔsɛe no mmɔho abien |
| **Zero-nimdeɛ adanseɛ** | Adanse a ɛkyerɛ sɛ asɛm bi yɛ nokware bere a ɛnna biribiara adi nsen ne nokware |
| **Shielding / deshielding** | Sika a wɔde kɔ / fi ankorankoro wiase a wɔabɔ ho ban no mu |
| **Hwɛ safoa** | Safoa a ɛma owura no hu na ɔkenkan nsɛm a wɔakyerɛw a wɔde akɔma wɔn |

---

## FAQ

**So Zcash yɛ kokoam bere nyinaa?**
Dabi, kokoam nsɛm fa *shielded* wiase no ho (`z...`/`u...` address ahorow). Fann (`t...`) nkitahodi yɛ baguam, te sɛ Bitcoin.

**Sɛ biribiara ahintaw a, dɛn na esiw obi kwan sɛ obetintim sika a wontua hwee?**
Adanse a ɛkyerɛ sɛ wonni nimdeɛ biara. It mathematically forces every transaction's outputs to be backed by real, unspent inputs, *while* keeping the amounts secret.

**So wobetumi asɛe krataa koro no ara mprenu?**
Dabi, sɛ wosɛe krataa bi a, wotintim ne nullifier; mmɔdenbɔ a ɛtɔ so mmienu no bɛtintim nullifier a ɛyɛ pɛ no, a ɛwɔ "spent" bin no mu dedaw, enti network no pow.

**So abɔntenfo betumi de obi a ɔsoma no abata obi a ogye no ho?**
Dabi, obiara ntumi mfa bɔhyɛ (note no awo) ne nullifier (note wu) no nhyia a owura no nnim kokoam.

---

### Mmuae a wɔde ma wɔ nkate mu sɔhwɛ no ho (Ɔfa 9) .

Sɛ wɔbuu nullifier no *nko* firii nkyerɛwdeɛ no mu, a na kokoam safoa biara nni mu a, ɛnde **obiara** bɛtumi abu no, abubu agyapadeɛ #1 (owura no nko ara na ɔbɛtumi asɛe). Nea enye koraa no, afei de na wobetumi anya nullifier no tẽẽ afi ɔmanfo nsɛm a ɛfa krataa no ho, a ebetumi ama wɔn a wɔhwɛ no **asan de nullifier no abata ne bɔhyɛ ho**, abubu agyapade #3 na wɔabue nhyehyɛe no nyinaa kokoamsɛm mu komm. Kokoam safoa no ne nea ɛma void token no *yɛ wo dea nkutoo* ne *unlinkable.*

---

### Nea edi hɔ

**Ahyɛdeɛ 1 . Finite fields:** akontaahyɛde nhyehyɛe a ɛyɛ nwonwa, fɛfɛ a akontaabu "bɔ ho ban," ne nea enti a cryptography afã biara a ɛwɔ saa ntoatoaso yi mu no te hɔ. Yɛbɛhyɛ aseɛ, sɛdeɛ ɛteɛ daa no, de intuition, no formulas kɔsi sɛ yɛbɛnya.

*Zcash no fã bi a efi Nnyinasosɛm a Edi Kan *series ma [ZecHub](https://zechub.org). CC BY-SA 4.0 a wɔama ho tumi krataa.*

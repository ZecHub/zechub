# Ṣíṣàmúlò àti Ìpinnu: Àpótí tí a fi Òǹtẹ́lẹ̀ dì
##### Ìwádìí Àkọ́kọ́ láti [Annkkitaaa](https://github.com/Annkkitaaa)

![ì í ì °ë¦¬í ë ¤](/content-images/image-15-0c16784b27.webp)

### Bó o ṣe lè pa àṣírí rẹ mọ́ láwùjọ láì parọ́ nípa rẹ̀

> **Series:** *Zcash from First Principles* . **Article 3 . Hashing and Commitments** Àwọn Àlàkalẹ̀ àti Ìpínwó
> A tẹ̀lé [Àpilẹ̀kọ 1 (àwọn pápá tí ó ní òpin) ](article-1-finite-fields.md) àti [Àpilẹ̀kọ 2 (àwọn ìyí elliptic)](article-2-elliptic-curves.md), ṣùgbọ́n èrò inú fúnra rẹ̀ ló máa ń dá ṣe é.
> ** Ohun tí ẹ ó fi sílẹ̀ pẹ̀lú:** òye tó ṣe kedere nípa àwọn iṣẹ́ hash, ohun tí "fipamọ́" àti "ìdìmú" túmọ̀ sí gan-an, àti bí Zcash ṣe ń kọ àwọn àdéhùn àkọsílẹ̀ tí ó so gbogbo ìsanwó àdáni mọ́lẹ̀.

Ni [Abala 0](article-0-shielded-transaction.md) we described a "magic sealed envelope": something you can pin to a public board that proves an envelope exists while hiding what's inside, and which you can never swap out later. We promised to explain how such a thing is possible. This is that article. We need two ingredients: **hash functions** and **commitments**.

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Imagine you predict the outcome of an election and want to prove, *afterwards*, that you called it in advance. You can't just announce your prediction (that influences people, or invites accusations you changed it). And you can't keep it fully secret (then you can't prove anything later).

Ohun ti o fẹ ni a ona lati ** titiipa ni iye bayi, ni gbangba, iru wipe:**

- ẹnikẹ́ni kò lè mọ ohun tí o fi pamọ́ sínú (ó wà ní àṣírí fún àkókò yìí), àti
- nígbà tó bá yá, tó o bá sọ fún wọn, o ò ní lè parọ́ nípa ohun tó ṣẹlẹ̀.

This "lock now, reveal later, no lying" gadget is called a **commitment**, and it is everywhere in Zcash. A note's value and owner are locked into a commitment the moment the note is created. To build commitments, we first need their workhorse: the hash function.

---

## 2. Ìmọ̀-ara-ẹni: àmì ìka fún ìsọfúnni

A **hash iṣẹ** gba eyikeyi data ni gbogbo, kan nikan lẹta tabi kan gbogbo ile-ikawe, ati ki o pa o si isalẹ si kan kukuru, titilai- iwọn okun ti a npe ni a **digest** tabi **hashi**. ro ti o bi a **itẹ ika fun data.**

![ì í ì °ë¦¬í ë ¤](/content-images/image-16-52fdf62c87.webp)

Ẹ̀rí ìka tí ó dára ní àwọn ohun-ìní mẹ́rin.

| Ohun ìní | Ìtumọ̀ lásán | Idi ti o fi ṣe pataki |
|---|---|---|
| **Ipinnu** | Ìtẹ̀wọlé kan náà máa ń fúnni ní ìka kan náà nígbà gbogbo | O le tun ṣayẹwo itẹka rẹ nigbakugba |
| **Yára síwájú** | Iṣiro ika ọwọ naa yara | Wulo lati lo nibi gbogbo |
| **Ọ̀nà kan ṣoṣo (ó dúró ṣinṣin sí àwòrán ìṣáájú)** | Nítorí pé o ní ìka ọwọ́, o kò le rí ohun tí ó ṣe é | Ó fi ìwífún àtilẹ̀wá pamọ́ |
| **Rọrùn láti kọlu** | O ko le ri awọn titẹ sii oriṣiriṣi meji pẹlu itẹka kanna | Kò sí ẹni tó lè dojú ìjà kọ ara rẹ̀ |

Àṣà mìíràn tó tún mú kí àwọn àlàfo ọwọ́ dà bí ohun ìyanu ni:

### Àbájáde ìjì líle (tí a ṣètìlẹ́yìn fún)

Yíyí ìsọfúnni tí ó wọlé padà ní ìwọ̀n tí ó kéré jùlọ, àwò ọwọ́ yóò yí padà * pátápátá*, kò ní jọ ti àtijọ́.

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

Lára 64 hex dígítì, **59 yàtọ̀.** Àkọlé kan wọlé, àmì ìka tí kò ní nǹkan kan ṣe pẹ̀lú rẹ̀ jáde. Ìdí nìyí tí o kò fi lè sún ìsọfúnni wọlé lọ síbi àmì ìkan tí o fẹ́: kò sí àmì "ó gbóná/ó tutù" láti tẹ̀lé.

---

## 3. Bí wọ́n ṣe bẹ̀rẹ̀ sí í fi ẹ̀rí ìka ara wọn hàn

Àbá kan tó fani mọ́ra àmọ́ tó ti bà jẹ́ nìyí: láti máa fi tọkàntọkàn ṣe nǹkan `v`, kàn tẹ̀ ẹ́ jáde `H(v)`.

Ìyẹn á mú kó o di ẹni tí kò lè sọ̀rọ̀ sí ẹlòmíì. `v`, nitori eyi yoo nilo ijamba kan). Ṣugbọn o ** kuna lati farapamọ.** Ti ṣeto awọn iye ti o ṣeeṣe ba jẹ kekere, oludari kan nikan ni awọn ami ika gbogbo oludije ati ṣe afiwe. Ṣiṣe si "bẹẹni" tabi " rara"? Wọn ṣajọ mejeeji ati lẹsẹkẹsẹ mọ eyi ti o yan. Ipilẹ, ọrẹ wa ni iṣẹju diẹ sẹhin, n ṣafihan asiri naa bayi.

Ọ̀rọ̀ kan péré ló lè yanjú ìṣòro yìí:

> **Ìdánilójú ni àmì ìka iye rẹ tí a dà pọ̀ pẹ̀lú iye tuntun kan tí a kò mọ̀ rí:**
> `commitment = H(v, r)` ibi tí `r` jẹ ìpamọ́ "ìfójúsójú" iye.

Bákan náà ni báyìí `v` ó máa ń mú kí àdéhùn náà yàtọ̀ síra ní gbogbo ìgbà, nítorí pé `r` Awọn ohun-ini meji ti a fẹ nikẹhin mejeeji mu:

![ì í ì °ë¦¬í ë ¤](/content-images/image-17-3ec4617665.webp)

Láti **ṣí** (fi hàn) àdéhùn náà nígbà tó bá yá, o máa ń tẹ `v` àti `r`; ẹnikẹ́ni tó bá ṣe àtúnṣirò `H(v, r)` èyí ni àpò ìwé tí wọ́n fi òǹtẹ̀ dì láti inú Àpilẹ̀kọ Kẹwàá, tí a ṣe bí ẹni pé ó wà lóòótọ́.

> **Ohun méjì tó yẹ kó o máa fi sọ́kàn títí ayé:** *ìdìmú* wá látinú bí hash náà ṣe ń dènà ìkọlù; *ìfipamọ́* wá láti inú ohun tó ń fọ́jú lọ́nà àìròtẹ́lẹ̀ `r`.

---

## 4. Ọ̀nà méjì tó o lè gbà ṣe àpò ìwé náà

Àwọn ohun èlò méjì ló wà, Zcash sì ń lo àwọn méjèèjì.

| | **Ifaramo ti o da lori Hash** | **Ìfẹ́ Pedersen** (láti inú Àpilẹ̀kọ 2) |
|---|---|---|
| Ohunelo ohunelo | `H(v, r)` | `v.G + r.H` (àwọn ojú àmì lórí ìlà kan) |
| Fipamọ́ sí | lairotẹlẹ `r` | lairotẹlẹ `r` |
| Ìdè láti | resistance ikọlu | Ìlẹ̀kùn ìtẹ̀gùn elliptic-curve (ECDLP) |
| Agbara pataki | rọrun ati ki o yara | Àwọn ìlérí **ṣe àfikún** (àwòrán oníṣe) |

Ìlà ìkẹyìn yìí ni ìdí tí àwọn àdéhùn Pedersen fi ṣe pàtàkì púpọ̀ nínú Zcash. `commit(v_1) + commit(v_2)` jẹ́ ìwé-ìwé tó bágbà mu `commit(v_1 + v_2)`, àgbékalẹ̀ náà lè fi hàn nígbà tí ó bá yá pé owó tó wọlé dọ́gba sí owó tó jáde nípa fífi àwọn àdéhùn pọ̀, gbogbo rẹ̀ láìsí wípé iye kan ṣoṣo.

---

## 5. A subtlety ti o shapes gbogbo awọn Zcash: ZK-ọfẹ hashing

Eyi ni imọran ti ọpọlọpọ awọn ifihan fi silẹ, ati pe o jẹ gangan aaye "matematika pade imọ-ẹrọ" ti o tọ lati ṣe afihan.

SHA-256 is a superb fingerprint for everyday computing. But Zcash doesn't just *compute* hashes; it has to **prove, inside a zero-knowledge proof, that a hash was computed correctly** (Article 5 explains why). And here's the catch: a zero-knowledge proof works in the language of **finite-field arithmetic** (Article 1), while SHA-256 is built from bit-twiddling operations (shifts, ANDs, XORs). Expressing all that bit-twiddling in field arithmetic is enormously expensive, making proofs huge and slow.

Nítorí náà, àwọn onímọ̀ ìjìnlẹ̀ tí wọ́n ń kọ Zcash ṣe àdàkọ àwọn iṣẹ́ hash tí àwọn èròjà inú rẹ̀ jẹ́ ìṣirò pápá, èyí tí ó jẹ́ kí wọn má náwó láti fi hàn pé:

![ì í ì °ë¦¬í ë ¤](/content-images/image-18-89ade807ad.webp)

Ìfúnnilókun ẹ̀rọ yìí nìkan, * "ó gbọ́dọ̀ jẹ́ òwò díẹ̀ láti fi hàn",* ni ìdí tí Zcash fi ṣe àdàkọ àti gbígba àwọn iṣẹ́ hash àkànṣe dípò wíwá SHA-256 níbi gbogbo.

---

## 6. Ibi tí èyí ń gbé ní Zcash

Zcash ti lo awọn hash oriṣiriṣi kọja awọn apẹrẹ rẹ, ọkọọkan ti a yan fun iṣẹ naa:

| Apẹrẹ | Àwọn ìṣẹ́ tí a lò | Nibo |
|---|---|---|
| **Sprout** (àkọ́kọ́) | **SHA-256** | Ṣe akiyesi awọn ileri ati igi naa |
| **Sapling** | **Pedersen hashes**, pẹlu **BLAKE2** | Pedersen fún àwọn ìlérí àkọsílẹ̀ àti igi Merkle; BLAKE2 fún ìyọrísí pàtàkì àti àwọn ohun tí kò ní ìtumọ̀ |
| **Orchard** (lọ́wọ́lọ́wọ́) | **Sinsemilla**, pẹlu **Poseidon** | Sinsemilla fún àwọn ìlérí àkọsílẹ̀ àti igi Merkle; Poseidon fún àwọn ohun tí ó ń parọ́, gbogbo wọn ni a ṣe fún àwọn àyíká ìṣirò |

The names to recognize are **Pedersen** and **Sinsemilla** (commitment-style hashes built from curve points, so they inherit the "adds up" superpower and prove cheaply) and **Poseidon** (a field-arithmetic hash purpose-built for zero-knowledge circuits). When Article 0 said a note's contents are sealed into a commitment, *this* is the machinery doing the sealing.

So the open loop from Article 0, *"how can a sealed envelope hide its contents yet be impossible to forge?"*, is now closed: **hiding from a random blinding factor, binding from collision resistance or the curve trapdoor.**

---

## 7. Ẹni tó jẹ́ olóòótọ́ máa ń sọ pé òun ò jẹ̀bi

A ṣe simplified lati jẹ ki awọn nkan mọ. `v` àti `r` are encoded and which generators are used; "hiding" and "binding" each come in flavours (perfect vs computational) with precise security definitions; and we didn't show the internals of Pedersen, Sinsemilla, or Poseidon. None of that changes the intuition: a commitment is a fingerprint plus randomness that hides now and binds forever. The details return, flagged, when the protocol article needs them.

---

## 8. Àkópọ̀

- A **hash function** is a **fingerprint for data**: deterministic, fast forwards, one-way, collision resistant, with an **avalanche effect** (one bit in, a totally different fingerprint out).
- Àdéhùn jẹ́ kó o lè fi iye kan hàn ní gbangba nísinsìnyí, kó o sì fi hàn nígbà tó bá yá láìsí pé o lè parọ́.
- Fífi òǹtẹ̀ ìka tó wà níhòòhò jáde `H(v)` ó máa ń so, àmọ́ kì í fi ara pamọ. `H(v, r)`, ṣe àtúnṣe sí èyí: `r`, dídì láti inú resistance ìkọlù.**
- Zcash nlo awọn adehun ** hash-based ** ati ** Pedersen **; Awọn adehun Pedersen ni afikun ** ṣafikun **, eyiti Abala 6 yoo lo lati fi idi iwontunwonsi iye han ni ikọkọ.
- Nitori awọn hash gbọdọ jẹ ** ti a fi idi rẹ mulẹ ** laarin awọn ẹri-imọ-odo odo, Zcash nlo awọn hashes ** ọrẹ-ZK** ti a kọ lati inu iṣiro aaye (Pedersen **, Sinsemilla **, Poseidon **) dipo SHA-256 nibi gbogbo.

---

## Àkójọ àwọn ọ̀rọ̀

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| **Iṣẹ́ Hash** | Ó fọ́ gbogbo ìwífún sínú ìka ọwọ́ kúkúrú tí a ti yípadà (ìwé) |
| **Ìròyìn** | Ìtẹ̀jáde ìtẹ̀jáde iṣẹ́ hash kan |
| **Idilọwọ aworan iwaju** | Kò le yí ìṣàyẹ̀wò padà sí ìtẹ̀síwájú rẹ̀ (ọ̀nà kan ṣoṣo) |
| **Idilọwọ ikọlu** | Kò le rí àwọn ìtẹ̀síwájú méjì pẹ̀lú ìṣàfihàn kan náà |
| **Ipa òjò dídì** | Àyípadà ìṣírò kékeré kan yí ìṣàyẹ̀wò padà pátápátá |
| **Ìfaramọ́** | Ti iye kan pa nisinsinyi, ṣafihan nigbamii, ko le purọ nipa rẹ |
| **Okùnfà ìfọ́jú (`r`)** | Nọ́mbà tuntun tí a kò lè rí tí ó ń fi ìfaramọ́ pamọ́ |
| **Hash ti o ni ore-ZK** | Hash tí a fi ìṣirò pápá kọ́, nítorí náà ó rọrùn láti fi hàn |

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

** Kí ló dé tí ẹ kò fi ṣe àdàkọ iye dípò kí ẹ ṣe é?**
ìdìbò jẹ́ nípa *àṣírí tí o lè tú nígbà tó bá yá.* ìyàsímímọ́ jẹ́ nipa *ìfẹnukò*: ìdánilójú pé o kò le yí ìdáhùn rẹ padà nígbà tó ba yá. àwọn iṣẹ́ tó yàtọ̀ síra.

**Ti awọn adehun ba fi iye pamọ, bawo ni ẹnikẹni ṣe ṣayẹwo awọn ofin?**
Iyẹn ni ipa ti awọn ẹri-imọ-nọmba (Abala 5): wọn fihan pe iye ti o farapamọ tẹriba fun awọn ofin laisi fifihan rẹ.

**Ṣé SHA-256 ti bàjẹ́, níwọ̀n bí Zcash ti ń yẹra fún un láwọn ibì kan?**
Ko. SHA-256 dara ati Zcash ṣi nlo rẹ. O jẹ gbowolori lati * fihan inu iyipo kan *, eyiti o jẹ idi ti awọn hashes ọrẹ-ZK wa fun iṣẹ pataki yẹn.

**Ibo ni àwọn tí kò mọ nǹkan ṣe `r` ta ló wá ṣe é, ta ló sì ń lò ó?**
It's generated freshly when the note is created and known to the note's owner. It's part of what makes each note unique and private.

---

### Wádìí ohun tó wà lọ́kàn rẹ

O ṣe adehun si asọtẹlẹ idibo rẹ bi `H(v, r)` ọ̀rẹ́ mi kan sọ pé kó o tẹ ìwé náà jáde. `H(v)` kí a lè sọ ọ́ ní ọ̀rọ̀ díẹ̀díẹ̀, kí ló dé tí èyí fi jẹ́ èrò tí kò dára bí ó bá jẹ́ pé àbájáde méjì péré ló wà? *

<details><summary>Answer</summary>

Níwọ̀n ìgbà tí àbájáde méjì péré ti wà, ọ̀rẹ́ rẹ lè ṣe ìṣirò `H("win")` àti `H("lose")` ara wọn ki o si afiwe lodi si rẹ atejade ṣajọ, lẹsẹkẹsẹ eko rẹ asọtẹlẹ. `r` ni ohun ti o duro yi wo-ati-ṣayẹwo kolu.
</details>

---

### Kí ló tún ń bọ̀?

Àpilẹ̀kọ kẹrin: A ní àràádọ́ta ọ̀kẹ́ àwọn àdéhùn tí ó ń kóra jọ. Àpilẹ̀kọ 4 fi hàn bí Zcash ṣe ń ṣètò wọn sínú igi kan tí ẹ̀rí ìsàlẹ̀ rẹ̀ díẹ̀ dúró fún gbogbo ìtàn, àti bí o ṣe lè fi hàn pé nótì rẹ wà nínú igi náà láìfi èyí tí ó wà hàn. Èyí ni ojúlówó ìrísí "àpótí àkọsílẹ̀" ti Àpínlẹ̀ 0.

* Apá kan nínú àwọn* Zcash láti Àwọn Ìlànà Àkọ́kọ́ *series fún [ZecHub](https://zechub.org)Àdàkọ CC BY-SA 4.0.*

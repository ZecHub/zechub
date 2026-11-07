# Ɣaɣla [Shielded] Protocol, Ƒe Godoo Katã
##### Nugbegbe ƒe Nudzodzro tso [Annkkitaaa](https://github.com/Annkkitaaa) gbɔ

![alt text](/content-images/image-27-4094293ec0.webp)

### Nu siawo katã ƒe ƒoƒo ɖe ɣaɣla Zcash gaɖoɖo [transaction] ɖeka me

> **Ƒometɔƒo:** *Zcash tso Gɔmedzedze Ƒe Gɔmeɖosewo Me* . **Agbalẽ 6 . Ɣaɣla Protocol** (nuwuwu)
> **Ame siwo wòŋlɔ na:** Ame yeye siwo xlẽ Agbalẽ 0 va se 5. Afisiae nu katã doa ƒo.
> **Nu si nàva kplɔ ayi:** Nunya ƒe nɔnɔme blibo, si le ete ŋu le ɣaɣla Zcash gaɖoɖo ŋu, eye ƒometɔƒo la me ƒe nuxexlẽwo katã le woƒe teƒe nyuitɔ me, eye Agbalẽ 0 me ƒe ɣletiviwo katã woƒo.

Míedze egɔme le [Agbalẽ 0](article-0-shielded-transaction.md) me kple kpɔɖeŋu dze siwo me mɔme le, eye míeƒo nu tso agbalẽwo siwo wòtu ƒo ɖe kplɔŋlɔ dzikpɔa dzi. Emegbe míetsɔ agbalẽ atɔ̃ tu akpaawo: field siwo wòɖe kpɔ, elliptic curves, adzɔgbeɖeɖe [commitments], Merkle tiwo, kple zero-knowledge ɖaseɖigbalɛwo [proofs]. Fifia míatsɔ wo ado ƒo eye míakpɔ ale si fexexe ɣaɣla aɖe wɔe tso gɔmedzedze va se nuwuwu.

---

## 1. Nu ka tae wòle be nàtsɔe ɖe asi?

Ne wòkpɔ ɖeka ɖeka la, akpa siwo katã nèsrɔ la wɔnɔŋlɔ le. Ke Zcash ƒe *nukunɔamesi* le ale si woƒoa ƒo kple wo nɔewo. Gaɣaɣla ɖeɖe dzesi [nullifier] ɖeka ko mena ɣaɣla o. Adzɔgbeɖeɖe ɖeka ko metea mɔ aɖe tso aɖaŋudzedze ŋu o. Ɖaseɖigbalɛ ɖeka ko meɖea nu si anyi ŋu o. **Ƒoƒo** lae trɔ akpa atɔ̃ la wo zu ga si le ɣaɣla me eye wòle dzɔdzɔe hã.

Agbalẽ sia nye ƒoƒo la. Ne nàwu la, nyagblɔɖi sia *"mɔ̃ la doa gaɖoɖo aɖe si wòmate ŋu akpɔ ƒe nyateƒe ɖe asi"* ava natsɔe abe kpɔɖeŋu dze si me mɔme le o, ke boŋ abe nu si dze ƒe akpa siwo nèse gɔme xoxo me ene.

---

## 2. Ame siwo le nya la me, woƒo ƒo ake

Esi nye ƒometɔƒo blibo la le axa ɖeka dzi, wòtsɔ Agbalẽ 0 ƒe nya la ƒe akpaawo sɔ kple mɔ̃ la ƒe wɔwɔnuwo.

| Agbalẽ 0 ƒe nya ƒe akpa | Wɔwɔnu vevi | Woetu tso |
|---|---|---|
| Ga si le agbalẽ me | **Didienu [Note]** (asixɔxɔ, ame si wòle be wòaxɔe, random nudzɔdzɔ) | woŋlɔe abe field ƒe elements ene (Agb 1) |
| Agbalẽ si wòtu eye wòle kpeŋkpeŋ | **Didienu ƒe adzɔgbeɖeɖe [Note commitment]** | Pedersen / Sinsemilla adzɔgbeɖeɖe (Agb 2, 3) |
| Kplɔŋlɔ dzikpɔa | **Didienu ƒe adzɔgbeɖeɖe ti [Note commitment tree]** (anchor = etɔ) | Merkle ti si wòle gɔmeɖoɖo me (Agb 4) |
| Dzodzro token | **Gaɣaɣla ɖeɖe dzesi [Nullifier]** | ZK-dze hash si wòle didienu kple klu si me ame aɖe ko nya me (Agb 2, 3) |
| "Ga si ge ɖe eme sɔ kple ga si doa tso eme" | **Asixɔxɔ ƒe adzɔgbeɖeɖewo [Value commitments] + balance ƒe kpɔkpɔ** | Pedersen adzɔgbeɖeɖewo siwo le homomorphic (Agb 2, 3) |
| Nukunɔamesi si le avɔ la megbe | **Zero-knowledge ɖaseɖigbalɛ [Zero-knowledge proof]** | zk-SNARK le arithmetic circuit aɖe dzi (Agb 5) |
| "Wò ko ate ŋu axlẽ wò agbalẽ" | **Didienu si wòɣlaŋlɔ [Encrypted note] + nukpɔsafuiwo [viewing keys]** | ɣaɣlaŋlɔŋlɔ [encryption] + kluwo ƒe ƒomeɖoɖo (agbalẽ sia) |

---

## 3. Afisi kluwo tso

Nu si katã ame aɖe ate ŋu awɔ la tsoa klu ɣaɣla ɖeka, si nye **gazazãsafui [spending key]**, to mɔ ɖeka ƒe ƒomeɖoɖo me (ama ɖeka ɖeka fia dzedze si mate ŋu atrɔ megbe o, le Articles 2 kple 3 me ƒe trapdoorwo ƒe amenuveve me):

![alt text](/content-images/image-32-f443f9bb72.webp)

Nu eve si dze be nàkpɔe, elabena wo katã tsoa agbalẽ siwo do ŋgɔ me:

- Mamã la na wòte ŋu nàtsɔ **nukpɔsafui [viewing key]** aɖe na ame aɖe (abe auditor ene), si fia wò gaɖoɖowo **ke mena mɔ be wòatsɔe afexɛ o.** Ɣaɣla nye nu si woate ŋu atia, menye nu sia katã alo melẽ o.
- Dzedze ɖeka ɖeka nye **mɔ ɖeka:** nukpɔsafui aɖe si ame le asi me mate ŋu ana ame ma ate ŋu axɔ gazazãsafui la gbɔ o; enye elliptic-curve trapdoor tso Agbalẽ 2 me, si wɔa eƒe dɔ.

---

## 4. Didienu aɖe fexexe: nyateƒe ene

Ne wòdi be nàfexɛ didienu aɖe le ɣaɣla me la, ele be nàde dzesi na mɔ̃ la be nyateƒe ene le eme ɖe ɣeyiɣi ɖeka me **eye mèfia didienu la, eƒe asixɔxɔ, eƒe nɔƒe, alo wòame nyenye o.** Nyateƒe ɖeka ɖeka xɔa dzadzraɖoɖo aɖe si nènya xoxo.

![alt text](/content-images/image-31-86309af194.webp)

Ɖaseɖigbalɛ la mefia nyateƒe siwo le ete **kuraa o** (didienu kae, ame ka ƒe klu, asixɔxɔ kae). Efiya ko be *nyateƒe ene la katã le eme.* Esiae nye ɣaɣla Zcash ƒe nukunu blibo, abe woɖee fia le nɔnɔmetata ɖeka me ene.

---

## 5. Asixɔxɔ-balance ƒe mɔ (nu vevi si míede ɖe megbe)

Le Articles 2 kple 3 me la, míegblɔ be Pedersen adzɔgbeɖeɖewo **doa ƒo**: adzɔgbeɖeɖe si le `v_1` ŋu kple adzɔgbeɖeɖe si le `v_2` ŋu nye adzɔgbeɖeɖe le `v_1 + v_2` ŋu. Afisiae mɔ na wòkpɔ eƒe vi.

Didienu si ge ɖe eme kple si doa tso eme ɖeka ɖeka tsɔa **asixɔxɔ ƒe adzɔgbeɖeɖe**: Pedersen adzɔgbeɖeɖe `v.G + r.H` si ɣla eƒe asixɔxɔ `v`. Esi woate ŋu ado wo ƒo la, mɔ̃ la ate ŋu awɔ:

```
(sum of input value commitments) − (sum of output value commitments)
```

Ne gaɖoɖo la le balance me (wo mewɔ ga yeye alo womegbã ga aɖe o) la, `v` ƒe akpaawo ɖoa ɖe eɖokui me bliboe, eye adzɔgbeɖeɖe koe nɔ anyi ɖe **asixɔxɔ mema** ŋu, si wòɣla kple random nudzɔdzɔ si nɔ anyi. Ame si do ga ɖe la dea dzesi be wònya random nudzɔdzɔ si nɔ anyi ma to asidede agbalẽ te [signature] sue aɖe si woyɔna be **binding signature**. Binding signature si le nyateƒe me ate ŋu anɔ anyi ne asixɔxɔwo sɔ ko, **ke womefia asixɔxɔ aɖeke o.**

> Esiae nye kpɔɖeŋu kɔkɔe wu le ƒometɔƒo sia katã me tso *nu ka tae* míexɔ hia homomorphic, curve-based adzɔgbeɖeɖewo. Wosena se "ga si ge ɖe eme sɔ kple ga si doa tso eme" la to **agbalẽ siwo wòtu ƒo ƒo** kple kpɔkpɔ be nu si doa tso eme la tu ɖe mema.

---

## 6. Gaɖoɖo blibo aɖe, wòkpɔe tso gɔmedzedze va se nuwuwu

Míatsɔ Alice ƒe fexexe na Bob ado ƒo. Míatsɔ Sapling ƒe "fexexe ƒe akpa / output ƒe akpa" nɔnɔme kɔkɔe la awɔa abe nufiaƒe ƒe model ene.

**Ɣaɣla gaɖoɖo aɖe ƒoa nyati ƒomevi eve:**

| Fexexe ƒe nyati (exɔa didienu) | Output ƒe nyati (wɔa didienu yeye) |
|---|---|
| asixɔxɔ ƒe adzɔgbeɖeɖe le input la ŋu | asixɔxɔ ƒe adzɔgbeɖeɖe le output la ŋu |
| **anchor** si wòdea ɖaseɖigbalɛ ɖe eŋu (ti ƒe tɔ) | **didienu ƒe adzɔgbeɖeɖe** yeye (aƒe yeye) |
| didienu si wòfexɛ ƒe **gaɣaɣla ɖeɖe dzesi** | **klũ le ɣeyiɣi kpui me** na ɣaɣlaŋlɔŋlɔ |
| dukɔme klu si wòtrɔ random kple fexexe ƒe mɔɖeɖe asidede agbalẽ te | **didienu si wòɣlaŋlɔ** (ciphertext na ame si wòaxɔe) |
| **zk-SNARK** si dea ɖaseɖigbalɛ ɖe nyateƒe ene la ŋu | **zk-SNARK** si dea ɖaseɖigbalɛ be output la wɔa dɔ nyuie |

Eye **binding signature** ɖeka le bundle la katã ŋu, si sena asixɔxɔ-balance ƒe se (Akpa 5).

![alt text](/content-images/image-30-98511eb2d0.webp)

Kpɔ ɣaɣla la: mɔ̃ la kpɔ anchor la, wòkpɔ be gaɣaɣla ɖeɖe dzesi la menye esime wozãe xoxo o, wòkpɔ ɖaseɖigbalɛ la, eye wòkpɔ balance la. Wòxɔ fexexe dzɔdzɔ aɖe **eye wòmesrɔ asixɔxɔ aɖeke, gaɖoƒe ƒe dzesi aɖeke, eye wòmenya didienu kae wòfexɛ o.** Le ɣeyiɣi ma ke me la, didienu si wòfexɛ ƒe **gaɣaɣla ɖeɖe dzesi** (eƒe ku) kple Bob ƒe **adzɔgbeɖeɖe** yeye (eƒe didienu ƒe dzidzi) le dukɔme nɔnɔme ƒomevi eve me, eye mɔ ka aɖeke menye wo dome o; esiae nye kadodo si wotso le Agbalẽ 0 me.

---

## 7. Agbalẽ 0 ƒe ɣletiviwo katã ƒoƒo

Agbalẽ 0 dzra biabiawo ɖe ŋgɔ le intentional. Afisia wo katã le, woƒo.

| Ɣleti si wòke ɖe ŋgɔ le Agbalẽ 0 me | Woƒoe kple |
|---|---|
| Aleke agbalẽ si wòtu ke woate ŋu aɖo ŋu wòmefia nusi le eme, eye mele aɖaŋudze o? | Adzɔgbeɖeɖewo: ɣaɣla tsoa random nudzɔdzɔ me, kpekpeɖeŋu tsoa collision resistance / curve trapdoor me (Agb 3) |
| Afikae kluwo kple wɔwɔ ƒe nya ɣaɣlawo tsoa? | Field ƒe calculus kple elliptic-curve scalar multiplication (Agb 1, 2) |
| Nu kae nye "kplɔŋlɔ dzikpɔa" tututu? | Didienu ƒe adzɔgbeɖeɖewo ƒe Merkle ti si le gɔmeɖoɖo me; etɔ nye anchor (Agb 4) |
| Nu ka tae wo mate ŋu aka dzodzro token la ɖe eƒe agbalẽ ŋu o? | Gaɣaɣla ɖeɖe dzesi la nye keyed hash si le setsiaa aɖe me vovo na adzɔgbeɖeɖewo (Agb 2, 3, 4) |
| Aleke wòate ŋu aɖe dzɔdzɔme ƒe ɖaseɖigbalɛ eye mèfia naneke o? | zk-SNARK le arithmetic circuit aɖe dzi si me nyateƒe ene la katã le (Agb 5) |
| Aleke ame si wòaxɔa nu nya be wòxɔ fexexe? | Woɣlaŋlɔ didienu la na woƒe gaɖoƒe ƒe dzesi; wotrial-decrypt e kple nukpɔsafui (agbalẽ sia) |
| Aleke wosena se "ga si ge ɖe eme = ga si doa tso eme" le ɣaɣla me? | Homomorphic asixɔxɔ ƒe adzɔgbeɖeɖewo + binding signature (Akpa 5) |

Kpɔɖeŋu dze si me mɔme le tso axa gbãtɔ dzi, *kpɔ nyateƒe ɖe nu si mèkpɔ o ŋu*, fifia bu ɖe anyi bliboe. Mɔ̃ la dea ɖaseɖigbalɛ ɖe **nyateƒe siwo le data ɣla la ŋu**, ke menye data la ŋutɔ ŋu o.

---

## 8. Sapling kple Orchard, le gbɔgbɔ ɖeka me

Míefia kple Sapling ƒe nɔnɔme elabena eƒe mamã la dze kɔkɔe wu. Nɔnɔme si le fifia, **Orchard**, wɔa nyuie ɖe nyati siawo ŋu ke menye be wòtrɔ wo ɖe teƒe bubu o:

| | **Sapling** | **Orchard** |
|---|---|---|
| Gaɖoɖo ƒe unit | **Spend** kple **Output** nyati siwo le vovo | **Actions** siwo wòƒo ɖeka (ɖeka ɖeka wɔa fexexe ɖeka + output ɖeka) |
| Ɖaseɖigbalɛ ƒe nɔnɔme | **Groth16** (mɔ̃ ƒe ɖoɖo xexlẽnuwo [trusted setup]) | **Halo 2** (mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o) |
| Curves | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Adzɔgbeɖeɖe ƒe hash | Pedersen | Sinsemilla |

Nuxexlẽ sia me ƒe nyati ɖeka ɖeka yia edzi tẽe; Orchard ƒoa fexexe kple output ƒe akpaawo ɖeka, eye wòtrɔ ɖaseɖigbalɛ ƒe nɔnɔme la kple esi me ceremony mele o. Ti atɔ̃ la metrɔ o.

---

## 9. Nya si le nyateƒe me

Esiae nye nɔnɔmetata blibo wu le ƒometɔƒo sia me, ke eganye model ko hã. Míekpɔ didienu ƒe field encodings tututu, klu ƒe dzedze ƒe formula siwo tututu, spend kluwo ƒe re-randomization, gaɖoƒe ƒe dzesi siwo le vovototo me, nya kpui [memo] ƒe fields, adzɔ [fee] ƒe wɔwɔ, vovototo si le asixɔxɔ ƒe adzɔgbeɖeɖewo kple didienu ƒe adzɔgbeɖeɖewo dome le nyati blibo me, kple asidede agbalẽ te ɖeka ɖeka ƒe dɔ tututu me ɖe kpui. Míefia mɔ ɖeka si wòzu kpɔɖeŋu hã; gaɖoɖo siwo le nyateƒe me ate ŋu akplɔ fexexewo kple output geɖe ɖe ɣeyiɣi ɖeka me eye woate ŋu aɖe transparent kple ɣaɣla ƒe akpaawo ƒo. Nya si le ŋusẽ wu nye Zcash Protocol Specification. Nu si nèle asi fifia nye nɔnɔme dzɔdzɔ; specification la tsɔa neƒe wɔwɔwo katã ɖe eme.

---

## 10. Nyatakakawo ƒe ƒome

- Ɣaɣla gaɖoɖo aɖe ƒoa akpa atɔ̃ la katã ɖeka: **didienu** (asixɔxɔ la), eƒe **adzɔgbeɖeɖe** le **didienu ƒe adzɔgbeɖeɖe ti** me, **gaɣaɣla ɖeɖe dzesi** be wòanɔ te ɖe fexexe eveli ŋu, **asixɔxɔ ƒe adzɔgbeɖeɖewo** na balance, kple **zk-SNARK** si bla wo katã ɖeka.
- Fexexe dea ɖaseɖigbalɛ ɖe **nyateƒe ene ɖe ɣeyiɣi ɖeka me**: didienu la le anyi, wòxɔ mɔ be nàfexɛe, eƒe gaɣaɣla ɖeɖe dzesi le nyateƒe me, eye asixɔxɔwo sɔ, le **zero knowledge** me, eye wòmefia nyateƒe siwo le ete aɖeke o.
- **Asixɔxɔ-balance** le se me to **homomorphic adzɔgbeɖeɖewo ƒe tsɔtsɔƒo** kple kpɔkpɔ be wotu ɖe mema, to **binding signature** la dzi, eye womefia asixɔxɔ aɖeke o.
- Ame aɖe ƒe ŋusẽwo tsoa **gazazãsafui** ɖeka me to **mɔ ɖeka ƒe ƒomeɖoɖo** me, si na **nukpɔsafuiwo** fia nuwo eye mena fexexe ƒe ŋusẽ o.
- Mɔ̃ la **dea ɖaseɖigbalɛ ɖe nyateƒe siwo le data ɣla la ŋu**, si bu kpɔɖeŋu dze si me mɔme le tso Agbalẽ 0 me, si le kpɔkpɔ kple ɣaɣla dome, ɖe anyi. Ɣleti siwo katã wòke ɖe ŋgɔ le afi ma la woƒo fifia.
- **Orchard** wɔa nyuie ɖe **Sapling** ŋu (Actions siwo wòƒo ɖeka, Halo 2 si me mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o, Pasta curves, Sinsemilla) eye ti atɔ̃ la metrɔ o.

---

## Nyawo ƒe gɔmeɖeɖe

| Nya | Gɔmeɖeɖe bɔbɔe |
|---|---|
| **Spending key** | Klu ɣaɣla gɔmedzedze ɖeka si ame aɖe ƒe kluwo katã tsoa |
| **Viewing Key** | Efia wò gaɖoɖowo na ame si tsɔe le asi me, ke mena mɔ be wòafexɛ o |
| **Spend description** | Tx ƒe akpa si exɔa didienu aɖe (gaɣaɣla ɖeɖe dzesi, anchor, ɖaseɖigbalɛ) |
| **Output description** | Tx ƒe akpa si wɔa didienu aɖe (adzɔgbeɖeɖe, ciphertext, ɖaseɖigbalɛ) |
| **Action (Orchard)** | Unit ɖeka si wòƒo, si wɔa fexexe ɖeka kple output ɖeka ɖeka |
| **Value commitment** | Pedersen adzɔgbeɖeɖe homomorphic le asixɔxɔ aɖe ŋu |
| **Binding signature** | Asidede agbalẽ te si dea ɖaseɖigbalɛ be asixɔxɔwo sɔ eye wòmefia wo o |
| **Anchor** | Ti ƒe tɔ si fexexe aɖe dea membership ƒe ɖaseɖigbalɛ ɖe eŋu |
| **Trial decryption** | Ame si axɔa nu doa adzɔgbeɖeɖe yeye ɖe nudzodzro me be wòakpɔ didienu siwo wole be woanɔ eya tɔwo |

---

## Biabia siwo woƒoa gbeɖe

**Mɔ̃ la kpɔa asixɔxɔ alo ame si fe na ame ka mahã kpɔa?**
Ao. Wòkpɔa ɖaseɖigbalɛ la, be gaɣaɣla ɖeɖe dzesi la yenye yeye, anchor la, kple binding signature la. Asixɔxɔ ɣaɣlawo katã nɔa ɣla.

**Nu kae atɔ mɔ nam be mafexɛ didienu ɖeka zi eve?**
Gaɣaɣla ɖeɖe dzesi la. Fexexe la doa e ɖe go; mɔ̃ la gbea gaɣaɣla ɖeɖe dzesi ɖeka ɖe sia si le gaɣaɣla ɖeɖe dzesi ƒe set la me xoxo. Didienu ma ke nana gaɣaɣla ɖeɖe dzesi ma ke ɣesiaɣi.

**Aleke woate ŋu akpɔ balance ne asixɔxɔwo le ɣla?**
Asixɔxɔ ƒe adzɔgbeɖeɖewo doa ƒo homomorphically; gaɖoɖo si le balance me ƒe adzɔgbeɖeɖewo ɖoa ɖe adzɔgbeɖeɖe mema, si binding signature la dea ɖaseɖigbalɛ ɖe eŋu.

**Mate ŋu ade ɖaseɖigbalɛ ɖe nye gaɖoɖowo ŋu na auditor aɖe eye megbe nye ŋusẽ o?**
Ẽ. Na nukpɔsafui aɖe. Efiya wò ɣaɣla ƒe nudzɔdzrowo, ke wòmate ŋu axɔ mɔ na fexexe o, le klu ƒe ƒomeɖoɖo mɔ ɖeka la ta.

**Sapling va zu nu si mehiã o esi Orchard le anyi?**
Wo eve katã nɔ mɔ̃ la dzi; Orchard nye nɔnɔme si le fifia. Nyatiwo le wo dome ɖeka, eyata ne nèse ɖeka gɔme la, nèse bubu hã gɔme.

---

### Ɖo wò nunyamekpɔkpɔ ɖe nudzodzro me

Xɔlɔ aɖe gblɔ be: "Esi ɖaseɖigbalɛ la ɣla asixɔxɔ la, fiavi aɖe ate ŋu agblɔ ko be eƒe outputwo ƒe asixɔxɔ le dɔme wu eƒe inputwo eye wòawɔ ga blaa." Tsɔ Akpa 5 dzi, gblɔ le nyagblɔɖi eve me nu ka tae esia mate ŋu ava eme o. *(Ŋuɖoɖo le ete.)*

<details><summary>Ŋuɖoɖo</summary>

Asixɔxɔwo le ɣla, ke woɖeka ɖeka wòtu ɖe homomorphic asixɔxɔ ƒe adzɔgbeɖeɖe me, eye mɔ̃ la tsɔa input ƒe adzɔgbeɖeɖewo katã doa ƒo eye wòlea output ƒe adzɔgbeɖeɖewo katã ƒe nu; ne asixɔxɔ ɣaɣlawo mesɔ o la, nu si doa tso eme la matu ɖe mema o eye **wo mate ŋu awɔ binding signature dzɔdzɔ aɖeke o.** Fiavi la ate ŋu aɣla *nène*, ke wòmate ŋu ana asixɔxɔ siwo mesɔ o ava pasa balance ƒe kpɔkpɔ la o; eyata ga blaa wɔwɔ mate ŋu ava eme o, togbɔ be wòfia naneke o hã, arithmetic la akpɔe.
</details>

---

### Ƒometɔƒo la, blibo

Fifia nèzɔ tso kpɔɖeŋu dze si me mɔme le ɖeka me va se fexexe ɣaɣla blibo aɖe:

![alt text](/content-images/cd8bbb40-57b8-4854-b9cf-97f2485d126a-8847fae521.webp)


Tso afisia la, mɔ si dze be woatoe yia eme wu: Groth16 kple Halo 2 ƒe wɔwɔ le eme, mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe ceremonywo, Sapling kple Orchard circuits ƒe nyatiwo, klu ƒe dzedze kple gaɖoƒe ƒe dzesi siwo le vovototo me, kple protocol la ƒe trɔtrɔ to mɔ̃ ƒe sewo trɔtrɔ [network upgrades] me. Ke gɔmeɖoɖo la le teƒe fifia, eye nyati siawo ɖeka ɖeka kpɔ teƒe si wòate ŋu abla ɖe eŋu.

*Enye akpa le* Zcash tso Gɔmedzedze Ƒe Gɔmeɖosewo Me *ƒometɔƒo la me na [ZecHub](https://zechub.org). Licensed CC BY-SA 4.0.*

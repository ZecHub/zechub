# The Shielded Protocol, Nuwuwu vaseɖe Nuwuwu
##### Numekuku Gbãtɔ tso [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nuŋɔŋlɔ](image-27.png)

### Kakɛ ɖesiaɖe ƒoƒo ƒu ɖe Zcash ƒe asitsatsa ɖeka si nye ame ŋutɔ tɔ me

> **Series:** *Zcash tso Gɔmeɖose Gbãtɔwo me* . **Nyati 6 lia . Ðoɖowɔɖi si Wokpɔ Ðe Eŋu** (mlɔetɔ) .
> **Nyaselawo:** ame yeye siwo xlẽ Nyati 0 vaseɖe 5. Afi siae nusianu do ƒome le.
> **Nusi nàgblẽ ɖi:** susu ƒe kpɔɖeŋu blibo, si sɔ si nye Zcash ƒe asitsatsa si wokpɔ ta na, kple susu ɖesiaɖe tso nusiwo kplɔ wo nɔewo ɖo me le eƒe teƒe nyuitɔ, eye wotu loop ɖesiaɖe tso Se 0 me.

Míedze egɔme, le [Nyati 0](article-0-shielded-transaction.md), si me nya aɖe si tsi tre ɖe wo nɔewo ŋu kple ŋutinya aɖe si ku ɖe agbalẽkotoku siwo wotre nu na le dutoƒoɖaka aɖe dzi ŋu. Emegbe míezã nyati atɔ̃ tsɔ tu akpaawo: agble siwo seɖoƒe li na, elliptic curves, commitments, Merkle-tiwo, kple zero-knowledge proofs. Fifia míeƒoa wo nu ƒu hekpɔa ame ŋutɔ ƒe fexexe ƒe dɔ ŋutɔŋutɔ, tsoa gɔmedzedze vaseɖe nuwuwu.

---

## 1. Nu ka tae wòle be nàtsɔ ɖe le eme?

Le ame ɖekaɖekawo gome la, akpa ɖesiaɖe si nèsrɔ̃ la nye aɖaŋudzedze. Gake Zcash ƒe *akunyawɔwɔ* le alesi wowɔa ɖeka kple wo nɔewo me. Nullifier ɖeɖe menaa ame ŋutɔ ƒe nyawo o. Ðokuitsɔtsɔna ɖeɖe mexea mɔ na aʋatsokaka o. Kpeɖodzi ɖeɖe dzaa meɖo kpe viɖe aɖeke dzi o. Enye **assembly** si trɔa akpa atɔ̃ wozua ga si nye ame ŋutɔ tɔ eye kakaɖedzi le eŋu le ɣeyiɣi ɖeka me.

Nyati siae nye takpekpea. Kaka wòawu enu la, nyagbe *"network la ɖo kpe asitsatsa aɖe si mate ŋu akpɔ o dzi"* mase le eɖokui me abe nusi to vovo ene o ke boŋ abe akpa siwo gɔme nèse xoxo ƒe emetsonu si dze ƒã ene.

---

## 2. Nusi wotsɔ ƒu gbe, si wogbugbɔ ƒo ƒu

Nusiwo katã kplɔ wo nɔewo ɖo le axa ɖeka dzi, siwo wowɔ tso Nyati 0 ƒe ŋutinya dzi va ɖo mɔ̃ ŋutɔŋutɔ dzi lae nye esi.

| Nyati 0 ŋutinya ƒe akpa aɖe | Akpa ŋutɔŋutɔ | Wotue tso |
|---|---|---|
| Ga si le agbalẽkotoku aɖe me | **De dzesii** (asixɔxɔ, amesi xɔe, nusi dzɔ le vome) | woŋlɔe abe agblemenukuwo ene (Art 1) |
| Agbalẽkotoku si me mekɔ o si wotre nu na | **De dzesi ɖokuitsɔtsɔna** | Pedersen / Sinsemilla ƒe ɖokuitsɔtsɔna (Art 2, 3) |
| Dutoƒohabɔbɔa | **De dzesi ɖokuitsɔtsɔna ƒe ati** (seke = eƒe ke) | Merkle-ti si dzina ɖe edzi (Art 4) |
| Dzesi si nye void la | **Nullifier** | a ZK-xɔlɔ̃wɔwɔ hash of note + adzame safui (Art 2, 3) |
| "Ga si le eme sɔ kple ga si dona" | **Asixɔxɔ ƒe ŋugbedodowo + ga si susɔ ƒe dodokpɔ** | homomorphic Pedersen ƒe ŋugbedodowo (Art 2, 3) |
| Akunyawɔwɔ si le xɔmetsovɔa megbe | **Zero-sidzedze ƒe kpeɖodzi** | zk-SNARK le akɔntabubu ƒe nutome sue aɖe dzi (Art 5) |
| "Wò koe ateŋu axlẽ wò agbalẽkotoku" | **Nyatakaka si wotsɔ nya ɣaɣlawo ŋlɔ + nukpɔkpɔ ƒe safuiwo** | encryption + key hierarchy (nyati sia) |

---

## 3. Afisi safuiwo tsona

Nusianu si zãla ate ŋu awɔ la sina tso nya ɣaɣla ɖeka me, si nye **gazazã ƒe safui**, to mɔ ɖeka ƒe ɖoɖo si wowɔna me (aŋutsrɔe ɖesiaɖe nye nusi woɖe tso eme si womate ŋu atrɔ o, le mɔ̃ siwo le Se 2 kple 3 me ƒe mɔɖeɖe te):

![alt nuŋɔŋlɔ](image-32.png)

Nu eve siwo wòle be míade dzesii, wo ame evea siaa nye nyati siwo do ŋgɔ me tsonuwo:

- Mamã la na be nàte ŋu ama **nukpɔkpɔ ƒe safui** (míagblɔ be, na agbalẽdzikpɔla) si ɖea wò asitsatsa fiana **evɔ màna ŋusẽ wò be nàzã ga o. Ame ŋutɔ ƒe nyawo tsɔtsɔ aɣla nye tiatia, ke menye nusianu alo naneke o.
- Derivation ɖesiaɖe nye **mɔ ɖeka**: nukpɔkpɔ ƒe safui léle meɖea mɔ gbeɖe be ame aɖeke naxɔ gazazã ƒe safuia gbeɖe o, elliptic-curve trapdoor si tututu tso Se 2 lia me le eƒe dɔ wɔm.

---

## 4. Nuŋlɔɖi aɖe zazã: nya eneawo

Be nàzã nuŋlɔɖi aɖe le adzame la, ele be nàna network la naxɔ nu ene dzi zi ɖeka **evɔ màɖe nuŋlɔɖia, eƒe asixɔxɔ, eƒe nɔƒe, alo wò amenyenye afia o.** Wotsɔ akpa aɖe si nènya xoxo la akpɔ nya ɖesiaɖe gbɔ.

![alt nuŋɔŋlɔ](image-31.png)

Kpeɖodzia ɖea nyateƒenya siwo le ete la dometɔ aɖeke fiana **ɖeke** o (de dzesi kae, amesi ƒe safui, asixɔxɔ ka). Ðeko wòɖee fia be *nya eneawo katã sɔ.* Emae nye Zcash si wotsɔ akpoxɔnu wɔe ƒe ayemɔ bliboa, si wogblɔ le nɔnɔmetata ɖeka me.

---

## 5. Asixɔxɔ-dadasɔ ƒe ayemɔ (fetu si míedzra ɖo) .

Le megbe le Se 2 kple 3 me la míede dzesii be Pedersen ƒe ŋugbedodowo **tsɔe kpe ɖe eŋu**: ɖokuitsɔtsɔna be `v_1` tsɔ kpe ɖe ɖokuitsɔtsɔna be `v_2` nye ɖokuitsɔtsɔna be `v_1 + v_2`. Afi siae ema ɖea vi le.

Nuŋlɔɖi ɖesiaɖe si wotsɔ de eme kple esi woɖe tso eme la tsɔa **asixɔxɔ ƒe ɖokuitsɔtsɔna**: Pedersen ƒe ɖokuitsɔtsɔna `v.G + r.H` si ɣlaa eƒe agbɔsɔsɔ `v`. Esi wònye be esiawo kpe ɖe eŋu ta la, network la ate ŋu abu akɔnta be:

```
(sum of input value commitments) − (sum of output value commitments)
```

Ne asitsatsa la da sɔ (womewɔ ga aɖeke alo tsrɔ̃e o), la,... `v` akpawo tea fli ɖe eme pɛpɛpɛ, eye wogblẽa ɖokuitsɔtsɔna **zero value** ko ɖi, si wogbã ŋku na le vome si susɔ ta. Ame si ɖoe ɖa la ɖo kpe edzi be yewonya be nusi susɔ le vome to asidede agbalẽ te sue aɖe si woyɔna be **asidede agbalẽ te wɔwɔ me.** Ne asixɔxɔawo da sɔ ŋutɔŋutɔ ko hafi woate ŋu awɔ asidede agbalẽ te si sɔ, **ke hã womeɖe ga home ɖeka pɛ hã ɖe go o.**

> Esia nye kpɔɖeŋu si le dzadzɛ wu le *nukata* míehiã na homomorphic, curve-based commitments ƒe ƒuƒoƒo bliboa me. Wowɔa "ga si le eme sɔ kple ga do go" ƒe sea dzi to **kplo siwo wotre nu ɖo tsɔtsɔ kpe ɖe wo nɔewo ŋu** kple ŋkuléle ɖe emetsonu ƒe nutrenuwo ŋu be woaɖo zero.

---

## 6. Asitsatsa blibo aɖe, si wokpɔna tso nuwuwu vaseɖe nuwuwu

Mina míaƒo Alice si le fe xem na Bob nu ƒu. Míazã Sapling ƒe "spend side / output side" ƒe ɖoɖo si me kɔ abe nufiafia ƒe kpɔɖeŋu ene.

**Adzɔnu si wokpɔ ta na ƒoa numeɖeɖe ƒomevi eve nu ƒu:**

| Zã numeɖeɖe (zãa nuŋlɔɖi aɖe) | Nusiwo do tso eme ƒe numeɖeɖe (wɔa nuŋlɔɖi) |
|---|---|
| asixɔxɔ ƒe ɖokuitsɔtsɔna si wotsɔ de eme | asixɔxɔ ƒe ɖokuitsɔtsɔna ƒe emetsonu |
| **seke** si wòɖo kpe edzi ɖe (ati aɖe ƒe ke) | yeyea **note commitment** (aŋgba yeye aɖe) |
| **nullifier** si nye nuŋlɔɖi si wozã | **ɣeyiɣi kpui aɖe ƒe safui** na nya ɣaɣla |
| dutoƒo safui si wogbugbɔ ɖo ɖe ɖoɖo nu + gazazã-mɔɖeɖe ƒe asidede agbalẽ te | the **encrypted note** (nya ɣaɣla na amesi xɔe) |
| **zk-SNARK** si ɖo kpe nya eneawo dzi | a **zk-SNARK** si ɖo kpe edzi be emetsonua nye esi wowɔ nyuie |

Gakpe ɖe **asidede asi si blaa ame** ɖeka ŋu le babla bliboa dzi, si awɔe be asixɔxɔ ƒe dadasɔ (Akpa 5).

![alt nuŋɔŋlɔ](image-30.png)

Trace the privacy: network la lé ŋku ɖe anchor la ŋu, kpɔe be nullifier la nye yeye, ɖo kpe kpeɖodzia dzi, eye wòɖo kpe edzi be ga si susɔ. Exɔ fexexe si sɔ **esi wòsrɔ̃ ga home aɖeke, adrɛs aɖeke, eye menye gagbalẽ si wozã o.** Le ɣeyiɣi sia me la, nuŋlɔɖi si wozã ƒe **nullifier** (eƒe ku) kple Bob ƒe **tsɔtsɔtsɔna** yeyea** (eƒe nuŋlɔɖia dzidzi) bɔbɔ nɔ dutoƒoxɔ vovovo eve me eye kadodo aɖeke si dzena le wo dome o, si nye kadodo si wotso tso Se 0 lia me.

---

## 7. Nutsotso ɖesiaɖe tso Se 0 lia me

Nyati 0 lia ɖoe koŋ ʋu nyabiasewo nu. Wo katã nye esi, wotu wo.

| Loop ʋu le Nyati 0 | Wotue to |
|---|---|
| Aleke woate ŋu awɔ agbalẽkotoku si wotu nu ɖo gake womate ŋu aŋlɔe o? | Adzɔgbeɖeɖewo: bebeƒe tso randomness, babla tso ƒoƒo ƒe tsitretsitsi / the curve trapdoor (Art 3) |
| Afikae safuiwo kple nuɖaɖa siwo wowɔna le adzame la tso? | Field akɔntabubu kple elliptic-curve scalar dzidziɖedzi (Art 1, 2) |
| Nuka tututue nye "board" la? | Merkle-ti si dzina ɖe edzi si me wodea dzesi adzɔgbeɖeɖewo; eƒe ke enye seke (Art 4) |
| Nukatae womate ŋu atsɔ dzesi si nye void la asɔ kple eƒe agbalẽkotokua o? | Nullifier nye keyed hash si wodzra ɖo ɖe hatsotso si to vovo tso commitments gbɔ (Art 2, 3, 4) |
| Aleke nàwɔ aɖo kpe nyateƒetoto dzi esime mèɖea naneke ɖe go o? | zk-SNARK si le akɔntabubu ƒe nutome si ŋlɔa nya eneawo katã dzi (Art 5) |
| Aleke amesi xɔe se be woxe fe na yewoe? | Wotsɔa nya ɣaɣlawo dea nuŋlɔɖia me ɖe woƒe adrɛs dzi; wowɔa dodokpɔ-ɖea nu me kple nukpɔkpɔ ƒe safui (nyati sia) |
| Aleke wowɔa "ga si gena ɖe eme = ga do go" dzi le adzame? | Homomorphic asixɔxɔ ƒe ŋugbedodowo + asidede agbalẽ te si blaa ame (Sec 5) |

Nya si to vovo tso axa gbãtɔ dzi, *ɖo kpe nusi màte ŋu akpɔ o dzi*, la nu yi keŋkeŋ azɔ. Netwɔƒea ɖoa kpe **nya siwo wogblɔ tso nyatakaka ɣaɣlawo ŋu** dzi, ke menye nyatakakaawo ŋutɔ gbeɖe o.

---

## 8. Sapling vs Orchard, le gbɔgbɔ ɖeka me

We taught with Sapling's structure because its split is clearest. The current design, **Orchard**, refines rather than replaces these ideas:

| | **Sapling** | **Orchard** |
|---|---|---|
| Asitsatsa ƒe dɔwɔƒe | ɖe **Zã** kple **Nuwɔwɔ** ƒe numeɖeɖewo ɖa | ɖekawɔwɔ **Nuwɔnawo** (ɖesiaɖe zãa ɖeka + emetsonu ɖeka) |
| Kpeɖodzi ƒe ɖoɖo | **Groth16** (ɖoɖo si dzi woka ɖo) | **Halo 2** (ɖoɖo si dzi woka ɖo aɖeke meli o) |
| Curves | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) ƒe lãgbalẽ |
| Ðokuitsɔtsɔna hash | Pedersen ƒe agbalẽ | Sinsemilla ƒe ƒuƒoƒo |

Nukpɔsusu ɖesiaɖe si le nyati sia me la yi edzi tẽ; Orchard koŋ ƒoa gazazã kple nusiwo wowɔ nu ƒu ɖekae eye woɖɔlia wo nɔewo le kpeɖodziɖoɖo si me kɔnu aɖeke mele o me. Sɔti atɔ̃awo metrɔ o.

---

## 9. Nya aɖe si wogblɔna be yeaɖe asi le nyaa ŋu anukwaretɔe

Esiae nye nɔnɔmetata si de blibo wu le nusiwo kplɔ wo nɔewo ɖo me, gake egakpɔtɔ nye kpɔɖeŋu. Míeƒo nuŋlɔɖi aɖe ƒe agbledeƒe ƒe nuŋɔŋlɔ siwo sɔ pɛpɛpɛ, safuiwo ƒe dzɔtsoƒe ƒe mɔfiame siwo sɔ pɛpɛpɛ, gazazã ƒe safuiwo ƒe gbugbɔgawɔ le vome, adrɛs vovovowo, nuŋlɔɖi ƒe agblewo, fexexe ƒe dɔwɔwɔ, vovototo si le asixɔxɔ ƒe ŋugbedodowo kple nuŋlɔɖi ƒe ŋugbedodowo dome tsitotsito bliboe, kple akpa si tututu asidede agbalẽ te ɖesiaɖe wɔna. Míetsɔ sisi ɖeka si le se nu hã ɖo ŋkume; asitsatsa ŋutɔŋutɔwo ate ŋu atsɔ gazazã kple nusiwo dona tso eme geɖe zi ɖeka eye woate ŋu atsaka akpa siwo me kɔ kple esiwo ŋu wokpɔ ta na. Dzɔtsoƒe si ŋu ŋusẽ le enye Zcash Protocol Specification. Nusi nèlé ɖe asi fifiae nye nɔnɔme nyuitɔ; nusi woɖo ɖi la yɔa dzidzenu ɖesiaɖe me.

---

## 10. Kpuie ko la

- Asitsatsa si wokpɔ ta na la ƒoa akpa atɔ̃awo katã nu ƒu: **note** (asixɔxɔa), eƒe **tsɔtsɔtsɔna** le **note commitment tree** me, **nullifier** be woaxe mɔ ɖe gazazã zi eve nu, **asixɔxɔ ƒe adzɔgbeɖeɖe** hena dadasɔ, kple **zk-SNARK** si bla wo katã ɖekae.
- Gazazã ɖo kpe **nya ene dzi zi ɖeka**, nuŋlɔɖia li, woɖe mɔ na wò, eƒe nullifier sɔ, eye asixɔxɔ ƒe dadasɔ, le **sidzedze zero** me, si meɖea nyateƒenya siwo le ete la dometɔ aɖeke fiana o.
- **Wowɔa asixɔxɔ ƒe dadasɔ** dzi to **homomorphic commitments** tsɔtsɔ kpee kple ŋkuléle ɖe wo nutrenu ɖe ​​zero dzi, to **sidede asi si blaa ame** dzi, eye womeɖea ga home aɖeke ɖe go o.
- Zãla ƒe ŋusẽwo sina tso **zazã ƒe safui** ɖeka me to **mɔ ɖeka ƒe ɖoɖo** me, si wɔnɛ be **safuiwo kpɔkpɔ** siwo ɖea nu fiana evɔ womeɖea mɔ na gazazã ƒe ŋusẽ o.
- Netwɔƒea **ɖoa kpe nya siwo wogblɔ tso nyatakaka ɣaɣlawo ŋu dzi**, si ɖea verify-vs-privacy paradox ɖa tso Se 0. Wotu loop ɖesiaɖe si woʋu le afima fifia.
- **Orchard** trɔa asi le **Sapling** (Actions ɖekawɔwɔ, Halo 2 si me ɖoɖo si dzi woka ɖo aɖeke mele o, Pasta curves, Sinsemilla) ŋu evɔ metrɔ sɔti atɔ̃awo o.

---

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| **Gazazã ƒe safui** | Ke ɖeka ƒe nya ɣaɣla si me zãla ƒe safuiwo katã tso |
| **Nukpɔkpɔ ƒe safui** | Eɖea wò asitsatsa fiana na amesi le asiwò evɔ mèɖea mɔ na wo be woazã |
| **Zazã ŋuti numeɖeɖe** | Tx ƒe akpa si ɖua nuŋlɔɖi (nullifier, anchor, proof) |
| **Emetsonu ƒe numeɖeɖe** | Tx ƒe akpa si wɔa nuŋlɔɖi (ɖokuitsɔtsɔna, nya ɣaɣla, kpeɖodzi) |
| **Action (Orchard)** | A unified unit doing one spend and one output together |
| **Asixɔxɔ ƒe ɖokuitsɔtsɔna** | A homomorphic Pedersen ƒe ɖokuitsɔtsɔna na ga home aɖe |
| **Asidede agbalẽ te si blaa ame** | Asidede agbalẽ te si ɖo kpe asixɔxɔwo ƒe dadasɔ dzi evɔ meɖe wo fia o |
| **Anchor** | Ati ƒe ke a gazazã ɖo kpe hamevinyenye dzi tsi tre ɖe |
| **Dodokpɔ ƒe nya ɣaɣlawo ɖeɖeɖa** | Amesi xɔe le ŋugbedodo yeyewo dom kpɔ be yeake ɖe nuŋlɔɖi siwo woɖo na wo ŋu |

---

## Nyabiasewo ƒe Nyabiasewo

**Ðe network la kpɔa ga homea alo amesi xe fe na ameka kpɔa?**
Ao, eɖoa kpe kpeɖodzia, nullifier la ƒe yeyenyenye, sekea, kple asidede agbalẽ te si blaa nu dzi. Ame ŋutɔ ƒe dzidzenuwo katã nɔa ɣaɣla.

**Nukae xe mɔ nam be nyemazã nuŋlɔɖi ɖeka zi eve o?**
Nullifier la. Gazazã tae; network la gbe nullifier ɖesiaɖe si le nullifier ƒe ɖoɖoa me xoxo. Nuŋlɔɖi ɖeka ma ke naa nullifier ɖeka ma ke ɣesiaɣi.

**Aleke woate ŋu akpɔ ga si susɔ ne woɣla ga homewo?**
Asixɔxɔ ƒe ŋugbedodowo kpena ɖe wo nɔewo ŋu le mɔ si sɔ nu; adzɔnuwɔna si da sɔ ƒe ŋugbedodowo tea fli ɖe adzɔgbeɖeɖe si nye zero gbɔ, si ƒe asidede agbalẽ te si blaa ame la ɖo kpe edzi.

**Ðe mate ŋu aɖo kpe nye asitsatsa dzi na agbalẽdzikpɔla evɔ nyemaɖe asi le dziɖuɖu ŋu oa?**
Ɛ̃. Tsɔ nukpɔkpɔ ƒe safui aɖe de asi nɛ. Eɖea wò dɔwɔna si wokpɔ ta na la fiana gake mate ŋu aɖe mɔ ɖe gazazãwo ŋu o, akpe na mɔ ɖeka dzi safuiwo ƒe ɖoɖo.

**Ðe Sapling megale dɔ wɔm o fifia si Orchard lia?**
Both have existed on the network; Orchard is the current design. The concepts are shared, so understanding one gives you the other.

---

### Do wò susuŋudɔwɔwɔ kpɔ

Xɔ̃nye aɖe gblɔ be: “Esi kpeɖodzia ɣlaa ga homea ta la, ɖeko fiafitɔ ate ŋu agblɔ be yewoƒe nusiwo yewowɔ la ƒe asixɔxɔ de ŋgɔ wu yewoƒe nusiwo yewotsɔ de eme eye wòata ga femaxee.” Zã Akpa 5 lia nàtsɔ nyagbe eve aɖe nusita esia do kpo nu me. *(Ðo eŋu le ete.)*

<details><summary>Answer</summary>

Woɣla ga homeawo, gake woxatsa wo dometɔ ɖesiaɖe ɖe homomorphic value commitment me, eye network la tsɔa nusiwo katã wotsɔ de eme ƒe ŋugbedodowo kpena ɖe eŋu eye wòɖea output ƒe ŋugbedodowo katã ɖa; ne asixɔxɔ ɣaɣlaawo meda sɔ o la, emetsonua matre enu ɖe ​​zero dzi o eye **womate ŋu awɔ asidede agbalẽ te si sɔ o.** Fiafitɔ ate ŋu aɣla *agbɔsɔsɔme*, gake mate ŋu ana asixɔxɔ siwo meda sɔ o nato dadasɔ ƒe ɖaseɖigbalẽa me o, eyata ga tata femaxee manya wɔ ne womeɖe naneke fia evɔ wogale akɔntabubua lém o.
</details>

---

### Nusiwo kplɔ wo nɔewo ɖo, wowu enu

Fifia èzɔ mɔ tso nya ɖeka si tsi tre ɖe wo nɔewo ŋu dzi va ɖo ame ŋutɔ ƒe fexexe blibo dzi:

![alt nuŋɔŋlɔ](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


Tso afisia la, dzɔdzɔme ƒe akasanu si kplɔe ɖo la yi ŋgɔ wu: Groth16 kple Halo 2 ƒe dɔwɔwɔ ememetɔ, ɖoɖowɔwɔ ƒe kɔnu siwo dzi woka ɖo, Sapling kple Orchard nutome suewo tsitotsito, safuiwo ƒe dzɔtsoƒe kple adrɛs vovovowo, kple ɖoɖowɔɖia ƒe tɔtrɔ le network ƒe ŋgɔyiyiwo katã me. Gake gɔmeɖoanyia le dɔ wɔm fifia, eye aƒe le nyati mawo dometɔ ɖesiaɖe si wòatsɔ akpe ɖe eŋu.

*Zcash ƒe akpa aɖe tso Gɔmeɖose Gbãtɔwo *series na [ZecHub](https://zechub.org). CC BY-SA 4.0 si ŋu mɔɖegbalẽ le.*

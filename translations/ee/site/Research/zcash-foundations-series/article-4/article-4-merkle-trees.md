# Merkle Atiwo: Alesi Blockchain Ðoa ŋku Nuŋlɔɖi Ðesiaɖe Dzii
##### Numekuku Gbãtɔ tso [Annkkitaaa](https://github.com/Annkkitaaa)

![alt nuŋɔŋlɔ](image-19.png)

### Adzɔgbeɖeɖe miliɔn geɖe kpuie le asibidɛ sue ɖeka me

> **Series:** *Zcash tso Gɔmeɖose Gbãtɔwo me* . **Nyati 4 lia . Merkle Atiwo**
> **Nyaselawo:** ame yeyewo. Míetua ɖe [Se 3 lia (hashing kple ŋugbedodowo) dzi.](article-3-hashing-commitments.md). Ne ènya nusi asibidɛ kple ɖokuitsɔtsɔna nye la, ke èle klalo.
> **Nusi nàgblẽ ɖi:** Merkle atiwo ƒe nɔnɔmetata si me kɔ, si sɔ, alesi nàɖo kpe hamevinyenye dzi evɔ màɖe nusi nèdi be yeagblɔ la afia o, kple alesi tututu esia va zua Zcash ƒe nuŋlɔɖi ƒe ɖokuitsɔtsɔna ƒe ati.

[Nyati 0 lia](article-0-shielded-transaction.md) ɖɔ "dutoƒo board" si léa nuŋlɔɖi ɖesiaɖe si wowɔ kpɔ eye ɖeko wòtsina ɣesiaɣi. Kaka fifia naɖo la, àte ŋu asusu nusi wotsɔ bla ɖe eŋu: **tsɔtsɔtsɔna** (Se 3), agbalẽkotoku siwo wotre nu na. Gake board ŋutɔŋutɔ axɔ wo dometɔ *miliɔn alafa geɖe*. Aleke network la dzraa ema ɖo, ɖoa kpe edzi, eye wònana nèɖoa kpe edzi be wò agbalẽkotokua le board la dzi evɔ màfia asie o? Ŋuɖoɖoa nye xɔtunu dzeanitɔwo kekeake dometɔ ɖeka le kɔmpiutaŋutinunya me: **Merkle-ti.**

---

## 1. Nu ka tae wòle be nàtsɔ ɖe le eme?

Kuxi eve dona le ɣeyiɣi si me nèŋlɔ adzɔgbeɖeɖewo ƒe ŋkɔ gã aɖe le dutoƒo.

**Kuxi gbãtɔ: integrity at scale.** Ne xexlẽdzesi miliɔn 300 ye ŋlɔe la, aleke ame aɖe aɖo kpe edzi be *menye ɖeka o* ye wotrɔ le adzame? Mɔkpɔkpɔ aɖeke megale nu miliɔn 300 ŋu ake le ŋkuléle ɖe wo ŋu ɖesiaɖe me o.

**Kuxi evelia: ame ŋutɔ ƒe hamevinyenye.** Be nàzã nuŋlɔɖi aɖe (Se 0) la, ele be nàɖo kpe edzi be wò ɖokuitsɔtsɔna le board la dzi vavã. Gake ne èfia asi edzi ("enye xexlẽdzesi si woŋlɔ ɖe eme 4,201,337!"), ɖeko nèɖe ŋkɔ ɖa le ɖokuiwò ŋu. Ele be nàɖo kpe *"nye agbalẽkotokua le afi aɖe le board sia dzi"* evɔ màɖe **kae** ɖeka afia o.

Merkle-ti aɖe kpɔa evea siaa gbɔ zi ɖeka. Eƒoa xexlẽdzesi bliboa nu ƒu wòzua asibidɛ ɖeka, eye wònana nètsɔa kpeɖodzi sue aɖe si ɣlaa teƒe si nèle la ɖoa kpe hamevinyenye dzi.

---

## 2. Nusi wokpɔna le susu me: asibidɛwo ƒe hoʋiʋli

Kpɔe ɖa le susu me be knockout hoʋiʋli ƒe bracket, gake le esi teƒe be fefewɔlawo nayi ŋgɔ la, **asibidɛwo ƒoa ƒu.**

- Le ete la, nyatakaka ɖesiaɖe xɔa eya ŋutɔ ƒe asibidɛ (eƒe hash tso Se 3 lia me). Esiawoe nye **aŋgbawo.**
- Tsɔ wo kpe ɖe wo nɔewo ŋu. Wowɔa hash *ɖeka* ɖe atsu kple asi ɖesiaɖe ƒe asibidɛ eve ŋu wòzua dzila ƒe asibidɛ ɖeka.
- Miwɔ dzilawo eve eve, mitsɔ hash eve ɖesiaɖe ƒo ƒu, kple bubuawo.
- Yi edzi vaseɖe esime **asibidɛ ɖeka** nanɔ etame. Aʋawɔla mae nye **Merkle ke.**

![alt nuŋɔŋlɔ](image-20.png)

Nu ɖeka kolia si le vevie wu la kplɔa ahomya ƒe ŋusẽkpɔɖeamedzi ɖo tẽ (Se 3 lia):

> **Kea nye *nusianu* si le ete ƒe asibidɛ ƒe dzesi.** Trɔ aŋgba ɖesiaɖe, vie gɔ̃ hã, eye eƒe asibidɛ ƒe dzesi trɔna, si trɔa edzila, si trɔa *dzila* ma, vaseɖe dzi. **Kea trɔna.** Eyata ke ƒe asixɔxɔ sue ɖeka ɖoa kpe xexlẽdzesi bliboa ƒe blibonyenye dzi. Ema kpɔa Kuxi gbãtɔ gbɔ.

---

## 3. Ati ŋutɔŋutɔ, si wobu akɔnta pɛpɛpɛ

Mina míatu ati si ƒe aŋgba ene le etame la kple SHA-256 ƒe asibidɛ ŋutɔŋutɔwo ɖe aŋgbaawo dzi `A, B, C, D` (woɖe nuɖuɖumeŋusẽ siwo woɖe fia be wotso wo dzi be woate ŋu axlẽe):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Nusianu nye "hash na nu, emegbe hash hash eve" ko. Naneke meto vovo wu Se 3 lia, si woɖo ɖe ati me o.

---

## 4. Akpa si me aɖaŋu le: hamevinyenye ƒe kpeɖodzi evɔ womaɖe ɖoƒe afia o

Fifia Kuxi evelia. Gblɔ be yedi be yeaɖo kpe aŋgba ma dzi `C` le ati la me, na ame aɖe si nya **ke** ko. *Mètsɔa ati bliboa dea asi na wo o. Asibidɛ siwo hiã be woali tso wo me koe nètsɔna dea asi na wo `C` yi kea gbɔ, si woyɔna be **kpeɖodzimɔ** (alo **Merkle kpeɖodzi**):

> Be woaɖo kpe edzi `C` le ati la me, na:
> - nɔvia `hD`, kple
> - eƒe tɔɖiayɔvi `hAB`.

Esi kpeɖodziwɔla la nya kea ko ta la, egbugbɔ bu akɔnta le tolilia ŋu:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Wobu akɔnta ŋutɔŋutɔ: esia naa ku `1b3faa3fcc5e...`, si **sɔ kple kea.** Woɖo kpe edzi be aŋgba la le ati la me.

![alt nuŋɔŋlɔ](image-21.png)

Nu eve na ŋusẽ le esia ŋu:

- **Ele sue ŋutɔ.** Le aŋgba 4 gome la, èna hash 2. Le ati aɖe ta `n` gblẽa wò nana ko abe **log_2(n)** hashes. Le aŋgba biliɔn ɖeka gome la, ema ade **hashes 30**, ke menye biliɔn ɖeka o. Ƒã hafi kpeɖodzia tsina ne ati la le wowóm le eƒe lolome me.
- **Enye adzamenyawo ƒe nuku.** Kpeɖodzia ɖee fia be wò aŋgba le *afi aɖe* le ati la me. Ne wowɔ dodokpɔ sia ke *le sidzedze zero ƒe kpeɖodzi me* (Se 5) la, mɔa ŋutɔ gɔ̃ hã ɣla, eyata èɖo kpe edzi be "nye nuŋlɔɖi le ati la me" esime mèɖe nuŋlɔɖia alo eƒe nɔƒe aɖeke ɖe go o. Ema kpɔa Kuxi evelia gbɔ bliboe.

---

## 5. Tso Merkle-ti aɖe dzi va ɖo Zcash ƒe note commitment tree dzi

Fifia míate ŋu agblɔ nusi tututu Se 0 ƒe "dukɔa ƒe habɔbɔ" nye:

> **note commitment tree** nye Merkle tree si ƒe **aŋgbawo nye note commitments.** Ɣesiaɣi si wowɔ note le xexeame ƒe teƒe ɖesiaɖe la, wotsɔa eƒe commitment kpena ɖe eŋu abe aŋgba si kplɔe ɖo ene, eye wowɔa ke la yeyee.

Nya ʋee aɖewo siwo le tẽ ŋutɔŋutɔ:

- **Ðeko wòtsina.** Wotsɔa aŋgbawo kpena ɖe eŋu, womeɖea wo ɖa gbeɖe o. Woyɔa esia be **Markle-ti si dzina ɖe edzi.** (Esɔ kple Se 0 lia ƒe "board la megbãa naneke gbeɖe o.")
- **Woyɔa kea be *seke*.** Ne èzã ga la, wò asitsatsa yɔa seke si wowɔ nyitsɔ laa eye wòɖoa kpe edzi, le sidzedze zero me, be wò nuŋlɔɖia ƒe ɖokuitsɔtsɔna nɔa ati si me ke ma le la me.
- **Fixed depth.** Zcash ƒe ati siwo wotsɔ akpoxɔnu wɔe la ƒe goglome nye **32**, si fia be woate ŋu alé wo ɖe te vaseɖe `2^(32)` (si wu biliɔn ene) ƒe gagbalẽwo.
- **ZK-xɔlɔ̃wɔwɔ hashing.** Wometu ati la kple SHA-256 o. Sapling tsɔ **Pedersen hashes** ƒo ati la eye Orchard zãa **Sinsemilla** (wo ame evea siaa tso Se 3 lia me), nenema tututue hameviwo ƒe dziyiyia mexɔ asi be woaɖo kpe edzi le nutome sue aɖe me.

![alt nuŋɔŋlɔ](image-22.png)

### Nu ɖeka si ati la *mekpɔna* o: ezãa ga zi eve

Ati la ɖo kpe edzi be nuŋlɔɖi aɖe **li**. Le eɖokui si mexea mɔ na wò be màgazã gagbalẽ ɖeka zi eve o. Dɔ ma nye **nullifier set** si tso Se 0 me tɔ: "void tokens" ƒe ƒuƒoƒo ɖe vovo. Ne èzã ga la, ètaa nuŋlɔɖia ƒe nullifier, eye network la gbe nullifier ɖesiaɖe si wòkpɔ va yi.

Eyata dutoƒoxɔ eveawo wɔa akpa siwo kpena ɖe wo nɔewo ŋu, eye woƒe vovototodedeameme nye nusi tututu gblẽa kadodo si le nuŋlɔɖi aɖe ƒe dzidzi kple eƒe ku dome:

| Dɔwɔɖoɖo | Nyabiase si ŋu wòɖo | Wotrɔ asi le eŋu ne |
|---|---|---|
| **De dzesi ɖokuitsɔtsɔna ƒe ati** | "Ðe nuŋlɔɖi sia lia?" | Wowɔ nuŋlɔɖi aɖe **wɔ** (wotsɔ ɖokuitsɔtsɔna kpe ɖe eŋu) |
| **Nullifier ƒe ɖoɖo** | "Ðe wozã nuŋlɔɖi sia xoxoa?" | Wozã nuŋlɔɖi aɖe **zã** (wota nullifier) ​​|

---

## 6. Agbegbegbeɖeɖe anukwaretɔe

Nuwɔwɔ bɔbɔewo, abe alesi wònɔna ɖaa ene. Merkle ati ŋutɔŋutɔ siwo dzina ɖe edzi la léa ŋku ɖe "liƒo" nodes ŋu ale be kea ateŋu awɔ yeyee evɔ magbugbɔ nusianu atu o; network la léa fesre aɖe ɖe seke siwo wowɔ nyitsɔ laa ŋu, ke menye esiwo wowɔ nyitsɔ laa ɖeɖeko o, eyata gakotokuwo megbãna le block yeye ɖesiaɖe me o; eye aŋgba ƒuƒluwo zãa padding value si woɖe fia. Míeɖe ati eve siwo ƒe ŋusẽ le dzadzɛ hã siwo nye eve. Esiawo dometɔ aɖeke metrɔa nukpɔsusua o: adzɔgbeɖeɖewo ƒe aŋgbawo, siwo wotsɔ hashed wɔ eveveve vaseɖe ke ɖeka dzi, kple hamevinyenye ƒe kpeɖodzi kpuiwo. Agbalẽdzikpɔkpɔ tututu trɔ gbɔ le ɖoɖowɔɖi ƒe nyatia me.

---

## 7. Kpuie ko la

- **Merkle ati** aɖe tsɔa nyatakakawo ƒoa ƒu ɖe **aŋgbawo** me, emegbe tsɔa **eve eve yia dzi** vaseɖe esime **ke** ɖeka koe susɔ.
- Akpe na avalanche effect la, **ke la nye asibidɛ ƒe dzesi le xexlẽdzesi bliboa me**: trɔ aŋgba ɖeka eye kea trɔ. Asixɔxɔ sue ɖeka ɖo kpe nyatakakadzraɖoƒe gã aɖe dzi.
- **hamevinyenye ƒe kpeɖodzi (kpeɖodzimɔ)** nye nɔvi siwo le tolili yi kea gbɔ ko, ku ɖe **log_2(n)** hashes ŋu, eyata kpeɖodziwo nɔa sue na aŋgba biliɔn geɖe gɔ̃ hã.
- Wowɔe **le sidzedze zero ƒe kpeɖodzi me**, hamevinyenye ƒe dodokpɔ ma ɣlaa *aŋgba* si nèdi be yeagblɔ, si ɖo kpe edzi be "nye nuŋlɔɖi le ati la me" evɔ meɖe nuŋlɔɖia alo eƒe nɔƒe fia o.
- Zcash ƒe **note commitment tree** nye **incremental** Merkle tree of note commitments, goglome **32**, si ƒe ke nye **anchor**; Sapling tsɔ **Pedersen** ƒoe eye Orchard tsɔ **Sinsemilla** ƒoe.
- Ati la ɖo kpe **anyinɔnɔ** dzi; **nullifier set** si le vovo la xea mɔ na **double-spends**. Wo ɖeɖe ɖae nye nusi ɖea kadodo si le nuŋlɔɖi aɖe ƒe dzidzi kple eƒe ku dome ɖa.

---

## Nyagɔmeɖegbalẽ

| Nyagbe | Plain-Eŋlisigbe me gɔmesese |
|---|---|
| **Merkle ƒe ati** | Hashes ƒe ati aɖe; aŋgbawo nye data asibidɛwo, dzilawo hash wo viwo |
| **Aŋgba** | Node si le ete; le Zcash me la, nuŋlɔɖi ɖeka ƒe ɖokuitsɔtsɔna |
| **Merkle ƒe ke** | Asibidɛ ɖeka si le etame si ƒo ati bliboa nu ƒu kpuie |
| **Dzesidemɔ / Merkle kpeɖodzi** | Nɔvi hashes siwo hiã be woatsɔ aɖo kpe edzi be aŋgba aɖe le ati |
| **Markle ati si dzina ɖe edzi** | Merkle-ti si woate ŋu atsɔ akpe ɖe eŋu ko (agbawo koe wotsɔ kpena ɖe eŋu ɣesiaɣi) |
| **Anchor** | Merkle ke aɖe si a spend yɔ be "ati ƒe nɔnɔme si ŋu mele kpe ɖom edzi le" |
| **Nullifier ƒe ɖoɖo** | Nusiwo wozã ƒe dzesiwo ƒe ƒuƒoƒo ɖe vovo si xea mɔ na gazazã zi eve |

---

## Nyabiasewo ƒe Nyabiasewo

**Nukatae ati aɖe eye menye hashes ƒe xexlẽdzesi didi aɖe ko o?**
Nuŋlɔɖi gbadzaa azi dziwò be nàɖe nya ɖesiaɖe si nèŋlɔ la afia alo awɔ dɔ tso eŋu atsɔ aɖo kpe hamevinyenye dzi. Ati naa kpeɖodzi siwo ƒe lolome le abe logarithmic ene eye ke ɖeka naa wò hena fɔmaɖimaɖi.

**Ðe kpeɖodziwɔla la hiã ati bliboa?**
Ao, **ke** koe nye kpeɖodziwɔla la tsɔ kpe ɖe wò ɖaseɖiɖimɔ kpui la ŋu. Emae nye nya bliboa.

**Nukatae goglome 32 koŋ?**
Edea se na ati la le gagbalẽ siwo ade biliɔn ene me, si nye tagbɔƒe si sɔ, evɔ wònana hamevinyenye ƒe kpeɖodzi (kple eƒe gazazã le nutome suea me) ƒe lolome nɔa ɖoɖo nu, si dzi woate ŋu akpɔ ŋusẽ ɖo.

**Ne kea trɔna kple nuŋlɔɖi yeye ɖesiaɖe la, aleke kpeɖodzi xoxowo nɔa anyi?**
Netwɔƒea ɖoa ŋku fesre aɖe si me ke (seke siwo wodo nyitsɔ laa) le dzi, eyata kpeɖodzi si wowɔ ɖe seke si tsi vie ŋu la gakpɔtɔ ɖoa ​​kpe edzi. Protocol nyatia na esia sɔ pɛpɛpɛ.

---

### Do wò susuŋudɔwɔwɔ kpɔ

Le míaƒe ati si ƒe aŋgbawo le 4 me la, tsɔe be amedzidzela aɖe ɖɔlia aŋgba le adzame `C` na asixɔxɔ bubu gake egblẽa ke si wota la ɖi matrɔmatrɔe. Nukae gblẽna le wo ŋu, eye nukatae womate ŋu aɖɔe ɖo le ɖoɖoezizi me o? *(Ðo eŋu le ete.)*

<details><summary>Answer</summary>

Tɔtrɔ `C` trɔna `hC` (avalanche effect), si trɔna `hCD = H(hC, hD)`, si trɔna `ROOT = H(hAB, hCD)`. Eyata ke si wogbugbɔ bu akɔnta le la megasɔ kple ke si wota o, eye wokpɔa asitɔtrɔ le eŋu. Be "woaɖɔe ɖo kpoo" la, ahiã be woadi bubu `C` si naa *nu ɖeka* . `hC`, si nye hash ƒe ƒoƒo, si mate ŋu adzɔ le Se 3. Integrity holds.
</details>

---

### Nukae kplɔe ɖo

**Nyati 5 lia . Zero-sidzedze ƒe kpeɖodziwo:** crescendo la. Míetu nuŋlɔɖiwo, adzɔgbeɖeɖewo, kple ati la azɔ, eye míenɔa gbɔgblɔm be "woɖo kpe edzi le sidzedze zero me." Se 5 lia ɖe alesi nàte ŋu aɖo kpe nya aɖe dzi be enye nyateƒe, be wò nuŋlɔɖia le ati me, be wò nullifier la sɔ, be ga da sɔ, evɔ màɖe wo dometɔ aɖeke afia o la me mlɔeba.

*Zcash ƒe akpa aɖe tso Gɔmeɖose Gbãtɔwo *series na [ZecHub](https://zechub.org). CC BY-SA 4.0 si ŋu mɔɖegbalẽ le.*

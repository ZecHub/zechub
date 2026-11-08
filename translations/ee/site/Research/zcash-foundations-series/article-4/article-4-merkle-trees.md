# Merkle Ƒe Titiwo: Ale Si Blockchain Ƒoa Dzi ɖe Didienu Katã Ŋu
##### Numekuku Gbãtɔ Tso [Annkkitaaa](https://github.com/Annkkitaaa) Gbɔ

![alt text](/content-images/image-19-cfbdcf8f78.webp)

### Adzɔgbeɖeɖewo Miliɔn Geɖe ƒe Kpɔkplɔɖa Ƒe Ɖeɖe Kpuie Me

> **Series:** *Zcash Tso Gɔmedzedze Me* . **Nunyaŋlɔɖi 4 . Merkle Ƒe Titiwo**
> **Ame Siwo Wòna Be Wòaxlẽ:** Ame yeyeawo. Míetsɔa [Nunyaŋlɔɖi 3 (hashing kple adzɔgbeɖeɖewo)](article-3-hashing-commitments.md) ƒe nu nyuie wɔa dɔ. Ne nènya nu si nye kpɔkplɔɖa kple adzɔgbeɖeɖe la, èɖo ŋu.
> **Nu Si Nàdzɔ Le Emegbe:** Nunya si ƒo nu tso Merkle ƒe titiwo ŋu, ale si wòate ŋu aɖe kpekpeɖeŋu ƒe ɖaseɖigbalɛ fia ne mèfia nu si nèdi o, kple ale si esia trɔ zu Zcash ƒe didienu adzɔgbeɖeɖe ƒe ti.

[Nunyaŋlɔɖi 0](article-0-shielded-transaction.md) ƒo nu tso "kplɔdzi si ame katã ate ŋu akpɔ" si me didienu katã si wowɔ kpɔ gbeɖe le eye wòganɔa dzi ɖaa. Fifia àte ŋu agblɔ nu si wotsɔ dea eme: **adzɔgbeɖeɖewo [commitments]** (Nunyaŋlɔɖi 3), agbalẽ dzɔdzɔwo. Ke kplɔdzi vavã aɖe **miliɔn alafa geɖewo**. Aleke network la atsɔe adzra, aɖe kpekpeɖeŋu na, eye wòana nàɖe ɖase be wò agbalẽ dzɔdzɔ le kplɔdzi la dzi ne mètsɔ asi fia eŋu o? Ŋuɖoɖo la nye ɖoɖo dzɔdzɔ aɖe si nyo ŋutɔ le computer science me: **Merkle ƒe ti.**

---

## 1. Nu ka ta nàtsɔ esia ade dziku?

Kuxi eve doa le esi nèxɔ adzɔgbeɖeɖewo ƒe xexlẽme kplɔ aɖe si gã.

**Kuxi gbãtɔ: nyateƒe dzadzɛ le kadodo gã me.** Ne nuwo miliɔn 300 le xexlẽme la me, aleke ame aɖe avaɖe kpekpeɖeŋu be woɖe tɔ aɖeke me tɔɖo o? Be woagakpɔ nu miliɔn 300 katã ɣesiaɣi nye nu si womate ŋu awɔ o.

**Kuxi evelia: ɣaɣla [privacy] ƒe kpekpeɖeŋu.** Be nàtsɔ didienu aɖe (Nunyaŋlɔɖi 0) awɔ dɔ la, ele be nàɖe ɖase be wò adzɔgbeɖeɖe le kplɔdzi la dzi vavã. Ke ne nètsɔ asi fia eŋu ("enye entry number 4,201,337!"), èɖe wò ŋutɔ ƒe ame-nyanya fia. Ele be nàɖe ɖase be *"nye agbalẽ dzɔdzɔ le kplɔdzi sia dzi afi aɖe"* ne mèfia **afikae** o.

Merkle ƒe ti ɖea kuxi eve siawo katã ɖe ɣeyiɣi ɖeka me. Ewɔa xexlẽme blibo la zu kpɔkplɔɖa ɖeka, eye wòana nàɖe kpekpeɖeŋu ƒe ɖaseɖigbalɛ [proof] kpuie aɖe fia si me afi la ƒe nyanya mele o.

---

## 2. Nuxlɔ̃ame: kpɔkplɔɖawo ƒe hadede ƒeɖuɖu

Bu hadede si me woɖoa amedzroa ɖe eŋu ɖe game me, ke ɖe teƒe si amedzrowo li la, **kpɔkplɔɖawo ƒoa ƒu.**

- Le anyi ƒe teƒe la, nyatakakawo ƒe akpa ɖe sia ɖe xɔa eya ŋutɔ ƒe kpɔkplɔɖa (eƒe hash tso Nunyaŋlɔɖi 3 me). Esiawo nye **aɖakawo [leaves].**
- Ƒo wo ɖe eve eve. Woƒe kpɔkplɔɖa eveawo woa-hash wo *ɖeka me* be woazu dzila ƒe kpɔkplɔɖa ɖeka.
- Ƒo dzilawo ɖe eve eve, hash eve ɖe sia ɖe ɖeka me, eye nàyi edzi.
- Yi edzi va se ɣe si **kpɔkplɔɖa ɖeka ko** le dzia. Ɖedziɖula ma nye **Merkle ƒe dzita.**

![alt text](/content-images/image-20-f5d57e425a.webp)

Nɔnɔme veviŋutɔ ɖeka le eme tso avalanche effect (Nunyaŋlɔɖi 3) me:

> **Dzita la nye nu katã si le etɔ te ƒe kpɔkplɔɖa.** Trɔ aɖaka aɖe, to gbɔ ɖeka pɛ, eye eƒe kpɔkplɔɖa atrɔ, si atrɔ eƒe dzila, si atrɔ dzila ma hã, va se ɖe dzi. **Dzita la atrɔ.** Eyata dzita kpuie ɖeka ate ŋu aɖe ɖase na xexlẽme blibo la ƒe nyateƒe dzadzɛ. Esia ɖea Kuxi gbãtɔ ɖe.

---

## 3. Ti vavã aɖe si woƒe akɔnta bliboa le

Mina míatso aɖaka ene ƒe ti si le etɔ la dzi kple SHA-256 kpɔkplɔɖawo si woƒe akɔnta le aɖakawo `A, B, C, D` dzi vavã (woɖe digestwo fia kpuie be eƒe xexlẽme nakɔ):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Nu katã nye "hash nu aɖe, eye nàhash hashwo ƒe evewo." Nu aɖeke mele eme si wɔ akpa na Nunyaŋlɔɖi 3 o; wode ɖoɖo ti ƒe nɔnɔme me ko.

---

## 4. Akpa si nyo: kpekpeɖeŋu ƒe ɖaseɖigbalɛ ne mèfia afi o

Fifia Kuxi evelia. Gblɔ be nèdi nàɖe ɖase be aɖaka `C` le ti la me na ame si nya **dzita** ko. Mèna ti blibo la o. Nèna kpɔkplɔɖawo si hiã be nàtsɔ lia tso `C` yi dzita la gbɔ, si woyɔna be **ɖaseɖeɖe ƒe mɔ [authentication path]** (alo **Merkle ƒe ɖaseɖigbalɛ**):

> Be nàɖe ɖase be `C` le ti la me:
> - Na eƒe nɔvi `hD`, kple
> - Eƒe togbui `hAB`.

Ame si le kpekpeɖeŋu ɖem, esi wònye ame si nya dzita ko, gaɖo akɔnta la ɖo:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Woƒe akɔnta wɔ vavã: Esia hena `1b3faa3fcc5e...`, si **sɔ kple dzita la.** Woɖe ɖase be aɖaka la le ti la me.

![alt text](/content-images/image-21-d9e5d6eaf6.webp)

Nu eve wɔa be esia nakpɔ ŋusẽ:

- **Ekpuie.** Na aɖaka ene, nèna hash eve. Na ti si me aɖakawo `n` le, nèna **log_2(n)** hash le eŋu ko. Na aɖaka biliɔn ɖeka, esia nye **hash 30** kple eŋu, menye biliɔn ɖeka o. Ɖaseɖigbalɛ la ƒe gãmenyenye mea gã o ne ti la ƒe gãmenyenye ɖo dzi.
- **Enye ɣaɣla ƒe ƒeɖeɖe.** Ɖaseɖigbalɛ la fia be wò aɖaka le ti la me *afi aɖe*. Ne woawɔ esia le *zero-knowledge proof* (Nunyaŋlɔɖi 5) ƒe me, woɣla mɔ la ŋutɔ hã, eye nèɖea ɖase be "nye didienu le ti la me" ne mèfia didienu la alo eƒe afi o. Esia ɖea Kuxi evelia ɖe bliboe.

---

## 5. Tso Merkle ƒe ti me yi Zcash ƒe didienu adzɔgbeɖeɖe ƒe ti

Fifia míate ŋu agblɔ Nunyaŋlɔɖi 0 ƒe "kplɔdzi si ame katã ate ŋu akpɔ" la gɔme tututu:

> **Didienu adzɔgbeɖeɖe ƒe ti** nye Merkle ƒe ti si ƒe **aɖakawo nye didienu adzɔgbeɖeɖewo.** Ɣesiaɣi si wowɔ didienu aɖe le xexeame afiaɖe la, wodzea eƒe adzɔgbeɖeɖe kple aɖaka yeyee, eye wotrɔa dzita la.

Nyatakaka vavã aɖewo:

- **Eɖea dzi ko.** Wodzea aɖakawo kple, womete wo ɖa kpɔ o. Woyɔ esia be **Merkle ƒe ti si woziedzea dzi [incremental Merkle tree].** (Esɔ kple Nunyaŋlɔɖi 0 ƒe "kplɔdzi la metsia nu aɖeke ɖa o.")
- **Woyɔ dzita la be *anchor*.** Ne nètsɔa ga wɔ dɔ la, wò gaɖoɖo [transaction] ƒoa nu tso anchor yeyee aɖe ŋu eye wòɖea ɖase le zero-knowledge me be wò didienu ƒe adzɔgbeɖeɖe le ti si dzita ma le la me.
- **Koko si le ƒoƒo me.** Zcash ƒe ɣaɣla titiwo ƒe koko nye **32**, si fia be woate ŋu axɔ didienu `2^(32)` (bɔ biliɔn ene) va se.
- **Hash si sɔ kple ZK.** Woɖo ti la kple SHA-256 o. Sapling hash-a ti la kple **Pedersen hashes** eye Orchard zãa **Sinsemilla** (eveawo katã tso Nunyaŋlɔɖi 3 me), be kpekpeɖeŋu ƒe mɔ la ƒe ɖaseɖeɖe le circuit aɖe me nanɔ bɔbɔe.

![alt text](/content-images/image-22-518354b8d5.webp)

### Nu ɖeka si ti la mewɔna o: gaɖoɖo eve

Ti la ɖea ɖase be didienu aɖe **le anyi**. Eya ŋutɔ menoa mɔ na wò be nàtsɔ didienu ma ke awɔ dɔ zi eve o. Dɔ ma le **gaɣaɣla ɖeɖe dzesi ƒe ƒuƒoƒe [nullifier set]** si le Nunyaŋlɔɖi 0 me ƒe asi: ƒuƒoƒe vovovo aɖe si me "token si wode ɖa" le. Ne nètsɔa didienu aɖe wɔ dɔ la, nèɖea didienu la ƒe gaɣaɣla ɖeɖe dzesi fia, eye network la gbea gaɣaɣla ɖeɖe dzesi siawo katã gbe si wòkpɔ kpɔ.

Eyata ɖoɖo siwo ame katã ate ŋu akpɔ la wɔa dɔ ɖeka kple ɖeka, eye be woɖe wo ɖe asi ɖeka me o la tututu nye nu si tsia mɔ na kadodo le didienu ƒe dzidzi kple eƒe ku dome:

| Ɖoɖo | Biabia si wòɖoa ŋu | Ɣe si woana yeyee |
|---|---|---|
| **Didienu adzɔgbeɖeɖe ƒe ti** | "Didienu sia le anyi oa?" | Wo**wɔ** didienu aɖe (wodzea adzɔgbeɖeɖe kple) |
| **Gaɣaɣla ɖeɖe dzesi ƒe ƒuƒoƒe** | "Woɖo didienu sia dzi kpɔ oa?" | Wo**tsɔ** didienu aɖe wɔ dɔ (woɖea gaɣaɣla ɖeɖe dzesi fia) |

---

## 6. Ɖeɖeɖe nyateƒe aɖe

Míewɔ fafa, abe ɣesiaɣi ene. Merkle ƒe titi siwo woziedzea dzi vavã la lée ɖe "frontier" ɣaɣla dzesi ŋɔŋlɔwo ŋu be dzita la nate ŋu atrɔ ne womagaɖo ti blibo la ƒe akɔnta o; network la léa dzitawo si va yi nyitsɔ ko ƒe ɣeyiɣi aɖe, menye dzita mamlɛtɔ ko o, be gakotokuwo [wallets] nagblẽ ɣesiaɣi si gaɖoɖowo ƒuƒoƒe [block] yeye aɖe va o; eye aɖakawo si mele o zãa padding ƒe asixɔxɔ si woɖo da. Mítsɔ ti eve evewo wɔ nɔnɔme nyuitɔ kple ƒuƒoƒewo siwo nye eve ƒe ŋusẽ. Esia aɖeke metrɔ nuxlɔ̃ame la o: adzɔgbeɖeɖewo ƒe aɖakawo, wo-hash wo ɖe eve eve va se dzita ɖeka, kple kpekpeɖeŋu ƒe ɖaseɖigbalɛ kpuiewo. Agbalẽ si ƒoa nu tso protocol ŋu la agatrɔ va ɖe akɔnta kekeawo ŋu.

---

## 7. Nuwo ƒe kpuie nɔnɔme

- **Merkle ƒe ti** hash-a nyatakakawo zu **aɖakawo**, eye wòhash-a **evewo yi dzi** va se **dzita** ɖeka koe gali.
- Tso avalanche effect ta, **dzita la nye xexlẽme blibo la ƒe kpɔkplɔɖa**: Trɔ aɖaka ɖeka eye dzita la atrɔ. Asixɔxɔ kpuie ɖeka ɖea ɖase na nyatakaka gã aɖe.
- **Kpekpeɖeŋu ƒe ɖaseɖigbalɛ (ɖaseɖeɖe ƒe mɔ)** nye nɔviwo siwo le mɔ si yina dzita la gbɔ, hash **log_2(n)** kple eŋu, eyata ɖaseɖigbalɛwo nɔa kpuie hã ne aɖakawo biliɔn geɖe le.
- Ne wowɔe **le zero-knowledge proof ƒe me**, kpekpeɖeŋu ma ɣla aɖaka *ka* nèdi la, eye wòɖea ɖase be "nye didienu le ti la me" ne mèfia didienu la alo eƒe afi o.
- Zcash ƒe **didienu adzɔgbeɖeɖe ƒe ti** nye Merkle ƒe ti si **wodzena nuwo kple**, si ƒe koko nye **32**, si ƒe dzita nye **anchor**; Sapling hash-ae kple **Pedersen** eye Orchard zãa **Sinsemilla**.
- Ti la ɖea ɖase na **nɔnɔme**; **gaɣaɣla ɖeɖe dzesi ƒe ƒuƒoƒe** si le vovo la tsia mɔ na **gaɖoɖo eve**. Be woɖe wo ɖe asi ɖeka me o la nye nu si tsia kadodo le didienu ƒe dzidzi kple eƒe ku dome.

---

## Nyagbewo ƒe Gɔmeɖeɖe

| Nyagbe | Gɔmeɖeɖe bɔbɔe |
|---|---|
| **Merkle tree** | Hashwo ƒe ti; aɖakawo nye nyatakakawo ƒe kpɔkplɔɖawo, dzilawo hash-a woƒe viwo |
| **Leaf** | Ɣaɣla dzesi ŋɔŋlɔ si le anyi; le Zcash me, didienu adzɔgbeɖeɖe ɖeka |
| **Merkle root** | Kpɔkplɔɖa ɖeka si le dzia, si wɔa ti blibo la ƒe kpuie nɔnɔme |
| **Authentication path / Merkle proof** | Nɔvi hashwo si hiã be woaɖe ɖase be aɖaka aɖe le ti la me |
| **Incremental Merkle tree** | Merkle ƒe ti si me wodzea aɖakawo kple ko |
| **Anchor** | Merkle ƒe dzita si gaɖoɖo aɖe wɔa dɔ kple abe "ti ƒe nɔnɔme si me mele ɖase ɖem ɖe" ene |
| **Nullifier set** | Ƒuƒoƒe vovovo si me dzesiwo si fia be woɖo didienu dzi kpɔ le, si tsia mɔ na gaɖoɖo eve |

---

## FAQ

**Nu ka ta ti, ke menye hashwo ƒe xexlẽme didi ko o?**
Xexlẽme fafa aɖe ana be nàfia alo nàkpɔ entry ɖe sia ɖe be nàɖe kpekpeɖeŋu ɖase. Ti aɖe naa wò ɖaseɖigbalɛwo siwo ƒe gãmenyenye nye logarithmic kple dzita ɖeka na nyateƒe dzadzɛ.

**Ame si le kpekpeɖeŋu ɖem hia ti blibo la oa?**
Ao. Ame si le kpekpeɖeŋu ɖem hia **dzita** la kple wò ɖaseɖeɖe ƒe mɔ kpuie la ko. Esiae nye ta vevi.

**Nu ka ta koko 32 tututu?**
Eɖoa ti la ƒe teƒe ɖe didienu biliɔn ene kple eŋu, si le teƒe geɖe, ke wòléa kpekpeɖeŋu ƒe ɖaseɖigbalɛ (kple eƒe circuit me asixɔxɔ) ƒe gãmenyenye ɖe teƒe ɖeka si bɔbɔe eye woate ŋu akpɔ dzi.

**Ne dzita la trɔna ɣesiaɣi si didienu yeye va la, aleke ɖaseɖigbalɛ xoxoawo nɔa nyateƒe?**
Network la ɖoa dzitawo si va yi nyitsɔ ko ƒe ɣeyiɣi aɖe ɖe dzi, eyata ɖaseɖigbalɛ si wowɔ ɖe anchor tsɔ vie la dzi hã ate ŋu akpɔ kpekpeɖeŋu. Agbalẽ si ƒoa nu tso protocol ŋu la ɖe esia fia tututu.

---

### Kpɔ wò nuxlɔ̃ame

Le míeƒe aɖaka ene ƒe ti me, bu be ame vɔ̃ aɖe trɔ aɖaka `C` le ɣaɣla me yi asixɔxɔ bubu, ke wòde dzita si woɖe fia la ɖe afi ma ke. Nu ka ava dzɔ na wo, eye nu ka ta womate ŋu awɔe le ɣaɣla me o? *(Ŋuɖoɖo le ete.)*

<details><summary>Ŋuɖoɖo</summary>

Be woatrɔ `C` la atrɔ `hC` (avalanche effect), si atrɔ `hCD = H(hC, hD)`, si atrɔ `ROOT = H(hAB, hCD)`. Eyata dzita si woƒe akɔnta gaɖo la magasɔ kple dzita si woɖe fia la o, eye woakpɔ be ame aɖe wɔ nu vɔ̃. Be woa"trɔe le ɣaɣla me" la, ele be woakpɔ `C` bubu aɖe si ana `hC` *ma ke* ava, si nye hash collision, nu si womate ŋu awɔ o le Nunyaŋlɔɖi 3 nu. Nyateƒe dzadzɛ nɔ anyi.
</details>

---

### Nu si kplɔe ɖo

**Nunyaŋlɔɖi 5 . Zero-knowledge proofs:** ƒuƒoƒe dziƒo. Fifia míeɖo didienuwo, adzɔgbeɖeɖewo, kple ti la, eye míegblɔa ɣesiaɣi be "woɖe ɖase le zero knowledge me." Nunyaŋlɔɖi 5 aɖe ale si nàte ŋu aɖe ɖase be nya aɖe nye nyateƒe, be wò didienu le ti la me, be wò gaɣaɣla ɖeɖe dzesi le nyateƒe, be ga ƒe home sɔ, ne mèfia naneke le eme o.

*Enye akpa aɖe le* Zcash Tso Gɔmedzedze Me *ƒe series na [ZecHub](https://zechub.org). Woɖe mɔ na e le CC BY-SA 4.0 nu.*

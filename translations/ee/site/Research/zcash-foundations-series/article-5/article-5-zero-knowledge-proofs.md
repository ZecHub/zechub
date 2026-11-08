# Zero-Knowledge Ɖaseɖigbalɛ [Proofs]: Ale si Nàfia Be Èle Nyateƒe Gake Mègblɔ Nu Si Ta O
##### Gbedasi ƒe Nyagblɔɖi Tso [Annkkitaaa](https://github.com/Annkkitaaa) Gbɔ

![alt text](/content-images/image-23-71534bece9.webp)

### Avɔ̃ si na xexeame katã ƒe amewo ate ŋu akpɔ nya si womate ŋu akpɔ o ƒe nyateƒe

> **Series:** *Zcash Tso Gɔmedzedze ƒe Gɔmeɖoɖowo Me* . **Article 5 . Zero-Knowledge Ɖaseɖigbalɛ**
> **Amewo si woŋlɔe na:** Ame yeyeawo. Míetrɔ ɖo article siwo va do ŋgɔ katã (finite fields, curves, adzɔgbeɖeɖewo, Merkle trees), gake míeɖoa susu siawo katã ɖe edzi ne míele hia wo.
> **Nu si nàtsɔ ado go:** Nàse gɔme nyuie, eye wòanya nyateƒe si zero-knowledge ɖaseɖigbalɛ nye, ŋugbedodo etɔ si wòwɔ, ale si woɖea nya ɖeɖe siawo katã ƒe ɖase, kple nu si doa ŋusẽ Zcash ƒe Sapling kple Orchard.

Esiae nye article si me series blibo la katã le dzodzo na. Tso [Article 0](article-0-shielded-transaction.md) dzi la, míenɔa gbe be woɖea fexexe ƒe nyateƒe "le avɔ̃ megbe," eye woɖea eƒe nyateƒe fia be womefia naneke o. Zero-knowledge ɖaseɖigbalɛe nye avɔ̃ ma. Eyae va ɖɔ nya sesẽ si míedze egɔme la: *Alekee ame bubuwo ate ŋu akpɔ gaɖoɖo si womede mɔ na wo be woakpɔ o ƒe nyateƒe?*

---

## 1. Nu ka ta wòle be nàdzro eŋu?

Bu ŋu ɖe nya si wɔa ŋutinya le Zcash ƒe dzi:

- Gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] le ŋutinya elabena **ame sia ame ate ŋu akpɔ eƒe nyateƒe**.
- Zcash ƒe fexexewo nye **ɣaɣla [privacy] blibo**: ga ƒe asasrã, ame si dɔe, ame si xɔe, wo katã woɣla.

Nya siawo ƒe kpɔɖeŋu le abe wodze tsitre ɖe wo nɔewo ŋu ene. Ɖasekpɔkpɔ abe nu si hiã be woakpɔe ene. Ɣaɣla de mɔ kpɔkpɔ ma ŋu. Ne mèkate ŋu aɖe wo ƒe kpɔɖeŋu sia ɖa o la, mèkate ŋu akpɔ ga ɣaɣla si ame sia ame ate ŋu axɔ se ɖe eŋu o.

**Zero-knowledge ɖaseɖigbalɛ (ZKP)**e ɖea kpɔɖeŋu ma ɖa. Ena **ame si ɖea ɖase** ate ŋu aɖe fia na **ame si kpɔa ɖase** be nya aɖe nye nyateƒe **eye womefia naneke tso eŋu wu be enye nyateƒe o.** Ga ƒe asasrã aɖeke manɔ o. Ame ƒe dzesi aɖeke manɔ o. Didienu [note] aɖeke manɔ o. Ke ko: *"Nu sia mewɔ ɖe seawo katã dzi."* Mina míatu gɔmesese la hafi míage ɖe mɔnu sesẽwo me.

---

## 2. Gɔmesese: ɖaseɖigbalɛ gbetɔ̃ aɖewo

**Ɖase be nènya password, eye mègblɔe o.** Website aɖe ate ŋu akpɔ be nènya wò password to eme be makpɔ wò le nu si password koe ate ŋu aʋu ƒe ʋuʋu me, eye makpɔ password la ŋutɔ o. Nèɖea *nyanya* ƒe ɖase, eye mède *fiafia* afia o.

**Xɔ̃ si mate ŋu akpɔ amadzidze vovototo o kple bola eve.** Nèle bola dzĩ aɖe kple bola gbegblẽ aɖe siwo ƒe nɔnɔ ɖeka le wò xɔ̃ si mate ŋu akpɔ amadzidze vovototo o ƒe ŋkume. Èdi be nàna wòaxɔ se be woƒe *amadzidze le vovo* eye mègblɔ na e be ame kae nye ame kae o. Eɣla bola eveawo le eƒe megbe, eye wòate ŋu aɖɔli wo, eye wòfia ɖeka na wò. Ègblɔ nɛ be eɖɔli wo alo o. Ne bolaawo ƒe amadzidze le vovo tututu la, nèle nyateƒe gblɔm ɣesiaɣi. Ne wole ɖeka ko la, nèle dzodzrom, eye àgbɔ nyateƒe zi ɖeka le zi eve me. Le ƒoƒo 20 megbe la, wò ƒe nyateƒe gblɔgblɔ si medze be o la ana wòaxɔ se be woƒe amadzidze le vovo, gake wòme nya bola kae nye dzĩ o. **Exɔ se ɖe nyateƒe aɖe ŋu, eye wòmenya nu bubu aɖeke o.** Esiae nye zero knowledge le eƒe suekeke me.

**Doŋkpe la.** Doŋkpe si le ring ƒe nɔnɔ me la ƒe agbe me la, agbo mágica aɖe le eme si ʋuna ne woŋlɔ nya ɣaɣla aɖe ko. Ègblɔ be ènya nya ma. Be nàɖe eƒe nyateƒe fia eye mègblɔe o la: ame si kpɔa ɖase la nɔa gota, eye nèzɔ ge ɖe eme, eye nèfia mɔ ɖe mɔ miɛ alo mɔ gome kple dzodzro. Ame si kpɔa ɖase la va ho mɔ si wòdi be nàdo *go* tsoe. Ne ènya nya ma tututu la, àte ŋu awɔ nu si wògblɔ ɣesiaɣi (àte ŋu aʋu agbo la be nàtrɔ yi mɔ bubu me ne ele be ewɔ). Ne nèle afɔɖeɖe wɔm la, àte ŋu ado go to mɔ si sɔ ko kple dzodzro, 50/50 le ƒoƒo sia ƒe sia me. Wɔe zi 20, eye ame si le afɔɖeɖe wɔm ƒe mɔnu be wòato eme le ŋgɔme wu milion ɖeka ƒe akpa ɖeka. 

Doŋkpe ƒe nyagblɔ sia fia **ŋugbedodo etɔ** si zero-knowledge ɖaseɖigbalɛ sia sia lazima be wòawɔ.

---

## 3. Ŋugbedodo etɔawo

![alt text](/content-images/image-24-b559d31849.webp)

| Ŋugbedodo | Le doŋkpe ƒe nyagblɔ me | Le Zcash me |
|---|---|---|
| **Completeness** | Ne ènya nya la, èdoa go to mɔ sɔ la dzi ɣesiaɣi | Gaɖoɖo si le se me ɣesiaɣi naa ɖase si woaxɔ |
| **Soundness** | Ame si le afɔɖeɖe wɔm la woakpɔe le mɔnu sesẽ me | Gaɖoɖo si nye atsyɔ̃ (ga si woƒo, double-spend) mate ŋu awɔ ɖase si woaxɔ o |
| **Zero-knowledge** | Ame si kpɔa ɖase la mese nya ɣaɣla la o | Network la menya ga ƒe asasrãwo, gaɖoƒe ƒe dzesiwo, alo didienu kae o |

Ne ɖeka pɛ hã le esiawo dome gbã la, ɖoɖo la gbã: ne completeness mele o la, woagbe ame siwo le nyateƒe la; ne soundness mele o la, ame siwo ƒoa atsyɔ̃ ƒea ga; ne zero-knowledge mele o la, ɣaɣla vana.

---

## 4. Tso doŋkpe me yi nya sia sia: circuits kple witnesswo

Doŋkpe la ɖea nya dzeani ɖeka ƒe ɖase. Zcash hia be wòaɖe nya deasi aɖe ƒe ɖase: *"Menya didienu si wometsɔ dɔ o le ati la me, wode mɔ nam be matsɔe dɔ, woƒe gaɣaɣla ɖeɖe dzesi [nullifier] wɔ ɖe mɔ sɔ me, eye nye nu siwo mede ge me sɔ kple nu siwo doa go."* Alekee míatso bolaawo kple doŋkpe la me age ɖe esia me?

Ga ƒe lẽ [bridge] lae nye susu aɖe si blia series sia blibo ƒe akpawo katã ɖekae:

> **Nya sia sia si nàte ŋu akpɔ eƒe nyateƒe kple computation la, woate ŋu agbugbɔ aŋlɔe abe arithmetic circuit ene:** ƒuƒoƒo na wo kple ƒoƒo ɖe finite field aɖe dzi (Article 1).

Bu circuit la ŋu abe arithmetic sewo ƒe xexlẽme ene siwo **katã** wɔa nyuie ne nya la nye nyateƒe ko. Nu siwo woɣla, siwo naa be nu katã sɔ, wò didienu, wò key, Merkle mɔ la, woayɔ wo be **witness.**

![alt text](/content-images/image-25-2479377e43.webp)

Esia tae míetsɔ Article 1 wɔ finite fields, eye míetsɔ Article 3 wɔ ZK-friendly hashes: circuit la doa nu le field arithmetic me, eyata operation sia sia si le nya la me (si me hashing kple Merkle dzedze ƒe Article 4 hã le) lazima be woagblɔe nenema. Ne operation aɖe ƒe gblɔgblɔ le bɔbɔe wu la, ɖase la zu sue eye wòwɔa dɔ kaba.

---

## 5. Nanaa be wòawɔ dɔ: non-interactive kple succinct

Doŋkpe la hia be woayi va yi. Esia menyo na gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu o, afi si ele be woaɖo ɖase la zi ɖeka, eye ame sia ame nakpɔe tegbee. Huhumɔnu eve aɖe wɔa be wòanyo.

**Non-interactive (Fiat-Shamir ƒe susu).** Le teƒe si ame si kpɔa ɖase la anɔ agblɔ dzodzro ƒe biabiawo la, ame si ɖea ɖase lae wɔa "dzodzro ƒe biabiawo" la to eƒe ɖase si wòwɔ va se fifia ƒe *hashing* me. Esi hash nyui aɖe megblɔna ɖe ŋgɔ o (Article 3) ta la, ame si ɖea ɖase la mate ŋu aɖo biabiawo ɖe eƒe nyonyo nu o. Ɖoɖoɖo si le nu gblɔm va yi la trɔ zu **ɖase ɖeka si le eɖokpe me** si ame sia ame ate ŋu akpɔ emegbe, eye womehia be woanɔ nu gblɔm va yi o.

**Succinct.** Ɖoɖoɖo nyuitɔwo wɔa ɖase lae be wòanye **sue tututu eye wòakpɔe le kaba me, ne nya si woɖea eƒe ɖase le gã alekee hã.** Esiae nye akpa si le nukunu wɔm tututu.

> Groth16 ɖase (ɖoɖo si Sapling zã) le abe **bytes 192** ene, eye woate ŋu akpɔ eƒe nyateƒe le milliseconds me, *ne nya si wòɖea eƒe ɖase le sue alo le gã hã.* Bytes alafa aɖe ate ŋu aɖe computation si me se alafa geɖewo le ƒe ɖase.

Ne nàtsɔ wo eveawo ƒo kple ɖeka la, àkpɔ nyeŋlɔ si nàkpɔ le afi sia afi:

> **zk-SNARK** = **z**ero-**k**nowledge **S**uccinct **N**on-interactive **AR**gument of **K**nowledge. Zero-knowledge (mefia naneke o), succinct (sue eye wòle kaba), non-interactive (zi ɖeka ko), argument of knowledge (ame si ɖea ɖase la *nya* witness si le se me).

---

## 6. Nusi menyo o ɖeka: mɔ̃ ƒe ɖoɖo xexlẽnuwo

Nu aɖeke mele baɖa o. SNARK geɖewo hia **ɖoɖo** zi ɖeka ko si wɔa public parameters na circuit la. Ɖoɖo la wɔa dzodzro ƒe number si nye ɣaɣla, eye lazima be woatsrɔ ɣaɣla ma. Ne ame aɖe kpɔe ɖe asi la, ate ŋu awɔ ɖase atsyɔ̃, si nye be **wòaƒo ga** (gake, le nyateƒe me, wòmate ŋu agbã ɣaɣla o).

Woƒe ɣaɣla si kplɔe ɖo la ƒe ŋkɔe nye **toxic waste.** Be woatsrɔe le dedie me la, Zcash wɔ **ame geɖe ƒe kpekpeɖeŋu ƒe ceremonywo** si me ame vovovo geɖewo ƒe sia ƒe tsɔ dzodzro ƒe number aɖe va; ne *ame ɖeka ko* hã tsrɔ eƒe akpa le nyateƒe me la, womate ŋu agatrɔ akpɔ toxic waste la o.

![alt text](/content-images/image-26-cdad6625cd.webp)

Ɖoɖoɖo yeyeawo ɖea hiahiã sia ɖa blibo, eye esiae nye nu vevi aɖe si ta Zcash trɔ eƒe ɖase ƒe ɖoɖo yi ŋgɔ le ɣeyiɣi me.

---

## 7. Afi si esia le le Zcash me

| Design | Ɖase ƒe ɖoɖo | Mɔ̃ ƒe ɖoɖo xexlẽnuwo hiaa? | Woɖo eƒe gɔme ɖe |
|---|---|---|---|
| **Sprout** (gɔmedzedzetɔ) | zk-SNARK ƒe gɔmedzedze | Ɛ̃ | ceremony gɔmedzetɔ |
| **Sapling** | **Groth16** | Ɛ̃ ("Powers of Tau" ame geɖe ƒe ceremony + Sapling ceremony) | **BLS12-381** (Article 2) |
| **Orchard** (fifia) | **Halo 2** | **Ao, mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o** | **Pallas / Vesta** (Article 2) |

Mɔzɔzɔ tso Sprout yi Sapling yi Orchard la katã ate ŋu anye nyagblɔ tso ɖasewo ƒe zuzu sue, kaba, kple mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe ɖaɖa ŋu. **Halo 2**, si Orchard zã, mehĩa ceremony aɖeke o eye woɖoe be wòakpe ɖe *recursion* ŋu (ɖase siwo kpɔa ɖase bubuwo ƒe nyateƒe), esia ta Orchard zã Pallas/Vesta ƒe curves ƒe **cycle** si le Article 2: curve sia sia ƒe ɖoɖo le be wòakpɔ ɖase si woŋlɔ le bubu la ƒe dzi ƒe nyateƒe.

Esia bu klolo vevitɔ si le Article 0 me. Nukunu si nye "le avɔ̃ megbe" la nye **zk-SNARK**: eɖea fia be wò gaɖoɖo wɔ ɖe arithmetic circuit si ɖe seawo katã ƒe gɔme la dzi, eye womefia naneke wu bit ɖeka si nye "le se me" o.

---

## 8. Nya nyateƒe aɖe

Zero-knowledge ɖaseɖigbalɛwo nye nusrɔ̃ɖi sesẽ aɖe, eye míenɔ gɔmesese ƒe teƒe ko kple taɖodzinu. Míemegblɔ soundness ƒe probability ƒe se xɔseawo ƒe nɔnɔ tututu o, arithmetic circuit ƒe nɔnɔ tututu (R1CS, PLONKish, kple bubuwo), ale si polynomials kple adzɔgbeɖeɖewo trɔa circuit la zu ɖase kpui aɖe, alo Groth16 kple Halo 2 ƒe emetsonuwo o. Doŋkpe la nye ɖase si woɖea kple ame eve ƒe nuƒoƒo; production ƒe ɖoɖoawo menɔa nu gblɔm va yi o eye wole sesẽ wu. Esia aɖeke metrɔa gɔme vevitɔ la o: ɖe fia be circuit aɖe le se me to witness ɣaɣla aɖe dzi, blibo, kple soundness, eye womefia naneke o. Mɔnuawo le abe series blibo aɖe ƒe ŋutinya ene.

---

## 9. Nufiame

- **Zero-knowledge ɖaseɖigbalɛ** naa ame si ɖea ɖase la ate ŋu aɖe fia na ame si kpɔa ɖase la be nya aɖe nye nyateƒe **eye womefia nu bubu aɖeke o**, eye eɖea verify-versus-privacy ƒe kpɔɖeŋu ɖa.
- Ele be wòawɔ ŋugbedodo etɔ: **completeness** (nya nyateƒewo dea amewo dzi), **soundness** (nya aɖeke si menye nyateƒe o mate ŋu ade ame dzi o), kple **zero-knowledge** (ame si kpɔa ɖase la nya "enye nyateƒe" ko).
- Nya sia sia trɔa zu **arithmetic circuits** le finite field aɖe dzi; nu ɣaɣla siwo wɔa be circuit la sɔe nye **witness**. Esia ta finite fields kple ZK-friendly hashes le vevie.
- **Fiat-Shamir** wɔa be ɖasewo nanɔ **non-interactive** (zi ɖeka ko); ɖoɖo nyuitɔwo hã nye **succinct** (Groth16 ɖase le abe **bytes 192** ene, eye woate ŋu akpɔ eƒe nyateƒe le milliseconds me ne nya la le gã alekee hã). Ne woƒo wo eveawo kple ɖeka la: **zk-SNARK**.
- SNARK aɖewo hia **mɔ̃ ƒe ɖoɖo xexlẽnuwo** si ƒe **toxic waste** si kplɔe ɖo lazima be woatsrɔe (to ame geɖe ƒe ceremonywo me); ne woɖe eƒe dedie la, wòana woate ŋu aƒo ga, gake **menɔa ɣaɣla gbãm o**.
- **Sapling** zã **Groth16** (mɔ̃ ƒe ɖoɖo xexlẽnuwo, BLS12-381); **Orchard** zã **Halo 2** (mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o, Pallas/Vesta, recursion-friendly).

---

## Nyawo ƒe Gɔme

| Nya | Gɔmesese bɔbɔe |
|---|---|
| **Zero-knowledge proof** | De ame aɖe dzi be nya aɖe nye nyateƒe, eye mègblɔ nu bubu aɖeke o |
| **Prover / Verifier** | Ame si wɔa ɖase la / ame si kpɔa eƒe nyateƒe |
| **Completeness** | Woaxɔ nya nyateƒewo ɣesiaɣi (tso ame si ɖea ɖase le nyateƒe me gbɔ) |
| **Soundness** | Woagbe nya siwo menye nyateƒe o (ame siwo di be woawɔ atsyɔ̃ mate ŋu awɔ dzi o, negbe to dzodzro me ko) |
| **Witness** | Nu ɣaɣla siwo wɔa be nya la nye nyateƒe |
| **Arithmetic circuit** | Nya aɖe si woŋlɔ gbugbɔ abe ƒoƒo kple ƒuƒoƒo le finite field aɖe dzi ene |
| **Non-interactive (Fiat-Shamir)** | Ɖase zi ɖeka si mehĩa be ame eve anɔ nu gblɔm va yi o |
| **Succinct** | Ɖase la le sue eye woate ŋu akpɔ eƒe nyateƒe le kaba me ne nya la le gã alekee hã |
| **zk-SNARK** | Zero-knowledge Succinct Non-interactive ARgument of Knowledge |
| **Trusted setup / toxic waste** | Parameter wɔwɔ zi ɖeka si ƒe ɣaɣla si kplɔe ɖo lazima be woatsrɔe |

---

## Biabia Si Woƒoa Gbegbe

**Ne ɖase la mefia naneke o la, alekee eƒe kpɔkpɔ ƒe nyateƒe ate ŋu anye nu aɖe?**  
Elabena woɖo maths la ale be *witness* si nye nyateƒe koe ate ŋu awɔ ɖase si ato eme. Eƒe toto emee nye ɖase la ŋutɔ, eye mègahiã be woafia nu aɖeke o.

**Ame aɖe ate ŋu awɔ ɖase atsyɔ̃a?**  
Soundness wɔa be esia mate ŋu awɔ o. Nu ɖeka si ate ŋu awɔe nye SNARK si ƒe toxic waste le mɔ̃ ƒe ɖoɖo xexlẽnuwo me wometsrɔ o; esiae tututu ta ceremonywo siwo wɔna be woatsrɔe le vevie.

**Mɔ̃ ƒe ɖoɖo xexlẽnuwo si gbã ate ŋu aɖe nye private data fiaa?**  
Ao. Anya na ame vɔ̃ aɖe mɔ be wòaƒo ga *yeye*, gake **menɔa** ga ƒe asasrãwo, gaɖoƒe ƒe dzesiwo, alo didienuwo **fia o**. Ɣaɣla kple soundness nye ŋugbedodo vovovo.

**Nu ka ta Zcash trɔ ɖase ƒe ɖoɖoawo le ɣeyiɣi me?**  
Be woakpɔ ɖase siwo le sue, le kaba, eye, kple Halo 2, woaɖe mɔ̃ ƒe ɖoɖo xexlẽnuwo ɖa blibo eye woana recursion ava.

---

### Ɖo wò gɔmesese kpɔ

Le doŋkpe la me, nu ka ta wòle vevie be ame si kpɔa ɖase la tia mɔ si woado go tsoe *le eme be* ame si ɖea ɖase la va ge ɖe eme yina, le teƒe si wòagblɔe na e hafi wòaɖe afɔ? *(Ŋuɖoɖo le afima.)*

<details><summary>Ŋuɖoɖo</summary>

Ne ame si kpɔa ɖase la gblɔ mɔ la do ŋgɔ la, ame si le afɔɖeɖe wɔm si menya nya la o ate ŋu age ɖe mɔ ma me tso gɔmedzedze, eye wòava do go kple bɔbɔe, eye wòmehia agbo la o. Titi le eme be ame si ɖea ɖase la de mɔ aɖe me ɖo hafi woabiae la doa ame si le afɔɖeɖe wɔm la ɖe dzodzro ƒe ŋu (50/50 le ƒoƒo sia ƒe sia me), eye esiae wɔa be ƒoƒo geɖewo ƒe wɔwɔ nava de ame dzi. "De nu ɖo do ŋgɔ, eye woabia wò emegbe" ƒe ɖoɖo siae Fiat-Shamir hã le dzadzram, esi wòtsɔ hash tso ame si ɖea ɖase la ƒe ɖase si wòde ɖo xoxo me hea biabia la.
</details>

---

### Nu si ava do ŋgɔ

**Article 6 . Ɣaɣla protocol, tso gɔme yi nuwuwu:** nuwuwu la. Míatsɔ akpa sia sia, didienuwo, adzɔgbeɖeɖewo, didienu ƒe adzɔgbeɖeɖe ati, gaɣaɣla ɖeɖe dzesiwo, value balance, kple zero-knowledge ɖaseɖigbalɛ la, afɔ ɖe Zcash ƒe ɣaɣla gaɖoɖo blibo aɖe me, eye míabu klolo sia sia si míeʋu le Article 0 me la katã.

*Enye akpa le* Zcash Tso Gɔmedzedze ƒe Gɔmeɖoɖowo *ƒe series na [ZecHub](https://zechub.org). Woɖe mɔ nɛ le CC BY-SA 4.0 te.*

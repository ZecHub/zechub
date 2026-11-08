# Ɖekae ƒe Gaɖoƒe ƒe Dzesi [Unified Address] (ZIP-316) ƒe Kaka Kpɔ

*Esia nye nusrɔ̃mɔfi, menye decoder si woɖo ɖe akpaɖe o alo fexexe ƒe library si wòate ŋu akɔpi eye nàtsɔ o. Eɖe fia ale si Ɖekae ƒe Gaɖoƒe ƒe Dzesi wɔe ene, ale be nàse nu si library siwo wòléa ɖe asi wɔa le eƒe me. Ne nu aɖe anwɔ ga vavã ŋu la, de asi na [ZIP-316 ƒe specification](https://zips.z.cash/zip-0316) kple dɔwɔwɔ siwo wòtsɔ ka ɖe ete afii.*

---

## Nɔnɔme gã la

Ɖekae ƒe Gaɖoƒe ƒe Dzesi (UA) nye gaɖoƒe ƒe dzesi ƒe akpa ɖeka si tsɔ receiver ƒe ƒomevi geɖe: **nuwo ƒe ʋuʋuɖi [Transparent]**, **Sapling**, **Orchard**, alo woƒe akpaɖe ƒoƒo. Gakotoku [wallet] si wòle fexexe wɔm atia receiver gaƒuƒoƒo si nyo wu si wòate ŋu akpe ɖe eŋu.

Bu UA be enye agbalẽ ƒe akpɔdzi si wotu ɖe eŋu, si me kadi siwo wode dzesi ɖe wo ŋu le. Kadi ɖeka sia ɖeka fia mɔ vovovo si wòato atsɔ ava ɖe gbɔwò. Be application aɖe nakpɔ gaɖoƒe ƒe dzesi aɖe la, ele be wòawɔ esiawo:

1. **Ʋu akpɔdzi la:** Ɖe text ƒe akpa la me.
2. **Trɔ emenyawo ƒe ƒoƒo:** Ɖe ɣaɣla ƒe ɖeɖe vovovo (**F4Jumble**) ɖa.
3. **Xlẽ kadi ɖeka sia ɖeka:** Ɖe receiver ɖeka sia ɖeka me.
4. **Wɔ protocol ƒe sewo dzi:** Gbe entrywo gbɔ alo gbee wo ɖe woƒe typecode ƒe range nu.

---

## Nu ka ta "ɖe Bech32m ko me" meɖe o

UA tsɔ Bech32m text encoding, gake Bech32m ƒe ɖeɖe meɖe receiver siwo woate ŋu azã la fia o.

ZIP-316 tsɔ **F4Jumble** ƒo payload la kple ŋutete hafi wòawɔ encoding. F4Jumble na be ne wo trɔ dzesi ɖeka pɛ le gaɖoƒe ƒe dzesi la me la, decoded output la katã trɔ. Esia doa mɔ na address malleability ƒe attackwo, afi si attack wɔla aɖe trɔ bytewo le gaɖoƒe ƒe dzesi la ƒe titina, eye prefix kple suffix la gake nɔ ekpɔm be wòle bɔbɔe.

> **Se vevi:** Malleability ƒe ɣaɣla wɔ dɔ ko ne wòƒe application wɔ ɖeɖe kple kaka kpɔ ƒe mɔ katã. Ɖeɖe ƒe akpa aɖe ko ɖea dedie ɖa, eye wòle afɔku katã la ɖe asi.

---

## Ɖeɖe ƒe mɔ la, afɔ ɖeka ɖe afɔ ɖeka

### Afɔ 1: Ɖe Bech32m me eye nàkpɔ network la
- **Akpa si amewo ate ŋu axlẽ (HRP):** `u` fia mainnet; `utest` fia testnet. *(Mainnet ƒe UAwo dze egɔme kple `u1`, afi si `1` nye Bech32 ƒe separator.)*
- **Didime ƒe se:** Bech32m si wozãna ɖo character 90 ƒe se. UAwo zu edze se sia ŋu zi geɖe, eya ta ele be woatsi didime ƒe kakawɔ siwo wozãna ɖa le decoder la me.
- Trɔ Bech32m ƒe nyawo siwo le bit 5 me yi bit 8 ƒe byte siwo wozãna me.

### Afɔ 2: Trɔ F4Jumble
F4Jumble nye Feistel network si wɔ round 4, si woɖo ɖe BLAKE2b ŋu:
- **Akpa gome ƒe didime:** `min(64, floor(length / 2))` bytes. Byte 64 ƒe katã dzɔ ɖe BLAKE2b ƒe output ƒe didime si gã wu ŋu. Akpa gome ƒe dre la tsɔ payload si susɔ la.
- **Hash ƒe functionwo:** Wòtrɔ G kple H ƒe zãzã kple personalization ƒe dzesi siwo meɖe o (`UA_F4Jumble_G` kple `UA_F4Jumble_H`).
- **Round ƒe ɖoɖo:** Encoding si yi ŋgɔ la zã G(0) → H(0) → G(1) → H(1). Trɔtrɔ (unscrambling) la zã H(1) → G(1) → H(0) → G(0).
- **Range ƒe kakpɔ:** Gbe input siwo le ZIP-316 ƒe payload ƒe didime ƒe sewo me o.

### Afɔ 3: Ɖe padding ɖa eye nàkpɔ HRP la
Hafi woaƒo eƒe ƒoƒo la, encoder la kplɔ byte 16 siwo me HRP le ɖe eŋu, eye wòtsɔ zero wo ƒe afɔŋu.
- Ɖe byte 16 mamlɛtɔwo ɖa le unscrambling megbe.
- Kpɔ be HRP si le eme la sɔ kple network si wole mɔ kpɔm na (`u` alo `utest`). Esia naa be testnet ƒe gaɖoƒe ƒe dzesiwo mekpɔ mɔ le mainnet dzi le vodada me o.

### Afɔ 4: Ɖe receiverwo me
Payload si susɔ la tso `(typecode, length, content)` entries me, afi si woɖo typecode kple didime la ɖe compact-size integerwo me (byte ɖeka na value suewo). Receiver ƒe typecode siwo míenya:

| Typecode | Receiver ƒe ƒomevi       | Emenyawo ƒe didime |
| :------- | :------------------ | :------------- |
| `0x00`   | Nuwo ƒe ʋuʋuɖi (P2PKH) | Byte 20       |
| `0x01`   | Nuwo ƒe ʋuʋuɖi (P2SH)  | Byte 20       |
| `0x02`   | Sapling             | Byte 43       |
| `0x03`   | Orchard             | Byte 43       |

Le esiawo megbe la, ZIP-316 ɖo range bubu eve ɖe eŋu na ŋgɔyiyi ƒe wɔwɔ:

- **`0xC0`–`0xDF` (metadata si MUST-understand menye eŋuti o):** Ele be consumerwo nagbe metadata ƒe item siwo womanya le range sia me.
- **`0xE0` kple `0xE1` (metadata si woɖo na MUST-understand):** ZIP-316 ƒe registry si le fifia ɖo esiawo na gaɖoƒe ƒe dzesi ƒe expiry ƒe teƒe kple ɣeyiɣi. Ele be consumerwo nase item siawo gɔme alo woagbe gaɖoƒe ƒe dzesi la.
- **`0xE2`–`0xFC` (metadata si woɖo na MUST-understand gake womeɖo o):** Ele be consumerwo nagbe gaɖoƒe ƒe dzesi la ne wokpɔ item si womanya le range sia me.

Na receiver ƒe ƒomevi siwo míenya la, kpɔ be didime si woɖo le encoding me la sɔ kple emenyawo ƒe didime si woɖo na ƒomevi la. Na metadata ƒe itemwo la, zã woƒe compact-size ƒe didime si woɖo le encoding me be nànya emenyawo ƒe didime. Gbe entry siwo woɖe tso wo me vɔ o alo byte siwo katã wometsɔ zã o.

**Receiver si nyo wu ƒe ɖoɖo.** Ne gaɖoƒe ƒe dzesi aɖe ƒe parse dzɔ edzi nyuie vɔ la, ele be gakotoku alo fexexe ƒe dɔwɔnu natia receiver si nyo wu le ɖoɖo sia me: Orchard, emegbe Sapling, emegbe nuwo ƒe ʋuʋuɖi.

---

## ZIP-316 ƒe gbedede ƒe se siwo wòle be woawɔ

**Ne woɖe gaɖoƒe ƒe dzesi aɖe me nyuie hã la, menye be wòle bɔbɔe o.** Zcash ƒe gakotokuwo gbee gaɖoƒe ƒe dzesi siwo wɔ se siwo gbɔna ƒe dzodzro. Web ƒe dɔwɔnuwo hã le be woagbee wo be fexexe ƒe vodadawo megava o:

- **Ɣaɣla ƒe receiverwo mele o:** Ele be gaɖoƒe ƒe dzesi la nasɔ Sapling alo Orchard receiver atɔe kope ɖeka. UA si me nuwo ƒe ʋuʋuɖi ƒe receiverwo ko le la menye bɔbɔe le ZIP-316 nu o.
- **Typecode siwo sɔ:** Receiver ƒe ƒomevi ɖeka sia ɖeka ate ŋu ava teƒe ɖeka ko.
- **Typecode siwo womeɖo ɖe ɖoɖo me o:** Ele be receiverwo nanɔ typecode siwo dzi yiyim ŋutete ƒe ɖoɖo me.
- **Nuwo ƒe ʋuʋuɖi ƒe receiver siwo wɔ asɔtsi:** UA aɖe ate ŋu atsɔ P2PKH alo P2SH, gake **menye wo eve siaa o**.
- **Entry alo padding si mesɔ o:** Network ƒe prefix siwo mesɔ o, payload siwo woɖe tso wo me vɔ o, alo didime siwo mesɔ o le be woagbee wo enumake.
- **Typecode siwo womanya o:** Ele be consumerwo nagbe item siwo womanya o, negbe item siwo le MUST-understand metadata ƒe range me (`0xE0`–`0xFC`), siwo le be woagbee ne womanya wo o. Le registry si le fifia me la, `0xE0` kple `0xE1` nye expiry ƒe ƒomevi siwo woɖo, eye `0xE2`–`0xFC` womeɖo o. Le eya ɖokpe me la, gbe gaɖoƒe ƒe dzesi eyikeyi si mewɔ bɔbɔe ƒe se siwo katã le afii o, tso Sapling alo Orchard receiver ƒe hiãhiã la me.

---

## Nɔnɔme nyuiwo na mɔ̃ ƒe ɖoɖoŋlɔlawo [developers]

- **Sɔ receiver siwo woɖe me kpɔ, menye string siwo womeɖe me o.** Ɖe gaɖoƒe ƒe dzesiwo me hafi nàkpɔ woƒe sɔsɔ.
- **Zã library siwo wòléa ɖe asi na nu sia nu si wɔa ga ŋu.** Ɖo Rust ƒe cratewo (abe `zcash_address` ene) yi WebAssembly me ɖe teƒe be nàɖo JavaScript ƒe decoderwo kɔ ɖe anyi.
- **Nànya nu na parser siwo wòŋlɔ kple asi.** Ne nèŋlɔ ɖeka be nàsrɔ̃ nu la, bu eŋu be enye nu si nèle srɔ̃m ƒe dɔ, eye nàte eŋu kple official vector siwo le ete afii hafi nàde ŋugbe ɖe edzi le nu aɖe ŋu.

---

## Official ƒe specificationwo kple dɔwɔwɔ siwo wòtsɔ ɖe asi

- **[ZIP-316: Ɖekae ƒe Gaɖoƒe ƒe Dzesiwo kple Viewing Keys](https://zips.z.cash/zip-0316)**
- **[zcash_address crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Official test vectorwo:**
  - [F4Jumble ƒe test vectorwo](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Ɖekae ƒe Gaɖoƒe ƒe Dzesi ƒe test vectorwo](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Nyaɖeɖefia

| Nyagbe | Gɔme |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Gaɖoƒe ƒe dzesi ɖeka si ƒo receiver gaƒuƒoƒowo geɖe ɖekae. |
| **Receiver** | Fexexe ƒe teƒe ƒe ƒomevi kpọ kpọ (nuwo ƒe ʋuʋuɖi, Sapling, alo Orchard). |
| **Bech32m** | Text ƒe encoding ƒe mɔ si wozãna na UA ƒe stringwo. |
| **HRP** | Akpa si amewo ate ŋu axlẽ alo network ƒe prefix (`u` alo `utest`). |
| **F4Jumble** | Algorithm si wòate ŋu atrɔ, si naa gaɖoƒe ƒe dzesi ƒe bliboɖe. |
| **Typecode** | Xexlẽme si le entry ɖeka sia ɖeka me, si ɖea receiver ƒe ƒomevi le payload la me fia. |
| **Malleability** | Gaɖoƒe ƒe dzesi ƒe bytewo ƒe trɔtrɔ si womeɖe fia o eye womede mɔ na o. |

Kpɔ hã: [Viewing Keys](./Viewing_Keys.md)

# Unified Address (ZIP-316) ƒe Dzesidede

*Esia nye nusɔsrɔ̃ ƒe mɔfiame, menye decoder alo copy-paste fexexe ƒe agbalẽdzraɖoƒe si wobla ɖe agba me o. Eɖe alesi woɖo Unified Address me ale be nàte ŋu ase nusi agbalẽdzraɖoƒe siwo ŋu wodzra ɖo la wɔna le ʋuƒoa te gɔme. Le nusianu si kpɔa ga ŋutɔŋutɔ gbɔ gome la, he ɖe megbe na.. [ZIP-316 nɔnɔmetata](https://zips.z.cash/zip-0316) kple dziɖuɖua ƒe dɔwɔwɔ siwo do ƒome le ete.*

---

## Nɔnɔmetata gã la

Unified Address (UA) nye adrɛs ƒe ka ɖeka si tsɔa xɔla ƒomevi geɖewo: **Transparent**, **Sapling**, **Orchard**, alo ƒokpli. Gakotoku si xea fe la tiaa receiver pool nyuitɔ kekeake si wòdoa alɔe le eɖokui si.

Bu UA be enye agbalẽkotoku si wotre nu na si me agbalẽvi geɖe siwo dzi woŋlɔ nu ɖo le. Kpekpeɖeŋugbalẽvi ɖesiaɖe tsi tre ɖi na mɔ vovovo si dzi woato aɖo gbɔwò. Be dɔbiagbalẽvi aɖe nate ŋu akpɔ adrɛs aɖe la, ele be:

1. **Ʋu agbalẽkotokua:** Decode nuŋɔŋlɔ ƒe ka.
2. **Un-shuffle emenyawo:** Ðe ametakpɔnu scramble (**F4Jumble**).
3. **Xlẽ agbalẽvi ɖesiaɖe:** Ðe ame ɖekaɖeka siwo xɔa nyatakaka.
4. **Wɔ ɖoɖowɔɖi ƒe sewo dzi:** Aɖaba ƒu alo gbe nya siwo woŋlɔ ɖe woƒe typecode ƒe didime nu.

---

## Nukatae "ɖeko nàɖe Bech32m ɖa" mesɔ gbɔ o

UA zãa Bech32m nuŋɔŋlɔ ƒe nuŋɔŋlɔ, gake Bech32m ɖeɖeko ɖeɖe meɖea xɔla siwo woateŋu azã la fiana o.

ZIP-316 ɖoe koŋ tsɔa **F4Jumble** ƒoa payload la hafi tsɔa encoding. F4Jumble kpɔa egbɔ be ne ètrɔ ŋɔŋlɔdzesi ɖeka gɔ̃ hã le adrɛs la me la, etrɔa nusi woɖe tso eme la keŋkeŋ. Esia xea mɔ na adrɛs malleability amedzidzedze siwo me amedzidzela trɔa bytes le adrɛs titina esime wògblẽa ŋgɔdonya kple megbenya ɖi wòdzena abe ɖe wòsɔ ene.

> **Se vevi:** Malleability takpɔkpɔ wɔa dɔ ne wò dɔwɔwɔ wɔ decoding kple validation pipeline bliboa ko. Decoding ƒe akpa aɖe ɖeɖeɖa ɖea dedienɔnɔ ɖa esime wòléa afɔkuawo katã me ɖe asi.

---

## Decoding pipeline la, afɔɖeɖe ɖesiaɖe

### Afɔɖeɖe 1: Decode Bech32m eye nàlé ŋku ɖe network la ŋu
- **Akpa si amegbetɔ ate ŋu axlẽ (HRP):** `u` dea dzesi mainnet; `utest` dea dzesi testnet. *(Mainnet UAwo dzea egɔme kple `u1`, afi ka `1` nye Bech32 ƒe mama.)*
- **Didime ƒe seɖoƒe:** Standard Bech32m zi seɖoƒe si nye ŋɔŋlɔdzesi 90 dzi. Zi geɖe la, UAwo wua seɖoƒe sia, eyata ele be woatɔ te didime ƒe dodokpɔ siwo wozãna ɖaa le decoder la me.
- Trɔ 5-bit Bech32m nyawo atrɔ ɖe 8-bit byte siwo wozãna ɖaa ŋu.

### Afɔɖeɖe 2: Trɔ F4Jumble
F4Jumble nye Feistel ƒe kadodo 4-ƒoƒo si wotu ɖe BLAKE2b dzi:
- **Miame afã ƒe didime:** `min(64, floor(length / 2))` bytewo ƒe ƒuƒoƒo. Byte 64 ƒe nutrenu sɔ kple BLAKE2b ƒe dodoɖeŋgɔ ƒe lolome si sɔ gbɔ wu. Agba si susɔ si ŋu viɖe le la le ɖusime afãa me.
- **Hash dɔwɔwɔwo:** Trɔa G kple H to ame ŋutɔ ƒe ŋkɔ siwo woɖo ɖi zazã me (`UA_F4Jumble_G` kple `UA_F4Jumble_H`).
- **Nuwɔwɔ ɖe ɖoɖo nu goglo:** Do ŋgɔ ƒe nuŋɔŋlɔ zɔna G (0) → H (0) → G (1) → H (1). Trɔ megbe (womaɖe asi le nu ŋu o) ƒua du H(1) → G(1) → H(0) → G(0).
- **Range check:** Gbe nyawo tsɔtsɔ de eme le ZIP-316 payload ƒe lolome ƒe seɖoƒewo godo.

### Afɔɖeɖe 3: Ðe padding ɖa eye nàɖo kpe HRP la dzi
Hafi nàʋuʋu la, encoder la tsɔa byte 16 siwo me HRP le, siwo wotsɔ zerowo ƒo xlãe la kpena ɖe eŋu.
- Ðe byte 16 mamlɛawo ɖa le ʋuʋu vɔ megbe.
- Kpɔ egbɔ be HRP si wotsɔ de eme la sɔ kple network si wokpɔ mɔ na (`u` or `utest`). Esia xea mɔ na testnet adrɛswo be woagaxɔ wo le vo me le mainnet dzi o.

### Afɔɖeɖe 4: Ðe amesiwo xɔa nyatakaka
Payload susɔea nye `(typecode, length, content)` nyawo, afisi wodzraa typecode kple didime ɖo abe compact-size integers (byte ɖeka na asixɔxɔ suewo). Xɔla ƒe ƒomevi siwo wonya:

| Typecode ƒe nuŋɔŋlɔ | Xɔla ƒe ƒomevi       | Emenyawo ƒe didime |
| :------- | :------------------ | :------------- |
| `0x00`   | Nusi me kɔ (P2PKH) | 20 ƒe byte       |
| `0x01`   | Nusi me kɔ (P2SH)  | 20 ƒe byte       |
| `0x02`   | Sapling             | 43 ƒe byte       |
| `0x03`   | Orchard             | 43 ƒe byte       |

Le esiawo godo la, ZIP-316 dzra dometsotso eve bubuwo ɖo hena ŋgɔgbe ƒe ɖekawɔwɔ:

- **`0xC0`–`0xDF` (non-MUST-understand metadata):** ele be nuƒlelawo naŋe aɖaba aƒu metadata nusiwo womede dzesii le dometsotso sia me o dzi.
- **`0xE0` kple `0xE1` (assigned MUST-understand expiry metadata):** ZIP-316 registry si li fifia dea esiawo asi be woakpɔ expiry ƒe kɔkɔme kple ɣeyiɣi. Ele be nuƒlelawo nase nu siawo gɔme alo woagbe adrɛs la.
- **`0xE2`–`0xFC` (unassigned MUST-understand metadata):** ele be nuƒlelawo nagbe adrɛs la ne wodo go nusi womede dzesii o le dometsotso sia me.

Le xɔla ƒomevi siwo wonya gome la, kpɔe ɖa be didime si woŋlɔ ɖe kɔpi me la sɔ kple ƒomevi la ƒe emenyawo ƒe didime si woɖo. Le metadata nuawo gome la, zã woƒe didime si ƒe lolome le sue si woŋlɔ ɖe kɔpi me nàtsɔ anya emenyawo ƒe didime. Gbe nya siwo wotso alo byte ɖesiaɖe si le megbe.

**Referred receiver order.** Ne adrɛs aɖe nya ɖe nu me dzidzedzetɔe ko la, ele be gakotoku alo fexexe dɔwɔnu natia receiver nyuitɔ kekeake le ɖoɖo sia nu: Orchard, emegbe Sapling, emegbe transparent.

---

## ZIP-316 gbegbe ƒe se siwo wòle be woawɔ

**Decoding dzidzedzetɔe menaa adrɛs aɖe sɔ o.** Zcash gakotoku siwo dziɖuɖua da asi ɖo gbea adrɛs siwo da se siwo gbɔna dzi la keŋkeŋ. Ele be nyatakakadzraɖoƒe dɔwɔnuwo hã nagbe wo be woaxe mɔ ɖe fexexe ƒe kpododonu nu:

- **Missing shielded receivers:** Adrɛs la **ele be** nanye Sapling alo Orchard receiver ɖeka ya teti. UA si me xɔla siwo me kɔ koe le la mewɔa dɔ le ZIP-316.
- **Duplicate typecodes:** Xɔla ƒomevi ɖesiaɖe ateŋu adze zi ɖeka ya teti.
- **Ŋɔŋlɔdzesi siwo womeɖo ɖe ɖoɖo nu o:** Ele be xɔlawo nadze le nuŋɔŋlɔ ƒe ɖoɖo si le dzi yim pɛpɛpɛ nu.
- **Tsitretsitsi transparent receivers:** UA ateŋu atsɔ P2PKH alo P2SH, gake **menye evea siaa gbeɖe o**.
- **Nyaŋɔŋlɔ alo padding si womewɔ nyuie o:** Ele be network ƒe ŋgɔdonya siwo mesɔ o, payload siwo wotso, alo didime ƒe masɔmasɔ nahe gbegbe enumake vɛ.
- **Ŋɔŋlɔdzesi siwo womede dzesii o:** Ele be nuƒlelawo naŋe aɖaba aƒu nusiwo womede dzesii o dzi negbe nusiwo le metadata ƒe domedome si wòle be woase egɔme (`0xE0`–`0xFC`), si wòle be woagbe ne womede dzesii o. Le ŋkɔ ŋɔŋlɔ ƒe agbalẽ si li fifia me la, `0xE0` kple `0xE1` wodea ɣeyiɣi si woatsɔ awɔ dɔe ƒe ƒomeviwo asi na wo, esime `0xE2`–`0xFC` womede dɔ asi na wo o. Le ɖokuiwò si la, gbe adrɛs ɖesiaɖe si do kpo dɔwɔwɔ ƒe se siwo wòle be woawɔ le etame, si me Sapling alo Orchard xɔla ƒe nudidi hã le.

---

## Nuwɔna nyuitɔwo kekeake na dɔwɔlawo

- **Tsɔ kple parsed receivers, ke menye raw strings o.** Decode adrɛswo gbã hafi nàlé ŋku ɖe tasɔsɔ ŋu.
- **Zã agbalẽdzraɖoƒe siwo wodzra ɖo na nusianu si kpɔa ga gbɔ.** Compile official Rust crates (abe `zcash_address`) yi WebAssembly tsɔ wu be woatsɔ JavaScript decoder tɔxɛwo ade dɔwɔwɔ me.
- **Kpɔ nyuie le numeɖegbalẽ siwo woŋlɔ kple asi ŋu.** Ne èŋlɔ ɖeka be yeasrɔ̃e la, bu eŋu abe nusɔsrɔ̃dɔ ene eye nàdoe kpɔ kple vektor siwo dziɖuɖua da asi ɖo le ete hafi nàka ɖe edzi kple naneke.

---

## Dziɖuɖumegãwo ƒe nɔnɔmewo kple nufiamewo ƒe dɔwɔwɔwo

- **[ZIP-316: Adrɛswo Kple Nukpɔkpɔ ƒe Safui Siwo Wowɔ Ðeka](https://zips.z.cash/zip-0316)**
- **[zcash_adrɛs ƒe aɖaka (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble aɖaka (librustzcash) aɖaka](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Dodokpɔ vektor siwo dziɖuɖua ɖo:**
  - [F4Jumble dodokpɔ vektorwo](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Unified Address dodokpɔ vektorwo](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Nyagɔmeɖegbalẽ

| Nya | Gɔmeɖeɖe |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Adrɛs ɖeka ƒe ka si wotsɔ blaa nuxɔla geɖewo ƒe ƒuƒoƒo. |
| **Receiver** | Fexexe ƒe teƒe ƒomevi aɖe koŋ (si me kɔ, Sapling, alo Orchard). |
| **Bech32m** | Text encoding scheme si wozãna na UA kaƒoƒo. |
| **HRP** | Akpa alo network ƒe ŋgɔdonya si amegbetɔ ate ŋu axlẽ (`u` or `utest`). |
| **F4Jumble** | Reversible obfuscation algorithm si kpɔa egbɔ be adrɛs ƒe blibonyenye. |
| **Typecode** | Xexlẽdzesi le nya ɖesiaɖe me si ɖea receiver ƒomevi si le payload la me. |
| **Malleability** | Adrɛs bytewo ƒe tɔtrɔ si ŋu womeɖe mɔ ɖo o gake womede dzesii o. |

Kpɔ hã: [Safuiwo Kpɔkpɔ](./Viewing_Keys.md)

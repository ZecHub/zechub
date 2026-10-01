# Unified Address (ZIP-316) múlẹ̀

*Ìtọ́sọ́nà ẹ̀kọ́ ni èyí, kìí ṣe ìwé ìṣàyẹ̀wò tàbí ìwé ìsanwó àdàkọ-lẹ́ẹ̀kan. Ó ṣàlàyé bí a ṣe ṣètò Unified Address kí o lè lóye ohun tí àwọn ilé ìkàwé tí a ń tọ́jú ń ṣe lábẹ́ ààbò. Fún ohunkóhun tí ó bá ń ṣàkóso owó gidi, fi sí ojú ìwé náà [Ìlànà ZIP-316](https://zips.z.cash/zip-0316) àti àwọn ìṣe tí a so pọ̀ mọ́ wọn ní ìsàlẹ̀ yìí

---

## Àwòrán ńlá náà

Unified Address (UA) jẹ́ okùn àdírẹ́sì kan ṣoṣo tí ó ní ọ̀pọ̀lọpọ̀ irú olùgbà: **Àfihàn**, **Sapling**, **Orchard**, tàbí àpapọ̀ kan. Àpò ìsanwó náà máa ń yan àkójọ olùgbà tó dára jùlọ tí ó ń ṣètìlẹ́yìn fún láìfọwọ́sí.

Ronú nípa UA gẹ́gẹ́ bí àpòòwé tí a fi èdìdì dì tí ó ní àwọn káàdì tí a fi èdìdì dì. Káàdì kọ̀ọ̀kan dúró fún ọ̀nà ọ̀tọ̀ọ̀tọ̀ láti kàn sí ọ. Láti ṣàyẹ̀wò àdírẹ́sì kan, ìbéèrè gbọ́dọ̀:

1. **Ṣí àpò ìwé náà:** Ṣí ìkọ̀wé náà padà.
2. **Ṣí àwọn ohun tó wà nínú rẹ̀ pa dànù:** Ṣe àtúnṣe ìdènà ààbò náà (**F4Jumble**).
3. **Ka káàdì kọ̀ọ̀kan:** Yọ àwọn olùgbà kọ̀ọ̀kan.
4. **Fi àwọn òfin ìlànà múlẹ̀:** Fojú fo tàbí kọ àwọn ìtẹ̀síwájú gẹ́gẹ́ bí ìwọ̀n ìrísí wọn.

---

## Kí nìdí tí "kan ṣe àtúnṣe Bech32m" kò fi tó

UA kan lo koodu Bech32m, ṣugbọn koodu Bech32m nikan ko ṣafihan awọn olugba ti o wulo.

ZIP-316 mọ̀ọ́mọ̀ máa ń fi **F4Jumble** ṣe àkójọpọ̀ àwọn ohun tí a ń san án padà kí ó tó di pé a fi koodu sí i. F4Jumble máa ń rí i dájú pé yíyípadà ohun kikọ kan ṣoṣo nínú àdírẹ́sì náà yóò yí àbájáde tí a ti yí padà pátápátá. Èyí yóò dènà kíkọlù àìlèṣe àdírẹ́sì níbi tí olùkọlù bá ń yí àwọn baiti padà láàárín àdírẹ́sì kan nígbà tí ó ń fi ìṣáájú àti àfikún sílẹ̀ tí ó ń wò bí ẹni pé ó wúlò.

> **Òfin pàtàkì:** Ààbò ìyípadà nìkan ni ó máa ń ṣiṣẹ́ bí ohun èlò rẹ bá ṣe gbogbo ìyípadà àti ìfọwọ́sowọ́pọ̀. Ìyípadà díẹ̀ máa ń mú ààbò kúrò nígbà tí ó bá ń pa gbogbo ewu mọ́.

---

## Opo ọna kika, ni igbese nipa igbese

### Igbesẹ 1: Ṣe iyipada Bech32m ki o ṣayẹwo nẹtiwọọki naa
- **Apá tí ènìyàn lè kà (HRP):** `u` ṣe idanimọ mainnet; `utest` *(Awọn UA Mainnet bẹrẹ pẹlu `u1`, níbi tí `1` ni ìpínyà Bech32.)*
- **Ààlà gígùn:** Ààlà Bech32m boṣewa ń fi ààlà 90-wẹ́ẹ̀lì múlẹ̀. Àwọn UA sábà máa ń kọjá ààlà yìí, nítorí náà, a gbọ́dọ̀ pa àwọn àyẹ̀wò gígùn boṣewa mọ́ nínú decoder náà.
- Ṣe àyípadà àwọn ọ̀rọ̀ Bech32m 5-bit padà sí àwọn baiti 8-bit boṣewa.

### Igbesẹ 2: Yipada F4Jumble
F4Jumble jẹ́ nẹ́tíwọ́ọ̀kì Feistel onígun mẹ́rin tí a kọ́ sórí BLAKE2b:
- **Gígùn ààbọ̀ apá òsì:** `min(64, floor(length / 2))` Àwọn baiti. Orí 64 baiti bá iwọn ìjáde tó pọ̀ jùlọ ti BLAKE2b mu. Ìdajì ọ̀tún ní ẹrù tó kù nínú.
- **Awọn iṣẹ Hash:** Yipada G ati H nipa lilo awọn aami iyasọtọ ti o wa titi (`UA_F4Jumble_G` àti `UA_F4Jumble_H`).
- **Ìṣètò yíká:** Ìṣàfihàn síwájú ń ṣiṣẹ́ G(0) → H(0) → G(1) → H(1). Ìyípadà (ìṣàtúnṣe) ń ṣiṣẹ́ H(1) → G(1) → H(0) → G(0).
- **Ṣayẹ̀wò ààyè:** Kọ́ àwọn ìtẹ̀jáde tí ó wà níta ààlà ìwọ̀n ẹrù ZIP-316.

### Igbesẹ 3: Yọ ideri kuro ki o si jẹrisi HRP
Kí ó tó bẹ̀rẹ̀ sí í lo ìkọ̀wé náà, ó fi àwọn báàtì 16 tí ó ní HRP kún un, tí a fi àwọn òdo kún un.
- Yọ awọn baiti 16 ikẹhin kuro lẹhin ti o ba ti yọ awọn nkan kuro.
- Rí i dájú pé HRP tí a fi sínú rẹ̀ bá nẹ́tíwọ́ọ̀kì tí a retí mu (`u` or `utest`Èyí kò ní jẹ́ kí a gba àdírẹ́sì testnet láìròtẹ́lẹ̀ lórí mainnet.

### Igbese 4: Yọ awọn olugba kuro
Ẹrù iṣẹ́ tó kù ní `(typecode, length, content)` àwọn ìtẹ̀wọlé, níbi tí a ti tọ́jú irú koodu àti gígùn gẹ́gẹ́ bí àwọn nọ́ńbà oníwọ̀n kékeré (byte kan fún àwọn ìwọ̀n kékeré). Àwọn irú koodu olugba tí a mọ̀:

| Kóòdù irú | Irú olùgbà       | Gígùn akoonu |
| :------- | :------------------ | :------------- |
| `0x00`   | Àwòrán tí ó hàn gbangba (P2PKH) | 20 baiti       |
| `0x01`   | Àṣírí (P2SH)  | 20 baiti       |
| `0x02`   | Sapling             | 43 baiti       |
| `0x03`   | Orchard             | 43 baiti       |

Yàtọ̀ sí ìwọ̀nyí, ZIP-316 ní àwọn ìpele méjì míràn fún ìbáramu síwájú:

- **`0xC0`–`0xDF` (ìwé-ìròyìn tí kò gbọ́dọ̀ yé):** àwọn oníbàárà gbọ́dọ̀ fojú fo àwọn ohun èlò ìròyìn tí wọn kò mọ̀ ní agbègbè yìí.
- **`0xE0` àti `0xE1` (a yàn láti mọ iye metadata tí ó yẹ kí ó yéni):** ìforúkọsílẹ̀ ZIP-316 lọ́wọ́lọ́wọ́ yàn ìwọ̀nyí láti kojú gíga àti àkókò tí ó yẹ kí ó parí. Àwọn oníbàárà gbọ́dọ̀ lóye àwọn nǹkan wọ̀nyí tàbí kí wọ́n kọ̀ àdírẹ́sì náà sílẹ̀.
- **`0xE2`–`0xFC` (ìmọ̀ tí a kò yàn fún àwọn ìwádìí tí ó yẹ kí a lóye):** àwọn oníbàárà gbọ́dọ̀ kọ àdírẹ́sì náà sílẹ̀ tí wọ́n bá rí ohun tí a kò mọ̀ ní agbègbè yìí.

Fún àwọn irú olùgbà tí a mọ̀, rí i dájú pé gígùn tí a fi àmì sí bá gígùn àkóónú tí irú náà sọ mu. Fún àwọn ohun èlò metadata, lo gígùn ìwọ̀n kékeré wọn láti mọ gígùn àkóónú náà. Kọ̀ àwọn ìtẹ̀jáde tí a gé tàbí èyíkéyìí àwọn baiti tí ó tẹ̀lé e.

**Àṣẹ olugba tí a fẹ́ràn jùlọ.** Nígbà tí àdírẹ́sì kan bá ti ṣàyẹ̀wò dáadáa, àpò owó tàbí irinṣẹ́ ìsanwó yẹ kí ó yan olugba tí ó dára jùlọ ní ìtòlẹ́sẹẹsẹ yìí: Orchard, lẹ́yìn náà Sapling, lẹ́yìn náà ó ṣe kedere.

---

## Àwọn òfin ìkọ̀sílẹ̀ ZIP-316 tó pọndandan

**Ṣíṣe àtúnṣe àtúnṣe láìsí àṣeyọrí kò mú kí àdírẹ́sì kan wúlò.** Àwọn àpò Zcash tí ìjọba ń lò kò gbọ́dọ̀ kọ àdírẹ́sì tí ó rú àwọn òfin wọ̀nyí rárá. Àwọn irinṣẹ́ wẹ́ẹ̀bù gbọ́dọ̀ kọ̀ wọ́n sílẹ̀ láti dènà ìkùnà ìsanwó:

- **Àwọn olugba tí kò ní ààbò:** Àdírẹ́sì náà **gbọ́dọ̀** ní ó kéré tán Sapling tàbí Orchard kan. UA tí ó ní àwọn olugba tí ó hàn gbangba nìkan kò wúlò lábẹ́ ZIP-316.
- **Àwọn àmì ìrísí méjì:** Irú olùgbà kọ̀ọ̀kan lè fara hàn ní ẹ̀ẹ̀kan náà.
- **Àwọn àmì ìrísí tí a kò ṣe àtòjọ:** Àwọn olùgbà gbọ́dọ̀ farahàn ní ìtòlẹ́sẹẹsẹ àmì ìrísí tí ó ga sókè gan-an.
- **Àwọn olugba tí ó ń tako ara wọn:** UA kan lè ní P2PKH tàbí P2SH, ṣùgbọ́n **kì í ṣe méjèèjì**.
- **Àwọn ìtẹ̀síwájú tàbí ìbòjú tí kò báradé:** Àwọn ìṣáájú nẹ́tíwọ́ọ̀kì tí kò báradé, àwọn ẹrù ìsanwó tí a gé kúrú, tàbí àìbáramu gígùn gbọ́dọ̀ fa ìkọ̀sílẹ̀ lẹ́sẹ̀kẹsẹ̀.
- **Àwọn àmì ìkọ̀wé tí a kò mọ̀:** Àwọn oníbàárà gbọ́dọ̀ fojú fo àwọn ohun tí a kò mọ̀ àyàfi àwọn ohun tí ó wà nínú ìpele metadata tí a gbọ́dọ̀ lóye (`0xE0`–`0xFC`), èyí tí wọ́n gbọ́dọ̀ kọ̀ nígbà tí wọn kò bá dá wọn mọ̀. Nínú ìforúkọsílẹ̀ lọ́wọ́lọ́wọ́, `0xE0` àti `0xE1` ni a yàn fun awọn iru ipari, lakoko ti o `0xE2`–`0xFC` a kò yàn wọ́n fún ara wọn. Fúnra ẹni, kọ àdírẹ́sì èyíkéyìí tí ó bá rú òfin ìjẹ́wọ́ tí a gbé kalẹ̀ lókè yìí sílẹ̀, títí kan ohun tí a béèrè fún olùgbà Sapling tàbí Orchard.

---

## Awọn iṣe ti o dara julọ fun awọn oluṣe idagbasoke

- **Fi àwọn olugba tí a ti ṣàtúnṣe wéra, kìí ṣe àwọn okùn tí a kò fi bẹ́ẹ̀ ṣe.** Ṣíṣàtúnṣe àdírẹ́sì ṣáájú kí o tó ṣàyẹ̀wò ìbáradọ́gba.
- **Lo awọn ile-ikawe ti a tọju fun ohunkohun ti o ba n ṣakoso owo.** Ko awọn apoti Rust ti oṣiṣẹ jọ (bii `zcash_address`) sí WebAssembly dípò gbígbé àwọn dekoder JavaScript àṣà.
- **Ṣọ́ra pẹ̀lú àwọn àtúnsọ tí a fi ọwọ́ kọ.** Tí o bá kọ ọ̀kan láti kọ́, kà á sí iṣẹ́ ìwádìí kan kí o sì dán an wò pẹ̀lú àwọn ìwádìí tí ó wà ní ìsàlẹ̀ kí o tó gbẹ́kẹ̀lé ohunkóhun.

---

## Àwọn ìlànà ìṣàpẹẹrẹ àti àwọn ìmúṣẹ ìtọ́kasí

- **[ZIP-316: Àwọn Àdírẹ́sì Ìṣọ̀kan àti Àwọn Kọ́kọ́rọ́ Wíwo](https://zips.z.cash/zip-0316)**
- **[àpótí àdírẹ́sì zcash (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[àpótí f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Awọn aṣoju idanwo osise:**
  - [Àwọn ẹ̀rọ ìdánwò F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Àwọn ẹ̀rọ ìdánwò Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Ìwé Àlàyé

| Àkókò ìgba | Ìtumọ̀ |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Okùn àdírẹ́sì kan ṣoṣo tí ó ń so àwọn adágún olùgbàpọ̀ pọ̀. |
| **Receiver** | Irú ibi tí a ń lọ láti san owó pàtó (tí ó hàn gbangba, Sapling, tàbí Orchard). |
| **Bech32m** | Ètò ìṣàkójọ ọ̀rọ̀ tí a lò fún àwọn okùn UA. |
| **HRP** | Apá tàbí ìṣáájú nẹ́tíwọ́ọ̀kì tí ènìyàn lè kà (`u` or `utest`). |
| **F4Jumble** | Algorithm ìdènà tí a lè yípadà tí ó ń rí i dájú pé àdírẹ́sì náà jẹ́ òótọ́. |
| **Typecode** | Nọ́mbà nínú ìtẹ̀wé kọ̀ọ̀kan tó ń ṣàlàyé irú olùgbà nínú ẹrù iṣẹ́. |
| **Malleability** | Àtúnṣe àìgbàṣẹ ti àwọn baiti àdírẹ́sì láìsí ìwádìí. |

Wo tun: [Àwọn Kọ́kọ́rọ́ Wíwo](./Viewing_Keys.md)

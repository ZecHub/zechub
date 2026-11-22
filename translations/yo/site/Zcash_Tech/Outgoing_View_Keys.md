<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Kọ́kọ́rọ́ Ìwòran Tí Ó Ń Jáde (OVKs)

Kọ́kọ́rọ́ ìwòran tó ń jáde (OVK) jẹ́ iye 32-byte tí a lò láti fi ìkọ̀kọ̀ *outout* ciphertext ti ìjáde tó ní ààbò. Ó jẹ́ kí ẹgbẹ́ kan gba àkọsílẹ̀ lásán tí a fi ránṣẹ́ (àdírẹ́sì olùgbà, iye, àti àkọsílẹ̀) padà láìsí agbára láti ná owó tàbí láti wo àkọsílẹ̀ tó ń wọlé.

Olùgbà náà máa ń yí àkọsílẹ̀ tí ń bọ̀ padà pẹ̀lú kọ́kọ́rọ́ ìwòran tirẹ̀. Yíyàn OVK kò yí ohun tí olùgbà náà rí padà. Kò sí ìlànà ìṣàfihàn déédéé fún OVK tí a kò fi nǹkan ṣe; ó jẹ́ 32 baiti lásán.

## TL;DR

- OVK kan nikan ni o le gba ọrọ ti njade ti isanwo ti a daabobo pada.
- Àwọn àpò owó yan láàrín àwọn ìlànà mẹ́ta: **Olùránṣẹ́** (ìgbàpadà déédé pẹ̀lú UFVK ti àkọọ́lẹ̀), **Àṣà** (ìgbàpadà pẹ̀lú kọ́kọ́rọ́ tí o pèsè), tàbí **Discard** (kò sí ẹni tí ó lè gba ọ̀rọ̀ tí ó jáde láti inú ẹ̀wọ̀n náà padà).
- Kódà pẹ̀lú Discard tàbí OVK àdáni, ẹni tó ni UFVK ṣì máa ń rí àwọn àkọsílẹ̀ tí wọ́n ná, ó sì lè ṣírò iye owó tí ó fi àkọọ́lẹ̀ náà sílẹ̀.
- Ọ̀nà kan ṣoṣo tó ṣeé gbẹ́kẹ̀lé láti fi iye owó kan hàn sí UFVK kan pàtó ni láti rí i dájú pé àwọn àkọsílẹ̀ náà kò sí nínú àkọọ́lẹ̀ náà (àkọọ́lẹ̀ ọ̀tọ̀ tàbí àpò owó ọ̀tọ̀).
- Àwọn ìlànà mẹ́ta náà ti wà tẹ́lẹ̀ nínú `zcash_client_backend`; fere gbogbo àpò owó lónìí ló ń lo ìlànà Olùránṣẹ́ àdáni nìkan.

---

## Awọn ilana mẹta

Àwọn àpò owó tí a kọ́ sórí `zcash_client_backend` yan ohun kan `OvkPolicy` nígbà tí wọ́n bá ń ṣe ìṣòwò kan:

| Ètò Ìlànà | Àwọn ìkọ̀wé ìkọ̀kọ̀ tó ń jáde | Ta ló lè gba ọ̀rọ̀ tí ó jáde padà lẹ́yìn náà |
|--------|----------------------|----------------------------------------------|
| **Oluranṣẹ** (aiyipada) | Ti fi pamọ sinu OVK deede ti akọọlẹ naa | Full Viewing Key ti Àkọọ́lẹ̀ Ìránṣẹ́ |
| **Àṣà** | A fi ìkọ̀kọ̀ sí àwọn kọ́kọ́rọ́ tí o pèsè | Ẹnikẹ́ni tó bá di kọ́kọ́rọ́(àwọn) tí a pèsè mú |
| **Discard** | A ko lo OVK kankan (`ovk = ⊥`) | Kò sí ẹnikẹ́ni (kódà olùránṣẹ́) |

Olùkọ́lé ìrọ̀rùn kan ṣẹ̀dá `Custom` ìlànà láti iye 32-byte kan ṣoṣo kí OVK ti òde àti ti inú jẹ́ kọ́kọ́rọ́ kan náà.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Wo awọn [Àwọn ìwé ìlànà OvkPolicy](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) àti [ZIP 310](https://zips.z.cash/zip-0310).

## Ohun ti eto imulo kọọkan jẹ fun

**Oluranṣẹ́** jẹ́ ìwà àpò owó lásán. Lẹ́yìn tí a bá ti wa ìtajà náà, ẹnikẹ́ni tó ní UFVK ti àkọọ́lẹ̀ náà lè yí àwọn ìkọ̀wé ìkọ̀kọ̀ tí ń jáde kúrò padà kí ó sì gba àwọn àdírẹ́sì, iye owó, àti àkọsílẹ̀ olùgbà náà padà.

**Àṣà** jẹ́ kí o fún ẹni-kẹta (olùṣàyẹ̀wò, ẹ̀rọ ìsanwó, ètò ìsanwó, tàbí ẹ̀rọ mìíràn) ní agbára láti ṣe àtúnṣe àwọn ìsanwó pàtó láìfún wọn ní kọ́kọ́rọ́ ìwòye gbogbo. O tún lè lo kọ́kọ́rọ́ onígbà díẹ̀ tí o sọ nù lẹ́yìn ìṣòwò náà, tàbí lo àwọn kọ́kọ́rọ́ ọ̀tọ̀ọ̀tọ̀ fún àwọn ẹlòmíràn kí kọ́kọ́rọ́ kan má baà rí gbogbo ìsanwó tí ó ń jáde.

**Discard** túmọ̀ sí wípé àpò ìfiránṣẹ́ náà kò le gba àwọn ọ̀rọ̀ tí ó jáde láti inú ẹ̀wọ̀n náà padà. Èyí wúlò nígbà tí o bá fẹ́ dín ohun tí a lè gbà padà kù tí a bá fi UFVK bàjẹ́ lẹ́yìn náà, tàbí nígbà tí o kò bá mọ̀ọ́mọ̀ fẹ́ àkọsílẹ̀ ẹ̀wọ̀n tí OVK àkọọ́lẹ̀ náà lè ṣí sílẹ̀.

## Ohun tí ẹni tó ni UFVK ṣì ń rí

Kódà nígbà tí a Discard tàbí OVK àdáni, ẹni tí ó ni UFVK àkọọ́lẹ̀ náà ṣì lè:

- Ṣàwárí èyí tí a lò nínú àkọsílẹ̀ náà (nípasẹ̀ àwọn ohun tí kò ní ìtumọ̀).
- Mọ àwọn ìníyelórí àwọn àkọsílẹ̀ ìtẹ̀wọlé wọ̀nyẹn.
- Ṣe àtúnṣe àwọn àkọsílẹ̀ ìyípadà èyíkéyìí (wọ́n ti fi ìkọ̀kọ̀ sí kọ́kọ́rọ́ ìwòran inú, kìí ṣe sí OVK).
- Nítorí náà, ṣe ìṣirò iye owó tí ó fi àkọọ́lẹ̀ náà sílẹ̀.

Ohun tí a kò lè rí ni àdírẹ́sì olùgbà kọ̀ọ̀kan, ìpínyà iye náà, àti àwọn àkọsílẹ̀ náà `WalletWrite` Ìwé ìkọ̀wé kìlọ̀ pé kò ṣeé gba àwọn ìwífún nípa àwọn ìṣòwò tí a ṣẹ̀dá lábẹ́ Discard (tàbí àṣà OVK tí a kò lè ṣe láìròtẹ́lẹ̀) padà láti inú ìwífún pq tí àkọsílẹ̀ agbègbè bá sọnù.

## Pa awọn iye kuro ninu UFVK kan pato

`OvkPolicy` Ó ń ṣàkóso ìgbàpadà àwọn ìwé tí ó jáde nìkan. Kò fi owó tí a ná tàbí owó tí a rà pamọ́ láti inú UFVK ti àkọọ́lẹ̀ náà.

Ọ̀nà kan ṣoṣo tó ṣeé gbẹ́kẹ̀lé láti pa iye owó kan mọ́ kí ó má baà hàn sí UFVK kan pàtó ni láti rí i dájú pé àwọn àkọsílẹ̀ tí ó gbé iye owó náà kò jẹ́ ti àkọọ́lẹ̀ tí UFVK ń ṣàkóso:

1. **Ya awọn akọọlẹ ZIP-32 sọtọ** (iru kan naa) — Ṣẹ̀dá atọka akọọlẹ tuntun kan, gbe owo si i, ki o má si gbe UFVK akọọlẹ yẹn jade rara. UFVK akọọlẹ atilẹba naa nikan ni o ri gbigbe sinu akọọlẹ tuntun naa.
2. **Ya àpò owó sọ́tọ̀ pátápátá** (irúgbìn tó yàtọ̀) — Fi owó sílẹ̀ fún àpò owó tuntun, ná owó náà, kí o sì kó irúgbìn tàbí UFVK náà dànù. Àpò owó àkọ́kọ́ náà kàn máa ń kọ ìgbesẹ̀ owó náà sílẹ̀.
3. **Àwọn àpò owó ìgbà kan ṣoṣo** — Gẹ́gẹ́ bí a ti sọ lókè yìí, ṣùgbọ́n ẹ máa fi àpò owó tí a ń ná pamọ́ sí ohun tí a lè sọ nù.

Àkọọ́lẹ̀ kan jẹ́ UFVK fún gbogbo àkọọ́lẹ̀. Àwọn àkọsílẹ̀ tí kò tíì wà nínú àkọọ́lẹ̀ náà kò fara hàn nínú ìwọ̀n tàbí àròpọ̀ ìjáde rẹ̀.

## Báwo ni àwọn àpò owó ṣe ń lo àwọn ìlànà lónìí

Ó fẹ́rẹ̀ẹ́ jẹ́ pé gbogbo àpò ìṣẹ̀dá ló ń lo ìlànà **Sender** tí a kò fi bẹ́ẹ̀ mọ̀ tẹ́lẹ̀, nítorí náà, ìtàn gbogbo tí ó jáde ni a lè rí gbà láti UFVK. Àwọn ìlànà méjì yòókù wà ní ilé ìkàwé ṣùgbọ́n wọn kì í sábà hàn nínú àwọn ìfọwọ́sowọ́pọ̀ olùlò.

Awọn aṣayan ti o ṣeeṣe ni ojo iwaju pẹlu:

- Àmì ìṣòwò kọ̀ọ̀kan tí ó jẹ́ kí olùlò yan Àṣà tàbí Discard fún ìsanwó kan ṣoṣo.
- Ipo Discard tí ó wà títí láé (ìtúnṣe irugbin yóò fi àwọn ìjáde àpapọ̀ nìkan hàn).
- Àwọn OVK àdáni fún ìṣípayá àṣàyàn ti àwọn ìsanwó ẹnìkọ̀ọ̀kan (wọ́n fẹ́ẹ́rẹ́ ju ìwọ̀n gbogbo lọ) [ZIP 311](https://zips.z.cash/zip-0311) ìṣípayá ìsanwó).
- Lílo àkọọ́lẹ̀ tàbí ìpínyà àpò owó fún ìyasọtọ̀ tó lágbára sí i.

## Àwọn ohun àlùmọ́nì

- [ZIP 310: Àwọn ohun ìní ààbò ti àwọn kọ́kọ́rọ́ wíwo Sapling](https://zips.z.cash/zip-0310)
- [ZIP 316: Àwọn Àdírẹ́sì Ìṣọ̀kan àti Àwọn Kọ́kọ́rọ́ Ìwòye Ìṣọ̀kan](https://zips.z.cash/zip-0316)
- [ZIP 315: Àwọn Ìlànà Tó Dáa Jùlọ fún Àwọn Ìmúlò Àpò Ìpamọ́](https://zips.z.cash/zip-0315)
- [OvkPolicy nínú zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Àwọn ojú ìwé tó jọra

- [Àwọn Kọ́kọ́rọ́ Wíwo](/zcash-tech/viewing-keys)
- [Àwọn Ìfihàn Ìsanwó](/zcash-tech/payment-disclosures)
- [Àwọn Àdírẹ́sì Ìṣọ̀kan](/zcash-tech/unified-addresses)
- [Ohun tí Olùṣàwárí Àkọsílẹ̀ lè rí](/zcash-tech/what-a-block-explorer-can-see)

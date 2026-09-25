<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node

> 🇧🇷 [Versão em Portuguese](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura jẹ́ ìṣiṣẹ́ nódù ọ̀fẹ́, orísun gbogbo nódù tí ó ṣí sílẹ̀ fún Zcash, tí a ṣe fún ìwọ̀n. [Zebra](Zebra_Full_Node.md) àti nípasẹ̀ ìfọwọ́sowọ́pọ̀ láàrín **Valar Group** àti **Project Tachyon**, Zakura ń ṣe ìmúṣẹpọ̀ kíákíá, ìgé igi ìbílẹ̀, àti ipele ìbáramu fún ohun ìní. `zcashd` irinṣẹ́. Ẹ̀yà 1.0.0 ni a tú síta ní ọjọ́ kẹẹ̀ẹ́dógún oṣù Keje, ọdún 2026.

---

## TL;DR

- Zakura is a **consensus-compatible Zcash full node** — an alternative to Zebra and zcashd, forked from Zebra.
- Ìṣọ̀kan Blockchain yára ju Zebra lọ ní nǹkan bí **5×; ìfàsẹ́yìn ìfàsẹ́yìn fọ́tò ìgbàlódé parí láàárín **lábẹ́ ìṣẹ́jú 2**.
- **Pípa bulọọki abinibi** ngbanilaaye awọn oniṣẹ lati ṣiṣẹ node kikun pẹlu aaye disiki ti o dinku pupọ (~11 GB aworan ti a ge ni afiwe si 300 GB fun node Zebra kikun).
- Ipo ibamu **zcashd RPC** jẹ ki awọn apamọwọ ati awọn iṣọpọ ti o wa tẹlẹ ṣiṣẹ laisi iyipada.
- Fíìmù ìrìnnà P2P tí a ń ṣe àyẹ̀wò** (tí a ti parẹ́ nípasẹ̀ àìṣeédá) ń fojú sí ìdàgbàsókè àwọn bulọ́ọ̀kì tí ó wà ní ìsàlẹ̀-500ms pẹ̀lú ọ̀rọ̀ àsọtẹ́lẹ̀ tí ó lè dènà DoS.
- Ní ìbámu pẹ̀lú **Ironwood (NU6.3)**, ìgbéga nẹ́tíwọ́ọ̀kì Zcash ṣiṣẹ́ ní àárín ọdún 2026.
- **Zakura Common** (v1.3.0, August 2026) mú kí àwọn àpò ìkọ̀kọ̀ tí a lò láti kọ́ àwọn ìṣòwò àdáni yára: láti ju ìṣẹ́jú-àáyá mẹ́ta lọ sí ìsàlẹ̀ 200 ms ní ọ̀pọ̀lọpọ̀ ìgbà, gẹ́gẹ́ bí ìlànà Zakura ṣe sọ.
- Láti ọwọ́ **Sean Bowe** (olùdásílẹ̀ Zcash, Project Tachyon) àti **Dev Ojha** (Ẹgbẹ́ Valar) ni wọ́n ṣe olórí rẹ̀.

---

## Kí ni Zakura?

Zakura jẹ́ nódù Zcash tí a ṣe láti ìpìlẹ̀ láti múra sílẹ̀ fún iṣẹ́-ṣíṣe ní ìwọ̀n. Bó tilẹ̀ jẹ́ pé ó ní ìbáramu pẹ̀lú Zebra — èyí tí ó túmọ̀ sí wípé ó fìdí múlẹ̀ àti pé ó ń tẹ̀lé àwọn òfin ìlànà Zcash kan náà — Zakura ṣe àgbékalẹ̀ àwọn àtúnṣe ìmọ̀-ẹ̀rọ pàtàkì tí a gbé kalẹ̀ láti dín ìdènà sí ṣíṣiṣẹ́ nódù Zcash full.

Iṣẹ́ àgbékalẹ̀ náà jẹ́ iṣẹ́ àpapọ̀ láàárín **Iṣẹ́ àgbékalẹ̀ Tachyon** (tí Sean Bowe, ọ̀kan lára àwọn onímọ̀ ẹ̀rọ ìkọ̀wé Zcash àtilẹ̀wá ṣe olórí) àti **Valar Group** (tí Dev Ojha ṣe olórí). Wọ́n jọ dojúkọ àwọn àtúnṣe ìlànà Zcash ìran tó ń bọ̀, Zakura sì ń ṣiṣẹ́ gẹ́gẹ́ bí ibi ìtọ́kasí fún iṣẹ́ náà.

---

## Àwọn Ohun Pàtàkì

### Ìmúṣiṣẹ́pọ̀ Ẹ̀wọ̀n Tó Yára Jù 5×

Zakura ṣe àṣeyọrí ìṣiṣẹ́pọ̀ blockchain tó tó nǹkan bí 5× ní ìfiwéra pẹ̀lú Zebra. Èyí mú kí ó wúlò fún àwọn olùṣiṣẹ́ tí wọ́n nílò láti yí nódù kan padà kíákíá tàbí kí wọ́n padà bọ̀ sípò lẹ́yìn àkókò ìdádúró.

### Àkójọpọ̀ Ìṣíṣẹ́ Àkọ́kọ́

Zakura ṣe atẹjade awọn aworan pq ti a ti kọ tẹlẹ ti o dinku akoko amuṣiṣẹpọ akọkọ ni pataki:

| Ọ̀nà Bootstrap | Àkókò |
|-----------------|------|
| Àwòrán ìpamọ́ | ~37 ìṣẹ́jú |
| Fọ́tò tí a gé kúrò | **Lábẹ́ ìṣẹ́jú 2** |
| Zebra (ìṣọ̀kan pípé) | ~20 hours |

Àwọn àwòrán tí a gé ní ìpele **11 GB**, èyí tí ó mú kí ìdènà ìsopọ̀ **680× yára** ṣeé lò ní ìfiwéra pẹ̀lú ìsopọ̀mọ́ra láti inú ìṣẹ̀dá.

### Ìgé Bọ́ọ̀lù Àbínibí

Zakura ṣe atilẹyin fun gige bulọọki ti a le ṣeto, ti o fun awọn oniṣẹ node laaye lati ṣalaye iye itan pq ti o yẹ ki o tọju. Eyi jẹ ki o wulo lati ṣiṣẹ node kikun lori ohun elo pẹlu ibi ipamọ to lopin - wulo fun awọn oludasilẹ, awọn olupilẹṣẹ, ati awọn olupese amayederun ti ko nilo pq itan kikun.

### Ipò ìbáramu zcashd RPC

Zakura pẹlu ipo ibamu kan ti o tun ṣe ẹda ti o jẹ tirẹ `zcashd` Ìbáṣepọ̀ JSON-RPC. Àwọn àpò ìpamọ́, pàṣípààrọ̀, àti àwọn ìṣọ̀kan tó wà tẹ́lẹ̀ tí ó gbẹ́kẹ̀lé `zcashd` Àwọn RPC lè yípadà sí Zakura láìsí pé wọ́n nílò àyípadà kódì.

### Fẹ́ẹ̀lì Ìrìnnà P2P ìdánwò

Zakura n gbe pẹlu ipele gbigbe ẹgbẹ-si-ẹgbẹ iran tuntun, ti a ti mu ṣiṣẹ ni bayi **ailewu nipasẹ aiyipada**. Nigbati a ba mu ṣiṣẹ, o fojusi:

- Ìtankalẹ̀ àwọn ìdènà tó burú jùlọ ní ìsàlẹ̀ 500ms káàkiri nẹ́tíwọ́ọ̀kì náà
- Ijọpọ Mempool fun iṣipopada iṣowo to munadoko diẹ sii
- Ilana agbasọ ọrọ ti o ni idiwọ DoS lati mu agbara aabo nẹtiwọọki pọ si

Fẹlẹfẹlẹ yii duro fun awotẹlẹ ti awọn ilọsiwaju ipele nẹtiwọọki Zcash ti n ṣe agbekalẹ labẹ Iṣẹ akanṣe Tachyon.

### Igi Ironwood (NU6.3) Ibamu

Zakura ni ibamu patapata pẹlu igbesoke nẹtiwọọki Ironwood (NU6.3), ti a mu ṣiṣẹ lori mainnet Zcash ni aarin ọdun 2026.

---

## Zakura Wọpọ: Ṣíṣe ìkọ̀kọ̀ àpò ìpamọ́ tó yára

Ní oṣù kẹjọ ọdún 2026, ẹgbẹ́ Zakura ṣe àgbékalẹ̀ Zakura Common, àpapọ̀ àwọn ìkàwé ìkọ̀kọ̀ tí àwọn àpò àti nódù Zcash gbára lé. Zakura yípadà sí àpò tuntun ní ẹ̀yà 1.3.0, Vizor Wallet sì wà lára àwọn àpò àkọ́kọ́ tí ó so pọ̀ mọ́ ọn.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Gẹ́gẹ́ bí àwọn ìlànà Zakura fúnra rẹ̀:

| Iṣẹ́ | Ìyárasípayá |
|--|--|
| Ìṣẹ̀dá ìdánilójú lórí fóònù alágbéka | ju 14× lọ (kọ̀ǹpútà alágbèéká: ju 5× lọ) |
| Ṣíṣe ìdènà Sinsemilla | ju 21× lọ |
| ìfìdíkalẹ̀ zk-SNARK | 4–8× |
| Ìṣàyẹ̀wò ìṣàyẹ̀wò | ju 1.5× lọ |

Fún àwọn olùlò, àyípadà tó hàn gbangba jùlọ ni àkókò ìdúró. Kíkọ́ ìṣòwò àdáni kan máa ń gba àpò owó ju ìṣẹ́jú mẹ́ta lọ. Pẹ̀lú Zakura Common, ó lè gba tó 200 ms ní ọ̀pọ̀lọpọ̀ ìgbà. Àkókò yìí ni ẹ̀rọ rẹ fi ń múra ìṣòwò náà sílẹ̀, kì í ṣe àkókò tí nẹ́tíwọ́ọ̀kì nílò láti fìdí rẹ̀ múlẹ̀.


---

## Báwo ni Zakura ṣe ní ìbáṣepọ̀ pẹ̀lú àwọn Zcash Nodes mìíràn

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Èdè | C++ (a fi fork lati Bitcoin) | Ipata | Ipata (a fi fork lati Zebra) |
| Ipo | Ti kuna | Ti nṣiṣe lọwọ | Ti nṣiṣe lọwọ (v1.0.0, Oṣu Keje 2026) |
| Iyara ìṣiṣẹ́pọ̀ | Ìpìlẹ̀ | ~1× | ~5× yára |
| Gígé ìdènà | Rárá | Rárá | Bẹ́ẹ̀ni |
| zcashd RPC compat | Ìbílẹ̀ | Apá kan | Bẹ́ẹ̀ni (ipò compat) |
| Àkójọpọ̀ ìfàsẹ́yìn | Rárá | Rárá | Bẹ́ẹ̀ni (ó kéré sí ìṣẹ́jú 2) |
| P2P ìdánwò | Rárá | Rárá | Bẹ́ẹ̀ni (ìbáṣepọ̀) |

---

## Bibẹrẹ

Àwọn àṣàyàn ìgbàsókè, àwòrán ìṣàfihàn, àti àwọn ìwé ìṣètò wà ní:

- **Gbigbasilẹ ati itọsọna eto:** [zakura.com/download](https://zakura.com/download/)
- **Àwọn àwòrán ẹ̀wọ̀n:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Kóòdù orísun:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Àwọn ojú ìwé tó jọra

- [Zebra Full Node](Zebra_Full_Node.md) — a ti yọ Zakura kúrò ní òkè Zcash full node láti
- [Atọ́ka Zaino](Zaino.md) — atọka ti o da lori Rust ti o ni ibamu pẹlu Zebra ati Zakura
- [Àwọn Nódù Kíkún](Full_Nodes.md) — Àkótán àwọn àṣàyàn nódù kíkún Zcash
- [Àwọn Nódù Àpò Ìmọ́lẹ̀](Lightwallet_Nodes.md) - Awọn aṣayan alabara fẹẹrẹ fẹẹrẹ

## Àwọn ohun àlùmọ́nì

- [Ni lenu Zakura - fii](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Oju opo wẹẹbu Zakura](https://zakura.com/)
- [Zakura lórí X/Twitter](https://x.com/ZakuraZcash)
- [Iṣẹ́ Tachyon](https://electriccoin.co/blog/)
- [Ìkéde tí a wọ́pọ̀ sí Zakura](https://zakura.com/announcements/zakura-common/)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìkànnì Zakura

> 🇧🇷 [Ìtumọ̀ èdè Potogí](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura jẹ́ òmìnira, ìmọ̀-ìmọ̀ ìmúṣẹ gbogbo nóòdu fún Zcash. [Zebra](Zebra_Full_Node.md) ati ki o ni idagbasoke nipasẹ kan ifowosowopo laarin ** Valar Group** ati ** Project Tachyon, Zakura nfun dramatically yiyara isopọmọ, abinibi block pruning, ati a ibaramu Layer fun ogún `zcashd` ìtumọ̀ 1.0.0 ni a tú sílẹ̀ ní July 15, 2026.

---

## TL;DR

- Zakura jẹ **ìfohùnwọ̀n ìjùmọ́pọ̀ Zcash tó kún fún gbogbo èròjà**  àfikún sí Zebra àti zcashd, tí a pín láti inú Zebra.
- Àjọsopọ̀ Blockchain jẹ́ nǹkan bíi *5x yiyara ju Zebra lọ; ìmúṣẹ bootstrapping snapshot parí ní **ìsàlẹ̀ ìṣẹ́jú méjì**.
- **Ipamole bulọọki abinibi** jẹ ki awọn oniṣẹ lati ṣiṣẹ gbogbo akopọ pẹlu aaye disiki ti o kere ju (~ 11 GB ṣajọ snapshot vs. 300 GB fun kikun Zebra node).
- A **zcashd RPC compatibility mode** jẹ ki awọn apamọwọ ati isopọpọ ti o wa tẹlẹ ṣiṣẹ laisi atunṣe.
- **Awọn igbeyewo P2P gbigbe Layer** (ti o ni idiwọ nipasẹ aiyipada) fojusi sub-500ms bulọọki itankale pẹlu DoS-duro gossip.
- O ni ibamu pẹlu **Ironwood (NU6.3)**, igbesoke nẹtiwọọki Zcash ti muu ṣiṣẹ larin 2026.
- Ti o jẹ oludari nipasẹ Sean Bowe (oludasile Zcash, Project Tachyon) ati Dev Ojha (Awọn ẹgbẹ Valar).

---

## Kí ni Zakura?

Zakura is a Zcash full node designed from the ground up to be production-ready at scale. While it shares consensus compatibility with Zebra — meaning it validates and follows the same Zcash protocol rules — Zakura introduces significant engineering improvements aimed at lowering the barrier to running a Zcash full node.

Àjọṣepọ̀ àárín àwọn ẹgbẹ́ yìí ni iṣẹ́ tí wọ́n ń pè ní Project Tachyon (tí Sean Bowe, ọ̀kan lára àwọn onímọ̀ nípa ìkọsílẹ̀ ti Zcash ṣe olórí rẹ) àti Valar Group (ti Dev Ojha jẹ olórí wọn). Àwọn méjèèjì jọ máa n ṣiṣẹ́ lórí bí a ó ṣe mú kí ìlànà Zcash dára sí i. Zakura sì wà gẹ́gẹ́ bíi òpó ìpèsè fún ìgbòkègbodò náà.

---

## Àwọn Ànímọ́ Pàtàkì Rẹ̀

### 5x Iyara Ṣiṣẹpọ Ẹsẹ-ẹlẹgbẹ

Zakura ṣe aṣeyọri ni iwọn 5x yiyara iṣọkan blockchain ti a fiwe si Zebra. Eyi jẹ ki o wulo pupọ fun awọn oniṣẹ ti o nilo lati yika akopọ kan yarayara tabi imularada lati akoko idaduro .

### Ìwòrán ìjápọ̀ Bootstrapping

Zakura tẹ̀síwájú àwọn àwòrán ìsínkálẹ́ńbà tí a ti ṣe kókó, èyí tó dín àkókò ìṣàmúlò àkọkọ kù:

ì í ì ¬ë¦¬í ̧ ë ¤. Bootstrap Method: Time:
|-----------------|------|
Àwòrán inú àpamọ́. ~ Ìṣẹ̀jú 37.
Àwòrán tí a gé ní ìsàlẹ̀. **Léyìí tó dín kù sí ìṣẹ́jú méjì**
Zebra (ìṣètò ìsọ̀kan) ~20 wákàtí.

Awọn aworan ti a fi ge ni o to ** 11 GB, gbigba agbara kan ** 680 × yiyara ** bootstrap node akawe si isọdọkan lati ipilẹṣẹ.

### Ìkórè Àpáàdì Tí Wọ́n Fi Ń Ṣẹ̀dá Ilé

Zakura supports configurable block pruning, allowing node operators to define how much chain history to retain. This makes it practical to run a full node on hardware with limited storage — useful for validators, developers, and infrastructure providers who do not need the full historical chain.

### zcashd RPC Compatibility Mode

Zakura ní nínú ìtòlẹ́sẹẹsẹ tí ó ṣe àtúnṣe sí àwọn ohun èlò ìgbàlódé. `zcashd` JSON-RPC interface. Awọn apamọwọ ti o wa tẹlẹ, awọn paṣipaarọ ati awọn iṣọpọ ti o gbẹkẹle lori `zcashd` Àwọn RPC lè yí padà sí Zakura láìṣe ìyípadà kóòdì.

### Àdánwò P2P Transport Layer

Zakura n gbe ọkọ pẹlu iran-ọmọ ti o tẹle ni ipele gbigbe ẹlẹgbẹ, lọwọlọwọ ** a ṣe idiwọ nipasẹ aiyipada**. Nigbati o ba jẹ ki o ṣiṣẹ, awọn ibi -afẹde rẹ:

- Sub-500ms ti o buru julọ-iṣipopada pipin kọja nẹtiwọọki naa.
- Àkójọpọ Mempool fún àtúnṣe ìsòwò tó gbéṣẹ́ jùlọ
- Àkọsílẹ̀ ìsọkúsọ tí ó ní ààbò DoS láti mú kí nẹ́tàkì le sí i.

Layer yii ṣe afihan iṣaju ti awọn ilọsiwaju eto-ọna Zcash iwaju ni idagbasoke labẹ Project Tachyon.

### Igi irin (NU6.3) Ti o baamu

Zakura ni ibamu patapata pẹlu igbesoke nẹtiwọọki Ironwood (NU6.3), ti a mu ṣiṣẹ lori Zcash mainnet ni arin 2026.

---

## Bí Zakura ṣe ní ìbáṣepọ̀ pẹ̀lú àwọn Nọ́òdì Zcash Mìíràn

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
Èdè: C++ (tí a pín láti Bitcoin) Rust.Rust (ti a pín kúrò nínú Zebra).
Ìyí. Àìnígbàgbé Active. Active (v1.0.0, July 2026)
Ìsọ̀rọ̀-ìṣàmúlò ìsopọ́. Àpilẹ̀kọ: ~1x~5x kíákíá jùlọ.
 Ìkórè ìdìpọ̀ No.No.Yes.
| zcashd RPC compat | Native | Partial | Yes (compat mode) |
ì ì í ê° ë§¤í ̧ë¡ No.No.Yes (<2min)
ìwòye P2P. Rárá o. Kò sí rárá (Opt-in) Bẹẹni, ó wà nínú ìtòlẹ́sẹẹsẹ náà.

---

## Bí Mo Ṣe Bẹ̀rẹ̀ Sí Í Kọ Ọ́

Àwọn àyè ìkórè, àwọn àwòrán ojú-ìwòye àti ìwé ìṣètò wà ní:

- **Ìsọfúnni nípa ìkórè àti ètò:** [zakura.com/ìkórè ìsọfúnni](https://zakura.com/download/)
- ** Àwọn àwòrán ẹ̀rọ-ìpèsè:** [zakura.com/snapshots (ìdánwòrán ojú-ọjọ́)](https://zakura.com/snapshots/)
- **Àkọlé orísun:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Zebra Ìkànnì Pípéye](Zebra_Full_Node.md)  ìsòkè Zcash full node Zakura ni a pín lati inu
- [Àkọsílẹ̀ Zaino Indexer](Zaino.md)  ohun elo ti o ni itọka Rust-based to baamu pẹlu Zebra ati Zakura
- [Àwọn Ìkànnì Pípéye](Full_Nodes.md)  àtúnyẹ̀wò àwọn yíyàn ojú-ìpín Zcash
- [Àwọn Ìkànnì Lightwallet Nodes](Lightwallet_Nodes.md)  àwọn àyípadà tí kò ní láárí fún oníbàárà rẹ̀

## Àwọn Owó-ìṣúnná owó

- [A ṣafihan Zakura  ìfilọlẹ](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub Àwọn ojúewé wọ̀nyí jápọ̀ mọ́:](https://github.com/zakura-core/zakura)
- [Ìkànnì Zakura](https://zakura.com/)
- [Zakura lórí X/Twitter](https://x.com/ZakuraZcash)
- [Iṣẹ́ Àkànṣe Tachyon](https://electriccoin.co/blog/)

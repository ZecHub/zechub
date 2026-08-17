
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Awọn ohun-ini ti a fi aabo Zcash pamọ

## TL;DR

Awọn ohun-ini Zcash Shielded (ZSA) jẹ itẹsiwaju ilana ti a dabaa eyiti yoo gba awọn ohun elo ** miiran ju ZEC**  stablecoins, awọn ami iṣakoso, tabi eyikeyi dukia aṣa  gbe inu adagun ipamọ Zcash's shielded, pẹlu oluranlowo, olugba, ati iye naa pa mọ.

- **Kínni ó jẹ́:** Àwọn ohun ìní àdáṣe tí a ṣe bíi ERC-20, ṣùgbọ́n wọ́n ti di ìdènà nípasẹ̀ àìrídájú.
- ** Ta ló ń kọ́ ọ:** [QEDIT](https://qed-it.com/), under a grant from the Zcash Foundation, in collaboration with the Electric Coin Company.
- **How it is specified:** [ZIP 226](https://zips.z.cash/zip-0226) (yí i padà kí o sì sun ún) pa pọ̀ pẹ̀lú [ZIP 227](https://zips.z.cash/zip-0227) (ìkásẹ̀jáde).
- **Ìṣòro:** kò sí lórí ẹ̀rọ-ìpínlẹ̀. Àdéhùn ZSA ti wà fún ìmúgbòòrò nínú Ìyípadà Ẹ̀ka 7 (NU7).
- **Iye owo:** O maa n san ni ZEC, laibikita ohun-ini ti a gbe.

---

## Àlàyé Ìpilẹ̀ṣẹ̀

Awọn ohun-ini Zcash Shielded (ZSA) jẹ ilọsiwaju ti a dabaa si ilana Zcash eyiti yoo gba ẹda, gbigbe ati sisun awọn dukia aṣa lori pqp.

Tó o bá mọ̀ nípa [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) Àmì ìdìpọ̀ lórí ẹ̀ka Ethereum, ZSAs jẹ́ fún Zcash bí ERC-20 ṣe wà fún Ethereum.

Awọn ohun-ini Zcash Shielded yoo jẹ ki ẹda ti awọn ami aṣa lori blockchain Zcash, nitorinaa gbigba awọn aami miiran ju [ZEC] lọ.](/guides/using-zec-privately) láti jàǹfààní nínú àìdánimọ̀ àti ìpamọ́ àwọn ìṣòwò tí a fi ààbò bo lórí ẹ̀rọ-ìpínlẹ̀ Zcash.

A major potential use of ZSAs would be to issue stablecoins on the Zcash protocol. Stablecoins are cryptocurrencies that peg their value to a fiat currency, such as the US Dollar or Euro. Currently, some of the most widely circulated stablecoins are ERC-20 tokens such as [USDC](https://www.circle.com/en/usdc) àti [Dai](https://docs.makerdao.com/).

Àpẹẹrẹ míràn tí ó ṣeé lò nínú ZSA ni fún fífi àwọn àmì ìṣàkóso ṣe. Bí àpẹẹrẹ, Zechub (olùdíje wiki yìí) jẹ́ Ẹ̀ka Ọmọnìyàn Oníṣekúṣe-Ọkànkan (DAO), àti pé o lè dá kí a sì fi àwo n ẹgbẹ rẹ̀ sípò láti dìbò lórí ìpolongo àti ìpinnu nípa ìṣàjọba.

ZSAs ti wa ni idagbasoke nipa [QEDIT](https://qed-it.com/), labẹ kan pataki iranlowo lati awọn [Zcash Foundation](/zcash-organizations/zcash-foundation) ní ìfọ̀rọ̀wérọ̀ pẹ̀lú [Electric Coin Company](/zcash-organizations/electric-coin-company)Bi ise agbese yi ti wa ni ṣi actively idagbasoke, awọn imudojuiwọn ti wa loorekoore lori [yi asọye](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) of the Zcash forum. The [ZSA grant application](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) by QEDIT wà lórí ìkànnì Zcash Foundation grants.

---

## Ìran / Àfiwé

### Àpótí tí a fi òǹtẹ̀ dì ni.

Picture a Zcash shielded transaction as a plain, sealed envelope dropped into a public mailbox. Anyone can see that an envelope was posted. Nobody can see who sent it, who collects it, or what is inside — and every envelope looks identical to every other one.

Today, an envelope on the Zcash network can only carry one thing: ZEC.

ZSA kò yí àpòòwé padà. Ó ńyí **ohun tí ó jẹ́ ìyàsímímó nínú rẹ̀** pa dà. Lẹ́yìn ti a bá ṣe ZSA, àpóòwè kan náà tó ní èdìdì lè gbé owó ìdákóso (stablecoin), àmì ìṣàkóso DAO tàbí kókó ìwà òótọ́ ilé-iṣẹ́  àti láti òkè yóò ṣì rí bí gbogbo àpòọwó mìíràn lórí ẹ̀rọ alágbèéká.

Ohun kan tó yẹ ká fi sọ́kàn ni pé: **owó ìfìwéránṣẹ́ máa ń jẹ ZEC nígbà gbogbo**, láìka ohun tí wọ́n bá kó sínú àpòòwé náà sí.

### Ohun tí ẹni tó ń wo nǹkan láyìíká lè rí

Ẹnìkan tó ń wo nǹkan lè rí... ERC-20 lórí Ethereum, ZSA lórí Zcash.
| --- | --- | --- |
Ta ló rán an? Ààbò fún gbogbo ènìyàn.
Àwọn tó gba ìsọfúnni náà. Ààbò fún gbogbo ènìyàn.
☐ Owó tó wọlé. ☐ Ètò tí kò ní láárí.
Àwọn ìdìpọ̀ owó ẹnìkọ̀ọ̀kan. Àwùjọ. Aṣọ́ra.
☐ Ètò ìkóhun-ìmọ̀ tó wà nínú àwọn ohun àmúṣọrọ̀ náà.
Owó tí wọ́n fi ń san owó náà ETH ZEC

### Ìdí tí ìlà ìpèsè kò fi jẹ́ àṣìṣe kan

Àwọn ìlà méjì tó wà nísàlẹ̀ tábìlì ni ZSA ti ń dùn.

ZIP 227 deliberately keeps **issuance transparent**, so that the circulating supply of every asset can be tracked on-chain. Individual holdings and individual payments stay private; the total number of tokens in existence does not.

Fun olutaja stablecoin, apapo naa jẹ aaye ju idaamu lọ. A le ṣe ayẹwo awọn idaduro lodi si ipese ti o ṣayẹwo gbangba, lakoko ti awọn eniyan nlo aami gangan tọju iwọntunwọnsi wọn ati awọn sisanwo fun ara wọn.

### Ohun ìní kan, ìdánimọ̀ kan

Every asset gets a unique **Asset Identifier**, derived from the issuer's issuance key together with a text description of the asset. Two different issuers cannot produce the same identifier, and minting or changing an asset requires cryptographic authorization from its issuer. In envelope terms: anyone can post an envelope, but only the mint that owns a given asset can print more of it.

---

## Wọlé Lọ Jìnnà

### Àfihàn ZSA lórí Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

Ẹ fi àwòkẹ́kọ̀ó́ náà hàn fún ara yín!

Ṣe àdàkọ ibi ìpamọ́ ohun èlò zcash-tx: <https://github.com/QED-it/zcash_tx_tool>

### Àwọn Àbá fún Ìmúṣiṣẹ́pọ̀ Zcash (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Ìfipamọ́ àti Iná àwọn Ohun-ìní tí a fi Zcash dídì bojú
- [ZIP 227](https://zips.z.cash/zip-0227): Ìfilọlẹ àwọn Nǹkan tí a fi Ààbò pamọ́ Zcash
- [ZIP 230](https://zips.z.cash/zip-0230): Ẹ̀dà 6 Àtòjọ Ìṣowo

> ** Akọsilẹ lori ZIP 230:** A ti yọ ZIP 230, a kò sì ní ṣe é. Ẹ̀dà ìsòwò 6 ni ó di mímọ báyìí nípa [ZIP 229](https://zips.z.cash/zip-0229). wo ìkìlọ̀ tó wà lókè [ZIP 230](https://zips.z.cash/zip-0230) ojú ìwé.

ZIP 226 defines the OrchardZSA protocol — an extension of the Orchard protocol that carries the transfer and burn of custom assets. ZIP 227 defines how those assets are created in the first place, and must only be implemented alongside ZIP 226.

### Àbá fún Ìrànwọ́ ZSA

Atilẹba ZSA fun Awọn ohun-ini ti a fi oju pa (ZSA/UDA) ni [QEDIT] gbekalẹ.](https://qed-it.com/) ẹgbẹ lati kọ awọn ohun-ini aabo jeneriki lori blockchain Zcash. Awọn wọnyi ni a maa n tọka si bi Ohun-ini Ti A Ṣe Itumọ Olumulo (UDA) tabi gẹgẹbi Awọn Owo Idaabobo Zcash (ZSA).

Pẹlu yi imọran, awọn egbe ni [QEDIT] ti a npe ni "Awọn alagbata" lati ṣe awari rẹ.](https://qed-it.com/) awọn ero lati mu DeFi si ilolupo eda abemi Zcash ati, ni akoko kanna, jẹ ki lilo ti imọ-ẹrọ aṣiri to dara julọ laarin eto iseda ayika DeFi tẹlẹ. ninu iwadii iwariwo kan, ẹgbẹ naa beere, ati pe agbegbe dahun pe [awọn ohun elo aabo apapọ (ZSA / UDA) ni ẹya ti o nilo pupọ julọ lọwọlọwọ](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Àwọn àbá wọ̀nyí bá Àpinnu Ìmúṣe [Zcash Improvement Proposal (ZIP) ] mu ní ti ìmọ̀ ẹ̀rọ.](https://zips.z.cash/zip-0000) Àkọsílẹ̀ àti a ṣe àlàyé wọn nínú ZIP 226 & ZIP227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Ìfipamọ́ àti Iná àwọn Ohun-ìní tí a fi Zcash dídì bojú
2. [ZIP 227](https://zips.z.cash/zip-0227): Ìfilọlẹ àwọn Nǹkan tí a fi Ààbò pamọ́ Zcash

---

## Àwọn Ohun Tó Lè Yọrí sí Lóòótọ́

**Bí o bá ní ZEC tàbí tóo ń lò ó**

- ZSAs ni a ṣe apejuwe bi itẹsiwaju ti Orchard ("OrchardZSA"), nitorinaa wọn yoo pin awọn ẹrọ aabo ZEC tẹlẹ lo. Iwe apamọwọ rẹ yoo nilo atilẹyin ZSA kedere ṣaaju ki o to le ṣetọju tabi firanṣẹ wọn.
- You will always need some ZEC on hand. Fees for issuing and transferring a ZSA are paid in ZEC, not in the asset itself.
- Kò sí nǹkan kan nípa àwọn ìnáwó ZEC tí o ti ṣe tó yí padà.

** Ti o ba jẹ olutaja ti o ni agbara  stablecoin, DAO kan, ile-iṣẹ**

- Ṣíṣírò ohun ìní kan gba àṣẹ láti ṣe àdàkọ tí a so mọ́ kókó ìṣirò, nítorí náà ìwọ nìkan ló lè ṣeré tàbí yí àwọn àmì nǹkan ara rẹ padà.
- Your asset's circulating supply is publicly auditable while your users' balances and transfers are not. For a regulated issuer, this is usually the exact combination required.
- Ìṣirò ìsúnniṣe kan ṣoṣo lè dá ohun-ìní ju ẹyọ kan lọ lẹ́ẹ̀kan náà.

**Fún ètò ìgbé ayé**

- Nitoripe gbogbo owo ZSA ni a tọka si ZEC, iṣẹ-ṣiṣe ninu eyikeyi dukia ọjọ iwaju ti o funni lori Zcash ṣẹda ibeere fun ZEC tikararẹ.

---

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

☐ Èrò tó gbòde kan. Kí ló fà á?
| --- | --- |
| "ZSAs are live on Zcash today." | They are not. ZSA is scheduled for deployment in Network Upgrade 7 (NU7) and is still under review and testing. |
ZSA n mu awọn iwe adehun ọlọgbọn wa si Zcash. "ZSA ṣe alaye ifisilẹ, gbigbe ati sisun ti ohun-ini. Kii ṣe ipele adehun eto gbogboogbo kan".
"O le san owo ZSA ninu ami-ami ZSA funrarẹ". Owó ni a fi ń ṣe owó ní ZEC.
 "Ti o ba ti wa ni ipamọ, awọn ami ifihan gbọdọ jẹ ikọkọ pẹlu". ZIP 227 ṣe iṣedede ṣiṣafihan lori idiwọ, ki a le tọpinpin ipese ohun-ini kọọkan gbangba. Awọn iwontunwonsi ati gbigbe duro si ara ẹni; ipese ko ṣeeṣe. 
"ZIP 230 ni àdàkọ ìmúṣiṣẹ́ 6 tí ó wà nísinsìnyí". A ti yọ ZIP 230 kúrò. Àdàkọ 6 jẹ̀ wípé a mọ ọ sí ZIP 229.

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Halo](/zcash-tech/halo)  eto ti o nfihan lẹhin Orchard, ilana ZSA gbooro sii
- [Àwọn Zk-SNARKs](/zcash-tech/zk-snarks)  àwọn ẹ̀rí tí kò ní ìmọ̀ kankan tó jẹ́ kí a lè ṣàyẹ̀wò ìfipèsè ìdánilẹ́kọ̀ọ́ kan láìsí pé ó fara hàn
- [Àwọn Erékùṣù Tí Wọ́n Fi Ààbò Pa Mọ́](/using-zcash/shielded-pools)  ibi tí àwọn ZSA yóò gbé pẹ̀lú àwọn ZEC.
- [Àwọn ìnáwó](/using-zcash/transactions)  bí wọ́n ṣe ń ṣètò ìnáwó Zcash kan.
- [Ìlàjú Zebra tó kún](/zcash-tech/zebra-full-node)  ìmúṣẹ node tí a lò nínú àfihàn ZSA lókè yìí.

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling lọ si aaye ayelujara Zcash ni ibudo 419,200 (October 29, 2018, 02:15 UTC).

Ohun tí ẹ óo mú lọ: Sapling ṣe ìsanwó Zcash ní ìdákọ̀kọ́ tó yá kánkán, kò sì nira láti lò lórí tẹlifóònù tàbí pọ́ọ̀sì alágbèéká.

Sapling was the second major Zcash network upgrade, activating on Zcash's second anniversary. It was a consensus hard fork that rebuilt how shielded (private) transactions are put together. The deployment is defined by ZIP 205, the new transaction signature rules by ZIP 243, and both build on ZIP 200, the network upgrade mechanism. The full details live in the Zcash Protocol Specification. Electric Coin Company built the upgrade and shipped the first version that supported it, zcashd 2.0.0, in August 2018. On chain, the network identifies the Sapling rules by its consensus branch id.

kí nìdí tí èyí fi ṣe pàtàkì. ṣáájú Sapling, ṣíṣe ìsanwó ní ìdákọ̀kọ́ tọkàntọkàn túmọ̀ sí dídúró fún ìṣéjú bíi mélòó kan nígbàtí kọǹpútà rẹ ń jẹun láti inú gigabytes ti ìrántí lati kó ẹrí náà jọ. ìyẹn lọra jù àti pé ó wúwo ju fáwọn ènìyàn púpọ̀lọpọ̀ lọ, nítorí náà ọ̀pọ̀ àwọn oníṣe, ilé-ìṣàmúlò, àtàwọn iléeṣẹ́ ló máa ń yọkuro ètò ààbò tó sì rán ZEC jáde láìsí ìdíwọ́. Sapling dín iṣẹ́ kù sí ìwọ̀nba sáàkẹ́ẹ̀kan àti nǹkan bí 40 megabytes nínú ìrántí. Àtúntò yìí nìkan ni ohun tó mú kí ìlànà ààbò ZEC rọrùn láti lò lójúmọ́, lórí tẹlifóònù òyìnbó àti orí pọntà alágbèéká.

## Ohun tó yí padà ni pé:

The heart of Sapling is a faster way to build the zero-knowledge proof that keeps a shielded transaction private. The original Sprout design used a single proving circuit (the JoinSplit circuit) that was slow and memory-hungry. Sapling replaced it with two purpose-built circuits, a Spend circuit and an Output circuit, described in the Zcash Protocol Specification. The result is a large drop in cost. Per Electric Coin Company, a shielded transaction can be built in as little as a few seconds using about 40 megabytes of memory. The pre-Sapling Sprout baseline was far heavier, on the order of minutes and several gigabytes of memory (these Sprout-side figures are the widely cited approximate baseline).

![Sprout versus Sapling shielded transaction cost](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Àwọn kókó tuntun

Sapling also introduced a new set of shielded addresses and keys. One key can derive many diversified addresses, which are separate payment addresses that an outside observer cannot link back to each other. Sapling added viewing keys too: a full or incoming viewing key lets you share the ability to see a wallet's transaction details without handing over the ability to spend its funds. That is useful for auditing, accounting, or simply proving a payment was made.

Àtúnṣe kan tí ó jẹ mọ́ èyí ni pé Sapling ya iṣẹ́ kíkọ ẹ̀rí kúrò nínú iṣẹ́ wíwọlé ìnáwó náà. Ẹrọ tó ń kọ ọ̀nà ìmọ-nǹkan kò ní láti ṣe ohun èlò ti o fi àṣẹ lò. Ìyípadà yìí ló mú kó ṣeé ṣe fún àpò owó irinṣẹ lati pa àkọọlẹ ìṣúná rẹ mọ́ nígbàtí ẹrọ mìíràn bá n ṣiṣẹ́ ìdánilójú díẹ̀ sí i.

![Proving device hands the proof to a separate signing device](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Ìdásílẹ̀ tí a fọkàn tán náà.

Sapling's circuits rely on a set of public parameters that had to be generated carefully. If a single party had produced them alone and kept the leftover secret data (the "toxic waste"), that party could have forged proofs. To avoid this, the parameters came from a two-phase, multi-party ceremony. Phase 1, called Powers of Tau, was circuit-agnostic, meaning it was not tied to Sapling's specific circuits. Phase 2, the Sapling MPC, was circuit-specific. Each phase stays secure as long as at least one participant was honest and destroyed their toxic waste, so the ceremony only fails if every single participant colludes.

## Bí ó ṣe di lílò ni

Sapling followed Overwinter, the June 2018 upgrade that prepared the network's upgrade mechanism. Electric Coin Company set the mainnet activation height in zcashd 2.0.0, released in August 2018, and the network switched to the Sapling rules when block 419,200 was mined. On chain, that moment is marked by the Sapling consensus branch id.

![Timeline from Zcash launch to Sapling activation](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
ìṣàmúlò tí a fi ààbò bo. Ìṣàmú Zcash tó dá wàhálà sílẹ̀, èyí tí ó ń pa ẹni tí ó rán an pamọ́, olùgbà á sì kó owó náà sọnù.
Sprout. Àkọsílẹ̀ ààbò tí Zcash ṣe, ó lọ́ra àti pé ó wúwo ju Sapling lọ.
Spend ati Output Circuits Awọn tuntun meji Sapling ti o jẹri awọn iyipo ti o rọpo iyika kanṣoṣo Sprout's JoinSplit.
Adirẹsi oniruuru. Ọkan ninu ọpọlọpọ awọn adirẹti isanwo ti ko le sopọ o le wa lati bọtini kan ṣoṣo.
íwò kókó. Kókó tí ó jẹ́ kí ẹnìkan rí ìsọ̀rí owó kan láìṣe pé yóò náwó láti inú rẹ̀.
◯ Idì ẹ̀ka ìfọwọ́sowọ́pọ̀. Kòódù kúkúrú tí ó sọ fún nẹtiwẹẹki èyí ti àtúnṣe òfin kan ṣe ìṣàdáláwọ̀ náà tẹ̀lé e.

## Àwọn ìbéèrè tí a sábà máa ń béèrè

Did Sapling change how much ZEC I own? No. Sapling changed how shielded transactions are built, not the amount of ZEC anyone holds or the total supply. Your balance was unaffected.

ṣé ZEC mi ṣì jẹ́ àdáni lẹ́yìn Sapling? bẹ́ẹ̀ ni, ó sì ṣeé lò dáadáa. sapling pa àṣírí àwọn ìnáwó tí a fi ọjà ṣe mọ́ láìsí ìdènà àti pé wọ́n yára kánkán wọn kò sì nára tó láti lo lóòótọ́. owó táa fi òrùlé bo náà máa ń wà nípamọ́ lọ́nà kan náà. bí mo bá rí i pé o ti kọjú ìjà sí ohun mìíràn, kí n sọ fún yín nípa ìdí méjì pàtàkì yìí: 1.

Do I have to do anything? No action is required from you as a holder. Sapling was a network upgrade that wallet and node software adopted. Modern wallets already support Sapling addresses.

What is the difference between Sprout and Sapling? Sprout was the first shielded protocol and used one slow, memory-heavy proving circuit. Sapling replaced it with faster Spend and Output circuits, added viewing keys and diversified addresses, and made shielded transactions light enough for phones and hardware wallets.

kí nìdí tí àwọn kan sọ October 28 àti 29 October? ìlà ìgbésẹ̀ náà ti wà ní sẹ́yìn láti sàmì sí Oṣù 28, 2018. Ìdìpọ̀ tó mú àyípadà wá, block 419,200 ni a ṣe lóko lọjọ kọkàndínlọ́gbọ̀n oṣù kẹwàá UTC. Ní ọpọ ibi ìgbà ojú-ọjọ́ èyí ṣì jẹ́ Ọsẹ 28. ó jé òǹkan náà àti àkókò kannáà bó bá wù kó rí.

Kí ni kókó ìwòran?Kọ́kọ́róǹbá fífi ààyè gba ọ láti pínpín ìwé kíkà sí póòtè tí a fi dì. Ẹnìkan tó ní kọ̀rọ̀-ìwòran kún tàbí ti ń wọlé lè rí àwọn kúlẹ̀kúlẹ̀ ìṣòwò póòpó náà ṣùgbọ́n kò le lo owó rẹ̀. Wo [Àwọn Kókó Ìwòran](../zcash-tech/viewing-keys) fún ohun tó ju ìyẹn lọ.

## Wádìí òye rẹ wò

Lábẹ́ ìjọba Sprout, kí ló dé tí ọ̀pọ̀ èèyàn fi máa ń yẹra fún àwọn ìnáwó tó ní ààbò nínú? Báwo ni Sapling ṣe ṣàtúnṣe sí i?

<details>
<summary>Answer</summary>
Under Sprout, building a shielded transaction took minutes and used gigabytes of memory, so it was too slow and heavy for most users, exchanges, and shops. Sapling introduced faster Spend and Output circuits that cut the work to a few seconds and about 40 megabytes, making shielded transactions practical on everyday phones and hardware wallets.
</details>

### Àwọn Owó-ìṣúnná owó

- [ZIP 205: Deployment of the Sapling Network Upgrade](https://zips.z.cash/zip-0205)
- [ZIP 243: Ìmúṣẹ ìforúkọsílẹ̀ oníṣòwò fún Sapling](https://zips.z.cash/zip-0243)
- [Ojúewé ìyípadà Zcash Sapling](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling announcement](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Announcing the Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Ẹ tún wo:

- [Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](../using-zcash/shielded-pools)
- [Àwọn Kókó Ìwòran](../zcash-tech/viewing-keys)
- [àwọn ohun èlò tí wọ́n ń pè ní zk-SNARKS](../zcash-tech/zk-snarks)
- [Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)
- [Àwọn àpamọ́ owó](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àwọn tó ṣáájú: [Ìgbà òtútù](../zcash-tech/overwinter) · Àtúnṣe: [Òdòdó òyìnbó](../zcash-tech/blossom)

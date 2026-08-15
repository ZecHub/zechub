<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Òdòdó òyìnbó

> Blossom lọ si ìkànnì Zcash mainnet ní block 653,600 (December 11, 2019 UTC).

Ohun tí ẹ óo mú lọ: bí Blossom ṣe jẹ́ kí àwọn ìdìpò Zcash dé ní ìlọ̀po méjì ju ti tẹ́lẹ̀ lọ láì yí iye ZEC tí nẹ́tàwọ̀n ń dá sílẹ̀ padà.

Blossom jẹ Zcash kan. [àtúnṣe síra ẹ̀rọ](../start-here/network-upgrades)A ṣe àtúnṣe rẹ̀. [ZIP 206 Àwọn ojúewé wọ̀nyí jápọ̀:](https://zips.z.cash/zip-0206), ati awọn oniwe-ori ifọkanbalẹ ayipada ti wa ni apejuwe ninu [ZIP 208 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0208). Blossom was a scalability upgrade: it shortened the target time between blocks from 150 seconds to 75 seconds, so blocks arrive about twice as often. The Electric Coin Company led and announced Blossom.

ìdí tí èyí fi ṣe pàtàkì. nígbàtí o bá rán ZEC, ìwọ dúró fún nẹ́tàkì láti fìdí rẹ̀ múlẹ̀ nínú àdìpọ̀ kan. bí àwọn àdàkọ kò bá lọra, ìwọ duro pẹ́ sí i. ṣáájú Blossom, a retí kí á dábùú tuntun ní nǹkan bíi 150 ìṣẹ́júkôjì. Blossam gé iye náà sókè sí ìdá méjì, ó di 75 ìsẹ́jú-ìkẹta, nítorí náà ìdánilójú máa ń tètè dé àti pé ẹrùàwò yìí lè gbé ọ̀pọ̀lọpọ̀ àdéhùn sínú àkókò tó dọgba. Ó ṣe é láìdá ZEC tàbí yí àsìkò dídabọ̀ padà lóòrèkóórè.

## Àwọn ìdìpọ̀ tó yára jùlọ

Blossom ká core ayipada jẹ o rọrun. awọn Zcash afojusun block spacing, ni akoko ti awọn nẹtiwọki ifọkansi fun laarin ọkan bulọọgi ati ki o tókàn, silẹ lati 150 aaya to 75 keji ([ZIP 208 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0208)A máa ń rí àwọn ìdìpò̀ nípa ẹrí iṣẹ́, nítorí náà àlàfo gidi láàrin wọn yí padà. ṣùgbọ́n nẹtiwọọki ní báyìí fẹ́ ṣe ìdìpọ̀ kan ni gbogbo wákàtí márùndínlọ́gọ́ta dípò ti ọ̀kọ̀ọ̀kan ọgọrun-un àti ogún.

Ohun méjì ló tẹ̀ lé e:

1. Àwọn ìdìpọ̀ máa ń dé ní ìgbà méjì ju ti tẹ́lẹ̀ lọ, nítorí náà ẹyọ-ẹsẹ lè gbé nǹkan bí iye àwọn ìṣòwò tó pọ̀ sí i nínú àkókò kan.
2. Ìṣirò rẹ yóò gba ìmúdájú àkọ́kọ́ ní kíákíá, nítorí pé o kò dúró pẹ̀lú fún àlàfo tó tẹ̀lé e.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Fífi àwọn owó tí wọ́n ń tẹ̀ jáde dúró ṣinṣin

Faster blocks raise a question. If Zcash made twice as many blocks and each block still paid the same reward, the network would create ZEC twice as fast. Blossom avoids that. It halved the reward paid per block, and it doubled the block-reward halving interval from 840,000 to 1,680,000 blocks ([ZIP 208 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0208)) Awọn bulọọki meji, ọkọọkan san idaji iye ti o ṣiṣẹ si iye kanna ti ZEC ṣẹda fun akoko kan. Eto ipese lapapọ ati awọn akoko ti awọn halving iwaju, wiwọn ni akoko gidi, ko yipada.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Àtúnṣe tí ó pọn dandan

Blossom je iyipada ti o ni ifọkanbalẹ meji, eyi tumọ si pe gbogbo node gbọdọ ṣe igbesoke lati tọju atẹle pq ([ZIP 206 Àwọn ojúewé wọ̀nyí jápọ̀:](https://zips.z.cash/zip-0206)). It was not optional for a node operator who wanted to stay in sync. Blossom activated at mainnet block 653,600 and carries its own consensus branch id, a tag that lets nodes and transactions confirm they are on the Blossom rules. The upgrade used Zcash's standard network upgrade mechanism ([ZIP 200 - Àwọn èèyàn tó ń gbé nílùú.](https://zips.z.cash/zip-0200)).

## Ibi Tí Blossom Ti Wà

Blossom je Zcash's third network upgrade. O tẹle Overwinter ati Sapling, o si wa niwaju Heartwood and Canopy. Ko dabi Sapling , eyi ti o tun ṣe atunṣe cryptography ipamọ Zcash, Blossum fojusi lori iwọn ati iyara. Iṣẹ akọkọ rẹ jẹ akoko pipin, kii ṣe awọn ẹya aṣiri tuntun.

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
ìkápá ìlà-oòrùn. Àsìkò tí nẹ́tàkì ń wá láti gba ààrin ibùdó kan sí òmíràn.
ì£1⁄4ë¡ ì ¬í ©. ZEC tuntun ti a ṣẹda ati sanwo bi kọọkan bulọọki ni mined.
ìdí ìdajì. Ìdìpọ̀ mélòó ló kọjá láàárín ìdálẹ́gbẹ̀é èrè dídádá ibùdó náà?
☐ Ajọṣepọ ẹka id. O kan aami ti o ami eyi ti ṣeto ti nẹtiwọki ofin a node tabi iṣowo ni atẹle
ìyípadà ìfohùnṣòfò méjì-láàárín. Ìyípadà òfin tí gbogbo àpòòdì gbọ́dọ̀ tẹ̀ lé láti wà nínú ẹ̀rọ náà.
 Network upgrade (NU)  Aṣayan iyipada ti a ṣepọ si awọn ofin ifọkanbalẹ Zcash, ti o ṣiṣẹ ni giga bulọọki ṣeto.

## Àwọn ìbéèrè tí a sábà máa ń béèrè

ṣé ọ̀rọ̀ Blossom yí iye ZEC tí ó wà padà tàbí ìgbà tí ìlàjì wáyé? rárá. owó èrè fún ààrá kan dín kù sí méjì àti àkókò tó fi ń díwọ́n ìlàjọ náà di ìlọ́po meji ní àsìkò yìí, nítorí èyí ni pé iye àwọn ZEC ti a dá sílẹ̀ nínú ẹyọ-akoko kò sì tún ṣe kíkọjúgbà ìlàjá ọjọ́ iwájú mọ́.

ṣé blossom yí ZEC mi padà tàbí ìpamọ́ra mi? rárá. blossoms yí àkókò àlàfo àti ìṣirò èrè padà. kò fọwọ́ kan owó rẹ tàbí àwọn ìdánwò tí a fi dídákẹ́ jẹ̀rẹ́ rẹ o, ó ṣe tán ohun tó ń sọ ni pé kí n máa ṣètò bí mo bá fẹ́ láti gba ẹrù náà lọ síbi iṣẹ́ fún ọ ní gbogbo ìgbà.

kí ni 75 ìṣẹ́júkôjì túmọ̀ sí gan-an? ó jẹ àfojúsùn, kìí ṣe ìdánilójú. àwọn ẹyọ kọ̀ǹpútà tí a rí nípa èrí iṣẹ́, nítorí náà ìyàtọ̀ gidi láàrin awọn ẹyẹkọ̀ọ̀kan yàtọ̀ si ara wọn. nẹtiwọki ńlépa fún ọ̀kan ní nǹkan bí gbogbo ọjọ́á márùndínlọ́gọ́ta dípò 150 lọ́dọọdún.

Did I have to do anything when Blossom activated? If you ran a full node, you needed to upgrade it, because Blossom was mandatory. If you used a wallet, you needed a version that supported the new rules.

kí ló dé tí a fi dín èrè ìdìpò̀ kù ní ààlà? nítorí pé àwọn ìdìpọ̀ báyìí ń bọ̀ lọ́nà méjì ju ti tẹ́lẹ̀. dídín owó-ìdíwọ̀n fún ọ̀kọ̀ọ̀kan ìdìpó kúrò nínú nẹtiwúrù láti dá ZEC padà lẹ́sẹ̀mejì jù bẹ́ẹ̀ lọ.

Ìgbà wo ni Blossom ṣe àgbékalẹ̀? Ní ìsọ̀rí 653,600, ní December 11, 2019 UTC.

## Wádìí òye rẹ wò

Blossom ṣe kí àwọn ìdìpò Zcash dédé wọlé ní ìgbà méjì. Kí ló fà á tí èyí kò fi mú iye ìgbà tí a ń dá ZEC tuntun pọ̀ sí i?

<details>
<summary>Answer</summary>

Nítorí pé Blossom tún dín èrè tí wọ́n ń san fún ọ̀kọ̀ọ̀kan àlàfo kù, ó sì fi ìlọ́po méjì kún iye ìgbà tó yẹ kí wọ́n máa pín wọn sí apá kan láti 840,000 dé 1,680,000. Ìlọ́po méjì àwọn àlàfó náà ni ẹnì kọ̀ọ̀kan yóò gbà ní ìdájì owó yẹn, èyí á wá mú kó jẹ ZEC bíi tiwọn lódindi nígbà gbogbo, nítorí náà ètò bí a ṣe ń ṣètò dídá nǹkan jáde kò yí padà rárá bó bá di àkókò gidi.
</details>

### Àwọn Owó-ìṣúnná owó

[ZIP 208: Ìlàkókó tó kéré jùlọ ní ààrin àwọn ìlépa tí a fi ń ṣe àwárí.](https://zips.z.cash/zip-0208)

[ZIP 206: Ifilọlẹ ti Ilana Nẹtiwọki Blossom](https://zips.z.cash/zip-0206)

[Àtúnṣe sípínlẹ̀ Blossom Network](https://z.cash/upgrade/blossom/)

[Blossom Upgrade Improves Speed, Scalability, Capacity (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Ẹ tún wo:

[Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)

[Ìṣèlú owó Zcash](../start-here/zcash-monetary-policy)

[Kí ni ZEC àti Zcash?](../start-here/what-is-zec-and-zcash)

[Àwọn Ìkànnì Pípéye](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àwọn tó ṣáájú: [Sapling](../zcash-tech/sapling) · Àtúnṣe: [Igi àyà igi](../zcash-tech/heartwood)

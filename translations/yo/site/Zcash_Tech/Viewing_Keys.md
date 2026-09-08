<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Kókó Ìwòran

Shielded addresses let you transact while revealing as little as possible on the Zcash blockchain. So what happens when you *do* need to show a specific party what you hold, or what you sent? Every shielded address has a viewing key that grants read access without granting the ability to spend. Viewing keys were introduced in [ZIP 310 ìyẹn àwọn tó ń gbé nílùú](https://zips.z.cash/zip-0310) a sì fi kún ìlànà náà nínú àtúnṣe nẹtiwọọki Sapling.

Àkọlé fífi ojú ríran jẹ́ irinṣẹ̀ fún ìfúnni tí ó yanjú: o yàn ẹni tó ń wo ohun, àti pé kò sí ìgbà kankan tí wàá fi àṣẹ láti náwó ṣe é.

## Kí nìdí tó fi yẹ ká lo kọ́kọ́rọ́ ìmọ́lẹ̀?

Ìwé tí iléeṣẹ́ tó ń ṣe owó ẹyọ, ìyẹn Electric Coin Company kọ lórí kókó yìí sọ àwọn ipò tó sábà máa ń wáyé jù lọ, wọ́n sì ṣì wà títí dòní olónìí:

- **Ipín-ìṣirò kan tó ń wo àwọn ìsúná.** Ipò ìṣíró náà máa fi kókó wíwo tí ó wọlé sínú àlàfo àwárí orí ayélujára kí o lè rí i pé oníbàárà ti ṣe idogo sí àdírésì aláàbò, nígbàtí kókó owó náa wà lórí ẹ̀rọ kòríkòsùn tí kì í fọwọ́ kàn án.
- **Alábojuto tó ń fi ẹ̀rí hàn pé ó ní àwọn ohun ìní.** Aṣojú náà fún olùṣe àyẹwò kan lákọójútó kíkóòyán ojú sí gbogbo àdírésì tí a ṣe dígí. Olùṣèwádìí lè ṣàyẹ̀wò iye owó wọ́n àti láti wo ìgbésè ti o kọjá lọ si tàbí lati adiré wọ̀nyẹn, kò sì le se ohunkóhun mìíràn.
- **Ipa-nla ti o yẹ lori alabaṣiṣẹpọ kan.** Nibi ti paṣipaarọ nilo lati ṣe atunyẹwo itan aabo alabara bi apakan ti iṣakoso to dara julọ, o le beere fun bọtini wiwo dipo awọn owo.

## Ohun tí kókó ìwòye ń ṣe àti ohun tó ò fi hàn

Irú kọ́kọ́rọ́ kan ṣoṣo ò lè wà, ìyàtọ̀ tó sì máa ń wà nínú wọn ló máa pinnu iye tí wàá fúnni.

Àkọlé: Prefix. Grants.
|---|---|---|
ì ì í êμ¬ë§¤í ë¥1⁄4 (UFVK) `uview…` ◯ Ó ń wo àwọn ìnáwó tó wọlé tí ó sì jáde fún gbogbo àgbájọ nínú àkọọ́lẹ̀ náà.
ì í ì ¬ë¦¬í ë°© (UIVK) `uivk…` Ó ń wo àwọn ìnáwó tó wọlé nìkan, fún gbogbo àgbájọ nínú àkọọ́lẹ̀.
| Sapling extended full viewing key | `zxviews…` ◯ Ó ń wo ìgbòkègbodò Sapling tí ó wọlé àti èyí tó jáde fún àwọn àdírẹ́sì kókó náà.

Kò sí èyí tó lè náwó. Gbogbo wọn ló máa ń wà títí lọ ní ọ̀nà tí ó ṣe pàtàkì: kókó kan téèyàn fúnni kò ṣeé gbà padà, kìkì pé owó náà á kọjá àyè rẹ̀ nípa fífi ránṣẹ́ sórí àkọsílẹ̀ tí ẹni kejì kò ni kókó inú ẹ̀.

Àwọn ohun méjì tó lè mú kó o sọ nǹkan kan fún ẹlòmíì ni pé kí ìwọ náà mọ àwọn méjèèjì.

**Incoming kò túmọ sí pé ó dín.** A ṣe àfikún kókó wíwo tí ń wọlé fún gbogbo àkọọ́lẹ̀, kì í ṣe láti adirẹsi kan tí a béèrè lọ́wọ́ rẹ nípa. Ṣíṣàn UIVK fún àdírésì Sapling kan ṣoṣo ṣì máa n fi ìríran tó ń wọle hàn nípasẹ̀ gbogbo àwọn agbègbè nínú àkọọ̣lẹ̀ náà, nítorí náà yóò sọ púpọ̀ ju orúkọ àdírẹsí ti o pe ni Adirẹsis yìí nìkan. [Ìwé Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) ó sọ èyí ní kedere.

** Adirẹsi ti a tẹjade tẹlẹ fi bọtini wiwo rẹ to wọle han si ọta iwaju kan.** [ZIP 326](https://zips.z.cash/zip-0326) ó sọ wípé ọ̀tá tí o ní kọǹpútà kọńmátì lè gba kókó ìwòye tó wọlé láti inú àdírésì oríṣiríṣi kan, èyí kò ṣeé ṣe bí ìgbà téèyàn bá ń mú kí kókó àyáláyé jẹ́ òdìkejì. títẹ adirẹsi jáde kì í ṣe ohunkan náà bíi títẹ kókó ìṣọ̀rí sílẹ̀ lónìí ṣùgbọ́n àwọn méjèèjì sún mọ́ra wọn jùlọ fún àkókò gígùn díẹ̀.

## Àwọn kókó tí ó ń wo Ironwood lẹ́yìn rẹ̀.

NU6.3 ṣe afihan adagun-odo Ironwood ti o ni aabo ati pe awọn odidi Orchard jẹ lilo nikan, nitorinaa owo nlọ lati ọkan si ekeji lori akoko. Wo [Igi irin-igi](/zcash-tech/ironwood) àti pé, [Ìyípadà náà ni pé:](/zcash-tech/the-turnstile) fún àtúnṣe náà fúnra rẹ̀.

**Kínà ìwojúwòrán tí a fi sílẹ̀ kí Ironwood bá ṣiṣẹ́ lẹ́yìn ṣíṣípò.** ZIP 326 sọ pé olùgba, àti kókó wíwò tó wọlé sí i ni ó wà ní àyè fún Orchard *protocol* dípò láti ṣe àkójọ: kọǹpútà náà ń tú àwọn àkọọlẹ̀ òdìwé ti Orchid-pool ati Ironwood-pool. Zallet gbé e kalẹ̀ lọ́nà yẹn, ó ṣàpèjúwe ìwéwèé ironwood gẹ́gẹ́ bí èyí tí o jẹ́ orkidì tí wọn sì tún ṣàyípadà rẹ̀ pẹ̀lú kíní wíwò Orchid akọọkọ lábẹ́ agbègbè ìdánimọ̀ ohun èlò Ironwood.

Àwọn ohun mẹ́ta tó máa ṣẹlẹ̀ sí ẹnikẹ́ni tí ó bá ní kókó tàbí ẹni tó fún un:

1. ** Àwọn òṣùwọ̀n máa ń yí padà láàárín àwọn ìkùdu, ẹni tó bá sì rí i á mòye pé ó ti ṣẹlẹ̀.** [ZIP 318 Àwọn ojúewé wọ̀nyí jápọ̀:](https://zips.z.cash/zip-0318) ṣalaye gbigbe bi lẹsẹkẹsẹ ti awọn iṣowo kekere, iṣọkan Orchard-to-Ironwood ni igbohunsafefe lori eto ayidayida kan, ọkọọkan nlo akọsilẹ Ọgba ọgbà ati ṣiṣejade Ironwood ọkan ti ẹda canonical. Oluwo wo pẹlu bọtini wiwo rii idaduro lati ọdọ adagun si ekeji ni awọn igbesẹ fun ọsẹ diẹ, kii ṣe ninu gbigbe nikan. Iwe apamọwọ le tun ilọsiwaju irin ajo tirẹ jade lati data pq nipa lilo awọn bọtini iwo rẹ.
2. **Kọọkan gbigbe igbese fi han iye ti o gbe.** Ti jẹ inherent lati kọja a turnstile, ati awọn ohun ti ṣe ni migration auditable. pipin iwontunwonsi sinu canonical denominations tumo si ko ọkan idunadura afihan gbogbo Orchard-pool iwontuna.
3. **Awọn iroyin ti a ṣẹda lẹhin Ironwood le gba awọn bọtini wọn ni ọna miiran.** [ZIP 2005 Ìpínlẹ̀ Ọsirélíà](https://zips.z.cash/zip-2005) ó fi a `use_qsk` flag fun quantum-recoverable kókó, ati awọn ti o ayipada bi ni wọle, outgoing ki o si diversifier kọ̀ọ̀kan wa lati ọdọ rẹ; nitorina `use_qsk = true` awọn bọtini jẹ gan o yatọ si awọn bọtinin. ZIP 326 nilo ni asia lati wa ni iṣọkan kọja kan iroyin ati ki o ko ba gbekalẹ `use_qsk = true` awọn bọtini ṣaaju ki o to NU6.3 activated on Mainnet. A pataki okeere lati kan iroyin ti tẹlẹ niwaju Ironwood jẹ nitorina a `use_qsk = false` má ṣe rò pé kókó tí a gbé jáde láti àkọọ́lẹ̀ kan ṣàpèjúwe òmíràn.

## Ṣíṣànáàtò kókó ìwòran kan

### Zallet

[Zallet](https://github.com/zcash/zallet) is the full-node wallet that replaced the wallet inside zcashd. Viewing-key export and import arrived in **v0.1.0-beta.2 (28 July 2026)**, so check your version first; earlier builds do not have these methods. Every argument after the method name must be valid JSON, which means string values keep their own double quotes. The [Ìwé Ìtọ́sọ́nà Rírìndìn Nípa Zallet](/using-zcash/zallet-quick-reference-guide) ó kan ọ̀nà tí wọ́n gbà ń darí àwọn ọmọ ogun.

Kọ ohun tó wà nínú pọ́ọ̀sì náà sílẹ̀:

```bash
zallet rpc listaddresses
```

Ṣíṣàn kókó wíwo gbogbo àkọọ́lẹ̀ náà nípa fífi adirẹsi kan ṣoṣo ranṣẹ:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Ṣàtúnṣe àlẹmọ wíwò wọlé tí ó wà ní ọ̀kan-ò-jọ̀kan ti àkọọ́sílẹ̀ dípò, nípa lílo ìtọ́jú yíyẹ (optional) `ivk` àríyànjiyàn:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Gbigba adirẹsi Sapling pada si akọọlẹ yẹn'Sapling ti o gbooro kikun wiwo bọtini (`zxviews…`), ti o baamu ihuwasi zcashd atijọ. Awọn idiwọn meji ti a ṣe akọsilẹ: A kọ awọn adirẹsi Sprout, ati pe Sapling extended full view key ko le gbe jade lati inu iroyin kan eyiti o wọle bi wiwo nikan, nitori apamọwọ naa ko le tunṣe rẹ . `ivk` fọọmu naa ṣiṣẹ fun awọn iroyin wiwo nikan ti a gbe wọle.

### Àwọn àpò tí ó ń gbé àwọn kókó ìwòran jáde láti inú ojú-ìmọ̀ wọn fúnra rẹ̀.

Àwọn ohun tó ń ṣẹlẹ̀: [Àwọn àpamọ́ owó](/using-zcash/wallets) ojúewé yìí ń tọ́jú ìtìlẹyìn kókó-wò àti ìdánilójú Ironwood fún àpò kọ̀ọ̀kan. Ní àkókò tí a fi kọ ìwé, àwọn apamọwọ tó ṣe àkọsílẹ̀ ìtìlẹ́yìn kókò-wò àtàwọn **Ironwood: Ready** ní ZODL, Zingo!, Zkool, Cake, Zallet, Zecd and Nozy nínú. Ṣayẹwo ojúewè yẹn dípò èyí kí o to gbára lé ọjà kan ṣoṣo nítorí pé ìtẹríba máa yí padà.

## Ṣíṣe àtúntò kókó wíwo gẹ́gẹ́ bí àkọọ́lẹ̀ tí ó ń wo nìkan (watch-only account)

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) ni awọn julọ rọ aṣayan nibi, nitori ti o gba unified bọtini bi daradara bi ogún awon. rẹ README iwe-ka nikan iroyin da lati a ** iṣọkan wiwo bọtini** tabi kan ** Sapling extended wiwo Key**, pẹlú pẹlu ogbologbo ipamọ extended bọtini okeere lati zcashd. fi titun kan account, yan wo nìkan ọna ati ki o lẹẹmọ awọn ohun elo fun lilo ninu awá" n faili kika á1£iáo1ráo1. `uview…` or `zxviews…` kókó; àkọọ́lẹ̀ náà yóò wá ṣe àdàkọ àti ìròyìn ìsókè owó àti ìtàn láì ní àṣẹ láti náwó.

Ìtìlẹyìn ìlànà Ironwood àti ìyípadà Orchard-to-Ironwood dé ní Zkool 6.24.0 (20 July 2026), àti 6.26.1 (2 August 2026) ṣàtúnṣe àyèwò ìṣòwò Ironwood nínú mempool. Ṣiṣẹ́ 6.26,1 tàbí lẹ́hìn èyí.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Àríyànjiyàn kejì ni ìlànà àtúnṣe: `"whenkeyisnew"` (ìwà àìdáa), `"yes"` or `"no"`. Ẹkẹta ni giga bulọọki lati ṣawari lẹẹkansi. Zallet gbe bọtini wọle bi akọọlẹ wiwo nikan ati tọpinpin awọn iṣowo ti n bọ ati jade fun awọn adirẹsi rẹ laisi aṣẹ inawo.

**Zallet n gbe awọn Sapling ti o gbooro sii ni kikun wiwo bọtini nikan.** Ko yoo ṣe agbewọle a `uview…` láti fi ààyè ìkàwé sí àkọọ́lẹ̀ tí a ṣepọ, kó o gbé UFVK náà jáde kúrò nínú Zallet kí o sì mú un wọlé sínú apamọwọ tó gba àwọn kọǹpútà aláwọ̀tọ́jú bíi Zkool.

## Ohun tó yí padà, àti ohun tí kò yẹ ká máa wá mọ́

Bí o bá tẹ̀lé àdàkọ àtijọ́ ojúewé yìí, tàbí ìtumọ̀ rẹ̀ kan, ọ̀nà mẹ́ta kò ṣiṣẹ́ mọ́.

- **`zcash-cli z_exportviewingkey` àti pé, `z_importviewingkey`.** zcashd dé opin atilẹyin rẹ ni 18 July 2026 ati pe ko ṣiṣẹ mọ. Awọn ọna Zallet ti o jẹ orukọ kanna ni iyipada; wo awọn alaye fun Zcashd, eyiti a ṣe nipasẹ oludari kan lati ṣalaye bi wọn ṣe nlo owo-ori naa: [ìwé tó ń darí ìrìn àjò-àjò.](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **The Ywallet walkthrough.** The Wallets page marks Ywaller **Ironwood: Not Ready**, so it is not the wallet to point people at for Ironwood-era viewing keys. Zkool, from the same developer, accepts the same range of keys and is marked Ready. Ìtòsí ìkóhunsòpòwò tí ó wà ní ojúewé yìí ni "Ìtójúwón" àti "ìrówó". Àkọlé àwòrán Àwọn àkájọ ìwé tó ń gbé àwọn àkọọ́lẹ̀ káàkiri ayé ló fi hàn pé wọ́n ti ṣe é láti rí bí wọ́n á ṣe máa wo kókó òpópẹrẹ náà (àdàkejì) nígbà tí kò bá sí ohun kan pàtó nínú wọn.
- **zcashblockexplorer.com/vk.** Iṣẹ́ náà dá HTTP 503 padà pẹ̀lú ìwé ẹrí tí kò léwu, ó sì ti di èyí tí a pa tì dípò kí á rọ́pò rẹ̀. Fífi kókó ìwòye sínú ojúlé ayélujára kan fi gbogbo ìtàn ìṣiṣẹ́ rẹ fún ẹnikẹ́ni tó bá ń ṣiṣẹ́ orí ilé ayélujá yẹn, ìyẹn ni ìgbàgbogbo jẹ́ ọ̀kan lára àwọn àyè mẹ́ta ní ojú-iwe àtijọ́. Gbé kókó wọle sí inú apamọwọ tí o nṣiṣẹ́ dípòi.

## Àwọn Owó-ìṣúnná owó

Lo awọn bọtini wiwo lori ipilẹ bi o ti nilo, ki o si fẹ bọtini to nipọn julọ ti o dahun ibeere ti a beere.

- [ZIP 326: NU6.3 Àwọn ìyọrísí fún Wallets](https://zips.z.cash/zip-0326)  bí àwọn kókó ìwòran ṣe ń hùwà ní gbogbo agbami Orchard àti Ironwood
- [ZIP 229: Ẹ̀dà 6 Àkọlé Ìṣirò](https://zips.z.cash/zip-0229)  ó ṣàpèjúwe àwọn adágún Orchard àti Ironwood.
- [Àkọsílẹ̀ ìyípadà Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md)  èyí tí a tú sílẹ̀ fi kún ìlànà RPC wo ni ó wà nínú rẹ?
- [Zkool README ì í ë ¤ì 'ë¦¬í ¬](https://github.com/hhanh00/zkool2/blob/main/README.md)  àwọn oríṣi àkọọ́lẹ̀ àti kókó tí a fọwọ́ sí
- [ECC, Ó Ṣàlàyé Àwọn Ohun Tó Ń Mú Ká Lè Rí I](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Àkọsílẹ̀ Ìpinnu àti Àwọn Kọ́kọ́rójú Wo-Wo](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)

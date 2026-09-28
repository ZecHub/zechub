<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Nódù Kíkún

## TL;DR

- Nọ́mbà kan tó kún fún ẹ̀dà kan pa gbogbo ẹ̀dà Zcash blockchain mọ́, ó sì ń ṣàyẹ̀wò gbogbo ìdènà àti ìṣòwò tuntun lòdì sí àwọn òfin ìfohùnṣọ̀kan.
- Zebra (`zebrad`) ni nódù tí a ó fi sori ẹrọ lónìí. Zakura jẹ́ ìṣiṣẹ́ kejì, tí a fi fork láti inú Zebra.
- zcashd ti fẹ̀yìntì. Wọ́n dé ìdádúró End-of-Support rẹ̀ ní ọjọ́ kejìdínlógún oṣù keje ọdún 2026 ní gíga block 3417100, àwọn nodes wọ̀nyẹn kò sì bẹ̀rẹ̀ mọ́.
- Nódù àti àpò owó ti di ètò ọ̀tọ̀ọ̀tọ̀ báyìí. [Zallet](https://github.com/zcash/zallet) ó ń sáré lòdì sí nódù kan ó sì di àwọn kọ́kọ́rọ́ náà mú.
- Ṣíṣiṣẹ́ nódù ara rẹ fún ọ ní ìfìdíkalẹ̀ òmìnira àti pé ó mú kí o gbẹ́kẹ̀lé olupin ẹlòmíràn kúrò.

## Àlàyé Pàtàkì

A Full Node jẹ́ sọ́fítíwọ́ọ̀dù tí ó ń ṣiṣẹ́ ní ẹ̀dà gbogbo blockchain ti owó ìsanwó, èyí tí ó fún ọ ní àǹfààní láti wo àwọn ẹ̀yà ara ìlànà náà.

Ó ní àkọsílẹ̀ pípéye ti gbogbo ìṣòwò tí ó ti wáyé láti ìgbà ìṣẹ̀dá, nítorí náà ó lè fìdí múlẹ̀ pé àwọn ìṣòwò tuntun àti àwọn búlọ́ọ̀kì tí a fi kún blockchain náà jẹ́ òótọ́.

## Àwọn Ìmúṣe Nódù

### Zebra

Zebra jẹ́ ìgbékalẹ̀ ìṣiṣẹ́ Zcash tí ó dá dúró, tí ó sì ti múra tán láti ṣe àgbékalẹ̀ rẹ̀, tí Zcash Foundation dá sílẹ̀ tí a sì kọ sínú Rust. Bí zcashd ti fẹ̀yìntì, Zebra (`zebrad`) ni node kikun ti a ṣeduro fun awọn imuṣiṣẹ tuntun.

Zebra jẹ́rìí sí àwọn ìdènà àti ìṣòwò, ó kópa nínú nẹ́tíwọ́ọ̀kì peer-to-peer, ó sì fi ìfọwọ́sowọ́pọ̀ RPC hàn fún àwọn ohun èlò. Àpò owó náà jẹ́ apá kan tí ó yàtọ̀ báyìí: [Zallet](https://github.com/zcash/zallet) Ó ń ṣiṣẹ́ lòdì sí nódù Zebra kan, ó sì ń lo àwọn kọ́kọ́rọ́ àti ìwọ̀n. Èyí rọ́pò zcashd, èyí tí ó so nódù àti àpò owó pọ̀ nínú iṣẹ́ kan ṣoṣo.

Láti sin àwọn àpò ìpamọ́ tí a dáàbò bo, nọ́ńbà náà ń ṣiṣẹ́ pẹ̀lú olùtọ́kasí kan, yálà èyí tí a ti dá sílẹ̀ [lightwalletd](https://github.com/zcash/lightwalletd) tabi tuntun [Zaino](https://zechub.wiki/zaino).

Rí i dájú pé o ka ìwé Zebra fún àwọn ìtọ́ni ìṣètò, kí o sì dara pọ̀ mọ́ olupin R&D Discord fún ìrànlọ́wọ́.

[Github](https://github.com/ZcashFoundation/zebra/)

[Ìwé Zebra](https://zebra.zfnd.org)

Wo [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node) fun awọn igbesẹ fifi sori ẹrọ, iṣeto, ati awọn ibeere ohun elo.

### Zakura

Zakura jẹ́ nódù kejì tó bá ìfohùnṣọ̀kan mu, tí a fi Zebra ṣe, tí Valar Group àti Project Tachyon ṣe àgbékalẹ̀ rẹ̀. Ó ń tẹ̀lé àwọn òfin ìlànà kan náà, ó sì ń fi ìṣọ̀kan tó yára, pípa block pruning, àti ìpele ìbáramu zcashd RPC kún un [Zakura Node](/zcash-tech/zakura-node).

### zcashd (fẹ̀yìntì)

> **Àkíyèsí:** zcashd ti fẹ̀yìntì. Electric Coin Company [kede idinku naa](https://z.cash/support/zcashd-deprecation/), a sì dé ìdádúró End-of-Support laifọwọyi ní ọjọ́ kejìdínlógún oṣù keje ọdún 2026 ní gíga block 3417100. Gbogbo node zcashd 6.20.0 tí a kò yípadà a máa pa ní gíga yẹn a sì kọ̀ láti tún bẹ̀rẹ̀, software náà kò sì ní ìtìlẹ́yìn fún NU6.3. Lo Zebra. Tí o bá ní zcashd `wallet.dat`, tẹ̀lé [Ìtọ́sọ́nà Ìṣípòpadà: zcashd sí Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd ni ìṣètò Full Node àkọ́kọ́ fún Zcash, tí Electric Coin Company. Àwọn ìlànà ìkọ́lé tí ó wà ní ìsàlẹ̀ yìí wà fún ìtọ́kasí àti fún àwọn olùṣiṣẹ́ tí wọ́n ń ṣí lọ kúrò ní zcashd.

Zcashd ń fi àwọn API hàn nípasẹ̀ ìsopọ̀ RPC rẹ̀. Àwọn API wọ̀nyí ń pese àwọn iṣẹ́ tí ó ń jẹ́ kí àwọn ohun èlò ìta lè bá nódù náà lò.

[Aṣọ ina](https://github.com/zcash/lightwalletd) jẹ́ àpẹẹrẹ ohun èlò kan tí ó ń lo gbogbo nódù láti jẹ́ kí àwọn olùgbékalẹ̀ kópa láti kọ́ àti láti tọ́jú àwọn àpò ìpamọ́ tí ó ní ààbò lórí fóònù láìsí pé wọ́n ń bá Zcashd ṣe ìbáṣepọ̀ taara.

[Àkójọ gbogbo àwọn àṣẹ RPC tí a ti ṣe àtìlẹ́yìn](https://zcash.github.io/rpc/)

[Ìwé Zcashd](https://zcash.github.io/zcash/)

#### Bẹrẹ Node kan (Linux)

- Fi sori ẹrọ Awọn igbẹkẹle

      imudojuiwọn sudo apt

      sudo apt-gba fifi sori ẹrọ \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Ṣe àtúnṣe ìtújáde tuntun, ibi isanwo, ètò àti ìkọ́lé:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      ibi isanwo git v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Ṣiṣẹpọ Blockchain (o le gba awọn wakati pupọ)

    Láti bẹ̀rẹ̀ nódù náà, ṣiṣẹ́:

      ./src/zcashd

- Àwọn Kọ́kọ́rọ́ Àdáni ni a tọ́jú sínú ~/.zcash/wallet.dat

[Ìtọ́sọ́nà fún Zcashd lórí Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Àwọn Àbájáde Tó Wúlò

### Nẹ́tíwọ́ọ̀kì náà

Nípa ṣíṣiṣẹ́ gbogbo nọ́mbà kan, o ń ran lọ́wọ́ láti mú kí nẹ́tíwọ́ọ̀kì zcash lágbára sí i nípa ṣíṣe àtìlẹ́yìn fún ìpínkiri rẹ̀.

Èyí ń ran lọ́wọ́ láti dènà ìṣàkóso ọ̀tá àti láti jẹ́ kí nẹ́tíwọ́ọ̀kì náà le koko sí àwọn irú ìdàrúdàpọ̀ kan.

Àwọn olùfúnni DNS fi àkójọ àwọn nódù mìíràn tí a lè gbẹ́kẹ̀lé hàn nípasẹ̀ olupin tí a ṣe sínú rẹ̀. Èyí ń jẹ́ kí àwọn ìṣòwò tàn káàkiri nẹ́tíwọ́ọ̀kì náà.

### Àwọn Ìṣirò Nẹ́tíwọ́ọ̀kì

Àwọn àpẹẹrẹ ìtàkùn tí ó gba ààyè láti wọlé sí dátà Zcash Network nìyí:

[Olùṣàwárí Àkọsílẹ̀ Zcash](https://zcashblockexplorer.com)

[Àwọn Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

O tun le ṣe alabapin si idagbasoke nẹtiwọọki naa nipa ṣiṣe awọn idanwo tabi daba awọn ilọsiwaju tuntun ati pese awọn wiwọn.

### Iwakusa

Àwọn awakùsà nílò àwọn nódù kí wọ́n tó lè wọlé sí gbogbo àwọn RPC tó ní í ṣe pẹ̀lú iwakùsà bíi getblocktemplate & getmininginfo.

Zcashd tun mu ki iwakusa naa di ibi aabo fun awọn coinbase. Awọn awakusa ati awọn adagun iwakusa ni aṣayan lati wakọ taara lati ko ZEC ti a daabobo jọ sinu adirẹsi z nipasẹ aiyipada.

Kà [Ìtọ́sọ́nà Ìwakùsà](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) tàbí kí o dara pọ̀ mọ́ ojú ìwé Àpérò Àwùjọ fún [Àwọn Olùwakùsà Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Ìpamọ́

Ṣiṣe kikun node gba ọ laaye lati ṣe idanwo fun ara rẹ gbogbo awọn iṣowo ati awọn bulọọki lori nẹtiwọọki Zcash.

Ṣíṣe gbogbo nọ́ńbà yẹra fún àwọn ewu ìpamọ́ kan tí ó ní í ṣe pẹ̀lú lílo àwọn iṣẹ́ ẹni-kẹta láti ṣàyẹ̀wò àwọn ìṣòwò ní ipò rẹ.

Lilo node tirẹ tun ngbanilaaye lati sopọ mọ nẹtiwọọki nipasẹ [Tor](https://zcash.github.io/zcash/user/tor.html).
Èyí ní àǹfàní afikún ti jíjẹ́ kí àwọn olùlò mìíràn sopọ̀ mọ́ àdírẹ́sì node .onion rẹ ní ìkọ̀kọ̀.

## Àwọn Àṣìṣe Tó Wọ́pọ̀

- Kíkọ́ zcashd láti inú àwọn ìtọ́ni tó wà lókè yìí, kí o sì máa retí ibi tí ó ń ṣiṣẹ́. Àwọn onípele méjì wọ̀nyẹn dúró ní ibi tí ó ga jù.
- Ṣíṣiṣẹ́ nódù kan tí o sì ń rò pé àpò owó alágbèéká rẹ ti ń lò ó báyìí. Àpò owó kékeré kan ń bá olupin èyíkéyìí tí a bá fi ṣe àtúnṣe rẹ̀ sọ̀rọ̀ títí tí o fi tọ́ka sí tirẹ̀ [Àwọn Nódù Àpò Ìmọ́lẹ̀](/zcash-tech/lightwallet-nodes).
- Nṣiṣẹ nikan `zebrad` àti pé a ń retí pé àwọn àpò owó fẹ́ẹ́rẹ́fẹ́ yóò so pọ̀. Nóódù náà nílò àkójọ àmì tí ó wà lẹ́gbẹ̀ẹ́ rẹ̀, yálà lightwalletd tàbí [Zaino](/zcash-tech/zaino).
- N wa awọn RPCs apamọwọ lori node naa. Awọn bọtini ati awọn iwọntunwọnsi gbe lọ si Zallet.

## Àwọn ojú ìwé tó jọra

- [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node) - fi sori ẹrọ, tunto, ati ṣiṣẹ node ti a ṣeduro
- [Zakura Node](/zcash-tech/zakura-node) - imuse node keji, ti a fa lati inu Zebra
- [Àwọn Nódù Àpò Ìmọ́lẹ̀](/zcash-tech/lightwallet-nodes) - awọn olupin ti o n beere awọn apamọwọ ina
- [Zaino](/zcash-tech/zaino) - Atọka Rust ti o n ṣiṣẹ awọn apamọwọ ina
- [Ìṣiṣẹ́pọ̀ Àpò Zcash](/zcash-tech/zcash-wallet-syncing) - idi ti amuṣiṣẹpọ ṣe n ṣiṣẹ bi o ṣe ṣe

## Ẹ̀kọ́ Síwájú

Kà [Àwọn Ìwé Àtìlẹ́yìn](https://zcash.readthedocs.io/en/latest/)

Darapọ mọ wa [Olùpèsè Discord](https://discord.gg/zcash) tabi kan si wa lori [X](https://X.com/ZecHub)

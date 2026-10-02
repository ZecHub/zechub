<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodes Blibowo

## TL;DR

- Node blibo dzraa Zcash blockchain ƒe kɔpi blibo ɖo eye wòléa ŋku ɖe block yeye ɖesiaɖe kple asitsatsa ŋu le se siwo dzi woda asi ɖo nu.
- Zebra (`zebrad`) nye node si woaɖo egbea. Zakura nye dɔwɔwɔ evelia, si woɖe tso Zebra.
- zcashd xɔ dzudzɔ le dɔme. Woɖo eƒe End-of-Support ƒe tɔtrɔ gbɔ le 18 July 2026 dzi le block height 3417100, eye node mawo megadzea egɔme o.
- Fifia node kple gakotokua nye ɖoɖowɔɖi vovovowo. [Zallet](https://github.com/zcash/zallet) ƒua du ɖe node aɖe ŋu eye wòléa safuiawo ɖe asi.
- Wò ŋutɔ wò node zazã naa kakaɖedzi le ɖokuiwò si eye wòɖea alesi wòhiã be nàka ɖe ame bubu ƒe server dzi la ɖa.

## Numeɖeɖe Vevitɔ

Full Node nye kɔmpiutadziɖoɖo si wɔa cryptocurrency ƒe blockchain ƒe kɔpi blibo, si naa mɔnukpɔkpɔ wò be nàkpɔ protocol la ƒe nɔnɔmewo.

Eléa asitsatsa ɖesiaɖe si dzɔ tso gɔmedzedzea me ƒe nuŋlɔɖi blibo ɖe asi eye le esia ta ete ŋu ɖoa kpe asitsatsa yeyewo kple mɔxenu siwo wotsɔ kpe ɖe blockchain ŋu ƒe nyateƒenyenye dzi.

## Node ƒe Dɔwɔwɔwo

### Zebra

Zebra nye Zcash ɖoɖowɔɖi ƒe node blibo si le eɖokui si, si le klalo na ewɔwɔ, si Zcash Foundation wɔ eye woŋlɔe ɖe Rust me. Esi zcashd xɔ dzudzɔ le dɔme ta la, Zebra (`zebrad`) nye node blibo si wokafu na dɔwɔwɔ yeyewo.

Zebra ɖoa kpe mɔxenuwo kple asitsatsa dzi, kpɔa gome le hatiwo ƒe kadodo me, eye wòɖea RPC ƒe ŋgɔdonya ɖe go na dɔwɔɖoɖowo. Gakotokua nye akpa aɖe si to vovo fifia: [Zallet](https://github.com/zcash/zallet) ƒua du ɖe Zebra node ŋu eye wòkpɔa safuiwo kple dadasɔwo gbɔ. Esia xɔ ɖe zcashd, si ƒo node kple gakotoku nu ƒu ɖe dɔwɔwɔ ɖeka me.

Be woasubɔ gakotoku siwo me kekeli le siwo ŋu wokpɔ ta na la, node la zɔna ɖe indexer aɖe xa, si nye esi woɖo anyi [lightwalletd](https://github.com/zcash/lightwalletd) alo yeyetɔ kekeake [Zaino](https://zechub.wiki/zcash-tech/zaino).

Kpɔ egbɔ be yexlẽ Zebra agbalẽa hena ɖoɖowɔwɔ ŋuti mɔfiamewo, eye nàwɔ ɖeka kple R&D Discord server hena kpekpeɖeŋu.

[Github ƒe mɔnu](https://github.com/ZcashFoundation/zebra/)

[Zebra ƒe Agbalẽa](https://zebra.zfnd.org)

Kpɔ [Zebra Node Bliboe](/zcash-tech/zebra-full-node) na install afɔɖeɖewo, ɖoɖowɔwɔ, kple hardware ƒe nudidiwo.

### Zakura

Zakura nye node blibo evelia si sɔ kple nukpɔsusu ɖeka, si woɖe tso Zebra me eye Valar Group ye wɔe ɖekae kple Project Tachyon. Ewɔna ɖe ɖoɖowɔɖi ƒe se mawo ke dzi eye wòtsɔa wɔwɔ ɖekae kabakaba, block pruning, kple zcashd RPC compatibility layer kpena ɖe eŋu. Kpɔ [Zakura Node ƒe ŋkɔ](/zcash-tech/zakura-node).

### zcashd (xɔ dzudzɔ le dɔme)

> **De dzesii:** zcashd xɔ dzudzɔ le dɔme. Electric Coin Company [ɖe gbeƒãe be woɖe asi le eŋu](https://z.cash/support/zcashd-deprecation/)zcashd NU6.3. Zã Zebra. Ne èlé zcashd ɖe asi `wallet.dat`, dze eyome [Ʋuʋu ƒe Mɔfiame: zcashd yi Zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd nye Full Node ƒe dɔwɔwɔ gbãtɔ na Zcash, si Electric Coin Company. Wodzra xɔtutu ƒe mɔfiame siwo le ete ɖo hena numekuku kple na dɔwɔla siwo le ʋuʋum tso zcashd.

Zcashd ɖea API ƒe hatsotso aɖe ɖe go to eƒe RPC ŋgɔdonya dzi. API siawo naa dɔwɔwɔ siwo ɖea mɔ na gotagome dɔwɔɖoɖowo be woawɔ nu kple node la.

[Kekeli ƒe gakotoku](https://github.com/zcash/lightwalletd) nye dɔwɔɖoɖo si zãa node blibo tsɔ naa dɔwɔlawo te ŋu tua gakotoku siwo me kekeli le siwo ŋu wokpɔa akpoxɔnu le siwo sɔ na asitelefon xɔlɔ̃wɔwɔtɔe eye mahiã be woawɔ nu kple Zcashd tẽ o ƒe kpɔɖeŋu.

[RPC sedede siwo wodo alɔe ƒe xexlẽdzesi bliboa](https://zcash.github.io/rpc/)

[Zcashd ƒe agbalẽa](https://zcash.github.io/zcash/)

#### Dze Node (Linux) aɖe gɔme

- De Dependencies (Nu Siwo Dzi Wonɔ te ɖo) la ɖe wò kɔmpiuta dzi

      sudo apt ƒe yeyewɔwɔ

      sudo apt-xɔ ɖoɖo \
      xɔ-vevietɔ pkg-ɖoɖo libc6-dev m4 g++-multilib \
      autoconf libtool nfiƒodewo-dev ɖe zip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils nuwo wɔwɔ le wo ɖokui si libtinfo5

- Clone yeyetɔ si woɖe ɖe go, checkout, ɖoɖo kple xɔtutu:

      git ƒe nɔnɔmetata https://github.com/zcash/zcash.git

      cd zcash/ 1999 me

      git ƒe ʋuʋu v5.4.1
      ./zcutil/xɔ-params.sh
      ./zcutil/kɔ.sh
      . / zcutil / xɔ.sh -j $ (nproc)

- Sync Blockchain (ate ŋu axɔ gaƒoƒo geɖe)

    Be nàdze node la gɔme la, ƒu du:

      ./src/zcashd

- Wodzraa Private Keys ɖo ɖe ~/.zcash/wallet.dat me

[Mɔfiame na Zcashd le Raspberry Pi dzi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Nusiwo wòfia ŋutɔŋutɔ

### Netwɔƒea

To node blibo ƒe duƒuƒu me la, èle kpekpem ɖe zcash network ŋu be wòado ŋusẽ to eƒe decentralization ƒe kpekpeɖeŋu nana me.

Esia kpena ɖe ame ŋu be woaxe mɔ ɖe tsitretsiɖeŋulawo ƒe dziɖuɖu nu eye wònana network la nɔa te ɖe tɔtɔ ƒomevi aɖewo nu.

DNS seeders ɖea node bubu siwo ŋu kakaɖedzi le ƒe xexlẽdzesi ɖe go to server si wotu ɖe eme dzi. Esia wɔnɛ be asitsatsa te ŋu kakana le network bliboa me.

### Network ƒe Akɔntabubuwo

Esiawo nye kpɔɖeŋu mɔnu siwo ɖea mɔ be woakpɔ Zcash Network ƒe nyatakakawo:

[Zcash Block ƒe Ʋuʋudedi](https://zcashblockexplorer.com)

[Gakuwo ƒe xexlẽdzesiwo](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Àte ŋu akpe asi ɖe network la ƒe ŋgɔyiyi hã ŋu to dodokpɔwo wɔwɔ alo ŋgɔyiyi yeyewo dodo ɖe ŋgɔ & metrics nana me.

### Tomenukuƒewo

Tomenukulawo hiã node blibowo be woakpɔ RPC siwo katã do ƒome kple tomenukulawo abe getblocktemplate & getmininginfo ene.

Zcashd hã naa tomenukuƒewo te ŋu yia gakudzraɖoƒe si wokpɔ ta na. Tiatia le tomenukulawo kple tomenukuƒewo si be woaku tome tẽ be woaƒo ZEC si wokpɔ ta na nu ƒu ɖe z-adrɛs me le gɔmedzedzea me.

Xlẽ [Tomenukulawo ƒe Mɔfiamegbalẽa](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) alo nàwɔ ɖeka kple Nutoa me Nyamedzroƒe ƒe axaa na [Zcash Tomenukulawo](https://forum.zcashcommunity.com/c/mining/13).

### Adzame

Node blibo ƒe dɔwɔwɔ na be nàte ŋu aɖo kpe asitsatsa kple mɔxenuwo katã dzi le ɖokuiwò si le Zcash network la dzi.

Node blibo zazã ƒoa asa na ameŋunyatakakawo ŋuti afɔku aɖewo siwo dona tso ame bubuwo ƒe dɔwɔnawo zazã atsɔ aɖo kpe asitsatsa dzi ɖe tawò me.

Wò ŋutɔ wò node zazã hã ɖea mɔ be nàdo ka kple network la to [Tor](https://zcash.github.io/zcash/user/tor.html).
Viɖe bubu aɖe le esia ŋu be wòana zãla bubuwo nado ka kple wò node .onion adrɛs le adzame.

## Vodada Siwo Wowɔna Zi geɖe

- zcashd tutu tso mɔfiame siwo le etame kple mɔkpɔkpɔ na node si le dɔ wɔm. Binaries mawo tɔa te le deprecation ƒe kɔkɔƒe.
- Node aɖe ƒe duƒuƒu eye nàtsɔe be wò asitelefon dzi gakotokua zãnɛ fifia. Gakotoku si me kɔ la nɔa nu ƒom kple server ɖesiaɖe si wotsɔ ɖoe vaseɖe esime nèfia asi wò ŋutɔ tɔwò. Kpɔ [Lightwallet ƒe Nodes](/zcash-tech/lightwallet-nodes).
- Duƒuƒu ɖeɖeko `zebrad` kple mɔkpɔkpɔ be gakotoku siwo me kɔ be woatsɔ aƒo ka. Node la hiã indexer si le egbɔ, eɖanye lightwalletd alo [Zaino](/zcash-tech/zaino).
- Didi be gakotoku RPCwo le node la dzi. Keys kple balances ʋu yi Zallet.

## Axa Siwo Do Ƒome Kplii

- [Zebra Node Bliboe](/zcash-tech/zebra-full-node) - de, ɖoɖo, eye nàwɔ node si wokafu la
- [Zakura Node ƒe ŋkɔ](/zcash-tech/zakura-node) - node evelia ƒe dɔwɔwɔ, forked tso Zebra
- [Lightwallet ƒe Nodes](/zcash-tech/lightwallet-nodes) - server siwo klẽ gakotokuwo biaa nya
- [Zaino](/zcash-tech/zaino) - Rust indexer si subɔa gakotoku siwo me kɔ
- [Zcash Gakotoku ƒe Ðoɖowɔwɔ](/zcash-tech/zcash-wallet-syncing) - nusitae syncing wɔa dɔ abe alesi wòwɔna ene

## Nusɔsrɔ̃ Bubuwo

Xlẽ [Kpekpeɖeŋunagbalẽwo](https://zcash.readthedocs.io/en/latest/)

Wɔ ɖeka kple míaƒe.. [Discord Server ƒe Dɔwɔƒe](https://discord.gg/zcash) alo do asi ɖe mía gbɔ le [X](https://X.com/ZecHub)

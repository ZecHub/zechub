<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodes Blibowo

Full Node nye kɔmpiutadziɖoɖo si wɔa cryptocurrency ɖesiaɖe ƒe blockchain ƒe kɔpi blibo si naa mɔɖeɖe ɖe protocols ƒe nɔnɔmewo ŋu.

Eléa asitsatsa ɖesiaɖe si dzɔ tso gɔmedzedzea me ƒe nuŋlɔɖi blibo ɖe asi eye le esia ta ete ŋu ɖoa kpe asitsatsa yeyewo kple mɔxenu siwo wotsɔ kpe ɖe blockchain ŋu ƒe nyateƒenyenye dzi.

## Zcashd ƒe ŋkɔ

> **De dzesii:** wole zcashd ɖem ɖa. Electric Coin Company [ɖe gbeƒãe le se nu](https://z.cash/support/zcashd-deprecation/) be wole dzudzɔ xɔm le zcashd me, eye wotsɔ [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) kple eƒe gakotoku ƒe akpa si [Zallet](https://github.com/zcash/zallet). Ne èdi be yeawɔ dɔ yeyewo la, zã Zebra (kpɔ ete). Ne èwɔ zcashd node xoxo la, wɔ ɖe [Migration Guide: zcashd to Zebrad/Zallet dzi](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd nye Full Node ƒe dɔwɔwɔ gbãtɔ na Zcash, si Electric Coin Company to vɛ eye wòlé be nɛ. Wodzra xɔtutu ƒe mɔfiame siwo le ete ɖo hena numekuku kple na dɔwɔla siwo le ʋuʋum tso zcashd gbɔ.

Zcashd ɖea API ƒe hatsotso aɖe ɖe go to eƒe RPC ŋgɔdonya dzi. API siawo naa dɔwɔwɔ siwo ɖea mɔ na gotagome dɔwɔɖoɖowo be woawɔ nu kple node la.

[Kekeli ƒe gakotoku](https://github.com/zcash/lightwalletd) nye dɔwɔnu si zãa node blibo aɖe tsɔ naa dɔwɔlawo te ŋu tua gakotoku siwo me kekeli le siwo ŋu wokpɔa akpoxɔnu le siwo sɔ na asitelefon xɔlɔ̃wɔwɔtɔe eye mahiã be woawɔ nu kple Zcashd tẽ o ƒe kpɔɖeŋu.

[RPC sedede siwo wodo alɔe ƒe xexlẽdzesi bliboa](https://zcash.github.io/rpc/)

[Zcashd ƒe agbalẽa](https://zcash.github.io/zcash/)


### Dze Node (Linux) aɖe gɔme .

- De Dependencies (Nu Siwo Dzi Wonɔ te ɖo) la ɖe wò kɔmpiuta dzi 

      sudo apt ƒe yeyewɔwɔ

      sudo apt-xɔ ɖoɖo \ .
      xɔ-vevietɔ pkg-ɖoɖo libc6-dev m4 g++-multilib \ .
      autoconf libtool nfiƒodewo-dev ɖe zip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils nuwo wɔwɔ le wo ɖokui si libtinfo5

- Clone yeyetɔ si woɖe ɖe go, checkout, ɖoɖo kple xɔtutu:

      git ƒe nɔnɔmetata https://github.com/zcash/zcash.git

      cd zcash/ 1999 me.

      git ƒe ʋuʋu v5.4.1
      ./zcutil/xɔ-params.sh
      ./zcutil/kɔ.sh
      . / zcutil / xɔ.sh -j $ (nproc) .

- Sync Blockchain (ate ŋu axɔ gaƒoƒo geɖe) .

    Be nàdze node run la gɔme:

      ./src/zcashd ƒe agbalẽ

- Wodzraa Private Keys ɖo ɖe ~/.zcash/wallet.dat me

[Mɔfiame na Zcashd le Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra nye Zcash ɖoɖowɔɖi ƒe node blibo si le eɖokui si, si le klalo na ewɔwɔ, si Zcash Foundation wɔ eye woŋlɔe ɖe Rust me. Esi zcashd xɔ dzudzɔ le dɔme ta la, Zebra (`zebrad`) nye node blibo si wokafu na dɔwɔwɔ yeyewo.

Zebra ɖoa kpe mɔxenuwo kple asitsatsa dzi, kpɔa gome le hatiwo ƒe kadodo me, eye wòɖea RPC ƒe ŋgɔdonya ɖe go na dɔwɔɖoɖowo. Gakotokua nye akpa aɖe si to vovo fifia: [Zallet](https://github.com/zcash/zallet) ƒua du ɖe Zebra node ŋu eye wòkpɔa safuiwo kple dadasɔwo gbɔ. Esia xɔ ɖe zcashd teƒe, si ƒo node kple gakotoku nu ƒu ɖe dɔwɔwɔ ɖeka me.

Be woasubɔ kekeli gakotoku siwo ŋu wokpɔ ta na la, node la zɔna ɖe indexer aɖe xa, si nye [lightwalletd si woɖo anyi](https://github.com/zcash/lightwalletd) alo yeyetɔ kekeake [Zaino](https://zechub.wiki/zaino).

Kpɔ egbɔ be yexlẽ Zebra ƒe agbalẽa hena ɖoɖowɔwɔ ŋuti mɔfiamewo, eye nàwɔ ɖeka kple R&D Discord server hena kpekpeɖeŋu. 

[Github ƒe ŋkɔ](https://github.com/ZcashFoundation/zebra/)

[Zebra ƒe Agbalẽa](https://zebra.zfnd.org) 

[Masɔmasɔ](https://discord.gg/uvEdHsrb)



## Netwɔƒea

To node blibo ƒe duƒuƒu me la, èle kpekpem ɖe zcash network ŋu be wòado ŋusẽ to eƒe decentralization ƒe kpekpeɖeŋu nana me. 

Esia kpena ɖe ame ŋu be woaxe mɔ ɖe tsitretsiɖeŋulawo ƒe dziɖuɖu nu eye wònana network la nɔa te ɖe tɔtɔ ƒomevi aɖewo nu.

DNS seeders ɖea node bubu siwo ŋu kakaɖedzi le ƒe xexlẽdzesi ɖe go to server si wotu ɖe eme dzi. Esia wɔnɛ be asitsatsa te ŋu kakana le network bliboa me. 

### Network ƒe Akɔntabubuwo

Esiawo nye kpɔɖeŋu mɔ̃ siwo ɖea mɔ be woakpɔ Zcash Network ƒe nyatakakawo:

[Zcash Block ƒe Ʋuʋudedi](https://zcashblockexplorer.com)

[Coinmetrics ƒe xexlẽdzesiwo](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair ƒe zikpui](https://blockchair.com/zcash)

Àte ŋu akpe asi ɖe network la ƒe ŋgɔyiyi hã ŋu to dodokpɔwo wɔwɔ alo ŋgɔyiyi yeyewo dodo ɖe ŋgɔ & metrics nana me. 



### Tomenukuƒewo

Tomenukulawo hiã node blibowo be woakpɔ rpc siwo katã do ƒome kple tomenukulawo abe getblocktemplate & getmininginfo ene. 

Zcashd hã naa tomenukuƒewo te ŋu yia gakudzraɖoƒe si wokpɔ ta na. Tiatia le tomenukulawo kple tomenukuƒewo si be woaku tome tẽ be woaƒo ZEC si wokpɔ ta na nu ƒu ɖe z-adrɛs me le gɔmedzedzea me. 

Xlẽ [Tomenukulawo ƒe Mɔfiame](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) alo Wɔ ɖeka kple Nutoa me Nyamedzroƒe ƒe axa na [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13).

### Adzame 

Node blibo ƒe dɔwɔwɔ na be nàte ŋu aɖo kpe asitsatsa kple mɔxenuwo katã dzi le ɖokuiwò si le Zcash network la dzi.

Node blibo zazã ƒoa asa na ameŋunyatakakawo ŋuti afɔku aɖewo siwo dona tso ame bubuwo ƒe dɔwɔnawo zazã atsɔ aɖo kpe asitsatsa dzi ɖe tawò me.

Wò ŋutɔ wò node zazã hã ɖea mɔ be nàdo ka kple network la to [Tor](https://zcash.github.io/zcash/user/tor.html).
Viɖe bubu aɖe le esia ŋu be wòana zãla bubuwo nado ka kple wò node .onion adrɛs le adzame.


**Èhiã Kpekpeɖeŋua?**

Xlẽ [Kpekpeɖeŋunagbalẽwo](https://zcash.readthedocs.io/en/latest/)

Wɔ ɖeka kple míaƒe [Masɔmasɔ Sever](https://discord.gg/zcash) alo nàdo asi ɖe mía gbɔ le [twitter](https://twitter.com/ZecHub)




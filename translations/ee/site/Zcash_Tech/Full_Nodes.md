<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ɣaɣla dzesi ŋɔŋlɔ blibowo [Full Nodes]

## Nu veviwo le eme

- Ɣaɣla dzesi ŋɔŋlɔ blibo dea Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] blibo ƒe kopi ɖe asi eye wòkpɔ gaɖoɖowo ƒuƒoƒe yeyewo kple gaɖoɖo yeyewo katã tsɔe sɔ kple gbegbɔgblɔ ɖi [consensus] ƒe sewo.
- Zebra (`zebrad`) nye ɣaɣla dzesi ŋɔŋlɔ si wòle be nàɖo egbe. Zakura nye dɔwɔwɔ bubu si wotso tso Zebra me.
- zcashd ƒe dɔwɔwɔ va yi. Eƒe End-of-Support ƒe tɔtɔ va do gbe 18 July 2026 le gaɖoɖowo ƒuƒoƒe ƒe teƒe 3417100, eye ɣaɣla dzesi ŋɔŋlɔ mawo megatrɔa dɔ o.
- Ɣaɣla dzesi ŋɔŋlɔ kple gakotoku [wallet] nye mɔɖeɖe vovovo azɔ. [Zallet](https://github.com/zcash/zallet) wɔa dɔ kple ɣaɣla dzesi ŋɔŋlɔ eye wòle kɔkɔewo.
- Wò ŋutɔ ƒe ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔwɔ naa na wò nàkɔ nu ŋutɔ, eye wòna wòmehia be nàkɔ ame bubu ƒe server dzi o.

## Gɔmeɖeɖe Vevi

Ɣaɣla dzesi ŋɔŋlɔ blibo nye software si wɔa cryptocurrency ƒe gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu blibo, eye wònaa mɔ na wò be nàdzɔ protocol la ƒe nɔnɔmeawo.

Ewɔa gaɖoɖo siawo katã ƒe ŋutinya blibo tso genesis me, eyata ewɔa nu be wòate ŋu akpɔ gaɖoɖo yeyeawo kple gaɖoɖowo ƒuƒoƒe yeyeawo siwo wotsɔ kpe gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu la ŋu la ƒe nyateƒenye.

## Ɣaɣla dzesi ŋɔŋlɔ ƒe Dɔwɔwɔwo

### Zebra

Zebra nye ɣaɣla dzesi ŋɔŋlɔ blibo si tsɔ ŋutɔ ɖo eɖokui ɖe Zcash protocol la ŋu, si wɔ ƒe dɔ le production me, si Zcash Foundation wɔ eye wòŋlɔe kple Rust. Esi zcashd ƒe dɔwɔwɔ va yi ta la, Zebra (`zebrad`) nye ɣaɣla dzesi ŋɔŋlɔ blibo si woda aɖaŋu na ɖoɖowɔwɔ yeyeawo.

Zebra kpɔa gaɖoɖowo ƒuƒoƒewo kple gaɖoɖowo ŋu, wòxɔa gbɔ kple peer-to-peer network la, eye wòtsɔa RPC ƒe mɔɖoɖo na applicationwo. Gakotoku la nye nuƒoƒo vovovo azɔ: [Zallet](https://github.com/zcash/zallet) wɔa dɔ kple Zebra ɣaɣla dzesi ŋɔŋlɔ eye wòkpɔa kɔkɔewo kple balancewo ŋu. Esia wɔ ɖe zcashd teƒe, si ƒoa ɣaɣla dzesi ŋɔŋlɔ kple gakotoku la ƒu le process ɖeka me.

Be wòana ɣaɣla light gakotokuwɔlaawo dɔ la, ɣaɣla dzesi ŋɔŋlɔ la wɔa dɔ kple indexer, eye wòate ŋu anye [lightwalletd](https://github.com/zcash/lightwalletd) si xɔ se xoxo loo alo [Zaino](https://zechub.wiki/zcash-tech/zaino) yeye la.

Kpɔ be nàxlẽ Zebra agbalẽ la ne nànya ale si woɖoa eƒe dɔwɔwɔ ɖo, eye nàɖo R&D Discord server la me be nàxɔ kpekpeɖeŋu.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Zebra ƒe Agbalẽ](https://zebra.zfnd.org)

Kpɔ [Zebra Ɣaɣla dzesi ŋɔŋlɔ blibo](/zcash-tech/zebra-full-node) ne nànya ale si wòate ŋu aɖoe, awɔ eƒe configuration, kple hardware siwo wòhiã.

### Zakura

Zakura nye ɣaɣla dzesi ŋɔŋlɔ blibo evelia si sɔ kple consensus, si wotso tso Zebra me eye Valar Group kple Project Tachyon wɔe. Ewɔa dɔ kple protocol ƒe se mawo ke eye wòtsɔa synchronization kabakaba, gaɖoɖowo ƒuƒoƒe ƒe pruning, kple zcashd RPC compatibility layer kpee. Kpɔ [Zakura Ɣaɣla dzesi ŋɔŋlɔ](/zcash-tech/zakura-node).

### zcashd (ƒe dɔwɔwɔ va yi)

> **Nuxlɔ̃ame:** zcashd ƒe dɔwɔwɔ va yi. Electric Coin Company [ɖe eƒe deprecation gɔme](https://z.cash/support/zcashd-deprecation/), eye End-of-Support ƒe tɔtɔ si wɔa eɖokui la va do gbe 18 July 2026 le gaɖoɖowo ƒuƒoƒe ƒe teƒe 3417100. zcashd 6.20.0 ɣaɣla dzesi ŋɔŋlɔ siawo katã siwo wometrɔ o tɔ le teƒe ma eye wogbe be woagatrɔ dɔ o, eye software la mekpea NU6.3 o. Zã Zebra. Ne zcashd `wallet.dat` le asiwò la, wɔ ɖe [Migration Guide: zcashd yi zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet) la te.

zcashd nye Ɣaɣla dzesi ŋɔŋlɔ blibo ƒe dɔwɔwɔ gbãtɔ na Zcash, si Electric Coin Company wɔ eye wòle eƒe dɔ kpɔm. Wole build ƒe mɔfiame siwo le ete la ɖom ɖe asi be woatsɔ awɔ nuɖoɖo, kple na dɔwɔla siwo le adzo tso zcashd gbɔ.

zcashd tsɔa APIwo ƒe xexlẽ ɖe go toɖe via eƒe RPC interface. APIwo siawo naa dɔwɔwɔ siwo na applicationwo siwo tso afisia nɔa ɖe go la ate ŋu awɔ dɔ kple ɣaɣla dzesi ŋɔŋlɔ la.

[lightwalletd](https://github.com/zcash/lightwalletd) nye application ƒe kpɔɖeŋu si zãa ɣaɣla dzesi ŋɔŋlɔ blibo be wòna mɔ̃ ƒe ɖoɖoŋlɔlawo nate ŋu atu eye woakpɔ mobile-friendly ɣaɣla light gakotokuwo ŋu, evɔ womahiã be woawɔ dɔ kple zcashd tẽ o.

[RPC commands siwo katã wokpea ƒe xexlẽ blibo](https://zcash.github.io/rpc/)

[zcashd ƒe agbalẽ](https://zcash.github.io/zcash/)

#### Dze Ɣaɣla dzesi ŋɔŋlɔ ƒe Dɔwɔwɔ gɔme (Linux)

- Ɖo Dependencies

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Tsɔ release yeyetɔ la kopi, wɔ checkout, ɖo dɔwɔwɔ ɖo eye nàtu:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sɔ kple Blockchain la (eɖe be wòaxɔ gaƒoƒo aɖewo)

    Ne wòdi be nàdze ɣaɣla dzesi ŋɔŋlɔ la ƒe dɔwɔwɔ gɔme la, wɔ:

      ./src/zcashd

- Wole Private Keys ɖom le ~/.zcash/wallet.dat

[Mɔfiame na zcashd le Raspberry Pi dzi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Nu Siwo Wòakpɔ Ɖe Wò Agbe Dzi

### Network La

Ne nàwɔ ɣaɣla dzesi ŋɔŋlɔ blibo ƒe dɔ la, èle kpekpeɖeŋu nam be zcash network la nasẽ kple eƒe ha nuɖo agni [decentralized] nɔnɔme ƒe kpekpeɖeŋu.

Esia kpea ɖe ŋutilã ƒe nuɖoɖo ƒe seɖeɖe ŋu eye wòna network la nɔa anyi sesĩe ɖe nu tsɔtsɔ ƒe mɔ aɖewo ŋu.

DNS seeders ɖea ɣaɣla dzesi ŋɔŋlɔ siwo wɔnɛ nyuie bubuwo ƒe xexlẽ fia to server si le eme xoxo. Esia naa gaɖoɖowo ŋutɔ trɔ yi network la katã me.

### Network Ƒe Statistikwo

Esiawo nye platform ƒe kpɔɖeŋuwo siwo naa mɔ na Zcash Network ƒe data:

[Zcash Gaɖoɖowo ƒuƒoƒe ƒe Kpɔla](https://mainnet.zcashexplorer.app)

[Coin Metrics](https://docs.coinmetrics.io/info/assets/zec)

Àte ŋu akpe ɖe network la ƒe ŋgɔyiyi ŋu hã to testwo ƒe dɔwɔwɔ alo nyonyo yeyeawo ƒe ɖeɖegbe kple metrics ƒe nana me.

### Nukuku

Nukulaawo [miners] hiã ɣaɣla dzesi ŋɔŋlɔ blibowo be woate ŋu adzɔ nukuku [mining] ƒe RPCwo katã, abe getblocktemplate kple getmininginfo ene.

zcashd hã naa mɔ be woawɔ nukuku yi ɣaɣla coinbase me. Nukulaawo kple nukuku ƒe gaƒuƒoƒowo ate ŋu awɔ nukuku tẽ be woaƒo ɣaɣla ZEC ƒu le z-address me le wɔnɛ xoxo nu.

Xlẽ [Nukuku ƒe Mɔfiame](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) alo nàɖo Community Forum ƒe axa na [Zcash Nukulaawo](https://forum.zcashcommunity.com/c/mining/13) me.

### Ɣaɣla

Ɣaɣla dzesi ŋɔŋlɔ blibo ƒe dɔwɔwɔ naa mɔ na wò be nàkɔ gaɖoɖowo kple gaɖoɖowo ƒuƒoƒewo katã le Zcash network la dzi to wò ŋutɔ ƒe mɔ nu.

Ɣaɣla dzesi ŋɔŋlɔ blibo ƒe dɔwɔwɔ ƒe mɔ me wòavo ɣaɣla [privacy] ƒe afɔku aɖewo siwo va na ne èzãa ame evelia ƒe subɔsubɔ be woakɔ gaɖoɖowo ɖe teƒewò.

Wò ŋutɔ ƒe ɣaɣla dzesi ŋɔŋlɔ ƒe zazã hã na wò mɔ be nàto [Tor](https://zcash.github.io/zcash/user/tor.html) atsɔ akplɔ ɖe network la ŋu.
Esia hã naa mɔ be zazãla bubuwo nakplɔ ɖe wò ɣaɣla dzesi ŋɔŋlɔ ƒe .onion gaɖoƒe ƒe dzesi [address] ŋu le ɣaɣla me.

## Vodadawo Siwo Wɔa Tete

- Wotu zcashd tso mɔfiame siwo le etame eye wole ɣaɣla dzesi ŋɔŋlɔ si wɔa dɔ la mɔm. Binary mawo atɔ le deprecation ƒe teƒe.
- Wòwɔ ɣaɣla dzesi ŋɔŋlɔ ƒe dɔ eye wòbu be wò mobile gakotoku zãa eya azɔ. Light gakotoku la aganɔ server si woɖoe ɖe eŋu la me va se ɖe esime nàfia wò ŋutɔ tɔ nɛ. Kpɔ [Lightwallet Nodes](/zcash-tech/lightwallet-nodes).
- Wòwɔ `zebrad` ko eye wòle light gakotokuwo ƒe kplɔɖeɖe mɔm. Ɣaɣla dzesi ŋɔŋlɔ la hiã indexer le eƒe gbɔ, eye wòate ŋu anye lightwalletd alo [Zaino](/zcash-tech/zaino).
- Wòle gakotoku ƒe RPCwo dim le ɣaɣla dzesi ŋɔŋlɔ la dzi. Wotsɔ kɔkɔewo kple balancewo yi Zallet.

## Axawo Siwo Kplɔe Ɖo

- [Zebra Ɣaɣla dzesi ŋɔŋlɔ blibo](/zcash-tech/zebra-full-node) - ɖo, wɔ configuration, eye nàwɔ ɣaɣla dzesi ŋɔŋlɔ si woda aɖaŋu la ƒe dɔ
- [Zakura Ɣaɣla dzesi ŋɔŋlɔ](/zcash-tech/zakura-node) - ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔwɔ evelia, si wotso tso Zebra me
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - serverwo siwo light gakotokuwo bia nu tso
- [Zaino](/zcash-tech/zaino) - Rust indexer si subɔa light gakotokuwo
- [Zcash Gakotoku ƒe Syncing](/zcash-tech/zcash-wallet-syncing) - nu si ta syncing wɔa dɔ ale

## Nusɔsrɔ̃ Kpeɖeŋu

Xlẽ [Kpekpeɖeŋu ƒe Dokumentewo](https://zcash.readthedocs.io/en/latest/)

Ɖo míatɔ [Discord Server](https://discord.gg/zcash) me alo nàɖo nu mí le [X](https://X.com/ZecHub) dzi

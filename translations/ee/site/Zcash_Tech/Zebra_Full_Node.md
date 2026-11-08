<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aɖe Axawɔ"/>
</a>

# Zebra Ɣaɣla dzesi ŋɔŋlɔ blibo [Full Node]

## Nu Vevi Kpuie

- Zebra (`zebrad`) nye Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ blibo si woŋlɔ le Rust me, eye Zcash Foundation kpɔa e ŋu.
- Ena dzesi gaɖoɖowo ƒe gaɖoɖowo ƒuƒoƒewo kple gaɖoɖowo, lée ɖoɖonu ƒe nɔnɔme me, eye wòdo go kple ɣaɣla dzesi ŋɔŋlɔ bubuwo to peer-to-peer network la dzi.
- Zebra kple zcashd wɔ protocol ma ke eye woate ŋu adɔ ɖe ewo nɔewo ŋu. Tso zcashd ƒe dzidzimegagbe me la, Zebra tsɔ gbegbɔgblɔ ɖi [consensus] ƒe dɔa yi.
- Mɔ eve si wòate ŋu atsɔ awɔe: `zfnd/zebra` Docker image, alo asrɔ̃ tso source me.
- Hardware si woɖo to nye CPU cores 4, RAM GB 16, kple disk GB 300. Esi le egɔme keke nye cores 2 kple RAM GB 4, eye disk GB 300 ma ke.

## Nudzidzɔ Gɔmeɖeɖe

Zebra nye Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ gbãtɔ si woŋlɔ blibo le Rust me. Enɔ le Zcash peer-to-peer network la dzi, afi si wòna dzesi eye wòɖe gaɖoɖowo ɖe go, eye wòléa blockchain [gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu] ƒe nɔnɔme me. Dɔwɔwɔ si le ɖokuibɔbɔ me bubu ta la, network ƒe nuɖoɖo medze ɖe codebase ɖeka ko ŋu o.

### Zebra kple zcashd

Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ gbãtɔ, zcashd, Electric Coin Company ye wɔe tso Bitcoin ƒe codebase me. Woŋlɔ Zebra tso gɔmedzeƒe me le Rust me, si nye gbe si dea ŋku memory ƒe dedie ŋu, eye woɖe asi le dzadzra kple dɔwɔwɔ nyuie ŋu.

Dɔwɔwɔ eveawo katã zãa protocol ma ke, eyata woate ŋu ado go kple nɔewo eye woawɔ dɔ ɖekae. zcashd va ɖo eƒe End-of-Support ƒe tɔtɔ 18 July 2026, eye megadzɔna o, si na Zebra kple Zakura koe nye ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔwɔwo siwo le dɔ wɔm fifia. Kpɔ [Ɣaɣla dzesi ŋɔŋlɔwo blibo](/zcash-tech/full-nodes) be nàkpɔ nɔnɔme bliboa.

## Zebra Ƒe Dɔwɔwɔ

Àte ŋu awɔ Zebra kple Docker image, alo nàtu e ɖokuiwò. Taflatse kpɔ System Requirements ƒe akpa.

### Docker Ƒe Zazã

Be nàwɔ release yeyetɔ eye nàsync e ɖo tip la, wɔ sedede sia:

```

docker run zfnd/zebra:latest

```

Na fiafia bliboa, yi [Docker ƒe agbalẽdzɔɖoɖo](https://zebra.zfnd.org/user/docker.html) gbɔ.

### Zebra Ƒe Tututu

Zebra ƒe tututu hia Rust, libclang, kple C++ compiler.

- Kpɔ be Rust ƒe stable version yeyetɔ le asiwò, elabena Zebra koe woɖoa teƒe kple e.
- Build dependencies siwo hia la dome nye:
  - libclang (woayɔe hã be libclang-dev alo llvm-dev)
  - clang alo C++ compiler bubu (abe g++ na platforms katã alo Xcode na macOS ene)
  - protoc (Protocol Buffers compiler) kple *--experimental_allow_proto3_optional* flag, si woɖe egɔme le Protocol Buffers v3.12.0 me (woɖe e go le May 16, 2020).

### Ɖo Eye Dze Egɔme

Le x86_64 alo aarch64 Linux kple glibc 2.34 alo esi wu enu dzi (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023) la, àte ŋu adzo build dependencies la me eye nàɖo binary si woɖo asidede agbalẽ te [signature]:

```
cargo binstall zebrad
```

Woatsɔ binaries ma ke de GitHub ƒe release sia sia ŋu abe `zebrad-<version>-<target>.tar.gz` ene, eye SHA-256 checksum, Sigstore build-provenance attestation, kple Cosign signature le woƒe sia sia ŋu. Le platforms xoxowo dzi la, zã Docker image alo tu tso source me.

Be nàtu tso source me la, xɔ code la eye nàtu release binary:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Dze ɣaɣla dzesi ŋɔŋlɔ la gɔme kple:

```
target/release/zebrad start
```

Ɖoɖoɖe ƒe mɔfiame: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Ɖoɖoɖewo Kple Features Siwo Menye Dzi Vevi O

### ƉoɖoƑe ƒe Agbalẽ Ƒe Gɔmedzedze

  - Wɔ configuration file kple sedede sia:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Woatsɔ *zebrad.toml* si wo wɔ la ade Linux ƒe preferences directory si woɖo le gɔmedzeƒe. Na OS ƒe teƒe bubuwo, kpɔ agbalẽdzɔɖoɖoa.

### Progress Bars Ƒe Ɖoɖoɖe

  - Ɖo *tracing.progress_bar* ɖe wò *zebrad.toml* me be nàfia metrics veviwo le terminal me kple progress bars. Dzesi: Nya si woanya lee nye be progress bar ƒe estimate ate ŋu akpɔ gɔme akpe.

### Nukuku Ƒe Ɖoɖoɖe

  - Àte ŋu aɖo Zebra na nukuku [mining] kple *MINER_ADDRESS* kple port mapping le Docker me. Nya geɖe le [Nukuku ƒe support agbalẽdzɔɖoɖo](https://zebra.zfnd.org/user/mining-docker.html) me.

### Build Features Le Wò Ɖokui Ƒe Nuwo Nu

  - Ɖe Zebra ƒe dɔwɔwɔ keke kple Cargo features bubuwo abe Prometheus metrics, Sentry monitoring, experimental Elasticsearch support, kple bubuwo ene.

  - Ƒo features geɖe nu kple woƒe xexlẽ ɖe `--features` flag ƒe parameters me le installation me.

  - Woɖe debugging kple monitoring features aɖewo le release builds me be woanɔ dɔ wɔm nyuie. Na experimental kple mɔ̃ ƒe ɖoɖoŋlɔla [developer] features ƒe xexlẽ bliboa, kpɔ [API ƒe agbalẽdzɔɖoɖo](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## System Ƒe Hiahiawo Kple Network Ƒe Ɖoɖoɖe

### Hiahiawo Si Woɖo To

- CPU: CPU cores 4
- RAM: GB 16
- Disk ƒe Teƒe: Disk ƒe teƒe GB 300 si le blibom na binaries ƒe tututu kple chain ƒe nɔnɔme si woɖo le cache me ƒe dzraɖo
- Network: Network ƒe kadodo Mbps 100 kple uploads kple downloads GB 300 le ƒe sia ƒe me abe esi le egɔme

### Hiahiawo Si Le Egɔme

- CPU: CPU cores 2
- RAM: GB 4
- Disk ƒe Teƒe: Disk ƒe teƒe GB 300 si le blibom

Zebra ƒe test suite ate ŋu axɔ gaƒoƒo ɖeka wu be wòawɔ nu blibo, le wò machine ƒe nuɖoɖo nu. Systems siwo menɔa avɔ o ate ŋu atu eye woawɔ Zebra. Wo mede performance ƒe teƒe siwo tututu me haɖo o.

### Disk Ƒe Hiahiawo

- Zebra zãa GB 300 kloe na Mainnet data si le cache me, eye GB 10 na Testnet data si le cache me. Bu be disk ƒe zazã adzi ɖe yi.
- Woakɔ database la ɣeaɣi, eye woakɔe hã ne wodzi o alo woagbugbɔ adze egɔme. Woɖoa tɔtrɔwo te kple database gaɖoɖowo. Tɔtrɔwo siwo menyo o le forced termination alo panic ta la agbugbɔ ava megbe si Zebra dze egɔme.

### Network Ƒe Hiahiawo Kple Ports

- Zebra zãa TCP ports siawo na kadodo siwo ge ɖe eme kple siwo ado go:
  - 8233 na Mainnet
  - 18233 na Testnet
- Ne wòɖo Zebra kple listen_addr aɖe la, wòɖe gaɖoƒe ma ƒe dzesi [address] ɖe go na kadodo siwo ge ɖe eme. Kadodo siwo ado go hia na synchronization; kadodo siwo ge ɖe eme menye dzɔdzɔ be woahi o.
- Mɔxɔxɔ ɖe Zcash DNS seeders hia to OS DNS resolver dzi (zi geɖe la, port 53).
- Zebra ate ŋu ado go ɖe ports ɖe sia ɖe dzi. zcashd lɔ̃ peers siwo le default ports dzi be woazãe na DDoS attacks ɖe networks bubuwo dzi o.

### Mainnet Network Ƒe Zazã Si Dzɔna Zi Geɖe

- Sync Gbãtɔ: Download GB 300 hia na synchronization gbãtɔ, eye woele mɔ kpɔm be xexlẽ sia nadzi ɖe yi.
- Updates Siwo Yina Edzi: Uploads kple downloads le ƒe sia ƒe me tso MB 10 va GB 10, le user ƒe gaɖoɖo ƒe lolome kple peer ƒe biabiawo nu.
- Zebra dzea initial sync gɔme le internal database version ƒe tɔtrɔ sia sia me, si ate ŋu ana chain ƒe download bliboa le version upgrades me.
- Woalɔ̃ peers siwo ƒe round-trip latency menɔ sekondi 2 wu o. Ne latency la wu dzidzime sia la, ɖe ticket le Zebra repository me.

## Vodadawo Si Dzɔna Zi Geɖe

- Disk ƒe lolome le egbe ƒe hiahiã ko nu. Mainnet ƒe nɔnɔme si le cache me va ɖo GB 300 gbɔ eye wòle dzi dem yi.
- Mègabu be gakotoku [wallet] RPCs ava tso `zebrad` gbɔ o. Keys kple balances le [Zallet](https://github.com/zcash/zallet) me, si nye program bubu.
- Mègawɔ `zebrad` ɖeka ko eye nàbu be light wallets ato e ŋu aɖo e ŋu o. Mɔ ma hia indexer, lightwalletd alo [Zaino](/zcash-tech/zaino).
- Mègatsɔ resync si mebu na wò abe vodada ene o. Database version ƒe tɔtrɔ dea eme le eƒe ɖoɖo nu.

## Axawo Si Do Ŋu

- [Ɣaɣla dzesi ŋɔŋlɔwo blibo](/zcash-tech/full-nodes) - nu si ɣaɣla dzesi ŋɔŋlɔ blibo wɔna kple dɔwɔwɔ siwo le eme
- [Zakura Ɣaɣla dzesi ŋɔŋlɔ](/zcash-tech/zakura-node) - ɣaɣla dzesi ŋɔŋlɔ si woɖe tso Zebra me kple sync si le avɔ wu kple pruning
- [Zaino](/zcash-tech/zaino) - Rust ƒe indexer si subɔa light wallets
- [Lightwallet ƒe Ɣaɣla dzesi ŋɔŋlɔwo](/zcash-tech/lightwallet-nodes) - servers siwo light wallets biaa nu tso
- [Zcash Nukuku Ƒe Mɔfiame](/using-zcash/zcash-mining-guide) - nukuku kple wò ɣaɣla dzesi ŋɔŋlɔ ŋutɔ

## Nusɔsrɔ̃ Bubu

- [Zebra ƒe Agbalẽ](https://zebra.zfnd.org)
- [Zebra le GitHub](https://github.com/ZcashFoundation/zebra/) dzi
- [System Ƒe Hiahiawo](https://zebra.zfnd.org/user/requirements.html)

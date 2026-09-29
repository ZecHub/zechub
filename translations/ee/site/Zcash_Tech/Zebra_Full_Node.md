<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Node Bliboe

## TL;DR

- Zebra (`zebrad`) nye Zcash full node si woŋlɔ ɖe Rust me eye Zcash Foundation.
- Eɖoa kpe mɔxenuwo kple asitsatsa dzi, eléa kɔsɔkɔsɔ ƒe nɔnɔme me ɖe asi, eye wòƒoa nu kple node bubuwo to hatiwo ƒe kadodoa dzi.
- Zebra kple zcashd wɔ ɖoɖo ɖeka eye woateŋu awɔ dɔ aduadu. Tso esime zcashd xɔ dzudzɔ le dɔme la, Zebra tsɔa akpa si dzi woda asi ɖo.
- Mɔ eve siwo dzi woato aƒu du: le `zfnd/zebra` Docker nɔnɔmetata, alo xɔtutu tso dzɔtsoƒe.
- Hardware si wokafu enye CPU cores 4, RAM 16 GB, kple disk 300 GB. Nu suetɔ kekeakee nye 2 cores kple 4 GB RAM, kple disk 300 GB ma ke.

## Numeɖeɖe Vevitɔ

Zebra nye Zcash node gbãtɔ si woŋlɔ bliboe le Rust me. Enɔa Zcash peer-to-peer network dzi, afisi wòda asi ɖe asitsatsa dzi heɖea gbeƒãe le eye wòléa blockchain ƒe nɔnɔmea me ɖe asi. Ne wowɔe le eɖokui si evelia la, egblẽa network ƒe xɔtuɖoɖoa meganɔa te ɖe codebase ɖeka aɖeke dzi boo o.

### Zebra kple zcashd

Zcash node gbãtɔ, zcashd, nye esi Electric Coin Company wɔ tso Bitcoin ƒe codebase me. Woŋlɔ Zebra tso gɔmedzedzea me ke le Rust, si nye gbegbɔgblɔ si me ŋkuɖoɖonudzi mele o me, eye woƒe susu nɔa dedienɔnɔ kple dɔwɔwɔ nyuie ŋu.

Dɔwɔwɔ eveawo siaa zɔna ɖe ɖoɖo ɖeka dzi, ale be woate ŋu aɖo dze ahawɔ dɔ aduadu. zcashd ɖo eƒe End-of-Support ƒe tɔtrɔ gbɔ le 18 July 2026 dzi eye megadzea egɔme o, si gblẽ Zebra kple Zakura ɖi abe node ƒe dɔwɔwɔ siwo wozãna ene. Kpɔ [Nodes Blibowo](/zcash-tech/full-nodes) na nɔnɔmetata si keke ta wu.

## Zebra si le du dzi

Àteŋu awɔ Zebra to Docker nɔnɔmetata zazã me, alo àteŋu atue kple asi. Taflatse kpɔ akpa si nye System Requirements.

### Docker Zazã

Be nàwɔ dɔ yeyetɔ si woɖe ɖe go eye nàwɔe wòasɔ ɖe aɖaŋuɖoɖoa nu la, wɔ sedede si gbɔna:

```

docker run zfnd/zebra:latest

```

Ne èdi mɔfiame bliboa la, kpɔ.. [Docker ƒe nuŋlɔɖiwo](https://zebra.zfnd.org/user/docker.html).

### Zebra tutu

Zebra tutu hiã Rust, libclang, kple C++ nuƒoƒoƒula.

- Kpɔ egbɔ be yeda Rust ƒe tɔtrɔ yeyetɔ si li ke ɖe wò kɔmpiuta dzi, elabena eya koe wodoa Zebra kpɔna.
- Xɔtuɖoɖo siwo hiã siwo dzi woanɔ te ɖo dometɔ aɖewoe nye:
  - libclang (si woyɔna hã be libclang-dev alo llvm-dev)
  - clang alo C++ nuƒoƒoƒula bubu (abe g++ na mɔ̃wo katã alo Xcode na macOS ene)
  - protoc (Protocol Buffers nuƒoƒoƒula) kple *--experimental_allow_proto3_optional* aflaga, si woto vɛ le Protocol Buffers v3.12.0 (si woɖe ɖe go le May 16, 2020 dzi).

### Dee eye nàdze egɔme

Le x86_64 alo aarch64 Linux si me glibc 2.34 alo yeyetɔ le (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), àteŋu adzo le xɔtutu ƒe nusiwo dzi woanɔ te ɖo dzi eye nàde binary si wode asi do ŋgɔ si wotu:

```
cargo binstall zebrad
```

Wotsɔ binary mawo ke kpe ɖe GitHub tata ɖesiaɖe ŋu abe `zebrad-<version>-<target>.tar.gz`, ɖesiaɖe kple SHA-256 ƒe ɖaseɖigbalẽ, Sigstore ƒe xɔtutu-tsoƒe ƒe ɖaseɖiɖi kple Cosign ƒe asidede agbalẽ te. Le mɔ̃ xoxowo dzi la, zã Docker ƒe nɔnɔmetata alo tu tso dzɔtsoƒe.

Be nàtu tso dzɔtsoƒe la, xɔ kɔda la eye nàtu asiɖeɖe le eŋu binary:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Dze node la gɔme kple:

```
target/release/zebrad start
```

Mɔfiame si ku ɖe eɖoɖo ŋu: [zebra.zfnd.org/zãla/ɖoɖo.html](https://zebra.zfnd.org/user/install.html)

## Tiatiawɔblɔɖe ƒe Ðoɖowo & Nɔnɔmewo

### Ðoɖowɔɖi ƒe Faɛl Gɔmedzedze

  - Wɔ ɖoɖowɔɖi ƒe faɛl to sedede sia zazã me:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Woatsɔ *zebrad.toml* si wowɔ la ade Linux ƒe tiatiawɔblɔɖe ƒe nuŋlɔɖi gbãtɔ me. Ne èdi OS ƒe teƒe bubu siwo woɖo ɖi la, kpɔ nuŋlɔɖiawo.

### Ŋgɔyiyi ƒe Dzesiwo ƒe Ðoɖowɔwɔ

  - Trɔ asi le *tracing.progress_bar* le wò *zebrad.toml* me be wòaɖe key metrics afia le terminal la me to progress bars zazã me. De dzesii: Nya aɖe si wonya li si me ŋgɔyiyi ƒe akɔntabubuwo ate ŋu alolo akpa.

### Tomenukuƒewo ƒe Ðoɖowɔwɔ

  - Woateŋu aɖo Zebra na tomenukuƒe to *MINER_ADDRESS* kple melidzeƒe ƒe nɔnɔmetata ɖoɖo ɖe Docker me. Àte ŋu akpɔ nyatakaka bubuwo le.. [Tomenukuƒewo ƒe kpekpeɖeŋu ŋuti nuŋlɔɖiwo](https://zebra.zfnd.org/user/mining-docker.html).

### Tu ƒe Nɔnɔme Siwo Trɔna Ðe Edzi

  - Keke Zebra's dɔwɔwɔ ɖe enu kple Cargo ƒe nɔnɔme bubuwo abe Prometheus metrics, Sentry ŋkuléle ɖe eŋu, dodokpɔ Elasticsearch ƒe kpekpeɖeŋu, kple bubuwo.

  - Tsɔ nɔnɔme geɖewo ƒo ƒu to wo ŋɔŋlɔ ɖi abe parameters of the `--features` aflaga le eɖoɖo me.

  - Wotsia debugging kple monitoring feature aɖewo nu le release builds me be woawɔ dɔ nyuie wu. Ne èdi dodokpɔ kple developer ƒe nɔnɔmewo ƒe xexlẽdzesi bliboa la, kpɔ.. [API ƒe nuŋlɔɖiwo](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## System ƒe Nudidiwo kple Network ƒe Ðoɖowɔwɔ

### Nudidi Siwo Wokafu

- CPU: CPU ƒe nu vevi 4
- RAM: 16 GB ƒe kpekpeme
- Disk Space: 300 GB disk space li na binaries nuƒoƒoƒu kple cached chain state dzadzraɖo
- Network: 100 Mbps network kadodo kple 300 GB ya teti ƒe nyatakakawo tsɔtsɔ yi Internet dzi kple woƒe kɔpiwo ɣleti sia ɣleti

### Nudidi Suesuewo

- CPU: CPU ƒe nu vevi 2
- RAM: 4 GB
- Disk ƒe Teƒe: 300 GB ƒe disk ƒe teƒe si li

Zebra's dodokpɔxɔa ate ŋu axɔ gaƒoƒo ɖeka kple edzivɔ hafi woawu enu le wò mɔ̃a ƒe nɔnɔmewo nu. Nuɖoanyi siwo le blewu ate ŋu aƒo Zebra. Womeɖo dɔwɔwɔ ƒe liƒo siwo sɔ pɛpɛpɛ to dodokpɔ me o.

### Disk ƒe Nudidiwo

- Zebra zãa abe 300 GB na Mainnet nyatakaka siwo wodzra ɖo ɖe cached me kple 10 GB na Testnet nyatakaka siwo wodzra ɖo ɖe cached me. Kpɔ mɔ be disk zazã adzi ɖe edzi le ɣeyiɣi aɖe megbe.
- Wokɔa nyatakakadzraɖoƒea ŋu ɣeaɖewoɣi, eye ne wotsie alo wogadze egɔme ake hã. Wowɔa tɔtrɔwo to nyatakakadzraɖoƒe ƒe asitsatsa zazã me. Wogbugbɔa tɔtrɔ siwo mede blibo o siwo tso dɔa nu tsotso dzizizitɔe alo vɔvɔ̃ ɖo la ɖe megbe ɣebubuɣi si Zebra adze egɔme.

### Network ƒe Nudidiwo Kple Melidzeƒewo

- Zebra zãa TCP ʋɔtru siwo gbɔna na kadodo siwo gena ɖe eme kple esiwo dona:
  - 8233 na Mainnet
  - 18233 na Testnet
- Zebra ƒe ɖoɖowɔwɔ kple listen_addr tɔxɛ aɖe doa boblo adrɛs sia na kadodo siwo gena ɖe eme. Wohiã kadodo siwo dona le gota hena ɖekawɔwɔ; kadodo siwo gena ɖe eme la nye esiwo woate ŋu awɔ le wo ɖokui si.
- Zcash DNS seeders ƒe mɔɖeɖe hiã to OS DNS resolver (zi geɖe la, port 53) dzi.
- Zebra ate ŋu awɔ kadodo siwo dona le melidzeƒe ɖesiaɖe. zcashd lɔ̃a hati siwo le ʋɔtru gbãtɔwo dzi be woaƒo asa na zazã na DDoS amedzidzedze le network bubuwo dzi.

### Mainnet Network Zazã Si Bɔbɔe

- Gbãtɔ ƒe Ðekawɔwɔ: ehiã be woatsɔ 300 GB ƒe kɔpi awɔ ɖekawɔwɔ gbãtɔ, eye wole mɔ kpɔm be xexlẽme sia adzi ɖe edzi.
- Nu yeye siwo yia edzi: gbesiagbe nusiwo woda ɖe Internet dzi kple esiwo woɖe tso eme tso 10 MB va ɖo 10 GB, le zãla ƒe asitsatsa ƒe lolome kple hatiwo ƒe biabiawo nu.
- Zebra dzea gbãtɔ ƒe wɔwɔ ɖekae gɔme le nyatakakadzraɖoƒe ememetɔ ƒe tɔtrɔ ɖesiaɖe me, si ateŋu afia kɔsɔkɔsɔ blibo ƒe kɔpi wɔwɔ le tɔtrɔ ƒe tɔtrɔɣi.
- Wolɔ̃a hati siwo ƒe mɔzɔzɔ yiyi kple gbɔgbɔ ƒe ɣeyiɣi didi sɛkɛnd 2 alo esi mede nenema o. Ne ɣeyiɣi si woatsɔ aɣlae wu dzidzenu sia la, ʋu tikiti le Zebra nudzraɖoƒe.

## Vodada Siwo Wowɔna Zi geɖe

- Disk la ƒe lolome tsɔtsɔ na egbea. Cached Mainnet nɔnɔme bɔbɔ nɔ anyi xoxo le 300 GB gbɔ eye wòyi edzi le tsitsim.
- Mɔkpɔkpɔ na gakotoku RPCwo tso `zebrad`. Safuiwo kple dadasɔwo nɔa agbe le [Zallet](https://github.com/zcash/zallet), si nye ɖoɖowɔɖi si to vovo.
- Le du dzi `zebrad` eya ɖeka eye wòle mɔ kpɔm be gakotoku siwo me kɔ be woatsɔ aƒo ka. Mɔ ma hiã indexer, eɖanye lightwalletd alo [Zaino](/zcash-tech/zaino).
- Bubu gbugbɔgawɔ si womele mɔ kpɔm na o be enye vodada. Nyatakakadzraɖoƒe ƒe tɔtrɔ yeye ʋãa ame to aɖaŋuwɔwɔ me.

## Axa Siwo Do Ƒome Kplii

- [Nodes Blibowo](/zcash-tech/full-nodes) - nusi node blibo wɔna kple dɔwɔwɔ siwo li
- [Zakura Node ƒe ŋkɔ](/zcash-tech/zakura-node) - node forked tso Zebra kple sync kabakaba wu kple pruning
- [Zaino](/zcash-tech/zaino) - Rust indexer si subɔa gakotoku siwo me kɔ
- [Lightwallet ƒe Nodes](/zcash-tech/lightwallet-nodes) - la servers kekeli gakotokuwo biabia
- [Zcash Tomenukuƒe ƒe Mɔfiame](/using-zcash/zcash-mining-guide) - mining ɖe wò ŋutɔ wò node ŋu

## Nusɔsrɔ̃ Bubuwo

- [Zebra ƒe Agbalẽa](https://zebra.zfnd.org)
- [Zebra le GitHub](https://github.com/ZcashFoundation/zebra/)
- [Ðoɖo ƒe Nudidiwo](https://zebra.zfnd.org/user/requirements.html)

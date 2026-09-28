<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Full Node a Ɛyɛ Fɛ

## TL;DR

- Zebra (`zebrad`) yɛ Zcash full node a wɔakyerɛw wɔ Rust mu na Zcash Foundation.
- Ɛma blocks ne transactions yɛ nokware, ɛkora nkɔnsɔnkɔnsɔn tebea no so, na ɛne node afoforo kasa wɔ peer-to-peer network no so.
- Zebra ne zcashd de protocol koro no ara dii dwuma na wotumi yɛɛ adwuma. Efi bere a zcashd kɔhyɛɛ pɛnhyen no, Zebra soa adwuma a wɔpene so no.
- Akwan abien a wɔfa so tu mmirika: ne `zfnd/zebra` Docker mfonini, anaasɛ ɔdan bi a efi fibea.
- Hardware a wɔkamfo kyerɛ ne CPU cores 4, RAM 16 GB, ne disk 300 GB. Anyɛ yiye koraa no, 2 cores ne 4 GB RAM, a disk 300 GB koro no ara ka ho.

## Nkyerɛkyerɛmu Titiriw

Zebra yɛ Zcash node a edi kan a wɔkyerɛw no nyinaa wɔ Rust mu. Ɛte Zcash peer-to-peer network so, baabi a ɛgye nnwuma di dwuma na ɛbɔ amanneɛ na ɛkora blockchain tebea no so. Sɛ wowɔ dwumadie a ɛtɔ so mmienu a ɛde ne ho a, ɛma network infrastructure no ntumi nnyina codebase baako biara so kɛseɛ.

### Zebra ne zcashd

Mfitiaseɛ Zcash node, zcashd, Electric Coin Company na ɛyɛɛ no firi Bitcoin codebase. Wɔkyerɛw Zebra fii mfiase wɔ Rust, kasa a ɛnyɛ den sɛ wɔbɛkae mu, a wɔde wɔn adwene sii ahobammɔ ne adwumayɛ a etu mpɔn so.

Nneɛma abien no nyinaa di nhyehyɛe koro akyi, enti na wobetumi adi nkitaho na wɔayɛ adwuma. zcashd duu ne End-of-Support gyinabea wɔ 18 July 2026 na ɛnhyɛ aseɛ bio, a ɛma Zebra ne Zakura sɛ node implementations a wɔde di dwuma. Hwɛ [Nodes a Ɛyɛ Pɛ](/zcash-tech/full-nodes) ma mfonini a ɛtrɛw no.

## Ɔsebɔ a ɔretu Zebra

Wubetumi de Docker mfonini no ayɛ Zebra, anaasɛ wobɛtumi de nsa ayɛ. Yɛsrɛ sɛ hwɛ System Requirements ɔfã no.

### Docker a Wɔde Di Dwuma

Sɛ wopɛ sɛ woyɛ nea wɔayi no adi foforo no na woayɛ no pɛpɛɛpɛ ne tip no a, yɛ ahyɛde a edidi so yi:

```

docker run zfnd/zebra:latest

```

Sɛ wopɛ akwankyerɛ a edi mũ a, hwɛ [Docker nkrataa a wɔde kyerɛw nsɛm](https://zebra.zfnd.org/user/docker.html).

### Ɔsebɔ Zebra Ɔkyekye

Zebra a wobɛkyekyere no hwehwɛ Rust, libclang, ne C++ compiler.

- Hwɛ sɛ wowɔ Rust version a ɛyɛ den a aba foforo a wɔde ahyɛ mu, efisɛ Zebra nkutoo na wɔde asɔ ahwɛ.
- Nneɛma a ɛho hia a egyina ɔdansi so no bi ne:
  - libclang (wɔsan frɛ no libclang-dev anaa llvm-dev)
  - clang anaa C++ compiler foforo (te sɛ g++ ma platforms nyinaa anaa Xcode ma macOS)
  - protoc (Protocol Buffers compiler) a *--experimental_allow_proto3_optional* frankaa, a wɔde baa Protocol Buffers v3.12.0 (wɔyii no adi wɔ May 16, 2020) mu.

### Install na Fi ase

Wɔ x86_64 anaa aarch64 Linux a glibc 2.34 anaa nea ɛboro saa (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023) so no, wobɛtumi atwa adansiɛ a ɛgyina so no so na woahyɛ binary a wɔadi kan asi a wɔde wɔn nsa ahyɛ aseɛ:

```
cargo binstall zebrad
```

Binaries koro no ara na wɔde abata GitHub biara a wɔayi no adi ho sɛnea `zebrad-<version>-<target>.tar.gz`, a emu biara wɔ SHA-256 checksum, Sigstore build-provenance adansedi ne Cosign nsaano nkyerɛwee. Wɔ platform dedaw so no, fa Docker mfonini no di dwuma anaa si fi fibea.

Sɛ wopɛ sɛ wokyekye fi fibea a, nya koodu no na si release binary no:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Fi ase node no wɔ:

```
target/release/zebrad start
```

Installation akwankyerɛ: [zebra.zfnd.org/ɔdefoɔ/install.html](https://zebra.zfnd.org/user/install.html)

## Nsiesiei & Nneɛma a Wobɛpaw

### Nsiesiei Fael a Worefi Ase

  - Fa ahyɛde no yɛ nhyehyɛe fael:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Wɔde *zebrad.toml* a wɔayɛ no bɛto Linux default preferences directory no mu. Sɛ wopɛ OS default mmeae foforo a, hwɛ nkrataa no.

### Nkɔso Bars a Wɔbɛhyehyɛ

  - Hyehyɛ *tracing.progress_bar* wɔ wo *zebrad.toml* mu sɛnea ɛbɛyɛ a ɛbɛkyerɛ key metrics wɔ terminal no mu denam nkɔso bars a wode bedi dwuma so. Hyɛ no nsow: Ɔsɛmpɔw bi a wonim wɔ hɔ a nkɔso ho akontaabu betumi ayɛ kɛse dodo.

### Mining a Wɔbɛhyehyɛ

  - Wobetumi asiesie Zebra ama mining denam *MINER_ADDRESS* ne port mapping a wɔbɛkyerɛ wɔ Docker mu no so. Wobetumi ahu nsɛm foforo wɔ.. [Mining mmoa ho nkrataa](https://zebra.zfnd.org/user/mining-docker.html).

### Custom Build Nneɛma a Wɔde Sisi

  - Trɛw Zebra's dwumadie mu denam Cargo nneɛma foforɔ te sɛ Prometheus metrics, Sentry monitoring, experimental Elasticsearch support, ne nea ɛkeka ho.

  - Fa nneɛma pii bom denam din a wobɛkyerɛw sɛ parameters of the `--features` frankaa bere a wɔde rehyɛ mu.

  - Wɔayɛ debugging ne monitoring features binom adwuma wɔ release builds mu na ama adwumayɛ ayɛ yie. Sɛ wopɛ nhwehwɛmu ne developer nneɛma a wɔahyehyɛ no nyinaa a, hwɛ.. [API nkrataa a wɔde kyerɛw](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## System Ahwehwɛde ne Network Nsiesiei

### Ahwehwɛde ahorow a Wɔkamfo Kyerɛ

- CPU: CPU ntini 4
- RAM: 16 GB na ɛwɔ hɔ
- Disk Space: 300 GB disk space a ɛwɔ hɔ a wɔde boaboa binaries ano na wɔde sie cached chain state
- Network: 100 Mbps network nkitahodi a anyɛ yiye koraa no, 300 GB uploads ne downloads ɔsram biara

### Ahwehwɛde a Ɛsua koraa

- CPU: CPU ntini 2
- RAM: 4 GB na ɛwɔ hɔ
- Disk Space: 300 GB a ɛwɔ disk space a ɛwɔ hɔ

Zebra's sɔhwɛ suite no betumi agye bɛboro dɔnhwerew biako ansa na wɔawie a egyina wo mfiri no ho nsɛm so. Nhyehyɛe ahorow a ɛyɛ brɛoo betumi aboaboa Zebra. Wɔnnam sɔhwɛ so nsii adwumayɛ ho ahye pɔtee no.

### Disk Ahwehwɛde ahorow

- Zebra de bɛyɛ 300 GB di dwuma ma Mainnet data a wɔakora so ne 10 GB ma Testnet data a wɔakora so. Hwɛ kwan sɛ disk a wɔde di dwuma no bɛkɔ soro bere a bere kɔ so no.
- Wɔsiesie database no bere ne bere mu, na wɔsan nso wɔ shutdown anaa restart. Wɔde database nkitahodi na ɛyɛ nsakrae. Wɔsan nsakrae a enni mũ a ɛnam nhyɛso a wɔde gyae adwuma anaasɛ ehu so ba no san bere foforo a Zebra befi ase no.

### Network Ahwehwɛde ne Ports

- Zebra TCP ports a edidi so yi di dwuma ma inbound ne outbound nkitahodi:
  - 8233 ma Mainnet
  - 18233 ma Testnet
- Sɛ wode listen_addr pɔtee bi hyehyɛ Zebra a, ɛbɔ saa address yi ho dawuru ma nkitahodi a ɛba. Nkitahodi a ɛkɔ abɔnten ho hia ma nhyiamu; inbound connections yɛ nea wobetumi apaw.
- Zcash DNS seeders a wobɛkɔ no ho hia denam OS DNS resolver (mpɛn pii no port 53) so.
- Zebra tumi yɛ outbound connections wɔ port biara so. zcashd pɛ peers a wɔwɔ default ports so na wɔakwati sɛ wɔde bedi dwuma ama DDoS ntua wɔ network afoforo so.

### Mainnet Network a Wɔde Di Dwuma a Wɔtaa De Di Dwuma

- Initial Sync: ɛho hia sɛ wɔtwe 300 GB ma mfitiaseɛ synchronization no, na wɔhwɛ kwan sɛ saa dodoɔ yi bɛkɔ soro.
- Nsakraeɛ a Ɛkɔ So: da biara da a wɔde gu so na wɔtwe firi 10 MB kɔsi 10 GB, egyina ɔdefoɔ no nkitahodiɛ akɛseɛ ne atipɛnfoɔ abisadeɛ so.
- Zebra fi ase yɛ sync a edi kan wɔ emu database version nsakrae biara so, a ebetumi akyerɛ sɛ wɔbɛtwe nkɔnsɔnkɔnsɔn a edi mũ bere a wɔreyɛ version no foforo.
- Wɔpɛ atipɛnfo a wɔde bere a wɔde kɔ baabi foforo a ɛyɛ sikɔne 2 anaa nea ennu saa. Sɛ latency boro saa threshold yi a, bue tekiti wɔ Zebra akoraeɛ no mu.

## Mfomso a Ɛtaa Tu

- Disk no kɛse a wɔbɛhyehyɛ ama nnɛ. Cached Mainnet tebea dedaw te bɛn 300 GB na ɛkɔ so nyin.
- Yɛrehwɛ kwan sɛ sika kotoku RPC ahorow fi `zebrad`. Safe ne kari pɛ te mu [Zallet](https://github.com/zcash/zallet), dwumadi a ɛyɛ soronko.
- Retu mmirika `zebrad` ɔno nkutoo na ɔhwɛ kwan sɛ sika kotoku a emu yɛ hare bɛka ho. Saa kwan no hia indexer, sɛ ɛyɛ lightwalletd anaa [Zaino](/zcash-tech/zaino).
- Resync a wɔnhwɛ kwan a wobɛfa no sɛ mfomso. Database version nsakrae bi kanyan obi denam nhyehyɛe so.

## Nkratafa a Ɛfa Ho

- [Nodes a Ɛyɛ Pɛ](/zcash-tech/full-nodes) - dee node a edi mu y ne implementations a ewo ho
- [Zakura Node na ɔkyerɛwee](/zcash-tech/zakura-node) - node a forked firi Zebra a ewo sync ne pruning ntɛmntɛm
- [Zaino](/zcash-tech/zaino) - a ɛyɛ Rust indexer a ɛsom hann sika kotokuo
- [Lightwallet Nodes a Wɔde Di Dwuma](/zcash-tech/lightwallet-nodes) - a servers kanea sika kotokuo bisa
- [Zcash Mining Akwankyerɛ](/using-zcash/zcash-mining-guide) - mining tia wo ankasa node

## Adesua a Ɛkɔ Akyiri

- [Zebra Nhoma no](https://zebra.zfnd.org)
- [Zebra wɔ GitHub](https://github.com/ZcashFoundation/zebra/)
- [System Ahwehwɛde ahorow](https://zebra.zfnd.org/user/requirements.html)

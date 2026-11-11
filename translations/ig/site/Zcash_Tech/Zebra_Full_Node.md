<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Zebra Full Node

## Na Nkenke

- Zebra (`zebrad`) bụ Zcash full node e dere na Rust ma Zcash Foundation na-elekọta.
- Ọ na-enyocha blocks na Azụmahia, na-edobe ọnọdụ chain, ma na-ekwurịta okwu na nodes ndị ọzọ site na netwọkụ ibe-na-ibe.
- Zebra na zcashd mejuputara otu protocol ahụ ma nwee ike ịrụkọ ọrụ ọnụ. Kemgbe e wepụrụ zcashd, Zebra na-arụ ọrụ consensus.
- Ụzọ abụọ e si agba ya: image `zfnd/zebra` Docker, ma ọ bụ iwulite ya site na source.
- Hardware akwadoro bụ CPU cores 4, RAM 16 GB, na diski 300 GB. Nke kacha nta bụ cores 2 na RAM 4 GB, nwere otu diski 300 GB ahụ.

## Nkọwa Isi

Zebra bụ node mbụ Zcash e dere kpamkpam na Rust. Ọ nọ na netwọkụ ibe-na-ibe Zcash, ebe ọ na-enyocha ma na-agbasa Azụmahia ma na-edobe ọnọdụ blockchain. Inwe mmejuputa nke abụọ nọọrọ onwe ya na-eme ka akụrụngwa netwọkụ ghara ịdabere nke ukwuu n'otu codebase.

### Zebra na zcashd

Node mbụ Zcash, bụ zcashd, ka Electric Coin Company mepụtara site na codebase Bitcoin. E dere Zebra site na mmalite na Rust, asụsụ na-echekwa nchekwa ebe nchekwa, na-elekwasị anya na nchekwa na ịrụ ọrụ nke ọma.

Mmejuputa abụọ ahụ na-agbaso otu protocol, ya mere ha nwere ike ikwurịta okwu ma rụọkọ ọrụ ọnụ. zcashd ruru nkwụsị End-of-Support ya na 18 Julaị 2026 ma ọ naghị amalite ọzọ, nke na-ahapụ Zebra na Zakura dịka mmejuputa node ndị a na-eji. Lee [Full Nodes](/zcash-tech/full-nodes) maka nkọwa sara mbara.

## Ịgba Zebra

Ị nwere ike ịgba Zebra site n'iji image Docker, ma ọ bụ ị nwere ike iji aka gị wuo ya. Biko lee ngalaba System Requirements.

### Ojiji Docker

Iji gbaa release kachasị ọhụrụ ma mekọrịta ya ruo na tip, gbaa iwu a:

```

docker run zfnd/zebra:latest

```

Maka ntuziaka zuru ezu, gaa na akwụkwọ [Docker documentation](https://zebra.zfnd.org/user/docker.html).

### Iwulite Zebra

Iwulite Zebra chọrọ Rust, libclang, na compiler C++.

- Jide n'aka na ị tinyela ụdị stable kachasị ọhụrụ nke Rust, n'ihi na naanị ya ka a na-anwale Zebra.
- Dependencies ndị dị mkpa maka iwulite gụnyere:
  - libclang (a makwaara dị ka libclang-dev ma ọ bụ llvm-dev)
  - clang ma ọ bụ compiler C++ ọzọ (dịka g++ maka platforms niile ma ọ bụ Xcode maka macOS)
  - protoc (Protocol Buffers compiler) nwere flag *--experimental_allow_proto3_optional*, ewepụtara na Protocol Buffers v3.12.0 (wepụtara na Mee 16, 2020).

### Wụnye ma Malite

Na x86_64 ma ọ bụ aarch64 Linux nwere glibc 2.34 ma ọ bụ nke ọhụrụ karịa (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), ị nwere ike ịgafe dependencies iwulite ma wụnye binary a wulitere tupu oge eruo nke a bịanyere aka:

```
cargo binstall zebrad
```

A na-etinyekwa binaries ndị ahụ na release GitHub ọ bụla dịka `zebrad-<version>-<target>.tar.gz`, nke ọ bụla nwere SHA-256 checksum, Sigstore build-provenance attestation na Cosign signature. N'elu platforms ochie, jiri image Docker ma ọ bụ wuo ya site na source.

Iji wuo ya site na source, nweta code ma wuo binary release:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Jiri nke a malite node:

```
target/release/zebrad start
```

Nduzi nrụnye: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Nhazi Nhọrọ na Njirimara

### Ịmalite Faịlụ Nhazi

  - Mepụta faịlụ nhazi site n'iji iwu:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - A ga-etinye *zebrad.toml* e mepụtara n'ime ndekọ nhọrọ ndabara nke Linux. Maka ebe ndabara OS ọzọ, gaa na documentation.

### Ịhazi Ogwe Ọganihu

  - Hazie *tracing.progress_bar* n'ime *zebrad.toml* gị iji gosipụta metrics dị mkpa na terminal site n'iji ogwe ọganihu. Rịba ama: E nwere nsogbu ama ama ebe atụmatụ ogwe ọganihu nwere ike ibu oke ukwuu.

### Ịhazi Ịgwụputa

  - Enwere ike ịhazi Zebra maka ịgwụputa site n'ịkọwa *MINER_ADDRESS* na port mapping n'ime Docker. Enwere nkọwa ndị ọzọ na [Mining support documentation](https://zebra.zfnd.org/user/mining-docker.html).

### Njirimara Iwulite Omenala

  - Jiri Cargo features ndị ọzọ, dịka Prometheus metrics, Sentry monitoring, nkwado Elasticsearch nnwale, na ndị ọzọ, gbasaa arụmọrụ Zebra.

  - Jikọta ọtụtụ features site n'idepụta ha dịka parameters nke flag `--features` mgbe a na-arụ nrụnye.

  - A na-agbanyụ ụfọdụ debugging na monitoring features na release builds iji kwalite arụmọrụ. Maka ndepụta zuru ezu nke features nnwale na nke onye mmepụta, lee [API documentation](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Ihe Sistemụ Chọrọ na Nhazi Netwọkụ

### Ihe Akwadoro

- CPU: CPU cores 4
- RAM: 16 GB
- Oghere Disk: oghere diski 300 GB dị maka ịchịkọta binaries na ịchekwa ọnọdụ chain echekwara
- Netwọkụ: njikọ netwọkụ 100 Mbps nwere opekata mpe uploads na downloads 300 GB kwa ọnwa

### Ihe Kacha Nta Chọrọ

- CPU: CPU cores 2
- RAM: 4 GB
- Oghere Disk: oghere diski 300 GB dị

Nnwale Zebra nwere ike iwe ihe karịrị otu awa iji gwụ, dabere na nkọwapụta igwe gị. Sistemụ ndị ji nwayọ nwere ike ịchịkọta ma gbaa Zebra. Emebebeghị oke arụmọrụ ziri ezi site na nnwale.

### Ihe Disk Chọrọ

- Zebra na-eji ihe dịka 300 GB maka data Mainnet echekwara na 10 GB maka data Testnet echekwara. Tụọ anya na ojiji diski ga-abawanye ka oge na-aga.
- A na-ehicha database kwa oge, nakwa mgbe a na-eme shutdown ma ọ bụ restart. A na-etinye mgbanwe site n'iji Azụmahia database. A na-atụgharị mgbanwe ezughị ezu nke nkwụsị mmanye ma ọ bụ panic kpatara azụ oge ọzọ Zebra malitere.

### Ihe Netwọkụ Chọrọ na Ports

- Zebra na-eji TCP ports ndị a maka njikọ nbata na mpụga:
  - 8233 maka Mainnet
  - 18233 maka Testnet
- Ịhazi Zebra na listen_addr akọwapụtara na-akpọsa Adreesị a maka njikọ nbata. Njikọ mpụga dị mkpa maka mmekọrịta; njikọ nbata bụ nhọrọ.
- Ịnweta DNS seeders Zcash dị mkpa site na OS DNS resolver (n'ozuzu port 53).
- Zebra nwere ike ịme njikọ mpụga na port ọ bụla. zcashd na-ahọrọ peers na ports ndabara iji zere iji ya mee mwakpo DDoS na netwọkụ ndị ọzọ.

### Ojiji Netwọkụ Mainnet A Na-ahụkarị

- Mmekọrịta Mbụ: download 300 GB dị mkpa maka mmekọrịta mbụ, a na-atụkwa anya na ọnụ ọgụgụ a ga-eto.
- Mmelite Na-aga N'ihu: uploads na downloads kwa ụbọchị sitere na 10 MB ruo 10 GB, dabere na nha Azụmahia onye ọrụ na arịrịọ peer.
- Zebra na-amalite mmekọrịta mbụ n'oge mgbanwe ụdị database ime, nke nwere ike ịpụta download chain zuru ezu mgbe a na-ebuli ụdị.
- A na-ahọrọ peers nwere round-trip latency nke sekọnd 2 ma ọ bụ obere. Ọ bụrụ na latency gafere oke a, mepee ticket n'ime repository Zebra.

## Njehie Ndị A Na-ahụkarị

- Ịhazi nha diski maka taa. Ọnọdụ Mainnet echekwara adịlarị nso 300 GB ma na-aga n'ihu na-eto.
- Ịtụ anya wallet RPCs sitere na `zebrad`. Igodo na balances nọ n'ime [Zallet](https://github.com/zcash/zallet), bụ mmemme dị iche.
- Ịgba naanị `zebrad` ma tụọ anya na light wallets ga-ejikọ. Ụzọ ahụ chọrọ indexer, ma ọ bụ lightwalletd ma ọ bụ [Zaino](/zcash-tech/zaino).
- Iwere resync a na-atụghị anya ya dịka mmejọ. Mgbanwe ụdị database na-akpalite otu site n'ichepụta ya.

## Peeji Ndị Metụtara Ya

- [Full Nodes](/zcash-tech/full-nodes) - ihe full node na-eme na mmejuputa ndị dị
- [Zakura Node](/zcash-tech/zakura-node) - node e kewapụrụ site na Zebra nke nwere sync ngwa ngwa na pruning
- [Zaino](/zcash-tech/zaino) - indexer Rust nke na-enye light wallets ọrụ
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - sava ndị light wallets na-ajụ ajụjụ
- [Zcash Mining Guide](/using-zcash/zcash-mining-guide) - ịgwụputa megide node nke gị

## Ịmụtakwu Ihe

- [The Zebra Book](https://zebra.zfnd.org)
- [Zebra na GitHub](https://github.com/ZcashFoundation/zebra/)
- [System Requirements](https://zebra.zfnd.org/user/requirements.html)

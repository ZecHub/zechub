<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra zuru oke

## TL;DR

- Zebra (`zebrad`) bụ Zcash zuru oke nke e dere na Rust ma Zcash Foundation.
- Ọ na-akwado ngọngọ na azụmahịa, na-edobe ọnọdụ nkesa ahụ, ma na-agwa ndị ọzọ okwu site na netwọk ndị ọgbọ-na-otu.
- Zebra na zcashd tinyere otu usoro ahụ n'ọrụ ma nwee ike ịrụkọ ọrụ ọnụ. Kemgbe ezumike nká zcashd, Zebra na-arụ ọrụ nkwekọrịta.
- Ụzọ abụọ iji mee ya: `zfnd/zebra` Foto Docker, ma ọ bụ ihe owuwu sitere na isi mmalite.
- Akụrụngwa akwadoro bụ isi CPU anọ, RAM 16 GB, na diski 300 GB. Nke kacha nta bụ isi abụọ na RAM 4 GB, yana diski 300 GB otu ahụ.

## Nkọwa Isi

Zebra bụ Zcash node mbụ e dere kpamkpam na Rust. Ọ dị na netwọk Zcash peer-to-peer, ebe ọ na-akwado ma na-agbasa azụmahịa ma na-edobe ọnọdụ blockchain. Inwe mmejuputa nke abụọ n'onwe ya na-eme ka akụrụngwa netwọk ahụ ghara ịdabere na otu koodu ọ bụla.

### Zebra na zcashd

Ụlọ Electric Coin Company mepụtara Zcash node mbụ ahụ, zcashd, site na koodu Bitcoin. E dere Zebra site na mmalite na Rust, asụsụ nchekwa ebe nchekwa, nke lekwasịrị anya na nchekwa na arụmọrụ.

Mmejuputa abụọ a na-agbaso otu usoro ahụ, ka ha wee nwee ike ịkparịta ụka ma jikọọ aka. zcashd ruru nkwụsịtụ nke Nkwado ya na 18 Julaị 2026 ma ọ naghịzi amalite, nke na-ahapụ Zebra na Zakura dị ka mmejuputa node a na-eji. Lee [Ọnụ zuru ezu](/zcash-tech/full-nodes) maka foto sara mbara.

## Zebra na-agba ọsọ

I nwere ike iji onyonyo Docker gbaa Zebra, ma ọ bụ jiri aka gị wuo ya. Biko lee ngalaba Ihe Sistemụ Chọrọ.

### Ojiji Docker

Iji mee ka mwepụta kachasị ọhụrụ ma mekọrịta ya na njedebe ahụ, mee iwu a:

```

docker run zfnd/zebra:latest

```

Maka ntuziaka zuru oke, gaa na [Akwụkwọ docker](https://zebra.zfnd.org/user/docker.html).

### Iwuli Zebra

Iwuli Zebra chọrọ Rust, libclang, na C++ compiler.

- Hụ na ị tinyere ụdị Rust kachasị ọhụrụ, ebe ọ bụ na a na-anwale Zebra naanị ya.
- Ihe ndị dị mkpa maka owuwu gụnyere:
  - libclang (a makwaara dị ka libclang-dev ma ọ bụ llvm-dev)
  - clang ma ọ bụ ihe nchịkọta C++ ọzọ (dịka g++ maka nyiwe niile ma ọ bụ Xcode maka macOS)
  - protoc (onye na-emepụta Protocol Buffers) nwere ọkọlọtọ *--experimental_allow_proto3_optional*, ewebatara na Protocol Buffers v3.12.0 (ewepụtara na Mee 16, 2020).

### Wụnye ma Malite

Na x86_64 ma ọ bụ aarch64 Linux nwere glibc 2.34 ma ọ bụ nke ọhụrụ (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), ị nwere ike ịhapụ ihe ndị dabere na nrụpụta ahụ wee wụnye ọnụọgụ abụọ e wuru tupu oge eruo:

```
cargo binstall zebrad
```

A na-ejikọ otu ọnụọgụ abụọ ahụ na ntọhapụ GitHub ọ bụla dịka `zebrad-<version>-<target>.tar.gz`, nke ọ bụla nwere checksum SHA-256, ihe akaebe nke nrụpụta na mmalite nke Sigstore na mbinye aka Cosign. Na nyiwe ochie, jiri onyonyo Docker ma ọ bụ wuo site na isi mmalite.

Iji wuo site na isi mmalite, nweta koodu ahụ ma wuo binary ntọhapụ:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Malite node ahụ na:

```
target/release/zebrad start
```

Nduzi nwụnye: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## Nhazi na Atụmatụ Nhọrọ

### Mmalite Faịlụ Nhazi

  - Mepụta faịlụ nhazi site na iji iwu a:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - A ga-etinye *zebrad.toml* emepụtara na ndekọ nhọrọ ndabara nke Linux. Maka ebe ndabara OS ọzọ, lee akwụkwọ ndị ahụ.

### Ịhazi Ogwe Ọganihu

  - Hazie *tracing.progress_bar* na *zebrad.toml* gị iji gosipụta ihe ndị dị mkpa na njedebe site na iji ogwe ọganihu. Rịba ama: Enwere nsogbu a maara ebe atụmatụ ogwe ọganihu nwere ike ibu oke ibu.

### Ịhazi Ngwuputa

  - Enwere ike ịhazi Zebra maka igwu ala site na ịkọwapụta *MINER_ADDRESS* na nhazi ọdụ ụgbọ mmiri na Docker. Enwere ike ịchọta nkọwa ndị ọzọ na [Akwụkwọ nkwado maka igwu ala](https://zebra.zfnd.org/user/mining-docker.html).

### Atụmatụ Nrụpụta Omenala

  - Gbasaa ọrụ Zebra's site na iji atụmatụ Cargo ndị ọzọ dịka usoro Prometheus, nlekota Sentry, nkwado Elasticsearch nnwale, na ndị ọzọ.

  - Jikọta ọtụtụ atụmatụ site na ịdepụta ha dị ka paramita nke `--features` ọkọlọtọ n'oge nrụnye.

  - A na-agbanyụ ụfọdụ atụmatụ nrụgharị na nlekota na nrụpụta ntọhapụ iji mee ka arụmọrụ ka mma. Maka ndepụta zuru oke nke atụmatụ nnwale na nke onye nrụpụta, lelee anya na [Akwụkwọ API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).

## Ihe Sistemụ chọrọ na Nhazi Netwọk

### Ihe Ndị A Na-atụ aro

- CPU: Isi CPU anọ
- RAM: 16 GB
- Oghere Diski: 300 GB dị maka ịchịkọta ọnụọgụ abụọ na ịchekwa ọnọdụ agbụ echekwara
- Netwọk: Njikọ netwọk 100 Mbps yana opekempe nbudata na nbudata 300 GB kwa ọnwa

### Ihe kacha nta achọrọ

- CPU: 2 isi CPU
- RAM: 4 GB
- Oghere Diski: 300 GB nke oghere diski dị

Usoro nnwale Zebra's nwere ike were ihe karịrị otu awa iji mezue dabere na nkọwapụta igwe gị. Sistemụ dị nwayọ nwere ike ịhazi ma rụọ ọrụ Zebra. E guzobebeghị ókè arụmọrụ kpọmkwem site na nnwale.

### Ihe achọrọ na Diski

- Zebra na-eji ihe dị ka 300 GB maka data Mainnet echekwara na 10 GB maka data Testnet echekwara. A na-atụ anya na ojiji diski ga-abawanye ka oge na-aga.
- A na-ehicha nchekwa data ahụ mgbe ụfọdụ, nakwa mgbe emechiri ya ma ọ bụ malitegharịa ya. A na-eme mgbanwe site na iji azụmahịa nchekwa data. A na-agbanwe mgbanwe ndị na-ezughị ezu nke nkwụsị ma ọ bụ ụjọ kpatara na-alaghachi azụ oge ọzọ Zebra malitere.

### Ihe achọrọ na ọdụ ụgbọ mmiri netwọk

- Zebra na-eji ọdụ ụgbọ mmiri TCP ndị a maka njikọ na-abata na nke na-apụ apụ:
  - 8233 maka Mainnet
  - 18233 maka Testnet
- Ịhazi Zebra na listen_addr kpọmkwem na-akpọsa adreesị a maka njikọ na-abata. A chọrọ njikọ na-apụ apụ maka mmekọrịta; njikọ na-abata bụ nhọrọ.
- Ọ dị mkpa ịnweta Zcash DNS seeders site na OS DNS resolver (nke na-abụkarị ọdụ ụgbọ mmiri 53).
- Zebra nwere ike ime njikọ na-apụ apụ na ọdụ ụgbọ mmiri ọ bụla. zcashd na-ahọrọ ndị ọgbọ ya na ọdụ ụgbọ mmiri ndabara iji zere iji ya maka mwakpo DDoS na netwọk ndị ọzọ.

### Ojiji Netwọk Mainnet nkịtị

- Mmekọrịta Mbụ: achọrọ nbudata 300 GB maka njikọta mbụ, a na-atụkwa anya na ọnụọgụgụ a ga-eto.
- Mmelite Na-aga n'ihu: nbudata na nbudata kwa ụbọchị site na 10 MB ruo 10 GB, dabere na nha azụmahịa onye ọrụ na arịrịọ ndị ọgbọ.
- Zebra na-amalite mmekọrịta mbụ na mgbanwe ọ bụla nke ụdị nchekwa data dị n'ime, nke nwere ike ịpụta nbudata agbụ zuru oke n'oge mmelite ụdị.
- A na-ahọrọ ndị ọgbọ nwere oge ịgagharị nke sekọnd abụọ ma ọ bụ ihe na-erughị ya. Ọ bụrụ na oge agafeela oke a, mepee tiketi na ebe nchekwa Zebra.

## Mmejọ Ndị A Na-emekarị

- Nhazi diski ahụ maka taa. Ọnọdụ Mainnet echekwara adịlarị ihe fọrọ nke nta ka ọ bụrụ 300 GB ma na-eto eto.
- A na-atụ anya RPCs obere akpa site na `zebrad`Igodo na nguzozi dị ndụ [Zallet](https://github.com/zcash/zallet), mmemme dị iche.
- Ịgba ọsọ `zebrad` naanị m ma na-atụ anya ka obere akpa ego jikọọ. Ụzọ ahụ chọrọ ihe na-egosi ihe, ma ọ bụ lightwalletd ma ọ bụ nke nwere akpa ego [Zaino](/zcash-tech/zaino).
- Ịna-ewere mgbanwe a na-atụghị anya ya dị ka ihe kpatara ya. Mgbanwe ụdị nchekwa data na-akpali otu site na imewe.

## Peeji ndị metụtara ya

- [Ọnụ zuru ezu](/zcash-tech/full-nodes) - ihe otu node zuru oke na-eme na mmejuputa dị
- [Zakura Node](/zcash-tech/zakura-node) - otu oghere e ji Zebra mee nke nwere mmekọrịta na nhazi ngwa ngwa
- [Zaino](/zcash-tech/zaino) - ihe nrịbama Rust nke na-eje ozi obere obere akpa
- [Ọnụọgụ obere akpa](/zcash-tech/lightwallet-nodes) - ajụjụ obere akpa ozi sava
- [Nduzi Ngwuputa Zcash](/using-zcash/zcash-mining-guide) - igwu ala n'akụkụ nke gị

## Mmụta Ọzọ

- [Akwụkwọ Zebra](https://zebra.zfnd.org)
- [Zebra na GitHub](https://github.com/ZcashFoundation/zebra/)
- [Ihe Sistemụ Chọrọ](https://zebra.zfnd.org/user/requirements.html)

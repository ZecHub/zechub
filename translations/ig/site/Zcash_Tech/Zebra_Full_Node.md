<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Okwu Mmalite nke Zebra Node

Na-ewebata Zebra: Mgbanwe nke Zcash Node Infrastructure na Rust

Meet Zebra, a groundbreaking achievement as the inaugural Zcash node crafted entirely in Rust. Seamlessly integrated into the Zcash peer-to-peer network, Zebra serves as a pivotal tool fortifying the network's resilience. Through its core functions of validating and broadcasting transactions, and meticulously maintaining the Zcash blockchain state, Zebra contributes to a more decentralized network infrastructure.

## Uru karịa mmejuputa Zcashd Node
In contrast to the original Zcash node, zcashd, which traces its lineage back to Bitcoin's foundational codebase and is developed by the Electric Coin Company, our implementation stands as an autonomous entity. Developed from scratch with a focus on security and efficiency, Zebra harnesses the power of the memory-safe Rust language.

Despite their distinct origins, both zcashd and Zebra adhere to the same protocol, facilitating seamless communication and interoperability between them. This innovation not only expands the Zcash ecosystem but also sets a new standard for blockchain node development.

## Ntuziaka maka Zebra Launcher

Ị nwere ike ịgba ọsọ Zebra site na iji onyinyo Docker anyị ma ọ bụ ị nwere ike ịmepụta ya aka. Biko lee ngalaba System Requirements.

### Docker ojiji:

Iji rụọ ọrụ kachasị ọhụrụ anyị n'enweghị nsogbu ma mekọrịta ya na njedebe, mepụta iwu na-esonụ:

```

docker run zfnd/zebra:latest

```

Maka ntụziaka zuru ezu na nkọwa zuru ezu, biko rụtụ aka na anyị [Docker akwụkwọ](https://zebra.zfnd.org/user/docker.html).

### Ụlọ Zebra:

Iwuli Zebra chọrọ Rust, libclang, na onye nchịkọta C ++.

- Jide n'aka na ị wụnyela nsụgharị Rust kachasị ọhụrụ, ebe ọ bụ na a na-anwale Zebra naanị ya.
- Ihe ndị dị mkpa na-adabere na ya gụnyere:
  - libclang (nke a makwaara dị ka libclan-dev ma ọ bụ llvm-dev)
  - clang ma ọ bụ onye nchịkọta C ++ ọzọ (dịka g ++ maka nyiwe niile ma ọ̄ bụ Xcode maka macOS)
  - protoc (Protocol Buffers compiler) na *--experimental_allow_proto3_optional* ọkọlọtọ, ewebata na Protocol Buffers v3.12.0 (wepụtara na Mee 16, 2020).



### Ihe ndị na-adabere na Arch:

After ensuring the dependencies are met, proceed with building and installing Zebra using the following command:

```

cargo install --locked zebrad

```

Malite Zebra site na ime:

```
zebrad start

```


## Nhọrọ Nhọrọ & Njirimara:


### - Ịmepụta faịlụ nhazi:

  - Mepụta faịlụ nhazi site na iji iwu:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - The generated *zebrad.toml* will be placed in the default preferences directory of Linux. For alternative OS default locations, refer to our documentation.



### - Ịhazi Ogwe Ọganihu:

  - Hazie *tracing.progress_bar* na *zebrad.toml* gị iji gosipụta metrik dị mkpa na njedebe site na iji ogwe ọganihu. Rịba ama: Nsogbu a maara nke ọma ebe atụmatụ nke ogwe ihe ịga nke ọma nwere ike ibu oke.



### - Ịhazi Ngwuputa:

  - Zebra nwere ike ahaziri maka Ngwuputa site na-ezipụta a * MINER_ADDRESS * na ọdụ ụgbọ mmiri mapping na Docker.](https://zebra.zfnd.org/user/mining-docker.html).


### - Njirimara Nrụpụta Omenala:

  - Gbasaa ọrụ Zebra na atụmatụ ndị ọzọ nke Cargo dị ka Prometheus metrics, nlekota Sentry, nkwado nyocha Elasticsearch, na ndị ọzọ.

  - Jikọta ọtụtụ atụmatụ site na-edepụta ha dị ka parameters nke `--features` flag n'oge echichi.


### Note: Some debugging and monitoring features are disabled in release builds to optimize performance.

Maka ndepụta zuru ezu nke atụmatụ nnwale na mmepe, biko lelee akwụkwọ anyị [API](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# Ihe ndị a chọrọ n'aka usoro na nhazi netwọk maka Zebra

To ensure optimal performance and reliability, we recommend the following system requirements for compiling and running zebrad, the revolutionary Zcash node built entirely in Rust:

### Ihe Ndị A Chọrọ n'Aka:
- CPU: 4 CPU cores
- RAM: 16 GB
- Oghere diski: 300 GB ohere diski dị maka ịhazi ọnụọgụ abụọ na ịchekwa ọnọdụ agbụ echekwara
- Network: 100 Mbps netwọk njikọ na a kacha nta nke 300 GB uploads na downloads kwa ọnwa


Please note that Zebra's test suite may take over an hour to complete depending on your machine specifications. While slower systems may be able to compile and run Zebra, we have yet to establish precise performance boundaries through testing.


### Ihe ndị a chọrọ maka diski:
- Zebra utilizes approximately 300 GB for cached Mainnet data and 10 GB for cached Testnet data. Expect disk usage to increase over time.
- The database is regularly cleaned up, especially during shutdowns or restarts, ensuring data integrity. Incomplete changes due to forced terminations or panics are rolled back upon restarting Zebra.


### Ihe Ndị A Chọrọ n'Aka Ntanetị na Ọdụ Ụgbọ Mmiri:
- Zebra na-eji ọdụ ụgbọ mmiri TCP ndị a maka njikọ mbata na ọpụpụ:
  - 8233 maka Mainnet
  - 18233 maka Testnet
- Configuring Zebra with a specific listen_addr enables advertising this address for inbound connections. While outbound connections are essential for synchronization, inbound connections are optional.
- Ịnweta Zcash DNS seeders dị mkpa site na OS DNS resolver (na-abụkarị ọdụ ụgbọ mmiri 53).
- While Zebra can establish outbound connections on any port, zcashd prefers peers on default ports to mitigate DDoS attacks on other networks.


### Ụdị ojiji nke netwọkụ Mainnet:
- Mmekọrịta mbụ: A chọrọ nbudata 300 GB maka nhazi mbụ, na-atụ anya uto na nbudatara ndị ọzọ.
- Ongoing Updates: Expect daily uploads and downloads ranging from 10 MB to 10 GB, contingent on user transaction sizes and peer requests.
- Zebra na-ebute mmekọrịta mbụ na mgbanwe ọ bụla nke nchekwa data dị n'ime, nwere ike ịchọ ka ebudata usoro zuru ezu n'oge nkwalite nsụgharị.
- A na-ahọrọ ndị ọgbọ nwere oge njem nke 2 sekọnd ma ọ bụ obere. Ọ bụrụ na oge gafere oke a, biko nyefee tiketi maka enyemaka.


Site n'ịgbaso ndụmọdụ na nhazi ndị a, ị nwere ike ịbawanye arụmọrụ na ịdị irè nke Zebra n'ime netwọk Zcash. Ọ bụrụ na ị zutere nsogbu ọ bụla ma ọ bụ chọọ enyemaka ọzọ, ndị ọrụ nkwado anyị dị njikere inye nduzi.


Nke a bụ njikọ na Ntuziaka Ntuzi Zebra Node:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra 

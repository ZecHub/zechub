<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Zebra Node ho nnianim asɛm

Zebra a yɛde reba: Yɛresakra Zcash Node Infrastructure ne Rust

Hu Zebra, adeyɛ a ɛyɛ nwonwa sɛ Zcash node a edi kan a wɔyɛɛ no ​​koraa wɔ Rust mu. Wɔde afrafra Zcash atipɛnfo ntam nkitahodi mu a ɛnyɛ den, Zebra yɛ adwinnade titiriw a ɛhyɛ ntam nkitahodi no ahoɔden a wɔde gyina ano no mu den. Ɛnam ne dwumadie titire a ɛne sɛ ɛbɛgye nkitahodie atom na abɔ amanneɛ, ne ahwɛyie a ɛhwɛ Zcash blockchain tebea no so no, Zebra boa ma wɔyɛ nkitahodi nhyehyɛe a wɔde ahyɛ aman no nsa kɛse.

## Mfaso a ɛwɔ so sen Zcashd Node a Wɔde Di Dwuma
Nea ɛne mfitiase Zcash node, zcashd, a ɛhwehwɛ n’abusua akyi kɔ Bitcoin fapem codebase na Electric Coin Company na ɛyɛe no bɔ abira no, yɛn dwumadie no gyina hɔ sɛ adwumakuo a ɛwɔ ahofadi. Wɔyɛɛ no ​​fii mfiase a wɔde wɔn adwene asi ahobammɔ ne adwumayɛ so, Zebra de tumi a ɛwɔ Rust kasa a ahobammɔ wom a wɔkae no mu no di dwuma.

Ɛmfa ho sɛ ɛsono wɔn mfiase no, zcashd ne Zebra nyinaa di nhyehyɛe koro no ara so, na ɛma nkitahodi a ɛnyɛ den ne adwumayɛ a ɛkɔ so wɔ wɔn ntam no yɛ mmerɛw. Saa ade foforo yi nyɛ sɛ ɛtrɛw Zcash abɔde a nkwa wom nhyehyɛe no mu nko na mmom ɛde gyinapɛn foforo nso si hɔ ma blockchain node nkɔso.

## Akwankyerɛ a ɛfa Zebra Launcher ho

Wubetumi de yɛn Docker mfonini no ayɛ Zebra anaasɛ wobɛtumi de nsa ayɛ. Yɛsrɛ sɛ hwɛ System Requirements ɔfã no.

### Docker a Wɔde Di Dwuma:

Sɛ wopɛ sɛ wode yɛn a yɛayi no aba foforo no ayɛ adwuma a wommɔ mmɔden biara na woayɛ no pɛpɛɛpɛ ne tip no a, yɛ ahyɛde a edidi so yi:

```

docker run zfnd/zebra:latest

```

Sɛ wopɛ akwankyerɛ a ɛkɔ akyiri ne nhumu a ɛkɔ akyiri a, yɛsrɛ wo hwɛ yɛn [Docker nkrataa](https://zebra.zfnd.org/user/docker.html).

### Building Zebra:

Building Zebra hyɛ Rust, libclang, ne C++ compiler.

- Hwɛ sɛ wowɔ Rust version a ɛyɛ den a aba foforo a wɔde ahyɛ mu, efisɛ Zebra nkutoo na wɔde asɔ ahwɛ.
- Nneɛma a ɛho hia a egyina ɔdansi so no bi ne:
  - libclang (wɔsan frɛ no libclang-dev anaa llvm-dev) .
  - clang anaa C++ compiler foforo (te sɛ g++ ma platforms nyinaa anaa Xcode ma macOS) .
  - protoc (Protocol Buffers compiler) a *--experimental_allow_proto3_optional* frankaa, a wɔde baa Protocol Buffers v3.12.0 (wɔyii no adi wɔ May 16, 2020) mu.



### Nneɛma a egyina Arch so:

Sɛ wohwɛ hu sɛ wɔadi dependencies no ho dwuma wie a, kɔ so kyekye na fa Zebra si hɔ denam ahyɛde a edidi so yi so:

```

cargo install --locked zebrad

```

Fi ase Zebra denam:

```
zebrad start

```


## Nsiesiei & Nneɛma a Wobɛpaw:


### - a wobɛhyɛ aseɛ ayɛ Nsiesiei Fael:

  - Fa ahyɛde no yɛ nhyehyɛe fael:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - Wɔde *zebrad.toml* a wɔayɛ no bɛto Linux default preferences directory no mu. Sɛ wopɛ OS default mmeae foforo a, hwɛ yɛn nkrataa no.



### - Nkɔsoɔ Bars a wɔhyehyɛ:

  - Hyehyɛ *tracing.progress_bar* wɔ wo *zebrad.toml* mu sɛnea ɛbɛyɛ a ɛbɛkyerɛ metrics a ɛho hia wɔ terminal no mu denam nkɔso bars a wode bedi dwuma so. Hyɛ no nsow: Ɔsɛmpɔw bi a wonim wɔ hɔ a nkɔso ho akontaabu betumi ayɛ kɛse dodo.



### - a worehyehy3 Mining:

  - Wobetumi asiesie Zebra ama mining denam *MINER_ADDRESS* ne port mapping a wɔbɛkyerɛ wɔ Docker mu no so. Wobetumi ahu nsɛm foforo wɔ yɛn [Mining support documentation](https://zebra.zfnd.org/user/mining-docker.html).


### - Custom Build Nneɛma a ɛwɔ hɔ:

  - Trɛw Zebra dwumadie mu denam Cargo nneɛma foforɔ te sɛ Prometheus metrics, Sentry monitoring, experimental Elasticsearch support, ne nea ɛkeka ho.

  - Fa nneɛma pii bom denam din a wobɛkyerɛw sɛ parameters of the `--features` frankaa bere a wɔde rehyɛ mu.


### Hyɛ no nsow: Wɔayɛ debugging ne monitoring features binom adwuma wɔ release builds mu na ama adwumayɛ ayɛ yie.

Sɛ wopɛ nhwehwɛmu ne developer nneɛma a wɔahyehyɛ no yiye a, yɛsrɛ wo hwɛ yɛn [API nkrataa](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags).
 

# System Ahwehwɛde ne Network Nsiesiei ma Zebra

Sɛnea ɛbɛyɛ a yɛbɛhwɛ sɛ adwumayɛ yɛ adwuma yiye na wotumi de ho to so no, yɛkamfo nhyehyɛe a edidi so yi ahwehwɛde ahorow a ɛfa zebrad a wɔboaboa ano na wɔde tu mmirika, Zcash node a ɛyɛ nsakrae a wɔasisi no nyinaa wɔ Rust mu no kyerɛ:

### Nhyehyɛe a Wɔhwehwɛ:
- CPU: CPU ntini 4
- RAM: 16 GB na ɛwɔ hɔ
- Disk Space: 300 GB disk space a ɛwɔ hɔ a wɔde boaboa binaries ano na wɔde sie cached chain state
- Network: 100 Mbps network nkitahodi a anyɛ yiye koraa no, 300 GB uploads ne downloads ɔsram biara


Yɛsrɛ sɛ hyɛ no nsow sɛ Zebra sɔhwɛ suite no betumi agye bɛboro dɔnhwerew biako ansa na wɔawie a egyina wo mfiri no ho nsɛm so. Bere a ebia nhyehyɛe ahorow a ɛyɛ brɛoo betumi aboaboa Zebra ano na wɔde adi dwuma no, yennya nsii adwumayɛ anohyeto pɔtee denam sɔhwɛ so.


### Disk a Wɔhwehwɛ:
- Zebra de bɛyɛ 300 GB di dwuma ma Mainnet data a wɔakora so ne 10 GB ma Testnet data a wɔakora so. Hwɛ kwan sɛ disk a wɔde di dwuma no bɛkɔ soro bere a bere kɔ so no.
- Wɔtaa siesie database no, titiriw bere a wɔreto mu anaasɛ wɔresan afi ase bio, na ɛhwɛ hu sɛ data no yɛ pɛ. Nsakrae a enni mũ esiane sɛ wɔhyɛ wɔn ma wogyae adwuma anaasɛ ehu nti no, wɔsan kɔ akyi bere a wɔasan afi Zebra ase no.


### Network Ahwehwɛde ne Ports:
- Zebra de TCP ports a edidi so yi di dwuma ma inbound ne outbound nkitahodi:
  - 8233 ma Mainnet
  - 18233 ma Testnet
- Sɛ wode listen_addr pɔtee bi hyehyɛ Zebra a, ɛma wotumi bɔ address yi ho dawuru ma nkitahodi a ɛba mu. Bere a outbound connections ho hia ma synchronization no, inbound connections yɛ nea wobetumi apaw.
- Zcash DNS seeders a wobɛkɔ no ho hia denam OS DNS resolver (mpɛn pii no port 53) so.
- Bere a Zebra betumi ayɛ outbound connections wɔ port biara so no, zcashd pɛ peers wɔ default ports so de brɛ DDoS ntua ase wɔ network afoforo so.


### Mainnet Network a Wɔtaa De Di Dwuma:
- Initial Sync: Ɛsɛ sɛ wɔtwe 300 GB ma synchronization a edi kan no, na wɔhwɛ kwan sɛ ɛbɛkɔ soro wɔ downloads a edi hɔ no mu.
- Nsakraeɛ a Ɛkɔ So: Hwɛ kwan sɛ wobɛfa so na woatwe da biara da a ɛfiri 10 MB kɔsi 10 GB, a egyina ɔdefoɔ no nkitahodiɛ akɛseɛ ne atipɛnfoɔ abisadeɛ so.
- Zebra fi ase yɛ mfitiaseɛ sync ne emu database version nsakraeɛ biara, a ɛbɛtumi ahia sɛ wɔtwe full chain downloads wɔ version upgrades mu.
- Wɔpɛ atipɛnfo a wɔde bere a wɔde kɔ baabi foforo a ɛyɛ sikɔne 2 anaa nea ennu saa. Sɛ latency boro saa threshold yi a, yɛsrɛ sɛ fa tekiti mena na woanya mmoa.


Sɛ wodi saa nyansahyɛ ne nhyehyeɛ yi so a, wobɛtumi ama Zebra ayɛ adwuma yie na ayɛ adwuma yie wɔ Zcash ntam. Sɛ wuhyia nsɛm bi anaasɛ wuhia mmoa foforo a, yɛn mmoa kuw no wɔ hɔ ntɛm ara sɛ wɔde akwankyerɛ bɛma.


Link a ɛkɔ Zebra Node Installation akwankyerɛ no so ni:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra 

<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nneɛma a Wɔde Yɛ Nneɛma

Nneɛma a ɛsɛ sɛ wode si Zcash so, a wɔahyehyɛ no akuwakuw sɛnea emu biara yɛ ma sen sɛ wɔbɛbobɔ din wɔ akuwakuw biako mu.

The stack changed a great deal in 2026. zcashd, a ɛhwɛɛ network no so wɔ n’abakɔsɛm fã kɛse no ara mu no, duu n’asetra awiei wɔ 18 July 2026 wɔ block height 3417100, na node biara a wɔansakra no no too mu wɔ saa sorokɔ no mu na ɛbɛpow sɛ ɛbɛsan afi ase bio. Akwankyerɛ a wɔakyerɛw ama zcashd yɛ abakɔsɛm mprempren sen sɛ ɛbɛyɛ mfiase, enti wɔahyehyɛ krataafa yi atwa nea ɛde sii ananmu no ho ahyia.

## Stack no wɔ animtiaabu mu

| Layer | Nea wɔde bedi dwuma | Fi ase wɔ |
|:--|:--|:--|
| Full node | Zebra or Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com na ɛwɔ hɔ](https://zakura.com/) |
| Full node sika kotoku | Zallet, wɔ beta mu | [Zallet Nhoma no](https://zcash.github.io/zallet/) |
| Hann sika kotoku server | Zaino anaasɛ lightwalletd | [Zaino na ɔkyerɛwee](https://github.com/zingolabs/zaino), [lightwalletd a wɔde ahyɛ mu](https://github.com/zcash/lightwalletd) |
| Wallet nhomakorabea ahorow | Na librustzcash nnaka no | [librustzcash a wɔde di dwuma](https://github.com/zcash/librustzcash) |
| Mobile so | Android ne iOS SDK ahorow | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Nsɛm a Wɔakyerɛkyerɛ mu | Protocol spec ne ZIP ahorow | [zips.z.sika a wɔde yɛ adwuma](https://zips.z.cash) |

## Nodes a ɛwɔ hɔ

Node bi di adwene a ɛwɔ hɔ no ho adanse na ɛkura nkɔnsɔnkɔnsɔn no. Nneɛma abien na ɛwɔ hɔ a wɔde nsiyɛ ayɛ.

[Zebra](/zcash-tech/zebra-full-node) yɛ Zcash Foundation node, a wɔakyerɛw wɔ Rust mu, na ɛyɛ nea akwankyerɛfo dodow no ara susuw mprempren. [The Zebra Book](https://zebra.zfnd.org/) kata sɛnea wɔde besisi hɔ na wɔde ayɛ adwuma, ne [adekorabea](https://github.com/ZcashFoundation/zebra) ne baabi a nkɔso kɔ so.

[Zakura na ɔkyerɛwee](/zcash-tech/zakura-node) yɛ node foforo, a n'akyerɛwfo kaa ho asɛm sɛ "consensus-compatible Zcash full node, built for scale", a ɛwɔ sync ntɛmntɛm, block pruning ne zcashd compatibility mode. Sean Bowe, a ɔne no hyehyɛɛ Zcash, ne Dev Ojha na wodi anim. Ɛyɛ open source wɔ Apache 2.0 ase wɔ [zakura-core/zakura a ɛwɔ hɔ no](https://github.com/zakura-core/zakura).

ZecHub wɔ a [Nodes a Ɛyɛ Pɛ](/zcash-tech/full-nodes) kratafa a ɛka aguadi a ɛda wɔn ntam no ho asɛm.

## Node sika kotoku a ɛyɛ ma no

zcashd boaboaa sika kotoku bi ano ne node no. Saa sika kotoku no nni hɔ bio, na [Zallet na ɔkyerɛwee](https://github.com/zcash/zallet) ne nea wɔde besi ananmu. Zallet Nhoma no ka ho asɛm sɛ "Zcash sika kotoku a ɛwɔ node mũ a wɔakyerɛw wɔ Rust mu" a "wɔasi sɛ nea wɔde besi zcashd sika kotoku ananmu".

Kenkan ahobammɔ ho kɔkɔbɔ no ansa na wode wo ho ato so. Zallet wɔ beta mu, "wɔnhwɛɛ mu koraa", nsakraeɛ a ɛbubu "betumi aba bere biara, a ɛhia sɛ wopopa na wosan yɛ wo Zallet sika kotokuo", na ɛnyɛ zcashd RPC kwan biara na wɔde akɔ baabiara.

Sɛ woretu nhyehyɛe bi a ɛwɔ hɔ dedaw no akɔ a, ZecHub wɔ a [atutra ho akwankyerɛ fi zcashd kɔ Zebra ne Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) ne a [Zallet ntɛm a wɔde kyerɛw nsɛm](/using-zcash/zallet-quick-reference-guide).

## Hann sika kotoku servers

Wallet dodow no ara ntumi nkɔ node biara so. Wɔne server bi a ɛkora nkɔnsɔnkɔnsɔn no so kasa na ɛsan de ne nsa kɔ akyi sɛnea ɛbɛyɛ a wobetumi ahu no ketewaa bi.

[lightwalletd a wɔde ahyɛ mu](https://github.com/zcash/lightwalletd) yɛ mfitiaseɛ dwumadie, a wɔkyerɛwee wɔ Go mu, a wɔaka ho asɛm sɛ "akyi dwumadie a ɛma bandwidth-efficient interface ma Zcash blockchain". [Zaino na ɔkyerɛwee](/zcash-tech/zaino) yɛ indexer foforo, a wɔde Rust akyerɛw, na ɛkenkan fi validator a edi mũ mu sen sɛ ɛbɛsoa n’ankasa nkɔnsɔnkɔnsɔn no bi.

No [Hann Adetɔfoɔ Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) nkrataa a wɔde kyerɛw nsɛm no kata protocol no ankasa so. No [Lightwallet Nodes a Wɔde Di Dwuma](/zcash-tech/lightwallet-nodes) krataafa no ka nea saa server ahorow yi betumi ahu ne nea wontumi nhu wɔ obi a ɔde di dwuma ho, a ɛfata sɛ wote ase ansa na woapaw biako.

## Sika kotoku a wɔreyɛ

Sika kotoku adwuma dodow no ara kɔ so wɔ Rust crates ase [librustzcash a wɔde di dwuma](https://github.com/zcash/librustzcash), a mobile SDK ahorow ne desktop sika kotoku pii si so. Wɔakyerɛw adaka biara ho nsɛm wɔ so [docs.rs](https://docs.rs).

| Crate | Nea ɛyɛ ma |
|:--|:--|
| zcash_client_akyi asɛm | "APIs a wɔde yɛ Zcash hann afɛfo a wɔabɔ wɔn ho ban", a sync ne nkitahodi adansi ka ho |
| zcash_afɛfoɔ_sqlite | "Zcash hann afɛfoɔ a egyina SQLite so", akoraeɛ layer ma atifi hɔ |
| zcash_nsɛmfua | "Zcash safoa ne address sohwɛ" |
| zcash_mfitiasefoɔ | "Rust implementations a ɛwɔ Zcash primitives no mu" |
| zcash_protocol a wɔde yɛ adwuma | "Zcash protocol ntwamutam daa ne botae ahorow" |
| nnuaba turo | "Orchard a wɔabɔ ho ban no ayɔnkofa protocol" |
| nnuadewa-kripto | "Cryptographic nhomakorabea ma Zcash Sapling" |
| pczt a wɔde yɛ adwuma | "Nnwinnade a wɔde yɛ adwuma ne Zcash nkitahodi a wɔabɔ no fã bi", wɔde di dwuma ma hardware ne mfiri pii nsaano nkyerɛwee |
| zip321 na ɛwɔ hɔ | URI ahorow a wɔde tua ho ka, sɛnea wɔakyerɛ wɔ ZIP 321 |

Wɔ mobile ho no, na... [Android SDK na ɛyɛ adwuma](https://github.com/zcash/zcash-android-wallet-sdk) ne nea [iOS SDK na ɛyɛ adwuma](https://github.com/zcash/zcash-swift-wallet-sdk) kyekyere saa nhomakorabea ahorow no ho. Kan no na wɔfrɛ iOS akoraeɛ no ZcashLightClientKit, enti link ne nsɛm dedaw no de saa din no di dwuma.

## Nsɛm a wɔakyerɛkyerɛ mu ne cryptography

No [protocol ho nkyerɛkyerɛmu](https://zips.z.cash/protocol/protocol.pdf) ne tumidi a ɛfa sɛnea Zcash yɛ adwuma ho, a nea ɛka ho ne [address ne key encodings](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys).

[ZIP ahorow a wɔde yɛ adwuma](https://zips.z.cash) yɛ baabi a wɔahyɛ nsakrae ho nyansa na wɔakyerɛ, na index no kyerɛ nea ɛyɛ nsɛm a wɔakyerɛw ne nea etwa to. Consensus nsakraeɛ hyɛn wɔ network upgrades mu, na ZecHub di wɔn a wɔwɔ [Network Nkɔsoɔ a Wɔayɛ](/start-here/network-upgrades) kratafa.

Sɛ wopɛ cryptography a ɛwɔ ase hɔ no a, kenkan [Halo2 Nhoma no](https://zcash.github.io/halo2/index.html) ne [The Orchard Book](https://zcash.github.io/orchard/), a ɛne [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) ne [nnuaba turo](https://docs.rs/orchard/latest/orchard/) crate docs wɔ nkyɛn. [FROST Nhoma no](https://frost.zfnd.org/) kata threshold signatures so, na ZecHub wɔ a [FROST](/zcash-tech/frost) kratafa.

## Testnet a wɔde sɔ hwɛ

Testnet yɛ nkɔnsɔnkɔnsɔn a ɛyɛ soronko a sika a mfaso nni so wom, a wɔfrɛ no TAZ. Zebra ne Zakura nyinaa betumi atu mmirika atia no, na... [testnet akwankyerɛ](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) kata node nhyehyɛe so.

[testnet.zcashexplorer.ap a wɔde yɛ nhwehwɛmu no](https://testnet.zcashexplorer.app/) yɛ testnet block explorer a ɛyɛ adwuma, a mainnet yɔnko wɔ [mainnet.zcashexplorer.ap a wɔde di dwuma wɔ ɔkwan a ɛyɛ nwonwa so](https://mainnet.zcashexplorer.app/).

TAZ a wubenya no yɛ ɔfã a ɛyɛ fɛre ade. Ɔmanfo faucets pue na ɛyera, na na nea wɔde bata ho fi nkrataa dedaw mu no ntumi nyɛ ho hwee bere a wɔkyerɛw kratafa yi no. Ɔkwan a wotumi de ho to so ne sɛ wobɛbisa wɔ Zcash R&D Discord mu, a ɛno ne nea Zcash nkrataa no ankasa kyerɛ.

## Nwoma a wɔde kyerɛw nneɛma nyinaa

[Zcash Nwoma a Wɔde Yɛ Adwuma](https://zcash.readthedocs.io/en/latest/) ɛda so ara yɛ fibea biako a ɛtrɛw sen biara, a ɛfa protocol adwene, nkabom ne mining ho. Fa ahwɛyiye bi kenkan. Wɔayɛ no versioned tia zcashd, enti n'afã bi kyerɛkyerɛ node a ɛnnyɛ adwuma bio, bere a protocol ne light client afã horow no da so ara yɛ mfaso. [Zcash Wallet App Ahunahuna Nhwɛso no](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) a ɛte hɔ no fata sɛ wokenkan ansa na woayɛ biribiara a ɛka nea ɔde di dwuma no kokoam nsɛm.

Sɛ woyɛ foforo wɔ blockchains mu mpɛn pii a, . [Bitcoin a wobɛyɛ no yiye](https://github.com/bitcoinbook/bitcoinbook) yɛ nyansahyɛ a wɔtaa de ma wɔ nnyinasosɛm ahorow a wɔkyɛ ho, na ɛwɔ ahofadi sɛ wobɛkenkan ne nyinaa. Ɛnka nnwuma a wɔabɔ ho ban ho asɛm.

## Nnwinnade afoforo a wɔn a wɔyɛ no aka ho asɛm

[Arti](https://docs.rs/arti/latest/arti/) yɛ Tor Rust dwumadie, a zcash_client_backend de di dwuma de fa sika kotokuo akwantuo kwan. [Dua a wɔde yɛ nneɛma](https://github.com/tailscale/tailscale) ba ma connecting to node a w'ankasa wo tu mmirika. [warp2](https://github.com/hhanh00/warp2) yɛ sync dwumadie a Hanh de di dwuma ntɛmntɛm, ɛwom sɛ wɔannyɛ no foforɔ firi afe 2023.

## Mpɔtam hɔ ne nsɛm a esisi

No [Zcash R&D Nkitahodi](https://discord.gg/6AK7keWFaK) ne baabi a wɔka protocol ne wallet nkɔso ho asɛm, na [Zcash Mpɔtam Hɔ Nhyiam](https://forum.zcashcommunity.com/) kura nsusuwii atenten ne nhama a wɔde boa.

Nnansa yi hackathon aba no yɛ nea nkurɔfo rekyekye ho mfonini pa: [ZecHub 2024 na ɔkyerɛwee](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025 na ɔkyerɛwee](https://x.com/ZecHub/status/1975565960661635283) ne nea [Zypherpunk Hackathon a wɔyɛe wɔ afe 2025 mu](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Nneɛma a wɔakɔ pɛnhyen

Wɔde sie efisɛ nsɛm dedaw no bata wɔn ho, na esiane sɛ wɔda so ara yɛ nea wɔde gyina hɔ ma sɛnea node a wɔakɔ pɛnhyen no yɛɛ n’ade nti. Mfi ase wɔ ha.

[Zcashd Nhoma no](https://zcash.github.io/zcash/) ne nea [zcashd RPC nkyerɛkyerɛmu](https://zcash.github.io/rpc/) document software a ɛduruu [nkwa awiei](https://zcash.github.io/zcash/user/end-of-life.html) wɔ July 2026. Ɔde ne nsa kyerɛɛ ne so [zcash/zcash a wɔde di dwuma](https://github.com/zcash/zcash) wɔde nneɛma akorae no asie.

Sɛ wowɔ resource bi a wode bɛka ho, anaasɛ wuhu biribi wɔ ha a ayɛ stale a, bue issue anaa pull request. Ɛnyɛ bere nyinaa na akuw ahorow wɔ tumi a wɔde bɛma biribiara akɔ so ayɛ nea ɛwɔ hɔ mprempren, na nea wutuu mmirika kɔɔ mu no frankaa a wode bɛhyɛ mu no boa ma wɔkyerɛ akwankyerɛfo no kwan.

**Wɔyɛɛ no ​​foforo nea etwa to:** August 2026

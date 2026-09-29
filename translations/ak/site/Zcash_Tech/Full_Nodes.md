<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodes a Ɛyɛ Pɛ

## TL;DR

- Node a edi mũ sie Zcash blockchain no mfonini a edi mũ na ɛhwɛ block foforo biara ne asɛm a ɛne mmara a wɔpene so no hyia.
- Zebra (`zebrad`) ne node a ɛsɛ sɛ wode hyehyɛ mu nnɛ. Zakura yɛ dwumadie a ɛtɔ so mmienu, forked fi Zebra.
- zcashd yɛ obi a wakɔ pɛnhyen. Wɔduruu ne End-of-Support gyinabea wɔ 18 July 2026 wɔ block height 3417100, na saa nodes no mfi aseɛ bio.
- Mprempren node ne wallet no yɛ nhyehyɛe ahorow a ɛsono emu biara. [Zallet](https://github.com/zcash/zallet) tu mmirika tia node bi na okura nsafe no.
- W’ankasa node a wode bedi dwuma no ma wunya ahotoso a ɛde ne ho na eyi hia a ehia sɛ wode wo ho to obi foforo server so no fi hɔ.

## Nkyerɛkyerɛmu Titiriw

Full Node yɛ software a ɛyɛ cryptocurrency blockchain no mfonini a edi mũ, na ɛma wunya kwan kɔ protocol no mu nneɛma so.

Ɛkura kyerɛwtohɔ a edi mũ a ɛfa asɛm biara a asi fi genesis ho na enti ɛtumi hwɛ sɛ nkitahodi foforo ne blocks a wɔde aka blockchain no ho no yɛ nokware.

## Node Nneɛma a Wɔde Di Dwuma

### Zebra

Zebra yɛ Zcash protocol no a ɛde ne ho, ayɛ krado sɛ ɛyɛ node a edi mũ a wɔde di dwuma, a Zcash Foundation na ɛyɛe na wɔkyerɛwee wɔ Rust mu. Sɛnea zcashd akɔ pɛnhyen no, Zebra (`zebrad`) yɛ node a edi mũ a wɔkamfo kyerɛ ma deployments foforo.

Zebra di blocks ne transactions ho adanseɛ, ɛde ne ho hyɛ peer-to-peer network no mu, na ɛda RPC interface bi adi ma applications. Sika kotoku no yɛ ade a ɛyɛ soronko mprempren: [Zallet](https://github.com/zcash/zallet) tu mmirika tia Zebra node na ɛdi safe ne kari pɛ ho dwuma. Wei besi zcashd, a ɛboaboaa node ne sika kotoku no ano wɔ adeyɛ biako mu.

Sɛnea ɛbɛyɛ na wɔasom sika kotoku a kanea a wɔabɔ ho ban no, node no tu mmirika kɔ indexer bi nkyɛn, anaasɛ nea wɔde asi hɔ no [lightwalletd](https://github.com/zcash/lightwalletd) anaa nea ɛyɛ foforo no [Zaino](https://zechub.wiki/zaino).

Hwɛ sɛ wobɛkenkan Zebra nwoma no ama nhyehyeɛ akwankyerɛ, na kɔka R&D Discord server no ho na woanya mmoa.

[Github a wɔde di dwuma](https://github.com/ZcashFoundation/zebra/)

[Zebra Nhoma no](https://zebra.zfnd.org)

Hwɛ [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) ma instɔlehyɛn anammɔn, nhyehyeɛ, ne hardware ahwehwɛdeɛ.

### Zakura

Zakura yɛ node a ɛtɔ so mmienu a ɛne adwene hyia a ɛne ne ho hyia, a wɔde forked afiri Zebra mu na Valar Kuo no ne Project Tachyon boom yɛɛ. Ɛdi protocol mmara korɔ no ara akyi na ɛde synchronization a ɛyɛ ntɛm, block pruning, ne zcashd RPC compatibility layer ka ho. Hwɛ [Zakura Node na ɔkyerɛwee](/zcash-tech/zakura-node).

### zcashd (wɔakɔ pɛnhyen)

> **Hyɛ no nsow:** zcashd akɔ pɛnhyen. Electric Coin Company [de too gua sɛ wɔabu no animtiaa](https://z.cash/support/zcashd-deprecation/), na wɔduruu automatic End-of-Support halt no so wɔ 18 July 2026 wɔ block height 3417100. zcashd 6.20.0 node biara a wɔansakra no no to mu wɔ saa sorokɔ no so na ɛpow sɛ ɛbɛsan ahyɛ aseɛ, na software no ntumi mmoa NU6.3. Fa Zebra. Sɛ wokura zcashd `wallet.dat`, di akyi [Akwankyerɛ a ɛfa atutra ho: zcashd kɔ Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd yɛ mfitiaseɛ Full Node dwumadie ma Zcash, a Electric Coin Company. Wɔakora adansi akwankyerɛ a ɛwɔ aseɛ ha no so ama nhwɛsoɔ ne ama adwumayɛfoɔ a wɔretu afiri zcashd.

Zcashd da API ahorow bi adi denam ne RPC ntamgyinafo so. Saa API yi ma dwumadie a ɛma abɔnten dwumadie ahodoɔ tumi ne node no di nkitaho.

[Lightwalletd a wɔde ahyɛ mu](https://github.com/zcash/lightwalletd) yɛ nhwɛsoɔ a ɛfa application a ɛde node a ɛyɛ pɛpɛɛpɛ di dwuma de ma developers tumi yɛ na wɔhwɛ mobile-friendly shielded light wallets a ɛho nhia sɛ wɔne Zcashd di nkitaho tẽẽ.

[RPC ahyɛdeɛ a wɔboa no nyinaa](https://zcash.github.io/rpc/)

[Zcashd nhoma no](https://zcash.github.io/zcash/)

#### Hyɛ Node (Linux) bi ase

- Fa Dependencies (Nneɛma a Ɛgyina So no hyɛ mu

      sudo apt a ɛyɛ foforo

      sudo apt-nya instɔlehyɛn \
      ɔdan-a ɛho hia pkg-nhyehyɛe libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev yi zip git python3 python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake yɛ libtinfo5

- Clone a ɛtwa toɔ a wɔayi no adi, checkout, setup ne build:

      git clone a wɔde yɛ nneɛma https://github.com/zcash/zcash.git

      cd zcash/ 2019

      git checkout v5.4.1
      ./zcutil/fa-params.sh
      ./zcutil/ahotew.sh
      ./ zcutil / si.sh -j $ (nproc)

- Sync Blockchain (ebia ebegye nnɔnhwerew pii)

    Sɛ wopɛ sɛ wohyɛ node no ase a, tu mmirika:

      ./src/zcashd

- Wɔde Private Keys asie wɔ ~/.zcash/wallet.dat mu

[Akwankyerɛ ma Zcashd wɔ Raspberry Pi so](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Nkyerɛkyerɛmu a mfaso wɔ so

### Netwɛk no

Ɛdenam node a edi mũ a wobɛtu mmirika so no, woreboa ma zcash ntam nkitahodi no ayɛ den denam ne decentralization a wobɛboa no so.

Eyi boa ma wosiw adversarial control ano na ɛma network no gyina ɔhaw ahorow bi ano.

DNS seeders da node afoforo a wotumi de ho to so a wɔahyehyɛ adi denam server a wɔasisi mu so. Wei ma nkitahodi ahorow no trɛw wɔ ntwamutam no nyinaa mu.

### Network Stats a ɛwɔ hɔ

Eyinom yɛ nhwɛso platform ahorow a ɛma kwan ma wotumi kɔ Zcash Network data so:

[Zcash Block Nhwehwɛmufoɔ](https://zcashblockexplorer.com)

[Coinmetrics a wɔde yɛ nneɛma](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

Wo nso wobɛtumi aboa ama ntwamutam no anya nkɔsoɔ denam sɔhwɛ a wobɛtu mmirika anaasɛ wobɛhyɛ nkɔsoɔ foforɔ ho nyansa & metrics a wode bɛma.

### Nneɛma a wotu fagude

Miners hwehwɛ nodes a edi mũ na ama wɔanya RPC ahorow a ɛfa mining ho nyinaa te sɛ getblocktemplate & getmininginfo.

Zcashd nso ma wotumi tu fagude kɔ shielded coinbase. Miners ne mining pools wɔ hokwan sɛ wɔbɛtu fam tẽẽ de aboaboa ZEC a wɔabɔ ho ban wɔ z-address mu default so.

Kan [Akwankyerɛ a Ɛfa Mining Ho](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) anaa kɔka Community Forum krataafa no ho ma [Zcash Miners a wɔyɛ adwuma wɔ hɔ](https://forum.zcashcommunity.com/c/mining/13).

### Kokoamusɛm

Sɛ wode node a edi mũ di dwuma a, ɛma wutumi de wo ho hwɛ nnwuma ne blocks nyinaa a ɛwɔ Zcash network no so.

Sɛ wode node a edi mũ di dwuma a, kwati kokoam asiane ahorow bi a ɛbata sɛ wode nnwuma a ɛto so abiɛsa bedi dwuma de ahwɛ sɛ nnwuma a wɔyɛ wɔ wo ananmu no yɛ nokware.

W’ankasa node a wode bedi dwuma nso ma kwan ma wofa so kɔ network no so [Tor](https://zcash.github.io/zcash/user/tor.html).
Eyi wɔ mfaso foforo a ɛne sɛ ɛma afoforo a wɔde di dwuma no kwan ma wɔde wɔn ho hyɛ wo node .onion address no so wɔ kokoam.

## Mfomso a Ɛtaa Tu

- Building zcashd fi akwankyerɛ a ɛwɔ atifi hɔ no mu na wɔhwɛ kwan sɛ node a ɛyɛ adwuma. Saa binaries no gyina wɔ deprecation height no so.
- Node a wobɛtu mmirika na woafa no sɛ wo mobile wallet no de di dwuma seesei. Sika kotoku a emu yɛ hare kɔ so ne server biara a wɔde asiesie no kasa kosi sɛ wobɛtwe adwene asi w’ankasa so. Hwɛ [Lightwallet Nodes a Wɔde Di Dwuma](/zcash-tech/lightwallet-nodes).
- Mmirikatu nkutoo `zebrad` na wɔhwɛ kwan sɛ sika kotoku a emu yɛ hare bɛka ho. Node no hia indexer wɔ ne nkyɛn, sɛ ɛyɛ lightwalletd anaa [Zaino](/zcash-tech/zaino).
- Hwehwɛ wallet RPCs wɔ node no so. Keys ne balances tu kɔɔ Zallet.

## Nkratafa a Ɛfa Ho

- [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) - install, hyehyɛ, na fa node a wɔkamfo kyerɛ no di dwuma
- [Zakura Node na ɔkyerɛwee](/zcash-tech/zakura-node) - a eto so mmienu node dwumadie, forked firi Zebra
- [Lightwallet Nodes a Wɔde Di Dwuma](/zcash-tech/lightwallet-nodes) - servers a hann wallet bisa
- [Zaino](/zcash-tech/zaino) - a ɛyɛ Rust indexer a ɛsom hann sika kotokuo
- [Zcash Sikakorabea Syncing](/zcash-tech/zcash-wallet-syncing) - adee nti na syncing y adwuma sedee eye no

## Adesua a Ɛkɔ Akyiri

Kan [Nwoma a Wɔde Boa](https://zcash.readthedocs.io/en/latest/)

Kɔka yɛn ho [Discord Server a Wɔde Di Dwuma](https://discord.gg/zcash) anaasɛ fa wo nsa kɔ yɛn nkyɛn wɔ [X](https://X.com/ZecHub)

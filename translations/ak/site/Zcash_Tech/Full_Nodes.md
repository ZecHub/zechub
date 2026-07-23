<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodes a Ɛyɛ Pɛ

Full Node yɛ software a ɛyɛ cryptocurrency biara blockchain no mfonini a edi mũ a ɛma kwan kɔ protocols features no so.

Ɛkura kyerɛwtohɔ a edi mũ a ɛfa asɛm biara a asi fi genesis ho na enti ɛtumi hwɛ sɛ nkitahodi foforo ne blocks a wɔde aka blockchain no ho no yɛ nokware.

## Zcashd na ɛyɛ adwuma

> **Hyɛ no nsow:** wɔregyae zcashd. Electric Coin Company no [abɔ amanneɛ wɔ ɔkwan a ɛfata so](https://z.cash/support/zcashd-deprecation/) sɛ wɔregyae zcashd, a wɔde [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) ne ne sika kotoku dwumadi a [Zallet](https://github.com/zcash/zallet). Sɛ wopɛ deployments foforo a, fa Zebra di dwuma (hwɛ ase hɔ). Sɛ woreyɛ zcashd node dedaw a, di [Migration Guide: zcashd to Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd yɛ mfitiaseɛ Full Node dwumadie ma Zcash, a Electric Coin Company na ɛyɛeɛ na ɛhwɛɛ so. Wɔakora adansi akwankyerɛ a ɛwɔ aseɛ ha no so ama nhwɛsoɔ ne ama adwumayɛfoɔ a wɔretu afiri zcashd.

Zcashd da API ahorow bi adi denam ne RPC ntamgyinafo so. Saa API yi ma dwumadie a ɛma abɔnten dwumadie ahodoɔ tumi ne node no di nkitaho.

[Wɔde kanea a wɔde kyerɛw nsɛm](https://github.com/zcash/lightwalletd) yɛ nhwɛsoɔ a ɛfa application a ɛde node a ɛyɛ pɛpɛɛpɛ di dwuma de ma developers tumi yɛ na wɔhwɛ mobile-friendly shielded light wallets a enhia sɛ wɔne Zcashd di nkitaho tẽẽ.

[RPC ahyɛdeɛ a wɔboa no nyinaa](https://zcash.github.io/rpc/)

[Zcashd nhoma no](https://zcash.github.io/zcash/)


### Hyɛ Node (Linux) bi ase .

- Fa Dependencies (Nneɛma a Ɛgyina So no hyɛ mu 

      sudo apt a ɛyɛ foforo

      sudo apt-nya instɔlehyɛn \ .
      ɔdan-a ɛho hia pkg-nhyehyɛe libc6-dev m4 g++-multilib \ .
      autoconf libtool ncurses-dev yi zip git python3 python3 python3-zmq \ .
      zlib1g-dev curl bsdmainutils automake yɛ libtinfo5

- Clone a ɛtwa toɔ a wɔayi no adi, checkout, setup ne build:

      git clone a wɔde yɛ nneɛma https://github.com/zcash/zcash.git

      cd zcash/ 2019.

      git checkout v5.4.1
      ./zcutil/fa-params.sh
      ./zcutil/ahotew.sh
      ./ zcutil / si.sh -j $ (nproc) .

- Sync Blockchain (ebia ebegye nnɔnhwerew pii) .

    Sɛ wopɛ sɛ wohyɛ node run no ase a:

      ./src/zcashd na ɛyɛ adwuma

- Wɔde Private Keys asie wɔ ~/.zcash/wallet.dat mu

[Akwankyerɛ ma Zcashd wɔ Raspberry Pi so](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra yɛ Zcash protocol no a ɛde ne ho, ayɛ krado sɛ ɛyɛ node a edi mũ a wɔde di dwuma, a Zcash Foundation na ɛyɛe na wɔkyerɛwee wɔ Rust mu. Sɛnea zcashd akɔ pɛnhyen no, Zebra (`zebrad`) yɛ node a edi mũ a wɔkamfo kyerɛ ma deployments foforo.

Zebra di blocks ne transactions ho adanseɛ, ɛde ne ho hyɛ peer-to-peer network no mu, na ɛda RPC interface bi adi ma applications. Sika kotoku no yɛ ade a ɛyɛ soronko mprempren: [Zallet](https://github.com/zcash/zallet) tu mmirika tia Zebra node na ɛdi safe ne kari pɛ ho dwuma. Wei besi zcashd ananmu, a ɛboaboaa node ne sika kotoku no ano wɔ adeyɛ biako mu.

Sɛnea ɛbɛyɛ a wɔbɛsom kanea sika kotoku a wɔabɔ ho ban no, node no tu mmirika kɔ indexer bi nkyɛn, anaasɛ nea wɔde asi hɔ [lightwalletd](https://github.com/zcash/lightwalletd) anaasɛ foforo no [Zaino](https://zechub.wiki/zaino).

Hwɛ sɛ wobɛkenkan Zebra nwoma no ama nhyehyeɛ akwankyerɛ, na kɔka R&D Discord server no ho na woanya mmoa. 

[Github a wɔde kyerɛw nsɛm](https://github.com/ZcashFoundation/zebra/)

[The Zebra Book](https://zebra.zfnd.org) 

[Akasakasa](https://discord.gg/uvEdHsrb)



## Netwɛk no

Ɛdenam node a edi mũ a wobɛtu mmirika so no woreboa ma zcash ntam nkitahodi no ayɛ den denam ne decentralization a wobɛboa no so. 

Eyi boa ma wosiw adversarial control ano na ɛma network no gyina ɔhaw ahorow bi ano.

DNS seeders da node afoforo a wotumi de ho to so a wɔahyehyɛ adi denam server a wɔasisi mu so. Wei ma nkitahodi ahorow trɛw wɔ nkitahodi nhyehyɛe no nyinaa mu. 

### Network Stats a ɛwɔ hɔ

Eyinom yɛ nhwɛso platform ahorow a ɛma kwan ma wotumi kɔ Zcash Network data so:

[Zcash Block Nhwehwɛmufoɔ](https://zcashblockexplorer.com)

[Nneɛma a wɔde yɛ nneɛma](https://docs.coinmetrics.io/info/assets/zec)

[Akongua a wɔde si dan mu](https://blockchair.com/zcash)

Wo nso wobɛtumi aboa ama ntwamutam no anya nkɔsoɔ denam sɔhwɛ a wobɛtu mmirika anaasɛ wobɛhyɛ nkɔsoɔ foforɔ ho nyansa & metrics a wode bɛma. 



### Nneɛma a wotu fagude

Miners hia nodes a edi mũ na ama wɔanya rpc a ɛfa mining ho nyinaa te sɛ getblocktemplate & getmininginfo. 

Zcashd nso ma wotumi tu fagude kɔ shielded coinbase. Miners ne mining pools wɔ hokwan sɛ wɔbɛtu fam tẽẽ de aboaboa ZEC a wɔabɔ ho ban wɔ z-address mu default so. 

Kenkan [Atuo Ho Akwankyerɛ](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) anaa Kɔka Community Forum krataafa no ho ma [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13).

### Kokoamusɛm 

Sɛ wode node a edi mũ di dwuma a, ɛma wutumi de wo ho hwɛ nnwuma ne blocks nyinaa a ɛwɔ Zcash network no so.

Sɛ wode node a edi mũ di dwuma a, ɛkwati kokoam asiane ahorow bi a ɛbata sɛ wode nnwuma a ɛto so abiɛsa bedi dwuma de ahwɛ sɛ nnwuma a wɔyɛ wɔ wo ananmu no yɛ nokware.

W’ankasa node a wode bedi dwuma nso ma kwan ma wofa [Tor](https://zcash.github.io/zcash/user/tor.html).
Eyi wɔ mfaso foforo a ɛne sɛ ɛma afoforo a wɔde di dwuma no kwan ma wɔde wɔn ho hyɛ wo node .onion address no so wɔ kokoam.


**Wohia Mmoa?**

Kenkan [Mmoa Nwoma](https://zcash.readthedocs.io/en/latest/)

Kɔka yɛn [Discord Sever](https://discord.gg/zcash) anaa fa wo nsa kɔ yɛn nkyɛn wɔ [twitter](https://twitter.com/ZecHub)




<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Full Nodes

## TL;DR

- full node na-edobe otu zuru ezu nke Zcash blockchain ma na-enyocha block ọhụrụ na Azụmahia [transaction] ọ bụla megide iwu consensus.
- Zebra (`zebrad`) bụ node a ga-etinye taa. Zakura bụ mmejuputa nke abụọ, nke e wepụtara site na Zebra.
- zcashd alala ezumike nka. A ruru nkwụsị End-of-Support ya na 18 Julaị 2026 n'ogo block 3417100, node ndị ahụ anaghịkwa amalite.
- node na e-akpa ego [wallet] bụzi mmemme dị iche iche. [Zallet](https://github.com/zcash/zallet) na-arụ ọrụ megide node ma na-edobe igodo.
- Ịrụ node nke gị na-enye gị nkwenye nọọrọ onwe ya ma wepụ mkpa ịtụkwasị sava onye ọzọ obi.

## Nkọwa Isi

Full Node bụ sọftụwia na-arụ otu zuru ezu nke blockchain cryptocurrency, nke na-enye gị ohere iji atụmatụ protocol ahụ.

Ọ na-edobe ndekọ zuru ezu nke Azụmahia ọ bụla mere kemgbe genesis, ya mere ọ nwere ike ikwenye izi ezi nke Azụmahia na block ọhụrụ ndị a gbakwunyere na blockchain.

## Mmejuputa Node

### Zebra

Zebra bụ mmejuputa full node nọọrọ onwe ya, dị njikere maka mmepụta, nke protocol Zcash, nke Zcash Foundation mepụtara ma dee ya na Rust. Ebe zcashd lara ezumike nka, Zebra (`zebrad`) bụ full node akwadoro maka ntinye ọhụrụ.

Zebra na-akwado block na Azụmahia, na-esonye na netwọk peer-to-peer, ma na-ekpughe interface RPC maka ngwa. e-akpa ego bụzi akụrụngwa dị iche: [Zallet](https://github.com/zcash/zallet) na-arụ ọrụ megide node Zebra ma na-ahụ maka igodo na nguzozi. Nke a na-edochi zcashd, nke jikọtara node na e-akpa ego n'otu usoro.

Iji jeere e-akpa ego ọkụ nke e chebere echebe [shielded] ozi, node na-arụkọ ọrụ na indexer, ma ọ bụ [lightwalletd](https://github.com/zcash/lightwalletd) e guzobeworo ma ọ bụ [Zaino](https://zechub.wiki/zcash-tech/zaino) ọhụrụ.

Jide n'aka na ị gụrụ akwụkwọ Zebra maka ntụziaka nhazi, ma sonye na sava R&D Discord maka nkwado.

[GitHub](https://github.com/ZcashFoundation/zebra/)

[Akwụkwọ Zebra](https://zebra.zfnd.org)

Lee [Zebra Full Node](/zcash-tech/zebra-full-node) maka usoro nrụnye, nhazi, na ihe achọrọ maka ngwaike.

### Zakura

Zakura bụ full node nke abụọ dabara na consensus, nke e wepụtara site na Zebra ma Valar Group na Project Tachyon mepụtara ọnụ. Ọ na-agbaso otu iwu protocol ahụ ma tinye mmekọrịta ngwa ngwa, ihichapụ block, na oyi akwa ndakọrịta RPC zcashd. Lee [Zakura Node](/zcash-tech/zakura-node).

### zcashd (lara ezumike nka)

> **Rịba ama:** zcashd alala ezumike nka. Electric Coin Company [kwuputara ịkwụsị ya](https://z.cash/support/zcashd-deprecation/), ma a ruru nkwụsị End-of-Support akpaka na 18 Julaị 2026 n'ogo block 3417100. Node zcashd 6.20.0 ọ bụla a na-agbanweghị kwụsịrị n'ogo ahụ ma jụ ịmaliteghachi, sọftụwia ahụ anaghịkwa akwado NU6.3. Jiri Zebra. Ọ bụrụ na ị nwere zcashd `wallet.dat`, soro [Ntuziaka Mbugharị: zcashd gaa zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd bụ mmejuputa Full Node mbụ maka Zcash, nke Electric Coin Company mepụtara ma na-elekọta. A na-edobe ntụziaka iwu dị n'okpuru maka ntụaka na maka ndị ọrụ na-ahapụ zcashd.

zcashd na-ekpughe otu API site na interface RPC ya. API ndị a na-enye ọrụ na-eme ka ngwa ndị dị n'èzí nwee ike iso node na-emekọrịta.

[lightwalletd](https://github.com/zcash/lightwalletd) bụ ọmụmaatụ ngwa na-eji full node eme ka ndị mmepụta nwee ike iwulite ma lekọta e-akpa ego ọkụ nke e chebere echebe dabara maka ekwentị na-enweghị iso zcashd na-emekọrịta ozugbo.

[Ndepụta zuru ezu nke iwu RPC akwadoro](https://zcash.github.io/rpc/)

[Akwụkwọ zcashd](https://zcash.github.io/zcash/)

#### Malite Node (Linux)

- Wụnye Ihe Ndị A Chọrọ

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clone mwepụta kachasị ọhụrụ, checkout, hazie ma wuo:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Mekọrịta Blockchain (nwere ike iwe ọtụtụ awa)

    Iji malite node, gbaa:

      ./src/zcashd

- A na-echekwa Igodo Nzuzo na ~/.zcash/wallet.dat

[Ntuziaka maka zcashd na Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Mmetụta Bara Uru

### Netwọk

Site n'ịrụ full node, ị na-enyere aka ime ka netwọk zcash sie ike site n'ịkwado decentralized [decentralized] ya.

Nke a na-enyere aka igbochi njikwa ndị iro ma mee ka netwọk ahụ nwee ike iguzogide ụdị ụfọdụ nke ọgba aghara.

DNS seeders na-ekpughe ndepụta node ndị ọzọ a pụrụ ịtụkwasị obi site na sava arụnyere n'ime ya. Nke a na-eme ka Azụmahia gbasaa na netwọk dum.

### Ọnụọgụ Netwọk

Ndị a bụ ikpo okwu ọmụmaatụ na-enye ohere ịnweta data Netwọk Zcash:

[Zcash Nchọgharị Block](https://mainnet.zcashexplorer.app)

[Coin Metrics data netwọk](https://docs.coinmetrics.io/network-data/network-data-overview) — akwụkwọ nkọwa metrik na njikọ gaa na mkpuchi akụ dị ugbu a.

Ị nwekwara ike itinye aka na mmepe netwọk site n'ịgba ule ma ọ bụ ịtụpụta nkwalite ọhụrụ na inye metrics.

### Ịgwụputa

Ndị na-egwụputa [miner] chọrọ full node iji nweta RPC niile metụtara ịgwụputa [mining], dịka getblocktemplate na getmininginfo.

zcashd na-emekwa ka ịgwụputa gaa na coinbase nke e chebere echebe kwe omume. Ndị na-egwụputa na pool ịgwụputa nwere nhọrọ ịgwụputa ozugbo iji chịkọta ZEC nke e chebere echebe na z-address na ndabara.

Gụọ [Ntuziaka Ịgwụputa](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ma ọ bụ sonye na ibe Community Forum maka [Zcash Ndị Na-egwụputa](https://forum.zcashcommunity.com/c/mining/13).

### Nzuzo

Ịrụ full node na-enye gị ohere ikwenye Azụmahia na block niile n'onwe gị na netwọk Zcash.

Ịrụ full node na-ezere ụfọdụ ihe ize ndụ Nzuzo [privacy] metụtara iji ọrụ ndị ọzọ kwado Azụmahia n'aha gị.

Iji node nke gị na-enyekwa ohere ijikọ na netwọk site na [Tor](https://zcash.github.io/zcash/user/tor.html).
Nke a nwekwara uru ọzọ nke ikwe ka ndị ọrụ ndị ọzọ jikọọ na nzuzo na adreesị .onion node gị.

## Mmejọ Ndị A Na-ahụkarị

- Iwu zcashd site na ntụziaka dị n'elu ma tụọ anya node na-arụ ọrụ. Binaries ndị ahụ na-akwụsị n'ogo nkwụsị.
- Ịrụ node ma were na e-akpa ego ekwentị gị na-eji ya ugbu a. e-akpa ego ọkụ ga-anọgide na-ekwurịta okwu na sava ọ bụla ahaziri ya ruo mgbe ị tụrụ ya aka na nke gị. Lee [Node Lightwallet](/zcash-tech/lightwallet-nodes).
- Ịrụ naanị `zebrad` ma tụọ anya e-akpa ego ọkụ ijikọ. Node chọrọ indexer n'akụkụ ya, ma ọ bụ lightwalletd ma ọ bụ [Zaino](/zcash-tech/zaino).
- Ịchọ RPC e-akpa ego na node. E bufere igodo na nguzozi na Zallet.

## Peeji Ndị Metụtara Ya

- [Zebra Full Node](/zcash-tech/zebra-full-node) - wụnye, hazie, ma rụọ node akwadoro
- [Zakura Node](/zcash-tech/zakura-node) - mmejuputa node nke abụọ, nke e wepụtara site na Zebra
- [Node Lightwallet](/zcash-tech/lightwallet-nodes) - sava ndị e-akpa ego ọkụ na-ajụ ase
- [Zaino](/zcash-tech/zaino) - indexer Rust nke na-ejere e-akpa ego ọkụ ozi
- [Zcash Mmekọrịta e-akpa ego](/zcash-tech/zcash-wallet-syncing) - ihe mere mmekọrịta ji arụ ọrụ otu a

## Mmụta Ọzọ

Gụọ [Akwụkwọ Nkwado](https://zcash.readthedocs.io/en/latest/)

Sonyere sava [Discord anyị](https://discord.gg/zcash) ma ọ bụ kpọtụrụ anyị na [X](https://X.com/ZecHub)

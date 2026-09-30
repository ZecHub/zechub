<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ọnụ zuru ezu

## TL;DR

- Nọdụ zuru oke na-edobe otu zuru oke nke blockchain Zcash ma na-enyocha ngọngọ na azụmahịa ọhụrụ ọ bụla megide iwu nkwekọrịta.
- Zebra (`zebrad`) bụ node a ga-etinye taa. Zakura bụ nke abụọ e ji Zebra.
- zcashd alaala ezumike nká. E ruru nkwụsị ya na 18 Julaị 2026 na elu blọk 3417100, ebe nodes ndị ahụ anaghịzi amalite.
- Nọdụ na obere akpa bụzi mmemme dị iche iche. [Zallet](https://github.com/zcash/zallet) na-agba ọsọ megide node ma jide igodo ahụ.
- Ịgba ọsọ nke gị na-enye gị nkwenye onwe onye ma na-ewepụ mkpa ọ dị ịtụkwasị sava onye ọzọ obi.

## Nkọwa Isi

Full Node bụ ngwanrọ nke na-agba otu zuru oke nke blockchain nke cryptocurrency, na-enye gị ohere ịnweta atụmatụ nke protocol ahụ.

Ọ na-ejide ndekọ zuru oke nke azụmahịa ọ bụla mere kemgbe mmalite ya, ya mere o nwere ike ịchọpụta izi ezi nke azụmahịa na ngọngọ ọhụrụ ndị agbakwunyere na blockchain.

## Mmejuputa Node

### Zebra

Zebra bụ mmejuputa usoro Zcash nke nwere onwe ya, nke dị njikere imepụta, nke Zcash Foundation mepụtara ma dee ya na Rust. Ebe ọ bụ na zcashd lara ezumike nká, Zebra (`zebrad`) bụ node zuru oke akwadoro maka ntinye ọhụrụ.

Zebra na-akwado ngọngọ na azụmahịa, na-esonye na netwọk peer-to-peer, ma na-ekpughe njikọ RPC maka ngwa. Akpa ego ahụ bụ ihe dị iche ugbu a: [Zallet](https://github.com/zcash/zallet) Ọ na-agba ọsọ megide oghere Zebra ma na-ejikwa igodo na nhazi. Nke a na-anọchi zcashd, nke jikọtara oghere na obere akpa n'otu usoro.

Iji jee ozi obere akpa ọkụ echekwara, node ahụ na-agba ọsọ n'akụkụ ihe ngosi indexer, ma ọ bụ nke edobere [lightwalletd](https://github.com/zcash/lightwalletd) ma ọ bụ nke ọhụrụ [Zaino](https://zechub.wiki/zcash-tech/zaino).

Jide n'aka na ị gụrụ akwụkwọ Zebra maka ntuziaka nhazi, ma sonye na sava R&D Discord maka nkwado.

[Github](https://github.com/ZcashFoundation/zebra/)

[Akwụkwọ Zebra](https://zebra.zfnd.org)

Lee [Zebra zuru oke](/zcash-tech/zebra-full-node) maka usoro nrụnye, nhazi, na ihe achọrọ maka ngwaike.

### Zakura

Zakura bụ otu n'ime ihe abụọ a na-akpọ "full node" nke kwekọrọ na nkwekọrịta, nke e si na Zebra mepụta ma Valar Group na Project Tachyon mepụta. Ọ na-agbaso otu iwu usoro ahụ ma na-agbakwụnye nhazi ngwa ngwa, ịkpụcha ngọngọ, na oyi akwa ndakọrịta zcashd RPC [Zakura Node](/zcash-tech/zakura-node).

### zcashd (ezumike nká)

> **Rịba ama:** zcashd alaala ezumike nka. Electric Coin Company [kwupụtara mbelata ahụ](https://z.cash/support/zcashd-deprecation/), e wee ruo nkwụsị End-of-Support ozugbo na 18 Julaị 2026 na elu blọk 3417100. Ọ bụla zcashd 6.20.0 nke a na-agbanwebeghị na-emechi n'ogo ahụ ma jụ ịmalitegharịa, ngwanrọ ahụ anaghịkwa akwado NU6.3. Jiri Zebra. Ọ bụrụ na ị nwere zcashd `wallet.dat`, soro [Nduzi Mbugharị: zcashd gaa Zebrad/Zallet](https://zechub.wiki/guides/migration-guide-zcashd-to-zebrad-zallet).

zcashd bụ ọrụ mbụ e ji mee ihe maka Zcash, nke Electric Coin Company. Ntuziaka owuwu dị n'okpuru ka edobere maka ntụaka na maka ndị ọrụ si na zcashd.

Zcashd na-ekpughe otu API site na njikọ RPC ya. API ndị a na-enye ọrụ ndị na-enye ohere ka ngwa mpụga na-akpakọrịta na node ahụ.

[Mpempe akwụkwọ ọkụ](https://github.com/zcash/lightwalletd) bụ ihe atụ nke ngwa nke na-eji node zuru oke iji mee ka ndị mmepe nwee ike iwulite ma jikwaa obere akpa nchekwa dị mfe maka ekwentị na-enweghị ịkparịta ụka ozugbo na Zcashd.

[Ndepụta zuru oke nke iwu RPC akwadoro](https://zcash.github.io/rpc/)

[Akwụkwọ Zcashd](https://zcash.github.io/zcash/)

#### Malite Node (Linux)

- Wụnye Ndabere

      mmelite sudo apt

      sudo apt-nweta nrụnye \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils akpaaka libtinfo5

- Mbipụta kachasị ọhụrụ, ndenye ọpụpụ, ntọala na nrụpụta:

      git klọn https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Mekọrịta Blockchain (nwere ike were ọtụtụ awa)

    Iji malite node ahụ, gbaa ọsọ:

      ./src/zcashd

- A na-echekwa igodo nkeonwe na ~/.zcash/wallet.dat

[Ntuziaka maka Zcashd na Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)

## Mmetụta Bara Uru

### Netwọk ahụ

Site n'ịgba ọsọ zuru oke, ị na-enyere aka ime ka netwọk zcash sie ike site n'ịkwado nhazi ya.

Nke a na-enyere aka igbochi njikwa mmegide ma mee ka netwọk ahụ ghara inwe nsogbu ọ bụla.

Ndị na-emepụta DNS na-ekpughe ndepụta nke nodes ndị ọzọ a pụrụ ịtụkwasị obi site na sava arụnyere n'ime. Nke a na-enye ohere ka azụmahịa gbasaa n'ofe netwọk ahụ.

### Ọnụọgụgụ netwọkụ

Ndị a bụ ihe atụ nke ikpo okwu ndị na-enye ohere ịnweta data Zcash Network:

[Ihe Nchọgharị Zcash Block](https://zcashblockexplorer.com)

[Ọnụ ego](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

I nwekwara ike itinye aka na mmepe nke netwọk ahụ site na ịme ule ma ọ bụ ịtụ aro mmezi ọhụrụ na inye usoro.

### Ịgwuputa ihe

Ndị na-egwuputa ihe chọrọ n'akara zuru oke iji nweta RPC niile metụtara igwuputa ihe dịka getblocktemplate & getmininginfo.

Zcashd na-enyekwa aka igwu ala ruo na ntọala ego echekwara. Ndị na-egwu ala na ọdọ mmiri igwu ala nwere nhọrọ igwu ala ozugbo iji chịkọta ZEC echekwara na adreesị z site na ndabara.

Gụọ [Nduzi Ngwuputa](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) ma ọ bụ sonye na ibe Mgbakọ Obodo maka [Ndị na-egwupụta Zcash](https://forum.zcashcommunity.com/c/mining/13).

### Nzuzo

Ịgba ọsọ nke zuru oke na-enye gị ohere inyocha azụmahịa na ngọngọ niile dị na netwọk Zcash n'adabereghị onwe ha.

Ịgba ọsọ zuru oke na-ezere ụfọdụ ihe egwu nzuzo metụtara iji ọrụ ndị ọzọ iji nyochaa azụmahịa n'aha gị.

Iji node nke gị na-enyekwa ohere ijikọ na netwọk site na [Tor](https://zcash.github.io/zcash/user/tor.html).
Nke a nwere uru ọzọ nke ikwe ka ndị ọrụ ndị ọzọ jikọọ na adreesị node .onion gị.

## Mmejọ Ndị A Na-emekarị

- Ịrụ zcashd site na ntuziaka dị n'elu ma na-atụ anya na ọ ga-arụ ọrụ. Ihe abụọ ndị ahụ na-akwụsị n'ogo mbelata.
- Ịgba ọsọ na-eche na obere akpa ekwentị gị na-eji ya ugbu a. Obere akpa ego na-aga n'ihu na-agwa sava ọ bụla e ji hazie ya okwu ruo mgbe ị tụrụ aka na nke gị. Lee ya [Ọnụọgụ obere akpa](/zcash-tech/lightwallet-nodes).
- Naanị ịgba ọsọ `zebrad` ma na-atụ anya ka obere akpa ego jikọọ. Nọdụ ahụ chọrọ ihe ntinye aka n'akụkụ ya, ma ọ bụ lightwalletd ma ọ bụ nke nwere akpa ego [Zaino](/zcash-tech/zaino).
- Na-achọ RPCs obere akpa na node ahụ. Igodo na nhazi ahụ kwagara Zallet.

## Peeji ndị metụtara ya

- [Zebra zuru oke](/zcash-tech/zebra-full-node) - wụnye, hazie, ma gbaa node akwadoro
- [Zakura Node](/zcash-tech/zakura-node) - mmejuputa node nke abụọ, nke Zebra gbapụrụ
- [Ọnụọgụ obere akpa](/zcash-tech/lightwallet-nodes) - sava ndị na-ajụ obere akpa ajụjụ
- [Zaino](/zcash-tech/zaino) - ihe nrịbama Rust nke na-eje ozi obere obere akpa
- [Mmekọrịta obere akpa Zcash](/zcash-tech/zcash-wallet-syncing) - ihe kpatara syncing ji arụ ọrụ otu o si arụ ọrụ

## Mmụta Ọzọ

Gụọ [Akwụkwọ Nkwado](https://zcash.readthedocs.io/en/latest/)

Sonyere anyị [Ihe nkesa Discord](https://discord.gg/zcash) ma ọ bụ kpọtụrụ anyị na [X](https://X.com/ZecHub)

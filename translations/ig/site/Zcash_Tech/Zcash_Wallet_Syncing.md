<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nkwekọrịta obere akpa Zcash

## TL;DR

* N'ihi na azụmahịa Zcash echekwara zoo nkọwa ha, sava enweghị ike ịchọ naanị obere akpa ego dị ka ọ nwere ike maka mkpụrụ ego doro anya dịka Bitcoin ma ọ bụ Ethereum.
* Obere obere akpa ego na-ebudata ntakịrị  kọmpat blocks ?? site na sava pụrụ iche (lightwalletd) ma mebie data dị mkpa n'onwe ha na igodo nzuzo ha.
* Ịkọwapụta na ịhazi ihe ndị ahụ ga-ewe oge, ya mere obere akpa ego ji usoro nkwekọrịta ngwa ngwa mee ka i nwee ike iji ego gị n'oge.
* Ụzọ ndị a ma ama: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync, na DAGSync.
* Ụzọ ndị a na-ejikarị nchekwa ma ọ bụ ike nhazi maka ngwa synchronization.

## Nkọwa nke isi ihe dị na ya.

### Otu Zcash syncing si arụ ọrụ

Zcash uses zero-knowledge proofs to shield transaction details from unauthorized parties. This privacy makes syncing harder for light wallets because they do not store the full blockchain locally and instead rely on a server for the necessary information. With Bitcoin or Ethereum, servers can index the blockchain and return account data quickly. But with Zcash, the server cannot see transaction details. So how can a light wallet sync its balance and history without downloading and decrypting the entire blockchain itself?

Zcash solves this problem by combining multiple approaches. It has a specialized server, lightwalletd, that filters data from a full node and keeps only what's needed for transaction identification. This data is called compact blocks, and it is much smaller than the original blocks. Light wallets first download these compact blocks from the lightwalletd server and then decrypt them with their private keys.

Ọbụna ịkọwapụta na nhazi nke mgbochi ndị a nwere ike iwe oge dị ukwuu, karịsịa mgbe enwere ọtụtụ azụmahịa kwa ngọngọ. Ya mere obere akpa eji ụzọ dị iche iche iji mee ka mmekọrịta ọsọ ma kwe ka ị jiri ego gị ngwa ngwa o kwere omume.

## Ihe Anya / Ntụle

Think of the blockchain as a huge mailroom full of locked boxes. With a transparent coin, the mailroom clerk can read the labels and instantly tell you which boxes are yours. With Zcash, the labels are hidden — so your wallet has to take its keys and quietly check the boxes itself to find the ones it can open. The syncing methods below are different strategies for checking those boxes faster.

## Ịbanye n'Okpuru Mmiri Dị Omimi

### Nkwekọrịta Warp

Warp sync bụ atụmatụ YWallet nke na-agbafe usoro etiti nke decrypting ma hazie kọmpụta ọ bụla, na-awụli elu ozugbo na nsonaazụ ikpeazụ.

Iji mee nke ahụ, ọ na-eji mgbakọ na mwepụ na nkà izo ya ezo eme ihe iji gbakọọ nsonaazụ ikpeazụ n'agaghị site nzọụkwụ nke ọ bụla.

Warp sync nwere ike ịhazi ọtụtụ puku blocks kwa sekọnd, ngwa ngwa karịa usoro mmekọrịta oge niile. Nke a pụtara na ndị ọrụ YWallet nwere ike ịnụ ụtọ arụmọrụ ọsọ ọsọ ma dị mma, ọbụlagodi narị otu narị puku azụmahịa na natara ndetu n'ime akaụntụ ha.

E wezụga usoro a na-agba ọsọ, YWallet nwere ike ịhazi ọtụtụ blocks n'otu oge ahụ, kesaa ibu gafee ngwaike gị dịnụ iji mee ka usoro ahụ dịkwuo mfe.

Gụkwuo na . [Nkwekọrịta Warp](https://ywallet.app/warp/)

> A na-akọwa sync warp ebe a dị ka usoro nhazi. Ywallet n'onwe ya anaghịzi edobe ma agaghị emelite maka Ironwood, yabụ ọ bụghị obere akpa iji wụnye taa.

### Na-emefu tupu ịmekọrịta

Spend-before-sync bụ ihe ọhụrụ dị na Zcash Mobile Wallet SDK V2 nke na -enye ndị ọrụ ohere itinye ego ozugbo ha mepere obere akpa, n'echeghị ka mmekọrịta zuru ezu. Njirimara a na -eme ka nchọpụta nke wallet ahụ nwee ike ịbawanye ma meziwanye ahụmahụ onye ọrụ.

Spend-before-sync works by using a compact-blocks synchronization algorithm that processes blocks from the lightwalletd server in a non-linear order. This means that instead of waiting for one block to be fully processed before moving on, wallets can use a bit more memory and processing power to scan different sections of the blockchain. Usually, it scans different ranges, looking for newer transactions while the older blocks are downloaded and processed. If a recent, unspent note is discovered, it will be made available immediately.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Nkwado Ọkụ ọkụ

Ndị otu Zecwallet mepụtara, Blaze sync bụ algorithm nke na-emekọrịta ihe maka obere akpa ego ndị na - enyocha blockchain azụ n'azụ, malite site na elu kachasị dị nso ma rụọ ọrụ.

Nke a na-enye ohere ka obere akpa ahụ chọta akwụkwọ ego ejiri tupu ndị natara, ebe ọ na -eme ka ederede edere n'oge gara aga enweghị ike ịnweta ya n'echeghị usoro nhazi zuru ezu iji mezue.

E wezụga nke ahụ, ọ na-eji Out-of-Order Sync site decoupling components of the sync from each other  nbudata blocks, ịrụ ikpe decryptions, and updating witnesses  ma hazie ya dị ka ihe yiri. Nke a na-ewe karịa ebe nchekwa na CPU ego ma enwekwu mmekọrịta ọsọ X5.

### DAGSync

DAGSync bụ algorithm synchronization a chọrọ iji meziwanye ahụmịhe onye ọrụ nke obere akpa Zcash site na ime ka mmekọrịta dị ngwa.

Ọ na-eji a [Directed Acyclic Graph (DAG) Arụtụ aka na-eduzi ihe osise eserese](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) iji gosipụta ihe ndị dị n'etiti akwụkwọ, ndị akaebe na ndị nkwụsịtụ na obere akpa Zcash.

A DAG is a data structure that consists of nodes and edges, where each edge has a direction that indicates a relationship between two nodes. A DAG has no cycles, meaning that there is no way to start from a node and follow the edges back to the same node.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Ihe Ndị A Pụrụ Ime n'Ọrụ Ahụ

N'ụzọ na-akpali mmasị, usoro ndị a niile bu n'obi ịza ajụjụ nke Zcash Security welitere na post ya na June 2016. [Ozi nzuzo nwere ike ịba ụba](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) and its relationship with private payment systems. Some even take the extra step of downloading all memo data from servers, except for data exclusive to an address, increasing privacy at the cost of a bit of extra resources.

Ọzọkwa, Zcash Foundation na-ele anya ndị ọzọ iji melite arụmọrụ nke obere akpa ego. Nke ahụ bụ ikpe maka [Nchịkọta Ozi Echefuola (OMR)](https://zfnd.org/oblivious-message-retrieval/), ihe owuwu nke ntọala ahụ na-amụ iji chọpụta ma ọ bụrụ na o nwere ike ịza nsogbu arụmọrụ ndị a metụtara ndị ọrụ obere akpa Zcash.

## Ihe Ndị A Na-emekarịhie Emeghị

** Iche na ihe nkesa lightwalletd maara nguzo gị.** Ihe nkesa ahụ na-enye naanị kọmpụta dị mkpụmkpụ; obere akpa gị decrypts ma sụgharịa ha n'ógbè ya site na igodo nke aka gị.

**Ikwụsị mmekọrịta n'oge.** Ụzọ ụfọdụ na-eme ka ego ndị a pụrụ iji mee ihe ugbu a dị tupu e mezue njikọ zuru ezu, ma akụkọ ochie na ndetu nwere ike ịbụ nke ka na-aga n'ihu.

**Itule Zcash sync ozugbo na uzo-mgbasa ozi.** Ụzọ dị nwayọ nwere ike ịbụ ụgwọ nke ichekwa nzuzo, ọ bụghị ntụpọ  obere akpa ahụ na -arụ ọrụ nke sava ego ọha ga -eme site n'ịgụ akaụntụ gị.


## Peeji ndị metụtara ya

- [Lightwallet Nodes (Nọmba nke obere akpa ego)](/zcash-tech/lightwallet-nodes) — the lightwalletd infrastructure that light wallets rely on.
- [Igodo Nlele](/zcash-tech/viewing-keys)  igodo wallets na-eji achọpụta ma mebie akwụkwọ ego ha.
- [Pepper Sync (Nkeji nke abụọ)](/zcash-tech/pepper-sync)  ụzọ ọzọ maka mmekọrịta obere akpa Zcash.
- [FROST](/zcash-tech/frost)  ikike ikesa akara maka ZEC echekwara.

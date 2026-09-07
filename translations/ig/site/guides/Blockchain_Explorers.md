<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ndị na-enyocha Blockchain

## Okwu Mmalite

In the traditional business world every transaction includes a receipt for proof of purchase. Similarly, in the blockchain world a user receives a digital receipt in the form of a transaction id for every transaction completed. Most wallets will provide this for you. Blockchain explorers are simply tools that allow one to visualize what has already happened on a blockchain. They take for inputs: transaction id's, addresses, or block hashes, and visually output what took place.

## Ihe atụ ndị ọzọ
<div>

- Bitcoin: Ọ bụ ego. [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bed0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: Ọ bụ ihe dị mma. [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Ihe niile: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (ọha na eze): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (nkeonwe): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Rịba ama na Zcash ka azụmahịa nke abụọ si nwee nkọwa niile dị mkpa zoro ezo, nke a bụ ihe dị mkpa ma nwee nnukwu mmetụta n'ụwa dijitalụ.


## Chaatị Map nke Blockchain

Ya mere, anyị nwere ogologo eriri nke ihe odide dị ka a digital nnata, ugbu a gịnị? Nke a bụ ebe anyị na-eji a [onye nchọpụta blockchain](https://nym.com/blog/using-blockchain-privately), ma ọ bụ map, iji nyere anyị aka ịghọta ihe mere na blockchain. Rịba ama otú nke ọ bụla yinye nwere ya version of [onye nchọpụta blockchain](https://nym.com/blog/using-blockchain-privately) above. It's important to understand that all these blockchain projects are examples of open source software. That is, anyone can contribute to and or fork the code to their liking. With that understanding, each project specializes in different areas and customizes the blockchain explorer to fit the needs of said project.

### Ihe ndị e ji eme ihe na ya
Transactions are placed into *blocks*. When a block is mined/validated every transaction inside that block is confirmed and a block hash is created. Any hash created can be input into a block explorer. You may have seen CEX's needing a number of *confirmations* before they release your funds, this is the metric they are using to make sure your transaction is 
sufficiently finalized. How does the blockchain determine which transactions get into the next block? Complex topic of research, but most modern chains use the idea of *fees* to determine who gets into the front of the line. The higher the fee, the higher the chance you move up to the front of the queue.

### Adreesị ndị dị na ya

Ụzọ na-atọ ụtọ iji jiri anya mụta ihe. [ndị na-enyocha ihe gbasara blockchain](https://nym.com/blog/using-blockchain-privately) is to input the address of any random transaction. Then you can move backward in time and see where the funds originated! Each transaction has both an input and output address.  Armed with this information, one can readily move both forward and backward from any transaction that has been spent. For those that like puzzles, this is the digital equivalent of a huge financial puzzle, and could be used for transparency purposes. Using a blockchain explorer makes this not only much easier to visualize, it *also highlights* the need for transaction privacy. Unless you're using shielded Zcash, you can do this with *any* transparent blockchain: BTC, ETH, ATOM, DOGE, VTC, etc ... . This point is critical for anyone using the blockchain safely moving into a digital only future.

### Ego ole ha ruru

Similar to addresses above, any transaction on a public blockchain has the amounts publicly available on full display. This includes amounts on both the input and output addresses for any transaction. One exception to this is when you choose to use Shielded Zcash -- then all amounts are hidden. For small business owners who necessarily need privacy for *fair trade*, this is a huge benefit!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Ihe onye na-eme nchọpụta nwere ike ma ghara ịhụ na Zcash

#### TL;DR
- Ihe na-eme ka ihe doo anya (`t`) adreesị na-ahụ anya n'ụzọ zuru ezu na onye nchọpụta, dị ka Bitcoin.
- Azụmahịa ezoro ezo (z ruo z) na-ezobe ego, adreesị ahụ, na memo ahụ.
- A ka na-ahụ ụgwọ ahụ, ọbụlagodi n'ihe azụmahịa echekwara kpamkpam.
- Ichebe (na-agagharị agagharị) `t` na-echebe) ma deshielding (a ga- echebe azụ ka a n'ihu nke ọzọ). `t`) na-ahụ anya, n'ihi na otu akụkụ bụ uzo.
- Nzuzo na-adịgide naanị mgbe ego dị n'ime ọdọ mmiri ndị ahụ echekwara.

Zcash nwere ihe karịrị otu ụdị adreesị, onye na-enyocha ya na-emeso ha n'ụzọ dị iche.

Adreesị doro anya, malite na: `t`Onye na-enyocha ego ga-egosi onye zitere ya, onye natara ya, ego ole o nyere ha nakwa ebe e si nweta ego ahụ.

Adreesị ndị a na-echebe bụ akụkụ nke onwe. Ego dị n'ime Sapling ma ọ bụ Orchard [ọdọ mmiri ndị e chebere echebe.](https://zechub.wiki/using-zcash/shielded-pools#content) a na-echebe ya site n'ihe akaebe nke ihe ọmụma efu. Chọọ maka azụmahịa zuru ezu echekwara ma onye nchọpụta ahụ enweghị ike igosi ego, adreesị, ma ọ bụ memo. Ọ nwere ike ikwenye naanị na ezi azụmahịa mere ma dekọba ya na ngọngọ. Nke a bụ ihe atụ nzuzo zoro ezo egosiri nso elu peeji a.

Otu nkọwa na-anọgide anya ọbụna n'ihi kpamkpam shielded azụmahịa: ụgwọ. Zcash nkwekọrịta iwu achọ uzo ego ka a kwuru hoo haa, otú onye nchoputa nwere ike mgbe niile egosi ya, ọbụna mgbe ichekwa ndị e kpuchiri ekpuchi. N'ihi nke ahụ ọ bụ ezi omume iji ọkọlọtọ obere akpa ego, mere gị azụmahịa adịghị kwụpụta site akwụ ụgwọ ihe pụrụ iche ego.

Onye nchọpụta ahụ nwekwara ike ịhụ mgbe ego gafere n'etiti akụkụ ndị na-ekpuchi ma ọ bụ nke a na-ahụ anya. `t` ego n'ime ọdọ mmiri bụ shielding, na-akpụ akpụ ha azụ si dị deshielding. ndị crossings na-nwere ike ịhụ akụkụ ụfọdụ n'ihi na otu akụkụ ahụ doro anya. naanị kpamkpam onwe z ka z ọrụ, nke mgbe emetụ a `t` adreesị, na-edebe ihe niile ma e wezụga ụgwọ zoro ezo.

Ihe ị ga-amụta: nzuzo na-adabere n'ịnọgide n'ime ọdọ mmiri ndị a kpuchiri ekpuchi. Ozugbo ego metụrụ otu ihe dị mkpa, ọ bụ mgbe ahụ ka ha nwere ike ịbanye n'otu ebe ma nwee ohere ịnweta ya ọzọ. `t` adreesị, na akụkụ nke akụkọ ihe mere eme ha bụ ọha dị ka Bitcoin. Iji gosipụta ọrụ gị kpuchiri ekpuchi nye onye ị họọrọ, dịka onye nyocha ego, kesaa igodo nlele kama ime ya ka ọ bụrụ ọhaneze. Lee akwụkwọ ozi ahụ site na ndị ahịa maka nkọwa zuru ezu banyere otu esi eji akara ngosi a ma ama iji mee ka o doo anya na e nwere ike ịnweta data nzuzo ọzọ karịa mgbe niile. [Igodo Nlele](https://zechub.wiki/zcash-tech/viewing-keys#content) peeji nke.


### Ndepụta nke Zcash Block Explorers

- [Zcash Block Explorer (Nchịkọta nke ihe nchọgharị)](https://mainnet.zcashexplorer.app/)

- [Oche oche akwa.](https://blockchair.com)

- [3xpl (ọ bụ naanị)](https://3xpl.com/zcash)

- [Bitquery (ụlọ nkwakọba ihe)](https://explorer.bitquery.io/zcash)


### Ihe Nlere Anya Na-egosi

Lee ihe atụ anọ dị mma nke ndị na-enyocha blockchain:

* [Mempool.space (Nkeji nke abụọ)](https://mempool.space)
* [Ethscan (n'asụsụ Bekee)](https://etherscan.io/)
* [Zcash Block Explorer (Nchịkọta nke ihe nchọgharị)](https://mainnet.zcashexplorer.app)
* [Mintscan (n'asụsụ Bekee)](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)





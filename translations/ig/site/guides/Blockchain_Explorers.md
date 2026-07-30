<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ndị na-enyocha Blockchain

## Okwu Mmalite

In the traditional business world every transaction includes a receipt for proof of purchase. Similarly, in the blockchain world a user receives a digital receipt in the form of a transaction id for every transaction completed. Most wallets will provide this for you. Blockchain explorers are simply tools that allow one to visualize what has already happened on a blockchain. They take for inputs: transaction id's, addresses, or block hashes, and visually output what took place.

## Ihe atụ
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (ọha): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (onwe): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Rịba ama na Zcash ka azụmahịa nke abụọ si nwee nkọwa niile dị mkpa zoro ezo, nke a dị mkpa ma nwee nnukwu mmetụta na ụwa dijitalụ.


## Map nke Blockchain

Ya mere, anyị nwere a ogologo eriri nke odide dị ka a digital nnata, ihe ugbu a? Nke a bụ ebe anyị na-eji a [blockchain Explorer](https://nym.com/blog/using-blockchain-privately), ma ọ bụ map, iji nyere anyị aka ịghọta ihe mere na blockchain. Rịba ama otú onye ọ bụla yinye nwere ya version nke [blockchain Explorer](https://nym.com/blog/using-blockchain-privately) above. It's important to understand that all these blockchain projects are examples of open source software. That is, anyone can contribute to and or fork the code to their liking. With that understanding, each project specializes in different areas and customizes the blockchain explorer to fit the needs of said project.

### Mpempe akwụkwọ
Transactions are placed into *blocks*. When a block is mined/validated every transaction inside that block is confirmed and a block hash is created. Any hash created can be input into a block explorer. You may have seen CEX's needing a number of *confirmations* before they release your funds, this is the metric they are using to make sure your transaction is 
Kedu ka blockchain si ekpebi nke azụmahịa na-abanye n'ime ngọngọ ọzọ? Isiokwu dị mgbagwoju anya nke nyocha, mana ọtụtụ agbụ ndị oge a na-eji echiche nke * ụgwọ * iji chọpụta onye na-aga n'ihu n'ahịrị.

### Adreesị

Ụzọ na-atọ ụtọ iji jiri anya mụta ihe [ndị na-enyocha blockchain](https://nym.com/blog/using-blockchain-privately) is to input the address of any random transaction. Then you can move backward in time and see where the funds originated! Each transaction has both an input and output address.  Armed with this information, one can readily move both forward and backward from any transaction that has been spent. For those that like puzzles, this is the digital equivalent of a huge financial puzzle, and could be used for transparency purposes. Using a blockchain explorer makes this not only much easier to visualize, it *also highlights* the need for transaction privacy. Unless you're using shielded Zcash, you can do this with *any* transparent blockchain: BTC, ETH, ATOM, DOGE, VTC, etc ... . This point is critical for anyone using the blockchain safely moving into a digital only future.

### Ego ole

Similar to addresses above, any transaction on a public blockchain has the amounts publicly available on full display. This includes amounts on both the input and output addresses for any transaction. One exception to this is when you choose to use Shielded Zcash -- then all amounts are hidden. For small business owners who necessarily need privacy for *fair trade*, this is a huge benefit!

! [ego ole](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Ihe onye na-eme nchọpụta nwere ike ma ghara ịhụ na Zcash

#### TL;DR
- Nkọwapụta (`t`) adreesị na-n'ụzọ zuru ezu anya na ihe nchọgharị, dị nnọọ ka Bitcoin
- Azụmahịa ezoro ezo (z ruo z) na-ezobe ego, adreesị, na memo
- A ka na-ahụ ụgwọ ahụ, ọbụlagodi na azụmahịa echekwara kpamkpam
- Ichebe (na-agagharị agagharị `t` na-echebe) na deshielding (echebe azụ na `t`) na-ahụ anya, n'ihi na otu akụkụ bụ uzo
- Nzuzo na-adịgide naanị mgbe ego na-anọ n'ime ọdọ mmiri ndị a na-echebe

Zcash nwere ihe karịrị otu ụdị adreesị, na onye na-enyocha ihe na-emeso ha n'ụzọ dị iche.

Adreesị doro anya, malite na `t`Onye nchọpụta na-egosi onye zitere, onye natara, ego, na ụzọ azụ ebe ego si bịa.

Shielded addresses are the private side. Funds in the Sapling or Orchard [shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) are protected by zero knowledge proofs. Look up a fully shielded transaction and the explorer cannot show the amount, the addresses, or the memo. It can confirm only that a valid transaction happened and was recorded in a block. This is the hidden private example shown near the top of this page.

One detail does stay visible even for fully shielded transactions: the fee. Zcash consensus rules require the transparent fee to be stated explicitly, so an explorer can always show it, even when the amounts are masked. For that reason it is good practice to use the standard wallet fee, so your transaction does not stand out by paying an unusual amount.

Onye nchọpụta ahụ nwekwara ike ịhụ mgbe ego na-agafe n'etiti akụkụ ndị na-ekpuchi ma ọ bụ nke a na-ahụ anya. `t` ego n'ime ọdọ mmiri bụ shielding, na-akpụ akpụ ha azụ bụ deshielding. ndị crossings na-n'ụzọ ụfọdụ anya n'ihi na otu akụkụ bụ uzo. naanị kpamkpam onwe z ka z ọrụ, nke mgbe emetụ a `t` adreesị, na-edebe ihe niile ma e wezụga ụgwọ zoro ezo.

Ihe ị ga-amụta: nzuzo na-adabere n'ịnọ n'ime ọdọ mmiri ndị ahụ e chebere. `t` address, that part of their history is as public as Bitcoin. To prove your own shielded activity to someone you choose, such as an accountant, share a viewing key instead of making it public. See the [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) peeji nke.


### Ntuziaka Anya

Ndị a bụ ezigbo ihe atụ anọ nke ndị nchọpụta dị iche iche nke blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


[BitcoinExlporer]](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


[EthExplorer]](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


[ZcashExplorer]](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


[Eluigwe na ụwa]](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)





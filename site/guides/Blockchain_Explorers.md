<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blockchain Explorers

## Introduction

In the traditional business world every transaction includes a receipt for proof of purchase. Similarly, in the blockchain world a user receives a digital receipt in the form of a transaction id for every transaction completed. Most wallets will provide this for you. Blockchain explorers are simply tools that allow one to visualize what has already happened on a blockchain. They take for inputs: transaction id's, addresses, or block hashes, and visually output what took place.

## Examples
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (public): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (private): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Notice with Zcash how the second transaction has all important details hidden, this is important and has great implications in a digital world.


## Blockchain Maps

So we have this long string of characters as a digital receipt, what now? This is where we use a [blockchain explorer](https://nym.com/blog/using-blockchain-privately), or map, to help us digest what happened on the blockchain. Notice how each chain has its own version of [blockchain explorer](https://nym.com/blog/using-blockchain-privately) above. It's important to understand that all these blockchain projects are examples of open source software. That is, anyone can contribute to and or fork the code to their liking. With that understanding, each project specializes in different areas and customizes the blockchain explorer to fit the needs of said project.

### Blocks
Transactions are placed into *blocks*. When a block is mined/validated every transaction inside that block is confirmed and a block hash is created. Any hash created can be input into a block explorer. You may have seen CEX's needing a number of *confirmations* before they release your funds, this is the metric they are using to make sure your transaction is 
sufficiently finalized. How does the blockchain determine which transactions get into the next block? Complex topic of research, but most modern chains use the idea of *fees* to determine who gets into the front of the line. The higher the fee, the higher the chance you move up to the front of the queue.

### Addresses

A fun way to visually learn [blockchain explorers](https://nym.com/blog/using-blockchain-privately) is to input the address of any random transaction. Then you can move backward in time and see where the funds originated! Each transaction has both an input and output address.  Armed with this information, one can readily move both forward and backward from any transaction that has been spent. For those that like puzzles, this is the digital equivalent of a huge financial puzzle, and could be used for transparency purposes. Using a blockchain explorer makes this not only much easier to visualize, it *also highlights* the need for transaction privacy. Unless you're using shielded Zcash, you can do this with *any* transparent blockchain: BTC, ETH, ATOM, DOGE, VTC, etc ... . This point is critical for anyone using the blockchain safely moving into a digital only future.

### Amounts

Similar to addresses above, any transaction on a public blockchain has the amounts publicly available on full display. This includes amounts on both the input and output addresses for any transaction. One exception to this is when you choose to use Shielded Zcash -- then all amounts are hidden. For small business owners who necessarily need privacy for *fair trade*, this is a huge benefit!

![amounts](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### What an explorer can and cannot see on Zcash

#### TL;DR
- Transparent (`t`) addresses are fully visible on an explorer, just like Bitcoin
- Fully shielded (z to z) transactions hide the amount, the addresses, and the memo
- The fee is still visible, even on a fully shielded transaction
- Shielding (moving `t` to shielded) and deshielding (shielded back to `t`) are partly visible, because one side is transparent
- Privacy holds only while funds stay inside the shielded pools

Zcash has more than one kind of address, and an explorer treats them very differently.

Transparent addresses, starting with `t`, work like Bitcoin. An explorer shows the sender, the receiver, the amount, and the trail back to where the funds came from.

Shielded addresses are the private side. Funds in the Sapling or Orchard [shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) are protected by zero knowledge proofs. Look up a fully shielded transaction and the explorer cannot show the amount, the addresses, or the memo. It can confirm only that a valid transaction happened and was recorded in a block. This is the hidden private example shown near the top of this page.

One detail does stay visible even for fully shielded transactions: the fee. Zcash consensus rules require the transparent fee to be stated explicitly, so an explorer can always show it, even when the amounts are masked. For that reason it is good practice to use the standard wallet fee, so your transaction does not stand out by paying an unusual amount.

The explorer can also see when funds cross between the transparent and shielded sides. Moving `t` funds into a pool is shielding, moving them back out is deshielding. Those crossings are partly visible because one side is transparent. Only fully private z to z activity, which never touches a `t` address, keeps everything but the fee hidden.

The takeaway: privacy depends on staying inside the shielded pools. Once funds touch a `t` address, that part of their history is as public as Bitcoin. To prove your own shielded activity to someone you choose, such as an accountant, share a viewing key instead of making it public. See the [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) page.


### Visual Guide

Here are four good examples of different blockchain explorers:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)





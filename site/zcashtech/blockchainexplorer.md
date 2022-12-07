# Blockchain Explorers

## Intro

In the traditional business world every transaction includes a reciept for proof of purchase. Similary, in the blockchain world a user recieves a digital reciept in the form of a transaction id for every transaction completed. Most wallets will provide this for you. Blockchain explorers are simply tools that allow one to visualize what has already happened on a blockchain. They take for inputs: transaction id's, addresses, or block hashes, and visually output what took place.

## Examples

Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)
    
    
Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)
    
 
Zcash (public): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://zcashblockexplorer.com/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)
  
  
Zcash (private): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://zcashblockexplorer.com/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)


#### Notice with Zcash how the second transaction has all important details hidden, this is important and has great implications in a digital world.


## Blockchain Maps

So we have this long string of charactors as a digital reciept, what now? This is where we use a blockchain explorer, or map, to help us digest what happened on the blockchain. Notice how each chain has its own version of blockchain explorer above. It's important to understand that all these blockchain projects are examples of open source software. That is, anyone can contribute to and or fork the code to their liking. With that understanding, each project specializes in different areas and customizes the blockchain explorer to fit the needs of said project.
### Blocks
Transactions are placed into *blocks*. When a block is mined/validated every transaction inside that block is confirmed and a block hash is created. Any hash created can be input into a block explorer. You may have seen CEX's needing a number of *confirmations* before they release your funds, this is the metric they are using to make sure your transction is 
sufficiently finalized. How does the blockchain determine which transactions get into the next block? Complex topic of research, but most modern chains use the idea of *fees* to determine who gets into the front of the line. The higher the fee, the higher the chance you move up to the front of the queue.

### Addresses

A fun way to visually learn blockchain explorers is to use the address of any random transaction and move backward in time! Each transation has both an input and output address.  Armed with this information, one can readily move both forward and backward from any transaction that has been spent. For those that like puzzles, this is the digital equivalent of a huge financial puzzle, and could be used for transparency purposes. Using a blockchain exlporer makes this not only much easier to visualize, it *also highlights* the need for transaction privacy. Unless you're using shielded Zcash, you can do this with *any* transparent blockchain: BTC, ETH, ATOM, DOGE, VTC, etc ... . This point is critical for using the blockchain safely moving into a digital only future.

### Amounts

Similar to addresses above, any transaction on a public blockchain has the amounts publically available on full display. This includes amounts on both the input and output addresses for any transaction. One exception to this is when you choose to use Shielded Zcash -- then all amounts are hidden. For small business owners who necessarily need privacy for *fair trade*, this is a huge benefit!

![amounts](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Visual Guide

![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)








<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Olùwádìí Blockchain

## Ìfilọ́lẹ̀

In the traditional business world every transaction includes a receipt for proof of purchase. Similarly, in the blockchain world a user receives a digital receipt in the form of a transaction id for every transaction completed. Most wallets will provide this for you. Blockchain explorers are simply tools that allow one to visualize what has already happened on a blockchain. They take for inputs: transaction id's, addresses, or block hashes, and visually output what took place.

## Àwọn Àpẹẹrẹ
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320]](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Àgbáyé: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (òfin): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (àdáni): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Kíyèsí pẹ̀lú Zcash bí ìsòwò kejì ṣe ní gbogbo àwọn àlàyé pàtàkì tí ó fara sin, èyí ṣe pàtàkì ó sì ní àwọn ìtumọ̀ ńlá nínú ayé dígítà.


## Àwọn àwòrán Blockchain

Nitorina a ni yi gun okun ti awọn ohun kikọ bi a oni receipt, kini bayi? Eyi ni ibi ti a lo a [blockchain explorer](https://nym.com/blog/using-blockchain-privately), tabi maapu, lati ran wa lọwọ ni sisọ ohun ti o ṣẹlẹ lori blockchain. ṣe akiyesi bi ẹwọn kọọkan ba ni ẹya tirẹ [blockchain explorer](https://nym.com/blog/using-blockchain-privately) ó ṣe pàtàkì láti lóye wípé gbogbo àwọn iṣẹ́ ìkọ̀ǹpín yìí jẹ àpẹẹrẹ software àpapọ̀. ìyẹn ni pé, ẹnikẹ́ni lè kópa nínú rẹ tàbí kí wọ́n pín ẹ̀dà kòódì náà ní ìbámu pẹ̀lú ìfẹ́ ọkàn wọn. nípa òye yẹn, ọ̀kọ̀ọ̀kan ètò ń dáńgájíá lórí onírúurú ibi tí yóò sì máa ṣètò olùwádìí blockchain fún ohun tó bá yẹ ìgbésè èlò náà.

### Àwọn ìdìpọ̀-ìpínlẹ̀
Transactions are placed into *blocks*. When a block is mined/validated every transaction inside that block is confirmed and a block hash is created. Any hash created can be input into a block explorer. You may have seen CEX's needing a number of *confirmations* before they release your funds, this is the metric they are using to make sure your transaction is 
sufficiently finalized. How does the blockchain determine which transactions get into the next block? Complex topic of research, but most modern chains use the idea of *fees* to determine who gets into the front of the line. The higher the fee, the higher the chance you move up to the front of the queue.

### Àwọn Àdúgbò Tó Wà

Ọ̀nà tó gbádùn mọ́ láti fi ojú rí ohun tí a ń kọ́ [àwọn olùwádìí blockchain]](https://nym.com/blog/using-blockchain-privately) is to input the address of any random transaction. Then you can move backward in time and see where the funds originated! Each transaction has both an input and output address.  Armed with this information, one can readily move both forward and backward from any transaction that has been spent. For those that like puzzles, this is the digital equivalent of a huge financial puzzle, and could be used for transparency purposes. Using a blockchain explorer makes this not only much easier to visualize, it *also highlights* the need for transaction privacy. Unless you're using shielded Zcash, you can do this with *any* transparent blockchain: BTC, ETH, ATOM, DOGE, VTC, etc ... . This point is critical for anyone using the blockchain safely moving into a digital only future.

### Iye owó tó wà nínú rẹ̀

Similar to addresses above, any transaction on a public blockchain has the amounts publicly available on full display. This includes amounts on both the input and output addresses for any transaction. One exception to this is when you choose to use Shielded Zcash -- then all amounts are hidden. For small business owners who necessarily need privacy for *fair trade*, this is a huge benefit!

![ìwọ̀n owó tó wà nínú rẹ̀]](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Ohun tí olùwádìí lè rí àti ohun tó ò le rí lórí Zcash

#### TL;DR
- Ó hàn gbangba (`t`) adirẹsi ni o wa ni kikun han lori ohun explorer, o kan bi Bitcoin
- Awọn iṣowo ti o ni aabo patapata (z si z) fi iye pamọ, awọn adirẹsi, ati akọsilẹ naa
- Owó náà ṣì ń hàn, kódà lórí ìnáwó tí a fi ààbò bo pátápátá
- Ààbò (ìyípadà `t` láti fi ààbò) àti láti mú ààbò kúrò (láti fi ọ̀pá ìdáàbòbò padà sí `t`) ni a lè rí dé àyè kan, nítorí pé apá kan wà tí kò ṣeé rí
- Ìpamọ́ máa ń wà níwọ̀n ìgbà tí owó bá wà nínú àwọn ìsọ̀rí tí a fi ààbò bo

Zcash ní oríṣi àdírẹ́sì tó ju ẹyọ kan lọ, àti pé àwọn olùwádìí máa ń lò wọ́n lọ́nà tó yàtọ̀ síra.

Àwọn àdírẹ́sì tí ó ṣe kedere, tí ó bẹ̀rẹ̀ ní `t`, ṣiṣẹ bi Bitcoin. Oluwadi kan fihan oluranlowo, olugba, iye, ati ọna pada si ibi ti awọn owo naa ti wa.

Shielded addresses are the private side. Funds in the Sapling or Orchard [shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) are protected by zero knowledge proofs. Look up a fully shielded transaction and the explorer cannot show the amount, the addresses, or the memo. It can confirm only that a valid transaction happened and was recorded in a block. This is the hidden private example shown near the top of this page.

One detail does stay visible even for fully shielded transactions: the fee. Zcash consensus rules require the transparent fee to be stated explicitly, so an explorer can always show it, even when the amounts are masked. For that reason it is good practice to use the standard wallet fee, so your transaction does not stand out by paying an unusual amount.

Awọn explorer le tun ri nigba ti owo kọja laarin awọn han ati ki o bo awọn ẹgbẹ. `t` funds into a pool is shielding, moving them back out is deshielding. Those crossings are partly visible because one side is transparent. Only fully private z to z activity, which never touches a `t` Adirẹsi, pa ohun gbogbo mọ́ àyàfi owó náà.

Ohun tí wọ́n ń kó jáde: ìpamọ́ra sinmi lórí wíwà nínú àwọn adágún tí a fi ààbò bo. `t` adirẹsi, apakan itan wọn jẹ gbangba bi Bitcoin. lati fi idi iṣẹ ti o ni aabo rẹ han si ẹnikan ti o yan, gẹgẹbi akọọlẹ kan, pin bọtini wiwo dipo ki o sọ di gbangba. wo [awọn bọtini Wiwo](https://zechub.wiki/zcash-tech/viewing-keys#content) ojú ìwé.


### Atọ́nà Oníhùwà

Àwọn àpẹẹrẹ mẹ́rin tí ó dára nípa àwọn olùwádìí blockchain tí ó yàtọ̀ síra rèé:

* [Mempool.space] Àkọlé àwòrán](https://mempool.space)
* [Ìṣirò ìmúdàgba](https://etherscan.io/)
* [Ìwádìí Ìdìpọ̀ Zcash](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ì í ê° ì¡°ì ¬í ]](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![ì í ì ¬ë¦¬í ì 'í ̧!](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


! [ìgbáálá ayé]](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)





<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Àwọn Olùwádìí Blockchain

## Ìfilọ́lẹ̀

In the traditional business world every transaction includes a receipt for proof of purchase. Similarly, in the blockchain world a user receives a digital receipt in the form of a transaction id for every transaction completed. Most wallets will provide this for you. Blockchain explorers are simply tools that allow one to visualize what has already happened on a blockchain. They take for inputs: transaction id's, addresses, or block hashes, and visually output what took place.

## Àwọn Àpẹẹrẹ
<div>

- Bitcoin: ì í ë ¤. [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: ì í ë ¤ . [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Àgbáyé: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (ìpínlẹ̀): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (ìkómọ́ra): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Kíyèsí pẹ̀lú Zcash bí ìnáwó kejì ṣe ní gbogbo àwọn àlàyé pàtàkì tí ó fara sin, èyí jẹ́ ohun tó ṣe kókó àti pé o ni ipa ńlá nínú ayé oni-nọmba.


## Àwọn àwòrán Blockchain

Nitorina a ni yi gun okun ti awọn ohun kikọ bi kan oniwe-receipt, kini bayi? Eyi ni ibi ti a lo a [olùwádìí blockchain](https://nym.com/blog/using-blockchain-privately), tabi maapu, lati ran wa lọwọ ni sisọ ohun ti o ṣẹlẹ lori blockchain. ṣe akiyesi bi ẹwọn kọọkan ba ni ẹya tirẹ ti awọn oniwe-nipasẹ [olùwádìí blockchain](https://nym.com/blog/using-blockchain-privately) ó ṣe pàtàkì láti lóye wípé gbogbo àwọn iṣẹ́ ìkọ̀ǹpín yìí jẹ àpẹẹrẹ software àpapọ̀. ìyẹn ni pé, ẹnikẹ́ni lè kópa nínú rẹ tàbí kí wọ́n pín ẹ̀dà kòódì náà ní ìbámu pẹ̀lú ìfẹ́ ọkàn wọn. nípa òye yẹn, ọ̀kọ̀ọ̀kan ètò ń dáńgájíá lórí onírúurú ibi tí yóò sì máa ṣètò olùwádìí blockchain fún ohun tó bá yẹ ìgbésè èlò náà.

### Àwọn ìdìpọ̀-ìpínlẹ̀
Transactions are placed into *blocks*. When a block is mined/validated every transaction inside that block is confirmed and a block hash is created. Any hash created can be input into a block explorer. You may have seen CEX's needing a number of *confirmations* before they release your funds, this is the metric they are using to make sure your transaction is 
sufficiently finalized. How does the blockchain determine which transactions get into the next block? Complex topic of research, but most modern chains use the idea of *fees* to determine who gets into the front of the line. The higher the fee, the higher the chance you move up to the front of the queue.

### Àwọn Àdúgbò Tó Wà

Ọ̀nà tó gbádùn mọ́ láti fi ojú rí nǹkan kọ́ni. [àwọn olùwádìí blockchain](https://nym.com/blog/using-blockchain-privately) is to input the address of any random transaction. Then you can move backward in time and see where the funds originated! Each transaction has both an input and output address.  Armed with this information, one can readily move both forward and backward from any transaction that has been spent. For those that like puzzles, this is the digital equivalent of a huge financial puzzle, and could be used for transparency purposes. Using a blockchain explorer makes this not only much easier to visualize, it *also highlights* the need for transaction privacy. Unless you're using shielded Zcash, you can do this with *any* transparent blockchain: BTC, ETH, ATOM, DOGE, VTC, etc ... . This point is critical for anyone using the blockchain safely moving into a digital only future.

### Iye owó tó wà nínú rẹ̀

Similar to addresses above, any transaction on a public blockchain has the amounts publicly available on full display. This includes amounts on both the input and output addresses for any transaction. One exception to this is when you choose to use Shielded Zcash -- then all amounts are hidden. For small business owners who necessarily need privacy for *fair trade*, this is a huge benefit!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Ohun tí olùwádìí lè rí àti ohun tó ò le rí lórí Zcash

#### TL;DR
- Ìwà ìfọ̀rọ̀rora-ẹni (`t`) adirẹsi ni o wa patapata han lori ohun explorer, bi Bitcoin
- Awọn iṣowo ti o ni aabo patapata (z si z) fi iye pamọ, awọn adirẹsi, ati akọsilẹ naa.
- Owó náà ṣì ń hàn, kódà lórí ìnájà tí a fi ààbò bo pátápátá.
- Ìdáàbòbò (ìyípadà) `t` láti fi ààbò) àti deshielding (ààbò padà sí `t`) ni a lè rí ní apá kan, nítorí pé ìhà kan wà tí ó ṣe kedere.
- Ìpamọ́ máa ń wà níwọ̀n ìgbà tí owó bá ti dúró nínú àwọn àgbá tó ni ìbòjú.

Zcash ní oríṣi àdírẹ́sì tó ju ẹyọ kan lọ, àti pé àwọn olùwádìí máa ń ṣe wọ̀n lóore òdì.

Àwọn àdírẹ́sì tí ó ṣe kedere, tó bẹ̀rẹ̀ pẹlú: `t`, ṣiṣẹ́ bíi Bitcoin. Àwòrán-ìwádìí fi ẹni tó ránṣẹ́, olùgbà árífín náà hàn wá, iye owó tí wọ́n fún un àti ibi táwọn èèyàn ti rí i pé ó gba owó yìí.

Adirẹsi ti a fi pamọ ni apa aladani. Awọn owo-owo ninu Sapling tabi Orchard [àwọn adágún tí a fi ààbò ṣe](https://zechub.wiki/using-zcash/shielded-pools#content) a dáàbò bò wọ́n nípa ìjẹ̀rí ìmọ-òfo. wo àdáwòṣe tí ó ni ìdánilójú pátápátá àti olùwádìí kò lè fi iye, àwọn àdírésì tàbí àkọsílẹ̀ hàn. o le jẹrisi nìkan pé ìṣọ̀kan tó bágbà mu wáyé ti wọn sì kọ sínú ẹyọ kan. èyí ni àpẹẹrẹ àṣírí tí a fi han ní apá òkè ojúewé yìí.

Awon ohun elo ti o wa ni ipamọ fun awọn iṣowo aabo patapata: owo sisan. Awọn ofin igbẹkẹle Zcash nilo idiyele ṣiṣan lati sọ kedere, nitorinaa oluwadi le fihan nigbagbogbo, paapaa nigbati awọn iye ba farapamọ. Fun idi eyi o jẹ iṣe to dara lati lo ọya apamọwọ boṣewa, nitorina idunadura rẹ ko ṣe jade nipa sanwo iye kan ti a ko wọpọ.

Awọn explorer le tun ri nigbati owo kọja laarin awọn han ati ki o bo ẹgbẹ. gbigbe `t` awọn owo sinu kan adagun ni shielding, gbigbe wọn pada jade ti wa ni deshielding. awon crossings o jẹ apakan han nitori ọkan ẹgbẹ jẹ ṣiṣanwọle. nikan patapata ikọkọ z to z iṣẹ-ṣiṣe, eyi ti ko ba fi ọwọ a `t` Adirẹsi, tọju ohun gbogbo ṣugbọn owo ti a fi pamọ.

Ohun tí a lè rí kọ́: ìpamọ́ wa sinmi lórí wíwà nínú àwọn adágún tó ní ààbò. `t` lati fi idi iṣẹ ti o ni aabo han si ẹnikan ti o yan, gẹgẹbi onimọ-owo kan, pin bọtini wiwo dipo ki o ṣe gbangba. wo awọn ohun elo fun fifipamọ data rẹ ati pe yoo jẹ ki gbogbo eniyan mọ nipa wọn. [Àwọn Kókó Ìwòran](https://zechub.wiki/zcash-tech/viewing-keys#content) ojú ìwé.


### Àtòjọ àwọn olùwádìí ìdìpò Zcash

- [Zcash Block Explorer (ìwádìí ìdìpọ̀)](https://mainnet.zcashexplorer.app/)

- [Àga ìjókòó orí àpò.](https://blockchair.com)

- [3xpl (ì í ì)](https://3xpl.com/zcash)

- [Ìlé ìfowópamọ́](https://explorer.bitquery.io/zcash)


### Atọ́nà Oníran

Àwọn àpẹẹrẹ mẹ́rin tó dára nípa àwọn olùwádìí blockchain tí ó yàtọ̀ síra rèé:

* [Mempool.space (ìkànnì ìkórìíra)](https://mempool.space)
* [Ethscan (ìfiwéra)](https://etherscan.io/)
* [Zcash Block Explorer (ìwádìí ìdìpọ̀)](https://mainnet.zcashexplorer.app)
* [Ìwòràn ìdìbò](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)





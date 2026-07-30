<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Wachunguzi wa blockchain

## Utangulizi

In the traditional business world every transaction includes a receipt for proof of purchase. Similarly, in the blockchain world a user receives a digital receipt in the form of a transaction id for every transaction completed. Most wallets will provide this for you. Blockchain explorers are simply tools that allow one to visualize what has already happened on a blockchain. They take for inputs: transaction id's, addresses, or block hashes, and visually output what took place.

## Mifano
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (umma): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (binafsi): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Angalia na Zcash jinsi shughuli ya pili ina maelezo yote muhimu siri, hii ni muhimu na ina athari kubwa katika ulimwengu wa digital.


## Ramani za blockchain

Hivyo tuna hii mfululizo mrefu wa wahusika kama risiti digital, nini sasa? Hii ni ambapo sisi kutumia [blockchain Explorer](https://nym.com/blog/using-blockchain-privately), au ramani, kutusaidia kuchimba kile kilichotokea kwenye blockchain. Angalia jinsi kila mlolongo ina toleo lake mwenyewe ya [blockchain Explorer](https://nym.com/blog/using-blockchain-privately) above. It's important to understand that all these blockchain projects are examples of open source software. That is, anyone can contribute to and or fork the code to their liking. With that understanding, each project specializes in different areas and customizes the blockchain explorer to fit the needs of said project.

### Vitalu
Transactions are placed into *blocks*. When a block is mined/validated every transaction inside that block is confirmed and a block hash is created. Any hash created can be input into a block explorer. You may have seen CEX's needing a number of *confirmations* before they release your funds, this is the metric they are using to make sure your transaction is 
Jinsi gani blockchain kuamua ambayo shughuli kupata katika block ijayo? Complex mada ya utafiti, lakini minyororo zaidi ya kisasa kutumia wazo la * ada * kuamua nani anapata katika mbele ya mstari.

### Anwani

Njia ya kujifurahisha ya kujifunza kwa kuona [blockchain wavumbuzi](https://nym.com/blog/using-blockchain-privately) is to input the address of any random transaction. Then you can move backward in time and see where the funds originated! Each transaction has both an input and output address.  Armed with this information, one can readily move both forward and backward from any transaction that has been spent. For those that like puzzles, this is the digital equivalent of a huge financial puzzle, and could be used for transparency purposes. Using a blockchain explorer makes this not only much easier to visualize, it *also highlights* the need for transaction privacy. Unless you're using shielded Zcash, you can do this with *any* transparent blockchain: BTC, ETH, ATOM, DOGE, VTC, etc ... . This point is critical for anyone using the blockchain safely moving into a digital only future.

### Kiasi

Similar to addresses above, any transaction on a public blockchain has the amounts publicly available on full display. This includes amounts on both the input and output addresses for any transaction. One exception to this is when you choose to use Shielded Zcash -- then all amounts are hidden. For small business owners who necessarily need privacy for *fair trade*, this is a huge benefit!

![ kiasi](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Nini mtafiti anaweza na hawezi kuona juu ya Zcash

#### TL;DR
- Uwazi (`t`) anwani ni kikamilifu inayoonekana kwenye Explorer, kama Bitcoin
- Kikamilifu shielded (z kwa z) shughuli kuficha kiasi, anwani, na memo
- ada ni bado inayoonekana, hata juu ya shughuli kikamilifu ulinzi
- Kulinda (kuhamisha `t` kwa kulindwa) na deshielding (kulindwa nyuma kwa `t`) ni sehemu inayoonekana, kwa sababu upande mmoja ni uwazi
- Faragha inashikilia tu kama fedha kukaa ndani ya mabwawa ulinzi

Zcash ina zaidi ya aina moja ya anwani, na mtafiti anawatendea tofauti sana.

anwani uwazi, kuanzia na `t`, kazi kama Bitcoin. Explorer inaonyesha mtumaji, mpokeaji, kiasi, na kufuatilia nyuma ambapo fedha alitoka.

anwani Shielded ni upande binafsi. Fedha katika Sapling au Orchard [kuhifadhiwa mabwawa](https://zechub.wiki/using-zcash/shielded-pools#content) ni kulindwa na zero maarifa uthibitisho. Angalia juu ya shughuli kikamilifu ulinzi na Explorer hawezi kuonyesha kiasi, anwani, au memo. Inaweza tu kuthibitisha kwamba shughuli halali kilichotokea na ilikuwa kumbukumbu katika block. Hii ni siri binafsi mfano inavyoonekana karibu juu ya ukurasa huu.

One detail does stay visible even for fully shielded transactions: the fee. Zcash consensus rules require the transparent fee to be stated explicitly, so an explorer can always show it, even when the amounts are masked. For that reason it is good practice to use the standard wallet fee, so your transaction does not stand out by paying an unusual amount.

Explorer pia unaweza kuona wakati fedha kuvuka kati ya uwazi na walinzi pande. `t` funds into a pool is shielding, moving them back out is deshielding. Those crossings are partly visible because one side is transparent. Only fully private z to z activity, which never touches a `t` anwani, anaweka kila kitu lakini ada siri.

Takeaway: faragha inategemea kukaa ndani ya mabwawa shielded. `t` Kuonyesha shughuli yako mwenyewe ulinzi kwa mtu wewe kuchagua, kama vile mhasibu, kushiriki kuangalia muhimu badala ya kufanya hivyo umma. Angalia [Kuangalia Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) ukurasa.


### Mwongozo wa Picha

Hapa ni mifano minne nzuri ya wachunguzi mbalimbali blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


! [BitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


[EthExplorer]](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


[ZcashExplorer]](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


[cosmos]](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)





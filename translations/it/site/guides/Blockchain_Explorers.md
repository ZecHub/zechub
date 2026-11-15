<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blockchain Explorers

## Introduzione

Nel mondo commerciale tradizionale ogni transazione include una ricevuta come prova di acquisto. Allo stesso modo, nel mondo blockchain un utente riceve una ricevuta digitale sotto forma di un id di transazione per ogni transazione completata. La maggior parte dei portafogli te lo fornisce. I blockchain explorer sono semplicemente strumenti che permettono di visualizzare cosa è già successo su una blockchain. Prendono come input: id di transazione, indirizzi o hash di blocco, e restituiscono visivamente cosa è avvenuto.

## Esempi
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (pubblica): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://mainnet.zcashexplorer.app/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privata): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://mainnet.zcashexplorer.app/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Nota come, con Zcash, la seconda transazione abbia tutti i dettagli importanti nascosti: questo è importante e ha grandi implicazioni in un mondo digitale.


## Mappe della blockchain

Quindi abbiamo questa lunga stringa di caratteri come ricevuta digitale. E adesso? Ed è qui che usiamo un [blockchain explorer](https://nym.com/blog/using-blockchain-privately), cioè una mappa, per aiutarci a digerire cosa è successo sulla blockchain. Nota come ogni chain abbia la propria versione di [blockchain explorer](https://nym.com/blog/using-blockchain-privately) qui sopra. È importante capire che tutti questi progetti blockchain sono esempi di software open source. Cioè, chiunque può contribuire al codice o farne un fork a proprio piacimento. Tenendo presente questo, ogni progetto si specializza in ambiti diversi e personalizza il blockchain explorer per adattarlo alle esigenze del progetto in questione.

### Blocchi
Le transazioni vengono inserite nei *blocchi*. Quando un blocco viene minato/convalidato, ogni transazione all'interno di quel blocco viene confermata e viene creato un hash di blocco. Qualsiasi hash creato può essere inserito in un block explorer. Potresti aver visto dei CEX richiedere un certo numero di *conferme* prima di rilasciare i tuoi fondi: questa è la metrica che usano per assicurarsi che la tua transazione sia 
sufficientemente finalizzata. Come fa la blockchain a determinare quali transazioni entrano nel blocco successivo? È un complesso tema di ricerca, ma la maggior parte delle chain moderne usa l'idea delle *commissioni* per determinare chi passa avanti alla fila. Più alta è la commissione, più alta è la probabilità che tu avanzi fino alla testa della coda.

### Indirizzi

Un modo divertente per imparare visivamente a usare i [blockchain explorer](https://nym.com/blog/using-blockchain-privately) è inserire l'indirizzo di una transazione qualsiasi. Poi puoi andare indietro nel tempo e vedere da dove hanno origine i fondi![Schermata di verifica in 2 passaggi]Ogni transazione ha sia un indirizzo di input sia uno di output.  Con questa informazione a disposizione, puoi spostarti agevolmente avanti e indietro da qualsiasi transazione che è stata spesa. Per chi ama i rompicapo, questo è l'equivalente digitale di un enorme rompicapo finanziario, e potrebbe essere usato a fini di trasparenza. Usare un blockchain explorer non solo rende tutto questo molto più facile da visualizzare, ma *evidenzia anche* la necessità di privacy nelle transazioni. A meno che tu non stia usando Zcash schermato, puoi farlo con *qualsiasi* blockchain trasparente: BTC, ETH, ATOM, DOGE, VTC, ecc ... . Questo punto è cruciale per chiunque voglia usare la blockchain in sicurezza, andando verso un futuro solo digitale.

### Importi

Come per gli indirizzi visti sopra, qualsiasi transazione su una blockchain pubblica ha gli importi disponibili pubblicamente, in piena vista. Questo vale per gli importi sia sugli indirizzi di input sia su quelli di output di qualsiasi transazione. Un'eccezione è quando scegli di usare Zcash schermato -- allora tutti gli importi sono nascosti. Per i titolari di piccole imprese che necessariamente hanno bisogno di privacy per il *commercio equo*, questo è un enorme vantaggio!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Cosa può e non può vedere un explorer su Zcash

#### TL;DR
- Gli indirizzi trasparenti (`t`) sono completamente visibili su un explorer, proprio come Bitcoin
- Le transazioni completamente schermate (da z a z) nascondono l'importo, gli indirizzi e il memo
- La commissione resta visibile, anche su una transazione completamente schermata
- Lo shielding (portare `t` nel lato schermato) e il deshielding (dal lato schermato di nuovo a `t`) sono in parte visibili, perché uno dei due lati è trasparente
- La privacy vale solo finché i fondi restano dentro le pool schermate

Zcash ha più di un tipo di indirizzo, e un explorer li tratta in modi molto diversi.

Gli indirizzi trasparenti, che iniziano con `t`, funzionano come Bitcoin. Un explorer mostra il mittente, il destinatario, l'importo e la traccia all'indietro fino a dove hanno origine i fondi.

Gli indirizzi schermati sono il lato privato. I fondi nella Sapling o nella Orchard, nelle [pool schermate](https://zechub.wiki/using-zcash/shielded-pools#content), sono protetti da prove a conoscenza zero. Cerca una transazione completamente schermata e l'explorer non può mostrare l'importo, gli indirizzi o il memo. Può solo confermare che è avvenuta una transazione valida, registrata in un blocco. Questo è l'esempio privato nascosto mostrato vicino all'inizio di questa pagina.

Un dettaglio resta però visibile anche per le transazioni completamente schermate: la commissione. Le regole di consenso di Zcash richiedono che la commissione trasparente sia dichiarata esplicitamente, quindi un explorer può sempre mostrarla, anche quando gli importi sono mascherati. Per questo motivo è buona pratica usare la commissione standard del portafoglio, così la tua transazione non si distingue per aver pagato un importo insolito.

L'explorer può anche vedere quando i fondi passano tra il lato trasparente e quello schermato. Spostare `t` in una pool è shielding, e spostarlo di nuovo fuori è deshielding. Questi passaggi sono in parte visibili, perché uno dei due lati è trasparente. Solo l'attività completamente privata da z a z, che non tocca mai un indirizzo `t`, tiene nascosto tutto tranne la commissione.

Il punto da ricordare: la privacy dipende dal restare dentro le pool schermate. Una volta che i fondi toccano un indirizzo `t`, quella parte della loro storia è pubblica quanto Bitcoin. Per provare la tua stessa attività schermata a qualcuno che scegli tu, come un commercialista, condividi una chiave di visualizzazione invece di renderla pubblica. Vedi la pagina [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Elenco dei Block Explorers di Zcash

- [Zcash Block Explorer](https://mainnet.zcashexplorer.app/)

- [3xpl](https://3xpl.com/zcash)

- [ShieldedScan](https://shieldedscan.xyz)

- [ZecBlock](https://zecblock.com/)

- [SoChain](https://sochain.com/zec) ([testnet](https://sochain.com/zectest))

- [ZecZcash Explorer](https://zeczcash.com/explorer)



### Guida visiva

Ecco quattro buoni esempi di blockchain explorer differenti:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)

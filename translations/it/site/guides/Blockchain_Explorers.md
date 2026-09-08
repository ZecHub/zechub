<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Esploratori blockchain

## Introduzione

Nel mondo aziendale tradizionale, ogni transazione include una ricevuta come prova d'acquisto. Analogamente, nel mondo blockchain un utente riceve una ricevuta digitale sotto forma di ID della transazione per ogni transazione completata. La maggior parte dei wallet lo fornisce automaticamente. Gli esploratori blockchain sono semplicemente strumenti che permettono di visualizzare ciò che è già accaduto su una blockchain. Accettano come input: ID delle transazioni, indirizzi o hash dei blocchi, e mostrano visivamente ciò che è avvenuto.

## Esempi
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (pubblica): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privata): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Nota come con Zcash la seconda transazione abbia tutti i dettagli importanti nascosti: questo è importante e ha grandi implicazioni in un mondo digitale.


## Mappe blockchain

Quindi abbiamo questa lunga stringa di caratteri come ricevuta digitale, e ora? Qui utilizziamo un [esploratore blockchain](https://nym.com/blog/using-blockchain-privately), o una mappa, per aiutarci a comprendere ciò che è accaduto sulla blockchain. Nota come ogni chain abbia la propria versione di [esploratore blockchain](https://nym.com/blog/using-blockchain-privately) qui sopra. È importante comprendere che tutti questi progetti blockchain sono esempi di software open source. Vale a dire, chiunque può contribuire al codice e/o crearne un fork secondo le proprie preferenze. Con questa consapevolezza, ogni progetto si specializza in aree diverse e personalizza l'esploratore blockchain per adattarlo alle esigenze del progetto stesso.

### Blocchi
Le transazioni vengono inserite nei *blocchi*. Quando un blocco viene minato/validato, ogni transazione al suo interno viene confermata e viene creato un hash del blocco. Qualsiasi hash creato può essere inserito in un esploratore di blocchi. Potresti aver visto CEX richiedere un certo numero di *conferme* prima di rilasciare i tuoi fondi: questa è la metrica che utilizzano per assicurarsi che la tua transazione sia 
sufficientemente finalizzata. Come determina la blockchain quali transazioni entrano nel blocco successivo? È un tema di ricerca complesso, ma la maggior parte delle chain moderne utilizza il concetto di *commissioni* per determinare chi arriva in testa alla fila. Più alta è la commissione, maggiore è la probabilità di avanzare verso l'inizio della coda.

### Indirizzi

Un modo divertente per imparare visivamente a usare gli [esploratori blockchain](https://nym.com/blog/using-blockchain-privately) è inserire l'indirizzo di una transazione casuale. Potrai poi tornare indietro nel tempo e vedere da dove hanno avuto origine i fondi! Ogni transazione ha sia un indirizzo di input sia un indirizzo di output.  Con queste informazioni, si può facilmente procedere sia in avanti sia indietro da qualsiasi transazione che è stata spesa. Per chi ama gli enigmi, questo è l'equivalente digitale di un enorme puzzle finanziario e potrebbe essere utilizzato per finalità di trasparenza. Usare un esploratore blockchain non solo rende tutto molto più facile da visualizzare, ma *evidenzia anche* la necessità della privacy delle transazioni. A meno che tu non stia usando Zcash schermato, puoi farlo con *qualsiasi* blockchain trasparente: BTC, ETH, ATOM, DOGE, VTC, ecc. ... . Questo punto è fondamentale per chiunque utilizzi la blockchain in sicurezza, dirigendosi verso un futuro esclusivamente digitale.

### Importi

Come per gli indirizzi sopra, qualsiasi transazione su una blockchain pubblica rende gli importi disponibili pubblicamente e in bella vista. Questo include gli importi sia sugli indirizzi di input sia su quelli di output di qualsiasi transazione. Un'eccezione si verifica quando scegli di usare Zcash schermato -- allora tutti gli importi sono nascosti. Per i titolari di piccole imprese che hanno necessariamente bisogno di privacy per un *commercio equo*, questo rappresenta un enorme vantaggio!

![importi](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Cosa può e non può vedere un esploratore su Zcash

#### TL;DR
- Gli indirizzi trasparenti (`t`) sono completamente visibili in un esploratore, proprio come Bitcoin
- Le transazioni completamente schermate (da z a z) nascondono l'importo, gli indirizzi e il memo
- La commissione rimane visibile, anche in una transazione completamente schermata
- La schermatura (spostare fondi da `t` a schermati) e la deschermatura (da schermati a `t`) sono in parte visibili, perché un lato è trasparente
- La privacy è mantenuta solo finché i fondi rimangono nei pool schermati

Zcash ha più di un tipo di indirizzo e un esploratore li tratta in modi molto diversi.

Gli indirizzi trasparenti, che iniziano con `t`, funzionano come Bitcoin. Un esploratore mostra il mittente, il destinatario, l'importo e la traccia che risale all'origine dei fondi.

Gli indirizzi schermati sono il lato privato. I fondi nei [pool schermati](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling o Orchard sono protetti da prove a conoscenza zero. Cerca una transazione completamente schermata e l'esploratore non potrà mostrare l'importo, gli indirizzi o il memo. Può solo confermare che una transazione valida è avvenuta ed è stata registrata in un blocco. Questo è l'esempio privato nascosto mostrato vicino all'inizio di questa pagina.

Un dettaglio rimane visibile anche per le transazioni completamente schermate: la commissione. Le regole di consenso di Zcash richiedono che la commissione trasparente sia indicata esplicitamente, quindi un esploratore può sempre mostrarla, anche quando gli importi sono mascherati. Per questo motivo, è buona pratica utilizzare la commissione standard del wallet, così la tua transazione non risalta pagando un importo insolito.

L'esploratore può anche vedere quando i fondi passano tra il lato trasparente e quello schermato. Spostare fondi `t` in un pool è schermatura, mentre spostarli nuovamente fuori è deschermatura. Questi passaggi sono in parte visibili perché un lato è trasparente. Solo l'attività completamente privata da z a z, che non tocca mai un indirizzo `t`, mantiene nascosto tutto tranne la commissione.

Il punto principale: la privacy dipende dal rimanere nei pool schermati. Una volta che i fondi toccano un indirizzo `t`, quella parte della loro cronologia è pubblica quanto Bitcoin. Per dimostrare a una persona da te scelta la tua attività schermata, ad esempio a un commercialista, condividi una viewing key invece di renderla pubblica. Consulta la pagina sulle [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Elenco degli esploratori di blocchi Zcash

- [Esploratore di blocchi Zcash](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### Guida visiva

Ecco quattro buoni esempi di diversi esploratori blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Esploratore di blocchi Zcash](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)

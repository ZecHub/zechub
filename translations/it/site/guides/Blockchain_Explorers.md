<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Block explorer

## Introduzione

Nel mondo degli affari tradizionale ogni transazione include una ricevuta come prova d'acquisto. Allo stesso modo, nel mondo della blockchain un utente riceve una ricevuta digitale sotto forma di id della transazione per ogni transazione completata. La maggior parte dei wallet te la fornisce. I block explorer sono semplicemente strumenti che permettono di visualizzare ciò che è già accaduto su una blockchain. Prendono in input: id delle transazioni, indirizzi o hash dei blocchi, e mostrano visivamente ciò che è avvenuto.

## Esempi
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (pubblica): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privata): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Nota come, con Zcash, la seconda transazione abbia tutti i dettagli importanti nascosti; questo è importante e ha grandi implicazioni in un mondo digitale.


## Mappe della blockchain

Quindi abbiamo questa lunga stringa di caratteri come ricevuta digitale, e adesso? È qui che usiamo un [block explorer](https://nym.com/blog/using-blockchain-privately), o mappa, per aiutarci a digerire ciò che è accaduto sulla blockchain. Nota come ciascuna chain abbia sopra la propria versione di [block explorer](https://nym.com/blog/using-blockchain-privately). È importante capire che tutti questi progetti blockchain sono esempi di software open source. Cioè, chiunque può contribuire e/o forkare il codice a proprio piacimento. Con questa comprensione, ciascun progetto si specializza in aree diverse e personalizza il block explorer per adattarlo alle esigenze di quel progetto.

### Blocchi
Le transazioni vengono inserite nei *blocchi*. Quando un blocco viene minato/validato, ogni transazione al suo interno viene confermata e viene creato un hash del blocco. Qualsiasi hash creato può essere inserito in un block explorer. Potresti aver visto i CEX richiedere un certo numero di *conferme* prima di rilasciare i tuoi fondi: questa è la metrica che usano per assicurarsi che la tua transazione sia 
sufficientemente finalizzata. Come fa la blockchain a determinare quali transazioni entrano nel prossimo blocco? È un argomento di ricerca complesso, ma la maggior parte delle chain moderne usa l'idea delle *commissioni* per determinare chi finisce in cima alla coda. Più alta è la commissione, più alta è la probabilità di avanzare verso la testa della coda.

### Indirizzi

Un modo divertente per imparare visivamente i [block explorer](https://nym.com/blog/using-blockchain-privately) è inserire l'indirizzo di una qualsiasi transazione casuale. Poi puoi muoverti indietro nel tempo e vedere da dove provenivano i fondi! Ogni transazione ha sia un indirizzo di input che uno di output.  Armati di queste informazioni, si può facilmente muoversi sia in avanti che indietro a partire da qualsiasi transazione che sia stata spesa. Per chi ama gli enigmi, questo è l'equivalente digitale di un enorme puzzle finanziario e potrebbe essere usato a fini di trasparenza. Usare un block explorer non solo rende tutto questo molto più facile da visualizzare, ma *mette anche in evidenza* la necessità della privacy nelle transazioni. A meno che tu non stia usando Zcash schermato, puoi farlo con *qualsiasi* blockchain trasparente: BTC, ETH, ATOM, DOGE, VTC, ecc. ... . Questo punto è critico per chiunque usi la blockchain in modo sicuro avviandosi verso un futuro solo digitale.

### Importi

Analogamente agli indirizzi di cui sopra, qualsiasi transazione su una blockchain pubblica ha gli importi disponibili pubblicamente, in bella vista. Questo include gli importi sia sugli indirizzi di input che su quelli di output di qualsiasi transazione. Un'eccezione a questo è quando scegli di usare Zcash schermato: allora tutti gli importi sono nascosti. Per i piccoli imprenditori che hanno necessariamente bisogno di privacy per un *commercio equo*, questo è un enorme vantaggio!

![amounts](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Cosa un explorer può e non può vedere su Zcash

#### TL;DR
- Gli indirizzi trasparenti (`t`) sono completamente visibili su un explorer, proprio come Bitcoin
- Le transazioni completamente schermate (da z a z) nascondono l'importo, gli indirizzi e il memo
- La commissione è comunque visibile, anche su una transazione completamente schermata
- Lo shielding (spostare `t` verso schermato) e il deshielding (da schermato di nuovo a `t`) sono parzialmente visibili, perché un lato è trasparente
- La privacy si mantiene solo finché i fondi restano dentro i pool schermati

Zcash ha più di un tipo di indirizzo, e un explorer li tratta in modo molto diverso.

Gli indirizzi trasparenti, che iniziano con `t`, funzionano come Bitcoin. Un explorer mostra il mittente, il destinatario, l'importo e la scia che riconduce a dove provenivano i fondi.

Gli indirizzi schermati sono il lato privato. I fondi nei [pool schermati](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling o Orchard sono protetti da prove a conoscenza zero. Cerca una transazione completamente schermata e l'explorer non può mostrare l'importo, gli indirizzi o il memo. Può confermare solo che è avvenuta una transazione valida ed è stata registrata in un blocco. Questo è l'esempio privato nascosto mostrato in cima a questa pagina.

Un dettaglio resta comunque visibile anche per le transazioni completamente schermate: la commissione. Le regole di consenso di Zcash richiedono che la commissione trasparente sia dichiarata esplicitamente, quindi un explorer può sempre mostrarla, anche quando gli importi sono mascherati. Per questo motivo è buona pratica usare la commissione standard del wallet, così che la tua transazione non si distingua per il pagamento di un importo insolito.

L'explorer può anche vedere quando i fondi attraversano tra il lato trasparente e quello schermato. Spostare fondi `t` in un pool è lo shielding, riportarli fuori è il deshielding. Questi attraversamenti sono parzialmente visibili perché un lato è trasparente. Solo l'attività completamente privata da z a z, che non tocca mai un indirizzo `t`, mantiene nascosto tutto tranne la commissione.

La conclusione: la privacy dipende dal restare dentro i pool schermati. Una volta che i fondi toccano un indirizzo `t`, quella parte della loro storia è pubblica quanto Bitcoin. Per dimostrare la tua attività schermata a qualcuno che scegli tu, come un commercialista, condividi una viewing key invece di renderla pubblica. Vedi la pagina [Viewing Key](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Guida visiva

Ecco quattro buoni esempi di diversi block explorer:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)





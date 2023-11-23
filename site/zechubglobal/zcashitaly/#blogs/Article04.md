# Riassunto completo di Zcash

### 20/05/2023 15:00 PM

## Cos’è Zcash

Zcash è nata il 28 ottobre 2016, ed è una criptovaluta innovativa che si basa sulla tecnologia blockchain. Il suo codice deriva dal fork di Bitcoin ed è nota per essere la prima blockchain ad adottare le prove a conoscenza zero (ZKP), utilizzate per garantire privacy e anonimato delle transazioni.

Ci sono due tipi di indirizzi in Zcash: gli indirizzi "trasparenti" e gli indirizzi "schermati". Gli indirizzi trasparenti funzionano come quelli di Bitcoin, ovvero i dati della transazione sono pubblici e visibili sulla blockchain. Gli indirizzi schermati, invece, consentono di effettuare transazioni senza rivelare i dettagli della transazione stessa, come l'importo e gli indirizzi coinvolti.

Per garantire la sicurezza e la decentralizzazione, Zcash utilizza il meccanismo di consenso di proof-of-work (PoW), simile a quello di Bitcoin ma con un algoritmo diverso, Equihash. Questo comporta che la rete sia sostenuta da minatori che risolvono complessi problemi matematici per convalidare le transazioni e mantenere la sicurezza della rete.

## Come funziona Zcash

La privacy offerta da Zcash utilizza le prove a conoscenza zero (ZKP), una tecnologia che consente di creare transazioni completamente anonime senza rivelare i dettagli delle transazioni a nessuno, neppure ai miner o ai nodi della rete.

La tecnologia ZKP non utilizza tecniche di mixing ma bensì la criptazione dei dati, il che le permette di garantire la privacy, rendendo impossibile l’analisi dei dati, anche in casi di bassa attività sulla rete. In questo modo, Zcash offre un livello di privacy molto più alto rispetto ad altre criptovalute focalizzate sulla privacy, o rispetto a servizi di terze parti che offrono la privacy per blockchain pubbliche.

Come menzionato in precedenza, Zcash offre diversi tipi di indirizzi per diverse esigenze, in particolare abbiamo tre tipi di indirizzi, due dei quali legati alla propria pool di valori, che d’ora in poi chiameremo “pool” per questioni di semplicità.

Gli **indirizzi “T”** detti anche "trasparenti" sono legati all’unica pool non schermata, detta anche pool trasparente. Le transazioni di questa pool funzionano come quelle di Bitcoin, in quanto non necessitano di alcun livello di riservatezza, rendendo ciascun dettaglio pienamente visibile tramite un semplice blockexplorer. Di conseguenza, è possibile visionare l'ammontare della transazione, l'indirizzo di partenza e quello di destinazione.

Il 28 ottobre 2018, in Zcash sono stati introdotti la **pool Sapling** e gli **indirizzi “ZS”**, che utilizzano un tipo di ZKP denominato zk-SNARKs, per garantire la privacy delle transazioni. In termini pratici, quando si fa uso di un indirizzo della pool Sapling, tutti i dettagli relativi alla transazione, come l'importo e gli indirizzi coinvolti, non vengono visualizzati sulla blockchain. Le informazioni delle transazioni vengono infatti criptate attraverso un processo che utilizza l’algoritmo zk-SNARKs, garantendo così un elevato livello di privacy e anonimato. La pool Sapling utilizza una versione più sicura e scalabile dell’algoritmo zk-SNARKs utilizzato dalla ormai obsoleta e non più in uso pool **schermata Sprout**, identificata con gli **indirizzi “ZC”**.

Il 31 Maggio 2022, con l’aggiornamento chiamato NU5, vengono introdotte diverse novità, tra cui gli **indirizzi unificati**, identificati con la lettera “U”. Questi tipi di indirizzi sono diversi dagli indirizzi che abbiamo conosciuto prima, in quanto non sono legati a nessuna pool in particolare, anche se è un equivoco comune credere che siano collegati alla pool Orchard introdotta con lo stesso aggiornamento.

Un indirizzo unificato è un indirizzo generico che può contenere vari elementi interni, noti come "ricevitori". Questo significa che può includere ricevitori provenienti da diverse pool, consentendo così la personalizzazione del proprio indirizzo "U" in base alle proprie necessità.
Ad esempio, possiamo creare un indirizzo con un mix di ricevitori della pool Trasparente + Sapling + Orchard, Sapling + Orchard, o qualsiasi altra combinazione di pool. Questo offre la massima flessibilità nella gestione del proprio indirizzo "U".

Un'altra importante caratteristica degli indirizzi unificati è che in teoria potrebbero offrire possibilità di creare indirizzi multiasset, ovvero indirizzi che consentono di inviare e ricevere non solo ZEC ma anche altri asset, in modo simile ad Ethereum con i token ERC-20. Ciò significa che in futuro potrebbero essere utilizzati come piattaforma per lo scambio di asset digitali privati, consentendo alle parti di scambiare asset senza rivelare i dettagli delle transazioni.

## Orchard, Halo, ed il trusteless setup

Orchard ed il suo algoritmo Halo rappresentano un’evoluzione senza precedenti per Zcash e per le prove a conoscenza zero, offrendo un ulteriore passo in avanti per quanto riguarda anonimato e scalabilità delle transazioni. Tuttavia il fattore più importante di tutti è la sicurezza che porta questo algoritmo.

Iniziamo a capire cos’è il trusted setup, fondamentale per capire il principale problema che tenta di risolvere la pool Orchard ed il suo algoritmo Halo.

Il trusted setup, è un elemento imprescindibile di zk-SNARKs, in Zcash ed in tutte le altre criptovalute che utilizzano questo algoritmo. Il processo di trusted setup consiste nel generare una serie di parametri crittografici, necessari sia per criptare che per dimostrare la validità delle transazioni crittografate. Il processo di trusted setup in Zcash può anche essere chiamato “The Ceremony”, in quanto coinvolge diverse decine di partecipanti il che rende il processo estremamente decentralizzato e difficile da compromettere.

Il problema principale del trusted setup è che se il processo di generazione dei parametri non viene eseguito in modo sicuro, potrebbe mettere a rischio la stabilità della base monetaria del network. Motivo per cui questo processo viene chiamato “trusted setup” — perché necessita di una grande quantità di fiducia da parte degli utenti nella sua corretta esecuzione. Per questo motivo la società dietro Zcash, la Electric Coin Company ha sviluppato un nuovo protocollo di zero-knowledge proof (ZKP), chiamato Halo, che oltre ad apportare miglioramenti alla privacy e scalabilità, rimuove il fattore fiducia al processo di generazione dei parametri.

Nell’aggiornamento NU5, con l'introduzione di Orchard ed il suo nuovo algoritmo Halo, il trusted setup viene sostituito con un nuovo approccio chiamato “verifiable ZKP”, comunemente chiamato “trustless setup” che riduce ulteriormente il rischio di compromissione. In particolare, con questo nuovo processo di generazione dei parametri, chiunque può verificare sia il processo iniziale dove si generano i parametri, che l’integrità dei parametri nel tempo, eliminando di fatto il fattore fiducia.

## Conclusione

In conclusione, la continua innovazione, insieme all'introduzione di funzionalità come indirizzi unificati ed Orchard con l'algoritmo Halo, mostra che Zcash è una criptovaluta pronta a rispondere alle esigenze della propria comunità e alle sfide del futuro. Grazie alla combinazione unica di privacy, sicurezza, e scalabilità, Zcash potrebbe rappresentare un importante caposaldo nel panorama delle criptovalute focalizzate sulla privacy e non solo.

La capacità di Zcash di offrire sia indirizzi trasparenti che schermati, con varie combinazioni possibili attraverso gli indirizzi unificati, offre agli utenti un livello di flessibilità senza precedenti. Gli utenti possono adattare le loro esigenze di privacy in base alle situazioni, un aspetto essenziale in un mondo digitale in cui la protezione dei dati personali è sempre più importante. Allo stesso tempo, le potenzialità degli indirizzi unificati in termini di interoperabilità con altri asset digitali potrebbe essere una mossa significativa verso l'integrazione di Zcash con altre blockchain e piattaforme.

Insomma, Zcash è un esempio eccellente di come la tecnologia blockchain può essere sviluppata e adattata per rispondere a nuove sfide e opportunità.

Tuttavia, come tutte le innovazioni, il futuro di Zcash dipenderà dalla sua capacità di adattarsi alle mutevoli esigenze e aspettative degli utenti, così come al contesto normativo e al panorama competitivo delle criptovalute. Nonostante ciò, date le sue caratteristiche uniche e la sua capacità di innovare, Zcash sembra ben posizionata per rimanere una criptovaluta di riferimento per gli anni a venire.


### Social Italiani

[Gruppo Telegram](https://t.me/zcashita) | [Gruppo Discord](https://discord.com/channels/978714252934258779/1091806217359347802) | [Twitter](https://twitter.com/InsideZcash) | [Facebook](https://www.facebook.com/groups/zecitalia)
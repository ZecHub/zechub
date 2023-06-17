# Le pool di valori

Esamineremo le 4 [pool di valori](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html) di Zcash, che comprendono i pool Sprout, Sapling, Orchard e Transparent. Questa pagina wiki tratterà anche i miglioramenti tecnologici e alcune buone pratiche per i trasferimenti tra i pool.


## Shielded pools (Pool schermate)

### Sprout


![zcash-sprout-launch](https://user-images.githubusercontent.com/81990132/233535478-a84724d7-cb0e-4ad8-bfcc-499f665fba24.png)


Sprout è stato il primo protocollo di privacy Zero Knowledge su Zcash ed è talvolta chiamato Zcash 1.0 o "Zcash Ordinario". Il suo lancio è avvenuto il 28 ottobre 2016 ed è stata la prima versione di Zcash che utilizza la tecnologia a prova di conoscenza zero, importante caratteristica della crittografia di ZCash.

Gli indirizzi Sprout sono identificati dalle prime due lettere, sempre "zc", e sono stati chiamati "Sprout" con l'obiettivo di enfatizzare che il software era un giovane blockchain in crescita con un grande potenziale di sviluppo, aperto a nuove implementazioni. La serie Sprout è stata utilizzata come strumento iniziale per [Mining a lento avvio di Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) which brought about the distribution of ZEC and Block rewards for Miners. 

Con l'espansione dell'ecosistema di Zcash e il crescente numero di transazioni schermate, è stato osservato che la Serie Sprout di Zcash diventava limitata e meno efficiente per quanto riguarda la privacy degli utenti, la scalabilità e l'elaborazione delle transazioni. Ciò ha portato alla modifica del network e all'aggiornamento Sapling.


### Zcash Sapling

![zcash-sapling-vertical-fullcolor-2x](https://user-images.githubusercontent.com/81990132/233535552-f04b727e-078f-483a-8fbc-1628486be0c8.png)

[Zcash Sapling](https://z.cash/upgrade/sapling) è un aggiornamento del protocollo della criptovaluta Zcash introdotto il 28 ottobre 2018. Si tratta di un importante miglioramento rispetto alla versione precedente del protocollo Zcash, nota come Sprout Series, che presentava alcune limitazioni in termini di privacy, efficienza e usabilità.

Alcuni degli aggiornamenti includono prestazioni migliorate per gli indirizzi schermati, chiavi di visualizzazione migliorate per consentire agli utenti di visualizzare le transazioni in entrata e in uscita senza esporre le chiavi private dell'utente e chiavi indipendenti a conoscenza zero per il portafoglio hardware durante la firma delle transazioni.

Zcash Sapling consente agli utenti di eseguire transazioni private in pochi secondi rispetto alla durata più lunga della serie Sprout.

La schermatura delle transazioni migliora la privacy, rendendo impossibile a terzi collegare le transazioni e determinare la quantità di ZEC trasferita. Sapling migliora anche l'usabilità, riducendo i requisiti computazionali per la generazione di transazioni private e rendendola più accessibile agli utenti.

Gli indirizzi Sapling iniziano con "zs" e questo può essere notato in tutti i portafogli Zcash Shielded supportati (YWallet, Zingo Wallet Nighthawk ecc.) che hanno indirizzi Sapling integrati. Zcash Sapling rappresenta un significativo sviluppo tecnologico per quanto riguarda la privacy e l'efficienza delle transazioni, che rende Zcash una criptovaluta pratica ed efficace per gli utenti che tengono alla privacy e alla sicurezza.

### Orchard Pool
Orchard è una nuova tecnologia ad alta protezione della privacy che viene sviluppata per la rete Zcash. L'Orchard Shielded Pool è stato lanciato il 31 maggio 2022. Gli indirizzi Orchard sono noti anche come indirizzi unificati (UA). 

Poiché gli indirizzi unificati combinano le pool Sapling e Transparent, si prevede che la quantità di fondi conservati all'interno del pool schermato aumenterà in modo significativo. Non c'è modo di distinguere tra i fondi inviati ai pool trasparenti e quelli schermati. 

Le transazioni all'interno di Orchard aumenteranno le dimensioni dell'insieme di anonimato più rapidamente rispetto alle transazioni effettuate con Sapling, a causa della natura di occultamento arity-hiding di Orchard rispetto agli input e agli output di UTXO. 

L'aggiornamento di Orchard contribuirà ad apportare ulteriori miglioramenti alla rete Zcash, tra cui transazioni più rapide ed efficienti, un maggiore anonimato, una maggiore sicurezza e una maggiore flessibilità per gli sviluppatori nel creare applicazioni decentralizzate sulla blockchain Zcash.

![IMG-20230419-221707](https://user-images.githubusercontent.com/81990132/233535609-6bf85926-567d-42ff-8b3f-9123afe98f65.jpg)

## Transparent Pool (Pool trasparente)

La pool trasparente non è schermata. Gli indirizzi dei portafogli trasparenti su Zcash iniziano con la lettera "T", e la privacy è considerata molto bassa in questo tipo di transazioni. 

Le transazioni trasparenti in Zcash sono simili a quelle di Bitcoin, che supporta le transazioni multi-firma e fa uso di indirizzi pubblici standard che possono essere inviati e ricevuti da chiunque sulla rete.


![IMG-20230420-100149](https://user-images.githubusercontent.com/81990132/233535663-bc536044-2537-41b2-9acb-69b3613e9ab6.jpg)

Gli indirizzi Transparent (o trasparenti) sono utilizzati soprattutto dagli exchange centralizzati per garantire un'elevata trasparenza e la conferma della rete durante l'invio e la ricezione di ZEC con i propri utenti. 

È importante notare che gli indirizzi Zcash Shielded, pur garantendo un'elevata privacy durante le transazioni, richiedono anche maggiori risorse computazionali per elaborare le transazioni. Pertanto, anche per questo motivo alcuni utenti potrebbero scegliere di utilizzare indirizzi trasparenti.

---
### 

# Pratiche consigliate per il trasferimento tra i pool
Quando si tratta di considerare un elevato livello di privacy durante le transazioni sulla rete Zcash, si raccomanda di seguire le seguenti pratiche;

![20230420_051415_0000.png](https://user-images.githubusercontent.com/38798812/233546739-e9076b2d-bcb5-40a1-96a8-25284dff0786.png)

Le transazioni che avvengono tra portafogli "Z-Z" sono schermate e vengono chiamate in tal modo a causa dell'elevato livello di privacy. Questo è solitamente il modo migliore e più consigliato per inviare e ricevere $ZEC quando è richiesta la privacy.

---
![20230421_070131_0000.png](https://user-images.githubusercontent.com/38798812/233552931-d69f4ef3-b065-4d61-8e6b-adbc2edc4d70.png)

L'invio di ZEC da un "indirizzo Z" a un "indirizzo T" indica una transazione di Deshielding. In questo tipo di transazione, il livello di privacy non è sempre elevato, poiché alcune informazioni saranno visibili sulla blockchain a causa dell'invio di ZEC su un indirizzo trasparente. La transazione Deshielding non è sempre raccomandata quando è richiesta un'elevata privacy.

---

![20230421_071247_0000.png](https://user-images.githubusercontent.com/38798812/233555082-455fbcbd-c685-4c1d-91f2-2d911e6a6273.png)
Il trasferimento di ZEC da un indirizzo trasparente (indirizzo T) a un indirizzo Z è noto come schermatura. In questo tipo di transazione il livello di privacy non è sempre molto elevato rispetto a quello di una transazione z-z, ma è ugualmente consigliato quando la privacy è necessaria.

---

![20230420-091346-0000](https://user-images.githubusercontent.com/81990132/233536122-6429d010-1ffa-424a-83d6-6e94eb8252e8.png)
L'invio di ZEC da un indirizzo trasparente (indirizzo T) ad un'altro indirizzo trasparente (transazione T-T) è molto simile a quello delle transazioni Bitcoin ed è per questo che le transazioni T-T su Zcash sono sempre chiamate transazioni pubbliche perché i dettagli della transazione sia del mittente che del destinatario diventano visibili al pubblico, il che rende il livello di privacy molto basso in queste transazioni. 

La maggior parte degli exchange centralizzati di criptovalute fa uso dei indirizzi trasparenti ("T-address") quando si tratta di transazioni sulla blockchain di Zcash, ma questo tipo di transazione (T-T) non avrà alcun anonimato.

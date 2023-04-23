# Zcash Pool di valori

Studieremo i quattro pool di valori in Zcash, che includono i pool di Sprout, Sapling, Orchard e Transparent. Questa pagina wiki coprirà anche le migliorie nella tecnologia e alcune pratiche migliori per il trasferimento dei pool.


## I Shielded Pools (Pool schermati)

### Sprout


![zcash-sprout-launch](https://user-images.githubusercontent.com/81990132/233535478-a84724d7-cb0e-4ad8-bfcc-499f665fba24.png)


Sprout è stato il primo protocollo di privacy Zero Knowledge su ZCash ed è talvolta chiamato ZCash 1.0 o "ZCash Ordinario". Il suo lancio è avvenuto il 28 ottobre 2016 ed è stata la prima versione di ZCash che utilizza la tecnologia a prova di conoscenza zero, importante caratteristica della crittografia di ZCash.


Gli indirizzi Sprout sono identificati dalle prime due lettere, sempre "zc", e sono stati chiamati "Sprout" con l'obiettivo di enfatizzare che il software era un giovane blockchain in crescita con un grande potenziale di sviluppo, aperto a nuove implementazioni. La serie Sprout è stata utilizzata come strumento iniziale per [Mining a lento avvio di ZCash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) which brought about the distribution of ZEC and Block rewards for Miners. 

Con l'espansione dell'ecosistema di ZCash e il crescente numero di transazioni schermate, è stato osservato che la Serie Sprout di ZCash diventava limitata e meno efficiente per quanto riguarda la privacy degli utenti, la scalabilità e l'elaborazione delle transazioni. Ciò ha portato alla modifica del network e all'aggiornamento Sapling.


### ZCash Sapling

![zcash-sapling-vertical-fullcolor-2x](https://user-images.githubusercontent.com/81990132/233535552-f04b727e-078f-483a-8fbc-1628486be0c8.png)

[ZCash Sapling](https://z.cash/upgrade/sapling) è un aggiornamento del protocollo della criptovaluta Zcash introdotto il 28 ottobre 2018. Si tratta di un importante miglioramento rispetto alla versione precedente del protocollo ZCash, nota come Sprout Series, che presentava alcune limitazioni in termini di privacy, efficienza e usabilità.

Alcuni degli aggiornamenti includono prestazioni migliorate per gli indirizzi schermati, chiavi di visualizzazione migliorate per consentire agli utenti di visualizzare le transazioni in entrata e in uscita senza esporre le chiavi private dell'utente e chiavi indipendenti a conoscenza zero per il portafoglio hardware durante la firma delle transazioni.

(zero-knowledge succinct non-interactive arguments of knowledge), che consente transazioni private molto più veloci ed efficienti sulla blockchain di ZCash. ZCash Sapling consente inoltre agli utenti di eseguire transazioni private in pochi secondi, rispetto al tempo più lungo richiesto da Sprout Series. 

ZCash Sapling si avvale anche di funzioni di schermatura delle transazioni per migliorare la privacy, rendendo difficile per terzi collegare le transazioni ZCash e determinare la quantità di ZEC trasferita dagli utenti. Inoltre, ZSapling migliora l'usabilità riducendo i requisiti computazionali per la generazione di transazioni private, rendendola più accessibile agli utenti.

L'indirizzo del portafoglio ZSapling inizia sempre con "zs" e questo può essere osservato in tutti i portafogli schermati ZCash supportati (Y-Wallet, Zingo Wallet, ecc.) che hanno indirizzi ZSapling integrati. Zcash Sapling rappresenta uno sviluppo significativo nella tecnologia ZCash per quanto riguarda la privacy e l'efficienza delle transazioni Zcash, che la rende una criptovaluta più pratica ed efficace per gli utenti che tengono alla privacy e alla sicurezza.

### Orchard Pool
Orchard è una nuova tecnologia ad alta protezione della privacy che viene sviluppata per la rete Zcash. L'Orchard Shielded Pool è stato lanciato il 31 maggio 2022. L'indirizzo Orchard è talvolta chiamato indirizzo unificato (UA) e il pool schermato Orchard rappresenta un miglioramento significativo dei pool schermati esistenti e costituisce un set di anonimato separato dai pool schermati Sprout e Sapling, che contribuisce ad aumentare la privacy e l'anonimato degli utenti consentendo loro di inviare e ricevere ZEC in modo anonimo sulla rete ZCash. 

Le transazioni effettuate all'interno di Orchard aumenteranno più rapidamente le dimensioni dell'insieme di anonimato rispetto alle transazioni effettuate con Sapling, grazie alla natura di arity-hiding. L'aggiornamento di Orchard aiuterà a portare ulteriori miglioramenti alla rete Zcash, incluso transazioni più veloci ed efficienti, maggiore privacy e anonimato, maggiore sicurezza e maggiore flessibilità per gli sviluppatori che vogliono creare applicazioni decentralizzate sulla Blockchain di ZCash.

![IMG-20230419-221707](https://user-images.githubusercontent.com/81990132/233535609-6bf85926-567d-42ff-8b3f-9123afe98f65.jpg)

I portafogli schermati di Zcash in questo momento stanno integrando gli i Pool Orchard nella loro opzione di Pool di Fondi. Un buon esempio si trova nell'app Zingo Wallet.

## Transparent Pool

Gli "ZCash Transparent" sono transazioni non schermate e non private sulla Blockchain di ZCash. Gli indirizzi del portafoglio trasparente su ZCash iniziano con la lettera "t" e la privacy in questo tipo di transazione è molto bassa. Le transazioni trasparenti in Zcash sono simili alle transazioni di Bitcoin che supportano transazioni multi-firma e utilizzano indirizzi pubblici standard che possono essere tracciati da chiunque nella rete.


![IMG-20230420-100149](https://user-images.githubusercontent.com/81990132/233535663-bc536044-2537-41b2-9acb-69b3613e9ab6.jpg)

Gli indirizzi Transparent (o trasparenti) sono utilizzati soprattutto dagli exchange centralizzati per garantire un'elevata trasparenza e la conferma della rete durante l'invio e la ricezione di ZEC tra gli utenti. È importante notare che gli indirizzi ZCash Shielded, pur garantendo un'elevata privacy durante le transazioni, richiedono anche maggiori risorse computazionali per elaborare le transazioni. Pertanto, alcuni utenti possono utilizzare indirizzi trasparenti per transazioni che non richiedono lo stesso livello di privacy.

---
### 

# Si consiglia il trasferimento del pool
Quando si tratta di considerare un alto livello di privacy durante le transazioni sulla rete ZCash, si raccomanda di seguire le seguenti pratiche;


![20230420-051415-0000](https://user-images.githubusercontent.com/81990132/233535812-ccb41fdd-a552-4930-b136-b65dc12e0d0d.png)

![20230420-091225-0000](https://user-images.githubusercontent.com/81990132/233535882-1b3aa4e5-5022-48cf-b311-96aa8b8328ce.png)


![20230420-091701-0000](https://user-images.githubusercontent.com/81990132/233535945-09a8ce02-d4d4-4c73-99fa-14b438963a45.png)


![20230420-091346-0000](https://user-images.githubusercontent.com/81990132/233536122-6429d010-1ffa-424a-83d6-6e94eb8252e8.png)
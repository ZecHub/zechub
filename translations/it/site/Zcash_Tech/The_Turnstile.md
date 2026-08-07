---
# Il tornello

## TL;DR

- Il tornello è una regola di contabilità pubblica che tiene traccia di quanto valore entra ed esce da ogni pool shielded
- Permette a chiunque di verificare che un pool non paghi mai più di quanto vi sia stato immesso, anche se le transazioni al suo interno sono private
- Questo protegge l’offerta di ZEC da un bug nascosto, perché monete contraffatte non possono uscire da un pool senza alterare il conteggio
- Funziona senza indebolire la privacy, perché sono pubblici solo i totali del pool, mai le singole transazioni
- Il tornello è il motivo per cui la migrazione da Orchard a Ironwood può dimostrare che l’offerta shielded è solida

<br/>

## Per chi è

- Chiunque voglia capire come Zcash mantenga affidabile la propria offerta privata
- Gli utenti che seguono la migrazione da Orchard a Ironwood e si chiedono come faccia a dimostrare che l’offerta è reale
- I nuovi arrivati curiosi di capire come un sistema di moneta privata possa comunque essere verificabile

<br/>

## La sfida

Zcash shielded nasconde importi, mittenti e destinatari. È proprio questo il punto della privacy. Ma solleva una domanda difficile: se nessuno può vedere dentro il pool shielded, come fa qualcuno a sapere che la quantità totale di ZEC è corretta? Come si verifica del denaro che non si può vedere?

Se un bug permettesse mai a qualcuno di creare monete false all’interno di un pool shielded, la contraffazione sarebbe nascosta dalla stessa privacy che protegge gli utenti onesti. Senza una salvaguardia, questa incertezza minerebbe la fiducia nell’intera offerta. Il tornello è la salvaguardia che risolve questo problema.

<br/>

## Cos’è il tornello

Immagina ogni pool shielded come una stanza con un’unica porta d’accesso conteggiata. Ogni volta che il valore entra nel pool dall’esterno, o ne esce per andare altrove, passa attraverso quella porta e viene registrato pubblicamente. Le transazioni all’interno della stanza restano private, ma il totale progressivo alla porta è visibile a tutti.

La regola è semplice: un pool non può mai far uscire più valore di quanto ne sia entrato. I node rifiutano qualsiasi blocco che porterebbe il saldo di un pool sotto zero. L’importo che si ritiene sia all’interno di un pool è noto in ogni momento, perché è semplicemente il totale entrato meno il totale uscito. Questo conteggio pubblico è il tornello.

<br/>

## Come funziona

Nel corso della sua storia, Zcash ha avuto diversi pool shielded, come Sprout, Sapling e Orchard. Il valore si sposta tra la chain trasparente e questi pool, e talvolta anche tra i pool stessi. Il tornello osserva questi movimenti:

1. Quando ZEC entra in un pool shielded, l’importo viene aggiunto al saldo pubblico di quel pool
2. Quando ZEC esce da un pool, l’importo viene sottratto
3. La rete rifiuta qualsiasi blocco che renderebbe negativo il saldo di un pool, cioè quando è uscito più di quanto sia mai entrato
4. Le singole transazioni shielded restano completamente private, solo i totali del pool sono pubblici

La rete tiene traccia in questo modo di un saldo per ogni value pool, inclusi Sprout, Sapling, Orchard, il nuovo pool Ironwood, e i saldi transparent e lockbox. Per questo motivo, anche se il contenuto esatto di un pool è nascosto, il massimo che potrà mai uscirne è limitato da ciò che vi è entrato. Nessuna inflazione nascosta può riversarsi nella circolazione.

<br/>

## Come viene verificato il value balance

Il conteggio alla porta è affidabile solo perché ogni transazione è obbligata a dimostrare di aver spostato un importo veritiero, anche se l’importo stesso resta nascosto. Ogni transazione shielded pubblica un unico numero onesto: il valore netto che sposta dentro o fuori dal pool, chiamato value balance. Un value balance positivo significa che i fondi sono usciti dal pool verso il lato transparent, uno negativo significa che i fondi sono entrati. I dettagli privati restano sigillati, ma questa singola cifra netta è pubblica, ed è ciò che il tornello somma.

La parte ingegnosa è il modo in cui una transazione dimostra che quel numero pubblico è onesto senza rivelare gli importi privati che ci stanno dietro. Il meccanismo cambia a seconda del pool, ed è questa la vera meccanica del tornello.

Nel pool Sprout originale, ogni transazione usa un JoinSplit. Un JoinSplit spende due note nascoste e ne crea due nuove, e contiene due campi pubblici: vpub_old, il valore che entra nel pool shielded dal lato transparent, e vpub_new, il valore che esce dal pool tornando al lato transparent. Ogni JoinSplit deve essere bilanciato di per sé, e la sua zero knowledge proof garantisce che input nascosti e output nascosti si sommino correttamente. Il saldo del pool Sprout è semplicemente il totale progressivo di tutti i vpub_old meno tutti i vpub_new lungo la chain. Ecco perché Sprout è un esempio utile più avanti: poiché vpub_old è l’unico modo in cui il valore può entrare nel pool, una singola regola che lo disattiva può sigillare il pool per sempre.

In Sapling, Orchard e Ironwood, il bilanciamento viene dimostrato in modo più intelligente, usando una binding signature. Invece di far bilanciare ogni trasferimento da solo, l’intera transazione impegna ogni importo nascosto usando un value commitment. Un value commitment è una busta sigillata per un numero, costruita con un Pedersen commitment omomorfico, che ha una proprietà speciale: le buste possono essere sommate e sottratte senza essere aperte. La rete somma tutti i commitment di input, sottrae tutti i commitment di output e confronta il risultato con l’unica cifra netta dichiarata dalla transazione, il suo campo valueBalance. Solo una transazione i cui importi nascosti corrispondano davvero a quel valueBalance pubblico può produrre una binding signature valida sui commitment combinati. Se qualcuno provasse a spostare più valore di quanto dichiarato, i commitment non tornerebbero, la binding signature non verrebbe verificata e la transazione sarebbe rifiutata. Ironwood usa lo stesso protocollo di Orchard, quindi funziona allo stesso modo.

Questo è anche ciò che rende sicuro verificare un trasferimento tra pool. Quando i fondi si spostano da un pool shielded a un altro, per esempio da Orchard a Ironwood, la transazione non può nascondere gli importi alla contabilità. Ogni pool ha il proprio value balance che deve essere soddisfatto dalle proprie proof: il lato Orchard deve mostrare un deflusso corrispondente tramite la sua binding signature, e il lato Ironwood deve mostrare il corrispondente afflusso tramite la propria. Il valore che esce da un pool e quello che entra nell’altro vengono entrambi dimostrati in modo indipendente, quindi uno spostamento tra pool è in realtà costituito da due attraversamenti del tornello che avvengono in un’unica transazione, uno in uscita e uno in entrata, ed entrambi vengono conteggiati pubblicamente anche se gli importi sottostanti restano privati.

Quindi il tornello non è fiducia. Ogni transazione dimostra matematicamente il proprio effetto netto, la rete somma questi effetti netti dimostrati per ciascun pool, e una regola di consenso (ZIP 209) rifiuta qualsiasi blocco che porterebbe il saldo di un pool in negativo. Proof a livello di transazione, applicazione a livello di chain.

<br/>

## Perché è importante

Il tornello dà a Zcash tre cose contemporaneamente.

Primo, compartimentalizza il rischio. Un bug crittografico in un pool resta confinato a quel pool, perché il tornello impedisce al valore contraffatto di attraversare il confine verso l’offerta più ampia.

Secondo, permette alla comunità di verificare l’offerta retrospettivamente. Se un bug viene scoperto in seguito, il registro del tornello mostra se da un pool sia mai uscito più valore di quanto vi sia entrato. Un registro pulito è una forte prova del fatto che non sia stata sfruttata alcuna contraffazione.

Terzo, preserva la privacy mentre fa tutto questo. Solo i totali a livello di pool sono pubblici. Le tue singole transazioni restano shielded. Verificabilità e privacy coesistono, il che è insolito ed è uno dei punti di forza silenziosi di Zcash.

<br/>

## Il tornello in azione

Il tornello non è nuovo ed è stato usato in momenti chiave della storia di Zcash.

Quando Zcash è passata dal pool Sprout originale verso il più nuovo pool Sapling, il tornello ha protetto la transizione. Il pool Sprout è stato poi limitato in modo da non poter ricevere nuovi afflussi, incoraggiando così gli utenti a migrare mentre il tornello manteneva onesta la contabilità. Anni dopo, il fatto che nessun valore sia mai uscito impropriamente da Sprout rappresenta una prova che la sua crittografia iniziale non è mai stata sfruttata con successo.

Lo stesso design ora protegge il passaggio da Orchard a Ironwood. Nel 2026 è stato trovato e corretto un bug di solidità nel sistema di proving di Orchard. Non ci sono prove che sia mai stato sfruttato, ma poiché l’attività shielded è privata, la certezza era impossibile. La risposta è sigillare il vecchio pool Orchard e far migrare a tutti i propri fondi attraverso il tornello verso Ironwood, un nuovo pool che usa il protocollo corretto. Forzare i fondi attraverso il tornello significa che eventuali monete contraffatte ipotetiche lasciate indietro non possono seguirli, e una volta completata la migrazione chiunque può confermare che l’offerta shielded è solida.

<br/>

## Deprecazione unidirezionale del pool

Il tornello rende possibile ritirare in sicurezza un vecchio pool, in una sola direzione, senza mai compromettere la garanzia sull’offerta. Il trucco consiste nel chiudere l’ingresso lasciando aperta l’uscita.

Sprout è l’esempio più chiaro. Per deprecarlo, ZIP 211 ha aggiunto una singola regola di consenso: dalla sua altezza di attivazione, il campo vpub_old di ogni JoinSplit deve essere zero. Poiché vpub_old è l’unico modo in cui il valore può entrare in Sprout, forzarlo a zero significa che nessun nuovo valore potrà mai più entrare, mentre il valore potrà ancora uscire verso il lato transparent o proseguire verso Sapling. Il pool è diventato unidirezionale. Può solo svuotarsi, mai riempirsi. Il tornello continua a contare per tutto il tempo, quindi il saldo può diminuire mentre i fondi escono ma non può mai aumentare, e non può mai andare sotto zero.

La migrazione da Orchard a Ironwood usa la stessa idea. Con l’upgrade NU6.3, il pool Orchard viene chiuso a nuovi afflussi, e i wallet vengono indirizzati a inviare i fondi Orchard attraverso il tornello verso il nuovo pool Ironwood. Orchard diventa un pool unidirezionale che può solo svuotarsi. Poiché ogni uscita è un attraversamento del tornello che deve essere dimostrato, qualsiasi valore contraffatto ipotetico rimasto indietro in Orchard non può seguire silenziosamente i fondi onesti all’esterno. Resta bloccato in un pool che può solo svuotarsi ed è sorvegliato alla porta. Con il tempo questo spinge il vecchio pool verso lo zero e permette a chiunque di confermare che il valore che ne è uscito non è mai stato superiore al valore che vi era entrato onestamente.

Questo è il motivo più profondo per cui il tornello è importante, oltre alla semplice contabilità. È il meccanismo che permette a Zcash di deprecare un pool shielded, sia per ridurre la complessità come nel caso di Sprout, sia per recuperare da un bug scoperto come nel caso di Orchard, mantenendo al tempo stesso una garanzia continua, pubblica e dimostrabile sull’offerta.

<br/>

## Equivoci comuni

- Il tornello non rivela le tue transazioni. Conta solo i totali del pool, non chi ha inviato cosa a chi
- Non identifica un falsario per nome. Limita quanto può uscire da un pool, ed è questo che protegge l’offerta
- Non è una nuova invenzione per Ironwood. Ha protetto ogni grande transizione tra pool shielded nella storia di Zcash
- Un totale pubblico del pool non indebolisce la privacy. La privacy risiede nelle transazioni all’interno del pool, che restano nascoste

<br/>

## Risorse

1. [ZIP 209: Vietare i saldi dei value pool della chain fuori intervallo](https://zips.z.cash/zip-0209) - la regola di consenso alla base del tornello
2. [ZIP 211: Disattivare l’aggiunta di nuovo valore al value pool della chain Sprout](https://zips.z.cash/zip-0211) - come il pool Sprout è stato chiuso ai nuovi depositi
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - l’upgrade che introduce il pool Ironwood e indirizza il valore attraverso il tornello
4. [Applicazione del tornello contro la contraffazione](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - la spiegazione originale di Electric Coin Company
5. [Specifica del protocollo Zcash](https://zips.z.cash/protocol/protocol.pdf) - vedi le sezioni su balance e binding signature per tutti i dettagli
6. [Value Pools, il libro di Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - come un node tiene traccia del value balance di ogni pool

<br/>

## Pagine correlate

- [Pool shielded](https://zechub.wiki/using-zcash/shielded-pools) - come le transazioni shielded di Zcash mantengono privati i dettagli
- [Halo](https://zechub.wiki/zcash-tech/halo) - il sistema di proof alla base del pool Orchard
- [Network Upgrades](https://zechub.wiki/start-here/network-upgrades) - come Zcash attiva cambiamenti come i nuovi pool shielded

# Il tornello

## TL;DR

- Il turnstile è una regola di contabilità pubblica che tiene traccia di quanto valore entra ed esce da ogni pool schermata
- Permette a chiunque di verificare che una pool non paghi mai più di quanto vi è stato immesso, anche se le transazioni al suo interno sono private
- Questo protegge l'offerta di ZEC da un bug nascosto, perché monete contraffatte non possono uscire da una pool senza alterare il conteggio
- Funziona senza indebolire la privacy, poiché solo i totali dei pool sono pubblici, mai le singole transazioni
- Il tornello è il motivo per cui la migrazione da Orchard a Ironwood può dimostrare che l'offerta schermata è solida

<br/>

## Per chi è questo contenuto

- Chiunque voglia capire come Zcash mantiene affidabile la propria offerta privata
- Gli utenti che seguono la migrazione da Orchard a Ironwood e si chiedono come faccia a dimostrare che l'offerta è reale
- I nuovi arrivati curiosi di sapere come un sistema monetario privato possa comunque essere verificato

<br/>

## La sfida

Lo Zcash schermato nasconde importi, mittenti e destinatari. Questa privacy è il punto fondamentale. Ma solleva una domanda difficile: se nessuno può vedere dentro la pool schermata, come fa qualcuno a sapere che la quantità totale di ZEC è corretta? Come si controlla denaro che non si può vedere?

Se un bug permettesse mai a qualcuno di forgiare monete all'interno di una pool schermata, la falsificazione sarebbe nascosta dalla stessa privacy che protegge gli utenti onesti. Senza una salvaguardia, questa incertezza minerebbe la fiducia nell'intera offerta. Il turnstile è la salvaguardia che risolve questo problema.

<br/>

## Che cos'è il tornello

Immagina ogni pool schermata come una stanza con un'unica porta conteggiata. Ogni volta che il valore entra nella pool dall'esterno, o ne esce per andare altrove, passa attraverso la porta e viene contabilizzato pubblicamente. Le transazioni all'interno della stanza restano private, ma il totale progressivo alla porta è visibile a tutti.

La regola è semplice: una pool non può mai far uscire più valore di quanto ne sia entrato. I nodi rifiutano qualsiasi blocco che porterebbe il saldo di una pool sotto zero. La quantità che si ritiene presente in una pool è nota in ogni momento, perché è semplicemente il totale entrato meno il totale uscito. Questo conteggio pubblico è il turnstile.

<br/>

## Come funziona

Zcash ha avuto diverse pool schermate nel corso della sua storia, come Sprout, Sapling e Orchard. Il valore si sposta tra la chain trasparente e queste pool, e talvolta anche tra le pool stesse. Il turnstile osserva questi movimenti:

1. Quando ZEC entra in una pool schermata, l'importo viene aggiunto al saldo pubblico di quella pool
2. Quando ZEC esce da una pool, l'importo viene sottratto
3. La rete rifiuta qualsiasi blocco che renderebbe negativo il saldo di una pool, cioè quando è uscito più valore di quanto ne sia mai entrato
4. Le singole transazioni schermate restano completamente private, solo i totali dei pool sono pubblici

La rete tiene traccia in questo modo di un saldo per ogni pool di valore, inclusi Sprout, Sapling, Orchard, la nuova pool Ironwood, e i saldi trasparenti e lockbox. Grazie a questo, anche se il contenuto esatto di una pool è nascosto, il massimo che potrà mai uscirne è limitato da ciò che vi è entrato. Nessuna inflazione nascosta può sfuggire ed entrare in circolazione.

<br/>

## Come viene controllato il saldo di valore

Il conteggio alla porta è affidabile solo perché ogni transazione è costretta a dimostrare di aver spostato un importo veritiero, anche se l'importo stesso resta nascosto. Ogni transazione schermata pubblica un unico numero onesto: il valore netto che sposta dentro o fuori dal pool, chiamato value balance. Un value balance positivo significa che i fondi sono usciti dal pool verso il lato trasparente, uno negativo significa che i fondi sono entrati. I dettagli privati restano sigillati, ma questa singola cifra netta è pubblica, ed è ciò che il tornello somma.

La parte ingegnosa è il modo in cui una transazione dimostra che quel numero pubblico è onesto senza rivelare gli importi privati che ci stanno dietro. Il meccanismo differisce a seconda del pool, ed è questa la vera meccanica del tornello.

Nella pool Sprout originale, ogni transazione usa un JoinSplit. Un JoinSplit spende due note nascoste e ne crea due nuove, e contiene due campi pubblici: vpub_old, il valore che entra nella pool schermata dal lato trasparente, e vpub_new, il valore che lascia la pool tornando al lato trasparente. Ogni JoinSplit deve essere bilanciato di per sé, e la sua prova a conoscenza zero garantisce che gli input nascosti e gli output nascosti si sommino correttamente. Il saldo della pool Sprout è semplicemente il totale progressivo di tutti i vpub_old meno tutti i vpub_new lungo la chain. Ecco perché Sprout è un esempio utile più avanti: poiché vpub_old è l'unico modo in cui il valore può entrare nella pool, una sola regola che lo disattivi può sigillare la pool per sempre.

In Sapling, Orchard e Ironwood, il bilancio viene dimostrato in modo più intelligente, usando una binding signature. Invece di bilanciare ogni trasferimento da solo, l'intera transazione si impegna rispetto a ogni importo nascosto usando un value commitment. Un value commitment è una busta sigillata per un numero, costruita con un impegno di Pedersen omomorfico, che ha una proprietà speciale: le buste possono essere sommate e sottratte senza essere aperte. La rete somma tutti i commitment di input, sottrae tutti i commitment di output e confronta il risultato con l'unica cifra netta dichiarata dalla transazione, il suo campo valueBalance. Solo una transazione i cui importi nascosti corrispondono davvero a quel valueBalance pubblico può produrre una binding signature valida sui commitment combinati. Se qualcuno cercasse di spostare più valore di quanto dichiarato, i commitment non tornerebbero, la binding signature non verrebbe verificata e la transazione verrebbe rifiutata. Ironwood usa lo stesso protocollo di Orchard, quindi funziona allo stesso modo.

Questo è anche ciò che rende sicuro il controllo di un trasferimento tra pool. Quando i fondi si spostano da una pool schermata a un'altra, per esempio da Orchard a Ironwood, la transazione non può nascondere gli importi alla contabilità. Ogni pool ha il proprio saldo di valore che deve essere soddisfatto dalle proprie prove: il lato Orchard deve mostrare un deflusso corrispondente tramite la sua firma vincolante, e il lato Ironwood deve mostrare l'afflusso corrispondente tramite la propria. Il valore che esce da una pool e quello che entra nell'altra vengono entrambi dimostrati in modo indipendente, quindi uno spostamento tra pool è in realtà costituito da due attraversamenti del turnstile che avvengono in un'unica transazione, uno in uscita e uno in entrata, ed entrambi vengono contabilizzati pubblicamente anche se gli importi sottostanti restano privati.

Quindi il turnstile non è fiducia. Ogni transazione dimostra matematicamente il proprio effetto netto, la rete somma questi effetti netti dimostrati per pool, e una regola di consenso (ZIP 209) rifiuta qualsiasi blocco che porterebbe negativo il saldo di una pool. Prova a livello di transazione, applicazione a livello di chain.

<br/>

## Perché è importante

Il tornello offre a Zcash tre cose contemporaneamente.

Primo, compartimentalizza il rischio. Un bug crittografico in una pool resta confinato a quella pool, perché il turnstile impedisce al valore falsificato di attraversare il confine ed entrare nell'offerta più ampia.

Secondo, permette alla comunità di verificare l'offerta retrospettivamente. Se in seguito viene scoperto un bug, il registro del turnstile mostra se da una pool sia mai uscito più valore di quanto vi sia entrato. Un registro pulito è una forte prova del fatto che nessuna contraffazione sia stata sfruttata.

Terzo, preserva la privacy mentre fa tutto questo. Solo i totali a livello di pool sono pubblici. Le tue singole transazioni restano schermate. Verificabilità e privacy coesistono, cosa insolita ed è uno dei punti di forza silenziosi di Zcash.

<br/>

## Il tornello in azione

Il tornello non è una novità, ed è stato usato in momenti chiave della storia di Zcash.

Quando Zcash è passato dalla pool Sprout originale alla più recente pool Sapling, il turnstile ha protetto la transizione. In seguito la pool Sprout è stata limitata in modo da non poter ricevere nuovi afflussi, incoraggiando così gli utenti a migrare mentre il turnstile manteneva onesta la contabilità. Anni dopo, il fatto che nessun valore sia mai uscito impropriamente da Sprout costituisce una prova del fatto che la sua crittografia iniziale non sia mai stata sfruttata con successo.

Lo stesso schema ora protegge il passaggio da Orchard a Ironwood. Nel 2026 è stato trovato e corretto un bug di solidità nel sistema di proving di Orchard. Non ci sono prove che sia mai stato sfruttato, ma poiché l'attività schermata è privata, la certezza era impossibile. La risposta consiste nel sigillare il vecchio pool Orchard e far migrare a tutti i propri fondi attraverso il tornello verso Ironwood, un nuovo pool che usa il protocollo corretto. Forzare i fondi a passare attraverso il tornello significa che eventuali monete contraffatte ipotetiche rimaste indietro non possono seguirli, e una volta completata la migrazione chiunque può confermare che l'offerta schermata è solida.

<br/>

## Deprecazione unidirezionale del pool

Il tornello rende possibile ritirare in sicurezza un vecchio pool, in una sola direzione, senza mai compromettere la garanzia sull'offerta. Il trucco è chiudere l'entrata lasciando aperta l'uscita.

Sprout è l'esempio più chiaro. Per deprecarla, ZIP 211 ha aggiunto una singola regola di consenso: dalla sua altezza di attivazione, il campo vpub_old di ogni JoinSplit deve essere zero. Poiché vpub_old è l'unico modo in cui il valore può entrare in Sprout, imporre che sia zero significa che nessun nuovo valore potrà più entrarvi, mentre il valore potrà ancora uscire verso il lato trasparente o proseguire verso Sapling. La pool è diventata unidirezionale. Può solo svuotarsi, mai riempirsi. Il turnstile continua a contare per tutto il tempo, quindi il saldo può diminuire mentre i fondi escono ma non può mai aumentare, e non può mai andare in negativo.

La migrazione da Orchard a Ironwood usa la stessa idea. Con l'aggiornamento NU6.3, la pool Orchard viene chiusa a nuovi afflussi, e i portafogli sono indirizzati a inviare i fondi Orchard attraverso il turnstile nella nuova pool Ironwood. Orchard diventa una pool unidirezionale che può solo svuotarsi. Poiché ogni uscita è un attraversamento del turnstile che deve essere dimostrato, qualsiasi ipotetico valore contraffatto rimasto in Orchard non può seguire silenziosamente i fondi onesti in uscita. Resta bloccato in una pool che può solo svuotarsi ed è sorvegliata alla porta. Col tempo questo porta la vecchia pool verso lo svuotamento e permette a chiunque di confermare che il valore uscito non è mai stato superiore al valore che vi era entrato onestamente.

Questa è la ragione più profonda per cui il turnstile conta, oltre alla semplice contabilità. È il meccanismo che permette a Zcash di deprecare una pool schermata, sia per ridurre la complessità come nel caso di Sprout, sia per recuperare da un bug scoperto come nel caso di Orchard, mantenendo al tempo stesso una garanzia continua, pubblica e dimostrabile sull'offerta.

<br/>

## Idee sbagliate comuni

- Il tornello non rivela le tue transazioni. Si limita a contabilizzare i totali dei pool, non chi ha inviato cosa a chi
- Non identifica nominalmente un falsario. Limita quanto può uscire da una pool, ed è questo che protegge l'offerta
- Non è una nuova invenzione per Ironwood. Ha protetto ogni grande transizione tra pool schermate nella storia di Zcash
- Un totale pubblico del pool non indebolisce la privacy. La privacy è nelle transazioni all'interno del pool, che restano nascoste

<br/>

## Risorse

1. [ZIP 209: Impedire saldi fuori intervallo nei Chain Value Pool](https://zips.z.cash/zip-0209) - la regola di consenso alla base del tornello
2. [ZIP 211: Disattivazione dell'aggiunta di nuovo valore alla pool di valore della chain Sprout](https://zips.z.cash/zip-0211) - come la pool Sprout è stata chiusa a nuovi depositi
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - l'aggiornamento che introduce la pool Ironwood e indirizza il valore attraverso il turnstile
4. [Applicazione del tornello contro la contraffazione](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - la spiegazione originale di Electric Coin Company
5. [Specifica del protocollo Zcash](https://zips.z.cash/protocol/protocol.pdf) - vedi le sezioni su bilancio e binding signature per tutti i dettagli
6. [Value Pools, il libro di Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - come un nodo tiene traccia del value balance di ciascun pool

<br/>

## Pagine correlate

- [Pool schermate](https://zechub.wiki/using-zcash/shielded-pools) - come le transazioni schermate di Zcash mantengono privati i dettagli
- [Halo](https://zechub.wiki/zcash-tech/halo) - il sistema di proof alla base del pool Orchard
- [Aggiornamenti di rete](https://zechub.wiki/start-here/network-upgrades) - come Zcash attiva cambiamenti come le nuove pool schermate

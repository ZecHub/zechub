# Il turnstile (tornello)

## TL;DR

- Il turnstile è una regola di contabilità pubblica che tiene traccia di quanto valore entra ed esce da ogni pool schermata
- Permette a chiunque di verificare che una pool non eroghi mai più di quanto vi sia stato versato, anche se le transazioni al suo interno sono private
- Questo protegge l'offerta di ZEC da un bug nascosto, perché le monete contraffatte non possono lasciare una pool senza alterare il conteggio
- I pagamenti all'interno di una pool restano privati. Una transazione che sposta ZEC tra le pool mostra l'importo che sposta
- Il turnstile è la ragione per cui la migrazione da Orchard a Ironwood può dimostrare che la quantità di ZEC nelle pool schermate è solida

<br/>

## A chi si rivolge

- Chiunque voglia capire come Zcash mantiene affidabile la propria offerta privata
- Gli utenti che seguono la migrazione da Orchard a Ironwood e si chiedono come questa dimostri che l'offerta è reale
- I nuovi arrivati curiosi di scoprire come un sistema monetario privato possa comunque essere sottoposto a audit

<br/>

## La sfida

Lo Zcash schermato nasconde importi, mittenti e destinatari. Questa privacy è il punto. Ma solleva una domanda difficile: se nessuno può vedere dentro la pool schermata, come fa qualcuno a sapere che l'importo totale di ZEC è corretto? Come fai a verificare del denaro che non puoi vedere?

Se un bug permettesse un giorno a qualcuno di falsificare monete all'interno di una pool schermata, la falsificazione resterebbe nascosta dalla stessa privacy che protegge gli utenti onesti. Senza una salvaguardia, quell'incertezza minerebbe la fiducia nell'intera offerta. Il turnstile è la salvaguardia che risolve il problema.

<br/>

## Che cos'è il turnstile

Pensa a ogni pool schermata come a una stanza con un unico varco conteggiato. Ogni volta che valore entra nella pool dall'esterno, o la lascia per andare altrove, passa per il varco e viene conteggiato in pubblico. Le transazioni all'interno della stanza restano private, ma il totale progressivo alla porta è visibile a tutti.

La regola è semplice: una pool non può mai lasciar uscire più valore di quanta ne sia entrato. I nodi rifiutano qualsiasi blocco che porterebbe il saldo di una pool sotto zero. L'importo che si ritiene trovarsi all'interno di una pool è noto in ogni momento, perché è semplicemente il totale entrato meno il totale uscito. Questo conteggio pubblico è il turnstile.

<br/>

## Come funziona

Nel corso della sua storia Zcash ha avuto diverse pool schermate, come Sprout, Sapling e Orchard. Il valore si sposta tra la chain trasparente e queste pool, e a volte tra le pool stesse. Il turnstile osserva questi movimenti:

1. Quando ZEC si sposta in una pool schermata, l'importo viene aggiunto al saldo pubblico di quella pool
2. Quando ZEC esce da una pool, l'importo viene sottratto
3. La rete rifiuta qualsiasi blocco che renderebbe negativo il saldo di una pool, il che significherebbe che è uscito più valore di quanta ne sia mai entrato
4. Ogni transazione mostra solo il proprio flusso netto in entrata o in uscita da una pool, il proprio saldo di valore. Per un pagamento all'interno di una sola pool, è semplicemente la commissione

La rete tiene traccia in questo modo di un saldo per ogni pool di valore, tra cui Sprout, Sapling, Orchard, la nuova pool Ironwood e i saldi trasparente e lockbox. Per questo motivo, anche se il contenuto esatto di una pool è nascosto, il massimo che può mai uscirne è limitato a quanto vi è entrato. Nessuna inflazione nascosta può sfuggire in circolazione.

<br/>

## Come viene verificato il saldo di valore

Il conteggio alla porta è affidabile solo perché ogni transazione è costretta a dimostrare di aver spostato un importo veritiero, anche se l'importo stesso resta nascosto. Ogni transazione schermata pubblica un unico numero onesto: il valore netto che sposta in entrata o in uscita dalla pool, chiamato suo saldo di valore. Un saldo di valore positivo significa che i fondi hanno lasciato la pool verso il lato trasparente, uno negativo che i fondi sono entrati. I dettagli privati restano sigillati, ma questa singola cifra netta è pubblica, ed è ciò che il turnstile somma.

La parte intelligente è il modo in cui una transazione dimostra che quel numero pubblico è onesto senza rivelare gli importi privati che vi stanno dietro. Il meccanismo varia da pool a pool, e questo è il vero ingranaggio del turnstile.

Nella pool Sprout originale, ogni transazione utilizza un JoinSplit. Un JoinSplit spende due note nascoste e ne crea due nuove, e riporta due campi pubblici: vpub_old, il valore che entra nella pool schermata dal lato trasparente, e vpub_new, il valore che esce dalla pool tornando al lato trasparente. Ogni JoinSplit deve quadrare da sé, e la sua prova a conoscenza zero garantisce che gli input nascosti e gli output nascosti si sommino correttamente. Il saldo della pool di Sprout è semplicemente il totale progressivo di tutti i vpub_old meno tutti i vpub_new lungo la chain. Ecco perché Sprout è un esempio utile più avanti: poiché vpub_old è l'unico modo in cui il valore può entrare nella pool, un'unica regola che lo disattiva può sigillare la pool per sempre.

In Sapling, Orchard e Ironwood il saldo viene dimostrato in modo più intelligente, mediante una firma vincolante. Invece di far quadrare ogni trasferimento da sé, l'intera transazione si vincola a ciascun importo nascosto tramite un commitment di valore. Un commitment di valore è una busta sigillata per un numero, costruita con un commitment di Pedersen omomorfico, il quale ha una proprietà speciale: le buste possono essere sommate e sottratte senza aprirle. La rete somma tutti i commitment degli input, sottrae tutti i commitment degli output e confronta il risultato con l'unico valore netto dichiarato dalla transazione, il suo campo valueBalance. Solo una transazione i cui importi nascosti corrispondono realmente a quel valueBalance pubblico può produrre una firma vincolante valida sui commitment combinati. Se qualcuno tentasse di spostare più valore di quanto dichiarato, i commitment non tornerebbero, la firma vincolante non supererebbe la verifica e la transazione verrebbe rifiutata. Ironwood utilizza lo stesso protocollo di Orchard, quindi funziona allo stesso modo.

Questo è anche ciò che rende verificabile in sicurezza un trasferimento tra pool. Quando i fondi si spostano da una pool schermata a un'altra, ad esempio da Orchard a Ironwood, la transazione non può nascondere gli importi alla contabilità. Ogni pool ha il proprio saldo di valore, che deve essere soddisfatto dalle proprie prove: il lato Orchard deve mostrare tramite la sua firma vincolante un deflusso corrispondente, e il lato Ironwood deve mostrare tramite la propria il corrispondente afflusso. Il valore che esce da una pool e il valore che entra nell'altra vengono dimostrati ciascuno in modo indipendente, quindi uno spostamento tra pool è in realtà due attraversamenti del turnstile che avvengono in una sola transazione, uno in uscita e uno in ingresso, ed entrambi vengono conteggiati in pubblico anche se gli importi sottostanti restano privati.

Quindi il turnstile non è fiducia. Ogni transazione dimostra matematicamente il proprio effetto netto, la rete somma questi effetti netti dimostrati per ciascuna pool, e una regola di consenso (ZIP 209) rifiuta qualsiasi blocco che porterebbe il saldo di una pool in negativo. La prova a livello di transazione, l'applicazione a livello di chain.

<br/>

## Perché è importante

Il turnstile dà a Zcash tre cose contemporaneamente.

Primo, compartimenta il rischio. Un bug crittografico in una pool resta contenuto in quella pool, perché il turnstile impedisce al valore contraffatto di valicare verso l'offerta più ampia.

Secondo, permette alla comunità di verificare l'offerta a posteriori. Se in seguito viene scoperto un bug, il registro del turnstile mostra se da una pool sia mai uscito più valore di quanta ne sia entrato. Un registro pulito è una prova forte del fatto che nessuna contraffazione sia stata sfruttata.

Terzo, mantiene privati i pagamenti all'interno di una pool mentre fa tutto questo. Ogni transazione pubblica solo il proprio flusso netto in entrata o in uscita da una pool, che per un pagamento all'interno di una sola pool è semplicemente la commissione. Un trasferimento tra pool, ad esempio da Orchard a Ironwood, mostra l'importo che attraversa. Auditabilità e privacy coesistono, il che è insolito, ed è uno dei punti di forza più discreti di Zcash.

<br/>

## Il turnstile in azione

Il turnstile non è una novità, ed è stato utilizzato in momenti chiave della storia di Zcash.

Quando Zcash si spostò dalla pool Sprout originale alla più recente pool Sapling, il turnstile presidiò la transizione. La pool Sprout fu in seguito limitata in modo da non poter più ricevere nuovi afflussi, il che incoraggiò gli utenti a migrare mentre il turnstile manteneva la contabilità onesta. Anni dopo, il fatto che da Sprout non sia mai uscito valore in modo improprio resta come prova che la sua crittografia dei primi tempi non sia mai stata sfruttata con successo.

Lo stesso schema ora presidia il passaggio da Orchard a Ironwood. Nel 2026 è stato scoperto e corretto un bug di solidità nel sistema di prova di Orchard. Non ci sono prove che sia mai stato sfruttato, ma poiché l'attività schermata è privata, la certezza era impossibile. La risposta consiste nel sigillare la vecchia pool Orchard e far sì che tutti migrino i propri fondi attraverso il turnstile in Ironwood, una pool nuova che utilizza il protocollo corretto. Forzare i fondi attraverso il turnstile significa che eventuali monete contraffatte ipoteticamente lasciate indietro non possono seguirli e che, una volta completata la migrazione, chiunque può confermare che la quantità di ZEC nelle pool schermate è solida.

<br/>

## Dismissione a senso unico delle pool

Il turnstile rende possibile ritirare una vecchia pool in sicurezza, in una sola direzione, senza mai compromettere la garanzia sull'offerta. Il trucco consiste nel chiudere l'entrata lasciando aperta l'uscita.

Sprout è l'esempio più chiaro. Per dismetterla, ZIP 211 ha aggiunto un'unica regola di consenso: dalla sua altezza di attivazione, il campo vpub_old di ogni JoinSplit deve essere zero. Poiché vpub_old è l'unico modo in cui il valore può entrare in Sprout, costringerlo a zero significa che nessun nuovo valore potrà più entrarci, mentre il valore può ancora defluire verso il lato trasparente o proseguire verso Sapling. La pool è diventata a senso unico. Può solo svuotarsi, mai riempirsi. Il turnstile continua a contare per tutto il tempo, quindi il saldo può scendere man mano che i fondi escono, ma non può mai salire, e non può mai andare in negativo.

La migrazione da Orchard a Ironwood utilizza la stessa idea. All'aggiornamento NU6.3, la pool Orchard viene chiusa ai nuovi afflussi, e i portafogli vengono indirizzati a inviare i fondi Orchard attraverso il turnstile nella nuova pool Ironwood. Orchard diventa una pool a senso unico che può solo svuotarsi. Poiché ogni uscita è un attraversamento del turnstile che deve essere dimostrato, qualsiasi ipotetico valore contraffatto lasciato indietro in Orchard non può seguire di nascosto, all'uscita, i fondi onesti. Rimane intrappolato in una pool che si svuota soltanto ed è sorvegliata alla porta. Col tempo questo porta la vecchia pool verso lo svuotamento e permette a chiunque di confermare che il valore uscito non sia mai stato superiore a quello che onestamente vi era entrato.

Questa è la ragione più profonda per cui il turnstile è importante, al di là della semplice contabilità. È il meccanismo che permette a Zcash di dismettere una pool schermata, sia per ridurre la complessità come nel caso di Sprout, sia per riprendersi da un bug scoperto come nel caso di Orchard, mantenendo una garanzia continua, pubblica e dimostrabile sull'offerta.

<br/>

## Malintesi comuni

- Il turnstile non rivela chi ha inviato cosa a chi. Mostra però l'importo di qualsiasi transazione che sposta ZEC tra le pool
- Non identifica un contraffattore per nome. Limita quanto può uscire da una pool, ed è questo a proteggere l'offerta
- Non è un'invenzione nuova per Ironwood. Ha presidiato ogni grande transizione tra pool schermate nella storia di Zcash
- Un totale pubblico della pool non indebolisce la privacy dei pagamenti all'interno della pool. Spostare ZEC tra le pool mostra l'importo spostato, ed è per questo che ZIP 318 chiede ai portafogli di migrare in importi standard nel tempo

<br/>

## Risorse

1. [ZIP 209: Vietare i saldi fuori intervallo delle pool di valore della chain](https://zips.z.cash/zip-0209) - la regola di consenso alla base del turnstile
2. [ZIP 211: Disabilitazione dell'aggiunta di nuovo valore alla pool di valore della chain Sprout](https://zips.z.cash/zip-0211) - come la pool Sprout è stata chiusa ai nuovi versamenti
3. [ZIP 258: NU6.3](https://zips.z.cash/zip-0258) - l'aggiornamento che introduce la pool Ironwood e dirige il valore attraverso il turnstile
4. [Applicazione del turnstile contro la contraffazione](https://electriccoin.co/blog/turnstile-enforcement-against-counterfeiting/) - la spiegazione originale di Electric Coin Company
5. [Specifiche del protocollo Zcash](https://zips.z.cash/protocol/protocol.pdf) - consulta le sezioni sul saldo e sulla firma vincolante per il dettaglio completo
6. [Pool di valore, il libro di Zebra](https://zebra.zfnd.org/dev/rfcs/0012-value-pools.html) - come un nodo tiene traccia del saldo di valore di ogni pool

<br/>

## Pagine correlate

- [Pool schermate](https://zechub.wiki/using-zcash/shielded-pools) - come le transazioni schermate di Zcash mantengono private le informazioni
- [Halo](https://zechub.wiki/zcash-tech/halo) - il sistema di prova alla base della pool Orchard
- [Aggiornamenti di rete](https://zechub.wiki/start-here/network-upgrades) - come Zcash attiva modifiche come nuove pool schermate

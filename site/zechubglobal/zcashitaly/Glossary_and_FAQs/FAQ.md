# Domande frequenti

Una lista di argomenti con le domande più frequenti su Zcash. Per risolvere i problemi relativi al client di Zcash, si prega di consultare [documentazione sulla risoluzione dei problemi](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).


## Cos'è Zcash?

Zcash è una valuta digitale veloce e confidenziale, con commissioni basse. La privacy è la caratteristica centrale di Zcash. Ha introdotto l'uso di proof a conoscenza zero per proteggere le informazioni degli utenti mediante la crittografia di tutte le transazioni. Ci sono diversi portafogli che puoi scaricare per fare pagamenti istantanei, sicuri mobili, e privati.

[Portafogli](https://z.cash/wallets/)


## Come posso ottenere Zcash?

Puoi comprare ZEC sugli [exchange](https://z.cash/exchanges). Puoi anche acquistare Zcash direttamente da un'altra persona in modo peer-to-peer. Usa cautela quando fai scambi con servizi e individui con cui non sei familiare. Puoi anche acquisire Zcash tramite il mining di Zcash.


## Qual'è la differenza tra Zcash ed altre cryptovalute?

Zcash è fondamentalmente più privato di altre criptovalute come Bitcoin o Ethereum. Zcash supporta tempi di blocco rapidi (75 secondi), commissioni basse e ha regolari programmi di aggiornamento, il che significa che questo protocollo è altamente adattabile. Una caratteristica chiave è la privacy opzionale ma altamente sicura.


Gli utenti possono selezionare se una transazione avviene sulla parte Trasparente (Trasparent) o Schermata (Shielded) della blockchain. Per ulteriori informazioni, vedere [qui](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)

## Come è governato il protocollo Zcash?

Il protocollo è governato da Zcash Improvement Proposal process (processo di miglioramento di Zcash). Il processo ZIP fornisce una sede e una struttura aperta per valutare collettivamente le modifiche a Zcash.

Chiunque può presentare una bozza di ZIP. Le bozze di ZIP sono discusse dalla comunità nel suo insieme e poi accettate o respinte dagli editor di ZIP.

Attualmente ci sono due editor di ZIP.— [Daira Hopwood](https://twitter.com/feministPLT) rappresenta l'Electric Coin Company, e [Deirdre Connolly](https://twitter.com/durumcrustulum) rappresenta la Fondazione Zcash. 

Le decisioni dal processo ZIP sono inserite nelle specifiche di Zcash, così come nel software che gestisce la rete. I cambiamenti sono "ratificati" on-chain quando la maggioranza della rete adotta l'aggiornamento e non viola il consenso.

## Dov'è la mia transazione?

Prima leggi [il nostro articolo](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629) sui block explorer. Successivamente controlla [Zcash block explorer](https://zcashblockexplorer.com) notando che tutte le transazioni scadono per impostazione predefinita dopo circa 25 minuti/20 blocchi e i fondi vengono restituiti all'indirizzo di invio originale. 

Se la tua transazione scade, la cosa migliore da fare è provare nuovamente la transazione con alcune possibili modifiche.

Potrebbero esserci diverse ragioni per cui la tua transazione non viene inclusa in un blocco:

+ Perdita di connessione

+ Commissione di transazione troppo bassa

+ Sovraccarico della rete

+ Troppi input trasparenti (dimensione della transazione troppo grande)


Suggeriamo di riprovare la transazione con :

+ Provare nuovamente con una connessione migliore

+ Usare la commissione standard

+ Riprovare più tardi, o aumentare la commissione per una priorità della transazione maggiore

+ Utilizzare una quantità minima di input per limitare le dimensioni o aumentare la commissione per transazioni di grandi dimensioni



## Zcash è verament Privata?

Sì, Zcash consente una completa privacy per gli utenti cifrando i dati del mittente, dell'importo e del destinatario all'interno di transazioni con firma singola pubblicate sul suo registro blockchain pubblico, in particolare per le transazioni che coinvolgono indirizzi protetti.

Zcash non: cifra i dati per le transazioni multisignature (in attesa dell'integrazione di FROST) o protegge dalle correlazioni effettuate con le transazioni pubbliche trasparenti (ad esempio, quando Zcash viene scambiato con un'altra criptovaluta) e non oscura gli indirizzi IP.

Per maggiori informazioni, leggi qui: [A Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem)

___


## Alcuni malintesi comuni

+ Zcash è una crypto centralizzata?
 

   No, esiste un accordo sui marchi in vigore che impedisce alla Zcash Foundation o all'ECC di intraprendere qualsiasi azione contraria al chiaro consenso della comunità Zcash.

   Il chiaro consenso viene determinato attraverso sondaggi della comunità all'interno e all'esterno del Community Advisory Panel, un gruppo di circa 90 volontari con un interesse o una conoscenza estesa dell'ecosistema di Zcash.

   Qui Messari Research dettaglia la comprovata storia di governance decentralizzata e di decisioni prese dalla comunità di Zcash: https://messari.io/report/decentralizing-zcash

   I meriti del voto on-chain e del voto dei possessori di ZEC è stata discussa come possibile meccanismo di proof of stake per il futuro. È stata utilizzata in passato dalla comunità di Zcash, come si può vedere dal seguente link [qui](https://forum.zcashcommunity.com/t/coin-holder-polling-instructions/40170). 

   Progetti come il "Zcash Foundation A/V club" e "ZecHub" consentono una partecipazione e un contributo diversificati da parte dei membri della comunità o da persone interessate a produrre contenuti di qualità in modo asincrono, offrendo opportunità di guadagno in ZEC non soggetto a KYC.

   Per informazioni sulle principali organizzazioni di Zcash + i ruoli presenti in ogni team delle organizzazioni, consultare [qui](https://zechub.notion.site/Zcash-Basics-d2946ad9c3b541759174dbcbf0e8c9cc). 
   
   Per sapere esattamente come è suddiviso il Dev Fund tra le principali organizzazioni vedere [qui](https://zechub.notion.site/Zcash-Development-Fund-aa3e0ac2a8514d97aef5254f3b76d7b2).



+ Zcash ha una Backdoor?

  No, né Zcash né altri algoritmi crittografici o software che abbiamo creato contengono una backdoor, e non la conterranno mai. 



+ Zcash è controllato da una società?

   Erratoto. Sebbene Zcash abbia stretto partnership con grandi aziende e banche per programmi di ricerca e divulgazione, rimaniamo impegnati a raggiungere il suo obiettivo di libertà economica e resilienza attraverso la decentralizzazione.

   Zcash ha diverse organizzazioni che mantengono un certo grado di autonomia e quindi non sono vincolate a nessuna singola parte. Invece, lavorano insieme per promuovere la custodia autonoma degli asset, finanziare implementazioni indipendenti di nodi e guidare l'educazione normativa legata alla difesa della privacy digitale e alla protezione dei diritti umani.




+ Zcash ha una privacy limitata rispetto ad altre criptovalute privacy
   
   No, la privacy ottenuta da una privacy coin come Monero o Grin/Litecoin si basa principalmente sull'uso di "decoy" che offuscano la fonte e la destinazione delle transazioni. I dati del grafo delle transazioni sono ancora accessibili.

   Se un soggetto malevolo dovesse dedicare abbastanza tempo e risorse al monitoraggio della catena, questo tipo di privacy potrebbe essere compromessa. Zcash cripta tutti i dati delle transazioni, quindi lo stesso metodo di attacco non funzionerebbe. Tutte le transazioni sono indistinguibili all'interno di un pool protetto.

   Non esiste una soluzione perfetta, specialmente se un determinato soggetto ha accesso a risorse e tempo significativi, come le reti neurali di intelligenza artificiale. Abbiamo specificato le circostanze (in aumento) in cui potrebbe essere più vantaggioso utilizzare una soluzione a conoscenza zero (ZK) rispetto a una basata su "decoy".
    [Leggi di più](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)

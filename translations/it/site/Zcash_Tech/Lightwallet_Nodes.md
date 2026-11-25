<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica la pagina"/>
</a>


# Zcash Nodi lightwallet

## In breve

* La maggior parte delle persone usa Zcash tramite un portafoglio leggero, che non scarica l'intera blockchain. Invece, comunica con un server che ha già svolto quel lavoro.
* Oggi tre software forniscono comunemente servizi ai portafogli leggeri: **lightwalletd** (l'originale, in Go), **Zaino** (un indicizzatore Rust) e ztreamer (un indicizzatore Rust ad alte prestazioni di Zcash Labs che alimenta la rete pubblica fastz.cash).
* Le tue chiavi non lasciano mai il tuo dispositivo e il server non può spendere i tuoi fondi né leggere gli importi e i memo nelle transazioni completamente schermate.
* Il server può sapere facilmente il tuo indirizzo IP e quando svolgi le tue attività: le transazioni schermate proteggono ciò che avviene sulla blockchain, non la tua connessione al server.
* Tor rimuove l'identificatore IP; è disponibile nei portafogli basati su `zcash_client_backend` e, in ZODL, si trova tra le Advanced Settings.
* Puoi cambiare il server usato dal tuo portafoglio oppure gestirne uno tuo: lightwalletd, Zaino e ztreamer sono tutti open source.

## Spiegazione di base

La maggior parte delle persone usa Zcash tramite un portafoglio leggero, che non scarica l'intera blockchain. Invece, comunica con un server che ha già svolto quel lavoro. Questa pagina spiega cosa sono questi server, cosa possono e non possono vedere di te, come instradare la connessione tramite Tor e come cambiare il server usato dal tuo portafoglio.

Oggi tre software forniscono comunemente servizi ai portafogli leggeri. **lightwalletd** è il servizio originale, scritto in Go. **Zaino** è un indicizzatore più recente, scritto in Rust e realizzato nell'ambito del lavoro per la dismissione di zcashd. **ztreamer** è un indicizzatore Rust ad alte prestazioni di Zcash Labs che alimenta la rete pubblica fastz.cash.

### Cosa fa un server per portafogli leggeri

Un server per portafogli leggeri si trova tra il tuo portafoglio e la blockchain di Zcash e fornisce una vista della chain efficiente in termini di banda. Svolge tre funzioni per te.

Fornisce blocchi compatti. Invece dei blocchi interi, invia una versione compatta che contiene solo ciò che serve al portafoglio per rilevare un pagamento al tuo indirizzo schermato, rilevare una spesa delle tue note e aggiornare i witness.

Inoltra le tue transazioni. Quando invii, il tuo portafoglio consegna al server la transazione completata, che il server trasmette alla rete.

Risponde alle richieste sulla chain, per esempio fornendo l'altezza attuale e le informazioni sulle commissioni di cui ha bisogno il tuo portafoglio.

Il tuo portafoglio continua a svolgere localmente le operazioni private. Conserva le tue chiavi, prova a decifrare i blocchi per trovare le tue note e crea e firma le transazioni sul tuo dispositivo.

### Cosa può e non può vedere il server

È facile sbagliarsi su questo punto. Le tue chiavi non lasciano mai il tuo dispositivo, ma questo non significa che il server non possa sapere nulla di te.

Il riferimento qui è il modello di minaccia dell'app portafoglio [Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), che vale la pena leggere per intero se ti interessa l'argomento. Descrive diversi tipi di avversari. Per questa pagina è rilevante un avversario in grado di osservare il traffico tra il tuo portafoglio e Internet, e tra il server e Internet. Chi gestisce il server si trova inevitabilmente, in parte, in questa posizione, perché il tuo portafoglio si connette direttamente a quel server.

Partiamo da ciò che è protetto. Contro tutti gli avversari descritti nel modello, compreso chi ha compromesso il server, quest'ultimo "non può apprendere alcun materiale crittografico delle chiavi dell'utente (chiavi di spesa, chiavi di visualizzazione, frase mnemonica ecc.)", non può rubare i tuoi fondi e non può farti inviare fondi che non intendevi inviare. Gli importi e i memo contenuti nelle transazioni completamente schermate restano crittografati.

Poi c'è ciò che non è protetto. Il modello elenca i seguenti punti deboli noti contro un avversario che osserva il traffico:

| Punto debole | Come |
|:--|:--|
| Scoprire chi sei | "L'avversario conosce l'indirizzo IP dell'utente, il che potrebbe permettergli di risalire alla sua vera identità" |
| Capire più o meno dove ti trovi | Cercando il tuo IP "in un database di geolocalizzazione per approssimare la tua posizione" |
| Sapere se e quando hai inviato o ricevuto una transazione schermata | L'invio "usa più banda, cosa che resta visibile anche se la connessione è crittografata". Il modello osserva che il server stesso può vedere quando invii e ricevi |
| Contare quante transazioni hai fatto nel tempo | Gli stessi schemi di consumo della banda, osservati per un periodo più lungo |
| Individuare schemi di pagamento ricorrenti | Osservando quando avvengono le attività |
| Capire se un indirizzo è tuo | Un avversario che già conosce un indirizzo "potrebbe inviargli fondi e osservare se si verificano picchi di traffico" quando il tuo portafoglio lo recupera |

Il modello osserva anche che il caso ordinario presuppone "un rapporto di fiducia tra l'utente e chi gestisce il server di lightwalletd".

In sintesi, un server per portafogli leggeri non può spendere i tuoi soldi né leggere gli importi o i memo nelle tue transazioni schermate. Può invece sapere facilmente il tuo indirizzo IP e quando svolgi le tue attività; questi due elementi insieme possono rivelare molto su una persona. Le transazioni schermate proteggono ciò che avviene sulla blockchain. Da sole, non nascondono la tua connessione al server.

## Immagine / analogia

Immagina una biblioteca pubblica che custodisce tutti i giornali mai stampati. Un full node è un lettore che porta a casa l'intero archivio. Un portafoglio leggero è un lettore che chiede al bibliotecario un riepilogo giornaliero: un foglio sottile con le informazioni minime per capire se qualcosa lo riguarda.

Il riepilogo è sigillato: il bibliotecario lo prepara senza poter leggere quali elementi ti interessano, e tu lo apri a casa con la tua chiave. Questo è il blocco compatto; l'apertura corrisponde alla decifratura di prova sul tuo dispositivo.

Ma il bibliotecario vede comunque quale lettore è entrato, a che ora e quanto era spesso il pacco che ha portato fuori. Questo corrisponde all'indirizzo IP e agli orari: sono visibili dal banco, indipendentemente da quanto sia ben sigillata la busta. Tor equivale a inviare un corriere anonimo: il bibliotecario consegna lo stesso pacco, ma non sa più a chi appartiene la casa di destinazione.

## Approfondimento

### Instradamento tramite Tor

Tor interrompe il collegamento tra il tuo indirizzo IP e il traffico del tuo portafoglio, rimuovendo così l'identificatore più forte della tabella qui sopra.

Il supporto è presente nelle librerie Rust su cui si basano molti portafogli Zcash. zcash_client_backend include un modulo Tor basato su [Arti](https://tpo.pages.torproject.net/core/arti/), l'implementazione di Tor in Rust, così un portafoglio può instradare la sincronizzazione, la trasmissione delle transazioni e le richieste sui prezzi tramite Tor senza includere un client Tor separato.

Gli sviluppatori di Zaino sostengono lo stesso argomento e citano direttamente il modello di minaccia: c'è "la necessità di usare protocolli di trasporto anonimi (come Nym o Tor) per offuscare le identità dei client ai server di indicizzazione di Zcash".

In **ZODL**, Tor è un'impostazione nelle Advanced Settings. Le note di rilascio del portafoglio indicano la modalità di connessione manuale "insieme all'attivazione di Tor nelle Advanced Settings" se "preferisci ridurre l'esposizione dei metadati". L'app offre inoltre di attivare Tor prima che tu ripristini un portafoglio: altrimenti è proprio in quel momento che un nuovo IP verrebbe associato all'intera cronologia del portafoglio.

Ci sono due avvertenze. Tor nasconde il tuo IP al server, ma non cambia ciò che il server apprende dalle richieste che fai. Inoltre, l'instradamento onion aggiunge latenza, quindi la sincronizzazione richiede più tempo. Gestire un server tuo risolve diversamente il problema della fiducia, perché in quel caso chi lo gestisce sei tu.

### Zaino, l'indicizzatore Rust

[Zaino](/zcash-tech/zaino) è un indicizzatore scritto in Rust dal team Zingo, creato per sostituire lightwalletd nell'ambito del lavoro per la dismissione di zcashd. Fornisce servizi a light client, client completi e Block Explorers, leggendo i dati della chain detenuti da "un validatore completo Zebra oppure zcashd".

È in fase di sviluppo attivo; la versione 0.10.1 è stata rilasciata a settembre 2026. Punta a mantenere la compatibilità con le versioni precedenti di lightwalletd dove possibile, così i portafogli possono collegarsi senza dover essere riscritti.

Zaino ha una pagina dedicata con diagrammi dell'architettura, quindi qui ci occupiamo solo del suo ruolo di server per portafogli leggeri.

### ztreamer e fastz.cash

[ztreamer](https://github.com/zcashlabs/ztreamer) è un indicizzatore Zcash ad alte prestazioni e un server per portafogli leggeri, scritto in Rust da Zcash Labs. È progettato per offrire bassa latenza e throughput elevato e alimenta la rete di indicizzazione pubblica [fastz.cash](https://forum.zcashcommunity.com/t/announcing-fastz-cash-rpc-by-zcash-labs/59478) (annunciata il 19 novembre 2026).

fastz.cash dispone di server edge regionali (attualmente a Francoforte, Londra, Virginia, Oregon, San Paolo, Singapore e Osaka). Ogni regione ha un proprio full node e un indice ztreamer locale. TLS termina sul nodo. Il tempo mediano misurato per ricevere la prima risposta a una chiamata GetLatestBlock era di circa 35 ms in tutto il mondo. La sincronizzazione per intervalli di blocchi risulta fino a ~3 volte più veloce rispetto alle versioni recenti di lightwalletd; l'ingombro contenuto dell'indice (~18 GB) rende pratico aggiungere altre località edge.

Stato ed endpoint più vicino: [status.fastz.cash](https://status.fastz.cash).

**Nota sulla privacy:** fastz.cash gestisce anche il servizio wallet-pir di Valar Group. Gli utenti di Vizor possono usarlo già oggi per effettuare query di sincronizzazione private che riducono i metadati che il server apprende sulle note o sugli intervalli richiesti. È un ulteriore livello di privacy che si aggiunge al consueto modello di minaccia dei portafogli leggeri descritto sopra; non sostituisce Tor né la scelta di chi gestisce il server.

ztreamer è open source e può essere eseguito in modo indipendente (nodo Zakura integrato oppure modalità remota). Come lightwalletd e Zaino, fornisce il protocollo per portafogli leggeri tramite gRPC. È in fase di sviluppo attivo e si propone sia come infrastruttura di produzione sia come banco di prova per futuri miglioramenti del protocollo per portafogli leggeri.

### Gestire un server proprio

L'opzione più solida è gestire il server da te, eliminando del tutto il problema della fiducia. Tutti e tre i server sono open source: [lightwalletd](https://github.com/zcash/lightwalletd) in Go, [Zaino](https://github.com/zingolabs/zaino) in Rust e [ztreamer](https://github.com/zcashlabs/ztreamer) in Rust. Leggono i dati da un validatore completo, quindi ti servirà anche [Zebra](/zcash-tech/zebra-full-node) oppure Zakura. I server zec.rocks vengono distribuiti con [Zcash Stack](/guides/zcash-stack), un chart Helm open source e un kit Compose Docker che esegue insieme Zebra e lightwalletd.

## Implicazioni pratiche

### Elenco dei server

La dashboard [hosh.zec.rocks](https://hosh.zec.rocks/zec) tiene traccia dei server pubblici e del loro stato di salute; è il posto giusto per verificare quali sono effettivamente attivi. [status.zec.rocks](https://status.zec.rocks/) mostra lo stato dei servizi. Per la rete fastz.cash, consulta [status.fastz.cash](https://status.fastz.cash).

Al momento della stesura, la dashboard elencava questi server:

| Server | Note |
|:--|:--|
| zec.rocks:443 | Accanto a questo sono elencati gli endpoint regionali na.zec.rocks, eu.zec.rocks, ap.zec.rocks e sa.zec.rocks |
| zec-node.cakewallet.com:443 | Sul dominio di Cake Wallet |
| zec.0xrpc.io:443 | Gestito da 0xRPC, che offre endpoint pubblici gratuiti per diverse chain e chiede donazioni per coprire i costi di capacità |
| zaino.unsafe.zec.rocks:443 | Un'istanza Zaino. Fai attenzione al nome host e considerala sperimentale |
| testnet.zec.rocks:443 | Testnet, con un'istanza Zaino per testnet elencata all'indirizzo zaino.testnet.unsafe.zec.rocks |
| rpc.fastz.cash | Rete ztreamer pubblica di Zcash Labs. Controlla status.fastz.cash per gli endpoint regionali e il loro stato. |

Controlla le dashboard invece di fidarti di questo elenco. Chi gestisce i server può cambiare e una pagina come questa invecchia.

### Cambiare il server nel tuo portafoglio

Vale la pena farlo se vuoi scegliere un operatore di cui ti fidi, distribuire l'attività tra più operatori o collegarti a un server tuo.

I percorsi nei menu qui sotto erano corretti al momento dell'ultimo aggiornamento di questa pagina, ma le interfacce dei portafogli cambiano: considerali indicativi, non come percorsi esatti. Cerca le Advanced Settings o un'opzione per il server.

#### ZODL

In precedenza Zashi. Tocca l'ingranaggio nell'angolo in alto a destra, poi Advanced Settings. Tor si trova nella stessa schermata. ZODL offre anche una scorciatoia Switch server quando un errore di sincronizzazione è causato da un server non aggiornato.

#### Zkool

Il successore di Ywallet, dello stesso sviluppatore (Ywallet non è più mantenuto e non può seguire la rete dopo Ironwood). Tocca l'icona dell'ingranaggio (Open Settings) nella parte superiore della schermata degli account, poi il campo Light Node Server. Il pulsante dell'elenco accanto ti permette di scegliere tra i server noti; l'interruttore Direct / Tor / Nym / Proxy sottostante imposta come si connette il portafoglio.

#### Zingo

Tocca il menu hamburger nell'angolo in alto a sinistra, poi Settings, quindi scorri verso il basso.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Tocca il menu hamburger nell'angolo in alto a sinistra, poi Settings e infine Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Queste schermate sono state acquisite a marzo 2025 e da allora le app hanno ricevuto nuovi aggiornamenti, quindi i pulsanti potrebbero essere stati spostati.

## Errori comuni

**Pensare che il server possa leggere le tue transazioni.** Non può. Le tue chiavi restano sul tuo dispositivo e gli importi e i memo nelle transazioni completamente schermate restano crittografati, anche contro un avversario che ha compromesso il server.

**Interpretare "schermato" come "connessione anonima".** Le transazioni schermate proteggono ciò che avviene sulla blockchain. Il tuo indirizzo IP e gli orari delle tue attività appartengono a un livello separato, ed è proprio quel livello che il server vede.

**Supporre che Tor elimini ogni traccia.** Tor nasconde il tuo IP al server, ma non cambia ciò che il server apprende dalle richieste che fai e aumenta la latenza della sincronizzazione.

**Fidarsi dell'elenco dei server di una pagina wiki.** Chi gestisce i server può cambiare. Prima di collegare il tuo portafoglio a un server, controlla [hosh.zec.rocks](https://hosh.zec.rocks/zec) e [status.fastz.cash](https://status.fastz.cash) per vedere cosa è effettivamente attivo.

## Riepilogo

I portafogli leggeri ti danno accesso alla pool schermata senza richiedere spazio su disco: è un buon compromesso. Devi solo avere chiaro cosa comporta. Il server non può sottrarti i fondi né leggere gli importi schermati, ma può facilmente vedere il tuo indirizzo IP e quando effettui transazioni. Instrada la connessione tramite Tor, scegli con attenzione chi gestisce il server oppure gestiscine uno tuo.

## Pagine correlate

- [Chi può vedere il tuo pagamento Zcash in Zcash](/start-here/who-can-see-your-zcash-payment) — una spiegazione introduttiva della stessa questione.
- [Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see) — cosa è visibile on-chain, rispetto a ciò che vede il server.
- [Zaino](/zcash-tech/zaino) — diagrammi dell'architettura e ruolo più ampio dell'indicizzatore Rust.
- [Zinder](/zcash-tech/zinder) — l'indicizzatore alpha di Zcash Foundation, che fornisce servizi ai portafogli leggeri tramite un adapter compatibile con lightwalletd.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — il validatore da cui legge un server per portafogli leggeri.
- [Zcash Sincronizzazione del portafoglio](/zcash-tech/zcash-wallet-syncing) — come il tuo portafoglio elabora i blocchi compatti inviati dal server.
- [ztreamer](https://github.com/zcashlabs/ztreamer) — indicizzatore Rust ad alte prestazioni usato dalla rete fastz.cash.

**Ultimo aggiornamento:** novembre 2026

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nodi Lightwallet di Zcash

## TL;DR

* La maggior parte delle persone usa Zcash tramite un wallet leggero, che non scarica l'intera blockchain. Invece, comunica con un server che ha già svolto quel lavoro.
* Oggi due software servono i wallet leggeri: **lightwalletd**, il servizio originale scritto in Go, e **Zaino**, un indicizzatore più recente scritto in Rust.
* Le tue chiavi non lasciano mai il tuo dispositivo e il server non può spendere i tuoi fondi né leggere gli importi e i memo all'interno delle transazioni completamente schermate.
* Ciò che il server può facilmente apprendere è il tuo indirizzo IP e la tempistica della tua attività — le transazioni schermate proteggono ciò che avviene sulla blockchain, non la tua connessione al server.
* Tor rimuove l'identificatore IP; è disponibile nei wallet basati su `zcash_client_backend` e, in ZODL, è un'impostazione nelle Impostazioni avanzate.
* Puoi cambiare il server usato dal tuo wallet oppure eseguirne uno tuo — sia lightwalletd sia Zaino sono open source.

## Spiegazione fondamentale

La maggior parte delle persone usa Zcash tramite un wallet leggero, che non scarica l'intera blockchain. Invece, comunica con un server che ha già svolto quel lavoro. Questa pagina spiega cosa sono questi server, cosa possono e non possono vedere di te, come instradare la tua connessione tramite Tor e come cambiare il server usato dal tuo wallet.

Oggi due software servono i wallet leggeri. **lightwalletd** è il servizio originale, scritto in Go. **Zaino** è un indicizzatore più recente scritto in Rust, realizzato nell'ambito del lavoro di deprecazione di zcashd.

### Cosa fa un server per wallet leggero

Un server per wallet leggero si trova tra il tuo wallet e la blockchain Zcash e gli offre una visualizzazione della catena efficiente in termini di banda. Fa tre cose per te.

Fornisce blocchi compatti. Anziché blocchi interi, invia una forma compatta che contiene solo ciò di cui un wallet ha bisogno per rilevare un pagamento al proprio indirizzo schermato, rilevare una spesa delle proprie note e aggiornare i propri testimoni.

Ritrasmette le tue transazioni. Quando invii, il tuo wallet consegna la transazione completata al server, che la trasmette alla rete.

Risponde alle interrogazioni sulla catena, come l'altezza corrente e le informazioni sulle commissioni necessarie al tuo wallet.

Il tuo wallet continua a svolgere localmente il lavoro privato. Conserva le tue chiavi, prova a decrittare i blocchi per trovare le tue note e costruisce e firma le transazioni sul tuo dispositivo.

### Cosa il server può e non può vedere

Questa è la parte in cui è facile sbagliarsi. Le tue chiavi non lasciano mai il tuo dispositivo, ma ciò non significa che il server non apprenda nulla su di te.

Il riferimento è il [modello di minaccia dell'app wallet Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), che vale la pena leggere integralmente se questo tema ti interessa. Descrive diversi tipi di avversario. Quello rilevante per questa pagina è un avversario che può osservare il traffico tra il tuo wallet e internet, e tra il server e internet. Chiunque gestisca il server si trova intrinsecamente in parte in quella posizione, perché il tuo wallet si connette direttamente a lui.

Partiamo da ciò che è protetto. Contro ogni avversario nel modello, incluso uno che abbia compromesso il server, non può "apprendere alcun materiale crittografico dell'utente (chiavi di spesa, chiavi di visualizzazione, frase seed, ecc.)", non può rubare i tuoi fondi e non può farti inviare fondi che non intendevi inviare. Gli importi e i memo all'interno delle transazioni completamente schermate restano crittografati.

Poi c'è ciò che non è protetto. Il modello di minaccia elenca queste debolezze note contro un avversario che osserva il traffico:

| Debolezza | Come |
|:--|:--|
| Capire chi sei | "L'avversario conosce l'indirizzo IP dell'utente, che potrebbe condurlo alla sua vera identità" |
| Capire approssimativamente dove ti trovi | Cercando il tuo IP "in un database di geolocalizzazione per approssimare la sua posizione" |
| Capire se e quando hai inviato o ricevuto una transazione schermata | L'invio "usa più banda, cosa visibile anche se la connessione è crittografata". Il modello rileva che l'atto di inviare e ricevere è visibile al server stesso |
| Contare quante transazioni hai effettuato nel tempo | Gli stessi schemi di utilizzo della banda, osservati per un periodo più lungo |
| Individuare schemi di pagamento ricorrenti | Osservando quando avviene l'attività |
| Stabilire se un indirizzo è tuo | Un avversario che conosce già un indirizzo "potrebbe inviare fondi a quell'indirizzo e osservare se si verificano picchi di banda" dal tuo wallet mentre lo recupera |

Il modello rileva inoltre che il caso ordinario presuppone "una relazione di fiducia tra l'utente e l'operatore del server lightwalletd".

Quindi il riassunto onesto è questo. Un server per wallet leggero non può spendere il tuo denaro e non può leggere gli importi o i memo nelle tue transazioni schermate. Ciò che può facilmente apprendere è il tuo indirizzo IP e la tempistica della tua attività, e questi due elementi insieme possono rivelare molto su una persona. Le transazioni schermate proteggono ciò che avviene sulla blockchain. Da sole, non nascondono la tua connessione al server.

## Visuale / Analogia

Pensa a una biblioteca pubblica che conserva ogni giornale mai stampato. Un nodo completo è un lettore che porta a casa l'intero archivio. Un wallet leggero è un lettore che chiede invece al bibliotecario un riassunto quotidiano — un foglio sottile che contiene appena abbastanza per capire se qualcosa lo riguarda.

Il riassunto è sigillato: il bibliotecario lo prepara senza poter leggere quali elementi siano importanti per te, e tu lo apri a casa con la tua chiave. Questo è il blocco compatto, e l'apertura è la decrittazione di prova sul tuo dispositivo.

Ma il bibliotecario vede comunque quale lettore è entrato, a che ora e quanto spesso fosse il fascio che ha portato via. Questo è l'indirizzo IP e la tempistica — visibili dal bancone, per quanto bene sia sigillata la busta. Tor equivale a inviare un corriere anonimo: il bibliotecario consegna comunque lo stesso fascio, ma non sa più a quale casa è destinato.

## Approfondimento

### Instradamento tramite Tor

Tor interrompe il collegamento tra il tuo indirizzo IP e il traffico del tuo wallet, rimuovendo l'identificatore più forte nella tabella sopra.

Il supporto esiste nelle librerie Rust su cui si basano molti wallet Zcash. zcash_client_backend include un modulo Tor basato su [Arti](https://tpo.pages.torproject.net/core/arti/), l'implementazione Rust di Tor, quindi un wallet può instradare tramite Tor la sincronizzazione, la trasmissione delle transazioni e le ricerche dei prezzi senza distribuire un client Tor separato.

Gli sviluppatori di Zaino sostengono la stessa tesi, citando direttamente il modello di minaccia: esiste "la necessità di utilizzare protocolli di trasporto anonimi (come Nym o Tor) per offuscare le identità dei client dai server di indicizzazione di Zcash".

In **ZODL**, Tor è un'impostazione nelle Impostazioni avanzate. Le note di rilascio del wallet indirizzano gli utenti alla modalità di connessione manuale "oltre ad abilitare Tor nelle Impostazioni avanzate" se "preferiscono ridurre l'esposizione dei metadati", e l'app propone di attivare Tor prima di ripristinare un wallet, ovvero il momento in cui un nuovo IP sarebbe altrimenti collegato all'intera cronologia del wallet.

Due avvertenze. Tor nasconde il tuo IP al server, ma non cambia ciò che il server apprende dalle richieste che effettui. E l'instradamento onion aggiunge latenza, quindi la sincronizzazione richiede più tempo. Eseguire il proprio server evita la questione della fiducia in modo diverso, poiché in quel caso l'operatore sei tu.

### Zaino, l'indicizzatore Rust

[Zaino](/zcash-tech/zaino) è un indicizzatore scritto in Rust dal team Zingo, realizzato per sostituire lightwalletd nell'ambito del lavoro di deprecazione di zcashd. Serve client leggeri, client completi ed esploratori di blocchi, leggendo dati della catena detenuti da "un validatore completo Zebra o Zcashd".

È in sviluppo attivo, con la versione 0.8.0 rilasciata nell'agosto 2026. Mira a rimanere retrocompatibile con lightwalletd ove possibile, così i wallet possono puntarvi senza dover essere riscritti.

Zaino ha una propria pagina con diagrammi dell'architettura, quindi questa pagina tratta solo il suo ruolo come server per wallet leggero.

### Eseguire il proprio

L'opzione più forte è essere il proprio operatore, eliminando completamente la questione della fiducia. Entrambi i server sono open source: [lightwalletd](https://github.com/zcash/lightwalletd) in Go e [Zaino](https://github.com/zingolabs/zaino) in Rust. Entrambi leggono da un validatore completo, quindi vorrai anche [Zebra](/zcash-tech/zebra-full-node).

## Implicazioni pratiche

### Elenco dei server

La dashboard [hosh.zec.rocks](https://hosh.zec.rocks/zec) monitora i server pubblici e il loro stato di salute, ed è il luogo dove verificare cosa sia effettivamente attivo. [status.zec.rocks](https://status.zec.rocks/) mostra lo stato del servizio.

Server elencati su quella dashboard al momento della stesura:

| Server | Note |
|:--|:--|
| zec.rocks:443 | Gli endpoint regionali sono elencati accanto ad esso su na.zec.rocks, eu.zec.rocks, ap.zec.rocks e sa.zec.rocks |
| zec-node.cakewallet.com:443 | Sul dominio di Cake Wallet |
| zec.0xrpc.io:443 | Gestito da 0xRPC, che offre endpoint pubblici gratuiti per diverse catene e chiede donazioni per coprire la capacità |
| zaino.unsafe.zec.rocks:443 | Un'istanza Zaino. Nota il nome host, considerala sperimentale |
| testnet.zec.rocks:443 | Testnet, con un'istanza testnet Zaino elencata su zaino.testnet.unsafe.zec.rocks |

Controlla la dashboard invece di fidarti di questo elenco. Gli operatori arrivano e se ne vanno, e una pagina come questa invecchia.

### Cambiare il server nel tuo wallet

Vale la pena farlo se vuoi scegliere un operatore di cui ti fidi, distribuire l'attività tra operatori o puntare al tuo.

I percorsi di menu seguenti erano corretti quando questa pagina è stata aggiornata, ma le interfacce dei wallet cambiano, quindi considerali un suggerimento anziché un percorso esatto. Cerca Impostazioni avanzate o un'opzione del server.

#### ZODL

In precedenza Zashi. L'icona a ingranaggio nell'angolo in alto a destra, poi Impostazioni avanzate. Tor si trova nella stessa schermata. ZODL offre inoltre una scorciatoia Cambia server quando un errore di sincronizzazione è causato dal server non aggiornato.

#### Ywallet

L'icona a ingranaggio nell'angolo in alto a destra, poi la scheda Zcash.

![Impostazioni server Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Il menu hamburger nell'angolo in alto a sinistra, poi Impostazioni, quindi scorri verso il basso.

![Impostazioni server Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Il menu hamburger nell'angolo in alto a sinistra, poi Impostazioni, quindi Avanzate.

![Impostazioni server eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Questi screenshot sono stati acquisiti nel marzo 2025 e da allora le app hanno pubblicato nuove versioni, quindi i pulsanti potrebbero essere stati spostati.

## Errori comuni

**Pensare che il server possa leggere le tue transazioni**. Non può. Le tue chiavi restano sul tuo dispositivo e gli importi e i memo nelle transazioni completamente schermate rimangono crittografati — anche contro un avversario che abbia compromesso il server.

**Interpretare "schermato" come "connessione anonima"**. Le transazioni schermate proteggono ciò che avviene sulla blockchain. Il tuo indirizzo IP e la tempistica della tua attività costituiscono un livello separato, ed è proprio quel livello che il server vede.

**Presumere che Tor elimini ogni traccia**. Tor nasconde il tuo IP al server, ma non cambia ciò che il server apprende dalle richieste che effettui e aggiunge latenza alla sincronizzazione.

**Fidarsi di un elenco di server su una pagina wiki**. Gli operatori arrivano e se ne vanno. Controlla [hosh.zec.rocks](https://hosh.zec.rocks/zec) per sapere cosa è effettivamente in esecuzione prima di puntare il tuo wallet a qualunque cosa.

## Riepilogo

I wallet leggeri ti danno accesso al pool schermato senza richiedere spazio su disco, e questo è un buon compromesso. Basta essere chiari su cosa stai scambiando. Il server non può prendere i tuoi fondi né leggere i tuoi importi schermati, ma può facilmente vedere il tuo indirizzo IP e quando effettui transazioni. Instrada tramite Tor, scegli deliberatamente il tuo operatore oppure esegui il tuo.

## Pagine correlate

- [Chi può vedere il tuo pagamento Zcash](/start-here/who-can-see-your-zcash-payment) — una visione per principianti della stessa questione.
- [Cosa può vedere un esploratore di blocchi](/zcash-tech/what-a-block-explorer-can-see) — ciò che è visibile on-chain, anziché sul server.
- [Zaino](/zcash-tech/zaino) — diagrammi dell'architettura e il ruolo più ampio dell'indicizzatore Rust.
- [Nodo completo Zebra](/zcash-tech/zebra-full-node) — il validatore da cui legge un server per wallet leggero.
- [Sincronizzazione del wallet Zcash](/zcash-tech/zcash-wallet-syncing) — come il tuo wallet elabora i blocchi compatti inviati da un server.

**Ultimo aggiornamento:** agosto 2026

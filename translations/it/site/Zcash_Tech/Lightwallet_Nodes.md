---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nodi light wallet di Zcash

## Introduzione

La maggior parte delle persone usa Zcash tramite un light wallet, che non scarica l'intera blockchain. Invece comunica con un server che ha già svolto quel lavoro. Questa pagina spiega cosa sono questi server, cosa possono e non possono vedere su di te, come instradare la tua connessione tramite Tor e come cambiare il server che il tuo wallet usa.

Oggi due software servono i light wallet. **lightwalletd** è il servizio originale, scritto in Go. **Zaino** è un indicizzatore più recente scritto in Rust, sviluppato come parte del lavoro di deprecazione di zcashd.

## Cosa fa un server per light wallet

Un server per light wallet si colloca tra il tuo wallet e la blockchain di Zcash e gli fornisce una vista della catena efficiente in termini di larghezza di banda. Fa tre cose per te.

Serve blocchi compatti. Invece di blocchi completi, invia una forma compatta che contiene solo ciò di cui un wallet ha bisogno per rilevare un pagamento verso il suo indirizzo shielded, rilevare una spesa delle sue note e aggiornare i suoi witness.

Ritrasmette le tue transazioni. Quando invii, il tuo wallet consegna la transazione completata al server, che la trasmette alla rete.

Risponde alle interrogazioni sulla catena, come l'altezza corrente e le informazioni sulle fee di cui il tuo wallet ha bisogno.

Il tuo wallet continua comunque a fare localmente il lavoro privato. Conserva le tue chiavi, prova a decrittare i blocchi per trovare le tue note e costruisce e firma le transazioni sul tuo dispositivo.

## Cosa il server può e non può vedere

Questa è la parte in cui è facile sbagliarsi. Le tue chiavi non lasciano mai il tuo dispositivo, ma questo non equivale a dire che il server non apprenda nulla su di te.

Il riferimento qui è il [modello di minaccia dell'app wallet Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), che vale la pena leggere per intero se la cosa ti sta a cuore. Definisce diversi tipi di avversario. Quello che conta per questa pagina è un avversario che può osservare il traffico tra il tuo wallet e internet, e tra il server e internet. Chiunque gestisca il server si trova intrinsecamente in parte in questa posizione, perché il tuo wallet si connette direttamente a lui.

Partiamo da ciò che è protetto. Contro ogni avversario nel modello, incluso uno che ha compromesso il server, esso "can't learn any of the user's cryptographic key material (spending keys, viewing keys, seed phrase, etc.)", non può rubare i tuoi fondi e non può farti inviare fondi che non intendevi inviare. Gli importi e i memo all'interno di transazioni completamente shielded restano cifrati.

Poi c'è ciò che non è protetto. Il modello di minaccia elenca questi punti come debolezze note contro un avversario che osserva il traffico:

| Debolezza | Come |
|:--|:--|
| Capire chi sei | "The adversary knows the user's IP address, which could lead them to the user's real identity" |
| Capire approssimativamente dove ti trovi | Cercando il tuo IP "in a geolocation database to approximate their location" |
| Capire se e quando hai inviato o ricevuto una transazione shielded | L'invio "uses more bandwidth, which is visible even though the connection is encrypted". Il modello osserva che l'atto di inviare e ricevere è visibile al server stesso |
| Contare quante transazioni hai fatto nel tempo | Gli stessi schemi di larghezza di banda, osservati su un periodo più lungo |
| Individuare schemi di pagamento ricorrenti | Osservando quando avviene l'attività |
| Capire se un indirizzo è tuo | Un avversario che conosce già un indirizzo "could send funds to that address and watch to see if there are bandwidth spikes" dal tuo wallet mentre li recupera |

Il modello osserva anche che il caso ordinario presuppone "a trust relationship between the user and the lightwalletd server operator".

Quindi il riassunto onesto è questo. Un server per light wallet non può spendere il tuo denaro e non può leggere gli importi o i memo nelle tue transazioni shielded. Ciò che è ben posizionato ad apprendere è il tuo indirizzo IP e il momento della tua attività, e questi due elementi insieme possono dire molto su una persona. Le transazioni shielded proteggono ciò che finisce sulla blockchain. Non nascondono, da sole, la tua connessione al server.

## Instradamento tramite Tor

Tor interrompe il collegamento tra il tuo indirizzo IP e il traffico del tuo wallet, eliminando così l'identificatore più forte nella tabella sopra.

Il supporto esiste nelle librerie Rust su cui molti wallet Zcash si basano. zcash_client_backend include un modulo Tor basato su [Arti](https://tpo.pages.torproject.net/core/arti/), l'implementazione Rust di Tor, così un wallet può instradare sincronizzazione, trasmissione delle transazioni e recupero dei prezzi tramite Tor senza distribuire un client Tor separato.

Gli sviluppatori di Zaino sostengono lo stesso argomento, citando direttamente il modello di minaccia: esiste "a need to use anonymous transport protocols (such as Nym or Tor) to obfuscate clients' identities from Zcash's indexing servers".

In **ZODL**, Tor è un'impostazione nelle Advanced Settings. Le note di rilascio del wallet indirizzano gli utenti alla modalità di connessione manuale "plus enabling Tor in Advanced Settings" se "prefer to reduce metadata exposure", e l'app offre di attivare Tor prima di ripristinare un wallet, che è il momento in cui un IP nuovo verrebbe altrimenti collegato all'intera cronologia di un wallet.

Due avvertenze. Tor nasconde il tuo IP al server, ma non cambia ciò che il server apprende dalle richieste che fai. E l'onion routing aggiunge latenza, quindi la sincronizzazione richiede più tempo. Gestire il tuo server evita la questione della fiducia in un altro modo, perché in quel caso l'operatore sei tu.

## Zaino, l'indicizzatore Rust

[Zaino](/site/Zcash_Tech/Zaino) è un indicizzatore scritto in Rust dal team Zingo, sviluppato per sostituire lightwalletd come parte del lavoro di deprecazione di zcashd. Serve client leggeri, client completi ed explorer dei blocchi, leggendo i dati della catena conservati da "either a Zebra or Zcashd full validator".

È in sviluppo attivo, con la versione 0.7.0 rilasciata nell'agosto 2026. Punta a restare retrocompatibile con lightwalletd ove possibile, così i wallet possono puntarvi senza dover essere riscritti.

Zaino ha una propria pagina con diagrammi dell'architettura, quindi questa pagina copre solo il suo ruolo come server per light wallet.

## Elenco dei server

La dashboard [hosh.zec.rocks](https://hosh.zec.rocks/zec) tiene traccia dei server pubblici e del loro stato di salute, ed è il posto giusto per verificare cosa sia effettivamente online. [status.zec.rocks](https://status.zec.rocks/) mostra lo stato dei servizi.

Server elencati su quella dashboard al momento della scrittura:

| Server | Note |
|:--|:--|
| zec.rocks:443 | Gli endpoint regionali sono elencati accanto a esso: na.zec.rocks, eu.zec.rocks, ap.zec.rocks e sa.zec.rocks |
| zec-node.cakewallet.com:443 | Sul dominio di Cake Wallet |
| zec.0xrpc.io:443 | Gestito da 0xRPC, che offre endpoint pubblici gratuiti per diverse catene e chiede donazioni per coprire la capacità |
| zaino.unsafe.zec.rocks:443 | Un'istanza di Zaino. Nota il nome host, considerala sperimentale |
| testnet.zec.rocks:443 | Testnet, con un'istanza Zaino testnet elencata come zaino.testnet.unsafe.zec.rocks |

Controlla la dashboard invece di fidarti di questo elenco. Gli operatori vanno e vengono, e una pagina come questa invecchia.

## Cambiare il server nel tuo wallet

Vale la pena farlo se vuoi scegliere un operatore di cui ti fidi, distribuire l'attività tra operatori diversi o puntare al tuo server.

I percorsi di menu qui sotto erano corretti quando questa pagina è stata aggiornata, ma le interfacce dei wallet cambiano, quindi considerali come un'indicazione piuttosto che un percorso esatto. Cerca Advanced Settings o un'opzione server.

#### ZODL

Precedentemente Zashi. L'ingranaggio nell'angolo in alto a destra, poi Advanced Settings. Tor si trova nella stessa schermata. ZODL offre anche una scorciatoia Switch server quando un errore di sincronizzazione è causato dal fatto che il server non è aggiornato.

#### Ywallet

L'ingranaggio nell'angolo in alto a destra, poi la scheda Zcash.

![Impostazioni server di Ywallet](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Il menu hamburger nell'angolo in alto a sinistra, poi Settings, quindi scorri verso il basso.

![Impostazioni server di Zingo](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Il menu hamburger nell'angolo in alto a sinistra, poi Settings, poi Advanced.

![Impostazioni server di eZcash](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Questi screenshot sono stati scattati nel marzo 2025 e da allora le app hanno rilasciato nuove versioni, quindi i pulsanti potrebbero essersi spostati.

## Eseguire il proprio

L'opzione più forte è essere il proprio operatore, eliminando del tutto la questione della fiducia. Entrambi i server sono open source: [lightwalletd](https://github.com/zcash/lightwalletd) in Go e [Zaino](https://github.com/zingolabs/zaino) in Rust. Entrambi leggono da un validatore completo, quindi vorrai anche [Zebra](/site/Zcash_Tech/Zebra_Full_Node).

## Riepilogo

I light wallet ti danno accesso alla pool shielded senza richiedere spazio su disco, ed è un buon compromesso. Basta avere chiaro cosa stai scambiando. Il server non può prendere i tuoi fondi né leggere i tuoi importi shielded, ma è in una posizione ideale per vedere il tuo indirizzo IP e quando effettui transazioni. Instrada tramite Tor, scegli consapevolmente il tuo operatore oppure gestiscine uno tuo.

**Ultimo aggiornamento:** agosto 2026

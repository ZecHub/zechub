<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Perché la Privacy è Importante

Nell'era digitale, salvaguardare la tua [privacy](https://www.privacyguides.org/en/) è diventato sempre più fondamentale. Mentre alcuni potrebbero considerare la privacy una causa persa, non lo è. La tua privacy è in gioco e dovrebbe essere una tua preoccupazione. La privacy ha un valore significativo poiché è legata al potere, e garantire che tale potere venga esercitato in modo responsabile è cruciale.

## Tecnologie Tor & I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) è uno strumento proxy che utilizza la rete Tor per stabilire connessioni per le applicazioni. Torbot ottiene questo instradando il loro traffico attraverso Tor, migliorando così la [privacy e l'anonimato](https://www.torproject.org/) per queste applicazioni.

## Rete I2P

La rete I2P, nota anche come [Invisible Internet Project](https://geti2p.net/en/about/intro), è una rete overlay peer-to-peer completamente cifrata. Garantisce che il contenuto, l'origine e la destinazione dei messaggi siano nascosti agli osservatori. In altre parole, nessuno può vedere l'origine o la destinazione del traffico né il contenuto effettivo dei messaggi trasmessi. La cifratura usata in I2P garantisce un alto livello di privacy e anonimato per i suoi utenti.

## Tor e I2P condividono caratteristiche comuni ma hanno anche differenze significative. 

Sia Tor che I2P sono reti peer-to-peer decentralizzate e anonime, ma I2P offre livelli di sicurezza più elevati rispetto a Tor. Tuttavia, I2P è progettato principalmente per accedere a servizi come email, chat e torrenting all'interno della propria rete e non può essere usato per accedere alla normale internet. Tor, d'altra parte, permette agli utenti di accedere al deep web, proprio come I2P, ma funziona anche come un normale browser per accedere ai siti web del surface web.

*Nota: Per maggiori informazioni sulle somiglianze e le differenze tra Tor & I2P visita [qui](https://geti2p.net/en/comparison/tor)*

## Integrare Tor con Ywallet su Smartphone

Orbot è una rete privata virtuale (VPN) gratuita progettata per gli smartphone che indirizza il traffico di tutte le applicazioni del tuo dispositivo attraverso la rete Tor.

Segui queste istruzioni qui sotto per connettere Tor al wallet Zcash *(Ywallet)*:

1.  Scarica e installa *Orbot* dall'app store.

2.  Dopo l'installazione, apparirà un messaggio di benvenuto. Prosegui fino alla pagina principale di *Orbot* e clicca su *'Tor Enabled Apps'.*              

3. Questo aprirà una pagina sullo schermo che mostra le applicazioni compatibili con Tor. Cerca l'app *Ywallet* e assicurati che sia selezionata.

4. Apparirà una richiesta di connessione per configurare una VPN, che permetterà a *Orbot* di monitorare il traffico di rete. *Orbot* si inizializzerà una volta approvata questa autorizzazione. 

5. Controlla la barra delle applicazioni o la pagina principale di Orbot per verificare che Tor sia in esecuzione; questo è confermato quando vedi 'Connected to the Tor network'.

* Per il video tutorial guarda [qui](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Nota: Se Tor è bloccato dalla tua rete mobile, puoi usare un Bridge Server come modo alternativo per connetterti.*


## Come configurare un wallet Zcash con Torbot su PC/Desktop

## Supporto Tor in Zcash?

* Il browser Tor può essere scaricato dal sito ufficiale, puoi accedere al link [qui](https://www.torproject.org/download/).

 Il modo più comodo per installare Tor è tramite il Tor Browser Bundle. Se preferisci le installazioni headless, puoi optare per installare separatamente il daemon Tor. 

*Nota: Per impostazione predefinita, il Tor Browser bundle espone un listener SOCKS su tcp/9150 e il daemon Tor espone il listener SOCKS su tcp/9050.*

* Fai riferimento alle [istruzioni](https://support.torproject.org/apt/) di installazione specifiche per il tuo sistema operativo fornite dal Tor Project.

## Installare il wallet Zcashd

Zcashd è il wallet ufficiale full-node basato su linux che viene aggiornato e mantenuto dagli sviluppatori core della Electric Coin Co. È pensato per gli utenti che potrebbero voler effettuare mining e validare le transazioni zcash, oltre che inviare e ricevere Zcash.

* Il sito ufficiale per scaricare il wallet Zcashd si trova [qui](https://electriccoin.co/zcashd/) 

* Installa il wallet: Link al video tutorial [qui](https://www.youtube.com/watch?v=hTKL0jPu7X0) fornito dagli sviluppatori del wallet Zcash.

##  Eseguire Zcashd tramite Tor 

* Per configurare Zcashd in modo che usi il proxy SOCKS di Tor, puoi aggiungere l'argomento da riga di comando -proxy al comando del daemon.

 Per esempio:

  $ zcashd -proxy=127.0.0.1:9050
      
In alternativa, aggiungi la seguente riga al file zcash.conf:

  proxy=127.0.0.1:9050

Affinché le modifiche alla configurazione abbiano effetto, si consiglia di riavviare zcashd.

Nota che questo presuppone che venga usato il daemon Tor. Nel caso in cui si usi il Tor Browser Bundle, sostituisci 9050 con 9150.

Inoltre, puoi aggiungere l'argomento da riga di comando -listenonion per fare in modo che il daemon generi un indirizzo .onion al quale il tuo nodo può essere raggiunto.

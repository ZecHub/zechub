# PERCHÉ LA PRIVACY È IMPORTANTE

Nell'era digitale, salvaguardare la propria privacy è diventato sempre più vitale. Sebbene alcuni possano considerare la privacy come una causa persa, non è così. La vostra privacy è in gioco e dovrebbe essere una preoccupazione. La privacy ha un valore significativo in relazione al potere e garantire che il potere sia esercitato in modo responsabile è fondamentale.

## Tecnologie Tor e I2P

## Tor

[Tor](https://www.torproject.org/) è uno strumento proxy che utilizza la rete Tor per stabilire connessioni per le applicazioni. Torbot ottiene questo risultato instradando il loro traffico attraverso Tor, migliorando così la privacy e l'anonimato per queste applicazioni.

## Rete I2P

La rete I2P, nota anche come [Invisible Internet Project](https://geti2p.net/en/about/intro), è una rete overlay peer-to-peer completamente crittografata. Garantisce che il contenuto, la fonte e la destinazione dei messaggi siano nascosti agli osservatori. In altre parole, nessuno può vedere l'origine o la destinazione del traffico o il contenuto effettivo dei messaggi trasmessi. La crittografia utilizzata in I2P garantisce un elevato livello di privacy e anonimato per i suoi utenti.

## Tor e I2P hanno caratteristiche comuni ma anche differenze significative. 

Sia Tor che I2P sono reti peer-to-peer decentralizzate e anonime, ma I2P offre livelli di sicurezza più elevati rispetto a Tor. Tuttavia, I2P è progettato principalmente per accedere a servizi come e-mail, chat e torrenting all'interno della sua rete e non può essere utilizzato per accedere a Internet. D'altra parte, Tor consente agli utenti di accedere al deep web, proprio come I2P, ma funziona anche come un normale browser per accedere ai siti web del surface web.

*Nota: per ulteriori informazioni sulle somiglianze e le differenze tra Tor e I2P, visitare [vedi qui](https://geti2p.net/en/comparison/tor)*.

## Intergrazione di Tor con Ywallet su smartphone

Orbot è una rete privata virtuale (VPN) gratuita progettata per gli smartphone che indirizza il traffico di tutte le applicazioni sul dispositivo attraverso la rete Tor.

Seguite le seguenti istruzioni per collegare Tor al portafoglio Zcash *(Ywallet)*:

1.  Scaricate e installate *Orbot* dall'app store.

2.  Dopo l'installazione, apparirà un messaggio di benvenuto. Continuare a visitare la pagina iniziale di *Orbot* e cliccare su *'Tor Enabled Apps'.*              

3. In questo modo, sullo schermo apparirà una pagina che mostra le applicazioni compatibili con Tor. Cercare l'applicazione *Ywallet* e assicurarsi che sia selezionata.

4. Verrà visualizzata una richiesta di connessione per impostare una VPN, che consentirà a *Orbot* di monitorare il traffico di rete. *Orbot* si inizializzerà una volta approvata questa autorizzazione. 

5. Controllare la barra delle applicazioni o la homepage di Orbot per verificare che Tor sia in esecuzione; la conferma si ha quando si vede "Connected to the Tor network".

* Per il video tutorial vedere [qui](https://drive.google.com/file/d/12ODTLrjgSzYFeAOTrv-P9LvfBVOvrSXK/view?usp=sharing)

*Nota: se Tor è bloccato dalla rete mobile, è possibile utilizzare un Bridge Server come metodo alternativo di connessione.

![Scaricare Orbot](https://i.ibb.co/sbTLtGz/Download-Orbot.jpg/img)
![Messaggio di benvenuto](https://i.ibb.co/7t7FVHB/Welcome-message.jpg/img)
![OrbotHomePage](https://i.ibb.co/jkZDbq6/Orbotmainpage.jpg/img)
![YwalletinTor](https://i.ibb.co/CQK6fST/Zcashywallet.jpg/img)
![Richiesta di connessione](https://i.ibb.co/zX7WhWM/Connection-Request.jpg/img)
![Orbotisstarting](https://i.ibb.co/g4SrDWv/Orbotis-Starting.jpg/img)
![Connessione attiva traYwallet&Tor](https://i.ibb.co/2qRp0xh/Ywallet-Tor.jpg/img)
![Attivazione della connessione alla barra di comando](https://i.ibb.co/xDKFC7f/Activeconnection.jpg/img)
![Ponti](https://i.ibb.co/CM8GjbC/Bridges.jpg/img)

## Come configurare un portafoglio Zcash con Torbot su PC/Desktop

## Supporto Tor in Zcash?

* Il browser Tor può essere scaricato dal sito ufficiale; è possibile accedere al link [qui](https://www.torproject.org/download/).

 Il modo più semplice di installare Tor è attraverso il Tor Browser Bundle. Se si preferisce un'installazione senza testa, si può scegliere di installare il demone Tor separatamente. 

*Nota: per impostazione predefinita, Tor Browser Bundle espone un listener SOCKS su tcp/9150 e il demon Tor espone il listener SOCKS su tcp/9050.

* Fare riferimento alle [istruzioni di installazione](https://support.torproject.org/apt/) specifiche per il proprio sistema operativo, fornite dal Progetto Tor.

## Installare il portafoglio Zcashd

Zcashd è il portafoglio ufficiale full-node basato su Linux, aggiornato e mantenuto dagli sviluppatori di Electric coin Co. È destinato agli utenti che desiderano estrarre e convalidare transazioni in zcash, nonché inviare e ricevere zcash.

* Il sito ufficiale per scaricare Zcashd Wallet si trova [qui](https://electriccoin.co/zcashd/). 

* Installare il portafoglio: Link al video tutorial [qui](https://www.youtube.com/watch?v=hTKL0jPu7X0) fornito dagli sviluppatori del portafoglio Zcash.

## Eseguire Zcashd su Tor 

* Per configurare Zcashd in modo che utilizzi il proxy SOCKS di Tor, è possibile aggiungere l'argomento -proxy alla riga di comando del demon.

 Ad esempio:

  $ zcashd -proxy=127.0.0.1:9050
      
In alternativa, aggiungere la seguente riga al file zcash.conf:

  proxy=127.0.0.1:9050

Affinché le modifiche alla configurazione abbiano effetto, si consiglia di riavviare zcashd.

Si noti che questo presuppone l'utilizzo del demone Tor. Se si utilizza Tor Browser Bundle, sostituire 9050 con 9150.

Inoltre, è possibile aggiungere l'argomento della riga di comando -listenonion per far sì che il demone generi un indirizzo .onion al quale il proprio nodo possa essere raggiunto.
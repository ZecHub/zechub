<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Tor_and_I2P.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>


# Perché la privacy è importante

Nell'era digitale, proteggere la tua [privacy](https://www.privacyguides.org/en/) è diventato sempre più vitale. Anche se alcuni possono considerare la privacy una causa persa, non lo è. La tua privacy è in gioco e dovrebbe essere una preoccupazione. La privacy ha un valore significativo perché è legata al potere, ed è fondamentale garantire che quel potere venga esercitato in modo responsabile.

## Tecnologie Tor e I2P

## Tor

[Tor](https://www.privacyguides.org/en/tor/?h=tor) è uno strumento proxy che utilizza la rete Tor per stabilire connessioni per le applicazioni. Torbot lo ottiene instradando il loro traffico attraverso Tor, migliorando così la [privacy e l'anonimato](https://www.torproject.org/) di queste applicazioni.

## Rete I2P

La rete I2P, nota anche come [Invisible Internet Project](https://geti2p.net/en/about/intro), è una rete overlay peer-to-peer completamente crittografata. Garantisce che il contenuto, la fonte e la destinazione dei messaggi siano nascosti agli osservatori. In altre parole, nessuno può vedere l'origine o la destinazione del traffico né il contenuto effettivo dei messaggi trasmessi. La crittografia utilizzata in I2P garantisce un elevato livello di privacy e anonimato per i suoi utenti.

### Installare I2P

Esistono due implementazioni. La [Java I2P](https://geti2p.net/en/download) originale funziona su Windows, macOS, Linux e Android. [i2pd](https://i2pd.website/), scritto in C++, è più leggero ed è la scelta abituale su un server o su una macchina poco potente.

Una volta in esecuzione, I2P espone una console locale su `127.0.0.1:7657` e proxy su `127.0.0.1:4444` (HTTP) e `127.0.0.1:4447` (SOCKS). Aspettati che il primo avvio richieda diversi minuti: I2P deve costruire tunnel attraverso la rete prima che qualsiasi cosa funzioni, e diventa più veloce quanto più a lungo resta online.

### Usare I2P con Zcash

Tieni presente che **nessun nodo Zcash attuale supporta I2P in modo nativo.** Zebra non supporta I2P, e nemmeno zcashd lo supportava. Se vedi una guida che sostiene di far funzionare un nodo Zcash su I2P, sta descrivendo qualcosa che il software non fa.

Ciò per cui I2P è davvero utile qui è tutto ciò che ruota attorno al wallet: raggiungere un sito, un forum o un servizio senza rivelare il tuo indirizzo. Per anonimizzare la connessione del wallet stesso, Tor è oggi l'opzione pratica, e le sezioni seguenti lo trattano.

## Tor e I2P condividono caratteristiche comuni ma presentano anche differenze significative. 

Sia Tor che I2P sono reti peer-to-peer decentralizzate e anonime, ma I2P offre livelli di sicurezza più elevati rispetto a Tor. Tuttavia, I2P è progettata principalmente per accedere a servizi come email, chat e torrenting all'interno della sua rete e non può essere utilizzata per accedere a internet normale. Tor, invece, consente agli utenti di accedere al deep web, proprio come I2P, ma funziona anche come browser normale per accedere ai siti web del surface web.

*Nota: Per maggiori informazioni sulle somiglianze e differenze tra Tor e I2P visita [qui](https://geti2p.net/en/comparison/tor)*

## Instradare un wallet mobile attraverso Tor con Orbot

Orbot è una rete privata virtuale (VPN) gratuita progettata per smartphone che instrada il traffico di tutte le applicazioni sul tuo dispositivo attraverso la rete Tor.

Segui queste istruzioni per instradare un wallet Zcash attraverso Tor. Tieni presente che Ywallet, che veniva usato nelle versioni precedenti di questa guida, non è più mantenuto e non seguirà la rete dopo Ironwood, quindi scegli un wallet mantenuto dalla pagina [Wallet](/using-zcash/wallets).

1.  Scarica e installa *Orbot* dall'app store.

2.  Dopo l'installazione, apparirà un messaggio di benvenuto. Continua fino alla pagina principale di *Orbot* e clicca su *'Tor Enabled Apps'.*              

3. Questo farà comparire sullo schermo una pagina che mostra le applicazioni compatibili con Tor. Trova il tuo wallet Zcash nell'elenco e assicurati che sia selezionato.

4. Apparirà una richiesta di connessione per configurare una VPN, che consentirà a *Orbot* di monitorare il traffico di rete. *Orbot* si inizializzerà una volta approvato questo permesso. 

5. Controlla la barra delle applicazioni o la homepage di Orbot per verificare che Tor sia in esecuzione; questo è confermato quando vedi 'Connected to the Tor network'.

*Nota: Se Tor è bloccato dalla tua rete mobile, puoi usare un Bridge Server come modo alternativo per connetterti.*


## Installare Tor su PC o desktop

* Tor Browser può essere scaricato dal sito ufficiale, puoi accedere al link [qui](https://www.torproject.org/download/).

 Il modo più comodo per installare Tor è tramite il Tor Browser Bundle. Se preferisci installazioni headless, puoi scegliere di installare separatamente il demone Tor. 

*Nota: Per impostazione predefinita, il bundle Tor Browser espone un listener SOCKS su tcp/9150 e il demone Tor espone il listener SOCKS su tcp/9050.*

* Fai riferimento alle [istruzioni](https://support.torproject.org/apt/) di installazione specifiche per il tuo sistema operativo fornite dal Tor Project.

## Eseguire un nodo su Tor

Questa è la parte che è cambiata di più, e la risposta onesta è che al momento è più difficile di quanto non fosse prima.

**zcashd non esiste più.** Ha raggiunto la fine del supporto e si è fermato il 18 luglio 2026 al blocco 3,417,100. Non si riavvierà, la sua pagina di download restituisce un 404 e il repository apt non viene più distribuito. Qualsiasi istruzione che ti dica di eseguire `zcashd -proxy=127.0.0.1:9050` non si applica più a nulla.

**Nemmeno Zebra può ancora farlo.** Zebra è il nodo mantenuto, e il suo crate di rete contiene effettivamente codice per connessioni isolate tramite Tor, ma la funzionalità è commentata in `zebra-network/Cargo.toml`:

```
# tor = ["arti-client", "tor-rtcompat"]
```

La documentazione del crate dice la stessa cosa in modo esplicito: *"Tor connections are currently disabled until `arti-client`'s dependency `x25519-dalek v1.2.0` is updated."* Anche la funzione `connect_isolated_tor` è commentata insieme ad essa. Quindi oggi non esiste un modo supportato per eseguire un nodo Zcash su Tor.

Se ti serve subito anonimato a livello di nodo, l'approccio praticabile è mettere l'intera macchina dietro Tor o una VPN a livello di sistema operativo, invece di configurare il nodo stesso. Questo protegge la tua posizione di rete senza fare affidamento su funzionalità del nodo che non sono state implementate.

### Cosa puoi ancora fare oggi

- **Instradare il tuo wallet attraverso Tor** con Orbot su mobile, come descritto sopra. Questa è l'opzione pratica per la maggior parte delle persone e nasconde il tuo IP dal server lightwalletd con cui comunica il tuo wallet
- **Usare Tor Browser** per block explorer, forum e qualsiasi altra cosa per cui preferiresti non essere collegato tramite indirizzo
- **Ricorda cosa Tor non nasconde.** Anonimizza la tua posizione di rete, non la tua attività on-chain. Inviare da un indirizzo trasparente resta pubblico, e il valore che attraversa gli shielded pool pubblica comunque l'importo. Vedi [Shielded Pools](/using-zcash/shielded-pools) per capire cosa resta visibile

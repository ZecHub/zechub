<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Instradare il traffico del portafoglio Zcash attraverso la mixnet di Nym

> Ultima verifica: 29 settembre 2026

Le transazioni schermate di Zcash proteggono i dati delle transazioni on-chain, ma i portafogli continuano a comunicare attraverso internet. Gli osservatori della rete potrebbero potenzialmente venire a conoscere di metadati come il tuo indirizzo IP, quando il tuo portafoglio si connette e a quale infrastruttura si rivolge.

Nym aggiunge un livello separato di privacy per la rete. A partire da settembre 2026, l'approccio migliore dipende dal portafoglio:

1. **Quando esiste, preferisci l'integrazione nativa di Nym di un portafoglio.**
2. In caso contrario, usa la **modalità Mixnet di NymVPN a livello di sistema** così che il traffico di rete del portafoglio venga instradato attraverso Nym senza dipendere dal supporto proxy specifico del portafoglio.

Per una panoramica generale su VPN e dVPN, vedi [VPN e dVPN](../Privacy_Tools/VPN_and_DVPN.md).

## Cosa aggiunge Nym — e cosa no

Un pagamento schermato in Zcash e uno strumento di privacy della rete risolvono problemi diversi:

- **Le pool schermate di Zcash** proteggono i dettagli delle transazioni on-chain.
- **L'instradamento tramite la mixnet di Nym** è progettato per ridurre la collegabilità tra la tua identità di rete reale e il servizio che riceve il traffico del portafoglio.
- Una destinazione contattata attraverso un tunnel NymVPN a livello di sistema dovrebbe vedere un exit di Nym anziché il tuo IP di casa o mobile.

La mixnet di Nym utilizza più hop, il mescolamento dei pacchetti, ritardi casuali, traffico di copertura e crittografia a cipolla per ridurre la fuga di metadati di rete.

Nym **non** protegge contro un dispositivo compromesso, un software del portafoglio dannoso, frasi di recupero esposte, l'identità che riveli attraverso account di exchange o la perdita di privacy causata da attività trasparente di Zcash.

## Supporto nativo di Nym: usalo per primo quando disponibile

Nym ha annunciato il 24 settembre 2026 che il lavoro sul finanziamento di Zcash Community Grant è completo e che il supporto nativo per la mixnet arriva nei portafogli reali di Zcash.

### Portafoglio Zingo!

Zingo PC include un trasporto nativo di Nym. Anche Zingo Mobile offre la Mixnet Mode su iOS e Android tramite un proxy di Nym integrato nell'app.

Comportamento attuale documentato da Zingo:

- Il controllo Nym si trova in **Impostazioni → Nym Mixnet**.
- L'invio di un pagamento viene instradato attraverso la mixnet.
- Le trasmissioni di migrazione di Ironwood seguono lo stesso percorso di invio protetto.
- Anche le richieste di prezzo di ZEC vengono instradate attraverso la mixnet.
- L'invio si blocca in sicurezza mentre Nym è attivo: se il trasporto della mixnet non è disponibile, il pagamento non viene inviato silenziosamente in clearnet.
- **La sincronizzazione della chain attualmente non viene instradata attraverso la mixnet** in Zingo PC. Blocchi compatti, query di nullifier, recupero delle transazioni, traffico mempool e controlli dello stato dei server utilizzano ancora la normale connessione al server.

Questa distinzione è importante: l'integrazione nativa di Zingo protegge il percorso di trasmissione con il grado più alto di collegabilità, ma non è ancora un tunnel di rete per l'intero dispositivo.

Se il tuo modello di minaccia richiede anche di nascondere il traffico di sincronizzazione al server, usa un tunnel di privacy a livello di sistema come NymVPN, comprendendo inoltre la latenza e la complessità extra che questo introduce.

Fonti:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym segnala che **Zkool** ora supporta la connessione all'infrastruttura RPC di Zcash attraverso la mixnet di Nym tramite un interruttore nativo.

Zkool è il successore mantenuto attivamente di YWallet. Il suo progetto supporta anche il proxying tramite Tor e i servizi onion per le connessioni ai server di Zcash.

Preferisci l'opzione nativa di Zkool per Nym invece di cercare di forzare una build precedente di YWallet attraverso un percorso proxy non documentato.

Fonti:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

Anche NozyWallet dispone di percorsi di trasporto compatibili con Nym. La sua implementazione attuale supporta l'instradamento dell'invio delle transazioni in uscita attraverso la mixnet di Nym e un percorso dVPN separato di Nym per la sincronizzazione dei blocchi compatti. Considera queste due protezioni come distinte invece di presumere che ogni richiesta del portafoglio utilizzi automaticamente la mixnet.

Fonti:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl dispone attualmente della **Protezione Tor** integrata, non della stessa integrazione nativa di Nym descritta sopra per Zingo, Zkool e Nozy.

La funzione Tor di Zodl può instradare l'invio delle transazioni, il recupero dei dati delle transazioni, le richieste dei tassi di cambio e le chiamate API di terze parti attraverso Tor. Nym ha dichiarato il 24 settembre 2026 di essere ancora in contatto attivo con il team di Zodl riguardo a un'integrazione della mixnet più ampia.

Per Zodl oggi, usa una delle seguenti opzioni:

- la Protezione Tor documentata di Zodl, oppure
- NymVPN a livello di sistema, se il tuo obiettivo è instradare il traffico generale del dispositivo del portafoglio attraverso Nym.

Non dare per scontato che Tor e Nym siano trasporti intercambiabili all'interno del portafoglio solo perché entrambe sono reti per la privacy.

Impostazioni Tor di Zodl:

**Altro → Funzioni avanzate → Beta: Protezione Tor → Attiva → Salva le modifiche**

Fonti:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Soluzione di ripiego: NymVPN a livello di sistema

È l'opzione Nym più compatibile in generale, perché non richiede che il portafoglio comprenda le impostazioni proxy specifiche di Nym.

### 1. Installa NymVPN

Scarica NymVPN solo dal sito ufficiale di Nym o da uno store ufficiale della piattaforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN supporta Android, iOS, Linux, Windows e macOS.

### 2. Seleziona la modalità Mixnet

NymVPN offre la **Fast mode**, un percorso dVPN a 2 hop ottimizzato per una latenza inferiore, e la **Mixnet mode**, un percorso mixnet a 5 hop ottimizzato per una protezione dei metadati di rete più forte. Per le attività delicate del portafoglio, seleziona la Mixnet mode e attendi che il client segnali che la connessione è stata stabilita prima di aprire o aggiornare il portafoglio.

### 3. Lascia il portafoglio sulle impostazioni di rete normali

Quando il sistema operativo sta già instradando il traffico attraverso NymVPN, la maggior parte dei portafogli non ha bisogno di impostazioni proxy personalizzate.

Apri il portafoglio normalmente e lascialo sincronizzare.

Se NymVPN offre lo split tunneling sulla tua piattaforma, verifica che il portafoglio sia **incluso nel tunnel protetto**, non inserito in un elenco di bypass o esclusione.

### 4. Verifica il tunnel prima di usare il portafoglio

Un semplice controllo a livello di sistema:

1. Disconnetti NymVPN.
2. Visita un servizio pubblico di controllo dell'IP, oppure su desktop esegui:

   ```bash
   curl https://api.ipify.org
   ```

3. Annota l'IP visibile.
4. Connetti NymVPN in modalità Mixnet.
5. Ripeti il controllo.

L'indirizzo IP pubblico visibile dovrebbe cambiare.

Questo conferma il tunnel di sistema. **Non** dimostra che ogni richiesta fatta da un determinato portafoglio segua lo stesso percorso se l'app o il sistema operativo ha regole di instradamento particolari.

Per una maggiore sicurezza su desktop:

- esamina il processo del portafoglio con il monitor di rete del sistema operativo,
- verifica che non ci sia un'esclusione dallo split tunneling,
- conferma che il comportamento previsto del portafoglio cambi se NymVPN è disconnesso.

Non pubblicare screenshot contenenti indirizzi del portafoglio, saldi, ID delle transazioni, indirizzi IP o materiale di recupero durante la risoluzione dei problemi.

## Modalità proxy dApp / portafoglio di NymVPN

NymVPN espone anche una modalità proxy per app e portafogli che utilizza l'instradamento SOCKS5 / RPC attraverso la mixnet.

La documentazione pubblica di configurazione di Nym lo dimostra principalmente con una configurazione RPC in stile Ethereum. È utile per i software che supportano esplicitamente un percorso proxy/RPC generico compatibile, ma **non** si deve dare per scontato che funzioni con ogni portafoglio di Zcash.

Usa questo percorso solo quando la documentazione del portafoglio stesso conferma il supporto di un proxy o RPC compatibile.

In caso contrario, preferisci:

- l'integrazione nativa di Nym del portafoglio, oppure
- NymVPN a livello di sistema.

## Compromessi tra prestazioni e timeout

Le mixnet accettano deliberatamente una minore velocità in cambio di una protezione dei metadati più forte.

Aspettati un possibile impatto su:

- la sincronizzazione iniziale del portafoglio,
- le sincronizzazioni di recupero di grandi dimensioni,
- le query della cronologia delle transazioni,
- i timeout RPC,
- le chiamate API di terze parti.

Indicazioni pratiche:

- Inizia con le impostazioni predefinite di Nym.
- Aspettati che la prima sincronizzazione o una sincronizzazione di recupero lunga richieda più tempo.
- Riprova in caso di timeout prima di indebolire le impostazioni di privacy.
- Evita di passare ripetutamente da una modalità di privacy all'altra subito prima di una transazione delicata.
- Se usi un percorso più veloce per la sincronizzazione in blocco, tieni presente che le infrastrutture contattate potrebbero osservare la tua identità di rete reale durante quel periodo.
- Per Zingo PC in particolare, ricorda che il suo trasporto nativo di Nym attualmente protegge gli invii e la ricerca dei prezzi, mentre la sincronizzazione resta diretta.

## Considerazioni su mobile

Su Android e iOS, lo slot VPN del sistema operativo è di solito il modo più semplice per instradare il traffico generale del portafoglio attraverso NymVPN: connetti prima NymVPN, poi apri il portafoglio.

Se un'altra VPN, un firewall o un bloccatore di pubblicità locale basato su VPN occupa già l'interfaccia VPN di sistema, i due prodotti potrebbero non riuscire a funzionare simultaneamente. Verifica lo stato VPN del sistema operativo prima di dare per scontato che il portafoglio sia protetto.

## Elenco di controllo del modello di minaccia

Prima di fare affidamento su questa configurazione, chiediti:

- Sto usando indirizzi schermati di Zcash dove opportuno?
- Il mio portafoglio ha il supporto nativo di Nym?
- In tal caso, quale traffico protegge esattamente quell'integrazione nativa?
- Se ho bisogno di una copertura più ampia, NymVPN è connesso prima che il portafoglio inizi l'attività di rete?
- Il portafoglio è escluso da una regola di split tunneling?
- Sto facendo affidamento su una modalità proxy che il portafoglio documenta effettivamente?
- Sto rivelando la mia identità attraverso un exchange, una sessione del browser, un'API di terze parti o un indirizzo trasparente?
- Sono pronto a una sincronizzazione più lenta e a timeout occasionali?

## Fonti

- Nym: la mixnet di Nym ora attiva nei portafogli di Zcash, 24 settembre 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamento Nym di Zingo PC: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Trasporto Nym di Zingo Mobile: https://github.com/zingolabs/zingo-mobile
- Repository di Zkool: https://github.com/hhanh00/zkool2
- Lavoro sul trasporto Nym di NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Protezione Tor di Zodl: https://support.zodl.com/article/17-enabling-tor-protection

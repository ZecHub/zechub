<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Page"/>
</a>

# Instrada il traffico del portafoglio di Zcash attraverso la mixnet di Nym

> Ultima verifica: 29 settembre 2026

Le transazioni schermate di Zcash proteggono i dati delle transazioni on-chain, ma i portafogli comunicano ancora via internet. Gli osservatori della rete possono potenzialmente apprendere metadati quali il tuo indirizzo IP, quando il tuo portafoglio si connette e quale infrastruttura contatta.

Nym aggiunge un livello separato di privacy della rete. A settembre 2026, l'approccio migliore dipende dal portafoglio:

1. **Preferisci l'integrazione nativa di Nym del portafoglio quando è disponibile.**
2. Altrimenti, usa la **modalità Mixnet di NymVPN a livello di sistema** affinché il traffico di rete del portafoglio sia instradato attraverso Nym senza dipendere dal supporto proxy specifico del portafoglio.

Per informazioni generali su VPN e dVPN, consulta [VPN e dVPN](./VPN_and_DVPN.md).

## Cosa aggiunge Nym — e cosa non aggiunge

Un pagamento schermato di Zcash e uno strumento per la privacy della rete risolvono problemi diversi:

- **Le pool schermate di Zcash** proteggono i dettagli delle transazioni on-chain.
- **L'instradamento mixnet di Nym** è progettato per ridurre la collegabilità tra la tua vera identità di rete e il servizio che riceve il traffico del portafoglio.
- Una destinazione contattata tramite un tunnel di NymVPN a livello di sistema dovrebbe vedere un'uscita di Nym anziché il tuo IP domestico/mobile.

La mixnet di Nym utilizza più hop, mescolamento dei pacchetti, ritardi casuali, traffico di copertura e crittografia onion per ridurre la fuga di metadati di rete.

Nym **non** protegge da un dispositivo compromesso, software di portafoglio dannoso, frasi di recupero esposte, identità che riveli tramite account di exchange o perdita di privacy causata da attività trasparente di Zcash.

## Supporto nativo di Nym: usalo prima quando disponibile

Il 24 settembre 2026, Nym ha annunciato che il suo lavoro di finanziamento della community di Zcash è completo e che il supporto nativo della mixnet è in distribuzione nei portafogli reali di Zcash.

### Portafoglio Zingo!

Zingo PC include un trasporto nativo di Nym. Zingo Mobile include anche la modalità Mixnet su iOS e Android tramite un proxy Nym integrato nell'app.

Comportamento attuale documentato da Zingo:

- Il controllo Nym si trova in **Impostazioni → Mixnet Nym**.
- L'invio di un pagamento viene instradato attraverso la mixnet.
- Le trasmissioni di migrazione Ironwood seguono lo stesso percorso di invio protetto.
- Anche le richieste di prezzo ZEC vengono instradate attraverso la mixnet.
- L'invio si interrompe in modo sicuro mentre Nym è abilitato: se il trasporto mixnet non è disponibile, il pagamento non viene inviato silenziosamente sulla clearnet.
- **La sincronizzazione della chain non è attualmente instradata attraverso la mixnet** in Zingo PC. I blocchi compatti, le query dei nullifier, il recupero delle transazioni, il traffico mempool e i controlli dello stato del server utilizzano ancora la normale connessione al server.

Questa distinzione è importante: l'integrazione nativa di Zingo protegge il percorso di trasmissione con la maggiore collegabilità, ma non è ancora un tunnel di rete per l'intero dispositivo.

Se il tuo modello di minaccia richiede anche di nascondere il traffico di sincronizzazione al server, usa un tunnel per la privacy a livello di sistema come NymVPN, comprendendo anche la latenza e la complessità aggiuntive che questo introduce.

Fonti:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym segnala che **Zkool** ora supporta la connessione all'infrastruttura RPC di Zcash tramite la mixnet di Nym usando un'opzione nativa.

Zkool è il successore gestito attivamente di YWallet. Il suo progetto supporta anche il proxy di Tor e i servizi onion per le connessioni al server di Zcash.

Preferisci l'opzione nativa di Zkool Nym invece di tentare di forzare una vecchia build di YWallet attraverso un percorso proxy non documentato.

Fonti:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet dispone anche di percorsi di trasporto compatibili con Nym. La sua implementazione attuale supporta l'instradamento dell'invio delle transazioni in uscita attraverso la mixnet di Nym e un percorso dVPN separato di Nym per la sincronizzazione dei blocchi compatti. Considerali protezioni distinte anziché presumere che ogni richiesta del portafoglio utilizzi automaticamente la mixnet.

Fonti:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl dispone attualmente della **protezione Tor** integrata, non della stessa integrazione nativa di Nym descritta sopra per Zingo, Zkool e Nozy.

La funzione Tor di Zodl può instradare l'invio delle transazioni, il recupero dei dati delle transazioni, le richieste di tasso di cambio e le chiamate API di terze parti attraverso Tor. Il 24 settembre 2026, Nym ha dichiarato di essere ancora in dialogo attivo con il team di Zodl riguardo a un'integrazione mixnet più ampia.

Per Zodl oggi, usa uno dei seguenti:

- La protezione Tor documentata di Zodl, oppure
- NymVPN a livello di sistema, se il tuo obiettivo è instradare il traffico generale del dispositivo del portafoglio attraverso Nym.

Non presumere che Tor e Nym siano trasporti intercambiabili all'interno del portafoglio solo perché entrambe sono reti per la privacy.

Impostazioni Zodl di Tor:

**Altro → Funzioni avanzate → Beta: protezione Tor → Abilita → Salva modifiche**

Fonti:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN a livello di sistema

Questa è l'opzione Nym più ampiamente compatibile perché non richiede che il portafoglio comprenda impostazioni proxy specifiche di Nym.

### 1. Installa NymVPN

Scarica NymVPN solo dal sito web ufficiale di Nym o da uno store ufficiale della piattaforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN supporta Android, iOS, Linux, Windows e macOS.

### 2. Seleziona la modalità Mixnet

NymVPN offre la **modalità rapida**, un percorso dVPN a 2 hop ottimizzato per una latenza inferiore, e la **modalità Mixnet**, un percorso mixnet a 5 hop ottimizzato per una protezione più forte dei metadati di rete. Per attività sensibili del portafoglio, seleziona la modalità Mixnet e attendi che il client segnali che la connessione è stabilita prima di aprire o aggiornare il portafoglio.

### 3. Lascia il portafoglio con le normali impostazioni di rete

Quando il sistema operativo sta già instradando il traffico tramite un tunnel di NymVPN, la maggior parte dei portafogli non richiede impostazioni proxy personalizzate.

Apri normalmente il portafoglio e consentigli di sincronizzarsi.

Se NymVPN offre il tunneling selettivo sulla tua piattaforma, conferma che il portafoglio sia **incluso nel tunnel protetto**, non inserito in un elenco di bypass o esclusione.

### 4. Verifica il tunnel prima di usare il portafoglio

Un semplice controllo a livello di sistema:

1. Disconnetti NymVPN.
2. Visita un servizio pubblico di controllo IP oppure, su desktop, esegui:

   ```bash
   curl https://api.ipify.org
   ```

3. Registra l'IP visibile.
4. Connetti NymVPN in modalità Mixnet.
5. Ripeti il controllo.

L'IP pubblico visibile dovrebbe cambiare.

Questo conferma il tunnel di sistema. **Non** dimostra che ogni richiesta effettuata da uno specifico portafoglio segua lo stesso percorso se l'app o il sistema operativo dispone di regole di instradamento speciali.

Per maggiore certezza su desktop:

- Ispeziona il processo del portafoglio con il monitor di rete del sistema operativo,
- Verifica che non vi sia un'esclusione dal tunneling selettivo,
- Conferma che il comportamento previsto del portafoglio cambi se NymVPN viene disconnesso.

Non pubblicare screenshot contenenti indirizzi del portafoglio, saldi, ID delle transazioni, indirizzi IP o materiale di recupero durante la risoluzione dei problemi.

## Modalità proxy dApp / portafoglio di NymVPN

NymVPN offre anche una modalità proxy per app e portafogli che utilizza l'instradamento SOCKS5 / RPC attraverso la mixnet.

La documentazione pubblica di configurazione di Nym illustra questo principalmente con una configurazione RPC in stile Ethereum. È utile per software che supporta esplicitamente un percorso proxy/RPC generico compatibile, ma **non** si deve presumere che funzioni con ogni portafoglio di Zcash.

Usa questo percorso solo quando la documentazione del portafoglio stesso conferma il supporto proxy o RPC compatibile.

Altrimenti, preferisci:

- L'integrazione nativa di Nym del portafoglio, oppure
- NymVPN a livello di sistema.

## Compromessi relativi a prestazioni e timeout

Le mixnet sacrificano intenzionalmente la velocità in cambio di una protezione più forte dei metadati.

Aspettati possibili conseguenze su:

- Sincronizzazione iniziale del portafoglio,
- Sincronizzazioni di recupero di grandi dimensioni,
- Query della cronologia delle transazioni,
- Timeout RPC,
- Chiamate API di terze parti.

Indicazioni pratiche:

- Inizia con le impostazioni predefinite di Nym.
- Aspettati che la prima sincronizzazione o una lunga sincronizzazione di recupero richieda più tempo.
- Riprova dopo un timeout prima di ridurre le impostazioni sulla privacy.
- Evita di cambiare ripetutamente modalità di privacy immediatamente prima di una transazione sensibile.
- Se utilizzi un percorso più veloce per la sincronizzazione in massa, comprendi che l'infrastruttura contattata può osservare la tua vera identità di rete durante quel periodo.
- Per Zingo PC in particolare, ricorda che il suo trasporto nativo di Nym protegge attualmente gli invii e la ricerca dei prezzi, mentre la sincronizzazione rimane diretta.

## Considerazioni per dispositivi mobili

Su Android e iOS, lo slot VPN del sistema operativo è di solito il modo più semplice per instradare il traffico generale del portafoglio attraverso NymVPN: connetti prima NymVPN, quindi apri il portafoglio.

Se un'altra VPN, firewall o blocco pubblicità basato su VPN locale occupa già l'interfaccia VPN di sistema, i due prodotti potrebbero non essere in grado di funzionare contemporaneamente. Conferma lo stato VPN del sistema operativo prima di presumere che il portafoglio sia protetto.

## Checklist del modello di minaccia

Prima di fare affidamento sulla configurazione, chiediti:

- Sto usando indirizzi Zcash schermati dove appropriato?
- Il mio portafoglio dispone di supporto nativo per Nym?
- In tal caso, quale traffico protegge esattamente tale integrazione nativa?
- Se ho bisogno di una copertura più ampia, NymVPN è connesso prima che il portafoglio avvii l'attività di rete?
- Il portafoglio è escluso da una regola di tunneling selettivo?
- Mi sto affidando a una modalità proxy che il portafoglio documenta effettivamente?
- Sto rivelando la mia identità tramite un exchange, una sessione del browser, un'API di terze parti o un indirizzo trasparente?
- Sono preparato a una sincronizzazione più lenta e timeout occasionali?

## Fonti

- Nym: la mixnet di Nym è ora attiva nei portafogli di Zcash, 24 settembre 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamento di Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Trasporto Nym di Zingo Mobile: https://github.com/zingolabs/zingo-mobile
- Repository di Zkool: https://github.com/hhanh00/zkool2
- Lavoro sul trasporto Nym di NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Protezione Tor di Zodl: https://support.zodl.com/article/17-enabling-tor-protection

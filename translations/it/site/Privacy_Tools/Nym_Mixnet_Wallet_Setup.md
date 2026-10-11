<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Instrada il traffico del wallet Zcash attraverso la mixnet Nym

> Ultima verifica: 29 settembre 2026

Le transazioni schermate Zcash proteggono i dati delle transazioni on-chain, ma i wallet comunicano comunque tramite Internet. Gli osservatori della rete possono potenzialmente apprendere metadati come il tuo indirizzo IP, quando il tuo wallet si connette e quali infrastrutture contatta.

Nym aggiunge un livello distinto di privacy della rete. A settembre 2026, l'approccio migliore dipende dal wallet:

1. **Preferisci l'integrazione Nym nativa di un wallet, quando disponibile.**
2. In alternativa, utilizza la **modalità Mixnet NymVPN a livello di sistema** affinché il traffico di rete del wallet venga instradato attraverso Nym senza dipendere dal supporto proxy specifico del wallet.

Per informazioni generali su VPN e dVPN, consulta [VPN e dVPN](./VPN_and_DVPN.md).

## Cosa aggiunge Nym — e cosa non fa

Un pagamento schermato Zcash e uno strumento per la privacy della rete risolvono problemi diversi:

- I **pool schermati Zcash** proteggono i dettagli delle transazioni on-chain.
- L'**instradamento tramite mixnet Nym** è progettato per ridurre la collegabilità tra la tua reale identità di rete e il servizio che riceve il traffico del wallet.
- Una destinazione contattata attraverso un tunnel NymVPN a livello di sistema dovrebbe vedere un'uscita Nym anziché il tuo IP domestico/mobile.

La mixnet di Nym utilizza più hop, mescolamento dei pacchetti, ritardi casuali, traffico di copertura e crittografia onion per ridurre la perdita di metadati della rete.

Nym **non** protegge da un dispositivo compromesso, software wallet malevolo, frasi di recupero esposte, identità rivelata tramite account di exchange o perdita di privacy causata da attività Zcash trasparente.

## Supporto Nym nativo: usalo prima quando disponibile

Il 24 settembre 2026 Nym ha annunciato che il suo lavoro di Community Grant Zcash è completato e che il supporto nativo della mixnet viene distribuito nei wallet Zcash reali.

### Wallet Zingo!

Zingo PC include un trasporto Nym nativo. Anche Zingo Mobile offre la modalità Mixnet su iOS e Android utilizzando un proxy Nym integrato nell'app.

Comportamento attuale documentato da Zingo:

- Il controllo Nym si trova in **Impostazioni → Nym Mixnet**.
- L'invio di un pagamento viene instradato attraverso la mixnet.
- Le trasmissioni di migrazione Ironwood seguono lo stesso percorso di invio protetto.
- Anche le richieste di prezzo ZEC vengono instradate attraverso la mixnet.
- L'invio fallisce in modo sicuro mentre Nym è abilitato: se il trasporto mixnet non è disponibile, il pagamento non viene inviato silenziosamente tramite clearnet.
- **La sincronizzazione della chain non viene attualmente instradata attraverso la mixnet** in Zingo PC. I blocchi compatti, le query dei nullifier, i recuperi delle transazioni, il traffico mempool e i controlli sullo stato del server usano ancora la normale connessione al server.

Questa distinzione è importante: l'integrazione nativa di Zingo protegge il percorso di trasmissione con maggiore collegabilità, ma non è ancora un tunnel di rete per l'intero dispositivo.

Se il tuo modello di minaccia richiede anche di nascondere il traffico di sincronizzazione al server, utilizza un tunnel per la privacy a livello di sistema come NymVPN, tenendo conto della latenza e della complessità aggiuntive che questo introduce.

Fonti:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym riporta che **Zkool** ora supporta la connessione all'infrastruttura RPC Zcash attraverso la mixnet Nym utilizzando un interruttore nativo.

Zkool è il successore mantenuto attivamente di YWallet. Il suo progetto supporta inoltre il proxy Tor e i servizi onion per le connessioni al server Zcash.

Preferisci l'opzione Nym nativa di Zkool anziché tentare di forzare una vecchia build di YWallet attraverso un percorso proxy non documentato.

Fonti:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

Anche NozyWallet dispone di percorsi di trasporto compatibili con Nym. La sua implementazione attuale supporta l'instradamento dell'invio di transazioni in uscita attraverso la mixnet Nym e un percorso dVPN Nym separato per la sincronizzazione dei blocchi compatti. Considerali protezioni distinte, anziché presumere che ogni richiesta del wallet utilizzi automaticamente la mixnet.

Fonti:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### ZODL

ZODL dispone attualmente di **Tor Protection** integrata, non della stessa integrazione Nym nativa descritta sopra per Zingo, Zkool e Nozy.

La funzionalità Tor di ZODL può instradare tramite Tor l'invio delle transazioni, il recupero dei dati delle transazioni, le richieste dei tassi di cambio e le chiamate API di terze parti. Il 24 settembre 2026, Nym ha dichiarato di essere ancora in discussione attiva con il team di ZODL riguardo a un'integrazione più ampia della mixnet.

Per ZODL, oggi utilizza una delle seguenti opzioni:

- La Tor Protection documentata di ZODL; oppure
- NymVPN a livello di sistema, se il tuo obiettivo è instradare attraverso Nym il traffico generale del dispositivo del wallet.

Non presumere che Tor e Nym siano trasporti intercambiabili all'interno del wallet solo perché entrambi sono reti per la privacy.

Impostazioni Tor di ZODL:

**Altro → Funzionalità avanzate → Beta: Tor Protection → Abilita → Salva modifiche**

Fonti:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN a livello di sistema

Questa è l'opzione Nym con la compatibilità più ampia perché non richiede che il wallet comprenda impostazioni proxy specifiche per Nym.

### 1. Installa NymVPN

Scarica NymVPN solo dal sito web ufficiale di Nym o da uno store ufficiale della piattaforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN supporta Android, iOS, Linux, Windows e macOS.

### 2. Seleziona la modalità Mixnet

NymVPN offre la **modalità Fast**, un percorso dVPN a 2 hop ottimizzato per una latenza inferiore, e la **modalità Mixnet**, un percorso mixnet a 5 hop ottimizzato per una protezione più forte dei metadati della rete. Per attività sensibili del wallet, seleziona la modalità Mixnet e attendi che il client segnali che la connessione è stabilita prima di aprire o aggiornare il wallet.

### 3. Lascia il wallet sulle normali impostazioni di rete

Quando il sistema operativo sta già instradando il traffico tramite tunnel attraverso NymVPN, la maggior parte dei wallet non richiede impostazioni proxy personalizzate.

Apri normalmente il wallet e consentigli di sincronizzarsi.

Se NymVPN offre lo split tunneling sulla tua piattaforma, verifica che il wallet sia **incluso nel tunnel protetto**, non inserito in un elenco di bypass o esclusioni.

### 4. Verifica il tunnel prima di usare il wallet

Un semplice controllo a livello di sistema:

1. Disconnetti NymVPN.
2. Visita un servizio pubblico di controllo dell'IP oppure, su desktop, esegui:

   ```bash
   curl https://api.ipify.org
   ```

3. Annota l'IP visibile.
4. Connetti NymVPN in modalità Mixnet.
5. Ripeti il controllo.

L'IP pubblico visibile dovrebbe cambiare.

Questo conferma il tunnel di sistema. **Non** dimostra che ogni richiesta effettuata da un wallet specifico segua lo stesso percorso se l'app o il sistema operativo dispone di regole di instradamento speciali.

Per maggiore certezza su desktop:

- ispeziona il processo del wallet con il monitor di rete del sistema operativo;
- verifica che non vi siano esclusioni tramite split tunneling;
- conferma che il comportamento previsto del wallet cambi se NymVPN viene disconnesso.

Durante la risoluzione dei problemi, non pubblicare screenshot contenenti indirizzi del wallet, saldi, ID delle transazioni, indirizzi IP o materiale di recupero.

## Modalità proxy dApp / wallet NymVPN

NymVPN offre anche una modalità proxy per app e wallet che utilizza l'instradamento SOCKS5 / RPC attraverso la mixnet.

La documentazione pubblica di configurazione di Nym mostra questo principalmente con configurazioni RPC in stile Ethereum. È utile per software che supporta esplicitamente un percorso generico compatibile proxy/RPC, ma non si deve presumere che funzioni con ogni wallet Zcash.

Utilizza questo percorso solo quando la documentazione del wallet conferma il supporto proxy o RPC compatibile.

Altrimenti, preferisci:

- l'integrazione Nym nativa del wallet; oppure
- NymVPN a livello di sistema.

## Compromessi tra prestazioni e timeout

Le mixnet scambiano intenzionalmente velocità con una protezione più forte dei metadati.

Aspettati possibili effetti su:

- sincronizzazione iniziale del wallet;
- grandi sincronizzazioni di recupero;
- query della cronologia delle transazioni;
- timeout RPC;
- chiamate API di terze parti.

Indicazioni pratiche:

- Inizia con le impostazioni Nym predefinite.
- Aspettati che la prima sincronizzazione o una lunga sincronizzazione di recupero richieda più tempo.
- Riprova dopo un timeout prima di indebolire le impostazioni sulla privacy.
- Evita di cambiare ripetutamente le modalità di privacy immediatamente prima di una transazione sensibile.
- Se utilizzi un percorso più rapido per la sincronizzazione di grandi quantità di dati, tieni presente che l'infrastruttura contattata potrebbe osservare la tua reale identità di rete durante quel periodo.
- Per Zingo PC in particolare, ricorda che il suo trasporto Nym nativo protegge attualmente gli invii e la ricerca dei prezzi, mentre la sincronizzazione rimane diretta.

## Considerazioni sui dispositivi mobili

Su Android e iOS, lo slot VPN del sistema operativo è di solito il modo più semplice per instradare il traffico generale del wallet attraverso NymVPN: connetti prima NymVPN, poi apri il wallet.

Se un'altra VPN, firewall o blocco pubblicità basato su VPN locale occupa già l'interfaccia VPN di sistema, i due prodotti potrebbero non poter funzionare simultaneamente. Conferma lo stato VPN del sistema operativo prima di presumere che il wallet sia protetto.

## Checklist del modello di minaccia

Prima di fare affidamento sulla configurazione, chiediti:

- Sto utilizzando indirizzi Zcash schermati dove appropriato?
- Il mio wallet supporta Nym nativamente?
- Se sì, quale traffico protegge esattamente quell'integrazione nativa?
- Se mi serve una copertura più ampia, NymVPN è connesso prima che il wallet inizi l'attività di rete?
- Il wallet è escluso da una regola di split tunneling?
- Mi sto affidando a una modalità proxy che il wallet documenta effettivamente?
- Sto rivelando la mia identità tramite un exchange, una sessione del browser, un'API di terze parti o un indirizzo trasparente?
- Sono preparato a sincronizzazioni più lente e timeout occasionali?

## Fonti

- Nym: la mixnet Nym è ora attiva nei wallet Zcash, 24 settembre 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamento Nym di Zingo PC: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Trasporto Nym Mobile di Zingo: https://github.com/zingolabs/zingo-mobile
- Repository di Zkool: https://github.com/hhanh00/zkool2
- Lavoro sul trasporto Nym di NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Tor Protection di ZODL: https://support.zodl.com/article/17-enabling-tor-protection

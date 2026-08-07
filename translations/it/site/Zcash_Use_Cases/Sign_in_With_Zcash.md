---
# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Accedi con Zcash

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Intermedio - 7 min</span>

## TL;DR

- Accedi dimostrando di controllare un indirizzo Zcash, invece di usare una password
- Sono in uso due approcci: **firmare una challenge**, oppure **inviare un pagamento shielded con un codice nel memo**
- Poiché gli indirizzi shielded nascondono saldo e cronologia, dimostrare il controllo non espone le tue finanze
- Questo modello è ancora agli inizi. Non esiste ancora uno standard ratificato e le implementazioni non sono interoperabili

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> A chi è rivolto?

- Sviluppatori che vogliono un accesso senza password senza raccogliere dati personali
- Utenti che preferiscono non consegnare il proprio indirizzo email a ogni sito
- Chiunque voglia accedere senza collegare la propria cronologia finanziaria a un account

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Il problema

La maggior parte delle opzioni di accesso fa trapelare qualcosa:

- **Password ed email** creano un account legato alla tua identità, ed entrambe finiscono nei dump delle violazioni
- **Accesso tramite social** comunica al provider di identità ogni luogo in cui accedi e quando lo fai
- **Accesso con wallet su chain trasparenti** è peggio di quanto sembri. Collegare un wallet può consegnare al sito il tuo intero saldo e la tua cronologia delle transazioni, in modo permanente

Di solito stai scegliendo tra comodità e divulgazione dei dati.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Perché Zcash?

Zcash separa il *dimostrare il controllo* dal *rivelare le finanze*:

- **Gli indirizzi shielded** mantengono privati saldi e cronologia delle transazioni, quindi dimostrare di possederne uno non dice nulla su ciò che possiedi
- **I memo crittografati** possono trasportare privatamente un codice di accesso monouso all'interno di una transazione
- **Le viewing key** consentono una divulgazione selettiva, così un'app può ricevere accesso in lettura esattamente a ciò di cui ha bisogno e a nulla di più

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Come funziona

Sono emersi due approcci. Entrambi terminano con l'app che possiede per te un identificatore stabile e nessuna password.

### Approccio 1: firmare una challenge

1. L'app genera una challenge casuale, monouso
2. Il tuo wallet firma quella challenge con la chiave dietro il tuo indirizzo
3. L'app verifica la firma e ti fa accedere

Nulla viene trasmesso sulla rete, quindi non ci sono commissioni né attese per un blocco. La specifica di riferimento è [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), che è ancora una bozza, quindi il supporto dei wallet per la firma dei messaggi varia.

### Approccio 2: dimostrarlo con un pagamento shielded

1. L'app genera un codice monouso e mostra una richiesta di pagamento
2. Invi un piccolo pagamento shielded con quel codice nel memo
3. L'app monitora il memo, abbina il codice e ti fa accedere

Questo funziona con i wallet che già oggi supportano i memo, cioè la maggior parte. Il compromesso è che costa una commissione di rete e bisogna attendere la conferma.

### Mantenere privato l'indirizzo

Un'app non deve necessariamente memorizzare il tuo indirizzo per riconoscerti. Alcune implementazioni lo sottopongono ad hashing insieme a un valore specifico dell'applicazione, così ogni sito vede un identificatore diverso ma stabile per lo stesso utente. Questo impedisce ai siti di confrontare le informazioni tra loro per collegare i tuoi account.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Compromessi

Vale la pena capirli prima di costruirci sopra qualcosa o di farci affidamento.

| | Challenge firmata | Pagamento shielded |
|---|---|---|
| Costo | Gratuito | Commissione di rete per ogni accesso |
| Velocità | Istantanea | Attende la conferma |
| Supporto dei wallet | Limitato, ZIP 304 è una bozza | Ampio, servono solo i memo |
| Lascia una traccia sulla chain | No | Sì, esiste una transazione |

Limitazioni condivise:

- **Nessun recupero account per impostazione predefinita.** Perdere la chiave significa perdere l'account, a meno che l'app non preveda un percorso di recupero
- **Il riutilizzo dell'indirizzo può collegarti.** Usare lo stesso indirizzo su molti siti ricrea il problema del tracciamento, ed è per questo che gli identificatori specifici dell'app sono importanti
- **Nessuno standard ratificato.** Ogni progetto ha il proprio schema, quindi un accesso costruito per uno non funziona con un altro
- **Non è anonimato di per sé.** Nasconde le tue finanze all'app, ma l'app può comunque profilare ciò che fai una volta entrato

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errori comuni da evitare

- Riutilizzare un codice challenge. Ogni codice dovrebbe essere monouso e scadere rapidamente, altrimenti uno intercettato può essere riutilizzato in un replay
- Chiedere agli utenti di inviare un importo significativo per accedere. Il pagamento è una prova, quindi l'importo dovrebbe essere trascurabile
- Memorizzare l'indirizzo grezzo quando un identificatore specifico dell'applicazione farebbe lo stesso lavoro
- Presumere che la firma dei messaggi funzioni ovunque. Controlla i wallet che i tuoi utenti hanno davvero
- Trattare un memo come segreto dopo il fatto. Dimostra che il mittente ha agito, non è una password

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Progetti che stanno esplorando questo approccio

Questi sono stati realizzati per la track **Zcash Login** di [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon). Sono esperimenti più che prodotti finiti, e mostrano quanto diversamente si possa costruire la stessa idea.

- **ZecAuth** - un protocollo di connessione wallet per Zcash, nello spirito di ciò che WalletConnect fa altrove. L'app mostra un codice QR o un link `zecauth://` che trasporta una challenge insieme alle capacità che sta richiedendo, come accesso, richieste di pagamento o accesso in lettura. Nessuna transazione, nessuna commissione, nessuna interazione con la chain. Include una specifica del protocollo scritta insieme al codice
- **ZShield** - trasforma un indirizzo shielded in un DID W3C e in un'identità OpenID Connect. Il browser genera una coppia di chiavi, il server emette un nonce tramite un'interfaccia in stile ZIP 304, il wallet lo firma e il server restituisce un JWT. Poiché il risultato è compatibile con OIDC, le app esistenti possono utilizzarlo senza integrazioni su misura
- **ZecPass** - dimostra la proprietà tramite un memo firmato, ed è costruito in modo che l'app non apprenda mai nemmeno l'indirizzo dell'utente. Deriva un hash con ambito applicativo da usare come identificatore stabile, mantiene le challenge monouso e con scadenza temporale, e include un pulsante React pronto all'uso con una libreria di verifica Node
- **Portal** - accesso inviando una transazione shielded con un codice monouso nel memo, in esecuzione su mainnet. Lo stesso flusso viene riutilizzato per sbloccare contenuti a pagamento e per inviare o ricevere denaro da un link
- **ZcashMe** - usa un pagamento shielded come prova di identità e si concentra sul divario tra desktop e mobile, così l'accesso da laptop non richiede un'estensione del browser
- **ZBooks** - uno strumento di contabilità e pagamenti che tratta l'accesso con Zcash come un primitivo di autenticazione riutilizzabile anziché come il prodotto stesso, e legge i dati di tesoreria tramite una Unified Full Viewing Key

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Pagine correlate

- [Memo](/using-zcash/memos) - come funzionano i memo crittografati e come un codice di accesso viaggia al loro interno
- [Viewing Keys](/zcash-tech/viewing-keys) - concedere accesso in sola lettura senza cedere il potere di spesa
- [Tenere registri con ZEC shielded](/zcash-use-cases/keeping-records-with-shielded-zec) - la stessa idea di divulgazione selettiva, applicata alla contabilità
- [Inviare denaro senza collegare l'identità](/zcash-use-cases/send-money-without-linking-identity) - perché il riutilizzo dell'indirizzo indebolisce la privacy

<br/>

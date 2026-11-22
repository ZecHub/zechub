# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> Organizza una raccolta fondi in ZEC

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermedio - 10 min
</span>

## TL;DR

- Dedica alla campagna un account del portafoglio e un indirizzo schermato, così non si mescola mai con altri fondi
- Condividi un link o un codice QR di richiesta di pagamento con un importo suggerito e un memo già compilato
- Mostra i progressi senza esporre i donatori: pubblica tu il totale, oppure dai le chiavi di visualizzazione a un solo revisore fidato
- Le chiavi di visualizzazione coprono l'intero account, non solo un indirizzo: per questo la campagna ha un account tutto suo
- Chiudi la campagna nella data promessa e pubblica come è stato usato il denaro

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> A chi è rivolta?

- A gruppi della comunità, progetti open source e creator che raccolgono fondi per un unico obiettivo
- Alle organizzazioni non profit che lanciano un appello di fine anno o di emergenza in ZEC
- A chiunque voglia che i donatori si fidino della campagna senza rendere pubblica ogni donazione

Se sei una non profit statunitense, leggi prima [Accettare donazioni private come non profit statunitense](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) per le ricevute e i moduli IRS.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Il problema

La maggior parte delle raccolte fondi in criptovalute usa un indirizzo trasparente, così i donatori possono vedere crescere il totale. Però in questo modo si vede anche ogni donazione, il suo importo, quando è arrivata e dove va poi il denaro. I donatori che scelgono apposta di donare in modo privato perdono questa privacy, e chiunque può seguire i fondi dopo la campagna.

Una campagna del tutto privata ha il problema opposto: i donatori non possono vedere se l'obiettivo è stato raggiunto o come è stato speso il denaro.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Perché Zcash?

Con gli ZEC schermati, ogni donazione resta privata on-chain e sei tu a decidere cosa mostrare: un totale, una barra di avanzamento o l'accesso in sola lettura per un revisore. I donatori possono aggiungere un messaggio nel [memo](/using-zcash/memos), e tu puoi ringraziarli senza che nessun altro veda chi ha donato.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Cosa ti serve

- Un [portafoglio](/wallets) schermato in cui puoi creare un account separato
- Una pagina della campagna: un sito web, un post sui social o una discussione su un forum
- Un obiettivo, una data di chiusura e un piano su come verrà usato il denaro

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guida passo passo

### Passo 1: stabilisci l'obiettivo e le regole

Prima del lancio, metti per iscritto:
- Quanto vuoi raccogliere e cosa finanzierà
- La data di chiusura
- Cosa succede se raccogli più o meno dell'obiettivo
- Chi controlla i fondi e se servono più persone per approvare le spese (vedi [Gestire una tesoreria comunitaria privata](/zcash-use-cases/private-community-treasury))

Pubblica queste informazioni sulla pagina della campagna. I donatori si fidano di una campagna che dice fin dall'inizio cosa farà.

### Passo 2: crea un account separato per la campagna

Crea un nuovo account nel tuo portafoglio, da usare solo per questa campagna, e copia da lì un indirizzo schermato. Tenere separata la campagna rende facile leggere il totale, ed è importante in seguito se condividi le chiavi di visualizzazione, perché mostrano l'attività dell'intero account ([Viewing Keys](/zcash-tech/viewing-keys)).

### Passo 3: crea un link e un codice QR di richiesta di pagamento

Un [URI di richiesta di pagamento](/using-zcash/payment-request-uris) è un link `zcash:` che compila per il donatore l'indirizzo, un importo suggerito e un memo. Usa il [generatore di richieste di pagamento](/tools) di ZecHub per crearne uno, poi condividilo come link e come codice QR.

Un memo come "Nome della campagna, rispondi a: la tua email o il tuo handle" aiuta i donatori che desiderano un ringraziamento o una ricevuta. Specifica sulla pagina che il memo è facoltativo.

### Passo 4: lancia la pagina della campagna

Inserisci nella pagina:
- L'obiettivo, la data di chiusura e le regole del passo 1
- L'indirizzo schermato, il codice QR e il link
- Come donare da un portafoglio schermato e dove procurarsene uno
- Come comunicherai i progressi (passo 5)

Fissa l'indirizzo in un unico punto e di' ai donatori di copiarlo solo da lì.

### Passo 5: comunica i progressi senza esporre i donatori

Scegli un'opzione e indicala sulla pagina:
- **Pubblica tu il totale**, per esempio una volta a settimana, in base al saldo dell'account della campagna nel tuo portafoglio
- **Dai le chiavi di visualizzazione a un solo revisore fidato**, come un membro del consiglio o un membro della comunità noto ai donatori, che confermi pubblicamente il totale. Una Incoming Viewing Key mostra le donazioni ricevute; una Full Viewing Key mostra anche le spese ([Viewing Keys](/zcash-tech/viewing-keys))

Non pubblicare le chiavi di visualizzazione sulla pagina della campagna. Chiunque le possieda può vedere l'importo e il memo di ogni donazione, compresi i contatti dei donatori.

### Passo 6: ringrazia i donatori

Rispondi ai donatori che hanno lasciato un contatto nel memo. Non pubblicare mai il nome o l'importo di un donatore senza prima chiederglielo.

### Passo 7: chiudi e rendiconta

Alla data di chiusura:
- Annuncia che la campagna è chiusa e rimuovi o aggiorna l'indirizzo e il codice QR
- Pubblica il totale finale e cosa è stato finanziato con il denaro
- Se hai condiviso le chiavi di visualizzazione, chiedi al revisore di confermare il totale finale e le spese

Le [divulgazioni di pagamento](/zcash-tech/payment-disclosures) potrebbero un giorno permetterti di dimostrare un singolo pagamento senza chiavi di visualizzazione, ma lo standard è ancora una bozza, quindi per ora non farci affidamento.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errori comuni da evitare

- Gestire la campagna dall'account del portafoglio che usi tutti i giorni
- Pubblicare le chiavi di visualizzazione, che espongono l'importo e il memo di ogni donatore
- Usare un indirizzo trasparente o di deposito di un exchange perché è più facile mostrare il totale
- Lasciare pubblicato l'indirizzo dopo la fine della campagna, così le donazioni continuano ad arrivare senza un piano per gestirle
- Non rendicontare mai come è stato speso il denaro

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Risultato

Puoi:
- Raccogliere ZEC per un obiettivo chiaro, mentre ogni donazione resta privata on-chain
- Mostrare progressi di cui i donatori possono fidarsi
- Chiudere la campagna con un resoconto pubblico e senza esporre i donatori

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Risorse correlate

- [Ricevere donazioni in modo privato](/zcash-use-cases/receive-donations-privately) - donazioni continuative, senza una campagna
- [Gestire una tesoreria comunitaria privata](/zcash-use-cases/private-community-treasury) - ruoli e approvazioni per i fondi condivisi
- [URI di richiesta di pagamento](/using-zcash/payment-request-uris) - link e codici QR con importo e memo già compilati
- [Viewing Keys](/zcash-tech/viewing-keys) - accesso in sola lettura per un revisore
- [Dove donare ZEC](/zcash-use-cases/where-to-donate-zec) - organizzazioni non profit che accettano già ZEC

<br/>

## Passo successivo

- [Accettare donazioni private come non profit statunitense](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

Se sei alle prime armi, inizia da qui: [Cos'è Zcash](/start-here/what-is-zec-and-zcash)

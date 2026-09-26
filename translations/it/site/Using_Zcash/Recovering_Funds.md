<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Recupero dei fondi del wallet Zcash

**Perché conservare il materiale di recupero?**

Seed, chiavi di spesa, chiavi di visualizzazione e file del wallet non sono intercambiabili. Una frase seed può derivare le chiavi del wallet per molti wallet, ma non sostituisce ogni chiave legacy o file del wallet. Una chiave di visualizzazione può rivelare l'attività schermata, ma non può autorizzare una spesa.

Il recupero dipende dall'avere la corretta autorità di spesa e un percorso attualmente supportato per il pool che contiene i fondi. Mantieni privato il materiale di recupero e non condividere mai seed, chiavi di spesa o file del wallet con persone di cui non ti fidi.

# Sicurezza e responsabilità

È fondamentale che gli utenti comprendano i rischi legati alla gestione delle chiavi private e proteggano tali chiavi da accessi non autorizzati. La sicurezza dei fondi dipende dalla responsabilità dell'utente nel custodire le proprie chiavi private.

## Fondi schermati legacy: Sprout, Sapling e Orchard

I vecchi ZEC schermati potrebbero dover essere migrati durante il recupero. Il percorso dipende da quale pool schermato detiene attualmente i fondi.

> **NU7 è previsto per il 5 novembre 2026.** Una volta attivato, l'attuale percorso di migrazione fuori dal pool Sprout legacy smetterà di funzionare.
>
> Se hai ancora ZEC nel pool Sprout, migrali prima dell'aggiornamento. Dopo l'attivazione, gli strumenti esistenti non saranno più in grado di spostare i fondi Sprout in Sapling, indirizzi trasparenti o qualsiasi altra destinazione.
>
> Se stai visualizzando questa pagina **dopo l'attivazione di NU7**, **Sprout è congelato nel ghiaccio** finché non sarà disponibile un futuro metodo di recupero, attualmente non pianificato.

## La risposta in una pagina

| I tuoi fondi sono in | Percorso di migrazione | Cosa fare |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Se hai `wallet.dat` o una chiave di spesa Sprout autonoma, prova prima l'attuale percorso di recupero Argos. Se Argos non è adatto, usa il percorso sidecar legacy nella guida completa sul campo. Sprout deve arrivare prima in Sapling, poi proseguire verso Ironwood. Questo percorso è sensibile al tempo a causa di NU7. |
| **Sapling** | **Sapling → Ironwood** | Non è necessario alcun ambiente di recupero Sprout. Usa un wallet attuale che possa sia recuperare o spendere il tuo specifico account Sapling sia costruire transazioni Ironwood. Il solo supporto Ironwood non dimostra il supporto al recupero legacy-Sapling. |
| **Orchard** | **Orchard → Ironwood** | Orchard è solo in uscita. Usa il flusso di migrazione integrato da Orchard a Ironwood di un wallet attuale compatibile. Vedi [Fondi recuperati e il pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Flusso decisionale in cinque domande

1. **È Sprout?** Una frase seed da sola indica un percorso di recupero dell'era Sapling/Orchard successiva, non Sprout. Un indirizzo `zc...`, oppure un wallet ripristinato che riporta un saldo Sprout, indica Sprout.
2. **Quale materiale di recupero hai?** Cerca `wallet.dat`, il vecchio computer o datadir, un backup `z_exportwallet` oppure una chiave di spesa Sprout esportata. Un indirizzo `zc...` da solo non è sufficiente.
3. **Argos o il sidecar legacy?** Se hai `wallet.dat` o una chiave di spesa Sprout autonoma e vuoi semplicemente spostare fuori i fondi, prova prima [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Usa il percorso sidecar legacy nella guida completa sul campo se Argos non può gestire il materiale oppure se desideri avere l'intero stack di recupero sotto il tuo controllo.
4. **Hai già un datadir zcashd sincronizzato e non potato?** Questo conta solo per il percorso sidecar legacy. Copia i dati del nodo esistenti solo dopo uno spegnimento pulito; altrimenti la guida sul campo copre le opzioni snapshot/da zero.
5. **Dove finiscono i fondi?** **Ironwood.** Sprout passa prima attraverso Sapling perché non esiste una singola transazione diretta da Sprout a Ironwood. Non fermarti a Sapling.

### Guida completa sul campo per la migrazione del pool ZEC

Per il riferimento completo alla migrazione, inclusi percorsi di recupero dettagliati, comandi, commissioni, requisiti hardware, considerazioni sulla privacy, risoluzione dei problemi e note sulle fonti, leggi la guida completa.

**Versione 1.1 · Aggiornata il 18 settembre 2026**

[Leggi la guida completa sul campo per la migrazione del pool ZEC in ZecHub](/research/zec-pool-migration/view)

> **Prima di iniziare:** stabilisci innanzitutto **cosa stai recuperando e quale materiale di recupero possiedi ancora**. Un seed di un wallet attuale o una chiave di spesa non-Sprout supportata potrebbe richiedere soltanto un normale ripristino. Il materiale più vecchio — come un seed ZecWallet Lite, un `wallet.dat` legacy o una chiave di spesa Sapling o Sprout autonoma — potrebbe richiedere un percorso di recupero dedicato.
>
> Se ritieni che i fondi siano in **Sprout**, conferma di avere ancora l'autorità di spesa prima di dedicare tempo al recupero. Un indirizzo `zc...` o il solo materiale di visualizzazione non è sufficiente per spostare i fondi.
>
> **YWallet non supporta più Zcash dopo Ironwood.** Usa **Zkool** per normali ripristini non-Sprout da seed e chiavi supportati. Usa **Argos** per il recupero di ZecWallet Lite, file wallet legacy e chiavi di spesa Sapling/Sprout autonome. Per Sprout, Argos è il primo percorso da provare; la guida completa sul campo copre il fallback sidecar legacy.
>
> Usa la tabella qui sotto in base a **ciò che possiedi effettivamente**, non allo strumento di recupero che ricordi di aver usato.

| Hai | Inizia qui |
| --- | --- |
| Una frase seed o una **chiave di spesa non-Sprout supportata** da un wallet attuale o mantenuto di recente, incluso il vecchio materiale YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| Una **sola chiave di visualizzazione** | Zkool può importare chiavi di visualizzazione supportate per l'accesso in sola lettura, ma una chiave di visualizzazione non può autorizzare una spesa di recupero. Trova il seed o la chiave di spesa corrispondente. |
| Un seed di 24 parole **ZecWallet Lite** | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Un file ZecWallet Lite o zcashd `wallet.dat`, oppure una chiave di spesa estesa Sapling / Sprout autonoma | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Al 18 settembre 2026, v1.3.0 è la versione attuale e preferita; usa v1.2.0 o successiva per il recupero `wallet.dat` e Sprout. |
| Materiale Sprout che Argos non può gestire, oppure un recupero in cui desideri avere i componenti legacy sotto il tuo controllo | Usa il percorso sidecar legacy nella [guida completa sul campo](/research/zec-pool-migration/view). |
| Nessun seed o chiave di spesa funzionante, ma un dispositivo bloccato, una password dimenticata o un disco guasto | [Recupero professionale](#professional-recovery-when-you-do-not-have-the-seed). Non inviare mai un seed o una chiave di spesa funzionante a qualcuno che ti contatta senza sollecitazione. |

## Recupero fondi con Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) è il successore Zcash mantenuto di YWallet dello stesso sviluppatore. Supporta percorsi di recupero trasparenti e schermati moderni, incluse le chiavi Sapling legacy, ma **non Sprout**.

Qui sono trattate due situazioni:

1. **Ripristino di un account** da una frase seed, chiave privata o chiave di visualizzazione
2. **Trasferimento dei fondi** fuori da un wallet che ha supportato solamente indirizzi trasparenti

### 1) Ripristino di un account

1. Installa Zkool dalla [pagina delle release](https://github.com/hhanh00/zkool2/releases) e aprilo
2. In **Account Manager** (la pagina principale), tocca il pulsante **+** per raggiungere la schermata **New Account**
3. Inserisci un **Account Name** per identificare questo account
4. Attiva **Restore Account?**. Verranno visualizzati i campi della chiave e dell'altezza di nascita
5. Incolla la chiave in **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accetta frasi seed, chiavi segrete Sapling, chiavi estese trasparenti e chiavi di visualizzazione supportate. Una chiave di visualizzazione è in sola lettura e non può autorizzare una spesa.
6. Inserisci una **Birth Height** per un account vecchio. Zkool non esegue la scansione dei blocchi precedenti a questa altezza, quindi, se non sei sicuro, scegli un'altezza antecedente alla prima attività del wallet. Un'altezza di nascita impostata troppo tardi può far sembrare mancanti transazioni reali.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Salva l'account, quindi sincronizzalo

### Ripristino di un seed da un wallet diverso

Se il seed proviene da un wallet che segue ZIP 316 — incluso ZODL (precedentemente Zashi), Zingo o zcashd — attiva **Advanced Options** e abilita **Use Internal Change** prima di salvare.

ZIP 316 utilizza un indirizzo interno/di resto separato. Ripristinare uno di questi account senza **Use Internal Change** può far sembrare mancanti gli output di resto, anche se i fondi esistono ancora.

Altri due campi si trovano in **Advanced Options**:

- **Extra Passphrase (optional)**, solo se il wallet originale ne utilizzava una
- **Account Index**, se il wallet originale conteneva diversi account su un solo seed. I fondi potrebbero trovarsi sotto un indice diverso

> **Questi due compaiono solo quando nel campo Key è presente una frase seed valida.** Con il campo vuoto, oppure contenente una chiave privata o di visualizzazione, Zkool mostra soltanto **Use Internal Change** e **H/W Ledger**. Incolla prima il seed, poi apri Advanced Options.

### 2) Trasferimento di fondi da un wallet solo trasparente

Se il vecchio wallet o account conteneva solo **ZEC trasparenti**, ripristina prima l'account, trova ogni indirizzo trasparente utilizzato, quindi sposta i fondi verso una destinazione schermata attuale che controlli. Non presumere che un vecchio brand di wallet fosse sempre solo trasparente; alcuni prodotti hanno aggiunto il supporto schermato nelle versioni successive.

1. Ripristina l'account seguendo i passaggi sopra
2. Apri l'account e vai alla pagina **Receive Funds**
3. Tocca la lente d'ingrandimento nella barra superiore (**Find other transparent addresses**). I wallet che ruotano gli indirizzi, come Ledger ed Exodus, generano molti indirizzi trasparenti da un solo seed, e questo trova quelli che contengono fondi
4. **Successivamente reimposta e sincronizza l'account.** Gli indirizzi appena trovati acquisiscono i loro saldi solo alla scansione successiva, quindi saltare questo passaggio fa sembrare che il trasferimento non abbia trovato nulla
5. Vai alla pagina **Send**. Vicino al saldo troverai tre pulsanti con icone. Non hanno etichette di testo, quindi passa il cursore sopra o tieni premuto per vederne i nomi:
   - **Shield One** (scudo delineato) sposta un indirizzo trasparente alla volta
   - **Shield All** (scudo pieno) sposta tutto da ogni indirizzo trasparente contemporaneamente
   - **Unshield All** (lucchetto aperto) va nella direzione opposta, verso un indirizzo trasparente

> **Shield One è la scelta più privata.** Schermare più indirizzi in un'unica transazione li collega pubblicamente come appartenenti alla stessa persona. Zkool lo avverte prima di eseguire Shield All.

6. Rivedi la transazione e inviala

Unshield All è utile quando si preleva verso un exchange che accetta solo indirizzi trasparenti. I pulsanti di schermatura compaiono solo se l'account dispone di un indirizzo schermato, e Unshield All solo se ne dispone di uno trasparente.

## Recupero di ZecWallet Lite e wallet legacy con Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) non è più mantenuto e il suo repository è archiviato. La derivazione del suo seed differisce dalla struttura utilizzata dai wallet attuali, quindi importare la stessa frase in un wallet moderno può non rilevare i fondi detenuti agli indirizzi derivati aggiuntivi di ZecWallet Lite. [Argos](https://argos.sovright.com), da Sovright, è un ambiente desktop di recupero creato per questo e altri casi di recupero legacy.

Argos legge seed e file wallet ZecWallet Lite, zcashd `wallet.dat`, chiavi di spesa estese Sapling autonome e materiale di spesa Sprout. Per Sprout, un seed ZecWallet Lite da solo non basta, perché quelle chiavi sono state generate separatamente. Argos è uno strumento di recupero, non un wallet per l'uso quotidiano: ispeziona localmente il materiale sorgente, esegui la scansione, quindi trasferisci i fondi in un wallet mantenuto che controlli.

Least Authority ha [verificato](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) lo strumento. Il recupero stesso è gratuito. Durante il trasferimento può comparire una donazione opzionale a Sovright.

> **Non digitare mai un seed in un sito web.** Il sito Argos serve solo per il download e la [guida utente](https://argos.sovright.com/guide.html). Le chiavi restano nell'app desktop firmata. La convalida è locale rispetto al checksum BIP-39. Il campo del seed viene svuotato all'avvio della scansione. Chiunque ti scriva chiedendoti quel seed “per aiutarti a recuperare i fondi” sta cercando di truffarti.

### Prima di aprire Argos

1. Scarica l'app desktop dal sito [ufficiale di Argos](https://argos.sovright.com) o dalla [pagina delle release GitHub](https://github.com/sovright/argos/releases). Verifica checksum o firme quando pubblicati.
2. Usa la release Argos attuale. Al 18 settembre 2026, **v1.3.0** è la versione attuale e preferita. Usa **v1.2.0 o successiva per il recupero `wallet.dat` e Sprout**. Le build precedenti alla 1.1.0 possono ancora effettuare la scansione, ma costruiscono trasferimenti pre-Ironwood che la rete rifiuta; aggiorna e riprova.
3. Lavora su una macchina di cui ti fidi. Preferisci la crittografia dell'intero disco. Non condividere lo schermo mentre sono visibili un seed, una passphrase o una chiave di spesa.
4. Prepara un Unified Address di destinazione da un wallet mantenuto che controlli, come [ZODL](https://zodl.app/). Conferma l'indirizzo in quel wallet prima di incollarlo in Argos.

### Recupero del seed

1. Apri Argos e scegli **I have my 24-word seed phrase**. Il recupero di un seed non richiede un file wallet.
2. Incolla la frase e fai clic su **Validate seed**. Se indica che il seed è valido, continua.
3. Inserisci un'**altezza del blocco di nascita**, oppure la stima più vicina di quando è stato creato il wallet. Un'altezza precedente è più lenta ma più sicura che fare una stima troppo tarda.
4. Nei controlli del server, usa il preset del server attuale oppure inserisci URL lightwalletd. Gli URL separati da virgole vengono provati in ordine. Esempi pubblici:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Incolla il Unified Address di destinazione.
6. Fai clic su **start scan**. Questo può richiedere minuti o giorni, a seconda dell'altezza di nascita. Puoi chiudere e riaprire lo stesso ambiente di lavoro; la scansione riprende.
7. Quando la scansione termina, controlla i saldi, la stima della commissione e la destinazione, quindi fai clic su **sweep**.

La trasmissione di un trasferimento è irreversibile. Conserva il file wallet originale finché ogni pool pertinente non è stato trasferito e il wallet di destinazione non mostra i fondi attesi. Una volta completato il recupero, ritira i segreti legacy anziché continuare a usarli per nuove attività.

### File wallet e chiavi autonome

Nella schermata di benvenuto, **I have a wallet file** copre un file ZecWallet Lite, un zcashd `wallet.dat` oppure chiavi di spesa estese Sapling autonome. Il recupero di chiavi di spesa Sprout autonome è gestito dal percorso di recupero Sprout/CLI di Argos.

Argos legge i file wallet senza modificarli. Se il wallet è crittografato, inserisci la passphrase quando richiesto; viene utilizzata in memoria e non viene scritta sul disco. Controlla il numero di chiavi trasparenti, Sapling e Sprout prima di avviare una scansione.

Le chiavi di visualizzazione non sono accettate per un trasferimento perché non possono autorizzare la spesa.

### Note su Sprout

Un seed ZecWallet Lite non deriva chiavi Sprout. Tali chiavi sono state generate separatamente. Recupera Sprout da un zcashd `wallet.dat` o da una chiave di spesa autonoma nella CLI.

Se il file dispone già di dati di note spendibili e di un witness memorizzato nella cache, Argos può offrire **Sweep Sprout funds** senza una scansione della catena. Altrimenti può eseguire una scansione completa riprendibile dei blocchi sulla rete P2P. Questa scansione è ampia e lenta. Il checkpoint che scrive consente la spesa, quindi proteggilo come il wallet originale.

Il valore Sprout può arrivare solamente in Sapling. Dopo che i fondi Sapling sono confermati e spendibili, spostali verso **Ironwood** con un wallet attuale che supporti l'account Sapling recuperato. Non fermarti a Sapling.

## Fondi recuperati e pool Ironwood

Dall'attivazione dell'aggiornamento Ironwood (NU6.3), avvenuta il 28 luglio 2026, il pool Orchard è solo spendibile. Nessun nuovo valore può entrarvi e il valore esistente esce attraverso il tornello verso Ironwood.

Se i tuoi fondi recuperati sono in Orchard, spostali a Ironwood usando il **flusso di migrazione integrato di un wallet attuale**. Orchard è solo in uscita dopo NU6.3.

Zkool 6.30.0 è la versione attuale al 18 settembre 2026 e supporta Ironwood. Il suo progetto di migrazione è orientato alla privacy, ma non equivale a dichiarare la conformità con ZIP 318. Altri wallet attuali possono usare una migrazione graduale in stile ZIP 318. Segui la schermata di migrazione attuale e le note di rilascio del wallet installato anziché inventare manualmente un importo o una pianificazione.

Una migrazione graduale può utilizzare più transazioni, quindi la commissione totale può essere superiore a quella di un trasferimento in un'unica operazione.

> **Gli importi della migrazione sono pubblici.** Quando il valore attraversa il tornello, l'importo e l'altezza del blocco sono visibili sulla catena, anche se mittente e destinatario rimangono schermati. Quando la privacy conta, usa la politica di migrazione privata/graduale integrata nel wallet e, dove appropriato, la privacy a livello di rete come Tor o un altro livello di privacy affidabile. La privacy di rete può nascondere il collegamento al tuo IP; non nasconde l'importo pubblico dell'attraversamento.

## Recupero approfondito con ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) è un progetto di recupero Zingo Labs **in corso** attualmente focalizzato sui file wallet ZecWallet Lite e sulla migrazione del formato wallet. Il suo README indirizza attualmente gli utenti che devono recuperare fondi all'opzione di esportazione **Zingolib**, mentre è ancora in sviluppo un supporto ZeWIF più completo.

Consideralo uno strumento avanzato/per casi limite anziché il percorso di recupero predefinito. Per normali seed ZecWallet Lite, file wallet, zcashd `wallet.dat` e chiavi di spesa autonome supportate, prova prima Argos. Verifica in un wallet mantenuto qualsiasi elemento recuperato da ZExCavator prima di farvi affidamento.

## Recupero professionale quando non hai il seed

Se il seed o la chiave sono persi, un ripristino autogestito non può iniziare. Alcune persone in questa situazione ricorrono a una società di recupero professionale per password dimenticate, guasti hardware o dischi illeggibili.

Questo percorso non equivale al ripristino di un seed che possiedi ancora. Non consegnare un seed funzionante a qualcuno che si offre di “recuperarlo” per te. La versione truffaldina di questo servizio è comune.

[Unciphered](https://unciphered.com) è una società che svolge questo lavoro internamente ed è stata trattata da testate come [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). È un servizio generale di recupero crypto, non uno strumento specifico per Zcash, e fa pagare il lavoro. ZecHub non raccomanda alcuna società di recupero. Se scegli questo percorso, conferma autonomamente il dominio ufficiale e considera truffatore chiunque ti invii per primo un messaggio diretto.

Se possiedi ancora un seed o una chiave di spesa funzionante, inizia invece con un percorso di recupero autogestito come Zkool o Argos sulla tua macchina.

## YWallet non è più mantenuto

YWallet è stato per molto tempo lo strumento di recupero consigliato in questa pagina e molte guide meno recenti vi rimandano ancora.

Il suo sviluppatore afferma ora che YWallet non supporta più Zcash dopo l'aggiornamento Ironwood e indirizza gli utenti Zcash a **Zkool**, il successore mantenuto. Conserva il vecchio materiale seed/chiave YWallet, ma non avviare una nuova migrazione Zcash in YWallet.

Se possiedi già materiale di recupero Zcash da YWallet, ripristinalo in Zkool utilizzando il percorso seed/chiave supportato sopra.

## Pagine correlate

- [Wallet](/using-zcash/wallets) - quali wallet sono mantenuti e la loro preparazione a Ironwood, incluso Argos
- [Ironwood](/zcash-tech/ironwood) - cosa ha modificato l'aggiornamento e perché i fondi migrano
- [Memo](/using-zcash/memos) - come funzionano i memo crittografati
- [Chiavi di visualizzazione](/zcash-tech/viewing-keys) - accesso in sola lettura senza potere di spesa
- [Nodi lightwallet](/zcash-tech/lightwallet-nodes) - endpoint lightwalletd pubblici che Argos può usare
- [Guida utente di Argos](https://argos.sovright.com/guide.html) - guida ufficiale da Sovright
- [Naomi Brockwell sugli strumenti di recupero](https://x.com/naomibrockwell/status/2079146521405333526) - guida dettagliata Argos e una nota sul recupero professionale

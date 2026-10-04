<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Sicurezza post-quantum in Zcash

## TL;DR

- I computer quantistici rappresentano un rischio futuro perché potrebbero violare parte della crittografia a chiave pubblica usata oggi dalle blockchain.
- "Post-quantum" indica una crittografia che funziona su computer ordinari ma è progettata per resistere agli attacchi dei futuri computer quantistici.
- Zcash non è oggi completamente post-quantum.
- L'uso schermato di Zcash riduce la quantità di dati pubblici sulle transazioni che i futuri attaccanti possono studiare, ma l'uso schermato non equivale a una piena resistenza quantistica.
- Zcash si sta preparando attraverso ricerca, ZIP e proposte di aggiornamento come ZIP 2005 e Project Tachyon.
- Una migrazione post-quantum sicura deve proteggere contemporaneamente fondi, privacy, wallet, exchange e regole di consenso.

Per sapere cosa ha modificato Ironwood e conoscere lo stato datato di ciascun elemento, consulta [Zcash è post-quantum?](/zcash-tech/is-zcash-post-quantum).

## Cosa è il calcolo quantistico?

Un normale computer memorizza informazioni come bit. Ogni bit è `0` oppure `1`.

Un computer quantistico usa bit quantistici, chiamati qubit. I qubit possono essere usati da algoritmi speciali che risolvono alcuni problemi matematici molto più velocemente dei computer normali.

Ciò non significa che un computer quantistico sia più veloce in tutto. Il rischio è specifico. Alcuni sistemi crittografici dipendono da problemi matematici molto difficili per i computer normali, ma molto più facili per un computer quantistico sufficientemente grande.

Per le blockchain, l'esempio più importante è la crittografia a chiave pubblica. Le chiavi pubbliche e le firme sono usate per dimostrare che un utente è autorizzato a spendere monete.

## Perché le blockchain se ne interessano

Le blockchain usano la crittografia per diversi compiti:

| Strumento crittografico | Cosa fa | Impatto quantistico |
| --- | --- | --- |
| Firme digitali | Dimostrano che il proprietario ha autorizzato una spesa | Rischio elevato per i comuni sistemi a curva ellittica |
| Funzioni hash | Creano indirizzi, commitment, alberi Merkle e challenge | Rischio minore, ma i margini di sicurezza contano |
| Prove a conoscenza zero | Dimostrano che le transazioni schermate sono valide senza rivelarne i dettagli | Dipende dal sistema di prova e dalle assunzioni |
| Accordo sulle chiavi | Aiuta i wallet a cifrare i dati delle note per i destinatari | Richiede un'attenta revisione secondo un modello di minaccia quantistica |

Un computer quantistico sufficientemente potente potrebbe minacciare molti schemi di firma usati oggi, comprese le firme a curva ellittica. Questo è importante perché una firma consente alla rete di sapere che una transazione è stata autorizzata dalla chiave corretta.

Le funzioni hash sono diverse. L'algoritmo di Grover può accelerare la ricerca a forza bruta, ma non viola le funzioni hash nello stesso modo diretto. Margini di sicurezza maggiori possono essere d'aiuto.

## Cosa è la crittografia post-quantum?

La crittografia post-quantum è progettata per rimanere sicura sia contro i computer normali sia contro i futuri computer quantistici.

Non significa che la crittografia usi un computer quantistico. Significa che il sistema si basa su diversi problemi matematici difficili.

Nel 2024, il NIST ha pubblicato i primi standard post-quantum finalizzati:

- **ML-KEM** per lo stabilimento delle chiavi
- **ML-DSA** per le firme digitali
- **SLH-DSA** per le firme digitali basate su hash

Questi standard sono una tappa importante, ma una blockchain non può semplicemente sostituire un algoritmo con un altro dall'oggi al domani. Devono essere considerati le regole di consenso, i wallet, gli hardware wallet, le dimensioni delle transazioni, le commissioni e la privacy.

## Come il rischio quantistico si manifesta on-chain

Un modo semplice per pensare al rischio è:

1. Un utente crea una coppia di chiavi.
2. I dati della chiave pubblica o della firma possono apparire on-chain.
3. Un futuro attaccante quantistico potrebbe riuscire a usare quel materiale pubblico per ricavare la chiave privata.
4. Se i fondi sono ancora controllati da quella chiave, potrebbero essere a rischio.

Le blockchain trasparenti espongono intenzionalmente molte informazioni. Indirizzi, importi e collegamenti tra transazioni sono pubblici. Il materiale della chiave pubblica può diventare visibile anche quando vengono spese delle monete.

Questo è uno dei motivi per cui riutilizzare gli indirizzi è dannoso. Il riutilizzo offre agli osservatori più dati da collegare oggi e dà ai futuri attaccanti più materiale storico da analizzare.

## Cosa è diverso in Zcash?

Zcash supporta sia transazioni trasparenti sia schermate.

L'uso trasparente di Zcash funziona più come l'uso di una blockchain pubblica in stile Bitcoin. Indirizzi, importi e relazioni tra transazioni sono visibili.

L'uso schermato di Zcash è diverso. Le transazioni schermate usano prove a conoscenza zero affinché la rete possa verificare che una transazione segua le regole senza rivelare mittente, destinatario o importo.

Questo dà a Zcash un importante vantaggio in termini di privacy:

- Vengono pubblicati meno dati sulle transazioni visibili a tutti.
- Gli utenti evitano di creare un grafo pubblico dei pagamenti quando rimangono schermati.
- I futuri osservatori hanno meno cronologia finanziaria pubblica da analizzare.
- La divulgazione selettiva può avvenire tramite viewing key invece di registri pubblici per impostazione predefinita.

Ma l'uso schermato di Zcash non è automaticamente post-quantum. I pool schermati dipendono ancora da assunzioni crittografiche. L'autorizzazione alla spesa, i commitment delle note, i nullifier, i sistemi di prova, la cifratura e le chiavi del wallet richiedono tutti un'attenta revisione.

In breve:

> L'uso schermato riduce l'esposizione pubblica, ma Zcash necessita ancora di aggiornamenti post-quantum deliberati.

## Mappa dei rischi di Zcash

| Area | Spiegazione per principianti | Problema post-quantum |
| --- | --- | --- |
| Indirizzi trasparenti | Indirizzi pubblici e grafo pubblico delle transazioni | Rischi simili ad altre blockchain trasparenti |
| Autorizzazione alla spesa | La prova che un utente è autorizzato a spendere | Gli schemi di firma potrebbero richiedere sostituzione o migrazione |
| Note schermate | Registri privati di valore all'interno dei pool schermati | Alcuni componenti potrebbero richiedere nuove assunzioni o strumenti di recupero |
| zk-SNARKs | Prove che le transazioni schermate sono valide | Le assunzioni del sistema di prova richiedono revisione |
| Scansione del wallet | Come i wallet trovano e decifrano le note ricevute | L'accordo sulle chiavi e la cifratura delle note richiedono revisione |
| Migrazione | Spostare fondi verso una crittografia più sicura | Deve evitare sia la perdita di fondi sia fughe di privacy |

## Come si sta preparando Zcash

### Zcash ha un processo di aggiornamento della rete

Zcash ha già modificato la propria crittografia in passato. Sapling ha reso le transazioni schermate più semplici da usare. NU5 ha introdotto Orchard, Unified Addresses e Halo 2.

Questo è importante perché la preparazione post-quantum non è una patch software di una sola riga. Richiede aggiornamenti coordinati della rete, modifiche ai wallet, audit e tempo affinché gli utenti effettuino la migrazione.

I precedenti aggiornamenti di Zcash mostrano che l'ecosistema ha esperienza nel passare da una crittografia più vecchia a progetti più recenti.

### Halo e Orchard hanno ridotto le assunzioni precedenti

Halo 2 è usato da Orchard, il moderno pool schermato di Zcash. Un importante miglioramento è che Halo ha eliminato la necessità di una configurazione fidata per il sistema di prova Orchard.

Non è la stessa cosa della sicurezza post-quantum. È comunque rilevante perché dimostra che Zcash può sostituire importanti componenti crittografici di base quando sono disponibili progetti migliori.

### ZIP 2005 si concentra sulla recuperabilità quantistica

ZIP 2005 si intitola "Recuperabilità quantistica di Orchard." Propone modifiche volte ad aiutare gli utenti di Orchard a recuperare o migrare i fondi se gli attacchi quantistici contro le assunzioni più vecchie diventassero pratici.

La recuperabilità non equivale a una piena sicurezza post-quantum. È più circoscritta e comunque utile:

- La piena sicurezza post-quantum cerca di impedire che gli attacchi quantistici funzionino.
- La recuperabilità offre agli utenti onesti un percorso migliore se la crittografia più vecchia diventa insicura.

Per i principianti, pensatela come un piano di uscita d'emergenza. Non sostituisce l'intero edificio, ma aiuta le persone a lasciare in sicurezza la vecchia stanza se la vecchia serratura si indebolisce.

### Project Tachyon guarda a miglioramenti più ampi del protocollo

Project Tachyon è un aggiornamento proposto di Zcash incentrato su scala, sincronizzazione e crescita dello stato. Il suo sito pubblico afferma che la proposta mira a ridurre le transazioni, contenere la crescita dello stato dei validatori e ottenere come effetto collaterale una piena privacy post-quantum.

Poiché Tachyon è una proposta, dipende ancora dal lavoro di ingegneria, dalla revisione e dall'approvazione della comunità prima dell'attivazione. È meglio comprenderlo come parte della ricerca attiva e della direzione degli aggiornamenti di Zcash, non come una funzionalità già disponibile oggi per gli utenti.

### La ricerca e gli standard avanzano

Anche il più ampio mondo della crittografia avanza. Gli standard post-quantum del NIST offrono agli implementatori componenti di base più solidi per firme e stabilimento delle chiavi. I ricercatori delle prove a conoscenza zero continuano a studiare sistemi di prova che possano reggere sotto assunzioni quantistiche.

Zcash può beneficiare di questo lavoro, ma deve ancora adattarlo a una blockchain che preservi la privacy.

## Possibili approcci ai futuri aggiornamenti

### Autorizzazione alla spesa post-quantum

Zcash potrebbe alla fine necessitare di un'autorizzazione alla spesa che non dipenda da schemi di firma vulnerabili ai quanti.

Questo potrebbe usare firme post-quantum, firme ibride o un altro progetto. Un progetto ibrido usa sia controlli classici sia post-quantum durante un periodo di transizione, affinché il sistema non dipenda da una sola assunzione.

La sfida riguarda dimensione e costo. Le firme post-quantum possono essere più grandi delle firme odierne, influenzando le dimensioni delle transazioni, la larghezza di banda, le commissioni, i wallet mobili e gli hardware wallet.

### Nuovi formati di indirizzi e chiavi

La nuova crittografia spesso richiede nuove chiavi e indirizzi. Gli utenti avrebbero bisogno di un percorso di migrazione chiaro dai vecchi formati a formati più sicuri.

La migrazione dovrebbe essere semplice nei wallet. La maggior parte degli utenti non dovrebbe dover comprendere ogni dettaglio crittografico per rimanere al sicuro.

### Migrazione che preserva la privacy

La migrazione è particolarmente delicata per Zcash. Se molti utenti spostano fondi dai vecchi pool ai nuovi pool seguendo schemi evidenti, la migrazione stessa potrebbe rivelare informazioni.

Un buon piano di migrazione deve proteggere:

- I fondi degli utenti
- La privacy degli utenti
- La compatibilità dei wallet
- Il supporto degli exchange
- Il supporto degli hardware wallet
- La sicurezza del consenso della rete

### Revisione del sistema di prova post-quantum

Sostituire le firme non basta. Il progetto schermato di Zcash dipende anche da prove a conoscenza zero e commitment.

Il lavoro futuro potrebbe dover rivedere o sostituire:

- Le assunzioni di zk-SNARK
- I commitment polinomiali
- Gli hash delle challenge Fiat-Shamir
- I commitment delle note
- La costruzione dei nullifier
- Le assunzioni sugli alberi Merkle
- La cifratura delle note e il comportamento delle viewing key

Alcuni componenti potrebbero essere accettabili con parametri adeguati. Altri componenti potrebbero richiedere nuovi progetti.

## Esempi per principianti

### Esempio 1: La vecchia serratura

Immagina una cassaforte con una serratura che oggi è resistente. Un nuovo strumento inventato in futuro potrebbe aprire rapidamente quella vecchia serratura.

La crittografia post-quantum è come sostituire la serratura con un progetto che non ci si aspetta venga violato dal nuovo strumento.

Per una blockchain, sostituire la serratura è difficile perché ogni wallet, nodo, exchange e dispositivo hardware deve comprendere il nuovo progetto.

### Esempio 2: La scatola delle ricevute pubbliche

I dati di una blockchain trasparente sono come mettere ogni ricevuta in una scatola pubblica per sempre. Anche se oggi nessuno riesce a leggere ogni schema, gli strumenti futuri potrebbero imparare di più in seguito.

L'uso schermato di Zcash cerca di evitare di pubblicare quelle ricevute sin dall'inizio. Questo aiuta la privacy a lungo termine, ma la serratura che protegge il sistema schermato deve comunque essere rivista in vista di un futuro quantistico.

### Esempio 3: Il piano di uscita

La recuperabilità è come pianificare una via di uscita prima che ci sia un incendio. Si spera di non averne bisogno, ma progettarla presto è molto più sicuro che farlo durante un'emergenza.

ZIP 2005 si adatta a questa idea per le note di Orchard.

## Cosa possono fare gli utenti oggi

Gli utenti non devono andare nel panico. Oggi non sono disponibili grandi computer quantistici pubblici capaci di violare la crittografia blockchain implementata.

Le buone abitudini aiutano comunque:

- Preferisci l'uso schermato di Zcash quando possibile.
- Evita di riutilizzare gli indirizzi.
- Mantieni aggiornati i wallet.
- Segui gli annunci sugli aggiornamenti della rete di Zcash.
- Tieni d'occhio ZIP e indicazioni dei wallet sulla recuperabilità o sulla migrazione.
- Non presumere che l'attività trasparente sia privata.
- Non spostare fondi in base a voci; attendi indicazioni chiare da sviluppatori affidabili di Zcash e dai team dei wallet.

## Sfide

Gli aggiornamenti post-quantum sono difficili per ogni blockchain.

Le sfide comuni includono:

- Chiavi e firme più grandi
- Transazioni più grandi
- Costi di verifica maggiori
- Maggiore uso della larghezza di banda
- Nuovi audit di sicurezza
- Supporto degli hardware wallet
- Prestazioni dei wallet mobili
- Integrazione di exchange e custodia
- Fughe di privacy durante la migrazione
- Accordo della comunità sulle modifiche al consenso

Per Zcash, la parte più difficile non è solo mantenere le monete spendibili. La difficoltà consiste nel mantenerle spendibili preservando al contempo la privacy che rende Zcash diverso.

## Riepilogo

I computer quantistici potrebbero infine minacciare parte della crittografia usata dalle blockchain. La crittografia post-quantum è la risposta a lungo termine, ma deve essere implementata con attenzione.

Zcash non è oggi completamente post-quantum. Tuttavia, Zcash presenta punti di forza utili: le transazioni schermate riducono l'esposizione pubblica, la rete ha una storia di aggiornamenti crittografici e la ricerca attuale, come ZIP 2005 e Project Tachyon, è già mirata ai futuri rischi quantistici.

Per i principianti, l'idea principale è semplice: la privacy odierna riduce l'esposizione futura dei dati e aggiornamenti attenti possono aiutare Zcash a muoversi verso una sicurezza più forte nell'era quantistica senza sacrificare l'usabilità.

## Pagine correlate

- [Zcash è post-quantum?](/zcash-tech/is-zcash-post-quantum) - Cosa ha modificato Ironwood, cosa è ancora esposto e una tabella di stato datata
- [Pool schermati](/using-zcash/shielded-pools) - Come le transazioni schermate di Zcash proteggono i dettagli delle transazioni
- [Halo](/zcash-tech/halo) - Il sistema di prova di Zcash senza una configurazione fidata
- [ZKP e zk-SNARKs](/zcash-tech/zk-snarks) - Come funzionano le prove a conoscenza zero in Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - Come funziona la divulgazione selettiva per Zcash schermato
- [Asset schermati di Zcash](/zcash-tech/zcash-shielded-assets) - Futuri asset schermati e supporto per asset privati
- [La privacy come principio fondamentale](/start-here/who-can-see-your-zcash-payment) - Perché la privacy finanziaria è importante

## Riferimenti

- [NIST: primi standard finalizzati di cifratura post-quantum](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Progetto di crittografia post-quantum del NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: recuperabilità quantistica di Orchard](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Specifiche del protocollo Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Libro di Halo 2](https://zcash.github.io/halo2/)

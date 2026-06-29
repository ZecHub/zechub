<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sicurezza Post-Quantistica in Zcash

## TL;DR

- I computer quantistici sono un rischio futuro perché potrebbero violare alcune forme di crittografia a chiave pubblica attualmente usate dalle blockchain.
- "Post-quantistico" indica una crittografia che gira su computer ordinari ma è progettata per resistere agli attacchi dei futuri computer quantistici.
- Zcash non è ancora completamente post-quantistica oggi.
- L'utilizzo Shielded di Zcash riduce la quantità di dati pubblici sulle transazioni che futuri attaccanti potranno analizzare, ma l'uso Shielded non equivale a piena resistenza quantistica.
- Zcash si sta preparando attraverso ricerca, ZIP e proposte di aggiornamento come ZIP 2005 e Project Tachyon.
- Una migrazione post-quantistica sicura deve proteggere simultaneamente i fondi, la privacy, i wallet, le exchange e le regole di consenso.

## Cos'è il Calcolo Quantistico?

Un computer normale memorizza le informazioni come bit. Ogni bit vale `0` oppure `1`.

Un computer quantistico utilizza bit quantistici, chiamati qubit. I qubit possono essere sfruttati da algoritmi speciali che risolvono certi problemi matematici molto più velocemente dei computer normali.

Questo non significa che un computer quantistico sia più veloce in tutto. Il rischio è specifico. Alcune forme di crittografia si basano su problemi matematici molto difficili per i computer normali ma molto più accessibili per un computer quantistico sufficientemente potente.

Per le blockchain, l'esempio più importante è la crittografia a chiave pubblica. Le chiavi pubbliche e le firme digitali vengono usate per dimostrare che un utente è autorizzato a spendere monete.

## Perché le Blockchain Se Ne Preoccupano

Le blockchain utilizzano la crittografia per diversi scopi:

| Strumento crittografico | Funzione | Impatto quantistico |
| --- | --- | --- |
| Firme digitali | Dimostrano che il proprietario ha autorizzato una spesa | Alto rischio per i sistemi comuni a curve ellittiche |
| Funzioni hash | Costruiscono indirizzi, impegni, alberi di Merkle e sfide | Rischio minore, ma i margini di sicurezza contano |
| Prove a conoscenza zero | Dimostrano la validità delle transazioni Shielded senza rivelare i dettagli | Dipende dal sistema di prove e dalle assunzioni |
| Accordo di chiave | Aiuta i wallet a cifrare i dati delle note per i destinatari | Richiede una revisione attenta nel modello di minaccia quantistica |

Un computer quantistico sufficientemente potente potrebbe minacciare molti schemi di firma oggi in uso, incluse le firme a curve ellittiche. Questo è rilevante perché è la firma che consente alla rete di sapere che una transazione è stata autorizzata dalla chiave corretta.

Le funzioni hash sono diverse. L'algoritmo di Grover può velocizzare la ricerca a forza bruta, ma non viola le funzioni hash nello stesso modo diretto. Margini di sicurezza maggiori possono essere d'aiuto.

## Cos'è la Crittografia Post-Quantistica?

La crittografia post-quantistica è una crittografia progettata per restare sicura sia contro i computer normali sia contro i futuri computer quantistici.

Non significa che la crittografia utilizzi un computer quantistico. Significa che il sistema si basa su diversi problemi matematici difficili.

Nel 2024, il NIST ha pubblicato i primi standard post-quantistici finalizzati:

- **ML-KEM** per la cifratura a chiave
- **ML-DSA** per le firme digitali
- **SLH-DSA** per le firme digitali basate su hash

Questi standard rappresentano una tappa importante, ma una blockchain non può semplicemente sostituire un algoritmo con un altro dall'oggi al domani. Regole di consenso, wallet, hardware wallet, dimensioni delle transazioni, commissioni e privacy devono essere tutti considerati.

## Come il Rischio Quantistico Si Manifesta On-Chain

Un modo semplice per comprendere il rischio è il seguente:

1. Un utente crea una coppia di chiavi.
2. La chiave pubblica o i dati della firma possono apparire on-chain.
3. Un futuro attaccante quantistico potrebbe essere in grado di usare quel materiale pubblico per risalire alla chiave privata.
4. Se dei fondi sono ancora controllati da quella chiave, potrebbero essere a rischio.

Le blockchain Transparent espongono molte informazioni per design. Indirizzi, importi e collegamenti tra transazioni sono pubblici. Il materiale della chiave pubblica può inoltre diventare visibile quando le monete vengono spese.

Questo è uno dei motivi per cui il riutilizzo degli indirizzi è dannoso. Il riutilizzo fornisce agli osservatori più dati da collegare oggi e ai futuri attaccanti più materiale storico da analizzare.

## Cosa Rende Zcash Diverso?

Zcash supporta sia transazioni Transparent sia transazioni Shielded.

Zcash Transparent funziona in modo più simile all'utilizzo di una blockchain pubblica in stile Bitcoin. Indirizzi, importi e relazioni tra transazioni sono visibili.

Zcash Shielded è diverso. Le transazioni Shielded utilizzano prove a conoscenza zero affinché la rete possa verificare che una transazione rispetti le regole senza rivelare mittente, destinatario o importo.

Questo conferisce a Zcash un importante vantaggio in termini di privacy:

- Meno dati delle transazioni vengono pubblicati per tutti.
- Gli utenti evitano di creare un grafo pubblico dei pagamenti rimanendo Shielded.
- I futuri osservatori hanno meno storico finanziario pubblico da analizzare.
- La divulgazione selettiva può avvenire tramite Viewing Key invece che tramite registrazioni pubbliche per impostazione predefinita.

Tuttavia, Zcash Shielded non è automaticamente post-quantistico. I pool Shielded dipendono ancora da assunzioni crittografiche. L'autorizzazione alla spesa, gli impegni sulle note, i nullifier, i sistemi di prove, la cifratura e le chiavi dei wallet necessitano tutti di una revisione attenta.

In breve:

> L'utilizzo Shielded riduce l'esposizione pubblica, ma Zcash necessita comunque di aggiornamenti post-quantistici deliberati.

## Mappa dei Rischi di Zcash

| Area | Spiegazione per principianti | Preoccupazione post-quantistica |
| --- | --- | --- |
| Indirizzi Transparent | Indirizzi pubblici e grafo pubblico delle transazioni | Rischi simili ad altre blockchain Transparent |
| Autorizzazione alla spesa | La prova che un utente è autorizzato a spendere | Gli schemi di firma potrebbero necessitare sostituzione o migrazione |
| Note Shielded | Registrazioni private di valore nei pool Shielded | Alcuni componenti potrebbero necessitare nuove assunzioni o strumenti di recupero |
| ZK-SNARKs | Prove che le transazioni Shielded sono valide | Le assunzioni del sistema di prove necessitano revisione |
| Scansione del wallet | Come i wallet trovano e decifrano le note ricevute | L'accordo di chiave e la cifratura delle note necessitano revisione |
| Migrazione | Spostamento dei fondi verso una crittografia più sicura | Deve evitare sia la perdita di fondi sia le fughe di privacy |

## Come si sta Preparando Zcash

### Zcash Ha un Processo di Aggiornamento della Rete

Zcash ha già modificato la sua crittografia in passato. Sapling ha reso le transazioni Shielded più facili da usare. NU5 ha introdotto Orchard, gli Unified Address e Halo 2.

Questo è rilevante perché la preparazione post-quantistica non è una patch software di una riga. Richiede aggiornamenti coordinati della rete, modifiche ai wallet, audit e tempo per consentire agli utenti di migrare.

I precedenti aggiornamenti di Zcash dimostrano che l'ecosistema ha esperienza nel passaggio da schemi crittografici più vecchi a design più recenti.

### Halo e Orchard Hanno Ridotto le Assunzioni Precedenti

Halo 2 è utilizzato da Orchard, il moderno pool Shielded di Zcash. Un miglioramento importante è che Halo ha eliminato la necessità di un trusted setup per il sistema di prove di Orchard.

Questo non equivale a sicurezza post-quantistica. È comunque rilevante perché dimostra che Zcash è in grado di sostituire i principali mattoni crittografici quando sono disponibili design migliori.

### ZIP 2005 Si Concentra sulla Recuperabilità Quantistica

ZIP 2005 si intitola "Orchard Quantum Recoverability". Propone modifiche intese ad aiutare gli utenti di Orchard a recuperare o migrare i fondi nel caso in cui gli attacchi quantistici contro le assunzioni precedenti diventino pratici.

La recuperabilità non equivale alla piena sicurezza post-quantistica. È più circoscritta ma comunque utile:

- La piena sicurezza post-quantistica cerca di impedire che gli attacchi quantistici abbiano successo.
- La recuperabilità offre agli utenti onesti un percorso migliore se la crittografia precedente dovesse diventare insicura.

Per i principianti, si può pensare a questo come a un piano di uscita di emergenza. Non sostituisce l'intero edificio, ma aiuta le persone a lasciare il vecchio locale in sicurezza se la vecchia serratura dovesse indebolirsi.

### Project Tachyon Guarda verso Miglioramenti di Protocollo più Ampi

Project Tachyon è una proposta di aggiornamento di Zcash incentrata su scala, sincronizzazione e crescita dello stato. Il suo sito pubblico afferma che la proposta mira a ridurre le dimensioni delle transazioni, limitare la crescita dello stato dei validatori e ottenere piena privacy post-quantistica come effetto collaterale.

Poiché Tachyon è una proposta, dipende ancora da lavoro ingegneristico, revisione e approvazione della comunità prima dell'attivazione. Va compreso come parte della direzione di ricerca e aggiornamento attiva di Zcash, non come una funzionalità già disponibile per gli utenti oggi.

### La Ricerca e gli Standard Stanno Avanzando

Anche il mondo crittografico più ampio si sta muovendo. Gli standard post-quantistici del NIST offrono agli implementatori basi più solide per firme e accordo di chiave. I ricercatori in prove a conoscenza zero continuano a studiare sistemi di prove che possano resistere alle assunzioni quantistiche.

Zcash può beneficiare di questo lavoro, ma deve comunque adattarlo a una blockchain che preserva la privacy.

## Possibili Approcci a Futuri Aggiornamenti

### Autorizzazione alla Spesa Post-Quantistica

Zcash potrebbe eventualmente necessitare di un'autorizzazione alla spesa che non dipenda da schemi di firma vulnerabili al quantum computing.

Ciò potrebbe utilizzare firme post-quantistiche, firme ibride o un altro design. Un design ibrido usa sia controlli classici sia post-quantistici durante un periodo di transizione, in modo che il sistema non dipenda da una sola assunzione.

La sfida è la dimensione e il costo. Le firme post-quantistiche possono essere più grandi delle firme odierne, il che influisce su dimensione delle transazioni, larghezza di banda, commissioni, wallet mobile e hardware wallet.

### Nuovi Formati di Indirizzo e di Chiave

Le nuove forme di crittografia richiedono spesso nuove chiavi e nuovi indirizzi. Gli utenti avrebbero bisogno di un percorso di migrazione chiaro dai vecchi formati a quelli più sicuri.

La migrazione dovrebbe essere semplice nei wallet. La maggior parte degli utenti non dovrebbe dover comprendere ogni dettaglio crittografico per restare al sicuro.

### Migrazione con Preservazione della Privacy

La migrazione è particolarmente delicata per Zcash. Se molti utenti spostano fondi dai vecchi pool ai nuovi seguendo schemi evidenti, la migrazione stessa potrebbe rivelare informazioni.

Un buon piano di migrazione deve proteggere:

- I fondi degli utenti
- La privacy degli utenti
- La compatibilità dei wallet
- Il supporto delle exchange
- Il supporto degli hardware wallet
- La sicurezza del consenso di rete

### Revisione del Sistema di Prove Post-Quantistico

Sostituire le firme non è sufficiente. Il design Shielded di Zcash dipende anche da prove a conoscenza zero e impegni.

Il lavoro futuro potrebbe richiedere la revisione o la sostituzione di:

- Assunzioni degli ZK-SNARKs
- Impegni polinomiali
- Hash di sfida Fiat-Shamir
- Impegni sulle note
- Costruzione dei nullifier
- Assunzioni degli alberi di Merkle
- Cifratura delle note e comportamento delle Viewing Key

Alcuni componenti potrebbero essere accettabili con parametri adeguati. Altri componenti potrebbero richiedere nuovi design.

## Esempi per Principianti

### Esempio 1: La Vecchia Serratura

Immagina una cassaforte con una serratura robusta oggi. Uno strumento inventato in futuro potrebbe aprire quella vecchia serratura rapidamente.

La crittografia post-quantistica è come sostituire la serratura con un design che il nuovo strumento non dovrebbe essere in grado di forzare.

Per una blockchain, sostituire la serratura è difficile perché ogni wallet, nodo, exchange e dispositivo hardware deve comprendere il nuovo design.

### Esempio 2: La Cassetta delle Ricevute Pubblica

I dati delle blockchain Transparent sono come mettere ogni ricevuta in una cassetta pubblica per sempre. Anche se nessuno può leggere ogni schema oggi, gli strumenti futuri potrebbero apprendere di più in seguito.

Zcash Shielded cerca di non pubblicare quelle ricevute in primo luogo. Questo aiuta la privacy a lungo termine, ma la serratura che protegge il sistema Shielded deve comunque essere rivista in ottica quantistica.

### Esempio 3: Il Piano di Uscita

La recuperabilità è come pianificare una via di fuga prima che scoppi un incendio. Speri di non doverla usare, ma è molto più sicuro progettarla in anticipo che durante un'emergenza.

ZIP 2005 si inserisce in questa logica per le note di Orchard.

## Cosa Possono Fare gli Utenti Oggi

Gli utenti non devono farsi prendere dal panico. Grandi computer quantistici pubblici capaci di violare la crittografia blockchain attualmente in uso non sono disponibili oggi.

Le buone abitudini sono comunque utili:

- Preferire l'uso Shielded di Zcash quando possibile.
- Evitare il riutilizzo degli indirizzi.
- Mantenere i wallet aggiornati.
- Seguire gli annunci di aggiornamento della rete Zcash.
- Monitorare i ZIP e le indicazioni dei wallet riguardo a recuperabilità o migrazione.
- Non assumere che l'attività Transparent sia privata.
- Non spostare fondi basandosi su voci; attendere indicazioni chiare dagli sviluppatori Zcash e dai team dei wallet di fiducia.

## Sfide

Gli aggiornamenti post-quantistici sono difficili per ogni blockchain.

Le sfide comuni includono:

- Chiavi e firme più grandi
- Transazioni più grandi
- Costi di verifica più elevati
- Maggiore utilizzo di larghezza di banda
- Nuovi audit di sicurezza
- Supporto degli hardware wallet
- Prestazioni dei wallet mobile
- Integrazione con exchange e custodia
- Fughe di privacy durante la migrazione
- Accordo della comunità sulle modifiche al consenso

Per Zcash, la parte più difficile non è solo mantenere le monete spendibili. La parte difficile è mantenere le monete spendibili preservando al contempo la privacy che rende Zcash diverso.

## Riepilogo

I computer quantistici potrebbero eventualmente minacciare alcune forme di crittografia usate dalle blockchain. La crittografia post-quantistica è la risposta a lungo termine, ma deve essere distribuita con cura.

Zcash non è completamente post-quantistica oggi. Tuttavia, Zcash ha punti di forza utili: le transazioni Shielded riducono l'esposizione pubblica, la rete ha una storia di aggiornamenti crittografici e la ricerca attuale, come ZIP 2005 e Project Tachyon, è già orientata ai futuri rischi quantistici.

Per i principianti, l'idea principale è semplice: la privacy oggi riduce l'esposizione futura dei dati, e aggiornamenti attenti possono aiutare Zcash a muoversi verso una sicurezza più solida nell'era quantistica senza sacrificare l'usabilità.

## Pagine Correlate

- [Pool Shielded](/using-zcash/shielded-pools) - Come le transazioni Shielded di Zcash proteggono i dettagli delle transazioni
- [Halo](/zcash-tech/halo) - Il sistema di prove di Zcash senza trusted setup
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - Come funzionano le prove a conoscenza zero in Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - Come funziona la divulgazione selettiva per Zcash Shielded
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Futuri asset Shielded e supporto agli asset privati
- [La Privacy come Principio Fondamentale](/privacy/privacy-as-a-core-principle) - Perché la privacy finanziaria è importante

## Riferimenti

- [NIST: Primi standard post-quantistici di cifratura finalizzati](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Post-Quantum Cryptography Project](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Specifica del Protocollo Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 Book](https://zcash.github.io/halo2/)

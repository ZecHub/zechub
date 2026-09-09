<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Visita il sito web](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## Dichiarazione di missione

Valar Group è un'organizzazione ingegneristica indipendente focalizzata sullo scaling di Zcash, sul rafforzamento della governance dei possessori di monete e sul miglioramento della privacy, delle prestazioni e della resilienza a lungo termine del protocollo.

Il suo lavoro si concentra sull'infrastruttura a livello di protocollo: voto privato dei detentori di token, software per nodi completi ad alte prestazioni, tecnologia di sincronizzazione dei wallet e aggiornamenti di rete che rendono Zcash schermato più utilizzabile su larga scala.

L'organizzazione mira a offrire ai possessori di ZEC un modo per esprimere privatamente le proprie preferenze, agli operatori dei nodi software più veloce e più capace, e ai wallet strumenti che preservano la privacy degli utenti riducendo al contempo il costo della partecipazione alla rete.

## Contesto

Valar Group è guidato da Dev Ojha (ValarDragon), cofondatore di Osmosis e membro del team che ha lanciato Cosmos. Nell'ultimo decennio ha lavorato su zk-SNARKs, consenso BFT e sistemi DeFi in produzione.

Il lavoro pubblico del gruppo in Zcash è diventato rilevante quando l'ecosistema si è orientato verso team di protocollo indipendenti dopo la riorganizzazione dello sviluppo core del 2026. Valar Group è emerso come una delle organizzazioni che costruiscono la prossima generazione di infrastruttura Zcash insieme a Project Tachyon, Shielded Labs, ZODL e Zcash Foundation.

Un tema ricorrente nel suo lavoro è che le proprietà di privacy di Zcash dovrebbero estendersi oltre i pagamenti. Se ai possessori viene chiesto di votare su emissione, tempi dei blocchi o ambito degli aggiornamenti di rete, dovrebbero poterlo fare da saldi schermati senza rivelare identità, saldi o voti individuali. Questo requisito ha portato Valar Group a progettare e distribuire una chain dedicata al voto dei possessori di monete.

Lo stesso background in scaling e crittografia ha inoltre plasmato il suo lavoro sui nodi e sulla sincronizzazione. Blocchi più veloci, sincronizzazione dei wallet più leggera e un nodo completo più capace sono considerati prerequisiti per una moneta privata utilizzabile su scala di rete di pagamento, anziché soltanto come riserva di valore.

## Visione

I materiali pubblici e il lavoro sui progetti di Valar Group indicano una rete Zcash in grado di:

- Supportare il voto privato e verificabile dei possessori di monete come processo di governance ripetibile.
- Scalare i pagamenti proof-of-work senza sacrificare la privacy schermata.
- Ridurre i colli di bottiglia di wallet e nodi tramite PIR, pruning e propagazione dei blocchi più rapida.
- Aumentare la diversità delle implementazioni distribuendo uno stack indipendente per nodi completi.
- Contribuire alla preparazione post-quantum e agli aggiornamenti del protocollo sottoposti a revisione formale.

L'organizzazione opera come contributore indipendente, non come proprietaria del protocollo. Le modifiche al protocollo passano comunque attraverso ZIP, implementazione, revisione e segnalazione della comunità. Il ruolo di Valar Group è progettare, implementare, gestire e rendere open source i sistemi che rendono pratici tali processi.

## Aree strategiche

Il lavoro di Valar Group si concentra in quattro aree.

### Governance privata dei possessori di monete

Zcash non utilizza il controllo automatico on-chain del protocollo. I sondaggi dei possessori di monete sono segnali consultivi che confluiscono in un più ampio processo di consenso approssimativo. Valar Group ha creato la Tokenholder Voting Chain affinché tali segnali possano essere raccolti dai saldi schermati senza esporre l'identità del votante o l'entità del singolo voto.

Il progetto attuale utilizza:

- Una chain applicativa dedicata basata su Cosmos SDK per orchestrare le sessioni di voto.
- Prove snapshot rispetto a note Ironwood spendibili.
- Crittografia omomorfica degli importi di voto.
- Private Information Retrieval per prove di non-appartenenza dei nullifier.
- Un multisig di coordinamento e un'autorità elettorale distribuita.

L'obiettivo è sostituire i precedenti processi di voto dei possessori di token con un sistema riutilizzabile, verificato e integrabile nei wallet, che altre organizzazioni possano gestire e scrutinare indipendentemente.

### Software per nodi e scaling della rete

Valar Group collabora con Project Tachyon su Zakura, un nodo completo Zcash costruito a partire dal codebase Zebra. Zakura è posizionato come nodo ad alte prestazioni per operatori che necessitano di sincronizzazione iniziale più rapida, pruning, avvio tramite snapshot e un percorso di compatibilità per gli ex utenti di `zcashd`.

Il lavoro di scaling correlato include:

- Tempi dei blocchi obiettivo più rapidi, inclusi esperimenti con blocchi da 25 secondi sulle testnet NU7.
- Migliore propagazione peer-to-peer dei blocchi.
- Funzionalità per nodi completi pensate per mantenere Zcash utilizzabile con la crescita dell'attività schermata.

### Infrastruttura per wallet e sincronizzazione

Storicamente, i wallet schermati devono analizzare grandi quantità di dati della chain. Valar Group sviluppa sistemi PIR affinché i wallet possano recuperare le prove necessarie senza scaricare set completi di nullifier né rivelare quali note interessano loro.

Questo lavoro appare sia nello stack di voto sia nella ricerca più ampia sulla sincronizzazione dei wallet. Il gruppo ha inoltre contribuito al lavoro sull'affidabilità lato wallet, inclusi l'invio di transazioni a più server e miglioramenti nella selezione dei server utilizzati nello stack mobile di ZODL.

### Aggiornamenti del protocollo e coordinamento dell'ecosistema

Valar Group è stata una delle organizzazioni che si sono impegnate pubblicamente nella risposta Ironwood dopo la vulnerabilità del circuito Orchard. Ironwood ha introdotto un nuovo pool schermato, ha sigillato il pool Orchard originale dietro un turnstile e ha ripristinato un percorso per verificare indipendentemente l'offerta circolante. Valar Group ha lavorato con Project Tachyon, Shielded Labs, ZODL e Zcash Foundation su architettura, implementazione delle regole di consenso e coordinamento dell'ecosistema.

Il gruppo partecipa inoltre alla definizione dell'ambito di NU7, alla gestione delle testnet e alla modifica degli ZIP. Dev Ojha è indicato come editor ZIP.

## Iniziative attuali

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote è il protocollo di governance privata di Valar Group per Zcash. I possessori votano con saldi schermati senza rivelare importi individuali né collegare i voti alle identità.

Le proprietà principali includono:

- Una sessione online per votare, anziché un processo commit/reveal di più giorni.
- Una firma snapshot compatibile con Keystone che delega i diritti di voto a una hotkey senza mettere a rischio i fondi.
- Importi di voto crittografati tramite ElGamal omomorfico.
- Query PIR affinché i nullifier non vengano divulgati durante le prove snapshot.
- Suddivisione dei voti e inoltro ritardato per ridurre la correlazione temporale.
- Scrutini verificabili pubblicamente.

Nell'agosto 2026, Valar Group e Project Tachyon hanno utilizzato questo stack per il voto dei possessori di monete su NU7. L'idoneità richiedeva ZEC schermato spendibile in Ironwood all'altezza mainnet 3.459.350. Le votazioni si sono svolte dal 25 agosto al 14 settembre 2026, con una soglia di partecipazione di 1.000.000 ZEC affinché il risultato fosse considerato rappresentativo. Le domande riguardavano il livellamento dell'emissione NSM, la tempistica della riemissione, la deprecazione di Sprout/v4, tempi dei blocchi da 25 secondi e ambito/prontezza di NU7.

Il coordinamento della chain predefinita utilizza un multisig 2-su-5 tra Project Tachyon, Valar Group, Zcash Foundation, ZODL e Shielded Labs. Un insieme separato di validatori detiene le quote delle chiavi di decrittazione per ogni sessione. Nessun singolo validatore può recuperare i voti individuali; per produrre lo scrutinio finale è richiesta una soglia di validatori.

Le interfacce pubbliche per operatori e revisori includono:

- [Configurazione della chain di voto](https://setup.valargroup.org)
- [Revisore dello scrutinio](https://tally.valargroup.org)
- [Interfaccia del coordinatore](https://svote.valargroup.org/)
- [Configurazione del server PIR](https://setup-pir.valargroup.org)
- [Documentazione Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura è un nodo completo Zcash sviluppato in collaborazione tra Valar Group e Project Tachyon. Deriva da Zebra e aggiunge sincronizzazione più rapida, pruning nativo, avvio tramite snapshot, percorsi di compatibilità con `zcashd` e lavoro sperimentale P2P ad alte prestazioni.

Zcash Foundation ha accolto pubblicamente il progetto, osservando che Zebra è stato rilasciato con licenze permissive affinché team indipendenti potessero farne fork e migliorarlo, e che diversi contributori di Zakura avevano già contribuito upstream a Zebra.

### Private Information Retrieval

Valar Group mantiene servizi e librerie PIR per due problemi correlati:

- Dimostrare che una nota non è stata spesa a un'altezza snapshot senza rivelarne il nullifier.
- Ridurre i dati che i wallet devono recuperare per sincronizzarsi o votare.

Si tratta di una dipendenza fondamentale di Shielded Vote e di un elemento costitutivo per un'esperienza utente dei wallet privati più rapida.

### Ingegneria Ironwood e NU7

Valar Group ha partecipato all'impegno congiunto per Ironwood del giugno 2026 e ha contribuito all'implementazione delle regole di consenso e al lavoro sui client attorno al nuovo pool. Ha inoltre gestito l'infrastruttura della testnet NU7, inclusi script di partecipazione e nodi pubblici ospitati su `nu7.valargroup.dev`.

### Librerie di protocollo open source

L'organizzazione GitHub `valargroup` pubblica lo stack di voto e nodi come repository pubblici, inclusi:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — chain specifica dell'applicazione per il voto privato on-chain
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — libreria lato client per il voto schermato, prove, archiviazione e FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — circuiti Halo2 per delega e voto
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR per prove di non-appartenenza dei nullifier
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — configurazione per la scoperta dei servizi wallet
- [`zebra`](https://github.com/valargroup/zebra) — fork di sviluppo Zebra/Zakura di Valar Group

## I team

Valar Group è guidato da **Dev Ojha** (ValarDragon). Le pagine pubbliche del team associate a Zakura elencano i seguenti ingegneri affiliati a Valar:

- **Dev Ojha** — Maintainer; guida Valar Group. Le aree di interesse includono il voto dei possessori di token, il lavoro post-quantum, Zakura e PIR.
- **Roman Akhtariev** — Ingegnere principale. In precedenza ingegnere principale presso Osmosis; il suo lavoro include sincronizzazione PIR dei wallet, voto dei possessori di token e prestazioni di sincronizzazione di Zakura.
- **Evan Forbes** — Ingegnere principale. Ex responsabile del consenso e ingegnere fondatore di Celestia; il suo lavoro include la preparazione a tempi dei blocchi più rapidi e uno stack P2P QUIC.
- **Adam Tucker** — Ingegnere principale. Ex ingegnere di Osmosis; il suo lavoro include il voto dei possessori di token con Roman Akhtariev, affidabilità dei wallet e integrazione Ironwood nell'intero stack.

Zakura stessa è mantenuta congiuntamente a Project Tachyon, guidato da Sean Bowe. Le due organizzazioni collaborano strettamente ma restano separate.

## Struttura organizzativa

Valar Group opera come organizzazione ingegneristica indipendente. Non fa parte di Zcash Foundation, ZODL, Shielded Labs o Zcash Community Grants.

Nel design della chain di voto, Valar Group è una delle cinque organizzazioni coordinatrici. Tale ruolo è un parametro del sistema di voto, non una pretesa di controllo esclusivo sulla governance di Zcash. Altri team possono gestire validatori, creare chain di voto alternative o verificare gli scrutini pubblicati tramite gli strumenti pubblici.

Ulteriori informazioni sul tipo di entità legale, sulla composizione del consiglio e sulla governance interna non sono state pubblicate con lo stesso livello di dettaglio delle organizzazioni Zcash più datate.

## Finanziamento

Dichiarazioni pubbliche sul forum della metà del 2026 descrivono Valar Group e Project Tachyon come finanziati tramite donazioni private. A differenza del round di venture disclosure di ZODL o degli annunci pubblici di donazioni di Shielded Labs, Valar Group non ha pubblicato un elenco dettagliato dei donatori né un calendario delle sovvenzioni.

Questo modello di finanziamento mantiene il team indipendente dallo storico percorso Development Fund / ricompense dei blocchi, ma comporta anche minore visibilità pubblica sulle dimensioni del budget e sulle fonti di finanziamento.

## Ruolo nell'ecosistema Zcash

Valar Group è una delle organizzazioni di protocollo indipendenti formatesi attorno al panorama di sviluppo di Zcash del 2026. In tale panorama:

- La **Zcash Foundation** continua la gestione della comunità e Zebra.
- **ZODL** si concentra sul prodotto wallet e sulla continuazione del protocollo dopo la separazione da ECC.
- **Shielded Labs** si concentra su sostenibilità, sicurezza e ricerca sul consenso.
- **Project Tachyon** si concentra su ricorsione, verifica formale e scalabilità a lungo raggio.
- **Valar Group** si concentra sul voto privato dei possessori di monete, sulle prestazioni dei nodi, sul PIR e sull'ingegneria necessaria per gestire questi sistemi in produzione.

Il suo contributo distintivo consiste nel rendere operativa la governance schermata. Il voto NU7 è il primo utilizzo importante di questo stack: i possessori dimostrano saldi Ironwood, wallet come Zodl e Vizor possono integrare il flusso e chiunque può verificare lo scrutinio senza sapere come ha votato un particolare possessore.

Il lavoro sui nodi e sulla sincronizzazione dello stesso team è destinato a sostenere l'altra metà di questo quadro. Il voto privato è meno utile se i wallet non riescono a sincronizzarsi, i nodi non riescono a tenere il passo o gli aggiornamenti non possono essere implementati rapidamente. Valar Group considera governance, software dei nodi e infrastruttura dei wallet come un unico problema: rendere Zcash privato utilizzabile su larga scala senza concentrare il potere operativo in un'unica organizzazione.

## Risorse

- [Sito web di Valar Group](https://valargroup.dev/)
- [GitHub di Valar Group](https://github.com/valargroup)
- [Documentazione Shielded Vote](https://valargroup.gitbook.io/shielded-vote-docs)
- [Configurazione della chain di voto](https://setup.valargroup.org)
- [Revisore dello scrutinio](https://tally.valargroup.org)
- [Interfaccia del coordinatore](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura: informazioni / team](https://zakura.com/about/)
- [Discussione del forum sul voto dei possessori di monete NU7](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Discussione del forum sulla Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)

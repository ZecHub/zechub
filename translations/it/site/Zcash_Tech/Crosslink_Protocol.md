<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Protocollo Crosslink

## TL;DR

* Il protocollo Crosslink è un design proposto per la fase ibrida Proof-of-Work/Proof-of-Stake (PoW/PoS) di Zcash. Integra PoW con un protocollo di Byzantine Fault Tolerance (BFT), consentendo una finalità garantita finché PoW o PoS rimangono sicuri.
* Il PoS ibrido introduce notai che convalidano i blocchi in base allo ZEC messo in staking: inizialmente statici, in seguito eletti in base allo ZEC messo in staking.
* Crosslink mira a fornire due registri: un **registro finalizzato (LOG_fin)** per la sicurezza contro i rollback, e un **registro a latenza inferiore (LOG_ba)** che lo estende di non più di *L* blocchi.
* Una **Modalità di Sicurezza** si attiva se il registro finalizzato rimane indietro di più di *L* blocchi: il PoW continua, ma le attività economiche si fermano finché il problema non viene risolto.
* Nel tempo, i validatori PoS riceveranno una quota crescente delle ricompense, riducendo i guadagni dei miner PoW; il protocollo introduce i cambiamenti gradualmente.
* Il protocollo è in fase di sviluppo da parte di Shielded Labs, con una roadmap per integrare Crosslink 2* nel client Zebra di Zcash.

## Spiegazione di base

### Introduzione: Zcash Hybrid PoS e il Protocollo Crosslink

Il Protocollo Crosslink rappresenta uno sviluppo fondamentale nell'evoluzione di Zcash, orientandolo verso un modello **Hybrid Proof-of-Stake (PoS)** e **Proof-of-Work (PoW)**. Il PoW tradizionale, pur essendo affidabile nel garantire la sicurezza della rete, è criticato per il consumo energetico e per i rischi di centralizzazione associati al mining industriale. Crosslink introduce un sistema ibrido che unisce la robustezza comprovata del PoW con i vantaggi di efficienza e governance del PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Questa transizione è in linea con le tendenze globali dell'innovazione blockchain, in cui i progetti stanno passando a meccanismi ambientalmente sostenibili e decentralizzati. Il modello di consenso duale di Crosslink garantisce che Zcash mantenga le sue solide garanzie crittografiche di privacy, evolvendosi al contempo per affrontare le sfide contemporanee.

L'approccio Hybrid Proof-of-Stake (PoS) combina il tradizionale Proof-of-Work (PoW) con il PoS, con l'obiettivo di affrontare vulnerabilità come gli attacchi del 51% mantenendo la decentralizzazione e riducendo il consumo energetico. Il PoS ibrido introduce notai che convalidano i blocchi in base allo ZEC messo in staking. Questo meccanismo è progettato per migliorare la sicurezza della catena e la convalida dei checkpoint, offrendo un'alternativa più robusta ai sistemi puramente PoW.

### Perché Hybrid PoS/PoW come primo test?

* Consente di fare progressi verso il PoS puro.
* Abilita casi d'uso simultanei di mining e staking e la convergenza degli ecosistemi.
* Mitiga possibili problemi di sicurezza del protocollo PoS finché non avrà una maggiore quota di stake dei validatori e maggiore fiducia.
* L'approccio generale è già stato dimostrato da Ethereum in produzione.

### Che cos'è Crosslink

Il protocollo Crosslink è un design proposto per la fase ibrida Proof-of-Work/Proof-of-Stake (PoW/PoS) di Zcash. Integra il PoW con un protocollo di Byzantine Fault Tolerance (BFT), consentendo una finalità garantita finché PoW o PoS rimangono sicuri. Il design mira a rafforzare la sicurezza e la decentralizzazione della rete incorporando la convalida tramite staking, mantenendo al contempo la partecipazione dei miner. Una caratteristica chiave della proposta, chiamata Crosslink 2, semplifica l'architettura unificando i proponenti BFT e i miner. Questo approccio semplificato riduce al minimo i cambiamenti strutturali e consente l'uso di un livello BFT "dummy", rendendo più semplice prototipare e distribuire il sistema mantenendo elevati standard di sicurezza.

Il piano di implementazione include una roadmap con costi di ingegneria stimati per integrare Crosslink 2* nel client Zebra di Zcash. Questa distribuzione graduale si concentra sul bilanciamento degli incentivi tra le parti interessate, sulla riduzione delle interruzioni e sull'allineamento con gli obiettivi di Zcash in termini di scalabilità, usabilità e decentralizzazione. La crescente fiducia nelle robuste proprietà di sicurezza del protocollo ne rafforza ulteriormente il potenziale come passaggio chiave nell'evoluzione di Zcash. Affrontando l'efficienza energetica e migliorando i meccanismi di consenso, Crosslink offre una soluzione orientata al futuro per le sfide in evoluzione della blockchain. Per maggiori dettagli, consulta il [repository GitHub](https://github.com/ShieldedLabs/crosslink-deployment) e il [Forum della Community di Zcash](https://forum.zcashcommunity.com).

### Obiettivi e finalità di Crosslink

Il Protocollo Crosslink è progettato per affrontare diversi obiettivi strategici cruciali per il futuro di Zcash:

1. **Decentralizzazione**:
   * Incorporando il PoS, Zcash riduce la dipendenza dall'hardware PoW specializzato (ASIC), che spesso concentra la potenza di mining nelle mani di pochi grandi operatori.
   * Il PoS consente la partecipazione di una comunità più ampia, in cui i detentori di monete mettono in staking i propri asset per proteggere la rete, garantendo un consenso più distribuito.
   * Introducendo la convalida tramite staking, il protocollo garantisce che i partecipanti economici svolgano un ruolo attivo nel consenso, riducendo la dipendenza dal solo mining.
2. **Governance migliorata**:
   * I detentori di monete ottengono diritti di voto tramite lo staking, permettendo loro di influenzare le decisioni sugli aggiornamenti della rete, sull'allocazione dei fondi e sulle priorità dell'ecosistema. Questo meccanismo democratico allinea l'evoluzione del protocollo con gli interessi della comunità.
3. **Efficienza energetica**:
   * Il passaggio parziale al PoS riduce significativamente il fabbisogno energetico, allineando Zcash con le iniziative globali di sostenibilità. Il PoS è intrinsecamente meno intensivo in termini di risorse rispetto al PoW, che richiede pesanti calcoli computazionali. I sistemi ibridi mirano a ridurre il consumo energetico rispetto ai sistemi solo PoW mantenendo alti livelli di sicurezza.
4. **Sicurezza economica e sostenibilità**:
   * Combinare PoW e PoS diversifica gli incentivi economici per i partecipanti alla rete, garantendo una sicurezza solida senza fare eccessivo affidamento su un unico meccanismo.
   * Lo staking introduce anche un modello di ricompensa prevedibile per i partecipanti, creando una proposta attraente per gli investitori di lungo termine.
5. **Maggiore sicurezza**: Crosslink mira a migliorare la resilienza della rete contro gli attacchi di riorganizzazione della catena integrando il PoS accanto al PoW.

## Visuale / Analogia

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Pensa a un servizio di consegna pacchi che emette due documenti diversi per la stessa spedizione. Il primo è una scansione di tracciamento: appare rapidamente, ti dice dove molto probabilmente si trova il pacco e occasionalmente viene corretta. Il secondo è una ricevuta di consegna firmata: arriva più tardi, ma una volta esistente nessuno la mette in discussione.

Il registro a latenza inferiore è la scansione di tracciamento, mentre il registro finalizzato è la ricevuta firmata. Entrambi descrivono la stessa catena di eventi; differiscono per la rapidità con cui appaiono e per quanto sono definitivi.

La Modalità di Sicurezza è ciò che fa il deposito quando le ricevute firmate smettono di arrivare mentre le scansioni continuano ad accumularsi. I pacchi continuano a muoversi nell'edificio, ma l'ufficio smette di effettuare pagamenti basandosi solo sulle scansioni finché le firme non raggiungono il passo.

## Approfondimento

### Obiettivi di sicurezza e prestazioni di Crosslink

Il protocollo Crosslink mira a fornire due tipi di registri per Zcash: un **registro finalizzato (LOG_fin)** e un **registro a latenza inferiore (LOG_ba)**. Il registro finalizzato garantisce sicurezza contro i rollback in base ad assunzioni ragionevoli sul protocollo Byzantine Fault Tolerance (BFT) o blockchain (BC). È progettato per rimanere live e sicuro anche in caso di partizioni di rete, con una latenza leggermente superiore al doppio di quella dell'attuale blockchain di Zcash per un numero equivalente di conferme di blocco.

Il registro a latenza inferiore estende il registro finalizzato di non più di *L* blocchi. Garantisce sicurezza contro i rollback facendo affidamento sul solo protocollo blockchain e mantiene latenza e sicurezza non peggiori del modello Zcash esistente. Nel design semplificato Crosslink 2*, il registro a latenza inferiore semplifica sviluppo e adozione funzionando come una catena PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Disponibilità limitata e Modalità di Sicurezza

Crosslink incorpora una **Modalità di Sicurezza** per affrontare i rischi associati al fatto che il registro a latenza inferiore avanzi molto più rapidamente del registro finalizzato. Questo previene discrepanze, come stati degli account sbilanciati o lacune di sicurezza non verificate nelle soluzioni temporanee adottate dai fornitori di servizi. La Modalità di Sicurezza si attiva se il registro finalizzato resta indietro di più di una costante di *L* blocchi. Durante questo stato, la blockchain continua le operazioni PoW (garantendo la sicurezza di base), ma le attività economiche vengono sospese finché il problema non viene risolto. Questo meccanismo è progettato per consentire il recupero da condizioni eccezionali come attacchi gravi, supportando al contempo politiche di rollback basate sulla governance.

### Dettagli tecnici e distribuzione

Il Protocollo Crosslink è attivamente sviluppato e distribuito da Shielded Labs in collaborazione con partner chiave dell'ecosistema come Zodl. L'implementazione del protocollo include:

* L'istituzione di meccanismi di staking sicuri per i partecipanti PoS.
* La modifica della struttura delle ricompense per bilanciare gli incentivi tra miner e staker.
* La garanzia di compatibilità retroattiva e di un'esperienza utente fluida durante la transizione.
* Sistema di notai: il protocollo incorpora notai che approvano i blocchi. Inizialmente vengono usati notai statici, con transizione a un sistema dinamico in cui i notai vengono eletti in base allo ZEC messo in staking.
* Logica di attivazione: l'introduzione di Crosslink richiede modifiche alle regole di consenso di Zcash, inclusa la definizione del processo di distribuzione dello stake e l'aggiornamento delle regole del protocollo di rete per supportare il consenso ibrido.
* Distribuzione graduale: il protocollo verrà introdotto in fasi per garantire la stabilità della rete e l'adattamento della comunità. Le fasi iniziali si concentrano sull'implementazione tecnica, seguite dall'integrazione della governance per la selezione dei notai.

Puoi esplorare i dettagli tecnici e seguirne i progressi tramite il [Repository di distribuzione di Crosslink su GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

## Implicazioni pratiche

### Impatto sui ricavi dei miner PoW

Crosslink riconosce il ruolo fondamentale dei miner PoW nelle prime fasi di sviluppo di Zcash, preparandosi al contempo a un cambiamento graduale:

* **Riduzione delle ricompense per blocco**:
  * Nel tempo, i validatori PoS riceveranno una quota crescente delle ricompense, riducendo i guadagni dei miner PoW. Questa redistribuzione riflette il ruolo decrescente del PoW nel modello ibrido.
* **Transizione equa**:
  * Il protocollo introduce i cambiamenti gradualmente, garantendo ai miner tempo sufficiente per adattarsi o esplorare nuovi ruoli nell'ecosistema Zcash, come il passaggio allo staking o il contributo ad altri servizi di rete.
* **Mitigazione dei rischi di centralizzazione**:
  * I pool di staking PoS sono progettati per prevenire la concentrazione del potere, offrendo ai partecipanti più piccoli la possibilità di partecipare ad armi pari. Questo approccio inclusivo contrasta l'attuale concentrazione osservata nel mining basato su ASIC.
* I miner PoW vedranno ridursi i ricavi poiché una parte della ricompensa del blocco viene riallocata ai validatori PoS. Questa riallocazione garantisce un sistema di incentivi equilibrato, premiando sia i miner sia gli staker per la sicurezza della rete.
* È prevista una transizione graduale per mitigare l'impatto economico sui miner, promuovendo al contempo la partecipazione degli stakeholder.

Questo meccanismo di doppio consenso rafforza l'impegno di Zcash verso privacy, sostenibilità e decentralizzazione, posizionandolo come un leader orientato al futuro nello spazio blockchain.

## Errori comuni

**Leggere Crosslink come una regola di consenso già attiva**. Questa pagina descrive un design proposto con un piano di distribuzione graduale. La sua introduzione richiede modifiche alle regole di consenso di Zcash, ed è proprio a questo che servono la roadmap e il lavoro di integrazione in Zebra.

**Presumere che il PoS sostituisca il mining**. Crosslink è un design ibrido: la produzione di blocchi PoW continua accanto alla convalida tramite staking. Anche in Modalità di Sicurezza, la blockchain continua le operazioni PoW mentre le attività economiche sono sospese.

**Trattare la "finalità" come una conferma più veloce**. Il registro finalizzato è progettato per avere una latenza leggermente superiore al doppio di quella dell'attuale blockchain di Zcash per un numero equivalente di conferme di blocco. Ciò che aggiunge è la sicurezza contro i rollback, non la velocità: il registro a latenza inferiore è la vista rapida.

**Confondere i due registri**. LOG_ba non è una catena separata: estende il registro finalizzato di non più di *L* blocchi, e nel design Crosslink 2* funziona come una catena PoW.

## Pagine correlate

- [Zebra Full Node](/zcash-tech/zebra-full-node) — il client in cui è prevista l'integrazione di Crosslink 2*.
- [Nodi completi](/zcash-tech/full-nodes) — come i nodi convalidano oggi le regole di consenso, prima di qualsiasi cambiamento verso un consenso ibrido.
- [Aggiornamenti di rete](/start-here/network-upgrades) — come le modifiche alle regole di consenso raggiungono la rete Zcash.
- [Politica monetaria di Zcash](/start-here/zcash-monetary-policy) — la struttura delle ricompense per blocco che Crosslink ridistribuirebbe.

## Risorse aggiuntive

- Approfondimenti della community: [Forum della Community di Zcash - Discussioni su Crosslink](https://forum.zcashcommunity.com)
- Aggiornamenti ufficiali: [Blog di Electric Coin Company](https://electriccoin.co)
- Focus sulla sostenibilità: [Perché Hybrid PoS è importante per Zcash](https://forum.zcashcommunity.com)

  Riferimento:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>

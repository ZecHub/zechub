# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge è un bridge decentralizzato che consente l'interoperabilità tra le blockchain di Zcash (ZEC) e di Avalanche (AVAX). Questo bridge è progettato per facilitare il trasferimento fluido di ZEC sulla blockchain di Avalanche, sfruttando l'elevato throughput, le basse commissioni e i meccanismi di consenso ecosostenibili di Avalanche, preservando al contempo le caratteristiche orientate alla privacy di Zcash.

RedBridge supporta un'ampia gamma di casi d'uso, tra cui la finanza decentralizzata cross-chain (DeFi), le transazioni private e la condivisione di liquidità, offrendo ai possessori di Zcash un accesso ampliato all'ecosistema di Avalanche. Questo bridge è gestito tramite un insieme di nodi decentralizzati e un oracolo, noto come **ZavaX**, che garantisce un trasferimento dati affidabile e la verifica dei prezzi tra Zcash e Avalanche.

### Caratteristiche principali

Interoperabilità che preserva la privacy: consente agli utenti di Zcash di mantenere la privacy mentre utilizzano le applicazioni DeFi su Avalanche.
Oracolo decentralizzato ZavaX: integra un sistema di oracoli per garantire dati di prezzo accurati su ZEC/AVAX, consentendo operazioni cross-chain trustless.
Scalabile ed ecosostenibile: utilizza il modello di consenso di Avalanche, garantendo transazioni ad alta velocità con un impatto ambientale minimo.
Supporto per DeFi e DApp: i possessori di Zcash possono ora partecipare a varie piattaforme DeFi su Avalanche senza compromettere la privacy.

### Componenti tecnici

**ZavaX Oracle decentralizzato**
Descrizione: ZavaX Oracle è fondamentale per il bridge, poiché fornisce feed di prezzi cross-chain e consente conversioni trustless da ZEC a AVAX.
[Link all'oracolo](https://zavax-oracle.red.dev)

**Contratto del bridge cross-chain**
Descrizione: l'architettura di smart contract a supporto del bridge Zcash Avalanche, che gestisce depositi, conversioni e prelievi di ZEC.

**Integrazione del livello di privacy**
Descrizione: garantisce che le funzionalità di privacy di Zcash siano preservate durante l'intero processo di bridging, consentendo transazioni cross-chain private.

## Deliverable e documentazione

**Bridge della subnet elastica di Zcash su Avalanche**: [Proposta di finanziamento](https://forum.zcashcommunity.com/t/zcash-elastic-subnet-bridge-on-avalanche/44220)
Di seguito sono riportati i principali deliverable e le risorse tecniche completati per il progetto Zcash Avalanche RedBridge:

Deliverable 1.1: un PoC preliminare che supporta l'interrogazione delle transazioni testnet di Zcash da una subnet testnet di Avalanche tramite una CLI, pubblicato su GitHub e con una subnet a nodo singolo sulla testnet di Avalanche. https://github.com/red-dev-inc/redbridge-oracle

Deliverable 2.1: [Architettura](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)


### Milestone 3 - 31 marzo 2024

Il Deliverable 3.1 è stato completato e presenta la nostra analisi sull'adozione di FROST al posto di BLS per le firme a soglia nel bridge ZavaX. Questo cambiamento sfrutta librerie auditate provenienti da Zcash Foundation e facilita una migliore integrazione e sicurezza. https://github.com/ZcashFoundation/frost

Deliverable 3.2: completato il design UX e UI della GUI, con il dettaglio dei nostri miglioramenti di sicurezza per la subnet ZavaX Oracle, supportati dai risultati dei test di penetrazione. Per maggiori dettagli, inclusi la configurazione dei server e gli esiti dei test, consulta [Valutazione della sicurezza](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/deployment-notes.md)
[Report di audit](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/pen-testing-report-2024-09.md)
Inoltre, il team ha effettuato un rebranding da ZavaX a redbridge, cambiando il proprio token di staking da ZAX a RBR.

### Milestone 4 - 30 aprile 2024
Deliverable 4.1: deployment pienamente funzionante sulle testnet di Zcash e Avalanche, con una subnet di 3 validatori e con supporto CLI

### Milestone 5 - 31 maggio 2024
Deliverable 5.1 GUI: integrazione del bridge in Core o nella Webapp

Milestone 6 - 30 giugno 2024
Deliverable 6.1: superamento positivo dell'audit del software
Deliverable 6.2: pubblicazione del codice sorgente auditato in un repo pubblico su GitHub

Dai un'occhiata al [repo di GitHub](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)
  
Per maggiori dettagli tecnici, gli utenti sono invitati a consultare il repository e la documentazione del progetto RedBridge per [esplorare](https://github.com/red-dev-inc/red-bridge) le specifiche dell'integrazione, i framework di test e i protocolli di sicurezza.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* Deliverable: 
Nel Q1 2025, il team ha annunciato il lancio del [sito web dimostrativo di red·bridge](https://redbridge-demo.red.dev/index.html), dove chiunque può provare l'esperienza utente, lasciare un feedback e suggerire miglioramenti. È anche un modo semplice per presentare il progetto alle persone non tecniche.

* Il team ha usato Zebra per la versione finale di red·bridge. Per testarla, ha aggiornato due dei tre nodi della propria blockchain di test, ZavaX Oracle, che gira sulla testnet Fuji di Avalanche. L'ultimo nodo è stato aggiornato con successo: ora [ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) gira su Zebra!

* Nel Q1 2025, il sito web di red.bridge è stato sviluppato per offrire quattro visualizzazioni: rossa, scura, chiara e Zebra, a differenza della versione iniziale, che era rossa.

* Un altro punto è che il team attiverà in produzione la L1 di red·bridge sulla mainnet di Avalanche a dicembre 2025. Inizialmente servirà come oracolo per la blockchain di Zcash e poi, poco dopo, anche per Bitcoin. Inoltre, ogni richiesta costerà 0,001 AVAX in gas token. Questa build consentirà a qualsiasi L1 o smart contract su Avalanche di interrogare in modo economico i dati provenienti da Zcash e Bitcoin in modo decentralizzato.

* Nel Q2, il team ha presentato una milestone ACP-77 (nota come Avalanche9000) alla Avalanche Foundation per rendere più rapida ed economica, per chiunque, la gestione di un guardian di red.bridge. Inizialmente, i validatori dovevano mettere in staking circa 2000 AVAX; tuttavia, con i costi di Avalanche9000, ai validatori ne è bastato 1 AVAX (mese). Inoltre, questa milestone finalizza anche il piano di utilizzare l'implementazione FROST di ZF, che assegna a ogni Guardian una quota di firma per un controllo sicuro e distribuito del portafoglio del bridge.

* Con l'arrivo del Q1 e del Q2 2026, red.bridge organizzerà l'airdrop del proprio token RBR (in precedenza ZAX) per i membri delle community di Zcash e Avalanche. Secondo il fondatore di red.dev, ospiteranno una testnet incentivata nella quale gli utenti avranno la possibilità di guadagnare RBR mentre contribuiscono a testare il bridge.

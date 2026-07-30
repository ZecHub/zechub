# Zcash Avalanche RedBridge

Lo Zcash Avalanche RedBridge è un bridge decentralizzato che consente l'interoperabilità tra le blockchain Zcash (ZEC) e Avalanche (AVAX). Questo bridge è progettato per facilitare il trasferimento senza soluzione di continuità di ZEC sulla blockchain Avalanche, sfruttando l'elevato throughput, le basse commissioni e i meccanismi di consenso ecosostenibili di Avalanche, preservando al contempo le funzionalità orientate alla privacy di Zcash.

Il RedBridge supporta un'ampia gamma di casi d'uso, tra cui la finanza decentralizzata (DeFi) cross-chain, le transazioni private e la condivisione della liquidità, dando ai detentori di Zcash una maggiore accessibilità all'ecosistema Avalanche. Questo bridge è operato attraverso un insieme di nodi decentralizzati e un oracolo, noto come **ZavaX**, che garantisce un trasferimento dati affidabile e la verifica dei prezzi tra Zcash e Avalanche.

### Funzionalità chiave

Interoperabilità che preserva la privacy: consente agli utenti Zcash di mantenere la privacy mentre utilizzano applicazioni DeFi su Avalanche.
Oracolo decentralizzato ZavaX: integra un sistema di oracolo per garantire dati di prezzo ZEC/AVAX accurati, consentendo operazioni cross-chain trustless.
Scalabile ed ecosostenibile: utilizza il modello di consenso di Avalanche, fornendo transazioni ad alta velocità con un impatto ambientale minimo.
Supporto per DeFi e DApp: i detentori di Zcash possono ora partecipare a varie piattaforme DeFi su Avalanche senza compromettere la privacy.

### Componenti tecnici

**Oracolo decentralizzato ZavaX**
Descrizione: l'oracolo ZavaX è cruciale per il bridge, fornendo feed di prezzo cross-chain e abilitando conversioni trustless da ZEC ad AVAX.
[Link all'oracolo](https://zavax-oracle.red.dev)

**Contratto del bridge cross-chain**
Descrizione: l'architettura degli smart contract che supporta il bridge Zcash Avalanche, gestendo depositi, conversioni e prelievi di ZEC.

**Integrazione del livello di privacy**
Descrizione: garantisce che le funzionalità di privacy di Zcash siano preservate durante l'intero processo di bridging, consentendo transazioni cross-chain private.

## Deliverable e documentazione

**Zcash Elastic Subnet Bridge su Avalanche**: [Proposta di grant](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Di seguito i deliverable chiave e le risorse tecniche completati per il progetto Zcash Avalanche RedBridge:

Deliverable 1.1: PoC preliminare che supporta l'interrogazione di transazioni Zcash testnet da una subnet Avalanche testnet tramite una CLI, pubblicato su Github e con una subnet a singolo nodo sulla testnet di Avalanche. https://github.com/red-dev-inc/zavax-oracle

Deliverable 2.1: [Architettura](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Milestone 3 - 31 marzo 2024

Il Deliverable 3.1 è completo e presenta la nostra analisi sull'adozione di FROST al posto di BLS per le firme a soglia nel bridge ZavaX. Questo cambiamento sfrutta librerie sottoposte ad audit dalla Zcash Foundation e facilita una migliore integrazione e sicurezza. https://github.com/ZcashFoundation/frost

Deliverable 3.2 - Design UX e UI per la GUI completato, con dettagli sui nostri miglioramenti di sicurezza per la subnet dell'oracolo ZavaX, supportati dai risultati dei penetration test. Per maggiori dettagli, inclusi la configurazione del server e gli esiti dei test [Security Assesment](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Audit Report](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Inoltre, il team ha effettuato un rebranding da ZavaX a redbridge e ha cambiato il token di staking da ZAX a RBR.

### Milestone 4 - 30 aprile 2024
Deliverable 4.1 - Deployment completamente funzionante sulle testnet di Zcash e Avalanche, con una Subnet a 3 validatori e supporto CLI

### Milestone 5 - 31 maggio 2024
Deliverable 5.1 - GUI: integrazione del bridge in Core o Webapp

Milestone 6 - 30 giugno 2024
Deliverable 6.1 - Superamento con successo dell'audit del software
Deliverable 6.2 - Pubblicazione del codice sorgente sottoposto ad audit in un repository Github pubblico

Dai un'occhiata al [repository Github](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Per maggiori dettagli tecnici, gli utenti sono invitati a esaminare il repository e la documentazione del progetto RedBridge per [esplorare](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) le specifiche dell'integrazione, i framework di test e i protocolli di sicurezza.


![img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Deliverable: 
Nel Q1 2025, il team ha annunciato il lancio del [sito demo di red·bridge](https://redbridge-demo.red.dev/index.html), dove chiunque può provare l'esperienza utente, dare feedback e suggerire miglioramenti. Serve anche come modo semplice per presentare il progetto a persone non tecniche.

* Il team ha usato Zebra per la versione finale di red·bridge. Per testarla, hanno aggiornato due dei tre nodi nella loro blockchain di test, ZavaX Oracle, che gira sulla testnet Fuji di Avalanche. L'ultimo nodo è stato aggiornato con successo, e ora [Zavax Oracle](https://zavax-oracle.red.dev/) gira su ZEBRA!

* Nel Q1 2025, il sito web red.bridge è stato programmato per offrire quattro temi: red, Dark, Light e Zebra, a differenza della versione iniziale, che era red.

* Un altro punto è che il team attiverà la red·bridge L1 live sulla mainnet di Avalanche a dicembre 2025. Inizialmente, fungerà da oracolo per la blockchain Zcash e poi, poco dopo, anche per Bitcoin. In tal caso, ogni richiesta costerà 0,001 AVAX in token di gas. Questa build consentirà a qualsiasi L1 o smart contract su Avalanche di interrogare a basso costo i dati da Zcash e Bitcoin in modo decentralizzato.

* Nel Q2, il team ha presentato alla Avalanche Foundation una milestone ACP-77 (nota come Avalanche9000) per rendere l'esecuzione di un guardian red.bridge più anticipata e accessibile a tutti. Inizialmente, i validatori dovevano mettere in staking circa 2000 AVAX; tuttavia, con i costi di Avalanche9000, ai validatori bastava 1 AVAX (al mese). Inoltre, questa milestone finalizza anche il piano di utilizzo dell'implementazione FROST della ZF, che assegna a ogni Guardian una quota di firma per un controllo sicuro e distribuito del wallet del bridge.

* Tra il Q1 e il Q2 del 2026, red.bridge ospiterà l'airdrop del suo token RBR (precedentemente ZAX) per i membri delle community Zcash e Avalanche. Secondo il fondatore di red.dev, ospiteranno una testnet incentivata in cui gli utenti avranno la possibilità di guadagnare RBR aiutando a testare il bridge.

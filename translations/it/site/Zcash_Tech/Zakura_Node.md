<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Zakura Node

> 🇧🇷 [Versione in portoghese](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura è un'implementazione gratuita e open-source di un nodo completo per Zcash, costruita per scalare. Derivato da [Zebra](Zebra_Full_Node.md) e sviluppato attraverso una collaborazione tra **Valar Group** e **Project Tachyon**, Zakura offre una sincronizzazione drasticamente più veloce, pruning nativo dei blocchi e un livello di compatibilità per gli strumenti legacy di `zcashd`. La versione 1.0.0 è stata rilasciata il 15 luglio 2026.

---

## In breve

- Zakura è un **nodo completo Zcash compatibile con il consenso** — un'alternativa a Zebra e zcashd, derivata da Zebra.
- La sincronizzazione della blockchain è circa **5× più veloce di Zebra**; il bootstrap tramite snapshot si completa in **meno di 2 minuti**.
- Il **pruning nativo dei blocchi** consente agli operatori di eseguire un nodo completo con molto meno spazio su disco (~11 GB per uno snapshot potato contro 300 GB per un nodo completo Zebra).
- Una **modalità di compatibilità RPC zcashd** permette a wallet e integrazioni esistenti di funzionare senza modifiche.
- Un **livello di trasporto P2P sperimentale** (disabilitato di default) punta a una propagazione dei blocchi sotto i 500 ms con gossip resistente agli attacchi DoS.
- Compatibile con **Ironwood (NU6.3)**, l'aggiornamento di rete Zcash attivato a metà 2026.
- Guidato da **Sean Bowe** (cofondatore di Zcash, Project Tachyon) e **Dev Ojha** (Valar Group).

---

## Cos'è Zakura?

Zakura è un nodo completo Zcash progettato da zero per essere pronto per la produzione su larga scala. Pur condividendo la compatibilità di consenso con Zebra — il che significa che valida e segue le stesse regole del protocollo Zcash — Zakura introduce importanti miglioramenti ingegneristici volti a ridurre la barriera all'esecuzione di un nodo completo Zcash.

Il progetto è uno sforzo congiunto tra **Project Tachyon** (guidato da Sean Bowe, uno degli ingegneri crittografici originali di Zcash) e **Valar Group** (guidato da Dev Ojha). Insieme si concentrano sui miglioramenti di nuova generazione del protocollo Zcash, e Zakura funge da nodo di riferimento per questo lavoro.

---

## Caratteristiche principali

### Sincronizzazione della chain 5× più veloce

Zakura raggiunge una sincronizzazione della blockchain circa 5× più veloce rispetto a Zebra. Questo lo rende significativamente più pratico per gli operatori che devono avviare rapidamente un nodo o riprendersi da un periodo di inattività.

### Bootstrap tramite snapshot

Zakura pubblica snapshot della chain precompilate che riducono drasticamente il tempo di sincronizzazione iniziale:

| Metodo di bootstrap | Tempo |
|---------------------|-------|
| Snapshot archivio | ~37 minuti |
| Snapshot potato | **Meno di 2 minuti** |
| Zebra (sincronizzazione completa) | ~20 ore |

Gli snapshot potati sono di circa **11 GB**, consentendo un bootstrap del nodo **680× più veloce** rispetto alla sincronizzazione dal genesis.

### Pruning nativo dei blocchi

Zakura supporta il pruning configurabile dei blocchi, consentendo agli operatori del nodo di definire quanta cronologia della chain conservare. Questo rende pratico eseguire un nodo completo su hardware con spazio di archiviazione limitato — utile per validatori, sviluppatori e fornitori di infrastruttura che non hanno bisogno dell'intera chain storica.

### Modalità di compatibilità RPC zcashd

Zakura include una modalità di compatibilità che riproduce l'interfaccia JSON-RPC legacy di `zcashd`. Wallet, exchange e integrazioni esistenti che si basano sulle RPC di `zcashd` possono passare a Zakura senza richiedere modifiche al codice.

### Livello di trasporto P2P sperimentale

Zakura viene distribuito con un livello di trasporto peer-to-peer di nuova generazione, attualmente **disabilitato di default**. Quando abilitato, punta a:

- Propagazione dei blocchi con caso peggiore sotto i 500 ms in tutta la rete
- Aggregazione della mempool per un inoltro delle transazioni più efficiente
- Protocollo gossip resistente ai DoS per migliorare la resilienza della rete

Questo livello rappresenta un'anteprima dei futuri miglioramenti a livello di rete Zcash sviluppati nell'ambito di Project Tachyon.

### Compatibile con Ironwood (NU6.3)

Zakura è pienamente compatibile con l'aggiornamento di rete Ironwood (NU6.3), attivato sulla mainnet di Zcash a metà del 2026.

---

## Come Zakura si relaziona agli altri nodi Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Linguaggio | C++ (derivato da Bitcoin) | Rust | Rust (derivato da Zebra) |
| Stato | Deprecato | Attivo | Attivo (v1.0.0, lug 2026) |
| Velocità di sincronizzazione | Riferimento base | ~1× | ~5× più veloce |
| Pruning dei blocchi | No | No | Sì |
| Compatibilità RPC zcashd | Nativa | Parziale | Sì (modalità compatibilità) |
| Bootstrap tramite snapshot | No | No | Sì (<2 min) |
| P2P sperimentale | No | No | Sì (opt-in) |

---

## Per iniziare

Le opzioni di download, gli snapshot e la documentazione di configurazione sono disponibili su:

- **Guida al download e alla configurazione:** [zakura.com/download](https://zakura.com/download/)
- **Snapshot della chain:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Codice sorgente:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Pagine correlate

- [Zebra Full Node](Zebra_Full_Node.md) — il nodo completo Zcash upstream da cui Zakura è stato derivato
- [Zaino Indexer](Zaino.md) — un indicizzatore basato su Rust compatibile con Zebra e Zakura
- [Nodi completi](Full_Nodes.md) — panoramica delle opzioni di nodi completi Zcash
- [Nodi lightwallet](Lightwallet_Nodes.md) — alternative leggere per i client

## Risorse

- [Introduzione a Zakura — annuncio](https://zakura.com/announcements/introducing-zakura/)
- [GitHub di Zakura](https://github.com/zakura-core/zakura)
- [Sito web di Zakura](https://zakura.com/)
- [Zakura su X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodo Zakura

Zakura è un'implementazione gratuita e open source di un full node (nodo completo) per Zcash, progettata per la scalabilità. Derivata da [Zebra](Zebra_Full_Node.md) e sviluppata attraverso una collaborazione tra **Valar Group** e **Project Tachyon**, Zakura offre una sincronizzazione notevolmente più veloce, potatura nativa dei blocchi e un livello di compatibilità per gli strumenti legacy di `zcashd`. La versione 1.0.0 è stata rilasciata il 15 luglio 2026. Da allora le release si sono susseguite rapidamente: la versione 1.7.0 (22 ottobre 2026) ha attivato NU7 su Mainnet, e a novembre è seguita la serie 1.8.

---

## In breve

- Zakura è un **full node di Zcash compatibile con il consenso** — un'alternativa a Zebra e zcashd, derivata da Zebra.
- La sincronizzazione della blockchain è circa **5× più veloce di Zebra**; l'avvio tramite snapshot richiede **meno di 2 minuti**.
- La **potatura nativa dei blocchi** permette agli operatori di eseguire un full node con molto meno spazio su disco (~11 GB per uno snapshot potato rispetto ai 300 GB di un full node Zebra).
- Una **modalità di compatibilità RPC zcashd** consente a portafogli e integrazioni esistenti di funzionare senza modifiche.
- Un **livello di trasporto P2P sperimentale** (disabilitato per impostazione predefinita) punta a una propagazione dei blocchi inferiore a 500 ms con gossip resistente ai DoS.
- Compatibile con **Ironwood (NU6.3)**, l'aggiornamento di rete di Zcash attivato a metà del 2026.
- Segue NU7: Zakura 1.7.0 è la versione che lo attiva su Mainnet. Ogni versione si ferma inoltre a un blocco di fine supporto poche settimane dopo il rilascio, quindi pianifica aggiornamenti regolari (vedi Prima di eseguirlo qui sotto).
- **Zakura Common** (v1.3.0, agosto 2026) accelera la crittografia che i portafogli usano per costruire transazioni private: da oltre 3 secondi a meno di 200 ms in molti casi, secondo i benchmark di Zakura.
- Guidato da **Sean Bowe** (cofondatore di Zcash, Project Tachyon) e **Dev Ojha** (Valar Group).

---

## Cos'è Zakura?

Zakura è un full node di Zcash progettato da zero per essere pronto alla produzione su larga scala. Sebbene condivida la compatibilità di consenso con Zebra — ossia convalida e segue le stesse regole del protocollo Zcash — Zakura introduce significativi miglioramenti ingegneristici volti a ridurre la barriera all'esecuzione di un full node di Zcash.

Il progetto è uno sforzo congiunto tra **Project Tachyon** (guidato da Sean Bowe, uno degli ingegneri crittografici originali di Zcash) e **Valar Group** (guidato da Dev Ojha). Insieme si concentrano sui miglioramenti del protocollo Zcash di nuova generazione, e Zakura funge da nodo di riferimento per questo lavoro.

---

## Caratteristiche principali

### Sincronizzazione della chain 5× più veloce

Zakura ottiene una sincronizzazione della blockchain circa 5× più veloce rispetto a Zebra. Questo lo rende molto più pratico per gli operatori che devono avviare rapidamente un nodo o ripristinarlo dopo un periodo di inattività.

### Avvio tramite snapshot

Zakura pubblica snapshot della chain precompilati che riducono drasticamente il tempo di sincronizzazione iniziale:

| Bootstrap Metodo | Tempo |
|-----------------|------|
| Snapshot d'archivio | ~37 minuti |
| Snapshot potato | **Meno di 2 minuti** |
| Zebra (sincronizzazione completa) | ~20 ore |

Gli snapshot potati occupano circa **11 GB**, consentendo un avvio del nodo **680× più veloce** rispetto alla sincronizzazione dalla genesi.

### Potatura nativa dei blocchi

Zakura supporta la potatura configurabile dei blocchi, consentendo agli operatori dei nodi di definire quanta cronologia della chain mantenere. Questo rende pratico eseguire un full node su hardware con spazio di archiviazione limitato — utile per validatori, sviluppatori e fornitori di infrastruttura che non necessitano dell'intera chain storica.

### Modalità di compatibilità RPC zcashd

Zakura include una modalità di compatibilità che riproduce l'interfaccia JSON-RPC legacy di `zcashd`. Portafogli, exchange e integrazioni esistenti che si basano sugli RPC di `zcashd` possono passare a Zakura senza richiedere modifiche al codice.

### Livello di trasporto P2P sperimentale

Zakura viene fornito con un livello di trasporto peer-to-peer di nuova generazione, attualmente **disabilitato per impostazione predefinita**. Quando è abilitato, punta a:

- Propagazione dei blocchi nel caso peggiore inferiore a 500 ms nell'intera rete
- Aggregazione della mempool per una trasmissione delle transazioni più efficiente
- Protocollo gossip resistente ai DoS per migliorare la resilienza della rete

Questo livello rappresenta un'anteprima dei futuri miglioramenti a livello di rete di Zcash sviluppati nell'ambito di Project Tachyon.

### Compatibile con Ironwood (NU6.3)

Zakura è pienamente compatibile con l'aggiornamento di rete Ironwood (NU6.3), attivato sulla mainnet di Zcash a metà del 2026.

### NU7

Zakura 1.7.0, rilasciata il 22 ottobre 2026, è la versione che attiva NU7 su Mainnet ([note di rilascio](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Un nodo ha bisogno della versione 1.7.0 o successiva per seguire la chain dopo l'aggiornamento. [NU7](NU7.md) spiega cosa cambia con l'aggiornamento.

---

## Zakura Common: crittografia per portafogli più veloce

Ad agosto 2026 il team di Zakura ha rilasciato Zakura Common, un insieme di fork accelerati delle librerie crittografiche su cui fanno affidamento i portafogli e i nodi di Zcash. Zakura è passato al nuovo stack nella versione 1.3.0 e Vizor Wallet è tra i primi portafogli a integrarlo.

![Pagamento Zcash privato: verifica zk-SNARK da 4 a 8 volte più veloce, costruzione della transazione da oltre 3 secondi a meno di 200 ms, generazione della prova oltre 14 volte più veloce su mobile, hashing 21 volte più veloce, decifratura di prova 1,5 volte più veloce e librerie open source che non richiedono alcun aggiornamento del protocollo](/content-images/zakuracommonspeedups.webp)

Secondo i benchmark di Zakura:

| Operazione | Accelerazione |
|--|--|
| Generazione della prova su mobile | più di 14× (desktop: più di 5×) |
| Hashing Sinsemilla | più di 21× |
| Verifica zk-SNARK | 4–8× |
| Decrittazione di prova | più di 1,5× |

Per gli utenti, il cambiamento più visibile è il tempo di attesa. La creazione di una transazione privata richiedeva a un portafoglio più di tre secondi. Con Zakura Common, in molti casi può richiedere meno di 200 ms. Questo è il tempo che il dispositivo impiega per preparare la transazione, non quello necessario alla rete per confermarla.


---

## Come Zakura si relaziona agli altri nodi di Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Linguaggio | C++ (fork di Bitcoin) | Rust | Rust (fork di Zebra) |
| Stato | Deprecato | Attivo | Attivo (v1.0.0 lug 2026; v1.8.8 nov 2026) |
| Velocità di sincronizzazione | Riferimento | ~1× | ~5× più veloce |
| Pruning dei blocchi | No | No | Sì |
| Compatibilità RPC di zcashd | Nativa | Parziale | Sì (modalità compatibilità) |
| Avvio da snapshot | No | No | Sì (meno di 2 min) |
| P2P sperimentale | No | No | Sì (facoltativo) |

---

## Per iniziare

Le opzioni di download, gli snapshot e la documentazione di configurazione sono disponibili su:

- **Guida al download e alla configurazione:** [zakura.com/download](https://zakura.com/download/)
- **Snapshot della chain:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Codice sorgente:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Note di rilascio:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Servire i portafogli leggeri

Zakura non è un server per portafogli leggeri. Non implementa `CompactTxStreamer`, il protocollo gRPC che portafogli leggeri come Zodl (in precedenza Zashi) usano, quindi un portafoglio non può connettersi direttamente a `zakurad`. Per fornire servizi ai portafogli leggeri, esegui uno di questi davanti a esso:

- [Zaino](Zaino.md) (preferito)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), l'indicizzatore e server per portafogli leggeri di Zcash Labs, che legge la chain da un nodo Zakura, integrato nel proprio processo oppure remoto tramite JSON-RPC

L'interfaccia gRPC dell'indexer di Zakura (`indexer_listen_addr` nella sezione `[rpc]`, disattivata per impostazione predefinita) è separata: fornisce flussi di blocchi, mempool e chain tip per software affidabile che esegui tu stesso, non per il protocollo dei light wallet. Il testo in chiaro è consentito solo sul loopback; per qualsiasi altro indirizzo è richiesta l'autenticazione TLS reciproca ([riferimento alla configurazione](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Prima di avviarlo

Alcune cose delle note di rilascio della versione 1.8 che colgono di sorpresa gli operatori:

- **Le release scadono.** Ogni release di Zakura ha un'altezza di fine supporto e un nodo di Mainnet che la esegue si arresta a quel blocco. Le release 1.8.x sono "Supportate su Mainnet fino al blocco 3,643,309, intorno al 3 dicembre 2026", con avvisi di aggiornamento circa tre giorni prima ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Controlla la release più recente prima di quella data e non fissare una vecchia versione negli script o nei modelli di deployment senza un piano per aggiornarla.
- **Requisito CPU x86-64 dalla versione 1.8.0.** I binari delle release e le immagini di Docker usano le istruzioni BMI2/ADX, che richiedono Intel Broadwell, AMD Zen o versioni successive. Su una CPU meno recente, `zakurad` termina all'avvio con un errore che indica le estensioni mancanti. Compila dai sorgenti con `--features portable` per eseguirlo su quelle macchine ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Vecchie configurazioni generate e P2P nativo.** `zakurad generate` scriveva `peer_memory_budget_bytes = 8589934592` (8 GiB). Dalla versione 1.8.3 questo consente circa la metà delle connessioni P2P native e 4 GiB o meno non bastano per avviare un nodo che usa il P2P nativo. Porta `[network.zakura] peer_memory_budget_bytes` ad almeno 15 GiB oppure elimina la riga per usare il nuovo valore predefinito di 15 GiB ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **Gli strumenti per lo stato sono stati spostati in `zakurad`.** Dalla versione 1.8.3 i binari autonomi `zakura-prune-state` e `zakura-rollback-state` non sono più inclusi, nemmeno in Docker. Usa invece `zakurad prune-state` e `zakurad rollback-state`. Accettano gli stessi argomenti, ma caricano `zakura.toml`, quindi passa `--cache-dir` per indicare una directory dello stato specifica.

---

## Pagine correlate

- [Full node Zebra](Zebra_Full_Node.md) — il full node di Zcash upstream da cui è stato derivato Zakura
- [Indicizzatore Zaino](Zaino.md) — un indicizzatore basato su Rust compatibile con Zebra e Zakura
- [Full node](Full_Nodes.md) — panoramica delle opzioni di full node di Zcash
- [Nodi Lightwallet](Lightwallet_Nodes.md) — alternative leggere per client

## Risorse

- [Presentazione di Zakura — annuncio](https://zakura.com/announcements/introducing-zakura/)
- [GitHub di Zakura](https://github.com/zakura-core/zakura)
- [Sito web di Zakura](https://zakura.com/)
- [Zakura su X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Annuncio di Zakura Common](https://zakura.com/announcements/zakura-common/)

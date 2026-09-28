<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nodo Zakura

> 🇧🇷 [Versione in portoghese](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura è un'implementazione gratuita e open source di un nodo completo per Zcash, progettata per la scalabilità. Derivata da [Zebra](Zebra_Full_Node.md) e sviluppata attraverso una collaborazione tra **Valar Group** e **Project Tachyon**, Zakura offre una sincronizzazione notevolmente più veloce, potatura nativa dei blocchi e un livello di compatibilità per gli strumenti legacy di `zcashd`. La versione 1.0.0 è stata rilasciata il 15 luglio 2026.

---

## In breve

- Zakura è un **nodo completo Zcash compatibile con il consenso** — un'alternativa a Zebra e zcashd, derivata da Zebra.
- La sincronizzazione della blockchain è circa **5× più veloce di Zebra**; l'avvio tramite snapshot richiede **meno di 2 minuti**.
- La **potatura nativa dei blocchi** permette agli operatori di eseguire un nodo completo con molto meno spazio su disco (~11 GB per uno snapshot potato rispetto ai 300 GB di un nodo Zebra completo).
- Una **modalità di compatibilità RPC zcashd** consente a wallet e integrazioni esistenti di funzionare senza modifiche.
- Un **livello di trasporto P2P sperimentale** (disabilitato per impostazione predefinita) punta a una propagazione dei blocchi inferiore a 500 ms con gossip resistente ai DoS.
- Compatibile con **Ironwood (NU6.3)**, l'aggiornamento di rete Zcash attivato a metà del 2026.
- **Zakura Common** (v1.3.0, agosto 2026) accelera la crittografia che i wallet usano per costruire transazioni private: da oltre 3 secondi a meno di 200 ms in molti casi, secondo i benchmark di Zakura.
- Guidato da **Sean Bowe** (cofondatore di Zcash, Project Tachyon) e **Dev Ojha** (Valar Group).

---

## Cos'è Zakura?

Zakura è un nodo completo Zcash progettato da zero per essere pronto alla produzione su larga scala. Sebbene condivida la compatibilità di consenso con Zebra — ossia convalida e segue le stesse regole del protocollo Zcash — Zakura introduce significativi miglioramenti ingegneristici volti a ridurre la barriera all'esecuzione di un nodo completo Zcash.

Il progetto è uno sforzo congiunto tra **Project Tachyon** (guidato da Sean Bowe, uno degli ingegneri crittografici originali di Zcash) e **Valar Group** (guidato da Dev Ojha). Insieme si concentrano sui miglioramenti del protocollo Zcash di nuova generazione, e Zakura funge da nodo di riferimento per questo lavoro.

---

## Caratteristiche principali

### Sincronizzazione della catena 5× più veloce

Zakura ottiene una sincronizzazione della blockchain circa 5× più veloce rispetto a Zebra. Questo lo rende molto più pratico per gli operatori che devono avviare rapidamente un nodo o ripristinarlo dopo un periodo di inattività.

### Avvio tramite snapshot

Zakura pubblica snapshot della catena precompilati che riducono drasticamente il tempo di sincronizzazione iniziale:

| Metodo di avvio | Tempo |
|-----------------|------|
| Snapshot d'archivio | ~37 minuti |
| Snapshot potato | **Meno di 2 minuti** |
| Zebra (sincronizzazione completa) | ~20 ore |

Gli snapshot potati occupano circa **11 GB**, consentendo un avvio del nodo **680× più veloce** rispetto alla sincronizzazione dalla genesi.

### Potatura nativa dei blocchi

Zakura supporta la potatura configurabile dei blocchi, consentendo agli operatori dei nodi di definire quanta cronologia della catena mantenere. Questo rende pratico eseguire un nodo completo su hardware con spazio di archiviazione limitato — utile per validatori, sviluppatori e fornitori di infrastruttura che non necessitano dell'intera catena storica.

### Modalità di compatibilità RPC zcashd

Zakura include una modalità di compatibilità che riproduce l'interfaccia JSON-RPC legacy di `zcashd`. Wallet, exchange e integrazioni esistenti che si basano sugli RPC di `zcashd` possono passare a Zakura senza richiedere modifiche al codice.

### Livello di trasporto P2P sperimentale

Zakura viene fornito con un livello di trasporto peer-to-peer di nuova generazione, attualmente **disabilitato per impostazione predefinita**. Quando è abilitato, punta a:

- Propagazione dei blocchi nel caso peggiore inferiore a 500 ms nell'intera rete
- Aggregazione della mempool per una trasmissione delle transazioni più efficiente
- Protocollo gossip resistente ai DoS per migliorare la resilienza della rete

Questo livello rappresenta un'anteprima dei futuri miglioramenti a livello di rete Zcash sviluppati nell'ambito di Project Tachyon.

### Compatibile con Ironwood (NU6.3)

Zakura è pienamente compatibile con l'aggiornamento di rete Ironwood (NU6.3), attivato sulla mainnet Zcash a metà del 2026.

---

## Zakura Common: crittografia per wallet più veloce

Ad agosto 2026 il team di Zakura ha rilasciato Zakura Common, un insieme di fork accelerati delle librerie crittografiche su cui fanno affidamento i wallet e i nodi Zcash. Zakura è passato al nuovo stack nella versione 1.3.0, e Vizor Wallet è tra i primi wallet a integrarlo.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Secondo i benchmark di Zakura:

| Operazione | Accelerazione |
|--|--|
| Generazione della prova su mobile | più di 14× (desktop: più di 5×) |
| Hashing Sinsemilla | più di 21× |
| Verifica zk-SNARK | 4–8× |
| Decrittazione di prova | più di 1,5× |

Per gli utenti, il cambiamento più visibile è il tempo di attesa. La creazione di una transazione privata richiedeva a un wallet più di tre secondi. Con Zakura Common, in molti casi può richiedere meno di 200 ms. Questo è il tempo che il dispositivo impiega per preparare la transazione, non quello necessario alla rete per confermarla.


---

## Come Zakura si relaziona agli altri nodi Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Linguaggio | C++ (derivato da Bitcoin) | Rust | Rust (derivato da Zebra) |
| Stato | Deprecato | Attivo | Attivo (v1.0.0, lug 2026) |
| Velocità di sincronizzazione | Riferimento | ~1× | ~5× più veloce |
| Potatura dei blocchi | No | No | Sì |
| Compatibilità RPC zcashd | Nativa | Parziale | Sì (modalità compatibilità) |
| Avvio tramite snapshot | No | No | Sì (meno di 2 min) |
| P2P sperimentale | No | No | Sì (opt-in) |

---

## Per iniziare

Le opzioni di download, gli snapshot e la documentazione di configurazione sono disponibili su:

- **Guida al download e alla configurazione:** [zakura.com/download](https://zakura.com/download/)
- **Snapshot della catena:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Codice sorgente:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Pagine correlate

- [Nodo completo Zebra](Zebra_Full_Node.md) — il nodo completo Zcash upstream da cui è stato derivato Zakura
- [Indicizzatore Zaino](Zaino.md) — un indicizzatore basato su Rust compatibile con Zebra e Zakura
- [Nodi completi](Full_Nodes.md) — panoramica delle opzioni per nodi completi Zcash
- [Nodi Lightwallet](Lightwallet_Nodes.md) — alternative leggere per client

## Risorse

- [Presentazione di Zakura — annuncio](https://zakura.com/announcements/introducing-zakura/)
- [GitHub di Zakura](https://github.com/zakura-core/zakura)
- [Sito web di Zakura](https://zakura.com/)
- [Zakura su X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Annuncio di Zakura Common](https://zakura.com/announcements/zakura-common/)

# Benchmark degli indexer: Zaino vs Ztreamer

Zaino e Ztreamer sono due indexer che servono il protocollo gRPC lightwallet, l'API che i light wallet Zcash usano per sincronizzarsi. Questa pagina riassume un confronto indipendente e riproducibile dei due: se restituiscono le stesse risposte, quanto tempo impiegano per costruire il proprio indice e quanto rapidamente servono i portafogli.

## In breve

* Entrambi gli indexer restituiscono dati della chain corretti. Ogni risposta verificabile rispetto a Zebra corrispondeva, quindi i portafogli possono usare entrambi.
* Le differenze riscontrate riguardano convenzioni e casi limite: codici di errore, l'ordine dei byte di un hash, il conteggio di un indirizzo duplicato e alcune forme di risposta JSON-RPC.
* Ztreamer costruisce il proprio indice circa 6× più velocemente sulla stessa CPU. Zaino inizia a rispondere dopo 6 secondi inoltrando le richieste a Zebra durante la costruzione.
* Ztreamer serve più velocemente in ogni scenario misurato: 13–17× più blocchi al secondo per un download completo del portafoglio.
* Gran parte della latenza di Zaino deriva da un'impostazione socket mancante (`TCP_NODELAY`), che aggiunge circa 40 ms a molte richieste. La correzione richiede una sola riga.

## Cosa è stato confrontato

| Build | Nodo di supporto | Perché |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (backend `direct`) | Ultima release stabile di Zaino |
| Zaino 0.9.0 | Zebra 6.4.2 (backend `direct`) | La versione misurata nel confronto pubblicato da Ztreamer |
| Ztreamer v0.1.0 | Nodo Zakura incorporato | Ultimo tag di Ztreamer |
| Ztreamer master | Zakura 1.5.1 incorporato | Ciò che compilano le istruzioni di installazione di Ztreamer |

I due usano design differenti:

* **Zaino** viene eseguito come processo separato accanto a un full node (nodo completo) [Zebra](Zebra_Full_Node.md), legge lo stato di Zebra e mantiene il proprio indice. È l'indexer nello stack [Z3](Z3_Stack.md). Vedi [Zaino](Zaino.md).
* **Ztreamer** incorpora un nodo [Zakura](Zakura_Node.md) (un fork di Zebra) nello stesso processo e mantiene un indice di blocchi compatti.

## Come è stato misurato

* **Stessi dati per tutti.** Ogni build è partita dalla stessa snapshot testnet di Zcash Foundation, congelata all'altezza 4.382.897, quindi tutte hanno indicizzato esattamente la stessa chain.
* **Chiunque può ripeterlo.** Tutto viene eseguito su runner gratuiti ospitati da GitHub: fai un fork del repository ed esegui un workflow.
* **Tre esecuzioni per build**, ciascuna a partire da un indice vuoto. Il server e il generatore di carico sono stati eseguiti su core CPU separati.
* **Compatibilità:** tutti i 20 metodi gRPC del protocollo lightwallet (274 casi di test), confrontati byte per byte tra le build e verificati rispetto al JSON-RPC di Zebra. Sono stati verificati anche i 28 metodi JSON-RPC serviti da Zaino.
* **Prestazioni:** tempo e risorse per costruire l'indice, latenza per richiesta, throughput degli intervalli di blocchi, da 1 a 128 client simultanei e un download completo del portafoglio dall'attivazione di Sapling fino alla punta.

## Risultati

### Costruzione dell'indice

Mediane di tre esecuzioni:

| Build | Indice completato | Prima risposta | Dimensione dell'indice su disco |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1.395 s | 6 s | 22,06 GiB |
| Zaino 0.9.0 | 1.211 s | 6 s | 22,06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1,44 GiB |
| Ztreamer master | 159 s | 158 s | 1,44 GiB |

Zaino è utilizzabile quasi subito perché inoltra le richieste a Zebra durante la costruzione. Ztreamer non serve nulla fino al completamento del proprio indice. Sullo stesso modello di CPU, Zaino 0.10.1 ha richiesto 6–6,5× più tempo di Ztreamer v0.1.0 e ha usato 7,5–8× il tempo CPU (Zebra incluso).

### Servizio

Mediane di tre esecuzioni, in blocchi al secondo salvo diversa indicazione:

| Scenario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Intervallo di 1.000 blocchi | 11.414 | 179.486 |
| Download completo del portafoglio (280.000 → punta) | 11.124 | 189.041 |
| Intervallo di 1.000 blocchi, 128 client | 110.093 | 229.527 |
| Blocco singolo, 128 client (richieste/s) | 6.843 | 11.044 |

Con 128 client il divario si riduce a circa 2×, perché entrambi i server erano limitati a due core CPU.

### Il limite di 40 ms

Su Zaino, sei RPC su dodici hanno una latenza mediana di circa 40 ms e ogni RPC ha un 99° percentile attorno a 41 ms. La causa è il modo in cui Zaino configura il proprio listener gRPC: l'opzione socket `TCP_NODELAY` non viene mai attivata, quindi il sistema operativo ritarda le piccole risposte fino a 40 ms.

Attivare l'opzione dall'esterno, senza modificare il binario di Zaino, ha eliminato il limite. Per esempio, `GetTreeState` è sceso da 40,3 ms a 0,75 ms (Ztreamer: 0,63 ms). Lo streaming in massa dei blocchi non è cambiato, quindi il divario di throughput sopra indicato è reale.

### Differenze di compatibilità

* **Zaino 0.9.0** include i dati trasparenti in `GetBlock` per impostazione predefinita, mentre il protocollo indica che l'impostazione predefinita include solo dati schermati. Questo è corretto nella versione 0.10.1.
* **`GetSubtreeRoots`:** il campo `completingBlockHash` usa ordini di byte opposti nei due indexer. I portafogli attuali non leggono questo campo.
* **Codici di errore:** Zaino restituisce `INTERNAL` per input non valido; Ztreamer restituisce `INVALID_ARGUMENT` o `NOT_FOUND`.
* **Indirizzi duplicati** in `GetTaddressBalanceStream` vengono contati due volte, tranne su Ztreamer master.
* **JSON-RPC:** `getrawtransaction` di Zaino con verbosità 0 restituisce un oggetto anziché una stringa esadecimale, a differenza di Zebra e zcashd.

## Limitazioni

* **Solo testnet.** I blocchi testnet sono più piccoli di quelli mainnet, quindi tempi e dimensioni assoluti non rappresentano la mainnet. Il confronto è relativo, su input identici.
* **Macchine CI condivise** con diversi modelli di CPU. Il rapporto completo fornisce confronti sulla stessa CPU per i numeri principali.
* **Non misurati:** riorganizzazioni, seguire una punta della chain in tempo reale, carico mempool e TLS.

## Dove saperne di più

* Rapporto completo: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Repository del benchmark: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Dati grezzi: [release results-2026-10-10](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)

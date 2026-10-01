# ZIP 218: Cosa cambiano realmente i blocchi da 25 secondi

Nel sondaggio tra i detentori di monete di NU7, chiuso il 14 settembre 2026, circa 2.397.669 ZEC hanno votato a favore di ZIP 218 e 141,6 ZEC hanno votato contro, per un risultato del 99,9%. La maggior parte della copertura lo ha riassunto dicendo che "i blocchi di Zcash diventano più veloci". È vero, ma tralascia gran parte di ciò che la proposta fa e gran parte di ciò che mantiene deliberatamente invariato.

Questa pagina spiega ZIP 218 sulla base del suo stesso testo: cosa cambia, cosa non cambia e quale costo comporta.

## La versione breve

| | Oggi | Dopo ZIP 218 |
|---|---|---|
| Spaziatura target dei blocchi | 75 secondi | 25 secondi |
| Blocchi al giorno | 1.152 | 3.456 |
| Sussidio per blocco (era di halving attuale) | 1,5625 ZEC | 0,52083333 ZEC |
| Nuovi ZEC al giorno | invariato | invariato |
| Intervallo di halving | 1.680.000 blocchi | 5.040.000 blocchi |
| Limiti alle azioni schermate per blocco | nessuno (solo il limite di dimensione di 2 MB) | 330 totali, con limiti per pool |
| Throughput di Orchard (transazioni da 2 azioni) | circa 2,9 al secondo | circa 6,6 al secondo |

Tre volte più blocchi, ciascuno con un pagamento pari a un terzo. Il programma di emissione rimane invariato.

## Perché cambiare il tempo di blocco

L'obiettivo principale è **ridurre il tempo di attesa**. Oggi un pagamento attende in media 75 secondi per la prima conferma, indipendentemente dal carico della rete. Con 25 secondi, la media scende a 25 secondi. ZIP indica i pagamenti presso i punti vendita, i depositi sugli exchange e i bridge cross-chain come gli utilizzi che ne risentono maggiormente.

Vale la pena tenere presenti due punti di ZIP:

- **Non dice a nessuno di usare meno conferme.** Per gli utenti che mantengono la stessa tolleranza al rischio di rollback di oggi, ZIP prevede che il tempo di conferma migliori di poco meno di tre volte.
- **Non sostituisce il lavoro sulla finalità.** ZIP si descrive come complementare a meccanismi di finalità quali Crosslink. Blocchi più rapidi nel livello base sono utili indipendentemente dal fatto che in seguito venga aggiunto o meno un livello di finalità.

ZIP osserva inoltre che un throughput maggiore da solo avrebbe potuto essere ottenuto con una dimensione di blocco più ampia. La latenza è il motivo per cui vengono invece scelti blocchi più brevi.

## Cosa cambia

### Emissione: stessi ZEC al giorno

Triplicare il numero di blocchi triplicherebbe l'emissione giornaliera se nient'altro cambiasse. ZIP 218 lo impedisce dividendo il sussidio per blocco per un ulteriore fattore di tre una volta che NU7 è attivo.

Nell'era di halving attuale, il sussidio per blocco passa da **1,5625 ZEC a 0,52083333 ZEC** (52.083.333 zatoshi). Poiché 156.250.000 zatoshi non sono divisibili esattamente per tre, ogni blocco arrotonda per difetto di un terzo di zatoshi. Su un intero intervallo di halving di 5.040.000 blocchi, ciò equivale a circa 0,0168 ZEC in totale.

Il sussidio è il totale dei nuovi ZEC creati per blocco. L'attuale quota di finanziamento dello sviluppo viene ancora prelevata da esso, quindi i miner ricevono meno della cifra intera, esattamente come oggi.

> **Una nota sulla cifra di 0,26041666 ZEC.** La nota esplicativa della bozza di ZIP stampa il sussidio post-NU7 come floor(156250000 / 6) = 0,26041666 ZEC, e alcune notizie l'hanno ripetuta. Quella nota è errata per un fattore di due: 156.250.000 zatoshi sono già il sussidio post-Blossom, quindi dividerli per sei applica il fattore di due di Blossom una seconda volta oltre al fattore di tre di NU7. La formula normativa dà floor(1,250,000,000 / (2 · 3 · 4)) = 52.083.333 zatoshi all'indice di halving attuale. Il ticket di implementazione di Zebra per questa modifica ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) registra la nota come un doppio conteggio del fattore di Blossom, dice agli implementatori di "implementare la formula, non la nota" e afferma che è stata presentata una correzione a ZIP. La cifra corretta all'attivazione è **0,52083333 ZEC**.

### Gli halving mantengono la loro tempistica

L'intervallo di halving triplica da 1.680.000 blocchi a 5.040.000 blocchi. Poiché i blocchi arrivano tre volte più spesso, gli halving continuano a verificarsi approssimativamente nello stesso momento in cui si sarebbero verificati senza la modifica. Il tetto totale dell'offerta non è influenzato.

Questo è distinto dall'altra questione sull'emissione nel sondaggio di NU7, in cui i detentori di monete hanno votato per mantenere gli halving anziché sostituirli con una curva smussata. ZIP 218 funziona con l'attuale modello di halving e non lo modifica.

### Nuovi limiti alle azioni schermate per blocco

ZIP 218 aggiunge limiti alla quantità di attività schermata che un singolo blocco può contenere:

| Limite | Massimo per blocco |
|---|---|
| Tutte le pool schermate combinate | 330 (ogni JoinSplit di Sprout conta come 2) |
| Azioni di Orchard | 330 |
| Input più output di Sapling | 300 |
| JoinSplits di Sprout | 25 |

Le parti trasparenti delle transazioni non sono interessate e il limite di dimensione del blocco di 2 MB continua ad applicarsi.

I limiti esistono perché altrimenti un numero maggiore di blocchi comporterebbe più lavoro per wallet e nodi. Con i limiti in vigore, il caso peggiore diventa effettivamente **migliore** di oggi, anche con tre volte più blocchi:

- **Sincronizzazione del wallet:** la quantità massima di dati che un wallet leggero potrebbe essere costretto a scaricare in un giorno scende da circa 271 MB a circa 169 MB, una riduzione di circa il 38%. Le decrittazioni di prova nel caso peggiore scendono da circa 4,8 milioni a circa 2,3 milioni al giorno.
- **Verifica dei blocchi:** i benchmark di ZIP stimano un blocco Orchard nel caso peggiore a circa 432 ms con i nuovi limiti, contro circa 770 ms per il caso peggiore odierno. Per Sapling la riduzione è maggiore, da circa 3.175 ms a circa 272 ms.

I limiti di Sapling e Sprout sono volutamente restrittivi. A maggio 2026, Orchard deteneva l'87,9% delle ZEC schermate, Sapling l'11,6% e Sprout lo 0,5%, quindi le pool più piccole ricevono spazio sufficiente per il loro utilizzo effettivo, offrendo al contempo a un attaccante meno possibilità di abuso. Poiché le commissioni di ZIP 317 addebitano lo stesso importo per azione logica in ogni pool, un attaccante non ottiene alcun vantaggio facendo spam in una pool anziché in un'altra.

### Throughput

Con 330 azioni Orchard per blocco, una transazione Orchard standard da 2 azioni entra ⌊330 / 2⌋ = 165 volte per blocco. Con un blocco ogni 25 secondi si arriva a circa **6,6 transazioni al secondo**, rispetto alle circa 2,9 di oggi — ZIP la definisce un aumento di 2,3× del normale throughput di Orchard. Sapling raggiunge circa 3,0 al secondo, comunque sopra ciò che Orchard gestisce oggi.

### Adeguamento della difficoltà

L'algoritmo di difficoltà calcola la media su una finestra di blocchi recenti. ZIP 218 aumenta questa finestra da 17 blocchi a 102, così da coprire ancora circa 2.550 secondi di tempo reale, lo stesso intervallo coperto quando Zcash fu lanciato con blocchi da 150 secondi. ZIP fornisce due ragioni: evitare di rendere più facili gli attacchi di manipolazione della difficoltà (cita l'incidente MWEB di Litecoin dell'aprile 2026) e attenuare le variazioni a breve termine dei tempi di blocco.

Subito dopo l'attivazione, i tempi di blocco impiegheranno un po' a stabilizzarsi sul nuovo target. È previsto e rispecchia quanto accaduto con Blossom, quando Zcash passò da 150 a 75 secondi.

### Impostazioni predefinite per nodi e wallet

Si tratta di raccomandazioni per le implementazioni, non di regole di consenso:

- **Scadenza delle transazioni:** la scadenza predefinita passa da 40 a 120 blocchi, mantenendo approssimativamente gli stessi 50 minuti.
- **Profondità massima di riorganizzazione:** il limite di Zebra passa da 99 a 600 blocchi, circa 4,2 ore a 25 secondi, la stessa finestra coperta al lancio.
- **Profondità dell'anchor per transazioni schermate:** rimane a 3 blocchi, quindi il ritardo si riduce da 3,75 minuti a 1,25 minuti. ZIP segue qui il precedente di Blossom.
- **Diverse costanti di rete** misurate in blocchi vengono moltiplicate per tre, così da coprire lo stesso intervallo di tempo.

## Cosa rimane invariato

- ZEC emessi al giorno, il programma di halving e il tetto dell'offerta
- Il limite di dimensione del blocco di 2 MB
- Le transazioni trasparenti, che i nuovi limiti di azione non interessano
- La maturità di Coinbase a 100 blocchi. Si noti che ora questo equivale a circa 42 minuti anziché circa 125, perché il conteggio è in blocchi, non in tempo.

## Il compromesso: più blocchi stale

I blocchi più veloci non sono gratuiti. Un blocco stale è un blocco valido che perde la corsa per essere incluso nella catena perché un altro blocco ha raggiunto prima la rete. Più breve è l'intervallo tra i blocchi, più spesso ciò accade, e ZIP collega il tasso di blocchi stale alla propagazione dei blocchi, al tempo di verifica e al rischio di centralizzazione del mining.

- **Oggi:** circa 0,4%, valore che ZIP osserva potrebbe sottostimare il tasso effettivo perché l'hashpower è concentrato nelle pool.
- **Teorico a 25 secondi:** circa 3,26%, sulla base dei ritardi di propagazione misurati di Zcash.
- **Test Devnet:** 99 nodi Zebra geograficamente distribuiti che producevano blocchi completi da 2 MB con spaziatura di 25 secondi hanno misurato un tasso di blocchi stale del 4,86% e un tasso di fork dello 0,37%. L'unica regolazione necessaria è stata la configurazione TCP. Poiché quella devnet era più decentralizzata dell'attuale mainnet, ZIP considera questi valori vicini al caso peggiore.
- **Punto di riferimento:** ZIP usa come soglia di sicurezza il tasso storico di blocchi stale proof-of-work di Ethereum, pari al 5,4%. Entrambi i valori della devnet sono inferiori.

Vi sono anche due costi minori. I wallet leggeri scaricano circa 200 KB in più al giorno di intestazioni di blocchi compatti. E poiché ci sono tre volte più blocchi, un nodo completo rimasto offline deve elaborare più blocchi quando si riallinea, anche se ogni blocco è meno costoso da verificare. ZIP accetta entrambi.

## Stato e cronologia

- **Stato di ZIP:** Bozza. Proprietari Dev Ojha ed Evan Forbes; creato il 13 marzo 2026.
- **Sondaggio tra i detentori di monete:** chiuso il 14 settembre 2026, con il 99,9% di sostegno. Il sondaggio indica una preferenza; non modifica di per sé le regole di consenso.
- **Cronologia:** in un annuncio sul Community Forum di Zcash del 17 settembre, le organizzazioni di sviluppo hanno concordato un programma con codice completato entro il 30 settembre, NU7 sulla testnet il 6 ottobre, una decisione finale e l'altezza di attivazione della mainnet il 20 ottobre, e l'attivazione della mainnet prevista intorno al 5 novembre 2026. Il 5 novembre è un obiettivo, non una data fissa, finché non viene definita l'altezza.
- **Implementazione:** tracciata in Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) e in Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Cosa significa per te

- **Detenere ZEC:** non devi fare nulla. Il tuo saldo e il programma di emissione non sono interessati.
- **Usare un wallet:** aggiorna quando il tuo wallet rilascia il supporto per NU7. Le prime conferme arriveranno circa tre volte prima.
- **Gestire un nodo, un exchange o un servizio:** pianifica l'aggiornamento prima dell'attivazione e rivedi eventuali impostazioni misurate in blocchi, poiché un numero fisso di blocchi ora copre un terzo del tempo di prima.

## Fonti

- [ZIP 218: Spaziatura target dei blocchi di 25 secondi](https://zips.z.cash/zip-0218)
- [ZIP 208: Spaziatura target dei blocchi più breve](https://zips.z.cash/zip-0208), il precedente di Blossom
- [Forum: Proposta — Ridurre la spaziatura target dei blocchi di Zcash a 25 s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: La riduzione del tempo di blocco di Zcash sembra sicura per NU7 con Devnet solo Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [ticket Zebra #11463](https://github.com/ZcashFoundation/zebra/issues/11463), intervallo di halving e sussidio post-NU7
- [ticket Zebra #11440](https://github.com/ZcashFoundation/zebra/issues/11440), monitoraggio dell'implementazione di ZIP 218
- NU7 risultati del sondaggio e cronologia, come riportato da Bitcoin.com News, crypto.news e KuCoin (16–19 settembre 2026)

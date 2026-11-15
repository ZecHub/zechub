# ZIP 218: cosa cambiano davvero i blocchi da 25 secondi

Nel sondaggio tra i detentori di NU7 chiuso il 14 settembre 2026, circa 2.397.669 ZEC hanno votato per ZIP 218 e 141,6 ZEC hanno votato contro, un risultato del 99,9%. La maggior parte dei resoconti lo ha riassunto come "i blocchi di Zcash diventano più veloci". È vero, ma tralascia la maggior parte di ciò che la proposta fa e di ciò che lascia deliberatamente invariato.

Questa pagina spiega ZIP 218 a partire dal suo stesso testo: cosa cambia, cosa non cambia e quanto costa.

## La versione breve

| | Prima di NU7 | Dopo ZIP 218 (NU7) |
|---|---|---|
| Spaziatura target dei blocchi | 75 secondi | 25 secondi |
| Blocchi al giorno | 1.152 | 3.456 |
| Sussidio per blocco (era di halving in corso) | 1,5625 ZEC | 0,52083333 ZEC |
| Nuovi ZEC al giorno | invariato | invariato |
| Intervallo di halving | 1.680.000 blocchi | 5.040.000 blocchi |
| Limiti sulle azioni schermate per blocco | nessuno (solo il limite di dimensione di 2 MB) | 330 in totale, con limiti per ogni pool |
| Throughput Orchard (transazioni da 2 azioni) | circa 2,9 al secondo | circa 6,6 al secondo |

![ZIP 218 riduce l'intervallo target dei blocchi da 75 secondi a 25, triplicando i blocchi giornalieri da 1,152 a 3,456, e divide la sovvenzione per blocco per lo stesso fattore di tre, da 1.5625 a 0.52083333 ZEC, così l'emissione giornaliera resta a 1,800 ZEC e l'intervallo di halving si allunga da 1,680,000 a 5,040,000 blocchi per mantenere fisse le date di halving](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Il triplo dei blocchi, ognuno dei quali paga un terzo. Il calendario di emissione resta dov'era.

## Perché cambiare il tempo di blocco

L'obiettivo principale è **ridurre il tempo di attesa**. Prima di NU7 un pagamento aspettava in media 75 secondi per la sua prima conferma, indipendentemente dal carico della rete. A 25 secondi quel tempo scende a 25 secondi in media. Il ZIP indica i pagamenti point-of-sale, i depositi su exchange e i bridge cross-chain come gli usi che ne avvertono di più l'effetto.

Due punti del ZIP meritano di essere tenuti a mente:

- **Non dice a nessuno di usare meno conferme.** Per gli utenti che mantengono la stessa tolleranza al rischio di rollback di oggi, il ZIP prevede che il tempo di conferma migliori di poco meno di tre volte.
- **Non è un sostituto del lavoro sulla finalità.** Il ZIP si descrive come complementare ai meccanismi di finalità come Crosslink. Blocchi più veloci al layer di base aiutano sia che un layer di finalità venga aggiunto in seguito, sia che non lo venga.

Il ZIP osserva anche che un throughput maggiore, da solo, si sarebbe potuto ottenere con blocchi più grandi. La latenza è il motivo per cui si sono scelti invece blocchi più brevi.

## Cosa cambia

### Emissione: stessi ZEC al giorno

Triplicare il numero di blocchi triplicherebbe l'emissione giornaliera se nulla altro cambiasse. ZIP 218 lo impedisce dividendo il sussidio per blocco per un ulteriore fattore tre, una volta che NU7 è attivo.

Nell'era di halving in corso, il sussidio per blocco passa da **1,5625 ZEC a 0,52083333 ZEC** (52.083.333 zatoshi). Poiché 156.250.000 zatoshi non si dividono esattamente per tre, ogni blocco arrotonda per difetto di un terzo di zatoshi. Su un intero intervallo di halving di 5.040.000 blocchi si tratta, in totale, di circa 0,0168 ZEC.

Il sussidio è il totale di nuovi ZEC creati per blocco. La quota esistente destinata al finanziamento dello sviluppo viene comunque prelevata da lì, quindi i miner ricevono meno della cifra completa, esattamente come oggi.

> **Una nota sulla cifra di 0,26041666 ZEC.** La nota esplicativa della bozza del ZIP riporta il sussidio post-NU7 come floor(156250000 / 6) = 0,26041666 ZEC, e alcuni resoconti giornalistici l'hanno ripetuta. Quella nota sbaglia di un fattore due: 156.250.000 zatoshi è già il sussidio post-Blossom, quindi dividerli per sei applica un'altra volta il fattore due di Blossom sopra il fattore tre di NU7. La formula normativa dà floor(1,250,000,000 / (2 · 3 · 4)) = 52,083,333 zatoshi all'indice di halving attuale. La issue di implementazione del Zebra per questa modifica ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) registra la nota come un doppio conteggio del fattore Blossom, dice agli implementatori di "implementare la formula, non la nota" e afferma che è stata presentata una correzione contro il ZIP. La cifra corretta all'attivazione è **0,52083333 ZEC**.

### Gli halving mantengono la loro tempistica

L'intervallo di halving triplica, da 1.680.000 blocchi a 5.040.000 blocchi. Poiché i blocchi arrivano tre volte più spesso, gli halving cadono comunque all'incirca nello stesso momento in cui sarebbero caduti senza la modifica. Il tetto dell'offerta totale non è toccato.

Questo è separato dall'altra questione sull'emissione nel sondaggio NU7, in cui i detentori hanno votato per mantenere gli halving invece di sostituirli con una curva smussata. ZIP 218 funziona con il modello di halving esistente e non lo cambia.

### Nuovi limiti sulle azioni schermate per blocco

ZIP 218 aggiunge limiti a quanta attività schermata un singolo blocco può contenere:

| Limite | Massimo per blocco |
|---|---|
| Tutte le pool schermate messe insieme | 330 (ogni Sprout JoinSplit conta come 2) |
| Azioni Orchard | 330 |
| Input più output Sapling | 300 |
| JoinSplit Sprout | 25 |

Le parti trasparenti delle transazioni non sono toccate, e il limite di dimensione del blocco di 2 MB continua a valere.

I limiti esistono perché altrimenti più blocchi significherebbero più lavoro per i portafogli e i nodi. Con i limiti in vigore il caso peggiore diventa in realtà **migliore** di quello di oggi, anche con il triplo dei blocchi:

- **Sincronizzazione del portafoglio:** il massimo di dati che un portafoglio leggero potrebbe essere costretto a scaricare in un giorno scende da circa 271 MB a circa 169 MB, una riduzione di circa il 38%. I tentativi di decrittazione nel caso peggiore scendono da circa 4,8 milioni a circa 2,3 milioni al giorno.
- **Verifica dei blocchi:** i benchmark del ZIP collocano un blocco Orchard nel caso peggiore a circa 432 ms con i nuovi limiti, contro circa 770 ms per il caso peggiore di oggi. Per Sapling il calo è maggiore, da circa 3.175 ms a circa 272 ms.

I limiti per Sapling e Sprout sono stretti apposta. A maggio 2026, Orchard deteneva l'87,9% degli ZEC schermati, Sapling l'11,6% e Sprout lo 0,5%, così le pool più piccole hanno spazio sufficiente per il loro utilizzo reale, lasciando allo stesso tempo a un attaccante meno da sfruttare. Poiché le commissioni di ZIP 317 addebitano lo stesso prezzo per azione logica in ogni pool, un attaccante non guadagna nulla a fare spam su una pool invece che su un'altra.

### Throughput

Con 330 azioni Orchard per blocco, una transazione Orchard standard da 2 azioni entra ⌊330 / 2⌋ = 165 volte per blocco. A un blocco ogni 25 secondi si tratta di circa **6,6 transazioni al secondo**, rispetto ai circa 2,9 di oggi — il ZIP lo definisce un aumento di 2,3× del throughput normale di Orchard. Sapling risulta di circa 3,0 al secondo, comunque al di sopra di ciò che Orchard riesce a fare oggi.

### Aggiustamento della difficoltà

L'algoritmo di difficoltà fa una media su una finestra di blocchi recenti. ZIP 218 alza quella finestra da 17 blocchi a 102, così copre ancora circa 2.550 secondi di tempo reale, lo stesso arco che copriva quando Zcash è stato lanciato con blocchi da 150 secondi. Il ZIP dà due motivi: evitare di rendere più facili gli attacchi di manipolazione della difficoltà (cita l'incidente MWEB di Litecoin dell'aprile 2026) e attenuare le variazioni a breve termine dei tempi di blocco.

Subito dopo l'attivazione, i tempi di blocco metteranno un po' a stabilizzarsi sul nuovo target. È previsto e rispecchia ciò che è successo a Blossom, quando Zcash è passato da 150 a 75 secondi.

### Impostazioni predefinite per nodi e portafogli

Sono raccomandazioni per le implementazioni, più che regole di consenso:

- **Scadenza delle transazioni:** la scadenza predefinita sale da 40 a 120 blocchi, mantenendo all'incirca gli stessi 50 minuti.
- **Profondità massima di reorg:** il limite di Zebra sale da 99 a 600 blocchi, circa 4,2 ore a 25 secondi, la stessa finestra che copriva al lancio.
- **Profondità degli anchor per le transazioni schermate:** resta a 3 blocchi, quindi il ritardo si riduce da 3,75 minuti a 1,25 minuti. Il ZIP segue qui il precedente del Blossom.
- **Diverse costanti di rete** misurate in blocchi vengono moltiplicate per tre, così da coprire la stessa quantità di tempo.

## Cosa resta invariato

- ZEC emessi al giorno, il calendario di halving e il tetto dell'offerta
- Il limite di dimensione del blocco di 2 MB
- Le transazioni trasparenti, che i nuovi limiti sulle azioni non toccano
- Maturità Coinbase a 100 blocchi. Nota che ora questo significa circa 42 minuti invece di circa 125, perché il conteggio è in blocchi, non in tempo.

## Il compromesso: più blocchi stale

I blocchi più veloci non sono gratis. Un blocco stale è un blocco valido che perde la corsa per essere incluso nella chain perché un altro blocco ha raggiunto la rete prima. Minore è il distacco tra i blocchi, più spesso succede, e il ZIP lega il tasso di blocchi stale alla propagazione dei blocchi, ai tempi di verifica e al rischio di centralizzazione del mining.

- **Prima di NU7:** circa 0,4%, e il ZIP osserva che questa cifra può sottostimare il tasso reale, poiché la hashpower è concentrata nelle pool.
- **Teorico a 25 secondi:** circa 3,26%, basato sui ritardi di propagazione di Zcash misurati.
- **Test su devnet:** 99 nodi Zebra distribuiti geograficamente, che producevano blocchi pieni da 2 MB a spaziatura di 25 secondi, hanno misurato un tasso di blocchi stale del 4,86% e un tasso di fork dello 0,37%. L'unica regolazione necessaria è stata la configurazione TCP. Poiché quella devnet era più decentralizzata della mainnet di oggi, il ZIP tratta queste cifre come prossime al caso peggiore.
- **Punto di riferimento:** il ZIP usa come soglia di sicurezza il tasso storico di blocchi stale del proof-of-work di Ethereum, pari al 5,4%. Entrambe le cifre della devnet stanno al di sotto.

Ci sono anche due costi minori. I portafogli leggeri scaricano circa 200 KB al giorno in più di header compatti dei blocchi. E poiché ci sono il triplo dei blocchi, un full node (nodo completo) rimasto offline ha più blocchi da elaborare quando si rimette in pari, anche se ogni blocco costa meno da verificare. Il ZIP accetta entrambi.

## Stato e cronologia

- **Stato su ZIP:** Proposta. Proprietari Dev Ojha ed Evan Forbes; creata il 13 marzo 2026.
- **Sondaggio tra i detentori:** chiuso il 14 settembre 2026, con il 99,9% di sostegno. Il sondaggio esprime una preferenza; di per sé non cambia le regole di consenso.
- **Cronologia:** in un annuncio sul forum della community di Zcash del 17 settembre, le organizzazioni di sviluppo hanno concordato una tempistica con codice completo entro il 30 settembre, NU7 su testnet il 6 ottobre e una decisione finale il 20 ottobre. NU7 si è attivato sulla mainnet all'altezza 3.543.405 ([ZIP 259](https://zips.z.cash/zip-0259)) il 6 novembre 2026 (UTC), quindi il target di 25 secondi è ora attivo.
- **Implementazione:** tracciata in Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) e in Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Cosa significa per te

- **Detenzione di ZEC:** niente da fare. Il tuo saldo e il calendario di emissione non sono influenzati.
- **Uso di un portafoglio:** aggiorna quando il tuo portafoglio rilascia il supporto per NU7. Le prime conferme arriveranno circa tre volte prima.
- **Gestione di un nodo, di un exchange o di un servizio:** pianifica l'aggiornamento prima dell'attivazione e rivedi tutte le impostazioni misurate in blocchi, dato che un numero fisso di blocchi ora copre un terzo del tempo che copriva prima.

## Fonti

- [ZIP 218: spaziatura target dei blocchi di 25 secondi](https://zips.z.cash/zip-0218)
- [ZIP 208: spaziatura target dei blocchi più corta](https://zips.z.cash/zip-0208), il precedente del Blossom
- [Forum: proposta — abbassare la spaziatura target dei blocchi di Zcash a 25 secondi](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: la riduzione del tempo di blocco Zcash appare sicura per NU7 con una devnet solo Zebra](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [issue #11463 di Zebra](https://github.com/ZcashFoundation/zebra/issues/11463), intervallo di halving e sussidio post-NU7
- [issue #11440 di Zebra](https://github.com/ZcashFoundation/zebra/issues/11440), tracciamento dell'implementazione di ZIP 218
- NU7 risultati del sondaggio e cronologia, come riportati da Bitcoin.com News, crypto.news e KuCoin (16–19 settembre 2026)

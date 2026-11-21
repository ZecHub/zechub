<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica la pagina"/>
</a>

# Meccanismo per la sostenibilità della rete (NSM)

> L'NSM fa parte del consenso di Zcash da quando [NU7](./NU7.md) è stato attivato sulla Mainnet al blocco 3,543,405, il 6 novembre 2026. Le commissioni vengono accantonate già da ora; la riassegnazione ai miner inizierà al blocco 8,939,664 (previsto intorno a febbraio 2031).

Cosa imparerai: cosa fa il Meccanismo per la sostenibilità della rete, quante commissioni di ogni blocco rimuove, dove va quel ZEC, quando e a quale ritmo torna sotto forma di ricompense di blocco e perché il limite di 21 milioni e il programma degli halving restano invariati.

Il Meccanismo per la sostenibilità della rete (NSM) è un insieme di regole di consenso che toglie dalla circolazione una parte di ZEC e la restituisce ai miner in seguito, distribuendola nell'arco di molti anni. NU7 ha implementato due sue parti: [ZIP 235](https://zips.z.cash/zip-0235), che rimuove dalla circolazione il 60% delle commissioni di transazione di ogni blocco, e [ZIP 237](https://zips.z.cash/zip-0237), che riassegna il ZEC rimosso in aggiunta al normale sussidio di blocco, seguendo una curva graduale. Entrambe sono state attivate da [ZIP 259](https://zips.z.cash/zip-0259).

Perché è importante. Zcash finanzia la propria sicurezza con nuovi ZEC in ogni blocco, e questo sussidio si dimezza circa ogni quattro anni. Quando diventa esiguo, i miner devono contare soprattutto sulle commissioni. L'NSM è un primo passo verso quel futuro: accantona una parte delle commissioni di oggi e la distribuisce ai miner futuri, senza aumentare il limite massimo dell'offerta e senza modificare il programma degli halving su cui le persone già fanno affidamento.

## In breve

- **Rimozione ([ZIP 235](https://zips.z.cash/zip-0235)):** in ogni blocco, il 60% delle commissioni di transazione totali (arrotondato per difetto, a favore del miner) esce dalla circolazione. Il miner trattiene il restante 40%.
- **Saldo di valore dell'NSM:** un totale progressivo pubblico di ZEC rimosso dalla circolazione e non ancora riassegnato. È uno stato di consenso, non una pool da cui qualcuno possa spendere.
- **Il saldo iniziale:** all'attivazione di NU7 il saldo era di **368.58445520 ZEC**, costituito dalle ricompense di blocco e dalle commissioni che i primi miner avevano lasciato non riscosse prima di NU6.
- **Riassegnazione ([ZIP 237](https://zips.z.cash/zip-0237)):** dal blocco **8,939,664**, ogni blocco aggiunge al sussidio di blocco una frazione fissa (0.00001375%) del saldo. In questo modo viene distribuita circa la metà del saldo per ogni periodo di halving di quattro anni.
- **Cosa resta invariato:** il programma degli halving e il limite di 21 milioni di ZEC come tetto massimo. Se il saldo arriva a zero, l'emissione segue esattamente il programma precedente.

## Analogia visiva

Pensa a un salvadanaio accanto alla cassa. Ogni volta che viene minato un blocco, il 60% delle mance (le commissioni) finisce nel salvadanaio anziché nelle tasche del miner. Nessuno può prelevare denaro dal salvadanaio a mano. Dal 2031 in poi, una piccola quota fissa di ciò che contiene viene aggiunta a ogni ricompensa di blocco, così il salvadanaio si svuota lentamente: circa la metà ogni quattro anni, con lo stesso ritmo degli halving.

## Come funziona la rimozione (ZIP 235)

- La regola si applica a ogni blocco, non a ogni transazione. Per un blocco con commissioni totali pari a `F` (in zatoshi), l'importo rimosso è `floor(6 × F / 10)` e il miner può riscuotere `F` meno tale importo.
- L'arrotondamento si applica una sola volta all'intero blocco e sempre a favore del miner. Arrotondare per transazione rimuoverebbe in totale meno del 60% (due commissioni da 1 zatoshi contribuirebbero entrambe 0).
- Esempio: da un blocco le cui transazioni pagano 50,000 zatoshi (0.0005 ZEC) di commissioni vengono rimossi 30,000 zatoshi e il miner ne riceve 20,000. Da un blocco con 15 zatoshi di commissioni ne vengono rimossi 9 e il miner ne riceve 6.
- Non serve alcun campo di transazione. Ogni nodo calcola l'importo a partire dalle commissioni che già convalida, e [ZIP 236](https://zips.z.cash/zip-0236) fa sì che la transazione coinbase richieda esattamente quanto spetta al miner, così un miner non può né rimuovere meno né riscuotere di più.
- Entità: secondo le stime di ZIP 235, sulla base del traffico precedente a NU7, le commissioni ammontavano a circa 370 ZEC all'anno, quindi ne vengono rimosse circa 222 ZEC all'anno. Oggi le commissioni sono esigue rispetto al sussidio di blocco, perciò gli autori prevedevano un impatto minimo sui miner.

## Come funziona la riassegnazione (ZIP 237)

- **Il saldo.** `NSMValueBalance` parte da 368.58445520 ZEC (36,858,445,520 zatoshi) all'attivazione di NU7. Ogni blocco aggiunge quanto rimosso da ZIP 235 e sottrae quanto è stato riassegnato. Un blocco che rendesse negativo il saldo non è valido.
- **Origine del saldo iniziale.** Prima di NU6, una transazione coinbase poteva riscuotere meno dell'intera ricompensa di blocco e delle commissioni. Nei primi 2,726,400 blocchi della chain, i miner hanno lasciato non riscosso un totale di 368.58445520 ZEC: il sussidio previsto fino a quell'altezza era di 15,750,000 ZEC, mentre l'offerta emessa era di 15,749,631.41554480 ZEC. ZIP 237 trasferisce quel valore nell'NSM affinché venga distribuito invece di andare perso.
- **Nessuna riassegnazione fino al blocco 8,939,664.** Tra NU7 e quel blocco, il saldo cresce soltanto.
- **La formula.** Dal blocco 8,939,664, il sussidio di ogni blocco riceve un importo aggiuntivo pari a `ceiling(0.0000001375 × NSMValueBalance)`, calcolato sul saldo dopo il blocco precedente. La frazione è `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000, con un intervallo di halving di 5,040,000 blocchi successivo a NU7.
- **Perché proprio questa frazione.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, quindi, se non viene rimosso altro, in ogni periodo di halving viene riassegnata circa la metà del saldo. È un decadimento esponenziale applicato solo al saldo dell'NSM, sovrapposto alle fasi degli halving che restano invariate.
- **Esempio pratico.** Se al blocco 8,939,664 il saldo fosse ancora soltanto pari al saldo iniziale di 368.58 ZEC, il primo blocco riassegnerebbe 5,069 zatoshi (circa 0.00005 ZEC), ovvero circa 0.175 ZEC al giorno con 3,456 blocchi al giorno. I valori reali saranno più alti in base alle commissioni rimosse fino a quel momento.
- **Perché il blocco 8,939,664.** ZIP 237 lo determina con una regola fissa, indipendentemente dall'importo effettivamente rimosso: il primo blocco dopo il terzo halving (blocco 6,132,390, previsto intorno a novembre 2028) in cui la frazione dell'NSM applicata a tutti i ZEC non ancora programmati per l'emissione produrrebbe un importo inferiore al normale sussidio di blocco (0.26041666 ZEC in quel periodo). I sondaggi tra i titolari di NU7 e nella community non hanno raggiunto una maggioranza condivisa su quando avviare la riassegnazione, quindi ZIP 259 adotta questo punto di crossover.

## Cosa non è cambiato

- **Il programma degli halving.** ZIP 237 mantiene le fasi di halving quadriennali. L'alternativa respinta, [ZIP 234](https://zips.z.cash/zip-0234), le avrebbe sostituite con una curva di emissione graduale; i sondaggi di agosto e settembre 2026 su NU7 chiedevano se mantenere gli halving o rendere graduale l'emissione, e NU7 ha adottato il design che preserva gli halving.
- **Il limite massimo dell'offerta.** L'offerta emessa più il saldo di valore dell'NSM cresce esattamente dell'importo del sussidio di blocco programmato per ciascun blocco, quindi l'emissione non può mai superare il limite massimo. Anzi, il limite è diminuito leggermente: l'arrotondamento di ZIP 218 del sussidio successivo a NU7 ha ridotto l'emissione totale di circa 0.50 ZEC, e l'NSM non riassegna tale differenza.
- **Rimozione volontaria.** [ZIP 233](https://zips.z.cash/zip-0233), che avrebbe permesso a chiunque di inviare ZEC nell'NSM tramite un campo esplicito della transazione, non è stato implementato in NU7. Oggi le commissioni sono l'unica fonte di rimozione. ZIP 237 permette agli ZIP futuri di aggiungere altre fonti.
- **Privacy.** Il saldo e il sussidio aggiuntivo sono calcolati a partire da valori già pubblici, quindi l'NSM non rivela nuove informazioni sulle transazioni.

## Errori comuni

- **"Il 60% delle commissioni viene bruciato."** Non in modo permanente. A differenza di un burn (il confronto abituale è l'EIP-1559 di Ethereum), il ZEC rimosso viene tracciato e riassegnato ai miner futuri.
- **"L'NSM crea ZEC extra."** No. Riassegna soltanto valore che è stato rimosso o mai riscosso; l'emissione totale resta entro il limite massimo esistente.
- **"La riassegnazione è iniziata."** Non ancora. Fino al blocco 8,939,664 il saldo si accumula soltanto.
- **"L'NSM è un fondo sotto il controllo di qualcuno."** No. È un numero nello stato di consenso e il valore può uscirne solo tramite la formula del sussidio di blocco.
- **"Gli halving sono stati eliminati."** No. Era il design di ZIP 234, che NU7 non ha implementato.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Meccanismo per la sostenibilità della rete (NSM) | Le regole di consenso che rimuovono ZEC dalla circolazione e lo riassegnano ai miner in seguito |
| Saldo di valore dell'NSM | Il totale progressivo pubblico di ZEC rimosso dalla circolazione (o mai riscosso) e non ancora riassegnato |
| Rimozione dalla circolazione | Trasferimento di ZEC dall'offerta emessa al saldo di valore dell'NSM; da NU7, si tratta del 60% delle commissioni di ogni blocco |
| Riassegnazione | Distribuzione di ZEC dal saldo di valore dell'NSM sotto forma di sussidio di blocco aggiuntivo, a partire dal blocco 8,939,664 |
| Offerta emessa | Tutti i ZEC nei pool di valore della chain; non include il saldo di valore dell'NSM |
| Sussidio di blocco | I nuovi ZEC creati in ogni blocco, ripartiti tra il miner e i flussi del fondo per lo sviluppo |
| Intervallo di halving | Il numero di blocchi tra un halving e l'altro: 5,040,000 da NU7 (circa quattro anni con blocchi da 25 secondi) |

## FAQ

**Quanto c'è oggi nell'NSM?** Il saldo iniziale di 368.58445520 ZEC più il 60% delle commissioni di ogni blocco dal blocco 3,543,405. È uno stato di consenso che ogni full node (nodo completo) tiene traccia.

**Chi riceve il ZEC riassegnato?** Viene aggiunto al sussidio di blocco, quindi è ripartito allo stesso modo: i flussi del fondo per lo sviluppo ricevono la loro percentuale fissa del sussidio totale (programmato più riassegnato) e il miner riceve il resto.

**Quando inizia la riassegnazione?** Al blocco 8,939,664 sulla Mainnet, previsto intorno a febbraio 2031 se i blocchi mantengono una media di 25 secondi. Sulla Testnet, l'altezza segue la stessa regola a partire dall'altezza di attivazione di NU7 sulla Testnet.

**Le commissioni aumenteranno a causa dell'NSM?** No. Cambia la destinazione delle commissioni, non l'importo che paghi per una transazione.

**La ripartizione 60/40 può cambiare?** Solo tramite un futuro ZIP e un aggiornamento di rete. ZIP 235 dice che la ripartizione può essere rivista se le commissioni aumentano, per esempio quando superano il sussidio di blocco.

## Verifica quanto hai capito

1. Le transazioni di un blocco pagano 100,000 zatoshi di commissioni. Quanto trattiene il miner?
2. Da dove proviene il saldo iniziale dell'NSM?
3. Se non viene rimosso altro, quale quota approssimativa del saldo dell'NSM viene riassegnata per ogni periodo di halving?
4. Perché la riassegnazione non porta l'emissione totale oltre i 21 milioni di ZEC?

Risposte: (1) 40,000 zatoshi; 60,000 vengono rimossi; (2) dalle ricompense di blocco e dalle commissioni che le transazioni coinbase hanno lasciato non riscosse prima di NU6, per un totale di 368.58445520 ZEC; (3) circa la metà; (4) la riassegnazione distribuisce soltanto valore che è stato rimosso o mai riscosso, quindi l'offerta emessa più il saldo dell'NSM cresce esattamente dell'importo del sussidio programmato a ogni blocco.

### Risorse

[ZIP 235: Rimuovere dalla circolazione il 60% delle commissioni di transazione](https://zips.z.cash/zip-0235)

[ZIP 237: Meccanismo per la sostenibilità della rete: emissione che preserva gli halving](https://zips.z.cash/zip-0237)

[ZIP 259: Implementazione dell'aggiornamento di rete NU7](https://zips.z.cash/zip-0259)

[ZIP 234: Meccanismo per la sostenibilità della rete: emissione graduale (non implementato)](https://zips.z.cash/zip-0234)

[ZIP 233: Meccanismo per la sostenibilità della rete: rimozione di fondi dalla circolazione (non implementato)](https://zips.z.cash/zip-0233)

[ZIP 236: I blocchi dovrebbero avere un bilancio esatto](https://zips.z.cash/zip-0236)

## Pagine correlate

| Pagina | Perché è correlata |
|---|---|
| [NU7](./NU7.md) | l'aggiornamento di rete che ha attivato l'NSM |
| [Politica monetaria di Zcash](../start-here/zcash-monetary-policy) | il programma degli halving e il limite massimo dell'offerta mantenuti dall'NSM |
| [Cosa cambia davvero con i blocchi da 25 secondi](../research/what-25-second-blocks-actually-change) | perché il sussidio e l'intervallo di halving sono cambiati con NU7 |
| [Fondo per lo sviluppo](../start-here/development-fund) | come viene ripartito il sussidio di blocco |
| [Transazioni](../using-zcash/transactions) | come vengono stabilite le commissioni di transazione |

---

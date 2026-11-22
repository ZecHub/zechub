<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica la pagina"/>
</a>

# NU7

> NU7 è stato attivato su Zcash Mainnet al blocco 3,543,405 il 6 novembre 2026 (02:34 UTC; la sera del 5 novembre nei fusi orari statunitensi) ed è attivo da allora.

Cosa scoprirai: cosa è cambiato con NU7 (blocchi più rapidi, limiti alle azioni schermate, riciclo delle commissioni, fine delle transazioni di versione 4), cosa è rimasto invariato e cosa hanno dovuto fare gli operatori dei nodi, i portafogli, gli exchange e i miner.

NU7 è un Zcash aggiornamento di rete [](../start-here/network-upgrades), distribuito con [ZIP 259](https://zips.z.cash/zip-0259). Ha ridotto da 75 a 25 secondi l'intervallo tra i blocchi, limitato il numero di azioni schermate contenute in un blocco, iniziato a togliere dalla circolazione il 60% delle commissioni di transazione affinché possano essere reimmesse in circolazione per i miner futuri e reso non valide le transazioni di versione 4, dismettendo così la vecchia pool Sprout. Non ha introdotto un nuovo formato di transazione. Il suo ID del ramo di consenso è `0x77190ad9`.

Perché è importante. Prima di NU7, aspettavi in media 75 secondi per una prima conferma: troppo per una cassa, un deposito su un exchange o uno scambio cross-chain. NU7 ha ridotto l'attesa a circa 25 secondi senza creare più ZEC: la ricompensa per blocco è stata ridotta a un terzo, quindi l'emissione giornaliera è rimasta invariata. È anche il primo aggiornamento che introduce un meccanismo pensato per finanziare la sicurezza della rete dopo la riduzione delle ricompense per blocco.

Se non conosci ancora Zcash, inizia da [Che cos'è ZEC e Zcash](../start-here/what-is-zec-and-zcash) e [Pool schermate](../using-zcash/shielded-pools), poi torna qui.

## In breve

In parole semplici: ora i blocchi arrivano ogni 25 secondi, la quantità di nuovi ZEC al giorno resta invariata, una parte di ogni commissione viene accantonata per i miner futuri e la vecchia pool Sprout è stata chiusa.

- **Blocchi ogni 25 secondi** ([ZIP 218](https://zips.z.cash/zip-0218)): la prima conferma arriva in circa 25 secondi invece di 75. Il sussidio per blocco è sceso da 1.5625 a 0.52083333 ZEC, quindi vengono ancora emessi circa 1,800 ZEC al giorno.
- **Limiti alle azioni schermate** (ZIP 218): al massimo 330 azioni schermate per blocco tra tutte le pool, con limiti per ciascuna pool, per mantenere i costi di convalida dei blocchi nel caso peggiore e di sincronizzazione dei portafogli al di sotto dei livelli precedenti.
- **Meccanismo di sostenibilità della rete** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): il 60% delle commissioni di transazione di ogni blocco esce dalla circolazione e viene reimmesso in circolazione per i miner in seguito, a partire dal blocco 8,939,664 (previsto intorno a febbraio 2031). Il limite massimo di 21 milioni resta invariato.
- **Le transazioni di versione 4 non sono valide** ([ZIP 2003](https://zips.z.cash/zip-2003)): i portafogli devono creare transazioni v5 o v6. Sprout può essere spesa solo con v4, quindi i fondi ancora in Sprout sono ora congelati.
- **Software**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) e le versioni successive seguono NU7. Non esiste una release `zcashd` con supporto per NU7.

## Analogia visiva

Immagina la chain come una linea ferroviaria. Prima di NU7 partiva un treno ogni 75 secondi e poteva trasportare tanti passeggeri quanti ne entravano in 2 MB. Con NU7 parte un treno ogni 25 secondi, si paga ciascun conducente con un terzo della vecchia tariffa, così il totale giornaliero resta invariato, e si limita il numero dei passeggeri più pesanti (le azioni schermate) che possono salire su un treno, in modo che nessun treno richieda troppo tempo per i controlli.

![NU7 in quattro pannelli: i blocchi sono tre volte più veloci e la quantità giornaliera di nuovi ZEC resta invariata; il 60% delle commissioni va in una riserva pubblica per le ricompense a partire dal 2031; non è più possibile spendere dal vecchio pool Sprout del 2016; il 98,9% degli ZEC che hanno votato ha scelto di mantenere gli halving](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Cosa è cambiato con NU7

### Intervallo obiettivo tra i blocchi di 25 secondi (ZIP 218)

- Ora l'algoritmo di aggiustamento della difficoltà punta a un blocco ogni **25 secondi** invece che ogni 75, perciò i blocchi arrivano con una frequenza tripla.
- Il sussidio per blocco è stato diviso per tre: **0.52083333 ZEC** per blocco nell'attuale periodo di halving (prima era 1.5625 ZEC). L'emissione giornaliera resta di circa 1,800 ZEC (3,456 blocchi al giorno invece di 1,152).
- Gli halving continuano ad avvenire ogni quattro anni. Poiché i blocchi sono più rapidi, il prossimo halving è stato spostato al blocco **6,132,390**, previsto verso la fine di novembre 2028 con intervalli di 25 secondi (ZIP 259).
- La finestra di calcolo della difficoltà è passata da 17 a **102 blocchi**, così l'aggiustamento considera ancora un intervallo di tempo simile.
- La scadenza predefinita delle transazioni è passata da 40 a **120 blocchi**, mantenendosi intorno ai 50 minuti.

### Limiti alle azioni schermate (ZIP 218)

Ora ogni blocco ha un budget condiviso e limiti per ciascuna pool:

| Limite | Per blocco |
|---|---|
| Tutte le azioni schermate tra le pool | 330 |
| Azioni Orchard | 330 |
| Azioni Ironwood | 330 |
| Input + output Sapling | 300 |
| Sprout JoinSplits | non consentiti |

Prima di NU7, un blocco completo da 2 MB poteva contenere circa 617 azioni Orchard o Ironwood, oppure circa 2,107 output Sapling, senza limiti per ciascuna pool. ZIP 218 stabilisce i nuovi limiti affinché, anche con blocchi tre volte più frequenti, il carico massimo per i nodi e per la sincronizzazione dei portafogli sia inferiore a prima (per esempio, la larghezza di banda massima per la sincronizzazione schermata dei light client scende da circa 271 a 169 MB al giorno), mentre il throughput del protocollo Orchard più che raddoppia (da circa 2.9 a 6.6 transazioni al secondo per transazioni con 2 azioni).

### Meccanismo di sostenibilità della rete (ZIP 235 + ZIP 237)

- **Rimozione delle commissioni (ZIP 235):** il 60% delle commissioni di transazione di ogni blocco viene tolto dalla circolazione; il restante 40% va al miner come prima. A differenza di un burn, le ZEC rimosse vengono tracciate così da poter essere emesse di nuovo in seguito.
- **Reimmissione in circolazione (ZIP 237):** le ZEC rimosse sono conservate in uno stato di consenso pubblico chiamato NSM Value Balance. È stato alimentato inizialmente a NU7 con il valore che i miner avevano lasciato non riscosso in passato. A partire dal blocco **8,939,664** (previsto intorno a febbraio 2031), ogni blocco emette una quota fissa di quel saldo, in aggiunta al normale programma di halving.
- Il limite massimo dell'offerta non aumenta. Quando il saldo è pari a zero, l'emissione segue esattamente il vecchio programma di halving.
- NU7 **non** ha attivato [ZIP 233](https://zips.z.cash/zip-0233) (rimozione volontaria da parte degli utenti) né [ZIP 234](https://zips.z.cash/zip-0234) (sostituzione degli halving con una curva graduale). Nei sondaggi tra i detentori di ZEC è stato scelto il progetto che mantiene gli halving in ZIP 237.
- I dettagli numerici (il saldo iniziale di 368.58 ZEC, la quota di reimmissione per blocco e il motivo per cui inizia al blocco 8,939,664) sono nella pagina [Meccanismo di sostenibilità della rete](./Network_Sustainability_Mechanism.md).

### Transazioni di versione 4 non consentite (ZIP 2003)

- Da NU7 in poi, tutte le transazioni di versione 4 non sono valide: non solo i trasferimenti Sprout, ma anche le transazioni solo trasparenti e quelle Sapling create nel formato v4. Le transazioni di versione 5 (NU5) e di versione 6 ([Ironwood](../zcash-tech/ironwood)) restano invariate.
- I trasferimenti Sprout esistono solo nel formato v4, quindi non è più possibile spendere dalla pool [Sprout](../zcash-tech/sprout). Vedi [Recuperare i fondi](../using-zcash/recovering-funds).

### Modifiche minori

- Revisioni alle regole del fondo per lo sviluppo per adattarne i flussi di finanziamento ai blocchi da 25 secondi ([ZIP 207](https://zips.z.cash/zip-0207) revisione 2, [ZIP 214](https://zips.z.cash/zip-0214) revisione 3) e aggiornamento di un elenco di indirizzi dei flussi di finanziamento ([ZIP 2008](https://zips.z.cash/zip-2008)).
- I nodi NU7 annunciano la versione di protocollo di rete **170190** su Mainnet e disconnettono i peer meno recenti dopo l'attivazione.

## Cosa non ha fatto NU7

- **Nessun nuovo formato di transazione.** NU7 ha evitato deliberatamente un'altra migrazione di portafogli e parser subito dopo che Ironwood aveva introdotto le transazioni v6.
- **Nessuna modifica al limite massimo dell'offerta o al ritmo degli halving quadriennali.**
- **Nessuna modifica alla maturità della coinbase.** Le monete ottenute con il mining devono ancora attendere 100 blocchi prima di poter essere spese (ora circa 42 minuti invece di circa 2 ore).
- **Nessuna nuova pool schermata.** Ironwood (NU6.3) resta la pool più recente; Orchard consente ancora solo di spendere, come avviene da Ironwood.

## Cosa doveva fare ciascun gruppo

- **Operatori dei nodi:** esegui [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) o una versione successiva. Zebra 7 sposta il database dal formato v28 al formato v29 al primo avvio e Zebra 6.x non può leggere v29, quindi fai un backup di `state/v28` prima di aggiornare. `zcashd` non ha una release NU7 (la più recente è la 6.20.0, di giugno 2026); la guida alla migrazione delle API del libro Zebra [zcashd](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) indica come sostituire ogni RPC `zcashd` con Zebra, [Zallet](../zcash-tech/zallet) o un suo sostituto. Vedi [Full node](../zcash-tech/full-nodes) e la guida [rafforzata per Zebra](../guides/hardened-zebrad).
- **Portafogli:** smetti di creare transazioni v4, usa la scadenza predefinita di 120 blocchi, mantieni la profondità di ancoraggio di 3 blocchi (ora circa 1.25 minuti) e rispetta i limiti alle azioni per blocco. Una transazione che da sola supera un limite non potrà mai essere inclusa nel mining.
- **Exchange e servizi di pagamento:** ora una conferma richiede 25 secondi, quindi lo stesso numero di conferme copre un terzo del tempo. Ricontrolla il numero di conferme dei depositi in base al tempo e al livello di sicurezza che desideri davvero, invece di mantenere per abitudine il vecchio numero.
- **Miner e pool:** il software di mining e i template devono usare il nuovo sussidio, la ripartizione delle commissioni e i limiti alle azioni; i blocchi creati secondo le vecchie regole vengono rifiutati.

## Errori comuni

- **"Il mio vecchio nodo è ancora in funzione, quindi va tutto bene."** Solo per NU7, ZIP 259 ha derogato alla regola abituale per cui il software precedente all'aggiornamento si arresta prima dell'attivazione. Un nodo Zebra 6.x o un nodo `zcashd` può restare online seguendo le vecchie regole e scollegarsi senza che te ne accorga dalla chain reale. Controlla che il tuo nodo segnali un'altezza superiore a 3,543,405 e che corrisponda a un block explorer.
- **"Blocchi più rapidi significano che viene emesso più ZEC."** No. Il sussidio per blocco è sceso a un terzo, quindi l'emissione giornaliera è invariata.
- **"Il 60% delle commissioni viene bruciato per sempre."** No. Viene tolto dalla circolazione e poi reimmesso in circolazione per i miner tramite il NSM; il limite massimo dell'offerta resta invariato.
- **"La modifica a v4 riguarda solo gli utenti Sprout."** Qualsiasi portafoglio o script che continuava a creare transazioni v4, comprese quelle solo trasparenti e quelle Sapling, ha smesso di funzionare. Le transazioni v4 in attesa sono diventate non valide al momento dell'attivazione e firmarle di nuovo non basta a renderle valide.
- **"Le impostazioni basate sul numero di blocchi restano invariate."** Tutto ciò che si misura in blocchi (conferme, scadenze, tempi di blocco e timeout) ora scorre tre volte più rapidamente in tempo reale.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Block target spacing | Il tempo medio tra blocchi a cui punta l'algoritmo di aggiustamento della difficoltà: 25 secondi da NU7 |
| Block subsidy | I nuovi ZEC creati in ogni blocco, ripartiti tra il miner e i flussi del fondo per lo sviluppo |
| Shielded action | Un'unità di lavoro schermato in una transazione (un'azione Orchard o Ironwood oppure un input o output Sapling) |
| Network Sustainability Mechanism (NSM) | Le regole che tolgono dalla circolazione una parte delle commissioni e la reimmettono in circolazione per i miner futuri |
| NSM Value Balance | Il saldo progressivo pubblico degli ZEC tolti dalla circolazione e in attesa di essere reimmessi |
| Version 4 transaction | Il formato di transazione di Sapling, reso non valido da NU7; v5 e v6 restano validi |
| Consensus branch ID | Il numero che identifica un insieme di regole di consenso; le firme lo includono, quindi una transazione firmata secondo le vecchie regole non è valida secondo le nuove |

## Domande frequenti

**Quando è stato attivato NU7?** Al blocco 3,543,405 di Mainnet il 6 novembre 2026 alle 02:34 UTC. Testnet è stato attivato prima, al blocco 4,465,026 il 4 ottobre 2026.

**La ricompensa per blocco è cambiata?** Per blocco, sì: 0.52083333 ZEC invece di 1.5625 ZEC. Al giorno, no: circa 1,800 ZEC in entrambi i casi.

**Il mio Sprout ZEC è andato perso?** Non può più essere spostato, perché le transazioni Sprout richiedono v4 e ora non sono più valide. Vedi [Recuperare i fondi](../using-zcash/recovering-funds) per sapere cosa significa in pratica.

**Mi serve un nuovo portafoglio?** Ti serve una versione del portafoglio che supporti NU7. La pagina ZecHub[Portafogli](../using-zcash/wallets) mostra quali portafogli sono compatibili con NU7.

**Quando inizia la reimmissione delle commissioni?** Al blocco 8,939,664 di Mainnet, previsto intorno a febbraio 2031 se i blocchi mantengono una media di 25 secondi.

**Perché NU7 ha rinunciato a un nuovo formato di transazione?** Per evitare ai portafogli e ai parser una seconda migrazione subito dopo il formato v6 di Ironwood e perché la ripartizione delle commissioni viene calcolata per blocco, quindi non serviva un nuovo campo nella transazione.

## Verifica la tua comprensione

1. Perché l'emissione giornaliera di ZEC resta invariata dopo NU7?
2. Che cosa succede al 60% delle commissioni tolte dalla circolazione?
3. Perché i fondi Sprout non possono essere spesi dopo NU7?
4. Perché un nodo che non è mai stato aggiornato è particolarmente rischioso con questo aggiornamento?

Risposte: (1) il sussidio per blocco è stato ridotto a un terzo, mentre i blocchi sono diventati tre volte più frequenti; (2) confluiscono nel NSM Value Balance e vengono reimmessi in circolazione per i miner a partire dal blocco 8,939,664; (3) le transazioni Sprout esistono solo nel formato v4, che NU7 ha reso non valido; (4) ZIP 259 ha disattivato l'arresto automatico, quindi un vecchio nodo può continuare a funzionare sulla chain sbagliata.

### Risorse

[ZIP 259: distribuzione dell'aggiornamento di rete NU7](https://zips.z.cash/zip-0259)

[ZIP 218: intervallo obiettivo tra i blocchi di 25 secondi](https://zips.z.cash/zip-0218)

[ZIP 235: rimozione dalla circolazione del 60% delle commissioni di transazione](https://zips.z.cash/zip-0235)

[ZIP 237: meccanismo di sostenibilità della rete: emissione che mantiene gli halving](https://zips.z.cash/zip-0237)

[ZIP 2003: divieto delle transazioni di versione 4](https://zips.z.cash/zip-2003)

[Zebra note di rilascio della versione 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash forum della community: NU7 cronologia](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Pagine correlate

| Pagina | Perché è correlata |
|---|---|
| [Ironwood](./Ironwood.md) | l'aggiornamento precedente della serie, che ha introdotto le transazioni v6 |
| [Cosa cambia davvero con i blocchi ogni 25 secondi](../research/what-25-second-blocks-actually-change) | un approfondimento sulla maggiore velocità dei blocchi |
| [Meccanismo di sostenibilità della rete](./Network_Sustainability_Mechanism.md) | come funzionano, con i relativi numeri, la rimozione e la reimmissione in circolazione delle commissioni dopo l'attivazione di NU7 |
| [Sprout](./Sprout.md) | la pool NU7 dismessa |
| [Recuperare i fondi](../using-zcash/recovering-funds) | cosa comporta il congelamento di Sprout per i vecchi fondi |
| [Transazioni](../using-zcash/transactions) | scadenze e conferme dopo NU7 |

---

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Ironwood](../zcash-tech/ironwood)

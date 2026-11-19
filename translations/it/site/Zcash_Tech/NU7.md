<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7

> NU7 si è attivato sulla Mainnet di Zcash al blocco 3.543.405 il 6 novembre 2026 (02:34 UTC; la serata del 5 novembre nei fusi orari statunitensi) ed è attivo da allora.

Cosa ricaverai da questa pagina: cosa ha cambiato NU7 (blocchi più veloci, limiti alle azioni schermate, riciclaggio delle commissioni, la fine delle transazioni di versione 4), cosa ha lasciato invariato e cosa hanno dovuto fare gli operatori di nodi, i portafogli, gli exchange e i miner.

NU7 è un Zcash [aggiornamento di rete](../start-here/network-upgrades), distribuito tramite lo [ZIP 259](https://zips.z.cash/zip-0259). Ha ridotto il tempo tra i blocchi da 75 a 25 secondi, ha posto un tetto al numero di azioni schermate che possono entrare in un blocco, ha iniziato a sottrarre dalla circolazione il 60% delle commissioni delle transazioni perché possano essere riemesse ai futuri miner, e ha reso non valide le transazioni di versione 4, ritirando così la vecchia pool Sprout. Non ha introdotto un nuovo formato di transazione. Il suo ID di branch di consenso è `0x77190ad9`.

Perché è importante. Prima di NU7 attendevi in media 75 secondi per una prima conferma, il che è lento per la cassa di un negozio, un deposito su un exchange o uno scambio cross-chain. NU7 ha portato questo tempo a circa 25 secondi senza emettere più ZEC: la ricompensa per blocco è stata tagliata a un terzo, quindi l'emissione giornaliera è rimasta invariata. È anche il primo aggiornamento che aggiunge un meccanismo pensato per pagare la sicurezza della rete dopo che le ricompense di blocco si saranno ridotte.

Nuovo a Zcash? Inizia con [Cos'è ZEC e Zcash](../start-here/what-is-zec-and-zcash) e [pool schermate](../using-zcash/shielded-pools), poi torna qui.

## TL;DR

In parole semplici: ora i blocchi arrivano ogni 25 secondi, la quantità di nuovi ZEC al giorno resta la stessa, una parte di ogni commissione viene accantonata per i miner del futuro e la vecchia pool Sprout è chiusa.

- **Blocchi da 25 secondi** ([ZIP 218](https://zips.z.cash/zip-0218)): prima conferma in circa 25 secondi invece di 75. La sovvenzione di blocco è scesa da 1,5625 a 0,52083333 ZEC, quindi vengono comunque emessi circa 1.800 ZEC al giorno.
- **Limiti alle azioni schermate** (ZIP 218): al massimo 330 azioni schermate per blocco su tutte le pool, con tetti per singola pool, per mantenere i costi del caso peggiore di validazione dei blocchi e di sincronizzazione dei portafogli al di sotto di quelli di prima.
- **Meccanismo di sostenibilità della rete** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): il 60% delle commissioni delle transazioni di ogni blocco esce dalla circolazione e viene riemesso in seguito ai miner, a partire dal blocco 8.939.664 (previsto attorno a febbraio 2031). Il tetto dell'offerta di 21 milioni resta invariato.
- **Le transazioni di versione 4 non sono più valide** ([ZIP 2003](https://zips.z.cash/zip-2003)): i portafogli devono costruire transazioni v5 o v6. Sprout può essere speso solo con v4, quindi i fondi ancora in Sprout ora sono congelati.
- **Software**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) e versioni successive seguono NU7. Non esiste una release di `zcashd` con supporto per NU7.

## Analogia visiva

Pensa alla chain come a una linea ferroviaria. Prima di NU7 un treno partiva ogni 75 secondi e poteva trasportare quanti passeggeri ne entrassero in 2 MB. NU7 fa partire un treno ogni 25 secondi, paga a ogni macchinista un terzo della vecchia tariffa così il totale giornaliero resta identico, e impone un limite a quanti dei passeggeri più pesanti (le azioni schermate) possono salire a bordo di un treno, così nessun singolo treno può metterci troppo tempo a essere controllato.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Cosa ha cambiato NU7

### Spaziatura obiettivo dei blocchi di 25 secondi (ZIP 218)

- L'aggiustamento della difficoltà ora punta a un blocco ogni **25 secondi** invece di 75, quindi un blocco arriva tre volte più spesso.
- La sovvenzione di blocco è stata divisa per tre: **0,52083333 ZEC** per blocco nell'attuale periodo di halving (prima era 1,5625 ZEC). L'emissione giornaliera resta di circa 1.800 ZEC (3.456 blocchi al giorno invece di 1.152).
- Gli halving avvengono comunque ogni quattro anni. Poiché i blocchi sono più veloci, il prossimo halving si è spostato al blocco **6.132.390**, previsto attorno a fine novembre 2028 con la spaziatura di 25 secondi (ZIP 259).
- La finestra di media della difficoltà è passata da 17 a **102 blocchi**, così l'aggiustamento considera ancora un intervallo di tempo simile.
- La scadenza predefinita delle transazioni è passata da 40 a **120 blocchi**, il che la mantiene a circa 50 minuti.

### Limiti alle azioni schermate (ZIP 218)

Ogni blocco ora ha un budget condiviso e tetti per singola pool:

| Limite | Per blocco |
|---|---|
| Tutte le azioni schermate nelle pool | 330 |
| Azioni Orchard | 330 |
| Azioni Ironwood | 330 |
| Input + output Sapling | 300 |
| Sprout JoinSplits | nessuna consentita |

Prima di NU7, un blocco pieno da 2 MB poteva contenere circa 617 azioni Orchard o Ironwood oppure circa 2.107 output Sapling, senza limiti per singola pool. Lo ZIP 218 stabilisce i nuovi tetti in modo che, anche con tre volte più blocchi, il caso peggiore per i nodi e per i portafogli in sincronizzazione sia più basso di prima (per esempio, la larghezza di banda massima per la sincronizzazione schermata di un light client scende da circa 271 a 169 MB al giorno), mentre il throughput del protocollo Orchard più che raddoppia (da circa 2,9 a 6,6 transazioni al secondo per transazioni da 2 azioni).

### Meccanismo di sostenibilità della rete (ZIP 235 + ZIP 237)

- **Rimozione delle commissioni (ZIP 235):** il 60% delle commissioni delle transazioni di ogni blocco viene tolto dalla circolazione; l'altro 40% va al miner come prima. A differenza di un burn, il ZEC rimosso viene tracciato così che possa essere emesso di nuovo in futuro.
- **Riemissione (ZIP 237):** il ZEC rimosso è conservato in uno stato di consenso pubblico chiamato saldo di valore NSM. È stato inizializzato all'attivazione di NU7 con 368.58 ZEC di valore che i miner hanno lasciato non riscattato in passato. Dal blocco **8.939.664** (previsto attorno a febbraio 2031), ogni blocco emette una porzione fissa di quel saldo in aggiunta al normale calendario di halving.
- Il tetto dell'offerta non sale. Quando il saldo è a zero, l'emissione segue esattamente il vecchio calendario di halving.
- NU7 non ha distribuito lo [ZIP 233](https://zips.z.cash/zip-0233) (rimozione volontaria da parte degli utenti) né lo [ZIP 234](https://zips.z.cash/zip-0234) (sostituzione degli halving con una curva graduale). Le consultazioni tra i detentori delle monete hanno scelto il design che preserva gli halving in ZIP 237.

### Transazioni di versione 4 non consentite (ZIP 2003)

- Da NU7 in poi, ogni transazione di versione 4 non è valida: non solo i trasferimenti Sprout, ma anche le transazioni solo trasparenti e Sapling costruite nel formato v4. Le transazioni di versione 5 (NU5) e di versione 6 ([Ironwood](../zcash-tech/ironwood)) restano invariate.
- I trasferimenti Sprout esistono solo nel formato v4, quindi la pool [Sprout](../zcash-tech/sprout) non può più essere spesa. Vedi [Recuperare i fondi](../using-zcash/recovering-funds).

### Dettagli minori

- Revisioni delle regole del fondo di sviluppo perché i flussi di finanziamento funzionino con blocchi da 25 secondi ([ZIP 207](https://zips.z.cash/zip-0207) Revisione 2, [ZIP 214](https://zips.z.cash/zip-0214) Revisione 3), e un aggiornamento a un elenco di indirizzi dei flussi di finanziamento ([ZIP 2008](https://zips.z.cash/zip-2008)).
- I nodi NU7 annunciano la versione **170190** del protocollo di rete sulla Mainnet e si disconnettono dai peer più vecchi dopo l'attivazione.

## Cosa non ha fatto NU7

- **Nessun nuovo formato di transazione.** NU7 ha deliberatamente evitato un'altra migrazione per portafogli e parser subito dopo che Ironwood aveva introdotto le transazioni v6.
- **Nessuna modifica al tetto dell'offerta né al ritmo di halving di quattro anni.**
- **Nessuna modifica alla maturità della coinbase.** Le monete estratte devono comunque attendere 100 blocchi prima di poter essere spese (ora circa 42 minuti invece di circa 2 ore).
- **Nessuna nuova pool schermata.** Ironwood (NU6.3) resta la pool più recente; Orchard resta di sola spesa, com'è stato fin da Ironwood.

## Cosa ha dovuto fare ciascun gruppo

- **Operatori di nodi:** esegui [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) o una versione successiva. Zebra 7 converte il proprio database dal formato v28 al v29 al primo avvio, e Zebra 6.x non riesce a leggere il v29, quindi esegui un backup di `state/v28` prima dell'aggiornamento. `zcashd` non ha una release per NU7 (la sua release più recente è la 6.20.0, di giugno 2026); il libro di Zebra offre una [guida alla migrazione delle API zcashd](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) che mappa ogni RPC di `zcashd` su Zebra, [Zallet](../zcash-tech/zallet) o sul suo sostituto. Vedi [Full node (nodo completo)](../zcash-tech/full-nodes) e la [guida Hardened Zebra](../guides/hardened-zebrad).
- **Portafogli:** smetti di costruire transazioni v4, usa la scadenza predefinita di 120 blocchi, mantieni la profondità di ancoraggio di 3 blocchi (ora circa 1,25 minuti) e rispetta i limiti di azioni per blocco. Una transazione che da sola supera un limite non può mai essere minata.
- **Exchange e servizi di pagamento:** una conferma ora richiede 25 secondi, quindi lo stesso numero di conferme copre un terzo del tempo. Rivedi i numeri di conferma dei depositi in base al tempo e alla sicurezza che vuoi realmente, invece di mantenere il vecchio numero per abitudine.
- **Miner e pool:** il software di mining e i template devono usare la nuova sovvenzione, la suddivisione delle commissioni e i limiti di azioni; i blocchi costruiti con le vecchie regole vengono rifiutati.

## Errori comuni

- **"Il mio vecchio nodo è ancora attivo, quindi va bene."** Solo per NU7, ZIP 259 ha derogato alla regola abituale per cui il software precedente all'aggiornamento si spegne da solo prima dell'attivazione. Uno Zebra 6.x o un nodo `zcashd` può restare online con le vecchie regole e staccarsi silenziosamente dalla chain reale. Controlla che il tuo nodo riporti un'altezza superiore a 3.543.405 e corrisponda a un block explorer.
- **"Blocchi più veloci significano che viene emesso più ZEC."** No. La sovvenzione per blocco è scesa a un terzo, quindi l'emissione giornaliera è invariata.
- **"Il 60% delle commissioni viene bruciato per sempre."** No. Vengono rimosse e in seguito riemesse ai miner dall'NSM; il tetto dell'offerta è invariato.
- **"Solo gli utenti Sprout sono interessati dalla modifica v4."** Qualsiasi portafoglio o script che produce ancora transazioni v4, incluse quelle solo trasparenti e Sapling, ha smesso di funzionare. Le transazioni v4 in attesa sono diventate non valide all'attivazione, e una semplice rifirma non può renderle valide.
- **"Le impostazioni espresse in blocchi si riportano così come sono."** Tutto ciò che è misurato in blocchi (conferme, scadenze, lock time, timeout) ora passa in tempo reale tre volte più in fretta.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Block target spacing | Il tempo medio tra i blocchi a cui punta l'aggiustamento della difficoltà: 25 secondi da NU7 |
| Block subsidy | I nuovi ZEC creati in ogni blocco, ripartiti tra il miner e i flussi del fondo di sviluppo |
| Shielded action | Un'unità di lavoro schermato in una transazione (un'azione Orchard o Ironwood, oppure un input o un output Sapling) |
| Network Sustainability Mechanism (NSM) | Le regole che tolgono dalla circolazione una parte delle commissioni e le riemettono ai futuri miner |
| NSM Value Balance | Il totale pubblico aggiornato di ZEC rimossi dalla circolazione e in attesa di essere riemessi |
| Version 4 transaction | Il formato di transazione di Sapling, reso non valido da NU7; v5 e v6 restano validi |
| Consensus branch ID | Il numero che identifica un insieme di regole di consenso; le firme vi si impegnano, quindi una transazione firmata per le vecchie regole non è valida sotto le nuove |

## FAQ

**Quando si è attivato NU7?** Al blocco 3.543.405 della Mainnet il 6 novembre 2026 alle 02:34 UTC. La Testnet si è attivata prima, al blocco 4.465.026 il 4 ottobre 2026.

**La ricompensa di blocco è cambiata?** Per blocco, sì: 0,52083333 ZEC invece di 1,5625 ZEC. Al giorno, no: circa 1.800 ZEC in entrambi i casi.

**Il mio Sprout ZEC è perduto?** Non si può più spostare, perché le spese Sprout richiedono transazioni v4 e queste ora non sono valide. Vedi [Recuperare i fondi](../using-zcash/recovering-funds) per cosa significa in pratica.

**Mi serve un nuovo portafoglio?** Ti serve una versione di portafoglio che supporti NU7. ZecHub mostra sulla sua pagina [Portafogli](../using-zcash/wallets) quali portafogli sono compatibili con NU7.

**Quando inizia la riemissione delle commissioni?** Al blocco 8.939.664 sulla Mainnet, previsto attorno a febbraio 2031 se i blocchi mantengono una media di 25 secondi.

**Perché NU7 ha rinunciato a un nuovo formato di transazione?** Per risparmiare ai portafogli e ai parser una seconda migrazione subito dopo il formato v6 di Ironwood, e perché la suddivisione delle commissioni è calcolata per blocco, quindi non serviva alcun nuovo campo nella transazione.

## Metti alla prova la tua comprensione

1. Perché l'emissione giornaliera di ZEC resta invariata dopo NU7?
2. Cosa succede al 60% delle commissioni rimosse dalla circolazione?
3. Perché i fondi Sprout non possono essere spesi dopo NU7?
4. Perché un nodo mai aggiornato è particolarmente rischioso in questo aggiornamento?

Risposte: (1) la sovvenzione per blocco è stata tagliata a un terzo mentre i blocchi sono diventati tre volte più frequenti; (2) finiscono nel saldo di valore NSM e vengono riemesse ai miner a partire dal blocco 8.939.664; (3) le spese Sprout esistono solo nel formato v4, che NU7 ha reso non valido; (4) ZIP 259 ha rinunciato allo spegnimento automatico, quindi un vecchio nodo può continuare a funzionare sulla chain sbagliata.

### Risorse

[ZIP 259: distribuzione dell'aggiornamento di rete NU7](https://zips.z.cash/zip-0259)

[ZIP 218: spaziatura obiettivo dei blocchi di 25 secondi](https://zips.z.cash/zip-0218)

[ZIP 235: rimuovere il 60% delle commissioni delle transazioni dalla circolazione](https://zips.z.cash/zip-0235)

[ZIP 237: meccanismo di sostenibilità della rete: emissione che preserva gli halving](https://zips.z.cash/zip-0237)

[ZIP 2003: vietare le transazioni di versione 4](https://zips.z.cash/zip-2003)

[Zebra note di rilascio della 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Community Forum: cronologia di NU7](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Pagine correlate

| Pagina | Perché è correlata |
|---|---|
| [Ironwood](./Ironwood.md) | l'aggiornamento precedente della serie, che ha introdotto le transazioni v6 |
| [Cosa cambiano davvero i blocchi da 25 secondi](../research/what-25-second-blocks-actually-change) | uno sguardo più approfondito al tempo di blocco più rapido |
| [Sprout](./Sprout.md) | la pool NU7 ritirata |
| [Recuperare i fondi](../using-zcash/recovering-funds) | cosa significa per i vecchi fondi il congelamento di Sprout |
| [Transazioni](../using-zcash/transactions) | scadenza e conferme dopo NU7 |

---

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Ironwood](../zcash-tech/ironwood)

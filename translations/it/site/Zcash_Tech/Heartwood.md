<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood è stato attivato sulla mainnet di Zcash al blocco 903.000 (16 luglio 2020 UTC).

Cosa imparerai: come Heartwood ha permesso ai miner di ricevere le loro ricompense di blocco direttamente in indirizzi schermati e come ha reso verificabile la prova di lavoro di Zcash da parte di light client.

Heartwood è un [aggiornamento di rete](../start-here/network-upgrades) di Zcash, un hard fork delle regole di consenso la cui attivazione è definita in [ZIP 250](https://zips.z.cash/zip-0250). Includeva due modifiche di funzionalità: [ZIP 213](https://zips.z.cash/zip-0213) (Coinbase schermata) e [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood è stato il quarto grande aggiornamento di rete di Zcash ed è stato supportato congiuntamente dalla [Electric Coin Company](../zcash-organizations/electric-coin-company) e dalla [Zcash Foundation](../zcash-organizations/zcash-foundation). Come ogni aggiornamento di Zcash, ha introdotto un nuovo consensus branch id, un tag che fornisce protezione bidirezionale dal replay, così che una transazione costruita secondo le nuove regole non possa essere riprodotta sulla vecchia chain, e viceversa.

Heartwood si attiva a un'altezza di blocco prestabilita (903.000), non a un'ora fissa, quindi il minuto esatto che vedi su una dashboard può differire leggermente da un posto all'altro. Il blocco, e il momento, sono gli stessi.

Perché è importante. I miner guadagnano gli ZEC di nuova emissione ogni volta che minano un blocco. Prima di Heartwood, quel guadagno doveva arrivare in un indirizzo trasparente, quindi pubblico. Chiunque poteva vedere quanto guadagnava un miner e dove andavano poi le monete. Heartwood ha permesso invece che quella ricompensa andasse direttamente in un indirizzo schermato, così il compenso di un miner può restare privato. Ha anche reso possibile per i light client e altre chain verificare la prova di lavoro di Zcash senza scaricare l'intera chain.

## Coinbase schermata

La transazione coinbase è la transazione speciale che distribuisce la ricompensa di un blocco. Prima di Heartwood, i suoi output dovevano essere trasparenti, quindi gli ZEC appena creati di un miner iniziavano sempre la loro esistenza in un indirizzo pubblico. Heartwood ha cambiato le regole di consenso affinché, nelle parole di ZIP 213, le transazioni coinbase possano contenere output Sapling. In termini semplici, i miner possono ora ricevere le ricompense direttamente in indirizzi Sapling schermati. Gli output coinbase trasparenti restano supportati, quindi si tratta di una nuova opzione, non di un cambiamento obbligatorio.

![Prima di Heartwood la ricompensa di blocco di un miner doveva andare a un indirizzo pubblico trasparente. Dopo Heartwood le transazioni coinbase possono contenere output Sapling, quindi la ricompensa può andare direttamente a un indirizzo schermato](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Perché prima Sapling

La coinbase schermata riguarda specificamente gli output Sapling, e c'è una ragione per questo. ZIP 213 spiega che l'aggiornamento Sapling ha introdotto cambiamenti architetturali e miglioramenti delle prestazioni che hanno reso fattibile schermare i fondi direttamente nella transazione coinbase. La pool schermata originale Sprout richiedeva troppe risorse per schermare direttamente nella coinbase. Il sistema di prova più efficiente e il formato delle note di Sapling l'hanno reso pratico. Sapling aveva a sua volta esteso la vecchia regola che vietava gli output coinbase schermati in modo che coprisse anche gli output Sapling, e Heartwood allenta quella regola per consentirli. È un buon esempio di come gli aggiornamenti di Zcash si costruiscano l'uno sull'altro: l'infrastruttura di un aggiornamento diventa la base per il successivo.

## FlyClient

Heartwood ha anche cambiato a cosa fa commitment l'header di un blocco. Il campo dell'header precedentemente chiamato hashFinalSaplingRoot è stato riutilizzato e rinominato in hashLightClientRoot. Ora fa commitment alla radice di un Merkle Mountain Range (MMR), una struttura incrementale costruita sui dati dell'header e sui metadati dei blocchi precedenti, come timestamp, target di difficoltà, radici Sapling, lavoro accumulato e conteggi delle transazioni. Questo commitment permette a un light client, o a una chain esterna, di verificare la prova di lavoro di Zcash usando una piccola prova la cui dimensione cresce solo in modo logaritmico rispetto alla lunghezza della chain. Il vantaggio è avere portafogli light client migliori e un'integrazione più semplice con terze parti e cross-chain, perché un client non deve più scaricare ogni blocco per fidarsi del lavoro dietro la chain.

![Flusso di FlyClient: i dati dell'header di ogni blocco vengono inclusi in una root di Merkle Mountain Range (hashLightClientRoot), che permette a un client leggero di verificare la proof-of-work con una piccola prova di dimensione logaritmica](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Dove si colloca Heartwood

Heartwood è una tappa in una serie di aggiornamenti di Zcash, ognuno dei quali aggiunge un elemento su cui il successivo fa affidamento. Overwinter e Sapling sono arrivati nel 2018, Blossom nel 2019 e Heartwood nel 2020 al blocco 903.000. Canopy è seguito più tardi nel 2020 al blocco 1.046.400. Sapling è l'anello chiave di questa chain per Heartwood: il suo efficiente meccanismo di transazioni schermate era la precondizione tecnica che ha reso possibile la coinbase schermata.

![Cronologia degli aggiornamenti di Zcash: Overwinter e Sapling nel 2018, Blossom nel 2019 e Heartwood nel 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## In breve

- Heartwood è stato attivato al blocco 903.000 della mainnet (16 luglio 2020 UTC), distribuito tramite ZIP 250 con un nuovo consensus branch id per la protezione bidirezionale dal replay.
- ZIP 213 (Shielded Coinbase): le transazioni coinbase possono contenere output Sapling, così i miner possono ricevere le ricompense dei blocchi direttamente in un indirizzo schermato.
- ZIP 221 (FlyClient): il campo hashLightClientRoot dell'header ora fa commitment a un Merkle Mountain Range, permettendo ai light client di verificare la proof-of-work con prove che crescono solo in modo logaritmico.
- Gli output coinbase trasparenti sono ancora pienamente supportati: la coinbase schermata è una nuova opzione, non un obbligo.
- L'attivazione avviene a un'altezza di blocco, non a un orario preciso, quindi il minuto esatto varia tra dashboard e fusi orari.

## Spiegazione di base

Prima di Heartwood, i ZEC appena coniati da un miner dovevano iniziare la loro esistenza in un indirizzo trasparente, quindi chiunque poteva osservare le entrate di un miner e tracciarne la destinazione. Lo ZIP 213 ha allentato la regola di consenso in modo che la transazione coinbase possa pagare output Sapling, mantenendo privato il compenso di un miner fin dal primo istante della sua esistenza. Si rivolge specificamente a Sapling perché la generazione efficiente delle prove di Sapling ha reso pratica la schermatura all'interno della coinbase; le prove pesanti di Sprout non erano realizzabili in quel contesto.

ZIP 221 ha riconvertito il campo dell'intestazione hashFinalSaplingRoot in hashLightClientRoot. Ora impegna una Merkle Mountain Range costruita sui dati delle intestazioni dei blocchi precedenti: timestamp, target di difficoltà, radici Sapling, lavoro accumulato, numero di transazioni. Un light client o un'altra chain può così verificare la proof-of-work di Zcash con una piccola prova invece di scaricare ogni blocco.

## Analogia visiva

Prima, il giorno di paga di ogni miner veniva affisso su una bacheca pubblica: chiunque poteva leggerne l'importo e la traccia. Dopo, il giorno di paga può arrivare in una busta sigillata. E ora ogni nuovo blocco porta con sé un piccolo sigillo di ceralacca che riassume tutti i blocchi precedenti, così uno sconosciuto può verificare con un'occhiata l'intera catena di lavoro invece di leggere ogni pagina.

## Approfondimento

La modifica della regola aveva una storia: Sapling aveva esteso il divieto originale sulle coinbase schermate anche agli output Sapling, e Heartwood ha rimosso tale restrizione per consentirli. È un chiaro esempio di come l'infrastruttura di un aggiornamento diventi la base di quello successivo. Il commitment MMR dà i suoi frutti nei portafogli leggeri e nell'integrazione cross-chain, dove in precedenza verificare il lavoro di Zcash richiedeva il download dell'intera chain. Il consensus branch id aggiunto all'attivazione offre una protezione dal replay in entrambe le direzioni: una transazione costruita secondo le nuove regole non può essere riprodotta sulla vecchia chain, e viceversa.

## Errori comuni

- **Pensare che la coinbase schermata sia diventata obbligatoria.** Gli output coinbase trasparenti sono ancora validi; sono i miner a scegliere.
- **Presumere che Sprout possa ricevere la coinbase schermata.** Sono consentiti solo gli output Sapling: la generazione delle prove di Sprout richiedeva troppe risorse.
- **Credere che FlyClient elimini la necessità dei full node (nodi completi).** Serve i light client e i verificatori cross-chain; i full node restano comunque il punto di riferimento della rete.
- **Cercare un orario di attivazione fisso.** L'attivazione è stata definita al blocco 903.000, quindi il minuto esatto sull'orologio varia.
- **Confondere hashLightClientRoot con il vecchio hashFinalSaplingRoot.** Lo stesso campo è stato riutilizzato e rinominato.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Network upgrade (NU) | Una modifica coordinata alle regole di consenso di Zcash, attivata a un'altezza di blocco prestabilita |
| Coinbase transaction | La transazione speciale in ogni blocco che distribuisce la ricompensa del blocco |
| Shielded Sapling address | Un tipo di indirizzo Zcash schermato introdotto con l'aggiornamento Sapling |
| Shielded coinbase | La modifica di Heartwood che consente di pagare le ricompense dei blocchi in indirizzi Sapling schermati |
| FlyClient | Un metodo che permette ai client leggeri di verificare la proof-of-work con piccole prove |
| Merkle Mountain Range (MMR) | Un riepilogo incrementale dei blocchi passati a cui l'header del blocco fa commitment |
| Consensus branch id | Un tag che identifica quali regole di aggiornamento segue una transazione, usato per la protezione dal replay |

## FAQ

Heartwood cambia i miei ZEC o la mia privacy? No. Heartwood non ha toccato i tuoi fondi esistenti. Ha aggiunto l'opzione per i miner di ricevere ricompense in indirizzi schermati e ha migliorato il supporto per i light client. I tuoi saldi e le tue transazioni schermate non sono influenzati.

Che cos'è la coinbase schermata? La coinbase è la transazione che distribuisce la ricompensa di un blocco. Heartwood permette che quella ricompensa vada in un indirizzo Sapling schermato invece che in uno trasparente, così il reddito del miner può restare privato.

I miner devono ora ricevere le ricompense schermate? No. La coinbase schermata è facoltativa. Gli output coinbase trasparenti restano supportati, quindi i miner possono scegliere una delle due opzioni.

Perché la coinbase schermata usa Sapling e non la vecchia pool Sprout? Perché il design più efficiente di Sapling ha reso pratico schermare direttamente nella coinbase. La precedente pool Sprout richiedeva troppe risorse per farlo.

Che cosa è cambiato per i light client? L'header del blocco ora fa commitment a un Merkle Mountain Range sui blocchi passati tramite il campo hashLightClientRoot. Questo permette ai light client e ad altre chain di verificare la prova di lavoro di Zcash con piccole prove di dimensione logaritmica invece che con l'intera chain.

## Metti alla prova la tua comprensione

Prima di Heartwood, perché la ricompensa di blocco pagata a un miner compariva pubblicamente, e che cosa ha cambiato Heartwood?

<details>
<summary>Risposta</summary>

Gli output Coinbase dovevano essere trasparenti, quindi la ricompensa appena coniata di un miner finiva sempre in un indirizzo trasparente pubblico che chiunque poteva ispezionare. Heartwood ha modificato le regole di consenso (ZIP 213) in modo che le transazioni coinbase possano contenere output Sapling, permettendo ai miner di ricevere le ricompense direttamente in indirizzi schermati.
</details>

### Risorse

[ZIP 250: Attivazione dell'aggiornamento di rete Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Coinbase schermata](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Modifiche a livello di consenso](https://zips.z.cash/zip-0221)

[Aggiornamento di rete Heartwood](https://z.cash/upgrade/heartwood/)

### Vedi anche

[Aggiornamenti di rete di Zcash](../start-here/network-upgrades)

[Pool schermate](../using-zcash/shielded-pools)

[Portafogli](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## Pagine correlate

- [Sapling](./Sapling.md): il meccanismo efficiente che ha reso possibile il coinbase schermato
- [Canopy](./Canopy.md): il prossimo aggiornamento della serie
- [Full node](./Full_Nodes.md): cosa offre ancora la verifica completa
- [Cosa può vedere un block explorer](./What_a_Block_Explorer_Can_See.md): cosa rivela il coinbase trasparente rispetto a quello schermato

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Blossom](../zcash-tech/blossom) · Successivo: [Canopy](../zcash-tech/canopy)

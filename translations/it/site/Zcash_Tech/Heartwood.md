<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood è stato attivato sulla mainnet di Zcash al blocco 903.000 (16 luglio 2020 UTC).

Cosa imparerai: come Heartwood ha permesso ai miner di ricevere le loro ricompense di blocco direttamente in indirizzi shielded e come ha reso verificabile la proof-of-work di Zcash da parte di client leggeri.

Heartwood è un [aggiornamento di rete](../start-here/network-upgrades) di Zcash, un hard fork delle regole di consenso la cui attivazione è definita in [ZIP 250](https://zips.z.cash/zip-0250). Includeva due modifiche di funzionalità: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) e [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood è stato il quarto grande aggiornamento di rete di Zcash ed è stato supportato congiuntamente dalla [Electric Coin Company](../zcash-organizations/electric-coin-company) e dalla [Zcash Foundation](../zcash-organizations/zcash-foundation). Come ogni aggiornamento di Zcash, ha introdotto un nuovo consensus branch id, un tag che fornisce protezione bidirezionale dal replay, così che una transazione costruita secondo le nuove regole non possa essere riprodotta sulla vecchia catena, e viceversa.

Heartwood si attiva a un'altezza di blocco prestabilita (903.000), non a un'ora fissa, quindi il minuto esatto che vedi su una dashboard può differire leggermente da un posto all'altro. Il blocco, e il momento, sono gli stessi.

Perché è importante. I miner guadagnano ZEC di nuova emissione ogni volta che minano un blocco. Prima di Heartwood, quel guadagno doveva arrivare in un indirizzo trasparente, quindi pubblico. Chiunque poteva vedere quanto guadagnava un miner e dove andavano poi le monete. Heartwood ha permesso invece che quella ricompensa andasse direttamente in un indirizzo shielded, così il compenso di un miner può restare privato. Ha anche reso possibile per wallet leggeri e altre catene verificare la proof-of-work di Zcash senza scaricare l'intera catena.

## Coinbase shielded

La transazione coinbase è la transazione speciale che distribuisce la ricompensa di un blocco. Prima di Heartwood, i suoi output dovevano essere trasparenti, quindi i ZEC appena creati di un miner iniziavano sempre la loro esistenza in un indirizzo pubblico. Heartwood ha cambiato le regole di consenso affinché, nelle parole di ZIP 213, le transazioni coinbase possano contenere output Sapling. In termini semplici, i miner possono ora ricevere le ricompense direttamente in indirizzi Sapling shielded. Gli output coinbase trasparenti restano supportati, quindi si tratta di una nuova opzione, non di un cambiamento obbligatorio.

![Prima di Heartwood la ricompensa di blocco di un miner doveva andare a un indirizzo pubblico trasparente. Dopo Heartwood le transazioni coinbase possono contenere output Sapling, quindi la ricompensa può andare direttamente a un indirizzo shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Perché prima Sapling

La coinbase shielded riguarda specificamente gli output Sapling, e c'è una ragione per questo. ZIP 213 spiega che l'aggiornamento Sapling ha introdotto cambiamenti architetturali e miglioramenti delle prestazioni che hanno reso fattibile schermare i fondi direttamente nella transazione coinbase. Il pool shielded originale Sprout richiedeva troppe risorse per schermare direttamente nella coinbase. Il sistema di proving più efficiente e il formato delle note di Sapling l'hanno reso pratico. Sapling aveva a sua volta esteso la vecchia regola che vietava gli output coinbase shielded in modo che coprisse anche gli output Sapling, e Heartwood allenta quella regola per consentirli. È un buon esempio di come gli aggiornamenti di Zcash si costruiscano l'uno sull'altro: l'infrastruttura di un aggiornamento diventa la base per il successivo.

## FlyClient

Heartwood ha anche cambiato a cosa fa commitment l'header di un blocco. Il campo dell'header precedentemente chiamato hashFinalSaplingRoot è stato riutilizzato e rinominato in hashLightClientRoot. Ora fa commitment alla root di un Merkle Mountain Range (MMR), una struttura incrementale costruita sui dati dell'header e sui metadati dei blocchi precedenti, come timestamp, target di difficoltà, root Sapling, lavoro accumulato e conteggi delle transazioni. Questo commitment permette a un client leggero, o a una catena esterna, di verificare la proof-of-work di Zcash usando una piccola prova la cui dimensione cresce solo in modo logaritmico rispetto alla lunghezza della catena. Il vantaggio è avere wallet light-client migliori e un'integrazione più semplice con terze parti e tra catene, perché un client non deve più scaricare ogni blocco per fidarsi del lavoro dietro la catena.

![Flusso di FlyClient: i dati dell'header di ogni blocco vengono inclusi in una root di Merkle Mountain Range (hashLightClientRoot), che permette a un client leggero di verificare la proof-of-work con una piccola prova di dimensione logaritmica](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Dove si colloca Heartwood

Heartwood è una tappa in una serie di aggiornamenti di Zcash, ognuno dei quali aggiunge un elemento su cui il successivo fa affidamento. Overwinter e Sapling sono arrivati nel 2018, Blossom nel 2019 e Heartwood nel 2020 al blocco 903.000. Canopy è seguito più tardi nel 2020 al blocco 1.046.400. Sapling è l'anello chiave di questa catena per Heartwood: il suo efficiente meccanismo di transazioni shielded era la precondizione tecnica che ha reso possibile la coinbase shielded.

![Cronologia degli aggiornamenti di Zcash: Overwinter e Sapling nel 2018, Blossom nel 2019 e Heartwood nel 2020](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Aggiornamento di rete (NU) | Una modifica coordinata alle regole di consenso di Zcash, attivata a un'altezza di blocco prestabilita |
| Transazione coinbase | La transazione speciale in ogni blocco che distribuisce la ricompensa del blocco |
| Indirizzo Sapling shielded | Un tipo di indirizzo privato di Zcash introdotto con l'aggiornamento Sapling |
| Coinbase shielded | La modifica di Heartwood che permette di pagare le ricompense di blocco in indirizzi Sapling shielded |
| FlyClient | Un metodo che permette ai client leggeri di verificare la proof-of-work con piccole prove |
| Merkle Mountain Range (MMR) | Un riepilogo incrementale dei blocchi passati a cui l'header del blocco fa commitment |
| Consensus branch id | Un tag che identifica quali regole di aggiornamento segue una transazione, usato per la protezione dal replay |

## FAQ

Heartwood cambia i miei ZEC o la mia privacy? No. Heartwood non ha toccato i tuoi fondi esistenti. Ha aggiunto l'opzione per i miner di ricevere ricompense in indirizzi shielded e ha migliorato il supporto per i client leggeri. I tuoi saldi e le tue transazioni shielded non sono influenzati.

Che cos'è la coinbase shielded? La coinbase è la transazione che distribuisce la ricompensa di un blocco. Heartwood permette che quella ricompensa vada in un indirizzo Sapling shielded invece che in uno trasparente, così il reddito del miner può restare privato.

I miner devono ora ricevere le ricompense in modalità shielded? No. La coinbase shielded è facoltativa. Gli output coinbase trasparenti restano supportati, quindi i miner possono scegliere una delle due opzioni.

Perché la coinbase shielded usa Sapling e non il vecchio pool Sprout? Perché il design più efficiente di Sapling ha reso pratico schermare direttamente nella coinbase. Il precedente pool Sprout richiedeva troppe risorse per farlo.

Che cosa è cambiato per i client leggeri? L'header del blocco ora fa commitment a un Merkle Mountain Range sui blocchi passati tramite il campo hashLightClientRoot. Questo permette ai client leggeri e ad altre catene di verificare la proof-of-work di Zcash con piccole prove di dimensione logaritmica invece che con l'intera catena.

## Metti alla prova la tua comprensione

Prima di Heartwood, perché la ricompensa di blocco pagata a un miner compariva pubblicamente, e che cosa ha cambiato Heartwood?

<details>
<summary>Risposta</summary>

Gli output coinbase dovevano essere trasparenti, quindi la ricompensa appena creata di un miner finiva sempre in un indirizzo trasparente pubblico che chiunque poteva ispezionare. Heartwood ha cambiato le regole di consenso (ZIP 213) in modo che le transazioni coinbase possano contenere output Sapling, permettendo ai miner di ricevere le loro ricompense direttamente in indirizzi shielded.
</details>

### Risorse

[ZIP 250: Attivazione dell'aggiornamento di rete Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Modifiche a livello di consenso](https://zips.z.cash/zip-0221)

[Aggiornamento di rete Heartwood](https://z.cash/upgrade/heartwood/)

### Vedi anche

[Aggiornamenti di rete di Zcash](../start-here/network-upgrades)

[Pool shielded](../using-zcash/shielded-pools)

[Wallet](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Blossom](../zcash-tech/blossom) · Successivo: [Canopy](../zcash-tech/canopy)

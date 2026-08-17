---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling è stato attivato sulla mainnet di Zcash al blocco 419.200 (29 ottobre 2018, 02:15 UTC).

Cosa imparerai: Sapling ha reso i pagamenti privati su Zcash abbastanza veloci e leggeri da poter funzionare su un telefono o su un hardware wallet.

Sapling è stato il secondo importante aggiornamento della rete Zcash, attivato nel secondo anniversario di Zcash. È stato un hard fork di consenso che ha ricostruito il modo in cui vengono assemblate le transazioni shielded (private). Il deployment è definito da ZIP 205, le nuove regole di firma delle transazioni da ZIP 243, ed entrambe si basano su ZIP 200, il meccanismo di aggiornamento della rete. Tutti i dettagli completi si trovano nella Zcash Protocol Specification. Electric Coin Company ha realizzato l'aggiornamento e ha distribuito la prima versione che lo supportava, zcashd 2.0.0, nell'agosto 2018. On-chain, la rete identifica le regole di Sapling tramite il suo consensus branch id.

Perché è importante. Prima di Sapling, effettuare un pagamento davvero privato significava aspettare minuti mentre il tuo computer elaborava gigabyte di memoria per costruire la proof. Era troppo lento e troppo pesante per la maggior parte delle persone, quindi molti utenti, exchange e negozi evitavano le transazioni shielded e inviavano invece ZEC in chiaro. Sapling ha ridotto il lavoro a pochi secondi e a circa 40 megabyte di memoria. Questo singolo cambiamento è ciò che ha reso gli ZEC shielded pratici da usare nella vita quotidiana, su normali telefoni e su hardware wallet.

## Cosa è cambiato

Il cuore di Sapling è un modo più veloce per costruire la zero-knowledge proof che mantiene privata una transazione shielded. Il design originale di Sprout usava un unico circuito di proving (il circuito JoinSplit), che era lento e richiedeva molta memoria. Sapling lo ha sostituito con due circuiti progettati appositamente, un circuito Spend e un circuito Output, descritti nella Zcash Protocol Specification. Il risultato è un grande calo dei costi. Secondo Electric Coin Company, una transazione shielded può essere costruita in appena pochi secondi usando circa 40 megabyte di memoria. Il riferimento pre-Sapling di Sprout era molto più pesante, nell'ordine di minuti e diversi gigabyte di memoria (queste cifre lato Sprout sono il riferimento approssimativo più citato).

![Costo delle transazioni shielded: Sprout rispetto a Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Nuove chiavi

Sapling ha anche introdotto un nuovo insieme di indirizzi e chiavi shielded. Una chiave può derivare molti indirizzi diversificati, che sono indirizzi di pagamento separati che un osservatore esterno non può collegare tra loro. Sapling ha aggiunto anche le viewing key: una full viewing key o una incoming viewing key ti permette di condividere la possibilità di vedere i dettagli delle transazioni di un wallet senza cedere la possibilità di spendere i suoi fondi. Questo è utile per audit, contabilità o semplicemente per dimostrare che un pagamento è stato effettuato.

Un cambiamento correlato è che Sapling ha separato il compito di costruire la proof da quello di firmare la transazione. Il dispositivo che costruisce la zero-knowledge proof non deve più essere il dispositivo che detiene l'autorizzazione di spesa. Questo disaccoppiamento è ciò che consente a un hardware wallet di mantenere isolata la tua spending key mentre un dispositivo separato esegue il lavoro di proving più pesante.

![Il dispositivo di proving consegna la proof a un dispositivo di firma separato](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Il trusted setup

I circuiti di Sapling si basano su un insieme di parametri pubblici che dovevano essere generati con attenzione. Se una singola parte li avesse prodotti da sola e avesse conservato i dati segreti residui (i "toxic waste"), quella parte avrebbe potuto falsificare le proof. Per evitarlo, i parametri sono derivati da una cerimonia in due fasi e multi-party. La fase 1, chiamata Powers of Tau, era indipendente dai circuiti, cioè non era legata ai circuiti specifici di Sapling. La fase 2, la Sapling MPC, era specifica per il circuito. Ogni fase rimane sicura finché almeno un partecipante è stato onesto e ha distrutto i propri toxic waste, quindi la cerimonia fallisce solo se ogni singolo partecipante collude.

## Come si è attivato

Sapling ha seguito Overwinter, l'aggiornamento del giugno 2018 che ha preparato il meccanismo di aggiornamento della rete. Electric Coin Company ha fissato l'altezza di attivazione su mainnet in zcashd 2.0.0, rilasciato nell'agosto 2018, e la rete è passata alle regole di Sapling quando è stato minato il blocco 419.200. On-chain, quel momento è contrassegnato dal consensus branch id di Sapling.

![Cronologia dal lancio di Zcash all'attivazione di Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Transazione shielded | Una transazione privata di Zcash che nasconde mittente, destinatario e importo. |
| Sprout | Il protocollo shielded originale con cui è stato lanciato Zcash, più lento e pesante di Sapling. |
| Circuiti Spend e Output | I due nuovi circuiti di proving di Sapling che hanno sostituito l'unico circuito JoinSplit di Sprout. |
| Indirizzo diversificato | Uno dei molti indirizzi di pagamento non collegabili che puoi derivare da una singola chiave. |
| Viewing key | Una chiave che permette a qualcuno di vedere le transazioni di un wallet senza poter spendere da esso. |
| Consensus branch id | Un codice breve che indica alla rete quali regole di aggiornamento segue una transazione. |

## FAQ

Sapling ha cambiato la quantità di ZEC che possiedo? No. Sapling ha cambiato il modo in cui vengono costruite le transazioni shielded, non la quantità di ZEC posseduta da qualcuno né l'offerta totale. Il tuo saldo non è stato influenzato.

Il mio ZEC è ancora privato dopo Sapling? Sì, ed è più utilizzabile. Sapling ha mantenuto la forte privacy delle transazioni shielded e le ha rese abbastanza veloci ed economiche da essere davvero usate. I fondi shielded restano nascosti nello stesso modo.

Devo fare qualcosa? Non è richiesta alcuna azione da parte tua come holder. Sapling è stato un aggiornamento di rete adottato dal software dei wallet e dei nodi. I wallet moderni supportano già gli indirizzi Sapling.

Qual è la differenza tra Sprout e Sapling? Sprout è stato il primo protocollo shielded e usava un solo circuito di proving lento e pesante in termini di memoria. Sapling lo ha sostituito con i più veloci circuiti Spend e Output, ha aggiunto le viewing key e gli indirizzi diversificati, e ha reso le transazioni shielded abbastanza leggere per telefoni e hardware wallet.

Perché alcune fonti dicono 28 ottobre e altre 29 ottobre? L'altezza di attivazione era stata fissata in anticipo con l'obiettivo del 28 ottobre 2018. Il blocco che ha effettivamente attivato il cambiamento, il blocco 419.200, è stato minato nelle prime ore del 29 ottobre UTC. In molti fusi orari locali era ancora il 28 ottobre. In entrambi i casi si tratta dello stesso blocco e dello stesso momento.

Che cos'è una viewing key? Una viewing key ti permette di condividere l'accesso in lettura a un wallet shielded. Chi possiede una full viewing key o una incoming viewing key può vedere i dettagli delle transazioni del wallet ma non può spendere i suoi fondi. Vedi [Viewing Keys](../zcash-tech/viewing-keys) per saperne di più.

## Verifica la tua comprensione

Perché, con Sprout, così tante persone evitavano le transazioni shielded, e in che modo Sapling ha risolto il problema?

<details>
<summary>Risposta</summary>
Con Sprout, costruire una transazione shielded richiedeva minuti e usava gigabyte di memoria, quindi era troppo lenta e pesante per la maggior parte degli utenti, degli exchange e dei negozi. Sapling ha introdotto i più veloci circuiti Spend e Output, che hanno ridotto il lavoro a pochi secondi e circa 40 megabyte, rendendo pratiche le transazioni shielded su telefoni di tutti i giorni e hardware wallet.
</details>

### Risorse

- [ZIP 205: Deployment del Sapling Network Upgrade](https://zips.z.cash/zip-0205)
- [ZIP 243: Validazione della firma delle transazioni per Sapling](https://zips.z.cash/zip-0243)
- [Pagina dell'aggiornamento Sapling di Zcash](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: annuncio di Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: annuncio della Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Vedi anche

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Aggiornamenti di rete di Zcash](../start-here/network-upgrades)
- [Wallet](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Overwinter](../zcash-tech/overwinter) · Successivo: [Blossom](../zcash-tech/blossom)

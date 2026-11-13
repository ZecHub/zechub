<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling è stato attivato sulla mainnet di Zcash al blocco 419.200 (29 ottobre 2018, 02:15 UTC).

Cosa imparerai: Sapling ha reso i pagamenti privati su Zcash abbastanza veloci e leggeri da poter funzionare su un telefono o su un portafoglio hardware.

Sapling è stato il secondo importante aggiornamento di rete di Zcash, attivato nel secondo anniversario di Zcash. È stato un hard fork di consenso che ha ricostruito il modo in cui vengono assemblate le transazioni schermate (private). L'implementazione è definita da ZIP 205, le nuove regole di firma delle transazioni da ZIP 243, ed entrambe si basano su ZIP 200, il meccanismo di aggiornamento di rete. Tutti i dettagli completi si trovano nella Zcash Protocol Specification. Electric Coin Company ha realizzato l'aggiornamento e ha distribuito la prima versione che lo supportava, zcashd 2.0.0, nell'agosto 2018. On-chain, la rete identifica le regole di Sapling tramite il suo consensus branch id.

Perché è importante. Prima di Sapling, effettuare un pagamento davvero privato significava aspettare minuti mentre il tuo computer elaborava gigabyte di memoria per costruire la prova. Era troppo lento e troppo pesante per la maggior parte delle persone, quindi molti utenti, gli exchange e i negozi evitavano le transazioni schermate e inviavano invece ZEC in chiaro. Sapling ha ridotto il lavoro a pochi secondi e a circa 40 megabyte di memoria. Questo singolo cambiamento è ciò che ha reso gli ZEC schermati pratici da usare nella vita quotidiana, su normali telefoni e su portafogli hardware.

## In breve

- Sapling è stato il secondo importante aggiornamento di rete di Zcash, attivato al blocco 419.200 (29 ottobre 2018, 02:15 UTC) — il secondo anniversario di Zcash.
- Ha ricostruito le transazioni schermate attorno a due circuiti progettati appositamente (Spend e Output), sostituendo l'unico e lento circuito JoinSplit di Sprout (ZIP 205, ZIP 243).
- Il risultato: la costruzione delle prove è passata da minuti e gigabyte di memoria a pochi secondi e circa 40 MB, abbastanza leggera per telefoni e portafogli hardware.
- Nuove funzionalità: indirizzi diversificati (molti indirizzi di pagamento non collegabili da un'unica chiave), chiavi di visualizzazione per accesso solo di audit e separazione della generazione delle prove dalla firma.
- I suoi parametri provenivano da una cerimonia multifirma in due fasi (Powers of Tau + Sapling MPC); la sicurezza è garantita se anche un solo partecipante è stato onesto.

## Analogia visiva

Sprout era un corriere privato che portava a mano ogni lettera attraverso il paese — perfettamente riservato, ma lento e faticoso. Sapling ha trasformato lo stesso corriere in un ciclista con uno zaino leggero: ancora riservato, ma abbastanza veloce per le consegne quotidiane. E le nuove chiavi di visualizzazione sono come dare a un revisore una finestra chiara sul registro del corriere senza mai consegnare le chiavi del carico.

## Cosa è cambiato

Il cuore di Sapling è un modo più veloce per costruire la prova a conoscenza zero che mantiene privata una transazione schermata. Il design originale di Sprout usava un unico circuito di proving (il circuito JoinSplit), che era lento e richiedeva molta memoria. Sapling lo ha sostituito con due circuiti progettati appositamente, un circuito Spend e un circuito Output, descritti nella Zcash Protocol Specification. Il risultato è un grande calo dei costi. Secondo Electric Coin Company, una transazione schermata può essere costruita in appena pochi secondi usando circa 40 megabyte di memoria. Il riferimento pre-Sapling di Sprout era molto più pesante, nell'ordine di minuti e diversi gigabyte di memoria (queste cifre lato Sprout sono il riferimento approssimativo più citato).

![Costo di una transazione schermata Sprout rispetto a Sapling](/content-images/sapling-before-after-a045b0b48f.webp)

## Nuove chiavi

Sapling ha anche introdotto un nuovo insieme di indirizzi e chiavi schermati. Una chiave può derivare molti indirizzi diversificati, che sono indirizzi di pagamento separati che un osservatore esterno non può collegare tra loro. Sapling ha aggiunto anche le chiavi di visualizzazione: una chiave di visualizzazione completa o in ingresso ti permette di condividere la possibilità di vedere i dettagli delle transazioni di un portafoglio senza cedere la possibilità di spendere i suoi fondi. Questo è utile per audit, contabilità o semplicemente per dimostrare che un pagamento è stato effettuato.

Un cambiamento correlato è che Sapling ha separato il compito di costruire la prova da quello di firmare la transazione. Il dispositivo che costruisce la prova a conoscenza zero non deve più essere il dispositivo che detiene l'autorizzazione di spesa. Questo disaccoppiamento è ciò che consente a un portafoglio hardware di mantenere isolate le tue chiavi di spesa mentre un dispositivo separato esegue il lavoro di proving più pesante.

![Il dispositivo di proving consegna la proof a un dispositivo di firma separato](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## Il trusted setup

I circuiti di Sapling si basano su un insieme di parametri pubblici che dovevano essere generati con attenzione. Se una singola parte li avesse prodotti da sola e avesse conservato i dati segreti residui (i "toxic waste"), quella parte avrebbe potuto falsificare le proof. Per evitarlo, i parametri sono derivati da una cerimonia in due fasi e multi-party. La fase 1, chiamata Powers of Tau, era indipendente dai circuiti, cioè non era legata ai circuiti specifici di Sapling. La fase 2, la Sapling MPC, era specifica per il circuito. Ogni fase rimane sicura finché almeno un partecipante è stato onesto e ha distrutto i propri toxic waste, quindi la cerimonia fallisce solo se ogni singolo partecipante collude.

## Come si è attivato

Sapling ha seguito Overwinter, l'aggiornamento del giugno 2018 che ha preparato il meccanismo di aggiornamento della rete. Electric Coin Company ha fissato l'altezza di attivazione su mainnet in zcashd 2.0.0, rilasciato nell'agosto 2018, e la rete è passata alle regole di Sapling quando è stato minato il blocco 419.200. On-chain, quel momento è contrassegnato dal consensus branch id di Sapling.

![Cronologia dal lancio di Zcash all'attivazione di Sapling](/content-images/sapling-timeline-6cad184c30.webp)

## Errori comuni

- **Dare per scontato che i pagamenti schermati fossero sempre utilizzabili.** Prima di Sapling, la costruzione delle prove richiedeva minuti e gigabyte di memoria, quindi la maggior parte degli utenti, degli exchange e dei negozi saltava del tutto le transazioni schermate.
- **Definire gli indirizzi di Sapling uguali a quelli di Sprout.** Sapling ha introdotto tipi di indirizzi e chiavi propri, oltre a indirizzi diversificati e chiavi di visualizzazione; le chiavi di Sprout non sono interoperabili con gli indirizzi di Sapling.
- **Credere che il trusted setup fosse "il segreto di un'unica azienda".** Era una cerimonia multi-parte: solo se tutti i partecipanti avessero colluso sarebbe stato possibile falsificare le prove.
- **Pensare che Sapling abbia modificato l'emissione o i saldi.** Ha cambiato il modo in cui vengono costruite le transazioni schermate: nessun importo in ZEC è stato influenzato.
- **Dare per scontato che la generazione delle prove e la firma debbano avvenire sullo stesso dispositivo.** La separazione di Sapling è proprio ciò che consente ai portafogli hardware di mantenere isolate le chiavi di spesa mentre un altro dispositivo costruisce le prove.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Shielded transaction | Una transazione schermata di Zcash che nasconde il mittente, il destinatario e l'importo. |
| Sprout | Il protocollo schermato originale con cui è stato lanciato Zcash, più lento e pesante di Sapling. |
| Spend and Output circuits | I due nuovi circuiti di proving di Sapling che hanno sostituito l'unico circuito JoinSplit di Sprout. |
| Diversified address | Uno dei molti indirizzi di pagamento non collegabili che puoi derivare da una singola chiave. |
| Viewing Key | Una chiave che permette a qualcuno di vedere le transazioni di un portafoglio senza poter spendere da esso. |
| Consensus branch id | Un codice breve che indica alla rete quali regole di aggiornamento segue una transazione. |

## FAQ

Sapling ha cambiato la quantità di ZEC che possiedi? No. Sapling ha cambiato il modo in cui vengono costruite le transazioni schermate, non la quantità di ZEC posseduta da qualcuno né l'offerta totale. Il tuo saldo non è stato influenzato.

Il mio ZEC è ancora privato dopo Sapling? Sì, ed è più utilizzabile. Sapling ha mantenuto la forte privacy delle transazioni schermate e le ha rese abbastanza veloci ed economiche da essere davvero usate. I fondi schermati restano nascosti nello stesso modo.

Devo fare qualcosa? Non è richiesta alcuna azione da parte tua come holder. Sapling è stato un aggiornamento di rete adottato dal software dei portafogli e dei nodi. I portafogli moderni supportano già gli indirizzi Sapling.

Qual è la differenza tra Sprout e Sapling? Sprout è stato il primo protocollo schermato e usava un solo circuito di proving lento e pesante in termini di memoria. Sapling lo ha sostituito con i più veloci circuiti Spend e Output, ha aggiunto le chiavi di visualizzazione e gli indirizzi diversificati, e ha reso le transazioni schermate abbastanza leggere per telefoni e portafogli hardware.

Perché alcune fonti dicono 28 ottobre e altre 29 ottobre? L'altezza di attivazione era stata fissata in anticipo con l'obiettivo del 28 ottobre 2018. Il blocco che ha effettivamente attivato il cambiamento, il blocco 419.200, è stato minato nelle prime ore del 29 ottobre UTC. In molti fusi orari locali era ancora il 28 ottobre. In entrambi i casi si tratta dello stesso blocco e dello stesso momento.

Che cos'è una chiave di visualizzazione? Una chiave di visualizzazione ti permette di condividere l'accesso in lettura a un portafoglio schermato. Chi possiede una chiave di visualizzazione completa o in ingresso può vedere i dettagli delle transazioni del portafoglio ma non può spendere i suoi fondi. Vedi [Chiavi di visualizzazione](../zcash-tech/viewing-keys) per saperne di più.

## Verifica la tua comprensione

Perché, con Sprout, così tante persone evitavano le transazioni schermate, e in che modo Sapling ha risolto il problema?

<details>
<summary>Risposta</summary>
Con Sprout, costruire una transazione schermata richiedeva minuti e usava gigabyte di memoria, quindi era troppo lenta e pesante per la maggior parte degli utenti, degli exchange e dei negozi. Sapling ha introdotto i più veloci circuiti Spend e Output, che hanno ridotto il lavoro a pochi secondi e circa 40 megabyte, rendendo pratiche le transazioni schermate su telefoni di tutti i giorni e portafogli hardware.
</details>

### Risorse

- [ZIP 205: Deployment del Sapling Network Upgrade](https://zips.z.cash/zip-0205)
- [ZIP 243: Validazione della firma delle transazioni per Sapling](https://zips.z.cash/zip-0243)
- [Pagina dell'aggiornamento Sapling di Zcash](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: annuncio di Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: annuncio della Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Vedi anche

- [Pool schermate](../using-zcash/shielded-pools)
- [Chiavi di visualizzazione](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Aggiornamenti di rete di Zcash](../start-here/network-upgrades)
- [Portafogli](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

## Pagine correlate

- [Viewing Keys](./Viewing_Keys.md) — la funzionalità di condivisione per gli audit Sapling introdotta
- [Sprout](./Sprout.md) — il protocollo schermato originale Sapling sostituito
- [Blossom](./Blossom.md) — il prossimo aggiornamento della serie (tempistiche dei blocchi, non crittografia)
- [zk_SNARKS](./zk_SNARKS.md) — la tecnologia a conoscenza zero alla base dei circuiti

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Overwinter](../zcash-tech/overwinter) · Successivo: [Blossom](../zcash-tech/blossom)

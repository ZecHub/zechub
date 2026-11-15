<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling è stato attivato sul mainnet di Zcash al blocco 419.200 (29 ottobre 2018, 02:15 UTC).

In sintesi: Sapling ha reso i pagamenti privati in Zcash abbastanza veloci e leggeri da funzionare su un telefono o su un portafoglio hardware.

Sapling è stato il secondo grande aggiornamento di rete di Zcash, attivato in occasione del secondo anniversario di Zcash. È stato un hard fork del consenso che ha riscritto il modo in cui vengono assemblate le transazioni schermate (private). L'attivazione è definita da ZIP 205, le nuove regole di firma delle transazioni da ZIP 243, e entrambe si basano su ZIP 200, il meccanismo di aggiornamento di rete. I dettagli completi si trovano nella specifica del protocollo di Zcash. Electric Coin Company ha realizzato l'aggiornamento e ha rilasciato la prima versione che lo supportava, zcashd 2.0.0, nell'agosto 2018. On-chain, la rete identifica le regole di Sapling tramite il suo consensus branch id.

Perché è importante. Prima di Sapling, fare un pagamento veramente privato significava attendere minuti mentre il tuo computer consumava gigabyte di memoria per costruire la prova. Era troppo lento e troppo pesante per la maggior parte delle persone, quindi molti utenti, exchange e negozi saltavano le transazioni schermate e inviavano ZEC in chiaro. Sapling ha ridotto il lavoro a pochi secondi e circa 40 megabyte di memoria. Quella singola modifica è ciò che ha reso l'uso schermato di ZEC pratico nella vita di tutti i giorni, su telefoni normali e su portafogli hardware.

## TL;DR

- Sapling è stato il secondo grande aggiornamento di rete di Zcash, attivato al blocco 419.200 (29 ottobre 2018, 02:15 UTC) — il secondo anniversario di Zcash.
- Ha riscritto le transazioni schermate attorno a due circuiti realizzati su misura (Spend e Output), sostituendo il singolo e lento circuito JoinSplit di Sprout (ZIP 205, ZIP 243).
- Risultato: la costruzione della prova è passata da minuti e gigabyte di memoria a pochi secondi e circa 40 MB — abbastanza leggera per telefoni e portafogli hardware.
- Nuove funzionalità: indirizzi diversificati (molti indirizzi di pagamento non collegabili derivabili da una sola chiave), chiavi di visualizzazione per l'accesso in sola lettura a fini di audit, e separazione della creazione della prova dalla firma.
- I suoi parametri provengono da una cerimonia multi-parte in due fasi (Powers of Tau + MPC di Sapling); la sicurezza regge se anche un solo partecipante è stato onesto.

## Analogia visiva

Sprout era un corriere privato che consegnava a mano ogni lettera da un capo all'altro del paese — perfettamente privato, ma lento e faticoso. Sapling ha trasformato lo stesso corriere in un ciclista con uno zaino leggero: sempre privato, ma abbastanza veloce per le consegne di tutti i giorni. E le nuove chiavi di visualizzazione sono come dare a un revisore una finestra chiara sul registro del corriere senza mai consegnare le chiavi del carico.


## Cosa è cambiato

Il cuore di Sapling è un modo più veloce di costruire la prova a conoscenza zero che mantiene privata una transazione schermata. Il design originale di Sprout usava un singolo circuito di prova (il circuito JoinSplit), lento e affamato di memoria. Sapling l'ha sostituito con due circuiti realizzati su misura, un circuito Spend e un circuito Output, descritti nella specifica del protocollo di Zcash. Il risultato è una forte riduzione dei costi. Secondo Electric Coin Company, una transazione schermata può essere costruita in pochi secondi usando circa 40 megabyte di memoria. Il baseline pre-Sapling di Sprout era molto più pesante, dell'ordine di minuti e di diversi gigabyte di memoria (queste cifre lato Sprout sono il baseline approssimativo ampiamente citato).

![Costo della transazione schermata in Sprout rispetto a Sapling](/content-images/sapling-before-after-a045b0b48f.webp)

## Nuove chiavi

Sapling ha inoltre introdotto un nuovo set di indirizzi schermati e chiavi. Una singola chiave può derivare molti indirizzi diversificati, ossia indirizzi di pagamento separati che un osservatore esterno non può collegare tra loro. Sapling ha aggiunto anche le chiavi di visualizzazione: una chiave di visualizzazione completa o in entrata ti permette di condividere la possibilità di vedere i dettagli delle transazioni di un portafoglio senza rinunciare alla possibilità di spenderne i fondi. Questo è utile per audit, contabilità, o semplicemente per dimostrare che un pagamento è stato effettuato.

Una modifica correlata è che Sapling ha separato il compito di costruire la prova da quello di firmare la transazione. Il dispositivo che costruisce la prova a conoscenza zero non deve più essere il dispositivo che detiene l'autorità di spesa. Questo disaccoppiamento è ciò che permette a un portafoglio hardware di mantenere le tue chiavi di spesa isolate mentre un dispositivo separato esegue il lavoro di prova più oneroso.

![Il dispositivo di prova consegna la prova a un dispositivo di firma separato](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## Il trusted setup

I circuiti di Sapling si basano su un insieme di parametri pubblici che ha dovuto essere generato con attenzione. Se una singola parte li avesse prodotti da sola e avesse conservato i dati segreti residui (il "toxic waste"), quella parte avrebbe potuto falsificare le prove. Per evitare questo, i parametri provengono da una cerimonia multi-parte in due fasi. La fase 1, chiamata Powers of Tau, era indipendente dal circuito, ossia non era legata ai circuiti specifici di Sapling. La fase 2, la MPC di Sapling, era specifica del circuito. Ogni fase resta sicura purché almeno un partecipante sia stato onesto e abbia distrutto il proprio toxic waste, quindi la cerimonia fallisce solo se ogni singolo partecipante cospira.

## Come si è attivato

Sapling è seguito a Overwinter, l'aggiornamento di giugno 2018 che aveva preparato il meccanismo di aggiornamento della rete. Electric Coin Company ha fissato l'altezza di attivazione sul mainnet in zcashd 2.0.0, rilasciato nell'agosto 2018, e la rete è passata alle regole di Sapling quando è stato minato il blocco 419.200. On-chain, quel momento è contrassegnato dal consensus branch id di Sapling.

![Cronologia dal lancio di Zcash all'attivazione di Sapling](/content-images/sapling-timeline-6cad184c30.webp)

## Errori comuni

- **Dare per scontato che i pagamenti schermati fossero sempre utilizzabili.** Prima di Sapling, la costruzione della prova richiedeva minuti e gigabyte di memoria, quindi la maggior parte di utenti, exchange e negozi saltava completamente le transazioni schermate.
- **Chiamare gli indirizzi di Sapling come se fossero quelli di Sprout.** Sapling ha introdotto i propri tipi di indirizzi e di chiavi (oltre agli indirizzi diversificati e alle chiavi di visualizzazione); le chiavi di Sprout non sono interoperabili con gli indirizzi di Sapling.
- **Credere che il trusted setup fosse "un segreto di una singola azienda".** Era una cerimonia multi-parte: le prove avrebbero potuto essere falsificate solo se ogni partecipante avesse cospirato.
- **Pensare che Sapling abbia cambiato l'emissione o i saldi.** Ha cambiato il modo in cui vengono costruite le transazioni schermate — nessun importo in ZEC è stato toccato.
- **Dare per scontato che la creazione della prova e la firma debbano avvenire sullo stesso dispositivo.** Il disaccoppiamento di Sapling è proprio ciò che permette ai portafogli hardware di mantenere le chiavi di spesa isolate mentre un altro dispositivo costruisce le prove.


## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Shielded transaction | Una transazione privata in Zcash che nasconde mittente, destinatario e importo. |
| Sprout | Il protocollo schermato originale con cui è partito Zcash, più lento e pesante di Sapling. |
| Spend and Output circuits | I due nuovi circuiti di prova di Sapling che hanno sostituito il singolo circuito JoinSplit di Sprout. |
| Diversified address | Uno dei tanti indirizzi di pagamento non collegabili che puoi derivare da una singola chiave. |
| Viewing Key | Una chiave che permette a qualcuno di vedere le transazioni di un portafoglio senza poter spenderne i fondi. |
| Consensus branch id | Un codice breve che dice alla rete di quale aggiornamento una transazione segue le regole. |

## FAQ

Sapling ha cambiato la quantità di ZEC che possiedo? No. Sapling ha cambiato il modo in cui vengono costruite le transazioni schermate, non la quantità di ZEC che ciascuno detiene né l'offerta totale. Il tuo saldo non è stato influenzato.

Il mio ZEC è ancora privato dopo Sapling? Sì, ed è anche più utilizzabile. Sapling ha mantenuto la solida privacy delle transazioni schermate e le ha rese abbastanza veloci ed economiche da usarle davvero. I fondi schermati restano nascosti allo stesso modo.

Devo fare qualcosa? Non è richiesta nessuna azione da parte tua in quanto detentore. Sapling è stato un aggiornamento di rete adottato dal software di portafogli e di nodi. I portafogli moderni supportano già gli indirizzi Sapling.

Qual è la differenza tra Sprout e Sapling? Sprout era il primo protocollo schermato e usava un singolo circuito di prova lento e pesante in termini di memoria. Sapling l'ha sostituito con circuiti Spend e Output più veloci, ha aggiunto le chiavi di visualizzazione e gli indirizzi diversificati e ha reso le transazioni schermate abbastanza leggere per telefoni e portafogli hardware.

Perché alcune fonti dicono 28 ottobre e altre 29 ottobre? L'altezza di attivazione era stata fissata in anticipo con obiettivo il 28 ottobre 2018. Il blocco che ha effettivamente innescato il cambiamento, il blocco 419.200, è stato minato nelle prime ore del 29 ottobre UTC. In molti fusi orari locali era ancora il 28 ottobre. In ogni caso è lo stesso blocco e lo stesso momento.

Cos'è una chiave di visualizzazione? Una chiave di visualizzazione ti permette di condividere l'accesso in sola lettura a un portafoglio schermato. Chi possiede una chiave di visualizzazione completa o in entrata può vedere i dettagli delle transazioni del portafoglio ma non può spenderne i fondi. Vedi [Viewing Keys](../zcash-tech/viewing-keys) per saperne di più.

## Metti alla prova la tua comprensione

Con Sprout, perché così tante persone evitavano le transazioni schermate, e in che modo Sapling ha risolto il problema?

<details>
<summary>Risposta</summary>
Con Sprout, costruire una transazione schermata richiedeva minuti e usava gigabyte di memoria, quindi era troppo lenta e pesante per la maggior parte degli utenti, degli exchange e dei negozi. Sapling ha introdotto circuiti Spend e Output più veloci che hanno ridotto il lavoro a pochi secondi e circa 40 megabyte, rendendo le transazioni schermate pratiche sui telefoni di tutti i giorni e sui portafogli hardware.
</details>

### Risorse

- [ZIP 205: attivazione dell'aggiornamento di rete di Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: validazione delle firme delle transazioni per Sapling](https://zips.z.cash/zip-0243)
- [Zcash Sapling pagina dell'aggiornamento](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: annuncio di Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: annuncio della MPC di Sapling](https://electriccoin.co/blog/sapling-mpc/)

### Vedi anche

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Aggiornamenti di rete di Zcash](../start-here/network-upgrades)
- [Portafogli](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

## Pagine correlate

- [Viewing Keys](./Viewing_Keys.md) — la funzionalità di condivisione per audit introdotta da Sapling
- [Sprout](./Sprout.md) — il protocollo schermato originale sostituito da Sapling
- [Blossom](./Blossom.md) — il prossimo aggiornamento della serie (la tempistica dei blocchi, non la crittografia)
- [zk_SNARKS](./zk_SNARKS.md) — la tecnologia a conoscenza zero alla base dei circuiti


Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Overwinter](../zcash-tech/overwinter) · Successivo: [Blossom](../zcash-tech/blossom)

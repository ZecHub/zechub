---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash è stato lanciato il 28 ottobre 2016, con il pool schermato Sprout.

Cosa imparerai: Sprout è il punto da cui Zcash è partito, la prima volta in cui denaro privato e verificabile ha funzionato su una blockchain attiva.

Sprout è il lancio originale della rete Zcash, non un successivo [aggiornamento di rete](../start-here/network-upgrades). È entrato in funzione al blocco genesis il 28 ottobre 2016. Nessuno ZIP numerato definisce Sprout: il processo ZIP è iniziato più tardi con Overwinter, quindi Sprout è descritto dalla Zcash Protocol Specification originale e dalla costruzione Zerocash su cui è stato realizzato. La [Electric Coin Company](../zcash-organizations/electric-coin-company) (allora Zerocoin Electric Coin Company), guidata da Zooko Wilcox, lo ha sviluppato e rilasciato. Sprout ha introdotto le prime transazioni schermate zk-SNARK pratiche e il pool schermato originale, così le persone potevano inviare ZEC con mittente, destinatario e importo nascosti, mentre la rete continuava a verificare che i saldi tornassero. Il nome richiamava una catena giovane, appena germogliata, che il team si aspettava crescesse.

Perché è importante. Ogni blockchain pubblica prima di Sprout mostrava i tuoi pagamenti: chiunque poteva vedere chi pagava chi e quanto. Sprout è stata la prima rete permissionless attiva a nascondere questi dettagli e al tempo stesso a dimostrare che nessuno stava barando. Questo è importante per la normale privacy finanziaria, quella che ti aspetti dal contante o da un estratto conto bancario che nessun altro può leggere. Ha anche dimostrato che una forte privacy on-chain poteva funzionare nella pratica, oltre il progetto sulla carta. La Ceremony di trusted setup che lo ha reso possibile è diventata un punto di riferimento per il lavoro crittografico successivo, e il sistema di generazione delle prove lento e pesante in termini di memoria con cui Sprout è stato rilasciato è esattamente ciò che ha spinto il team a costruire Sapling due anni dopo.

## Primo pool schermato

Sprout ha creato due tipi di indirizzi. Gli indirizzi trasparenti (t-addresses) funzionano come Bitcoin, con i dettagli visibili sul registro pubblico. Gli indirizzi schermati (z-addresses) inviano fondi nel [pool schermato](../using-zcash/shielded-pools) di Sprout, dove mittente, destinatario e importo restano nascosti. Il trucco sono gli [zk-SNARKs](../zcash-tech/zk-snarks), prove a conoscenza zero che permettono a una transazione di mostrare che è valida, senza doppia spesa e con saldi che tornano, senza rivelare alcun dettaglio. Sprout è stata la prima volta in cui questo ha funzionato in produzione su una criptovaluta attiva.

![Le transazioni trasparenti espongono mittente, destinatario e importo, mentre le transazioni schermate di Sprout nascondono tutti e tre pur restando verificabili](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## La Ceremony

Gli zk-SNARKs in Sprout avevano bisogno di un insieme di parametri pubblici, e generarli in sicurezza richiedeva una configurazione una tantum chiamata Ceremony. Sei partecipanti in luoghi separati e lontani generarono ciascuno una parte segreta, chiamata toxic waste. Se qualcuno avesse mai ricomposto tutte le parti, avrebbe potuto creare ZEC dal nulla. Il progetto trasformava quel rischio in una regola semplice: finché almeno un partecipante distruggeva la propria parte, il segreto completo non poteva mai essere ricostruito, quindi la contraffazione restava impossibile. I partecipanti i cui nomi sono stati resi pubblici includono Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd e Derek Hinch di NCC Group. Un partecipante ha scelto di restare anonimo.

![La Ceremony: sei partecipanti generano frammenti privati, poi distruggono il toxic waste, lasciando solo i parametri pubblici di Sprout](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## L'origine

Sprout è la base su cui si costruisce ogni cambiamento successivo. Quando il meccanismo di aggiornamento della rete è arrivato con Overwinter, ha etichettato le regole originali come consensus branch id 0, il che significa semplicemente che non è ancora stato applicato alcun aggiornamento. Tutto ciò che è venuto dopo (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 e oltre) si basa sulla catena avviata da Sprout. Il lancio fu annunciato nell'agosto 2016 per una genesis il 28 ottobre, la Ceremony si svolse nelle settimane precedenti e il timestamp hardcoded del blocco genesis riporta il 28 ottobre 2016 alle 07:56 UTC.

![Cronologia dall'annuncio dell'agosto 2016, passando per la Ceremony dei parametri, fino al lancio di Sprout del 28 ottobre 2016](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| zk-SNARK | Una prova a conoscenza zero che dimostra che una transazione è valida senza rivelare mittente, destinatario o importo |
| Pool schermato | Il lato privato di Zcash dove importi e partecipanti sono nascosti. Il pool Sprout è stato il primo |
| z-address e t-address | Un z-address è schermato e mantiene privati i dettagli. Un t-address è trasparente e mostra i dettagli sul registro pubblico |
| La Ceremony | La configurazione multi-party del 2016 che ha generato i parametri pubblici di Sprout e poi ha eliminato il toxic waste |
| Toxic waste | Le parti di chiave segreta della Ceremony che dovevano essere distrutte affinché non fosse possibile creare ZEC falsi |
| Consensus branch id 0 | L'etichetta delle regole di Sprout, cioè la base di partenza prima di qualsiasi aggiornamento di rete |

## FAQ

Sprout cambia i miei ZEC o la mia privacy oggi? No. Sprout è storia, il lancio che ha avviato la catena su cui vivono i tuoi ZEC. Le tue monete e la tua privacy oggi dipendono dal wallet e dal pool schermato che usi adesso, non da qualcosa che devi fare riguardo a Sprout.

Perché non esiste un numero ZIP per Sprout? Il processo ZIP è iniziato più tardi, con l'aggiornamento Overwinter. Sprout è il lancio originale, descritto dalla Zcash Protocol Specification e dalla costruzione Zerocash su cui si basava. ZIP 200 menziona Sprout solo retrospettivamente, come consensus branch id 0, la base di partenza prima di qualsiasi aggiornamento.

Dovevo fidarmi delle sei persone della Ceremony? La configurazione è stata progettata in modo che bastasse che una sola di loro fosse onesta. Ognuna custodiva una parte segreta e, finché anche un solo partecipante distruggeva la propria, il segreto completo non poteva mai essere ricostruito e nessuno poteva creare ZEC falsi. Cinque partecipanti sono stati nominati pubblicamente e uno è rimasto anonimo.

Il pool Sprout è quello che il mio wallet usa adesso? Probabilmente no. Sprout è stato il primo pool schermato, ma aggiornamenti successivi come Sapling hanno introdotto un design schermato più veloce, e oggi la maggior parte dei wallet usa pool più recenti. Sprout resta importante come il lavoro che ha dimostrato che transazioni private e verificabili potevano funzionare su una rete attiva.

Cosa rendeva Sprout diverso da Bitcoin? Bitcoin mette ogni pagamento su un registro pubblico dove importi e indirizzi sono visibili. Sprout ha aggiunto transazioni schermate che nascondono mittente, destinatario e importo, permettendo comunque alla rete di confermare che la transazione è valida. Ha mantenuto anche gli indirizzi trasparenti, così entrambi gli stili convivono sulla stessa catena.

## Metti alla prova la tua comprensione

Sprout viene spesso definito un aggiornamento di rete con un'altezza di attivazione. Perché non è del tutto corretto?

<details>
<summary>Risposta</summary>

Sprout è il lancio originale di Zcash, non un aggiornamento successivo. È attivo fin dal blocco genesis (blocco 0) del 28 ottobre 2016, quindi non esiste un'altezza di attivazione da indicare. Il meccanismo di aggiornamento della rete è arrivato dopo e ha etichettato le regole di Sprout come consensus branch id 0, la base di partenza prima di qualsiasi aggiornamento.
</details>

### Risorse

[ZIP 200: Meccanismo di aggiornamento della rete](https://zips.z.cash/zip-0200)

[Aggiornamenti di rete di Zcash](https://z.cash/upgrade/)

[Electric Coin Company: lancio di Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: il design della Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Vedi anche

[Pool schermati](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Aggiornamenti di rete di Zcash](../start-here/network-upgrades)

[Che cosa sono ZEC e Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Successivo: [Overwinter](../zcash-tech/overwinter)

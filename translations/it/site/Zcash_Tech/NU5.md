<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 è stato attivato sulla mainnet di Zcash al blocco 1.687.104 (31 maggio 2022 UTC).

Cosa imparerai: come NU5 ha dato a Zcash una nuova pool schermata che non richiede alcun trusted setup, più un unico tipo di indirizzo valido per tutte le pool.

NU5 (Aggiornamento di rete 5) è il sesto Zcash [aggiornamento di rete](../start-here/network-upgrades), distribuito da [ZIP 252](https://zips.z.cash/zip-0252). Si tratta di un aggiornamento crittografico di grande rilievo. Ha introdotto il protocollo di pagamenti schermati Orchard, costruito sul sistema di prova Halo 2, insieme agli indirizzi unificati e a un nuovo formato di transazione versione 5. NU5 è stato distribuito con la release zcashd v5.0.0 di Electric Coin Company.

Perché è importante. Una pool schermata è affidabile quanto il setup che l'ha creata. Le prime due pool schermate di Zcash, Sprout e Sapling, hanno richiesto ciascuna una cerimonia di trusted setup una tantum per generare i propri parametri segreti. Se quei parametri fossero stati conservati anziché distrutti, qualcuno avrebbe potuto stampare ZEC contraffatti senza che nessuno se ne accorgesse. La pool Orchard di NU5 chiude questa preoccupazione usando il sistema di prova Halo 2, che non richiede una simile cerimonia.

## Il trusted setup

Orchard è il protocollo schermato introdotto da NU5, definito in [ZIP 224](https://zips.z.cash/zip-0224). È costruito sul sistema di prova Halo 2, che usa una tecnica chiamata aritmetizzazione PLONKish sul ciclo di curve di Pallas e Vesta. Il vantaggio pratico è semplice: Halo 2 non richiede né un trusted setup né uno structured reference string, quindi non esiste alcun parametro segreto che possa mai essere usato impropriamente.

Sprout e Sapling dipendevano entrambe da un trusted setup. Un gruppo di persone ha condotto una cerimonia per costruire i parametri di ogni pool, e tutti dovevano fidarsi che almeno uno di loro avesse distrutto il proprio pezzo del segreto. Orchard elimina questa assunzione. Le pool più vecchie esistono ancora dopo NU5, quindi la garanzia di assenza di setup si applica ai fondi che detieni nella pool Orchard.

![Prima di NU5, Sprout e Sapling richiedevano una cerimonia di trusted setup. Dopo NU5, il pool Orchard usa il sistema Halo 2 e non richiede alcun trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Cosa ha cambiato NU5

NU5 raggruppa diversi cambiamenti di consenso, tutti attivati insieme al blocco 1.687.104.

1. Ha aggiunto la pool schermata Orchard (ZIP 224), il protocollo basato su Halo 2 descritto sopra.
2. Ha aggiunto il formato di transazione versione 5 (ZIP 225), un layout ristrutturato con regioni separate per i dati trasparenti, Sapling e i nuovi dati Orchard. I campi Sprout sono stati rimossi, e il vecchio formato versione 4 è rimasto valido dopo l'attivazione.
3. Ha introdotto gli indirizzi unificati e le chiavi di visualizzazione unificate (ZIP 316), trattate nella sezione successiva.
4. Ha adottato la non-malleabilità dell'identificatore di transazione (ZIP 244), un nuovo modo di calcolare l'id di una transazione che separa ciò che fa una transazione dalle prove e dalle firme che la autorizzano.
5. Ha adottato le codifiche canoniche dei punti di Jubjub (ZIP 216) per eliminare le codifiche non standard e rendere più rigorose le regole su ciò che conta come transazione valida.
6. Ha abilitato il relay delle transazioni versione 5 attraverso la rete peer-to-peer (ZIP 239).

NU5 ha anche aggiornato diverse ZIP esistenti (32, 203, 209, 212, 213, 221 e 401) perché tenessero conto della nuova pool Orchard.

## Indirizzi unificati

Prima di NU5, ogni pool aveva il proprio tipo di indirizzo, e chi inviava doveva sapere quale tipo volevi. Gli indirizzi unificati, definiti in [ZIP 316](https://zips.z.cash/zip-0316), cambiano questa situazione. Un singolo indirizzo unificato può raggruppare receiver per più di una pool, così il portafoglio di chi invia sceglie semplicemente la migliore tra quelle che supporta.

![Un indirizzo unificato raggruppa i receiver per più pool: un receiver trasparente, un receiver Sapling e un nuovo receiver Orchard](/content-images/nu5-unified-address-6e2c84f66e.webp)

Le chiavi di visualizzazione unificate funzionano allo stesso modo per la visualizzazione. Danno una visibilità di sola lettura su tutte le pool coperte da un indirizzo. Per approfondire, vedi la pagina [Chiavi di visualizzazione](../zcash-tech/viewing-keys).

## Dove si colloca NU5

NU5 è venuto dopo i precedenti aggiornamenti di Zcash: Overwinter, Sapling, Blossom, Heartwood e Canopy. Si è attivato sulla mainnet il 31 maggio 2022. Il ciclo di curve di Orchard è stato scelto perché supporta la ricorsione, che è una base per i futuri lavori di scalabilità. NU5 è il diretto predecessore della serie di aggiornamenti NU6 e NU6.x, che si sono basati sulla pool Orchard e l'hanno in seguito corretta.

## TL;DR

- NU5 si è attivato sulla mainnet al blocco 1.687.104 (31 maggio 2022 UTC) — il più grande aggiornamento crittografico di Zcash da Sapling in poi, distribuito da ZIP 252.
- Ha lanciato la pool schermata Orchard, la prima pool Zcash costruita su Halo 2 — un sistema di prova che non richiede alcun trusted setup.
- Ha introdotto gli indirizzi unificati e le chiavi di visualizzazione unificate (ZIP 316): una singola stringa di indirizzo che può raggruppare receiver per diverse pool.
- Ha spostato le transazioni al formato versione 5 (ZIP 225) e ha reso gli id delle transazioni non malleabili (ZIP 244).
- Orchard gira sul ciclo di curve Pallas/Vesta, che supporta le prove ricorsive — una base per i futuri lavori di scalabilità e per la serie NU6.x.

## Spiegazione essenziale

Il problema del trusted setup: Sprout (2016) e Sapling (2018) hanno richiesto ciascuno una cerimonia una tantum per generare i parametri segreti, e la sicurezza si basava sul fatto che almeno un partecipante distruggesse il proprio frammento. Se ogni partecipante avesse tenuto segretamente una copia, sarebbero stati possibili ZEC contraffatti. Orchard elimina del tutto questa assunzione: Halo 2 non usa né un trusted setup né uno structured reference string, quindi non esiste alcun segreto che possa mai essere usato impropriamente.

NU5 ha raggruppato diversi cambiamenti di consenso, attivati insieme: la pool Orchard (ZIP 224), il formato di transazione versione 5 (ZIP 225), gli indirizzi unificati (ZIP 316), la non-malleabilità dell'id di transazione (ZIP 244), le codifiche canoniche dei punti di Jubjub (ZIP 216) e il relay peer-to-peer delle transazioni v5 (ZIP 239). Ha anche aggiornato le ZIP 32, 203, 209, 212, 213, 221 e 401 per tenere conto della nuova pool.

## Analogia visiva

Le pool più vecchie sono come casseforti la cui combinazione è stata generata in una cerimonia di gruppo una tantum — tu ti fidi che ogni partecipante abbia distrutto la propria copia. Orchard è una cassaforte la cui serratura si riverifica a ogni uso: non c'è cerimonia, non c'è segreto principale, niente che possa essere stato conservato. Gli indirizzi unificati sono un biglietto da visita che elenca ogni ingresso — trasparente, Sapling, Orchard — e il visitatore sceglie la porta che può davvero aprire.

## Analisi approfondita

Halo 2 usa l'aritmetizzazione PLONKish sul ciclo di curve Pallas e Vesta — due curve pairing-friendly che si completano a vicenda, e questo è ciò che rende possibile la ricorsione: prove che verificano altre prove. Questa ricorsione è la base su cui si costruiscono i futuri lavori di scalabilità di Zcash. Il layout di transazione v5 separa le regioni trasparente, Sapling e Orchard, ed elimina i campi Sprout; il vecchio formato versione 4 è rimasto valido dopo l'attivazione. ZIP 244 ricalcola l'id della transazione a partire da ciò che fa la transazione, non dalle prove e dalle firme che la autorizzano, chiudendo i vettori di malleabilità.

## Errori comuni

- **Credere che NU5 abbia rimosso il trusted setup per ogni pool.** Solo Orchard è senza cerimonia; i parametri di Sapling esistono ancora, quindi la garanzia di assenza di setup si applica ai fondi detenuti in Orchard.
- **Pensare che i vecchi indirizzi o i vecchi portafogli abbiano smesso di funzionare.** NU5 ha aggiunto opzioni; i tipi di indirizzo specifici per pool e il formato di transazione v4 sono rimasti validi.
- **Confondere Orchard con Halo 2.** Orchard è il protocollo/la pool schermata; Halo 2 è il sistema di prova su cui gira.
- **Trattare gli indirizzi unificati come l'unico tipo di indirizzo.** Sono un formato aggiuntivo che puoi adottare quando il tuo portafoglio li supporta.
- **Credere che NU5 abbia cambiato l'emissione o la privacy esistente.** Ha aggiunto una pool e dei formati; gli ZEC esistenti e la loro privacy non sono stati toccati.


## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Network upgrade (NU) | Un cambiamento coordinato alle regole di consenso di Zcash, attivato a un'altezza di blocco fissata |
| Orchard | La pool schermata introdotta da NU5, costruita sul sistema di prova Halo 2 |
| Halo 2 | Il sistema di prova alla base di Orchard, che non richiede un trusted setup |
| Trusted setup | Una cerimonia una tantum che genera i parametri segreti di una pool e di cui ci si deve fidare perché li distrugga |
| Unified Address | Un singolo indirizzo che può raggruppare receiver di più di una pool (ZIP 316) |
| Consensus branch id | Un identificatore che indica a quale insieme di regole appartiene una transazione |

## FAQ

NU5 cambia il mio ZEC o la mia privacy? No. NU5 ha aggiunto una nuova pool schermata e un nuovo formato di indirizzo. Il tuo ZEC esistente non è influenzato, e la tua privacy non viene ridotta. Spostare fondi in Orchard ti dà una pool che non richiede un trusted setup.

Che cos'è Orchard? Orchard è il protocollo schermato di Zcash introdotto da NU5. Gira sul sistema di prova Halo 2, quindi non richiede una cerimonia di trusted setup.

Devo fare qualcosa? No. Un portafoglio supportato gestisce NU5 per te. Puoi continuare a usare i vecchi indirizzi, e puoi iniziare a usare gli indirizzi unificati quando il tuo portafoglio li offre.

Che cos'è un indirizzo unificato? Un singolo indirizzo che può contenere receiver di più di una pool. Il portafoglio di chi invia sceglie la pool che supporta, così non devi distribuire un indirizzo diverso per ogni tipo.

NU5 rimuove il trusted setup dai miei fondi più vecchi? Non retroattivamente. Orchard non richiede un trusted setup, ma i parametri precedenti della pool Sapling esistono ancora dopo NU5. La garanzia di assenza di setup si applica ai fondi detenuti nella pool Orchard.

Il vecchio formato di transazione ha smesso di funzionare? No. NU5 ha aggiunto il formato versione 5, e il vecchio formato versione 4 è rimasto valido dopo l'attivazione.

## Metti alla prova le tue conoscenze

Sprout e Sapling richiedevano entrambe una cerimonia di trusted setup. Cosa ha cambiato a riguardo la pool Orchard di NU5, e perché è importante?

<details>
<summary>Risposta</summary>

Orchard è costruito sul sistema di prova Halo 2, che non richiede né un trusted setup né uno structured reference string. Questo elimina il rischio che parametri segreti residui possano mai essere usati per contraffare ZEC. La garanzia si applica ai fondi detenuti nella pool Orchard. I vecchi parametri Sapling esistono ancora dopo NU5.
</details>

### Risorse

[ZIP 252: Distribuzione dell'aggiornamento di rete NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocollo schermato Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato di transazione versione 5](https://zips.z.cash/zip-0225)

[ZIP 316: Indirizzi unificati e chiavi di visualizzazione unificate](https://zips.z.cash/zip-0316)

[Aggiornamento di rete 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: release di zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Vedi anche

[Zcash Aggiornamenti di rete](../start-here/network-upgrades)

[Pool schermate](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Chiavi di visualizzazione](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## Pagine correlate

- [Halo](./Halo.md) — il sistema di prova senza trusted setup alla base di Orchard
- [Indirizzi unificati](./Unified_Addresses.md) — approfondimento sull'indirizzamento di ZIP 316
- [Sapling](./Sapling.md) — la precedente pool schermata, ancora legata alla sua cerimonia
- [NU6](./NU6.md) — l'aggiornamento successivo, costruito sulla pool Orchard
- [zk_SNARKS](./zk_SNARKS.md) — la tecnologia a conoscenza zero sottostante


Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Canopy](../zcash-tech/canopy) · Successivo: [NU6](../zcash-tech/nu6)

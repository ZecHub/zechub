<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# NU5

> NU5 è entrato in funzione sulla mainnet di Zcash al blocco 1.687.104 (31 maggio 2022 UTC).

Cosa imparerai: come NU5 ha dato a Zcash una nuova pool schermata che non richiede alcun trusted setup, oltre a un unico tipo di indirizzo che funziona tra le pool.

NU5 (Network Upgrade 5) è il sesto Zcash [aggiornamento di rete](../start-here/network-upgrades) di [, implementato da ZIP 252](https://zips.z.cash/zip-0252). È un importante aggiornamento crittografico. Ha introdotto il protocollo di pagamento schermato Orchard, basato sul sistema di proving Halo 2, insieme agli Unified Addresses e a un nuovo formato di transazione versione 5. NU5 è stato rilasciato nella versione v5.0.0 di Electric Coin Company zcashd.

Perché è importante. Una pool schermata è affidabile solo quanto il trusted setup che l'ha creata. Le prime due pool schermate di Zcash, Sprout e Sapling, richiedevano ciascuna una cerimonia di trusted setup una tantum per generare i propri parametri segreti. Se tali parametri fossero stati conservati anziché distrutti, qualcuno avrebbe potuto creare ZEC contraffatti senza che nessuno se ne accorgesse. La pool Orchard di NU5 elimina questa preoccupazione usando il sistema di prova Halo 2, che non richiede tale cerimonia.

## La configurazione fidata

Orchard è il protocollo schermato introdotto da NU5, definito in [ZIP 224](https://zips.z.cash/zip-0224). Si basa sul sistema di proving Halo 2, che utilizza una tecnica chiamata aritmetizzazione PLONKish sul ciclo di curve Pallas e Vesta. Il vantaggio pratico è semplice: Halo 2 non richiede alcuna configurazione fidata né una stringa di riferimento strutturata, quindi non esiste alcun parametro segreto che potrebbe essere usato impropriamente.

Sprout e Sapling dipendevano entrambe da un trusted setup. Un gruppo di persone ha svolto una cerimonia per creare i parametri di ciascuna pool, e tutti dovevano confidare che almeno una di loro distruggesse la propria parte del segreto. Orchard elimina questa ipotesi. Le pool precedenti continuano a esistere dopo NU5, quindi la garanzia dell'assenza di trusted setup si applica ai fondi detenuti nella pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Cosa ha cambiato NU5

NU5 riunisce diverse modifiche al consenso, tutte attivate insieme al blocco 1.687.104.

1. Ha aggiunto la pool schermata Orchard (ZIP 224), il protocollo basato su Halo 2 descritto sopra.
2. Ha aggiunto il formato di transazione versione 5 (ZIP 225), una struttura riorganizzata con sezioni separate per dati trasparenti, Sapling e nuovi dati Orchard. I campi Sprout sono stati rimossi e il precedente formato versione 4 è rimasto valido dopo l'attivazione.
3. Ha introdotto Unified Addresses e chiavi di visualizzazione unificate (ZIP 316), trattate nella sezione successiva.
4. Ha adottato la non malleabilità dell'identificatore di transazione (ZIP 244), un nuovo modo di calcolare l'id di una transazione che separa ciò che una transazione fa dalle prove e dalle firme che la autorizzano.
5. Ha adottato le codifiche canoniche dei punti Jubjub (ZIP 216) per rimuovere le codifiche non standard e rendere più rigorose le regole su ciò che conta come transazione valida.
6. Ha abilitato l'inoltro delle transazioni versione 5 attraverso la rete peer-to-peer (ZIP 239).

NU5 ha inoltre aggiornato diversi ZIP esistenti (32, 203, 209, 212, 213, 221 e 401) affinché tengano conto della nuova pool Orchard.

## Unified addresses

Prima di NU5, ogni pool aveva il proprio tipo di indirizzo e il mittente doveva sapere quale tipo desideravi. Gli indirizzi unificati, definiti in [ZIP 316](https://zips.z.cash/zip-0316), cambiano questa situazione. Un singolo indirizzo unificato può riunire ricevitori per più di una pool, quindi il portafoglio del mittente sceglie semplicemente il migliore che supporta.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Le chiavi di visualizzazione unificate funzionano allo stesso modo per la visualizzazione. Offrono visibilità in sola lettura sulle pool coperte da un indirizzo. Per ulteriori informazioni, consulta la pagina [Chiavi di visualizzazione](../zcash-tech/viewing-keys).

## Dove si colloca NU5

NU5 ha seguito i precedenti aggiornamenti di Zcash: Overwinter, Sapling, Blossom, Heartwood e Canopy. È stato attivato sulla mainnet il 31 maggio 2022. Il ciclo di curve di Orchard è stato scelto perché supporta la ricorsione, che costituisce una base per futuri interventi di scalabilità. NU5 è il predecessore diretto della linea di aggiornamenti NU6 e NU6.x, che si è basata sulla pool Orchard e successivamente l'ha corretta.

## In breve

- NU5 è stato attivato su mainnet al blocco 1.687.104 (31 maggio 2022 UTC) — il più grande aggiornamento crittografico di Zcash da Sapling, implementato da ZIP 252.
- Ha introdotto la pool schermata Orchard, la prima pool Zcash basata su Halo 2 — un sistema di prova che non richiede alcun trusted setup.
- Ha introdotto gli Unified Addresses e le chiavi di visualizzazione unificate (ZIP 316): una stringa di indirizzo che può riunire ricevitori per diverse pool.
- Ha portato le transazioni al formato versione 5 (ZIP 225) e ha reso gli ID delle transazioni non malleabili (ZIP 244).
- Orchard opera sul ciclo di curve Pallas/Vesta, che supporta le prove ricorsive — gettando le basi per il successivo lavoro sulla scalabilità e per la linea NU6.x.

## Spiegazione fondamentale

Il problema del trusted setup: Sprout (2016) e Sapling (2018) richiedevano ciascuno una cerimonia una tantum per generare parametri segreti, e la sicurezza dipendeva dal fatto che almeno un partecipante distruggesse il proprio frammento. Se ogni partecipante avesse conservato segretamente una copia, sarebbero stati possibili ZEC contraffatti. Orchard elimina completamente questo presupposto: Halo 2 non utilizza alcun trusted setup né alcuna stringa di riferimento strutturata, quindi non esiste alcun segreto che possa mai essere usato impropriamente.

NU5 ha raggruppato diverse modifiche al consenso, attivate contemporaneamente: la pool Orchard (ZIP 224), il formato delle transazioni versione 5 (ZIP 225), gli indirizzi unificati (ZIP 316), la non malleabilità dell'ID della transazione (ZIP 244), le codifiche canoniche dei punti Jubjub (ZIP 216) e l'inoltro peer-to-peer delle transazioni v5 (ZIP 239). Ha inoltre aggiornato ZIP 32, 203, 209, 212, 213, 221 e 401 per tenere conto della nuova pool.

## Analogia visiva

Le pool precedenti sono come casseforti la cui combinazione è stata generata in una cerimonia di gruppo una tantum: confidi che ogni partecipante ne abbia distrutto la propria copia. Orchard è una cassaforte la cui serratura si riverifica a ogni utilizzo: non c'è alcuna cerimonia, nessun segreto principale, nulla che possa essere stato conservato. Gli indirizzi unificati sono un biglietto da visita che elenca ogni ingresso: trasparente, Sapling, Orchard, e il visitatore sceglie la porta che può effettivamente aprire.

## Approfondimento

Halo 2 utilizza l'aritmetizzazione PLONKish sul ciclo di curve Pallas e Vesta — due curve pairing-friendly che si completano a vicenda, il che rende possibile la ricorsione: prove che verificano altre prove. Questa ricorsione è il fondamento su cui si basa il successivo lavoro di scalabilità di Zcash. La struttura della transazione v5 separa le aree trasparenti, Sapling e Orchard ed elimina i campi Sprout; il precedente formato versione 4 è rimasto valido dopo l'attivazione. ZIP 244 ricalcola l'ID della transazione in base a ciò che fa una transazione, anziché alle prove e alle firme che la autorizzano, eliminando i vettori di malleabilità.

## Errori comuni

- **Pensare che NU5 abbia eliminato il trusted setup per ogni pool.** Solo Orchard non richiede una cerimonia; i parametri di Sapling esistono ancora, quindi la garanzia di non richiedere un setup si applica ai fondi detenuti in Orchard.
- **Supporre che i vecchi indirizzi o portafogli abbiano smesso di funzionare.** NU5 ha aggiunto opzioni; i tipi di indirizzi per pool e il formato di transazione v4 sono rimasti validi.
- **Confondere Orchard con Halo 2.** Orchard è il protocollo/la pool schermata; Halo 2 è il sistema di generazione delle prove su cui si basa.
- **Considerare gli Unified Addresses come l'unico tipo di indirizzo.** Sono un formato aggiuntivo che puoi adottare quando il tuo portafoglio li supporta.
- **Credere che NU5 abbia modificato l'emissione o la privacy esistente.** Ha aggiunto una pool e dei formati; ZEC esistente e la sua privacy non sono stati modificati.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Network upgrade (NU) | Una modifica coordinata alle regole di consenso di Zcash, attivata a un'altezza di blocco prestabilita |
| Orchard | La pool schermata introdotta da NU5, basata sul sistema di prova Halo 2 |
| Halo 2 | Il sistema di proving alla base di Orchard che non richiede una configurazione fidata |
| Trusted setup | Una cerimonia una tantum che crea i parametri segreti di una pool e per la quale occorre confidare che vengano distrutti |
| Unified Address | Un singolo indirizzo che può riunire ricevitori per più di una pool (ZIP 316) |
| Consensus branch id | Un identificatore che indica a quale insieme di regole appartiene una transazione |

## FAQ

NU5 modifica i miei ZEC o la mia privacy? No. NU5 ha aggiunto una nuova pool schermata e un nuovo formato di indirizzo. I tuoi ZEC esistenti non subiscono modifiche e la tua privacy non viene ridotta. Spostare fondi in Orchard ti offre una pool che non richiede alcun trusted setup.

Cos'è Orchard? Orchard è il protocollo schermato di Zcash introdotto da NU5. Funziona con il sistema di proving Halo 2, quindi non richiede alcuna cerimonia di configurazione fidata.

Devo fare qualcosa? No. Un portafoglio supportato gestisce NU5 per te. Puoi continuare a usare gli indirizzi precedenti e iniziare a usare gli indirizzi unificati quando il tuo portafoglio li offre.

Cos'è un indirizzo unificato? Un singolo indirizzo che può contenere ricevitori per più di una pool. Il portafoglio del mittente sceglie la pool che supporta, quindi non devi fornire un indirizzo diverso per ogni tipo.

NU5 rimuove la configurazione fidata dai miei fondi precedenti? Non retroattivamente. Orchard non richiede alcuna configurazione fidata, ma i parametri precedenti della pool Sapling continuano a esistere dopo NU5. La garanzia di assenza di configurazione si applica ai fondi detenuti nella pool Orchard.

Il vecchio formato di transazione ha smesso di funzionare? No. NU5 ha aggiunto il formato versione 5 e il precedente formato versione 4 è rimasto valido dopo l'attivazione.

## Verifica la tua comprensione

Sprout e Sapling richiedevano entrambe una cerimonia di trusted setup. Cosa ha cambiato la pool Orchard di NU5 al riguardo, e perché è importante?

<details>
<summary>Risposta</summary>

Orchard è basato sul sistema di proving Halo 2, che non richiede alcuna configurazione fidata né una stringa di riferimento strutturata. Questo elimina il rischio che parametri segreti residui possano essere usati per contraffare ZEC. La garanzia si applica ai fondi detenuti nella pool Orchard. I precedenti parametri Sapling continuano a esistere dopo NU5.
</details>

### Risorse

[ZIP 252: Implementazione del Network Upgrade NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocollo schermato Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato di transazione versione 5](https://zips.z.cash/zip-0225)

[ZIP 316: Indirizzi unificati e chiavi di visualizzazione unificate](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: rilascio zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

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
- [Indirizzi unificati](./Unified_Addresses.md) — approfondimento sull'indirizzamento 316 di ZIP
- [Sapling](./Sapling.md) — la precedente pool schermata, ancora legata alla sua cerimonia
- [NU6](./NU6.md) — il prossimo aggiornamento, basato sulla pool Orchard
- [zk_SNARKS](./zk_SNARKS.md) — la tecnologia a conoscenza zero alla base

Serie: indice degli [aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Canopy](../zcash-tech/canopy) · Successivo: [NU6](../zcash-tech/nu6)

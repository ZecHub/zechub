<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 è stato attivato sulla mainnet di Zcash al blocco 1,687,104 (31 maggio 2022 UTC).

Cosa imparerai: come NU5 abbia dato a Zcash un nuovo pool schermato che non richiede alcun trusted setup, oltre a un unico tipo di indirizzo che funziona attraverso più pool.

NU5 (Network Upgrade 5) è il sesto [aggiornamento di rete](../start-here/network-upgrades) di Zcash, distribuito tramite [ZIP 252](https://zips.z.cash/zip-0252). Si tratta di un importante aggiornamento crittografico. Ha introdotto il protocollo di pagamento schermato Orchard, basato sul sistema di proving Halo 2, insieme agli indirizzi unificati e a un nuovo formato di transazione versione 5. NU5 è stato distribuito nella release zcashd v5.0.0 di Electric Coin Company.

Perché è importante. Un pool schermato è affidabile solo quanto il setup che lo ha creato. I primi due pool schermati di Zcash, Sprout e Sapling, richiedevano ciascuno una cerimonia di trusted setup una tantum per generare i propri parametri segreti. Se quei parametri fossero mai stati conservati invece che distrutti, qualcuno avrebbe potuto creare ZEC contraffatti senza che nessuno se ne accorgesse. Il pool Orchard di NU5 elimina questa preoccupazione utilizzando il sistema di proving Halo 2, che non richiede una cerimonia di questo tipo.

## Il trusted setup

Orchard è il protocollo schermato più recente di Zcash, definito in [ZIP 224](https://zips.z.cash/zip-0224). È costruito sul sistema di proving Halo 2, che utilizza una tecnica chiamata aritmetizzazione PLONKish sul ciclo di curve Pallas e Vesta. Il vantaggio pratico è semplice: Halo 2 non richiede trusted setup né structured reference string, quindi non esiste alcun parametro segreto che potrebbe mai essere usato impropriamente.

Sia Sprout sia Sapling dipendevano da un trusted setup. Un gruppo di persone eseguiva una cerimonia per costruire i parametri di ciascun pool, e tutti dovevano fidarsi che almeno uno di loro distruggesse la propria parte del segreto. Orchard elimina questa assunzione. I pool più vecchi esistono ancora dopo NU5, quindi la garanzia di assenza di setup si applica ai fondi che detieni nel pool Orchard.

![Prima di NU5, Sprout e Sapling richiedevano una cerimonia di trusted setup. Dopo NU5, il pool Orchard usa il sistema Halo 2 e non richiede trusted setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## Cosa ha cambiato NU5

NU5 raggruppa diversi cambiamenti di consenso, tutti attivati insieme al blocco 1,687,104.

1. Ha aggiunto il pool schermato Orchard (ZIP 224), il protocollo basato su Halo 2 descritto sopra.
2. Ha aggiunto il formato di transazione versione 5 (ZIP 225), una struttura riorganizzata con sezioni separate per dati trasparenti, Sapling e i nuovi dati Orchard. I campi Sprout sono stati rimossi, e il vecchio formato versione 4 è rimasto valido dopo l'attivazione.
3. Ha introdotto gli indirizzi unificati e le unified viewing key (ZIP 316), trattati nella sezione successiva.
4. Ha adottato la non malleabilità dell'identificatore di transazione (ZIP 244), un nuovo modo di calcolare l'id di una transazione che separa ciò che una transazione fa dalle proof e dalle firme che la autorizzano.
5. Ha adottato le codifiche canoniche dei punti Jubjub (ZIP 216) per eliminare le codifiche non standard e rendere più rigorose le regole su ciò che conta come transazione valida.
6. Ha abilitato il relay delle transazioni versione 5 attraverso la rete peer-to-peer (ZIP 239).

NU5 ha anche aggiornato diversi ZIP esistenti (32, 203, 209, 212, 213, 221 e 401) affinché tenessero conto del nuovo pool Orchard.

## Indirizzi unificati

Prima di NU5, ogni pool aveva il proprio tipo di indirizzo, e un mittente doveva sapere quale tipo desideravi. Gli indirizzi unificati, definiti in [ZIP 316](https://zips.z.cash/zip-0316), cambiano questa situazione. Un singolo indirizzo unificato può raggruppare receiver per più di un pool, così il wallet del mittente sceglie semplicemente il migliore che supporta.

![Un indirizzo unificato raggruppa receiver per diversi pool: un receiver trasparente, un receiver Sapling e un nuovo receiver Orchard](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Le unified viewing key funzionano allo stesso modo per la visualizzazione. Offrono visibilità in sola lettura attraverso i pool coperti da un indirizzo. Per saperne di più, consulta la pagina [Viewing Keys](../zcash-tech/viewing-keys).

## Dove si colloca NU5

NU5 ha seguito i precedenti aggiornamenti di Zcash: Overwinter, Sapling, Blossom, Heartwood e Canopy. Si è attivato sulla mainnet il 31 maggio 2022. Il ciclo di curve di Orchard è stato scelto perché supporta la ricorsione, che costituisce la base per lavori di scalabilità successivi. NU5 è il predecessore diretto della linea di aggiornamenti NU6 e NU6.x, che si è basata sul pool Orchard e in seguito lo ha corretto.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Network upgrade (NU) | Un cambiamento coordinato delle regole di consenso di Zcash, attivato a una determinata altezza di blocco |
| Orchard | Il pool schermato introdotto da NU5, costruito sul sistema di proving Halo 2 |
| Halo 2 | Il sistema di proving dietro Orchard che non richiede trusted setup |
| Trusted setup | Una cerimonia una tantum che crea i parametri segreti di un pool e della cui distruzione ci si deve fidare |
| Unified address | Un singolo indirizzo che può raggruppare receiver per più di un pool (ZIP 316) |
| Consensus branch id | Un identificatore che indica a quale insieme di regole appartiene una transazione |

## FAQ

NU5 cambia i miei ZEC o la mia privacy? No. NU5 ha aggiunto un nuovo pool schermato e un nuovo formato di indirizzo. I tuoi ZEC esistenti non vengono influenzati e la tua privacy non viene ridotta. Spostare i fondi in Orchard ti offre un pool che non richiede trusted setup.

Che cos'è Orchard? Orchard è il protocollo schermato di Zcash introdotto da NU5. Funziona sul sistema di proving Halo 2, quindi non richiede alcuna cerimonia di trusted setup.

Devo fare qualcosa? No. Un wallet supportato gestisce NU5 per te. Puoi continuare a usare gli indirizzi più vecchi e puoi iniziare a usare gli indirizzi unificati quando il tuo wallet li offrirà.

Che cos'è un indirizzo unificato? Un singolo indirizzo che può contenere receiver per più di un pool. Il wallet del mittente sceglie il pool che supporta, quindi non devi distribuire un indirizzo diverso per ogni tipo.

NU5 elimina il trusted setup dai miei fondi più vecchi? Non retroattivamente. Orchard non richiede trusted setup, ma i parametri precedenti del pool Sapling esistono ancora dopo NU5. La garanzia di assenza di setup si applica ai fondi detenuti nel pool Orchard.

Il vecchio formato di transazione ha smesso di funzionare? No. NU5 ha aggiunto il formato versione 5, e il vecchio formato versione 4 è rimasto valido dopo l'attivazione.

## Metti alla prova la tua comprensione

Sia Sprout sia Sapling richiedevano una cerimonia di trusted setup. Che cosa ha cambiato a questo riguardo il pool Orchard di NU5, e perché è importante?

<details>
<summary>Risposta</summary>

Orchard è costruito sul sistema di proving Halo 2, che non richiede trusted setup né structured reference string. Questo elimina il rischio che parametri segreti residui possano mai essere usati per contraffare ZEC. La garanzia si applica ai fondi detenuti nel pool Orchard. I vecchi parametri Sapling esistono ancora dopo NU5.
</details>

### Risorse

[ZIP 252: Distribuzione del Network Upgrade NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocollo schermato Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato di transazione versione 5](https://zips.z.cash/zip-0225)

[ZIP 316: Indirizzi unificati e Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: release zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Vedi anche

[Aggiornamenti di rete di Zcash](../start-here/network-upgrades)

[Pool schermati](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Serie: [Indice dei Network Upgrade](../start-here/network-upgrades) · Precedente: [Canopy](../zcash-tech/canopy) · Successivo: [NU6](../zcash-tech/nu6)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# NU5

> NU5 è entrato in funzione sulla mainnet di Zcash al blocco 1.687.104 (31 maggio 2022 UTC).

Cosa imparerai: come NU5 ha dato a Zcash un nuovo pool schermato che non richiede alcuna configurazione fidata, oltre a un unico tipo di indirizzo che funziona tra i pool.

NU5 (Network Upgrade 5) è il sesto Zcash [aggiornamento di rete](../start-here/network-upgrades) di [, implementato da ZIP 252](https://zips.z.cash/zip-0252). È un importante aggiornamento crittografico. Ha introdotto il protocollo di pagamento schermato Orchard, basato sul sistema di proving Halo 2, insieme agli Unified Addresses e a un nuovo formato di transazione versione 5. NU5 è stato rilasciato nella versione v5.0.0 di Electric Coin Company zcashd.

Perché è importante. Un pool schermato è affidabile solo quanto la configurazione che lo ha creato. I primi due pool schermati di Zcash, Sprout e Sapling, richiedevano ciascuno una cerimonia di configurazione fidata una tantum per generare i propri parametri segreti. Se tali parametri fossero stati conservati anziché distrutti, qualcuno avrebbe potuto creare ZEC contraffatti senza che nessuno se ne accorgesse. Il pool Orchard di NU5 elimina questa preoccupazione usando il sistema di proving Halo 2, che non richiede tale cerimonia.

## La configurazione fidata

Orchard è il protocollo schermato introdotto da NU5, definito in [ZIP 224](https://zips.z.cash/zip-0224). Si basa sul sistema di proving Halo 2, che utilizza una tecnica chiamata aritmetizzazione PLONKish sul ciclo di curve Pallas e Vesta. Il vantaggio pratico è semplice: Halo 2 non richiede alcuna configurazione fidata né una stringa di riferimento strutturata, quindi non esiste alcun parametro segreto che potrebbe essere usato impropriamente.

Sprout e Sapling dipendevano entrambi da una configurazione fidata. Un gruppo di persone ha svolto una cerimonia per creare i parametri di ciascun pool, e tutti dovevano confidare che almeno una di loro distruggesse la propria parte del segreto. Orchard elimina questa ipotesi. I pool precedenti continuano a esistere dopo NU5, quindi la garanzia di assenza di configurazione si applica ai fondi detenuti nel pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Cosa ha cambiato NU5

NU5 riunisce diverse modifiche al consenso, tutte attivate insieme al blocco 1.687.104.

1. Ha aggiunto il pool schermato Orchard (ZIP 224), il protocollo basato su Halo 2 descritto sopra.
2. Ha aggiunto il formato di transazione versione 5 (ZIP 225), una struttura riorganizzata con sezioni separate per dati trasparenti, Sapling e nuovi dati Orchard. I campi Sprout sono stati rimossi e il precedente formato versione 4 è rimasto valido dopo l'attivazione.
3. Ha introdotto Unified Addresses e chiavi di visualizzazione unificate (ZIP 316), trattate nella sezione successiva.
4. Ha adottato la non malleabilità dell'identificatore di transazione (ZIP 244), un nuovo modo di calcolare l'id di una transazione che separa ciò che una transazione fa dalle prove e dalle firme che la autorizzano.
5. Ha adottato le codifiche canoniche dei punti Jubjub (ZIP 216) per rimuovere le codifiche non standard e rendere più rigorose le regole su ciò che conta come transazione valida.
6. Ha abilitato l'inoltro delle transazioni versione 5 attraverso la rete peer-to-peer (ZIP 239).

NU5 ha inoltre aggiornato diversi ZIP esistenti (32, 203, 209, 212, 213, 221 e 401) affinché tengano conto del nuovo pool Orchard.

## Unified Addresses

Prima di NU5, ogni pool aveva il proprio tipo di indirizzo e il mittente doveva sapere quale tipo desideravi. Gli Unified Addresses, definiti in [ZIP 316](https://zips.z.cash/zip-0316), cambiano questa situazione. Un singolo Unified Address può riunire ricevitori per più di un pool, quindi il wallet del mittente sceglie semplicemente il migliore che supporta.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Le chiavi di visualizzazione unificate funzionano allo stesso modo per la visualizzazione. Offrono visibilità in sola lettura sui pool coperti da un indirizzo. Per ulteriori informazioni, consulta la pagina [Viewing Keys](../zcash-tech/viewing-keys).

## Dove si colloca NU5

NU5 ha seguito i precedenti aggiornamenti di Zcash: Overwinter, Sapling, Blossom, Heartwood e Canopy. È stato attivato sulla mainnet il 31 maggio 2022. Il ciclo di curve di Orchard è stato scelto perché supporta la ricorsione, che costituisce una base per futuri interventi di scalabilità. NU5 è il predecessore diretto della linea di aggiornamenti NU6 e NU6.x, che si è basata sul pool Orchard e successivamente lo ha corretto.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Network upgrade (NU) | Una modifica coordinata alle regole di consenso di Zcash, attivata a un'altezza di blocco prestabilita |
| Orchard | Il pool schermato introdotto da NU5, basato sul sistema di proving Halo 2 |
| Halo 2 | Il sistema di proving alla base di Orchard che non richiede una configurazione fidata |
| Trusted setup | Una cerimonia una tantum che crea i parametri segreti di un pool e per la quale occorre confidare che vengano distrutti |
| Unified Address | Un singolo indirizzo che può riunire ricevitori per più di un pool (ZIP 316) |
| Consensus branch id | Un identificatore che indica a quale insieme di regole appartiene una transazione |

## FAQ

NU5 modifica i miei ZEC o la mia privacy? No. NU5 ha aggiunto un nuovo pool schermato e un nuovo formato di indirizzo. I tuoi ZEC esistenti non subiscono modifiche e la tua privacy non viene ridotta. Spostare fondi in Orchard ti offre un pool che non richiede alcuna configurazione fidata.

Cos'è Orchard? Orchard è il protocollo schermato di Zcash introdotto da NU5. Funziona con il sistema di proving Halo 2, quindi non richiede alcuna cerimonia di configurazione fidata.

Devo fare qualcosa? No. Un wallet supportato gestisce NU5 per te. Puoi continuare a usare gli indirizzi precedenti e iniziare a usare gli Unified Addresses quando il tuo wallet li offre.

Cos'è un Unified Address? Un singolo indirizzo che può contenere ricevitori per più di un pool. Il wallet del mittente sceglie il pool che supporta, quindi non devi fornire un indirizzo diverso per ogni tipo.

NU5 rimuove la configurazione fidata dai miei fondi precedenti? Non retroattivamente. Orchard non richiede alcuna configurazione fidata, ma i parametri precedenti del pool Sapling continuano a esistere dopo NU5. La garanzia di assenza di configurazione si applica ai fondi detenuti nel pool Orchard.

Il vecchio formato di transazione ha smesso di funzionare? No. NU5 ha aggiunto il formato versione 5 e il precedente formato versione 4 è rimasto valido dopo l'attivazione.

## Verifica la tua comprensione

Sprout e Sapling richiedevano entrambi una cerimonia di configurazione fidata. Cosa ha cambiato il pool Orchard di NU5 al riguardo, e perché è importante?

<details>
<summary>Risposta</summary>

Orchard è basato sul sistema di proving Halo 2, che non richiede alcuna configurazione fidata né una stringa di riferimento strutturata. Questo elimina il rischio che parametri segreti residui possano essere usati per contraffare ZEC. La garanzia si applica ai fondi detenuti nel pool Orchard. I precedenti parametri Sapling continuano a esistere dopo NU5.
</details>

### Risorse

[ZIP 252: Implementazione del Network Upgrade NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Protocollo schermato Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Formato di transazione versione 5](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Addresses e Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: rilascio zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Vedi anche

[Zcash Aggiornamenti di rete](../start-here/network-upgrades)

[Pool schermati](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Serie: indice degli [aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [Canopy](../zcash-tech/canopy) · Successivo: [NU6](../zcash-tech/nu6)

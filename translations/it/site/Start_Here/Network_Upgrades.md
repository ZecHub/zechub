# Aggiornamenti di rete di Zcash

Zcash migliora attraverso gli aggiornamenti di rete: modifiche coordinate alle regole su cui ogni nodo è d'accordo, ciascuna attivata a un'altezza di blocco prestabilita. Ogni aggiornamento qui sotto ha la sua pagina che spiega, in parole semplici, cosa ha cambiato e perché. Sei nuovo di Zcash? Leggili in ordine, da Sprout a Ironwood.

Per la storia visiva di come la privacy di Zcash si è evoluta attraverso questi aggiornamenti, consulta [L'evoluzione della privacy](https://zechub.wiki/zcash-evolution). Questa pagina è l'indice. Quella è la cronologia.

| Aggiornamento | Attivazione (UTC) | Blocco | Branch id | Cosa ha cambiato |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 ottobre 2016 | genesis | 00000000 | Il lancio: la prima pool schermata e le transazioni private di zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 giugno 2018 | 347,500 | 5ba81b19 | Protezione dal replay, versionamento delle transazioni e scadenza, così gli aggiornamenti sicuri sono diventati possibili |
| [Sapling](../zcash-tech/sapling) | 29 ottobre 2018 | 419,200 | 76b809bb | Transazioni schermate efficienti, abbastanza veloci per telefoni e portafogli hardware |
| [Blossom](../zcash-tech/blossom) | 11 dicembre 2019 | 653,600 | 2bb40e60 | Blocchi più veloci, circa 75 secondi, e maggiore throughput |
| [Heartwood](../zcash-tech/heartwood) | 16 luglio 2020 | 903,000 | f5b9230b | Ricompense di mining schermate e client più leggeri (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 novembre 2020 | 1,046,400 | e9ff75a6 | Il Development Fund, il primo halving e lo smantellamento della pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 maggio 2022 | 1,687,104 | c2d6d0b4 | La pool Orchard su Halo 2 (senza trusted setup), indirizzi unificati e transazioni v5 |
| [NU6](../zcash-tech/nu6) | 23 novembre 2024 | 2,726,400 | c8e71055 | Il Deferred Dev Fund Lockbox e una nuova ripartizione dei finanziamenti allo sviluppo |
| [NU6.1](../zcash-tech/nu6-1) | 24 novembre 2025 | 3,146,400 | 4dec4df0 | Governance di quel finanziamento da parte della comunità e dei detentori di monete |
| [NU6.2](../zcash-tech/nu6-2) | 3 giugno 2026 | 3,364,600 | 5437f330 | Una correzione di emergenza che ha corretto il circuito Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 luglio 2026 | 3,428,143 | 37a5165b | La pool Ironwood e un turnstile (tornello) pubblico che permette a chiunque di verificare l'offerta |
| [NU7](../zcash-tech/nu7) | 6 novembre 2026 | 3,543,405 | 77190ad9 | Blocchi da 25 secondi (ZIP 218), riciclo delle commissioni NSM (ZIP 235+237), dismissione di Sprout (ZIP 2003) |

Le date sono mostrate in UTC. Alcune dashboard le mostrano in ora locale, che corrisponde allo stesso blocco e allo stesso momento. Il trigger fisso di ogni aggiornamento è la sua altezza di blocco di attivazione, non la data del calendario.

### Stato di NU7

NU7 si è attivato sulla Mainnet all'altezza **3,543,405** ([ZIP 259](https://zips.z.cash/zip-0259)) il **6 novembre 2026** (02:34 UTC; la sera del 5 novembre nei fusi orari statunitensi). È andato in funzione sulla Testnet pubblica in precedenza, all'altezza **4,465,026** (4 ottobre 2026).

Ambito (ZIP 259):

- **Blocchi da 25 secondi** (ZIP 218) — prima conferma ~3× più veloce; emissione giornaliera di ZEC invariata.
- **Network Sustainability Mechanism** (ZIP 235 + ZIP 237) — il 60% delle commissioni di transazione ritirato dalla circolazione in una riserva e riemesso ai miner secondo un programma che preserva l'halving, a partire da ~febbraio 2031.
- **Dismissione di Sprout** (ZIP 2003) — le transazioni di versione 4 diventano non valide; i restanti fondi di Sprout diventano non spendibili.
- Limiti sulle azioni schermate e una finestra di media della difficoltà più ampia (17 → 102 blocchi).

Nessun nuovo formato di transazione viene introdotto. ID del branch di consenso: `0x77190ad9`.

Consulta la cronologia [L'evoluzione della privacy](https://zechub.wiki/zcash-evolution) e [ZIP 259](https://zips.z.cash/zip-0259) per tutti i dettagli. Cronologia del forum: [NU7 Cronologia](https://forum.zcashcommunity.com/t/nu7-timeline/57655).

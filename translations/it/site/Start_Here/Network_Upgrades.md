# Zcash Aggiornamenti di rete

Zcash migliora attraverso aggiornamenti di rete: modifiche coordinate alle regole su cui ogni nodo è d'accordo, ciascuna attivata a un'altezza di blocco prestabilita. Ogni aggiornamento qui sotto ha una propria pagina che spiega, in modo chiaro, cosa ha modificato e perché. Sei nuovo su Zcash? Leggili in ordine, da Sprout a Ironwood.

Per la storia visiva di come la privacy di Zcash si sia evoluta attraverso questi aggiornamenti, consulta [L'evoluzione della privacy](https://zechub.wiki/zcash-evolution). Questa pagina è l'indice. Quella è la cronologia.

| Aggiornamento | Attivazione (UTC) | Blocco | ID del branch | Cosa ha modificato |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 ottobre 2016 | genesi | 00000000 | Il lancio: la prima pool schermata e le transazioni private zk-SNARK |
| [Overwinter](../zcash-tech/overwinter) | 26 giugno 2018 | 347.500 | 5ba81b19 | Protezione dal replay, versionamento delle transazioni e scadenza, rendendo possibili aggiornamenti sicuri |
| [Sapling](../zcash-tech/sapling) | 29 ottobre 2018 | 419.200 | 76b809bb | Transazioni schermate efficienti, abbastanza veloci per telefoni e portafogli hardware |
| [Blossom](../zcash-tech/blossom) | 11 dicembre 2019 | 653.600 | 2bb40e60 | Blocchi più veloci, circa 75 secondi, e maggiore capacità di elaborazione |
| [Heartwood](../zcash-tech/heartwood) | 16 luglio 2020 | 903.000 | f5b9230b | Ricompense di mining schermate e client più leggeri (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 novembre 2020 | 1.046.400 | e9ff75a6 | Il Fondo di sviluppo, il primo halving e la dismissione della pool Sprout |
| [NU5](../zcash-tech/nu5) | 31 maggio 2022 | 1.687.104 | c2d6d0b4 | La pool Orchard su Halo 2 (senza trusted setup), indirizzi unificati e transazioni v5 |
| [NU6](../zcash-tech/nu6) | 23 novembre 2024 | 2.726.400 | c8e71055 | Il Deferred Dev Fund Lockbox e una nuova ripartizione dei finanziamenti per lo sviluppo |
| [NU6.1](../zcash-tech/nu6-1) | 24 novembre 2025 | 3.146.400 | 4dec4df0 | La governance della community e dei detentori di monete di tali finanziamenti |
| [NU6.2](../zcash-tech/nu6-2) | 3 giugno 2026 | 3.364.600 | 5437f330 | Una correzione d'emergenza che ha corretto il circuito Orchard |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 luglio 2026 | 3.428.143 | 37a5165b | La pool Ironwood e un turnstile (tornello) pubblico che permette a chiunque di verificare la fornitura |
| **NU7** (in arrivo) | Testnet: 4 ott 2026; Mainnet: previsto per il 5 nov 2026 | Testnet: 4.465.026; Mainnet: 3.543.405 | 77190ad9 | Blocchi da 25 secondi (ZIP 218), riciclo delle commissioni NSM (ZIP 235+237), ritiro di Sprout (ZIP 2003) |

Le date sono mostrate in UTC. Alcune dashboard le mostrano nell'ora locale, ma si tratta dello stesso blocco e dello stesso momento. Il fattore di attivazione fisso per ogni aggiornamento è la sua altezza di blocco di attivazione, non la data sul calendario.

### Stato di NU7

NU7 è attivo sulla Testnet pubblica all'altezza **4.465.026** (attivato il 4 ottobre 2026). L'altezza di attivazione della Mainnet è **3.543.405** ([ZIP 259](https://zips.z.cash/zip-0259)), prevista per il **5 novembre 2026**.

Ambito (ZIP 259):

- **Blocchi da 25 secondi** (ZIP 218) — prima conferma circa 3× più veloce; emissione giornaliera di ZEC invariata.
- **Meccanismo di sostenibilità della rete** (ZIP 235 + ZIP 237) — il 60% delle commissioni di transazione viene rimosso dalla circolazione e trasferito in una riserva, quindi riemesso ai miner secondo un programma che preserva l'halving a partire da circa febbraio 2031.
- Ritiro di **Sprout** (ZIP 2003) — le transazioni versione 4 diventano non valide; i fondi Sprout rimanenti non possono più essere spesi.
- Limiti delle azioni schermate e una finestra di media della difficoltà più ampia (17 → 102 blocchi).

Non viene introdotto alcun nuovo formato di transazione. ID del branch di consenso: `0x77190ad9`.

Consulta la cronologia [L'evoluzione della privacy](https://zechub.wiki/zcash-evolution) e [ZIP 259](https://zips.z.cash/zip-0259) per tutti i dettagli. Cronologia del forum: [Cronologia di NU7](https://forum.zcashcommunity.com/t/nu7-timeline/57655).

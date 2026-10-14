# Zcash Netzwerk-Upgrades

Zcash verbessert sich durch Netzwerk-Upgrades: koordinierte Änderungen an den Regeln, denen jeder Knoten zustimmt, die jeweils bei einer festgelegten Blockhöhe aktiviert werden. Jedes der folgenden Upgrades hat eine eigene Seite, die in einfacher Sprache erklärt, was sich geändert hat und warum. Neu bei Zcash? Lies sie der Reihe nach, von Sprout bis Ironwood.

Für die visuelle Geschichte, wie sich der Datenschutz von Zcash über diese Upgrades hinweg entwickelt hat, siehe [Die Entwicklung des Datenschutzes](https://zechub.wiki/zcash-evolution). Diese Seite ist das Inhaltsverzeichnis. Jene ist die Zeitleiste.

| Upgrade | Aktivierung (UTC) | Block | Branch-ID | Was sich geändert hat |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28. Oktober 2016 | Genesis | 00000000 | Der Start: der erste abgeschirmte Pool und private zk-SNARK-Transaktionen |
| [Overwinter](../zcash-tech/overwinter) | 26. Juni 2018 | 347,500 | 5ba81b19 | Replay-Schutz, Transaktionsversionierung und Ablauf, wodurch sichere Upgrades möglich wurden |
| [Sapling](../zcash-tech/sapling) | 29. Oktober 2018 | 419,200 | 76b809bb | Effiziente abgeschirmte Transaktionen, schnell genug für Smartphones und Hardware-Wallets |
| [Blossom](../zcash-tech/blossom) | 11. Dezember 2019 | 653,600 | 2bb40e60 | Schnellere Blöcke, etwa 75 Sekunden, und höherer Durchsatz |
| [Heartwood](../zcash-tech/heartwood) | 16. Juli 2020 | 903,000 | f5b9230b | Abgeschirmte Mining-Belohnungen und schlankere Clients (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18. November 2020 | 1,046,400 | e9ff75a6 | Der Development Fund, das erste Halving und die schrittweise Einstellung des Sprout-Pools |
| [NU5](../zcash-tech/nu5) | 31. Mai 2022 | 1,687,104 | c2d6d0b4 | Der Orchard-Pool auf Halo 2 (kein vertrauenswürdiges Setup), Unified Addresses und v5-Transaktionen |
| [NU6](../zcash-tech/nu6) | 23. November 2024 | 2,726,400 | c8e71055 | Die Deferred Dev Fund Lockbox und eine neue Aufteilung der Entwicklungsfinanzierung |
| [NU6.1](../zcash-tech/nu6-1) | 24. November 2025 | 3,146,400 | 4dec4df0 | Governance dieser Finanzierung durch Community und Coin-Inhaber |
| [NU6.2](../zcash-tech/nu6-2) | 3. Juni 2026 | 3,364,600 | 5437f330 | Ein Notfall-Fix, der den Orchard-Schaltkreis korrigierte |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28. Juli 2026 | 3,428,143 | 37a5165b | Der Ironwood-Pool und eine öffentliche Drehsperre, mit der jeder die Umlaufmenge prüfen kann |
| **NU7** (bevorstehend) | Testnet: 4. Okt. 2026; Mainnet: angestrebt am 5. Nov. 2026 | Testnet: 4,465,026; Mainnet: TBD (Festlegung am 20. Okt.) | 77190ad9 | 25-Sekunden-Blöcke (ZIP 218), NSM-Gebühren-Recycling (ZIP 235+237), Einstellung von Sprout (ZIP 2003) |

Die Daten werden in UTC angezeigt. Einige Dashboards zeigen sie in lokaler Zeit an; es handelt sich dabei um denselben Block und denselben Zeitpunkt. Der feste Auslöser für jedes Upgrade ist seine Aktivierungsblockhöhe, nicht das Kalenderdatum.

### Status von NU7

NU7 ist auf dem öffentlichen Testnet bei Höhe **4,465,026** live (aktiviert am 4. Oktober 2026). Die Aktivierungshöhe des Mainnets wird am **20. Oktober 2026** festgelegt; das aktuelle Ziel ist der **5. November 2026**.

Umfang (ZIP 259):

- **25-Sekunden-Blöcke** (ZIP 218) — die erste Bestätigung erfolgt etwa 3× schneller; die tägliche Ausgabe von ZEC bleibt unverändert.
- **Network Sustainability Mechanism** (ZIP 235 + ZIP 237) — 60 % der Transaktionsgebühren werden aus dem Umlauf entfernt und einer Reserve zugeführt, die ab etwa Februar 2031 nach einem Halving-erhaltenden Zeitplan erneut an Miner ausgegeben wird.
- **Einstellung von Sprout** (ZIP 2003) — Transaktionen der Version 4 werden ungültig; verbleibende Sprout-Mittel werden nicht mehr ausgebbar.
- Limits für abgeschirmte Aktionen und ein breiteres Zeitfenster zur Durchschnittsbildung der Schwierigkeit (17 → 102 Blöcke).

Es wird kein neues Transaktionsformat eingeführt. Consensus-Branch-ID: `0x77190ad9`.

Siehe die Zeitleiste [Die Entwicklung des Datenschutzes](https://zechub.wiki/zcash-evolution) und [ZIP 259](https://zips.z.cash/zip-0259) für alle Details. Forum-Zeitleiste: [NU7 Zeitleiste](https://forum.zcashcommunity.com/t/nu7-timeline/57655).

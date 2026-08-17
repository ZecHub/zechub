---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood ging im Zcash-Mainnet bei Block 903.000 (16. Juli 2020 UTC) live.

Das nehmen Sie mit: wie Heartwood es Minern ermöglichte, ihre Blockbelohnungen direkt in Shielded-Adressen zu erhalten, und wie es Zcashs Proof-of-Work für leichtgewichtige Clients überprüfbar machte.

Heartwood ist ein Zcash-[Network Upgrade](../start-here/network-upgrades), ein Hard Fork der Konsensregeln, dessen Einführung in [ZIP 250](https://zips.z.cash/zip-0250) definiert ist. Es bündelte zwei Funktionsänderungen: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) und [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood war Zcashs viertes großes Network Upgrade und wurde gemeinsam von der [Electric Coin Company](../zcash-organizations/electric-coin-company) und der [Zcash Foundation](../zcash-organizations/zcash-foundation) unterstützt. Wie jedes Zcash-Upgrade setzte es eine neue Consensus-Branch-ID, ein Kennzeichen, das beidseitigen Replay-Schutz bietet, sodass eine Transaktion, die nach den neuen Regeln erstellt wurde, nicht auf der alten Chain wiederholt werden kann – und umgekehrt.

Heartwood wird bei einer festgelegten Blockhöhe (903.000) aktiviert, nicht zu einer festen Uhrzeit, daher kann die genaue Minute, die Sie auf einem Dashboard sehen, von Ort zu Ort leicht abweichen. Der Block und der Zeitpunkt sind dieselben.

Warum das wichtig ist. Miner verdienen neu erzeugte ZEC jedes Mal, wenn sie einen Block minen. Vor Heartwood musste dieses Einkommen in einer transparenten Adresse landen, die öffentlich ist. Jeder konnte sehen, wie viel ein Miner verdiente und wohin die Coins danach gingen. Heartwood ermöglichte stattdessen, dass diese Belohnung direkt an eine Shielded-Adresse geht, sodass die Vergütung eines Miners privat bleiben kann. Außerdem wurde es damit für leichtgewichtige Wallets und andere Chains möglich, Zcashs Proof-of-Work zu prüfen, ohne die gesamte Chain herunterzuladen.

## Shielded Coinbase

Die Coinbase-Transaktion ist die spezielle Transaktion, die eine Blockbelohnung auszahlt. Vor Heartwood mussten ihre Outputs transparent sein, sodass die neu erzeugten ZEC eines Miners immer in einer öffentlichen Adresse begannen. Heartwood änderte die Konsensregeln so, dass Coinbase-Transaktionen, in den Worten von ZIP 213, Sapling-Outputs enthalten dürfen. Vereinfacht gesagt können Miner Belohnungen nun direkt an Shielded-Sapling-Adressen erhalten. Transparente Coinbase-Outputs werden weiterhin unterstützt, also ist dies eine neue Option und keine erzwungene Änderung.

![Vor Heartwood musste die Blockbelohnung eines Miners an eine transparente öffentliche Adresse gehen. Nach Heartwood dürfen Coinbase-Transaktionen Sapling-Outputs enthalten, sodass die Belohnung direkt an eine Shielded-Adresse gehen kann](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Warum zuerst Sapling

Shielded Coinbase zielt speziell auf Sapling-Outputs ab, und dafür gibt es einen Grund. ZIP 213 erklärt, dass das Sapling-Upgrade architektonische Änderungen und Leistungsverbesserungen brachte, die es machbar machten, Gelder direkt in der Coinbase-Transaktion abzuschirmen. Der ursprüngliche Sprout-Shielded-Pool war zu ressourcenintensiv, um direkt in der Coinbase abgeschirmt zu werden. Saplings effizienteres Proving-System und Notizformat machten es praktikabel. Sapling hatte selbst die ältere Regel, die Shielded-Coinbase-Outputs verbot, so erweitert, dass die Regel auch Sapling-Outputs umfasste, und Heartwood lockert diese Regel, um sie zu erlauben. Es ist ein gutes Beispiel dafür, wie Zcash-Upgrades aufeinander aufbauen: Die technische Grundlage eines Upgrades wird zur Basis für das nächste.

## FlyClient

Heartwood änderte auch, worauf sich ein Block-Header festlegt. Das Header-Feld, das zuvor hashFinalSaplingRoot hieß, wurde umgewidmet und in hashLightClientRoot umbenannt. Es legt sich nun auf die Root einer Merkle Mountain Range (MMR) fest, einer fortlaufenden Struktur, die über den Header-Daten und Metadaten früherer Blöcke aufgebaut wird, etwa Zeitstempel, Schwierigkeitsziele, Sapling-Roots, akkumulierte Arbeit und Transaktionsanzahlen. Diese Festlegung erlaubt es einem Light Client oder einer externen Chain, Zcashs Proof-of-Work mit einem kleinen Beweis zu verifizieren, dessen Größe nur logarithmisch mit der Länge der Chain wächst. Der Vorteil sind bessere Light-Client-Wallets und eine einfachere Integration durch Dritte sowie chainübergreifende Integration, weil ein Client nicht länger jeden Block herunterladen muss, um der Arbeit hinter der Chain zu vertrauen.

![FlyClient-Ablauf: Die Header-Daten jedes Blocks werden in einer Merkle-Mountain-Range-Root (hashLightClientRoot) festgelegt, wodurch ein Light Client den Proof-of-Work mit einem kleinen Beweis logarithmischer Größe verifizieren kann](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Wo Heartwood einzuordnen ist

Heartwood ist ein Schritt in einer Reihe von Zcash-Upgrades, von denen jedes ein Element hinzufügt, auf das sich das nächste stützt. Overwinter und Sapling kamen 2018, Blossom 2019 und Heartwood 2020 bei Block 903.000. Canopy folgte später im Jahr 2020 bei Block 1.046.400. Sapling ist für Heartwood das zentrale Glied in dieser Kette: Seine effiziente Shielded-Transaktionsmechanik war die technische Voraussetzung, die Shielded Coinbase möglich machte.

![Zeitleiste der Zcash-Upgrades: Overwinter und Sapling im Jahr 2018, Blossom im Jahr 2019 und Heartwood im Jahr 2020](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Glossar

| Begriff | Bedeutung in einfachem Englisch |
|---|---|
| Network Upgrade (NU) | Eine koordinierte Änderung an Zcashs Konsensregeln, aktiviert bei einer festgelegten Blockhöhe |
| Coinbase-Transaktion | Die spezielle Transaktion in jedem Block, die die Blockbelohnung auszahlt |
| Shielded-Sapling-Adresse | Ein privater Zcash-Adresstyp, der mit dem Sapling-Upgrade eingeführt wurde |
| Shielded Coinbase | Die Heartwood-Änderung, die es ermöglicht, Blockbelohnungen an Shielded-Sapling-Adressen auszuzahlen |
| FlyClient | Eine Methode, die es Light Clients ermöglicht, Proof-of-Work mit kleinen Beweisen zu verifizieren |
| Merkle Mountain Range (MMR) | Eine fortlaufende Zusammenfassung vergangener Blöcke, auf die sich der Block-Header festlegt |
| Consensus-Branch-ID | Ein Kennzeichen, das identifiziert, welchen Upgrade-Regeln eine Transaktion folgt; verwendet für Replay-Schutz |

## FAQ

Ändert Heartwood meine ZEC oder meine Privatsphäre? Nein. Heartwood hat Ihre bestehenden Guthaben nicht verändert. Es fügte die Option hinzu, dass Miner Belohnungen an Shielded-Adressen erhalten können, und verbesserte die Unterstützung für Light Clients. Ihre eigenen Guthaben und Shielded-Transaktionen bleiben unverändert.

Was ist Shielded Coinbase? Die Coinbase ist die Transaktion, die eine Blockbelohnung auszahlt. Heartwood erlaubt, dass diese Belohnung an eine Shielded-Sapling-Adresse statt an eine transparente Adresse geht, sodass die Einkünfte eines Miners privat bleiben können.

Müssen Miner Belohnungen jetzt abgeschirmt erhalten? Nein. Shielded Coinbase ist optional. Transparente Coinbase-Outputs werden weiterhin unterstützt, sodass Miner beides wählen können.

Warum verwendet Shielded Coinbase Sapling und nicht den älteren Sprout-Pool? Weil Saplings effizienteres Design es praktikabel machte, direkt in der Coinbase abzuschirmen. Der frühere Sprout-Pool war dafür zu ressourcenintensiv.

Was hat sich für Light Clients geändert? Der Block-Header legt sich jetzt über das Feld hashLightClientRoot auf eine Merkle Mountain Range über vergangene Blöcke fest. Das ermöglicht Light Clients und anderen Chains, Zcashs Proof-of-Work mit kleinen Beweisen logarithmischer Größe statt mit der ganzen Chain zu verifizieren.

## Testen Sie Ihr Verständnis

Warum erschien vor Heartwood die an einen Miner gezahlte Blockbelohnung öffentlich, und was hat Heartwood geändert?

<details>
<summary>Antwort</summary>

Coinbase-Outputs mussten transparent sein, daher landete die neu erzeugte Belohnung eines Miners immer in einer öffentlichen transparenten Adresse, die jeder einsehen konnte. Heartwood änderte die Konsensregeln (ZIP 213) so, dass Coinbase-Transaktionen Sapling-Outputs enthalten dürfen, wodurch Miner ihre Belohnungen direkt an Shielded-Adressen erhalten können.
</details>

### Ressourcen

[ZIP 250: Einführung des Heartwood Network Upgrade](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Änderungen auf der Konsensschicht](https://zips.z.cash/zip-0221)

[Heartwood Network Upgrade](https://z.cash/upgrade/heartwood/)

### Siehe auch

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Wallets](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Reihe: [Index der Network Upgrades](../start-here/network-upgrades) · Vorherige: [Blossom](../zcash-tech/blossom) · Nächste: [Canopy](../zcash-tech/canopy)

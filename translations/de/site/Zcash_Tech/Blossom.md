<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Blossom

> Blossom wurde auf dem Zcash-Mainnet bei Block 653.600 (11. Dezember 2019 UTC) live geschaltet.

Was du mitnehmen wirst: wie Blossom dafür sorgte, dass Zcash-Blöcke etwa doppelt so schnell eintreffen, ohne zu verändern, wie viel ZEC das Netzwerk im Laufe der Zeit erzeugt.

Blossom ist ein Zcash-[Netzwerk-Upgrade](../start-here/network-upgrades). Es wurde durch [ZIP 206](https://zips.z.cash/zip-0206) eingeführt, und seine wichtigste Konsensänderung ist in [ZIP 208](https://zips.z.cash/zip-0208) definiert. Blossom war ein Skalierungs-Upgrade: Es verkürzte die Zielzeit zwischen Blöcken von 150 Sekunden auf 75 Sekunden, sodass Blöcke etwa doppelt so häufig eintreffen. Die Electric Coin Company leitete Blossom und kündigte es an.

Warum das wichtig ist. Wenn du ZEC sendest, wartest du darauf, dass das Netzwerk sie in einem Block bestätigt. Wenn Blöcke langsam sind, wartest du länger. Vor Blossom wurde etwa alle 150 Sekunden ein neuer Block erwartet. Blossom halbierte dieses Ziel auf 75 Sekunden, sodass Bestätigungen früher eintreffen und die Kette in derselben Zeit mehr Transaktionen tragen kann. Das geschah, ohne mehr ZEC zu erzeugen oder den Zeitpunkt zukünftiger Halvings zu verschieben.

## TL;DR

- Blossom war das dritte Netzwerk-Upgrade von Zcash und wurde bei Mainnet-Block 653.600 (11. Dezember 2019 UTC) aktiviert. Eingeführt wurde es durch ZIP 206, die zentrale Änderung steht in ZIP 208.
- Es senkte den Zielabstand zwischen Blöcken von 150 Sekunden auf 75 Sekunden. Blöcke kommen damit etwa doppelt so häufig, erste Bestätigungen erfolgen schneller und der Durchsatz verdoppelt sich ungefähr.
- Damit die Ausgabe gleichmäßig bleibt, wurde die Belohnung pro Block halbiert und das Halving-Intervall von 840.000 auf 1.680.000 Blöcke verdoppelt.
- Die pro Zeiteinheit erzeugte Gesamtmenge an ZEC und der reale Zeitpunkt künftiger Halvings blieben unverändert.
- Es war eine verpflichtende bilaterale Änderung: Jeder Knoten musste aktualisiert werden, um auf der Chain zu bleiben.

## Visuelle Analogie

Blossom ist ein Busnetz, das seine Abfahrten verdoppelt. Busse kommen jetzt alle 75 Sekunden statt alle 150, sodass du nur halb so lange wartest (schnellere Bestätigungen) und das Netz doppelt so viele Fahrgäste befördert (Durchsatz). Damit die Lohnkosten für die Fahrer gleich bleiben, wird die Bezahlung pro Fahrt für jeden Fahrer halbiert: Die Gesamtausgaben für Gehälter bleiben gleich, sie werden nur auf doppelt so viele Fahrten verteilt.

## Schnellere Blöcke

Blossoms zentrale Änderung ist einfach. Der angestrebte Blockabstand von Zcash, also die Zeit, die das Netzwerk zwischen einem Block und dem nächsten anstrebt, wurde von 150 Sekunden auf 75 Sekunden gesenkt ([ZIP 208](https://zips.z.cash/zip-0208)). Blöcke werden per Proof of Work gefunden, daher schwankt der tatsächliche Abstand zwischen ihnen, aber das Netzwerk strebt nun etwa alle 75 Sekunden einen Block an statt alle 150.

Daraus folgen zwei Dinge:

1. Blöcke treffen etwa doppelt so häufig ein, sodass die Kette ungefähr doppelt so viele Transaktionen pro Zeiteinheit tragen kann.
2. Deine Transaktion erhält ihre erste Bestätigung früher, weil du nicht so lange auf den nächsten Block warten musst.

![Vor Blossom betrug das Blockziel 150 Sekunden, mit langsameren Bestätigungen und geringerem Durchsatz. Nach Blossom beträgt das Ziel 75 Sekunden, mit schnelleren Bestätigungen und ungefähr doppelt so hohem Durchsatz](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## Gleichbleibende Emission

Schnellere Blöcke werfen eine Frage auf. Wenn Zcash doppelt so viele Blöcke erzeugen würde und jeder Block weiterhin dieselbe Belohnung zahlen würde, dann würde das Netzwerk ZEC doppelt so schnell erzeugen. Blossom verhindert das. Es halbierte die pro Block gezahlte Belohnung und verdoppelte das Halving-Intervall der Blockbelohnung von 840.000 auf 1.680.000 Blöcke ([ZIP 208](https://zips.z.cash/zip-0208)). Doppelt so viele Blöcke, von denen jeder nur halb so viel zahlt, ergeben dieselbe Menge an ZEC pro Zeiteinheit. Der gesamte Angebotsplan und der Zeitpunkt zukünftiger Halvings, gemessen in Echtzeit, änderten sich nicht.

![Wie Blossom die Emission konstant hält: 75-Sekunden-Blöcke treffen doppelt so häufig ein, die Belohnung pro Block wird halbiert, das Halving-Intervall wird verdoppelt, sodass die Gesamtemission im Zeitverlauf gleich bleibt](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Ein verpflichtendes Upgrade

Blossom war eine bilaterale Konsensänderung, was bedeutet, dass jeder Knoten ein Upgrade durchführen musste, um der Kette weiter zu folgen ([ZIP 206](https://zips.z.cash/zip-0206)). Für einen Knotenbetreiber, der synchron bleiben wollte, war es nicht optional. Blossom wurde bei Mainnet-Block 653.600 aktiviert und trägt eine eigene Consensus Branch ID, eine Kennzeichnung, mit der Knoten und Transaktionen bestätigen können, dass sie den Blossom-Regeln folgen. Das Upgrade nutzte den standardmäßigen Netzwerk-Upgrade-Mechanismus von Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Wo Blossom einzuordnen ist

Blossom war das dritte Netzwerk-Upgrade von Zcash. Es folgte auf Overwinter und Sapling und kam vor Heartwood und Canopy. Anders als Sapling, das die abgeschirmte Kryptografie von Zcash überarbeitete, war Blossom auf Skalierung und Geschwindigkeit ausgerichtet. Seine Hauptaufgabe war das Block-Timing, nicht neue Datenschutzfunktionen.

## Häufige Fehler

- **Die Annahme, schnellere Blöcke bedeuteten mehr ZEC.** Wird die Belohnung pro Block halbiert und gleichzeitig die Blockrate verdoppelt, bleibt die Emission pro Zeiteinheit exakt gleich.
- **Die Annahme, Halvings fänden in Echtzeit früher statt.** Das Halving-Intervall wurde von 840.000 auf 1.680.000 Blöcke verdoppelt, sodass sich die Halving-Termine in Echtzeit nicht verschoben haben.
- **„75 Sekunden“ als Garantie verstehen.** Es ist ein Proof-of-Work-Zielwert; die tatsächlichen Abstände zwischen Blöcken schwanken um diesen Wert.
- **Blossom als Privatsphäre-Upgrade betrachten.** Seine Aufgabe betraf Blockzeiten und Skalierung – anders als Sapling veränderte es keinerlei Kryptografie.
- **Die Annahme, Knotenbetreiber könnten es überspringen.** Blossom war eine bilaterale Konsensänderung; ein nicht aktualisierter Knoten spaltet sich vom Netzwerk ab.

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| Block target spacing | Die Zeit, die das Netzwerk zwischen einem Block und dem nächsten anstrebt |
| Block reward | Die neuen ZEC, die erzeugt und ausgezahlt werden, wenn jeder Block gemined wird |
| Halving interval | Wie viele Blöcke zwischen jeder Halbierung der Blockbelohnung vergehen |
| Consensus branch id | Eine Kennzeichnung, die markiert, welchem Satz von Netzwerkregeln ein Knoten oder eine Transaktion folgt |
| Bilateral consensus change | Eine Regeländerung, die jeder Knoten übernehmen muss, um im Netzwerk zu bleiben |
| Network upgrade (NU) | Eine koordinierte Änderung der Konsensregeln von Zcash, die bei einer festgelegten Blockhöhe aktiviert wird |

## FAQ

Verändert Blossom, wie viel ZEC es gibt oder wann Halvings stattfinden? Nein. Die Belohnung pro Block wurde halbiert und das Halving-Intervall gleichzeitig verdoppelt, sodass die Menge an ZEC, die pro Zeiteinheit erzeugt wird, und der Zeitpunkt zukünftiger Halvings gleich blieben.

Verändert Blossom meine ZEC oder meine Privatsphäre? Nein. Blossom änderte das Block-Timing und die Mathematik der Belohnungen. Deine Guthaben oder deine abgeschirmten Transaktionen wurden nicht berührt.

Was bedeuten 75 Sekunden tatsächlich? Es ist ein Ziel, keine Garantie. Blöcke werden durch Proof of Work gefunden, daher variiert der tatsächliche Abstand zwischen Blöcken. Das Netzwerk zielt auf einen Block etwa alle 75 Sekunden statt alle 150 Sekunden.

Musste ich etwas tun, als Blossom aktiviert wurde? Wenn du einen vollständigen Knoten betrieben hast, musstest du ihn aktualisieren, weil Blossom verpflichtend war. Wenn du ein Wallet verwendet hast, brauchtest du eine Version, die die neuen Regeln unterstützte.

Warum die Blockbelohnung überhaupt halbieren? Weil Blöcke jetzt doppelt so schnell eintreffen. Die Halbierung der Belohnung pro Block verhindert, dass das Netzwerk ZEC doppelt so schnell erzeugt.

Wann wurde Blossom aktiviert? Bei Mainnet-Block 653.600, am 11. Dezember 2019 UTC.

## Teste dein Verständnis

Blossom sorgte dafür, dass Zcash-Blöcke etwa doppelt so häufig eintreffen. Warum verdoppelte das nicht die Rate, mit der neue ZEC erzeugt werden?

<details>
<summary>Antwort</summary>

Weil Blossom auch die pro Block gezahlte Belohnung halbierte und das Halving-Intervall von 840.000 auf 1.680.000 Blöcke verdoppelte. Doppelt so viele Blöcke, von denen jeder nur halb so viel zahlt, ergeben dieselbe Menge an ZEC pro Zeiteinheit, sodass sich der in Echtzeit gemessene Emissionsplan nicht änderte.
</details>

### Ressourcen

[ZIP 208: Kürzerer Zielabstand zwischen Blöcken](https://zips.z.cash/zip-0208)

[ZIP 206: Einführung des Blossom-Netzwerk-Upgrades](https://zips.z.cash/zip-0206)

[Blossom-Netzwerk-Upgrade](https://z.cash/upgrade/blossom/)

[Blossom-Upgrade verbessert Geschwindigkeit, Skalierbarkeit und Kapazität (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Siehe auch

[Zcash-Netzwerk-Upgrades](../start-here/network-upgrades)

[Zcash-Geldpolitik](../start-here/zcash-monetary-policy)

[Was sind ZEC und Zcash](../start-here/what-is-zec-and-zcash)

[Vollständige Knoten](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## Verwandte Seiten

- [Sapling](./Sapling.md) — das vorherige Upgrade (Kryptografie, nicht Timing)
- [Heartwood](./Heartwood.md) — das nächste Upgrade der Reihe
- [Vollständige Knoten](./Full_Nodes.md) — was der Betrieb eines Knotens bei verpflichtenden Upgrades mit sich bringt
- [Übersicht der Netzwerk-Upgrades](../start-here/network-upgrades) — die vollständige Upgrade-Zeitleiste

Reihe: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige Seite: [Sapling](../zcash-tech/sapling) · Nächste Seite: [Heartwood](../zcash-tech/heartwood)

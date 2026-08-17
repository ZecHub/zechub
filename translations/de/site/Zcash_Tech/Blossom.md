<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Blossom

> Blossom wurde auf dem Zcash-Mainnet bei Block 653.600 (11. Dezember 2019 UTC) live geschaltet.

Was du mitnehmen wirst: wie Blossom dafür sorgte, dass Zcash-Blöcke etwa doppelt so schnell eintreffen, ohne zu verändern, wie viel ZEC das Netzwerk im Laufe der Zeit erzeugt.

Blossom ist ein Zcash-[Netzwerk-Upgrade](../start-here/network-upgrades). Es wurde durch [ZIP 206](https://zips.z.cash/zip-0206) eingeführt, und seine wichtigste Konsensänderung ist in [ZIP 208](https://zips.z.cash/zip-0208) definiert. Blossom war ein Skalierungs-Upgrade: Es verkürzte die Zielzeit zwischen Blöcken von 150 Sekunden auf 75 Sekunden, sodass Blöcke etwa doppelt so häufig eintreffen. Die Electric Coin Company leitete Blossom und kündigte es an.

Warum das wichtig ist. Wenn du ZEC sendest, wartest du darauf, dass das Netzwerk sie in einem Block bestätigt. Wenn Blöcke langsam sind, wartest du länger. Vor Blossom wurde etwa alle 150 Sekunden ein neuer Block erwartet. Blossom halbierte dieses Ziel auf 75 Sekunden, sodass Bestätigungen früher eintreffen und die Kette in derselben Zeit mehr Transaktionen tragen kann. Das geschah, ohne mehr ZEC zu erzeugen oder den Zeitpunkt zukünftiger Halvings zu verschieben.

## Schnellere Blöcke

Blossoms zentrale Änderung ist einfach. Der Zcash-Zielabstand zwischen Blöcken, also die Zeit, die das Netzwerk zwischen einem Block und dem nächsten anstrebt, sank von 150 Sekunden auf 75 Sekunden ([ZIP 208](https://zips.z.cash/zip-0208)). Blöcke werden durch Proof of Work gefunden, daher variiert der tatsächliche Abstand zwischen ihnen, aber das Netzwerk zielt nun auf einen Block etwa alle 75 Sekunden statt alle 150 Sekunden.

Daraus folgen zwei Dinge:

1. Blöcke treffen etwa doppelt so häufig ein, sodass die Kette ungefähr doppelt so viele Transaktionen pro Zeiteinheit tragen kann.
2. Deine Transaktion erhält ihre erste Bestätigung früher, weil du nicht so lange auf den nächsten Block warten musst.

![Vor Blossom betrug das Blockziel 150 Sekunden, mit langsameren Bestätigungen und geringerem Durchsatz. Nach Blossom beträgt das Ziel 75 Sekunden, mit schnelleren Bestätigungen und ungefähr doppelt so hohem Durchsatz](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Gleichbleibende Emission

Schnellere Blöcke werfen eine Frage auf. Wenn Zcash doppelt so viele Blöcke erzeugen würde und jeder Block weiterhin dieselbe Belohnung zahlen würde, dann würde das Netzwerk ZEC doppelt so schnell erzeugen. Blossom verhindert das. Es halbierte die pro Block gezahlte Belohnung und verdoppelte das Halving-Intervall der Blockbelohnung von 840.000 auf 1.680.000 Blöcke ([ZIP 208](https://zips.z.cash/zip-0208)). Doppelt so viele Blöcke, von denen jeder nur halb so viel zahlt, ergeben dieselbe Menge an ZEC pro Zeiteinheit. Der gesamte Angebotsplan und der Zeitpunkt zukünftiger Halvings, gemessen in Echtzeit, änderten sich nicht.

![Wie Blossom die Emission konstant hält: 75-Sekunden-Blöcke treffen doppelt so häufig ein, die Belohnung pro Block wird halbiert, das Halving-Intervall wird verdoppelt, sodass die Gesamtemission im Zeitverlauf gleich bleibt](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Ein verpflichtendes Upgrade

Blossom war eine bilaterale Konsensänderung, was bedeutet, dass jeder Knoten ein Upgrade durchführen musste, um der Kette weiter zu folgen ([ZIP 206](https://zips.z.cash/zip-0206)). Für einen Knotenbetreiber, der synchron bleiben wollte, war es nicht optional. Blossom wurde bei Mainnet-Block 653.600 aktiviert und trägt eine eigene Consensus Branch ID, eine Kennzeichnung, mit der Knoten und Transaktionen bestätigen können, dass sie den Blossom-Regeln folgen. Das Upgrade nutzte den standardmäßigen Netzwerk-Upgrade-Mechanismus von Zcash ([ZIP 200](https://zips.z.cash/zip-0200)).

## Wo Blossom einzuordnen ist

Blossom war das dritte Netzwerk-Upgrade von Zcash. Es folgte auf Overwinter und Sapling und kam vor Heartwood und Canopy. Anders als Sapling, das die abgeschirmte Kryptografie von Zcash überarbeitete, war Blossom auf Skalierung und Geschwindigkeit ausgerichtet. Seine Hauptaufgabe war das Block-Timing, nicht neue Datenschutzfunktionen.

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| Zielabstand zwischen Blöcken | Die Zeit, die das Netzwerk zwischen einem Block und dem nächsten anstrebt |
| Blockbelohnung | Die neuen ZEC, die erzeugt und ausgezahlt werden, wenn jeder Block gemined wird |
| Halving-Intervall | Wie viele Blöcke zwischen jeder Halbierung der Blockbelohnung vergehen |
| Consensus Branch ID | Eine Kennzeichnung, die markiert, welchem Satz von Netzwerkregeln ein Knoten oder eine Transaktion folgt |
| Bilaterale Konsensänderung | Eine Regeländerung, die jeder Knoten übernehmen muss, um im Netzwerk zu bleiben |
| Netzwerk-Upgrade (NU) | Eine koordinierte Änderung der Konsensregeln von Zcash, die bei einer festgelegten Blockhöhe aktiviert wird |

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

Reihe: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige Seite: [Sapling](../zcash-tech/sapling) · Nächste Seite: [Heartwood](../zcash-tech/heartwood)

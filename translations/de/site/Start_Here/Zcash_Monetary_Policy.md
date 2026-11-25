<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash Geldpolitik

## Kurzfassung

* Zcash hat ein begrenztes Gesamtangebot von 21 Millionen ZEC, dieselbe Obergrenze wie Bitcoin.
* Seit der Aktivierung von NU7 am 6. November 2026 wird etwa alle 25 Sekunden ein neuer Block erzeugt, der 0.52083333 ZEC hervorbringt.
* Das ergibt etwa 1.800 neue ZEC pro Tag, genauso viele wie vor NU7.
* Die Blockbelohnung wird aufgeteilt: 80 % für den Miner, 8 % für Zcash Community Grants und 12 % für die Lockbox.
* Die Blockbelohnung halbiert sich etwa alle vier Jahre. Die nächste Halbierung wird für Ende November 2028 erwartet.

## Grundlegende Erklärung

### Wie funktioniert die Geldpolitik von Zcash?

Die monetäre Basis von Zcash entspricht dem festen Gesamtangebot von 21 Millionen ZEC-Einheiten wie bei Bitcoin. Im Durchschnitt wird alle 25 Sekunden (vor der Aktivierung von NU7 am 6. November 2026 alle 75 Sekunden) ein neuer [block](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.) auf der Zcash-Blockchain geschürft, und eine Blockbelohnung von 0.52083333 ZEC kommt in Umlauf. Vor NU7 betrug die Belohnung 1.5625 ZEC pro Block; [ZIP 218](https://zips.z.cash/zip-0218) hat sie zusammen mit der Blockzeit durch drei geteilt, sodass sich die Menge an neuen ZEC pro Tag nicht verändert hat. Seit NU7 wird die Belohnung von 0.52083333 ZEC zu 80 % an den Miner (0.41666668 ZEC plus Transaktionsgebühren), zu 8 % an Zcash Community Grants (0.04166666 ZEC) und zu 12 % an die Lockbox (0.06249999 ZEC) aufgeteilt, gemäß [ZIP 1015](https://zips.z.cash/zip-1015).

Die Blockbelohnung wird etwa alle vier Jahre halbiert, bis alle 21 Millionen ZEC im Umlauf sind. Die Inflation von Zcash verläuft nahezu genau wie die von Bitcoin. Wichtig ist, dass die Inflation mit der Ausgabe neuer Coins sinkt und die Rate bei jeder Halbierung deutlich zurückgeht.

## Anschaulicher Vergleich

Stell dir einen Münzspender vor einem versiegelten Tresor vor. Der Tresor enthält insgesamt 21 Millionen ZEC, und niemand kann auch nur eine einzige Münze hinzufügen.

Alle 25 Sekunden gibt der Spender eine kleine Handvoll neuer Coins aus: 0.52083333 ZEC. Der Miner, der den Block gefunden hat, erhält 80 % der Handvoll. Zcash Community Grants erhält 8 %. Die übrigen 12 % kommen in die Lockbox.

Etwa alle vier Jahre schrumpft die Handvoll auf die Hälfte. Das ist die Halbierung.

NU7 sorgte dafür, dass die Handvoll dreimal so oft ausgegeben wird und jedes Mal dreimal kleiner ist. Die Zahl der neuen Coins pro Tag blieb gleich.

## Vertiefung

### Neue ZEC pro Tag im Verlauf der einzelnen Epochen

Halbierungen senken die Belohnung pro Block. Auch schnellere Blöcke (Blossom im Jahr 2019, NU7 im Jahr 2026) senken die Belohnung pro Block zusammen mit der Blockzeit, sodass die tägliche Menge gleich bleibt.

| Zeitraum | Blockzeit | Belohnung pro Block | Neue ZEC pro Tag |
|:--|:--|:--|:--|
| Startphase, 2016 bis 2019 | 150 Sekunden | 12.5 ZEC | 7,200 |
| [Blossom](/zcash-tech/blossom), Dez. 2019 bis Nov. 2020 | 75 Sekunden | 6.25 ZEC | 7,200 |
| Erste Halbierung ([Canopy](/zcash-tech/canopy)), Nov. 2020 bis Nov. 2024 | 75 Sekunden | 3.125 ZEC | 3,600 |
| Zweite Halbierung ([NU6](/zcash-tech/nu6)), Nov. 2024 bis Nov. 2026 | 75 Sekunden | 1.5625 ZEC | 1,800 |
| [NU7](/zcash-tech/nu7), Nov. 2026 bis Ende 2028 | 25 Sekunden | 0.52083333 ZEC | 1,800 |
| Dritte Halbierung, voraussichtlich Ende Nov. 2028 | 25 Sekunden | die Hälfte der aktuellen Belohnung | etwa 900 |

Jeder Tageswert ergibt sich aus der Belohnung pro Block multipliziert mit der Zahl der Blöcke pro Tag (86,400 Sekunden geteilt durch die Blockzeit). Die tatsächlichen Blockzeiten schwanken leicht, daher weicht die tägliche Ausgabe etwas von diesen Werten ab.

### Wann die nächste Halbierung stattfindet

NU7 hat die Blöcke dreimal häufiger gemacht, wodurch sich die Blockhöhe der nächsten Halbierung verschoben hat. Die nächste Halbierung ist für Block 6,132,390 angesetzt und wird für Ende November 2028 erwartet ([ZIP 259](https://zips.z.cash/zip-0259)). Ältere Artikel nennen Block 4,406,400. Diese Angabe war vor NU7 korrekt.

### Gebühren und der Network Sustainability Mechanism

Seit NU7 werden 60 % der Transaktionsgebühren in jedem Block aus dem Umlauf genommen und in einer öffentlichen Reserve verwahrt. Ab Block 8,939,664, voraussichtlich etwa im Februar 2031, wird pro Block ein fester Teil dieser Reserve zusätzlich zur regulären Blockbelohnung an Miner ausgezahlt. Die Obergrenze von 21 Millionen ändert sich dadurch nicht. Die Seite zum [Network Sustainability Mechanism](/zcash-tech/network-sustainability-mechanism) erklärt, wie er funktioniert.

## Verwandte Seiten

- [NU7](/zcash-tech/nu7): das Upgrade, das 25-Sekunden-Blöcke und die aktuelle Blockbelohnung eingeführt hat.
- [Network Sustainability Mechanism](/zcash-tech/network-sustainability-mechanism): wohin 60 % der Gebühren jedes Blocks fließen und wann sie zurückkommen.
- [Development Fund](/start-here/development-fund): die Geschichte des Anteils der Blockbelohnung für die Entwicklung.
- [Network Upgrades](/start-here/network-upgrades): alle Zcash-Upgrades mit Datumsangaben und Blockhöhen.
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants): die Organisation, die den Anteil von 8 % erhält.
- [Zcash Mining Pools](/using-zcash/zcash-mining-pools): dort verdienen die meisten Miner ihren Anteil an der Blockbelohnung.

### Ressourcen

[Wie funktioniert die Geldpolitik von Zcash?](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218: Ziel-Blockabstand von 25 Sekunden](https://zips.z.cash/zip-0218)

[ZIP 259: Aktivierung des NU7 Network Upgrade](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**Zuletzt aktualisiert:** November 2026

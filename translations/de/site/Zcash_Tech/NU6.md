---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 wurde im Zcash-Mainnet bei Block 2.726.400 (23. November 2024 UTC) aktiviert.

Was du mitnimmst: wie Zcash seine eigene Entwicklung nach einem Halving weiter finanziert, warum es eine Reserve beiseitegelegt hat, von der es noch nicht wusste, wie sie ausgegeben werden soll, und wie es die gesamte ZEC-Menge exakt vorhersagbar gemacht hat.

NU6 ist ein Zcash-[Netzwerk-Upgrade](../start-here/network-upgrades), eingeführt durch [ZIP 253](https://zips.z.cash/zip-0253), das im November 2024 im Mainnet bei Block 2.726.400 aktiviert wurde. Es ist ein Upgrade für Geldpolitik und [Entwicklungsfinanzierung](../start-here/development-fund): Es sorgte dafür, dass auch nach dem Halving im November 2024 ein Anteil der Blocksubvention weiterhin in die Entwicklung fließt, richtete eine protokollinterne Reserve für eine künftige, von der Community entschiedene Verwendung ein und präzisierte die Zählung neu geschaffener ZEC. NU6 wurde sowohl von der Electric Coin Company als auch von der Zcash Foundation unterstützt.

Warum das wichtig ist. Der [Development Fund](../zcash-tech/canopy) von Zcash sollte ungefähr mit dem Halving im November 2024 enden, dem zweiten in seiner Geschichte. NU6 führte diese Finanzierung fort, aber anstatt jede Coin an feste Empfänger zu verteilen, reservierte es einen Anteil innerhalb des Protokolls, damit die Community später entscheiden kann, was damit geschehen soll. Außerdem schloss es eine unauffällige buchhalterische Lücke, sodass die Gesamtmenge an ZEC, die jemals existieren wird, nun exakt vorhergesagt werden kann.

## Was sich mit NU6 geändert hat

NU6 sorgte dafür, dass nach dem Halving im November 2024 weiterhin 20 % der Blocksubvention in die Entwicklungsfinanzierung fließen, eine Regel, die in [ZIP 1015](https://zips.z.cash/zip-1015) festgelegt ist. Diese 20 % wurden auf zwei Wege aufgeteilt.

1. 8 % der Blocksubvention gehen an Zcash Community Grants (ZCG), das Arbeiten von und für die Community finanziert.
2. 12 % fließen in eine neue protokollinterne Lockbox, die für eine spätere, von der Community entschiedene Verwendung zurückgehalten wird.

Der Rest der Blocksubvention sowie die Transaktionsgebühren gehen an die Miner, die das Netzwerk absichern. NU6 aktualisierte außerdem die bestehenden Regeln für Funding Streams und den Dev Fund (ZIP 207 und ZIP 214), damit sie zu dieser neuen Struktur passen.

![Aufteilung des Development Fund in NU6: 20 Prozent der Blocksubvention gehen in die Entwicklung, davon 8 Prozent an Zcash Community Grants und 12 Prozent in die Deferred Dev Fund Lockbox](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## Die verzögerte Lockbox

Der Anteil von 12 % ist die neue Idee in NU6. Statt an eine Empfängeradresse ausgezahlt zu werden, wird dieser Wert direkt in einen protokollinternen Pool eingezahlt, die sogenannte Deferred Dev Fund Lockbox, definiert in [ZIP 2001](https://zips.z.cash/zip-2001).

1. Die Lockbox ist ein neuer Funding-Stream-Typ (DEFERRED_POOL), bei dem der Wert der Blockbelohnung in das Protokoll selbst fließt, nicht an eine Person oder Organisation.
2. Das Netzwerk verfolgt sie als eigenen Saldo eines Chain-Value-Pools, genauso wie es die Salden der abgeschirmten Pools verfolgt.
3. NU6 schuf die Lockbox absichtlich, ließ aber die schwierige Frage offen: Wer kontrolliert diese Mittel, und wie werden sie freigegeben?

Diese Frage wurde später durch [NU6.1](../zcash-tech/nu6-1) beantwortet, das die Governance festlegte: Es führte den 8-%-Blocksubventions-Stream an Zcash Community Grants fort und leitete einen 12-%-Stream in einen von Coin-Inhabern kontrollierten Fonds, der mit Mitteln aus der Lockbox ausgestattet wurde.

## Die Bücher ausgleichen

NU6 schloss außerdem eine Buchungslücke bei der Erzeugung neuer ZEC, definiert in [ZIP 236](https://zips.z.cash/zip-0236). Coinbase-Transaktionen sind die speziellen Transaktionen, die die neuen ZEC und Gebühren jedes Blocks auszahlen.

1. Vor NU6 musste eine Coinbase-Transaktion nur sicherstellen, dass sie nicht mehr beansprucht, als ihr zusteht. Ein Miner konnte weniger als die volle Subvention beanspruchen, wodurch diese ZEC stillschweigend verbrannt wurden.
2. Nach NU6 muss eine Coinbase-Transaktion exakt ausgeglichen sein: Der gesamte Output-Wert muss genau der Miner-Subvention plus den Gebühren entsprechen, nicht mehr und nicht weniger.
3. Weil Miner nun keine zu geringe Beanspruchung mehr vornehmen und damit versehentlich ZEC verbrennen können, lässt sich die Gesamtmenge an ZEC, die jemals existieren wird, jetzt exakt vorhersagen.

![Ausgleich von Coinbase vor und nach NU6: Vorher konnte Coinbase zu wenig beanspruchen und ZEC verbrennen, sodass das Angebot nicht exakt vorhersagbar war. Danach muss Coinbase exakt ausgeglichen sein, sodass die Ausgabe exakt vorhersagbar ist](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## Wie sich die Finanzierung entwickelt hat

NU6 ist ein Kapitel in der längeren Geschichte, wie Zcash sich selbst finanziert.

1. Canopy (2020) beendete die ursprüngliche Founders Reward und schuf den [Development Fund](../start-here/development-fund).
2. NU6 (November 2024) strukturierte diese Finanzierung nach dem zweiten Halving neu und richtete die Deferred Dev Fund Lockbox ein, die einen Anteil der Ausgabe für künftig von der Community entschiedene Zuschüsse reserviert.
3. NU6.1 (2025) beantwortete die von NU6 offen gelassene Frage, wer die reservierten Mittel kontrolliert, indem es weiterhin 8 % der Blocksubvention an Zcash Community Grants leitete und 12 % in einen von Coin-Inhabern kontrollierten Fonds überführte, der mit Mitteln aus der Lockbox ausgestattet wurde.

![Wie sich die Zcash-Finanzierung entwickelt hat: Canopy schuf den Development Fund, NU6 richtete die Lockbox ein, und NU6.1 legte die Regeln fest, wer sie kontrolliert](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| Block subsidy | Die neuen ZEC, die mit jedem geminten Block erzeugt werden |
| Coinbase transaction | Die spezielle Transaktion, die die Subvention und Gebühren eines Blocks auszahlt |
| Deferred Dev Fund Lockbox | Eine protokollinterne Reserve, die einen Anteil der Ausgabe für eine künftige, von der Community entschiedene Verwendung hält |
| Zcash Community Grants (ZCG) | Ein Komitee, das Arbeiten von und für die Zcash-Community finanziert |
| Consensus branch id | Die Kennung, die Knoten verwenden, um festzustellen, welchen Upgrade-Regeln ein Block folgt |
| Network upgrade (NU) | Eine koordinierte Änderung der Konsensregeln von Zcash, aktiviert bei einer festgelegten Blockhöhe |

## FAQ

Ändert NU6 meine ZEC oder meine Privatsphäre? Nein. Bei NU6 geht es darum, wie Entwicklung finanziert wird und wie die Ausgabe gezählt wird, nicht um deine Transaktionen oder deine Privatsphäre. Deine Mittel und abgeschirmten Transaktionen bleiben unberührt.

Woher kommt die Finanzierung? Aus der Blocksubvention, den neuen ZEC, die bei der Erzeugung von Blöcken ausgegeben werden. Ein Anteil von 20 % wird in die Entwicklung umgeleitet, anstatt vollständig an die Miner zu gehen.

Wofür ist die Lockbox gedacht? Sie reserviert einen Anteil der Ausgabe innerhalb des Protokolls, damit die Community später entscheiden kann, wie er verwendet wird. NU6 legte diese Reserve beiseite, und NU6.1 legte die Regeln fest, wer sie kontrolliert.

Verändert die Regel des exakten Ausgleichs meine Coins? Nein. Sie verlangt nur, dass die Coinbase-Transaktion jedes Blocks genau das auszahlt, was ihr zusteht. Sie betrifft die Buchhaltung neuer Ausgabe, nicht bestehende Guthaben.

Was definiert NU6 technisch? NU6 wird durch ZIP 253 eingeführt, das seine Mainnet-Aktivierung bei Block 2.726.400 und seine Consensus branch id festlegt. Die Konsensänderungen selbst kommen aus ZIP 236, ZIP 1015 und ZIP 2001, wobei ZIP 207 und ZIP 214 passend aktualisiert wurden.

Wie unterscheidet sich NU6 von NU6.1? NU6 strukturierte die Finanzierung neu und schuf die Lockbox. NU6.1 entschied, wer die Mittel der Lockbox kontrolliert und wie der reservierte Anteil aufgeteilt wird.

## Teste dein Verständnis

NU6 richtete die Deferred Dev Fund Lockbox ein, sagte aber nicht, wer sie kontrolliert. Warum sollte ein Upgrade eine Reserve schaffen und ihre Governance bewusst auf später verschieben?

<details>
<summary>Antwort</summary>

Durch die Schaffung der Reserve wurde festgelegt, dass ein Anteil der Ausgabe innerhalb des Protokolls beiseitegelegt wird, statt an feste Empfänger ausgezahlt zu werden. Zu entscheiden, wer diese Mittel kontrolliert und wie sie freigegeben werden, ist eine schwierigere Governance-Frage. NU6 ließ dies bewusst offen, und NU6.1 beantwortete es: 8 % der Blocksubvention gehen weiterhin an Zcash Community Grants, und 12 % fließen in einen von Coin-Inhabern kontrollierten Fonds, der mit Mitteln aus der Lockbox ausgestattet wird.
</details>

### Ressourcen

[ZIP 253: Einführung des NU6 Network Upgrade](https://zips.z.cash/zip-0253)

[ZIP 236: Blöcke sollten exakt ausgeglichen sein](https://zips.z.cash/zip-0236)

[ZIP 1015: Aufteilung der Blocksubvention für nicht-direkte Entwicklungsfinanzierung](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox Funding Streams](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### Siehe auch

[Zcash-Netzwerk-Upgrades](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash-Geldpolitik](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Was sind ZEC und Zcash](../start-here/what-is-zec-and-zcash)

---

Serie: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige: [NU5](../zcash-tech/nu5) · Nächste: [NU6.1](../zcash-tech/nu6-1)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy ging auf dem Zcash-Mainnet bei Block 1.046.400 live (18. November 2020 UTC).

Was du mitnimmst: wie Zcash seine eigene Weiterentwicklung weiter finanzierte, nachdem die founders reward auslief, und wie Canopy die Finanzierungsaufteilung festlegte, auf der spätere Upgrades weiterhin aufbauen.

Canopy ist das fünfte Netzwerk-Upgrade von Zcash und wird auch als Network Upgrade 4 (NU4) bezeichnet. Es wird durch [ZIP 251](https://zips.z.cash/zip-0251) eingeführt und wurde auf dem Mainnet bei Block 1.046.400 am 18. November 2020 (UTC) aktiviert, genau im selben Moment wie die erste Halbierung der Blockbelohnung von Zcash. Canopy war vor allem ein Governance- und monetäres Upgrade. Es beendete die ursprüngliche founders reward und führte den neuen Zcash Development Fund ein, der die Electric Coin Company, die Zcash Foundation und unabhängige Zuschussempfänger bezahlt. Die Regelung hinter diesem Fonds entstand aus einem längeren Community-Governance-Prozess im Jahr 2019.

Warum das wichtig ist. Zcash finanziert seine eigene Weiterentwicklung aus den Blockbelohnungen, weil kein Unternehmen dahintersteht. Die founders reward, die die ersten Jahre finanzierte, sollte bei der ersten Halbierung enden. Canopy war der Ersatz: Es leitete einen festen Anteil jeder Blockbelohnung in einen Development Fund um und legte fest, wer ihn erhält. Dieses Modell wurde durch spätere Upgrades weiter verfeinert, bis hin zu [NU6.1](../zcash-tech/nu6-1).

![Vor Canopy finanzierte die founders reward die Weiterentwicklung und sollte bei der ersten Halbierung enden. Nach Canopy erhält der Development Fund 20 Prozent jeder Blockbelohnung und läuft bis zur zweiten Halbierung im Jahr 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## Der Development Fund

Canopy beendete die ursprüngliche founders reward und ersetzte sie durch den Zcash Development Fund. Die Änderung trat beim selben Block in Kraft wie die erste Halbierung von Zcash, als die Blockbelohnung von 6,25 ZEC auf 3,125 ZEC sank. Für Miner bedeutete das, dass ihre Belohnung am selben Tag halbiert wurde, an dem ein neuer Anteil dieser kleineren Belohnung in die Weiterentwicklung zu fließen begann.

Der Fonds sollte vier Jahre laufen, von dieser ersten Halbierung im November 2020 bis zur zweiten Halbierung im Jahr 2024. Die vereinbarte Regelung wurde als [ZIP 1014](https://zips.z.cash/zip-1014) festgehalten. Der Konsensmechanismus, der das Geld tatsächlich bewegt, ist der Funding-Stream-Mechanismus: [ZIP 207](https://zips.z.cash/zip-0207) führte die allgemeine Methode ein, einen Teil der Blocksubvention an festgelegte Empfänger zu leiten, und [ZIP 214](https://zips.z.cash/zip-0214) legte die konkreten Regeln und Empfängeradressen für den Development Fund fest.

## Wie das Geld aufgeteilt wird

Der Development Fund erhält 20 Prozent jeder Blockbelohnung. Miner behalten die anderen 80 Prozent. Diese 20 Prozent werden dann gemäß ZIP 1014 auf drei Wege aufgeteilt.

1. 35 Prozent an das Bootstrap Project, die Mutterorganisation der Electric Coin Company.
2. 25 Prozent an die Zcash Foundation.
3. 40 Prozent an Major Grants, das unabhängige Arbeit finanziert und von der Zcash Foundation verwaltet wird. Major Grants wurde später zu Zcash Community Grants (ZCG).

Gemessen an der gesamten Blockbelohnung statt nur am Fonds ergeben diese Anteile 7 Prozent für die Electric Coin Company, 5 Prozent für die Zcash Foundation und 8 Prozent für Major Grants. Beide Beschreibungen meinen dieselben Zahlen.

![Der Development Fund beträgt 20 Prozent jeder Blockbelohnung, aufgeteilt in 35 Prozent für Bootstrap und die Electric Coin Company, 25 Prozent für die Zcash Foundation und 40 Prozent für Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Die Änderung am Sprout-Pool

Canopy begann außerdem mit der Ausmusterung des ältesten abgeschirmten Pools. Sprout war der erste abgeschirmte Pool von Zcash, und Canopy begann über [ZIP 211](https://zips.z.cash/zip-0211) damit, ihn schrittweise abzuwickeln.

Ab dem Moment der Canopy-Aktivierung kann dem Sprout-Pool kein neuer Wert mehr hinzugefügt werden. Technisch ausgedrückt muss das Feld vpub_old jedes JoinSplit null sein. Gelder, die sich bereits in Sprout befinden, können weiterhin abgehoben werden, sodass niemand ausgesperrt wird, aber der Pool kann von hier an nur noch kleiner werden. Das ist ein erster Schritt hin zur späteren Einstellung des alten Sprout-Pools zugunsten neuerer abgeschirmter Pools.

![Vor Canopy konnte Wert sowohl in den Sprout-Pool hinein- als auch aus ihm herausfließen. Nach Canopy kann kein neuer Wert mehr hinein, aber Abhebungen sind weiterhin erlaubt](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Die technischen Extras

Neben den Änderungen an der Finanzierung enthielt Canopy zwei kleinere technische ZIPs. [ZIP 212](https://zips.z.cash/zip-0212) änderte, wie ein Empfänger das temporäre Sapling-Geheimnis ableitet, indem es aus dem Note-Klartext abgeleitet wird. [ZIP 215](https://zips.z.cash/zip-0215) formulierte explizite Regeln zur Validierung von Ed25519-Signaturen, damit jeder Knoten genau darin übereinstimmt, welche Signaturen als gültig zählen.

## Kurz zusammengefasst

- Canopy (NU4) wurde bei Mainnet-Block 1.046.400 (18. November 2020 UTC) aktiviert – im selben Block wie die erste Halbierung von Zcash, die die Blockbelohnung von 6,25 auf 3,125 ZEC senkte.
- Es beendete den Founders Reward und schuf den Zcash Development Fund: 20 % jeder Blockbelohnung für vier Jahre, bis zur zweiten Halbierung im Jahr 2024 (Richtlinie gemäß ZIP 1014; Mechanismus gemäß ZIP 207/214).
- Die 20 % des Fonds werden aufgeteilt: 35 % an Bootstrap (Electric Coin Company), 25 % an die Zcash Foundation und 40 % an Major Grants – später bekannt als Zcash Community Grants.
- Es schloss den Sprout-Pool für neue Werte (ZIP 211): Neue Einzahlungen sind nicht mehr möglich, Abhebungen funktionieren jedoch weiterhin.
- Zwei technische ZIPs wurden mit eingeführt: ZIP 212 (Sapling-ephemeres Geheimnis, abgeleitet aus dem Klartext der Note) und ZIP 215 (explizite Validierungsregeln für Ed25519).

## Kernerklärung

Zcash finanziert seine eigene Weiterentwicklung aus Block-Rewards, weil kein Unternehmen dahintersteht. Der Founders Reward deckte die ersten Jahre ab und sollte mit dem ersten Halving enden, daher musste vor diesem Termin ein Ersatz bereitstehen. Canopy war dieser Ersatz: ZIP 207 führte den allgemeinen Funding-Stream-Mechanismus ein, der einen Teil der Block-Subvention an festgelegte Empfängeradressen leitet, und ZIP 214 legte die konkreten Regeln und Adressen für den Development Fund fest. Gemessen an der gesamten Belohnung statt nur am Fonds betragen die Anteile 7 % ECC, 5 % Zcash Foundation und 8 % Major Grants – dieselben Zahlen, nur auf zwei Arten beschrieben.

Canopy begann außerdem damit, Sprout, den ältesten Shielded Pool von Zcash, stillzulegen: Ab der Aktivierung muss das Feld vpub_old jeder JoinSplit null sein, sodass Werte Sprout zwar verlassen, aber nie wieder hineingelangen können.

## Visuelle Analogie

Canopy ist der Moment, in dem die Gründergehalt-Phase eines Startups endet und eine Verfassung übernimmt: Ab diesem Block werden 20 Cent von jedem Dollar, den das Netzwerk prägt, für die Instandhaltung zweckgebunden und im Verhältnis 35/25/40 auf drei Abteilungen aufgeteilt. Gleichzeitig wird das alte Lagerhaus (Sprout) für neue Einlagerungen versiegelt: Jeder kann seine Waren weiterhin abholen, aber nichts Neues kommt mehr hinein.

## Ausführlich

Der Funding Stream wird per Konsens durchgesetzt, nicht durch Vertrauen: Knoten lehnen Blöcke ab, deren Coinbase-Transaktion den festgelegten Empfängern nicht ihre festgelegten Anteile auszahlt. Canopy fiel bewusst auf den Halving-Block, sodass die Miner die Halbierung der Belohnung genau in dem Moment erlebten, in dem ein neuer Anteil dieser kleineren Belohnung in die Entwicklung zu fließen begann. ZIP 212 änderte, wie das ephemere Geheimnis von Sapling abgeleitet wird (aus dem Klartext der Note), und ZIP 215 legte explizite Ed25519-Akzeptanzregeln fest, damit jeder Knoten Signaturen identisch validiert. Diese kleinen Änderungen beseitigten ganze Klassen von Konsens-Mehrdeutigkeiten.

## Häufige Fehler

- **Zu glauben, Canopy sei die Halbierung selbst.** Beide hatten denselben Aktivierungsblock, sind aber getrennte Änderungen: ZIP 251 (Canopy) gegenüber dem Emissionsplan.
- **Die 20 % so zu verstehen, als würden sie vom neuen Anteil der Miner abgezogen.** Die Miner behielten 80 %; der Fonds erhält 20 % der Blockbelohnung.
- **Anzunehmen, Sprout-Gelder seien eingefroren oder vernichtet worden.** Abhebungen sind weiterhin möglich – nur neue Einzahlungen wurden gestoppt.
- **„35/25/40 des Fonds“ und „7/5/8 der Belohnung“ als unterschiedliche Aufteilungen zu behandeln.** Es sind dieselben Zahlen, nur auf unterschiedliche Bezugsgrößen bezogen.
- **Canopy als Kryptografie-Upgrade zu bezeichnen.** Es ging hauptsächlich um Governance und Geldpolitik; die technischen ZIPs waren kleinere Anpassungen.

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| Founders reward | Das ursprüngliche Finanzierungsmodell, das die frühe Weiterentwicklung von Zcash bezahlte und planmäßig bei der ersten Halbierung enden sollte |
| Development Fund | Der 20-Prozent-Anteil jeder Blockbelohnung, den Canopy in die Weiterentwicklung umleitete und der bis zur zweiten Halbierung lief |
| Block reward (subsidy) | Die neuen ZEC, die erzeugt und ausgezahlt werden, wenn jeder Block gemint wird |
| Halving | Das geplante Ereignis, bei dem die Blockbelohnung halbiert wird |
| Funding stream | Der Konsensmechanismus (ZIP 207), der einen Teil der Blocksubvention an festgelegte Empfängeradressen leitet |
| Sprout pool | Der ursprüngliche abgeschirmte Pool von Zcash, in den Canopy keine neuen Werte mehr hineinließ |

## FAQ

Ändert Canopy meine ZEC oder meine Privatsphäre? Nein. Bei Canopy geht es darum, wie die Weiterentwicklung finanziert wird, plus um einige technische Regeln. Deine Guthaben und deine abgeschirmten Transaktionen bleiben davon unberührt.

Hat Canopy die Blockbelohnung gekürzt? Canopy wurde beim selben Block aktiviert wie die erste Halbierung von Zcash, die die Belohnung von 6,25 ZEC auf 3,125 ZEC senkte. Die Halbierung ist Teil der Geldpolitik von Zcash. Die Aufgabe von Canopy war es zu entscheiden, wie ein Anteil dieser kleineren Belohnung verwendet wird.

Wofür ist der Development Fund da? Er finanziert die Menschen, die Zcash entwickeln. Das Geld geht an die Electric Coin Company (über das Bootstrap Project), die Zcash Foundation und an Major Grants, das unabhängige Arbeit unterstützt.

Kann ich Gelder im Sprout-Pool noch verwenden? Ja. Du kannst Gelder, die sich bereits in Sprout befinden, weiterhin abheben. Du kannst nach Canopy nur keinen neuen Wert mehr hineingeben.

Ist der Development Fund dauerhaft? Nein. Er war auf vier Jahre angesetzt, von der ersten Halbierung im November 2020 bis zur zweiten Halbierung im Jahr 2024, sodass die Community Zeit hatte zu sehen, wie er funktioniert, bevor sie ihn erneut überprüft.

Wie hängt Canopy mit NU6 und NU6.1 zusammen? Canopy richtete die dreigeteilte Finanzierungsaufteilung und den Funding-Stream-Mechanismus ein. Spätere Upgrades, darunter NU6 und NU6.1, griffen den Development Fund auf dieser Grundlage erneut auf und gestalteten ihn um.

## Teste dein Verständnis

Canopy wurde genau beim selben Block aktiviert wie die erste Halbierung von Zcash. Warum wurde dieser Zeitpunkt gewählt, und was wäre ohne Canopy mit der Finanzierung der Weiterentwicklung passiert?

<details>
<summary>Antwort</summary>

Die ursprüngliche founders reward sollte bei der ersten Halbierung enden. Ohne Canopy wäre die gesamte kleinere Blockbelohnung nach der Halbierung an die Miner gegangen, und es hätte keine Finanzierung der Weiterentwicklung mehr auf Protokollebene gegeben. Canopy ersetzte die founders reward genau bei diesem Block durch den Development Fund, sodass die Finanzierung ohne Unterbrechung weiterlief.
</details>

### Ressourcen

[ZIP 251: Einführung des Canopy Network Upgrade](https://zips.z.cash/zip-0251)

[ZIP 1014: Einrichtung eines Dev Fund für ECC, ZF und Major Grants](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Konsensregeln für einen Zcash Development Fund](https://zips.z.cash/zip-0214)

[ZIP 211: Deaktivierung des Hinzufügens neuer Werte zum Sprout Chain Value Pool](https://zips.z.cash/zip-0211)

[Canopy Network Upgrade](https://z.cash/upgrade/canopy/)

### Siehe auch

[Zcash Netzwerk-Upgrades](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Geldpolitik von Zcash](../start-here/zcash-monetary-policy)

[Abgeschirmte Pools](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash Governance](../zcash-community/zcash-governance)

---

## Verwandte Seiten

- [Sprout](./Sprout.md) – der Pool, den Canopy für neue Einzahlungen geschlossen hat
- [Heartwood](./Heartwood.md) – das vorherige Upgrade der Reihe
- [NU5](./NU5.md) – das nächste Upgrade, das Orchard eingeführt hat
- [NU6.1](./NU6_1.md) – die jüngste Anpassung der Entwicklungsfinanzierung

Serie: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige: [Heartwood](../zcash-tech/heartwood) · Nächste: [NU5](../zcash-tech/nu5)

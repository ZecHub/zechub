---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy ging auf dem Zcash-Mainnet bei Block 1.046.400 live (18. November 2020 UTC).

Was du mitnimmst: wie Zcash seine eigene Weiterentwicklung weiter finanzierte, nachdem die founders reward auslief, und wie Canopy die Finanzierungsaufteilung festlegte, auf der spätere Upgrades weiterhin aufbauen.

Canopy ist das fünfte Netzwerk-Upgrade von Zcash und wird auch als Network Upgrade 4 (NU4) bezeichnet. Es wird durch [ZIP 251](https://zips.z.cash/zip-0251) eingeführt und wurde auf dem Mainnet bei Block 1.046.400 am 18. November 2020 (UTC) aktiviert, genau im selben Moment wie die erste Halbierung der Blockbelohnung von Zcash. Canopy war vor allem ein Governance- und monetäres Upgrade. Es beendete die ursprüngliche founders reward und führte den neuen Zcash Development Fund ein, der die Electric Coin Company, die Zcash Foundation und unabhängige Zuschussempfänger bezahlt. Die Regelung hinter diesem Fonds entstand aus einem längeren Community-Governance-Prozess im Jahr 2019.

Warum das wichtig ist. Zcash finanziert seine eigene Weiterentwicklung aus den Blockbelohnungen, weil kein Unternehmen dahintersteht. Die founders reward, die die ersten Jahre finanzierte, sollte bei der ersten Halbierung enden. Canopy war der Ersatz: Es leitete einen festen Anteil jeder Blockbelohnung in einen Development Fund um und legte fest, wer ihn erhält. Dieses Modell wurde durch spätere Upgrades weiter verfeinert, bis hin zu [NU6.1](../zcash-tech/nu6-1).

![Vor Canopy finanzierte die founders reward die Weiterentwicklung und sollte bei der ersten Halbierung enden. Nach Canopy erhält der Development Fund 20 Prozent jeder Blockbelohnung und läuft bis zur zweiten Halbierung im Jahr 2024](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Der Development Fund

Canopy beendete die ursprüngliche founders reward und ersetzte sie durch den Zcash Development Fund. Die Änderung trat beim selben Block in Kraft wie die erste Halbierung von Zcash, als die Blockbelohnung von 6,25 ZEC auf 3,125 ZEC sank. Für Miner bedeutete das, dass ihre Belohnung am selben Tag halbiert wurde, an dem ein neuer Anteil dieser kleineren Belohnung in die Weiterentwicklung zu fließen begann.

Der Fonds sollte vier Jahre laufen, von dieser ersten Halbierung im November 2020 bis zur zweiten Halbierung im Jahr 2024. Die vereinbarte Regelung wurde als [ZIP 1014](https://zips.z.cash/zip-1014) festgehalten. Der Konsensmechanismus, der das Geld tatsächlich bewegt, ist der Funding-Stream-Mechanismus: [ZIP 207](https://zips.z.cash/zip-0207) führte die allgemeine Methode ein, einen Teil der Blocksubvention an festgelegte Empfänger zu leiten, und [ZIP 214](https://zips.z.cash/zip-0214) legte die konkreten Regeln und Empfängeradressen für den Development Fund fest.

## Wie das Geld aufgeteilt wird

Der Development Fund erhält 20 Prozent jeder Blockbelohnung. Miner behalten die anderen 80 Prozent. Diese 20 Prozent werden dann gemäß ZIP 1014 auf drei Wege aufgeteilt.

1. 35 Prozent an das Bootstrap Project, die Mutterorganisation der Electric Coin Company.
2. 25 Prozent an die Zcash Foundation.
3. 40 Prozent an Major Grants, das unabhängige Arbeit finanziert und von der Zcash Foundation verwaltet wird. Major Grants wurde später zu Zcash Community Grants (ZCG).

Gemessen an der gesamten Blockbelohnung statt nur am Fonds ergeben diese Anteile 7 Prozent für die Electric Coin Company, 5 Prozent für die Zcash Foundation und 8 Prozent für Major Grants. Beide Beschreibungen meinen dieselben Zahlen.

![Der Development Fund beträgt 20 Prozent jeder Blockbelohnung, aufgeteilt in 35 Prozent für Bootstrap und die Electric Coin Company, 25 Prozent für die Zcash Foundation und 40 Prozent für Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Die Änderung am Sprout-Pool

Canopy begann außerdem mit der Ausmusterung des ältesten abgeschirmten Pools. Sprout war der erste abgeschirmte Pool von Zcash, und Canopy begann über [ZIP 211](https://zips.z.cash/zip-0211) damit, ihn schrittweise abzuwickeln.

Ab dem Moment der Canopy-Aktivierung kann dem Sprout-Pool kein neuer Wert mehr hinzugefügt werden. Technisch ausgedrückt muss das Feld vpub_old jedes JoinSplit null sein. Gelder, die sich bereits in Sprout befinden, können weiterhin abgehoben werden, sodass niemand ausgesperrt wird, aber der Pool kann von hier an nur noch kleiner werden. Das ist ein erster Schritt hin zur späteren Einstellung des alten Sprout-Pools zugunsten neuerer abgeschirmter Pools.

![Vor Canopy konnte Wert sowohl in den Sprout-Pool hinein- als auch aus ihm herausfließen. Nach Canopy kann kein neuer Wert mehr hinein, aber Abhebungen sind weiterhin erlaubt](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Die technischen Extras

Neben den Änderungen an der Finanzierung enthielt Canopy zwei kleinere technische ZIPs. [ZIP 212](https://zips.z.cash/zip-0212) änderte, wie ein Empfänger das temporäre Sapling-Geheimnis ableitet, indem es aus dem Note-Klartext abgeleitet wird. [ZIP 215](https://zips.z.cash/zip-0215) formulierte explizite Regeln zur Validierung von Ed25519-Signaturen, damit jeder Knoten genau darin übereinstimmt, welche Signaturen als gültig zählen.

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

Serie: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige: [Heartwood](../zcash-tech/heartwood) · Nächste: [NU5](../zcash-tech/nu5)

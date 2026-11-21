<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7

> NU7 wurde am 6. November 2026 um 02:34 UTC (am Abend des 5. November in US-Zeitzonen) im Zcash-Mainnet bei Block 3,543,405 aktiviert und ist seitdem in Betrieb.

Das lernst du hier: was sich durch NU7 geändert hat (schnellere Blöcke, Limits für abgeschirmte Aktionen, Gebührenrückführung, das Ende von Transaktionen der Version 4), was unverändert blieb und was Betreiber von Knoten, Wallets, Börsen und Miner tun mussten.

NU7 ist ein Zcash [Netzwerk-Upgrade](../start-here/network-upgrades), das mit [ZIP 259](https://zips.z.cash/zip-0259) eingeführt wurde. Es verkürzte den Abstand zwischen Blöcken von 75 auf 25 Sekunden, begrenzte die Anzahl abgeschirmter Aktionen pro Block, begann damit, 60 % der Transaktionsgebühren aus dem Umlauf zu nehmen, damit sie später an zukünftige Miner neu ausgegeben werden können, und erklärte Transaktionen der Version 4 für ungültig. Dadurch wurde der alte Sprout-Pool stillgelegt. Ein neues Transaktionsformat wurde nicht eingeführt. Die Branch-ID des Konsenses lautet `0x77190ad9`.

Warum das wichtig ist: Vor NU7 wartete man durchschnittlich 75 Sekunden auf eine erste Bestätigung – zu lange für eine Ladenkasse, eine Börseneinzahlung oder einen Cross-Chain-Swap. NU7 verkürzte diese Zeit auf etwa 25 Sekunden, ohne mehr ZEC auszugeben: Die Belohnung pro Block wurde auf ein Drittel gesenkt, sodass die tägliche Ausgabe gleich blieb. Außerdem ist es das erste Upgrade mit einem Mechanismus, der die Netzwerksicherheit finanzieren soll, wenn die Blockbelohnungen sinken.

Neu bei Zcash? Beginne mit [Was sind ZEC und Zcash](../start-here/what-is-zec-and-zcash) und [abgeschirmte Pools](../using-zcash/shielded-pools) und kehre dann hierher zurück.

## Kurzfassung

Einfach gesagt: Blöcke kommen jetzt alle 25 Sekunden, die Menge neu ausgegebener ZEC pro Tag bleibt gleich, ein Teil jeder Gebühr wird für zukünftige Miner zurückgelegt und der alte Sprout-Pool ist geschlossen.

- **25-Sekunden-Blöcke** ([ZIP 218](https://zips.z.cash/zip-0218)): Die erste Bestätigung erfolgt nach etwa 25 statt 75 Sekunden. Die Blocksubvention sank von 1.5625 auf 0.52083333 ZEC, sodass weiterhin etwa 1.800 ZEC pro Tag ausgegeben werden.
- **Limits für abgeschirmte Aktionen** (ZIP 218): Höchstens 330 abgeschirmte Aktionen pro Block über alle Pools hinweg, mit Limits pro Pool. So bleiben die Validierungskosten im ungünstigsten Fall und die Kosten für die Wallet-Synchronisierung unter dem bisherigen Niveau.
- **Mechanismus zur Netzwerknachhaltigkeit** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60 % der Transaktionsgebühren jedes Blocks verlassen den Umlauf und werden später erneut an Miner ausgegeben, ab Block 8,939,664 (voraussichtlich etwa im Februar 2031). Die Obergrenze von 21 Millionen bleibt unverändert.
- **Transaktionen der Version 4 sind ungültig** ([ZIP 2003](https://zips.z.cash/zip-2003)): Wallets müssen Transaktionen der Version 5 oder 6 erstellen. Sprout kann nur mit Version 4 ausgegeben werden. Daher sind Guthaben, die noch in Sprout liegen, jetzt eingefroren.
- **Software**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) und neuere Versionen folgen NU7. Es gibt keine `zcashd`-Version mit NU7-Unterstützung.

## Anschaulicher Vergleich

Stell dir die Chain als Zugstrecke vor. Vor NU7 fuhr alle 75 Sekunden ein Zug ab, der so viele Fahrgäste mitnehmen konnte, wie in 2 MB passten. NU7 lässt alle 25 Sekunden einen Zug fahren, bezahlt jeden Fahrer mit einem Drittel des bisherigen Fahrgelds, sodass die Tagessumme gleich bleibt, und begrenzt die Zahl der schwersten Fahrgäste (abgeschirmte Aktionen), die in einen Zug einsteigen dürfen. So kann die Kontrolle eines einzelnen Zuges nicht zu lange dauern.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Was sich durch NU7 geändert hat

### 25 Sekunden Zielabstand zwischen Blöcken (ZIP 218)

- Die Schwierigkeitsanpassung zielt nun auf einen Block alle **25 Sekunden** statt alle 75 Sekunden ab. Dadurch kommen dreimal so häufig neue Blöcke hinzu.
- Die Blocksubvention wurde durch drei geteilt: **0.52083333 ZEC** pro Block in der aktuellen Halbierungsperiode (zuvor waren es 1.5625 ZEC). Die tägliche Ausgabe bleibt bei etwa 1.800 ZEC (3.456 statt 1.152 Blöcke pro Tag).
- Halbierungen finden weiterhin alle vier Jahre statt. Da die Blöcke schneller kommen, wurde die nächste Halbierung auf Block **6,132,390** vorverlegt. Bei einem Abstand von 25 Sekunden wird sie voraussichtlich Ende November 2028 stattfinden (ZIP 259).
- Das Zeitfenster für die Schwierigkeitsanpassung wurde von 17 auf **102 Blöcke** vergrößert. Dadurch wird weiterhin ein ähnlich langer Zeitraum betrachtet.
- Der Standardablauf für Transaktionen wurde von 40 auf **120 Blöcke** verlängert. Damit beträgt er weiterhin etwa 50 Minuten.

### Limits für abgeschirmte Aktionen (ZIP 218)

Jeder Block hat jetzt ein gemeinsames Budget und Limits für die einzelnen Pools:

| Limit | Pro Block |
|---|---|
| Alle abgeschirmten Aktionen über alle Pools hinweg | 330 |
| Orchard-Aktionen | 330 |
| Ironwood-Aktionen | 330 |
| Sapling-Eingaben + -Ausgaben | 300 |
| Sprout JoinSplits | nicht zulässig |

Vor NU7 konnte ein voller 2-MB-Block etwa 617 Orchard- oder Ironwood-Aktionen oder etwa 2.107 Sapling-Ausgaben enthalten, ohne Limits pro Pool. ZIP 218 legt die neuen Limits so fest, dass der ungünstigste Fall für Knoten und Wallet-Synchronisierungen selbst bei dreimal so vielen Blöcken besser ist als zuvor (zum Beispiel sinkt die Bandbreite für abgeschirmte Synchronisierungen von Light-Clients von etwa 271 auf 169 MB pro Tag). Gleichzeitig verdoppelt sich der Durchsatz des Orchard-Protokolls mehr als (bei Transaktionen mit 2 Aktionen von etwa 2,9 auf 6,6 Transaktionen pro Sekunde).

### Mechanismus zur Netzwerknachhaltigkeit (ZIP 235 + ZIP 237)

- **Gebührenentnahme (ZIP 235):** 60 % der Transaktionsgebühren jedes Blocks werden aus dem Umlauf genommen; die übrigen 40 % gehen wie bisher an den Miner. Anders als bei einem Burn werden die entnommenen ZEC nachverfolgt, damit sie später erneut ausgegeben werden können.
- **Neuausgabe (ZIP 237):** Die entnommenen ZEC werden in einem öffentlichen Konsenszustand gespeichert, der als NSM-Wertsaldo bezeichnet wird. Er wurde bei NU7 mit Werten aufgefüllt, die Miner in der Vergangenheit nicht beansprucht hatten. Ab Block **8,939,664** (voraussichtlich etwa im Februar 2031) wird pro Block zusätzlich zum regulären Halbierungsplan ein festgelegter Anteil dieses Saldos ausgegeben.
- Die Obergrenze des Gesamtangebots steigt nicht. Wenn der Saldo null erreicht, entspricht die Ausgabe genau dem bisherigen Halbierungsplan.
- NU7 führte **nicht** [ZIP 233](https://zips.z.cash/zip-0233) ein (freiwillige Entnahme durch Nutzer) oder [ZIP 234](https://zips.z.cash/zip-0234) (Ersetzen der Halbierungen durch eine glatte Kurve). In einer Umfrage unter Coinholdern wurde in ZIP 237 das Design gewählt, bei dem die Halbierungen erhalten bleiben.
- Die Zahlen (der Startwert von 368.58 ZEC, der Neuausgabeanteil pro Block und der Grund für den Start bei Block 8,939,664) stehen auf der Seite [Mechanismus zur Netzwerknachhaltigkeit](./Network_Sustainability_Mechanism.md).

### Transaktionen der Version 4 nicht mehr zulässig (ZIP 2003)

- Ab NU7 ist jede Transaktion der Version 4 ungültig: nicht nur Sprout-Überweisungen, sondern auch transparente Transaktionen und Sapling-Transaktionen im Format von Version 4. Transaktionen der Version 5 (NU5) und Version 6 ([Ironwood](../zcash-tech/ironwood)) bleiben unverändert.
- Sprout-Überweisungen gibt es nur im Format der Version 4. Daher kann der [Sprout](../zcash-tech/sprout)-Pool nicht mehr ausgegeben werden. Siehe [Guthaben wiederherstellen](../using-zcash/recovering-funds).

### Weitere kleinere Änderungen

- Überarbeitungen der Regeln zum Entwicklungsfonds, damit die Finanzierungsströme mit 25-Sekunden-Blöcken funktionieren ([ZIP 207](https://zips.z.cash/zip-0207) Revision 2, [ZIP 214](https://zips.z.cash/zip-0214) Revision 3) sowie eine Aktualisierung der Adressliste für Finanzierungsströme ([ZIP 2008](https://zips.z.cash/zip-2008)).
- NU7-Knoten melden im Mainnet die Netzwerkprotokollversion **170190** und trennen nach der Aktivierung die Verbindung zu älteren Peers.

## Was NU7 nicht getan hat

- **Kein neues Transaktionsformat.** NU7 vermied bewusst eine weitere Migration für Wallets und Parser, direkt nachdem Ironwood Transaktionen der Version 6 eingeführt hatte.
- **Keine Änderung der Obergrenze des Gesamtangebots oder des vierjährigen Halbierungsrhythmus.**
- **Keine Änderung der Coinbase-Reifezeit.** Geschürfte Coins benötigen weiterhin 100 Blöcke, bevor sie ausgegeben werden können (jetzt etwa 42 statt etwa 120 Minuten).
- **Kein neuer abgeschirmter Pool.** Ironwood (NU6.3) bleibt der neueste Pool; Orchard kann weiterhin nur ausgegeben werden, wie schon seit Ironwood.

## Was die einzelnen Gruppen tun mussten

- **Betreiber von Knoten:** [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) oder neuer ausführen. Zebra 7 verschiebt die Datenbank beim ersten Start von Format v28 auf v29. Zebra 6.x kann v29 nicht lesen. Deshalb solltest du vor dem Upgrade `state/v28` sichern. Für `zcashd` gibt es keine NU7-Version (die neueste Version ist 6.20.0 vom Juni 2026). Der Migrationsleitfaden für die [zcashd-API im Zebra-Handbuch](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) ordnet jeden `zcashd`-RPC Zebra, [Zallet](../zcash-tech/zallet) oder einem Ersatz zu. Siehe [Full Nodes](../zcash-tech/full-nodes) und den Leitfaden für [gehärtete Zebra](../guides/hardened-zebrad).
- **Wallets:** Keine Transaktionen der Version 4 mehr erstellen, den Standardablauf von 120 Blöcken verwenden, die Ankertiefe von 3 Blöcken beibehalten (jetzt etwa 1,25 Minuten) und die Aktionslimits pro Block einhalten. Eine Transaktion, die für sich genommen ein Limit überschreitet, kann niemals geschürft werden.
- **Börsen und Zahlungsdienste:** Eine Bestätigung dauert nun 25 Sekunden. Bei gleich vielen Bestätigungen wird also nur noch ein Drittel der Zeit abgedeckt. Prüfe die Anzahl der Bestätigungen für Einzahlungen anhand der gewünschten Zeitspanne und Sicherheit, statt aus Gewohnheit die alte Anzahl beizubehalten.
- **Miner und Pools:** Mining-Software und Vorlagen müssen die neue Subvention, die Gebührenaufteilung und die Aktionslimits berücksichtigen. Blöcke nach den alten Regeln werden abgelehnt.

## Häufige Missverständnisse

- **„Mein alter Knoten läuft noch, also ist alles in Ordnung.“** Nur für NU7 setzte ZIP 259 die übliche Regel außer Kraft, nach der Software vor dem Upgrade sich vor der Aktivierung selbst herunterfährt. Ein Zebra der Version 6.x oder ein `zcashd`-Knoten kann nach den alten Regeln online bleiben und unbemerkt von der echten Chain abweichen. Prüfe, ob dein Knoten eine Höhe über 3,543,405 meldet und mit einem Blockexplorer übereinstimmt.
- **„Schnellere Blöcke bedeuten, dass mehr ZEC ausgegeben wird.“** Nein. Die Subvention pro Block sank auf ein Drittel, daher bleibt die tägliche Ausgabe unverändert.
- **„60 % der Gebühren werden für immer verbrannt.“** Nein. Sie werden aus dem Umlauf genommen und später vom NSM erneut an Miner ausgegeben. Die Obergrenze des Gesamtangebots bleibt gleich.
- **„Nur Sprout-Nutzer sind von der Änderung an Version 4 betroffen.“** Jede Wallet und jedes Skript, die noch Transaktionen der Version 4 erstellten, funktionierten nicht mehr – auch bei ausschließlich transparenten Transaktionen und Sapling-Transaktionen. Noch ausstehende Transaktionen der Version 4 wurden bei der Aktivierung ungültig. Erneutes Signieren allein macht sie nicht gültig.
- **„Einstellungen, die in Blöcken gemessen werden, gelten weiterhin.“** Alles, was in Blöcken gemessen wird (Bestätigungen, Ablauf, Sperrzeiten, Zeitüberschreitungen), vergeht jetzt in Echtzeit dreimal so schnell.

## Glossar

| Begriff | Bedeutung in einfachen Worten |
|---|---|
| Block target spacing | Die durchschnittliche Zeit zwischen Blöcken, auf die die Schwierigkeitsanpassung abzielt: 25 Sekunden seit NU7 |
| Block subsidy | Die neuen ZEC, die in jedem Block entstehen und zwischen dem Miner und den Finanzierungsströmen des Entwicklungsfonds aufgeteilt werden |
| Shielded action | Eine Einheit abgeschirmter Arbeit in einer Transaktion (eine Orchard- oder Ironwood-Aktion oder eine Sapling-Eingabe bzw. -Ausgabe) |
| Network Sustainability Mechanism (NSM) | Die Regeln, nach denen ein Teil der Gebühren aus dem Umlauf genommen und später an zukünftige Miner ausgegeben wird |
| NSM Value Balance | Die öffentliche laufende Summe der ZEC, die aus dem Umlauf genommen wurden und auf ihre Neuausgabe warten |
| Version 4 transaction | Das Transaktionsformat aus Sapling, das durch NU7 ungültig wurde; Version 5 und 6 bleiben gültig |
| Consensus branch ID | Die Kennung für eine Gruppe von Konsensregeln. Signaturen werden daran gebunden, sodass eine für alte Regeln signierte Transaktion unter neuen Regeln ungültig ist |

## FAQ

**Wann wurde NU7 aktiviert?** Im Mainnet bei Block 3,543,405 am 6. November 2026 um 02:34 UTC. Das Testnet wurde früher aktiviert, bei Block 4,465,026 am 4. Oktober 2026.

**Hat sich die Blockbelohnung geändert?** Pro Block: ja, 0.52083333 ZEC statt 1.5625 ZEC. Pro Tag: nein, in beiden Fällen etwa 1.800 ZEC.

**Ist mein Sprout ZEC weg?** Es kann nicht mehr bewegt werden, weil Ausgaben aus Sprout Transaktionen der Version 4 benötigen und diese nun ungültig sind. Unter [Guthaben wiederherstellen](../using-zcash/recovering-funds) erfährst du, was das in der Praxis bedeutet.

**Brauche ich eine neue Wallet?** Du benötigst eine Wallet-Version, die NU7 unterstützt. Die Seite [Wallets](../using-zcash/wallets) von ZecHub zeigt, welche Wallets mit NU7 kompatibel sind.

**Wann beginnt die Neuausgabe der Gebühren?** Bei Block 8,939,664 im Mainnet, voraussichtlich etwa im Februar 2031, wenn die Blöcke durchschnittlich alle 25 Sekunden kommen.

**Warum hat NU7 ein neues Transaktionsformat ausgelassen?** Damit Wallets und Parser nicht direkt nach dem Format der Version 6 von Ironwood ein zweites Mal migriert werden müssen. Außerdem wird die Gebührenaufteilung pro Block berechnet, sodass kein neues Transaktionsfeld nötig war.

## Teste dein Wissen

1. Warum bleibt die tägliche Ausgabe von ZEC nach NU7 gleich?
2. Was geschieht mit den 60 % der Gebühren, die aus dem Umlauf genommen werden?
3. Warum können Sprout-Guthaben nach NU7 nicht mehr ausgegeben werden?
4. Warum ist ein Knoten, der nie aktualisiert wurde, bei diesem Upgrade besonders riskant?

Antworten: (1) Die Subvention pro Block wurde auf ein Drittel gesenkt, während dreimal so häufig neue Blöcke hinzukommen; (2) sie fließen in den NSM-Wertsaldo und werden ab Block 8,939,664 erneut an Miner ausgegeben; (3) Ausgaben aus Sprout gibt es nur im Format der Version 4, das NU7 für ungültig erklärt hat; (4) ZIP 259 setzte die automatische Abschaltung außer Kraft. Deshalb kann ein alter Knoten auf der falschen Chain weiterlaufen.

### Ressourcen

[ZIP 259: Einführung des NU7-Netzwerk-Upgrades](https://zips.z.cash/zip-0259)

[ZIP 218: Zielabstand von 25 Sekunden zwischen Blöcken](https://zips.z.cash/zip-0218)

[ZIP 235: 60 % der Transaktionsgebühren aus dem Umlauf nehmen](https://zips.z.cash/zip-0235)

[ZIP 237: Mechanismus zur Netzwerknachhaltigkeit: Ausgabe unter Beibehaltung der Halbierungen](https://zips.z.cash/zip-0237)

[ZIP 2003: Transaktionen der Version 4 nicht zulassen](https://zips.z.cash/zip-2003)

[Zebra Versionshinweise zu 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Community-Forum: NU7 Zeitplan](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Verwandte Seiten

| Seite | Warum sie relevant ist |
|---|---|
| [Ironwood](./Ironwood.md) | das vorherige Upgrade in der Reihe, das v6-Transaktionen einführte |
| [Was 25-Sekunden-Blöcke tatsächlich ändern](../research/what-25-second-blocks-actually-change) | ein genauerer Blick auf die kürzere Blockzeit |
| [Nachhaltigkeitsmechanismus des Netzwerks](./Network_Sustainability_Mechanism.md) | wie die Gebührenabschaffung und die erneute Ausgabe NU7 aktiviert wurden, mit den Zahlen |
| [Sprout](./Sprout.md) | den Pool, den NU7 stillgelegt hat |
| [Guthaben wiederherstellen](../using-zcash/recovering-funds) | was das Einfrieren von Sprout für alte Guthaben bedeutet |
| [Transaktionen](../using-zcash/transactions) | Ablauf und Bestätigungen nach NU7 |

---

Reihe: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige Seite: [Ironwood](../zcash-tech/ironwood)

<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# NU7

> NU7 wurde am 6. November 2026 um Block 3.543.405 im Zcash Mainnet aktiviert (02:34 UTC; in US-Zeitzonen am Abend des 5. November) und ist seitdem live.

Das nehmen Sie mit: Was sich durch NU7 geändert hat (schnellere Blöcke, Limits für Shielded-Aktionen, Gebührenrecycling, das Ende von Transaktionen der Version 4), was unverändert blieb und was Knotenbetreiber, Wallets, Börsen und Miner tun mussten.

NU7 ist ein Zcash [Netzwerk-Upgrade](../start-here/network-upgrades), das von [ZIP 259](https://zips.z.cash/zip-0259) eingeführt wurde. Es verkürzte die Zeit zwischen den Blöcken von 75 auf 25 Sekunden, begrenzte die Anzahl der Shielded-Aktionen pro Block, begann damit, 60 % der Transaktionsgebühren aus dem Umlauf zu nehmen, damit sie später an zukünftige Miner ausgegeben werden können, und erklärte Transaktionen der Version 4 für ungültig. Damit wurde der alte Sprout-Pool stillgelegt. Es wurde kein neues Transaktionsformat eingeführt. Die Branch-ID des Konsenses lautet `0x77190ad9`.

Warum das wichtig ist: Vor NU7 wartete man durchschnittlich 75 Sekunden auf eine erste Bestätigung. Das ist langsam an einer Ladenkasse, bei einer Börseneinzahlung oder bei einem Cross-Chain-Swap. NU7 verkürzte diese Zeit auf etwa 25 Sekunden, ohne mehr ZEC auszugeben: Die Belohnung pro Block wurde auf ein Drittel gesenkt, sodass die tägliche Ausgabe gleich blieb. Außerdem ist es das erste Upgrade, das einen Mechanismus einführt, der die Netzwerksicherheit finanzieren soll, wenn die Blockbelohnungen sinken.

Neu bei Zcash? Beginnen Sie mit [Was ist ZEC und Zcash](../start-here/what-is-zec-and-zcash) und [Shielded-Pools](../using-zcash/shielded-pools) und kehren Sie anschließend hierher zurück.

## Kurzfassung

Einfach gesagt: Blöcke kommen jetzt alle 25 Sekunden, die Menge an neuem ZEC pro Tag bleibt gleich, ein Teil jeder Gebühr wird für zukünftige Miner zurückgelegt und der alte Sprout-Pool ist geschlossen.

- **25-Sekunden-Blöcke** ([ZIP 218](https://zips.z.cash/zip-0218)): Die erste Bestätigung erfolgt nach etwa 25 statt 75 Sekunden. Die Blocksubvention sank von 1.5625 auf 0.52083333 ZEC, sodass weiterhin etwa 1.800 ZEC pro Tag ausgegeben werden.
- **Limits für Shielded-Aktionen** (ZIP 218): höchstens 330 Shielded-Aktionen pro Block über alle Pools hinweg, mit Limits pro Pool. So bleiben die Kosten für die Validierung im ungünstigsten Fall und für die Wallet-Synchronisierung unter dem bisherigen Niveau.
- **Mechanismus zur Nachhaltigkeit des Netzwerks** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60 % der Transaktionsgebühren jedes Blocks verlassen den Umlauf und werden später erneut an Miner ausgegeben, ab Block 8.939.664 (voraussichtlich um Februar 2031). Die Obergrenze von 21 Millionen bleibt unverändert.
- **Transaktionen der Version 4 sind ungültig** ([ZIP 2003](https://zips.z.cash/zip-2003)): Wallets müssen Transaktionen der Version 5 oder 6 erstellen. Sprout kann nur mit Version 4 ausgegeben werden. Daher sind die noch in Sprout befindlichen Gelder nun eingefroren.
- **Software**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) und spätere Versionen folgen NU7. Es gibt keine `zcashd`-Version mit Unterstützung für NU7.

## Anschaulicher Vergleich

Stellen Sie sich die Chain als Zugstrecke vor. Vor NU7 fuhr alle 75 Sekunden ein Zug ab und konnte so viele Fahrgäste befördern, wie in 2 MB passten. NU7 lässt alle 25 Sekunden einen Zug fahren, bezahlt jeden Lokführer mit einem Drittel des früheren Fahrpreises, sodass die Tagessumme gleich bleibt, und begrenzt, wie viele der schwersten Fahrgäste (Shielded-Aktionen) in einen Zug einsteigen dürfen. So kann die Prüfung keines einzelnen Zuges zu lange dauern.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Was sich durch NU7 geändert hat

### Zielabstand von 25 Sekunden zwischen Blöcken (ZIP 218)

- Die Schwierigkeitsanpassung zielt nun auf einen Block alle **25 Sekunden** statt alle 75 Sekunden. Dadurch kommt dreimal so häufig ein Block hinzu.
- Die Blocksubvention wurde gedrittelt: **0.52083333 ZEC** pro Block im aktuellen Halbierungszeitraum (zuvor 1.5625 ZEC). Die tägliche Ausgabe bleibt bei etwa 1.800 ZEC (3.456 statt 1.152 Blöcke pro Tag).
- Halbierungen finden weiterhin alle vier Jahre statt. Durch die schnelleren Blöcke wurde die nächste Halbierung auf Block **6.132.390** vorverlegt. Bei einem Zielabstand von 25 Sekunden wird sie voraussichtlich Ende November 2028 stattfinden (ZIP 259).
- Das Fenster für die Schwierigkeitsmittelung wurde von 17 auf **102 Blöcke** vergrößert, sodass die Anpassung weiterhin einen ähnlich langen Zeitraum betrachtet.
- Der Standardablauf für Transaktionen wurde von 40 auf **120 Blöcke** verlängert. Dadurch bleibt er bei etwa 50 Minuten.

### Limits für Shielded-Aktionen (ZIP 218)

Jeder Block hat nun ein gemeinsames Budget und Limits pro Pool:

| Limit | Pro Block |
|---|---|
| Alle Shielded-Aktionen über alle Pools hinweg | 330 |
| Orchard-Aktionen | 330 |
| Ironwood-Aktionen | 330 |
| Sapling-Eingaben + Ausgaben | 300 |
| Sprout JoinSplits | nicht zulässig |

Vor NU7 konnte ein voller 2-MB-Block etwa 617 Orchard- oder Ironwood-Aktionen oder etwa 2.107 Sapling-Ausgaben enthalten, ohne Limits pro Pool. ZIP 218 legt die neuen Obergrenzen so fest, dass selbst bei dreimal so vielen Blöcken der ungünstigste Fall für Knoten und die Synchronisierung von Wallets weniger aufwendig ist als zuvor (zum Beispiel sinkt die Bandbreite für Shielded-Synchronisierungen von Light Clients von etwa 271 auf 169 MB pro Tag), während sich der Durchsatz auf Protokollebene von Orchard mehr als verdoppelt (etwa 2,9 auf 6,6 Transaktionen pro Sekunde bei Transaktionen mit 2 Aktionen).

### Mechanismus zur Nachhaltigkeit des Netzwerks (ZIP 235 + ZIP 237)

- **Gebührenentnahme (ZIP 235):** 60 % der Transaktionsgebühren jedes Blocks werden dem Umlauf entzogen; die übrigen 40 % gehen wie bisher an den Miner. Anders als bei einem Burn werden die entzogenen ZEC erfasst, damit sie später erneut ausgegeben werden können.
- **Erneute Ausgabe (ZIP 237):** Die entzogenen ZEC werden in einem öffentlichen Konsenszustand namens NSM Value Balance gehalten. Dieser wurde bei NU7 mit Werten aufgefüllt, die Miner in der Vergangenheit nicht beansprucht hatten. Ab Block **8.939.664** (voraussichtlich um Februar 2031) gibt jeder Block zusätzlich zum regulären Halbierungsplan einen festen Anteil dieses Guthabens aus.
- Die Obergrenze des Gesamtangebots steigt nicht. Wenn das Guthaben auf null sinkt, entspricht die Ausgabe genau dem bisherigen Halbierungsplan.
- NU7 führte [ZIP 233](https://zips.z.cash/zip-0233) (freiwillige Entnahme durch Nutzer) oder [ZIP 234](https://zips.z.cash/zip-0234) (Ersetzung der Halbierungen durch eine gleichmäßige Kurve) **nicht** ein. Umfragen unter Coinholdern sprachen sich in ZIP 237 für das Modell aus, das die Halbierungen beibehält.

### Transaktionen der Version 4 nicht mehr zulässig (ZIP 2003)

- Ab NU7 ist jede Transaktion der Version 4 ungültig: nicht nur Sprout-Transfers, sondern auch ausschließlich transparente Transaktionen und Sapling-Transaktionen im Format der Version 4. Transaktionen der Version 5 (NU5) und Version 6 ([Ironwood](../zcash-tech/ironwood)) bleiben unverändert.
- Sprout-Transfers gibt es nur im Format der Version 4. Daher können Gelder im [Sprout](../zcash-tech/sprout)-Pool nicht mehr ausgegeben werden. Siehe [Gelder wiederherstellen](../using-zcash/recovering-funds).

### Kleinere Punkte

- Überarbeitungen der Regeln für den Entwicklungsfonds, damit Finanzierungsströme mit 25-Sekunden-Blöcken funktionieren ([ZIP 207](https://zips.z.cash/zip-0207) Revision 2, [ZIP 214](https://zips.z.cash/zip-0214) Revision 3) sowie eine Aktualisierung der Adressliste für Finanzierungsströme ([ZIP 2008](https://zips.z.cash/zip-2008)).
- NU7-Knoten melden im Mainnet die Netzwerkprotokollversion **170190** und trennen nach der Aktivierung ältere Peers.

## Was NU7 nicht getan hat

- **Kein neues Transaktionsformat.** NU7 vermied bewusst eine weitere Migration für Wallets und Parser unmittelbar nach der Einführung der Transaktionen der Version 6 durch Ironwood.
- **Keine Änderung der Obergrenze des Gesamtangebots oder des vierjährigen Halbierungsrhythmus.**
- **Keine Änderung der Coinbase-Wartezeit.** Geschürfte Coins müssen weiterhin 100 Blöcke warten, bevor sie ausgegeben werden können (jetzt etwa 42 Minuten statt etwa 2 Stunden).
- **Kein neuer Shielded-Pool.** Ironwood (NU6.3) bleibt der neueste Pool; Orchard kann weiterhin nur ausgegeben werden, wie schon seit Ironwood.

## Was die einzelnen Gruppen tun mussten

- **Knotenbetreiber:** [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) oder eine spätere Version ausführen. Zebra 7 migriert die Datenbank beim ersten Start vom Format v28 auf v29. Zebra 6.x kann v29 nicht lesen. Sichern Sie daher `state/v28` vor dem Upgrade. Für `zcashd` gibt es keine NU7-Version (die neueste Version ist 6.20.0 vom Juni 2026). Der Zebra-Leitfaden zur [zcashdAPI-Migration](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) ordnet jeden `zcashd`-RPC Zebra, [Zallet](../zcash-tech/zallet) oder seinem Ersatz zu. Siehe [Vollständige Knoten](../zcash-tech/full-nodes) und den [Leitfaden zu gehärtetem Zebra](../guides/hardened-zebrad).
- **Wallets:** Keine Transaktionen der Version 4 mehr erstellen, den Standardablauf von 120 Blöcken verwenden, die Ankertiefe von 3 Blöcken beibehalten (jetzt etwa 1,25 Minuten) und die Aktionslimits pro Block beachten. Eine Transaktion, die für sich genommen ein Limit überschreitet, kann niemals geschürft werden.
- **Börsen und Zahlungsdienste:** Eine Bestätigung dauert nun 25 Sekunden. Dieselbe Anzahl an Bestätigungen deckt also nur noch ein Drittel der Zeit ab. Prüfen Sie die Anzahl der für Einzahlungen erforderlichen Bestätigungen im Hinblick auf die gewünschte Zeit und Sicherheit, statt aus Gewohnheit am alten Wert festzuhalten.
- **Miner und Pools:** Mining-Software und Vorlagen müssen die neue Subvention, die Aufteilung der Gebühren und die Aktionslimits berücksichtigen. Nach den alten Regeln erstellte Blöcke werden abgelehnt.

## Häufige Irrtümer

- **„Mein alter Knoten läuft noch, also ist alles in Ordnung.“** Nur für NU7 setzte ZIP 259 die übliche Regel außer Kraft, nach der Software vor dem Upgrade sich vor der Aktivierung selbst herunterfährt. Ein Zebra der Version 6.x oder ein `zcashd`-Knoten kann nach den alten Regeln online bleiben und unbemerkt von der echten Chain abfallen. Prüfen Sie, ob Ihr Knoten eine Höhe über 3.543.405 meldet und mit einem Block-Explorer übereinstimmt.
- **„Schnellere Blöcke bedeuten, dass mehr ZEC ausgegeben wird.“** Nein. Die Subvention pro Block sank auf ein Drittel, daher bleibt die tägliche Ausgabe unverändert.
- **„60 % der Gebühren werden für immer verbrannt.“** Nein. Sie werden dem Umlauf entzogen und später über den NSM erneut an Miner ausgegeben; die Obergrenze des Gesamtangebots bleibt unverändert.
- **„Nur Sprout-Nutzer sind von der Änderung bei Version 4 betroffen.“** Keine Wallet und kein Skript, das noch Transaktionen der Version 4 erstellt, funktioniert weiter. Das betrifft auch ausschließlich transparente und Sapling-Transaktionen. Ausstehende Transaktionen der Version 4 wurden mit der Aktivierung ungültig; erneutes Signieren allein kann sie nicht gültig machen.
- **„Einstellungen nach Blockanzahl gelten weiterhin wie zuvor.“** Alles, was in Blöcken gemessen wird (Bestätigungen, Ablauf, Sperrzeiten, Zeitlimits), läuft nun in Echtzeit dreimal so schnell ab.

## Glossar

| Begriff | Bedeutung in einfachen Worten |
|---|---|
| Block target spacing | Die durchschnittliche Zeit zwischen Blöcken, auf die die Schwierigkeitsanpassung abzielt: seit NU7 25 Sekunden |
| Block subsidy | Das in jedem Block neu erzeugte ZEC, das zwischen dem Miner und den Finanzierungsströmen des Entwicklungsfonds aufgeteilt wird |
| Shielded action | Eine Einheit Shielded-Arbeit in einer Transaktion (eine Orchard- oder Ironwood-Aktion oder eine Sapling-Eingabe beziehungsweise -Ausgabe) |
| Network Sustainability Mechanism (NSM) | Die Regeln, nach denen ein Teil der Gebühren dem Umlauf entzogen und später erneut an zukünftige Miner ausgegeben wird |
| NSM Value Balance | Die öffentliche laufende Summe der ZEC, die dem Umlauf entzogen wurden und auf ihre erneute Ausgabe warten |
| Version 4 transaction | Das Transaktionsformat aus Sapling, das durch NU7 für ungültig erklärt wurde; Version 5 und 6 bleiben gültig |
| Consensus branch ID | Die Nummer, die einen Satz von Konsensregeln kennzeichnet. Signaturen beziehen sich darauf, daher ist eine für alte Regeln signierte Transaktion unter neuen Regeln ungültig |

## FAQ

**Wann wurde NU7 aktiviert?** Bei Mainnet-Block 3.543.405 am 6. November 2026 um 02:34 UTC. Das Testnet wurde früher aktiviert, bei Block 4.465.026 am 4. Oktober 2026.

**Hat sich die Blockbelohnung geändert?** Pro Block ja: 0.52083333 ZEC statt 1.5625 ZEC. Pro Tag nein: In beiden Fällen sind es etwa 1.800 ZEC.

**Sind meine Sprout-ZEC verschwunden?** Sie lassen sich nicht mehr bewegen, weil Sprout-Ausgaben Transaktionen der Version 4 erfordern und diese nun ungültig sind. Unter [Gelder wiederherstellen](../using-zcash/recovering-funds) erfahren Sie, was das in der Praxis bedeutet.

**Brauche ich eine neue Wallet?** Sie benötigen eine Wallet-Version mit Unterstützung für NU7. Auf der Seite ZecHubs [Wallets](../using-zcash/wallets) sehen Sie, welche Wallets mit NU7 kompatibel sind.

**Wann beginnt die erneute Ausgabe der Gebühren?** Bei Mainnet-Block 8.939.664, voraussichtlich um Februar 2031, sofern die Blöcke weiterhin durchschnittlich alle 25 Sekunden kommen.

**Warum hat NU7 auf ein neues Transaktionsformat verzichtet?** Damit Wallets und Parser nicht unmittelbar nach dem Format der Version 6 von Ironwood eine zweite Migration bewältigen müssen. Außerdem wird die Aufteilung der Gebühren pro Block berechnet, sodass kein neues Transaktionsfeld nötig war.

## Testen Sie Ihr Verständnis

1. Warum bleibt die tägliche Ausgabe von ZEC nach NU7 gleich?
2. Was geschieht mit den 60 % der Gebühren, die dem Umlauf entzogen werden?
3. Warum können Sprout-Gelder nach NU7 nicht mehr ausgegeben werden?
4. Warum ist ein Knoten, der nie aktualisiert wurde, bei diesem Upgrade besonders riskant?

Antworten: (1) Die Subvention pro Block wurde gedrittelt, während die Blöcke dreimal so häufig kommen; (2) sie fließen in die NSM Value Balance und werden ab Block 8.939.664 erneut an Miner ausgegeben; (3) Sprout-Ausgaben gibt es nur im Format der Version 4, das NU7 für ungültig erklärt hat; (4) ZIP 259 setzte das automatische Herunterfahren außer Kraft, sodass ein alter Knoten auf der falschen Chain weiterlaufen kann.

### Ressourcen

[ZIP 259: Einführung des NU7-Netzwerk-Upgrades](https://zips.z.cash/zip-0259)

[ZIP 218: Zielabstand von 25 Sekunden zwischen Blöcken](https://zips.z.cash/zip-0218)

[ZIP 235: 60 % der Transaktionsgebühren dem Umlauf entziehen](https://zips.z.cash/zip-0235)

[ZIP 237: Mechanismus zur Nachhaltigkeit des Netzwerks: Ausgabe unter Beibehaltung der Halbierungen](https://zips.z.cash/zip-0237)

[ZIP 2003: Transaktionen der Version 4 für unzulässig erklären](https://zips.z.cash/zip-2003)

[Zebra Versionshinweise zu 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Community-Forum: NU7 Zeitplan](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Verwandte Seiten

| Seite | Warum sie dazugehört |
|---|---|
| [Ironwood](./Ironwood.md) | das vorherige Upgrade der Reihe, das Transaktionen der Version 6 eingeführt hat |
| [Was 25-Sekunden-Blöcke tatsächlich ändern](../research/what-25-second-blocks-actually-change) | ein genauerer Blick auf die kürzere Blockzeit |
| [Sprout](./Sprout.md) | der Pool, den NU7 stillgelegt hat |
| [Gelder wiederherstellen](../using-zcash/recovering-funds) | was das Einfrieren durch Sprout für alte Gelder bedeutet |
| [Transaktionen](../using-zcash/transactions) | Ablauf und Bestätigungen nach NU7 |

---

Reihe: [Übersicht der Netzwerk-Upgrades](../start-here/network-upgrades) · Zuvor: [Ironwood](../zcash-tech/ironwood)

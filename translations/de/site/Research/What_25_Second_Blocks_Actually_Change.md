# ZIP 218: Was 25-Sekunden-Blöcke tatsächlich verändern

In der am 14. September 2026 abgeschlossenen Coinholder-Umfrage von NU7 stimmten etwa 2.397.669 ZEC für ZIP 218 und 141,6 ZEC dagegen – ein Ergebnis von 99,9 %. Die meisten Berichte fassten es so zusammen: „Zcash-Blöcke werden schneller.“ Das stimmt, lässt aber den Großteil dessen aus, was der Vorschlag bewirkt und was er bewusst unverändert lässt.

Diese Seite erläutert ZIP 218 anhand seines eigenen Textes: was sich ändert, was nicht und welche Kosten damit verbunden sind.

## Die Kurzfassung

| | Heute | Nach ZIP 218 |
|---|---|---|
| Zielabstand zwischen Blöcken | 75 Sekunden | 25 Sekunden |
| Blöcke pro Tag | 1.152 | 3.456 |
| Blocksubvention (aktuelle Halving-Ära) | 1,5625 ZEC | 0,52083333 ZEC |
| Neue ZEC pro Tag | unverändert | unverändert |
| Halving-Intervall | 1.680.000 Blöcke | 5.040.000 Blöcke |
| Grenzen für abgeschirmte Aktionen pro Block | keine (nur die 2-MB-Größenbegrenzung) | 330 insgesamt, mit Limits je Pool |
| Orchard-Durchsatz (Transaktionen mit 2 Aktionen) | etwa 2,9 pro Sekunde | etwa 6,6 pro Sekunde |

![ZIP 218 cuts block target spacing from 75 seconds to 25, tripling daily blocks from 1,152 to 3,456, while dividing the per-block subsidy by the same factor of three from 1.5625 to 0.52083333 ZEC, so daily issuance stays at 1,800 ZEC and the halving interval stretches from 1,680,000 to 5,040,000 blocks to hold halving dates fixed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Dreimal so viele Blöcke, die jeweils ein Drittel so viel auszahlen. Der Emissionsplan bleibt unverändert.

## Warum die Blockzeit ändern

Das Hauptziel ist eine **geringere Wartezeit**. Heute wartet eine Zahlung unabhängig von der Netzwerkauslastung durchschnittlich 75 Sekunden auf ihre erste Bestätigung. Bei 25 Sekunden sinkt dies durchschnittlich auf 25 Sekunden. ZIP nennt Point-of-Sale-Zahlungen, Börseneinzahlungen und Cross-Chain-Bridges als die Anwendungen, die dies am stärksten spüren.

Zwei Punkte aus ZIP sollten berücksichtigt werden:

- **Es wird niemandem vorgeschrieben, weniger Bestätigungen zu verwenden.** Für Nutzer, die dieselbe Toleranz gegenüber Reorg-Risiken wie heute beibehalten, erwartet ZIP, dass sich die Bestätigungszeit um etwas weniger als das Dreifache verbessert.
- **Es ist kein Ersatz für Finalitätsarbeit.** ZIP beschreibt sich selbst als Ergänzung zu Finalitätsmechanismen wie Crosslink. Schnellere Blöcke auf der Basisschicht helfen unabhängig davon, ob später eine Finalitätsschicht hinzugefügt wird.

ZIP weist außerdem darauf hin, dass ein höherer Durchsatz allein auch mit einer größeren Blockgröße hätte erreicht werden können. Die Latenz ist der Grund, stattdessen kürzere Blöcke zu wählen.

## Was sich ändert

### Emission: gleiche ZEC pro Tag

Eine Verdreifachung der Blockzahl würde die tägliche Emission verdreifachen, wenn sich sonst nichts änderte. ZIP 218 verhindert dies, indem die Subvention pro Block nach Aktivierung von NU7 um einen weiteren Faktor drei geteilt wird.

In der aktuellen Halving-Ära sinkt die Blocksubvention dadurch von **1,5625 ZEC auf 0,52083333 ZEC** (52.083.333 zatoshi). Da sich 156.250.000 zatoshi nicht gleichmäßig durch drei teilen lassen, wird jeder Block um ein Drittel eines zatoshi abgerundet. Über ein vollständiges Halving-Intervall von 5.040.000 Blöcken ergibt das insgesamt etwa 0,0168 ZEC.

Die Subvention ist die gesamte Menge neuer ZEC, die pro Block erzeugt wird. Der bestehende Anteil für Entwicklungsfinanzierung wird weiterhin daraus entnommen, sodass Miner – genau wie heute – weniger als den vollen Betrag erhalten.

> **Eine Anmerkung zur Zahl von 0,26041666 ZEC.** Die erläuternde Anmerkung im Entwurf von ZIP gibt die Subvention nach NU7 als floor(156250000 / 6) = 0,26041666 ZEC an, und einige Nachrichtenberichte haben dies wiederholt. Diese Anmerkung liegt um den Faktor zwei falsch: 156.250.000 zatoshi sind bereits die Subvention nach Blossom, sodass eine Division durch sechs den Blossom-Faktor zwei zusätzlich zum NU7-Faktor drei ein zweites Mal anwendet. Die normative Formel ergibt beim aktuellen Halving-Index floor(1,250,000,000 / (2 · 3 · 4)) = 52.083.333 zatoshi. Das Implementierungs-Issue von Zebra für diese Änderung ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)) hält fest, dass die Anmerkung den Blossom-Faktor doppelt zählt, fordert Implementierer auf, „die Formel, nicht die Anmerkung“ umzusetzen, und besagt, dass eine Korrektur für ZIP eingereicht wurde. Der korrekte Wert bei Aktivierung ist **0,52083333 ZEC**.

### Halvings behalten ihr Timing

Das Halving-Intervall verdreifacht sich von 1.680.000 auf 5.040.000 Blöcke. Da Blöcke dreimal so häufig eintreffen, finden Halvings weiterhin ungefähr zum selben Zeitpunkt statt, zu dem sie ohne diese Änderung stattgefunden hätten. Die Gesamtobergrenze des Angebots bleibt unberührt.

Dies ist getrennt von der anderen Emissionsfrage in der Umfrage von NU7, bei der Coinholder dafür stimmten, Halvings beizubehalten, statt sie durch eine geglättete Kurve zu ersetzen. ZIP 218 arbeitet mit dem bestehenden Halving-Modell und verändert es nicht.

### Neue Grenzen für abgeschirmte Aktionen pro Block

ZIP 218 führt Obergrenzen dafür ein, wie viel abgeschirmte Aktivität ein einzelner Block enthalten darf:

| Grenze | Maximum pro Block |
|---|---|
| Alle abgeschirmten Pools zusammen | 330 (jeder Sprout JoinSplit zählt als 2) |
| Orchard-Aktionen | 330 |
| Sapling-Eingaben plus -Ausgaben | 300 |
| Sprout JoinSplits | 25 |

Transparente Teile von Transaktionen sind nicht betroffen, und die 2-MB-Blockgrößenbegrenzung gilt weiterhin.

Die Grenzen bestehen, weil mehr Blöcke sonst mehr Arbeit für Wallets und Knoten bedeuten würden. Mit den Obergrenzen wird der schlimmste Fall trotz dreimal so vieler Blöcke tatsächlich **besser** als heute:

- **Wallet-Synchronisierung:** Die maximale Datenmenge, deren Download einer Light Wallet an einem Tag aufgezwungen werden könnte, sinkt von etwa 271 MB auf etwa 169 MB, also um rund 38 %. Trial-Decryption-Vorgänge im schlimmsten Fall sinken von etwa 4,8 Millionen auf etwa 2,3 Millionen pro Tag.
- **Blockverifizierung:** Die Benchmarks von ZIP beziffern einen Orchard-Block im schlimmsten Fall unter den neuen Grenzen auf etwa 432 ms, gegenüber etwa 770 ms im heutigen schlimmsten Fall. Bei Sapling ist der Rückgang größer, von etwa 3.175 ms auf etwa 272 ms.

Die Obergrenzen für Sapling und Sprout sind absichtlich eng. Im Mai 2026 enthielt Orchard 87,9 % der abgeschirmten ZEC, Sapling 11,6 % und Sprout 0,5 %. Daher erhalten die kleineren Pools genügend Raum für ihre tatsächliche Nutzung, während ein Angreifer weniger missbrauchen kann. Da die Gebühren von ZIP 317 in jedem Pool pro logischer Aktion gleich hoch sind, gewinnt ein Angreifer nichts, wenn er einen Pool statt eines anderen spammt.

### Durchsatz

Bei 330 Orchard-Aktionen pro Block passt eine Standardtransaktion von Orchard mit 2 Aktionen ⌊330 / 2⌋ = 165-mal in einen Block. Bei einem Block alle 25 Sekunden sind das etwa **6,6 Transaktionen pro Sekunde**, gegenüber heute etwa 2,9 – ZIP nennt dies einen Anstieg des normalen Orchard-Durchsatzes um das 2,3-Fache. Sapling liegt bei etwa 3,0 pro Sekunde und damit weiterhin über dem, was Orchard heute bewältigt.

### Schwierigkeitsanpassung

Der Schwierigkeitsalgorithmus bildet einen Durchschnitt über ein Fenster jüngerer Blöcke. ZIP 218 erhöht dieses Fenster von 17 auf 102 Blöcke, sodass es weiterhin etwa 2.550 Sekunden Echtzeit abdeckt – denselben Zeitraum, den es bei der Einführung von Zcash mit 150-Sekunden-Blöcken abdeckte. ZIP nennt zwei Gründe: Schwierigkeitsmanipulationsangriffe nicht zu erleichtern (es verweist auf den MWEB-Vorfall bei Litecoin im April 2026) und kurzfristige Schwankungen der Blockzeiten zu glätten.

Unmittelbar nach der Aktivierung werden die Blockzeiten eine Weile brauchen, um sich auf das neue Ziel einzupendeln. Das wird erwartet und entspricht dem, was bei Blossom geschah, als Zcash von 150 auf 75 Sekunden sank.

### Standardwerte für Knoten und Wallets

Dies sind Empfehlungen für Implementierungen und keine Konsensregeln:

- **Transaktionsablauf:** Der Standardablauf steigt von 40 auf 120 Blöcke und behält damit ungefähr dieselben 50 Minuten bei.
- **Maximale Reorg-Tiefe:** Das Limit von Zebra steigt von 99 auf 600 Blöcke, etwa 4,2 Stunden bei 25 Sekunden – dasselbe Zeitfenster, das es bei der Einführung abdeckte.
- **Anchor-Tiefe für abgeschirmte Transaktionen:** bleibt bei 3 Blöcken, sodass die Verzögerung von 3,75 Minuten auf 1,25 Minuten sinkt. ZIP folgt hier dem Präzedenzfall von Blossom.
- **Mehrere Netzwerk-Konstanten**, die in Blöcken gemessen werden, werden mit drei multipliziert, sodass sie dieselbe Zeitspanne abdecken.

## Was gleich bleibt

- Pro Tag ausgegebene ZEC, der Halving-Zeitplan und die Angebotsobergrenze
- Die 2-MB-Blockgrößenbegrenzung
- Transparente Transaktionen, die von den neuen Aktionsgrenzen nicht berührt werden
- Coinbase-Reifezeit bei 100 Blöcken. Beachte, dass dies nun etwa 42 statt etwa 125 Minuten bedeutet, weil die Anzahl in Blöcken und nicht in Zeit gemessen wird.

## Der Kompromiss: mehr veraltete Blöcke

Schnellere Blöcke sind nicht kostenlos. Ein veralteter Block ist ein gültiger Block, der das Rennen um die Aufnahme in die Chain verliert, weil ein anderer Block das Netzwerk zuerst erreicht. Je kürzer der Abstand zwischen Blöcken, desto häufiger passiert dies, und ZIP verknüpft die Rate veralteter Blöcke mit Blockweiterleitung, Verifizierungszeit und dem Risiko der Mining-Zentralisierung.

- **Heute:** etwa 0,4 %, was laut ZIP die zugrunde liegende Rate unterschätzen könnte, weil die Hashpower in Pools konzentriert ist.
- **Theoretisch bei 25 Sekunden:** etwa 3,26 %, basierend auf gemessenen Zcash-Weiterleitungsverzögerungen.
- **Devnet-Test:** 99 geografisch verteilte Zebra-Knoten, die vollständige 2-MB-Blöcke im Abstand von 25 Sekunden erzeugten, maßen eine Rate veralteter Blöcke von 4,86 % und eine Fork-Rate von 0,37 %. Die einzige erforderliche Anpassung betraf die TCP-Konfiguration. Da dieses Devnet stärker dezentralisiert war als das heutige Mainnet, betrachtet ZIP diese Werte als nahe am Worst Case.
- **Referenzpunkt:** ZIP verwendet Ethereums historische Proof-of-Work-Rate veralteter Blöcke von 5,4 % als Sicherheitsgrenzwert. Beide Devnet-Werte liegen darunter.

Daneben gibt es zwei kleinere Kosten. Light Wallets laden pro Tag etwa 200 KB mehr an kompakten Block-Headern herunter. Und weil es dreimal so viele Blöcke gibt, muss ein Full Node, der offline war, beim Aufholen mehr Blöcke verarbeiten, obwohl jeder einzelne Block günstiger zu verifizieren ist. ZIP akzeptiert beides.

## Status und Zeitplan

- **Status von ZIP:** Entwurf. Verantwortliche: Dev Ojha und Evan Forbes; erstellt am 13. März 2026.
- **Coinholder-Umfrage:** am 14. September 2026 mit 99,9 % Zustimmung abgeschlossen. Die Umfrage signalisiert eine Präferenz; sie ändert nicht selbstständig Konsensregeln.
- **Zeitplan:** In einer Ankündigung im Community Forum von Zcash am 17. September vereinbarten die Entwicklungsorganisationen einen Zeitplan mit Code Complete bis zum 30. September, NU7 im Testnet am 6. Oktober, einer endgültigen Entscheidung und Mainnet-Aktivierungshöhe am 20. Oktober sowie einer für etwa den 5. November 2026 geplanten Mainnet-Aktivierung. Der 5. November ist ein Zieltermin und kein festes Datum, solange die Höhe nicht festgelegt ist.
- **Implementierung:** nachverfolgt in Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) und in Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)).

## Was dies für dich bedeutet

- **ZEC halten:** nichts zu tun. Dein Guthaben und der Emissionsplan bleiben unberührt.
- **Eine Wallet verwenden:** Aktualisiere sie, sobald deine Wallet Unterstützung für NU7 bereitstellt. Erste Bestätigungen treffen etwa dreimal schneller ein.
- **Einen Knoten, eine Börse oder einen Dienst betreiben:** Plane ein Upgrade vor der Aktivierung und überprüfe alle Einstellungen, die in Blöcken gemessen werden, da eine feste Blockanzahl nun ein Drittel der Zeitspanne abdeckt, die sie zuvor abdeckte.

## Quellen

- [ZIP 218: 25-Sekunden-Zielabstand zwischen Blöcken](https://zips.z.cash/zip-0218)
- [ZIP 208: Kürzerer Zielabstand zwischen Blöcken](https://zips.z.cash/zip-0208), der Präzedenzfall von Blossom
- [Forum: Vorschlag — Senkung des Zcash-Zielabstands zwischen Blöcken auf 25 s](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: Zcash-Reduzierung der Blockzeit scheint für NU7 mit einem reinen Zebra-Devnet sicher zu sein](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra Issue #11463](https://github.com/ZcashFoundation/zebra/issues/11463), Halving-Intervall und Subvention nach NU7
- [Zebra Issue #11440](https://github.com/ZcashFoundation/zebra/issues/11440), Nachverfolgung der Implementierung von ZIP 218
- NU7 Umfrageergebnisse und Zeitplan, wie von Bitcoin.com News, crypto.news und KuCoin berichtet (16.–19. September 2026)

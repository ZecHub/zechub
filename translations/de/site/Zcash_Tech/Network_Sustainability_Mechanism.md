<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Netzwerk-Nachhaltigkeitsmechanismus (NSM)

> Der NSM ist seit der Aktivierung von Zcash[NU7](./NU7.md) auf Mainnet-Block 3.543.405 am 6. November 2026 Teil des Konsenses. Gebühren werden bereits zurückgelegt; die erneute Ausgabe an Miner beginnt ab Block 8.939.664 (voraussichtlich etwa im Februar 2031).

Das nehmen Sie mit: was der Netzwerk-Nachhaltigkeitsmechanismus bewirkt, wie viel der Gebühren jedes Blocks er entfernt, wohin diese ZEC fließt, wann und wie schnell sie als Blockbelohnungen zurückkommt und warum die Obergrenze von 21 Millionen und der Halbierungsplan unverändert bleiben.

Der Netzwerk-Nachhaltigkeitsmechanismus (NSM) ist eine Reihe von Konsensregeln, die einen Teil der ZEC aus dem Umlauf nimmt und sie später über viele Jahre verteilt an Miner zurückzahlt. NU7 hat zwei Teile davon eingeführt: [ZIP 235](https://zips.z.cash/zip-0235), der 60 % der Transaktionsgebühren jedes Blocks aus dem Umlauf nimmt, und [ZIP 237](https://zips.z.cash/zip-0237), der die entfernte ZEC zusätzlich zur normalen Blocksubvention entlang einer gleichmäßigen Kurve erneut ausgibt. Beide wurden durch [ZIP 259](https://zips.z.cash/zip-0259) aktiviert.

Warum das wichtig ist. Zcash bezahlt seine Sicherheit mit neuen ZEC in jedem Block, und diese Subvention halbiert sich etwa alle vier Jahre. Sobald sie gering ist, müssen Miner hauptsächlich von Gebühren leben. Der NSM ist ein erster Schritt in Richtung dieser Zukunft: Er spart einen Teil der heutigen Gebühren und zahlt sie künftigen Minern aus, ohne die Angebotsobergrenze anzuheben und ohne den Halbierungsplan zu ändern, auf den sich die Menschen bereits verlassen.

## Kurzfassung

- **Entnahme ([ZIP 235](https://zips.z.cash/zip-0235)):** In jedem Block verlassen 60 % der gesamten Transaktionsgebühren (abgerundet, zugunsten des Miners) den Umlauf. Der Miner behält die übrigen 40 %.
- **NSM-Wertbestand:** Eine öffentliche laufende Summe der ZEC, die aus dem Umlauf genommen und noch nicht erneut ausgegeben wurde. Sie ist ein Konsenszustand und kein Pool, aus dem jemand Geld ausgeben kann.
- **Der Anfangsbestand:** Bei der Aktivierung von NU7 begann der Bestand bei **368.58445520 ZEC** – den Blockbelohnungen und Gebühren, die frühe Miner vor NU6 nicht beansprucht hatten.
- **Erneute Ausgabe ([ZIP 237](https://zips.z.cash/zip-0237)):** Ab Block **8.939.664** wird jedem Block ein fester Anteil (0,00001375 %) des Bestands zur Blocksubvention hinzugefügt. Dadurch wird pro vierjährigem Halbierungszeitraum etwa die Hälfte des Bestands ausgezahlt.
- **Was gleich bleibt:** der Halbierungsplan und die Obergrenze von 21 Millionen ZEC. Wenn der Bestand jemals null ist, entspricht die Ausgabe genau dem bisherigen Zeitplan.

## Anschaulicher Vergleich

Stellen Sie sich ein Sparglas neben der Kasse vor. Jedes Mal, wenn ein Block geschürft wird, wandern 60 % des Trinkgelds (der Gebühren) ins Glas statt in die Tasche des Miners. Niemand kann von Hand Geld aus dem Glas nehmen. Ab 2031 wird jedem Block eine kleine feste Quote des jeweiligen Glasinhalts zur Blockbelohnung hinzugefügt, sodass sich das Glas langsam leert: etwa zur Hälfte alle vier Jahre, im selben Rhythmus wie die Halbierungen.

## So funktioniert die Entnahme (ZIP 235)

- Die Regel gilt pro Block, nicht pro Transaktion. Bei Gesamtgebühren eines Blocks von `F` (in Zatoshi) beträgt die Entnahme `floor(6 × F / 10)`, und der Miner darf `F` abzüglich dieses Betrags beanspruchen.
- Die Rundung erfolgt einmal für den gesamten Block und immer zugunsten des Miners. Eine Rundung pro Transaktion würde insgesamt weniger als 60 % entnehmen (bei zwei Gebühren von je 1 Zatoshi würde jeweils 0 entnommen).
- Beispiel: Bei Gebühren von 50.000 Zatoshi (0,0005 ZEC) für die Transaktionen eines Blocks werden 30.000 Zatoshi entnommen und dem Miner 20.000 ausgezahlt. Bei Gebühren von 15 Zatoshi werden 9 entnommen und dem Miner 6 ausgezahlt.
- Es ist kein Transaktionsfeld erforderlich. Jeder Knoten berechnet den Betrag anhand der Gebühren, die er ohnehin überprüft, und [ZIP 236](https://zips.z.cash/zip-0236) sorgt dafür, dass die Coinbase-Transaktion genau den Betrag beansprucht, der dem Miner zusteht. Ein Miner kann daher weder weniger entnehmen noch mehr beanspruchen.
- Größenordnung: ZIP 235 schätzte anhand des Datenverkehrs vor NU7 etwa 370 ZEC Gebühren pro Jahr, sodass jährlich ungefähr 222 ZEC entnommen würden. Heute sind die Gebühren im Vergleich zur Blocksubvention gering. Deshalb erwarteten die Autoren nur geringe Auswirkungen auf Miner.

## So funktioniert die erneute Ausgabe (ZIP 237)

- **Der Bestand.** `NSMValueBalance` beginnt bei der Aktivierung von NU7 mit 368.58445520 ZEC (36.858.445.520 Zatoshi). Jeder Block addiert, was ZIP 235 entnommen hat, und zieht den erneut ausgegebenen Betrag ab. Ein Block, durch den der Bestand negativ würde, ist ungültig.
- **Woher der Anfangsbestand stammt.** Vor NU6 konnte eine Coinbase-Transaktion weniger als die vollständige Blockbelohnung und die Gebühren beanspruchen. In den ersten 2.726.400 Blöcken der Chain ließen Miner 368.58445520 ZEC unbeansprucht: Die bis zu dieser Höhe vorgesehene Subvention betrug 15.750.000 ZEC, und die ausgegebene Menge betrug 15,749,631.41554480 ZEC. ZIP 237 überträgt diesen Wert an den NSM, damit er ausgezahlt statt verloren geht.
- **Keine erneute Ausgabe bis Block 8.939.664.** Zwischen NU7 und dieser Höhe wächst der Bestand nur.
- **Die Formel.** Ab Block 8.939.664 erhält die Subvention jedes Blocks zusätzlich `ceiling(0.0000001375 × NSMValueBalance)`, berechnet anhand des Bestands nach dem vorherigen Block. Der Anteil beträgt `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10.000.000.000; das Halbierungsintervall nach NU7 umfasst 5.040.000 Blöcke.
- **Warum dieser Anteil.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, sodass bei keiner weiteren Entnahme in jedem Halbierungszeitraum etwa die Hälfte des Bestands erneut ausgegeben wird. Es handelt sich um einen exponentiellen Abbau, der nur auf den NSM-Bestand angewendet und über die unveränderten Halbierungsschritte gelegt wird.
- **Rechenbeispiel.** Wenn der Bestand bei Block 8.939.664 noch immer nur dem Anfangsbestand von 368,58 ZEC entspräche, würde der erste Block 5.069 Zatoshi erneut ausgeben (etwa 0,00005 ZEC), also bei 3.456 Blöcken pro Tag ungefähr 0,175 ZEC täglich. Die tatsächlichen Werte werden bis dahin um die bis dahin entnommenen Gebühren höher liegen.
- **Warum Block 8.939.664.** ZIP 237 legt diesen Wert anhand einer festen Regel fest, unabhängig davon, wie viel tatsächlich entnommen wird: Es ist der erste Block nach der dritten Halbierung (Block 6.132.390, voraussichtlich etwa im November 2028), bei dem der NSM-Anteil auf alle ZEC, deren Ausgabe noch nicht vorgesehen ist, weniger als die normale Blocksubvention (0,26041666 ZEC in diesem Zeitraum) auszahlen würde. Die Abstimmungen unter NU7-Coinholdern und in der Community ergaben keine gemeinsame Mehrheit darüber, wann die erneute Ausgabe beginnen sollte. Daher verwendet ZIP 259 diesen Übergangspunkt.

## Was sich nicht geändert hat

- **Der Halbierungsplan.** ZIP 237 behält die vierjährigen Halbierungsschritte bei. Die verworfene Alternative, [ZIP 234](https://zips.z.cash/zip-0234), hätte sie durch eine gleichmäßige Ausgabekurve ersetzt. In den Abstimmungen im August und September 2026 unter NU7 wurde gefragt, ob die Halbierungen beibehalten oder die Ausgabe geglättet werden sollte, und NU7 setzte den Entwurf mit beibehaltenen Halbierungen um.
- **Die Angebotsobergrenze.** Die ausgegebene Menge plus der NSM-Wertbestand wächst in jedem Block genau um die vorgesehene Blocksubvention, sodass die Ausgabe die Obergrenze niemals überschreiten kann. Tatsächlich sank die Obergrenze geringfügig: Durch die Rundung der Subvention nach NU7 in ZIP 218 verringerte sich die Gesamtausgabe um etwa 0,50 ZEC, und der NSM gibt diesen Fehlbetrag nicht erneut aus.
- **Freiwillige Entnahme.** [ZIP 233](https://zips.z.cash/zip-0233), das es jedem ermöglichen würde, ZEC mithilfe eines ausdrücklichen Transaktionsfelds an den NSM zu senden, wurde in NU7 nicht eingeführt. Heute sind Gebühren die einzige Quelle für Entnahmen. ZIP 237 erlaubt es späteren ZIPs, weitere Quellen hinzuzufügen.
- **Privatsphäre.** Der Bestand und die zusätzliche Subvention werden anhand von Werten berechnet, die ohnehin öffentlich sind. Deshalb gibt der NSM nichts Neues über Transaktionen preis.

## Häufige Missverständnisse

- **„60 % der Gebühren werden verbrannt.“** Nicht dauerhaft. Anders als bei einem Burn (üblicherweise wird Ethereum EIP-1559 zum Vergleich herangezogen) wird die entnommene ZEC nachverfolgt und später an Miner ausgegeben.
- **„Der NSM erzeugt zusätzliche ZEC.“** Nein. Er gibt nur Werte erneut aus, die entnommen oder nie beansprucht wurden. Die Gesamtausgabe bleibt unter der bestehenden Obergrenze.
- **„Die erneute Ausgabe hat begonnen.“** Noch nicht. Bis Block 8.939.664 wächst der Bestand nur an.
- **„Der NSM ist ein Fonds, den jemand kontrolliert.“** Nein. Er ist eine Zahl im Konsenszustand, und Werte verlassen ihn nur über die Blocksubventionsformel.
- **„Die Halbierungen wurden abgeschafft.“** Nein. Das war der Entwurf von ZIP 234, den NU7 nicht eingeführt hat.

## Glossar

| Begriff | Erklärung in einfachen Worten |
|---|---|
| Network Sustainability Mechanism (NSM) | Die Konsensregeln, die ZEC aus dem Umlauf nehmen und später erneut an Miner ausgeben |
| NSM Value Balance | Die öffentliche laufende Summe der ZEC, die aus dem Umlauf genommen (oder nie beansprucht) und noch nicht erneut ausgegeben wurden |
| Removal from circulation | Übertragung von ZEC aus der ausgegebenen Menge in den NSM-Wertbestand; seit NU7 sind dies 60 % der Gebühren jedes Blocks |
| Reissuance | Auszahlung von ZEC aus dem NSM-Wertbestand als zusätzliche Blocksubvention ab Block 8.939.664 |
| Issued Supply | Alle ZEC in den Wertpools der Chain; der NSM-Wertbestand ist darin nicht enthalten |
| Block subsidy | Die neuen ZEC, die in jedem Block erzeugt und zwischen dem Miner und den Entwicklungsfonds aufgeteilt werden |
| Halving interval | Die Anzahl der Blöcke zwischen Halbierungen: seit NU7 5.040.000 (bei 25-Sekunden-Blöcken etwa vier Jahre) |

## FAQ

**Wie viel befindet sich heute im NSM?** Der Anfangsbestand von 368.58445520 ZEC plus 60 % der Gebühren jedes Blocks seit Block 3.543.405. Jeder vollständige Knoten führt diesen Konsenszustand nach.

**Wer erhält die erneut ausgegebenen ZEC?** Sie werden der Blocksubvention hinzugefügt und somit genauso aufgeteilt: Die Entwicklungsfonds erhalten ihren festen Prozentsatz der gesamten Subvention (vorgesehen plus erneut ausgegeben), der Miner den Rest.

**Wann beginnt die erneute Ausgabe?** Bei Mainnet-Block 8.939.664, voraussichtlich etwa im Februar 2031, sofern die Blöcke weiterhin durchschnittlich alle 25 Sekunden entstehen. Auf Testnet folgt die Höhe derselben Regel, ausgehend von Testnets NU7-Aktivierungshöhe.

**Steigen die Gebühren wegen des NSM?** Nein. Er ändert, wohin die Gebühren fließen, nicht, wie viel eine Transaktion kostet.

**Kann sich die Aufteilung 60/40 ändern?** Nur durch ein künftiges ZIP und ein Netzwerk-Upgrade. ZIP 235 besagt, dass die Aufteilung möglicherweise erneut geprüft wird, wenn die Gebühren steigen, etwa sobald sie die Blocksubvention übersteigen.

## Testen Sie Ihr Verständnis

1. Die Transaktionen eines Blocks zahlen 100.000 Zatoshi an Gebühren. Wie viel behält der Miner?
2. Woher stammt der Anfangsbestand des NSM?
3. Welcher Anteil des NSM-Bestands wird pro Halbierungszeitraum ungefähr erneut ausgegeben, wenn nichts Neues entnommen wird?
4. Warum erhöht die erneute Ausgabe die Gesamtausgabe nicht über 21 Millionen ZEC?

Antworten: (1) 40.000 Zatoshi; 60.000 werden entnommen; (2) Blockbelohnungen und Gebühren, die Coinbase-Transaktionen vor NU6 unbeansprucht ließen: 368.58445520 ZEC; (3) etwa die Hälfte; (4) durch die erneute Ausgabe werden nur entnommene oder nie beanspruchte Werte ausgezahlt. Deshalb wachsen die ausgegebene Menge plus der NSM-Bestand in jedem Block genau um die vorgesehene Subvention.

### Ressourcen

[ZIP 235: 60 % der Transaktionsgebühren aus dem Umlauf nehmen](https://zips.z.cash/zip-0235)

[ZIP 237: Netzwerk-Nachhaltigkeitsmechanismus: Ausgabe unter Beibehaltung der Halbierungen](https://zips.z.cash/zip-0237)

[ZIP 259: Einführung des NU7-Netzwerk-Upgrades](https://zips.z.cash/zip-0259)

[ZIP 234: Netzwerk-Nachhaltigkeitsmechanismus: Glättung der Ausgabe (nicht eingeführt)](https://zips.z.cash/zip-0234)

[ZIP 233: Netzwerk-Nachhaltigkeitsmechanismus: Mittel aus dem Umlauf nehmen (nicht eingeführt)](https://zips.z.cash/zip-0233)

[ZIP 236: Blöcke sollten genau ausgeglichen sein](https://zips.z.cash/zip-0236)

## Verwandte Seiten

| Seite | Warum sie relevant ist |
|---|---|
| [NU7](./NU7.md) | das Netzwerk-Upgrade, das den NSM aktiviert hat |
| [Zcash Geldpolitik](../start-here/zcash-monetary-policy) | der Halbierungsplan und die Angebotsobergrenze, die der NSM beibehält |
| [Was 25-Sekunden-Blöcke tatsächlich ändern](../research/what-25-second-blocks-actually-change) | warum sich die Subvention und das Halbierungsintervall bei NU7 geändert haben |
| [Entwicklungsfonds](../start-here/development-fund) | wie die Blocksubvention aufgeteilt wird |
| [Transaktionen](../using-zcash/transactions) | wie Transaktionsgebühren festgelegt werden |

---

---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash wurde am 28. Oktober 2016 mit dem abgeschirmten Sprout-Pool gestartet.

Das Wichtigste vorweg: Sprout ist der Ursprung von Zcash, das erste Mal, dass privates, verifizierbares Geld auf einer live laufenden blockchain funktionierte.

Sprout ist der ursprüngliche Start des Zcash-Netzwerks, nicht ein späteres [Netzwerk-Upgrade](../start-here/network-upgrades). Es ging mit dem Genesis-Block am 28. Oktober 2016 live. Es gibt keine nummerierte ZIP, die Sprout definiert: Der ZIP-Prozess begann erst später mit Overwinter, daher wird Sprout durch die ursprüngliche Zcash Protocol Specification und die Zerocash-Konstruktion beschrieben, auf der es aufgebaut wurde. Die [Electric Coin Company](../zcash-organizations/electric-coin-company) (damals die Zerocoin Electric Coin Company), unter der Leitung von Zooko Wilcox, entwickelte und veröffentlichte es. Sprout führte die ersten praxistauglichen abgeschirmten zk-SNARK-Transaktionen und den ursprünglichen abgeschirmten Pool ein, sodass Menschen ZEC senden konnten, wobei Absender, Empfänger und Betrag verborgen blieben, während das Netzwerk weiterhin überprüfte, dass die Salden stimmten. Der Name sollte eine junge, sprießende Chain signalisieren, von der das Team erwartete, dass sie wachsen würde.

Warum das wichtig ist. Jede öffentliche blockchain vor Sprout stellte deine Zahlungen offen zur Schau: Jeder konnte sehen, wer wem wie viel bezahlt hat. Sprout war das erste live laufende, permissionless Netzwerk, das diese Details verbarg und dennoch bewies, dass niemand schummelte. Das ist wichtig für gewöhnliche finanzielle Privatsphäre, so wie man sie von Bargeld oder einem Kontoauszug erwartet, den sonst niemand lesen kann. Es bewies außerdem, dass starke On-Chain-Privatsphäre in der Praxis funktionieren konnte, also nicht nur auf dem Papier. Die Trusted-Setup-Ceremony, die das möglich machte, wurde zu einem Bezugspunkt für spätere kryptografische Arbeiten, und das langsame, speicherintensive Proving-System, mit dem Sprout ausgeliefert wurde, war genau der Anstoß dafür, dass das Team zwei Jahre später Sapling entwickelte.

## Erster abgeschirmter Pool

Sprout schuf zwei Arten von Adressen. Transparente Adressen (t-addresses) funktionieren wie bei Bitcoin, mit Details, die im öffentlichen Ledger sichtbar sind. Abgeschirmte Adressen (z-addresses) senden Mittel in den Sprout-[Shielded Pool](../using-zcash/shielded-pools), in dem Absender, Empfänger und Betrag verborgen bleiben. Der Trick sind [zk-SNARKs](../zcash-tech/zk-snarks), Zero-Knowledge-Beweise, die es einer Transaktion erlauben zu zeigen, dass sie gültig ist, ohne Doppelausgaben und mit korrekt aufaddierten Salden, ohne irgendeines der Details offenzulegen. Sprout war das erste Mal, dass dies in der Produktion auf einer live laufenden Kryptowährung funktionierte.

![Transparente Transaktionen legen Absender, Empfänger und Betrag offen, während abgeschirmte Sprout-Transaktionen alle drei verbergen und dennoch verifizierbar bleiben](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Die Ceremony

Die zk-SNARKs in Sprout benötigten einen Satz öffentlicher Parameter, und deren sichere Erzeugung erforderte ein einmaliges Setup namens Ceremony. Sechs Teilnehmer an getrennten, weit voneinander entfernten Orten erzeugten jeweils ein geheimes Teilstück, genannt toxic waste. Falls jemals alle Teilstücke wieder zusammengesetzt würden, könnte man ZEC aus dem Nichts fälschen. Das Design machte aus diesem Risiko eine einfache Regel: Solange mindestens ein Teilnehmer sein Teilstück zerstörte, konnte das vollständige Geheimnis niemals rekonstruiert werden, sodass Fälschungen unmöglich blieben. Zu den Teilnehmern, deren Namen öffentlich bekannt sind, gehören Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd und Derek Hinch von NCC Group. Ein Teilnehmer entschied sich, anonym zu bleiben.

![Die Ceremony: sechs Teilnehmer erzeugen private Fragmente und zerstören dann den toxic waste, sodass nur die öffentlichen Sprout-Parameter übrig bleiben](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## Der Ursprung

Sprout ist die Grundlage, auf der jede spätere Änderung aufbaut. Als der Netzwerk-Upgrade-Mechanismus mit Overwinter eingeführt wurde, bezeichnete er die ursprünglichen Regeln als consensus branch id 0, was einfach bedeutet, dass noch kein Upgrade angewendet wurde. Alles seitdem (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 und alles Weitere) baut auf der Chain auf, die Sprout begonnen hat. Der Start wurde im August 2016 für einen Genesis am 28. Oktober angekündigt, die Ceremony lief in den Wochen davor, und der fest im Genesis-Block codierte Zeitstempel lautet 28. Oktober 2016 um 07:56 UTC.

![Zeitleiste von der Ankündigung im August 2016 über die Parameter-Ceremony bis zum Sprout-Start am 28. Oktober 2016](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| zk-SNARK | Ein Zero-Knowledge-Beweis, der zeigt, dass eine Transaktion gültig ist, ohne Absender, Empfänger oder Betrag offenzulegen |
| Shielded Pool | Der private Bereich von Zcash, in dem Beträge und Beteiligte verborgen sind. Der Sprout-Pool war der erste |
| z-address und t-address | Eine z-address ist abgeschirmt und hält Details privat. Eine t-address ist transparent und zeigt Details im öffentlichen Ledger |
| Die Ceremony | Das Multi-Party-Setup von 2016, das die öffentlichen Parameter von Sprout erzeugte und danach den toxic waste verwarf |
| Toxic waste | Die geheimen Schlüsselteile aus der Ceremony, die zerstört werden mussten, damit ZEC nicht gefälscht werden konnte |
| Consensus branch id 0 | Die Bezeichnung für die Regeln von Sprout, also die Grundlage vor jedem Netzwerk-Upgrade |

## FAQ

Verändert Sprout heute mein ZEC oder meine Privatsphäre? Nein. Sprout ist Geschichte, der Start, mit dem die Chain begann, auf der dein ZEC existiert. Deine Coins und deine Privatsphäre hängen heute von der Wallet und dem abgeschirmten Pool ab, die du jetzt verwendest, nicht von irgendetwas, das du wegen Sprout tun müsstest.

Warum gibt es keine ZIP-Nummer für Sprout? Der ZIP-Prozess begann später, mit dem Overwinter-Upgrade. Sprout ist der ursprüngliche Start, beschrieben durch die Zcash Protocol Specification und die Zerocash-Konstruktion, auf der es basierte. ZIP 200 erwähnt Sprout nur rückblickend als consensus branch id 0, die Grundlage vor jedem Upgrade.

Musste ich den sechs Personen in der Ceremony vertrauen? Das Setup wurde so aufgebaut, dass nur eine von ihnen ehrlich sein musste. Jede hielt ein geheimes Teilstück, und solange ein einzelner Teilnehmer seines zerstörte, konnte das vollständige Geheimnis nie rekonstruiert werden und niemand konnte ZEC fälschen. Fünf Teilnehmer wurden öffentlich benannt, einer blieb anonym.

Ist der Sprout-Pool derjenige, den meine Wallet heute benutzt? Wahrscheinlich nicht. Sprout war der erste abgeschirmte Pool, aber spätere Upgrades wie Sapling führten ein schnelleres abgeschirmtes Design ein, und die meisten Wallets verwenden heute neuere Pools. Sprout bleibt trotzdem wichtig als die Arbeit, die bewies, dass private, verifizierbare Transaktionen in einem live laufenden Netzwerk funktionieren können.

Was unterschied Sprout von Bitcoin? Bitcoin stellt jede Zahlung in ein öffentliches Ledger, in dem Beträge und Adressen sichtbar sind. Sprout fügte abgeschirmte Transaktionen hinzu, die Absender, Empfänger und Betrag verbergen, während das Netzwerk trotzdem bestätigen kann, dass die Transaktion gültig ist. Transparente Adressen blieben ebenfalls erhalten, sodass beide Arten auf derselben Chain existieren.

## Teste dein Verständnis

Sprout wird oft als Netzwerk-Upgrade mit einer Aktivierungshöhe bezeichnet. Warum ist das nicht ganz richtig?

<details>
<summary>Antwort</summary>

Sprout ist der ursprüngliche Start von Zcash, nicht ein späteres Upgrade. Es ist seit dem Genesis-Block (Block 0) am 28. Oktober 2016 aktiv, daher gibt es keine Aktivierungshöhe, auf die man verweisen könnte. Der Netzwerk-Upgrade-Mechanismus kam erst später und bezeichnete die Regeln von Sprout als consensus branch id 0, die Grundlage vor jedem Upgrade.
</details>

### Ressourcen

[ZIP 200: Netzwerk-Upgrade-Mechanismus](https://zips.z.cash/zip-0200)

[Zcash-Netzwerk-Upgrades](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout-Start](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Das Design der Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Siehe auch

[Shielded Pools](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Zcash Netzwerk-Upgrades](../start-here/network-upgrades)

[Was sind ZEC und Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Serie: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Nächstes: [Overwinter](../zcash-tech/overwinter)

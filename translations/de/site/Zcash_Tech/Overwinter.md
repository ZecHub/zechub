---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Overwinter

> Overwinter wurde auf dem Zcash-Mainnet bei Block 347.500 (26. Juni 2018 UTC) aktiviert.

Was du mitnimmst: wie Zcash gelernt hat, seine eigenen Regeln sicher zu ändern, und warum diese Grundlage jedes spätere Upgrade, beginnend mit Sapling, überhaupt erst möglich gemacht hat.

Overwinter ist ein Zcash-[Netzwerk-Upgrade](../start-here/network-upgrades), das erste nach dem Start des Netzwerks. Es ist in mehreren Zcash Improvement Proposals definiert: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) und [ZIP 143](https://zips.z.cash/zip-0143). Overwinter fügte keine neuen Shielded-Features hinzu. Stattdessen machte es das Protokoll robuster, damit künftige Upgrades sicher ausgeliefert werden konnten. Das Upgrade wird von der [Electric Coin Company](../zcash-organizations/electric-coin-company) auf der offiziellen Zcash-Upgrade-Seite dokumentiert.

Warum das wichtig ist. Die Regeln einer laufenden Blockchain zu ändern, ist riskant. Wenn man es falsch macht, können sich zwei Versionen des Netzwerks widersprechen, oder eine für eine Chain gedachte Transaktion kann auf eine andere kopiert werden. Vor Overwinter hatte Zcash keinen standardisierten, replay-sicheren Weg, um eine Regeländerung zu koordinieren. Overwinter hat das behoben. Es gab Zcash einen formalen Prozess für Upgrades und, ebenso wichtig, einen beidseitigen Replay-Schutz, sodass eine Transaktion, die unter einem Regelwerk gültig ist, nicht unter einem anderen erneut abgespielt werden kann. Diese Grundlage hat es ermöglicht, dass Sapling und jedes Upgrade danach sauber aktiviert werden konnten.

![Vor und nach Overwinter: davor kein standardisierter Upgrade-Pfad und kein Replay-Schutz. Danach ein Netzwerk-Upgrade-Mechanismus mit beidseitigem Replay-Schutz und sicheren zukünftigen Upgrades](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Der Upgrade-Mechanismus

Overwinter führte den Network Upgrade Mechanism ein, definiert in [ZIP 200](https://zips.z.cash/zip-0200). Jedes Upgrade definiert nun zwei Dinge: eine Consensus Branch ID, die das aktuelle Regelwerk bezeichnet, und eine Aktivierungshöhe, also den Block, ab dem die neuen Regeln gelten. Das gibt allen, die Zcash-Software betreiben, ein klares Zeitfenster für das Update vor der Umstellung.

Overwinter selbst wurde im Mainnet bei Block 347.500 aktiviert.

[ZIP 201](https://zips.z.cash/zip-0201) regelt, wie Knoten rund um ein Upgrade miteinander umgehen. Vor der Aktivierung verbinden sich Knoten bevorzugt mit Peers, die dieselbe Version ausführen. Bei der Aktivierung trennt ein Knoten die Verbindung zu Peers, die sich auf einem anderen Consensus Branch befinden, sodass sich das Netzwerk sauber entlang der neuen Regeln aufteilt, statt durcheinanderzugeraten.

## Replay-Schutz

Ein Replay liegt vor, wenn jemand eine Transaktion nimmt, die auf einer Chain gültig war, und sie auf einer anderen erneut sendet. Overwinter schließt diese Tür mit einem neuen Signaturschema, definiert in [ZIP 143](https://zips.z.cash/zip-0143). Wenn ein Wallet eine Transaktion signiert, bindet die Signatur nun die Consensus Branch ID der aktuellen Chain ein. Eine für einen Branch signierte Transaktion ist auf keinem anderen Branch gültig – in keine der beiden Richtungen. Genau das bedeutet beidseitiger Replay-Schutz.

Das arbeitet Hand in Hand mit dem neuen Transaktionsformat Version 3 aus [ZIP 202](https://zips.z.cash/zip-0202), das manchmal das Overwintered-Format genannt wird. Es fügt ein fOverwintered-Flag und eine Version Group ID hinzu, die klar machen, zu welchem Satz von Konsensregeln eine Transaktion gehört. Als Nebeneffekt verbesserte das neue Signaturschema auch die Geschwindigkeit, mit der transparente Transaktionen validiert werden.

![So funktioniert Replay-Schutz: Ein Wallet signiert eine Transaktion, die sich auf die aktuelle Consensus Branch ID festlegt, sodass die Transaktion auf keinem anderen Branch erneut abgespielt werden kann](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Ablaufdatum von Transaktionen

[ZIP 203](https://zips.z.cash/zip-0203) führte ein Ablaufdatum für Transaktionen ein. Eine Transaktion kann nun eine Ablauf-Blockhöhe festlegen. Wurde sie bis zu dieser Höhe nicht gemined, entfernen Knoten sie aus dem Mempool, dem Warteraum für unbestätigte Transaktionen. Davor konnte eine Transaktion lange unbestätigt liegen bleiben. Das Ablaufdatum bedeutet, dass eine festhängende Transaktion sich letztlich von selbst erledigt, was die Unsicherheit für dich verringert und verhindert, dass sich der Mempool mit alten, nicht geminten Transaktionen füllt.

## Wo es einzuordnen ist

Overwinter war das erste Zcash-Netzwerk-Upgrade nach dem Mainnet-Start im Oktober 2016 und wurde bewusst vor Sapling ausgeliefert. Seine Aufgabe war Infrastruktur, nicht Features. Indem es zuerst den Upgrade-Mechanismus und die Replay-Schutz-Mechanik einführte, gab es jedem späteren Upgrade (Sapling, Blossom, Heartwood, Canopy, NU5 und den darauffolgenden) einen sicheren Aktivierungspfad.

![Zeitleiste vom Sprout-Start im Oktober 2016 über die Phase von 2016 bis 2018 ohne Upgrade-Framework bis zu Overwinter im Juni 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Glossar

| Begriff | Einfache Bedeutung |
|---|---|
| Netzwerk-Upgrade (NU) | Eine koordinierte Änderung der Konsensregeln von Zcash, aktiviert bei einer festgelegten Blockhöhe |
| Consensus Branch ID | Eine kurze Kennung, die das aktuelle Set von Konsensregeln bezeichnet |
| Aktivierungshöhe | Der Block, ab dem die neuen Regeln eines Netzwerk-Upgrades gelten |
| Replay-Schutz | Eine Regel, die verhindert, dass eine auf einer Chain gültige Transaktion auf einer anderen wiederverwendet wird |
| Mempool | Der Pool von Transaktionen, die gesendet, aber noch nicht in einen Block gemined wurden |
| Ablaufdatum von Transaktionen | Eine Ablauf-Blockhöhe, nach der eine nicht geminte Transaktion verworfen wird |

## FAQ

Hat Overwinter mein ZEC oder meine Privatsphäre verändert? Nein. Overwinter fügte keine neuen Features hinzu und griff nicht in Shielded-Transaktionen ein. Es war die technische Grundlage für sichere zukünftige Upgrades. Deine Mittel und deine Privatsphäre blieben unverändert.

Hat Overwinter Sapling oder Shielded-Adressen hinzugefügt? Nein. Overwinter fügte keine Shielded-Features hinzu. Es bereitete den Boden dafür, dass Sapling später sicher aktiviert werden konnte.

Was ist eine Consensus Branch ID? Es ist eine kurze Bezeichnung für das aktuelle Regelwerk. Transaktionen legen sich beim Signieren darauf fest, und genau das verleiht Zcash seinen Replay-Schutz.

Warum nennen manche Quellen den 25. Juni und andere den 26. Juni? Overwinter wurde am 26. Juni 2018 um 01:37 UTC aktiviert. Das ist kurz nach Mitternacht UTC, daher zeigte die lokale Uhr in vielen westlichen Zeitzonen noch den 25. Juni an. Es ist derselbe Block und derselbe Zeitpunkt.

Wofür ist das Ablaufdatum von Transaktionen gut? Es bedeutet, dass eine Transaktion, die nie gemined wird, nicht ewig hängen bleibt. Nach ihrer Ablaufhöhe verwerfen Knoten sie, sodass du bei einer festhängenden Zahlung nicht im Unklaren bleibst.

Muss ich etwas tun? Nein. Overwinter wurde 2018 aktiviert. Jedes aktuelle Zcash-Wallet oder jeder aktuelle Zcash-Knoten folgt diesen Regeln bereits.

## Teste dein Verständnis

Overwinter fügte keine neuen Shielded-Features hinzu. Warum gilt es trotzdem als eines der wichtigsten Upgrades in der Geschichte von Zcash?

<details>
<summary>Antwort</summary>

Weil es die Mechanik aufgebaut hat, von der jedes spätere Upgrade abhängt. Overwinter führte den Network Upgrade Mechanism und den beidseitigen Replay-Schutz ein und gab Zcash damit einen standardisierten, sicheren Weg, seine Konsensregeln zu ändern. Ohne diese Grundlage hätten Sapling und die darauffolgenden Upgrades nicht sauber aktiviert werden können.
</details>

### Ressourcen

[ZIP 200: Network Upgrade Mechanism](https://zips.z.cash/zip-0200)

[ZIP 201: Network Peer Management for Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Version 3 Transaction Format for Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Transaction Expiry](https://zips.z.cash/zip-0203)

[ZIP 143: Transaction Signature Validation for Overwinter](https://zips.z.cash/zip-0143)

[Overwinter Network Upgrade](https://z.cash/upgrade/overwinter/)

### Siehe auch

[Zcash Netzwerk-Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Vollständige Knoten](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Was sind ZEC und Zcash](../start-here/what-is-zec-and-zcash)

---

Reihe: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige: [Sprout](../zcash-tech/sprout) · Nächste: [Sapling](../zcash-tech/sapling)

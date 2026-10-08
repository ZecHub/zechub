<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 ging am Zcash im Mainnet bei Block 1.687.104 (31. Mai 2022 UTC) live.

Das nehmen Sie mit: wie NU5 Zcash einen neuen abgeschirmten Pool ohne vertrauenswürdiges Setup sowie einen einzigen Adresstyp gab, der poolübergreifend funktioniert.

NU5 (Network Upgrade 5) ist das sechste Zcash [Netzwerk-Upgrade](../start-here/network-upgrades), das durch [ZIP 252](https://zips.z.cash/zip-0252) bereitgestellt wurde. Es ist ein bedeutendes kryptografisches Upgrade. Es führte das abgeschirmte Zahlungsprotokoll Orchard ein, das auf dem Beweissystem Halo 2 basiert, sowie Unified Addresses und ein neues Transaktionsformat der Version 5. NU5 wurde mit der Version v5.0.0 von Electric Coin Company's zcashd ausgeliefert.

Warum das wichtig ist. Ein abgeschirmter Pool ist nur so vertrauenswürdig wie das Setup, durch das er geschaffen wurde. Die ersten beiden abgeschirmten Pools von Zcash, Sprout und Sapling, benötigten jeweils eine einmalige Zeremonie für ein vertrauenswürdiges Setup, um ihre geheimen Parameter zu erzeugen. Wären diese Parameter jemals aufbewahrt statt zerstört worden, hätte jemand gefälschte ZEC erzeugen können, ohne dass es jemand bemerkt. Der Pool Orchard von NU5 beseitigt dieses Risiko durch die Verwendung des Beweissystems Halo 2, das keine solche Zeremonie benötigt.

## Das vertrauenswürdige Setup

Orchard ist das durch NU5 eingeführte abgeschirmte Protokoll, definiert in [ZIP 224](https://zips.z.cash/zip-0224). Es basiert auf dem Beweissystem Halo 2, das eine Technik namens PLONKish-Arithmetisierung auf dem Kurvenzyklus Pallas und Vesta verwendet. Der praktische Nutzen ist einfach: Halo 2 benötigt kein vertrauenswürdiges Setup und keinen strukturierten Referenzstring, sodass es keinen geheimen Parameter gibt, der jemals missbraucht werden könnte.

Sprout und Sapling waren beide von einem vertrauenswürdigen Setup abhängig. Eine Gruppe von Personen führte eine Zeremonie durch, um die Parameter jedes Pools zu erstellen, und alle mussten darauf vertrauen, dass mindestens eine von ihnen ihren Teil des Geheimnisses zerstörte. Orchard beseitigt diese Annahme. Die älteren Pools bestehen nach NU5 weiterhin, daher gilt die Garantie ohne Setup für Guthaben, die Sie im Pool Orchard halten.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Was NU5 geändert hat

NU5 bündelt mehrere Konsensänderungen, die alle gemeinsam bei Block 1.687.104 aktiviert wurden.

1. Es fügte den abgeschirmten Pool Orchard (ZIP 224) hinzu, das oben beschriebene Protokoll auf Basis von Halo 2.
2. Es fügte das Transaktionsformat der Version 5 (ZIP 225) hinzu, ein umstrukturiertes Layout mit getrennten Bereichen für transparente Daten, Sapling und neue Orchard-Daten. Sprout-Felder wurden entfernt, und das ältere Format der Version 4 blieb nach der Aktivierung gültig.
3. Es führte Unified Addresses und einheitliche Viewing Keys ein (ZIP 316), die im nächsten Abschnitt behandelt werden.
4. Es übernahm die Nicht-Manipulierbarkeit von Transaktionskennungen (ZIP 244), eine neue Methode zur Berechnung der ID einer Transaktion, die trennt, was eine Transaktion bewirkt, von den Beweisen und Signaturen, die sie autorisieren.
5. Es übernahm kanonische Jubjub-Punktkodierungen (ZIP 216), um nicht standardmäßige Kodierungen zu entfernen und die Regeln dafür zu verschärfen, was als gültige Transaktion gilt.
6. Es ermöglichte die Weiterleitung von Transaktionen der Version 5 über das Peer-to-Peer-Netzwerk (ZIP 239).

NU5 aktualisierte außerdem eine Reihe bestehender ZIPs (32, 203, 209, 212, 213, 221 und 401), damit sie den neuen Pool Orchard berücksichtigen.

## Unified Addresses

Vor NU5 hatte jeder Pool seinen eigenen Adresstyp, und ein Sender musste wissen, welche Art Sie wollten. Unified Addresses, definiert in [ZIP 316](https://zips.z.cash/zip-0316), ändern das. Eine einzelne Unified Address kann Empfänger für mehr als einen Pool bündeln, sodass die Wallet des Senders einfach den besten unterstützten auswählt.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Einheitliche Viewing Keys funktionieren für die Einsicht auf dieselbe Weise. Sie ermöglichen schreibgeschützte Einsicht über die Pools hinweg, die eine Adresse abdeckt. Weitere Informationen dazu finden Sie auf der Seite [Viewing Keys](../zcash-tech/viewing-keys).

## Wo NU5 steht

NU5 folgte auf die früheren Upgrades von Zcash: Overwinter, Sapling, Blossom, Heartwood und Canopy. Es wurde am 31. Mai 2022 im Mainnet aktiviert. Der Kurvenzyklus von Orchard wurde gewählt, weil er Rekursion unterstützt, was die Grundlage für spätere Skalierungsarbeiten bildet. NU5 ist der direkte Vorgänger der Upgrade-Reihe NU6 und NU6.x, die auf dem Pool Orchard aufbaute und ihn später korrigierte.

## Glossar

| Begriff | Bedeutung in einfacher Sprache |
|---|---|
| Network upgrade (NU) | Eine koordinierte Änderung der Konsensregeln von Zcash, die bei einer festgelegten Blockhöhe aktiviert wird |
| Orchard | Der von NU5 eingeführte abgeschirmte Pool, der auf dem Beweissystem Halo 2 basiert |
| Halo 2 | Das Beweissystem hinter Orchard, das kein vertrauenswürdiges Setup benötigt |
| Trusted setup | Eine einmalige Zeremonie, die die geheimen Parameter eines Pools erstellt und darauf vertrauen muss, dass diese zerstört werden |
| Unified Address | Eine einzelne Adresse, die Empfänger für mehr als einen Pool bündeln kann (ZIP 316) |
| Consensus branch id | Eine Kennung, die markiert, zu welchem Regelwerk eine Transaktion gehört |

## FAQ

Ändert NU5 meine ZEC oder meine Privatsphäre? Nein. NU5 fügte einen neuen abgeschirmten Pool und ein neues Adressformat hinzu. Ihre bestehende ZEC bleibt unverändert, und Ihre Privatsphäre wird nicht eingeschränkt. Wenn Sie Guthaben in Orchard verschieben, erhalten Sie einen Pool, der kein vertrauenswürdiges Setup benötigt.

Was ist Orchard? Orchard ist das durch NU5 eingeführte abgeschirmte Protokoll von Zcash. Es läuft auf dem Beweissystem Halo 2 und benötigt daher keine Zeremonie für ein vertrauenswürdiges Setup.

Muss ich etwas tun? Nein. Eine unterstützte Wallet übernimmt NU5 für Sie. Sie können ältere Adressen weiterhin verwenden und Unified Addresses nutzen, sobald Ihre Wallet sie anbietet.

Was ist eine Unified Address? Eine einzelne Adresse, die Empfänger für mehr als einen Pool enthalten kann. Die Wallet des Senders wählt den Pool aus, den sie unterstützt, sodass Sie nicht für jeden Typ eine andere Adresse weitergeben müssen.

Entfernt NU5 das vertrauenswürdige Setup von meinen älteren Guthaben? Nicht rückwirkend. Orchard benötigt kein vertrauenswürdiges Setup, aber die früheren Parameter des Pools Sapling bestehen nach NU5 weiterhin. Die Garantie ohne Setup gilt für Guthaben im Pool Orchard.

Funktionierte das alte Transaktionsformat nicht mehr? Nein. NU5 fügte das Format der Version 5 hinzu, und das ältere Format der Version 4 blieb nach der Aktivierung gültig.

## Testen Sie Ihr Verständnis

Sprout und Sapling benötigten beide eine Zeremonie für ein vertrauenswürdiges Setup. Was änderte der Pool Orchard von NU5 daran, und warum ist das wichtig?

<details>
<summary>Antwort</summary>

Orchard basiert auf dem Beweissystem Halo 2, das kein vertrauenswürdiges Setup und keinen strukturierten Referenzstring benötigt. Dadurch wird das Risiko beseitigt, dass verbliebene geheime Parameter jemals zum Fälschen von ZEC verwendet werden könnten. Die Garantie gilt für Guthaben im Pool Orchard. Die älteren Parameter von Sapling bestehen nach NU5 weiterhin.
</details>

### Ressourcen

[ZIP 252: Bereitstellung des Network Upgrades NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Abgeschirmtes Protokoll Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Transaktionsformat der Version 5](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Addresses und Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: Version 5.0.0 von zcashd](https://electriccoin.co/blog/new-release-5-0-0/)

### Siehe auch

[Zcash Netzwerk-Upgrades](../start-here/network-upgrades)

[Abgeschirmte Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Serie: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige: [Canopy](../zcash-tech/canopy) · Nächste: [NU6](../zcash-tech/nu6)

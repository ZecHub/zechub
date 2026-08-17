---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 wurde im Zcash-Mainnet bei Block 1.687.104 (31. Mai 2022 UTC) live geschaltet.

Was du mitnimmst: wie NU5 Zcash einen neuen Shielded Pool gab, der kein Trusted Setup benötigt, plus einen einzigen Adresstyp, der poolübergreifend funktioniert.

NU5 (Network Upgrade 5) ist das sechste Zcash-[Netzwerk-Upgrade](../start-here/network-upgrades), eingeführt durch [ZIP 252](https://zips.z.cash/zip-0252). Es ist ein bedeutendes kryptografisches Upgrade. Es führte das Orchard-Protokoll für shielded Zahlungen ein, das auf dem Halo-2-Proving-System basiert, zusammen mit Unified Addresses und einem neuen Transaktionsformat der Version 5. NU5 wurde mit dem Release zcashd v5.0.0 der Electric Coin Company ausgeliefert.

Warum das wichtig ist. Ein Shielded Pool ist nur so vertrauenswürdig wie das Setup, mit dem er erstellt wurde. Die ersten beiden Shielded Pools von Zcash, Sprout und Sapling, benötigten jeweils eine einmalige Trusted-Setup-Zeremonie, um ihre geheimen Parameter zu erzeugen. Wenn diese Parameter jemals aufbewahrt statt zerstört worden wären, hätte jemand gefälschte ZEC erzeugen können, ohne dass es jemand bemerkt. Der Orchard-Pool von NU5 beseitigt dieses Problem, indem er das Halo-2-Proving-System verwendet, das keine solche Zeremonie benötigt.

## Das Trusted Setup

Orchard ist das neueste shielded Protokoll von Zcash, definiert in [ZIP 224](https://zips.z.cash/zip-0224). Es basiert auf dem Halo-2-Proving-System, das eine Technik namens PLONKish-Arithmetisierung auf dem Pallas- und Vesta-Kurvenzyklus verwendet. Der praktische Vorteil ist einfach: Halo 2 benötigt kein Trusted Setup und keinen Structured Reference String, daher gibt es keinen geheimen Parameter, der jemals missbraucht werden könnte.

Sowohl Sprout als auch Sapling hingen von einem Trusted Setup ab. Eine Gruppe von Personen führte eine Zeremonie durch, um die Parameter jedes Pools zu erzeugen, und alle mussten darauf vertrauen, dass mindestens eine davon ihren Teil des Geheimnisses zerstörte. Orchard beseitigt diese Annahme. Die älteren Pools existieren nach NU5 weiterhin, daher gilt die No-Setup-Garantie für Guthaben, die du im Orchard-Pool hältst.

![Vor NU5 benötigten Sprout und Sapling eine Trusted-Setup-Zeremonie. Nach NU5 verwendet der Orchard-Pool das Halo-2-System und benötigt kein Trusted Setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## Was NU5 verändert hat

NU5 bündelt mehrere Konsensänderungen, die alle gemeinsam bei Block 1.687.104 aktiviert wurden.

1. Es fügte den Orchard Shielded Pool hinzu (ZIP 224), das oben beschriebene Halo-2-basierte Protokoll.
2. Es fügte das Transaktionsformat der Version 5 hinzu (ZIP 225), ein umstrukturiertes Layout mit separaten Bereichen für transparente, Sapling- und neue Orchard-Daten. Sprout-Felder wurden entfernt, und das ältere Format der Version 4 blieb nach der Aktivierung gültig.
3. Es führte Unified Addresses und Unified Viewing Keys ein (ZIP 316), die im nächsten Abschnitt behandelt werden.
4. Es übernahm die Nicht-Manipulierbarkeit von Transaktionskennungen (ZIP 244), eine neue Methode zur Berechnung der ID einer Transaktion, die trennt, was eine Transaktion tut, von den Proofs und Signaturen, die sie autorisieren.
5. Es übernahm kanonische Jubjub-Punktkodierungen (ZIP 216), um nicht standardisierte Kodierungen zu entfernen und die Regeln dafür zu verschärfen, was als gültige Transaktion zählt.
6. Es aktivierte die Weiterleitung von Transaktionen der Version 5 über das Peer-to-Peer-Netzwerk (ZIP 239).

NU5 aktualisierte außerdem eine Reihe bestehender ZIPs (32, 203, 209, 212, 213, 221 und 401), damit sie den neuen Orchard-Pool berücksichtigen.

## Unified Addresses

Vor NU5 hatte jeder Pool seinen eigenen Adresstyp, und ein Sender musste wissen, welche Art du wolltest. Unified Addresses, definiert in [ZIP 316](https://zips.z.cash/zip-0316), ändern das. Eine einzige Unified Address kann Receiver für mehr als einen Pool bündeln, sodass das Wallet des Senders einfach den besten auswählt, den es unterstützt.

![Eine Unified Address bündelt Receiver für mehrere Pools: einen transparenten Receiver, einen Sapling-Receiver und einen neuen Orchard-Receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Unified Viewing Keys funktionieren für die Einsicht auf dieselbe Weise. Sie geben schreibgeschützte Sichtbarkeit über die Pools hinweg, die eine Adresse abdeckt. Mehr dazu findest du auf der Seite [Viewing Keys](../zcash-tech/viewing-keys).

## Wo NU5 einzuordnen ist

NU5 folgte auf die früheren Upgrades von Zcash: Overwinter, Sapling, Blossom, Heartwood und Canopy. Es wurde am 31. Mai 2022 im Mainnet aktiviert. Der Kurvenzyklus von Orchard wurde gewählt, weil er Rekursion unterstützt, was die Grundlage für spätere Skalierungsarbeiten bildet. NU5 ist der direkte Vorgänger der Upgrade-Linie NU6 und NU6.x, die auf dem Orchard-Pool aufbaute und ihn später patchte.

## Glossar

| Begriff | Bedeutung in einfachem Englisch |
|---|---|
| Network Upgrade (NU) | Eine koordinierte Änderung der Konsensregeln von Zcash, aktiviert bei einer festgelegten Blockhöhe |
| Orchard | Der Shielded Pool, den NU5 eingeführt hat und der auf dem Halo-2-Proving-System basiert |
| Halo 2 | Das Proving-System hinter Orchard, das kein Trusted Setup benötigt |
| Trusted setup | Eine einmalige Zeremonie, die die geheimen Parameter eines Pools erzeugt und darauf vertrauen muss, dass sie zerstört werden |
| Unified address | Eine einzelne Adresse, die Receiver für mehr als einen Pool bündeln kann (ZIP 316) |
| Consensus branch id | Eine Kennung, die markiert, zu welchem Regelsatz eine Transaktion gehört |

## FAQ

Verändert NU5 meine ZEC oder meine Privatsphäre? Nein. NU5 hat einen neuen Shielded Pool und ein neues Adressformat hinzugefügt. Deine bestehenden ZEC bleiben unverändert, und deine Privatsphäre wird nicht verringert. Wenn du Guthaben in Orchard verschiebst, erhältst du einen Pool, der kein Trusted Setup benötigt.

Was ist Orchard? Orchard ist das shielded Protokoll von Zcash, das mit NU5 eingeführt wurde. Es läuft auf dem Halo-2-Proving-System und benötigt daher keine Trusted-Setup-Zeremonie.

Muss ich irgendetwas tun? Nein. Ein unterstütztes Wallet übernimmt NU5 für dich. Du kannst ältere Adressen weiterverwenden, und du kannst Unified Addresses nutzen, sobald dein Wallet sie anbietet.

Was ist eine Unified Address? Eine einzelne Adresse, die Receiver für mehr als einen Pool enthalten kann. Das Wallet des Senders wählt den Pool aus, den es unterstützt, sodass du nicht für jeden Typ eine andere Adresse herausgeben musst.

Entfernt NU5 das Trusted Setup aus meinen älteren Guthaben? Nicht rückwirkend. Orchard benötigt kein Trusted Setup, aber die früheren Parameter des Sapling-Pools existieren nach NU5 weiterhin. Die No-Setup-Garantie gilt für Guthaben, die im Orchard-Pool gehalten werden.

Hat das alte Transaktionsformat aufgehört zu funktionieren? Nein. NU5 fügte das Format der Version 5 hinzu, und das ältere Format der Version 4 blieb nach der Aktivierung gültig.

## Teste dein Verständnis

Sprout und Sapling benötigten beide eine Trusted-Setup-Zeremonie. Was hat der Orchard-Pool von NU5 daran geändert, und warum ist das wichtig?

<details>
<summary>Antwort</summary>

Orchard basiert auf dem Halo-2-Proving-System, das kein Trusted Setup und keinen Structured Reference String benötigt. Dadurch entfällt das Risiko, dass verbliebene geheime Parameter jemals zur Fälschung von ZEC verwendet werden könnten. Diese Garantie gilt für Guthaben, die im Orchard-Pool gehalten werden. Die älteren Sapling-Parameter existieren nach NU5 weiterhin.
</details>

### Ressourcen

[ZIP 252: Einführung des NU5 Network Upgrade](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)

[ZIP 225: Transaktionsformat der Version 5](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Addresses und Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 Release](https://electriccoin.co/blog/new-release-5-0-0/)

### Siehe auch

[Zcash Netzwerk-Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Serie: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorherige Seite: [Canopy](../zcash-tech/canopy) · Nächste Seite: [NU6](../zcash-tech/nu6)

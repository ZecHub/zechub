<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Sapling

> Sapling wurde bei Block 419.200 (29. Oktober 2018, 02:15 UTC) auf dem Zcash-Mainnet aktiviert.

Das Wichtigste vorweg: Sapling machte private Zcash-Zahlungen schnell und schlank genug, um auf einem Smartphone oder einer Hardware-Wallet zu laufen.

Sapling war das zweite große Netzwerk-Upgrade von Zcash und wurde am zweiten Jahrestag von Zcash aktiviert. Es war ein Konsens-Hard-Fork, der die Art und Weise neu aufbaute, wie shielded (private) Transaktionen zusammengesetzt werden. Die Einführung ist in ZIP 205 definiert, die neuen Regeln für Transaktionssignaturen in ZIP 243, und beides baut auf ZIP 200 auf, dem Mechanismus für Netzwerk-Upgrades. Die vollständigen Details stehen in der Zcash Protocol Specification. Electric Coin Company entwickelte das Upgrade und veröffentlichte im August 2018 mit zcashd 2.0.0 die erste Version, die es unterstützte. On-Chain identifiziert das Netzwerk die Sapling-Regeln anhand seiner consensus branch id.

Warum das wichtig ist. Vor Sapling bedeutete eine wirklich private Zahlung, Minuten zu warten, während dein Computer Gigabytes an Speicher verbrauchte, um den Proof zu erzeugen. Das war für die meisten Menschen zu langsam und zu ressourcenintensiv, deshalb übersprangen viele Nutzer, Börsen und Shops shielded Transaktionen und sendeten ZEC stattdessen offen. Sapling reduzierte den Aufwand auf wenige Sekunden und etwa 40 Megabyte Speicher. Diese eine Änderung machte shielded ZEC erstmals alltagstauglich – auf gewöhnlichen Smartphones und auf Hardware-Wallets.

## Was sich geändert hat

Das Herzstück von Sapling ist eine schnellere Methode, den Zero-Knowledge-Proof zu erzeugen, der eine shielded Transaktion privat hält. Das ursprüngliche Sprout-Design verwendete einen einzigen Proving-Circuit (den JoinSplit-Circuit), der langsam und speicherhungrig war. Sapling ersetzte ihn durch zwei speziell dafür entwickelte Circuits, einen Spend-Circuit und einen Output-Circuit, die in der Zcash Protocol Specification beschrieben sind. Das Ergebnis ist ein deutlicher Kostenrückgang. Laut Electric Coin Company kann eine shielded Transaktion in nur wenigen Sekunden mit etwa 40 Megabyte Speicher erzeugt werden. Vor Sapling war die Sprout-Basis deutlich schwergewichtiger – in der Größenordnung von Minuten und mehreren Gigabyte Speicher (diese Zahlen für Sprout sind die weithin zitierte ungefähre Referenz).

![Kosten von shielded Transaktionen: Sprout versus Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Neue Schlüssel

Sapling führte auch einen neuen Satz shielded Adressen und Schlüssel ein. Ein Schlüssel kann viele diversifizierte Adressen ableiten, also getrennte Zahlungsadressen, die ein externer Beobachter nicht miteinander in Verbindung bringen kann. Sapling fügte außerdem Viewing Keys hinzu: Ein vollständiger oder eingehender Viewing Key erlaubt es dir, die Möglichkeit zu teilen, die Transaktionsdetails einer Wallet einzusehen, ohne die Möglichkeit zum Ausgeben ihrer Mittel weiterzugeben. Das ist nützlich für Audits, Buchhaltung oder einfach als Nachweis, dass eine Zahlung erfolgt ist.

Eine damit verbundene Änderung ist, dass Sapling die Aufgabe, den Proof zu erzeugen, von der Aufgabe trennte, die Transaktion zu signieren. Das Gerät, das den Zero-Knowledge-Proof erstellt, muss nicht länger das Gerät sein, das die Ausgabeberechtigung hält. Diese Entkopplung ermöglicht es einer Hardware-Wallet, deinen Spending Key isoliert zu halten, während ein separates Gerät die aufwendigere Proof-Erzeugung übernimmt.

![Ein Proving-Gerät übergibt den Proof an ein separates Signiergerät](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Das Trusted Setup

Die Circuits von Sapling beruhen auf einem Satz öffentlicher Parameter, die sorgfältig erzeugt werden mussten. Hätte eine einzelne Partei sie allein erstellt und die übrig gebliebenen geheimen Daten (den „toxic waste“) behalten, hätte diese Partei Proofs fälschen können. Um das zu vermeiden, stammen die Parameter aus einer zweiphasigen Zeremonie mit mehreren Teilnehmern. Phase 1, genannt Powers of Tau, war circuit-agnostic, also nicht an die spezifischen Circuits von Sapling gebunden. Phase 2, die Sapling MPC, war circuitspezifisch. Jede Phase bleibt sicher, solange mindestens ein Teilnehmer ehrlich war und seinen toxic waste vernichtet hat. Die Zeremonie scheitert also nur, wenn ausnahmslos alle Teilnehmer zusammenarbeiten.

## Wie es aktiviert wurde

Sapling folgte auf Overwinter, das Upgrade vom Juni 2018, das den Upgrade-Mechanismus des Netzwerks vorbereitete. Electric Coin Company legte die Aktivierungshöhe des Mainnets in zcashd 2.0.0 fest, das im August 2018 veröffentlicht wurde, und das Netzwerk wechselte zu den Sapling-Regeln, als Block 419.200 gemined wurde. On-Chain ist dieser Moment durch die Sapling consensus branch id markiert.

![Zeitleiste von der Einführung von Zcash bis zur Aktivierung von Sapling](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Glossar

| Begriff | Bedeutung in einfachem Deutsch |
|---|---|
| Shielded transaction | Eine private Zcash-Transaktion, die Absender, Empfänger und Betrag verbirgt. |
| Sprout | Das ursprüngliche shielded Protokoll, mit dem Zcash gestartet ist, langsamer und schwergewichtiger als Sapling. |
| Spend- und Output-Circuits | Die zwei neuen Proving-Circuits von Sapling, die den einzelnen JoinSplit-Circuit von Sprout ersetzten. |
| Diversifizierte Adresse | Eine von vielen nicht verknüpfbaren Zahlungsadressen, die du aus einem einzigen Schlüssel ableiten kannst. |
| Viewing Key | Ein Schlüssel, der es jemandem erlaubt, die Transaktionen einer Wallet zu sehen, ohne daraus Geld ausgeben zu können. |
| Consensus branch id | Ein kurzer Code, der dem Netzwerk mitteilt, welchen Upgrade-Regeln eine Transaktion folgt. |

## FAQ

Hat Sapling verändert, wie viel ZEC ich besitze? Nein. Sapling änderte, wie shielded Transaktionen erstellt werden, nicht die Menge an ZEC, die irgendjemand hält, oder das Gesamtangebot. Dein Guthaben blieb unverändert.

Ist mein ZEC nach Sapling immer noch privat? Ja, und besser nutzbar. Sapling behielt die starke Privatsphäre shielded Transaktionen bei und machte sie schnell und günstig genug, um sie tatsächlich zu verwenden. Shielded Guthaben bleiben auf dieselbe Weise verborgen.

Muss ich irgendetwas tun? Nein, du musst als Inhaber nichts unternehmen. Sapling war ein Netzwerk-Upgrade, das von Wallet- und Knoten-Software übernommen wurde. Moderne Wallets unterstützen Sapling-Adressen bereits.

Was ist der Unterschied zwischen Sprout und Sapling? Sprout war das erste shielded Protokoll und nutzte einen langsamen, speicherintensiven Proving-Circuit. Sapling ersetzte ihn durch schnellere Spend- und Output-Circuits, fügte Viewing Keys und diversifizierte Adressen hinzu und machte shielded Transaktionen schlank genug für Smartphones und Hardware-Wallets.

Warum nennen manche Quellen den 28. Oktober und andere den 29. Oktober? Die Aktivierungshöhe wurde im Voraus festgelegt und zielte auf den 28. Oktober 2018. Der Block, der die Änderung tatsächlich auslöste – Block 419.200 –, wurde in den frühen Stunden des 29. Oktober UTC gemined. In vielen lokalen Zeitzonen war das noch der 28. Oktober. Es ist in beiden Fällen derselbe Block und derselbe Moment.

Was ist ein Viewing Key? Ein Viewing Key erlaubt es dir, Lesezugriff auf eine shielded Wallet zu teilen. Jemand mit einem vollständigen oder eingehenden Viewing Key kann die Transaktionsdetails der Wallet sehen, aber ihre Mittel nicht ausgeben. Siehe [Viewing Keys](../zcash-tech/viewing-keys) für mehr dazu.

## Teste dein Verständnis

Warum mieden unter Sprout so viele Menschen shielded Transaktionen, und wie hat Sapling das behoben?

<details>
<summary>Antwort</summary>
Unter Sprout dauerte das Erstellen einer shielded Transaktion Minuten und verbrauchte Gigabytes an Speicher, sodass es für die meisten Nutzer, Börsen und Shops zu langsam und zu schwergewichtig war. Sapling führte schnellere Spend- und Output-Circuits ein, die den Aufwand auf wenige Sekunden und etwa 40 Megabyte reduzierten, wodurch shielded Transaktionen auf alltäglichen Smartphones und Hardware-Wallets praktikabel wurden.
</details>

### Ressourcen

- [ZIP 205: Einführung des Sapling Network Upgrade](https://zips.z.cash/zip-0205)
- [ZIP 243: Validierung von Transaktionssignaturen für Sapling](https://zips.z.cash/zip-0243)
- [Zcash-Seite zum Sapling-Upgrade](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Ankündigung von Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Ankündigung der Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Siehe auch

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Zcash-Netzwerk-Upgrades](../start-here/network-upgrades)
- [Wallets](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Reihe: [Index der Netzwerk-Upgrades](../start-here/network-upgrades) · Vorher: [Overwinter](../zcash-tech/overwinter) · Nächste: [Blossom](../zcash-tech/blossom)

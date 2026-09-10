<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/Valar_Group.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Valar Group

[Website besuchen](https://valargroup.dev/)

<<img width="200" height="200" alt="254678133" src="https://github.com/user-attachments/assets/0dc8c697-bcad-492a-b024-89b502d27af4" />


## Leitbild

Valar Group ist eine unabhängige Engineering-Organisation, die sich auf die Skalierung von Zcash, die Stärkung der Governance von Coin-Inhabern und die Verbesserung von Datenschutz, Leistung und langfristiger Widerstandsfähigkeit des Protokolls konzentriert.

Ihre Arbeit konzentriert sich auf Infrastruktur auf Protokollebene: privates Voting von Token-Inhabern, leistungsstarke Software für vollständige Knoten, Wallet-Sync-Technologie und Netzwerk-Upgrades, die abgeschirmtes Zcash in größerem Maßstab besser nutzbar machen.

Die Organisation will ZEC-Inhabern eine Möglichkeit geben, Präferenzen privat auszudrücken, Knotenbetreibern schnellere und leistungsfähigere Software bereitstellen und Wallets Werkzeuge geben, die die Privatsphäre der Nutzer bewahren und zugleich die Kosten der Teilnahme am Netzwerk senken.

## Hintergrund

Valar Group wird von Dev Ojha (ValarDragon) geleitet, einem Mitgründer von Osmosis und Mitglied des Teams, das Cosmos gestartet hat. Im vergangenen Jahrzehnt hat er mit zk-SNARKs, BFT-Konsens und DeFi-Systemen im Produktionseinsatz gearbeitet.

Die öffentliche Arbeit der Gruppe an Zcash wurde bekannt, als sich das Ökosystem nach der Reorganisation der Kernentwicklung im Jahr 2026 unabhängigen Protokollteams zuwandte. Valar Group entwickelte sich neben Project Tachyon, Shielded Labs, ZODL und der Zcash Foundation zu einer der Organisationen, die die nächste Generation der Zcash-Infrastruktur aufbauen.

Ein wiederkehrendes Thema ihrer Arbeit ist, dass sich die Datenschutzeigenschaften von Zcash über Zahlungen hinaus erstrecken sollten. Wenn Inhaber über Ausgabe, Blockzeiten oder den Umfang von Netzwerk-Upgrades abstimmen sollen, sollten sie dies aus abgeschirmten Guthaben heraus tun können, ohne Identitäten, Guthaben oder einzelne Stimmen offenzulegen. Diese Anforderung veranlasste Valar Group dazu, eine spezielle Voting-Chain für Coin-Inhaber zu entwickeln und bereitzustellen.

Der gleiche Hintergrund in Skalierung und Kryptografie prägte auch ihre Arbeit an Knoten und Synchronisierung. Schnellere Blöcke, leichtere Wallet-Synchronisierung und ein leistungsfähigerer vollständiger Knoten werden als Voraussetzungen für privates Geld betrachtet, das im Maßstab von Zahlungsnetzwerken genutzt werden kann und nicht nur als Wertspeicher.

## Vision

Die öffentlichen Materialien und Projektarbeiten von Valar Group weisen auf ein Zcash-Netzwerk hin, das:

- Private, auditierbare Abstimmungen von Coin-Inhabern als wiederholbaren Governance-Prozess unterstützt.
- Proof-of-Work-Zahlungen skaliert, ohne abgeschirmte Privatsphäre zu beeinträchtigen.
- Engpässe bei Wallets und Knoten durch PIR, Pruning und schnellere Blockweiterleitung verringert.
- Die Implementierungsvielfalt erhöht, indem es einen unabhängigen Stack für vollständige Knoten bereitstellt.
- Zur Post-Quantum-Bereitschaft und zu formal geprüften Protokoll-Upgrades beiträgt.

Die Organisation arbeitet als unabhängiger Mitwirkender, nicht als Eigentümer des Protokolls. Protokolländerungen durchlaufen weiterhin ZIPs, Implementierung, Überprüfung und Signale aus der Community. Die Rolle von Valar Group besteht darin, die Systeme zu entwerfen, zu implementieren, zu betreiben und als Open Source bereitzustellen, die diese Prozesse praktikabel machen.

## Strategische Bereiche

Die Arbeit von Valar Group konzentriert sich auf vier Bereiche.

### Private Governance von Coin-Inhabern

Zcash verwendet keine automatische On-Chain-Steuerung des Protokolls. Umfragen unter Coin-Inhabern sind beratende Signale, die in einen umfassenderen Prozess groben Konsenses einfließen. Valar Group entwickelte die Tokenholder Voting Chain, damit diese Signale aus abgeschirmten Guthaben gesammelt werden können, ohne die Identität der Wähler oder die Größe einzelner Stimmen offenzulegen.

Das aktuelle Design verwendet:

- Eine dedizierte Cosmos-SDK-Anwendungs-Chain zur Orchestrierung von Abstimmungsrunden.
- Snapshot-Proofs gegen ausgebbare Ironwood-Notes.
- Homomorphe Verschlüsselung der Stimmabgabemengen.
- Private Information Retrieval für Nullifier-Nichtmitgliedschafts-Proofs.
- Ein Koordinator-Multisig und eine verteilte Wahlbehörde.

Das Ziel ist, frühere Voting-Prozesse für Token-Inhaber durch ein wiederverwendbares, auditiertes und in Wallets integrierbares System zu ersetzen, das andere Organisationen betreiben und unabhängig auszählen können.

### Knoten-Software und Netzwerkskalierung

Valar Group arbeitet mit Project Tachyon an Zakura zusammen, einem Zcash-vollständigen Knoten, der auf der Zebra-Codebasis aufbaut. Zakura ist als leistungsstarker Knoten für Betreiber positioniert, die schnellere Erstsynchronisierung, Pruning, Snapshot-Bootstrapping und einen Kompatibilitätspfad für frühere `zcashd`-Nutzer benötigen.

Verwandte Skalierungsarbeit umfasst:

- Schnellere Ziel-Blockzeiten, einschließlich Experimenten mit 25-Sekunden-Blöcken auf NU7-Testnets.
- Verbesserte Peer-to-Peer-Blockweiterleitung.
- Funktionen für vollständige Knoten, die Zcash nutzbar halten sollen, während die abgeschirmte Aktivität wächst.

### Wallet- und Sync-Infrastruktur

Abgeschirmte Wallets mussten historisch große Mengen an Chain-Daten scannen. Valar Group entwickelt PIR-Systeme, damit Wallets die benötigten Proofs abrufen können, ohne vollständige Nullifier-Sets herunterzuladen oder offenzulegen, für welche Notes sie sich interessieren.

Diese Arbeit erscheint sowohl im Voting-Stack als auch in breiterer Forschung zur Wallet-Synchronisierung. Die Gruppe hat außerdem zur Zuverlässigkeit auf Wallet-Seite beigetragen, einschließlich der Einreichung von Transaktionen über mehrere Server und Verbesserungen bei der Serverauswahl, die im mobilen Stack von ZODL verwendet werden.

### Protokoll-Upgrades und Koordination im Ökosystem

Valar Group war eine der Organisationen, die sich nach der Orchard-Circuit-Schwachstelle öffentlich zur Ironwood-Reaktion verpflichteten. Ironwood führte einen neuen abgeschirmten Pool ein, versiegelte den ursprünglichen Orchard-Pool hinter einem Turnstile und stellte einen Weg zur unabhängigen Überprüfung des umlaufenden Angebots wieder her. Valar Group arbeitete mit Project Tachyon, Shielded Labs, ZODL und der Zcash Foundation an Architektur, der Implementierung von Konsensregeln und der Koordination im Ökosystem.

Die Gruppe beteiligt sich außerdem an der Festlegung des Umfangs von NU7, dem Betrieb von Testnets und der Bearbeitung von ZIPs. Dev Ojha ist als ZIP-Editor aufgeführt.

## Aktuelle Initiativen

### Tokenholder Voting Chain / Shielded Vote

Shielded Vote ist das private Governance-Protokoll von Valar Group für Zcash. Inhaber stimmen mit abgeschirmten Guthaben ab, ohne einzelne Mengen offenzulegen oder Stimmen mit Identitäten zu verknüpfen.

Zu den wichtigsten Eigenschaften gehören:

- Eine Online-Sitzung zur Stimmabgabe statt eines mehrtägigen Commit/Reveal-Prozesses.
- Eine Keystone-kompatible Snapshot-Signatur, die Stimmrechte an einen Hotkey delegiert, ohne Gelder zu gefährden.
- Verschlüsselte Stimmabgabemengen mit homomorphem ElGamal.
- PIR-Anfragen, damit Nullifier bei Snapshot-Proofs nicht preisgegeben werden.
- Aufteilung von Stimmen und verzögerte Relay-Übermittlung zur Verringerung zeitlicher Korrelation.
- Öffentlich auditierbare Auszählungen.

Im August 2026 nutzten Valar Group und Project Tachyon diesen Stack für die NU7-Abstimmung der Coin-Inhaber. Die Teilnahmeberechtigung erforderte ausgebbare abgeschirmte ZEC in Ironwood bei Mainnet-Höhe 3.459.350. Die Abstimmung lief vom 25. August bis zum 14. September 2026, mit einem Beteiligungsschwellenwert von 1.000.000 ZEC, damit das Ergebnis als repräsentativ gilt. Die Fragen betrafen die Glättung der NSM-Ausgabe, den Zeitpunkt der Wiederemission, die Deprecation von Sprout/v4, 25-Sekunden-Blockzeiten sowie Umfang und Bereitschaft von NU7.

Die Koordination der Default-Chain verwendet ein 2-von-5-Multisig zwischen Project Tachyon, Valar Group, der Zcash Foundation, ZODL und Shielded Labs. Ein separates Validator-Set hält pro Runde Anteile der Entschlüsselungsschlüssel. Kein einzelner Validator kann individuelle Stimmen wiederherstellen; zur Erstellung der endgültigen Auszählung ist ein Schwellenwert von Validatoren erforderlich.

Öffentliche Oberflächen für Betreiber und Auditoren umfassen:

- [Einrichtung der Voting-Chain](https://setup.valargroup.org)
- [Auszählungs-Auditor](https://tally.valargroup.org)
- [Koordinator-UI](https://svote.valargroup.org/)
- [Einrichtung des PIR-Servers](https://setup-pir.valargroup.org)
- [Shielded Vote-Dokumentation](https://valargroup.gitbook.io/shielded-vote-docs)

### Zakura

Zakura ist ein Zcash-vollständiger Knoten, der in Zusammenarbeit zwischen Valar Group und Project Tachyon entwickelt wurde. Er leitet sich von Zebra ab und ergänzt schnellere Synchronisierung, natives Pruning, Snapshot-Bootstrapping, `zcashd`-Kompatibilitätspfade und experimentelle leistungsstarke P2P-Arbeit.

Die Zcash Foundation begrüßte das Projekt öffentlich und merkte an, dass Zebra unter freizügigen Lizenzen veröffentlicht wurde, damit unabhängige Teams es forken und verbessern können, und dass mehrere Zakura-Mitwirkende bereits Upstream zu Zebra beigetragen hatten.

### Private Information Retrieval

Valar Group betreibt PIR-Dienste und -Bibliotheken für zwei verwandte Probleme:

- Nachweis, dass eine Note auf einer Snapshot-Höhe nicht ausgegeben war, ohne ihren Nullifier offenzulegen.
- Verringerung der Datenmenge, die Wallets abrufen müssen, um zu synchronisieren oder abzustimmen.

Dies ist eine Kernabhängigkeit von Shielded Vote und ein Baustein für schnellere private Wallet-UX.

### Ironwood- und NU7-Engineering

Valar Group war Teil der gemeinsamen Verpflichtung zu Ironwood im Juni 2026 und trug zur Implementierung von Konsensregeln sowie zur Client-Arbeit rund um den neuen Pool bei. Sie betrieb auch NU7-Testnet-Infrastruktur, einschließlich Join-Skripten und öffentlichen Knoten unter `nu7.valargroup.dev`.

### Open-Source-Protokollbibliotheken

Die GitHub-Organisation `valargroup` veröffentlicht den Voting- und Knoten-Stack als öffentliche Repositories, darunter:

- [`vote-sdk`](https://github.com/valargroup/vote-sdk) — anwendungsspezifische Chain für privates On-Chain-Voting
- [`zcash_voting`](https://github.com/valargroup/zcash_voting) — clientseitige Bibliothek für abgeschirmtes Voting, Proofs, Speicherung und FFI
- [`voting-circuits`](https://github.com/valargroup/voting-circuits) — Halo2-Delegierungs- und Voting-Circuits
- [`vote-nullifier-pir`](https://github.com/valargroup/vote-nullifier-pir) — PIR für Nullifier-Nichtmitgliedschafts-Proofs
- [`token-holder-voting-config`](https://github.com/valargroup/token-holder-voting-config) — Konfiguration zur Dienstermittlung für Wallets
- [`zebra`](https://github.com/valargroup/zebra) — Entwicklungs-Fork von Zebra/Zakura von Valar Group

## Die Teams

Valar Group wird von **Dev Ojha** (ValarDragon) geleitet. Öffentliche Teamseiten zu Zakura führen die folgenden Valar-verbundenen Ingenieure auf:

- **Dev Ojha** — Maintainer; leitet Valar Group. Zu den Schwerpunktbereichen gehören Voting von Token-Inhabern, Post-Quantum-Arbeit, Zakura und PIR.
- **Roman Akhtariev** — Principal Engineer. Zuvor Principal Engineer bei Osmosis; seine Arbeit umfasst PIR-Wallet-Sync, Voting von Token-Inhabern und Zakura-Sync-Leistung.
- **Evan Forbes** — Principal Engineer. Ehemaliger Celestia-Konsensleiter und Gründungsingenieur; seine Arbeit umfasst die Bereitschaft für schnellere Blockzeiten und einen QUIC-P2P-Stack.
- **Adam Tucker** — Principal Engineer. Ehemaliger Osmosis-Ingenieur; seine Arbeit umfasst Voting von Token-Inhabern mit Roman Akhtariev, Wallet-Zuverlässigkeit und Ironwood-Integration über den gesamten Stack.

Zakura selbst wird gemeinsam mit Project Tachyon unter Leitung von Sean Bowe betreut. Die beiden Organisationen arbeiten eng zusammen, bleiben jedoch getrennt.

## Organisationsstruktur

Valar Group arbeitet als unabhängige Engineering-Organisation. Sie ist nicht Teil der Zcash Foundation, von ZODL, Shielded Labs oder Zcash Community Grants.

Im Design der Voting-Chain ist Valar Group eine von fünf Koordinatororganisationen. Diese Rolle ist ein Parameter des Voting-Systems und kein Anspruch auf ausschließliche Kontrolle über die Zcash-Governance. Andere Teams können Validatoren betreiben, alternative Voting-Chains aufsetzen oder veröffentlichte Auszählungen über die öffentlichen Werkzeuge auditieren.

Zusätzliche Informationen über den Rechtsformtyp, die Zusammensetzung des Vorstands und die interne Governance wurden nicht mit derselben Detailtiefe veröffentlicht wie bei älteren Zcash-Organisationen.

## Finanzierung

Öffentliche Forumsbeiträge aus der Mitte des Jahres 2026 beschreiben Valar Group und Project Tachyon als durch private Spenden finanziert. Anders als die offengelegte Venture-Runde von ZODL oder die öffentlichen Spendenankündigungen von Shielded Labs hat Valar Group keine detaillierte Liste von Spendern oder einen Grant-Zeitplan veröffentlicht.

Dieses Finanzierungsmodell hält das Team unabhängig vom historischen Development-Fund-/Block-Reward-Pfad, bedeutet jedoch auch weniger öffentliche Transparenz über Budgetgröße und Finanzierungsquellen.

## Rolle im Zcash-Ökosystem

Valar Group ist eine der unabhängigen Protokollorganisationen, die sich in der Zcash-Entwicklungslandschaft von 2026 gebildet haben. In dieser Landschaft:

- Die **Zcash Foundation** setzt ihre Verantwortung für die Community und Zebra fort.
- **ZODL** konzentriert sich auf Wallet-Produkte und die Fortführung des Protokolls nach der ECC-Abspaltung.
- **Shielded Labs** konzentriert sich auf Nachhaltigkeit, Sicherheit und Konsensforschung.
- **Project Tachyon** konzentriert sich auf Rekursion, formale Verifikation und langfristige Skalierbarkeit.
- **Valar Group** konzentriert sich auf privates Voting von Coin-Inhabern, Knotenleistung, PIR und das Engineering, das zum Betrieb dieser Systeme in Produktion erforderlich ist.

Ihr besonderer Beitrag besteht darin, abgeschirmte Governance operativ nutzbar zu machen. Die NU7-Abstimmung ist die erste bedeutende Nutzung dieses Stacks: Inhaber weisen Ironwood-Guthaben nach, Wallets wie Zodl und Vizor können den Ablauf integrieren, und jeder kann die Auszählung auditieren, ohne zu erfahren, wie ein bestimmter Inhaber abgestimmt hat.

Die Knoten- und Sync-Arbeit desselben Teams soll die andere Hälfte dieses Bildes unterstützen. Privates Voting ist weniger nützlich, wenn Wallets nicht synchronisieren können, Knoten nicht mithalten können oder Upgrades nicht schnell implementiert werden können. Valar Group betrachtet Governance, Knoten-Software und Wallet-Infrastruktur als ein Problem: privates Zcash im großen Maßstab nutzbar machen, ohne operative Macht in einer einzelnen Organisation zu konzentrieren.

## Ressourcen

- [Valar Group-Website](https://valargroup.dev/)
- [Valar Group GitHub](https://github.com/valargroup)
- [Shielded Vote-Dokumentation](https://valargroup.gitbook.io/shielded-vote-docs)
- [Einrichtung der Voting-Chain](https://setup.valargroup.org)
- [Auszählungs-Auditor](https://tally.valargroup.org)
- [Koordinator-UI](https://svote.valargroup.org/)
- [Zakura](https://zakura.com/)
- [Zakura über / Team](https://zakura.com/about/)
- [Forumsthread zur NU7-Abstimmung der Coin-Inhaber](https://forum.zcashcommunity.com/t/nu7-token-holder-vote/56912)
- [Forumsthread zur Coinholder Voting Chain](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925)

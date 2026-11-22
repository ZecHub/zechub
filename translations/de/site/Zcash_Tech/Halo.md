<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Halo

## TL;DR

Halo ist ein vertrauensloses, rekursives Zero-Knowledge-Proof-System (ZKP), das von Sean Bowe bei Electric Coin Co entdeckt wurde. Es macht ein vertrauenswürdiges Setup überflüssig und ermöglicht eine praktische rekursive Zusammensetzung von Beweisen, die Grundlage der aktuellen Roadmap von Zcash für Skalierbarkeit und Sicherheit.

- **Was es ist:** eine zk-SNARK-Konstruktion mit effizienter Rekursion und keiner Zeremonie für ein vertrauenswürdiges Setup.
- **Warum es wichtig ist:** Der Orchard-Shielded-Pool von Zcash, der 2022 mit NU5 aktiviert wurde, läuft auf Halo 2 — der Produktionsimplementierung dieser Forschung.
- **Wesentliche Eigenschaft:** kein „toxic waste“ aus Setup-Zeremonien sowie Beweise, die für praktisch unbegrenzt viele andere Beweise bürgen können.
- **Lizenzierung:** Halo 2 ist unter [MIT und Apache 2.0](https://github.com/zcash/halo2#readme) Open Source, sodass alle im Ökosystem darauf aufbauen können.

---

## Kernerklärung

Halo ist ein vertrauensloses, rekursives Zero-Knowledge-Proof-System, das von Sean Bowe bei Electric Coin Co entdeckt wurde. Es beseitigt das vertrauenswürdige Setup und ermöglicht eine größere Skalierbarkeit der Zcash-Blockchain. Halo war das erste Zero-Knowledge-Proof-System, das sowohl effizient als auch rekursiv ist — weithin als wissenschaftlicher Durchbruch angesehen.

![halo](/content-images/_unavailable.svg "halo")

### Die zwei Komponenten

- **Prägnantes polynomiales Commitment-Schema.** Ermöglicht es einem Committer, sich mit einer kurzen Zeichenfolge auf ein Polynom festzulegen, die ein Verifizierer verwenden kann, um behauptete Auswertungen des festgelegten Polynoms zu bestätigen.
- **Polynomial Interactive Oracle Proof.** Der Verifizierer fordert den Prover (einen Algorithmus) auf, mithilfe des polynomialen Commitment-Schemas alle Commitments an Punkten seiner Wahl zu öffnen, und prüft, dass die Identität zwischen ihnen gilt.

### Kein vertrauenswürdiges Setup

Einige zk-SNARK-Konstruktionen wie Groth16 erfordern ein vertrauenswürdiges Setup, um ihre öffentlichen Parameter zu erzeugen, die häufig als gemeinsame Referenzzeichenfolge (CRS) bezeichnet werden. Die CRS wird mit Beweiserstellern und Verifizierern geteilt; sie ist nicht das Geheimnis, das zerstört werden muss. Das geheime Zwischenmaterial („toxischer Abfall“), das durch ein solches Setup entsteht, muss verworfen werden. Eine sichere Mehrparteienberechnung kann dieses Vertrauen verteilen: Die Zeremonie ist sicher, wenn mindestens ein Teilnehmer dem Protokoll folgt und seinen geheimen Beitrag zerstört. Siehe die [Erklärung von ECC zu öffentlichen Parametern und toxischem Abfall](https://zodl.com/snark-parameters/).

Die früheren Sprout- und Sapling-Shielded-Pools von Zcash nutzten jeweils die Beweissysteme mit vertrauenswürdigem Setup BCTV14 und Groth16. Ihre öffentlichen Parameter stehen weiterhin für die Beweisführung und Verifizierung zur Verfügung. Die Sorge besteht darin, ob geheimes Setup-Material aufbewahrt wurde, das falsche Beweise ermöglichen könnte; die Veröffentlichung des CRS selbst wird erwartet und legt dieses geheime Material nicht offen.

Halo kombiniert rekursive Beweiskomposition mit einem auf einem Inner-Product-Argument basierenden Polynomial-Commitment-Schema. Seine öffentlichen Parameter erfordern weder eine vertrauenswürdige Setup-Zeremonie noch die Zerstörung einer geheimen Setup-Hintertür. Das Buch [Halo 2 beschreibt diese öffentlichen Gruppenparameter](https://zcash.github.io/halo2/background/pc-ipa.html#setup). Dies unterscheidet sich davon, eine durch eine Zeremonie erzeugte strukturierte Referenzzeichenfolge aktualisierbar zu machen.

Durch den Wegfall dieser Setup-Anforderung entfällt die Abhängigkeit von der Zerstörung geheimen Zeremonienmaterials für Halo-Beweise. Dadurch wird weder nachgewiesen, dass eine frühere Sprout- oder Sapling-Zeremonie nicht kompromittiert wurde, noch zertifiziert, dass alle späteren Protokolländerungen sicher sind. Rekursive Beweise bestätigen die in ihren Schaltkreisen kodierten Berechnungen unter den Annahmen des Beweissystems. Korrekte Schaltkreise und Implementierungen bleiben weiterhin wichtig; ECCs Erklärung zur Bereitstellung von [Halo 2](https://zodl.com/technical-explainer-halo-on-zcash/) weist ausdrücklich auf das Risiko neuer Bugs oder Designfehler hin.

[Sean Bowe's Erklärung bei Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visualisierung / Analogie

### Die Notarkette

Stellen Sie sich einen gewöhnlichen zk-SNARK als notariell beglaubigtes Dokument vor: ein Stempel, eine Überprüfung, fertig. Stellen Sie sich nun vor, Sie müssten nachweisen, dass ein Stapel aus zehntausend Dokumenten echt ist. Ohne Rekursion müsste ein Verifizierer jeden Stempel prüfen.

Halo verwandelt jedes verifizierte Dokument in einen Stempel auf dem *nächsten* Dokument, bis der gesamte Stapel zu einem einzigen Dokument mit einem einzigen Stempel zusammenfällt. Die Prüfung des letzten Dokuments genügt, um der gesamten Kette zu vertrauen — und entscheidend ist, dass der Notar von Halo (das Proving-System) seine eigenen Stempel herstellt, ohne jemals eine externe Autorität zu benötigen, die sein Siegel einrichtet.

### Warum das Entfernen des vertrauenswürdigen Setups wichtig ist

In älteren Systemen mit vertrauenswürdigem Setup stammte das öffentliche „Siegel“ (die CRS) aus einer Zeremonie. Die Teilnehmenden mussten ihr geheimes Zwischenmaterial vernichten und gleichzeitig die öffentlichen Parameter verfügbar halten. Halo vermeidet diese Zeremonie und ihre geheime Setup-Hintertür. Dadurch entfällt nicht die Notwendigkeit, die Ausgabeschlüssel der Nutzer zu schützen oder die Annahmen und Implementierung des Beweissystems zu überprüfen.

---

## Tiefgehende Betrachtung

### Rekursive Beweise

Die rekursive Zusammensetzung von Beweisen ermöglicht es einem einzigen Beweis, die Korrektheit praktisch unbegrenzt vieler anderer Beweise zu bestätigen und eine große Menge an Berechnungen (und Informationen) zu komprimieren. Dies ist ein wesentlicher Bestandteil der Skalierbarkeit, da das Netzwerk dadurch horizontal skalieren kann, während Gruppen von Teilnehmenden weiterhin auf die Integrität des verbleibenden Netzwerks vertrauen können.

Vor Halo erforderte die rekursive Zusammensetzung von Beweisen einen hohen Rechenaufwand und ein vertrauenswürdiges Setup. Eine der wichtigsten Entdeckungen war eine Technik namens **verschachtelte Amortisierung**: rekursive Zusammensetzung mit einem auf dem Inner-Product-Argument basierenden polynomialen Commitment-Schema, die die Leistung erheblich verbessert und zugleich das vertrauenswürdige Setup vermeidet.

Das [Halo-Paper](https://eprint.iacr.org/2019/1021.pdf) beschreibt dieses polynomiale Commitment-Schema vollständig und stellte fest, dass darin eine neue Aggregationstechnik existierte. Die Technik ermöglicht es, eine große Anzahl unabhängig erstellter Beweise nahezu so schnell zu verifizieren wie einen einzelnen Beweis. Bereits für sich genommen bot dies eine bessere Alternative zu dem früheren zk-SNARKs, das in Zcash verwendet wurde.

### Halo 2

Halo 2 ist eine leistungsstarke zk-SNARK-Implementierung, die in Rust geschrieben wurde, das vertrauenswürdige Setup überflüssig macht und die Grundlage für Skalierbarkeit in Zcash schafft.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Sie umfasst eine Verallgemeinerung des Ansatzes, die **Akkumulationsschema** genannt wird. Diese Formalisierung zeigt, wie verschachtelte Amortisierung tatsächlich funktioniert: Indem Beweise einem Objekt namens **Akkumulator** hinzugefügt werden, wobei jeder Beweis über den vorherigen Zustand des Akkumulators schlussfolgert, können alle vorherigen Beweise (per Induktion) geprüft werden, indem einfach der aktuelle Zustand des Akkumulators geprüft wird.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Parallel dazu entdeckten viele andere Teams Polynomial IOPs, die effizienter als Sonic (in Halo 1 verwendet) waren, etwa Marlin. Das effizienteste dieser Protokolle ist PLONK, das enorme Flexibilität bei der Entwicklung effizienter Implementierungen auf Grundlage anwendungsspezifischer Anforderungen bietet und eine um 5× bessere Prover-Zeit als Sonic ermöglicht.

[Überblick über PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo im breiteren Ökosystem

Electric Coin Company schloss mit Protocol Labs, der Filecoin Foundation und der Ethereum Foundation eine Vereinbarung zur Erforschung von Halo-F&E, einschließlich der Frage, wie die Technologie in ihren jeweiligen Netzwerken eingesetzt werden könnte. Die Vereinbarung zielt darauf ab, bessere Skalierbarkeit, Interoperabilität und Privatsphäre über Ökosysteme hinweg und für Web 3.0 zu ermöglichen.

Zusätzlich steht Halo 2 unter den [MIT- und Apache-2.0-Open-Source-Lizenzen](https://github.com/zcash/halo2#readme), was bedeutet, dass jeder im Ökosystem mit dem Proving-System bauen kann.

**Filecoin.** Seit seiner Einführung wurde die halo2-Bibliothek in Projekten wie dem zkEVM übernommen, und es besteht das Potenzial einer Integration von Halo 2 in das Proof-System für die Filecoin Virtual Machine. Filecoin erfordert zahlreiche kostspielige Proofs of Spacetime und Proofs of Replication; Halo 2 ist entscheidend für die Komprimierung des Speicherverbrauchs und eine bessere Skalierung des Netzwerks. [Filecoin-Foundation-Video mit Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Beide Ökosysteme würden auch davon profitieren, wenn Filecoin-Speicherzahlungen in ZEC geleistet werden könnten, wodurch Speichererwerbe dieselbe Privatsphäre erhielten wie Zcash-Shielded-Transfers — einschließlich der Verschlüsselung von Dateien im Filecoin-Speicher und der Unterstützung mobiler Clients, die Medien an ein verschlüsseltes Zcash-Memo anhängen. [ECC × Filecoin-Blogbeitrag](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Ein Halo-2-Beweis für eine effiziente Verifiable Delay Function (VDF) wird entwickelt. Eine VDF ist ein kryptografisches Primitiv mit vielen möglichen Anwendungsfällen, darunter universell nutzbare Zufälligkeit für Smart Contracts und die Wahl von Führungspersonen in Proof of Stake. ECC, die Filecoin Foundation, Protocol Labs und die Ethereum Foundation arbeiten außerdem mit [SupraNational](https://www.supranational.net/) zusammen, einem auf hardwarebeschleunigte Kryptografie spezialisierten Anbieter, um eine mögliche GPU- und ASIC-Entwicklung der VDF zu ermöglichen. Die [-Gruppe Privacy and Scaling Explorations](https://appliedzkp.org/) erforscht weitere Wege, wie Halo-2-Beweise Privatsphäre und Skalierbarkeit für Ethereum verbessern können.

### Andere Projekte, die Halo verwenden

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — ein datenschutzfreundliches Multichain-Atomic-Swap-Protokoll
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — ein L2-zkRollup auf Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — eine private L1-zkEVM-Blockchain
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — ein L2-zkRollup auf Ethereum

---

## Praktische Auswirkungen

**Für Zcash selbst**

- Der mit NU5 aktivierte Orchard-Shielded-Pool ist die Implementierung dieses neuen Proof-Systems im Zcash-Netzwerk. Er wird durch dasselbe Drehkreuz-Design geschützt, das zwischen Sprout und Sapling verwendet wird, mit dem Ziel, die älteren Shielded-Pools schrittweise außer Betrieb zu nehmen.
- Nach NU5 (Mitte 2022) wurde die Integration rekursiver Beweise möglich, und mehrere Verbesserungen der Privatsphäre kamen damit einher — insbesondere die Einführung von „Actions“ als Ersatz für Inputs/Outputs, wodurch die Menge an Transaktionsmetadaten reduziert wird.
- Das Entfernen vertrauenswürdiger Setups beseitigt ein systemisches Risiko, das andernfalls bei jedem größeren Protokoll-Upgrade erneut auftreten müsste.

**Für Inhaber und Betreiber**

- Die rekursive Zusammensetzung von Beweisen bietet das Potenzial, unbegrenzte Mengen an Berechnungen zu komprimieren, überprüfbare verteilte Systeme zu schaffen und die Kapazität von Layer 1 für Vollknoten-Betreiber zu verbessern — relevant für Erweiterungen wie Zcash Shielded Assets und die längerfristigen Entwürfe von Zcash.

---

## Häufige Irrtümer

| Häufige Annahme | Wie es tatsächlich ist |
| --- | --- |
| „Halo ist ein zukünftiges Upgrade, auf das Zcash wartet.“ | Orchard, seit NU5 (2022) im Mainnet aktiv, läuft bereits auf Halo 2. |
| „Kein vertrauenswürdiges Setup bedeutet überhaupt keine Parameter.“ | Halo verwendet weiterhin öffentliche Parameter. Sie erfordern keine Zeremonie, bei der den Teilnehmenden vertraut werden muss, geheimes Setup-Material zu zerstören. |
| „Halo 2 und das Halo-Paper sind dasselbe.“ | Das [Paper](https://eprint.iacr.org/2019/1021.pdf) beschreibt das polynomiale Commitment-Schema und die verschachtelte Amortisierung; Halo 2 ist die Rust-Produktionsimplementierung mit einem Akkumulationsschema und PLONKish-Arithmetisierung. |
| „Rekursion hilft nur bei der Skalierung der Blockverifizierung.“ | Rekursion komprimiert auch Berechnungen auf Anwendungsebene — siehe die Proofs of Spacetime/Replication von Filecoin und die VDF-Arbeit für Ethereum. |

---

## Verwandte Seiten

- [zk-SNARKs](/zcash-tech/zk-snarks) — die allgemeine Technologiekategorie, zu der Halo gehört
- [Halo (Forschungspapier)](https://eprint.iacr.org/2019/1021.pdf) — die ursprüngliche Veröffentlichung
- [Ironwood](/zcash-tech/ironwood) und [The Turnstile](/zcash-tech/the-turnstile) — wie Shielded-Pools migrieren, während ältere außer Betrieb genommen werden
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — eine Erweiterung, die von rekursiven Beweisen profitiert
- [Zebra Vollknoten](/zcash-tech/zebra-full-node) — die Knoten-Implementierung, die Beweise on-chain validiert

## Weiterführendes Lernen

- [Eine Einführung in ZKP und Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 mit Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Technischer Erklärblog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Dokumentation**

- [Halo-2-Ressourcen](https://github.com/mhchia/awesome-halo2)
- [Halo-2-Dokumentation](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)

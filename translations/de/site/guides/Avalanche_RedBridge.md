# Zcash Avalanche RedBridge

Die Zcash Avalanche RedBridge ist eine dezentrale Bridge, die Interoperabilität zwischen den Blockchains Zcash (ZEC) und Avalanche (AVAX) ermöglicht. Diese Bridge wurde entwickelt, um den nahtlosen Transfer von ZEC auf die Avalanche-Blockchain zu erleichtern und dabei den hohen Durchsatz, die niedrigen Gebühren und die umweltfreundlichen Konsensmechanismen von Avalanche zu nutzen, während die datenschutzorientierten Eigenschaften von Zcash erhalten bleiben.

Die RedBridge unterstützt eine breite Palette von Anwendungsfällen, darunter Cross-Chain-Decentralized-Finance (DeFi), private Transaktionen und das Teilen von Liquidität, und ermöglicht Zcash-Inhabern einen erweiterten Zugang zum Avalanche-Ökosystem. Diese Bridge wird durch eine Reihe dezentraler Nodes und ein Oracle namens **ZavaX** betrieben, das eine zuverlässige Datenübertragung und Preisverifizierung zwischen Zcash und Avalanche sicherstellt.

### Hauptmerkmale

Datenschutzwahrende Interoperabilität: Ermöglicht es Zcash-Nutzern, ihre Privatsphäre zu wahren, während sie DeFi-Anwendungen auf Avalanche nutzen.
Dezentrales Oracle ZavaX: Integriert ein Oracle-System, um genaue ZEC/AVAX-Preisdaten sicherzustellen und vertrauenslose Cross-Chain-Operationen zu ermöglichen.
Skalierbar und umweltfreundlich: Nutzt das Konsensmodell von Avalanche und bietet hochgeschwindige Transaktionen mit minimaler Umweltbelastung.
Unterstützung für DeFi und DApps: Zcash-Inhaber können nun an verschiedenen DeFi-Plattformen auf Avalanche teilnehmen, ohne Kompromisse bei der Privatsphäre einzugehen.

### Technische Komponenten

**Dezentrales ZavaX Oracle**
Beschreibung: Das ZavaX-Oracle ist für die Bridge von entscheidender Bedeutung, da es Cross-Chain-Preisfeeds bereitstellt und vertrauenslose ZEC-zu-AVAX-Konvertierungen ermöglicht.
[Link zum Oracle](https://zavax-oracle.red.dev)

**Cross-Chain-Bridge-Contract**
Beschreibung: Die Smart-Contract-Architektur, die die Zcash-Avalanche-Bridge unterstützt und Einzahlungen, Konvertierungen und Auszahlungen von ZEC verarbeitet.

**Integration der Datenschutzschicht**
Beschreibung: Stellt sicher, dass die Datenschutzfunktionen von Zcash während des gesamten Bridge-Prozesses erhalten bleiben, wodurch private Cross-Chain-Transaktionen möglich sind.

## Ergebnisse und Dokumentation

**Zcash Elastic Subnet Bridge auf Avalanche**: [Förderantrag](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Nachfolgend sind die wichtigsten abgeschlossenen Ergebnisse und technischen Ressourcen für das Projekt Zcash Avalanche RedBridge aufgeführt:

Ergebnis 1.1: Vorläufiger PoC, der das Abfragen von Zcash-Testnet-Transaktionen aus einem Avalanche-Testnet-Subnetz mit einer CLI unterstützt, auf Github veröffentlicht und mit einem Ein-Node-Subnetz im Avalanche-Testnet. https://github.com/red-dev-inc/zavax-oracle

Ergebnis 2.1: [Architektur](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Meilenstein 3, 31. März 2024

Ergebnis 3.1 ist abgeschlossen und präsentiert unsere Analyse zur Einführung von FROST anstelle von BLS für Schwellenwertsignaturen in der ZavaX-Bridge. Dieser Wechsel nutzt auditierte Bibliotheken der Zcash Foundation und erleichtert eine bessere Integration und Sicherheit. https://github.com/ZcashFoundation/frost

Ergebnis 3.2 UX- und UI-Design für die GUI abgeschlossen, mit Details zu unseren Sicherheitsverbesserungen für das ZavaX Oracle-Subnetz, unterstützt durch die Ergebnisse von Penetrationstests. Weitere Details, einschließlich Serverkonfiguration und Testergebnisse, finden Sie unter [Sicherheitsbewertung](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Audit-Bericht](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Zusätzlich hat sich das Team von ZavaX in redbridge umbenannt und den Staking-Token von ZAX in RBR geändert.

### Meilenstein 4, 30. April 2024
Ergebnis 4.1 Vollständig funktionsfähige Bereitstellung in den Zcash- und Avalanche-Testnets, mit einem 3-Validator-Subnetz und CLI-Unterstützung

### Meilenstein 5, 31. Mai 2024
Ergebnis 5.1 GUI: Bridge-Integration in Core oder Webapp

Meilenstein 6, 30. Juni 2024
Ergebnis 6.1 Erfolgreiches Bestehen des Software-Audits
Ergebnis 6.2 Veröffentlichung des auditierten Quellcodes in einem öffentlichen Github-Repo

Werfen Sie einen Blick auf das [Github-Repo](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Für weitere technische Details werden Nutzer dazu ermutigt, das Repository und die Dokumentation des RedBridge-Projekts zu prüfen, um die Integrationsspezifika, Test-Frameworks und Sicherheitsprotokolle zu [erkunden](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/).


![img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Ergebnisse: 
Im 1. Quartal 2025 kündigte das Team den Start der [red·bridge-Demo-Website](https://redbridge-demo.red.dev/index.html) an, auf der jeder die Nutzererfahrung ausprobieren, Feedback geben und Verbesserungen vorschlagen kann. Sie dient auch als einfacher Weg, nicht-technischen Menschen das Projekt näherzubringen.

* Das Team nutzte Zebra für die endgültige Version von red·bridge. Um es zu testen, rüsteten sie zwei der drei Nodes in ihrer Test-Blockchain, ZavaX Oracle, auf, die im Fuji-Testnet von Avalanche läuft. Der letzte Node wurde erfolgreich aktualisiert, und nun läuft [Zavax Oracle](https://zavax-oracle.red.dev/) auf ZEBRA!

* Im 1. Quartal 2025 wurde die red.bridge-Website so programmiert, dass sie vier Ansichten bietet: red, Dark, Light und Zebra, im Gegensatz zur ursprünglichen Version, die red war.

* Ein weiterer Punkt ist, dass das Team die red·bridge L1 im Dezember 2025 live auf dem Avalanche-Mainnet aktivieren wird. Zunächst wird sie als Oracle für die Zcash-Blockchain dienen und kurz darauf auch für Bitcoin. Dabei wird jede Anfrage 0.001 AVAX an Gas-Token kosten. Dieser Build wird es jeder L1 oder jedem Smart Contract auf Avalanche ermöglichen, kostengünstig und dezentral Daten von Zcash und Bitcoin abzufragen.

* Im 2. Quartal reichte das Team einen Meilenstein ACP-77 (bekannt als Avalanche9000) bei der Avalanche Foundation ein, um den Betrieb eines red.bridge-Guardians früher und für alle erschwinglicher zu machen. Anfangs mussten Validatoren rund 2000 AVAX staken; mit den Avalanche9000-Kosten benötigten Validatoren jedoch nur 1 AVAX (Monat). Darüber hinaus finalisiert dieser Meilenstein auch den Plan, die FROST-Implementierung von ZF zu verwenden, die jedem Guardian einen Signaturanteil für die sichere, verteilte Kontrolle der Bridge-Wallet gibt.

* Im Verlauf von Q1 und Q2 2026 wird red.bridge den Airdrop seines RBR-Tokens (früher ZAX) für die Mitglieder der Zcash- und Avalanche-Community durchführen. Laut dem Gründer von red.dev werden sie ein incentiviertes Testnet veranstalten, bei dem Nutzer die Chance haben, RBR zu verdienen, während sie beim Testen der Bridge helfen.

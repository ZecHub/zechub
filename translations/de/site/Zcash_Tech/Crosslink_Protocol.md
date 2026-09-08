<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Crosslink Protocol

## TL;DR

* Das Crosslink-Protokoll ist ein vorgeschlagenes Design für Zcashs hybride Proof-of-Work/Proof-of-Stake-(PoW/PoS)-Phase. Es integriert PoW mit einem Byzantine-Fault-Tolerance-(BFT)-Protokoll und ermöglicht garantierte Finalität, solange entweder PoW oder PoS sicher bleibt.
* Hybrides PoS führt Notare ein, die Blöcke auf Basis von gestaktem ZEC validieren — zunächst statisch, später auf Grundlage von gestaktem ZEC gewählt.
* Crosslink zielt darauf ab, zwei Ledger bereitzustellen: ein **finalisiertes Ledger (LOG_fin)** für Rollback-Sicherheit und ein **Ledger mit geringerer Latenz (LOG_ba)**, das es um höchstens *L* Blöcke erweitert.
* Ein **Sicherheitsmodus** wird aktiviert, wenn das finalisierte Ledger um mehr als *L* Blöcke zurückfällt: PoW läuft weiter, aber wirtschaftliche Aktivitäten pausieren, bis das Problem behoben ist.
* Im Laufe der Zeit werden PoS-Validatoren einen wachsenden Anteil der Belohnungen erhalten, wodurch die Einnahmen der PoW-Miner sinken; das Protokoll führt die Änderungen schrittweise ein.
* Das Protokoll wird von Shielded Labs entwickelt, mit einer Roadmap zur Integration von Crosslink 2* in Zcashs Zebra-Client.

## Kernerklärung

### Einführung: Zcash Hybrid-PoS und das Crosslink-Protokoll

Das Crosslink Protocol ist eine wegweisende Entwicklung in der Evolution von Zcash und lenkt es in Richtung eines **hybriden Proof-of-Stake-(PoS)-** und **Proof-of-Work-(PoW)-Modells**. Traditionelles PoW ist zwar zuverlässig, wenn es darum geht, die Netzwerksicherheit zu gewährleisten, steht jedoch wegen des Energieverbrauchs und der mit industriellem Mining verbundenen Zentralisierungsrisiken in der Kritik. Crosslink führt ein Hybridsystem ein, das die bewährte Robustheit von PoW mit den Effizienz- und Governance-Vorteilen von PoS verbindet.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Dieser Übergang steht im Einklang mit globalen Trends bei Blockchain-Innovationen, bei denen Projekte auf ökologisch nachhaltige und dezentrale Mechanismen umstellen. Das duale Konsensmodell von Crosslink stellt sicher, dass Zcash seine starken kryptografischen Datenschutzgarantien beibehält und sich zugleich weiterentwickelt, um heutigen Herausforderungen zu begegnen.

Der hybride Proof-of-Stake-(PoS)-Ansatz kombiniert traditionelles Proof-of-Work (PoW) mit PoS und zielt darauf ab, Schwachstellen wie 51%-Angriffe zu adressieren, während Dezentralisierung erhalten und der Energieverbrauch gesenkt wird. Hybrides PoS führt Notare ein, die Blöcke auf Basis von gestaktem ZEC validieren. Dieser Mechanismus soll die Sicherheit der Chain und die Checkpoint-Validierung verbessern und bietet eine robustere Alternative zu reinen PoW-Systemen.

### Warum Hybrid-PoS/PoW als erster Test?

* Es schafft Fortschritt in Richtung eines reinen PoS.
* Es ermöglicht gleichzeitige Mining- und Staking-Anwendungsfälle sowie Überschneidungen im Ökosystem.
* Es mindert mögliche Sicherheitsprobleme des PoS-Protokolls, bis dieses mehr Validator-Stake und Vertrauen gewonnen hat.
* Der allgemeine Ansatz wurde von Ethereum in der Praxis demonstriert.

### Was Crosslink ist

Das Crosslink-Protokoll ist ein vorgeschlagenes Design für Zcashs hybride Proof-of-Work/Proof-of-Stake-(PoW/PoS)-Phase. Es integriert PoW mit einem Byzantine-Fault-Tolerance-(BFT)-Protokoll und ermöglicht garantierte Finalität, solange entweder PoW oder PoS sicher bleibt. Das Design zielt darauf ab, Netzwerksicherheit und Dezentralisierung zu stärken, indem gestakte Validierung eingebunden wird und zugleich die Beteiligung von Minern erhalten bleibt. Ein zentrales Merkmal des Vorschlags, Crosslink 2 genannt, vereinfacht die Architektur, indem BFT-Proposer und Miner vereinheitlicht werden. Dieser verschlankte Ansatz minimiert strukturelle Änderungen und erlaubt die Verwendung einer „Dummy“-BFT-Schicht, was Prototyping und Deployment erleichtert und dabei hohe Sicherheitsstandards aufrechterhält.

Der Implementierungsplan umfasst eine Roadmap mit geschätzten Entwicklungskosten für die Integration von Crosslink 2* in Zcashs Zebra-Client. Diese gestaffelte Einführung konzentriert sich darauf, die Anreize der Stakeholder auszubalancieren, Störungen zu reduzieren und mit Zcashs Zielen hinsichtlich Skalierbarkeit, Nutzbarkeit und Dezentralisierung im Einklang zu stehen. Das wachsende Vertrauen in die robusten Sicherheitseigenschaften des Protokolls festigt zusätzlich sein Potenzial als wichtiger Schritt in der Evolution von Zcash. Indem Crosslink Energieeffizienz adressiert und Konsensmechanismen verbessert, bietet es eine zukunftsorientierte Lösung für sich wandelnde Blockchain-Herausforderungen. Weitere Details finden sich im [GitHub-Repository](https://github.com/ShieldedLabs/crosslink-deployment) und im [Zcash Community Forum](https://forum.zcashcommunity.com).

### Ziele und Zweck von Crosslink

Das Crosslink Protocol wurde entwickelt, um mehrere strategische Ziele zu adressieren, die für die Zukunft von Zcash entscheidend sind:

1. **Dezentralisierung**:
   * Durch die Einbindung von PoS reduziert Zcash die Abhängigkeit von spezialisierter PoW-Hardware (ASICs), die Mining-Leistung oft bei wenigen großen Betreibern konzentriert.
   * PoS ermöglicht die Teilnahme einer breiteren Gemeinschaft, in der Coin-Inhaber ihre Vermögenswerte staken, um das Netzwerk zu sichern, was einen stärker verteilten Konsens gewährleistet.
   * Durch die Einführung gestakter Validierung stellt das Protokoll sicher, dass wirtschaftliche Teilnehmer eine aktive Rolle im Konsens spielen, wodurch die Abhängigkeit vom Mining allein reduziert wird.
2. **Verbesserte Governance**:
   * Coin-Inhaber erhalten durch Staking Stimmrechte, die es ihnen ermöglichen, Entscheidungen über Netzwerk-Upgrades, Mittelzuweisungen und Prioritäten des Ökosystems zu beeinflussen. Dieser demokratische Mechanismus richtet die Entwicklung des Protokolls an den Interessen der Gemeinschaft aus.
3. **Energieeffizienz**:
   * Der teilweise Übergang zu PoS senkt den Energiebedarf erheblich und bringt Zcash in Einklang mit globalen Nachhaltigkeitsinitiativen. PoS ist von Natur aus weniger ressourcenintensiv als das rechnerisch aufwendige PoW. Hybridsysteme zielen darauf ab, den Energieverbrauch im Vergleich zu reinen PoW-Systemen zu senken und gleichzeitig hohe Sicherheit zu bewahren.
4. **Wirtschaftliche Sicherheit und Nachhaltigkeit**:
   * Die Kombination aus PoW und PoS diversifiziert die wirtschaftlichen Anreize für Netzwerkteilnehmer und gewährleistet robuste Sicherheit ohne übermäßige Abhängigkeit von einem einzigen Mechanismus.
   * Staking führt außerdem ein vorhersehbares Belohnungsmodell für Teilnehmer ein und schafft damit ein attraktives Angebot für langfristige Investoren.
5. **Erhöhte Sicherheit**: Crosslink zielt darauf ab, die Widerstandsfähigkeit des Netzwerks gegen Chain-Reorganisationsangriffe zu erhöhen, indem PoS neben PoW integriert wird.

## Visualisierung / Analogie

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Stell dir einen Paketdienst vor, der für dieselbe Lieferung zwei verschiedene Dokumente ausstellt. Das erste ist ein Tracking-Scan: Er erscheint schnell, zeigt dir, wo das Paket höchstwahrscheinlich ist, und wird gelegentlich korrigiert. Das zweite ist eine unterschriebene Empfangsbestätigung: Sie kommt später, aber sobald sie existiert, bestreitet sie niemand.

Das Ledger mit geringerer Latenz ist der Tracking-Scan, und das finalisierte Ledger ist die unterschriebene Empfangsbestätigung. Beide beschreiben dieselbe Kette von Ereignissen; sie unterscheiden sich darin, wie schnell sie erscheinen und wie belastbar sie sind.

Der Sicherheitsmodus ist das, was das Depot tut, wenn unterschriebene Empfangsbestätigungen ausbleiben, während sich die Scans weiter stapeln. Pakete bewegen sich weiterhin durch das Gebäude — aber das Büro zahlt nicht mehr allein auf Basis von Scans aus, bis die Unterschriften aufgeholt haben.

## Detaillierte Betrachtung

### Sicherheits- und Leistungsziele von Crosslink

Das Crosslink-Protokoll zielt darauf ab, Zcash zwei Arten von Ledgern bereitzustellen: ein **finalisiertes Ledger (LOG_fin)** und ein **Ledger mit geringerer Latenz (LOG_ba)**. Das finalisierte Ledger gewährleistet Rollback-Sicherheit unter vernünftigen Annahmen entweder über das Byzantine-Fault-Tolerance-(BFT)- oder das Blockchain-(BC)-Protokoll. Es ist so konzipiert, dass es selbst bei Netzwerkpartitionen lebendig und sicher bleibt, mit einer Latenz, die bei gleichwertigen Blockbestätigungen etwas mehr als doppelt so hoch ist wie die der aktuellen Zcash-Blockchain.

Das Ledger mit geringerer Latenz erweitert das finalisierte Ledger um höchstens *L* Blöcke. Es gewährleistet Rollback-Sicherheit allein unter dem Blockchain-Protokoll und behält eine Latenz und Sicherheit bei, die nicht schlechter sind als im bestehenden Zcash-Modell. Im verschlankten Crosslink-2*-Design vereinfacht das Ledger mit geringerer Latenz Entwicklung und Einführung, indem es als PoW-Chain fungiert.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Begrenzte Verfügbarkeit und Sicherheitsmodus

Crosslink enthält einen **Sicherheitsmodus**, um Risiken zu adressieren, die damit verbunden sind, dass das Ledger mit geringerer Latenz dem finalisierten Ledger weit vorausläuft. Das verhindert Diskrepanzen wie unausgeglichene Kontostände oder ungeprüfte Sicherheitslücken in temporären Lösungen von Dienstanbietern. Der Sicherheitsmodus wird aktiviert, wenn das finalisierte Ledger um mehr als eine Konstante von *L* Blöcken zurückfällt. Während dieses Zustands setzt die Blockchain den PoW-Betrieb fort (wodurch grundlegende Sicherheit gewährleistet wird), aber wirtschaftliche Aktivitäten werden pausiert, bis das Problem gelöst ist. Dieser Mechanismus ist darauf ausgelegt, sich von außergewöhnlichen Bedingungen wie größeren Angriffen zu erholen und gleichzeitig Governance-basierte Rollback-Richtlinien zu unterstützen.

### Technische Details und Deployment

Das Crosslink Protocol wird von Shielded Labs in Zusammenarbeit mit wichtigen Partnern des Ökosystems wie Zodl aktiv entwickelt und eingeführt. Die Implementierung des Protokolls umfasst:

* Die Einrichtung sicherer Staking-Mechanismen für PoS-Teilnehmer.
* Die Anpassung der Belohnungsstruktur, um die Anreize zwischen Minern und Stakern auszubalancieren.
* Die Sicherstellung von Abwärtskompatibilität und einer nahtlosen Nutzererfahrung während des Übergangs.
* Notarsystem: Das Protokoll integriert Notare, die Blöcke abzeichnen. Zunächst werden statische Notare verwendet, später erfolgt der Übergang zu einem dynamischen System, in dem Notare auf Basis von gestaktem ZEC gewählt werden.
* Aktivierungslogik: Die Einführung von Crosslink erfordert Änderungen an den Zcash-Konsensregeln, einschließlich der Definition des Prozesses zur Stake-Verteilung und der Aktualisierung der Netzwerkprotokollregeln zur Unterstützung eines hybriden Konsenses.
* Gestaffelte Einführung: Das Protokoll wird stufenweise ausgerollt, um Netzwerkstabilität und Anpassung durch die Community sicherzustellen. Die ersten Phasen konzentrieren sich auf die technische Implementierung, gefolgt von der Integration von Governance zur Auswahl von Notaren.

Du kannst die technischen Details erkunden und den Fortschritt über das [Crosslink-Deployment-Repository auf GitHub](https://github.com/ShieldedLabs/crosslink-deployment) verfolgen.

## Praktische Auswirkungen

### Auswirkungen auf die Einnahmen von PoW-Minern

Crosslink erkennt die grundlegende Rolle von PoW-Minern in der frühen Entwicklung von Zcash an und bereitet zugleich eine schrittweise Verschiebung vor:

* **Reduzierte Blockbelohnungen**:
  * Im Laufe der Zeit werden PoS-Validatoren einen wachsenden Anteil der Belohnungen erhalten, wodurch die Einnahmen der PoW-Miner sinken. Diese Umverteilung spiegelt die abnehmende Rolle von PoW im hybriden Modell wider.
* **Fairer Übergang**:
  * Das Protokoll führt Änderungen schrittweise ein und stellt sicher, dass Miner ausreichend Zeit haben, sich anzupassen oder neue Rollen innerhalb des Zcash-Ökosystems zu erkunden, etwa den Übergang zum Staking oder Beiträge zu anderen Netzwerkdiensten.
* **Minderung von Zentralisierungsrisiken**:
  * PoS-Staking-Pools sind so konzipiert, dass sie eine Machtkonzentration verhindern und kleineren Akteuren die Möglichkeit geben, gleichberechtigt teilzunehmen. Dieser inklusive Ansatz wirkt der gegenwärtigen Konzentration im ASIC-basierten Mining entgegen.
* PoW-Miner werden geringere Einnahmen verzeichnen, da ein Teil der Blockbelohnung an PoS-Validatoren umverteilt wird. Diese Umverteilung sorgt für ein ausgewogenes Anreizsystem, das sowohl Miner als auch Staker für die Sicherung des Netzwerks belohnt.
* Es ist ein schrittweiser Übergang geplant, um die wirtschaftlichen Auswirkungen auf Miner abzumildern und gleichzeitig die Beteiligung der Stakeholder zu fördern.

Dieser Dual-Konsens-Mechanismus unterstreicht Zcashs Verpflichtung zu Datenschutz, Nachhaltigkeit und Dezentralisierung und positioniert es als zukunftsorientierten Vorreiter im Blockchain-Bereich.

## Häufige Fehler

**Crosslink als aktive Konsensregel lesen**. Diese Seite beschreibt ein vorgeschlagenes Design mit einem gestaffelten Einführungsplan. Seine Einführung erfordert Änderungen an den Zcash-Konsensregeln, wofür die Roadmap und die Integrationsarbeit in Zebra vorgesehen sind.

**Annehmen, dass PoS Mining ersetzt**. Crosslink ist ein hybrides Design: Die PoW-Blockproduktion läuft neben gestakter Validierung weiter. Selbst im Sicherheitsmodus setzt die Blockchain den PoW-Betrieb fort, während wirtschaftliche Aktivitäten pausieren.

**„Finalität“ als schnellere Bestätigung verstehen**. Das finalisierte Ledger ist für eine Latenz ausgelegt, die bei gleichwertigen Blockbestätigungen etwas mehr als doppelt so hoch ist wie die der aktuellen Zcash-Blockchain. Was es hinzufügt, ist Rollback-Sicherheit, nicht Geschwindigkeit — das Ledger mit geringerer Latenz ist die schnelle Sicht.

**Die beiden Ledger verwechseln**. LOG_ba ist keine separate Chain: Es erweitert das finalisierte Ledger um höchstens *L* Blöcke, und im Crosslink-2*-Design fungiert es als PoW-Chain.

## Verwandte Seiten

- [Zebra Full Knoten](/zcash-tech/zebra-full-node) — der Client, in den Crosslink 2* integriert werden soll.
- [Vollständige Knoten](/zcash-tech/full-nodes) — wie Knoten heute Konsensregeln validieren, vor jeder Änderung hin zu hybridem Konsens.
- [Netzwerk-Upgrades](/start-here/network-upgrades) — wie Änderungen an Konsensregeln das Zcash-Netzwerk erreichen.
- [Zcash-Geldpolitik](/start-here/zcash-monetary-policy) — die Struktur der Blockbelohnungen, die Crosslink umverteilen würde.

## Zusätzliche Ressourcen

- Einblicke aus der Community: [Zcash Community Forum - Crosslink-Diskussionen](https://forum.zcashcommunity.com)
- Offizielle Updates: [Electric Coin Company Blog](https://electriccoin.co)
- Fokus auf Nachhaltigkeit: [Warum hybrides PoS für Zcash wichtig ist](https://forum.zcashcommunity.com)

  Referenz:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>

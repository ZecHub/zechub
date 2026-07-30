### Crosslink Protocol

#### **Einführung: Zcash Hybrid-PoS und das Crosslink Protocol**

Das Crosslink Protocol ist eine wegweisende Entwicklung in der Evolution von Zcash und lenkt es in Richtung eines **hybriden Proof-of-Stake (PoS)**- und **Proof-of-Work (PoW)**-Modells. Traditionelles PoW ist zwar zuverlässig, wenn es um die Gewährleistung der Netzwerksicherheit geht, steht jedoch wegen seines Energieverbrauchs und der mit industriellem Mining verbundenen Zentralisierungsrisiken in der Kritik. Crosslink führt ein Hybridsystem ein, das die bewährte Robustheit von PoW mit den Effizienz- und Governance-Vorteilen von PoS verbindet.

![Bild](https://github.com/user-attachments/assets/a2ffb19d-e570-4723-b669-a66e14fc6b71)

Dieser Übergang steht im Einklang mit globalen Trends der Blockchain-Innovation, bei denen Projekte auf ökologisch nachhaltige und dezentrale Mechanismen umstellen. Das duale Konsensmodell von Crosslink stellt sicher, dass Zcash seine starken kryptografischen Datenschutzgarantien beibehält und sich gleichzeitig weiterentwickelt, um aktuellen Herausforderungen zu begegnen.

Der hybride Proof-of-Stake (PoS)-Ansatz kombiniert traditionelles Proof-of-Work (PoW) mit PoS, mit dem Ziel, Schwachstellen wie 51%-Angriffe zu adressieren und zugleich Dezentralisierung zu bewahren sowie den Energieverbrauch zu senken. Hybrid-PoS führt Notare ein, die Blöcke auf Basis von gestaktem ZEC validieren. Dieser Mechanismus soll die Sicherheit der Chain und die Validierung von Checkpoints verbessern und bietet eine robustere Alternative zu reinen PoW-Systemen​.

Warum Hybrid PoS/PoW als erster Test?
Es ist ein Fortschritt in Richtung reinem PoS
Es ermöglicht gleichzeitige Anwendungsfälle für Mining und Staking sowie Überschneidungen im Ökosystem.
Es mindert mögliche Sicherheitsprobleme des PoS-Protokolls, bis es mehr Validator-Stake und Vertrauen besitzt.
Der allgemeine Ansatz wurde von Ethereum in der Produktion demonstriert

---


### CROSSLINK
Das Crosslink Protocol ist ein vorgeschlagenes Design für die hybride Proof-of-Work/Proof-of-Stake-(PoW/PoS)-Phase von Zcash. Es integriert PoW mit einem Byzantine-Fault-Tolerance-(BFT)-Protokoll und ermöglicht garantierte Finalität, solange entweder PoW oder PoS sicher bleibt. Das Design zielt darauf ab, die Netzwerksicherheit und Dezentralisierung zu stärken, indem gestakte Validierung eingebunden wird, während die Beteiligung von Minern erhalten bleibt. Ein zentrales Merkmal des Vorschlags namens Crosslink 2 vereinfacht die Architektur, indem BFT-Proposer und Miner zusammengeführt werden. Dieser verschlankte Ansatz minimiert strukturelle Änderungen und erlaubt die Nutzung einer „Dummy“-BFT-Schicht, wodurch Prototyping und Deployment einfacher werden, während hohe Sicherheitsstandards erhalten bleiben.

Der Implementierungsplan umfasst eine Roadmap mit geschätzten Engineering-Kosten für die Integration von Crosslink 2* in den Zebra-Client von Zcash. Diese schrittweise Einführung konzentriert sich darauf, die Anreize der Stakeholder auszubalancieren, Störungen zu reduzieren und sich an den Zielen von Zcash in Bezug auf Skalierbarkeit, Nutzbarkeit und Dezentralisierung auszurichten. Das wachsende Vertrauen in die robusten Sicherheitseigenschaften des Protokolls festigt zusätzlich sein Potenzial als wichtiger Schritt in der Evolution von Zcash. Indem Crosslink Energieeffizienz adressiert und Konsensmechanismen verbessert, bietet es eine zukunftsorientierte Lösung für sich wandelnde Blockchain-Herausforderungen. Weitere Details finden sich im [GitHub-Repository](https://github.com/ShieldedLabs/crosslink-deployment) und im [Zcash Community Forum](https://forum.zcashcommunity.com).

![Bild](https://github.com/user-attachments/assets/b34afda4-fe33-448f-b0dd-279fd6cef1f5)


#### **Ziele und Zweck von Crosslink**

Das Crosslink Protocol wurde entwickelt, um mehrere strategische Ziele zu adressieren, die für die Zukunft von Zcash entscheidend sind:

1. **Dezentralisierung**:
   - Durch die Einbindung von PoS verringert Zcash die Abhängigkeit von spezialisierter PoW-Hardware (ASICs), die Mining-Power oft bei wenigen großen Akteuren konzentriert.
   - PoS ermöglicht die Beteiligung einer breiteren Community, bei der Coin-Inhaber ihre Vermögenswerte staken, um das Netzwerk zu sichern, und so einen stärker verteilten Konsens gewährleisten.
   - Durch die Einführung gestakter Validierung stellt das Protokoll sicher, dass wirtschaftliche Teilnehmer eine aktive Rolle im Konsens spielen, wodurch die Abhängigkeit vom Mining allein reduziert wird.

2. **Verbesserte Governance**:
   - Coin-Inhaber erhalten durch Staking Stimmrechte, wodurch sie Entscheidungen über Netzwerk-Upgrades, Mittelzuweisungen und Prioritäten im Ökosystem beeinflussen können. Dieser demokratische Mechanismus richtet die Entwicklung des Protokolls an den Interessen der Community aus.

3. **Energieeffizienz**:
   - Der teilweise Übergang zu PoS senkt den Energiebedarf erheblich und bringt Zcash in Einklang mit globalen Nachhaltigkeitsinitiativen. PoS ist im Vergleich zum rechnerisch aufwendigen PoW von Natur aus ressourcenschonender. Hybridsysteme zielen darauf ab, den Energieverbrauch im Vergleich zu reinen PoW-Systemen zu senken und gleichzeitig hohe Sicherheit aufrechtzuerhalten​

4. **Wirtschaftliche Sicherheit und Nachhaltigkeit**:
   - Die Kombination von PoW und PoS diversifiziert die wirtschaftlichen Anreize für Netzwerkteilnehmer und gewährleistet robuste Sicherheit ohne übermäßige Abhängigkeit von einem einzigen Mechanismus.
   - Staking führt außerdem ein vorhersehbares Belohnungsmodell für Teilnehmer ein und schafft damit ein attraktives Angebot für langfristige Investoren.
 
5. Erhöhte Sicherheit: Crosslink zielt darauf ab, die Widerstandsfähigkeit des Netzwerks gegen Chain-Reorganizations-Angriffe zu erhöhen, indem PoS zusätzlich zu PoW integriert wird.


### Sicherheits- und Leistungsziele von Crosslink

Das Crosslink Protocol soll zwei Arten von Ledgern für Zcash bereitstellen: ein **finalisiertes Ledger (LOG_fin)** und ein **Ledger mit geringerer Latenz (LOG_ba)**. Das finalisierte Ledger gewährleistet Sicherheit gegen Rollbacks unter vernünftigen Annahmen entweder über das Byzantine-Fault-Tolerance-(BFT)- oder das Blockchain-(BC)-Protokoll. Es ist darauf ausgelegt, auch bei Netzwerkpartitionen live und sicher zu bleiben, mit einer Latenz, die für gleichwertige Blockbestätigungen etwas mehr als doppelt so hoch ist wie die der aktuellen Zcash-Blockchain.

Das Ledger mit geringerer Latenz erweitert das finalisierte Ledger um nicht mehr als *L* Blöcke. Es gewährleistet Sicherheit gegen Rollbacks allein unter dem Blockchain-Protokoll und behält Latenz und Sicherheit bei, die nicht schlechter sind als im bestehenden Zcash-Modell. Im verschlankten Crosslink-2*-Design vereinfacht das Ledger mit geringerer Latenz Entwicklung und Einführung, indem es als PoW-Chain fungiert.

![Bild](https://github.com/user-attachments/assets/fd039664-4852-4fb0-8c88-0615f1ed116e)


### Begrenzte Verfügbarkeit und Sicherheitsmodus

Crosslink enthält einen **Sicherheitsmodus**, um Risiken zu adressieren, die damit verbunden sind, dass das Ledger mit geringerer Latenz weit vor dem finalisierten Ledger liegt. Dadurch werden Diskrepanzen verhindert, etwa unausgeglichene Kontostände oder nicht verifizierte Sicherheitslücken in temporären Lösungen von Dienstanbietern. Der Sicherheitsmodus wird aktiviert, wenn das finalisierte Ledger um mehr als eine Konstante von *L* Blöcken zurückfällt. Während dieses Zustands setzt die Blockchain den PoW-Betrieb fort (wodurch grundlegende Sicherheit gewährleistet wird), wirtschaftliche Aktivitäten werden jedoch pausiert, bis das Problem gelöst ist. Dieser Mechanismus wurde entwickelt, um sich von außergewöhnlichen Bedingungen wie größeren Angriffen zu erholen und zugleich Governance-basierte Rollback-Richtlinien zu unterstützen.


---

#### **Auswirkungen auf die Einnahmen von PoW-Minern**

Crosslink erkennt die grundlegende Rolle von PoW-Minern in der frühen Entwicklung von Zcash an und bereitet gleichzeitig eine schrittweise Verschiebung vor:

- **Reduzierte Blockbelohnungen**:
   - Im Laufe der Zeit werden PoS-Validatoren einen wachsenden Anteil der Belohnungen erhalten, wodurch die Einnahmen der PoW-Miner sinken. Diese Umverteilung spiegelt die abnehmende Rolle von PoW im Hybridmodell wider.
   
- **Fairer Übergang**:
   - Das Protokoll führt Änderungen schrittweise ein und stellt sicher, dass Miner ausreichend Zeit haben, sich anzupassen oder neue Rollen innerhalb des Zcash-Ökosystems zu erkunden, etwa den Übergang zum Staking oder Beiträge zu anderen Netzwerkdiensten.

- **Minderung von Zentralisierungsrisiken**:
   - PoS-Staking-Pools sind so konzipiert, dass sie eine Machtkonzentration verhindern und kleineren Akteuren die Möglichkeit geben, unter gleichen Bedingungen teilzunehmen. Dieser inklusive Ansatz wirkt der derzeitigen Konzentration entgegen, die beim ASIC-basierten Mining zu beobachten ist.

- PoW-Miner werden geringere Einnahmen verzeichnen, da ein Teil der Blockbelohnung an PoS-Validatoren umverteilt wird. Diese Umverteilung sorgt für ein ausgewogenes Anreizsystem, das sowohl Miner als auch Staker für die Sicherung des Netzwerks belohnt.
- Ein schrittweiser Übergang ist geplant, um die wirtschaftlichen Auswirkungen auf Miner zu mildern und gleichzeitig die Beteiligung der Stakeholder zu fördern​

---

#### **Technische Details und Deployment**

Das Crosslink Protocol wird von Shielded Labs in Zusammenarbeit mit wichtigen Partnern des Ökosystems wie Zodl aktiv entwickelt und eingeführt. Die Implementierung des Protokolls umfasst:
- die Einrichtung sicherer Staking-Mechanismen für PoS-Teilnehmer.
- die Anpassung der Belohnungsstruktur, um die Anreize zwischen Minern und Stakern auszugleichen.
- die Sicherstellung der Abwärtskompatibilität und einer nahtlosen Benutzererfahrung während des Übergangs.
- Notarsystem: Das Protokoll integriert Notare, die Blöcke abzeichnen. Zunächst werden statische Notare verwendet, später erfolgt der Übergang zu einem dynamischen System, in dem Notare auf Basis von gestaktem ZEC gewählt werden.​
- Aktivierungslogik: Die Einführung von Crosslink erfordert Änderungen an den Konsensregeln von Zcash, einschließlich der Definition des Prozesses der Stake-Verteilung und der Aktualisierung der Netzwerkprotokollregeln zur Unterstützung des hybriden Konsenses​
- Phasenweises Deployment: Das Protokoll wird stufenweise ausgerollt, um Netzwerkstabilität und Anpassung der Community sicherzustellen. Die ersten Phasen konzentrieren sich auf die technische Implementierung, gefolgt von der Integration von Governance zur Auswahl der Notare​.

Sie können die technischen Details erkunden und den Fortschritt über das [Crosslink Deployment Repository auf GitHub](https://github.com/ShieldedLabs/crosslink-deployment) verfolgen.

---

#### **Zusätzliche Ressourcen**
- Einblicke aus der Community: [Zcash Community Forum - Crosslink-Diskussionen](https://forum.zcashcommunity.com)
- Offizielle Updates: [Electric Coin Company Blog](https://electriccoin.co)
- Nachhaltigkeitsfokus: [Warum Hybrid PoS für Zcash wichtig ist](https://forum.zcashcommunity.com)

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

Dieser Dual-Konsens-Mechanismus stärkt das Bekenntnis von Zcash zu Datenschutz, Nachhaltigkeit und Dezentralisierung und positioniert es als zukunftsorientierten Vorreiter im Blockchain-Bereich.

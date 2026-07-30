<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Halo


## Was ist Halo?

Halo ist ein vertrauensloser, rekursiver Zero-Knowledge-Proof (ZKP), der von Sean Bowe bei Electric Coin Co. entdeckt wurde. Es beseitigt das Trusted Setup und ermöglicht eine größere Skalierbarkeit der Zcash-Blockchain. Halo war das erste Zero-Knowledge-Proof-System, das sowohl effizient als auch rekursiv ist und weithin als wissenschaftlicher Durchbruch gilt.

![Halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Komponenten**

Prägnantes Polynomial-Commitment-Schema: Ermöglicht es einem Committer, sich mit einer kurzen Zeichenfolge auf ein Polynom festzulegen, die von einem Verifizierer verwendet werden kann, um behauptete Auswertungen des festgelegten Polynoms zu bestätigen.

Polynomial Interactive Oracle Proof: Der Verifizierer fordert den Prover (Algorithmus) auf, alle Commitments an verschiedenen, von ihm gewählten Punkten mithilfe des Polynomial-Commitment-Schemas zu öffnen, und prüft, ob die Identität zwischen ihnen gültig ist. 


### Kein Trusted Setup

zkSNARKs stützen sich auf eine Common Reference String (CRS) als öffentlichen Parameter für das Beweisen und Verifizieren. Diese CRS muss im Voraus von einer vertrauenswürdigen Partei erzeugt werden. Bis vor Kurzem waren aufwendige sichere Multi-Party-Computation-Verfahren (MPC) wie jene von Aztec Network und Zcash notwendig, um das Risiko während dieser [Trusted-Setup-Zeremonie](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) zu mindern. 

Zuvor nutzten die abgeschirmten Pools Sprout und Sapling von Zcash die zk-Proving-Systeme BCTV14 und Groth 16. Obwohl diese sicher waren, gab es Einschränkungen. Sie waren nicht skalierbar, da sie an eine einzelne Anwendung gebunden waren, der „toxic waste“ (Überreste kryptografischen Materials, das während der Genesis-Zeremonie erzeugt wurde) konnte fortbestehen, und für Nutzer blieb ein gewisses Vertrauenselement bestehen (wenn auch minimal), um die Zeremonie als akzeptabel anzusehen.

Durch das wiederholte Zusammenfassen mehrerer Instanzen schwieriger Probleme über Zyklen elliptischer Kurven, sodass rechnerische Beweise effizient dazu verwendet werden können, über sich selbst zu argumentieren (Nested Amortization), entfällt die Notwendigkeit eines Trusted Setups. Das bedeutet auch, dass die Structured Reference String (Ausgabe der Zeremonie) aktualisierbar ist und damit Anwendungen wie Smart Contracts ermöglicht.

Halo gibt Nutzern zwei wichtige Zusicherungen hinsichtlich der Sicherheit des groß angelegten Zero-Knowledge-Proof-Systems. Erstens ermöglicht es Nutzern zu beweisen, dass niemand, der an der Genesis-Zeremonie beteiligt war, eine geheime Hintertür geschaffen hat, um betrügerische Transaktionen auszuführen. Zweitens können Nutzer damit nachweisen, dass das System im Laufe der Zeit sicher geblieben ist, selbst wenn es Updates und Änderungen durchlaufen hat.

[Erklärung von Sean Bowe bei Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Rekursive Beweise

Die rekursive Beweis-Komposition ermöglicht es einem einzelnen Beweis, die Korrektheit praktisch unbegrenzt vieler anderer Beweise zu bestätigen, wodurch eine große Menge an Berechnungen (und Informationen) komprimiert werden kann. Dies ist ein wesentlicher Bestandteil der Skalierbarkeit, nicht zuletzt, weil es uns erlaubt, das Netzwerk horizontal zu skalieren und dennoch kleineren Teilnehmergruppen zu ermöglichen, auf die Integrität des restlichen Netzwerks zu vertrauen.

Vor Halo erforderte das Erreichen rekursiver Beweis-Komposition einen hohen Rechenaufwand und ein Trusted Setup. Eine der wichtigsten Entdeckungen war eine Technik namens **nested amortization**. Diese Technik ermöglicht rekursive Komposition mithilfe des Polynomial-Commitment-Schemas auf Basis des Inner-Product-Arguments, verbessert die Leistung massiv und vermeidet das Trusted Setup.

Im [Halo-Paper](https://eprint.iacr.org/2019/1021.pdf) haben wir dieses Polynomial-Commitment-Schema vollständig beschrieben und entdeckt, dass darin eine neue Aggregationstechnik existiert. Diese Technik erlaubt es, eine große Anzahl unabhängig erzeugter Beweise fast so schnell zu verifizieren wie einen einzelnen Beweis. Allein dies wäre bereits eine bessere Alternative zu den früher in Zcash verwendeten zk-SNARKs.


### Halo 2

Halo 2 ist eine in Rust geschriebene Hochleistungs-zk-SNARK-Implementierung, die die Notwendigkeit eines Trusted Setups beseitigt und zugleich die Grundlage für Skalierbarkeit in Zcash legt. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

Es enthält eine Verallgemeinerung unseres Ansatzes namens **accumulation scheme**. Diese neue Formalisierung zeigt auf, wie unsere Technik der nested amortization tatsächlich funktioniert: Indem Beweise zu einem Objekt namens **accumulator** hinzugefügt werden, wobei die Beweise über den vorherigen Zustand des accumulator argumentieren, können wir prüfen, dass alle vorherigen Beweise korrekt waren (durch Induktion), indem wir einfach den aktuellen Zustand des accumulator überprüfen.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



Parallel dazu entdeckten viele andere Teams neue Polynomial IOPs, die effizienter waren als Sonic (verwendet in Halo 1), wie etwa Marlin. 

Das effizienteste dieser neuen Protokolle ist PLONK, das enorme Flexibilität bei der Entwicklung effizienter Implementierungen basierend auf anwendungsspezifischen Anforderungen bietet und im Vergleich zu Sonic eine 5x bessere Prover-Zeit liefert.

[Überblick über PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Wie profitiert Zcash davon?

Der abgeschirmte Orchard-Pool wurde mit NU5 aktiviert und ist die Implementierung dieses neuen Beweissystems im Zcash-Netzwerk. Er wird durch dasselbe Turnstile-Design geschützt, das auch zwischen Sprout und Sapling verwendet wurde, mit dem Ziel, die älteren abgeschirmten Pools schrittweise außer Betrieb zu nehmen. Dies fördert die Migration zu einem vollständig vertrauenslosen Beweissystem, stärkt das Vertrauen in die Solidität der monetären Basis und reduziert insgesamt die Implementierungskomplexität und Angriffsfläche von Zcash. Nach der Aktivierung von NU5 Mitte 2022 wurde die Integration rekursiver Beweise möglich (auch wenn dies noch nicht vollständig abgeschlossen ist). Zudem wurden mehrere Verbesserungen der Privatsphäre am Rande vorgenommen. Die Einführung von „Actions“ als Ersatz für Inputs/Outputs half dabei, die Menge an Transaktionsmetadaten zu verringern. 

Trusted Setups sind im Allgemeinen schwer zu koordinieren und stellten ein systemisches Risiko dar. Es wäre notwendig, sie bei jedem größeren Protokoll-Upgrade zu wiederholen. Ihre Beseitigung stellt eine erhebliche Verbesserung für die sichere Implementierung neuer Protokoll-Upgrades dar. 

Die rekursive Beweis-Komposition birgt das Potenzial, unbegrenzte Mengen an Berechnung zu komprimieren, auditierbare verteilte Systeme zu schaffen und Zcash hochleistungsfähig zu machen, insbesondere beim Übergang zu Proof of Stake. Dies ist auch nützlich für Erweiterungen wie Zcash Shielded Assets und zur Verbesserung der Layer-1-Kapazität im oberen Bereich der Full-Node-Nutzung in den kommenden Jahren für Zcash.


## Halo im breiteren Ökosystem 

Die Electric Coin Company hat mit Protocol Labs, der Filecoin Foundation und der Ethereum Foundation eine Vereinbarung geschlossen, um Forschung und Entwicklung zu Halo zu erkunden, einschließlich der Frage, wie die Technologie in ihren jeweiligen Netzwerken eingesetzt werden könnte. Ziel der Vereinbarung ist es, bessere Skalierbarkeit, Interoperabilität und Privatsphäre über Ökosysteme hinweg und für Web 3.0 bereitzustellen.

Darüber hinaus steht Halo 2 unter den [MIT- und Apache-2.0-Open-Source-Lizenzen](https://github.com/zcash/halo2#readme), was bedeutet, dass jeder im Ökosystem mit dem Beweissystem entwickeln kann.

### Filecoin

Seit ihrer Einführung wurde die halo2-Bibliothek in Projekten wie dem zkEVM übernommen; zudem gibt es das Potenzial für eine Integration von Halo 2 in das Beweissystem der Filecoin Virtual Machine. Filecoin erfordert zahlreiche kostspielige Proofs of Spacetime / Proofs of Replication. Halo2 wird entscheidend dabei sein, den Speicherbedarf zu komprimieren und das Netzwerk besser zu skalieren.

[Video der Filecoin Foundation mit Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Darüber hinaus wäre es für die Filecoin- und Zcash-Ökosysteme von großem Nutzen, wenn Filecoin-Speicherzahlungen in ZEC erfolgen könnten, wodurch für Speicherkäufe dasselbe Maß an Privatsphäre möglich wäre, das es bei abgeschirmten Zcash-Transfers gibt. Diese Unterstützung würde die Möglichkeit hinzufügen, Dateien im Filecoin-Speicher zu verschlüsseln, und mobile Clients so erweitern, dass sie Medien oder Dateien an ein verschlüsseltes Zcash-Memo **anhängen** könnten. 

[ECC x Filecoin Blogbeitrag](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Es wird an der Implementierung eines Halo-2-Beweises für die effiziente Verifiable Delay Function (VDF) gearbeitet. Eine VDF ist ein kryptografisches Primitive mit vielen potenziellen Anwendungsfällen. 

Sie kann als Quelle für allgemeine Zufälligkeit verwendet werden, einschließlich der Nutzung in Smart-Contract-Anwendungen sowie bei der Leader Election in Proof of Stake auf Ethereum und anderen Protokollen.

ECC, die Filecoin Foundation, Protocol Labs und die Ethereum Foundation werden außerdem mit [SupraNational](https://www.supranational.net/), einem Anbieter, der auf hardwarebeschleunigte Kryptografie spezialisiert ist, an potenziellem GPU- und ASIC-Design sowie an der Entwicklung der VDF arbeiten.

Die [Privacy and Scaling Exploration group](https://appliedzkp.org/) erforscht ebenfalls verschiedene Möglichkeiten, wie Halo-2-Beweise Privatsphäre und Skalierbarkeit für das Ethereum-Ökosystem verbessern können. Diese Gruppe ist der Ethereum Foundation zugeordnet und hat einen breiten Fokus auf Zero-Knowledge-Proofs und kryptografische Primitive. 

## Andere Projekte, die Halo verwenden

+ [Anoma, ein datenschutzwahrendes Multichain-Atomic-Swap-Protokoll](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, ein L2-zkRollup auf Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, eine private L1-zkEVM-Blockchain](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, ein L2-zkRollup auf Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Weiterführendes Lernen**:

[Eine Einführung in zkp und Halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 mit Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Technischer Erklär-Blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Dokumentation**

[Halo-2-Ressourcen](https://github.com/adria0/awesome-halo2)

[Halo-2-Dokumentation](https://zcash.github.io/halo2/)

[Halo-2-GitHub](https://github.com/zcash/halo2)

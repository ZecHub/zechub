<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/zk_SNARKS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# ZKP & ZK-SNARKS

## TL;DR

- **ZK-SNARKs** = Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge
- Sie ermöglichen es einer Partei, **zu beweisen, dass sie etwas weiß**, ohne die Information selbst offenzulegen
- Zcash verwendet ZK-SNARKs, um zu beweisen, dass eine Transaktion gültig ist (korrekte Beträge, nicht ausgegebene Inputs), **ohne Absender, Empfänger oder Betrag offenzulegen**
- „Succinct“ bedeutet, dass der Beweis winzig und schnell zu verifizieren ist, selbst bei komplexen Aussagen
- Der Orchard-Pool verwendet Halo 2, ein ZK-SNARK-System, für das **kein Trusted Setup erforderlich ist**

---

## Was ist ein Beweis?

Beweise sind die Grundlage der gesamten Mathematik. Ein Beweis ist eine Behauptung oder ein Theorem, das man zu beweisen versucht, sowie eine Folge von Herleitungen, mit denen erklärt wird, dass das Theorem bewiesen wurde. Z. B. kann die Aussage, dass alle Winkel in einem Dreieck zusammen 180° ergeben, von jedem (Verifier) unabhängig überprüft werden.

**Beweise** 

Prover ---> Stellt Behauptung auf ---> Verifier wählt ---> Akzeptieren/Ablehnen 

(Sowohl der Prover als auch der Verifier sind Algorithmen)

In der Informatik bezeichnet man effizient verifizierbare Beweise als NP-Beweise. Diese kurzen Beweise können in polynomialer Zeit verifiziert werden. Die grundlegende Idee ist: „Es existiert eine Lösung für ein Theorem, und sie wird dem Verifier zur Prüfung übergeben“


<a href="">
    <img width="853" height="396" alt="NPlanguage1" src="https://github.com/user-attachments/assets/d25345cf-e958-4ce2-b01d-f4e7f2db9551" alt="" width="600" height="400"/>
</a>


In einer NP-Sprache müssen zwei Bedingungen erfüllt sein: 

Vollständigkeit: Wahre Behauptungen werden vom Verifier akzeptiert (ermöglicht ehrlichen Provern, die Verifikation zu bestehen)

Korrektheit: Falsche Behauptungen haben keine Beweise (für jede Strategie eines betrügerischen Provers gilt, dass er die Korrektheit einer falschen Behauptung nicht beweisen kann).


### Interaktive & probabilistische Beweise

**Interaktion**: Anstatt den Beweis nur zu lesen, tritt der Verifier über mehrere Nachrichtenrunden hinweg in einen wechselseitigen Austausch mit einem Prover.

**Zufälligkeit**: Die Anfragen des Verifiers an den Prover sind randomisiert, und der Prover muss jede davon korrekt beantworten. 


<a href="">
 <img width="855" height="399" alt="IPmodel1" src="https://github.com/user-attachments/assets/1542be12-d3fd-4934-8413-0d16f95b8d10" alt="" width="600" height="400"/>
</a>


Durch die gemeinsame Nutzung von Interaktion und Zufälligkeit ist es möglich, eine Behauptung gegenüber einem blinden Verifier in probabilistischer polynomialer Zeit (PPT) zu beweisen. 

Können interaktive Beweise mehr als NP-Beweise effizient verifizieren?

NP-Beweise vs. IP-Beweise:

|  Statement   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  yes      |  yes   |
|    CO-NP     |  no       |  yes   |
|    #P        |  no       |  yes   |
|    PSPACE    |  no       |  yes   |


NP - Es existiert eine Lösung für eine Aussage

CO-NP - Beweis, dass es keine Lösungen für eine Aussage gibt

#P - Zählen, wie viele Lösungen es für eine Aussage gibt

PSPACE  - Beweis einer Abfolge unterschiedlicher Aussagen

### Was ist Zero Knowledge?

Was ein Verifier nach einer Interaktion berechnen kann, ist identisch mit dem, was er schon vorher beweisen konnte. Die Interaktion über mehrere Runden zwischen Prover und Verifier hat die Rechenleistung des Verifiers nicht erhöht.

**Das Simulationsparadigma (Simulation Paradigm)**

Dieses Experiment ist in der gesamten Kryptographie präsent. Es stellt eine „Real View“ und eine „Simulated View“ gegenüber. 

Real View: Alle möglichen Verläufe von Interaktionen zwischen Prover und Verifier (P,V)

Simulated View: Der Verifier simuliert alle möglichen Interaktionen zwischen Prover und Verifier 

<a href="">
    <img width="850" height="397" alt="simulation1" src="https://github.com/user-attachments/assets/0e68649d-a231-44d8-a76a-25a307f68b9e"  alt="" width="600" height="400"/>
</a>

Ein Distinguisher in polynomialer Zeit versucht festzustellen, ob er auf die reale oder die simulierte Sicht blickt, und fordert wiederholt Stichproben aus beiden an.

Die beiden Sichten gelten als „rechentechnisch ununterscheidbar“, wenn für alle Distinguisher-Algorithmen/-Strategien selbst nach Erhalt einer polynomialen Anzahl an Stichproben aus der realen oder simulierten Sicht die Wahrscheinlichkeit >1/2 ist. 

**Zero-Knowledge Arguments of Knowledge**

Ein interaktives Protokoll (P,V) ist Zero-Knowledge, wenn es einen Simulator (Algorithmus) gibt, sodass für jeden Verifier in probabilistischer polynomialer Zeit (wenn das Theorem korrekt ist) die Wahrscheinlichkeitsverteilungen, die reale von simulierter Sicht unterscheiden sollen, rechentechnisch ununterscheidbar sind. 

Interaktive Protokolle sind nützlich, wenn es einen einzelnen Verifier gibt. Ein Beispiel wäre ein Steuerprüfer in einer Zero-Knowledge-Anwendung zum „Nachweis von Steuern“.

## Was ist ein SNARK?

**Succinct Non-Interactive Argument of Knowledge**

Breite Definition – Ein knapper Beweis dafür, dass eine Aussage wahr ist. Der Beweis muss kurz und schnell zu verifizieren sein. Bei SNARKS wird eine einzelne Nachricht vom Prover an den Verifier gesendet. Der Verifier kann dann entscheiden, ob er akzeptiert oder ablehnt. 

Beispielaussage: „Ich kenne eine Nachricht (m), sodass SHA256(m)=0“

In einem zk-SNARK verrät der Beweis nichts über die Nachricht (m).

**Polynome**: Summen von Termen, die eine Konstante (wie 1,2,3), Variablen (wie x,y,z) und Exponenten von Variablen (wie x², y³) enthalten. 

Beispiel: „3x² + 8x + 17“

**Arithmetischer Schaltkreis**: Ein Modell zur Berechnung von Polynomen. Allgemeiner kann er als gerichteter azyklischer Graph definiert werden, in dem an jedem Knoten des Graphen eine arithmetische Operation ausgeführt wird. Der Schaltkreis besteht aus Additions-Gates, Multiplikations-Gates und einigen Konstanten-Gates. So wie boolesche Schaltkreise Bits über Leitungen transportieren, transportieren arithmetische Schaltkreise ganze Zahlen.


<a href="">
<img width="785" height="368" alt="circuit1" src="https://github.com/user-attachments/assets/be1de1d6-60d3-4fd1-b9a2-5094c65d696f" alt="" width="300" height="200"/>
</a>

In diesem Beispiel möchte der Prover den Verifier davon überzeugen, dass er eine Lösung für den arithmetischen Schaltkreis kennt.  

**Commitments**: Um dies zu tun, packt der Prover alle mit dem Schaltkreis verbundenen Werte (private und öffentliche) in ein Commitment. Commitments verbergen ihre Eingaben, indem sie eine Funktion verwenden, deren Ausgabe irreversibel ist.

Sha256 ist ein Beispiel für eine Hash-Funktion, die in einem Commitment-Schema verwendet werden kann.

Nachdem der Prover sich auf die Werte festgelegt hat, werden die Commitments an den Verifier gesendet (in der Gewissheit, dass dieser keinen der ursprünglichen Werte aufdecken kann). Der Prover kann dem Verifier dann zeigen, dass er Kenntnis über jeden der Werte an den Knoten des Graphen hat. 

**Fiat-Shamir-Transformation**

Um das Protokoll *nicht-interaktiv* zu machen, erzeugt der Prover Zufälligkeit (die für die verborgene Challenge verwendet wird) im Namen des Verifiers mit einer kryptografischen Hash-Funktion. Dies wird als Random Oracle bezeichnet. Der Prover kann dann eine einzelne Nachricht an den Verifier senden, der anschließend prüfen kann, ob sie korrekt ist. 

Um ein SNARK zu bilden, das für allgemeine Schaltkreise verwendet werden kann, sind zwei Elemente erforderlich:

Funktionales Commitment-Schema: Ermöglicht es einem Committer, sich mit einer kurzen Zeichenfolge auf ein Polynom festzulegen, die von einem Verifier genutzt werden kann, um behauptete Auswertungen des festgelegten Polynoms zu bestätigen.

Interaktives Polynomial-Oracle: Der Verifier fordert den Prover (Algorithmus) auf, alle Commitments an verschiedenen von ihm gewählten Punkten mithilfe eines Polynomial-Commitment-Schemas zu öffnen, und prüft, ob die Identität zwischen ihnen wahr ist.

**Setup**

Setup-Verfahren helfen dem Verifier, indem sie einen Schaltkreis zusammenfassen und öffentliche Parameter ausgeben. 

<a href="">
<img width="845" height="398" alt="setup1" src="https://github.com/user-attachments/assets/c41212ca-b5e9-4ac8-8695-be612c45a679" alt="" width="600" height="300"/>
</a>

**Arten von Pre-Processing-Setups**:

Trusted Setup pro Schaltkreis – Wird einmal pro Schaltkreis ausgeführt. Es ist schaltkreisspezifisch, und die geheime Zufälligkeit (Common Reference String) muss geheim gehalten und zerstört werden. 

Ein kompromittiertes Setup in dieser Methode bedeutet, dass ein unehrlicher Prover falsche Aussagen beweisen kann. 

Trusted but Universal Setup – Das Trusted Setup muss nur einmal ausgeführt werden und kann danach mehrere Schaltkreise deterministisch vorverarbeiten. 

Transparentes Setup (Kein Trusted Setup) – Der Vorverarbeitungsalgorithmus verwendet überhaupt keine geheime Zufälligkeit. 


**Arten von SNARK-Beweiskonstruktionen**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Erfordert ein Trusted Setup, hat aber sehr kurze Beweise, die schnell verifiziert werden können.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Universelles Trusted Setup.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): Kein Trusted Setup, erzeugen aber etwas längere Beweise oder benötigen möglicherweise mehr Zeit für den Prover. 

SNARKS sind nützlich, wenn mehrere Verifier benötigt werden, etwa in einer Blockchain wie Zcash oder in einem zk-Rollup wie [Aztec](https://docs.aztec.network), damit mehrere validierende Nodes nicht über mehrere Runden mit jedem Beweis interagieren müssen. 

## Wie werden zk-SNARKs in Zcash implementiert?

Im Allgemeinen sind Zero-Knowledge-Proofs ein Werkzeug, um ehrliches Verhalten in Protokollen durchzusetzen, ohne Informationen offenzulegen. 

Zcash ist eine öffentliche Blockchain, die private Transaktionen ermöglicht. zk-SNARKs werden verwendet, um zu beweisen, dass eine private Transaktion innerhalb der Konsensregeln des Netzwerks gültig ist, ohne weitere Details über die Transaktion offenzulegen. 

[Video-Erklärung](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - In diesem Vortrag beschreibt Ariel Gabizon den Zcash Note Commitment Tree, Blind Polynomial Evaluation und Homomorphically Hidden Challenges sowie deren Implementierung im Netzwerk. 

Lies das [Halo2-Buch](https://zcash.github.io/halo2/index.html) für weitere Informationen.

## Andere Zero-Knowledge-Anwendungen 

zk-SNARKS bieten in einer Vielzahl unterschiedlicher Anwendungen mehrere Vorteile. Schauen wir uns einige Beispiele an.

**Skalierbarkeit**: Dies wird durch „Outsourcing Computation“ erreicht. Für eine L1-Chain besteht nicht zwingend ein Bedarf an Zero-Knowledge, um die Arbeit eines Off-Chain-Dienstes zu verifizieren. Transaktionen sind auf einer zk-EVM nicht notwendigerweise privat.

Der Vorteil eines Proof-basierten Rollup-Dienstes (zk-Rollup) besteht darin, ein Bündel aus Hunderten/Tausenden von Transaktionen zu verarbeiten, während die L1 einen knappen Beweis dafür verifizieren kann, dass alle Transaktionen korrekt verarbeitet wurden, wodurch der Transaktionsdurchsatz des Netzwerks um den Faktor 100 oder 1000 skaliert.

<a href="">
  <img width="606" height="336" alt="zkvm1" src="https://github.com/user-attachments/assets/a3cbb5c9-8767-4b34-9fcb-868ca421838f" width="600" height="300"/>
</a>


**Interoperabilität**: Dies wird auf einer zk-Bridge erreicht, indem Vermögenswerte auf einer Quell-Chain „gesperrt“ werden und gegenüber der Ziel-Chain bewiesen wird, dass die Vermögenswerte gesperrt wurden (Konsensbeweis).

**Compliance**: Projekte wie [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) können beweisen, dass eine private Transaktion mit lokalen Bankgesetzen konform ist, ohne die Details der Transaktion offenzulegen. 

**Bekämpfung von Desinformation**: Unter mehreren Beispielen außerhalb von Blockchain und Kryptowährungen gehört dazu die Nutzung von Proof-Erzeugung bei Bildern, die von Nachrichten- und Medienorganisationen verarbeitet wurden, damit Betrachter die Quelle eines Bildes und alle daran vorgenommenen Operationen unabhängig verifizieren können. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Weiterführendes Lernen: 

[Zero-Knowledge-Bibliographie - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARKs mit Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 und SNARKs ohne Trusted Setups - Sean Bowe bei Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Proofs mit Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interaktive Zero-Knowledge-Proofs - Chainlink-Artikel](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Vorlesung 1: Einführung und Geschichte von ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Einfache Erklärung arithmetischer Schaltkreise - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Skalierbarkeit ist langweilig, Privatsphäre ist tot: Wofür sind ZK-Proofs gut?](https://www.youtube.com/watch?v=AX7eAzfSB6w)

---

## Verwandte Seiten

- [Shielded Pools](/using-zcash/shielded-pools) — Wie ZK-SNARKs in den Zcash-Value-Pools verwendet werden
- [Halo](/zcash-tech/halo) — Das ZK-SNARK-System von Zcash, das Trusted Setups überflüssig macht
- [Post-Quantum Security in Zcash](/zcash-tech/post-quantum-security) - Wie zukünftige Quantenrisiken mit der Kryptographie von Zcash zusammenhängen
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ZSAs auf Basis von ZK-SNARK-Technologie
- [What is ZEC and Zcash](/start-here/what-is-zec-and-zcash) — Einführung in Zcash und sein Datenschutzmodell
- [Privacy as a Core Principle](/privacy/privacy-as-a-core-principle) — Warum finanzielle Privatsphäre wichtig ist

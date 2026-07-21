# Von Null zu Zero Knowledge: Vertrauenswürdige Ausführungsumgebungen (TEEs)

**Serie:** Von Null zu Zero Knowledge

Von Null zu Zero Knowledge ist mit einem neuen Thema zurück!  
Diese Woche beschäftigen wir uns mit **Trusted Execution Environments (TEEs)** – wie sie in Privacy Coins und anderen Blockchain-Anwendungen eingesetzt werden.

![Einführung in Trusted Execution Environments](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEEs und Blockchains: Komplementäre Eigenschaften

Blockchains und TEEs haben sehr komplementäre Stärken:

- **Blockchains** garantieren Verfügbarkeit, Zustandsbeständigkeit und ermöglichen die öffentliche Verifizierung des gesamten Zustands – aber ihre Rechenleistung ist begrenzt.  
- **TEEs** können rechenintensive Aufgaben privat ausführen – es fehlt ihnen jedoch an nativer Zustandsbeständigkeit.

Zusammen können sie leistungsstarke datenschutzwahrende Systeme schaffen.

---

## Secret Network: Durch TEEs angetriebene Privatsphäre

**Secret Network** nutzt TEE-Technologie (konkret Intel SGX), um Berechnungen auf verschlüsselten Eingaben, Ausgaben und Zuständen durchzuführen.

Jeder Validator-Knoten betreibt Intel-SGX-Chips. Die Konsens- und Berechnungsschichten sind miteinander kombiniert:

- Transaktionen werden innerhalb sicherer Enklaven verarbeitet.  
- Daten werden nur **innerhalb des TEE** entschlüsselt.

Das unterscheidet sich von Zcash, das für Privatsphäre **Zero-Knowledge-Beweise** verwendet. In Zcash werden abgeschirmte Transaktionen gesendet und öffentlich validiert, ohne dass dem Netzwerk zusätzliche Daten offengelegt werden. Zcash Shielded Assets folgen demselben Prinzip.

![TEE-Diagramm von Secret Network](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Für eine detaillierte Erklärung, wie TEEs auf Secret Network implementiert werden, lies diesen hervorragenden Artikel von @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Wie Secret Network Schlüssel und Zustand absichert

- Der **Konsens-Verschlüsselungs-Seed** des Netzwerks wird innerhalb des TEE jedes Validators gespeichert.  
- Verträge verwenden einzigartige, nicht fälschbare Verschlüsselungsschlüssel.  
- Secret Contracts laufen auf dem Compute-Modul des Cosmos SDK, unterstützen jedoch verschlüsselte Eingaben/Ausgaben und Zustände.

---

## Remote Attestation

**Remote Attestation** ist der Prozess, mit dem nachgewiesen wird, dass eine Enklave in einer echten sicheren Hardwareumgebung läuft.

Sie ermöglicht es einer entfernten Partei zu verifizieren:
- Dass die korrekte Anwendung läuft  
- Dass die Anwendung nicht manipuliert wurde  
- Dass sie sicher innerhalb einer Intel-SGX-Enklave ausgeführt wird

![Erklärung von Remote Attestation](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Enklaven enthalten außerdem private Signatur- und Attestierungsschlüssel, auf die von außen nicht zugegriffen werden kann.

![Schutz von Enklavenschlüsseln](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Data Sealing

Da Enklaven zustandslos sind, müssen Daten manchmal außerhalb in nicht vertrauenswürdigem Speicher abgelegt werden.  

**Data Sealing** verschlüsselt Daten innerhalb der Enklave mit einem aus der CPU abgeleiteten Schlüssel. Der verschlüsselte Block kann nur auf **demselben System** wieder entschlüsselt werden.

![Data-Sealing-Diagramm](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

**Oasis Network** nutzt ebenfalls TEEs über seine vertrauliche ParaTime (z. B. Sapphire und Cipher).

Verschlüsselte Daten gelangen zusammen mit dem Smart Contract in das TEE. Sie werden entschlüsselt, verarbeitet und erneut verschlüsselt, bevor sie die Enklave verlassen.

![TEE-Ablauf in Oasis Network](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## TEEs in Proof-of-Stake-Netzwerken

Viele Proof-of-Stake-Blockchains (einschließlich Secret und Oasis) verwenden **Tendermint** als ihr Konsens-Framework.

Für PoS-Validatoren gilt:
- Schlüssel müssen sicher verwaltet und dürfen niemals im Klartext offengelegt werden.  
- Validatoren müssen online bleiben (Ausfallstrafen gelten).  
- Das Signieren widersprüchlicher Nachrichten kann zu Slashing führen.

**TEEs** sind ideal, um Validator-Schlüssel sicher zu erzeugen und zu verwenden.

![Tendermint- & PoS-Sicherheit](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash und Proof-of-Stake-Forschung

Zcash erforscht aktiv eine Migration zu Proof-of-Stake.

- Lies die Forschung: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Sieh dir diesen Ausschnitt aus einem Zcash Foundation Community Call an, der verschiedene PoS-Designs und ihre Auswirkungen auf die Privatsphäre erklärt:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Original-Thread von ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Diese Seite wurde aus dem ursprünglichen Thread „Zero to Zero Knowledge“ für das ZecHub-Wiki zusammengestellt.*

# Von Null zu Zero Knowledge: CryptoNote-Protokoll

**Serie:** Von Null zu Zero Knowledge

Heute ein interessantes Thema!  
Das **CryptoNote**-Protokoll ermöglicht starke On-Chain-Privatsphäre. Heute lernen wir alle seine wichtigsten Merkmale kennen und sehen, wie es von mehreren bekannten Privacy-Projekten implementiert wurde.

![CryptoNote Einführung](https://pbs.twimg.com/media/FrXr5P8WIAAvx36.jpg)

---

## Hintergrund

Das ursprüngliche CryptoNote-Whitepaper wurde unter dem Pseudonym **"Nicolas van Saberhagen"** veröffentlicht.  

**Bytecoin** war die erste Kryptowährung, die das Protokoll implementierte. Das heute bekannteste Projekt, das es nutzt, ist **Monero (XMR)**. Es wurde außerdem in TurtleCoin, Aeon und mehreren weiteren verwendet.

---

## Kernfunktionen von CryptoNote

Das CryptoNote-Protokoll bietet drei Hauptfunktionen:

1. **Nichtverfolgbarkeit und Nichtverknüpfbarkeit** von Transaktionen
2. **Egalitarian Proof of Work** (ASIC-resistent) 
3. **Dynamische Emission**

---

## 1. Nichtverfolgbarkeit – Ring Signatures

Nichtverfolgbarkeit wird in erster Linie durch **Ring Signatures** erreicht.

Beim Senden einer Transaktion wird Ihr echter öffentlicher Schlüssel mit mehreren Köder-Schlüsseln (dem „Ring“) vermischt – alle enthalten denselben Coin-Betrag. Dadurch wird es äußerst schwierig festzustellen, wer die Coins tatsächlich gesendet hat.

Die **Ring-Größe** beeinflusst die Anonymitätsmenge erheblich. Größere Ringe bieten besseren Datenschutz.

![Erklärung der Ring Signatures](https://pbs.twimg.com/media/FrXteGHXgAANE0F.png)

**Vergleich mit Zcash**:  
Die Anonymitätsmenge von Zcash ist die Gesamtzahl aller Transaktionen, die *jemals* in einem bestimmten abgeschirmten Pool durchgeführt wurden (deutlich größer als typische CryptoNote-Ring-Größen).

---

## Ring CT (Vertrauliche Transaktionen)

Das **Ring CT**-Modell hat den Datenschutz bei auf CryptoNote basierenden Coins erheblich verbessert.

Anstatt nur den Absender zu verbergen, **verschleiert Ring CT auch die Transaktionsbeträge** zwischen Absender und Empfänger.

![Ring CT Diagramm](https://pbs.twimg.com/media/FrXuivgWYAAze7B.png)

Es verwendet:
- Elliptische-Kurven-Kryptographie
- Pedersen Commitments
- Homomorphe Verschlüsselung

**Beweise** werden verwendet, um zu zeigen, dass der Betrag größer als 0 ist und innerhalb gültiger Bereiche liegt, **ohne die tatsächlichen Werte offenzulegen**.

**Stealth Addresses** fügen außerdem Einmal-Adressen für den Empfänger hinzu.

![Stealth Addresses + Beweise](https://pbs.twimg.com/media/FrXut5aWAAMhuRb.jpg)

---

## 2. Egalitarian Proof of Work (ePoW)

CryptoNote zielt darauf ab, durch ASIC-Resistenz ein faireres Mining-System zu schaffen.

Es verwendet den **CryptoNight**-Algorithmus (eine speicherintensive Funktion). Anders als Bitcoins SHA256 wurde CryptoNight so entwickelt, dass die Unterschiede zwischen CPU-, GPU- und ASIC-Minern verringert werden.

**CryptoNight-Schritte:**
1. Initialisierung eines großen Speicherbereichs (Scratchpad) mit pseudorandomen Daten
2. Durchführung zahlreicher Lese-/Schreiboperationen auf dem Scratchpad
3. Hashing des gesamten Scratchpads, um den Endwert zu erzeugen

![CryptoNight Mining](https://pbs.twimg.com/media/FrXvNs3XsAA37LG.jpg)

(Hinweis: Monero hat sich inzwischen von CryptoNight entfernt und nutzt andere Algorithmen.)

---

## 3. Dynamische Emission

Anstelle plötzlicher Halving-Ereignisse (wie bei Bitcoin) verwendet CryptoNote eine **stetig sinkende Blockbelohnung**.

Dadurch entsteht im Laufe der Zeit eine deutlich gleichmäßigere Emissionskurve.

![Kurve der dynamischen Emission](https://pbs.twimg.com/media/FrXv8wpXoAEjUxW.png)

**Zcash-Bezug**:  
Zcash-Entwickler haben diskutiert, künftig eine gleichmäßigere Emissionskurve zu implementieren, möglicherweise durch einen „Zcash Posterity Fund“.

---

## Fazit

CryptoNote hat sich als starker und praxiserprobter Ansatz für On-Chain-Privatsphäre erwiesen. Viele seiner Innovationen haben das breitere Ökosystem der Privacy-Coins beeinflusst.

Einige Forscher glauben, dass CryptoNote-Funktionen irgendwann mit vertrauenslosen, Zero-Knowledge-basierten abgeschirmten Pools kombiniert werden könnten.

---

**Original-Thread von ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Diese Seite wurde aus dem ursprünglichen Zero to Zero Knowledge-Thread für das ZecHub-Wiki zusammengestellt.*

# Von Null zu Zero Knowledge: Mnemonische Seed-Phrasen

**Serie:** Zero to Zero Knowledge

Mnemonische Seed-Phrasen bilden die Grundlage für einen der wichtigsten Aspekte von Kryptowährungen – **Selbstverwahrung**.  
Heute lernen wir, wie eine Seed-Phrase erzeugt und in Wallets verwendet wird.

---

## Was sind mnemonische Seed-Phrasen?

Wiederherstellungsphrasen werden durch die **BIP-39**-Spezifikation definiert, den heute gebräuchlichsten Typ von Wiederherstellungsphrase.

Die Erstellung von Wiederherstellungsphrasen beginnt mit der Erzeugung von **Zufälligkeit**. Mehr Entropie bedeutet höhere Sicherheit. **128 Bit** Entropie gelten für die meisten Nutzer als ausreichend.

![Seed-Phrasen-Konzept](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Abhängig von der Länge der anfänglichen Entropie ist die Wiederherstellungsphrase **12 bis 24 Wörter** lang.

---

## Schritt für Schritt: Wie eine 12-Wörter-Seed-Phrase erzeugt wird

### 1. Entropie erzeugen
Wir beginnen mit der Erzeugung von **128 Bit** Entropie.

### 2. Prüfsumme hinzufügen
Wir hashen die Entropie mit **SHA256**. Die ersten paar Bits dieses Hashes werden zur Prüfsumme.  
Dadurch erhalten wir einen eindeutigen Fingerabdruck für unsere Entropie.

![Diagramm Entropie + Prüfsumme](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. In 11-Bit-Blöcke aufteilen
Die gesamten 132 Bit (128 Entropie + 4 Prüfsumme) werden in Blöcke von 11 Bit aufgeteilt.

### 4. Der Wortliste zuordnen
Jede 11-Bit-Sequenz wird in eine Dezimalzahl (0-2047) umgewandelt.  
BIP-39-Wortlisten enthalten genau **2048 Wörter** (Englisch, Spanisch, Chinesisch usw.).

Diese Zahlen werden verwendet, um das entsprechende Wort in der Wortliste zu finden.

![Beispiel für Wortzuordnung](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**Ergebnis:** Wir haben jetzt eine sichere, für Menschen lesbare Wiederherstellungsphrase mit 12 Wörtern!

---

## Von der Wiederherstellungsphrase -> Seed -> Zahlungsadressen

Mithilfe der Wiederherstellungsphrase kann eine Wallet Schlüssel erzeugen, um Zahlungsadressen und verschiedene Wallet-Konten zu erstellen.

Die erzeugten Schlüssel sind **deterministisch** – dieselbe Eingabe erzeugt immer dieselbe Ausgabe.

### Seed-Erzeugung
Der Wallet-Seed wird aus der mnemonischen Phrase mithilfe einer **Key Derivation Function (KDF)** abgeleitet:

- In **Bitcoin**: PBKDF2  
- In **Zcash**: Blake2b-256/512

Dadurch entsteht ein **64-Byte-(512-Bit)-Seed**.

![Seed zu Master-Schlüsseln](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Master-Schlüssel
Der Seed wird in zwei 32-Byte-Sequenzen aufgeteilt:
- **Master Spending Key**
- **Master Chain Code**

Diese werden in **Hierarchical Deterministic (HD) Wallets** zur Ableitung von Kindschlüsseln verwendet.

---

## Zcash-spezifische Funktionen (ZIP-32)

In Zcash können **Anzeigeberechtigung** oder **Ausgabeberechtigung** für Unterbäume unabhängig delegiert werden, ohne den Master-Seed zu kompromittieren.

**ZIP-32** definiert den Standard für die hierarchisch-deterministische Schlüsselerzeugung, angepasst an die Datenschutzfunktionen von Zcash.

Aus einem **Expanded Spending Key** leiten wir ab:
- Full Viewing Key
- Incoming Viewing Key
- Satz von Zahlungsadressen

Verschiedene Ableitungsmechanismen erzeugen externe Adressen, die sich dafür eignen, sie Absendern über abgeschirmte Pools hinweg zu geben (Sapling & Orchard).

![Hierarchie der Zcash-Schlüsselableitung](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash unterstützt außerdem **interne Adressen** für Wallet-Vorgänge wie Auto-Shielding.

---

## Ressourcen

- [ZIP-32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash-Protokollspezifikation (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Überblick über Shielded-by-default-Wallets](https://zechub.wiki)

---

**Original-Thread von ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Diese Seite wurde aus dem ursprünglichen Zero to Zero Knowledge-Thread für das ZecHub-Wiki zusammengestellt.*

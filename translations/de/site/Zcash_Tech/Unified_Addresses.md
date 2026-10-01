# Unified Address (ZIP-316) Validierung

*Dies ist ein Lernleitfaden, kein fertiger Decoder oder eine Zahlungsbibliothek zum Kopieren und Einfügen. Er erklärt, wie eine Unified Address aufgebaut ist, damit du verstehst, was gepflegte Bibliotheken intern tun. Bei allem, was echte Gelder verarbeitet, solltest du dich an die [ZIP-316-Spezifikation](https://zips.z.cash/zip-0316) und die unten verlinkten offiziellen Implementierungen halten.*

---

## Das große Ganze

Eine Unified Address (UA) ist eine einzelne Adresszeichenfolge, die mehrere Empfängertypen enthält: **Transparent**, **Sapling**, **Orchard** oder eine Kombination davon. Das zahlende Wallet wählt automatisch den besten unterstützten Empfänger-Pool aus.

Stell dir eine UA als versiegelten Umschlag mit mehreren beschrifteten Karten vor. Jede Karte stellt eine andere Möglichkeit dar, dich zu erreichen. Um eine Adresse zu prüfen, muss eine Anwendung:

1. **Den Umschlag öffnen:** Die Zeichenfolge dekodieren.
2. **Den Inhalt entmischen:** Die schützende Vermischung (**F4Jumble**) rückgängig machen.
3. **Jede Karte lesen:** Einzelne Empfänger extrahieren.
4. **Protokollregeln durchsetzen:** Einträge gemäß ihrem Typecode-Bereich ignorieren oder ablehnen.

---

## Warum „einfach Bech32m dekodieren“ nicht genügt

Eine UA verwendet die Bech32m-Textkodierung, doch allein durch das Dekodieren von Bech32m werden die nutzbaren Empfänger nicht offengelegt.

ZIP-316 vermischt die Nutzlast vor der Kodierung absichtlich mit **F4Jumble**. F4Jumble stellt sicher, dass bereits die Änderung eines einzigen Zeichens in der Adresse die dekodierte Ausgabe vollständig verändert. Das verhindert Angriffe auf die Formbarkeit von Adressen, bei denen ein Angreifer Bytes in der Mitte einer Adresse austauscht, während Präfix und Suffix weiterhin gültig aussehen.

> **Wichtige Regel:** Der Schutz vor Formbarkeit funktioniert nur, wenn deine Anwendung die vollständige Dekodierungs- und Validierungspipeline ausführt. Eine teilweise Dekodierung entfernt die Sicherheit, behält aber sämtliche Risiken bei.

---

## Die Dekodierungspipeline, Schritt für Schritt

### Schritt 1: Bech32m dekodieren und das Netzwerk prüfen
- **Menschenlesbarer Teil (HRP):** `u` kennzeichnet das Mainnet; `utest` kennzeichnet das Testnet. *(Mainnet-UAs beginnen mit `u1`, wobei `1` das Bech32-Trennzeichen ist.)*
- **Längenbegrenzung:** Standard-Bech32m erzwingt eine Begrenzung auf 90 Zeichen. UAs überschreiten diese Grenze typischerweise, daher müssen standardmäßige Längenprüfungen im Decoder deaktiviert werden.
- Die 5-Bit-Bech32m-Wörter wieder in Standard-8-Bit-Bytes umwandeln.

### Schritt 2: F4Jumble invertieren
F4Jumble ist ein Feistel-Netzwerk mit vier Runden auf Basis von BLAKE2b:
- **Länge der linken Hälfte:** `min(64, floor(length / 2))` Bytes. Die Obergrenze von 64 Bytes entspricht der maximalen Ausgabegröße von BLAKE2b. Die rechte Hälfte enthält die verbleibende Nutzlast.
- **Hash-Funktionen:** Wechselt zwischen G und H unter Verwendung fester Personalisierungskennzeichnungen (`UA_F4Jumble_G` und `UA_F4Jumble_H`).
- **Reihenfolge der Runden:** Die Vorwärtskodierung führt G(0) → H(0) → G(1) → H(1) aus. Die Umkehrung (Entmischung) führt H(1) → G(1) → H(0) → G(0) aus.
- **Bereichsprüfung:** Eingaben außerhalb der ZIP-316-Nutzlastgrößenbegrenzungen ablehnen.

### Schritt 3: Auffüllung entfernen und HRP verifizieren
Vor der Vermischung fügt der Encoder 16 Bytes hinzu, die den HRP enthalten und mit Nullen aufgefüllt sind.
- Die letzten 16 Bytes nach der Entmischung entfernen.
- Bestätigen, dass der eingebettete HRP dem erwarteten Netzwerk entspricht (`u` oder `utest`). Dadurch wird verhindert, dass Testnet-Adressen versehentlich im Mainnet akzeptiert werden.

### Schritt 4: Empfänger extrahieren
Die verbleibende Nutzlast besteht aus `(typecode, length, content)` Einträgen, wobei Typecode und Länge als Compact-Size-Ganzzahlen gespeichert sind (für kleine Werte ein einzelnes Byte). Bekannte Empfänger-Typecodes:

| Typecode | Empfängertyp       | Inhaltslänge |
| :------- | :------------------ | :------------- |
| `0x00`   | Transparent (P2PKH) | 20 Bytes       |
| `0x01`   | Transparent (P2SH)  | 20 Bytes       |
| `0x02`   | Sapling             | 43 Bytes       |
| `0x03`   | Orchard             | 43 Bytes       |

Darüber hinaus reserviert ZIP-316 zwei weitere Bereiche für Vorwärtskompatibilität:

- **`0xC0`–`0xDF` (Metadaten ohne MUST-understand-Anforderung):** Verbraucher müssen Metadatenelemente in diesem Bereich ignorieren, die sie nicht erkennen.
- **`0xE0` und `0xE1` (zugewiesene MUST-understand-Ablaufmetadaten):** Das aktuelle ZIP-316-Register weist diese der Ablaufhöhe und -zeit der Adresse zu. Verbraucher müssen diese Elemente verstehen oder die Adresse ablehnen.
- **`0xE2`–`0xFC` (nicht zugewiesene MUST-understand-Metadaten):** Verbraucher müssen die Adresse ablehnen, wenn sie in diesem Bereich auf ein nicht erkanntes Element stoßen.

Bei bekannten Empfängertypen muss überprüft werden, dass die kodierte Länge der für den Typ festgelegten Inhaltslänge entspricht. Bei Metadatenelementen wird deren kodierte Compact-Size-Länge zur Bestimmung der Inhaltslänge verwendet. Gekürzte Einträge oder verbleibende Bytes ablehnen.

**Bevorzugte Empfängerreihenfolge.** Sobald eine Adresse erfolgreich geparst wurde, sollte ein Wallet oder Zahlungstool den besten Empfänger in dieser Reihenfolge auswählen: Orchard, dann Sapling, dann transparent.

---

## Obligatorische ZIP-316-Ablehnungsregeln

**Eine erfolgreiche Dekodierung macht eine Adresse nicht gültig.** Offizielle Zcash-Wallets lehnen Adressen, die gegen die folgenden Regeln verstoßen, strikt ab. Auch Webtools müssen sie ablehnen, um Zahlungsfehler zu verhindern:

- **Fehlende abgeschirmte Empfänger:** Die Adresse **muss** mindestens einen Sapling- oder Orchard-Empfänger enthalten. Eine UA mit ausschließlich transparenten Empfängern ist gemäß ZIP-316 ungültig.
- **Doppelte Typecodes:** Jeder Empfängertyp darf höchstens einmal vorkommen.
- **Unsortierte Typecodes:** Empfänger müssen in strikt aufsteigender Typecode-Reihenfolge erscheinen.
- **Konfligierende transparente Empfänger:** Eine UA darf entweder P2PKH oder P2SH enthalten, aber **niemals beide**.
- **Fehlerhafte Einträge oder Auffüllung:** Nicht übereinstimmende Netzwerkpräfixe, gekürzte Nutzlasten oder Längenabweichungen müssen zur sofortigen Ablehnung führen.
- **Nicht erkannte Typecodes:** Verbraucher müssen nicht erkannte Elemente ignorieren, außer Elementen im MUST-understand-Metadatenbereich (`0xE0`–`0xFC`), die sie bei fehlender Erkennung ablehnen müssen. Im aktuellen Register sind `0xE0` und `0xE1` zugewiesene Ablauf-Typen, während `0xE2`–`0xFC` nicht zugewiesen sind. Unabhängig davon ist jede Adresse abzulehnen, die die oben genannten obligatorischen Gültigkeitsregeln nicht erfüllt, einschließlich der Anforderung eines Sapling- oder Orchard-Empfängers.

---

## Bewährte Praktiken für Entwickler

- **Geparste Empfänger vergleichen, nicht Rohzeichenfolgen.** Adressen vor dem Gleichheitsvergleich zunächst dekodieren.
- **Für alles, was Gelder verarbeitet, gepflegte Bibliotheken verwenden.** Offizielle Rust-Crates (wie `zcash_address`) nach WebAssembly kompilieren, statt eigene JavaScript-Decoder bereitzustellen.
- **Bei handgeschriebenen Parsern vorsichtig sein.** Wenn du einen zum Lernen schreibst, behandle ihn als Studienprojekt und teste ihn anhand der untenstehenden offiziellen Vektoren, bevor du ihm irgendetwas anvertraust.

---

## Offizielle Spezifikationen und Referenzimplementierungen

- **[ZIP-316: Unified Addresses und Viewing Keys](https://zips.z.cash/zip-0316)**
- **[zcash_address-Crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble-Crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Offizielle Testvektoren:**
  - [F4Jumble-Testvektoren](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Unified Address-Testvektoren](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glossar

| Begriff | Bedeutung |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Einzelne Adresszeichenfolge, die mehrere Empfänger-Pools bündelt. |
| **Receiver** | Spezifischer Zahlungsempfängertyp (transparent, Sapling oder Orchard). |
| **Bech32m** | Textkodierungsschema für UA-Zeichenfolgen. |
| **HRP** | Menschenlesbarer Teil oder Netzwerkpräfix (`u` oder `utest`). |
| **F4Jumble** | Umkehrbarer Verschleierungsalgorithmus, der die Adressintegrität sicherstellt. |
| **Typecode** | Nummer in jedem Eintrag, die den Empfängertyp in der Nutzlast definiert. |
| **Malleability** | Unbefugte Änderung von Adress-Bytes ohne Erkennung. |

Siehe auch: [Viewing Keys](./Viewing_Keys.md)
